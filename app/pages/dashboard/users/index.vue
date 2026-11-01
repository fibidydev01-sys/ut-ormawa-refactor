<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Pengguna</h1>
        <p class="text-sm text-slate-500 mt-1">
          Kelola daftar pengurus sistem (SUPER_ADMIN dan ADMIN).
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Pengguna
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
        <p class="text-sm font-medium">Memuat data pengguna...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         EMPTY STATE
    ════════════════════════════════════════════════ -->
    <div
      v-else-if="!isLoading && users.length === 0"
      class="flex flex-col items-center justify-center py-24 text-slate-400"
    >
      <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada pengguna</p>
      <p class="text-sm mt-1">Klik tombol "Tambah Pengguna" untuk mulai.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Organisasi</th>
            <th class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition-colors">
            <!-- Nama + Email -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                  {{ user.full_name ? user.full_name[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : '?') }}
                </div>
                <div>
                  <div class="font-semibold text-slate-800">{{ user.full_name || '—' }}</div>
                  <div class="text-xs text-slate-400">{{ user.email }}</div>
                </div>
              </div>
            </td>

            <!-- Role Badge -->
            <td class="px-6 py-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                  user.role === 'SUPER_ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700',
                ]"
              >
                {{ user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin' }}
              </span>
            </td>

            <!-- Organisasi -->
            <td class="px-6 py-4 hidden md:table-cell">
              <span v-if="user.role === 'SUPER_ADMIN'" class="text-slate-400 text-xs font-medium italic">
                Semua Organisasi
              </span>
              <span v-else class="text-slate-700 font-medium">
                {{ getOrganizationName(user.organization_id) }}
              </span>
            </td>

            <!-- Aksi -->
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="openEditModal(user)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(user)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pageError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
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
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal" />
          
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 flex flex-col max-h-[90vh]">
            <div class="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
              <h2 class="text-lg font-extrabold text-slate-800">
                {{ modalMode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna' }}
              </h2>
              <button @click="closeModal" class="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="submitForm" class="p-6 space-y-5 overflow-y-auto admin-scroll">
              
              <!-- Email (disabled saat edit) -->
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  :disabled="modalMode === 'edit'"
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm disabled:opacity-60 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <!-- Password -->
              <div v-if="modalMode === 'create'">
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Password <span class="text-red-500">*</span></label>
                <input
                  v-model="form.password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <!-- Full Name -->
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                <input
                  v-model="form.full_name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <!-- Role -->
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Role <span class="text-red-500">*</span></label>
                <select
                  v-model="form.role"
                  required
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="" disabled>-- Pilih Role --</option>
                  <option value="SUPER_ADMIN">Super Admin (Akses Penuh)</option>
                  <option value="ADMIN">Admin (Pengurus Organisasi)</option>
                </select>
              </div>

              <!-- Organisasi -->
              <div v-if="form.role === 'ADMIN'">
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Organisasi <span class="text-red-500">*</span></label>
                <select
                  v-model="form.organization_id"
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="" disabled>-- Pilih Organisasi --</option>
                  <option v-for="org in organizations" :key="org.id" :value="org.id">
                    {{ org.name }}
                  </option>
                </select>
                <p v-if="organizations.length === 0" class="mt-2 text-[11px] text-amber-600">
                  Belum ada organisasi yang bisa dipilih. Pastikan data organisasi sudah ada di Firestore.
                </p>
              </div>

              <!-- Hak Akses (Khusus Admin) -->
              <div v-if="form.role === 'ADMIN'">
                <label class="block text-xs font-bold text-slate-600 uppercase mb-3">Hak Akses Modul</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_articles" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Artikel</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_events" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Event</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_gallery" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Galeri</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_members" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Keanggotaan</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_structure" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Struktur Pengurus</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_organizations" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Organisasi</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_users" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Kelola Pengguna</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.access_modules" value="manage_settings" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    <span>Pengaturan Sistem</span>
                  </label>
                </div>
                <p class="mt-2 text-[11px] text-slate-500">
                  Pilih menu-menu mana saja yang boleh dibuka oleh Admin ini di Admin Panel.
                </p>
              </div>

              <div v-if="formError" class="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-200">
                {{ formError }}
              </div>

              <div class="flex justify-end gap-3 pt-2">
                <button type="button" @click="closeModal" class="px-4 py-2.5 text-sm font-bold bg-slate-100 rounded-xl">Batal</button>
                <button type="submit" :disabled="isSubmitting" class="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl flex items-center gap-2">
                  <span v-if="isSubmitting">Menyimpan...</span>
                  <span v-else>Simpan</span>
                </button>
              </div>
            </form>
          </div>
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
        <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="cancelDelete">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="cancelDelete" />
          <div class="relative bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm w-full z-10">
            <h3 class="text-lg font-bold text-slate-800 mb-2">Hapus Pengguna?</h3>
            <p class="text-sm text-slate-500 mb-6">Akun <strong>{{ userToDelete?.full_name }}</strong> akan dihapus permanen.</p>
            <div class="flex gap-3">
              <button @click="cancelDelete" class="flex-1 py-2.5 text-sm font-bold bg-slate-100 rounded-xl">Batal</button>
              <button @click="executeDelete" :disabled="isDeleting" class="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl">
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
import type { UserDocument, UserRole, OrganizationDocument, AdminModule } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Pengguna — Admin Panel Ormawa' })

const { getAllUsers, createUser, updateUser, deleteUser } = useUsers()
const { getAllOrganizations } = useOrganizations()

// ── State ──────────────────────────────────────────────────
const users = ref<UserDocument[]>([])
const organizations = ref<OrganizationDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

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

const isDeleteModalOpen = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const userToDelete = ref<UserDocument | null>(null)

// ── Lifecycle ───────────────────────────────────────────────
onMounted(async () => {
  isLoading.value = true
  pageError.value = ''

  try {
    const [usersData, orgsData] = await Promise.allSettled([
      getAllUsers(),
      getAllOrganizations()
    ])

    if (usersData.status === 'fulfilled') {
      users.value = usersData.value
    } else {
      console.warn('Gagal memuat daftar pengguna:', usersData.reason)
      users.value = []
    }

    if (orgsData.status === 'fulfilled') {
      organizations.value = orgsData.value
    } else {
      console.warn('Gagal memuat daftar organisasi:', orgsData.reason)
      organizations.value = []
    }
  } catch (err: any) {
    console.warn('Gagal memuat data awal pengguna:', err)
    users.value = []
    organizations.value = []
  } finally {
    isLoading.value = false
  }
})

// ── Helpers ─────────────────────────────────────────────────
function getOrganizationName(id: string | null): string {
  if (!id) return '—'
  const org = organizations.value.find(o => o.id === id)
  return org ? org.name : 'Unknown'
}

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
    organizations.value = orgs
  } catch (err: any) {
    console.warn('Gagal memuat daftar organisasi saat membuka modal:', err)
    organizations.value = []
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
    organizations.value = orgs
  } catch (err: any) {
    console.warn('Gagal memuat daftar organisasi saat membuka modal edit:', err)
    organizations.value = []
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
      organization_id: form.role === 'SUPER_ADMIN' ? null : (form.organization_id || null),
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
      users.value = await getAllUsers()
    } catch (refreshErr: any) {
      console.warn('Gagal memuat ulang daftar pengguna:', refreshErr)
    }

    closeModal()
  } catch (err: any) {
    formError.value = err.message || 'Gagal menyimpan data.'
  } finally {
    isSubmitting.value = false
  }
}

function confirmDelete(user: UserDocument) {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

function cancelDelete() {
  if (isDeleting.value) return
  isDeleteModalOpen.value = false
  userToDelete.value = null
}

async function executeDelete() {
  if (!userToDelete.value || isDeleting.value) return
  isDeleting.value = true
  try {
    await deleteUser(userToDelete.value.id)
    users.value = users.value.filter(u => u.id !== userToDelete.value!.id)
    cancelDelete()
  } catch (err: any) {
    pageError.value = err.message || 'Gagal menghapus pengguna.'
    isDeleteModalOpen.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>
