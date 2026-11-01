<!--
  SANDBOX — tiruan tab Media (grid artikel)
  File: app/features/sandbox/sandbox-media-tab.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { activeSubTab } = injectSandboxPreview()
</script>

<template>
  <div class="mb-8">
    <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
      Manajemen Media
    </h1>
    <p class="text-slate-500 mt-1">Publikasi artikel, berita, dan laporan kegiatan ormawa.</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div class="lg:col-span-1">
      <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <nav class="flex flex-col space-y-1">
          <button
            v-for="item in [
              'Artikel & Berita',
              'Info Perlombaan',
              'Laporan Kegiatan',
              'Social Media',
            ]"
            :key="item"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
              activeSubTab['Media'] === item
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            @click="activeSubTab['Media'] = item"
          >
            {{ item }}
            <svg
              v-if="activeSubTab['Media'] === item"
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
          </button>
        </nav>
      </div>
    </div>

    <!-- Media Grid Area -->
    <div class="lg:col-span-3">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 class="text-xl font-bold text-slate-800">{{ activeSubTab['Media'] }} Terbaru</h2>
        <button
          class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          Tulis Artikel
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Article Card Mock -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
          <div class="h-40 bg-slate-200 relative">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"
            ></div>
            <div class="absolute top-3 right-3 flex gap-2">
              <button
                class="w-8 h-8 rounded-lg bg-white/90 text-slate-700 flex items-center justify-center hover:bg-white shadow backdrop-blur transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
              <button
                class="w-8 h-8 rounded-lg bg-white/90 text-red-600 flex items-center justify-center hover:bg-white shadow backdrop-blur transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-5">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block"
              >Berita</span
            >
            <h3 class="font-bold text-slate-800 text-lg mb-2 line-clamp-2">
              Perayaan Dies Natalis UT Surabaya ke-40 Meriah
            </h3>
            <p class="text-sm text-slate-500 mb-4">Dipublikasikan pada 04 Sep 2026</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
