/* ========================================================================
   LENDAS DA F1 — MENU / CARREIRA (front-end do jogo).
   Menu inicial, slots, novo jogo, garagem (hub), loja, CLASSIFICAÇÃO
   (você faz a volta e vê o grid), campeonato, árvore de lendas, resultado.
   Lança a corrida/classificação em race.html. Com efeitos sonoros.
   ===================================================================== */
import * as C from './career.js';
import { DRIVERS, overall } from './drivers.js';
import { TEAMS } from './car.js';
import * as SFX from './menu-audio.js';

const app = document.getElementById('app');
let cur = { slot:0, career:null };
const money = n => 'C$ '+Math.round(n).toLocaleString('pt-BR');
const esc = s => (s||'').replace(/</g,'&lt;');
const flagOf = k => C.circuitInfo(k).flag;
const teamHex = k => '#'+(((TEAMS[k]&&TEAMS[k].body)||0x888888)>>>0).toString(16).padStart(6,'0');
const last = n => n.split(' ').slice(-1)[0];
const ovColor = v => v>=88?'#22c55e' : v>=82?'#84cc16' : v>=76?'#eab308' : v>=70?'#f97316' : '#ef4444';

/* ---------- barrinha de atributo ---------- */
function bar(val, max=99, color){
  const p=Math.max(4,Math.min(100,val/max*100));
  return `<div class="pbar"><i style="width:${p}%;background:${color||grad(val,max)}"></i></div>`;
}
function grad(v,max){ const t=v/max; const h=Math.round(t*120); return `hsl(${h},70%,48%)`; }

/* helper de transição + som */
function show(html, sound='nav'){ if(SFX[sound]) SFX[sound](); app.innerHTML=html;
  const s=app.firstElementChild; if(s){ s.classList.remove('anim'); void s.offsetWidth; s.classList.add('anim'); } }

/* ================= TELAS ================= */
function screenMain(){
  const meta=C.loadMeta();
  const anySave=[0,1,2].some(i=>C.loadSlot(i));
  show(`
   <div class="scr center">
     <div class="hero">
       <div class="logo"><span class="fl"></span><span class="ltxt">LENDAS<span class="lg2">DA F1</span></span></div>
       <div class="tagline">Comece por baixo · evolua · conquiste o Mundial</div>
     </div>
     <div class="mbtns">
       <button class="mbtn big" data-a="new">▶ NOVO JOGO</button>
       <button class="mbtn ${anySave?'':'off'}" data-a="continue">↩ CONTINUAR</button>
       <button class="mbtn leg" data-a="legacy">🏆 ÁRVORE DE LENDAS <span class="pill">${meta.legacyPts||0} ⭐</span></button>
       <button class="mbtn ghost" data-a="quick">⚡ Corrida rápida</button>
     </div>
     <div class="foot">v1.1 · carreira</div>
   </div>`, 'confirm');
  bind({ new:()=>screenSlots('new'), continue:()=>anySave&&screenSlots('continue'),
    legacy:screenLegacy, quick:()=>{ SFX.go(); sessionStorage.removeItem('lf1_race'); location.href='race.html'; } });
}

function screenSlots(mode){
  const slots=[0,1,2].map(i=>{ const s=C.loadSlot(i);
    if(!s) return `<button class="slot empty" data-slot="${i}">
        <div class="sn">SLOT ${i+1}</div><div class="se">— vazio —</div>
        ${mode==='new'?'<div class="sa">Criar carreira ▶</div>':'<div class="sa off">indisponível</div>'}</button>`;
    const ov=C.drvOverall(s), co=C.carOverall(s.car);
    return `<button class="slot" data-slot="${i}" data-mode="${mode}" style="--tc:${teamHex(s.team)}">
        <div class="sn">SLOT ${i+1} · ${TEAMS[s.team]?TEAMS[s.team].name:''}</div>
        <div class="sd">${esc(s.driver)}</div>
        <div class="sstats"><span class="chip" style="background:${ovColor(ov)}22;color:${ovColor(ov)}">PIL ${ov}</span>
          <span class="chip" style="background:${ovColor(co)}22;color:${ovColor(co)}">CAR ${co}</span>
          <span class="chip gold">${money(s.money)}</span></div>
        <div class="sr">Temporada · GP ${Math.min(s.round+1,C.SEASON.length)}/${C.SEASON.length}</div>
        ${mode==='new'?'<div class="sa warn">Sobrescrever ▶</div>':'<div class="sa">Continuar ▶</div>'}
      </button>`; }).join('');
  show(`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>${mode==='new'?'Novo Jogo':'Continuar'}</h1></div>
     <div class="slots">${slots}</div></div>`);
  bind({ back:screenMain });
  app.querySelectorAll('.slot').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.slot; const s=C.loadSlot(i);
    if(mode==='new'){ if(s && !confirm('Sobrescrever o Slot '+(i+1)+'?')){ SFX.error(); return; } screenNew(i); }
    else if(s){ SFX.select(); cur={slot:i, career:s}; screenHub(); }
  });
}

