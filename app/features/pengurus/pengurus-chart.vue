<!--
  PENGURUS CHART — bagan struktur pengurus publik (BPH + bidang) dari Firestore
  File: app/features/pengurus/pengurus-chart.vue
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PengurusMember, BidangItem } from '~/features/pengurus'
import { getAccentTextClass, getLineClass, getRingStyle } from './pengurus-colors'

const { getStruktur } = usePengurus()

const isLoading = ref(true)
const bph = ref<PengurusMember[]>([])
const bidang = ref<BidangItem[]>([])
const updatedAt = ref('')

onMounted(async () => {
  try {
    const data = await getStruktur()
    bph.value = data.bph || []
    bidang.value = data.bidang || []
    if (data.updated_at?.toDate) {
      updatedAt.value = data.updated_at.toDate().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }
  } catch (e) {
    console.error('[struktur-pengurus] Gagal memuat data:', e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <!-- Header -->
    <div class="text-center mb-14">
      <span
        class="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-blue-100"
      >
        Ormawa UT Surabaya
      </span>
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        Struktur Kepengurusan
      </h1>
      <p class="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
        Badan Pengurus Harian (BPH) dan koordinator bidang strategis yang saling bersinergi dalam
        masa bakti aktif.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-9 h-9" fill="none" viewBox="0 0 24 24">
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
        <p class="text-sm font-medium">Memuat data pengurus...</p>
      </div>
    </div>

    <template v-else>
      <!-- ══ BPH SECTION ══════════════════════════════════════ -->
      <div v-if="bph.length > 0" id="bph" class="mb-20 scroll-mt-24">
        <div class="flex items-center gap-4 mb-10 justify-center">
          <div class="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-blue-300"></div>
          <h2 class="text-lg font-extrabold text-slate-700 uppercase tracking-widest">
            Badan Pengurus Harian
          </h2>
          <div class="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-blue-300"></div>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <div v-for="member in bph" :key="member.id" class="member-card group">
            <!-- Foto bulat dengan ring gradien -->
            <div class="photo-ring mb-4">
              <div class="photo-inner">
                <img
                  v-if="member.photo"
                  :src="member.photo"
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-4xl text-slate-300 flex items-center justify-center h-full"
                  >👤</span
                >
              </div>
            </div>
            <h3 class="font-bold text-slate-800 text-base text-center leading-snug w-full">
              {{ member.name }}
            </h3>
            <p class="text-blue-500 text-sm font-semibold text-center mt-1">
              {{ member.jabatan || 'BPH' }}
            </p>
            <p
              v-if="member.nim && member.nim !== '-'"
              class="text-slate-400 text-[11px] text-center mt-0.5"
            >
              {{ member.nim }}
            </p>
          </div>
        </div>
      </div>

      <!-- ══ KOORDINATOR BIDANG ════════════════════════════════ -->
      <div v-if="bidang.length > 0" class="space-y-20">
        <div v-for="bid in bidang" :id="bid.id" :key="bid.id" class="scroll-mt-24">
          <!-- Section header bidang -->
          <div class="flex items-center gap-4 mb-10 justify-center">
            <div class="h-px flex-1 max-w-[80px]" :class="getLineClass(bid.color)"></div>
            <h2
              class="text-lg font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-2"
            >
              <span>{{ bid.icon }}</span
              >{{ bid.name }}
            </h2>
            <div class="h-px flex-1 max-w-[80px]" :class="getLineClass(bid.color)"></div>
          </div>

          <div class="flex flex-col items-center gap-10">
            <!-- Koordinator — card lebih besar -->
            <div class="member-card member-card-lg group">
              <div class="photo-ring photo-ring-lg mb-5" :style="getRingStyle(bid.color)">
                <div class="photo-inner photo-inner-lg">
                  <img
                    v-if="bid.koordinator.photo"
                    :src="bid.koordinator.photo"
                    :alt="bid.koordinator.name"
                    class="w-full h-full object-cover"
                  />
                  <span
                    v-else
                    class="text-5xl text-slate-300 flex items-center justify-center h-full"
                    >👤</span
                  >
                </div>
              </div>
              <h3 class="font-bold text-slate-800 text-lg text-center leading-snug w-full">
                {{ bid.koordinator.name }}
              </h3>
              <p
                class="text-sm font-semibold text-center mt-1"
                :class="getAccentTextClass(bid.color)"
              >
                Koordinator
              </p>
              <p
                v-if="bid.koordinator.nim && bid.koordinator.nim !== '-'"
                class="text-slate-400 text-[11px] text-center mt-0.5"
              >
                {{ bid.koordinator.nim }}
              </p>
            </div>

            <!-- Anggota — row grid -->
            <div
              v-if="bid.anggota.length > 0"
              class="flex flex-wrap justify-center gap-5 w-full max-w-4xl"
            >
              <div
                v-for="anggota in bid.anggota"
                :key="anggota.id"
                class="member-card member-card-sm group"
              >
                <div class="photo-ring photo-ring-sm mb-3">
                  <div class="photo-inner photo-inner-sm">
                    <img
                      v-if="anggota.photo"
                      :src="anggota.photo"
                      :alt="anggota.name"
                      class="w-full h-full object-cover"
                    />
                    <span
                      v-else
                      class="text-2xl text-slate-300 flex items-center justify-center h-full"
                      >👤</span
                    >
                  </div>
                </div>
                <h4
                  class="font-bold text-slate-800 text-xs text-center leading-snug line-clamp-2 w-full"
                >
                  {{ anggota.name }}
                </h4>
                <p class="text-slate-400 text-[10px] text-center mt-0.5 font-medium">Anggota</p>
                <p
                  v-if="anggota.nim && anggota.nim !== '-'"
                  class="text-slate-300 text-[10px] text-center"
                >
                  {{ anggota.nim }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="bph.length === 0 && bidang.length === 0" class="text-center py-24 text-slate-400">
        <p class="text-6xl mb-4">📋</p>
        <p class="text-lg font-semibold text-slate-600">Data struktur pengurus belum tersedia.</p>
        <p class="text-sm mt-1">Admin dapat mengelola data melalui panel dashboard.</p>
      </div>

      <!-- Footer timestamp -->
      <div
        v-if="updatedAt"
        class="mt-20 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium tracking-wide"
      >
        Terakhir diperbarui: {{ updatedAt }}
      </div>
    </template>
  </div>
</template>

<style scoped src="./pengurus-chart.css"></style>
