// O Devorador de Chamas: a mariposa colossal que comeu a luz das Grutas.
// Três fases por fração de vida, cada uma somando padrões:
//   Fase 1: mergulho em arco (swoop) + leque de 3 cusparadas
//   Fase 2: + quedão no chão (slam) com ondas de choque — e a RECUPERAÇÃO
//            no chão é a grande janela de punição
//   Fase 3: + explosão radial de projéteis e pulso de escuridão na arena
// Sem knockback (massa de chefe); pisca branco no dano; morre em explosão
// de luz que reacende a arena.
(function () {
  function Boss(arena, particles) {
    this.arena = arena;
    this.particles = particles;
    this.x = arena.bossX;
    this.y = -60; // entra vindo de cima
    this.hw = 26; this.hh = 20;
    this.vx = 0; this.vy = 0;
    this.maxHp = 42;
    this.hp = this.maxHp;
    this.facing = -1;
    this.active = false;
    this.dead = false;
    this.state = 'dormant';
    this.stateTime = 0;
    this.hurtFlash = 0;
    this.contactDamage = 1;
    this._t = 0;
    this.darknessPulse = 0;  // fase 3: escurece a arena momentaneamente
    this.shockwaves = [];    // ondas do slam: {x, dir, t}
  }

  Boss.prototype.phase = function () {
    if (this.hp > this.maxHp * 2 / 3) return 1;
    if (this.hp > this.maxHp / 3) return 2;
    return 3;
  };

  Boss.prototype.setState = function (s) {
    this.state = s;
    this.stateTime = 0;
  };

  Boss.prototype.start = function () {
    if (this.active) return;
    this.active = true;
    this.setState('enter');
    LK.audio.sfx('roar');
    LK.audio.playMusic('chefe');
  };

  Boss.prototype.hurt = function (dmg, fromX, attackDir) {
    if (this.dead || !this.active || this.state === 'enter') return 'blocked';
    this.hp -= dmg;
    this.hurtFlash = 0.1;
    if (this.hp <= 0) {
      this.dead = true;
      this.setState('death');
      LK.audio.sfx('roar');
      LK.audio.stopMusic();
      return 'dead';
    }
    // transição de fase: rugido + pulso
    var newPhase = this.phase();
    if (newPhase !== this._lastPhase) {
      if (this._lastPhase) {
        LK.audio.sfx('roar');
        this.darknessPulse = 1;
        this.setState('hover');
      }
      this._lastPhase = newPhase;
    }
    return 'hit';
  };

  Boss.prototype.overlapsPlayer = function (player) {
    if (this.dead || !this.active) return false;
    return Math.abs(this.x - player.x) < this.hw + player.hw - 4 &&
      Math.abs(this.y - player.y) < this.hh + player.hh - 4;
  };

  Boss.prototype.overlapsBox = function (box) {
    return Math.abs(this.x - box.x) < this.hw + box.hw &&
      Math.abs(this.y - box.y) < this.hh + box.hh;
  };

  Boss.prototype._pickAttack = function (player) {
    var p = this.phase();
    // garantia de tempo no chão: a cada 2-3 ataques aéreos ele DESCE
    this._airAttacks = (this._airAttacks || 0);
    if (this._airAttacks >= (p === 1 ? 3 : 2)) {
      this._airAttacks = 0;
      this.setState('slamTele');
      return;
    }
    var roll = Math.random();
    if (p === 1) {
      this.setState(roll < 0.5 ? 'swoopTele' : (roll < 0.85 ? 'spitTele' : 'slamTele'));
    } else if (p === 2) {
      if (roll < 0.35) this.setState('swoopTele');
      else if (roll < 0.6) this.setState('spitTele');
      else this.setState('slamTele');
    } else {
      if (roll < 0.28) this.setState('swoopTele');
      else if (roll < 0.5) this.setState('spitTele');
      else if (roll < 0.75) this.setState('slamTele');
      else this.setState('burstTele');
    }
    if (this.state !== 'slamTele') this._airAttacks++;
    else this._airAttacks = 0;
  };

  Boss.prototype.update = function (dt, player, level) {
    this._t += dt;
    this.stateTime += dt;
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    this.darknessPulse = Math.max(0, this.darknessPulse - dt * 0.7);
    if (!this.active) return;

    var hoverY = this.arena.floorY - 150;
    var speedMul = this.phase() === 3 ? 1.25 : 1;
    this.facing = player.x > this.x ? 1 : -1;

    if (this.state === 'enter') {
      this.y += (hoverY - this.y) * Math.min(1, dt * 2);
      if (this.stateTime > 1.6) this.setState('hover');
    } else if (this.state === 'hover') {
      var tx = Math.max(this.arena.minX + 60, Math.min(this.arena.maxX - 60, player.x));
      this.x += (tx - this.x) * Math.min(1, dt * 1.6);
      this.y = hoverY + Math.sin(this._t * 2.2) * 14;
      if (this.stateTime > (this.phase() === 3 ? 0.7 : 1.1)) this._pickAttack(player);
    } else if (this.state === 'swoopTele') {
      this.x += Math.sin(this._t * 34) * 40 * dt; // estremece
      if (this.stateTime > 0.42) {
        this.setState('swoop');
        var dx = player.x - this.x, dy = player.y - this.y;
        var d = Math.hypot(dx, dy) || 1;
        this._swoopVX = dx / d * 460 * speedMul;
        this._swoopVY = dy / d * 380 * speedMul;
      }
    } else if (this.state === 'swoop') {
      var curve = this.stateTime < 0.35 ? 1 : -0.85;
      this.x += this._swoopVX * dt;
      this.y += this._swoopVY * curve * dt + (this.stateTime < 0.35 ? 40 : -130) * dt;
      this.x = Math.max(this.arena.minX + 30, Math.min(this.arena.maxX - 30, this.x));
      this.y = Math.min(this.arena.floorY - 26, this.y);
      if (this.stateTime > 0.85) this.setState('hover');
    } else if (this.state === 'spitTele') {
      if (this.stateTime > 0.5) {
        this.setState('hover');
        var n = this.phase() >= 2 ? 5 : 3;
        for (var i = 0; i < n; i++) {
          var spread = (i - (n - 1) / 2) * 0.28;
          var dx2 = player.x - this.x, dy2 = (player.y - this.y);
          var base = Math.atan2(dy2, dx2) + spread;
          LK.entities.spawnProjectile(this.x, this.y + 8,
            Math.cos(base) * 260, Math.sin(base) * 260 - 60);
        }
        LK.audio.sfx('spit');
      }
    } else if (this.state === 'slamTele') {
      this.y += ((hoverY - 60) - this.y) * Math.min(1, dt * 3);
      this.x += (player.x - this.x) * Math.min(1, dt * 3.4);
      if (this.stateTime > 0.5) this.setState('slam');
    } else if (this.state === 'slam') {
      this.vy = 980;
      this.y += this.vy * dt;
      if (this.y >= this.arena.floorY - this.hh) {
        this.y = this.arena.floorY - this.hh;
        this.setState('slamRecover');
        LK.audio.sfx('slam');
        this.shockwaves.push({ x: this.x - 20, dir: -1, t: 0 });
        this.shockwaves.push({ x: this.x + 20, dir: 1, t: 0 });
        this.particles.burst(this.x, this.y + this.hh, 26, {
          angleMin: -Math.PI, angleMax: 0,
          speedMin: 80, speedMax: 300, g: 400,
          color: ['#4a6178', '#2e4258', '#8a9cb8'],
          lifeMin: 0.3, lifeMax: 0.8, kind: 'dot', sizeMin: 2, sizeMax: 4
        });
      }
    } else if (this.state === 'slamRecover') {
      // NO CHÃO, ofegante — janela de dano. Daqui ele CONTINUA no chão:
      // rasteira ou cusparada rasteira antes de decolar.
      if (this.stateTime > 1.2) {
        if (this.phase() >= 2 && Math.random() < 0.5) {
          this.setState('crawlCharge');
          this._crawlDir = player.x > this.x ? 1 : -1;
        } else {
          this.setState('groundSpit');
        }
      }
    } else if (this.state === 'crawlCharge') {
      // arrasta-se numa investida rasteira pelo chão da arena
      this.y = this.arena.floorY - this.hh;
      this.x += this._crawlDir * 340 * dt;
      if (Math.random() < dt * 30) {
        this.particles.spawn({
          x: this.x - this._crawlDir * 20, y: this.arena.floorY - 4,
          vx: -this._crawlDir * 60, vy: -40 - Math.random() * 60, g: 300,
          life: 0.4, size: 2, color: '#4a6178', kind: 'dot'
        });
      }
      if (this.x < this.arena.minX + 40 || this.x > this.arena.maxX - 40 || this.stateTime > 0.9) {
        this.setState('groundRecover');
      }
    } else if (this.state === 'groundSpit') {
      // cusparada em leque PARA CIMA, do chão — chove bile
      this.y = this.arena.floorY - this.hh;
      if (this.stateTime > 0.45 && !this._groundSpitDone) {
        this._groundSpitDone = true;
        var gn = this.phase() >= 2 ? 5 : 3;
        for (var gi = 0; gi < gn; gi++) {
          var ga = -Math.PI / 2 + (gi - (gn - 1) / 2) * 0.42;
          LK.entities.spawnProjectile(this.x, this.y - 10,
            Math.cos(ga) * 240, Math.sin(ga) * 300);
        }
        LK.audio.sfx('spit');
      }
      if (this.stateTime > 0.9) { this._groundSpitDone = false; this.setState('groundRecover'); }
    } else if (this.state === 'groundRecover') {
      // mais uma janela grande no chão antes de decolar
      this.y = this.arena.floorY - this.hh;
      if (this.stateTime > 1.4) this.setState('takeoff');
    } else if (this.state === 'takeoff') {
      this.y += ((hoverY) - this.y) * Math.min(1, dt * 2.4);
      if (this.stateTime > 0.7) this.setState('hover');
    } else if (this.state === 'burstTele') {
      this.x += Math.sin(this._t * 40) * 34 * dt;
      if (this.stateTime > 0.5) {
        this.setState('hover');
        for (var b = 0; b < 8; b++) {
          var ang = (b / 8) * Math.PI * 2;
          LK.entities.spawnProjectile(this.x, this.y,
            Math.cos(ang) * 230, Math.sin(ang) * 230);
        }
        LK.audio.sfx('spit');
        this.darknessPulse = Math.max(this.darknessPulse, 0.8);
      }
    } else if (this.state === 'death') {
      this.y += ((this.arena.floorY - this.hh) - this.y) * Math.min(1, dt * 2);
      if (Math.random() < dt * 24) {
        this.particles.burst(
          this.x + (Math.random() - 0.5) * 40,
          this.y + (Math.random() - 0.5) * 30, 8, {
          speedMin: 40, speedMax: 200, g: -60, drag: 2,
          color: ['#fff2c9', '#ffd27a', '#ff9a3c'],
          lifeMin: 0.3, lifeMax: 0.9, kind: 'spark', sizeMin: 1.5, sizeMax: 3
        });
      }
    }

    // ondas de choque do slam
    for (var w = this.shockwaves.length - 1; w >= 0; w--) {
      var sw = this.shockwaves[w];
      sw.t += dt;
      sw.x += sw.dir * 300 * dt;
      if (sw.t > 1.1 || sw.x < this.arena.minX || sw.x > this.arena.maxX) {
        this.shockwaves.splice(w, 1);
        continue;
      }
      if (Math.abs(sw.x - player.x) < 16 && Math.abs((this.arena.floorY - 10) - player.y) < 26) {
        player.takeDamage(1, sw.x);
      }
    }
  };

  Boss.prototype.render = function (ctx, camX, camY) {
    if (!this.active && !this.dead) return;
    var sx = this.x - camX, sy = this.y - camY;
    var p = this.phase();
    var deathFade = this.state === 'death' ? Math.max(0, 1 - this.stateTime / 2.4) : 1;

    // ondas de choque
    ctx.fillStyle = 'rgba(140,160,190,0.5)';
    for (var w = 0; w < this.shockwaves.length; w++) {
      var sw = this.shockwaves[w];
      var wx = sw.x - camX, wy = this.arena.floorY - camY;
      var h = 14 * (1 - sw.t / 1.1);
      ctx.beginPath();
      ctx.moveTo(wx - 8, wy);
      ctx.lineTo(wx, wy - h);
      ctx.lineTo(wx + 8, wy);
      ctx.closePath();
      ctx.fill();
    }

    ctx.save();
    ctx.translate(sx, sy);
    ctx.globalAlpha = deathFade;
    var grounded = this.state === 'slamRecover' || this.state === 'crawlCharge' ||
      this.state === 'groundSpit' || this.state === 'groundRecover';
    var flap = grounded
      ? Math.sin(this._t * 4) * 0.3 - 0.55   // asas caídas, arfando
      : Math.sin(this._t * (this.state === 'swoop' ? 26 : 11));
    var tele = this.state.indexOf('Tele') >= 0 || this.state === 'groundSpit';

    var bodyCol = this.hurtFlash > 0 ? '#ffffff' : '#241c30';
    var wingCol = this.hurtFlash > 0 ? '#ffffff' : '#332844';
    var veinCol = p === 3 ? 'rgba(255,120,60,0.85)' : 'rgba(180,90,220,0.5)';

    // asas duplas
    for (var side = -1; side <= 1; side += 2) {
      ctx.fillStyle = wingCol;
      ctx.beginPath();
      ctx.moveTo(side * 8, -4);
      ctx.lineTo(side * (34 + flap * 6), -18 - flap * 10);
      ctx.lineTo(side * (40 + flap * 4), 2 - flap * 5);
      ctx.lineTo(side * 12, 8);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(side * 10, 4);
      ctx.lineTo(side * (28 + flap * 4), 14 - flap * 6);
      ctx.lineTo(side * 8, 14);
      ctx.closePath();
      ctx.fill();
      // veias das asas
      ctx.strokeStyle = veinCol;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(side * 10, -2);
      ctx.lineTo(side * (30 + flap * 5), -12 - flap * 8);
      ctx.stroke();
    }

    // corpo segmentado
    ctx.fillStyle = bodyCol;
    ctx.beginPath();
    ctx.ellipse(0, -6, 13, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 8, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // goela que devora chamas: abre nos telegraphs
    var maw = tele ? 0.9 + Math.sin(this._t * 30) * 0.1 : 0.35;
    ctx.fillStyle = 'rgba(255,140,60,' + (0.55 + maw * 0.45) + ')';
    ctx.beginPath();
    ctx.ellipse(0, -8, 6 * maw + 2, 7 * maw + 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,235,180,' + maw + ')';
    ctx.beginPath();
    ctx.ellipse(0, -8, 3 * maw + 1, 3.5 * maw + 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // olhos-brasa
    ctx.fillStyle = p === 3 ? '#ff5a2a' : '#ff9a5c';
    ctx.beginPath();
    ctx.arc(-5, -14, 2.2, 0, Math.PI * 2);
    ctx.arc(5, -14, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.globalAlpha = 1;
  };

  Boss.prototype.collectLights = function (lights) {
    if (!this.active) return;
    var maw = this.state.indexOf('Tele') >= 0 ? 1 : 0.5;
    lights.push({
      x: this.x, y: this.y - 8,
      radius: 60 * maw + 30,
      color: '255,140,60',
      intensity: 0.5 * maw + 0.2
    });
  };

  LK.entities.BossDevorador = Boss;
})();
