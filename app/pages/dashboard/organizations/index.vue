<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div class="min-w-0">
        <h1 class="text-2xl font-extrabold text-slate-800">Organisasi</h1>
        <p class="mt-1 text-sm text-slate-500">
          Kelola daftar Himpunan Mahasiswa dan Unit Kegiatan Mahasiswa.
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:self-auto"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Organisasi
      </button>
    </div>

    <!-- ═══════════════════════════════════════════════
         LOADING STATE
    ════════════════════════════════════════════════ -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-sm font-medium">Memuat data organisasi...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         EMPTY STATE
    ════════════════════════════════════════════════ -->
    <div
      v-else-if="!isLoading && organizations.length === 0"
      class="flex flex-col items-center justify-center py-24 text-slate-400"
    >
      <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada organisasi</p>
      <p class="text-sm mt-1">Klik tombol "Tambah Organisasi" untuk mulai.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Organisasi
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tipe
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
              Deskripsi
            </th>
            <th class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="org in organizations"
            :key="org.id"
            class="hover:bg-slate-50 transition-colors"
          >
            <!-- Nama + Logo -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    v-if="org.logo_url"
                    :src="org.logo_url"
                    :alt="org.name"
                    class="w-full h-full object-cover"
                    @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
                  />
                  <svg v-else class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                    />
                  </svg>
                </div>
                <span class="font-semibold text-slate-800">{{ org.name }}</span>
              </div>
            </td>

            <!-- Tipe Badge -->
            <td class="px-6 py-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                  org.organization_type === 'HIMPUNAN_MAHASISWA'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-violet-100 text-violet-700',
                ]"
              >
                {{ organizationTypeLabel(org.organization_type) }}
              </span>
            </td>

            <!-- Deskripsi (hidden on mobile) -->
            <td class="px-6 py-4 hidden md:table-cell">
              <p class="text-slate-500 truncate max-w-xs">
                {{ org.description || '—' }}
              </p>
            </td>

            <!-- Aksi -->
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="openEditModal(org)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click="confirmDelete(org)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Error Banner -->
    <div
      v-if="pageError"
      class="mt-4 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      {{ pageError }}
    </div>


    <!-- ═══════════════════════════════════════════════
         MODAL: CREATE / EDIT
    ════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal" />

          <!-- Panel -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isModalOpen"
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10"
            >
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 class="text-lg font-extrabold text-slate-800">
                  {{ modalMode === 'create' ? 'Tambah Organisasi Baru' : 'Edit Organisasi' }}
                </h2>
                <button
                  @click="closeModal"
                  class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body: Form -->
              <form @submit.prevent="submitForm" class="p-6 space-y-5">

                <!-- Field: name -->
                <div>
                  <label for="org-name" class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Nama Organisasi <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="org-name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Contoh: Himpunan Mahasiswa Teknik Informatika"
                    class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>

                <!-- Field: organization_type -->
                <div>
                  <label for="org-type" class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Tipe Organisasi <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="org-type"
                    v-model="form.organization_type"
                    required
                    class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition appearance-none"
                  >
                    <option value="" disabled>-- Pilih Tipe --</option>
                    <option value="HIMPUNAN_MAHASISWA">Himpunan Mahasiswa (HM)</option>
                    <option value="UNIT_KEGIATAN_MAHASISWA">Unit Kegiatan Mahasiswa (UKM)</option>
                    <option value="ORMAWA">ORMAWA (Organisasi Mahasiswa)</option>
                    <option value="ORGANISASI_LAIN">Organisasi Lain</option>
                  </select>
                </div>

                <!-- Field: description -->
                <div>
                  <label for="org-desc" class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Deskripsi <span class="font-medium text-slate-400 normal-case">(opsional)</span>
                  </label>
                  <textarea
                    id="org-desc"
                    v-model="form.description"
                    rows="3"
                    placeholder="Deskripsi singkat tentang organisasi ini..."
                    class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition resize-none"
                  />
                </div>

                <!-- Field: logo_url -->
                <div>
                  <label for="org-logo" class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Logo <span class="font-medium text-slate-400 normal-case">(opsional)</span>
                  </label>
                  <input
                    id="org-logo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    @change="onFileSelected"
                    class="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
                  />
                  <p class="mt-2 text-[11px] text-slate-400">Bisa menggunakan gambar JPG, PNG, WebP, atau GIF sampai 20 MB.</p>
                  <!-- Live Preview -->
                  <div v-if="logoPreviewUrl || form.logo_url" class="mt-2 flex items-center gap-2">
                    <img
                      :src="logoPreviewUrl || form.logo_url"
                      alt="Preview logo"
                      class="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
                    />
                    <span class="text-xs text-slate-400">Preview logo</span>
                  </div>
                </div>

                <!-- Form Error -->
                <div v-if="formError" class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  {{ formError }}
                </div>

                <!-- Modal Actions -->
                <div class="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-sm transition-colors"
                  >
                    <svg
                      v-if="isSubmitting"
                      class="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {{ isSubmitting ? (isUploading ? 'Mengunggah...' : 'Menyimpan...') : modalMode === 'create' ? 'Simpan' : 'Perbarui' }}
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════════════════
         MODAL: KONFIRMASI HAPUS
    ════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDeleteModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="cancelDelete"
        >
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="cancelDelete" />
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 text-center">
            <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 class="text-lg font-extrabold text-slate-800 mb-2">Hapus Organisasi?</h3>
            <p class="text-sm text-slate-500 mb-6">
              Organisasi <strong class="text-slate-700">{{ organizationToDelete?.name }}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div class="flex gap-3">
              <button
                @click="cancelDelete"
                class="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                @click="executeDelete"
                :disabled="isDeleting"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-xl transition-colors"
              >
                <svg v-if="isDeleting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { OrganizationDocument, OrganizationType } from '~/types/database.types'

