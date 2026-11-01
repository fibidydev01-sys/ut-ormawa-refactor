// ============================================================
// Skenario E2E — session cookie __session (S7)
// File: tests/e2e/scenarios-session.mjs
// ============================================================

import { seedUser, loginAdmin, eventually, assert } from './helpers.mjs'

const cookie = async (page, name) => (await page.context().cookies()).find((c) => c.name === name)
const me = async (page, BASE_URL) =>
  (await (await page.request.get(`${BASE_URL}/api/auth/me`)).json()).user

const post = (page, url, data, headers = {}) => page.request.post(url, { data, headers })

export const SESSION_SCENARIOS = [
  {
    // [S7 — T8] dulu siapa pun bisa membuat/menghapus akun lewat API
    name: 'sesi: /api/create-user & /api/delete-user hanya SUPER_ADMIN (401 / 403)',
    async run({ page, admin, BASE_URL }) {
      const targetUid = await seedUser(admin, {
        email: 'target@ormawa.test',
        role: 'ADMIN',
        fullName: 'Target',
      })
      const newUser = { email: 'baru@ormawa.test', password: 'rahasia-123', role: 'SUPER_ADMIN' }

      // Tanpa login & token palsu → 401
      for (const headers of [{}, { authorization: 'Bearer palsu' }]) {
        const create = await post(page, `${BASE_URL}/api/create-user`, newUser, headers)
        const remove = await post(page, `${BASE_URL}/api/delete-user`, { uid: targetUid }, headers)
        assert(
          create.status() === 401 && remove.status() === 401,
          `tanpa kredensial: ${create.status()} / ${remove.status()}`,
        )
      }

      // Login sebagai ADMIN (cookie __session) → 403
      await seedUser(admin, { email: 'admin@ormawa.test', role: 'ADMIN', fullName: 'Admin' })
      await loginAdmin(page, BASE_URL, 'admin@ormawa.test')
      await eventually(() => cookie(page, '__session'), 'cookie __session tidak dibuat')
      const create = await post(page, `${BASE_URL}/api/create-user`, newUser)
      const remove = await post(page, `${BASE_URL}/api/delete-user`, { uid: targetUid })
      assert(
        create.status() === 403 && remove.status() === 403,
        `ADMIN: ${create.status()} / ${remove.status()}`,
      )

      const created = await admin.auth.getUserByEmail(newUser.email).catch(() => null)
      assert(!created, 'akun tetap dibuat walau ditolak')
      assert((await admin.db.doc(`users/${targetUid}`).get()).exists, 'akun target terhapus')
      assert(await admin.auth.getUser(targetUid), 'akun Auth target terhapus')
    },
  },
  {
    name: 'sesi: login password → __session httpOnly; /api/auth/me kenal user; logout menghapus',
    async run({ page, admin, BASE_URL }) {
      const uid = await seedUser(admin, {
        email: 'super@ormawa.test',
        role: 'SUPER_ADMIN',
        fullName: 'Super Satu',
      })
      await loginAdmin(page, BASE_URL, 'super@ormawa.test')
      await page.waitForURL('**/dashboard')
      const session = await eventually(
        () => cookie(page, '__session'),
        'cookie __session tidak dibuat',
      )
      assert(
        session.httpOnly && session.secure && session.sameSite === 'Lax',
        'atribut __session salah',
      )
      assert(session.expires - Date.now() / 1000 > 6.9 * 24 * 3600, 'masa berlaku sesi < 7 hari')
      assert(
        (await cookie(page, 'ormawa_session'))?.value === uid,
        'cookie petunjuk tidak berisi uid',
      )
      const user = await me(page, BASE_URL)
      assert(
        user?.uid === uid && user.role === 'SUPER_ADMIN' && user.name === 'Super Satu',
        `me: ${JSON.stringify(user)}`,
      )

      // Halaman publik berikutnya: tidak membuat sesi ulang (petunjuk cocok)
      let posts = 0
      page.on(
        'request',
        (r) => r.url().endsWith('/api/auth/session') && r.method() === 'POST' && posts++,
      )
      await page.goto(`${BASE_URL}/beranda`, { waitUntil: 'load' })
      await page.waitForTimeout(1500)
      assert(posts === 0, `sesi dibuat ulang ${posts}x`)
      assert((await me(page, BASE_URL))?.uid === uid, 'sesi hilang setelah pindah halaman')

      // Logout dari dashboard → cookie bersih
      await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'load' })
      await page
        .locator('header')
        .getByRole('button', { name: /Keluar/ })
        .click()
      await page.waitForURL('**/login/admin')
      await eventually(
        async () => !(await cookie(page, '__session')),
        '__session tidak dihapus saat logout',
      )
      assert(!(await cookie(page, 'ormawa_session')), 'cookie petunjuk tidak dihapus')
      assert(
        (await me(page, BASE_URL)) === null,
        '/api/auth/me masih mengenali user setelah logout',
      )
    },
  },
  {
    name: 'sesi: login magic link juga membuat sesi server',
    async run({ page, admin, BASE_URL }) {
      await page.goto(`${BASE_URL}/login/admin`, { waitUntil: 'load' })
      await page.waitForFunction(() => document.querySelector('#__nuxt')?.__vue_app__)
      await page.getByPlaceholder('nama@gmail.com').fill('link@student.test')
      await page.getByRole('button', { name: 'Kirim Link' }).click()
      const { oobCodes } = await eventually(async () => {
        const r = await (
          await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-ormawa/oobCodes')
        ).json()
        return r.oobCodes?.length ? r : null
      }, 'tautan tidak dikirim')
      const code = oobCodes.find((c) => c.email === 'link@student.test')
      const url = new URL(new URL(code.oobLink).searchParams.get('continueUrl'))
      url.searchParams.set('mode', 'signIn')
      url.searchParams.set('oobCode', code.oobCode)
      url.searchParams.set('apiKey', 'demo-api-key')
      await page.goto(url.toString(), { waitUntil: 'load' })
      const user = await eventually(
        () => admin.auth.getUserByEmail('link@student.test').catch(() => null),
        'akun magic link tidak dibuat',
      )
      await eventually(
        async () => (await me(page, BASE_URL))?.uid === user.uid,
        'sesi magic link tidak dibuat',
      )
    },
  },
  {
    name: 'sesi: pengunjung anonim tidak memicu request sesi; cookie palsu ditolak',
    async run({ page, BASE_URL }) {
      const hits = []
      page.on(
        'request',
        (r) => r.url().includes('/api/auth/') && hits.push(`${r.method()} ${r.url()}`),
      )
      for (const path of ['/beranda', '/media/artikel', '/zona-kampus/ukm']) {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' })
      }
      await page.waitForTimeout(1000)
      assert(hits.length === 0, `request sesi dari anonim: ${hits}`)

      await page.context().addCookies([
        { name: '__session', value: 'palsu', url: BASE_URL },
        { name: 'ormawa_session', value: 'x', url: BASE_URL },
      ])
      assert((await me(page, BASE_URL)) === null, 'cookie palsu diterima')
      assert(!(await cookie(page, '__session')), 'cookie palsu tidak dibersihkan')
    },
  },
]
