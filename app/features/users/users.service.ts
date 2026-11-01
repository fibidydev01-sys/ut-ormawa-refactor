// ============================================================
// USERS SERVICE — koleksi `users` + API akun di server
// File: app/features/users/users.service.ts
//
// Berisi dua gaya data yang hidup berdampingan di app lama:
//   - skema baru (full_name, role SUPER_ADMIN/ADMIN, access_modules)
//     dipakai /dashboard/users
//   - skema lama (nama, prodi, password plaintext — T14) dipakai
//     admin-area, kelola-user, area mahasiswa
// Keduanya dipertahankan apa adanya (Fase A).
// ============================================================

import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import type { DocumentData, Firestore } from 'firebase/firestore'
import type { FirebaseClientConfig } from '~/services/firebase'
import type { UserDocument } from '~/types/database'

const COLLECTION_USERS = 'users'

export interface UserRecord {
  id: string
  data: DocumentData
}

// ── Skema baru (/dashboard/users) ───────────────────────────

/** Semua user dinormalkan ke UserDocument, urut nama. */
export async function getAllUsers(db: Firestore): Promise<UserDocument[]> {
  const snapshot = await getDocs(query(collection(db, COLLECTION_USERS)))
  return snapshot.docs
    .map((d) => {
      const data = d.data() as Partial<UserDocument>
      return {
        id: d.id,
        email: typeof data.email === 'string' ? data.email : '',
        full_name: typeof data.full_name === 'string' ? data.full_name : '',
        role: data.role === 'SUPER_ADMIN' || data.role === 'ADMIN' ? data.role : 'ADMIN',
        organization_id: typeof data.organization_id === 'string' ? data.organization_id : null,
        access_modules: Array.isArray(data.access_modules) ? data.access_modules : [],
      } as UserDocument
    })
    .sort((left, right) => {
      const leftName = left.full_name?.toLowerCase() || ''
      const rightName = right.full_name?.toLowerCase() || ''
      return leftName.localeCompare(rightName)
    })
}

/** Buat akun lewat server (Auth + Firestore) — POST /api/create-user. */
export async function createUserViaApi(
  payload: Partial<UserDocument> & { password?: string; name?: string },
): Promise<void> {
  const response = await fetch('/api/create-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      name: payload.full_name, // endpoint masih membaca "name"
      role: payload.role,
      organization_id: payload.organization_id || null,
      access_modules: payload.access_modules || [],
    }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.statusMessage || 'Gagal membuat pengguna')
  }
}

/** Hapus akun lewat server (Auth + Firestore) — POST /api/delete-user. */
export async function deleteUserViaApi(uid: string): Promise<void> {
  const response = await fetch('/api/delete-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.statusMessage || 'Gagal menghapus pengguna')
  }
}

// ── Akses dokumen mentah (skema lama & data profil) ─────────

export async function listUserRecords(db: Firestore): Promise<UserRecord[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_USERS))
  return snapshot.docs.map((d) => ({ id: d.id, data: d.data() }))
}

/** Dokumen users/{uid} atau null bila tidak ada. */
export async function getUserRecord(db: Firestore, uid: string): Promise<UserRecord | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_USERS, uid))
  return snapshot.exists() ? { id: snapshot.id, data: snapshot.data() } : null
}

export async function setUserRecord(
  db: Firestore,
  uid: string,
  data: DocumentData,
  options: { merge?: boolean } = {},
): Promise<void> {
  await setDoc(doc(db, COLLECTION_USERS, uid), data, options)
}

export async function updateUserRecord(
  db: Firestore,
  uid: string,
  data: DocumentData,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_USERS, uid), data)
}

export async function deleteUserRecord(db: Firestore, uid: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_USERS, uid))
}

/**
 * Buat akun Firebase Auth TANPA mengganti sesi admin yang sedang
 * login: pakai instance Firebase sekunder lalu langsung sign out.
 * (Cara lama di admin-area/kelola-user.)
 */
export async function createAccountWithSecondaryApp(
  firebaseConfig: FirebaseClientConfig,
  email: string,
  password: string,
): Promise<string> {
  const secondaryApp = initializeApp(firebaseConfig, `SecondaryApp_${Date.now()}`)
  const secondaryAuth = getAuth(secondaryApp)
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
  const newId = userCredential.user.uid
  await secondaryAuth.signOut()
  return newId
}

// ── Baris tabel user skema lama (admin-area & kelola-user) ──

export interface LegacyUserRow {
  id: string
  name: string
  email: string
  role: string
  organisasi: string
  password: string
  showPassword: boolean
}

/** Bentuk tampilan tabel user lama — sebelumnya disalin di 2 halaman. */
export function toLegacyUserRow({ id, data }: UserRecord): LegacyUserRow {
  let organisasi = data.prodi || 'Pusat (BPH)'
  if (data.role === 'mahasiswa' && data.prodi) organisasi = data.prodi
  else if (data.role === 'mahasiswa' && !data.prodi) organisasi = 'Mahasiswa'
  return {
    id,
    name: data.nama || 'Tanpa Nama',
    email: data.email || '-',
    role: data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : 'Mahasiswa',
    organisasi,
    password: data.password || 'Login via Google',
    showPassword: false,
  }
}
