<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Transparansi
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Laporan <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">Kegiatan (LPJ)</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Wujud komitmen dan transparansi Ormawa UT Surabaya. Akses arsip laporan pertanggungjawaban dari seluruh program kerja yang telah kami selesaikan.
          </p>
        </div>
        
        <!-- Hero Graphic -->
        <div class="flex-1 w-full flex justify-center md:justify-end hidden md:flex">
          <div class="relative w-full max-w-sm aspect-[4/3] bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-6 flex flex-col items-center justify-center gap-4 group">
            <div class="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <svg class="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white mb-1">24+</div>
              <div class="text-sm text-slate-400">Laporan Terpublikasi</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Info Banner -->
      <div class="bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-4 mb-10">
        <div class="p-2 bg-green-100 text-green-600 rounded-lg shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h4 class="font-bold text-green-800 mb-1">Akses Publik</h4>
          <p class="text-sm text-green-700">Semua laporan di halaman ini bersifat publik dan dapat diunduh oleh seluruh mahasiswa Universitas Terbuka Surabaya sebagai bentuk transparansi organisasi.</p>
        </div>
      </div>

      <!-- List of Reports -->
      <div class="space-y-4">
        <div 
          v-for="laporan in reports" 
          :key="laporan.id"
          class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
        >
          <div class="flex items-start gap-4 flex-1">
            <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-50 transition-colors">
              <svg class="w-6 h-6 text-slate-400 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-lg mb-1">{{ laporan.title }}</h3>
              <div class="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Pelaksanaan: {{ laporan.date }}
                </span>
                <span class="hidden md:inline">•</span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  Oleh: {{ laporan.department }}
                </span>
              </div>
            </div>
          </div>
          
          <button class="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Unduh PDF
          </button>
        </div>
      </div>

    </div>
    
    <Footer />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Laporan Kegiatan (LPJ)',
  ogTitle: 'Laporan Kegiatan & Pertanggungjawaban - Ormawa UT Surabaya',
  description: 'Wujud transparansi Ormawa UT Surabaya. Akses arsip laporan pertanggungjawaban (LPJ) dari seluruh program kerja kemahasiswaan.',
  ogDescription: 'Wujud transparansi Ormawa UT Surabaya. Akses arsip laporan pertanggungjawaban (LPJ) dari seluruh program kerja kemahasiswaan.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

// Mock Data
const reports = [
  {
    id: 1,
    title: 'LPJ Seminar Nasional Entrepreneurship 2026',
    date: '28 Mei 2026',
    department: 'Divisi Acara'
  },
  {
    id: 2,
    title: 'Laporan Pertanggungjawaban Bakti Sosial Ramadhan',
    date: '10 April 2026',
    department: 'Divisi Humas & Sosial'
  },
  {
    id: 3,
    title: 'Laporan Keuangan Kuartal I 2026',
    date: '31 Maret 2026',
    department: 'Bendahara Umum'
  },
  {
    id: 4,
    title: 'LPJ Latihan Dasar Kepemimpinan Mahasiswa (LDKM)',
    date: '15 Februari 2026',
    department: 'Divisi Kaderisasi'
  },
  {
    id: 5,
    title: 'LPJ Turnamen Futsal Antar Mahasiswa UT Surabaya',
    date: '20 Januari 2026',
    department: 'Divisi Minat & Bakat'
  }
]
</script>
