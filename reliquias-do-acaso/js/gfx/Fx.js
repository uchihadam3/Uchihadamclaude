// Fx: números flutuantes, partículas de golpe/cura/fogo/veneno/gelo/raio/
// maldição, flashes de acerto e tremor de tela (respeitando acessibilidade).
(function () {
  var floaters = []; // {x,y,txt,color,t,vy,size}
  var parts = [];    // {x,y,vx,vy,g,t,life,color,size,kind}
  var shakeT = 0, shakeAmp = 0;

  var Fx = {
    floater: function (x, y, txt, color, size) {
      floaters.push({ x: x, y: y, txt: String(txt), color: color || '#fff', t: 0, vy: -22, size: size || 1 });
    },
    burst: function (x, y, kind, count) {
      count = count || 10;
      var defs = {
        hit: { colors: ['#fff2c9', '#ffd27a', '#e8e8f0'], g: 120, spd: 60 },
        crit: { colors: ['#ffe9a0', '#ff8a3c', '#fff'], g: 100, spd: 90 },
        heal: { colors: ['#6ec83c', '#c8ff8a', '#e8ffe0'], g: -40, spd: 30 },
        fire: { colors: ['#ff8a3c', '#ffd27a', '#b8442a'], g: -60, spd: 45 },
        ice: { colors: ['#a8d4f0', '#e8f4ff', '#4a8ae8'], g: 60, spd: 40 },
        bolt: { colors: ['#fffbc8', '#e8d84a'], g: 0, spd: 80 },
        poison: { colors: ['#6ec83c', '#4a9d2e', '#d8ff5c'], g: -30, spd: 25 },
        curse: { colors: ['#8a4ae8', '#c8b8e8', '#5c2ea8'], g: -20, spd: 35 },
        shield: { colors: ['#8a94a8', '#c9d4e8'], g: 40, spd: 35 },
        death: { colors: ['#e8e0d0', '#8a8a94', '#fff'], g: 60, spd: 70 },
        gold: { colors: ['#ffd76a', '#c9a23a', '#fff2b8'], g: 100, spd: 55 },
        summon: { colors: ['#c8b8e8', '#8a6ae8', '#e8e0ff'], g: -50, spd: 40 }
      };
      var d = defs[kind] || defs.hit;
      for (var i = 0; i < count; i++) {
        var ang = Math.random() * Math.PI * 2;
        var spd = d.spd * (0.5 + Math.random());
        parts.push({
          x: x, y: y,
          vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 20,
          g: d.g, t: 0, life: 0.4 + Math.random() * 0.4,
          color: d.colors[Math.floor(Math.random() * d.colors.length)],
          size: 1 + Math.random() * 2
        });
      }
    },
    slash: function (x, y, dir) {
      for (var i = 0; i < 6; i++) {
        parts.push({
          x: x - dir * 12 + i * dir * 4, y: y - 8 + i * 3,
          vx: dir * 90, vy: 20, g: 0, t: 0, life: 0.18,
          color: i % 2 ? '#fff' : '#ffd27a', size: 2.5
        });
      }
    },
    shake: function (amp) {
      if (RA.core.Save.get().settings.reduceShake) amp *= 0.3;
      shakeAmp = Math.min(8, shakeAmp + amp);
      shakeT = 0;
    },
    update: function (dt) {
      for (var i = floaters.length - 1; i >= 0; i--) {
        var f = floaters[i];
        f.t += dt;
        f.y += f.vy * dt;
        f.vy *= 0.94;
        if (f.t > 1.1) floaters.splice(i, 1);
      }
      for (var j = parts.length - 1; j >= 0; j--) {
        var p = parts[j];
        p.t += dt;
        if (p.t > p.life) { parts.splice(j, 1); continue; }
        p.vy += p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.97;
      }
      shakeAmp = Math.max(0, shakeAmp - dt * 14);
      shakeT += dt * 60;
    },
    offset: function () {
      if (shakeAmp <= 0.05) return { x: 0, y: 0 };
      return {
        x: Math.round(Math.sin(shakeT * 1.3) * shakeAmp),
        y: Math.round(Math.cos(shakeT * 1.7) * shakeAmp * 0.6)
      };
    },
    render: function (ctx) {
      for (var j = 0; j < parts.length; j++) {
        var p = parts[j];
        ctx.globalAlpha = 1 - p.t / p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), Math.ceil(p.size), Math.ceil(p.size));
      }
      ctx.globalAlpha = 1;
      for (var i = 0; i < floaters.length; i++) {
        var f = floaters[i];
        var alpha = f.t < 0.7 ? 1 : 1 - (f.t - 0.7) / 0.4;
        ctx.globalAlpha = alpha;
        RA.gfx.Font.draw(ctx, f.txt, Math.round(f.x), Math.round(f.y),
          { size: f.size, color: f.color, align: 'center', shadow: true });
        ctx.globalAlpha = 1;
      }
    },
    clear: function () { floaters.length = 0; parts.length = 0; shakeAmp = 0; }
  };

  RA.gfx.Fx = Fx;
})();
