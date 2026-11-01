<!--
  KONTAK PELAPORAN — form pelaporan/pengaduan (mode anonim / identitas), mock submit
  File: app/features/kontak/kontak-pelaporan.vue
-->

<script setup lang="ts">
import { PELAPORAN_KATEGORI as kategoriOptions } from './kontak.data'

import { ref } from 'vue'

// ==========================================
// FORM TYPES & STATE
// ==========================================
interface Form {
  nama: string
  kontak: string
  kategori: string
  tanggal: string
  lokasi: string
  pesan: string
}

const privacyMode = ref(false)
const form = ref<Form>({
  nama: '',
  kontak: '',
  kategori: 'pelanggaran',
  tanggal: '',
  lokasi: '',
  pesan: '',
})

const togglePrivacyMode = () => {
  privacyMode.value = !privacyMode.value
}

const submitForm = async () => {
  try {
    // Validasi form
    if (form.value.kontak.trim() === '' || form.value.pesan.trim() === '') {
      alert('Mohon isi semua field wajib (bertanda *)')
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
    console.log('Report data:', formData)
    alert(
      'Terima kasih. Laporan Anda telah berhasil dikirim dan akan segera diproses oleh pihak terkait.',
    )

    // Reset form
    form.value = {
      nama: '',
      kontak: '',
      kategori: 'pelanggaran',
      tanggal: '',
      lokasi: '',
      pesan: '',
    }
    privacyMode.value = false
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat mengirim laporan')
  }
}
</script>

<template>
  <KontakPelaporanHero />

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Formulir Pelaporan Section -->
    <section class="mb-16">
      <div class="bg-white rounded-xl shadow-lg border-t-4 border-red-500 p-8 md:p-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Formulir Pelaporan Terpadu</h2>
        <p class="text-gray-600 mb-8">
          Berikan informasi sejelas mungkin agar kami dapat menindaklanjuti laporan Anda dengan
          tepat.
        </p>

        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Privacy Mode Toggle -->
          <div class="bg-red-50 rounded-lg p-6 border border-red-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Mode Pelapor Anonim</h3>
                <p class="text-sm text-gray-600">Sembunyikan identitas Anda secara penuh?</p>
              </div>
              <button
                type="button"
                :class="[
                  'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                  privacyMode ? 'bg-red-500' : 'bg-gray-300',
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
              Nama Lengkap Pelapor <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
              required
            />
          </div>

          <!-- Contact Field -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Kontak yang Bisa Dihubungi (WA/Email) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.kontak"
              type="text"
              placeholder="Nomor WA atau email Anda"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
              required
            />
          </div>

          <!-- Category Selection -->
          <div>
            <label class="block text-gray-700 font-semibold mb-3">
              Jenis Laporan <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <button
                v-for="kategori in kategoriOptions"
                :key="kategori.value"
                type="button"
                :class="[
                  'p-3 rounded-lg font-semibold text-center transition border-2 flex flex-col items-center justify-center gap-2',
                  form.kategori === kategori.value
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-red-300',
                ]"
                @click="form.kategori = kategori.value"
              >
                <span class="text-2xl">{{ kategori.icon }}</span>
                <span class="text-sm">{{ kategori.label }}</span>
              </button>
            </div>
          </div>

          <!-- Tanggal & Lokasi Kejadian -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Tanggal Kejadian</label>
              <input
                v-model="form.tanggal"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Lokasi Kejadian</label>
              <input
                v-model="form.lokasi"
                type="text"
                placeholder="Misal: Kampus A, Grup WA, dll"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
          </div>

          <!-- Message Field -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Kronologi Laporan <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.pesan"
              placeholder="Ceritakan detail kejadian secara kronologis..."
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition resize-none"
              required
            />
          </div>

          <!-- Upload Bukti (Mock) -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Lampiran Bukti (Opsional)
            </label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer"
            >
              <div class="text-4xl mb-2">📁</div>
              <p class="text-gray-600 font-medium">Klik untuk mengunggah file bukti</p>
              <p class="text-gray-400 text-sm mt-1">Mendukung format JPG, PNG, PDF (Max 5MB)</p>
            </div>
          </div>

          <p class="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100">
            <strong>Pemberitahuan:</strong> Segala laporan palsu atau fitnah dapat dikenakan sanksi
            sesuai dengan peraturan organisasi yang berlaku.
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-md border border-slate-700"
          >
            KIRIM LAPORAN SEKARANG
          </button>
        </form>
      </div>
    </section>
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