function screenNew(slot){
  const opts=C.START_DRIVERS.map(name=>{ const d=DRIVERS.find(x=>x.nome===name); const ov=overall(d);
    return `<button class="drvpick" data-name="${esc(name)}" style="--tc:${teamHex(d.team)}">
       <span class="dpbar"></span>
       <div class="dpbody">
         <div class="dph"><b>${esc(name)}</b><span class="ov" style="background:${ovColor(ov)}">${ov}</span></div>
         <div class="dpt">${TEAMS[d.team]?TEAMS[d.team].name:''}</div>
         <div class="dpr">Ritmo ${d.ritmo} · Corrida ${d.corrida} · Chuva ${d.chuva}</div>
       </div></button>`; }).join('');
  show(`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>Escolha seu piloto</h1></div>
     <p class="sub">Comece com um piloto de base — evolua ele e o carro corrida a corrida até virar uma <b>lenda</b>.</p>
     <div class="drvlist">${opts}</div></div>`);
  bind({ back:()=>screenSlots('new') });
  app.querySelectorAll('.drvpick').forEach(b=>b.onclick=()=>{
    SFX.confirm();
    const career=C.newCareer(b.dataset.name, slot); C.saveSlot(slot,career);
    cur={slot, career}; screenHub();
  });
}

function screenHub(){
  const s=cur.career; const ov=C.drvOverall(s), co=C.carOverall(s.car);
  const done=s.round>=C.SEASON.length;
  const nextK=done?null:C.SEASON[s.round]; const ni=nextK&&C.circuitInfo(nextK);
  const carRows=C.CAR_SYS.map(sy=>`<div class="strow"><span class="sic">${sy.icon}</span><span class="snm">${sy.nome}</span>${bar(s.car[sy.key]*4,100,'linear-gradient(90deg,#f2c400,#ff7a1a)')}<span class="slv">${s.car[sy.key]}</span></div>`).join('');
  let raceBlock;
  if(done) raceBlock=`<button class="mbtn big" data-a="endseason">🏁 FIM DA TEMPORADA</button>`;
  else if(!s.qualiDone) raceBlock=`<button class="mbtn big go" data-a="quali">🏁 CLASSIFICAÇÃO</button>`;
  else raceBlock=`<div class="gridnote">Você larga em <b>${s.startPos}º</b> · <span>volta ${C.fmtT(s.playerQ)}</span></div>
                  <button class="mbtn big red" data-a="race">🚦 CORRER O GP</button>
                  <button class="mbtn ghost sm" data-a="requali">refazer classificação</button>`;
  show(`<div class="scr">
     <div class="hubtop" style="--tc:${teamHex(s.team)}">
       <div><div class="hubname">${esc(s.driver)}</div><div class="hubteam">${TEAMS[s.team]?TEAMS[s.team].name:''}</div></div>
       <div class="ovbadges"><span class="ovb"><i>PILOTO</i><b style="color:${ovColor(ov)}">${ov}</b></span>
         <span class="ovb"><i>CARRO</i><b style="color:${ovColor(co)}">${co}</b></span></div>
     </div>
     <div class="cash big">${money(s.money)}</div>
     <div class="cards">
       <div class="card"><div class="ct">🏎️ CARRO</div>${carRows}</div>
       <div class="card gpcard" style="--tc:${teamHex(s.team)}"><div class="ct">📅 PRÓXIMO GP · ${Math.min(s.round+1,C.SEASON.length)}/${C.SEASON.length}</div>
         ${done?'<div class="champbtn">Temporada encerrada 🏆</div>':
           `<div class="nextgp"><span class="ngflag">${ni.flag}</span><div><b>${ni.nome}</b><span>${ni.laps} voltas · ${ni.km} km</span></div></div>`}
         <button class="mini" data-a="stand">Ver campeonato ›</button>
       </div>
     </div>
     <div class="hubbtns">
       <button class="mbtn" data-a="shop">🔧 MELHORAR PILOTO & CARRO</button>
       ${raceBlock}
       <button class="mbtn ghost" data-a="menu">Menu principal</button>
     </div></div>`);
  bind({ shop:screenShop, quali:screenQuali, race:startRace, requali:screenQuali, stand:screenStandings, menu:screenMain, endseason:endSeason });
}

