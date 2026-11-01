// ============================================================
// FIREBASE CLIENT PLUGIN
// File: app/plugins/firebase.client.ts
//
// [S2] Inisialisasi & pembacaan role dipindah ke services/firebase.ts,
// state auth ke stores/auth.ts. Plugin ini hanya merangkai:
//   1. initFirebase()          → provide $auth, $db, $storage
//   2. onAuthStateChanged      → isi auth store (user, role, modul)
// Perilaku identik dengan versi lama.
// ============================================================

import { onAuthStateChanged } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'
import { initFirebase, fetchUserAccess } from '~/services/firebase'
import { useAuthStore } from '~/stores/auth'

declare module '#app' {
  interface NuxtApp {
    $auth: Auth
    $db: Firestore
    $storage: FirebaseStorage
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth
    $db: Firestore
    $storage: FirebaseStorage
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebase = initFirebase({
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  })
  if (!firebase) return // Konfigurasi tidak ada

  nuxtApp.provide('auth', firebase.auth)
  nuxtApp.provide('db', firebase.db)
  nuxtApp.provide('storage', firebase.storage)

  const authStore = useAuthStore()

  onAuthStateChanged(firebase.auth, async (user) => {
    authStore.user = user

    if (user) {
      const access = await fetchUserAccess(firebase.db, user.uid)
      authStore.role = access.role
      authStore.accessModules = access.accessModules
    } else {
      authStore.role = null
      authStore.accessModules = []
    }

    authStore.isReady = true
  })
})
