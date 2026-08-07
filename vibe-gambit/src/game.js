// =============================================================================
// game.js — Controlador do jogo (View + fluxo). Só LÊ a simulação e desenha.
// Telas: Mapa · Base (Forja/Academia) · Expedição (combate idle por ondas).
// =============================================================================

import {
  SKILLS, CONDITIONS, HERO_DEFS, ENEMY_DEFS, STAGES, FORGE_LEVELS, ACADEMY,
} from './data.js';
import { loadOrNew, save, newGame } from './state.js';
import { Combat, buildParty, buildWave, forgeAtkBonus } from './engine.js';
import { spriteFor } from './sprites.js';

const S = loadOrNew();
const $  = id => document.getElementById(id);
const el = html => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
const RES_ICON = { gold:'🪙', crystals:'💎', iron:'⛓️', wood:'🪵', herbs:'🌿' };
const randInt = (a,b) => a + Math.floor(Math.random()*(b-a+1));
// Fundos de combate 2D por bioma (quando existe imagem, usa; senão desenha a masmorra procedural)
const BG = { forest:'assets/bg_forest.png' };
// Cor de destaque por herói (cabeçalhos dos cards, estilo referência)
const HERO_ACCENT = { warrior:'#3d7fc4', cleric:'#d0a13c', archer:'#4a9a4a', mage:'#7d5fd0' };
const accentOf = id => HERO_ACCENT[id] || '#8a7a45';

let screen = 'map';
let expo = null;                    // runtime da expedição

// ---------------------------------------------------------------- ECONOMIA
function canAfford(cost){ return Object.entries(cost).every(([k,v]) => (S.resources[k]||0) >= v); }
function spend(cost){ for(const [k,v] of Object.entries(cost)) S.resources[k] -= v; }
function grant(res, k, n){ res[k] = (res[k]||0) + n; }
function costHTML(cost){
  return `<span class="cost">` + Object.entries(cost).map(([k,v]) =>
    `<span class="${ (S.resources[k]||0)>=v ? 'ok':'no'}">${RES_ICON[k]||''}${v}</span>`).join(' ') + `</span>`;
}

// ---------------------------------------------------------------- HUD
function renderHud(){
  $('res').innerHTML = ['gold','crystals','iron','wood','herbs']
    .map(k => `<span class="${k==='gold'?'gold':k==='crystals'?'crystal':k}">${RES_ICON[k]} <b id="r-${k}">${S.resources[k]||0}</b></span>`).join('');
  $('nav').innerHTML = '';
  if(screen === 'expedition'){
    const b = el(`<button class="danger">⤺ Recuar p/ Base</button>`);
    b.onclick = () => retreat();
    $('nav').appendChild(b);
  } else {
    const bm = el(`<button class="${screen==='map'?'primary':''}">🗺️ Mapa</button>`); bm.onclick = () => show('map');
    const bb = el(`<button class="${screen==='base'?'primary':''}">🏰 Base</button>`); bb.onclick = () => show('base');
    $('nav').append(bm, bb);
  }
}
function bumpRes(){ for(const k of ['gold','crystals','iron','wood','herbs']){ const e=$('r-'+k); if(e) e.textContent=S.resources[k]||0; } }

// ---------------------------------------------------------------- NAV
function show(id){
  if(id !== 'expedition') stopExpo();
  screen = id;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $('screen-'+id).classList.add('active');
  renderHud();
  if(id === 'map')  renderMap();
  if(id === 'base') renderBase();
}

