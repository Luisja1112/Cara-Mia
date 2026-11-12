/* Generadores de flores en SVG (viewBox 100x100). Compartidos por todos los jardines. */

const svgWrap = (s) => `<svg viewBox="0 0 100 100">${s}</svg>`;

const rosa = (a, b, c) => {
  let s = '';
  for (let i = 0; i < 5; i++)
    s += `<ellipse cx="50" cy="30" rx="22" ry="27" fill="${a}" stroke="${c}" stroke-width="1" transform="rotate(${i * 72} 50 50)"/>`;
  for (let i = 0; i < 4; i++)
    s += `<ellipse cx="50" cy="37" rx="16" ry="19" fill="${b}" stroke="${c}" stroke-width=".8" transform="rotate(${i * 90 + 25} 50 50)"/>`;
  s += `<circle cx="50" cy="50" r="13" fill="${b}" stroke="${c}" stroke-width=".8"/>
        <path d="M50 50 m-2 0 a3 3 0 1 1 3 3 a6 6 0 1 1 -7 -6 a9 9 0 1 1 11 10" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/>`;
  return svgWrap(s);
};

const lirio = (petalo, borde, pistilo = '#ff9f1c') => {
  const p = 'M50 50 C 34 34, 36 10, 50 2 C 64 10, 66 34, 50 50Z';
  let s = '';
  for (let i = 0; i < 3; i++)
    s += `<path d="${p}" fill="${petalo}" stroke="${borde}" stroke-width="1" opacity=".85" transform="rotate(${i * 120} 50 50)"/>`;
  for (let i = 0; i < 3; i++)
    s += `<path d="${p}" fill="${petalo}" stroke="${borde}" stroke-width="1" transform="rotate(${i * 120 + 60} 50 50)"/>
          <path d="M50 48 L50 14" stroke="${borde}" stroke-width=".8" opacity=".6" transform="rotate(${i * 120 + 60} 50 50)"/>
          <circle cx="46" cy="30" r="1.3" fill="${borde}" transform="rotate(${i * 120 + 60} 50 50)"/>
          <circle cx="54" cy="24" r="1.3" fill="${borde}" transform="rotate(${i * 120 + 60} 50 50)"/>`;
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 + 15) * Math.PI / 180;
    const x = 50 + Math.cos(a) * 22, y = 50 + Math.sin(a) * 22;
    s += `<line x1="50" y1="50" x2="${x}" y2="${y}" stroke="${borde}" stroke-width="1.2"/>
          <ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" fill="${pistilo}" transform="rotate(${i * 60 + 105} ${x} ${y})"/>`;
  }
  s += `<circle cx="50" cy="50" r="4" fill="#ffd166"/>`;
  return svgWrap(s);
};

const alcatraz = (color, borde) => svgWrap(`
    <path d="M50 97 C 22 80, 12 40, 34 10 C 46 -3, 68 10, 76 34 C 84 62, 70 85, 50 97Z" fill="${color}" stroke="${borde}" stroke-width="1.2"/>
    <path d="M50 97 C 40 70, 40 40, 54 12" fill="none" stroke="${borde}" stroke-width="1" opacity=".55"/>
    <path d="M50 97 C 62 74, 66 48, 60 28" fill="none" stroke="${borde}" stroke-width=".8" opacity=".35"/>
    <rect x="46" y="28" width="11" height="38" rx="5.5" fill="#ffd23f" stroke="#e0a800" stroke-width="1"/>
    <circle cx="49" cy="36" r="1" fill="#e0a800"/><circle cx="54" cy="45" r="1" fill="#e0a800"/><circle cx="50" cy="55" r="1" fill="#e0a800"/>`);

/* Girasol: dos anillos de pétalos y centro con semillas en espiral */
const girasol = (petalo, petalo2, centro, semilla) => {
  let s = '';
  for (let i = 0; i < 18; i++)
    s += `<ellipse cx="50" cy="16" rx="7" ry="16" fill="${petalo2}" stroke="${centro}" stroke-width=".5" transform="rotate(${i * 20} 50 50)"/>`;
  for (let i = 0; i < 18; i++)
    s += `<ellipse cx="50" cy="20" rx="6.5" ry="14" fill="${petalo}" stroke="${petalo2}" stroke-width=".5" transform="rotate(${i * 20 + 10} 50 50)"/>`;
  s += `<circle cx="50" cy="50" r="17" fill="${centro}"/>`;
  for (let i = 0; i < 42; i++) {
    const a = i * 2.39996, r = 2.2 * Math.sqrt(i) + 1;
    s += `<circle cx="${50 + Math.cos(a) * r}" cy="${50 + Math.sin(a) * r}" r="1.15" fill="${semilla}"/>`;
  }
  return svgWrap(s);
};

