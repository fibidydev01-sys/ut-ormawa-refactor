<!--
  DASHBOARD TOPBAR — header atas area dashboard
  File: app/components/layout/dashboard-topbar.vue
  (Dipisah dari layouts/admin.vue lama.)
-->
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

defineEmits<{ 'toggle-sidebar': [] }>()
const auth = useAuthStore()
</script>

<template>
  <header
    class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20"
  >
    <div class="flex items-center gap-2 lg:gap-4">
      <!-- Tombol sidebar (mobile) -->
      <button
        class="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        @click="$emit('toggle-sidebar')"
      >
        <NavIcon name="menu" class="w-6 h-6" />
      </button>

      <div class="flex items-center gap-2 lg:gap-3">
        <img
          src="/img/Favicon_bulat_transparan.png"
          alt="Logo"
          class="h-8 lg:h-9 w-auto drop-shadow-sm"
        />
        <div class="hidden lg:block">
          <span class="text-lg font-bold text-emerald-600 tracking-tight">ORMAWA</span>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">
            Admin Panel
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 sm:gap-3">
      <button
        class="inline-flex items-center gap-1 sm:gap-2 rounded-lg border border-red-200 bg-red-50 p-2 sm:px-3 sm:py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        @click="auth.logout()"
      >
        <NavIcon name="logout" class="h-4 w-4" />
        <span class="hidden sm:inline">Keluar</span>
      </button>
      <NavUser />
    </div>
  </header>
</template>
