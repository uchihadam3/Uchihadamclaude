// Lamps: os lampiões — mecânica central (reacender o mundo) e checkpoints.
// Apagado: ferro frio, quase invisível no escuro. Aceso: chama viva, halo
// quente, e vira o ponto de renascimento do jogador.
(function () {
  function Lamps(level, particles) {
    this.list = level.lamps;
    this.particles = particles;
    this._t = 0;
  }

  Lamps.prototype.update = function (dt, player) {
    this._t += dt;
    for (var i = 0; i < this.list.length; i++) {
      var lamp = this.list[i];
      if (lamp.lit) {
        lamp.glow = Math.min(1, lamp.glow + dt * 1.6);
        if (Math.random() < dt * 6) {
          this.particles.spawn({
            x: lamp.x + (Math.random() - 0.5) * 4, y: lamp.y - 26,
            vx: (Math.random() - 0.5) * 10, vy: -18 - Math.random() * 14,
            g: -12, life: 0.8 + Math.random() * 0.7,
            size: 1 + Math.random() * 1.6,
            color: Math.random() < 0.6 ? '#ffd27a' : '#ff9a3c', kind: 'dot', drag: 0.6
          });
        }
      } else {
        // acende ao tocar (por enquanto; futuramente com tecla de interação)
        var dx = player.x - lamp.x, dy = (player.y) - (lamp.y - 14);
        if (Math.abs(dx) < 16 && Math.abs(dy) < 26) {
          lamp.lit = true;
          player.respawnPoint = { x: lamp.x, y: lamp.y - 4 };
          this.particles.burst(lamp.x, lamp.y - 26, 26, {
            speedMin: 40, speedMax: 190, g: -60, drag: 2.4,
            color: ['#ffd27a', '#ff9a3c', '#fff2c9'],
            lifeMin: 0.4, lifeMax: 1.1, kind: 'spark', sizeMin: 1.5, sizeMax: 3
          });
        }
      }
    }
  };

  Lamps.prototype.render = function (ctx, camX, camY) {
    for (var i = 0; i < this.list.length; i++) {
      var lamp = this.list[i];
      var sx = lamp.x - camX, sy = lamp.y - camY;

      // poste de ferro
      ctx.strokeStyle = '#2a3648';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx, sy - 22);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy - 22);
      ctx.quadraticCurveTo(sx, sy - 30, sx, sy - 27);
      ctx.stroke();

      // gaiola da chama
      ctx.strokeStyle = lamp.lit ? '#6e5a34' : '#324054';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sx - 4.5, sy - 32, 9, 10);

      if (lamp.lit) {
        var fl = 0.75 + 0.25 * Math.sin(this._t * 8.3 + i * 2);
        ctx.fillStyle = 'rgba(255,210,122,' + fl + ')';
        ctx.beginPath();
        ctx.ellipse(sx, sy - 27, 2.4, 3.6 * fl + 1.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,235,0.9)';
        ctx.beginPath();
        ctx.ellipse(sx, sy - 26.4, 1.1, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#1c2534';
        ctx.fillRect(sx - 1.5, sy - 29.5, 3, 5);
      }
    }
  };

  Lamps.prototype.collectLights = function (lights) {
    for (var i = 0; i < this.list.length; i++) {
      var lamp = this.list[i];
      if (!lamp.lit || lamp.glow <= 0) continue;
      var fl = 0.86 + 0.14 * Math.sin(this._t * 7.1 + i * 2);
      lights.push({
        x: lamp.x, y: lamp.y - 27,
        radius: 130 * lamp.glow * fl,
        color: '255,190,110',
        intensity: 0.85 * lamp.glow
      });
    }
  };

  LK.world.Lamps = Lamps;
})();
