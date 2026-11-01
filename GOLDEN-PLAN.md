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
| Route group `(marketing)`, `(auth)`, `(dashboard)` | Route group `app/pages/(marketing)/` dst. — folder berkurung **tidak** masuk URL (Nuxt ≥ 3.13) |
| `layout.tsx` per group | `app/layouts/*.vue` + `definePageMeta({ layout })` |
| `page.tsx` tipis + `client.tsx` | `pages/**.vue` tipis + `app/features/<fitur>/components/*.vue` |
| Server Component fetch | `useAsyncData` / `useFetch` (jalan di server saat SSR) |
| `generateStaticParams` / SSG | `routeRules: { prerender: true }` / `nuxt generate` |
| ISR `revalidate` | `routeRules: { swr: 3600 }` / `isr` |
| `'use client'` page | `routeRules: { ssr: false }` |
| `middleware.ts` / `proxy.ts` (edge auth gate) | `server/middleware/*.ts` + `app/middleware/*.global.ts` |
| `generateMetadata` | `useSeoMeta()` / `useHead()` |
| `next/image` | `<NuxtImg>` / `<NuxtPicture>` (`@nuxt/image`) |
| `src/lib/api/*.ts` | `app/services/*.ts` (client) + `server/api/**` (server) |
| `src/hooks/*` | `app/composables/*` & `app/features/*/composables/*` |
| `src/stores/*` (zustand) | `app/stores/*` (Pinia — sudah terpasang) |
| `components/ui` (shadcn) | `app/components/ui` (**Kliping**) |
| `components/shared/cookie-consent.tsx` | `app/components/shared/CookieConsent.vue` |

### 1.2 Hosting tetap Firebase

Nitro preset `firebase` (gen 2, Node 22), Firestore, Storage, Auth. Tidak ganti
backend. Implikasi penting:
- **Firebase Hosting hanya meneruskan cookie bernama `__session`** ke Cloud
  Functions/Run. Cookie sesi auth **wajib** bernama `__session` (lihat §6).
- `sharp` di-externalize (riwayat masalah deploy). Strategi gambar harus aman
  tanpa `sharp` di runtime (lihat §8).

### 1.3 Pola dari Fibidy yang diadopsi

- Route group per "permukaan": marketing (publik), auth, dashboard, legal.
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
  route group `(nama)` tidak mengubah URL. Kalau ragu, cek `npx nuxi routes` /
  daftar rute dari build sebelum dan sesudah — **harus identik**.
- **R3 — Kontrak data immutable.** Nama koleksi, field Firestore, payload API
  tidak diubah. Refactor tipe boleh, bentuk data tidak.
- **R4 — Visual parity per fase.** Fase struktur (S0–S6) = **tampilan identik**.
  Fase Kliping (S7–S10) = tampilan boleh "naik kelas" tapi layout, isi, warna
  brand, dan urutan konten tetap; setiap halaman dicek screenshot sebelum/sesudah.

### B. Rule Struktur

- **R5 — Page tipis.** File di `pages/` maksimal ±80 baris: `definePageMeta`,
  `useSeoMeta`, fetch data (`useAsyncData`), lalu merakit komponen. Tidak ada
  logika bisnis, tidak ada panggilan Firestore langsung.
- **R6 — Komponen maksimal ±250 baris.** Lebih dari itu → pecah jadi sub-komponen
  di folder fitur yang sama.
- **R7 — Arah dependensi satu arah:**
  `pages → features → (components/shared, components/ui, composables, services, stores) → utils/types`.
  `components/ui` (Kliping) tidak boleh import apa pun dari app. Fitur A tidak
  boleh import isi internal fitur B (lewat `index.ts` publiknya saja).
- **R8 — Firebase hanya di `services/` dan `server/`.** Komponen & page tidak
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

