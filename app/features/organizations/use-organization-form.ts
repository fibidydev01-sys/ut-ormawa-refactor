// ============================================================
// useOrganizationForm — state & logika modal tambah/edit organisasi
// File: app/features/organizations/use-organization-form.ts
// Dipindah apa adanya dari komponennya (S5). Termasuk perilaku T17: closeModal() saat isSubmitting masih true → modal tetap terbuka.
// ============================================================

import { reactive, ref } from 'vue'
import type { OrganizationDocument, OrganizationType } from '~/types/database'

/** Emit dari organization-form-modal.vue. */
// Overload (bukan union) agar cocok dengan tipe hasil defineEmits di komponen.
/* eslint-disable @typescript-eslint/unified-signatures */
export interface OrganizationFormEmit {
  (event: 'created', org: OrganizationDocument): void
  (event: 'updated', org: OrganizationDocument): void
}
/* eslint-enable @typescript-eslint/unified-signatures */

export function useOrganizationForm(emit: OrganizationFormEmit) {
  const { createOrganization, updateOrganization } = useOrganizations()
  const { uploadImage, isUploading } = useUpload()

  // ── Modal State ──────────────────────────────────────────────
  type ModalMode = 'create' | 'edit'

  const isModalOpen = ref<boolean>(false)

  const modalMode = ref<ModalMode>('create')

  const isSubmitting = ref<boolean>(false)

  const formError = ref<string>('')

  const editingId = ref<string | null>(null)

  /** Form yang diisi user — harus sesuai dengan OrganizationDocument (tanpa id) */
  const form = reactive<Omit<OrganizationDocument, 'id'>>({
    name: '',
    organization_type: '' as OrganizationType,
    description: '',
    logo_url: '',
  })

  const logoFile = ref<File | null>(null)

  const logoPreviewUrl = ref<string>('')

  function resetForm(): void {
    form.name = ''
    form.organization_type = '' as OrganizationType
    form.description = ''
    form.logo_url = ''
    formError.value = ''
    editingId.value = null
    logoFile.value = null
    if (logoPreviewUrl.value) {
      URL.revokeObjectURL(logoPreviewUrl.value)
    }
    logoPreviewUrl.value = ''
  }

  function onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (selectedFile) {
      logoFile.value = selectedFile
      if (logoPreviewUrl.value) {
        URL.revokeObjectURL(logoPreviewUrl.value)
      }
      logoPreviewUrl.value = URL.createObjectURL(selectedFile)
    }
  }

  // ── Modal: Create ─────────────────────────────────────────────
  function openCreateModal(): void {
    resetForm()
    modalMode.value = 'create'
    isModalOpen.value = true
  }

  // ── Modal: Edit ──────────────────────────────────────────────
  function openEditModal(org: OrganizationDocument): void {
    resetForm()
    modalMode.value = 'edit'
    editingId.value = org.id
    form.name = org.name
    form.organization_type = org.organization_type
    form.description = org.description
    form.logo_url = org.logo_url
    isModalOpen.value = true
  }

  function closeModal(): void {
    if (isSubmitting.value) return
    isModalOpen.value = false
    resetForm()
  }

  // ── Form Submit ──────────────────────────────────────────────
  async function submitForm(): Promise<void> {
    if (isSubmitting.value) return
    formError.value = ''

    const trimmedName = form.name.trim()
    const trimmedDescription = form.description.trim()

    if (!trimmedName) {
      formError.value = 'Nama organisasi wajib diisi.'
      return
    }

    if (!form.organization_type) {
      formError.value = 'Tipe organisasi wajib dipilih.'
      return
    }

    isSubmitting.value = true
    try {
      let finalLogoUrl = form.logo_url
      if (logoFile.value) {
        finalLogoUrl = await uploadImage(logoFile.value, 'organizations')
      }

      const payload: Omit<OrganizationDocument, 'id'> = {
        name: trimmedName,
        organization_type: form.organization_type,
        description: trimmedDescription,
        logo_url: finalLogoUrl.trim(),
      }

      if (modalMode.value === 'create') {
        const newId: string = await createOrganization(payload)
        // Tambahkan ke state lokal agar tidak perlu refetch
        emit('created', { id: newId, ...payload })
      } else {
        if (!editingId.value) throw new Error('ID organisasi tidak valid.')
        await updateOrganization(editingId.value, payload)
        // Perbarui state lokal
        emit('updated', { id: editingId.value, ...payload })
      }

      closeModal()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal menyimpan data.'
      formError.value = message
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isUploading,
    isModalOpen,
    modalMode,
    isSubmitting,
    formError,
    form,
    logoPreviewUrl,
    onFileSelected,
    openCreateModal,
    openEditModal,
    closeModal,
    submitForm,
  }
}
