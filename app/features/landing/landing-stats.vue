<!--
  LANDING STATS — 4 kartu angka di bawah hero
  File: app/features/landing/landing-stats.vue
  Data: landing.data.ts
-->

<script setup lang="ts">
import { LANDING_STATS as stats } from './landing.data'
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 md:px-12 pb-12 -mt-4 relative z-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all group"
      >
        <div
          class="w-14 h-14 rounded-full bg-slate-50 text-admiral flex items-center justify-center mb-4 group-hover:bg-admiral group-hover:text-lemon transition-colors"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-7 h-7">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="stat.iconPath"
            />
          </svg>
        </div>
        <h3 class="text-3xl font-extrabold text-admiral mb-1">{{ stat.value }}</h3>
        <p class="text-sm text-slate-500 font-medium">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>
