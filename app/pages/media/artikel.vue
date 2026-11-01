<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <SiteHeader />

    <ArticleCatalog />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Artikel & Berita',
  ogTitle: 'Artikel & Berita Terkini Ormawa UT Surabaya',
  description:
    'Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan kabar terkini dari ruang lingkup kemahasiswaan Universitas Terbuka Surabaya.',
  ogDescription:
    'Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan kabar terkini dari ruang lingkup kemahasiswaan Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
