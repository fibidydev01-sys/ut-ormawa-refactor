// ============================================================
// useSandboxPreview — state halaman uji desain panel admin (/sandbox)
// File: app/features/sandbox/use-sandbox-preview.ts
// Halaman dev yang ikut ter-deploy (temuan T7).
// ============================================================

import { signOutUser } from '~/services/firebase'
import { inject, ref } from 'vue'
import type { InjectionKey } from 'vue'

export function useSandboxPreview() {
  const profileOpen = ref(false)
  const activeTab = ref('Beranda')
  const tabs = ['Beranda', 'Profil', 'Zona Kampus', 'Media', 'Kontak']

  const activeSubTab = ref<Record<string, string>>({
    Profil: 'Tentang UT',
    'Zona Kampus': 'Akademik',
    Media: 'Artikel & Berita',
    Kontak: 'Inbox Aspirasi',
  })

  const logout = async () => {
    if (await signOutUser(useFirebase().auth)) {
      navigateTo('/login/admin')
    }
  }

  // Set page meta

  return {
    profileOpen,
    activeTab,
    tabs,
    activeSubTab,
    logout,
  }
}

export type SandboxPreview = ReturnType<typeof useSandboxPreview>
export const SANDBOX_PREVIEW: InjectionKey<SandboxPreview> = Symbol('sandbox-preview')

export function injectSandboxPreview(): SandboxPreview {
  const state = inject(SANDBOX_PREVIEW)
  if (!state) throw new Error('injectSandboxPreview() dipanggil di luar <SandboxPreview>')
  return state
}
