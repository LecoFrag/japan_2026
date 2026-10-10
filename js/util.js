/* =========================================================================
   Utilitários: textos, datas, glossário clicável, pôr do sol, Google Maps
   ========================================================================= */
(function () {
  const U = {};
  const GEN = window.GEN || { photos: {}, routes: {} };

  U.$ = (s, el = document) => el.querySelector(s);
  U.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  U.esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* -------------------------------------------------- datas (sempre no fuso do Japão) */
  const WD = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const WD_S = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const MON = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  U.parseDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  U.weekday = (iso) => WD[U.parseDate(iso).getUTCDay()];
  U.weekdayShort = (iso) => WD_S[U.parseDate(iso).getUTCDay()];
  U.dayNum = (iso) => iso.slice(8, 10);
  U.fmtDate = (iso) => { const d = U.parseDate(iso); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]}`; };
  U.fmtLong = (iso) => { const d = U.parseDate(iso); const w = WD[d.getUTCDay()]; return `${w[0].toUpperCase() + w.slice(1)}, ${String(d.getUTCDate()).padStart(2, '0')} de ${['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][d.getUTCMonth()]}`; };
  U.japanToday = () => { const n = new Date(Date.now() + 9 * 3600e3); return n.toISOString().slice(0, 10); };

  /* -------------------------------------------------- cidades / lugares */
  U.city = (c) => (window.CITIES[c] || { n: 'Viagem', color: 'var(--travel)', jp: '✈' });
  U.cityColor = (c) => (c === 'travel' ? '#6b6b6b' : U.city(c).color);
  U.cssCity = (c) => `--c: var(--${window.CITIES[c] ? c : 'travel'})`;
  U.place = (id) => window.PLACES[id];
  U.photo = (id) => GEN.photos[id] || null;
  U.typeOf = (p) => window.TYPES[p.t] || { label: p.t, icon: '📍' };

  U.img = (id, cls = '', alt = '') => {
    const ph = U.photo(id);
    const p = U.place(id) || window.TERMS[id.replace(/^t:/, '')];
    if (ph && ph.url) return `<img src="${U.esc(ph.url)}" alt="${U.esc(alt || (p && p.n) || '')}" loading="lazy" decoding="async" class="${cls}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph-tile',innerHTML:'<span>📍</span>'}))">`;
    const icon = p ? (p.t ? U.typeOf(p).icon : (window.TERM_CATS[p.cat] || {}).icon || '📖') : '📍';
    return `<div class="ph-tile"><span>${icon}</span></div>`;
  };

  U.stars = (s) => {
    if (s === 'opt') return '<span class="badge opt">Opcional</span>';
    if (s === 'log') return '<span class="badge log">Logística</span>';
    if (s === 'pos') return '<span class="badge todo">Possível</span>';
    const n = Number(s) || 0;
    return `<span class="stars" title="Prioridade ${n} de 5">${'★'.repeat(n)}<i>${'★'.repeat(5 - n)}</i></span>`;
  };

  /* -------------------------------------------------- distâncias */
  U.haversine = (a, b) => {
    const R = 6371000, r = (x) => (x * Math.PI) / 180;
    const dLa = r(b[0] - a[0]), dLo = r(b[1] - a[1]);
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  U.fmtDist = (m) => (m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(m < 10000 ? 1 : 0).replace('.', ',')} km`);
  U.fmtMin = (min) => { min = Math.max(1, Math.round(min)); return min < 60 ? `${min} min` : `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`; };

  /* -------------------------------------------------- Google Maps */
  U.gmPlace = (id) => {
    const p = U.place(id);
    const q = p.g || `${p.n.replace(/\(.*?\)/g, '').trim()}, ${U.city(p.c).n === 'Monte Fuji (Plano B)' ? 'Yamanashi' : U.city(p.c).n}, Japan`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  };
  const gmMode = { walk: 'walking', taxi: 'driving', bus: 'transit', train: 'transit', subway: 'transit', shinkansen: 'transit', plane: 'transit' };
  U.gmDir = (fromId, toId, mode = 'walk') => {
    const a = U.place(fromId), b = U.place(toId);
    return `https://www.google.com/maps/dir/?api=1&origin=${a.ll[0]},${a.ll[1]}&destination=${b.ll[0]},${b.ll[1]}&travelmode=${gmMode[mode] || 'transit'}`;
  };
  U.gmRoute = (ids) => {
    const pts = ids.map((id) => U.place(id).ll.join(','));
    const o = pts[0], d = pts[pts.length - 1];
    const w = pts.slice(1, -1).slice(0, 8).join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${o}&destination=${d}${w ? '&waypoints=' + encodeURIComponent(w) : ''}&travelmode=walking`;
  };

  /* -------------------------------------------------- polyline (formato do Google/OSRM) */
  U.decodePolyline = (str, precision = 5) => {
    let index = 0, lat = 0, lng = 0; const coords = []; const f = 10 ** precision;
    while (index < str.length) {
      let b, shift = 0, result = 0;
      do { b = str.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;
      shift = 0; result = 0;
      do { b = str.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;
      coords.push([lat / f, lng / f]);
    }
    return coords;
  };
  U.routeFor = (from, to, mode) => GEN.routes[`${from}>${to}>${mode}`] || null;

  /* -------------------------------------------------- nascer/pôr do sol (algoritmo NOAA) */
  U.sunTimes = (iso, lat, lng) => {
    const d = U.parseDate(iso);
    const start = Date.UTC(d.getUTCFullYear(), 0, 0);
    const N = Math.round((d - start) / 864e5);
    const rad = Math.PI / 180;
    const calc = (rise) => {
      const lngHour = lng / 15;
      const t = N + ((rise ? 6 : 18) - lngHour) / 24;
      const M = 0.9856 * t - 3.289;
      let L = M + 1.916 * Math.sin(M * rad) + 0.020 * Math.sin(2 * M * rad) + 282.634; L = (L + 360) % 360;
      let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad; RA = (RA + 360) % 360;
      RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90; RA /= 15;
      const sinDec = 0.39782 * Math.sin(L * rad), cosDec = Math.cos(Math.asin(sinDec));
      const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
      let H = Math.acos(cosH) / rad; if (rise) H = 360 - H; H /= 15;
      const T = H + RA - 0.06571 * t - 6.622;
      let UT = (T - lngHour + 24) % 24;
      const local = (UT + 9) % 24;
      const h = Math.floor(local), m = Math.round((local - h) * 60);
      return `${h}h${String(m === 60 ? 59 : m).padStart(2, '0')}`;
    };
    return { rise: calc(true), set: calc(false) };
  };

  /* -------------------------------------------------- glossário clicável no texto */
  let aliasRe = null; const aliasMap = new Map();
  function buildAliases() {
    const add = (name, key) => { if (name && name.length > 1 && !aliasMap.has(name)) aliasMap.set(name, key); };
    // nomes completos têm prioridade sobre apelidos
    for (const [id, p] of Object.entries(window.PLACES)) if (p.t !== 'estacao' || id === 'busta-shinjuku') add(p.n, 'p:' + id);
    for (const [id, t] of Object.entries(window.TERMS)) add(t.n, 't:' + id);
    for (const [id, p] of Object.entries(window.PLACES)) (p.aka || []).forEach((a) => add(a, 'p:' + id));
    for (const [id, t] of Object.entries(window.TERMS)) (t.aka || []).forEach((a) => add(a, 't:' + id));
    const names = [...aliasMap.keys()].sort((a, b) => b.length - a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    aliasRe = new RegExp(`(?<![\\p{L}\\p{N}])(${names.join('|')})(?![\\p{L}\\p{N}])`, 'gu');
  }
  /** Converte texto puro em HTML com termos clicáveis (1ª ocorrência de cada termo). */
  U.linkify = (text, opts = {}) => {
    if (!text) return '';
    if (!aliasRe) buildAliases();
    const seen = new Set(opts.skip || []);
    const safe = U.esc(text);
    return safe.replace(aliasRe, (m) => {
      const key = aliasMap.get(m) || aliasMap.get(U.esc(m));
      if (!key || seen.has(key)) return m;
      seen.add(key);
      const [kind, id] = key.split(/:(.+)/);
      return `<button type="button" class="gl ${kind === 't' ? 'term' : ''}" data-g="${key}">${m}</button>`;
    });
  };
  U.allAliases = () => { if (!aliasRe) buildAliases(); return aliasMap; };

  /* -------------------------------------------------- em que dias aparece cada lugar */
  U.placeDays = (() => {
    let idx = null;
    return (id) => {
      if (!idx) {
        idx = {};
        const add = (pid, did) => { (idx[pid] = idx[pid] || new Set()).add(did); };
        for (const d of window.DAYS) {
          (d.route || []).forEach((r) => add(r.p, d.id));
          (d.spots || []).forEach((s) => add(s.p, d.id));
          (d.schedule || []).forEach((s) => s.p && add(s.p, d.id));
        }
        const pb = window.PLAN_B;
        if (pb) { pb.route.forEach((r) => add(r.p, 'fuji')); pb.spots.forEach((s) => add(s.p, 'fuji')); }
      }
      return [...(idx[id] || [])];
    };
  })();
  U.dayById = (id) => (id === 'fuji' ? window.PLAN_B : window.DAYS.find((d) => d.id === id));
  U.dayLabel = (d) => (d.id === 'fuji' ? 'Plano B · Fuji' : `${U.dayNum(d.date)}/12 · ${d.n}`);

  /* -------------------------------------------------- armazenamento local (seguro) */
  U.store = {
    get(k, def) { try { const v = localStorage.getItem('jp26:' + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem('jp26:' + k, JSON.stringify(v)); } catch { /* sem armazenamento */ } },
  };

  U.toast = (msg) => {
    const t = U.$('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(U._tt); U._tt = setTimeout(() => t.classList.remove('show'), 2200);
  };

  window.U = U;
})();
