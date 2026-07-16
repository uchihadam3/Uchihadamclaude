/* ========================================================================
   RAINHA DAS ESTRELAS — motor do jogo
   Swipe · recursos · gating narrativo · abas gamificadas · save · finais
   ===================================================================== */
(() => {
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const {RESOURCES, CHARS, RELICS, CHAPTERS, WHISPERS, CARDS, byId} = STORY;
const RKEY = {temple:0, povo:1, frota:2, eter:3, star:4};
const START = {temple:50, povo:50, frota:50, eter:50, star:100};
const STAR_DECAY = 0.75;

let S = null;         // estado do jogo
let cardEl = null;    // carta atual (DOM)
let dragging = false, dragX=0, startX=0, startY=0, decided=false;
let curCard = null, curScene=null;
let ENDED = false;    // trava: nenhuma carta é processada após um final

/* ============ ESTADO / SAVE ============ */
function newState(name){
  return { name:name||'Vésper', res:{...START}, chapter:1, decisions:0, year:1,
    flags:{}, met:['rainha'], relics:['diadema'], chron:{}, played:[], aff:{},
    lineage:1, forced:'intro1', curId:null };
}
function save(){ if(!S) return; try{ localStorage.setItem('rde_save', JSON.stringify(S)); }catch(e){} }
function load(){ try{ const r=localStorage.getItem('rde_save'); return r?JSON.parse(r):null; }catch(e){ return null; } }
function hasSave(){ return !!localStorage.getItem('rde_save'); }
function unlockedEndings(){ try{ return JSON.parse(localStorage.getItem('rde_endings')||'[]'); }catch(e){ return []; } }
function markEnding(id){ const u=unlockedEndings(); if(!u.includes(id)){ u.push(id); localStorage.setItem('rde_endings', JSON.stringify(u)); } }

/* ============ SCREENS ============ */
function show(id){ $$('.screen').forEach(s=>s.classList.remove('on')); $(id).classList.add('on'); }

/* ============ MENU ============ */
function initMenu(){
  ART.crown($('#crownArt'));
  AUDIO.ensure();
  const cont=$('#btnCont'); if(hasSave()){ const sv=load(); cont.disabled=false; $('#contSub').textContent = `${sv.name} · Ano ${sv.year} · ${CHAPTERS[sv.chapter-1].title}`; }
  $('#btnNew').onclick=()=>{ AUDIO.resume(); AUDIO.SFX.ui();
    const nb=$('#nameBox'); if(nb.classList.contains('hidden')){ nb.classList.remove('hidden'); $('#btnNew').querySelector('.sm').textContent='confirme o nome e toque de novo'; $('#nameInput').focus(); }
    else { const nm=($('#nameInput').value||'Vésper').trim().slice(0,14)||'Vésper'; startGame(newState(nm)); } };
  $('#btnCont').onclick=()=>{ const sv=load(); if(sv){ AUDIO.resume(); startGame(sv); } };
  $('#btnChron').onclick=()=>{ AUDIO.SFX.open(); showEndingGallery(); };
  $('#btnHow').onclick=()=>{ AUDIO.SFX.open(); showHowTo(); };
}

/* ============ INICIAR PARTIDA ============ */
function startGame(state){
  S=state; ENDED=false; show('#game');
  buildHud(); buildDock();
  AUDIO.music(moodForChapter());
  nextCard(true);
  save();
  // tutorial automático na primeira vez
  if(!localStorage.getItem('rde_tut')){ localStorage.setItem('rde_tut','1'); setTimeout(showHowTo, 500); }
}

/* ============ HUD ============ */
function buildHud(){
  const row=$('#sigilRow'); row.innerHTML='';
  RESOURCES.forEach(r=>{
    const d=document.createElement('div'); d.className='sigil'; d.dataset.id=r.id;
    d.innerHTML=`<div class="sigDelta"></div>
      <div class="sigDisc" style="--c:${r.c};--glow:${r.glow}"><div class="sigLiquid"></div>${ART.ICON[r.ico]}</div>
      <div class="sigName">${r.name}</div>
      <div class="sigBar" style="--c:${r.c}"><div class="safe"></div><div class="sigMark"></div></div>
      <div class="sigNum">50</div>`;
    row.appendChild(d);
  });
  updateHud();
}
function updateHud(anim){
  RESOURCES.forEach(r=>{
    const el=$(`.sigil[data-id="${r.id}"]`); if(!el) return;
    const v=Math.round(S.res[r.id]); const danger=v<=20||v>=80;
    el.querySelector('.sigLiquid').style.height=v+'%';
    el.querySelector('.sigMark').style.left=v+'%';
    el.querySelector('.sigNum').textContent=v;
    el.classList.toggle('sig-crit', danger);
  });
  // star bar
  const sp=Math.max(0,Math.round(S.res.star)); $('#starFill').style.width=sp+'%'; $('#starPct').textContent=sp;
  $('#yrNum').textContent=S.year; $('#decisionsMeta').textContent=`${S.decisions} decisões · Cap. ${CHAPTERS[S.chapter-1].n}`;
}
function flashDelta(id, delta){
  const el=$(`.sigil[data-id="${id}"]`); if(!el||!delta) return;
  const d=el.querySelector('.sigDelta'); d.textContent=(delta>0?'+':'')+delta;
  d.style.color=delta>0?'var(--good)':'var(--bad)';
  d.classList.remove('show'); void d.offsetWidth; d.classList.add('show');
  const disc=el.querySelector('.sigDisc'); el.classList.remove('sig-bump'); void el.offsetWidth; el.classList.add('sig-bump');
}

/* ============ DOCK (abas gamificadas) ============ */
function buildDock(){
  const dock=$('#tabDock'); dock.innerHTML='';
  const tabs=[ ['court','A Corte','#panelCourt'], ['relics','Relíquias','#panelRelics'],
    ['chron','Crônica','#panelChron'], ['realm','Império','#panelRealm'] ];
  tabs.forEach(([ico,label,panel])=>{
    const b=document.createElement('button'); b.className='tabBtn'; b.dataset.panel=panel; b.dataset.ico=ico;
    b.innerHTML=ART.ICON[ico]+'<div class="badge hidden"></div>';
    b.onclick=()=>openPanel(panel,ico); dock.appendChild(b);
  });
  // mute
  const m=document.createElement('button'); m.className='tabBtn'; m.id='muteBtn';
  m.innerHTML=`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#a99ecb" stroke-width="1.8" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="#a99ecb"/><path class="wv" d="M16 9c1.5 1.5 1.5 4.5 0 6M19 6c3 3 3 9 0 12"/></svg>`;
  m.onclick=()=>{ const mu=AUDIO.toggleMute(); m.querySelectorAll('.wv').forEach(w=>w.style.opacity=mu?0:1); m.style.opacity=mu?.5:1; AUDIO.SFX.ui(); };
  dock.appendChild(m);
  // panel closers
  $$('.pClose,[data-close]').forEach(b=> b.onclick=closePanels);
  // panel head icons
  ART.svgTo($('#icoCourt'),'court'); ART.svgTo($('#icoRelics'),'relics'); ART.svgTo($('#icoChron'),'chron'); ART.svgTo($('#icoRealm'),'realm');
  refreshBadges();
}
let lastSeen={relics:0, chron:0, court:0};
function refreshBadges(){
  const rb=$('.tabBtn[data-ico="relics"] .badge'); if(rb){ const n=S.relics.length-1; /* diadema base */ if(n>0){ rb.classList.remove('hidden'); rb.textContent=S.relics.length; } }
}

function openPanel(sel,ico){ AUDIO.SFX.open();
  if(sel==='#panelCourt') renderCourt();
  if(sel==='#panelRelics') renderRelics();
  if(sel==='#panelChron') renderChron();
  if(sel==='#panelRealm') renderRealm();
  $(sel).classList.add('on');
}
function closePanels(){ AUDIO.SFX.ui(); $$('.panel').forEach(p=>p.classList.remove('on')); $('#charSheet').classList.remove('on'); }

/* ============ CARTAS: seleção ============ */
function eligible(pool){
  return CARDS.filter(c=>{
    if(pool==='story' && !c.story) return false;
    if(pool==='rec' && !c.recurring) return false;
    if(c.once && S.played.includes(c.id)) return false;
    if(c.story){ if(c.ch!==S.chapter) return false; }
    if(c.recurring){ if((c.minCh||1)>S.chapter) return false; }
    if(c.cond && !c.cond(condState())) return false;
    return true;
  });
}
function condState(){ return {ch:S.chapter, decisions:S.decisions, flags:S.flags, res:S.res}; }

function pickCard(){
  // forçada?
  if(S.forced){ const f=byId[S.forced]; S.forced=null; if(f) return f; }
  const story=eligible('story');
  const rec=eligible('rec');
  if(story.length && (Math.random()<0.72 || !rec.length)){
    story.sort((a,b)=>(b.priority||0)-(a.priority||0));
    const top=story.filter(c=>(c.priority||0)===(story[0].priority||0));
    return top[(Math.random()*top.length)|0];
  }
  if(rec.length){
    const total=rec.reduce((a,c)=>a+(c.weight||3),0); let r=Math.random()*total;
    for(const c of rec){ r-=(c.weight||3); if(r<=0) return c; }
    return rec[0];
  }
  return story[0]||rec[0]||null;
}

/* ============ CARTAS: render + swipe ============ */
function nextCard(first){
  if(ENDED) return;
  const c=pickCard();
  if(!c){ // sem cartas — força fim se em cap final, senão gera respiro
    triggerEnding('break'); return; }
  curCard=c; S.curId=c.id;
  const stage=$('#cardStage');
  if(cardEl){ cardEl.remove(); cardEl=null; }
  cardEl=document.createElement('div'); cardEl.className='card';
  const who=CHARS[c.who]||{name:'',role:''};
  cardEl.innerHTML=`
    <div class="cScene"><canvas class="cSceneCv"></canvas><div class="cGrad"></div>
      <div class="previewSigs"></div>
      <div class="swipeTint l"></div><div class="swipeTint r"></div>
      <div class="swipeLbl l"></div><div class="swipeLbl r"></div>
      <div class="cWho"><div class="nm">${who.name||''}</div><div class="rl">${who.role||''}</div></div>
    </div>
    <div class="cBody"><div class="cText">${c.text}</div></div>`;
  stage.appendChild(cardEl);
  // draw scene + portrait overlay
  const scv=cardEl.querySelector('.cSceneCv'); ART.scene(scv, c.scene, hashStr(c.id));
  drawSpeaker(cardEl.querySelector('.cScene'), c.who);
  // labels
  cardEl.querySelector('.swipeLbl.l').textContent=c.L.t;
  cardEl.querySelector('.swipeLbl.r').textContent=c.R.t;
  attachDrag(cardEl, c);
  $('#tapHint').style.display = first?'block':'none';
  // occasional ambient whisper
  if(!first && !c.whisperCard && Math.random()<0.18) ambientWhisper();
  updateHud();
}
function drawSpeaker(sceneDiv, whoId){
  const who=CHARS[whoId]; if(!who) return;
  const c=document.createElement('canvas'); c.width=120; c.height=120;
  c.style.cssText='position:absolute;right:12px;top:12px;width:88px;height:88px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,.25);box-shadow:0 6px 18px rgba(0,0,0,.6);z-index:2;background:#0a0818';
  sceneDiv.appendChild(c); ART.portrait(c, who.spec);
}

function attachDrag(el, c){
  decided=false;
  const w=el.offsetWidth||300; const THRESH=Math.min(110, w*0.30);
  const tintL=el.querySelector('.swipeTint.l'), tintR=el.querySelector('.swipeTint.r');
  const lblL=el.querySelector('.swipeLbl.l'), lblR=el.querySelector('.swipeLbl.r');
  const pv=el.querySelector('.previewSigs');
  function setPreview(dir){
    const ch = dir<0? c.L : c.R;
    pv.innerHTML=''; if(!ch||!ch.e) { pv.style.opacity=0; return; }
    let any=false;
    ch.e.forEach((d,i)=>{ if(!d) return; any=true; const r=RESOURCES[i]||{c:'#ff7a4d',name:'Sol'};
      const s=document.createElement('div'); s.className='pv'; s.style.setProperty('--c', i<4?r.c:'#ff7a4d');
      s.style.color=d>0?'#8fffc0':'#ff9db0'; s.textContent=(d>0?'▲':'▼'); pv.appendChild(s); });
    pv.style.opacity=any?1:0;
  }
  function onMove(x,y){
    dragX=x-startX; const dy=y-startY;
    const rot=dragX*0.05; el.style.transform=`translate(${dragX}px, ${Math.abs(dragX)*0.04}px) rotate(${rot}deg)`;
    const t=Math.min(1,Math.abs(dragX)/THRESH);
    if(dragX<0){ tintL.style.opacity=t; tintR.style.opacity=0; lblL.style.opacity=t; lblL.style.transform=`scale(${0.8+t*0.2})`; lblR.style.opacity=0; setPreview(-1); }
    else if(dragX>0){ tintR.style.opacity=t; tintL.style.opacity=0; lblR.style.opacity=t; lblR.style.transform=`scale(${0.8+t*0.2})`; lblL.style.opacity=0; setPreview(1); }
    else { tintL.style.opacity=tintR.style.opacity=lblL.style.opacity=lblR.style.opacity=0; pv.style.opacity=0; }
    $('#tapHint').style.opacity=0;
  }
  function reset(){ el.style.transition='transform .3s cubic-bezier(.2,.8,.3,1)'; el.style.transform='';
    tintL.style.opacity=tintR.style.opacity=lblL.style.opacity=lblR.style.opacity=pv.style.opacity=0;
    setTimeout(()=>el.style.transition='',300); }
  function end(){
    dragging=false;
    if(decided) return;
    if(Math.abs(dragX)>=THRESH){ decided=true; const dir=dragX<0?-1:1; commit(c, dir, el); }
    else { reset(); dragX=0; }
  }
  el.onpointerdown=(e)=>{ if(decided) return; dragging=true; startX=e.clientX; startY=e.clientY; dragX=0; el.style.transition=''; el.setPointerCapture&&el.setPointerCapture(e.pointerId); };
  el.onpointermove=(e)=>{ if(!dragging) return; onMove(e.clientX,e.clientY); if(Math.abs(dragX)>6 && Math.abs(dragX)%18<2) AUDIO.SFX.tick(); };
  el.onpointerup=end; el.onpointercancel=end;
}

function commit(c, dir, el){
  const ch = dir<0? c.L : c.R;
  curCard=null; // impede dupla-decisão sobre a mesma carta
  AUDIO.SFX.swipe(dir);
  // fly out
  el.style.transition='transform .4s ease-in, opacity .4s'; el.style.opacity=0;
  el.style.transform=`translate(${dir*window.innerWidth}px, 60px) rotate(${dir*22}deg)`;
  setTimeout(()=>{ el.remove(); if(cardEl===el) cardEl=null; }, 400);
  applyChoice(c, ch);
}

/* ============ APLICAR ESCOLHA ============ */
function applyChoice(c, ch){
  if(ENDED) return;
  if(c.once && !S.played.includes(c.id)) S.played.push(c.id);
  S.decisions++; if(S.decisions%5===0) S.year++;
  // efeitos
  const before={...S.res}; const good = ch.e ? ch.e.slice(0,4).reduce((a,b)=>a+b,0)>=0 : true;
  if(ch.e){ ['temple','povo','frota','eter'].forEach((k,i)=> S.res[k]+= (ch.e[i]||0) );
    S.res.star += (ch.e[4]||0); }
  S.res.star -= STAR_DECAY;
  // clamp star
  S.res.star=Math.max(0,Math.min(100,S.res.star));
  // flags / meets / relics / beats
  if(ch.set) ch.set.forEach(f=> S.flags[f]=true);
  if(ch.clr) ch.clr.forEach(f=> delete S.flags[f]);
  if(ch.meet && !S.met.includes(ch.meet)){ S.met.push(ch.meet); popUnlock('char', ch.meet); }
  if(ch.relic && !S.relics.includes(ch.relic)){ S.relics.push(ch.relic); popUnlock('relic', ch.relic); refreshBadges(); pulseTab('relics'); }
  if(ch.beat){ const [cid,txt]=ch.beat; const arr=(S.chron[cid]=S.chron[cid]||[]); if(!arr.includes(txt)){ arr.push(txt); pulseTab('chron'); } }
  if(ch.nextCh){ S.chapter=Math.min(5,S.chapter+1); AUDIO.music(moodForChapter()); toast(`✦ Capítulo ${CHAPTERS[S.chapter-1].n} — ${CHAPTERS[S.chapter-1].title}`, 2600); }
  if(ch.to!==undefined) S.forced=ch.to; // pode ser null (limpa) ou id
  if(ch.toast) toast(ch.toast, 3000);
  // deltas visuais
  AUDIO.SFX.commit(good);
  ['temple','povo','frota','eter','star'].forEach(k=>{ const dv=Math.round(S.res[k]-before[k] + (k==='star'?STAR_DECAY:0)); if(k!=='star' && dv) flashDelta(k, dv); });
  setTimeout(updateHud, 60);
  // whisper
  if(ch.whisper) showWhisper(ch.whisper);
  // checar morte / fim
  const dead = checkDeath();
  if(dead){ setTimeout(()=>triggerEnding(dead), 650); save(); return; }
  if(ch.end){ setTimeout(()=>triggerEnding(ch.end), 650); save(); return; }
  save();
  // próxima carta
  setTimeout(()=>{ if(S.res.star<=0){ triggerEnding('starDeath'); return; } nextCard(false); }, 480);
}

function checkDeath(){
  for(const k of ['temple','povo','frota','eter']){
    if(S.res[k]<=0) return k+'_low';
    if(S.res[k]>=100) return k+'_high';
  }
  if(S.res.star<=0) return 'starDeath';
  return null;
}

/* ============ SUSSURROS ============ */
let whisperTO=null;
function showWhisper(txt){ const w=$('#whisper'); $('#whisperTxt').textContent=txt; w.classList.add('on'); AUDIO.SFX.whisper();
  clearTimeout(whisperTO); whisperTO=setTimeout(()=>w.classList.remove('on'), 5200); }
function ambientWhisper(){
  const pools=[]; pools.push(...WHISPERS.generic);
  if(S.res.temple<30) pools.push(...WHISPERS.templeLow);
  if(S.res.povo<30) pools.push(...WHISPERS.povoLow);
  if(S.res.frota<30) pools.push(...WHISPERS.frotaLow);
  if(S.res.eter<30) pools.push(...WHISPERS.eterLow);
  if(S.res.star<40) pools.push(...WHISPERS.starLow);
  showWhisper(pools[(Math.random()*pools.length)|0]);
}

/* ============ TOAST / POPUP ============ */
let toastTO=null;
function toast(msg, dur){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toastTO); toastTO=setTimeout(()=>t.classList.remove('on'), dur||2200); }
function pulseTab(ico){ const b=$(`.tabBtn[data-ico="${ico}"]`); if(b){ b.classList.add('pulse'); setTimeout(()=>b.classList.remove('pulse'), 3000); } }
function popUnlock(kind, id){
  const pop=$('#unlockPop'), ico=$('#upIco');
  if(kind==='char'){ const ch=CHARS[id]; $('#upK').textContent='NOVO NA CORTE'; $('#upN').textContent=ch.name; ART.portrait(ico, ch.spec); pulseTab('court'); }
  else { const r=RELICS[id]; $('#upK').textContent='RELÍQUIA OBTIDA'; $('#upN').textContent=r.name; ART.relic(ico, r.kind); AUDIO.SFX.unlock(); }
  pop.classList.add('on'); if(kind==='char') AUDIO.SFX.unlock();
  setTimeout(()=>pop.classList.remove('on'), 1900);
}

/* ============ MOOD / ÁUDIO ============ */
function moodForChapter(){ return ['calm','court','tense','dread','hope'][Math.min(4,S.chapter-1)] || 'court'; }

/* ============ ABAS: A CORTE ============ */
function charAff(id){
  const f=S.flags; let a=50;
  const rules={
    sethis: (f.silenciouSethis?-25:0)+(f.contraRito?-25:0)+(f.aberto_rito?25:0)+(f.milagreFalso?15:0)+(S.res.temple-50)*0.4,
    rhea: (f.arcaIniciada?25:0)+(f.recusouArca?-25:0)+(f.vashkaContraRhea?-15:0)+(S.res.frota-50)*0.4,
    io: (f.ioLivre?25:0)+(f.apoiaIo?25:0)+(f.ioPresa?-20:0)+(f.negaIo?-15:0),
    vashka: (f.pactoVashka?25:0)+(f.recusouVashka?-25:0)+(f.vashkaOfendida?-20:0)+(f.acusouVashka?-30:0)+(f.ladoCasas?20:0)+(S.res.eter-50)*0.3,
    mira: (f.ajudouConfins?30:0)+(f.abandonouConfins?-30:0)+(f.ladoPovo?20:0)+(S.res.povo-50)*0.4,
    ciro: (f.ciroAliado?20:0)+(f.amaCiro?30:0)+(f.ciroSabe?15:0)+(f.afastaCiro?-25:0)+(f.confiaCiro?15:0),
    liora: (f.confiaLiora?25:0)+(f.desafiouLiora?-15:0)+(f.desconfiaLiora?-15:0)+(f.prometeuLibertar?20:0),
    caeus: (f.ouviuCaeus?25:0)+(f.prendeuCaeus?-30:0)+(f.sabeDevorador?15:0),
  };
  a += (rules[id]||0); return Math.max(4, Math.min(100, Math.round(a)));
}
function renderCourt(){
  const g=$('#courtGrid'); g.innerHTML='';
  const order=['liora','sethis','rhea','io','vashka','mira','ciro','caeus'];
  order.forEach(id=>{
    const ch=CHARS[id]; const met=S.met.includes(id);
    const m=document.createElement('div'); m.className='medallion'+(met?'':' locked');
    const aff=met?charAff(id):0; const deg=aff/100*360;
    const affCol = aff>66?'#6fe6a6':aff>33?'#f4c66a':'#ff5f7a';
    m.innerHTML=`<div class="medFrame" style="--aff:${affCol};--affdeg:${deg}deg">
      <div class="medInner"><canvas width="120" height="120"></canvas></div>
      ${met?`<div class="affIco">${aff>66?'♥':aff>33?'◆':'⚔'}</div>`:''}</div>
      <div class="medName">${met?ch.name.split(',')[0]:'???'}</div>
      <div class="medRole">${met?ch.role:'não revelado'}</div>`;
    g.appendChild(m);
    if(met){ ART.portrait(m.querySelector('canvas'), ch.spec); m.onclick=()=>openChar(id); }
  });
}
function openChar(id){
  const ch=CHARS[id]; const aff=charAff(id);
  const threads=charThreads(id);
  const html=`<div class="csTop"><div class="csPort"><canvas width="140" height="140"></canvas></div>
    <div><div class="csName">${ch.name}</div><div class="csRole">${ch.role}</div>
      <div class="csAff"><i style="width:${aff}%"></i></div>
      <div class="csAffLbl"><span>${aff>66?'Aliado':aff>40?'Neutro':aff>20?'Desconfiado':'Inimigo'}</span><span>${aff}%</span></div>
    </div></div>
    <div class="csBio">${ch.bio}</div>
    <div class="csThreads">${threads.map(t=>`<div class="csThread"><div class="dot"></div><p>${t}</p></div>`).join('')}</div>`;
  $('#csCard').innerHTML=html; ART.portrait($('#csCard').querySelector('canvas'), ch.spec);
  $('#charSheet').classList.add('on'); $('#charSheet').onclick=(e)=>{ if(e.target.id==='charSheet') closePanels(); };
  AUDIO.SFX.open();
}
function charThreads(id){
  const f=S.flags, out=[];
  const T={
    liora:[[f.confiaLiora,'Você prometeu à Décima nunca se ajoelhar ao Rito.'],[f.desafiouLiora,'Você a desafiou desde a primeira noite.'],[f.desconfiaLiora,'Você suspeita que ela usa você como usou as outras.'],[f.prometeuLibertar,'Você jurou libertar as dez imperatrizes da coroa.']],
    sethis:[[f.contraRito,'Você declarou-se abertamente contra o Rito do Ocaso.'],[f.aberto_rito,'Ele acredita que você pode se entregar ao Sol.'],[f.silenciouSethis,'Você tentou silenciá-lo — ele não perdoa.'],[f.milagreFalso,'Ele proclama o estilhaço de Îo como milagre do Sol.']],
    rhea:[[f.arcaIniciada,'A frota-arca está sendo construída sob seu comando.'],[f.recusouArca,'Você recusou o Êxodo. Ela guarda a mágoa.'],[f.arcaRapida,'Você mandou acelerar a arca a qualquer custo.']],
    io:[[f.ioLivre,'Você a libertou das correntes do Culto.'],[f.apoiaIo,'Você financia sua heresia — e arde com ela se falhar.'],[f.ioPresa,'Você a manteve acorrentada.'],[f.negaIo,'Você recuou do caminho da ciência.']],
    vashka:[[f.pactoVashka,'Você pactuou com as Casas dela.'],[f.recusouVashka,'Você recusou seu suborno. Ela sorriu.'],[f.acusouVashka,'Você a acusou de envenenamento diante da corte.'],[f.vashkaCasou,'Um noivado une sua linhagem à Casa Corvin.']],
    mira:[[f.ajudouConfins,'Você desviou Éter e calor aos mundos famintos.'],[f.abandonouConfins,'Você deixou os confins ao frio.'],[f.ladoPovo,'Você ficou do lado do povo contra as Casas.']],
    ciro:[[f.ciroAliado,'Você o tomou como aliado antes de amante.'],[f.amaCiro,'Algo real cresce entre vocês — talvez amor.'],[f.ciroSabe,'Ele conhece o segredo da Voz na coroa.'],[f.afastaCiro,'Você o mantém do lado de fora dos seus segredos.']],
    caeus:[[f.ouviuCaeus,'Você ouviu sua verdade sobre o Devorador.'],[f.prendeuCaeus,'Você o prendeu antes de ouvir tudo.'],[f.sabeDevorador,'Ele revelou o que devora as estrelas.']],
  };
  (T[id]||[]).forEach(([on,txt])=>{ if(on) out.push(txt); });
  if(!out.length) out.push(CHARS[id].role+' — sua história com esta pessoa ainda está sendo escrita.');
  return out;
}

/* ============ ABAS: RELÍQUIAS ============ */
function renderRelics(){
  const g=$('#relicGrid'); g.innerHTML=''; lastSeen.relics=S.relics.length;
  const rb=$('.tabBtn[data-ico="relics"] .badge'); if(rb) rb.classList.add('hidden');
  Object.keys(RELICS).forEach(id=>{
    const r=RELICS[id]; const owned=S.relics.includes(id);
    const d=document.createElement('div'); d.className='relic'+(owned?'':' locked');
    d.innerHTML=`<div class="rArt"><canvas width="200" height="240"></canvas><div class="rShine"></div></div>
      <div class="rName">${owned?r.name:'? ? ?'}</div>`;
    g.appendChild(d);
    if(owned){ ART.relic(d.querySelector('canvas'), r.kind); d.onclick=()=>{ AUDIO.SFX.open();
      $('#csCard').innerHTML=`<div class="csTop"><div class="csPort"><canvas width="140" height="140"></canvas></div>
        <div><div class="csName" style="font-size:20px">${r.name}</div><div class="csRole">Relíquia</div></div></div>
        <div class="csBio">${r.desc}</div>`;
      ART.relic($('#csCard').querySelector('canvas'), r.kind); $('#charSheet').classList.add('on');
      $('#charSheet').onclick=(e)=>{ if(e.target.id==='charSheet') closePanels(); }; }; }
  });
}

/* ============ ABAS: CRÔNICA ============ */
function renderChron(){
  const w=$('#chapWrap'); w.innerHTML='';
  CHAPTERS.forEach((cp,i)=>{
    const st = (i+1<S.chapter)?'done':(i+1===S.chapter)?'active':'pending';
    const beats=S.chron[cp.id]||[];
    const d=document.createElement('div'); d.className='chap '+st;
    d.innerHTML=`<div class="chapSeal">${cp.n}</div>
      <div class="chapTitle">${cp.title}</div>
      <div class="chapDesc">${cp.desc}</div>
      ${beats.length?`<div class="chapBeats">${beats.map(b=>`<div class="beat"><span class="bd">✦</span><span>${b}</span></div>`).join('')}</div>`:''}`;
    w.appendChild(d);
  });
}

/* ============ ABAS: O IMPÉRIO (mapa) ============ */
function renderRealm(){
  const cv=$('#realmCanvas'); drawRealm(cv);
  const worlds=[
    ['Solária, a Cidade-Coroa', 'A capital, ao redor do trono.', S.res.povo, S.res.povo<35?'em tumulto':S.res.povo>70?'próspera':'inquieta'],
    ['O Grande Templo', 'Coração do Culto do Sol.', S.res.temple, S.res.temple<35?'em revolta':S.res.temple>70?'zelosa':'vigilante'],
    ['Estaleiros da Frota', 'Onde nascem os mundos-navio.', S.res.frota, S.res.frota<35?'em motim':S.res.frota>70?'formidável':'de prontidão'],
    ['Confins Escuros', 'Os mundos que o Sol já não alcança.', S.res.star, S.res.star<35?'congelando':S.res.star>70?'iluminados':'esmaecendo'],
  ];
  const L=$('#realmLegend'); L.innerHTML='';
  worlds.forEach(([n,s,v,st])=>{ const col=v<35?'#ff5f7a':v>70?'#6fe6a6':'#f4c66a';
    const d=document.createElement('div'); d.className='worldCard';
    d.innerHTML=`<div class="wn">${n}</div><div class="ws">${s}</div><div class="wstate" style="color:${col}">● ${st}</div>`;
    L.appendChild(d); });
}
function drawRealm(cv){
  const {width:W,height:H}=cv; const c=cv.getContext('2d'); c.clearRect(0,0,W,H);
  c.fillStyle='#050410'; c.fillRect(0,0,W,H);
  // stars
  const rn=ART.rng(99); for(let i=0;i<80;i++){ c.globalAlpha=rn()*.6+.1; c.fillStyle='#fff'; c.beginPath(); c.arc(rn()*W,rn()*H,rn()*1.4,0,Math.PI*2); c.fill(); }
  c.globalAlpha=1;
  const cx=W/2, cy=H/2;
  // dying sun center
  const sp=S.res.star/100; const sr=26+sp*24;
  let g=c.createRadialGradient(cx,cy,4,cx,cy,sr*2.6); g.addColorStop(0,'#fff2c8'); g.addColorStop(.3,`rgba(255,${(120+sp*80)|0},60,${.6+sp*.4})`); g.addColorStop(1,'rgba(120,20,20,0)');
  c.fillStyle=g; c.beginPath(); c.arc(cx,cy,sr*2.6,0,Math.PI*2); c.fill();
  c.fillStyle=`rgb(${(200+sp*55)|0},${(90+sp*90)|0},${(40+sp*40)|0})`; c.beginPath(); c.arc(cx,cy,sr,0,Math.PI*2); c.fill();
  // orbits + worlds
  const worlds=[['povo','#68e0c8',0],['temple','#ffcf6b',1.6],['frota','#7aa8ff',3.1],['star','#c98bff',4.7]];
  worlds.forEach(([k,col,a],i)=>{
    const rad=70+i*44; c.strokeStyle='rgba(200,180,255,.12)'; c.lineWidth=1; c.beginPath(); c.arc(cx,cy,rad,0,Math.PI*2); c.stroke();
    const wx=cx+Math.cos(a)*rad, wy=cy+Math.sin(a)*rad; const v=S.res[k];
    const wc = v<35?'#ff5f7a':v>70?col:'#c8912f';
    let wg=c.createRadialGradient(wx,wy,1,wx,wy,16); wg.addColorStop(0,wc); wg.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=wg; c.beginPath(); c.arc(wx,wy,16,0,Math.PI*2); c.fill();
    c.fillStyle=wc; c.beginPath(); c.arc(wx,wy,7+ (i===3?0:2),0,Math.PI*2); c.fill();
    if(i===3){ c.fillStyle='#3a2a4a'; c.beginPath(); c.arc(wx-2,wy-2,3,0,Math.PI*2); c.fill(); } // frozen frontier
  });
}

/* ============ FINAIS ============ */
function endingData(id){
  const f=S.flags, name=S.name;
  const E={
    sacrifice:{art:'sacrifice', good:true, eyebrow:'O RITO DO OCASO', title:'A Rainha que Virou Luz',
      text:`${name} entrou no Coração agonizante e, com o próprio ser, despertou o Devorador. O monstro ergueu-se faminto e partiu para outra estrela — e o Sol, aliviado, ardeu de novo por gerações. A imperatriz não morreu: sua voz juntou-se às dez, dentro do ouro, sussurrando à próxima menina que carregar a coroa. O ciclo continua. O Sol vive. Alguém sempre paga.`},
    exodus:{art:'exodus', good:true, eyebrow:'O ÊXODO', title:'A Rainha que Partiu',
      text:`A frota-arca de Rhea rasgou o Escuro, a Semente-Gênese em seu ventre. ${name} olhou uma última vez para o Sol moribundo e para os bilhões que não couberam, e deu a ordem. Sob uma estrela nova e jovem, um punhado de sobreviventes plantou um mundo. Chamaram-no de Segunda Aurora. Ninguém lá fala do que ficou para trás — mas todos, à noite, olham para a escuridão de onde vieram.`},
    reignite:{art:'reignite'},
    break:{art:'break', good:true, eyebrow:'O CICLO QUEBRADO', title:'A Rainha que Libertou as Mortas',
      text:`${name} ergueu a coroa e a partiu sobre a Lâmina do Ocaso. As dez imperatrizes — Liora entre elas — enfim exalaram, livres, e o ouro esfriou para sempre. Sem Voz, sem Rito, sem rainha eterna, o Império encarou o Devorador e o Escuro como gente livre, mortal, unida. Talvez morram. Mas morrerão sendo donos de si — e essa, disse Liora ao apagar-se, é a única coroa que vale a pena usar.`},
    starDeath:{art:'dark', good:false, eyebrow:'A GRANDE ESCURIDÃO', title:'A Rainha do Último Ocaso',
      text:`Você hesitou tempo demais. O Devorador bebeu a última gota do Coração, e o Sol se apagou como uma vela ao vento. Um por um, os mundos escureceram. ${name} reinou até o fim sobre um trono de gelo e estrelas mortas, ouvindo Liora sussurrar, cada vez mais fraca, até que também o ouro silenciou. No Escuro, ninguém acende velas para quem deixou o Sol morrer.`},
    // mortes de facção
    temple_low:{art:'dark', title:'Queimada como Herege', eyebrow:'A IRA DO TEMPLO',
      text:`Os Videntes proclamaram que você abandonara o Sol, e a fé virou fúria. Uma multidão de fiéis tomou o palácio ao grito do nome de Sethis. ${name} foi levada ao pátio do Grande Templo e entregue à fogueira "para reacender a estrela". As chamas subiram. O Sol, indiferente, continuou a morrer.`},
    temple_high:{art:'dark', title:'A Marionete do Culto', eyebrow:'A TEOCRACIA',
      text:`O Culto do Sol tornou-se poderoso demais. Sethis passou a falar pela coroa, e ${name} tornou-se apenas o rosto bonito de um trono governado por profetas. Quando você finalmente discordou, um "acidente sagrado" a levou. O Rito seria feito — mas com uma rainha mais obediente.`},
    povo_low:{art:'dark', title:'Devorada pela Fome', eyebrow:'A REVOLTA DO POVO',
      text:`A fome venceu o medo. Os famintos dos confins e das cidades marcharam sobre Solária com Mira à frente, e nenhuma guarda morre de fome mais devagar que quem já não tem o que comer. O trono caiu. ${name} descobriu tarde demais que um povo faminto não teme coroa alguma.`},
    povo_high:{art:'dark', title:'Amada até a Ruína', eyebrow:'O AMOR DO POVO',
      text:`O povo amou você tanto que deixou de temê-la — e um trono sem temor é um trono sem rédeas. Facções em seu nome brigaram nas ruas, cada uma certa de defender sua rainha. No caos, ${name} tornou-se símbolo, não soberana, e símbolos são fáceis de erguer sobre os ombros... e de deixar cair.`},
    frota_low:{art:'dark', title:'Deixada Indefesa', eyebrow:'O COLAPSO DA FROTA',
      text:`Sem soldo e sem honra, a Frota se desfez. Os confins caíram, os piratas do Escuro chegaram ao centro, e ninguém restou para defender o trono. ${name} enfrentou o fim sem uma única nave no céu — apenas o silêncio de mundos que ela não pôde proteger.`},
    frota_high:{art:'dark', title:'Deposta pelos Almirantes', eyebrow:'O GOLPE DA FROTA',
      text:`A Frota tornou-se forte demais e sonhou com um trono próprio. Rhea — ou alguém em seu lugar — decidiu que uma soldada guiaria o Êxodo melhor que uma rainha. O golpe foi rápido e quase gentil. ${name} viu a arca partir sem ela, pela janela de uma torre trancada.`},
    eter_low:{art:'dark', title:'Apagada no Frio', eyebrow:'A FALÊNCIA',
      text:`Os cofres de Éter secaram. As cidades escureceram, os aquecedores morreram, e o Império congelou de dentro para fora antes mesmo que o Sol terminasse de morrer. ${name} reinou seus últimos dias à luz de velas, num palácio de gelo, assinando decretos que ninguém tinha energia para cumprir.`},
    eter_high:{art:'dark', title:'Afogada em Ouro', eyebrow:'A GANÂNCIA DAS CASAS',
      text:`Éter demais nos cofres despertou uma cobiça sem fundo. As Casas, lideradas por Vashka, decidiram que tanta riqueza merecia mãos mais... práticas que as suas. O veneno, desta vez, não errou a taça. ${name} morreu rica — a mais rica defunta que o Império já teve.`},
  };
  if(id==='reignite'){
    if(S.res.star>=45){ return {art:'reignite', good:true, eyebrow:'A CIÊNCIA TRIUNFANTE', title:'A Rainha que Salvou o Sol',
      text:`O veneno de Îo atingiu o Devorador em cheio. A criança da razão acertou onde dez gerações de fé só adiaram: o monstro morreu de verdade, e o Coração, liberto, reacendeu-se pleno e jovem. Não houve sacrifício, não houve êxodo, não houve coroa eterna — houve engenho, coragem e uma rainha que apostou na dúvida contra o dogma. ${S.name} viveu para ver o amanhecer real de mil mundos. Liora, na coroa, riu pela primeira vez em séculos.`};
    } else { return {art:'dark', good:false, eyebrow:'O CÁLCULO FATAL', title:'A Rainha que Apagou o Sol',
      text:`A estrela estava fraca demais, e o cálculo de Îo, por um fio, errado. O veneno destinado ao Devorador consumiu também o pouco que restava do Coração. Num instante — silencioso, quase belo — o Sol se apagou. ${S.name} e Îo se olharam no escuro súbito, sabendo que a razão, como a fé, também pode matar. Aprender tarde demais é a mais antiga tragédia.`}; }
  }
  return E[id]||E.starDeath;
}
function triggerEnding(id){
  if(ENDED) return; ENDED=true;
  const isDeath = /_low|_high|starDeath/.test(id);
  const d=endingData(id); markEnding(id);
  show('#ending'); ART.endArt($('#endArt'), d.art);
  $('#endEyebrow').textContent=d.eyebrow||'FIM DE UM REINADO';
  $('#endTitle').textContent=d.title; $('#endText').textContent=d.text;
  $('#endStats').innerHTML=`<div class="endStat"><b>${S.year}</b><span>anos de ocaso</span></div>
    <div class="endStat"><b>${S.decisions}</b><span>decisões</span></div>
    <div class="endStat"><b>${Math.round(S.res.star)}%</b><span>luz do Coração</span></div>
    <div class="endStat"><b>${S.lineage}</b><span>${S.lineage>1?'imperatrizes':'imperatriz'}</span></div>`;
  if(d.good){ AUDIO.SFX.crown(); if(d.art==='reignite'||d.art==='sacrifice') AUDIO.SFX.sun(); }
  else AUDIO.SFX.death();
  // sucessão só para mortes de facção (não para os grandes finais nem morte da estrela)
  const canHeir = /_low|_high/.test(id);
  $('#btnHeir').style.display = canHeir? '' : 'none';
  if(canHeir){ $('#succession').textContent = `A coroa não tolera vazios. Um herdeiro aguarda — reinará com os mesmos segredos, os mesmos aliados, e a mesma noite se aproximando.`;
    $('#heirSub').textContent=`${S.lineage+1}ª da linhagem · o Império continua`; }
  else { $('#succession').textContent = d.good? 'O seu reinado entrou para as Crônicas do Longo Ocaso.' : 'O Sol se apagou. Não há herdeiro para uma noite sem fim.'; }
  localStorage.removeItem('rde_save');
}
function heirContinue(){
  // mantém história/flags/relíquias, reseta os 4 poderes; a estrela persiste
  ENDED=false; S.lineage++; S.res.temple=S.res.povo=S.res.frota=S.res.eter=50;
  S.name = heirName(S.name); S.forced=null;
  show('#game'); buildHud(); AUDIO.music(moodForChapter());
  toast(`✦ ${S.name} assume o trono — a ${S.lineage}ª da linhagem`, 3200);
  showWhisper('De novo o ouro pousa numa cabeça nova. Bem-vinda, criança. Eu me lembro de todas vocês.');
  nextCard(true); save();
}
function heirName(prev){
  const names=['Aurea','Lúmea','Estela','Cíntia','Vespera','Sélene','Astra','Nívea','Corina','Líria'];
  let n=names[(Math.random()*names.length)|0]; if(n===prev) n=names[(Math.random()*names.length)|0]; return n;
}

/* ============ GALERIAS DE MENU (sheet reutilizável) ============ */
function showEndingGallery(){
  const all=[['sacrifice','O Rito do Ocaso','sacrifice'],['reignite','A Ciência Triunfante','reignite'],
    ['exodus','O Êxodo','exodus'],['break','O Ciclo Quebrado','break'],['starDeath','A Grande Escuridão','dark'],
    ['temple_low','Queimada como Herege','dark'],['povo_low','Devorada pela Fome','dark'],
    ['frota_high','Deposta pelos Almirantes','dark'],['eter_high','Afogada em Ouro','dark']];
  const u=unlockedEndings();
  const items=all.map(([id,name,art])=>{ const got=u.includes(id);
    return `<div class="csThread"><div class="dot" style="background:${got?'var(--gold)':'#3a3352'};box-shadow:${got?'0 0 8px var(--gold)':'none'}"></div>
      <p>${got?'<b style="color:var(--gold)">'+name+'</b> — revelado':'<i style="color:var(--ink-faint)">final selado</i>'}</p></div>`;}).join('');
  $('#csCard').innerHTML=`<div class="csName" style="margin-bottom:4px">Crônicas do Longo Ocaso</div>
    <div class="csRole" style="margin-bottom:14px">${u.length} de ${all.length} finais revelados</div>
    <div class="csThreads">${items}</div>`;
  $('#charSheet').classList.add('on'); $('#charSheet').onclick=(e)=>{ if(e.target.id==='charSheet') $('#charSheet').classList.remove('on'); };
}
function showHowTo(){
  // mini-demo visual do medidor
  const meter=`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin:2px 0 10px">
    <div class="sigBar" style="--c:#68e0c8;width:100%;max-width:220px;height:13px">
      <div class="safe"></div><div class="sigMark" style="left:50%;width:6px;height:19px"></div></div>
    <div style="display:flex;justify-content:space-between;width:100%;max-width:220px;font-size:10px;font-weight:700;letter-spacing:.5px">
      <span style="color:var(--bad)">◄ VAZIO = FIM</span><span style="color:var(--good)">SEGURO</span><span style="color:var(--bad)">CHEIO = FIM ►</span></div></div>`;
  $('#csCard').innerHTML=`<div class="csName" style="margin-bottom:6px">A Arte de Reinar</div>
    <div class="csBio" style="margin-bottom:12px">Você governa o Império pela <b>decisão</b>. Cada carta traz alguém da corte e um dilema — só há dois lados.</div>
    <div class="csThreads">
      <div class="csThread"><div class="dot"></div><p><b>Arraste a carta</b> para a <b>esquerda ◄</b> ou <b>► direita</b> para escolher. Antes de soltar, o topo da carta mostra <b>quais poderes</b> vão subir (▲) ou descer (▼).</p></div>
      <div class="csThread"><div class="dot"></div><p><b>O medidor de cada poder</b> é uma barra com um marcador branco:</p></div>
    </div>
    ${meter}
    <div class="csThreads">
      <div class="csThread"><div class="dot" style="background:var(--good);box-shadow:0 0 8px var(--good)"></div><p><b style="color:var(--good)">Verde no meio = seguro.</b> Mantenha os quatro marcadores por aqui.</p></div>
      <div class="csThread"><div class="dot" style="background:var(--bad);box-shadow:0 0 8px var(--bad)"></div><p><b style="color:var(--bad)">Vermelho nas pontas = perigo.</b> Se um marcador chegar ao vermelho — <b>vazio OU cheio demais</b> — seu reinado termina. O número embaixo (0 a 100) mostra o valor exato; ele fica vermelho e pulsa quando está perigoso.</p></div>
      <div class="csThread"><div class="dot" style="background:var(--star);box-shadow:0 0 8px var(--star)"></div><p>A barra <b style="color:var(--star)">Luz do Coração</b> mingua sozinha a cada ano — é o relógio da estrela morrendo, o coração da história. Não deixe chegar a 0%.</p></div>
      <div class="csThread"><div class="dot"></div><p>Abas embaixo: <b>a Corte</b>, <b>Relíquias</b>, a <b>Crônica</b> e o <b>Império</b>. A <b style="color:var(--eter)">Voz na coroa</b> dá conselhos — nem sempre honestos.</p></div>
    </div>
    <button class="mBtn prime" id="tutOk" style="margin-top:16px;width:100%">ENTENDI — COMEÇAR A REINAR</button>`;
  $('#charSheet').classList.add('on'); $('#charSheet').onclick=(e)=>{ if(e.target.id==='charSheet') $('#charSheet').classList.remove('on'); };
  const ok=$('#tutOk'); if(ok) ok.onclick=()=>{ AUDIO.SFX.ui(); $('#charSheet').classList.remove('on'); };
}

/* ============ UTIL ============ */
function hashStr(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }

/* ============ HOOK DE DEV/TESTE ============ */
window.RDE = {
  get S(){ return S; }, get card(){ return curCard; },
  start(name){ startGame(newState(name||'Teste')); },
  choose(dir){ if(!curCard||!cardEl) return null; const id=curCard.id; commit(curCard, dir<0?-1:1, cardEl); return id; },
  set(res,val){ if(S) S.res[res]=val; },
  forceChapter(n){ if(S){ S.chapter=n; } },
};

/* ============ BOOT ============ */
window.addEventListener('load', ()=>{
  ART.stars($('#stars'));
  initMenu();
  $('#btnHeir').onclick=heirContinue;
  $('#btnMenu').onclick=()=>{ AUDIO.stopMusic(); show('#menu'); initMenu(); };
  // resume audio on first interaction
  const kick=()=>{ AUDIO.resume(); document.removeEventListener('pointerdown',kick); };
  document.addEventListener('pointerdown', kick);
});
})();
