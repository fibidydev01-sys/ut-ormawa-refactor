<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <!-- 1. NAVIGATION BAR -->
    <SiteHeader />

    <KontakAspirasi />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Layanan Aspirasi Mahasiswa',
  ogTitle: 'Layanan Aspirasi & Suara Mahasiswa - Ormawa UT Surabaya',
  description:
    'Suaramu Berharga. Sampaikan ide, masukan, kritik konstruktif, dan saran Anda secara aman dan transparan untuk kemajuan kampus.',
  ogDescription:
    'Suaramu Berharga. Sampaikan ide, masukan, kritik konstruktif, dan saran Anda secara aman dan transparan untuk kemajuan kampus.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
