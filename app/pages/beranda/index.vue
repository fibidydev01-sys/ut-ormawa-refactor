<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <!-- 1. NAVIGATION BAR -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-admiral text-white pt-20 pb-28 md:pb-36 px-6 md:px-12 overflow-hidden">
      <!-- Background Image -->
      <img src="/img/background-landingpage.png" alt="Background" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
      
      <div class="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <!-- Hero Text -->
        <div class="w-full space-y-6 flex flex-col items-center">
          <div class="flex flex-wrap items-center justify-center mb-6">
            <div class="inline-block px-5 py-2 bg-slate-800 border border-slate-700 text-lemon text-sm font-bold uppercase tracking-widest rounded-full shadow-md">
              Website resmi Ormawa ut surabaya
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            KKB <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-lemon to-lemon-light">Kreasi Kolaborasi Berprestasi</span>
          </h2>

          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Jadilah bagian dari pergerakan mahasiswa yang aktif dan inovatif. Temukan ruang untuk mengembangkan potensi, merajut kolaborasi, dan mencetak prestasi bersama Ormawa Universitas Terbuka Surabaya.
          </p>

          <!-- ✅ Shortcut: Grup WA Prodi OSMB 2026.2 -->
          <NuxtLink
            to="/kontak/wa_prodi_2026_2"
            class="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-green-300 rounded-2xl shadow-lg hover:shadow-xl px-6 py-4 transition-all duration-300 hover:-translate-y-1"
          >
            <!-- WhatsApp Icon -->
            <div class="flex-shrink-0 w-10 h-10 bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <!-- Text -->
            <p class="text-white group-hover:text-green-700 font-bold text-base leading-tight transition-colors">Grup WhatsApp Prodi OSMB 2026.2</p>
            <!-- Arrow -->
            <svg class="w-4 h-4 text-white/60 group-hover:text-green-500 group-hover:translate-x-1 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Animated Wave Divider -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg class="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px] lg:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(249, 250, 251, 0.7)" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(249, 250, 251, 0.5)" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(249, 250, 251, 0.3)" />
            <use href="#gentle-wave" x="48" y="7" fill="#f9fafb" />
          </g>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->

    <section class="max-w-6xl mx-auto px-6 md:px-12 pb-12 -mt-4 relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all group">
          <div class="w-14 h-14 rounded-full bg-slate-50 text-admiral flex items-center justify-center mb-4 group-hover:bg-admiral group-hover:text-lemon transition-colors">
            <component :is="stat.icon" />
          </div>
          <h3 class="text-3xl font-extrabold text-admiral mb-1">{{ stat.value }}</h3>
          <p class="text-sm text-slate-500 font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Sambutan Direktur Section -->
    <section class="max-w-5xl mx-auto px-6 md:px-12 py-16 mb-8">
      <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <!-- Photo Column -->
        <div class="flex-shrink-0 relative group">
          <!-- Yellow Glow / Drop Shadow -->
          <div class="absolute -inset-2 bg-lemon opacity-40 blur-xl rounded-3xl transition-opacity group-hover:opacity-60"></div>
          <div class="relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
            <!-- Replace this src with the actual image of the director -->
            <img 
              :src="'/img/direktur.png'" 
              alt="Prof. Dr. Suparti, M.Pd" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <!-- Text Column -->
        <div class="flex-1 space-y-6">
          <div>
            <h4 class="text-admiral font-bold tracking-widest text-xs lg:text-sm uppercase mb-2">Sambutan Ibu Direktur</h4>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Bersama Membangun Kualitas Mahasiswa
            </h2>
          </div>
          
          <div class="border-l-4 border-lemon pl-6 py-2 my-8">
            <p class="text-slate-600 text-lg md:text-xl italic leading-relaxed">
              "Universitas Terbuka Surabaya mendukung penuh keberadaan Ormawa sebagai sarana pengembangan kreativitas dan kepemimpinan. Organisasi ini dibentuk dari mahasiswa, oleh mahasiswa, dan untuk mahasiswa. Teruslah berkarya untuk almamater dan bangsa."
            </p>
          </div>
          
          <div>
            <p class="text-admiral font-bold text-lg">Prof. Dr. Suparti, M.Pd</p>
            <p class="text-slate-500 text-sm">Direktur Universitas Terbuka Surabaya</p>
          </div>


        </div>
      </div>
    </section>


    <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 pb-20">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Berita & Kegiatan</p>
          <h2 class="text-3xl font-extrabold text-slate-900">Highlight Terkini</h2>
        </div>
      </div>

      <div v-if="is_loading" class="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm">
        Memuat berita terbaru dari Firestore...
      </div>

      <div v-else-if="highlight_articles.length === 0" class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
        Belum ada berita publik yang tersedia saat ini.
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Main Highlight -->
        <article v-if="highlight_articles[0]" class="group relative col-span-1 lg:col-span-8 overflow-hidden rounded-3xl bg-slate-900 shadow-xl min-h-[400px] md:min-h-[500px]">
          <img :src="highlight_articles[0].cover_image_url || '/img/background-landingpage.png'" :alt="highlight_articles[0].title" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex rounded-full bg-lemon px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm">{{ highlight_articles[0].organization_name }}</span>
              <span class="text-sm font-medium text-slate-300 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ formatDate(highlight_articles[0].created_at) }}
              </span>
            </div>
            
            <h3 class="mb-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md group-hover:text-lemon transition-colors duration-300">
              <NuxtLink :to="`/berita/${highlight_articles[0].slug}`" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                {{ highlight_articles[0].title }}
              </NuxtLink>
            </h3>
            
            <p class="mb-6 max-w-3xl text-base md:text-lg text-slate-200 line-clamp-2 md:line-clamp-3 opacity-90">
              {{ stripHtml(highlight_articles[0].content) }}
            </p>
            
            <div class="flex items-center text-lemon font-semibold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform duration-300">
              Baca Selengkapnya
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        </article>

        <!-- Secondary Highlights Column -->
        <div class="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <article v-for="article in highlight_articles.slice(1, 3)" :key="article.id" class="group relative flex-1 overflow-hidden rounded-3xl bg-slate-900 shadow-lg min-h-[220px]">
            <img :src="article.cover_image_url || '/img/background-landingpage.png'" :alt="article.title" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <!-- Heavy Gradient for readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="absolute inset-0 flex flex-col justify-end p-6">
              <div class="mb-3 flex items-center justify-between">
                <span class="inline-flex rounded-full bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{{ article.organization_name }}</span>
              </div>
              
              <h4 class="mb-2 text-lg font-bold text-white leading-snug group-hover:text-lemon transition-colors duration-300 line-clamp-3">
                <NuxtLink :to="`/berita/${article.slug}`" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  {{ article.title }}
                </NuxtLink>
              </h4>
              
              <div class="flex items-center justify-between mt-auto pt-2 text-slate-300 text-xs">
                <span>{{ formatDate(article.created_at) }}</span>
                <span class="group-hover:translate-x-1 group-hover:text-lemon transition-all duration-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 pb-20 md:px-12">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Kumpulan berita</p>
          <h2 class="text-3xl font-extrabold text-slate-900">Semua Berita & Kegiatan</h2>
        </div>
      </div>

      <div v-if="is_loading" class="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm">
        Menyiapkan daftar berita...
      </div>

      <div v-else-if="regular_articles.length === 0" class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
        Belum ada artikel tambahan yang tersedia.
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article v-for="article in regular_articles" :key="article.id" class="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <img :src="article.cover_image_url || '/img/background-landingpage.png'" :alt="article.title" class="h-44 w-full object-cover" />
          <div class="p-5">
            <span class="mb-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">{{ article.organization_name }}</span>
            <h3 class="mb-2 line-clamp-2 text-lg font-semibold text-slate-900">{{ article.title }}</h3>
            <p class="mb-4 text-sm text-slate-500">{{ formatDate(article.created_at) }}</p>
            <NuxtLink :to="`/berita/${article.slug}`" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
              Baca Selengkapnya
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import type { Article } from '~/types/database.types'
import type { Timestamp } from 'firebase/firestore'

