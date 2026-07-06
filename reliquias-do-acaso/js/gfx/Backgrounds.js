// Backgrounds: cenários animados por região — camada estática cacheada
// (paisagem pixel) + elementos animados leves por frame (partículas, brilhos).
(function () {
  var cache = {};

  function mulberry32(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function px(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }

  // pinta silhuetas de morros/estruturas
  function hills(ctx, w, h, baseY, amp, col, rng, spike) {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(0, h);
    var y = baseY;
    for (var x = 0; x <= w; x += 16) {
      y += (rng() - 0.5) * amp;
      y = Math.max(baseY - amp * 2, Math.min(baseY + amp * 2, y));
      ctx.lineTo(x, y);
      if (spike && rng() < 0.15) {
        ctx.lineTo(x + 4, y - amp * (1 + rng()));
        ctx.lineTo(x + 8, y);
      }
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  var SCENES = {
    estrada: {
      sky: ['#3a3448', '#241f30', '#181420'],
      paint: function (ctx, w, h, rng) {
        hills(ctx, w, h, h * 0.45, 14, '#2a2438', rng);
        hills(ctx, w, h, h * 0.6, 18, '#1e1a2a', rng);
        // estrada quebrada
        px(ctx, 0, h * 0.78, w, h * 0.22, '#3a3028');
        for (var x = 0; x < w; x += 22) {
          px(ctx, x + rng() * 8, h * 0.78 + rng() * 4, 12, 3, '#4a4034');
          if (rng() < 0.3) px(ctx, x, h * 0.82 + rng() * 10, 6, 5, '#2a241e');
        }
        // carroças quebradas / postes
        for (var i = 0; i < 3; i++) {
          var cx = rng() * w;
          px(ctx, cx, h * 0.68, 3, h * 0.1, '#241e18');
          px(ctx, cx - 4, h * 0.66, 11, 3, '#241e18');
        }
      },
      ambient: 'folhas'
    },
    floresta: {
      sky: ['#1c2e1c', '#122012', '#0a140c'],
      paint: function (ctx, w, h, rng) {
        // troncos gigantes
        for (var i = 0; i < 8; i++) {
          var tx = (i / 8) * w + rng() * 20;
          var tw = 8 + rng() * 14;
          px(ctx, tx, 0, tw, h * 0.8, i % 2 ? '#16281a' : '#1c3020');
          px(ctx, tx + tw * 0.3, 0, 2, h * 0.8, '#0e1c10');
        }
        hills(ctx, w, h, h * 0.72, 10, '#14241a', rng);
        px(ctx, 0, h * 0.8, w, h * 0.2, '#0f1c12');
        // cogumelos
        for (var m = 0; m < 12; m++) {
          var mx = rng() * w, my = h * 0.8 + rng() * h * 0.14;
          px(ctx, mx, my, 2, 4, '#3a4a30');
          px(ctx, mx - 2, my - 2, 6, 3, rng() < 0.5 ? '#6ec83c' : '#b07ae8');
        }
      },
      ambient: 'esporos'
    },
    cripta: {
      sky: ['#1e1c28', '#141220', '#0c0a14'],
      paint: function (ctx, w, h, rng) {
        // colunas e arcos
        for (var i = 0; i < 6; i++) {
          var cx = (i / 6) * w + 10;
          px(ctx, cx, h * 0.18, 14, h * 0.62, '#242232');
          px(ctx, cx - 3, h * 0.14, 20, 6, '#2e2c40');
          px(ctx, cx + 4, h * 0.24, 5, h * 0.5, '#1a1826');
        }
        px(ctx, 0, h * 0.8, w, h * 0.2, '#1a1824');
        // ossadas e lápides
        for (var b = 0; b < 10; b++) {
          var bx = rng() * w, by = h * 0.8 + rng() * h * 0.12;
          if (rng() < 0.5) { px(ctx, bx, by, 8, 6, '#38364a'); px(ctx, bx + 2, by - 3, 4, 3, '#38364a'); }
          else px(ctx, bx, by + 2, 7, 2, '#8a8a94');
        }
        // velas
        for (var v = 0; v < 5; v++) {
          px(ctx, rng() * w, h * (0.5 + rng() * 0.2), 2, 5, '#c8c0a0');
        }
      },
      ambient: 'almas'
    },
    forja: {
      sky: ['#38180e', '#240e08', '#160804'],
      paint: function (ctx, w, h, rng) {
        // engrenagens e vigas
        for (var i = 0; i < 5; i++) {
          var gx = rng() * w, gy = h * (0.2 + rng() * 0.3), gr = 8 + rng() * 14;
          ctx.fillStyle = '#2e1c14';
          ctx.beginPath();
          ctx.arc(gx, gy, gr, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1c100a';
          ctx.beginPath();
          ctx.arc(gx, gy, gr * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        px(ctx, 0, h * 0.3, w, 4, '#241208');
        px(ctx, 0, h * 0.55, w, 5, '#241208');
        hills(ctx, w, h, h * 0.7, 8, '#2a140c', rng, true);
        // rio de lava
        px(ctx, 0, h * 0.84, w, h * 0.16, '#38180c');
        for (var l = 0; l < w; l += 12) {
          px(ctx, l + rng() * 6, h * 0.86 + rng() * 6, 8, 2, '#b8442a');
          if (rng() < 0.4) px(ctx, l, h * 0.88 + rng() * 6, 4, 2, '#ff8a3c');
        }
      },
      ambient: 'brasas'
    },
    mascaras: {
      sky: ['#2a2438', '#1c1828', '#120e1a'],
      paint: function (ctx, w, h, rng) {
        // prédios elegantes decadentes
        for (var i = 0; i < 7; i++) {
          var bx = (i / 7) * w + rng() * 10;
          var bw = 24 + rng() * 20, bh = h * (0.3 + rng() * 0.35);
          px(ctx, bx, h * 0.8 - bh, bw, bh, i % 2 ? '#221e30' : '#282438');
          // janelas iluminadas
          for (var wy = 0; wy < bh - 10; wy += 12) {
            for (var wx2 = 4; wx2 < bw - 6; wx2 += 10) {
              if (rng() < 0.3) px(ctx, bx + wx2, h * 0.8 - bh + 6 + wy, 4, 5, rng() < 0.5 ? '#c9a94a' : '#5c4a6e');
            }
          }
          // telhado pontudo
          ctx.fillStyle = '#1a1626';
          ctx.beginPath();
          ctx.moveTo(bx - 2, h * 0.8 - bh);
          ctx.lineTo(bx + bw / 2, h * 0.8 - bh - 14);
          ctx.lineTo(bx + bw + 2, h * 0.8 - bh);
          ctx.fill();
        }
        px(ctx, 0, h * 0.8, w, h * 0.2, '#1e1a28');
        for (var c = 0; c < w; c += 16) px(ctx, c, h * 0.8, 8, 2, '#282438');
        // máscaras caídas
        for (var m = 0; m < 4; m++) {
          var mx = rng() * w;
          px(ctx, mx, h * 0.86 + rng() * 8, 6, 4, '#e8e0d0');
        }
      },
      ambient: 'petalas'
    },
    deserto: {
      sky: ['#8a5c2e', '#5c3a20', '#38220f'],
      paint: function (ctx, w, h, rng) {
        // sol enorme
        ctx.fillStyle = '#e8b84a';
        ctx.beginPath();
        ctx.arc(w * 0.72, h * 0.3, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffe9a0';
        ctx.beginPath();
        ctx.arc(w * 0.72, h * 0.3, 18, 0, Math.PI * 2);
        ctx.fill();
        hills(ctx, w, h, h * 0.55, 12, '#6a4426', rng);
        hills(ctx, w, h, h * 0.68, 14, '#523418', rng);
        px(ctx, 0, h * 0.8, w, h * 0.2, '#8a6234');
        // cristais de vidro
        for (var cr = 0; cr < 8; cr++) {
          var cx = rng() * w, cy = h * 0.8 + rng() * 6, ch = 8 + rng() * 16;
          ctx.fillStyle = 'rgba(120,200,220,0.7)';
          ctx.beginPath();
          ctx.moveTo(cx - 3, cy);
          ctx.lineTo(cx, cy - ch);
          ctx.lineTo(cx + 3, cy);
          ctx.fill();
        }
        // ruínas
        for (var r = 0; r < 3; r++) {
          var rx = rng() * w;
          px(ctx, rx, h * 0.66, 5, h * 0.14, '#4a3018');
          px(ctx, rx + 8, h * 0.7, 5, h * 0.1, '#4a3018');
        }
      },
      ambient: 'areia'
    },
    mar: {
      sky: ['#0c2030', '#081624', '#040c16'],
      paint: function (ctx, w, h, rng) {
        // navio quebrado ao fundo
        px(ctx, w * 0.55, h * 0.3, w * 0.3, h * 0.16, '#16222e');
        px(ctx, w * 0.66, h * 0.1, 4, h * 0.24, '#16222e');
        px(ctx, w * 0.6, h * 0.14, w * 0.14, 3, '#16222e');
        hills(ctx, w, h, h * 0.62, 10, '#0c1a26', rng);
        // água com faixas
        px(ctx, 0, h * 0.72, w, h * 0.28, '#0e2434');
        for (var l = 0; l < 6; l++) {
          px(ctx, 0, h * (0.74 + l * 0.045), w, 1, 'rgba(80,160,190,0.25)');
        }
        // corais/âncoras
        for (var c = 0; c < 6; c++) {
          var cx = rng() * w, cy = h * 0.86 + rng() * 8;
          px(ctx, cx, cy, 3, 8, rng() < 0.5 ? '#2e5a4a' : '#4a2e5a');
          px(ctx, cx - 2, cy - 3, 7, 3, rng() < 0.5 ? '#3a7a5a' : '#5c3a7a');
        }
      },
      ambient: 'bolhas'
    },
    torre: {
      sky: ['#1a1230', '#241a44', '#0e081c'],
      paint: function (ctx, w, h, rng) {
        // fragmentos de realidade flutuando
        for (var i = 0; i < 10; i++) {
          var fx = rng() * w, fy = rng() * h * 0.6, fs = 4 + rng() * 12;
          ctx.fillStyle = i % 2 ? '#2e2248' : '#38285c';
          ctx.beginPath();
          ctx.moveTo(fx, fy - fs / 2);
          ctx.lineTo(fx + fs / 2, fy);
          ctx.lineTo(fx, fy + fs / 2);
          ctx.lineTo(fx - fs / 2, fy);
          ctx.fill();
        }
        // a torre ao fundo
        px(ctx, w * 0.4, h * 0.1, w * 0.2, h * 0.7, '#221a38');
        px(ctx, w * 0.44, h * 0.04, w * 0.12, h * 0.08, '#2a2044');
        for (var wy = 0; wy < h * 0.6; wy += 14) {
          px(ctx, w * 0.46, h * 0.14 + wy, 4, 6, '#8a6ae8');
          px(ctx, w * 0.54, h * 0.14 + wy + 7, 4, 6, '#6e4ac8');
        }
        px(ctx, 0, h * 0.8, w, h * 0.2, '#181228');
        // dados gigantes cravados no chão
        for (var d = 0; d < 3; d++) {
          var dx = rng() * w, ds = 10 + rng() * 10;
          px(ctx, dx, h * 0.8 - ds * 0.6, ds, ds, '#2e2846');
          px(ctx, dx + ds * 0.3, h * 0.8 - ds * 0.4, ds * 0.2, ds * 0.2, '#8a6ae8');
        }
      },
      ambient: 'estrelas'
    },
    menu: {
      sky: ['#241a38', '#161028', '#0c0818'],
      paint: function (ctx, w, h, rng) {
        hills(ctx, w, h, h * 0.6, 16, '#1c1430', rng, true);
        hills(ctx, w, h, h * 0.75, 12, '#140e24', rng);
        px(ctx, 0, h * 0.85, w, h * 0.15, '#100c1c');
      },
      ambient: 'estrelas'
    }
  };

  function getStatic(region, w, h) {
    var key = region + '_' + w + 'x' + h;
    if (!cache[key]) {
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      var ctx = c.getContext('2d');
      var scene = SCENES[region] || SCENES.menu;
      var grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, scene.sky[0]);
      grad.addColorStop(0.5, scene.sky[1]);
      grad.addColorStop(1, scene.sky[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      scene.paint(ctx, w, h, mulberry32(RA.core.hashStr(region)));
      cache[key] = c;
      if (Object.keys(cache).length > 12) { // não acumular resoluções antigas
        var first = Object.keys(cache)[0];
        delete cache[first];
      }
    }
    return cache[key];
  }

  // partículas ambientes por frame (baratas, sem estado persistente)
  function drawAmbient(ctx, region, w, h, t) {
    var scene = SCENES[region] || SCENES.menu;
    var kind = scene.ambient;
    var n = 14;
    for (var i = 0; i < n; i++) {
      var seed = i * 137.5;
      var speed = 6 + (i % 5) * 3;
      var x, y, alpha;
      if (kind === 'brasas') {
        x = ((seed * 7 + t * speed) % (w + 20)) - 10;
        y = h - ((seed * 13 + t * (speed + 8)) % h);
        alpha = 0.4 + 0.3 * Math.sin(t * 3 + i);
        ctx.fillStyle = 'rgba(255,' + (120 + (i % 3) * 40) + ',60,' + alpha + ')';
        ctx.fillRect(x, y, 2, 2);
      } else if (kind === 'bolhas') {
        x = (seed * 11) % w + Math.sin(t + i) * 6;
        y = h - ((seed * 17 + t * speed) % h);
        ctx.strokeStyle = 'rgba(140,200,220,0.35)';
        ctx.strokeRect(x, y, 3, 3);
      } else if (kind === 'areia') {
        x = ((seed * 7 + t * (speed + 20)) % (w + 20)) - 10;
        y = (seed * 13) % h + Math.sin(t * 2 + i) * 4;
        ctx.fillStyle = 'rgba(220,190,130,0.3)';
        ctx.fillRect(x, y, 2, 1);
      } else if (kind === 'esporos') {
        x = (seed * 11) % w + Math.sin(t * 0.7 + i) * 10;
        y = ((seed * 13 + t * speed * 0.5) % h);
        alpha = 0.25 + 0.25 * Math.sin(t * 1.5 + i);
        ctx.fillStyle = 'rgba(140,220,120,' + alpha + ')';
        ctx.fillRect(x, y, 2, 2);
      } else if (kind === 'almas') {
        x = (seed * 11) % w + Math.sin(t * 0.5 + i * 2) * 14;
        y = h - ((seed * 13 + t * speed * 0.4) % h);
        alpha = 0.2 + 0.2 * Math.sin(t * 2 + i);
        ctx.fillStyle = 'rgba(120,200,220,' + alpha + ')';
        ctx.fillRect(x, y, 2, 3);
      } else if (kind === 'petalas') {
        x = ((seed * 7 + t * speed) % (w + 20)) - 10;
        y = ((seed * 13 + t * (speed * 0.7)) % h);
        ctx.fillStyle = 'rgba(180,120,160,0.4)';
        ctx.fillRect(x + Math.sin(t * 2 + i) * 3, y, 2, 2);
      } else if (kind === 'folhas') {
        x = ((seed * 7 + t * speed) % (w + 20)) - 10;
        y = ((seed * 13 + t * (speed * 0.8)) % h);
        ctx.fillStyle = 'rgba(140,160,90,0.35)';
        ctx.fillRect(x + Math.sin(t * 2 + i) * 4, y, 2, 2);
      } else { // estrelas
        x = (seed * 11) % w;
        y = (seed * 13) % (h * 0.7);
        alpha = 0.3 + 0.4 * Math.abs(Math.sin(t * 1.2 + i * 2));
        ctx.fillStyle = 'rgba(220,210,255,' + alpha + ')';
        ctx.fillRect(x, y, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
      }
    }
  }

  RA.gfx.Backgrounds = {
    draw: function (ctx, region, w, h, t) {
      // pintado a 2x e exibido no tamanho lógico: aproveita o backing 2x
      ctx.drawImage(getStatic(region, w * 2, h * 2), 0, 0, w, h);
      drawAmbient(ctx, region, w, h, t);
    },
    REGIONS: Object.keys(SCENES)
  };
})();
