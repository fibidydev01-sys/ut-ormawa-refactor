<!--
  ARTICLE FORM CONTENT — kartu judul, slug, dan isi (editor TipTap)
  File: app/features/articles/article-form-content.vue
-->

<script setup lang="ts">
import type { ArticleFormState } from './use-article-form'

const form = defineModel<ArticleFormState>('form', { required: true })
const emit = defineEmits<{ 'title-input': [] }>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
    <!-- Title -->
    <div>
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
        >Judul Artikel <span class="text-red-500">*</span></label
      >
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="Masukkan judul artikel..."
        class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
        @input="emit('title-input')"
      />
    </div>

    <!-- Slug -->
    <div>
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
        >Slug URL <span class="text-red-500">*</span></label
      >
      <div class="flex items-center">
        <span
          class="px-4 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 text-sm"
          >ormawa-utsurabaya.web.id/</span
        >
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
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
        >Konten Artikel <span class="text-red-500">*</span></label
      >
      <p class="text-xs text-amber-600 mb-2 font-medium">
        Gunakan editor berikut untuk menulis konten artikel dengan format yang rapi.
      </p>
      <RichTextEditor v-model="form.content" />
    </div>
  </div>
</template>
