// ============================================================
// POST /api/auth/session — tukar Firebase ID token → cookie __session
// File: server/api/auth/session.post.ts
//
// Dipanggil plugin firebase.client setiap Firebase melaporkan user login
// (semua metode: password, Google, magic link, passkey).
//
// Catatan keamanan: dokumentasi Firebase menyarankan menolak ID token yang
// auth_time-nya > 5 menit. Itu TIDAK diterapkan karena user lama yang
// login-nya tersimpan di browser juga harus mendapat cookie — risiko:
// ID token curian (masa berlaku 1 jam) bisa ditukar cookie 7 hari.
// ============================================================

import { getAdminAuth, isFirebaseAdminConfigured } from '~~/server/utils/firebaseAdmin'
import { SESSION_MAX_AGE_SECONDS, setSessionCookies } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  if (!isFirebaseAdminConfigured()) {
    throw createError({ statusCode: 503, statusMessage: 'Firebase Admin belum dikonfigurasi' })
  }
  const body = await readBody<{ idToken?: unknown }>(event)
  const idToken = typeof body?.idToken === 'string' ? body.idToken : ''
  if (!idToken) throw createError({ statusCode: 400, statusMessage: 'idToken wajib diisi' })

  try {
    const auth = getAdminAuth()
    const decoded = await auth.verifyIdToken(idToken)
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    })
    setSessionCookies(event, sessionCookie, decoded.uid)
    return { ok: true }
  } catch (error) {
    console.error('[auth/session] Gagal membuat session cookie:', error)
    throw createError({ statusCode: 401, statusMessage: 'ID token tidak valid' })
  }
})
