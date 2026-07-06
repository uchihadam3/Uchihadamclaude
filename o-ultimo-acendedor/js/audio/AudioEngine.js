// AudioEngine: sintetizador Web Audio completo do jogo — vozes musicais
// (pads, plucks de caixinha de música, baixo, percussão de ruído), reverb por
// convolução gerada proceduralmente, biblioteca de SFX, e um agendador de
// música com lookahead que toca partituras longas compostas em código.
// Tudo é no-op silencioso até o primeiro gesto do usuário (política de
// autoplay dos navegadores).
(function () {
  var A = {
    ctx: null, master: null, musicGain: null, sfxGain: null,
    verb: null, verbGain: null, unlocked: false,
    music: { key: null, events: null, dur: 0, startT: 0, idx: 0, timer: null }
  };

  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function ensure() {
    if (A.ctx) return true;
    try { A.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return false; }
    var c = A.ctx;
    A.master = c.createGain(); A.master.gain.value = 0.5; A.master.connect(c.destination);
    A.musicGain = c.createGain(); A.musicGain.gain.value = 0.6; A.musicGain.connect(A.master);
    A.sfxGain = c.createGain(); A.sfxGain.gain.value = 0.85; A.sfxGain.connect(A.master);
    A.verb = c.createConvolver();
    A.verb.buffer = buildImpulse(2.8, 2.4);
    A.verbGain = c.createGain(); A.verbGain.gain.value = 0.4;
    A.verb.connect(A.verbGain); A.verbGain.connect(A.master);
    return true;
  }

  function buildImpulse(dur, decay) {
    var c = A.ctx, len = Math.floor(c.sampleRate * dur);
    var buf = c.createBuffer(2, len, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  var noiseBuf = null;
  function getNoise() {
    if (noiseBuf) return noiseBuf;
    var c = A.ctx, len = c.sampleRate * 1.2;
    noiseBuf = c.createBuffer(1, len, c.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }

  // ---------------- vozes musicais ----------------
  function padNote(t, freq, dur, vol) {
    var c = A.ctx;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(1.4, dur * 0.35));
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    var lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 900;
    for (var k = 0; k < 2; k++) {
      var o = c.createOscillator();
      o.type = 'triangle';
      o.frequency.value = freq * (k ? 1.003 : 0.997);
      o.connect(lp);
      o.start(t); o.stop(t + dur + 0.1);
    }
    lp.connect(g);
    g.connect(A.musicGain);
    var wet = c.createGain(); wet.gain.value = 0.5;
    g.connect(wet); wet.connect(A.verb);
  }

  function pluck(t, freq, vol) {
    var c = A.ctx;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    var o = c.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    var o2 = c.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = freq * 2.001;
    var g2 = c.createGain(); g2.gain.value = 0.3;
    o2.connect(g2); g2.connect(g);
    o.connect(g);
    g.connect(A.musicGain);
    var wet = c.createGain(); wet.gain.value = 0.7;
    g.connect(wet); wet.connect(A.verb);
    o.start(t); o.stop(t + 1.6);
    o2.start(t); o2.stop(t + 1.6);
  }

  function bassNote(t, freq, dur, vol) {
    var c = A.ctx;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.setValueAtTime(vol * 0.8, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    var o = c.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    var o2 = c.createOscillator();
    o2.type = 'sawtooth';
    o2.frequency.value = freq;
    var g2 = c.createGain(); g2.gain.value = 0.12;
    var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 300;
    o2.connect(g2); g2.connect(lp); lp.connect(g);
    o.connect(g);
    g.connect(A.musicGain);
    o.start(t); o.stop(t + dur + 0.05);
    o2.start(t); o2.stop(t + dur + 0.05);
  }

  function percHit(t, kind, vol) {
    var c = A.ctx;
    var src = c.createBufferSource();
    src.buffer = getNoise();
    var f = c.createBiquadFilter();
    var g = c.createGain();
    if (kind === 'kick') {
      var o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(120, t);
      o.frequency.exponentialRampToValueAtTime(38, t + 0.12);
      var og = c.createGain();
      og.gain.setValueAtTime(vol, t);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(og); og.connect(A.musicGain);
      o.start(t); o.stop(t + 0.25);
      return;
    }
    if (kind === 'snare') { f.type = 'bandpass'; f.frequency.value = 2100; f.Q.value = 0.8; }
    else { f.type = 'highpass'; f.frequency.value = 6500; } // hat
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === 'snare' ? 0.16 : 0.05));
    src.connect(f); f.connect(g); g.connect(A.musicGain);
    src.start(t); src.stop(t + 0.2);
  }

  // ---------------- partituras ----------------
  // Tema das Grutas: ~3:47 em Lá menor, 52 bpm. Estrutura A A' B C A'' A(coda):
  // pads em progressão lenta, motivo de caixinha de música, baixo profundo.
  function themeGrutas() {
    var ev = [];
    var beat = 60 / 52;
    var t = 0;
    var Am = [57, 60, 64], Em = [52, 55, 59], F = [53, 57, 60], G = [55, 59, 62],
      C = [48 + 12, 64, 67], Dm = [50, 53 + 12, 62], E = [52, 56, 59];
    // motivos (beat, midi) dentro de 8 beats
    var m1 = [[0, 76], [1, 72], [2, 69], [3.5, 71], [4, 72], [6, 76]];
    var m2 = [[0, 72], [1.5, 74], [3, 76], [4.5, 79], [6, 77], [7, 76]];
    var m3 = [[0, 81], [2, 79], [3, 76], [5, 74], [6, 72]];

    var sections = [
      { chords: [Am, Em, F, G], motifs: [m1, null, m1, null], layers: 1 },
      { chords: [Am, Em, F, G], motifs: [m1, m2, m1, m2], layers: 2 },
      { chords: [F, C, Dm, Am], motifs: [m2, m3, m2, m1], layers: 2 },
      { chords: [Dm, Am, Em, Am], motifs: [null, m1, null, null], layers: 0 },
      { chords: [Am, F, C, G], motifs: [m1, m2, m3, m2], layers: 3 },
      { chords: [Am, Em, F, E], motifs: [m1, null, m1, null], layers: 1 }
    ];

    sections.forEach(function (sec) {
      sec.chords.forEach(function (chord, ci) {
        var chordDur = beat * 8;
        // pad do acorde
        chord.forEach(function (n, ni) {
          ev.push({ t: t + ni * 0.06, fn: 'pad', freq: midi(n), dur: chordDur * 0.95, vol: 0.05 });
        });
        // baixo: fundamental duas oitavas abaixo
        ev.push({ t: t, fn: 'bass', freq: midi(chord[0] - 24), dur: chordDur * 0.9, vol: 0.16 });
        if (sec.layers >= 2) {
          ev.push({ t: t + beat * 4, fn: 'bass', freq: midi(chord[0] - 12), dur: beat * 3.5, vol: 0.07 });
        }
        // motivo
        var motif = sec.motifs[ci];
        if (motif) {
          motif.forEach(function (nt) {
            ev.push({ t: t + nt[0] * beat, fn: 'pluck', freq: midi(nt[1]), vol: 0.11 });
            if (sec.layers >= 3) {
              ev.push({ t: t + nt[0] * beat + beat * 0.5, fn: 'pluck', freq: midi(nt[1] + 12), vol: 0.035 });
            }
          });
        }
        // brilhos esparsos de caverna
        if (sec.layers >= 1 && ci % 2 === 1) {
          ev.push({ t: t + beat * (5 + (ci % 3)), fn: 'pluck', freq: midi(88 + (ci * 3) % 7), vol: 0.03 });
        }
        t += chordDur;
      });
    });

    return { events: ev, dur: t };
  }

  // Tema do Devorador: ~2:47 em Mi frígio, 138 bpm. Baixo ostinato em
  // colcheias, percussão, stabs e uma linha aguda urgente por seções.
  function themeChefe() {
    var ev = [];
    var beat = 60 / 138;
    var bar = beat * 4;
    var t = 0;
    var riff = [40, 40, 41, 40, 43, 40, 38, 41]; // colcheias por compasso
    var stab = [64, 67, 71];
    var lead1 = [[0, 76], [1, 77], [2, 76], [2.5, 74], [3, 71]];
    var lead2 = [[0, 79], [0.5, 77], [1, 76], [2, 77], [3, 79], [3.5, 80]];

    function riffBars(nBars, opts) {
      for (var b = 0; b < nBars; b++) {
        for (var e8 = 0; e8 < 8; e8++) {
          var noteT = t + e8 * beat * 0.5;
          var m = riff[e8] + (opts.riffUp && b % 4 === 3 ? 5 : 0);
          ev.push({ t: noteT, fn: 'bass', freq: midi(m), dur: beat * 0.42, vol: 0.17 });
          if (opts.hats) ev.push({ t: noteT, fn: 'perc', kind: 'hat', vol: e8 % 2 ? 0.03 : 0.05 });
        }
        ev.push({ t: t, fn: 'perc', kind: 'kick', vol: 0.5 });
        ev.push({ t: t + beat * 2, fn: 'perc', kind: 'kick', vol: 0.4 });
        ev.push({ t: t + beat * 1, fn: 'perc', kind: 'snare', vol: 0.18 });
        ev.push({ t: t + beat * 3, fn: 'perc', kind: 'snare', vol: 0.2 });
        if (opts.stabs && b % 2 === 1) {
          stab.forEach(function (n) {
            ev.push({ t: t + beat * 2.5, fn: 'pluck', freq: midi(n), vol: 0.08 });
          });
        }
        if (opts.lead && b % 4 < 2) {
          var ld = (b % 8 < 4) ? lead1 : lead2;
          ld.forEach(function (nt) {
            ev.push({ t: t + nt[0] * beat, fn: 'pluck', freq: midi(nt[1] + (opts.leadUp ? 12 : 0)), vol: 0.09 });
          });
        }
        t += bar;
      }
    }

    riffBars(8, { hats: false });                                   // intro
    riffBars(16, { hats: true, stabs: true });                      // A
    riffBars(16, { hats: true, stabs: true, lead: true });          // A'
    // ponte: meia-velocidade, pads sombrios
    for (var pb = 0; pb < 8; pb++) {
      var chord = pb % 2 ? [40, 46, 52] : [40, 45, 52];
      chord.forEach(function (n, ni) {
        ev.push({ t: t + ni * 0.05, fn: 'pad', freq: midi(n + 12), dur: bar * 0.95, vol: 0.06 });
      });
      ev.push({ t: t, fn: 'bass', freq: midi(28), dur: bar * 0.9, vol: 0.2 });
      ev.push({ t: t, fn: 'perc', kind: 'kick', vol: 0.5 });
      t += bar;
    }
    riffBars(16, { hats: true, stabs: true, lead: true, leadUp: true }); // A'' clímax
    // segunda ponte: só percussão e baixo em quintas, respiração tensa
    for (var pb2 = 0; pb2 < 8; pb2++) {
      ev.push({ t: t, fn: 'bass', freq: midi(pb2 % 2 ? 35 : 28), dur: bar * 0.85, vol: 0.2 });
      ev.push({ t: t, fn: 'perc', kind: 'kick', vol: 0.5 });
      ev.push({ t: t + beat * 3, fn: 'perc', kind: 'snare', vol: 0.22 });
      if (pb2 >= 4) {
        ev.push({ t: t + beat * 2, fn: 'pluck', freq: midi(64 + pb2), vol: 0.07 });
      }
      t += bar;
    }
    riffBars(16, { hats: true, stabs: true, lead: true });               // A''' retomada
    riffBars(8, { hats: true, stabs: true, riffUp: true });              // saída

    return { events: ev, dur: t };
  }

  var THEMES = { grutas: themeGrutas, chefe: themeChefe };
  var themeCache = {};

  function playEvent(ev, when) {
    if (ev.fn === 'pad') padNote(when, ev.freq, ev.dur, ev.vol);
    else if (ev.fn === 'pluck') pluck(when, ev.freq, ev.vol);
    else if (ev.fn === 'bass') bassNote(when, ev.freq, ev.dur, ev.vol);
    else if (ev.fn === 'perc') percHit(when, ev.kind, ev.vol);
  }

  function playMusic(key) {
    if (!A.unlocked || !ensure()) { A._pendingMusic = key; return; }
    if (A.music.key === key) return;
    stopMusic();
    if (!themeCache[key]) themeCache[key] = THEMES[key]();
    var theme = themeCache[key];
    A.music.key = key;
    A.music.events = theme.events;
    A.music.dur = theme.dur;
    A.music.startT = A.ctx.currentTime + 0.15;
    A.music.idx = 0;
    A.music.timer = setInterval(schedule, 180);
    schedule();
  }

  function schedule() {
    var m = A.music;
    if (!m.events) return;
    var now = A.ctx.currentTime;
    var horizon = now + 0.55;
    var guard = 0;
    while (guard++ < 400) {
      if (m.idx >= m.events.length) {         // loop
        m.startT += m.dur;
        m.idx = 0;
      }
      var ev = m.events[m.idx];
      var when = m.startT + ev.t;
      if (when > horizon) break;
      if (when >= now - 0.05) playEvent(ev, Math.max(when, now + 0.005));
      m.idx++;
    }
  }

  function stopMusic() {
    if (A.music.timer) clearInterval(A.music.timer);
    A.music.timer = null;
    A.music.key = null;
    A.music.events = null;
  }

  // ---------------- SFX ----------------
  function sfxNoise(t, dur, filterType, f0, f1, vol, q) {
    var c = A.ctx;
    var src = c.createBufferSource();
    src.buffer = getNoise();
    var f = c.createBiquadFilter();
    f.type = filterType; f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    var g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(A.sfxGain);
    src.start(t); src.stop(t + dur + 0.05);
  }

  function sfxTone(t, type, f0, f1, dur, vol, wet) {
    var c = A.ctx;
    var o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    var g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(A.sfxGain);
    if (wet) { var w = A.ctx.createGain(); w.gain.value = wet; g.connect(w); w.connect(A.verb); }
    o.start(t); o.stop(t + dur + 0.05);
  }

  var SFX = {
    swing0: function (t) { sfxNoise(t, 0.14, 'bandpass', 900, 2400, 0.24, 1.2); },
    swing1: function (t) { sfxNoise(t, 0.14, 'bandpass', 1300, 3200, 0.26, 1.2); },
    swing2: function (t) {
      sfxNoise(t, 0.2, 'bandpass', 700, 3800, 0.34, 1.1);
      sfxTone(t + 0.02, 'sine', 220, 440, 0.14, 0.1);
    },
    hit: function (t) {
      sfxTone(t, 'square', 320, 90, 0.08, 0.22);
      sfxNoise(t, 0.09, 'highpass', 2600, null, 0.18);
    },
    clank: function (t) {
      sfxTone(t, 'square', 1150, 900, 0.1, 0.16);
      sfxTone(t, 'square', 1730, 1500, 0.14, 0.1);
      sfxNoise(t, 0.06, 'highpass', 5000, null, 0.14);
    },
    pogo: function (t) { sfxTone(t, 'sine', 300, 620, 0.16, 0.2); },
    jump: function (t) { sfxNoise(t, 0.12, 'bandpass', 500, 1300, 0.12, 1); },
    doubleJump: function (t) {
      sfxNoise(t, 0.16, 'bandpass', 700, 2100, 0.15, 1);
      sfxTone(t + 0.02, 'triangle', 660, null, 0.12, 0.1, 0.5);
      sfxTone(t + 0.09, 'triangle', 990, null, 0.16, 0.1, 0.5);
    },
    dash: function (t) { sfxNoise(t, 0.18, 'bandpass', 2400, 500, 0.26, 0.8); },
    land: function (t) {
      sfxTone(t, 'sine', 140, 60, 0.1, 0.16);
      sfxNoise(t, 0.08, 'lowpass', 900, 300, 0.12);
    },
    hurt: function (t) {
      sfxTone(t, 'sawtooth', 220, 70, 0.28, 0.2);
      sfxNoise(t, 0.18, 'lowpass', 1200, 200, 0.2);
    },
    enemyDeath: function (t) {
      sfxTone(t, 'sine', 520, 130, 0.3, 0.16);
      sfxTone(t + 0.03, 'triangle', 1040, 1560, 0.24, 0.08, 0.7);
      sfxNoise(t, 0.2, 'bandpass', 1800, 3600, 0.12, 1);
    },
    lamp: function (t) {
      sfxNoise(t, 0.08, 'highpass', 3000, null, 0.1);
      sfxTone(t + 0.05, 'triangle', 523, null, 0.5, 0.12, 0.8);
      sfxTone(t + 0.12, 'triangle', 784, null, 0.6, 0.1, 0.8);
      sfxTone(t + 0.2, 'triangle', 1046, null, 0.8, 0.08, 0.8);
    },
    spit: function (t) { sfxTone(t, 'sine', 340, 180, 0.12, 0.12); sfxNoise(t, 0.08, 'lowpass', 1400, 500, 0.1); },
    splat: function (t) { sfxNoise(t, 0.12, 'lowpass', 1000, 250, 0.16); },
    roar: function (t) {
      sfxTone(t, 'sawtooth', 180, 55, 0.9, 0.22, 0.6);
      sfxTone(t + 0.05, 'sawtooth', 271, 82, 0.85, 0.14, 0.6);
      sfxNoise(t, 0.7, 'lowpass', 2000, 300, 0.2);
    },
    slam: function (t) {
      sfxTone(t, 'sine', 130, 34, 0.4, 0.34);
      sfxNoise(t, 0.3, 'lowpass', 1500, 120, 0.28);
    },
    respawn: function (t) { sfxTone(t, 'triangle', 392, null, 0.5, 0.1, 0.8); sfxTone(t + 0.12, 'triangle', 523, null, 0.6, 0.09, 0.8); }
  };

  // ---------------- API pública ----------------
  LK.audio = {
    init: function () {
      var unlock = function () {
        if (A.unlocked) return;
        A.unlocked = true;
        if (ensure()) {
          if (A.ctx.state === 'suspended') A.ctx.resume();
          if (A._pendingMusic) { var k = A._pendingMusic; A._pendingMusic = null; playMusic(k); }
        }
      };
      window.addEventListener('keydown', unlock);
      window.addEventListener('pointerdown', unlock);
      window.addEventListener('touchstart', unlock);
    },
    sfx: function (name) {
      if (!A.unlocked || !A.ctx) return;
      var fn = SFX[name];
      if (fn) fn(A.ctx.currentTime + 0.002);
    },
    playMusic: playMusic,
    stopMusic: stopMusic,
    state: A
  };
})();
