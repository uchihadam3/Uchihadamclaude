// IA PREDITIVA — em vez de "chutar" a força, cada IA SIMULA vários petelecos
// candidatos (clona a própria tampinha num mundo de 1 corpo e roda a física de
// verdade até parar), pontua cada resultado por progresso na pista menos o risco
// (cair fora, buraco, bomba, parar na beirada) e escolhe o melhor. As
// personalidades mudam a mira, a ousadia e o quanto miram nos rivais.
import { Cap, V, dist, norm, sub, mul, vec, len, MAX_POWER } from '../engine/core';
import { TrackModel } from '../engine/track';
import { stepWorld, anyMoving } from '../engine/physics';

export type AIKind = 'cauteloso' | 'agressivo' | 'tecnico' | 'caotico' | 'rival';
export const AI_KINDS: AIKind[] = ['cauteloso', 'agressivo', 'tecnico', 'caotico', 'rival'];
export const AI_LABEL: Record<AIKind, string> = {
  cauteloso: 'Cautelosa', agressivo: 'Agressiva', tecnico: 'Técnica', caotico: 'Caótica', rival: 'Rival',
};

interface Persona {
  lookahead: number;   // distância-alvo à frente no traçado
  powBias: number;     // tempero na força escolhida
  risk: number;        // peso de "parou perto da borda" (maior = mais seguro)
  outPenalty: number;  // punição por cair fora
  spread: number;      // leque angular dos candidatos (rad)
  noise: number;       // erro de execução
  rival: number;       // peso de mirar/trombações no rival
}
const P: Record<AIKind, Persona> = {
  cauteloso: { lookahead: 12, powBias: 0.95, risk: 1.5, outPenalty: 240, spread: 0.16, noise: 0.020, rival: 0 },
  agressivo: { lookahead: 19, powBias: 1.10, risk: 0.5, outPenalty: 90,  spread: 0.22, noise: 0.055, rival: 0.25 },
  tecnico:   { lookahead: 14, powBias: 1.00, risk: 1.0, outPenalty: 180, spread: 0.18, noise: 0.014, rival: 0 },
  caotico:   { lookahead: 13, powBias: 1.03, risk: 0.7, outPenalty: 120, spread: 0.36, noise: 0.150, rival: 0.15 },
  rival:     { lookahead: 15, powBias: 1.05, risk: 0.8, outPenalty: 160, spread: 0.20, noise: 0.035, rival: 1.0 },
};

// clona a tampinha para uma simulação isolada (posição/velocidade frescas)
function clone(c: Cap): Cap {
  return {
    ...c,
    pos: vec(c.pos.x, c.pos.y), vel: vec(),
    cpPos: vec(c.cpPos.x, c.cpPos.y),
    turnStart: vec(c.turnStart.x, c.turnStart.y),
    resetTo: vec(c.turnStart.x, c.turnStart.y),
    preFlick: vec(c.pos.x, c.pos.y),
    consumed: new Set<number>(), stats: { ...c.stats },
    moving: false, finished: false,
  };
}

interface SimOut { endProg: number; maxProg: number; out: boolean; holed: boolean; bombed: boolean; finished: boolean; dEdge: number; endPos: V; bonus: number; }
function simShot(base: Cap, track: TrackModel, dir: V, power01: number): SimOut {
  const c = clone(base);
  c.vel = mul(norm(dir), Math.max(0.06, Math.min(1, power01)) * MAX_POWER); c.moving = true;
  let out = false, holed = false, bombed = false, finished = false, bonus = 0, maxProg = base.progress;
  const FIXED = 1 / 120; let steps = 0;
  while (anyMoving([c]) && steps < 1400) {
    const evs = stepWorld([c], track, FIXED);
    for (const e of evs) {
      if (e.type === 'out') out = true; else if (e.type === 'hole') holed = true;
      else if (e.type === 'bomb') bombed = true; else if (e.type === 'finish') finished = true;
      else if (e.type === 'bonus') bonus += (e.n || 1);
    }
    if (c.progress > maxProg) maxProg = c.progress;
    steps++;
  }
  const n = track.nearest(c.pos);
  const dEdge = Math.max(0, n.d - n.half * 0.45);   // o quão perto da borda parou
  return { endProg: c.progress, maxProg, out, holed, bombed, finished, dEdge, endPos: vec(c.pos.x, c.pos.y), bonus };
}

