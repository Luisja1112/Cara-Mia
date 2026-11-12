/* Jardín basado en el ramo real: lirios rosas que estaban en capullo y se van abriendo poco a poco */
window.TEMA = {
  titulo: 'Se abrieron, tomatito cherry 🌷',
  teAmo: 'Te amo 💗',
  musica: '../flores-fin-de-semana/caballero.mp3',
  colores: ['#f48fb1', '#ffd6e3', '#ffe34d', '#fff3a0', '#2fb5b0', '#ffffff'],
  estrellas: { n: 55, color: '#fff1c2' },
  petalos: 40,
  mensajes: [
    'Te di unas flores sin saber si se abrirían 🌱',
    'Y tú me mandaste la foto: se abrieron 🌷',
    'Las de verdad te van a durar un mes completo contigo 🌷',
    'Estas son solo una representación de las de verdad 💗',
    'Mira cómo se abren poco a poco, cada una a su ritmo ✨',
    'Algunas se abren pronto, otras con calma, y todas valen la espera 🤍',
    'Sin prisa: aquí estoy, regándote cariño todos los días 🍅',
    'Gracias por dejarme regalarte flores 🌸'
  ],
  nota: 'Las flores de verdad te acompañan un mes contigo. Estas son solo una representación de ellas 💗',
  notaAt: 30,
  flores: [
    // capullos altos que se quedan cerrados, como en la foto
    { capullo: capulloLirio('verde'),   x: 31, h: 58, s: 90,  d: .3 },
    { capullo: capulloLirio('rosado'),  x: 70, h: 55, s: 88,  d: .6 },
    // fondo: perritos, solidago y bolitas azules
    { svg: perrito(),                        x: 11, h: 42, s: 115, d: .9,  fija: true },
    { svg: perrito('#d9a3e0', '#9b5fb5'),    x: 91, h: 40, s: 110, d: 1.2, fija: true },
    { svg: solidago(),                       x: 20, h: 36, s: 120, d: .5,  fija: true },
    { svg: solidago('#f2d21b', '#ffe36e'),   x: 80, h: 34, s: 120, d: 1.0, fija: true },
    { svg: bolitasAzules(),                  x: 5,  h: 20, s: 95,  d: 1.4, fija: true },
    { svg: bolitasAzules('#12767c', '#27a39f'), x: 95, h: 22, s: 95, d: 1.5, fija: true },
    // los 5 lirios: capullo → entreabierto → abierto, uno tras otro de izquierda a derecha
    { capullo: capulloLirio('verde'),  medio: lirioRosa('#d6487f', .35), svg: lirioRosa(), media: 5,  abre: 8.5,  x: 26, h: 30, s: 130, d: .8 },
    { capullo: capulloLirio('rosado'), medio: lirioRosa('#d6487f', .35), svg: lirioRosa(), media: 10, abre: 13.5, x: 40, h: 46, s: 150, d: .2 },
    { capullo: capulloLirio('verde'),  medio: lirioRosa('#d6487f', .35), svg: lirioRosa(), media: 15, abre: 18.5, x: 50, h: 34, s: 165, d: .1 },
    { capullo: capulloLirio('rosado'), medio: lirioRosa('#d6487f', .35), svg: lirioRosa(), media: 20, abre: 23.5, x: 60, h: 50, s: 150, d: .4 },
    { capullo: capulloLirio('verde'),  medio: lirioRosa('#d6487f', .35), svg: lirioRosa(), media: 25, abre: 28.5, x: 75, h: 28, s: 130, d: 1.1 },
    // pompones amarillos al frente
    { svg: pompon(),                       x: 14, h: 26, s: 90, d: 1.3 },
    { svg: pompon('#fbe94d', '#ecd000'),   x: 86, h: 24, s: 90, d: 1.35 },
    { svg: pompon(),                       x: 67, h: 20, s: 80, d: 1.6 },
    { svg: pompon('#fbe94d', '#ecd000'),   x: 34, h: 18, s: 80, d: 1.7 }
  ]
};
