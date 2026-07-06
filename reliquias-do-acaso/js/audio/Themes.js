// Themes: as 24 faixas do jogo, compostas por um renderizador generativo
// determinístico (seed = nome do tema). Cada tema é uma partitura de seções
// (acordes, melodia, bateria, baixo) renderizada numa lista de eventos
// {t, fn, f, d, v} consumida pelo agendador do AudioEngine.
(function () {
  var SC = {
    minor: [0, 2, 3, 5, 7, 8, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phryg: [0, 1, 3, 5, 7, 8, 10],
    harm: [0, 2, 3, 5, 7, 8, 11],
    major: [0, 2, 4, 5, 7, 9, 11],
    phrygDom: [0, 1, 4, 5, 7, 8, 10],
    whole: [0, 2, 4, 6, 8, 10]
  };

  // S(bars, prog, opts)
  function S(bars, prog, o) {
    var s = { bars: bars, prog: prog };
    if (o) Object.keys(o).forEach(function (k) { s[k] = o[k]; });
    return s;
  }

  // ---- especificação das 24 faixas ----
  // alvo: regiões/batalhas 140-180s; stingers curtos sem loop
  var THEMES = {
    // 1. Menu — misterioso e bonito
    menu: { bpm: 82, root: 57, scale: 'minor', sections: [
      S(8, [0, 5, 3, 4], { mel: 'sparse', pad: 0.16, bass: 'pulse', pluck: 0.13 }),
      S(8, [0, 5, 3, 4], { mel: 'motif', pad: 0.15, bass: 'pulse', pluck: 0.15, bell: 0.08 }),
      S(8, [3, 4, 0, 4], { mel: 'motif', pad: 0.17, bass: 'root4', pluck: 0.15, bell: 0.1 }),
      S(8, [5, 3, 4, 4], { mel: 'arp', pad: 0.15, bass: 'pulse', pluck: 0.12 }),
      S(8, [0, 5, 3, 4], { mel: 'sparse', pad: 0.16, bass: 'pulse', bell: 0.1 })
    ] },
    // 2. Seleção de heróis — calmo, estratégico
    selecao: { bpm: 92, root: 60, scale: 'dorian', sections: [
      S(8, [0, 3, 4, 3], { mel: 'arp', pad: 0.13, bass: 'pulse', pluck: 0.12 }),
      S(8, [5, 3, 0, 4], { mel: 'motif', pad: 0.13, bass: 'root4', pluck: 0.13, drums: 'h.h.h.h.', dv: 0.05 }),
      S(8, [0, 3, 4, 4], { mel: 'walk', pad: 0.12, bass: 'pulse', pluck: 0.12 }),
      S(8, [5, 4, 0, 0], { mel: 'sparse', pad: 0.14, bass: 'pulse', bell: 0.07 })
    ] },
    // 3. Estrada Quebrada — aventura sombria, percussão leve
    estrada: { bpm: 102, root: 50, scale: 'minor', sections: [
      S(8, [0, 0, 5, 4], { mel: 'motif', pad: 0.13, bass: 'root4', pluck: 0.14, drums: 'k..k..s.', dv: 0.16 }),
      S(8, [3, 4, 0, 4], { mel: 'motif', pad: 0.14, bass: 'root8', pluck: 0.15, drums: 'k..k..s.', hats: true, dv: 0.17 }),
      S(8, [5, 3, 4, 4], { mel: 'arp', pad: 0.13, bass: 'root4', pluck: 0.13, drums: 'k...s...', dv: 0.15 }),
      S(8, [0, 5, 3, 4], { mel: 'walk', pad: 0.14, bass: 'root8', pluck: 0.14, drums: 'k..k..s.', hats: true, dv: 0.17 }),
      S(8, [0, 4, 0, 0], { mel: 'sparse', pad: 0.15, bass: 'pulse', bell: 0.08 })
    ] },
    // 4. Floresta Podre — venenoso, orgânico, sombrio
    floresta: { bpm: 74, root: 52, scale: 'phryg', sections: [
      S(8, [0, 1, 0, 5], { mel: 'sparse', pad: 0.17, bass: 'pulse', bell: 0.07 }),
      S(8, [0, 1, 5, 4], { mel: 'motif', pad: 0.16, bass: 'pulse', pluck: 0.11, drums: '......t.', dv: 0.12 }),
      S(8, [3, 1, 0, 0], { mel: 'arp', pad: 0.16, bass: 'root4', pluck: 0.1, bell: 0.08 }),
      S(8, [0, 5, 1, 0], { mel: 'sparse', pad: 0.18, bass: 'pulse', bell: 0.09 })
    ] },
    // 5. Cripta dos Ossos — gótico, lento, grave (órgão)
    cripta: { bpm: 60, root: 49, scale: 'harm', sections: [
      S(6, [0, 3, 4, 0, 5, 4], { mel: 'none', organ: 0.14, bass: 'pulse' }),
      S(6, [0, 3, 4, 0, 5, 4], { mel: 'sparse', organ: 0.14, bass: 'pulse', bell: 0.09 }),
      S(6, [5, 4, 3, 4, 0, 0], { mel: 'motif', organ: 0.15, bass: 'root4', bell: 0.08 }),
      S(6, [0, 4, 0, 4, 0, 0], { mel: 'sparse', organ: 0.16, bass: 'pulse', bell: 0.1 })
    ] },
    // 6. Forja Infernal — industrial, percussivo (bigorna)
    forja: { bpm: 112, root: 48, scale: 'minor', sections: [
      S(8, [0, 0, 3, 0], { mel: 'none', pad: 0.1, bass: 'root8', drums: 'k.a.k.s.', dv: 0.18 }),
      S(8, [0, 3, 4, 0], { mel: 'motif', pad: 0.11, bass: 'root8', pluck: 0.11, drums: 'k.a.k.sa', hats: true, dv: 0.2 }),
      S(8, [5, 3, 0, 4], { mel: 'walk', pad: 0.12, bass: 'root8', drums: 'kaa.k.s.', dv: 0.2 }),
      S(8, [0, 0, 4, 4], { mel: 'motif', pad: 0.11, bass: 'root8', pluck: 0.12, drums: 'k.a.k.sa', hats: true, dv: 0.21 })
    ] },
    // 7. Cidade das Máscaras — valsa sombria (3/4)
    mascaras: { bpm: 88, root: 55, scale: 'harm', beats: 3, sections: [
      S(12, [0, 0, 3, 4], { mel: 'valsa', pad: 0.13, bass: 'oom', pluck: 0.14 }),
      S(12, [5, 3, 4, 0], { mel: 'valsa', pad: 0.14, bass: 'oom', pluck: 0.15, bell: 0.08 }),
      S(12, [3, 4, 5, 4], { mel: 'arp', pad: 0.13, bass: 'oom', pluck: 0.13 }),
      S(12, [0, 4, 0, 0], { mel: 'valsa', pad: 0.14, bass: 'oom', pluck: 0.15, bell: 0.09 })
    ] },
    // 8. Deserto de Vidro — exótico, seco
    deserto: { bpm: 86, root: 50, scale: 'phrygDom', sections: [
      S(8, [0, 1, 0, 1], { mel: 'motif', pad: 0.13, bass: 'pulse', pluck: 0.13, drums: '..t...t.', dv: 0.1 }),
      S(8, [0, 3, 1, 0], { mel: 'walk', pad: 0.13, bass: 'root4', pluck: 0.14, drums: 'k.t...t.', dv: 0.12 }),
      S(8, [5, 1, 0, 1], { mel: 'arp', pad: 0.14, bass: 'pulse', pluck: 0.12 }),
      S(8, [0, 1, 0, 0], { mel: 'sparse', pad: 0.15, bass: 'pulse', bell: 0.07 })
    ] },
    // 9. Mar Profundo — aquático e ameaçador
    mar: { bpm: 68, root: 47, scale: 'minor', sections: [
      S(6, [0, 3, 5, 4], { mel: 'sparse', pad: 0.18, bass: 'pulse', bell: 0.06 }),
      S(6, [0, 5, 3, 4], { mel: 'arp', pad: 0.17, bass: 'pulse', pluck: 0.09 }),
      S(6, [3, 4, 0, 5], { mel: 'sparse', pad: 0.18, bass: 'root4', bell: 0.08 }),
      S(6, [0, 4, 0, 0], { mel: 'motif', pad: 0.17, bass: 'pulse', pluck: 0.09, bell: 0.07 })
    ] },
    // 10. Torre do Dado Negro — final, crescente, tenso
    torre: { bpm: 96, root: 53, scale: 'phryg', sections: [
      S(8, [0, 1, 0, 1], { mel: 'sparse', pad: 0.14, bass: 'pulse' }),
      S(8, [0, 1, 3, 1], { mel: 'motif', pad: 0.15, bass: 'root4', pluck: 0.11, drums: 'k.......', dv: 0.14 }),
      S(8, [0, 1, 4, 1], { mel: 'motif', pad: 0.16, bass: 'root8', pluck: 0.12, drums: 'k...s...', dv: 0.16 }),
      S(8, [5, 4, 1, 0], { mel: 'arp', pad: 0.16, bass: 'root8', drums: 'k..k s..', hats: true, dv: 0.18, bell: 0.09 }),
      S(8, [0, 1, 0, 0], { mel: 'sparse', pad: 0.18, bass: 'pulse', bell: 0.1 })
    ] },
    // 11. Batalha normal — ritmo tático
    batalha: { bpm: 120, root: 52, scale: 'minor', sections: [
      S(8, [0, 0, 3, 4], { mel: 'motif', pad: 0.11, bass: 'root8', pluck: 0.13, drums: 'k..ks..s', hats: true, dv: 0.17 }),
      S(8, [5, 3, 0, 4], { mel: 'arp', pad: 0.12, bass: 'root8', pluck: 0.12, drums: 'k..ks..s', hats: true, dv: 0.17 }),
      S(8, [0, 4, 5, 4], { mel: 'motif', pad: 0.12, bass: 'root8', pluck: 0.13, drums: 'k.k.s.k.', hats: true, dv: 0.18 }),
      S(8, [3, 4, 0, 0], { mel: 'walk', pad: 0.11, bass: 'root4', pluck: 0.12, drums: 'k...s...', dv: 0.15 })
    ] },
    // 12. Batalha elite — mais intensa
    elite: { bpm: 128, root: 52, scale: 'phryg', sections: [
      S(8, [0, 1, 0, 4], { mel: 'motif', pad: 0.12, bass: 'root8', pluck: 0.13, drums: 'k.k.s.ks', hats: true, dv: 0.19 }),
      S(8, [0, 1, 5, 4], { mel: 'arp', pad: 0.13, bass: 'root8', pluck: 0.13, drums: 'k.k.s.ks', hats: true, dv: 0.19 }),
      S(8, [3, 1, 4, 4], { mel: 'motif', pad: 0.13, bass: 'root8', pluck: 0.14, drums: 'kk..s.k.', hats: true, dv: 0.2 }),
      S(8, [0, 1, 0, 0], { mel: 'walk', pad: 0.12, bass: 'root8', drums: 'k...s...', dv: 0.16, bell: 0.08 })
    ] },
    // 13. Boss — épica e pesada
    boss: { bpm: 132, root: 50, scale: 'harm', sections: [
      S(8, [0, 0, 1, 0], { mel: 'motif', pad: 0.14, bass: 'root8', organ: 0.09, drums: 'k.k.s.k.', hats: true, dv: 0.2 }),
      S(8, [3, 4, 0, 4], { mel: 'arp', pad: 0.14, bass: 'root8', pluck: 0.13, drums: 'k.k.s.ks', hats: true, dv: 0.21 }),
      S(8, [5, 4, 3, 4], { mel: 'motif', pad: 0.15, bass: 'root8', organ: 0.1, drums: 'kk..s.k.', hats: true, dv: 0.21 }),
      S(8, [0, 4, 0, 4], { mel: 'walk', pad: 0.14, bass: 'root8', drums: 'k.k.s.k.', dv: 0.19, bell: 0.09 }),
      S(8, [0, 1, 0, 0], { mel: 'sparse', pad: 0.16, bass: 'pulse', organ: 0.11, bell: 0.1 })
    ] },
    // 14. Boss final — 3 minutos, dramática
    bossFinal: { bpm: 138, root: 48, scale: 'harm', target: 180, sections: [
      S(8, [0, 0, 1, 0], { mel: 'sparse', pad: 0.15, bass: 'pulse', organ: 0.1, drums: 'k.......', dv: 0.16 }),
      S(8, [0, 1, 0, 4], { mel: 'motif', pad: 0.15, bass: 'root8', organ: 0.1, drums: 'k.k.s.k.', hats: true, dv: 0.21 }),
      S(8, [3, 4, 5, 4], { mel: 'arp', pad: 0.15, bass: 'root8', pluck: 0.13, drums: 'k.k.s.ks', hats: true, dv: 0.22 }),
      S(8, [0, 1, 3, 4], { mel: 'motif', pad: 0.16, bass: 'root8', organ: 0.11, drums: 'kk.ks.k.', hats: true, dv: 0.22 }),
      S(8, [5, 4, 0, 1], { mel: 'walk', pad: 0.16, bass: 'root8', bell: 0.1, drums: 'k.k.s.k.', hats: true, dv: 0.21 }),
      S(8, [0, 1, 0, 0], { mel: 'motif', pad: 0.17, bass: 'root8', organ: 0.12, drums: 'k.k.s.ks', hats: true, dv: 0.23, bell: 0.1 }),
      S(6, [0, 0, 1, 0, 0, 0], { mel: 'sparse', pad: 0.18, bass: 'pulse', organ: 0.13, bell: 0.11 })
    ] },
    // 15. Boss secreto — estranha, quebrada (tons inteiros)
    bossSecreto: { bpm: 108, root: 54, scale: 'whole', sections: [
      S(8, [0, 2, 4, 1], { mel: 'arp', pad: 0.14, bass: 'pulse', pluck: 0.12, drums: 'k..t..s.', dv: 0.16 }),
      S(8, [3, 1, 5, 2], { mel: 'motif', pad: 0.14, bass: 'root4', bell: 0.1, drums: 'k.t.s.t.', dv: 0.17 }),
      S(8, [0, 4, 2, 0], { mel: 'walk', pad: 0.15, bass: 'pulse', pluck: 0.12, drums: '..k..s..', dv: 0.15 }),
      S(8, [1, 3, 5, 0], { mel: 'arp', pad: 0.15, bass: 'root4', bell: 0.11, drums: 'k.t.s.t.', dv: 0.17 })
    ] },
    // 16. Loja — curta, charmosa
    loja: { bpm: 98, root: 53, scale: 'major', sections: [
      S(8, [0, 3, 4, 0], { mel: 'motif', pad: 0.11, bass: 'oom2', pluck: 0.15 }),
      S(8, [5, 3, 4, 4], { mel: 'arp', pad: 0.11, bass: 'oom2', pluck: 0.14, bell: 0.08 }),
      S(8, [0, 4, 5, 0], { mel: 'walk', pad: 0.11, bass: 'oom2', pluck: 0.14 })
    ] },
    // 17. Evento misterioso — atmosférica
    evento: { bpm: 70, root: 55, scale: 'dorian', sections: [
      S(6, [0, 5, 0, 3], { mel: 'sparse', pad: 0.17, bass: 'pulse', bell: 0.08 }),
      S(6, [4, 3, 0, 5], { mel: 'sparse', pad: 0.17, bass: 'pulse', pluck: 0.08 }),
      S(6, [0, 3, 0, 0], { mel: 'motif', pad: 0.16, bass: 'pulse', bell: 0.09 })
    ] },
    // 18. Vitória — stinger
    vitoria: { bpm: 112, root: 60, scale: 'major', loop: false, sections: [
      S(3, [0, 3, 4], { mel: 'arp', pad: 0.15, bass: 'root4', pluck: 0.16, bell: 0.12, drums: 'k...s...', dv: 0.15 })
    ] },
    // 19. Derrota — melancólico, curto
    derrota: { bpm: 58, root: 57, scale: 'minor', loop: false, sections: [
      S(4, [0, 5, 3, 0], { mel: 'sparse', pad: 0.16, bass: 'pulse', bell: 0.08 })
    ] },
    // 20. Final bom
    finalBom: { bpm: 86, root: 50, scale: 'major', sections: [
      S(8, [0, 3, 4, 0], { mel: 'sparse', pad: 0.16, bass: 'pulse', bell: 0.09 }),
      S(8, [5, 3, 4, 4], { mel: 'motif', pad: 0.16, bass: 'root4', pluck: 0.13, bell: 0.09 }),
      S(8, [0, 4, 5, 3], { mel: 'arp', pad: 0.15, bass: 'root4', pluck: 0.13 }),
      S(8, [0, 3, 4, 0], { mel: 'sparse', pad: 0.17, bass: 'pulse', bell: 0.11 })
    ] },
    // 21. Final sombrio
    finalSombrio: { bpm: 64, root: 47, scale: 'phryg', sections: [
      S(6, [0, 1, 0, 1], { mel: 'sparse', pad: 0.18, bass: 'pulse', organ: 0.1 }),
      S(6, [3, 1, 0, 5], { mel: 'motif', pad: 0.18, bass: 'pulse', bell: 0.08 }),
      S(6, [0, 1, 0, 0], { mel: 'sparse', pad: 0.19, bass: 'pulse', organ: 0.12, bell: 0.09 })
    ] },
    // 22. Abismo Infinito
    abismo: { bpm: 80, root: 46, scale: 'whole', sections: [
      S(8, [0, 3, 1, 4], { mel: 'sparse', pad: 0.17, bass: 'pulse', bell: 0.07 }),
      S(8, [2, 5, 0, 1], { mel: 'arp', pad: 0.17, bass: 'root4', drums: '....t...', dv: 0.12 }),
      S(8, [4, 1, 3, 0], { mel: 'motif', pad: 0.18, bass: 'pulse', bell: 0.09, drums: 'k.....t.', dv: 0.13 }),
      S(8, [0, 2, 0, 0], { mel: 'sparse', pad: 0.19, bass: 'pulse', bell: 0.1 })
    ] },
    // 23. Boss Rush
    bossRush: { bpm: 135, root: 55, scale: 'minor', sections: [
      S(8, [0, 0, 5, 4], { mel: 'motif', pad: 0.12, bass: 'root8', pluck: 0.13, drums: 'k.k.s.k.', hats: true, dv: 0.2 }),
      S(8, [3, 4, 0, 4], { mel: 'arp', pad: 0.13, bass: 'root8', pluck: 0.13, drums: 'k.k.s.ks', hats: true, dv: 0.21 }),
      S(8, [5, 4, 3, 4], { mel: 'walk', pad: 0.13, bass: 'root8', drums: 'kk..s.k.', hats: true, dv: 0.2, bell: 0.08 }),
      S(8, [0, 4, 0, 0], { mel: 'motif', pad: 0.12, bass: 'root8', pluck: 0.14, drums: 'k.k.s.k.', hats: true, dv: 0.2 })
    ] },
    // 24. Jukebox / créditos
    jukebox: { bpm: 100, root: 60, scale: 'major', sections: [
      S(8, [0, 5, 3, 4], { mel: 'motif', pad: 0.13, bass: 'root4', pluck: 0.14 }),
      S(8, [0, 3, 4, 4], { mel: 'arp', pad: 0.13, bass: 'root4', pluck: 0.13, bell: 0.08, drums: 'h.h.h.h.', dv: 0.05 }),
      S(8, [5, 4, 0, 3], { mel: 'walk', pad: 0.13, bass: 'root4', pluck: 0.13 }),
      S(8, [0, 3, 4, 0], { mel: 'sparse', pad: 0.15, bass: 'pulse', bell: 0.1 })
    ] }
  };

  // ---- renderizador ----
  function scaleNote(scale, root, deg) {
    var n = scale.length;
    var oct = Math.floor(deg / n);
    var idx = ((deg % n) + n) % n;
    return root + oct * 12 + scale[idx];
  }
  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function build(key) {
    var spec = THEMES[key];
    if (!spec) return null;
    var rng = new RA.core.Rng(RA.core.hashStr('theme-' + key));
    var scale = SC[spec.scale];
    var beats = spec.beats || 4;
    var beatDur = 60 / spec.bpm;
    var barDur = beatDur * beats;
    var ev = [];
    var t = 0;

    // motivo do tema (memorável e fixo por seed)
    var motif = [];
    for (var mi = 0; mi < 5; mi++) motif.push(rng.int(0, 7) - 2);

    // expande as seções (com variação, pois o rng avança) até a duração alvo
    var target = spec.loop === false ? 0 : (spec.target || 145);
    var sections = spec.sections.slice();
    var estBar = beatDur * beats;
    var estOnce = 0;
    spec.sections.forEach(function (s2) { estOnce += s2.bars * estBar; });
    var passes = target > 0 ? Math.max(1, Math.ceil(target / estOnce)) : 1;
    for (var pz = 1; pz < passes; pz++) sections = sections.concat(spec.sections);

    var full = false;
    sections.forEach(function (sec, si) {
      if (full) return;
      for (var bar = 0; bar < sec.bars; bar++) {
        if (target > 0 && t >= target + 16) { full = true; break; }
        var deg = sec.prog[bar % sec.prog.length];
        var chordRoot = deg;
        var chord = [scaleNote(scale, spec.root, deg), scaleNote(scale, spec.root, deg + 2), scaleNote(scale, spec.root, deg + 4)];

        // pad / órgão: acorde do compasso
        if (sec.pad) chord.forEach(function (n, i) { ev.push({ t: t + i * 0.03, fn: 'pad', f: midi(n), d: barDur * 1.05, v: sec.pad * (i === 0 ? 1 : 0.8) }); });
        if (sec.organ) chord.forEach(function (n, i) { ev.push({ t: t, fn: 'organ', f: midi(n - 12), d: barDur, v: sec.organ * (i === 0 ? 1 : 0.6) }); });

        // baixo
        var bassN = midi(scaleNote(scale, spec.root, deg) - 24);
        if (sec.bass === 'root8') { for (var b8 = 0; b8 < beats * 2; b8++) if (b8 % 2 === 0 || rng.chance(0.4)) ev.push({ t: t + b8 * beatDur / 2, fn: 'bass', f: bassN, d: beatDur * 0.45, v: 0.2 }); }
        else if (sec.bass === 'root4') { for (var b4 = 0; b4 < beats; b4++) ev.push({ t: t + b4 * beatDur, fn: 'bass', f: bassN, d: beatDur * 0.9, v: 0.2 }); }
        else if (sec.bass === 'pulse') { ev.push({ t: t, fn: 'bass', f: bassN, d: barDur * 0.95, v: 0.2 }); }
        else if (sec.bass === 'oom') {
          ev.push({ t: t, fn: 'bass', f: bassN, d: beatDur * 0.9, v: 0.22 });
          for (var ob = 1; ob < beats; ob++) { ev.push({ t: t + ob * beatDur, fn: 'pluck', f: midi(chord[1]), d: beatDur * 0.4, v: 0.08 }); ev.push({ t: t + ob * beatDur, fn: 'pluck', f: midi(chord[2]), d: beatDur * 0.4, v: 0.07 }); }
        }
        else if (sec.bass === 'oom2') {
          ev.push({ t: t, fn: 'bass', f: bassN, d: beatDur * 0.8, v: 0.2 });
          ev.push({ t: t + 2 * beatDur, fn: 'bass', f: midi(scaleNote(scale, spec.root, deg + 4) - 24), d: beatDur * 0.8, v: 0.17 });
        }

        // melodia
        var melV = sec.pluck || 0;
        if (sec.mel === 'motif' && melV) {
          var varr = bar % 4 === 3 ? rng.int(-1, 1) : 0;
          for (var i = 0; i < motif.length; i++) {
            if (bar % 2 === 1 && i >= 3 && rng.chance(0.35)) continue;
            var n = scaleNote(scale, spec.root + 12, chordRoot + motif[i] + varr);
            ev.push({ t: t + i * beatDur * (beats / 5.2), fn: 'pluck', f: midi(n), d: beatDur * 0.6, v: melV });
          }
        } else if (sec.mel === 'arp' && melV) {
          var order = bar % 2 ? [0, 1, 2, 1, 0, 1, 2, 1] : [0, 1, 2, 0, 1, 2, 0, 1];
          for (var a = 0; a < beats * 2; a++) ev.push({ t: t + a * beatDur / 2, fn: 'pluck', f: midi(chord[order[a % order.length]] + 12), d: beatDur * 0.4, v: melV * 0.85 });
        } else if (sec.mel === 'walk' && melV) {
          var wdeg = chordRoot + rng.int(0, 2);
          for (var w = 0; w < beats; w++) {
            wdeg += rng.int(-1, 1);
            ev.push({ t: t + w * beatDur, fn: 'pluck', f: midi(scaleNote(scale, spec.root + 12, wdeg)), d: beatDur * 0.7, v: melV });
          }
        } else if (sec.mel === 'sparse') {
          var sv = (sec.bell || sec.pluck || 0.09);
          if (bar % 2 === 0) ev.push({ t: t + rng.int(0, 1) * beatDur, fn: sec.bell ? 'bell' : 'pluck', f: midi(chord[rng.int(0, 2)] + 12), d: barDur * 0.8, v: sv });
        } else if (sec.mel === 'valsa' && melV) {
          for (var v3 = 0; v3 < 3; v3++) {
            var vn = scaleNote(scale, spec.root + 12, chordRoot + motif[(bar + v3) % motif.length]);
            ev.push({ t: t + v3 * beatDur, fn: 'pluck', f: midi(vn), d: beatDur * 0.75, v: v3 === 0 ? melV : melV * 0.7 });
          }
        }

        // sinos decorativos
        if (sec.bell && sec.mel !== 'sparse' && bar % 4 === 2) {
          ev.push({ t: t + beatDur * rng.int(0, beats - 1), fn: 'bell', f: midi(chord[rng.int(0, 2)] + 24), d: barDur, v: sec.bell });
        }

        // bateria
        if (sec.drums) {
          var steps = sec.drums.length;
          for (var st2 = 0; st2 < steps; st2++) {
            var ch2 = sec.drums[st2];
            var tt = t + st2 * (barDur / steps);
            var dv = sec.dv || 0.15;
            if (ch2 === 'k') ev.push({ t: tt, fn: 'kick', f: 0, d: 0.2, v: dv });
            else if (ch2 === 's') ev.push({ t: tt, fn: 'snare', f: 0, d: 0.15, v: dv * 0.8 });
            else if (ch2 === 't') ev.push({ t: tt, fn: 'tom', f: 150 + (st2 % 3) * 40, d: 0.25, v: dv * 0.8 });
            else if (ch2 === 'a') ev.push({ t: tt, fn: 'anvil', f: 1000 + (st2 % 2) * 180, d: 0.3, v: dv * 0.55 });
          }
        }
        if (sec.hats) {
          for (var hh = 0; hh < beats * 2; hh++) ev.push({ t: t + hh * beatDur / 2 + beatDur / 4, fn: 'hat', f: 0, d: 0.04, v: (sec.dv || 0.14) * 0.35 });
        }
        t += barDur;
      }
    });

    ev.sort(function (a, b) { return a.t - b.t; });
    return { events: ev, dur: t, loop: spec.loop !== false };
  }

  RA.audio.Themes = { build: build, list: Object.keys(THEMES), specs: THEMES };
})();
