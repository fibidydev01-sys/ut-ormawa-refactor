// ============================================================
// waitForAuthReady — tunggu Firebase Auth selesai cek sesi
// File: app/utils/wait-for-auth.ts
//
// Dipakai middleware `auth` & `login-required`. Batas 5 detik agar
// tidak menggantung selamanya (perilaku lama middleware auth).
// ============================================================

export async function waitForAuthReady(timeoutMs = 5000): Promise<void> {
  const isAuthReady = useState('isAuthReady')
  if (isAuthReady.value) return
  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      console.warn('[auth middleware] Timeout menunggu Firebase Auth, lanjutkan...')
      resolve()
    }, timeoutMs)

    const stop = watch(isAuthReady, (ready) => {
      if (ready) {
        stop()
        clearTimeout(timeout)
        resolve()
      }
    })
  })
}
