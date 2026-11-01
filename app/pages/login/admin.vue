<template>
  <div 
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative font-sans"
    style="background-image: url('/img/acarautsurabaya.png');"
  >
    <!-- Dark overlay for better readability -->
    <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>

    <div class="max-w-md w-full bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 relative z-10 transition-all duration-500">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg mb-4">
          <img class="h-12 w-auto" src="/img/Favicon_bulat_transparan.png" alt="Logo Ormawa" />
        </div>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">
          Portal Login
        </h2>
        <p class="mt-2 text-sm font-medium text-slate-500">
          Selamat datang kembali di sistem
        </p>
      </div>

      <!-- FORM ADMIN -->
      <div class="animate-fadeIn space-y-4">
        <form @submit.prevent="loginAdmin" class="space-y-4">
          <div class="space-y-4">
            <div>
              <label for="email-address" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Resmi</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                @input="errorMessage = ''"
                class="appearance-none block w-full px-4 py-3.5 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all shadow-sm sm:text-sm" 
                placeholder="admin@ormawautsby.com"
              />
            </div>
            <div>
              <label for="password" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kata Sandi</label>
              <div class="relative">
                <input 
                  id="password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="current-password" 
                  required 
                  v-model="password"
                  @input="errorMessage = ''"
                  class="appearance-none block w-full pl-4 pr-12 py-3.5 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all shadow-sm sm:text-sm" 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword" 
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-admiral transition-colors"
                  title="Lihat/Sembunyikan Password"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Pesan Error Admin -->
          <div v-if="errorMessage" class="rounded-xl bg-red-50 p-4 border border-red-200 animate-fadeIn">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-bold text-red-800">Login Gagal</h3>
                <p class="mt-1 text-xs text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isAdminLoading"
            class="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-admiral to-slate-800 hover:from-slate-800 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admiral transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="isAdminLoading">Memproses...</span>
            <span v-else>Masuk Admin</span>
          </button>
        </form>

        <div class="relative py-1">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="px-3 bg-white text-slate-400 font-semibold uppercase tracking-wider">Atau</span>
          </div>
        </div>

        <!-- Tombol Biometrik -->
        <button 
          type="button" 
          @click="loginWithPasskey"
          :disabled="isPasskeyLoading"
          class="w-full flex items-center justify-center gap-2 py-3.5 px-4 border-2 border-indigo-100 text-sm font-bold rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          <svg v-if="isPasskeyLoading" class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
          <span v-if="isPasskeyLoading">Memindai...</span>
          <span v-else>Masuk dengan Sidik Jari</span>
        </button>
      </div>

      <!-- ============================================== -->
      <!-- SECTION: MAHASISWA LOGIN -->
      <!-- ============================================== -->
      <div class="mt-6 pt-6 border-t-2 border-dashed border-slate-200 relative">
        <!-- Floating Badge -->
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md flex items-center gap-2">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7M5 9.42l7 3.88 7-3.88"></path></svg>
          Area Mahasiswa
        </div>

        <div class="animate-fadeIn space-y-5 pt-4">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3.5 border border-blue-100 shadow-sm relative overflow-hidden">
            <h4 class="text-xs font-extrabold text-blue-900 mb-1 flex items-center gap-1.5">
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200 text-blue-700 text-[10px]">✨</span>
              Magic Link Login
            </h4>
            <p class="text-[11px] text-blue-800/80 font-medium leading-tight">
              Masukkan email Anda untuk menerima tautan login otomatis. <strong>Aman & Tanpa Password!</strong>
            </p>
          </div>
        
        <form @submit.prevent="sendLoginLink" v-if="!linkSent && !isVerifying">
          <div class="relative flex items-center group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-admiral">
              <svg class="h-5 w-5 text-slate-400 group-focus-within:text-admiral transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <input 
              v-model="mhsEmail" 
              type="email" 
              required 
              class="appearance-none block w-full pl-12 pr-[100px] py-4 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral sm:text-sm transition-all duration-300 shadow-sm" 
              placeholder="nama@gmail.com" 
            />
            
            <button 
              type="submit" 
              :disabled="isLoadingMahasiswa"
              class="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center px-5 rounded-lg text-sm font-bold text-slate-900 bg-gradient-to-r from-[#FFD700] to-[#FACC15] hover:from-[#FACC15] hover:to-[#EAB308] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-admiral disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              <svg v-if="isLoadingMahasiswa" class="animate-spin h-4 w-4 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>Kirim Link</span>
            </button>
          </div>
        </form>

        <!-- Pesan Sukses Mhs -->
        <div v-if="linkSent" class="rounded-xl bg-green-50 p-5 border border-green-200 text-center animate-fadeIn shadow-inner">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-sm font-bold text-green-900 mb-1">Cek Inbox Email Anda!</h3>
          <p class="text-xs text-green-700 leading-relaxed mb-4">
            Tautan persetujuan telah dikirim ke <br><strong class="text-green-900">{{ mhsEmail }}</strong>
          </p>
          <button @click="linkSent = false" class="text-xs font-bold text-green-600 hover:text-green-800 underline decoration-2 underline-offset-2 transition-colors">
            Kirim Ulang / Ganti Email
          </button>
        </div>

        <!-- Pesan Verifikasi Mhs -->
        <div v-if="isVerifying" class="rounded-xl bg-blue-50 p-6 border border-blue-200 text-center animate-fadeIn">
          <svg class="animate-spin mx-auto h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h3 class="text-sm font-bold text-blue-900">Memverifikasi Sesi...</h3>
          <p class="text-xs text-blue-700 mt-1">Mohon tunggu sebentar.</p>
        </div>

        <!-- Pesan Error Mahasiswa -->
        <div v-if="errorMahasiswa" class="rounded-xl bg-red-50 p-4 border border-red-200 text-center animate-fadeIn">
          <p class="text-xs font-bold text-red-700">{{ errorMahasiswa }}</p>
        </div>
      </div>
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-8">
        <NuxtLink to="/beranda" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-admiral transition-colors group">
          <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { startAuthentication } from '@simplewebauthn/browser'

