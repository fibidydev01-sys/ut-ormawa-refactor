import { ref } from 'vue'

export const useStorage = () => {
  const { $storage, $auth } = useNuxtApp()
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref<string | null>(null)

  /**
   * Mengunggah file ke Firebase Storage dan mengembalikan URL download.
   *
   * @param file - File yang akan diunggah
   * @param folder - Nama folder tujuan (misal: 'organizations' atau 'articles')
   * @returns URL publik dari file yang berhasil diunggah
   */
  const uploadImage = async (file: File, folder: string): Promise<string> => {
    if (!$storage) {
      throw new Error('Firebase Storage belum diinisialisasi.')
    }

    if (!$auth || !$auth.currentUser) {
      throw new Error('Anda harus login terlebih dahulu sebelum mengunggah gambar.')
    }

    const { ref: storageRef, uploadBytes, getDownloadURL } = await import('firebase/storage')

    try {
      await $auth.currentUser.getIdToken(true)
    } catch (tokenError) {
      console.error('Gagal mengambil token Firebase Auth:', tokenError)
      throw new Error('Gagal mempersiapkan sesi login untuk upload gambar.')
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
    const maxFileSizeInBytes = 20 * 1024 * 1024

    if (!allowedMimeTypes.includes(file.type)) {
      throw new Error('Format gambar tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.')
    }

    if (file.size > maxFileSizeInBytes) {
      throw new Error('Ukuran gambar terlalu besar. Maksimal 20 MB untuk tetap aman dan wajar.')
    }

    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = null

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const timestamp = new Date().getTime()
      const uniqueFileName = `${timestamp}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`
      const filePath = `${folder}/${uniqueFileName}`

      const fileRef = storageRef($storage, filePath)

      await uploadBytes(fileRef, file)

      const downloadURL = await getDownloadURL(fileRef)

      return downloadURL
    } catch (error: any) {
      console.error('Error uploading image:', error)

      if (error?.code === 'storage/unauthorized') {
        uploadError.value = 'Upload ditolak oleh aturan Firebase Storage. Pastikan akun Anda login ke project yang sama dan memiliki izin yang valid.'
      } else {
        uploadError.value = error.message || 'Terjadi kesalahan saat mengunggah gambar.'
      }

      throw error
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    uploadError
  }
}
