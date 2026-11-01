<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <SiteHeader />

    <ZonaKampusUkm />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Pendaftaran UKM',
  ogTitle: 'Pendaftaran Unit Kegiatan Mahasiswa (UKM) - Ormawa UT Surabaya',
  description:
    'Informasi dan pendaftaran keanggotaan Unit Kegiatan Mahasiswa (UKM) Universitas Terbuka Surabaya. Kembangkan minat dan bakatmu di kampus.',
  ogDescription:
    'Informasi dan pendaftaran keanggotaan Unit Kegiatan Mahasiswa (UKM) Universitas Terbuka Surabaya. Kembangkan minat dan bakatmu di kampus.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
