// ============================================================
// SESSION SERVICE — sinkronkan login Firebase (browser) ke cookie server
// File: app/services/session.ts
//
// Firebase Auth menyimpan login di browser (IndexedDB) → server tidak tahu.
// Fungsi di sini dipanggil plugins/firebase.client.ts setiap status login
// berubah, sehingga cookie `__session` selalu mengikuti status Firebase:
//   login (metode apa pun) → POST /api/auth/session
//   logout (tombol apa pun) → DELETE /api/auth/session
// Cookie petunjuk `ormawa_session` (berisi uid) mencegah request berulang.
// ============================================================

import type { User } from 'firebase/auth'

export const SESSION_HINT_COOKIE = 'ormawa_session'

function readHint(): string | null {
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${SESSION_HINT_COOKIE}=`))
  return match ? decodeURIComponent(match.slice(SESSION_HINT_COOKIE.length + 1)) : null
}

/** Pastikan cookie sesi server milik `user` ada (tidak berbuat apa-apa bila sudah). */
export async function syncServerSession(user: User | null): Promise<void> {
  const hint = readHint()
  if (user) {
    if (hint === user.uid) return
    const idToken = await user.getIdToken()
    await $fetch('/api/auth/session', { method: 'POST', body: { idToken } })
  } else if (hint) {
    await $fetch('/api/auth/session', { method: 'DELETE' })
  }
}
