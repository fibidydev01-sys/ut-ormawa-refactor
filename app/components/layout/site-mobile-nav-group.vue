<!--
  SITE MOBILE NAV GROUP — satu grup yang bisa dibuka-tutup di menu mobile
  File: app/components/layout/site-mobile-nav-group.vue
-->
<script setup lang="ts">
import type { NavGroupEntry } from '~/constants/nav'

defineProps<{ group: NavGroupEntry; expanded: boolean }>()
defineEmits<{ toggle: []; navigate: [] }>()
const { isActive } = useSiteNav()
</script>

<template>
  <div>
    <button
      v-if="group.variant === 'cta'"
      class="flex items-center justify-between w-full px-5 py-3 text-sm font-bold rounded-full bg-red-500 text-slate-900 hover:bg-red-600 transition-all text-left shadow-md border border-red-600 my-2"
      @click="$emit('toggle')"
    >
      <span class="flex items-center gap-2">
        <NavIcon
          :name="group.icon"
          :stroke-width="group.iconStrokeWidth"
          class="w-4 h-4 text-slate-900"
        />
        {{ group.label }}
      </span>
      <NavIcon
        name="chevron-down"
        class="w-4 h-4 transition-transform duration-200"
        :class="expanded ? 'rotate-180' : ''"
      />
    </button>
    <button
      v-else
      :class="[
        'flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left',
        isActive(group) ? 'bg-slate-100 text-slate-900' : 'text-slate-900 hover:bg-slate-50',
      ]"
      @click="$emit('toggle')"
    >
      <span>{{ group.label }}</span>
      <NavIcon
        name="chevron-down"
        class="w-4 h-4 transition-transform duration-200"
        :class="expanded ? 'rotate-180' : ''"
      />
    </button>

    <div v-show="expanded" class="pl-6 mt-1 space-y-1 border-l border-slate-100 ml-4">
      <template v-for="(section, sIndex) in group.sections" :key="sIndex">
        <div
          v-if="section.heading"
          :class="[
            'px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider',
            { 'mt-2': sIndex > 0 },
          ]"
        >
          {{ section.heading }}
        </div>
        <NuxtLink
          v-for="(item, iIndex) in section.items"
          :key="item.to"
          :to="item.to"
          :class="[
            'block px-4 py-2 text-xs font-semibold text-slate-900 hover:text-slate-900 rounded-lg hover:bg-slate-50',
            {
              'ml-2': section.heading,
              'mb-2': section.heading && iIndex === section.items.length - 1,
            },
          ]"
          @click="$emit('navigate')"
        >
          {{ item.mobileLabel ?? item.label }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
