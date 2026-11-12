/* ============================================================
   Para mi tomatito cherry 💗
   ============================================================ */

const $ = (s) => document.querySelector(s);

/* ---------- Mensajes ---------- */
const TITULO = 'Feliz fin de semana, tomatito cherry 🍅';
const TE_AMO = 'Te amo 💗';

const MENSAJES = [
  'Eres la flor más bonita de mi jardín 🌷',
  'Contigo hasta los días grises se vuelven de colores ✨',
  'Gracias por existir en mi vida 💞',
  'Tu sonrisa es mi lugar favorito 🥹',
  'Mereces descansar, soñar y ser feliz este fin de semana 🌙',
  'Estoy muy orgulloso de ti, lo estás haciendo increíble 💪💗',
  'Eres mi persona favorita en todo el universo 🌎',
  'Ojalá estos lirios, rosas y alcatraces te abracen de mi parte 🤍',
  'Abrázate fuerte, que yo también te abrazo con el corazón 🫂',
  'Te quiero hoy, mañana y todos los fines de semana que vengan 🍅💗'
];

/* ---------- SVG de flores ---------- */
const rosa = (a, b, c) => {
  let s = '';
  for (let i = 0; i < 5; i++)
    s += `<ellipse cx="50" cy="30" rx="22" ry="27" fill="${a}" stroke="${c}" stroke-width="1" transform="rotate(${i * 72} 50 50)"/>`;
  for (let i = 0; i < 4; i++)
    s += `<ellipse cx="50" cy="37" rx="16" ry="19" fill="${b}" stroke="${c}" stroke-width=".8" transform="rotate(${i * 90 + 25} 50 50)"/>`;
  s += `<circle cx="50" cy="50" r="13" fill="${b}" stroke="${c}" stroke-width=".8"/>
        <path d="M50 50 m-2 0 a3 3 0 1 1 3 3 a6 6 0 1 1 -7 -6 a9 9 0 1 1 11 10" fill="none" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 100 100">${s}</svg>`;
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
  return `<svg viewBox="0 0 100 100">${s}</svg>`;
};

const alcatraz = (color, borde) => `
  <svg viewBox="0 0 100 100">
    <path d="M50 97 C 22 80, 12 40, 34 10 C 46 -3, 68 10, 76 34 C 84 62, 70 85, 50 97Z" fill="${color}" stroke="${borde}" stroke-width="1.2"/>
    <path d="M50 97 C 40 70, 40 40, 54 12" fill="none" stroke="${borde}" stroke-width="1" opacity=".55"/>
    <path d="M50 97 C 62 74, 66 48, 60 28" fill="none" stroke="${borde}" stroke-width=".8" opacity=".35"/>
    <rect x="46" y="28" width="11" height="38" rx="5.5" fill="#ffd23f" stroke="#e0a800" stroke-width="1"/>
    <circle cx="49" cy="36" r="1" fill="#e0a800"/><circle cx="54" cy="45" r="1" fill="#e0a800"/><circle cx="50" cy="55" r="1" fill="#e0a800"/>
  </svg>`;

/* ---------- Ramo ---------- */
const FLORES = [
  { tipo: 'calla', svg: alcatraz('#ffffff', '#cbd5e1'),   x: 14, h: 36, s: 110, d: 0.2 },
  { tipo: 'lirio', svg: lirio('#ffd1e8', '#d6246e'),      x: 24, h: 48, s: 125, d: 0.5 },
  { tipo: 'rosa',  svg: rosa('#e11d48', '#fb7185', '#7f1030'), x: 34, h: 40, s: 95, d: 0.8 },
  { tipo: 'calla', svg: alcatraz('#ffd6ea', '#e879b9'),   x: 43, h: 54, s: 120, d: 1.1 },
  { tipo: 'rosa',  svg: rosa('#ff4d8d', '#ff9ec4', '#a3124f'), x: 50, h: 44, s: 135, d: 0.4 },
  { tipo: 'lirio', svg: lirio('#ffffff', '#ec4899'),      x: 58, h: 56, s: 135, d: 0.9 },
  { tipo: 'rosa',  svg: rosa('#fff1f5', '#ffc2d8', '#c2417a'), x: 67, h: 38, s: 95, d: 0.6 },
  { tipo: 'calla', svg: alcatraz('#ffffff', '#cbd5e1'),   x: 76, h: 46, s: 115, d: 1.3 },
  { tipo: 'lirio', svg: lirio('#ffb3d6', '#be185d'),      x: 86, h: 34, s: 115, d: 0.7 },
  { tipo: 'rosa',  svg: rosa('#c9184a', '#ff4d6d', '#590d22'), x: 92, h: 26, s: 80, d: 1.5 },
  { tipo: 'rosa',  svg: rosa('#ff85b3', '#ffc2de', '#b5195d'), x: 6,  h: 24, s: 80, d: 1.4 }
];

