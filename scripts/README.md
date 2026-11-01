# scripts/

Script utilitas yang dulu tercecer di root repo (GOLDEN-PLAN R10).
Semua dijalankan **dari root repo**.

| Script | Fungsi | Cara pakai |
|---|---|---|
| `create-admin.js` | Membuat akun `SUPER_ADMIN` pertama langsung dengan Firebase Admin SDK (sejak S7 `/api/create-user` wajib login SUPER_ADMIN) | `ADMIN_EMAIL=… ADMIN_PASSWORD=… node scripts/create-admin.js` (butuh `serviceAccountKey.json`) |
| `seed-organizations.js` | Seed organisasi IM FST/FEB/FHISIP/FKIP ke Firestore | `node scripts/seed-organizations.js` |
| `add-ormawa-organizations.js` | Tambah organisasi BPH & divisi ke Firestore | `node scripts/add-ormawa-organizations.js` |
| `fix-deploy.cjs` | Menyiapkan `.output/server` untuk Firebase Functions (Windows: pakai `xcopy`) | dipanggil `deploy.bat` |
| `deploy.bat` | Build + deploy manual dari Windows | `scripts\deploy.bat` |

Script seed membaca `serviceAccountKey.json` di **root repo** (sudah di-`.gitignore`,
jangan pernah di-commit).

Deploy resmi lewat GitHub Actions (`.github/workflows/firebase-deploy.yml`) saat push ke
`main` — tidak memakai script di folder ini.

## legacy/

Versi lama yang sudah digantikan, disimpan sementara untuk referensi. **Kandidat hapus**
setelah cutover (S14):

| Script | Digantikan oleh |
|---|---|
| `fix-deploy.js` | `fix-deploy.cjs` (versi `.js` memakai `require` padahal package `"type": "module"` — tidak bisa jalan) |
| `add-fb-functions.cjs` | langkah 4 di `fix-deploy.cjs` |
| `remove-sharp.py` | langkah 1 di `fix-deploy.cjs` |
