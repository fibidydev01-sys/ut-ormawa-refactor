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
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

export interface FirebaseClientConfig {
  apiKey?: string
  authDomain?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
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
  let app: FirebaseApp | undefined
  if (!getApps().length && config.apiKey) {
    app = initializeApp(config)
  } else if (getApps().length) {
    app = getApps()[0]
  }
  if (!app) return null

  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  }
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