```
ut-ormawa-refactor/
├── app/
│   ├── app.vue                       # root: NuxtLayout + NuxtPage + CookieConsent + Toaster
│   ├── error.vue                     # 404/500 (Kliping not-found-01)
│   ├── assets/css/
│   │   └── tailwind.css              # Tailwind v4 + token tema Kliping + brand admiral/lemon
│   │
│   ├── pages/                        # TIPIS — routing + SEO + fetch + rakit komponen
│   │   ├── index.vue                 # (redirect via routeRules, file boleh tetap ada)
│   │   ├── (marketing)/
│   │   │   ├── beranda/index.vue
│   │   │   ├── profil/{index,tentang-ut,tentang-ormawa,visi-misi,struktur-pengurus}.vue
│   │   │   ├── zona-kampus/{akademik,non-akademik,ukm,imf,cari-teman}.vue
│   │   │   ├── media/{artikel,perlombaan,laporan,social-media}.vue
│   │   │   ├── berita/[slug].vue
│   │   │   └── kontak/{aspirasi,pelaporan,wa_prodi_2026_2}.vue
│   │   ├── (auth)/
│   │   │   └── login/{admin,mahasiswa}.vue
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── index.vue
│   │   │       ├── Highlight-terkini/{index,form}.vue
│   │   │       ├── users/index.vue
│   │   │       ├── organizations/index.vue
│   │   │       ├── admin-area/{index,struktur-pengurus,kelola-user}.vue
│   │   │       └── mahasiswa/{index,edit-profil}.vue
│   │   └── (dev)/
│   │       └── sandbox.vue
│   │
│   ├── layouts/
│   │   ├── default.vue               # marketing: SiteHeader + slot + SiteFooter
│   │   ├── auth.vue                  # halaman login (kosong/terpusat)
│   │   └── dashboard.vue             # (rename dari admin.vue; alias 'admin' dijaga selama transisi)
│   │
│   ├── features/                     # ⭐ inti: satu folder per domain bisnis
│   │   ├── auth/
│   │   │   ├── components/           # LoginAdminForm, PasskeyButton, EmailLinkForm, GoogleLoginButton
│   │   │   ├── composables/          # useAuth, useSession, usePasskey
│   │   │   ├── services/             # auth.service.ts (firebase/auth), session.service.ts ($fetch /api/auth/*)
│   │   │   └── index.ts              # API publik fitur
│   │   ├── articles/                 # Highlight-terkini, media/artikel, berita/[slug]
│   │   │   ├── components/           # ArticleCard, ArticleList, ArticleForm, ArticleTable, ArticleContent
│   │   │   ├── composables/          # useArticles (dipecah dari 375 baris)
│   │   │   ├── services/             # articles.service.ts
│   │   │   └── types.ts
│   │   ├── organizations/
│   │   ├── pengurus/                 # struktur pengurus (publik + admin)
│   │   ├── users/                    # kelola user, create/delete via /api
│   │   ├── mahasiswa/                # dashboard & edit profil mahasiswa
│   │   ├── activity-log/
│   │   ├── kontak/                   # aspirasi, pelaporan, WA prodi
│   │   ├── zona-kampus/              # akademik, ukm, imf, cari-teman
│   │   └── landing/                  # section-section beranda (Hero, Highlight, dst.)
│   │
│   ├── components/
│   │   ├── ui/                       # 🔒 KLIPING (via CLI) — button, card, dialog, sidebar, sonner, …
│   │   ├── blocks/                   # 🔒 KLIPING blocks yang sudah diadaptasi (navbar, footer, sidebar, login)
│   │   ├── layout/
│   │   │   ├── marketing/            # SiteHeader (eks Navbar.vue 551 baris), SiteFooter, NavMenu, MobileNav, AuthAction
│   │   │   └── dashboard/            # DashboardSidebar, DashboardTopbar, NavUser (eks HeaderProfile)
│   │   └── shared/                   # AppImage, CookieConsent, RichTextEditor, PageHeader, EmptyState
│   │
│   ├── composables/                  # lintas-fitur saja: useFirebase, useConsent, useAppToast
│   ├── services/
│   │   └── firebase.ts               # getter app/auth/db/storage (lazy init) — satu-satunya init client
│   ├── stores/                       # Pinia: auth.store.ts (user, role, accessModules, ready)
│   ├── middleware/
│   │   ├── auth.ts                   # wajib login (+ role) — perilaku sama dengan versi lama
│   │   └── guest.ts                  # (opsional) sudah login → jangan tampilkan form login? ⚠ lihat §13
│   ├── plugins/
│   │   ├── firebase.client.ts        # tipis: panggil services/firebase + sinkron auth store
│   │   ├── auth-session.server.ts    # hidrasi auth store dari cookie saat SSR
│   │   ├── ssr-width.ts              # syarat Kliping (provideSSRWidth)
│   │   └── analytics.client.ts       # hanya aktif setelah consent
│   ├── constants/                    # nav.ts, dashboard-menu.ts, access-modules.ts, links.ts, cookies.ts
│   ├── types/                        # database.types.ts (+ re-export per fitur)
│   ├── utils/                        # slugify, formatDate, normalizeRole, cn (lib/utils)
│   └── lib/utils.ts                  # cn() — dibuat Kliping init
│
├── server/
│   ├── api/
│   │   ├── auth/session.post.ts      # 🆕 tukar ID token → session cookie
│   │   ├── auth/session.delete.ts    # 🆕 logout: hapus cookie + revoke
│   │   ├── auth/me.get.ts            # 🆕 profil ringkas dari cookie (untuk SSR navbar)
│   │   ├── articles/…                # (tetap)
│   │   ├── webauthn/…                # (tetap)
│   │   ├── create-user.post.ts       # (tetap)
│   │   └── delete-user.post.ts       # (tetap)
│   ├── middleware/
│   │   └── session.ts                # 🆕 baca __session → event.context.user
│   ├── routes/__sitemap__/…          # (opsional, tetap URL /api/__sitemap__/urls)
│   └── utils/
│       ├── firebaseAdmin.ts          # (tetap)
│       ├── session.ts                # 🆕 verifySessionCookie + cache
│       └── requireRole.ts            # 🆕 guard API (dipakai create-user/delete-user)
│
├── public/img/                       # nama file tanpa spasi, kebab-case (+ versi .webp)
├── scripts/                          # semua script utilitas (R10)
├── docs/                             # DATABASE.md, ARCHITECTURE.md, adr/
├── tests/                            # e2e/route-parity, e2e/smoke (Playwright)
├── components.json                   # konfigurasi Kliping
├── nuxt.config.ts
├── firebase.json · firestore.rules · storage.rules · .firebaserc
├── eslint.config.mjs · .prettierrc · tsconfig.json
└── GOLDEN-PLAN.md                    # file ini
```

