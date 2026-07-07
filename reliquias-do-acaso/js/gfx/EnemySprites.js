// EnemySprites: sprites de inimigos pintados por arquétipo (16 formas base).
// Cada ARQUÉTIPO tem paleta de identidade própria (goblin verde, demônio
// rubro, máquina metálica...) misturada com o tom da REGIÃO — assim um
// goblin nunca se confunde com uma besta, mas ambos "pertencem" ao bioma.
// Todos os sprites ganham CONTORNO escuro (leitura instantânea da silhueta).
// Tamanhos: comum 26, elite 34, chefe 48; 2 frames de idle.
(function () {
  var cache = {};

  function px(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }

  // mistura duas cores hex (t = peso da segunda)
  function mix(hexA, hexB, t) {
    function ch(hex, i) { return parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16); }
    var r = Math.round(ch(hexA, 0) * (1 - t) + ch(hexB, 0) * t);
    var g = Math.round(ch(hexA, 1) * (1 - t) + ch(hexB, 1) * t);
    var b = Math.round(ch(hexA, 2) * (1 - t) + ch(hexB, 2) * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // pal: {a: principal, b: sombra, c: destaque, d: detalhe, eye}
  var PAINTERS = {
    // goblin: corcunda, orelhas ENORMES, dentes tortos, barriga
    goblin: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.025);
      px(ctx, s * 0.3, s * 0.42 + b, s * 0.42, s * 0.34, pal.a);            // corpo corcunda
      px(ctx, s * 0.34, s * 0.56 + b, s * 0.34, s * 0.18, pal.c);           // barriga
      px(ctx, s * 0.26, s * 0.4 + b, s * 0.5, s * 0.08, pal.b);             // corcova
      px(ctx, s * 0.24, s * 0.14 + b, s * 0.52, s * 0.3, pal.a);            // cabeçona
      px(ctx, s * 0.02, s * 0.1 + b, s * 0.24, s * 0.09, pal.a);            // orelhas gigantes
      px(ctx, s * 0.74, s * 0.1 + b, s * 0.24, s * 0.09, pal.a);
      px(ctx, s * 0.02, s * 0.08 + b, s * 0.08, s * 0.06, pal.b);           // pontas
      px(ctx, s * 0.9, s * 0.08 + b, s * 0.08, s * 0.06, pal.b);
      px(ctx, s * 0.32, s * 0.22 + b, s * 0.09, s * 0.09, pal.eye);         // olhos grandes
      px(ctx, s * 0.58, s * 0.22 + b, s * 0.09, s * 0.09, pal.eye);
      px(ctx, s * 0.36, s * 0.36 + b, s * 0.28, s * 0.04, pal.d);           // sorriso
      px(ctx, s * 0.38, s * 0.38 + b, s * 0.05, s * 0.05, '#e8e0d0');       // dentes tortos
      px(ctx, s * 0.56, s * 0.38 + b, s * 0.05, s * 0.05, '#e8e0d0');
      px(ctx, s * 0.26, s * 0.76, s * 0.14, s * 0.16, pal.b);               // pés
      px(ctx, s * 0.6, s * 0.76, s * 0.14, s * 0.16, pal.b);
      if (decor === 'arco') { px(ctx, s * 0.84, s * 0.28 + b, s * 0.05, s * 0.42, '#8a6e3c'); px(ctx, s * 0.8, s * 0.28 + b, s * 0.04, s * 0.04, '#c8c0b0'); px(ctx, s * 0.8, s * 0.64 + b, s * 0.04, s * 0.04, '#c8c0b0'); }
      if (decor === 'escudo') { px(ctx, s * 0.0, s * 0.36 + b, s * 0.22, s * 0.32, '#8a94a8'); px(ctx, s * 0.04, s * 0.42 + b, s * 0.14, s * 0.2, '#5a6478'); }
      if (decor === 'coroa') { px(ctx, s * 0.3, s * 0.02 + b, s * 0.4, s * 0.1, '#c9a23a'); px(ctx, s * 0.32, s * -0.02 + b, s * 0.06, s * 0.08, '#ffd76a'); px(ctx, s * 0.47, s * -0.02 + b, s * 0.06, s * 0.08, '#ffd76a'); px(ctx, s * 0.62, s * -0.02 + b, s * 0.06, s * 0.08, '#ffd76a'); }
      if (decor === 'bomba') { px(ctx, s * 0.74, s * 0.5 + b, s * 0.2, s * 0.2, '#38304a'); px(ctx, s * 0.82, s * 0.42 + b, s * 0.04, s * 0.1, '#8a6e3c'); px(ctx, s * 0.8, s * 0.38 + b, s * 0.08, s * 0.06, '#ff8a3c'); }
      if (decor === 'cajado') { px(ctx, s * 0.86, s * 0.18 + b, s * 0.05, s * 0.54, '#6e5a3c'); px(ctx, s * 0.8, s * 0.08 + b, s * 0.16, s * 0.14, pal.eye); }
    },
    // humanoide: postura ereta, cinto, cabelo/queixo — claramente uma pessoa
    humanoide: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.32, s * 0.32 + b, s * 0.36, s * 0.4, pal.a);            // túnica
      px(ctx, s * 0.32, s * 0.52 + b, s * 0.36, s * 0.05, pal.d);           // cinto
      px(ctx, s * 0.46, s * 0.52 + b, s * 0.08, s * 0.05, '#c9a23a');       // fivela
      px(ctx, s * 0.36, s * 0.1 + b, s * 0.28, s * 0.22, '#c8a482');        // rosto
      px(ctx, s * 0.34, s * 0.06 + b, s * 0.32, s * 0.08, pal.b);           // cabelo
      px(ctx, s * 0.4, s * 0.17 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.54, s * 0.17 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.44, s * 0.26 + b, s * 0.12, s * 0.03, '#8a6a52');       // boca
      px(ctx, s * 0.2, s * 0.34 + b, s * 0.11, s * 0.28, pal.b);            // braços
      px(ctx, s * 0.69, s * 0.34 + b, s * 0.11, s * 0.28, pal.b);
      px(ctx, s * 0.35, s * 0.72, s * 0.11, s * 0.2, pal.b);                // pernas
      px(ctx, s * 0.54, s * 0.72, s * 0.11, s * 0.2, pal.b);
      if (decor === 'espada') { px(ctx, s * 0.8, s * 0.14 + b, s * 0.06, s * 0.46, '#c9d4e8'); px(ctx, s * 0.76, s * 0.56 + b, s * 0.14, s * 0.05, '#8a6e3c'); }
      if (decor === 'adaga') { px(ctx, s * 0.8, s * 0.36 + b, s * 0.05, s * 0.2, '#c9d4e8'); px(ctx, s * 0.78, s * 0.54 + b, s * 0.09, s * 0.04, '#8a6e3c'); }
      if (decor === 'mascara') { px(ctx, s * 0.34, s * 0.1 + b, s * 0.32, s * 0.16, '#e8e0d0'); px(ctx, s * 0.4, s * 0.14 + b, s * 0.05, s * 0.05, '#1a1420'); px(ctx, s * 0.55, s * 0.14 + b, s * 0.05, s * 0.05, '#1a1420'); px(ctx, s * 0.47, s * 0.2 + b, s * 0.06, s * 0.03, '#c9a23a'); }
      if (decor === 'capuz') { px(ctx, s * 0.3, s * 0.02 + b, s * 0.4, s * 0.14, pal.d); px(ctx, s * 0.28, s * 0.1 + b, s * 0.1, s * 0.22, pal.d); px(ctx, s * 0.62, s * 0.1 + b, s * 0.1, s * 0.22, pal.d); px(ctx, s * 0.38, s * 0.14 + b, s * 0.24, s * 0.1, '#0c0a14'); px(ctx, s * 0.41, s * 0.17 + b, s * 0.05, s * 0.05, pal.eye); px(ctx, s * 0.54, s * 0.17 + b, s * 0.05, s * 0.05, pal.eye); }
      if (decor === 'cajado') { px(ctx, s * 0.82, s * 0.12 + b, s * 0.05, s * 0.58, '#6e5a3c'); px(ctx, s * 0.77, s * 0.04 + b, s * 0.15, s * 0.13, pal.eye); }
    },
    // besta: quadrúpede arqueada, presas, espinhos no lombo, cauda erguida
    besta: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.03);
      px(ctx, s * 0.12, s * 0.42 + b, s * 0.58, s * 0.28, pal.a);           // corpo
      px(ctx, s * 0.12, s * 0.58 + b, s * 0.58, s * 0.12, pal.b);
      px(ctx, s * 0.2, s * 0.36 + b, s * 0.1, s * 0.08, pal.d);             // espinhos do lombo
      px(ctx, s * 0.34, s * 0.34 + b, s * 0.1, s * 0.08, pal.d);
      px(ctx, s * 0.48, s * 0.36 + b, s * 0.1, s * 0.08, pal.d);
      px(ctx, s * 0.6, s * 0.24 + b, s * 0.32, s * 0.26, pal.a);            // cabeça
      px(ctx, s * 0.7, s * 0.3 + b, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.84, s * 0.42 + b, s * 0.12, s * 0.07, pal.b);           // focinho
      px(ctx, s * 0.8, s * 0.48 + b, s * 0.05, s * 0.07, '#e8e0d0');        // PRESAS
      px(ctx, s * 0.89, s * 0.48 + b, s * 0.05, s * 0.07, '#e8e0d0');
      px(ctx, s * 0.6, s * 0.16 + b, s * 0.08, s * 0.1, pal.b);             // orelha
      px(ctx, s * 0.16, s * 0.68, s * 0.1, s * 0.24, pal.b);                // patas
      px(ctx, s * 0.36, s * 0.7, s * 0.1, s * 0.22, pal.b);
      px(ctx, s * 0.56, s * 0.68, s * 0.1, s * 0.24, pal.b);
      px(ctx, s * 0.0, s * 0.3 - b, s * 0.14, s * 0.07, pal.a);             // cauda ERGUIDA
      px(ctx, s * 0.04, s * 0.38, s * 0.1, s * 0.07, pal.a);
      if (decor === 'osso') px(ctx, s * 0.28, s * 0.28 + b, s * 0.22, s * 0.06, '#e8e0d0');
    },
    // slime: gota gosmenta com núcleo pulsante e pingos
    slime: function (ctx, s, pal, f, decor) {
      var squish = f * s * 0.05;
      px(ctx, s * 0.16, s * 0.42 + squish, s * 0.68, s * 0.48 - squish, pal.a);
      px(ctx, s * 0.24, s * 0.3 + squish, s * 0.52, s * 0.18, pal.a);
      px(ctx, s * 0.16, s * 0.76, s * 0.68, s * 0.14, pal.b);
      px(ctx, s * 0.26, s * 0.34 + squish, s * 0.14, s * 0.1, '#ffffff'.replace('#ffffff', 'rgba(255,255,255,0.5)')); // brilho
      px(ctx, s * 0.42, s * 0.56 + squish, s * 0.18, s * 0.16, pal.d);      // NÚCLEO
      px(ctx, s * 0.46, s * 0.6 + squish, s * 0.1, s * 0.08, pal.c);
      px(ctx, s * 0.34, s * 0.46 + squish, s * 0.08, s * 0.09, pal.eye);
      px(ctx, s * 0.6, s * 0.46 + squish, s * 0.08, s * 0.09, pal.eye);
      px(ctx, s * 0.1, s * 0.66 + f * s * 0.06, s * 0.06, s * 0.1, pal.a);  // pingos
      px(ctx, s * 0.86, s * 0.58 + f * s * 0.08, s * 0.05, s * 0.09, pal.a);
      if (decor === 'lava') { px(ctx, s * 0.28, s * 0.64, s * 0.44, s * 0.07, '#ffd27a'); px(ctx, s * 0.36, s * 0.72, s * 0.28, s * 0.05, '#ff8a3c'); }
    },
    // planta: flor carnívora com pétalas e boca dentada
    planta: function (ctx, s, pal, f, decor) {
      var sway = f * s * 0.04;
      px(ctx, s * 0.45, s * 0.44, s * 0.1, s * 0.46, pal.b);                // caule
      px(ctx, s * 0.36, s * 0.6, s * 0.1, s * 0.06, pal.c);                 // folhinha no caule
      px(ctx, s * 0.22 + sway, s * 0.02, s * 0.14, s * 0.14, pal.d);        // PÉTALAS
      px(ctx, s * 0.64 + sway, s * 0.02, s * 0.14, s * 0.14, pal.d);
      px(ctx, s * 0.1 + sway, s * 0.18, s * 0.12, s * 0.14, pal.d);
      px(ctx, s * 0.78 + sway, s * 0.18, s * 0.12, s * 0.14, pal.d);
      px(ctx, s * 0.26 + sway, s * 0.1, s * 0.48, s * 0.34, pal.a);         // cabeça-flor
      px(ctx, s * 0.32 + sway, s * 0.3, s * 0.36, s * 0.1, '#1a0f18');      // BOCA aberta
      px(ctx, s * 0.34 + sway, s * 0.28, s * 0.06, s * 0.05, '#e8e0d0');    // dentes
      px(ctx, s * 0.46 + sway, s * 0.28, s * 0.06, s * 0.05, '#e8e0d0');
      px(ctx, s * 0.58 + sway, s * 0.28, s * 0.06, s * 0.05, '#e8e0d0');
      px(ctx, s * 0.36 + sway, s * 0.18, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.56 + sway, s * 0.18, s * 0.07, s * 0.07, pal.eye);
      px(ctx, s * 0.08, s * 0.78, s * 0.28, s * 0.1, pal.c);                // folhas base
      px(ctx, s * 0.64, s * 0.78, s * 0.28, s * 0.1, pal.c);
      if (decor === 'esporo') { px(ctx, s * 0.16, s * 0.0, s * 0.1, s * 0.1, pal.c); px(ctx, s * 0.74, s * 0.0, s * 0.09, s * 0.09, pal.c); px(ctx, s * 0.48, s * -0.02, s * 0.08, s * 0.08, pal.c); }
    },
    // inseto: antenas, 6 pernas, asas vibrando, abdômen listrado
    inseto: function (ctx, s, pal, f, decor) {
      var wob = f * s * 0.035;
      px(ctx, s * 0.34, s * 0.02 + wob, s * 0.04, s * 0.12, pal.d);         // ANTENAS
      px(ctx, s * 0.62, s * 0.02 + wob, s * 0.04, s * 0.12, pal.d);
      px(ctx, s * 0.3, s * 0.0 + wob, s * 0.06, s * 0.05, pal.c);
      px(ctx, s * 0.64, s * 0.0 + wob, s * 0.06, s * 0.05, pal.c);
      px(ctx, s * 0.36, s * 0.12 + wob, s * 0.28, s * 0.2, pal.b);          // cabeça
      px(ctx, s * 0.4, s * 0.17 + wob, s * 0.08, s * 0.08, pal.eye);        // olhões
      px(ctx, s * 0.53, s * 0.17 + wob, s * 0.08, s * 0.08, pal.eye);
      px(ctx, s * 0.3, s * 0.32 + wob, s * 0.4, s * 0.36, pal.a);           // tórax
      px(ctx, s * 0.32, s * 0.42 + wob, s * 0.36, s * 0.05, pal.d);         // listras
      px(ctx, s * 0.32, s * 0.52 + wob, s * 0.36, s * 0.05, pal.d);
      px(ctx, s * 0.04, s * 0.26 + wob * 2, s * 0.26, s * 0.12, pal.c);     // asas
      px(ctx, s * 0.7, s * 0.26 - wob * 2, s * 0.26, s * 0.12, pal.c);
      px(ctx, s * 0.08, s * 0.38 + wob * 2, s * 0.18, s * 0.08, pal.c);
      px(ctx, s * 0.74, s * 0.38 - wob * 2, s * 0.18, s * 0.08, pal.c);
      px(ctx, s * 0.24, s * 0.6, s * 0.06, s * 0.26, pal.b);                // 6 pernas
      px(ctx, s * 0.38, s * 0.66, s * 0.06, s * 0.24, pal.b);
      px(ctx, s * 0.56, s * 0.66, s * 0.06, s * 0.24, pal.b);
      px(ctx, s * 0.7, s * 0.6, s * 0.06, s * 0.26, pal.b);
      if (decor === 'ferrao') { px(ctx, s * 0.44, s * 0.68, s * 0.12, s * 0.14, pal.b); px(ctx, s * 0.47, s * 0.82, s * 0.06, s * 0.12, '#e8e0d0'); }
    },
    // esqueleto: caveira trincada, costelas vazadas, pélvis
    esqueleto: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.02);
      px(ctx, s * 0.34, s * 0.06 + b, s * 0.32, s * 0.26, '#e8e0d0');       // caveira
      px(ctx, s * 0.38, s * 0.28 + b, s * 0.24, s * 0.06, '#c8c0b0');       // mandíbula
      px(ctx, s * 0.4, s * 0.14 + b, s * 0.08, s * 0.09, pal.eye);          // órbitas
      px(ctx, s * 0.53, s * 0.14 + b, s * 0.08, s * 0.09, pal.eye);
      px(ctx, s * 0.6, s * 0.06 + b, s * 0.03, s * 0.1, '#a8a094');         // TRINCA
      px(ctx, s * 0.47, s * 0.24 + b, s * 0.06, s * 0.04, '#38304a');       // nariz
      px(ctx, s * 0.47, s * 0.34 + b, s * 0.06, s * 0.08, '#c8c0b0');       // pescoço
      px(ctx, s * 0.32, s * 0.42 + b, s * 0.36, s * 0.05, '#d8d0c0');       // costelas VAZADAS
      px(ctx, s * 0.34, s * 0.51 + b, s * 0.32, s * 0.05, '#d8d0c0');
      px(ctx, s * 0.36, s * 0.6 + b, s * 0.28, s * 0.05, '#d8d0c0');
      px(ctx, s * 0.47, s * 0.42 + b, s * 0.06, s * 0.23, '#e8e0d0');       // esterno
      px(ctx, s * 0.18, s * 0.4 + b, s * 0.09, s * 0.3, '#c8c0b0');         // braços
      px(ctx, s * 0.73, s * 0.4 + b, s * 0.09, s * 0.3, '#c8c0b0');
      px(ctx, s * 0.38, s * 0.68, s * 0.24, s * 0.08, '#d8d0c0');           // PÉLVIS
      px(ctx, s * 0.38, s * 0.76, s * 0.08, s * 0.16, '#c8c0b0');
      px(ctx, s * 0.55, s * 0.76, s * 0.08, s * 0.16, '#c8c0b0');
      if (decor === 'arco') px(ctx, s * 0.84, s * 0.28 + b, s * 0.05, s * 0.42, '#8a6e3c');
      if (decor === 'elmo') px(ctx, s * 0.3, s * 0.0 + b, s * 0.4, s * 0.12, '#8a94a8');
    },
    // fantasma: véu ondulante com brilho interno e rastro
    fantasma: function (ctx, s, pal, f, decor) {
      var fl = f * s * 0.05;
      ctx.globalAlpha = 0.4;
      px(ctx, s * 0.3, s * 0.24 + fl, s * 0.4, s * 0.5, pal.c);             // aura
      ctx.globalAlpha = 0.85;
      px(ctx, s * 0.26, s * 0.12 + fl, s * 0.48, s * 0.5, pal.a);           // véu
      px(ctx, s * 0.3, s * 0.06 + fl, s * 0.4, s * 0.1, pal.c);             // topo brilhante
      px(ctx, s * 0.24, s * 0.58 + fl, s * 0.12, s * 0.2, pal.a);           // caudas
      px(ctx, s * 0.42, s * 0.62 + fl, s * 0.14, s * 0.26, pal.a);
      px(ctx, s * 0.62, s * 0.58 + fl, s * 0.12, s * 0.16, pal.a);
      px(ctx, s * 0.36, s * 0.26 + fl, s * 0.09, s * 0.12, pal.eye);        // olhos fundos
      px(ctx, s * 0.55, s * 0.26 + fl, s * 0.09, s * 0.12, pal.eye);
      px(ctx, s * 0.42, s * 0.44 + fl, s * 0.16, s * 0.05, pal.b);          // boca aberta
      ctx.globalAlpha = 0.3;
      px(ctx, s * 0.18, s * 0.8, s * 0.1, s * 0.06, pal.a);                 // rastro
      px(ctx, s * 0.7, s * 0.84, s * 0.08, s * 0.05, pal.a);
      ctx.globalAlpha = 1;
    },
    // construto: golem maciço com runas acesas e juntas de pedra
    construto: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.015);
      px(ctx, s * 0.22, s * 0.3 + b, s * 0.56, s * 0.44, pal.a);            // torso
      px(ctx, s * 0.26, s * 0.34 + b, s * 0.48, s * 0.08, pal.c);           // ombreira
      px(ctx, s * 0.32, s * 0.06 + b, s * 0.36, s * 0.22, pal.b);           // cabeça baixa
      px(ctx, s * 0.38, s * 0.14 + b, s * 0.09, s * 0.05, pal.eye);         // olhos-fenda
      px(ctx, s * 0.54, s * 0.14 + b, s * 0.09, s * 0.05, pal.eye);
      px(ctx, s * 0.04, s * 0.3 + b, s * 0.18, s * 0.38, pal.b);            // braços ENORMES
      px(ctx, s * 0.78, s * 0.3 + b, s * 0.18, s * 0.38, pal.b);
      px(ctx, s * 0.04, s * 0.62 + b, s * 0.18, s * 0.1, pal.a);            // punhos
      px(ctx, s * 0.78, s * 0.62 + b, s * 0.18, s * 0.1, pal.a);
      px(ctx, s * 0.28, s * 0.74, s * 0.18, s * 0.18, pal.b);
      px(ctx, s * 0.54, s * 0.74, s * 0.18, s * 0.18, pal.b);
      px(ctx, s * 0.34, s * 0.46 + b, s * 0.06, s * 0.06, pal.eye);         // RUNAS acesas
      px(ctx, s * 0.46, s * 0.54 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.58, s * 0.46 + b, s * 0.06, s * 0.06, pal.eye);
      if (decor === 'nucleo') { px(ctx, s * 0.42, s * 0.44 + b, s * 0.16, s * 0.16, pal.eye); px(ctx, s * 0.46, s * 0.48 + b, s * 0.08, s * 0.08, '#fff'); }
    },
    // maquina: tanque com esteira, rebites, antena piscando
    maquina: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.01);
      px(ctx, s * 0.6, s * 0.02 + b, s * 0.04, s * 0.14, pal.d);            // antena
      px(ctx, s * 0.58, s * 0.0 + b, s * 0.08, s * 0.06, f ? pal.eye : pal.d); // luz PISCA
      px(ctx, s * 0.24, s * 0.16 + b, s * 0.52, s * 0.16, pal.b);           // torre
      px(ctx, s * 0.26, s * 0.32 + b, s * 0.48, s * 0.36, pal.a);           // chassi
      px(ctx, s * 0.4, s * 0.2 + b, s * 0.2, s * 0.09, pal.eye);            // VISOR
      px(ctx, s * 0.3, s * 0.38 + b, s * 0.05, s * 0.05, pal.d);            // rebites
      px(ctx, s * 0.65, s * 0.38 + b, s * 0.05, s * 0.05, pal.d);
      px(ctx, s * 0.3, s * 0.56 + b, s * 0.05, s * 0.05, pal.d);
      px(ctx, s * 0.65, s * 0.56 + b, s * 0.05, s * 0.05, pal.d);
      px(ctx, s * 0.02, s * 0.34 + b, s * 0.24, s * 0.12, pal.c);           // CANHÃO
      px(ctx, s * 0.0, s * 0.37 + b, s * 0.08, s * 0.06, '#0c0a14');
      px(ctx, s * 0.14, s * 0.7, s * 0.72, s * 0.12, pal.b);                // esteira
      px(ctx, s * 0.18, s * 0.82, s * 0.64, s * 0.08, pal.d);
      px(ctx, s * 0.2, s * 0.73, s * 0.06, s * 0.06, pal.d);                // elos
      px(ctx, s * 0.36, s * 0.73, s * 0.06, s * 0.06, pal.d);
      px(ctx, s * 0.52, s * 0.73, s * 0.06, s * 0.06, pal.d);
      px(ctx, s * 0.68, s * 0.73, s * 0.06, s * 0.06, pal.d);
      if (decor === 'chamine') { px(ctx, s * 0.62, s * 0.06 + b, s * 0.12, s * 0.14, pal.b); px(ctx, s * 0.6, s * 0.0 + b, s * 0.16, s * 0.07, '#8a8a94'); }
    },
    // serpente: corpo enrolado em S, capuz de naja, chocalho
    serpente: function (ctx, s, pal, f, decor) {
      var w = f * s * 0.035;
      px(ctx, s * 0.08, s * 0.74 + w, s * 0.4, s * 0.14, pal.a);            // anel de baixo
      px(ctx, s * 0.16, s * 0.78 + w, s * 0.24, s * 0.06, pal.c);
      px(ctx, s * 0.3, s * 0.58 - w, s * 0.38, s * 0.14, pal.a);            // anel do meio
      px(ctx, s * 0.38, s * 0.62 - w, s * 0.22, s * 0.06, pal.c);
      px(ctx, s * 0.5, s * 0.42 + w, s * 0.3, s * 0.14, pal.a);
      px(ctx, s * 0.52, s * 0.14, s * 0.4, s * 0.3, pal.b);                 // CAPUZ de naja
      px(ctx, s * 0.6, s * 0.2, s * 0.24, s * 0.2, pal.a);                  // cabeça
      px(ctx, s * 0.66, s * 0.24, s * 0.08, s * 0.08, pal.eye);
      px(ctx, s * 0.86, s * 0.3, s * 0.12, s * 0.04, '#e84a5a');            // LÍNGUA bifurcada
      px(ctx, s * 0.94, s * 0.26, s * 0.04, s * 0.04, '#e84a5a');
      px(ctx, s * 0.94, s * 0.34, s * 0.04, s * 0.04, '#e84a5a');
      px(ctx, s * 0.02, s * 0.68 + w, s * 0.08, s * 0.1, pal.d);            // chocalho
    },
    // ave: asas abertas, penacho, cauda em leque, garras
    ave: function (ctx, s, pal, f, decor) {
      var fl = f * s * 0.06;
      px(ctx, s * 0.0, s * 0.22 - fl, s * 0.34, s * 0.12, pal.c);           // asas ABERTAS
      px(ctx, s * 0.66, s * 0.22 + fl, s * 0.34, s * 0.12, pal.c);
      px(ctx, s * 0.06, s * 0.32 - fl, s * 0.26, s * 0.09, pal.a);
      px(ctx, s * 0.68, s * 0.32 + fl, s * 0.26, s * 0.09, pal.a);
      px(ctx, s * 0.34, s * 0.3, s * 0.32, s * 0.34, pal.a);                // corpo
      px(ctx, s * 0.38, s * 0.5, s * 0.24, s * 0.14, pal.c);                // peito
      px(ctx, s * 0.42, s * 0.1, s * 0.24, s * 0.22, pal.b);                // cabeça
      px(ctx, s * 0.46, s * 0.02, s * 0.06, s * 0.1, pal.d);                // PENACHO
      px(ctx, s * 0.54, s * 0.0, s * 0.05, s * 0.12, pal.d);
      px(ctx, s * 0.52, s * 0.16, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.66, s * 0.2, s * 0.14, s * 0.07, '#e8b84a');            // bico
      px(ctx, s * 0.3, s * 0.62, s * 0.12, s * 0.1, pal.b);                 // cauda em leque
      px(ctx, s * 0.22, s * 0.68, s * 0.12, s * 0.09, pal.b);
      px(ctx, s * 0.42, s * 0.64, s * 0.05, s * 0.18, '#e8b84a');           // garras
      px(ctx, s * 0.55, s * 0.64, s * 0.05, s * 0.18, '#e8b84a');
      px(ctx, s * 0.39, s * 0.8, s * 0.1, s * 0.05, '#e8b84a');
      px(ctx, s * 0.52, s * 0.8, s * 0.1, s * 0.05, '#e8b84a');
    },
    // marinho: polvo/criatura abissal com nadadeira, bolhas e ventosas
    marinho: function (ctx, s, pal, f, decor) {
      var w = f * s * 0.035;
      px(ctx, s * 0.18, s * 0.24 + w, s * 0.56, s * 0.44, pal.a);           // cabeçorra
      px(ctx, s * 0.24, s * 0.2 + w, s * 0.44, s * 0.1, pal.c);             // topo
      px(ctx, s * 0.28, s * 0.38 + w, s * 0.1, s * 0.11, pal.eye);          // olhos abissais
      px(ctx, s * 0.54, s * 0.38 + w, s * 0.1, s * 0.11, pal.eye);
      px(ctx, s * 0.3, s * 0.4 + w, s * 0.04, s * 0.05, '#0c0a14');
      px(ctx, s * 0.56, s * 0.4 + w, s * 0.04, s * 0.05, '#0c0a14');
      px(ctx, s * 0.74, s * 0.16 + w, s * 0.2, s * 0.14, pal.c);            // NADADEIRA
      px(ctx, s * 0.78, s * 0.3 + w, s * 0.16, s * 0.1, pal.b);
      px(ctx, s * 0.14, s * 0.66 - w, s * 0.1, s * 0.26, pal.b);            // tentáculos alternados
      px(ctx, s * 0.3, s * 0.68 + w, s * 0.1, s * 0.24, pal.b);
      px(ctx, s * 0.46, s * 0.68 - w, s * 0.1, s * 0.26, pal.b);
      px(ctx, s * 0.62, s * 0.66 + w, s * 0.1, s * 0.22, pal.b);
      px(ctx, s * 0.16, s * 0.76 - w, s * 0.05, s * 0.05, pal.c);           // ventosas
      px(ctx, s * 0.48, s * 0.78 - w, s * 0.05, s * 0.05, pal.c);
      px(ctx, s * 0.06, s * 0.16 - f * s * 0.05, s * 0.05, s * 0.05, 'rgba(180,220,240,0.6)'); // bolhas
      px(ctx, s * 0.1, s * 0.06 - f * s * 0.05, s * 0.04, s * 0.04, 'rgba(180,220,240,0.45)');
      if (decor === 'sino') { px(ctx, s * 0.3, s * 0.02 + w, s * 0.4, s * 0.22, '#8a6e2e'); px(ctx, s * 0.44, s * 0.22 + w, s * 0.12, s * 0.08, '#c9a23a'); }
    },
    // dado: cubo vivo com olho central, pips e bracinhos
    dado: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.025);
      px(ctx, s * 0.2, s * 0.22 + b, s * 0.6, s * 0.6, pal.a);              // cubo
      px(ctx, s * 0.2, s * 0.22 + b, s * 0.6, s * 0.1, pal.c);              // topo claro
      px(ctx, s * 0.2, s * 0.72 + b, s * 0.6, s * 0.1, pal.b);              // base escura
      px(ctx, s * 0.36, s * 0.4 + b, s * 0.28, s * 0.26, '#0c0a14');        // OLHO central
      px(ctx, s * 0.43, s * 0.46 + b, s * 0.14, s * 0.13, pal.eye);
      px(ctx, s * 0.47, s * 0.49 + b, s * 0.06, s * 0.06, '#0c0a14');       // pupila
      px(ctx, s * 0.26, s * 0.28 + b, s * 0.07, s * 0.07, pal.d);           // pips
      px(ctx, s * 0.68, s * 0.28 + b, s * 0.07, s * 0.07, pal.d);
      px(ctx, s * 0.26, s * 0.64 + b, s * 0.07, s * 0.07, pal.d);
      px(ctx, s * 0.68, s * 0.64 + b, s * 0.07, s * 0.07, pal.d);
      px(ctx, s * 0.08, s * 0.4 + b * 2, s * 0.12, s * 0.08, pal.b);        // bracinhos
      px(ctx, s * 0.8, s * 0.4 - b * 2, s * 0.12, s * 0.08, pal.b);
      px(ctx, s * 0.28, s * 0.84, s * 0.14, s * 0.1, pal.b);                // pezinhos
      px(ctx, s * 0.58, s * 0.84, s * 0.14, s * 0.1, pal.b);
    },
    // demonio: ASAS, chifres curvos, cauda de seta, brasa no peito
    demonio: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.025);
      px(ctx, s * 0.0, s * 0.24 - b, s * 0.2, s * 0.3, pal.d);              // ASAS abertas
      px(ctx, s * 0.8, s * 0.24 - b, s * 0.2, s * 0.3, pal.d);
      px(ctx, s * 0.06, s * 0.2 - b, s * 0.1, s * 0.1, pal.d);
      px(ctx, s * 0.84, s * 0.2 - b, s * 0.1, s * 0.1, pal.d);
      px(ctx, s * 0.3, s * 0.34 + b, s * 0.4, s * 0.4, pal.a);              // corpo
      px(ctx, s * 0.34, s * 0.1 + b, s * 0.32, s * 0.26, pal.b);            // cabeça
      px(ctx, s * 0.22, s * 0.0 + b, s * 0.08, s * 0.16, pal.c);            // CHIFRES curvos
      px(ctx, s * 0.28, s * -0.02 + b, s * 0.06, s * 0.08, pal.c);
      px(ctx, s * 0.7, s * 0.0 + b, s * 0.08, s * 0.16, pal.c);
      px(ctx, s * 0.66, s * -0.02 + b, s * 0.06, s * 0.08, pal.c);
      px(ctx, s * 0.39, s * 0.18 + b, s * 0.08, s * 0.07, pal.eye);
      px(ctx, s * 0.53, s * 0.18 + b, s * 0.08, s * 0.07, pal.eye);
      px(ctx, s * 0.42, s * 0.29 + b, s * 0.16, s * 0.03, '#0c0a14');       // boca
      px(ctx, s * 0.42, s * 0.46 + b, s * 0.16, s * 0.12, pal.eye);         // BRASA no peito
      px(ctx, s * 0.46, s * 0.49 + b, s * 0.08, s * 0.06, '#fff2c9');
      px(ctx, s * 0.34, s * 0.74, s * 0.12, s * 0.18, pal.b);
      px(ctx, s * 0.54, s * 0.74, s * 0.12, s * 0.18, pal.b);
      px(ctx, s * 0.72, s * 0.66 + b, s * 0.16, s * 0.05, pal.a);           // CAUDA
      px(ctx, s * 0.86, s * 0.6 + b, s * 0.08, s * 0.08, pal.c);            // ponta-seta
    },
    // marionete: travessão com fios, juntas esféricas, rosto pintado
    marionete: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.035);
      px(ctx, s * 0.2, s * 0.0, s * 0.6, s * 0.05, '#6e5a3c');              // TRAVESSÃO
      px(ctx, s * 0.28, s * 0.05, s * 0.03, s * 0.16 + b, '#c8c0b0');       // fios
      px(ctx, s * 0.48, s * 0.05, s * 0.03, s * 0.1 + b, '#c8c0b0');
      px(ctx, s * 0.68, s * 0.05, s * 0.03, s * 0.2 + b, '#c8c0b0');
      px(ctx, s * 0.34, s * 0.14 + b, s * 0.32, s * 0.24, pal.c);           // cabeça de madeira
      px(ctx, s * 0.4, s * 0.2 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.54, s * 0.2 + b, s * 0.06, s * 0.06, pal.eye);
      px(ctx, s * 0.38, s * 0.24 + b, s * 0.04, s * 0.04, '#e84a5a');       // bochechas pintadas
      px(ctx, s * 0.58, s * 0.24 + b, s * 0.04, s * 0.04, '#e84a5a');
      px(ctx, s * 0.44, s * 0.31 + b, s * 0.12, s * 0.03, pal.d);           // sorriso fixo
      px(ctx, s * 0.38, s * 0.42 + b, s * 0.24, s * 0.26, pal.a);           // torso
      px(ctx, s * 0.24, s * 0.44 + b, s * 0.08, s * 0.08, pal.c);           // JUNTAS esféricas
      px(ctx, s * 0.68, s * 0.44 + b, s * 0.08, s * 0.08, pal.c);
      px(ctx, s * 0.24, s * 0.54 + b, s * 0.07, s * 0.16, pal.b);           // braços soltos
      px(ctx, s * 0.69, s * 0.54 + b, s * 0.07, s * 0.16, pal.b);
      px(ctx, s * 0.4, s * 0.7, s * 0.07, s * 0.07, pal.c);                 // juntas dos joelhos
      px(ctx, s * 0.54, s * 0.7, s * 0.07, s * 0.07, pal.c);
      px(ctx, s * 0.4, s * 0.77, s * 0.07, s * 0.15, pal.b);
      px(ctx, s * 0.54, s * 0.77, s * 0.07, s * 0.15, pal.b);
    },
    // cavaleiro: armadura completa, capa, escudo e espadona
    cavaleiro: function (ctx, s, pal, f, decor) {
      var b = f * (s * 0.015);
      px(ctx, s * 0.24, s * 0.3 + b, s * 0.14, s * 0.44, pal.d);            // CAPA
      px(ctx, s * 0.22, s * 0.72, s * 0.16, s * 0.1, pal.d);
      px(ctx, s * 0.3, s * 0.3 + b, s * 0.4, s * 0.42, pal.a);              // peitoral
      px(ctx, s * 0.34, s * 0.36 + b, s * 0.32, s * 0.05, pal.c);           // friso
      px(ctx, s * 0.46, s * 0.44 + b, s * 0.08, s * 0.14, pal.c);           // brasão
      px(ctx, s * 0.32, s * 0.06 + b, s * 0.36, s * 0.26, pal.b);           // ELMO
      px(ctx, s * 0.36, s * 0.16 + b, s * 0.28, s * 0.05, pal.eye);         // fresta acesa
      px(ctx, s * 0.44, s * 0.0 + b, s * 0.12, s * 0.08, pal.d);            // pluma
      px(ctx, s * 0.5, s * -0.04 + b, s * 0.08, s * 0.07, pal.d);
      px(ctx, s * 0.18, s * 0.32 + b, s * 0.12, s * 0.3, pal.b);            // braços
      px(ctx, s * 0.7, s * 0.32 + b, s * 0.12, s * 0.3, pal.b);
      px(ctx, s * 0.02, s * 0.34 + b, s * 0.18, s * 0.3, pal.c);            // ESCUDO
      px(ctx, s * 0.06, s * 0.4 + b, s * 0.1, s * 0.18, pal.a);
      px(ctx, s * 0.34, s * 0.72, s * 0.12, s * 0.2, pal.b);
      px(ctx, s * 0.54, s * 0.72, s * 0.12, s * 0.2, pal.b);
      px(ctx, s * 0.84, s * 0.08 + b, s * 0.06, s * 0.54, '#c9d4e8');       // espadona
      px(ctx, s * 0.8, s * 0.6 + b, s * 0.14, s * 0.05, '#8a6e3c');
    }
  };

  // paleta de IDENTIDADE por arquétipo (o que o torna inconfundível)
  var ARCH_PALS = {
    goblin: { a: '#5a8a34', b: '#3c6220', c: '#8ac85a', d: '#24400f' },
    humanoide: { a: '#6a5a8a', b: '#463a5e', c: '#9a8ab8', d: '#2c2440' },
    besta: { a: '#8a6a42', b: '#5e4629', c: '#b8946a', d: '#3c2c16' },
    slime: { a: '#42a86a', b: '#2a7a4a', c: '#7ae8a0', d: '#14522e' },
    planta: { a: '#3c8a4a', b: '#26602f', c: '#7ac86a', d: '#c8586a' },
    inseto: { a: '#7a6a2e', b: '#54481c', c: '#c8b45a', d: '#32280e' },
    esqueleto: { a: '#c8c0b0', b: '#8a8478', c: '#e8e0d0', d: '#5a544a' },
    fantasma: { a: '#6a9ab8', b: '#42688a', c: '#a8d4e8', d: '#2a4258' },
    construto: { a: '#8a7a68', b: '#5e5244', c: '#b8a88e', d: '#3a3228' },
    maquina: { a: '#7a8292', b: '#525a68', c: '#a8b4c4', d: '#323844' },
    serpente: { a: '#4a9a5a', b: '#2e6e3a', c: '#8ad87a', d: '#1a4220' },
    ave: { a: '#8a5a7a', b: '#5e3a52', c: '#c88ab0', d: '#3a2232' },
    marinho: { a: '#3a7a9a', b: '#245470', c: '#6ab8d8', d: '#122e42' },
    dado: { a: '#4a4258', b: '#2e2838', c: '#8a7ab0', d: '#e8e0d0' },
    demonio: { a: '#a03a3a', b: '#702424', c: '#e8724a', d: '#401414' },
    marionete: { a: '#a8825a', b: '#78583a', c: '#d8b48a', d: '#4a3420' },
    cavaleiro: { a: '#8a94a8', b: '#5a6478', c: '#c8d4e8', d: '#38404e' }
  };

  // paletas por região (agora só TEMPERAM a identidade do arquétipo)
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
      var painter = PAINTERS[archetype] || PAINTERS.humanoide;
      var reg = REGION_PALS[region] || REGION_PALS.estrada;
      var base = ARCH_PALS[archetype] || ARCH_PALS.humanoide;
      // identidade do arquétipo (70%) temperada pela região (30%)
      var pal = {
        a: mix(base.a, reg.a, 0.3),
        b: mix(base.b, reg.b, 0.3),
        c: mix(base.c, reg.c, 0.3),
        d: mix(base.d, reg.d, 0.3),
        eye: reg.eye
      };
      // 1) pinta o sprite num canvas próprio
      var spr = document.createElement('canvas');
      spr.width = size; spr.height = size;
      painter(spr.getContext('2d'), size, pal, frame, decor);
      // 2) silhueta escura (contorno que separa o inimigo do fundo)
      var sil = document.createElement('canvas');
      sil.width = size; sil.height = size;
      var sctx = sil.getContext('2d');
      sctx.drawImage(spr, 0, 0);
      sctx.globalCompositeOperation = 'source-in';
      sctx.fillStyle = 'rgba(8,6,14,0.9)';
      sctx.fillRect(0, 0, size, size);
      // 3) composição final: contorno em 4 direções + sprite por cima
      var c = document.createElement('canvas');
      c.width = size; c.height = size;
      var ctx = c.getContext('2d');
      var o = Math.max(1, Math.round(size / 30));
      ctx.drawImage(sil, -o, 0); ctx.drawImage(sil, o, 0);
      ctx.drawImage(sil, 0, -o); ctx.drawImage(sil, 0, o);
      ctx.drawImage(spr, 0, 0);
      cache[key] = c;
    }
    return cache[key];
  }

  RA.gfx.EnemySprites = { get: get, PALS: REGION_PALS, ARCHETYPES: Object.keys(PAINTERS) };
})();
