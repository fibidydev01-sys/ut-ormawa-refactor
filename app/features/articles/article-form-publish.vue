<!--
  ARTICLE FORM PUBLISH — kartu status, tanggal, kategori & organisasi (pilihan organisasi hanya SUPER_ADMIN)
  File: app/features/articles/article-form-publish.vue
-->

<script setup lang="ts">
import type { ArticleFormState } from './use-article-form'

import type { OrganizationDocument, OrganizationType } from '~/types/database'

const form = defineModel<ArticleFormState>('form', { required: true })
const orgType = defineModel<OrganizationType | ''>('orgType', { required: true })
defineProps<{
  organizations: OrganizationDocument[]
  orgTypeOptions: { value: OrganizationType | ''; label: string }[]
  isSuperAdmin: boolean
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
    <h3 class="font-extrabold text-slate-800 border-b border-slate-100 pb-3">
      Pengaturan Publikasi
    </h3>

    <div>
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
        >Status <span class="text-red-500">*</span></label
      >
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
      <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
        >Tanggal Artikel
        <span class="font-medium text-slate-400 normal-case">(opsional)</span></label
      >
      <input
        v-model="form.created_at"
        type="datetime-local"
        class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
      />
      <p class="text-[10px] text-slate-400 mt-1">
        Biarkan kosong untuk menggunakan waktu saat ini.
      </p>
    </div>

    <div v-if="isSuperAdmin">
      <!-- Filter Kategori Organisasi -->
      <div class="mb-3">
        <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5">
          Kategori Organisasi <span class="text-red-500">*</span>
        </label>
        <select
          v-model="orgType"
          class="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition"
        >
          <option v-for="opt in orgTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <p class="text-[10px] text-slate-400 mt-1">
          Pilih kategori untuk menyaring daftar organisasi.
        </p>
      </div>

      <!-- Pilih Organisasi (difilter berdasarkan kategori) -->
      <div>
        <label class="block text-xs font-bold text-slate-600 uppercase mb-1.5"
          >Organisasi <span class="text-red-500">*</span></label
        >
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
        <p
          v-if="orgType && organizations.length === 0"
          class="text-[10px] text-amber-500 mt-1 font-medium"
        >
          Tidak ada organisasi dalam kategori ini.
        </p>
        <p v-else class="text-[10px] text-slate-400 mt-1">
          Super Admin wajib memilih organisasi pemilik artikel.
        </p>
      </div>
    </div>
  </div>
</template>
