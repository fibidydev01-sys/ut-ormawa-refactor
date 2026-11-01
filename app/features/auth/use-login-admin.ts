// ============================================================
// useLoginAdmin — login email+password & sidik jari
// File: app/features/auth/use-login-admin.ts
// Dipindah apa adanya dari komponennya (S5). Tujuan setelah login ditentukan role di dokumen users (temuan T24).
// ============================================================

import type { AppError } from '~/types/database'
import { ref } from 'vue'
import { signInWithPasskey, signInWithPassword } from '~/features/auth'
import { getUserRecord } from '~/features/users'

export function useLoginAdmin() {
  // Admin State
  const email = ref('')

  const password = ref('')

  const showPassword = ref(false)

  const errorMessage = ref('')

  const isAdminLoading = ref(false)

  // Action: Login Admin
  const loginAdmin = async () => {
    errorMessage.value = ''
    isAdminLoading.value = true
    try {
      const { auth, db } = useFirebase()

      if (!auth) {
        errorMessage.value = 'Firebase tidak dikonfigurasi. Periksa .env Anda.'
        isAdminLoading.value = false
        return
      }

      const result = await signInWithPassword(auth, email.value, password.value)

      let role = 'mahasiswa'
      try {
        const userRecord = await getUserRecord(db!, result.user.uid)
        if (userRecord) {
          role = String(userRecord.data.role || 'mahasiswa')
            .trim()
            .toLowerCase()
        }
      } catch (readError) {
        console.warn('Gagal membaca dokumen user saat login:', readError)
        role = 'mahasiswa'
      }

      const userRole = useState('userRole')
      const firebaseUser = useState('firebaseUser')
      userRole.value = role
      firebaseUser.value = result.user

      if (role === 'admin' || role === 'super_admin' || role === 'pengurus') {
        navigateTo('/dashboard')
      } else if (role === 'mahasiswa') {
        navigateTo('/dashboard/mahasiswa')
      } else {
        errorMessage.value = 'Akun Anda tidak memiliki akses yang valid.'
      }
    } catch (caught) {
      const error = caught as AppError
      console.error('Login error:', error)
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage.value = 'Email atau password salah.'
      } else {
        errorMessage.value = error.message || 'Terjadi kesalahan saat login.'
      }
    } finally {
      isAdminLoading.value = false
    }
  }

  // Action: Login Sidik Jari (WebAuthn)
  const isPasskeyLoading = ref(false)

  const loginWithPasskey = async () => {
    errorMessage.value = ''
    isPasskeyLoading.value = true

    try {
      const { auth, requireDb } = useFirebase()
      const result = await signInWithPasskey(auth!)

      // Cek role
      const userRecord = await getUserRecord(requireDb(), result.user.uid)
      let role = 'mahasiswa'
      if (userRecord) {
        role = (userRecord.data.role || '').trim()
      }

      const userRole = useState('userRole')
      const firebaseUser = useState('firebaseUser')
      userRole.value = role
      firebaseUser.value = result.user

      if (role === 'admin' || role === 'super_admin' || role === 'pengurus') {
        navigateTo('/dashboard')
      } else {
        navigateTo('/dashboard/mahasiswa')
      }
    } catch (caught) {
      const error = caught as AppError
      console.error('Passkey Login Error:', error)
      errorMessage.value = error.message || 'Login sidik jari gagal.'
    } finally {
      isPasskeyLoading.value = false
    }
  }

  return {
    email,
    password,
    showPassword,
    errorMessage,
    isAdminLoading,
    loginAdmin,
    isPasskeyLoading,
    loginWithPasskey,
  }
}
