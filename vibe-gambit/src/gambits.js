// =============================================================================
// gambits.js — A LÓGICA dos gambits.
//   CONDITION_FNS: cada condição vira um SELETOR de alvo -> retorna o alvo
//                  escolhido (unidade) ou null se a condição for falsa.
//   execute():     aplica uma skill de um executor sobre um alvo (dano/cura).
// Puro: opera só sobre objetos de unidade + um ctx injetado (sem DOM, sem RNG global).
// =============================================================================

import { SKILLS } from './data.js';

// -- helpers ------------------------------------------------------------------
const alive = u => u.hp > 0;
const hpPct = u => u.hp / u.maxHp;
// primeiro vivo na fila (fila = ordem posicional => "mais próximo")
const firstAlive = list => list.find(alive) || null;
const minBy = (list, f) => list.reduce((best,u)=> (!best || f(u)<f(best)) ? u : best, null);

// -- CONDIÇÕES (id -> (executor, ctx) => alvo|null) ---------------------------
// ctx expõe: alliesOf(u) (mesmo time, inclui o próprio) e enemiesOf(u) (oposto).
// helper: inimigo vivo de MENOR hp abaixo de um limite% (foca p/ finalizar)
const lowestEnemyBelow = (u, ctx, pct) =>
  minBy(ctx.enemiesOf(u).filter(e => alive(e) && hpPct(e) < pct), e => e.hp);
export const CONDITION_FNS = {
  enemy_nearest:   (u, ctx) => firstAlive(ctx.enemiesOf(u)),
  enemy_any:       (u, ctx) => firstAlive(ctx.enemiesOf(u)),
  enemy_lowest_hp: (u, ctx) => minBy(ctx.enemiesOf(u).filter(alive), e => e.hp),
  enemy_boss:      (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && e.isBoss) || null,
  // HP% numérico do inimigo — mira o mais fraco abaixo do limite
  enemy_hp_50:     (u, ctx) => lowestEnemyBelow(u, ctx, 0.50),
  enemy_hp_30:     (u, ctx) => lowestEnemyBelow(u, ctx, 0.30),
  // por TIPO
  enemy_flying:    (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && e.type === 'voador') || null,
  enemy_undead:    (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && e.type === 'morto-vivo') || null,
  enemy_burning:   (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && hasStatus(e,'burn')) || null,

  ally_hp_75:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.75) || null,
  ally_hp_50:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.50) || null,
  ally_hp_25:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.25) || null,
  ally_dead:       (u, ctx) => ctx.alliesOf(u).find(a => !alive(a)) || null,

  self_hp_50:      (u)      => (hpPct(u) < 0.50 ? u : null),
  self_hp_30:      (u)      => (hpPct(u) < 0.30 ? u : null),
  self_no_buff:    (u)      => ((u.statuses || []).some(s => s.kind === 'buff') ? null : u),
  self_mp_low:     (u)      => (u.mp < 10 ? u : null),
};

// -- STATUS helpers -----------------------------------------------------------
const hasStatus = (u, id) => (u.statuses || []).some(s => s.id === id && s.ticks > 0);
// aplica/renova um status no alvo (refresca a duração se já existir o mesmo id)
function addStatus(target, st){
  target.statuses = target.statuses || [];
  const cur = target.statuses.find(s => s.id === st.id);
  if(cur){ cur.ticks = Math.max(cur.ticks, st.ticks); if('dmg' in st) cur.dmg = st.dmg; return; }
  target.statuses.push({ ...st });
}

// -- CUSTO / EXECUÇÃO ---------------------------------------------------------
export function canPay(unit, skill){ return unit.mp >= (skill.mp || 0); }

// Aplica a skill e RETORNA um evento (para o log/render). Muta hp/mp das unidades.
// ctx.rng() -> [0,1) determinístico, injetado pela engine.
export function execute(unit, skill, target, ctx){
  unit.mp -= (skill.mp || 0);

  // PROVOCAR (taunt): puxa o aggro dos inimigos para si por N ticks.
  if(skill.kind === 'taunt'){
    unit.taunt = Math.max(unit.taunt || 0, skill.duration || 2);
    return { type:'taunt', source:unit, target:unit, skill:skill.id, amount: unit.taunt };
  }

  // BUFF (Fúria/Postura de Ki): aumenta um atributo por N ticks.
  if(skill.kind === 'buff'){
    const b = skill.buff || {};
    unit.stats[b.stat] = (unit.stats[b.stat] || 0) + (b.amt || 0);
    addStatus(unit, { id:'atk_up', kind:'buff', stat:b.stat, amt:b.amt || 0, ticks:(skill.duration || 3) + 1 });
    return { type:'buff', source:unit, target:unit, skill:skill.id, stat:b.stat, amount:b.amt || 0 };
  }

  if(skill.kind === 'heal'){
    const amount = Math.round(skill.power * unit.stats.mag);
    const before = target.hp;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    return { type:'heal', source:unit, target, skill:skill.id, amount: target.hp - before };
  }

  // dano
  const atkStat = unit.stats[skill.stat] ?? unit.stats.atk;
  const isCrit  = ctx.rng() < (0.10 + (skill.critBonus || 0));
  // bônus SAGRADO vs morto-vivo (sinergia Clérigo/Paladino)
  const holyVsUndead = (skill.element === 'holy' && target.type === 'morto-vivo') ? 1.5 : 1;
  let dmg = atkStat * skill.power - target.stats.def * 0.5;
  dmg = Math.max(1, Math.round(dmg * (isCrit ? 1.6 : 1) * holyVsUndead));
  target.hp = Math.max(0, target.hp - dmg);
  const dead = target.hp === 0;
  // aplica status (queimadura/veneno/sangramento/atordoar) se o alvo sobreviveu
  let applied = null;
  if(!dead && skill.applies){
    const a = skill.applies;
    addStatus(target, a.status === 'stun'
      ? { id:'stun', kind:'stun', ticks:a.ticks }
      : { id:a.status, kind:'dot', dmg:a.dmg, ticks:a.ticks });
    applied = a.status;
  }
  return { type:'damage', source:unit, target, skill:skill.id, amount:dmg, crit:isCrit, dead, holy: holyVsUndead>1, applied };
}
