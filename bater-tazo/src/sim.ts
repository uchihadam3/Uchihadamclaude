// FÍSICA DA BATIDA — discos 2.5D determinísticos. A pilha fica no centro; o
// batedor desce num arco e transfere impulso + TORQUE de virada pra cada tazo
// conforme ONDE bateu (centro = pipoca reta / beirada = alavanca, vira mais mas
// espalha). Cada tazo voa balístico girando; a face final vem da rotação real.
import { TazoSpec, byId } from './art';

export const TAZO_R = 1.0;          // raio físico do tazo (unidades de mesa)
export const TAZO_H = 0.07;         // espessura
const GRAV = 26;                    // gravidade (u/s²)

export interface FlyingTazo {
  id: string; spec: TazoSpec;
  owner: number;                    // de quem era na aposta
  x: number; y: number; z: number;  // z = altura do CENTRO
  vx: number; vy: number; vz: number;
  faceUp: boolean;                  // estado ANTES do voo
  phi: number;                      // rotação de virada acumulada no voo (rad)
  om: number;                       // velocidade angular de virada (rad/s)
  axx: number; axy: number;         // eixo de virada (horizontal, unitário)
  spin: number; spinV: number;      // giro no próprio eixo (visual)
  flying: boolean; settled: boolean;
  restZ: number;                    // altura de repouso (chão ou pilha)
}

export interface SlamResult {
  flipped: string[];                // ids que VIRARAM (face pra cima)
  stayed: string[];
  airtime: number;                  // duração do voo mais longo (pro replay/câmera)
}

export function makeStack(ids: string[], owners: number[]): FlyingTazo[] {
  return ids.map((id, i) => ({
    id: id + ':' + i, spec: byId(id), owner: owners[i],
    x: (Math.sin(i * 2.399) * 0.06), y: (Math.cos(i * 2.399) * 0.06),   // pilha levemente torta (charme)
    z: TAZO_H / 2 + i * TAZO_H,
    vx: 0, vy: 0, vz: 0,
    faceUp: false,                   // aposta começa de CARA PRA BAIXO
    phi: 0, om: 0, axx: 1, axy: 0, spin: i * 0.7, spinV: 0,
    flying: false, settled: true, restZ: TAZO_H / 2 + i * TAZO_H,
  }));
}

