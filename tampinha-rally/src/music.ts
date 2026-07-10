// ---------------------------------------------------------------------------
// TRILHA SONORA — motor de música sequenciada (Web Audio) + 7 composições
// completas de 2–3 minutos, todas sintetizadas na hora (zero assets).
//
// · Cada música tem FORMA de verdade: intro → tema A → tema B → volta do A com
//   contracanto → ponte → tema B cheio … e só então repete. Nada de loopzinho.
// · O arranjo cresce ao longo da música (instrumentos entram e saem por seção).
// · Uma música para os MENUS (bossa calma) e uma por FAMÍLIA de cenário:
//   quintal/jardim = forró · praia/piscina = verão · calçada/laje = samba
//   cozinha = choro saltitante · deserto/estrada = baião do sertão · feira = frevo
// · Instrumentos: violão de nylon, cavaquinho, piano elétrico, sanfona, flauta,
//   guitarra "twang", metais — e a cozinha: surdo, zabumba, tamborim, agogô,
//   triângulo, chocalho, caixa, aro… com SWING (não é grade dura de metrônomo).
// ---------------------------------------------------------------------------
import { audioCtx, musicBus } from './audio';

// ------------------------------ notas & acordes ------------------------------
const NAME_PC: Record<string, number> = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const midiF = (m: number): number => 440 * Math.pow(2, (m - 69) / 12);
function noteMidi(tok: string): number {
  const m = /^([a-g])([#b]?)(\d)$/.exec(tok);
  if (!m) throw new Error('nota inválida: ' + tok);
  return 12 * (+m[3] + 1) + NAME_PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
}
const QUAL: Record<string, number[]> = {
  '': [0, 4, 7], m: [0, 3, 7], '7': [0, 4, 7, 10], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10], '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], '9': [0, 4, 10, 14],
  dim7: [0, 3, 6, 9], sus4: [0, 5, 7], '7sus4': [0, 5, 7, 10], add9: [0, 4, 7, 14],
};
interface Chord { rootPc: number; ints: number[]; comp: number[]; bass: number; }
export function parseChord(sym: string): Chord {
  const m = /^([A-G])([#b]?)(.*)$/.exec(sym);
  if (!m || QUAL[m[3]] == null) throw new Error('acorde inválido: ' + sym);
  const pc = NAME_PC[m[1].toLowerCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  const ints = QUAL[m[3]];
  // voicing do acompanhamento: notas encaixadas na região 57–72 (médio agradável)
  const comp = ints.map(i => { let n = pc + 60 + i; while (n > 72) n -= 12; while (n < 57) n += 12; return n; })
    .sort((a, b) => a - b).filter((n, i, arr) => arr.indexOf(n) === i);
  let bass = pc + 36; while (bass < 34) bass += 12; while (bass > 45) bass -= 12;
  return { rootPc: pc, ints, comp, bass };
}

// ---------------------------- melodia (mini-DSL) ----------------------------
// "e5:0.5 r:1 f#4:2" → nota:duração-em-tempos (r = pausa). '|' só separa compassos.
export interface MelEv { beat: number; dur: number; midi: number; vel: number; }
export function parseMel(s: string): MelEv[] {
  const evs: MelEv[] = []; let beat = 0;
  for (const tok of s.replace(/\|/g, ' ').trim().split(/\s+/)) {
    if (!tok) continue;
    const parts = tok.split(':'); const dur = parseFloat(parts[1] ?? '1');
    if (parts[0] !== 'r') evs.push({ beat, dur, midi: noteMidi(parts[0]), vel: +(parts[2] ?? 0.8) });
    beat += dur;
  }
  return evs;
}
export function melBeats(s: string): number { let b = 0; for (const t of s.replace(/\|/g, ' ').trim().split(/\s+/)) if (t) b += parseFloat(t.split(':')[1] ?? '1'); return b; }

// ------------------------------- percussão ----------------------------------
// padrão = instrumento → lista de [passo(16avos), velocity]
type DrumPat = Record<string, [number, number][]>;
const s16 = (steps: number[], v = 0.8): [number, number][] => steps.map(s => [s, v]);
const DRUMS: Record<string, DrumPat> = {
  // bossa: prato de vassourinha (shaker), aro em clave, bumbo macio
  bossaLite: { shaker: [[0, .5], [2, .3], [4, .45], [6, .3], [8, .5], [10, .3], [12, .45], [14, .3]], rim: s16([0, 3, 8, 10, 13], .5), kick: [[0, .5], [8, .45]] },
  bossaFull: { shaker: [[0, .55], [1, .2], [2, .3], [3, .2], [4, .5], [5, .2], [6, .3], [7, .2], [8, .55], [9, .2], [10, .3], [11, .2], [12, .5], [13, .2], [14, .3], [15, .2]], rim: s16([0, 3, 8, 10, 13], .6), kick: [[0, .6], [6, .25], [8, .5], [14, .3]] },
  // baião/forró: zabumba (grave 1 e "e-do-2") + triângulo em oitavas abrindo
  baiao: { kick: [[0, .95], [6, .7], [8, .55], [14, .4]], rim: [[8, .6]], triC: [[0, .5], [2, .3], [6, .3], [8, .5], [10, .3], [14, .3]], triO: [[4, .55], [12, .55]] },
  baiaoFull: { kick: [[0, 1], [6, .75], [8, .6], [14, .45]], rim: [[4, .4], [8, .65], [13, .3]], triC: [[0, .5], [2, .35], [6, .35], [8, .5], [10, .35], [14, .35]], triO: [[4, .6], [12, .6]], shaker: s16([0, 2, 4, 6, 8, 10, 12, 14], .22) },
  baiaoBrk: { kick: [[0, 1], [6, .8]], triC: s16([0, 2, 4, 6, 8, 10, 12, 14], .45), triO: [[4, .6], [12, .6]] },
  // samba/pagode: surdo marca o 2 e o 4, tamborim carreteiro, agogô e chocalho
  sambaLite: { surdo: [[4, .7], [12, 1]], tamb: s16([0, 3, 4, 6, 10, 11, 14], .5), choc: s16([0, 2, 4, 6, 8, 10, 12, 14], .3) },
  sambaFull: { surdo: [[4, .75], [12, 1], [14, .35]], tamb: s16([0, 2, 3, 5, 6, 8, 10, 11, 13, 14], .55), agogoH: s16([0, 6, 10], .5), agogoL: s16([3, 13], .5), choc: s16([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], .26), kick: [[4, .35], [12, .5]] },
  sambaBrk: { surdo: [[4, .8], [12, 1]], choc: s16([0, 2, 4, 6, 8, 10, 12, 14], .35), agogoH: s16([0, 6, 10], .55), agogoL: s16([3, 13], .55) },
  // verão/surf-pop: bateria leve com caixa 2 e 4
  surf: { kick: [[0, .8], [8, .7], [11, .35]], snare: [[4, .7], [12, .75]], hatC: s16([0, 2, 4, 6, 8, 10, 12, 14], .4), shaker: s16([1, 3, 5, 7, 9, 11, 13, 15], .18) },
  surfFull: { kick: [[0, .85], [8, .75], [11, .4]], snare: [[4, .75], [12, .8], [15, .25]], hatC: s16([0, 2, 4, 6, 10, 12, 14], .45), hatO: [[8, .4]], shaker: s16([1, 3, 5, 7, 9, 11, 13, 15], .2) },
  // choro/ska de cozinha: aro + chimbal no contratempo (pulinho)
  choro: { kick: [[0, .75], [8, .7]], rim: [[4, .6], [12, .6]], hatC: s16([2, 6, 10, 14], .5), shaker: s16([0, 4, 8, 12], .2) },
  choroFull: { kick: [[0, .8], [8, .75], [14, .3]], rim: [[4, .65], [12, .65]], snare: [[7, .2], [15, .25]], hatC: s16([2, 6, 10, 14], .55), shaker: s16([0, 1, 4, 5, 8, 9, 12, 13], .22) },
  // sertão: trem na poeira — bumbo fundo, tom, chocalho constante
  desert: { kick: [[0, .9], [10, .6]], tomL: [[3, .4], [11, .35]], shaker: s16([0, 2, 4, 6, 8, 10, 12, 14], .3), snare: [[4, .25], [12, .3]] },
  desertFull: { kick: [[0, .95], [7, .3], [10, .65]], tomL: [[3, .45], [11, .4], [13, .3]], shaker: s16([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], .2), snare: [[4, .3], [12, .4]], rim: [[6, .3], [14, .35]] },
  // frevo: marcha acelerada, caixa rufando, bumbo firme
  frevo: { kick: [[0, .9], [8, .85]], snare: [[2, .3], [4, .7], [7, .3], [10, .3], [12, .75], [15, .35]], hatC: s16([0, 2, 4, 6, 8, 10, 12, 14], .4), surdo: [[0, .5], [8, .5]] },
  frevoFull: { kick: [[0, .95], [8, .9], [11, .3]], snare: [[0, .3], [2, .35], [4, .75], [6, .3], [7, .35], [10, .35], [12, .8], [14, .3], [15, .4]], hatC: s16([0, 2, 4, 6, 8, 10, 12, 14], .45), surdo: [[0, .55], [8, .55]] },
  // virada de fim de frase (usada a cada 8 compassos)
  fill: { snare: [[8, .4], [10, .5], [12, .6], [13, .65], [14, .75], [15, .85]], kick: [[0, .9]], tomL: [[11, .5]] },
};

// baixo: estilos → eventos por compasso ([passo, dur-em-passos, grau, vel])
// grau: 'r'=fundamental '5'=quinta '3'=terça 'b7'=sétima 'o'=oitava 'a'=aproximação do próximo acorde
type BassEv = [number, number, string, number];
const BASS: Record<string, BassEv[]> = {
  bossa: [[0, 6, 'r', .9], [8, 5, '5', .8], [14, 2, 'a', .5]],
  baiao: [[0, 3, 'r', 1], [3, 3, '5', .55], [6, 2, 'r', .8], [8, 3, 'r', .85], [11, 3, '5', .5], [14, 2, 'a', .5]],
  samba: [[0, 3, 'r', .6], [4, 4, '5', .85], [8, 3, 'r', .7], [12, 2, '5', .9], [14, 2, 'a', .45]],
  pump: [[0, 2, 'r', .9], [2, 2, 'r', .6], [4, 2, '5', .8], [6, 2, 'r', .6], [8, 2, 'r', .85], [10, 2, '5', .7], [12, 2, 'r', .7], [14, 2, 'a', .6]],
  walk: [[0, 4, 'r', .85], [4, 4, '3', .7], [8, 4, '5', .8], [12, 4, 'a', .7]],
  longo: [[0, 10, 'r', .9], [10, 4, '5', .6], [14, 2, 'a', .45]],
};
function bassMidi(ch: Chord, next: Chord, deg: string): number {
  let n = ch.bass;
  if (deg === '5') n += 7; else if (deg === '3') n += ch.ints[1] ?? 4; else if (deg === 'b7') n += 10; else if (deg === 'o') n += 12;
  else if (deg === 'a') { n = next.bass - 1; if (Math.abs(n - ch.bass) > 7) n = next.bass + 1; }
  while (n > 50) n -= 12; while (n < 33) n += 12;
  return n;
}

// acompanhamento harmônico: estilos → batidas [passo, dur-em-passos, vel] (2 compassos alternados)
const COMP: Record<string, [number, number, number][][]> = {
  bossa: [[[0, 2, .5], [6, 3, .8], [12, 2, .55]], [[2, 2, .6], [6, 2, .5], [10, 3, .8]]],
  cav: [[[2, 1, .6], [6, 1, .9], [10, 1, .6], [14, 1, .9]], [[2, 1, .6], [6, 1, .85], [10, 1, .65], [13, 1, .5], [14, 1, .8]]],
  ska: [[[4, 2, .9], [12, 2, .85]], [[4, 2, .85], [12, 2, .9], [14, 1, .4]]],
  calmo: [[[0, 8, .55], [8, 8, .5]], [[0, 8, .5], [10, 5, .55]]],
  pulso: [[[0, 3, .6], [8, 3, .65], [14, 2, .4]], [[0, 3, .6], [6, 2, .4], [8, 3, .6]]],
};

// -------------------------------- as MÚSICAS --------------------------------
type Voice = 'nylon' | 'ep' | 'sanfona' | 'flute' | 'twang' | 'brass' | 'marimba' | 'cavaq';
interface Section {
  bars: number; ch: string;        // acordes, 1 por compasso ("Em7,A7" = 2 no compasso)
  mel?: string;                    // nome da melodia (em song.mels)
  drums: string; bass: string; comp?: string;
  pad?: boolean; ctr?: boolean;    // ctr = contracanto automático (terças/sétimas longas)
  mix?: number;                    // energia da seção (0.6–1)
}
interface Song {
  name: string; bpm: number; swing: number; lead: Voice; compV: Voice; ctrV: Voice;
  mels: Record<string, string>; secs: Section[]; loopFrom?: number;   // volta pro índice ao terminar
}

// ============================ 1 · MENU — bossa ============================
const MENU: Song = {
  name: 'Beira da Tarde', bpm: 96, swing: .12, lead: 'nylon', compV: 'ep', ctrV: 'flute',
  mels: {
    i: `r:2 e5:0.5 d5:0.5 c5:0.5 d5:0.5 | e5:1.5 g5:0.5 e5:2 | r:1 a5:0.5 g5:0.5 e5:0.5 d5:0.5 c5:1 | d5:3 r:1`,
    a: `r:0.5 e5:0.5 g5:0.5 e5:0.5 c5:1.5 r:0.5 | r:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1.5 r:0.5 | r:0.5 d5:0.5 f5:0.5 d5:0.5 b4:1.5 r:0.5 | c5:2.5 g4:0.5 a4:0.5 b4:0.5
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | f#5:0.5 e5:0.5 d5:1 a4:1 c5:1 | d5:1.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:2
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1.5 r:0.5 | f5:1 e5:0.5 d5:0.5 c5:1 a4:1 | b4:2 d5:1 f5:1
       | e5:3 r:1 | c5:0.5 ab4:0.5 f4:0.5 ab4:0.5 c5:1 d5:1 | e5:1 g5:1 e5:1 c#5:1 | d5:1 f5:1 b4:1 d5:0.5 e5:0.5`,
    b: `a5:1 g5:0.5 f5:0.5 c5:2 | f5:1 d5:1 c5:1.5 ab4:0.5 | g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:2 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | a5:1.5 c6:0.5 a5:1 g5:1 | f5:1 d5:1 ab4:1 c5:1 | b4:0.5 d5:0.5 g5:1 e5:2 | c#5:0.5 e5:0.5 a5:1 g5:1 e5:1
       | f5:1.5 e5:0.5 d5:1 c5:1 | b4:1 d5:1 f5:1.5 r:0.5 | g5:1 e5:1 b4:1 d5:1 | c5:1 e5:1 a5:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 a5:0.5 f5:1 e5:1 | d5:1 b4:1 f5:1 d5:1 | e5:2 g5:1 c6:1 | c5:3 r:1`,
    p: `eb5:1 c5:1 ab4:1.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | eb5:0.5 f5:0.5 g5:1 eb5:1 c5:1 | d5:0.5 f5:0.5 b4:1 d5:2
       | a5:1 g5:1 f5:1 e5:1 | f5:1 d5:1 c5:1 ab4:1 | a4:0.5 c5:0.5 d5:0.5 f5:0.5 e5:1 d5:1 | d5:1 b4:1 g4:2`,
  },
  secs: [
    { bars: 4, ch: 'Cmaj7 Am7 Dm7 G7', mel: 'i', drums: 'bossaLite', bass: 'bossa', comp: 'bossa', mix: .7 },
    { bars: 16, ch: 'Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7', mel: 'a', drums: 'bossaLite', bass: 'bossa', comp: 'bossa', mix: .8 },
    { bars: 16, ch: 'Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7', mel: 'b', drums: 'bossaFull', bass: 'bossa', comp: 'bossa', mix: .95 },
    { bars: 16, ch: 'Cmaj7 Dm7 G7 Cmaj7 Am7 D7 Dm7 G7 Em7 A7 Dm7 G7 Cmaj7 Fm6 Em7,A7 Dm7,G7', mel: 'a', drums: 'bossaFull', bass: 'bossa', comp: 'bossa', ctr: true, mix: .9 },
    { bars: 8, ch: 'Abmaj7 G7 Abmaj7 G7 Fmaj7 Fm6 Dm7 G7', mel: 'p', drums: 'bossaLite', bass: 'bossa', comp: 'calmo', pad: true, mix: .7 },
    { bars: 16, ch: 'Fmaj7 Fm6 Cmaj7 C7 Fmaj7 Fm6 Em7 A7 Dm7 G7 Em7 Am7 Dm7 G7 Cmaj7 Cmaj7', mel: 'b', drums: 'bossaFull', bass: 'bossa', comp: 'bossa', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// ====================== 2 · QUINTAL/JARDIM — forró ======================
const FORRO: Song = {
  name: 'Forró do Quintal', bpm: 112, swing: .18, lead: 'sanfona', compV: 'nylon', ctrV: 'sanfona',
  mels: {
    i: `g4:0.5 b4:0.5 d5:0.5 g5:0.5 f5:0.5 d5:0.5 b4:0.5 f4:0.5 | g4:0.5 b4:0.5 d5:0.5 g5:0.5 a5:1 g5:1 | e5:0.5 f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 g4:0.5 | b4:0.5 c5:0.5 d5:1 g4:2`,
    a: `b4:0.5 d5:0.5 d5:1 r:0.5 d5:0.5 e5:0.5 d5:0.5 | b4:0.5 g4:0.5 b4:1 d5:1 r:1 | c5:0.5 e5:0.5 e5:1 e5:0.5 f5:0.5 e5:0.5 d5:0.5 | b4:1 g4:1 d5:1.5 r:0.5
       | d5:0.5 g5:0.5 g5:1 f5:0.5 e5:0.5 d5:1 | f5:0.5 e5:0.5 f5:1 c5:1 a4:1 | e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 b4:0.5 a4:0.5 b4:0.5 g4:2
       | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 g5:1 | g5:0.5 a5:0.5 b5:1 a5:0.5 g5:0.5 f5:1 | e5:0.5 g5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | d5:1 b4:1 g4:1.5 r:0.5
       | d5:0.5 e5:0.5 f5:0.5 e5:0.5 d5:1 b4:1 | c5:0.5 a4:0.5 c5:1 f5:1 e5:1 | e5:0.5 c5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | a4:0.5 b4:0.5 g4:2.5 r:0.5`,
    b: `e5:1 g5:1 g5:0.5 f#5:0.5 e5:1 | e5:0.5 d5:0.5 c5:1 e5:1 g4:1 | b4:0.5 d5:0.5 d5:1 b4:0.5 g4:0.5 b4:1 | a4:0.5 b4:0.5 c5:0.5 b4:0.5 a4:1 f#4:1
       | e5:1 g5:1 b5:1.5 r:0.5 | a5:0.5 g5:0.5 e5:1 c5:1 e5:1 | f#5:0.5 a5:0.5 a5:1 f#5:0.5 d5:0.5 a4:1 | b4:0.5 c5:0.5 d5:1 g4:2
       | e5:0.5 b4:0.5 e5:0.5 g5:0.5 f#5:0.5 e5:0.5 b4:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 g4:1 | d5:0.5 b4:0.5 d5:1 g5:1 b4:1 | a4:0.5 c5:0.5 f#5:1 a5:1 c5:1
       | b4:1 e5:1 g5:1 b5:1 | a5:1 g5:0.5 e5:0.5 c5:2 | a4:0.5 c5:0.5 d5:0.5 f#5:0.5 a5:1 c6:1 | b5:0.5 a5:0.5 g5:2.5 r:0.5`,
  },
  secs: [
    { bars: 4, ch: 'G G G G', mel: 'i', drums: 'baiao', bass: 'baiao', comp: 'pulso', mix: .75 },
    { bars: 16, ch: 'G G C G G F C G G G C G G F C G', mel: 'a', drums: 'baiao', bass: 'baiao', comp: 'pulso', mix: .85 },
    { bars: 16, ch: 'Em C G D Em C D G Em C G D7 Em C D7 G', mel: 'b', drums: 'baiaoFull', bass: 'baiao', comp: 'pulso', mix: 1 },
    { bars: 4, ch: 'G G F,C G', drums: 'baiaoBrk', bass: 'baiao', mix: .8 },
    { bars: 16, ch: 'G G C G G F C G G G C G G F C G', mel: 'a', drums: 'baiaoFull', bass: 'baiao', comp: 'pulso', ctr: true, mix: .95 },
    { bars: 16, ch: 'Em C G D Em C D G Em C G D7 Em C D7 G', mel: 'b', drums: 'baiaoFull', bass: 'baiao', comp: 'pulso', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// ===================== 3 · PRAIA/PISCINA — verão =====================
const PRAIA: Song = {
  name: 'Onda de Verão', bpm: 104, swing: .1, lead: 'flute', compV: 'ep', ctrV: 'nylon',
  mels: {
    i: `r:1 a4:0.5 c5:0.5 e5:1 f5:1 | g5:2 f5:0.5 e5:0.5 d5:1 | c5:1.5 e5:0.5 g5:2 | bb4:1 g4:1 c5:2`,
    a: `a5:1.5 g5:0.5 f5:1 c5:1 | e5:0.5 f5:0.5 g5:0.5 a5:0.5 f5:2 | d5:1 f5:1 bb5:1.5 r:0.5 | db5:0.5 f5:0.5 bb4:1 db5:1 f4:1
       | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1 | g5:1 d5:1 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | c6:1 a5:1 g5:0.5 f5:0.5 e5:1 | f5:0.5 g5:0.5 a5:1 c6:1 a5:1 | bb5:1.5 a5:0.5 f5:1 d5:1 | g5:1 f5:1 db5:1 bb4:1
       | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:0.5 f#5:0.5 a5:1 c6:1.5 r:0.5 | bb5:1 a5:0.5 g5:0.5 d5:1 g5:1 | e5:1 g5:1 c5:2`,
    b: `f5:1 e5:0.5 d5:0.5 a4:1 d5:1 | b4:1 d5:1 f5:1 g5:1 | f5:0.5 g5:0.5 a5:1 f5:1 d5:1 | e5:1 g5:1 bb5:1 c6:1
       | c6:1.5 a5:0.5 e5:1 g5:1 | f5:1 a5:1 d5:1.5 r:0.5 | d5:0.5 g5:0.5 bb5:1 a5:0.5 g5:0.5 d5:1 | e5:2 g5:1 bb5:1
       | a5:1 f5:1 d5:1 f5:1 | d5:0.5 f5:0.5 b4:1 d5:1 f5:1 | db5:1 f5:1 g5:1 f5:1 | g5:0.5 f5:0.5 db5:1 bb4:2
       | e5:1 g5:1 a5:1.5 r:0.5 | f#5:1 a5:1 c6:1 d6:1 | d6:1 bb5:1 g5:1 f5:1 | e5:1 d5:0.5 bb4:0.5 c5:2`,
    p: `d5:2 f5:1 a5:1 | db5:2 f5:1 g5:1 | a5:2 g5:1 f5:1 | f#5:1 a5:1 c6:1.5 r:0.5 | bb5:1 g5:1 d5:1.5 r:0.5 | e5:1 g5:1 bb5:1 g5:1 | a5:3 r:1 | g5:1 e5:1 bb4:1 c5:1`,
  },
  secs: [
    { bars: 4, ch: 'Fmaj7 Gm7 Am7 C7', mel: 'i', drums: 'surf', bass: 'bossa', comp: 'calmo', mix: .7 },
    { bars: 16, ch: 'Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7', mel: 'a', drums: 'surf', bass: 'bossa', comp: 'pulso', mix: .85 },
    { bars: 16, ch: 'Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7', mel: 'b', drums: 'surfFull', bass: 'samba', comp: 'pulso', mix: 1 },
    { bars: 8, ch: 'Bbmaj7 Bbm6 Fmaj7 D7 Gm7 C7 Fmaj7 C7', mel: 'p', drums: 'surf', bass: 'bossa', comp: 'calmo', pad: true, mix: .72 },
    { bars: 16, ch: 'Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7 Fmaj7 Fmaj7 Bbmaj7 Bbm6 Am7 D7 Gm7 C7', mel: 'a', drums: 'surfFull', bass: 'samba', comp: 'pulso', ctr: true, mix: .95 },
    { bars: 16, ch: 'Dm7 G7 Bbmaj7 C7 Am7 Dm7 Gm7 C7 Dm7 G7 Bbm6 C7 Am7 D7 Gm7 C7', mel: 'b', drums: 'surfFull', bass: 'samba', comp: 'pulso', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// ==================== 4 · CALÇADA/LAJE — samba ====================
const SAMBA: Song = {
  name: 'Samba do Meio-Fio', bpm: 100, swing: .22, lead: 'nylon', compV: 'cavaq', ctrV: 'flute',
  mels: {
    i: `r:1 d5:0.5 f5:0.5 g5:1 bb5:1 | g5:0.5 e5:0.5 c5:1 e5:2 | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 c5:1 | d5:0.5 c5:0.5 a4:1 f#4:2`,
    a: `r:0.5 d5:0.5 f5:0.5 g5:0.5 f5:1 d5:1 | r:0.5 e5:0.5 g5:0.5 bb5:0.5 g5:1 e5:1 | c5:0.5 e5:0.5 g5:1 e5:0.5 c5:0.5 e5:1 | f#5:0.5 a5:0.5 c6:1 a5:0.5 f#5:0.5 d5:1
       | g5:1 f5:0.5 d5:0.5 bb4:1 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:0.5 e5:0.5 c5:1 | f5:1.5 a5:0.5 c6:1 a5:1 | g5:0.5 f5:0.5 d5:0.5 c5:0.5 a4:1 c5:1
       | d5:0.5 g5:0.5 g5:1 f5:0.5 d5:0.5 g5:1 | e5:0.5 c5:0.5 e5:1 g5:0.5 bb5:0.5 g5:1 | a5:1 e5:1 c5:1 e5:1 | d5:0.5 f#5:0.5 a5:1 c6:1 a5:1
       | bb5:0.5 a5:0.5 g5:1 f5:0.5 d5:0.5 bb4:1 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:2 a5:1 c6:1 | c6:0.5 a5:0.5 f5:1 a5:1 c5:1`,
    b: `d5:1 f5:1 bb5:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 c5:1 g5:1.5 r:0.5 | f#5:0.5 e5:0.5 d5:1 c5:1 a4:1
       | bb4:0.5 d5:0.5 f5:1 g5:1 f5:1 | e5:0.5 g5:0.5 bb5:1.5 g5:0.5 e5:1 | a5:1 g5:0.5 f5:0.5 c5:1 a4:1 | a4:0.5 c5:0.5 d5:1 f#5:1 a5:1
       | bb5:1 f5:1 d5:1 f5:1 | ab5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | d5:1 f#5:1 a5:1 c6:1
       | d6:0.5 c6:0.5 bb5:1 g5:0.5 f5:0.5 d5:1 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1 | f5:1 c5:1 a5:1.5 r:0.5 | a5:0.5 c6:0.5 f5:2.5 r:0.5`,
    p: `g5:2 f5:1 d5:1 | e5:2 g5:1 bb5:1 | g5:1 d5:1 bb4:1.5 r:0.5 | c5:0.5 e5:0.5 g5:1 bb5:1 e5:1 | f5:1 bb5:1 d6:1.5 r:0.5 | b4:0.5 d5:0.5 f5:1 ab5:1 f5:1 | e5:1 g5:1 c6:1.5 r:0.5 | f#5:0.5 a5:0.5 c6:1 a5:1 f#5:1`,
  },
  secs: [
    { bars: 4, ch: 'Gm7 C7 F6 D7', mel: 'i', drums: 'sambaLite', bass: 'samba', comp: 'cav', mix: .75 },
    { bars: 16, ch: 'Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6', mel: 'a', drums: 'sambaLite', bass: 'samba', comp: 'cav', mix: .85 },
    { bars: 16, ch: 'Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6', mel: 'b', drums: 'sambaFull', bass: 'samba', comp: 'cav', mix: 1 },
    { bars: 8, ch: 'Gm7 C7 Gm7 C7 Bb6 Bdim7 Am7 D7', mel: 'p', drums: 'sambaBrk', bass: 'samba', comp: 'cav', mix: .8 },
    { bars: 16, ch: 'Gm7 C7 Am7 D7 Gm7 C7 F6 F6 Gm7 C7 Am7 D7 Gm7 C7 F6 F6', mel: 'a', drums: 'sambaFull', bass: 'samba', comp: 'cav', ctr: true, mix: .95 },
    { bars: 16, ch: 'Bb6 Bdim7 Am7 D7 Gm7 C7 F6 D7 Bb6 Bdim7 Am7 D7 Gm7 C7 F6 F6', mel: 'b', drums: 'sambaFull', bass: 'samba', comp: 'cav', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// =================== 5 · COZINHA — choro saltitante ===================
const CHORO: Song = {
  name: 'Xícara & Colher', bpm: 118, swing: .2, lead: 'marimba', compV: 'nylon', ctrV: 'flute',
  mels: {
    i: `e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 r:1 | b4:0.5 e5:0.5 g#5:0.5 b5:0.5 g#5:1 e5:1 | a5:1 e5:0.5 c5:0.5 a4:2 | b4:0.5 d5:0.5 g#4:0.5 b4:0.5 e5:2`,
    a: `a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 | g#4:0.5 b4:0.5 e5:0.5 d5:0.5 b4:0.5 g#4:0.5 b4:0.5 e4:0.5 | a4:0.5 c5:0.5 e5:0.5 c5:0.5 a5:1 r:1 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1
       | f5:0.5 e5:0.5 d5:0.5 f5:0.5 a5:1 f5:1 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1 | e5:0.5 c5:0.5 g4:0.5 c5:0.5 e5:1 g5:1 | g#5:0.5 b5:0.5 e5:1 d5:1 b4:1
       | a4:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 e5:0.5 | g#4:0.5 d5:0.5 e5:0.5 d5:0.5 b4:1 g#4:1 | c5:0.5 e5:0.5 a5:1 e5:0.5 c5:0.5 a4:1 | e5:0.5 g5:0.5 a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1
       | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:1 f5:1 | b4:0.5 d5:0.5 f5:0.5 d5:0.5 g5:1 b4:1 | c5:1 e5:0.5 g5:0.5 c6:2 | b5:0.5 g#5:0.5 e5:1 d5:1 b4:1`,
    b: `e5:0.5 g5:0.5 c6:1 g5:0.5 e5:0.5 g5:1 | d5:0.5 f5:0.5 b5:1 f5:0.5 d5:0.5 f5:1 | e5:1 c6:1 g5:1.5 r:0.5 | e5:0.5 g5:0.5 bb5:1 g5:1 e5:1
       | f5:0.5 a5:0.5 c6:1 a5:0.5 f5:0.5 a5:1 | ab5:1 f5:1 d5:1 f5:1 | e5:1 g5:1 c#5:1 e5:1 | d5:0.5 f5:0.5 a5:1 b4:0.5 d5:0.5 f5:1
       | e5:0.5 g5:0.5 c6:0.5 e6:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 g5:1 f5:1 | e5:1 g5:1 c6:1 e5:1 | e5:0.5 g5:0.5 bb5:1 c6:1 bb5:1
       | a5:1 c6:1 f5:1.5 r:0.5 | g5:0.5 f5:0.5 d5:1 b4:1 d5:1 | c5:0.5 e5:0.5 g5:1 e5:1 c5:1 | c5:2.5 r:1.5`,
  },
  secs: [
    { bars: 4, ch: 'Am E7 Am E7', mel: 'i', drums: 'choro', bass: 'walk', comp: 'ska', mix: .75 },
    { bars: 16, ch: 'Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7', mel: 'a', drums: 'choro', bass: 'walk', comp: 'ska', mix: .85 },
    { bars: 16, ch: 'C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C', mel: 'b', drums: 'choroFull', bass: 'walk', comp: 'ska', mix: 1 },
    { bars: 4, ch: 'Am E7 Am E7', drums: 'choroFull', bass: 'pump', comp: 'ska', mix: .85 },
    { bars: 16, ch: 'Am E7 Am A7 Dm G7 C E7 Am E7 Am A7 Dm G7 C E7', mel: 'a', drums: 'choroFull', bass: 'walk', comp: 'ska', ctr: true, mix: .95 },
    { bars: 16, ch: 'C G7 C C7 F Fm6 C,A7 Dm7,G7 C G7 C C7 F G7 C C', mel: 'b', drums: 'choroFull', bass: 'walk', comp: 'ska', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// ================ 6 · DESERTO/ESTRADA — baião do sertão ================
const DESERTO: Song = {
  name: 'Poeira na Trilha', bpm: 92, swing: .08, lead: 'twang', compV: 'nylon', ctrV: 'sanfona',
  mels: {
    i: `e4:1 g4:1 a4:1 b4:1 | e5:2.5 r:1.5 | d5:1 b4:1 a4:1 g4:1 | e4:3 r:1`,
    a: `e4:1 g4:1 b4:1.5 r:0.5 | a4:0.5 g4:0.5 e4:2.5 r:0.5 | d5:1 b4:1 g4:1.5 r:0.5 | a4:1 c#5:1 e5:1.5 r:0.5
       | g4:0.5 a4:0.5 b4:2 e5:1 | d5:0.5 b4:0.5 g4:1 e4:2 | g4:1 c5:1 e5:1.5 r:0.5 | d#5:1 f#5:1 b4:2
       | b4:0.5 e5:0.5 e5:1 g5:1 f#5:1 | e5:0.5 d5:0.5 b4:1 g4:2 | b4:1 d5:1 g5:1.5 r:0.5 | e5:1 c#5:1 a4:2
       | g4:0.5 b4:0.5 e5:1 g5:1 e5:1 | d5:1 b4:0.5 a4:0.5 g4:2 | c5:1 e5:1 g5:1 e5:1 | f#5:1 d#5:1 b4:2`,
    b: `a4:1 c5:1 e5:1.5 r:0.5 | g5:0.5 f#5:0.5 e5:1 b4:2 | c5:0.5 e5:0.5 a5:1 e5:1 c5:1 | b4:1 g4:1 e4:2
       | g4:1 c5:1 e5:2 | d5:1 b4:1 g4:2 | f#5:1 d#5:1 b4:1 a4:1 | b4:0.5 d#5:0.5 f#5:1 a5:1 f#5:1
       | e5:1 c5:1 a4:1.5 r:0.5 | b4:0.5 c5:0.5 b4:1 g4:1 e4:1 | a4:0.5 c5:0.5 e5:1 a5:1.5 r:0.5 | g5:1 f#5:0.5 e5:0.5 b4:2
       | c5:1 e5:1 g5:1 c6:1 | b5:1 g5:1 d5:1 b4:1 | a4:1 b4:1 d#5:1 f#5:1 | e5:3 r:1`,
  },
  secs: [
    { bars: 4, ch: 'Em Em Em Em', mel: 'i', drums: 'desert', bass: 'longo', comp: 'calmo', mix: .7 },
    { bars: 16, ch: 'Em Em G A Em Em C B7 Em Em G A Em Em C B7', mel: 'a', drums: 'desert', bass: 'longo', comp: 'calmo', mix: .82 },
    { bars: 16, ch: 'Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7', mel: 'b', drums: 'desertFull', bass: 'baiao', comp: 'pulso', mix: 1 },
    { bars: 4, ch: 'Em Em C,B7 Em', drums: 'desertFull', bass: 'baiao', mix: .85 },
    { bars: 16, ch: 'Em Em G A Em Em C B7 Em Em G A Em Em C B7', mel: 'a', drums: 'desertFull', bass: 'baiao', comp: 'pulso', ctr: true, mix: .95 },
    { bars: 16, ch: 'Am Em Am Em C G B7 B7 Am Em Am Em C G B7 B7', mel: 'b', drums: 'desertFull', bass: 'baiao', comp: 'pulso', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

// ================== 7 · FEIRA/GARAGEM — frevo ==================
const FREVO: Song = {
  name: 'Frevo do Mercadão', bpm: 126, swing: .06, lead: 'brass', compV: 'ep', ctrV: 'brass',
  mels: {
    i: `g4:0.5 c5:0.5 e5:0.5 g5:0.5 c6:1 r:1 | e5:0.5 g5:0.5 c6:0.5 e6:0.5 g5:1 r:1 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 | c5:1 e5:1 g5:1 c6:1`,
    a: `g4:0.5 c5:0.5 e5:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 g4:0.5 | a4:0.5 c5:0.5 e5:0.5 a5:0.5 e5:0.5 c5:0.5 a4:1 | f5:0.5 e5:0.5 d5:0.5 c5:0.5 b4:0.5 a4:0.5 b4:0.5 d5:0.5 | f5:0.5 d5:0.5 b4:0.5 g4:0.5 d5:1 b4:1
       | c5:0.5 e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 e5:0.5 | c#5:0.5 e5:0.5 g5:0.5 a5:0.5 e5:1 c#5:1 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 d5:0.5 | e5:0.5 g5:0.5 c5:2.5 r:0.5
       | e5:0.5 g5:0.5 c6:0.5 g5:0.5 e5:0.5 g5:0.5 c6:0.5 e6:0.5 | e6:0.5 c6:0.5 a5:0.5 e5:0.5 c5:0.5 e5:0.5 a5:1 | f5:0.5 a5:0.5 f5:0.5 d5:0.5 a4:0.5 d5:0.5 f5:0.5 a5:0.5 | g5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:1 f5:1
       | e5:0.5 c5:0.5 g5:0.5 e5:0.5 c6:0.5 g5:0.5 e5:0.5 c5:0.5 | a5:0.5 g5:0.5 e5:0.5 c#5:0.5 e5:1 g5:1 | f5:0.5 a5:0.5 d5:0.5 f5:0.5 b4:0.5 d5:0.5 f5:0.5 b4:0.5 | c5:1 e5:0.5 g5:0.5 c6:2`,
    b: `a5:0.5 f5:0.5 c5:0.5 f5:0.5 a5:1 c6:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:1 e5:1 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:1 d5:1 | e5:0.5 g5:0.5 c6:1 g5:1 e5:1
       | c6:0.5 a5:0.5 f5:0.5 a5:0.5 c6:1 a5:1 | eb5:0.5 f#5:0.5 a5:0.5 c6:0.5 a5:1 f#5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 g5:0.5 a5:0.5 c#5:0.5 e5:0.5 | d5:0.5 f5:0.5 a5:0.5 f5:0.5 d5:0.5 b4:0.5 d5:0.5 f5:0.5
       | c6:1 a5:0.5 f5:0.5 a5:1 c6:1 | g5:1 e5:0.5 c5:0.5 e5:1 g5:1 | d5:0.5 f5:0.5 b5:1 f5:1 d5:1 | c6:2 g5:1 e5:1
       | f5:1 a5:1 c6:1.5 r:0.5 | eb5:0.5 c6:0.5 a5:1 f#5:1 a5:1 | g5:0.5 e5:0.5 c5:0.5 e5:0.5 a4:0.5 c#5:0.5 e5:0.5 g5:0.5 | f5:0.5 d5:0.5 b4:0.5 d5:0.5 c5:2`,
  },
  secs: [
    { bars: 4, ch: 'C C G7 C', mel: 'i', drums: 'frevo', bass: 'pump', comp: 'ska', mix: .8 },
    { bars: 16, ch: 'C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C', mel: 'a', drums: 'frevo', bass: 'pump', comp: 'ska', mix: .9 },
    { bars: 16, ch: 'F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7', mel: 'b', drums: 'frevoFull', bass: 'pump', comp: 'ska', mix: 1 },
    { bars: 4, ch: 'C C G7,C C', drums: 'frevoFull', bass: 'pump', mix: .9 },
    { bars: 16, ch: 'C Am7 Dm7 G7 C A7 Dm7,G7 C C Am7 Dm7 G7 C A7 Dm7,G7 C', mel: 'a', drums: 'frevoFull', bass: 'pump', comp: 'ska', ctr: true, mix: .95 },
    { bars: 16, ch: 'F C G7 C F F#dim7 C,A7 Dm7,G7 F C G7 C F F#dim7 C,A7 Dm7,G7', mel: 'b', drums: 'frevoFull', bass: 'pump', comp: 'ska', ctr: true, mix: 1 },
  ],
  loopFrom: 1,
};

export const SONGS: Record<string, Song> = { menu: MENU, forro: FORRO, praia: PRAIA, samba: SAMBA, choro: CHORO, deserto: DESERTO, frevo: FREVO };
// cenário → música (famílias de clima parecido dividem a mesma)
const THEME_SONG: Record<string, string> = {
  quintal: 'forro', jardim: 'forro', parquinho: 'forro',
  praia: 'praia', piscina: 'praia',
  calcada: 'samba', laje: 'samba', varanda: 'samba',
  cozinha: 'choro',
  deserto: 'deserto', estrada: 'deserto', obra: 'deserto',
  feira: 'frevo', garagem: 'frevo',
  sinuca: 'choro', geladeira: 'praia', bancada: 'frevo', sala: 'samba',
};
export const songForTheme = (theme: string): string => THEME_SONG[theme] || 'samba';

// ------------------------------ instrumentos --------------------------------
let rvb: ConvolverNode | null = null;
function reverb(c: AudioContext): ConvolverNode {
  if (rvb) return rvb;
  const len = Math.floor(c.sampleRate * 1.4); const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-3.2 * i / len); }
  rvb = c.createConvolver(); rvb.buffer = buf; return rvb;
}
let nzBuf: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (nzBuf) return nzBuf;
  const n = c.sampleRate; nzBuf = c.createBuffer(1, n, c.sampleRate);
  const d = nzBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return nzBuf;
}
function oscN(c: AudioContext, type: OscillatorType, f: number, t0: number, t1: number, detune = 0): OscillatorNode {
  const o = c.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune; o.start(t0); o.stop(t1); return o;
}
function env(c: AudioContext, t0: number, a: number, peak: number, dur: number, rel: number): GainNode {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(peak, t0 + a);
  g.gain.setValueAtTime(peak, Math.max(t0 + a, t0 + dur - rel)); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  return g;
}
function vibrato(c: AudioContext, osc: OscillatorNode[], t0: number, rate: number, cents: number, delay: number): void {
  const lfo = c.createOscillator(); lfo.frequency.value = rate;
  const lg = c.createGain(); lg.gain.setValueAtTime(0, t0); lg.gain.linearRampToValueAtTime(cents, t0 + delay + 0.25);
  lfo.connect(lg); for (const o of osc) lg.connect(o.detune);
  lfo.start(t0); lfo.stop(t0 + 8);
}

// toca UMA nota de um instrumento melódico
function playNote(c: AudioContext, voice: Voice, f: number, t0: number, dur: number, vel: number, out: AudioNode): void {
  const stopT = t0 + dur + 0.15;
  if (voice === 'nylon' || voice === 'cavaq') {
    const bright = voice === 'cavaq' ? 1.6 : 1;
    const o1 = oscN(c, 'triangle', f, t0, stopT); const o2 = oscN(c, 'sine', f * 2, t0, stopT);
    const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.Q.value = 0.5;
    fl.frequency.setValueAtTime(2300 * bright, t0); fl.frequency.exponentialRampToValueAtTime(900 * bright, t0 + Math.min(dur, 0.8));
    const g = env(c, t0, 0.006, vel * 0.5, Math.min(dur + 0.12, voice === 'cavaq' ? 0.35 : 1.3), 0.05);
    const g2 = c.createGain(); g2.gain.value = 0.18;
    o1.connect(fl); o2.connect(g2); g2.connect(fl); fl.connect(g); g.connect(out);
  } else if (voice === 'ep') {
    const o1 = oscN(c, 'sine', f, t0, stopT); const o2 = oscN(c, 'sine', f * 2.01, t0, stopT);
    const g2 = c.createGain(); g2.gain.value = 0.3;
    const g = env(c, t0, 0.012, vel * 0.42, dur + 0.1, 0.08);
    const trem = c.createGain(); trem.gain.value = 1;
    const lfo = oscN(c, 'sine', 4.6, t0, stopT); const lg = c.createGain(); lg.gain.value = 0.12;
    lfo.connect(lg); lg.connect(trem.gain);
    o1.connect(trem); o2.connect(g2); g2.connect(trem); trem.connect(g); g.connect(out);
  } else if (voice === 'sanfona') {
    const o1 = oscN(c, 'sawtooth', f, t0, stopT, -6); const o2 = oscN(c, 'sawtooth', f, t0, stopT, 6); const o3 = oscN(c, 'sawtooth', f * 2, t0, stopT);
    const g3 = c.createGain(); g3.gain.value = 0.22;
    const fl = c.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = 950; fl.Q.value = 0.6;
    const g = env(c, t0, 0.035, vel * 0.3, dur + 0.05, 0.07);
    vibrato(c, [o1, o2, o3], t0, 5.6, 6, 0.14);
    o1.connect(fl); o2.connect(fl); o3.connect(g3); g3.connect(fl); fl.connect(g); g.connect(out);
  } else if (voice === 'flute') {
    const o1 = oscN(c, 'sine', f, t0, stopT); const o2 = oscN(c, 'sine', f * 2, t0, stopT);
    const g2 = c.createGain(); g2.gain.value = 0.1;
    const nz = c.createBufferSource(); nz.buffer = noise(c); nz.loop = true; nz.start(t0); nz.stop(stopT);
    const nf = c.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = f * 2.2; nf.Q.value = 1.4;
    const ng = c.createGain(); ng.gain.value = 0.02;
    const g = env(c, t0, 0.06, vel * 0.42, dur + 0.08, 0.09);
    vibrato(c, [o1], t0, 5.1, 8, 0.2);
    o1.connect(g); o2.connect(g2); g2.connect(g); nz.connect(nf); nf.connect(ng); ng.connect(g); g.connect(out);
  } else if (voice === 'twang') {
    const o1 = oscN(c, 'sawtooth', f, t0, stopT);
    o1.frequency.setValueAtTime(f * 1.025, t0); o1.frequency.exponentialRampToValueAtTime(f, t0 + 0.045);
    const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.Q.value = 3.2;
    fl.frequency.setValueAtTime(2100, t0); fl.frequency.exponentialRampToValueAtTime(820, t0 + Math.min(dur, 0.6));
    const g = env(c, t0, 0.005, vel * 0.42, Math.min(dur + 0.15, 1.5), 0.06);
    o1.connect(fl); fl.connect(g); g.connect(out);
  } else if (voice === 'brass') {
    const o1 = oscN(c, 'sawtooth', f, t0, stopT, -8); const o2 = oscN(c, 'sawtooth', f, t0, stopT, 8); const o3 = oscN(c, 'sawtooth', f * 0.5, t0, stopT);
    const g3 = c.createGain(); g3.gain.value = 0.25;
    const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.Q.value = 1;
    fl.frequency.setValueAtTime(700, t0); fl.frequency.linearRampToValueAtTime(2300, t0 + 0.06); fl.frequency.exponentialRampToValueAtTime(1300, t0 + Math.max(0.12, dur));
    const g = env(c, t0, 0.025, vel * 0.3, dur + 0.05, 0.07);
    o1.connect(fl); o2.connect(fl); o3.connect(g3); g3.connect(fl); fl.connect(g); g.connect(out);
  } else if (voice === 'marimba') {
    const o1 = oscN(c, 'sine', f, t0, stopT); const o2 = oscN(c, 'sine', f * 4, t0, stopT);
    const g2 = c.createGain(); g2.gain.setValueAtTime(0.3, t0); g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12);
    const g = env(c, t0, 0.004, vel * 0.5, Math.min(dur + 0.15, 0.7), 0.08);
    o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(out);
  }
}
function playBass(c: AudioContext, f: number, t0: number, dur: number, vel: number, out: AudioNode): void {
  const stopT = t0 + dur + 0.1;
  const o1 = oscN(c, 'sine', f, t0, stopT); const o2 = oscN(c, 'triangle', f, t0, stopT);
  const g2 = c.createGain(); g2.gain.value = 0.35;
  const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 620; fl.Q.value = 0.4;
  const g = env(c, t0, 0.008, vel * 0.62, dur, 0.05);
  o1.connect(fl); o2.connect(g2); g2.connect(fl); fl.connect(g); g.connect(out);
}
// percussão
function playDrum(c: AudioContext, inst: string, t0: number, vel: number, out: AudioNode): void {
  const nz = (dur: number, f: number, q: number, type: BiquadFilterType, v: number, att = 0.001) => {
    const s = c.createBufferSource(); s.buffer = noise(c); const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(v, t0 + att); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    s.connect(fl); fl.connect(g); g.connect(out); s.start(t0); s.stop(t0 + dur + 0.02);
  };
  const th = (f0: number, f1: number, dur: number, v: number) => {
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t0 + dur * 0.8);
    const g = c.createGain(); g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + dur + 0.02);
  };
  switch (inst) {
    case 'kick': th(140, 46, 0.13, vel * 0.85); break;
    case 'surdo': th(84, 62, 0.4, vel * 0.8); break;
    case 'tomL': th(130, 92, 0.25, vel * 0.6); break;
    case 'snare': th(190, 150, 0.05, vel * 0.3); nz(0.13, 1800, 0.9, 'bandpass', vel * 0.4); break;
    case 'rim': nz(0.035, 3900, 6, 'bandpass', vel * 0.5); th(1750, 1500, 0.02, vel * 0.2); break;
    case 'hatC': nz(0.04, 8000, 1, 'highpass', vel * 0.32); break;
    case 'hatO': nz(0.24, 7200, 1, 'highpass', vel * 0.26); break;
    case 'shaker': nz(0.07, 5200, 1.2, 'bandpass', vel * 0.3, 0.018); break;
    case 'choc': nz(0.05, 6200, 0.8, 'bandpass', vel * 0.26, 0.012); break;
    case 'tamb': nz(0.04, 3000, 4, 'bandpass', vel * 0.5); th(1000, 900, 0.025, vel * 0.25); break;
    case 'agogoH': th(1320, 1240, 0.11, vel * 0.3); break;
    case 'agogoL': th(880, 830, 0.13, vel * 0.3); break;
    case 'triO': th(2960, 2900, 0.4, vel * 0.16); nz(0.3, 9000, 1, 'highpass', vel * 0.1); break;
    case 'triC': th(2960, 2900, 0.07, vel * 0.14); break;
  }
}

// ------------------------------- o maestro ----------------------------------
interface State {
  id: string; song: Song; sec: number; bar: number; t: number;
  bus: GainNode; dry: GainNode; wet: GainNode; lead: GainNode; drums: GainNode; bassG: GainNode; compG: GainNode; other: GainNode;
  mels: Record<string, MelEv[]>; timer: number;
}
let st: State | null = null;
let wanted: string | null = null;

type Buses = Pick<State, 'bus' | 'dry' | 'wet' | 'lead' | 'drums' | 'bassG' | 'compG' | 'other'>;
function buildBus(c: AudioContext, song: Song): Buses {
  const bus = c.createGain(); bus.gain.value = 0;
  const dry = c.createGain(); dry.gain.value = 1; dry.connect(bus);
  const wet = c.createGain(); wet.gain.value = 0.16; wet.connect(reverb(c)); reverb(c).connect(bus);
  // delay só no solo (colcheia pontuada) — dá o ar de gravação de estúdio
  const lead = c.createGain(); lead.connect(dry); lead.connect(wet);
  const del = c.createDelay(1.5); del.delayTime.value = 0.75 * 60 / song.bpm;
  const fb = c.createGain(); fb.gain.value = 0.26; const dg = c.createGain(); dg.gain.value = 0.13;
  lead.connect(del); del.connect(fb); fb.connect(del); del.connect(dg); dg.connect(dry);
  const drums = c.createGain(); drums.gain.value = 1; drums.connect(dry);
  const dws = c.createGain(); dws.gain.value = 0.05; drums.connect(dws); dws.connect(wet);
  const bassG = c.createGain(); bassG.connect(dry);
  const compG = c.createGain(); compG.connect(dry); const cws = c.createGain(); cws.gain.value = 0.4; compG.connect(cws); cws.connect(wet);
  const other = c.createGain(); other.connect(dry); other.connect(wet);
  return { bus, dry, wet, lead, drums, bassG, compG, other };
}

function chordAt(sec: Section, bar: number): { cur: Chord[]; next: Chord } {
  const toks = sec.ch.trim().split(/\s+/);
  const cur = toks[bar % toks.length].split(',').map(parseChord);
  const nx = toks[(bar + 1) % toks.length].split(',').map(parseChord)[0];
  return { cur, next: nx };
}

function scheduleBar(s: State): void {
  const c = audioCtx()!;
  const song = s.song; const sec = song.secs[s.sec];
  const beat = 60 / song.bpm; const barDur = beat * 4; const step = barDur / 16;
  const sw = (i: number) => (i % 2 === 1 ? song.swing * step : 0);
  const hum = () => (Math.random() - 0.5) * 0.006;
  const t = s.t; const mix = sec.mix ?? 1;
  const { cur, next } = chordAt(sec, s.bar);
  const chOf = (stp: number) => cur[stp >= 8 && cur.length > 1 ? 1 : 0];

  // bateria (com virada a cada 8 compassos)
  const isFill = sec.bars >= 8 && s.bar % 8 === 7;
  const basePat = DRUMS[sec.drums]; const fillPat = DRUMS.fill;
  for (const inst of Object.keys(basePat)) {
    const evs = (isFill && (inst === 'snare' || inst === 'tamb')) ? [] : basePat[inst];
    for (const [stp, v] of evs) playDrum(c, inst, t + stp * step + sw(stp) + hum(), v * mix, s.drums);
  }
  if (isFill) for (const inst of Object.keys(fillPat)) for (const [stp, v] of fillPat[inst]) playDrum(c, inst, t + stp * step + sw(stp), v * mix, s.drums);

  // baixo (nota de aproximação anda pro PRÓXIMO acorde — meio do compasso ou seguinte)
  for (const [stp, durS, deg, v] of BASS[sec.bass]) {
    const ch = chOf(stp);
    const target = (cur.length > 1 && stp < 8) ? cur[1] : next;
    playBass(c, midiF(bassMidi(ch, target, deg)), t + stp * step + sw(stp), durS * step * 1.1, v * mix, s.bassG);
  }

  // harmonia (violão/cavaco/piano) — padrão alterna a cada compasso
  if (sec.comp) {
    const pat = COMP[sec.comp][s.bar % COMP[sec.comp].length];
    for (const [stp, durS, v] of pat) {
      const ch = chOf(stp);
      for (const m of ch.comp) playNote(c, song.compV, midiF(m), t + stp * step + sw(stp) + hum(), durS * step, v * 0.55 * mix, s.compG);
    }
  }
  // almofada (pad) — acorde sustentado bem suave
  if (sec.pad) for (const m of cur[0].comp) playNote(c, 'ep', midiF(m), t, barDur * 0.96, 0.16, s.other);
  // contracanto automático: terça/sétima longa uma oitava abaixo do solo
  if (sec.ctr) {
    const ch = cur[0]; const iv = s.bar % 2 === 0 ? (ch.ints[1] ?? 4) : (ch.ints[3] ?? ch.ints[2] ?? 7);
    let m = ch.rootPc + 48 + iv; while (m > 62) m -= 12; while (m < 50) m += 12;
    playNote(c, song.ctrV, midiF(m), t + sw(0), barDur * 0.9, 0.2, s.other);
  }
  // solo (melodia da seção)
  if (sec.mel) {
    const evs = s.mels[sec.mel];
    const b0 = s.bar * 4, b1 = b0 + 4;
    for (const e of evs) if (e.beat >= b0 && e.beat < b1) {
      const stp = (e.beat - b0) * 4;
      playNote(c, song.lead, midiF(e.midi), t + stp * step + sw(Math.round(stp)) + hum(), e.dur * beat * 0.92, e.vel * 0.85, s.lead);
    }
  }

  // avança
  s.t += barDur; s.bar++;
  if (s.bar >= sec.bars) { s.bar = 0; s.sec++; if (s.sec >= song.secs.length) s.sec = song.loopFrom ?? 0; }
}

function tick(): void {
  if (!st) return;
  const c = audioCtx();
  if (c && c.state === 'running') {
    if (st.t < c.currentTime) st.t = c.currentTime + 0.06;   // ficou pra trás (aba dormiu)? recola
    while (st.t < c.currentTime + 3.2) scheduleBar(st);
  }
  st.timer = window.setTimeout(tick, 350);
}

export function playMusic(id: string): void {
  wanted = id;
  const c = audioCtx(); if (!c) return;
  if (st && st.id === id) return;
  if (st) {   // crossfade de saída
    const old = st; clearTimeout(old.timer);
    old.bus.gain.setTargetAtTime(0, c.currentTime, 0.3);
    setTimeout(() => old.bus.disconnect(), 1600);
    st = null;
  }
  const song = SONGS[id]; if (!song) return;
  const b = buildBus(c, song);
  b.bus.connect(musicBus()!);
  b.bus.gain.setValueAtTime(0, c.currentTime); b.bus.gain.linearRampToValueAtTime(1, c.currentTime + 0.7);
  const mels: Record<string, MelEv[]> = {}; for (const k of Object.keys(song.mels)) mels[k] = parseMel(song.mels[k]);
  st = { id, song, sec: 0, bar: 0, t: c.currentTime + 0.1, mels, timer: 0, ...b };
  tick();
}
export function stopAllMusic(): void {
  if (!st) return; clearTimeout(st.timer);
  const c = audioCtx(); if (c) st.bus.gain.setTargetAtTime(0, c.currentTime, 0.25);
  const old = st; setTimeout(() => old.bus.disconnect(), 1200); st = null; wanted = null;
}
export function musicNow(): string | null { return st ? st.id : null; }
export function musicWanted(): string | null { return wanted; }
