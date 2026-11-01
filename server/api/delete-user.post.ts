import { getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { uid } = body

  if (!uid) {
    throw createError({ statusCode: 400, statusMessage: 'UID is required' })
  }

  if (!getApps().length) {
    throw createError({ statusCode: 500, statusMessage: 'Firebase Admin not initialized. Check .env' })
  }

  try {
    // 1. Delete user from Firebase Auth
    await getAuth().deleteUser(uid)

    // 2. Delete user document from Firestore
    const db = getFirestore()
    await db.collection('users').doc(uid).delete()

    return { success: true, message: 'User deleted successfully' }
  } catch (error: any) {
    console.error('Error deleting user:', error)
    throw createError({ statusCode: 500, statusMessage: error.message || 'Failed to delete user' })
  }
})
