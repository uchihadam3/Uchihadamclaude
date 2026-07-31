/* ========================================================================
   LENDAS DA F1 — MENU / CARREIRA (front-end do jogo).
   Telas: menu inicial, slots, novo jogo, garagem (hub), loja de melhorias,
   campeonato, árvore de lendas, resultado. Lança a corrida (race.html).
   ===================================================================== */
import * as C from './career.js';
import { DRIVERS, overall } from './drivers.js';

const app = document.getElementById('app');
let cur = { slot:0, career:null };
const money = n => 'C$ '+n.toLocaleString('pt-BR');
const esc = s => (s||'').replace(/</g,'&lt;');
const flagOf = k => C.circuitInfo(k).flag;

/* ---------- barrinha de atributo ---------- */
function bar(val, max=99, color){
  const p=Math.max(4,Math.min(100,val/max*100));
  return `<div class="pbar"><i style="width:${p}%;background:${color||grad(val,max)}"></i></div>`;
}
function grad(v,max){ const t=v/max; const h=Math.round(t*120); return `hsl(${h},70%,48%)`; }

/* ================= TELAS ================= */
function screenMain(){
  const meta=C.loadMeta();
  const anySave=[0,1,2].some(i=>C.loadSlot(i));
  app.innerHTML=`
   <div class="scr center">
     <div class="logo"><span class="fl"></span>LENDAS DA F1</div>
     <div class="tagline">Comece por baixo · evolua · conquiste o Mundial</div>
     <div class="mbtns">
       <button class="mbtn big" data-a="new">▶ NOVO JOGO</button>
       <button class="mbtn ${anySave?'':'off'}" data-a="continue">↩ CONTINUAR</button>
       <button class="mbtn" data-a="legacy">🏆 ÁRVORE DE LENDAS <span class="pill">${meta.legacyPts||0}</span></button>
       <button class="mbtn ghost" data-a="quick">⚡ Corrida rápida</button>
     </div>
     <div class="foot">v1.0 · carreira</div>
   </div>`;
  bind({ new:()=>screenSlots('new'), continue:()=>anySave&&screenSlots('continue'),
    legacy:screenLegacy, quick:()=>{ sessionStorage.removeItem('lf1_race'); location.href='race.html'; } });
}

function screenSlots(mode){
  const slots=[0,1,2].map(i=>{ const s=C.loadSlot(i);
    if(!s) return `<button class="slot empty" data-slot="${i}">
        <div class="sn">SLOT ${i+1}</div><div class="se">— vazio —</div>
        ${mode==='new'?'<div class="sa">Criar carreira</div>':'<div class="sa off">indisponível</div>'}</button>`;
    const ov=C.drvOverall(s), co=C.carOverall(s.car);
    return `<button class="slot" data-slot="${i}" data-mode="${mode}">
        <div class="sn">SLOT ${i+1}</div>
        <div class="sd">${esc(s.driver)}</div>
        <div class="sstats">Piloto <b>${ov}</b> · Carro <b>${co}</b> · ${money(s.money)}</div>
        <div class="sr">Temporada · GP ${Math.min(s.round+1,C.SEASON.length)}/${C.SEASON.length}</div>
        ${mode==='new'?'<div class="sa warn">Sobrescrever</div>':'<div class="sa">Continuar ▶</div>'}
      </button>`; }).join('');
  app.innerHTML=`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>${mode==='new'?'Novo Jogo':'Continuar'}</h1></div>
     <div class="slots">${slots}</div></div>`;
  bind({ back:screenMain });
  app.querySelectorAll('.slot').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.slot; const s=C.loadSlot(i);
    if(mode==='new'){ if(s && !confirm('Sobrescrever o Slot '+(i+1)+'?')) return; screenNew(i); }
    else if(s){ cur={slot:i, career:s}; screenHub(); }
  });
}

function screenNew(slot){
  const opts=C.START_DRIVERS.map(name=>{ const d=DRIVERS.find(x=>x.nome===name);
    return `<button class="drvpick" data-name="${esc(name)}">
       <div class="dph"><b>${esc(name)}</b><span class="ov">${overall(d)}</span></div>
       <div class="dpr">Ritmo ${d.ritmo} · Corrida ${d.corrida} · Chuva ${d.chuva}</div></button>`; }).join('');
  app.innerHTML=`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>Escolha seu piloto</h1></div>
     <p class="sub">Comece com um piloto de base — evolua ele e o carro corrida a corrida.</p>
     <div class="drvlist">${opts}</div></div>`;
  bind({ back:()=>screenSlots('new') });
  app.querySelectorAll('.drvpick').forEach(b=>b.onclick=()=>{
    const career=C.newCareer(b.dataset.name, slot); C.saveSlot(slot,career);
    cur={slot, career}; screenHub();
  });
}

