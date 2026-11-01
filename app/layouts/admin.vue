<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">

    <!-- Top Navigation Bar (style sandbox) -->
    <header class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20">
      <div class="flex items-center gap-2 lg:gap-4">
        <!-- Mobile Menu Toggle -->
        <button @click="isSidebarOpen = !isSidebarOpen" class="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center gap-2 lg:gap-3">
          <img src="/img/Favicon_bulat_transparan.png" alt="Logo" class="h-8 lg:h-9 w-auto drop-shadow-sm" />
          <div class="hidden lg:block">
            <span class="text-lg font-bold text-emerald-600 tracking-tight">ORMAWA</span>
            <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">Admin Panel</p>
          </div>
        </div>
      </div>

      <!-- User Profile + Logout -->
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          @click="logout"
          class="inline-flex items-center gap-1 sm:gap-2 rounded-lg border border-red-200 bg-red-50 p-2 sm:px-3 sm:py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="hidden sm:inline">Keluar</span>
        </button>
        <AdminHeaderProfile />
      </div>
    </header>

    <!-- Main Content Area with Sidebar -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Mobile Sidebar Overlay -->
      <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity"></div>

      <!-- Sidebar -->
      <AdminSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const isSidebarOpen = ref(false)

const logout = async () => {
  const { $auth } = useNuxtApp()

  if ($auth) {
    const { signOut } = await import('firebase/auth')
    await signOut($auth)
    await navigateTo('/login/admin')
  }
}
</script>

<style>
/* Scrollbar styling untuk area admin */
.admin-scroll::-webkit-scrollbar { width: 6px; }
.admin-scroll::-webkit-scrollbar-track { background: #f8fafc; }
.admin-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
.admin-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
