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
  enemy_poisoned:  (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && hasStatus(e,'poison')) || null,
  enemy_stunned:   (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && hasControl(e)) || null,
  enemy_slowed:    (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && hasStatus(e,'slow')) || null,
  enemy_buffed:    (u, ctx) => ctx.enemiesOf(u).find(e => alive(e) && hasStatus(e,'buff')) || null,

  ally_hp_75:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.75) || null,
  ally_hp_50:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.50) || null,
  ally_hp_25:      (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && hpPct(a) < 0.25) || null,
  ally_dead:       (u, ctx) => ctx.alliesOf(u).find(a => !alive(a)) || null,
  ally_no_shield:  (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && !hasStatus(a,'shield')) || null,
  ally_no_buff:    (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && !hasStatus(a,'buff')) || null,
  ally_afflicted:  (u, ctx) => ctx.alliesOf(u).find(a => alive(a) && isAfflicted(a)) || null,

  self_hp_50:      (u)      => (hpPct(u) < 0.50 ? u : null),
  self_hp_30:      (u)      => (hpPct(u) < 0.30 ? u : null),
  self_no_buff:    (u)      => (hasStatus(u,'buff') ? null : u),
  self_has_buff:   (u)      => (hasStatus(u,'buff') ? u : null),
  self_no_shield:  (u)      => (hasStatus(u, 'shield') ? null : u),
  corpse_ready:    (u, ctx) => ((ctx.corpses || 0) > 0 ? u : null),
  self_mp_low:     (u)      => (u.mp < 10 ? u : null),
};

// -- STATUS helpers -----------------------------------------------------------
const hasStatus = (u, id) => (u.statuses || []).some(s => s.id === id && s.ticks > 0);
const hasKind   = (u, k)  => (u.statuses || []).some(s => s.kind === k && s.ticks > 0);
const CONTROL_KINDS = new Set(['stun','sleep','immobile']);
const AFFLICT_KINDS = new Set(['dot','stun','sleep','immobile','silence','blind','confuse']);
const isAfflicted = (u) => (u.statuses || []).some(s => s.ticks > 0 && (AFFLICT_KINDS.has(s.kind) || s.id === 'slow'));
const hasControl  = (u) => (u.statuses || []).some(s => s.ticks > 0 && CONTROL_KINDS.has(s.kind));
// mapeia o status aplicado -> kind (usado por execute)
export const STATUS_KIND = { burn:'dot', poison:'dot', bleed:'dot', regen:'regen',
  stun:'stun', sono:'sleep', imobilizar:'immobile', silencio:'silence', cegueira:'blind', confusao:'confuse' };
