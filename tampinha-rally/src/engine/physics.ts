// Passo de simulação: move todas as tampinhas em movimento (a lançada + as
// empurradas), aplica atrito por superfície, quiques nas bordas/pedras, colisão
// tampinha-contra-tampinha e detecta gatilhos (buraco/bomba/+3/10/chegada/fora).
// Emite eventos; o GameManager decide as consequências das regras.
import { Cap, V, SURF, len, norm, mul, REST_SPEED, MAX_POWER, vec } from './core';
import { TrackModel, bugPos, segsOf } from './track';

export interface SimEvent {
  type: 'wall' | 'stone' | 'capHit' | 'hole' | 'bomb' | 'bonus' | 'finish' | 'out' | 'rest' | 'ramp' | 'land' | 'item' | 'top' | 'bug' | 'band' | 'mill' | 'balloon';
  capId: number; x: number; y: number; power: number; obsIdx?: number; otherId?: number; n?: number;
}

const GRAV = 34;          // gravidade do salto (u/s²)
const RAMP_MIN = 6;       // velocidade mínima na direção da rampa para pular

export function anyMoving(caps: Cap[]): boolean { return caps.some(c => (c.moving || c.airborne) && !c.finished); }

export function stepWorld(caps: Cap[], track: TrackModel, dt: number): SimEvent[] {
  const ev: SimEvent[] = [];
  const d = track.def;

  for (const c of caps) {
    c.hitFlash = Math.max(0, c.hitFlash - dt * 4);
    if (c.finished || (!c.moving && !c.airborne)) continue;
    const prev = vec(c.pos.x, c.pos.y);

    // ---- VOO (salto de rampa): balístico, ignora atrito/buraco/muro/fora ----
    if (c.airborne) {
      c.pos.x += c.vel.x * dt; c.pos.y += c.vel.y * dt;
      c.vz -= GRAV * dt; c.z += c.vz * dt;
      c.angle += 7 * dt;
      if (c.progress > track.total * 0.72 && track.crossedFinish(prev, c.pos)) {
        c.finished = true; c.vel = vec(); c.moving = false; c.airborne = false; c.z = 0;
        ev.push({ type: 'finish', capId: c.id, x: c.pos.x, y: c.pos.y, power: 0 }); continue;
      }
      if (c.z <= 0) { c.z = 0; c.airborne = false; c.vel = mul(c.vel, Math.min(0.92, 0.7 + 0.14 * c.stats.stability)); ev.push({ type: 'land', capId: c.id, x: c.pos.x, y: c.pos.y, power: len(c.vel) }); }   // estável aterrissa melhor (mantém a linha)
      if (c.pos.x >= 0 && c.pos.y >= 0 && c.pos.x <= d.w && c.pos.y <= d.h) c.progress = track.progressOf(c.pos);
      continue;
    }

    const surf = track.surfaceAt(c.pos);
    const si = SURF[surf];
    const patch = track.patchAt(c.pos);

    // superfícies especiais
    if (surf === 'ramp') {                     // tira de aceleração: impulso na direção da pista
      const dir = patch?.dir != null ? { x: Math.cos(patch.dir), y: Math.sin(patch.dir) } : norm(c.vel);
      c.vel.x += dir.x * 30 * dt; c.vel.y += dir.y * 30 * dt;
    } else if (surf === 'push') {              // seta vermelha: freia e joga na direção da seta (trás/lado)
      const dir = patch?.dir != null ? { x: Math.cos(patch.dir), y: Math.sin(patch.dir) } : { x: -c.vel.x, y: -c.vel.y };
      c.vel.x = c.vel.x * 0.93 + dir.x * 30 * dt; c.vel.y = c.vel.y * 0.93 + dir.y * 30 * dt;
    } else if (surf === 'water') {             // água: CORRENTEZA empurra no fluxo (bem sensível)
      const dir = patch?.dir != null ? { x: Math.cos(patch.dir), y: Math.sin(patch.dir) } : { x: 0, y: 0 };
      c.vel.x += dir.x * 10 * dt; c.vel.y += dir.y * 10 * dt;
    } else if (surf === 'magnet' && patch) {   // ÍMÃ: atrai a tampinha (é de metal!) pro centro da placa —
      const dx = patch.x - c.pos.x, dy = patch.y - c.pos.y;      // curva o tiro que passa perto e CAPTURA o tiro fraco
      const l = Math.hypot(dx, dy);
      if (l > 0.05) { c.vel.x += dx / l * 26 * dt; c.vel.y += dy / l * 26 * dt; }
    } else if (surf === 'vortex' && patch) {   // REDEMOINHO: gira a trajetória (o tiro faz CURVA lá dentro).
      // sentido fixo por redemoinho (função da posição): determinístico e justo
      const sgn = Math.sin(patch.x * 3.7 + patch.y * 2.3) >= 0 ? 1 : -1;
      const wob = sgn * 2.0 * dt;
      const cw = Math.cos(wob), sw = Math.sin(wob);
      const vx = c.vel.x * cw - c.vel.y * sw, vy = c.vel.x * sw + c.vel.y * cw;
      c.vel.x = vx; c.vel.y = vy;
    }

    // atrito realista: Coulomb (parada previsível) + arrasto viscoso.
    // slide → desliza mais longe; weight → afunda em superfície mole (mais atrito lá);
    // control → um freio suave em baixa velocidade (para certinho onde mira).
    const sp = len(c.vel);
    if (sp > 0) {
      const st = c.stats;
      const slow = si.fric > 12;                                        // areia/grama/lama: superfícies lentas
      const soft = slow ? 1 + (st.weight - 1) * 0.55 : 1;               // e seguram o pesado
      // POTÊNCIA: força extra pra ATRAVESSAR o pesado (lama/areia) — reduz o atrito
      // SÓ nas superfícies lentas (não vira "ir mais longe": isso é o Desliza).
      const powBreak = slow ? st.power * st.power : 1;
      const fric = (si.fric * soft) / (st.slide * powBreak);
      let ns = sp - fric * dt;
      // control: freio extra em baixa velocidade → para certinho onde você mira (bem perceptível)
      // …MENOS na ESCARCHA: no congelador o freio DERRAPA (Controle quase não pega)
      const ctlF = surf === 'frost' ? 0.3 : 1;
      const drag = si.drag / (0.7 + 0.3 * st.slide) + (st.control - 1) * (sp < 6 ? 0.85 : 0.12) * ctlF;
      ns *= (1 - Math.min(0.92, Math.max(0, drag) * dt));
      if (ns < 0) ns = 0;
      const dir = norm(c.vel); c.vel.x = dir.x * ns; c.vel.y = dir.y * ns;
    }

    // integra
    c.pos.x += c.vel.x * dt; c.pos.y += c.vel.y * dt;
    // GIRO: proporcional à velocidade e MENOR quanto mais estável a tampinha
    const spNow = len(c.vel);
    c.angVel = spNow * 0.9 * (1 / c.stats.stability);
    c.angle += c.angVel * dt;
    // GIRO TEM EFEITO REAL: em chão IRREGULAR (grama > areia > terra), a tampinha
    // girando é DESVIADA da linha — o mato "pega" a borda dela. Quanto mais gira
    // (instável e rápida), mais desvia; a ESTÁVEL mantém a linha. O desvio vem de
    // um campo determinístico (função da posição): justo, replicável e sem sorte.
    if (spNow > 1.2) {
      // só MANCHAS desviam (grama forte, areia leve) — nunca o chão inteiro,
      // senão tiro longo vira loteria e trava a corrida em pista aberta
      // (nunca dar rough a um CHÃO inteiro — tiro longo vira loteria e trava a corrida;
      // o tapete freia e mata a tabelinha, mas NÃO desvia: chão liso de rolar)
      const rough = surf === 'grass' ? 1.0 : surf === 'sand' ? 0.45 : 0;
      if (rough > 0) {
        // campo de ONDA LONGA (período ~20u): o desvio mantém o sentido ao longo
        // de um trecho — puxa DE VERDADE pra um lado (freq alta se cancelaria)
        const field = Math.sin(c.pos.x * 0.31 + c.pos.y * 0.23 + 1.7);           // -1..1, fixo no mundo
        const wob = field * rough * c.angVel * 0.095 * dt;                       // rad neste passo
        const cw = Math.cos(wob), sw = Math.sin(wob);
        const vx = c.vel.x * cw - c.vel.y * sw, vy = c.vel.x * sw + c.vel.y * cw;
        c.vel.x = vx; c.vel.y = vy;
      }
    }

    // bordas — TABELA VIVA/MORTA: feltro (sinuca) e aço devolvem o quique com
    // força (dá pra tabelar de propósito!); o tapete AMORTECE (tabelinha morre)
    const bMul = surf === 'felt' ? 1.5 : surf === 'metal' ? 1.35 : surf === 'carpet' ? 0.45 : 1;
    // PEDRAS são sempre vivas (mesmo no tapete): pedra redonda repele — senão a
    // tampinha encaixa no vão entre duas pedras e fica presa pra sempre
    const sMul = Math.max(1, bMul);
    const wn = track.collideWalls(c.pos, c.vel, c.radius, Math.min(0.95, 0.42 * c.stats.bounce * bMul));
    if (wn) { ev.push({ type: 'wall', capId: c.id, x: c.pos.x, y: c.pos.y, power: len(c.vel) }); c.hitFlash = 1; }

    // obstáculos
    for (let i = 0; i < d.obstacles.length; i++) {
      const o = d.obstacles[i];
      // ---- ELÁSTICO e CATAVENTO: colisão por SEGMENTO (não por círculo) ----
      if (o.type === 'band' || o.type === 'mill') {
        for (const sg of segsOf(o)) {
          const abx = sg.b.x - sg.a.x, aby = sg.b.y - sg.a.y; const l2 = abx * abx + aby * aby || 1e-6;
          let tt = ((c.pos.x - sg.a.x) * abx + (c.pos.y - sg.a.y) * aby) / l2; tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
          const cx2 = sg.a.x + abx * tt, cy2 = sg.a.y + aby * tt;
          const dseg = Math.hypot(c.pos.x - cx2, c.pos.y - cy2);
          const thick = 0.2 + c.radius;
          if (dseg >= thick) continue;
          let nx = c.pos.x - cx2, ny = c.pos.y - cy2; const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
          c.pos.x += nx * (thick - dseg + 0.01); c.pos.y += ny * (thick - dseg + 0.01);
          const vn = c.vel.x * nx + c.vel.y * ny;
          if (vn < 0) {
            if (o.type === 'band') {
              // ESTILINGUE: a liguinha estica e devolve COM GANHO — dá pra usar a favor!
              const boost = Math.min(1.55, 1.1 + 0.03 * Math.abs(vn));
              c.vel.x -= (1 + boost) * vn * nx; c.vel.y -= (1 + boost) * vn * ny;
              const sp2 = len(c.vel), capV = MAX_POWER * 1.05;
              if (sp2 > capV) { c.vel.x *= capV / sp2; c.vel.y *= capV / sp2; }
              ev.push({ type: 'band', capId: c.id, x: cx2, y: cy2, power: Math.abs(vn) });
            } else {
              // PÁ DO CATAVENTO: quica firme + empurrãozinho no sentido do giro
              c.vel.x -= 1.55 * vn * nx; c.vel.y -= 1.55 * vn * ny;
              c.vel.x += -ny * 2.2; c.vel.y += nx * 2.2;
              ev.push({ type: 'mill', capId: c.id, x: cx2, y: cy2, power: Math.abs(vn) });
            }
            c.hitFlash = 1;
          }
        }
        continue;
      }
      // joaninha anda: o círculo dela fica onde ELA está agora
      const oxy = o.type === 'bug' ? bugPos(o) : o;
      const rr = o.r + (o.type === 'stone' || o.type === 'top' || o.type === 'bug' ? c.radius : c.radius * 0.55);
      const dx = c.pos.x - oxy.x, dy = c.pos.y - oxy.y;
      if (dx * dx + dy * dy > rr * rr) continue;
      if (o.type === 'jump') {                 // RAMPA DE SALTO: com velocidade, decola e voa
        const rdir = o.dir != null ? { x: Math.cos(o.dir), y: Math.sin(o.dir) } : norm(c.vel);
        const along = c.vel.x * rdir.x + c.vel.y * rdir.y;
        if (along > RAMP_MIN) {
          c.airborne = true; c.z = 0.02; c.vz = Math.min(14, 6 + along * 0.5);
          c.vel.x = (c.vel.x * 0.55 + rdir.x * along * 0.5) * 1.12;
          c.vel.y = (c.vel.y * 0.55 + rdir.y * along * 0.5) * 1.12;
          ev.push({ type: 'ramp', capId: c.id, x: o.x, y: o.y, power: along }); break;
        }
        continue;   // devagar: não pula (provavelmente cai no buraco à frente)
      }
      if (o.type === 'stone') {
        const l = Math.hypot(dx, dy) || 1; const nx = dx / l, ny = dy / l;
        const pen = rr - l; c.pos.x += nx * pen; c.pos.y += ny * pen;
        const vn = c.vel.x * nx + c.vel.y * ny;
        if (vn < 0) { const b = 1 + Math.min(0.95, 0.45 * c.stats.bounce * sMul); c.vel.x -= b * vn * nx; c.vel.y -= b * vn * ny; }
        ev.push({ type: 'stone', capId: c.id, x: o.x, y: o.y, power: spNow }); c.hitFlash = 1;
      } else if (o.type === 'top') {
        // PIÃO girando: rebate como pedra E chuta pro LADO (tangencial) — pinball!
        const l = Math.hypot(dx, dy) || 1; const nx = dx / l, ny = dy / l;
        const pen = rr - l; c.pos.x += nx * pen; c.pos.y += ny * pen;
        const vn = c.vel.x * nx + c.vel.y * ny;
        if (vn < 0) {
          const b = 1 + 0.55 * c.stats.bounce;
          c.vel.x -= b * vn * nx; c.vel.y -= b * vn * ny;
          c.vel.x += -ny * 5.5; c.vel.y += nx * 5.5;      // o giro do pião arremessa de lado
          ev.push({ type: 'top', capId: c.id, x: oxy.x, y: oxy.y, power: Math.abs(vn) }); c.hitFlash = 1;
        }
      } else if (o.type === 'bug') {
        // JOANINHA: esbarrão fofo — desvia de leve e rouba um pouco de embalo
        const l = Math.hypot(dx, dy) || 1; const nx = dx / l, ny = dy / l;
        const pen = rr - l; c.pos.x += nx * pen; c.pos.y += ny * pen;
        const vn = c.vel.x * nx + c.vel.y * ny;
        if (vn < 0) {
          c.vel.x -= 1.25 * vn * nx; c.vel.y -= 1.25 * vn * ny;
          c.vel.x *= 0.85; c.vel.y *= 0.85;
          ev.push({ type: 'bug', capId: c.id, x: oxy.x, y: oxy.y, power: Math.abs(vn) });
        }
      } else if (o.type === 'balloon') {
        // BEXIGA D'ÁGUA: estoura no primeiro toque — SPLASH empurra todo mundo perto.
        // (o manager marca 'popped' e deixa a poça; na simulação da IA só vale o empurrão)
        if (o.popped || c.consumed.has(i)) continue;
        c.consumed.add(i);
        ev.push({ type: 'balloon', capId: c.id, x: o.x, y: o.y, power: len(c.vel), obsIdx: i });
        for (const cc of caps) {
          if (cc.finished) continue;
          const ddx = cc.pos.x - o.x, ddy = cc.pos.y - o.y; const dd = Math.hypot(ddx, ddy);
          if (dd > 4.2 || dd < 1e-4) continue;
          const push = (11 - dd * 2.2);
          cc.vel.x += (ddx / dd) * push; cc.vel.y += (ddy / dd) * push;
          if (!cc.moving && !cc.finished) cc.moving = true;
          cc.hitFlash = 1;
        }
      } else if (o.type === 'hole') {
        if (c.shield) { c.shield = false; ev.push({ type: 'item', capId: c.id, x: o.x, y: o.y, power: -1 }); continue; }   // escudo salva do buraco
        c.pos.x = c.cpPos.x; c.pos.y = c.cpPos.y; c.vel = vec(); c.moving = false;
        ev.push({ type: 'hole', capId: c.id, x: o.x, y: o.y, power: 0 }); break;
      } else if (o.type === 'bomb') {
        c.pos.x = c.cpPos.x; c.pos.y = c.cpPos.y; c.vel = vec(); c.moving = false;
        ev.push({ type: 'bomb', capId: c.id, x: o.x, y: o.y, power: 0 }); break;
      } else if (o.type === 'bonus') {
        // bônus vale UMA vez por tampinha na corrida TODA (nada de farmar o mesmo +3)
        if (!c.consumed.has(i) && !c.takenBonus.has(i)) { c.consumed.add(i); c.takenBonus.add(i); ev.push({ type: 'bonus', capId: c.id, x: o.x, y: o.y, power: 0, obsIdx: i, n: o.n || 1 }); }
      } else if (o.type === 'item') {
        if (!c.consumed.has(i)) { c.consumed.add(i); ev.push({ type: 'item', capId: c.id, x: o.x, y: o.y, power: 0, obsIdx: i }); }   // caixa de item (Caos)
      }
    }
    if (!c.moving) continue;   // caiu em buraco/bomba

    // fora da pista
    if (track.surfaceAt(c.pos) === 'out') {
      if (c.shield) {   // escudo salva da queda: para na beira, dentro da pista
        c.shield = false; c.pos.x = prev.x; c.pos.y = prev.y; c.vel = vec(); c.moving = false;
        ev.push({ type: 'item', capId: c.id, x: prev.x, y: prev.y, power: -1 }); continue;
      }
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
      // massa efetiva = peso^1.6: a pesada quase não sai do lugar; a leve voa longe
      const ma = Math.pow(a.stats.weight, 1.6), mb = Math.pow(b.stats.weight, 1.6), ms = ma + mb;
      a.pos.x -= nx * pen * (mb / ms); a.pos.y -= ny * pen * (mb / ms);
      b.pos.x += nx * pen * (ma / ms); b.pos.y += ny * pen * (ma / ms);
      const rvx = b.vel.x - a.vel.x, rvy = b.vel.y - a.vel.y;
      const vn = rvx * nx + rvy * ny;
      if (vn > 0) continue;
      const rest = 0.55 * ((a.stats.bounce + b.stats.bounce) / 2);   // tampinhas "quicantes" tabelam mais
      // POTÊNCIA: quem chega mais rápido (o "atacante") bate MAIS FORTE — joga o outro mais longe
      const punch = (len(a.vel) >= len(b.vel) ? a.stats.power : b.stats.power);
      const imp = -(1 + rest) * vn / (1 / ma + 1 / mb) * punch;
      const ix = imp * nx, iy = imp * ny;
      // grip (aderência): quem tem mais firmeza é empurrado menos (difícil de jogar pra fora)
      a.vel.x -= (ix / ma) / a.stats.grip; a.vel.y -= (iy / ma) / a.stats.grip;
      b.vel.x += (ix / mb) / b.stats.grip; b.vel.y += (iy / mb) / b.stats.grip;
      const power = Math.abs(vn);
      if (power > 1.5) {
        if (!a.moving) a.moving = true; if (!b.moving) b.moving = true;
        a.hitFlash = 1; b.hitFlash = 1;
        ev.push({ type: 'capHit', capId: a.id, otherId: b.id, x: (a.pos.x + b.pos.x) / 2, y: (a.pos.y + b.pos.y) / 2, power });
      }
    }
  }
}
