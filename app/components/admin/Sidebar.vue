<template>
  <aside 
    :class="[
      'w-64 border-r border-slate-200 bg-white flex-col shrink-0 overflow-y-auto admin-scroll absolute lg:relative z-40 h-full transition-transform duration-300 ease-in-out flex',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Mobile Close Button -->
    <div class="lg:hidden flex justify-end p-4 pb-0">
      <button @click="$emit('close')" class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <div class="p-4">

      <!-- Active: Beranda link -->
      <NuxtLink
        to="/dashboard"
        :class="[
          'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
          isDashboard ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        Dashboard
      </NuxtLink>

      <!-- Section: Menu Utama -->
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Menu Utama</div>
      <nav class="space-y-1 flex flex-col">

        <NuxtLink v-if="isSuperAdmin" to="/dashboard/admin-area/profil" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Profil Saya
        </NuxtLink>

        <!-- Organizations (Berdasarkan Hak Akses) -->
        <NuxtLink v-if="hasAccess('manage_organizations')" to="/dashboard/organizations" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          Organizations
        </NuxtLink>

        <NuxtLink v-if="hasAccess('manage_events')" to="/dashboard/admin-area/event" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Event
        </NuxtLink>

        <!-- Struktur Pengurus -->
        <NuxtLink v-if="hasAccess('manage_structure')" to="/dashboard/admin-area/struktur-pengurus" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          Struktur Pengurus
        </NuxtLink>

        <!-- Articles -->
        <NuxtLink v-if="hasAccess('manage_articles')" to="/dashboard/Highlight-terkini" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          Highlight-terkini
        </NuxtLink>

        <NuxtLink v-if="hasAccess('manage_gallery')" to="/dashboard/admin-area/galeri" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Galeri
        </NuxtLink>

        <NuxtLink v-if="hasAccess('manage_members')" to="/dashboard/admin-area/keanggotaan" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Keanggotaan
        </NuxtLink>

      </nav>

      <!-- Section: Sistem -->
      <div v-if="hasSystemAccess" class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">Sistem</div>
      <nav v-if="hasSystemAccess" class="space-y-1 flex flex-col">

        <!-- Users -->
        <NuxtLink v-if="hasAccess('manage_users')" to="/dashboard/users" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Users
        </NuxtLink>

        <NuxtLink v-if="hasAccess('manage_settings')" to="/dashboard/admin-area/pengaturan" class="nav-item group">
          <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Pengaturan
        </NuxtLink>

      </nav>

    </div>

    <!-- Debug role indicator -->
    <div class="mx-4 mb-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-500">
      Role: <span class="font-bold" :class="isSuperAdmin ? 'text-emerald-600' : 'text-amber-600'">{{ userRole || 'null' }}</span>
    </div>

    <!-- Bottom actions -->
    <div class="mt-auto p-4 border-t border-slate-100 flex flex-col gap-1">
      <NuxtLink to="/" class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg w-full px-2 py-2 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Ke Halaman Utama Web
      </NuxtLink>
      <button @click="logout" class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg w-full px-2 py-2 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        Keluar
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { UserRole } from '~/types/database.types'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()

// Auto close sidebar on mobile when route changes
watch(() => route.path, () => {
  emit('close')
})
const isDashboard = computed(() => route.path === '/dashboard' || route.path === '/dashboard/')

const userRole = useState<string | null>('userRole')
const accessModules = useState<string[]>('accessModules', () => [])

const normalizedRole = computed<UserRole | null>(() => {
  const raw = userRole.value
  if (!raw) return null
  const upper = raw.toUpperCase()
  if (upper === 'SUPER_ADMIN') return 'SUPER_ADMIN'
  if (upper === 'ADMIN') return 'ADMIN'
  return null
})

const isSuperAdmin = computed<boolean>(() => normalizedRole.value === 'SUPER_ADMIN')

// Fungsi pembantu mengecek hak akses modul
const hasAccess = (moduleName: string) => {
  if (isSuperAdmin.value) return true // Super Admin selalu punya akses
  return accessModules.value.includes(moduleName)
}

const hasSystemAccess = computed(() => {
  return hasAccess('manage_users') || hasAccess('manage_settings')
})

const logout = async () => {
  const { $auth } = useNuxtApp()
  if ($auth) {
    const { signOut } = await import('firebase/auth')
    await signOut($auth)
    navigateTo('/login/admin')
  }
}
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition text-slate-600 hover:bg-slate-50;
}

.router-link-active {
  @apply bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100;
}

/* Sembunyikan class exact jika child aktif */
.router-link-exact-active {
  @apply bg-emerald-50 text-emerald-600;
}
</style>
