// Biomes: direção de arte por zona — Grutas Apagadas (azul-profundo),
// Jardim Afogado (verde-água) e Coração Cinéreo (vermelho-cinza). A paleta
// do terreno é escolhida por coluna do tile; o fundo em parallax faz
// crossfade numa faixa de 300px nas fronteiras; adereços e "esporos"
// ambientes são gerados com o tipo/cor da zona onde caem.
(function () {
  var TILE = LK.world.TILE;

  function mulberry32(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  var ZONES = [
    { // Grutas Apagadas
      grad: ['#141e2e', '#0e1522', '#070b12'],
      layers: ['#101a26', '#0c1420', '#080e18'],
      terr: { base: '#1c2940', top: '#3d5578', topSub: '#2a3c56', bottom: '#0b111c', left: '#1a2636', right: '#0e1723' },
      thin: ['#243349', '#31445f'],
      spike: '#3a4a63',
      spore: { color: '#3d5a6e', rise: false },
      fog: 'rgba(28,44,64,0.16)'
    },
    { // Jardim Afogado
      grad: ['#16302a', '#0e2018', '#08120c'],
      layers: ['#122a20', '#0d1f16', '#08140e'],
      terr: { base: '#1c3324', top: '#3d7a52', topSub: '#2a5238', bottom: '#0b1810', left: '#1a2e20', right: '#0e1a12' },
      thin: ['#2a4a36', '#3d6a4c'],
      spike: '#4a6350',
      spore: { color: '#c8e88a', rise: false, firefly: true },
      fog: 'rgba(40,80,56,0.14)'
    },
    { // Coração Cinéreo
      grad: ['#241016', '#160a0e', '#0c0507'],
      layers: ['#1c0d12', '#140a0e', '#0e0608'],
      terr: { base: '#2e1a1a', top: '#78463d', topSub: '#54302a', bottom: '#160a0a', left: '#241414', right: '#180c0c' },
      thin: ['#3d2424', '#5c3830'],
      spike: '#634a42',
      spore: { color: '#ff8a4a', rise: true },
      fog: 'rgba(90,40,30,0.12)'
    }
  ];

  function paintSilhouetteLayer(w, h, seed, color, roughness, baseY) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var rng = mulberry32(seed);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    var y = baseY + rng() * 30;
    for (var x = 0; x <= w; x += 24) {
      y += (rng() - 0.5) * roughness;
      y = Math.max(baseY - 60, Math.min(baseY + 70, y));
      ctx.lineTo(x, y);
      if (rng() < 0.12) {
        var px = x + 12;
        ctx.lineTo(px - 7, y);
        ctx.lineTo(px, y - 30 - rng() * 55);
        ctx.lineTo(px + 7, y);
      }
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    for (var sx = 10; sx < w; sx += 30 + rng() * 50) {
      var len = 25 + rng() * 70;
      var wd = 8 + rng() * 14;
      ctx.beginPath();
      ctx.moveTo(sx - wd / 2, 0);
      ctx.lineTo(sx, len);
      ctx.lineTo(sx + wd / 2, 0);
      ctx.closePath();
      ctx.fill();
    }
    return c;
  }

  function Biomes(level, bounds) {
    this.level = level;
    this.bounds = bounds || { jardimStartX: Infinity, coracaoStartX: Infinity };
    var rng = mulberry32(990017);

    // conjuntos de camadas de fundo por zona
    this.layerSets = [];
    for (var z = 0; z < 3; z++) {
      this.layerSets.push([
        paintSilhouetteLayer(900, 600, 11 + z * 100, ZONES[z].layers[0], 26, 430),
        paintSilhouetteLayer(900, 600, 22 + z * 100, ZONES[z].layers[1], 40, 470),
        paintSilhouetteLayer(900, 600, 33 + z * 100, ZONES[z].layers[2], 58, 500)
      ]);
    }

    // colunas -> zona (pré-computado)
    this.zoneOfCol = new Array(level.cols);
    for (var cx = 0; cx < level.cols; cx++) {
      var px = cx * TILE;
      this.zoneOfCol[cx] = px >= this.bounds.coracaoStartX ? 2 : (px >= this.bounds.jardimStartX ? 1 : 0);
    }

    // adereços ancorados na geometria, com tipo da zona
    this.props = [];   // {kind:'mush'|'flor'|'crystal'|'shard', x,y,size,hue,phase}
    this.roots = [];
    for (var c2 = 3; c2 < level.cols - 3; c2++) {
      var zone = this.zoneOfCol[c2];
      for (var cy = 1; cy < level.rows - 1; cy++) {
        var solidHere = level.solid[cy][c2];
        var solidAbove = cy > 0 && level.solid[cy - 1][c2];
        if (solidHere && !solidAbove) {
          var r1 = rng();
          if (zone === 0) {
            if (r1 < 0.16) this.props.push({ kind: 'mush', x: c2 * TILE + TILE / 2 + (rng() - 0.5) * 10, y: cy * TILE, size: 4 + rng() * 7, hue: rng() < 0.75 ? 'teal' : 'violet', phase: rng() * 7 });
            else if (r1 < 0.24) this.props.push({ kind: 'crystal', x: c2 * TILE + TILE / 2, y: cy * TILE, size: 5 + rng() * 8, ang: (rng() - 0.5) * 0.7, phase: rng() * 7, color: '90,160,220', fill: 'rgba(90,160,200,' });
          } else if (zone === 1) {
            if (r1 < 0.2) this.props.push({ kind: 'flor', x: c2 * TILE + TILE / 2 + (rng() - 0.5) * 10, y: cy * TILE, size: 4 + rng() * 6, hue: rng() < 0.6 ? 'cyan' : 'rose', phase: rng() * 7 });
            else if (r1 < 0.27) this.props.push({ kind: 'crystal', x: c2 * TILE + TILE / 2, y: cy * TILE, size: 4 + rng() * 7, ang: (rng() - 0.5) * 0.7, phase: rng() * 7, color: '90,220,180', fill: 'rgba(90,220,180,' });
          } else {
            if (r1 < 0.2) this.props.push({ kind: 'shard', x: c2 * TILE + TILE / 2, y: cy * TILE, size: 5 + rng() * 9, ang: (rng() - 0.5) * 0.8, phase: rng() * 7, color: '255,140,74', fill: 'rgba(255,140,74,' });
          }
        }
        if (!solidHere && cy > 0 && level.solid[cy - 1][c2] && rng() < (zone === 1 ? 0.18 : 0.1) && zone !== 2) {
          this.roots.push({ x: c2 * TILE + TILE / 2, y: cy * TILE, len: 14 + rng() * (zone === 1 ? 44 : 30), sway: rng() * 7, zone: zone });
        }
      }
    }

    // partículas ambiente distribuídas pelo mundo, cor/comportamento da zona
    this.spores = [];
    for (var i = 0; i < 150; i++) {
      var sxp = rng() * level.pxW;
      this.spores.push({ x: sxp, y: rng() * level.pxH * 0.9, r: 0.8 + rng() * 1.8, phase: rng() * 7, speed: 3 + rng() * 8 });
    }

    this._t = 0;
  }

  Biomes.prototype.zoneAtPx = function (px) {
    return px >= this.bounds.coracaoStartX ? 2 : (px >= this.bounds.jardimStartX ? 1 : 0);
  };

  // zona + fator de mistura com a próxima (faixa de 300px nas fronteiras)
  Biomes.prototype.blendAtPx = function (px) {
    var BAND = 300;
    var b1 = this.bounds.jardimStartX, b2 = this.bounds.coracaoStartX;
    if (px < b1 - BAND) return { a: 0, b: 0, f: 0 };
    if (px < b1) return { a: 0, b: 1, f: (px - (b1 - BAND)) / BAND };
    if (px < b2 - BAND) return { a: 1, b: 1, f: 0 };
    if (px < b2) return { a: 1, b: 2, f: (px - (b2 - BAND)) / BAND };
    return { a: 2, b: 2, f: 0 };
  };

  Biomes.prototype.update = function (dt) { this._t += dt; };

  Biomes.prototype._drawGrad = function (ctx, zone, viewW, viewH, alpha) {
    var grad = ctx.createLinearGradient(0, 0, 0, viewH);
    grad.addColorStop(0, ZONES[zone].grad[0]);
    grad.addColorStop(0.55, ZONES[zone].grad[1]);
    grad.addColorStop(1, ZONES[zone].grad[2]);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.globalAlpha = 1;
  };

  Biomes.prototype._drawLayerSet = function (ctx, zone, cam, viewW, viewH, alpha) {
    var set = this.layerSets[zone];
    this._drawLayer(ctx, set[0], cam.x * 0.15, cam.y * 0.08, viewW, viewH, 0.9 * alpha);
    this._drawLayer(ctx, set[1], cam.x * 0.3, cam.y * 0.15, viewW, viewH, alpha);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = ZONES[zone].fog;
    ctx.fillRect(0, viewH * 0.35, viewW, viewH * 0.65);
    ctx.globalAlpha = 1;
    this._drawLayer(ctx, set[2], cam.x * 0.55, cam.y * 0.28, viewW, viewH, alpha);
  };

  Biomes.prototype.renderBackground = function (ctx, cam, viewW, viewH) {
    var center = cam.x + viewW / 2;
    var blend = this.blendAtPx(center);

    this._drawGrad(ctx, blend.a, viewW, viewH, 1);
    if (blend.f > 0) this._drawGrad(ctx, blend.b, viewW, viewH, blend.f);
    this._drawLayerSet(ctx, blend.a, cam, viewW, viewH, 1);
    if (blend.f > 0) this._drawLayerSet(ctx, blend.b, cam, viewW, viewH, blend.f);

    // partículas ambiente (esporos / vaga-lumes / brasas)
    for (var i = 0; i < this.spores.length; i++) {
      var s = this.spores[i];
      var zone = this.zoneAtPx(s.x);
      var zdef = ZONES[zone].spore;
      var sx = s.x - cam.x * 0.7;
      var sy;
      if (zdef.rise) {
        sy = s.y - cam.y * 0.7 - (this._t * s.speed * 3) % (viewH + 40);
      } else {
        sy = s.y - cam.y * 0.7 + Math.sin(this._t * 0.4 + s.phase) * 14;
      }
      // envolve na tela
      sx = ((sx % (viewW + 40)) + viewW + 40) % (viewW + 40) - 20;
      sy = ((sy % (viewH + 40)) + viewH + 40) % (viewH + 40) - 20;
      var tw = zdef.firefly ? (0.15 + 0.6 * Math.max(0, Math.sin(this._t * 1.6 + s.phase))) : (0.25 + 0.2 * Math.sin(this._t + s.phase));
      ctx.globalAlpha = tw;
      ctx.fillStyle = zdef.color;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  Biomes.prototype._drawLayer = function (ctx, layer, offX, offY, viewW, viewH, alpha) {
    ctx.globalAlpha = alpha;
    var w = layer.width;
    var x0 = -((offX % w) + w) % w;
    var yOff = Math.round(-offY - (layer.height - viewH) * 0.5);
    for (var x = x0 - w; x < viewW + w; x += w) {
      ctx.drawImage(layer, Math.round(x), yOff);
    }
    ctx.globalAlpha = 1;
  };

  Biomes.prototype.renderTerrain = function (ctx, cam, viewW, viewH) {
    var lv = this.level;
    var x0 = Math.max(0, Math.floor(cam.x / TILE));
    var y0 = Math.max(0, Math.floor(cam.y / TILE));
    var x1 = Math.min(lv.cols - 1, Math.ceil((cam.x + viewW) / TILE));
    var y1 = Math.min(lv.rows - 1, Math.ceil((cam.y + viewH) / TILE));

    for (var cy = y0; cy <= y1; cy++) {
      for (var cx = x0; cx <= x1; cx++) {
        var zone = ZONES[this.zoneOfCol[cx]];
        var T2 = zone.terr;
        var dx = cx * TILE - cam.x, dy = cy * TILE - cam.y;
        if (lv.solid[cy][cx]) {
          ctx.fillStyle = T2.base;
          ctx.fillRect(dx, dy, TILE, TILE);
          if (cy > 0 && !lv.solid[cy - 1][cx]) {
            ctx.fillStyle = T2.top;
            ctx.fillRect(dx, dy, TILE, 3);
            ctx.fillStyle = T2.topSub;
            ctx.fillRect(dx, dy + 3, TILE, 2);
          }
          if (cy < lv.rows - 1 && !lv.solid[cy + 1][cx]) {
            ctx.fillStyle = T2.bottom;
            ctx.fillRect(dx, dy + TILE - 3, TILE, 3);
          }
          if (cx > 0 && !lv.solid[cy][cx - 1]) {
            ctx.fillStyle = T2.left;
            ctx.fillRect(dx, dy, 2, TILE);
          }
          if (cx < lv.cols - 1 && !lv.solid[cy][cx + 1]) {
            ctx.fillStyle = T2.right;
            ctx.fillRect(dx + TILE - 2, dy, 2, TILE);
          }
        } else if (lv.thin[cy][cx]) {
          ctx.fillStyle = zone.thin[0];
          ctx.fillRect(dx, dy, TILE, 5);
          ctx.fillStyle = zone.thin[1];
          ctx.fillRect(dx, dy, TILE, 2);
        } else if (lv.spike[cy][cx]) {
          ctx.fillStyle = zone.spike;
          for (var s = 0; s < 3; s++) {
            var sx = dx + s * (TILE / 3);
            ctx.beginPath();
            ctx.moveTo(sx, dy + TILE);
            ctx.lineTo(sx + TILE / 6, dy + 4);
            ctx.lineTo(sx + TILE / 3, dy + TILE);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    }
  };

  Biomes.prototype.renderProps = function (ctx, cam, viewW, viewH) {
    var t = this._t;
    // raízes/vinhas
    for (var r = 0; r < this.roots.length; r++) {
      var rt = this.roots[r];
      var sx = rt.x - cam.x, sy = rt.y - cam.y;
      if (sx < -30 || sx > viewW + 30 || sy < -80 || sy > viewH + 80) continue;
      ctx.strokeStyle = rt.zone === 1 ? '#2a4a30' : '#1e2c3e';
      ctx.lineWidth = 2;
      var sway = Math.sin(t * 0.8 + rt.sway) * 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx + sway, sy + rt.len * 0.6, sx + sway * 1.8, sy + rt.len);
      ctx.stroke();
      if (rt.zone === 1) { // folhinhas nas vinhas
        ctx.fillStyle = '#3d6a44';
        ctx.beginPath();
        ctx.ellipse(sx + sway * 1.2, sy + rt.len * 0.7, 3, 1.6, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (var i = 0; i < this.props.length; i++) {
      var pr = this.props[i];
      var px = pr.x - cam.x, py = pr.y - cam.y;
      if (px < -30 || px > viewW + 30 || py < -30 || py > viewH + 30) continue;

      if (pr.kind === 'mush' || pr.kind === 'flor') {
        var bob = Math.sin(t * 1.1 + pr.phase) * 0.8;
        var col, stem;
        if (pr.kind === 'mush') {
          col = pr.hue === 'teal' ? '#39d6c4' : '#b07ae8';
          stem = pr.hue === 'teal' ? '#1e6e66' : '#5a3e78';
        } else {
          col = pr.hue === 'cyan' ? '#5ce8d8' : '#e87aa8';
          stem = '#2a5238';
        }
        ctx.fillStyle = stem;
        ctx.fillRect(px - 1, py - pr.size + bob, 2, pr.size);
        ctx.fillStyle = col;
        if (pr.kind === 'flor') {
          for (var pt2 = 0; pt2 < 4; pt2++) {
            var pa = (pt2 / 4) * Math.PI * 2 + bob * 0.3;
            ctx.beginPath();
            ctx.ellipse(px + Math.cos(pa) * 2.5, py - pr.size + bob + Math.sin(pa) * 2.5, 2.4, 1.4, pa, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(px, py - pr.size + bob, pr.size * 0.55, Math.PI, 0);
          ctx.fill();
        }
      } else { // crystal / shard
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pr.ang);
        var pulse = 0.75 + 0.25 * Math.sin(t * 1.4 + pr.phase);
        ctx.fillStyle = pr.fill + (0.5 * pulse) + ')';
        ctx.beginPath();
        ctx.moveTo(-pr.size * 0.35, 0);
        ctx.lineTo(0, -pr.size);
        ctx.lineTo(pr.size * 0.35, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  };

  Biomes.prototype.collectLights = function (lights, t) {
    for (var i = 0; i < this.props.length; i++) {
      var pr = this.props[i];
      if (pr.kind === 'mush' || pr.kind === 'flor') {
        var pulse = 0.8 + 0.2 * Math.sin(t * 1.3 + pr.phase);
        var color;
        if (pr.kind === 'mush') color = pr.hue === 'teal' ? '57,214,196' : '176,122,232';
        else color = pr.hue === 'cyan' ? '92,232,216' : '232,122,168';
        lights.push({ x: pr.x, y: pr.y - pr.size, radius: pr.size * 7 * pulse, color: color, intensity: 0.35 });
      } else {
        var pulse2 = 0.7 + 0.3 * Math.sin(t * 1.4 + pr.phase);
        lights.push({ x: pr.x, y: pr.y - pr.size * 0.5, radius: pr.size * 6 * pulse2, color: pr.color, intensity: 0.3 });
      }
    }
  };

  LK.world.Biomes = Biomes;
})();
