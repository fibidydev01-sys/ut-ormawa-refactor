<!--
  MAHASISWA PROFILE FORM — edit profil mahasiswa (lihat temuan T19)
  File: app/features/mahasiswa/mahasiswa-profile-form.vue
-->

<script setup lang="ts">
const { fileInput, previewImage, form, triggerFileInput, onFileChange, isFormValid, saveProfile } =
  useMahasiswaProfileForm()
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
    <MahasiswaHeader />

    <main class="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Link -->
      <NuxtLink
        to="/dashboard/mahasiswa"
        class="text-sm font-medium text-slate-500 hover:text-admiral mb-6 inline-flex items-center gap-1"
      >
        &larr; Kembali ke Dashboard
      </NuxtLink>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
          <h1 class="text-2xl font-extrabold text-admiral">Lengkapi Data Profil</h1>
          <p class="text-slate-500 mt-1 text-sm">
            Pastikan data yang Anda masukkan sesuai dengan data akademik Universitas Terbuka.
          </p>
        </div>

        <form class="p-6 sm:p-8 space-y-6" @submit.prevent="saveProfile">
          <!-- Foto Profil Upload -->
          <div class="flex flex-col items-center justify-center pb-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-800 mb-4">Foto Profil</h3>
            <div
              class="relative w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden group hover:border-admiral transition-colors cursor-pointer shadow-sm"
              title="Klik untuk ubah foto"
              @click="triggerFileInput"
            >
              <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
              <div v-else class="text-slate-400 flex flex-col items-center">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute inset-0 bg-slate-900/40 hidden group-hover:flex items-center justify-center text-white text-sm font-bold transition-opacity"
              >
                Ubah
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-3">
              Klik lingkaran di atas untuk memilih foto baru.
            </p>
            <input
              ref="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change="onFileChange"
            />
          </div>

          <!-- Formulir Data Diri -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
              <input
                v-model="form.nama"
                type="text"
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all"
                placeholder="Masukkan nama sesuai KTP/KTM"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2"
                >NIM (Nomor Induk Mahasiswa)</label
              >
              <input
                v-model="form.nim"
                type="text"
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all font-mono"
                placeholder="Contoh: 041234567"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Program Studi</label>
              <select
                v-model="form.prodi"
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all bg-white"
              >
                <option value="" disabled>Pilih Program Studi...</option>
                <option value="Manajemen">S1 Manajemen</option>
                <option value="Akuntansi">S1 Akuntansi</option>
                <option value="Ilmu Hukum">S1 Ilmu Hukum</option>
                <option value="Ilmu Komunikasi">S1 Ilmu Komunikasi</option>
                <option value="Sistem Informasi">S1 Sistem Informasi</option>
                <option value="PGSD">S1 PGSD</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Nomor HP / WhatsApp</label>
              <input
                v-model="form.nohp"
                type="tel"
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all"
                placeholder="Contoh: 081234567890"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Email Universitas</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all"
                placeholder="nim@ecampus.ut.ac.id"
              />
              <p class="text-[10px] text-slate-400 mt-1">
                Gunakan email resmi universitas (@ecampus.ut.ac.id).
              </p>
            </div>
          </div>

          <!-- Aksi -->
          <div class="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <NuxtLink
              to="/dashboard/mahasiswa"
              class="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Batal
            </NuxtLink>
            <button
              type="submit"
              :disabled="!isFormValid"
              :class="
                isFormValid ? 'bg-admiral hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'
              "
              class="px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </main>

    <MahasiswaFooter />
  </div>
</template>
