// Portraits: retratos 24x24 dos heróis, especificados à mão por herói
// (pele, cabelo, chapelaria, olhos, detalhe, gola) e pintados por camadas.
(function () {
  var cache = {};

  var SKINS = {
    claro: { base: '#e8b98a', shade: '#c89468', dark: '#a87848' },
    medio: { base: '#c8905c', shade: '#a87244', dark: '#885a34' },
    escuro: { base: '#8a5c3c', shade: '#6e4830', dark: '#523624' },
    palido: { base: '#e8d0c0', shade: '#c8a898', dark: '#a88878' },
    cinzento: { base: '#a8a8b0', shade: '#8a8a94', dark: '#6a6a74' },  // golem/morto
    verde: { base: '#8aa86a', shade: '#6e8a50', dark: '#527038' }
  };

  function px(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }

  function paint(spec) {
    var c = document.createElement('canvas');
    c.width = 24; c.height = 24;
    var ctx = c.getContext('2d');
    var sk = SKINS[spec.skin || 'claro'];

    // fundo sutil (aura da classe)
    px(ctx, 0, 0, 24, 24, spec.bg || '#1a1626');

    // ombros / roupa
    px(ctx, 3, 18, 18, 6, spec.cloth || '#4a3a5c');
    px(ctx, 3, 18, 18, 2, shade(spec.cloth || '#4a3a5c', 1.25));
    if (spec.armor) {
      px(ctx, 3, 18, 4, 6, '#8a94a8');
      px(ctx, 17, 18, 4, 6, '#8a94a8');
    }

    // pescoço + cabeça
    px(ctx, 10, 16, 4, 3, sk.shade);
    px(ctx, 7, 5, 10, 12, sk.base);
    px(ctx, 7, 13, 10, 4, sk.shade);       // queixo/sombra
    px(ctx, 7, 5, 2, 12, sk.shade);        // lateral

    // orelhas
    px(ctx, 6, 10, 1, 3, sk.shade);
    px(ctx, 17, 10, 1, 3, sk.shade);

    // olhos
    var eyeY = 10;
    if (spec.eyes === 'glow') {
      px(ctx, 9, eyeY, 2, 2, spec.eyeColor || '#7de8d8');
      px(ctx, 13, eyeY, 2, 2, spec.eyeColor || '#7de8d8');
    } else if (spec.eyes === 'patch') {
      px(ctx, 9, eyeY, 2, 2, '#241a14');
      px(ctx, 12, eyeY - 1, 4, 3, '#1a1410');
    } else if (spec.eyes === 'closed') {
      px(ctx, 9, eyeY + 1, 2, 1, sk.dark);
      px(ctx, 13, eyeY + 1, 2, 1, sk.dark);
    } else if (spec.eyes === 'mask') {
      px(ctx, 8, eyeY - 1, 8, 3, spec.maskColor || '#38304a');
      px(ctx, 9, eyeY, 2, 1, '#e8e8f0');
      px(ctx, 13, eyeY, 2, 1, '#e8e8f0');
    } else {
      px(ctx, 9, eyeY, 2, 2, '#f0ece0');
      px(ctx, 13, eyeY, 2, 2, '#f0ece0');
      px(ctx, 10, eyeY, 1, 2, spec.eyeColor || '#38304a');
      px(ctx, 14, eyeY, 1, 2, spec.eyeColor || '#38304a');
    }
    // sobrancelhas
    if (spec.eyes !== 'mask') {
      px(ctx, 9, eyeY - 2, 3, 1, spec.hairColor || sk.dark);
      px(ctx, 13, eyeY - 2, 3, 1, spec.hairColor || sk.dark);
    }

    // boca
    if (spec.mouth === 'grin') px(ctx, 10, 15, 4, 1, '#f0ece0');
    else if (spec.mouth === 'frown') { px(ctx, 10, 15, 4, 1, sk.dark); px(ctx, 9, 16, 1, 1, sk.dark); }
    else px(ctx, 10, 15, 3, 1, sk.dark);

    // detalhes faciais
    if (spec.beard) {
      px(ctx, 8, 13, 8, 4, spec.hairColor || '#5a4632');
      px(ctx, 9, 17, 6, 2, spec.hairColor || '#5a4632');
      px(ctx, 10, 15, 3, 1, sk.dark);
    }
    if (spec.scar) { px(ctx, 14, 7, 1, 5, '#b8442a'); }
    if (spec.tattoo) { px(ctx, 8, 12, 2, 1, spec.tattooColor || '#4a8ae8'); px(ctx, 9, 13, 1, 1, spec.tattooColor || '#4a8ae8'); }

    // cabelo
    var hc = spec.hairColor || '#5a4632';
    switch (spec.hair) {
      case 'curto':
        px(ctx, 6, 3, 12, 4, hc); px(ctx, 6, 6, 2, 3, hc); px(ctx, 16, 6, 2, 3, hc); break;
      case 'longo':
        px(ctx, 6, 3, 12, 4, hc); px(ctx, 5, 5, 3, 13, hc); px(ctx, 16, 5, 3, 13, hc); break;
      case 'espetado':
        px(ctx, 6, 3, 12, 3, hc);
        px(ctx, 6, 1, 2, 3, hc); px(ctx, 9, 0, 2, 4, hc); px(ctx, 12, 1, 2, 3, hc); px(ctx, 15, 0, 2, 4, hc); break;
      case 'rabo':
        px(ctx, 6, 3, 12, 4, hc); px(ctx, 17, 4, 3, 3, hc); px(ctx, 19, 6, 2, 8, hc); break;
      case 'coque':
        px(ctx, 6, 3, 12, 4, hc); px(ctx, 9, 0, 6, 3, hc); break;
      case 'moicano':
        px(ctx, 10, 0, 4, 7, hc); break;
      case 'selvagem':
        px(ctx, 5, 2, 14, 5, hc); px(ctx, 4, 4, 2, 8, hc); px(ctx, 18, 4, 2, 8, hc); px(ctx, 7, 0, 3, 3, hc); px(ctx, 14, 0, 3, 3, hc); break;
      case 'trancas':
        px(ctx, 6, 3, 12, 4, hc); px(ctx, 5, 6, 2, 10, hc); px(ctx, 17, 6, 2, 10, hc);
        px(ctx, 5, 9, 2, 1, '#c9a23a'); px(ctx, 17, 12, 2, 1, '#c9a23a'); break;
      case 'careca': break;
      default: px(ctx, 6, 3, 12, 4, hc);
    }

    // chapelaria (desenhada por cima do cabelo)
    switch (spec.headgear) {
      case 'elmo':
        px(ctx, 5, 2, 14, 6, '#8a94a8'); px(ctx, 5, 7, 3, 6, '#8a94a8'); px(ctx, 16, 7, 3, 6, '#8a94a8');
        px(ctx, 6, 3, 12, 1, '#c9d4e8'); break;
      case 'capuz':
        px(ctx, 5, 1, 14, 6, spec.hoodColor || '#38304a');
        px(ctx, 4, 4, 3, 12, spec.hoodColor || '#38304a');
        px(ctx, 17, 4, 3, 12, spec.hoodColor || '#38304a'); break;
      case 'chapeuBruxa':
        px(ctx, 4, 5, 16, 2, '#241c30'); px(ctx, 8, 1, 8, 4, '#241c30'); px(ctx, 10, -1, 4, 3, '#241c30');
        px(ctx, 8, 4, 8, 1, '#8a4ae8'); break;
      case 'chapeuLargo':
        px(ctx, 3, 5, 18, 2, '#4a3a2c'); px(ctx, 7, 2, 10, 3, '#4a3a2c'); break;
      case 'coroa':
        px(ctx, 7, 1, 10, 3, '#c9a23a'); px(ctx, 7, 0, 2, 2, '#ffe9a0'); px(ctx, 11, 0, 2, 2, '#ffe9a0'); px(ctx, 15, 0, 2, 2, '#ffe9a0'); break;
      case 'bandana':
        px(ctx, 6, 5, 12, 2, spec.bandColor || '#b8442a'); break;
      case 'chifres':
        px(ctx, 4, 1, 2, 4, '#e8d8c0'); px(ctx, 18, 1, 2, 4, '#e8d8c0');
        px(ctx, 4, 0, 1, 2, '#c8b8a0'); px(ctx, 19, 0, 1, 2, '#c8b8a0'); break;
      case 'aureola':
        px(ctx, 8, 0, 8, 1, '#ffe9a0'); break;
      case 'oculos':
        px(ctx, 8, 9, 3, 3, '#c9a23a'); px(ctx, 13, 9, 3, 3, '#c9a23a'); px(ctx, 11, 10, 2, 1, '#c9a23a');
        px(ctx, 9, 10, 1, 1, '#a8e8f0'); px(ctx, 14, 10, 1, 1, '#a8e8f0'); break;
      case 'flor':
        px(ctx, 16, 2, 3, 3, '#e87aa8'); px(ctx, 17, 3, 1, 1, '#ffe9a0'); break;
    }

    return c;
  }

  function shade(hex, mult) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.round(r * mult));
    g = Math.min(255, Math.round(g * mult));
    b = Math.min(255, Math.round(b * mult));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  RA.gfx.Portraits = {
    get: function (heroId) {
      if (!cache[heroId]) {
        var hero = RA.data.Heroes.byId[heroId];
        cache[heroId] = paint(hero ? hero.look : {});
      }
      return cache[heroId];
    },
    paint: paint
  };
})();
