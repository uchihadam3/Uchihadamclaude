// =============================================================================
// engine.js — MOTOR DE COMBATE (simulação pura).
//   - Nenhum acesso ao DOM. Pode rodar 100% em background (node, worker, teste).
//   - Determinístico: RNG semeado e injetado.
//   - Regra-mestra do gambit: a cada tick, varre as linhas de CIMA→BAIXO;
//     a 1ª condição verdadeira executa a ação e PARA a busca daquela unidade.
// =============================================================================

import { SKILLS, HERO_DEFS, ENEMY_DEFS, ENEMY_GAMBITS, FORGE_LEVELS, itemBonuses, MINION_DEF } from './data.js';
import { CONDITION_FNS, canPay, execute } from './gambits.js';

// status que fazem a unidade PERDER o turno
const CONTROL_KINDS = new Set(['stun','sleep','immobile']);

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
  constructor(party, enemies, { seed = 12345, charges } = {}){
    const opts = { charges };
    this.party   = party;                   // unidades side='hero'
    this.enemies = enemies;                 // unidades side='enemy'
    this.units   = [...party, ...enemies];
    this.rng     = makeRng(seed);
    this.tick    = 0;
    this.log     = [];                      // histórico de eventos (para a View)
    this.corpses = 0;                       // cadáveres de inimigos (p/ Necromante reanimar)
    this._summons = 0;                      // contador de invocações (uid único)
    this.charges = opts.charges || {};      // cargas de consumíveis (por expedição)
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
    // fim do tick: decai aggro + regenera MP passivamente (heróis casters se sustentam)
    for(const u of this.units){
      if(u.taunt > 0) u.taunt--;
      if(u.hp > 0 && u.maxMp > 0 && u.mp < u.maxMp){
        u.mp = Math.min(u.maxMp, u.mp + Math.max(1, Math.round(u.maxMp * 0.06)));
      }
    }
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
  //  - DoT causa dano · REGEN cura · controle (stun/sono/imobilizar) pula o turno;
  //  - decai a duração de todos e expira (buffs restauram o atributo).
  // Retorna { skip, skipKind, confused, silenced }.
  processStatuses(u){
    if(!u.statuses || !u.statuses.length) return {};
    for(const st of u.statuses){
      if(st.ticks <= 0 || u.hp <= 0) continue;
      if(st.kind === 'dot'){
        const dmg = Math.max(1, st.dmg || 0);
        u.hp = Math.max(0, u.hp - dmg);
        if(u.hp === 0 && u.side === 'enemy') this.corpses++;   // virou cadáver
        this.log.push({ type:'dot', status:st.id, source:u, target:u, amount:dmg, tick:this.tick, dead: u.hp === 0 });
      } else if(st.kind === 'regen' && u.hp < u.maxHp){
        const heal = Math.max(1, st.amt || 0); const before = u.hp;
        u.hp = Math.min(u.maxHp, u.hp + heal);
        this.log.push({ type:'regen', status:'regen', source:u, target:u, amount: u.hp - before, tick:this.tick });
      }
    }
    // impedimentos (checados ANTES de decair a duração)
    const ctrl = u.statuses.find(s => s.ticks > 0 && CONTROL_KINDS.has(s.kind));
    const confused = u.statuses.some(s => s.ticks > 0 && s.kind === 'confuse');
    const silenced = u.statuses.some(s => s.ticks > 0 && s.kind === 'silence');
    // decai + expira
    for(const st of u.statuses){
      st.ticks--;
      if(st.ticks <= 0 && st.kind === 'buff') u.stats[st.stat] = (u.stats[st.stat] || 0) - (st.amt || 0);
    }
    u.statuses = u.statuses.filter(s => s.ticks > 0);
    return { skip: !!ctrl, skipKind: ctrl && ctrl.id, confused, silenced };
  }

  // Resolve UMA unidade: varre gambits topo→baixo, executa a 1ª aplicável, para.
  act(u){
    const ss = this.processStatuses(u);
    if(u.hp <= 0) return null;               // morreu de DoT no início do turno
    if(ss.skip){ this.log.push({ type:'incap', status: ss.skipKind || 'stun', source:u, target:u, tick:this.tick }); return null; }
    const ctx = { alliesOf: x => this.alliesOf(x), enemiesOf: x => this.enemiesOf(x), rng: this.rng, corpses: this.corpses };
    // CONFUSÃO: ignora os gambits e ataca um alvo aleatório (aliado ou inimigo)
    if(ss.confused){
      const pool = this.units.filter(x => x.hp > 0 && x !== u);
      if(!pool.length) return null;
      const t = pool[Math.floor(this.rng() * pool.length)];
      const ev = execute(u, SKILLS.basic_attack, t, ctx);
      if(ev.dead && ev.target.side === 'enemy') this.corpses++;
      ev.tick = this.tick; ev.confused = true; this.log.push(ev); return ev;
    }
    for(const g of u.gambits){
      if(g.enabled === false) continue;     // linha DESLIGADA → ignora
      const condFn = CONDITION_FNS[g.condition];
      const skill  = SKILLS[g.action];
      if(!condFn || !skill) continue;       // linha inválida → ignora
      if(ss.silenced && (skill.mp || 0) > 0) continue;  // SILÊNCIO: só ações sem MP
      let target = condFn(u, ctx);
      if(!target) continue;                 // condição FALSA → próxima linha
      if(!canPay(u, skill)) continue;       // sem MP → tenta a próxima (fallback)
      // CONSUMÍVEL: gasta uma carga (por expedição) e aplica o efeito no aliado-alvo
      if(skill.kind === 'item'){
        if((this.charges[skill.item] || 0) <= 0) continue;   // sem carga → próxima linha
        this.charges[skill.item]--;
        let ev;
        if(skill.heal){ const b = target.hp; target.hp = Math.min(target.maxHp, target.hp + skill.heal); ev = { type:'heal', source:u, target, skill:skill.id, amount: target.hp - b }; }
        else if(skill.restoreMp){ const b = target.mp; target.mp = Math.min(target.maxMp, target.mp + skill.restoreMp); ev = { type:'item', source:u, target, skill:skill.id, amount: target.mp - b, mp:true }; }
        else if(skill.cleanse){ ev = execute(u, { kind:'cleanse', id:skill.id, cure:'all' }, target, ctx); }
        else { ev = { type:'item', source:u, target, skill:skill.id, amount:0 }; }
        ev.tick = this.tick; ev.item = skill.item; this.log.push(ev); return ev;
      }
      // INVOCAÇÃO (Necromante): consome um cadáver e ergue um esqueleto aliado
      if(skill.kind === 'summon'){
        if(this.corpses <= 0) continue;     // sem cadáver → próxima linha
        this.corpses--; u.mp -= (skill.mp || 0);
        const m = this.summonMinion(u);
        const ev = { type:'summon', source:u, target:m, unit:m, skill:skill.id, tick:this.tick };
        this.log.push(ev); return ev;
      }
      // ÁREA (AoE): acerta o time inteiro; paga o MP uma vez só
      if(skill.aoe){
        const team = skill.targetType === 'ally'
          ? this.alliesOf(u).filter(a => skill.kind === 'revive' ? true : a.hp > 0)
          : this.enemiesOf(u).filter(e => e.hp > 0);
        if(!team.length) continue;
        u.mp -= (skill.mp || 0);
        const single = { ...skill, mp:0, aoe:false };
        let last = null;
        for(const tg of team){
          const ev = execute(u, single, tg, ctx); ev.tick = this.tick; ev.aoe = true;
          if(ev.dead && ev.target.side === 'enemy') this.corpses++;
          this.log.push(ev); last = ev;
        }
        return last;
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