function screenHub(){
  const s=cur.career; const ov=C.drvOverall(s), co=C.carOverall(s.car);
  const done=s.round>=C.SEASON.length;
  const nextK=done?null:C.SEASON[s.round]; const ni=nextK&&C.circuitInfo(nextK);
  const carRows=C.CAR_SYS.map(sy=>`<div class="strow"><span class="sic">${sy.icon}</span><span class="snm">${sy.nome}</span>${bar(s.car[sy.key]*5,100)}<span class="slv">${s.car[sy.key]}</span></div>`).join('');
  app.innerHTML=`<div class="scr">
     <div class="hubtop">
       <div><div class="hubname">${esc(s.driver)}</div><div class="hubteam">Piloto ${ov} · Carro ${co}</div></div>
       <div class="cash">${money(s.money)}</div>
     </div>
     <div class="cards">
       <div class="card"><div class="ct">🏎️ CARRO</div>${carRows}</div>
       <div class="card"><div class="ct">📅 TEMPORADA</div>
         <div class="seasonrow">GP <b>${Math.min(s.round+1,C.SEASON.length)}</b> de ${C.SEASON.length}</div>
         ${done?'<div class="champbtn">Temporada encerrada</div>':
           `<div class="nextgp">${ni.flag} <b>${ni.nome}</b> · ${ni.laps} voltas · ${ni.km}km</div>`}
         <button class="mini" data-a="stand">Ver campeonato ›</button>
       </div>
     </div>
     <div class="hubbtns">
       <button class="mbtn" data-a="shop">🔧 MELHORAR</button>
       ${done?`<button class="mbtn big" data-a="endseason">🏁 FIM DA TEMPORADA</button>`
             :`<button class="mbtn big go" data-a="race">🚦 CORRER GP</button>`}
       <button class="mbtn ghost" data-a="menu">Menu principal</button>
     </div></div>`;
  bind({ shop:screenShop, race:startRace, stand:screenStandings, menu:screenMain, endseason:endSeason });
}

function screenShop(){
  const s=cur.career;
  const carItems=C.CAR_SYS.map(sy=>{ const lv=s.car[sy.key], cost=C.upgCost(lv), can=s.money>=cost&&lv<25;
    return `<div class="shopitem"><div class="siL"><span class="sic">${sy.icon}</span><div><b>${sy.nome}</b><div class="sidesc">${sy.desc} · nível ${lv}</div></div></div>
      <button class="buy ${can?'':'off'}" data-t="car" data-k="${sy.key}">+1 <span>${money(cost)}</span></button></div>`; }).join('');
  const drvItems=C.DRV_SKILLS.map(sk=>{ const bonus=(s.drvBonus[sk.key]||0), lv=Math.round(bonus/1), cost=C.upgCost(4+bonus/2), can=s.money>=cost&&bonus<20;
    return `<div class="shopitem"><div class="siL"><span class="sic">🎯</span><div><b>${sk.nome}</b><div class="sidesc">+${bonus} treinado</div></div></div>
      <button class="buy ${can?'':'off'}" data-t="drv" data-k="${sk.key}">+1 <span>${money(cost)}</span></button></div>`; }).join('');
  app.innerHTML=`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>Melhorar</h1><div class="cashsm">${money(s.money)}</div></div>
     <div class="shopgrp"><div class="sgt">🏎️ Carro</div>${carItems}</div>
     <div class="shopgrp"><div class="sgt">👤 Piloto</div>${drvItems}</div></div>`;
  bind({ back:screenHub });
  app.querySelectorAll('.buy').forEach(b=>{ if(b.classList.contains('off'))return; b.onclick=()=>{
    const t=b.dataset.t,k=b.dataset.k;
    if(t==='car'){ const cost=C.upgCost(s.car[k]); if(s.money<cost)return; s.money-=cost; s.car[k]++; }
    else { const bonus=(s.drvBonus[k]||0); const cost=C.upgCost(4+bonus/2); if(s.money<cost)return; s.money-=cost; s.drvBonus[k]=bonus+1; }
    C.saveSlot(cur.slot,s); screenShop();
  }; });
}

function screenStandings(){
  const s=cur.career; const rows=Object.entries(s.standings).sort((a,b)=>b[1]-a[1]);
  const html=(rows.length?rows:DRIVERS.map(d=>[d.nome,0])).slice(0,20).map(([n,p],i)=>
    `<div class="strow2 ${n===s.driver?'me':''}"><span class="p">${i+1}</span><span class="nm">${esc(n)}</span><span class="pt">${p}</span></div>`).join('');
  app.innerHTML=`<div class="scr"><div class="hd"><button class="back" data-a="back">‹</button><h1>Campeonato</h1></div>
     <div class="standtbl"><div class="strow2 hdr"><span class="p">#</span><span class="nm">Piloto</span><span class="pt">Pts</span></div>${html}</div></div>`;
  bind({ back:screenHub });
}