// ================================================================ MAPA
const NODE_POS = { // % dentro do mapa — caminho serpenteante (retrato), acima do painel Party
  mossy_glen:{x:30,y:60}, bandit_camp:{x:62,y:44}, echoing_caves:{x:32,y:27},
  ruined_keep:{x:64,y:15}, peak_of_trials:{x:44,y:8},
};
function renderMap(){
  const heroesMini = S.heroes.map(hs => {
    const def = HERO_DEFS.find(h=>h.id===hs.id);
    return `<div class="pmini"><div class="av">${spriteFor(def.id)}</div>
      <div class="pn">${def.name}</div><div class="pbar"><i style="width:100%"></i></div></div>`;
  }).join('');
  const nodes = STAGES.map((st,i) => {
    const pos = NODE_POS[st.id] || {x:50,y:50};
    const unlocked = !!S.stagesUnlocked[st.id];
    const active = unlocked;
    const icon = ({forest:'🌲',plains:'⚔️',cave:'🕳️',keep:'🏯',peak:'🏔️'})[st.biome] || '📍';
    return `<div class="node ${unlocked?'active':'locked'}" data-stage="${st.id}" style="left:${pos.x}%;top:${pos.y}%">
      <div class="disc">${unlocked?icon:'🔒'}</div>
      <div class="lbl"><b>${i+1}. ${st.name}</b><span class="st">${unlocked?'Disponível':'Bloqueada'}</span></div>
    </div>`;
  }).join('');
  // caminhos tracejados entre fases consecutivas
  const paths = STAGES.slice(1).map((st,i)=>{
    const a = NODE_POS[STAGES[i].id], b = NODE_POS[st.id]; if(!a||!b) return '';
    const on = S.stagesUnlocked[st.id] || S.stagesUnlocked[STAGES[i].id];
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${on?'#f0e2b8':'#ffffff'}" stroke-width="1" stroke-dasharray="0.6 2.4" stroke-linecap="round" opacity="${on?.8:.3}"/>`;
  }).join('');
  $('screen-map').innerHTML = `
    <div class="map-wrap">
      <div class="terrain"><div class="forest"></div><div class="mount"></div><div class="water"></div></div>
      <svg class="map-path" viewBox="0 0 100 100" preserveAspectRatio="none">${paths}</svg>
      <div class="map-title">Aethelgard</div>
      ${nodes}
      <div class="party-panel"><h4>Party</h4><div class="party-row">${heroesMini}</div></div>
    </div>
    <p class="muted tiny" style="text-align:center;margin-top:8px">Clique numa fase disponível para abrir a preparação (ajustar gambits) e iniciar a batalha</p>`;
  $('screen-map').querySelectorAll('.node.active').forEach(n =>
    n.onclick = () => showPrep(n.dataset.stage));
}

// ================================================================ PREPARAÇÃO (ajustar gambits antes da batalha)
function showPrep(stageId){
  stopExpo(); expo = null;
  const stage = STAGES.find(s => s.id === stageId);
  screen = 'prep';
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $('screen-prep').classList.add('active');
  renderHud();
  const icon = ({forest:'🌲',plains:'⚔️',cave:'🕳️',keep:'🏯',peak:'🏔️'})[stage.biome] || '📍';
  $('screen-prep').innerHTML = `
    <div class="panel prep-head">
      <div class="prep-title">${icon} ${stage.name}<small>${stage.waves.length} ondas · ajuste os gambits antes de entrar</small></div>
      <button class="primary" id="prep-start">▶ Iniciar Batalha</button>
    </div>
    <h3 style="padding:2px 2px 8px;font-size:14px">🧠 Programe a party</h3>
    <div id="prep-gboard"></div>
    <p class="muted tiny" style="margin-top:8px">A IA lê de cima → baixo; a 1ª condição verdadeira executa e para. Compre condições e slots em 🏰 Base → Academia.</p>`;
  renderGambitBoard($('prep-gboard'));
  $('prep-start').onclick = () => startExpedition(stageId);
}

