// ============================================================
// usePublicPengurus — struktur pengurus untuk halaman publik (SSR)
// File: app/features/pengurus/use-public-pengurus.ts
//
// [S6] Dipakai /profil/struktur-pengurus. Data dari GET /api/public/pengurus
// (Admin SDK di server) — dulu dibaca Firestore client di onMounted.
// ============================================================

import type { BidangItem, PengurusMember } from './pengurus.types'

export interface PublicStrukturPengurus {
  bph: PengurusMember[]
  bidang: BidangItem[]
  /** ISO string atau null. */
  updated_at: string | null
}

export function usePublicPengurus() {
  return useFetch<PublicStrukturPengurus>('/api/public/pengurus', {
    key: 'public-pengurus',
    default: () => ({ bph: [], bidang: [], updated_at: null }),
  })
}
