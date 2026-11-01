// ============================================================
// FIREBASE CLIENT SERVICE
// File: app/services/firebase.ts
//
// Satu-satunya tempat Firebase client SDK diinisialisasi
// (GOLDEN-PLAN R8). plugins/firebase.client.ts hanya memanggil
// fungsi di sini lalu menyediakan $auth / $db / $storage.
//
// Fungsi di file ini murni (tanpa state Vue) supaya bisa dipakai
// ulang oleh service fitur di S3.
// ============================================================

import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, doc, getDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

export interface FirebaseClientConfig {
  apiKey?: string
  authDomain?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  /**
   * Host Firebase Emulator Suite (mis. '127.0.0.1'). Hanya diisi oleh
   * test layer (tests/e2e.mjs); di produksi kosong → tidak berpengaruh.
   */
  emulatorHost?: string
}

export interface FirebaseClients {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  storage: FirebaseStorage
}

/**
 * Inisialisasi Firebase sekali saja. Mengembalikan `null` bila
 * konfigurasi tidak ada (mis. build tes tanpa .env) — sama seperti
 * perilaku plugin lama yang berhenti diam-diam.
 */
export function initFirebase(config: FirebaseClientConfig): FirebaseClients | null {
  const { emulatorHost, ...firebaseConfig } = config
  let app: FirebaseApp | undefined
  if (!getApps().length && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig)
  } else if (getApps().length) {
    app = getApps()[0]
  }
  if (!app) return null

  const clients = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  }
  if (emulatorHost) connectEmulators(clients, emulatorHost)
  return clients
}

const connectedToEmulator = new WeakSet<FirebaseApp>()

function connectEmulators({ app, auth, db, storage }: FirebaseClients, host: string): void {
  if (connectedToEmulator.has(app)) return
  connectedToEmulator.add(app)
  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
  connectFirestoreEmulator(db, host, 8080)
  connectStorageEmulator(storage, host, 9199)
}

export interface UserAccess {
  role: string
  accessModules: string[]
}

/**
 * Ambil role & modul akses dari dokumen `users/{uid}`.
 * Dokumen tidak ada atau gagal dibaca → dianggap 'mahasiswa'
 * (perilaku lama, lihat GOLDEN-PLAN T5/T6).
 */
export async function fetchUserAccess(db: Firestore, uid: string): Promise<UserAccess> {
  try {
    const userDocSnap = await getDoc(doc(db, 'users', uid))
    if (userDocSnap.exists()) {
      const data = userDocSnap.data()
      return {
        role: data.role || 'mahasiswa',
        accessModules: Array.isArray(data.access_modules) ? data.access_modules : [],
      }
    }
    return { role: 'mahasiswa', accessModules: [] }
  } catch (error) {
    console.error('Error fetching user role:', error)
    return { role: 'mahasiswa', accessModules: [] }
  }
}

/** Keluar dari Firebase Auth. `false` bila auth belum tersedia. */
export async function signOutUser(auth: Auth | undefined): Promise<boolean> {
  if (!auth) return false
  const { signOut } = await import('firebase/auth')
  await signOut(auth)
  return true
}