function screenShop(){
  const s=cur.career;
  const carItems=C.CAR_SYS.map(sy=>{ const lv=s.car[sy.key], cost=C.upgCost(lv), can=s.money>=cost&&lv<25;
    return `<div class="shopitem"><div class="siL"><span class="sic">${sy.icon}</span><div><b>${sy.nome}</b><div class="sidesc">${sy.desc} · nível ${lv}</div></div></div>
      <button class="buy ${can?'':'off'}" data-t="car" data-k="${sy.key}">+1 <span>${money(cost)}</span></button></div>`; }).join('');
  const drvItems=C.DRV_SKILLS.map(sk=>{ const bonus=(s.drvBonus[sk.key]||0), cost=C.upgCost(4+bonus/2), can=s.money>=cost&&bonus<20;
    return `<div class="shopitem"><div class="siL"><span class="sic">🎯</span><div><b>${sk.nome}</b><div class="sidesc">treino +${bonus}</div></div></div>
      <button class="buy ${can?'':'off'}" data-t="drv" data-k="${sk.key}">+1 <span>${money(cost)}</span></button></div>`; }).join('');
  show(`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>Melhorar</h1><div class="cashsm">${money(s.money)}</div></div>
     <div class="shopgrp"><div class="sgt">🏎️ Carro</div>${carItems}</div>
     <div class="shopgrp"><div class="sgt">👤 Piloto</div>${drvItems}</div></div>`);
  bind({ back:screenHub });
  app.querySelectorAll('.buy').forEach(b=>{ if(b.classList.contains('off')){ b.onclick=()=>SFX.error(); return; } b.onclick=()=>{
    const t=b.dataset.t,k=b.dataset.k;
    if(t==='car'){ const cost=C.upgCost(s.car[k]); if(s.money<cost){SFX.error();return;} s.money-=cost; s.car[k]++; }
    else { const bonus=(s.drvBonus[k]||0); const cost=C.upgCost(4+bonus/2); if(s.money<cost){SFX.error();return;} s.money-=cost; s.drvBonus[k]=bonus+1; }
    C.saveSlot(cur.slot,s); SFX.buy(); screenShop();
  }; });
}

/* ======================= CLASSIFICAÇÃO ======================= */
function screenQuali(){
  const s=cur.career; const k=C.SEASON[s.round]; const ni=C.circuitInfo(k);
  const field=C.qualiField(s, k, null);                 // tempos provisórios dos rivais
  const rows=field.map((x,i)=>`<div class="qrow ${x.isP?'me':''}">
      <span class="qp">${i+1}</span><b style="background:${teamHex(x.team)}"></b>
      <span class="qn">${esc(last(x.name))}</span>
      <span class="qt">${x.isP?'— a fazer —':C.fmtT(x.time)}</span></div>`).join('');
  show(`<div class="scr">
     <div class="hd"><button class="back" data-a="back">‹</button><h1>Classificação</h1></div>
     <div class="qphead" style="--tc:${teamHex(s.team)}"><span class="ngflag">${ni.flag}</span><div><b>${ni.nome}</b><span>Volta única · define o grid de largada</span></div></div>
     <p class="sub">Os outros pilotos já marcaram o tempo deles. Vá pra pista, faça a sua <b>volta rápida</b> e veja em que posição você larga.</p>
     <div class="qtbl">${rows}</div>
     <button class="mbtn big go" data-a="run">🏁 FAZER MINHA VOLTA</button></div>`);
  bind({ back:screenHub });
  app.querySelector('[data-a="run"]').onclick=()=>{
    SFX.go();
    const lo=C.loadout(s);
    const cfg={ slot:cur.slot, round:s.round, track:k, laps:3, mode:'quali', weather:null, player:lo };
    sessionStorage.setItem('lf1_race', JSON.stringify(cfg));
    location.href='race.html';
  };
}

