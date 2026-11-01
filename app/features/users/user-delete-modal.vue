<!--
  USER DELETE MODAL — konfirmasi hapus pengguna (lewat /api/delete-user)
  File: app/features/users/user-delete-modal.vue
  Buka lewat ref: deleteModal.open(user). Emit: deleted(id), error(message).
  Catatan T17: cancelDelete() dipanggil saat isDeleting masih true → modal tidak menutup sendiri (perilaku lama).
-->

<script setup lang="ts">
import { ref } from 'vue'
import type { UserDocument } from '~/types/database'

const emit = defineEmits<{ deleted: [id: string]; error: [message: string] }>()
const { deleteUser } = useUsers()

const isDeleteModalOpen = ref<boolean>(false)

const isDeleting = ref<boolean>(false)

const userToDelete = ref<UserDocument | null>(null)

function confirmDelete(user: UserDocument) {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

function cancelDelete() {
  if (isDeleting.value) return
  isDeleteModalOpen.value = false
  userToDelete.value = null
}

async function executeDelete() {
  if (!userToDelete.value || isDeleting.value) return
  isDeleting.value = true
  try {
    await deleteUser(userToDelete.value.id)
    emit('deleted', userToDelete.value!.id)
    cancelDelete()
  } catch (err) {
    emit('error', (err as Error).message || 'Gagal menghapus pengguna.')
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
        <div class="relative bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm w-full z-10">
          <h3 class="text-lg font-bold text-slate-800 mb-2">Hapus Pengguna?</h3>
          <p class="text-sm text-slate-500 mb-6">
            Akun <strong>{{ userToDelete?.full_name }}</strong> akan dihapus permanen.
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 py-2.5 text-sm font-bold bg-slate-100 rounded-xl"
              @click="cancelDelete"
            >
              Batal
            </button>
            <button
              :disabled="isDeleting"
              class="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl"
              @click="executeDelete"
            >
              {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
