<template>
  <div class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm min-h-[500px] transition-all overflow-visible">
        <NuxtPage />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Profil Organisasi',
  ogTitle: 'Profil Organisasi - Ormawa UT Surabaya',
  description: 'Mengenal lebih dekat profil Universitas Terbuka Surabaya dan kepengurusan Organisasi Kemahasiswaan (Ormawa).',
  ogDescription: 'Mengenal lebih dekat profil Universitas Terbuka Surabaya dan kepengurusan Organisasi Kemahasiswaan (Ormawa).',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>


