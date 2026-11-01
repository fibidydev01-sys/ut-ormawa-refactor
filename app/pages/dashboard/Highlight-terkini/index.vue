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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
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
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada artikel</p>
      <p class="text-sm mt-1">Klik tombol "Tulis Artikel Baru" untuk membuat artikel pertama.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Judul</th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Nama Organisasi</th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
            <th class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="article in articles" :key="article.id" class="hover:bg-slate-50 transition-colors">
            <!-- Judul -->
            <td class="px-6 py-4">
              <div class="font-semibold text-slate-800 line-clamp-1">{{ article.title }}</div>
              <div class="text-xs text-slate-400 mt-0.5 line-clamp-1">{{ article.slug }}</div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                  article.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
                ]"
              >
                {{ article.status === 'PUBLISHED' ? 'Publikasi' : 'Draf' }}
              </span>
            </td>

            <!-- Nama Organisasi (Denormalized) -->
            <td class="px-6 py-4 hidden md:table-cell">
              <div class="font-medium text-slate-700">{{ article.organization_name }}</div>
              <div class="text-[10px] uppercase font-bold text-slate-400 mt-0.5">{{ article.organization_type.replace('_', ' ') }}</div>
            </td>

            <!-- Tanggal -->
            <td class="px-6 py-4 hidden lg:table-cell text-slate-500 whitespace-nowrap">
              {{ formatDate(article.created_at) }}
            </td>

            <!-- Aksi -->
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/dashboard/Highlight-terkini/form?id=${article.id}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Edit
                </NuxtLink>
                <button
                  @click="deleteArticleHandler(article)"
                  :disabled="isDeleting"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-60"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Error State -->
    <div v-if="pageError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
      {{ pageError }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ArticleDocument } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Artikel — Admin Panel Ormawa' })

const { getAllArticles, getArticlesByOrganization, deleteArticle } = useArticles()

// ── State ──────────────────────────────────────────────────
const articles = ref<ArticleDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

const userRole = useState<string>('userRole')
const firebaseUser = useState<any>('firebaseUser')

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
      const { $db } = useNuxtApp()
      const { doc, getDoc } = await import('firebase/firestore')
      if ($db && firebaseUser.value) {
        const userDocRef = doc($db, 'users', firebaseUser.value.uid)
        const userSnap = await getDoc(userDocRef)
        if (userSnap.exists()) {
          const orgId = userSnap.data().organization_id
          if (orgId) {
            articles.value = await getArticlesByOrganization(orgId)
          }
        }
      }
    }
  } catch (err: any) {
    pageError.value = err.message || 'Gagal memuat artikel.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadArticles)

// ── Helpers ─────────────────────────────────────────────────
function formatDate(timestamp: unknown): string {
  const normalizedTimestamp = timestamp as { toDate?: () => Date } | Date | string | undefined

  const date = normalizedTimestamp && typeof normalizedTimestamp === 'object' && 'toDate' in normalizedTimestamp
    ? normalizedTimestamp.toDate?.()
    : normalizedTimestamp instanceof Date
      ? normalizedTimestamp
      : typeof normalizedTimestamp === 'string'
        ? new Date(normalizedTimestamp)
        : null

  if (!date || Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

// ── Delete ───────────────────────────────────────────────────
async function deleteArticleHandler(article: ArticleDocument) {
  const confirmed = window.confirm(`Hapus artikel "${article.title}"?`)
  if (!confirmed) return

  isDeleting.value = true
  try {
    await deleteArticle(article.id)
    articles.value = articles.value.filter((item) => item.id !== article.id)
  } catch (err: any) {
    pageError.value = err.message || 'Gagal menghapus artikel.'
  } finally {
    isDeleting.value = false
  }
}
</script>
