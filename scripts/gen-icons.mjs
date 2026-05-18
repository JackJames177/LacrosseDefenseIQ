// Generates PWA icons + favicon with zero deps (raw raster -> PNG via zlib).
// Dark background (#0a0e14) with a neon-green (#00dc82) shield + "D".
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const BG = [0x0a, 0x0e, 0x14]
const GREEN = [0x00, 0xdc, 0x82]
const CYAN = [0x00, 0xb4, 0xd8]

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([t, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}
function png(size, pixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type RGB
  const raw = Buffer.alloc((size * 3 + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixels(x, y)
      const o = y * (size * 3 + 1) + 1 + x * 3
      raw[o] = r
      raw[o + 1] = g
      raw[o + 2] = b
    }
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Shield + D shape, normalized to a 0..1 box.
function shade(nx, ny) {
  const cx = 0.5
  // shield outline: rounded top, pointed bottom
  const inShield = (() => {
    if (ny < 0.16 || ny > 0.92) return false
    const topW = 0.34
    const t = (ny - 0.16) / (0.92 - 0.16)
    const halfW = topW * (1 - 0.55 * Math.pow(t, 1.8))
    return Math.abs(nx - cx) <= halfW
  })()
  if (!inShield) return BG
  // border ring
  const t = (ny - 0.16) / (0.92 - 0.16)
  const halfW = 0.34 * (1 - 0.55 * Math.pow(t, 1.8))
  const edge = halfW - Math.abs(nx - cx)
  if (edge < 0.022 || ny < 0.185 || ny > 0.9) return CYAN
  // letter "D"
  const lx = (nx - 0.34) / 0.32 // 0..1 across letter band
  const ly = (ny - 0.3) / 0.42
  if (lx >= 0 && lx <= 1 && ly >= 0 && ly <= 1) {
    const stem = lx < 0.22
    const rx = (lx - 0.18) / 0.82
    const ry = (ly - 0.5) / 0.5
    const bowl = rx >= 0 && rx * rx + ry * ry <= 1 && rx * rx + ry * ry >= 0.42
    if (stem || bowl) return GREEN
  }
  return [0x0c, 0x22, 0x1c]
}

function icon(size) {
  return png(size, (x, y) => shade((x + 0.5) / size, (y + 0.5) / size))
}

const out = new URL('../public/', import.meta.url)
writeFileSync(new URL('pwa-512x512.png', out), icon(512))
writeFileSync(new URL('pwa-192x192.png', out), icon(192))
writeFileSync(new URL('apple-touch-icon.png', out), icon(180))

// favicon.ico containing a single 32x32 PNG (modern browsers read PNG ICO).
const fav = icon(32)
const ico = Buffer.alloc(22)
ico.writeUInt16LE(0, 0)
ico.writeUInt16LE(1, 2)
ico.writeUInt16LE(1, 4)
ico[6] = 32
ico[7] = 32
ico[8] = 0
ico[9] = 0
ico.writeUInt16LE(1, 10)
ico.writeUInt16LE(32, 12)
ico.writeUInt32LE(fav.length, 14)
ico.writeUInt32LE(22, 18)
writeFileSync(new URL('favicon.ico', out), Buffer.concat([ico, fav]))

console.log('icons generated')
