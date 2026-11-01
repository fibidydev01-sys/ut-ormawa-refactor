import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { getAdminDb } from '../../utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { uid, registrationResponse } = body

  if (!uid || !registrationResponse) {
    throw createError({ statusCode: 400, message: 'Missing parameters' })
  }

  const rpID = 'localhost' // PENTING: Ganti dengan domain asli saat production
  const origin = `http://${rpID}:3000`

  const adminDb = getAdminDb()
  if (!adminDb) {
    throw createError({ statusCode: 500, message: 'Firebase Admin not initialized' })
  }

  // Ambil challenge yang sebelumnya disimpan
  const challengeDoc = await adminDb.collection('webauthn_challenges').doc(uid).get()
  if (!challengeDoc.exists) {
    throw createError({ statusCode: 400, message: 'Challenge tidak ditemukan atau kedaluwarsa' })
  }
  const expectedChallenge = challengeDoc.data()!.challenge

  let verification
  try {
    verification = await verifyRegistrationResponse({
      response: registrationResponse,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    })
  } catch (error: any) {
    console.error('Registration verification failed:', error)
    throw createError({ statusCode: 400, message: error.message })
  }

  if (verification.verified && verification.registrationInfo) {
    const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo
    const credentialIDString = credential.id // ID dalam bentuk string base64url yang aman untuk Firestore

    // Simpan credential sidik jari ke Firestore
    await adminDb.collection('users').doc(uid).collection('passkeys').doc(credentialIDString).set({
      credentialID: credentialIDString,
      credentialPublicKey: Buffer.from(credential.publicKey).toString('base64'),
      counter: credential.counter,
      credentialDeviceType,
      credentialBackedUp,
      transports: credential.transports || [],
      createdAt: Date.now(),
    })

    // Hapus challenge agar tidak bisa dipakai ulang
    await adminDb.collection('webauthn_challenges').doc(uid).delete()

    return { verified: true }
  }

  throw createError({ statusCode: 400, message: 'Verifikasi gagal' })
})
