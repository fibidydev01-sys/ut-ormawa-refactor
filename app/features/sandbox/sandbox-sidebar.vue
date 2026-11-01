<!--
  SANDBOX — sidebar tiruan
  File: app/features/sandbox/sandbox-sidebar.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { activeTab, logout } = injectSandboxPreview()
</script>

<template>
  <aside
    class="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto hidden md:flex custom-scrollbar relative z-10"
  >
    <div class="p-4">
      <!-- Active Menu -->
      <a
        href="#"
        :class="[
          'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
          activeTab === 'Beranda'
            ? 'bg-emerald-50 text-emerald-600'
            : 'text-slate-600 hover:bg-slate-50',
        ]"
        @click.prevent="activeTab = 'Beranda'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
        Beranda
      </a>

      <!-- Main Nav Section -->
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
        Menu Utama
      </div>
      <nav class="space-y-1 flex flex-col">
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Profil'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Profil'"
        >
          <svg
            class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          Profil
        </a>
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Zona Kampus'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Zona Kampus'"
        >
          <svg
            class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"
            ></path>
          </svg>
          Zona Kampus
        </a>
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Media'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Media'"
        >
          <svg
            class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
          Media
        </a>
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Kontak'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Kontak'"
        >
          <svg
            class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 1c-4.97 0-9 4.03-9 9v7a3 3 0 003 3h1a2 2 0 002-2v-3a2 2 0 00-2-2H5v-3c0-3.87 3.13-7 7-7s7 3.13 7 7v3h-1a2 2 0 00-2 2v3a2 2 0 002 2h1a3 3 0 003-3v-7c0-4.97-4.03-9-9-9z"
            ></path>
          </svg>
          Kontak
        </a>
      </nav>
    </div>

    <div class="mt-auto p-4 border-t border-slate-100 flex flex-col gap-1">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg w-full px-2 py-2 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Ke Halaman Utama Web
      </NuxtLink>
      <button
        class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg w-full px-2 py-2 transition-colors"
        @click="logout"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        Keluar
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* Disalin dari sandbox-preview.vue — sidebar memakai .custom-scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
