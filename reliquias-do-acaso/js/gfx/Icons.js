// Icons: os 12 símbolos dos dados + ícones de status, desenhados pixel a
// pixel em mini-canvases cacheados (10x10), com paleta normal e daltônica.
(function () {
  var cache = {};

  // desenho por grade de strings: '.'=nada, letras=cores do mapa
  function sprite(rows, colors) {
    var h = rows.length, w = rows[0].length;
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var ch = rows[y][x];
        if (ch === '.') continue;
        ctx.fillStyle = colors[ch] || '#fff';
        ctx.fillRect(x, y, 1, 1);
      }
    }
    return c;
  }

  var DEFS = {
    sword: {
      rows: ['....a.....', '...aba....', '...aba....', '...aba....', '...aba....',
        '.c.aba.c..', '..cabac...', '...ccc....', '...dd.....', '..dd......'],
      colors: { a: '#e8e8f0', b: '#b8c0d8', c: '#c9a23a', d: '#6e5a2e' }
    },
    shield: {
      rows: ['.aaaaaaaa.', 'abbbbbbba.', 'abccccbba.', 'abccccbba.', 'abbbbbbba.',
        '.abbbbba..', '.abbbbba..', '..abbba...', '...aba....', '....a.....'],
      colors: { a: '#8a94a8', b: '#5a6478', c: '#c9d4e8' }
    },
    heart: {
      rows: ['..aa..aa..', '.abbaabba.', 'abbbbbbbba', 'abbbbbbbba', 'abbbbbbbba',
        '.abbbbbba.', '..abbbba..', '...abba...', '....aa....', '..........'],
      colors: { a: '#8a2432', b: '#e84a5a' }
    },
    flame: {
      rows: ['....a.....', '...ab.....', '...abb....', '..abbb....', '.abbcbb...',
        '.abcccb...', 'abccdccba.', 'abcdddcba.', '.abcdcba..', '..abbba...'],
      colors: { a: '#b8442a', b: '#ff8a3c', c: '#ffd27a', d: '#fff2c9' }
    },
    drop: {
      rows: ['....a.....', '....ab....', '...abb....', '...abbb...', '..abbbb...',
        '..abcbbb..', '.abccbbb..', '.abbbbbb..', '..abbbb...', '...aaa....'],
      colors: { a: '#2e6e2a', b: '#6ec83c', c: '#c8ff8a' }
    },
    skull: {
      rows: ['..aaaaaa..', '.aabbbbaa.', '.abbbbbba.', '.abcbbcba.', '.abbbbbba.',
        '..abbbba..', '..abappba..'.slice(0, 10), '...aaaa...', '...a.aa...', '..........'],
      colors: { a: '#8a8a94', b: '#e8e8f0', c: '#24242e', p: '#24242e' }
    },
    star: {
      rows: ['....aa....', '....aa....', '...abba...', 'aaabbbbaaa', '.abbbbbba.',
        '..abbbba..', '..abbbba..', '.abba.abba'.slice(0, 10), '.aa....aa.', '..........'],
      colors: { a: '#c9a23a', b: '#ffe9a0' }
    },
    bolt: {
      rows: ['....aab...', '...aab....', '..aab.....', '.aabbbb...', '...abb....',
        '..abb.....', '..ab......', '.ab.......', '.b........', '..........'],
      colors: { a: '#e8d84a', b: '#fffbc8' }
    },
    eye: {
      rows: ['..........', '..aaaaaa..', '.abbbbbba.', 'abbcddcbba', 'abcdeedcba',
        'abbcddcbba', '.abbbbbba.', '..aaaaaa..', '..........', '..........'],
      colors: { a: '#4a3a5c', b: '#c8b8e8', c: '#6e4a9d', d: '#38284a', e: '#e8e0ff' }
    },
    chain: {
      rows: ['.aa....aa.', 'a..a..a..a', 'a..a..a..a', '.aa.aa.aa.', '...a..a...',
        '...a..a...', '.aa.aa.aa.', 'a..a..a..a', 'a..a..a..a', '.aa....aa.'],
      colors: { a: '#a8a8b8' }
    },
    coin: {
      rows: ['..aaaaaa..', '.abbbbbba.', 'abbcbbcbba'.slice(0, 10), 'abbbccbbba', 'abbbccbbba',
        'abbbccbbba', 'abbcbbcbba'.slice(0, 10), '.abbbbbba.', '..aaaaaa..', '..........'],
      colors: { a: '#8a6e2e', b: '#e8c84a', c: '#fff2b8' }
    },
    hour: {
      rows: ['aaaaaaaaaa', '.abbbbbba.', '..abbbba..', '...abba...', '....aa....',
        '...abba...', '..abccba..', '.abccccba.', 'aaaaaaaaaa', '..........'],
      colors: { a: '#6e5a3c', b: '#e8d8a0', c: '#c9a94a' }
    }
  };

  // ícones de status (pequenos, 8x8) — desenhados com primitivas
  function statusIcon(kind) {
    var c = document.createElement('canvas');
    c.width = 8; c.height = 8;
    var x = c.getContext('2d');
    function px(cx, cy, w, h, col) { x.fillStyle = col; x.fillRect(cx, cy, w, h); }
    switch (kind) {
      case 'shield': px(1, 0, 6, 5, '#8a94a8'); px(2, 5, 4, 2, '#8a94a8'); px(3, 1, 2, 3, '#c9d4e8'); break;
      case 'barrier': px(0, 1, 8, 6, '#5a8ab8'); px(1, 2, 6, 4, '#a8d4f0'); break;
      case 'regen': px(3, 0, 2, 8, '#4ac86a'); px(0, 3, 8, 2, '#4ac86a'); break;
      case 'inspire': px(3, 0, 2, 5, '#ffe9a0'); px(2, 5, 4, 2, '#c9a23a'); break;
      case 'focus': px(0, 3, 8, 2, '#e8e8f0'); px(3, 0, 2, 8, '#e8e8f0'); px(2, 2, 4, 4, '#38284a'); break;
      case 'protect': px(1, 1, 6, 6, '#c9d4e8'); px(3, 3, 2, 2, '#5a6478'); break;
      case 'counter': px(1, 4, 5, 2, '#e8b84a'); px(5, 1, 2, 5, '#e8b84a'); break;
      case 'camo': px(0, 0, 8, 8, 'rgba(140,160,180,0.4)'); break;
      case 'charge': px(2, 0, 3, 4, '#e8d84a'); px(3, 4, 3, 4, '#e8d84a'); break;
      case 'stored': px(1, 1, 6, 6, '#c9a94a'); px(2, 2, 4, 4, '#38302a'); break;
      case 'poison': px(3, 0, 2, 2, '#6ec83c'); px(2, 2, 4, 4, '#4a9d2e'); px(3, 6, 2, 2, '#2e6e2a'); break;
      case 'bleed': px(2, 0, 2, 3, '#e84a5a'); px(4, 3, 2, 3, '#b82432'); px(3, 6, 2, 2, '#8a1824'); break;
      case 'burn': px(3, 0, 2, 3, '#ff8a3c'); px(1, 3, 6, 4, '#ffd27a'); break;
      case 'freeze': px(3, 0, 2, 8, '#a8d4f0'); px(0, 3, 8, 2, '#a8d4f0'); px(1, 1, 2, 2, '#e8f4ff'); px(5, 5, 2, 2, '#e8f4ff'); break;
      case 'stun': px(1, 1, 2, 2, '#ffe9a0'); px(5, 1, 2, 2, '#ffe9a0'); px(3, 4, 2, 2, '#ffe9a0'); break;
      case 'mark': px(0, 0, 8, 1, '#e84a5a'); px(0, 7, 8, 1, '#e84a5a'); px(0, 0, 1, 8, '#e84a5a'); px(7, 0, 1, 8, '#e84a5a'); px(3, 3, 2, 2, '#e84a5a'); break;
      case 'vulnerable': px(1, 0, 6, 6, '#e8a04a'); px(3, 2, 2, 2, '#6e3a1a'); px(2, 6, 4, 2, '#b86a2e'); break;
      case 'weak': px(1, 2, 6, 2, '#8a8a94'); px(2, 5, 4, 2, '#5a5a64'); break;
      case 'curse': px(2, 1, 4, 5, '#8a4ae8'); px(3, 6, 2, 2, '#5c2ea8'); px(3, 2, 2, 2, '#e8d8ff'); break;
      case 'cracked': px(1, 1, 6, 6, '#a8a8b8'); px(3, 0, 1, 8, '#38283a'); px(2, 4, 4, 1, '#38283a'); break;
      case 'silence': px(1, 1, 6, 5, '#c8b8e8'); px(0, 0, 8, 1, '#e84a5a'); px(3, 6, 2, 2, '#8a7ab8'); break;
      case 'blind': px(1, 2, 6, 4, '#38284a'); px(0, 4, 8, 1, '#8a8a94'); break;
      case 'chained': px(1, 1, 2, 2, '#a8a8b8'); px(5, 1, 2, 2, '#a8a8b8'); px(3, 3, 2, 2, '#a8a8b8'); px(1, 5, 2, 2, '#a8a8b8'); px(5, 5, 2, 2, '#a8a8b8'); break;
      case 'fear': px(2, 1, 4, 4, '#c8b8e8'); px(2, 5, 1, 2, '#c8b8e8'); px(5, 5, 1, 2, '#c8b8e8'); px(3, 2, 1, 1, '#38284a'); px(5, 2, 1, 1, '#38284a'); break;
      case 'slow': px(1, 1, 6, 6, '#8a94a8'); px(3, 2, 2, 3, '#38304a'); px(3, 4, 3, 1, '#38304a'); break;
      case 'dodge': px(1, 1, 3, 6, 'rgba(200,220,240,0.5)'); px(4, 1, 3, 6, '#c8dcf0'); break;
      default: px(2, 2, 4, 4, '#e8e0d0');
    }
    return c;
  }

  RA.gfx.Icons = {
    symbol: function (name) {
      var key = 'sym_' + name;
      if (!cache[key]) {
        var def = DEFS[name];
        cache[key] = def ? sprite(def.rows, def.colors) : sprite(DEFS.sword.rows, DEFS.sword.colors);
      }
      return cache[key];
    },
    status: function (kind) {
      var key = 'st_' + kind;
      if (!cache[key]) cache[key] = statusIcon(kind);
      return cache[key];
    },
    SYMBOLS: ['sword', 'shield', 'heart', 'flame', 'drop', 'skull', 'star', 'bolt', 'eye', 'chain', 'coin', 'hour']
  };
})();
