<!--
  SANDBOX — header tiruan (logo, tab, dropdown profil)
  File: app/features/sandbox/sandbox-header.vue
-->

<script setup lang="ts">
import { injectSandboxPreview } from './use-sandbox-preview'

const { profileOpen, activeTab, tabs } = injectSandboxPreview()
</script>

<template>
  <header
    class="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20"
  >
    <div class="flex items-center">
      <!-- Logo -->
      <div class="w-60 flex items-center">
        <span class="text-2xl font-bold text-emerald-600 tracking-tight">MCLIS</span>
      </div>

      <!-- Horizontal Menu -->
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

    <!-- User Profile -->
    <div class="relative">
      <button
        class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition"
        @click="profileOpen = !profileOpen"
      >
        <div class="text-right hidden sm:block">
          <div class="text-sm font-bold text-slate-800">Zainur Roziqin</div>
          <div class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">IT</div>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm"
        >
          ZR
        </div>
      </button>

      <!-- Profile Dropdown -->
      <div
        v-if="profileOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
      >
        <a href="#" class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Profil Saya</a>
        <a href="#" class="block px-4 py-2 text-sm text-emerald-600 bg-emerald-50/50">Pengaturan</a>
        <div class="border-t border-slate-100 my-1"></div>
        <a href="#" class="block px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50"
          >Logout</a
        >
      </div>
    </div>
  </header>
</template>
