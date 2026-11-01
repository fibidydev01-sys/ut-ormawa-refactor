<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div class="text-center">
        <img class="mx-auto h-16 w-auto" src="/img/Favicon.png" alt="Logo Ormawa" />
        <h2 class="mt-6 text-3xl font-extrabold text-admiral">
          Login Mahasiswa
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          Gunakan <span class="font-semibold text-admiral">Akun Google</span> Anda
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <button 
          @click="loginWithGoogle" 
          class="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admiral"
        >
          <!-- Google Icon -->
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Masuk dengan Google
        </button>

        <!-- Pesan Error -->
        <div v-if="errorMessage" class="rounded-md bg-red-50 p-4 border border-red-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Login Gagal</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <NuxtLink to="/beranda" class="text-sm font-medium text-slate-500 hover:text-admiral transition-colors">
            Kembali ke Beranda
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Login Mahasiswa',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const errorMessage = ref('')
const loginWithGoogle = async () => {
  errorMessage.value = ''
  try {
    const { $auth, $db } = useNuxtApp()
    // Import dynamically so it's client-side only
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
    const { doc, getDoc, setDoc } = await import('firebase/firestore')
    
    if (!$auth) {
      errorMessage.value = 'Firebase tidak dikonfigurasi. Periksa .env Anda.'
      return
    }

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($auth, provider)
    
    // Check if user document exists in Firestore
    const userDocRef = doc($db, 'users', result.user.uid)
    const userDocSnap = await getDoc(userDocRef)
    
    if (!userDocSnap.exists()) {
      // First time login, create basic Mahasiswa profile
      await setDoc(userDocRef, {
        uid: result.user.uid,
        email: result.user.email,
        nama: result.user.displayName || '',
        role: 'mahasiswa',
        createdAt: new Date().toISOString()
      })
    }
    
    // Redirect ke dashboard mahasiswa
    navigateTo('/dashboard/mahasiswa')
    
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Terjadi kesalahan saat login.'
  }
}
</script>
