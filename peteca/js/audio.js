/* =========================================================================
   PETECA LEGENDS — audio.js
   Sons sintetizados via WebAudio: batidas, saque forte, rede, apito,
   torcida e quatro composições chiptune longas (menu, partida, final, treino),
   com baixo, melodia, pad harmônico e bateria — cada uma com ~8 seções
   (verso/refrão/ponte) antes de repetir, num agendador "look-ahead" preciso.
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
     MÚSICA — composições longas geradas por progressão de acordes.
     Cada faixa define uma tonalidade + escala + uma "forma" de 8 seções
     (verso/refrão/ponte). Cada seção gera baixo, melodia e um acorde de
     pad a partir da tríade da escala, garantindo que tudo soe afinado.
     Isso cria ~25-45s de música variada antes de repetir — bem mais longa
     e rica que um loop curto.
     ===================================================================== */
  const SCALES = {
    major:  [0, 2, 4, 5, 7, 9, 11],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    pentM:  [0, 2, 4, 7, 9],
  };

  function noteFreq(semi) { return 110 * Math.pow(2, semi / 12); }

  function scaleNote(rootSemi, scale, degree) {
    const len = scale.length;
    const oct = Math.floor(degree / len);
    const idx = ((degree % len) + len) % len;
    return rootSemi + scale[idx] + oct * 12;
  }

  /** Constrói uma seção de 16 passos (baixo + melodia + acorde) a partir do grau do acorde. */
  function buildSection(rootSemi, scale, degree, feel) {
    const chordRoot = scaleNote(rootSemi, scale, degree);
    const third = scaleNote(rootSemi, scale, degree + 2);
    const fifth = scaleNote(rootSemi, scale, degree + 4);
    const bass = new Array(16).fill(null);
    const lead = new Array(16).fill(null);

    bass[0] = chordRoot - 12;
    bass[8] = chordRoot - 12;
    bass[4] = fifth - 12;
    bass[12] = fifth - 12;
    if (feel !== 'bridge') { bass[6] = third - 12; bass[14] = chordRoot - 12; }
    if (feel === 'chorus') { bass[2] = chordRoot - 12; bass[10] = fifth - 12; }

    const tones = [chordRoot, third, fifth, third + 12, chordRoot + 12];
    const patterns = {
      verse:  [0, null, 1, null, 2, null, 1, null, 0, null, 2, null, 1, null, 0, null],
      chorus: [0, null, 1, 2, null, 3, 2, 1, 0, null, 1, 2, 4, 2, 1, 0],
      bridge: [0, null, null, 2, null, null, 1, null, 3, null, null, 2, null, 1, null, null],
    };
    const pat = patterns[feel] || patterns.verse;
    const octUp = feel === 'chorus' ? 12 : 0;
    pat.forEach((t, i) => { if (t !== null) lead[i] = tones[t] + octUp; });

    return { bass, lead, chord: [chordRoot, third, fifth], feel };
  }

  const DRUM_PATTERNS = {
    light:  { kick: [0], snare: [8], hat: [4, 12] },
    medium: { kick: [0, 8], snare: [4, 12], hat: [2, 6, 10, 14] },
    full:   { kick: [0, 6, 8, 14], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14] },
  };

  const TRACKS = {
    menu: {
      bpm: 108, swing: true, drumLevel: 'medium',
      root: 0, scale: 'major', leadType: 'triangle', bassType: 'triangle', padType: 'sine',
      form: [
        { deg: 0, feel: 'verse' }, { deg: 3, feel: 'verse' },
        { deg: 4, feel: 'chorus' }, { deg: 0, feel: 'chorus' },
        { deg: 5, feel: 'bridge' }, { deg: 3, feel: 'verse' },
        { deg: 4, feel: 'chorus' }, { deg: 0, feel: 'chorus' },
      ],
    },
    match: {
      bpm: 130, swing: false, drumLevel: 'full',
      root: -3, scale: 'dorian', leadType: 'square', bassType: 'triangle', padType: 'triangle',
      form: [
        { deg: 0, feel: 'verse' }, { deg: 0, feel: 'verse' },
        { deg: 3, feel: 'chorus' }, { deg: 4, feel: 'chorus' },
        { deg: 5, feel: 'verse' }, { deg: 3, feel: 'chorus' },
        { deg: 4, feel: 'chorus' }, { deg: 0, feel: 'chorus' },
      ],
    },
    final: {
      bpm: 146, swing: false, drumLevel: 'full',
      root: 2, scale: 'major', leadType: 'square', bassType: 'sawtooth', padType: 'triangle',
      form: [
        { deg: 0, feel: 'chorus' }, { deg: 5, feel: 'chorus' },
        { deg: 3, feel: 'chorus' }, { deg: 4, feel: 'chorus' },
        { deg: 0, feel: 'chorus' }, { deg: 3, feel: 'bridge' },
        { deg: 4, feel: 'chorus' }, { deg: 0, feel: 'chorus' },
      ],
    },
    train: {
      bpm: 84, swing: true, drumLevel: 'light',
      root: -5, scale: 'pentM', leadType: 'triangle', bassType: 'sine', padType: 'sine',
      form: [
        { deg: 0, feel: 'bridge' }, { deg: 3, feel: 'verse' },
        { deg: 4, feel: 'verse' }, { deg: 0, feel: 'bridge' },
        { deg: 5, feel: 'bridge' }, { deg: 3, feel: 'verse' },
        { deg: 4, feel: 'verse' }, { deg: 0, feel: 'bridge' },
      ],
    },
  };

  /* ---------- vozes musicais (tempo absoluto do relógio de áudio) ---------- */
  function mtoneAt(t0, freq, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + Math.min(0.02, dur * 0.25));
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g); g.connect(musicGain);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function mnoiseAt(t0, dur, vol, filterType, freq, q) {
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = filterType || 'bandpass'; f.frequency.value = freq || 1500;
    if (q) f.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(musicGain);
    src.start(t0);
  }
  function mkickAt(t0) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t0);
    o.frequency.exponentialRampToValueAtTime(46, t0 + 0.12);
    g.gain.setValueAtTime(0.5, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.16);
    o.connect(g); g.connect(musicGain);
    o.start(t0); o.stop(t0 + 0.18);
  }
  function msnareAt(t0) { mnoiseAt(t0, 0.1, 0.2, 'bandpass', 1800, 1); }
  function mhatAt(t0) { mnoiseAt(t0, 0.035, 0.08, 'highpass', 6000); }
  function padAt(t0, chordSemis, dur, type) {
    chordSemis.forEach((semi) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(noteFreq(semi + 12), t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.045, t0 + dur * 0.3);
      g.gain.linearRampToValueAtTime(0.0001, t0 + dur * 0.98);
      o.connect(g); g.connect(musicGain);
      o.start(t0); o.stop(t0 + dur + 0.02);
    });
  }

  function scheduleStep(i, sec, t0, cfg, stepDur, isSectionStart) {
    if (isSectionStart) padAt(t0, sec.chord, stepDur * 16, cfg.padType || 'sine');
    const b = sec.bass[i];
    if (b !== null && b !== undefined) mtoneAt(t0, noteFreq(b), stepDur * 0.92, cfg.bassType || 'triangle', 0.4);
    const l = sec.lead[i];
    if (l !== null && l !== undefined) {
      const dur = stepDur * (sec.feel === 'chorus' ? 0.85 : 0.62);
      const vol = sec.feel === 'chorus' ? 0.16 : 0.13;
      mtoneAt(t0, noteFreq(l), dur, cfg.leadType || 'square', vol);
    }
    const dp = DRUM_PATTERNS[cfg.drumLevel];
    if (dp.kick.includes(i)) mkickAt(t0);
    if (dp.snare.includes(i)) msnareAt(t0);
    if (dp.hat.includes(i)) mhatAt(t0);
  }

  /** Agendador "look-ahead": agenda ~150ms à frente para tempo preciso, sem depender de setInterval. */
  A.playMusic = function (trackId) {
    if (!ensure()) return;
    if (currentTrack === trackId && musicTimer) return;
    A.stopMusic();
    if (!opts.music) return;
    const cfg = TRACKS[trackId];
    if (!cfg) return;
    currentTrack = trackId;
    const stepDur = 60 / cfg.bpm / 2;
    const sections = cfg.form.map(f => buildSection(cfg.root, SCALES[cfg.scale], f.deg, f.feel));
    const totalSteps = sections.length * 16;
    let step = 0;
    let nextTime = ctx.currentTime + 0.06;
    const LOOKAHEAD = 0.15, INTERVAL = 30;
    function tick() {
      if (currentTrack !== trackId) return;
      while (nextTime < ctx.currentTime + LOOKAHEAD) {
        const local = step % totalSteps;
        const sIdx = Math.floor(local / 16), i = local % 16;
        const sec = sections[sIdx];
        const swingOff = cfg.swing && i % 2 === 1 ? stepDur * 0.15 : 0;
        scheduleStep(i, sec, nextTime + swingOff, cfg, stepDur, i === 0);
        nextTime += stepDur;
        step++;
      }
      musicTimer = setTimeout(tick, INTERVAL);
    }
    tick();
  };

  A.stopMusic = function () {
    if (musicTimer) { clearTimeout(musicTimer); musicTimer = null; }
    currentTrack = null;
  };

  root.Audio2 = A;
})(typeof window !== 'undefined' ? window : globalThis);
