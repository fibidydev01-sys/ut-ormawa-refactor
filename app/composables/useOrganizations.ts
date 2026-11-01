/**
 * ============================================================
 * COMPOSABLE: useOrganizations
 * Helper functions untuk operasi CRUD organisasi di Firestore.
 *
 * Fitur:
 *  1. getOrganizationById()   — Ambil satu organisasi berdasarkan ID
 *  2. getAllOrganizations()    — Ambil semua organisasi
 *  3. createOrganization()    — Buat organisasi baru
 *  4. updateOrganization()    — Perbarui data organisasi
 * ============================================================
 */

import type {
  OrganizationDocument,
  OrganizationType,
} from '~/types/database.types'

export const useOrganizations = () => {
  const { $db } = useNuxtApp()

  const COLLECTION_ORGANIZATIONS = 'organizations'

  // ────────────────────────────────────────────────────────
  // FUNGSI 1: Ambil Satu Organisasi Berdasarkan ID
  // ────────────────────────────────────────────────────────

  /**
   * Mengambil data satu organisasi berdasarkan ID dokumennya.
   *
   * @param organization_id - ID dokumen organisasi di Firestore
   * @returns OrganizationDocument atau null jika tidak ditemukan
   */
  const getOrganizationById = async (
    organization_id: string
  ): Promise<OrganizationDocument | null> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, getDoc } = await import('firebase/firestore')

    const organizationDocumentReference = doc($db, COLLECTION_ORGANIZATIONS, organization_id)
    const organizationDocumentSnapshot = await getDoc(organizationDocumentReference)

    if (!organizationDocumentSnapshot.exists()) return null

    return {
      id: organizationDocumentSnapshot.id,
      ...(organizationDocumentSnapshot.data() as Omit<OrganizationDocument, 'id'>),
    }
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 2: Ambil Semua Organisasi (dengan filter opsional)
  // ────────────────────────────────────────────────────────

  /**
   * Mengambil daftar semua organisasi yang terdaftar.
   * Dapat difilter berdasarkan `organization_type`.
   *
   * @param typeFilter - Opsional. Filter berdasarkan tipe organisasi.
   * @returns Array dokumen organisasi
   */
  const getAllOrganizations = async (
    typeFilter?: OrganizationType
  ): Promise<OrganizationDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')

    const queryConstraints = typeFilter
      ? [where('organization_type', '==', typeFilter), orderBy('name', 'asc')]
      : [orderBy('name', 'asc')]

    const organizationsQuery = query(
      collection($db, COLLECTION_ORGANIZATIONS),
      ...queryConstraints
    )

    const organizationsQuerySnapshot = await getDocs(organizationsQuery)

    console.log('[useOrganizations] fetched organizations count:', organizationsQuerySnapshot.size)
    organizationsQuerySnapshot.docs.forEach((documentSnapshot) => {
      console.log('[useOrganizations] org doc:', documentSnapshot.id, documentSnapshot.data())
    })

    return organizationsQuerySnapshot.docs
      .map((documentSnapshot) => {
        const data = documentSnapshot.data() as Partial<Omit<OrganizationDocument, 'id'>>

        return {
          id: documentSnapshot.id,
          name: typeof data.name === 'string' ? data.name : '',
          organization_type: (data.organization_type as OrganizationType | undefined) || 'HIMPUNAN_MAHASISWA',
          description: typeof data.description === 'string' ? data.description : '',
          logo_url: typeof data.logo_url === 'string' ? data.logo_url : '',
        }
      })
      .filter((organization) => organization.name)
      .sort((left, right) => left.name.localeCompare(right.name))
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 3: Buat Organisasi Baru
  // ────────────────────────────────────────────────────────

  /**
   * Membuat dokumen organisasi baru di Firestore.
   *
   * @param payload - Data organisasi (tanpa field `id`)
   * @returns ID dokumen organisasi yang baru dibuat
   */
  const createOrganization = async (
    payload: Omit<OrganizationDocument, 'id'>
  ): Promise<string> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { collection, addDoc } = await import('firebase/firestore')

    const newOrganizationDocumentReference = await addDoc(
      collection($db, COLLECTION_ORGANIZATIONS),
      payload
    )

    return newOrganizationDocumentReference.id
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 4: Perbarui Data Organisasi
  // ────────────────────────────────────────────────────────

  /**
   * Memperbarui field-field data organisasi yang sudah ada.
   *
   * PENTING: Jika `name` atau `organization_type` diubah, data denormalisasi
   * pada seluruh artikel milik organisasi ini akan menjadi tidak sinkron.
   * Lakukan batch update ke koleksi `articles` jika diperlukan konsistensi penuh.
   *
   * @param organization_id - ID dokumen organisasi yang akan diperbarui
   * @param payload         - Objek berisi field yang ingin diperbarui
   */
  const updateOrganization = async (
    organization_id: string,
    payload: Partial<Omit<OrganizationDocument, 'id'>>
  ): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, updateDoc } = await import('firebase/firestore')

    const organizationDocumentReference = doc($db, COLLECTION_ORGANIZATIONS, organization_id)
    await updateDoc(organizationDocumentReference, payload)
  }

  return {
    getOrganizationById,
    getAllOrganizations,
    createOrganization,
    updateOrganization,
  }
}
