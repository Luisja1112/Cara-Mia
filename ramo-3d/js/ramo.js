(function () {
'use strict';
var TAU = Math.PI * 2, PI = Math.PI, RAD = PI / 180, sin = Math.sin, cos = Math.cos, pow = Math.pow, abs = Math.abs;
function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function ease(t) { return t * t * (3 - 2 * t); }
function easeOut(t) { return 1 - pow(1 - t, 3); }
function mul(a, b) {
  return [a[0]*b[0]+a[1]*b[3]+a[2]*b[6], a[0]*b[1]+a[1]*b[4]+a[2]*b[7], a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
          a[3]*b[0]+a[4]*b[3]+a[5]*b[6], a[3]*b[1]+a[4]*b[4]+a[5]*b[7], a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
          a[6]*b[0]+a[7]*b[3]+a[8]*b[6], a[6]*b[1]+a[7]*b[4]+a[8]*b[7], a[6]*b[2]+a[7]*b[5]+a[8]*b[8]];
}
function Ry(a) { var c = cos(a), s = sin(a); return [c,0,s, 0,1,0, -s,0,c]; }
function Rx(a) { var c = cos(a), s = sin(a); return [1,0,0, 0,c,s, 0,-s,c]; }
function Rz(a) { var c = cos(a), s = sin(a); return [c,-s,0, s,c,0, 0,0,1]; }

/* ------------------------------------------------------------ mensajes */
var MENSAJES = [
  'Esta flor es para ti',
  'Luego otra, porque una no me alcanza',
  'Lirios, porque son tus favoritos',
  'Alcatraces, porque tienen tu elegancia',
  'Cada pétalo es un gracias',
  'Gracias por tu cariño y tu paciencia',
  'Ve a tu ritmo, aquí estaré',
  'Eres lo más bonito de mis días',
  'Te amo, tomatito cherry 💗'
];

/* ------------------------------------------------------------ paletas [t,r,g,b] */
var PAL = [
  [[0,255,236,200],[.35,255,170,205],[1,226,66,140]],      // 0 lirio rosa
  [[0,236,246,214],[.3,255,255,250],[1,236,226,246]],      // 1 lirio blanco
  [[0,214,236,196],[.35,255,255,252],[1,250,244,255]],     // 2 calla blanca
  [[0,255,206,222],[.4,255,128,176],[1,232,62,128]],       // 3 calla rosa
  [[0,255,214,70]],                                        // 4 amarillo
  [[0,26,104,56],[1,100,200,110]],                         // 5 hoja
  [[0,255,238,214]],                                       // 6 papel A
  [[0,250,176,204]],                                       // 7 papel B
  [[0,255,128,28]],                                        // 8 antera
  [[0,255,70,140]],                                        // 9 cinta
  [[0,118,206,112]]                                        // 10 tallo
];
var SPR = [], TAB = new Int16Array(PAL.length * 80).fill(-1);
function samp(p, t) {
  var s = PAL[p], i;
  if (s.length === 1) return s[0].slice(1);
  for (i = 0; i < s.length - 1; i++) if (t <= s[i + 1][0]) break;
  if (i >= s.length - 1) i = s.length - 2;
  var a = s[i], b = s[i + 1], f = cl((t - a[0]) / (b[0] - a[0]));
  return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, a[3] + (b[3] - a[3]) * f];
}
function mkSprite(r, g, b) {
  var c = document.createElement('canvas'); c.width = c.height = 28;
  var x = c.getContext('2d'), gr = x.createRadialGradient(14, 14, 0, 14, 14, 14), col = r + ',' + g + ',' + b;
  gr.addColorStop(0, 'rgba(' + col + ',1)'); gr.addColorStop(.6, 'rgba(' + col + ',.96)'); gr.addColorStop(1, 'rgba(' + col + ',0)');
  x.fillStyle = gr; x.beginPath(); x.arc(14, 14, 14, 0, TAU); x.fill();
  return c;
}
// t en [0,1] (degradado), b en [0,1] (luz)
function sid(p, t, b) {
  var tl = (t * 10) | 0, bl = (b * 8) | 0;
  if (tl > 9) tl = 9; if (tl < 0) tl = 0; if (bl > 7) bl = 7; if (bl < 0) bl = 0;
  var k = (p * 10 + tl) * 8 + bl, id = TAB[k];
  if (id < 0) {
    var c = samp(p, (tl + .5) / 10), f = .42 + .7 * (bl + .5) / 8;
    SPR.push(mkSprite(Math.min(255, c[0] * f) | 0, Math.min(255, c[1] * f) | 0, Math.min(255, c[2] * f) | 0));
    id = TAB[k] = SPR.length - 1;
  }
  return id;
}
var LX = -.35, LY = .55, LZ = -.75;
function light(nx, ny, nz) {
  var l = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
  return .5 + .5 * abs((nx*LX + ny*LY + nz*LZ) / l);
}

/* ------------------------------------------------------------ canvas */
var cv, ctx, W, H, DPR, S, CX, CY, mobile, portrait, N, SP;
var DIST = 230, CC_Y = 14;
var MAXP = 16000, SX = new Float32Array(MAXP), SY = new Float32Array(MAXP), SR = new Float32Array(MAXP),
    SD = new Float32Array(MAXP), SID = new Uint16Array(MAXP), ORD = new Uint32Array(MAXP), n = 0;
var NB = 400, CNT = new Int32Array(NB + 2);
function put(x, y, z, rad, id) {
  if (n >= MAXP) return;
  var k = DIST / (DIST + z); if (k <= 0) return;
  SX[n] = CX + S * x * k; SY[n] = CY - S * y * k; SR[n] = rad * S * k; SD[n] = z; SID[n] = id; n++;
}
function resize() {
  W = window.innerWidth; H = window.innerHeight;
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
  mobile = W <= 700;
  portrait = W / H < 1;
  N = mobile ? 11 : 16;
  SP = mobile ? 2.1 : 1.55;
  if (portrait) { S = Math.min(1.18 * W / 96, .66 * H / 104); CX = W / 2; CY = H * .43; }
  else { S = Math.min(.5 * W / 96, .88 * H / 104); CX = W / 2 - .21 * W; CY = H / 2; }
}

/* ------------------------------------------------------------ flores */
var FL = [], leaves = [];
(function () {
  var L = function (pal, th, az, Lh, order) { return { k: 'l', pal: pal, th: th * RAD, az: az * RAD, L: Lh, ord: order, rot: Math.random() * TAU }; };
  var C = function (pal, th, az, Lh, order) { return { k: 'c', pal: pal, th: th * RAD, az: az * RAD, L: Lh, ord: order, rot: Math.random() * TAU }; };
  FL = [
    L(0, 0, 0, 43, 0),
    C(2, 26, 20, 38, 1), C(3, 26, 200, 38, 2),
    L(1, 26, 110, 37, 3), L(0, 26, 290, 37, 4),
    L(1, 52, 65, 29, 5), L(0, 52, 245, 29, 6),
    C(2, 52, 155, 30, 7), C(3, 52, 335, 30, 8)
  ];
  var DT = Math.min(3, 25 / FL.length);
  FL.forEach(function (f) { f.tb = 1.2 + f.ord * DT; });
  for (var i = 0; i < 6; i++) leaves.push({ az: (i * 60 + 28) * RAD, tb: 1 + i * .9 });
})();

var Mc;      // matriz de cámara
var cx0, cy0, cz0;
function cam(x, y, z) {
  y -= CC_Y;
  cx0 = Mc[0]*x + Mc[1]*y + Mc[2]*z; cy0 = Mc[3]*x + Mc[4]*y + Mc[5]*z; cz0 = Mc[6]*x + Mc[7]*y + Mc[8]*z;
}

function lilyPetal(M, O, sc, Lp, Wm, tilt, b0, b1, off, o, pal, flip) {
  var a = tilt * RAD, step = Lp * sc / N, px = off * sc, py = 0, b = (b0 + (b1 - b0) * o) * RAD;
  var rad = .62 * Math.max(SP, step) * sc * 1.05;
  for (var i = 0; i < N; i++) {
    a -= b;
    var sa = sin(a), ca = cos(a);
    px += sa * step; py += ca * step;
    var t = (i + .5) / N, w = Wm * sc * pow(sin(PI * pow(t, .85)), .75);
    var rx = O[0] + M[0]*px + M[1]*py, ry = O[1] + M[3]*px + M[4]*py, rz = O[2] + M[6]*px + M[7]*py;
    var wx = M[2], wy = M[5], wz = M[8];
    var nx = M[0]*ca - M[1]*sa, ny = M[3]*ca - M[4]*sa, nz = M[6]*ca - M[7]*sa;
    var lt = light(nx, ny, nz);
    var nd = Math.max(1, Math.round(2 * w / SP));
    for (var k = 0; k < nd; k++) {
      var zn = nd === 1 ? 0 : -1 + 2 * (k + .5) / nd, z = zn * w, cup = .3 * w * zn * zn;
      var rim = 1 - .25 * zn * zn;
      put(rx + wx*z - nx*cup, ry + wy*z - ny*cup, rz + wz*z - nz*cup, rad, sid(pal, t * .85 + .15 * abs(zn), lt * rim));
    }
  }
}
// (variable M se usa dentro de lilyPetal)
var M;

function drawLily(f, u, Rh, MH) {
  var e1 = ease(cl(u / 1.5)), Lc = f.L * e1, sc = .4 + .6 * e1;
  var ax = Rh[1], ay = Rh[4], az = Rh[7];
  cam(ax * Lc, ay * Lc, az * Lc);
  var O = [cx0, cy0, cz0], Lp = 20;
  var spin = u * TAU / 40 + f.rot;
  for (var j = 0; j < 6; j++) {
    var outer = (j % 2 === 0);
    var o = ease(cl((u - 1.2 - j * .15) / 3.4));
    M = mul(MH, Ry(spin + j * 60 * RAD));
    lilyPetal(M, O, sc, outer ? Lp : Lp * .9, outer ? 5.4 : 5, outer ? 14 : 22, outer ? 2 : 1.6, outer ? -3.9 : -3.2, .8, o, f.pal);
  }
  // estambres
  var g = ease(cl((u - 3.4) / 2.6));
  if (g > 0) {
    M = mul(MH, Ry(spin));
    for (var s = 0; s < 6; s++) {
      var ps = (s * 60 + 30) * RAD, c1 = cos(ps), s1 = sin(ps), last = null;
      for (var q = 0; q < 8; q++) {
        var tt = q / 7, r = (.5 + 5.2 * pow(tt, 1.6)) * g * sc, y = (1.5 + Lp * .62 * tt) * (.35 + .65 * g) * sc;
        var lx = r * c1, lz = -r * s1;
        put(O[0] + M[0]*lx + M[1]*y + M[2]*lz, O[1] + M[3]*lx + M[4]*y + M[5]*lz, O[2] + M[6]*lx + M[7]*y + M[8]*lz, .38 * sc, sid(4, 0, .9));
        last = [lx, y, lz];
      }
      for (q = 0; q < 3; q++) {
        var lx2 = last[0] * (1 + q * .06), y2 = last[1] + q * .55, lz2 = last[2] * (1 + q * .06);
        put(O[0] + M[0]*lx2 + M[1]*y2 + M[2]*lz2, O[1] + M[3]*lx2 + M[4]*y2 + M[5]*lz2, O[2] + M[6]*lx2 + M[7]*y2 + M[8]*lz2, .55 * sc, sid(8, 0, .75 + q * .1));
      }
    }
  }
}

function drawCalla(f, u, Rh, MH) {
  var e1 = ease(cl(u / 1.5)), Lc = f.L * e1, sc = .4 + .6 * e1;
  var ax = Rh[1], ay = Rh[4], az = Rh[7];
  cam(ax * Lc, ay * Lc, az * Lc);
  var O = [cx0, cy0, cz0], Lp = 25, Rm = 7;
  var o = ease(cl((u - 1.2) / 3.8));
  M = mul(MH, Ry(u * TAU / 40 + f.rot));
  var rad = .6 * Math.max(SP, Lp * sc / N) * sc * .95;
  for (var i = 0; i < N; i++) {
    var t = (i + .5) / N;
    var y = Lp * sc * t * .94;
    var lean = .35 * Lp * sc * o * pow(t, 2.2);
    var r = Rm * sc * (.22 + .78 * pow(sin(PI * .5 * Math.min(1, t * 1.02)), 1.3)) * (.4 + .6 * o) * (1 - .55 * pow(t, 5));
    var wrap = t < .35 ? 1 : 1 - .55 * pow((t - .35) / .65, 1.5);
    var nd = Math.max(3, Math.round(TAU * r * wrap / SP));
    for (var k = 0; k < nd; k++) {
      var psi = ((k + .5) / nd * 2 - 1) * PI * wrap, c = cos(psi), s = sin(psi);
      var lx = lean + r * c, lz = -r * s;
      var nx = M[0]*c - M[2]*s, ny = M[3]*c - M[5]*s, nz = M[6]*c - M[8]*s;
      put(O[0] + M[0]*lx + M[1]*y + M[2]*lz, O[1] + M[3]*lx + M[4]*y + M[5]*lz, O[2] + M[6]*lx + M[7]*y + M[8]*lz,
          rad, sid(f.pal, t * .9 + .1 * abs(psi) / PI, light(nx, ny, nz) * (1 - .12 * (abs(psi) / PI))));
    }
  }
  // espádice amarillo
  var g = ease(cl((u - 2.2) / 2));
  for (var q = 0; q < 7; q++) {
    var yy = Lp * sc * (.1 + .5 * q / 6) * (.5 + .5 * g), lx3 = lean * .25 * (q / 6);
    put(O[0] + M[0]*lx3 + M[1]*yy, O[1] + M[3]*lx3 + M[4]*yy, O[2] + M[6]*lx3 + M[7]*yy, (1.15 - .06 * q) * sc, sid(4, 0, .72 + .04 * q));
  }
}

function drawStem(f, u, Rh) {
  var e1 = ease(cl(u / 1.5)), Lc = f.L * e1, ax = Rh[1], ay = Rh[4], az = Rh[7];
  var id = sid(10, 0, .45), rad = .62;
  for (var s = 0; s < Lc; s += .85) { cam(ax * s, ay * s, az * s); put(cx0, cy0, cz0, rad, id); }
}

function drawLeaf(lf, t) {
  var gl = ease(cl((t - lf.tb) / 4.5)); if (gl <= 0) return;
  var Mp = mul(Mc, Ry(lf.az)); M = Mp;
  cam(0, 1, 0);
  var O = [cx0, cy0, cz0], Lp = 22 * gl, step = Lp / N, a = 50 * RAD, px = 0, py = 0, b = -1.3 * RAD;
  var rad = .6 * Math.max(SP, step) * .9;
  for (var i = 0; i < N; i++) {
    a -= b; var sa = sin(a), ca = cos(a); px += sa * step; py += ca * step;
    var tt = (i + .5) / N, w = 4.4 * gl * pow(sin(PI * pow(tt, .8)), .8);
    var rx = O[0] + M[0]*px + M[1]*py, ry = O[1] + M[3]*px + M[4]*py, rz = O[2] + M[6]*px + M[7]*py;
    var nx = M[0]*ca - M[1]*sa, ny = M[3]*ca - M[4]*sa, nz = M[6]*ca - M[7]*sa, lt = light(nx, ny, nz);
    var nd = Math.max(1, Math.round(2 * w / SP));
    for (var k = 0; k < nd; k++) {
      var zn = nd === 1 ? 0 : -1 + 2 * (k + .5) / nd, z = zn * w, cup = .2 * w * zn * zn;
      put(rx + M[2]*z - nx*cup, ry + M[5]*z - ny*cup, rz + M[8]*z - nz*cup, rad, sid(5, tt, lt * (1 - .2 * zn * zn) + (abs(zn) < .12 ? .12 : 0)));
    }
  }
}

function drawCone(t, tc) {
  var g = easeOut(cl((t - tc) / 1.6)); if (g <= 0) return;
  var ROWS = mobile ? 13 : 19, P = 10, rows, rim = null, u, i, k;
  for (i = 0; i < ROWS; i++) {
    u = (i + .5) / ROWS;
    var r = 17 * (.25 + .75 * pow(u, .9)), y = -30 + 34 * u;
    var nd = Math.max(8, Math.round(TAU * r / (mobile ? 2.4 : 1.9)));
    var slope = .5;
    for (k = 0; k < nd; k++) {
      var psi = k / nd * TAU, c = cos(psi), s = sin(psi), pn = psi / (TAU / P), pi = pn | 0, fr = pn - pi;
      var lx = r * c, lz = -r * s;
      cam(lx, y, lz);
      var nx = Mc[0]*c - Mc[2]*s + Mc[1]*slope, ny = Mc[3]*c - Mc[5]*s + Mc[4]*slope, nz = Mc[6]*c - Mc[8]*s + Mc[7]*slope;
      var lt = light(nx, ny, nz) * (fr < .1 || fr > .93 ? .72 : 1) * (.8 + .25 * u);
      put(cx0, cy0, cz0, (mobile ? 1.35 : 1.12) * g, sid(pi % 2 ? 7 : 6, 0, lt));
    }
  }
  // cinta
  var ry = -9, ru = (ry + 30) / 34, rr = 17 * (.25 + .75 * pow(ru, .9)) + .5, id = sid(9, 0, .75), idl = sid(9, 0, .95);
  for (var row = 0; row < 2; row++)
    for (k = 0; k < 24; k++) {
      var p2 = k / 24 * TAU; cam(rr * cos(p2), ry - row * 1.3, -rr * sin(p2));
      put(cx0, cy0, cz0, 1.05 * g, row ? id : idl);
    }
}

/* ------------------------------------------------------------ glow + destellos */
var glow;
function mkGlow() {
  glow = document.createElement('canvas'); glow.width = glow.height = 64;
  var x = glow.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,200,225,.55)'); g.addColorStop(.5, 'rgba(255,150,200,.18)'); g.addColorStop(1, 'rgba(255,150,200,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
}
var sparks = [];

/* ------------------------------------------------------------ interacción */
var yaw = 0, pitch = 0, drag = false, lastX = 0, lastY = 0;
function bindDrag() {
  cv.addEventListener('pointerdown', function (e) { drag = true; lastX = e.clientX; lastY = e.clientY; try { cv.setPointerCapture(e.pointerId); } catch (_) {} });
  cv.addEventListener('pointermove', function (e) {
    if (!drag) return;
    yaw += (e.clientX - lastX) * .012; pitch = Math.max(-.35, Math.min(.5, pitch + (e.clientY - lastY) * .004));
    lastX = e.clientX; lastY = e.clientY;
  });
  var up = function () { drag = false; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
}

/* ------------------------------------------------------------ render */
var t0 = 0, running = false;
function render(t) {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);
  var spin = t * TAU / 48 + yaw, tilt = 32 * RAD + pitch;
  Mc = mul(Rx(tilt), Ry(spin));
  n = 0;
  var i, f;
  // halos primero
  ctx.globalCompositeOperation = 'lighter';
  for (i = 0; i < FL.length; i++) {
    f = FL[i]; var uu = t - f.tb - 2;
    if (uu > 0) {
      var ax = sin(f.th) * cos(f.az), ay = cos(f.th), az = sin(f.th) * sin(f.az);
      var Lc = f.L; cam(ax * Lc, ay * Lc + 6, az * Lc);
      var k = DIST / (DIST + cz0), rr = 24 * S * k, a = .5 * cl(uu / 2) * (.8 + .2 * sin(t * 1.6 + i));
      ctx.globalAlpha = a;
      ctx.drawImage(glow, CX + S * cx0 * k - rr, CY - S * cy0 * k - rr, rr * 2, rr * 2);
    }
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';

  for (i = 0; i < FL.length; i++) {
    f = FL[i]; var u = t - f.tb; if (u < 0) continue;
    var Rh = mul(Ry(f.az), Rz(-f.th)), MH = mul(Mc, Rh);
    drawStem(f, u, Rh);
    if (f.k === 'l') drawLily(f, u, Rh, MH); else drawCalla(f, u, Rh, MH);
  }
  for (i = 0; i < leaves.length; i++) drawLeaf(leaves[i], t);
  drawCone(t, 26.5);

  // orden por profundidad (lejos → cerca)
  var dmin = 1e9, dmax = -1e9, j;
  for (j = 0; j < n; j++) { if (SD[j] < dmin) dmin = SD[j]; if (SD[j] > dmax) dmax = SD[j]; }
  var sc = (NB - 1) / Math.max(1, dmax - dmin);
  CNT.fill(0);
  for (j = 0; j < n; j++) CNT[(NB - 1) - (((SD[j] - dmin) * sc) | 0) + 1]++;
  for (j = 1; j <= NB; j++) CNT[j] += CNT[j - 1];
  for (j = 0; j < n; j++) ORD[CNT[(NB - 1) - (((SD[j] - dmin) * sc) | 0)]++] = j;
  for (j = 0; j < n; j++) {
    var q = ORD[j], r = SR[q]; if (r < .35) continue;
    ctx.drawImage(SPR[SID[q]], SX[q] - r, SY[q] - r, r * 2, r * 2);
  }

  // destellos
  if (t > 6) {
    if (sparks.length < (mobile ? 18 : 34) && Math.random() < .25) {
      var ang = Math.random() * TAU, rad = (14 + Math.random() * 52) * S;
      sparks.push({ x: CX + cos(ang) * rad * .9, y: CY - 10 * S + sin(ang) * rad * .9, life: 0, max: 1.6 + Math.random() * 1.6, s: (1.5 + Math.random() * 2.6) * (mobile ? .8 : 1) });
    }
    ctx.lineCap = 'round';
    for (i = sparks.length - 1; i >= 0; i--) {
      var sp = sparks[i]; sp.life += .016; sp.y -= .12;
      if (sp.life > sp.max) { sparks.splice(i, 1); continue; }
      var al = sin(PI * sp.life / sp.max), L2 = sp.s * (.5 + al);
      ctx.strokeStyle = 'rgba(255,238,200,' + (.85 * al).toFixed(2) + ')'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(sp.x - L2, sp.y); ctx.lineTo(sp.x + L2, sp.y); ctx.moveTo(sp.x, sp.y - L2); ctx.lineTo(sp.x, sp.y + L2); ctx.stroke();
    }
  }
}
function frame(now) {
  if (!running) return;
  render((now - t0) / 1000);
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------ galaxia + corazón */
var gal = null;
function startGalaxy(audio) {
  var gc = document.getElementById('galaxy-canvas'); gc.style.display = 'block';
  gc.width = window.innerWidth; gc.height = window.innerHeight;
  var g = gc.getContext('2d'), dots = [], total = mobile ? 90 : 130, analyser = null, data = null;
  if (location.protocol.indexOf('http') === 0 && (window.AudioContext || window.webkitAudioContext)) {
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)(), src = ac.createMediaElementSource(audio);
      analyser = ac.createAnalyser(); analyser.fftSize = 64; src.connect(analyser); analyser.connect(ac.destination);
      data = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) { analyser = null; }
  }
  var added = 0;
  (function add() {
    if (added >= total) return;
    var ang = Math.random() * TAU, rad = Math.random() * gc.width / 2.2, sp = .2 + Math.random() * .7, dir = Math.random() * TAU;
    dots.push({ x: gc.width / 2 + cos(ang) * rad, y: gc.height / 2 + sin(ang) * rad * .8, r: (mobile ? .6 : .8) + Math.random() * (mobile ? .7 : 1), dx: cos(dir) * sp, dy: sin(dir) * sp, a: .5 + Math.random() * .5, tx: 0, ty: 0 });
    added++; setTimeout(add, 12);
  })();
  gal = { dots: dots, heart: false, t: 0 };
  setTimeout(function () { gc.style.opacity = '1'; }, 50);
  (function anim() {
    g.clearRect(0, 0, gc.width, gc.height);
    var spf = 1;
    if (analyser) { analyser.getByteFrequencyData(data); var s = 0; for (var i = 0; i < data.length; i++) s += data[i]; spf = .7 + (s / data.length / 255) * 2.5; }
    gal.t += .016;
    for (var i2 = 0; i2 < dots.length; i2++) {
      var d = dots[i2];
      if (gal.heart) {
        d.x += (d.tx - d.x) * .05; d.y += (d.ty - d.y) * .05;
        var beat = 1 + .015 * sin(gal.t * 3);
        g.fillStyle = 'hsla(340,90%,75%,' + d.a + ')';
        g.beginPath(); g.arc(d.x, d.y, d.r * 1.25 * beat, 0, TAU); g.fill();
      } else {
        g.fillStyle = 'hsla(55,80%,70%,' + d.a + ')';
        g.beginPath(); g.arc(d.x, d.y, d.r, 0, TAU); g.fill();
        d.x += d.dx * spf; d.y += d.dy * spf;
        if (d.x < 0) d.x = gc.width; if (d.x > gc.width) d.x = 0; if (d.y < 0) d.y = gc.height; if (d.y > gc.height) d.y = 0;
      }
    }
    requestAnimationFrame(anim);
  })();
}
function makeHeart() {
  if (!gal) return;
  var half = portrait ? Math.min(.47 * W, .3 * H) : Math.min(.27 * W, .4 * H), s = half / 16, m = gal.dots.length;
  for (var i = 0; i < m; i++) {
    var th = TAU * (i / m), k = (i % 3 === 0) ? .72 : 1;
    var hx = 16 * pow(sin(th), 3), hy = 13 * cos(th) - 5 * cos(2 * th) - 2 * cos(3 * th) - cos(4 * th);
    gal.dots[i].tx = CX + s * k * hx; gal.dots[i].ty = CY - s * k * (hy - 1);
  }
  gal.heart = true;
}

/* ------------------------------------------------------------ arranque */
window.addEventListener('DOMContentLoaded', function () {
  cv = document.getElementById('ramo-canvas'); ctx = cv.getContext('2d');
  mkGlow(); resize(); bindDrag();
  window.addEventListener('resize', resize);
  var btn = document.getElementById('start-btn'), box = document.getElementById('start-btn-container'),
      msg = document.querySelector('.flower-message'), audio = document.getElementById('bg-music');
  box.style.cssText += ';position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:100';
  var txt = 'Presióname', bi = 0; btn.textContent = ''; btn.disabled = true;
  (function tb() { if (bi < txt.length) { btn.textContent += txt.charAt(bi++); setTimeout(tb, 90); } else btn.disabled = false; })();

  btn.addEventListener('click', function () {
    box.style.display = 'none';
    try { audio.currentTime = 0; var p = audio.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    cv.style.display = 'block';
    t0 = performance.now(); running = true; requestAnimationFrame(frame);
    setTimeout(function () { startGalaxy(audio); }, 2000);
    msg.style.display = 'block'; msg.style.opacity = 1;
    function typeText(s) { msg.textContent = ''; var i = 0; (function ty() { if (i < s.length) { var cp = s.codePointAt(i), ch = String.fromCodePoint(cp); msg.textContent += ch; i += ch.length; setTimeout(ty, 60); } })(); }
    MENSAJES.forEach(function (m, i) { setTimeout(function () { typeText(m); }, 1500 + i * 3400); });
    setTimeout(makeHeart, 1500 + 8 * 3400 + 2600);
  });
});
})();
