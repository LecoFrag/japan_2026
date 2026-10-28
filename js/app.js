/* =========================================================================
   Japão 2026 — aplicativo (roteamento, páginas, glossário, busca)
   ========================================================================= */
(function () {
  const { $, $$, esc } = U;
  const main = $('#main');
  const DAYS = window.DAYS, TRIP = window.TRIP, PLACES = window.PLACES, TERMS = window.TERMS;
  const App = (window.App = {});
  let cleanup = []; // funções a executar ao sair de uma página (mapas etc.)

  /* ================================================================ tema */
  const applyTheme = (t) => {
    if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
    const dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    $('meta[name="theme-color"]').content = dark ? '#14120f' : '#B5121B';
    M.retheme();
  };
  applyTheme(U.store.get('theme', null));
  const toggleTheme = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    U.store.set('theme', next); applyTheme(next);
  };
  $('#themeBtn').addEventListener('click', toggleTheme);
  $('#themeBtn2').addEventListener('click', () => { toggleTheme(); closeSheet(); });

  /* ================================================================ helpers de UI */
  const KIND_ICON = { visit: '📍', walk: '🚶', train: '🚆', food: '🍜', shop: '🛍️', rest: '☕', flight: '✈️', hotel: '🏨', ticket: '🎟️', opt: '✨' };
  const MODE_ICON = { walk: '🚶', train: '🚆', subway: '🚇', shinkansen: '🚄', bus: '🚌', taxi: '🚕', plane: '✈️' };
  const MODE_NAME = { walk: 'a pé', train: 'trem', subway: 'metrô', shinkansen: 'Shinkansen', bus: 'ônibus', taxi: 'táxi', plane: 'avião' };
  const cityChip = (c) => {
    if (c === 'travel') return '<span class="chip" style="--c:var(--travel)">✈ Viagem</span>';
    const C = window.CITIES[c]; return `<span class="chip city" style="${U.cssCity(c)}"><span class="dot"></span>${esc(C.n)} <span class="jp">${C.jp}</span></span>`;
  };
  const typeChip = (p) => { const t = U.typeOf(p); return `<span class="chip">${t.icon} ${esc(t.label)}</span>`; };
  const dayChip = (id) => {
    const d = U.dayById(id); if (!d) return '';
    const href = id === 'fuji' ? '#/fuji' : '#/dia/' + id;
    return `<a href="${href}" class="chip city" style="${U.cssCity(d.city)}">${esc(U.dayLabel(d))}</a>`;
  };
  const ldDay = () => {
    const today = U.japanToday();
    return DAYS.find((d) => d.date === today);
  };

  function observeReveal(root = main) {
    const els = $$('.reveal', root);
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e, i) => { e.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`; io.observe(e); });
    cleanup.push(() => io.disconnect());
  }

  /* ================================================================ roteador */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    const q = Object.fromEntries(new URLSearchParams(qs || ''));
    return { parts, q };
  }
  function setNav(name) {
    $$('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === name));
  }
  function render() {
    cleanup.forEach((f) => { try { f(); } catch (e) { /* ignora */ } }); cleanup = [];
    closeSheet(); closeSearch();
    const { parts, q } = parseHash();
    const page = parts[0] || 'home';
    let nav = page;
    main.innerHTML = '';
    main.className = 'page-enter';
    void main.offsetWidth;
    if (page === 'home') renderHome();
    else if (page === 'dia') { nav = 'dia'; renderDay(parts[1]); }
    else if (page === 'mapa') renderAllMap(q);
    else if (page === 'glossario') renderGlossary(q);
    else if (page === 'games') renderGames();
    else if (page === 'fuji') { nav = 'fuji'; renderDay('fuji'); }
    else if (page === 'dicas') renderTips();
    else renderHome();
    if (['games', 'fuji', 'dicas'].includes(nav) && innerWidth <= 980) $('#moreBtn').classList.add('active');
    setNav(nav);
    if (!q.keep) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    observeReveal();
    document.title = (main.dataset.title ? main.dataset.title + ' — ' : '') + 'Japão 2026';
  }
  window.addEventListener('hashchange', () => { if (!drawerOpen) render(); else { closeDrawer(true); render(); } });

  /* ================================================================ INÍCIO */
  function renderHome() {
    main.dataset.title = '';
    const walkTotal = DAYS.reduce((s, d) => s + M.legs(d).filter((l) => l.mode === 'walk').reduce((a, l) => a + l.dist, 0), 0);
    const nPlaces = Object.values(PLACES).filter((p) => !['estacao', 'hotel', 'aeroporto'].includes(p.t)).length;
    const nSacred = Object.values(PLACES).filter((p) => p.t === 'templo' || p.t === 'santuario').length;
    const today = ldDay();
    const tripDays = DAYS.filter((d) => d.city !== 'travel');

    // segmentos da linha da viagem
    const segs = [];
    tripDays.forEach((d) => { const last = segs[segs.length - 1]; if (last && last.city === d.city) last.days.push(d); else segs.push({ city: d.city, days: [d] }); });
    const hotelOf = (c) => TRIP.hotels.find((h) => h.city === c);
    const cityPhoto = { tokyo: 'shibuya-crossing', kyoto: 'fushimi-inari', osaka: 'dotonbori' };

    main.innerHTML = `
      <section class="hero">
        <canvas id="heroCanvas" aria-hidden="true"></canvas>
        <div class="hero-sun" aria-hidden="true"></div>
        <div class="hero-waves" aria-hidden="true"></div>
        <div class="hero-kanji" aria-hidden="true">日本の旅</div>
        <div class="wrap">
          <h1><small>${esc(TRIP.travelers)}</small>Japão<br>2026</h1>
          <p class="hero-sub">Tóquio, Kyoto e Osaka em 12 dias — cultura, templos, ruas para andar sem pressa e uma pitada de games.</p>
          <div class="hero-meta">
            <span class="chip">🗓️ 05 → 16 de dezembro</span><span class="chip">🏯 3 cidades</span><span class="chip">🚶 roteiro caminhável</span>
          </div>
          <div class="countdown" id="countdown"></div>
          <div class="hero-cta">
            <a class="btn primary" href="#/dia/${today ? today.id : 'tk1'}">${today ? 'Ver o roteiro de hoje' : 'Ver roteiro dia a dia'} →</a>
            <a class="btn" href="#/mapa">Mapa de tudo</a>
            <a class="btn" href="#/glossario">Glossário</a>
          </div>
        </div>
      </section>

      <div class="wrap">
        <div class="stats">
          <div class="card stat reveal"><b>12</b><span>dias no Japão</span></div>
          <div class="card stat reveal"><b>3</b><span>cidades-base</span></div>
          <div class="card stat reveal"><b>${nPlaces}</b><span>lugares no glossário</span></div>
          <div class="card stat reveal"><b>${(walkTotal / 1000).toFixed(0)} km</b><span>de caminhada mapeada</span></div>
          <div class="card stat reveal"><b>${nSacred}</b><span>templos e santuários</span></div>
        </div>

        <section class="section">
          <div class="section-head reveal"><div><div class="eyebrow">A viagem em uma linha</div><h2 class="h2">De 04 a 16 de dezembro</h2></div>
            <p class="lead" style="max-width:420px">Toque num dia para abrir o roteiro completo, com mapa, horários e atrações.</p></div>
          <div class="card journey reveal">
            <div class="journey-track">
              <div class="j-flight"><div><b>✈️</b>04/12<br>Saída do Brasil</div></div>
              ${segs.map((s) => `
                <div class="j-seg" style="${U.cssCity(s.city)};--n:${s.days.length}">
                  <h4>${esc(window.CITIES[s.city].n)} <span class="jp">${window.CITIES[s.city].jp}</span></h4>
                  <div class="j-days">${s.days.map((d) => `
                    <a class="j-day ${today && today.id === d.id ? 'today' : ''}" href="#/dia/${d.id}" style="${U.cssCity(d.city)}" title="${esc(d.title)}">
                      <small>${U.weekdayShort(d.date)}</small><b>${U.dayNum(d.date)}</b><em>${esc(d.n)}</em></a>`).join('')}
                  </div>
                </div>`).join('')}
              <div class="j-flight"><div><b>🛫</b>16/12 · 20h<br>Volta (KIX)</div></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head reveal"><div><div class="eyebrow">Hospedagem</div><h2 class="h2">Nossas três bases</h2></div></div>
          <div class="grid cities">
            ${TRIP.hotels.map((h) => {
              const C = window.CITIES[h.city], p = PLACES[h.p];
              const days = DAYS.filter((d) => d.city === h.city);
              return `<article class="card city-card reveal" style="${U.cssCity(h.city)}">
                <div class="city-photo">${U.img(cityPhoto[h.city], '', C.n)}
                  <span class="city-nights">${h.nights} noites</span>
                  <div class="city-name"><h3>${esc(C.n)}</h3><span>${C.jp} · ${U.fmtDate(h.from)} → ${U.fmtDate(h.to)}</span></div></div>
                <div class="city-body">
                  <div class="hotel-line"><span class="ic">🏨</span><div><b>${esc(p.n)}</b><small>${esc((p.tip || '').split('.')[0].replace('Endereço: ', ''))}</small></div></div>
                  <div class="city-days">${days.map((d) => dayChip(d.id)).join('')}</div>
                  <div class="city-actions">
                    <button class="btn sm" data-open="p:${h.p}">Sobre o hotel</button>
                    <a class="btn sm" href="${U.gmPlace(h.p)}" target="_blank" rel="noopener">Google Maps ↗</a>
                  </div>
                </div></article>`;
            }).join('')}
          </div>
        </section>

        <section class="section">
          <div class="section-head reveal"><div><div class="eyebrow">Horários fixos</div><h2 class="h2">Reservas e compromissos</h2></div></div>
          <div class="grid bookings">
            ${TRIP.bookings.map((b) => `
              <a class="card booking reveal" href="#/dia/${b.day}">
                <span class="ic">${KIND_ICON[b.k] || '📌'}</span>
                <div><b>${esc(b.t)} ${b.ok ? '<span class="badge ok">ok</span>' : '<span class="badge todo">a reservar</span>'}</b>
                <div class="d">${esc(b.d)}</div><div class="n">${esc(b.note || '')}</div></div>
              </a>`).join('')}
          </div>
        </section>

        <section class="section">
          <div class="section-head reveal"><div><div class="eyebrow">Panorama</div><h2 class="h2">O caminho pelo Japão</h2></div>
            <a class="btn sm" href="#/fuji">🗻 Monte Fuji: Plano B</a></div>
          <div class="overview-map reveal" id="ovMap"></div>
        </section>

        <section class="section">
          <div class="card quote reveal">${esc(TRIP.philosophy)}</div>
        </section>
        ${footer()}
      </div>`;

    const ov = M.overviewMap($('#ovMap'));
    cleanup.push(() => ov.remove());
    startCountdown();
    startHeroCanvas();
  }

  function startCountdown() {
    const el = $('#countdown'); if (!el) return;
    const target = new Date(TRIP.arrival).getTime();
    const end = new Date('2026-12-16T20:00:00+09:00').getTime();
    const tick = () => {
      const now = Date.now();
      if (now < target) {
        let s = Math.floor((target - now) / 1000);
        const d = Math.floor(s / 86400); s %= 86400; const h = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60); s %= 60;
        el.innerHTML = `<div class="cd-label">Faltam para pousar no Japão</div>` +
          [[d, 'dias'], [h, 'horas'], [m, 'min'], [s, 'seg']].map(([v, l]) => `<div class="cd-box"><b>${String(v).padStart(2, '0')}</b><span>${l}</span></div>`).join('');
      } else if (now < end) {
        const t = ldDay();
        el.innerHTML = `<div class="cd-box" style="text-align:left;padding:14px 18px"><b style="font-size:22px">🇯🇵 Estamos no Japão!</b><span>${t ? 'Hoje: ' + esc(t.title) : ''}</span></div>`;
      } else el.innerHTML = `<div class="cd-box" style="text-align:left;padding:14px 18px"><b style="font-size:22px">おかえり — bem-vindos de volta!</b></div>`;
    };
    tick(); const iv = setInterval(tick, 1000); cleanup.push(() => clearInterval(iv));
  }

  function startHeroCanvas() {
    const cv = $('#heroCanvas'); if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d'); let W, H, raf; const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); addEventListener('resize', resize);
    const N = Math.round(Math.min(60, W / 18));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 5, vy: 0.25 + Math.random() * 0.6, vx: -0.2 + Math.random() * 0.4,
      a: Math.random() * Math.PI * 2, va: -0.02 + Math.random() * 0.04, leaf: Math.random() < 0.45,
      c: ['#ff7a59', '#e8432f', '#f2a04d', '#ffd1c2'][Math.floor(Math.random() * 4)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y += p.vy; p.x += p.vx + Math.sin(p.a) * 0.3; p.a += p.va;
        if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        if (p.leaf) { // folha de momiji estilizada
          ctx.fillStyle = p.c; ctx.globalAlpha = 0.55; ctx.beginPath();
          for (let i = 0; i < 5; i++) { const ang = (i / 5) * Math.PI * 2 - Math.PI / 2; ctx.lineTo(Math.cos(ang) * p.r * 1.6, Math.sin(ang) * p.r * 1.6); ctx.lineTo(Math.cos(ang + Math.PI / 5) * p.r * 0.6, Math.sin(ang + Math.PI / 5) * p.r * 0.6); }
          ctx.closePath(); ctx.fill();
        } else { ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(0, 0, p.r * 0.45, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    cleanup.push(() => { cancelAnimationFrame(raf); removeEventListener('resize', resize); });
  }

  /* ================================================================ DIA */
  function daystrip(activeId) {
    const today = ldDay();
    const all = [...DAYS, window.PLAN_B];
    return `<div class="daystrip-wrap"><nav class="daystrip" id="daystrip" aria-label="Dias da viagem">
      ${all.map((d) => {
        const href = d.id === 'fuji' ? '#/fuji' : '#/dia/' + d.id;
        const num = d.date ? `<b>${U.dayNum(d.date)}</b><small>${U.weekdayShort(d.date)}</small>` : '<b>🗻</b>';
        return `<a href="${href}" class="ds-day ${d.id === activeId ? 'active' : ''} ${today && today.id === d.id ? 'today' : ''}" style="${U.cssCity(d.city)}" ${d.id === activeId ? 'aria-current="page"' : ''}>
          <span class="num">${num}</span><span class="lbl">${esc(d.n)}<small>${esc(d.sub || d.title)}</small></span></a>`;
      }).join('')}
    </nav></div>`;
  }

  function renderDay(id) {
    if (!id) { const t = ldDay(); id = t ? t.id : 'tk1'; history.replaceState(null, '', '#/dia/' + id); }
    const day = U.dayById(id);
    if (!day) { location.hash = '#/dia/tk1'; return; }
    const idx = DAYS.indexOf(day);
    const prev = idx > 0 ? DAYS[idx - 1] : null, next = idx >= 0 && idx < DAYS.length - 1 ? DAYS[idx + 1] : null;
    main.dataset.title = day.title;
    const c = day.city;
    const hotel = TRIP.hotels.find((h) => h.city === (c === 'fuji' ? 'tokyo' : c));
    const ref = hotel ? PLACES[hotel.p].ll : [35.68, 139.76];
    const sun = day.date ? U.sunTimes(day.date, ref[0], ref[1]) : null;
    const clim = window.INFO.climate.find((x) => x.city === (c === 'fuji' ? 'tokyo' : c));
    const legs = M.legs(day);
    const walk = legs.filter((l) => l.mode === 'walk');
    const walkDist = walk.reduce((s, l) => s + l.dist, 0), walkMin = walk.reduce((s, l) => s + l.min, 0);
    const transit = legs.filter((l) => l.mode !== 'walk');
    const routeIds = (day.route || []).map((r) => r.p);

    const header = `
      <header class="card day-head" style="${U.cssCity(c)}">
        <div class="date-big">${day.date ? `<b>${U.dayNum(day.date)}/12</b><span>${U.fmtLong(day.date)}</span>` : `<b>🗻</b><span>Plano B — sem data definida</span>`}</div>
        <h1>${esc(day.title)}</h1>
        <p class="sub">${esc(day.sub || '')}</p>
        <div class="day-chips">${cityChip(c)}${day.status ? `<span class="chip">${/confirm/i.test(day.status) ? '✅' : '📝'} ${esc(day.status)}</span>` : ''}</div>
        ${day.compact ? '' : `<div class="day-facts">
          ${day.theme ? `<div class="fact"><small>Tema</small><span>${esc(day.theme)}</span></div>` : ''}
          ${day.axis ? `<div class="fact"><small>Eixo</small><span>${U.linkify(day.axis)}</span></div>` : ''}
          ${day.pace ? `<div class="fact"><small>Ritmo</small><span>${esc(day.pace)}</span></div>` : ''}
        </div>`}
        <p class="day-intro">${U.linkify(day.intro)}</p>
        ${day.alert ? `<div class="alert"><span class="ic">${KIND_ICON[day.alert.k] || '⚠️'}</span><div><b>${esc(day.alert.t)}</b><p>${U.linkify(day.alert.d)}</p></div></div>` : ''}
        ${sun ? `<div class="sun-row"><span>🌅 Nascer ${sun.rise}</span><span>🌇 Pôr do sol ${sun.set}</span>${clim ? `<span>🌡️ típico ${clim.min}–${clim.max} °C</span>` : ''}<span class="wx" id="wx"></span></div>` : ''}
      </header>`;

    // trechos do mapa cobertos por cada item da linha do tempo
    const segs = (day.route || []).length ? M.segments(day) : (day.schedule || []).map(() => ({ legs: [] }));
    const legByIdx = Object.fromEntries(legs.map((l) => [l.i, l]));
    const moveSummary = (seg) => {
      if (seg.off) return '<div class="tl-move off">↪ Desvio opcional, fora da rota do dia</div>';
      const ls = seg.legs.map((i) => legByIdx[i]).filter(Boolean);
      if (!ls.length) return '<div class="tl-move none">📍 Sem deslocamento — acontece no mesmo lugar</div>';
      const walkD = ls.filter((l) => l.mode === 'walk').reduce((a, l) => a + l.dist, 0);
      const walkM = ls.filter((l) => l.mode === 'walk').reduce((a, l) => a + l.min, 0);
      const parts = [];
      ls.forEach((l) => {
        if (l.mode === 'walk') { if (!parts.includes('walk')) parts.push('walk'); }
        else parts.push(l);
      });
      return `<div class="tl-move">${parts.map((x) => x === 'walk'
        ? `<span class="mv walk">🚶 ${U.fmtDist(walkD)} · ~${U.fmtMin(walkM)}</span>`
        : `<span class="mv">${MODE_ICON[x.mode] || '🚆'} ${esc(x.line || MODE_NAME[x.mode])}${x.min ? ' · ~' + U.fmtMin(x.min) : ''}</span>`).join('<i>→</i>')}
        <span class="mv-hint">ver no mapa ›</span></div>`;
    };
    const timeline = `
      <section class="block">
        <div class="block-title"><h2>🕘 Linha do tempo <span class="jp">予定</span></h2>
          ${(day.route || []).length ? '<button class="btn sm" id="tlAll" hidden>Ver o dia inteiro no mapa</button>' : ''}</div>
        ${(day.route || []).length ? '<p class="muted tl-tip">Toque num item para destacar no mapa só aquele trecho.</p>' : ''}
        <ol class="timeline" style="${U.cssCity(c)}">
          ${(day.schedule || []).map((s, idx) => {
            const p = s.p && PLACES[s.p];
            const seg = segs[idx] || { legs: [] };
            const can = (day.route || []).length > 0;
            return `<li class="tl-item ${s.k || ''} ${seg.legs.length ? 'moves' : 'still'} reveal">
              <div class="tl-icon">${KIND_ICON[s.k] || '•'}</div>
              <div class="tl-card ${can ? 'clickable' : ''}" ${can ? `data-step="${idx}" tabindex="0" role="button" aria-pressed="false"` : ''}>
                <div class="tl-time">${esc(s.h)}</div>
                <h3>${esc(s.t)}</h3>
                ${s.d ? `<p>${U.linkify(s.d, { skip: p ? ['p:' + s.p] : [] })}</p>` : ''}
                ${p ? `<span class="tl-place" data-open="p:${s.p}">${U.photo(s.p) ? `<img src="${esc(U.photo(s.p).url)}" alt="" loading="lazy">` : `<span class="ph">${U.typeOf(p).icon}</span>`}${esc(p.n)} ›</span>` : ''}
                ${can ? moveSummary(seg) : ''}
              </div></li>`;
          }).join('')}
        </ol>
      </section>`;

    const legsHtml = legs.length ? `
      <section class="block">
        <div class="block-title"><h2>🧭 Trajetos e distâncias</h2>
          ${routeIds.length > 1 ? `<a class="btn sm" href="${U.gmRoute(routeIds.filter((x, i, a) => PLACES[x].t !== 'estacao' || i === 0 || i === a.length - 1))}" target="_blank" rel="noopener">Rota no Google Maps ↗</a>` : ''}</div>
        <div class="card" style="${U.cssCity(c)}">
          <div class="leg-summary">
            <div><b>${U.fmtDist(walkDist)}</b>a pé (entre paradas)</div>
            <div><b>~${U.fmtMin(walkMin)}</b>caminhando</div>
            <div><b>${transit.length}</b>trechos de transporte</div>
          </div>
          <ol class="legs">
            ${legs.map((l) => {
              const a = PLACES[l.from], b = PLACES[l.to];
              const detail = l.mode === 'walk'
                ? `${U.fmtDist(l.dist)} · ~${U.fmtMin(l.min)} a pé`
                : `${MODE_NAME[l.mode]}${l.line ? ' — ' + esc(l.line) : ''}${l.min ? ' · ~' + U.fmtMin(l.min) : ''}${l.dist ? ' · ' + U.fmtDist(l.dist) : ''}`;
              return `<li class="leg ${l.mode}" data-leg="${l.i}" tabindex="0" role="button" title="Destacar este trecho no mapa"><span class="m">${MODE_ICON[l.mode] || '•'}</span>
                <div class="ft">${esc(a.n)} → ${esc(b.n)}<small>${detail}</small></div>
                <a class="gm" href="${U.gmDir(l.from, l.to, l.mode)}" target="_blank" rel="noopener" title="Abrir este trecho no Google Maps">Maps ↗</a></li>`;
            }).join('')}
          </ol>
        </div>
        <p class="muted" style="font-size:12.5px;margin-top:8px">Distâncias a pé calculadas sobre as ruas reais (OpenStreetMap). Para trens, confira horários em tempo real no Google Maps.</p>
      </section>` : '';

    const spots = (day.spots || []).length ? `
      <section class="block">
        <div class="block-title"><h2>⛩️ Atrações e pontos do dia</h2></div>
        <div class="grid spots">
          ${day.spots.map((s) => { const p = PLACES[s.p]; if (!p) return ''; return `
            <button type="button" class="card spot reveal" data-open="p:${s.p}" style="${U.cssCity(p.c)}">
              <div class="spot-photo">${U.img(s.p)}<span class="type">${U.typeOf(p).icon} ${esc(U.typeOf(p).label)}</span></div>
              <div class="spot-body"><h3>${esc(p.n)}</h3><span class="jp">${esc(p.jp || '')}</span>${U.stars(s.s)}<p>${esc(s.why)}</p></div>
            </button>`; }).join('')}
        </div>
      </section>` : '';

    const callouts = (day.logic || day.notes || day.food) ? `
      <section class="block"><div class="grid callouts" style="${U.cssCity(c)}">
        ${day.logic ? `<div class="card callout reveal"><h3>🧭 Lógica do dia</h3><p>${U.linkify(day.logic)}</p></div>` : ''}
        ${day.food ? `<div class="card callout reveal"><h3>🍜 Para comer</h3><p>${U.linkify(day.food)}</p></div>` : ''}
        ${day.notes ? `<div class="card callout reveal"><h3>📝 Observações</h3><p>${U.linkify(day.notes)}</p></div>` : ''}
      </div></section>` : '';

    const fujiExtra = day.id === 'fuji' ? `
      <section class="block"><div class="block-title"><h2>🌤️ Previsão de nuvens em Kawaguchiko</h2></div>
        <div id="fujiFc" class="forecast"><p class="muted">Carregando previsão…</p></div>
        <p class="muted" style="font-size:12.5px;margin-top:8px">Média de nebulosidade entre 6h e 12h (horário do Japão). Abaixo de ~30% = boa chance de ver o Fuji. Fonte: Open-Meteo.</p></section>
      <section class="block"><div class="block-title"><h2>🔁 Como encaixar no roteiro</h2></div>
        <div class="swap-list">${day.swap.map((s) => `<div class="card swap reveal"><span>📅</span><div><b>${esc(s.when)}</b><p>${U.linkify(s.how)}</p></div></div>`).join('')}</div>
        <div class="card verdict reveal" style="margin-top:12px">${U.linkify(day.verdict)}</div>
        <div class="dr-actions">${day.links.map((l) => `<a class="btn sm" href="${l.u}" target="_blank" rel="noopener">${esc(l.t)} ↗</a>`).join('')}</div>
      </section>` : '';

    const nav = day.id === 'fuji' ? '' : `<nav class="day-nav">
        ${prev ? `<a class="card" href="#/dia/${prev.id}"><small>← Anterior</small><b>${esc(prev.title)}</b></a>` : '<span></span>'}
        ${next ? `<a class="card next" href="#/dia/${next.id}"><small>Próximo →</small><b>${esc(next.title)}</b></a>` : '<span></span>'}
      </nav>`;

    const hasMap = (day.route || []).length > 0;
    const zones = hasMap ? M.zones(day) : [];
    const side = hasMap ? `
      <aside class="day-side" id="daySide" style="${U.cssCity(c)}">
        <div class="map-tools">
          ${zones.map((z, i) => z.name ? `<button class="zone-chip" data-zone="${i}"><i></i>${esc(z.name)}</button>` : '').join('')}
          <button class="zone-chip all-chip" id="mapAll" hidden>↺ Dia inteiro</button>
          <button class="zone-chip map-toggle" id="mapToggle">▾ Ocultar mapa</button>
        </div>
        <div class="day-map" id="dayMap"></div>
        <div class="map-legend"><span><i class="lg-walk"></i>a pé (rota real)</span><span><i class="lg-train"></i>trem / metrô / ônibus</span><span><i class="lg-zone"></i>área explorada a pé</span><span>🏨 hotel · 🚉 estação</span></div>
      </aside>` : '';

    main.innerHTML = daystrip(day.id) + `
      <div class="wrap"><div class="day-layout" ${hasMap ? '' : 'style="grid-template-columns:1fr"'}>
        <div class="day-main">${header}${timeline}${fujiExtra}${legsHtml}${spots}${callouts}${nav}</div>
        ${side}
      </div></div>` + `<div class="wrap">${footer()}</div>`;

    // rolar a faixa de dias até o dia ativo
    const act = $('#daystrip .active'); if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });

    if (hasMap) {
      const dm = M.dayMap($('#dayMap'), day);
      App.dayMap = dm;
      cleanup.push(() => { dm.map.remove(); App.dayMap = null; document.body.style.overflow = ''; });
      $$('[data-zone]').forEach((b) => b.addEventListener('click', () => { if (dm.isHighlighted()) { $$('.tl-card.sel, .leg.sel').forEach((x) => x.classList.remove('sel')); dm.clearHighlight(false); const a = $('#tlAll'); if (a) a.hidden = true; const m = $('#mapAll'); if (m) m.hidden = true; } dm.fitZone(+b.dataset.zone); }));
      // clicar num item da linha do tempo (ou num trecho) destaca só aquele pedaço do mapa
      const showMap = () => {
        const side = $('#daySide');
        if (side.classList.contains('collapsed')) {
          side.classList.remove('collapsed'); $('#mapToggle').textContent = '▾ Ocultar mapa';
          setTimeout(() => dm.map.invalidateSize(), 380);
        }
        const r = $('#dayMap').getBoundingClientRect();
        if (r.bottom < 80 || r.top > innerHeight - 80) side.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      const markSel = (el) => {
        $$('.tl-card.sel, .leg.sel').forEach((x) => { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
        if (el) { el.classList.add('sel'); el.setAttribute('aria-pressed', 'true'); }
        const all = $('#tlAll'); if (all) all.hidden = !el;
        const ch = $('#mapAll'); if (ch) ch.hidden = !el;
      };
      App.clearStep = () => { markSel(null); dm.clearHighlight(true); };
      const selectStep = (el) => {
        if (el.classList.contains('sel')) { App.clearStep(); return; }
        const seg = segs[+el.dataset.step];
        const s = day.schedule[+el.dataset.step];
        markSel(el);
        dm.highlight(seg.legs, [s.p, seg.at]);
        showMap();
      };
      $$('[data-step]').forEach((el) => {
        el.addEventListener('click', (e) => { if (e.target.closest('.gl, [data-open], a')) return; selectStep(el); });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectStep(el); } });
      });
      $$('[data-leg]').forEach((el) => {
        const go = () => {
          if (el.classList.contains('sel')) { App.clearStep(); return; }
          markSel(el); dm.highlight([+el.dataset.leg], []); showMap();
        };
        el.addEventListener('click', (e) => { if (e.target.closest('a')) return; go(); });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
      });
      [$('#tlAll'), $('#mapAll')].forEach((b) => b && b.addEventListener('click', () => App.clearStep()));
      cleanup.push(() => { App.clearStep = null; });
      const tg = $('#mapToggle');
      if (tg) {
        if (U.store.get('mapCollapsed', false) && innerWidth <= 1100) { $('#daySide').classList.add('collapsed'); tg.textContent = '▸ Mostrar mapa'; }
        tg.addEventListener('click', () => {
          const s = $('#daySide'); s.classList.toggle('collapsed');
          const col = s.classList.contains('collapsed'); U.store.set('mapCollapsed', col);
          tg.textContent = col ? '▸ Mostrar mapa' : '▾ Ocultar mapa';
          setTimeout(() => { dm.map.invalidateSize(); if (!col) dm.fitDefault(); }, 380);
        });
      }
    }
    if (day.date) loadForecast(day, ref);
    if (day.id === 'fuji') loadFujiForecast();
  }

  /* -------------------------------------------------- previsão do tempo (Open-Meteo, sem chave) */
  const WMO = (c) => (c === 0 ? ['☀️', 'Céu limpo'] : c <= 2 ? ['🌤️', 'Poucas nuvens'] : c === 3 ? ['☁️', 'Nublado'] : c <= 48 ? ['🌫️', 'Neblina'] : c <= 67 ? ['🌧️', 'Chuva'] : c <= 77 ? ['🌨️', 'Neve'] : c <= 82 ? ['🌦️', 'Pancadas'] : ['⛈️', 'Tempestade']);
  async function loadForecast(day, ll) {
    const diff = (U.parseDate(day.date) - U.parseDate(U.japanToday())) / 864e5;
    if (diff < 0 || diff > 15) return;
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ll[0]}&longitude=${ll[1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`);
      const j = await r.json(); const i = j.daily.time.indexOf(day.date); if (i < 0) return;
      const [ic, label] = WMO(j.daily.weather_code[i]);
      const el = $('#wx'); if (el) el.textContent = `${ic} Previsão: ${label}, ${Math.round(j.daily.temperature_2m_min[i])}–${Math.round(j.daily.temperature_2m_max[i])} °C · chuva ${j.daily.precipitation_probability_max[i] ?? '–'}%`;
    } catch (e) { /* offline */ }
  }
  async function loadFujiForecast() {
    const box = $('#fujiFc'); if (!box) return;
    const ll = PLACES['kawaguchiko'].ll;
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ll[0]}&longitude=${ll[1]}&hourly=cloud_cover&daily=weather_code&timezone=Asia%2FTokyo&forecast_days=10`);
      const j = await r.json();
      const days = j.daily.time.map((t, k) => {
        const hrs = j.hourly.time.map((h, i) => [h, j.hourly.cloud_cover[i]]).filter(([h]) => h.startsWith(t) && +h.slice(11, 13) >= 6 && +h.slice(11, 13) <= 12);
        const avg = hrs.reduce((s, [, v]) => s + v, 0) / (hrs.length || 1);
        return { t, avg, code: j.daily.weather_code[k] };
      });
      box.innerHTML = days.map((d) => `<div class="fc ${d.avg < 30 ? 'good' : ''}"><small>${U.weekdayShort(d.t)} ${U.dayNum(d.t)}/${d.t.slice(5, 7)}</small><div class="ic">${d.avg < 30 ? '🗻' : WMO(d.code)[0]}</div><b>${Math.round(d.avg)}% nuvens</b></div>`).join('');
    } catch (e) { box.innerHTML = '<p class="muted">Sem conexão para carregar a previsão agora.</p>'; }
  }

  /* ================================================================ MAPA GERAL */
  function renderAllMap(q) {
    main.dataset.title = 'Mapa';
    const st = { city: q.city || 'all', kind: 'sights', q: '', near: null };
    main.innerHTML = `
      <div class="mapall">
        <aside class="mapall-side">
          <div class="mapall-filters">
            <input class="input" id="mapQ" type="search" placeholder="Filtrar lugares…">
            <div class="filters" id="cityF">
              <button class="filter on" data-c="all">Todas</button>
              ${Object.entries(window.CITIES).map(([k, v]) => `<button class="filter city-f" data-c="${k}" style="--c:${v.color}">${esc(k === 'fuji' ? 'Fuji' : v.n)}</button>`).join('')}
            </div>
            <div class="filters" id="kindF">
              <button class="filter on" data-k="sights">Atrações</button>
              <button class="filter" data-k="games">🎮 Games</button>
              <button class="filter" data-k="food">🍢 Comida & noite</button>
              <button class="filter" data-k="logistics">🏨 Hotéis & estações</button>
              <button class="filter" data-k="all">Tudo</button>
            </div>
            <button class="btn sm" id="nearBtn">📍 Ordenar por proximidade</button>
          </div>
          <div class="mapall-list" id="mapList"></div>
        </aside>
        <div class="mapall-map" id="allMap"></div>
      </div>`;
    const am = M.allMap($('#allMap'));
    cleanup.push(() => am.map.remove());
    const kindOk = (p) => ({
      sights: !['estacao', 'hotel', 'aeroporto'].includes(p.t),
      games: p.t === 'games',
      food: ['mercado', 'noite'].includes(p.t),
      logistics: ['estacao', 'hotel', 'aeroporto'].includes(p.t),
      all: true,
    })[st.kind];
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    function update(fit = true) {
      let ids = Object.keys(PLACES).filter((id) => {
        const p = PLACES[id];
        return (st.city === 'all' || p.c === st.city) && kindOk(p) && (!st.q || norm(p.n + ' ' + (p.jp || '') + ' ' + (p.aka || []).join(' ')).includes(norm(st.q)));
      });
      if (st.near) ids.sort((a, b) => U.haversine(st.near, PLACES[a].ll) - U.haversine(st.near, PLACES[b].ll));
      else ids.sort((a, b) => PLACES[a].n.localeCompare(PLACES[b].n, 'pt'));
      am.render(ids);
      if (fit && ids.length) am.fit(ids);
      $('#mapList').innerHTML = ids.length ? ids.map((id) => {
        const p = PLACES[id]; const d = st.near ? U.haversine(st.near, p.ll) : null;
        return `<button class="pl-item" data-id="${id}" style="${U.cssCity(p.c)}">${U.photo(id) ? `<img src="${esc(U.photo(id).url)}" alt="" loading="lazy">` : `<span class="ph">${U.typeOf(p).icon}</span>`}
          <span><b>${esc(p.n)}</b><small>${U.typeOf(p).icon} ${esc(U.typeOf(p).label)} · ${esc(U.city(p.c).n)}</small></span>${d != null ? `<span class="dist">${U.fmtDist(d)}</span>` : ''}</button>`;
      }).join('') : '<p class="empty">Nada encontrado.</p>';
    }
    $('#mapList').addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) { am.focus(b.dataset.id); if (innerWidth <= 980) window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    $('#cityF').addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (!b) return; st.city = b.dataset.c; $$('#cityF .filter').forEach((x) => x.classList.toggle('on', x === b)); update(); });
    $('#kindF').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (!b) return; st.kind = b.dataset.k; $$('#kindF .filter').forEach((x) => x.classList.toggle('on', x === b)); update(); });
    $('#mapQ').addEventListener('input', (e) => { st.q = e.target.value; update(false); });
    $('#nearBtn').addEventListener('click', () => M.locate(am.map));
    App.onLocate = (ll) => { st.near = ll; update(false); U.toast('Lista ordenada pela distância até você'); };
    cleanup.push(() => { App.onLocate = null; });
    if (q.city) $$('#cityF .filter').forEach((x) => x.classList.toggle('on', x.dataset.c === q.city));
    if (q.focus && PLACES[q.focus]) { st.kind = 'all'; $$('#kindF .filter').forEach((x) => x.classList.toggle('on', x.dataset.k === 'all')); update(false); am.focus(q.focus); }
    else update();
  }

  /* ================================================================ GLOSSÁRIO */
  function renderGlossary(q) {
    main.dataset.title = 'Glossário';
    const st = { tab: q.tab || U.store.get('glossTab', 'lugares'), q: q.q || '', f: 'all', city: 'all' };
    main.innerHTML = `<div class="wrap">
      <section class="page-hero"><div class="eyebrow">Glossário · 用語集</div><h1>O que é cada coisa?</h1>
        <p>Todos os lugares do roteiro — bairros, templos, santuários, ruas, mercados — e os termos culturais que aparecem pelo caminho. Toque em qualquer card para ver foto, explicação e em que dia ele aparece. Dica: em todo o app, palavras <span class="gl" style="cursor:default">sublinhadas</span> abrem este glossário.</p></section>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:18px">
        <div class="gloss-tabs" role="tablist"><button data-tab="lugares">📍 Lugares (${Object.keys(PLACES).length})</button><button data-tab="termos">🎎 Cultura & termos (${Object.keys(TERMS).length})</button></div>
        <input class="input" id="gq" type="search" placeholder="Buscar… (ex.: santuário, Gion, ramen, torii)" value="${esc(st.q)}" style="max-width:520px">
        <div class="filters" id="gf"></div>
        <div class="filters" id="gc"></div>
      </div>
      <div class="grid gloss-grid" id="gg" style="margin-top:20px"></div>
      ${footer()}</div>`;
    const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    function filtersHtml() {
      if (st.tab === 'lugares') {
        const types = [...new Set(Object.values(PLACES).map((p) => p.t))];
        $('#gf').innerHTML = `<button class="filter ${st.f === 'all' ? 'on' : ''}" data-f="all">Todos</button>` + types.map((t) => `<button class="filter ${st.f === t ? 'on' : ''}" data-f="${t}">${window.TYPES[t].icon} ${esc(window.TYPES[t].label)}</button>`).join('');
        $('#gc').innerHTML = `<button class="filter ${st.city === 'all' ? 'on' : ''}" data-city="all">Todas as cidades</button>` + Object.entries(window.CITIES).map(([k, v]) => `<button class="filter city-f ${st.city === k ? 'on' : ''}" data-city="${k}" style="--c:${v.color}">${esc(k === 'fuji' ? 'Fuji' : v.n)}</button>`).join('');
      } else {
        $('#gf').innerHTML = `<button class="filter ${st.f === 'all' ? 'on' : ''}" data-f="all">Todos</button>` + Object.entries(window.TERM_CATS).map(([k, v]) => `<button class="filter ${st.f === k ? 'on' : ''}" data-f="${k}">${v.icon} ${esc(v.label)}</button>`).join('');
        $('#gc').innerHTML = '';
      }
      $$('.gloss-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === st.tab));
    }
    function grid() {
      const isP = st.tab === 'lugares';
      const src = isP ? PLACES : TERMS;
      let ids = Object.keys(src).filter((id) => {
        const x = src[id];
        if (isP && st.f !== 'all' && x.t !== st.f) return false;
        if (isP && st.city !== 'all' && x.c !== st.city) return false;
        if (!isP && st.f !== 'all' && x.cat !== st.f) return false;
        if (st.q) return norm([x.n, x.jp, x.d, ...(x.aka || [])].join(' ')).includes(norm(st.q));
        return true;
      }).sort((a, b) => norm(src[a].n).localeCompare(norm(src[b].n)));
      let last = '';
      $('#gg').innerHTML = ids.length ? ids.map((id) => {
        const x = src[id]; const key = (isP ? 'p:' : 't:') + id;
        const L0 = norm(x.n)[0].toUpperCase(); const head = !st.q && L0 !== last ? `<div class="letter">${(last = L0)}</div>` : '';
        const meta = isP ? `${typeChip(x)}${cityChip(x.c)}` : `<span class="chip">${window.TERM_CATS[x.cat].icon} ${esc(window.TERM_CATS[x.cat].label)}</span>`;
        return head + `<button type="button" class="card g-card reveal in" data-open="${key}" style="${isP ? U.cssCity(x.c) : ''}">
          <div class="g-photo">${U.img(isP ? id : 't:' + id)}</div>
          <div class="g-body"><b>${esc(x.n)}</b><span class="jp">${esc(x.jp || '')}</span><div class="meta">${meta}</div><p>${esc(x.d)}</p></div></button>`;
      }).join('') : '<p class="empty">Nada encontrado para essa busca.</p>';
    }
    filtersHtml(); grid();
    $('.gloss-tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-tab]'); if (!b) return; st.tab = b.dataset.tab; st.f = 'all'; st.city = 'all'; U.store.set('glossTab', st.tab); filtersHtml(); grid(); });
    $('#gf').addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (!b) return; st.f = b.dataset.f; filtersHtml(); grid(); });
    $('#gc').addEventListener('click', (e) => { const b = e.target.closest('[data-city]'); if (!b) return; st.city = b.dataset.city; filtersHtml(); grid(); });
    $('#gq').addEventListener('input', (e) => { st.q = e.target.value; grid(); });
  }

  /* ================================================================ GAMES */
  function renderGames() {
    main.dataset.title = 'Games & anime';
    const ids = Object.keys(PLACES).filter((id) => PLACES[id].t === 'games' || ['akihabara', 'den-den-town', 'nintendo-museum', 'shinsekai'].includes(id));
    const byCity = {}; ids.forEach((id) => (byCity[PLACES[id].c] = byCity[PLACES[id].c] || []).push(id));
    main.innerHTML = `<div class="wrap">
      <section class="page-hero"><div class="eyebrow">Extra · ゲーム</div><h1>Games, anime & Nintendo</h1>
        <p>O foco da viagem é a cultura — mas estes são os lugares de games, anime e lojas oficiais (Nintendo, Pokémon, Capcom, Square Enix…) que cabem no roteiro <b>sem desvio</b>. Cada um mostra o dia em que já está no caminho.</p></section>
      ${['tokyo', 'kyoto', 'osaka'].map((c) => byCity[c] ? `<section class="games-city" style="${U.cssCity(c)}"><h2>${esc(window.CITIES[c].n)} <span class="jp">${window.CITIES[c].jp}</span></h2>
        <div class="grid" style="margin-top:12px">${byCity[c].map((id) => { const p = PLACES[id]; return `
          <button type="button" class="card game-row reveal" data-open="p:${id}"><div class="gp">${U.img(id)}</div>
            <div><b>${esc(p.n)}</b><p>${esc(p.d)}</p><div class="meta">${U.placeDays(id).map(dayChip).join('') || '<span class="chip">Fora do roteiro</span>'}</div></div></button>`; }).join('')}</div></section>` : '').join('')}
      ${footer()}</div>`;
  }

  /* ================================================================ DICAS */
  function renderTips() {
    main.dataset.title = 'Dicas';
    const I = window.INFO; const done = U.store.get('todo', {});
    TODO.forEach((t) => { if (done[t.id] === undefined && t.done) done[t.id] = true; });
    const pct = () => Math.round((TODO.filter((t) => done[t.id]).length / TODO.length) * 100);
    main.innerHTML = `<div class="wrap">
      <section class="page-hero"><div class="eyebrow">Guia prático · 旅のヒント</div><h1>Dicas, frases e pendências</h1>
        <p>O essencial para não passar aperto: entrada no país, dinheiro, clima, etiqueta, transporte e frases úteis (toque numa frase para ouvir a pronúncia).</p></section>

      <section class="section"><div class="section-head"><div><div class="eyebrow">Planejamento</div><h2 class="h2">Pendências</h2></div>
        <div style="min-width:220px"><span class="muted" id="pctTxt">${pct()}% concluído</span><div class="progress"><i id="pctBar" style="width:${pct()}%"></i></div></div></div>
        <div class="card"><ul class="todo-list" id="todo">
          ${TODO.map((t) => { const d = t.day && U.dayById(t.day); return `<li class="${done[t.id] ? 'done' : ''}" style="${d ? U.cssCity(d.city) : ''}"><input type="checkbox" id="td-${t.id}" data-id="${t.id}" ${done[t.id] ? 'checked' : ''}><label for="td-${t.id}">${esc(t.t)}</label>${d ? `<a href="#/dia/${d.id}">${esc(U.dayLabel(d))} →</a>` : t.link ? `<a href="${t.link}">ver →</a>` : ''}</li>`; }).join('')}
        </ul></div>
        <p class="muted" style="font-size:12.5px;margin-top:8px">As marcações ficam salvas neste aparelho.</p></section>

      <section class="section"><div class="section-head"><div><div class="eyebrow">Dezembro</div><h2 class="h2">Clima esperado</h2></div></div>
        <div class="grid climate">${I.climate.map((x) => `<div class="card clim reveal" style="${U.cssCity(x.city)}"><span class="chip city" style="${U.cssCity(x.city)}">${esc(window.CITIES[x.city].n)}</span><div style="margin-top:10px"><b>${x.min}° – ${x.max}°C</b></div><div class="bar"></div><p class="muted" style="font-size:13.5px">${esc(x.note)}</p></div>`).join('')}</div></section>

      <section class="section"><div class="grid tips-grid">
        ${I.sections.map((s) => `<div class="card tip-card reveal"><h3><span>${s.icon}</span>${esc(s.t)}</h3><ul>${s.items.map((i) => `<li>${U.linkify(i)}</li>`).join('')}</ul></div>`).join('')}
      </div></section>

      <section class="section"><div class="section-head"><div><div class="eyebrow">日本語</div><h2 class="h2">Frases úteis</h2></div><p class="lead" style="max-width:380px">Toque para ouvir em japonês (se o seu aparelho tiver a voz instalada).</p></div>
        <div class="grid phrases">${I.phrases.map((p) => `<button type="button" class="card phrase reveal" data-say="${esc(p.jp)}"><small>${esc(p.pt)}</small><span class="jp">${esc(p.jp)}</span><span class="ro">${esc(p.ro)}</span></button>`).join('')}</div></section>

      <section class="section"><div class="card tip-card"><h3>📶 Usar sem internet</h3>
        <p class="muted" style="font-size:14.5px">Quando o app estiver publicado (link https), ele fica disponível offline depois da primeira visita. Toque abaixo para baixar antecipadamente todas as fotos — e abra cada dia do roteiro uma vez com internet para guardar os mapas.</p>
        <div class="dr-actions"><button class="btn dark" id="offlineBtn">⬇️ Preparar para uso offline</button></div></div></section>
      ${footer()}</div>`;

    $('#todo').addEventListener('change', (e) => {
      const id = e.target.dataset.id; if (!id) return;
      done[id] = e.target.checked; U.store.set('todo', done);
      e.target.closest('li').classList.toggle('done', e.target.checked);
      $('#pctTxt').textContent = pct() + '% concluído'; $('#pctBar').style.width = pct() + '%';
    });
    $$('[data-say]').forEach((b) => b.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) return U.toast('Seu navegador não tem leitura em voz alta');
      const u = new SpeechSynthesisUtterance(b.dataset.say); u.lang = 'ja-JP'; u.rate = 0.85;
      const v = speechSynthesis.getVoices().find((x) => x.lang && x.lang.startsWith('ja')); if (v) u.voice = v;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    }));
    $('#offlineBtn').addEventListener('click', prepareOffline);
  }
  const TODO = window.TODO;

  async function prepareOffline() {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      U.toast('Disponível quando o app estiver publicado (https)'); return;
    }
    const urls = Object.values(window.GEN.photos).map((p) => p && p.url).filter(Boolean);
    navigator.serviceWorker.controller.postMessage({ type: 'precache', urls });
    U.toast(`Baixando ${urls.length} fotos para uso offline…`);
  }

  /* ================================================================ painel do glossário */
  const drawer = $('#drawer'), scrim = $('#scrim'), body = $('#drawerBody');
  let drawerOpen = false, miniMap = null;
  App.openEntry = (key, push = true) => {
    const [kind, id] = key.split(/:(.+)/);
    const x = kind === 'p' ? PLACES[id] : TERMS[id];
    if (!x) return;
    if (miniMap) { miniMap.remove(); miniMap = null; }
    const photoId = kind === 'p' ? id : 't:' + id;
    const ph = U.photo(photoId);
    const days = kind === 'p' ? U.placeDays(id) : [];
    const related = kind === 't' ? relatedPlaces(x) : [];
    body.innerHTML = `
      <div class="dr-photo" style="${kind === 'p' ? U.cssCity(x.c) : ''}">${U.img(photoId)}
        ${ph ? `<a class="dr-credit" href="${esc(ph.page)}" target="_blank" rel="noopener">📷 ${esc(ph.artist || 'Wikimedia Commons')}${ph.license ? ' · ' + esc(ph.license) : ''}</a>` : ''}</div>
      <div class="dr-content" style="${kind === 'p' ? U.cssCity(x.c) : ''}">
        <div class="dr-type">${kind === 'p' ? typeChip(x) + cityChip(x.c) : `<span class="chip">${window.TERM_CATS[x.cat].icon} ${esc(window.TERM_CATS[x.cat].label)}</span>`}</div>
        <h2 id="drawerTitle">${esc(x.n)}</h2>${x.jp ? `<div class="jp-big">${esc(x.jp)}</div>` : ''}
        <p class="dr-desc">${U.linkify(x.d, { skip: [key] })}</p>
        ${x.tip ? `<div class="dr-tip"><b>💡 Dica:</b> ${U.linkify(x.tip, { skip: [key] })}</div>` : ''}
        ${days.length ? `<div class="dr-section"><h4>Aparece no roteiro</h4><div class="dr-days">${days.map(dayChip).join('')}</div></div>` : ''}
        ${related.length ? `<div class="dr-section"><h4>Onde ver no roteiro</h4><div class="dr-related">${related.map((r) => `<button class="chip" data-open="p:${r}">${U.typeOf(PLACES[r]).icon} ${esc(PLACES[r].n)}</button>`).join('')}</div></div>` : ''}
        ${kind === 'p' ? `<div class="dr-section"><h4>Localização</h4><div class="dr-mini-map" id="drMap"></div></div>` : ''}
        <div class="dr-actions">
          ${kind === 'p' ? `<a class="btn primary sm" href="${U.gmPlace(id)}" target="_blank" rel="noopener">Abrir no Google Maps ↗</a>
            <a class="btn sm" href="#/mapa?focus=${id}">Ver no mapa geral</a>` : ''}
          ${x.w ? `<a class="btn sm" href="https://en.wikipedia.org/wiki/${encodeURIComponent(x.w.replace(/ /g, '_'))}" target="_blank" rel="noopener">Wikipedia ↗</a>` : ''}
          ${kind === 'p' && App.dayMap && App.dayMap.markers[id] ? `<button class="btn sm" id="drFocus">Mostrar no mapa do dia</button>` : ''}
        </div>
      </div>`;
    body.scrollTop = 0;
    scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('show'));
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); drawerOpen = true;
    document.body.style.overflow = 'hidden';
    if (push) history.pushState({ drawer: key, hash: location.hash }, '');
    if (kind === 'p') setTimeout(() => { if (drawerOpen && $('#drMap')) miniMap = M.miniMap($('#drMap'), id); }, 320);
    const f = $('#drFocus'); if (f) f.addEventListener('click', () => { closeDrawer(); setTimeout(() => App.dayMap && App.dayMap.focus(id), 300); });
    setTimeout(() => $('#drawerClose').focus({ preventScroll: true }), 100);
  };
  function relatedPlaces(term) {
    const names = [term.n, ...(term.aka || [])].map((s) => s.toLowerCase());
    return Object.keys(PLACES).filter((id) => { const d = (PLACES[id].d || '').toLowerCase(); return names.some((n) => n.length > 3 && d.includes(n)); }).slice(0, 8);
  }
  function closeDrawer(fromPop = false) {
    if (!drawerOpen) return;
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); scrim.classList.remove('show'); drawerOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => { scrim.hidden = true; if (miniMap) { miniMap.remove(); miniMap = null; } }, 300);
    if (!fromPop && history.state && history.state.drawer) history.back();
  }
  $('#drawerClose').addEventListener('click', () => closeDrawer());
  scrim.addEventListener('click', () => closeDrawer());
  window.addEventListener('popstate', (e) => {
    if (drawerOpen && !(e.state && e.state.drawer)) closeDrawer(true);
    else if (e.state && e.state.drawer && !drawerOpen && e.state.hash === location.hash) App.openEntry(e.state.drawer, false);
  });
  // gesto de arrastar para baixo no celular
  (() => {
    let y0 = null;
    drawer.addEventListener('touchstart', (e) => { if (body.scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
    drawer.addEventListener('touchmove', (e) => { if (y0 == null) return; const dy = e.touches[0].clientY - y0; if (dy > 0) drawer.style.transform = `translateY(${dy}px)`; }, { passive: true });
    drawer.addEventListener('touchend', (e) => { if (y0 == null) return; const dy = e.changedTouches[0].clientY - y0; drawer.style.transform = ''; y0 = null; if (dy > 110) closeDrawer(); });
  })();

  // cliques em termos do glossário em qualquer lugar
  document.addEventListener('click', (e) => {
    const g = e.target.closest('.gl[data-g]');
    if (g) { e.preventDefault(); e.stopPropagation(); App.openEntry(g.dataset.g); }
  }, true);

  /* ================================================================ busca rápida */
  const pop = $('#searchPop'), si = $('#searchInput'), sr = $('#searchResults');
  const normS = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function openSearch() { pop.hidden = false; si.value = ''; doSearch(); setTimeout(() => si.focus(), 30); }
  function closeSearch() { pop.hidden = true; }
  function doSearch() {
    const q = normS(si.value.trim());
    const items = [
      ...Object.entries(PLACES).map(([id, p]) => ({ key: 'p:' + id, x: p, sub: `${U.typeOf(p).icon} ${U.typeOf(p).label} · ${U.city(p.c).n}`, ph: id })),
      ...Object.entries(TERMS).map(([id, t]) => ({ key: 't:' + id, x: t, sub: `${window.TERM_CATS[t.cat].icon} ${window.TERM_CATS[t.cat].label}`, ph: 't:' + id })),
    ];
    const res = !q ? items.filter((i) => i.key.startsWith('p:') && ['bairro', 'templo', 'santuario'].includes(i.x.t)).slice(0, 12)
      : items.map((i) => {
          const n = normS(i.x.n), a = normS((i.x.aka || []).join(' ')), d = normS(i.x.d), jp = i.x.jp || '';
          const score = n.startsWith(q) ? 0 : n.includes(q) ? 1 : a.includes(q) ? 2 : jp.includes(si.value.trim()) ? 2 : d.includes(q) ? 3 : 9;
          return { ...i, score };
        }).filter((i) => i.score < 9).sort((a, b) => a.score - b.score).slice(0, 30);
    sr.innerHTML = res.length ? res.map((r) => `<button class="pl-item" data-open="${r.key}">${U.photo(r.ph) ? `<img src="${esc(U.photo(r.ph).url)}" alt="" loading="lazy">` : `<span class="ph">${r.sub.split(' ')[0]}</span>`}<span><b>${esc(r.x.n)}</b><small>${esc(r.sub)}</small></span></button>`).join('') : '<p class="empty">Nada encontrado.</p>';
  }
  $('#searchBtn').addEventListener('click', openSearch);
  si.addEventListener('input', doSearch);
  si.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const f = sr.querySelector('[data-open]'); if (f) { closeSearch(); App.openEntry(f.dataset.open); } } });
  pop.addEventListener('click', (e) => { if (e.target === pop) closeSearch(); const b = e.target.closest('[data-open]'); if (b) closeSearch(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!pop.hidden) closeSearch(); else if (drawerOpen) closeDrawer(); else closeSheet(); }
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ================================================================ menu "Mais" */
  const sheet = $('#moreSheet');
  function closeSheet() { sheet.hidden = true; }
  $('#moreBtn').addEventListener('click', () => { sheet.hidden = !sheet.hidden; });
  sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('a')) closeSheet(); });

  function footer() {
    return `<footer class="foot">Feito para ${esc(TRIP.travelers)} · 日本 2026 — Fotos: Wikimedia Commons (créditos em cada foto) · Mapas: © OpenStreetMap, CARTO, Esri · Rotas a pé: OSRM · Previsão: Open-Meteo</footer>`;
  }

  /* ================================================================ início */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !/localhost|127\.0\.0\.1/.test(location.hostname)) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  render();
})();
