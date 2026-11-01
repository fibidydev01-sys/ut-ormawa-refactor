<!--
  DASHBOARD SIDEBAR — pengganti components/admin/Sidebar.vue
  File: app/components/layout/dashboard-sidebar.vue

  Menu dari constants/dashboard-menu.ts, disaring hak akses user
  (useAuthStore().hasAccess). Tampilan identik dengan versi lama.
-->
<script setup lang="ts">
import { DASHBOARD_MENU } from '~/constants/dashboard-menu'
import type { DashboardMenuItem } from '~/constants/dashboard-menu'
import { useAuthStore } from '~/stores/auth'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const route = useRoute()
const auth = useAuthStore()

// Tutup sidebar (mobile) setiap pindah halaman
watch(
  () => route.path,
  () => emit('close'),
)
const isDashboard = computed(() => route.path === '/dashboard' || route.path === '/dashboard/')

const canSee = (item: DashboardMenuItem) =>
  item.access === 'superAdmin' ? auth.isSuperAdmin : auth.hasAccess(item.access)

const sections = computed(() =>
  DASHBOARD_MENU.map((section) => ({ ...section, items: section.items.filter(canSee) })).filter(
    (section) => !section.hideWhenEmpty || section.items.length > 0,
  ),
)
</script>

<template>
  <aside
    :class="[
      'w-64 border-r border-slate-200 bg-white flex-col shrink-0 overflow-y-auto admin-scroll absolute lg:relative z-40 h-full transition-transform duration-300 ease-in-out flex',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Tombol tutup (mobile) -->
    <div class="lg:hidden flex justify-end p-4 pb-0">
      <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" @click="emit('close')">
        <NavIcon name="close" class="w-6 h-6" />
      </button>
    </div>
    <div class="p-4">
      <NuxtLink
        to="/dashboard"
        :class="[
          'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
          isDashboard ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50',
        ]"
      >
        <NavIcon name="grid" stroke-width="2.5" class="w-5 h-5" />
        Dashboard
      </NuxtLink>

      <template v-for="(section, sIndex) in sections" :key="section.title">
        <div
          :class="[
            'text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4',
            { 'mt-6': sIndex > 0 },
          ]"
        >
          {{ section.title }}
        </div>
        <nav class="space-y-1 flex flex-col">
          <NuxtLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="nav-item group"
          >
            <NavIcon
              :name="item.icon"
              class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform"
            />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </template>
    </div>

    <!-- Indikator role (debug, dari versi lama) -->
    <div
      class="mx-4 mb-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-500"
    >
      Role:
      <span class="font-bold" :class="auth.isSuperAdmin ? 'text-emerald-600' : 'text-amber-600'">{{
        auth.role || 'null'
      }}</span>
    </div>

    <div class="mt-auto p-4 border-t border-slate-100 flex flex-col gap-1">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg w-full px-2 py-2 transition-colors"
      >
        <NavIcon name="arrow-left" class="w-5 h-5" />
        Ke Halaman Utama Web
      </NuxtLink>
      <button
        class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg w-full px-2 py-2 transition-colors"
        @click="auth.logout()"
      >
        <NavIcon name="logout" class="w-5 h-5" />
        Keluar
      </button>
    </div>
  </aside>
</template>

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
