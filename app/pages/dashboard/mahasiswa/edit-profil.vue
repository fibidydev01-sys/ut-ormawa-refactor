<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
    <!-- Custom Header for Mahasiswa Dashboard -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/img/Favicon_bulat_transparan.png" alt="Logo" class="h-10 w-auto drop-shadow-sm" />
          <span class="font-bold text-admiral text-lg">Portal Mahasiswa</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2">
            <div v-if="profileState.foto" class="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img :src="profileState.foto" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-8 h-8 rounded-full bg-admiral text-white flex items-center justify-center font-bold text-xs">
              {{ profileState.nama.charAt(0).toUpperCase() }}
            </div>
            <span class="text-sm font-medium text-slate-600">{{ profileState.nama }}</span>
          </div>
          <button @click="logout" class="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors">
            Keluar
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Link -->
      <NuxtLink to="/dashboard/mahasiswa" class="text-sm font-medium text-slate-500 hover:text-admiral mb-6 inline-flex items-center gap-1">
        &larr; Kembali ke Dashboard
      </NuxtLink>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
          <h1 class="text-2xl font-extrabold text-admiral">Lengkapi Data Profil</h1>
          <p class="text-slate-500 mt-1 text-sm">Pastikan data yang Anda masukkan sesuai dengan data akademik Universitas Terbuka.</p>
        </div>

        <form @submit.prevent="saveProfile" class="p-6 sm:p-8 space-y-6">
          
          <!-- Foto Profil Upload -->
          <div class="flex flex-col items-center justify-center pb-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-800 mb-4">Foto Profil</h3>
            <div class="relative w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden group hover:border-admiral transition-colors cursor-pointer shadow-sm" @click="triggerFileInput" title="Klik untuk ubah foto">
              <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
              <div v-else class="text-slate-400 flex flex-col items-center">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div class="absolute inset-0 bg-slate-900/40 hidden group-hover:flex items-center justify-center text-white text-sm font-bold transition-opacity">
                Ubah
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-3">Klik lingkaran di atas untuk memilih foto baru.</p>
            <input type="file" ref="fileInput" @change="onFileChange" accept="image/png, image/jpeg" class="hidden" />
          </div>

          <!-- Formulir Data Diri -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
              <input v-model="form.nama" type="text" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all" placeholder="Masukkan nama sesuai KTP/KTM" />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">NIM (Nomor Induk Mahasiswa)</label>
              <input v-model="form.nim" type="text" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all font-mono" placeholder="Contoh: 041234567" />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Program Studi</label>
              <select v-model="form.prodi" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all bg-white">
                <option value="" disabled>Pilih Program Studi...</option>
                <option value="Manajemen">S1 Manajemen</option>
                <option value="Akuntansi">S1 Akuntansi</option>
                <option value="Ilmu Hukum">S1 Ilmu Hukum</option>
                <option value="Ilmu Komunikasi">S1 Ilmu Komunikasi</option>
                <option value="Sistem Informasi">S1 Sistem Informasi</option>
                <option value="PGSD">S1 PGSD</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Nomor HP / WhatsApp</label>
              <input v-model="form.nohp" type="tel" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all" placeholder="Contoh: 081234567890" />
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Email Universitas</label>
              <input v-model="form.email" type="email" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all" placeholder="nim@ecampus.ut.ac.id" />
              <p class="text-[10px] text-slate-400 mt-1">Gunakan email resmi universitas (@ecampus.ut.ac.id).</p>
            </div>
          </div>

          <!-- Aksi -->
          <div class="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <NuxtLink to="/dashboard/mahasiswa" class="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
              Batal
            </NuxtLink>
            <button type="submit" :disabled="!isFormValid" :class="isFormValid ? 'bg-admiral hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'" class="px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-md">
              Simpan Data
            </button>
          </div>

        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto py-6 text-center text-slate-500 text-sm border-t border-slate-200 bg-white">
      &copy; 2026 Ormawa UT Surabaya. Hak cipta dilindungi.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const { logActivity } = useActivityLog()

const profileState = useState('mahasiswaProfile', () => ({
  nama: 'Mahasiswa',
  foto: null as string | null
}))

const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)

const form = ref({
  nama: '',
  nim: '',
  prodi: '',
  nohp: '',
  email: ''
})

const currentUserUid = ref<string | null>(null)

// Mengambil data saat komponen dimuat
onMounted(async () => {
  try {
    const { $auth, $db } = useNuxtApp()
    if (!$auth || !$db) return

    $auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        currentUserUid.value = user.uid
        
        // Ambil data dari Firestore
        const { doc, getDoc } = await import('firebase/firestore')
        const userDocRef = doc($db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)
        
        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          form.value.nama = data.nama || user.displayName || ''
          form.value.nim = data.nim || ''
          form.value.prodi = data.prodi || ''
          form.value.nohp = data.nohp || ''
          form.value.email = data.email || user.email || ''
          
          if (data.foto) {
            previewImage.value = data.foto
          }
          
          profileState.value.nama = form.value.nama || 'Mahasiswa'
          profileState.value.foto = previewImage.value
        } else {
          // Fallback
          form.value.email = user.email || ''
          form.value.nama = user.displayName || ''
        }
      }
    })
  } catch (error) {
    console.error('Gagal mengambil data profil:', error)
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 400
        const MAX_HEIGHT = 400
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        
        // Kompresi ke format JPEG agar ukurannya sangat kecil (mencegah error payload limit Firestore)
        previewImage.value = canvas.toDataURL('image/jpeg', 0.7)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const isFormValid = computed(() => {
  return form.value.nama.trim() !== '' &&
         form.value.nim.trim() !== '' &&
         form.value.prodi.trim() !== '' &&
         form.value.nohp.trim() !== '' &&
         form.value.email.trim() !== '' &&
         previewImage.value !== null
})

const saveProfile = async () => {
  if (!isFormValid.value || !currentUserUid.value) return
  
  try {
    const { $db } = useNuxtApp()
    if (!$db) return

    const { doc, setDoc } = await import('firebase/firestore')
    const userDocRef = doc($db, 'users', currentUserUid.value)
    
    // Simpan ke Firestore
    await setDoc(userDocRef, {
      nama: form.value.nama,
      nim: form.value.nim,
      prodi: form.value.prodi,
      nohp: form.value.nohp,
      email: form.value.email,
      foto: previewImage.value,
      role: 'mahasiswa',
      updatedAt: new Date().toISOString()
    }, { merge: true })
    
    // Update state global
    profileState.value.nama = form.value.nama
    profileState.value.foto = previewImage.value
    
    await logActivity(form.value.nama, currentUserUid.value, 'memperbarui profil mahasiswa')
    
    navigateTo('/dashboard/mahasiswa')
  } catch (error) {
    console.error('Gagal menyimpan profil:', error)
    alert('Terjadi kesalahan saat menyimpan data.')
  }
}

const logout = async () => {
  try {
    const { $auth } = useNuxtApp()
    if ($auth) {
      const { signOut } = await import('firebase/auth')
      await signOut($auth)
    }
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