/* Margarita */
const margarita = (petalo, borde, centro) => {
  let s = '';
  for (let i = 0; i < 14; i++)
    s += `<ellipse cx="50" cy="22" rx="6" ry="20" fill="${petalo}" stroke="${borde}" stroke-width=".7" transform="rotate(${i * (360 / 14)} 50 50)"/>`;
  s += `<circle cx="50" cy="50" r="10" fill="${centro}" stroke="#d99a00" stroke-width=".8"/>
        <circle cx="47" cy="47" r="3" fill="#fff" opacity=".5"/>`;
  return svgWrap(s);
};

/* Tulipán */
const tulipan = (color, borde, luz) => svgWrap(`
    <path d="M50 94 C 20 90, 13 46, 24 16 C 38 28, 47 50, 50 94Z" fill="${color}" stroke="${borde}" stroke-width="1"/>
    <path d="M50 94 C 80 90, 87 46, 76 16 C 62 28, 53 50, 50 94Z" fill="${color}" stroke="${borde}" stroke-width="1"/>
    <path d="M50 94 C 30 90, 28 48, 50 8 C 72 48, 70 90, 50 94Z" fill="${luz}" stroke="${borde}" stroke-width="1"/>
    <path d="M50 90 C 44 60, 46 34, 50 14" fill="none" stroke="${borde}" stroke-width=".7" opacity=".5"/>`);

/* Lavanda: espiga de florecillas */
const lavanda = (c1, c2) => {
  let s = `<line x1="50" y1="100" x2="50" y2="12" stroke="#3f8f57" stroke-width="2"/>`;
  for (let i = 0; i < 12; i++) {
    const y = 14 + i * 7, w = 3.6 + (i > 8 ? 0 : 0.6);
    const c = i % 2 ? c1 : c2;
    s += `<ellipse cx="${50 - 5}" cy="${y}" rx="${w}" ry="2.6" fill="${c}" transform="rotate(-35 ${45} ${y})"/>
          <ellipse cx="${50 + 5}" cy="${y + 3}" rx="${w}" ry="2.6" fill="${c}" transform="rotate(35 ${55} ${y + 3})"/>`;
  }
  s += `<ellipse cx="50" cy="6" rx="2.6" ry="5" fill="${c1}"/>`;
  return svgWrap(s);
};

/* Hortensia: cúpula de florecillas de cuatro pétalos */
const hortensia = (c1, c2, c3) => {
  const cols = [c1, c2, c3];
  let s = '';
  const anillos = [[36, 14], [27, 11], [18, 8], [9, 5], [0, 1]];
  anillos.forEach(([r, n], ai) => {
    for (let j = 0; j < n; j++) {
      const a = (j / n) * Math.PI * 2 + ai * 0.6;
      const x = 50 + Math.cos(a) * r, y = 50 + Math.sin(a) * r;
      const c = cols[(ai + j) % 3];
      for (let k = 0; k < 4; k++)
        s += `<ellipse cx="${x}" cy="${y - 4}" rx="3.6" ry="4.6" fill="${c}" stroke="rgba(255,255,255,.55)" stroke-width=".5" transform="rotate(${k * 90 + j * 13} ${x} ${y})"/>`;
      s += `<circle cx="${x}" cy="${y}" r="1.3" fill="#fff" opacity=".85"/>`;
    }
  });
  return svgWrap(s);
};

/* Peonía: capas de pétalos */
const peonia = (a, b, c, borde) => {
  let s = '';
  for (let i = 0; i < 8; i++)
    s += `<ellipse cx="50" cy="26" rx="17" ry="24" fill="${a}" stroke="${borde}" stroke-width=".8" transform="rotate(${i * 45} 50 50)"/>`;
  for (let i = 0; i < 8; i++)
    s += `<ellipse cx="50" cy="32" rx="14" ry="20" fill="${b}" stroke="${borde}" stroke-width=".7" transform="rotate(${i * 45 + 22.5} 50 50)"/>`;
  for (let i = 0; i < 6; i++)
    s += `<ellipse cx="50" cy="39" rx="11" ry="15" fill="${c}" stroke="${borde}" stroke-width=".7" transform="rotate(${i * 60} 50 50)"/>`;
  for (let i = 0; i < 5; i++)
    s += `<ellipse cx="50" cy="44" rx="7" ry="10" fill="${b}" stroke="${borde}" stroke-width=".6" transform="rotate(${i * 72 + 15} 50 50)"/>`;
  s += `<circle cx="50" cy="50" r="6" fill="${a}" stroke="${borde}" stroke-width=".8"/>`;
  return svgWrap(s);
};

