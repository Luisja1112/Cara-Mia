/* Motor del jardín: lee window.TEMA (definido en tema.js) y anima todo. */

const $ = (s) => document.querySelector(s);
const rnd = (a, b) => a + Math.random() * (b - a);
const COLORES = TEMA.colores;
const color = () => COLORES[(Math.random() * COLORES.length) | 0];

/* ---------- Jardín ---------- */
function construirJardin() {
  const jardin = $('#jardin');
  TEMA.flores.forEach((f) => {
    const el = document.createElement('div');
    el.className = 'flower';
    el.style.cssText = `--x:${f.x}%;--h:${f.h};--s:${f.s}px;--d:${f.d}s`;
    const cabeza = f.capullo
      ? `<div class="head capa"><div class="bud">${f.capullo}</div>${f.medio ? `<div class="medio">${f.medio}</div>` : ''}${f.svg ? `<div class="bloom">${f.svg}</div>` : ''}</div>`
      : `<div class="head ${f.fija ? 'fija' : ''}">${f.svg}</div>`;
    el.innerHTML = `
      <div class="stem"></div>
      <div class="leaf izq" style="bottom:28%"></div>
      <div class="leaf der" style="bottom:46%"></div>
      ${cabeza}`;
    el.addEventListener('click', (e) => explosion(e.clientX, e.clientY, 30));
    jardin.appendChild(el);
    // capullo que se abre a su tiempo (segundos desde que ella abre el regalo):
    // f.media = empieza a entreabrirse, f.abre = termina de abrirse
    const head = el.querySelector('.head');
    if (f.capullo && f.media) setTimeout(() => head.classList.add('media'), f.media * 1000);
    if (f.capullo && f.svg && f.abre) {
      setTimeout(() => {
        head.classList.add('abierta');
        const r = head.getBoundingClientRect();
        explosion(r.left + r.width / 2, r.top + r.height / 2, 34);
      }, f.abre * 1000);
    }
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
    m.textContent = TEMA.mensajes[idxMsg % TEMA.mensajes.length];
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

const estrellas = Array.from({ length: TEMA.estrellas.n }, () => ({
  x: rnd(0, 1), y: rnd(0, 0.8), r: rnd(.4, 1.8) * (TEMA.estrellas.escala || 1),
  f: rnd(0, 6.28), v: rnd(.01, .04),
  dx: rnd(0, 6.28), vx: rnd(.002, .01)
}));

function nuevoPetalo(inicial) {
  return {
    x: rnd(0, W), y: inicial ? rnd(-H, H) : rnd(-60, -10),
    s: rnd(6, 15), vy: rnd(.6, 1.7), vx: rnd(-.3, .5),
    ang: rnd(0, 6.28), va: rnd(-.04, .04),
    osc: rnd(0, 6.28), c: color()
  };
}
const petalos = Array.from({ length: TEMA.petalos }, () => nuevoPetalo(true));

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
      s: rnd(5, 13), c: color(),
      tipo: Math.random() < .55 ? 'c' : 'p'
    });
  }
}

function subirCorazon() {
  parts.push({
    x: rnd(0, W), y: H + 20, vx: rnd(-.4, .4), vy: rnd(-1.8, -.8), g: 0,
    vida: 1, dec: .0025, s: rnd(6, 16),
    c: color(), tipo: 'c', onda: rnd(0, 6.28)
  });
}

function dibujar() {
  ctx.clearRect(0, 0, W, H);

  // Estrellas / luciérnagas
  estrellas.forEach((e) => {
    e.f += e.v; e.dx += e.vx;
    const ex = e.x * W + (TEMA.estrellas.vaga ? Math.sin(e.dx) * 18 : 0);
    const ey = e.y * H + (TEMA.estrellas.vaga ? Math.cos(e.dx * 1.3) * 12 : 0);
    ctx.globalAlpha = .35 + Math.sin(e.f) * .45;
    ctx.fillStyle = TEMA.estrellas.color;
    if (TEMA.estrellas.brillo) { ctx.shadowColor = TEMA.estrellas.color; ctx.shadowBlur = 14; }
    ctx.beginPath();
    ctx.arc(ex, ey, e.r, 0, 6.28);
    ctx.fill();
    ctx.shadowBlur = 0;
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

/* Estela de chispas con el dedo / cursor */
let ultimo = 0;
addEventListener('pointermove', (e) => {
  const ahora = performance.now();
  if (ahora - ultimo < 40) return;
  ultimo = ahora;
  parts.push({
    x: e.clientX, y: e.clientY, vx: rnd(-.8, .8), vy: rnd(-1.2, .2), g: .03,
    vida: 1, dec: .03, s: rnd(5, 10), c: color(),
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
audio.src = TEMA.musica;

function iniciarMusica() {
  audio.volume = 0;
  const p = audio.play();
  if (p) {
    p.then(() => {
      btnMusica.classList.add('on');
      let v = 0;
      const f = setInterval(() => {
        v = Math.min(v + .02, .8);
        audio.volume = v;
        if (v >= .8) clearInterval(f);
      }, 120);
    }).catch(() => { /* sin audio disponible: todo sigue funcionando */ });
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

  // el emoji del título va aparte: el texto con degradado lo dejaría descolorido
  const m = TEMA.titulo.match(/^(.*?)(\s*\p{Extended_Pictographic}.*)$/u);
  await escribir($('#t1'), m ? m[1] : TEMA.titulo, 65);
  if (m) $('#t1e').textContent = m[2];
  const te = $('#t2');
  te.textContent = TEMA.teAmo;
  te.classList.add('entra');
  setTimeout(() => explosion(W / 2, H * .25, 70), 600);

  setTimeout(ciclarMensajes, 1800);
  if (TEMA.nota) {
    const n = document.createElement('div');
    n.className = 'nota';
    n.textContent = TEMA.nota;
    $('#escena').appendChild(n);
    setTimeout(() => n.classList.add('ver'), (TEMA.notaAt || 30) * 1000);
  }
  setInterval(subirCorazon, 450);
  setInterval(() => explosion(rnd(W * .15, W * .85), rnd(H * .1, H * .4), 34), 3800);
});