// ================================================================ BASE
let baseTab = 'gambits';
function renderBase(){
  const tabs = [['gambits','menu_gambits','Gambits'],['forge','menu_forge','Forja'],['academy','menu_academy','Academia']];
  $('screen-base').innerHTML = `
    <div class="base-frame">
      <div class="base-title"><span>Acampamento Base</span></div>
      <div class="tabbar">${tabs.map(([k,ic,l])=>`<button class="tab ${baseTab===k?'on':''}" data-tab="${k}"><img class="ticon" src="assets/${ic}.png" alt="" />${l}</button>`).join('')}</div>
      <div class="tabbody" id="base-body"></div>
    </div>`;
  $('screen-base').querySelectorAll('.tab').forEach(b => b.onclick = () => { baseTab=b.dataset.tab; renderBase(); });
  const body = $('base-body');
  if(baseTab==='gambits'){ body.innerHTML = `<h3 style="padding:0 2px 8px">🧠 Programação de Gambits</h3><div id="gboard-mount"></div>
    <p class="muted tiny" style="margin-top:8px">A cada turno, a IA lê de cima → baixo; a 1ª condição verdadeira executa e para. Compre condições e slots na Academia.</p>`;
    renderGambitBoard($('gboard-mount')); }
  else if(baseTab==='forge')   renderForge(body);
  else if(baseTab==='academy') renderAcademy(body);
}

function heroRuntimeStats(hs){
  const def = HERO_DEFS.find(h=>h.id===hs.id);
  return { def, atk: def.base.atk + forgeAtkBonus(hs.weaponLevel), hp:def.base.hp, mag:def.base.mag, spd:def.base.spd, mp:def.base.mp };
}

function renderForge(body){
  body.innerHTML = `<h3 style="padding:0 2px 8px">🔨 Forja — melhore as armas (ATK permanente)</h3>
    <div class="hero-cards">${S.heroes.map(hs=>{
      const {def, atk} = heroRuntimeStats(hs);
      const next = FORGE_LEVELS[hs.weaponLevel];
      const wl = Array.from({length:5},(_,i)=>`<i class="${i<hs.weaponLevel?'on':''}"></i>`).join('');
      return `<div class="hcard" style="--acc:${accentOf(def.id)}">
        <div class="top"><div class="av">${spriteFor(def.id)}</div>
          <div><div class="nm">${def.name}</div><div class="kl">Arma nível ${hs.weaponLevel}/5</div></div></div>
        <div class="wl">${wl}</div>
        <div class="stats"><span>⚔️ ATK <b>${atk}</b></span><span>❤️ HP ${def.base.hp}</span></div>
        ${ next
          ? `<div class="tiny muted">Próximo: +${next.atk} ATK</div>${costHTML(next.cost)}
             <button class="small primary forge-btn" data-id="${hs.id}" ${canAfford(next.cost)?'':'disabled'} style="margin-top:8px;width:100%">🔨 Forjar +${hs.weaponLevel+1}</button>`
          : `<div class="tiny" style="color:var(--gold);margin-top:8px">★ Arma no nível máximo</div>` }
      </div>`;
    }).join('')}</div>`;
  body.querySelectorAll('.forge-btn').forEach(b => b.onclick = () => {
    const hs = S.heroes.find(h=>h.id===b.dataset.id); const next = FORGE_LEVELS[hs.weaponLevel];
    if(!canAfford(next.cost)) return;
    spend(next.cost); hs.weaponLevel++; save(S); bumpRes(); renderForge(body);
  });
}

