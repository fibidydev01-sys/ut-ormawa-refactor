<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Kreativitas & Olahraga
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Kegiatan <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">Non Akademik</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Seimbangkan kehidupan kampusmu. Ikuti berbagai ajang perlombaan olahraga, pentas seni, dan kegiatan kebersamaan untuk mengasah minat dan bakatmu!
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="kegiatan in nonAkademikList" 
          :key="kegiatan.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-green-300 transition-all duration-300 group flex flex-col"
        >
          <!-- Thumbnail -->
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img :src="kegiatan.image" :alt="kegiatan.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
              {{ kegiatan.type }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-green-600 transition-colors leading-tight">
              {{ kegiatan.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">
              {{ kegiatan.description }}
            </p>
            <div class="mt-auto flex items-center justify-between">
              <div class="text-sm font-semibold text-slate-500 flex items-center gap-1">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ kegiatan.date }}
              </div>
              <button class="text-green-600 hover:text-green-700 font-bold text-sm bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors">
                Selengkapnya
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
  title: 'Kegiatan Non-Akademik',
  ogTitle: 'Kegiatan Non-Akademik - Ormawa UT Surabaya',
  description: 'Informasi kegiatan minat bakat, olahraga, seni budaya, dan pengabdian masyarakat Universitas Terbuka Surabaya.',
  ogDescription: 'Informasi kegiatan minat bakat, olahraga, seni budaya, dan pengabdian masyarakat Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const nonAkademikList = [
  {
    id: 1,
    title: 'Liga Futsal Rektor Cup 2026',
    description: 'Ajang pertandingan futsal antar jurusan terbesar tahun ini. Segera daftarkan tim kebanggaanmu!',
    type: 'Olahraga',
    date: 'Bulan Agustus',
    image: 'https://images.unsplash.com/photo-1518605368461-1ee7a300d810?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Pentas Seni "Harmoni Budaya Nusantara"',
    description: 'Malam keakraban dengan pertunjukan tari tradisional, musik indie, dan teater dari mahasiswa untuk mahasiswa.',
    type: 'Kesenian',
    date: 'Akhir Oktober',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Bakti Sosial & Penghijauan Gunung Penanggungan',
    description: 'Kegiatan mendaki gunung sekaligus penanaman bibit pohon bersama organisasi pencinta alam.',
    type: 'Sosial & Alam',
    date: 'Pertengahan November',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Turnamen E-Sports Mobile Legends Campus Championship',
    description: 'Buktikan ketangkasan strategimu di turnamen E-Sports yang sangat dinantikan.',
    type: 'E-Sports',
    date: 'Minggu Pertama Desember',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]
</script>