function construirJardin() {
  const jardin = $('#jardin');
  FLORES.forEach((f) => {
    const el = document.createElement('div');
    el.className = 'flower';
    el.style.cssText = `--x:${f.x}%;--h:${f.h}vh;--s:${f.s}px;--d:${f.d}s`;
    el.innerHTML = `
      <div class="stem"></div>
      <div class="leaf izq" style="bottom:28%"></div>
      <div class="leaf der" style="bottom:46%"></div>
      <div class="head ${f.tipo}">${f.svg}</div>`;
    el.addEventListener('click', (e) => explosion(e.clientX, e.clientY, 30));
    jardin.appendChild(el);
  });
}

/* ---------- Máquina de escribir ---------- */
function escribir(el, texto, vel = 70) {
  return new Promise((ok) => {
    let i = 0;
    const chars = [...texto];
    const t = setInterval(() => {
      el.textContent += chars[i++];
      if (i >= chars.length) { clearInterval(t); ok(); }
    }, vel);
  });
}

let idxMsg = 0;
function ciclarMensajes() {
  const m = $('#mensaje');
  const mostrar = () => {
    m.classList.remove('ver');
    void m.offsetWidth; // reinicia animación
    m.textContent = MENSAJES[idxMsg % MENSAJES.length];
    m.classList.add('ver');
    idxMsg++;
  };
  mostrar();
  setInterval(mostrar, 4600);
}

/* ---------- Canvas: pétalos, estrellas, corazones, chispas ---------- */
const canvas = $('#fx');
const ctx = canvas.getContext('2d');
let W, H;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function ajustar() {
  W = innerWidth; H = innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
addEventListener('resize', ajustar);
ajustar();

const COLORES = ['#ff5fa2', '#ffc2de', '#ffffff', '#ff8fc0', '#e11d48', '#ffd1e8'];
const rnd = (a, b) => a + Math.random() * (b - a);

const estrellas = Array.from({ length: 110 }, () => ({
  x: rnd(0, 1), y: rnd(0, 0.75), r: rnd(.4, 1.8), f: rnd(0, 6.28), v: rnd(.01, .04)
}));

const petalos = Array.from({ length: 45 }, () => nuevoPetalo(true));
function nuevoPetalo(inicial) {
  return {
    x: rnd(0, W), y: inicial ? rnd(-H, H) : rnd(-60, -10),
    s: rnd(6, 15), vy: rnd(.6, 1.7), vx: rnd(-.3, .5),
    ang: rnd(0, 6.28), va: rnd(-.04, .04),
    osc: rnd(0, 6.28), c: COLORES[(Math.random() * COLORES.length) | 0]
  };
}

let parts = []; // corazones y chispas
function corazon(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * .3);
  ctx.bezierCurveTo(x, y - s * .2, x - s, y - s * .2, x - s, y + s * .35);
  ctx.bezierCurveTo(x - s, y + s * .8, x, y + s * 1.05, x, y + s * 1.3);
  ctx.bezierCurveTo(x, y + s * 1.05, x + s, y + s * .8, x + s, y + s * .35);
  ctx.bezierCurveTo(x + s, y - s * .2, x, y - s * .2, x, y + s * .3);
  ctx.fill();
}

function explosion(x, y, n = 36) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.28), v = rnd(2, 8);
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2,
      g: .12, vida: 1, dec: rnd(.008, .02),
      s: rnd(5, 13), c: COLORES[(Math.random() * COLORES.length) | 0],
      tipo: Math.random() < .55 ? 'c' : 'p'
    });
  }
}

