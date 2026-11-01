import { initializeApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User, Auth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

declare module '#app' {
  interface NuxtApp {
    $auth: Auth
    $db: Firestore
    $storage: FirebaseStorage
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth
    $db: Firestore
    $storage: FirebaseStorage
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  }

  // Initialize Firebase only once
  let app
  if (!getApps().length && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig)
  } else if (getApps().length) {
    app = getApps()[0]
  }

  if (!app) return // Skip if config is missing

  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  // Sediakan auth dan db untuk digunakan di komponen lain
  nuxtApp.provide('auth', auth)
  nuxtApp.provide('db', db)
  nuxtApp.provide('storage', storage)

  // State global untuk User dan Role
  const firebaseUser = useState<User | null>('firebaseUser', () => null)
  const userRole = useState<string | null>('userRole', () => null)
  const accessModules = useState<string[]>('accessModules', () => [])
  const isAuthReady = useState<boolean>('isAuthReady', () => false)

  // Listen ke status autentikasi
  onAuthStateChanged(auth, async (user) => {
    firebaseUser.value = user
    
    if (user) {
      // Ambil role dari Firestore
      try {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          userRole.value = data.role || 'mahasiswa'
          accessModules.value = Array.isArray(data.access_modules) ? data.access_modules : []
        } else {
          // Jika dokumen belum ada, asumsikan mahasiswa baru (akan di-handle pembuatannya nanti)
          userRole.value = 'mahasiswa'
          accessModules.value = []
        }
      } catch (error) {
        console.error("Error fetching user role:", error)
        userRole.value = 'mahasiswa'
        accessModules.value = []
      }
    } else {
      userRole.value = null
      accessModules.value = []
    }
    
    isAuthReady.value = true
  })
})
