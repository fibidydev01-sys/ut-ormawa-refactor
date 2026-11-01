// ============================================================
// TEST LAYER — hanya aktif saat ORMAWA_TEST=1 (`npm run build:test`)
// File: tests/layer/nuxt.config.ts
//
// Di-extend oleh nuxt.config.ts root bila env ORMAWA_TEST=1.
// Build produksi (`npm run build`) TIDAK memuat layer ini.
// ============================================================
export default defineNuxtConfig({
  runtimeConfig: {
    // Service account palsu (dibuat tests/e2e.mjs) untuk API create-user
    // di atas Auth Emulator — key ini juga dibuang Nuxt bila undefined.
    firebaseAdminKey: '',
    public: {
      // Diisi saat runtime oleh tests/e2e.mjs lewat env
      // NUXT_PUBLIC_FIREBASE_EMULATOR_HOST → client tersambung ke
      // Firebase Emulator Suite (lihat services/firebase.ts).
      firebaseEmulatorHost: '',
      // Key bernilai undefined saat build dibuang dari runtimeConfig, jadi
      // env NUXT_PUBLIC_FIREBASE_* tidak bisa menimpanya. Default kosong
      // di sini membuat key-nya ada (root tetap menang bila env build diisi).
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
    },
  },
})
