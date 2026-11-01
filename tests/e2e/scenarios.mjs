// ============================================================
// Skenario E2E
// File: tests/e2e/scenarios.mjs
//
// Setiap skenario mulai dari emulator kosong. Selector sengaja
// memakai teks/label yang terlihat user (bukan struktur DOM) supaya
// tetap berlaku sebelum & sesudah refactor.
// ============================================================

import { seedUser, seedOrganization, loginAdmin, eventually, assert } from './helpers.mjs'
import { ARTICLE_SCENARIOS } from './scenarios-articles.mjs'
import { ADMIN_SCENARIOS } from './scenarios-admin.mjs'
import { MAHASISWA_SCENARIOS } from './scenarios-mahasiswa.mjs'

/** PNG 1×1 untuk uji upload ke Storage Emulator. */
export const PNG_1PX = {
  name: 'logo.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64',
  ),
}

/** Pindah halaman lewat router Vue (seperti klik link), bukan reload SSR. */
export async function spaNavigate(page, path) {
  await page.evaluate(
    (p) => document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$router.push(p),
    path,
  )
}

/** Login SUPER_ADMIN lalu buka menu sidebar (navigasi SPA, seperti user asli). */
export async function asSuperAdmin(page, admin, BASE_URL, menu) {
  await seedUser(admin, { email: 'super@ormawa.test', role: 'SUPER_ADMIN', fullName: 'Super Satu' })
  await loginAdmin(page, BASE_URL, 'super@ormawa.test')
  await page.waitForURL('**/dashboard')
  if (menu) await page.locator('aside').getByRole('link', { name: menu, exact: true }).click()
}

const AUTH_SCENARIOS = [
  {
    name: 'auth: login SUPER_ADMIN → /dashboard, sidebar lengkap',
    async run({ page, admin, BASE_URL }) {
      await asSuperAdmin(page, admin, BASE_URL)
      await eventually(
        async () => (await page.locator('aside').innerText()).includes('Users'),
        'menu Users (khusus SUPER_ADMIN) tidak muncul di sidebar',
      )
      await page
        .locator('header')
        .getByRole('button', { name: /Keluar/ })
        .click()
      await page.waitForURL('**/login/admin')
    },
  },
  {
    name: 'auth: password salah → pesan error',
    async run({ page, admin, BASE_URL }) {
      await seedUser(admin, { email: 'super@ormawa.test', role: 'SUPER_ADMIN', fullName: 'S' })
      await page.goto(`${BASE_URL}/login/admin`, { waitUntil: 'load' })
      await page.fill('input[type="email"]', 'super@ormawa.test')
      await page.locator('form').first().locator('input[type="password"]').fill('salah-banget')
      await page.locator('form').first().locator('button[type="submit"]').click()
      await page.getByText('Email atau password salah.').waitFor()
    },
  },
  {
    name: 'auth: akun tanpa dokumen users → /dashboard/mahasiswa',
    async run({ page, admin, BASE_URL }) {
      await seedUser(admin, { email: 'mhs@ormawa.test', fullName: 'Mhs' }) // tanpa role → tanpa dokumen
      await loginAdmin(page, BASE_URL, 'mhs@ormawa.test')
      await page.waitForURL('**/dashboard/mahasiswa')
    },
  },
  {
    name: 'auth: ADMIN terbatas → sidebar hanya modulnya, /dashboard/users dialihkan',
    async run({ page, admin, BASE_URL }) {
      await seedUser(admin, {
        email: 'admin@ormawa.test',
        role: 'ADMIN',
        fullName: 'Admin Artikel',
        accessModules: ['manage_articles'],
      })
      await loginAdmin(page, BASE_URL, 'admin@ormawa.test')
      await page.waitForURL('**/dashboard')
      const links = await eventually(async () => {
        const t = await page.locator('aside nav').allInnerTexts()
        return t.join('|').includes('Highlight-terkini') ? t.join('|') : null
      }, 'menu Highlight-terkini tidak muncul')
      assert(!links.includes('Users') && !links.includes('Organizations'), `menu bocor: ${links}`)
      // Navigasi di dalam app (SSR langsung ke /dashboard/* selalu redirect ke login — T16)
      await spaNavigate(page, '/dashboard/users')
      await page.waitForURL('**/dashboard/Highlight-terkini')
    },
  },
]

