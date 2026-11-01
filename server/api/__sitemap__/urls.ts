import { getAdminDb } from '~~/server/utils/firebaseAdmin'

export default defineEventHandler(async () => {
  try {
    const db = getAdminDb()
    const snapshot = await db.collection('articles')
      .where('status', '==', 'PUBLISHED')
      .get()

    if (snapshot.empty) {
      return []
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      const rawDate = data.updated_at || data.created_at
      let lastmod: string | undefined

      if (rawDate?.toDate && typeof rawDate.toDate === 'function') {
        lastmod = rawDate.toDate().toISOString()
      } else if (rawDate instanceof Date) {
        lastmod = rawDate.toISOString()
      } else if (typeof rawDate === 'string') {
        lastmod = new Date(rawDate).toISOString()
      }

      return {
        loc: `/berita/${data.slug}`,
        lastmod: lastmod || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      }
    })
  } catch (error) {
    console.error('[Sitemap Error] Gagal memuat daftar URL artikel untuk sitemap:', error)
    return []
  }
})
