<!--
  ADMIN AREA — 4 kartu metrik ringkasan
  File: app/features/admin-area/admin-area-metrics.vue
-->

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div
      class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"
      ></div>
      <div class="relative z-10 flex justify-between items-start">
        <div>
          <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
            Tiket Aspirasi
          </p>
          <h4 class="text-4xl font-black text-slate-800">12</h4>
          <p class="text-xs font-semibold text-orange-500 mt-2 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> 5 Belum Dibaca
          </p>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"
      ></div>
      <div class="relative z-10 flex justify-between items-start">
        <div>
          <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
            Proposal Masuk
          </p>
          <h4 class="text-4xl font-black text-slate-800">4</h4>
          <p class="text-xs font-semibold text-blue-500 mt-2">Butuh Review BEM</p>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"
      ></div>
      <div class="relative z-10 flex justify-between items-start">
        <div>
          <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
            Total Civitas
          </p>
          <h4 class="text-4xl font-black text-slate-800">1,204</h4>
          <p class="text-xs font-semibold text-emerald-500 mt-2 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
            +12 Minggu Ini
          </p>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"
      ></div>
      <div class="relative z-10 flex justify-between items-start">
        <div>
          <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Kunjungan</p>
          <h4 class="text-4xl font-black text-slate-800">842</h4>
          <p class="text-xs font-semibold text-purple-500 mt-2 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
            Trafik stabil
          </p>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
