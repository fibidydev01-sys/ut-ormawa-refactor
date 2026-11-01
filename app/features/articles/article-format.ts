// ============================================================
// Format tampilan artikel (tanggal & ringkasan)
// File: app/features/articles/article-format.ts
//
// Dulu disalin di beranda, media/artikel, dan berita/[slug].
// ============================================================

import type { Timestamp } from '~/types/database'

/**
 * Zona waktu tampilan tanggal. [S6] Halaman publik kini dirender di server
 * (UTC di Firebase Functions); tanpa zona eksplisit tanggal bisa mundur satu
 * hari dan berbeda dengan hasil render di browser (hydration mismatch).
 */
export const SITE_TIME_ZONE = 'Asia/Jakarta'

/**
 * Tanggal artikel gaya Indonesia. `month: 'short'` → "01 Jan 2026"
 * (beranda, daftar artikel); `'long'` → "01 Januari 2026" (detail berita).
 * Nilai tidak valid → "—". Selalu dalam WIB (SITE_TIME_ZONE).
 */
export function formatArticleDate(
  timestamp: Timestamp | string | Date | null | undefined,
  month: 'short' | 'long' = 'short',
): string {
  const normalized = timestamp as { toDate?: () => Date } | undefined
  const date = normalized?.toDate
    ? normalized.toDate()
    : timestamp instanceof Date
      ? timestamp
      : typeof timestamp === 'string'
        ? new Date(timestamp)
        : null

  if (!date || Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month,
    year: 'numeric',
    timeZone: SITE_TIME_ZONE,
  }).format(date)
}

/** Buang tag HTML untuk cuplikan teks. */
export const stripHtml = (value: string): string =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
