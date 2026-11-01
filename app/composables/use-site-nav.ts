// ============================================================
// useSiteNav — logika bersama navbar desktop & mobile
// File: app/composables/use-site-nav.ts
// ============================================================

import type { NavEntry } from '~/constants/nav'

export function useSiteNav() {
  const route = useRoute()

  /** Grup aktif bila path diawali salah satu prefix; link aktif bila path sama persis. */
  function isActive(entry: NavEntry): boolean {
    if (entry.type === 'group') return entry.match.some((prefix) => route.path.startsWith(prefix))
    return route.path === entry.to
  }

  /** Klik "Beranda" saat sudah di /beranda → gulir halus ke atas. */
  function scrollTopIfCurrent(to: string): void {
    if (route.path === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return { isActive, scrollTopIfCurrent }
}
