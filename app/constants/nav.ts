// ============================================================
// NAVIGASI SITUS PUBLIK
// File: app/constants/nav.ts
//
// Satu sumber untuk navbar desktop (site-nav-dropdown.vue) dan
// menu mobile (site-mobile-nav.vue) — GOLDEN-PLAN R9.
// Urutan, label, dan tautan = salinan persis Navbar.vue lama,
// termasuk perbedaan label desktop/mobile dan tautan /market yang
// hanya ada di mobile (halamannya belum ada — GOLDEN-PLAN T3).
// ============================================================

import type { NavIconName } from '~/constants/icons'

export interface NavItem {
  label: string
  to: string
  /** Label versi menu mobile bila berbeda dari desktop. */
  mobileLabel?: string
  /** Garis pemisah di bawah item (dropdown desktop). */
  divider?: boolean
}

export interface NavSection {
  /** Judul kecil di atas grup item, mis. "Kegiatan". */
  heading?: string
  items: NavItem[]
}

export interface NavLinkEntry {
  type: 'link'
  label: string
  to: string
  icon?: NavIconName
  /** Ketebalan garis ikon (default '2'). */
  iconStrokeWidth?: string
  /** Klik saat sudah di halaman ini → gulir ke atas. */
  scrollTopIfCurrent?: boolean
  /** Hanya tampil di menu mobile. */
  mobileOnly?: boolean
}

export interface NavGroupEntry {
  type: 'group'
  key: string
  label: string
  icon: NavIconName
  /** Ketebalan garis ikon (default '2'). */
  iconStrokeWidth?: string
  /** Prefix path yang membuat grup ini "aktif". */
  match: string[]
  /** Lebar panel dropdown desktop (kelas Tailwind). */
  width: string
  /** `cta` = tombol merah menonjol (Kontak). */
  variant?: 'default' | 'cta'
  sections: NavSection[]
}

export type NavEntry = NavLinkEntry | NavGroupEntry

export const SITE_NAV: NavEntry[] = [
  {
    type: 'link',
    label: 'Beranda',
    to: '/beranda',
    icon: 'home',
    iconStrokeWidth: '2.5',
    scrollTopIfCurrent: true,
  },
  {
    type: 'group',
    key: 'profil',
    label: 'Profil',
    icon: 'user',
    iconStrokeWidth: '2.5',
    match: ['/profil', '/profile'],
    width: 'w-52',
    sections: [
      {
        items: [
          { label: 'Tentang UT Surabaya', mobileLabel: 'Tentang UT', to: '/profil/tentang-ut' },
          { label: 'Tentang Ormawa', to: '/profil/tentang-ormawa' },
          { label: 'Visi & Misi', to: '/profil/visi-misi' },
          { label: 'Struktur Pengurus', to: '/profil/struktur-pengurus' },
        ],
      },
    ],
  },
  {
    type: 'group',
    key: 'zona-kampus',
    label: 'Zona Kampus',
    icon: 'graduation-cap',
    match: ['/zona-kampus'],
    width: 'w-64',
    sections: [
      {
        heading: 'Kegiatan',
        items: [
          { label: 'Akademik', to: '/zona-kampus/akademik' },
          { label: 'Non Akademik', to: '/zona-kampus/non-akademik', divider: true },
        ],
      },
      {
        heading: 'Pendaftaran',
        items: [
          { label: 'Unit Kreatifitas Mahasiswa (UKM)', to: '/zona-kampus/ukm' },
          { label: 'Iam Fakultas (IMF/Hima)', to: '/zona-kampus/imf', divider: true },
        ],
      },
    ],
  },
  {
    type: 'group',
    key: 'media',
    label: 'Media',
    icon: 'newspaper',
    match: ['/media'],
    width: 'w-52',
    sections: [
      {
        items: [
          { label: 'Artikel dan Berita', to: '/media/artikel' },
          { label: 'Informasi perlombaan', to: '/media/perlombaan', divider: true },
          { label: 'Laporan kegiatan', to: '/media/laporan', divider: true },
          { label: 'Social Media Ormawa', to: '/media/social-media' },
        ],
      },
    ],
  },
  {
    type: 'group',
    key: 'kontak',
    label: 'Kontak',
    icon: 'headset',
    match: ['/kontak'],
    width: 'w-48',
    variant: 'cta',
    sections: [
      {
        items: [
          { label: 'Aspirasi', to: '/kontak/aspirasi', divider: true },
          { label: 'Pelaporan', to: '/kontak/pelaporan', divider: true },
          { label: 'WA Prodi 2026', to: '/kontak/wa_prodi_2026_2' },
        ],
      },
    ],
  },
  { type: 'link', label: 'Market', to: '/market', mobileOnly: true },
]
