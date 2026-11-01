// ============================================================
// GET /api/public/pengurus — struktur pengurus aktif
// File: server/api/public/pengurus.get.ts
//
// [S6] Dipakai /profil/struktur-pengurus lewat useFetch (SSR). Bentuk
// sama dengan getStruktur(): { bph, bidang, updated_at } — updated_at
// dikirim sebagai ISO string.
// ============================================================

import { getAdminDb, isFirebaseAdminConfigured } from '~~/server/utils/firebaseAdmin'
import { toIsoString } from '~~/server/utils/serialize'

export default defineEventHandler(async () => {
  if (!isFirebaseAdminConfigured()) return { bph: [], bidang: [], updated_at: null }

  try {
    const snap = await getAdminDb().doc('pengurus/struktur_aktif').get()
    if (!snap.exists) return { bph: [], bidang: [], updated_at: null }
    const data = snap.data() ?? {}
    return {
      bph: data.bph ?? [],
      bidang: data.bidang ?? [],
      updated_at: toIsoString(data.updated_at),
    }
  } catch (error) {
    console.error('[public/pengurus] Gagal mengambil struktur:', error)
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil struktur pengurus' })
  }
})
