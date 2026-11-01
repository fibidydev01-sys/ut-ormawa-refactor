#!/usr/bin/env node
// ============================================================
// SCREENSHOT PARITY CHECK
// File: tests/screens.mjs
//
// Memotret skenario UI dan membandingkannya dengan
// tests/baseline/screens/*.png (Golden Rule R4: Fase A harus
// tampil identik).
//
//   npm run test:screens                  → bandingkan (exit 1 bila ada yang beda)
//   npm run test:screens -- --update      → tulis ulang SEMUA baseline
//   npm run test:screens -- --only=dash   → hanya skenario yang namanya mengandung "dash"
//
// Skenario:
//   1. Semua rute publik + login (full page, desktop & mobile)
//   2. Navbar: hover tiap dropdown (desktop) & menu mobile terbuka penuh
//   3. Dashboard sebagai SUPER_ADMIN / ADMIN terbatas (sesi palsu via
//      cookie `__ormawa_test_auth`, dibaca tests/layer — hanya ada di
//      `npm run build:test`), termasuk sidebar mobile & dropdown profil
//
// Butuh build tes (`npm run build:test`). Script menyalakan
// `.output/server/index.mjs` sendiri kecuali BASE_URL di-set.
// Hasil terkini & gambar diff ada di tests/baseline/screens/current/
// (di-gitignore). Diff dihitung di dalam Chromium (canvas) — tanpa
// dependensi tambahan. Animasi & transisi dimatikan supaya stabil.
// ============================================================

import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const shotsDir = join(root, 'tests/baseline/screens')
const currentDir = join(shotsDir, 'current')
const update = process.argv.includes('--update')
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
const PORT = process.env.PORT || '3999'
const BASE_URL = process.env.BASE_URL || `http://127.0.0.1:${PORT}`
/** Persentase piksel berbeda yang masih ditoleransi (anti-aliasing). */
const TOLERANCE = Number(process.env.SCREEN_TOLERANCE || 0.2)

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
}

const AUTH = {
  superAdmin: {
    uid: 'test-super',
    email: 'super.admin@ormawa.test',
    displayName: 'Super Admin',
    role: 'SUPER_ADMIN',
    accessModules: [],
  },
  admin: {
    uid: 'test-admin',
    email: 'admin.artikel@ormawa.test',
    displayName: null,
    role: 'ADMIN',
    accessModules: ['manage_articles', 'manage_structure'],
  },
}

