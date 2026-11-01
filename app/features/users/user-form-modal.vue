<!--
  USER FORM MODAL — tambah (via /api/create-user) / edit pengguna skema baru
  File: app/features/users/user-form-modal.vue
  Buka lewat ref: formModal.openCreate() / formModal.openEdit(user).
  Saat dibuka memuat ulang organisasi (emit organizations-loaded); setelah simpan memuat
  ulang pengguna (emit users-refreshed) SEBELUM tombol kembali normal — urutan lama.
  Catatan T17: closeModal() dipanggil saat isSubmitting masih true → modal tidak menutup sendiri.
-->

<script setup lang="ts">
import type { OrganizationDocument, UserDocument } from '~/types/database'
import { ACCESS_MODULES } from '~/constants/access-modules'
const emit = defineEmits<{
  'organizations-loaded': [organizations: OrganizationDocument[]]
  'users-refreshed': [users: UserDocument[]]
}>()
defineProps<{ organizations: OrganizationDocument[] }>()

const {
  isModalOpen,
  modalMode,
  isSubmitting,
  formError,
  form,
  openCreateModal,
  openEditModal,
  closeModal,
  submitForm,
} = useUserForm(emit)

defineExpose({ openCreate: openCreateModal, openEdit: openEditModal })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal" />

        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 flex flex-col max-h-[90vh]"
        >
          <div class="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
            <h2 class="text-lg font-extrabold text-slate-800">
              {{ modalMode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna' }}
            </h2>
            <button class="p-2 text-slate-400 hover:bg-slate-100 rounded-lg" @click="closeModal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form class="p-6 space-y-5 overflow-y-auto admin-scroll" @submit.prevent="submitForm">
            <!-- Email (disabled saat edit) -->
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
                >Email <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.email"
                type="email"
                required
                :disabled="modalMode === 'edit'"
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm disabled:opacity-60 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- Password -->
            <div v-if="modalMode === 'create'">
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
                >Password <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- Full Name -->
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
                >Nama Lengkap <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.full_name"
                type="text"
                required
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- Role -->
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
                >Role <span class="text-red-500">*</span></label
              >
              <select
                v-model="form.role"
                required
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>-- Pilih Role --</option>
                <option value="SUPER_ADMIN">Super Admin (Akses Penuh)</option>
                <option value="ADMIN">Admin (Pengurus Organisasi)</option>
              </select>
            </div>

            <!-- Organisasi -->
            <div v-if="form.role === 'ADMIN'">
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
                >Organisasi <span class="text-red-500">*</span></label
              >
              <select
                v-model="form.organization_id"
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>-- Pilih Organisasi --</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">
                  {{ org.name }}
                </option>
              </select>
              <p v-if="organizations.length === 0" class="mt-2 text-[11px] text-amber-600">
                Belum ada organisasi yang bisa dipilih. Pastikan data organisasi sudah ada di
                Firestore.
              </p>
            </div>

            <!-- Hak Akses (Khusus Admin) -->
            <div v-if="form.role === 'ADMIN'">
              <label class="block text-xs font-bold text-slate-600 uppercase mb-3"
                >Hak Akses Modul</label
              >
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm"
              >
                <label
                  v-for="module in ACCESS_MODULES"
                  :key="module.value"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    v-model="form.access_modules"
                    type="checkbox"
                    :value="module.value"
                    class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />

                  <span>{{ module.label }}</span>
                </label>
              </div>
              <p class="mt-2 text-[11px] text-slate-500">
                Pilih menu-menu mana saja yang boleh dibuka oleh Admin ini di Admin Panel.
              </p>
            </div>

            <div
              v-if="formError"
              class="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-200"
            >
              {{ formError }}
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-bold bg-slate-100 rounded-xl"
                @click="closeModal"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl flex items-center gap-2"
              >
                <span v-if="isSubmitting">Menyimpan...</span>
                <span v-else>Simpan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
