#!/usr/bin/env node
// ============================================================
// SCREENSHOT PARITY CHECK
// File: tests/screens.mjs
//
// Memotret semua rute publik + login (desktop & mobile) dan
// membandingkannya dengan tests/baseline/screens/*.png
// (Golden Rule R4: Fase A harus tampil identik).
//
//   npm run test:screens            → bandingkan (exit 1 bila ada yang beda)
//   npm run test:screens -- --update → tulis ulang baseline
//
// Butuh build preset node-server (`npm run build:test`). Script
// menyalakan `.output/server/index.mjs` sendiri kecuali BASE_URL
// di-set. Hasil terkini & gambar diff ada di
// tests/baseline/screens/current/ (di-gitignore).
//
// Diff dihitung di dalam Chromium (canvas) — tanpa dependensi
// tambahan. Animasi & transisi dimatikan supaya hasil stabil.
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
const PORT = process.env.PORT || '3999'
const BASE_URL = process.env.BASE_URL || `http://127.0.0.1:${PORT}`
/** Persentase piksel berbeda yang masih ditoleransi (anti-aliasing). */
const TOLERANCE = Number(process.env.SCREEN_TOLERANCE || 0.2)

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
}

// Rute dari baseline manifest: tanpa parameter dinamis & tanpa dashboard
// (dashboard butuh login Firebase — diuji lewat smoke test manual).
const { pages } = JSON.parse(readFileSync(join(root, 'tests/baseline/routes.json'), 'utf8'))
const ROUTES = pages.filter((r) => !r.includes(':') && !r.startsWith('/dashboard'))

const fileName = (route, vp) =>
  `${route === '/' ? 'root' : route.slice(1).replace(/\//g, '__')}.${vp}.png`

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

const server = await startServer()
const browser = await chromium.launch()
mkdirSync(update ? shotsDir : currentDir, { recursive: true })
const failures = []

try {
  const cmpPage = await browser.newPage()
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport: vp, ...vp, reducedMotion: 'reduce' })
    const page = await context.newPage()
    for (const route of ROUTES) {
      const name = fileName(route, vpName)
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle' })
      await page.addStyleTag({
        content:
          '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}',
      })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(300)
      const shot = await page.screenshot({ fullPage: true })

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
    await context.close()
  }
} finally {
  await browser.close()
  server?.kill()
}

if (update) {
  console.log(
    `\n✔ baseline ditulis: ${ROUTES.length} rute × ${Object.keys(VIEWPORTS).length} viewport`,
  )
} else if (failures.length) {
  console.error(`\nScreenshot parity GAGAL (${failures.length}):\n- ` + failures.join('\n- '))
  console.error('Lihat tests/baseline/screens/current/*.diff.png — Golden Rule R4.')
  process.exit(1)
} else {
  console.log('\n✔ screenshot parity OK')
}
