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

// Layout da vila isométrica: sprite (estrutura) e célula (gx,gy) de cada edifício.
// Grid 5x5 (0..4). Borda = muralha; anel interno = edifícios; centro = fortaleza.
const ISO = {
  grid:5, TW:72, TH:44,
  build:{
    mine:      { sprite:"⛏️",  gx:1, gy:1 },
    sawmill:   { sprite:"🪵",  gx:2, gy:1 },
    farm:      { sprite:"🌾",  gx:3, gy:1 },
    barracks:  { sprite:"⚔️",  gx:1, gy:3 },
    warehouse: { sprite:"📦",  gx:2, gy:3 },
    wall:      { sprite:"🗼",  gx:3, gy:3 },
  },
  keep:{ sprite:"🏰", gx:2, gy:2 },              // fortaleza (centro, decorativa)
};

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
// MODO DEMO (sem Supabase) — roda tudo no navegador, com bots pra atacar.
// Replica exatamente as fórmulas do schema.sql. Persiste em localStorage.
// Só serve pra testar sozinho: nada aqui é seguro/anti-trapaça (é o servidor
// quem faz isso quando o Supabase está configurado).
// =========================================================================
let DEMO = false;
const DEMO_KEY = "idlewars_demo_v1";

const Demo = {
  db: null,
  load(){
    if(this.db) return this.db;
    const raw = localStorage.getItem(DEMO_KEY);
    this.db = raw ? JSON.parse(raw) : { me:null, bots:[], battles:[] };
    return this.db;
  },
  save(){ localStorage.setItem(DEMO_KEY, JSON.stringify(this.db)); },

  newPlayer(id, nick, over){
    return Object.assign({
      id, nickname:nick, gold:50, wood:50,
      mine_lvl:1, sawmill_lvl:1, farm_lvl:1, barracks_lvl:1, warehouse_lvl:1, wall_lvl:1,
      inf:0, arc:0, cav:0,
      last_tick:Date.now(), shield_until:Date.now()+30*60000,
      attack_cooldown_until:0, created_at:Date.now(),
      _base:{inf:0,arc:0,cav:0}   // baseline pra bots regenerarem tropas
    }, over||{});
  },
  seedBots(){
    const B = (id,nick,o)=> this.newPlayer(id,nick,Object.assign(
      { shield_until:0, gold:600, wood:600 }, o,
      { _base:{ inf:o.inf||0, arc:o.arc||0, cav:o.cav||0 } }));
    this.db.bots = [
      B("bot-1","Konoha_Genin",  { mine_lvl:2, sawmill_lvl:2, farm_lvl:2, wall_lvl:1, inf:8,  arc:4,  cav:0 }),
      B("bot-2","Akatsuki_Ronin",{ mine_lvl:3, sawmill_lvl:3, farm_lvl:3, wall_lvl:2, barracks_lvl:2, inf:12, arc:10, cav:4 }),
      B("bot-3","Sannin_Orochi", { mine_lvl:4, sawmill_lvl:3, farm_lvl:4, wall_lvl:3, barracks_lvl:3, inf:20, arc:14, cav:10 }),
      B("bot-4","Aldeia_Areia",  { mine_lvl:2, sawmill_lvl:2, farm_lvl:2, wall_lvl:1, inf:5,  arc:2,  cav:1 }),
    ];
  },

  _syncRes(p){
    const elapsed = Math.max(0, (Date.now() - p.last_tick)/1000);
    const g = gps(p.mine_lvl), w = wps(p.sawmill_lvl), c = cap(p.warehouse_lvl);
    p.gold = p.gold >= c ? p.gold : Math.min(c, p.gold + g*elapsed);
    p.wood = p.wood >= c ? p.wood : Math.min(c, p.wood + w*elapsed);
    // bots regeneram tropas devagar rumo ao baseline (~1 tropa a cada 25s)
    if(p._base){
      const regen = Math.floor(elapsed/25);
      if(regen>0){
        for(const k of ["inf","arc","cav"]) p[k] = Math.min(p._base[k], p[k]+regen);
      }
    }
    p.last_tick = Date.now();
  },

  // --- API espelhando as RPCs do servidor. Retorna {data,error} como o supabase. ---
  ok(d){ return { data:d, error:null }; },
  fail(msg){ return { data:null, error:{ message:msg } }; },

  join_game({ p_nick }){
    this.load();
    if(!this.db.me){
      this.db.me = this.newPlayer("me", p_nick);
      this.seedBots();
      this.save();
    }
    return this.ok(this.db.me);
  },
  get_state(){
    this.load();
    if(!this.db.me) return this.fail("Sem jogador");
    this._syncRes(this.db.me); this.save();
    return this.ok(this.db.me);
  },
  list_targets(){
    this.load();
    this.db.bots.forEach(b=>this._syncRes(b)); this.save();
    return this.ok(this.db.bots.map(b=>({
      id:b.id, nickname:b.nickname, power:powerOf(b),
      shielded: b.shield_until > Date.now(), army: b.inf+b.arc+b.cav
    })));
  },
  upgrade_building({ p_key }){
    const p = this.db.me; this._syncRes(p);
    const b = BUILDINGS.find(x=>x.key===p_key); if(!b) return this.fail("Edifício inválido");
    const c = costOf(b, p[p_key+"_lvl"]);
    if(p.gold < c.g || p.wood < c.w) return this.fail(`Recursos insuficientes (precisa ${c.g} ouro, ${c.w} madeira)`);
    p.gold -= c.g; p.wood -= c.w; p[p_key+"_lvl"]++; this.save();
    return this.ok(p);
  },
  train_troops({ p_type, p_qty }){
    const p = this.db.me; this._syncRes(p);
    const t = TROOPS.find(x=>x.key===p_type); if(!t) return this.fail("Tropa inválida");
    const popCap = 20*p.farm_lvl, popUsed = p.inf+p.arc+p.cav*2;
    if(popUsed + t.pop*p_qty > popCap) return this.fail(`População insuficiente (usa ${popUsed}/${popCap}). Melhore a Fazenda.`);
    if(p.gold < t.g*p_qty) return this.fail(`Ouro insuficiente (precisa ${t.g*p_qty})`);
    p.gold -= t.g*p_qty; p[p_type] += p_qty; this.save();
    return this.ok(p);
  },
  attack({ p_target, p_inf, p_arc, p_cav }){
    const a = this.db.me, d = this.db.bots.find(x=>x.id===p_target);
    if(!d) return this.fail("Alvo inexistente");
    this._syncRes(a); this._syncRes(d);
    if(a.attack_cooldown_until > Date.now()) return this.fail("Ataque em recarga. Aguarde antes de atacar de novo.");
    if(d.shield_until > Date.now()) return this.fail("O alvo está protegido por um escudo.");
    if(p_inf>a.inf||p_arc>a.arc||p_cav>a.cav) return this.fail("Você não tem tropas suficientes para esse ataque.");

    let att = (p_inf*5 + p_arc*7 + p_cav*10) * (1 + 0.10*(a.barracks_lvl-1));
    const def = (d.inf*5 + d.arc*4 + d.cav*6 + 10) * (1 + 0.05*(d.wall_lvl-1));
    const dom = (i,r,c)=> c>=i&&c>=r ? "cav" : (r>=i?"arc":"inf");
    const aDom = dom(p_inf,p_arc,p_cav), dDom = dom(d.inf,d.arc,d.cav);
    let comp = 1.0;
    if((aDom==="inf"&&dDom==="arc")||(aDom==="arc"&&dDom==="cav")||(aDom==="cav"&&dDom==="inf")) comp=1.25;
    else if((aDom==="arc"&&dDom==="inf")||(aDom==="cav"&&dDom==="arc")||(aDom==="inf"&&dDom==="cav")) comp=0.80;
    att *= comp;

    const total = att+def; let winner, aFrac, dFrac;
    if(att>def){ winner="attacker"; aFrac=Math.min(0.90, def/att*0.5); dFrac=Math.min(0.95, Math.max(0.5, 0.5+0.4*(att/total))); }
    else { winner="defender"; aFrac=Math.min(0.98, Math.max(0.6, 0.6+0.4*(def/total))); dFrac=Math.min(0.85, att/def*0.4); }

    const aL={inf:Math.floor(p_inf*aFrac),arc:Math.floor(p_arc*aFrac),cav:Math.floor(p_cav*aFrac)};
    const dL={inf:Math.floor(d.inf*dFrac),arc:Math.floor(d.arc*dFrac),cav:Math.floor(d.cav*dFrac)};
    let lootG=0, lootW=0;
    if(winner==="attacker"){
      const vlt=vault(d.warehouse_lvl), ratio=powerOf(d)/Math.max(1,powerOf(a));
      const fair = ratio<0.5?0.10 : ratio<0.75?0.50 : 1.0;
      lootG=Math.floor(Math.max(0,d.gold-vlt)*0.20*fair);
      lootW=Math.floor(Math.max(0,d.wood-vlt)*0.20*fair);
    }
    d.inf-=dL.inf; d.arc-=dL.arc; d.cav-=dL.cav; d.gold-=lootG; d.wood-=lootW;
    d.shield_until = Date.now()+8*3600000;
    a.inf-=aL.inf; a.arc-=aL.arc; a.cav-=aL.cav; a.gold+=lootG; a.wood+=lootW;
    a.attack_cooldown_until = Date.now()+10*60000;

    this.db.battles.unshift({
      id:"b"+Date.now(), attacker_id:a.id, defender_id:d.id,
      attacker_name:a.nickname, defender_name:d.nickname, winner,
      loot_gold:lootG, loot_wood:lootW, att_losses:aL, def_losses:dL,
      created_at:new Date().toISOString()
    });
    this.db.battles = this.db.battles.slice(0,30);
    this.save();
    return this.ok({ winner, loot_gold:lootG, loot_wood:lootW,
      att_power:Math.round(att), def_power:Math.round(def),
      att_dom:aDom, def_dom:dDom, att_losses:aL, def_losses:dL });
  },
  get_battles(){ this.load(); return this.ok(this.db.battles); },
};

