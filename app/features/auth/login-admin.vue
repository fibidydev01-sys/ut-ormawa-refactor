<!--
  LOGIN ADMIN — kartu portal login: judul, form admin, area magic link mahasiswa
  File: app/features/auth/login-admin.vue
-->

<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative font-sans"
    style="background-image: url('/img/acarautsurabaya.png')"
  >
    <!-- Dark overlay for better readability -->
    <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>

    <div
      class="max-w-md w-full bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 relative z-10 transition-all duration-500"
    >
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg mb-4"
        >
          <img class="h-12 w-auto" src="/img/Favicon_bulat_transparan.png" alt="Logo Ormawa" />
        </div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">Portal Login</h2>
        <p class="mt-2 text-sm font-medium text-slate-500">Selamat datang kembali di sistem</p>
      </div>

      <!-- FORM ADMIN -->
      <LoginAdminForm />

      <!-- ============================================== -->
      <!-- SECTION: MAHASISWA LOGIN -->
      <!-- ============================================== -->
      <LoginMagicLink />

      <!-- Footer -->
      <div class="text-center mt-8">
        <NuxtLink
          to="/beranda"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-admiral transition-colors group"
        >
          <svg
            class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
