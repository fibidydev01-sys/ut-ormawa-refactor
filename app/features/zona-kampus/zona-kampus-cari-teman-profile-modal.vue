<!--
  ZONA KAMPUS CARI TEMAN — modal "Buat Profil Jejaring" (mock, tersimpan di memori saja)
  File: app/features/zona-kampus/zona-kampus-cari-teman-profile-modal.vue

  Di-teleport ke #teleports (wadah Nuxt SETELAH #__nuxt): di halaman lama modal ini dirender SETELAH footer,
  jadi ia menumpuk di atas tombol melayang "Tanya Kami" (sama-sama z-50).
  Teleport menjaga urutan DOM itu. Karena tidak lagi di dalam <main>, kelas
  `font-sans text-slate-800` yang dulu diwarisi dari <main> dipasang di akar modal.
-->

<script setup lang="ts">
import type { MahasiswaProfile } from './zona-kampus.data'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: []; created: [profile: MahasiswaProfile] }>()

// Isi form tetap tersimpan saat modal ditutup-buka (komponen tidak di-unmount).
const formProfile = ref({
  nama: '',
  jurusan: '',
  semester: '',
  hobi: '',
  bio: '',
})

const selectedFileName = ref('')
const selectedFileUrl = ref('')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]!
    selectedFileName.value = file.name
    selectedFileUrl.value = URL.createObjectURL(file) // Buat URL lokal untuk preview gambar
  }
}

const submitProfile = () => {
  // Parse Hobi
  const hobiArray = formProfile.value.hobi
    .split(',')
    .map((h) => h.trim())
    .filter((h) => h !== '')

  // Create New Profile Object
  const newProfile = {
    id: Date.now(),
    nama: formProfile.value.nama,
    jurusan: formProfile.value.jurusan,
    semester: parseInt(formProfile.value.semester) || 1,
    isMaba: formProfile.value.semester === '1',
    bio: formProfile.value.bio,
    hobi: hobiArray.length > 0 ? hobiArray : ['Nongkrong'],
    // Gunakan foto asli jika diupload, jika tidak baru pakai default Unsplash
    avatar:
      selectedFileUrl.value ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  // Tambahkan ke posisi paling atas di grid
  emit('created', newProfile)

  alert(
    'Selamat! Profil Anda berhasil diterbitkan di jejaring mahasiswa. Teman-teman yang lain sekarang bisa melihat profil Anda!',
  )
  emit('close')

  // Reset form
  formProfile.value = {
    nama: '',
    jurusan: '',
    semester: '',
    hobi: '',
    bio: '',
  }
  selectedFileName.value = ''
  selectedFileUrl.value = ''
}
</script>

<template>
  <Teleport to="#teleports">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6 overflow-y-auto font-sans text-slate-800"
    >
      <div
        class="bg-white rounded-2xl w-full p-6 md:p-8 shadow-2xl relative animate-fadeIn border border-slate-100 m-auto"
        style="max-width: 480px"
      >
        <!-- Close Button -->
        <button
          class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-colors"
          @click="$emit('close')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div class="text-center mb-5">
          <div
            class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3"
          >
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">Buat Profil Jejaring</h3>
          <p class="text-xs text-slate-500 mt-1">Lengkapi data agar teman mudah menemukanmu!</p>
        </div>

        <form class="space-y-3" @submit.prevent="submitProfile">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
              >Foto Profil</label
            >
            <input
              id="fotoProfil"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
            <label
              for="fotoProfil"
              class="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all cursor-pointer overflow-hidden"
            >
              <span class="text-sm text-slate-500 truncate mr-2">{{
                selectedFileName || 'Belum ada file dipilih...'
              }}</span>
              <span
                class="shrink-0 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
                >Pilih Gambar</span
              >
            </label>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
              >Nama Panggilan</label
            >
            <input
              v-model="formProfile.nama"
              type="text"
              required
              placeholder="Contoh: Budi"
              class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label
                class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
                >Jurusan</label
              >
              <select
                v-model="formProfile.jurusan"
                required
                class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              >
                <option value="">Pilih Jurusan</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Ilmu Hukum">Ilmu Hukum</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
              </select>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
                >Semester</label
              >
              <select
                v-model="formProfile.semester"
                required
                class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              >
                <option value="">Pilih Semester</option>
                <option value="1">Semester 1 (Maba)</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
              >Hobi / Minat (Gunakan Koma)</label
            >
            <input
              v-model="formProfile.hobi"
              type="text"
              required
              placeholder="Contoh: Futsal, Coding, Musik"
              class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1"
              >Bio Singkat</label
            >
            <textarea
              v-model="formProfile.bio"
              required
              rows="2"
              placeholder="Sapa teman-temanmu..."
              class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 mt-2 text-base"
          >
            Terbitkan Profil
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
