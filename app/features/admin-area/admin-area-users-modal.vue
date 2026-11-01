<!--
  ADMIN AREA USERS MODAL — tambah / edit pengguna skema lama (akun dibuat lewat Firebase app sekunder)
  File: app/features/admin-area/admin-area-users-modal.vue
-->

<script setup lang="ts">
import { injectAdminAreaUsers } from './use-admin-area-users'

const { isModalOpen, showModalPassword, isEditMode, newUser, createUser, closeModal } =
  injectAdminAreaUsers()
</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
  >
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
      <div
        class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"
      >
        <h3 class="text-lg font-bold text-slate-800">
          {{ isEditMode ? 'Edit Pengguna' : 'Tambah Akun Pengurus' }}
        </h3>
        <button class="text-slate-400 hover:text-slate-600" @click="isModalOpen = false">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <form class="p-6 space-y-4" @submit.prevent="createUser">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
          <input
            v-model="newUser.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
            placeholder="Contoh: Ketua IMF FEB"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email (Kode Pengguna)</label>
          <input
            v-model="newUser.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
            placeholder="imffeb@ormawautsby.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password Awal</label>
          <div class="relative">
            <input
              v-model="newUser.password"
              :type="showModalPassword ? 'text' : 'password'"
              required
              class="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
              placeholder="Ketik password di sini"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-admiral"
              @click="showModalPassword = !showModalPassword"
            >
              <svg
                v-if="!showModalPassword"
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
          <p class="text-xs text-slate-500 mt-1">
            Berikan password ini kepada pengurus untuk login pertama kali.
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Role & Akses</label>
          <select
            v-model="newUser.role"
            required
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-admiral focus:border-admiral sm:text-sm"
          >
            <option value="" disabled>Pilih Role...</option>
            <option value="admin">Admin (BPH Utama)</option>
            <option value="pengurus">Pengurus (Ketua IMF/UKM)</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </div>
        <div class="pt-4 flex gap-3">
          <button
            type="button"
            class="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            @click="closeModal"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-admiral text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            {{ isEditMode ? 'Simpan' : 'Buat Akun' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
