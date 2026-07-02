/* =========================================================================
   PETECA LEGENDS — audio.js
   Sons sintetizados via WebAudio: batidas, saque forte, rede, apito,
   torcida e três músicas chiptune (menu, partida/final, treino).
   ========================================================================= */
(function (root) {
  'use strict';

  const A = {};
  let ctx = null;
  let master = null;
  let musicGain = null, sfxGain = null;
  let musicTimer = null, crowdNode = null;
  let currentTrack = null;
  let opts = { volume: 0.7, music: true, sfx: true };

  A.setOptions = function (o) {
    opts = Object.assign(opts, o || {});
    if (master) master.gain.value = opts.volume;
    if (musicGain) musicGain.gain.value = opts.music ? 0.32 : 0;
    if (sfxGain) sfxGain.gain.value = opts.sfx ? 1 : 0;
    if (!opts.music && musicTimer) { A.stopMusic(); }
  };

  function ensure() {
    if (ctx) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = opts.volume; master.connect(ctx.destination);
      musicGain = ctx.createGain(); musicGain.gain.value = opts.music ? 0.32 : 0; musicGain.connect(master);
      sfxGain = ctx.createGain(); sfxGain.gain.value = opts.sfx ? 1 : 0; sfxGain.connect(master);
      return true;
    } catch (e) { return false; }
  }

  /** Deve ser chamado num gesto do usuário (clique) para liberar o áudio. */
  A.unlock = function () {
    if (!ensure()) return;
    if (ctx.state === 'suspended') ctx.resume();
  };

  /* =====================================================================
     SFX
     ===================================================================== */
  function tone(freq, dur, type, vol, when, slide) {
    if (!ensure() || !opts.sfx) return;
    const t0 = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
    g.gain.setValueAtTime(vol || 0.2, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g); g.connect(sfxGain);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  function noise(dur, vol, when, freq) {
    if (!ensure() || !opts.sfx) return;
    const t0 = ctx.currentTime + (when || 0);
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq || 1800;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol || 0.25, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(sfxGain);
    src.start(t0);
  }

  A.sfx = {
    hit()       { noise(0.06, 0.35, 0, 2500); tone(220, 0.06, 'triangle', 0.15); },
    smash()     { noise(0.1, 0.5, 0, 1800); tone(150, 0.12, 'sawtooth', 0.25, 0, -90); },
    serve()     { noise(0.08, 0.4, 0, 2200); tone(300, 0.08, 'triangle', 0.2, 0, -120); },
    net()       { noise(0.18, 0.3, 0, 700); tone(90, 0.2, 'sine', 0.2, 0, -40); },
    whistle()   { tone(2200, 0.35, 'square', 0.12); tone(2350, 0.35, 'square', 0.08); },
    point()     { tone(660, 0.09, 'square', 0.15); tone(880, 0.12, 'square', 0.15, 0.09); },
    lose()      { tone(330, 0.12, 'square', 0.13); tone(220, 0.18, 'square', 0.13, 0.11); },
    cheer()     { noise(0.7, 0.28, 0, 900); noise(0.5, 0.2, 0.15, 1200); },
    bigCheer()  { noise(1.2, 0.4, 0, 800); noise(0.9, 0.3, 0.25, 1100); tone(523, 0.15, 'square', 0.12, 0.1); tone(659, 0.15, 'square', 0.12, 0.25); tone(784, 0.3, 'square', 0.12, 0.4); },
    click()     { tone(700, 0.04, 'square', 0.08); },
    buy()       { tone(880, 0.07, 'square', 0.12); tone(1320, 0.1, 'square', 0.12, 0.07); },
    error()     { tone(180, 0.15, 'sawtooth', 0.12); },
    train()     { tone(440, 0.06, 'square', 0.1); tone(550, 0.08, 'square', 0.1, 0.06); },
    trophy()    { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'square', 0.14, i * 0.13)); },
  };

  /* =====================================================================
     TORCIDA AMBIENTE (loop leve durante a partida)
     ===================================================================== */
  A.startCrowd = function (intensity) {
    if (!ensure() || !opts.sfx) return;
    A.stopCrowd();
    const len = Math.floor(ctx.sampleRate * 2);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * 0.4 * (0.7 + 0.3 * Math.sin(i / 4000));
    }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
    const g = ctx.createGain(); g.gain.value = 0.05 + (intensity || 0.3) * 0.1;
    src.connect(f); f.connect(g); g.connect(sfxGain);
    src.start();
    crowdNode = { src, g };
  };
  A.stopCrowd = function () {
    if (crowdNode) { try { crowdNode.src.stop(); } catch (e) {} crowdNode = null; }
  };

  /* =====================================================================
     MÚSICA — sequenciador chiptune simples
     Cada faixa: { bpm, bass: [...], lead: [...], noiseBeat: bool }
     Notas em semitons relativos a A2 (110Hz); null = pausa.
     ===================================================================== */
  const TRACKS = {
    menu: {
      bpm: 112, swing: true,
      bass: [0, null, 7, null, 5, null, 7, null, 0, null, 7, null, 10, null, 7, 5],
      lead: [12, 15, 19, null, 17, 15, 12, null, 15, 17, 19, 22, 19, null, 17, 15],
      noiseBeat: true,
    },
    match: {
      bpm: 128, swing: false,
      bass: [0, 0, 12, 0, 5, 5, 17, 5, 7, 7, 19, 7, 5, 5, 17, 5],
      lead: [null, 12, null, 12, null, 17, 15, null, null, 19, null, 19, 22, 19, 17, 15],
      noiseBeat: true,
    },
    final: {
      bpm: 140, swing: false,
      bass: [0, 0, 0, 12, 8, 8, 8, 20, 10, 10, 10, 22, 7, 7, 19, 7],
      lead: [12, null, 15, 12, 20, null, 19, 15, 22, null, 20, 17, 19, 17, 15, 12],
      noiseBeat: true,
    },
    train: {
      bpm: 92, swing: true,
      bass: [0, null, null, null, 5, null, null, null, 7, null, null, null, 5, null, 3, null],
      lead: [12, null, 15, null, 17, null, 15, 12, null, null, 10, 12, null, null, null, null],
      noiseBeat: false,
    },
  };

  function noteFreq(semi) { return 110 * Math.pow(2, semi / 12); }

  A.playMusic = function (trackId) {
    if (!ensure()) return;
    if (currentTrack === trackId && musicTimer) return;
    A.stopMusic();
    if (!opts.music) return;
    const tr = TRACKS[trackId];
    if (!tr) return;
    currentTrack = trackId;
    let step = 0;
    const stepDur = 60 / tr.bpm / 2; // colcheias
    musicTimer = setInterval(() => {
      if (!opts.music) return;
      const i = step % 16;
      const t0 = 0;
      const sw = tr.swing && i % 2 === 1 ? stepDur * 0.12 : 0;
      const b = tr.bass[i];
      if (b !== null && b !== undefined) {
        mtone(noteFreq(b) / 2, stepDur * 0.9, 'triangle', 0.5, sw);
      }
      const l = tr.lead[i];
      if (l !== null && l !== undefined) {
        mtone(noteFreq(l) * 2, stepDur * 0.7, 'square', 0.16, sw);
      }
      if (tr.noiseBeat && (i % 4 === 2)) mnoise(0.04, 0.1, sw);
      step++;
    }, stepDur * 1000);
  };

  function mtone(freq, dur, type, vol, when) {
    const t0 = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g); g.connect(musicGain);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function mnoise(dur, vol, when) {
    const t0 = ctx.currentTime + (when || 0);
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(g); g.connect(musicGain);
    src.start(t0);
  }

  A.stopMusic = function () {
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    currentTrack = null;
  };

  root.Audio2 = A;
})(typeof window !== 'undefined' ? window : globalThis);
