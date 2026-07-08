// IA PREDITIVA — cada IA SIMULA vários petelecos candidatos rodando a física de
// verdade (agora COM os adversários no mundo, então ela pode tabelar numa
// tampinha pra fazer curva, evita empurrar os outros à toa, e as agressivas
// tentam jogar rivais em buracos/fora). Pontua progresso menos risco e escolhe o
// melhor. Nunca se joga em buraco/fora de propósito.
import { Cap, V, dist, norm, sub, mul, vec, len, MAX_POWER } from '../engine/core';
import { TrackModel } from '../engine/track';
import { stepWorld, anyMoving } from '../engine/physics';

export type AIKind = 'cauteloso' | 'agressivo' | 'tecnico' | 'caotico' | 'rival';
export const AI_KINDS: AIKind[] = ['cauteloso', 'agressivo', 'tecnico', 'caotico', 'rival'];
export const AI_LABEL: Record<AIKind, string> = {
  cauteloso: 'Cautelosa', agressivo: 'Agressiva', tecnico: 'Técnica', caotico: 'Caótica', rival: 'Rival',
};

interface Persona {
  lookahead: number; powBias: number; risk: number; outPenalty: number;
  spread: number; noise: number; rival: number; offense: number;   // offense = gosto por jogar rival em perigo
}
const P: Record<AIKind, Persona> = {
  cauteloso: { lookahead: 12, powBias: 0.95, risk: 1.5, outPenalty: 280, spread: 0.16, noise: 0.020, rival: 0, offense: 0 },
  agressivo: { lookahead: 19, powBias: 1.10, risk: 0.6, outPenalty: 170, spread: 0.22, noise: 0.050, rival: 0.3, offense: 0.7 },
  tecnico: { lookahead: 14, powBias: 1.00, risk: 1.0, outPenalty: 210, spread: 0.18, noise: 0.014, rival: 0, offense: 0 },
  caotico: { lookahead: 13, powBias: 1.03, risk: 0.7, outPenalty: 150, spread: 0.36, noise: 0.150, rival: 0.15, offense: 0.3 },
  rival: { lookahead: 15, powBias: 1.05, risk: 0.8, outPenalty: 200, spread: 0.20, noise: 0.035, rival: 1.0, offense: 1.0 },
};

function clone(c: Cap): Cap {
  return {
    ...c, pos: vec(c.pos.x, c.pos.y), vel: vec(), z: 0, vz: 0, airborne: false,
    cpPos: vec(c.cpPos.x, c.cpPos.y), turnStart: vec(c.turnStart.x, c.turnStart.y),
    resetTo: vec(c.pos.x, c.pos.y), preFlick: vec(c.pos.x, c.pos.y),
    consumed: new Set<number>(), stats: { ...c.stats }, moving: false, finished: false,
  };
}

interface SimOut { endProg: number; maxProg: number; out: boolean; holed: boolean; bombed: boolean; finished: boolean; jumped: boolean; dEdge: number; endPos: V; bonus: number; oppHarm: number; }

// simula UMA tacada num mundo COM os adversários (parados; podem ser empurrados)
function sim(cap: Cap, caps: Cap[], track: TrackModel, dir: V, power01: number): SimOut {
  const shooter = clone(cap);
  shooter.resetTo = vec(cap.turnStart.x, cap.turnStart.y);
  shooter.vel = mul(norm(dir), Math.max(0.06, Math.min(1, power01)) * MAX_POWER); shooter.moving = true;
  const world: Cap[] = [shooter];
  for (const o of caps) { if (o.id === cap.id || o.finished) continue; const oc = clone(o); world.push(oc); }
  let out = false, holed = false, bombed = false, finished = false, jumped = false, bonus = 0, maxProg = cap.progress; const harm = new Set<number>();
  const FIXED = 1 / 120; let steps = 0;
  while (anyMoving(world) && steps < 700) {
    const evs = stepWorld(world, track, FIXED);
    for (const e of evs) {
      if (e.capId === shooter.id) {
        if (e.type === 'out') out = true; else if (e.type === 'hole') holed = true; else if (e.type === 'bomb') bombed = true;
        else if (e.type === 'finish') finished = true; else if (e.type === 'bonus') bonus += (e.n || 1); else if (e.type === 'ramp') jumped = true;
      } else if (e.type === 'out' || e.type === 'hole') harm.add(e.capId);
    }
    if (shooter.progress > maxProg) maxProg = shooter.progress;
    steps++;
  }
  const n = track.nearest(shooter.pos);
  return { endProg: shooter.progress, maxProg, out, holed, bombed, finished, jumped, dEdge: Math.max(0, n.d - n.half * 0.45), endPos: vec(shooter.pos.x, shooter.pos.y), bonus, oppHarm: harm.size };
}

