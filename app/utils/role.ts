// ============================================================
// ROLE HELPERS
// File: app/utils/role.ts
//
// Sebelumnya logika ini tersalin di middleware/auth.ts,
// components/admin/Sidebar.vue, dan HeaderProfile.vue. Sekarang
// satu sumber. Perilaku identik dengan versi lama:
//   - role dibandingkan case-insensitive ('super_admin' → SUPER_ADMIN)
//   - selain SUPER_ADMIN / ADMIN (mis. 'mahasiswa') → null
// ============================================================

import type { UserRole } from '~/types/database'

/** Normalkan role dari berbagai format menjadi UserRole yang valid. */
export function normalizeRole(rawRole: unknown): UserRole | null {
  if (typeof rawRole !== 'string') return null
  const upperRole = rawRole.toUpperCase()
  if (upperRole === 'SUPER_ADMIN') return 'SUPER_ADMIN'
  if (upperRole === 'ADMIN') return 'ADMIN'
  return null
}

/** Label role untuk ditampilkan di header dashboard. */
export function roleLabel(rawRole: string | null | undefined): string {
  if (!rawRole) return 'Pengurus'
  const upperRole = rawRole.toUpperCase()
  if (upperRole === 'SUPER_ADMIN') return 'Super Admin'
  if (upperRole === 'ADMIN') return 'Admin'
  return 'Pengurus'
}
