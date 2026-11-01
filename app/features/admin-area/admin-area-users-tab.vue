<!--
  ADMIN AREA — tab Pengguna (tabel pengguna skema lama)
  File: app/features/admin-area/admin-area-users-tab.vue
-->

<script setup lang="ts">
import { injectAdminAreaHome } from './use-admin-area-home'

const { isModalOpen, users, togglePassword, openEditModal, deleteUser } = injectAdminAreaHome()
</script>

<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
    <div>
      <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
        Kelola Pengguna & Role
      </h1>
      <p class="text-slate-500 mt-1">Buat akun akses untuk Admin dan Pengurus Organisasi.</p>
    </div>
    <button
      class="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow flex items-center gap-2"
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

  <!-- Tabel Pengguna -->
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <table class="min-w-full divide-y divide-slate-100">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pengguna
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            Role
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            Organisasi
          </th>
          <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            Password
          </th>
          <th
            class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-100">
        <tr v-if="users.length === 0">
          <td colspan="5" class="px-6 py-12 text-center text-slate-400 text-sm">
            Belum ada data pengguna.
          </td>
        </tr>
        <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm"
              >
                {{ user.name.substring(0, 2).toUpperCase() }}
              </div>
              <div>
                <div class="text-sm font-semibold text-slate-900">{{ user.name }}</div>
                <div class="text-xs text-slate-500">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="
                user.role === 'Admin'
                  ? 'bg-purple-100 text-purple-800'
                  : user.role === 'Super_admin'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              "
            >
              {{ user.role }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            {{ user.organisasi }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            <div class="flex items-center gap-2">
              <span
                v-if="user.password === 'Login via Google'"
                class="inline-block bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-500 w-40 text-sm"
                >Login via Google</span
              >
              <span
                v-else
                class="inline-block font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-700 w-40 overflow-hidden text-ellipsis align-middle"
              >
                {{ user.showPassword ? user.password : '••••••••••••' }}
              </span>
              <button
                v-if="user.password !== 'Login via Google'"
                class="text-slate-400 hover:text-indigo-600 transition"
                @click="togglePassword(user)"
              >
                <svg
                  v-if="!user.showPassword"
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </button>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              class="text-indigo-600 hover:text-indigo-800 font-semibold mr-4 transition"
              @click="openEditModal(user)"
            >
              Edit
            </button>
            <button
              class="text-red-500 hover:text-red-700 font-semibold transition"
              @click="deleteUser(user)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