function renderAcademy(body){
  const shopIds = Object.keys(ACADEMY.conditionShop);
  body.innerHTML = `<h3 style="padding:0 2px 8px">🎓 Academia de Tática</h3>
    <div class="panel" style="margin-bottom:12px;background:var(--panel)">
      <h3>➕ Slots de Gambit por herói</h3>
      <div class="hero-cards">${S.heroes.map(hs=>{
        const def = HERO_DEFS.find(h=>h.id===hs.id); const nextSlot = hs.slots+1;
        const cost = ACADEMY.slotCosts[nextSlot];
        return `<div class="hcard" style="--acc:${accentOf(def.id)}"><div class="top"><div class="av">${spriteFor(def.id)}</div>
          <div><div class="nm">${def.name}</div><div class="kl">${hs.slots}/${def.maxSlots} slots</div></div></div>
          ${ cost
            ? `${costHTML(cost)}<button class="small primary slot-btn" data-id="${hs.id}" ${canAfford(cost)?'':'disabled'} style="margin-top:8px;width:100%">Desbloquear slot ${nextSlot}</button>`
            : `<div class="tiny" style="color:var(--gold);margin-top:6px">★ Slots no máximo</div>` }
        </div>`;
      }).join('')}</div>
    </div>
    <div class="panel" style="background:var(--panel)">
      <h3>📜 Loja de Condicionais (desbloqueia p/ todos)</h3>
      <div class="hero-cards">${shopIds.map(cid=>{
        const owned = S.unlockedConditions.includes(cid); const cost = ACADEMY.conditionShop[cid];
        return `<div class="hcard"><div class="nm" style="font-size:13px">${CONDITIONS[cid].label}</div>
          ${ owned ? `<div class="tiny" style="color:var(--heal);margin-top:8px">✓ Desbloqueada</div>`
                   : `<div style="margin-top:8px">${costHTML(cost)}</div>
                      <button class="small cond-btn" data-id="${cid}" ${canAfford(cost)?'':'disabled'} style="margin-top:8px;width:100%">Comprar</button>` }
        </div>`;
      }).join('')}</div>
    </div>`;
  body.querySelectorAll('.slot-btn').forEach(b => b.onclick = () => {
    const hs = S.heroes.find(h=>h.id===b.dataset.id); const cost = ACADEMY.slotCosts[hs.slots+1];
    if(!cost || !canAfford(cost)) return; spend(cost); hs.slots++; save(S); bumpRes(); renderAcademy(body);
  });
  body.querySelectorAll('.cond-btn').forEach(b => b.onclick = () => {
    const cid = b.dataset.id; const cost = ACADEMY.conditionShop[cid];
    if(!canAfford(cost)) return; spend(cost); S.unlockedConditions.push(cid); save(S); bumpRes(); renderAcademy(body);
  });
}

// ================================================================ GAMBIT BOARD (mobile: seletor + 1 herói)
let boardHero = null;
function renderGambitBoard(mount){
  if(!boardHero || !S.heroes.find(h=>h.id===boardHero)) boardHero = S.heroes[0].id;
  const hs  = S.heroes.find(h=>h.id===boardHero);
  const def = HERO_DEFS.find(h=>h.id===hs.id);
  const condOpts = S.unlockedConditions;
  const tabs = S.heroes.map(h=>{
    const d = HERO_DEFS.find(x=>x.id===h.id);
    return `<button class="gtab ${h.id===boardHero?'on':''}" data-h="${h.id}" style="--acc:${accentOf(h.id)}">
      <div class="av">${spriteFor(h.id)}</div><span>${d.name}</span><div class="dot"></div></button>`;
  }).join('');
  const lines  = hs.gambits.map((g,i)=>gambitLineHTML(g,i,def,condOpts)).join('') || '<div class="gline locked">sem linhas — adicione abaixo</div>';
  const locked = Array.from({length: def.maxSlots - hs.slots}, () =>
    `<div class="gline locked">🔒 desbloqueie um slot na Academia</div>`).join('');
  const canAdd = hs.gambits.length < hs.slots;
  mount.className = '';
  mount.innerHTML = `
    <div class="gtabs">${tabs}</div>
    <div class="gpanel" style="--acc:${accentOf(hs.id)}">
      <div class="gphead"><div class="av">${spriteFor(def.id)}</div>
        <div class="hn">${def.name}<small>${hs.gambits.length}/${hs.slots} linhas ativas · lido de cima → baixo</small></div></div>
      <div class="glines">${lines}${locked}</div>
      <button class="gadd small primary" ${canAdd?'':'disabled'}>+ Adicionar linha</button>
    </div>`;
  mount.querySelectorAll('.gtab').forEach(b => b.onclick = () => { boardHero = b.dataset.h; renderGambitBoard(mount); });
  mount.querySelectorAll('select').forEach(sel => sel.onchange = () => {
    hs.gambits[+sel.dataset.line][sel.dataset.kind] = sel.value; save(S);
  });
  mount.querySelectorAll('.rm').forEach(x => x.onclick = () => { hs.gambits.splice(+x.dataset.line,1); save(S); renderGambitBoard(mount); });
  const add = mount.querySelector('.gadd');
  if(add) add.onclick = () => {
    if(hs.gambits.length >= hs.slots) return;
    hs.gambits.push({ condition: S.unlockedConditions[0], action: def.skills[0] });
    save(S); renderGambitBoard(mount);
  };
}
function gambitLineHTML(g, i, def, condOpts){
  const cond = `<select class="cond" data-line="${i}" data-kind="condition">${
    condOpts.map(c=>`<option value="${c}" ${g.condition===c?'selected':''}>${CONDITIONS[c].label}</option>`).join('')}</select>`;
  const act = `<select class="act" data-line="${i}" data-kind="action">${
    def.skills.map(s=>`<option value="${s}" ${g.action===s?'selected':''}>${SKILLS[s].name}</option>`).join('')}</select>`;
  return `<div class="gline"><span class="idx">${i+1}</span>${cond}<span class="arw">→</span>${act}<span class="rm" data-line="${i}" title="Remover">✕</span></div>`;
}

