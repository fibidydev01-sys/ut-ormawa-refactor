<!--
  NAV USER — nama, role, avatar inisial + dropdown (pengganti admin/HeaderProfile.vue)
  File: app/components/layout/nav-user.vue

  Catatan: tautan "Beranda Publik" memang mengarah ke /dashboard
  (perilaku lama, dipertahankan).
-->
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const profileOpen = ref(false)
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition"
      @click="profileOpen = !profileOpen"
    >
      <div class="text-right hidden sm:block">
        <div class="text-sm font-bold text-slate-800">{{ auth.displayName }}</div>
        <div class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
          {{ auth.roleLabel }}
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm"
      >
        {{ auth.initials }}
      </div>
    </button>

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
        @click="auth.logout()"
      >
        Logout
      </button>
    </div>
  </div>
</template>
