// ============================================================
// STORAGE SERVICE — unggah gambar ke Firebase Storage
// File: app/services/storage.ts
//
// Dipindah dari composables/useStorage.ts (S3). State loading/
// error ada di composables/use-upload.ts.
// ============================================================

import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'
import type { User } from 'firebase/auth'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
const MAX_FILE_SIZE_IN_BYTES = 20 * 1024 * 1024

/** Paksa refresh ID token supaya rules Storage membaca sesi terbaru. */
export async function refreshIdToken(user: User): Promise<void> {
  await user.getIdToken(true)
}

/** Lempar Error berpesan ramah bila tipe/ukuran gambar tidak diizinkan. */
export function validateImageFile(file: File): void {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Format gambar tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.')
  }
  if (file.size > MAX_FILE_SIZE_IN_BYTES) {
    throw new Error('Ukuran gambar terlalu besar. Maksimal 20 MB untuk tetap aman dan wajar.')
  }
}

/** Unggah ke `{folder}/{timestamp}_{acak}.{ext}` dan kembalikan URL unduhan. */
export async function uploadFileToFolder(
  storage: FirebaseStorage,
  file: File,
  folder: string,
): Promise<string> {
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const timestamp = new Date().getTime()
  const uniqueFileName = `${timestamp}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`
  const fileRef = storageRef(storage, `${folder}/${uniqueFileName}`)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}
