// A RAIZ COROADA: chefe do Jardim Afogado. Uma rainha vegetal enraizada —
// não voa, não anda: o núcleo coroado fica plantado e a arena inteira vira
// arma. Completamente diferente do Devorador:
//   ondas de raízes (espinhos irrompem em sequência varrendo a arena),
//   chicote de vinha (lash horizontal baixo — pule!),
//   vagens arremessadas que explodem em projéteis.
// Depois de 2 ataques o núcleo DESCANSA (janela de punição, coroa cai).
// Fase 2: ondas dos dois lados. Fase 3: descanso curto + gotejar do teto.
(function () {
  function BossRaiz(arena, particles) {
    this.arena = arena;
    this.particles = particles;
    this.x = arena.bossX;
    this.y = arena.floorY - 26;
    this.hw = 20; this.hh = 26;
    this.maxHp = 50;
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
    this._attacksDone = 0;
    this.spikes = [];   // {x, t} eruções de raiz
    this.vine = null;   // chicote {x, dir, t}
  }

  BossRaiz.prototype.phase = function () {
    if (this.hp > this.maxHp * 2 / 3) return 1;
    if (this.hp > this.maxHp / 3) return 2;
    return 3;
  };

  BossRaiz.prototype.setState = function (s) { this.state = s; this.stateTime = 0; };

  BossRaiz.prototype.start = function () {
    if (this.active) return;
    this.active = true;
    this.setState('awaken');
    LK.audio.sfx('roar');
    LK.audio.playMusic('chefe');
  };

  BossRaiz.prototype.hurt = function (dmg, fromX, attackDir) {
    if (this.dead || !this.active || this.state === 'awaken') return 'blocked';
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

  BossRaiz.prototype.overlapsPlayer = function (player) {
    if (this.dead || !this.active) return false;
    return Math.abs(this.x - player.x) < this.hw + player.hw - 4 &&
      Math.abs(this.y - player.y) < this.hh + player.hh - 4;
  };

  BossRaiz.prototype.overlapsBox = function (box) {
    return Math.abs(this.x - box.x) < this.hw + box.hw &&
      Math.abs(this.y - box.y) < this.hh + box.hh;
  };

  BossRaiz.prototype._pick = function (player) {
    if (this._attacksDone >= 2) {
      this._attacksDone = 0;
      this.setState('rest');
      return;
    }
    var roll = Math.random();
    if (roll < 0.4) {
      this.setState('waveTele');
      this._waveFromLeft = player.x > this.x ? true : Math.random() < 0.5;
    } else if (roll < 0.72) {
      this.setState('vineTele');
    } else {
      this.setState('seedTele');
    }
    this._attacksDone++;
  };

  BossRaiz.prototype.update = function (dt, player, level) {
    this._t += dt;
    this.stateTime += dt;
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    if (!this.active) return;
    var p = this.phase();
    var floorY = this.arena.floorY;

    // eruções de raiz ativas
    for (var s = this.spikes.length - 1; s >= 0; s--) {
      var sp = this.spikes[s];
      sp.t += dt;
      if (sp.t > 0.85) { this.spikes.splice(s, 1); continue; }
      if (sp.t > 0.4 && sp.t < 0.7) {
        if (Math.abs(player.x - sp.x) < 13 && player.y > floorY - 46 && player.onGround) {
          player.takeDamage(1, sp.x);
        }
      }
    }

    // chicote de vinha
    if (this.vine) {
      this.vine.t += dt;
      this.vine.x += this.vine.dir * 330 * dt;
      var vHit = Math.abs(this.vine.x - player.x) < 20 &&
        player.y > floorY - 34; // baixo: pulável
      if (vHit) player.takeDamage(1, this.vine.x);
      if (this.vine.x < this.arena.minX || this.vine.x > this.arena.maxX || this.vine.t > 1.4) {
        this.vine = null;
      }
    }

    if (this.state === 'awaken') {
      if (this.stateTime > 1.4) this.setState('idle');
    } else if (this.state === 'idle') {
      if (this.stateTime > (p === 3 ? 0.5 : 0.9)) this._pick(player);
    } else if (this.state === 'waveTele') {
      if (this.stateTime > 0.5) {
        this.setState('wave');
        this._waveNext = 0;
      }
    } else if (this.state === 'wave') {
      // sequência de eruções varrendo a arena
      var spacing = 52;
      var count = Math.ceil((this.arena.maxX - this.arena.minX) / spacing);
      var interval = p === 3 ? 0.1 : 0.14;
      while (this._waveNext < count && this.stateTime > this._waveNext * interval) {
        var frac = this._waveNext / count;
        var wx = this._waveFromLeft
          ? this.arena.minX + frac * (this.arena.maxX - this.arena.minX)
          : this.arena.maxX - frac * (this.arena.maxX - this.arena.minX);
        this.spikes.push({ x: wx, t: 0 });
        // fase 2+: segunda onda espelhada
        if (p >= 2 && this._waveNext % 2 === 0) {
          var wx2 = this._waveFromLeft
            ? this.arena.maxX - frac * (this.arena.maxX - this.arena.minX)
            : this.arena.minX + frac * (this.arena.maxX - this.arena.minX);
          this.spikes.push({ x: wx2, t: 0 });
        }
        this._waveNext++;
      }
      if (this._waveNext >= count) this.setState('idle');
    } else if (this.state === 'vineTele') {
      if (this.stateTime > 0.45) {
        this.setState('idle');
        this.vine = { x: this.x, dir: player.x > this.x ? 1 : -1, t: 0 };
        LK.audio.sfx('dash');
      }
    } else if (this.state === 'seedTele') {
      if (this.stateTime > 0.5) {
        this.setState('idle');
        var n = p >= 2 ? 3 : 2;
        for (var i = 0; i < n; i++) {
          var tx = player.x + (i - (n - 1) / 2) * 90;
          var dx = tx - this.x;
          LK.entities.spawnProjectile(this.x, this.y - 20, dx * 1.1, -320, 'seed');
        }
        LK.audio.sfx('spit');
      }
    } else if (this.state === 'rest') {
      // coroa caída, núcleo mole — BATA AGORA
      var restDur = p === 3 ? 1.6 : 2.4;
      if (this.stateTime > restDur) this.setState('idle');
      // fase 3: gotejar de espinhos do teto durante o descanso
      if (p === 3 && Math.random() < dt * 2.2) {
        LK.entities.spawnProjectile(
          this.arena.minX + Math.random() * (this.arena.maxX - this.arena.minX),
          floorY - 170, 0, 60, 'bile');
      }
    } else if (this.state === 'death') {
      if (Math.random() < dt * 20) {
        this.particles.burst(
          this.x + (Math.random() - 0.5) * 44,
          this.y + (Math.random() - 0.5) * 40, 8, {
          speedMin: 40, speedMax: 190, g: -40, drag: 2,
          color: ['#b8e88a', '#7ac8b8', '#fff2c9'],
          lifeMin: 0.3, lifeMax: 0.9, kind: 'spark', sizeMin: 1.5, sizeMax: 3
        });
      }
    }
  };

  BossRaiz.prototype.render = function (ctx, camX, camY) {
    if (!this.active && !this.dead) return;
    var floorY = this.arena.floorY - camY;

    // eruções
    for (var s = 0; s < this.spikes.length; s++) {
      var sp = this.spikes[s];
      var sx = sp.x - camX;
      if (sp.t < 0.4) {
        var mA = 0.25 + 0.45 * Math.sin(sp.t * 26);
        ctx.strokeStyle = 'rgba(140,200,120,' + Math.max(0.2, mA) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx - 10, floorY);
        ctx.lineTo(sx + 10, floorY);
        ctx.stroke();
      } else {
        var eT = (sp.t - 0.4) / 0.45;
        var eh = 40 * (eT < 0.5 ? eT * 2 : 1 - (eT - 0.5) * 1.4);
        ctx.fillStyle = '#4a6e3c';
        ctx.beginPath();
        ctx.moveTo(sx - 7, floorY);
        ctx.lineTo(sx, floorY - eh);
        ctx.lineTo(sx + 7, floorY);
        ctx.closePath();
        ctx.fill();
      }
    }
    // chicote
    if (this.vine) {
      var vx = this.vine.x - camX;
      ctx.strokeStyle = '#5d8a4a';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(this.x - camX, this.y - camY);
      ctx.quadraticCurveTo((this.x - camX + vx) / 2, floorY - 40, vx, floorY - 12);
      ctx.stroke();
      ctx.fillStyle = '#7ac86a';
      ctx.beginPath();
      ctx.arc(vx, floorY - 12, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    var sx2 = this.x - camX, sy2 = this.y - camY;
    var deathFade = this.state === 'death' ? Math.max(0, 1 - this.stateTime / 2.4) : 1;
    var resting = this.state === 'rest';
    var tele = this.state.indexOf('Tele') >= 0;
    ctx.save();
    ctx.translate(sx2, sy2);
    ctx.globalAlpha = deathFade;

    var body = this.hurtFlash > 0 ? '#fff' : '#3d5c34';
    var petals = this.hurtFlash > 0 ? '#fff' : '#6e9d54';
    var core = this.hurtFlash > 0 ? '#fff' : (resting ? '#e8d8a0' : '#c8e87a');

    // raízes na base
    ctx.strokeStyle = body;
    ctx.lineWidth = 4;
    for (var r = -2; r <= 2; r++) {
      ctx.beginPath();
      ctx.moveTo(r * 6, 20);
      ctx.quadraticCurveTo(r * 14, 24, r * 20, 27);
      ctx.stroke();
    }
    // tronco-corpo
    var sag = resting ? 6 : 0;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-16, 26);
    ctx.quadraticCurveTo(-20, -10 + sag, 0, -24 + sag);
    ctx.quadraticCurveTo(20, -10 + sag, 16, 26);
    ctx.closePath();
    ctx.fill();
    // pétalas-manto
    ctx.fillStyle = petals;
    for (var pt = -1; pt <= 1; pt++) {
      ctx.beginPath();
      ctx.ellipse(pt * 12, -6 + sag, 7, 14, pt * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    // núcleo (a fraqueza)
    var pulse = 0.85 + 0.15 * Math.sin(this._t * (resting ? 3 : 6));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.ellipse(0, -2 + sag, 8 * pulse, 10 * pulse, 0, 0, Math.PI * 2);
    ctx.fill();
    // coroa (cai no descanso)
    ctx.save();
    if (resting) { ctx.translate(6, 12 + sag); ctx.rotate(0.7); }
    else ctx.translate(0, -26 + sag);
    ctx.fillStyle = tele ? '#ffd27a' : '#c9a23a';
    for (var c = -2; c <= 2; c++) {
      ctx.beginPath();
      ctx.moveTo(c * 5 - 3, 0);
      ctx.lineTo(c * 5, -8 - (c === 0 ? 3 : 0));
      ctx.lineTo(c * 5 + 3, 0);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
    ctx.globalAlpha = 1;
  };

  BossRaiz.prototype.collectLights = function (lights) {
    if (!this.active) return;
    var resting = this.state === 'rest';
    lights.push({
      x: this.x, y: this.y - 2,
      radius: resting ? 90 : 60,
      color: resting ? '232,216,160' : '184,232,122',
      intensity: resting ? 0.55 : 0.35
    });
  };

  LK.entities.BossRaiz = BossRaiz;
})();
