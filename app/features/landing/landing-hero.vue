<!--
  LANDING HERO — judul KKB, tautan grup WA prodi, gelombang animasi
  File: app/features/landing/landing-hero.vue
-->

<template>
  <section
    class="relative bg-admiral text-white pt-20 pb-28 md:pb-36 px-6 md:px-12 overflow-hidden"
  >
    <!-- Background Image -->
    <img
      src="/img/background-landingpage.png"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
    />

    <div class="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <!-- Hero Text -->
      <div class="w-full space-y-6 flex flex-col items-center">
        <div class="flex flex-wrap items-center justify-center mb-6">
          <div
            class="inline-block px-5 py-2 bg-slate-800 border border-slate-700 text-lemon text-sm font-bold uppercase tracking-widest rounded-full shadow-md"
          >
            Website resmi Ormawa ut surabaya
          </div>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          KKB <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-lemon to-lemon-light"
            >Kreasi Kolaborasi Berprestasi</span
          >
        </h2>

        <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Jadilah bagian dari pergerakan mahasiswa yang aktif dan inovatif. Temukan ruang untuk
          mengembangkan potensi, merajut kolaborasi, dan mencetak prestasi bersama Ormawa
          Universitas Terbuka Surabaya.
        </p>

        <!-- ✅ Shortcut: Grup WA Prodi OSMB 2026.2 -->
        <NuxtLink
          to="/kontak/wa_prodi_2026_2"
          class="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-green-300 rounded-2xl shadow-lg hover:shadow-xl px-6 py-4 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- WhatsApp Icon -->
          <div
            class="flex-shrink-0 w-10 h-10 bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
          </div>
          <!-- Text -->
          <p
            class="text-white group-hover:text-green-700 font-bold text-base leading-tight transition-colors"
          >
            Grup WhatsApp Prodi OSMB 2026.2
          </p>
          <!-- Arrow -->
          <svg
            class="w-4 h-4 text-white/60 group-hover:text-green-500 group-hover:translate-x-1 transition-all ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Animated Wave Divider -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
      <svg
        class="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px] lg:h-[120px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(249, 250, 251, 0.7)" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(249, 250, 251, 0.5)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(249, 250, 251, 0.3)" />
          <use href="#gentle-wave" x="48" y="7" fill="#f9fafb" />
        </g>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
