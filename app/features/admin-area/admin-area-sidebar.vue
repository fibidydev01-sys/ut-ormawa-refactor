<!--
  ADMIN AREA — sidebar navigasi panel admin lama
  File: app/features/admin-area/admin-area-sidebar.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const { activeTab, userRole } = injectAdminAreaHome()
</script>

<template>
  <aside
    class="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto hidden md:flex custom-scrollbar relative z-10"
  >
    <div class="p-4">
      <!-- Dashboard link (active item style) -->
      <a
        href="#"
        :class="[
          'flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium mb-6 transition',
          activeTab === 'Dashboard'
            ? 'bg-emerald-50 text-emerald-600'
            : 'text-slate-600 hover:bg-slate-50',
        ]"
        @click.prevent="activeTab = 'Dashboard'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          ></path>
        </svg>
        Dashboard
      </a>

      <!-- Section: Menu Utama -->
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
        Menu Utama
      </div>
      <nav class="space-y-1 flex flex-col">
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Konten'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Konten'"
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
          Manajemen Konten
        </a>
        <a
          v-if="userRole === 'super_admin'"
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Pengguna'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Pengguna'"
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          Akses & Pengguna
        </a>
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Proposal'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Proposal'"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          Arsip E-Proposal
        </a>
        <a
          href="#"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition group',
            activeTab === 'Pengaturan'
              ? 'bg-emerald-50 text-emerald-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50',
          ]"
          @click.prevent="activeTab = 'Pengaturan'"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Pengaturan Sistem
        </a>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
/* Disalin dari admin-area-home.vue — sidebar memakai .custom-scrollbar */
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
