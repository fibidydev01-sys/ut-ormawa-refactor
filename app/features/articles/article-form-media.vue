<!--
  ARTICLE FORM MEDIA — kartu cover image (pilih file + preview)
  File: app/features/articles/article-form-media.vue
-->

<script setup lang="ts">
import type { ArticleFormState } from './use-article-form'

const form = defineModel<ArticleFormState>('form', { required: true })
defineProps<{ coverPreviewUrl: string }>()
const emit = defineEmits<{ 'file-selected': [event: Event] }>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
    <h3 class="font-extrabold text-slate-800 border-b border-slate-100 pb-3">Media</h3>

    <div>
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">Cover Image URL</label>
      <input
        id="article-cover"
        type="file"
        accept="image/*"
        class="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition mb-3"
        @change="(event: Event) => emit('file-selected', event)"
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
          <svg
            class="w-8 h-8 text-slate-300 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Preview Kosong
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
