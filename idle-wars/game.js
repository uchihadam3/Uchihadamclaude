/* =========================================================================
   IDLE WARS — cliente. Toda regra de verdade roda no servidor (Supabase RPC);
   aqui só desenhamos a tela e prevemos o crescimento idle de forma suave.
   ========================================================================= */
"use strict";

// ---------- Config / cliente Supabase ----------
const CFG = window.IDLE_WARS_CONFIG;
let sb = null;
const hasConfig = CFG && CFG.SUPABASE_URL && !CFG.SUPABASE_URL.includes("SEU-PROJETO");

// ---------- Definições do jogo (espelham as fórmulas do servidor) ----------
const BUILDINGS = [
  { key:"mine",      ico:"🪙", name:"Mina de Ouro", g:30, w:50,
    desc:l=>`Produz <b>${gps(l).toFixed(1)}</b> ouro/s → <b>${gps(l+1).toFixed(1)}</b>` },
  { key:"sawmill",   ico:"🪵", name:"Serraria",     g:50, w:30,
    desc:l=>`Produz <b>${wps(l).toFixed(1)}</b> madeira/s → <b>${wps(l+1).toFixed(1)}</b>` },
  { key:"farm",      ico:"🌾", name:"Fazenda",      g:40, w:40,
    desc:l=>`Teto de população <b>${20*l}</b> → <b>${20*(l+1)}</b>` },
  { key:"barracks",  ico:"🏹", name:"Quartel",      g:80, w:60,
    desc:l=>`Ataque das tropas <b>+${((l-1)*10)}%</b> → <b>+${(l*10)}%</b>` },
  { key:"warehouse", ico:"📦", name:"Armazém",      g:60, w:80,
    desc:l=>`Capacidade <b>${Math.round(cap(l))}</b> · cofre <b>${Math.round(vault(l))}</b>` },
  { key:"wall",      ico:"🧱", name:"Muralha",      g:70, w:70,
    desc:l=>`Defesa <b>+${((l-1)*5)}%</b> → <b>+${(l*5)}%</b>` },
];
const TROOPS = [
  { key:"inf", ico:"🗡️", name:"Infantaria", g:10, pop:1, beats:"🏹" },
  { key:"arc", ico:"🏹", name:"Arqueiro",   g:18, pop:1, beats:"🐎" },
  { key:"cav", ico:"🐎", name:"Cavalaria",  g:30, pop:2, beats:"🗡️" },
];

// fórmulas (iguais ao schema.sql)
function gps(l){ return 1.0 * Math.pow(1.15, l-1); }
function wps(l){ return 0.8 * Math.pow(1.15, l-1); }
function cap(l){ return 500 * Math.pow(1.4, l-1); }
function vault(l){ return 100 * Math.pow(1.3, l-1); }
function costOf(b, lvl){ return { g: Math.ceil(b.g*Math.pow(1.6,lvl-1)), w: Math.ceil(b.w*Math.pow(1.6,lvl-1)) }; }
function powerOf(p){ return p.inf*10 + p.arc*14 + p.cav*24 +
  (p.mine_lvl+p.sawmill_lvl+p.farm_lvl+p.barracks_lvl+p.warehouse_lvl+p.wall_lvl)*15; }

// ---------- Estado local ----------
let ME = null;             // última foto do servidor
let PRED = null;           // base pra prever recursos: {gold, wood, t, gps, wps, cap}
let targetsCache = [];

// ---------- Atalhos DOM ----------
const $ = s => document.querySelector(s);
const el = (id) => document.getElementById(id);

// ---------- Toast ----------
let toastTimer;
function toast(msg, kind){
  const t = el("toast"); t.textContent = msg;
  t.className = "toast show " + (kind||"");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.className = "toast", 2600);
}

// =========================================================================
// BOOT
// =========================================================================
window.addEventListener("DOMContentLoaded", init);

async function init(){
  if(!hasConfig){
    el("login-status").innerHTML =
      "⚠️ <b>Falta configurar o Supabase.</b><br>Copie <code>config.example.js</code> para " +
      "<code>config.js</code> e preencha suas chaves. Veja o <code>README.md</code>.";
    el("btn-join").disabled = true;
    return;
  }
  sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);

  // já logado? (sessão anônima persiste no navegador)
  const { data:{ session } } = await sb.auth.getSession();
  if(session){
    const { data } = await sb.rpc("get_state");
    if(data){ ME = data; enterGame(); return; }
  }
  el("btn-join").addEventListener("click", join);
  el("nick").addEventListener("keydown", e=>{ if(e.key==="Enter") join(); });
}

