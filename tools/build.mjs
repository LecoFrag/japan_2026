/* =========================================================================
   Gera data/generated.js com:
     - fotos icônicas de cada lugar (Wikipedia / Wikimedia Commons) + créditos
     - rotas reais a pé / de carro entre as paradas de cada dia (OSRM)
   Uso:  node tools/build.mjs            (só busca o que ainda não existe)
         node tools/build.mjs --fresh    (refaz tudo)
         node tools/build.mjs --check    (compara coordenadas com a Wikipedia)
   ========================================================================= */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'generated.js');
const UA = { 'User-Agent': 'ViagemJapao2026-roteiro-pessoal/1.0 (uso pessoal)' };
const args = new Set(process.argv.slice(2));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- carrega os arquivos de dados como no navegador ---
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['places.js', 'terms.js', 'trip.js']) {
  const p = path.join(ROOT, 'data', f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
}
const { PLACES, DAYS = [], PLAN_B, TERMS = {} } = ctx.window;
// fotos: lugares + termos do glossário (prefixo t:)
const PHOTO_SRC = { ...PLACES };
for (const [k, v] of Object.entries(TERMS)) PHOTO_SRC['t:' + k] = v;
const EXTRA_ROUTES = PLAN_B ? [PLAN_B.route] : [];

let GEN = { photos: {}, routes: {} };
if (fs.existsSync(OUT) && !args.has('--fresh')) {
  const c = { window: {} };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(OUT, 'utf8'), c);
  GEN = c.window.GEN || GEN;
}

async function getJSON(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (r.ok) return await r.json();
      if (r.status === 429) await sleep(3000);
    } catch (e) { /* tenta de novo */ }
    await sleep(800 * (i + 1));
  }
  return null;
}

const save = () => fs.writeFileSync(OUT, '/* Gerado automaticamente por tools/build.mjs — não editar à mão */\nwindow.GEN = ' + JSON.stringify(GEN) + ';\n');

const stripHtml = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function commonsMeta(fileTitle) {
  const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=960&titles=' + encodeURIComponent(fileTitle);
  const j = await getJSON(u);
  const page = j && Object.values(j.query.pages)[0];
  const ii = page && page.imageinfo && page.imageinfo[0];
  if (!ii) return null;
  const m = ii.extmetadata || {};
  return {
    url: ii.thumburl || ii.url,
    page: ii.descriptionurl,
    file: fileTitle.replace(/^File:/, ''),
    artist: stripHtml(m.Artist && m.Artist.value).slice(0, 80),
    license: stripHtml(m.LicenseShortName && m.LicenseShortName.value),
  };
}

// ---------------------------------------------------------------- fotos
async function photos() {
  for (const id of Object.keys(GEN.photos)) {
    const p = PHOTO_SRC[id];
    if (!id.includes('#') && (!p || p.img === false)) delete GEN.photos[id];
  }
  const ids = Object.keys(PHOTO_SRC).filter((id) => {
    const p = PHOTO_SRC[id];
    if (p.img === false) return false;
    if (!p.w && !p.cs && !p.img) return false;
    const key = p.img || p.w || p.cs;
    return args.has('--fresh') || !GEN.photos[id] || GEN.photos[id].key !== key;
  });
  console.log(`Fotos a buscar: ${ids.length}`);
  for (const id of ids) {
    const p = PHOTO_SRC[id];
    let file = null;
    if (p.img) file = p.img.startsWith('File:') ? p.img : 'File:' + p.img;
    if (!file && p.w) {
      const sum = await getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(p.w.replace(/ /g, '_')));
      const src = sum && (sum.originalimage || sum.thumbnail);
      if (src && src.source) {
        const m = decodeURIComponent(src.source).match(/\/([^/]+?\.(?:jpe?g|png|webp|gif|tiff?))(?:\/|$)/i);
        if (m) file = 'File:' + m[1].replace(/^\d+px-/, '');
      }
      if (sum && sum.coordinates) GEN.photos[id + '#coord'] = [sum.coordinates.lat, sum.coordinates.lon];
    }
    if (!file && p.w) {
      const u = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages|coordinates&piprop=name&titles=' + encodeURIComponent(p.w);
      const j = await getJSON(u);
      const pg = j && Object.values(j.query.pages)[0];
      if (pg && pg.pageimage) file = 'File:' + pg.pageimage;
      if (pg && pg.coordinates) GEN.photos[id + '#coord'] = [pg.coordinates[0].lat, pg.coordinates[0].lon];
      if (!j) console.log(`  ! falha de rede (Wikipedia): ${id}`);
      else if (!file) console.log(`  ! sem imagem na Wikipedia: ${id} (${p.w})`);
    }
    const query = p.cs || (!file && p.w ? p.w : null);
    if (!file && query) {
      const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=5&srsearch=' + encodeURIComponent(query);
      const j = await getJSON(u);
      const hit = j && j.query.search.find((s) => /\.(jpe?g|png|webp)$/i.test(s.title));
      if (hit) file = hit.title;
      else console.log(`  ! nada no Commons: ${id} (${query})`);
    }
    if (!file) continue;
    const meta = await commonsMeta(file);
    if (meta) {
      GEN.photos[id] = { ...meta, key: p.img || p.w || p.cs };
      console.log(`  ✓ ${id.padEnd(24)} ${meta.file.slice(0, 70)}`);
      save();
    }
    await sleep(args.has('--slow') ? 2500 : 900);
  }
}

