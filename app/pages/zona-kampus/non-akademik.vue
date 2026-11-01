<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <ZonaKampusNonAkademik />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Kegiatan Non-Akademik',
  ogTitle: 'Kegiatan Non-Akademik - Ormawa UT Surabaya',
  description:
    'Informasi kegiatan minat bakat, olahraga, seni budaya, dan pengabdian masyarakat Universitas Terbuka Surabaya.',
  ogDescription:
    'Informasi kegiatan minat bakat, olahraga, seni budaya, dan pengabdian masyarakat Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
