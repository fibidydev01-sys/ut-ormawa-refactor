// ============================================================
// TEST AUTH — sesi palsu untuk screenshot parity dashboard
// File: tests/layer/app/plugins/test-auth.ts
//
// Halaman dashboard butuh login Firebase, jadi tidak bisa difoto
// di build tes (tanpa env Firebase). Plugin ini membaca cookie
// `__ormawa_test_auth` (diset oleh tests/screens.mjs) dan mengisi
// state auth yang sama dengan yang diisi plugins/firebase.client.ts:
// firebaseUser, userRole, accessModules, isAuthReady.
//
// Universal (server + client) supaya middleware auth di SSR juga
// melihat user "login" — tanpa itu SSR menunggu 5 detik lalu
// redirect ke /login/admin (lihat GOLDEN-PLAN T16).
//
// HANYA dimuat oleh tests/layer (ORMAWA_TEST=1). Firestore rules &
// API server tidak terpengaruh: ini cuma state UI.
// ============================================================

interface TestAuth {
  uid: string
  email: string
  displayName: string | null
  role: string
  accessModules?: string[]
}

export default defineNuxtPlugin({
  name: 'ormawa-test-auth',
  enforce: 'pre',
  setup() {
    const cookie = useCookie<TestAuth | null>('__ormawa_test_auth')
    const auth = cookie.value
    if (!auth) return

    useState<unknown>('firebaseUser').value = {
      uid: auth.uid,
      email: auth.email,
      displayName: auth.displayName,
    }
    useState<string | null>('userRole').value = auth.role
    useState<string[]>('accessModules').value = auth.accessModules ?? []
    useState<boolean>('isAuthReady').value = true
  },
})
