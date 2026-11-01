// ============================================================
// requireSuperAdmin — guard API khusus SUPER_ADMIN
// File: server/utils/requireRole.ts
//
// [S7 — temuan T8] Pemanggil dikenali dari (urutan):
//   1. header `Authorization: Bearer <Firebase ID token>`
//   2. cookie `__session` (session cookie Firebase)
// lalu role dibaca dari users/{uid}. Role lama huruf kecil
// ('super_admin') tetap diterima, sama seperti normalizeRole di client.
//   tanpa kredensial / tidak valid → 401
//   bukan SUPER_ADMIN              → 403
// ============================================================

import type { H3Event } from 'h3'
import { getAdminAuth, getAdminDb } from './firebaseAdmin'
import { SESSION_COOKIE } from './session'

export async function requireSuperAdmin(event: H3Event): Promise<{ uid: string }> {
  const auth = getAdminAuth()
  const header = getHeader(event, 'authorization') ?? ''
  const bearer = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : ''
  const cookie = getCookie(event, SESSION_COOKIE)

  let uid: string
  try {
    if (bearer) uid = (await auth.verifyIdToken(bearer)).uid
    else if (cookie) uid = (await auth.verifySessionCookie(cookie)).uid
    else throw new Error('tanpa kredensial')
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Harus login sebagai Super Admin' })
  }

  const snap = await getAdminDb().doc(`users/${uid}`).get()
  const role = String(snap.data()?.role ?? '').toUpperCase()
  if (role !== 'SUPER_ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Hanya Super Admin yang boleh melakukan ini',
    })
  }
  return { uid }
}
