// ============================================================
// useMahasiswaProfileForm — muat & simpan profil mahasiswa
// File: app/features/mahasiswa/use-mahasiswa-profile-form.ts
//
// Dipindah apa adanya dari halaman dashboard/mahasiswa/edit-profil (S5).
// Foto dikompres di browser (canvas → JPEG 400px) lalu disimpan sebagai
// data URL di dokumen users. Simpan selalu ditolak rules (temuan T19).
// ============================================================

import { onUserChanged } from '~/features/auth'
import { getUserRecord, setUserRecord } from '~/features/users'
import { ref, onMounted, computed } from 'vue'

export function useMahasiswaProfileForm() {
  const { logActivity } = useActivityLog()

  const profileState = useState('mahasiswaProfile', () => ({
    nama: 'Mahasiswa',
    foto: null as string | null,
  }))

  const fileInput = ref<HTMLInputElement | null>(null)
  const previewImage = ref<string | null>(null)

  const form = ref({
    nama: '',
    nim: '',
    prodi: '',
    nohp: '',
    email: '',
  })

  const currentUserUid = ref<string | null>(null)

  // Mengambil data saat komponen dimuat
  onMounted(async () => {
    try {
      const { auth, db } = useFirebase()
      if (!auth || !db) return

      onUserChanged(auth, async (user) => {
        if (user) {
          currentUserUid.value = user.uid

          // Ambil data dari Firestore
          const userRecord = await getUserRecord(db, user.uid)

          if (userRecord) {
            const data = userRecord.data
            form.value.nama = data.nama || user.displayName || ''
            form.value.nim = data.nim || ''
            form.value.prodi = data.prodi || ''
            form.value.nohp = data.nohp || ''
            form.value.email = data.email || user.email || ''

            if (data.foto) {
              previewImage.value = data.foto
            }

            profileState.value.nama = form.value.nama || 'Mahasiswa'
            profileState.value.foto = previewImage.value
          } else {
            // Fallback
            form.value.email = user.email || ''
            form.value.nama = user.displayName || ''
          }
        }
      })
    } catch (error) {
      console.error('Gagal mengambil data profil:', error)
    }
  })

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 400
          const MAX_HEIGHT = 400
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          // Kompresi ke format JPEG agar ukurannya sangat kecil (mencegah error payload limit Firestore)
          previewImage.value = canvas.toDataURL('image/jpeg', 0.7)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = computed(() => {
    return (
      form.value.nama.trim() !== '' &&
      form.value.nim.trim() !== '' &&
      form.value.prodi.trim() !== '' &&
      form.value.nohp.trim() !== '' &&
      form.value.email.trim() !== '' &&
      previewImage.value !== null
    )
  })

  const saveProfile = async () => {
    if (!isFormValid.value || !currentUserUid.value) return

    try {
      const { db } = useFirebase()
      if (!db) return

      // Simpan ke Firestore
      await setUserRecord(
        db,
        currentUserUid.value,
        {
          nama: form.value.nama,
          nim: form.value.nim,
          prodi: form.value.prodi,
          nohp: form.value.nohp,
          email: form.value.email,
          foto: previewImage.value,
          role: 'mahasiswa',
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      )

      // Update state global
      profileState.value.nama = form.value.nama
      profileState.value.foto = previewImage.value

      await logActivity(form.value.nama, currentUserUid.value, 'memperbarui profil mahasiswa')

      navigateTo('/dashboard/mahasiswa')
    } catch (error) {
      console.error('Gagal menyimpan profil:', error)
      alert('Terjadi kesalahan saat menyimpan data.')
    }
  }

  return {
    fileInput,
    previewImage,
    form,
    triggerFileInput,
    onFileChange,
    isFormValid,
    saveProfile,
  }
}