// ---------------------------------------------------------------- rotas
const ROUTED = { walk: 'routed-foot', taxi: 'routed-car', bus: 'routed-car' };

function legsFromDays() {
  const legs = [];
  const push = (from, to, mode) => { if (ROUTED[mode]) legs.push({ from, to, mode }); };
  for (const d of DAYS) {
    const r = d.route || [];
    for (let i = 1; i < r.length; i++) push(r[i - 1].p, r[i].p, r[i].m);
  }
  for (const r of EXTRA_ROUTES) for (let i = 1; i < r.length; i++) push(r[i - 1].p, r[i].p, r[i].m);
  return legs;
}

async function routes() {
  const legs = legsFromDays();
  let n = 0;
  for (const { from, to, mode } of legs) {
    const key = `${from}>${to}>${mode}`;
    if (GEN.routes[key] && !args.has('--fresh')) continue;
    const a = PLACES[from], b = PLACES[to];
    if (!a || !b) { console.log(`  ! lugar inexistente na rota: ${from} → ${to}`); continue; }
    const prof = ROUTED[mode];
    const u = `https://routing.openstreetmap.de/${prof}/route/v1/driving/${a.ll[1]},${a.ll[0]};${b.ll[1]},${b.ll[0]}?overview=full&geometries=polyline`;
    const j = await getJSON(u);
    if (j && j.code === 'Ok') {
      const r = j.routes[0];
      GEN.routes[key] = { d: Math.round(r.distance), t: Math.round(r.duration), g: r.geometry };
      console.log(`  ✓ ${key.padEnd(55)} ${(r.distance / 1000).toFixed(2)} km`);
      n++; if (n % 10 === 0) save();
    } else console.log(`  ! falhou: ${key}`);
    await sleep(350);
  }
  console.log(`Rotas novas: ${n}`);
}

// ---------------------------------------------------------------- checagem
function haversine(a, b) {
  const R = 6371000, toR = (x) => (x * Math.PI) / 180;
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function check() {
  for (const id of Object.keys(PLACES)) {
    const c = GEN.photos[id + '#coord'];
    if (!c) continue;
    const d = haversine(PLACES[id].ll, c);
    if (d > 250) console.log(`  ≠ ${id.padEnd(24)} ${Math.round(d)} m  (wiki: ${c[0].toFixed(5)}, ${c[1].toFixed(5)})`);
  }
}

if (!args.has('--routes-only')) await photos();
if (!args.has('--photos-only')) await routes();
if (args.has('--check')) check();

fs.writeFileSync(OUT, '/* Gerado automaticamente por tools/build.mjs — não editar à mão */\nwindow.GEN = ' + JSON.stringify(GEN) + ';\n');
console.log('OK →', path.relative(ROOT, OUT));
