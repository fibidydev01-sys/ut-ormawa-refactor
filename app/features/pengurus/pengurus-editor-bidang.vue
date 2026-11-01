<!--
  PENGURUS EDITOR — kartu bidang: nama, ikon, warna, koordinator, anggota
  File: app/features/pengurus/pengurus-editor-bidang.vue
  State dari usePengurusEditor() lewat inject.
-->

<script setup lang="ts">
import { injectPengurusEditor } from './use-pengurus-editor'
import MemberFormRow from './pengurus-member-form-row'

const {
  uploadingKey,
  bidang,
  colorOptions,
  addBidang,
  removeBidang,
  addAnggota,
  removeAnggota,
  handlePhotoUpload,
} = injectPengurusEditor()
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center text-lg">
          🗂️
        </div>
        <h2 class="text-lg font-bold text-slate-800">Koordinator Bidang</h2>
      </div>
      <button
        id="btn-tambah-bidang"
        class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        @click="addBidang"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Bidang
      </button>
    </div>

    <div
      v-if="bidang.length === 0"
      class="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl"
    >
      Belum ada bidang. Klik "Tambah Bidang" untuk mulai menambahkan.
    </div>

    <div class="space-y-6">
      <div
        v-for="(bid, bidIdx) in bidang"
        :key="bid.id"
        class="border border-slate-200 rounded-xl overflow-hidden"
      >
        <!-- Header bidang -->
        <div
          class="bg-slate-50 px-5 py-3.5 flex items-center justify-between border-b border-slate-200"
        >
          <div class="flex items-center gap-3 flex-1">
            <input
              v-model="bid.icon"
              type="text"
              maxlength="2"
              class="w-10 h-10 text-center text-xl border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              title="Emoji ikon bidang"
            />
            <div class="flex-1">
              <input
                v-model="bid.name"
                type="text"
                placeholder="Nama bidang, cth: Bidang Keilmuan"
                class="w-full font-bold text-slate-800 text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <!-- Pilih warna aksen -->
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] text-slate-400 font-medium">Warna:</span>
              <button
                v-for="(colorOpt, ci) in colorOptions"
                :key="ci"
                :title="colorOpt.label"
                class="w-5 h-5 rounded-full border-2 transition-all"
                :class="[
                  colorOpt.bg,
                  bid.color === colorOpt.value
                    ? 'border-slate-700 scale-110'
                    : 'border-transparent',
                ]"
                @click="bid.color = colorOpt.value"
              ></button>
            </div>
          </div>
          <button
            class="ml-3 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Hapus bidang ini"
            @click="removeBidang(bidIdx)"
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
        </div>

        <div class="p-5 space-y-5">
          <!-- Koordinator -->
          <div>
            <p class="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span>
              Koordinator
            </p>
            <div class="border border-dashed border-purple-200 rounded-xl p-4 bg-purple-50/30">
              <MemberFormRow
                :member="bid.koordinator"
                :upload-key="`bid-${bidIdx}-koord`"
                :uploading-key="uploadingKey"
                @upload="(e) => handlePhotoUpload(e, 'bidang-koordinator', bidIdx)"
                @remove-photo="bid.koordinator.photo = ''"
              />
            </div>
          </div>

          <!-- Anggota -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <p class="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
                Anggota ({{ bid.anggota.length }})
              </p>
              <button
                class="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                @click="addAnggota(bidIdx)"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Tambah Anggota
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="(anggota, angIdx) in bid.anggota"
                :key="anggota.id"
                class="border border-slate-200 rounded-xl p-3.5 bg-white relative group"
              >
                <button
                  class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                  @click="removeAnggota(bidIdx, angIdx)"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <MemberFormRow
                  :member="anggota"
                  :upload-key="`bid-${bidIdx}-ang-${angIdx}`"
                  :uploading-key="uploadingKey"
                  compact
                  @upload="(e) => handlePhotoUpload(e, 'bidang-anggota', bidIdx, angIdx)"
                  @remove-photo="anggota.photo = ''"
                />
              </div>
            </div>
            <div
              v-if="bid.anggota.length === 0"
              class="text-center py-4 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl mt-2"
            >
              Belum ada anggota. Klik "Tambah Anggota".
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