// ================================================================ EXPEDIÇÃO
const TICK_MS = 850;
function startExpedition(stageId){
  const stage = STAGES.find(s=>s.id===stageId);
  const party = buildParty(S);                 // referencia S.heroes[].gambits (edição ao vivo!)
  expo = { stage, party, waveIndex:0, combat:null, timer:null, lastLog:0, runLoot:{gold:0}, over:false };
  screen = 'expedition';
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $('screen-expedition').classList.add('active');
  renderHud();
  buildExpeditionDOM();
  startWave(0);
}
function stopExpo(){ if(expo && expo.timer){ clearInterval(expo.timer); expo.timer=null; } }
function retreat(){ stopExpo(); expo=null; show('base'); }

function buildExpeditionDOM(){
  const bgArt = BG[expo.stage.biome];
  const bgLayer = bgArt ? `<img class="stage-bg" src="${bgArt}" alt="">` : `<canvas class="dungeon" id="dungeon"></canvas>`;
  $('screen-expedition').innerHTML = `
    <div class="combat-stage" id="stage">
      ${bgLayer}
      <div class="expo-info" id="expo-info"></div>
      <div class="lane heroes" id="lane-heroes"></div>
      <div class="lane enemies" id="lane-enemies"></div>
      <div class="stage-banner hidden" id="banner"></div>
    </div>
    <div class="tabbody logframe" style="margin-top:12px">
      <div class="loghead">📜 Combat Log</div>
      <div class="log" id="log"></div>
    </div>`;
  const cv = $('dungeon');
  if(cv) requestAnimationFrame(()=>{ cv.width = cv.clientWidth; cv.height = cv.clientHeight; drawDungeon(cv); placeTorches(); });
}

function startWave(i){
  if(!expo) return;
  expo.waveIndex = i;
  const enemies = buildWave(expo.stage.waves[i]);
  expo.enemies = enemies;
  expo.combat = new Combat(expo.party, enemies, { seed: 1000 + i*37 + Math.floor(Math.random()*900) });
  expo.lastLog = expo.combat.log.length;
  renderBattlers();
  $('expo-info').innerHTML = `📍 ${expo.stage.name} · Onda ${i+1}/${expo.stage.waves.length}`;
  logLine(`<span class="sys">— Onda ${i+1}: ${enemies.map(e=>e.name).join(', ')} —</span>`);
  stopExpo();
  expo.timer = setInterval(expoTick, TICK_MS);
}

