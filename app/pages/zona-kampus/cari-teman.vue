<template>
  <main class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style="background-image: url('/img/Background ormawa.png'); background-size: cover; background-position: center;"></div>
      
      <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Live Connect
            </div>
            <div class="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Edisi Spesial Maba
            </div>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Perluas Relasi & <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Cari Teman Baru</span>
          </h2>
          <p class="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
            Kuliah nggak harus sendirian! Temukan teman diskusi, bentuk kelompok tugas, atau cari anggota tim untuk ikut perlombaan bergengsi di sini.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      
      <!-- Custom Tab Navigation -->
      <div class="flex justify-center mb-10">
        <div class="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          <button 
            @click="activeTab = 'jejaring'"
            :class="[
              'px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
              activeTab === 'jejaring' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Jejaring Mahasiswa
          </button>
          <button 
            @click="activeTab = 'papan'"
            :class="[
              'px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
              activeTab === 'papan' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            Papan Kolaborasi
          </button>
        </div>
      </div>

      <!-- TAB 1: Jejaring Mahasiswa -->
      <div v-show="activeTab === 'jejaring'" class="animate-fadeIn">
        
        <!-- Banner Partisipasi -->
        <div class="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-slate-900/20 relative overflow-hidden">
          <!-- Decorative accent -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
              Ingin Dikenal Lebih Banyak Teman? <span class="text-2xl">👋</span>
            </h3>
            <p class="text-slate-300 text-sm md:text-base max-w-2xl">Tambahkan profilmu ke dalam jejaring ini agar mudah ditemukan oleh teman diskusi, teman nongkrong, atau partner lomba yang satu frekuensi denganmu!</p>
          </div>
          <button @click="showProfileModal = true" class="relative z-10 shrink-0 w-full md:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-900/20 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Buat Profilmu
          </button>
        </div>

        <!-- Filter Area -->
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div class="relative w-full md:w-96">
            <input type="text" placeholder="Cari nama, jurusan, atau hobi..." class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all">
            <svg class="w-5 h-5 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <div class="flex gap-2">
            <select class="px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 bg-white focus:outline-none focus:border-blue-500">
              <option value="">Semua Angkatan</option>
              <option value="maba">Maba 2026</option>
              <option value="kating">Kakak Tingkat</option>
            </select>
          </div>
        </div>

        <!-- Profil Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="user in profilMahasiswa" :key="user.id" class="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
            <!-- Cover Photo Area -->
            <div class="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
              <div v-if="user.isMaba" class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                🌟 MABA
              </div>
            </div>
            
            <div class="px-6 pb-6 relative">
              <!-- Avatar -->
              <div class="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden -mt-10 mb-3 shadow-md">
                <img :src="user.avatar" :alt="user.nama" class="w-full h-full object-cover">
              </div>
              
              <h3 class="text-xl font-bold text-slate-800 leading-tight">{{ user.nama }}</h3>
              <p class="text-sm text-blue-600 font-semibold mb-3">{{ user.jurusan }} • Sem {{ user.semester }}</p>
              
              <p class="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[40px]">"{{ user.bio }}"</p>
              
              <!-- Hobbies Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="hobi in user.hobi" :key="hobi" class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200">
                  {{ hobi }}
                </span>
              </div>
              
              <!-- Actions -->
              <div class="flex gap-2">
                <button @click="showToast(`Mengirim sapaan ke ${user.nama}...`)" class="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl transition-colors text-sm">
                  Sapa (WA)
                </button>
                <button class="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: Papan Kolaborasi -->
      <div v-show="activeTab === 'papan'" class="animate-fadeIn">
        
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Buat Postingan Baru -->
          <div class="lg:w-1/3">
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <h3 class="text-lg font-bold text-slate-800 mb-4">Buat Pengumuman</h3>
              <form @submit.prevent="showToast('Pengumuman berhasil diposting!')" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Tujuan Pengumuman</label>
                  <select class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-sm">
                    <option>Teman Belajar (Study Buddy)</option>
                    <option>Tim Lomba</option>
                    <option>Proyek/Tugas Kelompok</option>
                    <option>Teman Nongkrong</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Pesan Anda</label>
                  <textarea rows="4" placeholder="Ketik apa yang sedang Anda cari..." class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20">
                  Posting Sekarang
                </button>
              </form>
            </div>
          </div>

          <!-- Feed Papan Kolaborasi -->
          <div class="lg:w-2/3 space-y-3">
            <div v-for="post in feedPapan" :key="post.id" class="bg-white rounded-xl p-4 md:p-5 border border-slate-200 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <img :src="post.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover border border-slate-200">
                  <div>
                    <h4 class="font-bold text-slate-800 text-sm">{{ post.nama }}</h4>
                    <p class="text-[10px] md:text-xs text-slate-500">{{ post.jurusan }} • {{ post.waktuLalu }}</p>
                  </div>
                </div>
                <div class="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 uppercase tracking-wider">
                  {{ post.kategori }}
                </div>
              </div>
              
              <p class="text-sm text-slate-700 leading-relaxed mb-4">{{ post.pesan }}</p>
              
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <div class="flex -space-x-2">
                  <!-- Mock interested users -->
                  <div class="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div class="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div class="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500">+2</div>
                </div>
                <button @click="showToast('Membuka chat WhatsApp...')" class="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Hubungi
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <Footer />

    <!-- Modal Tambah Profil -->
    <div v-if="showProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      <div class="bg-white rounded-2xl w-full p-6 md:p-8 shadow-2xl relative animate-fadeIn border border-slate-100 m-auto" style="max-width: 480px;">
        <!-- Close Button -->
        <button @click="showProfileModal = false" class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div class="text-center mb-5">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">Buat Profil Jejaring</h3>
          <p class="text-xs text-slate-500 mt-1">Lengkapi data agar teman mudah menemukanmu!</p>
        </div>
        
        <form @submit.prevent="submitProfile" class="space-y-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Foto Profil</label>
            <input type="file" id="fotoProfil" accept="image/*" class="hidden" @change="handleFileUpload">
            <label for="fotoProfil" class="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all cursor-pointer overflow-hidden">
              <span class="text-sm text-slate-500 truncate mr-2">{{ selectedFileName || 'Belum ada file dipilih...' }}</span>
              <span class="shrink-0 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Pilih Gambar</span>
            </label>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Panggilan</label>
            <input type="text" v-model="formProfile.nama" required placeholder="Contoh: Budi" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jurusan</label>
              <select v-model="formProfile.jurusan" required class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm">
                <option value="">Pilih Jurusan</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Ilmu Hukum">Ilmu Hukum</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Semester</label>
              <select v-model="formProfile.semester" required class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm">
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
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hobi / Minat (Gunakan Koma)</label>
            <input type="text" v-model="formProfile.hobi" required placeholder="Contoh: Futsal, Coding, Musik" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bio Singkat</label>
            <textarea v-model="formProfile.bio" required rows="2" placeholder="Sapa teman-temanmu..." class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 mt-2 text-base">
            Terbitkan Profil
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Cari Teman & Kolaborasi',
  ogTitle: 'Cari Teman & Kolaborasi Mahasiswa - Ormawa UT Surabaya',
  description: 'Temukan teman diskusi, bentuk kelompok belajar, atau cari partner tim perlombaan di jejaring mahasiswa Universitas Terbuka Surabaya.',
  ogDescription: 'Temukan teman diskusi, bentuk kelompok belajar, atau cari partner tim perlombaan di jejaring mahasiswa Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

