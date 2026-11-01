<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <ZonaKampusImf />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Pendaftaran IMF / HIMA',
  ogTitle: 'Pendaftaran IMF / HIMA - Ormawa UT Surabaya',
  description:
    'Pendaftaran keanggotaan dan kepengurusan Ikatan Mahasiswa Fakultas (IMF) dan Himpunan Mahasiswa Program Studi di Universitas Terbuka Surabaya.',
  ogDescription:
    'Pendaftaran keanggotaan dan kepengurusan Ikatan Mahasiswa Fakultas (IMF) dan Himpunan Mahasiswa Program Studi di Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
