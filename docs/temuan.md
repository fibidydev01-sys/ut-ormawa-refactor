# 🔎 Temuan — Ormawa UT Surabaya

> Semua bug, celah keamanan, dan keanehan perilaku yang ditemukan selama refactor.
> **Fase A (S0–S5) tidak memperbaiki apa pun di sini** (Golden Rule R1: fitur tidak
> berubah). Perilaku lama justru _dikunci_ oleh tes supaya refactor tidak mengubahnya
> diam-diam. Perbaikan dikerjakan di Fase B atau sebagai hotfix, **setelah disetujui**.
>
> Rencana & aturan refactor: [`GOLDEN-PLAN.md`](../GOLDEN-PLAN.md).

## Cara membaca

| Tingkat   | Arti                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| 🔴 Kritis | Bisa disalahgunakan orang luar sekarang juga. Perlu hotfix di produksi.                        |
| 🟠 Tinggi | Fitur penting rusak di produksi, atau data sensitif terpapar.                                  |
| 🟡 Sedang | Fitur berjalan tapi perilakunya salah/membingungkan, atau risiko yang butuh akses orang dalam. |
| ⚪ Rendah | Kerapian, placeholder, atau kenyamanan.                                                        |

| Status                | Arti                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| 🔒 Dikunci tes        | Perilaku lama dijaga E2E/screenshot; perbaikan menunggu keputusan                   |
| ⏳ Menunggu keputusan | Butuh jawaban pemilik proyek (lihat [Pertanyaan](#pertanyaan-untuk-pemilik-proyek)) |
| 📅 Terjadwal          | Sudah masuk roadmap sesi tertentu                                                   |
| ✅ Selesai            | Sudah ditangani                                                                     |

**Bukti** merujuk ke file di repo ini (path sesudah refactor) atau ke skenario E2E di
`tests/e2e/`. Skenario E2E bisa dijalankan ulang: `npm run build:test && npm run test:e2e -- --only=<nama>`.

---

## Ringkasan

| ID          | Tingkat | Area               | Temuan                                                                             | Status                       | Rencana         |
| ----------- | ------- | ------------------ | ---------------------------------------------------------------------------------- | ---------------------------- | --------------- |
| [T8](#t8)   | 🔴      | Keamanan / API     | API `create-user` & `delete-user` tanpa cek pemanggil                              | ✅ S7 + hotfix produksi      | Hotfix + S7     |
| [T28](#t28) | 🔴      | Keamanan / Storage | Siapa pun (tanpa login) bisa upload ke folder `organizations/` & `articles/`       | ⏳ Q6                        | Hotfix rules    |
| [T14](#t14) | 🟠      | Keamanan / Data    | Password user disimpan & ditampilkan **plaintext**                                 | ⏳ Q5                        | Fase B          |
| [T13](#t13) | 🟠      | Keamanan / Repo    | Password SUPER_ADMIN pernah ter-commit                                             | ✅ script / ⚠ ganti password | —               |
| [T26](#t26) | 🟠      | Keamanan / Rules   | Semua user login (termasuk mahasiswa) bisa tambah/ubah/hapus organisasi            | ⏳ Q6                        | Hotfix rules    |
| [T27](#t27) | 🟠      | Keamanan / Rules   | Semua user login bisa menimpa struktur pengurus                                    | ⏳ Q6                        | Hotfix rules    |
| [T22](#t22) | 🟠      | Keamanan / XSS     | Isi artikel dirender `v-html` tanpa sanitasi                                       | ⏳ Q7                        | Fase B          |
| [T19](#t19) | 🟠      | Fitur / Rules      | Profil mahasiswa tidak pernah bisa disimpan; login mahasiswa pertama kali error    | 🔒 ⏳ Q8                     | Fase B          |
| [T18](#t18) | 🟠      | Fitur / Rules      | Log aktivitas selalu ditolak → panel aktivitas selalu kosong                       | 🔒 ⏳ Q8                     | Fase B          |
| [T20](#t20) | 🟠      | Fitur / Auth       | Login & daftar sidik jari tidak bisa jalan di domain produksi                      | 🔒                           | Fase B, uji S14 |
| [T16](#t16) | 🟡      | Performa / Auth    | Buka `/dashboard/*` tanpa login: tunggu 5 detik baru redirect                      | ✅ S6                        | —               |
| [T24](#t24) | 🟡      | Fitur / Auth       | Akun `SUPER_ADMIN` yang login pakai sidik jari dibawa ke dashboard mahasiswa       | ✅                           | S7              |
| [T25](#t25) | 🟡      | Fitur / Auth       | `kelola-user` & tab Pengguna admin-area hanya untuk role lama `super_admin`        | 🔒                           | Fase B          |
| [T23](#t23) | 🟡      | Fitur / API        | `delete-user` gagal 500 bila server belum pernah menjalankan `create-user`         | ✅                           | S7              |
| [T17](#t17) | 🟡      | UX                 | Modal Organisasi & Users tidak menutup setelah simpan/hapus                        | 🔒 ⏳                        | Fase B          |
| [T15](#t15) | 🟡      | Keamanan / Akses   | `/dashboard/mahasiswa` bisa dibuka tanpa login                                     | ✅                           | S7              |
| [T29](#t29) | 🟡      | Fitur              | Form UKM, IMF, Aspirasi, Pelaporan, Cari Teman hanya _mock_ — data tidak tersimpan | ⏳ Q9                        | —               |
| [T6](#t6)   | 🟡      | Auth               | User tanpa dokumen `users` dianggap mahasiswa                                      | 🔒                           | —               |
| [T4](#t4)   | 🟡      | Struktur           | Dua area admin paralel (lama & baru)                                               | ⏳                           | setelah S14     |
| [T7](#t7)   | 🟡      | Produksi           | `/sandbox` ikut ter-deploy                                                         | ⏳ Q1                        | —               |
| [T10](#t10) | 🟡      | Auth               | Passkey terikat domain (RP ID)                                                     | 📅                           | S14             |
| [T2](#t2)   | ⚪      | Navigasi           | 5 menu sidebar ke halaman yang belum ada                                           | ⏳ Q1                        | —               |
| [T3](#t3)   | ⚪      | Navigasi           | Menu mobile `/market` ke halaman yang belum ada                                    | ⏳ Q1                        | —               |
| [T30](#t30) | ⚪      | Navigasi           | "Beranda Publik" di menu profil mengarah ke `/dashboard`                           | ⏳                           | —               |
| [T31](#t31) | ⚪      | UI                 | Indikator debug "Role: …" tampil di sidebar                                        | ⏳                           | —               |
| [T32](#t32) | ⚪      | Konten             | Tautan sosial & footer masih placeholder (`#`, `/`, `instagram.com`)               | ⏳                           | —               |
| [T33](#t33) | ⚪      | Performa           | Gambar contoh dari `images.unsplash.com` (eksternal)                               | 📅                           | S12             |
| [T34](#t34) | 🟡      | Performa           | HTML `/beranda` & `/media/artikel` memuat isi lengkap SEMUA artikel terbit         | ⏳                           | S12             |
| [T35](#t35) | ⚪      | Konten             | Artikel baru tampil di beranda paling lambat 10 menit (cache CDN)                  | ℹ️ disengaja                 | —               |
| [T1](#t1)   | ⚪      | URL                | `/dashboard/Highlight-terkini` berhuruf kapital                                    | ⏳ Q1                        | —               |
| [T5](#t5)   | ⚪      | Tipe               | Role `mahasiswa` tidak ada di tipe `UserRole`                                      | ✅ S2                        | —               |
| [T9](#t9)   | ⚪      | Aset               | Nama file gambar berspasi                                                          | 📅                           | S12             |
| [T11](#t11) | ⚪      | Rendering          | Halaman ter-cache vs tombol khusus user                                            | 📅                           | S8              |
| [T12](#t12) | ⚪      | UI                 | Tailwind v4 mengganti beberapa nama kelas                                          | 📅                           | S9              |

---

## 🔴 Kritis

### T8

**API `create-user` & `delete-user` tidak memeriksa siapa pemanggilnya.**

- **Bukti:** `server/api/create-user.post.ts`, `server/api/delete-user.post.ts` — tidak ada
  `verifyIdToken`, cookie, atau cek role. E2E `users: …` memanggilnya dari browser biasa.
- **Dampak:** siapa pun yang tahu URL bisa `POST /api/create-user` dengan
  `role: "SUPER_ADMIN"` lalu login sebagai super admin, atau menghapus akun siapa saja
  lewat `/api/delete-user`.
- **Rekomendasi:** wajibkan ID token/session cookie + role `SUPER_ADMIN`
  (`server/utils/requireRole.ts`, rencana S7). **Hotfix di repo produksi `ormawautsby`
  sekarang**, tidak menunggu refactor.
- **Status:** ✅ S7 — `requireSuperAdmin()` (`server/utils/requireRole.ts`) di awal kedua
  endpoint: menerima `Authorization: Bearer <ID token>` atau cookie `__session`, lalu cek
  `users/{uid}.role === SUPER_ADMIN`. Tanpa/kredensial palsu → 401, role lain → 403. Client
  (`users.service.ts`) mengirim ID token. `scripts/create-admin.js` kini memakai Admin SDK
  langsung untuk membuat SUPER_ADMIN pertama. Dikunci E2E `sesi: /api/create-user &
/api/delete-user hanya SUPER_ADMIN`. Hotfix setara di repo produksi `ormawautsby`
  (branch `claude/ut-ormawa-refactor-struktur-nvvlt0`) — menunggu review & merge pemilik.

### T28

**Storage: folder `organizations/` dan `articles/` bisa ditulis siapa saja.**

- **Bukti:** `storage.rules` baris 30–43 — `allow write: if true;`
- **Dampak:** orang tanpa login bisa mengunggah/menimpa file apa pun (bukan hanya
  gambar, tanpa batas ukuran) ke bucket → biaya storage, hosting konten ilegal, atau
  mengganti logo/cover yang sedang dipakai.
- **Rekomendasi:** samakan dengan folder `pengurus/`:
  `isAuthenticated() && isImage() && isFileSizeValid()`. Upload dari dashboard tetap jalan
  karena admin selalu login. Bisa dikunci dulu dengan tes E2E upload sebelum diubah.

---

## 🟠 Tinggi

### T14

**Password disimpan dan ditampilkan sebagai teks biasa.**

- **Bukti:** admin-area & kelola-user menulis `password` ke dokumen `users`
  (`users.service.ts` → `setUserRecord`) dan menampilkannya lewat tombol "lihat password"
  (`pages/dashboard/admin-area/index.vue`, `kelola-user.vue`).
- **Dampak:** siapa pun yang bisa membaca koleksi `users` (semua ADMIN, lihat rules) melihat
  password user lain.
- **Rekomendasi:** berhenti menyimpan field `password` (Firebase Auth sudah menyimpannya
  dengan aman), hapus tampilannya, lalu bersihkan field lama di Firestore. (Q5)

### T13

**Password SUPER_ADMIN pernah ter-commit.**

- **Bukti:** riwayat git `create-admin.js` berisi `SuperAdmin123!`.
- **Status:** ✅ S1 — `scripts/create-admin.js` kini membaca `ADMIN_EMAIL`/`ADMIN_PASSWORD`
  dari env. ⚠ **Password lama tetap ada di riwayat git** → ganti password akun itu di
  produksi bila masih dipakai.

### T26

**Semua user yang login bisa tambah/ubah/hapus organisasi.**

- **Bukti:** `firestore.rules` baris 85–97 — create/update/delete cukup `isAuthenticated()`.
- **Dampak:** mahasiswa yang login (Google/magic link) bisa menghapus organisasi lewat
  SDK di console browser. UI tidak menampilkan tombolnya, tapi rules tidak mencegah.
- **Rekomendasi:** batasi ke `isSuperAdmin()` (atau admin yang punya modul
  `manage_organizations`). (Q6)

### T27

**Semua user yang login bisa menimpa struktur pengurus.**

- **Bukti:** `firestore.rules` baris 129–135 — `allow write: if isAuthenticated();`
- **Dampak:** sama seperti T26 untuk dokumen `pengurus/struktur_aktif` yang tampil di
  halaman publik.
- **Rekomendasi:** batasi ke SUPER_ADMIN / modul `manage_structure`. (Q6)

### T22

**Isi artikel dirender `v-html` tanpa sanitasi (_stored XSS_).**

- **Bukti:** `features/articles/article-detail.vue` (`<article v-html="article.content">`).
- **Dampak:** admin mana pun yang boleh menulis artikel bisa menyisipkan `<script>`/atribut
  `onerror` yang jalan di browser setiap pembaca `/berita/*`.
- **Rekomendasi:** sanitasi saat render (DOMPurify / `isomorphic-dompurify` untuk SSR)
  dan/atau saat simpan. (Q7)

### T19

**Profil mahasiswa tidak pernah bisa disimpan; login mahasiswa pertama kali selalu error.**

- **Bukti:** rules `users` hanya mengizinkan membuat dokumen sendiri dengan `role == 'ADMIN'`
  dan update hanya `full_name`. Dikunci E2E:
  `mahasiswa: profil dimuat …; simpan ditolak rules` dan
  `auth: magic link email → login; dokumen mahasiswa baru ditolak rules`.
- **Dampak:** edit profil mahasiswa selalu memunculkan "Terjadi kesalahan saat menyimpan
  data."; login magic link/Google pertama kali menampilkan "Tautan login tidak valid…"
  padahal akun sudah ter-login.
- **Rekomendasi:** rules khusus mahasiswa (boleh membuat/mengubah dokumen sendiri dengan
  `role == 'mahasiswa'` dan field terbatas). Perlu keputusan desain. (Q8)

### T18

**Log aktivitas selalu ditolak.**

- **Bukti:** `firestore.rules` tidak punya `match /activityLogs`. Dikunci E2E
  `admin-area (lama): … activityLogs ditolak rules`.
- **Dampak:** `logActivity()` gagal diam-diam; panel "Aktivitas" admin-area & mahasiswa
  selalu "Belum ada aktivitas".
- **Rekomendasi:** tambah rule (tulis: user login untuk `aktorUid` dirinya sendiri; baca:
  SUPER_ADMIN atau pemilik). (Q8)

### T20

**Sidik jari (passkey) tidak bisa jalan di produksi.**

- **Bukti:** `server/api/webauthn/*.ts` — `rpID = 'localhost'`,
  `origin = 'http://localhost:3000'` di-hardcode. E2E passkey hanya bisa jalan di
  `http://localhost:3000`.
- **Dampak:** di `ormawa-utsurabaya.web.app` browser menolak RP ID yang tidak cocok →
  daftar & login sidik jari selalu gagal.
- **Rekomendasi:** ambil RP ID & origin dari `runtimeConfig` (`siteUrl`). Uji ulang di
  preview channel (S14).

---

## 🟡 Sedang

### T16

**SSR `/dashboard/*` tanpa login menunggu 5 detik.**

- **Bukti:** `app/middleware/auth.ts` menunggu `isAuthReady` (hanya diisi di client) dengan
  timeout 5 detik. Terukur 5,1 s vs 0,05 s untuk `/beranda` (S2).
- **Dampak:** setiap buka/refresh halaman dashboard langsung dari URL terasa "hang"; reload
  di dashboard selalu dilempar ke login.
- **Status:** ✅ S6 — `/dashboard/**` kini SPA (`ssr: false`): server langsung membalas 200 dan gate auth berjalan di browser. Dikunci E2E `render: buka /dashboard/users langsung via URL…`. Session cookie (S7) tetap dibutuhkan agar halaman publik tahu status login.

### T24

**Login sidik jari akun `SUPER_ADMIN` diarahkan ke dashboard mahasiswa.**

- **Bukti:** `pages/login/admin.vue` — login password memakai `.toLowerCase()` (baris ±323),
  login passkey tidak (baris ±368), lalu keduanya dibandingkan dengan `'super_admin'`,
  `'admin'`, `'pengurus'` (huruf kecil).
- **Dampak:** akun skema baru (`SUPER_ADMIN`/`ADMIN` huruf besar) yang login lewat sidik
  jari masuk ke `/dashboard/mahasiswa`. (Saat ini tertutup oleh T20 di produksi.)
- **Rencana:** satu fungsi penentu tujuan setelah login (pakai `normalizeRole`) di S7.
- **Status:** ✅ S7 — login passkey kini juga `.toLowerCase()` (sama dengan login password),
  perubahan terkecil yang menyamakan keduanya. Dikunci E2E `auth: login sidik jari akun
SUPER_ADMIN → /dashboard (T24)`.

### T25

**`kelola-user` hanya untuk role lama `super_admin`.**

- **Bukti:** `kelola-user.vue` baris ±153 dan `admin-area/index.vue` baris 76, 197, 672
  membandingkan `userRole === 'super_admin'` persis.
- **Dampak:** akun skema baru `SUPER_ADMIN` mendapat alert "Akses Ditolak" di kelola-user
  dan tidak melihat tab Pengguna di admin-area (kecuali baru saja login lewat form
  password, yang menyimpan role huruf kecil sementara).
- **Rekomendasi:** pakai `normalizeRole` / `useAuthStore().isSuperAdmin`. Terkait T4.

### T23

**`delete-user` bergantung pada `create-user` dipanggil lebih dulu.**

- **Bukti:** `server/api/delete-user.post.ts` baris 13 hanya mengecek `getApps().length`
  tanpa menginisialisasi Firebase Admin sendiri.
- **Dampak:** pada instance server yang baru menyala (cold start Cloud Functions), hapus
  user bisa gagal 500 "Firebase Admin not initialized" sampai ada request lain yang
  menginisialisasi Admin SDK.
- **Rencana:** pakai `getAdminAuth()` dari `server/utils/firebaseAdmin.ts` (S7, bersama T8).
- **Status:** ✅ S7 — kedua endpoint memakai `getAdminAuth()/getAdminDb()` (inisialisasi tunggal).

### T17

**Modal Organisasi & Users tidak menutup setelah simpan/hapus.**

- **Bukti:** `closeModal()`/`cancelDelete()` dipanggil saat `isSubmitting`/`isDeleting`
  masih `true` sehingga langsung `return`. Dikunci E2E `organisasi: …` dan `users: …`.
- **Dampak:** data tersimpan, tapi modal tetap terbuka dengan isian lama; user harus
  menekan "Batal".
- **Rekomendasi:** pindahkan `closeModal()` setelah `isSubmitting = false` (1 baris per
  handler).

### T15

**`/dashboard/mahasiswa` & `/edit-profil` bisa dibuka tanpa login.**

- **Bukti:** halaman tidak memakai middleware `auth`. Dikunci E2E
  `mahasiswa: halaman dashboard terbuka tanpa login`.
- **Dampak:** kerangka halaman terlihat orang luar; data tetap aman (hanya dimuat bila login).
- **Rencana:** gate khusus mahasiswa di S7 (butuh persetujuan).
- **Status:** ✅ S7 — middleware `login-required` (cukup login, role apa pun); belum login →
  `/login/mahasiswa`. Middleware `auth` tidak dipakai karena menolak role `mahasiswa`.
  E2E `mahasiswa: halaman dashboard & edit-profil wajib login (T15)`.

### T29

**Beberapa form publik hanya _mock_.**

- **Bukti:** `zona-kampus-ukm.vue`, `zona-kampus-imf.vue`, `kontak-aspirasi.vue`,
  `kontak-pelaporan.vue` hanya `console.log` + `alert("…berhasil…")`; Cari Teman menyimpan
  profil hanya di memori halaman.
- **Dampak:** pengunjung mengira pendaftaran/aspirasi/laporan sudah terkirim, padahal
  datanya hilang.
- **Rekomendasi:** putuskan: sambungkan ke Firestore/WA/email, atau beri label
  "segera hadir". (Q9)

### T34

**Payload halaman publik membawa isi lengkap semua artikel.**

- **Bukti:** `server/api/public/articles.get.ts` mengirim seluruh field (termasuk `content` HTML)
  semua artikel terbit, padahal beranda & katalog hanya butuh judul, cover, tanggal, dan cuplikan.
  Sebelum S6 data yang sama diunduh Firestore client; kini ikut di HTML/payload SSR.
- **Dampak:** ukuran HTML membesar seiring jumlah artikel → LCP lebih lambat.
- **Rekomendasi:** API mengirim `excerpt` (± 200 karakter) tanpa `content`; pagination bila
  artikel > 50 (S12).

### T6

User yang login tapi tidak punya dokumen `users` (atau gagal dibaca) dianggap
`mahasiswa` (`services/firebase.ts` → `fetchUserAccess`). Aman selama rules Firestore
menjadi penjaga akhir, tapi rawan bila rules dilonggarkan.

### T4

Dua area admin hidup berdampingan: `admin-area/*` (skema lama: `nama`, `prodi`,
`password`, role huruf kecil) dan `users`/`organizations`/`Highlight-terkini` (skema baru).
Penyebab T14, T25. Setelah S5 logika manajemen user skema lama masih ada **dua salinan**
(`features/admin-area/use-admin-area-home.ts` & `use-admin-area-users.ts`). Usulan: satukan
setelah S14 bersamaan dengan migrasi ke skema baru.

### T7

`/sandbox` (halaman uji) ikut ter-deploy ke produksi. Usulan: nonaktifkan di produksi
lewat `routeRules`. (Q1)

### T10

Passkey terikat RP ID/domain — selain memperbaiki T20, uji ulang di setiap domain
(preview & produksi) saat cutover (S14).

---

## ⚪ Rendah

| ID                  | Temuan                                                                                                | Bukti / catatan                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <a id="t1"></a>T1   | URL `/dashboard/Highlight-terkini` berhuruf kapital                                                   | Dipertahankan (R2). Opsi: alias huruf kecil (Q1)                                   |
| <a id="t2"></a>T2   | Sidebar menautkan `/dashboard/admin-area/{profil,event,galeri,keanggotaan,pengaturan}` yang belum ada | `constants/dashboard-menu.ts` (Q1)                                                 |
| <a id="t3"></a>T3   | Menu mobile menautkan `/market` yang belum ada                                                        | `constants/nav.ts` (Q1)                                                            |
| <a id="t5"></a>T5   | Role `mahasiswa` tidak ada di tipe `UserRole`                                                         | ✅ S2: tipe `AppRole`                                                              |
| <a id="t9"></a>T9   | Nama file gambar berspasi (`Background ormawa.png`, `ZAENAL ARIFIN.jpg`)                              | Rename di S12                                                                      |
| <a id="t11"></a>T11 | Halaman ber-cache (ISR) tidak boleh menyimpan tombol khusus user                                      | `AuthAction` client-side, S8                                                       |
| <a id="t12"></a>T12 | Tailwind v4 mengganti beberapa nama kelas                                                             | `@tailwindcss/upgrade` + screenshot, S9                                            |
| <a id="t30"></a>T30 | "Beranda Publik" di dropdown profil dashboard mengarah ke `/dashboard`                                | `components/layout/nav-user.vue`                                                   |
| <a id="t31"></a>T31 | Indikator debug "Role: …" tampil ke semua admin                                                       | `components/layout/dashboard-sidebar.vue`                                          |
| <a id="t32"></a>T32 | Tautan sosial (`instagram.com`, `facebook.com`, …) & footer (`#`, `/`) masih placeholder              | `features/media/media.data.ts`, `constants/site.ts`, `site-footer.vue`             |
| <a id="t35"></a>T35 | Sejak S6, `/beranda` & `/media/artikel` di-cache CDN 10 menit (`/berita/*` & struktur pengurus 1 jam) | Konsekuensi ISR yang disengaja; durasi diatur di `nuxt.config.ts` → `isrHeaders()` |
| <a id="t33"></a>T33 | Gambar contoh dari `images.unsplash.com` (kegiatan, profil Cari Teman)                                | Ketergantungan eksternal; pertimbangkan aset lokal di S12                          |

> T21 sempat dilaporkan di chat ("modal Cari Teman tidak pernah dirender") — **keliru**,
> modalnya ada setelah footer. Dibatalkan; nomor tidak dipakai ulang.

---

## Pertanyaan untuk pemilik proyek

Centang & tulis jawabannya di sini.

- [x] **Q0 — T8:** amankan `create-user`/`delete-user` (wajib SUPER_ADMIN)? Hotfix di produksi sekarang?
      → **Ya + hotfix produksi.** Selesai di S7; hotfix produksi menunggu merge.
- [ ] **Q1 — T1/T2/T3/T7:** rapikan setelah refactor (alias URL, sembunyikan menu kosong, matikan `/sandbox`), atau biarkan?
- [ ] **Q2:** lama sesi login: 7 hari (default) atau 14 hari (maks Firebase)?
- [x] **Q3:** `/login/*` saat sudah login: kartu "Buka Dashboard" (rekomendasi) atau redirect otomatis?
      → **Kartu** "Anda sudah masuk — Buka Dashboard" (S8).
- [x] **Q4:** gaya cookie banner: bar bawah (rekomendasi) atau modal tengah seperti Fibidy?
      → **Bar bawah** kecil (S8).
- [ ] **Q5 — T14:** berhenti menyimpan/menampilkan password plaintext?
- [ ] **Q6 — T26/T27/T28:** perketat rules Firestore & Storage (hotfix)?
- [ ] **Q7 — T22:** sanitasi HTML artikel?
- [ ] **Q8 — T18/T19:** desain rules untuk mahasiswa & log aktivitas?
- [ ] **Q9 — T29:** form mock (UKM, IMF, aspirasi, pelaporan, cari teman) disambungkan ke backend atau diberi label "segera hadir"?
- [x] **Q10 — Logout (S7):** cukup hapus cookie di browser ini (sekarang), atau sekalian cabut sesi di **semua perangkat** (`revokeRefreshTokens`)?
      → **Hanya perangkat ini** (perilaku sekarang dipertahankan).

---

## Aturan pencatatan

1. Temuan baru → tambah baris di **Ringkasan** + detail di bagian tingkatnya. ID lanjut
   dari yang terakhir; ID lama tidak dipakai ulang.
2. Sertakan **bukti** yang bisa dicek ulang (file + baris, skenario E2E, atau pengukuran).
3. Bila perilaku itu sedang dijaga tes, tulis nama skenarionya dan status 🔒.
4. Saat diperbaiki: ubah status ke ✅, catat sesi/commit, dan perbarui tes yang mengunci
   perilaku lama.
