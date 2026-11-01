<!--
  ADMIN AREA — kolom modul utama: catatan pribadi, passkey, tautan cepat
  File: app/features/admin-area/admin-area-modules.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const {
  userRole,
  isRegisteringPasskey,
  passkeyMessage,
  passkeyError,
  registerPasskey,
  adminNote,
  isSavingNote,
  noteSaved,
  debouncedSaveNote,
} = injectAdminAreaHome()
</script>

<template>
  <div class="lg:col-span-1 flex flex-col gap-4">
    <h3 class="text-lg font-bold text-slate-800 px-1">Modul Utama</h3>

    <NuxtLink
      to="/dashboard/admin-area/berita"
      class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
    >
      <div
        class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          ></path>
        </svg>
      </div>
      <h4 class="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors text-sm">
        Manajemen Konten
      </h4>
      <p class="text-xs text-slate-500">Edit Berita, Banner, Agenda</p>
    </NuxtLink>

    <NuxtLink
      v-if="userRole === 'super_admin'"
      to="/dashboard/admin-area/kelola-user"
      class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
    >
      <div
        class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors text-sm"
      >
        Akses & Pengguna
      </h4>
      <p class="text-xs text-slate-500">Khusus Super Admin</p>
    </NuxtLink>

    <NuxtLink
      to="/dashboard/admin-area/proposal"
      class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
    >
      <div
        class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors text-sm"
      >
        Arsip E-Proposal
      </h4>
      <p class="text-xs text-slate-500">Review & Gudang LPJ</p>
    </NuxtLink>

    <NuxtLink
      to="/dashboard/admin-area/pengaturan"
      class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
    >
      <div
        class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors text-sm"
      >
        Pengaturan Sistem
      </h4>
      <p class="text-xs text-slate-500">Konfigurasi Website</p>
    </NuxtLink>

    <!-- Notepad -->
    <div class="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-sm flex flex-col h-52">
      <div class="flex items-center gap-2 mb-3">
        <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
        <h3 class="font-bold text-amber-800 text-sm">Catatan Pribadi</h3>
        <span v-if="isSavingNote" class="text-xs text-amber-600 ml-auto animate-pulse"
          >Menyimpan...</span
        >
        <span v-else-if="noteSaved" class="text-xs text-green-600 ml-auto">Tersimpan ✓</span>
      </div>
      <textarea
        v-model="adminNote"
        class="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 text-sm text-slate-700 placeholder-amber-300 p-0 outline-none"
        placeholder="Ketik catatan di sini... (otomatis tersimpan)"
        @input="debouncedSaveNote"
      ></textarea>
    </div>

    <!-- Keamanan Biometrik -->
    <div
      class="bg-indigo-50 rounded-2xl p-5 border border-indigo-200 shadow-sm flex flex-col items-center text-center"
    >
      <div
        class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          ></path>
        </svg>
      </div>
      <h4 class="font-bold text-indigo-800 mb-1">Keamanan Biometrik</h4>
      <p class="text-xs text-indigo-600 mb-3">Login instan dengan sidik jari/Face ID.</p>
      <button
        :disabled="isRegisteringPasskey"
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all text-sm disabled:opacity-70"
        @click="registerPasskey"
      >
        <span v-if="isRegisteringPasskey">Mendaftarkan...</span>
        <span v-else>Daftarkan Perangkat Ini</span>
      </button>
      <p
        v-if="passkeyMessage"
        class="text-xs mt-2 font-semibold"
        :class="passkeyError ? 'text-red-600' : 'text-green-600'"
      >
        {{ passkeyMessage }}
      </p>
    </div>
  </div>
</template>
