// ============================================================
// useArticleForm — state & logika form tulis/edit artikel
// File: app/features/articles/use-article-form.ts
//
// Dipindah apa adanya dari halaman Highlight-terkini/form (S5).
// Memuat user & organisasi, mengisi form saat edit (?id=…),
// upload cover, denormalisasi organisasi, lalu simpan.
// ============================================================

import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type {
  ArticleStatus,
  CreateArticlePayload,
  UpdateArticlePayload,
  OrganizationDocument,
  UserDocument,
  OrganizationType,
  AppError,
  AuthUser,
} from '~/types/database'
import { getUserRecord } from '~/features/users'

/** Isi form artikel (string semua — tanggal dari input datetime-local). */
export interface ArticleFormState {
  title: string
  slug: string
  content: string
  cover_image_url: string
  status: ArticleStatus
  organization_id: string
  created_at: string
}

export function useArticleForm() {
  const route = useRoute()
  const router = useRouter()
  const { createArticle, updateArticle, getArticleDocument } = useArticles()
  const { getAllOrganizations, getOrganizationById } = useOrganizations()
  const { uploadImage, isUploading } = useUpload()

  const articleId = computed(() => route.query.id as string | undefined)
  const isEdit = computed(() => !!articleId.value)

  // ── State ──────────────────────────────────────────────────
  const isLoading = ref<boolean>(true)
  const isSubmitting = ref<boolean>(false)
  const pageError = ref<string>('')

  const allOrganizations = ref<OrganizationDocument[]>([])
  const organizations = computed(() => {
    if (!selectedOrgType.value) return allOrganizations.value
    return allOrganizations.value.filter((org) => org.organization_type === selectedOrgType.value)
  })
  const currentUser = ref<UserDocument | null>(null)

  // Pilihan tipe organisasi untuk filter
  const ORG_TYPE_OPTIONS: { value: OrganizationType | ''; label: string }[] = [
    { value: '', label: '-- Semua Kategori --' },
    { value: 'HIMPUNAN_MAHASISWA', label: 'IMF (Himpunan Mahasiswa)' },
    { value: 'UNIT_KEGIATAN_MAHASISWA', label: 'UKM (Unit Kegiatan Mahasiswa)' },
    { value: 'ORMAWA', label: 'ORMAWA (Organisasi Mahasiswa)' },
    { value: 'ORGANISASI_LAIN', label: 'Organisasi Lain' },
  ]

  const userRole = useState<string | null>('userRole')
  const firebaseUser = useState<AuthUser | null>('firebaseUser')
  const isSuperAdmin = computed(() => (userRole.value || '').toUpperCase() === 'SUPER_ADMIN')

  // ── Filter Tipe Organisasi (Super Admin) ────────────────────
  const selectedOrgType = ref<OrganizationType | ''>('')

  watch(selectedOrgType, () => {
    // Reset pilihan organisasi saat kategori berubah
    form.organization_id = ''
  })

  // ── Form State ──────────────────────────────────────────────
  const form = reactive<ArticleFormState>({
    title: '',
    slug: '',
    content: '',
    cover_image_url: '',
    status: 'DRAFT' as ArticleStatus,
    organization_id: '',
    created_at: '',
  })

  const coverFile = ref<File | null>(null)
  const coverPreviewUrl = ref<string>('')

  // Helper buat slug otomatis dari judul jika slug masih kosong / belum diedit manual
  function generateSlug() {
    if (!isEdit.value) {
      form.slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }
  }

  function onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (selectedFile) {
      coverFile.value = selectedFile
      if (coverPreviewUrl.value) {
        URL.revokeObjectURL(coverPreviewUrl.value)
      }
      coverPreviewUrl.value = URL.createObjectURL(selectedFile)
    }
  }

  // ── Initialization ──────────────────────────────────────────
  onMounted(async () => {
    isLoading.value = true
    pageError.value = ''
    try {
      const db = useFirebase().requireDb('Firestore tidak tersedia')

      const resolvedUser = firebaseUser.value
      if (resolvedUser?.uid) {
        const userRecord = await getUserRecord(db, resolvedUser.uid)
        if (userRecord) {
          const userData = userRecord.data as Partial<UserDocument>
          currentUser.value = {
            id: userRecord.id,
            email: typeof userData.email === 'string' ? userData.email : '',
            full_name: typeof userData.full_name === 'string' ? userData.full_name : '',
            role: (typeof userData.role === 'string'
              ? userData.role
              : 'ADMIN') as UserDocument['role'],
            organization_id:
              typeof userData.organization_id === 'string' ? userData.organization_id : null,
          }

          if (currentUser.value.role === 'ADMIN' && currentUser.value.organization_id) {
            form.organization_id = currentUser.value.organization_id
          }
        }
      }

      if ((userRole.value || '').toUpperCase() === 'SUPER_ADMIN') {
        allOrganizations.value = await getAllOrganizations()
      } else if (currentUser.value?.role === 'ADMIN' && currentUser.value.organization_id) {
        allOrganizations.value = await getAllOrganizations()
      }

      if (isEdit.value && articleId.value) {
        const data = await getArticleDocument(articleId.value)
        if (data) {
          form.title = data.title || ''
          form.slug = data.slug || ''
          form.content = data.content || ''
          form.cover_image_url = data.cover_image_url || ''
          form.status = data.status as ArticleStatus
          form.organization_id = data.organization_id || ''
          if (data.created_at && typeof data.created_at.toDate === 'function') {
            const date = data.created_at.toDate()
            const tzOffset = date.getTimezoneOffset() * 60000
            form.created_at = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16)
          }
        } else {
          throw new Error('Artikel tidak ditemukan')
        }
      }
    } catch (caught) {
      const err = caught as AppError
      pageError.value = err.message || 'Gagal memuat form.'
    } finally {
      isLoading.value = false
    }
  })

  // ── Submit ──────────────────────────────────────────────────
  async function submitForm() {
    if (isSubmitting.value) return
    pageError.value = ''

    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      pageError.value = 'Mohon lengkapi judul, slug, dan konten artikel.'
      return
    }

    if (!isSuperAdmin.value && !form.organization_id) {
      pageError.value = 'Organisasi pengguna belum tersedia.'
      return
    }

    if (isSuperAdmin.value && !form.organization_id) {
      pageError.value = 'Silakan pilih organisasi untuk artikel ini.'
      return
    }

    isSubmitting.value = true
    try {
      let finalCoverUrl = form.cover_image_url
      if (coverFile.value) {
        finalCoverUrl = await uploadImage(coverFile.value, 'articles')
      }

      let organizationId = form.organization_id
      let organizationName = ''
      let organizationType: OrganizationDocument['organization_type'] | undefined

      if (currentUser.value?.role === 'ADMIN' && currentUser.value.organization_id) {
        organizationId = currentUser.value.organization_id
      }

      if (organizationId) {
        const organizationData = await getOrganizationById(organizationId)
        if (organizationData) {
          organizationName = organizationData.name
          organizationType = organizationData.organization_type
        }
      }

      if (!organizationName || !organizationType) {
        throw new Error('Data organisasi pemilik artikel tidak ditemukan.')
      }

      const payloadBase: {
        title: string
        slug: string
        content: string
        cover_image_url: string
        status: ArticleStatus
        organization_id: string
        created_at?: Date
      } = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        content: form.content.trim(),
        cover_image_url: finalCoverUrl.trim(),
        status: form.status,
        organization_id: organizationId,
      }

      if (form.created_at) {
        payloadBase.created_at = new Date(form.created_at)
      }

      if (isEdit.value && articleId.value) {
        const payload: UpdateArticlePayload = {
          ...payloadBase,
          organization_name: organizationName,
          organization_type: organizationType,
        }
        await updateArticle(articleId.value, payload)
      } else {
        const payload: CreateArticlePayload = {
          ...payloadBase,
          organization_name: organizationName,
          organization_type: organizationType,
        } as CreateArticlePayload
        await createArticle(payload)
      }

      router.push('/dashboard/Highlight-terkini')
    } catch (caught) {
      const err = caught as AppError
      pageError.value = err.message || 'Gagal menyimpan artikel.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isUploading,
    isEdit,
    isLoading,
    isSubmitting,
    pageError,
    organizations,
    ORG_TYPE_OPTIONS,
    isSuperAdmin,
    selectedOrgType,
    form,
    coverPreviewUrl,
    generateSlug,
    onFileSelected,
    submitForm,
  }
}