async function join(){
  const nick = el("nick").value.trim();
  el("login-error").textContent = "";
  if(nick.length < 2){ el("login-error").textContent = "Nome muito curto."; return; }
  el("btn-join").disabled = true;

  try{
    // login anônimo (habilite em Authentication -> Providers -> Anonymous)
    let { data:{ session } } = await sb.auth.getSession();
    if(!session){
      const { error } = await sb.auth.signInAnonymously();
      if(error) throw error;
    }
    const { data, error } = await sb.rpc("join_game", { p_nick: nick });
    if(error) throw error;
    ME = data; enterGame();
  }catch(err){
    el("login-error").textContent = friendly(err);
    el("btn-join").disabled = false;
  }
}

function enterGame(){
  el("screen-login").classList.remove("active");
  el("screen-game").classList.add("active");
  syncFromServer(ME);
  renderBuildings(); renderTroops();
  wireTabs();
  // loop de predição suave (60fps) + re-sync periódico com o servidor
  requestAnimationFrame(tick);
  setInterval(refreshState, 20000);   // corrige drift e mostra ataques recebidos
}

// =========================================================================
// SINCRONIZAÇÃO E PREDIÇÃO DE RECURSOS
// =========================================================================
function syncFromServer(p){
  ME = p;
  PRED = { gold:+p.gold, wood:+p.wood, t:performance.now(),
           gps:gps(p.mine_lvl), wps:wps(p.sawmill_lvl), cap:cap(p.warehouse_lvl) };
  el("me-name").textContent = p.nickname;
  el("me-power").textContent = powerOf(p) + "⚡";
}

async function refreshState(){
  if(!sb) return;
  const { data } = await sb.rpc("get_state");
  if(data){ syncFromServer(data); renderBuildings(); renderTroops(); }
}

function predicted(){
  if(!PRED) return { gold:0, wood:0 };
  const dt = (performance.now() - PRED.t)/1000;
  return {
    gold: Math.min(PRED.cap, PRED.gold + PRED.gps*dt),
    wood: Math.min(PRED.cap, PRED.wood + PRED.wps*dt),
  };
}

function tick(){
  const r = predicted();
  el("r-gold").textContent = Math.floor(r.gold).toLocaleString("pt-BR");
  el("r-wood").textContent = Math.floor(r.wood).toLocaleString("pt-BR");
  el("r-gold-rate").textContent = "+" + PRED.gps.toFixed(1) + "/s";
  el("r-wood-rate").textContent = "+" + PRED.wps.toFixed(1) + "/s";
  if(ME){
    const popUsed = ME.inf + ME.arc + ME.cav*2, popCap = 20*ME.farm_lvl;
    el("r-pop").textContent = `${popUsed}/${popCap}`;
  }
  requestAnimationFrame(tick);
}

// =========================================================================
// ABAS
// =========================================================================
function wireTabs(){
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tabpane").forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      const name = btn.dataset.tab;
      el("tab-"+name).classList.add("active");
      if(name==="attack") loadTargets();
      if(name==="log") loadBattles();
    });
  });
}

// =========================================================================
// BASE
// =========================================================================
function renderBuildings(){
  if(!ME) return;
  const wrap = el("buildings"); wrap.innerHTML = "";
  const r = predicted();
  BUILDINGS.forEach(b=>{
    const lvl = ME[b.key+"_lvl"];
    const c = costOf(b, lvl);
    const canPay = r.gold>=c.g && r.wood>=c.w;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="row">
        <div class="ico">${b.ico}</div>
        <div><h3>${b.name}</h3><span class="lvl">Nível ${lvl}</span></div>
      </div>
      <div class="desc">${b.desc(lvl)}</div>
      <div class="cost ${canPay?"ok":"no"}">🪙 ${c.g.toLocaleString("pt-BR")} · 🪵 ${c.w.toLocaleString("pt-BR")}</div>
      <div class="actions"><button class="btn btn-primary btn-sm" ${canPay?"":"disabled"}>Melhorar</button></div>`;
    card.querySelector("button").addEventListener("click", ()=>upgrade(b.key));
    wrap.appendChild(card);
  });
}

async function upgrade(key){
  try{
    const { data, error } = await sb.rpc("upgrade_building", { p_key:key });
    if(error) throw error;
    syncFromServer(data); renderBuildings(); renderTroops();
    toast("Edifício melhorado!", "ok");
  }catch(err){ toast(friendly(err), "err"); }
}

// =========================================================================
// EXÉRCITO
// =========================================================================
function renderTroops(){
  if(!ME) return;
  const wrap = el("troops"); wrap.innerHTML = "";
  TROOPS.forEach(t=>{
    const owned = ME[t.key];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="row">
        <div class="ico">${t.ico}</div>
        <div><h3>${t.name}</h3><span class="lvl">Você tem: ${owned}</span></div>
      </div>
      <div class="desc">Forte contra ${t.beats}. Custo: 🪙 ${t.g} · 🍖 ${t.pop} pop.</div>
      <div class="actions">
        <input type="number" min="1" value="1" />
        <button class="btn btn-primary btn-sm">Treinar</button>
      </div>`;
    const input = card.querySelector("input");
    card.querySelector("button").addEventListener("click", ()=>train(t.key, parseInt(input.value)||1));
    wrap.appendChild(card);
  });
}

