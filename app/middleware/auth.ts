/**
 * ============================================================
 * NUXT ROUTE MIDDLEWARE: auth
 * Proteksi semua rute /dashboard dengan Role-Based Access Control.
 *
 * Hierarki Role (dari types/database.ts):
 *   SUPER_ADMIN → Akses ke semua halaman dashboard
 *   ADMIN       → Hanya /dashboard/Highlight-terkini, redirect jika akses /users atau /organizations
 *
 * Kompatibilitas mundur: role lowercase ('super_admin', 'admin') dari
 * sistem lama tetap diterima selama migrasi.
 * ============================================================
 */

import type { UserRole } from '~/types/database'
import { normalizeRole } from '~/utils/role'

export default defineNuxtRouteMiddleware(async (to) => {
  const firebaseUser = useState('firebaseUser')
  const userRole = useState('userRole')

  // Tunggu hingga auth Firebase siap (max 5 detik agar tidak hang selamanya)
  await waitForAuthReady()

  const isAuthenticated: boolean = !!firebaseUser.value
  const role: UserRole | null = normalizeRole(userRole.value)

  // ── 1. Proteksi semua rute /dashboard ──────────────────────
  if (to.path.startsWith('/dashboard')) {
    // Jika belum login → redirect ke halaman login admin
    if (!isAuthenticated) {
      return navigateTo('/login/admin', { replace: true })
    }

    // Jika role tidak dikenali → redirect ke login
    if (role === null) {
      return navigateTo('/login/admin', { replace: true })
    }
  }

  // ── 2. Proteksi /dashboard/users ───────────────────────────
  // Hanya SUPER_ADMIN yang boleh mengakses halaman Users
  if (to.path.startsWith('/dashboard/users')) {
    if (role !== 'SUPER_ADMIN') {
      return navigateTo('/dashboard/Highlight-terkini', { replace: true })
    }
  }

  // ── 3. Proteksi /dashboard/organizations ───────────────────
  // Hanya SUPER_ADMIN yang boleh mengakses halaman Organizations
  if (to.path.startsWith('/dashboard/organizations')) {
    if (role !== 'SUPER_ADMIN') {
      return navigateTo('/dashboard/Highlight-terkini', { replace: true })
    }
  }

  // ── 4. Kompatibilitas mundur: proteksi admin-area lama ─────
  if (to.path.startsWith('/dashboard/admin-area')) {
    if (!isAuthenticated) {
      return navigateTo('/login/admin', { replace: true })
    }
    const allowedRoles: readonly string[] = ['SUPER_ADMIN', 'ADMIN', 'super_admin', 'admin']
    if (!allowedRoles.includes(userRole.value as string)) {
      return navigateTo('/dashboard', { replace: true })
    }
  }
})
