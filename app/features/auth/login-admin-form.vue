<!--
  LOGIN ADMIN FORM — login email + password dan sidik jari (passkey)
  File: app/features/auth/login-admin-form.vue
  Tujuan setelah login ditentukan dari role di dokumen users (lihat temuan T24).
-->

<script setup lang="ts">
import type { AppError } from '~/types/database'
import { ref } from 'vue'
import { signInWithPasskey, signInWithPassword } from '~/features/auth'
import { getUserRecord } from '~/features/users'

// Admin State
const email = ref('')

const password = ref('')

const showPassword = ref(false)

const errorMessage = ref('')

const isAdminLoading = ref(false)

// Action: Login Admin
const loginAdmin = async () => {
  errorMessage.value = ''
  isAdminLoading.value = true
  try {
    const { auth, db } = useFirebase()

    if (!auth) {
      errorMessage.value = 'Firebase tidak dikonfigurasi. Periksa .env Anda.'
      isAdminLoading.value = false
      return
    }

    const result = await signInWithPassword(auth, email.value, password.value)

    let role = 'mahasiswa'
    try {
      const userRecord = await getUserRecord(db!, result.user.uid)
      if (userRecord) {
        role = String(userRecord.data.role || 'mahasiswa')
          .trim()
          .toLowerCase()
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
  } catch (caught) {
    const error = caught as AppError
    console.error('Login error:', error)
    if (
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
    ) {
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
    const { auth, requireDb } = useFirebase()
    const result = await signInWithPasskey(auth!)

    // Cek role
    const userRecord = await getUserRecord(requireDb(), result.user.uid)
    let role = 'mahasiswa'
    if (userRecord) {
      role = (userRecord.data.role || '').trim()
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
  } catch (caught) {
    const error = caught as AppError
    console.error('Passkey Login Error:', error)
    errorMessage.value = error.message || 'Login sidik jari gagal.'
  } finally {
    isPasskeyLoading.value = false
  }
}
</script>

<template>
  <div class="animate-fadeIn space-y-4">
    <form class="space-y-4" @submit.prevent="loginAdmin">
      <div class="space-y-4">
        <div>
          <label
            for="email-address"
            class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >Email Resmi</label
          >
          <input
            id="email-address"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="appearance-none block w-full px-4 py-3.5 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all shadow-sm sm:text-sm"
            placeholder="admin@ormawautsby.com"
            @input="errorMessage = ''"
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >Kata Sandi</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="appearance-none block w-full pl-4 pr-12 py-3.5 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-900 rounded-xl hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-admiral focus:border-admiral transition-all shadow-sm sm:text-sm"
              placeholder="••••••••"
              @input="errorMessage = ''"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-admiral transition-colors"
              title="Lihat/Sembunyikan Password"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Pesan Error Admin -->
      <div
        v-if="errorMessage"
        class="rounded-xl bg-red-50 p-4 border border-red-200 animate-fadeIn"
      >
        <div class="flex items-start">
          <svg
            class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
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
        <span class="px-3 bg-white text-slate-400 font-semibold uppercase tracking-wider"
          >Atau</span
        >
      </div>
    </div>

    <!-- Tombol Biometrik -->
    <button
      type="button"
      :disabled="isPasskeyLoading"
      class="w-full flex items-center justify-center gap-2 py-3.5 px-4 border-2 border-indigo-100 text-sm font-bold rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed group"
      @click="loginWithPasskey"
    >
      <svg
        v-if="isPasskeyLoading"
        class="animate-spin h-5 w-5 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <svg
        v-else
        class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        ></path>
      </svg>
      <span v-if="isPasskeyLoading">Memindai...</span>
      <span v-else>Masuk dengan Sidik Jari</span>
    </button>
  </div>
</template>
