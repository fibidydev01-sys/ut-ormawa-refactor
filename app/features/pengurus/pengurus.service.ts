// ============================================================
// PENGURUS SERVICE — dokumen tunggal pengurus/struktur_aktif
// File: app/features/pengurus/pengurus.service.ts
// ============================================================

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import type { StrukturPengurus } from './pengurus.types'

const COLLECTION = 'pengurus'
const DOC_ID = 'struktur_aktif'

export async function getStruktur(db: Firestore): Promise<StrukturPengurus> {
  const snapshot = await getDoc(doc(db, COLLECTION, DOC_ID))
  if (!snapshot.exists()) return { bph: [], bidang: [] }
  return snapshot.data() as StrukturPengurus
}

/** Simpan seluruh struktur (BPH + bidang), menimpa dokumen lama. */
export async function saveStruktur(db: Firestore, payload: StrukturPengurus): Promise<void> {
  await setDoc(doc(db, COLLECTION, DOC_ID), {
    bph: payload.bph,
    bidang: payload.bidang,
    updated_at: serverTimestamp(),
  })
}
