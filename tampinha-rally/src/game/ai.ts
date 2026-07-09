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
// IAs mais afiadas: menos ruído (executam melhor), olham mais longe e usam mais
// força (avançam mais por peteléco) — mais difícil de ganhar.
const P: Record<AIKind, Persona> = {
  cauteloso: { lookahead: 16, powBias: 1.00, risk: 1.20, outPenalty: 300, spread: 0.16, noise: 0.010, rival: 0, offense: 0 },
  agressivo: { lookahead: 23, powBias: 1.14, risk: 0.55, outPenalty: 190, spread: 0.24, noise: 0.026, rival: 0.25, offense: 0.8 },
  tecnico: { lookahead: 19, powBias: 1.06, risk: 0.90, outPenalty: 235, spread: 0.18, noise: 0.006, rival: 0, offense: 0.1 },
  caotico: { lookahead: 15, powBias: 1.06, risk: 0.70, outPenalty: 170, spread: 0.34, noise: 0.080, rival: 0.15, offense: 0.35 },
  rival: { lookahead: 20, powBias: 1.10, risk: 0.75, outPenalty: 225, spread: 0.20, noise: 0.014, rival: 0.6, offense: 1.0 },
};

function clone(c: Cap): Cap {
  return {
    ...c, pos: vec(c.pos.x, c.pos.y), vel: vec(), z: 0, vz: 0, airborne: false,
    cpPos: vec(c.cpPos.x, c.cpPos.y), turnStart: vec(c.turnStart.x, c.turnStart.y),
    resetTo: vec(c.pos.x, c.pos.y), preFlick: vec(c.pos.x, c.pos.y),
    consumed: new Set<number>(), stats: { ...c.stats }, moving: false, finished: false,
  };
}

interface SimOut { endProg: number; maxProg: number; out: boolean; holed: boolean; bombed: boolean; finished: boolean; jumped: boolean; dEdge: number; endPos: V; bonus: number; item: number; oppHarm: number; }

// simula UMA tacada num mundo COM os adversários (parados; podem ser empurrados)
function sim(cap: Cap, caps: Cap[], track: TrackModel, dir: V, power01: number): SimOut {
  const shooter = clone(cap);
  shooter.resetTo = vec(cap.pos.x, cap.pos.y);   // sair da pista te devolve pro ponto de onde jogou
  shooter.vel = mul(norm(dir), Math.max(0.06, Math.min(1, power01)) * MAX_POWER); shooter.moving = true;
  const world: Cap[] = [shooter];
  for (const o of caps) { if (o.id === cap.id || o.finished) continue; const oc = clone(o); world.push(oc); }
  let out = false, holed = false, bombed = false, finished = false, jumped = false, bonus = 0, item = 0, maxProg = cap.progress; const harm = new Set<number>();
  const FIXED = 1 / 120; let steps = 0;
  while (anyMoving(world) && steps < 700) {
    const evs = stepWorld(world, track, FIXED);
    for (const e of evs) {
      if (e.capId === shooter.id) {
        if (e.type === 'out') out = true; else if (e.type === 'hole') holed = true; else if (e.type === 'bomb') bombed = true;
        else if (e.type === 'finish') finished = true; else if (e.type === 'bonus') bonus += (e.n || 1); else if (e.type === 'item') item += 1; else if (e.type === 'ramp') jumped = true;
      } else if (e.type === 'out' || e.type === 'hole' || e.type === 'bomb') harm.add(e.capId);   // jogar rival em qualquer perigo conta
    }
    if (shooter.progress > maxProg) maxProg = shooter.progress;
    steps++;
  }
  const n = track.nearest(shooter.pos);
  return { endProg: shooter.progress, maxProg, out, holed, bombed, finished, jumped, dEdge: Math.max(0, n.d - n.half * 0.45), endPos: vec(shooter.pos.x, shooter.pos.y), bonus, item, oppHarm: harm.size };
}

