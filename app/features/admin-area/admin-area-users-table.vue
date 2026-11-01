<!--
  ADMIN AREA USERS TABLE — tabel pengguna skema lama (nama, email, password, role, organisasi)
  File: app/features/admin-area/admin-area-users-table.vue
-->

<script setup lang="ts">
import { injectAdminAreaUsers } from './use-admin-area-users'

const { users, togglePassword, openEditModal, deleteUser } = injectAdminAreaUsers()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Pengguna
          </th>
          <th
            scope="col"
            class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Organisasi
          </th>
          <th
            scope="col"
            class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Password
          </th>
          <th
            scope="col"
            class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-slate-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div
                class="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-admiral font-bold"
              >
                {{ user.name.substring(0, 2).toUpperCase() }}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-slate-900">{{ user.name }}</div>
                <div class="text-sm text-slate-500">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="
                user.role === 'Admin'
                  ? 'bg-purple-100 text-purple-800'
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
              >
                Login via Google
              </span>
              <span
                v-else
                class="inline-block font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-700 w-40 overflow-hidden text-ellipsis align-middle"
              >
                {{ user.showPassword ? user.password : '••••••••••••' }}
              </span>
              <button
                v-if="user.password !== 'Login via Google'"
                class="text-slate-400 hover:text-admiral"
                title="Lihat/Sembunyikan Password"
                @click="togglePassword(user)"
              >
                <svg
                  v-if="!user.showPassword"
                  class="w-5 h-5"
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
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <button class="text-lemon-dark hover:text-admiral mr-3" @click="openEditModal(user)">
              Edit
            </button>
            <button class="text-red-600 hover:text-red-900" @click="deleteUser(user)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
