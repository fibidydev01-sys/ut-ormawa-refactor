// ============================================================
// usePengurus — struktur pengurus (publik & editor admin)
// File: app/features/pengurus/use-pengurus.ts
// ============================================================

import * as service from './pengurus.service'
import type { StrukturPengurus } from './pengurus.types'

export type { PengurusMember, BidangItem, StrukturPengurus } from './pengurus.types'

export const usePengurus = () => {
  const { requireDb } = useFirebase()

  /** ID unik sederhana untuk key list (bukan ID Firestore). */
  const generateId = (): string =>
    Math.random().toString(36).substring(2, 10) + Date.now().toString(36)

  return {
    getStruktur: () => service.getStruktur(requireDb()),
    saveStruktur: (payload: StrukturPengurus) => service.saveStruktur(requireDb(), payload),
    generateId,
  }
}
