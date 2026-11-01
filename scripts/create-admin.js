// ============================================================
// CREATE SUPER ADMIN (lokal)
// File: scripts/create-admin.js
//
// Membuat akun SUPER_ADMIN lewat endpoint POST /api/create-user
// di dev server lokal (`npm run dev` harus sedang jalan).
//
// [S1 — T13] Dulu email & password ditulis langsung di file ini
// (dan sudah masuk riwayat git). Sekarang dibaca dari env supaya
// tidak ada kredensial di repo:
//
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/create-admin.js
//
// Opsional: ADMIN_NAME (default "Super Admin Utama"),
//           API_URL (default http://localhost:3000).
// ============================================================

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME || 'Super Admin Utama'
const apiUrl = process.env.API_URL || 'http://localhost:3000'

if (!email || !password) {
  console.error('ADMIN_EMAIL dan ADMIN_PASSWORD wajib di-set. Contoh:')
  console.error(
    '  ADMIN_EMAIL=admin@contoh.com ADMIN_PASSWORD=rahasia node scripts/create-admin.js',
  )
  process.exit(1)
}

console.log('Membuat akun super admin...')

fetch(`${apiUrl}/api/create-user`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name, role: 'SUPER_ADMIN' }),
})
  .then(async (response) => {
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(result?.message || 'Gagal membuat akun admin.')
    }
    console.log('Akun berhasil dibuat:', result)
  })
  .catch((error) => {
    console.error('Error:', error.message || error)
    process.exit(1)
  })
