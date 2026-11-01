<!--
  ZONA KAMPUS CARI TEMAN HERO — banner judul
  File: app/features/zona-kampus/zona-kampus-cari-teman-hero.vue
-->

<template>
  <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    <div
      class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
      style="
        background-image: url('/img/Background ormawa.png');
        background-size: cover;
        background-position: center;
      "
    ></div>

    <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 space-y-6 text-center md:text-left">
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
          >
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Live Connect
          </div>
          <div
            class="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
          >
            Edisi Spesial Maba
          </div>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Perluas Relasi & <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300"
            >Cari Teman Baru</span
          >
        </h2>
        <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
          Kuliah nggak harus sendirian! Temukan teman diskusi, bentuk kelompok tugas, atau cari
          anggota tim untuk ikut perlombaan bergengsi di sini.
        </p>
      </div>
    </div>
  </section>
</template>
