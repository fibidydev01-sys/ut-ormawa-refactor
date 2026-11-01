// ============================================================
// useFirebase — akses instance Firebase client dari plugin
// File: app/composables/use-firebase.ts
//
// Instance bisa `undefined` (env Firebase tidak diisi), jadi tipe
// di sini jujur soal itu. `requireDb()` meniru pola lama
// `if (!$db) throw new Error('Firestore belum diinisialisasi.')`.
// ============================================================

import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'

export function useFirebase() {
  const nuxtApp = useNuxtApp()
  const auth = nuxtApp.$auth as Auth | undefined
  const db = nuxtApp.$db as Firestore | undefined
  const storage = nuxtApp.$storage as FirebaseStorage | undefined

  function requireDb(message = 'Firestore belum diinisialisasi.'): Firestore {
    if (!db) throw new Error(message)
    return db
  }

  return { auth, db, storage, requireDb }
}
