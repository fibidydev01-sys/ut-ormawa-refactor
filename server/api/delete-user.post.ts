// ============================================================
// POST /api/delete-user — hapus akun Auth + dokumen users (SUPER_ADMIN)
// File: server/api/delete-user.post.ts
//
// [S7] T8: wajib SUPER_ADMIN. T23: Admin SDK dari util bersama — dulu
// gagal 500 bila server belum pernah menjalankan create-user.
// ============================================================

import { getAdminAuth, getAdminDb } from '~~/server/utils/firebaseAdmin'
import { requireSuperAdmin } from '~~/server/utils/requireRole'

export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event)
  const body = await readBody(event)
  const { uid } = body

  if (!uid) {
    throw createError({ statusCode: 400, statusMessage: 'UID is required' })
  }

  try {
    // 1. Delete user from Firebase Auth
    await getAdminAuth().deleteUser(uid)

    // 2. Delete user document from Firestore
    const db = getAdminDb()
    await db.collection('users').doc(uid).delete()

    return { success: true, message: 'User deleted successfully' }
  } catch (error) {
    console.error('Error deleting user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message || 'Failed to delete user',
    })
  }
})
