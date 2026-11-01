<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-extrabold text-slate-800">Dashboard</h1>
      <p class="text-sm text-slate-500 mt-1">
        Selamat datang di panel admin Ormawa UT Surabaya.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="card in summaryCards"
        :key="card.label"
        class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ card.label }}</p>
        <p class="text-3xl font-extrabold text-slate-800 mt-2">{{ card.value }}</p>
        <p class="text-sm text-slate-500 mt-1">{{ card.description }}</p>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 class="text-lg font-bold text-slate-800 mb-2">Akses Cepat</h2>
      <p class="text-sm text-slate-500 mb-4">
        Gunakan menu di sidebar untuk mengelola konten dan data sistem.
      </p>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserRole } from '~/types/database.types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

useHead({ title: 'Dashboard — Admin Panel Ormawa' })

interface SummaryCard {
  label: string
  value: string
  description: string
}

interface QuickLink {
  label: string
  to: string
}

const userRole = useState<string | null>('userRole')
const accessModules = useState<string[]>('accessModules', () => [])

const normalizedRole = computed<UserRole | null>(() => {
  const raw: string | null = userRole.value
  if (!raw) return null
  const upper: string = raw.toUpperCase()
  if (upper === 'SUPER_ADMIN') return 'SUPER_ADMIN'
  if (upper === 'ADMIN') return 'ADMIN'
  return null
})

const summaryCards: SummaryCard[] = [
  { label: 'Artikel', value: '—', description: 'Total artikel terdaftar' },
  { label: 'Organisasi', value: '—', description: 'HM & UKM aktif' },
  { label: 'Pengguna', value: '—', description: 'Admin terdaftar' },
]

const quickLinks = computed<QuickLink[]>(() => {
  const links: QuickLink[] = []

  const isSuperAdmin = normalizedRole.value === 'SUPER_ADMIN'
  const hasAccess = (moduleName: string) => isSuperAdmin || accessModules.value.includes(moduleName)

  if (hasAccess('manage_articles')) {
    links.push({ label: 'Kelola Artikel', to: '/dashboard/Highlight-terkini' })
  }
  if (hasAccess('manage_organizations')) {
    links.push({ label: 'Kelola Organisasi', to: '/dashboard/organizations' })
  }
  if (hasAccess('manage_users')) {
    links.push({ label: 'Kelola Pengguna', to: '/dashboard/users' })
  }

  return links
})
</script>
