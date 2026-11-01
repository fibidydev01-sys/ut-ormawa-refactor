<!--
  ADMIN AREA USERS — kelola pengguna skema lama (hanya role 'super_admin', lihat temuan T25)
  File: app/features/admin-area/admin-area-users.vue
-->

<script setup lang="ts">
import {
  createAccountWithSecondaryApp,
  deleteUserRecord,
  listUserRecords,
  setUserRecord,
  toLegacyUserRow,
  updateUserRecord,
} from '~/features/users'
import { ref, onMounted } from 'vue'

const isModalOpen = ref(false)
const showModalPassword = ref(false)
const isEditMode = ref(false)
const editingUserId = ref<string | null>(null)

const { logActivity } = useActivityLog()

const users = ref<any[]>([])
const firebaseUser = useState<any>('firebaseUser')
const userRole = useState<string>('userRole')

onMounted(async () => {
  if (userRole.value !== 'super_admin') {
    alert('Akses Ditolak: Halaman ini khusus untuk Super Admin.')
    navigateTo('/dashboard/admin-area')
    return
  }

  try {
    const { db } = useFirebase()
    if (!db) return
    fetchUsers()
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
})

const fetchUsers = async () => {
  try {
    const { db } = useFirebase()
    if (!db) return
    users.value = (await listUserRecords(db)).map(toLegacyUserRow)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// State untuk form tambah pengurus
const newUser = ref({
  name: '',
  email: '',
  password: '',
  role: '',
})

const togglePassword = (user: any) => {
  if (user.password !== 'Login via Google') {
    user.showPassword = !user.showPassword
  }
}

const createUser = async () => {
  if (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.password ||
    !newUser.value.role
  ) {
    alert('Harap isi semua kolom')
    return
  }

  let organisasi = 'Unit Kegiatan'
  if (newUser.value.role === 'admin') {
    organisasi = 'Pusat (BPH)'
  } else if (newUser.value.role === 'mahasiswa') {
    organisasi = 'Mahasiswa'
  }

  try {
    const { db } = useFirebase()
    if (db) {
      if (isEditMode.value && editingUserId.value) {
        await updateUserRecord(db, editingUserId.value, {
          nama: newUser.value.name,
          email: newUser.value.email,
          password: newUser.value.password,
          role: newUser.value.role,
          prodi: organisasi,
          updatedAt: new Date().toISOString(),
        })

        await logActivity(
          firebaseUser.value?.displayName || 'Admin',
          firebaseUser.value?.uid || '',
          'mengedit profil pengguna',
          newUser.value.name,
        )

        alert('Pengguna berhasil diperbarui!')
      } else {
        // Register in Firebase Auth using a secondary app instance so admin is not logged out
        const config = useRuntimeConfig().public
        const firebaseConfig = {
          apiKey: config.firebaseApiKey,
          authDomain: config.firebaseAuthDomain,
          projectId: config.firebaseProjectId,
          storageBucket: config.firebaseStorageBucket,
          messagingSenderId: config.firebaseMessagingSenderId,
          appId: config.firebaseAppId,
        }

        const newId = await createAccountWithSecondaryApp(
          firebaseConfig,
          newUser.value.email,
          newUser.value.password,
        )

        // Create Firestore document
        await setUserRecord(db, newId, {
          nama: newUser.value.name,
          email: newUser.value.email,
          password: newUser.value.password, // For demo purposes
          role: newUser.value.role,
          prodi: organisasi,
          createdAt: new Date().toISOString(),
        })

        await logActivity(
          firebaseUser.value?.displayName || 'Admin',
          firebaseUser.value?.uid || '',
          'menambahkan pengguna baru',
          newUser.value.name,
        )

        alert('Akun berhasil dibuat dan siap untuk login!')
      }

      fetchUsers() // Refresh list
    }
  } catch (error) {
    console.error('Error saving user:', error)
    alert('Terjadi kesalahan.')
  }

  closeModal()
}

const openEditModal = (user: any) => {
  isEditMode.value = true
  editingUserId.value = user.id
  newUser.value = {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role.toLowerCase(),
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingUserId.value = null
  newUser.value = {
    name: '',
    email: '',
    password: '',
    role: '',
  }
  showModalPassword.value = false
}

const deleteUser = async (user: any) => {
  if (confirm(`Apakah Anda yakin ingin menghapus akun ${user.name}?`)) {
    try {
      const { db } = useFirebase()
      if (db) {
        await deleteUserRecord(db, user.id)
        users.value = users.value.filter((u) => u.id !== user.id)

        await logActivity(
          firebaseUser.value?.displayName || 'Admin',
          firebaseUser.value?.uid || '',
          'menghapus pengguna',
          user.name,
        )

        alert('Pengguna berhasil dihapus.')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Gagal menghapus pengguna.')
    }
  }
}
</script>

<template>
  <div class="p-4 sm:p-8 w-full px-4 sm:px-6 lg:px-12">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <NuxtLink
          to="/dashboard/admin-area"
          class="text-sm font-medium text-slate-500 hover:text-admiral mb-2 flex items-center gap-1"
        >
          &larr; Kembali ke Admin Area
        </NuxtLink>
        <h1 class="text-3xl font-extrabold text-admiral mt-2">Kelola Pengguna & Role</h1>
        <p class="text-slate-500 mt-2">Buat akun akses untuk Admin dan Pengurus Organisasi.</p>
      </div>
      <button
        class="px-5 py-2.5 bg-admiral text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
        @click="isModalOpen = true"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Tambah Pengurus
      </button>
    </div>

    <!-- Tabel Daftar Pengguna -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Pengguna
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Organisasi
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Password
            </th>
            <th
              scope="col"
              class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-admiral font-bold"
                >
                  {{ user.name.substring(0, 2).toUpperCase() }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-slate-900">{{ user.name }}</div>
                  <div class="text-sm text-slate-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="
                  user.role === 'Admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                "
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              {{ user.organisasi }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              <div class="flex items-center gap-2">
                <span
                  v-if="user.password === 'Login via Google'"
                  class="inline-block bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-500 w-40 text-sm"
                >
                  Login via Google
                </span>
                <span
                  v-else
                  class="inline-block font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-700 w-40 overflow-hidden text-ellipsis align-middle"
                >
                  {{ user.showPassword ? user.password : '••••••••••••' }}
                </span>
                <button
                  v-if="user.password !== 'Login via Google'"
                  class="text-slate-400 hover:text-admiral"
                  title="Lihat/Sembunyikan Password"
                  @click="togglePassword(user)"
                >
                  <svg
                    v-if="!user.showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-lemon-dark hover:text-admiral mr-3" @click="openEditModal(user)">
                Edit
              </button>
              <button class="text-red-600 hover:text-red-900" @click="deleteUser(user)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Tambah Pengurus -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        <div
          class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"
        >
          <h3 class="text-lg font-bold text-slate-800">
            {{ isEditMode ? 'Edit Pengguna' : 'Tambah Akun Pengurus' }}
          </h3>
          <button class="text-slate-400 hover:text-slate-600" @click="isModalOpen = false">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="createUser">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input
              v-model="newUser.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
              placeholder="Contoh: Ketua IMF FEB"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Email (Kode Pengguna)</label
            >
            <input
              v-model="newUser.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
              placeholder="imffeb@ormawautsby.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password Awal</label>
            <div class="relative">
              <input
                v-model="newUser.password"
                :type="showModalPassword ? 'text' : 'password'"
                required
                class="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
                placeholder="Ketik password di sini"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-admiral"
                @click="showModalPassword = !showModalPassword"
              >
                <svg
                  v-if="!showModalPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </button>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Berikan password ini kepada pengurus untuk login pertama kali.
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Role & Akses</label>
            <select
              v-model="newUser.role"
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
            >
              <option value="" disabled>Pilih Role...</option>
              <option value="admin">Admin (BPH Utama)</option>
              <option value="pengurus">Pengurus (Ketua IMF/UKM)</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
          </div>
          <div class="pt-4 flex gap-3">
            <button
              type="button"
              class="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              @click="closeModal"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-admiral text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              {{ isEditMode ? 'Simpan' : 'Buat Akun' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
