// ============================================================
// GET /api/auth/me — siapa yang login (dari cookie __session)
// File: server/api/auth/me.get.ts
//
// Mengembalikan { user: SessionUser | null } (selalu objek — null mentah
// dibalas H3 sebagai 204 tanpa body). Cookie tidak valid / kedaluwarsa
// → dibersihkan. Dipakai tombol "Dashboard" di navbar (S8).
// ============================================================

import { isFirebaseAdminConfigured } from '~~/server/utils/firebaseAdmin'
import { clearSessionCookies, readSessionUser, SESSION_COOKIE } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  if (!isFirebaseAdminConfigured() || !getCookie(event, SESSION_COOKIE)) return { user: null }
  const user = await readSessionUser(event)
  if (!user) clearSessionCookies(event)
  return { user }
})
