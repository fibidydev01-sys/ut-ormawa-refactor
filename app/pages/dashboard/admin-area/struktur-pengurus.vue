<template>
  <div>
    <!-- PAGE HEADER -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Struktur Pengurus</h1>
        <p class="text-sm text-slate-500 mt-1">Kelola BPH dan koordinator bidang beserta anggotanya.</p>
      </div>
      <button
        @click="handleSave"
        :disabled="isSaving"
        id="btn-simpan-struktur"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors disabled:opacity-60"
      >
        <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        {{ isSaving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>

    <!-- NOTIFIKASI -->
    <div v-if="successMsg" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
      {{ errorMsg }}
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <div class="flex flex-col items-center gap-3 text-slate-400">
        <svg class="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-sm font-medium">Memuat data struktur...</p>
      </div>
    </div>

    <div v-else class="space-y-10">

      <!-- ═══════════════════════════════════════════════
           SEKSI 1: BPH (Badan Pengurus Harian)
      ════════════════════════════════════════════════ -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-lg">🏛️</div>
            <h2 class="text-lg font-bold text-slate-800">Badan Pengurus Harian (BPH)</h2>
          </div>
          <button
            @click="addBphMember"
            id="btn-tambah-bph"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Tambah Anggota BPH
          </button>
        </div>

        <div v-if="bph.length === 0" class="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
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
              @click="removeBphMember(idx)"
              class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
              title="Hapus anggota"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>

            <!-- Foto -->
            <div class="flex items-center gap-4">
              <div class="relative shrink-0">
                <div class="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow">
                  <img v-if="member.photo" :src="member.photo" class="w-full h-full object-cover" />
                  <span v-else class="flex items-center justify-center h-full text-2xl text-slate-300">👤</span>
                </div>
                <label
                  :for="`photo-bph-${member.id}`"
                  class="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow transition-colors"
                  title="Upload foto"
                >
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                </label>
                <input
                  :id="`photo-bph-${member.id}`"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handlePhotoUpload(e, 'bph', idx)"
                />
                <div v-if="uploadingKey === `bph-${idx}`" class="absolute inset-0 bg-white/70 rounded-full flex items-center justify-center">
                  <svg class="animate-spin w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] text-slate-400 font-medium mb-1">Foto profil (opsional)</p>
                <button
                  v-if="member.photo"
                  @click="member.photo = ''"
                  class="text-[10px] text-red-400 hover:text-red-600 transition-colors"
                >
                  Hapus foto
                </button>
              </div>
            </div>

            <!-- Form fields -->
            <div class="space-y-2.5">
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Jabatan <span class="text-red-400">*</span></label>
                <input
                  v-model="member.jabatan"
                  type="text"
                  placeholder="cth: Ketua Umum, Sekretaris Umum"
                  class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nama Lengkap <span class="text-red-400">*</span></label>
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

      <!-- ═══════════════════════════════════════════════
           SEKSI 2: BIDANG-BIDANG
      ════════════════════════════════════════════════ -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center text-lg">🗂️</div>
            <h2 class="text-lg font-bold text-slate-800">Koordinator Bidang</h2>
          </div>
          <button
            @click="addBidang"
            id="btn-tambah-bidang"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Tambah Bidang
          </button>
        </div>

        <div v-if="bidang.length === 0" class="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          Belum ada bidang. Klik "Tambah Bidang" untuk mulai menambahkan.
        </div>

        <div class="space-y-6">
          <div
            v-for="(bid, bidIdx) in bidang"
            :key="bid.id"
            class="border border-slate-200 rounded-xl overflow-hidden"
          >
            <!-- Header bidang -->
            <div class="bg-slate-50 px-5 py-3.5 flex items-center justify-between border-b border-slate-200">
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
                    @click="bid.color = colorOpt.value"
                    :title="colorOpt.label"
                    class="w-5 h-5 rounded-full border-2 transition-all"
                    :class="[colorOpt.bg, bid.color === colorOpt.value ? 'border-slate-700 scale-110' : 'border-transparent']"
                  ></button>
                </div>
              </div>
              <button
                @click="removeBidang(bidIdx)"
                class="ml-3 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Hapus bidang ini"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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
                    @click="addAnggota(bidIdx)"
                    class="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
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
                      @click="removeAnggota(bidIdx, angIdx)"
                      class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
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
                <div v-if="bid.anggota.length === 0" class="text-center py-4 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl mt-2">
                  Belum ada anggota. Klik "Tambah Anggota".
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PengurusMember, BidangItem } from '~/composables/usePengurus'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

useHead({ title: 'Struktur Pengurus — Admin Panel' })


// ── Component inline kecil untuk form satu baris anggota ─────
// (agar tidak perlu file terpisah)
const MemberFormRow = defineComponent({
  name: 'MemberFormRow',
  props: {
    member: { type: Object as () => PengurusMember, required: true },
    uploadKey: { type: String, required: true },
    uploadingKey: { type: String, default: '' },
    compact: { type: Boolean, default: false },
  },
  emits: ['upload', 'removePhoto'],
  setup(props, { emit }) {
    return () => {
      const m = props.member
      const isUploading = props.uploadingKey === props.uploadKey

      return h('div', { class: 'flex items-start gap-3' }, [
        // Foto
        h('div', { class: 'relative shrink-0' }, [
          h('div', {
            class: props.compact
              ? 'w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow'
              : 'w-14 h-14 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow'
          }, [
            m.photo
              ? h('img', { src: m.photo, class: 'w-full h-full object-cover' })
              : h('span', { class: 'flex items-center justify-center h-full text-slate-300 text-xl' }, '👤')
          ]),
          h('label', {
            for: `photo-${props.uploadKey}`,
            class: 'absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow',
            title: 'Upload foto'
          }, [
            h('svg', { class: 'w-2.5 h-2.5 text-white', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2.5', d: 'M12 4v16m8-8H4' })
            ])
          ]),
          h('input', {
            id: `photo-${props.uploadKey}`,
            type: 'file',
            accept: 'image/*',
            class: 'hidden',
            onChange: (e: Event) => emit('upload', e)
          }),
          isUploading
            ? h('div', { class: 'absolute inset-0 bg-white/70 rounded-full flex items-center justify-center' }, [
                h('svg', { class: 'animate-spin w-4 h-4 text-emerald-500', fill: 'none', viewBox: '0 0 24 24' }, [
                  h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
                  h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' })
                ])
              ])
            : null
        ]),
        // Fields
        h('div', { class: 'flex-1 space-y-2' }, [
          !props.compact
            ? h('div', {}, [
                h('label', { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' }, 'Jabatan'),
                h('input', {
                  value: m.jabatan,
                  onInput: (e: Event) => { m.jabatan = (e.target as HTMLInputElement).value },
                  type: 'text',
                  placeholder: 'cth: Koordinator',
                  class: 'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white'
                })
              ])
            : null,
          h('div', {}, [
            h('label', { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' }, 'Nama Lengkap'),
            h('input', {
              value: m.name,
              onInput: (e: Event) => { m.name = (e.target as HTMLInputElement).value },
              type: 'text',
              placeholder: 'Nama lengkap',
              class: 'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white'
            })
          ]),
          h('div', {}, [
            h('label', { class: 'block text-[10px] font-bold text-slate-500 uppercase mb-0.5' }, 'NIM'),
            h('input', {
              value: m.nim,
              onInput: (e: Event) => { m.nim = (e.target as HTMLInputElement).value },
              type: 'text',
              placeholder: 'NIM mahasiswa',
              class: 'w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white'
            })
          ]),
          m.photo
            ? h('button', {
                onClick: () => emit('removePhoto'),
                class: 'text-[10px] text-red-400 hover:text-red-600 transition-colors'
              }, 'Hapus foto')
            : null
        ])
      ])
    }
  }
})


const { getStruktur, saveStruktur, generateId } = usePengurus()
const { uploadImage } = useStorage()

// ── State ──────────────────────────────────────────────────
const isLoading = ref(true)
const isSaving = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const uploadingKey = ref('')

const bph = ref<PengurusMember[]>([])
const bidang = ref<BidangItem[]>([])

const colorOptions = [
  { label: 'Biru', value: 'bg-blue-400', bg: 'bg-blue-400' },
  { label: 'Ungu', value: 'bg-purple-400', bg: 'bg-purple-400' },
  { label: 'Hijau', value: 'bg-emerald-400', bg: 'bg-emerald-400' },
  { label: 'Kuning', value: 'bg-amber-400', bg: 'bg-amber-400' },
  { label: 'Merah', value: 'bg-rose-400', bg: 'bg-rose-400' },
  { label: 'Cyan', value: 'bg-cyan-400', bg: 'bg-cyan-400' },
]

// ── Lifecycle ─────────────────────────────────────────────
onMounted(async () => {
  try {
    const data = await getStruktur()
    bph.value = data.bph || []
    bidang.value = data.bidang || []
  } catch (e: any) {
    errorMsg.value = 'Gagal memuat data: ' + (e.message || 'Unknown error')
  } finally {
    isLoading.value = false
  }
})

// ── BPH Actions ───────────────────────────────────────────
const addBphMember = () => {
  bph.value.push({ id: generateId(), name: '', jabatan: '', nim: '', photo: '' })
}
const removeBphMember = (idx: number) => {
  bph.value.splice(idx, 1)
}

// ── Bidang Actions ────────────────────────────────────────
const addBidang = () => {
  bidang.value.push({
    id: generateId(),
    name: '',
    icon: '📌',
    color: 'bg-blue-400',
    koordinator: { id: generateId(), name: '', jabatan: 'Koordinator', nim: '', photo: '' },
    anggota: [],
  })
}
const removeBidang = (bidIdx: number) => {
  bidang.value.splice(bidIdx, 1)
}
const addAnggota = (bidIdx: number) => {
  bidang.value[bidIdx].anggota.push({ id: generateId(), name: '', jabatan: 'Anggota', nim: '', photo: '' })
}
const removeAnggota = (bidIdx: number, angIdx: number) => {
  bidang.value[bidIdx].anggota.splice(angIdx, 1)
}

// ── Upload Foto ───────────────────────────────────────────
const handlePhotoUpload = async (
  event: Event,
  type: 'bph' | 'bidang-koordinator' | 'bidang-anggota',
  idx: number,
  subIdx?: number
) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const key = type === 'bph'
    ? `bph-${idx}`
    : type === 'bidang-koordinator'
      ? `bid-${idx}-koord`
      : `bid-${idx}-ang-${subIdx}`

  uploadingKey.value = key
  errorMsg.value = ''

  try {
    const url = await uploadImage(file, 'pengurus')
    if (type === 'bph') {
      bph.value[idx].photo = url
    } else if (type === 'bidang-koordinator') {
      bidang.value[idx].koordinator.photo = url
    } else if (type === 'bidang-anggota' && subIdx !== undefined) {
      bidang.value[idx].anggota[subIdx].photo = url
    }
    successMsg.value = 'Foto berhasil diunggah!'
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (e: any) {
    errorMsg.value = 'Gagal upload foto: ' + (e.message || 'Unknown error')
  } finally {
    uploadingKey.value = ''
    // Reset input agar bisa upload ulang file yang sama
    ;(event.target as HTMLInputElement).value = ''
  }
}

// ── Save ──────────────────────────────────────────────────
const handleSave = async () => {
  isSaving.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await saveStruktur({ bph: bph.value, bidang: bidang.value })
    successMsg.value = 'Struktur pengurus berhasil disimpan!'
    setTimeout(() => { successMsg.value = '' }, 4000)
  } catch (e: any) {
    errorMsg.value = 'Gagal menyimpan: ' + (e.message || 'Unknown error')
  } finally {
    isSaving.value = false
  }
}
</script>
