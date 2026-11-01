<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto text-center space-y-6">
        <div class="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm mb-2">
          Kompetisi & Penghargaan
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Informasi <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Perlombaan</span>
        </h2>
        <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Tunjukkan bakat dan keahlianmu. Dapatkan informasi terbaru mengenai berbagai ajang kompetisi bergengsi tingkat regional, nasional, hingga internasional.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
        <div class="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Cari perlombaan..." 
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
          >
          <svg class="w-5 h-5 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <button class="px-4 py-2 bg-slate-900 text-yellow-400 rounded-lg text-sm font-semibold whitespace-nowrap">Semua</button>
          <button class="px-4 py-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">Nasional</button>
          <button class="px-4 py-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors">Universitas</button>
        </div>
      </div>

      <!-- Competitions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="lomba in competitions" 
          :key="lomba.id"
          class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 flex flex-col md:flex-row gap-6 group"
        >
          <!-- Image/Icon Area -->
          <div class="w-full md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden relative shrink-0">
            <img :src="lomba.image" :alt="lomba.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
              {{ lomba.level }}
            </div>
          </div>
          
          <!-- Info Area -->
          <div class="flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-slate-800 leading-tight group-hover:text-yellow-600 transition-colors">
                {{ lomba.title }}
              </h3>
            </div>
            
            <p class="text-slate-500 text-sm mb-4">Penyelenggara: <span class="font-semibold text-slate-700">{{ lomba.organizer }}</span></p>
            
            <div class="space-y-2 mb-6">
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <svg class="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Deadline: <span class="font-semibold text-red-500">{{ lomba.deadline }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Biaya: <span class="font-semibold">{{ lomba.fee }}</span>
              </div>
            </div>
            
            <div class="mt-auto flex gap-3">
              <button class="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm">
                Detail Lomba
              </button>
              <button class="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors text-sm shadow-md shadow-yellow-500/20">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Informasi Perlombaan',
  ogTitle: 'Informasi Perlombaan & Kompetisi Mahasiswa - Ormawa UT Surabaya',
  description: 'Dapatkan informasi terbaru mengenai berbagai ajang kompetisi dan perlombaan bergengsi tingkat regional, nasional, hingga internasional.',
  ogDescription: 'Dapatkan informasi terbaru mengenai berbagai ajang kompetisi dan perlombaan bergengsi tingkat regional, nasional, hingga internasional.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

// Mock Data
const competitions = [
  {
    id: 1,
    title: 'National Business Plan Competition 2026',
    organizer: 'Universitas Indonesia',
    level: 'Nasional',
    deadline: '20 Juli 2026',
    fee: 'Rp 150.000 / Tim',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Lomba Debat Mahasiswa Tingkat Universitas',
    organizer: 'BEM UT Surabaya',
    level: 'Universitas',
    deadline: '15 Agustus 2026',
    fee: 'Gratis',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Olimpiade Sains Nasional (Matematika & Statistika)',
    organizer: 'Kementerian Pendidikan',
    level: 'Nasional',
    deadline: '05 September 2026',
    fee: 'Rp 50.000 / Individu',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'UI/UX Design Challenge "Future Campus"',
    organizer: 'HIMA Sistem Informasi',
    level: 'Nasional',
    deadline: '10 Oktober 2026',
    fee: 'Rp 75.000 / Tim',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]
</script>
