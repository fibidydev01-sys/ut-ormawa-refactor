<!--
  SITE NAV DROPDOWN — satu grup menu navbar desktop (muncul saat hover)
  File: app/components/layout/site-nav-dropdown.vue
-->
<script setup lang="ts">
import type { NavGroupEntry } from '~/constants/nav'

const props = defineProps<{ group: NavGroupEntry }>()
const { isActive } = useSiteNav()
const isCta = computed(() => props.group.variant === 'cta')
</script>

<template>
  <div class="relative group py-2">
    <button
      v-if="isCta"
      type="button"
      class="px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-red-600 cursor-pointer focus:outline-none"
    >
      <NavIcon :name="group.icon" class="w-4 h-4 text-slate-900" />
      {{ group.label }}
      <NavIcon
        name="chevron-down"
        stroke-width="2.5"
        class="w-3 h-3 text-slate-900 group-hover:rotate-180 transition-transform duration-300"
      />
    </button>
    <button
      v-else
      type="button"
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none',
        isActive(group)
          ? 'text-slate-900 bg-transparent group-hover:bg-slate-100'
          : 'text-slate-900 group-hover:bg-slate-100 group-hover:text-slate-900',
      ]"
    >
      <NavIcon :name="group.icon" :stroke-width="group.iconStrokeWidth" class="w-4 h-4" />
      {{ group.label }}
      <NavIcon
        name="chevron-down"
        stroke-width="2.5"
        class="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-300"
      />
    </button>

    <div
      :class="[
        'absolute left-1/2 -translate-x-1/2 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2',
        group.width,
      ]"
    >
      <template v-for="(section, sIndex) in group.sections" :key="sIndex">
        <div
          v-if="section.heading"
          :class="[
            'px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1',
            { 'mt-1': sIndex > 0 },
          ]"
        >
          {{ section.heading }}
        </div>
        <NuxtLink
          v-for="item in section.items"
          :key="item.to"
          :to="item.to"
          :class="[
            'block px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium',
            { 'pl-6': section.heading, 'border-b border-slate-50': item.divider },
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Transisi untuk kehalusan dropdown (dibawa dari Navbar.vue lama) */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
