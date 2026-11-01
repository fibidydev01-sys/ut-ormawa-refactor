// ============================================================
// usePengurusEditor — state & aksi editor struktur pengurus
// File: app/features/pengurus/use-pengurus-editor.ts
//
// Dipindah apa adanya dari halaman admin-area/struktur-pengurus (S5).
// Disediakan ke kartu BPH & bidang lewat provide/inject
// (PENGURUS_EDITOR) karena keduanya mengubah daftar anggota langsung.
// ============================================================

import type { AppError } from '~/types/database'
import { inject, onMounted, ref } from 'vue'
import type { InjectionKey } from 'vue'
import type { PengurusMember, BidangItem } from '~/features/pengurus'

export function usePengurusEditor() {
  // Satu baris form anggota (foto + jabatan/nama/NIM) — lihat pengurus-member-form-row.ts

  const { getStruktur, saveStruktur, generateId } = usePengurus()
  const { uploadImage } = useUpload()

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
    } catch (caught) {
      const e = caught as AppError
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
    bidang.value[bidIdx]!.anggota.push({
      id: generateId(),
      name: '',
      jabatan: 'Anggota',
      nim: '',
      photo: '',
    })
  }
  const removeAnggota = (bidIdx: number, angIdx: number) => {
    bidang.value[bidIdx]!.anggota.splice(angIdx, 1)
  }

  // ── Upload Foto ───────────────────────────────────────────
  const handlePhotoUpload = async (
    event: Event,
    type: 'bph' | 'bidang-koordinator' | 'bidang-anggota',
    idx: number,
    subIdx?: number,
  ) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    const key =
      type === 'bph'
        ? `bph-${idx}`
        : type === 'bidang-koordinator'
          ? `bid-${idx}-koord`
          : `bid-${idx}-ang-${subIdx}`

    uploadingKey.value = key
    errorMsg.value = ''

    try {
      const url = await uploadImage(file, 'pengurus')
      if (type === 'bph') {
        bph.value[idx]!.photo = url
      } else if (type === 'bidang-koordinator') {
        bidang.value[idx]!.koordinator.photo = url
      } else if (type === 'bidang-anggota' && subIdx !== undefined) {
        bidang.value[idx]!.anggota[subIdx]!.photo = url
      }
      successMsg.value = 'Foto berhasil diunggah!'
      setTimeout(() => {
        successMsg.value = ''
      }, 3000)
    } catch (caught) {
      const e = caught as AppError
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
      setTimeout(() => {
        successMsg.value = ''
      }, 4000)
    } catch (caught) {
      const e = caught as AppError
      errorMsg.value = 'Gagal menyimpan: ' + (e.message || 'Unknown error')
    } finally {
      isSaving.value = false
    }
  }

  return {
    isLoading,
    isSaving,
    successMsg,
    errorMsg,
    uploadingKey,
    bph,
    bidang,
    colorOptions,
    addBphMember,
    removeBphMember,
    addBidang,
    removeBidang,
    addAnggota,
    removeAnggota,
    handlePhotoUpload,
    handleSave,
  }
}

export type PengurusEditor = ReturnType<typeof usePengurusEditor>
export const PENGURUS_EDITOR: InjectionKey<PengurusEditor> = Symbol('pengurus-editor')

/** Ambil state editor dari komponen induk (pengurus-editor.vue). */
export function injectPengurusEditor(): PengurusEditor {
  const editor = inject(PENGURUS_EDITOR)
  if (!editor) throw new Error('injectPengurusEditor() dipanggil di luar <PengurusEditor>')
  return editor
}