**Kenapa `features/`?** Halaman lama gemuk (dashboard/admin-area 743 baris,
organizations 608, Navbar 551, users 506). Dengan `features/`, page cuma
"perakit", dan semua hal tentang artikel ada di satu folder — persis seperti
`components/dashboard/product/` + `hooks/dashboard/use-products.ts` +
`lib/api/products.ts` di Fibidy, tapi dikumpulkan per fitur.

**Auto-import Nuxt:** tambahkan di `nuxt.config.ts`:

```ts
components: [
  { path: '~/components/ui', pathPrefix: false, extensions: ['.vue'] }, // via shadcn-nuxt
  { path: '~/components', pathPrefix: false },
  { path: '~/features', pattern: '*/components/**', pathPrefix: false },
],
imports: { dirs: ['features/*/composables', 'stores', 'utils', 'constants'] },
```

Services **tidak** di-auto-import — import eksplisit supaya dependensi Firebase
terlihat jelas (R8).

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
  dan **Firebase Hosting CDN** yang menyimpan cache-nya. Verifikasi header di sesi S4.
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

`components/layout/marketing/AuthAction.vue` — satu komponen, dipakai navbar
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

- File: `app/components/shared/CookieConsent.vue`, dirender sekali di `app.vue`
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

1. **`AppImage.vue`** (`components/shared/`) — satu-satunya pintu gambar (R15).
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

