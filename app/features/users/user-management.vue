<!--
  USER MANAGEMENT — daftar & CRUD pengguna skema baru (/dashboard/users)
  File: app/features/users/user-management.vue
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserDocument, OrganizationDocument } from '~/types/database'
import type UserFormModal from './user-form-modal.vue'
import type UserDeleteModal from './user-delete-modal.vue'

const { getAllUsers } = useUsers()
const { getAllOrganizations } = useOrganizations()

// ── State ──────────────────────────────────────────────────
const users = ref<UserDocument[]>([])
const organizations = ref<OrganizationDocument[]>([])
const isLoading = ref<boolean>(true)
const pageError = ref<string>('')

// ── Lifecycle ───────────────────────────────────────────────
onMounted(async () => {
  isLoading.value = true
  pageError.value = ''

  try {
    const [usersData, orgsData] = await Promise.allSettled([getAllUsers(), getAllOrganizations()])

    if (usersData.status === 'fulfilled') {
      users.value = usersData.value
    } else {
      console.warn('Gagal memuat daftar pengguna:', usersData.reason)
      users.value = []
    }

    if (orgsData.status === 'fulfilled') {
      organizations.value = orgsData.value
    } else {
      console.warn('Gagal memuat daftar organisasi:', orgsData.reason)
      organizations.value = []
    }
  } catch (err) {
    console.warn('Gagal memuat data awal pengguna:', err)
    users.value = []
    organizations.value = []
  } finally {
    isLoading.value = false
  }
})

// ── Modal (komponen anak) ───────────────────────────────────
const formModal = ref<InstanceType<typeof UserFormModal> | null>(null)
const deleteModal = ref<InstanceType<typeof UserDeleteModal> | null>(null)

function onDeleted(id: string): void {
  users.value = users.value.filter((u) => u.id !== id)
}
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════
         PAGE HEADER
    ════════════════════════════════════════════════ -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Pengguna</h1>
        <p class="text-sm text-slate-500 mt-1">
          Kelola daftar pengurus sistem (SUPER_ADMIN dan ADMIN).
        </p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
        @click="formModal?.openCreate()"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Pengguna
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
        <p class="text-sm font-medium">Memuat data pengguna...</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         EMPTY STATE
    ════════════════════════════════════════════════ -->
    <div
      v-else-if="!isLoading && users.length === 0"
      class="flex flex-col items-center justify-center py-24 text-slate-400"
    >
      <svg class="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <p class="font-semibold text-lg text-slate-500">Belum ada pengguna</p>
      <p class="text-sm mt-1">Klik tombol "Tambah Pengguna" untuk mulai.</p>
    </div>

    <!-- ═══════════════════════════════════════════════
         DATA TABLE
    ════════════════════════════════════════════════ -->
    <UserTable
      v-else
      :users="users"
      :organizations="organizations"
      @edit="(user) => formModal?.openEdit(user)"
      @delete="(user) => deleteModal?.open(user)"
    />

    <div
      v-if="pageError"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      {{ pageError }}
    </div>

    <!-- ═══════════════════════════════════════════════
         MODAL: CREATE / EDIT
    ════════════════════════════════════════════════ -->
    <UserFormModal
      ref="formModal"
      :organizations="organizations"
      @organizations-loaded="(orgs) => (organizations = orgs)"
      @users-refreshed="(list) => (users = list)"
    />

    <!-- ═══════════════════════════════════════════════
         MODAL: KONFIRMASI HAPUS
    ════════════════════════════════════════════════ -->
    <UserDeleteModal
      ref="deleteModal"
      @deleted="onDeleted"
      @error="(message) => (pageError = message)"
    />
  </div>
</template>
