// ============================================================
// GET /api/public/articles — semua artikel TERBIT, terbaru dulu
// File: server/api/public/articles.get.ts
//
// [S6] Dipakai /beranda & /media/artikel lewat useFetch supaya daftar
// artikel sudah ada di HTML hasil SSR (SEO) — dulu dibaca Firestore
// client di onMounted. Query & urutan sama dengan getPublishedArticles():
// status == 'PUBLISHED', terbaru dulu, tanpa created_at = paling lama.
// Admin SDK melewati rules, jadi filter status WAJIB di sini.
// ============================================================

import { getAdminDb, isFirebaseAdminConfigured } from '~~/server/utils/firebaseAdmin'
import { toIsoString } from '~~/server/utils/serialize'

export default defineEventHandler(async () => {
  if (!isFirebaseAdminConfigured()) return []

  try {
    const snapshot = await getAdminDb()
      .collection('articles')
      .where('status', '==', 'PUBLISHED')
      .get()

    return snapshot.docs
      .map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          ...data,
          created_at: toIsoString(data.created_at),
          updated_at: toIsoString(data.updated_at),
        }
      })
      .sort((left, right) => {
        const leftTime = left.created_at ? new Date(left.created_at).getTime() : 0
        const rightTime = right.created_at ? new Date(right.created_at).getTime() : 0
        return rightTime - leftTime
      })
  } catch (error) {
    console.error('[public/articles] Gagal mengambil artikel:', error)
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil artikel' })
  }
})