function score(o: SimOut, base: Cap, per: Persona, rival: Cap | null): number {
  let s: number;
  if (o.out) s = base.progress - per.outPenalty + (o.maxProg - base.progress) * 0.12;
  else s = o.endProg - o.dEdge * per.risk * 2.4;
  if (o.holed) s -= 90;         // buraco: nunca de propósito
  if (o.bombed) s -= 120;
  s += o.bonus * 22;
  if (o.jumped) s += 10;        // pular a rampa (avança e passa o buraco) é ótimo
  if (o.finished) s += 500;
  s += o.oppHarm * per.offense * 65;                       // jogar rival em perigo (só ofensivas)
  if (rival && per.rival > 0 && !o.out) { const d = dist(o.endPos, rival.pos); s += per.rival * Math.max(0, 9 - d) * 3.0; }
  return s;
}

const rot = (v: V, a: number): V => ({ x: v.x * Math.cos(a) - v.y * Math.sin(a), y: v.x * Math.sin(a) + v.y * Math.cos(a) });

export function aiFlick(cap: Cap, caps: Cap[], track: TrackModel): { dir: V; power: number } {
  const kind = (cap.ai as AIKind) || 'tecnico';
  const per = P[kind] || P.tecnico;
  const total = track.total;

  const tan = track.atArc(cap.progress).tan;
  const near = track.atArc(Math.min(total, cap.progress + 4)).p;
  const far = track.atArc(Math.min(total, cap.progress + per.lookahead)).p;
  const dNear = len(sub(near, cap.pos)) < 0.4 ? tan : norm(sub(near, cap.pos));
  const dFar = len(sub(far, cap.pos)) < 0.4 ? tan : norm(sub(far, cap.pos));

  // rival mais próximo à frente (pra trombar / usar de apoio)
  let rival: Cap | null = null;
  if (per.rival > 0 || per.offense > 0) { let bd = 18; for (const o of caps) { if (o.id === cap.id || o.finished) continue; const d = dist(cap.pos, o.pos); if (d < bd && o.progress > cap.progress - 8) { rival = o; bd = d; } } }

  // alvos deslocados p/ os lados (desviar de bomba/buraco na linha central)
  const a2 = track.atArc(Math.min(total, cap.progress + 9)); const perpV = { x: -a2.tan.y, y: a2.tan.x };
  const dodgeL = norm(sub({ x: a2.p.x + perpV.x * 2.7, y: a2.p.y + perpV.y * 2.7 }, cap.pos));
  const dodgeR = norm(sub({ x: a2.p.x - perpV.x * 2.7, y: a2.p.y - perpV.y * 2.7 }, cap.pos));

  const s = per.spread;
  const dirs: V[] = [dFar, rot(dFar, s * 0.6), rot(dFar, -s * 0.6), dNear, tan, dodgeL, dodgeR];
  const pows = kind === 'agressivo' ? [0.3, 0.55, 0.78, 1.0] : kind === 'cauteloso' ? [0.2, 0.4, 0.6, 0.82] : [0.24, 0.46, 0.7, 0.94];

  let best = { dir: dNear, power: 0.2, s: -1e9 }; let bestOut: SimOut | null = null;
  const consider = (dir: V, pw: number) => { const ep = Math.min(1, pw); const o = sim(cap, caps, track, dir, ep); const sc = score(o, cap, per, rival); if (sc > best.s) { best = { dir, power: ep, s: sc }; bestOut = o; } };

  for (const dir of dirs) for (const pw of pows) consider(dir, pw * per.powBias);
  for (const pw of [0.12, 0.18]) consider(tan, pw);
  const rc = track.atArc(Math.min(total, cap.progress + 3)).p;
  const rcDir = len(sub(rc, cap.pos)) < 0.3 ? tan : norm(sub(rc, cap.pos));
  for (const pw of [0.12, 0.2]) consider(rcDir, pw);
  // RAMPA à frente: carrega com força pra pular o buraco
  for (const o of track.def.obstacles) {
    if (o.type !== 'jump') continue;
    const op = track.progressOf(vec(o.x, o.y));
    if (op > cap.progress + 1 && op < cap.progress + 26) { const jdir = norm(sub(vec(o.x, o.y), cap.pos)); for (const pw of [0.7, 0.85, 1.0]) consider(jdir, pw); }
  }
  // ofensiva: tenta mandar o rival pro perigo (só agressiva/rival)
  if (rival && per.offense > 0.4) { const rdir = norm(sub(rival.pos, cap.pos)); for (const pw of [0.6, 0.8, 1.0]) consider(rdir, pw); }

  // ANTI-TRAVAMENTO: se o melhor plano ainda cai/não avança, faz uma varredura de
  // 360° em baixa força pra achar QUALQUER saída segura (nunca fica preso).
  const bad = !bestOut || (bestOut as SimOut).out || (bestOut as SimOut).holed || (bestOut as SimOut).bombed || (bestOut as SimOut).endProg <= cap.progress + 0.6;
  if (bad) { for (let dd = 0; dd < 16; dd++) { const a = dd / 16 * Math.PI * 2, dir = { x: Math.cos(a), y: Math.sin(a) }; for (const pw of [0.15, 0.26, 0.4]) consider(dir, pw); } }

  const na = (Math.random() - 0.5) * per.noise * 2.2;
  const fdir = rot(best.dir, na);
  const fp = Math.max(0.06, Math.min(1, best.power * (1 + (Math.random() - 0.5) * per.noise)));
  return { dir: fdir, power: fp };
}
