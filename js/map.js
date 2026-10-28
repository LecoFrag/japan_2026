/* =========================================================================
   Mapas (Leaflet): mapa do dia, mapa geral, mapa da visão geral, mini-mapa
   ========================================================================= */
(function () {
  const M = {};
  function baseLayers() {
    return {
      'Mapa': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles &copy; Esri', className: 'tiles-base' }),
      'OpenStreetMap': L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', className: 'tiles-base' }),
      'Satélite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles &copy; Esri — Maxar, Earthstar Geographics' }),
    };
  }

  function makeMap(el, opts = {}) {
    const map = L.map(el, { zoomControl: false, attributionControl: true, zoomSnap: 0.25, zoomDelta: 0.5, wheelPxPerZoomLevel: 90, scrollWheelZoom: opts.scroll !== false, tap: true, ...opts.leaflet });
    const layers = baseLayers();
    layers['Mapa'].addTo(map);
    map._jpLayers = layers;
    L.control.zoom({ position: 'topright' }).addTo(map);
    if (opts.layers !== false) L.control.layers(layers, null, { position: 'topright' }).addTo(map);
    map.attributionControl.setPrefix(false);
    if (opts.embedded) embedGestures(map);
    // mantém o mapa do tamanho certo quando o layout muda (painel fixo, celular, tela cheia)
    if ('ResizeObserver' in window) {
      let pending;
      const ro = new ResizeObserver(() => { cancelAnimationFrame(pending); pending = requestAnimationFrame(() => map._loaded && map.invalidateSize()); });
      ro.observe(el);
      map.on('unload', () => ro.disconnect());
    }
    return map;
  }

  /* Mapas dentro da página: no celular, 1 dedo rola a página e 2 dedos movem o mapa;
     no computador, a roda do mouse só dá zoom depois de clicar no mapa. */
  function embedGestures(map) {
    const el = map.getContainer();
    const touch = matchMedia('(pointer: coarse)').matches;
    map.scrollWheelZoom.disable();
    map.on('click focus', () => map.scrollWheelZoom.enable());
    el.addEventListener('mouseleave', () => map.scrollWheelZoom.disable());
    if (!touch) return;
    map.dragging.disable();
    const hint = L.DomUtil.create('div', 'map-hint', el);
    hint.textContent = 'Use dois dedos para mover o mapa';
    let t;
    el.addEventListener('touchstart', (e) => {
      if (el.classList.contains('map-full')) return;
      if (e.touches.length >= 2) { map.dragging.enable(); hint.classList.remove('show'); }
      else { map.dragging.disable(); hint.classList.add('show'); clearTimeout(t); t = setTimeout(() => hint.classList.remove('show'), 1300); }
    }, { passive: true });
    el.addEventListener('touchend', (e) => { if (!e.touches.length && !el.classList.contains('map-full')) map.dragging.disable(); }, { passive: true });
    map._embedTouch = true;
  }
  M.retheme = () => { /* o modo escuro dos mapas é feito via CSS (.tiles-base) */ };

  /* -------------------------------------------------- ícones */
  const cssC = (c) => `--c:${U.cityColor(c)}`;
  function pinIcon(p, label, cls = '') {
    const html = `<div class="pin ${cls}" style="${cssC(p.c)}"><span>${label}</span></div>`;
    return L.divIcon({ className: '', html, iconSize: [32, 32], iconAnchor: [16, 34], popupAnchor: [0, -30] });
  }
  const hotelIcon = () => L.divIcon({ className: '', html: '<div class="pin hotel"><span>🏨</span></div>', iconSize: [36, 36], iconAnchor: [18, 38], popupAnchor: [0, -34] });
  const staIcon = () => L.divIcon({ className: '', html: '<div class="sta">🚉</div>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -8] });
  const airIcon = () => L.divIcon({ className: '', html: '<div class="sta">✈️</div>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -8] });
  const dotIcon = (c) => L.divIcon({ className: '', html: `<div class="dot-mk" style="${cssC(c)}"></div>`, iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -6] });

  function popupHtml(id) {
    const p = U.place(id), ty = U.typeOf(p);
    return `<div style="${cssC(p.c)}">
      <div class="pop-photo">${U.img(id)}</div>
      <div class="pop-body"><b>${U.esc(p.n)}</b><span class="jp">${U.esc(p.jp || '')}</span>
        <div class="t">${ty.icon} ${U.esc(ty.label)}</div>
        <div class="pop-actions"><button type="button" data-open="p:${id}">Detalhes</button><a href="${U.gmPlace(id)}" target="_blank" rel="noopener">Google Maps</a></div>
      </div></div>`;
  }
  function bindPopup(marker, id) {
    marker.bindPopup(popupHtml(id), { maxWidth: 260, minWidth: 250, autoPanPadding: [30, 60] });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (b && window.App) window.App.openEntry(b.dataset.open);
  });

  /* -------------------------------------------------- geometria */
  function convexHull(pts) {
    const P = pts.map((p) => [p[1], p[0]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (P.length < 3) return pts;
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [], upper = [];
    for (const p of P) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
    for (const p of P.slice().reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
    return lower.slice(0, -1).concat(upper.slice(0, -1)).map((p) => [p[1], p[0]]);
  }
  function bufferedHull(points, radius = 160) {
    const out = [];
    for (const [lat, lng] of points) {
      const dLat = radius / 111320, dLng = radius / (111320 * Math.cos((lat * Math.PI) / 180));
      for (let i = 0; i < 16; i++) { const a = (i / 16) * 2 * Math.PI; out.push([lat + dLat * Math.sin(a), lng + dLng * Math.cos(a)]); }
    }
    return convexHull(out);
  }
  // simplifica uma lista de pontos para no máx. ~n
  const thin = (arr, n = 60) => (arr.length <= n ? arr : arr.filter((_, i) => i % Math.ceil(arr.length / n) === 0));

  /* -------------------------------------------------- legs de um dia */
  M.legs = (day) => {
    const r = day.route || []; const legs = [];
    for (let i = 1; i < r.length; i++) {
      const from = r[i - 1].p, to = r[i].p, mode = r[i].m || 'walk';
      const a = U.place(from), b = U.place(to);
      if (!a || !b) continue;
      const gen = U.routeFor(from, to, mode);
      let path, dist, min;
      if (gen) { path = U.decodePolyline(gen.g); dist = gen.d; min = mode === 'walk' ? gen.t / 60 : gen.t / 60; }
      else { path = [a.ll, ...(r[i].via || []), b.ll]; dist = 0; for (let k = 1; k < path.length; k++) dist += U.haversine(path[k - 1], path[k]); }
      if (r[i].min) min = r[i].min;
      if (!min && mode === 'walk') min = dist / 75; // ~4,5 km/h
      legs.push({ i, from, to, mode, line: r[i].line, path, dist, min, routed: !!gen });
    }
    return legs;
  };

  M.zones = (day) => {
    const r = day.route || []; const legs = M.legs(day);
    const clusters = []; let cur = r.length ? [r[0].p] : []; let geo = [];
    legs.forEach((lg) => {
      if (lg.mode === 'walk') { cur.push(lg.to); geo = geo.concat(thin(lg.path, 25)); }
      else { clusters.push({ ids: cur, geo }); cur = [lg.to]; geo = []; }
    });
    if (cur.length) clusters.push({ ids: cur, geo });
    const isVisit = (id) => { const t = U.place(id).t; return t !== 'hotel' && t !== 'estacao' && t !== 'aeroporto'; };
    const kept = clusters.filter((c) => c.ids.some(isVisit));
    return kept.map((c, k) => {
      const pts = c.ids.map((id) => U.place(id).ll).concat(c.geo);
      return { name: (day.zones || [])[k] || '', ids: c.ids, poly: bufferedHull(pts, c.ids.filter(isVisit).length < 2 ? 260 : 140) };
    });
  };

  /* -------------------------------------------------- trechos de cada item da linha do tempo
     Cada item com "to" cobre os trechos da rota desde o ponto onde o item anterior terminou
     até a primeira ocorrência de "to". Itens sem "to" não têm deslocamento. */
  M.segments = (day) => {
    const r = day.route || []; let cursor = 0;
    return (day.schedule || []).map((s) => {
      if (s.off) return { legs: [], at: s.p || null, off: true };
      if (!s.to) return { legs: [], at: s.p || (r[cursor] && r[cursor].p) || null };
      let j = -1;
      for (let k = cursor + 1; k < r.length; k++) if (r[k].p === s.to) { j = k; break; }
      if (j < 0) return { legs: [], at: s.to };
      const legs = []; for (let k = cursor + 1; k <= j; k++) legs.push(k);
      cursor = j;
      return { legs, at: s.to };
    });
  };

  /* -------------------------------------------------- mapa do dia */
  M.dayMap = (el, day) => {
    const map = makeMap(el, { embedded: true });
    const color = U.cityColor(day.city === 'travel' ? 'tokyo' : day.city);
    const legs = M.legs(day);
    const zones = M.zones(day);
    const zoneLayers = [];

    zones.forEach((z) => {
      const poly = L.polygon(z.poly, { color, weight: 1.6, dashArray: '6 6', fillColor: color, fillOpacity: 0.09, interactive: false }).addTo(map);
      if (z.name) poly.bindTooltip(z.name, { permanent: true, direction: 'center', className: 'zone-label', opacity: 1 });
      zoneLayers.push(poly);
    });

    const legLayers = {}; // índice da rota -> [{ layer, base }]
    const keep = (i, layer) => { (legLayers[i] = legLayers[i] || []).push({ layer, base: { ...layer.options } }); return layer; };
    legs.forEach((lg) => {
      if (lg.mode === 'walk') {
        keep(lg.i, L.polyline(lg.path, { color: '#fff', weight: 8, opacity: 0.9, interactive: false }).addTo(map));
        keep(lg.i, L.polyline(lg.path, { color, weight: 4.5, opacity: 0.95 }).addTo(map))
          .bindTooltip(`🚶 ${U.fmtDist(lg.dist)} · ~${U.fmtMin(lg.min)} a pé`, { sticky: true });
        keep(lg.i, L.polyline(lg.path, { color: '#fff', weight: 2, opacity: 0.9, className: 'walk-ants', interactive: false }).addTo(map));
      } else {
        const dark = lg.mode === 'taxi' || lg.mode === 'bus' ? '#5b4636' : '#3b3833';
        keep(lg.i, L.polyline(lg.path, { color: '#fff', weight: 7, opacity: 0.85, interactive: false }).addTo(map));
        const line = keep(lg.i, L.polyline(lg.path, { color: dark, weight: 3.5, dashArray: lg.mode === 'shinkansen' ? '14 8' : '3 9', lineCap: 'round', opacity: 0.9 }).addTo(map));
        const ic = { train: '🚆', subway: '🚇', shinkansen: '🚄', bus: '🚌', taxi: '🚕', plane: '✈️' }[lg.mode] || '🚆';
        line.bindTooltip(`${ic} ${U.esc(lg.line || '')}${lg.min ? ' · ~' + U.fmtMin(lg.min) : ''}`, { sticky: true });
        if (lg.dist > 3000 && (lg.min || 0) >= 10) {
          const mid = lg.path[Math.floor(lg.path.length / 2)] || lg.path[0];
          const midPt = lg.path.length === 2 ? [(lg.path[0][0] + lg.path[1][0]) / 2, (lg.path[0][1] + lg.path[1][1]) / 2] : mid;
          const tm = L.marker(midPt, { icon: L.divIcon({ className: '', html: `<div class="train-mk">${ic}${lg.min ? ' ' + U.fmtMin(lg.min) : ''}</div>`, iconSize: null, iconAnchor: [28, 10] }), interactive: false, keyboard: false }).addTo(map);
          (legLayers[lg.i] = legLayers[lg.i] || []).push({ marker: tm });
        }
      }
    });

    // marcadores (sem repetir)
    const optSet = new Set((day.spots || []).filter((s) => s.s === 'opt').map((s) => s.p));
    (day.schedule || []).forEach((s) => { if (s.k === 'opt' && s.p) optSet.add(s.p); });
    const markers = {}; let n = 0;
    (day.route || []).forEach(({ p: id }) => {
      if (markers[id]) return;
      const p = U.place(id); if (!p) return;
      let icon;
      if (p.t === 'hotel') icon = hotelIcon();
      else if (p.t === 'estacao') icon = staIcon();
      else if (p.t === 'aeroporto') icon = airIcon();
      else { n++; icon = pinIcon(p, p.t === 'games' ? '🎮' : n, (optSet.has(id) ? 'opt ' : '') + (p.t === 'games' ? 'games' : '')); }
      const mk = L.marker(p.ll, { icon, title: p.n, riseOnHover: true, zIndexOffset: p.t === 'hotel' ? 500 : p.t === 'estacao' ? -200 : 0 }).addTo(map);
      bindPopup(mk, id);
      markers[id] = mk;
    });
    // lugares citados no dia que não estão na rota (ex.: atrações extras)
    (day.spots || []).forEach(({ p: id }) => {
      if (markers[id]) return; const p = U.place(id); if (!p) return;
      const mk = L.marker(p.ll, { icon: dotIcon(p.c), title: p.n }).addTo(map); bindPopup(mk, id); markers[id] = mk;
    });

    const allBounds = () => L.latLngBounds((day.route || []).map((r) => U.place(r.p).ll));
    function fitDefault(animate = false) {
      let b;
      if (day.fit && window.CITIES[day.fit]) {
        const pts = (day.route || []).map((r) => U.place(r.p)).filter((p) => p.c === day.fit).map((p) => p.ll);
        b = L.latLngBounds(pts);
      } else if (zoneLayers.length) {
        b = zoneLayers.reduce((acc, z) => acc.extend(z.getBounds()), L.latLngBounds(zoneLayers[0].getBounds().getSouthWest(), zoneLayers[0].getBounds().getNorthEast()));
      } else if ((day.route || []).length) b = allBounds();
      if (b && b.isValid()) map.fitBounds(b, { padding: [24, 24], maxZoom: 16, animate });
      else map.setView([35.0, 136.5], 6);
    }
    fitDefault();
    // reenquadra quando o tamanho do mapa muda, até o usuário mexer nele
    let touched = false;
    map.getContainer().addEventListener('pointerdown', () => { touched = true; }, { once: true });
    map.getContainer().addEventListener('wheel', () => { touched = true; }, { once: true });
    map.on('resize', () => { if (!touched) fitDefault(); });

    // controles extras: localizar, enquadrar o dia, tela cheia
    const Ctl = L.Control.extend({
      options: { position: 'topleft' },
      onAdd() {
        const box = L.DomUtil.create('div', 'leaflet-bar');
        box.innerHTML = '<a class="map-btn" href="#" title="Enquadrar o dia" data-a="fit">⤢</a><a class="map-btn" href="#" title="Onde estou" data-a="me">📍</a><a class="map-btn" href="#" title="Tela cheia" data-a="full">⛶</a>';
        L.DomEvent.disableClickPropagation(box);
        box.addEventListener('click', (e) => {
          const a = e.target.closest('[data-a]'); if (!a) return; e.preventDefault();
          if (a.dataset.a === 'fit') { if (window.App && window.App.clearStep) window.App.clearStep(); else fitDefault(true); }
          if (a.dataset.a === 'me') M.locate(map);
          if (a.dataset.a === 'full') M.toggleFull(map);
        });
        return box;
      },
    });
    map.addControl(new Ctl());

    /* destaque de um trecho: apaga o resto do dia e enquadra só o trecho escolhido */
    let hl = null;
    const routeIds = (day.route || []).map((r) => r.p);
    function highlight(legIdxs = [], placeIds = []) {
      hl = { legIdxs, placeIds };
      const on = new Set(legIdxs);
      const focusPlaces = new Set(placeIds.filter(Boolean));
      legIdxs.forEach((i) => { focusPlaces.add(routeIds[i]); focusPlaces.add(routeIds[i - 1]); });
      for (const [i, arr] of Object.entries(legLayers)) {
        const lit = on.has(+i);
        arr.forEach((o) => {
          if (o.marker) { o.marker.setOpacity(lit ? 1 : 0.15); return; }
          const b = o.base;
          if (lit) o.layer.setStyle({ opacity: b.opacity, weight: b.weight + (b.color === '#fff' ? 4 : 2.5) });
          else o.layer.setStyle({ opacity: b.opacity * 0.14, weight: b.weight });
          if (lit) o.layer.bringToFront();
        });
      }
      for (const [id, mk] of Object.entries(markers)) {
        const lit = focusPlaces.has(id);
        mk.setOpacity(lit ? 1 : 0.28);
        mk.setZIndexOffset(lit ? 800 : 0);
      }
      zoneLayers.forEach((z) => z.setStyle({ opacity: 0.35, fillOpacity: 0.035 }));
      // enquadrar
      let b = null;
      legIdxs.forEach((i) => (legs.find((l) => l.i === i) || { path: [] }).path.forEach((pt) => { b = b ? b.extend(pt) : L.latLngBounds(pt, pt); }));
      focusPlaces.forEach((id) => { const p = U.place(id); if (p) b = b ? b.extend(p.ll) : L.latLngBounds(p.ll, p.ll); });
      if (b && b.isValid()) map.flyToBounds(b, { padding: [40, 40], maxZoom: legIdxs.length ? 17 : 16, duration: 0.7 });
      if (!legIdxs.length && placeIds[0] && markers[placeIds[0]]) {
        const pin = markers[placeIds[0]].getElement() && markers[placeIds[0]].getElement().querySelector('.pin, .sta');
        if (pin) { pin.classList.remove('pin-pulse'); void pin.offsetWidth; pin.classList.add('pin-pulse'); }
      }
    }
    function clearHighlight(refit = true) {
      hl = null;
      for (const arr of Object.values(legLayers)) arr.forEach((o) => { if (o.marker) o.marker.setOpacity(1); else o.layer.setStyle({ opacity: o.base.opacity, weight: o.base.weight }); });
      for (const mk of Object.values(markers)) { mk.setOpacity(1); mk.setZIndexOffset(0); }
      zoneLayers.forEach((z) => z.setStyle({ opacity: 1, fillOpacity: 0.09 }));
      if (refit) fitDefault(true);
    }

    return {
      map, zones, zoneLayers, legs, markers, fitDefault, highlight, clearHighlight, isHighlighted: () => !!hl,
      focus(id, open = true) {
        const mk = markers[id]; const p = U.place(id); if (!p) return;
        map.flyTo(p.ll, Math.max(map.getZoom(), 16), { duration: 0.8 });
        if (mk && open) setTimeout(() => {
          mk.openPopup();
          const pin = mk.getElement() && mk.getElement().querySelector('.pin');
          if (pin) { pin.classList.remove('pin-pulse'); void pin.offsetWidth; pin.classList.add('pin-pulse'); }
        }, 850);
      },
      fitZone(i) { const z = zoneLayers[i]; if (z) map.flyToBounds(z.getBounds(), { padding: [30, 30], maxZoom: 16, duration: 0.8 }); },
    };
  };

  /* -------------------------------------------------- localização do usuário */
  M.locate = (map) => {
    if (!navigator.geolocation) return U.toast('Localização indisponível neste navegador');
    U.toast('Buscando sua localização…');
    navigator.geolocation.getCurrentPosition((pos) => {
      const ll = [pos.coords.latitude, pos.coords.longitude];
      if (map._meMarker) map.removeLayer(map._meMarker);
      map._meMarker = L.marker(ll, { icon: L.divIcon({ className: '', html: '<div class="me-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), zIndexOffset: 1000 }).addTo(map).bindTooltip('Você está aqui');
      map.flyTo(ll, 16, { duration: 0.8 });
      if (window.App && window.App.onLocate) window.App.onLocate(ll);
    }, () => U.toast('Não foi possível obter a localização'), { enableHighAccuracy: true, timeout: 10000 });
  };
  M.toggleFull = (map) => {
    const el = map.getContainer();
    el.classList.toggle('map-full');
    const on = el.classList.contains('map-full');
    Object.assign(el.style, on ? { position: 'fixed', inset: '0', zIndex: 970, height: '100%', borderRadius: '0' } : { position: '', inset: '', zIndex: '', height: '', borderRadius: '' });
    document.body.style.overflow = on ? 'hidden' : '';
    if (map._embedTouch) { if (on) map.dragging.enable(); else map.dragging.disable(); }
    setTimeout(() => map.invalidateSize(), 50);
  };

  /* -------------------------------------------------- mapa da visão geral (Japão) */
  M.overviewMap = (el) => {
    const map = makeMap(el, { layers: false, embedded: true });
    const T = window.TRIP;
    // Shinkansen Tóquio → Kyoto e trem Kyoto → Osaka
    const kt0 = window.DAYS.find((d) => d.id === 'kt0');
    const sk = kt0.route.find((r) => r.m === 'shinkansen');
    const tokyo = U.place('shinagawa-sta').ll, kyoto = U.place('kyoto-sta').ll, osaka = U.place('hotel-osaka').ll;
    L.polyline([tokyo, ...sk.via, kyoto], { color: '#fff', weight: 7 }).addTo(map);
    L.polyline([tokyo, ...sk.via, kyoto], { color: '#3b3833', weight: 3.5, dashArray: '14 8' }).addTo(map).bindTooltip('🚄 Shinkansen · ~2h10 (10/12)', { sticky: true });
    L.polyline([kyoto, osaka], { color: '#3b3833', weight: 3.5, dashArray: '3 9' }).addTo(map).bindTooltip('🚆 Kyoto → Osaka · ~1h (13/12)', { sticky: true });
    const fj = U.place('mt-fuji');
    L.marker(fj.ll, { icon: L.divIcon({ className: '', html: '<div class="train-mk">🗻 Monte Fuji</div>', iconSize: null, iconAnchor: [44, 10] }) }).addTo(map).on('click', () => (location.hash = '#/fuji'));
    T.hotels.forEach((h, i) => {
      const p = U.place(h.p); const c = window.CITIES[h.city];
      L.marker(p.ll, { icon: L.divIcon({ className: '', html: `<div class="pin" style="--c:${c.color}"><span>${i + 1}</span></div>`, iconSize: [32, 32], iconAnchor: [16, 34] }) })
        .addTo(map).bindTooltip(`<b>${c.n}</b> · ${h.nights} noites`, { direction: 'top', offset: [0, -30] })
        .on('click', () => (location.hash = '#/dia/' + window.DAYS.find((d) => d.city === h.city && d.date === h.from || d.city === h.city).id));
    });
    ['narita', 'haneda', 'kix'].forEach((id) => L.marker(U.place(id).ll, { icon: airIcon() }).addTo(map).bindTooltip(U.place(id).n));
    map.fitBounds(L.latLngBounds([tokyo, osaka, U.place('narita').ll, U.place('kix').ll]), { padding: [30, 30] });
    return map;
  };

  /* -------------------------------------------------- mapa geral (todos os lugares) */
  M.allMap = (el) => {
    const map = makeMap(el);
    const group = L.layerGroup().addTo(map);
    const markers = {};
    return {
      map, markers,
      render(ids) {
        group.clearLayers();
        for (const k of Object.keys(markers)) delete markers[k];
        ids.forEach((id) => {
          const p = U.place(id);
          let icon;
          if (p.t === 'hotel') icon = hotelIcon();
          else if (p.t === 'estacao') icon = staIcon();
          else if (p.t === 'aeroporto') icon = airIcon();
          else icon = pinIcon(p, U.typeOf(p).icon);
          const mk = L.marker(p.ll, { icon, title: p.n, riseOnHover: true }).addTo(group);
          bindPopup(mk, id); markers[id] = mk;
        });
      },
      fit(ids) {
        const b = L.latLngBounds(ids.map((id) => U.place(id).ll));
        if (b.isValid()) map.fitBounds(b, { padding: [40, 40], maxZoom: 15 });
      },
      focus(id) {
        const p = U.place(id); map.flyTo(p.ll, 16, { duration: 0.8 });
        setTimeout(() => markers[id] && markers[id].openPopup(), 850);
      },
    };
  };

  /* -------------------------------------------------- mini-mapa (painel) */
  M.miniMap = (el, id) => {
    const p = U.place(id);
    const map = makeMap(el, { layers: false, embedded: true });
    L.marker(p.ll, { icon: p.t === 'hotel' ? hotelIcon() : pinIcon(p, U.typeOf(p).icon) }).addTo(map);
    map.setView(p.ll, p.t === 'bairro' ? 14 : 15);
    return map;
  };

  window.M = M;
})();
