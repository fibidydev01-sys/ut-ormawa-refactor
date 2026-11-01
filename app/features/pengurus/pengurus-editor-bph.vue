<!--
  PENGURUS EDITOR — kartu BPH (Badan Pengurus Harian)
  File: app/features/pengurus/pengurus-editor-bph.vue
  State dari usePengurusEditor() lewat inject.
-->

<script setup lang="ts">
import { injectPengurusEditor } from './use-pengurus-editor'

const { uploadingKey, bph, addBphMember, removeBphMember, handlePhotoUpload } =
  injectPengurusEditor()
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-lg">🏛️</div>
        <h2 class="text-lg font-bold text-slate-800">Badan Pengurus Harian (BPH)</h2>
      </div>
      <button
        id="btn-tambah-bph"
        class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        @click="addBphMember"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Anggota BPH
      </button>
    </div>

    <div
      v-if="bph.length === 0"
      class="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl"
    >
      Belum ada data BPH. Klik "Tambah Anggota BPH" untuk mulai.
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(member, idx) in bph"
        :key="member.id"
        class="border border-slate-200 rounded-xl p-4 space-y-3 relative group bg-slate-50/50"
      >
        <!-- Tombol hapus -->
        <button
          class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
          title="Hapus anggota"
          @click="removeBphMember(idx)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

        <!-- Foto -->
        <div class="flex items-center gap-4">
          <div class="relative shrink-0">
            <div
              class="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow"
            >
              <img v-if="member.photo" :src="member.photo" class="w-full h-full object-cover" />
              <span v-else class="flex items-center justify-center h-full text-2xl text-slate-300"
                >👤</span
              >
            </div>
            <label
              :for="`photo-bph-${member.id}`"
              class="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow transition-colors"
              title="Upload foto"
            >
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
            <input
              :id="`photo-bph-${member.id}`"
              type="file"
              accept="image/*"
              class="hidden"
              @change="(e) => handlePhotoUpload(e, 'bph', idx)"
            />
            <div
              v-if="uploadingKey === `bph-${idx}`"
              class="absolute inset-0 bg-white/70 rounded-full flex items-center justify-center"
            >
              <svg class="animate-spin w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24">
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
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] text-slate-400 font-medium mb-1">Foto profil (opsional)</p>
            <button
              v-if="member.photo"
              class="text-[10px] text-red-400 hover:text-red-600 transition-colors"
              @click="member.photo = ''"
            >
              Hapus foto
            </button>
          </div>
        </div>

        <!-- Form fields -->
        <div class="space-y-2.5">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1"
              >Jabatan <span class="text-red-400">*</span></label
            >
            <input
              v-model="member.jabatan"
              type="text"
              placeholder="cth: Ketua Umum, Sekretaris Umum"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1"
              >Nama Lengkap <span class="text-red-400">*</span></label
            >
            <input
              v-model="member.name"
              type="text"
              placeholder="cth: Ahmad Fauzi"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">NIM</label>
            <input
              v-model="member.nim"
              type="text"
              placeholder="cth: 043219082"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
