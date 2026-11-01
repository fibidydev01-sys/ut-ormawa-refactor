<!--
  ORGANIZATION DELETE MODAL — konfirmasi hapus organisasi
  File: app/features/organizations/organization-delete-modal.vue
  Buka lewat ref: deleteModal.open(org). Emit: deleted(id), error(message).
  Catatan T17: cancelDelete() dipanggil saat isDeleting masih true → modal tidak menutup sendiri (perilaku lama).
-->

<script setup lang="ts">
import { ref } from 'vue'
import type { OrganizationDocument } from '~/types/database'

const emit = defineEmits<{ deleted: [id: string]; error: [message: string] }>()
const { deleteOrganization } = useOrganizations()

// ── Delete State ─────────────────────────────────────────────
const isDeleteModalOpen = ref<boolean>(false)

const isDeleting = ref<boolean>(false)

const organizationToDelete = ref<OrganizationDocument | null>(null)

// ── Delete ───────────────────────────────────────────────────
function confirmDelete(org: OrganizationDocument): void {
  organizationToDelete.value = org
  isDeleteModalOpen.value = true
}

function cancelDelete(): void {
  if (isDeleting.value) return
  isDeleteModalOpen.value = false
  organizationToDelete.value = null
}

async function executeDelete(): Promise<void> {
  if (!organizationToDelete.value || isDeleting.value) return
  isDeleting.value = true

  try {
    await deleteOrganization(organizationToDelete.value.id)

    // Hapus dari state lokal
    emit('deleted', organizationToDelete.value!.id)
    cancelDelete()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal menghapus organisasi.'
    emit('error', message)
    isDeleteModalOpen.value = false
  } finally {
    isDeleting.value = false
  }
}

defineExpose({ open: confirmDelete })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="cancelDelete"
      >
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="cancelDelete" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 text-center">
          <div
            class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 class="text-lg font-extrabold text-slate-800 mb-2">Hapus Organisasi?</h3>
          <p class="text-sm text-slate-500 mb-6">
            Organisasi
            <strong class="text-slate-700">{{ organizationToDelete?.name }}</strong> akan dihapus
            secara permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              @click="cancelDelete"
            >
              Batal
            </button>
            <button
              :disabled="isDeleting"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-xl transition-colors"
              @click="executeDelete"
            >
              <svg v-if="isDeleting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
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
              {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
