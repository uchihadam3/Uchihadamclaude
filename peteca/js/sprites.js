/* =========================================================================
   PETECA LEGENDS — sprites.js
   Pixel art procedural: atletas (10 poses, frente/costas), retratos,
   peteca com rotação, troféu. Tudo desenhado pixel a pixel em canvases
   pequenos e escalado sem suavização (visual pixel art autêntico).
   ========================================================================= */
(function (root) {
  'use strict';

  const S = {};
  const cache = new Map();

  /* ---- helpers ---- */
  function mkCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 0xff) + amt, b = (n & 0xff) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }
  S.shade = shade;

  /* Grade de pixels: px(x,y[,w,h]) */
  function painter(g) {
    return function px(x, y, w, h, color) {
      if (color === undefined) { color = w; w = 1; h = 1; }
      g.fillStyle = color;
      g.fillRect(Math.round(x), Math.round(y), w, h);
    };
  }

  /* =====================================================================
     ATLETA — canvas 20x26
     look: { skin, hair, hairStyle, body }
     uni:  { c1 (camisa), c2 (detalhe/shorts) }
     pose: idle|run|serveprep|serve|smash|defend|drop|celebrate|sad|tired
     frame: 0|1  facing: 'down' (de frente) | 'up' (de costas)
     ===================================================================== */
  S.athlete = function (look, uni, pose, frame, facing) {
    const key = ['A', look.skin, look.hair, look.hairStyle, look.body, uni.c1, uni.c2, pose, frame, facing].join('|');
    if (cache.has(key)) return cache.get(key);
    const c = mkCanvas(20, 26);
    const g = c.getContext('2d');
    drawAthlete(g, look, uni, pose, frame || 0, facing || 'down');
    cache.set(key, c);
    return c;
  };

  function drawAthlete(g, look, uni, pose, f, facing) {
    const px = painter(g);
    const skin = look.skin, skinD = shade(look.skin, -28);
    const hair = look.hair, hairD = shade(look.hair, -24);
    const c1 = uni.c1, c1d = shade(uni.c1, -30);
    const c2 = uni.c2;
    const shoe = '#f2f2f2', shoeD = '#b8b8b8';
    const CX = 10; // centro
    const back = facing === 'up';

    // deslocamentos por pose (corpo)
    let bodyY = 4;       // topo da cabeça
    let lean = 0;        // inclinação lateral do tronco
    let crouch = 0;      // agachamento
    if (pose === 'defend') crouch = 2;
    if (pose === 'tired') crouch = 2;
    if (pose === 'smash') bodyY = 2; // pulando
    if (pose === 'celebrate' && f === 1) bodyY = 3;

    const headY = bodyY + crouch * 0.5;
    const torsoY = headY + 7;
    const shortsY = torsoY + 7 - crouch;
    const legY = shortsY + 3;

    /* ---------- pernas ---------- */
    const legH = 6 - crouch;
    function leg(x, dx, bent) {
      px(x, legY, 2, bent ? legH - 1 : legH, skin);
      px(x + dx, legY + legH - (bent ? 1 : 0), 2, 1, skin);
      // tênis
      px(x + dx - (dx < 0 ? 1 : 0), legY + legH, 3, 2, shoe);
      px(x + dx - (dx < 0 ? 1 : 0), legY + legH + 1, 3, 1, shoeD);
    }
    if (pose === 'run') {
      if (f === 0) { leg(CX - 4, -1, true); leg(CX + 2, 1, false); }
      else { leg(CX - 4, 0, false); leg(CX + 2, 0, true); }
    } else if (pose === 'defend' || pose === 'tired') {
      leg(CX - 5, -1, true); leg(CX + 3, 1, true);
    } else if (pose === 'smash') {
      leg(CX - 4, -1, true); leg(CX + 2, 1, true); // pernas dobradas no pulo
    } else {
      leg(CX - 4, 0, false); leg(CX + 2, 0, false);
    }

    /* ---------- shorts ---------- */
    px(CX - 4, shortsY, 8, 3, c2);
    px(CX - 4, shortsY + 2, 8, 1, shade(c2, -30));

    /* ---------- tronco (camisa) ---------- */
    const wide = look.body === 'forte' ? 1 : 0;
    px(CX - 4 - wide, torsoY, 8 + wide * 2, 7 - crouch, c1);
    px(CX - 4 - wide, torsoY + 5 - crouch, 8 + wide * 2, 2, c1d);
    // detalhe do uniforme: faixa
    px(CX - 4 - wide, torsoY + 2, 8 + wide * 2, 1, c2);
    if (back) {
      // número nas costas
      px(CX - 1, torsoY + 3, 2, 2, '#ffffff');
    }

    /* ---------- braços ---------- */
    // cada braço: função com "pontos" pixel a pixel
    function armSeg(x0, y0, pts) {
      let x = x0, y = y0;
      for (const [dx, dy] of pts) { px(x, y, 2, 2, skin); x += dx; y += dy; }
      px(x, y, 2, 2, skin); // mão
    }
    const shL = CX - 6 - wide, shR = CX + 4 + wide, shY = torsoY + 1;

    switch (pose) {
      case 'run':
        if (f === 0) { armSeg(shL, shY, [[0, 2], [1, 2]]); armSeg(shR, shY, [[1, -1], [1, -1]]); }
        else { armSeg(shL, shY, [[1, -1], [1, -1]]); armSeg(shR, shY, [[0, 2], [-1, 2]]); }
        break;
      case 'serveprep':
        // mão esquerda segura a peteca à frente, direita atrás/baixo
        armSeg(shL, shY, [[-1, 1], [-1, 1]]);
        armSeg(shR, shY, [[1, 2], [0, 2]]);
        drawPetecaMini(px, shL - 3, shY + 3);
        break;
      case 'serve':
        armSeg(shL, shY, [[-2, 0], [-1, -1]]);
        armSeg(shR, shY, [[1, -2], [1, -2]]); // braço subindo
        break;
      case 'smash':
        armSeg(shL, shY, [[-1, 1], [0, 2]]);
        armSeg(shR, shY - 1, [[1, -2], [0, -3]]); // braço bem alto
        break;
      case 'defend':
        armSeg(shL, shY + 1, [[-1, 2], [0, 2]]);
        armSeg(shR, shY + 1, [[1, 2], [0, 2]]);
        break;
      case 'drop':
        armSeg(shL, shY, [[0, 2], [0, 2]]);
        armSeg(shR, shY, [[2, -1], [2, 0]]); // toque suave à frente
        break;
      case 'celebrate':
        if (f === 0) { armSeg(shL, shY, [[-1, -2], [0, -3]]); armSeg(shR, shY, [[1, -2], [0, -3]]); }
        else { armSeg(shL, shY, [[-2, -1], [-1, -2]]); armSeg(shR, shY, [[2, -1], [1, -2]]); }
        break;
      case 'sad':
        armSeg(shL, shY + 1, [[0, 2], [0, 2]]);
        armSeg(shR, shY + 1, [[0, 2], [0, 2]]);
        break;
      case 'tired':
        // mãos nos joelhos
        armSeg(shL, shY + 1, [[0, 3], [1, 2]]);
        armSeg(shR, shY + 1, [[0, 3], [-1, 2]]);
        break;
      default: // idle
        armSeg(shL, shY, [[0, 2], [0, 2 + (f === 1 ? 1 : 0)]]);
        armSeg(shR, shY, [[0, 2], [0, 2 + (f === 1 ? 1 : 0)]]);
    }

    /* ---------- cabeça ---------- */
    const hy = pose === 'sad' || pose === 'tired' ? headY + 1 : headY;
    px(CX - 3, hy, 6, 6, skin);
    px(CX - 3, hy + 5, 6, 1, skinD);

    if (!back) {
      // rosto
      const eyeY = hy + 3;
      if (pose === 'sad') {
        px(CX - 2, eyeY + 1, 1, 1, '#20242c'); px(CX + 1, eyeY + 1, 1, 1, '#20242c');
        px(CX - 1, eyeY + 2, 2, 1, '#7a3b3b'); // boca triste
      } else if (pose === 'celebrate') {
        px(CX - 2, eyeY, 1, 1, '#20242c'); px(CX + 1, eyeY, 1, 1, '#20242c');
        px(CX - 1, eyeY + 2, 2, 1, '#ffffff'); // sorriso
      } else if (pose === 'tired') {
        px(CX - 2, eyeY + 1, 1, 1, '#20242c'); px(CX + 1, eyeY + 1, 1, 1, '#20242c');
      } else {
        px(CX - 2, eyeY, 1, 1, '#20242c'); px(CX + 1, eyeY, 1, 1, '#20242c');
      }
    }

    /* ---------- cabelo ---------- */
    drawHair(px, CX, hy, look.hairStyle, hair, hairD, back, look.gender);
  }

  function drawHair(px, CX, hy, style, hair, hairD, back, gender) {
    switch (style) {
      case 'curto':
        px(CX - 3, hy - 1, 6, 2, hair);
        px(CX - 3, hy + 1, 1, 2, hair); px(CX + 2, hy + 1, 1, 2, hair);
        if (back) px(CX - 3, hy + 1, 6, 2, hair);
        break;
      case 'raspado':
        px(CX - 3, hy - 1, 6, 1, hair);
        if (back) px(CX - 3, hy, 6, 2, hairD);
        break;
      case 'moicano':
        px(CX - 1, hy - 2, 2, 3, hair);
        px(CX - 1, hy - 2, 2, 1, hairD);
        if (back) px(CX - 1, hy + 1, 2, 4, hair);
        break;
      case 'coque':
        px(CX - 3, hy - 1, 6, 2, hair);
        px(CX - 1, hy - 3, 3, 2, hair);
        px(CX - 1, hy - 3, 3, 1, hairD);
        if (back) px(CX - 3, hy + 1, 6, 3, hair);
        break;
      case 'rabo':
        px(CX - 3, hy - 1, 6, 2, hair);
        px(CX - 3, hy + 1, 1, 2, hair); px(CX + 2, hy + 1, 1, 2, hair);
        if (back) { px(CX - 3, hy + 1, 6, 2, hair); px(CX - 1, hy + 3, 2, 4, hair); px(CX - 1, hy + 6, 2, 1, hairD); }
        else px(CX + 3, hy + 1, 1, 4, hair);
        break;
      case 'franja':
        px(CX - 3, hy - 1, 6, 2, hair);
        px(CX - 3, hy + 1, 2, 1, hair); px(CX + 1, hy + 1, 2, 1, hairD);
        if (back) px(CX - 3, hy + 1, 6, 3, hair);
        break;
      case 'cacheado':
        px(CX - 4, hy - 2, 8, 3, hair);
        px(CX - 4, hy - 2, 2, 1, hairD); px(CX + 2, hy - 1, 2, 1, hairD);
        px(CX - 4, hy + 1, 1, 2, hair); px(CX + 3, hy + 1, 1, 2, hair);
        if (back) px(CX - 4, hy + 1, 8, 3, hair);
        break;
      case 'trancas':
        px(CX - 3, hy - 1, 6, 2, hair);
        px(CX - 4, hy + 1, 1, 4, hair); px(CX + 3, hy + 1, 1, 4, hair);
        px(CX - 4, hy + 4, 1, 1, hairD); px(CX + 3, hy + 4, 1, 1, hairD);
        if (back) { px(CX - 3, hy + 1, 6, 2, hair); px(CX - 2, hy + 3, 1, 3, hair); px(CX + 1, hy + 3, 1, 3, hair); }
        break;
      default:
        px(CX - 3, hy - 1, 6, 2, hair);
    }
  }

  function drawPetecaMini(px, x, y) {
    px(x, y - 2, 2, 2, '#f5f5f5');
    px(x, y, 2, 1, '#b8503d');
  }

  /* =====================================================================
     RETRATO — canvas 26x26 (rosto grande + gola do uniforme)
     ===================================================================== */
  S.portrait = function (look, uni, mood) {
    const key = ['P', look.skin, look.hair, look.hairStyle, uni.c1, uni.c2, mood || 'ok'].join('|');
    if (cache.has(key)) return cache.get(key);
    const c = mkCanvas(26, 26);
    const g = c.getContext('2d');
    const px = painter(g);
    const skin = look.skin, skinD = shade(look.skin, -28);
    const hair = look.hair, hairD = shade(look.hair, -24);

    // fundo
    px(0, 0, 26, 26, '#1b2b45');
    px(0, 0, 26, 2, '#223a5e');

    // ombros/uniforme
    px(4, 21, 18, 5, uni.c1);
    px(4, 21, 18, 1, shade(uni.c1, -30));
    px(11, 21, 4, 2, skin); // pescoço
    px(6, 23, 2, 2, uni.c2); px(18, 23, 2, 2, uni.c2);

    // rosto
    px(7, 6, 12, 13, skin);
    px(7, 17, 12, 2, skinD);
    px(6, 9, 1, 6, skin); px(19, 9, 1, 6, skin); // orelhas

    // olhos e boca
    const happy = mood === 'happy', sad = mood === 'sad';
    px(10, 12, 2, 2, '#ffffff'); px(15, 12, 2, 2, '#ffffff');
    px(10, 13, 1, 1, '#20242c'); px(15, 13, 1, 1, '#20242c');
    px(10, 10, 2, 1, hairD); px(15, 10, 2, 1, hairD); // sobrancelhas
    if (happy) px(11, 17, 4, 1, '#ffffff');
    else if (sad) { px(11, 18, 4, 1, '#7a3b3b'); px(10, 17, 1, 1, '#7a3b3b'); px(15, 17, 1, 1, '#7a3b3b'); }
    else px(11, 17, 4, 1, '#8a4a3a');
    px(12, 15, 2, 1, skinD); // nariz

    // cabelo por estilo (versão retrato)
    switch (look.hairStyle) {
      case 'curto': px(6, 4, 14, 4, hair); px(6, 7, 2, 4, hair); px(18, 7, 2, 4, hair); px(6, 4, 14, 1, hairD); break;
      case 'raspado': px(7, 4, 12, 3, hair); px(7, 4, 12, 1, hairD); break;
      case 'moicano': px(11, 1, 4, 6, hair); px(11, 1, 4, 1, hairD); px(7, 5, 12, 2, hairD); break;
      case 'coque': px(6, 4, 14, 4, hair); px(10, 0, 6, 4, hair); px(10, 0, 6, 1, hairD); px(6, 7, 2, 3, hair); px(18, 7, 2, 3, hair); break;
      case 'rabo': px(6, 4, 14, 4, hair); px(6, 7, 2, 5, hair); px(18, 7, 2, 8, hair); px(19, 14, 2, 5, hair); break;
      case 'franja': px(6, 4, 14, 4, hair); px(6, 7, 5, 2, hair); px(15, 7, 5, 2, hairD); px(6, 7, 2, 5, hair); px(18, 7, 2, 5, hair); break;
      case 'cacheado': px(5, 2, 16, 6, hair); px(5, 2, 4, 2, hairD); px(16, 3, 4, 2, hairD); px(5, 7, 2, 5, hair); px(19, 7, 2, 5, hair); break;
      case 'trancas': px(6, 4, 14, 4, hair); px(5, 7, 2, 10, hair); px(19, 7, 2, 10, hair); px(5, 15, 2, 2, hairD); px(19, 15, 2, 2, hairD); break;
      default: px(6, 4, 14, 4, hair);
    }
    cache.set(key, c);
    return c;
  };

  /* =====================================================================
     PETECA — 3 frames de rotação, canvas 10x13
     Base de borracha + 4 penas brancas (estilo peteca brasileira).
     ===================================================================== */
  S.peteca = function (frame) {
    const key = 'peteca|' + frame;
    if (cache.has(key)) return cache.get(key);
    const c = mkCanvas(12, 14);
    const g = c.getContext('2d');
    const px = painter(g);
    const W = '#f7f7f2', Wd = '#cfcfc6', R = '#c0392b', Rd = '#8e2a1f', B = '#e8b04b';

    // penas (levemente diferentes por frame → sensação de giro)
    const sway = frame === 0 ? -1 : frame === 2 ? 1 : 0;
    px(5 + sway, 0, 2, 2, W);
    px(2 + sway, 1, 2, 3, W); px(8 + sway, 1, 2, 3, W);
    px(4 + sway, 1, 4, 4, W);
    px(2 + sway, 3, 8, 3, W);
    px(2 + sway, 5, 2, 1, Wd); px(8 + sway, 5, 2, 1, Wd);
    px(5 + sway, 2, 1, 4, Wd); // separação das penas
    px(3, 6, 6, 1, Wd);

    // amarração dourada
    px(4, 7, 4, 1, B);

    // base de borracha
    px(3, 8, 6, 3, R);
    px(2, 9, 8, 2, R);
    px(2, 10, 8, 2, Rd);
    px(3, 12, 6, 1, Rd);
    cache.set(key, c);
    return c;
  };

  /* =====================================================================
     TROFÉU — canvas 18x20
     ===================================================================== */
  S.trophy = function (tier) {
    const key = 'trophy|' + tier;
    if (cache.has(key)) return cache.get(key);
    const c = mkCanvas(18, 20);
    const g = c.getContext('2d');
    const px = painter(g);
    const gold = tier >= 8 ? '#ffd24a' : tier >= 4 ? '#d9d9d9' : '#d0894a';
    const goldD = shade(gold, -50);
    px(4, 2, 10, 6, gold);
    px(2, 2, 2, 4, gold); px(14, 2, 2, 4, gold);
    px(2, 5, 2, 1, goldD); px(14, 5, 2, 1, goldD);
    px(5, 8, 8, 2, gold);
    px(7, 10, 4, 3, goldD);
    px(5, 13, 8, 2, gold);
    px(4, 15, 10, 3, '#7a4a22');
    px(4, 17, 10, 1, shade('#7a4a22', -20));
    px(6, 3, 2, 3, '#ffffff'); // brilho
    cache.set(key, c);
    return c;
  };

  /* =====================================================================
     DESENHO ESCALADO (sem suavização)
     ===================================================================== */
  S.blit = function (ctx, sprite, x, y, scale, flip) {
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (flip) {
      ctx.translate(x + sprite.width * scale, y);
      ctx.scale(-scale, scale);
      ctx.drawImage(sprite, 0, 0);
    } else {
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.drawImage(sprite, 0, 0);
    }
    ctx.restore();
  };

  root.Sprites = S;
})(typeof window !== 'undefined' ? window : globalThis);
