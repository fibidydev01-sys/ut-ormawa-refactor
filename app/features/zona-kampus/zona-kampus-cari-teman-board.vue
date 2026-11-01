<!--
  ZONA KAMPUS CARI TEMAN — tab Papan Kolaborasi (mock)
  File: app/features/zona-kampus/zona-kampus-cari-teman-board.vue
-->

<script setup lang="ts">
import { CARI_TEMAN_FEED as feedPapan } from './zona-kampus.data'

defineEmits<{ toast: [message: string] }>()
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Buat Postingan Baru -->
    <div class="lg:w-1/3">
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Buat Pengumuman</h3>
        <form class="space-y-4" @submit.prevent="$emit('toast', 'Pengumuman berhasil diposting!')">
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2"
              >Tujuan Pengumuman</label
            >
            <select
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-sm"
            >
              <option>Teman Belajar (Study Buddy)</option>
              <option>Tim Lomba</option>
              <option>Proyek/Tugas Kelompok</option>
              <option>Teman Nongkrong</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2"
              >Pesan Anda</label
            >
            <textarea
              rows="4"
              placeholder="Ketik apa yang sedang Anda cari..."
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-sm resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            Posting Sekarang
          </button>
        </form>
      </div>
    </div>

    <!-- Feed Papan Kolaborasi -->
    <div class="lg:w-2/3 space-y-3">
      <div
        v-for="post in feedPapan"
        :key="post.id"
        class="bg-white rounded-xl p-4 md:p-5 border border-slate-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <img
              :src="post.avatar"
              alt="Avatar"
              class="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h4 class="font-bold text-slate-800 text-sm">{{ post.nama }}</h4>
              <p class="text-[10px] md:text-xs text-slate-500">
                {{ post.jurusan }} • {{ post.waktuLalu }}
              </p>
            </div>
          </div>
          <div
            class="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 uppercase tracking-wider"
          >
            {{ post.kategori }}
          </div>
        </div>

        <p class="text-sm text-slate-700 leading-relaxed mb-4">{{ post.pesan }}</p>

        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <div class="flex -space-x-2">
            <!-- Mock interested users -->
            <div class="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
            <div class="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
            <div
              class="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500"
            >
              +2
            </div>
          </div>
          <button
            class="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            @click="$emit('toast', 'Membuka chat WhatsApp...')"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Hubungi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