function screenLegacy(){
  const meta=C.loadMeta();
  const nodes=C.LEGACY.map(n=>{ const lv=(meta.tree[n.id]||0), can=meta.legacyPts>=n.cost&&lv<n.max;
    return `<div class="legnode"><div class="lnh"><span class="lic">${n.icon}</span><b>${n.nome}</b><span class="lvl">${lv}/${n.max}</span></div>
      <div class="ldesc">${n.desc}</div>
      <button class="buy ${can?'':'off'}" data-id="${n.id}">${lv>=n.max?'MÁX':`Evoluir · ${n.cost}⭐`}</button></div>`; }).join('');
  app.innerHTML=`<div class="scr"><div class="hd"><button class="back" data-a="back">‹</button><h1>Árvore de Lendas</h1>
     <div class="cashsm">${meta.legacyPts||0} ⭐</div></div>
     <p class="sub">Ganhe pontos de lenda ao fim de cada temporada. Estas melhorias são <b>permanentes</b> — todo save novo começa mais forte.</p>
     <div class="legrid">${nodes}</div></div>`;
  bind({ back:screenMain });
  app.querySelectorAll('.buy').forEach(b=>{ if(b.classList.contains('off'))return; b.onclick=()=>{
    const id=b.dataset.id, n=C.LEGACY.find(x=>x.id===id), m=C.loadMeta();
    const lv=(m.tree[id]||0); if(m.legacyPts<n.cost||lv>=n.max)return;
    m.legacyPts-=n.cost; m.tree[id]=lv+1; C.saveMeta(m); screenLegacy();
  }; });
}

/* ---------- lançar corrida ---------- */
function startRace(){
  const s=cur.career; const k=C.SEASON[s.round]; const ni=C.circuitInfo(k);
  const cfg={ slot:cur.slot, round:s.round, track:k, laps:ni.laps,
    weather:null, player:C.loadout(s) };
  sessionStorage.setItem('lf1_race', JSON.stringify(cfg));
  location.href='race.html';
}

/* ---------- processar resultado de uma corrida ---------- */
function processResult(res){
  const s=C.loadSlot(res.slot); if(!s){ screenMain(); return; }
  cur={slot:res.slot, career:s};
  // pontos de campeonato pra todos
  res.order.forEach((name,i)=>{ const {pts}=C.reward(i+1); if(pts) s.standings[name]=(s.standings[name]||0)+pts; });
  const pos=res.order.indexOf(s.driver)+1 || 20;
  const rw=C.reward(pos); s.money+=rw.money;
  s.history.push({track:res.track, pos, money:rw.money, pts:rw.pts});
  s.round++;
  C.saveSlot(res.slot, s);
  screenResult(res.track, pos, rw);
}

function screenResult(track, pos, rw){
  const s=cur.career; const ni=C.circuitInfo(track);
  const medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
  const done=s.round>=C.SEASON.length;
  app.innerHTML=`<div class="scr center">
     <div class="reshd">${ni.flag} ${ni.nome}</div>
     <div class="respos">${medal} <span>${pos}º</span></div>
     <div class="resline">+${rw.pts} pts no campeonato</div>
     <div class="resmoney">+${money(rw.money)} 💰</div>
     <div class="mbtns">
       ${done?`<button class="mbtn big" data-a="end">🏁 Fim da temporada</button>`
             :`<button class="mbtn big go" data-a="hub">Continuar ▶</button>`}
     </div></div>`;
  bind({ hub:screenHub, end:endSeason });
}

/* ---------- fim de temporada -> pontos de lenda ---------- */
function endSeason(){
  const s=cur.career;
  const rows=Object.entries(s.standings).sort((a,b)=>b[1]-a[1]);
  const champPos=(rows.findIndex(r=>r[0]===s.driver)+1)||20;
  const champ=rows[0]?rows[0][0]:'—';
  const lp=C.legacyReward(champPos);
  const meta=C.loadMeta(); meta.legacyPts=(meta.legacyPts||0)+lp; C.saveMeta(meta);
  // nova temporada (mantém upgrades, zera pontos/rodada)
  s.round=0; s.standings={}; C.saveSlot(cur.slot,s);
  const won=champPos===1;
  app.innerHTML=`<div class="scr center">
     <div class="reshd">${won?'🏆 CAMPEÃO DO MUNDO!':'Temporada encerrada'}</div>
     <div class="respos"><span>${champPos}º</span> no Mundial</div>
     <div class="resline">Campeão: <b>${esc(champ)}</b></div>
     <div class="resmoney">+${lp} ⭐ de Lenda (permanente)</div>
     <div class="mbtns">
       <button class="mbtn big go" data-a="hub">Nova temporada ▶</button>
       <button class="mbtn" data-a="legacy">Gastar pontos de Lenda</button>
       <button class="mbtn ghost" data-a="menu">Menu principal</button>
     </div></div>`;
  bind({ hub:screenHub, legacy:screenLegacy, menu:screenMain });
}

/* helper: liga data-a -> função */
function bind(map){ app.querySelectorAll('[data-a]').forEach(el=>{ const fn=map[el.dataset.a];
  if(fn) el.onclick=fn; }); }

/* ================= BOOT ================= */
(function(){
  const raw=sessionStorage.getItem('lf1_result');
  if(raw){ sessionStorage.removeItem('lf1_result');
    try{ processResult(JSON.parse(raw)); return; }catch(e){} }
  screenMain();
})();
