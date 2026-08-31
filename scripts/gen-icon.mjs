// Generates PWA icons (chair silhouette) as real PNG files, no external deps.
// Usage: node scripts/gen-icon.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public');

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const BG = [0x23, 0x4d, 0x5c]; // water-800 (site accent)
const FG = [0xf5, 0xf0, 0xe8]; // sand-100

function makePng(size) {
  const stride = size * 4 + 1;
  const out = Buffer.alloc(stride * size);
  const px = (row, col, color) => {
    const i = row * stride + 1 + col * 4;
    out[i] = color[0];
    out[i + 1] = color[1];
    out[i + 2] = color[2];
    out[i + 3] = 255;
  };
  // background
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) px(y, x, BG);
  // chair silhouette in 512-coordinate space
  const s = size / 512;
  const shapes = [
    [236, 96, 40, 208], // backrest
    [196, 300, 240, 36], // seat
    [216, 336, 32, 136], // front-left leg
    [384, 336, 32, 136], // front-right leg
    [260, 336, 32, 80], // broken rear leg (shorter = snapped)
  ];
  for (const [x, y, w, h] of shapes) {
    const x0 = Math.round(x * s), y0 = Math.round(y * s);
    const x1 = Math.round((x + w) * s), y1 = Math.round((y + h) * s);
    for (let py = y0; py < y1; py++) for (let pxx = x0; pxx < x1; pxx++) px(py, pxx, FG);
  }
  // scanlines with filter byte 0
  for (let y = 0; y < size; y++) out[y * stride] = 0;

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(out)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync(outDir, { recursive: true });
const targets = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];
for (const [name, size] of targets) {
  writeFileSync(join(outDir, name), makePng(size));
  console.log(`generated ${name} (${size}x${size})`);
}
