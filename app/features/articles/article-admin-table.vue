<!--
  ARTICLE ADMIN TABLE — tabel artikel di dashboard (judul, organisasi, status, tanggal, aksi)
  File: app/features/articles/article-admin-table.vue
-->

<script setup lang="ts">
import type { ArticleDocument } from '~/types/database'

defineProps<{ articles: ArticleDocument[]; isDeleting: boolean }>()
const emit = defineEmits<{ delete: [article: ArticleDocument] }>()

// ── Helpers ─────────────────────────────────────────────────
function formatDate(timestamp: unknown): string {
  const normalizedTimestamp = timestamp as { toDate?: () => Date } | Date | string | undefined

  const date =
    normalizedTimestamp &&
    typeof normalizedTimestamp === 'object' &&
    'toDate' in normalizedTimestamp
      ? normalizedTimestamp.toDate?.()
      : normalizedTimestamp instanceof Date
        ? normalizedTimestamp
        : typeof normalizedTimestamp === 'string'
          ? new Date(normalizedTimestamp)
          : null

  if (!date || Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[600px]">
      <thead>
        <tr class="bg-slate-50 border-b border-slate-200">
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Judul
          </th>
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Status
          </th>
          <th
            class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell"
          >
            Nama Organisasi
          </th>
          <th
            class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell"
          >
            Tanggal
          </th>
          <th
            class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr
          v-for="article in articles"
          :key="article.id"
          class="hover:bg-slate-50 transition-colors"
        >
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
                article.status === 'PUBLISHED'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700',
              ]"
            >
              {{ article.status === 'PUBLISHED' ? 'Publikasi' : 'Draf' }}
            </span>
          </td>

          <!-- Nama Organisasi (Denormalized) -->
          <td class="px-6 py-4 hidden md:table-cell">
            <div class="font-medium text-slate-700">{{ article.organization_name }}</div>
            <div class="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
              {{ article.organization_type.replace('_', ' ') }}
            </div>
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
                :disabled="isDeleting"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-60"
                @click="emit('delete', article)"
              >
                Hapus
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
