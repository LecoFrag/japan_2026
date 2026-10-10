/* Gera os ícones PNG do app (sem dependências): node tools/make-icons.mjs */
import fs from 'node:fs';
import zlib from 'node:zlib';
const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
function png(S, file, round) {
  const px = Buffer.alloc(S * S * 4);
  const s = S / 512, R = 112 * s;
  const set = (x, y, [r, g, b], a = 1) => { const i = (y * S + x) * 4; const ia = 1 - a; px[i] = px[i] * ia + r * a; px[i + 1] = px[i + 1] * ia + g * a; px[i + 2] = px[i + 2] * ia + b * a; px[i + 3] = Math.max(px[i + 3], 255 * a); };
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const cx = x + .5, cy = y + .5;
    // fundo arredondado (cobertura aproximada com 4x4 amostras)
    let cov = 0;
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
      const X = x + (a + .5) / 4, Y = y + (b + .5) / 4;
      const dx = Math.max(R - X, 0, X - (S - R)), dy = Math.max(R - Y, 0, Y - (S - R));
      if (!round || dx * dx + dy * dy <= R * R) cov++;
    }
    if (cov) set(x, y, [248, 244, 236], cov / 16);
    const d = Math.hypot(cx - 256 * s, cy - 236 * s);
    const sun = Math.min(1, Math.max(0, 128 * s - d + .5));
    if (sun > 0) set(x, y, [200, 16, 46], sun);
    const line = (yc, x0, x1, w, col, op) => { const dy = Math.abs(cy - yc * s); if (cx >= x0 * s && cx <= x1 * s && dy <= w * s / 2) set(x, y, col, op); };
    line(392, 96, 416, 22, [29, 26, 22], 1);
    line(360, 146, 366, 14, [29, 26, 22], .5);
  }
  const raw = Buffer.alloc(S * (S * 4 + 1));
  for (let y = 0; y < S; y++) { raw[y * (S * 4 + 1)] = 0; px.copy(raw, y * (S * 4 + 1) + 1, y * S * 4, (y + 1) * S * 4); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4); ihdr[8] = 8; ihdr[9] = 6;
  fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
}
png(180, 'icons/icon-180.png', false);
png(192, 'icons/icon-192.png', true);
png(512, 'icons/icon-512.png', false);
console.log('ícones gerados');
