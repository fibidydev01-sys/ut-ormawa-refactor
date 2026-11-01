#!/usr/bin/env node
// ============================================================
// TYPECHECK RATCHET
// File: tests/typecheck.mjs
//
// Baseline (ormawautsby@0e2ccca) sudah punya error TypeScript.
// Memperbaikinya berarti menyentuh app/ — itu bukan scope S1.
// Jadi kita pakai "ratchet": jumlah error per file dicatat di
// tests/baseline/typecheck.json, dan pemeriksaan GAGAL bila:
//   - ada file baru yang punya error, atau
//   - jumlah error sebuah file bertambah.
// Berkurang = bagus → jalankan `--update` supaya baseline ikut turun.
//
// Konsekuensi yang disengaja: file yang DIPINDAH (mis. ke
// features/) dianggap file baru → harus bersih dari error.
//
//   npm run typecheck               → periksa
//   npm run typecheck -- --update   → tulis ulang baseline
// ============================================================

import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const baselineFile = join(root, 'tests/baseline/typecheck.json')
const projects = ['.nuxt/tsconfig.app.json', '.nuxt/tsconfig.server.json']

// Selalu regenerasi tipe .nuxt (layout, komponen, auto-import) supaya
// hasil tidak basi setelah file dipindah/di-rename.
spawnSync('npx', ['nuxt', 'prepare'], { cwd: root, stdio: 'ignore' })

const counts = {}
const lines = []
for (const project of projects) {
  const res = spawnSync('npx', ['vue-tsc', '--noEmit', '-p', project], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
  for (const line of (res.stdout + res.stderr).split('\n')) {
    const m = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+)/)
    if (!m) continue
    const file = m[1].replace(root + '/', '')
    counts[file] = (counts[file] || 0) + 1
    lines.push(line.slice(0, 200))
  }
}
const sorted = Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)))
const total = Object.values(sorted).reduce((a, b) => a + b, 0)

if (process.argv.includes('--update')) {
  writeFileSync(baselineFile, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`✔ baseline typecheck ditulis: ${total} error di ${Object.keys(sorted).length} file`)
  process.exit(0)
}

const baseline = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : {}
const worse = Object.entries(sorted).filter(([f, n]) => n > (baseline[f] || 0))
const better = Object.entries(baseline).filter(([f, n]) => (sorted[f] || 0) < n)

if (worse.length) {
  for (const [f, n] of worse) console.error(`✘ ${f}: ${baseline[f] || 0} → ${n} error`)
  console.error('\nDetail:\n' + lines.filter((l) => worse.some(([f]) => l.includes(f))).join('\n'))
  console.error('\nTypecheck GAGAL — error baru tidak boleh masuk.')
  process.exit(1)
}
if (better.length) {
  console.log(
    `ℹ ${better.length} file berkurang error-nya — jalankan \`npm run typecheck -- --update\`.`,
  )
}
console.log(`✔ typecheck OK: ${total} error warisan baseline, tidak ada error baru`)
