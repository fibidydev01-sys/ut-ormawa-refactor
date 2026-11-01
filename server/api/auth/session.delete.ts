// ============================================================
// DELETE /api/auth/session — hapus cookie sesi (logout)
// File: server/api/auth/session.delete.ts
//
// Hanya menghapus cookie di browser ini. Sesi di perangkat lain TIDAK
// dicabut (revokeRefreshTokens) — itu keputusan kebijakan, lihat Q10.
// ============================================================

import { clearSessionCookies } from '~~/server/utils/session'

export default defineEventHandler((event) => {
  clearSessionCookies(event)
  return { ok: true }
})
