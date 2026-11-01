<!--
  KONTAK ASPIRASI — form aspirasi (mode anonim / identitas), mock submit
  File: app/features/kontak/kontak-aspirasi.vue
-->

<script setup lang="ts">
import { ASPIRASI_KATEGORI as kategoriOptions } from './kontak.data'

import { ref } from 'vue'

// ==========================================
// FORM TYPES & STATE
// ==========================================
interface Form {
  nama: string
  kontak: string
  kategori: string
  pesan: string
}

const privacyMode = ref(false)
const form = ref<Form>({
  nama: '',
  kontak: '',
  kategori: 'aspirasi',
  pesan: '',
})

const togglePrivacyMode = () => {
  privacyMode.value = !privacyMode.value
}

const submitForm = async () => {
  try {
    // Validasi form
    if (form.value.kontak.trim() === '' || form.value.pesan.trim() === '') {
      alert('Mohon isi semua field yang diperlukan')
      return
    }

    if (!privacyMode.value && form.value.nama.trim() === '') {
      alert('Mohon isi nama Anda')
      return
    }

    // Siapkan data untuk dikirim
    const formData = {
      ...form.value,
      anonim: privacyMode.value,
      timestamp: new Date().toISOString(),
    }

    // TODO: Hubungkan dengan backend/email service
    console.log('Form data:', formData)
    alert('Terima kasih! Pesan Anda telah dikirim ke Divisi Humas.')

    // Reset form
    form.value = {
      nama: '',
      kontak: '',
      kategori: 'aspirasi',
      pesan: '',
    }
    privacyMode.value = false
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat mengirim pesan')
  }
}
</script>

<template>
  <KontakAspirasiHero />

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Formulir Aspirasi Section -->
    <section class="mb-16">
      <div class="bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Formulir Aspirasi Mahasiswa</h2>
        <p class="text-gray-600 mb-8">Kritik, saran, dan laporan Anda membantu kami berkembang.</p>

        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Privacy Mode Toggle -->
          <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Mode Privasi</h3>
                <p class="text-sm text-gray-600">Sembunyikan identitas Anda?</p>
              </div>
              <button
                type="button"
                :class="[
                  'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                  privacyMode ? 'bg-green-500' : 'bg-gray-300',
                ]"
                @click="togglePrivacyMode"
              >
                <span
                  :class="[
                    'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                    privacyMode ? 'translate-x-7' : 'translate-x-1',
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Name Field -->
          <div v-if="!privacyMode">
            <label class="block text-gray-700 font-semibold mb-2">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              required
            />
          </div>

          <!-- Contact Field -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Kontak (WA/Email) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.kontak"
              type="text"
              placeholder="Nomor WA atau email Anda"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              required
            />
          </div>

          <!-- Category Selection -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">
              Kategori Pesan <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="kategori in kategoriOptions"
                :key="kategori.value"
                type="button"
                :class="[
                  'p-3 rounded-lg font-semibold text-center transition border-2',
                  form.kategori === kategori.value
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300',
                ]"
                @click="form.kategori = kategori.value"
              >
                <span class="block text-xl mb-1">{{ kategori.icon }}</span>
                <span class="text-sm">{{ kategori.label }}</span>
              </button>
            </div>
          </div>

          <!-- Message Field -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Isi Pesan <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.pesan"
              placeholder="Tulis pesan Anda di sini..."
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
              required
            />
            <p class="text-xs text-gray-500 mt-2">
              Privasi Anda terjaga. Pesan akan langsung diterima oleh Divisi Humas.
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            KIRIM SEKARANG
          </button>
        </form>
      </div>
    </section>

    <KontakAspirasiContact />
  </div>
</template>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.3s ease;
}

input,
textarea {
  transition: all 0.3s ease;
}
</style>
