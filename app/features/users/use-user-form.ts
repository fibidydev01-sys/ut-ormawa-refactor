// ============================================================
// useUserForm — state & logika modal tambah/edit pengguna
// File: app/features/users/use-user-form.ts
// Dipindah apa adanya dari komponennya (S5). Memuat organisasi saat dibuka dan pengguna setelah simpan (hasil di-emit ke induk).
// ============================================================

import { reactive, ref } from 'vue'
import type { AdminModule, OrganizationDocument, UserDocument, UserRole } from '~/types/database'

/** Emit dari user-form-modal.vue. */
export interface UserFormEmit {
  (event: 'organizations-loaded', organizations: OrganizationDocument[]): void
  (event: 'users-refreshed', users: UserDocument[]): void
}

export function useUserForm(emit: UserFormEmit) {
  const { getAllUsers, createUser, updateUser } = useUsers()
  const { getAllOrganizations } = useOrganizations()

  type ModalMode = 'create' | 'edit'

  const isModalOpen = ref<boolean>(false)

  const modalMode = ref<ModalMode>('create')

  const isSubmitting = ref<boolean>(false)

  const formError = ref<string>('')

  const editingId = ref<string | null>(null)

  const form = reactive({
    email: '',
    password: '',
    full_name: '',
    role: '' as UserRole | '',
    organization_id: '',
    access_modules: [] as AdminModule[],
  })

  function resetForm() {
    form.email = ''
    form.password = ''
    form.full_name = ''
    form.role = ''
    form.organization_id = ''
    form.access_modules = []
    formError.value = ''
    editingId.value = null
  }

  // ── Actions ─────────────────────────────────────────────────
  async function openCreateModal() {
    resetForm()
    modalMode.value = 'create'
    isModalOpen.value = true

    try {
      const orgs = await getAllOrganizations()
      emit('organizations-loaded', orgs)
    } catch (err) {
      console.warn('Gagal memuat daftar organisasi saat membuka modal:', err)
      emit('organizations-loaded', [])
    }
  }

  async function openEditModal(user: UserDocument) {
    resetForm()
    modalMode.value = 'edit'
    editingId.value = user.id
    form.email = user.email
    form.full_name = user.full_name
    form.role = user.role
    form.organization_id = user.organization_id || ''
    form.access_modules = Array.isArray(user.access_modules) ? [...user.access_modules] : []
    isModalOpen.value = true

    try {
      const orgs = await getAllOrganizations()
      emit('organizations-loaded', orgs)
    } catch (err) {
      console.warn('Gagal memuat daftar organisasi saat membuka modal edit:', err)
      emit('organizations-loaded', [])
    }
  }

  function closeModal() {
    if (isSubmitting.value) return
    isModalOpen.value = false
  }

  async function submitForm() {
    if (isSubmitting.value) return
    formError.value = ''

    isSubmitting.value = true
    try {
      const payload = {
        full_name: form.full_name.trim(),
        role: form.role as UserRole,
        organization_id: form.role === 'SUPER_ADMIN' ? null : form.organization_id || null,
        access_modules: form.role === 'SUPER_ADMIN' ? [] : [...form.access_modules],
      }

      if (modalMode.value === 'create') {
        await createUser({
          ...payload,
          email: form.email.trim(),
          password: form.password,
        })
      } else {
        if (!editingId.value) throw new Error('ID tidak valid')
        await updateUser(editingId.value, payload)
      }

      // Refresh data untuk mendapatkan id dari server saat create.
      // Jika aturan Firestore membatasi akses, tetap tutup modal dan biarkan daftar user
      // tetap terjaga dari data yang sudah berhasil dibuat.
      try {
        emit('users-refreshed', await getAllUsers())
      } catch (refreshErr) {
        console.warn('Gagal memuat ulang daftar pengguna:', refreshErr)
      }

      closeModal()
    } catch (err) {
      formError.value = (err as Error).message || 'Gagal menyimpan data.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isModalOpen,
    modalMode,
    isSubmitting,
    formError,
    form,
    openCreateModal,
    openEditModal,
    closeModal,
    submitForm,
  }
}