function score(o: SimOut, base: Cap, per: Persona, rival: Cap | null): number {
  let s: number;
  if (o.out) {
    s = base.progress - per.outPenalty + (o.maxProg - base.progress) * 0.12;   // crédito mínimo pelo quanto avançou
  } else {
    s = o.endProg - o.dEdge * per.risk * 2.4;   // avançar é bom; parar na beirada é arriscado
  }
  if (o.holed) s -= 60;    // volta ao checkpoint e ainda custa 1 peteléco
  if (o.bombed) s -= 85;   // perde o resto do turno
  s += o.bonus * 22;       // pegar +petelecos vale a pena
  if (o.finished) s += 400;
  if (rival && per.rival > 0 && !o.out) { const d = dist(o.endPos, rival.pos); s += per.rival * Math.max(0, 9 - d) * 3.2; }
  return s;
}

const rot = (v: V, a: number): V => ({ x: v.x * Math.cos(a) - v.y * Math.sin(a), y: v.x * Math.sin(a) + v.y * Math.cos(a) });

export function aiFlick(cap: Cap, caps: Cap[], track: TrackModel): { dir: V; power: number } {
  const kind = (cap.ai as AIKind) || 'tecnico';
  const per = P[kind] || P.tecnico;
  const total = track.total;

  // dois alvos adiante (perto = recuperar/abraçar a curva; longe = avançar) + tangente
  const tan = track.atArc(cap.progress).tan;
  const near = track.atArc(Math.min(total, cap.progress + 6)).p;
  const far = track.atArc(Math.min(total, cap.progress + per.lookahead)).p;
  const dNear = len(sub(near, cap.pos)) < 0.4 ? tan : norm(sub(near, cap.pos));
  const dFar = len(sub(far, cap.pos)) < 0.4 ? tan : norm(sub(far, cap.pos));

  // rival próximo à frente (para trombar)
  let rival: Cap | null = null;
  if (per.rival > 0) { let bd = 16; for (const o of caps) { if (o.id === cap.id || o.finished) continue; const d = dist(cap.pos, o.pos); if (d < bd && o.progress > cap.progress - 6) { rival = o; bd = d; } } }

  const s = per.spread;
  const dirs: V[] = [dFar, rot(dFar, s * 0.6), rot(dFar, -s * 0.6), dNear, rot(dNear, s * 0.5), rot(dNear, -s * 0.5), tan];
  const pows = kind === 'agressivo' ? [0.2, 0.4, 0.6, 0.78, 0.9, 1.0] : kind === 'cauteloso' ? [0.14, 0.28, 0.42, 0.56, 0.7, 0.84] : [0.16, 0.32, 0.5, 0.66, 0.82, 0.96];

  let best = { dir: dNear, power: 0.2, s: -1e9 };
  for (const dir of dirs) {
    for (const pw of pows) {
      const ep = Math.min(1, pw * per.powBias);
      const sc = score(simShot(cap, track, dir, ep), cap, per, rival);
      if (sc > best.s) best = { dir, power: ep, s: sc };
    }
  }
  // creep de segurança: tacadas curtíssimas na tangente (garantem avançar sem cair)
  for (const pw of [0.12, 0.18]) { const sc = score(simShot(cap, track, tan, pw), cap, per, rival); if (sc > best.s) best = { dir: tan, power: pw, s: sc }; }
  // rival: também tenta ir direto no alvo
  if (rival) {
    const rdir = norm(sub(rival.pos, cap.pos));
    for (const pw of [0.7, 0.9]) {
      const sc = score(simShot(cap, track, rdir, pw), cap, per, rival) + 18;
      if (sc > best.s) best = { dir: rdir, power: pw, s: sc };
    }
  }

  // erro de execução por personalidade (nenhuma IA é perfeita)
  const na = (Math.random() - 0.5) * per.noise * 2.2;
  const fdir = rot(best.dir, na);
  const fp = Math.max(0.06, Math.min(1, best.power * (1 + (Math.random() - 0.5) * per.noise)));
  return { dir: fdir, power: fp };
}
