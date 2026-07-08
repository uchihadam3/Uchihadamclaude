// Personalidades de IA. Cada uma mira num ponto adiante do traçado e calibra a
// força pela distância e pelo atrito da superfície (parada previsível), com um
// tempero próprio: cautelosa, agressiva, técnica, caótica, rival.
import { Cap, V, SURF, dist, norm, sub, MAX_POWER } from '../engine/core';
import { TrackModel } from '../engine/track';

export type AIKind = 'cauteloso' | 'agressivo' | 'tecnico' | 'caotico' | 'rival';
export const AI_KINDS: AIKind[] = ['cauteloso', 'agressivo', 'tecnico', 'caotico', 'rival'];
export const AI_LABEL: Record<AIKind, string> = {
  cauteloso: 'Cautelosa', agressivo: 'Agressiva', tecnico: 'Técnica', caotico: 'Caótica', rival: 'Rival',
};

interface Plan { lookahead: number; over: number; noise: number; }
const PLANS: Record<AIKind, Plan> = {
  cauteloso: { lookahead: 7, over: 0.92, noise: 0.03 },
  agressivo: { lookahead: 13, over: 1.16, noise: 0.06 },
  tecnico: { lookahead: 10, over: 1.0, noise: 0.02 },
  caotico: { lookahead: 10, over: 1.0, noise: 0.16 },
  rival: { lookahead: 10, over: 1.06, noise: 0.04 },
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export function aiFlick(cap: Cap, caps: Cap[], track: TrackModel): { dir: V; power: number } {
  const kind = (cap.ai as AIKind) || 'cauteloso';
  const p = { ...PLANS[kind] };
  if (kind === 'caotico') { p.lookahead = rnd(7, 15); p.over = rnd(0.8, 1.35); }

  // alvo padrão: ponto adiante no traçado (puxa de volta para a linha de corrida)
  let target = track.atArc(cap.progress + p.lookahead).p;
  let over = p.over;

  // RIVAL: se um adversário está logo à frente e perto, tenta trombá-lo
  if (kind === 'rival') {
    let best: Cap | null = null, bestD = 13;
    for (const o of caps) {
      if (o.id === cap.id || o.finished) continue;
      const d = dist(cap.pos, o.pos);
      if (d < bestD && o.progress > cap.progress - 4) { best = o; bestD = d; }
    }
    if (best) { target = best.pos; over = 1.2; }
  }

  let dir = norm(sub(target, cap.pos));
  // ruído de mira (radiano) e de força
  const na = (Math.random() - 0.5) * p.noise * 2.4;
  const cs = Math.cos(na), sn = Math.sin(na);
  dir = { x: dir.x * cs - dir.y * sn, y: dir.x * sn + dir.y * cs };

  // força pela física: v = sqrt(2·atrito·distância)·over, limitada
  const a = SURF[track.surfaceAt(cap.pos)].fric;
  const D = Math.max(2, dist(cap.pos, target));
  let speed = Math.sqrt(2 * a * D) * over * rnd(1 - p.noise, 1 + p.noise);
  speed = Math.min(speed, MAX_POWER * 0.98);
  return { dir, power: Math.min(1, speed / MAX_POWER) };
}
