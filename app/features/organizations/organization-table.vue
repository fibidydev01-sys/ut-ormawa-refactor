<!--
  ORGANIZATION TABLE — tabel organisasi (logo, nama, tipe, deskripsi, aksi)
  File: app/features/organizations/organization-table.vue
-->

<script setup lang="ts">
import type { OrganizationDocument, OrganizationType } from '~/types/database'

defineProps<{ organizations: OrganizationDocument[] }>()
const emit = defineEmits<{
  edit: [org: OrganizationDocument]
  delete: [org: OrganizationDocument]
}>()

/** Label ramah pengguna dari OrganizationType */
function organizationTypeLabel(type: OrganizationType): string {
  const labels: Record<OrganizationType, string> = {
    HIMPUNAN_MAHASISWA: 'Himpunan Mahasiswa',
    UNIT_KEGIATAN_MAHASISWA: 'Unit Kegiatan Mahasiswa',
    ORMAWA: 'ORMAWA',
    ORGANISASI_LAIN: 'Organisasi Lain',
  }
  return labels[type] ?? type
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[600px]">
      <thead>
        <tr class="bg-slate-50 border-b border-slate-200">
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Organisasi
          </th>
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tipe
          </th>
          <th
            class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell"
          >
            Deskripsi
          </th>
          <th
            class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="org in organizations" :key="org.id" class="hover:bg-slate-50 transition-colors">
          <!-- Nama + Logo -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0"
              >
                <img
                  v-if="org.logo_url"
                  :src="org.logo_url"
                  :alt="org.name"
                  class="w-full h-full object-cover"
                  @error="(e: Event) => ((e.target as HTMLImageElement).style.display = 'none')"
                />
                <svg
                  v-else
                  class="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                  />
                </svg>
              </div>
              <span class="font-semibold text-slate-800">{{ org.name }}</span>
            </div>
          </td>

          <!-- Tipe Badge -->
          <td class="px-6 py-4">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                org.organization_type === 'HIMPUNAN_MAHASISWA'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-violet-100 text-violet-700',
              ]"
            >
              {{ organizationTypeLabel(org.organization_type) }}
            </span>
          </td>

          <!-- Deskripsi (hidden on mobile) -->
          <td class="px-6 py-4 hidden md:table-cell">
            <p class="text-slate-500 truncate max-w-xs">
              {{ org.description || '—' }}
            </p>
          </td>

          <!-- Aksi -->
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                @click="emit('edit', org)"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit
              </button>
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                @click="emit('delete', org)"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Hapus
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
