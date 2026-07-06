// EnemySprites: sprites de inimigos pintados por arquétipo (16 formas base)
// com paleta da região e adereços. Tamanhos: comum 26, elite 34, chefe 48.
// Cada sprite tem 2 frames de idle (respiração) gerados juntos.
(function () {
  var cache = {};

  function px(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }

  // pal: {a: principal, b: sombra, c: destaque, d: detalhe, eye}
  var PAINTERS = {
    goblin: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.28, s * 0.34 + b, s * 0.44, s * 0.4, pal.a);            // corpo
      px(ctx, s * 0.28, s * 0.6 + b, s * 0.44, s * 0.14, pal.b);
      px(ctx, s * 0.22, s * 0.12 + b, s * 0.56, s * 0.3, pal.a);            // cabeça grande
      px(ctx, s * 0.06, s * 0.14 + b, s * 0.18, s * 0.1, pal.a);            // orelhas
      px(ctx, s * 0.76, s * 0.14 + b, s * 0.18, s * 0.1, pal.a);
      px(ctx, s * 0.34, s * 0.22 + b, s * 0.08, s * 0.08, pal.eye);         // olhos
      px(ctx, s * 0.58, s * 0.22 + b, s * 0.08, s * 0.08, pal.eye);
      px(ctx, s * 0.38, s * 0.36 + b, s * 0.24, s * 0.03, pal.d);           // sorriso
      px(ctx, s * 0.24, s * 0.74, s * 0.14, s * 0.16, pal.b);               // pés
      px(ctx, s * 0.6, s * 0.74, s * 0.14, s * 0.16, pal.b);
      if (decor === 'arco') { px(ctx, s * 0.82, s * 0.3 + b, s * 0.06, s * 0.4, '#8a6e3c'); }
      if (decor === 'escudo') { px(ctx, s * 0.02, s * 0.36 + b, s * 0.2, s * 0.3, '#8a94a8'); }
      if (decor === 'coroa') { px(ctx, s * 0.32, s * 0.02 + b, s * 0.36, s * 0.1, '#c9a23a'); }
      if (decor === 'bomba') { px(ctx, s * 0.76, s * 0.5 + b, s * 0.18, s * 0.18, '#38304a'); px(ctx, s * 0.84, s * 0.44 + b, s * 0.04, s * 0.08, '#ff8a3c'); }
      if (decor === 'cajado') { px(ctx, s * 0.84, s * 0.2 + b, s * 0.05, s * 0.5, '#6e5a3c'); px(ctx, s * 0.8, s * 0.12 + b, s * 0.14, s * 0.12, pal.c); }
    },
    humanoide: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.32, s * 0.3 + b, s * 0.36, s * 0.44, pal.a);
      px(ctx, s * 0.32, s * 0.58 + b, s * 0.36, s * 0.16, pal.b);
      px(ctx, s * 0.34, s * 0.08 + b, s * 0.32, s * 0.24, pal.c);           // cabeça
      px(ctx, s * 0.4, s * 0.16 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.54, s * 0.16 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.2, s * 0.32 + b, s * 0.12, s * 0.3, pal.b);             // braços
      px(ctx, s * 0.68, s * 0.32 + b, s * 0.12, s * 0.3, pal.b);
      px(ctx, s * 0.34, s * 0.74, s * 0.12, s * 0.18, pal.b);
      px(ctx, s * 0.54, s * 0.74, s * 0.12, s * 0.18, pal.b);
      if (decor === 'espada') px(ctx, s * 0.8, s * 0.18 + b, s * 0.06, s * 0.44, '#c9d4e8');
      if (decor === 'adaga') px(ctx, s * 0.8, s * 0.34 + b, s * 0.05, s * 0.24, '#c9d4e8');
      if (decor === 'mascara') { px(ctx, s * 0.36, s * 0.12 + b, s * 0.28, s * 0.14, '#e8e0d0'); px(ctx, s * 0.42, s * 0.16 + b, s * 0.04, s * 0.04, '#1a1420'); px(ctx, s * 0.56, s * 0.16 + b, s * 0.04, s * 0.04, '#1a1420'); }
      if (decor === 'capuz') { px(ctx, s * 0.3, s * 0.04 + b, s * 0.4, s * 0.14, pal.d); px(ctx, s * 0.28, s * 0.1 + b, s * 0.1, s * 0.2, pal.d); px(ctx, s * 0.62, s * 0.1 + b, s * 0.1, s * 0.2, pal.d); }
      if (decor === 'cajado') { px(ctx, s * 0.82, s * 0.14 + b, s * 0.05, s * 0.56, '#6e5a3c'); px(ctx, s * 0.78, s * 0.06 + b, s * 0.14, s * 0.12, pal.c); }
    },
    besta: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.025);
      px(ctx, s * 0.14, s * 0.4 + b, s * 0.6, s * 0.3, pal.a);              // corpo horizontal
      px(ctx, s * 0.14, s * 0.58 + b, s * 0.6, s * 0.12, pal.b);
      px(ctx, s * 0.62, s * 0.26 + b, s * 0.3, s * 0.26, pal.a);            // cabeça
      px(ctx, s * 0.72, s * 0.34 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.84, s * 0.44 + b, s * 0.1, s * 0.06, pal.d);            // focinho
      px(ctx, s * 0.64, s * 0.18 + b, s * 0.08, s * 0.1, pal.b);            // orelha
      px(ctx, s * 0.18, s * 0.68, s * 0.1, s * 0.22, pal.b);                // patas
      px(ctx, s * 0.4, s * 0.68, s * 0.1, s * 0.22, pal.b);
      px(ctx, s * 0.6, s * 0.68, s * 0.1, s * 0.22, pal.b);
      px(ctx, s * 0.02, s * 0.42 + b, s * 0.14, s * 0.08, pal.b);           // cauda
      if (decor === 'osso') px(ctx, s * 0.3, s * 0.3 + b, s * 0.2, s * 0.06, '#e8e0d0');
    },
    slime: function (ctx, s, pal, f, decor) {
      var squish = f * s * 0.04;
      px(ctx, s * 0.18, s * 0.4 + squish, s * 0.64, s * 0.5 - squish, pal.a);
      px(ctx, s * 0.24, s * 0.3 + squish, s * 0.52, s * 0.16, pal.a);
      px(ctx, s * 0.18, s * 0.74, s * 0.64, s * 0.16, pal.b);
      px(ctx, s * 0.3, s * 0.34 + squish, s * 0.12, s * 0.12, pal.c);       // brilho
      px(ctx, s * 0.36, s * 0.5 + squish, s * 0.08, s * 0.08, pal.eye);
      px(ctx, s * 0.58, s * 0.5 + squish, s * 0.08, s * 0.08, pal.eye);
      if (decor === 'lava') { px(ctx, s * 0.3, s * 0.62, s * 0.4, s * 0.08, '#ffd27a'); }
    },
    planta: function (ctx, s, pal, f, decor) {
      var sway = f * s * 0.03;
      px(ctx, s * 0.44, s * 0.4, s * 0.12, s * 0.5, pal.b);                 // caule
      px(ctx, s * 0.28 + sway, s * 0.14, s * 0.44, s * 0.32, pal.a);        // cabeça-flor
      px(ctx, s * 0.34 + sway, s * 0.28, s * 0.32, s * 0.1, pal.d);         // boca
      px(ctx, s * 0.36 + sway, s * 0.2, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.56 + sway, s * 0.2, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.1, s * 0.66, s * 0.26, s * 0.1, pal.c);                 // folhas
      px(ctx, s * 0.64, s * 0.66, s * 0.26, s * 0.1, pal.c);
      if (decor === 'esporo') { px(ctx, s * 0.2, s * 0.04, s * 0.12, s * 0.12, pal.c); px(ctx, s * 0.66, s * 0.02, s * 0.1, s * 0.1, pal.c); }
    },
    inseto: function (ctx, s, pal, f, decor) {
      var wob = f * s * 0.03;
      px(ctx, s * 0.3, s * 0.34 + wob, s * 0.4, s * 0.34, pal.a);           // tórax
      px(ctx, s * 0.36, s * 0.14 + wob, s * 0.28, s * 0.22, pal.b);         // cabeça
      px(ctx, s * 0.4, s * 0.2 + wob, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.54, s * 0.2 + wob, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.08, s * 0.28 + wob * 2, s * 0.24, s * 0.1, pal.c);      // asas
      px(ctx, s * 0.68, s * 0.28 - wob * 2, s * 0.24, s * 0.1, pal.c);
      px(ctx, s * 0.3, s * 0.66, s * 0.06, s * 0.2, pal.b);                 // pernas
      px(ctx, s * 0.46, s * 0.68, s * 0.06, s * 0.2, pal.b);
      px(ctx, s * 0.62, s * 0.66, s * 0.06, s * 0.2, pal.b);
      px(ctx, s * 0.42, s * 0.6 + wob, s * 0.16, s * 0.06, pal.d);          // listras
      if (decor === 'ferrao') px(ctx, s * 0.44, s * 0.86, s * 0.12, s * 0.1, '#e8e0d0');
    },
    esqueleto: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.34, s * 0.08 + b, s * 0.32, s * 0.26, '#e8e0d0');       // caveira
      px(ctx, s * 0.4, s * 0.16 + b, s * 0.07, s * 0.08, pal.eye);
      px(ctx, s * 0.54, s * 0.16 + b, s * 0.07, s * 0.08, pal.eye);
      px(ctx, s * 0.4, s * 0.28 + b, s * 0.2, s * 0.04, '#a8a094');
      px(ctx, s * 0.36, s * 0.38 + b, s * 0.28, s * 0.08, '#d8d0c0');       // costelas
      px(ctx, s * 0.38, s * 0.5 + b, s * 0.24, s * 0.06, '#d8d0c0');
      px(ctx, s * 0.4, s * 0.6 + b, s * 0.2, s * 0.05, '#d8d0c0');
      px(ctx, s * 0.2, s * 0.36 + b, s * 0.1, s * 0.3, '#c8c0b0');          // braços
      px(ctx, s * 0.7, s * 0.36 + b, s * 0.1, s * 0.3, '#c8c0b0');
      px(ctx, s * 0.36, s * 0.7, s * 0.09, s * 0.22, '#c8c0b0');
      px(ctx, s * 0.55, s * 0.7, s * 0.09, s * 0.22, '#c8c0b0');
      if (decor === 'arco') px(ctx, s * 0.82, s * 0.3 + b, s * 0.06, s * 0.4, '#8a6e3c');
      if (decor === 'elmo') px(ctx, s * 0.32, s * 0.02 + b, s * 0.36, s * 0.12, '#8a94a8');
    },
    fantasma: function (ctx, s, pal, f, decor) {
      var fl = f * s * 0.04;
      ctx.globalAlpha = 0.85;
      px(ctx, s * 0.26, s * 0.16 + fl, s * 0.48, s * 0.5, pal.a);
      px(ctx, s * 0.26, s * 0.6 + fl, s * 0.12, s * 0.16, pal.a);           // caudas
      px(ctx, s * 0.44, s * 0.62 + fl, s * 0.12, s * 0.2, pal.a);
      px(ctx, s * 0.62, s * 0.6 + fl, s * 0.12, s * 0.14, pal.a);
      px(ctx, s * 0.36, s * 0.3 + fl, s * 0.08, s * 0.1, pal.eye);
      px(ctx, s * 0.56, s * 0.3 + fl, s * 0.08, s * 0.1, pal.eye);
      ctx.globalAlpha = 1;
    },
    construto: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.015);
      px(ctx, s * 0.24, s * 0.3 + b, s * 0.52, s * 0.44, pal.a);            // torso pedra
      px(ctx, s * 0.3, s * 0.08 + b, s * 0.4, s * 0.24, pal.b);             // cabeça
      px(ctx, s * 0.38, s * 0.16 + b, s * 0.08, s * 0.06, pal.eye);
      px(ctx, s * 0.54, s * 0.16 + b, s * 0.08, s * 0.06, pal.eye);
      px(ctx, s * 0.08, s * 0.32 + b, s * 0.16, s * 0.34, pal.b);           // braços grossos
      px(ctx, s * 0.76, s * 0.32 + b, s * 0.16, s * 0.34, pal.b);
      px(ctx, s * 0.3, s * 0.74, s * 0.16, s * 0.18, pal.b);
      px(ctx, s * 0.54, s * 0.74, s * 0.16, s * 0.18, pal.b);
      px(ctx, s * 0.34, s * 0.42 + b, s * 0.32, s * 0.04, pal.d);           // fissuras
      px(ctx, s * 0.44, s * 0.52 + b, s * 0.04, s * 0.14, pal.d);
      if (decor === 'nucleo') px(ctx, s * 0.44, s * 0.44 + b, s * 0.12, s * 0.12, pal.c);
    },
    maquina: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.01);
      px(ctx, s * 0.26, s * 0.26 + b, s * 0.48, s * 0.44, pal.a);
      px(ctx, s * 0.34, s * 0.34 + b, s * 0.32, s * 0.2, pal.b);
      px(ctx, s * 0.42, s * 0.4 + b, s * 0.16, s * 0.08, pal.eye);          // visor
      px(ctx, s * 0.18, s * 0.7, s * 0.64, s * 0.1, pal.b);                 // esteira
      px(ctx, s * 0.2, s * 0.8, s * 0.6, s * 0.08, pal.d);
      px(ctx, s * 0.1, s * 0.34 + b, s * 0.16, s * 0.1, pal.c);             // canhão
      px(ctx, s * 0.02, s * 0.36 + b, s * 0.1, s * 0.06, pal.d);
      if (decor === 'chamine') { px(ctx, s * 0.6, s * 0.12 + b, s * 0.1, s * 0.16, pal.b); px(ctx, s * 0.58, s * 0.06 + b, s * 0.14, s * 0.06, '#8a8a94'); }
    },
    serpente: function (ctx, s, pal, f, decor) {
      var w = f * s * 0.03;
      px(ctx, s * 0.14, s * 0.66 + w, s * 0.3, s * 0.14, pal.a);
      px(ctx, s * 0.34, s * 0.52 - w, s * 0.3, s * 0.14, pal.a);
      px(ctx, s * 0.54, s * 0.38 + w, s * 0.26, s * 0.14, pal.a);
      px(ctx, s * 0.6, s * 0.16, s * 0.3, s * 0.24, pal.b);                 // cabeça
      px(ctx, s * 0.68, s * 0.22, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.82, s * 0.28, s * 0.1, s * 0.04, pal.d);                // língua
      px(ctx, s * 0.2, s * 0.7 + w, s * 0.08, s * 0.06, pal.c);             // padrões
      px(ctx, s * 0.42, s * 0.56 - w, s * 0.08, s * 0.06, pal.c);
    },
    ave: function (ctx, s, pal, f, decor) {
      var fl = f * s * 0.05;
      px(ctx, s * 0.34, s * 0.3, s * 0.32, s * 0.34, pal.a);                // corpo
      px(ctx, s * 0.44, s * 0.14, s * 0.22, s * 0.2, pal.b);                // cabeça
      px(ctx, s * 0.52, s * 0.2, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.64, s * 0.24, s * 0.12, s * 0.06, '#e8b84a');           // bico
      px(ctx, s * 0.06, s * 0.26 - fl, s * 0.3, s * 0.14, pal.c);           // asas
      px(ctx, s * 0.64, s * 0.26 + fl, s * 0.3, s * 0.14, pal.c);
      px(ctx, s * 0.4, s * 0.64, s * 0.06, s * 0.16, '#e8b84a');
      px(ctx, s * 0.54, s * 0.64, s * 0.06, s * 0.16, '#e8b84a');
    },
    marinho: function (ctx, s, pal, f, decor) {
      var w = f * s * 0.03;
      px(ctx, s * 0.2, s * 0.3 + w, s * 0.52, s * 0.4, pal.a);              // corpo bulboso
      px(ctx, s * 0.3, s * 0.42 + w, s * 0.09, s * 0.09, pal.eye);
      px(ctx, s * 0.52, s * 0.42 + w, s * 0.09, s * 0.09, pal.eye);
      px(ctx, s * 0.16, s * 0.66, s * 0.1, s * 0.24, pal.b);                // tentáculos
      px(ctx, s * 0.32, s * 0.7, s * 0.1, s * 0.22, pal.b);
      px(ctx, s * 0.48, s * 0.7, s * 0.1, s * 0.24, pal.b);
      px(ctx, s * 0.64, s * 0.66, s * 0.1, s * 0.2, pal.b);
      px(ctx, s * 0.72, s * 0.24 + w, s * 0.16, s * 0.12, pal.c);           // barbatana
      if (decor === 'sino') { px(ctx, s * 0.34, s * 0.1 + w, s * 0.32, s * 0.2, '#8a6e2e'); }
    },
    dado: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      // um dado vivo — cubo com olho
      px(ctx, s * 0.22, s * 0.26 + b, s * 0.56, s * 0.56, pal.a);
      px(ctx, s * 0.22, s * 0.26 + b, s * 0.56, s * 0.08, pal.c);
      px(ctx, s * 0.22, s * 0.74 + b, s * 0.56, s * 0.08, pal.b);
      px(ctx, s * 0.38, s * 0.42 + b, s * 0.24, s * 0.22, '#1a1420');       // olho central
      px(ctx, s * 0.44, s * 0.48 + b, s * 0.12, s * 0.1, pal.eye);
      px(ctx, s * 0.28, s * 0.32 + b, s * 0.06, s * 0.06, pal.d);           // pips
      px(ctx, s * 0.66, s * 0.68 + b, s * 0.06, s * 0.06, pal.d);
      px(ctx, s * 0.28, s * 0.86, s * 0.12, s * 0.08, pal.b);               // pezinhos
      px(ctx, s * 0.6, s * 0.86, s * 0.12, s * 0.08, pal.b);
    },
    demonio: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.3, s * 0.32 + b, s * 0.4, s * 0.42, pal.a);
      px(ctx, s * 0.34, s * 0.1 + b, s * 0.32, s * 0.26, pal.b);
      px(ctx, s * 0.24, s * 0.02 + b, s * 0.08, s * 0.14, pal.d);           // chifres
      px(ctx, s * 0.68, s * 0.02 + b, s * 0.08, s * 0.14, pal.d);
      px(ctx, s * 0.4, s * 0.18 + b, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.54, s * 0.18 + b, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.16, s * 0.36 + b, s * 0.14, s * 0.28, pal.b);           // braços
      px(ctx, s * 0.7, s * 0.36 + b, s * 0.14, s * 0.28, pal.b);
      px(ctx, s * 0.34, s * 0.74, s * 0.12, s * 0.18, pal.b);
      px(ctx, s * 0.54, s * 0.74, s * 0.12, s * 0.18, pal.b);
      px(ctx, s * 0.42, s * 0.48 + b, s * 0.16, s * 0.1, pal.c);            // brasa no peito
    },
    marionete: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.03);
      px(ctx, s * 0.46, 0, s * 0.03, s * 0.16, '#c8c0b0');                  // fios
      px(ctx, s * 0.3, 0, s * 0.03, s * 0.3, '#c8c0b0');
      px(ctx, s * 0.66, 0, s * 0.03, s * 0.24, '#c8c0b0');
      px(ctx, s * 0.34, s * 0.16 + b, s * 0.32, s * 0.22, pal.c);           // cabeça boneco
      px(ctx, s * 0.4, s * 0.22 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.54, s * 0.22 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.42, s * 0.3 + b, s * 0.16, s * 0.03, pal.d);
      px(ctx, s * 0.36, s * 0.4 + b, s * 0.28, s * 0.3, pal.a);
      px(ctx, s * 0.24, s * 0.42 + b, s * 0.1, s * 0.24, pal.b);
      px(ctx, s * 0.66, s * 0.42 + b, s * 0.1, s * 0.24, pal.b);
      px(ctx, s * 0.38, s * 0.7, s * 0.09, s * 0.2, pal.b);
      px(ctx, s * 0.53, s * 0.7, s * 0.09, s * 0.2, pal.b);
    },
    cavaleiro: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.015);
      px(ctx, s * 0.3, s * 0.3 + b, s * 0.4, s * 0.42, pal.a);              // armadura
      px(ctx, s * 0.34, s * 0.36 + b, s * 0.32, s * 0.06, pal.c);
      px(ctx, s * 0.32, s * 0.08 + b, s * 0.36, s * 0.24, pal.b);           // elmo
      px(ctx, s * 0.36, s * 0.18 + b, s * 0.28, s * 0.05, pal.eye);         // fresta
      px(ctx, s * 0.28, s * 0.02 + b, s * 0.08, s * 0.1, pal.d);            // pluma
      px(ctx, s * 0.18, s * 0.34 + b, s * 0.12, s * 0.3, pal.b);
      px(ctx, s * 0.7, s * 0.34 + b, s * 0.12, s * 0.3, pal.b);
      px(ctx, s * 0.34, s * 0.72, s * 0.12, s * 0.2, pal.b);
      px(ctx, s * 0.54, s * 0.72, s * 0.12, s * 0.2, pal.b);
      px(ctx, s * 0.82, s * 0.14 + b, s * 0.06, s * 0.5, '#c9d4e8');        // espadona
    }
  };

  // paletas por região
  var REGION_PALS = {
    estrada: { a: '#6a8a3c', b: '#4a6428', c: '#8aa85a', d: '#38481c', eye: '#e8d84a' },
    floresta: { a: '#4a7a3c', b: '#2e5228', c: '#7ac86a', d: '#1c3818', eye: '#d8ff5c' },
    cripta: { a: '#8a8a99', b: '#5a5a68', c: '#b8b8c8', d: '#38384a', eye: '#7de8d8' },
    forja: { a: '#8a4a2e', b: '#5c2e1a', c: '#e8843c', d: '#38180c', eye: '#ffd27a' },
    mascaras: { a: '#5c4a6e', b: '#3a2e48', c: '#8a7a9d', d: '#241c30', eye: '#e84a5a' },
    deserto: { a: '#c8a45c', b: '#96763c', c: '#e8d8a0', d: '#6a5228', eye: '#4ac8e8' },
    mar: { a: '#2e6a8a', b: '#1c4a64', c: '#4aa8c8', d: '#102c40', eye: '#c8ff8a' },
    torre: { a: '#4a3a6e', b: '#2e2248', c: '#8a6ae8', d: '#1a1230', eye: '#ffd76a' }
  };

  function get(archetype, region, size, decor, frame) {
    var key = archetype + '_' + region + '_' + size + '_' + (decor || '') + '_' + frame;
    if (!cache[key]) {
      var c = document.createElement('canvas');
      c.width = size; c.height = size;
      var ctx = c.getContext('2d');
      var painter = PAINTERS[archetype] || PAINTERS.humanoide;
      var pal = REGION_PALS[region] || REGION_PALS.estrada;
      painter(ctx, size, pal, frame, decor);
      cache[key] = c;
    }
    return cache[key];
  }

  RA.gfx.EnemySprites = { get: get, PALS: REGION_PALS, ARCHETYPES: Object.keys(PAINTERS) };
})();
