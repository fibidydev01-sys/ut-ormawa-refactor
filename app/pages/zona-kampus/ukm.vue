<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Open Recruitment
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Pendaftaran <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Anggota UKM</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Unit Kegiatan Mahasiswa (UKM) adalah tempat yang tepat untuk mengembangkan hobi, relasi, dan soft-skill. Pilih UKM yang sesuai dengan minatmu dan jadilah bagian dari keluarga besar kami!
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <!-- Formulir Pendaftaran -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Formulir Pendaftaran</h3>
            <p class="text-slate-500 mb-8 pb-6 border-b border-slate-100">Silakan lengkapi data diri Anda dengan benar.</p>
            
            <form @submit.prevent="submitRegistration" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nama -->
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">Nama Lengkap</label>
                  <input type="text" v-model="form.nama" required placeholder="Masukkan nama lengkap" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
                <!-- NIM -->
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">Nomor Induk Mahasiswa (NIM)</label>
                  <input type="text" v-model="form.nim" required placeholder="Masukkan NIM Anda" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Program Studi -->
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">Program Studi</label>
                  <select v-model="form.prodi" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white">
                    <option value="" disabled>Pilih Program Studi</option>
                    <option value="Manajemen">Manajemen</option>
                    <option value="Akuntansi">Akuntansi</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Ilmu Hukum">Ilmu Hukum</option>
                    <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                  </select>
                </div>
                <!-- Nomor WA -->
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">No. WhatsApp</label>
                  <input type="tel" v-model="form.wa" required placeholder="0812xxxxxx" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
              </div>

              <!-- Pilihan UKM -->
              <div>
                <label class="block text-slate-700 font-semibold mb-2 text-sm">Pilih UKM <span class="text-slate-400 font-normal">(Bisa pilih lebih dari 1)</span></label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label v-for="ukm in ukmList" :key="ukm.id" class="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-blue-50 transition-colors" :class="{'bg-blue-50 border-blue-300': form.ukmPilihan.includes(ukm.id)}">
                    <input type="checkbox" :value="ukm.id" v-model="form.ukmPilihan" class="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <span class="font-medium text-slate-700">{{ ukm.nama }}</span>
                  </label>
                </div>
              </div>

              <!-- Alasan Bergabung -->
              <div>
                <label class="block text-slate-700 font-semibold mb-2 text-sm">Alasan Bergabung</label>
                <textarea v-model="form.alasan" required rows="4" placeholder="Ceritakan motivasi Anda bergabung dengan UKM tersebut..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>

              <div class="pt-4">
                <button type="submit" class="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-900/20 text-lg flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Info UKM Sidebar -->
        <div class="lg:w-1/3">
          <div class="sticky top-24">
            <h3 class="text-xl font-bold text-slate-800 mb-6">Daftar UKM Tersedia</h3>
            <div class="space-y-4">
              <div v-for="ukm in ukmList" :key="ukm.id" class="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group cursor-default">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors">
                    {{ ukm.icon }}
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800">{{ ukm.nama }}</h4>
                    <p class="text-sm text-slate-500">{{ ukm.kategori }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 class="font-bold text-blue-800 mb-2">Butuh Bantuan?</h4>
              <p class="text-sm text-blue-700 mb-4">Jika ada pertanyaan seputar pendaftaran UKM, hubungi panitia rekrutmen kami.</p>
              <a href="#" class="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800">
                Hubungi via WhatsApp →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Pendaftaran UKM',
  ogTitle: 'Pendaftaran Unit Kegiatan Mahasiswa (UKM) - Ormawa UT Surabaya',
  description: 'Informasi dan pendaftaran keanggotaan Unit Kegiatan Mahasiswa (UKM) Universitas Terbuka Surabaya. Kembangkan minat dan bakatmu di kampus.',
  ogDescription: 'Informasi dan pendaftaran keanggotaan Unit Kegiatan Mahasiswa (UKM) Universitas Terbuka Surabaya. Kembangkan minat dan bakatmu di kampus.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const ukmList = [
  { id: 'olahraga', nama: 'UKM Olahraga', kategori: 'Futsal, Basket, Voli', icon: '⚽' },
  { id: 'seni', nama: 'UKM Seni & Budaya', kategori: 'Tari, Paduan Suara, Teater', icon: '🎭' },
  { id: 'jurnalistik', nama: 'LPM (Pers Mahasiswa)', kategori: 'Jurnalistik, Fotografi', icon: '📸' },
  { id: 'kerohanian', nama: 'UKM Kerohanian', kategori: 'Kajian, Sosial', icon: '🕌' },
  { id: 'mapala', nama: 'Mahasiswa Pecinta Alam', kategori: 'Ekspedisi, Konservasi', icon: '🏕️' },
  { id: 'penalaran', nama: 'UKM Penalaran & Riset', kategori: 'Debat, Karya Tulis', icon: '💡' }
]

const form = ref({
  nama: '',
  nim: '',
  prodi: '',
  wa: '',
  ukmPilihan: [] as string[],
  alasan: ''
})

const submitRegistration = () => {
  if (form.value.ukmPilihan.length === 0) {
    alert('Silakan pilih minimal 1 UKM yang ingin diikuti.')
    return
  }
  
  // Mock submission
  console.log('Data pendaftaran UKM:', form.value)
  alert(`Selamat! Pendaftaran Anda untuk bergabung di UKM telah kami terima. Panitia akan segera menghubungi Anda melalui nomor WA ${form.value.wa}.`)
  
  // Reset form
  form.value = {
    nama: '',
    nim: '',
    prodi: '',
    wa: '',
    ukmPilihan: [],
    alasan: ''
  }
}
</script>
