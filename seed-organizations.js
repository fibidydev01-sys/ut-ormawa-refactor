import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json')

let serviceAccount

try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))
} catch (error) {
  console.error('Tidak dapat membaca serviceAccountKey.json:', error.message)
  process.exit(1)
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  })
}

const db = getFirestore()

const organizations = [
  { name: 'IM FST' },
  { name: 'IM FEB' },
  { name: 'IM FHISIP' },
  { name: 'IM FKIP' }
]

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function seedOrganizations() {
  const results = []

  for (const organization of organizations) {
    const id = slugify(organization.name)
    const payload = {
      name: organization.name,
      organization_type: 'HIMPUNAN_MAHASISWA',
      description: '',
      logo_url: ''
    }

    await db.collection('organizations').doc(id).set(payload)
    results.push({ id, ...payload })
  }

  console.log('Seeder organisasi selesai.')
  console.log(JSON.stringify(results, null, 2))
}

seedOrganizations().catch((error) => {
  console.error('Gagal menjalankan seeder organisasi:', error)
  process.exit(1)
})
