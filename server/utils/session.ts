// ============================================================
// SESSION COOKIE — Firebase Session Cookie di `__session`
// File: server/utils/session.ts
//
// GOLDEN-PLAN §6. Nama WAJIB `__session`: Firebase Hosting membuang
// cookie lain sebelum request diteruskan ke Cloud Functions.
//
//   __session       httpOnly, berisi session cookie Firebase (JWT)
//   ormawa_session  BUKAN httpOnly, hanya berisi uid — petunjuk untuk
//                   client "sesi server sudah ada" agar tidak membuat
//                   ulang tiap halaman & tidak memanggil logout sia-sia.
// ============================================================

import type { H3Event } from 'h3'
import { getAdminAuth, getAdminDb } from './firebaseAdmin'

export const SESSION_COOKIE = '__session'
export const SESSION_HINT_COOKIE = 'ormawa_session'
/** 7 hari (Firebase mengizinkan 5 menit – 14 hari). Lihat Q2 di docs/temuan.md. */
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60

export interface SessionUser {
  uid: string
  email: string | null
  name: string | null
  /** Role mentah dari dokumen users (bisa 'SUPER_ADMIN', 'admin', 'mahasiswa', …). */
  role: string
  accessModules: string[]
}

export function setSessionCookies(event: H3Event, sessionCookie: string, uid: string): void {
  const common = { path: '/', sameSite: 'lax' as const, secure: true, maxAge: SESSION_MAX_AGE_SECONDS }
  setCookie(event, SESSION_COOKIE, sessionCookie, { ...common, httpOnly: true })
  setCookie(event, SESSION_HINT_COOKIE, uid, { ...common, httpOnly: false })
}

export function clearSessionCookies(event: H3Event): void {
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
  deleteCookie(event, SESSION_HINT_COOKIE, { path: '/' })
}

/**
 * User dari cookie `__session`, atau null bila tidak ada / tidak valid.
 * Role & modul dibaca dari users/{uid} — perilaku sama dengan
 * fetchUserAccess() di client (dokumen tak ada → 'mahasiswa').
 */
export async function readSessionUser(event: H3Event): Promise<SessionUser | null> {
  const cookie = getCookie(event, SESSION_COOKIE)
  if (!cookie) return null
  try {
    const decoded = await getAdminAuth().verifySessionCookie(cookie)
    const snap = await getAdminDb().doc(`users/${decoded.uid}`).get()
    const data = snap.exists ? (snap.data() ?? {}) : {}
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: (data.full_name as string) || (data.nama as string) || decoded.name || null,
      role: (data.role as string) || 'mahasiswa',
      accessModules: Array.isArray(data.access_modules) ? data.access_modules : [],
    }
  } catch {
    return null
  }
}
