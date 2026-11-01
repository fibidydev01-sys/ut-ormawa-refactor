<!--
  LOGIN MAGIC LINK — area mahasiswa: kirim tautan login ke email & selesaikan login
  saat halaman dibuka dari tautan itu (lihat temuan T19)
  File: app/features/auth/login-magic-link.vue
-->

<script setup lang="ts">
const { mhsEmail, errorMahasiswa, isLoadingMahasiswa, linkSent, isVerifying, sendLoginLink } =
  useMagicLinkLogin()
</script>

<template>
  <div class="mt-6 pt-6 border-t-2 border-dashed border-slate-200 relative">
    <!-- Floating Badge -->
    <div
      class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md flex items-center gap-2"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l9-5-9-5-9 5 9 5z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l9-5-9-5-9 5 9 5z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14v7M5 9.42l7 3.88 7-3.88"
        ></path>
      </svg>
      Area Mahasiswa
    </div>

    <div class="animate-fadeIn space-y-5 pt-4">
      <div
        class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3.5 border border-blue-100 shadow-sm relative overflow-hidden"
      >
        <h4 class="text-xs font-extrabold text-blue-900 mb-1 flex items-center gap-1.5">
          <span
            class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200 text-blue-700 text-[10px]"
            >✨</span
          >
          Magic Link Login
        </h4>
        <p class="text-[11px] text-blue-800/80 font-medium leading-tight">
          Masukkan email Anda untuk menerima tautan login otomatis.
          <strong>Aman & Tanpa Password!</strong>
        </p>
      </div>

      <form v-if="!linkSent && !isVerifying" @submit.prevent="sendLoginLink">
        <div class="relative flex items-center group">
          <div
            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-admiral"
          >
            <svg
              class="h-5 w-5 text-slate-400 group-focus-within:text-admiral transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <input
            v-model="mhsEmail"
            type="email"
            required
            class="appearance-none block w-full pl-12 pr-[100px] py-4 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral sm:text-sm transition-all duration-300 shadow-sm"
            placeholder="nama@gmail.com"
          />

          <button
            type="submit"
            :disabled="isLoadingMahasiswa"
            class="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center px-5 rounded-lg text-sm font-bold text-slate-900 bg-gradient-to-r from-[#FFD700] to-[#FACC15] hover:from-[#FACC15] hover:to-[#EAB308] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-admiral disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            <svg
              v-if="isLoadingMahasiswa"
              class="animate-spin h-4 w-4 text-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-else>Kirim Link</span>
          </button>
        </div>
      </form>

      <!-- Pesan Sukses Mhs -->
      <div
        v-if="linkSent"
        class="rounded-xl bg-green-50 p-5 border border-green-200 text-center animate-fadeIn shadow-inner"
      >
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3"
        >
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-sm font-bold text-green-900 mb-1">Cek Inbox Email Anda!</h3>
        <p class="text-xs text-green-700 leading-relaxed mb-4">
          Tautan persetujuan telah dikirim ke <br /><strong class="text-green-900">{{
            mhsEmail
          }}</strong>
        </p>
        <button
          class="text-xs font-bold text-green-600 hover:text-green-800 underline decoration-2 underline-offset-2 transition-colors"
          @click="linkSent = false"
        >
          Kirim Ulang / Ganti Email
        </button>
      </div>

      <!-- Pesan Verifikasi Mhs -->
      <div
        v-if="isVerifying"
        class="rounded-xl bg-blue-50 p-6 border border-blue-200 text-center animate-fadeIn"
      >
        <svg
          class="animate-spin mx-auto h-8 w-8 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3 class="text-sm font-bold text-blue-900">Memverifikasi Sesi...</h3>
        <p class="text-xs text-blue-700 mt-1">Mohon tunggu sebentar.</p>
      </div>

      <!-- Pesan Error Mahasiswa -->
      <div
        v-if="errorMahasiswa"
        class="rounded-xl bg-red-50 p-4 border border-red-200 text-center animate-fadeIn"
      >
        <p class="text-xs font-bold text-red-700">{{ errorMahasiswa }}</p>
      </div>
    </div>
  </div>
</template>
