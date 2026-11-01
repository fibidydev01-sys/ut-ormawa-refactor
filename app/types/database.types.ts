/**
 * ============================================================
 * DATABASE TYPE DEFINITIONS — FIRESTORE
 * Portal Artikel Ormawa UT Surabaya
 *
 * Strict Rules:
 *  - Semua field menggunakan snake_case
 *  - DILARANG menggunakan singkatan
 *  - Denormalisasi diterapkan pada koleksi articles
 * ============================================================
 */

import type { Timestamp } from 'firebase/firestore'

// ────────────────────────────────────────────────────────────
// ENUM / LITERAL TYPES
// ────────────────────────────────────────────────────────────

/**
 * Peran pengguna dalam sistem.
 * - SUPER_ADMIN : Pengurus kampus / BEM, dapat mengelola semua organisasi.
 * - ADMIN       : Pengurus satu organisasi tertentu.
 */
export type UserRole = 'SUPER_ADMIN' | 'ADMIN'

/**
 * Modul akses di Admin Panel.
 * Digunakan untuk mengatur izin akses spesifik (terutama bagi role ADMIN).
 */
export type AdminModule =
  | 'manage_articles'
  | 'manage_events'
  | 'manage_gallery'
  | 'manage_members'
  | 'manage_structure'
  | 'manage_organizations'
  | 'manage_users'
  | 'manage_settings'

/**
 * Tipe organisasi.
 * - HIMPUNAN_MAHASISWA       : Himpunan Mahasiswa (HM / IMF).
 * - UNIT_KEGIATAN_MAHASISWA  : Unit Kegiatan Mahasiswa (UKM).
 * - ORMAWA                   : Organisasi Mahasiswa (BEM / DPM dll).
 * - ORGANISASI_LAIN          : Organisasi lainnya di luar kategori di atas.
 */
export type OrganizationType =
  | 'HIMPUNAN_MAHASISWA'
  | 'UNIT_KEGIATAN_MAHASISWA'
  | 'ORMAWA'
  | 'ORGANISASI_LAIN'

/**
 * Status publikasi artikel.
 * - DRAFT     : Artikel masih dalam proses penulisan, tidak tampil ke publik.
 * - PUBLISHED : Artikel sudah diterbitkan dan tampil ke publik.
 */
export type ArticleStatus = 'DRAFT' | 'PUBLISHED'

// ────────────────────────────────────────────────────────────
// COLLECTION: users
// ────────────────────────────────────────────────────────────

/**
 * Dokumen dalam koleksi `users`.
 * UID dokumen = UID dari Firebase Authentication.
 */
export interface UserDocument {
  /** UID unik dari Firebase Authentication, sekaligus ID dokumen Firestore. */
  id: string

  /** Alamat email pengguna. */
  email: string

  /**
   * Hash password pengguna.
   * CATATAN: Autentikasi ditangani sepenuhnya oleh Firebase Auth.
   * Field ini opsional dan hanya digunakan jika proyek memerlukan referensi tambahan.
   */
  password?: string

  /** Nama lengkap pengguna tanpa singkatan. */
  full_name: string

  /** Peran pengguna dalam sistem (SUPER_ADMIN atau ADMIN). */
  role: UserRole

  /**
   * Referensi ke `id` dokumen di koleksi `organizations`.
   * Null jika pengguna adalah SUPER_ADMIN yang tidak terikat satu organisasi.
   */
  organization_id: string | null

  /**
   * Daftar modul yang boleh diakses pengguna.
   * SUPER_ADMIN memiliki akses penuh secara default, 
   * fitur ini lebih diperuntukkan untuk membatasi akses role ADMIN.
   */
  access_modules?: AdminModule[]
}

// ────────────────────────────────────────────────────────────
// COLLECTION: organizations
// ────────────────────────────────────────────────────────────

/**
 * Dokumen dalam koleksi `organizations`.
 * Menyimpan profil Himpunan Mahasiswa atau Unit Kegiatan Mahasiswa.
 */
export interface OrganizationDocument {
  /** ID unik organisasi, sama dengan ID dokumen Firestore. */
  id: string

  /** Nama lengkap organisasi (tanpa singkatan). */
  name: string

  /** Tipe organisasi: HIMPUNAN_MAHASISWA atau UNIT_KEGIATAN_MAHASISWA. */
  organization_type: OrganizationType

  /** Deskripsi singkat mengenai organisasi. */
  description: string

  /** URL publik logo organisasi (dari Firebase Storage atau CDN). */
  logo_url: string
}

// ────────────────────────────────────────────────────────────
// COLLECTION: articles
// ────────────────────────────────────────────────────────────

/**
 * Dokumen dalam koleksi `articles`.
 *
 * Menerapkan prinsip DENORMALISASI NoSQL:
 * Field `organization_name` dan `organization_type` disalin langsung dari
 * koleksi `organizations` agar query artikel tidak membutuhkan
 * operasi join/lookup — mempercepat proses baca (read) secara signifikan.
 */
export interface ArticleDocument {
  /** ID unik artikel, sama dengan ID dokumen Firestore. */
  id: string

  /** Judul artikel. */
  title: string

  /**
   * Slug artikel untuk pembentukan URL yang ramah mesin pencari (SEO-friendly).
   * Contoh: "pelantikan-pengurus-ukm-2025"
   */
  slug: string

  /** Isi lengkap artikel dalam format HTML atau Markdown. */
  content: string

  /** URL gambar sampul (cover) artikel dari Firebase Storage atau CDN. */
  cover_image_url: string

  // ── Relasi & Denormalisasi ──────────────────────────────

  /** Referensi ke `id` dokumen di koleksi `organizations`. */
  organization_id: string

  /**
   * [DENORMALISASI] Nama organisasi pemilik artikel.
   * Disalin dari `organizations.name` saat artikel dibuat atau diperbarui.
   * Tujuan: tampilan list artikel tidak perlu melakukan join ke koleksi organizations.
   */
  organization_name: string

  /**
   * [DENORMALISASI] Tipe organisasi pemilik artikel.
   * Disalin dari `organizations.organization_type`.
   * Tujuan: digunakan untuk filter cepat tanpa join.
   */
  organization_type: OrganizationType

  // ── Status & Waktu ──────────────────────────────────────

  /** Status artikel: DRAFT (belum terbit) atau PUBLISHED (sudah terbit). */
  status: ArticleStatus

  /** Waktu artikel pertama kali dibuat (Firestore serverTimestamp). */
  created_at: Timestamp

  /** Waktu terakhir artikel diperbarui (Firestore serverTimestamp). */
  updated_at: Timestamp
}

// ────────────────────────────────────────────────────────────
// HELPER TYPES
// ────────────────────────────────────────────────────────────

/**
 * Tipe data yang diperlukan saat membuat artikel baru.
 * Field `id`, `organization_name`, `organization_type`, `created_at`,
 * dan `updated_at` dikecualikan karena diisi otomatis oleh helper function.
 */
export interface Article extends ArticleDocument {}

export type CreateArticlePayload = Omit<
  ArticleDocument,
  'id' | 'organization_name' | 'organization_type' | 'created_at' | 'updated_at'
> & { created_at?: Date | Timestamp }

/**
 * Tipe data yang diperlukan saat memperbarui artikel.
 * Semua field bersifat opsional kecuali `updated_at` yang selalu diperbarui otomatis.
 */
export type UpdateArticlePayload = Partial<
  Omit<ArticleDocument, 'id' | 'created_at' | 'updated_at'>
> & { created_at?: Date | Timestamp }
