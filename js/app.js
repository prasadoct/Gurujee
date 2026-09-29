(() => {
  'use strict';

  const { CONFIG, RITUALS, OCCASIONS, SLOTS, GANESH_DAYS, PLATFORMS, COUNTRY_CODES, AREAS, GALLERY } = window.SITE;
  const Art = window.Art;
  const I18N = window.I18N;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = id => RITUALS.find(r => r.id === id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Language ---------- */

  const LANGS = ['mr', 'en'];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const urlLang = new URLSearchParams(location.search).get('lang');
  let lang = LANGS.includes(urlLang) ? urlLang : (LANGS.includes(store.get('lang')) ? store.get('lang') : 'mr');

  // t('key', {var}) — interface strings; L({mr, en}) — content fields.
  const t = (key, vars) => {
    let s = I18N[lang][key];
    if (s === undefined) s = I18N.en[key] ?? key;
    if (vars && typeof s === 'string') s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  };
  const L = v => (v && typeof v === 'object' && !Array.isArray(v) && 'en' in v ? v[lang] : v);
  const other = v => (v && typeof v === 'object' && 'en' in v ? v[lang === 'mr' ? 'en' : 'mr'] : '');
  const locale = () => (lang === 'mr' ? 'mr-IN-u-nu-latn' : 'en-IN');

  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const minPrice = r => Math.min(...r.prices);
  // Card/list price: a single amount, "from ₹X" when there are several options, or per day.
  const priceText = r => (r.perDay ? `${inr(r.prices[0])} / ${lang === 'mr' ? 'दिवस' : 'day'}`
    : r.prices.length === 1 ? inr(r.prices[0]) : t('card.from', { p: inr(minPrice(r)) }));
  const tiersText = r => (r.perDay ? priceText(r) : r.prices.map(inr).join(' · '));
  const durText = r => {
    if (r.durationLabel) return L(r.durationLabel);
    const h = Math.floor(r.mins / 60), m = r.mins % 60;
    return lang === 'mr'
      ? [h ? `${h} तास` : '', m ? `${m} मि.` : ''].filter(Boolean).join(' ')
      : [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ');
  };
  const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

  const ICON = {
    clock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    video: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6.5" width="12.5" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 10.5l5-3v9l-5-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    home: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-6.5 8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- Static page ---------- */

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const md = $('meta[name="description"]');
    if (md) md.content = t('meta.desc');
    $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('.lang-switch [data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('.about-quote-tr').hidden = !t('about.quoteTr');
    wireContacts();
  }

  function wireContacts() {
    $$('.js-wa').forEach(a => {
      a.href = waLink(t(a.dataset.waKey || 'wa.hello'));
      a.target = '_blank';
      a.rel = 'noopener';
    });
    $$('.js-tel').forEach(a => { a.href = CONFIG.phoneHref; });
    $$('.js-phone-display').forEach(s => { s.textContent = CONFIG.phoneDisplay; });
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function renderArt() {
    $$('[data-art]').forEach(el => {
      if (el.dataset.photo) return;
      const k = el.dataset.art;
      el.innerHTML = k === 'hero' ? Art.hero() : k === 'lotus' ? Art.lotus() : Art.motif(k);
    });
  }

  // Use Guruji's real portrait when assets/ramakant-guruji.jpg exists; otherwise keep the illustration.
  function loadPhoto() {
    if (!CONFIG.photo) return;
    const img = new Image();
    img.onload = () => {
      const p = $('#portrait');
      p.dataset.photo = '1';
      p.classList.remove('tone-green');
      p.classList.add('has-photo');
      p.innerHTML = `<img src="${CONFIG.photo}" alt="" width="${img.naturalWidth}" height="${img.naturalHeight}">`;
      $('#portrait-cap').hidden = false;
      const av = $('#hero-avatar');
      av.hidden = false;
      av.style.backgroundImage = `url("${CONFIG.photo}")`;
      av.nextElementSibling.hidden = true; // swap the pulse dot for the face
    };
    img.src = CONFIG.photo;
  }

  let activeOcc = 'all';
  let showAll = false;

  function renderCards() {
    $('#ritual-grid').innerHTML = RITUALS.map(r => `
      <li class="rcard" data-id="${r.id}">
        <div class="rcard-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</div>
        <div class="rcard-body">
          ${r.badge ? `<span class="badge">${L(r.badge)}</span>` : ''}
          <h3 class="rcard-title">${L(r.name)}</h3>
          ${L(r.sub) ? `<p class="rcard-sub">${L(r.sub)}</p>` : ''}
          <p class="rcard-alt" lang="${lang === 'mr' ? 'en' : 'mr'}">${other(r.name)}</p>
          <p class="rcard-short">${L(r.short)}</p>
          <p class="rcard-meta">
            <span>${ICON.clock}${r.perDay ? t('card.perDay') : durText(r)}</span>
            <span class="rcard-price">${priceText(r)}</span>
          </p>
          <p class="rcard-mode ${r.online ? 'is-online' : ''}">${r.online ? ICON.video + t('card.online') : ICON.home + t('card.homeOnly')}</p>
          <button class="rcard-cta" type="button" data-open="${r.id}">
            <span>${t('card.cta')}</span>${ICON.arrow}
            <span class="sr-only">${t('card.for', { name: L(r.name) })}</span>
          </button>
        </div>
      </li>`).join('') + `
      <li class="rcard rcard-ask">
        <div class="rcard-body">
          <h3 class="rcard-title">${t('ask.title')}</h3>
          <p class="rcard-short">${t('ask.body')}</p>
          <a class="btn btn-ghost js-wa" href="#" data-wa-key="ask.wa">${t('ask.cta')}</a>
        </div>
      </li>`;
    applyFilter();
  }

  function renderOccasions() {
    $('#occasion-chips').innerHTML = OCCASIONS.map(o =>
      `<button type="button" class="chip${o.id === 'online' ? ' chip-online' : ''}" data-occ="${o.id}" aria-pressed="${o.id === activeOcc}">${o.id === 'online' ? ICON.video : ''}${L(o.label)}</button>`).join('');
  }

  function applyFilter() {
    let shown = 0;
    const collapsed = activeOcc === 'all' && !showAll;
    $$('.rcard').forEach((card, i) => {
      const r = byId(card.dataset.id);
      const match = !r || activeOcc === 'all' || (activeOcc === 'online' ? r.online : r.occasions.includes(activeOcc));
      card.hidden = !match || (collapsed && r && i >= CONFIG.featured);
      if (match && r) shown++;
    });
    const more = $('#show-all');
    more.hidden = !collapsed;
    more.textContent = t('show.all', { n: RITUALS.length });
    const occ = OCCASIONS.find(o => o.id === activeOcc);
    $('#occ-status').textContent = activeOcc === 'all' ? '' : t('occ.status', { n: shown, label: L(occ.label) });
  }

  function wireOccasions() {
    $('#occasion-chips').addEventListener('click', e => {
      const b = e.target.closest('[data-occ]');
      if (!b) return;
      activeOcc = b.dataset.occ;
      showAll = false;
      $$('.chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      applyFilter();
    });
  }

  function wireShowAll() {
    $('#show-all').addEventListener('click', () => {
      showAll = true;
      applyFilter();
      const nextCard = $$('.rcard')[CONFIG.featured];
      if (nextCard) nextCard.querySelector('.rcard-cta').focus({ preventScroll: true });
    });
  }

  function renderOnlineAvail() {
    $('#online-avail').innerHTML = RITUALS.filter(r => r.online).map(r =>
      `<li><span>${L(r.name)}</span><span class="muted">${priceText(r)}</span></li>`).join('');
  }

  function renderGallery() {
    $('#gallery-grid').innerHTML = GALLERY.map(g => `
      <li class="gal ${g.span ? 'gal-' + g.span : ''}">
        <figure>
          <div class="gal-art tone-${g.tone}" role="img" aria-label="${esc(t('gal.illus', { t: L(g.title) }))}">${Art.motif(g.motif)}</div>
          <figcaption><strong>${L(g.title)}</strong><span>${L(g.meta)}</span></figcaption>
        </figure>
      </li>`).join('');
  }

  function renderAreas() {
    $('#area-cols').innerHTML = AREAS.map(group => `
      <div class="area-col">
        <h3 class="area-city">${L(group.city)}</h3>
        <ul class="area-list">${group.list.map(a => `<li>${L(a)}</li>`).join('')}</ul>
      </div>`).join('');
  }

  function renderPage() {
    applyStatic();
    renderCards();
    renderOccasions();
    renderOnlineAvail();
    renderGallery();
    renderAreas();
    wireContacts();
  }

  function setLang(next) {
    if (next === lang || !LANGS.includes(next)) return;
    lang = next;
    store.set('lang', lang);
    renderPage();
    if (dlg.open) render({ keepFocus: true });
  }

  function wireNav() {
    const toggle = $('.nav-toggle');
    const list = $('#nav-list');
    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      list.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    list.addEventListener('click', e => { if (e.target.closest('a,button')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && list.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    $('.lang-switch').addEventListener('click', e => {
      const b = e.target.closest('[data-lang]');
      if (b) setLang(b.dataset.lang);
    });

    const header = $('.site-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      const links = $$('.nav-list a[href^="#"]');
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + en.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.forEach(l => { const s = $(l.getAttribute('href')); if (s) io.observe(s); });

      // Show the mobile quick-action bar once the hero's buttons scroll away.
      const qb = $('#quickbar');
      new IntersectionObserver(([en]) => qb.classList.toggle('is-visible', !en.isIntersecting))
        .observe($('.hero-actions'));
    }
  }

  /* ---------- Dates & availability (mock) ---------- */

  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const startOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);
  const today = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  const MIN_DATE = addDays(today, 1);
  const MAX_DATE = addDays(today, 180);
  // Open the calendar on next month when only a few bookable days remain in this one.
  const DEFAULT_MONTH = (() => {
    const last = new Date(MIN_DATE.getFullYear(), MIN_DATE.getMonth() + 1, 0).getDate();
    return last - MIN_DATE.getDate() < 6
      ? new Date(MIN_DATE.getFullYear(), MIN_DATE.getMonth() + 1, 1)
      : startOfMonth(MIN_DATE);
  })();
  const fmtLong = d => d.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = d => d.toLocaleDateString(locale(), { weekday: 'short', day: 'numeric', month: 'short' });

  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function dayStatus(d) {
    if (d < MIN_DATE || d > MAX_DATE) return 'out';
    const h = hash(iso(d)) % 100;
    if (h < 12) return 'booked';
    if (h < 34) return 'few';
    return 'open';
  }
  function slotsFor(dateIso) {
    if (!dateIso) return SLOTS.map(s => ({ ...s, available: true }));
    const st = dayStatus(parseIso(dateIso));
    if (st !== 'few') return SLOTS.map(s => ({ ...s, available: st === 'open' }));
    const h = hash(dateIso + '#');
    const a = h % 4;
    const b = (a + 1 + ((h >> 4) % 3)) % 4;
    return SLOTS.map((s, i) => ({ ...s, available: i !== a && i !== b }));
  }

  /* ---------- Booking flow ---------- */

  const dlg = $('#booking');
  const body = $('#bk-body');
  const btnNext = $('#bk-next');
  const btnBack = $('#bk-back');

  const STEP_INDEX = { pick: 0, info: 0, datetime: 1, details: 2, review: 3, done: 4 };
  const JUMP_TO = ['info', 'datetime', 'details', 'review'];

  const freshState = () => ({
    step: 'pick', ritualId: null, mode: 'home', days: null, tier: null, date: null, slot: null, muhurat: false,
    viewMonth: DEFAULT_MONTH,
    form: {
      name: '', cc: '+91', phone: '', whatsapp: true, address: '', area: '', pincode: '',
      city: '', platform: 'WhatsApp', lang: lang === 'en' ? 'English' : 'Marathi', notes: ''
    },
    pay: 'upi', touched: {}, ref: null, txn: null, paying: false
  });
  let state = freshState();
  let lastTrigger = null;

  const ritual = () => byId(state.ritualId);
  const slotObj = () => SLOTS.find(s => s.id === state.slot);
  const isOnline = () => state.mode === 'online';
  const LANG_NAMES = { Marathi: { mr: 'मराठी', en: 'Marathi' }, Hindi: { mr: 'हिंदी', en: 'Hindi' }, English: { mr: 'इंग्रजी', en: 'English' } };
  const areaLabel = en => {
    if (en === 'Other area') return t('f.areaOther');
    for (const g of AREAS) { const a = g.list.find(x => x.en === en); if (a) return L(a); }
    return en;
  };

  // Choosing a ceremony resets the per-ceremony choices; a single dakshina option is pre-selected.
  function setRitual(id) {
    if (id === state.ritualId) return;
    state.ritualId = id;
    state.days = null;
    const r = ritual();
    state.tier = r.prices.length === 1 ? r.prices[0] : null;
  }

  // Money: the advance is a fixed share of the chosen dakshina; the rest is settled after the puja.
  function money() {
    const r = ritual();
    if (!r) return null;
    const total = r.perDay ? r.prices[0] * (state.days || 1) : (state.tier || minPrice(r));
    const advance = Math.round(total * CONFIG.advancePct / 100);
    return { min: total, max: total, advance, balMin: total - advance, balMax: total - advance, exact: true };
  }
  const rangeText = (a, b) => (a === b ? inr(a) : `${inr(a)} – ${inr(b).slice(1)}`);

  function estimate() {
    const r = ritual();
    if (!r) return '';
    if (r.perDay) return state.days ? inr(r.prices[0] * state.days) : priceText(r);
    return state.tier ? inr(state.tier) : priceText(r);
  }

  function openBooking(id, trigger, opts = {}) {
    lastTrigger = trigger || document.activeElement;
    if (state.step === 'done') state = freshState();
    if (opts.mode) state.mode = opts.mode;
    if (id) {
      setRitual(id);
      if (!ritual().online) state.mode = 'home';
      state.step = 'info';
    } else if (!state.ritualId || opts.mode) {
      state.step = 'pick';
    }
    if (!dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add('modal-open');
      history.pushState({ bk: 1 }, '', '#book');
    }
    render();
  }

  function closeBooking(fromPop) {
    if (!dlg.open) return;
    dlg.close();
    document.documentElement.classList.remove('modal-open');
    if (state.step === 'done') state = freshState();
    if (!fromPop && history.state && history.state.bk) history.back();
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
  }

  function go(step) {
    state.step = step;
    render();
  }

  function render(opts = {}) {
    const scroll = body.scrollTop;
    renderSteps();
    renderSummary();
    const views = { pick: viewPick, info: viewInfo, datetime: viewDateTime, details: viewDetails, review: viewReview, done: viewDone };
    body.innerHTML = views[state.step]();
    bindView();
    renderFooter();
    if (opts.keepFocus) { body.scrollTop = scroll; return; }
    body.scrollTop = 0;
    const h = $('.bk-h', body);
    if (h) h.focus({ preventScroll: true });
  }

  function renderSteps() {
    const cur = STEP_INDEX[state.step];
    $('#bk-steps').innerHTML = [1, 2, 3, 4].map((n, i) => {
      const done = i < cur;
      const current = i === cur;
      const canJump = done && state.step !== 'done';
      const inner = `<span class="st-l">${t('step.' + n)}</span>${done ? `<span class="sr-only"> ${t('step.done')}</span>` : ''}`;
      return `<li class="${done ? 'is-done' : ''} ${current ? 'is-current' : ''}" ${current ? 'aria-current="step"' : ''}>
        ${canJump ? `<button type="button" data-jump="${i}">${inner}</button>` : `<span class="st">${inner}</span>`}
      </li>`;
    }).join('');
  }

  function renderSummary() {
    const el = $('#bk-summary');
    const r = ritual();
    if (!r || state.step === 'pick' || state.step === 'done') { el.hidden = true; return; }
    const parts = [`<strong>${L(r.name)}</strong>`];
    if (state.step !== 'info') parts.push(isOnline() ? t('mode.online') : t('mode.home'));
    if (r.perDay && state.days) parts.push(L(GANESH_DAYS.find(d => d.v === state.days).label));
    if (state.date) parts.push(fmtShort(parseIso(state.date)));
    if (state.muhurat) parts.push(t('rv.muhurat'));
    else if (slotObj()) parts.push(L(slotObj().label));
    el.innerHTML = parts.join('<span aria-hidden="true"> · </span>');
    el.hidden = false;
  }

  function renderFooter() {
    const m = money();
    const cfg = {
      pick: { back: null, next: t('btn.continue') },
      info: { back: t('btn.back'), next: t('btn.pickDate') },
      datetime: { back: t('btn.back'), next: t('btn.continue') },
      details: { back: t('btn.back'), next: t('btn.review') },
      review: { back: t('btn.back'), next: m ? t('btn.pay', { amt: inr(m.advance) }) : '' },
      done: { back: null, next: t('btn.done') }
    }[state.step];
    btnBack.hidden = !cfg.back || state.paying;
    btnBack.textContent = cfg.back || '';
    btnNext.textContent = state.paying ? t('btn.paying') : cfg.next;
    btnNext.disabled = state.paying;
    btnNext.toggleAttribute('aria-busy', state.paying);
    const est = estimate();
    $('#bk-est').innerHTML = est && ['pick', 'info', 'datetime', 'details'].includes(state.step)
      ? `<span class="bk-est-k">${t('est.k')}</span><span class="bk-est-v">${est}</span>`
      : '';
  }

  /* ----- Views ----- */

  function viewPick() {
    const onlineOnly = isOnline();
    return `
      <h2 class="bk-h" tabindex="-1">${t('pick.h')}</h2>
      <p class="bk-sub">${t('pick.sub')}</p>
      ${onlineOnly ? `<p class="mode-pill">${ICON.video}${t('online.availTitle')}</p>` : ''}
      <fieldset class="pick-list" aria-describedby="pick-err">
        <legend class="sr-only">${t('pick.legend')}</legend>
        ${RITUALS.map(r => {
          const off = onlineOnly && !r.online;
          return `
          <label class="pick${off ? ' is-off' : ''}">
            <input type="radio" name="pick" value="${r.id}" ${state.ritualId === r.id && !off ? 'checked' : ''} ${off ? 'disabled' : ''}>
            <span class="pick-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</span>
            <span class="pick-text">
              <span class="pick-name">${L(r.name)}</span>
              <span class="pick-alt">${other(r.name)}</span>
              <span class="pick-meta">${off ? t('card.homeOnly') : `${r.perDay ? t('card.perDay') : durText(r)} · ${priceText(r)}${r.online ? ' · ' + t('card.online') : ''}`}</span>
            </span>
            <span class="pick-radio" aria-hidden="true"></span>
          </label>`;
        }).join('')}
      </fieldset>
      <p class="field-err" id="pick-err"></p>`;
  }

  function viewInfo() {
    const r = ritual();
    return `
      <div class="info-top">
        <div class="info-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</div>
        <div>
          <h2 class="bk-h" tabindex="-1">${L(r.name)}</h2>
          ${L(r.sub) ? `<p class="info-sub">${L(r.sub)}</p>` : ''}
          <p class="info-mr">${other(r.name)}</p>
          <button type="button" class="link-btn" data-goto="pick">${t('info.change')}</button>
        </div>
      </div>
      <p class="info-lead">${L(r.about)}</p>
      <dl class="facts">
        <div><dt>${t('info.duration')}</dt><dd>${durText(r)}</dd></div>
        <div><dt>${t('info.where')}</dt><dd>${r.online ? t('info.whereBoth') : t('info.whereHome')}</dd></div>
        <div class="facts-wide"><dt>${t('info.dakshina')}</dt><dd>${tiersText(r)}</dd></div>
      </dl>
      <div class="why">
        <p class="why-k">${t('info.why')}</p>
        <p>${L(r.why)}</p>
      </div>
      <h3 class="bk-h3">${t('info.goodFor')}</h3>
      <ul class="tags">${L(r.goodFor).map(g => `<li>${g}</li>`).join('')}</ul>
      <div class="info-cols">
        <section>
          <h3 class="bk-h3">${t('info.brings')}</h3>
          <ul class="ticks">${L(r.included).map(i => `<li>${ICON.check}<span>${i}</span></li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="bk-h3">${t('info.arrange')}</h3>
          <ul class="bullets">${L(r.arrange).map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
      </div>
      <h3 class="bk-h3">${t('info.prep')}</h3>
      <ol class="prep">${L(r.prep).map(i => `<li>${i}</li>`).join('')}</ol>
      <p class="reassure">${t('info.reassure')}</p>`;
  }

  function viewDateTime() {
    const r = ritual();
    const slots = slotsFor(state.date);
    const modeBlock = `
      <fieldset class="group">
        <legend class="lbl">${t('mode.legend')}</legend>
        <div class="modes">
          <label class="mode-opt"><input type="radio" name="mode" value="home" ${!isOnline() ? 'checked' : ''}>
            <span>${ICON.home}<strong>${t('mode.home')}</strong><small>${t('mode.homeD')}</small></span></label>
          <label class="mode-opt${r.online ? '' : ' is-off'}"><input type="radio" name="mode" value="online" ${isOnline() ? 'checked' : ''} ${r.online ? '' : 'disabled'}>
            <span>${ICON.video}<strong>${t('mode.online')}</strong><small>${r.online ? t('mode.onlineD') : t('mode.onlineNA')}</small></span></label>
        </div>
        ${isOnline() ? `<p class="hint">${t('mode.istNote')} <a href="#online" data-close-to="online">${t('online.stepsTitle')}</a></p>` : ''}
      </fieldset>`;
    const daysBlock = r.perDay ? `
      <fieldset class="group" aria-describedby="days-err">
        <legend class="lbl">${t('days.legend')}</legend>
        <div class="seg">
          ${GANESH_DAYS.map(d => `
            <label class="seg-opt"><input type="radio" name="days" value="${d.v}" ${state.days === d.v ? 'checked' : ''}>
              <span><strong>${L(d.label)}</strong><small>${inr(r.prices[0] * d.v)}</small></span></label>`).join('')}
        </div>
        <p class="field-err" id="days-err"></p>
      </fieldset>` : '';
    const tierBlock = !r.perDay && r.prices.length > 1 ? `
      <fieldset class="group" aria-describedby="tier-hint tier-err">
        <legend class="lbl">${t('tier.legend')}</legend>
        <div class="seg seg-tiers">
          ${r.prices.map(p => `
            <label class="seg-opt"><input type="radio" name="tier" value="${p}" ${state.tier === p ? 'checked' : ''}>
              <span><strong>${inr(p)}</strong><small>${t('tier.adv', { amt: inr(Math.round(p * CONFIG.advancePct / 100)) })}</small></span></label>`).join('')}
        </div>
        <p class="hint" id="tier-hint">${t('tier.hint')}</p>
        <p class="field-err" id="tier-err"></p>
      </fieldset>` : '';
    const hintSlot = SLOTS.find(s => s.id === r.slotHint);
    const slotName = hintSlot ? (lang === 'en' ? L(hintSlot.label).toLowerCase() : L(hintSlot.label)) : '';
    return `
      <h2 class="bk-h" tabindex="-1">${t('dt.h')}</h2>
      <p class="bk-sub">${t('dt.sub')}</p>
      ${modeBlock}
      ${tierBlock}
      ${daysBlock}
      <fieldset class="group" aria-describedby="date-err">
        <legend class="lbl">${r.perDay ? t('date.legendGanesh') : t('date.legend')}</legend>
        <div class="cal" id="cal"></div>
        <ul class="cal-legend" aria-hidden="true">
          <li><span class="lg lg-open"></span>${t('legend.open')}</li>
          <li><span class="lg lg-few"></span>${t('legend.few')}</li>
          <li><span class="lg lg-booked"></span>${t('legend.booked')}</li>
        </ul>
        <p class="field-err" id="date-err"></p>
      </fieldset>
      <fieldset class="group" aria-describedby="slot-hint slot-err">
        <legend class="lbl">${t('slot.legend')}</legend>
        <p class="hint" id="slot-hint">${state.date ? t('slot.for', { date: fmtLong(parseIso(state.date)) }) : t('slot.choose')}
          ${hintSlot ? ' ' + t('slot.hint', { name: L(r.name), slot: slotName }) : ''}</p>
        <div class="slots">
          ${slots.map(s => `
            <label class="slot ${!s.available ? 'is-off' : ''}">
              <input type="radio" name="slot" value="${s.id}" ${state.slot === s.id ? 'checked' : ''} ${!s.available || state.muhurat ? 'disabled' : ''}>
              <span class="slot-l">${L(s.label)}</span>
              <span class="slot-r">${s.available ? L(s.range) : t('slot.booked')}</span>
            </label>`).join('')}
        </div>
        <label class="check">
          <input type="checkbox" name="muhurat" ${state.muhurat ? 'checked' : ''}>
          <span>${t('muhurat')}</span>
        </label>
        <p class="field-err" id="slot-err"></p>
      </fieldset>`;
  }

  function field({ id, label, type = 'text', hint = '', attrs = '', prefix = '' }) {
    const v = esc(state.form[id] || '');
    const input = type === 'textarea'
      ? `<textarea id="f-${id}" name="${id}" rows="3" ${attrs} aria-describedby="f-${id}-hint f-${id}-err">${v}</textarea>`
      : `<input id="f-${id}" name="${id}" type="${type}" value="${v}" ${attrs} aria-describedby="f-${id}-hint f-${id}-err">`;
    return `
      <div class="field" data-field="${id}">
        <label for="f-${id}">${label}</label>
        ${prefix ? `<div class="affix">${prefix}${input}</div>` : input}
        <p class="hint" id="f-${id}-hint">${hint}</p>
        <p class="field-err" id="f-${id}-err"></p>
      </div>`;
  }

  function viewDetails() {
    const f = state.form;
    const ccSelect = `<select class="cc" name="cc" aria-label="${t('f.cc')}">${COUNTRY_CODES.map(c =>
      `<option value="${c.code}" ${f.cc === c.code ? 'selected' : ''}>${c.label}</option>`).join('')}</select>`;
    const areaOpts = AREAS.map(g =>
      `<optgroup label="${L(g.city)}">${g.list.map(a => `<option value="${a.en}" ${f.area === a.en ? 'selected' : ''}>${L(a)}</option>`).join('')}</optgroup>`).join('');
    const whereBlock = isOnline() ? `
        ${field({ id: 'city', label: t('f.city'), hint: t('f.cityHint'), attrs: 'autocomplete="address-level2" required' })}
        <fieldset class="group">
          <legend class="lbl">${t('f.platform')}</legend>
          <div class="seg seg-3">
            ${PLATFORMS.map(p => `<label class="seg-opt"><input type="radio" name="platform" value="${p}" ${f.platform === p ? 'checked' : ''}><span><strong>${p}</strong></span></label>`).join('')}
          </div>
        </fieldset>` : `
        ${field({ id: 'address', label: t('f.address'), type: 'textarea', hint: t('f.addressHint'), attrs: 'autocomplete="street-address" required' })}
        <div class="field-row">
          <div class="field" data-field="area">
            <label for="f-area">${t('f.area')}</label>
            <select id="f-area" name="area" required aria-describedby="f-area-err">
              <option value="" ${!f.area ? 'selected' : ''}>${t('f.areaPh')}</option>
              ${areaOpts}
              <optgroup label="${t('f.areaElse')}"><option value="Other area" ${f.area === 'Other area' ? 'selected' : ''}>${t('f.areaOther')}</option></optgroup>
            </select>
            <p class="field-err" id="f-area-err"></p>
          </div>
          ${field({ id: 'pincode', label: t('f.pincode'), attrs: 'autocomplete="postal-code" inputmode="numeric" maxlength="6" required' })}
        </div>`;
    return `
      <h2 class="bk-h" tabindex="-1">${t('det.h')}</h2>
      <p class="bk-sub">${t('det.sub')}</p>
      <div class="err-summary" id="err-summary" tabindex="-1" hidden></div>
      <form id="details-form" novalidate>
        ${field({ id: 'name', label: t('f.name'), attrs: 'autocomplete="name" required' })}
        ${field({ id: 'phone', label: t('f.phone'), type: 'tel', prefix: ccSelect, hint: t('f.phoneHint'), attrs: 'autocomplete="tel-national" inputmode="numeric" maxlength="16" required' })}
        <label class="check check-tight">
          <input type="checkbox" name="whatsapp" ${f.whatsapp ? 'checked' : ''}>
          <span>${t('f.wa')}</span>
        </label>
        ${whereBlock}
        <fieldset class="group">
          <legend class="lbl">${t('f.lang')}</legend>
          <div class="seg seg-3">
            ${Object.keys(LANG_NAMES).map(l => `
              <label class="seg-opt"><input type="radio" name="lang" value="${l}" ${f.lang === l ? 'checked' : ''}><span><strong>${L(LANG_NAMES[l])}</strong></span></label>`).join('')}
          </div>
        </fieldset>
        ${field({ id: 'notes', label: t('f.notes'), type: 'textarea', hint: isOnline() ? t('f.notesHintOnline') : t('f.notesHint') })}
      </form>`;
  }

  const phoneDisplay = () => `${state.form.cc} ${formatPhone(state.form.phone)}`;
  const timeText = () => (state.muhurat ? t('rv.muhurat') : `${L(slotObj().label)}, ${L(slotObj().range)}`);

  function viewReview() {
    const r = ritual();
    const f = state.form;
    const m = money();
    const d = fmtLong(parseIso(state.date));
    const daysLabel = r.perDay && state.days ? L(GANESH_DAYS.find(x => x.v === state.days).label) + ' · ' : '';
    const tierLabel = !r.perDay ? ` · ${t('info.dakshina')} ${inr(state.tier)}` : '';
    const where = isOnline()
      ? `<p class="rv-s">${esc(f.city)}</p>`
      : `<p class="rv-s">${esc(f.address)}, ${esc(areaLabel(f.area))} ${esc(f.pincode)}</p>`;
    const methods = [
      { id: 'upi', t: t('pay.upi'), d: t('pay.upiD') },
      { id: 'card', t: t('pay.card'), d: t('pay.cardD') },
      { id: 'nb', t: t('pay.nb'), d: t('pay.nbD') }
    ];
    return `
      <h2 class="bk-h" tabindex="-1">${t('rv.h')}</h2>
      <p class="bk-sub">${t('rv.sub')}</p>
      <div class="review-card">
        <div class="rv-row">
          <div><p class="rv-k">${t('rv.ceremony')}</p><p class="rv-v">${L(r.name)}</p>
            <p class="rv-s">${daysLabel}${durText(r)}${tierLabel}</p>
            <p class="rv-s rv-mode">${isOnline() ? ICON.video + t('rv.modeOnline', { p: esc(f.platform) }) : ICON.home + t('rv.modeHome')}</p></div>
          <button type="button" class="link-btn" data-goto="info">${t('rv.change')}<span class="sr-only"> — ${t('rv.ceremony')}</span></button>
        </div>
        <div class="rv-row">
          <div><p class="rv-k">${t('rv.when')}</p><p class="rv-v">${d}</p><p class="rv-s">${timeText()}${isOnline() ? ' (IST)' : ''}</p></div>
          <button type="button" class="link-btn" data-goto="datetime">${t('rv.change')}<span class="sr-only"> — ${t('rv.when')}</span></button>
        </div>
        <div class="rv-row">
          <div><p class="rv-k">${isOnline() ? t('rv.whoOnline') : t('rv.whoHome')}</p>
            <p class="rv-v">${esc(f.name)}</p>
            <p class="rv-s">${esc(phoneDisplay())}${f.whatsapp ? ' · WhatsApp' : ''}</p>
            ${where}
            <p class="rv-s">${t('rv.explainIn', { lang: L(LANG_NAMES[f.lang]) })}</p>
            ${f.notes.trim() ? `<p class="rv-s rv-notes">“${esc(f.notes.trim())}”</p>` : ''}
          </div>
          <button type="button" class="link-btn" data-goto="details">${t('rv.edit')}<span class="sr-only"> — ${t('det.h')}</span></button>
        </div>
      </div>

      <section class="pay" aria-labelledby="pay-h">
        <h3 class="bk-h3" id="pay-h">${t('pay.h')}</h3>
        <dl class="pay-lines">
          <div><dt>${t('pay.total')}</dt><dd>${rangeText(m.min, m.max)}</dd></div>
          <div class="pay-now"><dt>${t('pay.advance')}</dt><dd>${inr(m.advance)}</dd></div>
          <div><dt>${t('pay.balance')}</dt><dd>${rangeText(m.balMin, m.balMax)}</dd></div>
        </dl>
        <p class="hint">${t('pay.note')}</p>
        <fieldset class="group pay-methods">
          <legend class="lbl">${t('pay.method')}</legend>
          ${methods.map(x => `
            <label class="pay-opt"><input type="radio" name="pay" value="${x.id}" ${state.pay === x.id ? 'checked' : ''}>
              <span class="pay-opt-t">${x.t}</span><span class="pay-opt-d">${x.d}</span><span class="pick-radio" aria-hidden="true"></span></label>`).join('')}
        </fieldset>
        <p class="pay-policy">${ICON.check}<span>${t('pay.policy')}</span></p>
        <p class="pay-demo">${t('pay.demo')}</p>
        <p class="pay-status" id="pay-status" role="status"></p>
      </section>

      <h3 class="bk-h3">${t('next.h')}</h3>
      <ol class="timeline">
        <li><strong>${t('next.1t')}</strong><span>${t('next.1d')}</span></li>
        <li><strong>${t('next.2t', { time: L(CONFIG.responseTime) })}</strong><span>${t('next.2d', { hours: L(CONFIG.callHours) })}</span></li>
        <li><strong>${t('next.3t')}</strong><span>${t('next.3d')}</span></li>
        <li><strong>${isOnline() ? t('next.4tOnline') : t('next.4tHome')}</strong><span>${isOnline() ? t('next.4dOnline') : t('next.4dHome')}</span></li>
        <li><strong>${t('next.5t')}</strong><span>${t('next.5d')}</span></li>
      </ol>`;
  }

  const payName = () => ({ upi: t('pay.upi'), card: t('pay.card'), nb: t('pay.nb') }[state.pay]);

  function doneWaText() {
    const r = ritual();
    return t('done.waText', {
      name: L(r.name), date: fmtLong(parseIso(state.date)), time: timeText(),
      ref: state.ref, amt: inr(money().advance), person: state.form.name.trim()
    });
  }

  function viewDone() {
    const r = ritual();
    const f = state.form;
    const m = money();
    const first = esc(f.name.trim().split(/\s+/)[0]);
    const where = isOnline() ? `${esc(f.city)} · ${esc(f.platform)}` : `${esc(areaLabel(f.area))}, ${esc(f.pincode)}`;
    return `
      <div class="done">
        <div class="done-mark" aria-hidden="true">${ICON.check}</div>
        <h2 class="bk-h" tabindex="-1">${t('done.h', { name: first })}</h2>
        <p class="done-lead">${t('done.lead', { phone: esc(phoneDisplay()), time: L(CONFIG.responseTime) })}</p>
        <div class="ticket">
          <div class="ticket-head"><span class="rv-k">${t('done.ref')}</span><span class="ticket-ref">${state.ref}</span></div>
          <dl>
            <div><dt>${t('done.ceremony')}</dt><dd>${L(r.name)}${r.perDay && state.days ? ` · ${L(GANESH_DAYS.find(x => x.v === state.days).label)}` : ''}</dd></div>
            <div><dt>${t('done.mode')}</dt><dd>${isOnline() ? t('mode.online') : t('mode.home')}</dd></div>
            <div><dt>${t('done.date')}</dt><dd>${fmtLong(parseIso(state.date))}</dd></div>
            <div><dt>${t('done.time')}</dt><dd>${state.muhurat ? t('done.muhurat') : `${L(slotObj().label)} (${L(slotObj().range)})`}${isOnline() ? ' IST' : ''}</dd></div>
            <div><dt>${t('done.where')}</dt><dd>${where}</dd></div>
            <div><dt>${t('done.paid')}</dt><dd><strong>${inr(m.advance)}</strong> · ${payName()} · ${state.txn}</dd></div>
            <div><dt>${t('done.balance')}</dt><dd>${t('done.balanceV', { amt: rangeText(m.balMin, m.balMax) })}</dd></div>
            <div><dt>${t('done.status')}</dt><dd><span class="status"><span class="dot-live" aria-hidden="true"></span>${t('done.statusV')}</span></dd></div>
          </dl>
        </div>
        <div class="done-actions">
          <button type="button" class="btn btn-ghost" id="ics-btn">${t('done.ics')}</button>
          <a class="btn btn-wa" href="${waLink(doneWaText())}" target="_blank" rel="noopener">${t('done.wa')}</a>
        </div>
        <h3 class="bk-h3">${t('done.prep')}</h3>
        ${isOnline() ? `<p class="reassure">${t('done.onlinePrep')}</p>` : ''}
        <ol class="prep">${L(r.prep).map(i => `<li>${i}</li>`).join('')}</ol>
      </div>`;
  }

  /* ----- Calendar ----- */

  function renderCal(focusIso) {
    const cal = $('#cal');
    if (!cal) return;
    const vm = state.viewMonth;
    const first = startOfMonth(vm);
    const daysIn = new Date(vm.getFullYear(), vm.getMonth() + 1, 0).getDate();
    const lead = first.getDay(); // Sunday-first, like the Kalnirnay on the kitchen wall
    const canPrev = startOfMonth(vm) > startOfMonth(MIN_DATE);
    const canNext = startOfMonth(vm) < startOfMonth(MAX_DATE);
    const sameMonth = d => d.getMonth() === vm.getMonth() && d.getFullYear() === vm.getFullYear();

    // Which day in this month holds the roving tab stop
    let tabIso = focusIso;
    if (!tabIso || !sameMonth(parseIso(tabIso))) {
      if (state.date && sameMonth(parseIso(state.date))) tabIso = state.date;
      else {
        tabIso = null;
        for (let d = 1; d <= daysIn; d++) {
          const dt = new Date(vm.getFullYear(), vm.getMonth(), d);
          if (['open', 'few'].includes(dayStatus(dt))) { tabIso = iso(dt); break; }
        }
        if (!tabIso) tabIso = iso(first);
      }
    }

    const cells = [];
    for (let i = 0; i < lead; i++) cells.push('<td></td>');
    for (let d = 1; d <= daysIn; d++) {
      const dt = new Date(vm.getFullYear(), vm.getMonth(), d);
      const k = iso(dt);
      const st = dayStatus(dt);
      const sel = state.date === k;
      const off = st === 'out' || st === 'booked';
      cells.push(`<td><button type="button" class="day is-${st}${sel ? ' is-selected' : ''}${k === iso(today) ? ' is-today' : ''}"
        data-date="${k}" tabindex="${k === tabIso ? 0 : -1}" aria-pressed="${sel}" ${off ? 'aria-disabled="true"' : ''}
        aria-label="${fmtLong(dt)}, ${t('status.' + st)}">${d}</button></td>`);
    }
    while (cells.length % 7) cells.push('<td></td>');
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(`<tr>${cells.slice(i, i + 7).join('')}</tr>`);

    const monthLabel = vm.toLocaleDateString(locale(), { month: 'long', year: 'numeric' });
    const wd = t('cal.wd');
    const wdFull = t('cal.wdFull');
    cal.innerHTML = `
      <div class="cal-head">
        <button type="button" class="icon-btn" data-cal="-1" aria-label="${t('cal.prev')}" ${canPrev ? '' : 'disabled'}>${ICON.chevL}</button>
        <p class="cal-month" aria-live="polite">${monthLabel}</p>
        <button type="button" class="icon-btn" data-cal="1" aria-label="${t('cal.next')}" ${canNext ? '' : 'disabled'}>${ICON.chevR}</button>
      </div>
      <table class="cal-grid" aria-label="${monthLabel}">
        <thead><tr>${wd.map((w, i) => `<th scope="col" abbr="${wdFull[i]}">${w}</th>`).join('')}</tr></thead>
        <tbody>${rows.join('')}</tbody>
      </table>
      <p class="hint cal-hint">${t('cal.hint')}</p>`;
  }

  function rerenderDateStep(focusSel) {
    const scroll = body.scrollTop;
    body.innerHTML = viewDateTime();
    bindView();
    body.scrollTop = scroll;
    renderSummary();
    renderFooter();
    const el = focusSel && $(focusSel, body);
    if (el) el.focus({ preventScroll: true });
  }

  function pickDate(k) {
    state.date = k;
    const avail = slotsFor(k);
    if (state.slot && !avail.find(s => s.id === state.slot).available) state.slot = null;
    rerenderDateStep(`.day[data-date="${k}"]`);
  }

  function onCalKey(e) {
    const b = e.target.closest('.day');
    if (!b) return;
    const cur = parseIso(b.dataset.date);
    let next = null;
    const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) next = addDays(cur, map[e.key]);
    else if (e.key === 'Home') next = addDays(cur, -cur.getDay());
    else if (e.key === 'End') next = addDays(cur, 6 - cur.getDay());
    else if (e.key === 'PageUp') next = new Date(cur.getFullYear(), cur.getMonth() - 1, Math.min(cur.getDate(), 28));
    else if (e.key === 'PageDown') next = new Date(cur.getFullYear(), cur.getMonth() + 1, Math.min(cur.getDate(), 28));
    if (!next) return;
    e.preventDefault();
    if (next < MIN_DATE) next = MIN_DATE;
    if (next > MAX_DATE) next = MAX_DATE;
    if (next.getMonth() !== state.viewMonth.getMonth() || next.getFullYear() !== state.viewMonth.getFullYear()) {
      state.viewMonth = startOfMonth(next);
    }
    renderCal(iso(next));
    const nb = $(`.day[data-date="${iso(next)}"]`);
    if (nb) nb.focus();
  }

  /* ----- Validation ----- */

  const digits = v => v.replace(/\D/g, '');
  const localDigits = v => (state.form.cc === '+91' ? digits(v).replace(/^(91|0)(?=\d{10}$)/, '') : digits(v).replace(/^0+/, ''));
  const formatPhone = v => {
    const d = localDigits(v);
    return state.form.cc === '+91' && d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
  };

  const RULES = {
    name: v => (v.trim().length < 2 ? 'e.name' : ''),
    phone: v => {
      const d = localDigits(v);
      if (state.form.cc === '+91') return /^[6-9]\d{9}$/.test(d) ? '' : 'e.phoneIN';
      return /^\d{6,14}$/.test(d) ? '' : 'e.phoneIntl';
    },
    address: v => (v.trim().length < 8 ? 'e.address' : ''),
    area: v => (v ? '' : 'e.area'),
    pincode: v => (/^[1-9]\d{5}$/.test(v.trim()) ? '' : 'e.pincode'),
    city: v => (v.trim().length < 2 ? 'e.city' : '')
  };
  const activeRules = () => (isOnline() ? ['name', 'phone', 'city'] : ['name', 'phone', 'address', 'area', 'pincode']);
  const LABEL_KEY = { name: 'f.name', phone: 'f.phone', address: 'f.address', area: 'f.area', pincode: 'f.pincode', city: 'f.city' };

  function showFieldError(id, key) {
    const input = $(`#f-${id}`, body);
    const err = $(`#f-${id}-err`, body);
    if (!input || !err) return;
    err.textContent = key ? t(key) : '';
    if (key) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    input.closest('.field').classList.toggle('has-error', !!key);
  }

  function pincodeHint() {
    const hint = $('#f-pincode-hint', body);
    if (!hint) return;
    const v = state.form.pincode.trim();
    hint.textContent = /^\d{6}$/.test(v) && !/^41[12]/.test(v) ? t('f.pinOutside') : '';
  }

  function validateDetails() {
    const ids = activeRules();
    const errors = ids.map(k => [k, RULES[k](state.form[k] || '')]).filter(([, m]) => m);
    ids.forEach(k => showFieldError(k, (errors.find(([e]) => e === k) || [])[1] || ''));
    const sum = $('#err-summary', body);
    if (errors.length) {
      sum.innerHTML = `<p><strong>${errors.length === 1 ? t('e.summary1') : t('e.summaryN', { n: errors.length })}</strong></p>
        <ul>${errors.map(([k, m]) => `<li><a href="#f-${k}" data-focus="f-${k}">${t(LABEL_KEY[k]).replace(/<[^>]+>/g, '')}</a> — ${t(m)}</li>`).join('')}</ul>`;
      sum.hidden = false;
      sum.focus();
      sum.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return false;
    }
    sum.hidden = true;
    return true;
  }

  function setErr(id, msg) {
    const el = $(`#${id}`, body);
    if (el) el.textContent = msg;
  }

  function validateDateTime() {
    const r = ritual();
    let firstBad = null;
    setErr('days-err', ''); setErr('date-err', ''); setErr('slot-err', ''); setErr('tier-err', '');
    if (!r.perDay && !state.tier) { setErr('tier-err', t('tier.err')); firstBad = $('input[name="tier"]', body); }
    if (r.perDay && !state.days) { setErr('days-err', t('days.err')); firstBad = firstBad || $('input[name="days"]', body); }
    if (!state.date) { setErr('date-err', t('date.err')); firstBad = firstBad || $('.day[tabindex="0"]', body); }
    if (!state.muhurat && !state.slot) {
      setErr('slot-err', t('slot.err'));
      firstBad = firstBad || $('input[name="slot"]:not(:disabled)', body) || $('input[name="muhurat"]', body);
    }
    if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' }); return false; }
    return true;
  }

  /* ----- Event binding per view ----- */

  function bindView() {
    if (state.step === 'pick') {
      $$('input[name="pick"]', body).forEach(i => i.addEventListener('change', () => {
        setRitual(i.value);
        setErr('pick-err', '');
        renderFooter();
      }));
    }
    if (state.step === 'datetime') {
      renderCal();
      $$('input[name="mode"]', body).forEach(i => i.addEventListener('change', () => {
        state.mode = i.value;
        rerenderDateStep(`input[name="mode"][value="${i.value}"]`);
      }));
      $$('input[name="tier"]', body).forEach(i => i.addEventListener('change', () => {
        state.tier = Number(i.value); setErr('tier-err', ''); renderFooter();
      }));
      $$('input[name="days"]', body).forEach(i => i.addEventListener('change', () => {
        state.days = Number(i.value); setErr('days-err', ''); renderFooter(); renderSummary();
      }));
      $$('input[name="slot"]', body).forEach(i => i.addEventListener('change', () => {
        state.slot = i.value; setErr('slot-err', ''); renderSummary();
      }));
      const m = $('input[name="muhurat"]', body);
      m.addEventListener('change', () => {
        state.muhurat = m.checked;
        if (m.checked) setErr('slot-err', '');
        const avail = slotsFor(state.date);
        $$('input[name="slot"]', body).forEach((i, idx) => { i.disabled = m.checked || !avail[idx].available; });
        renderSummary();
      });
      const cal = $('#cal', body);
      cal.addEventListener('click', e => {
        const nav = e.target.closest('[data-cal]');
        if (nav) {
          const vm = state.viewMonth;
          state.viewMonth = new Date(vm.getFullYear(), vm.getMonth() + Number(nav.dataset.cal), 1);
          renderCal();
          const again = $(`[data-cal="${nav.dataset.cal}"]`, cal);
          (again && !again.disabled ? again : $('.day[tabindex="0"]', cal)).focus();
          return;
        }
        const day = e.target.closest('.day');
        if (!day) return;
        if (day.getAttribute('aria-disabled') === 'true') {
          setErr('date-err', day.classList.contains('is-booked') ? t('date.booked') : t('date.closed'));
          return;
        }
        setErr('date-err', '');
        pickDate(day.dataset.date);
      });
      cal.addEventListener('keydown', onCalKey);
    }
    if (state.step === 'details') {
      const form = $('#details-form', body);
      const sync = tgt => { state.form[tgt.name] = tgt.type === 'checkbox' ? tgt.checked : tgt.value; };
      form.addEventListener('input', e => {
        const tg = e.target;
        if (!tg.name) return;
        sync(tg);
        if (state.touched[tg.name] && RULES[tg.name]) showFieldError(tg.name, RULES[tg.name](tg.value));
        if (tg.name === 'pincode') pincodeHint();
      });
      form.addEventListener('change', e => {
        const tg = e.target;
        if (!tg.name) return;
        sync(tg);
        if (tg.name === 'cc' && state.touched.phone) showFieldError('phone', RULES.phone(state.form.phone));
        if (tg.name === 'area') { state.touched.area = true; showFieldError('area', RULES.area(tg.value)); }
      });
      form.addEventListener('focusout', e => {
        const tg = e.target;
        if (!RULES[tg.name]) return;
        if (tg.value.trim() || state.touched[tg.name]) {
          state.touched[tg.name] = true;
          showFieldError(tg.name, RULES[tg.name](tg.value));
        }
        if (tg.name === 'phone' && !RULES.phone(tg.value)) { tg.value = formatPhone(tg.value); state.form.phone = tg.value; }
      });
      form.addEventListener('submit', e => { e.preventDefault(); next(); });
      $('#err-summary', body).addEventListener('click', e => {
        const a = e.target.closest('[data-focus]');
        if (!a) return;
        e.preventDefault();
        const el = document.getElementById(a.dataset.focus);
        el.focus(); el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      pincodeHint();
    }
    if (state.step === 'review') {
      $$('input[name="pay"]', body).forEach(i => i.addEventListener('change', () => { state.pay = i.value; }));
    }
    if (state.step === 'done') {
      $('#ics-btn', body).addEventListener('click', downloadIcs);
    }
  }

  /* ----- Navigation between steps ----- */

  function next() {
    switch (state.step) {
      case 'pick':
        if (!state.ritualId || (isOnline() && !ritual().online)) {
          setErr('pick-err', t('pick.err'));
          $('input[name="pick"]:not(:disabled)', body).focus();
          return;
        }
        return go('info');
      case 'info':
        if (!state.date) state.viewMonth = DEFAULT_MONTH;
        return go('datetime');
      case 'datetime':
        if (validateDateTime()) go('details');
        return;
      case 'details':
        activeRules().forEach(k => { state.touched[k] = true; });
        if (validateDetails()) go('review');
        return;
      case 'review':
        return pay();
      case 'done':
        return closeBooking();
    }
  }

  function back() {
    const prev = { info: 'pick', datetime: 'info', details: 'datetime', review: 'details' }[state.step];
    if (prev) go(prev);
  }

  // Front-end mock of a payment gateway hand-off. Nothing leaves the browser.
  function pay() {
    state.paying = true;
    renderFooter();
    const amt = inr(money().advance);
    $('#pay-status', body).textContent = t('pay.processing', { amt, method: payName() });
    const d = parseIso(state.date);
    state.ref = `RKG-${pad(d.getDate())}${pad(d.getMonth() + 1)}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    state.txn = `TXN${Date.now().toString().slice(-8)}`;
    setTimeout(() => { state.paying = false; go('done'); }, 1400);
  }

  function downloadIcs() {
    const r = ritual();
    const d = parseIso(state.date);
    const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const icsEsc = s => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
    let when;
    if (state.muhurat || !slotObj()) {
      when = `DTSTART;VALUE=DATE:${ymd}\r\nDTEND;VALUE=DATE:${iso(addDays(d, 1)).replace(/-/g, '')}`;
    } else {
      // Times are IST; stored as a fixed-offset UTC time so calendars abroad show the right local time.
      const s = slotObj();
      const startUtc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), s.start, 0) - 330 * 60000);
      const endUtc = new Date(startUtc.getTime() + r.mins * 60000);
      const z = x => x.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
      when = `DTSTART:${z(startUtc)}\r\nDTEND:${z(endUtc)}`;
    }
    const f = state.form;
    const location = isOnline() ? `${t('ics.online')} · ${f.platform}` : `${f.address}, ${areaLabel(f.area)} ${f.pincode}`;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Gurujee//Booking//EN', 'BEGIN:VEVENT',
      `UID:${state.ref}@gurujee`, `DTSTAMP:${stamp}`, when,
      `SUMMARY:${icsEsc(t('ics.summary', { name: L(r.name) }))}`,
      `LOCATION:${icsEsc(location)}`,
      `DESCRIPTION:${icsEsc(t('ics.desc', { ref: state.ref, phone: CONFIG.phoneDisplay }))}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url; a.download = `${r.id}-${state.date}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function wireBooking() {
    document.addEventListener('click', e => {
      const open = e.target.closest('[data-open]');
      if (open) { openBooking(open.dataset.open, open); return; }
      const online = e.target.closest('[data-book-online]');
      if (online) { openBooking(null, online, { mode: 'online' }); return; }
      const book = e.target.closest('[data-book]');
      if (book) openBooking(null, book);
    });
    btnNext.addEventListener('click', next);
    btnBack.addEventListener('click', back);
    $('[data-close]', dlg).addEventListener('click', () => closeBooking());
    dlg.addEventListener('cancel', e => { e.preventDefault(); if (!state.paying) closeBooking(); });
    dlg.addEventListener('click', e => {
      if (e.target === dlg && !state.paying) closeBooking(); // backdrop click (desktop)
      const g = e.target.closest('[data-goto]');
      if (g) go(g.dataset.goto);
      const j = e.target.closest('[data-jump]');
      if (j) go(JUMP_TO[Number(j.dataset.jump)]);
      const c = e.target.closest('[data-close-to]');
      if (c) { e.preventDefault(); closeBooking(); setTimeout(() => $('#' + c.dataset.closeTo).scrollIntoView({ behavior: 'smooth' }), 50); }
    });
    window.addEventListener('popstate', () => { if (dlg.open && !state.paying) closeBooking(true); });

    // Deep links for WhatsApp shares: #book, #book/griha-pravesh, #book-online; ?lang=en
    const m = location.hash.match(/^#book(-online)?(?:\/([\w-]+))?$/);
    if (m) {
      history.replaceState(null, '', location.pathname + location.search);
      openBooking(m[2] && byId(m[2]) ? m[2] : null, null, m[1] ? { mode: 'online' } : {});
    }
  }

  renderPage();
  wireOccasions();
  wireShowAll();
  renderArt();
  loadPhoto();
  wireNav();
  wireBooking();
})();
