<template>
  <div>
    <h2 class="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
      <span class="text-3xl">🎯</span> Visi & Misi
    </h2>
    
    <div class="mt-8 space-y-8">
      <!-- VISI -->
      <div class="relative p-6 md:p-8 rounded-3xl bg-slate-900 text-white overflow-hidden shadow-md">
        <div class="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-48 h-48 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
        <span class="text-xs font-bold uppercase tracking-widest text-yellow-400">Visi Utama</span>
        <h3 class="text-3xl font-black mt-2">VISI</h3>
        <p class="mt-4 text-slate-300 text-base md:text-lg leading-relaxed font-medium">
          "Menjadikan Ormawa UT Surabaya sebagai akselerator perubahan yang kolaboratif, transparan, dan responsif, demi membentuk karakter mahasiswa yang tangguh, berdaya saing global, serta berjiwa pengabdian."
        </p>
      </div>

      <!-- MISI -->
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span class="text-blue-900 font-black">#</span> MISI KAMI
        </h3>
        
        <div class="space-y-3">
          <div v-for="(misi, idx) in misiList" :key="idx" class="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
            <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-900 font-extrabold flex items-center justify-center shrink-0">
              {{ idx + 1 }}
            </div>
            <div>
              <p class="text-slate-600 font-medium text-sm md:text-base leading-relaxed">{{ misi }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
        Terakhir diperbarui: Juni 2026
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const misiList = [
  'Membangun tata kelola organisasi yang solid, profesional, transparan, dan berbasis digital.',
  'Mengoptimalkan saluran penyerapan dan penyaluran aspirasi mahasiswa yang cepat dan solutif.',
  'Mendorong kontribusi aktif mahasiswa dalam kegiatan riset, akademik, dan inovasi nasional.',
  'Menumbuhkan kepedulian sosial mahasiswa melalui pengabdian masyarakat yang terarah dan berkelanjutan.',
  'Memperluas jaringan kemitraan dengan alumni, instansi luar, serta antar ormawa universitas lain.'
]

useSeoMeta({
  title: 'Visi & Misi',
  ogTitle: 'Visi & Misi - Ormawa UT Surabaya',
  description: 'Visi dan misi kepengurusan Organisasi Kemahasiswaan (Ormawa) Universitas Terbuka Surabaya untuk membentuk karakter mahasiswa yang tangguh, kolaboratif, dan berprestasi.',
  ogDescription: 'Visi dan misi kepengurusan Organisasi Kemahasiswaan (Ormawa) Universitas Terbuka Surabaya untuk membentuk karakter mahasiswa yang tangguh, kolaboratif, dan berprestasi.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})
</script>
