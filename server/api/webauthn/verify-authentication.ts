import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { getAdminDb, getAdminAuth } from '../../utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { sessionId, authenticationResponse } = body

  if (!sessionId || !authenticationResponse) {
    throw createError({ statusCode: 400, message: 'Missing parameters' })
  }

  const rpID = 'localhost' // PENTING: Ganti dengan domain asli saat production
  const origin = `http://${rpID}:3000`

  const adminDb = getAdminDb()
  const adminAuth = getAdminAuth()
  if (!adminDb || !adminAuth) {
    throw createError({ statusCode: 500, message: 'Firebase Admin not initialized' })
  }

  // 1. Ambil challenge sementara
  const challengeDoc = await adminDb.collection('webauthn_auth_challenges').doc(sessionId).get()
  if (!challengeDoc.exists) {
    throw createError({ statusCode: 400, message: 'Challenge tidak ditemukan atau kedaluwarsa' })
  }
  const expectedChallenge = challengeDoc.data()!.challenge

  // 2. Tentukan siapa user ini berdasarkan userHandle (UID yang dikembalikan oleh sensor sidik jari)
  const userHandleBase64 = authenticationResponse.response.userHandle
  if (!userHandleBase64) {
    throw createError({ statusCode: 400, message: 'User Handle tidak ditemukan. Pastikan Anda mendaftarkan perangkat ini terlebih dahulu.' })
  }
  
  // userHandle dikembalikan dalam bentuk base64url dari buffer Uint8Array yang kita buat di pendaftaran
  const uid = Buffer.from(userHandleBase64, 'base64url').toString('utf8')

  // 3. Ambil kunci publik sidik jari dari Firestore
  const credentialID = authenticationResponse.id
  const passkeyDoc = await adminDb.collection('users').doc(uid).collection('passkeys').doc(credentialID).get()
  
  if (!passkeyDoc.exists) {
    throw createError({ statusCode: 400, message: 'Sidik jari ini belum terdaftar di akun manapun.' })
  }
  
  const passkeyData = passkeyDoc.data()!
  const credential = {
    publicKey: new Uint8Array(Buffer.from(passkeyData.credentialPublicKey, 'base64')),
    id: passkeyData.credentialID,
    counter: passkeyData.counter,
    transports: passkeyData.transports,
  }

  // 4. Lakukan verifikasi kriptografi tingkat militer
  let verification
  try {
    verification = await verifyAuthenticationResponse({
      response: authenticationResponse,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential,
    })
  } catch (error: any) {
    console.error('Authentication verification failed:', error)
    throw createError({ statusCode: 400, message: error.message })
  }

  if (verification.verified) {
    // 5. Update counter di database untuk mencegah serangan peretasan (replay attacks)
    await passkeyDoc.ref.update({
      counter: verification.authenticationInfo.newCounter
    })

    // 6. Buat TIKET VIP (Firebase Custom Token)
    // Inilah kuncinya: karena kita admin server, kita bisa membuat tiket masuk paksa untuk user ini
    const customToken = await adminAuth.createCustomToken(uid)

    // Bersihkan sampah challenge
    await adminDb.collection('webauthn_auth_challenges').doc(sessionId).delete()

    return { verified: true, token: customToken }
  }

  throw createError({ statusCode: 400, message: 'Verifikasi biometrik gagal' })
})
