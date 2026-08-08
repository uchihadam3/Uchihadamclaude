// =============================================================================
// engine.js — MOTOR DE COMBATE (simulação pura).
//   - Nenhum acesso ao DOM. Pode rodar 100% em background (node, worker, teste).
//   - Determinístico: RNG semeado e injetado.
//   - Regra-mestra do gambit: a cada tick, varre as linhas de CIMA→BAIXO;
//     a 1ª condição verdadeira executa a ação e PARA a busca daquela unidade.
// =============================================================================

import { SKILLS, HERO_DEFS, ENEMY_DEFS, ENEMY_GAMBITS, FORGE_LEVELS, itemBonuses, MINION_DEF } from './data.js';
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
    type:  def.type || null,                // 'besta'|'humanoide'|'voador'|'morto-vivo'
    side,                                   // 'hero' | 'enemy'
    maxHp, hp: maxHp,
    maxMp, mp: maxMp,
    stats: { atk: b.atk + (opts.atkBonus || 0) + (bon.atk || 0), def: b.def + (bon.def || 0), mag: b.mag + (bon.mag || 0), spd: b.spd + (bon.spd || 0) },
    gambits: opts.gambits || def.gambits || [],
    isBoss: !!opts.isBoss,
    taunt: 0,                               // ticks restantes de provocação (aggro)
    statuses: [],                           // efeitos ativos (dot/stun/buff)
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
  // só os heróis ATIVOS entram na expedição (seleção de party). Fallback: 4 primeiros.
  const active = (state.activeParty && state.activeParty.length)
    ? state.activeParty
    : state.heroes.slice(0, 4).map(h => h.id);
  return active
    .map(id => state.heroes.find(h => h.id === id))
    .filter(Boolean)
    .map(hs => {
      const def = HERO_DEFS.find(h => h.id === hs.id);
      const bonus = { ...itemBonuses(hs.equip) };
      const au = hs.augments || {};
      for(const k in au) bonus[k] = (bonus[k] || 0) + au[k];   // aumentos de licença
      return unitFrom(def, 'hero', {
        uid: def.id,
        gambits: hs.gambits,
        atkBonus: forgeAtkBonus(hs.weaponLevel),
        bonus,
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
    this.corpses = 0;                       // cadáveres de inimigos (p/ Necromante reanimar)
    this._summons = 0;                      // contador de invocações (uid único)
  }

  // Invoca um esqueleto aliado a partir de um cadáver.
  summonMinion(owner){
    const m = unitFrom(MINION_DEF, 'hero', { uid:`minion#${++this._summons}`, gambits: MINION_DEF.gambits });
    this.party.push(m); this.units.push(m);
    return m;
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
    // decai a provocação (aggro) ao fim do tick
    for(const u of this.units){ if(u.taunt > 0) u.taunt--; }
    return this.log;
  }

  // Aggro: se algum alvo-herói está provocando, o inimigo é forçado a mirá-lo.
  tauntRedirect(u, target){
    if(u.side !== 'enemy' || !target) return target;
    const taunters = this.enemiesOf(u).filter(h => h.hp > 0 && h.taunt > 0);
    if(!taunters.length) return target;
    return taunters.reduce((a, b) => (b.taunt > a.taunt ? b : a));
  }

  // Processa os STATUS da unidade no INÍCIO do seu turno:
  //  - DoT (queimadura/veneno/sangramento) causa dano;
  //  - STUN faz pular o turno;
  //  - decai a duração de todos e expira (buffs restauram o atributo).
  // Retorna true se a unidade está atordoada (deve pular a ação).
  processStatuses(u){
    if(!u.statuses || !u.statuses.length) return false;
    let stunned = false;
    for(const st of u.statuses){
      if(st.kind === 'dot' && st.ticks > 0 && u.hp > 0){
        const dmg = Math.max(1, st.dmg || 0);
        u.hp = Math.max(0, u.hp - dmg);
        if(u.hp === 0 && u.side === 'enemy') this.corpses++;   // virou cadáver
        this.log.push({ type:'dot', status:st.id, source:u, target:u, amount:dmg, tick:this.tick, dead: u.hp === 0 });
      }
    }
    const stun = u.statuses.find(s => s.kind === 'stun' && s.ticks > 0);
    if(stun) stunned = true;
    // decai + expira
    for(const st of u.statuses){
      st.ticks--;
      if(st.ticks <= 0 && st.kind === 'buff') u.stats[st.stat] = (u.stats[st.stat] || 0) - (st.amt || 0);
    }
    u.statuses = u.statuses.filter(s => s.ticks > 0);
    return stunned;
  }

  // Resolve UMA unidade: varre gambits topo→baixo, executa a 1ª aplicável, para.
  act(u){
    const stunned = this.processStatuses(u);
    if(u.hp <= 0) return null;               // morreu de DoT no início do turno
    if(stunned){ this.log.push({ type:'stun', source:u, target:u, tick:this.tick }); return null; }
    const ctx = { alliesOf: x => this.alliesOf(x), enemiesOf: x => this.enemiesOf(x), rng: this.rng, corpses: this.corpses };
    for(const g of u.gambits){
      if(g.enabled === false) continue;     // linha DESLIGADA → ignora
      const condFn = CONDITION_FNS[g.condition];
      const skill  = SKILLS[g.action];
      if(!condFn || !skill) continue;       // linha inválida → ignora
      let target = condFn(u, ctx);
      if(!target) continue;                 // condição FALSA → próxima linha
      if(!canPay(u, skill)) continue;       // sem MP → tenta a próxima (fallback)
      // INVOCAÇÃO (Necromante): consome um cadáver e ergue um esqueleto aliado
      if(skill.kind === 'summon'){
        if(this.corpses <= 0) continue;     // sem cadáver → próxima linha
        this.corpses--; u.mp -= (skill.mp || 0);
        const m = this.summonMinion(u);
        const ev = { type:'summon', source:u, target:m, unit:m, skill:skill.id, tick:this.tick };
        this.log.push(ev); return ev;
      }
      // aggro: ataque de inimigo contra herói é redirecionado p/ quem provocou
      if(skill.targetType === 'enemy') target = this.tauntRedirect(u, target);
      const ev = execute(u, skill, target, ctx);
      if(ev.dead && ev.target.side === 'enemy') this.corpses++;  // matou → cadáver
      ev.tick = this.tick;
      this.log.push(ev);
      return ev;                            // 1ª verdadeira executou → PARA
    }
    return null;                            // nenhuma linha aplicável (ocioso)
  }
}
