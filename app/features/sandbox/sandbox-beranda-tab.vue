<!--
  SANDBOX — tiruan tab Beranda (sapaan, pencarian, kartu fitur)
  File: app/features/sandbox/sandbox-beranda-tab.vue
-->

<template>
  <div class="mb-10">
    <h1
      class="text-[32px] md:text-[40px] font-semibold text-indigo-500/80 mb-2 font-sans tracking-tight"
    >
      Halo Zainur
    </h1>
    <p class="text-slate-500 text-lg">Apa yang bisa saya bantu hari ini?</p>
  </div>

  <!-- Search Input -->
  <div
    class="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 mb-10 flex flex-col relative group transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300"
  >
    <textarea
      class="w-full bg-transparent resize-none border-none focus:ring-0 text-slate-700 text-lg py-3 px-2 placeholder:text-slate-300 min-h-[80px]"
      placeholder="Ketik instruksi atau cari data pasien..."
    ></textarea>
    <div class="flex items-center justify-between mt-2 px-2">
      <div class="flex gap-4 text-slate-400">
        <button class="hover:text-slate-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>
        <button class="hover:text-slate-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <button
        class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform hover:scale-105"
      >
        <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Feature Cards Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Daftarkan Pasien Baru</span>
      <div
        class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Statistik Pemeriksaan</span>
      <div
        class="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Register TBC</span>
      <div
        class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Cek Koneksi Simrs</span>
      <div
        class="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Pemeriksaan</span>
      <div
        class="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Log Proses</span>
      <div
        class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Peta Bakteri</span>
      <div
        class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
      </div>
    </a>

    <a
      href="#"
      class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between min-h-[100px]"
    >
      <span class="font-medium text-slate-700 w-3/4 leading-snug">Peta Antibiotik</span>
      <div
        class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</template>