### 9.1 Setup (sesi S7)

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
| Tombol/inputs ad-hoc Tailwind | `button`, `input`, `textarea`, `label`, `field`, `select`, `checkbox`, `switch` | S8 |
| Kartu konten | `card`, `badge`, `avatar`, `skeleton`, `empty` | S8 |
| Alert/konfirmasi `confirm()`/`alert()` | `alert-dialog`, `sonner` (toast) | S8 |
| Modal form dashboard | `dialog`, `sheet`, `drawer` (mobile) | S9 |
| Tabel users/organizations/artikel | `table` (+ `@tanstack/vue-table` bila perlu sort/filter yang **sudah ada**) | S9 |
| `Navbar.vue` (dropdown desktop + menu mobile) | block `navbar-03` (nested dropdown) + `navigation-menu`, `sheet` | S8 |
| `Footer.vue` | block `footer-0x` yang paling mirip | S8 |
| `admin/Sidebar.vue` + `HeaderProfile.vue` | block `sidebar-07` (collapse to icons) + `dropdown-menu` | S9 |
| Halaman login | block `login-03`/`login-04` (form tetap, 3 metode tetap) | S9 |
| Halaman 404 | block `not-found-01` → `app/error.vue` | S10 |
| Cookie banner | block `banner-03` atau `card` + `button` | S6 |
| Tab/accordion di halaman profil/zona kampus | `tabs`, `accordion` | S10 |
| Ikon SVG inline | `@lucide/vue` (iconLibrary Kliping) — kecuali logo brand (WhatsApp dll.) tetap SVG | S8–S10 |

Aturan pakai block Kliping: block = **titik awal**. Isi (teks, link, menu)
selalu dari `app/constants/*` dan data lama; jangan ada teks contoh tersisa.

---

## 10. Konvensi Kode

| Hal | Aturan |
|---|---|
| Bahasa | TypeScript `strict`, `<script setup lang="ts">` di semua SFC |
| Urutan SFC | `<script setup>` → `<template>` → `<style scoped>` (opsional, hindari) |
| Nama komponen | PascalCase (`ArticleCard.vue`); komponen Kliping ikut gaya Kliping |
| Nama composable | `useXxx.ts` (camelCase) — konsisten dengan app lama |
| Nama service | `xxx.service.ts`, ekspor fungsi murni (tanpa state Vue) |
| Nama file lain | kebab-case (`access-modules.ts`, `format-date.ts`) |
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

> Setiap sesi ±1 PR. Kolom **DoD** = Definition of Done (semua wajib).
> Urutan penting: struktur & safety-net dulu, baru auth, baru UI Kliping, baru optimasi.

### FASE A — Fondasi & Jaring Pengaman

#### S0 · Bootstrap baseline
- Salin seluruh source `ormawautsby` (branch `main`) ke repo ini apa adanya → commit `chore: import baseline from ormawautsby`.
- Tambah `.gitignore` (`.firebase/`, `.output/`, `.nuxt/`, `.commit_msg.txt`, `.env`).
- Catat **route manifest** baseline: `tests/fixtures/routes.baseline.json` (hasil `nuxi build` → daftar rute).
- Ambil **screenshot baseline** semua rute publik + login (Playwright, desktop & mobile) → `tests/fixtures/screens/`.
- **DoD:** `npm run build` sukses sama seperti repo lama; manifest & screenshot ada.

#### S1 · Tooling & kebersihan root
- `@nuxt/eslint` + Prettier + `vue-tsc` (`npm run typecheck`), script `lint`, `format`.
- Pindah semua script lepas ke `scripts/` (R10) + `scripts/README.md`; perbaiki path di `package.json`/workflow bila dipakai.
- `README.md` asli (ganti template "Nuxt Minimal Starter"): cara dev, env, deploy.
- CI: tambah job `check` (lint + typecheck + build) yang jalan di PR; job deploy tetap hanya `main`.
- **DoD:** CI hijau; root hanya berisi config; tidak ada perubahan di `app/`.

#### S2 · Route groups & layout (pindah file, nol perubahan isi)
- Pindah pages ke `(marketing)/`, `(auth)/`, `(dashboard)/`, `(dev)/`.
- Rename layout `admin` → `dashboard` (pertahankan nama lama via alias/`layouts/admin.vue` yang me-*re-export* sampai S9) dan buat `auth.vue`.
- Pindah `Navbar.vue`/`Footer.vue` → `components/layout/marketing/`, `admin/*` → `components/layout/dashboard/`.
- **DoD:** route manifest **identik** dengan baseline (R2); screenshot identik.

