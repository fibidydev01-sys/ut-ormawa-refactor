<!--
  AUTH ACTION — tombol "Masuk" di navbar
  File: app/components/layout/auth-action.vue

  [S8] Di sini nanti tombol berubah jadi "Dashboard" saat user sudah
  login (GOLDEN-PLAN §6.4). Untuk sekarang perilakunya sama persis
  dengan tombol lama: selalu "Masuk" → /login/admin.
-->
<script setup lang="ts">
defineProps<{ variant: 'desktop' | 'mobile' }>()
defineEmits<{ navigate: [] }>()
</script>

<template>
  <NuxtLink
    v-if="variant === 'desktop'"
    to="/login/admin"
    class="px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-lemon hover:bg-lemon-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-lemon-dark ml-2"
  >
    <NavIcon name="login" stroke-width="2.5" class="w-3.5 h-3.5 text-slate-900" />
    Masuk
  </NuxtLink>
  <NuxtLink
    v-else
    to="/login/admin"
    class="flex justify-center items-center w-full py-3 px-4 rounded-xl bg-lemon text-sm font-bold text-slate-900 hover:bg-lemon-dark shadow border border-lemon-dark gap-2"
    @click="$emit('navigate')"
  >
    <NavIcon name="login" stroke-width="2.5" class="w-4 h-4 text-slate-900" />
    Masuk
  </NuxtLink>
</template>
