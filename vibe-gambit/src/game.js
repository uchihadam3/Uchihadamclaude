// =============================================================================
// game.js — Controlador do jogo (View + fluxo). Só LÊ a simulação e desenha.
// Telas: Mapa · Base (Forja/Academia) · Expedição (combate idle por ondas).
// =============================================================================

import {
  SKILLS, CONDITIONS, HERO_DEFS, ENEMY_DEFS, STAGES, FORGE_LEVELS, ACADEMY,
  ITEMS, ITEM_DROPS, itemBonuses,
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

// ================================================================ BASE (hub deitado — layout da referência)
// Slots de equipamento por herói (item guardado em hs.equip[slot] = itemId|null)
const EQUIP_SLOTS = [
  { key:'head',   icon:'🪖', label:'Cabeça' },
  { key:'chest',  icon:'👕', label:'Peito' },
  { key:'hands',  icon:'🧤', label:'Mãos' },
  { key:'feet',   icon:'👢', label:'Pés' },
  { key:'weapon', icon:'⚔️', label:'Arma' },
  { key:'trinket',icon:'💍', label:'Acessório' },
];
function heroEquip(hs){
  if(!hs.equip) hs.equip = {};
  for(const s of EQUIP_SLOTS) if(!(s.key in hs.equip)) hs.equip[s.key] = null;
  return hs.equip;
}
let selHero = null;   // herói selecionado no painel de detalhes/inventário

function renderBase(){
  if(!selHero || !S.heroes.find(h=>h.id===selHero)) selHero = S.heroes[0].id;
  $('screen-base').innerHTML = `
    <div class="hub-fit">
      <div class="hub-stage">
        <div class="base-frame base-hub">
          <div class="base-title"><span>Acampamento Base</span></div>
          <button class="hub-x" title="Ir ao Mapa">✕</button>
          <div class="hub-grid">
            <div class="hub-panel hub-left" id="hub-left"></div>
            <div class="hub-center" id="hub-center"></div>
            <div class="hub-panel hub-right" id="hub-right"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-frame detail-frame" id="detail-frame"></div>
    <div class="base-actions">
      <button class="hub-gear" title="Opções">⚙️</button>
      <button class="gold-cta" id="hub-cta">⚔️ Partir em Expedição</button>
    </div>`;
  renderHubParty($('hub-left'));
  renderHubCenter($('hub-center'));
  renderHubShop($('hub-right'));
  renderDetail();
  $('screen-base').querySelector('.hub-x').onclick    = () => show('map');
  $('screen-base').querySelector('.hub-gear').onclick = () => openOptions();
  $('hub-cta').onclick = () => show('map');
  fitBase(); requestAnimationFrame(fitBase); setTimeout(fitBase, 120);
}
// escala o hub (largura de design fixa) pra caber na largura do retrato — mantém o layout lado a lado
function fitBase(){
  const fit   = $('screen-base').querySelector('.hub-fit');
  const stage = $('screen-base').querySelector('.hub-stage');
  if(!fit || !stage) return;
  const avail = fit.clientWidth;
  const w = stage.offsetWidth || 690;
  const s = Math.min(1, avail / w);
  stage.style.transform = `scale(${s})`;
  fit.style.height = (stage.offsetHeight * s) + 'px';
}

// ---- PAINEL ESQUERDO: 4 heróis (rosto) + resumo de equipamento. Clicar = selecionar ----
function renderHubParty(mount){
  mount.innerHTML = `<div class="panel-cap">🛡️ Sua Party</div>
    <div class="party-cards">${S.heroes.map(hs=>{
      const def = HERO_DEFS.find(h=>h.id===hs.id);
      const {atk, hp} = heroRuntimeStats(hs);
      const nEquip = EQUIP_SLOTS.filter(s=>s.key!=='weapon' && ITEMS[heroEquip(hs)[s.key]]).length;
      return `<div class="party-card ${hs.id===selHero?'sel':''}" data-id="${hs.id}" style="--acc:${accentOf(def.id)}">
        <div class="pc-face"><img src="assets/${def.id}_face.png" alt=""></div>
        <div class="pc-info">
          <div class="pc-nm">${def.name}</div>
          <div class="pc-st">⚔️${atk} · ❤️${hp} · 🎒${nEquip}</div>
        </div>
      </div>`;
    }).join('')}</div>`;
  mount.querySelectorAll('.party-card').forEach(c => c.onclick = () => {
    selHero = c.dataset.id; renderHubParty(mount); renderDetail(); fitBase();
  });
}

// ---- PAINEL INFERIOR: detalhes do herói selecionado + INVENTÁRIO ----
function renderDetail(){
  const frame = $('detail-frame'); if(!frame) return;
  const hs = S.heroes.find(h=>h.id===selHero) || S.heroes[0];
  const def = HERO_DEFS.find(h=>h.id===hs.id);
  const rs = heroRuntimeStats(hs); const eq = heroEquip(hs);
  const statChip = (ic,v)=>`<span class="d-stat">${ic}<b>${v}</b></span>`;
  const slotsHTML = EQUIP_SLOTS.map(s=>{
    if(s.key==='weapon'){
      return `<button class="d-slot on wpn" data-slot="weapon" title="Arma · Forja" style="--acc:${accentOf(hs.id)}">
        <span class="ds-ic">⚔️</span><span class="ds-badge">+${hs.weaponLevel}</span></button>`;
    }
    const it = ITEMS[eq[s.key]];
    return `<button class="d-slot ${it?'on':''}" data-slot="${s.key}" title="${s.label}${it?' · '+it.name:' (vazio)'}" style="--acc:${accentOf(hs.id)}">
      <span class="ds-ic" style="${it?'':'opacity:.32'}">${it?it.icon:s.icon}</span>
      ${it?'<span class="ds-x" title="Desequipar">✕</span>':''}</button>`;
  }).join('');
  const inv = S.inventory || [];
  const invHTML = inv.length ? inv.map((iid,idx)=>{
    const it = ITEMS[iid]; if(!it) return '';
    const bon = Object.entries(it.bonus).map(([k,v])=>`+${v}${k.toUpperCase()}`).join(' ');
    return `<button class="inv-item r-${it.rarity}" data-idx="${idx}" title="${it.name} (${bon}) — tocar p/ equipar em ${def.name}">
      <span class="ii-ic">${it.icon}</span><span class="ii-bo">${bon}</span></button>`;
  }).join('') : `<div class="inv-empty">Inventário vazio — itens caem nas expedições.</div>`;

  frame.innerHTML = `
    <div class="detail-title"><span>Herói & Inventário</span></div>
    <div class="detail-body">
      <div class="d-hero" style="--acc:${accentOf(hs.id)}">
        <div class="d-face"><img src="assets/${def.id}_face.png" alt=""></div>
        <div class="d-meta">
          <div class="d-nm">${def.name} <small>${def.klass}</small></div>
          <div class="d-stats">${statChip('⚔️',rs.atk)}${statChip('❤️',rs.hp)}${statChip('🔮',rs.mag)}${statChip('🛡️',rs.defense)}${statChip('👟',rs.spd)}${statChip('💧',rs.mp)}</div>
        </div>
      </div>
      <div class="d-slots">${slotsHTML}</div>
      <div class="inv-cap">🎒 Inventário <small>(toque num item p/ equipar em ${def.name})</small></div>
      <div class="inv-grid">${invHTML}</div>
    </div>`;

  frame.querySelectorAll('.d-slot').forEach(b => b.onclick = (e) => {
    const slot = b.dataset.slot;
    if(slot==='weapon'){ openPanelModal('🔨 Forja', body=>renderForge(body, hs.id)); return; }
    if(e.target.classList.contains('ds-x') || eq[slot]){ unequipItem(hs.id, slot); }
  });
  frame.querySelectorAll('.inv-item').forEach(b => b.onclick = () => equipItem(hs.id, +b.dataset.idx));
}

function equipItem(heroId, invIdx){
  const hs = S.heroes.find(h=>h.id===heroId); const eq = heroEquip(hs);
  const iid = S.inventory[invIdx]; const it = ITEMS[iid]; if(!it) return;
  S.inventory.splice(invIdx,1);            // tira do inventário
  if(eq[it.slot]) S.inventory.push(eq[it.slot]);  // devolve o que estava equipado
  eq[it.slot] = iid;
  save(S); refreshBase();
}
function unequipItem(heroId, slot){
  const hs = S.heroes.find(h=>h.id===heroId); const eq = heroEquip(hs);
  if(!eq[slot]) return;
  S.inventory.push(eq[slot]); eq[slot] = null;
  save(S); refreshBase();
}
function refreshBase(){
  if($('hub-left')) renderHubParty($('hub-left'));
  renderDetail(); fitBase();
}

// ---- COLUNA CENTRAL: ícones de menu (Forja · Academia · Mapa) ----
function renderHubCenter(mount){
  const items = [
    { act:'forge',   img:'ic_forge',   label:'Forja' },
    { act:'academy', img:'ic_academy', label:'Academia' },
    { act:'map',     img:'ic_map',     label:'Mapa' },
  ];
  mount.innerHTML = items.map(it =>
    `<button class="hub-ic" data-act="${it.act}"><img src="assets/${it.img}.png" alt=""><span>${it.label}</span></button>`).join('');
  mount.querySelectorAll('.hub-ic').forEach(b => b.onclick = () => {
    const a = b.dataset.act;
    if(a==='forge')   openPanelModal('🔨 Forja', renderForge);
    if(a==='academy') openGambitHUD();
    if(a==='map')     show('map');
  });
}

// ================================================================ EDITOR DE GAMBITS (HUD estilo FF XII)
let ghHero = null;
let ghPick = null;   // {line, kind} quando a lista inline está aberta naquela linha
// Lista de blocos INLINE que abre logo abaixo do bloco clicado (na própria linha)
function ghInlineList(hs, def, line, kind){
  const isCond = kind==='condition';
  const options = isCond ? S.unlockedConditions.map(c=>({id:c,label:CONDITIONS[c].label}))
                         : def.skills.map(s=>({id:s,label:SKILLS[s].name}));
  const current = isCond ? hs.gambits[line].condition : hs.gambits[line].action;
  return `<div class="gg-opts">${options.map(o=>`
    <button class="gopt ${isCond?'c':'a'} ${o.id===current?'sel':''}" data-line="${line}" data-kind="${kind}" data-id="${o.id}">
      <span class="gopt-t">${o.label}</span>${o.id===current?'<span class="gopt-ck">✓</span>':''}</button>`).join('')}</div>`;
}
function openGambitHUD(){
  if(!ghHero || !S.heroes.find(h=>h.id===ghHero)) ghHero = selHero || S.heroes[0].id;
  ghPick = null;
  $('modal-root').innerHTML = `<div class="modal"><div class="box box-wide gh-box">
    <button class="modal-x" title="Fechar">✕</button>
    <h2>🧠 Editor de Gambits</h2>
    <p class="muted tiny gh-lede">Programe a IA de cada herói. A cada turno a lista é lida de <b>cima → baixo</b>; a <b>1ª condição verdadeira</b> executa sua ação e <b>para</b>.</p>
    <div id="gh-mount"></div>
    <div class="row" style="justify-content:center;margin-top:12px"><button id="gh-close">Fechar</button></div>
  </div></div>`;
  renderGambitHUD($('gh-mount'));
  $('gh-close').onclick = closeModal;
  bindModalDismiss();
}
function renderGambitHUD(mount){
  const hs = S.heroes.find(h=>h.id===ghHero); const def = HERO_DEFS.find(h=>h.id===hs.id);
  const condOpts = S.unlockedConditions;
  const rr = () => renderGambitHUD(mount);
  const tabs = S.heroes.map(h=>{ const d = HERO_DEFS.find(x=>x.id===h.id);
    return `<button class="gh-tab ${h.id===ghHero?'on':''}" data-h="${h.id}" style="--acc:${accentOf(h.id)}">
      <img src="assets/${h.id}_face.png" alt=""><span>${d.name}</span></button>`; }).join('');
  const rows = hs.gambits.map((g,i)=>{
    const on = g.enabled !== false;
    const cLabel = CONDITIONS[g.condition]?.label || '—';
    const aLabel = SKILLS[g.action]?.name || '—';
    const cOpen = ghPick && ghPick.line===i && ghPick.kind==='condition';
    const aOpen = ghPick && ghPick.line===i && ghPick.kind==='action';
    return `<div class="gg ${on?'':'off'}" data-i="${i}">
      <div class="gg-num gh-drag" title="Arraste p/ reordenar">${i+1}</div>
      <div class="gg-body">
        <div class="gg-line"><span class="gg-lb">SE</span>
          <button class="gpick cond ${cOpen?'open':''}" data-line="${i}" data-kind="condition">${cLabel}<span class="gpick-ar">${cOpen?'▴':'▾'}</span></button></div>
        ${cOpen ? ghInlineList(hs, def, i, 'condition') : ''}
        <div class="gg-line"><span class="gg-lb arw">➜</span>
          <button class="gpick act ${aOpen?'open':''}" data-line="${i}" data-kind="action">${aLabel}<span class="gpick-ar">${aOpen?'▴':'▾'}</span></button></div>
        ${aOpen ? ghInlineList(hs, def, i, 'action') : ''}
      </div>
      <div class="gg-status">
        <button class="gg-en ${on?'on':''}" data-i="${i}" title="${on?'Desativar':'Ativar'}">✓</button>
        <button class="gg-rm" data-i="${i}" title="Remover">✕</button>
      </div>
    </div>`;
  }).join('');
  const locked = Array.from({length: def.maxSlots - hs.slots}, (_,k)=>{
    const slotNo = hs.slots + 1 + k; const cost = ACADEMY.slotCosts[slotNo];
    if(k===0 && cost) return `<div class="gg-slot"><span class="gg-slock">🔒 Slot ${slotNo}</span>${costHTML(cost)}
      <button class="gh-unlock small primary" data-slot="${slotNo}" ${canAfford(cost)?'':'disabled'}>Desbloquear</button></div>`;
    return `<div class="gg-slot dim"><span class="gg-slock">🔒 Slot ${slotNo} — bloqueado</span></div>`;
  }).join('');
  const canAdd = hs.gambits.length < hs.slots;
  const active = hs.gambits.filter(g=>g.enabled!==false).length;
  mount.innerHTML = `
    <div class="gh-tabs">${tabs}</div>
    <div class="gg-hero"><img class="gg-hface" src="assets/${hs.id}_face.png" alt="">
      <span class="gg-hname">${def.name}</span>
      <span class="gg-hcount">${active}/${hs.gambits.length} ativas</span></div>
    <div class="gg-colhead"><span>Nº</span><span>SE (condição)  ➜  ENTÃO (ação)</span><span>Status</span></div>
    <div class="gg-list">${rows || '<div class="muted tiny" style="text-align:center;padding:14px">Sem gambits — adicione abaixo.</div>'}</div>
    ${locked ? `<div class="gg-slots">${locked}</div>` : ''}
    <button class="gh-add" ${canAdd?'':'disabled'}>+ Adicionar gambit</button>`;
  mount.querySelectorAll('.gh-tab').forEach(b => b.onclick = () => { ghHero=b.dataset.h; rr(); });
  mount.querySelectorAll('.gpick').forEach(btn => btn.onclick = () => {
    const line = +btn.dataset.line, kind = btn.dataset.kind;
    ghPick = (ghPick && ghPick.line===line && ghPick.kind===kind) ? null : { line, kind };
    rr();
  });
  mount.querySelectorAll('.gopt').forEach(b => b.onclick = () => {
    const line = +b.dataset.line, kind = b.dataset.kind, id = b.dataset.id;
    if(kind==='condition') hs.gambits[line].condition = id; else hs.gambits[line].action = id;
    save(S); ghPick = null; rr();
  });
  mount.querySelectorAll('.gg-rm').forEach(x => x.onclick = () => { hs.gambits.splice(+x.dataset.i,1); save(S); rr(); });
  mount.querySelectorAll('.gg-en').forEach(t => t.onclick = () => { const g=hs.gambits[+t.dataset.i]; g.enabled = (g.enabled===false); save(S); rr(); });
  mount.querySelectorAll('.gh-unlock').forEach(b => b.onclick = () => { const n=+b.dataset.slot; const cost=ACADEMY.slotCosts[n]; if(!canAfford(cost))return; spend(cost); hs.slots++; save(S); bumpRes(); rr(); });
  const add = mount.querySelector('.gh-add');
  if(add) add.onclick = () => { if(hs.gambits.length>=hs.slots)return; hs.gambits.push({ condition:S.unlockedConditions[0], action:def.skills[0], enabled:true }); save(S); rr(); };
  enableGambitDrag(mount, hs, rr);
}
// arrastar linhas de gambit p/ reordenar (pointer-based, funciona no touch)
function enableGambitDrag(mount, hs, rerender){
  const list = mount.querySelector('.gg-list'); if(!list) return;
  mount.querySelectorAll('.gh-drag').forEach(handle => {
    let drag = null;
    handle.addEventListener('pointerdown', e => {
      const row = handle.closest('.gg'); if(!row) return;
      e.preventDefault();
      const rows = [...list.querySelectorAll('.gg')];
      const h = row.getBoundingClientRect().height + 8;   // altura + gap
      drag = { row, from: rows.indexOf(row), n: rows.length, startY: e.clientY, h, moved:false };
      row.classList.add('dragging'); handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', e => {
      if(!drag) return;
      const dy = e.clientY - drag.startY; drag.moved = true;
      drag.row.style.transform = `translateY(${dy}px)`;
    });
    const end = e => {
      if(!drag) return;
      const dy = (e.clientY||drag.startY) - drag.startY;
      const to = Math.max(0, Math.min(drag.n-1, drag.from + Math.round(dy/drag.h)));
      drag.row.style.transform=''; drag.row.classList.remove('dragging');
      const { from, moved } = drag; drag = null;
      if(moved && to!==from){ const [it]=hs.gambits.splice(from,1); hs.gambits.splice(to,0,it); save(S); rerender(); }
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  });
}

// ---- PAINEL DIREITO: NPC + LOJA DE GAMBITS ----
function renderHubShop(mount){
  const shopIds = Object.keys(ACADEMY.conditionShop);
  mount.innerHTML = `<div class="panel-cap">📜 Loja de Gambits</div>
    <div class="shop-wrap">
      <div class="npc-box"><img class="npc" src="assets/npc.png" alt="">
        <div class="npc-say">"Novas táticas, viajante?"</div></div>
      <div class="shop-list">${shopIds.map(cid=>{
        const owned = S.unlockedConditions.includes(cid); const cost = ACADEMY.conditionShop[cid];
        return `<div class="shop-item ${owned?'owned':''}">
          <div class="si-name">${CONDITIONS[cid].label}</div>
          ${ owned ? `<span class="si-owned">✓ Adquirido</span>`
                   : `<span class="si-cost">${costHTML(cost)}</span>
                      <button class="small shop-buy" data-id="${cid}" ${canAfford(cost)?'':'disabled'}>Comprar</button>` }
        </div>`;
      }).join('')}</div>
    </div>`;
  mount.querySelectorAll('.shop-buy').forEach(b => b.onclick = () => {
    const cid = b.dataset.id; const cost = ACADEMY.conditionShop[cid];
    if(!canAfford(cost)) return; spend(cost); S.unlockedConditions.push(cid); save(S); bumpRes(); renderHubShop(mount);
  });
}

// ---- MODAIS ----
function closeModal(){ $('modal-root').innerHTML=''; }
// Seletor de BLOCOS (substitui o <select> nativo): lista estilizada azul(condição)/vermelho(ação)
// fecha por clique no fundo escuro + botão ✕
function bindModalDismiss(){
  const m = $('modal-root').querySelector('.modal'); if(!m) return;
  m.addEventListener('click', e => { if(e.target === m) closeModal(); });
  const x = m.querySelector('.modal-x'); if(x) x.onclick = closeModal;
}
function openPanelModal(title, renderFn){
  $('modal-root').innerHTML = `<div class="modal"><div class="box box-wide">
    <button class="modal-x" title="Fechar">✕</button>
    <h2>${title}</h2><div id="pm-body" style="text-align:left"></div>
    <div class="row" style="justify-content:center;margin-top:12px"><button id="pm-close">Fechar</button></div>
  </div></div>`;
  renderFn($('pm-body'));
  $('pm-close').onclick = closeModal;
  bindModalDismiss();
}
function openOptions(){
  $('modal-root').innerHTML = `<div class="modal"><div class="box">
    <button class="modal-x" title="Fechar">✕</button>
    <h2>⚙️ Opções</h2>
    <div class="row" style="justify-content:center;margin-top:10px">
      <button class="primary" id="op-save">💾 Salvar agora</button>
      <button class="danger" id="op-reset">🗑️ Reiniciar jogo</button>
      <button id="op-close">Fechar</button>
    </div>
    <p class="muted tiny" id="op-msg" style="margin-top:10px">&nbsp;</p>
  </div></div>`;
  $('op-save').onclick  = () => { save(S); $('op-msg').textContent='Progresso salvo ✓'; };
  $('op-reset').onclick = () => { if(confirm('Reiniciar todo o progresso?')){ const n=newGame(); Object.assign(S,n); save(S); closeModal(); renderHud(); renderBase(); } };
  $('op-close').onclick = closeModal;
  bindModalDismiss();
}

function heroRuntimeStats(hs){
  const def = HERO_DEFS.find(h=>h.id===hs.id);
  const eb = itemBonuses(hs.equip);
  return { def, eb,
    atk: def.base.atk + forgeAtkBonus(hs.weaponLevel) + eb.atk,
    hp:  def.base.hp  + eb.hp,
    mag: def.base.mag + eb.mag,
    spd: def.base.spd + eb.spd,
    mp:  def.base.mp  + eb.mp,
    defense: def.base.def + eb.def };
}

function renderForge(body, onlyId){
  const list = onlyId ? S.heroes.filter(h=>h.id===onlyId) : S.heroes;
  body.innerHTML = `${onlyId?'':'<p class="muted tiny" style="margin:0 2px 10px;text-align:center">Melhore as armas — bônus de ATK permanente.</p>'}
    <div class="hero-cards">${list.map(hs=>{
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
    spend(next.cost); hs.weaponLevel++; save(S); bumpRes(); renderForge(body, onlyId);
    if($('hub-left')) renderHubParty($('hub-left'));   // reflete +ATK/nível no hub
  });
}

function renderAcademy(body){
  body.innerHTML = `<p class="muted tiny" style="margin:0 2px 10px">Desbloqueie mais linhas de gambit por herói. (As condicionais você compra na 📜 Loja de Gambits.)</p>
    <div class="hero-cards">${S.heroes.map(hs=>{
      const def = HERO_DEFS.find(h=>h.id===hs.id); const nextSlot = hs.slots+1;
      const cost = ACADEMY.slotCosts[nextSlot];
      return `<div class="hcard" style="--acc:${accentOf(def.id)}"><div class="top"><div class="av">${spriteFor(def.id)}</div>
        <div><div class="nm">${def.name}</div><div class="kl">${hs.slots}/${def.maxSlots} slots</div></div></div>
        ${ cost
          ? `${costHTML(cost)}<button class="small primary slot-btn" data-id="${hs.id}" ${canAfford(cost)?'':'disabled'} style="margin-top:8px;width:100%">Desbloquear slot ${nextSlot}</button>`
          : `<div class="tiny" style="color:var(--gold);margin-top:6px">★ Slots no máximo</div>` }
      </div>`;
    }).join('')}</div>`;
  body.querySelectorAll('.slot-btn').forEach(b => b.onclick = () => {
    const hs = S.heroes.find(h=>h.id===b.dataset.id); const cost = ACADEMY.slotCosts[hs.slots+1];
    if(!cost || !canAfford(cost)) return; spend(cost); hs.slots++; save(S); bumpRes(); renderAcademy(body);
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
  // drop de itens de equipamento
  expo.runLoot.items = expo.runLoot.items || [];
  for(const d of ITEM_DROPS){ if(Math.random() < d.chance){ (S.inventory=S.inventory||[]).push(d.item); expo.runLoot.items.push(d.item); } }
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
  const items = Object.entries(L).filter(([k,v])=>k!=='items'&&v>0)
    .map(([k,v])=>`<span>${RES_ICON[k]||''} ${v}</span>`).join('') || '<span class="muted">—</span>';
  const drops = (L.items||[]).map(iid=>{ const it=ITEMS[iid]; return it?`<span class="drop">${it.icon} ${it.name}</span>`:''; }).join('');
  const root = $('modal-root');
  root.innerHTML = `<div class="modal"><div class="box">
    <h2>🏆 Expedição Vitoriosa!</h2>
    <p class="muted">Recompensas coletadas nesta corrida:</p>
    <div class="loot">${items}</div>
    ${drops?`<p class="muted" style="margin:8px 0 2px">Itens encontrados:</p><div class="loot">${drops}</div>`:''}
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
window.addEventListener('resize', () => {
  if(screen==='expedition'){ const cv=$('dungeon'); if(cv){ cv.width=cv.clientWidth; cv.height=cv.clientHeight; drawDungeon(cv); placeTorches(); } }
  if(screen==='base') fitBase();
});

// atalho de debug: novo jogo com ?reset
if(location.search.includes('reset')){ localStorage.removeItem('vibe_gambit_save_v1'); location.href = location.pathname; }
