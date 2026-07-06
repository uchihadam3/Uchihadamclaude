// Lighting: a passada que faz a caverna parecer caverna.
// 1) canvas de escuridão preenchido com a cor da treva do bioma;
// 2) cada luz recorta um furo suave (destination-out, gradiente radial);
// 3) escuridão composta sobre a cena;
// 4) brilhos aditivos (lighter) por cima para o halo colorido das luzes.
(function () {
  function Lighting() {
    this.darkCanvas = document.createElement('canvas');
    this.darkCtx = this.darkCanvas.getContext('2d');
  }

  Lighting.prototype.render = function (ctx, lights, cam, viewW, viewH, darknessAlpha) {
    if (this.darkCanvas.width !== viewW || this.darkCanvas.height !== viewH) {
      this.darkCanvas.width = viewW;
      this.darkCanvas.height = viewH;
    }
    var dctx = this.darkCtx;

    dctx.globalCompositeOperation = 'source-over';
    dctx.fillStyle = 'rgba(4,7,14,' + darknessAlpha + ')';
    dctx.clearRect(0, 0, viewW, viewH);
    dctx.fillRect(0, 0, viewW, viewH);

    dctx.globalCompositeOperation = 'destination-out';
    for (var i = 0; i < lights.length; i++) {
      var L = lights[i];
      var sx = L.x - cam.x, sy = L.y - cam.y;
      if (sx < -L.radius || sy < -L.radius || sx > viewW + L.radius || sy > viewH + L.radius) continue;
      var g = dctx.createRadialGradient(sx, sy, 0, sx, sy, L.radius);
      g.addColorStop(0, 'rgba(0,0,0,' + Math.min(1, L.intensity * 2.4) + ')');
      g.addColorStop(0.6, 'rgba(0,0,0,' + (L.intensity * 0.9) + ')');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      dctx.fillStyle = g;
      dctx.beginPath();
      dctx.arc(sx, sy, L.radius, 0, Math.PI * 2);
      dctx.fill();
    }

    ctx.drawImage(this.darkCanvas, 0, 0);

    // halos coloridos aditivos
    ctx.globalCompositeOperation = 'lighter';
    for (var j = 0; j < lights.length; j++) {
      var L2 = lights[j];
      var sx2 = L2.x - cam.x, sy2 = L2.y - cam.y;
      if (sx2 < -L2.radius || sy2 < -L2.radius || sx2 > viewW + L2.radius || sy2 > viewH + L2.radius) continue;
      var g2 = ctx.createRadialGradient(sx2, sy2, 0, sx2, sy2, L2.radius * 0.75);
      g2.addColorStop(0, 'rgba(' + L2.color + ',' + (L2.intensity * 0.5) + ')');
      g2.addColorStop(1, 'rgba(' + L2.color + ',0)');
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(sx2, sy2, L2.radius * 0.75, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  };

  LK.gfx.Lighting = Lighting;
})();
