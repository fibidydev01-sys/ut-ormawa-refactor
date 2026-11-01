import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const normalizedEmail = typeof body?.email === 'string' ? body.email.trim() : ''
  const normalizedPassword = typeof body?.password === 'string' ? body.password : ''
  const normalizedName = typeof body?.name === 'string' ? body.name.trim() : ''
  const normalizedRole = typeof body?.role === 'string' && ['SUPER_ADMIN', 'ADMIN'].includes(body.role)
    ? body.role
    : 'ADMIN'
  const normalizedOrganizationId = typeof body?.organization_id === 'string' && body.organization_id.trim()
    ? body.organization_id
    : null
  const accessModules = Array.isArray(body?.access_modules) ? body.access_modules : []

  if (!normalizedEmail || !normalizedPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Email and Password are required' })
  }

  // Parse service account key
  let serviceAccount
  try {
    if (config.firebaseAdminKey) {
      serviceAccount = JSON.parse(config.firebaseAdminKey)
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')
      }
    }
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: 'Invalid Firebase Admin Key configuration' })
  }

  // Initialize Firebase Admin (only once)
  if (!getApps().length && serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount)
    })
  }

  if (!getApps().length) {
    throw createError({ statusCode: 500, statusMessage: 'Firebase Admin not initialized. Check .env' })
  }

  try {
    // 1. Create user in Firebase Auth
    const userRecord = await getAuth().createUser({
      email: normalizedEmail,
      password: normalizedPassword,
      displayName: normalizedName,
    })

    // 2. Set Custom Claims for security rules (optional but recommended)
    await getAuth().setCustomUserClaims(userRecord.uid, { role: normalizedRole })

    // 3. Save user role to Firestore
    const db = getFirestore()
    await db.collection('users').doc(userRecord.uid).set({
      id: userRecord.uid,
      email: normalizedEmail,
      full_name: normalizedName,
      role: normalizedRole,
      organization_id: normalizedOrganizationId,
      access_modules: accessModules,
      createdAt: new Date().toISOString()
    })

    return { success: true, uid: userRecord.uid, message: 'User created successfully' }
  } catch (error: any) {
    console.error('Error creating new user:', error)
    throw createError({ statusCode: 500, statusMessage: error.message || 'Failed to create user' })
  }
})
