<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <SiteHeader />

    <MediaLaporan />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Laporan Kegiatan (LPJ)',
  ogTitle: 'Laporan Kegiatan & Pertanggungjawaban - Ormawa UT Surabaya',
  description:
    'Wujud transparansi Ormawa UT Surabaya. Akses arsip laporan pertanggungjawaban (LPJ) dari seluruh program kerja kemahasiswaan.',
  ogDescription:
    'Wujud transparansi Ormawa UT Surabaya. Akses arsip laporan pertanggungjawaban (LPJ) dari seluruh program kerja kemahasiswaan.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
