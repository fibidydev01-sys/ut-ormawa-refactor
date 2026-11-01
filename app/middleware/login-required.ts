// ============================================================
// NUXT ROUTE MIDDLEWARE: login-required
// File: app/middleware/login-required.ts
//
// [S7 — T15] Area mahasiswa (/dashboard/mahasiswa, /edit-profil):
// cukup sudah login (role apa pun). Belum login → /login/mahasiswa.
// Middleware `auth` tidak dipakai di sini karena menolak role
// `mahasiswa` (bukan SUPER_ADMIN/ADMIN).
// ============================================================

export default defineNuxtRouteMiddleware(async () => {
  await waitForAuthReady()
  // currentUser: jaga-jaga navigasi tepat setelah sign-in, sebelum
  // onAuthStateChanged sempat mengisi state.
  if (!useState('firebaseUser').value && !useFirebase().auth?.currentUser) {
    return navigateTo('/login/mahasiswa', { replace: true })
  }
})
