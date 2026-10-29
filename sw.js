/* Service worker: deixa o roteiro disponível offline depois da primeira visita */
const VERSION = 'jp26-v3';
const SHELL = [
  './', 'index.html', 'css/app.css', 'js/util.js', 'js/map.js', 'js/app.js',
  'data/places.js', 'data/terms.js', 'data/trip.js', 'data/info.js', 'data/generated.js',
  'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION && k !== 'jp26-media').map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// arquivos do app: rede primeiro (para pegar atualizações do roteiro), cache se offline
// fotos, tiles e fontes: cache primeiro
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.includes('open-meteo')) return; // previsão sempre ao vivo
  const media = /upload\.wikimedia|tile\.openstreetmap|arcgisonline|fonts\.(googleapis|gstatic)/.test(url.hostname);
  if (media) {
    e.respondWith(caches.open('jp26-media').then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  e.respondWith(fetch(req).then((res) => {
    if (res.ok && (url.origin === location.origin || url.hostname.includes('cdnjs'))) caches.open(VERSION).then((c) => c.put(req, res.clone()));
    return res;
  }).catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'precache') {
    // baixa aos poucos (6 por vez) para não sobrecarregar a conexão
    caches.open('jp26-media').then(async (c) => {
      const list = e.data.urls.slice();
      const worker = async () => {
        while (list.length) {
          const u = list.shift();
          if (await c.match(u)) continue;
          try { const r = await fetch(u, { mode: 'cors' }); if (r.ok) await c.put(u, r); } catch (err) { /* ignora */ }
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
    });
  }
});
