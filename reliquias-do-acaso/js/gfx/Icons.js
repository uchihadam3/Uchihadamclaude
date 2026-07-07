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
      case 'doom': px(1, 1, 6, 4, '#8a4ae8'); px(2, 2, 1, 1, '#e8d8ff'); px(5, 2, 1, 1, '#e8d8ff'); px(3, 5, 2, 3, '#5c2ea8'); px(2, 7, 4, 1, '#c8b8e8'); break;
      default: px(2, 2, 4, 4, '#e8e0d0');
    }
    return c;
  }

  // ============================================================
  // GLIFOS POR EFEITO: cada efeito de face tem um desenho ÚNICO
  // (10x10, desenhados com primitivas). Bata o olho, saiba o efeito.
  // ============================================================
  var FX_GLYPHS = {
    // --- dano ---
    orb: function (p) { p(3, 2, 5, 5, '#6e4ac8'); p(4, 3, 3, 3, '#a88ae8'); p(4, 3, 1, 1, '#f0e8ff'); p(2, 4, 1, 2, '#4a2e8a'); p(8, 4, 1, 2, '#4a2e8a'); p(4, 8, 3, 1, '#38225c'); },
    swords: function (p) { p(2, 1, 2, 6, '#e8e8f0'); p(6, 1, 2, 6, '#c8ccd8'); p(1, 6, 4, 1, '#c9a23a'); p(5, 6, 4, 1, '#c9a23a'); p(2, 7, 2, 2, '#6e5a2e'); p(6, 7, 2, 2, '#6e5a2e'); },
    arrow: function (p) { p(4, 0, 2, 7, '#c8ccd8'); p(3, 1, 4, 1, '#e8e8f0'); p(2, 2, 2, 1, '#e8e8f0'); p(6, 2, 2, 1, '#e8e8f0'); p(3, 7, 4, 1, '#8a6e3c'); p(4, 8, 2, 2, '#c86a3a'); },
    fang: function (p) { p(2, 1, 2, 5, '#e8e0d0'); p(6, 1, 2, 5, '#e8e0d0'); p(3, 6, 1, 2, '#c8c0b0'); p(6, 6, 1, 2, '#c8c0b0'); p(2, 8, 6, 1, '#e84a5a'); },
    bloodblade: function (p) { p(4, 0, 2, 6, '#e8e8f0'); p(3, 6, 4, 1, '#c9a23a'); p(4, 7, 2, 2, '#6e5a2e'); p(1, 2, 2, 3, '#e84a5a'); p(7, 4, 2, 3, '#b82432'); },
    combo: function (p) { p(1, 4, 3, 2, '#ffd76a'); p(4, 2, 3, 2, '#ff9a4a'); p(7, 0, 3, 2, '#ff6a3c'); p(2, 7, 6, 2, '#e8e8f0'); },
    rage: function (p) { p(3, 1, 4, 5, '#b82432'); p(2, 2, 6, 3, '#e84a5a'); p(4, 3, 2, 2, '#ffd76a'); p(1, 6, 2, 3, '#8a1824'); p(7, 6, 2, 3, '#8a1824'); p(4, 6, 2, 3, '#b82432'); },
    gamble: function (p) { p(2, 2, 6, 6, '#e8e8f0'); p(3, 3, 1, 1, '#38304a'); p(6, 3, 1, 1, '#38304a'); p(4, 5, 2, 1, '#e84a5a'); p(3, 7, 1, 1, '#38304a'); p(6, 7, 1, 1, '#38304a'); p(7, 0, 3, 3, '#ffd76a'); },
    thorn: function (p) { p(4, 1, 2, 8, '#4a7a3c'); p(2, 3, 2, 1, '#6ea85a'); p(6, 5, 2, 1, '#6ea85a'); p(1, 2, 1, 2, '#e84a5a'); p(8, 4, 1, 2, '#e84a5a'); },
    leech: function (p) { p(2, 2, 6, 4, '#8a2432'); p(3, 3, 4, 2, '#e84a5a'); p(2, 7, 2, 2, '#e84a5a'); p(6, 7, 2, 2, '#4ac86a'); p(4, 6, 2, 3, '#c8c0b0'); },
    // --- cura / suporte vital ---
    heartself: function (p) { p(2, 2, 2, 2, '#e84a5a'); p(6, 2, 2, 2, '#e84a5a'); p(2, 4, 6, 2, '#e84a5a'); p(4, 6, 2, 2, '#b82432'); p(0, 0, 2, 2, '#ffe9a0'); p(8, 0, 2, 2, '#ffe9a0'); p(0, 8, 2, 2, '#ffe9a0'); p(8, 8, 2, 2, '#ffe9a0'); },
    heartseek: function (p) { p(1, 1, 2, 2, '#e84a5a'); p(4, 1, 2, 2, '#e84a5a'); p(1, 3, 5, 2, '#e84a5a'); p(2, 5, 3, 1, '#b82432'); p(6, 5, 3, 2, '#ffd76a'); p(7, 3, 1, 2, '#ffd76a'); p(7, 7, 1, 2, '#ffd76a'); },
    mend: function (p) { p(2, 3, 6, 3, '#e84a5a'); p(4, 1, 2, 7, '#e84a5a'); p(1, 1, 3, 1, '#e8e0d0'); p(6, 7, 3, 1, '#e8e0d0'); p(3, 4, 4, 1, '#ffe9a0'); },
    duality: function (p) { p(1, 2, 4, 6, '#e84a5a'); p(5, 2, 4, 6, '#e8e8f0'); p(2, 4, 2, 2, '#ffe9a0'); p(6, 4, 2, 2, '#38304a'); },
    ankh: function (p) { p(4, 0, 2, 3, '#ffd76a'); p(3, 1, 4, 1, '#ffd76a'); p(4, 3, 2, 6, '#c9a23a'); p(2, 4, 6, 2, '#ffd76a'); p(4, 4, 2, 1, '#fff2b8'); },
    sparkle: function (p) { p(4, 0, 2, 10, '#e8f4ff'); p(0, 4, 10, 2, '#e8f4ff'); p(2, 2, 2, 2, '#a8d4f0'); p(6, 6, 2, 2, '#a8d4f0'); p(6, 2, 2, 2, '#a8d4f0'); p(2, 6, 2, 2, '#a8d4f0'); },
    purify: function (p) { p(3, 1, 4, 6, '#a8d4f0'); p(4, 2, 2, 3, '#e8f4ff'); p(2, 7, 6, 2, '#4a8ae8'); p(4, 0, 2, 1, '#fff'); },
    // --- defesa ---
    bulwark: function (p) { p(0, 2, 3, 5, '#8a94a8'); p(4, 1, 3, 6, '#c9d4e8'); p(7, 2, 3, 5, '#8a94a8'); p(0, 8, 10, 1, '#5a6478'); },
    shieldmove: function (p) { p(1, 2, 4, 5, '#8a94a8'); p(2, 3, 2, 2, '#c9d4e8'); p(6, 3, 2, 2, '#ffd76a'); p(7, 2, 2, 1, '#ffd76a'); p(7, 5, 2, 1, '#ffd76a'); p(8, 3, 2, 2, '#ffd76a'); },
    shatter: function (p) { p(2, 1, 6, 6, '#8a94a8'); p(4, 0, 1, 8, '#241f2c'); p(2, 4, 6, 1, '#241f2c'); p(1, 8, 2, 2, '#5a6478'); p(7, 8, 2, 2, '#5a6478'); p(4, 8, 2, 1, '#5a6478'); },
    guard: function (p) { p(3, 1, 4, 4, '#c8a482'); p(2, 5, 6, 4, '#6a5a8a'); p(0, 3, 3, 6, '#8a94a8'); p(1, 4, 1, 3, '#c9d4e8'); },
    // --- provocação / controle ---
    shout: function (p) { p(1, 3, 3, 4, '#c8a482'); p(4, 2, 2, 6, '#8a6a52'); p(6, 3, 2, 1, '#ffd76a'); p(7, 5, 2, 1, '#ffd76a'); p(6, 7, 2, 1, '#ffd76a'); },
    warcry: function (p) { p(0, 3, 2, 4, '#c8a482'); p(2, 2, 2, 6, '#8a6a52'); p(5, 1, 2, 2, '#ffd76a'); p(6, 4, 3, 2, '#ff9a4a'); p(5, 7, 2, 2, '#ffd76a'); p(8, 1, 2, 1, '#ffe9a0'); p(8, 8, 2, 1, '#ffe9a0'); },
    trap: function (p) { p(1, 4, 8, 3, '#8a8a94'); p(2, 2, 1, 3, '#c8ccd8'); p(4, 1, 1, 4, '#c8ccd8'); p(6, 1, 1, 4, '#c8ccd8'); p(8, 2, 1, 3, '#c8ccd8'); p(3, 7, 4, 2, '#5a5a64'); },
    hammer: function (p) { p(2, 1, 6, 3, '#8a94a8'); p(4, 4, 2, 5, '#8a6e3c'); p(2, 1, 2, 3, '#c9d4e8'); },
    hammer2: function (p) { p(1, 1, 5, 2, '#8a94a8'); p(2, 3, 2, 5, '#8a6e3c'); p(6, 4, 3, 2, '#e8c84a'); p(7, 2, 1, 2, '#e8c84a'); p(7, 7, 1, 1, '#e8c84a'); },
    // --- invocação / sacrifício ---
    portal: function (p) { p(2, 1, 6, 8, '#38225c'); p(3, 2, 4, 6, '#6e4ac8'); p(4, 3, 2, 4, '#c8b8e8'); p(4, 4, 2, 1, '#fff'); },
    whistle: function (p) { p(2, 4, 4, 3, '#c9a23a'); p(6, 4, 3, 2, '#ffd76a'); p(3, 3, 2, 1, '#8a6e2e'); p(7, 1, 1, 2, '#e8f4ff'); p(9, 2, 1, 1, '#e8f4ff'); p(8, 0, 1, 1, '#e8f4ff'); },
    altar: function (p) { p(2, 6, 6, 3, '#5a5468'); p(3, 4, 4, 2, '#8a8a99'); p(4, 1, 2, 3, '#e84a5a'); p(3, 2, 1, 1, '#ffd76a'); p(6, 2, 1, 1, '#ffd76a'); },
    ritual: function (p) { p(4, 1, 2, 5, '#c8ccd8'); p(3, 2, 4, 1, '#c8ccd8'); p(2, 6, 2, 2, '#e84a5a'); p(6, 6, 2, 2, '#e84a5a'); p(4, 7, 2, 2, '#b82432'); },
    // --- economia / sorte ---
    wager: function (p) { p(1, 1, 4, 4, '#e8c84a'); p(5, 5, 4, 4, '#8a6e2e'); p(2, 2, 2, 2, '#fff2b8'); p(6, 6, 2, 2, '#e8c84a'); },
    clover: function (p) { p(2, 1, 3, 3, '#4ac86a'); p(5, 1, 3, 3, '#4ac86a'); p(2, 4, 3, 3, '#4ac86a'); p(5, 4, 3, 3, '#4ac86a'); p(4, 3, 2, 2, '#2e8a4a'); p(5, 7, 2, 3, '#2e6e2a'); },
    plusdie: function (p) { p(1, 3, 5, 5, '#e8e8f0'); p(2, 4, 1, 1, '#38304a'); p(4, 6, 1, 1, '#38304a'); p(7, 1, 2, 4, '#4ac86a'); p(6, 2, 4, 2, '#4ac86a'); },
    gift: function (p) { p(2, 3, 6, 5, '#c85a7a'); p(2, 3, 6, 2, '#e88aa8'); p(4, 1, 2, 7, '#ffd76a'); p(2, 5, 6, 1, '#ffd76a'); p(3, 0, 1, 2, '#ffd76a'); p(6, 0, 1, 2, '#ffd76a'); },
    // --- manipulação de dados ---
    echo: function (p) { p(1, 3, 3, 4, '#c8b8e8'); p(5, 2, 2, 6, 'rgba(200,184,232,0.6)'); p(8, 1, 1, 8, 'rgba(200,184,232,0.35)'); },
    echoorb: function (p) { p(1, 3, 4, 4, '#6e4ac8'); p(2, 4, 2, 2, '#c8b8e8'); p(6, 2, 3, 3, 'rgba(110,74,200,0.55)'); p(8, 6, 2, 2, 'rgba(110,74,200,0.35)'); },
    mirror: function (p) { p(2, 1, 6, 7, '#38304a'); p(3, 2, 4, 5, '#a8d4f0'); p(4, 3, 1, 3, '#e8f4ff'); p(3, 8, 4, 2, '#8a6e3c'); },
    twins: function (p) { p(1, 2, 4, 4, '#e8e8f0'); p(2, 3, 1, 1, '#38304a'); p(5, 4, 4, 4, '#c8ccd8'); p(6, 5, 1, 1, '#38304a'); p(7, 7, 1, 1, '#38304a'); },
    link: function (p) { p(1, 3, 4, 4, '#ffd76a'); p(2, 4, 2, 2, '#241f2c'); p(5, 3, 4, 4, '#c9a23a'); p(6, 4, 2, 2, '#241f2c'); p(4, 4, 2, 2, '#ffe9a0'); },
    lockdie: function (p) { p(2, 4, 6, 5, '#8a6e3c'); p(3, 2, 4, 3, '#c9a23a'); p(4, 3, 2, 2, '#241f2c'); p(4, 6, 2, 2, '#ffd76a'); },
    reroll: function (p) { p(2, 1, 6, 2, '#6ee89a'); p(7, 3, 2, 3, '#6ee89a'); p(2, 7, 6, 2, '#4ac86a'); p(1, 4, 2, 3, '#4ac86a'); p(4, 4, 2, 2, '#e8e8f0'); },
    fatespin: function (p) { p(3, 1, 4, 2, '#ffd76a'); p(7, 3, 2, 4, '#c9a23a'); p(3, 7, 4, 2, '#ffd76a'); p(1, 3, 2, 4, '#c9a23a'); p(4, 4, 2, 2, '#fff2b8'); },
    fatepick: function (p) { p(1, 2, 3, 4, '#ffd76a'); p(6, 2, 3, 4, '#8a6e2e'); p(2, 7, 6, 1, '#c9a23a'); p(2, 3, 1, 2, '#fff2b8'); p(4, 0, 2, 2, '#fff2b8'); },
    command: function (p) { p(1, 1, 2, 8, '#8a6e3c'); p(3, 1, 6, 3, '#e84a5a'); p(3, 4, 4, 2, '#b82432'); p(4, 2, 2, 1, '#ffd76a'); },
    horn: function (p) { p(1, 5, 3, 3, '#c9a23a'); p(4, 4, 3, 3, '#ffd76a'); p(7, 2, 2, 4, '#ffe9a0'); p(2, 6, 1, 1, '#8a6e2e'); p(9, 1, 1, 2, '#fff2b8'); },
    twist: function (p) { p(2, 1, 6, 2, '#c8b8e8'); p(6, 4, 3, 2, '#8a6ae8'); p(2, 7, 6, 2, '#c8b8e8'); p(1, 4, 3, 2, '#8a6ae8'); },
    pause: function (p) { p(2, 2, 2, 6, '#e8d8a0'); p(6, 2, 2, 6, '#e8d8a0'); p(1, 1, 8, 1, '#6e5a3c'); p(1, 8, 8, 1, '#6e5a3c'); },
    swap: function (p) { p(1, 2, 5, 2, '#6ee89a'); p(6, 1, 2, 4, '#6ee89a'); p(4, 6, 5, 2, '#e8a04a'); p(2, 5, 2, 4, '#e8a04a'); },
    rows: function (p) { p(1, 2, 8, 2, '#8a94a8'); p(1, 6, 8, 2, '#5a6478'); p(4, 0, 2, 2, '#ffd76a'); p(4, 8, 2, 2, '#ffd76a'); },
    exchange: function (p) { p(1, 1, 3, 3, '#e84a5a'); p(6, 6, 3, 3, '#4ac86a'); p(5, 2, 4, 1, '#e8e0d0'); p(8, 1, 1, 3, '#e8e0d0'); p(1, 7, 4, 1, '#e8e0d0'); p(1, 6, 1, 3, '#e8e0d0'); },
    flip: function (p) { p(1, 2, 4, 4, '#e8e8f0'); p(2, 3, 1, 1, '#38304a'); p(5, 4, 4, 4, '#38304a'); p(6, 5, 2, 2, '#e8e8f0'); },
    pocket: function (p) { p(2, 3, 6, 6, '#8a6e3c'); p(2, 3, 6, 2, '#c9a23a'); p(3, 0, 4, 4, '#e8e8f0'); p(4, 1, 1, 1, '#38304a'); },
    anvil: function (p) { p(1, 3, 8, 3, '#8a94a8'); p(3, 6, 4, 1, '#5a6478'); p(2, 7, 6, 2, '#5a6478'); p(4, 0, 3, 3, '#ffd76a'); },
    balance: function (p) { p(4, 1, 2, 8, '#c9a23a'); p(1, 2, 8, 1, '#c9a23a'); p(0, 3, 3, 2, '#ffd76a'); p(7, 3, 3, 2, '#ffd76a'); p(2, 9, 6, 1, '#8a6e2e'); },
    gear: function (p) { p(3, 3, 4, 4, '#8a94a8'); p(4, 1, 2, 2, '#8a94a8'); p(4, 7, 2, 2, '#8a94a8'); p(1, 4, 2, 2, '#8a94a8'); p(7, 4, 2, 2, '#8a94a8'); p(4, 4, 2, 2, '#38304a'); },
    // --- habilidades lendárias ---
    wallblade: function (p) { p(1, 2, 3, 6, '#8a94a8'); p(2, 3, 1, 3, '#c9d4e8'); p(5, 4, 4, 2, '#e8e8f0'); p(8, 3, 2, 4, '#ffd76a'); },
    grabshield: function (p) { p(5, 1, 4, 5, '#8a94a8'); p(6, 2, 2, 2, '#c9d4e8'); p(1, 5, 3, 2, '#c8a482'); p(2, 7, 3, 2, '#c8a482'); p(4, 4, 2, 2, '#ffd76a'); },
    lifelink: function (p) { p(1, 1, 3, 3, '#e84a5a'); p(6, 6, 3, 3, '#e84a5a'); p(3, 4, 2, 2, '#ffd76a'); p(5, 3, 2, 2, '#ffd76a'); p(2, 2, 1, 1, '#fff'); p(7, 7, 1, 1, '#fff'); },
    absolve: function (p) { p(4, 0, 2, 7, '#e8f4ff'); p(2, 2, 6, 2, '#e8f4ff'); p(1, 7, 3, 2, '#8a4ae8'); p(6, 7, 3, 2, '#e84a5a'); },
    guillotine: function (p) { p(1, 0, 2, 9, '#6e5a3c'); p(7, 0, 2, 9, '#6e5a3c'); p(2, 1, 6, 2, '#c9d4e8'); p(2, 3, 6, 1, '#8a94a8'); p(3, 7, 4, 2, '#38304a'); }
  };

  function fxGlyph(name) {
    var c = document.createElement('canvas');
    c.width = 10; c.height = 10;
    var ctx = c.getContext('2d');
    FX_GLYPHS[name](function (x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); });
    return c;
  }

  // símbolo ampliado de um status (mesmo desenho do painel — consistência!)
  function statusSymbol(kind) {
    var c = document.createElement('canvas');
    c.width = 10; c.height = 10;
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(statusIcon(kind), 1, 1, 8, 8);
    return c;
  }

  // decide o símbolo de uma face pelo PRIMEIRO efeito dela.
  // efeitos diferentes => desenhos diferentes; status usam o ícone do status.
  function faceSymbol(face) {
    var fx = (face.fx || [])[0];
    if (!fx) return face.sym || 'star';
    var k = fx.k;
    if (k === 'st') return 'st_' + fx.s;
    if (k === 'dmg') {
      if (fx.magic) return 'orb';
      if (fx.times > 1) return 'swords';
      if (fx.ignoreShield) return 'arrow';
      if (fx.onlyHalfHp || fx.onlyMarked || fx.twiceIfMarked) return 'fang';
      if (fx.healOnKill) return 'leech';
      return 'sword';
    }
    var MAP = {
      dmgCombo: 'combo', dmgOnlyVulnerable: 'fang', dmgOnlyBleeding: 'bloodblade',
      dmgLostHp: 'rage', dmgUpTo: 'gamble', selfDmg: 'thorn',
      heal: 'heart', healSelf: 'heartself', healLowest: 'heartseek',
      healIfDamagedThisTurn: 'mend', mixHealDmg: 'duality', revive: 'ankh',
      cleanse: 'sparkle', cleanseTypes: 'purify',
      shield: 'shield', shieldPerEnemy: 'bulwark', moveShield: 'shieldmove',
      breakShield: 'shatter', protect: 'guard',
      taunt: 'shout', tauntStrong: 'shout', tauntAll: 'warcry', trap: 'trap',
      stunIfNoShield: 'hammer', stunWeakest: 'hammer2',
      summon: 'portal', summonsAct: 'whistle', sacrificeSummon: 'altar', sacrificeChoice: 'ritual',
      coin: 'coin', doubleOrNothing: 'wager', luckKillReroll: 'clover', extraRollThisTurn: 'plusdie',
      randomBoon: 'gift', copyLast: 'echo', copyLastMagic: 'echoorb', copyEnemyDie: 'mirror',
      duplicateDie: 'twins', linkDice: 'link', blockEnemyDie: 'lockdie',
      rerollAlly: 'reroll', rerollFate: 'fatespin', chooseFate: 'fatepick',
      commandRepeat: 'command', buffAttacks: 'horn', peekIntents: 'eye',
      twistIntent: 'twist', delayIntent: 'pause', swapDice: 'swap', swapRows: 'rows',
      swapHpPercent: 'exchange', flipDie: 'flip', storeDie: 'pocket',
      repairCracked: 'anvil', equalizeDice: 'balance', overclock: 'gear',
      shieldToDmg: 'wallblade', stealShield: 'grabshield', lifelink: 'lifelink',
      cleanseToDmg: 'absolve', execute: 'guillotine'
    };
    return MAP[k] || face.sym || 'star';
  }

  RA.gfx.Icons = {
    symbol: function (name) {
      var key = 'sym_' + name;
      if (!cache[key]) {
        if (name && name.indexOf('st_') === 0) cache[key] = statusSymbol(name.slice(3));
        else if (FX_GLYPHS[name]) cache[key] = fxGlyph(name);
        else {
          var def = DEFS[name];
          cache[key] = def ? sprite(def.rows, def.colors) : sprite(DEFS.sword.rows, DEFS.sword.colors);
        }
      }
      return cache[key];
    },
    status: function (kind) {
      var key = 'st_' + kind;
      if (!cache[key]) cache[key] = statusIcon(kind);
      return cache[key];
    },
    faceSymbol: faceSymbol,
    SYMBOLS: ['sword', 'shield', 'heart', 'flame', 'drop', 'skull', 'star', 'bolt', 'eye', 'chain', 'coin', 'hour']
  };
})();
