<!--
  ADMIN AREA — header atas: logo, tab horizontal, dropdown profil
  File: app/features/admin-area/admin-area-header.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const { profileOpen, activeTab, tabs, userName, initials, roleLabel, logout } =
  injectAdminAreaHome()
</script>

<template>
  <header
    class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20"
  >
    <div class="flex items-center">
      <!-- Logo -->
      <div class="w-60 flex items-center gap-3">
        <img src="/img/Favicon_bulat_transparan.png" alt="Logo" class="h-9 w-auto drop-shadow-sm" />
        <div>
          <span class="text-lg font-bold text-emerald-600 tracking-tight">ORMAWA</span>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">
            Admin Panel
          </p>
        </div>
      </div>

      <!-- Horizontal Tab Navigation (like sandbox) -->
      <nav class="hidden md:flex space-x-1 text-sm font-medium">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="[
            'px-4 py-5 transition border-b-2',
            activeTab === tab
              ? 'text-emerald-600 border-emerald-500'
              : 'text-slate-500 hover:text-slate-800 border-transparent',
          ]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <!-- User Profile Dropdown (like sandbox) -->
    <div class="relative">
      <button
        class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition"
        @click="profileOpen = !profileOpen"
      >
        <div class="text-right hidden sm:block">
          <div class="text-sm font-bold text-slate-800">{{ userName }}</div>
          <div class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
            {{ roleLabel }}
          </div>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm"
        >
          {{ initials }}
        </div>
      </button>
      <!-- Dropdown -->
      <div
        v-if="profileOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
      >
        <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >Beranda Publik</NuxtLink
        >
        <div class="border-t border-slate-100 my-1"></div>
        <button
          class="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