// A BATIDA. aim = onde o batedor acerta em relação ao centro da pilha (u).
// power = 0..1 (velocidade do gesto). striker = spec do tazo batedor.
// Retorna os impulsos aplicados (mutação no stack) — determinístico.
export function slam(stack: FlyingTazo[], aimX: number, aimY: number, power: number, striker: TazoSpec): void {
  const alive = stack.filter(t => t.settled);
  if (!alive.length) return;
  const topZ = Math.max(...alive.map(t => t.z));
  const P = Math.max(0.12, Math.min(1, power)) * striker.peso;     // batedor pesado bate mais
  const aimD = Math.hypot(aimX, aimY);
  // fator BEIRADA: 0 = centro em cheio, 1 = raspando a borda da pilha
  const edge = Math.min(1, aimD / (TAZO_R * 1.05));
  const dirX = aimD > 0.02 ? aimX / aimD : 1, dirY = aimD > 0.02 ? aimY / aimD : 0;

  // ordena de cima pra baixo: o de cima leva a porrada cheia, os de baixo
  // recebem cada vez menos (a energia atravessa a pilha amortecendo)
  const sorted = alive.slice().sort((a, b) => b.z - a.z);
  sorted.forEach((t, depth) => {
    const spec = t.spec;
    const carry = Math.pow(0.74 - edge * 0.10, depth);             // beirada atravessa um pouco menos a pilha
    if (carry < 0.045) return;                                     // fundo da pilha nem sente
    const E = P * carry * spec.pop;                                // energia que chega neste tazo

    // ONDE a batida pega NESTE tazo (offset do centro dele)
    const hx = aimX - t.x, hy = aimY - t.y;
    const hd = Math.min(TAZO_R, Math.hypot(hx, hy));
    const lever = hd / TAZO_R;                                     // 0 centro … 1 borda = alavanca

    // sobe: energia vira ALTURA (tempo de voo) — centro pipoca mais alto
    t.vz = E * (8.2 - 2.2 * edge) * (0.9 + 0.25 * (1 - lever));
    // espalha: na direção OPOSTA ao lado batido (a pilha "cospe" pra frente)
    const scatter = E * (1.6 + 4.2 * edge) * (0.5 + 0.5 * lever);
    t.vx = dirX * scatter + (Math.sin(t.spin * 9.7) * 0.35) * E;   // ruído determinístico (posição na pilha)
    t.vy = dirY * scatter + (Math.cos(t.spin * 7.3) * 0.35) * E;
    // TORQUE de virada: vem da GEOMETRIA da alavanca (onde pegou) + um tanto da
    // energia. Junto com o tempo de voo (∝ energia), cada profundidade da pilha
    // cai numa "janela" de meia-volta diferente → 1, 2, 3… até todas viram.
    // A "borda" do tazo morde o vizinho e ajuda a girar (stat borda).
    t.om = (1.2 + 5.5 * lever) * (0.6 + 0.5 * edge) * (0.4 + 0.9 * Math.min(1.2, E)) * spec.borda;
    // eixo de virada = perpendicular à direção do tapa naquele ponto
    const al = Math.hypot(hx, hy);
    if (al > 0.03) { t.axx = -hy / al; t.axy = hx / al; }
    else { t.axx = -dirY; t.axy = dirX; }
    t.spinV = E * (2 + 6 * edge);
    t.phi = 0; t.flying = true; t.settled = false;
    t.z = Math.max(t.z, TAZO_H / 2 + 0.01);
  });
}

// integra o voo; devolve true enquanto algo se move
export function step(stack: FlyingTazo[], dt: number): boolean {
  let moving = false;
  for (const t of stack) {
    if (!t.flying) continue;
    moving = true;
    t.x += t.vx * dt; t.y += t.vy * dt;
    t.vz -= GRAV * dt; t.z += t.vz * dt;
    t.phi += t.om * dt; t.spin += t.spinV * dt;
    // arrasto angular no ar (leve)
    t.om *= (1 - 0.25 * dt);
    // pousa?
    if (t.z <= TAZO_H / 2 && t.vz < 0) {
      t.z = TAZO_H / 2;
      // quica se ainda tem energia (e perde rotação no quique)
      if (t.vz < -4.2) {
        t.vz = -t.vz * 0.32; t.vx *= 0.55; t.vy *= 0.55; t.om *= 0.4;
      } else {
        // ASSENTA: resolve a face pela rotação acumulada
        const halfTurns = Math.round(t.phi / Math.PI);
        if (halfTurns % 2 !== 0) t.faceUp = !t.faceUp;
        t.phi = 0; t.om = 0; t.vx = 0; t.vy = 0; t.vz = 0; t.spinV = 0;
        t.flying = false; t.settled = true; t.restZ = TAZO_H / 2;
        // não deixa fugir da mesa
        const d = Math.hypot(t.x, t.y);
        if (d > 7.5) { t.x *= 7.5 / d; t.y *= 7.5 / d; }
      }
    }
  }
  return moving;
}

// simula uma batida completa (headless) — pro teste e pra IA prever
export function simulate(ids: string[], aimX: number, aimY: number, power: number, strikerId: string): SlamResult {
  const stack = makeStack(ids, ids.map(() => 0));
  slam(stack, aimX, aimY, power, byId(strikerId));
  let time = 0;
  while (step(stack, 1 / 120) && time < 8) time += 1 / 120;
  return {
    flipped: stack.filter(t => t.faceUp).map(t => t.id),
    stayed: stack.filter(t => !t.faceUp).map(t => t.id),
    airtime: time,
  };
}
