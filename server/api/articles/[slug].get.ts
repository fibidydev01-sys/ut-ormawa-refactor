import { getAdminDb } from '~~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug artikel diperlukan',
    })
  }

  try {
    const db = getAdminDb()
    const snapshot = await db
      .collection('articles')
      .where('slug', '==', slug)
      .where('status', '==', 'PUBLISHED')
      .limit(1)
      .get()

    if (snapshot.empty) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Artikel tidak ditemukan atau belum dipublikasikan',
      })
    }

    const docSnap = snapshot.docs[0]
    const data = docSnap.data()

    // Normalisasi timestamp agar bisa diserialisasi ke JSON pada SSR
    const toIsoString = (val: any) => {
      if (!val) return null
      if (val.toDate && typeof val.toDate === 'function') {
        return val.toDate().toISOString()
      }
      if (val instanceof Date) {
        return val.toISOString()
      }
      if (typeof val === 'string') {
        return val
      }
      return null
    }

    return {
      id: docSnap.id,
      ...data,
      created_at: toIsoString(data.created_at),
      updated_at: toIsoString(data.updated_at),
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('[Article API Error] Gagal mengambil artikel:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kesalahan saat mengambil artikel',
    })
  }
})
