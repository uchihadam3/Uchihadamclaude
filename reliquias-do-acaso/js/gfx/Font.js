// Font: fonte bitmap 5x7 desenhada pixel a pixel (sem antialias — o texto
// fica autenticamente pixelado em qualquer escala). Minúsculas viram
// versaletes; acentos PT são compostos (glifo base + marca em cima).
(function () {
  // linhas de 5 bits, topo->base
  var G = {
    'A': [14, 17, 17, 31, 17, 17, 17], 'B': [30, 17, 17, 30, 17, 17, 30],
    'C': [14, 17, 16, 16, 16, 17, 14], 'D': [30, 17, 17, 17, 17, 17, 30],
    'E': [31, 16, 16, 30, 16, 16, 31], 'F': [31, 16, 16, 30, 16, 16, 16],
    'G': [14, 17, 16, 23, 17, 17, 14], 'H': [17, 17, 17, 31, 17, 17, 17],
    'I': [14, 4, 4, 4, 4, 4, 14], 'J': [7, 2, 2, 2, 2, 18, 12],
    'K': [17, 18, 20, 24, 20, 18, 17], 'L': [16, 16, 16, 16, 16, 16, 31],
    'M': [17, 27, 21, 21, 17, 17, 17], 'N': [17, 25, 21, 19, 17, 17, 17],
    'O': [14, 17, 17, 17, 17, 17, 14], 'P': [30, 17, 17, 30, 16, 16, 16],
    'Q': [14, 17, 17, 17, 21, 18, 13], 'R': [30, 17, 17, 30, 20, 18, 17],
    'S': [15, 16, 16, 14, 1, 1, 30], 'T': [31, 4, 4, 4, 4, 4, 4],
    'U': [17, 17, 17, 17, 17, 17, 14], 'V': [17, 17, 17, 17, 17, 10, 4],
    'W': [17, 17, 17, 21, 21, 27, 17], 'X': [17, 17, 10, 4, 10, 17, 17],
    'Y': [17, 17, 10, 4, 4, 4, 4], 'Z': [31, 1, 2, 4, 8, 16, 31],
    '0': [14, 17, 19, 21, 25, 17, 14], '1': [4, 12, 4, 4, 4, 4, 14],
    '2': [14, 17, 1, 2, 4, 8, 31], '3': [14, 17, 1, 6, 1, 17, 14],
    '4': [2, 6, 10, 18, 31, 2, 2], '5': [31, 16, 30, 1, 1, 17, 14],
    '6': [6, 8, 16, 30, 17, 17, 14], '7': [31, 1, 2, 4, 8, 8, 8],
    '8': [14, 17, 17, 14, 17, 17, 14], '9': [14, 17, 17, 15, 1, 2, 12],
    ' ': [0, 0, 0, 0, 0, 0, 0], '.': [0, 0, 0, 0, 0, 12, 12],
    ',': [0, 0, 0, 0, 0, 12, 4].map(function (v, i) { return i === 6 ? 8 : v; }),
    '!': [4, 4, 4, 4, 4, 0, 4], '?': [14, 17, 1, 2, 4, 0, 4],
    ':': [0, 12, 12, 0, 12, 12, 0], ';': [0, 12, 12, 0, 12, 4, 8],
    '-': [0, 0, 0, 31, 0, 0, 0], '+': [0, 4, 4, 31, 4, 4, 0],
    '/': [1, 1, 2, 4, 8, 16, 16], '(': [2, 4, 8, 8, 8, 4, 2],
    ')': [8, 4, 2, 2, 2, 4, 8], '%': [25, 26, 2, 4, 8, 11, 19],
    "'": [4, 4, 8, 0, 0, 0, 0], '"': [10, 10, 0, 0, 0, 0, 0],
    '=': [0, 0, 31, 0, 31, 0, 0], '*': [0, 21, 14, 31, 14, 21, 0],
    '<': [2, 4, 8, 16, 8, 4, 2], '>': [8, 4, 2, 1, 2, 4, 8],
    '[': [14, 8, 8, 8, 8, 8, 14], ']': [14, 2, 2, 2, 2, 2, 14],
    '_': [0, 0, 0, 0, 0, 0, 31], '#': [10, 31, 10, 10, 10, 31, 10],
    '~': [0, 0, 8, 21, 2, 0, 0], '&': [12, 18, 12, 8, 21, 18, 13],
    '♥': [0, 10, 31, 31, 14, 4, 0], '♦': [4, 14, 31, 31, 14, 4, 0],
    '★': [4, 4, 31, 14, 14, 10, 17], '☠': [14, 21, 31, 14, 4, 14, 10],
    '⚡': [3, 6, 12, 31, 6, 12, 8], '⛨': [31, 17, 17, 17, 10, 4, 0],
    '⏳': [31, 10, 4, 4, 10, 31, 0], '👁': [0, 14, 21, 27, 21, 14, 0],
    '⛓': [10, 21, 10, 0, 10, 21, 10], '$': [4, 15, 20, 14, 5, 30, 4],
    '🔥': [4, 12, 14, 30, 31, 31, 14], '☘': [4, 14, 31, 14, 4, 4, 8]
  };
  // acentos: mapa base + marca
  var ACC = {
    'Á': ['A', 'acute'], 'À': ['A', 'grave'], 'Â': ['A', 'circ'], 'Ã': ['A', 'tilde'],
    'É': ['E', 'acute'], 'Ê': ['E', 'circ'], 'Í': ['I', 'acute'],
    'Ó': ['O', 'acute'], 'Ô': ['O', 'circ'], 'Õ': ['O', 'tilde'],
    'Ú': ['U', 'acute'], 'Ü': ['U', 'uml'], 'Ç': ['C', 'cedil']
  };

  var cache = {};

  function glyphFor(ch) {
    var up = ch.toUpperCase();
    if (G[up]) return { rows: G[up], mark: null };
    if (ACC[up]) return { rows: G[ACC[up][0]], mark: ACC[up][1] };
    return { rows: G['?'], mark: null };
  }

  // desenha texto; size = altura do pixel (1 = 7px de altura)
  function draw(ctx, text, x, y, opts) {
    opts = opts || {};
    var px = opts.size || 1;
    var color = opts.color || '#e8e0d0';
    var spacing = (opts.spacing !== undefined ? opts.spacing : 1);
    var shadow = opts.shadow;
    var align = opts.align || 'left';
    var str = String(text);

    var totalW = measure(str, px, spacing);
    var cx = x;
    if (align === 'center') cx = Math.round(x - totalW / 2);
    else if (align === 'right') cx = Math.round(x - totalW);

    for (var pass = shadow ? 0 : 1; pass < 2; pass++) {
      var ox = pass === 0 ? px : 0, oy = pass === 0 ? px : 0;
      ctx.fillStyle = pass === 0 ? (typeof shadow === 'string' ? shadow : 'rgba(0,0,0,0.7)') : color;
      var dx = cx;
      for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ch === '\n') continue;
        var g = glyphFor(ch);
        for (var r = 0; r < 7; r++) {
          var row = g.rows[r];
          for (var b = 0; b < 5; b++) {
            if (row & (16 >> b)) {
              ctx.fillRect(dx + b * px + ox, y + r * px + oy, px, px);
            }
          }
        }
        if (g.mark && pass === 1) drawMark(ctx, g.mark, dx, y, px, color);
        if (g.mark && pass === 0) drawMark(ctx, g.mark, dx + ox, y + oy, px, ctx.fillStyle);
        dx += (5 + spacing) * px;
      }
    }
  }

  function drawMark(ctx, mark, x, y, px, color) {
    ctx.fillStyle = color;
    // marcas desenhadas acima do glifo (y-2px área)
    if (mark === 'acute') {
      ctx.fillRect(x + 3 * px, y - 2 * px, px, px);
      ctx.fillRect(x + 2 * px, y - px, px, px);
    } else if (mark === 'grave') {
      ctx.fillRect(x + px, y - 2 * px, px, px);
      ctx.fillRect(x + 2 * px, y - px, px, px);
    } else if (mark === 'circ') {
      ctx.fillRect(x + 2 * px, y - 2 * px, px, px);
      ctx.fillRect(x + px, y - px, px, px);
      ctx.fillRect(x + 3 * px, y - px, px, px);
    } else if (mark === 'tilde') {
      ctx.fillRect(x + px, y - px, px, px);
      ctx.fillRect(x + 2 * px, y - 2 * px, px, px);
      ctx.fillRect(x + 3 * px, y - px, px, px);
    } else if (mark === 'uml') {
      ctx.fillRect(x + px, y - 2 * px, px, px);
      ctx.fillRect(x + 3 * px, y - 2 * px, px, px);
    } else if (mark === 'cedil') {
      ctx.fillRect(x + 2 * px, y + 7 * px, px, px);
      ctx.fillRect(x + px, y + 8 * px, 2 * px, px);
    }
  }

  function measure(text, px, spacing) {
    px = px || 1;
    spacing = (spacing !== undefined ? spacing : 1);
    return String(text).length * (5 + spacing) * px - spacing * px;
  }

  // quebra de linha por largura máxima (px de tela)
  function wrap(text, px, spacing, maxW) {
    var words = String(text).split(' ');
    var lines = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var test = cur ? cur + ' ' + words[i] : words[i];
      if (measure(test, px, spacing) > maxW && cur) {
        lines.push(cur);
        cur = words[i];
      } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  RA.gfx.Font = { draw: draw, measure: measure, wrap: wrap, lineH: function (px) { return 9 * (px || 1); } };
})();
