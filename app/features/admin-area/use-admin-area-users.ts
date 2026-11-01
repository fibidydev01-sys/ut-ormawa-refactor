// ============================================================
// useAdminAreaUsers — state & aksi "Kelola Pengguna" (skema lama)
// File: app/features/admin-area/use-admin-area-users.ts
//
// Dipindah apa adanya dari halaman admin-area/kelola-user (S5).
// Hanya role persis 'super_admin' yang boleh masuk (temuan T25);
// password ikut disimpan plaintext (temuan T14) — perilaku lama.
// Disediakan ke tabel & modal lewat provide/inject.
// ============================================================

import type { LegacyUserRow } from '~/features/users'
import type { AuthUser } from '~/types/database'
import {
  createAccountWithSecondaryApp,
  deleteUserRecord,
  listUserRecords,
  setUserRecord,
  toLegacyUserRow,
  updateUserRecord,
} from '~/features/users'
import { inject, onMounted, ref } from 'vue'
import type { InjectionKey } from 'vue'

export function useAdminAreaUsers() {
  const isModalOpen = ref(false)
  const showModalPassword = ref(false)
  const isEditMode = ref(false)
  const editingUserId = ref<string | null>(null)

  const { logActivity } = useActivityLog()

  const users = ref<LegacyUserRow[]>([])
  const firebaseUser = useState<AuthUser | null>('firebaseUser')
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

  const togglePassword = (user: LegacyUserRow) => {
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

  const openEditModal = (user: LegacyUserRow) => {
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

  const deleteUser = async (user: LegacyUserRow) => {
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

  return {
    isModalOpen,
    showModalPassword,
    isEditMode,
    users,
    newUser,
    togglePassword,
    createUser,
    openEditModal,
    closeModal,
    deleteUser,
  }
}

export type AdminAreaUsers = ReturnType<typeof useAdminAreaUsers>
export const ADMIN_AREA_USERS: InjectionKey<AdminAreaUsers> = Symbol('admin-area-users')

export function injectAdminAreaUsers(): AdminAreaUsers {
  const state = inject(ADMIN_AREA_USERS)
  if (!state) throw new Error('injectAdminAreaUsers() dipanggil di luar <AdminAreaUsers>')
  return state
}