useHead({
  title: 'Login Portal',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})


// Tab State
const activeTab = ref('admin')

// Admin State
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const isAdminLoading = ref(false)

// Mahasiswa State
const mhsEmail = ref('')
const errorMahasiswa = ref('')
const isLoadingMahasiswa = ref(false)
const linkSent = ref(false)
const isVerifying = ref(false)

// Lifecycle
onMounted(async () => {
  const { $auth, $db } = useNuxtApp()
  if (!$auth) return

  try {
    const { isSignInWithEmailLink, signInWithEmailLink } = await import('firebase/auth')
    const { doc, getDoc, setDoc } = await import('firebase/firestore')

    // Mengecek apakah ada parameter persetujuan magic link dari inbox
    if (isSignInWithEmailLink($auth, window.location.href)) {
      isVerifying.value = true
      
      // Ambil email dari cache browser
      let savedEmail = window.localStorage.getItem('emailForSignIn')
      
      // Jika kosong (browser berbeda/incognito), coba ambil otomatis dari parameter URL
      if (!savedEmail) {
        const urlParams = new URLSearchParams(window.location.search)
        savedEmail = urlParams.get('userEmail')
      }

      if (!savedEmail) {
        savedEmail = window.prompt('Tautan terdeteksi. Silakan masukkan ulang email Anda untuk konfirmasi keamanan:')
      }

      if (savedEmail) {
        try {
          const result = await signInWithEmailLink($auth, savedEmail, window.location.href)
          window.localStorage.removeItem('emailForSignIn')

          // Periksa dokumen firestore
          const userDocRef = doc($db, 'users', result.user.uid)
          const userDocSnap = await getDoc(userDocRef)
          
          if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
              uid: result.user.uid,
              email: result.user.email,
              nama: result.user.email?.split('@')[0] || 'Mahasiswa',
              role: 'mahasiswa',
              createdAt: new Date().toISOString()
            })
          }
          
          navigateTo('/dashboard/mahasiswa')
        } catch (error: any) {
          console.error('Error saat verifikasi link:', error)
          errorMahasiswa.value = 'Tautan login tidak valid, sudah digunakan, atau telah kedaluwarsa.'
        }
      } else {
        errorMahasiswa.value = 'Email diperlukan untuk menyelesaikan proses login.'
      }
      isVerifying.value = false
    }
  } catch (err) {
    console.error('Firebase Error:', err)
  }
})

