// ============================================================
// ORGANIZATIONS SERVICE — akses Firestore koleksi `organizations`
// File: app/features/organizations/organizations.service.ts
//
// Dipindah dari composables/useOrganizations.ts (S3) + hapus
// organisasi yang dulu ditulis langsung di halaman.
// ============================================================

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import type { OrganizationDocument, OrganizationType } from '~/types/database'

const COLLECTION_ORGANIZATIONS = 'organizations'

export async function getOrganizationById(
  db: Firestore,
  organization_id: string,
): Promise<OrganizationDocument | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_ORGANIZATIONS, organization_id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...(snapshot.data() as Omit<OrganizationDocument, 'id'>) }
}

/**
 * Semua organisasi (opsional disaring tipe), urut nama A→Z.
 * Organisasi tanpa nama disembunyikan; field kosong dinormalkan.
 */
export async function getAllOrganizations(
  db: Firestore,
  typeFilter?: OrganizationType,
): Promise<OrganizationDocument[]> {
  const queryConstraints = typeFilter
    ? [where('organization_type', '==', typeFilter), orderBy('name', 'asc')]
    : [orderBy('name', 'asc')]

  const snapshot = await getDocs(
    query(collection(db, COLLECTION_ORGANIZATIONS), ...queryConstraints),
  )

  console.log('[useOrganizations] fetched organizations count:', snapshot.size)
  snapshot.docs.forEach((documentSnapshot) => {
    console.log('[useOrganizations] org doc:', documentSnapshot.id, documentSnapshot.data())
  })

  return snapshot.docs
    .map((documentSnapshot) => {
      const data = documentSnapshot.data() as Partial<Omit<OrganizationDocument, 'id'>>
      return {
        id: documentSnapshot.id,
        name: typeof data.name === 'string' ? data.name : '',
        organization_type:
          (data.organization_type as OrganizationType | undefined) || 'HIMPUNAN_MAHASISWA',
        description: typeof data.description === 'string' ? data.description : '',
        logo_url: typeof data.logo_url === 'string' ? data.logo_url : '',
      }
    })
    .filter((organization) => organization.name)
    .sort((left, right) => left.name.localeCompare(right.name))
}

export async function createOrganization(
  db: Firestore,
  payload: Omit<OrganizationDocument, 'id'>,
): Promise<string> {
  const created = await addDoc(collection(db, COLLECTION_ORGANIZATIONS), payload)
  return created.id
}

/**
 * PENTING: mengubah `name`/`organization_type` TIDAK memperbarui
 * data denormalisasi di artikel milik organisasi ini.
 */
export async function updateOrganization(
  db: Firestore,
  organization_id: string,
  payload: Partial<Omit<OrganizationDocument, 'id'>>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_ORGANIZATIONS, organization_id), payload)
}

export async function deleteOrganization(db: Firestore, organization_id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_ORGANIZATIONS, organization_id))
}
