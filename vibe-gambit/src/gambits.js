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
export const CONDITION_FNS = {
  enemy_nearest:   (u, ctx) => firstAlive(ctx.enemiesOf(u)),
  enemy_any:       (u, ctx) => firstAlive(ctx.enemiesOf(u)),
  enemy_lowest_hp: (u, ctx) => minBy(ctx.enemiesOf(u).filter(alive), e => e.hp),
  enemy_boss:      (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && e.isBoss) || null,

  ally_hp_50:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.50) || null,
  ally_hp_25:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.25) || null,
  ally_dead:       (u, ctx) => ctx.alliesOf(u).find(a => !alive(a)) || null,

  self_mp_low:     (u)      => (u.mp < 10 ? u : null),
};

// -- CUSTO / EXECUÇÃO ---------------------------------------------------------
export function canPay(unit, skill){ return unit.mp >= (skill.mp || 0); }

// Aplica a skill e RETORNA um evento (para o log/render). Muta hp/mp das unidades.
// ctx.rng() -> [0,1) determinístico, injetado pela engine.
export function execute(unit, skill, target, ctx){
  unit.mp -= (skill.mp || 0);

  if(skill.kind === 'heal'){
    const amount = Math.round(skill.power * unit.stats.mag);
    const before = target.hp;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    return { type:'heal', source:unit, target, skill:skill.id, amount: target.hp - before };
  }

  // dano
  const atkStat = unit.stats[skill.stat] ?? unit.stats.atk;
  const isCrit  = ctx.rng() < (0.10 + (skill.critBonus || 0));
  let dmg = atkStat * skill.power - target.stats.def * 0.5;
  dmg = Math.max(1, Math.round(dmg * (isCrit ? 1.6 : 1)));
  target.hp = Math.max(0, target.hp - dmg);
  return { type:'damage', source:unit, target, skill:skill.id, amount:dmg, crit:isCrit, dead: target.hp === 0 };
}
