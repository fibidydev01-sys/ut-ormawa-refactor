<!--
  KONTAK ASPIRASI HERO — banner judul halaman aspirasi
  File: app/features/kontak/kontak-aspirasi-hero.vue
-->

<template>
  <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    <!-- Background Image -->
    <div
      class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
      style="
        background-image: url('/img/Background ormawa.png');
        background-size: cover;
        background-position: center;
      "
    ></div>

    <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <!-- Hero Text -->
      <div class="flex-1 space-y-6">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <img
            src="/img/Favicon.png"
            alt="Logo Ormawa"
            class="h-12 w-auto rounded-full shadow-lg"
          />
          <div
            class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
          >
            Hubungi Kami
          </div>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Kontak & <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
            >Aspirasi</span
          >
        </h2>
        <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
          Suaramu Berharga. Sampaikan pendapat, ide, kritik, saran, atau laporan Anda langsung
          kepada kami. Kami mendengarkan dan akan merespons dengan cepat.
        </p>
      </div>

      <!-- Hero Graphic -->
      <div class="flex-1 w-full flex justify-center md:justify-end">
        <div
          class="relative w-full max-w-md aspect-square bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-6 flex flex-col gap-4"
        >
          <div class="flex gap-2 items-center border-b border-slate-700 pb-4">
            <div class="w-3 h-3 rounded-full bg-red-400"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
            <div class="ml-2 text-xs text-slate-400 font-mono">Contact & Feedback Form</div>
          </div>
          <!-- Mock UI Elements -->
          <div class="flex-1 flex gap-4 flex-col">
            <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse"></div>
            <div
              class="h-1/2 bg-slate-700/50 rounded-xl animate-pulse"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
