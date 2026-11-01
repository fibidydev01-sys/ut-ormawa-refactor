<!--
  LAYOUT DASHBOARD — pengganti layouts/admin.vue
  File: app/layouts/dashboard.vue
  Topbar + sidebar (geser di mobile) + area konten.
-->
<script setup lang="ts">
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const isSidebarOpen = ref(false)
</script>

<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">
    <DashboardTopbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Overlay saat sidebar mobile terbuka -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity"
        @click="isSidebarOpen = false"
      ></div>

      <DashboardSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <main class="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
/* Scrollbar styling untuk area admin */
.admin-scroll::-webkit-scrollbar {
  width: 6px;
}
.admin-scroll::-webkit-scrollbar-track {
  background: #f8fafc;
}
.admin-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.admin-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
