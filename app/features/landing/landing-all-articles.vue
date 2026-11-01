<!--
  LANDING ALL ARTICLES — artikel ke-4 dst.
  File: app/features/landing/landing-all-articles.vue
-->

<script setup lang="ts">
import type { Article } from '~/types/database'
import { formatArticleDate as formatDate } from '~/features/articles'

defineProps<{ articles: Article[]; loading: boolean }>()
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 pb-20 md:px-12">
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Kumpulan berita
        </p>
        <h2 class="text-3xl font-extrabold text-slate-900">Semua Berita & Kegiatan</h2>
      </div>
    </div>

    <div
      v-if="loading"
      class="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm"
    >
      Menyiapkan daftar berita...
    </div>

    <div
      v-else-if="articles.length === 0"
      class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500"
    >
      Belum ada artikel tambahan yang tersedia.
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article
        v-for="article in articles"
        :key="article.id"
        class="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <img
          :src="article.cover_image_url || '/img/background-landingpage.png'"
          :alt="article.title"
          class="h-44 w-full object-cover"
        />
        <div class="p-5">
          <span
            class="mb-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700"
            >{{ article.organization_name }}</span
          >
          <h3 class="mb-2 line-clamp-2 text-lg font-semibold text-slate-900">
            {{ article.title }}
          </h3>
          <p class="mb-4 text-sm text-slate-500">{{ formatDate(article.created_at) }}</p>
          <NuxtLink
            :to="`/berita/${article.slug}`"
            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600"
          >
            Baca Selengkapnya
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
