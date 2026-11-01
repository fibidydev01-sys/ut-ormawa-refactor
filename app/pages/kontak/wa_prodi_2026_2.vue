<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <!-- NAVIGATION BAR -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <!-- Background Image -->
      <div
        class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"
      ></div>

      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <!-- Hero Text -->
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <img src="/img/Favicon.png" alt="Logo Ormawa" class="h-12 w-auto rounded-full shadow-lg" />
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Kontak Prodi 2026
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            WA Prodi <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">Angkatan 2026</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Temukan kontak WhatsApp resmi setiap program studi angkatan 2026 di Universitas Terbuka Surabaya. Hubungi langsung koordinator prodi Anda.
          </p>
        </div>

        <!-- Hero Graphic -->
        <div class="flex-1 w-full flex justify-center md:justify-end">
          <div class="relative w-full max-w-md aspect-square bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div class="flex gap-2 items-center border-b border-slate-700 pb-4">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <div class="ml-2 text-xs text-slate-400 font-mono">WA Prodi 2026</div>
            </div>
            <div class="flex-1 flex gap-4 flex-col">
              <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse"></div>
              <div class="h-1/2 bg-slate-700/50 rounded-xl animate-pulse" style="animation-delay: 0.2s"></div>
              <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 py-12">

      <!-- Prodi Cards Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="prodi in filteredProdi"
          :key="prodi.nama"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6 flex flex-col gap-4"
        >
          <!-- Prodi Header -->
          <div class="flex items-start gap-3">
            <div class="text-3xl">{{ prodi.icon }}</div>
            <div>
              <h3 class="font-bold text-gray-800 leading-tight">{{ prodi.nama }}</h3>
              <span class="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                :class="prodi.badgeClass">
                {{ prodi.fakultas }}
              </span>
            </div>
          </div>

          <!-- WA Link -->
          <a
            :href="prodi.waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition group"
          >
            <div class="text-xl">💬</div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500">WhatsApp Grup Prodi</p>
              <p class="text-green-700 font-semibold text-sm truncate group-hover:underline">{{ prodi.nomorWa }}</p>
            </div>
            <div class="text-green-500 text-lg">→</div>
          </a>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProdi.length === 0" class="text-center py-16 text-gray-400">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-lg font-semibold">Prodi tidak ditemukan</p>
        <p class="text-sm mt-1">Coba kata kunci lain</p>
      </div>

      <!-- Info Footer -->
      <section class="mt-12 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-3">Ormawa UT Surabaya</h3>
        <p class="text-gray-600 text-lg mb-4">
          Kontak ini merupakan daftar WhatsApp resmi koordinator program studi angkatan 2026.
        </p>
        <p class="text-green-600 font-semibold">Bersinergi membangun prestasi.</p>
      </section>
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Grup WhatsApp Prodi & OSMB 2026.2',
  ogTitle: 'Grup WhatsApp Resmi Prodi & OSMB 2026.2 - Ormawa UT Surabaya',
  description: 'Daftar link grup WhatsApp resmi program studi dan OSMB angkatan 2026.2 Universitas Terbuka Surabaya. Terhubung dengan teman sejurusan.',
  ogDescription: 'Daftar link grup WhatsApp resmi program studi dan OSMB angkatan 2026.2 Universitas Terbuka Surabaya. Terhubung dengan teman sejurusan.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const searchQuery = ref('')

// ✅ Ganti URL ini dengan link grup WhatsApp OSMB 2026.2 Anda
const waGrupOsmb = ref('https://chat.whatsapp.com/GANTI_LINK_GRUP_DISINI')

const prodiList = [
  {
    nama: 'FST',
    fakultas: 'Fakultas Sains dan Teknologi',
    icon: '📊',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/DHnkxi3iMmBCzstMq3htTW',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  {
    nama: 'FHISIP',
    fakultas: 'Fakultas Hukum, Ilmu Sosial dan Ilmu Politik',
    icon: '🧾',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/LjOHwEzX4HjIkMCMvvo5j4',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  {
    nama: 'SVOKASI',
    fakultas: 'Sekolah Vokasi',
    icon: '⚖️',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/D6DT0bdfWIn1tcJgalfCqV',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  {
    nama: 'FEB',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    icon: '📡',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/IVDnibO4Pjs0htkBjY82Qz',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  {
    nama: 'FKIP',
    fakultas: 'Fakultas Keguruan dan Ilmu Pendidikan',
    icon: '🏛️',
    nomorWa: 'Klik disini',
    waLink: 'https://chat.whatsapp.com/GRmXMS28vtL17NkyaoBWTX',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  
]

const filteredProdi = computed(() => {
  if (!searchQuery.value.trim()) return prodiList
  const q = searchQuery.value.toLowerCase()
  return prodiList.filter(p =>
    p.nama.toLowerCase().includes(q) ||
    p.fakultas.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
button, a {
  transition: all 0.3s ease;
}
</style>