// ── Meta ─────────────────────────────────────────────────────
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

useHead({ title: 'Organisasi — Admin Panel Ormawa' })

// ── Composable ───────────────────────────────────────────────
const { getAllOrganizations, createOrganization, updateOrganization } = useOrganizations()
const { uploadImage, isUploading } = useStorage()

// ── Page State ───────────────────────────────────────────────
const organizations = ref<OrganizationDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

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

// ── Delete State ─────────────────────────────────────────────
const isDeleteModalOpen = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const organizationToDelete = ref<OrganizationDocument | null>(null)

// ── Helpers ──────────────────────────────────────────────────

/** Kembalikan label yang ramah pengguna dari OrganizationType */
function organizationTypeLabel(type: OrganizationType): string {
  const labels: Record<OrganizationType, string> = {
    HIMPUNAN_MAHASISWA: 'Himpunan Mahasiswa',
    UNIT_KEGIATAN_MAHASISWA: 'Unit Kegiatan Mahasiswa',
    ORMAWA: 'ORMAWA',
    ORGANISASI_LAIN: 'Organisasi Lain',
  }
  return labels[type] ?? type
}

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

// ── Data Fetching ─────────────────────────────────────────────
async function fetchOrganizations(): Promise<void> {
  isLoading.value = true
  pageError.value = ''
  try {
    organizations.value = await getAllOrganizations()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal memuat data organisasi.'
    pageError.value = message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchOrganizations)

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
      organizations.value.unshift({ id: newId, ...payload })
    } else {
      if (!editingId.value) throw new Error('ID organisasi tidak valid.')
      await updateOrganization(editingId.value, payload)
      // Perbarui state lokal
      const index: number = organizations.value.findIndex(o => o.id === editingId.value)
      if (index !== -1) {
        organizations.value[index] = { id: editingId.value, ...payload }
      }
    }

    closeModal()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal menyimpan data.'
    formError.value = message
  } finally {
    isSubmitting.value = false
  }
}

// ── Delete ───────────────────────────────────────────────────
function confirmDelete(org: OrganizationDocument): void {
  organizationToDelete.value = org
  isDeleteModalOpen.value = true
}

function cancelDelete(): void {
  if (isDeleting.value) return
  isDeleteModalOpen.value = false
  organizationToDelete.value = null
}

async function executeDelete(): Promise<void> {
  if (!organizationToDelete.value || isDeleting.value) return
  isDeleting.value = true

  try {
    const { $db } = useNuxtApp()
    if (!$db) throw new Error('Firestore belum siap.')

    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc($db, 'organizations', organizationToDelete.value.id))

    // Hapus dari state lokal
    organizations.value = organizations.value.filter(
      o => o.id !== organizationToDelete.value!.id
    )
    cancelDelete()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal menghapus organisasi.'
    pageError.value = message
    isDeleteModalOpen.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>
