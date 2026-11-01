<!--
  PENGURUS EDITOR — editor struktur pengurus (BPH + bidang + foto)
  File: app/features/pengurus/pengurus-editor.vue
-->

<script setup lang="ts">
import { PENGURUS_EDITOR } from './use-pengurus-editor'

const editor = usePengurusEditor()
provide(PENGURUS_EDITOR, editor)

const { isLoading, isSaving, successMsg, errorMsg, handleSave } = editor
</script>

<template>
  <div>
    <!-- PAGE HEADER -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Struktur Pengurus</h1>
        <p class="text-sm text-slate-500 mt-1">
          Kelola BPH dan koordinator bidang beserta anggotanya.
        </p>
      </div>
      <button
        id="btn-simpan-struktur"
        :disabled="isSaving"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors disabled:opacity-60"
        @click="handleSave"
      >
        <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
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
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ isSaving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>

    <!-- NOTIFIKASI -->
    <div
      v-if="successMsg"
      class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2"
    >
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
      {{ successMsg }}
    </div>
    <div
      v-if="errorMsg"
      class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
    >
      {{ errorMsg }}
    </div>

    <!-- LOADING -->
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
        <p class="text-sm font-medium">Memuat data struktur...</p>
      </div>
    </div>

    <div v-else class="space-y-10">
      <!-- ═══════════════════════════════════════════════
           SEKSI 1: BPH (Badan Pengurus Harian)
      ════════════════════════════════════════════════ -->
      <PengurusEditorBph />

      <!-- ═══════════════════════════════════════════════
           SEKSI 2: BIDANG-BIDANG
      ════════════════════════════════════════════════ -->
      <PengurusEditorBidang />
    </div>
  </div>
</template>