async function train(type, qty){
  try{
    const { data, error } = await sb.rpc("train_troops", { p_type:type, p_qty:qty });
    if(error) throw error;
    syncFromServer(data); renderTroops(); renderBuildings();
    toast("Tropas treinadas!", "ok");
  }catch(err){ toast(friendly(err), "err"); }
}

// =========================================================================
// ATACAR
// =========================================================================
async function loadTargets(){
  const wrap = el("targets"); wrap.innerHTML = `<p class="muted">Carregando…</p>`;
  try{
    const { data, error } = await sb.rpc("list_targets");
    if(error) throw error;
    targetsCache = data || [];
    const myPower = Math.max(1, powerOf(ME));
    wrap.innerHTML = "";
    if(targetsCache.length===0){ wrap.innerHTML = `<p class="muted">Nenhum outro comandante ainda. Chame seus amigos! 🎮</p>`; return; }
    targetsCache.forEach(t=>{
      const ratio = t.power / myPower;
      let badge, cls="";
      if(t.shielded){ badge = `<span class="badge shield">🛡️ Protegido</span>`; cls="infair"; }
      else if(ratio < 0.75){ badge = `<span class="badge weak">Fraco · loot baixo</span>`; }
      else if(ratio > 1.33){ badge = `<span class="badge strong">Forte · arriscado</span>`; }
      else { badge = `<span class="badge fair">⚖️ Justo · loot cheio</span>`; }

      const row = document.createElement("div");
      row.className = "target " + cls;
      row.innerHTML = `
        <div class="t-info">
          <div class="t-name">${escapeHtml(t.nickname)} ${badge}</div>
          <div class="t-meta">Poder ~${roundP(t.power)}⚡ · exército ${t.army} tropas</div>
        </div>
        <button class="btn ${t.shielded?"btn-ghost":"btn-danger"} btn-sm" ${t.shielded?"disabled":""}>⚔️ Atacar</button>`;
      if(!t.shielded) row.querySelector("button").addEventListener("click", ()=>openAttackModal(t));
      wrap.appendChild(row);
    });
  }catch(err){ wrap.innerHTML = `<p class="error">${friendly(err)}</p>`; }
}

function openAttackModal(target){
  const body = el("modal-body");
  body.innerHTML = `
    <h2>⚔️ Atacar ${escapeHtml(target.nickname)}</h2>
    <p class="sub">Poder ~${roundP(target.power)}⚡ · ~${target.army} tropas defendendo. A composição da defesa é desconhecida — aposte na sua leitura.</p>
    ${TROOPS.map(t=>`
      <div class="troop-pick">
        <div>${t.ico} <b>${t.name}</b> <span class="avail">(você tem ${ME[t.key]})</span></div>
        <input type="number" data-t="${t.key}" min="0" max="${ME[t.key]}" value="${ME[t.key]}" style="width:80px" />
      </div>`).join("")}
    <div class="modal-actions">
      <button class="btn btn-ghost" id="m-cancel">Cancelar</button>
      <button class="btn btn-danger" id="m-go">Enviar exército</button>
    </div>`;
  el("modal").classList.add("open");
  el("m-cancel").addEventListener("click", closeModal);
  el("m-go").addEventListener("click", ()=>doAttack(target));
}

