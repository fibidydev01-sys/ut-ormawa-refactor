<!--
  ARTICLE ADMIN LIST — daftar artikel di dashboard (SUPER_ADMIN: semua, ADMIN: organisasinya)
  File: app/features/articles/article-admin-list.vue
-->

<script setup lang="ts">
import type { AuthUser, ArticleDocument, AppError } from '~/types/database'
import { ref, onMounted } from 'vue'
import { getUserRecord } from '~/features/users'

const { getAllArticles, getArticlesByOrganization, deleteArticle } = useArticles()

// ── State ──────────────────────────────────────────────────
const articles = ref<ArticleDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

const userRole = useState<string>('userRole')
const firebaseUser = useState<AuthUser | null>('firebaseUser')

const isDeleting = ref<boolean>(false)

// ── Data Fetching ─────────────────────────────────────────────
async function loadArticles() {
  isLoading.value = true
  pageError.value = ''
  try {
    const role = userRole.value?.toUpperCase()
    if (role === 'SUPER_ADMIN') {
      articles.value = await getAllArticles()
    } else if (role === 'ADMIN') {
      // Untuk ADMIN, ambil data organization_id dari Firestore
      // Kita perlu fetch data UserDocument user saat ini terlebih dahulu
      const { db } = useFirebase()
      if (db && firebaseUser.value) {
        const userRecord = await getUserRecord(db, firebaseUser.value.uid)
        if (userRecord) {
          const orgId = userRecord.data.organization_id
          if (orgId) {
            articles.value = await getArticlesByOrganization(orgId)
          }
        }
      }
    }
  } catch (caught) {
    const err = caught as AppError
    pageError.value = err.message || 'Gagal memuat artikel.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadArticles)

// ── Delete ───────────────────────────────────────────────────
async function deleteArticleHandler(article: ArticleDocument) {
  const confirmed = window.confirm(`Hapus artikel "${article.title}"?`)
  if (!confirmed) return

  isDeleting.value = true
  try {
    await deleteArticle(article.id)
    articles.value = articles.value.filter((item) => item.id !== article.id)
  } catch (caught) {
    const err = caught as AppError
    pageError.value = err.message || 'Gagal menghapus artikel.'
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Artikel</h1>
        <p class="text-sm text-slate-500 mt-1">
          Kelola berita dan artikel terkait organisasi Anda.
        </p>
      </div>
      <NuxtLink
        to="/dashboard/Highlight-terkini/form"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tulis Artikel Baru
      </NuxtLink>
    </div>

    <!-- ═══════════════════════════════════════════════
         LOADING STATE
    ════════════════════════════════════════════════ -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p class="text-sm font-medium">Memuat artikel...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         EMPTY STATE
    ════════════════════════════════════════════════ -->
    <div
      v-else-if="!isLoading && articles.length === 0"
      class="flex flex-col items-center justify-center py-24 text-slate-400"
    >
      <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada artikel</p>
      <p class="text-sm mt-1">Klik tombol "Tulis Artikel Baru" untuk membuat artikel pertama.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <ArticleAdminTable
      v-else
      :articles="articles"
      :is-deleting="isDeleting"
      @delete="deleteArticleHandler"
    />

    <!-- Error State -->
    <div
      v-if="pageError"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      {{ pageError }}
    </div>
  </div>
</template>
