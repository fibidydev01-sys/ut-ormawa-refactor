<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <!-- 1. NAVIGATION BAR -->
    <SiteHeader />

    <KontakPelaporan />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Pusat Pelaporan & Pengaduan',
  ogTitle: 'Pusat Pelaporan & Pengaduan - Ormawa UT Surabaya',
  description:
    'Layanan pelaporan kendala, pelanggaran, atau kejadian penting di lingkungan kampus. Keamanan dan kerahasiaan identitas Anda terjamin.',
  ogDescription:
    'Layanan pelaporan kendala, pelanggaran, atau kejadian penting di lingkungan kampus. Keamanan dan kerahasiaan identitas Anda terjamin.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
