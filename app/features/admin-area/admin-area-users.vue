<!--
  ADMIN AREA USERS — kelola pengguna skema lama (hanya role 'super_admin', lihat temuan T25)
  File: app/features/admin-area/admin-area-users.vue
-->

<script setup lang="ts">
import { ADMIN_AREA_USERS } from './use-admin-area-users'

const state = useAdminAreaUsers()
provide(ADMIN_AREA_USERS, state)

const { isModalOpen } = state
</script>

<template>
  <div class="p-4 sm:p-8 w-full px-4 sm:px-6 lg:px-12">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <NuxtLink
          to="/dashboard/admin-area"
          class="text-sm font-medium text-slate-500 hover:text-admiral mb-2 flex items-center gap-1"
        >
          &larr; Kembali ke Admin Area
        </NuxtLink>
        <h1 class="text-3xl font-extrabold text-admiral mt-2">Kelola Pengguna & Role</h1>
        <p class="text-slate-500 mt-2">Buat akun akses untuk Admin dan Pengurus Organisasi.</p>
      </div>
      <button
        class="px-5 py-2.5 bg-admiral text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
        @click="isModalOpen = true"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Tambah Pengurus
      </button>
    </div>

    <!-- Tabel Daftar Pengguna -->
    <AdminAreaUsersTable />

    <!-- Modal Tambah Pengurus -->
    <AdminAreaUsersModal />
  </div>
</template>
