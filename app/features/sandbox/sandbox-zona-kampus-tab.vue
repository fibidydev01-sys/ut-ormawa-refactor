<!--
  SANDBOX — tiruan tab Zona Kampus (tabel)
  File: app/features/sandbox/sandbox-zona-kampus-tab.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { activeSubTab } = injectSandboxPreview()
</script>

<template>
  <div class="mb-8">
    <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
      Manajemen Zona Kampus
    </h1>
    <p class="text-slate-500 mt-1">
      Kelola data akademik, kegiatan mahasiswa, dan komunitas kampus.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Sidebar Navigation inside Zona Kampus -->
    <div class="lg:col-span-1">
      <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Kegiatan
        </div>
        <nav class="flex flex-col space-y-1 mb-4">
          <button
            v-for="item in ['Akademik', 'Non Akademik']"
            :key="item"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
              activeSubTab['Zona Kampus'] === item
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            @click="activeSubTab['Zona Kampus'] = item"
          >
            {{ item }}
            <svg
              v-if="activeSubTab['Zona Kampus'] === item"
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

        <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Pendaftaran
        </div>
        <nav class="flex flex-col space-y-1 mb-4">
          <button
            v-for="item in ['UKM', 'IMF / Hima']"
            :key="item"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
              activeSubTab['Zona Kampus'] === item
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            @click="activeSubTab['Zona Kampus'] = item"
          >
            {{ item }}
            <svg
              v-if="activeSubTab['Zona Kampus'] === item"
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

    <!-- Main Table Area -->
    <div class="lg:col-span-3">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div
          class="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h2 class="text-xl font-bold text-slate-800">
              Manajemen {{ activeSubTab['Zona Kampus'] }}
            </h2>
            <p class="text-sm text-slate-500">
              Pengaturan untuk data dan konfigurasi halaman
              {{ activeSubTab['Zona Kampus'] }}.
            </p>
          </div>
          <button
            class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Tambah Kegiatan Baru
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-600">
            <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th class="px-6 py-4">Nama Kegiatan</th>
                <th class="px-6 py-4">Tanggal</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-800">Seminar Nasional AI</td>
                <td class="px-6 py-4">12 Nov 2026</td>
                <td class="px-6 py-4">
                  <span
                    class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-700"
                    >Dibuka</span
                  >
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-800">Workshop Web Dev</td>
                <td class="px-6 py-4">05 Okt 2026</td>
                <td class="px-6 py-4">
                  <span
                    class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600"
                    >Selesai</span
                  >
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