// Action: Login Admin
const loginAdmin = async () => {
  errorMessage.value = ''
  isAdminLoading.value = true
  try {
    const { $auth, $db } = useNuxtApp()
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    const { doc, getDoc } = await import('firebase/firestore')

    if (!$auth) {
      errorMessage.value = 'Firebase tidak dikonfigurasi. Periksa .env Anda.'
      isAdminLoading.value = false
      return
    }

    const result = await signInWithEmailAndPassword($auth, email.value, password.value)

    let role = 'mahasiswa'
    try {
      const userDocRef = doc($db, 'users', result.user.uid)
      const userDocSnap = await getDoc(userDocRef)
      if (userDocSnap.exists()) {
        role = String(userDocSnap.data().role || 'mahasiswa').trim().toLowerCase()
      }
    } catch (readError) {
      console.warn('Gagal membaca dokumen user saat login:', readError)
      role = 'mahasiswa'
    }

    const userRole = useState('userRole')
    const firebaseUser = useState('firebaseUser')
    userRole.value = role
    firebaseUser.value = result.user

    if (role === 'admin' || role === 'super_admin' || role === 'pengurus') {
      navigateTo('/dashboard')
    } else if (role === 'mahasiswa') {
      navigateTo('/dashboard/mahasiswa')
    } else {
      errorMessage.value = 'Akun Anda tidak memiliki akses yang valid.'
    }
  } catch (error: any) {
    console.error('Login error:', error)
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage.value = 'Email atau password salah.'
    } else {
      errorMessage.value = error.message || 'Terjadi kesalahan saat login.'
    }
  } finally {
    isAdminLoading.value = false
  }
}

// Action: Login Sidik Jari (WebAuthn)
const isPasskeyLoading = ref(false)
const loginWithPasskey = async () => {
  errorMessage.value = ''
  isPasskeyLoading.value = true
  
  try {
    const { $auth, $db } = useNuxtApp()
    const { signInWithCustomToken } = await import('firebase/auth')
    const { doc, getDoc } = await import('firebase/firestore')

    // 1. Dapatkan opsi authentication dari server
    const response = await fetch('/api/webauthn/generate-authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!response.ok) throw new Error('Gagal menghubungi server keamanan.')
    const { options, sessionId } = await response.json()

    // 2. Tampilkan prompt sidik jari bawaan OS (Biometric Sensor)
    let asseResp;
    try {
      asseResp = await startAuthentication(options)
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        throw new Error('Proses dibatalkan atau sidik jari tidak cocok.')
      }
      throw error
    }

    // 3. Verifikasi hasil pindaian ke server
    const verificationResp = await fetch('/api/webauthn/verify-authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        authenticationResponse: asseResp
      })
    })

    if (!verificationResp.ok) {
      const err = await verificationResp.json()
      throw new Error(err.message || 'Verifikasi sidik jari ditolak server.')
    }
    
    // 4. Server merilis tiket masuk (Custom Token)
    const verification = await verificationResp.json()
    if (verification.verified && verification.token) {
      // 5. Login ke Firebase menggunakan Custom Token
      const result = await signInWithCustomToken($auth, verification.token)

      // Cek role
      const userDocRef = doc($db, 'users', result.user.uid)
      const userDocSnap = await getDoc(userDocRef)
      let role = 'mahasiswa'
      if (userDocSnap.exists()) {
        role = (userDocSnap.data().role || '').trim()
      }

      const userRole = useState('userRole')
      const firebaseUser = useState('firebaseUser')
      userRole.value = role
      firebaseUser.value = result.user

      if (role === 'admin' || role === 'super_admin' || role === 'pengurus') {
        navigateTo('/dashboard')
      } else {
        navigateTo('/dashboard/mahasiswa')
      }

    } else {
      throw new Error('Verifikasi gagal di tahap akhir.')
    }

  } catch (error: any) {
    console.error('Passkey Login Error:', error)
    errorMessage.value = error.message || 'Login sidik jari gagal.'
  } finally {
    isPasskeyLoading.value = false
  }
}

// Action: Kirim Link Mahasiswa
const sendLoginLink = async () => {
  if (!mhsEmail.value) return
  
  isLoadingMahasiswa.value = true
  errorMahasiswa.value = ''
  
  try {
    const { $auth } = useNuxtApp()
    const { sendSignInLinkToEmail } = await import('firebase/auth')
    
    if (!$auth) throw new Error('Konfigurasi Firebase belum siap.')

    const actionCodeSettings = {
      // Menyisipkan parameter email ke dalam URL agar sistem tidak perlu bertanya lagi
      url: window.location.origin + window.location.pathname + '?userEmail=' + encodeURIComponent(mhsEmail.value),
      handleCodeInApp: true,
    }

    await sendSignInLinkToEmail($auth, mhsEmail.value, actionCodeSettings)
    
    window.localStorage.setItem('emailForSignIn', mhsEmail.value)
    linkSent.value = true
    
  } catch (error: any) {
    console.error('Error mengirim email link:', error)
    if (error.code === 'auth/unauthorized-continue-uri') {
       errorMahasiswa.value = 'Domain website belum diizinkan di Firebase Console.'
    } else {
       errorMahasiswa.value = error.message || 'Gagal mengirim tautan persetujuan.'
    }
  } finally {
    isLoadingMahasiswa.value = false
  }
}
</script>
