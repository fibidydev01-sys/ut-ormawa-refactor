// ============================================================
// useMagicLinkLogin — kirim & selesaikan login magic link
// File: app/features/auth/use-magic-link-login.ts
// Dipindah apa adanya dari komponennya (S5). Saat komponen dipasang, bila URL adalah tautan login → selesaikan login (temuan T19).
// ============================================================

import type { AppError } from '~/types/database'
import { onMounted, ref } from 'vue'
import { completeEmailLinkSignIn, isEmailSignInLink, sendEmailSignInLink } from '~/features/auth'
import { getUserRecord, setUserRecord } from '~/features/users'

export function useMagicLinkLogin() {
  // Mahasiswa State
  const mhsEmail = ref('')

  const errorMahasiswa = ref('')

  const isLoadingMahasiswa = ref(false)

  const linkSent = ref(false)

  const isVerifying = ref(false)

  // Action: Kirim Link Mahasiswa
  const sendLoginLink = async () => {
    if (!mhsEmail.value) return

    isLoadingMahasiswa.value = true
    errorMahasiswa.value = ''

    try {
      const { auth } = useFirebase()

      if (!auth) throw new Error('Konfigurasi Firebase belum siap.')

      const actionCodeSettings = {
        // Menyisipkan parameter email ke dalam URL agar sistem tidak perlu bertanya lagi
        url:
          window.location.origin +
          window.location.pathname +
          '?userEmail=' +
          encodeURIComponent(mhsEmail.value),
        handleCodeInApp: true,
      }

      await sendEmailSignInLink(auth, mhsEmail.value, actionCodeSettings)

      window.localStorage.setItem('emailForSignIn', mhsEmail.value)
      linkSent.value = true
    } catch (caught) {
      const error = caught as AppError
      console.error('Error mengirim email link:', error)
      if (error.code === 'auth/unauthorized-continue-uri') {
        errorMahasiswa.value = 'Domain website belum diizinkan di Firebase Console.'
      } else {
        errorMahasiswa.value = error.message || 'Gagal mengirim tautan persetujuan.'
      }
    } finally {
      isLoadingMahasiswa.value = false
    }
  }

  // Lifecycle
  onMounted(async () => {
    const { auth, requireDb } = useFirebase()
    if (!auth) return

    try {
      // Mengecek apakah ada parameter persetujuan magic link dari inbox
      if (isEmailSignInLink(auth, window.location.href)) {
        isVerifying.value = true

        // Ambil email dari cache browser
        let savedEmail = window.localStorage.getItem('emailForSignIn')

        // Jika kosong (browser berbeda/incognito), coba ambil otomatis dari parameter URL
        if (!savedEmail) {
          const urlParams = new URLSearchParams(window.location.search)
          savedEmail = urlParams.get('userEmail')
        }

        if (!savedEmail) {
          savedEmail = window.prompt(
            'Tautan terdeteksi. Silakan masukkan ulang email Anda untuk konfirmasi keamanan:',
          )
        }

        if (savedEmail) {
          try {
            const result = await completeEmailLinkSignIn(auth, savedEmail, window.location.href)
            window.localStorage.removeItem('emailForSignIn')

            // Periksa dokumen firestore
            const db = requireDb()
            const userRecord = await getUserRecord(db, result.user.uid)

            if (!userRecord) {
              await setUserRecord(db, result.user.uid, {
                uid: result.user.uid,
                email: result.user.email,
                nama: result.user.email?.split('@')[0] || 'Mahasiswa',
                role: 'mahasiswa',
                createdAt: new Date().toISOString(),
              })
            }

            navigateTo('/dashboard/mahasiswa')
          } catch (caught) {
            const error = caught as AppError
            console.error('Error saat verifikasi link:', error)
            errorMahasiswa.value =
              'Tautan login tidak valid, sudah digunakan, atau telah kedaluwarsa.'
          }
        } else {
          errorMahasiswa.value = 'Email diperlukan untuk menyelesaikan proses login.'
        }
        isVerifying.value = false
      }
    } catch (err) {
      console.error('Firebase Error:', err)
    }
  })

  return {
    mhsEmail,
    errorMahasiswa,
    isLoadingMahasiswa,
    linkSent,
    isVerifying,
    sendLoginLink,
  }
}
