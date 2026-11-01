import { generateRegistrationOptions } from '@simplewebauthn/server'
import { getAdminDb } from '../../utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, uid } = body

  if (!email || !uid) {
    throw createError({ statusCode: 400, message: 'Missing email or uid' })
  }

  const rpName = 'Ormawa UT Surabaya'
  const rpID = 'localhost' // PENTING: Ganti dengan domain asli saat production
  const origin = `http://${rpID}:3000`

  const adminDb = getAdminDb()
  if (!adminDb) {
    throw createError({ statusCode: 500, message: 'Firebase Admin not initialized' })
  }

  // Cek passkey yang sudah ada agar tidak duplikat
  const passkeysSnap = await adminDb.collection('users').doc(uid).collection('passkeys').get()
  
  const excludeCredentials = passkeysSnap.docs.map(doc => {
    const data = doc.data()
    return {
      id: new Uint8Array(Buffer.from(data.credentialID, 'base64url')),
      type: 'public-key' as const,
      transports: data.transports || ['internal'],
    }
  })

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: new Uint8Array(Buffer.from(uid, 'utf8')),
    userName: email,
    userDisplayName: email,
    attestationType: 'none',
    excludeCredentials,
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform', // Khusus sidik jari/face ID bawaan HP/Laptop
    },
  })

  // Simpan challenge ke Firestore untuk dicocokkan nanti
  await adminDb.collection('webauthn_challenges').doc(uid).set({
    challenge: options.challenge,
    createdAt: Date.now(),
  })

  return options
})
