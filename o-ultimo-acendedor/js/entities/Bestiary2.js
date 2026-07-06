// Bestiary2: os habitantes do Jardim Afogado e do Coração Cinéreo.
// Padrões mais elaborados que os das Grutas:
//   Salteador   (jardim) — rã que salta em arco sobre você; ao pousar solta
//                duas ondas rasteiras; recuperação punível. Pogo no ar!
//   Espinheiro  (jardim) — planta enterrada: marca o chão sob seus pés e
//                espinhos irrompem ali; o bulbo só é vulnerável enquanto mira.
//   VagaLume    (jardim) — corte de luz: trava uma linha até você e dispara
//                um feixe; dash com i-frames ou sair da linha.
//   Portador    (coração) — blindado lento; canaliza e 3 colunas de brasa
//                caem em posições marcadas; vulnerável enquanto canaliza.
//   Fuligem     (coração) — espectro que some, reaparece do seu lado e
//                talha ao redor; intangível enquanto sumido, punível depois.
(function () {
  var Base = LK.entities.EnemyBase;

  function extend(Ctor) {
    Ctor.prototype = Object.create(Base.prototype);
    Ctor.prototype.constructor = Ctor;
  }

  // ---------------- SALTEADOR ----------------
  function Salteador(x, y) {
    Base.call(this, x, y, { hw: 10, hh: 9, hp: 3 });
    this.setState('idle');
    this.waves = []; // ondas rasteiras {x, dir, t}
  }
  extend(Salteador);

  Salteador.prototype.think = function (dt, player, level, particles) {
    // ondas rasteiras vivem no próprio inimigo
    for (var w = this.waves.length - 1; w >= 0; w--) {
      var wv = this.waves[w];
      wv.t += dt;
      wv.x += wv.dir * 190 * dt;
      if (wv.t > 0.9 || level.solidAt(wv.x, this.y)) { this.waves.splice(w, 1); continue; }
      if (Math.abs(wv.x - player.x) < 12 && Math.abs(player.y - this.y) < 26) {
        player.takeDamage(1, wv.x);
      }
    }

    if (this.state === 'idle') {
      this.vx = 0;
      if (this.onGround && Math.random() < dt * 1.2) this.vy = -140; // pulinho nervoso
      if (this.distTo(player) < 170 && Math.abs(player.y - this.y) < 80) this.setState('crouch');
    } else if (this.state === 'crouch') {
      this.vx = 0;
      if (this.stateTime > 0.38) {
        this.setState('leap');
        var dx = player.x - this.x;
        this.facing = dx > 0 ? 1 : -1;
        this.vx = Math.max(-260, Math.min(260, dx * 1.6));
        this.vy = -430;
      }
    } else if (this.state === 'leap') {
      if (this.onGround && this.stateTime > 0.15) {
        this.setState('landRecover');
        this.vx = 0;
        this.waves.push({ x: this.x - 12, dir: -1, t: 0 });
        this.waves.push({ x: this.x + 12, dir: 1, t: 0 });
        particles.burst(this.x, this.y + this.hh, 10, {
          angleMin: -Math.PI, angleMax: 0, speedMin: 40, speedMax: 130, g: 300,
          color: ['#7ac8b8', '#4a8a7a'], lifeMin: 0.2, lifeMax: 0.5, kind: 'dot', sizeMin: 1.5, sizeMax: 3
        });
      }
    } else if (this.state === 'landRecover') {
      this.vx = 0;
      if (this.stateTime > 0.85) this.setState('idle');
    }
    this.updatePhysics(dt, level);
  };

  Salteador.prototype.draw = function (ctx, sx, sy, flash) {
    var body = flash ? '#fff' : '#2e5c46';
    var belly = flash ? '#fff' : '#7ac8b8';
    var squash = this.state === 'crouch' ? 0.7 : (this.state === 'leap' ? 1.25 : 1);
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(2 - squash, squash);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = belly;
    ctx.beginPath();
    ctx.ellipse(0, 3.5, 6.5, 4, 0, 0, Math.PI);
    ctx.fill();
    // pernas dobradas
    ctx.strokeStyle = body;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-7, 4); ctx.lineTo(-11, 1); ctx.lineTo(-12, 7);
    ctx.moveTo(7, 4); ctx.lineTo(11, 1); ctx.lineTo(12, 7);
    ctx.stroke();
    // olhos saltados
    ctx.fillStyle = this.state === 'crouch' ? '#ff8a5c' : '#e8f2c9';
    ctx.beginPath();
    ctx.arc(this.facing * 4, -7, 2.2, 0, Math.PI * 2);
    ctx.arc(this.facing * 8, -6, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ondas rasteiras
    ctx.fillStyle = 'rgba(122,200,184,0.75)';
    for (var w = 0; w < this.waves.length; w++) {
      var wv = this.waves[w];
      var wx = wv.x - (sx - (this.x - sx) * 0) - (this.x - sx); // wx em coords de tela
      wx = wv.x - (this.x - sx);
      var h = 10 * (1 - wv.t / 0.9);
      ctx.beginPath();
      ctx.moveTo(wx - 6, sy + this.hh);
      ctx.lineTo(wx, sy + this.hh - h);
      ctx.lineTo(wx + 6, sy + this.hh);
      ctx.closePath();
      ctx.fill();
    }
  };

  // ---------------- ESPINHEIRO ----------------
  function Espinheiro(x, y) {
    Base.call(this, x, y, { hw: 9, hh: 8, hp: 3, gravity: 1400, contactDamage: 0 });
    this.setState('buried');
    this.markerX = 0;
    this.groundY = y;
  }
  extend(Espinheiro);

  Espinheiro.prototype.blocksAttack = function () {
    return this.state === 'buried' || this.state === 'cooldown';
  };

  Espinheiro.prototype.overlapsPlayer = function () { return false; }; // não fere por toque

  Espinheiro.prototype.think = function (dt, player, level, particles) {
    this.vx = 0;
    if (this.state === 'buried') {
      if (this.distTo(player) < 140 && Math.abs(player.y - this.y) < 60) this.setState('aim');
    } else if (this.state === 'aim') {
      // bulbo sobe e MARCA a posição atual do jogador
      if (this.stateTime < 0.1) this.markerX = player.x;
      if (this.stateTime > 0.5) this.setState('erupt');
    } else if (this.state === 'erupt') {
      // espinhos irrompem na marca por 0.3s
      if (this.stateTime < 0.3) {
        if (Math.abs(player.x - this.markerX) < 14 &&
          Math.abs(player.y - this.groundY) < 34 && player.onGround) {
          player.takeDamage(1, this.markerX);
        }
      }
      if (this.stateTime > 0.5) this.setState(this.distTo(player) < 150 ? 'aim' : 'cooldown');
    } else if (this.state === 'cooldown') {
      if (this.stateTime > 0.9) this.setState('buried');
    }
    this.updatePhysics(dt, level);
  };

  Espinheiro.prototype.draw = function (ctx, sx, sy, flash) {
    var up = this.state === 'aim' || this.state === 'erupt';
    var bulb = flash ? '#fff' : '#8a5c9d';
    var leaf = flash ? '#fff' : '#3d7a5c';
    // monte de terra
    ctx.fillStyle = '#2a3a2e';
    ctx.beginPath();
    ctx.ellipse(sx, sy + this.hh, 11, 4, 0, Math.PI, 0);
    ctx.fill();
    if (up) {
      var rise = Math.min(1, this.stateTime * 4);
      ctx.save();
      ctx.translate(sx, sy + this.hh - 10 * rise);
      // bulbo pulsante (a fraqueza)
      ctx.fillStyle = bulb;
      ctx.beginPath();
      ctx.ellipse(0, 0, 6.5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.state === 'erupt' ? '#ff8a5c' : '#d8b8e8';
      ctx.beginPath();
      ctx.ellipse(0, -2, 2.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = leaf;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 4); ctx.quadraticCurveTo(-11, 0, -13, 5);
      ctx.moveTo(5, 4); ctx.quadraticCurveTo(11, 0, 13, 5);
      ctx.stroke();
      ctx.restore();
    }
    // marca no chão + espinhos
    if (this.state === 'aim') {
      var mAlpha = 0.3 + 0.5 * Math.sin(this._t * 18);
      ctx.strokeStyle = 'rgba(216,120,90,' + Math.max(0.2, mAlpha) + ')';
      ctx.lineWidth = 2;
      var mx = this.markerX - (this.x - sx);
      var gy = this.groundY - (this.y - sy) + this.hh;
      ctx.beginPath();
      ctx.moveTo(mx - 10, gy); ctx.lineTo(mx + 10, gy);
      ctx.moveTo(mx - 6, gy - 3); ctx.lineTo(mx + 6, gy - 3);
      ctx.stroke();
    } else if (this.state === 'erupt' && this.stateTime < 0.36) {
      var ex = this.markerX - (this.x - sx);
      var egy = this.groundY - (this.y - sy) + this.hh;
      var eh = 30 * Math.min(1, this.stateTime * 6) * (1 - Math.max(0, this.stateTime - 0.24) * 4);
      ctx.fillStyle = flash ? '#fff' : '#6e4a8a';
      for (var s = -1; s <= 1; s++) {
        ctx.beginPath();
        ctx.moveTo(ex + s * 7 - 4, egy);
        ctx.lineTo(ex + s * 7, egy - eh * (s === 0 ? 1 : 0.7));
        ctx.lineTo(ex + s * 7 + 4, egy);
        ctx.closePath();
        ctx.fill();
      }
    }
  };

  // ---------------- VAGA-LUME REAL ----------------
  function VagaLume(x, y) {
    Base.call(this, x, y, { hw: 7, hh: 7, hp: 2, gravity: 0 });
    this.anchorX = x; this.anchorY = y;
    this.setState('hover');
    this.beamAngle = 0;
    this.beamLen = 250;
  }
  extend(VagaLume);

  VagaLume.prototype.think = function (dt, player, level, particles) {
    if (this.state === 'hover') {
      var hx = this.anchorX + Math.sin(this._t * 1.1) * 26;
      var hy = this.anchorY + Math.sin(this._t * 1.9) * 12;
      this.vx = (hx - this.x) * 3;
      this.vy = (hy - this.y) * 3;
      if (this.distTo(player) < 190) this.setState('aim');
    } else if (this.state === 'aim') {
      this.vx *= 0.9; this.vy *= 0.9;
      // trava a mira em 0.3s; depois só brilha crescendo
      if (this.stateTime < 0.3) {
        this.beamAngle = Math.atan2(player.y - this.y, player.x - this.x);
      }
      if (this.stateTime > 0.6) {
        this.setState('fire');
        LK.audio.sfx('spit');
      }
    } else if (this.state === 'fire') {
      this.vx = 0; this.vy = 0;
      if (this.stateTime < 0.18) {
        // feixe: distância ponto-reta dentro do comprimento
        var dx = player.x - this.x, dy = player.y - this.y;
        var along = dx * Math.cos(this.beamAngle) + dy * Math.sin(this.beamAngle);
        if (along > 0 && along < this.beamLen) {
          var perp = Math.abs(-dx * Math.sin(this.beamAngle) + dy * Math.cos(this.beamAngle));
          if (perp < 11) player.takeDamage(1, this.x);
        }
      }
      if (this.stateTime > 0.5) {
        this.anchorX = this.x + (Math.random() - 0.5) * 100;
        this.anchorY = this.y + (Math.random() - 0.5) * 50;
        this.setState('hover');
      }
    }
    this.updatePhysics(dt, level);
  };

  VagaLume.prototype.draw = function (ctx, sx, sy, flash) {
    // linha de mira / feixe
    if (this.state === 'aim') {
      var grow = Math.min(1, this.stateTime / 0.6);
      ctx.strokeStyle = 'rgba(255,240,180,' + (0.15 + grow * 0.45) + ')';
      ctx.lineWidth = 1 + grow * 1.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(this.beamAngle) * this.beamLen, sy + Math.sin(this.beamAngle) * this.beamLen);
      ctx.stroke();
    } else if (this.state === 'fire' && this.stateTime < 0.22) {
      ctx.strokeStyle = 'rgba(255,252,230,0.95)';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(this.beamAngle) * this.beamLen, sy + Math.sin(this.beamAngle) * this.beamLen);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,220,140,0.6)';
      ctx.lineWidth = 13;
      ctx.stroke();
    }
    // corpo: vespa de luz
    var body = flash ? '#fff' : '#8a7a3c';
    var wing = Math.sin(this._t * 30) * 4;
    ctx.fillStyle = 'rgba(220,230,200,0.5)';
    ctx.beginPath();
    ctx.ellipse(sx - 4, sy - 5 - wing, 5, 2.5, -0.5, 0, Math.PI * 2);
    ctx.ellipse(sx + 4, sy - 5 + wing, 5, 2.5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(sx, sy, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    var glow = this.state === 'aim' ? 0.6 + Math.min(1, this.stateTime / 0.6) * 0.4 : 0.7;
    ctx.fillStyle = 'rgba(255,240,170,' + glow + ')';
    ctx.beginPath();
    ctx.arc(sx, sy + 2, 3, 0, Math.PI * 2);
    ctx.fill();
  };

  VagaLume.prototype.collectLights = function (lights) {
    lights.push({ x: this.x, y: this.y, radius: 55, color: '255,240,170', intensity: 0.4 });
  };

  // ---------------- PORTADOR DA CINZA ----------------
  function Portador(x, y) {
    Base.call(this, x, y, { hw: 12, hh: 13, hp: 5 });
    this.setState('walk');
    this.columns = []; // colunas de brasa {x, t}
    this.attackClock = 2.2;
  }
  extend(Portador);

  Portador.prototype.think = function (dt, player, level, particles) {
    for (var c = this.columns.length - 1; c >= 0; c--) {
      var col = this.columns[c];
      col.t += dt;
      if (col.t > 1.15) { this.columns.splice(c, 1); continue; }
      // depois da marca (0.55s), a coluna cai e machuca
      if (col.t > 0.55 && col.t < 0.95) {
        if (Math.abs(player.x - col.x) < 12 && Math.abs(player.y - this.y) < 90) {
          player.takeDamage(1, col.x);
        }
        if (Math.random() < dt * 40) {
          particles.spawn({
            x: col.x + (Math.random() - 0.5) * 10, y: this.y - 60 + Math.random() * 50,
            vx: (Math.random() - 0.5) * 20, vy: 120, g: 200,
            life: 0.3, size: 2, color: Math.random() < 0.5 ? '#ff8a4a' : '#ffd27a', kind: 'spark'
          });
        }
      }
    }

    if (this.state === 'walk') {
      this.attackClock -= dt;
      var dx = player.x - this.x;
      this.facing = dx > 0 ? 1 : -1;
      this.vx = Math.abs(dx) > 30 ? this.facing * 20 : 0;
      var aheadX = this.x + this.facing * (this.hw + 4);
      if (!level.solidAt(aheadX, this.y + this.hh + 4) && this.onGround) this.vx = 0;
      if (this.attackClock <= 0 && this.distTo(player) < 220) {
        this.setState('channel');
        this.vx = 0;
      }
    } else if (this.state === 'channel') {
      // canalizando: parado, VULNERÁVEL — o cajado ergue brasas
      this.vx = 0;
      if (this.stateTime > 0.7) {
        this.setState('slamStaff');
        this.columns.push({ x: player.x, t: 0 });
        this.columns.push({ x: player.x - 70, t: 0 });
        this.columns.push({ x: player.x + 70, t: 0 });
        LK.audio.sfx('slam');
      }
    } else if (this.state === 'slamStaff') {
      this.vx = 0;
      if (this.stateTime > 1.2) {
        this.setState('walk');
        this.attackClock = 3.4;
      }
    }
    this.updatePhysics(dt, level);
  };

  Portador.prototype.draw = function (ctx, sx, sy, flash) {
    // marcas e colunas
    for (var c = 0; c < this.columns.length; c++) {
      var col = this.columns[c];
      var cx = col.x - (this.x - sx);
      var floorY = sy + this.hh;
      if (col.t < 0.55) {
        var mA = 0.25 + 0.45 * Math.sin(col.t * 22);
        ctx.strokeStyle = 'rgba(255,140,74,' + Math.max(0.2, mA) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 9, floorY); ctx.lineTo(cx + 9, floorY);
        ctx.stroke();
      } else if (col.t < 0.95) {
        var colH = 84;
        var grad = ctx.createLinearGradient(0, floorY - colH, 0, floorY);
        grad.addColorStop(0, 'rgba(255,180,90,0.0)');
        grad.addColorStop(0.4, 'rgba(255,140,60,0.75)');
        grad.addColorStop(1, 'rgba(255,220,140,0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(cx - 7, floorY - colH, 14, colH);
      }
    }

    var armor = flash ? '#fff' : '#4a3630';
    var trim = flash ? '#fff' : '#8a5c3c';
    var channeling = this.state === 'channel' || this.state === 'slamStaff';
    ctx.save();
    ctx.translate(sx, sy);
    // corpo blindado curvado
    ctx.fillStyle = armor;
    ctx.beginPath();
    ctx.moveTo(-10, 13);
    ctx.quadraticCurveTo(-13, -6, 0, -13);
    ctx.quadraticCurveTo(13, -6, 10, 13);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = trim;
    ctx.lineWidth = 2;
    ctx.stroke();
    // fresta do elmo em brasa
    ctx.fillStyle = channeling ? '#ffd27a' : '#ff8a4a';
    ctx.fillRect(this.facing * 2 - 3, -8, 6, 2.5);
    // cajado
    ctx.strokeStyle = trim;
    ctx.lineWidth = 2.5;
    var staffLift = channeling ? -10 - Math.sin(this._t * 10) * 2 : 0;
    ctx.beginPath();
    ctx.moveTo(this.facing * 13, 12);
    ctx.lineTo(this.facing * 15, -8 + staffLift);
    ctx.stroke();
    ctx.fillStyle = channeling ? '#ffd27a' : '#b06a3c';
    ctx.beginPath();
    ctx.arc(this.facing * 15, -11 + staffLift, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  Portador.prototype.collectLights = function (lights) {
    if (this.state === 'channel' || this.state === 'slamStaff') {
      lights.push({ x: this.x + this.facing * 15, y: this.y - 11, radius: 50, color: '255,180,90', intensity: 0.5 });
    }
  };

  // ---------------- FULIGEM ----------------
  function Fuligem(x, y) {
    Base.call(this, x, y, { hw: 8, hh: 10, hp: 3, gravity: 0 });
    this.setState('drift');
    this.alpha = 1;
  }
  extend(Fuligem);

  Fuligem.prototype.blocksAttack = function () {
    return this.state === 'gone' || this.state === 'fade';
  };

  Fuligem.prototype.think = function (dt, player, level, particles) {
    if (this.state === 'drift') {
      this.alpha = Math.min(1, this.alpha + dt * 3);
      var dx = player.x - this.x, dy = player.y - 14 - this.y;
      this.vx = dx * 0.7;
      this.vy = dy * 0.7 + Math.sin(this._t * 3) * 12;
      this.facing = dx > 0 ? 1 : -1;
      if (this.stateTime > 1.3 && this.distTo(player) < 200) this.setState('fade');
    } else if (this.state === 'fade') {
      this.alpha = Math.max(0, 1 - this.stateTime * 2.2);
      this.vx *= 0.9; this.vy *= 0.9;
      if (this.stateTime > 0.5) this.setState('gone');
    } else if (this.state === 'gone') {
      this.alpha = 0;
      if (this.stateTime > 0.4) {
        // reaparece do lado do jogador (atrás, de preferência)
        this.x = player.x - player.facing * 38;
        this.y = player.y - 12;
        this.setState('appear');
        LK.audio.sfx('splat');
      }
    } else if (this.state === 'appear') {
      this.alpha = Math.min(1, this.stateTime * 3);
      this.vx = 0; this.vy = 0;
      if (this.stateTime > 0.4) this.setState('slash');
    } else if (this.state === 'slash') {
      if (this.stateTime < 0.2 && this.distTo(player) < 36) {
        player.takeDamage(1, this.x);
      }
      if (this.stateTime > 0.3) this.setState('recover');
    } else if (this.state === 'recover') {
      // exausto e visível — a janela de punição
      this.vy = Math.sin(this._t * 4) * 8;
      if (this.stateTime > 1.0) this.setState('drift');
    }
    this.updatePhysics(dt, level);
  };

  Fuligem.prototype.draw = function (ctx, sx, sy, flash) {
    if (this.alpha <= 0.02) return;
    ctx.save();
    ctx.globalAlpha = this.alpha * (flash ? 1 : 0.9);
    var body = flash ? '#fff' : '#1c1418';
    var glow = this.state === 'appear' || this.state === 'slash' ? '#ff5a2a' : '#8a4a5c';
    // véu de fuligem (gota rasgada)
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(sx, sy - 12);
    ctx.quadraticCurveTo(sx + 9, sy - 4, sx + 6, sy + 6);
    ctx.lineTo(sx + 3, sy + 3);
    ctx.lineTo(sx, sy + 9);
    ctx.lineTo(sx - 3, sy + 2);
    ctx.lineTo(sx - 6, sy + 7);
    ctx.quadraticCurveTo(sx - 9, sy - 4, sx, sy - 12);
    ctx.closePath();
    ctx.fill();
    // olhos-brasa
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx - 2.5, sy - 6, 1.6, 0, Math.PI * 2);
    ctx.arc(sx + 2.5, sy - 6, 1.6, 0, Math.PI * 2);
    ctx.fill();
    // talho
    if (this.state === 'slash' && this.stateTime < 0.25) {
      var sT = this.stateTime / 0.25;
      ctx.strokeStyle = 'rgba(255,90,42,' + (1 - sT) + ')';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sx, sy, 30, -Math.PI * 0.3 + sT * 4, 0.9 + sT * 4);
      ctx.stroke();
    }
    ctx.restore();
  };

  LK.entities.Bestiary2 = {
    Salteador: Salteador,
    Espinheiro: Espinheiro,
    VagaLume: VagaLume,
    Portador: Portador,
    Fuligem: Fuligem
  };
})();
