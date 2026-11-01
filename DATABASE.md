# Struktur Database Firestore — Portal Artikel Ormawa UT Surabaya

## Daftar File yang Dibuat

| File | Fungsi |
|---|---|
| [database.types.ts](file:///d:/ornmawautsby/app/types/database.types.ts) | Type definitions semua koleksi Firestore |
| [useArticles.ts](file:///d:/ornmawautsby/app/composables/useArticles.ts) | Helper functions operasi CRUD artikel |
| [useOrganizations.ts](file:///d:/ornmawautsby/app/composables/useOrganizations.ts) | Helper functions operasi CRUD organisasi |
| [firestore.rules](file:///d:/ornmawautsby/firestore.rules) | Security Rules Firestore |

---

## Skema Database

### Collection: `users`

```
users/
  {uid}/                           ← ID = UID Firebase Auth
    id             : string        ← UID Firebase Auth
    email          : string
    password       : string?       ← Opsional, dikelola Firebase Auth
    full_name      : string
    role           : 'SUPER_ADMIN' | 'ADMIN'
    organization_id: string | null ← null jika SUPER_ADMIN
```

### Collection: `organizations`

```
organizations/
  {organization_id}/
    id                : string
    name              : string     ← Nama lengkap tanpa singkatan
    organization_type : 'HIMPUNAN_MAHASISWA' | 'UNIT_KEGIATAN_MAHASISWA'
    description       : string
    logo_url          : string
```

### Collection: `articles` *(dengan Denormalisasi)*

```
articles/
  {article_id}/
    id                 : string
    title              : string
    slug               : string     ← URL-friendly, contoh: "acara-ukm-2025"
    content            : string     ← HTML atau Markdown
    cover_image_url    : string
    organization_id    : string     ← Referensi ke organizations
    organization_name  : string     ← [DENORMALISASI] dari organizations.name
    organization_type  : string     ← [DENORMALISASI] dari organizations.organization_type
    status             : 'DRAFT' | 'PUBLISHED'
    created_at         : Timestamp
    updated_at         : Timestamp
```

---

## Cara Menggunakan Composable

### 1. Buat Artikel Baru (Denormalisasi Otomatis)

```typescript
// Di dalam komponen Vue atau halaman Nuxt
const { createArticle } = useArticles()

const articleId = await createArticle({
  title: 'Pelantikan Pengurus UKM Pramuka 2025',
  slug: 'pelantikan-pengurus-ukm-pramuka-2025',
  content: '<h2>Acara Pelantikan...</h2><p>Isi artikel...</p>',
  cover_image_url: 'https://storage.googleapis.com/...',
  organization_id: 'id-organisasi-ukm-pramuka',  // ← Ambil dari user.organization_id
  status: 'DRAFT',
})
// organization_name dan organization_type otomatis diisi dari Firestore
console.log('Artikel dibuat dengan ID:', articleId)
```

### 2. Ambil Artikel UKM Saja (Filter + Sort Terbaru)

```typescript
const { getUkmArticles } = useArticles()

// Ambil 10 artikel UKM yang sudah PUBLISHED, terbaru di atas
const artikelUkm = await getUkmArticles(10, 'PUBLISHED')

// Contoh hasil:
// [
//   { id: '...', title: 'Acara UKM...', organization_type: 'UNIT_KEGIATAN_MAHASISWA', ... },
//   ...
// ]
```

### 3. Ambil Artikel Milik Satu Organisasi

```typescript
const { getArticlesByOrganization } = useArticles()
const userOrganizationId = 'id-organisasi-hm-teknik'

// Semua status (DRAFT + PUBLISHED)
const semuaArtikel = await getArticlesByOrganization(userOrganizationId)

// Hanya DRAFT
const draftArtikel = await getArticlesByOrganization(userOrganizationId, 'DRAFT')
```

### 4. Terbitkan / Tarik Artikel

```typescript
const { updateArticleStatus } = useArticles()

await updateArticleStatus('id-artikel-123', 'PUBLISHED')  // Terbitkan
await updateArticleStatus('id-artikel-123', 'DRAFT')       // Tarik kembali
```

### 5. Ambil Data Organisasi

```typescript
const { getOrganizationById, getAllOrganizations } = useOrganizations()

// Satu organisasi
const organisasi = await getOrganizationById('id-organisasi-xyz')

// Semua UKM
const semuaUkm = await getAllOrganizations('UNIT_KEGIATAN_MAHASISWA')

// Semua Himpunan
const semuaHm = await getAllOrganizations('HIMPUNAN_MAHASISWA')
```

---

## Prinsip Denormalisasi NoSQL

> **Mengapa `organization_name` dan `organization_type` disimpan di `articles`?**

Dalam Firestore (NoSQL), tidak ada operasi JOIN seperti di SQL. Tanpa denormalisasi, untuk menampilkan daftar artikel beserta nama organisasinya, kita harus:

1. Query koleksi `articles` → dapat 20 dokumen
2. Loop → fetch `organizations/{id}` sebanyak 20 kali (N+1 problem!)

**Dengan denormalisasi**, cukup 1 query ke `articles` dan semua data sudah lengkap.

| Aspek | Tanpa Denormalisasi | Dengan Denormalisasi |
|---|---|---|
| Jumlah read | N+1 (sangat mahal) | 1 (sangat efisien) |
| Biaya Firestore | Tinggi | Rendah |
| Konsistensi data | Selalu sinkron | Perlu update manual jika nama org berubah |

> [!WARNING]
> Jika nama organisasi diubah di koleksi `organizations`, **field denormalisasi di `articles` tidak otomatis ikut berubah**. Lakukan batch update ke semua artikel milik organisasi tersebut menggunakan Firebase Admin SDK jika diperlukan konsistensi penuh.

---

## Firestore Security Rules — Ringkasan Akses

| Koleksi | Publik | ADMIN (org sendiri) | SUPER_ADMIN |
|---|---|---|---|
| `users` | ❌ | Baca milik sendiri | ✅ Full |
| `organizations` | Baca ✅ | Baca + Update (terbatas) | ✅ Full |
| `articles` (PUBLISHED) | Baca ✅ | ✅ Full (org sendiri) | ✅ Full |
| `articles` (DRAFT) | ❌ | ✅ Full (org sendiri) | ✅ Full |

---

## Langkah Deployment Rules

```powershell
# Deploy Firestore Security Rules ke Firebase
firebase deploy --only firestore:rules
```
