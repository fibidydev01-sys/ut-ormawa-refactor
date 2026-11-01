/**
 * ============================================================
 * COMPOSABLE: useArticles
 * Helper functions untuk operasi CRUD artikel di Firestore.
 *
 * Fitur:
 *  1. createArticle()          — Menyimpan artikel baru dengan denormalisasi otomatis
 *  2. getUkmArticles()         — Mengambil artikel dari UNIT_KEGIATAN_MAHASISWA saja
 *  3. getArticlesByOrganization() — Mengambil artikel berdasarkan organization_id
 *  4. updateArticleStatus()    — Mengubah status artikel (DRAFT ↔ PUBLISHED)
 * ============================================================
 */

import type {
  ArticleDocument,
  CreateArticlePayload,
  OrganizationDocument,
  UpdateArticlePayload,
} from '~/types/database.types'

export const useArticles = () => {
  const { $db } = useNuxtApp()

  // ────────────────────────────────────────────────────────
  // INTERNAL: Nama koleksi Firestore (konstanta)
  // ────────────────────────────────────────────────────────
  const COLLECTION_ARTICLES = 'articles'
  const COLLECTION_ORGANIZATIONS = 'organizations'

  // ────────────────────────────────────────────────────────
  // FUNGSI 1: Simpan Artikel Baru (dengan Denormalisasi Otomatis)
  // ────────────────────────────────────────────────────────

  /**
   * Menyimpan artikel baru ke Firestore.
   *
   * Proses denormalisasi otomatis:
   * Sebelum menyimpan, fungsi ini mengambil data `organization_name`
   * dan `organization_type` dari koleksi `organizations` berdasarkan
   * `organization_id` yang ada di payload, lalu menyisipkannya ke dalam
   * dokumen artikel — sehingga tidak perlu join saat membaca artikel.
   *
   * @param payload - Data artikel (tanpa field denormalisasi & timestamps)
   * @returns ID dokumen artikel yang baru dibuat
   * @throws Error jika organisasi tidak ditemukan atau Firestore belum siap
   */
  const createArticle = async (payload: CreateArticlePayload): Promise<string> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      doc,
      addDoc,
      getDoc,
      serverTimestamp,
    } = await import('firebase/firestore')

    // ── Step 1: Ambil data organisasi untuk denormalisasi ──
    const organizationDocumentReference = doc($db, COLLECTION_ORGANIZATIONS, payload.organization_id)
    const organizationDocumentSnapshot = await getDoc(organizationDocumentReference)

    if (!organizationDocumentSnapshot.exists()) {
      throw new Error(
        `Organisasi dengan ID "${payload.organization_id}" tidak ditemukan di Firestore.`
      )
    }

    const organizationData = organizationDocumentSnapshot.data() as OrganizationDocument

    // ── Step 2: Rakit dokumen artikel lengkap dengan denormalisasi ──
    const articleDataToSave = {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      cover_image_url: payload.cover_image_url,
      status: payload.status,

      // Relasi
      organization_id: payload.organization_id,

      // Denormalisasi — disalin dari dokumen organizations
      organization_name: organizationData.name,
      organization_type: organizationData.organization_type,

      // Timestamps otomatis dari server Firestore (bukan dari klien) kecuali jika disetel manual
      created_at: payload.created_at || serverTimestamp(),
      updated_at: serverTimestamp(),
    }

    // ── Step 3: Simpan ke Firestore dan kembalikan ID dokumen ──
    const newArticleDocumentReference = await addDoc(
      collection($db, COLLECTION_ARTICLES),
      articleDataToSave
    )

    return newArticleDocumentReference.id
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 2: Ambil Artikel dari UKM Saja (Filter + Sort)
  // ────────────────────────────────────────────────────────

  /**
   * Mengambil daftar artikel yang berasal dari organisasi bertipe
   * `UNIT_KEGIATAN_MAHASISWA`, diurutkan dari yang terbaru.
   *
   * Memanfaatkan field denormalisasi `organization_type` agar
   * query ini sangat efisien tanpa join ke koleksi lain.
   *
   * @param limitCount - Jumlah maksimal artikel yang diambil (default: 20)
   * @param statusFilter - Filter berdasarkan status artikel (default: 'PUBLISHED')
   * @returns Array dokumen artikel dari UKM
   */
  const getUkmArticles = async (
    limitCount: number = 20,
    statusFilter: ArticleDocument['status'] = 'PUBLISHED'
  ): Promise<ArticleDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      query,
      where,
      limit,
      getDocs,
    } = await import('firebase/firestore')

    const articlesQuery = query(
      collection($db, COLLECTION_ARTICLES),
      where('organization_type', '==', 'UNIT_KEGIATAN_MAHASISWA'),
      where('status', '==', statusFilter),
      limit(limitCount)
    )

    const articlesQuerySnapshot = await getDocs(articlesQuery)

    const articleList: ArticleDocument[] = articlesQuerySnapshot.docs.map((documentSnapshot) => ({
      id: documentSnapshot.id,
      ...(documentSnapshot.data() as Omit<ArticleDocument, 'id'>),
    }))

    return articleList.sort((left, right) => {
      const leftTime = left.created_at?.toDate?.() instanceof Date ? left.created_at.toDate() : new Date(0)
      const rightTime = right.created_at?.toDate?.() instanceof Date ? right.created_at.toDate() : new Date(0)
      return rightTime.getTime() - leftTime.getTime()
    })
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 3: Ambil Artikel Berdasarkan organization_id
  // ────────────────────────────────────────────────────────

  /**
   * Mengambil semua artikel yang sudah dipublikasikan,
   * diurutkan dari yang terbaru.
   */
  const getPublishedArticles = async (): Promise<ArticleDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      query,
      where,
      getDocs,
    } = await import('firebase/firestore')

    const articlesQuery = query(
      collection($db, COLLECTION_ARTICLES),
      where('status', '==', 'PUBLISHED')
    )

    const articlesQuerySnapshot = await getDocs(articlesQuery)

    return articlesQuerySnapshot.docs
      .map((documentSnapshot) => ({
        id: documentSnapshot.id,
        ...(documentSnapshot.data() as Omit<ArticleDocument, 'id'>),
      }))
      .sort((left, right) => {
        const leftTime = left.created_at?.toDate?.() instanceof Date ? left.created_at.toDate() : new Date(0)
        const rightTime = right.created_at?.toDate?.() instanceof Date ? right.created_at.toDate() : new Date(0)
        return rightTime.getTime() - leftTime.getTime()
      })
  }

  /**
   * Mengambil semua artikel yang ada di koleksi articles,
   * diurutkan dari yang terbaru.
   */
  const getAllArticles = async (): Promise<ArticleDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      query,
      getDocs,
    } = await import('firebase/firestore')

    const articlesQuery = query(collection($db, COLLECTION_ARTICLES))

    const articlesQuerySnapshot = await getDocs(articlesQuery)

    const articleList: ArticleDocument[] = articlesQuerySnapshot.docs.map((documentSnapshot) => ({
      id: documentSnapshot.id,
      ...(documentSnapshot.data() as Omit<ArticleDocument, 'id'>),
    }))

    return articleList.sort((left, right) => {
      const leftTime = left.created_at?.toDate?.() instanceof Date ? left.created_at.toDate() : new Date(0)
      const rightTime = right.created_at?.toDate?.() instanceof Date ? right.created_at.toDate() : new Date(0)
      return rightTime.getTime() - leftTime.getTime()
    })
  }

  /**
   * Mengambil semua artikel milik satu organisasi tertentu,
   * berguna untuk halaman dashboard admin organisasi.
   *
   * @param organization_id - ID organisasi yang ingin ditampilkan artikelnya
   * @param statusFilter    - Filter status artikel. Jika null, semua status ditampilkan.
   * @returns Array dokumen artikel milik organisasi tersebut
   */
  const getArticlesByOrganization = async (
    organization_id: string,
    statusFilter: ArticleDocument['status'] | null = null
  ): Promise<ArticleDocument[]> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      query,
      where,
      getDocs,
    } = await import('firebase/firestore')

    const queryConstraints = [where('organization_id', '==', organization_id)]

    if (statusFilter !== null) {
      queryConstraints.unshift(where('status', '==', statusFilter))
    }

    const articlesQuery = query(
      collection($db, COLLECTION_ARTICLES),
      ...queryConstraints
    )

    const articlesQuerySnapshot = await getDocs(articlesQuery)

    const articleList: ArticleDocument[] = articlesQuerySnapshot.docs.map((documentSnapshot) => ({
      id: documentSnapshot.id,
      ...(documentSnapshot.data() as Omit<ArticleDocument, 'id'>),
    }))

    return articleList.sort((left, right) => {
      const leftTime = left.created_at?.toDate?.() instanceof Date ? left.created_at.toDate() : new Date(0)
      const rightTime = right.created_at?.toDate?.() instanceof Date ? right.created_at.toDate() : new Date(0)
      return rightTime.getTime() - leftTime.getTime()
    })
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 4: Perbarui Status Artikel
  // ────────────────────────────────────────────────────────

  /**
   * Mengubah status sebuah artikel (DRAFT → PUBLISHED atau sebaliknya).
   * Otomatis memperbarui field `updated_at` menggunakan server timestamp.
   *
   * @param article_id - ID dokumen artikel yang akan diperbarui
   * @param new_status - Status baru ('DRAFT' atau 'PUBLISHED')
   */
  const updateArticleStatus = async (
    article_id: string,
    new_status: ArticleDocument['status']
  ): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore')

    const articleDocumentReference = doc($db, COLLECTION_ARTICLES, article_id)

    await updateDoc(articleDocumentReference, {
      status: new_status,
      updated_at: serverTimestamp(),
    })
  }

  // ────────────────────────────────────────────────────────
  // FUNGSI 5: Perbarui Konten Artikel
  // ────────────────────────────────────────────────────────

  /**
   * Memperbarui field-field konten pada artikel yang sudah ada.
   * Field denormalisasi dan `created_at` tidak dapat diubah dari sini.
   *
   * @param article_id - ID dokumen artikel yang akan diperbarui
   * @param payload    - Objek berisi field yang ingin diperbarui (sebagian atau semua)
   */
  const updateArticle = async (
    article_id: string,
    payload: UpdateArticlePayload
  ): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore')

    const articleDocumentReference = doc($db, COLLECTION_ARTICLES, article_id)

    await updateDoc(articleDocumentReference, {
      ...payload,
      updated_at: serverTimestamp(),
    })
  }

  /**
   * Mengambil satu artikel berdasarkan slug-nya.
   * Digunakan untuk halaman detail artikel publik.
   *
   * @param slug - Slug artikel yang ingin diambil
   * @returns Data artikel atau null jika tidak ditemukan
   */
  const getArticleBySlug = async (slug: string): Promise<ArticleDocument | null> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const {
      collection,
      query,
      where,
      getDocs,
      limit,
    } = await import('firebase/firestore')

    const articlesQuery = query(
      collection($db, COLLECTION_ARTICLES),
      where('slug', '==', slug),
      where('status', '==', 'PUBLISHED'),
      limit(1)
    )

    const snapshot = await getDocs(articlesQuery)
    if (snapshot.empty) return null

    const docSnap = snapshot.docs[0]
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<ArticleDocument, 'id'>),
    }
  }

  /**
   * Menghapus artikel berdasarkan ID dokumen.
   */
  const deleteArticle = async (article_id: string): Promise<void> => {
    if (!$db) throw new Error('Firestore belum diinisialisasi.')

    const { doc, deleteDoc } = await import('firebase/firestore')

    await deleteDoc(doc($db, COLLECTION_ARTICLES, article_id))
  }

  // ────────────────────────────────────────────────────────
  // RETURN: Expose semua fungsi
  // ────────────────────────────────────────────────────────
  return {
    createArticle,
    getPublishedArticles,
    getAllArticles,
    getUkmArticles,
    getArticlesByOrganization,
    getArticleBySlug,
    updateArticleStatus,
    updateArticle,
    deleteArticle,
  }
}
