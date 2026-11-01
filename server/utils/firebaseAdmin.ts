import { applicationDefault, cert, initializeApp, getApps, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import fs from 'fs'
import path from 'path'

// Inisialisasi Firebase Admin secara LAZY (hanya saat dibutuhkan)
// untuk menghindari timeout `Cannot determine backend specification` 
// saat proses cold start di Firebase Functions.
function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApp()
  }

  try {
    // 1. Cek file lokal serviceAccountKey.json terlebih dahulu jika ada
    const keyPath = path.resolve(process.cwd(), 'serviceAccountKey.json')
    if (fs.existsSync(keyPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'))
      const app = initializeApp({
        credential: cert(serviceAccount)
      })
      console.log('Firebase Admin Initialized with local serviceAccountKey.json')
      return app
    }

    // 2. Cek FIREBASE_ADMIN_KEY dari environment variable
    if (process.env.FIREBASE_ADMIN_KEY) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY)
        if (serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')
        }
        const app = initializeApp({
          credential: cert(serviceAccount)
        })
        console.log('Firebase Admin Initialized with FIREBASE_ADMIN_KEY env')
        return app
      } catch (parseErr) {
        console.error('Failed to parse FIREBASE_ADMIN_KEY env:', parseErr)
      }
    }

    // 3. Di Firebase Functions / Cloud Run / Google Cloud
    if (process.env.NODE_ENV === 'production' || process.env.FIREBASE_CONFIG) {
      const app = initializeApp({
        credential: applicationDefault()
      })
      console.log('Firebase Admin Initialized with Application Default Credentials')
      return app
    }

    console.warn('WARNING: Tidak ada kredensial Firebase Admin yang valid!')
    return initializeApp()
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error)
    return initializeApp()
  }
}

// Ekspor fungsi getter untuk Auth dan Firestore milik Admin
export const getAdminAuth = () => getAuth(getFirebaseAdminApp())
export const getAdminDb = () => getFirestore(getFirebaseAdminApp())