#### S3 · Konstanta, tipe & utils
- Ekstrak menu navbar (desktop+mobile jadi satu array), menu sidebar + `access_modules`, link WA, info kontak → `app/constants/*`.
- `normalizeRole`, format tanggal, slugify → `app/utils/*`. Lengkapi `UserRole` dengan `mahasiswa` (tipe saja, tanpa ubah logika).
- **DoD:** tidak ada array menu di template; grep tidak menemukan duplikasi; screenshot identik.

### FASE B — Lapisan Data & Rendering

#### S4 · Firebase service layer & features/
- `services/firebase.ts` (lazy getter) — satu-satunya init client; plugin jadi tipis.
- Bentuk `features/*` dan pindahkan `composables/use*.ts` → `features/<x>/composables` + `services` (R8).
- Pecah `useArticles.ts` (375 baris) jadi service (CRUD Firestore) + composable (state UI).
- Pinia `stores/auth.store.ts` menggantikan `useState('firebaseUser'|'userRole'|'accessModules'|'isAuthReady')` — sediakan getter kompatibel selama transisi.
- **DoD:** `grep "from 'firebase/" app/pages app/components app/features/*/components` = 0; semua CRUD dashboard di-smoke-test.

#### S5 · Rendering: routeRules + SSR data publik
- Tulis `routeRules` sesuai §5.
- Halaman publik yang fetch di `onMounted` → `useAsyncData` via `server/api/*` publik baru (read-only, Firebase Admin) — contoh: `/api/public/articles`, `/api/public/pengurus`. Kontrak lama tetap.
- `useSeoMeta` per page (pindahkan meta yang ada, jangan ubah isinya).
- **DoD:** view-source `/berita/<slug>` & `/media/artikel` berisi konten; header cache sesuai tabel; dashboard tetap SPA; sitemap sama.

### FASE C — Auth Session & Privasi

#### S6a · Session cookie `__session`
- `server/api/auth/session.{post,delete}.ts`, `auth/me.get.ts`, `server/middleware/session.ts`, `server/utils/{session,requireRole}.ts`, `plugins/auth-session.server.ts`.
- Sisipkan `establishSession()` setelah **ke-4** jalur login yang ada (tanpa mengubah jalurnya) dan `useAuth().logout()` di **ke-4** tempat logout.
- `middleware/auth.ts` membaca store; logika redirect dibiarkan identik.
- (Jika Q0 disetujui) `requireRole('SUPER_ADMIN')` di `create-user` & `delete-user`; dashboard mengirim cookie/ID token.
- **DoD:** login → tutup browser → buka `/beranda` → server tahu user (cek `/api/auth/me`); logout menghapus cookie; semua redirect role sama seperti baseline; passkey & email-link tetap jalan.

#### S6b · Tombol Dashboard + Cookie Consent
- `AuthAction.vue` (§6.4) dipakai navbar desktop & mobile; kartu "sudah masuk" di `/login/*`.
- `CookieConsent.vue` + `useConsent()` + gating `analytics.client.ts` (§7).
- **DoD:** 3 state tombol benar tanpa layout shift (CLS ≈ 0); GA tidak termuat sebelum consent (cek Network); banner tidak muncul lagi setelah dipilih.

### FASE D — Kliping UI (tampilan naik kelas, fitur tetap)

#### S7 · Tailwind v4 + Kliping init
- §9.1 dan §9.2. `npx @tailwindcss/upgrade`. Plugin `ssr-width`.
- Tambah primitif dasar: `npx kliping@latest add button card input label textarea select badge avatar skeleton sonner dialog alert-dialog dropdown-menu sheet separator tooltip`.
- **DoD:** build sukses; screenshot semua halaman **masih identik/nyaris identik** (hanya beda subpiksel akibat v4) — belum ada swap komponen.

#### S8 · Marketing UI → Kliping
- `SiteHeader` dari `navbar-03` + data `constants/nav.ts` + `AuthAction`; `SiteFooter` dari block footer.
- Section `beranda` dipecah ke `features/landing/components/*` memakai `card`/`button`/`badge`.
- Form `aspirasi`/`pelaporan`/`cari-teman` memakai `field`/`input`/`textarea`/`select` (validasi lama tetap).
- **DoD:** setiap halaman publik dibandingkan screenshot; isi & urutan sama; aksesibilitas keyboard navbar OK.

