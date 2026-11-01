// ============================================================
// useActivityLog — catat aktivitas pengguna
// File: app/features/users/use-activity-log.ts
//
// Gagal mencatat tidak boleh menggagalkan aksi utama: error hanya
// di-log ke console (perilaku lama).
// ============================================================

import { addActivityLog } from './activity-log.service'

export const useActivityLog = () => {
  const logActivity = async (aktorName: string, aktorUid: string, aksi: string, target = '') => {
    try {
      const { db } = useFirebase()
      if (!db) return
      await addActivityLog(db, {
        aktorName,
        aktorUid,
        aksi,
        target,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to log activity:', error)
    }
  }

  return { logActivity }
}
