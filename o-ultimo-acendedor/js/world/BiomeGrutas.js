// BiomeGrutas: direção de arte das Grutas Apagadas. Renderiza, em ordem:
//   céu/gradiente profundo → 3 camadas de silhuetas de caverna em parallax
//   → névoa de fundo → geometria da sala (rocha orgânica com borda iluminada)
//   → adereços (cogumelos, cristais, raízes) → primeiro plano em parallax.
// A passada de luz (escuridão recortada + brilhos aditivos) fica em Lighting.js.
// Tudo determinístico via RNG semeado — nada muda de frame a frame.
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

  // ---- camadas de fundo pré-pintadas (offscreen, repetíveis em X) ----
  function paintSilhouetteLayer(w, h, seed, color, roughness, baseY) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var rng = mulberry32(seed);
    ctx.fillStyle = color;

    // formações do chão
    ctx.beginPath();
    ctx.moveTo(0, h);
    var y = baseY + rng() * 30;
    for (var x = 0; x <= w; x += 24) {
      y += (rng() - 0.5) * roughness;
      y = Math.max(baseY - 60, Math.min(baseY + 70, y));
      ctx.lineTo(x, y);
      // pico de estalagmite ocasional
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

    // estalactites do teto
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

  function BiomeGrutas(level) {
    this.level = level;
    var rng = mulberry32(990017);

    this.layerFar = paintSilhouetteLayer(900, 600, 11, '#101a26', 26, 430);
    this.layerMid = paintSilhouetteLayer(900, 600, 22, '#0c1420', 40, 470);
    this.layerNear = paintSilhouetteLayer(900, 600, 33, '#080e18', 58, 500);

    // adereços ancorados na geometria real da sala
    this.mushrooms = [];
    this.crystals = [];
    this.roots = [];
    for (var cx = 3; cx < level.cols - 3; cx++) {
      for (var cy = 1; cy < level.rows - 1; cy++) {
        var solidHere = level.solid[cy][cx];
        var solidAbove = cy > 0 && level.solid[cy - 1][cx];
        if (solidHere && !solidAbove) { // topo de chão
          if (rng() < 0.16) {
            this.mushrooms.push({
              x: cx * TILE + TILE / 2 + (rng() - 0.5) * 10,
              y: cy * TILE,
              size: 4 + rng() * 7,
              hue: rng() < 0.75 ? 'teal' : 'violet',
              phase: rng() * Math.PI * 2
            });
          } else if (rng() < 0.08) {
            this.crystals.push({
              x: cx * TILE + TILE / 2, y: cy * TILE,
              size: 5 + rng() * 8, ang: (rng() - 0.5) * 0.7, phase: rng() * 7
            });
          }
        }
        if (!solidHere && cy > 0 && level.solid[cy - 1][cx] && rng() < 0.1) { // teto exposto
          this.roots.push({
            x: cx * TILE + TILE / 2, y: cy * TILE,
            len: 14 + rng() * 30, sway: rng() * Math.PI * 2
          });
        }
      }
    }

    // esporos flutuantes de fundo (posições determinísticas, deriva no tempo)
    this.spores = [];
    for (var i = 0; i < 60; i++) {
      this.spores.push({
        x: rng() * level.pxW, y: rng() * level.pxH * 0.9,
        r: 0.8 + rng() * 1.8, phase: rng() * Math.PI * 2, speed: 3 + rng() * 8
      });
    }

    this._t = 0;

    // superfície da rocha: textura sutil pré-gerada por célula (hachura)
    this._rockPattern = this._makeRockPattern();
  }

  BiomeGrutas.prototype._makeRockPattern = function () {
    var c = document.createElement('canvas');
    c.width = 48; c.height = 48;
    var ctx = c.getContext('2d');
    var rng = mulberry32(5150);
    ctx.fillStyle = '#131c2a';
    ctx.fillRect(0, 0, 48, 48);
    for (var i = 0; i < 90; i++) {
      ctx.fillStyle = rng() < 0.5 ? '#0e1622' : '#182233';
      ctx.globalAlpha = 0.5 + rng() * 0.5;
      ctx.fillRect(rng() * 48, rng() * 48, 1 + rng() * 3, 1 + rng() * 2);
    }
    ctx.globalAlpha = 1;
    return ctx.createPattern ? c : c;
  };

  BiomeGrutas.prototype.update = function (dt) {
    this._t += dt;
  };

  BiomeGrutas.prototype.renderBackground = function (ctx, cam, viewW, viewH) {
    // gradiente de profundidade
    var grad = ctx.createLinearGradient(0, 0, 0, viewH);
    grad.addColorStop(0, '#141e2e');
    grad.addColorStop(0.55, '#0e1522');
    grad.addColorStop(1, '#070b12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, viewW, viewH);

    // silhuetas em parallax (repetidas em X)
    this._drawLayer(ctx, this.layerFar, cam.x * 0.15, cam.y * 0.08, viewW, viewH, 0.9);
    this._drawLayer(ctx, this.layerMid, cam.x * 0.3, cam.y * 0.15, viewW, viewH, 1);
    // névoa entre camadas
    ctx.fillStyle = 'rgba(28,44,64,0.16)';
    ctx.fillRect(0, viewH * 0.35, viewW, viewH * 0.65);
    this._drawLayer(ctx, this.layerNear, cam.x * 0.55, cam.y * 0.28, viewW, viewH, 1);

    // esporos de fundo
    ctx.fillStyle = '#3d5a6e';
    for (var i = 0; i < this.spores.length; i++) {
      var s = this.spores[i];
      var sx = (s.x - cam.x * 0.7) % (viewW + 40);
      if (sx < -20) sx += viewW + 40;
      var sy = s.y - cam.y * 0.7 + Math.sin(this._t * 0.4 + s.phase) * 14;
      sy = ((sy % (viewH + 40)) + viewH + 40) % (viewH + 40) - 20;
      ctx.globalAlpha = 0.25 + 0.2 * Math.sin(this._t + s.phase);
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  BiomeGrutas.prototype._drawLayer = function (ctx, layer, offX, offY, viewW, viewH, alpha) {
    ctx.globalAlpha = alpha;
    var w = layer.width;
    var x0 = -((offX % w) + w) % w;
    var yOff = Math.round(-offY - (layer.height - viewH) * 0.5);
    for (var x = x0 - w; x < viewW + w; x += w) {
      ctx.drawImage(layer, Math.round(x), yOff);
    }
    ctx.globalAlpha = 1;
  };

  // Geometria da sala: rocha com leve borda de luz no topo (rim light).
  BiomeGrutas.prototype.renderTerrain = function (ctx, cam, viewW, viewH) {
    var lv = this.level;
    var x0 = Math.max(0, Math.floor(cam.x / TILE));
    var y0 = Math.max(0, Math.floor(cam.y / TILE));
    var x1 = Math.min(lv.cols - 1, Math.ceil((cam.x + viewW) / TILE));
    var y1 = Math.min(lv.rows - 1, Math.ceil((cam.y + viewH) / TILE));

    for (var cy = y0; cy <= y1; cy++) {
      for (var cx = x0; cx <= x1; cx++) {
        var dx = cx * TILE - cam.x, dy = cy * TILE - cam.y;
        if (lv.solid[cy][cx]) {
          ctx.fillStyle = '#1c2940';
          ctx.fillRect(dx, dy, TILE, TILE);
          // borda superior iluminada quando exposta
          if (cy > 0 && !lv.solid[cy - 1][cx]) {
            ctx.fillStyle = '#3d5578';
            ctx.fillRect(dx, dy, TILE, 3);
            ctx.fillStyle = '#2a3c56';
            ctx.fillRect(dx, dy + 3, TILE, 2);
          }
          // borda inferior (teto de caverna)
          if (cy < lv.rows - 1 && !lv.solid[cy + 1][cx]) {
            ctx.fillStyle = '#0b111c';
            ctx.fillRect(dx, dy + TILE - 3, TILE, 3);
          }
          // laterais
          if (cx > 0 && !lv.solid[cy][cx - 1]) {
            ctx.fillStyle = '#1a2636';
            ctx.fillRect(dx, dy, 2, TILE);
          }
          if (cx < lv.cols - 1 && !lv.solid[cy][cx + 1]) {
            ctx.fillStyle = '#0e1723';
            ctx.fillRect(dx + TILE - 2, dy, 2, TILE);
          }
        } else if (lv.thin[cy][cx]) {
          // plataforma fina: lasca de pedra suspensa
          ctx.fillStyle = '#243349';
          ctx.fillRect(dx, dy, TILE, 5);
          ctx.fillStyle = '#31445f';
          ctx.fillRect(dx, dy, TILE, 2);
        } else if (lv.spike[cy][cx]) {
          ctx.fillStyle = '#3a4a63';
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

  BiomeGrutas.prototype.renderProps = function (ctx, cam, viewW, viewH) {
    var t = this._t;
    // raízes penduradas
    ctx.strokeStyle = '#1e2c3e';
    ctx.lineWidth = 2;
    for (var r = 0; r < this.roots.length; r++) {
      var rt = this.roots[r];
      var sx = rt.x - cam.x, sy = rt.y - cam.y;
      if (sx < -30 || sx > viewW + 30 || sy < -60 || sy > viewH + 60) continue;
      var sway = Math.sin(t * 0.8 + rt.sway) * 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx + sway, sy + rt.len * 0.6, sx + sway * 1.8, sy + rt.len);
      ctx.stroke();
    }

    // cristais
    for (var c = 0; c < this.crystals.length; c++) {
      var cr = this.crystals[c];
      var cx = cr.x - cam.x, cy = cr.y - cam.y;
      if (cx < -30 || cx > viewW + 30 || cy < -30 || cy > viewH + 30) continue;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(cr.ang);
      var pulse = 0.75 + 0.25 * Math.sin(t * 1.4 + cr.phase);
      ctx.fillStyle = 'rgba(90,160,200,' + (0.5 * pulse) + ')';
      ctx.beginPath();
      ctx.moveTo(-cr.size * 0.35, 0);
      ctx.lineTo(0, -cr.size);
      ctx.lineTo(cr.size * 0.35, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // cogumelos brilhantes (o brilho real vem da passada de luz)
    for (var m = 0; m < this.mushrooms.length; m++) {
      var mu = this.mushrooms[m];
      var mx = mu.x - cam.x, my = mu.y - cam.y;
      if (mx < -20 || mx > viewW + 20 || my < -20 || my > viewH + 20) continue;
      var bob = Math.sin(t * 1.1 + mu.phase) * 0.8;
      var col = mu.hue === 'teal' ? '#39d6c4' : '#b07ae8';
      var stem = mu.hue === 'teal' ? '#1e6e66' : '#5a3e78';
      ctx.fillStyle = stem;
      ctx.fillRect(mx - 1, my - mu.size + bob, 2, mu.size);
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(mx, my - mu.size + bob, mu.size * 0.55, Math.PI, 0);
      ctx.fill();
    }
  };

  // Luzes que o bioma contribui para a passada de iluminação.
  BiomeGrutas.prototype.collectLights = function (lights, t) {
    for (var m = 0; m < this.mushrooms.length; m++) {
      var mu = this.mushrooms[m];
      var pulse = 0.8 + 0.2 * Math.sin(t * 1.3 + mu.phase);
      lights.push({
        x: mu.x, y: mu.y - mu.size,
        radius: mu.size * 7 * pulse,
        color: mu.hue === 'teal' ? '57,214,196' : '176,122,232',
        intensity: 0.35
      });
    }
    for (var c = 0; c < this.crystals.length; c++) {
      var cr = this.crystals[c];
      var pulse2 = 0.7 + 0.3 * Math.sin(t * 1.4 + cr.phase);
      lights.push({
        x: cr.x, y: cr.y - cr.size * 0.5,
        radius: cr.size * 6 * pulse2,
        color: '90,160,220',
        intensity: 0.3
      });
    }
  };

  LK.world.BiomeGrutas = BiomeGrutas;
})();
