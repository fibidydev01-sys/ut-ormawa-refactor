#!/usr/bin/env node
// ============================================================
// E2E — alur data sungguhan di atas Firebase Emulator Suite
// File: tests/e2e.mjs
//
// Screenshot parity hanya membuktikan TAMPILAN sama. Tes ini
// membuktikan PERILAKU sama: login, CRUD lewat UI, halaman publik
// membaca data — memakai Auth/Firestore/Storage Emulator dan
// firestore.rules / storage.rules ASLI dari repo.
//
//   npm run build:test && npm run test:e2e
//   npm run test:e2e -- --only=artikel      → hanya skenario yang namanya cocok
//
// Butuh Java 11+ (emulator Firestore) dan firebase-tools. Runner
// memakai FIREBASE_BIN bila di-set, selain itu `npx firebase-tools@15`.
// ============================================================

import { spawn } from 'node:child_process'
import { generateKeyPairSync } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { existsSync, mkdirSync } from 'node:fs'
import { SCENARIOS } from './e2e/scenarios.mjs'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failDir = join(root, 'tests/e2e/.failures')
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
const PROJECT = 'demo-ormawa'
const HOST = '127.0.0.1'
// WebAuthn di server memakai rpID 'localhost' & origin http://localhost:3000
// (hardcoded, lihat GOLDEN-PLAN T20) → tes passkey hanya bisa di alamat ini.
const PORT = process.env.PORT || '3000'
const BASE_URL = `http://localhost:${PORT}`

// Admin SDK di proses tes → emulator (seed & verifikasi data)
process.env.FIRESTORE_EMULATOR_HOST = `${HOST}:8080`
process.env.FIREBASE_AUTH_EMULATOR_HOST = `${HOST}:9099`
process.env.FIREBASE_STORAGE_EMULATOR_HOST = `${HOST}:9199`
process.env.GCLOUD_PROJECT = PROJECT

const children = []
function run(cmd, args, opts = {}) {
  const proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts })
  children.push(proc)
  return proc
}
function cleanup() {
  for (const c of children) {
    try {
      process.kill(-c.pid, 'SIGTERM')
    } catch {
      c.kill('SIGTERM')
    }
  }
}
process.on('exit', cleanup)
process.on('SIGINT', () => process.exit(130))

async function waitFor(url, label, timeoutMs = 90_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url)
      return
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  throw new Error(`${label} tidak siap dalam ${timeoutMs / 1000} detik (${url})`)
}

async function startEmulators() {
  const [bin, ...pre] = process.env.FIREBASE_BIN
    ? [process.env.FIREBASE_BIN]
    : ['npx', '-y', 'firebase-tools@15']
  const proc = run(
    bin,
    [
      ...pre,
      'emulators:start',
      '--project',
      PROJECT,
      '--config',
      join(root, 'firebase.emulators.json'),
      '--only',
      'auth,firestore,storage',
    ],
    { detached: true },
  )
  let log = ''
  proc.stdout.on('data', (d) => (log += d))
  proc.stderr.on('data', (d) => (log += d))
  try {
    await waitFor(`http://${HOST}:8080`, 'Firestore Emulator')
    await waitFor(`http://${HOST}:9099`, 'Auth Emulator')
    await waitFor(`http://${HOST}:9199`, 'Storage Emulator')
  } catch (e) {
    console.error(log.slice(-3000))
    throw e
  }
}

/** Service account palsu: emulator tidak memverifikasi kredensial, tapi
 *  cert() di server/api/create-user butuh kunci RSA yang formatnya valid. */
function fakeServiceAccount() {
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' },
  })
  return JSON.stringify({
    type: 'service_account',
    project_id: PROJECT,
    private_key_id: 'e2e',
    private_key: privateKey,
    client_email: `e2e@${PROJECT}.iam.gserviceaccount.com`,
    client_id: '0',
  })
}

async function startServer() {
  const entry = join(root, '.output/server/index.mjs')
  if (!existsSync(entry)) throw new Error('Jalankan `npm run build:test` dulu.')
  const adminKey = fakeServiceAccount()
  const proc = run(process.execPath, [entry], {
    detached: true,
    env: {
      ...process.env,
      PORT,
      HOST,
      NUXT_PUBLIC_FIREBASE_API_KEY: 'demo-api-key',
      NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN: `${PROJECT}.firebaseapp.com`,
      NUXT_PUBLIC_FIREBASE_PROJECT_ID: PROJECT,
      NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET: `${PROJECT}.appspot.com`,
      NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '000000000000',
      NUXT_PUBLIC_FIREBASE_APP_ID: '1:000000000000:web:0000000000000000',
      NUXT_PUBLIC_FIREBASE_EMULATOR_HOST: HOST,
      // Nuxt mem-parse env NUXT_* yang mirip JSON → di-encode dua kali agar tetap string
      NUXT_FIREBASE_ADMIN_KEY: JSON.stringify(adminKey),
      FIREBASE_ADMIN_KEY: adminKey,
    },
  })
  let log = ''
  proc.stderr.on('data', (d) => (log += d))
  await waitFor(BASE_URL, 'Server Nuxt', 30_000).catch((e) => {
    console.error(log.slice(-3000))
    throw e
  })
}

async function resetEmulators() {
  await fetch(`http://${HOST}:8080/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, {
    method: 'DELETE',
  })
  await fetch(`http://${HOST}:9099/emulator/v1/projects/${PROJECT}/accounts`, { method: 'DELETE' })
}

console.log('▶ menyalakan Firebase Emulator & server…')
await startEmulators()
await startServer()

const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')
initializeApp({ projectId: PROJECT })
const admin = { db: getFirestore(), auth: getAuth() }

const browser = await chromium.launch()
const failures = []
const scenarios = SCENARIOS.filter((s) => !only || s.name.includes(only))

for (const s of scenarios) {
  await resetEmulators()
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  page.setDefaultTimeout(15_000)
  const consoleErrors = []
  page.on('pageerror', (e) => consoleErrors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  const started = Date.now()
  try {
    await s.run({ page, admin, BASE_URL })
    console.log(`✔ ${s.name} (${((Date.now() - started) / 1000).toFixed(1)}s)`)
  } catch (e) {
    failures.push(s.name)
    mkdirSync(failDir, { recursive: true })
    const shot = join(failDir, `${s.name.replace(/[^a-z0-9]+/gi, '-')}.png`)
    await page.screenshot({ path: shot, fullPage: true }).catch(() => {})
    console.error(`✘ ${s.name}\n   ${String(e.message).split('\n').slice(0, 6).join('\n   ')}`)
    console.error(`   url: ${page.url()}\n   screenshot: ${shot.replace(root + '/', '')}`)
    if (consoleErrors.length) console.error('   console:', consoleErrors.slice(0, 4).join(' | '))
  } finally {
    await context.close()
  }
}

await browser.close()
cleanup()
if (failures.length) {
  console.error(`\nE2E GAGAL (${failures.length}/${scenarios.length}): ${failures.join(', ')}`)
  process.exit(1)
}
console.log(`\n✔ E2E OK (${scenarios.length} skenario)`)
process.exit(0)