// Wrapper: decide entre Supabase (real) e Demo (local).
async function callRpc(name, args){
  if(DEMO) return Demo[name](args||{});
  return sb.rpc(name, args);
}

// =========================================================================
// BOOT
// =========================================================================
window.addEventListener("DOMContentLoaded", init);

async function init(){
  el("btn-join").addEventListener("click", join);
  el("nick").addEventListener("keydown", e=>{ if(e.key==="Enter") join(); });

  if(!hasConfig){
    // Sem Supabase → Modo Demo (local, só você, com bots pra atacar).
    DEMO = true;
    el("login-status").innerHTML =
      "🎮 <b>Modo Demo</b> — roda local no navegador, só pra você testar (com bots). " +
      "Pra jogar com amigos de verdade, configure o Supabase (veja o <code>README.md</code>).";
    Demo.load();
    if(Demo.db.me){ ME = Demo.db.me; enterGame(); }   // retoma sessão local direto
    return;
  }
  sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);

  // já logado? (sessão anônima persiste no navegador)
  const { data:{ session } } = await sb.auth.getSession();
  if(session){
    const { data } = await sb.rpc("get_state");
    if(data){ ME = data; enterGame(); return; }
  }
}

async function join(){
  const nick = el("nick").value.trim();
  el("login-error").textContent = "";
  if(nick.length < 2){ el("login-error").textContent = "Nome muito curto."; return; }
  el("btn-join").disabled = true;

  try{
    if(DEMO){
      const { data, error } = await callRpc("join_game", { p_nick: nick });
      if(error) throw error;
      ME = data; enterGame(); return;
    }
    // login anônimo (habilite em Authentication -> Providers -> Anonymous)
    let { data:{ session } } = await sb.auth.getSession();
    if(!session){
      const { error } = await sb.auth.signInAnonymously();
      if(error) throw error;
    }
    const { data, error } = await callRpc("join_game", { p_nick: nick });
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
  renderIsoBase(); renderTroops();
  wireTabs();
  // loop de predição suave (60fps) + re-sync periódico com o servidor
  requestAnimationFrame(tick);
  setInterval(refreshState, 20000);   // corrige drift e mostra ataques recebidos
  setInterval(spawnFloat, 2200);      // efeito de recursos flutuando na vila
  let rz; window.addEventListener("resize", ()=>{ clearTimeout(rz); rz=setTimeout(renderIsoBase, 150); });
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
  if(!sb && !DEMO) return;
  const { data } = await callRpc("get_state");
  if(data){ syncFromServer(data); renderIsoBase(); renderTroops(); }
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
// Projeção isométrica: célula (gx,gy) -> pixel na cena.
function isoPos(gx, gy, sceneW){
  const ox = sceneW/2, oy = 34;
  return { x: ox + (gx - gy) * ISO.TW/2, y: oy + (gx + gy) * ISO.TH/2, z: gx + gy };
}

function renderIsoBase(){
  if(!ME) return;
  const scene = el("iso"); if(!scene) return;
  const W = scene.clientWidth || 380;
  scene.innerHTML = "";
  const r = predicted();
  const frag = document.createDocumentFragment();

  // 1) chão (todas as células do grid)
  for(let gy=0; gy<ISO.grid; gy++) for(let gx=0; gx<ISO.grid; gx++){
    const p = isoPos(gx, gy, W);
    const tile = document.createElement("div");
    tile.className = "iso-tile " + ((gx+gy)%2 ? "a":"b");
    tile.style.width = ISO.TW+"px"; tile.style.height = ISO.TH+"px";
    tile.style.left = (p.x - ISO.TW/2)+"px"; tile.style.top = p.y+"px";
    tile.style.zIndex = p.z;
    frag.appendChild(tile);
  }

  // helper pra criar um objeto na cena
  const obj = (gx, gy, cls, sprite, extra) => {
    const p = isoPos(gx, gy, W);
    const o = document.createElement("div");
    o.className = "iso-obj " + cls;
    o.style.left = p.x+"px"; o.style.top = (p.y + ISO.TH/2)+"px";
    o.style.zIndex = 50 + p.z;
    o.innerHTML = `<div class="shadow"></div><div class="sprite">${sprite}</div>${extra||""}`;
    frag.appendChild(o);
    return o;
  };

  // 2) muralha na borda
  for(let gy=0; gy<ISO.grid; gy++) for(let gx=0; gx<ISO.grid; gx++){
    if(gx===0||gy===0||gx===ISO.grid-1||gy===ISO.grid-1) obj(gx, gy, "wall-block", "🧱");
  }

  // 3) fortaleza central (decorativa)
  obj(ISO.keep.gx, ISO.keep.gy, "keep", ISO.keep.sprite);

  // 4) edifícios (clicáveis)
  BUILDINGS.forEach(b=>{
    const cfg = ISO.build[b.key]; const lvl = ME[b.key+"_lvl"];
    const c = costOf(b, lvl);
    const canPay = r.gold>=c.g && r.wood>=c.w;
    const scale = (1 + Math.min(lvl-1,8)*0.04).toFixed(2);
    const o = obj(cfg.gx, cfg.gy, "build", `<span style="display:inline-block;transform:scale(${scale})">${cfg.sprite}</span>`,
      `<div class="lvl-badge">Lv ${lvl}</div>${canPay?'<div class="up-dot"></div>':''}`);
    o.dataset.key = b.key;
    o.addEventListener("click", ()=>openBuildingModal(b.key));
  });

  scene.appendChild(frag);

  // 5) faixa do exército (rodapé)
  const army = [ ["🗡️",ME.inf], ["🏹",ME.arc], ["🐎",ME.cav] ];
  const strip = document.createElement("div");
  strip.className = "army-strip";
  const has = army.some(a=>a[1]>0);
  strip.innerHTML = has
    ? army.map(a=>`<span class="mini-chip">${a[0]} ${a[1]}</span>`).join("")
    : `<span class="mini-chip empty">Sem tropas — treine no 🛡️ Exército</span>`;
  scene.appendChild(strip);
}

// Painel de melhoria de um edifício (abre ao tocar na vila).
function openBuildingModal(key){
  const b = BUILDINGS.find(x=>x.key===key); const lvl = ME[key+"_lvl"];
  const c = costOf(b, lvl);
  const r = predicted();
  const canPay = r.gold>=c.g && r.wood>=c.w;
  const body = el("modal-body");
  body.innerHTML = `
    <h2>${ISO.build[key].sprite} ${b.name}</h2>
    <p class="sub">Nível ${lvl}</p>
    <div class="result-line"><span>Agora → próximo</span><b style="text-align:right">${b.desc(lvl)}</b></div>
    <div class="result-line"><span>Custo da melhoria</span>
      <b class="${canPay?'':'no'}" style="color:${canPay?'var(--text)':'var(--red)'}">🪙 ${c.g.toLocaleString("pt-BR")} · 🪵 ${c.w.toLocaleString("pt-BR")}</b></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="m-cancel">Fechar</button>
      <button class="btn btn-primary" id="m-up" ${canPay?'':'disabled'}>Melhorar</button>
    </div>`;
  el("modal").classList.add("open");
  el("m-cancel").addEventListener("click", closeModal);
  const up = el("m-up");
  if(up && canPay) up.addEventListener("click", async ()=>{ await upgrade(key); closeModal(); });
}

async function upgrade(key){
  try{
    const { data, error } = await callRpc("upgrade_building", { p_key:key });
    if(error) throw error;
    syncFromServer(data); renderIsoBase(); renderTroops();
    toast("Edifício melhorado!", "ok");
  }catch(err){ toast(friendly(err), "err"); }
}

// Efeito: +ouro/+madeira flutuando de um edifício produtor.
function spawnFloat(){
  const scene = el("iso");
  if(!scene || !el("tab-base").classList.contains("active") || !ME) return;
  const W = scene.clientWidth || 380;
  const pick = Math.random()<0.5
    ? { cell:ISO.build.mine, cls:"g", txt:"+🪙" }
    : { cell:ISO.build.sawmill, cls:"w", txt:"+🪵" };
  const p = isoPos(pick.cell.gx, pick.cell.gy, W);
  const f = document.createElement("div");
  f.className = "float-res " + pick.cls; f.textContent = pick.txt;
  f.style.left = p.x+"px"; f.style.top = (p.y - 10)+"px";
  scene.appendChild(f);
  setTimeout(()=> f.remove(), 1800);
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
    const { data, error } = await callRpc("train_troops", { p_type:type, p_qty:qty });
    if(error) throw error;
    syncFromServer(data); renderTroops(); renderIsoBase();
    toast("Tropas treinadas!", "ok");
  }catch(err){ toast(friendly(err), "err"); }
}

// =========================================================================
// ATACAR
// =========================================================================
async function loadTargets(){
  const wrap = el("targets"); wrap.innerHTML = `<p class="muted">Carregando…</p>`;
  try{
    const { data, error } = await callRpc("list_targets");
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
    const { data, error } = await callRpc("attack",
      { p_target: target.id, p_inf: vals.inf, p_arc: vals.arc, p_cav: vals.cav });
    if(error) throw error;
    await showBattle(vals, data, target);
    await refreshState();
  }catch(err){ toast(friendly(err), "err"); closeModal(); }
}

const sleep = ms => new Promise(r=>setTimeout(r, ms));

// Cena de batalha animada + relatório.
async function showBattle(sent, res, target){
  const won = res.winner === "attacker";
  const defArmy = target.army || 0;
  const defLost = res.def_losses.inf + res.def_losses.arc + res.def_losses.cav;
  const chip = (cls, arr) => arr.filter(a=>a[1]>0).map(a=>`<span class="chip ${cls}">${a[0]} ×${a[1]}</span>`).join("") || `<span class="chip ${cls}">—</span>`;
  const attStart = [["🗡️",sent.inf],["🏹",sent.arc],["🐎",sent.cav]];
  const attEnd   = [["🗡️",sent.inf-res.att_losses.inf],["🏹",sent.arc-res.att_losses.arc],["🐎",sent.cav-res.att_losses.cav]];

  const body = el("modal-body");
  body.innerHTML = `
    <div class="big-verdict ${won?"win":"lose"}" id="verdict" style="opacity:0;transition:opacity .3s;margin:0 0 8px">⚔️</div>
    <div class="arena" id="arena">
      <div class="spark">💥</div>
      <div class="side att" id="ar-att">${chip("att", attStart)}</div>
      <div class="side def" id="ar-def"><span class="chip def">🛡️ ×${defArmy}</span></div>
      <div class="ground"></div>
    </div>
    <div id="report"></div>`;

  const arena = el("arena");
  await sleep(300);
  arena.classList.add("clash", "shake");           // avança + choque
  await sleep(500);
  arena.classList.remove("shake");
  // sobreviventes
  el("ar-att").innerHTML = chip("att", attEnd);
  el("ar-def").innerHTML = `<span class="chip def">🛡️ ×${Math.max(0, defArmy-defLost)}</span>`;
  const verdict = el("verdict");
  verdict.textContent = won ? "VITÓRIA! 🏆" : "DERROTA… 💀";
  verdict.style.opacity = "1";
  await sleep(650);

  // relatório numérico
  const domName = d => ({inf:"🗡️ Infantaria",arc:"🏹 Arqueiros",cav:"🐎 Cavalaria"}[d]||d);
  el("report").innerHTML = `
    <p class="sub" style="text-align:center;margin-top:4px">Contra <b>${escapeHtml(target.nickname)}</b></p>
    <div class="result-line"><span>Seu poder de ataque</span><b>${res.att_power}</b></div>
    <div class="result-line"><span>Defesa do alvo</span><b>${res.def_power}</b></div>
    <div class="result-line"><span>Confronto de tropas</span><b>${domName(res.att_dom)} vs ${domName(res.def_dom)}</b></div>
    <hr style="border-color:var(--line);margin:10px 0">
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
    const { data, error } = await callRpc("get_battles");
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