function expoTick(){
  const c = expo.combat;
  const before = c.log.length;
  c.step();
  for(const ev of c.log.slice(before)) presentEvent(ev);
  refreshBattlerBars();
  if(c.isOver()){
    stopExpo();
    if(c.outcome()==='victory'){
      if(expo.waveIndex < expo.stage.waves.length-1){
        healParty(0.25);
        setTimeout(()=>{ if(expo) startWave(expo.waveIndex+1); }, 900);
      } else {
        expeditionCleared();
      }
    } else {
      expeditionWiped();
    }
  }
}

function presentEvent(ev){
  // loot ao matar inimigo
  if(ev.type==='damage' && ev.dead && ev.target.side==='enemy') awardLoot(ev.target);
  // dano/cura flutuante + hit flash
  const be = battlerEl(ev.target);
  if(be){
    const f = document.createElement('div'); f.className = 'float ' + (ev.type==='heal'?'heal':(ev.crit?'crit':'dmg'));
    f.textContent = ev.type==='heal' ? `+${ev.amount}` : `${ev.amount}${ev.crit?'!':''}`;
    be.appendChild(f); setTimeout(()=>f.remove(),1000);
    if(ev.type!=='heal'){ be.classList.add('hit'); setTimeout(()=>be.classList.remove('hit'),300); }
  }
  // log
  const skill = SKILLS[ev.skill]?.name || ev.skill;
  const s = ev.source.side==='hero'?'h':'e', t = ev.target.side==='hero'?'h':'e';
  if(ev.type==='damage')
    logLine(`t${ev.tick} <b class="${s}">${ev.source.name}</b> · ${skill} → <b class="${t}">${ev.target.name}</b> <span class="${ev.crit?'c':''}">${ev.amount}${ev.crit?' CRIT':''} DMG</span>${ev.dead?' ☠️':''}`);
  else
    logLine(`t${ev.tick} <b class="${s}">${ev.source.name}</b> · ${skill} → <b class="${t}">${ev.target.name}</b> <span class="g">+${ev.amount} HP</span>`);
}

function awardLoot(unit){
  const def = ENEMY_DEFS[unit.id]; if(!def) return;
  const g = randInt(def.gold[0], def.gold[1]); grant(S.resources,'gold',g); expo.runLoot.gold += g;
  for(const d of (def.drops||[])) if(Math.random() < d.chance){
    const n = randInt(d.qty[0], d.qty[1]); grant(S.resources, d.res, n);
    expo.runLoot[d.res] = (expo.runLoot[d.res]||0) + n;
  }
  bumpRes();
}

function healParty(frac){ for(const u of expo.party) if(u.hp>0) u.hp = Math.min(u.maxHp, u.hp + Math.round(u.maxHp*frac)); }

function expeditionCleared(){
  const first = !S.stagesUnlocked || S.progress.clears!==undefined ? true : true;
  // desbloqueia próxima fase (1ª vez)
  const idx = STAGES.findIndex(s=>s.id===expo.stage.id);
  const next = STAGES[idx+1];
  let unlockedMsg = '';
  if(next && !S.stagesUnlocked[next.id]){ S.stagesUnlocked[next.id]=true; unlockedMsg = `🔓 ${next.name} desbloqueada!`; }
  S.progress.clears = (S.progress.clears||0)+1;
  save(S);
  showBanner('win','🏆 VITÓRIA');
  logLine(`<span class="sys">🏆 Fase concluída! ${unlockedMsg}</span>`);
  setTimeout(()=> lootModal(unlockedMsg), 1100);
}
function expeditionWiped(){
  save(S);
  showBanner('lose','💀 DERROTA');
  logLine(`<span class="sys">💀 Party derrotado. Recuando para a base…</span>`);
  setTimeout(()=>{ if(screen==='expedition'){ expo=null; show('base'); } }, 2200);
}

