<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <ZonaKampusAkademik />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Kegiatan Akademik',
  ogTitle: 'Kegiatan Akademik - Ormawa UT Surabaya',
  description:
    'Informasi kegiatan seminar, workshop, webinar, dan kuliah tamu di lingkungan Universitas Terbuka Surabaya.',
  ogDescription:
    'Informasi kegiatan seminar, workshop, webinar, dan kuliah tamu di lingkungan Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
