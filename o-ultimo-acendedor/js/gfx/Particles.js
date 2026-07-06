// Particles: sistema único com pool fixo (zero alocação por frame no loop).
// Cada partícula: posição, velocidade, gravidade, vida, cor, tamanho, tipo
// de desenho (ponto/faísca com rastro/fumaça que cresce).
(function () {
  var MAX = 900;

  function Particles() {
    this.pool = [];
    for (var i = 0; i < MAX; i++) {
      this.pool.push({ alive: false, x: 0, y: 0, vx: 0, vy: 0, g: 0, life: 0, maxLife: 1, size: 2, color: '#fff', kind: 'dot', drag: 0 });
    }
    this._next = 0;
  }

  Particles.prototype.spawn = function (opts) {
    var p = this.pool[this._next];
    this._next = (this._next + 1) % MAX;
    p.alive = true;
    p.x = opts.x; p.y = opts.y;
    p.vx = opts.vx || 0; p.vy = opts.vy || 0;
    p.g = opts.g || 0;
    p.maxLife = p.life = opts.life || 0.6;
    p.size = opts.size || 2;
    p.color = opts.color || '#ffd27a';
    p.kind = opts.kind || 'dot';
    p.drag = opts.drag || 0;
  };

  Particles.prototype.burst = function (x, y, count, opts) {
    for (var i = 0; i < count; i++) {
      var ang = (opts.angleMin !== undefined)
        ? opts.angleMin + Math.random() * (opts.angleMax - opts.angleMin)
        : Math.random() * Math.PI * 2;
      var spd = (opts.speedMin || 40) + Math.random() * ((opts.speedMax || 160) - (opts.speedMin || 40));
      this.spawn({
        x: x, y: y,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        g: opts.g !== undefined ? opts.g : 300,
        life: (opts.lifeMin || 0.3) + Math.random() * ((opts.lifeMax || 0.7) - (opts.lifeMin || 0.3)),
        size: (opts.sizeMin || 1.5) + Math.random() * ((opts.sizeMax || 3.5) - (opts.sizeMin || 1.5)),
        color: Array.isArray(opts.color) ? opts.color[Math.floor(Math.random() * opts.color.length)] : opts.color,
        kind: opts.kind || 'spark',
        drag: opts.drag || 1.5
      });
    }
  };

  Particles.prototype.update = function (dt) {
    for (var i = 0; i < MAX; i++) {
      var p = this.pool[i];
      if (!p.alive) continue;
      p.life -= dt;
      if (p.life <= 0) { p.alive = false; continue; }
      p.vy += p.g * dt;
      if (p.drag) {
        var d = Math.max(0, 1 - p.drag * dt);
        p.vx *= d; p.vy *= d;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  };

  Particles.prototype.render = function (ctx, camX, camY, viewW, viewH) {
    for (var i = 0; i < MAX; i++) {
      var p = this.pool[i];
      if (!p.alive) continue;
      var sx = p.x - camX, sy = p.y - camY;
      if (sx < -20 || sy < -20 || sx > viewW + 20 || sy > viewH + 20) continue;
      var t = p.life / p.maxLife;
      ctx.globalAlpha = p.kind === 'smoke' ? t * 0.35 : t;
      ctx.fillStyle = p.color;
      if (p.kind === 'spark') {
        // faísca com rastro na direção da velocidade
        var len = Math.min(8, Math.hypot(p.vx, p.vy) * 0.03) + p.size;
        var ang = Math.atan2(p.vy, p.vx);
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(ang);
        ctx.fillRect(-len, -p.size / 2, len, p.size);
        ctx.restore();
      } else if (p.kind === 'smoke') {
        var grow = p.size * (1.6 - t * 0.6);
        ctx.beginPath();
        ctx.arc(sx, sy, grow, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(sx - p.size / 2, sy - p.size / 2, p.size, p.size);
      }
    }
    ctx.globalAlpha = 1;
  };

  LK.gfx.Particles = Particles;
})();