function lootModal(unlockedMsg){
  const L = expo ? expo.runLoot : {gold:0};
  const items = Object.entries(L).filter(([,v])=>v>0)
    .map(([k,v])=>`<span>${RES_ICON[k]||''} ${v}</span>`).join('') || '<span class="muted">—</span>';
  const root = $('modal-root');
  root.innerHTML = `<div class="modal"><div class="box">
    <h2>🏆 Expedição Vitoriosa!</h2>
    <p class="muted">Recompensas coletadas nesta corrida:</p>
    <div class="loot">${items}</div>
    ${unlockedMsg?`<p style="color:var(--gold);font-weight:800;margin-bottom:6px">${unlockedMsg}</p>`:''}
    <div class="row" style="justify-content:center;margin-top:10px">
      <button class="primary" id="m-again">↻ Farmar de novo</button>
      <button id="m-base">🏰 Ir p/ Base</button>
      <button id="m-map">🗺️ Mapa</button>
    </div></div></div>`;
  $('m-again').onclick = () => { root.innerHTML=''; const sid=expo?.stage.id; expo=null; startExpedition(sid); };
  $('m-base').onclick  = () => { root.innerHTML=''; expo=null; show('base'); };
  $('m-map').onclick   = () => { root.innerHTML=''; expo=null; show('map'); };
}

function showBanner(cls,msg){
  const b = $('banner'); if(!b) return;
  b.className = 'stage-banner'; b.innerHTML = `<div class="msg ${cls}">${msg}</div>`;
  setTimeout(()=>{ if($('banner')) $('banner').classList.add('hidden'); }, 1600);
}
function logLine(html){ const log=$('log'); if(!log) return; const d=el(`<div class="ev">${html}</div>`); log.appendChild(d); log.scrollTop=log.scrollHeight; }

// ---- battlers (DOM da cena) ----
function renderBattlers(){
  const H = $('lane-heroes'), E = $('lane-enemies'); if(!H||!E) return;
  H.innerHTML = expo.party.map(u => battlerHTML(u,false)).join('');
  E.innerHTML = expo.enemies.map(u => battlerHTML(u,true)).join('');
  refreshBattlerBars();
}
function battlerHTML(u, foe){
  return `<div class="battler ${foe?'foe':''}" id="b-${u.uid}">
    <div class="nmtag">${u.name}</div>
    <div class="ohp"><i></i></div>
    <div class="spr">${spriteFor(u.id)}</div>
    <div class="shadow"></div></div>`;
}
function battlerEl(u){ return document.getElementById('b-'+u.uid); }
function refreshBattlerBars(){
  for(const u of [...(expo.party||[]), ...(expo.enemies||[])]){
    const be = battlerEl(u); if(!be) continue;
    be.classList.toggle('dead', u.hp<=0);
    be.querySelector('.ohp>i').style.width = Math.max(0, 100*u.hp/u.maxHp) + '%';
  }
}

