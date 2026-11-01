<!--
  LANDING HIGHLIGHTS — 3 artikel terbaru (1 besar + 2 kecil)
  File: app/features/landing/landing-highlights.vue
-->

<script setup lang="ts">
import type { PublicArticle } from '~/features/articles/use-public-articles'
import { formatArticleDate as formatDate, stripHtml } from '~/features/articles'

defineProps<{ articles: PublicArticle[]; loading: boolean }>()
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 pb-20">
    <div class="mb-8 flex items-end justify-between gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Berita & Kegiatan
        </p>
        <h2 class="text-3xl font-extrabold text-slate-900">Highlight Terkini</h2>
      </div>
    </div>

    <div
      v-if="loading"
      class="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm"
    >
      Memuat berita terbaru dari Firestore...
    </div>

    <div
      v-else-if="articles.length === 0"
      class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500"
    >
      Belum ada berita publik yang tersedia saat ini.
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Main Highlight -->
      <article
        v-if="articles[0]"
        class="group relative col-span-1 lg:col-span-8 overflow-hidden rounded-3xl bg-slate-900 shadow-xl min-h-[400px] md:min-h-[500px]"
      >
        <img
          :src="articles[0].cover_image_url || '/img/background-landingpage.png'"
          :alt="articles[0].title"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <!-- Gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
        ></div>

        <!-- Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="inline-flex rounded-full bg-lemon px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm"
              >{{ articles[0].organization_name }}</span
            >
            <span class="text-sm font-medium text-slate-300 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ formatDate(articles[0].created_at) }}
            </span>
          </div>

          <h3
            class="mb-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md group-hover:text-lemon transition-colors duration-300"
          >
            <NuxtLink :to="`/berita/${articles[0].slug}`" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {{ articles[0].title }}
            </NuxtLink>
          </h3>

          <p
            class="mb-6 max-w-3xl text-base md:text-lg text-slate-200 line-clamp-2 md:line-clamp-3 opacity-90"
          >
            {{ stripHtml(articles[0].content) }}
          </p>

          <div
            class="flex items-center text-lemon font-semibold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform duration-300"
          >
            Baca Selengkapnya
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>

      <!-- Secondary Highlights Column -->
      <div class="col-span-1 lg:col-span-4 flex flex-col gap-6">
        <article
          v-for="article in articles.slice(1, 3)"
          :key="article.id"
          class="group relative flex-1 overflow-hidden rounded-3xl bg-slate-900 shadow-lg min-h-[220px]"
        >
          <img
            :src="article.cover_image_url || '/img/background-landingpage.png'"
            :alt="article.title"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <!-- Heavy Gradient for readability -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <div class="absolute inset-0 flex flex-col justify-end p-6">
            <div class="mb-3 flex items-center justify-between">
              <span
                class="inline-flex rounded-full bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                >{{ article.organization_name }}</span
              >
            </div>

            <h4
              class="mb-2 text-lg font-bold text-white leading-snug group-hover:text-lemon transition-colors duration-300 line-clamp-3"
            >
              <NuxtLink :to="`/berita/${article.slug}`" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                {{ article.title }}
              </NuxtLink>
            </h4>

            <div class="flex items-center justify-between mt-auto pt-2 text-slate-300 text-xs">
              <span>{{ formatDate(article.created_at) }}</span>
              <span
                class="group-hover:translate-x-1 group-hover:text-lemon transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
