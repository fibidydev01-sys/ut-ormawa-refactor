<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <div class="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-red-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Regenerasi Kepengurusan
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Pendaftaran <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200">Pengurus HIMA / IMF</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Ikatan Mahasiswa Fakultas (IMF) atau Himpunan Mahasiswa Jurusan (HIMA) adalah wadah advokasi dan aspirasi program studi. Mari berkontribusi aktif memajukan jurusanmu!
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row-reverse gap-12">
        
        <!-- Formulir Pendaftaran -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 relative overflow-hidden">
            <!-- Decorative accent -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-600"></div>

            <h3 class="text-2xl font-bold text-slate-800 mb-2">Formulir Pendaftaran Pengurus</h3>
            <p class="text-slate-500 mb-8 pb-6 border-b border-slate-100">Jadilah agen perubahan. Daftarkan dirimu sebagai calon pengurus periode mendatang.</p>
            
            <form @submit.prevent="submitRegistration" class="space-y-6">
              <!-- Data Pribadi -->
              <div class="space-y-6">
                <h4 class="font-bold text-slate-800 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">1</span> 
                  Data Pribadi
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Nama Lengkap</label>
                    <input type="text" v-model="form.nama" required placeholder="Sesuai KTP/KTM" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">NIM</label>
                    <input type="text" v-model="form.nim" required placeholder="Nomor Induk Mahasiswa" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">No. WhatsApp</label>
                    <input type="tel" v-model="form.wa" required placeholder="08xxxxxxxxx" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Semester</label>
                    <select v-model="form.semester" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white">
                      <option value="" disabled>Pilih Semester</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Pilihan Organisasi -->
              <div class="space-y-6 pt-6 border-t border-slate-100">
                <h4 class="font-bold text-slate-800 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">2</span> 
                  Pilihan HIMA / IMF
                </h4>
                
                <div class="pl-8 space-y-6">
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Himpunan yang dituju</label>
                    <select v-model="form.hima" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white">
                      <option value="" disabled>Pilih HIMA/IMF</option>
                      <option v-for="h in himaList" :key="h.id" :value="h.id">{{ h.nama }}</option>
                    </select>
                  </div>

                  <div v-if="form.hima">
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Pilihan Divisi Utama (Prioritas 1)</label>
                    <select v-model="form.divisi1" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white">
                      <option value="" disabled>Pilih Divisi</option>
                      <option value="Humas">Divisi Hubungan Masyarakat</option>
                      <option value="Kaderisasi">Divisi Kaderisasi & PSDM</option>
                      <option value="Keilmuan">Divisi Keilmuan & Akademik</option>
                      <option value="MinatBakat">Divisi Minat & Bakat</option>
                      <option value="Kominfo">Divisi Kominfo / Media</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Berkas Pendukung -->
              <div class="space-y-6 pt-6 border-t border-slate-100">
                <h4 class="font-bold text-slate-800 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">3</span> 
                  Berkas & Portofolio
                </h4>
                
                <div class="pl-8 space-y-6">
                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Link GDrive (CV / Portofolio)</label>
                    <input type="url" v-model="form.linkBerkas" required placeholder="https://drive.google.com/..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white" />
                    <p class="text-xs text-slate-500 mt-1">Pastikan link dapat diakses oleh publik (Viewer).</p>
                  </div>

                  <div>
                    <label class="block text-slate-700 font-semibold mb-2 text-sm">Visi & Misi Anda jika terpilih</label>
                    <textarea v-model="form.visimisi" required rows="4" placeholder="Tuliskan secara singkat visi dan misi Anda..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div class="pt-8 pl-8">
                <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-slate-900/20 text-lg">
                  Kirim Berkas Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:w-1/3">
          <div class="sticky top-24 space-y-6">
            <!-- Timeline -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 class="text-lg font-bold text-slate-800 mb-6">Timeline Rekrutmen</h3>
              
              <div class="relative border-l border-slate-200 ml-3 space-y-6">
                <div class="relative">
                  <div class="absolute -left-[29px] bg-red-500 w-4 h-4 rounded-full border-4 border-white shadow-sm"></div>
                  <div class="pl-4">
                    <p class="text-sm font-bold text-slate-800">Pendaftaran Online</p>
                    <p class="text-xs text-slate-500 mt-1">1 - 15 Agustus 2026</p>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"></div>
                  <div class="pl-4">
                    <p class="text-sm font-bold text-slate-500">Seleksi Berkas</p>
                    <p class="text-xs text-slate-400 mt-1">16 - 18 Agustus 2026</p>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"></div>
                  <div class="pl-4">
                    <p class="text-sm font-bold text-slate-500">Wawancara (Fit & Proper Test)</p>
                    <p class="text-xs text-slate-400 mt-1">20 - 22 Agustus 2026</p>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[29px] bg-slate-300 w-4 h-4 rounded-full border-4 border-white"></div>
                  <div class="pl-4">
                    <p class="text-sm font-bold text-slate-500">Pengumuman Kelulusan</p>
                    <p class="text-xs text-slate-400 mt-1">25 Agustus 2026</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Syarat Umum -->
            <div class="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 class="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Syarat Umum
              </h3>
              <ul class="text-sm text-red-700 space-y-2 list-disc pl-4">
                <li>Mahasiswa aktif Universitas Terbuka Surabaya (Maksimal Semester 5).</li>
                <li>Memiliki dedikasi tinggi dan komitmen selama 1 periode kepengurusan.</li>
                <li>Mampu bekerja dalam tim maupun individu.</li>
                <li>Tidak sedang menjabat sebagai pengurus inti di organisasi kampus lain.</li>
              </ul>
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
  title: 'Pendaftaran IMF / HIMA',
  ogTitle: 'Pendaftaran IMF / HIMA - Ormawa UT Surabaya',
  description: 'Pendaftaran keanggotaan dan kepengurusan Ikatan Mahasiswa Fakultas (IMF) dan Himpunan Mahasiswa Program Studi di Universitas Terbuka Surabaya.',
  ogDescription: 'Pendaftaran keanggotaan dan kepengurusan Ikatan Mahasiswa Fakultas (IMF) dan Himpunan Mahasiswa Program Studi di Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

const himaList = [
  { id: 'hima-manajemen', nama: 'HIMA Manajemen' },
  { id: 'hima-akuntansi', nama: 'HIMA Akuntansi' },
  { id: 'hima-sistem-informasi', nama: 'HIMA Sistem Informasi' },
  { id: 'hima-ilmu-hukum', nama: 'HIMA Ilmu Hukum' },
  { id: 'hima-ilmu-komunikasi', nama: 'HIMA Ilmu Komunikasi' }
]

const form = ref({
  nama: '',
  nim: '',
  wa: '',
  semester: '',
  hima: '',
  divisi1: '',
  linkBerkas: '',
  visimisi: ''
})

const submitRegistration = () => {
  // Mock submission
  console.log('Data pendaftaran IMF:', form.value)
  alert(`Pendaftaran berhasil dikirim! Berkas pendaftaran atas nama ${form.value.nama} untuk ${himaList.find(h => h.id === form.value.hima)?.nama} akan segera diverifikasi oleh tim penyeleksi. Harap tunggu informasi selanjutnya melalui WhatsApp.`)
  
  // Reset form
  form.value = {
    nama: '',
    nim: '',
    wa: '',
    semester: '',
    hima: '',
    divisi1: '',
    linkBerkas: '',
    visimisi: ''
  }
}
</script>
