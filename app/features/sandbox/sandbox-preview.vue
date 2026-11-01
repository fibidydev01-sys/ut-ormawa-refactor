<!--
  SANDBOX PREVIEW — halaman uji desain panel admin (dev, lihat temuan T7)
  File: app/features/sandbox/sandbox-preview.vue
-->

<script setup lang="ts">
import { SANDBOX_PREVIEW } from './use-sandbox-preview'

const state = useSandboxPreview()
provide(SANDBOX_PREVIEW, state)

const { activeTab } = state
</script>

<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">
    <!-- Top Navigation Bar -->
    <SandboxHeader />

    <!-- Main Content Area with Sidebar -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <SandboxSidebar />

      <!-- Dashboard Main -->
      <main class="flex-1 bg-[#FAFBFC] p-6 lg:p-10 overflow-y-auto relative">
        <div class="max-w-5xl mx-auto pt-4">
          <!-- Default Dashboard Content -->
          <div v-if="activeTab === 'Beranda'">
            <SandboxBerandaTab />
          </div>

          <!-- Profil Page (Superadmin) -->
          <div v-else-if="activeTab === 'Profil'" class="space-y-6">
            <SandboxProfilTab />
          </div>

          <!-- Zona Kampus Page (Superadmin) -->
          <div v-else-if="activeTab === 'Zona Kampus'" class="space-y-6">
            <SandboxZonaKampusTab />
          </div>

          <!-- Media Page (Superadmin) -->
          <div v-else-if="activeTab === 'Media'" class="space-y-6">
            <SandboxMediaTab />
          </div>

          <!-- Kontak Page (Superadmin) -->
          <div v-else-if="activeTab === 'Kontak'" class="space-y-6">
            <SandboxKontakTab />
          </div>

          <!-- Dummy Content for Unknown Tabs -->
          <div
            v-else
            class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center"
          >
            <div class="text-center">
              <h2 class="text-xl font-bold text-slate-800 mb-2">Halaman {{ activeTab }}</h2>
              <p class="text-slate-500">Desain halaman ini belum dibuat.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