// ---- masmorra em canvas (procedural) ----
function drawDungeon(cv){
  const ctx = cv.getContext('2d'), w = cv.width, h = cv.height;
  let seed = 1337; const rnd = () => { seed = (seed*1664525+1013904223)>>>0; return seed/4294967296; };
  // fundo
  const bg = ctx.createLinearGradient(0,0,0,h);
  bg.addColorStop(0,'#1a2630'); bg.addColorStop(.6,'#141d28'); bg.addColorStop(1,'#0c141d');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // parede de tijolos
  const wallH = h*0.68, bw = 58, bh = 27, mortar = 3;
  for(let y=0, row=0; y<wallH; y+=bh, row++){
    const off = (row%2)? bw/2 : 0;
    for(let x=-bw; x<w+bw; x+=bw){
      const bx = x+off+mortar, by = y+mortar, cw = bw-mortar, ch = bh-mortar;
      const v = 0.85 + rnd()*0.3;
      ctx.fillStyle = `rgb(${Math.round(42*v)},${Math.round(58*v)},${Math.round(60*v)})`;
      ctx.fillRect(bx,by,cw,ch);
      // brilho superior
      ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(bx,by,cw,3);
      // musgo ocasional (sutil, nas juntas)
      if(rnd()<0.10){ ctx.fillStyle = `rgba(${50+rnd()*24|0},${100+rnd()*34|0},${44+rnd()*16|0},0.42)`;
        ctx.beginPath(); ctx.ellipse(bx+rnd()*cw, by+ch-2, 4+rnd()*6, 2+rnd()*2, 0,0,7); ctx.fill(); }
    }
  }
  // sombra na base da parede
  const sh = ctx.createLinearGradient(0,wallH-40,0,wallH); sh.addColorStop(0,'transparent'); sh.addColorStop(1,'rgba(0,0,0,.5)');
  ctx.fillStyle = sh; ctx.fillRect(0,wallH-40,w,40);
  // chão
  const fl = ctx.createLinearGradient(0,wallH,0,h);
  fl.addColorStop(0,'#26201a'); fl.addColorStop(1,'#140f0b');
  ctx.fillStyle = fl; ctx.fillRect(0,wallH,w,h-wallH);
  // ladrilhos do chão em perspectiva
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2;
  for(let i=0;i<=10;i++){ const t=i/10, y=wallH+(h-wallH)*t*t;
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
  const cx=w/2;
  for(let i=-6;i<=6;i++){ ctx.beginPath(); ctx.moveTo(cx+i*30, wallH); ctx.lineTo(cx+i*130, h); ctx.stroke(); }
  // vinheta
  const vg = ctx.createRadialGradient(cx,h*0.4,h*0.2, cx,h*0.4,h*0.8);
  vg.addColorStop(0,'transparent'); vg.addColorStop(1,'rgba(0,0,0,.55)');
  ctx.fillStyle = vg; ctx.fillRect(0,0,w,h);
  // sconces + chamas das tochas (posições relativas)
  for(const tx of [0.16,0.5,0.84]){
    const px = w*tx, py = wallH*0.42;
    ctx.fillStyle='#2a2018'; ctx.fillRect(px-4,py,8,16);
    const gr = ctx.createRadialGradient(px,py-2,1,px,py-2,10);
    gr.addColorStop(0,'#fff2b0'); gr.addColorStop(.5,'#ffae3a'); gr.addColorStop(1,'rgba(255,120,30,0)');
    ctx.fillStyle=gr; ctx.beginPath(); ctx.ellipse(px,py-4,7,11,0,0,7); ctx.fill();
  }
}
function placeTorches(){
  const stage = $('stage'); if(!stage) return;
  stage.querySelectorAll('.torch-glow').forEach(t=>t.remove());
  const W = stage.clientWidth, H = stage.clientHeight, wallH = H*0.68;
  [0.16,0.5,0.84].forEach((tx,i)=>{
    const g = document.createElement('div'); g.className='torch-glow';
    g.style.left = (W*tx)+'px'; g.style.top = (wallH*0.42)+'px'; g.style.animationDelay = (i*0.3)+'s';
    stage.appendChild(g);
  });
}

// ================================================================ BOOT
renderHud();
show('map');
window.addEventListener('resize', () => { if(screen==='expedition'){ const cv=$('dungeon'); if(cv){ cv.width=cv.clientWidth; cv.height=cv.clientHeight; drawDungeon(cv); placeTorches(); } } });

// atalho de debug: novo jogo com ?reset
if(location.search.includes('reset')){ localStorage.removeItem('vibe_gambit_save_v1'); location.href = location.pathname; }
