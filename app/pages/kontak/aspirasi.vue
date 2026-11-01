<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <!-- 1. NAVIGATION BAR -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;">
      </div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <!-- Hero Text -->
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <img src="/img/Favicon.png" alt="Logo Ormawa" class="h-12 w-auto rounded-full shadow-lg" />
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Hubungi Kami
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Kontak & <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Aspirasi</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Suaramu Berharga. Sampaikan pendapat, ide, kritik, saran, atau laporan Anda langsung kepada kami. Kami mendengarkan dan akan merespons dengan cepat.
          </p>
        </div>
        
        <!-- Hero Graphic -->
        <div class="flex-1 w-full flex justify-center md:justify-end">
          <div class="relative w-full max-w-md aspect-square bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div class="flex gap-2 items-center border-b border-slate-700 pb-4">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <div class="ml-2 text-xs text-slate-400 font-mono">Contact & Feedback Form</div>
            </div>
            <!-- Mock UI Elements -->
            <div class="flex-1 flex gap-4 flex-col">
               <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse"></div>
               <div class="h-1/2 bg-slate-700/50 rounded-xl animate-pulse" style="animation-delay: 0.2s"></div>
               <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Formulir Aspirasi Section -->
      <section class="mb-16">
        <div class="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Formulir Aspirasi Mahasiswa</h2>
          <p class="text-gray-600 mb-8">Kritik, saran, dan laporan Anda membantu kami berkembang.</p>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Privacy Mode Toggle -->
            <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Mode Privasi</h3>
                  <p class="text-sm text-gray-600">Sembunyikan identitas Anda?</p>
                </div>
                <button
                  type="button"
                  @click="togglePrivacyMode"
                  :class="[
                    'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                    privacyMode ? 'bg-green-500' : 'bg-gray-300'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                      privacyMode ? 'translate-x-7' : 'translate-x-1'
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
                  @click="form.kategori = kategori.value"
                  :class="[
                    'p-3 rounded-lg font-semibold text-center transition border-2',
                    form.kategori === kategori.value
                      ? 'border-blue-500 bg-blue-100 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300'
                  ]"
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

      <!-- Contact & Social Media Section -->
      <section class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Hubungi Kami -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">HUBUNGI KAMI</h3>
          <div class="space-y-4">
            <a
              href="https://wa.me/628138907664"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <div class="text-2xl">💬</div>
              <div>
                <p class="font-semibold text-gray-800">Chat WhatsApp</p>
                <p class="text-green-600">+62 813-8907-664</p>
              </div>
            </a>
            <a
              href="mailto:ormawautsurabaya@gmail.com"
              class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <div class="text-2xl">✉️</div>
              <div>
                <p class="font-semibold text-gray-800">Email Resmi</p>
                <p class="text-blue-600">ormawautsurabaya@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Ikuti Kami -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">IKUTI KAMI</h3>
          <div class="flex flex-col gap-4">
            <a
              href="https://www.instagram.com/ormawa.utsurabaya/?hl=id"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:from-pink-100 hover:to-purple-100 transition"
            >
              <div class="text-2xl">📷</div>
              <div>
                <p class="font-semibold text-gray-800">Instagram</p>
                <p class="text-purple-600 text-sm">@ormawa.utsurabaya</p>
              </div>
            </a>
            <a
              href="https://ormawa-utsurabaya.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
            >
              <div class="text-2xl">🌐</div>
              <div>
                <p class="font-semibold text-gray-800">Website Resmi</p>
                <p class="text-indigo-600 text-sm">ormawa-utsurabaya.web.app</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-3">Ormawa UT Surabaya</h3>
        <p class="text-gray-600 text-lg mb-4">
          Wadah resmi aspirasi, kreasi, dan kolaborasi mahasiswa Universitas Terbuka Surabaya.
        </p>
        <p class="text-blue-600 font-semibold">Bersinergi membangun prestasi.</p>
      </section>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

useSeoMeta({
  title: 'Layanan Aspirasi Mahasiswa',
  ogTitle: 'Layanan Aspirasi & Suara Mahasiswa - Ormawa UT Surabaya',
  description: 'Suaramu Berharga. Sampaikan ide, masukan, kritik konstruktif, dan saran Anda secara aman dan transparan untuk kemajuan kampus.',
  ogDescription: 'Suaramu Berharga. Sampaikan ide, masukan, kritik konstruktif, dan saran Anda secara aman dan transparan untuk kemajuan kampus.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

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
  pesan: ''
})

const kategoriOptions = [
  { value: 'aspirasi', label: 'Aspirasi', icon: '📢' },
  { value: 'kritik-saran', label: 'Kritik Saran', icon: '💡' },
  { value: 'laporan', label: 'Laporan', icon: '⚠️' },
  { value: 'pertanyaan', label: 'Pertanyaan', icon: '❓' }
]

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
      timestamp: new Date().toISOString()
    }

    // TODO: Hubungkan dengan backend/email service
    console.log('Form data:', formData)
    alert('Terima kasih! Pesan Anda telah dikirim ke Divisi Humas.')

    // Reset form
    form.value = {
      nama: '',
      kontak: '',
      kategori: 'aspirasi',
      pesan: ''
    }
    privacyMode.value = false
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat mengirim pesan')
  }
}
</script>

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