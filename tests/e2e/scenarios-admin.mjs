// ============================================================
// Skenario E2E — users, struktur pengurus, admin-area (lama)
// File: tests/e2e/scenarios-admin.mjs
//
// Sebagian assertion SENGAJA mengunci perilaku lama yang aneh
// (mis. activityLogs selalu ditolak rules, modal tak menutup) —
// lihat GOLDEN-PLAN §13 T17–T19. Fase A tidak boleh mengubahnya.
// ============================================================

import { seedUser, seedOrganization, loginAdmin, eventually, assert } from './helpers.mjs'
import { asSuperAdmin, spaNavigate, PNG_1PX } from './scenarios.mjs'

const modal = (page) => page.locator('form:has(button[type="submit"])').last()

export const ADMIN_SCENARIOS = [
  {
    name: 'users: daftar, tambah ADMIN via API, edit modul, hapus via API',
    async run({ page, admin, BASE_URL }) {
      await seedOrganization(admin, 'robotika', {
        name: 'UKM Robotika',
        organization_type: 'UNIT_KEGIATAN_MAHASISWA',
      })
      await seedUser(admin, { email: 'zed@ormawa.test', role: 'ADMIN', fullName: 'Zed Terakhir' })
      await asSuperAdmin(page, admin, BASE_URL, 'Users')
      await page.getByText('Zed Terakhir').waitFor()
      const body = await page.locator('tbody').innerText()
      assert(
        body.indexOf('Super Satu') < body.indexOf('Zed Terakhir'),
        'daftar user tidak urut nama',
      )

      // Tambah → POST /api/create-user (Admin SDK → Auth Emulator)
      await page.getByRole('button', { name: /Tambah Pengguna/ }).click()
      const f = modal(page)
      await f.locator('input[type="email"]').fill('baru@ormawa.test')
      await f.locator('input[type="password"]').fill('password-baru')
      await f.locator('input[type="text"]').first().fill('Pengurus Baru')
      await f.locator('select').first().selectOption('ADMIN')
      await f.locator('select').nth(1).selectOption('robotika')
      await f.locator('input[value="manage_articles"]').check()
      await f.locator('button[type="submit"]').click()

      const created = await eventually(
        async () => {
          try {
            return await admin.auth.getUserByEmail('baru@ormawa.test')
          } catch {
            return null
          }
          // Panggilan pertama Firebase Admin di server bisa lambat (lookup metadata
          // GCE ditolak proxy di lingkungan container/CI) — bukan perilaku aplikasi.
        },
        'akun Auth tidak dibuat lewat /api/create-user',
        30_000,
      )
      const doc = (await admin.db.doc(`users/${created.uid}`).get()).data()
      assert(
        doc.role === 'ADMIN' && doc.organization_id === 'robotika',
        `dokumen user salah: ${JSON.stringify(doc)}`,
      )
      assert(JSON.stringify(doc.access_modules) === '["manage_articles"]', 'access_modules salah')
      assert(doc.full_name === 'Pengurus Baru', 'full_name salah')
      await page.getByText('Pengurus Baru').waitFor()
      await page
        .getByRole('button', { name: 'Batal' })
        .click()
        .catch(() => {})

      // Edit → updateDoc langsung di Firestore
      const row = page.locator('tr', { hasText: 'Pengurus Baru' })
      await row.getByRole('button', { name: /Edit/ }).click()
      await modal(page).locator('input[value="manage_structure"]').check()
      await modal(page).locator('button[type="submit"]').click()
      await eventually(async () => {
        const d = (await admin.db.doc(`users/${created.uid}`).get()).data()
        return (
          d.access_modules.includes('manage_structure') &&
          d.access_modules.includes('manage_articles')
        )
      }, 'edit modul akses tidak tersimpan')
      await page
        .getByRole('button', { name: 'Batal' })
        .click()
        .catch(() => {})

      // Hapus → POST /api/delete-user
      await page
        .locator('tr', { hasText: 'Pengurus Baru' })
        .getByRole('button', { name: /Hapus/ })
        .click()
      await page.locator('div.fixed').last().getByRole('button', { name: /Hapus/ }).last().click()
      await eventually(
        async () => !(await admin.db.doc(`users/${created.uid}`).get()).exists,
        'dokumen user tidak terhapus',
      )
      await eventually(async () => {
        try {
          await admin.auth.getUser(created.uid)
          return false
        } catch {
          return true
        }
      }, 'akun Auth tidak terhapus lewat /api/delete-user')
    },
  },
  {
    name: 'pengurus: simpan BPH + bidang (foto) → tampil di /profil/struktur-pengurus',
    async run({ page, admin, BASE_URL }) {
      await asSuperAdmin(page, admin, BASE_URL, 'Struktur Pengurus')
      await page.waitForURL('**/admin-area/struktur-pengurus')
      await page.locator('#btn-tambah-bph').click()
      await page.getByPlaceholder('cth: Ketua Umum, Sekretaris Umum').fill('Ketua Umum')
      await page.getByPlaceholder('cth: Ahmad Fauzi').fill('Rina Ketua')
      await page.getByPlaceholder('cth: 043219082').fill('041111111')
      await page.locator('input[type="file"]').first().setInputFiles(PNG_1PX)
      await page.getByText('Foto berhasil diunggah!').waitFor()

      await page.locator('#btn-tambah-bidang').click()
      await page.getByPlaceholder('Nama bidang, cth: Bidang Keilmuan').fill('Bidang Keilmuan')
      await page.getByRole('button', { name: 'Tambah Anggota', exact: true }).click()
      await page.locator('#btn-simpan-struktur').click()
      await page.getByText('Struktur pengurus berhasil disimpan!').waitFor()

      const data = (await admin.db.doc('pengurus/struktur_aktif').get()).data()
      assert(data.bph.length === 1 && data.bph[0].name === 'Rina Ketua', 'BPH tidak tersimpan')
      assert(/127\.0\.0\.1:9199\/.*pengurus%2F/.test(data.bph[0].photo), 'foto BPH tidak terunggah')
      assert(
        data.bidang.length === 1 && data.bidang[0].name === 'Bidang Keilmuan',
        'bidang tidak tersimpan',
      )
      assert(
        data.bidang[0].koordinator.jabatan === 'Koordinator' && data.bidang[0].anggota.length === 1,
        'struktur bidang salah',
      )
      assert(data.updated_at, 'updated_at kosong')

      // Muat ulang lewat navigasi app (reload SSR di /dashboard selalu ke login — T16)
      await spaNavigate(page, '/dashboard')
      await page
        .locator('aside')
        .getByRole('link', { name: 'Struktur Pengurus', exact: true })
        .click()
      await eventually(
        async () => (await page.getByPlaceholder('cth: Ahmad Fauzi').inputValue()) === 'Rina Ketua',
        'data tidak dimuat ulang di editor',
      )

      await page.goto(`${BASE_URL}/profil/struktur-pengurus`, { waitUntil: 'load' })
      await page.getByText('Rina Ketua').waitFor()
      await page.getByText('Bidang Keilmuan').first().waitFor()
    },
  },
  {
    name: 'admin-area (lama): catatan pribadi tersimpan; kelola-user edit & hapus; activityLogs ditolak rules',
    async run({ page, admin, BASE_URL }) {
      // Role lowercase gaya lama — kelola-user hanya mau 'super_admin' persis.
      const uid = await seedUser(admin, {
        email: 'legacy@ormawa.test',
        role: 'super_admin',
        fullName: 'Legacy',
      })
      const target = await seedUser(admin, {
        email: 'ukm@ormawa.test',
        role: 'admin',
        fullName: 'x',
        extra: { nama: 'Ketua UKM Lama', prodi: 'Unit Kegiatan', password: 'plain-lama' },
      })
      await loginAdmin(page, BASE_URL, 'legacy@ormawa.test')
      await page.waitForURL('**/dashboard')

      await spaNavigate(page, '/dashboard/admin-area')
      const note = page.locator('textarea').first()
      await note.waitFor()
      await note.fill('Rapat jam 9')
      await eventually(
        async () =>
          (await admin.db.doc(`users/${uid}`).get()).data().personalNote === 'Rapat jam 9',
        'catatan pribadi tidak tersimpan (debounce 1s)',
      )

      await spaNavigate(page, '/dashboard/admin-area/kelola-user')
      await page.getByText('Ketua UKM Lama').waitFor()
      await page
        .locator('tr', { hasText: 'Ketua UKM Lama' })
        .getByRole('button', { name: 'Edit' })
        .click()
      await page.getByPlaceholder('Contoh: Ketua IMF FEB').fill('Ketua UKM Baru')
      const alerts = []
      page.on('dialog', (d) => {
        alerts.push(d.message())
        d.accept()
      })
      await page.locator('form button[type="submit"]').click()
      await eventually(
        async () => (await admin.db.doc(`users/${target}`).get()).data().nama === 'Ketua UKM Baru',
        'edit kelola-user tidak tersimpan',
      )
      await eventually(
        async () => alerts.includes('Pengguna berhasil diperbarui!'),
        `alert sukses tidak muncul: ${alerts}`,
      )

      await page
        .locator('tr', { hasText: 'Ketua UKM Baru' })
        .getByRole('button', { name: 'Hapus' })
        .click()
      await eventually(
        async () => !(await admin.db.doc(`users/${target}`).get()).exists,
        'hapus kelola-user gagal',
      )
      await eventually(
        async () => alerts.includes('Pengguna berhasil dihapus.'),
        'alert hapus tidak muncul',
      )

      // T18: tidak ada rule untuk activityLogs → logActivity ditolak diam-diam
      assert(
        (await admin.db.collection('activityLogs').get()).empty,
        'activityLogs ternyata bisa ditulis — perilaku berubah',
      )
    },
  },
]
