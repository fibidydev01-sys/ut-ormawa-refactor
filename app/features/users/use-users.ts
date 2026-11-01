// ============================================================
// useUsers — manajemen pengguna (/dashboard/users)
// File: app/features/users/use-users.ts
// ============================================================

import * as service from './users.service'
import type { UserDocument } from '~/types/database'

export const useUsers = () => {
  const { requireDb } = useFirebase()

  return {
    getAllUsers: () => service.getAllUsers(requireDb()),
    /** Lewat server karena perlu membuat akun Firebase Auth. */
    createUser: (payload: Partial<UserDocument> & { password?: string; name?: string }) =>
      service.createUserViaApi(payload),
    /** Hanya dokumen Firestore — email/password di Auth tidak berubah. */
    updateUser: (
      user_id: string,
      payload: Partial<Omit<UserDocument, 'id' | 'email' | 'password'>>,
    ) => service.updateUserRecord(requireDb(), user_id, payload),
    /** Lewat server agar akun Auth ikut terhapus. */
    deleteUser: (uid: string) => service.deleteUserViaApi(uid),
  }
}