#### S9 · Dashboard UI → Kliping
- `DashboardSidebar` dari `sidebar-07` membaca `constants/dashboard-menu.ts` + `hasAccess()` (link yang sama persis, termasuk yang belum ada halamannya — §13).
- Tabel users/organizations/artikel → `table`; modal → `dialog`/`sheet`; `confirm()` → `alert-dialog`; notifikasi → `sonner`.
- Halaman login → block `login-03/04` (3 metode login & urutan tetap).
- Hapus alias layout `admin`.
- **DoD:** semua CRUD (artikel, organisasi, user, pengurus, profil mahasiswa) + registrasi passkey diuji manual; RBAC menu sama.

#### S10 · Pecah halaman gemuk
- Target R5/R6: `admin-area/index.vue` (743), `organizations` (608), `sandbox` (549), `admin-area/struktur-pengurus` (527), `users` (506), `cari-teman` (464), `Highlight-terkini/form` (436).
- `error.vue` dari `not-found-01`; `tabs`/`accordion` di halaman profil & zona kampus bila memang sudah ada perilaku serupa.
- **DoD:** tidak ada page > 80 baris, tidak ada komponen > 250 baris (kecuali `components/ui`); perilaku identik.

### FASE E — Optimasi & Rilis

#### S11 · Gambar & lazy load
- §8 seluruhnya: `AppImage`, `scripts/optimize-images.mjs`, rename file berspasi, `Lazy*` untuk komponen berat, preload hero & logo.
- **DoD:** 0 `<img>` mentah (grep), Lighthouse mobile `/beranda`: Performance ≥ 90, LCP < 2,5 s, CLS < 0,1.

#### S12 · SEO, aksesibilitas & QA akhir
- Cek sitemap, robots, canonical, OG image, `lang="id"`, judul unik per halaman.
- Playwright: route parity vs baseline + smoke (buka semua rute publik, login admin dummy di emulator, 1 CRUD).
- Uji di Firebase Emulator Suite (Auth/Firestore/Functions) bila tersedia.
- **DoD:** semua cek hijau; `docs/ARCHITECTURE.md` ditulis (ringkasan file ini untuk dev baru).

#### S13 · Cutover
- Deploy preview channel Firebase (`firebase hosting:channel:deploy refactor`), uji di HP nyata.
- Bandingkan cache header, login, passkey (passkey terikat domain/RP ID — **uji di domain produksi/preview yang benar**).
- Merge ke `main` → deploy produksi; siapkan rollback (deploy versi lama dari `ormawautsby`).
- **DoD:** produksi jalan 48 jam tanpa regresi yang dilaporkan.

---

## 12. Protokol Tiap Sesi

**Mulai sesi**
1. Baca §3 (Golden Rules) + bagian Roadmap sesi yang dikerjakan.
2. `git pull`, buat branch `refactor/sNN-<nama-singkat>` (atau branch yang ditentukan).
3. `npm ci && npm run build` — pastikan titik awal hijau.

**Selama sesi**
4. Kerjakan **hanya** scope sesi itu. Temuan di luar scope → catat di §13, jangan dikerjakan.
5. Commit kecil per langkah (R22).

