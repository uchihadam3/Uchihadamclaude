// AudioEngine: sintetizador Web Audio — vozes musicais (pad, pluck de
// caixinha de música, baixo, sino, órgão, percussão de ruído e bigorna),
// reverb por convolução procedural, ~35 SFX e agendador de música com
// lookahead. Silencioso até o primeiro gesto (política de autoplay).
// Volumes vêm das configurações do perfil (musicVol/sfxVol).
(function () {
  var A = {
    ctx: null, master: null, musicGain: null, sfxGain: null,
    verb: null, verbGain: null, unlocked: false, pendingMusic: null,
    music: { key: null, events: null, dur: 0, startT: 0, idx: 0, timer: null, loop: true }
  };

  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function vols() {
    var s = RA.core.Save.get().settings;
    return { music: s.musicVol, sfx: s.sfxVol };
  }

  function ensure() {
    if (A.ctx) return true;
    try { A.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return false; }
    var c = A.ctx;
    A.master = c.createGain(); A.master.gain.value = 0.5; A.master.connect(c.destination);
    A.musicGain = c.createGain(); A.musicGain.gain.value = vols().music; A.musicGain.connect(A.master);
    A.sfxGain = c.createGain(); A.sfxGain.gain.value = vols().sfx; A.sfxGain.connect(A.master);
    A.verb = c.createConvolver();
    A.verb.buffer = impulse(2.6, 2.2);
    A.verbGain = c.createGain(); A.verbGain.gain.value = 0.38;
    A.verb.connect(A.verbGain); A.verbGain.connect(A.master);
    return true;
  }

  function impulse(dur, decay) {
    var c = A.ctx, len = Math.floor(c.sampleRate * dur);
    var buf = c.createBuffer(2, len, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  var noiseBuf = null;
  function noise() {
    if (noiseBuf) return noiseBuf;
    var c = A.ctx, len = c.sampleRate * 1.2;
    noiseBuf = c.createBuffer(1, len, c.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }

  // ---------------- vozes musicais ----------------
  var V = {};
  V.pad = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + Math.min(1.2, d * 0.3));
    g.gain.setValueAtTime(v, t + d * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 850;
    for (var k = 0; k < 2; k++) {
      var o = c.createOscillator(); o.type = 'triangle';
      o.frequency.value = f * (k ? 1.004 : 0.996);
      o.connect(lp); o.start(t); o.stop(t + d + 0.1);
    }
    lp.connect(g); g.connect(A.musicGain);
    var w = c.createGain(); w.gain.value = 0.55; g.connect(w); w.connect(A.verb);
  };
  V.pluck = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.5, Math.min(1.6, d * 2)));
    var o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
    var o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2;
    var g2 = c.createGain(); g2.gain.value = 0.35;
    o.connect(g); o2.connect(g2); g2.connect(g);
    o.start(t); o.stop(t + 2); o2.start(t); o2.stop(t + 2);
    g.connect(A.musicGain);
    var w = c.createGain(); w.gain.value = 0.5; g.connect(w); w.connect(A.verb);
  };
  V.bass = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + 0.02);
    g.gain.setValueAtTime(v * 0.8, t + d * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    var o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    var o2 = c.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = f;
    var g2 = c.createGain(); g2.gain.value = 0.18;
    var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 300;
    o.connect(g); o2.connect(g2); g2.connect(lp); lp.connect(g);
    o.start(t); o.stop(t + d + 0.05); o2.start(t); o2.stop(t + d + 0.05);
    g.connect(A.musicGain);
  };
  V.bell = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.min(2.4, d * 3));
    [1, 2.76, 5.4].forEach(function (m, i) {
      var o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f * m;
      var gg = c.createGain(); gg.gain.value = [1, 0.3, 0.12][i];
      o.connect(gg); gg.connect(g); o.start(t); o.stop(t + 2.6);
    });
    g.connect(A.musicGain);
    var w = c.createGain(); w.gain.value = 0.7; g.connect(w); w.connect(A.verb);
  };
  V.organ = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + 0.08);
    g.gain.setValueAtTime(v, t + d * 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    [1, 2, 3].forEach(function (m, i) {
      var o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f * m;
      var gg = c.createGain(); gg.gain.value = [1, 0.5, 0.25][i];
      o.connect(gg); gg.connect(g); o.start(t); o.stop(t + d + 0.1);
    });
    g.connect(A.musicGain);
    var w = c.createGain(); w.gain.value = 0.6; g.connect(w); w.connect(A.verb);
  };
  V.kick = function (t, f, d, v) {
    var c = A.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.12);
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g); g.connect(A.musicGain);
    o.start(t); o.stop(t + 0.25);
  };
  V.snare = function (t, f, d, v) {
    var c = A.ctx, s = c.createBufferSource(); s.buffer = noise();
    var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.8;
    var g = c.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    s.connect(bp); bp.connect(g); g.connect(A.musicGain);
    s.start(t); s.stop(t + 0.2);
  };
  V.hat = function (t, f, d, v) {
    var c = A.ctx, s = c.createBufferSource(); s.buffer = noise();
    var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    var g = c.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(hp); hp.connect(g); g.connect(A.musicGain);
    s.start(t); s.stop(t + 0.08);
  };
  V.tom = function (t, f, d, v) {
    var c = A.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f || 160, t);
    o.frequency.exponentialRampToValueAtTime((f || 160) * 0.55, t + 0.18);
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.connect(g); g.connect(A.musicGain);
    o.start(t); o.stop(t + 0.32);
  };
  V.anvil = function (t, f, d, v) {
    var c = A.ctx, g = c.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    [1123, 1719, 2333].forEach(function (fr) {
      var o = c.createOscillator(); o.type = 'square'; o.frequency.value = fr * (f ? f / 1000 : 1);
      var gg = c.createGain(); gg.gain.value = 0.12;
      o.connect(gg); gg.connect(g); o.start(t); o.stop(t + 0.45);
    });
    var s = c.createBufferSource(); s.buffer = noise();
    var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
    var gn = c.createGain(); gn.gain.setValueAtTime(v * 0.7, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    s.connect(hp); hp.connect(gn); gn.connect(A.musicGain);
    s.start(t); s.stop(t + 0.12);
    g.connect(A.musicGain);
    var w = c.createGain(); w.gain.value = 0.5; g.connect(w); w.connect(A.verb);
  };
  A.voices = V;
  A.midi = midi;

  // ---------------- agendador de música ----------------
  var HORIZON = 0.6, TICK = 170;
  function schedule() {
    var m = A.music;
    if (!m.events) return;
    var c = A.ctx, now = c.currentTime;
    while (true) {
      if (m.idx >= m.events.length) {
        if (!m.loop) { stopTimer(); return; }
        m.startT += m.dur; m.idx = 0;
      }
      var e = m.events[m.idx];
      var t = m.startT + e.t;
      if (t > now + HORIZON) break;
      if (t >= now - 0.05) {
        try { V[e.fn](Math.max(t, now + 0.001), e.f, e.d || 0.5, e.v * 0.9); } catch (err) {}
      }
      m.idx++;
    }
  }
  function stopTimer() {
    if (A.music.timer) { clearInterval(A.music.timer); A.music.timer = null; }
  }

  A.setMusic = function (key) {
    if (!A.unlocked) { A.pendingMusic = key; return; }
    if (A.music.key === key) return;
    stopTimer();
    A.music.key = key;
    if (!key) { A.music.events = null; return; }
    var theme = RA.audio.Themes.build(key);
    if (!theme) { A.music.events = null; return; }
    A.music.events = theme.events;
    A.music.dur = theme.dur;
    A.music.loop = theme.loop !== false;
    A.music.startT = A.ctx.currentTime + 0.12;
    A.music.idx = 0;
    A.music.timer = setInterval(schedule, TICK);
    schedule();
  };

  A.stinger = function (key) {
    // toca um tema curto sem loop, sem trocar a música de fundo persistente
    A.setMusicForce(key, false);
  };
  A.setMusicForce = function (key, loop) {
    if (!A.unlocked) { A.pendingMusic = key; return; }
    stopTimer();
    A.music.key = key;
    var theme = RA.audio.Themes.build(key);
    if (!theme) return;
    A.music.events = theme.events; A.music.dur = theme.dur;
    A.music.loop = loop === undefined ? (theme.loop !== false) : loop;
    A.music.startT = A.ctx.currentTime + 0.1; A.music.idx = 0;
    A.music.timer = setInterval(schedule, TICK);
    schedule();
  };

  A.unlock = function () {
    if (A.unlocked) return;
    if (!ensure()) return;
    if (A.ctx.state === 'suspended') A.ctx.resume();
    A.unlocked = true;
    if (A.pendingMusic) { var k = A.pendingMusic; A.pendingMusic = null; A.setMusic(k); }
  };

  A.applyVolumes = function () {
    if (!A.ctx) return;
    var v = vols();
    A.musicGain.gain.value = v.music;
    A.sfxGain.gain.value = v.sfx;
  };

  // ---------------- SFX ----------------
  function tone(t, type, f0, f1, dur, vol, dest) {
    var c = A.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || A.sfxGain);
    o.start(t); o.stop(t + dur + 0.05);
    return g;
  }
  function nz(t, hz, dur, vol, type) {
    var c = A.ctx, s = c.createBufferSource(); s.buffer = noise();
    var f = c.createBiquadFilter(); f.type = type || 'bandpass'; f.frequency.value = hz; f.Q.value = 1;
    var g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(A.sfxGain);
    s.start(t); s.stop(t + dur + 0.05);
  }

  var SFX = {
    click: function (t) { tone(t, 'square', 880, 660, 0.05, 0.12); },
    tooltip: function (t) { tone(t, 'sine', 660, 880, 0.07, 0.1); },
    confirm: function (t) { tone(t, 'square', 523, 784, 0.1, 0.15); tone(t + 0.07, 'square', 784, 1046, 0.12, 0.13); },
    diceRoll: function (t) {
      for (var i = 0; i < 7; i++) {
        var tt = t + i * 0.055 + Math.random() * 0.02;
        nz(tt, 900 + Math.random() * 1400, 0.045, 0.16, 'bandpass');
        tone(tt, 'triangle', 300 + Math.random() * 500, 200, 0.04, 0.06);
      }
    },
    diceHit: function (t) { nz(t, 500, 0.08, 0.28); tone(t, 'sine', 190, 90, 0.09, 0.22); },
    diceLock: function (t) { tone(t, 'square', 1200, 900, 0.04, 0.14); tone(t + 0.04, 'square', 700, 700, 0.05, 0.11); },
    reroll: function (t) { nz(t, 2500, 0.18, 0.14, 'highpass'); tone(t, 'sine', 500, 900, 0.15, 0.08); },
    rare: function (t) { [880, 1108, 1318, 1760].forEach(function (f, i) { tone(t + i * 0.06, 'sine', f, f, 0.3, 0.13); }); },
    crit: function (t) { tone(t, 'sawtooth', 200, 60, 0.18, 0.3); nz(t, 3000, 0.14, 0.24, 'highpass'); tone(t + 0.02, 'square', 1400, 400, 0.12, 0.14); },
    hit: function (t) { tone(t, 'triangle', 220, 90, 0.1, 0.24); nz(t, 800, 0.07, 0.18); },
    sword: function (t) { nz(t, 4200, 0.12, 0.2, 'highpass'); tone(t + 0.02, 'triangle', 330, 140, 0.1, 0.18); },
    arrow: function (t) { nz(t, 2000, 0.16, 0.13, 'bandpass'); tone(t + 0.1, 'triangle', 500, 180, 0.08, 0.16); },
    shield: function (t) { tone(t, 'sine', 340, 340, 0.16, 0.2); tone(t, 'sine', 510, 510, 0.16, 0.12); },
    block: function (t) { nz(t, 350, 0.1, 0.26, 'lowpass'); tone(t, 'square', 200, 160, 0.08, 0.14); },
    heal: function (t) { [523, 659, 784].forEach(function (f, i) { tone(t + i * 0.08, 'sine', f, f * 1.01, 0.35, 0.12); }); },
    poison: function (t) { tone(t, 'sine', 300, 140, 0.4, 0.13); nz(t + 0.05, 700, 0.3, 0.08); },
    fire: function (t) { nz(t, 1200, 0.35, 0.2, 'lowpass'); tone(t, 'sawtooth', 160, 90, 0.3, 0.1); },
    ice: function (t) { [1760, 1480, 2093].forEach(function (f, i) { tone(t + i * 0.05, 'sine', f, f * 0.98, 0.2, 0.1); }); nz(t, 5000, 0.15, 0.08, 'highpass'); },
    bolt: function (t) { nz(t, 3500, 0.1, 0.24, 'highpass'); tone(t, 'sawtooth', 1100, 200, 0.14, 0.16); },
    curse: function (t) { tone(t, 'sawtooth', 220, 110, 0.5, 0.12); tone(t + 0.05, 'sine', 233, 116, 0.5, 0.1); },
    summon: function (t) { tone(t, 'sine', 200, 600, 0.4, 0.12); tone(t + 0.1, 'triangle', 300, 900, 0.35, 0.1); },
    enemyDie: function (t) { tone(t, 'sawtooth', 300, 50, 0.35, 0.2); nz(t + 0.06, 400, 0.3, 0.16, 'lowpass'); },
    heroDown: function (t) { [392, 311, 233].forEach(function (f, i) { tone(t + i * 0.16, 'triangle', f, f * 0.97, 0.3, 0.16); }); },
    revive: function (t) { [392, 523, 659, 784].forEach(function (f, i) { tone(t + i * 0.09, 'sine', f, f, 0.4, 0.13); }); },
    buy: function (t) { tone(t, 'square', 1046, 1046, 0.06, 0.13); tone(t + 0.08, 'square', 1318, 1318, 0.1, 0.12); },
    gold: function (t) { tone(t, 'square', 1568, 1568, 0.05, 0.1); tone(t + 0.05, 'square', 2093, 2093, 0.08, 0.09); },
    chest: function (t) { tone(t, 'triangle', 260, 260, 0.1, 0.14); [784, 1046, 1318].forEach(function (f, i) { tone(t + 0.12 + i * 0.07, 'sine', f, f, 0.25, 0.11); }); },
    secret: function (t) { [659, 880, 1108, 1318, 1760].forEach(function (f, i) { tone(t + i * 0.09, 'sine', f, f, 0.4, 0.12); }); },
    bossAppear: function (t) { tone(t, 'sawtooth', 80, 55, 1.1, 0.22); tone(t + 0.1, 'sawtooth', 120, 82, 1.0, 0.14); nz(t, 200, 0.9, 0.12, 'lowpass'); },
    bossPhase: function (t) { tone(t, 'square', 220, 110, 0.4, 0.16); tone(t + 0.15, 'square', 165, 82, 0.5, 0.16); nz(t, 1500, 0.3, 0.12); },
    victory: function (t) { [523, 659, 784, 1046].forEach(function (f, i) { tone(t + i * 0.12, 'square', f, f, 0.3, 0.14); }); },
    defeat: function (t) { [440, 415, 392, 370].forEach(function (f, i) { tone(t + i * 0.22, 'triangle', f, f * 0.98, 0.4, 0.13); }); },
    fate: function (t) { tone(t, 'sine', 440, 880, 0.3, 0.12); tone(t + 0.12, 'sine', 660, 1320, 0.3, 0.1); nz(t + 0.2, 6000, 0.2, 0.07, 'highpass'); },
    achievement: function (t) { [784, 988, 1175, 1568].forEach(function (f, i) { tone(t + i * 0.08, 'square', f, f, 0.25, 0.11); }); },
    combo: function (t) { [660, 880, 1320].forEach(function (f, i) { tone(t + i * 0.05, 'square', f, f * 1.02, 0.15, 0.13); }); },
    swap: function (t) { tone(t, 'sine', 600, 300, 0.1, 0.1); tone(t + 0.08, 'sine', 300, 600, 0.1, 0.1); },
    crack: function (t) { nz(t, 2600, 0.09, 0.24, 'highpass'); tone(t, 'square', 900, 300, 0.07, 0.12); }
  };

  A.sfx = function (name) {
    if (!A.unlocked || !A.ctx) return;
    var fn = SFX[name];
    if (fn) { try { fn(A.ctx.currentTime + 0.001); } catch (e) {} }
  };

  RA.audio.Engine = A;
  RA.audio.sfx = A.sfx;
  RA.audio.setMusic = A.setMusic;
  RA.audio.stinger = A.stinger;
  RA.audio.unlock = A.unlock;
  RA.audio.applyVolumes = A.applyVolumes;
})();
