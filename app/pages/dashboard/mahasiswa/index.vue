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

    <main class="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-admiral mt-2">Dashboard Mahasiswa</h1>
        <p class="text-slate-500 mt-2">Selamat datang! Kelola aktivitas dan partisipasi Anda di Ormawa UT Surabaya.</p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Left Column: User Info & Quick Actions -->
        <div class="md:col-span-1 space-y-6">
          <!-- Profile Card -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div v-if="profileState.foto" class="w-20 h-20 mx-auto rounded-full overflow-hidden border border-slate-200 mb-4 shadow-sm">
              <img :src="profileState.foto" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-20 h-20 mx-auto bg-admiral rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-sm">
              {{ profileState.nama.charAt(0).toUpperCase() }}
            </div>
            <h2 class="text-xl font-bold text-slate-800">{{ profileState.nama }}</h2>
            <p class="text-sm text-slate-500 mb-4">Mahasiswa Aktif</p>
            <NuxtLink to="/dashboard/mahasiswa/edit-profil" class="block w-full py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition text-center">
              Edit Profil
            </NuxtLink>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 class="text-lg font-bold text-slate-800 mb-4">Akses Cepat</h3>
            <div class="space-y-3">
              <button class="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition group">
                <span class="font-medium text-slate-700 group-hover:text-admiral">Daftar Kepanitiaan</span>
                <span class="text-lemon-dark">&rarr;</span>
              </button>
              <button class="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition group">
                <span class="font-medium text-slate-700 group-hover:text-admiral">Kirim Aspirasi</span>
                <span class="text-lemon-dark">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Main Content -->
        <div class="md:col-span-2 space-y-6">
          <!-- Status Banner -->
          <div class="bg-gradient-to-r from-admiral to-slate-800 p-6 rounded-2xl text-white shadow-md flex items-center justify-between">
            <div>
              <h3 class="font-bold text-lg text-lemon">Status Keanggotaan: Aktif</h3>
              <p class="text-sm text-slate-300 mt-1">Anda dapat mengikuti seluruh agenda Ormawa dan UKM.</p>
            </div>
          </div>

          <!-- Agenda Saya -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-slate-800">Agenda Tersimpan</h3>
              <button class="text-sm text-admiral font-semibold hover:underline">Lihat Semua</button>
            </div>
            
            <!-- Empty State -->
            <div class="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
              <div class="text-4xl mb-3">📅</div>
              <p class="text-slate-500 font-medium">Belum ada agenda yang Anda simpan atau ikuti.</p>
              <NuxtLink to="/beranda" class="mt-4 inline-block px-5 py-2 bg-lemon text-admiral font-bold rounded-lg hover:bg-lemon-dark transition">
                Cari Agenda
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Log Aktivitas -->
        <div class="md:col-span-3 mt-2">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 class="text-xl font-bold text-slate-800 mb-4">Aktivitas Terakhir Anda</h3>
            <div v-if="logs.length === 0" class="text-slate-500 text-sm">Belum ada aktivitas.</div>
            <ul v-else class="space-y-3">
              <li v-for="log in logs" :key="log.id" class="text-sm text-slate-600 border-b border-slate-50 pb-2">
                Anda <span class="font-bold text-admiral">{{ log.aksi }}</span> <span v-if="log.target">"{{ log.target }}"</span>
                <span class="text-xs text-slate-400 block mt-1">{{ formatTime(log.timestamp) }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto py-6 text-center text-slate-500 text-sm border-t border-slate-200 bg-white">
      &copy; 2026 Ormawa UT Surabaya. Hak cipta dilindungi.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const profileState = useState('mahasiswaProfile', () => ({
  nama: 'Mahasiswa',
  foto: null as string | null
}))

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

const logs = ref<any[]>([])

const formatTime = (isoString: string) => {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB'
}

onMounted(async () => {
  try {
    const { $auth, $db } = useNuxtApp()
    if (!$auth || !$db) return
    
    $auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const { collection, query, where, getDocs } = await import('firebase/firestore')
        const q = query(
          collection($db, 'activityLogs'),
          where('aktorUid', '==', user.uid)
        )
        const snap = await getDocs(q)
        const allLogs = snap.docs.map(d => ({ id: d.id, ...d.data() as any }))
        // sort by timestamp desc locally to avoid requiring compound index initially
        allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        logs.value = allLogs.slice(0, 5) // ambil 5 terbaru
      }
    })
  } catch (error) {
    console.error('Failed to load logs:', error)
  }
})
</script>
