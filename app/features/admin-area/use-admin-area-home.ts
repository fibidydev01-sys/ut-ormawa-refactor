// ============================================================
// useAdminAreaHome — state & aksi panel admin lama (/dashboard/admin-area)
// File: app/features/admin-area/use-admin-area-home.ts
//
// Dipindah apa adanya dari halaman admin-area/index (S5): tab, profil,
// daftar pengguna skema lama (+ modal tambah/edit), daftar passkey,
// catatan pribadi (autosave 1 detik), log aktivitas (temuan T18), logout.
// Disediakan ke header, sidebar, tab & modal lewat provide/inject.
// ============================================================

import type { ActivityLog, LegacyUserRow } from '~/features/users'
import type { AuthUser, AppError  } from '~/types/database'
import { computed, inject, onMounted, ref } from 'vue'
import type { InjectionKey } from 'vue'
import { signOutUser } from '~/services/firebase'
import { registerPasskey as registerPasskeyDevice } from '~/features/auth'
import {
  createAccountWithSecondaryApp,
  deleteUserRecord,
  getUserRecord,
  listActivityLogs,
  listUserRecords,
  setUserRecord,
  toLegacyUserRow,
  updateUserRecord,
} from '~/features/users'

export function useAdminAreaHome() {
  // Disable default layout — halaman ini self-contained seperti sandbox

  // ==========================================
  // KELOLA PENGGUNA (dari kelola-user.vue)
  // ==========================================
  const isModalOpen = ref(false)
  const showModalPassword = ref(false)
  const isEditMode = ref(false)
  const editingUserId = ref<string | null>(null)
  const users = ref<LegacyUserRow[]>([])

  const { logActivity } = useActivityLog()

  const newUser = ref({ name: '', email: '', password: '', role: '' })

  const fetchUsers = async () => {
    try {
      const { db } = useFirebase()
      if (!db) return
      users.value = (await listUserRecords(db)).map(toLegacyUserRow)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const togglePassword = (user: LegacyUserRow) => {
    if (user.password !== 'Login via Google') user.showPassword = !user.showPassword
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
    if (newUser.value.role === 'admin') organisasi = 'Pusat (BPH)'
    else if (newUser.value.role === 'mahasiswa') organisasi = 'Mahasiswa'
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
          await setUserRecord(db, newId, {
            nama: newUser.value.name,
            email: newUser.value.email,
            password: newUser.value.password,
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
        fetchUsers()
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
    newUser.value = { name: '', email: '', password: '', role: '' }
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

  // ==========================================
  // STATE
  // ==========================================
  const profileOpen = ref(false)
  const activeTab = ref('Dashboard')
  const tabs = ['Dashboard', 'Konten', 'Pengguna', 'Proposal', 'Pengaturan']

  const userRole = useState('userRole')
  const firebaseUser = useState<AuthUser | null>('firebaseUser')

  const userName = computed(
    () => firebaseUser.value?.displayName || firebaseUser.value?.email?.split('@')[0] || 'Admin',
  )

  const initials = computed(() => {
    const name = userName.value as string
    return name
      .split(' ')
      .map((n: string) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  })

  const roleLabel = computed(() => {
    const role = userRole.value
    if (role === 'super_admin') return 'Super Admin'
    if (role === 'admin') return 'Admin'
    return 'Pengurus'
  })

  // ==========================================
  // WebAuthn Passkey Registration Logic
  // ==========================================
  const isRegisteringPasskey = ref(false)
  const passkeyMessage = ref('')
  const passkeyError = ref(false)

  const registerPasskey = async () => {
    if (!firebaseUser.value?.uid || !firebaseUser.value?.email) {
      passkeyError.value = true
      passkeyMessage.value = 'Data user tidak lengkap.'
      return
    }
    isRegisteringPasskey.value = true
    passkeyMessage.value = ''
    passkeyError.value = false
    try {
      await registerPasskeyDevice(firebaseUser.value.email, firebaseUser.value.uid)
      passkeyMessage.value = 'Hore! Perangkat ini berhasil didaftarkan.'
    } catch (caught) {
      const error = caught as AppError
      console.error('Error registering passkey:', error)
      passkeyError.value = true
      passkeyMessage.value = error.message || 'Gagal mendaftarkan sidik jari.'
    } finally {
      isRegisteringPasskey.value = false
    }
  }

  // ==========================================
  // Notepad Logic
  // ==========================================
  const adminNote = ref('')
  const isSavingNote = ref(false)
  const noteSaved = ref(false)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  const fetchNote = async () => {
    try {
      const { db } = useFirebase()
      if (!db || !firebaseUser.value?.uid) return
      const userRecord = await getUserRecord(db, firebaseUser.value.uid)
      if (userRecord && userRecord.data.personalNote) {
        adminNote.value = userRecord.data.personalNote
      }
    } catch (e) {
      console.error('Error fetching note', e)
    }
  }

  const saveNoteToDb = async () => {
    if (!firebaseUser.value?.uid) return
    isSavingNote.value = true
    noteSaved.value = false
    try {
      await setUserRecord(
        useFirebase().requireDb(),
        firebaseUser.value.uid,
        { personalNote: adminNote.value },
        { merge: true },
      )
      noteSaved.value = true
      setTimeout(() => {
        noteSaved.value = false
      }, 2000)
    } catch (e) {
      console.error('Error saving note', e)
    } finally {
      isSavingNote.value = false
    }
  }

  const debouncedSaveNote = () => {
    if (saveTimeout) clearTimeout(saveTimeout)
    noteSaved.value = false
    saveTimeout = setTimeout(() => {
      saveNoteToDb()
    }, 1000)
  }

  // ==========================================
  // Activity Logs
  // ==========================================
  const globalLogs = ref<ActivityLog[]>([])

  const formatTime = (isoString: string) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    return d.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB'
  }

  const fetchLogs = async () => {
    try {
      const { db } = useFirebase()
      if (!db) return
      globalLogs.value = (await listActivityLogs(db)).slice(0, 5)
    } catch (error) {
      console.error('Failed to fetch global logs', error)
    }
  }

  onMounted(() => {
    fetchNote()
    fetchLogs()
    if (userRole.value === 'super_admin') fetchUsers()
  })

  // ==========================================
  // Logout
  // ==========================================
  const logout = async () => {
    try {
      await signOutUser(useFirebase().auth)
      navigateTo('/')
    } catch (error) {
      console.error('Logout error:', error)
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
    profileOpen,
    activeTab,
    tabs,
    userRole,
    userName,
    initials,
    roleLabel,
    isRegisteringPasskey,
    passkeyMessage,
    passkeyError,
    registerPasskey,
    adminNote,
    isSavingNote,
    noteSaved,
    debouncedSaveNote,
    globalLogs,
    formatTime,
    logout,
  }
}

export type AdminAreaHome = ReturnType<typeof useAdminAreaHome>
export const ADMIN_AREA_HOME: InjectionKey<AdminAreaHome> = Symbol('admin-area-home')

export function injectAdminAreaHome(): AdminAreaHome {
  const state = inject(ADMIN_AREA_HOME)
  if (!state) throw new Error('injectAdminAreaHome() dipanggil di luar <AdminAreaHome>')
  return state
}