// ── Skenario ────────────────────────────────────────────────
const slug = (route) => (route === '/' ? 'root' : route.slice(1).replace(/\//g, '__'))
const { pages } = JSON.parse(readFileSync(join(root, 'tests/baseline/routes.json'), 'utf8'))
const PUBLIC_ROUTES = pages.filter((r) => !r.includes(':') && !r.startsWith('/dashboard'))
const DASHBOARD_ROUTES = [
  '/dashboard',
  '/dashboard/Highlight-terkini',
  '/dashboard/Highlight-terkini/form',
  '/dashboard/users',
  '/dashboard/organizations',
  '/dashboard/admin-area',
  '/dashboard/admin-area/struktur-pengurus',
  '/dashboard/admin-area/kelola-user',
]

const header = (page) => page.locator('header').first()
const mobilePanel = (page) => page.locator('header nav > div.md\\:hidden')

const SCENARIOS = []
for (const vp of Object.keys(VIEWPORTS)) {
  for (const route of PUBLIC_ROUTES) {
    SCENARIOS.push({ name: `${slug(route)}.${vp}`, route, vp, fullPage: true })
  }
}
for (const menu of ['Profil', 'Zona Kampus', 'Media', 'Kontak']) {
  SCENARIOS.push({
    name: `nav.hover-${slug('/' + menu.toLowerCase().replace(/ /g, '-'))}.desktop`,
    route: '/beranda',
    vp: 'desktop',
    action: (page) => header(page).getByRole('button', { name: menu, exact: true }).hover(),
  })
}
SCENARIOS.push({
  name: 'nav.mobile-open.mobile',
  route: '/beranda',
  vp: 'mobile',
  action: async (page) => {
    await page.locator('header nav button.md\\:hidden').click()
    for (const menu of ['Profil', 'Zona Kampus', 'Media', 'Kontak']) {
      await mobilePanel(page).getByRole('button', { name: menu }).click()
    }
  },
})
SCENARIOS.push({
  name: 'nav.mobile-open-bottom.mobile',
  route: '/beranda',
  vp: 'mobile',
  action: async (page) => {
    await page.locator('header nav button.md\\:hidden').click()
    for (const menu of ['Profil', 'Zona Kampus', 'Media', 'Kontak']) {
      await mobilePanel(page).getByRole('button', { name: menu }).click()
    }
    await mobilePanel(page).evaluate((el) => (el.scrollTop = el.scrollHeight))
  },
})
// Modal "Buat Profil" di Cari Teman (dirender setelah footer — urutan tumpukan penting)
for (const vp of Object.keys(VIEWPORTS)) {
  SCENARIOS.push({
    name: `cari-teman.profile-modal.${vp}`,
    route: '/zona-kampus/cari-teman',
    vp,
    action: async (page) => {
      await page.getByRole('button', { name: /Buat Profil/ }).first().click()
      await page.getByRole('button', { name: /Terbitkan Profil|Simpan/ }).first().waitFor()
    },
  })
}
for (const vp of Object.keys(VIEWPORTS)) {
  for (const route of DASHBOARD_ROUTES) {
    SCENARIOS.push({ name: `dash.super.${slug(route)}.${vp}`, route, vp, auth: 'superAdmin' })
  }
  SCENARIOS.push({ name: `dash.admin.dashboard.${vp}`, route: '/dashboard', vp, auth: 'admin' })
}
SCENARIOS.push({
  name: 'dash.super.profile-menu.desktop',
  route: '/dashboard',
  vp: 'desktop',
  auth: 'superAdmin',
  action: (page) => page.locator('header button:has(.rounded-full)').last().click(),
})
for (const role of ['superAdmin', 'admin']) {
  SCENARIOS.push({
    name: `dash.${role === 'admin' ? 'admin' : 'super'}.sidebar-open.mobile`,
    route: '/dashboard',
    vp: 'mobile',
    auth: role,
    action: (page) => page.locator('header button.lg\\:hidden').first().click(),
  })
}

async function startServer() {
  if (process.env.BASE_URL) return null
  const entry = join(root, '.output/server/index.mjs')
  if (!existsSync(entry)) {
    console.error('✘ .output/server/index.mjs tidak ada — jalankan `npm run build:test` dulu.')
    process.exit(1)
  }
  const proc = spawn(process.execPath, [entry], {
    env: { ...process.env, PORT, HOST: '127.0.0.1', NITRO_PORT: PORT, NITRO_HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'inherit'],
  })
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE_URL, { redirect: 'manual' })
      return proc
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  proc.kill()
  throw new Error('server tidak menyala dalam 30 detik')
}

/** Bandingkan dua PNG di dalam browser; kembalikan { percent, diffPng }. */
async function compare(page, aBuf, bBuf) {
  return page.evaluate(
    async ([a, b]) => {
      const load = (b64) =>
        new Promise((res, rej) => {
          const img = new Image()
          img.onload = () => res(img)
          img.onerror = rej
          img.src = 'data:image/png;base64,' + b64
        })
      const [ia, ib] = await Promise.all([load(a), load(b)])
      const w = Math.max(ia.width, ib.width)
      const h = Math.max(ia.height, ib.height)
      const ctx = (img) => {
        const c = document.createElement('canvas')
        c.width = w
        c.height = h
        const x = c.getContext('2d')
        x.drawImage(img, 0, 0)
        return x.getImageData(0, 0, w, h)
      }
      const da = ctx(ia)
      const db = ctx(ib)
      const out = document.createElement('canvas')
      out.width = w
      out.height = h
      const ox = out.getContext('2d')
      const od = ox.createImageData(w, h)
      let diff = 0
      for (let i = 0; i < da.data.length; i += 4) {
        const d =
          Math.abs(da.data[i] - db.data[i]) +
          Math.abs(da.data[i + 1] - db.data[i + 1]) +
          Math.abs(da.data[i + 2] - db.data[i + 2])
        if (d > 30) {
          diff++
          od.data[i] = 255
          od.data[i + 3] = 255
        } else {
          od.data[i] = od.data[i + 1] = od.data[i + 2] = da.data[i] * 0.3
          od.data[i + 3] = 255
        }
      }
      ox.putImageData(od, 0, 0)
      return {
        percent: (diff / (w * h)) * 100,
        sizeChanged: ia.width !== ib.width || ia.height !== ib.height,
        diffPng: out.toDataURL('image/png').split(',')[1],
      }
    },
    [aBuf.toString('base64'), bBuf.toString('base64')],
  )
}

const FREEZE_CSS =
  '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'

const server = await startServer()
const browser = await chromium.launch()
mkdirSync(update ? shotsDir : currentDir, { recursive: true })
const failures = []
const scenarios = SCENARIOS.filter((s) => !only || s.name.includes(only))

try {
  const cmpPage = await browser.newPage()
  for (const s of scenarios) {
    const vp = VIEWPORTS[s.vp]
    const context = await browser.newContext({ viewport: vp, ...vp, reducedMotion: 'reduce' })
    if (s.auth) {
      await context.addCookies([
        {
          name: '__ormawa_test_auth',
          value: encodeURIComponent(JSON.stringify(AUTH[s.auth])),
          url: BASE_URL,
        },
      ])
    }
    const page = await context.newPage()
    await page.goto(BASE_URL + s.route, { waitUntil: 'networkidle' })
    await page.addStyleTag({ content: FREEZE_CSS })
    await page.evaluate(() => document.fonts.ready)
    if (s.action) await s.action(page)
    await page.waitForTimeout(300)
    const shot = await page.screenshot({ fullPage: !!s.fullPage })
    await context.close()

    const name = `${s.name}.png`
    if (update) {
      writeFileSync(join(shotsDir, name), shot)
      console.log(`📸 ${name}`)
      continue
    }
    writeFileSync(join(currentDir, name), shot)
    const basePath = join(shotsDir, name)
    if (!existsSync(basePath)) {
      failures.push(`${name}: belum ada baseline`)
      console.error(`✘ ${name}: belum ada baseline`)
      continue
    }
    const res = await compare(cmpPage, readFileSync(basePath), shot)
    const ok = res.percent <= TOLERANCE && !res.sizeChanged
    if (!ok) {
      writeFileSync(
        join(currentDir, name.replace('.png', '.diff.png')),
        Buffer.from(res.diffPng, 'base64'),
      )
      failures.push(
        `${name}: ${res.percent.toFixed(2)}% beda${res.sizeChanged ? ' (ukuran halaman berubah)' : ''}`,
      )
    }
    console.log(
      `${ok ? '✔' : '✘'} ${name} — ${res.percent.toFixed(2)}%${res.sizeChanged ? ' (ukuran berubah)' : ''}`,
    )
  }
} finally {
  await browser.close()
  server?.kill()
}

if (update) {
  console.log(`\n✔ baseline ditulis: ${scenarios.length} skenario`)
} else if (failures.length) {
  console.error(`\nScreenshot parity GAGAL (${failures.length}):\n- ` + failures.join('\n- '))
  console.error('Lihat tests/baseline/screens/current/*.diff.png — Golden Rule R4.')
  process.exit(1)
} else {
  console.log(`\n✔ screenshot parity OK (${scenarios.length} skenario)`)
}
