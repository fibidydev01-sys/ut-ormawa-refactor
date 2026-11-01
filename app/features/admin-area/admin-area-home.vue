<!--
  ADMIN AREA HOME — panel admin lama (layout sendiri): catatan, aktivitas, passkey, pengguna
  File: app/features/admin-area/admin-area-home.vue
-->

<script setup lang="ts">
import { ADMIN_AREA_HOME } from './use-admin-area-home'

const state = useAdminAreaHome()
provide(ADMIN_AREA_HOME, state)

const { activeTab } = state
</script>

<template>
  <div class="h-screen flex flex-col font-sans bg-white overflow-hidden text-slate-700">
    <!-- ===== TOP HEADER BAR (like sandbox) ===== -->
    <AdminAreaHeader />

    <!-- ===== MAIN AREA: Sidebar + Content ===== -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- ===== SIDEBAR (like sandbox) ===== -->
      <AdminAreaSidebar />

      <!-- ===== MAIN CONTENT ===== -->
      <main class="flex-1 bg-[#FAFBFC] p-6 lg:p-8 overflow-y-auto relative custom-scrollbar">
        <div class="max-w-6xl mx-auto">
          <!-- === TAB: Dashboard (Command Center) === -->
          <div v-if="activeTab === 'Dashboard'">
            <AdminAreaDashboardTab />
          </div>

          <!-- === TAB: Pengguna === -->
          <div v-else-if="activeTab === 'Pengguna'">
            <AdminAreaUsersTab />
          </div>

          <!-- === TAB: Lainnya (placeholder) === -->
          <div
            v-else
            class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center"
          >
            <div class="text-center">
              <div
                class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-slate-800 mb-2">{{ activeTab }}</h2>
              <p class="text-slate-500">Halaman ini akan segera tersedia.</p>
            </div>
          </div>

          <!-- === MODAL Tambah / Edit Pengguna === -->
          <AdminAreaHomeUserModal />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