// Tab State
const activeTab = ref('jejaring')

// Modal State & Form Data
const showProfileModal = ref(false)

const formProfile = ref({
  nama: '',
  jurusan: '',
  semester: '',
  hobi: '',
  bio: ''
})

const selectedFileName = ref('')
const selectedFileUrl = ref('')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    selectedFileName.value = file.name
    selectedFileUrl.value = URL.createObjectURL(file) // Buat URL lokal untuk preview gambar
  }
}

const submitProfile = () => {
  // Parse Hobi
  const hobiArray = formProfile.value.hobi.split(',').map(h => h.trim()).filter(h => h !== '')
  
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
    avatar: selectedFileUrl.value || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
  
  // Tambahkan ke posisi paling atas di grid
  profilMahasiswa.value.unshift(newProfile)

  alert('Selamat! Profil Anda berhasil diterbitkan di jejaring mahasiswa. Teman-teman yang lain sekarang bisa melihat profil Anda!')
  showProfileModal.value = false
  
  // Reset form
  formProfile.value = {
    nama: '',
    jurusan: '',
    semester: '',
    hobi: '',
    bio: ''
  }
  selectedFileName.value = ''
  selectedFileUrl.value = ''
}

// Mock Data: Jejaring Mahasiswa
const profilMahasiswa = ref([
  {
    id: 1,
    nama: 'Budi Santoso',
    jurusan: 'Sistem Informasi',
    semester: 1,
    isMaba: true,
    bio: 'Haloo! Maba baru di SI nih. Kalau ada tugas ngoding bareng boleh banget ajak-ajak ya!',
    hobi: ['💻 Coding', '🎮 Valorant', '☕ Kopi'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    nama: 'Siti Rahmawati',
    jurusan: 'Manajemen',
    semester: 1,
    isMaba: true,
    bio: 'Suka baca buku bisnis dan diskusi tentang marketing. Let\'s connect!',
    hobi: ['📚 Membaca', '💡 Bisnis', '📸 Fotografi'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    nama: 'Andi Pratama',
    jurusan: 'Ilmu Hukum',
    semester: 3,
    isMaba: false,
    bio: 'Ketua UKM Debat. Suka diskusi isu terkini. Feel free untuk tanya-tanya seputar kampus.',
    hobi: ['⚖️ Debat', '⚽ Futsal', '📰 Berita'],
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    nama: 'Rina Wijaya',
    jurusan: 'Akuntansi',
    semester: 1,
    isMaba: true,
    bio: 'Cari teman belajar Pengantar Akuntansi. Jujur masih sering bingung sama jurnal haha.',
    hobi: ['🎵 Musik', '🎬 Nonton Film', '🍲 Kuliner'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    nama: 'Kevin Anugrah',
    jurusan: 'Ilmu Komunikasi',
    semester: 5,
    isMaba: false,
    bio: 'Freelance Videographer. Open kolaborasi buat bikin konten atau film pendek.',
    hobi: ['🎥 Videografi', '✈️ Traveling', '🎸 Gitar'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 6,
    nama: 'Diana Putri',
    jurusan: 'Sistem Informasi',
    semester: 1,
    isMaba: true,
    bio: 'UI/UX Enthusiast! Pengen ikut lomba desain aplikasi, yang jago ngoding ayo bikin tim.',
    hobi: ['🎨 Desain', '📱 UI/UX', '🏸 Badminton'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

// Mock Data: Papan Kolaborasi
const feedPapan = [
  {
    id: 1,
    nama: 'Diana Putri',
    jurusan: 'Sistem Informasi',
    waktuLalu: '2 jam yang lalu',
    kategori: 'Tim Lomba',
    pesan: 'Halo teman-teman! Saya (UI/UX) lagi cari 2 orang Programmer (Frontend & Backend) untuk ikut lomba Gemastik bulan depan. Kalau ada yang minat dan serius pengen juara, DM ya! Nanti kita ngopi sambil bahas ide aplikasinya.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    nama: 'Rina Wijaya',
    jurusan: 'Akuntansi',
    waktuLalu: '5 jam yang lalu',
    kategori: 'Teman Belajar',
    pesan: 'Ada anak Maba Akuntansi yang domisili Surabaya Pusat/Barat? Mau bikin grup belajar bareng buat persiapan UTS Pengantar Akuntansi. Lebih enak belajar offline sih di cafe biar nyambung.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    nama: 'Andi Pratama',
    jurusan: 'Ilmu Hukum',
    waktuLalu: 'Kemarin',
    kategori: 'Proyek Kelompok',
    pesan: 'Butuh 1 orang lagi untuk kelompok tugas Hukum Tata Negara kelas B. Topik kita tentang Otonomi Daerah. Syaratnya: no free rider ya, harus mau bagi tugas dan diskusi aktif.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

// Mock Toast Function
const showToast = (message: string) => {
  alert(message)
}
</script>

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