/* volta do jogador voltou da pista -> finaliza o grid */
function processQuali(q){
  const s=C.loadSlot(q.slot); if(!s){ screenMain(); return; }
  cur={slot:q.slot, career:s};
  const { list, startPos }=C.finalizeQuali(s, q.time);
  C.saveSlot(q.slot, s);
  const rows=list.map((x,i)=>`<div class="qrow ${x.isP?'me':''}">
      <span class="qp">${i+1}</span><b style="background:${teamHex(x.team)}"></b>
      <span class="qn">${esc(last(x.name))}</span>
      <span class="qt ${x.isP?'p':''}">${C.fmtT(x.time)}</span></div>`).join('');
  const pole=startPos===1;
  show(`<div class="scr">
     <div class="reshd">RESULTADO DA CLASSIFICAÇÃO</div>
     <div class="respos"><span>${startPos}º</span></div>
     <div class="resline">${pole?'🏆 POLE POSITION!':'você larga em '+startPos+'º'} · sua volta <b>${C.fmtT(q.time)}</b></div>
     <div class="qtbl scroll">${rows}</div>
     <div class="mbtns"><button class="mbtn big red" data-a="hub">➜ Ir pro grid de largada</button></div>
   </div>`, pole?'win':'confirm');
  bind({ hub:screenHub });
}

function screenStandings(){
  const s=cur.career; const rows=Object.entries(s.standings).sort((a,b)=>b[1]-a[1]);
  const html=(rows.length?rows:DRIVERS.map(d=>[d.nome,0])).slice(0,20).map(([n,p],i)=>{
    const d=DRIVERS.find(x=>x.nome===n);
    return `<div class="strow2 ${n===s.driver?'me':''}"><span class="p">${i+1}</span><b style="background:${d?teamHex(d.team):'#888'}"></b><span class="nm">${esc(n)}</span><span class="pt">${p}</span></div>`;}).join('');
  show(`<div class="scr"><div class="hd"><button class="back" data-a="back">‹</button><h1>Campeonato</h1></div>
     <div class="standtbl"><div class="strow2 hdr"><span class="p">#</span><b style="background:transparent"></b><span class="nm">Piloto</span><span class="pt">Pts</span></div>${html}</div></div>`);
  bind({ back:screenHub });
}

function screenLegacy(){
  const meta=C.loadMeta();
  const nodes=C.LEGACY.map(n=>{ const lv=(meta.tree[n.id]||0), can=meta.legacyPts>=n.cost&&lv<n.max;
    const pips=Array.from({length:n.max},(_,i)=>`<span class="pip ${i<lv?'on':''}"></span>`).join('');
    return `<div class="legnode"><div class="lnh"><span class="lic">${n.icon}</span><b>${n.nome}</b><span class="pips">${pips}</span></div>
      <div class="ldesc">${n.desc}</div>
      <button class="buy leg ${can?'':'off'}" data-id="${n.id}">${lv>=n.max?'MÁXIMO':`Evoluir · ${n.cost} ⭐`}</button></div>`; }).join('');
  show(`<div class="scr"><div class="hd"><button class="back" data-a="back">‹</button><h1>Árvore de Lendas</h1>
     <div class="cashsm gold">${meta.legacyPts||0} ⭐</div></div>
     <p class="sub">Ganhe pontos de lenda ao fim de cada temporada. Estas melhorias são <b>permanentes</b> — todo save novo começa mais forte.</p>
     <div class="legrid">${nodes}</div></div>`);
  bind({ back:screenMain });
  app.querySelectorAll('.buy').forEach(b=>{ if(b.classList.contains('off')){ b.onclick=()=>SFX.error(); return; } b.onclick=()=>{
    const id=b.dataset.id, n=C.LEGACY.find(x=>x.id===id), m=C.loadMeta();
    const lv=(m.tree[id]||0); if(m.legacyPts<n.cost||lv>=n.max){SFX.error();return;}
    m.legacyPts-=n.cost; m.tree[id]=lv+1; C.saveMeta(m); SFX.buy(); screenLegacy();
  }; });
}

