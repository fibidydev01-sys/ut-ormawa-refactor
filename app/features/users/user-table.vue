<!--
  USER TABLE — tabel pengguna (nama, email, role, organisasi, aksi)
  File: app/features/users/user-table.vue
-->

<script setup lang="ts">
import type { OrganizationDocument, UserDocument } from '~/types/database'

const props = defineProps<{ users: UserDocument[]; organizations: OrganizationDocument[] }>()
const emit = defineEmits<{ edit: [user: UserDocument]; delete: [user: UserDocument] }>()

// ── Helpers ─────────────────────────────────────────────────
function getOrganizationName(id: string | null): string {
  if (!id) return '—'
  const org = props.organizations.find((o) => o.id === id)
  return org ? org.name : 'Unknown'
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[600px]">
      <thead>
        <tr class="bg-slate-50 border-b border-slate-200">
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Nama
          </th>
          <th class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Role
          </th>
          <th
            class="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell"
          >
            Organisasi
          </th>
          <th
            class="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition-colors">
          <!-- Nama + Email -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0"
              >
                {{
                  user.full_name
                    ? user.full_name[0]!.toUpperCase()
                    : user.email
                      ? user.email[0]!.toUpperCase()
                      : '?'
                }}
              </div>
              <div>
                <div class="font-semibold text-slate-800">{{ user.full_name || '—' }}</div>
                <div class="text-xs text-slate-400">{{ user.email }}</div>
              </div>
            </div>
          </td>

          <!-- Role Badge -->
          <td class="px-6 py-4">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
                user.role === 'SUPER_ADMIN'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-blue-100 text-blue-700',
              ]"
            >
              {{ user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin' }}
            </span>
          </td>

          <!-- Organisasi -->
          <td class="px-6 py-4 hidden md:table-cell">
            <span
              v-if="user.role === 'SUPER_ADMIN'"
              class="text-slate-400 text-xs font-medium italic"
            >
              Semua Organisasi
            </span>
            <span v-else class="text-slate-700 font-medium">
              {{ getOrganizationName(user.organization_id) }}
            </span>
          </td>

          <!-- Aksi -->
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                @click="emit('edit', user)"
              >
                Edit
              </button>
              <button
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                @click="emit('delete', user)"
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
