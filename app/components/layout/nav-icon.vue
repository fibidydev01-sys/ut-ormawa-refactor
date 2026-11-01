<!--
  NAV ICON — ikon garis (outline) untuk navbar & sidebar
  File: app/components/layout/nav-icon.vue

  Menghasilkan <svg> yang sama persis dengan SVG inline lama:
  fill="none", stroke="currentColor", viewBox 24, linecap/linejoin round.
  Ketebalan garis ikut pemanggil (lama: 2 atau 2.5).
-->
<script setup lang="ts">
import { NAV_ICONS } from '~/constants/icons'
import type { NavIconName } from '~/constants/icons'

withDefaults(defineProps<{ name: NavIconName; strokeWidth?: string }>(), {
  strokeWidth: '2',
})
</script>

<template>
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      v-for="(d, i) in NAV_ICONS[name]"
      :key="i"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      :d="d"
    />
  </svg>
</template>
