<!--
  ZONA KAMPUS CARI TEMAN — tab Jejaring: kartu profil mahasiswa
  File: app/features/zona-kampus/zona-kampus-cari-teman-profiles.vue
  Tombol "Buat Profilmu" meng-emit `create-profile`; modalnya di zona-kampus-cari-teman-profile-modal.vue.
-->

<script setup lang="ts">
import type { MahasiswaProfile } from './zona-kampus.data'

defineProps<{ profiles: MahasiswaProfile[] }>()
defineEmits<{ 'create-profile': []; toast: [message: string] }>()
</script>

<template>
  <div
    class="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-slate-900/20 relative overflow-hidden"
  >
    <!-- Decorative accent -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"
    ></div>

    <div class="relative z-10">
      <h3 class="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
        Ingin Dikenal Lebih Banyak Teman? <span class="text-2xl">👋</span>
      </h3>
      <p class="text-slate-300 text-sm md:text-base max-w-2xl">
        Tambahkan profilmu ke dalam jejaring ini agar mudah ditemukan oleh teman diskusi, teman
        nongkrong, atau partner lomba yang satu frekuensi denganmu!
      </p>
    </div>
    <button
      class="relative z-10 shrink-0 w-full md:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-900/20 flex items-center justify-center gap-2"
      @click="$emit('create-profile')"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
      Buat Profilmu
    </button>
  </div>

  <!-- Filter Area -->
  <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
    <div class="relative w-full md:w-96">
      <input
        type="text"
        placeholder="Cari nama, jurusan, atau hobi..."
        class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
      />
      <svg
        class="w-5 h-5 absolute left-3 top-3.5 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <div class="flex gap-2">
      <select
        class="px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 bg-white focus:outline-none focus:border-blue-500"
      >
        <option value="">Semua Angkatan</option>
        <option value="maba">Maba 2026</option>
        <option value="kating">Kakak Tingkat</option>
      </select>
    </div>
  </div>

  <!-- Profil Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="user in profiles"
      :key="user.id"
      class="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
    >
      <!-- Cover Photo Area -->
      <div class="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
        <div
          v-if="user.isMaba"
          class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1"
        >
          🌟 MABA
        </div>
      </div>

      <div class="px-6 pb-6 relative">
        <!-- Avatar -->
        <div
          class="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden -mt-10 mb-3 shadow-md"
        >
          <img :src="user.avatar" :alt="user.nama" class="w-full h-full object-cover" />
        </div>

        <h3 class="text-xl font-bold text-slate-800 leading-tight">{{ user.nama }}</h3>
        <p class="text-sm text-blue-600 font-semibold mb-3">
          {{ user.jurusan }} • Sem {{ user.semester }}
        </p>

        <p class="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[40px]">"{{ user.bio }}"</p>

        <!-- Hobbies Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="hobi in user.hobi"
            :key="hobi"
            class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200"
          >
            {{ hobi }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button
            class="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl transition-colors text-sm"
            @click="$emit('toast', `Mengirim sapaan ke ${user.nama}...`)"
          >
            Sapa (WA)
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