const ORGANIZATION_SCENARIOS = [
  {
    name: 'organisasi: tambah (dengan logo), edit, hapus',
    async run({ page, admin, BASE_URL }) {
      await asSuperAdmin(page, admin, BASE_URL, 'Organizations')
      await page.waitForURL('**/dashboard/organizations')

      // Tambah
      await page.getByRole('button', { name: 'Tambah Organisasi' }).click()
      await page.fill('#org-name', 'Himpunan Uji Coba')
      await page.selectOption('#org-type', 'UNIT_KEGIATAN_MAHASISWA')
      await page.fill('#org-desc', 'Deskripsi awal')
      await page.locator('input[type="file"]').setInputFiles(PNG_1PX)
      await page.locator('form button[type="submit"]').click()
      await page
        .getByRole('cell', { name: /Himpunan Uji Coba/ })
        .first()
        .waitFor()

      const created = await eventually(async () => {
        const snap = await admin.db.collection('organizations').get()
        return snap.docs.find((d) => d.data().name === 'Himpunan Uji Coba')
      }, 'dokumen organisasi tidak tersimpan')
      // Perilaku lama (T17): modal TIDAK tertutup sendiri setelah simpan.
      await page.getByRole('heading', { name: 'Tambah Organisasi Baru' }).waitFor()
      await page.getByRole('button', { name: 'Batal' }).click()
      const data = created.data()
      assert(data.organization_type === 'UNIT_KEGIATAN_MAHASISWA', 'tipe salah')
      assert(data.description === 'Deskripsi awal', 'deskripsi salah')
      assert(
        /^http:\/\/127\.0\.0\.1:9199\/.*organizations%2F/.test(data.logo_url),
        `logo tidak terunggah ke Storage: ${data.logo_url}`,
      )

      // Edit
      await page.getByRole('button', { name: 'Edit' }).first().click()
      await page.fill('#org-desc', 'Deskripsi diubah')
      await page.locator('form button[type="submit"]').click()
      await eventually(
        async () =>
          (await admin.db.doc(`organizations/${created.id}`).get()).data().description ===
          'Deskripsi diubah',
        'edit organisasi tidak tersimpan',
      )
      await page.getByRole('button', { name: 'Batal' }).click()

      // Hapus
      await page.getByRole('button', { name: 'Hapus' }).first().click()
      await page.getByRole('button', { name: 'Ya, Hapus' }).click()
      await eventually(
        async () => !(await admin.db.doc(`organizations/${created.id}`).get()).exists,
        'organisasi tidak terhapus',
      )
      await page.getByRole('cell', { name: /Himpunan Uji Coba/ }).waitFor({ state: 'detached' })
    },
  },
  {
    name: 'organisasi: daftar terurut nama & yang tanpa nama disembunyikan',
    async run({ page, admin, BASE_URL }) {
      await seedOrganization(admin, 'b', { name: 'Bravo', organization_type: 'ORMAWA' })
      await seedOrganization(admin, 'a', { name: 'Alfa', organization_type: 'ORMAWA' })
      await seedOrganization(admin, 'x', { name: '', organization_type: 'ORMAWA' })
      await asSuperAdmin(page, admin, BASE_URL, 'Organizations')
      await page.getByRole('cell', { name: /Bravo/ }).first().waitFor()
      const body = await page.locator('tbody').innerText()
      assert(body.indexOf('Alfa') < body.indexOf('Bravo'), 'urutan bukan A→Z')
      assert((await page.locator('tbody tr').count()) === 2, 'organisasi tanpa nama ikut tampil')
    },
  },
]

export const SCENARIOS = [
  ...AUTH_SCENARIOS,
  ...ORGANIZATION_SCENARIOS,
  ...ARTICLE_SCENARIOS,
  ...ADMIN_SCENARIOS,
  ...MAHASISWA_SCENARIOS,
]
