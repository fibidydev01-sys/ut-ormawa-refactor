<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <MediaPerlombaan />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Informasi Perlombaan',
  ogTitle: 'Informasi Perlombaan & Kompetisi Mahasiswa - Ormawa UT Surabaya',
  description:
    'Dapatkan informasi terbaru mengenai berbagai ajang kompetisi dan perlombaan bergengsi tingkat regional, nasional, hingga internasional.',
  ogDescription:
    'Dapatkan informasi terbaru mengenai berbagai ajang kompetisi dan perlombaan bergengsi tingkat regional, nasional, hingga internasional.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
