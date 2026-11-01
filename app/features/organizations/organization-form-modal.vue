<!--
  ORGANIZATION FORM MODAL — tambah / edit organisasi (+ upload logo)
  File: app/features/organizations/organization-form-modal.vue
  Buka lewat ref: formModal.openCreate() / formModal.openEdit(org). Emit: created(org), updated(org).
  Catatan T17: closeModal() dipanggil saat isSubmitting masih true → modal tidak menutup sendiri (perilaku lama).
-->

<script setup lang="ts">
import type { OrganizationDocument } from '~/types/database'
const emit = defineEmits<{
  created: [org: OrganizationDocument]
  updated: [org: OrganizationDocument]
}>()

const {
  isUploading,
  isModalOpen,
  modalMode,
  isSubmitting,
  formError,
  form,
  logoPreviewUrl,
  onFileSelected,
  openCreateModal,
  openEditModal,
  closeModal,
  submitForm,
} = useOrganizationForm(emit)

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
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal" />

        <!-- Panel -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isModalOpen"
            class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 class="text-lg font-extrabold text-slate-800">
                {{ modalMode === 'create' ? 'Tambah Organisasi Baru' : 'Edit Organisasi' }}
              </h2>
              <button
                class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                @click="closeModal"
              >
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

            <!-- Modal Body: Form -->
            <form class="p-6 space-y-5" @submit.prevent="submitForm">
              <!-- Field: name -->
              <div>
                <label
                  for="org-name"
                  class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5"
                >
                  Nama Organisasi <span class="text-red-500">*</span>
                </label>
                <input
                  id="org-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Contoh: Himpunan Mahasiswa Teknik Informatika"
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <!-- Field: organization_type -->
              <div>
                <label
                  for="org-type"
                  class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5"
                >
                  Tipe Organisasi <span class="text-red-500">*</span>
                </label>
                <select
                  id="org-type"
                  v-model="form.organization_type"
                  required
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition appearance-none"
                >
                  <option value="" disabled>-- Pilih Tipe --</option>
                  <option value="HIMPUNAN_MAHASISWA">Himpunan Mahasiswa (HM)</option>
                  <option value="UNIT_KEGIATAN_MAHASISWA">Unit Kegiatan Mahasiswa (UKM)</option>
                  <option value="ORMAWA">ORMAWA (Organisasi Mahasiswa)</option>
                  <option value="ORGANISASI_LAIN">Organisasi Lain</option>
                </select>
              </div>

              <!-- Field: description -->
              <div>
                <label
                  for="org-desc"
                  class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5"
                >
                  Deskripsi <span class="font-medium text-slate-400 normal-case">(opsional)</span>
                </label>
                <textarea
                  id="org-desc"
                  v-model="form.description"
                  rows="3"
                  placeholder="Deskripsi singkat tentang organisasi ini..."
                  class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition resize-none"
                />
              </div>

              <!-- Field: logo_url -->
              <div>
                <label
                  for="org-logo"
                  class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5"
                >
                  Logo <span class="font-medium text-slate-400 normal-case">(opsional)</span>
                </label>
                <input
                  id="org-logo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
                  @change="onFileSelected"
                />
                <p class="mt-2 text-[11px] text-slate-400">
                  Bisa menggunakan gambar JPG, PNG, WebP, atau GIF sampai 20 MB.
                </p>
                <!-- Live Preview -->
                <div v-if="logoPreviewUrl || form.logo_url" class="mt-2 flex items-center gap-2">
                  <img
                    :src="logoPreviewUrl || form.logo_url"
                    alt="Preview logo"
                    class="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
                  />
                  <span class="text-xs text-slate-400">Preview logo</span>
                </div>
              </div>

              <!-- Form Error -->
              <div
                v-if="formError"
                class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium"
              >
                <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ formError }}
              </div>

              <!-- Modal Actions -->
              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  class="px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  @click="closeModal"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-sm transition-colors"
                >
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {{
                    isSubmitting
                      ? isUploading
                        ? 'Mengunggah...'
                        : 'Menyimpan...'
                      : modalMode === 'create'
                        ? 'Simpan'
                        : 'Perbarui'
                  }}
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
