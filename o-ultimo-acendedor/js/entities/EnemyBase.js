// EnemyBase: física, vida, flash de dano, knockback e utilitários que todos
// os inimigos compartilham. Cada tipo concreto (Bestiary.js) implementa
// think(dt, player) — a máquina de estados do padrão de ataque — e draw().
(function () {
  function EnemyBase(x, y, opts) {
    this.x = x; this.y = y;
    this.hw = opts.hw || 9;
    this.hh = opts.hh || 8;
    this.vx = 0; this.vy = 0;
    this.hp = opts.hp || 3;
    this.maxHp = this.hp;
    this.facing = opts.facing || 1;
    this.gravity = opts.gravity !== undefined ? opts.gravity : 1400;
    this.contactDamage = opts.contactDamage !== undefined ? opts.contactDamage : 1;
    this.dead = false;
    this.deathTimer = 0;      // animação curta de morte antes de remover
    this.hurtFlash = 0;
    this.onGround = false;
    this.state = 'idle';
    this.stateTime = 0;
    this._t = Math.random() * 10;
  }

  EnemyBase.prototype.setState = function (s) {
    this.state = s;
    this.stateTime = 0;
  };

  EnemyBase.prototype.updatePhysics = function (dt, level) {
    if (this.gravity > 0) this.vy = Math.min(700, this.vy + this.gravity * dt);
    var res = level.moveAABB(this, this.vx * dt, this.vy * dt, false);
    if (res.hitWall !== 0) { this.vx = 0; this._hitWallDir = res.hitWall; }
    else this._hitWallDir = 0;
    if (res.onGround && this.vy > 0) this.vy = 0;
    if (res.hitCeil && this.vy < 0) this.vy = 0;
    this.onGround = res.onGround;
    return res;
  };

  // Retorna 'hit' | 'blocked' | 'dead'. attackDir: 'side'|'up'|'down'.
  EnemyBase.prototype.hurt = function (dmg, fromX, attackDir) {
    if (this.dead) return 'dead';
    if (this.blocksAttack && this.blocksAttack(fromX, attackDir)) return 'blocked';
    this.hp -= dmg;
    this.hurtFlash = 0.12;
    var dir = this.x < fromX ? -1 : 1;
    this.vx = dir * 190;
    if (this.gravity > 0 && this.onGround) this.vy = -120;
    if (this.hp <= 0) {
      this.dead = true;
      this.deathTimer = 0.32;
    }
    return this.dead ? 'dead' : 'hit';
  };

  EnemyBase.prototype.update = function (dt, player, level, particles) {
    this._t += dt;
    this.stateTime += dt;
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    if (this.dead) {
      this.deathTimer -= dt;
      return;
    }
    this.think(dt, player, level, particles);
  };

  EnemyBase.prototype.overlapsPlayer = function (player) {
    return Math.abs(this.x - player.x) < this.hw + player.hw &&
      Math.abs(this.y - player.y) < this.hh + player.hh;
  };

  EnemyBase.prototype.overlapsBox = function (box) {
    return Math.abs(this.x - box.x) < this.hw + box.hw &&
      Math.abs(this.y - box.y) < this.hh + box.hh;
  };

  EnemyBase.prototype.distTo = function (player) {
    return Math.hypot(player.x - this.x, player.y - this.y);
  };

  // Flash branco de dano aplicado por cima do draw() do tipo concreto.
  EnemyBase.prototype.render = function (ctx, camX, camY) {
    var sx = this.x - camX, sy = this.y - camY;
    if (this.dead) {
      // implode em luz
      var t = Math.max(0, this.deathTimer / 0.32);
      ctx.globalAlpha = t;
      ctx.fillStyle = '#fff2c9';
      ctx.beginPath();
      ctx.arc(sx, sy, (1 - t) * 16 + 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      return;
    }
    this.draw(ctx, sx, sy);
    if (this.hurtFlash > 0) {
      ctx.globalAlpha = Math.min(1, this.hurtFlash / 0.12) * 0.85;
      ctx.globalCompositeOperation = 'lighter';
      this.draw(ctx, sx, sy, true);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
  };

  LK.entities.EnemyBase = EnemyBase;
})();
