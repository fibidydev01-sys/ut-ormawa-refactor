<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <Navbar />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-4 text-slate-400">
        <svg class="animate-spin w-10 h-10" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-sm font-medium">Memuat artikel...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!article" class="flex items-center justify-center min-h-[60vh] px-6">
      <div class="text-center max-w-md">
        <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-2xl font-extrabold text-slate-800 mb-3">Artikel Tidak Ditemukan</h1>
        <p class="text-slate-500 mb-8">Artikel yang Anda cari tidak tersedia atau sudah tidak dipublikasikan.</p>
        <NuxtLink
          to="/beranda"
          class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>

    <!-- Article Content -->
    <template v-else>
      <!-- Hero / Cover -->
      <div class="relative w-full bg-slate-900" style="height: clamp(220px, 40vw, 500px)">
        <img
          v-if="article.cover_image_url"
          :src="article.cover_image_url"
          :alt="article.title"
          class="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div class="relative h-full flex flex-col justify-end px-6 pb-10 max-w-4xl mx-auto">
          <span class="mb-3 inline-flex w-max rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
            {{ article.organization_name }}
          </span>
          <h1 class="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {{ article.title }}
          </h1>
          <p class="mt-3 text-sm text-slate-300">
            {{ formatDate(article.created_at) }}
          </p>
        </div>
      </div>

      <!-- Article Body -->
      <div class="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <!-- Back Link -->
        <NuxtLink
          to="/beranda"
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors mb-10"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </NuxtLink>

        <!-- Prose Content -->
        <article
          class="article-content"
          v-html="article.content"
        />

        <!-- Footer Meta -->
        <div class="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="font-medium text-slate-700">{{ article.organization_name }}</span>
          </div>
          <span class="h-1 w-1 rounded-full bg-slate-300" />
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDate(article.created_at) }}</span>
          </div>
        </div>
      </div>
    </template>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ArticleDocument } from '~/types/database.types'
import type { Timestamp } from 'firebase/firestore'

const route = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => (route.params.slug as string) || '')
const siteUrl = (config.public.siteUrl as string) || 'https://ormawa-utsurabaya.web.app'

// Ambil data artikel melalui server API endpoint agar meta tags terisi saat SSR
const { data: articleData, pending: isLoading } = await useAsyncData(
  `article-${slug.value}`,
  async () => {
    try {
      return await $fetch<ArticleDocument>(`/api/articles/${slug.value}`)
    } catch (e) {
      // Fallback ke Firebase client composable jika di browser dan API gagal
      if (import.meta.client) {
        try {
          const { getArticleBySlug } = useArticles()
          return await getArticleBySlug(slug.value)
        } catch (clientErr) {
          console.error('[Article Client Fallback] Gagal:', clientErr)
        }
      }
      return null
    }
  },
  {
    watch: [slug],
  }
)

const article = computed(() => articleData.value)

const formatDate = (timestamp: Timestamp | string | Date | null | undefined) => {
  const normalized = timestamp as { toDate?: () => Date } | undefined
  const date = normalized?.toDate
    ? normalized.toDate()
    : timestamp instanceof Date
    ? timestamp
    : typeof timestamp === 'string'
    ? new Date(timestamp)
    : null

  if (!date || Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const articleExcerpt = computed(() => {
  if (!article.value?.content) return 'Baca liputan dan artikel selengkapnya di Ormawa Universitas Terbuka Surabaya.'
  return article.value.content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
})

const pageTitle = computed(() => {
  return article.value?.title ? article.value.title : 'Artikel Tidak Ditemukan'
})

const articleUrl = computed(() => `${siteUrl}/berita/${slug.value}`)
const articleImage = computed(() => article.value?.cover_image_url || `${siteUrl}/img/Background%20ormawa.png`)

// Dynamic SEO Meta Tags (SSR Compatible)
useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: articleExcerpt,
  ogDescription: articleExcerpt,
  ogImage: articleImage,
  ogUrl: articleUrl,
  ogType: 'article',
  articlePublishedTime: () => (typeof article.value?.created_at === 'string' ? article.value.created_at : undefined),
  articleModifiedTime: () => (typeof article.value?.updated_at === 'string' ? article.value.updated_at : undefined),
  articleAuthor: () => article.value?.organization_name || 'Ormawa UT Surabaya',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: articleExcerpt,
  twitterImage: articleImage,
})

// Schema.org NewsArticle Structured Data
useHead({
  script: computed(() => {
    if (!article.value) return []
    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.value.title,
          image: [articleImage.value],
          datePublished: article.value.created_at || new Date().toISOString(),
          dateModified: article.value.updated_at || article.value.created_at || new Date().toISOString(),
          author: {
            '@type': 'Organization',
            name: article.value.organization_name || 'Ormawa UT Surabaya',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Ormawa UT Surabaya',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/img/Favicon_bulat_transparan.png`,
            },
          },
          description: articleExcerpt.value,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl.value,
          },
        }),
      },
    ]
  }),
})
</script>

<style scoped>
/* ── Konten Artikel dari Tiptap Editor ── */
:deep(.article-content) {
  font-size: 1.1rem;
  line-height: 1.85;
  color: #475569;
}

:deep(.article-content h2) {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1e293b;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

:deep(.article-content h3) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #334155;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

:deep(.article-content p) {
  margin-bottom: 1.25rem;
}

:deep(.article-content strong) {
  font-weight: 700;
  color: #1e293b;
}

:deep(.article-content em) {
  font-style: italic;
}

:deep(.article-content ul) {
  list-style-type: disc;
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;
}

:deep(.article-content ol) {
  list-style-type: decimal;
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;
}

:deep(.article-content li) {
  margin-bottom: 0.4rem;
}

:deep(.article-content li::marker) {
  color: #10b981;
}

:deep(.article-content a) {
  color: #059669;
  text-decoration: underline;
  text-underline-offset: 3px;
}

:deep(.article-content a:hover) {
  color: #047857;
}

:deep(.article-content img) {
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  max-width: 100%;
  margin: 1.5rem 0;
}

:deep(.article-content blockquote) {
  border-left: 4px solid #10b981;
  padding-left: 1.25rem;
  color: #64748b;
  font-style: italic;
  margin: 1.5rem 0;
}
</style>

