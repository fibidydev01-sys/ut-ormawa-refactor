<!--
  ADMIN AREA — kolom aktivitas terbaru & inbox (log aktivitas: temuan T18)
  File: app/features/admin-area/admin-area-activity.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const { globalLogs, formatTime } = injectAdminAreaHome()
</script>

<template>
  <div class="lg:col-span-3 grid grid-cols-1 xl:grid-cols-5 gap-8">
    <!-- Log Aktivitas Terbaru -->
    <div class="xl:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-slate-800">Log Aktivitas Terbaru</h3>
        <button class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
          Lihat Semua
        </button>
      </div>
      <div class="space-y-6">
        <div v-if="globalLogs.length === 0" class="text-slate-500 text-sm">
          Belum ada aktivitas terekam.
        </div>
        <div v-for="log in globalLogs" :key="log.id" class="flex gap-4">
          <div
            class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="flex-1 pb-4 border-b border-slate-100">
            <p class="text-sm text-slate-800">
              <span class="font-bold text-blue-600">{{ log.aktorName }}</span>
              {{ log.aksi }} <span v-if="log.target">"{{ log.target }}"</span>.
            </p>
            <p class="text-xs text-slate-500 mt-1">{{ formatTime(log.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Inbox Aspirasi -->
    <div
      class="xl:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          Inbox Aspirasi
          <span class="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full"
            >5 Baru</span
          >
        </h3>
      </div>
      <div class="flex-1 space-y-4">
        <div
          class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer group"
        >
          <div class="flex justify-between items-start mb-2">
            <h4
              class="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors"
            >
              Anonim
            </h4>
            <span
              class="text-[10px] font-semibold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200"
              >10:05</span
            >
          </div>
          <p class="text-xs text-slate-600 line-clamp-2 mb-3">
            Mohon perbaiki lampu di area parkir motor B, sangat gelap saat malam hari.
          </p>
          <button
            class="text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors w-full"
          >
            Balas / Proses
          </button>
        </div>
        <div
          class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors cursor-pointer group"
        >
          <div class="flex justify-between items-start mb-2">
            <h4
              class="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors"
            >
              Ahmad Ridwan
            </h4>
            <span
              class="text-[10px] font-semibold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200"
              >Kemarin</span
            >
          </div>
          <p class="text-xs text-slate-600 line-clamp-2 mb-3">
            Saran untuk menambahkan WiFi di area kantin baru karena susah sinyal.
          </p>
          <button
            class="text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg transition-colors w-full"
          >
            Lihat Detail
          </button>
        </div>
      </div>
      <button
        class="mt-6 text-sm font-bold text-slate-500 hover:text-blue-600 text-center w-full transition-colors"
      >
        Buka Pusat Aspirasi &rarr;
      </button>
    </div>
  </div>
</template>
