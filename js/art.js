/* Placeholder illustrations: flat, quiet still-lifes drawn as inline SVG.
   Stand-ins for real ceremony photos — no people, no deity imagery. */
window.Art = (() => {
  const C = {
    copper: '#B0613A', copperDk: '#8A4527', copperLt: '#C97B52',
    leaf: '#56714F', leafDk: '#3D5638',
    haldi: '#D9A43B', haldiLt: '#F0CB6A',
    marigold: '#D57A2A', kumkum: '#A3412A',
    rice: '#F6EEDF', cream: '#FBF5EA', sand: '#E3CFAF',
    ink: '#2B2620', coconut: '#6F4A2F'
  };

  const svg = (inner, vb = '0 0 200 200', fit = 'meet') =>
    `<svg viewBox="${vb}" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid ${fit}">${inner}</svg>`;

  const at = (inner, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;

  function kalash() {
    const leaves = [-56, -28, 0, 28, 56]
      .map((a, i) => `<ellipse cx="100" cy="50" rx="8.5" ry="29" fill="${i % 2 ? C.leaf : C.leafDk}" transform="rotate(${a} 100 82)"/>`)
      .join('');
    const dots = [70, 85, 100, 115, 130].map(x => `<circle cx="${x}" cy="${128 + Math.abs(x - 100) * -0.12}" r="2.4" fill="${C.haldiLt}"/>`).join('');
    return `
      <ellipse cx="100" cy="175" rx="40" ry="5" fill="#000" opacity=".08"/>
      ${leaves}
      <ellipse cx="100" cy="62" rx="17" ry="19" fill="${C.coconut}"/>
      <path d="M92 50 q8 -10 16 0" stroke="#8B6243" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="82" rx="25" ry="6" fill="${C.copperDk}"/>
      <path d="M83 82 h34 l-4 13 h-26 z" fill="${C.copper}"/>
      <path d="M87 94 C60 98 50 118 53 136 C57 160 78 173 100 173 C122 173 143 160 147 136 C150 118 140 98 113 94 Z" fill="${C.copper}"/>
      <path d="M56 122 Q100 134 144 122" stroke="${C.haldi}" stroke-width="3" fill="none"/>
      ${dots}
      <path d="M68 116 C69 107 76 101 86 99" stroke="#fff" stroke-opacity=".28" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }

  function diya() {
    return `
      <circle cx="62" cy="86" r="50" fill="${C.haldiLt}" opacity=".16"/>
      <circle cx="62" cy="86" r="30" fill="${C.haldiLt}" opacity=".22"/>
      <path d="M62 54 C75 74 77 90 62 106 C47 90 49 74 62 54 Z" fill="${C.marigold}"/>
      <path d="M62 72 C68 84 68 94 62 102 C56 94 56 84 62 72 Z" fill="${C.haldiLt}"/>
      <path d="M62 104 v8" stroke="${C.ink}" stroke-width="2"/>
      <path d="M44 112 Q56 104 76 110 Q110 108 152 108 Q148 146 104 150 Q72 150 62 126 Q52 122 44 112 Z" fill="${C.copper}"/>
      <path d="M78 111 Q115 104 150 109" stroke="${C.copperDk}" stroke-width="3" fill="none"/>
      <path d="M88 150 h36 l7 14 h-50 z" fill="${C.copperDk}"/>
      <ellipse cx="106" cy="168" rx="40" ry="4" fill="#000" opacity=".1"/>`;
  }

  // Marigold garland hanging along a curve, width 200.
  function toran(sag = 34, n = 15) {
    const p = t => {
      const x = 200 * t;
      const y = 8 + (1 - t) * t * 4 * sag;
      return [x, y];
    };
    let out = `<path d="M0 8 Q100 ${8 + sag * 2} 200 8" stroke="${C.leafDk}" stroke-width="1.5" fill="none"/>`;
    for (let i = 0; i <= n; i++) {
      const [x, y] = p(i / n);
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="${i % 2 ? C.haldi : C.marigold}"/>`;
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="${C.kumkum}" opacity=".5"/>`;
      if (i % 3 === 0 && i > 0 && i < n) {
        for (let k = 1; k <= 3; k++) {
          out += `<circle cx="${x.toFixed(1)}" cy="${(y + k * 11).toFixed(1)}" r="4.8" fill="${k % 2 ? C.haldi : C.marigold}"/>`;
        }
        out += `<ellipse cx="${x.toFixed(1)}" cy="${(y + 48).toFixed(1)}" rx="3.5" ry="9" fill="${C.leaf}"/>`;
      }
    }
    return out;
  }

  function rangoli() {
    let out = `<circle cx="100" cy="100" r="92" fill="none" stroke="${C.kumkum}" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="2 6" stroke-linecap="round"/>`;
    for (let i = 0; i < 8; i++) {
      out += `<ellipse cx="100" cy="58" rx="13" ry="32" fill="${i % 2 ? C.haldi : C.kumkum}" opacity="${i % 2 ? 0.85 : 0.75}" transform="rotate(${i * 45} 100 100)"/>`;
    }
    for (let i = 0; i < 8; i++) {
      out += `<ellipse cx="100" cy="72" rx="6" ry="14" fill="${C.rice}" transform="rotate(${i * 45 + 22.5} 100 100)"/>`;
    }
    out += `<circle cx="100" cy="100" r="17" fill="${C.leafDk}"/><circle cx="100" cy="100" r="7" fill="${C.haldiLt}"/>`;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      out += `<circle cx="${(100 + Math.cos(a) * 80).toFixed(1)}" cy="${(100 + Math.sin(a) * 80).toFixed(1)}" r="3" fill="${C.cream}" stroke="${C.kumkum}" stroke-opacity=".4"/>`;
    }
    return out;
  }

  function havan() {
    return `
      <path d="M92 28 C84 20 98 12 90 4" stroke="${C.ink}" stroke-opacity=".15" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M112 34 C120 24 106 16 114 6" stroke="${C.ink}" stroke-opacity=".12" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="58" fill="${C.haldiLt}" opacity=".18"/>
      <path d="M100 44 C120 74 124 100 100 126 C76 100 80 74 100 44 Z" fill="${C.marigold}"/>
      <path d="M74 80 C88 96 88 112 76 126 C62 112 62 96 74 80 Z" fill="${C.kumkum}" opacity=".85"/>
      <path d="M126 80 C140 96 140 112 126 126 C112 112 112 96 126 80 Z" fill="${C.kumkum}" opacity=".85"/>
      <path d="M100 76 C110 92 110 108 100 122 C90 108 90 92 100 76 Z" fill="${C.haldiLt}"/>
      <path d="M46 126 h108 l-8 16 h-92 z" fill="${C.copperLt}"/>
      <path d="M54 142 h92 l-8 16 h-76 z" fill="${C.copper}"/>
      <path d="M62 158 h76 l-8 14 h-60 z" fill="${C.copperDk}"/>
      <ellipse cx="100" cy="176" rx="46" ry="4" fill="#000" opacity=".1"/>`;
  }

  function modakShape(x, y, s) {
    const pleats = [-12, -6, 0, 6, 12]
      .map(d => `<path d="M0 -44 Q${d * 0.6} -22 ${d * 1.4} 0" stroke="${C.sand}" stroke-width="1.6" fill="none"/>`)
      .join('');
    return at(`
      <path d="M-22 0 C-24 -18 -8 -32 0 -46 C8 -32 24 -18 22 0 Q0 6 -22 0 Z" fill="${C.rice}"/>
      ${pleats}
      <circle cx="0" cy="-47" r="2.5" fill="${C.haldi}"/>`, x, y, s);
  }

  function modak() {
    const durva = [-30, -16, -4, 8, 20]
      .map((a, i) => `<path d="M100 150 Q${104 + a} ${110 - i * 3} ${100 + a * 1.6} ${86 - (i % 2) * 8}" stroke="${i % 2 ? C.leaf : C.leafDk}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`)
      .join('');
    return `
      <ellipse cx="100" cy="164" rx="74" ry="14" fill="${C.copperDk}"/>
      <ellipse cx="100" cy="160" rx="74" ry="14" fill="${C.copper}"/>
      <ellipse cx="100" cy="158" rx="60" ry="9" fill="${C.copperLt}" opacity=".6"/>
      ${durva}
      ${modakShape(68, 160, 0.95)}
      ${modakShape(132, 160, 0.95)}
      ${modakShape(100, 164, 1.2)}
      <circle cx="42" cy="60" r="5" fill="${C.marigold}"/><circle cx="160" cy="48" r="4" fill="${C.haldi}"/>`;
  }

  function bel() {
    const leaf = (a, h) => `
      <g transform="rotate(${a} 100 150)">
        <path d="M100 150 C80 ${150 - h * 0.4} 82 ${150 - h * 0.85} 100 ${150 - h} C118 ${150 - h * 0.85} 120 ${150 - h * 0.4} 100 150 Z" fill="${a ? C.leaf : C.leafDk}"/>
        <path d="M100 148 L100 ${150 - h + 6}" stroke="${C.cream}" stroke-opacity=".35" stroke-width="1.5"/>
      </g>`;
    return `
      <circle cx="100" cy="98" r="72" fill="${C.cream}" opacity=".08"/>
      ${leaf(-42, 92)}${leaf(42, 92)}${leaf(0, 110)}
      <path d="M100 150 Q102 168 96 184" stroke="${C.leafDk}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M70 176 h60" stroke="${C.cream}" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
      <path d="M74 184 h52" stroke="${C.cream}" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="52" r="3" fill="${C.cream}" opacity=".6"/><circle cx="158" cy="64" r="2.5" fill="${C.cream}" opacity=".5"/>`;
  }

  function pinda() {
    const til = [];
    for (let i = 0; i < 22; i++) {
      const x = 52 + ((i * 37) % 100);
      const y = 118 + ((i * 23) % 26);
      til.push(`<ellipse cx="${x}" cy="${y}" rx="1.6" ry="1" fill="${C.ink}" opacity=".7" transform="rotate(${i * 29} ${x} ${y})"/>`);
    }
    return `
      <path d="M14 140 C50 100 150 96 190 122 C150 160 60 170 14 140 Z" fill="${C.leaf}"/>
      <path d="M18 138 C70 128 130 124 186 122" stroke="${C.leafDk}" stroke-width="2" fill="none"/>
      <path d="M30 88 L70 118 M40 80 L76 116 M52 76 L82 114" stroke="${C.haldi}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      ${[70, 100, 130].map(x => `<ellipse cx="${x}" cy="138" rx="15" ry="3" fill="#000" opacity=".12"/><circle cx="${x}" cy="126" r="14" fill="${C.rice}"/><circle cx="${x - 4}" cy="121" r="4" fill="#fff" opacity=".5"/>`).join('')}
      ${til.join('')}`;
  }

  function palna() {
    return `
      <path d="M150 34 a16 16 0 1 0 10 28 a12 12 0 1 1 -10 -28 z" fill="${C.haldi}"/>
      <circle cx="40" cy="44" r="2.5" fill="${C.haldi}"/><circle cx="62" cy="28" r="2" fill="${C.haldi}"/><circle cx="118" cy="22" r="2" fill="${C.haldi}"/>
      <path d="M30 70 h140" stroke="${C.copperDk}" stroke-width="5" stroke-linecap="round"/>
      <path d="M56 70 L64 118 M144 70 L136 118" stroke="${C.copperDk}" stroke-width="2"/>
      <path d="M52 116 h96 C148 148 128 162 100 162 C72 162 52 148 52 116 Z" fill="${C.copper}"/>
      <path d="M58 128 h84 M60 140 h80" stroke="${C.haldiLt}" stroke-width="2" stroke-dasharray="4 5" opacity=".9"/>
      <path d="M48 116 h104" stroke="${C.copperDk}" stroke-width="5" stroke-linecap="round"/>
      ${toranMini()}
      <ellipse cx="100" cy="178" rx="44" ry="4" fill="#000" opacity=".08"/>`;
  }

  function toranMini() {
    let out = '';
    for (let i = 0; i < 9; i++) {
      const x = 60 + i * 10;
      const y = 116 + Math.sin((i / 8) * Math.PI) * 7;
      out += `<circle cx="${x}" cy="${y.toFixed(1)}" r="3.6" fill="${i % 2 ? C.haldi : C.marigold}"/>`;
    }
    return out;
  }

  function lotus() {
    const petal = (a, len, fill) =>
      `<path d="M100 150 C${100 - 20} ${150 - len * 0.5} ${100 - 8} ${150 - len * 0.9} 100 ${150 - len} C${100 + 8} ${150 - len * 0.9} ${100 + 20} ${150 - len * 0.5} 100 150 Z" fill="${fill}" transform="rotate(${a} 100 150)"/>`;
    return `
      ${petal(-62, 60, C.copperLt)}${petal(62, 60, C.copperLt)}
      ${petal(-34, 78, C.kumkum)}${petal(34, 78, C.kumkum)}
      ${petal(0, 92, C.copper)}
      <path d="M30 160 Q65 150 100 160 T170 160" stroke="${C.leafDk}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M44 172 Q72 164 100 172 T156 172" stroke="${C.leafDk}" stroke-opacity=".5" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  }

  function toranDoor() {
    return `
      <path d="M46 186 V84 A54 54 0 0 1 154 84 V186" fill="${C.cream}" opacity=".55"/>
      <path d="M46 186 V84 A54 54 0 0 1 154 84 V186" fill="none" stroke="${C.copperDk}" stroke-width="5"/>
      <g transform="translate(40 58) scale(.6)">${toran(26, 13)}</g>
      <g transform="translate(70 128) scale(.3)">${kalash()}</g>
      <g transform="translate(58 170) scale(.84 .12)">${rangoli()}</g>`;
  }

  function kalashHero() {
    return `
      <g transform="translate(20 178) scale(.8 .18)">${rangoli()}</g>
      ${at(diya(), 4, 116, 0.4)}
      <g transform="translate(196 116) scale(-.4 .4)">${diya()}</g>
      ${at(kalash(), 32, 44, 0.68)}
      ${at(toran(22, 12), 0, -4, 1)}`;
  }

  const MOTIFS = { kalash, diya, rangoli, havan, modak, bel, pinda, palna, lotus, toranDoor, kalashHero };

  function motif(name) {
    const fn = MOTIFS[name] || kalash;
    return svg(fn());
  }

  // Large hero still-life: an arch framing a kalash, diyas, toran and rangoli.
  function hero() {
    return svg(`
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#EBDDC6"/><stop offset=".72" stop-color="#E2CDAE"/><stop offset="1" stop-color="#D4B993"/>
        </linearGradient>
      </defs>
      <rect width="400" height="520" fill="url(#hg)"/>
      <path d="M0 404 H400 V520 H0 Z" fill="#CDB08A" opacity=".55"/>
      <g transform="translate(64 380) scale(1.36 .34)">${rangoli()}</g>
      ${at(diya(), 18, 314, 0.62)}
      <g transform="translate(382 314) scale(-.62 .62)">${diya()}</g>
      ${at(kalash(), 70, 150, 1.3)}
      ${at(toran(40, 16), 0, 0, 2)}`, '0 0 400 520', 'slice');
  }

  return { motif, hero, lotus: () => svg(lotus()) };
})();
