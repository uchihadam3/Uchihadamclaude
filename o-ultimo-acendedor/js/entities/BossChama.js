// A PRIMEIRA CHAMA: o chefe final. O coração original de todo o fogo do
// mundo subterrâneo, corrompido em fúria. Um sol em miniatura flutuando na
// arena — o espetáculo final:
//   Fase 1: rajadas de fogo miradas + fileiras de pilares de chama + varredura
//   Fase 2: chuva de meteoros marcada no chão + tudo mais rápido
//   Fase 3: novas radiais que escurecem a arena; depois de cada nova, o
//           coração cai EXAUSTO no chão — as grandes janelas do duelo final.
(function () {
  function BossChama(arena, particles) {
    this.arena = arena;
    this.particles = particles;
    this.x = arena.bossX;
    this.y = arena.floorY - 130;
    this.hw = 22; this.hh = 22;
    this.maxHp = 60;
    this.hp = this.maxHp;
    this.facing = -1;
    this.active = false;
    this.dead = false;
    this.state = 'dormant';
    this.stateTime = 0;
    this.hurtFlash = 0;
    this.contactDamage = 1;
    this.darknessPulse = 0;
    this._t = 0;
    this.pillars = [];    // {x, t} colunas de chama
    this._novasDone = 0;
  }

  BossChama.prototype.phase = function () {
    if (this.hp > this.maxHp * 2 / 3) return 1;
    if (this.hp > this.maxHp / 3) return 2;
    return 3;
  };

  BossChama.prototype.setState = function (s) { this.state = s; this.stateTime = 0; };

  BossChama.prototype.start = function () {
    if (this.active) return;
    this.active = true;
    this.setState('ignite');
    LK.audio.sfx('roar');
    LK.audio.playMusic('chefeFinal');
  };

  BossChama.prototype.hurt = function (dmg, fromX, attackDir) {
    if (this.dead || !this.active || this.state === 'ignite') return 'blocked';
    this.hp -= dmg;
    this.hurtFlash = 0.1;
    if (this.hp <= 0) {
      this.dead = true;
      this.setState('death');
      LK.audio.sfx('roar');
      LK.audio.stopMusic();
      return 'dead';
    }
    return 'hit';
  };

  BossChama.prototype.overlapsPlayer = function (player) {
    if (this.dead || !this.active) return false;
    return Math.abs(this.x - player.x) < this.hw + player.hw - 6 &&
      Math.abs(this.y - player.y) < this.hh + player.hh - 6;
  };

  BossChama.prototype.overlapsBox = function (box) {
    return Math.abs(this.x - box.x) < this.hw + box.hw &&
      Math.abs(this.y - box.y) < this.hh + box.hh;
  };

  BossChama.prototype._pick = function (player) {
    var p = this.phase();
    var roll = Math.random();
    if (p === 1) {
      if (roll < 0.4) this.setState('volleyTele');
      else if (roll < 0.75) this.setState('pillarTele');
      else this.setState('sweepTele');
    } else if (p === 2) {
      if (roll < 0.28) this.setState('volleyTele');
      else if (roll < 0.52) this.setState('pillarTele');
      else if (roll < 0.76) this.setState('meteorTele');
      else this.setState('sweepTele');
    } else {
      // fase 3: a nova entra no rodízio e domina
      if (roll < 0.34) this.setState('novaTele');
      else if (roll < 0.56) this.setState('meteorTele');
      else if (roll < 0.8) this.setState('pillarTele');
      else this.setState('volleyTele');
    }
  };

  BossChama.prototype.update = function (dt, player, level) {
    this._t += dt;
    this.stateTime += dt;
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    this.darknessPulse = Math.max(0, this.darknessPulse - dt * 0.5);
    if (!this.active) return;
    var p = this.phase();
    var floorY = this.arena.floorY;
    var hoverY = floorY - 120;
    var spd = p === 3 ? 1.35 : (p === 2 ? 1.15 : 1);

    // pilares de chama ativos
    for (var pi = this.pillars.length - 1; pi >= 0; pi--) {
      var pl = this.pillars[pi];
      pl.t += dt;
      if (pl.t > 1.3) { this.pillars.splice(pi, 1); continue; }
      if (pl.t > 0.55 && pl.t < 1.05) {
        if (Math.abs(player.x - pl.x) < 13 && player.y > floorY - 96) {
          player.takeDamage(1, pl.x);
        }
      }
    }

    if (this.state === 'ignite') {
      this.y = hoverY + Math.sin(this._t * 2) * 8;
      if (this.stateTime > 1.8) this.setState('hover');
    } else if (this.state === 'hover') {
      var tx = Math.max(this.arena.minX + 70, Math.min(this.arena.maxX - 70, player.x));
      this.x += (tx - this.x) * Math.min(1, dt * 1.4 * spd);
      this.y = hoverY + Math.sin(this._t * 2.4) * 12;
      if (this.stateTime > (p === 3 ? 0.6 : 1.0)) this._pick(player);
    } else if (this.state === 'volleyTele') {
      if (this.stateTime > 0.45) {
        this.setState('hover');
        var n = p >= 2 ? 5 : 3;
        for (var v = 0; v < n; v++) {
          var ang = Math.atan2(player.y - this.y, player.x - this.x) + (v - (n - 1) / 2) * 0.22;
          LK.entities.spawnProjectile(this.x, this.y,
            Math.cos(ang) * 280 * spd, Math.sin(ang) * 280 * spd, 'ember');
        }
        LK.audio.sfx('spit');
      }
    } else if (this.state === 'pillarTele') {
      if (this.stateTime > 0.4) {
        this.setState('hover');
        // fileira de pilares centrada no jogador
        var count = p >= 2 ? 4 : 3;
        for (var c = 0; c < count; c++) {
          this.pillars.push({ x: player.x + (c - (count - 1) / 2) * 64, t: 0 });
        }
        LK.audio.sfx('slam');
      }
    } else if (this.state === 'sweepTele') {
      this._sweepDir = player.x > this.x ? 1 : -1;
      this._sweepY = Math.min(floorY - 30, player.y);
      if (this.stateTime > 0.5) this.setState('sweep');
    } else if (this.state === 'sweep') {
      // varredura horizontal na altura do jogador
      this.y += (this._sweepY - this.y) * Math.min(1, dt * 8);
      this.x += this._sweepDir * 430 * spd * dt;
      if (Math.random() < dt * 40) {
        this.particles.spawn({
          x: this.x - this._sweepDir * 18, y: this.y + (Math.random() - 0.5) * 20,
          vx: -this._sweepDir * 60, vy: (Math.random() - 0.5) * 40, g: -30, drag: 2,
          life: 0.4, size: 2.5, color: Math.random() < 0.5 ? '#ff8a4a' : '#ffd27a', kind: 'spark'
        });
      }
      if (this.x < this.arena.minX + 36 || this.x > this.arena.maxX - 36) this.setState('hover');
    } else if (this.state === 'meteorTele') {
      if (this.stateTime > 0.4) {
        this.setState('hover');
        var m = p === 3 ? 6 : 4;
        for (var mi = 0; mi < m; mi++) {
          var mx = this.arena.minX + (mi + 0.5 + Math.random() * 0.4) * (this.arena.maxX - this.arena.minX) / m;
          LK.entities.spawnProjectile(mx, floorY - 190, 0, 120 + Math.random() * 80, 'ember');
        }
        LK.audio.sfx('spit');
      }
    } else if (this.state === 'novaTele') {
      this.x += Math.sin(this._t * 44) * 30 * dt;
      this.darknessPulse = Math.min(1, this.stateTime * 2);
      if (this.stateTime > 0.7) {
        this.setState('exhausted');
        var rays = 10;
        for (var rn = 0; rn < rays; rn++) {
          var ra = (rn / rays) * Math.PI * 2;
          LK.entities.spawnProjectile(this.x, this.y,
            Math.cos(ra) * 250, Math.sin(ra) * 250, 'ember');
        }
        LK.audio.sfx('roar');
        this._novasDone++;
      }
    } else if (this.state === 'exhausted') {
      // caiu no chão, opaco e apagado — A janela do duelo final
      this.y += ((floorY - this.hh) - this.y) * Math.min(1, dt * 5);
      if (this.stateTime > 2.2) this.setState('rise');
    } else if (this.state === 'rise') {
      this.y += (hoverY - this.y) * Math.min(1, dt * 3);
      if (this.stateTime > 0.8) this.setState('hover');
    } else if (this.state === 'death') {
      this.y += ((floorY - this.hh) - this.y) * Math.min(1, dt * 2);
      if (Math.random() < dt * 30) {
        this.particles.burst(
          this.x + (Math.random() - 0.5) * 50,
          this.y + (Math.random() - 0.5) * 40, 10, {
          speedMin: 60, speedMax: 260, g: -80, drag: 1.5,
          color: ['#fff2c9', '#ffd27a', '#ff9a3c', '#c9e8f2'],
          lifeMin: 0.4, lifeMax: 1.2, kind: 'spark', sizeMin: 2, sizeMax: 4
        });
      }
    }
  };

  BossChama.prototype.render = function (ctx, camX, camY) {
    if (!this.active && !this.dead) return;
    var floorY = this.arena.floorY - camY;

    // pilares
    for (var pi = 0; pi < this.pillars.length; pi++) {
      var pl = this.pillars[pi];
      var px = pl.x - camX;
      if (pl.t < 0.55) {
        var mA = 0.25 + 0.5 * Math.sin(pl.t * 24);
        ctx.strokeStyle = 'rgba(255,140,74,' + Math.max(0.2, mA) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px - 10, floorY);
        ctx.lineTo(px + 10, floorY);
        ctx.stroke();
      } else if (pl.t < 1.05) {
        var ph = 92;
        var flick = 0.85 + 0.15 * Math.sin(this._t * 30 + pi * 3);
        var grad = ctx.createLinearGradient(0, floorY - ph, 0, floorY);
        grad.addColorStop(0, 'rgba(255,180,90,0)');
        grad.addColorStop(0.35, 'rgba(255,120,50,' + 0.8 * flick + ')');
        grad.addColorStop(1, 'rgba(255,230,160,0.95)');
        ctx.fillStyle = grad;
        ctx.fillRect(px - 8 * flick, floorY - ph, 16 * flick, ph);
      }
    }

    var sx = this.x - camX, sy = this.y - camY;
    var p = this.phase();
    var exhausted = this.state === 'exhausted';
    var deathFade = this.state === 'death' ? Math.max(0, 1 - this.stateTime / 3) : 1;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.globalAlpha = deathFade;

    // línguas de fogo orbitando
    var flick2 = exhausted ? 0.35 : 0.85 + 0.15 * Math.sin(this._t * 18);
    var tongues = exhausted ? 4 : 8;
    for (var tn = 0; tn < tongues; tn++) {
      var ta = (tn / tongues) * Math.PI * 2 + this._t * (exhausted ? 0.8 : 2.2);
      var tr = (this.hw + 6) * flick2;
      var tx2 = Math.cos(ta) * tr, ty2 = Math.sin(ta) * tr * 0.8;
      ctx.fillStyle = 'rgba(255,' + (exhausted ? '110,60' : '150,70') + ',' + (0.5 * flick2) + ')';
      ctx.beginPath();
      ctx.ellipse(tx2, ty2, 7 * flick2, 12 * flick2, ta + Math.PI / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // corpo: esfera de fogo em camadas
    var coreCol = this.hurtFlash > 0 ? '#ffffff' : (exhausted ? '#8a4a2e' : '#ff9a3c');
    var inner = this.hurtFlash > 0 ? '#ffffff' : (exhausted ? '#b86a3c' : '#ffe9b8');
    ctx.fillStyle = coreCol;
    ctx.beginPath();
    ctx.arc(0, 0, this.hw * (exhausted ? 0.8 : 1) * (0.94 + 0.06 * Math.sin(this._t * 9)), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = inner;
    ctx.beginPath();
    ctx.arc(0, 0, this.hw * 0.55 * (exhausted ? 0.7 : 1), 0, Math.PI * 2);
    ctx.fill();
    // o coração dentro: silhueta escura pulsante
    ctx.fillStyle = p === 3 ? '#2a0e08' : '#4a1c10';
    var hb = 1 + Math.sin(this._t * (exhausted ? 2 : 6)) * 0.12;
    ctx.beginPath();
    ctx.moveTo(0, -6 * hb);
    ctx.bezierCurveTo(8 * hb, -13 * hb, 14 * hb, -2 * hb, 0, 10 * hb);
    ctx.bezierCurveTo(-14 * hb, -2 * hb, -8 * hb, -13 * hb, 0, -6 * hb);
    ctx.fill();

    ctx.restore();
    ctx.globalAlpha = 1;
  };

  BossChama.prototype.collectLights = function (lights) {
    if (!this.active) return;
    var exhausted = this.state === 'exhausted';
    lights.push({
      x: this.x, y: this.y,
      radius: exhausted ? 70 : 150 + Math.sin(this._t * 7) * 16,
      color: '255,150,70',
      intensity: exhausted ? 0.35 : 0.85
    });
    for (var pi = 0; pi < this.pillars.length; pi++) {
      var pl = this.pillars[pi];
      if (pl.t > 0.55 && pl.t < 1.05) {
        lights.push({ x: pl.x, y: this.arena.floorY - 46, radius: 70, color: '255,140,60', intensity: 0.5 });
      }
    }
  };

  LK.entities.BossChama = BossChama;
})();
