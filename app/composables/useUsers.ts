/**
 * ============================================================
 * COMPOSABLE: useUsers
 * Helper functions untuk operasi CRUD pengguna (users) di Firestore.
 *
 * Fitur:
 *  1. getAllUsers()  — Ambil semua pengguna
 *  2. createUser()   — Memanggil endpoint server untuk membuat user di Auth & Firestore
 *  3. updateUser()   — Perbarui data pengguna di Firestore
 *  4. deleteUser()   — Memanggil endpoint server untuk menghapus user dari Auth & Firestore
 * ============================================================
 */

import type { UserDocument } from '~/types/database.types'

export const useUsers = () => {
  const { $db } = useNuxtApp()
  const COLLECTION_USERS = 'users'

  // ────────────────────────────────────────────────────────
  // FUNGSI 1: Ambil Semua Pengguna
  // ────────────────────────────────────────────────────────

  const getAllUsers = async (): Promise<UserDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { collection, getDocs, query } = await import('firebase/firestore')

    const usersQuery = query(collection($db, COLLECTION_USERS))
    const usersQuerySnapshot = await getDocs(usersQuery)

    return usersQuerySnapshot.docs
      .map((doc) => {
        const data = doc.data() as Partial<UserDocument>
        return {
          id: doc.id,
          email: typeof data.email === 'string' ? data.email : '',
          full_name: typeof data.full_name === 'string' ? data.full_name : '',
          role: data.role === 'SUPER_ADMIN' || data.role === 'ADMIN' ? data.role : 'ADMIN',
          organization_id: typeof data.organization_id === 'string' ? data.organization_id : null,
          access_modules: Array.isArray(data.access_modules) ? data.access_modules : [],
        } as UserDocument
      })
      .sort((left, right) => {
        const leftName = left.full_name?.toLowerCase() || ''
        const rightName = right.full_name?.toLowerCase() || ''
        return leftName.localeCompare(rightName)
      })
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 2: Buat Pengguna Baru
  // ────────────────────────────────────────────────────────

  /**
   * Membuat pengguna baru.
   * Karena memerlukan pembuatan akun di Firebase Auth, kita panggil endpoint server.
   *
   * @param payload - Data pengguna termasuk email dan password
   */
  const createUser = async (payload: Partial<UserDocument> & { password?: string, name?: string }): Promise<void> => {
    // Kita panggil endpoint /api/create-user
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        name: payload.full_name, // di endpoint masih membaca "name"
        role: payload.role,
        organization_id: payload.organization_id || null,
        access_modules: payload.access_modules || [],
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.statusMessage || 'Gagal membuat pengguna')
    }
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 3: Perbarui Data Pengguna
  // ────────────────────────────────────────────────────────

  /**
   * Memperbarui data pengguna di Firestore.
   * (Catatan: Ini tidak mengubah email/password di Firebase Auth).
   *
   * @param user_id - ID dokumen pengguna yang akan diperbarui
   * @param payload - Data yang ingin diperbarui
   */
  const updateUser = async (
    user_id: string,
    payload: Partial<Omit<UserDocument, 'id' | 'email' | 'password'>>
  ): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, updateDoc } = await import('firebase/firestore')

    const userDocumentReference = doc($db, COLLECTION_USERS, user_id)
    await updateDoc(userDocumentReference, payload)
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 4: Hapus Pengguna
  // ────────────────────────────────────────────────────────

  /**
   * Menghapus pengguna.
   * Memanggil endpoint server agar dihapus juga dari Firebase Auth.
   *
   * @param uid - ID (UID) pengguna yang akan dihapus
   */
  const deleteUser = async (uid: string): Promise<void> => {
    const response = await fetch('/api/delete-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.statusMessage || 'Gagal menghapus pengguna')
    }
  }

  return {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
