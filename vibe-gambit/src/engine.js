// =============================================================================
// engine.js — MOTOR DE COMBATE (simulação pura).
//   - Nenhum acesso ao DOM. Pode rodar 100% em background (node, worker, teste).
//   - Determinístico: RNG semeado e injetado.
//   - Regra-mestra do gambit: a cada tick, varre as linhas de CIMA→BAIXO;
//     a 1ª condição verdadeira executa a ação e PARA a busca daquela unidade.
// =============================================================================

import { SKILLS, HERO_DEFS, ENEMY_DEFS, ENEMY_GAMBITS, FORGE_LEVELS, itemBonuses } from './data.js';
import { CONDITION_FNS, canPay, execute } from './gambits.js';

// --- RNG determinístico (mulberry32) ----------------------------------------
export function makeRng(seed = 12345){
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Construção de UNIDADES de combate a partir de definições ----------------
// Unidade = "instância viva" no combate (hp/mp mutáveis + stats já resolvidos).
export function unitFrom(def, side, opts = {}){
  const b = def.base;
  const bon = opts.bonus || {};              // bônus de equipamento (atk/def/mag/spd/hp/mp)
  const maxHp = b.hp + (bon.hp || 0);
  const maxMp = b.mp + (bon.mp || 0);
  return {
    uid:   opts.uid || def.id,
    id:    def.id,
    name:  def.name,
    sprite:def.sprite,
    side,                                   // 'hero' | 'enemy'
    maxHp, hp: maxHp,
    maxMp, mp: maxMp,
    stats: { atk: b.atk + (opts.atkBonus || 0) + (bon.atk || 0), def: b.def + (bon.def || 0), mag: b.mag + (bon.mag || 0), spd: b.spd + (bon.spd || 0) },
    gambits: opts.gambits || def.gambits || [],
    isBoss: !!opts.isBoss,
  };
}

// Soma do bônus de ATK da forja até um nível.
export function forgeAtkBonus(level){
  let sum = 0;
  for(let i = 0; i < level; i++) sum += (FORGE_LEVELS[i]?.atk || 0);
  return sum;
}

// Monta o party de heróis a partir do ESTADO do jogador (state.heroes).
export function buildParty(state){
  return state.heroes.map(hs => {
    const def = HERO_DEFS.find(h => h.id === hs.id);
    return unitFrom(def, 'hero', {
      uid: def.id,
      gambits: hs.gambits,
      atkBonus: forgeAtkBonus(hs.weaponLevel),
      bonus: itemBonuses(hs.equip),
    });
  });
}

// Monta uma leva de inimigos a partir de ids.
export function buildWave(enemyIds){
  return enemyIds.map((id, i) =>
    unitFrom(ENEMY_DEFS[id], 'enemy', { uid: `${id}#${i}`, gambits: ENEMY_GAMBITS })
  );
}

// --- COMBATE -----------------------------------------------------------------
export class Combat {
  constructor(party, enemies, { seed = 12345 } = {}){
    this.party   = party;                   // unidades side='hero'
    this.enemies = enemies;                 // unidades side='enemy'
    this.units   = [...party, ...enemies];
    this.rng     = makeRng(seed);
    this.tick    = 0;
    this.log     = [];                      // histórico de eventos (para a View)
  }

  alliesOf(u){ return u.side === 'hero' ? this.party   : this.enemies; }
  enemiesOf(u){ return u.side === 'hero' ? this.enemies : this.party;  }

  teamAlive(list){ return list.some(u => u.hp > 0); }
  isOver(){ return !this.teamAlive(this.party) || !this.teamAlive(this.enemies); }
  outcome(){ if(!this.isOver()) return null; return this.teamAlive(this.party) ? 'victory' : 'defeat'; }

  // Avança UM tick. Cada unidade viva age uma vez, na ordem de velocidade (spd).
  step(){
    if(this.isOver()) return this.log;
    this.tick++;
    const order = this.units.filter(u => u.hp > 0).sort((a, b) => b.stats.spd - a.stats.spd);
    for(const u of order){
      if(u.hp <= 0) continue;               // pode ter morrido neste mesmo tick
      if(this.isOver()) break;
      this.act(u);
    }
    return this.log;
  }

  // Resolve UMA unidade: varre gambits topo→baixo, executa a 1ª aplicável, para.
  act(u){
    const ctx = { alliesOf: x => this.alliesOf(x), enemiesOf: x => this.enemiesOf(x), rng: this.rng };
    for(const g of u.gambits){
      if(g.enabled === false) continue;     // linha DESLIGADA → ignora
      const condFn = CONDITION_FNS[g.condition];
      const skill  = SKILLS[g.action];
      if(!condFn || !skill) continue;       // linha inválida → ignora
      const target = condFn(u, ctx);
      if(!target) continue;                 // condição FALSA → próxima linha
      if(!canPay(u, skill)) continue;       // sem MP → tenta a próxima (fallback)
      const ev = execute(u, skill, target, ctx);
      ev.tick = this.tick;
      this.log.push(ev);
      return ev;                            // 1ª verdadeira executou → PARA
    }
    return null;                            // nenhuma linha aplicável (ocioso)
  }
}
