// ============================================================
// useUpload — unggah gambar + state loading/error (eks useStorage)
// File: app/composables/use-upload.ts
//
// Urutan pemeriksaan & pesan error identik dengan versi lama.
// `uploadProgress` dipertahankan untuk kompatibilitas (tidak pernah
// diperbarui — sama seperti dulu).
// ============================================================

import { refreshIdToken, uploadFileToFolder, validateImageFile } from '~/services/storage'

export const useUpload = () => {
  const { storage, auth } = useFirebase()
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref<string | null>(null)

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    if (!storage) {
      throw new Error('Firebase Storage belum diinisialisasi.')
    }
    if (!auth || !auth.currentUser) {
      throw new Error('Anda harus login terlebih dahulu sebelum mengunggah gambar.')
    }

    try {
      await refreshIdToken(auth.currentUser)
    } catch (tokenError) {
      console.error('Gagal mengambil token Firebase Auth:', tokenError)
      throw new Error('Gagal mempersiapkan sesi login untuk upload gambar.', { cause: tokenError })
    }

    validateImageFile(file)

    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = null

    try {
      return await uploadFileToFolder(storage, file, folder)
    } catch (error) {
      console.error('Error uploading image:', error)
      const err = error as { code?: string; message?: string }
      if (err?.code === 'storage/unauthorized') {
        uploadError.value =
          'Upload ditolak oleh aturan Firebase Storage. Pastikan akun Anda login ke project yang sama dan memiliki izin yang valid.'
      } else {
        uploadError.value = err.message || 'Terjadi kesalahan saat mengunggah gambar.'
      }
      throw error
    } finally {
      isUploading.value = false
    }
  }

  return { uploadImage, isUploading, uploadProgress, uploadError }
}
