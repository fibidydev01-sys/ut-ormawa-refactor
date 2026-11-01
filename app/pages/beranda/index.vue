<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <SiteHeader />

    <LandingHero />

    <LandingStats />

    <LandingWelcome />

    <LandingHighlights :articles="highlight_articles" :loading="is_loading" />

    <LandingAllArticles :articles="regular_articles" :loading="is_loading" />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
import type { PublicArticle } from '~/features/articles/use-public-articles'

useSeoMeta({
  title: 'Beranda - Portal Resmi Organisasi Mahasiswa',
  ogTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  description:
    'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  ogDescription:
    'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, aspirasi, informasi kegiatan, Himpunan Mahasiswa (IMF), UKM, dan prestasi mahasiswa.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogUrl: 'https://ormawa-utsurabaya.web.app/beranda',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Ormawa UT Surabaya - Kreasi, Kolaborasi, Berprestasi',
  twitterDescription:
    'Portal resmi Organisasi Mahasiswa Universitas Terbuka Surabaya. Wadah kreasi, kolaborasi, dan prestasi mahasiswa.',
  twitterImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  keywords:
    'ormawa ut surabaya, universitas terbuka surabaya, ukm ut surabaya, himpunan mahasiswa ut surabaya, kkb ut surabaya, osmb ut surabaya 2026',
})

// [S6] Diambil di server (SSR) — HTML awal sudah berisi artikel.
const { data: articles, pending: is_loading } = await usePublicArticles()

// 3 terbaru jadi highlight, sisanya di daftar "Semua Berita"
const highlight_articles = computed<PublicArticle[]>(() => articles.value.slice(0, 3))
const regular_articles = computed<PublicArticle[]>(() => articles.value.slice(3))
</script>
