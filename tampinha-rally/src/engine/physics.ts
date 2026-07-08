// Passo de simulação: move todas as tampinhas em movimento (a lançada + as
// empurradas), aplica atrito por superfície, quiques nas bordas/pedras, colisão
// tampinha-contra-tampinha e detecta gatilhos (buraco/bomba/+3/10/chegada/fora).
// Emite eventos; o GameManager decide as consequências das regras.
import { Cap, V, SURF, len, norm, mul, REST_SPEED, vec } from './core';
import { TrackModel } from './track';

export interface SimEvent {
  type: 'wall' | 'stone' | 'capHit' | 'hole' | 'bomb' | 'bonus' | 'finish' | 'out' | 'rest';
  capId: number; x: number; y: number; power: number; obsIdx?: number; otherId?: number; n?: number;
}

export function anyMoving(caps: Cap[]): boolean { return caps.some(c => c.moving && !c.finished); }

export function stepWorld(caps: Cap[], track: TrackModel, dt: number): SimEvent[] {
  const ev: SimEvent[] = [];
  const d = track.def;

  for (const c of caps) {
    c.hitFlash = Math.max(0, c.hitFlash - dt * 4);
    if (c.finished || !c.moving) continue;
    const prev = vec(c.pos.x, c.pos.y);
    const surf = track.surfaceAt(c.pos);
    const si = SURF[surf];
    const patch = track.patchAt(c.pos);

    // superfícies especiais
    if (surf === 'ramp') {                     // rampa: impulso pra frente
      const dir = patch?.dir != null ? { x: Math.cos(patch.dir), y: Math.sin(patch.dir) } : norm(c.vel);
      c.vel.x += dir.x * 26 * dt; c.vel.y += dir.y * 26 * dt;
    } else if (surf === 'water') {             // água rasa: empurrão leve na correnteza
      const dir = patch?.dir != null ? { x: Math.cos(patch.dir), y: Math.sin(patch.dir) } : { x: 0, y: 0 };
      c.vel.x += dir.x * 7 * dt; c.vel.y += dir.y * 7 * dt;
    }

    // atrito realista: Coulomb (parada previsível) + arrasto viscoso.
    // slide → desliza mais longe; weight → afunda em superfície mole (mais atrito lá);
    // control → um freio suave em baixa velocidade (para certinho onde mira).
    const sp = len(c.vel);
    if (sp > 0) {
      const st = c.stats;
      const soft = si.fric > 12 ? 1 + (st.weight - 1) * 0.55 : 1;      // areia/lama seguram o pesado
      const fric = (si.fric * soft) / st.slide;
      let ns = sp - fric * dt;
      const drag = si.drag / (0.7 + 0.3 * st.slide) + (st.control - 1) * (sp < 6 ? 0.35 : 0.1);
      ns *= (1 - Math.min(0.92, Math.max(0, drag) * dt));
      if (ns < 0) ns = 0;
      const dir = norm(c.vel); c.vel.x = dir.x * ns; c.vel.y = dir.y * ns;
    }

    // integra
    c.pos.x += c.vel.x * dt; c.pos.y += c.vel.y * dt;
    // giro visual: proporcional à velocidade
    const spNow = len(c.vel);
    c.angVel = spNow * 0.9 * (1 / c.stats.stability);
    c.angle += c.angVel * dt;

    // bordas
    const wn = track.collideWalls(c.pos, c.vel, c.radius, 0.42 * c.stats.bounce);
    if (wn) { ev.push({ type: 'wall', capId: c.id, x: c.pos.x, y: c.pos.y, power: len(c.vel) }); c.hitFlash = 1; }

    // obstáculos
    for (let i = 0; i < d.obstacles.length; i++) {
      const o = d.obstacles[i];
      const rr = o.r + (o.type === 'stone' ? c.radius : c.radius * 0.55);
      const dx = c.pos.x - o.x, dy = c.pos.y - o.y;
      if (dx * dx + dy * dy > rr * rr) continue;
      if (o.type === 'stone') {
        const l = Math.hypot(dx, dy) || 1; const nx = dx / l, ny = dy / l;
        const pen = rr - l; c.pos.x += nx * pen; c.pos.y += ny * pen;
        const vn = c.vel.x * nx + c.vel.y * ny;
        if (vn < 0) { const b = 1 + 0.45 * c.stats.bounce; c.vel.x -= b * vn * nx; c.vel.y -= b * vn * ny; }
        ev.push({ type: 'stone', capId: c.id, x: o.x, y: o.y, power: spNow }); c.hitFlash = 1;
      } else if (o.type === 'hole') {
        c.pos.x = c.cpPos.x; c.pos.y = c.cpPos.y; c.vel = vec(); c.moving = false;
        ev.push({ type: 'hole', capId: c.id, x: o.x, y: o.y, power: 0 }); break;
      } else if (o.type === 'bomb') {
        c.pos.x = c.cpPos.x; c.pos.y = c.cpPos.y; c.vel = vec(); c.moving = false;
        ev.push({ type: 'bomb', capId: c.id, x: o.x, y: o.y, power: 0 }); break;
      } else if (o.type === 'bonus') {
        if (!c.consumed.has(i)) { c.consumed.add(i); ev.push({ type: 'bonus', capId: c.id, x: o.x, y: o.y, power: 0, obsIdx: i, n: o.n || 1 }); }
      }
    }
    if (!c.moving) continue;   // caiu em buraco/bomba

    // fora da pista
    if (track.surfaceAt(c.pos) === 'out') {
      c.pos.x = c.resetTo.x; c.pos.y = c.resetTo.y; c.vel = vec(); c.moving = false;
      ev.push({ type: 'out', capId: c.id, x: prev.x, y: prev.y, power: 0 });
      continue;
    }

    // chegada
    if (c.progress > track.total * 0.72 && track.crossedFinish(prev, c.pos)) {
      c.finished = true; c.vel = vec(); c.moving = false;
      ev.push({ type: 'finish', capId: c.id, x: c.pos.x, y: c.pos.y, power: 0 });
      continue;
    }

    c.progress = track.progressOf(c.pos);
    if (len(c.vel) < REST_SPEED) { c.vel = vec(); c.moving = false; ev.push({ type: 'rest', capId: c.id, x: c.pos.x, y: c.pos.y, power: 0 }); }
  }

  resolveCapCollisions(caps, ev);
  return ev;
}

