// ============================================================
// ARTICLES SERVICE — akses Firestore koleksi `articles`
// File: app/features/articles/articles.service.ts
//
// Dipindah dari composables/useArticles.ts (S3). Fungsi murni:
// menerima instance Firestore, tanpa state Vue. Query, urutan,
// dan bentuk data identik dengan versi lama.
// ============================================================

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import type { Firestore, QueryDocumentSnapshot } from 'firebase/firestore'
import type {
  ArticleDocument,
  CreateArticlePayload,
  OrganizationDocument,
  UpdateArticlePayload,
} from '~/types/database'

const COLLECTION_ARTICLES = 'articles'
const COLLECTION_ORGANIZATIONS = 'organizations'

function toArticle(snapshot: QueryDocumentSnapshot): ArticleDocument {
  return { id: snapshot.id, ...(snapshot.data() as Omit<ArticleDocument, 'id'>) }
}

/** Terbaru dulu; artikel tanpa created_at dianggap paling lama. */
function byCreatedAtDesc(left: ArticleDocument, right: ArticleDocument): number {
  const leftTime =
    left.created_at?.toDate?.() instanceof Date ? left.created_at.toDate() : new Date(0)
  const rightTime =
    right.created_at?.toDate?.() instanceof Date ? right.created_at.toDate() : new Date(0)
  return rightTime.getTime() - leftTime.getTime()
}

/**
 * Simpan artikel baru. `organization_name` & `organization_type`
 * didenormalisasi dari dokumen organizations.
 */
export async function createArticle(db: Firestore, payload: CreateArticlePayload): Promise<string> {
  const organizationSnapshot = await getDoc(
    doc(db, COLLECTION_ORGANIZATIONS, payload.organization_id),
  )
  if (!organizationSnapshot.exists()) {
    throw new Error(
      `Organisasi dengan ID "${payload.organization_id}" tidak ditemukan di Firestore.`,
    )
  }
  const organizationData = organizationSnapshot.data() as OrganizationDocument

  const created = await addDoc(collection(db, COLLECTION_ARTICLES), {
    title: payload.title,
    slug: payload.slug,
    content: payload.content,
    cover_image_url: payload.cover_image_url,
    status: payload.status,
    organization_id: payload.organization_id,
    organization_name: organizationData.name,
    organization_type: organizationData.organization_type,
    // Timestamp server kecuali tanggal diisi manual di form
    created_at: payload.created_at || serverTimestamp(),
    updated_at: serverTimestamp(),
  })
  return created.id
}

/** Artikel UKM saja (status default PUBLISHED), terbaru dulu. */
export async function getUkmArticles(
  db: Firestore,
  limitCount = 20,
  statusFilter: ArticleDocument['status'] = 'PUBLISHED',
): Promise<ArticleDocument[]> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION_ARTICLES),
      where('organization_type', '==', 'UNIT_KEGIATAN_MAHASISWA'),
      where('status', '==', statusFilter),
      limit(limitCount),
    ),
  )
  return snapshot.docs.map(toArticle).sort(byCreatedAtDesc)
}

/** Semua artikel terbit, terbaru dulu. */
export async function getPublishedArticles(db: Firestore): Promise<ArticleDocument[]> {
  const snapshot = await getDocs(
    query(collection(db, COLLECTION_ARTICLES), where('status', '==', 'PUBLISHED')),
  )
  return snapshot.docs.map(toArticle).sort(byCreatedAtDesc)
}

/** Semua artikel (semua status), terbaru dulu. */
export async function getAllArticles(db: Firestore): Promise<ArticleDocument[]> {
  const snapshot = await getDocs(query(collection(db, COLLECTION_ARTICLES)))
  return snapshot.docs.map(toArticle).sort(byCreatedAtDesc)
}

/** Artikel milik satu organisasi; `statusFilter` null = semua status. */
export async function getArticlesByOrganization(
  db: Firestore,
  organization_id: string,
  statusFilter: ArticleDocument['status'] | null = null,
): Promise<ArticleDocument[]> {
  const queryConstraints = [where('organization_id', '==', organization_id)]
  if (statusFilter !== null) {
    queryConstraints.unshift(where('status', '==', statusFilter))
  }
  const snapshot = await getDocs(query(collection(db, COLLECTION_ARTICLES), ...queryConstraints))
  return snapshot.docs.map(toArticle).sort(byCreatedAtDesc)
}

/** Data mentah satu artikel berdasarkan ID dokumen, atau null. */
export async function getArticleDocument(
  db: Firestore,
  article_id: string,
): Promise<ArticleDocument | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_ARTICLES, article_id))
  return snapshot.exists() ? (snapshot.data() as ArticleDocument) : null
}

/** Satu artikel TERBIT berdasarkan slug (halaman detail publik). */
export async function getArticleBySlug(
  db: Firestore,
  slug: string,
): Promise<ArticleDocument | null> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION_ARTICLES),
      where('slug', '==', slug),
      where('status', '==', 'PUBLISHED'),
      limit(1),
    ),
  )
  if (snapshot.empty) return null
  return toArticle(snapshot.docs[0]!)
}

export async function updateArticleStatus(
  db: Firestore,
  article_id: string,
  new_status: ArticleDocument['status'],
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_ARTICLES, article_id), {
    status: new_status,
    updated_at: serverTimestamp(),
  })
}

export async function updateArticle(
  db: Firestore,
  article_id: string,
  payload: UpdateArticlePayload,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_ARTICLES, article_id), {
    ...payload,
    updated_at: serverTimestamp(),
  })
}

export async function deleteArticle(db: Firestore, article_id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_ARTICLES, article_id))
}