function subirCorazon() {
  parts.push({
    x: rnd(0, W), y: H + 20, vx: rnd(-.4, .4), vy: rnd(-1.8, -.8), g: 0,
    vida: 1, dec: .0025, s: rnd(6, 16),
    c: COLORES[(Math.random() * 3) | 0], tipo: 'c', onda: rnd(0, 6.28)
  });
}

let t = 0;
function dibujar() {
  ctx.clearRect(0, 0, W, H);
  t += 1;

  // Estrellas
  estrellas.forEach((e) => {
    e.f += e.v;
    ctx.globalAlpha = .4 + Math.sin(e.f) * .4;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(e.x * W, e.y * H, e.r, 0, 6.28);
    ctx.fill();
  });

  // Pétalos
  petalos.forEach((p, i) => {
    p.y += p.vy; p.osc += .02;
    p.x += p.vx + Math.sin(p.osc) * .8;
    p.ang += p.va;
    if (p.y > H + 20) petalos[i] = nuevoPetalo(false);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.ang);
    ctx.scale(1, Math.abs(Math.cos(p.osc)) * .6 + .4);
    ctx.globalAlpha = .85;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, 6.28);
    ctx.fill();
    ctx.restore();
  });

  // Corazones y chispas
  parts = parts.filter((p) => p.vida > 0 && p.y > -40);
  parts.forEach((p) => {
    p.vy += p.g;
    p.x += p.vx + (p.onda !== undefined ? Math.sin((p.onda += .05)) * .8 : 0);
    p.y += p.vy;
    p.vida -= p.dec;
    ctx.globalAlpha = Math.max(p.vida, 0);
    ctx.fillStyle = p.c;
    ctx.shadowColor = p.c;
    ctx.shadowBlur = 12;
    if (p.tipo === 'c') corazon(p.x, p.y, p.s * .5);
    else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s * .25, 0, 6.28); ctx.fill(); }
    ctx.shadowBlur = 0;
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(dibujar);
}
dibujar();

/* Estela de chispas con el dedo / cursor + corazones al tocar */
let ultimo = 0;
addEventListener('pointermove', (e) => {
  const ahora = performance.now();
  if (ahora - ultimo < 40) return;
  ultimo = ahora;
  parts.push({
    x: e.clientX, y: e.clientY, vx: rnd(-.8, .8), vy: rnd(-1.2, .2), g: .03,
    vida: 1, dec: .03, s: rnd(5, 10), c: COLORES[(Math.random() * COLORES.length) | 0],
    tipo: Math.random() < .5 ? 'c' : 'p'
  });
});
addEventListener('pointerdown', (e) => {
  if (!$('#intro').classList.contains('fuera')) return;
  explosion(e.clientX, e.clientY, 26);
});

/* ---------- Música ---------- */
const audio = $('#musica');
const btnMusica = $('#musica-btn');

function iniciarMusica() {
  audio.volume = 0;
  const p = audio.play();
  if (p) {
    p.then(() => {
      btnMusica.classList.add('on');
      // fade in suave
      let v = 0;
      const f = setInterval(() => {
        v = Math.min(v + .02, .8);
        audio.volume = v;
        if (v >= .8) clearInterval(f);
      }, 120);
    }).catch(() => { /* si no hay archivo de audio, no pasa nada */ });
  }
}
btnMusica.addEventListener('click', () => {
  if (audio.paused) { audio.play(); btnMusica.classList.remove('mute'); }
  else { audio.pause(); btnMusica.classList.add('mute'); }
});

/* ---------- Arranque ---------- */
$('#abrir').addEventListener('click', async (e) => {
  $('#intro').classList.add('fuera');
  iniciarMusica();
  construirJardin();
  explosion(e.clientX, e.clientY, 60);

  requestAnimationFrame(() => document.body.classList.add('go'));

  await escribir($('#t1'), TITULO, 65);
  const te = $('#t2');
  te.textContent = TE_AMO;
  te.classList.add('entra');
  setTimeout(() => explosion(W / 2, H * .25, 70), 600);

  setTimeout(ciclarMensajes, 1800);
  setInterval(subirCorazon, 450);

  // Fuegos artificiales de corazones cada cierto tiempo
  setInterval(() => explosion(rnd(W * .15, W * .85), rnd(H * .1, H * .4), 34), 3800);
});
