// Dice: o coração visual do jogo. Dado 2.5D (face frontal + topo + lateral
// em perspectiva), com skins por tipo, animação de rolagem (frames de faces
// aleatórias + jitter + rotação falsa), quique com squash na aterrissagem,
// sombra elíptica, corrente de "travado", brilho de lado raro/dourado.
(function () {
  var SKINS = {
    vermelho: { face: '#8a2432', faceHi: '#b83a44', edge: '#4a1018', top: '#c85a5a', pip: '#ffe8e0', rim: '#e84a5a' },
    azul: { face: '#24408a', faceHi: '#3a58b8', edge: '#101c4a', top: '#5a7ac8', pip: '#e0ecff', rim: '#4a8ae8' },
    verde: { face: '#2e6e2a', faceHi: '#3f8a38', edge: '#143a10', top: '#6aa85a', pip: '#e8ffe0', rim: '#6ec83c' },
    amarelo: { face: '#8a6e1e', faceHi: '#b8942e', edge: '#4a380c', top: '#d8b84a', pip: '#fff8dc', rim: '#e8c84a' },
    roxo: { face: '#5c2e8a', faceHi: '#7a42b0', edge: '#2e1048', top: '#9a6ac8', pip: '#f0e0ff', rim: '#8a4ae8' },
    cinza: { face: '#4a505c', faceHi: '#626a78', edge: '#24282e', top: '#8a94a8', pip: '#e8ecf0', rim: '#a8b4c8' },
    dourado: { face: '#8a6e2e', faceHi: '#c9a23a', edge: '#4a380c', top: '#ffe9a0', pip: '#fffbe8', rim: '#ffd76a' },
    preto: { face: '#1c1824', faceHi: '#2e2838', edge: '#0a080e', top: '#4a4258', pip: '#c8b8e8', rim: '#6e5a9d' }
  };

  function skin(name) { return SKINS[name] || SKINS.cinza; }

  // desenha o cubo em (x,y) = canto superior esquerdo da face frontal.
  // s = lado da face; depth = espessura 2.5D.
  function drawCube(ctx, x, y, s, sk, squashX, squashY) {
    squashX = squashX || 1; squashY = squashY || 1;
    var w = s * squashX, h = s * squashY;
    var d = Math.round(s * 0.24 * squashX);
    x = Math.round(x + (s - w) / 2);
    y = Math.round(y + (s - h));
    w = Math.round(w); h = Math.round(h);

    // topo
    ctx.fillStyle = sk.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + d, y - d);
    ctx.lineTo(x + w + d, y - d);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();
    // lateral direita
    ctx.fillStyle = sk.edge;
    ctx.beginPath();
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w + d, y - d);
    ctx.lineTo(x + w + d, y + h - d);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
    // face frontal
    ctx.fillStyle = sk.face;
    ctx.fillRect(x, y, w, h);
    // brilho superior-esquerdo da face
    ctx.fillStyle = sk.faceHi;
    ctx.fillRect(x + 1, y + 1, w - 2, 2);
    ctx.fillRect(x + 1, y + 1, 2, h - 2);
    // contorno
    ctx.strokeStyle = sk.edge;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    return { fx: x, fy: y, fw: w, fh: h, d: d };
  }

  // conteúdo de uma face: ícone do símbolo + valor
  function drawFaceContent(ctx, face, fx, fy, fw, fh, sk, dim) {
    if (!face) return;
    var icon = RA.gfx.Icons.symbol(face.sym);
    var iconScale = Math.max(1, Math.floor(fw / 16));
    var iw = 10 * iconScale;
    ctx.globalAlpha = dim ? 0.45 : 1;
    ctx.drawImage(icon, Math.round(fx + (fw - iw) / 2), Math.round(fy + (fh - iw) / 2 - 2), iw, iw);
    if (face.val > 0) {
      RA.gfx.Font.draw(ctx, String(face.val), fx + fw - 3, fy + fh - 10,
        { size: 1, color: sk.pip, align: 'right', shadow: 'rgba(0,0,0,0.8)' });
    }
    // marcas: lado dourado / trincado / usos limitados
    if (face.golden) {
      ctx.fillStyle = '#ffd76a';
      ctx.fillRect(fx + 2, fy + fh - 3, fw - 4, 2);
    }
    if (face.cracked) {
      ctx.strokeStyle = 'rgba(20,16,26,0.85)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fx + fw * 0.3, fy + 1);
      ctx.lineTo(fx + fw * 0.5, fy + fh * 0.45);
      ctx.lineTo(fx + fw * 0.35, fy + fh - 1);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // dado completo com estado de animação.
  // die: {skin, faces[6], anim:{phase:'idle|rolling|landing', t, showFace, jx, jy},
  //       locked, used, resultFace}
  function draw(ctx, die, x, y, s, time) {
    var sk = skin(die.skin);
    var anim = die.anim || { phase: 'idle', t: 0 };
    var jx = 0, jy = 0, squashX = 1, squashY = 1;
    var face = die.resultFace;

    if (anim.phase === 'rolling') {
      jx = Math.sin(time * 37 + x) * 2.2;
      jy = Math.cos(time * 43 + y) * 2 - Math.abs(Math.sin(time * 11)) * 5;
      face = die.faces[anim.showFace % 6];
      squashY = 1 + Math.sin(time * 31) * 0.06;
      squashX = 1 - Math.sin(time * 31) * 0.04;
    } else if (anim.phase === 'landing') {
      var lt = Math.min(1, anim.t * 5);
      squashY = lt < 0.5 ? 1 - (0.5 - lt) * 0.5 : 1 + Math.sin((lt - 0.5) * Math.PI) * 0.08 * (1 - lt);
      squashX = 2 - squashY;
    }

    // sombra
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    var shadowW = s * 0.55 * (anim.phase === 'rolling' ? 0.8 : 1);
    ctx.ellipse(x + s / 2 + jx * 0.3, y + s + 3, shadowW, s * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();

    var cube = drawCube(ctx, x + jx, y + jy, s, sk, squashX, squashY);
    if (anim.phase !== 'rolling' || true) {
      drawFaceContent(ctx, face, cube.fx, cube.fy, cube.fw, cube.fh, sk, die.used);
    }

    // aro de destaque (selecionado/raro)
    if (die.highlight) {
      var pulse = 0.6 + 0.4 * Math.sin(time * 6);
      ctx.strokeStyle = 'rgba(255,235,180,' + pulse + ')';
      ctx.lineWidth = 2;
      ctx.strokeRect(cube.fx - 2.5, cube.fy - 2.5, cube.fw + 5, cube.fh + 5);
    }
    if (face && (face.rare || face.golden) && anim.phase === 'idle' && !die.used) {
      var sp = 0.5 + 0.5 * Math.sin(time * 4 + x);
      ctx.strokeStyle = 'rgba(255,215,106,' + (0.35 + sp * 0.4) + ')';
      ctx.lineWidth = 1;
      ctx.strokeRect(cube.fx - 1.5, cube.fy - 1.5, cube.fw + 3, cube.fh + 3);
    }

    // travado: corrente + escurecida
    if (die.locked) {
      ctx.fillStyle = 'rgba(10,8,16,0.28)';
      ctx.fillRect(cube.fx, cube.fy, cube.fw, cube.fh);
      var ch = RA.gfx.Icons.status('chained');
      ctx.drawImage(ch, cube.fx + cube.fw - 9, cube.fy + 1, 8, 8);
    }
    if (die.used) {
      ctx.fillStyle = 'rgba(10,8,16,0.45)';
      ctx.fillRect(cube.fx, cube.fy, cube.fw, cube.fh);
    }

    return cube;
  }

  // Dado do Destino: d12 dourado (silhueta hexagonal)
  function drawFate(ctx, x, y, s, time, spinning, label) {
    var cx = x + s / 2, cy = y + s / 2;
    var r = s / 2;
    var rot = spinning ? time * 6 : 0;
    // sombra
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, y + s + 2, r * 0.8, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    // corpo hexagonal
    for (var pass = 0; pass < 2; pass++) {
      ctx.fillStyle = pass === 0 ? '#4a380c' : '#8a6e2e';
      ctx.beginPath();
      var off = pass === 0 ? 2 : 0;
      for (var i = 0; i < 6; i++) {
        var a = rot + i * Math.PI / 3 + Math.PI / 6;
        var px = cx + Math.cos(a) * (r - pass * 2);
        var py = cy + off + Math.sin(a) * (r - pass * 2);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
    // facetas internas
    ctx.strokeStyle = '#c9a23a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var j = 0; j < 3; j++) {
      var a2 = rot + j * Math.PI * 2 / 3 + Math.PI / 2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a2) * (r - 3), cy + Math.sin(a2) * (r - 3));
    }
    ctx.stroke();
    // núcleo dourado brilhante
    var pulse = 0.75 + 0.25 * Math.sin(time * 3);
    ctx.fillStyle = 'rgba(255,233,160,' + pulse + ')';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8a6e2e';
    if (label !== undefined && !spinning) {
      RA.gfx.Font.draw(ctx, String(label), cx, cy - 3, { size: 1, color: '#4a380c', align: 'center' });
    }
  }

  RA.gfx.Dice = { draw: draw, drawFate: drawFate, skin: skin, SKINS: SKINS };
})();
