<!--
  SANDBOX — tiruan tab Profil (form + editor)
  File: app/features/sandbox/sandbox-profil-tab.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { activeSubTab } = injectSandboxPreview()
</script>

<template>
  <div class="mb-8">
    <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
      Manajemen Profil
    </h1>
    <p class="text-slate-500 mt-1">
      Kelola konten profil organisasi yang tampil di halaman utama pengunjung.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Sidebar Navigation inside Profil -->
    <div class="lg:col-span-1">
      <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <nav class="flex flex-col space-y-1">
          <button
            v-for="(item, idx) in [
              {
                id: 'Tentang UT',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
              },
              {
                id: 'Tentang Ormawa',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              },
              {
                id: 'Visi & Misi',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              },
              {
                id: 'Struktur Pengurus',
                icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
              },
            ]"
            :key="idx"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors w-full',
              activeSubTab['Profil'] === item.id
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            @click="activeSubTab['Profil'] = item.id"
          >
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="item.icon"
                ></path>
              </svg>
              {{ item.id }}
            </div>
            <svg
              v-if="activeSubTab['Profil'] === item.id"
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

    <!-- Main Form Area -->
    <div class="lg:col-span-2">
      <div
        class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-400"
        ></div>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-2"
        >
          <div>
            <h2 class="text-xl font-bold text-slate-800">Edit {{ activeSubTab['Profil'] }}</h2>
            <p class="text-sm text-slate-500">
              Ubah informasi teks dan gambar pada halaman {{ activeSubTab['Profil'] }}.
            </p>
          </div>
          <button
            class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow hover:shadow-md flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Simpan Perubahan
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Judul Halaman</label>
            <input
              type="text"
              value="Universitas Terbuka Surabaya"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-slate-700"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Utama</label>
            <div
              class="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition"
            >
              <!-- Toolbar Mockup -->
              <div
                class="flex items-center gap-1 bg-slate-50 border-b border-slate-200 p-2 text-slate-500"
              >
                <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold">B</button>
                <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 italic">I</button>
                <button class="p-1.5 hover:bg-slate-200 rounded text-slate-700 underline">U</button>
                <div class="w-px h-5 bg-slate-300 mx-1"></div>
                <button class="p-1.5 hover:bg-slate-200 rounded">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    ></path>
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-slate-200 rounded">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </div>
              <textarea
                rows="6"
                class="w-full px-4 py-3 bg-white focus:outline-none text-slate-600 leading-relaxed"
              >
  Universitas Terbuka (UT) adalah Perguruan Tinggi Negeri ke-45 di Indonesia yang diresmikan pada tanggal 4 September 1984, berdasarkan Keputusan Presiden RI Nomor 41 Tahun 1984. UT menerapkan sistem belajar terbuka dan jarak jauh. Sistem belajar ini terbukti efektif untuk meningkatkan daya jangkau dan pemerataan kesempatan pendidikan tinggi yang berkualitas bagi semua warga negara Indonesia.</textarea>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Banner / Gambar Utama</label
            >
            <div
              class="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-300 transition cursor-pointer group"
            >
              <div
                class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition"
              >
                <svg
                  class="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700"
                >Klik untuk upload atau drag & drop gambar</span
              >
              <span class="text-xs text-slate-400 mt-1">Format PNG, JPG, Max 5MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
