<template>
  <div class="max-w-6xl mx-auto px-4 py-10">

    <!-- Header -->
    <div class="text-center mb-14">
      <span class="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-blue-100">
        Ormawa UT Surabaya
      </span>
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        Struktur Kepengurusan
      </h1>
      <p class="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
        Badan Pengurus Harian (BPH) dan koordinator bidang strategis yang saling bersinergi dalam masa bakti aktif.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-9 h-9" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
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
          <div
            v-for="member in bph"
            :key="member.id"
            class="member-card group"
          >
            <!-- Foto bulat dengan ring gradien -->
            <div class="photo-ring mb-4">
              <div class="photo-inner">
                <img
                  v-if="member.photo"
                  :src="member.photo"
                  :alt="member.name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-4xl text-slate-300 flex items-center justify-center h-full">👤</span>
              </div>
            </div>
            <h3 class="font-bold text-slate-800 text-base text-center leading-snug w-full">{{ member.name }}</h3>
            <p class="text-blue-500 text-sm font-semibold text-center mt-1">{{ member.jabatan || 'BPH' }}</p>
            <p v-if="member.nim && member.nim !== '-'" class="text-slate-400 text-[11px] text-center mt-0.5">{{ member.nim }}</p>
          </div>
        </div>
      </div>

      <!-- ══ KOORDINATOR BIDANG ════════════════════════════════ -->
      <div v-if="bidang.length > 0" class="space-y-20">
        <div v-for="bid in bidang" :key="bid.id" :id="bid.id" class="scroll-mt-24">

          <!-- Section header bidang -->
          <div class="flex items-center gap-4 mb-10 justify-center">
            <div class="h-px flex-1 max-w-[80px]" :class="getLineClass(bid.color)"></div>
            <h2 class="text-lg font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <span>{{ bid.icon }}</span>{{ bid.name }}
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
                  <span v-else class="text-5xl text-slate-300 flex items-center justify-center h-full">👤</span>
                </div>
              </div>
              <h3 class="font-bold text-slate-800 text-lg text-center leading-snug w-full">{{ bid.koordinator.name }}</h3>
              <p class="text-sm font-semibold text-center mt-1" :class="getAccentTextClass(bid.color)">Koordinator</p>
              <p v-if="bid.koordinator.nim && bid.koordinator.nim !== '-'" class="text-slate-400 text-[11px] text-center mt-0.5">{{ bid.koordinator.nim }}</p>
            </div>

            <!-- Anggota — row grid -->
            <div v-if="bid.anggota.length > 0" class="flex flex-wrap justify-center gap-5 w-full max-w-4xl">
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
                    <span v-else class="text-2xl text-slate-300 flex items-center justify-center h-full">👤</span>
                  </div>
                </div>
                <h4 class="font-bold text-slate-800 text-xs text-center leading-snug line-clamp-2 w-full">{{ anggota.name }}</h4>
                <p class="text-slate-400 text-[10px] text-center mt-0.5 font-medium">Anggota</p>
                <p v-if="anggota.nim && anggota.nim !== '-'" class="text-slate-300 text-[10px] text-center">{{ anggota.nim }}</p>
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
      <div v-if="updatedAt" class="mt-20 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium tracking-wide">
        Terakhir diperbarui: {{ updatedAt }}
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PengurusMember, BidangItem } from '~/composables/usePengurus'

useSeoMeta({
  title: 'Struktur Kepengurusan',
  ogTitle: 'Struktur Kepengurusan Ormawa UT Surabaya',
  description: 'Daftar Badan Pengurus Harian (BPH) dan koordinator bidang strategis Organisasi Kemahasiswaan Universitas Terbuka Surabaya.',
  ogDescription: 'Daftar Badan Pengurus Harian (BPH) dan koordinator bidang strategis Organisasi Kemahasiswaan Universitas Terbuka Surabaya.',
  ogImage: 'https://ormawa-utsurabaya.web.app/img/Background%20ormawa.png',
  ogType: 'website',
})

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
        day: 'numeric', month: 'long', year: 'numeric'
      })
    }
  } catch (e) {
    console.error('[struktur-pengurus] Gagal memuat data:', e)
  } finally {
    isLoading.value = false
  }
})

// ── Helpers ──────────────────────────────────────────────
const colorLineMap: Record<string, string> = {
  'bg-blue-400':    'bg-gradient-to-r from-transparent via-blue-300 to-transparent',
  'bg-purple-400':  'bg-gradient-to-r from-transparent via-purple-300 to-transparent',
  'bg-emerald-400': 'bg-gradient-to-r from-transparent via-emerald-300 to-transparent',
  'bg-amber-400':   'bg-gradient-to-r from-transparent via-amber-300 to-transparent',
  'bg-rose-400':    'bg-gradient-to-r from-transparent via-rose-300 to-transparent',
  'bg-cyan-400':    'bg-gradient-to-r from-transparent via-cyan-300 to-transparent',
}
const colorRingMap: Record<string, string> = {
  'bg-blue-400':    'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'bg-purple-400':  'linear-gradient(135deg, #a855f7, #c084fc)',
  'bg-emerald-400': 'linear-gradient(135deg, #10b981, #34d399)',
  'bg-amber-400':   'linear-gradient(135deg, #f59e0b, #fbbf24)',
  'bg-rose-400':    'linear-gradient(135deg, #f43f5e, #fb7185)',
  'bg-cyan-400':    'linear-gradient(135deg, #06b6d4, #22d3ee)',
}
const colorTextMap: Record<string, string> = {
  'bg-blue-400':    'text-blue-500',
  'bg-purple-400':  'text-purple-500',
  'bg-emerald-400': 'text-emerald-500',
  'bg-amber-400':   'text-amber-500',
  'bg-rose-400':    'text-rose-500',
  'bg-cyan-400':    'text-cyan-500',
}
const getLineClass = (color: string) => colorLineMap[color] || 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'
const getRingStyle = (color: string) => ({ background: colorRingMap[color] || 'linear-gradient(135deg, #3b82f6, #60a5fa)' })
const getAccentTextClass = (color: string) => colorTextMap[color] || 'text-blue-500'

useHead({
  title: 'Struktur Pengurus | Ormawa UT Surabaya',
  meta: [
    { name: 'description', content: 'Struktur kepengurusan Ormawa UT Surabaya — BPH dan koordinator bidang masa bakti aktif.' }
  ]
})
</script>

<style scoped>
/* ── Member Card ─────────────────────────────────── */
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
  padding: 1.5rem 1rem;
  width: 200px;
  transition: all 0.3s ease;
}
.member-card:hover {
  box-shadow: 0 10px 32px rgba(59,130,246,0.13);
  transform: translateY(-4px);
}
.member-card-lg {
  width: 230px;
  padding: 1.75rem 1.25rem;
}
.member-card-sm {
  width: 155px;
  padding: 1.25rem 0.75rem;
}

/* ── Photo Ring ──────────────────────────────────── */
.photo-ring {
  width: 110px;
  height: 110px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #2563eb, #60a5fa, #bfdbfe);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}
.member-card:hover .photo-ring {
  transform: scale(1.06);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.30);
}
.photo-ring-lg {
  width: 136px;
  height: 136px;
  padding: 5px;
}
.photo-ring-sm {
  width: 84px;
  height: 84px;
  padding: 3px;
}

.photo-inner {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: #e2e8f0;
  overflow: hidden;
  border: 3px solid white;
}
.photo-inner-lg {
  border: 4px solid white;
}
.photo-inner-sm {
  border: 2px solid white;
}
</style>