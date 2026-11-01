<!--
  SITE MOBILE NAV — panel menu mobile (di bawah navbar)
  File: app/components/layout/site-mobile-nav.vue

  State buka/tutup tiap grup disimpan di sini dan TIDAK hilang saat
  panel ditutup lalu dibuka lagi — sama seperti Navbar.vue lama.
-->
<script setup lang="ts">
import { SITE_NAV } from '~/constants/nav'
import type { NavLinkEntry } from '~/constants/nav'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { isActive, scrollTopIfCurrent } = useSiteNav()

const expanded = ref<Record<string, boolean>>({})
const toggle = (key: string) => (expanded.value[key] = !expanded.value[key])

function onLinkClick(entry: NavLinkEntry) {
  emit('close')
  if (entry.scrollTopIfCurrent) scrollTopIfCurrent(entry.to)
}
</script>

<template>
  <div
    v-if="open"
    class="md:hidden border-t border-slate-100 bg-white shadow-inner transition-all py-2 max-h-[85vh] overflow-y-auto"
  >
    <div class="space-y-1 px-4">
      <template v-for="entry in SITE_NAV" :key="entry.label">
        <NuxtLink
          v-if="entry.type === 'link'"
          :to="entry.to"
          :class="[
            'flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all',
            isActive(entry) ? 'bg-slate-100 text-slate-900' : 'text-slate-900 hover:bg-slate-50',
          ]"
          @click="onLinkClick(entry)"
        >
          {{ entry.label }}
        </NuxtLink>
        <SiteMobileNavGroup
          v-else
          :group="entry"
          :expanded="!!expanded[entry.key]"
          @toggle="toggle(entry.key)"
          @navigate="emit('close')"
        />
      </template>
    </div>

    <div class="px-6 py-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
      <AuthAction variant="mobile" @navigate="emit('close')" />
    </div>
  </div>
</template>
