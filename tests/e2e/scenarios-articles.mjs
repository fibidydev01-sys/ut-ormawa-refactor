// ============================================================
// Skenario E2E — artikel (Highlight-terkini) & halaman publik
// File: tests/e2e/scenarios-articles.mjs
// ============================================================

import { Timestamp } from 'firebase-admin/firestore'
import { seedUser, seedOrganization, loginAdmin, eventually, assert } from './helpers.mjs'
import { asSuperAdmin, PNG_1PX } from './scenarios.mjs'

const ORG = { name: 'UKM Robotika', organization_type: 'UNIT_KEGIATAN_MAHASISWA' }

async function seedArticle(admin, id, data) {
  await admin.db.doc(`articles/${id}`).set({
    title: `Artikel ${id}`,
    slug: `artikel-${id}`,
    content: `<p>Isi ${id}</p>`,
    cover_image_url: '',
    status: 'PUBLISHED',
    organization_id: 'robotika',
    organization_name: ORG.name,
    organization_type: ORG.organization_type,
    created_at: Timestamp.fromDate(new Date('2026-01-01T10:00:00Z')),
    updated_at: Timestamp.now(),
    ...data,
  })
}

export const ARTICLE_SCENARIOS = [
  {
    name: 'artikel: SUPER_ADMIN tulis artikel terbit (cover + organisasi), tampil di publik',
    async run({ page, admin, BASE_URL }) {
      await seedOrganization(admin, 'robotika', ORG)
      await asSuperAdmin(page, admin, BASE_URL, 'Highlight-terkini')
      await page.getByRole('link', { name: 'Tulis Artikel Baru' }).click()
      await page.waitForURL('**/Highlight-terkini/form')

      await page.getByPlaceholder('Masukkan judul artikel...').fill('Juara Lomba Robot 2026')
      assert(
        (await page.getByPlaceholder('judul-artikel').inputValue()) === 'juara-lomba-robot-2026',
        'slug tidak otomatis dari judul',
      )
      await page.locator('.ProseMirror').click()
      await page.keyboard.type('Tim robotika menang.')
      await page.locator('select:has(option[value="PUBLISHED"])').selectOption('PUBLISHED')
      await page
        .locator('select:has(option:text("-- Pilih Organisasi --"))')
        .selectOption({ label: ORG.name })
      await page.locator('input[type="file"]').setInputFiles(PNG_1PX)
      await page.getByRole('button', { name: /Simpan Artikel/ }).click()
      await page.waitForURL('**/dashboard/Highlight-terkini')
      await page.getByText('Juara Lomba Robot 2026').waitFor()

      const doc = await eventually(async () => {
        const s = await admin.db
          .collection('articles')
          .where('slug', '==', 'juara-lomba-robot-2026')
          .get()
        return s.docs[0]
      }, 'artikel tidak tersimpan')
      const a = doc.data()
      assert(a.status === 'PUBLISHED', 'status salah')
      assert(a.organization_id === 'robotika', 'organization_id salah')
      assert(
        a.organization_name === ORG.name && a.organization_type === ORG.organization_type,
        'denormalisasi organisasi hilang',
      )
      assert(a.content.includes('Tim robotika menang.'), `konten salah: ${a.content}`)
      assert(
        /127\.0\.0\.1:9199\/.*articles%2F/.test(a.cover_image_url),
        `cover tidak terunggah: ${a.cover_image_url}`,
      )
      assert(
        a.created_at instanceof Timestamp && a.updated_at instanceof Timestamp,
        'timestamp tidak di-set server',
      )

      // Publik: beranda & /media/artikel (client) + /berita/[slug] (SSR via API)
      await page.goto(`${BASE_URL}/beranda`, { waitUntil: 'load' })
      await page.getByText('Juara Lomba Robot 2026').first().waitFor()
      await page.goto(`${BASE_URL}/media/artikel`, { waitUntil: 'load' })
      await page.getByText('Juara Lomba Robot 2026').first().waitFor()
      const html = await (await fetch(`${BASE_URL}/berita/juara-lomba-robot-2026`)).text()
      assert(
        html.includes('Juara Lomba Robot 2026') && html.includes('Tim robotika menang.'),
        'SSR /berita tidak berisi artikel',
      )
      assert(
        /<meta[^>]+property="article:author"[^>]+content="UKM Robotika"/.test(html) &&
          (html.match(/property="article:author"/g) || []).length === 1,
        'meta article:author SSR berubah',
      )
      assert(
        html.includes('"@type":"NewsArticle"') && html.includes('"headline":"Juara Lomba Robot 2026"'),
        'JSON-LD NewsArticle hilang',
      )
    },
  },
  {
    name: 'artikel: edit jadi draf → hilang dari publik; hapus',
    async run({ page, admin, BASE_URL }) {
      await seedOrganization(admin, 'robotika', ORG)
      await seedArticle(admin, 'satu', { title: 'Kegiatan Bakti Sosial' })
      await asSuperAdmin(page, admin, BASE_URL, 'Highlight-terkini')
      await page.getByText('Kegiatan Bakti Sosial').waitFor()

      await page.getByRole('link', { name: 'Edit' }).first().click()
      await page.waitForURL('**/Highlight-terkini/form?id=satu')
      await eventually(
        async () =>
          (await page.getByPlaceholder('Masukkan judul artikel...').inputValue()) ===
          'Kegiatan Bakti Sosial',
        'form edit tidak terisi data artikel',
      )
      await page.locator('select:has(option[value="PUBLISHED"])').selectOption('DRAFT')
      await page.getByRole('button', { name: /Simpan Artikel/ }).click()
      await page.waitForURL('**/dashboard/Highlight-terkini')
      await eventually(
        async () => (await admin.db.doc('articles/satu').get()).data().status === 'DRAFT',
        'status tidak berubah',
      )
      const slugAfter = (await admin.db.doc('articles/satu').get()).data().slug
      assert(slugAfter === 'artikel-satu', 'slug ikut berubah saat edit')

      const html = await (await fetch(`${BASE_URL}/berita/artikel-satu`)).text()
      assert(html.includes('Artikel Tidak Ditemukan'), 'draf masih tampil di /berita')

      page.once('dialog', (d) => d.accept())
      await page.getByRole('button', { name: 'Hapus' }).first().click()
      await eventually(
        async () => !(await admin.db.doc('articles/satu').get()).exists,
        'artikel tidak terhapus',
      )
      await page.getByText('Kegiatan Bakti Sosial').waitFor({ state: 'detached' })
    },
  },
  {
    name: 'artikel: ADMIN hanya melihat & menulis untuk organisasinya',
    async run({ page, admin, BASE_URL }) {
      await seedOrganization(admin, 'robotika', ORG)
      await seedOrganization(admin, 'lain', {
        name: 'IMF Lain',
        organization_type: 'HIMPUNAN_MAHASISWA',
      })
      await seedArticle(admin, 'milik', { title: 'Artikel Milik Robotika' })
      await seedArticle(admin, 'bukan', {
        title: 'Artikel Organisasi Lain',
        organization_id: 'lain',
        organization_name: 'IMF Lain',
        organization_type: 'HIMPUNAN_MAHASISWA',
      })
      await seedUser(admin, {
        email: 'admin@ormawa.test',
        role: 'ADMIN',
        fullName: 'Admin Robotika',
        accessModules: ['manage_articles'],
        extra: { organization_id: 'robotika' },
      })
      await loginAdmin(page, BASE_URL, 'admin@ormawa.test')
      await page.waitForURL('**/dashboard')
      await page.locator('aside').getByRole('link', { name: 'Highlight-terkini' }).click()
      await page.getByText('Artikel Milik Robotika').waitFor()
      assert(
        !(await page.getByText('Artikel Organisasi Lain').count()),
        'artikel organisasi lain ikut tampil',
      )

      await page.getByRole('link', { name: 'Tulis Artikel Baru' }).click()
      await page.getByPlaceholder('Masukkan judul artikel...').fill('Tulisan Admin')
      assert(
        !(await page.locator('select:has(option:text("-- Pilih Organisasi --"))').count()),
        'pilihan organisasi tampil untuk ADMIN',
      )
      await page.locator('.ProseMirror').click()
      await page.keyboard.type('Isi dari admin.')
      await page.getByRole('button', { name: /Simpan Artikel/ }).click()
      await page.waitForURL('**/dashboard/Highlight-terkini')
      const doc = await eventually(async () => {
        const s = await admin.db.collection('articles').where('slug', '==', 'tulisan-admin').get()
        return s.docs[0]
      }, 'artikel ADMIN tidak tersimpan')
      assert(
        doc.data().organization_id === 'robotika' && doc.data().status === 'DRAFT',
        'organisasi/status default salah',
      )
    },
  },
  {
    name: 'publik: /media/artikel filter kategori & /beranda urutan terbaru',
    async run({ page, admin, BASE_URL }) {
      await seedArticle(admin, 'lama', {
        title: 'Berita Lama UKM',
        created_at: Timestamp.fromDate(new Date('2025-01-01')),
      })
      await seedArticle(admin, 'baru', {
        title: 'Berita Baru IMF',
        organization_type: 'HIMPUNAN_MAHASISWA',
        created_at: Timestamp.fromDate(new Date('2026-06-01')),
      })
      await seedArticle(admin, 'draf', { title: 'Berita Draf', status: 'DRAFT' })
      await page.goto(`${BASE_URL}/beranda`, { waitUntil: 'load' })
      await page.getByText('Berita Baru IMF').first().waitFor()
      const text = await page.locator('main').innerText()
      assert(
        text.indexOf('Berita Baru IMF') < text.indexOf('Berita Lama UKM'),
        'urutan beranda bukan terbaru dulu',
      )
      assert(!text.includes('Berita Draf'), 'draf tampil di beranda')

      await page.goto(`${BASE_URL}/media/artikel`, { waitUntil: 'load' })
      await page.getByText('Berita Lama UKM').first().waitFor()
      await page.getByRole('button', { name: 'UKM', exact: true }).first().click()
      await eventually(
        async () => !(await page.getByText('Berita Baru IMF').count()),
        'filter kategori UKM tidak bekerja',
      )
      await page.getByText('Berita Lama UKM').first().waitFor()
    },
  },
]