useSeoMeta({
  title: 'Beranda - Portal Resmi Organisasi Mahasiswa',
  ogTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  description: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  ogDescription: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogUrl: 'https://ormawa-utsurabaya.web.app/beranda',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  twitterDescription: 'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, dan prestasi mahasiswa.',
  twitterImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  keywords: 'ormawa ut surabaya, universitas terbuka surabaya, ukm ut surabaya, himpunan mahasiswa ut surabaya, kkb ut surabaya, osmb ut surabaya 2026',
})


interface StatItem {
  label: string
  value: string | number
  icon: any
}

const { getPublishedArticles } = useArticles()

const articles = ref<Article[]>([])
const is_loading = ref<boolean>(true)

const highlight_articles = computed<Article[]>(() => articles.value.slice(0, 3))
const regular_articles = computed<Article[]>(() => articles.value.slice(3))

const UsersIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-7 h-7' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
])
const CalendarIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-7 h-7' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])
const DocumentIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-7 h-7' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])
const AwardIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-7 h-7' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' })
])

const stats: StatItem[] = [
  { label: 'Anggota Aktif', value: '30', icon: UsersIcon },
  { label: 'Agenda Tahun Ini', value: '10+', icon: CalendarIcon },
  { label: 'Proposal & LPJ', value: '10', icon: DocumentIcon },
  { label: 'Penghargaan', value: '15', icon: AwardIcon },
]

const formatDate = (timestamp: Timestamp | string | Date | null | undefined) => {
  const normalized = timestamp as { toDate?: () => Date } | undefined
  const date = normalized?.toDate ? normalized.toDate() : timestamp instanceof Date ? timestamp : typeof timestamp === 'string' ? new Date(timestamp) : null

  if (!date || Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

onMounted(async () => {
  is_loading.value = true
  try {
    articles.value = await getPublishedArticles()
  } catch (error) {
    console.error('Gagal mengambil artikel publik:', error)
    articles.value = []
  } finally {
    is_loading.value = false
  }
})
</script>

<style scoped>
.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

/* Sembunyikan scrollbar tapi tetap bisa di-scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
