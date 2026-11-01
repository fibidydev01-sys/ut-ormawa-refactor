<!--
  ORGANIZATION MANAGEMENT — daftar & CRUD organisasi
  File: app/features/organizations/organization-management.vue
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { OrganizationDocument } from '~/types/database'
import type OrganizationFormModal from './organization-form-modal.vue'
import type OrganizationDeleteModal from './organization-delete-modal.vue'

// ── Composable ───────────────────────────────────────────────
const { getAllOrganizations } = useOrganizations()

// ── Page State ───────────────────────────────────────────────
const organizations = ref<OrganizationDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

// ── Data Fetching ─────────────────────────────────────────────
async function fetchOrganizations(): Promise<void> {
  isLoading.value = true
  pageError.value = ''
  try {
    organizations.value = await getAllOrganizations()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal memuat data organisasi.'
    pageError.value = message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchOrganizations)

// ── Modal (komponen anak) ───────────────────────────────────
const formModal = ref<InstanceType<typeof OrganizationFormModal> | null>(null)
const deleteModal = ref<InstanceType<typeof OrganizationDeleteModal> | null>(null)

/** Ganti baris yang diedit di state lokal (tanpa refetch). */
function onUpdated(org: OrganizationDocument): void {
  const index: number = organizations.value.findIndex((o) => o.id === org.id)
  if (index !== -1) {
    organizations.value[index] = org
  }
}

/** Buang organisasi yang dihapus dari state lokal. */
function onDeleted(id: string): void {
  organizations.value = organizations.value.filter((o) => o.id !== id)
}
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div
      class="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="min-w-0">
        <h1 class="text-2xl font-extrabold text-slate-800">Organisasi</h1>
        <p class="mt-1 text-sm text-slate-500">
          Kelola daftar Himpunan Mahasiswa dan Unit Kegiatan Mahasiswa.
        </p>
      </div>
      <button
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:self-auto"
        @click="formModal?.openCreate()"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Organisasi
      </button>
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
        <p class="text-sm font-medium">Memuat data organisasi...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         EMPTY STATE
    ════════════════════════════════════════════════ -->
    <div
      v-else-if="!isLoading && organizations.length === 0"
      class="flex flex-col items-center justify-center py-24 text-slate-400"
    >
      <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada organisasi</p>
      <p class="text-sm mt-1">Klik tombol "Tambah Organisasi" untuk mulai.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <OrganizationTable
      v-else
      :organizations="organizations"
      @edit="(org) => formModal?.openEdit(org)"
      @delete="(org) => deleteModal?.open(org)"
    />

    <!-- Error Banner -->
    <div
      v-if="pageError"
      class="mt-4 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      {{ pageError }}
    </div>

    <!-- ═══════════════════════════════════════════════
         MODAL: CREATE / EDIT
    ════════════════════════════════════════════════ -->
    <OrganizationFormModal
      ref="formModal"
      @created="(org) => organizations.unshift(org)"
      @updated="onUpdated"
    />

    <!-- ═══════════════════════════════════════════════
         MODAL: KONFIRMASI HAPUS
    ════════════════════════════════════════════════ -->
    <OrganizationDeleteModal
      ref="deleteModal"
      @deleted="onDeleted"
      @error="(message) => (pageError = message)"
    />
  </div>
</template>
