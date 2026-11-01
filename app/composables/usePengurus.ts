/**
 * ============================================================
 * COMPOSABLE: usePengurus
 * CRUD untuk data Struktur Pengurus Ormawa di Firestore.
 *
 * Struktur Firestore:
 *   Collection: "pengurus"
 *   Document ID: "struktur_aktif" (satu dokumen tunggal)
 *
 *   Fields:
 *     bph: PengurusMember[]
 *     bidang: BidangItem[]
 *     updated_at: Timestamp
 * ============================================================
 */

export interface PengurusMember {
  id: string         // UUID lokal untuk key list
  name: string
  jabatan: string    // Contoh: "Ketua Umum", "Koordinator", "Anggota"
  nim: string
  photo: string      // URL foto dari Firebase Storage (kosong = tidak ada foto)
}

export interface BidangItem {
  id: string         // slug unik, contoh: "keilmuan"
  name: string       // Nama bidang, contoh: "Bidang Keilmuan"
  icon: string       // Emoji ikon
  color: string      // Tailwind class warna aksen, contoh: "bg-blue-400"
  koordinator: PengurusMember
  anggota: PengurusMember[]
}

export interface StrukturPengurus {
  bph: PengurusMember[]
  bidang: BidangItem[]
  updated_at?: any
}

const COLLECTION = 'pengurus'
const DOC_ID = 'struktur_aktif'

export const usePengurus = () => {
  const { $db } = useNuxtApp()

  // ──────────────────────────────────────────────────────────
  // FETCH: Ambil data struktur pengurus
  // ──────────────────────────────────────────────────────────
  const getStruktur = async (): Promise<StrukturPengurus> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc($db, COLLECTION, DOC_ID))
    if (!snap.exists()) {
      return { bph: [], bidang: [] }
    }
    return snap.data() as StrukturPengurus
  }

  // ──────────────────────────────────────────────────────────
  // SAVE: Simpan seluruh struktur (BPH + bidang)
  // ──────────────────────────────────────────────────────────
  const saveStruktur = async (payload: StrukturPengurus): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    await setDoc(doc($db, COLLECTION, DOC_ID), {
      bph: payload.bph,
      bidang: payload.bidang,
      updated_at: serverTimestamp(),
    })
  }

  // ──────────────────────────────────────────────────────────
  // HELPER: Generate ID unik sederhana
  // ──────────────────────────────────────────────────────────
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
  }

  return {
    getStruktur,
    saveStruktur,
    generateId,
  }
}