/* ---------- lançar corrida (grid = classificação) ---------- */
function startRace(){
  SFX.go();
  const s=cur.career; const k=C.SEASON[s.round]; const ni=C.circuitInfo(k);
  const cfg={ slot:cur.slot, round:s.round, track:k, laps:ni.laps, mode:'race',
    weather:null, grid:s.grid, startPos:s.startPos, player:C.loadout(s) };
  sessionStorage.setItem('lf1_race', JSON.stringify(cfg));
  location.href='race.html';
}

/* ---------- processar resultado de uma corrida ---------- */
function processResult(res){
  const s=C.loadSlot(res.slot); if(!s){ screenMain(); return; }
  cur={slot:res.slot, career:s};
  res.order.forEach((name,i)=>{ const {pts}=C.reward(i+1); if(pts) s.standings[name]=(s.standings[name]||0)+pts; });
  const pos=res.order.indexOf(s.driver)+1 || 20;
  const rw=C.reward(pos); s.money+=rw.money;
  s.history.push({track:res.track, pos, money:rw.money, pts:rw.pts});
  s.round++; C.resetQuali(s);                            // próxima etapa exige nova classificação
  C.saveSlot(res.slot, s);
  screenResult(res.track, pos, rw);
}

function screenResult(track, pos, rw){
  const s=cur.career; const ni=C.circuitInfo(track);
  const medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
  const done=s.round>=C.SEASON.length;
  show(`<div class="scr center">
     <div class="reshd">${ni.flag} ${ni.nome}</div>
     <div class="respos">${medal?'<span class="med">'+medal+'</span>':''}<span>${pos}º</span></div>
     <div class="resline">+${rw.pts} pts no campeonato</div>
     <div class="resmoney">+${money(rw.money)} 💰</div>
     <div class="mbtns">
       ${done?`<button class="mbtn big" data-a="end">🏁 Fim da temporada</button>`
             :`<button class="mbtn big go" data-a="hub">Continuar ▶</button>`}
       <button class="mbtn ghost" data-a="stand">Ver campeonato</button>
     </div></div>`, pos<=3?'win':'confirm');
  bind({ hub:screenHub, end:endSeason, stand:screenStandings });
}

/* ---------- fim de temporada -> pontos de lenda ---------- */
function endSeason(){
  const s=cur.career;
  const rows=Object.entries(s.standings).sort((a,b)=>b[1]-a[1]);
  const champPos=(rows.findIndex(r=>r[0]===s.driver)+1)||20;
  const champ=rows[0]?rows[0][0]:'—';
  const lp=C.legacyReward(champPos);
  const meta=C.loadMeta(); meta.legacyPts=(meta.legacyPts||0)+lp; C.saveMeta(meta);
  s.round=0; s.standings={}; C.resetQuali(s); C.saveSlot(cur.slot,s);
  const won=champPos===1;
  show(`<div class="scr center">
     <div class="reshd">${won?'🏆 CAMPEÃO DO MUNDO!':'Temporada encerrada'}</div>
     <div class="respos"><span>${champPos}º</span></div>
     <div class="resline">no Mundial · Campeão: <b>${esc(champ)}</b></div>
     <div class="resmoney">+${lp} ⭐ de Lenda (permanente)</div>
     <div class="mbtns">
       <button class="mbtn big go" data-a="hub">Nova temporada ▶</button>
       <button class="mbtn leg" data-a="legacy">Gastar pontos de Lenda</button>
       <button class="mbtn ghost" data-a="menu">Menu principal</button>
     </div></div>`, won?'win':'confirm');
  bind({ hub:screenHub, legacy:screenLegacy, menu:screenMain });
}

/* helper: liga data-a -> função (com som de navegação + hover) */
function bind(map){ app.querySelectorAll('[data-a]').forEach(el=>{ const fn=map[el.dataset.a];
  if(fn){ el.addEventListener('click', ()=>SFX.nav(), {capture:true}); el.onclick=fn; }
  el.addEventListener('pointerenter', ()=>SFX.hover()); }); }

/* ================= BOOT ================= */
(function(){
  const q=sessionStorage.getItem('lf1_quali');
  if(q){ sessionStorage.removeItem('lf1_quali');
    try{ processQuali(JSON.parse(q)); return; }catch(e){} }
  const raw=sessionStorage.getItem('lf1_result');
  if(raw){ sessionStorage.removeItem('lf1_result');
    try{ processResult(JSON.parse(raw)); return; }catch(e){} }
  screenMain();
})();
