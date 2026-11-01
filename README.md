# Ormawa UT Surabaya — Web

Website resmi Ormawa Universitas Terbuka Surabaya: landing page publik, portal
berita/artikel, struktur pengurus, dan dashboard admin & mahasiswa.

> 🚧 Repo ini sedang di-refactor dari `ormawautsby`. Aturan, struktur target, dan
> roadmap ada di **[GOLDEN-PLAN.md](./GOLDEN-PLAN.md)** — baca dulu sebelum mengubah apa pun.

## Stack

Nuxt 4 (Vue 3, SSR) · Firebase (Auth, Firestore, Storage, Hosting + Functions gen 2) ·
Pinia · Tailwind CSS · TipTap · WebAuthn (passkey) · `@nuxt/image` · `@nuxtjs/sitemap`

## Menjalankan

Butuh Node.js 22.

```bash
cp .env.example .env     # isi kredensial Firebase (lihat di bawah)
npm ci
npm run dev              # http://localhost:3000
```

Tanpa `.env`, halaman publik tetap tampil tapi data Firestore & login tidak jalan.

### Environment

| Variabel | Untuk |
|---|---|
| `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` | Firebase client (Firebase Console → Project settings → Your apps) |
| `FIREBASE_ADMIN_KEY` | JSON service account (satu baris) untuk Firebase Admin di server — **rahasia** |
| `GOOGLE_SITE_VERIFICATION` | isi meta verifikasi Google Search Console |
| `GOOGLE_ANALYTICS_ID` | ID GA4 (`G-XXXXXXXXXX`) |

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | build produksi (preset Firebase) |
| `npm run lint` / `lint:fix` | ESLint (`@nuxt/eslint-config` + Prettier) |
| `npm run format -- <path>` | Prettier — format file yang kamu sentuh saja |
| `npm run typecheck` | vue-tsc dengan *ratchet*: error lama ditoleransi, error baru gagal |
| `npm run test:routes` | route parity — URL page & API harus sama dengan baseline |
| `npm run build:test` lalu `npm run test:screens` | screenshot parity rute publik (desktop & mobile) |
| `npm run build:test` lalu `npm run test:e2e` | E2E alur data di Firebase Emulator Suite (butuh Java 11+; `firebase-tools` diambil via `npx`, atau set `FIREBASE_BIN`) |
| `npm run check` | lint + typecheck + route parity (yang dijalankan CI) |

## Struktur (saat ini)

```
app/         halaman, komponen, composable, plugin (Nuxt 4 srcDir)
server/      API Nitro (Firebase Admin, WebAuthn, sitemap)
public/      aset statis
scripts/     script utilitas — lihat scripts/README.md
docs/        dokumentasi (skema database)
tests/       route/screenshot/typecheck parity + baseline
```

Struktur target (`features/` per domain, page tipis, Kliping UI) ada di GOLDEN-PLAN §4.

## Deploy

Otomatis via GitHub Actions (`.github/workflows/firebase-deploy.yml`) setiap push ke
`main`: build → deploy Hosting, Functions, Firestore rules, Storage rules.
Setiap PR menjalankan `.github/workflows/check.yml`.

Firebase Hosting hanya meneruskan cookie bernama `__session` ke server — ingat ini bila
menambah cookie yang perlu dibaca SSR.
