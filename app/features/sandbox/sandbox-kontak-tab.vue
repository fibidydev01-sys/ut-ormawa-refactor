<!--
  SANDBOX — tiruan tab Kontak (inbox aspirasi)
  File: app/features/sandbox/sandbox-kontak-tab.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { activeSubTab } = injectSandboxPreview()
</script>

<template>
  <div class="mb-8">
    <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
      Manajemen Kontak & Layanan
    </h1>
    <p class="text-slate-500 mt-1">Tanggapi aspirasi, pertanyaan, dan pelaporan dari mahasiswa.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div class="lg:col-span-1">
      <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <nav class="flex flex-col space-y-1">
          <button
            v-for="item in [
              { id: 'Inbox Aspirasi', badge: 5, color: 'indigo' },
              { id: 'Pelaporan Masalah', badge: 1, color: 'slate' },
            ]"
            :key="item.id"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
              activeSubTab['Kontak'] === item.id
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            @click="activeSubTab['Kontak'] = item.id"
          >
            <div class="flex items-center gap-2">
              {{ item.id }}
              <svg
                v-if="activeSubTab['Kontak'] === item.id"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-semibold',
                item.color === 'indigo'
                  ? 'bg-indigo-200 text-indigo-700'
                  : 'bg-slate-200 text-slate-600',
              ]"
              >{{ item.badge }}</span
            >
          </button>
        </nav>
      </div>
    </div>

    <!-- Inbox Area -->
    <div class="lg:col-span-3">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div
          class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl"
        >
          <h2 class="font-bold text-slate-800">{{ activeSubTab['Kontak'] }}</h2>
          <div class="flex gap-2">
            <button
              class="p-2 text-slate-400 hover:text-slate-600 transition bg-white border border-slate-200 rounded-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="divide-y divide-slate-100">
          <div class="p-5 hover:bg-slate-50 transition cursor-pointer flex gap-4">
            <div
              class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0"
            >
              MH
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-bold text-slate-800">Muhammad Hidayat</h3>
                <span class="text-xs text-slate-400">10:30 AM</span>
              </div>
              <h4 class="text-sm font-semibold text-slate-700 mb-1">Fasilitas Wi-Fi Kampus</h4>
              <p class="text-sm text-slate-500 line-clamp-1">
                Mohon untuk peningkatan sinyal wi-fi di area ruang baca gedung B karena sering
                terputus.
              </p>
            </div>
          </div>
          <div class="p-5 hover:bg-slate-50 transition cursor-pointer flex gap-4 opacity-70">
            <div
              class="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0"
            >
              SA
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-bold text-slate-800">Siti Aisyah</h3>
                <span class="text-xs text-slate-400">Kemarin</span>
              </div>
              <h4 class="text-sm font-semibold text-slate-700 mb-1">Jadwal Tutorial Tatap Muka</h4>
              <p class="text-sm text-slate-500 line-clamp-1">
                Apakah ada perubahan jadwal untuk TTM mata kuliah Statistika?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