export { hasStatus, hasKind, hasControl };
// aplica/renova um status no alvo (refresca a duração se já existir o mesmo id)
function addStatus(target, st){
  target.statuses = target.statuses || [];
  const cur = target.statuses.find(s => s.id === st.id);
  if(cur){ cur.ticks = Math.max(cur.ticks, st.ticks); if('dmg' in st) cur.dmg = st.dmg; if('amount' in st) cur.amount = st.amount; return; }
  target.statuses.push({ ...st });
}
// remove status que casam com pred; se for buff/debuff (kind 'buff'), restaura o atributo.
function removeStatuses(target, pred){
  if(!target.statuses) return 0; let n = 0;
  target.statuses = target.statuses.filter(s => {
    if(s.ticks > 0 && pred(s)){
      if(s.kind === 'buff') target.stats[s.stat] = (target.stats[s.stat] || 0) - (s.amt || 0);
      n++; return false;
    }
    return true;
  });
  return n;
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

  // BUFF/DEBUFF: aumenta (ou reduz, se amt<0) um atributo por N ticks.
  //  scope: 'self' (padrão) | 'allies' (party toda) | 'target' (debuff no alvo)
  if(skill.kind === 'buff'){
    const b = skill.buff || {};
    const recips = b.scope === 'allies' ? ctx.alliesOf(unit).filter(a => a.hp > 0)
                 : b.scope === 'target' ? [target]
                 : [unit];
    for(const r of recips){
      r.stats[b.stat] = (r.stats[b.stat] || 0) + (b.amt || 0);
      addStatus(r, { id:(b.amt || 0) < 0 ? 'slow' : 'buff', kind:'buff', stat:b.stat, amt:b.amt || 0, ticks:(skill.duration || 3) + 1 });
    }
    return { type:'buff', source:unit, target:recips[0] || unit, skill:skill.id, stat:b.stat, amount:b.amt || 0, scope:b.scope };
  }

  // ESCUDO (Barreira Rúnica): absorve dano antes do HP, por N ticks.
  if(skill.kind === 'shield'){
    const sh = skill.shield || {};
    const recips = sh.scope === 'allies' ? ctx.alliesOf(unit).filter(a => a.hp > 0) : [target];
    for(const r of recips) addStatus(r, { id:'shield', kind:'shield', amount:sh.amount || 0, ticks:(skill.duration || 3) + 1 });
    return { type:'shield', source:unit, target:recips[0] || unit, skill:skill.id, amount:sh.amount || 0, scope:sh.scope };
  }

  // REVIVER: traz um aliado caído de volta com uma fração do HP.
  if(skill.kind === 'revive'){
    if(target.hp > 0) return { type:'heal', source:unit, target, skill:skill.id, amount:0 };
    const amt = Math.max(1, Math.round(target.maxHp * (skill.revive || 0.4)));
    target.hp = amt; target.statuses = [];
    return { type:'revive', source:unit, target, skill:skill.id, amount:amt };
  }

  // DISSIPAR: remove os buffs (positivos) do alvo, restaurando os atributos.
  if(skill.kind === 'dispel'){
    const n = removeStatuses(target, s => s.id === 'buff');
    return { type:'dispel', source:unit, target, skill:skill.id, amount:n };
  }

  // INFLIGIR STATUS (sem dano): sono/silêncio/cegueira/confusão/imobilizar.
  if(skill.kind === 'ailment'){
    const a = skill.applies || {}; const kind = STATUS_KIND[a.status] || 'dot';
    const st = { id:a.status, kind, ticks:a.ticks }; if(kind === 'dot') st.dmg = a.dmg; if(kind === 'regen') st.amt = a.amt;
    addStatus(target, st);
    return { type:'ailment', source:unit, target, skill:skill.id, applied:a.status };
  }

  // CURAR STATUS (Esuna): remove status ruins de um aliado.
  if(skill.kind === 'cleanse'){
    const n = (skill.cure && skill.cure !== 'all')
      ? removeStatuses(target, s => s.id === skill.cure)
      : removeStatuses(target, s => AFFLICT_KINDS.has(s.kind) || s.id === 'slow');
    return { type:'cleanse', source:unit, target, skill:skill.id, amount:n };
  }

  if(skill.kind === 'heal'){
    const amount = Math.round(skill.power * unit.stats.mag);
    const before = target.hp;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    return { type:'heal', source:unit, target, skill:skill.id, amount: target.hp - before };
  }

  // dano (suporta multi-hit via skill.hits)
  // CEGUEIRA: quem está cego pode errar o ataque
  if(hasKind(unit, 'blind') && ctx.rng() < 0.40){
    return { type:'damage', source:unit, target, skill:skill.id, amount:0, crit:false, dead:false, missed:true };
  }
  const atkStat = unit.stats[skill.stat] ?? unit.stats.atk;
  // bônus SAGRADO vs morto-vivo (sinergia Clérigo/Paladino)
  const holyVsUndead = (skill.element === 'holy' && target.type === 'morto-vivo') ? 1.5 : 1;
  // multi-hit: soma o dano de cada acerto (crit rolado por acerto)
  const hits = Math.max(1, skill.hits || 1);
  let isCrit = false, dmg = 0;
  for(let h = 0; h < hits; h++){
    const crit = ctx.rng() < (0.10 + (skill.critBonus || 0)); if(crit) isCrit = true;
    let d = atkStat * skill.power - target.stats.def * 0.5;
    dmg += Math.max(1, Math.round(d * (crit ? 1.6 : 1) * holyVsUndead));
  }
  // absorção por ESCUDO (consome o escudo antes de tirar HP)
  let absorbed = 0;
  for(const st of (target.statuses || [])){
    if(st.kind === 'shield' && st.amount > 0 && dmg > 0){
      const soak = Math.min(st.amount, dmg);
      st.amount -= soak; dmg -= soak; absorbed += soak;
      if(st.amount <= 0) st.ticks = 0;   // escudo quebrado
    }
  }
  target.hp = Math.max(0, target.hp - dmg);
  const dead = target.hp === 0;
  // tomar dano ACORDA / tira a confusão do alvo
  if(dmg > 0 && !dead && target.statuses)
    target.statuses = target.statuses.filter(s => !(s.kind === 'sleep' || s.kind === 'confuse'));
  // aplica status (dot / controle / silêncio / cegueira / confusão…) se o alvo sobreviveu
  let applied = null;
  if(!dead && skill.applies){
    const a = skill.applies; const kind = STATUS_KIND[a.status] || 'dot';
    const st = { id:a.status, kind, ticks:a.ticks };
    if(kind === 'dot') st.dmg = a.dmg;
    if(kind === 'regen') st.amt = a.amt;
    addStatus(target, st); applied = a.status;
  }
  return { type:'damage', source:unit, target, skill:skill.id, amount:dmg, crit:isCrit, dead, holy: holyVsUndead>1, applied, absorbed };
}
