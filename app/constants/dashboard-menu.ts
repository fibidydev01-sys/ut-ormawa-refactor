// ============================================================
// MENU SIDEBAR DASHBOARD
// File: app/constants/dashboard-menu.ts
//
// Disalin persis dari components/admin/Sidebar.vue lama, termasuk
// tautan ke halaman yang BELUM ADA (admin-area/profil, event,
// galeri, keanggotaan, pengaturan) — GOLDEN-PLAN T2.
//
// `access`:
//   - 'superAdmin'    → hanya SUPER_ADMIN
//   - nama modul      → SUPER_ADMIN atau ADMIN yang punya modul tsb
// ============================================================

import type { AdminModule } from '~/types/database'
import type { NavIconName } from '~/constants/icons'

export interface DashboardMenuItem {
  label: string
  to: string
  icon: NavIconName
  access: 'superAdmin' | AdminModule
}

export interface DashboardMenuSection {
  title: string
  /** Sembunyikan judul & daftar bila tak ada item yang boleh dilihat. */
  hideWhenEmpty?: boolean
  items: DashboardMenuItem[]
}

export const DASHBOARD_MENU: DashboardMenuSection[] = [
  {
    title: 'Menu Utama',
    items: [
      {
        label: 'Profil Saya',
        to: '/dashboard/admin-area/profil',
        icon: 'user',
        access: 'superAdmin',
      },
      {
        label: 'Organizations',
        to: '/dashboard/organizations',
        icon: 'building',
        access: 'manage_organizations',
      },
      {
        label: 'Event',
        to: '/dashboard/admin-area/event',
        icon: 'calendar',
        access: 'manage_events',
      },
      {
        label: 'Struktur Pengurus',
        to: '/dashboard/admin-area/struktur-pengurus',
        icon: 'user-group',
        access: 'manage_structure',
      },
      {
        label: 'Highlight-terkini',
        to: '/dashboard/Highlight-terkini',
        icon: 'newspaper',
        access: 'manage_articles',
      },
      {
        label: 'Galeri',
        to: '/dashboard/admin-area/galeri',
        icon: 'photo',
        access: 'manage_gallery',
      },
      {
        label: 'Keanggotaan',
        to: '/dashboard/admin-area/keanggotaan',
        icon: 'users',
        access: 'manage_members',
      },
    ],
  },
  {
    title: 'Sistem',
    hideWhenEmpty: true,
    items: [
      { label: 'Users', to: '/dashboard/users', icon: 'users', access: 'manage_users' },
      {
        label: 'Pengaturan',
        to: '/dashboard/admin-area/pengaturan',
        icon: 'cog',
        access: 'manage_settings',
      },
    ],
  },
]
