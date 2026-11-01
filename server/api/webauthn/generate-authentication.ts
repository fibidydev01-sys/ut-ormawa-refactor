import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { getAdminDb } from '../../utils/firebaseAdmin'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const rpID = 'localhost' // PENTING: Ganti dengan domain asli saat production

  const adminDb = getAdminDb()
  if (!adminDb) {
    throw createError({ statusCode: 500, message: 'Firebase Admin not initialized' })
  }

  // Karena kita ingin sidik jari bekerja otomatis tanpa harus mengetik email,
  // kita tidak mengirim allowCredentials. Browser akan mengingat siapa user-nya (Discoverable Credentials).
  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: 'preferred',
  })

  // Karena kita belum tahu siapa user yang mencoba login, 
  // kita simpan challenge ini menggunakan ID acak sementara (session)
  const sessionId = crypto.randomUUID()

  await adminDb.collection('webauthn_auth_challenges').doc(sessionId).set({
    challenge: options.challenge,
    createdAt: Date.now(),
  })

  return { options, sessionId }
})
