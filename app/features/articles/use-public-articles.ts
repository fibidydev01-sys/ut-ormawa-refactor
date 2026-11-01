// ============================================================
// usePublicArticles — artikel terbit untuk halaman publik (SSR)
// File: app/features/articles/use-public-articles.ts
//
// [S6] Dipakai /beranda & /media/artikel. Data diambil di server dari
// GET /api/public/articles sehingga HTML awal sudah berisi artikel (SEO);
// tanggal dikirim sebagai ISO string. Gagal → daftar kosong (seperti dulu).
// ============================================================

import type { ArticleDocument } from '~/types/database'

/** Artikel versi JSON: timestamp Firestore sudah jadi ISO string. */
export type PublicArticle = Omit<ArticleDocument, 'created_at' | 'updated_at'> & {
  created_at: string | null
  updated_at: string | null
}

export function usePublicArticles() {
  return useFetch<PublicArticle[]>('/api/public/articles', {
    key: 'public-articles',
    default: () => [],
  })
}
