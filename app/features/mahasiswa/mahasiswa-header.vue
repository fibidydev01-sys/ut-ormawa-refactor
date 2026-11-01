<!--
  MAHASISWA HEADER — header area mahasiswa: logo, nama/foto profil, tombol keluar
  File: app/features/mahasiswa/mahasiswa-header.vue
  profileState = useState('mahasiswaProfile') → sama dengan yang diisi halaman edit profil.
-->

<script setup lang="ts">
import { signOutUser } from '~/services/firebase'

const profileState = useState('mahasiswaProfile', () => ({
  nama: 'Mahasiswa',
  foto: null as string | null,
}))

const logout = async () => {
  try {
    await signOutUser(useFirebase().auth)
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img
          src="/img/Favicon_bulat_transparan.png"
          alt="Logo"
          class="h-10 w-auto drop-shadow-sm"
        />
        <span class="font-bold text-admiral text-lg">Portal Mahasiswa</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-2">
          <div
            v-if="profileState.foto"
            class="w-8 h-8 rounded-full overflow-hidden border border-slate-200"
          >
            <img :src="profileState.foto" class="w-full h-full object-cover" />
          </div>
          <div
            v-else
            class="w-8 h-8 rounded-full bg-admiral text-white flex items-center justify-center font-bold text-xs"
          >
            {{ profileState.nama.charAt(0).toUpperCase() }}
          </div>
          <span class="text-sm font-medium text-slate-600">{{ profileState.nama }}</span>
        </div>
        <button
          class="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
          @click="logout"
        >
          Keluar
        </button>
      </div>
    </div>
  </header>
</template>
