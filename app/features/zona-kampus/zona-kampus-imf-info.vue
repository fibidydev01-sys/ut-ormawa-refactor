<!--
  ZONA KAMPUS IMF INFO — sidebar alur seleksi & kontak panitia
  File: app/features/zona-kampus/zona-kampus-imf-info.vue
-->

<template>
  <div class="lg:w-1/3">
    <div class="sticky top-24 space-y-6">
      <!-- Timeline -->
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-6">Timeline Rekrutmen</h3>

        <div class="relative border-l border-slate-200 ml-3 space-y-6">
          <div class="relative">
            <div
              class="absolute -left-[29px] bg-red-500 w-4 h-4 rounded-full border-4 border-white shadow-sm"
            ></div>
            <div class="pl-4">
              <p class="text-sm font-bold text-slate-800">Pendaftaran Online</p>
              <p class="text-xs text-slate-500 mt-1">1 - 15 Agustus 2026</p>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"
            ></div>
            <div class="pl-4">
              <p class="text-sm font-bold text-slate-500">Seleksi Berkas</p>
              <p class="text-xs text-slate-400 mt-1">16 - 18 Agustus 2026</p>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"
            ></div>
            <div class="pl-4">
              <p class="text-sm font-bold text-slate-500">Wawancara (Fit & Proper Test)</p>
              <p class="text-xs text-slate-400 mt-1">20 - 22 Agustus 2026</p>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"
            ></div>
            <div class="pl-4">
              <p class="text-sm font-bold text-slate-500">Pengumuman Kelulusan</p>
              <p class="text-xs text-slate-400 mt-1">25 Agustus 2026</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Syarat Umum -->
      <div class="bg-red-50 border border-red-100 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Syarat Umum
        </h3>
        <ul class="text-sm text-red-700 space-y-2 list-disc pl-4">
          <li>Mahasiswa aktif Universitas Terbuka Surabaya (Maksimal Semester 5).</li>
          <li>Memiliki dedikasi tinggi dan komitmen selama 1 periode kepengurusan.</li>
          <li>Mampu bekerja dalam tim maupun individu.</li>
          <li>Tidak sedang menjabat sebagai pengurus inti di organisasi kampus lain.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
