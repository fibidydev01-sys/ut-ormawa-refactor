<!--
  MEDIA SOCIAL LINKS — kartu tautan media sosial Ormawa
  File: app/features/media/media-social-links.vue
-->

<script setup lang="ts">
import { SOCIAL_LINKS as socialLinks } from './media.data'
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1
        class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 flex justify-center items-center gap-3"
      >
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        Social Media Ormawa
      </h1>
      <p class="text-slate-600 max-w-2xl mx-auto font-medium">
        Ikuti dan terhubung dengan kami di berbagai platform media sosial untuk mendapatkan
        informasi terbaru dan kegiatan Ormawa UT Surabaya.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all group overflow-hidden relative"
      >
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
          :style="{ backgroundColor: social.bgColor }"
        ></div>
        <!-- eslint-disable vue/no-v-html -- SVG statis dari media.data.ts, bukan input user -->
        <div
          class="h-20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl"
          v-html="social.iconSvg"
        ></div>
        <!-- eslint-enable vue/no-v-html -->
        <h3
          class="font-extrabold text-slate-800 text-lg group-hover:text-blue-700 transition-colors"
        >
          {{ social.name }}
        </h3>
        <span class="text-xs text-slate-500 mt-2 flex items-center gap-1 font-semibold">
          Kunjungi
          <svg
            class="w-3 h-3 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>
