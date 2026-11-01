// ============================================================
// MODUL AKSES ADMIN — pilihan centang di form pengguna
// File: app/constants/access-modules.ts
//
// Urutan & label = salinan persis checkbox di halaman Users lama.
// Nilai sama dengan tipe AdminModule (types/database.ts) dan dipakai
// sidebar (constants/dashboard-menu.ts) untuk menyaring menu.
// ============================================================

import type { AdminModule } from '~/types/database'

export const ACCESS_MODULES: { value: AdminModule; label: string }[] = [
  { value: 'manage_articles', label: 'Kelola Artikel' },
  { value: 'manage_events', label: 'Kelola Event' },
  { value: 'manage_gallery', label: 'Kelola Galeri' },
  { value: 'manage_members', label: 'Kelola Keanggotaan' },
  { value: 'manage_structure', label: 'Struktur Pengurus' },
  { value: 'manage_organizations', label: 'Kelola Organisasi' },
  { value: 'manage_users', label: 'Kelola Pengguna' },
  { value: 'manage_settings', label: 'Pengaturan Sistem' },
]
