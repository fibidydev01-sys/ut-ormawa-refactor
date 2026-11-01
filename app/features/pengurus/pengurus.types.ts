// ============================================================
// Tipe struktur pengurus — dokumen tunggal pengurus/struktur_aktif
// File: app/features/pengurus/pengurus.types.ts
// ============================================================

import type { Timestamp } from '~/types/database'

export interface PengurusMember {
  id: string // UUID lokal untuk key list
  name: string
  jabatan: string // Contoh: "Ketua Umum", "Koordinator", "Anggota"
  nim: string
  photo: string // URL foto dari Firebase Storage (kosong = tidak ada foto)
}

export interface BidangItem {
  id: string // slug unik, contoh: "keilmuan"
  name: string // Nama bidang, contoh: "Bidang Keilmuan"
  icon: string // Emoji ikon
  color: string // Tailwind class warna aksen, contoh: "bg-blue-400"
  koordinator: PengurusMember
  anggota: PengurusMember[]
}

export interface StrukturPengurus {
  bph: PengurusMember[]
  bidang: BidangItem[]
  /** Diisi serverTimestamp() saat simpan. */
  updated_at?: Timestamp
}
