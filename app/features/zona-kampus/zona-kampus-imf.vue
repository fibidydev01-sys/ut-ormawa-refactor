<!--
  ZONA KAMPUS IMF — daftar HIMA + form pendaftaran (mock, belum tersimpan)
  File: app/features/zona-kampus/zona-kampus-imf.vue
-->

<script setup lang="ts">
import { HIMA_LIST as himaList } from './zona-kampus.data'

import { ref } from 'vue'

const form = ref({
  nama: '',
  nim: '',
  wa: '',
  semester: '',
  hima: '',
  divisi1: '',
  linkBerkas: '',
  visimisi: '',
})

const submitRegistration = () => {
  // Mock submission
  console.log('Data pendaftaran IMF:', form.value)
  alert(
    `Pendaftaran berhasil dikirim! Berkas pendaftaran atas nama ${form.value.nama} untuk ${himaList.find((h) => h.id === form.value.hima)?.nama} akan segera diverifikasi oleh tim penyeleksi. Harap tunggu informasi selanjutnya melalui WhatsApp.`,
  )

  // Reset form
  form.value = {
    nama: '',
    nim: '',
    wa: '',
    semester: '',
    hima: '',
    divisi1: '',
    linkBerkas: '',
    visimisi: '',
  }
}
</script>

<template>
  <ZonaKampusImfHero />

  <!-- Main Content -->
  <div class="max-w-6xl mx-auto px-4 py-12">
    <div class="flex flex-col lg:flex-row-reverse gap-12">
      <!-- Formulir Pendaftaran -->
      <div class="lg:w-2/3">
        <div
          class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 relative overflow-hidden"
        >
          <!-- Decorative accent -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-600"
          ></div>

          <h3 class="text-2xl font-bold text-slate-800 mb-2">Formulir Pendaftaran Pengurus</h3>
          <p class="text-slate-500 mb-8 pb-6 border-b border-slate-100">
            Jadilah agen perubahan. Daftarkan dirimu sebagai calon pengurus periode mendatang.
          </p>

          <form class="space-y-6" @submit.prevent="submitRegistration">
            <!-- Data Pribadi -->
            <div class="space-y-6">
              <h4 class="font-bold text-slate-800 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs"
                  >1</span
                >
                Data Pribadi
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >Nama Lengkap</label
                  >
                  <input
                    v-model="form.nama"
                    type="text"
                    required
                    placeholder="Sesuai KTP/KTM"
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">NIM</label>
                  <input
                    v-model="form.nim"
                    type="text"
                    required
                    placeholder="Nomor Induk Mahasiswa"
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >No. WhatsApp</label
                  >
                  <input
                    v-model="form.wa"
                    type="tel"
                    required
                    placeholder="08xxxxxxxxx"
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm">Semester</label>
                  <select
                    v-model="form.semester"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  >
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
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs"
                  >2</span
                >
                Pilihan HIMA / IMF
              </h4>

              <div class="pl-8 space-y-6">
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >Himpunan yang dituju</label
                  >
                  <select
                    v-model="form.hima"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  >
                    <option value="" disabled>Pilih HIMA/IMF</option>
                    <option v-for="h in himaList" :key="h.id" :value="h.id">{{ h.nama }}</option>
                  </select>
                </div>

                <div v-if="form.hima">
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >Pilihan Divisi Utama (Prioritas 1)</label
                  >
                  <select
                    v-model="form.divisi1"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  >
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
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs"
                  >3</span
                >
                Berkas & Portofolio
              </h4>

              <div class="pl-8 space-y-6">
                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >Link GDrive (CV / Portofolio)</label
                  >
                  <input
                    v-model="form.linkBerkas"
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white"
                  />
                  <p class="text-xs text-slate-500 mt-1">
                    Pastikan link dapat diakses oleh publik (Viewer).
                  </p>
                </div>

                <div>
                  <label class="block text-slate-700 font-semibold mb-2 text-sm"
                    >Visi & Misi Anda jika terpilih</label
                  >
                  <textarea
                    v-model="form.visimisi"
                    required
                    rows="4"
                    placeholder="Tuliskan secara singkat visi dan misi Anda..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-slate-50 focus:bg-white resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="pt-8 pl-8">
              <button
                type="submit"
                class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-slate-900/20 text-lg"
              >
                Kirim Berkas Pendaftaran
              </button>
            </div>
          </form>
        </div>
      </div>

      <ZonaKampusImfInfo />
    </div>
  </div>
</template>
