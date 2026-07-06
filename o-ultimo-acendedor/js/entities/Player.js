// Player: o Acendedor. Movimento com o kit completo de game feel
// (coyote time, jump buffer, pulo variável, gravidade assimétrica, dash com
// ghosting) e combate em 3 direções (lado / cima / pogo para baixo no ar)
// com hit-pause, recoil e knockback. Visual: figura encapuzada desenhada por
// código com capa de física verlet (a alma do movimento fluido) e lanterna.
(function () {
  var cfg = LK.config;

  function Player(level, particles) {
    this.level = level;
    this.particles = particles;

    this.x = level.spawn.x;
    this.y = level.spawn.y - 20;
    this.hw = 7; this.hh = 15;
    this.vx = 0; this.vy = 0;
    this.facing = 1;
    this.onGround = false;

    this.coyote = 0;
    this.jumpBuffer = 0;
    this.dashTimer = 0;
    this.dashCooldown = 0;
    this.dashDir = 1;
    this.canDashAir = true;

    this.attackTimer = 0;
    this.attackCooldown = 0;
    this.attackDir = 'side'; // side|up|down
    this.attackHitDone = false;

    this.hp = cfg.PLAYER_MAX_HP;
    this.invuln = 0;
    this.dead = false;

    this.hitPause = 0;      // congela a simulação inteira (lido pelo main)
    this.landJuice = 0;     // squash de pouso
    this._wasOnGround = false;
    this._runPhase = 0;
    this._ghostTimer = 0;
    this.ghosts = [];       // rastro do dash

    // capa: corrente de pontos verlet presa aos ombros
    this.cloak = [];
    for (var i = 0; i < 7; i++) {
      this.cloak.push({ x: this.x, y: this.y - 8 + i * 4, px: this.x, py: this.y - 8 + i * 4 });
    }
    this._time = 0;
  }

  Player.prototype.update = function (dt, cmd) {
    this._time += dt;
    if (this.dead) return;

    this.coyote = Math.max(0, this.coyote - dt);
    this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);
    this.dashCooldown = Math.max(0, this.dashCooldown - dt);
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.landJuice = Math.max(0, this.landJuice - dt * 5);

    if (cmd.jumpPressed) this.jumpBuffer = cfg.JUMP_BUFFER;

    // ---- dash ----
    if (this.dashTimer > 0) {
      this.dashTimer -= dt;
      this.vx = this.dashDir * cfg.DASH_SPEED;
      this.vy = 0;
      this._ghostTimer -= dt;
      if (this._ghostTimer <= 0) {
        this._ghostTimer = 0.028;
        this.ghosts.push({ x: this.x, y: this.y, facing: this.facing, life: 0.22 });
      }
    } else {
      // ---- corrida ----
      var target = cmd.x * cfg.RUN_MAX;
      var accel = (Math.abs(target) > 0.1) ? cfg.RUN_ACCEL : cfg.RUN_DECEL;
      if (this.vx < target) this.vx = Math.min(target, this.vx + accel * dt);
      else if (this.vx > target) this.vx = Math.max(target, this.vx - accel * dt);
      if (Math.abs(cmd.x) > 0.1) this.facing = cmd.x > 0 ? 1 : -1;

      // ---- gravidade assimétrica ----
      var g = this.vy < 0 ? cfg.GRAVITY_RISE : cfg.GRAVITY_FALL;
      this.vy = Math.min(cfg.MAX_FALL, this.vy + g * dt);

      // corte do pulo: aplicado UMA vez ao soltar o botão durante a subida
      // (multiplicar por frame comeria o pulo inteiro em ~5 frames)
      if (this.vy < 0 && !cmd.jumpHeld && !this._jumpCut) {
        this.vy *= cfg.JUMP_CUT_MULT;
        this._jumpCut = true;
      }

      // ---- pulo (buffer + coyote) ----
      if (this.jumpBuffer > 0 && (this.onGround || this.coyote > 0)) {
        this.vy = -cfg.JUMP_VEL;
        this.jumpBuffer = 0;
        this.coyote = 0;
        this.onGround = false;
        this._jumpCut = false;
        this.particles.burst(this.x, this.y + this.hh, 6, {
          angleMin: -Math.PI * 0.85, angleMax: -Math.PI * 0.15,
          speedMin: 20, speedMax: 70, g: 200, color: ['#4a6178', '#2e4258'],
          lifeMin: 0.2, lifeMax: 0.4, kind: 'dot', sizeMin: 1, sizeMax: 2.5
        });
      }

      // iniciar dash
      if (cmd.dashPressed && this.dashCooldown <= 0 && (this.onGround || this.canDashAir)) {
        this.dashTimer = cfg.DASH_TIME;
        this.dashCooldown = cfg.DASH_COOLDOWN;
        this.dashDir = (Math.abs(cmd.x) > 0.1) ? (cmd.x > 0 ? 1 : -1) : this.facing;
        this.facing = this.dashDir;
        if (!this.onGround) this.canDashAir = false;
        this.invuln = Math.max(this.invuln, cfg.DASH_TIME + 0.03); // i-frames do dash
        this.particles.burst(this.x - this.dashDir * 8, this.y, 8, {
          angleMin: this.dashDir > 0 ? Math.PI * 0.8 : -Math.PI * 0.2,
          angleMax: this.dashDir > 0 ? Math.PI * 1.2 : Math.PI * 0.2,
          speedMin: 60, speedMax: 140, g: 0, drag: 4,
          color: ['#ffd27a', '#ffb84a', '#fff2c9'],
          lifeMin: 0.15, lifeMax: 0.35, kind: 'spark', sizeMin: 1, sizeMax: 2
        });
      }
    }

    // ---- ataque ----
    if (this.attackTimer > 0) this.attackTimer -= dt;
    if (cmd.attackPressed && this.attackCooldown <= 0 && this.dashTimer <= 0) {
      this.attackTimer = cfg.ATTACK_TIME;
      this.attackCooldown = cfg.ATTACK_COOLDOWN;
      this.attackHitDone = false;
      if (cmd.up) this.attackDir = 'up';
      else if (cmd.down && !this.onGround) this.attackDir = 'down';
      else this.attackDir = 'side';
    }

    // ---- integração com colisão ----
    var res = this.level.moveAABB(this, this.vx * dt, this.vy * dt, cmd.down && cmd.jumpPressed);
    if (res.hitWall !== 0 && this.dashTimer <= 0) this.vx = 0;
    if (res.hitCeil) this.vy = Math.max(this.vy, 0);

    var justLanded = res.onGround && !this._wasOnGround;
    this.onGround = res.onGround;
    if (this.onGround) {
      this.coyote = cfg.COYOTE_TIME;
      this.canDashAir = true;
      if (this.vy > 0) this.vy = 0;
    }
    if (justLanded) {
      this.landJuice = 1;
      this.particles.burst(this.x, this.y + this.hh, 8, {
        angleMin: -Math.PI, angleMax: 0,
        speedMin: 30, speedMax: 90, g: 260, color: ['#4a6178', '#2e4258', '#5d7a94'],
        lifeMin: 0.2, lifeMax: 0.45, kind: 'dot', sizeMin: 1, sizeMax: 3
      });
    }
    this._wasOnGround = this.onGround;

    // espinhos
    if (this.level.spikeAt(this.x, this.y + this.hh - 2) ||
      this.level.spikeAt(this.x - this.hw + 2, this.y + this.hh - 2) ||
      this.level.spikeAt(this.x + this.hw - 2, this.y + this.hh - 2)) {
      this.takeDamage(1, 0);
    }

    // queda para fora do mundo
    if (this.y > this.level.pxH + 120) this.takeDamage(this.hp, 0);

    // fase da corrida (animação das pernas)
    if (this.onGround && Math.abs(this.vx) > 20) this._runPhase += dt * (Math.abs(this.vx) / cfg.RUN_MAX) * 11;
    else if (this.onGround) this._runPhase = 0;

    // ---- capa verlet ----
    this._updateCloak(dt);

    // ghosts do dash
    for (var gI = this.ghosts.length - 1; gI >= 0; gI--) {
      this.ghosts[gI].life -= dt;
      if (this.ghosts[gI].life <= 0) this.ghosts.splice(gI, 1);
    }
  };

  Player.prototype._updateCloak = function (dt) {
    var anchorX = this.x - this.facing * 3;
    var anchorY = this.y - 8;
    var c0 = this.cloak[0];
    c0.x = anchorX; c0.y = anchorY; c0.px = anchorX; c0.py = anchorY;

    for (var i = 1; i < this.cloak.length; i++) {
      var p = this.cloak[i];
      var nvx = (p.x - p.px) * 0.94;
      var nvy = (p.y - p.py) * 0.94;
      p.px = p.x; p.py = p.y;
      p.x += nvx - this.vx * dt * 0.35;      // vento do próprio movimento
      p.y += nvy + 60 * dt;                   // gravidade leve
      p.x += Math.sin(this._time * 2.2 + i) * 2.4 * dt; // ondulação
    }
    // restrições de distância (2 passadas bastam para 7 pontos)
    for (var pass = 0; pass < 2; pass++) {
      for (var j = 1; j < this.cloak.length; j++) {
        var a = this.cloak[j - 1], b = this.cloak[j];
        var dx = b.x - a.x, dy = b.y - a.y;
        var d = Math.hypot(dx, dy) || 0.001;
        var diff = (d - 4.2) / d;
        if (j === 1) { b.x -= dx * diff; b.y -= dy * diff; }
        else { b.x -= dx * diff * 0.5; b.y -= dy * diff * 0.5; a.x += dx * diff * 0.5; a.y += dy * diff * 0.5; }
      }
    }
  };

  // Retorna a hitbox ativa do golpe neste tick, ou null.
  Player.prototype.getAttackHitbox = function () {
    if (this.attackTimer <= 0 || this.attackTimer < cfg.ATTACK_TIME * 0.35) return null;
    var r = cfg.ATTACK_RANGE;
    if (this.attackDir === 'up') {
      return { x: this.x, y: this.y - this.hh - r * 0.45, hw: r * 0.55, hh: r * 0.5, dir: 'up' };
    } else if (this.attackDir === 'down') {
      return { x: this.x, y: this.y + this.hh + r * 0.4, hw: r * 0.5, hh: r * 0.45, dir: 'down' };
    }
    return { x: this.x + this.facing * (this.hw + r * 0.45), y: this.y - 2, hw: r * 0.55, hh: r * 0.42, dir: 'side', facing: this.facing };
  };

  // Chamado pelo main quando o golpe conecta em algo.
  Player.prototype.onHitConnected = function (targetX, targetY) {
    this.hitPause = Math.max(this.hitPause, cfg.HIT_PAUSE);
    if (this.attackDir === 'down') {
      this.vy = -cfg.POGO_VEL;           // pogo!
      this.canDashAir = true;            // pogo devolve o dash aéreo
    } else if (this.attackDir === 'side') {
      this.vx -= this.facing * cfg.PLAYER_RECOIL * 0.6;
    }
    this.particles.burst(targetX, targetY, 12, {
      speedMin: 80, speedMax: 240, g: 100, drag: 3,
      color: ['#fff2c9', '#ffd27a', '#ff9a3c'],
      lifeMin: 0.12, lifeMax: 0.3, kind: 'spark', sizeMin: 1.5, sizeMax: 2.5
    });
  };

  Player.prototype.takeDamage = function (amount, fromX) {
    if (this.invuln > 0 || this.dead) return false;
    this.hp -= amount;
    this.invuln = cfg.INVULN_TIME;
    this.hitPause = Math.max(this.hitPause, 0.09);
    var dir = fromX !== undefined && fromX !== 0 ? (this.x < fromX ? -1 : 1) : -this.facing;
    this.vx = dir * cfg.KNOCKBACK;
    this.vy = -180;
    this.particles.burst(this.x, this.y, 14, {
      speedMin: 60, speedMax: 200, g: 300, color: ['#e8e4da', '#b8b2a4'],
      lifeMin: 0.2, lifeMax: 0.5, kind: 'spark', sizeMin: 1.5, sizeMax: 3
    });
    if (this.hp <= 0) this.dead = true;
    return true;
  };

  // ---------- desenho ----------
  Player.prototype.render = function (ctx, camX, camY) {
    // rastro do dash
    for (var gI = 0; gI < this.ghosts.length; gI++) {
      var gh = this.ghosts[gI];
      ctx.globalAlpha = gh.life / 0.22 * 0.35;
      this._drawBody(ctx, gh.x - camX, gh.y - camY, gh.facing, 0, true);
    }
    ctx.globalAlpha = 1;

    if (this.invuln > 0 && this.dashTimer <= 0 && Math.floor(this._time * 18) % 2 === 0 && !this.dead) {
      return; // pisca durante invulnerabilidade
    }

    var sx = this.x - camX, sy = this.y - camY;

    // capa (desenhada atrás do corpo como fita)
    ctx.strokeStyle = '#26364c';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.cloak[0].x - camX, this.cloak[0].y - camY);
    for (var i = 1; i < this.cloak.length; i++) {
      ctx.lineTo(this.cloak[i].x - camX, this.cloak[i].y - camY);
    }
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#31465f';
    ctx.stroke();

    this._drawBody(ctx, sx, sy, this.facing, this.landJuice, false);
    this._drawAttackArc(ctx, sx, sy);
  };

  Player.prototype._drawBody = function (ctx, sx, sy, facing, squash, isGhost) {
    var squashY = 1 - squash * 0.22;
    var squashX = 1 + squash * 0.22;
    var legLift = this.onGround && Math.abs(this.vx) > 20 ? Math.sin(this._runPhase) * 3 : 0;
    var airLean = this.onGround ? 0 : Math.max(-0.3, Math.min(0.3, this.vy * 0.0006)) * facing;

    ctx.save();
    ctx.translate(sx, sy + this.hh * (1 - squashY));
    ctx.scale(squashX, squashY);
    ctx.rotate(airLean);

    var bodyCol = isGhost ? '#7a9cc9' : '#2e4258';
    var hoodCol = isGhost ? '#8fb0dc' : '#3a536e';
    var faceCol = isGhost ? '#dff' : '#c9e8f2';

    // pernas
    if (!isGhost) {
      ctx.strokeStyle = bodyCol;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-2, 6);
      ctx.lineTo(-3 - (this.onGround ? legLift * 0.6 : -1), 14 - Math.max(0, legLift));
      ctx.moveTo(2, 6);
      ctx.lineTo(3 + (this.onGround ? legLift * 0.6 : 1), 14 + Math.min(0, legLift));
      ctx.stroke();
    }

    // corpo (gota encapuzada)
    ctx.fillStyle = bodyCol;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.quadraticCurveTo(9, -10, 7, 2);
    ctx.quadraticCurveTo(5, 8, 0, 8);
    ctx.quadraticCurveTo(-5, 8, -7, 2);
    ctx.quadraticCurveTo(-9, -10, 0, -14);
    ctx.closePath();
    ctx.fill();

    // capuz
    ctx.fillStyle = hoodCol;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.quadraticCurveTo(8 * facing, -13, 6 * facing, -5);
    ctx.quadraticCurveTo(2 * facing, -8, -1 * facing, -6);
    ctx.quadraticCurveTo(-6 * facing, -9, 0, -15);
    ctx.closePath();
    ctx.fill();

    // rosto: duas fendas de luz sob o capuz
    ctx.fillStyle = faceCol;
    ctx.beginPath();
    ctx.ellipse(3.4 * facing, -8.5, 1.4, 2.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0.4 * facing, -8.9, 1.1, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // lanterna no quadril (a fonte de luz do personagem)
    if (!isGhost) {
      ctx.fillStyle = '#5a4a2e';
      ctx.fillRect(-facing * 8 - 1.5, -1, 3, 4);
      var flick = 0.8 + 0.2 * Math.sin(this._time * 9.7);
      ctx.fillStyle = 'rgba(255,210,122,' + flick + ')';
      ctx.beginPath();
      ctx.arc(-facing * 8, 1, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  Player.prototype._drawAttackArc = function (ctx, sx, sy) {
    if (this.attackTimer <= 0) return;
    var t = 1 - this.attackTimer / cfg.ATTACK_TIME; // 0..1
    var r = cfg.ATTACK_RANGE;
    var alpha = t < 0.5 ? 1 : 1 - (t - 0.5) * 2;

    ctx.save();
    ctx.translate(sx, sy);
    var a0, a1;
    if (this.attackDir === 'up') { a0 = -Math.PI * 0.85; a1 = -Math.PI * 0.15; }
    else if (this.attackDir === 'down') { a0 = Math.PI * 0.15; a1 = Math.PI * 0.85; }
    else if (this.facing > 0) { a0 = -Math.PI * 0.4; a1 = Math.PI * 0.4; }
    else { a0 = Math.PI * 0.6; a1 = Math.PI * 1.4; }

    var sweep = a0 + (a1 - a0) * Math.min(1, t * 2.2);
    ctx.globalAlpha = alpha * 0.9;
    ctx.strokeStyle = '#fff2c9';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, -2, r * (0.75 + t * 0.25), a0, sweep);
    ctx.stroke();
    ctx.globalAlpha = alpha * 0.45;
    ctx.strokeStyle = '#ffd27a';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, -2, r * (0.68 + t * 0.22), a0, sweep);
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  LK.entities.Player = Player;
})();
