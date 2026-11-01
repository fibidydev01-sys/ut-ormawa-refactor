# 🏆 GOLDEN PLAN — Refactor Struktur Ormawa UT Surabaya

> **Single source of truth** untuk refactor `ormawautsby` → `ut-ormawa-refactor`.
> Setiap sesi kerja (manusia maupun AI) **WAJIB** baca file ini dulu, kerjakan
> **satu sesi** dari Roadmap, lalu centang progresnya di bagian akhir.

| | |
|---|---|
| Sumber (baseline) | `ormawautsby/ormawautsby` — Nuxt 4.4, Vue 3.5, Firebase, Tailwind v3 |
| Target | `fibidydev01-sys/ut-ormawa-refactor` |
| UI library | **Kliping** (`kliping-pro/kliping-ui`, registry `https://kliping.pro/r/{name}.json`) |
| Referensi pola struktur | **Fibidy-Client** (Next.js App Router) |
| Prinsip nomor satu | **STRUKTUR DIRAPIKAN, FITUR TIDAK BERUBAH** |

---

## 📖 Daftar Isi

1. [Keputusan Arsitektur](#1-keputusan-arsitektur)
2. [Feature Freeze — Inventaris yang Wajib Tetap Sama](#2-feature-freeze--inventaris-yang-wajib-tetap-sama)
3. [Golden Rules](#3-golden-rules)
4. [Struktur Folder Target](#4-struktur-folder-target)
5. [Strategi Rendering — SSR / SSG / ISR / SPA](#5-strategi-rendering--ssr--ssg--isr--spa)
6. [Autentikasi & Sesi — Cookie, Bukan Login Ulang](#6-autentikasi--sesi--cookie-bukan-login-ulang)
7. [Cookie Consent Banner](#7-cookie-consent-banner)
8. [Gambar — Lazy Load & Optimasi](#8-gambar--lazy-load--optimasi)
9. [Integrasi Kliping UI](#9-integrasi-kliping-ui)
10. [Konvensi Kode](#10-konvensi-kode)
11. [Roadmap Per Sesi](#11-roadmap-per-sesi)
12. [Protokol Tiap Sesi](#12-protokol-tiap-sesi)
13. [Temuan, Risiko & Pertanyaan Terbuka](#13-temuan-risiko--pertanyaan-terbuka)
14. [Progress Tracker](#14-progress-tracker)

---

## 1. Keputusan Arsitektur

### 1.1 Tetap Nuxt 4 — dengan pola Next.js App Router

Kliping adalah library **Vue** (gaya shadcn-vue, Reka UI, Tailwind v4) yang resmi
mendukung **Nuxt 3/4** lewat `shadcn-nuxt`. App lama juga Nuxt 4. Pindah ke
Next.js (React) berarti menulis ulang semua halaman **dan** tidak bisa memakai
Kliping — melanggar prinsip "tanpa merubah fitur".

Jadi: **framework tetap Nuxt 4, tapi pola strukturnya meniru Next.js App Router
seperti di Fibidy.** Nuxt adalah "Next.js-nya Vue", hampir semua konsepnya punya
padanan 1:1:

| Konsep Next.js (Fibidy) | Padanan Nuxt 4 (Ormawa) |
|---|---|
| `src/app/` | `app/pages/` + `app/layouts/` |
| Route group `(marketing)`, `(auth)`, `(dashboard)` | **Tidak dipakai** — layout dipilih via `definePageMeta({ layout })`; `pages/` cermin URL (lihat §4) |
| `layout.tsx` per group | `app/layouts/*.vue` + `definePageMeta({ layout })` |
| `page.tsx` tipis + `client.tsx` | `pages/**.vue` tipis + `app/features/<fitur>/*.vue` (folder fitur datar) |
| Server Component fetch | `useAsyncData` / `useFetch` (jalan di server saat SSR) |
| `generateStaticParams` / SSG | `routeRules: { prerender: true }` / `nuxt generate` |
| ISR `revalidate` | `routeRules: { swr: 3600 }` / `isr` |
| `'use client'` page | `routeRules: { ssr: false }` |
| `middleware.ts` / `proxy.ts` (edge auth gate) | `server/middleware/*.ts` + `app/middleware/*.global.ts` |
| `generateMetadata` | `useSeoMeta()` / `useHead()` |
| `next/image` | `<NuxtImg>` / `<NuxtPicture>` (`@nuxt/image`) |
| `src/lib/api/*.ts` | `app/services/*.ts` (client) + `server/api/**` (server) |
| `src/hooks/*` | `app/features/<fitur>/use-xxx.ts` (+ `app/composables/*` lintas fitur) |
| `src/stores/*` (zustand) | `app/stores/*` (Pinia — sudah terpasang) |
| `components/ui` (shadcn) | `app/components/ui` (**Kliping**) |
| `components/shared/cookie-consent.tsx` | `app/components/shared/cookie-consent.vue` |

### 1.2 Hosting tetap Firebase

Nitro preset `firebase` (gen 2, Node 22), Firestore, Storage, Auth. Tidak ganti
backend. Implikasi penting:
- **Firebase Hosting hanya meneruskan cookie bernama `__session`** ke Cloud
  Functions/Run. Cookie sesi auth **wajib** bernama `__session` (lihat §6).
- `sharp` di-externalize (riwayat masalah deploy). Strategi gambar harus aman
  tanpa `sharp` di runtime (lihat §8).

### 1.3 Pola dari Fibidy yang diadopsi

- Pemisahan per "permukaan" (marketing, auth, dashboard) lewat **layout**, bukan folder route group.
- Page tipis — page hanya merakit section/komponen, logika di feature.
- Komponen dikelompokkan per domain (`marketing/`, `dashboard/`, `layout/`, `shared/`).
- Lapisan API terpisah (`lib/api/*` → `services/*`).
- Auth gate di level server memakai cookie (`fibidy_auth` → `__session`).
- `CookieConsent` global di root layout, simpan persetujuan di cookie 1 tahun.
- Header komentar file (`// File: ...`) dan dokumen "guide" sebagai SSOT.

---

## 2. Feature Freeze — Inventaris yang Wajib Tetap Sama

Semua yang ada di tabel ini **harus tetap berfungsi dengan URL yang sama** di
setiap akhir sesi. Pindah folder boleh, URL & perilaku tidak boleh berubah.

### 2.1 Rute publik (marketing)

| URL | File lama | Catatan |
|---|---|---|
| `/` | `pages/index.vue` | redirect → `/beranda` (pertahankan; jadikan `routeRules` redirect 301 di server) |
| `/beranda` | `pages/beranda/index.vue` | landing utama |
| `/profil` | `pages/profil/index.vue` | redirect → `/profil/tentang-ut` |
| `/profil/tentang-ut` | | |
| `/profil/tentang-ormawa` | | |
| `/profil/visi-misi` | | |
| `/profil/struktur-pengurus` | | baca Firestore (pengurus) |
| `/zona-kampus/akademik` · `/non-akademik` · `/ukm` · `/imf` · `/cari-teman` | | |
| `/media/artikel` · `/perlombaan` · `/laporan` · `/social-media` | | artikel dari Firestore |
| `/berita/[slug]` | | detail artikel via `server/api/articles/[slug].get.ts` |
| `/kontak/aspirasi` · `/pelaporan` · `/wa_prodi_2026_2` | | form & link WA |
| `/sandbox` | `pages/sandbox.vue` | halaman uji — lihat §13 |

### 2.2 Rute auth

| URL | Metode login |
|---|---|
| `/login/admin` | email+password, **passkey (WebAuthn)**, email-link mahasiswa (`localStorage.emailForSignIn`) |
| `/login/mahasiswa` | Google popup |

### 2.3 Rute dashboard (semua `middleware: 'auth'`, layout `admin`)

| URL | Akses |
|---|---|
| `/dashboard` | ADMIN, SUPER_ADMIN |
| `/dashboard/Highlight-terkini` (+ `/form`) | ADMIN, SUPER_ADMIN — **URL ber-huruf kapital, pertahankan** (lihat §13) |
| `/dashboard/users` | SUPER_ADMIN |
| `/dashboard/organizations` | SUPER_ADMIN |
| `/dashboard/admin-area` (+ `/struktur-pengurus`, `/kelola-user`) | legacy, ADMIN/SUPER_ADMIN, registrasi passkey |
| `/dashboard/mahasiswa` (+ `/edit-profil`) | mahasiswa |

### 2.4 Server API (Nitro) — kontrak request/response tidak boleh berubah

`POST /api/create-user`, `POST /api/delete-user`,
`/api/webauthn/{generate,verify}-{registration,authentication}`,
`GET /api/articles/[slug]`, `GET /api/__sitemap__/urls`.

### 2.5 Lain-lain yang dibekukan

- Skema Firestore (`users`, `organizations`, `articles`, `pengurus`, `activityLogs`,
  `passkeys`, `webauthn_challenges`, `webauthn_auth_challenges`) — lihat `DATABASE.md`.
  **Tidak ada migrasi data.**
- `firestore.rules`, `storage.rules`, `firebase.json` — boleh dipindah? **Tidak**,
  tetap di root (dibaca Firebase CLI).
- RBAC: `SUPER_ADMIN`, `ADMIN` + `access_modules[]` (`manage_articles`, `manage_users`, …),
  serta role `mahasiswa`. Normalisasi role lowercase tetap didukung.
- SEO: canonical, meta OG/Twitter, sitemap (exclude `/dashboard/**`, `/login/**`,
  `/sandbox`), Google Analytics, Google Site Verification.
- Rich text editor (TipTap), upload ke Firebase Storage, activity log.
- Palet brand: `admiral` (#1B365D), `lemon` (#FDE047) dan turunannya.

---

## 3. Golden Rules

> Langgar satu rule = sesi belum selesai.

### A. Rule Fitur

- **R1 — Zero feature change.** Tidak menambah, menghapus, atau mengubah perilaku
  fitur. Pengecualian *hanya* yang tertulis di Roadmap (auth cookie, tombol
  Dashboard, cookie banner, optimasi gambar) — dan itu pun tidak boleh mengubah
  alur login yang ada.
- **R2 — URL immutable.** Setiap URL di §2 tetap merespons sama. Pindah file ke
  folder lain tidak mengubah URL. Kalau ragu, cek `npx nuxi routes` /
  daftar rute dari build sebelum dan sesudah — **harus identik**.
- **R3 — Kontrak data immutable.** Nama koleksi, field Firestore, payload API
  tidak diubah. Refactor tipe boleh, bentuk data tidak.
- **R4 — Visual parity per fase.** Fase A struktur (S0–S5) = **tampilan identik**.
  Fase Kliping (S9–S11) = tampilan boleh "naik kelas" tapi layout, isi, warna
  brand, dan urutan konten tetap; setiap halaman dicek screenshot sebelum/sesudah.

### B. Rule Struktur

- **R5a — Maksimal 3 level di dalam `app/`** (kecuali `pages/` yang mengikuti URL dan `components/ui/` milik Kliping). Folder fitur **datar**: tanpa subfolder `components/`/`composables/`/`services/`.
- **R5b — Naik ke `components/shared` hanya bila dipakai ≥ 2 fitur.** Selain itu tetap di folder fiturnya.
- **R5c — Konten statis** (teks halaman, daftar lomba/laporan/UKM, link WA) di `features/<x>/<x>.data.ts`, bukan di template.
- **R5d — Nama file kebab-case** (`nama-file.vue`, `use-nama.ts`, `nama.service.ts`, `nama.data.ts`). Pengecualian hanya `components/ui/**` (Kliping) dan folder page yang terikat URL lama.
- **R5 — Page tipis.** File di `pages/` maksimal ±80 baris: `definePageMeta`,
  `useSeoMeta`, fetch data (`useAsyncData`), lalu merakit komponen. Tidak ada
  logika bisnis, tidak ada panggilan Firestore langsung.
- **R6 — Komponen maksimal ±250 baris.** Lebih dari itu → pecah jadi sub-komponen
  di folder fitur yang sama.
- **R7 — Arah dependensi satu arah:**
  `pages → features → (components/shared, components/ui, composables, services, stores) → utils/types`.
  `components/ui` (Kliping) tidak boleh import apa pun dari app. Fitur A tidak
  boleh import isi internal fitur B (lewat `index.ts` publiknya saja).
- **R8 — Firebase hanya di `*.service.ts`, `services/firebase.ts`, dan `server/`.** Komponen & page tidak
  boleh import `firebase/*` langsung. Semua akses lewat composable → service.
- **R9 — Satu sumber kebenaran.** Konstanta (menu navbar, menu sidebar, daftar
  modul akses, link WA) di `app/constants/*` — bukan di-hardcode di template.
  Menu navbar desktop & mobile membaca array yang sama.
- **R10 — Tidak ada file "lepas" di root.** Script utilitas (`create-admin.js`,
  `seed-*.js`, `fix-deploy.*`, `remove-sharp.py`, `add-*.js/.cjs`, `deploy.bat`)
  pindah ke `scripts/` dengan README singkat. `.commit_msg.txt`, `.firebase/`
  keluar dari repo (gitignore).
- **R11 — `components/ui/` milik Kliping.** Ditambah lewat CLI
  (`npx kliping@latest add <item>`), tidak disunting manual kecuali bug — dan
  kalau disunting, catat di `app/components/ui/PATCHES.md`.

### C. Rule Rendering & Performa

- **R12 — Setiap rute punya mode render eksplisit** di `routeRules` (lihat §5).
  Tidak ada rute "kebetulan SSR".
- **R13 — Data publik di-fetch di server.** Halaman publik memakai
  `useAsyncData`/`useFetch` (bukan `onMounted` + Firestore client) supaya HTML
  sudah berisi konten (SEO) dan tidak ada layar kosong.
- **R14 — Lazy by default.** Komponen berat (TipTap, tabel besar, modal, peta,
  chart) di-load dengan prefix `Lazy` / `defineAsyncComponent`. Firebase SDK
  di-import dinamis di jalur yang jarang (sudah dilakukan di login — pertahankan).
- **R15 — Tidak ada `<img>` mentah** di luar komponen `AppImage`. Semua gambar
  punya `width`/`height` (atau `aspect-ratio`), `alt`, dan `loading="lazy"`
  kecuali gambar LCP (hero/logo navbar) yang `fetchpriority="high"` + preload.

### D. Rule Auth & Privasi

- **R16 — Sesi di cookie httpOnly `__session`**, bukan `sessionStorage`/`localStorage`.
  Token tidak pernah bisa dibaca JavaScript (lihat §6).
- **R17 — Gate dua lapis:** server (cookie, sebelum render) + client
  (middleware route, untuk navigasi SPA). RBAC final tetap di `firestore.rules`.
- **R18 — Cookie non-esensial (Analytics) menunggu persetujuan** di cookie banner.
  Cookie esensial (`__session`, `ormawa_consent`) tidak butuh persetujuan tapi
  disebut di banner.
- **R19 — Secret hanya di server.** `FIREBASE_ADMIN_KEY` tetap di `runtimeConfig`
  privat. Tidak ada kredensial di repo.

### E. Rule Proses

- **R20 — Satu sesi = satu tujuan = satu PR kecil** yang bisa di-revert sendiri.
- **R21 — Setiap sesi lulus:** `npm run build`, `npm run typecheck`, `npm run lint`,
  route parity check, dan smoke test manual alur login + 1 CRUD.
- **R22 — Commit konvensional:** `refactor(scope): ...`, `feat(auth): ...`,
  `chore(tooling): ...`, `perf(image): ...`. Satu commit = satu langkah logis.
- **R23 — Update file ini** (Progress Tracker + catatan) di akhir setiap sesi.

---

## 4. Struktur Folder Target

> **Prinsip: tidak terlalu nested, tidak monolith.**
> Maksimal **3 level** di dalam `app/` (pengecualian: `pages/` mengikuti URL,
> `components/ui/` mengikuti Kliping). Satu file = satu tanggung jawab.

| | ❌ Terlalu nested | ❌ Monolith (baseline) | ✅ Target |
|---|---|---|---|
| Contoh | `features/articles/components/form/fields/cover-field.vue` | `pages/dashboard/admin-area/index.vue` 743 baris | `features/articles/article-form.vue` |
| Kedalaman | 5–6 level | 2 level, isi gemuk | ≤ 3 level |

**Dua keputusan penting:**
1. **Tanpa route group `(marketing)/(auth)/(dashboard)`.** Di Nuxt, layout dipilih
   lewat `definePageMeta({ layout })`, bukan folder. Group hanya menambah satu level
   tanpa manfaat. `pages/` = cermin URL apa adanya.
2. **Folder fitur DATAR.** Tidak ada subfolder `components/` `composables/` `services/`
   di dalam fitur — jenis file terbaca dari namanya (semua kebab-case):
   `article-card.vue` · `use-articles.ts` · `articles.service.ts` · `media.data.ts`.

```
ut-ormawa-refactor/
├── app/
│   ├── app.vue                      # NuxtLayout + NuxtPage + CookieConsent + Toaster
│   ├── error.vue                    # 404 / 500
│   ├── assets/css/tailwind.css      # Tailwind v4 + token Kliping + brand admiral/lemon
│   │
│   ├── pages/                       # ① TIPIS — routing + SEO + fetch + rakit komponen
│   │   ├── index.vue                #   redirect → /beranda
│   │   ├── beranda/index.vue
│   │   ├── profil.vue               #   parent route (wrapper + <NuxtPage/>)
│   │   ├── profil/
│   │   │   ├── index.vue · tentang-ut.vue · tentang-ormawa.vue
│   │   │   └── visi-misi.vue · struktur-pengurus.vue
│   │   ├── zona-kampus/  akademik · non-akademik · ukm · imf · cari-teman (.vue)
│   │   ├── media/        artikel · perlombaan · laporan · social-media (.vue)
│   │   ├── berita/[slug].vue
│   │   ├── kontak/       aspirasi · pelaporan · wa_prodi_2026_2 (.vue)
│   │   ├── login/        admin · mahasiswa (.vue)
│   │   ├── dashboard/
│   │   │   ├── index.vue
│   │   │   ├── Highlight-terkini/index.vue · form.vue
│   │   │   ├── users/index.vue · organizations/index.vue
│   │   │   ├── admin-area/index.vue · struktur-pengurus.vue · kelola-user.vue
│   │   │   └── mahasiswa/index.vue · edit-profil.vue
│   │   └── sandbox.vue
│   │
│   ├── features/                    # ② INTI — satu folder per domain, isi DATAR
│   │   ├── auth/
│   │   │   ├── login-admin-form.vue · login-passkey.vue · login-email-link.vue · login-google.vue
│   │   │   ├── passkey-register.vue  #   dari admin-area/index.vue
│   │   │   ├── use-auth.ts           #   user, role, login*, logout(), hasAccess()
│   │   │   ├── auth.service.ts      #   firebase/auth + /api/webauthn + /api/auth/*
│   │   │   └── index.ts
│   │   ├── articles/                #   Highlight-terkini, media/artikel, berita/[slug]
│   │   │   ├── article-card.vue · article-grid.vue · article-detail.vue
│   │   │   ├── article-table.vue · article-form.vue
│   │   │   └── use-articles.ts · articles.service.ts · index.ts
│   │   ├── organizations/
│   │   │   ├── organization-table.vue · organization-dialog.vue
│   │   │   └── use-organizations.ts · organizations.service.ts · index.ts
│   │   ├── pengurus/
│   │   │   ├── pengurus-chart.vue (publik) · pengurus-editor.vue (admin)
│   │   │   └── use-pengurus.ts · pengurus.service.ts · index.ts
│   │   ├── users/
│   │   │   ├── user-table.vue · user-dialog.vue · activity-log-list.vue
│   │   │   └── use-users.ts · use-activity-log.ts · users.service.ts · index.ts
│   │   ├── mahasiswa/
│   │   │   └── mahasiswa-profile-card.vue · mahasiswa-profile-form.vue · index.ts
│   │   ├── landing/                 #   section beranda: hero-section.vue · …-section.vue
│   │   ├── profil/                  #   tentang-ut.vue · tentang-ormawa.vue · visi-misi.vue · profil.data.ts
│   │   ├── zona-kampus/             #   program-list.vue · cari-teman-form.vue · zona-kampus.data.ts
│   │   ├── media/                   #   lomba-list.vue · laporan-list.vue · social-links.vue · media.data.ts
│   │   └── kontak/                  #   aspirasi-form.vue · pelaporan-form.vue · wa-prodi-list.vue · kontak.data.ts
│   │
│   ├── components/                  # ③ LINTAS FITUR saja
│   │   ├── ui/                      #   🔒 KLIPING (via CLI)
│   │   ├── layout/                  #   datar
│   │   │   ├── site-header.vue · site-mobile-nav.vue · site-footer.vue · auth-action.vue
│   │   │   └── dashboard-sidebar.vue · dashboard-topbar.vue · nav-user.vue
│   │   └── shared/
│   │       ├── app-image.vue · cookie-consent.vue · rich-text-editor.vue
│   │       └── page-header.vue · empty-state.vue · confirm-dialog.vue
│   │
│   ├── layouts/        default.vue · auth.vue · dashboard.vue
│   ├── middleware/     auth.ts
│   ├── plugins/        firebase.client.ts · auth-session.server.ts · ssr-width.ts · analytics.client.ts
│   ├── composables/    use-consent.ts · use-upload.ts        # (eks useStorage)
│   ├── services/       firebase.ts                         # satu-satunya init Firebase client
│   ├── stores/         auth.ts                             # Pinia
│   ├── constants/      nav.ts · dashboard-menu.ts · access-modules.ts · cookies.ts
│   ├── types/          database.ts
│   ├── utils/          role.ts · date.ts · slug.ts
│   └── lib/utils.ts    # cn() — dibuat Kliping
│
├── server/
│   ├── api/                         # path file = URL → struktur lama TETAP
│   │   ├── auth/  session.post.ts · session.delete.ts · me.get.ts   # 🆕 (Fase B)
│   │   ├── articles/[slug].get.ts
│   │   ├── webauthn/ (4 file tetap)
│   │   ├── create-user.post.ts · delete-user.post.ts
│   │   └── __sitemap__/urls.ts
│   ├── middleware/session.ts        # 🆕 (Fase B) baca cookie __session
│   └── utils/      firebaseAdmin.ts · session.ts · requireRole.ts
│
├── public/img/                      # kebab-case + .webp
├── scripts/                         # utilitas (pindahan dari root)
├── docs/                            # DATABASE.md, ARCHITECTURE.md
├── tests/                           # route parity, screenshot, smoke
└── nuxt.config.ts · components.json · firebase.json · firestore.rules · storage.rules · GOLDEN-PLAN.md
```

### 4.1 Contoh page tipis

`pages/dashboard/organizations/index.vue` (baseline 608 baris) →

```vue
<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useSeoMeta({ title: 'Kelola Organisasi' })
</script>

<template>
  <PageHeader title="Organisasi" description="Kelola himpunan & UKM" />
  <OrganizationTable />
</template>
```

`organization-table.vue` (UI) → `use-organizations.ts` (state/loading/error) →
`organizations.service.ts` (query Firestore saja).

### 4.2 Auto-import

```ts
// nuxt.config.ts
components: [
  { path: '~/components', pathPrefix: false },
  { path: '~/features', pathPrefix: false, extensions: ['.vue'] },
],
imports: { dirs: ['features/*/use-*.ts', 'stores', 'utils', 'constants'] },
```

Karena `pathPrefix: false`, **nama file komponen harus unik di seluruh app** — beri awalan domain
(`article-card.vue`, `user-table.vue`, `site-header.vue`). Nuxt akan error/peringatan bila ada nama ganda.

`*.service.ts` dan `*.data.ts` **tidak** di-auto-import — import eksplisit
supaya dependensi Firebase & sumber konten terlihat jelas (R8).

### 4.3 Peta pemindahan baseline → target

| Baseline | Target |
|---|---|
| `components/Navbar.vue` (551) | `components/layout/site-header.vue` + `site-mobile-nav.vue` + `auth-action.vue` + `constants/nav.ts` |
| `components/Footer.vue` | `components/layout/site-footer.vue` |
| `components/admin/Sidebar.vue` · `HeaderProfile.vue` | `components/layout/dashboard-sidebar.vue` · `nav-user.vue` + `constants/dashboard-menu.ts` |
| `components/RichTextEditor.vue` | `components/shared/rich-text-editor.vue` |
| `composables/useArticles.ts` (375) | `features/articles/use-articles.ts` + `articles.service.ts` |
| `composables/useOrganizations.ts` | `features/organizations/…` |
| `composables/usePengurus.ts` | `features/pengurus/…` |
| `composables/useUsers.ts` · `useActivityLog.ts` | `features/users/…` |
| `composables/useStorage.ts` | `composables/use-upload.ts` |
| `plugins/firebase.client.ts` (init + auth listener) | `services/firebase.ts` + `stores/auth.ts` + plugin tipis |
| `middleware/auth.ts` (`normalizeRole`) | tetap + `utils/role.ts` |
| `layouts/admin.vue` | `layouts/dashboard.vue` (alias `admin` dijaga selama transisi) |
| `types/database.types.ts` | `types/database.ts` |
| isi `pages/**` > 80 baris | komponen di `features/<domain>/` + konten di `*.data.ts` |
| `create-admin.js`, `seed-*.js`, `add-*`, `fix-deploy.*`, `remove-sharp.py`, `deploy.bat` | `scripts/` |

---

## 5. Strategi Rendering — SSR / SSG / ISR / SPA

Semua dideklarasikan di **satu tempat**: `routeRules` di `nuxt.config.ts`.

| Rute | Mode | Alasan |
|---|---|---|
| `/` | `redirect: { to: '/beranda', statusCode: 301 }` | tidak perlu render |
| `/profil` | `redirect: '/profil/tentang-ut'` | |
| `/profil/tentang-ut`, `/tentang-ormawa`, `/visi-misi` | **SSG** `prerender: true` | konten statis |
| `/zona-kampus/akademik`, `/non-akademik`, `/ukm`, `/imf` | **SSG** `prerender: true` | konten statis |
| `/media/social-media`, `/kontak/wa_prodi_2026_2` | **SSG** | link statis |
| `/beranda` | **ISR** `swr: 600` | memuat highlight artikel terbaru |
| `/profil/struktur-pengurus` | **ISR** `swr: 3600` | data pengurus jarang berubah |
| `/media/artikel`, `/perlombaan`, `/laporan` | **ISR** `swr: 600` | daftar artikel |
| `/berita/**` | **ISR** `swr: 3600` | detail artikel, SEO penting |
| `/zona-kampus/cari-teman`, `/kontak/aspirasi`, `/kontak/pelaporan` | **SSR** (shell) + form client | interaktif |
| `/login/**` | **SSR**, `robots: false` | perlu cek cookie → tombol/redirect |
| `/dashboard/**` | **SPA** `ssr: false`, `robots: false`, `headers: { 'cache-control': 'no-store' }` | data privat, Firestore client |
| `/sandbox` | `ssr: false`, `robots: false` | dev only |
| `/api/__sitemap__/**` | `swr: 3600` | |

Catatan implementasi:
- ISR/SWR di preset Firebase: Nitro menyetel `cache-control: s-maxage, stale-while-revalidate`,
  dan **Firebase Hosting CDN** yang menyimpan cache-nya. Verifikasi header di sesi S6.
- Halaman ISR yang menampilkan **tombol Dashboard** tidak boleh di-cache dengan
  isi spesifik user → bagian auth di navbar dirender **client-only** (`<ClientOnly>`
  dengan fallback tombol "Login" berukuran sama, tanpa layout shift), atau lewat
  cookie hint (lihat §6.4). Halaman SSR biasa bisa langsung membaca `event.context.user`.
- Data publik dibaca lewat `server/api/*` (Firebase Admin) atau Firestore REST
  di server — bukan Firestore client SDK — supaya bisa SSR & di-cache.

---

## 6. Autentikasi & Sesi — Cookie, Bukan Login Ulang

### 6.1 Masalah sekarang

- Status login hanya diketahui di **client** (`onAuthStateChanged` di
  `firebase.client.ts`). Server tidak tahu siapa user → tidak bisa SSR navbar
  yang benar, middleware harus menunggu sampai 5 detik.
- Persistensi = IndexedDB bawaan Firebase. Itu memang sudah "tidak login ulang",
  tapi landing page tidak bisa tahu user sudah login sebelum JS + Firebase SDK
  termuat → tombol berkedip "Login" lalu berubah.

### 6.2 Keputusan: Firebase **Session Cookie** `__session`

> ❌ `sessionStorage` — hilang saat tab ditutup, tidak terbaca server.
> ❌ `localStorage` — terbaca JS (risiko XSS), tidak terbaca server.
> ✅ **Cookie `__session`** — `httpOnly`, `Secure`, `SameSite=Lax`, `Path=/`,
> umur 5–14 hari (batas Firebase), dibaca server di setiap request.
> Nama **wajib** `__session` karena Firebase Hosting membuang cookie lain.

Alur (tidak mengubah 4 metode login yang sudah ada — hanya **menambah** langkah setelahnya):

```
[Login apa pun: password / passkey / email-link / Google]
        │  (kode login lama TIDAK diubah)
        ▼
firebaseUser.getIdToken()
        │
        ▼
POST /api/auth/session { idToken }          ← 🆕
  server: adminAuth.verifyIdToken(idToken)   (cek auth_time < 5 menit)
          adminAuth.createSessionCookie(idToken, { expiresIn: 7 hari })
          setCookie('__session', ..., { httpOnly, secure, sameSite: 'lax' })
        │
        ▼
navigateTo(tujuan lama: /dashboard atau /dashboard/mahasiswa)   ← tetap
```

Setiap request:

```
server/middleware/session.ts
  baca __session → adminAuth.verifySessionCookie(cookie)   (cache in-memory ±5 menit)
  → event.context.user = { uid, email, role, accessModules, name } | null
plugins/auth-session.server.ts
  → isi Pinia auth store dari event.context.user  (ter-hydrate ke client, tanpa flicker)
plugins/firebase.client.ts
  → onAuthStateChanged tetap jalan (Firestore client butuh user Firebase);
    jika Firebase user null tapi cookie ada → panggil DELETE /api/auth/session (sinkron logout)
```

Logout (Sidebar, HeaderProfile, admin layout, dashboard mahasiswa):
`signOut($auth)` **+** `DELETE /api/auth/session` (hapus cookie + `revokeRefreshTokens`) —
dibungkus satu fungsi `useAuth().logout()` supaya 4 tempat logout lama memanggil hal yang sama.

### 6.3 Gate

| Lapisan | File | Tugas |
|---|---|---|
| Server | `server/middleware/session.ts` | isi `event.context.user` (tidak redirect — dashboard SPA) |
| Client route | `app/middleware/auth.ts` | logika **persis sama** dengan versi lama (SUPER_ADMIN/ADMIN/legacy admin-area), tapi baca dari auth store → tidak perlu menunggu 5 detik bila store sudah ter-hydrate dari cookie |
| API | `server/utils/requireRole.ts` | `create-user`/`delete-user` cek role dari cookie/ID token |
| Data | `firestore.rules` | tetap — final authority |

### 6.4 Tombol **Dashboard** di landing page

`components/layout/auth-action.vue` — satu komponen, dipakai navbar
desktop & mobile (menggantikan 2 tombol `to="/login/admin"` di Navbar.vue):

| State | Tampil |
|---|---|
| Belum login | tombol **Login** → `/login/admin` (perilaku lama) |
| Login sebagai ADMIN/SUPER_ADMIN | tombol **Dashboard** → `/dashboard` + avatar/nama |
| Login sebagai mahasiswa | tombol **Dashboard** → `/dashboard/mahasiswa` |
| Belum diketahui (halaman ISR ter-cache) | skeleton selebar tombol → lalu salah satu di atas |

Agar halaman ISR tetap bisa di-cache publik, `AuthAction` membaca
`GET /api/auth/me` (atau cookie hint non-httpOnly `ormawa_auth_hint=1` berisi
hanya flag + role, tanpa token) di client. Halaman SSR non-cache langsung
memakai store hasil hydrate.

Juga: `/login/*` ketika sudah login → tampilkan kartu "Anda sudah masuk —
[Buka Dashboard]" (bukan redirect paksa, supaya alur lama tidak berubah). Lihat §13.

---

## 7. Cookie Consent Banner

Diadaptasi dari `Fibidy-Client/src/components/shared/cookie-consent.tsx`, dibangun
dengan Kliping (`banner-03` atau `card` + `button`, bukan modal penuh supaya
tidak menghalangi landing):

- File: `app/components/shared/cookie-consent.vue`, dirender sekali di `app.vue`
  dalam `<ClientOnly>` (hindari hydration mismatch), muncul setelah 600 ms.
- Cookie: `ormawa_consent` = `all` | `essential`, `max-age` 1 tahun, `SameSite=Lax`,
  `Path=/` — dibaca via `useCookie('ormawa_consent')` (SSR-aware).
- Tombol: **Terima semua** · **Hanya yang penting** · tautan "Pelajari" (halaman
  kebijakan sederhana atau anchor di footer — tanpa menambah fitur besar).
- `plugins/analytics.client.ts` **hanya** memuat gtag bila `ormawa_consent === 'all'`;
  watcher memuatnya saat user menerima tanpa reload.
- Teks bahasa Indonesia, menyebut: `__session` (login), `ormawa_consent` (preferensi), Google Analytics.
- Tidak tampil di `/dashboard/**` jika consent sudah ada; z-index di bawah dialog Kliping.

---

## 8. Gambar — Lazy Load & Optimasi

Kondisi: 23 file memakai `<img>` mentah, 0 `NuxtImg`; `public/img` 4,9 MB; ada
nama file berspasi (`Background ormawa.png`, `ZAENAL ARIFIN.jpg`,
`Favicon bulat.png`); `sharp` di-externalize di Nitro.

Strategi:

1. **`app-image.vue`** (`components/shared/`) — satu-satunya pintu gambar (R15).
   Props: `src, alt, width, height, sizes, priority, fit`. Di dalamnya `<NuxtImg>`:
   - default `loading="lazy"` `decoding="async"`, `format="webp"`, `placeholder` blur
   - `priority` → `loading="eager"` `fetchpriority="high"` + `preload`
2. **Gambar statis (`public/img`)**: konversi sekali ke WebP/AVIF lewat
   `scripts/optimize-images.mjs` (dijalankan di mesin dev, hasil di-commit) →
   runtime tidak butuh `sharp`. Untuk halaman SSG, `@nuxt/image` (IPX) boleh
   bekerja **saat prerender** saja.
3. **Gambar Firebase Storage** (cover artikel, logo organisasi, foto pengurus):
   provider kustom tipis di `@nuxt/image` yang hanya menambah atribut (tanpa
   transformasi), atau aktifkan ekstensi Firebase *Resize Images* (opsional, di
   luar scope "tanpa ubah fitur" → catat sebagai saran).
4. Rename file berspasi → kebab-case, update semua referensi dalam **satu commit**.
5. Komponen berat: `LazyRichTextEditor`, `LazyArticleForm`, modal → lazy.
   `<NuxtLink>` prefetch tetap default.
6. Font: pakai `@nuxt/fonts` (self-host, `font-display: swap`) bila Kliping init memilih font.

Target: LCP < 2,5 s di `/beranda` (mobile, Lighthouse), CLS < 0,1, total gambar di atas lipatan < 300 KB.

---

## 9. Integrasi Kliping UI

### 9.1 Setup (sesi S9)

```bash
# Tailwind v3 (@nuxtjs/tailwindcss) → Tailwind v4 (@tailwindcss/vite)
npm remove @nuxtjs/tailwindcss tailwindcss
npx kliping@latest init           # memasang tailwindcss v4, @tailwindcss/vite, shadcn-nuxt,
                                   # membuat app/assets/css/tailwind.css, components.json, lib/utils.ts
```

`nuxt.config.ts`:

```ts
modules: ['shadcn-nuxt', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/sitemap'],
shadcn: { prefix: '', componentDir: '@/components/ui' },
```

Plugin wajib `app/plugins/ssr-width.ts`:

```ts
import { provideSSRWidth } from '@vueuse/core'
export default defineNuxtPlugin((nuxtApp) => provideSSRWidth(1024, nuxtApp.vueApp))
```

### 9.2 Token tema = brand Ormawa

Di `tailwind.css` (Tailwind v4 `@theme`), petakan palet lama supaya kelas lama
(`bg-admiral`, `text-lemon`, `bg-admin-card`) **tetap jalan**:

```css
@theme inline {
  --color-admiral-light: #2A4365; --color-admiral: #1B365D; --color-admiral-dark: #112240;
  --color-lemon-light: #FEF08A;   --color-lemon: #FDE047;   --color-lemon-dark: #EAB308;
  --color-admin-bg: #f8fafc; --color-admin-card: #ffffff; --color-admin-accent: #4f46e5; /* … */
}
:root {
  --primary: #1B365D;            /* admiral */
  --primary-foreground: #ffffff;
  --accent: #FDE047;             /* lemon */
  --accent-foreground: #112240;
  /* sisanya default Kliping (neutral) */
}
```

Jalankan `npx @tailwindcss/upgrade` untuk kelas yang berganti nama di v4
(`shadow-sm`→`shadow-xs`, `rounded`→`rounded-sm`, dll.) **lalu** cek visual.

### 9.3 Peta komponen lama → Kliping

| Lama | Kliping | Sesi |
|---|---|---|
| Tombol/inputs ad-hoc Tailwind | `button`, `input`, `textarea`, `label`, `field`, `select`, `checkbox`, `switch` | S10 |
| Kartu konten | `card`, `badge`, `avatar`, `skeleton`, `empty` | S10 |
| Alert/konfirmasi `confirm()`/`alert()` | `alert-dialog`, `sonner` (toast) | S10 |
| Modal form dashboard | `dialog`, `sheet`, `drawer` (mobile) | S11 |
| Tabel users/organizations/artikel | `table` (+ `@tanstack/vue-table` bila perlu sort/filter yang **sudah ada**) | S11 |
| `Navbar.vue` (dropdown desktop + menu mobile) | block `navbar-03` (nested dropdown) + `navigation-menu`, `sheet` | S10 |
| `Footer.vue` | block `footer-0x` yang paling mirip | S10 |
| `admin/Sidebar.vue` + `HeaderProfile.vue` | block `sidebar-07` (collapse to icons) + `dropdown-menu` | S11 |
| Halaman login | block `login-03`/`login-04` (form tetap, 3 metode tetap) | S11 |
| Halaman 404 | block `not-found-01` → `app/error.vue` | S11 |
| Cookie banner | block `banner-03` atau `card` + `button` | S8 |
| Tab/accordion di halaman profil/zona kampus | `tabs`, `accordion` | S10 |
| Ikon SVG inline | `@lucide/vue` (iconLibrary Kliping) — kecuali logo brand (WhatsApp dll.) tetap SVG | S10–S11 |

Aturan pakai block Kliping: block = **titik awal**. Isi (teks, link, menu)
selalu dari `app/constants/*` dan data lama; jangan ada teks contoh tersisa.

---

## 10. Konvensi Kode

| Hal | Aturan |
|---|---|
| Bahasa | TypeScript `strict`, `<script setup lang="ts">` di semua SFC |
| Urutan SFC | `<script setup>` → `<template>` → `<style scoped>` (opsional, hindari) |
| Nama file | **kebab-case untuk SEMUA file buatan kita**: `article-card.vue`, `use-articles.ts`, `articles.service.ts`, `media.data.ts`, `site-header.vue` |
| Nama komponen di template | tetap PascalCase — Nuxt otomatis mengubah `article-card.vue` jadi `<ArticleCard />` |
| Nama export | composable `useArticles` (camelCase) dari file `use-articles.ts`; service ekspor fungsi murni (tanpa state Vue) |
| Pengecualian | `components/ui/**` (gaya Kliping, dari CLI, PascalCase); folder `pages/` yang terikat URL lama (`Highlight-terkini`, `wa_prodi_2026_2`) |
| Folder rute | ikut URL lama apa adanya (termasuk `Highlight-terkini`, `wa_prodi_2026_2`) |
| Props/emit | `defineProps<…>()` + `defineEmits<…>()` bertipe |
| State global | Pinia (`stores/`) — `useState` hanya untuk hal kecil SSR-safe |
| Fetch | `useAsyncData(key, fn)` dengan key unik; `$fetch` untuk mutasi |
| Error | `try/catch` di service → lempar `AppError`; UI tampilkan via `sonner` |
| Komentar | Header `// File: …` + alasan "kenapa", bukan "apa" (gaya Fibidy) |
| Lint/format | ESLint `@nuxt/eslint` + Prettier (no semicolon, single quote — gaya kode lama) |
| Import | alias `~/` (app) dan `~~/` (root); `@/` untuk komponen Kliping |

---

## 11. Roadmap Per Sesi

> Setiap sesi ±1 PR. **DoD** = Definition of Done (semua wajib).
> **Fase A = refactor struktur** (tampilan & perilaku identik, screenshot sama).
> **Fase B = perbaikan** (auth cookie, tombol Dashboard, cookie banner, Kliping, gambar).
> Fase B baru boleh dimulai setelah Fase A selesai.

### FASE A — Refactor Struktur (zero visual & behavior change)

#### S0 · Bootstrap baseline
- Salin seluruh source `ormawautsby` (`main`) ke repo ini apa adanya → commit `chore: import baseline from ormawautsby`.
- `.gitignore`: `.firebase/`, `.output/`, `.nuxt/`, `.commit_msg.txt`, `.env`.
- Route manifest baseline → `tests/baseline/routes.json` (`npm run test:routes`).
- Screenshot baseline rute publik + login (desktop & mobile) → `tests/baseline/screens/` (`npm run test:screens`).
  Butuh `npm run build:test` (preset node-server) dulu. Tanpa env Firebase, halaman data tampil *empty state* — memang disengaja supaya baseline deterministik.
- **DoD:** `npm run build` sukses; manifest & screenshot ada.

#### S1 · Tooling & kebersihan root
- `@nuxt/eslint` + Prettier + `vue-tsc` (`typecheck`), script `lint`, `format`.
- Script lepas → `scripts/` + `scripts/README.md` (R10). `DATABASE.md` → `docs/`.
- `README.md` asli: dev, env, deploy.
- CI job `check` (lint + typecheck + build + route parity) di PR; deploy tetap hanya `main`.
- **DoD:** CI hijau; root hanya config; `app/` tidak tersentuh.
- **Catatan hasil S1:**
  - Lint: aturan gaya yang dilanggar baseline diturunkan ke `warn` (`eslint.config.mjs`, blok `ormawa/baseline-relaxed`). **Setiap file yang dipindah/dipecah di S2–S5 wajib 0 warning.** Di akhir S5 blok itu dihapus (kembali `error`).
  - Typecheck: `tests/typecheck.mjs` = ratchet terhadap `tests/baseline/typecheck.json`. File yang dipindah dihitung sebagai file baru → harus 0 error. `RichTextEditor.vue` (7 error) disebabkan dua versi `@tiptap/core` (nested di `@tiptap/starter-kit`) — selesaikan dengan menyamakan versi paket TipTap saat dipindah di S2.
  - Prettier: **jangan** format seluruh repo sekaligus (diff raksasa, susah review). Format hanya file yang disentuh: `npm run format -- <path>`.
  - Screenshot parity tidak jalan di CI (render font beda antar mesin) — wajib dijalankan lokal tiap sesi.

#### S2 · Fondasi: constants, types, utils, services, store, layout
- `constants/nav.ts` (satu array desktop+mobile), `dashboard-menu.ts`, `access-modules.ts`.
- `utils/role.ts` (`normalizeRole`), `date.ts`, `slug.ts`; `types/database.ts` (+ role `mahasiswa` di tipe).
- `services/firebase.ts` (lazy getter) + `stores/auth.ts` (Pinia) — `useState('firebaseUser'|'userRole'|…)` lama tetap diisi selama transisi.
- `Navbar`/`Footer`/`Sidebar`/`HeaderProfile` → `components/layout/*` (dipecah, markup identik). `layouts/admin.vue` → `dashboard.vue`.
- **DoD:** route parity identik; screenshot identik; tidak ada array menu di template.
- **Catatan hasil S2:**
  - Infrastruktur tes: `tests/layer` (aktif hanya bila `ORMAWA_TEST=1`, yaitu `npm run build:test`) mengisi state auth dari cookie `__ormawa_test_auth`, sehingga dashboard bisa difoto. `test:screens` kini 71 skenario: 44 rute publik/login, hover tiap dropdown, menu mobile terbuka penuh, 8 halaman dashboard sebagai SUPER_ADMIN, dashboard ADMIN terbatas, dropdown profil, dan sidebar mobile. Baseline diambil dari kode **sebelum** refactor.
  - `stores/auth.ts` membungkus ref `useState` lama (bukan menggantikan), jadi halaman lama tetap sinkron. `useState('firebaseUser'|…)` mentah dihapus bertahap di S3–S5.
  - Layout `admin` langsung di-rename ke `dashboard` di semua page (tanpa alias).
  - `utils/date.ts`, `utils/slug.ts`, `constants/access-modules.ts` **belum** dibuat — dibuat saat ada pemakainya (S3–S5), bukan file kosong.
  - Ikon SVG navigasi disatukan di `constants/icons.ts` + `nav-icon.vue` (path disalin otomatis dari file lama); diganti Lucide di S10.
  - `RichTextEditor`: `setContent(value, false)` → `setContent(value)` — di TipTap v3 argumen `false` memang diabaikan, perilaku runtime sama.

#### S3 · Feature data layer
- Bentuk `features/*`; pindah & pecah composables jadi `use-x.ts` + `x.service.ts` (§4.3).
- Semua akses Firestore dari pages dashboard (`getDocs` di admin-area, mahasiswa) pindah ke service.
- **DoD:** `grep "firebase/" app/pages app/components` = 0; semua CRUD dashboard di-smoke-test.
- **Catatan hasil S3:**
  - **E2E di Firebase Emulator Suite** (`npm run build:test && npm run test:e2e`, butuh Java 11+). 17 skenario menjalankan UI asli terhadap Auth/Firestore/Storage Emulator dengan `firestore.rules` & `storage.rules` asli: login password / salah password / tanpa dokumen / ADMIN terbatas / **magic link** (oobCode emulator) / **passkey** (authenticator virtual Chromium), CRUD organisasi + upload logo, CRUD artikel + upload cover + halaman publik (termasuk SSR `/berita` via server API), pembatasan organisasi ADMIN, users via `/api/create-user` & `/api/delete-user`, editor struktur pengurus + halaman publiknya, admin-area & kelola-user lama, profil mahasiswa. Semua lolos di kode **sebelum** S3, lalu tetap lolos sesudahnya.
  - Emulator hanya aktif bila `runtimeConfig.public.firebaseEmulatorHost` diisi — key itu hanya dideklarasikan `tests/layer`, jadi build produksi tidak terpengaruh.
  - Server E2E berjalan di `http://localhost:3000` karena WebAuthn di server di-hardcode ke origin itu (T20).
  - Halaman masih memegang orkestrasi (urutan panggilan, pesan error) — sengaja, supaya diff S3 hanya "pindah akses data". Memecah halaman jadi komponen fitur = S4/S5.
  - Pemanggilan Firebase di service kini import statis (dulu `await import()` di tiap fungsi — tidak memecah bundle karena plugin sudah meng-import SDK yang sama).
  - Fungsi yang tidak dipakai (`getUkmArticles`, `updateArticleStatus`, `getOrganizationById` lama) dipertahankan; pembersihan kode mati bukan bagian Fase A.

#### S4 · Pecah pages publik
- `beranda` → `features/landing/*Section.vue`; profil, zona-kampus, media, kontak → komponen + `*.data.ts`; `berita/[slug]` & `media/artikel` → `features/articles`; struktur pengurus → `features/pengurus`.
- **DoD:** semua page publik ≤ 80 baris; screenshot identik.
- **Catatan hasil S4:**
  - Pola page publik: `<main>` + `<SiteHeader />` + 1 komponen fitur + `<SiteFooter />` + `useSeoMeta`. Markup dipindah **verbatim** (dipotong per rentang baris oleh skrip), bukan diketik ulang.
  - Komponen fitur di-auto-import dari `app/features/**` (`pathPrefix: false`), composable `features/*/use-*.ts`.
  - **Daftar** (UKM, HIMA, lomba, laporan, prodi WA, kategori, statistik beranda, profil contoh) → `<fitur>.data.ts`. Teks prosa satu kali pakai tetap di template komponennya — memecahnya ke data tidak menambah kejelasan.
  - CSS panjang (tentang-ut, tentang-ormawa, pengurus-chart) → `<style scoped src="./x.css">`: tetap scoped, SFC jadi pendek.
  - `/berita/[slug]`: fetch SSR + fallback client + SEO/JSON-LD → `features/articles/use-article-detail.ts`; tampilan → `article-detail.vue`. E2E kini juga mengunci `<meta property="article:author">` & JSON-LD (diverifikasi dulu di build lama).
  - Modal "Buat Profil" Cari Teman ternyata dirender **setelah** `<SiteFooter />`. Supaya urutan tumpukan (di atas tombol melayang "Tanya Kami") tetap sama, modal di-`<Teleport to="#teleports">` (bukan `body` — SSR Nuxt menaruh teleport `body` di AWAL body) dan diberi kelas `font-sans text-slate-800` yang dulu diwarisi dari `<main>`. Ditambah 2 skenario screenshot yang baseline-nya diambil dari build commit sebelumnya (git worktree), plus uji alur submit lama vs baru (identik).
  - Helper tanggal/ringkasan artikel disatukan di `features/articles/article-format.ts` (dulu 3 salinan).
  - Kode mati warisan dibuang hanya bila pasti tak terjangkau: ref `waGrupOsmb`, import `useRoute` di aspirasi, CSS `.scrollbar-hide`.

#### S5 · Pecah pages auth & dashboard
- `login/admin` (471) → `LoginAdminForm`/`LoginPasskey`/`LoginEmailLink`; `login/mahasiswa` → `LoginGoogle`.
- `admin-area/index` (743), `organizations` (608), `admin-area/struktur-pengurus` (527), `users` (506), `Highlight-terkini/form` (436), `kelola-user`, `mahasiswa/*` → features.
- `sandbox` (549) dipecah atau dibiarkan (dev only) — catat.
- **DoD:** tidak ada page > 80 baris / komponen > 250 baris; login 4 metode + passkey register + semua CRUD diuji; screenshot identik.

### FASE B — Perbaikan (fitur tetap, kualitas naik)

#### S6 · Rendering: routeRules + SSR data publik
- `routeRules` sesuai §5; data publik via `useAsyncData` + `server/api/public/*` (read-only, Admin SDK).
- `useSeoMeta` per page (isi meta lama).
- **DoD:** view-source `/berita/<slug>` berisi konten; header cache sesuai; dashboard tetap SPA; sitemap sama.

#### S7 · Session cookie `__session`
- `server/api/auth/session.{post,delete}.ts`, `auth/me.get.ts`, `server/middleware/session.ts`, `server/utils/{session,requireRole}.ts`, `plugins/auth-session.server.ts`.
- `establishSession()` setelah ke-4 jalur login; `useAuth().logout()` di semua tempat logout.
- `middleware/auth.ts` baca store; logika redirect identik.
- (Jika Q0 disetujui) `requireRole('SUPER_ADMIN')` di `create-user` & `delete-user`.
- **DoD:** login → tutup browser → buka `/beranda` → server kenal user; logout hapus cookie; redirect role sama; passkey & email-link jalan.

#### S8 · Tombol Dashboard + Cookie Consent
- `auth-action.vue` (§6.4) di navbar desktop & mobile; kartu "sudah masuk" di `/login/*`.
- `cookie-consent.vue` + `useConsent()` + gating analytics (§7).
- **DoD:** 3 state tombol benar, CLS ≈ 0; GA tidak termuat sebelum consent.

#### S9 · Tailwind v4 + Kliping init
- §9.1 & §9.2, `npx @tailwindcss/upgrade`, plugin `ssr-width`, primitif dasar Kliping.
- **DoD:** build sukses; screenshot nyaris identik (belum ada swap komponen).

#### S10 · Marketing UI → Kliping
- `SiteHeader` (navbar-03) + `SiteFooter` + section landing + form kontak memakai primitif Kliping.
- **DoD:** isi & urutan sama; screenshot dicek; navbar bisa dipakai keyboard.

#### S11 · Dashboard & login UI → Kliping
- `DashboardSidebar` (sidebar-07), `table`, `dialog`/`sheet`, `alert-dialog`, `sonner`; login (login-03/04); `error.vue` (not-found-01). Hapus alias layout `admin`.
- **DoD:** semua CRUD + passkey diuji; RBAC menu sama.

#### S12 · Gambar & lazy load
- §8: `AppImage`, `scripts/optimize-images.mjs`, rename file berspasi, `Lazy*`, preload hero/logo.
- **DoD:** 0 `<img>` mentah; Lighthouse mobile `/beranda` Performance ≥ 90, LCP < 2,5 s, CLS < 0,1.

#### S13 · SEO, a11y & QA akhir
- Sitemap, robots, canonical, OG, judul unik; Playwright parity + smoke; emulator bila ada.
- **DoD:** semua cek hijau; `docs/ARCHITECTURE.md` ditulis.

#### S14 · Cutover
- Preview channel Firebase, uji HP nyata & passkey (RP ID); merge `main`; rencana rollback.
- **DoD:** produksi 48 jam tanpa regresi.

---

## 12. Protokol Tiap Sesi

**Mulai sesi**
1. Baca §3 (Golden Rules) + bagian Roadmap sesi yang dikerjakan.
2. `git pull`, buat branch `refactor/sNN-<nama-singkat>` (atau branch yang ditentukan).
3. `npm ci && npm run build` — pastikan titik awal hijau.
   `npm run build:test && npm run test:routes && npm run test:screens` — jaring pengaman harus hijau sebelum mulai.

**Selama sesi**
4. Kerjakan **hanya** scope sesi itu. Temuan di luar scope → catat di §13, jangan dikerjakan.
5. Commit kecil per langkah (R22).

**Akhiri sesi**
6. `npm run lint && npm run typecheck && npm run build`.
7. `npm run test:routes` (R2) dan `npm run build:test && npm run test:screens` (R4).
8. Smoke test manual: buka `/beranda`, login admin, buka 1 halaman dashboard, logout.
9. Fase A: `test:screens` wajib lulus tanpa `--update`. Baseline hanya boleh di-update bila perubahan tampilan disetujui (Fase B).
10. Temuan baru (bug, celah, perilaku aneh) → `docs/temuan.md` sesuai aturan pencatatannya; jangan diperbaiki di Fase A.
11. Update §14 (centang + tanggal + catatan singkat), push, buka PR dengan ringkasan & checklist DoD.

**Template deskripsi PR**

```md
## Sesi SNN — <judul>
### Yang dikerjakan
- …
### Bukti DoD
- [ ] build/lint/typecheck hijau
- [ ] route parity identik
- [ ] screenshot dicek (lampirkan bila beda)
- [ ] smoke test login + CRUD
### Di luar scope (dicatat di docs/temuan.md)
- …
```

---

## 13. Temuan, Risiko & Pertanyaan Terbuka

📌 **Semua temuan dicatat di [`docs/temuan.md`](docs/temuan.md)** — satu sumber:
ringkasan bertingkat (🔴/🟠/🟡/⚪), bukti per temuan, status, rencana sesi, dan
pertanyaan Q0–Q9 untuk pemilik proyek.

Yang paling mendesak (perlu hotfix di produksi, tidak menunggu refactor):
- **T8** API `create-user`/`delete-user` tanpa cek pemanggil (Q0)
- **T28** Storage `organizations/` & `articles/` bisa ditulis tanpa login (Q6)
- **T26/T27** rules organisasi & pengurus terbuka untuk semua user login (Q6)
- **T13** ganti password SUPER_ADMIN yang pernah ter-commit

---

## 14. Progress Tracker

| Sesi | Judul | Status | Tanggal | PR | Catatan |
|---|---|---|---|---|---|
| — | Golden Plan disusun | ✅ | 2026-11-01 | — | audit ormawautsby, kliping-ui, Fibidy-Client |
| — | Golden Plan v2: struktur final datar | ✅ | 2026-11-01 | — | tanpa route group, fitur datar, Fase A struktur → Fase B perbaikan |
| — | Golden Plan v2.1: penamaan file kebab-case | ✅ | 2026-11-01 | — | `nama-file.vue`, `use-nama.ts`; tag template tetap PascalCase |
| S0 | Bootstrap baseline | ✅ | 2026-11-01 | — | import `ormawautsby@0e2ccca`; `test:routes` (33 page, 8 API) & `test:screens` (22 rute × desktop/mobile) baseline; build hijau |
| S1 | Tooling & kebersihan root | ✅ | 2026-11-01 | — | ESLint 0 error / 299 warning warisan; typecheck ratchet 26 error warisan di 8 file; script → `scripts/` (+`legacy/`); `docs/database.md`; README; CI `check.yml`; T13 diperbaiki di script |
| S2 | Fondasi: constants/types/utils/services/store/layout | ✅ | 2026-11-01 | — | Navbar 551 baris → 7 komponen ≤ 177 baris + `constants/nav.ts`; Sidebar/HeaderProfile/admin layout → `dashboard-*`/`nav-user` + `constants/dashboard-menu.ts`; Pinia `stores/auth.ts`; `services/firebase.ts`; TipTap disamakan 3.32.2 (typecheck 26 → 19); screenshot parity diperluas ke 71 skenario (dashboard + menu) — semua identik |
| S3 | Feature data layer | ✅ | 2026-11-01 | — | 6 composable lama → `features/{articles,organizations,pengurus,users,auth}` (service + `use-*.ts` + `index.ts`) + `composables/use-{firebase,upload}.ts` + `services/storage.ts`; 0 import `firebase/*` di pages/components/layouts; E2E Firebase Emulator 17 skenario + 71 screenshot identik; typecheck 19 → 17 |
| S4 | Pecah pages publik | ✅ | 2026-11-01 | — | 19 page publik → shell ≤ 61 baris (total 448 baris, dulu ±4.400); 41 komponen fitur ≤ 250 baris + `*.data.ts` + CSS besar via `<style scoped src>`; screenshot 73/73 identik (+ skenario modal Cari Teman, baseline dari build lama); E2E 17/17; typecheck 17 → 14 |
| S5 | Pecah pages auth & dashboard | ⬜ | | | |
| S6 | routeRules + SSR data publik | ⬜ | | | |
| S7 | Session cookie `__session` | ⬜ | | | |
| S8 | Tombol Dashboard + Cookie Consent | ⬜ | | | |
| S9 | Tailwind v4 + Kliping init | ⬜ | | | |
| S10 | Marketing UI → Kliping | ⬜ | | | |
| S11 | Dashboard & login UI → Kliping | ⬜ | | | |
| S12 | Gambar & lazy load | ⬜ | | | |
| S13 | SEO, a11y & QA | ⬜ | | | |
| S14 | Cutover | ⬜ | | | |

Legenda: ⬜ belum · 🟨 jalan · ✅ selesai · ⛔ diblokir
