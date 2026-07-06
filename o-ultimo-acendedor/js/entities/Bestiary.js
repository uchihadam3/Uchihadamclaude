// Bestiary: os quatro habitantes das Grutas, cada um com um padrão que pede
// uma resposta diferente do jogador:
//   Rastejante — patrulha; te vê → empina (telegraph) → investida. Punível
//                depois que bate na parede (atordoado).
//   Voador     — flutua; te vê → estremece (telegraph) → mergulho em arco.
//                Recupera longe do chão: golpe pra cima / pogo é a resposta.
//   Cuspidor   — mantém distância, infla (telegraph) e cospe em parábola.
//                A bile pode ser cortada no ar.
//   Casca      — avança devagar; bloqueia golpes frontais (clank). Vulnerável
//                por trás e por pogo.
(function () {
  var Base = LK.entities.EnemyBase;

  function extend(Ctor) {
    Ctor.prototype = Object.create(Base.prototype);
    Ctor.prototype.constructor = Ctor;
  }

  // ---------------- RASTEJANTE ----------------
  function Rastejante(x, y) {
    Base.call(this, x, y, { hw: 11, hh: 7, hp: 3 });
    this.setState('patrol');
    this.patrolSpeed = 34;
    this.chargeSpeed = 300;
  }
  extend(Rastejante);

  Rastejante.prototype.think = function (dt, player, level, particles) {
    if (this.state === 'patrol') {
      this.vx = this.facing * this.patrolSpeed;
      // vira na parede ou na beirada
      var aheadX = this.x + this.facing * (this.hw + 4);
      var footY = this.y + this.hh + 4;
      if (this._hitWallDir === this.facing || (!level.solidAt(aheadX, footY) && this.onGround)) {
        this.facing *= -1;
      }
      // avista o jogador: mesmo nível, à frente, até 150px
      var dy = Math.abs(player.y - this.y);
      var dx = player.x - this.x;
      if (dy < 30 && Math.abs(dx) < 150 && Math.sign(dx) === this.facing) {
        this.setState('telegraph');
        this.vx = 0;
      }
    } else if (this.state === 'telegraph') {
      this.vx = 0;
      if (this.stateTime > 0.38) {
        this.setState('charge');
        this.facing = player.x > this.x ? 1 : -1;
      }
    } else if (this.state === 'charge') {
      this.vx = this.facing * this.chargeSpeed;
      if (Math.random() < dt * 30) {
        particles.spawn({
          x: this.x - this.facing * this.hw, y: this.y + this.hh - 2,
          vx: -this.facing * 30, vy: -20 - Math.random() * 30, g: 140,
          life: 0.3, size: 1.5, color: '#4a6178', kind: 'dot'
        });
      }
      if (this._hitWallDir === this.facing) {
        this.setState('stunned');
        this.vx = 0;
      } else if (this.stateTime > 1.2) {
        this.setState('patrol');
      }
      // beirada durante investida: para (não se joga)
      var aheadX2 = this.x + this.facing * (this.hw + 6);
      if (!level.solidAt(aheadX2, this.y + this.hh + 6) && this.onGround) {
        this.setState('patrol');
        this.facing *= -1;
      }
    } else if (this.state === 'stunned') {
      this.vx = 0;
      if (this.stateTime > 1.0) this.setState('patrol');
    }
    this.updatePhysics(dt, level);
  };

  Rastejante.prototype.draw = function (ctx, sx, sy, flash) {
    var col = flash ? '#ffffff' : '#3a2f4a';
    var belly = flash ? '#ffffff' : '#6e5a8a';
    var rear = this.state === 'telegraph' ? -4 : 0;
    var stunWob = this.state === 'stunned' ? Math.sin(this._t * 20) * 2 : 0;
    ctx.save();
    ctx.translate(sx + stunWob, sy + rear * 0.5);
    if (rear) ctx.rotate(-this.facing * 0.35);
    // corpo segmentado
    for (var s = 0; s < 3; s++) {
      var off = (s - 1) * 7 * -this.facing;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(off, Math.abs(s - 1) * -1.5, 7, 6 - Math.abs(s - 1), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // barriga pálida
    ctx.fillStyle = belly;
    ctx.beginPath();
    ctx.ellipse(0, 3.5, 8, 2.4, 0, 0, Math.PI);
    ctx.fill();
    // olhos
    ctx.fillStyle = this.state === 'charge' || this.state === 'telegraph' ? '#ff8a5c' : '#c9b8e8';
    ctx.beginPath();
    ctx.arc(this.facing * 8, -2.5, 1.6, 0, Math.PI * 2);
    ctx.arc(this.facing * 5.5, -3.5, 1.2, 0, Math.PI * 2);
    ctx.fill();
    // perninhas
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.5;
    var walk = Math.abs(this.vx) > 5 ? Math.sin(this._t * 18) * 2 : 0;
    for (var l = -1; l <= 1; l++) {
      ctx.beginPath();
      ctx.moveTo(l * 6, 5);
      ctx.lineTo(l * 6 + (l === 0 ? -walk : walk), 8);
      ctx.stroke();
    }
    ctx.restore();
  };

  // ---------------- VOADOR ----------------
  function Voador(x, y) {
    Base.call(this, x, y, { hw: 8, hh: 7, hp: 2, gravity: 0, contactDamage: 1 });
    this.anchorX = x; this.anchorY = y;
    this.setState('hover');
    this.diveTarget = { x: 0, y: 0 };
  }
  extend(Voador);

  Voador.prototype.think = function (dt, player, level, particles) {
    if (this.state === 'hover') {
      // flutua ao redor da âncora
      var hx = this.anchorX + Math.sin(this._t * 1.3) * 22;
      var hy = this.anchorY + Math.sin(this._t * 2.1) * 9;
      this.vx = (hx - this.x) * 3;
      this.vy = (hy - this.y) * 3;
      this.facing = player.x > this.x ? 1 : -1;
      if (this.distTo(player) < 130) this.setState('telegraph');
    } else if (this.state === 'telegraph') {
      this.vx = Math.sin(this._t * 40) * 30; // estremece
      this.vy = 0;
      if (this.stateTime > 0.42) {
        this.setState('dive');
        var dx = player.x - this.x, dy = player.y - this.y;
        var d = Math.hypot(dx, dy) || 1;
        this.diveTarget.x = dx / d; this.diveTarget.y = dy / d;
      }
    } else if (this.state === 'dive') {
      var spd = 330;
      // arco: componente para baixo cresce, depois curva para cima
      var curve = this.stateTime < 0.3 ? 1 : -0.8;
      this.vx = this.diveTarget.x * spd;
      this.vy = this.diveTarget.y * spd * curve + (this.stateTime < 0.3 ? 60 : -120);
      if (this.stateTime > 0.62 || this._hitWallDir !== 0) this.setState('return');
    } else if (this.state === 'return') {
      this.vx = (this.anchorX - this.x) * 1.6;
      this.vy = (this.anchorY - this.y) * 1.6;
      if (Math.abs(this.anchorX - this.x) < 12 && Math.abs(this.anchorY - this.y) < 12) this.setState('hover');
      if (this.stateTime > 2.5) this.setState('hover');
    }
    this.updatePhysics(dt, level);
  };

  Voador.prototype.draw = function (ctx, sx, sy, flash) {
    var col = flash ? '#ffffff' : '#2e4a44';
    var wing = flash ? '#ffffff' : '#3d6459';
    var flap = Math.sin(this._t * (this.state === 'dive' ? 34 : 16)) * (this.state === 'telegraph' ? 0.4 : 1);
    ctx.save();
    ctx.translate(sx, sy);
    // asas (triângulos batendo)
    ctx.fillStyle = wing;
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(-13, -6 - flap * 7);
    ctx.lineTo(-6, 2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.lineTo(13, -6 - flap * 7);
    ctx.lineTo(6, 2);
    ctx.closePath();
    ctx.fill();
    // corpo
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    // olhos brilhantes
    ctx.fillStyle = this.state === 'dive' || this.state === 'telegraph' ? '#ff8a5c' : '#7de8d8';
    ctx.beginPath();
    ctx.arc(this.facing * 2.6, -1.5, 1.5, 0, Math.PI * 2);
    ctx.arc(this.facing * 0.2, -2.2, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // ---------------- CUSPIDOR ----------------
  function Cuspidor(x, y) {
    Base.call(this, x, y, { hw: 10, hh: 9, hp: 3 });
    this.setState('idle');
    this.inflate = 0;
  }
  extend(Cuspidor);

  Cuspidor.prototype.think = function (dt, player, level, particles) {
    var dist = this.distTo(player);
    this.facing = player.x > this.x ? 1 : -1;

    if (this.state === 'idle') {
      this.vx = 0;
      this.inflate = Math.max(0, this.inflate - dt * 2);
      if (dist < 240 && Math.abs(player.y - this.y) < 90) this.setState('inflate');
    } else if (this.state === 'inflate') {
      // recua devagar se o jogador chegar perto
      this.vx = dist < 90 ? -this.facing * 40 : 0;
      this.inflate = Math.min(1, this.stateTime / 0.55);
      if (this.stateTime > 0.55) {
        this.setState('spit');
        // dispara: parábola até o jogador
        var dx = player.x - this.x;
        var t = 0.8; // tempo de voo alvo
        var vx = dx / t;
        var vy = (player.y - this.y - 0.5 * 700 * t * t) / t;
        LK.entities.spawnProjectile(this.x + this.facing * 8, this.y - 6, vx, Math.max(-350, vy));
        LK.audio.sfx('spit');
      }
      if (dist > 280) this.setState('idle');
    } else if (this.state === 'spit') {
      this.inflate = Math.max(0, 1 - this.stateTime * 4);
      this.vx = 0;
      if (this.stateTime > 1.1) this.setState(dist < 240 ? 'inflate' : 'idle');
    }
    this.updatePhysics(dt, level);
  };

  Cuspidor.prototype.draw = function (ctx, sx, sy, flash) {
    var puff = 1 + this.inflate * 0.45;
    var col = flash ? '#ffffff' : '#3d4a2e';
    var sac = flash ? '#ffffff' : '#5d7a3c';
    ctx.save();
    ctx.translate(sx, sy);
    // papo inflável (brilha doentio quando cheio)
    ctx.fillStyle = sac;
    ctx.beginPath();
    ctx.ellipse(-this.facing * 2, 2, 8 * puff, 7 * puff, 0, 0, Math.PI * 2);
    ctx.fill();
    if (this.inflate > 0.3) {
      ctx.fillStyle = 'rgba(140,200,60,' + (this.inflate * 0.5) + ')';
      ctx.beginPath();
      ctx.ellipse(-this.facing * 2, 2, 6 * puff, 5 * puff, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // corpo/cabeça
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(this.facing * 4, -3, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // olho
    ctx.fillStyle = this.inflate > 0.5 ? '#d8ff5c' : '#a8c97a';
    ctx.beginPath();
    ctx.arc(this.facing * 7, -5, 1.8, 0, Math.PI * 2);
    ctx.fill();
    // patas
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-4, 8); ctx.lineTo(-6, 10);
    ctx.moveTo(4, 8); ctx.lineTo(6, 10);
    ctx.stroke();
    ctx.restore();
  };

  // ---------------- CASCA ----------------
  function Casca(x, y) {
    Base.call(this, x, y, { hw: 11, hh: 9, hp: 4 });
    this.setState('walk');
    this.turnCooldown = 0; // vira devagar - é isso que abre a janela por trás
  }
  extend(Casca);

  // Escudo bloqueia frontal — MAS: pogo sempre entra, por trás sempre entra,
  // e durante a recuperação da investida a guarda está BAIXA (janela real).
  Casca.prototype.blocksAttack = function (fromX, attackDir) {
    if (attackDir === 'down') return false;
    if (this.state === 'recover') return false;
    var attackerBehind = Math.sign(this.x - fromX) === this.facing;
    return !attackerBehind;
  };

  Casca.prototype.think = function (dt, player, level, particles) {
    this.turnCooldown = Math.max(0, this.turnCooldown - dt);
    var dx = player.x - this.x;

    if (this.state === 'walk') {
      // vira devagar (janela por trás continua existindo)
      var wantFacing = dx > 0 ? 1 : -1;
      if (wantFacing !== this.facing && this.turnCooldown <= 0 && Math.abs(dx) > 8) {
        this.facing = wantFacing;
        this.turnCooldown = 0.9;
      }
      if (Math.abs(dx) > 20 && Math.abs(player.y - this.y) < 60 && Math.sign(dx) === this.facing) {
        this.vx = this.facing * 26;
      } else {
        this.vx = 0;
      }
      var aheadX = this.x + this.facing * (this.hw + 4);
      if (!level.solidAt(aheadX, this.y + this.hh + 4) && this.onGround) this.vx = 0;

      // jogador de frente e perto -> arma a INVESTIDA DE ESCUDO
      if (Math.abs(dx) < 85 && Math.abs(player.y - this.y) < 40 &&
        Math.sign(dx) === this.facing && this.onGround) {
        this.setState('telegraph');
        this.vx = 0;
      }
    } else if (this.state === 'telegraph') {
      // recua e range o escudo — aviso claro
      this.vx = -this.facing * 14;
      if (Math.random() < dt * 26) {
        particles.spawn({
          x: this.x + this.facing * 12, y: this.y - 2 + (Math.random() - 0.5) * 8,
          vx: this.facing * 40, vy: (Math.random() - 0.5) * 30, g: 0, drag: 4,
          life: 0.2, size: 1.5, color: '#c9c9c9', kind: 'spark'
        });
      }
      if (this.stateTime > 0.45) {
        this.setState('bash');
      }
    } else if (this.state === 'bash') {
      // investida com o escudo: rápida, punível se desviada (dash atravessa)
      this.vx = this.facing * 270;
      if (this.stateTime > 0.4 || this._hitWallDir === this.facing) {
        this.setState('recover');
        this.vx = 0;
      }
      var aheadX2 = this.x + this.facing * (this.hw + 6);
      if (!level.solidAt(aheadX2, this.y + this.hh + 6) && this.onGround) {
        this.setState('recover');
        this.vx = 0;
      }
    } else if (this.state === 'recover') {
      // GUARDA BAIXA: escudo caído, ofegante — a janela de punição frontal
      this.vx = 0;
      if (this.stateTime > 1.35) {
        this.setState('walk');
        this.turnCooldown = 0.4;
      }
    }
    this.updatePhysics(dt, level);
  };

  Casca.prototype.draw = function (ctx, sx, sy, flash) {
    var shell = flash ? '#ffffff' : '#4a3d2e';
    var shellEdge = flash ? '#ffffff' : '#6e5a3c';
    var soft = flash ? '#ffffff' : '#e8a05c';
    var step = this.onGround && Math.abs(this.vx) > 4 ? Math.sin(this._t * 10) * 1.4 : 0;
    var recovering = this.state === 'recover';
    var pant = recovering ? Math.sin(this._t * 9) * 1.2 : 0;
    ctx.save();
    ctx.translate(sx, sy + Math.abs(step) * -0.5 + pant * 0.4);
    // abdômen mole brilhante (a fraqueza, atrás — e exposta na recuperação)
    ctx.fillStyle = soft;
    ctx.beginPath();
    ctx.ellipse(-this.facing * 7, 2, 5.5 + (recovering ? 1 : 0), 5 + pant * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    // placa frontal (escudo) — CAI para o chão durante a recuperação
    ctx.save();
    if (recovering) {
      ctx.translate(this.facing * 4, 5);
      ctx.rotate(this.facing * 0.9);
    } else if (this.state === 'telegraph') {
      ctx.translate(-this.facing * 2, 0);
      ctx.rotate(-this.facing * 0.12);
    }
    ctx.fillStyle = shell;
    ctx.beginPath();
    ctx.moveTo(this.facing * 12, -9);
    ctx.quadraticCurveTo(this.facing * 15, 0, this.facing * 12, 9);
    ctx.lineTo(this.facing * 2, 9);
    ctx.quadraticCurveTo(-this.facing * 4, 0, this.facing * 2, -9);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = shellEdge;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    // olho na fresta do escudo
    ctx.fillStyle = this.state === 'telegraph' || this.state === 'bash' ? '#ff8a5c' : '#ffd27a';
    ctx.beginPath();
    ctx.arc(this.facing * 7, -3 + pant * 0.3, 1.6, 0, Math.PI * 2);
    ctx.fill();
    // pernas
    ctx.strokeStyle = shell;
    ctx.lineWidth = 2;
    for (var l = -1; l <= 1; l += 2) {
      ctx.beginPath();
      ctx.moveTo(l * 4, 8);
      ctx.lineTo(l * 4 + (l > 0 ? step : -step), 11);
      ctx.stroke();
    }
    ctx.restore();
  };

  // ---------------- PROJÉTEIS ----------------
  // Tipos: 'bile' (verde, Cuspidor/gotejos), 'ember' (brasa, chefes de fogo),
  // 'seed' (vagem da Raiz: estoura em 3 biles ao tocar o chão).
  var PROJ_STYLE = {
    bile: { main: '#8cc83c', hi: '#d8ff5c', light: '140,200,60', burst: ['#8cc83c', '#5d7a3c', '#d8ff5c'] },
    ember: { main: '#ff8a3c', hi: '#ffe9b8', light: '255,140,60', burst: ['#ff8a3c', '#ffd27a', '#b8442a'] },
    seed: { main: '#7a9d4a', hi: '#c8e87a', light: '150,200,90', burst: ['#7a9d4a', '#c8e87a'] }
  };
  var projectiles = [];
  LK.entities.projectiles = projectiles;
  LK.entities.spawnProjectile = function (x, y, vx, vy, type) {
    projectiles.push({ x: x, y: y, vx: vx, vy: vy, alive: true, t: 0, type: type || 'bile' });
  };

  LK.entities.updateProjectiles = function (dt, level, player, particles) {
    for (var i = projectiles.length - 1; i >= 0; i--) {
      var p = projectiles[i];
      p.t += dt;
      p.vy += (p.type === 'ember' ? 300 : 700) * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      var hitGround = level.solidAt(p.x, p.y + 3) || level.solidAt(p.x, p.y - 3) ||
        level.solidAt(p.x + 3, p.y) || level.solidAt(p.x - 3, p.y);
      var hitPlayer = Math.abs(p.x - player.x) < player.hw + 4 && Math.abs(p.y - player.y) < player.hh + 4;
      if (hitPlayer) player.takeDamage(1, p.x);
      if (hitGround || hitPlayer || p.t > 4.5) {
        var st = PROJ_STYLE[p.type] || PROJ_STYLE.bile;
        LK.audio.sfx('splat');
        particles.burst(p.x, p.y, 8, {
          speedMin: 30, speedMax: 110, g: 300,
          color: st.burst,
          lifeMin: 0.2, lifeMax: 0.5, kind: 'dot', sizeMin: 1.5, sizeMax: 3
        });
        // vagem estoura em leque de bile
        if (p.type === 'seed' && hitGround) {
          for (var s = 0; s < 3; s++) {
            var a = -Math.PI / 2 + (s - 1) * 0.55;
            LK.entities.spawnProjectile(p.x, p.y - 6,
              Math.cos(a) * 170, Math.sin(a) * 210, 'bile');
          }
        }
        projectiles.splice(i, 1);
      }
    }
  };

  LK.entities.renderProjectiles = function (ctx, camX, camY) {
    for (var i = 0; i < projectiles.length; i++) {
      var p = projectiles[i];
      var st = PROJ_STYLE[p.type] || PROJ_STYLE.bile;
      var sx = p.x - camX, sy = p.y - camY;
      var r = p.type === 'seed' ? 5.5 : 4;
      ctx.fillStyle = st.main;
      ctx.beginPath();
      ctx.ellipse(sx, sy, r, r * 0.8, Math.atan2(p.vy, p.vx), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = st.hi;
      ctx.beginPath();
      ctx.arc(sx - p.vx * 0.006, sy - p.vy * 0.006, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  LK.entities.collectProjectileLights = function (lights) {
    for (var i = 0; i < projectiles.length; i++) {
      var p = projectiles[i];
      var st = PROJ_STYLE[p.type] || PROJ_STYLE.bile;
      lights.push({ x: p.x, y: p.y, radius: p.type === 'ember' ? 44 : 34, color: st.light, intensity: p.type === 'ember' ? 0.5 : 0.4 });
    }
  };

  LK.entities.Bestiary = {
    Rastejante: Rastejante,
    Voador: Voador,
    Cuspidor: Cuspidor,
    Casca: Casca
  };
})();
