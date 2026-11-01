<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Edukasi & Prestasi
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Kegiatan <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Akademik</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Tingkatkan pengetahuan dan wawasanmu melalui seminar, workshop, kuliah tamu, dan berbagai program pengembangan soft-skill maupun hard-skill.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="kegiatan in akademikList" 
          :key="kegiatan.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img :src="kegiatan.image" :alt="kegiatan.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              {{ kegiatan.type }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
              {{ kegiatan.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">
              {{ kegiatan.description }}
            </p>
            
            <div class="mt-auto space-y-2 text-sm text-slate-500 font-medium">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ kegiatan.date }}
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {{ kegiatan.location }}
              </div>
            </div>
            
            <button class="mt-6 w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold rounded-lg transition-colors border border-slate-200 hover:border-blue-200">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Kegiatan Akademik',
  ogTitle: 'Kegiatan Akademik - Ormawa UT Surabaya',
  description: 'Informasi kegiatan seminar, workshop, webinar, dan kuliah tamu di lingkungan Universitas Terbuka Surabaya.',
  ogDescription: 'Informasi kegiatan seminar, workshop, webinar, dan kuliah tamu di lingkungan Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const akademikList = [
  {
    id: 1,
    title: 'Seminar Nasional: Membangun Pola Pikir Kritis di Era AI',
    description: 'Pelajari bagaimana mengasah kemampuan analisis dan berpikir kritis di tengah gempuran informasi dan kecerdasan buatan.',
    type: 'Seminar',
    date: '12 Juli 2026, 09:00 WIB',
    location: 'Aula Utama & Zoom Meeting',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Workshop Penulisan Karya Tulis Ilmiah Tembus Jurnal Terindeks',
    description: 'Pelatihan intensif 2 hari untuk mahasiswa akhir yang sedang menyusun skripsi atau artikel publikasi ilmiah.',
    type: 'Workshop',
    date: '20-21 Agustus 2026',
    location: 'Lab Komputer Lt. 3',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Kuliah Tamu Pakar Hukum Tata Negara dari Universitas Ternama',
    description: 'Diskusi interaktif mengupas tuntas amandemen konstitusi bersama narasumber ahli tingkat nasional.',
    type: 'Kuliah Tamu',
    date: '05 September 2026',
    location: 'Teater Ruang 201',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]
</script>
