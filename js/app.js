(() => {
  'use strict';

  const { CONFIG, RITUALS, OCCASIONS, SLOTS, GANESH_DAYS, AREAS, GALLERY } = window.SITE;
  const Art = window.Art;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = id => RITUALS.find(r => r.id === id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const priceText = r => (r.perDay ? `${inr(r.price.min)} / day` : `${inr(r.price.min)} – ${inr(r.price.max).slice(1)}`);
  const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

  const ICON = {
    clock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- Static page wiring ---------- */

  function wireContacts() {
    $$('.js-wa').forEach(a => {
      a.href = waLink(a.dataset.waText || 'Namaskar Guruji');
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
      const k = el.dataset.art;
      el.innerHTML = k === 'hero' ? Art.hero() : k === 'lotus' ? Art.lotus() : Art.motif(k);
    });
  }

  function renderCards() {
    $('#ritual-grid').innerHTML = RITUALS.map(r => `
      <li class="rcard" data-id="${r.id}">
        <div class="rcard-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</div>
        <div class="rcard-body">
          ${r.badge ? `<span class="badge">${r.badge}</span>` : ''}
          <h3 class="rcard-title">${r.name}${r.en ? ` <span class="rcard-en">(${r.en})</span>` : ''}</h3>
          <p class="rcard-mr" lang="mr">${r.mr}</p>
          <p class="rcard-short">${r.short}</p>
          <p class="rcard-meta">
            <span>${ICON.clock}${r.perDay ? 'Per festival day' : r.durationLabel}</span>
            <span class="rcard-price">${priceText(r)}</span>
          </p>
          <button class="rcard-cta" type="button" data-open="${r.id}">
            <span>Details &amp; booking</span>${ICON.arrow}
            <span class="sr-only">for ${r.name}</span>
          </button>
        </div>
      </li>`).join('') + `
      <li class="rcard rcard-ask">
        <div class="rcard-body">
          <h3 class="rcard-title">Don’t see your ceremony?</h3>
          <p class="rcard-short">Guruji performs many other family pujas and samskaras on request. Tell him the occasion and he’ll suggest what’s appropriate.</p>
          <a class="btn btn-ghost js-wa" href="#" data-wa-text="Namaskar Guruji, I would like to ask about a ceremony that isn't listed on your site.">Ask on WhatsApp</a>
        </div>
      </li>`;
  }

  function renderOccasions() {
    const wrap = $('#occasion-chips');
    wrap.innerHTML = OCCASIONS.map(o =>
      `<button type="button" class="chip" data-occ="${o.id}" aria-pressed="${o.id === 'all'}">${o.label}</button>`).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-occ]');
      if (!b) return;
      const id = b.dataset.occ;
      $$('.chip', wrap).forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      let shown = 0;
      $$('.rcard').forEach(card => {
        const r = byId(card.dataset.id);
        const match = !r || id === 'all' || r.occasions.includes(id);
        card.hidden = !match;
        if (match && r) shown++;
      });
      const occ = OCCASIONS.find(o => o.id === id);
      $('#occ-status').textContent = id === 'all' ? '' :
        `${shown} ceremon${shown === 1 ? 'y' : 'ies'} suited to “${occ.label.toLowerCase()}”. Not sure which? Guruji can advise on the call.`;
    });
  }

  function renderGallery() {
    $('#gallery-grid').innerHTML = GALLERY.map(g => `
      <li class="gal ${g.span ? 'gal-' + g.span : ''}">
        <figure>
          <div class="gal-art tone-${g.tone}" role="img" aria-label="Illustration: ${esc(g.title)}">${Art.motif(g.motif)}</div>
          <figcaption><strong>${g.title}</strong><span>${g.place} · ${g.when}</span></figcaption>
        </figure>
      </li>`).join('');
  }

  function renderAreas() {
    $('#area-cols').innerHTML = Object.entries(AREAS).map(([city, list]) => `
      <div class="area-col">
        <h3 class="area-city">${city}</h3>
        <ul class="area-list">${list.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>`).join('');
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
      const heroActions = $('.hero-actions');
      new IntersectionObserver(([en]) => qb.classList.toggle('is-visible', !en.isIntersecting))
        .observe(heroActions);
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
  const fmtLong = d => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = d => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

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
  const STATUS_TEXT = { open: 'available', few: 'few slots left', booked: 'fully booked', out: 'not available for booking' };

  /* ---------- Booking flow ---------- */

  const dlg = $('#booking');
  const body = $('#bk-body');
  const btnNext = $('#bk-next');
  const btnBack = $('#bk-back');

  const STEPS = ['Ceremony', 'Date & time', 'Your details', 'Review'];
  const STEP_INDEX = { pick: 0, info: 0, datetime: 1, details: 2, review: 3, done: 4 };
  const JUMP_TO = ['info', 'datetime', 'details', 'review'];

  const freshState = () => ({
    step: 'pick', ritualId: null, days: null, date: null, slot: null, muhurat: false,
    viewMonth: DEFAULT_MONTH,
    form: { name: '', phone: '', whatsapp: true, address: '', area: '', pincode: '', lang: 'Marathi', notes: '' },
    touched: {}, ref: null
  });
  let state = freshState();
  let lastTrigger = null;

  const ritual = () => byId(state.ritualId);
  const slotObj = () => SLOTS.find(s => s.id === state.slot);

  function estimate() {
    const r = ritual();
    if (!r) return '';
    if (r.perDay) return state.days ? inr(r.price.min * state.days) : `${inr(r.price.min)} / day`;
    return priceText(r);
  }

  function openBooking(id, trigger) {
    lastTrigger = trigger || document.activeElement;
    if (state.step === 'done') state = freshState();
    if (id) {
      if (id !== state.ritualId) { state.ritualId = id; state.days = null; }
      state.step = 'info';
    } else if (!state.ritualId) {
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

  function render() {
    renderSteps();
    renderSummary();
    const views = { pick: viewPick, info: viewInfo, datetime: viewDateTime, details: viewDetails, review: viewReview, done: viewDone };
    body.innerHTML = views[state.step]();
    body.scrollTop = 0;
    bindView();
    renderFooter();
    const h = $('.bk-h', body);
    if (h) h.focus({ preventScroll: true });
  }

  function renderSteps() {
    const cur = STEP_INDEX[state.step];
    $('#bk-steps').innerHTML = STEPS.map((label, i) => {
      const done = i < cur;
      const current = i === cur;
      const canJump = done && state.step !== 'done';
      const inner = `<span class="st-n" aria-hidden="true">${done ? ICON.check : i + 1}</span><span class="st-l">${label}</span>${done ? '<span class="sr-only"> (completed)</span>' : ''}`;
      return `<li class="${done ? 'is-done' : ''} ${current ? 'is-current' : ''}" ${current ? 'aria-current="step"' : ''}>
        ${canJump ? `<button type="button" data-jump="${i}">${inner}</button>` : `<span class="st">${inner}</span>`}
      </li>`;
    }).join('');
  }

  function renderSummary() {
    const el = $('#bk-summary');
    const r = ritual();
    if (!r || state.step === 'pick' || state.step === 'done') { el.hidden = true; return; }
    const parts = [`<strong>${r.name}</strong>`];
    if (r.perDay && state.days) parts.push(GANESH_DAYS.find(d => d.v === state.days).label);
    if (state.date) parts.push(fmtShort(parseIso(state.date)));
    if (state.muhurat) parts.push('Muhurat by Guruji');
    else if (slotObj()) parts.push(slotObj().label);
    el.innerHTML = parts.join('<span aria-hidden="true"> · </span>');
    el.hidden = false;
  }

  function renderFooter() {
    const cfg = {
      pick: { back: null, next: 'Continue' },
      info: { back: 'Back', next: 'Pick a date' },
      datetime: { back: 'Back', next: 'Continue' },
      details: { back: 'Back', next: 'Review booking' },
      review: { back: 'Back', next: 'Send booking request' },
      done: { back: null, next: 'Done' }
    }[state.step];
    btnBack.hidden = !cfg.back;
    btnBack.textContent = cfg.back || '';
    btnNext.textContent = cfg.next;
    btnNext.removeAttribute('aria-busy');
    btnNext.disabled = false;
    const est = estimate();
    $('#bk-est').innerHTML = est && ['pick', 'info', 'datetime', 'details'].includes(state.step)
      ? `<span class="bk-est-k">Dakshina${ritual().perDay && state.days ? ' (est.)' : ''}</span><span class="bk-est-v">${est}</span>`
      : '';
  }

  /* ----- Views ----- */

  function viewPick() {
    return `
      <h2 class="bk-h" tabindex="-1">Which ceremony would you like?</h2>
      <p class="bk-sub">Not sure? Choose the closest one — Guruji will guide you on the call.</p>
      <fieldset class="pick-list" aria-describedby="pick-err">
        <legend class="sr-only">Ceremony</legend>
        ${RITUALS.map(r => `
          <label class="pick">
            <input type="radio" name="pick" value="${r.id}" ${state.ritualId === r.id ? 'checked' : ''}>
            <span class="pick-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</span>
            <span class="pick-text">
              <span class="pick-name">${r.name}</span>
              <span class="pick-mr" lang="mr">${r.mr}</span>
              <span class="pick-meta">${r.perDay ? 'Per festival day' : r.durationLabel} · ${priceText(r)}</span>
            </span>
            <span class="pick-radio" aria-hidden="true"></span>
          </label>`).join('')}
      </fieldset>
      <p class="field-err" id="pick-err"></p>`;
  }

  function viewInfo() {
    const r = ritual();
    return `
      <div class="info-top">
        <div class="info-art tone-${r.tone}" aria-hidden="true">${Art.motif(r.motif)}</div>
        <div>
          <h2 class="bk-h" tabindex="-1">${r.name}${r.en ? ` <span class="info-en">(${r.en})</span>` : ''}</h2>
          <p class="info-mr" lang="mr">${r.mr}</p>
          <button type="button" class="link-btn" data-goto="pick">Change ceremony</button>
        </div>
      </div>
      <p class="info-lead">${r.about}</p>
      <dl class="facts">
        <div><dt>Duration</dt><dd>${r.durationLabel}</dd></div>
        <div><dt>Dakshina</dt><dd>${priceText(r)}</dd></div>
        <div><dt>Samagri</dt><dd>${r.samagri}</dd></div>
      </dl>
      <div class="why">
        <p class="why-k">Why this matters</p>
        <p>${r.why}</p>
      </div>
      <h3 class="bk-h3">Good for</h3>
      <ul class="tags">${r.goodFor.map(g => `<li>${g}</li>`).join('')}</ul>
      <div class="info-cols">
        <section>
          <h3 class="bk-h3">Guruji brings</h3>
          <ul class="ticks">${r.included.map(i => `<li>${ICON.check}<span>${i}</span></li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="bk-h3">Your family arranges</h3>
          <ul class="bullets">${r.arrange.map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
      </div>
      <h3 class="bk-h3">Before the day</h3>
      <ol class="prep">${r.prep.map(i => `<li>${i}</li>`).join('')}</ol>
      <p class="reassure">Unsure about any of this? That’s normal. Guruji walks every family through it on the confirmation call and sends the full checklist on WhatsApp.</p>`;
  }

  function viewDateTime() {
    const r = ritual();
    const slots = slotsFor(state.date);
    const daysBlock = r.perDay ? `
      <fieldset class="group" aria-describedby="days-err">
        <legend class="lbl">How many days will Ganpati stay?</legend>
        <div class="seg">
          ${GANESH_DAYS.map(d => `
            <label class="seg-opt"><input type="radio" name="days" value="${d.v}" ${state.days === d.v ? 'checked' : ''}>
              <span><strong>${d.label}</strong><small>${inr(r.price.min * d.v)}</small></span></label>`).join('')}
        </div>
        <p class="field-err" id="days-err"></p>
      </fieldset>` : '';
    const hintSlot = SLOTS.find(s => s.id === r.slotHint);
    return `
      <h2 class="bk-h" tabindex="-1">When should Guruji come?</h2>
      <p class="bk-sub">Pick a preferred date and an approximate time. Guruji confirms the exact muhurat when he calls.</p>
      ${daysBlock}
      <fieldset class="group" aria-describedby="date-err">
        <legend class="lbl">${r.perDay ? 'Sthapana (first) day' : 'Date'}</legend>
        <div class="cal" id="cal"></div>
        <ul class="cal-legend" aria-hidden="true">
          <li><span class="lg lg-open"></span>Available</li>
          <li><span class="lg lg-few"></span>Few slots left</li>
          <li><span class="lg lg-booked"></span>Fully booked</li>
        </ul>
        <p class="field-err" id="date-err"></p>
      </fieldset>
      <fieldset class="group" aria-describedby="slot-hint slot-err">
        <legend class="lbl">Approximate time</legend>
        <p class="hint" id="slot-hint">${state.date ? `Showing times for ${fmtLong(parseIso(state.date))}.` : 'Choose a date to see which times are free.'}
          ${hintSlot ? ` ${r.name} is most often done in the <strong>${hintSlot.label.toLowerCase()}</strong>.` : ''}</p>
        <div class="slots">
          ${slots.map(s => `
            <label class="slot ${!s.available ? 'is-off' : ''}">
              <input type="radio" name="slot" value="${s.id}" ${state.slot === s.id ? 'checked' : ''} ${!s.available || state.muhurat ? 'disabled' : ''}>
              <span class="slot-l">${s.label}</span>
              <span class="slot-r">${s.available ? s.range : 'Booked'}</span>
            </label>`).join('')}
        </div>
        <label class="check">
          <input type="checkbox" name="muhurat" ${state.muhurat ? 'checked' : ''}>
          <span>I’m flexible — please suggest the most auspicious time on this day</span>
        </label>
        <p class="field-err" id="slot-err"></p>
      </fieldset>`;
  }

  function field({ id, label, type = 'text', hint = '', attrs = '', affix = '' }) {
    const v = esc(state.form[id] || '');
    const input = type === 'textarea'
      ? `<textarea id="f-${id}" name="${id}" rows="3" ${attrs} aria-describedby="f-${id}-hint f-${id}-err">${v}</textarea>`
      : `<input id="f-${id}" name="${id}" type="${type}" value="${v}" ${attrs} aria-describedby="f-${id}-hint f-${id}-err">`;
    return `
      <div class="field" data-field="${id}">
        <label for="f-${id}">${label}</label>
        ${affix ? `<div class="affix"><span aria-hidden="true">${affix}</span>${input}</div>` : input}
        <p class="hint" id="f-${id}-hint">${hint}</p>
        <p class="field-err" id="f-${id}-err"></p>
      </div>`;
  }

  function viewDetails() {
    const f = state.form;
    const areaOpts = Object.entries(AREAS).map(([city, list]) =>
      `<optgroup label="${city}">${list.map(a => `<option ${f.area === a ? 'selected' : ''}>${a}</option>`).join('')}</optgroup>`).join('');
    return `
      <h2 class="bk-h" tabindex="-1">Your details</h2>
      <p class="bk-sub">Shared only with Ramakant Guruji, to confirm this booking.</p>
      <div class="err-summary" id="err-summary" tabindex="-1" hidden></div>
      <form id="details-form" novalidate>
        ${field({ id: 'name', label: 'Full name', attrs: 'autocomplete="name" required' })}
        ${field({ id: 'phone', label: 'Mobile number', type: 'tel', affix: '+91', hint: 'Guruji will call this number to confirm.', attrs: 'autocomplete="tel-national" inputmode="numeric" maxlength="14" required' })}
        <label class="check check-tight">
          <input type="checkbox" name="whatsapp" ${f.whatsapp ? 'checked' : ''}>
          <span>This number is on WhatsApp (for the samagri list)</span>
        </label>
        ${field({ id: 'address', label: 'Address', type: 'textarea', hint: 'Flat / house no., building, street, landmark', attrs: 'autocomplete="street-address" required' })}
        <div class="field-row">
          <div class="field" data-field="area">
            <label for="f-area">Area</label>
            <select id="f-area" name="area" required aria-describedby="f-area-err">
              <option value="" ${!f.area ? 'selected' : ''}>Select your area</option>
              ${areaOpts}
              <optgroup label="Elsewhere"><option ${f.area === 'Other area' ? 'selected' : ''}>Other area</option></optgroup>
            </select>
            <p class="field-err" id="f-area-err"></p>
          </div>
          ${field({ id: 'pincode', label: 'Pincode', attrs: 'autocomplete="postal-code" inputmode="numeric" maxlength="6" required' })}
        </div>
        <fieldset class="group">
          <legend class="lbl">Explanations preferably in</legend>
          <div class="seg seg-3">
            ${['Marathi', 'Hindi', 'English'].map(l => `
              <label class="seg-opt"><input type="radio" name="lang" value="${l}" ${f.lang === l ? 'checked' : ''}><span><strong>${l}</strong></span></label>`).join('')}
          </div>
        </fieldset>
        ${field({ id: 'notes', label: 'Anything Guruji should know? <span class="opt">(optional)</span>', type: 'textarea', hint: 'e.g. gotra if known, number of guests, an elder who can’t sit on the floor, parking directions.' })}
      </form>`;
  }

  function viewReview() {
    const r = ritual();
    const f = state.form;
    const d = state.date ? fmtLong(parseIso(state.date)) : '';
    const time = state.muhurat ? 'Guruji to suggest the muhurat' : `${slotObj().label}, ${slotObj().range}`;
    return `
      <h2 class="bk-h" tabindex="-1">Review your request</h2>
      <p class="bk-sub">Nothing is charged now. The booking is final only after Guruji calls you.</p>
      <div class="review-card">
        <div class="rv-row">
          <div><p class="rv-k">Ceremony</p><p class="rv-v">${r.name}</p>
            <p class="rv-s">${r.perDay && state.days ? GANESH_DAYS.find(x => x.v === state.days).label + ' · ' : ''}${r.durationLabel} · Samagri: ${r.samagri.toLowerCase()}</p></div>
          <button type="button" class="link-btn" data-goto="info">Change<span class="sr-only"> ceremony</span></button>
        </div>
        <div class="rv-row">
          <div><p class="rv-k">Date &amp; time</p><p class="rv-v">${d}</p><p class="rv-s">${time}</p></div>
          <button type="button" class="link-btn" data-goto="datetime">Change<span class="sr-only"> date and time</span></button>
        </div>
        <div class="rv-row">
          <div><p class="rv-k">Where &amp; who</p>
            <p class="rv-v">${esc(f.name)}</p>
            <p class="rv-s">+91 ${esc(formatPhone(f.phone))}${f.whatsapp ? ' · WhatsApp' : ''}</p>
            <p class="rv-s">${esc(f.address)}, ${esc(f.area)} ${esc(f.pincode)}</p>
            <p class="rv-s">Explanations in ${f.lang}</p>
            ${f.notes.trim() ? `<p class="rv-s rv-notes">“${esc(f.notes.trim())}”</p>` : ''}
          </div>
          <button type="button" class="link-btn" data-goto="details">Edit<span class="sr-only"> your details</span></button>
        </div>
        <div class="rv-total">
          <div><p class="rv-k">Dakshina${r.perDay ? '' : ' range'}</p><p class="rv-price">${estimate()}</p></div>
          <p class="rv-s">Travel within Pune &amp; PCMC included. Final amount agreed on the call; pay <strong>after</strong> the ceremony by UPI or cash.</p>
        </div>
      </div>
      <h3 class="bk-h3">What happens next</h3>
      <ol class="timeline">
        <li><strong>Guruji calls you ${CONFIG.responseTime}</strong><span>Between ${CONFIG.callHours}, to confirm the date, muhurat and dakshina.</span></li>
        <li><strong>You get a samagri &amp; preparation list</strong><span>On WhatsApp, in your preferred language.</span></li>
        <li><strong>Guruji arrives 20–30 minutes early</strong><span>To set up quietly before the family gathers.</span></li>
        <li><strong>Pay after the ceremony</strong><span>No advance, no hidden charges.</span></li>
      </ol>`;
  }

  function viewDone() {
    const r = ritual();
    const f = state.form;
    const first = esc(f.name.trim().split(/\s+/)[0]);
    const time = state.muhurat ? 'Muhurat to be suggested' : `${slotObj().label} (${slotObj().range})`;
    const waText = `Namaskar Guruji, I have just requested ${r.name} on ${fmtLong(parseIso(state.date))} (${time}). Ref ${state.ref}. — ${f.name.trim()}`;
    return `
      <div class="done">
        <div class="done-mark" aria-hidden="true">${ICON.check}</div>
        <h2 class="bk-h" tabindex="-1">Request sent, ${first}</h2>
        <p class="done-lead">Ramakant Guruji will call you on <strong>+91 ${esc(formatPhone(f.phone))}</strong> ${CONFIG.responseTime} to confirm.</p>
        <div class="ticket">
          <div class="ticket-head"><span class="rv-k">Booking reference</span><span class="ticket-ref">${state.ref}</span></div>
          <dl>
            <div><dt>Ceremony</dt><dd>${r.name}${r.perDay && state.days ? ` · ${GANESH_DAYS.find(x => x.v === state.days).label}` : ''}</dd></div>
            <div><dt>Date</dt><dd>${fmtLong(parseIso(state.date))}</dd></div>
            <div><dt>Time</dt><dd>${time}</dd></div>
            <div><dt>Where</dt><dd>${esc(f.area)}, ${esc(f.pincode)}</dd></div>
            <div><dt>Dakshina</dt><dd>${estimate()} · pay after</dd></div>
            <div><dt>Status</dt><dd><span class="status"><span class="dot-live" aria-hidden="true"></span>Awaiting Guruji’s call</span></dd></div>
          </dl>
        </div>
        <div class="done-actions">
          <button type="button" class="btn btn-ghost" id="ics-btn">Add to calendar</button>
          <a class="btn btn-wa" href="${waLink(waText)}" target="_blank" rel="noopener">Send details on WhatsApp</a>
        </div>
        <h3 class="bk-h3">Meanwhile, you can start preparing</h3>
        <ol class="prep">${r.prep.map(i => `<li>${i}</li>`).join('')}</ol>
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

    // Which day in this month holds the roving tab stop
    let tabIso = focusIso;
    if (!tabIso || parseIso(tabIso).getMonth() !== vm.getMonth()) {
      if (state.date && parseIso(state.date).getMonth() === vm.getMonth() && parseIso(state.date).getFullYear() === vm.getFullYear()) tabIso = state.date;
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
        aria-label="${fmtLong(dt)}, ${STATUS_TEXT[st]}">${d}</button></td>`);
    }
    while (cells.length % 7) cells.push('<td></td>');
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(`<tr>${cells.slice(i, i + 7).join('')}</tr>`);

    const monthLabel = vm.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    cal.innerHTML = `
      <div class="cal-head">
        <button type="button" class="icon-btn" data-cal="-1" aria-label="Previous month" ${canPrev ? '' : 'disabled'}>${ICON.chevL}</button>
        <p class="cal-month" aria-live="polite">${monthLabel}</p>
        <button type="button" class="icon-btn" data-cal="1" aria-label="Next month" ${canNext ? '' : 'disabled'}>${ICON.chevR}</button>
      </div>
      <table class="cal-grid" aria-label="${monthLabel}">
        <thead><tr>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(w => `<th scope="col" abbr="${w}">${w[0]}</th>`).join('')}</tr></thead>
        <tbody>${rows.join('')}</tbody>
      </table>
      <p class="hint cal-hint">Use arrow keys to move between days. Need a date tomorrow or sooner? Please WhatsApp Guruji.</p>`;
  }

  function pickDate(k) {
    state.date = k;
    const avail = slotsFor(k);
    if (state.slot && !avail.find(s => s.id === state.slot).available) state.slot = null;
    // Re-render the date step but keep focus on the chosen day
    const scroll = body.scrollTop;
    body.innerHTML = viewDateTime();
    bindView();
    body.scrollTop = scroll;
    renderSummary();
    const btn = $(`.day[data-date="${k}"]`, body);
    if (btn) btn.focus({ preventScroll: true });
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

  const digits = v => v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const formatPhone = v => { const d = digits(v); return d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : v; };

  const RULES = {
    name: v => (v.trim().length < 2 ? 'Please enter your name.' : ''),
    phone: v => (/^[6-9]\d{9}$/.test(digits(v)) ? '' : 'Please enter a 10-digit Indian mobile number, e.g. 98220 12345.'),
    address: v => (v.trim().length < 8 ? 'Please add the flat or house number and building or street.' : ''),
    area: v => (v ? '' : 'Please choose your area.'),
    pincode: v => (/^[1-9]\d{5}$/.test(v.trim()) ? '' : 'Please enter a 6-digit pincode.')
  };
  const LABELS = { name: 'Full name', phone: 'Mobile number', address: 'Address', area: 'Area', pincode: 'Pincode' };

  function showFieldError(id, msg) {
    const input = $(`#f-${id}`, body);
    const err = $(`#f-${id}-err`, body);
    if (!input || !err) return;
    err.textContent = msg;
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    input.closest('.field').classList.toggle('has-error', !!msg);
  }

  function pincodeHint() {
    const hint = $('#f-pincode-hint', body);
    if (!hint) return;
    const v = state.form.pincode.trim();
    hint.textContent = /^\d{6}$/.test(v) && !/^41[12]/.test(v)
      ? 'This looks outside Pune & PCMC — Guruji travels on request; travel may be extra.'
      : '';
  }

  function validateDetails() {
    const errors = Object.keys(RULES).map(k => [k, RULES[k](state.form[k] || '')]).filter(([, m]) => m);
    Object.keys(RULES).forEach(k => showFieldError(k, (errors.find(([e]) => e === k) || [])[1] || ''));
    const sum = $('#err-summary', body);
    if (errors.length) {
      sum.innerHTML = `<p><strong>Please check ${errors.length === 1 ? 'one field' : errors.length + ' fields'}:</strong></p>
        <ul>${errors.map(([k, m]) => `<li><a href="#f-${k}" data-focus="f-${k}">${LABELS[k]}</a> — ${m}</li>`).join('')}</ul>`;
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
    setErr('days-err', ''); setErr('date-err', ''); setErr('slot-err', '');
    if (r.perDay && !state.days) { setErr('days-err', 'Please choose how many days.'); firstBad = firstBad || $('input[name="days"]', body); }
    if (!state.date) { setErr('date-err', 'Please choose a date.'); firstBad = firstBad || $('.day[tabindex="0"]', body); }
    if (!state.muhurat && !state.slot) {
      setErr('slot-err', 'Please choose an approximate time, or tick “I’m flexible”.');
      firstBad = firstBad || $('input[name="slot"]:not(:disabled)', body) || $('input[name="muhurat"]', body);
    }
    if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' }); return false; }
    return true;
  }

  /* ----- Event binding per view ----- */

  function bindView() {
    if (state.step === 'pick') {
      $$('input[name="pick"]', body).forEach(i => i.addEventListener('change', () => {
        if (i.value !== state.ritualId) { state.ritualId = i.value; state.days = null; }
        setErr('pick-err', '');
        renderFooter();
      }));
    }
    if (state.step === 'datetime') {
      renderCal();
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
          setErr('date-err', day.classList.contains('is-booked')
            ? 'That day is fully booked — please choose another, or WhatsApp Guruji.'
            : 'That date isn’t open for online booking.');
          return;
        }
        setErr('date-err', '');
        pickDate(day.dataset.date);
      });
      cal.addEventListener('keydown', onCalKey);
    }
    if (state.step === 'details') {
      const form = $('#details-form', body);
      form.addEventListener('input', e => {
        const t = e.target;
        if (!t.name) return;
        state.form[t.name] = t.type === 'checkbox' ? t.checked : t.value;
        if (state.touched[t.name] && RULES[t.name]) showFieldError(t.name, RULES[t.name](t.value));
        if (t.name === 'pincode') pincodeHint();
      });
      form.addEventListener('change', e => {
        const t = e.target;
        if (t.name) state.form[t.name] = t.type === 'checkbox' ? t.checked : t.value;
        if (t.tagName === 'SELECT') { state.touched[t.name] = true; showFieldError(t.name, RULES[t.name](t.value)); }
      });
      form.addEventListener('focusout', e => {
        const t = e.target;
        if (!RULES[t.name]) return;
        if (t.value.trim() || state.touched[t.name]) {
          state.touched[t.name] = true;
          showFieldError(t.name, RULES[t.name](t.value));
        }
        if (t.name === 'phone' && !RULES.phone(t.value)) { t.value = formatPhone(t.value); state.form.phone = t.value; }
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
    if (state.step === 'done') {
      $('#ics-btn', body).addEventListener('click', downloadIcs);
    }
  }

  /* ----- Navigation between steps ----- */

  function next() {
    switch (state.step) {
      case 'pick':
        if (!state.ritualId) {
          setErr('pick-err', 'Please choose a ceremony to continue.');
          $('input[name="pick"]', body).focus();
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
        Object.keys(RULES).forEach(k => { state.touched[k] = true; });
        if (validateDetails()) go('review');
        return;
      case 'review':
        return submit();
      case 'done':
        return closeBooking();
    }
  }

  function back() {
    const prev = { info: 'pick', datetime: 'info', details: 'datetime', review: 'details' }[state.step];
    if (prev) go(prev);
  }

  function submit() {
    btnNext.disabled = true;
    btnNext.setAttribute('aria-busy', 'true');
    btnNext.textContent = 'Sending…';
    btnBack.hidden = true;
    const d = parseIso(state.date);
    state.ref = `RKG-${pad(d.getDate())}${pad(d.getMonth() + 1)}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setTimeout(() => go('done'), 900);
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
      const s = slotObj();
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), s.start, r.durationMins);
      when = `DTSTART:${ymd}T${pad(s.start)}0000\r\nDTEND:${ymd}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
    }
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Gurujee//Booking//EN', 'BEGIN:VEVENT',
      `UID:${state.ref}@gurujee`, `DTSTAMP:${stamp}`, when,
      `SUMMARY:${icsEsc(r.name + ' with Ramakant Guruji (to be confirmed)')}`,
      `LOCATION:${icsEsc(`${state.form.address}, ${state.form.area} ${state.form.pincode}`)}`,
      `DESCRIPTION:${icsEsc(`Ref ${state.ref}. Guruji will call to confirm the muhurat. Contact: ${CONFIG.phoneDisplay}`)}`,
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
      const book = e.target.closest('[data-book]');
      if (book) openBooking(null, book);
    });
    btnNext.addEventListener('click', next);
    btnBack.addEventListener('click', back);
    $('[data-close]', dlg).addEventListener('click', () => closeBooking());
    dlg.addEventListener('cancel', e => { e.preventDefault(); closeBooking(); });
    dlg.addEventListener('click', e => {
      if (e.target === dlg) closeBooking(); // backdrop click (desktop)
      const g = e.target.closest('[data-goto]');
      if (g) go(g.dataset.goto);
      const j = e.target.closest('[data-jump]');
      if (j) go(JUMP_TO[Number(j.dataset.jump)]);
    });
    window.addEventListener('popstate', () => { if (dlg.open) closeBooking(true); });

    // Deep link, e.g. index.html#book/griha-pravesh — handy for WhatsApp shares.
    const m = location.hash.match(/^#book(?:\/([\w-]+))?$/);
    if (m) {
      history.replaceState(null, '', location.pathname + location.search);
      openBooking(m[1] && byId(m[1]) ? m[1] : null);
    }
  }

  renderCards();
  wireContacts();
  renderArt();
  renderOccasions();
  renderGallery();
  renderAreas();
  wireNav();
  wireBooking();
})();