// colisão elástica amortecida entre tampinhas (empurrar/tabelar)
function resolveCapCollisions(caps: Cap[], ev: SimEvent[]): void {
  for (let i = 0; i < caps.length; i++) {
    for (let j = i + 1; j < caps.length; j++) {
      const a = caps[i], b = caps[j];
      if (a.finished || b.finished) continue;
      const dx = b.pos.x - a.pos.x, dy = b.pos.y - a.pos.y;
      const rr = a.radius + b.radius;
      const d2 = dx * dx + dy * dy;
      if (d2 > rr * rr || d2 < 1e-6) continue;
      const dsq = Math.sqrt(d2); const nx = dx / dsq, ny = dy / dsq;
      const pen = rr - dsq;
      const ma = a.stats.weight, mb = b.stats.weight, ms = ma + mb;
      a.pos.x -= nx * pen * (mb / ms); a.pos.y -= ny * pen * (mb / ms);
      b.pos.x += nx * pen * (ma / ms); b.pos.y += ny * pen * (ma / ms);
      const rvx = b.vel.x - a.vel.x, rvy = b.vel.y - a.vel.y;
      const vn = rvx * nx + rvy * ny;
      if (vn > 0) continue;
      const rest = 0.55 * ((a.stats.bounce + b.stats.bounce) / 2);   // tampinhas "quicantes" tabelam mais
      const imp = -(1 + rest) * vn / (1 / ma + 1 / mb);
      const ix = imp * nx, iy = imp * ny;
      a.vel.x -= ix / ma; a.vel.y -= iy / ma;
      b.vel.x += ix / mb; b.vel.y += iy / mb;
      const power = Math.abs(vn);
      if (power > 1.5) {
        if (!a.moving) a.moving = true; if (!b.moving) b.moving = true;
        a.hitFlash = 1; b.hitFlash = 1;
        ev.push({ type: 'capHit', capId: a.id, otherId: b.id, x: (a.pos.x + b.pos.x) / 2, y: (a.pos.y + b.pos.y) / 2, power });
      }
    }
  }
}
