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
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-red-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Layanan Perlindungan
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Pusat <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200">Pelaporan</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Laporkan kendala, pelanggaran, atau kejadian yang tidak menyenangkan. Keamanan dan kerahasiaan identitas Anda adalah prioritas utama kami.
          </p>
        </div>
        
        <!-- Hero Graphic -->
        <div class="flex-1 w-full flex justify-center md:justify-end">
          <div class="relative w-full max-w-md aspect-square bg-slate-800 rounded-2xl border border-red-900/50 shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div class="flex gap-2 items-center border-b border-slate-700 pb-4">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <div class="ml-2 text-xs text-slate-400 font-mono">Secure Reporting Form</div>
            </div>
            <!-- Mock UI Elements -->
            <div class="flex-1 flex gap-4 flex-col">
               <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse border border-red-500/20"></div>
               <div class="h-1/2 bg-slate-700/50 rounded-xl animate-pulse border border-red-500/20" style="animation-delay: 0.2s"></div>
               <div class="h-1/4 bg-slate-700/50 rounded-xl animate-pulse border border-red-500/20" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Formulir Pelaporan Section -->
      <section class="mb-16">
        <div class="bg-white rounded-xl shadow-lg border-t-4 border-red-500 p-8 md:p-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Formulir Pelaporan Terpadu</h2>
          <p class="text-gray-600 mb-8">Berikan informasi sejelas mungkin agar kami dapat menindaklanjuti laporan Anda dengan tepat.</p>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Privacy Mode Toggle -->
            <div class="bg-red-50 rounded-lg p-6 border border-red-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Mode Pelapor Anonim</h3>
                  <p class="text-sm text-gray-600">Sembunyikan identitas Anda secara penuh?</p>
                </div>
                <button
                  type="button"
                  @click="togglePrivacyMode"
                  :class="[
                    'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                    privacyMode ? 'bg-red-500' : 'bg-gray-300'
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
                  @click="form.kategori = kategori.value"
                  :class="[
                    'p-3 rounded-lg font-semibold text-center transition border-2 flex flex-col items-center justify-center gap-2',
                    form.kategori === kategori.value
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-red-300'
                  ]"
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
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                <div class="text-4xl mb-2">📁</div>
                <p class="text-gray-600 font-medium">Klik untuk mengunggah file bukti</p>
                <p class="text-gray-400 text-sm mt-1">Mendukung format JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>

            <p class="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100">
              <strong>Pemberitahuan:</strong> Segala laporan palsu atau fitnah dapat dikenakan sanksi sesuai dengan peraturan organisasi yang berlaku.
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
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Pusat Pelaporan & Pengaduan',
  ogTitle: 'Pusat Pelaporan & Pengaduan - Ormawa UT Surabaya',
  description: 'Layanan pelaporan kendala, pelanggaran, atau kejadian penting di lingkungan kampus. Keamanan dan kerahasiaan identitas Anda terjamin.',
  ogDescription: 'Layanan pelaporan kendala, pelanggaran, atau kejadian penting di lingkungan kampus. Keamanan dan kerahasiaan identitas Anda terjamin.',
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
  pesan: ''
})

const kategoriOptions = [
  { value: 'pelanggaran', label: 'Pelanggaran Etika', icon: '🚨' },
  { value: 'fasilitas', label: 'Masalah Fasilitas', icon: '🏢' },
  { value: 'kegiatan', label: 'Kendala Kegiatan', icon: '📅' },
  { value: 'bullying', label: 'Perundungan/Bullying', icon: '🛑' },
  { value: 'lainnya', label: 'Lain-lain', icon: '📝' }
]

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
      timestamp: new Date().toISOString()
    }

    // TODO: Hubungkan dengan backend/email service
    console.log('Report data:', formData)
    alert('Terima kasih. Laporan Anda telah berhasil dikirim dan akan segera diproses oleh pihak terkait.')

    // Reset form
    form.value = {
      nama: '',
      kontak: '',
      kategori: 'pelanggaran',
      tanggal: '',
      lokasi: '',
      pesan: ''
    }
    privacyMode.value = false
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan saat mengirim laporan')
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
