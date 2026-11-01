// ============================================================
// POST /api/create-user — buat akun Auth + dokumen users (SUPER_ADMIN)
// File: server/api/create-user.post.ts
//
// [S7] T8: wajib SUPER_ADMIN (requireSuperAdmin). T23: Admin SDK dari
// server/utils/firebaseAdmin (inisialisasi tunggal) — dulu file ini
// menginisialisasi sendiri dari runtimeConfig.firebaseAdminKey.
// Validasi input & bentuk respons tidak berubah.
// ============================================================

import { getAdminAuth, getAdminDb } from '~~/server/utils/firebaseAdmin'
import { requireSuperAdmin } from '~~/server/utils/requireRole'

export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event)
  const body = await readBody(event)

  const normalizedEmail = typeof body?.email === 'string' ? body.email.trim() : ''
  const normalizedPassword = typeof body?.password === 'string' ? body.password : ''
  const normalizedName = typeof body?.name === 'string' ? body.name.trim() : ''
  const normalizedRole =
    typeof body?.role === 'string' && ['SUPER_ADMIN', 'ADMIN'].includes(body.role)
      ? body.role
      : 'ADMIN'
  const normalizedOrganizationId =
    typeof body?.organization_id === 'string' && body.organization_id.trim()
      ? body.organization_id
      : null
  const accessModules = Array.isArray(body?.access_modules) ? body.access_modules : []

  if (!normalizedEmail || !normalizedPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Email and Password are required' })
  }

  try {
    // 1. Create user in Firebase Auth
    const userRecord = await getAdminAuth().createUser({
      email: normalizedEmail,
      password: normalizedPassword,
      displayName: normalizedName,
    })

    // 2. Set Custom Claims for security rules (optional but recommended)
    await getAdminAuth().setCustomUserClaims(userRecord.uid, { role: normalizedRole })

    // 3. Save user role to Firestore
    const db = getAdminDb()
    await db.collection('users').doc(userRecord.uid).set({
      id: userRecord.uid,
      email: normalizedEmail,
      full_name: normalizedName,
      role: normalizedRole,
      organization_id: normalizedOrganizationId,
      access_modules: accessModules,
      createdAt: new Date().toISOString(),
    })

    return { success: true, uid: userRecord.uid, message: 'User created successfully' }
  } catch (error) {
    console.error('Error creating new user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message || 'Failed to create user',
    })
  }
})
