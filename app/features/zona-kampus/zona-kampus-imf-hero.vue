<!--
  ZONA KAMPUS IMF HERO — banner open recruitment HIMA
  File: app/features/zona-kampus/zona-kampus-imf-hero.vue
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
      <div class="flex-1 space-y-6">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <div
            class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-red-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
          >
            Regenerasi Kepengurusan
          </div>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Pendaftaran <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200"
            >Pengurus HIMA / IMF</span
          >
        </h2>
        <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
          Ikatan Mahasiswa Fakultas (IMF) atau Himpunan Mahasiswa Jurusan (HIMA) adalah wadah
          advokasi dan aspirasi program studi. Mari berkontribusi aktif memajukan jurusanmu!
        </p>
      </div>
    </div>
  </section>
</template>
