// ============================================================
// Skenario E2E — mode render & cache (S6)
// File: tests/e2e/scenarios-rendering.mjs
//
// Memeriksa HTML MENTAH (fetch, tanpa JavaScript) dan header respons:
// data publik ikut dirender server, header CDN/noindex, redirect, dan
// dashboard yang kini SPA (dibuka langsung tanpa tunggu 5 detik — T16).
// ============================================================

import { Timestamp } from 'firebase-admin/firestore'
import { seedUser, loginAdmin, assert } from './helpers.mjs'

async function raw(BASE_URL, path) {
  const res = await fetch(`${BASE_URL}${path}`, { redirect: 'manual' })
  return { res, html: res.status === 200 ? await res.text() : '' }
}

export const RENDERING_SCENARIOS = [
  {
    name: 'render: /beranda & /media/artikel berisi artikel di HTML server (SEO)',
    async run({ admin, BASE_URL }) {
      await admin.db.doc('articles/ssr').set({
        title: 'Artikel Dirender Server',
        slug: 'artikel-dirender-server',
        content: '<p>Isi SSR</p>',
        cover_image_url: '',
        status: 'PUBLISHED',
        organization_id: 'x',
        organization_name: 'UKM SSR',
        organization_type: 'UNIT_KEGIATAN_MAHASISWA',
        // 23:30 UTC = 06:30 WIB keesokan harinya → tanggal harus versi WIB
        created_at: Timestamp.fromDate(new Date('2026-03-01T23:30:00Z')),
        updated_at: Timestamp.now(),
      })
      await admin.db
        .doc('articles/draf')
        .set({ title: 'Draf Rahasia', slug: 'draf', status: 'DRAFT' })
      for (const path of ['/beranda', '/media/artikel']) {
        const { res, html } = await raw(BASE_URL, path)
        assert(res.status === 200, `${path} status ${res.status}`)
        assert(
          html.includes('Artikel Dirender Server'),
          `${path}: artikel tidak ada di HTML server`,
        )
        assert(!html.includes('Draf Rahasia'), `${path}: draf bocor ke HTML`)
        assert(html.includes('02 Mar 2026'), `${path}: tanggal tidak dalam WIB`)
        assert(
          res.headers.get('cache-control') ===
            'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
          `${path}: cache-control ${res.headers.get('cache-control')}`,
        )
      }
    },
  },
  {
    name: 'render: /profil/struktur-pengurus berisi pengurus di HTML server',
    async run({ admin, BASE_URL }) {
      await admin.db.doc('pengurus/struktur_aktif').set({
        bph: [{ id: 'a', name: 'Sari Ketua SSR', jabatan: 'Ketua Umum', nim: '-', photo: '' }],
        bidang: [],
        updated_at: Timestamp.fromDate(new Date('2026-05-31T20:00:00Z')),
      })
      const { res, html } = await raw(BASE_URL, '/profil/struktur-pengurus')
      assert(html.includes('Sari Ketua SSR'), 'nama pengurus tidak ada di HTML server')
      assert(html.includes('1 Juni 2026'), 'tanggal diperbarui tidak dalam WIB')
      assert(
        res.headers.get('cache-control')?.includes('s-maxage=3600'),
        'cache-control struktur salah',
      )
    },
  },
  {
    name: 'render: redirect 301, halaman statis, header privat',
    async run({ BASE_URL }) {
      for (const [from, to] of [
        ['/', '/beranda'],
        ['/profil', '/profil/tentang-ut'],
      ]) {
        const { res } = await raw(BASE_URL, from)
        assert(
          res.status === 301 && res.headers.get('location') === to,
          `${from} → ${res.status} ${res.headers.get('location')}`,
        )
      }
      const ukm = await raw(BASE_URL, '/zona-kampus/ukm')
      assert(
        ukm.res.status === 200 && ukm.html.includes('Anggota UKM'),
        'halaman statis UKM tidak tersaji',
      )
      const dash = await raw(BASE_URL, '/dashboard')
      assert(
        dash.res.status === 200,
        `/dashboard status ${dash.res.status} (dulu 302 setelah 5 detik)`,
      )
      assert(dash.res.headers.get('cache-control') === 'no-store', 'dashboard harus no-store')
      assert(
        dash.res.headers.get('x-robots-tag') === 'noindex, nofollow',
        'dashboard harus noindex',
      )
      const login = await raw(BASE_URL, '/login/admin')
      assert(login.res.headers.get('x-robots-tag') === 'noindex, nofollow', 'login harus noindex')
    },
  },
  {
    name: 'render: buka /dashboard/users langsung via URL saat sudah login (T16)',
    async run({ page, admin, BASE_URL }) {
      await seedUser(admin, {
        email: 'super@ormawa.test',
        role: 'SUPER_ADMIN',
        fullName: 'Super Satu',
      })
      await loginAdmin(page, BASE_URL, 'super@ormawa.test')
      await page.waitForURL('**/dashboard')
      const started = Date.now()
      await page.goto(`${BASE_URL}/dashboard/users`, { waitUntil: 'load' })
      await page.getByText('Super Satu').first().waitFor()
      assert(page.url().endsWith('/dashboard/users'), `dialihkan ke ${page.url()}`)
      assert(Date.now() - started < 4000, `butuh ${Date.now() - started} ms`)
    },
  },
]