function score(o: SimOut, base: Cap, per: Persona, rival: Cap | null): number {
  let s: number;
  if (o.out) s = base.progress - per.outPenalty + (o.maxProg - base.progress) * 0.12;
  else s = o.endProg - o.dEdge * per.risk * 2.4;
  if (o.holed) s -= 90;         // buraco: nunca de propósito
  if (o.bombed) s -= 120;
  s += o.bonus * 22;
  s += o.item * 20;             // CAOS: ir atrás das caixinhas de power-up vale a pena
  if (o.jumped) s += 10;        // pular a rampa (avança e passa o buraco) é ótimo
  if (o.finished) s += 500;
  // empurrar rival SÓ vale quando o joga num perigo de verdade (buraco/bomba/fora):
  // nada de "bater por bater". E só se NÃO custar o próprio progresso.
  if (o.oppHarm > 0 && per.offense > 0 && o.endProg >= base.progress - 1) s += o.oppHarm * per.offense * 90;
  // PRESA num canto: nenhum peteléco único avança (sair exige "voltar primeiro",
  // que uma busca de 1 jogada não enxerga). Então, presa, o que vale é SAIR DALI:
  // quanto mais longe do ponto atual terminar, melhor — quebra o ciclo do toquinho.
  if (base.stuckTurns >= 2 && !o.out && !o.holed && !o.bombed) s += Math.min(14, dist(o.endPos, base.pos)) * 4;
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

  let best = { dir: dNear, power: 0.2, s: -1e9 }; let bestOut: SimOut | null = null;
  const consider = (dir: V, pw: number) => { const ep = Math.max(0.06, Math.min(1, pw)); const o = sim(cap, caps, track, dir, ep); const sc = score(o, cap, per, rival); if (sc > best.s) { best = { dir, power: ep, s: sc }; bestOut = o; } };

  // BUSCA (fase 1): mira em vários pontos à frente (perto→longe) + desvios laterais,
  // com um leque de ângulos e boa gama de forças. Mais candidatos = jogada melhor.
  const aheads = [8, 13, per.lookahead, per.lookahead + 6];
  const aimDirs: V[] = [tan, dNear, dFar, dodgeL, dodgeR];
  for (const ah of aheads) { const p = track.atArc(Math.min(total, cap.progress + ah)).p; const d = len(sub(p, cap.pos)) < 0.4 ? tan : norm(sub(p, cap.pos)); aimDirs.push(d); }
  const s = per.spread;
  const fan = [0, s * 0.45, -s * 0.45];
  const pows = [0.26, 0.42, 0.56, 0.7, 0.84, 1.0];
  for (const d of aimDirs) for (const a of fan) { const dd = rot(d, a); for (const pw of pows) consider(dd, pw * per.powBias); }

  // MURETINHA NA FRENTE: além do meio, mira em FAIXAS LATERAIS da pista em duas
  // distâncias. Se uma tábua fecha a linha reta, o caminho pelo vão (no canto ou
  // no centro) SEMPRE entra na lista — a simulação escolhe o que PASSA em vez de
  // ficar batendo reto. Não deixa a IA mais rápida, só a impede de "não ver" o muro.
  for (const ah of [7, 12]) {
    const at = track.atArc(Math.min(total, cap.progress + ah));
    const pv = { x: -at.tan.y, y: at.tan.x };
    const hwL = track.nearest(at.p).half;
    for (const f of [-0.72, -0.38, 0.38, 0.72]) {
      const tp = { x: at.p.x + pv.x * hwL * f, y: at.p.y + pv.y * hwL * f };
      const d = len(sub(tp, cap.pos)) < 0.4 ? tan : norm(sub(tp, cap.pos));
      for (const pw of [0.3, 0.5, 0.72]) consider(d, pw);
    }
  }
  // RAMPA à frente: carrega com força pra pular o buraco
  for (const o of track.def.obstacles) {
    if (o.type !== 'jump') continue;
    const op = track.progressOf(vec(o.x, o.y));
    if (op > cap.progress + 1 && op < cap.progress + 28) { const jdir = norm(sub(vec(o.x, o.y), cap.pos)); for (const pw of [0.72, 0.86, 1.0]) consider(jdir, pw); }
  }
  // CAOS/BÔNUS: mira nas caixinhas de item e nos +petelecos alcançáveis à frente
  for (const o of track.def.obstacles) {
    if (o.type !== 'item' && o.type !== 'bonus') continue;
    const op = track.progressOf(vec(o.x, o.y));
    if (op > cap.progress - 3 && op < cap.progress + per.lookahead + 6) {
      const bdir = norm(sub(vec(o.x, o.y), cap.pos));
      for (const pw of [0.35, 0.5, 0.65, 0.8]) consider(bdir, pw);
    }
  }
  // FECHAR A CORRIDA: perto da chegada, mira firme na linha pra cruzar
  if (cap.progress > total - (per.lookahead + 14)) {
    const fp0 = track.atArc(total).p; const fdirC = norm(sub(fp0, cap.pos));
    for (const a of fan) for (const pw of [0.6, 0.75, 0.9, 1.0]) consider(rot(fdirC, a), pw);
  }
  // ofensiva: só tenta o rival quando dá pra jogá-lo num perigo de verdade
  if (rival && per.offense > 0.4) { const rdir = norm(sub(rival.pos, cap.pos)); for (const pw of [0.6, 0.8, 1.0]) consider(rdir, pw); }

  // BUSCA FINA (fase 2): refina em volta do melhor (ângulos e forças finos) —
  // é o que deixa a IA precisa, encaixando a jogada quase perfeita.
  {
    const bd = best.dir, bp = best.power;
    for (const a of [0.04, -0.04, 0.09, -0.09]) for (const dp of [0, 0.06, -0.06]) consider(rot(bd, a), bp + dp);
    for (const dp of [0.03, -0.03, 0.07, -0.07]) consider(bd, bp + dp);
  }

  // ANTI-TRAVAMENTO: se o melhor plano ainda cai/não avança, varre 360° suave.
  const bad = !bestOut || (bestOut as SimOut).out || (bestOut as SimOut).holed || (bestOut as SimOut).bombed || (bestOut as SimOut).endProg <= cap.progress + 0.6;
  if (bad) { for (let dd = 0; dd < 24; dd++) { const a = dd / 24 * Math.PI * 2, dir = { x: Math.cos(a), y: Math.sin(a) }; for (const pw of [0.14, 0.24, 0.38, 0.55]) consider(dir, pw); } }
  // MODO DESTRAVAR: preso há 2+ turnos (o mesmo plano falhou repetido) — varre
  // TUDO com TODAS as forças (uma tabelinha no muro sempre existe) e, se ainda
  // assim, embaralha com jogadas aleatórias simuladas pra quebrar o ciclo.
  if (cap.stuckTurns >= 2) {
    for (let dd = 0; dd < 24; dd++) { const a = dd / 24 * Math.PI * 2, dir = { x: Math.cos(a), y: Math.sin(a) }; for (const pw of [0.3, 0.55, 0.8, 1.0]) consider(dir, pw); }
    for (let k = 0; k < 14; k++) consider(rot(dFar, (Math.random() - 0.5) * 2.4), 0.2 + Math.random() * 0.8);
  }

  const na = (Math.random() - 0.5) * per.noise * 2.2;
  const fdir = rot(best.dir, na);
  const fp = Math.max(0.06, Math.min(1, best.power * (1 + (Math.random() - 0.5) * per.noise)));
  return { dir: fdir, power: fp };
}
