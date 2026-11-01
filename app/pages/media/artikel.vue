<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Publikasi
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Artikel & <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Berita Terkini</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan opini menarik dari ruang lingkup kemahasiswaan Universitas Terbuka Surabaya.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Kategori Filter -->
      <div class="flex flex-wrap items-center gap-4 mb-10">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm',
            selectedCategory === cat 
              ? 'bg-blue-600 text-white shadow-blue-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600'
          ]"
        >
          {{ categoryLabel(cat) }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex items-center justify-center mb-4">
          <svg class="animate-spin w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <p class="text-slate-500">Memuat artikel...</p>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="filteredArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col"
        >
          <!-- Image Container -->
          <div class="relative h-56 overflow-hidden">
            <img 
              :src="article.cover_image_url || '/img/background-landingpage.png'" 
              :alt="article.title" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {{ article.organization_name }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-3 text-sm text-slate-500 mb-3">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ formatDate(article.created_at) }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                {{ categoryLabel(article.organization_type) }}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {{ article.title }}
            </h3>
            
            <p class="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
              {{ stripHtml(article.content) }}
            </p>
            
            <div class="mt-auto pt-4 border-t border-slate-100">
              <NuxtLink :to="`/berita/${article.slug}`" class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/btn">
                Baca Selengkapnya 
                <svg class="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
          <svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 2v4h4M8 11h8M8 15h6"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Belum ada artikel</h3>
        <p class="text-slate-500">Artikel untuk kategori ini belum tersedia.</p>
      </div>
    </div>
    
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Article } from '~/types/database.types'
import type { Timestamp } from 'firebase/firestore'

useSeoMeta({
  title: 'Artikel & Berita',
  ogTitle: 'Artikel & Berita Terkini Ormawa UT Surabaya',
  description: 'Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan kabar terkini dari ruang lingkup kemahasiswaan Universitas Terbuka Surabaya.',
  ogDescription: 'Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan kabar terkini dari ruang lingkup kemahasiswaan Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

// Categories
const categories = ['Semua', 'HIMPUNAN_MAHASISWA', 'UNIT_KEGIATAN_MAHASISWA', 'ORMAWA', 'ORGANISASI_LAIN']
const selectedCategory = ref('Semua')

function categoryLabel(cat: string) {
  if (cat === 'Semua') return 'Semua Kategori'
  if (cat === 'HIMPUNAN_MAHASISWA') return 'Himpunan Mahasiswa (IMF)'
  if (cat === 'UNIT_KEGIATAN_MAHASISWA') return 'UKM'
  if (cat === 'ORMAWA') return 'ORMAWA'
  if (cat === 'ORGANISASI_LAIN') return 'Organisasi Lain'
  return cat
}

const formatDate = (timestamp: Timestamp | string | Date | null | undefined) => {
  const normalized = timestamp as { toDate?: () => Date } | undefined
  const date = normalized?.toDate ? normalized.toDate() : timestamp instanceof Date ? timestamp : typeof timestamp === 'string' ? new Date(timestamp) : null

  if (!date || Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const { getPublishedArticles } = useArticles()

const articles = ref<Article[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  isLoading.value = true
  try {
    articles.value = await getPublishedArticles()
  } catch (error) {
    console.error('Gagal mengambil artikel:', error)
  } finally {
    isLoading.value = false
  }
})

// Filter Logic
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Semua') {
    return articles.value
  }
  return articles.value.filter(article => article.organization_type === selectedCategory.value)
})
</script>