**Akhiri sesi**
6. `npm run lint && npm run typecheck && npm run build`.
7. Route parity: bandingkan daftar rute dengan `routes.baseline.json`.
8. Smoke test manual: buka `/beranda`, login admin, buka 1 halaman dashboard, logout.
9. Bandingkan screenshot (fase A–C: harus identik).
10. Update §14 (centang + tanggal + catatan singkat), push, buka PR dengan ringkasan & checklist DoD.

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
### Di luar scope (dicatat di GOLDEN-PLAN §13)
- …
```

---

## 13. Temuan, Risiko & Pertanyaan Terbuka

Temuan saat audit kode baseline (belum diubah — sesuai R1):

| # | Temuan | Sikap sementara |
|---|---|---|
| T1 | URL `/dashboard/Highlight-terkini` pakai huruf kapital | **Pertahankan.** Opsi nanti: tambah alias `/dashboard/highlight-terkini` (redirect) — butuh persetujuan |
| T2 | Sidebar menautkan rute yang **belum ada**: `/dashboard/admin-area/{profil,event,galeri,keanggotaan,pengaturan}` | Pertahankan link (fitur tetap). Sesudah `error.vue` jadi, tetap 404 seperti sekarang. Perlu keputusan: sembunyikan atau buatkan halaman |
| T3 | Navbar menautkan `/market` yang tidak ada | Sama seperti T2 |
| T4 | Dua area admin paralel: `admin-area/*` (legacy) dan `users`/`organizations`/`Highlight-terkini` | Pertahankan keduanya; usulan penggabungan setelah S13 |
| T5 | Role `mahasiswa` dipakai di plugin tapi tidak ada di tipe `UserRole` | Tambah di tipe (S3), logika tidak diubah |
| T6 | Dokumen user yang belum ada dianggap `mahasiswa` | Pertahankan; catat sebagai risiko keamanan ringan (rules Firestore tetap penjaga) |
| T7 | `/sandbox` ikut ter-deploy ke produksi | Pertahankan (dipindah ke `(dev)`), usulan: nonaktifkan di produksi via `routeRules` — butuh persetujuan |
| T8 | 🔴 **KRITIS:** `POST /api/create-user` & `/api/delete-user` **tidak memeriksa siapa pemanggilnya** (tidak ada `verifyIdToken`/cookie). Siapa pun yang tahu URL-nya bisa membuat akun `SUPER_ADMIN` atau menghapus user lewat Firebase Admin | Satu-satunya pengecualian R1 yang direkomendasikan: di S6a pasang `requireRole('SUPER_ADMIN')` (pemakaian sah dari dashboard tidak berubah, hanya pemanggil tanpa hak yang ditolak). **Butuh persetujuan Q0** — idealnya di-hotfix juga di repo produksi sekarang |
| T9 | Nama file gambar berspasi | Rename di S11 |
| T10 | Passkey (WebAuthn) terikat RP ID/domain | Uji ulang di setiap domain (preview & produksi) di S13 |
| T11 | ISR + konten spesifik user | Diselesaikan dengan `AuthAction` client-side (§6.4) |
| T12 | Tailwind v4 mengubah beberapa nama kelas | `@tailwindcss/upgrade` + screenshot diff di S7 |

Pertanyaan untuk pemilik proyek (jawab di sini):
- [ ] Q0 — T8: setuju API `create-user`/`delete-user` diamankan (wajib SUPER_ADMIN)? Hotfix di produksi juga?
- [ ] Q1 — T1/T2/T3/T7: boleh dirapikan setelah refactor selesai, atau tetap selamanya?
- [ ] Q2 — Lama sesi login: 7 hari (default) atau 14 hari (maks Firebase)?
- [ ] Q3 — `/login/*` saat sudah login: tampilkan kartu "Buka Dashboard" (rekomendasi) atau redirect otomatis?
- [ ] Q4 — Gaya cookie banner: bar bawah (rekomendasi, tidak menghalangi) atau modal tengah seperti Fibidy?

---

## 14. Progress Tracker

| Sesi | Judul | Status | Tanggal | PR | Catatan |
|---|---|---|---|---|---|
| — | Golden Plan disusun | ✅ | 2026-11-01 | — | audit ormawautsby, kliping-ui, Fibidy-Client |
| S0 | Bootstrap baseline | ⬜ | | | |
| S1 | Tooling & kebersihan root | ⬜ | | | |
| S2 | Route groups & layout | ⬜ | | | |
| S3 | Konstanta, tipe & utils | ⬜ | | | |
| S4 | Firebase service layer & features | ⬜ | | | |
| S5 | routeRules + SSR data publik | ⬜ | | | |
| S6a | Session cookie `__session` | ⬜ | | | |
| S6b | Tombol Dashboard + Cookie Consent | ⬜ | | | |
| S7 | Tailwind v4 + Kliping init | ⬜ | | | |
| S8 | Marketing UI → Kliping | ⬜ | | | |
| S9 | Dashboard UI → Kliping | ⬜ | | | |
| S10 | Pecah halaman gemuk | ⬜ | | | |
| S11 | Gambar & lazy load | ⬜ | | | |
| S12 | SEO, a11y & QA | ⬜ | | | |
| S13 | Cutover | ⬜ | | | |

Legenda: ⬜ belum · 🟨 jalan · ✅ selesai · ⛔ diblokir
