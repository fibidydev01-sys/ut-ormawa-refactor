<!--
  ZONA KAMPUS CARI TEMAN — direktori profil mahasiswa & papan info (mock, belum tersimpan)
  File: app/features/zona-kampus/zona-kampus-cari-teman.vue
-->

<script setup lang="ts">
import { ref } from 'vue'
import { MAHASISWA_PROFILES } from './zona-kampus.data'
import type { MahasiswaProfile } from './zona-kampus.data'

// Tab State
const activeTab = ref('jejaring')

// Modal "Buat Profil"
const showProfileModal = ref(false)

// Mock Data: Jejaring Mahasiswa
const profilMahasiswa = ref<MahasiswaProfile[]>([...MAHASISWA_PROFILES])

// Mock Toast Function
const showToast = (message: string) => {
  alert(message)
}
</script>

<template>
  <ZonaKampusCariTemanHero />

  <!-- Main Content -->
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Custom Tab Navigation -->
    <div class="flex justify-center mb-10">
      <div class="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
        <button
          :class="[
            'px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
            activeTab === 'jejaring'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50',
          ]"
          @click="activeTab = 'jejaring'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          Jejaring Mahasiswa
        </button>
        <button
          :class="[
            'px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
            activeTab === 'papan'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50',
          ]"
          @click="activeTab = 'papan'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
          Papan Kolaborasi
        </button>
      </div>
    </div>

    <!-- TAB 1: Jejaring Mahasiswa -->
    <div v-show="activeTab === 'jejaring'" class="animate-fadeIn">
      <ZonaKampusCariTemanProfiles
        :profiles="profilMahasiswa"
        @create-profile="showProfileModal = true"
        @toast="showToast"
      />
    </div>

    <!-- TAB 2: Papan Kolaborasi -->
    <div v-show="activeTab === 'papan'" class="animate-fadeIn">
      <ZonaKampusCariTemanBoard @toast="showToast" />
    </div>
  </div>

  <ZonaKampusCariTemanProfileModal
    :open="showProfileModal"
    @close="showProfileModal = false"
    @created="(profile) => profilMahasiswa.unshift(profile)"
  />
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
