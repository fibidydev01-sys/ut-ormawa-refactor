import { useNuxtApp } from '#app'

export const useActivityLog = () => {
  const logActivity = async (
    aktorName: string,
    aktorUid: string,
    aksi: string,
    target: string = ''
  ) => {
    try {
      const { $db } = useNuxtApp()
      if (!$db) return

      const { collection, addDoc } = await import('firebase/firestore')
      
      await addDoc(collection($db, 'activityLogs'), {
        aktorName,
        aktorUid,
        aksi,
        target,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to log activity:', error)
    }
  }

  return { logActivity }
}