/* Flor de cerezo (sakura) */
const cerezo = (petalo, borde, estambre = '#e11d6a') => {
  const p = 'M50 50 C 35 42, 31 20, 43 8 L50 17 L57 8 C 69 20, 65 42, 50 50Z';
  let s = '';
  for (let i = 0; i < 5; i++)
    s += `<path d="${p}" fill="${petalo}" stroke="${borde}" stroke-width="1" transform="rotate(${i * 72} 50 50)"/>`;
  for (let i = 0; i < 10; i++) {
    const a = (i * 36) * Math.PI / 180;
    const x = 50 + Math.cos(a) * 17, y = 50 + Math.sin(a) * 17;
    s += `<line x1="50" y1="50" x2="${x}" y2="${y}" stroke="${estambre}" stroke-width=".9"/>
          <circle cx="${x}" cy="${y}" r="1.8" fill="${estambre}"/>`;
  }
  s += `<circle cx="50" cy="50" r="3.2" fill="${estambre}"/>`;
  return svgWrap(s);
};

/* ============ Flores del ramo real: lirio rosa, capullos, solidago, pompón, perrito, bolitas azules ============ */
let _uid = 0;

/* Lirio asiático rosa con garganta verde y anteras naranjas (como el de la foto).
   ap = apertura: 1 = totalmente abierto, ~.35 = entreabierto (pétalos aún cerrándose) */
const lirioRosa = (borde = '#d6487f', ap = 1) => {
  const id = 'lr' + (++_uid);
  const p = 'M50 52 C 37 40, 34 16, 50 2 C 66 16, 63 40, 50 52Z';
  const w = .5 + .5 * ap, l = .7 + .3 * ap;
  const T = (a) => `transform="translate(50 50) rotate(${a}) scale(${w} ${l}) translate(-50 -50)"`;
  let s = `<defs><radialGradient id="${id}" cx=".5" cy=".92" r=".95">
      <stop offset="0" stop-color="#fde3ec"/><stop offset=".45" stop-color="#f7a1bf"/><stop offset="1" stop-color="#ee6c9c"/></radialGradient></defs>`;
  for (let i = 0; i < 3; i++)
    s += `<path d="${p}" fill="url(#${id})" stroke="${borde}" stroke-width=".6" opacity=".92" ${T(i * 120 + 60)}/>`;
  for (let i = 0; i < 3; i++)
    s += `<path d="${p}" fill="url(#${id})" stroke="${borde}" stroke-width=".6" ${T(i * 120)}/>
          <path d="M50 48 L50 12" stroke="#fff" stroke-width=".7" opacity=".4" ${T(i * 120)}/>`;
  s += `<circle cx="50" cy="50" r="7" fill="#c7e3a0"/><circle cx="50" cy="50" r="4" fill="#f4fbe4"/>`;
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 + 20) * Math.PI / 180, r = 19 * (.45 + .55 * ap);
    const x = 50 + Math.cos(a) * r, y = 50 + Math.sin(a) * r;
    s += `<line x1="50" y1="50" x2="${x}" y2="${y}" stroke="#f1e6c9" stroke-width="1.2"/>
          <ellipse cx="${x}" cy="${y}" rx="2.4" ry="5" fill="#c4581c" transform="rotate(${i * 60 + 110} ${x} ${y})"/>`;
  }
  return svgWrap(s);
};

/* Capullo de lirio: variante 'verde' (recién cortado) o 'rosado' (ya con color) */
const capulloLirio = (tipo = 'verde') => {
  const id = 'cb' + (++_uid);
  const [a, b] = tipo === 'rosado' ? ['#f6bcd0', '#f3dfe4'] : ['#cfe6a0', '#f1f4d9'];
  return svgWrap(`<defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${tipo === 'rosado' ? '#f08fb1' : '#e9efc9'}"/></linearGradient></defs>
    <path d="M50 60 C 34 52, 32 24, 50 2 C 68 24, 66 52, 50 60Z" fill="url(#${id})" stroke="rgba(60,110,50,.45)" stroke-width=".8"/>
    <path d="M50 58 C 46 40, 46 22, 50 6" fill="none" stroke="rgba(60,110,50,.35)" stroke-width=".8"/>
    <path d="M50 58 C 54 40, 54 22, 50 6" fill="none" stroke="rgba(60,110,50,.25)" stroke-width=".8"/>`);
};

