// ============================================================
// CREATE SUPER ADMIN (bootstrap)
// File: scripts/create-admin.js
//
// Membuat akun SUPER_ADMIN langsung dengan Firebase Admin SDK —
// hasilnya sama persis dengan POST /api/create-user (akun Auth +
// custom claim role + dokumen users/{uid}).
//
// [S1 — T13] Kredensial dibaca dari env, bukan ditulis di file.
// [S7 — T8] /api/create-user sekarang wajib login SUPER_ADMIN, jadi
// SUPER_ADMIN pertama tidak bisa lagi dibuat lewat API tanpa login.
// Script ini memakai serviceAccountKey.json di root repo (sama dengan
// script seed) dan tidak butuh dev server.
//
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/create-admin.js
//
// Opsional: ADMIN_NAME (default "Super Admin Utama").
// Emulator: set FIREBASE_AUTH_EMULATOR_HOST & FIRESTORE_EMULATOR_HOST
// (+ GCLOUD_PROJECT) — serviceAccountKey.json tidak diperlukan.
// ============================================================

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const email = process.env.ADMIN_EMAIL?.trim()
const password = process.env.ADMIN_PASSWORD
const name = (process.env.ADMIN_NAME || 'Super Admin Utama').trim()

if (!email || !password) {
  console.error('ADMIN_EMAIL dan ADMIN_PASSWORD wajib di-set. Contoh:')
  console.error(
    '  ADMIN_EMAIL=admin@contoh.com ADMIN_PASSWORD=rahasia node scripts/create-admin.js',
  )
  process.exit(1)
}

const keyPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'serviceAccountKey.json',
)
const useEmulator = !!process.env.FIREBASE_AUTH_EMULATOR_HOST

if (!getApps().length) {
  if (existsSync(keyPath)) {
    initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
  } else if (useEmulator) {
    initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'demo-ormawa' })
  } else {
    console.error('serviceAccountKey.json tidak ditemukan di root repo.')
    process.exit(1)
  }
}

console.log('Membuat akun super admin...')

try {
  const user = await getAuth().createUser({ email, password, displayName: name })
  await getAuth().setCustomUserClaims(user.uid, { role: 'SUPER_ADMIN' })
  await getFirestore().collection('users').doc(user.uid).set({
    id: user.uid,
    email,
    full_name: name,
    role: 'SUPER_ADMIN',
    organization_id: null,
    access_modules: [],
    createdAt: new Date().toISOString(),
  })
  console.log('Akun berhasil dibuat:', { success: true, uid: user.uid })
} catch (error) {
  console.error('Error:', error.message || error)
  process.exit(1)
}
