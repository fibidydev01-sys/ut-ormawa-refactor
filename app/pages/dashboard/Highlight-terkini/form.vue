<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <NuxtLink to="/dashboard/Highlight-terkini" class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Daftar Artikel
        </NuxtLink>
        <h1 class="text-2xl font-extrabold text-slate-800">
          {{ isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru' }}
        </h1>
      </div>
      <button
        @click="submitForm"
        :disabled="isSubmitting"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors disabled:opacity-60"
      >
        <svg v-if="isSubmitting || isUploading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        {{ isSubmitting ? (isUploading ? 'Mengunggah...' : 'Menyimpan...') : 'Simpan Artikel' }}
      </button>
    </div>

    <!-- Error Banner -->
    <div v-if="pageError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
      {{ pageError }}
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-sm font-medium">Memuat data...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         FORM CONTENT
    ════════════════════════════════════════════════ -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- MAIN EDITOR AREA -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
          <!-- Title -->
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Judul Artikel <span class="text-red-500">*</span></label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="Masukkan judul artikel..."
              @input="generateSlug"
              class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Slug URL <span class="text-red-500">*</span></label>
            <div class="flex items-center">
              <span class="px-4 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 text-sm">ormawa-utsurabaya.web.id/</span>
              <input
                v-model="form.slug"
                type="text"
                required
                placeholder="judul-artikel"
                class="flex-1 px-4 py-3 border border-slate-200 bg-slate-50 rounded-r-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <!-- Content -->
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Konten Artikel <span class="text-red-500">*</span></label>
            <p class="text-xs text-amber-600 mb-2 font-medium">Gunakan editor berikut untuk menulis konten artikel dengan format yang rapi.</p>
            <RichTextEditor v-model="form.content" />
          </div>
        </div>
      </div>

      <!-- SIDEBAR SETTINGS -->
      <div class="space-y-6">
        <!-- Publish Settings -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
          <h3 class="font-extrabold text-slate-800 border-b border-slate-100 pb-3">Pengaturan Publikasi</h3>
          
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status <span class="text-red-500">*</span></label>
            <select
              v-model="form.status"
              required
              class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="DRAFT">Draf (Sembunyikan)</option>
              <option value="PUBLISHED">Publikasi (Tampilkan)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Tanggal Artikel <span class="font-medium text-slate-400 normal-case">(opsional)</span></label>
            <input
              v-model="form.created_at"
              type="datetime-local"
              class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
            />
            <p class="text-[10px] text-slate-400 mt-1">Biarkan kosong untuk menggunakan waktu saat ini.</p>
          </div>

          <div v-if="isSuperAdmin">
            <!-- Filter Kategori Organisasi -->
            <div class="mb-3">
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Kategori Organisasi <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedOrgType"
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
              >
                <option
                  v-for="opt in ORG_TYPE_OPTIONS"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
              <p class="text-[10px] text-slate-400 mt-1">Pilih kategori untuk menyaring daftar organisasi.</p>
            </div>

            <!-- Pilih Organisasi (difilter berdasarkan kategori) -->
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Organisasi <span class="text-red-500">*</span></label>
              <select
                v-model="form.organization_id"
                required
                class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
              >
                <option value="" disabled>-- Pilih Organisasi --</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">
                  {{ org.name }}
                </option>
              </select>
              <p v-if="selectedOrgType && organizations.length === 0" class="text-[10px] text-amber-500 mt-1 font-medium">
                Tidak ada organisasi dalam kategori ini.
              </p>
              <p v-else class="text-[10px] text-slate-400 mt-1">Super Admin wajib memilih organisasi pemilik artikel.</p>
            </div>
          </div>

        </div>

        <!-- Media Settings -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
          <h3 class="font-extrabold text-slate-800 border-b border-slate-100 pb-3">Media</h3>
          
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Cover Image URL</label>
            <input
              id="article-cover"
              type="file"
              accept="image/*"
              @change="onFileSelected"
              class="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition mb-3"
            />
            <!-- Preview Image -->
            <div
              class="w-full aspect-video rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="coverPreviewUrl || form.cover_image_url"
                :src="coverPreviewUrl || form.cover_image_url"
                alt="Cover Preview"
                class="w-full h-full object-cover"
                @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
              />
              <div v-else class="text-center p-4">
                <svg class="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preview Kosong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ArticleStatus, CreateArticlePayload, UpdateArticlePayload, OrganizationDocument, ArticleDocument, UserDocument, OrganizationType } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Form Artikel — Admin Panel Ormawa' })

const route = useRoute()
const router = useRouter()
const { createArticle, updateArticle } = useArticles()
const { getAllOrganizations } = useOrganizations()
const { uploadImage, isUploading } = useStorage()

const articleId = computed(() => route.query.id as string | undefined)
const isEdit = computed(() => !!articleId.value)

// ── State ──────────────────────────────────────────────────
const isLoading = ref<boolean>(true)
const isSubmitting = ref<boolean>(false)
const pageError = ref<string>('')

const allOrganizations = ref<OrganizationDocument[]>([])
const organizations = computed(() => {
  if (!selectedOrgType.value) return allOrganizations.value
  return allOrganizations.value.filter(org => org.organization_type === selectedOrgType.value)
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
const firebaseUser = useState<any>('firebaseUser')
const isSuperAdmin = computed(() => (userRole.value || '').toUpperCase() === 'SUPER_ADMIN')

// ── Filter Tipe Organisasi (Super Admin) ────────────────────
const selectedOrgType = ref<OrganizationType | ''>('')

watch(selectedOrgType, () => {
  // Reset pilihan organisasi saat kategori berubah
  form.organization_id = ''
})

// ── Form State ──────────────────────────────────────────────
const form = reactive({
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
    const { $db } = useNuxtApp()
    if (!$db) throw new Error('Firestore tidak tersedia')
    const { doc, getDoc } = await import('firebase/firestore')

    const resolvedUser = firebaseUser.value
    if (resolvedUser?.uid) {
      const userSnap = await getDoc(doc($db, 'users', resolvedUser.uid))
      if (userSnap.exists()) {
        const userData = userSnap.data() as Partial<UserDocument>
        currentUser.value = {
          id: userSnap.id,
          email: typeof userData.email === 'string' ? userData.email : '',
          full_name: typeof userData.full_name === 'string' ? userData.full_name : '',
          role: (typeof userData.role === 'string' ? userData.role : 'ADMIN') as UserDocument['role'],
          organization_id: typeof userData.organization_id === 'string' ? userData.organization_id : null,
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
      const articleSnap = await getDoc(doc($db, 'articles', articleId.value))
      if (articleSnap.exists()) {
        const data = articleSnap.data() as ArticleDocument
        form.title = data.title || ''
        form.slug = data.slug || ''
        form.content = data.content || ''
        form.cover_image_url = data.cover_image_url || ''
        form.status = data.status as ArticleStatus
        form.organization_id = data.organization_id || ''
        if (data.created_at && typeof data.created_at.toDate === 'function') {
          const date = data.created_at.toDate()
          const tzOffset = date.getTimezoneOffset() * 60000
          form.created_at = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16)
        }
      } else {
        throw new Error('Artikel tidak ditemukan')
      }
    }
  } catch (err: any) {
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
      const { $db } = useNuxtApp()
      const { doc, getDoc } = await import('firebase/firestore')
      const organizationSnap = await getDoc(doc($db, 'organizations', organizationId))
      if (organizationSnap.exists()) {
        const organizationData = organizationSnap.data() as OrganizationDocument
        organizationName = organizationData.name
        organizationType = organizationData.organization_type
      }
    }

    if (!organizationName || !organizationType) {
      throw new Error('Data organisasi pemilik artikel tidak ditemukan.')
    }

    const payloadBase: any = {
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
  } catch (err: any) {
    pageError.value = err.message || 'Gagal menyimpan artikel.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