async function doAttack(target){
  const vals = {};
  document.querySelectorAll("#modal-body input[data-t]").forEach(i=> vals[i.dataset.t] = parseInt(i.value)||0);
  if((vals.inf+vals.arc+vals.cav)<=0){ toast("Envie ao menos 1 tropa.", "err"); return; }
  el("m-go").disabled = true;
  try{
    const { data, error } = await sb.rpc("attack",
      { p_target: target.id, p_inf: vals.inf, p_arc: vals.arc, p_cav: vals.cav });
    if(error) throw error;
    showResult(data, target);
    await refreshState();
  }catch(err){ toast(friendly(err), "err"); closeModal(); }
}

function showResult(res, target){
  const won = res.winner === "attacker";
  const body = el("modal-body");
  const domName = d => ({inf:"🗡️ Infantaria",arc:"🏹 Arqueiros",cav:"🐎 Cavalaria"}[d]||d);
  body.innerHTML = `
    <div class="big-verdict ${won?"win":"lose"}">${won?"VITÓRIA! 🏆":"DERROTA… 💀"}</div>
    <p class="sub" style="text-align:center">Contra <b>${escapeHtml(target.nickname)}</b></p>
    <div class="result-line"><span>Seu poder de ataque</span><b>${res.att_power}</b></div>
    <div class="result-line"><span>Defesa do alvo</span><b>${res.def_power}</b></div>
    <div class="result-line"><span>Confronto de tropas</span><b>${domName(res.att_dom)} vs ${domName(res.def_dom)}</b></div>
    <hr style="border-color:var(--line);margin:12px 0">
    <div class="result-line"><span>💰 Saque</span><b>🪙 ${res.loot_gold} · 🪵 ${res.loot_wood}</b></div>
    <div class="result-line"><span>Suas perdas</span><b>🗡️${res.att_losses.inf} 🏹${res.att_losses.arc} 🐎${res.att_losses.cav}</b></div>
    <div class="result-line"><span>Perdas do inimigo</span><b>🗡️${res.def_losses.inf} 🏹${res.def_losses.arc} 🐎${res.def_losses.cav}</b></div>
    <div class="modal-actions"><button class="btn btn-primary" id="m-close">Fechar</button></div>`;
  el("m-close").addEventListener("click", ()=>{ closeModal(); loadTargets(); });
}

function closeModal(){ el("modal").classList.remove("open"); }

// =========================================================================
// BATALHAS (histórico)
// =========================================================================
async function loadBattles(){
  const wrap = el("battle-log"); wrap.innerHTML = `<p class="muted">Carregando…</p>`;
  try{
    const { data, error } = await sb.rpc("get_battles");
    if(error) throw error;
    if(!data || data.length===0){ wrap.innerHTML = `<p class="muted">Nenhuma batalha ainda.</p>`; return; }
    wrap.innerHTML = "";
    data.forEach(b=>{
      const iAttacked = b.attacker_id === ME.id;
      const iWon = (iAttacked && b.winner==="attacker") || (!iAttacked && b.winner==="defender");
      const other = iAttacked ? b.defender_name : b.attacker_name;
      const verb = iAttacked ? "Você atacou" : "Foi atacado por";
      const loot = iAttacked
        ? `saqueou 🪙${b.loot_gold} 🪵${b.loot_wood}`
        : `perdeu 🪙${b.loot_gold} 🪵${b.loot_wood}`;
      const div = document.createElement("div");
      div.className = "log " + (iWon?"win":"lose");
      div.innerHTML = `
        <div class="l-top">
          <span><b>${iWon?"🏆":"💀"} ${verb} ${escapeHtml(other)}</b></span>
          <span class="l-when">${when(b.created_at)}</span>
        </div>
        <div class="l-detail">${iWon?"Vitória":"Derrota"} · ${loot}</div>`;
      wrap.appendChild(div);
    });
  }catch(err){ wrap.innerHTML = `<p class="error">${friendly(err)}</p>`; }
}

// =========================================================================
// UTIL
// =========================================================================
function roundP(p){ return Math.round(p/10)*10; }   // poder "estimado"
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function when(iso){
  const d = new Date(iso), diff = (Date.now()-d)/1000;
  if(diff<60) return "agora";
  if(diff<3600) return Math.floor(diff/60)+"min atrás";
  if(diff<86400) return Math.floor(diff/3600)+"h atrás";
  return d.toLocaleDateString("pt-BR");
}
function friendly(err){
  const m = (err && (err.message||err.error_description||err.msg)) || "Erro inesperado";
  if(/Anonymous sign-ins are disabled/i.test(m))
    return "Login anônimo desativado. Habilite em Authentication → Providers → Anonymous no Supabase.";
  return m.replace(/^.*?:\s*/, "");
}
