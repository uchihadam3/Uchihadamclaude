// ---------------------------------------------------------------------------
// IA COMANDANTE — o "outro jogador". Prioridades por tique de pensamento:
// 1) evoluir de era  2) PÂNICO defensivo quando o inimigo entra no meu terço
// (counter da maioria, na hora)  3) defesa preventiva na faixa quente
// 4) economia (gerador cedo, torreta na faixa ameaçada, upgrades)
// 5) ATAQUE CONCENTRADO: empilha unidades na MINHA melhor faixa e faz ondas
// com tanque na frente — romper vale mais que espalhar.
// ---------------------------------------------------------------------------
import { Game } from './sim';
import { UnitKind } from './toy';
import { SLOT_INFO } from './units';

export type Difficulty = 'facil' | 'medio' | 'dificil';
const CFG: Record<Difficulty, { think: number; income: number; noise: number; reserve: number }> = {
  facil: { think: 2.1, income: 0.82, noise: 0.35, reserve: 0 },
  medio: { think: 1.35, income: 1.0, noise: 0.16, reserve: 16 },
  dificil: { think: 0.9, income: 1.14, noise: 0.06, reserve: 26 },
};

const COUNTER_OF: Record<UnitKind, UnitKind> = { arco: 'espada', tanque: 'arco', espada: 'tanque', veloz: 'espada' };

export class Commander {
  private t = 0;
  private waveSaving = false;
  constructor(private g: Game, public diff: Difficulty) {
    g.incomeMul[1] = CFG[diff].income;
  }
  update(dt: number): void {
    if (this.g.over) return;
    this.t -= dt;
    if (this.t > 0) return;
    const cfg = CFG[this.diff];
    this.t = cfg.think * (1 + (Math.random() - 0.5) * 0.4);
    if (Math.random() < cfg.noise) return;               // "distraiu"
    const g = this.g;

    // 1) evoluir é sempre a melhor jogada (Fácil demora de propósito)
    if (g.canEvolve(1) && (this.diff !== 'facil' || Math.random() < 0.4)) {
      g.evolve(1, Math.random() < 0.5 ? 'pirata' : 'robo');
      return;
    }

    // ameaça POR PROXIMIDADE: inimigo perto da minha base pesa muito mais
    const threat: number[] = [0, 0, 0]; const advance: number[] = [-1e9, -1e9, -1e9];
    for (const u of g.units) {
      if (u.dead || u.side !== 0) continue;
      const depth = Math.max(0, u.x + 60) / 320;                 // ~0 no meio → 1 na minha porta
      threat[u.lane] += (u.st.dmg / u.st.rate + u.hp * 0.05) * (0.5 + depth * 2.4);
      advance[u.lane] = Math.max(advance[u.lane], u.x);
    }
    for (let l = 0; l < 3; l++) threat[l] -= g.lanePower(1, l) * 0.8;
    let hotLane = 0; for (let l = 1; l < 3; l++) if (threat[l] > threat[hotLane]) hotLane = l;

    // 2) PÂNICO: inimigo avançando → defesa ESTÁTICA primeiro (muralha segura o
    // bolo, arqueiro atrás derrete, torreta ajuda). Nascer soldadinho sozinho no
    // meio do bolo inimigo é doar XP — só compra corpo-a-corpo em último caso.
    if (advance[hotLane] > 40 && threat[hotLane] > 0) {
      if (threat[hotLane] > 30 && g.canSpecial(1)) { g.useSpecial(1); return; }
      const sl = g.slots[1][hotLane];
      if (!sl.kind && g.gold[1] >= SLOT_INFO.muralha.cost) { g.build(1, hotLane, 'muralha'); return; }
      if (sl.kind === 'muralha' && sl.lvl === 1 && sl.wallHp < 140 && g.gold[1] >= SLOT_INFO.muralha.up) { g.upgrade(1, hotLane); return; }
      if (g.canBuy(1, 'arco')) { g.buy(1, 'arco', hotLane); return; }        // atira por trás da muralha
      const maj = g.laneMajorityKind(0, hotLane);
      const kind = maj ? COUNTER_OF[maj] : 'espada';
      if (advance[hotLane] > 150 && g.canBuy(1, kind)) { g.buy(1, kind, hotLane); return; }
      return;
    }

    // 3) defesa preventiva na faixa quente (torreta > unidade avulsa)
    if (threat[hotLane] > 12) {
      const sl = g.slots[1][hotLane];
      if (!sl.kind && g.gold[1] >= SLOT_INFO.torreta.cost) { g.build(1, hotLane, 'torreta'); return; }
      if (g.canBuy(1, 'arco')) { g.buy(1, 'arco', hotLane); return; }
    }

    // 4) economia: gerador cedo, torreta onde aperta, upgrade quando sobra
    const emptyIdx = g.slots[1].findIndex(s => !s.kind);
    const gens = g.slots[1].filter(s => s.kind === 'gerador').length;
    if (gens < (this.diff === 'dificil' ? 2 : 1) && emptyIdx >= 0 && g.gold[1] > SLOT_INFO.gerador.cost + 26) {
      g.build(1, emptyIdx, 'gerador'); return;
    }
    if (emptyIdx >= 0 && !g.slots[1][hotLane].kind && threat[hotLane] > 2 && g.gold[1] > SLOT_INFO.torreta.cost + cfg.reserve) {
      g.build(1, hotLane, 'torreta'); return;
    }
    if (g.gold[1] > 190) {
      const upIdx = g.slots[1].findIndex(s => s.kind && s.lvl === 1);
      if (upIdx >= 0 && g.upgrade(1, upIdx)) return;
    }

    // 5) ATAQUE CONCENTRADO: empilha na MINHA faixa mais forte (romper > espalhar)
    let pushLane = 0, pv = -1e9;
    for (let l = 0; l < 3; l++) { const v = g.lanePower(1, l) - g.lanePower(0, l); if (v > pv) { pv = v; pushLane = l; } }
    const wave = this.diff === 'dificil' ? 115 : 95;
    if (this.waveSaving) {
      if (g.gold[1] >= wave) {
        g.buy(1, 'tanque', pushLane);
        if (g.canBuy(1, 'arco')) g.buy(1, 'arco', pushLane);
        this.waveSaving = false;
      }
      return;                                            // segura a grana até a onda
    }
    if (Math.random() < 0.35) { this.waveSaving = true; return; }
    // pressão contínua na faixa de push
    if (g.gold[1] > 30 + cfg.reserve) {
      const k: UnitKind = Math.random() < 0.3 ? 'arco' : Math.random() < 0.25 ? 'veloz' : 'espada';
      if (g.canBuy(1, k)) g.buy(1, k, pushLane);
    }
  }
}
