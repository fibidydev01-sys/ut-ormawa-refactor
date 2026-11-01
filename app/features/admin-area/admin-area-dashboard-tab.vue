<!--
  ADMIN AREA — tab Dashboard (Command Center): sapaan, metrik, modul, aktivitas
  File: app/features/admin-area/admin-area-dashboard-tab.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const { userName } = injectAdminAreaHome()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    <div>
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">Command Center 🚀</h1>
      <p class="text-slate-500 font-medium">
        Selamat datang, {{ userName }}. Berikut adalah ringkasan aktivitas hari ini.
      </p>
    </div>
    <div class="flex items-center gap-3 w-full md:w-auto">
      <button
        class="flex-1 md:flex-none bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
        Tulis Berita
      </button>
      <button
        class="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Buat Pengumuman
      </button>
    </div>
  </div>

  <!-- Metric Cards (4 cards) -->
  <AdminAreaMetrics />

  <!-- Main 2-column layout -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Modul Utama (1/4) -->
    <AdminAreaModules />

    <!-- Aktivitas & Inbox (3/4) -->
    <AdminAreaActivity />
  </div>
</template>
