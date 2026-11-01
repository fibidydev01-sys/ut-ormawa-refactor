<!--
  ARTICLE FORM — tulis / edit artikel (?id=…)
  File: app/features/articles/article-form.vue
-->

<script setup lang="ts">
const {
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
} = useArticleForm()
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <NuxtLink
          to="/dashboard/Highlight-terkini"
          class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Daftar Artikel
        </NuxtLink>
        <h1 class="text-2xl font-extrabold text-slate-800">
          {{ isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru' }}
        </h1>
      </div>
      <button
        :disabled="isSubmitting"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors disabled:opacity-60"
        @click="submitForm"
      >
        <svg
          v-if="isSubmitting || isUploading"
          class="animate-spin w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
        >
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
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ isSubmitting ? (isUploading ? 'Mengunggah...' : 'Menyimpan...') : 'Simpan Artikel' }}
      </button>
    </div>

    <!-- Error Banner -->
    <div
      v-if="pageError"
      class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      {{ pageError }}
    </div>

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
        <p class="text-sm font-medium">Memuat data...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         FORM CONTENT
    ════════════════════════════════════════════════ -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- MAIN EDITOR AREA -->
      <div class="lg:col-span-2 space-y-6">
        <ArticleFormContent :form="form" @title-input="generateSlug" />
      </div>

      <!-- SIDEBAR SETTINGS -->
      <div class="space-y-6">
        <!-- Publish Settings -->
        <ArticleFormPublish
          v-model:org-type="selectedOrgType"
          :form="form"
          :organizations="organizations"
          :org-type-options="ORG_TYPE_OPTIONS"
          :is-super-admin="isSuperAdmin"
        />

        <!-- Media Settings -->
        <ArticleFormMedia
          :form="form"
          :cover-preview-url="coverPreviewUrl"
          @file-selected="onFileSelected"
        />
      </div>
    </div>
  </div>
</template>
