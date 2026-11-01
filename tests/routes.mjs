#!/usr/bin/env node
// ============================================================
// ROUTE PARITY CHECK
// File: tests/routes.mjs
//
// Membaca app/pages dan server/api, mengubahnya jadi daftar URL
// mengikuti konvensi file-routing Nuxt/Nitro, lalu membandingkan
// dengan tests/baseline/routes.json (Golden Rule R2: URL immutable).
//
//   node tests/routes.mjs            → bandingkan dengan baseline (exit 1 bila beda)
//   node tests/routes.mjs --update   → tulis ulang baseline (HANYA di S0
//                                       atau bila perubahan URL disetujui)
//
// Yang dibandingkan hanya URL (+ method untuk API), bukan lokasi
// file — jadi memindah isi page ke features/ tidak memicu gagal,
// sedangkan rename/hapus page atau API akan ketahuan.
// ============================================================

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const baselineFile = join(root, 'tests/baseline/routes.json')

function walk(dir) {
  let out = []
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const name of entries) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out = out.concat(walk(full))
    else out.push(full)
  }
  return out
}

/** "[slug]" → ":slug", "[...all]" → ":all(.*)*", "(group)" → dihapus, "index" → "" */
function toUrlSegments(relPath) {
  return relPath
    .split('/')
    .filter((seg) => !/^\(.+\)$/.test(seg))
    .map((seg) => seg.replace(/^\[\.\.\.(.+)\]$/, ':$1(.*)*').replace(/^\[(.+)\]$/, ':$1'))
    .filter((seg) => seg !== 'index')
}

function pageRoutes() {
  const dir = join(root, 'app/pages')
  return walk(dir)
    .filter((f) => f.endsWith('.vue'))
    .map((f) => {
      const rel = relative(dir, f)
        .replace(/\\/g, '/')
        .replace(/\.vue$/, '')
      return '/' + toUrlSegments(rel).join('/')
    })
}

function apiRoutes() {
  const dir = join(root, 'server/api')
  return walk(dir)
    .filter((f) => /\.(ts|js|mjs)$/.test(f))
    .map((f) => {
      let rel = relative(dir, f)
        .replace(/\\/g, '/')
        .replace(/\.(ts|js|mjs)$/, '')
      let method = 'ALL'
      const m = rel.match(/\.(get|post|put|patch|delete|head|options)$/)
      if (m) {
        method = m[1].toUpperCase()
        rel = rel.slice(0, -m[0].length)
      }
      return `${method} /api/${toUrlSegments(rel).join('/')}`.replace(/\/$/, '')
    })
}

const current = {
  pages: [...new Set(pageRoutes())].sort(),
  api: [...new Set(apiRoutes())].sort(),
}

if (process.argv.includes('--update')) {
  mkdirSync(dirname(baselineFile), { recursive: true })
  writeFileSync(baselineFile, JSON.stringify(current, null, 2) + '\n')
  console.log(`✔ baseline ditulis: ${current.pages.length} page, ${current.api.length} API`)
  process.exit(0)
}

const baseline = JSON.parse(readFileSync(baselineFile, 'utf8'))
let failed = false
for (const key of ['pages', 'api']) {
  const missing = baseline[key].filter((r) => !current[key].includes(r))
  const added = current[key].filter((r) => !baseline[key].includes(r))
  for (const r of missing) console.error(`✘ [${key}] HILANG: ${r}`)
  for (const r of added) console.error(`✘ [${key}] BARU (belum disetujui): ${r}`)
  if (missing.length || added.length) failed = true
}

if (failed) {
  console.error('\nRoute parity GAGAL — lihat GOLDEN-PLAN.md R2.')
  process.exit(1)
}
console.log(
  `✔ route parity OK: ${current.pages.length} page, ${current.api.length} API identik dengan baseline`,
)