/* Solidago: plumas de florecitas amarillas */
const solidago = (c1 = '#f6dc1a', c2 = '#ffe95c') => {
  let s = '';
  for (let b = 0; b < 8; b++) {
    const dir = b % 2 ? 1 : -1;
    const y0 = 92 - b * 10;
    const len = 26 - b * 1.6;
    const x1 = 50 + dir * len, y1 = y0 - 14;
    s += `<path d="M50 ${y0 + 6} Q ${50 + dir * len * .4} ${y0 - 4} ${x1} ${y1}" fill="none" stroke="#4d8f45" stroke-width="1.1"/>`;
    for (let k = 0; k < 9; k++) {
      const t = k / 8;
      const x = 50 + dir * len * t + Math.sin(k * 3 + b) * 3;
      const y = y0 + 6 - 20 * t + Math.cos(k * 2 + b) * 2;
      s += `<circle cx="${x}" cy="${y}" r="${2.4 - t * .6}" fill="${(k + b) % 2 ? c1 : c2}"/>`;
    }
  }
  for (let k = 0; k < 9; k++)
    s += `<circle cx="${50 + Math.sin(k * 2) * 5}" cy="${12 + k * 4}" r="2.4" fill="${k % 2 ? c1 : c2}"/>`;
  return svgWrap(s);
};

/* Pompón / crisantemo amarillo */
const pompon = (c1 = '#f9e23a', c2 = '#e8c800') => {
  let s = '';
  [[30, 14, 8], [21, 11, 8], [12, 7, 7.5]].forEach(([r, n, rad], ri) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ri * .5;
      s += `<circle cx="${50 + Math.cos(a) * r}" cy="${50 + Math.sin(a) * r}" r="${rad}" fill="${(i + ri) % 2 ? c1 : c2}" stroke="rgba(120,90,0,.25)" stroke-width=".6"/>`;
    }
  });
  s += `<circle cx="50" cy="50" r="9" fill="${c1}"/><circle cx="46" cy="46" r="4" fill="#fff6a8" opacity=".7"/>`;
  return svgWrap(s);
};

/* Perrito (boca de dragón) */
const perrito = (c1 = '#e9a0c4', c2 = '#b56ab4') => {
  let s = `<line x1="50" y1="100" x2="50" y2="10" stroke="#4d8f45" stroke-width="2"/>`;
  for (let i = 0; i < 9; i++) {
    const y = 16 + i * 9, k = .55 + i * .06, side = i % 2 ? 1 : -1;
    const x = 50 + side * 5 * k;
    s += `<ellipse cx="${x}" cy="${y}" rx="${7 * k}" ry="${5 * k}" fill="${i % 3 ? c1 : c2}" stroke="rgba(120,40,100,.35)" stroke-width=".6" transform="rotate(${side * -20} ${x} ${y})"/>
          <ellipse cx="${x + side * 2 * k}" cy="${y + 3 * k}" rx="${4 * k}" ry="${3 * k}" fill="${c2}" opacity=".7"/>`;
  }
  for (let j = 0; j < 3; j++) s += `<circle cx="${50 + (j - 1) * 3}" cy="${8 - j}" r="2.4" fill="#8b5aa8"/>`;
  return svgWrap(s);
};

/* Bolitas azules secas */
const bolitasAzules = (c1 = '#1a8a8f', c2 = '#2fb5b0') => {
  const pts = [[28, 34], [50, 18], [72, 32], [38, 56], [64, 56], [50, 40]];
  let s = '';
  pts.forEach(([x, y]) => { s += `<path d="M50 100 Q ${(50 + x) / 2} ${(100 + y) / 2} ${x} ${y}" fill="none" stroke="#5b7f4c" stroke-width="1"/>`; });
  pts.forEach(([x, y], i) => {
    s += `<circle cx="${x}" cy="${y}" r="9" fill="${c1}"/>`;
    for (let k = 0; k < 8; k++) {
      const a = k * 0.785 + i, r = k ? 5.5 : 0;
      s += `<circle cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r}" r="2.4" fill="${k % 2 ? c2 : '#46cbc3'}"/>`;
    }
  });
  return svgWrap(s);
};
