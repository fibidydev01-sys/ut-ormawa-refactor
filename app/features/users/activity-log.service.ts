// ============================================================
// ACTIVITY LOG SERVICE — koleksi `activityLogs`
// File: app/features/users/activity-log.service.ts
//
// CATATAN (GOLDEN-PLAN T18): firestore.rules tidak punya aturan
// untuk koleksi ini, jadi di produksi baca/tulis selalu ditolak.
// Perilaku itu dipertahankan di Fase A.
// ============================================================

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'

export interface ActivityLog {
  id: string
  aktorName: string
  aktorUid: string
  aksi: string
  target: string
  timestamp: string
}

const COLLECTION = 'activityLogs'

export async function addActivityLog(db: Firestore, entry: Omit<ActivityLog, 'id'>): Promise<void> {
  await addDoc(collection(db, COLLECTION), entry)
}

function newestFirst(logs: ActivityLog[]): ActivityLog[] {
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/** Semua log, terbaru dulu. */
export async function listActivityLogs(db: Firestore): Promise<ActivityLog[]> {
  const snapshot = await getDocs(collection(db, COLLECTION))
  return newestFirst(
    snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ActivityLog, 'id'>) })),
  )
}

/** Log milik satu aktor, terbaru dulu (urut di client — tanpa index komposit). */
export async function listActivityLogsByActor(db: Firestore, uid: string): Promise<ActivityLog[]> {
  const snapshot = await getDocs(query(collection(db, COLLECTION), where('aktorUid', '==', uid)))
  return newestFirst(
    snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ActivityLog, 'id'>) })),
  )
}
