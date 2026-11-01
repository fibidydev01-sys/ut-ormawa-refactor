<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <ZonaKampusCariTeman />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Cari Teman & Kolaborasi',
  ogTitle: 'Cari Teman & Kolaborasi Mahasiswa - Ormawa UT Surabaya',
  description:
    'Temukan teman diskusi, bentuk kelompok belajar, atau cari partner tim perlombaan di jejaring mahasiswa Universitas Terbuka Surabaya.',
  ogDescription:
    'Temukan teman diskusi, bentuk kelompok belajar, atau cari partner tim perlombaan di jejaring mahasiswa Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
