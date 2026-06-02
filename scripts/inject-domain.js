import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

let SITE_URL = process.env.VITE_SITE_URL

if (!SITE_URL) {
  const envPath = path.join(ROOT, '.env')
  if (existsSync(envPath)) {
    try {
      const envLines = readFileSync(envPath, 'utf-8').split('\n')
      for (const line of envLines) {
        if (line.includes('=')) {
          const idx = line.indexOf('=')
          const key = line.slice(0, idx).trim()
          const val = line.slice(idx + 1).trim()
          if (key === 'VITE_SITE_URL') {
            SITE_URL = val
            break
          }
        }
      }
    } catch (e) {
      console.warn('Warning: Could not read .env file', e)
    }
  }
}

// Fallback if not defined
if (!SITE_URL) {
  SITE_URL = 'https://ale.dev'
  console.warn(`WARNING: VITE_SITE_URL not found in environment or .env. Using fallback: ${SITE_URL}`)
}

// Inject in dist directory after build has copied files from public to dist
const files = [
  'dist/sitemap.xml',
  'dist/robots.txt',
  'dist/cv.html',
  'dist/cv-en.html',
]

for (const relative of files) {
  const filePath = path.join(ROOT, relative)
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const updated = content.replaceAll('__SITE_URL__', SITE_URL)
      writeFileSync(filePath, updated, 'utf-8')
      console.log(`  ✔ ${relative}`)
    } catch (e) {
      console.error(`  ✘ Error updating ${relative}:`, e)
    }
  } else {
    console.warn(`  ⚠️ File not found: ${relative}`)
  }
}

console.log(`\nDomain injected: ${SITE_URL}`)
