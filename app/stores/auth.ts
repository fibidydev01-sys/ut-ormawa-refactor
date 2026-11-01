// ============================================================
// AUTH STORE (Pinia)
// File: app/stores/auth.ts
//
// [S2] Store ini MEMBUNGKUS state lama berbasis useState
// ('firebaseUser', 'userRole', 'accessModules', 'isAuthReady') —
// bukan menggantikannya. Ref yang sama dipakai bersama, jadi kode
// lama yang masih memanggil useState(...) tetap sinkron dengan
// komponen baru yang memakai useAuthStore(). Halaman & composable
// lama dipindah ke store bertahap (S3–S5); setelah itu useState
// mentah bisa dihapus.
// ============================================================

import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { User } from 'firebase/auth'
import { signOutUser } from '~/services/firebase'
import { normalizeRole, roleLabel as toRoleLabel } from '~/utils/role'

export const useAuthStore = defineStore('auth', () => {
  const user = useState<User | null>('firebaseUser', () => null)
  const role = useState<string | null>('userRole', () => null)
  const accessModules = useState<string[]>('accessModules', () => [])
  const isReady = useState<boolean>('isAuthReady', () => false)

  const normalizedRole = computed(() => normalizeRole(role.value))
  const isSuperAdmin = computed(() => normalizedRole.value === 'SUPER_ADMIN')
  const roleLabel = computed(() => toRoleLabel(role.value))

  const displayName = computed(
    () => user.value?.displayName || user.value?.email?.split('@')[0] || 'Admin',
  )
  const initials = computed(() =>
    displayName.value
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  )

  /** Super Admin selalu punya akses; selain itu cek access_modules. */
  function hasAccess(moduleName: string): boolean {
    if (isSuperAdmin.value) return true
    return accessModules.value.includes(moduleName)
  }

  /**
   * Keluar lalu arahkan ke `redirectTo`. Tidak melakukan apa pun bila
   * Firebase belum siap — sama seperti handler logout lama.
   */
  async function logout(redirectTo = '/login/admin'): Promise<void> {
    const { $auth } = useNuxtApp()
    if (await signOutUser($auth)) await navigateTo(redirectTo)
  }

  return {
    user,
    role,
    accessModules,
    isReady,
    normalizedRole,
    isSuperAdmin,
    roleLabel,
    displayName,
    initials,
    hasAccess,
    logout,
  }
})
