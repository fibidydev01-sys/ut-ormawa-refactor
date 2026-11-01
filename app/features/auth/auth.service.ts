// ============================================================
// AUTH SERVICE — semua cara masuk ke Firebase Auth
// File: app/features/auth/auth.service.ts
//
// Dipindah dari pages/login/admin.vue & mahasiswa.vue (S3):
// password, Google popup, magic link email, passkey (WebAuthn).
// Pesan error identik dengan versi lama.
// ============================================================

import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
} from 'firebase/auth'
import type { ActionCodeSettings, Auth, User, UserCredential } from 'firebase/auth'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

export function signInWithPassword(
  auth: Auth,
  email: string,
  password: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signInWithGoogle(auth: Auth): Promise<UserCredential> {
  return signInWithPopup(auth, new GoogleAuthProvider())
}

// ── Magic link email ────────────────────────────────────────

export function isEmailSignInLink(auth: Auth, href: string): boolean {
  return isSignInWithEmailLink(auth, href)
}

export function completeEmailLinkSignIn(
  auth: Auth,
  email: string,
  href: string,
): Promise<UserCredential> {
  return signInWithEmailLink(auth, email, href)
}

export function sendEmailSignInLink(
  auth: Auth,
  email: string,
  settings: ActionCodeSettings,
): Promise<void> {
  return sendSignInLinkToEmail(auth, email, settings)
}

/** Panggil `callback` setiap status login berubah (termasuk status awal). */
export function onUserChanged(auth: Auth, callback: (user: User | null) => void): void {
  auth.onAuthStateChanged(callback)
}

// ── Passkey (WebAuthn) ──────────────────────────────────────

/**
 * Login sidik jari: minta opsi ke server → prompt OS → verifikasi
 * di server → masuk dengan custom token. Mengembalikan kredensial
 * Firebase.
 */
export async function signInWithPasskey(auth: Auth): Promise<UserCredential> {
  const response = await fetch('/api/webauthn/generate-authentication', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error('Gagal menghubungi server keamanan.')
  const { options, sessionId } = await response.json()

  let assertion
  try {
    assertion = await startAuthentication(options)
  } catch (error) {
    if ((error as Error).name === 'NotAllowedError') {
      throw new Error('Proses dibatalkan atau sidik jari tidak cocok.', { cause: error })
    }
    throw error
  }

  const verificationResp = await fetch('/api/webauthn/verify-authentication', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, authenticationResponse: assertion }),
  })
  if (!verificationResp.ok) {
    const err = await verificationResp.json()
    throw new Error(err.message || 'Verifikasi sidik jari ditolak server.')
  }

  const verification = await verificationResp.json()
  if (verification.verified && verification.token) {
    return signInWithCustomToken(auth, verification.token)
  }
  throw new Error('Verifikasi gagal di tahap akhir.')
}

/** Daftarkan perangkat ini sebagai passkey untuk user yang sedang login. */
export async function registerPasskey(email: string, uid: string): Promise<void> {
  const response = await fetch('/api/webauthn/generate-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, uid }),
  })
  if (!response.ok) throw new Error('Gagal mendapatkan konfigurasi sidik jari dari server.')
  const options = await response.json()

  let attestation
  try {
    attestation = await startRegistration(options)
  } catch (error) {
    if ((error as Error).name === 'NotAllowedError') {
      throw new Error('Proses dibatalkan atau sensor sidik jari belum diatur.', { cause: error })
    }
    throw error
  }

  const verificationResp = await fetch('/api/webauthn/verify-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, registrationResponse: attestation }),
  })
  if (!verificationResp.ok) {
    const err = await verificationResp.json()
    throw new Error(err.message || 'Verifikasi server gagal.')
  }
  const verification = await verificationResp.json()
  if (!verification.verified) throw new Error('Server menolak pendaftaran.')
}
