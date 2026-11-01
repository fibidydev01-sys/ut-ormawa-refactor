// ============================================================
// Skenario E2E — area mahasiswa
// File: tests/e2e/scenarios-mahasiswa.mjs
// ============================================================

import { seedUser, loginAdmin, eventually, assert } from './helpers.mjs'
import { PNG_1PX } from './scenarios.mjs'

export const MAHASISWA_SCENARIOS = [
  {
    name: 'mahasiswa: profil dimuat dari dokumen users; simpan ditolak rules (perilaku lama)',
    async run({ page, admin, BASE_URL }) {
      const uid = await seedUser(admin, {
        email: 'mhs@ormawa.test',
        role: 'mahasiswa',
        fullName: 'Mhs',
        extra: { nama: 'Budi Mahasiswa', nim: '049999999', nohp: '0811' },
      })
      await loginAdmin(page, BASE_URL, 'mhs@ormawa.test')
      await page.waitForURL('**/dashboard/mahasiswa')

      await page.goto(`${BASE_URL}/dashboard/mahasiswa/edit-profil`, { waitUntil: 'load' })
      const nama = page.getByPlaceholder('Masukkan nama sesuai KTP/KTM')
      await eventually(
        async () => (await nama.inputValue()) === 'Budi Mahasiswa',
        'profil tidak dimuat',
      )
      assert(
        (await page.getByPlaceholder('Contoh: 041234567').inputValue()) === '049999999',
        'NIM tidak dimuat',
      )

      await nama.fill('Budi Baru')
      await page.locator('select').first().selectOption({ index: 1 })
      await page.locator('input[type="file"]').setInputFiles(PNG_1PX)
      const alerts = []
      page.on('dialog', (d) => {
        alerts.push(d.message())
        d.accept()
      })
      await page.waitForTimeout(500) // kompresi foto via canvas
      await page.locator('form button[type="submit"]').click()
      await eventually(
        async () => alerts.includes('Terjadi kesalahan saat menyimpan data.'),
        `alert penolakan tidak muncul: ${alerts}`,
      )
      assert(
        (await admin.db.doc(`users/${uid}`).get()).data().nama === 'Budi Mahasiswa',
        'profil ternyata tersimpan — perilaku berubah',
      )
    },
  },
  {
    name: 'mahasiswa: halaman dashboard terbuka tanpa login (T15)',
    async run({ page, BASE_URL }) {
      await page.goto(`${BASE_URL}/dashboard/mahasiswa`, { waitUntil: 'load' })
      assert(page.url().endsWith('/dashboard/mahasiswa'), `dialihkan ke ${page.url()}`)
      await page.getByText('Belum ada aktivitas.').waitFor()
    },
  },
]
