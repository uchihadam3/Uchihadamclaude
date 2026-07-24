/* ========================================================================
   PUNHO DE LENDA — fluxo do jogo: run, draft, pontos, torneio, luta, save
   ===================================================================== */
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const {STYLES,STYLE_LIST,FIGHTERS,byId,byStyle,genOpponent,TIERS,OFF,DEF,PHY,ALL,ATTR_NAME,derived}=DATA;
let S=null;                         // estado da carreira
const RARCLS={fraco:'rBronze',medio:'rMedio',forte:'rForte',muitoforte:'rMuitoforte',lenda:'rLenda'};

/* ---------- util ---------- */
function show(id){ $$('.screen').forEach(s=>s.classList.remove('on')); $('#'+id).classList.add('on'); }
function vcls(v){ return 'v'+(v>=90?90:v>=80?80:v>=70?70:v>=60?60:50); }
function clone(f){ return JSON.parse(JSON.stringify(f)); }
let toastT; function toast(m,d){ const t=$('#toast'); t.textContent=m; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),d||2200); }

/* ---------- carta de lutador ---------- */
function cardHTML(f,opts){ opts=opts||{};
  const attrs=ALL.map(k=>`<div class="fcAttr"><span>${ATTR_NAME[k].slice(0,9)}</span><b class="${vcls(f.a[k])}">${f.a[k]}</b></div>`).join('');
  const abis=f.ab.map(id=>`<div class="abi">✦ ${DATA.ABIL[id].n}</div>`).join('');
  return `<div class="fcard ${RARCLS[f.rar]}">
    <div class="fcTop"><div class="fcOvr">${f.d.geral}<span>GERAL</span></div>
      <div class="fcSt"><div class="em">${f.styleEm}</div><small>${f.styleName}</small></div></div>
    <div class="fcPort"><canvas width="300" height="200"></canvas></div>
    <div class="fcName"><span class="flag">${f.pais}</span> ${f.name}</div>
    <div class="fcInfo">
      <div class="fcDeriv"><div><b>${f.d.ataque}</b><span>Ataque</span></div><div><b>${f.d.defesa}</b><span>Defesa</span></div><div><b>${f.d.fisico}</b><span>Físico</span></div></div>
      <div class="fcAttrs">${attrs}</div>
      <div class="fcAbis">${abis}</div>
    </div></div>`;
}
function paintCards(root){ root.querySelectorAll('.fcard').forEach((card,i)=>{ const cv=card.querySelector('canvas'); if(cv&&cv._f) ART.fighter(cv,cv._f.spec); }); }

/* ---------- MENU ---------- */
function initMenu(){
  const best=+(localStorage.getItem('pl_best')||0);
  $('#rec').innerHTML = best? `Melhor carreira: <b>${best} pts</b>` : 'Nenhuma lenda escrita ainda...';
  $('#btnCont').disabled=!localStorage.getItem('pl_save');
  $('#btnNew').onclick=()=>{ show('styleSel'); buildStyles(); };
  $('#btnCont').onclick=()=>{ const sv=load(); if(sv){ S=sv; openHub(); } };
  $('#btnHow').onclick=showHow;
  $$('[data-goto]').forEach(b=>b.onclick=()=>show(b.dataset.goto));
}
function showHow(){
  toast('Escolha um estilo → um lutador → distribua pontos → vença os torneios até o Mundial!',4200);
}

/* ---------- ESCOLHA DE ESTILO ---------- */
function buildStyles(){
  const g=$('#styleGrid'); g.innerHTML='';
  STYLE_LIST.forEach(id=>{ const st=STYLES[id];
    const d=document.createElement('div'); d.className='styleCard';
    d.innerHTML=`<div class="em">${st.em}</div><div class="nm">${st.name}</div><div class="rg">alcance: ${st.range}</div>`;
    d.onclick=()=>{ buildDraft(id); }; g.appendChild(d); });
}

/* ---------- DRAFT ---------- */
function buildDraft(styleId){
  show('draft'); $('#draftSt').textContent=STYLES[styleId].name;
  // sorteia 3 lutadores reais distintos do estilo
  const pool=[...byStyle[styleId]]; for(let i=pool.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [pool[i],pool[j]]=[pool[j],pool[i]]; }
  const three=pool.slice(0,3);
  const w=$('#draftWrap'); w.innerHTML='<div class="draftHint">Escolha um lutador para treinar. Você começa com a <b>versão iniciante</b> dele (~60) e cresce a cada vitória rumo ao auge lendário. A carta mostra o <b>potencial</b> — raridades melhores têm mais habilidades.</div>';
  three.forEach(f=>{
    const wrap=document.createElement('div');
    wrap.innerHTML=cardHTML(f)+`<button class="btn prime pickBtn">ESCOLHER ${f.name.split(' ')[0].toUpperCase()}</button>`;
    const cv=wrap.querySelector('canvas'); cv._f=f;
    wrap.querySelector('.pickBtn').onclick=()=>startCareer(f);
    w.appendChild(wrap);
  });
  paintCards(w);
}

/* ---------- CARREIRA: começar ----------
   Você treina uma versão INICIANTE do lutador real. Os atributos começam
   escalados para os ~60 (o "começa fraco" da ideia), preservando o formato
   (pontos fortes/fracos) e mantendo as habilidades da raridade. Vencendo,
   você distribui pontos e cresce rumo ao auge lendário. */
const ROOKIE_TARGET={fraco:60,medio:62,forte:64,muitoforte:66,lenda:68};
function startCareer(f){
  const fighter=clone(f);
  fighter.potential=clone(f.a);              // teto (auge real) — referência
  const target=ROOKIE_TARGET[f.rar]||62;
  const factor=target/f.d.geral;
  const a={}; ALL.forEach(k=>{ a[k]=Math.max(40,Math.min(99, Math.round(f.a[k]*factor))); });
  fighter.a=a;
  S={ style:f.style, fighter, tierIdx:0, points:10, score:0, wins:0, losses:0, belts:[],
     bracket:null, roundIdx:0, midRun:false };
  recalc();
  buildPoints(true);
}
function recalc(){ S.fighter.d=derived(S.fighter.a);
  // recomputa raridade visual pela nota
  const g=S.fighter.d.geral; S.fighter.rar= g>=88?'lenda':g>=80?'muitoforte':g>=72?'forte':g>=65?'medio':'fraco';
}

/* ---------- DISTRIBUIR PONTOS ---------- */
function buildPoints(first){
  show('points'); const w=$('#ptWrap'); const f=S.fighter;
  function grp(title,keys){ return `<div class="grpLbl">${title}</div>`+keys.map(k=>`
    <div class="aRow" data-k="${k}"><span class="an">${ATTR_NAME[k]}</span>
      <div class="abar"><i style="width:${f.a[k]}%"></i></div>
      <button class="pm minus">–</button><span class="av">${f.a[k]}</span><button class="pm plus">+</button></div>`).join(''); }
  w.innerHTML=`<div class="ptHead"><div style="font-family:var(--disp);font-size:20px">${f.name}</div>
      <div class="pts">PONTOS: <span id="ptLeft">${S.points}</span></div></div>
    <div class="attrEdit">${grp('Ofensivos',OFF)}${grp('Defensivos',DEF)}${grp('Físico / Mental',PHY)}</div>
    <div style="height:10px"></div>`;
  // guarda base p/ permitir só remover o que foi adicionado nesta sessão
  S._base=clone(f.a); S._maxPts=S.points;
  function upd(){ $('#ptLeft').textContent=S.points; recalc();
    w.querySelectorAll('.aRow').forEach(row=>{ const k=row.dataset.k;
      row.querySelector('.av').textContent=f.a[k]; row.querySelector('.abar>i').style.width=f.a[k]+'%';
      row.querySelector('.minus').disabled=f.a[k]<=S._base[k]; row.querySelector('.plus').disabled=S.points<=0||f.a[k]>=99; });
  }
  w.querySelectorAll('.aRow').forEach(row=>{ const k=row.dataset.k;
    row.querySelector('.plus').onclick=()=>{ if(S.points>0&&f.a[k]<99){ f.a[k]++; S.points--; upd(); } };
    row.querySelector('.minus').onclick=()=>{ if(f.a[k]>S._base[k]){ f.a[k]--; S.points++; upd(); } };
  });
  upd();
  $('#btnStartCareer').textContent = first? 'INICIAR CARREIRA ›' : 'VOLTAR AO TORNEIO ›';
  $('#btnStartCareer').onclick=()=>{ S._base=null; if(first){ S.tierIdx=0; newBracket(); } save(); openHub(); };
}

/* ---------- HUB / TORNEIO ---------- */
function newBracket(){
  const tier=TIERS[S.tierIdx]; const [lo,hi]=tier.ovr;
  // pool de oponentes: lendas reais na faixa + gerados
  const reals=FIGHTERS.filter(f=>f.id!==S.fighter.id && f.d.geral>=lo-2 && f.d.geral<=hi+2);
  for(let i=reals.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [reals[i],reals[j]]=[reals[j],reals[i]]; }
  const opps=[]; const usedLast=new Set([S.fighter.name.split(' ').slice(-1)[0]]);
  const lastOf=f=>f.name.split(' ').slice(-1)[0];
  for(let i=0;i<7;i++){
    if(reals[i]){ const c=clone(reals[i]); usedLast.add(lastOf(c)); opps.push(c); }
    else { const t=lo+Math.round((hi-lo)*(i/6));
      let o, tries=0; do{ o=genOpponent(Date.now()+i*97+tries*1337, t); tries++; }while(usedLast.has(lastOf(o))&&tries<20);
      usedLast.add(lastOf(o)); opps.push(o); } }
  // seed: você no slot 0; ordena oponentes por overall pra tornar o caminho mais duro
  opps.sort((a,b)=>a.d.geral-b.d.geral);
  const slots=[{f:S.fighter,you:true},...opps.map(f=>({f,you:false}))];
  // 8 slots → 3 rounds
  S.bracket={ tier:S.tierIdx, slots, results:[[],[],[]], round:0 };
  S.roundIdx=0;
}
function bracketPairs(round){ // índices dos confrontos a partir dos vencedores
  if(round===0) return [[0,1],[2,3],[4,5],[6,7]];
  if(round===1) return [[0,1],[2,3]];         // sobre winners[]
  return [[0,1]];
}
function winnersOf(round){
  if(round===0) return S.bracket.slots.map(s=>s.f);
  return S.bracket.results[round-1];
}
function openHub(){
  show('hub'); const f=S.fighter, tier=TIERS[S.tierIdx];
  const top=$('#hubTop'); top.innerHTML=`<div class="miniPort"><canvas width="120" height="120"></canvas></div>
    <div class="who"><div class="nm">${f.pais} ${f.name}</div><div class="st">${f.styleEm} ${f.styleName} · ${f.rarName}</div></div>
    <div class="ovrBadge">${f.d.geral}<span>GERAL</span></div>`;
  ART.fighter(top.querySelector('canvas'),f.spec);
  $('#hubStats').innerHTML=`<div class="st">🏆 Vitórias <b>${S.wins}</b></div><div class="st">⭐ Pontos <b>${S.score}</b></div>
    <div class="st">🎖️ Títulos <b>${S.belts.length}</b></div>${S.points>0?`<div class="st" style="border-color:var(--gold)">⬆️ <b>${S.points} pts</b> p/ gastar</div>`:''}`;
  $('#tierTitle').textContent=tier.name;
  const stageName=['Quartas de Final','Semifinal','FINAL'][S.roundIdx];
  $('#tierSub').textContent=`Nível ${S.tierIdx+1}/5 · ${stageName} · adversários ~${tier.ovr[0]}-${tier.ovr[1]} de geral`;
  renderBracket();
  const btns=$('#hubBtns'); btns.innerHTML='';
  // próximo adversário
  const opp=nextOpponent();
  const b1=document.createElement('button'); b1.className='btn prime';
  b1.innerHTML=`LUTAR — ${stageName} <span style="font-family:var(--cond);font-weight:400;font-size:14px">vs ${opp.name} (${opp.d.geral})</span>`;
  b1.onclick=()=>startFight(opp); btns.appendChild(b1);
  if(S.points>0){ const b2=document.createElement('button'); b2.className='btn gold'; b2.textContent=`DISTRIBUIR ${S.points} PONTOS`;
    b2.onclick=()=>{ S.midRun=true; buildPoints(false); }; btns.appendChild(b2); }
  const b3=document.createElement('button'); b3.className='btn sm'; b3.textContent='SALVAR E SAIR';
  b3.onclick=()=>{ save(); show('menu'); initMenu(); }; btns.appendChild(b3);
  save();
}
function nextOpponent(){
  // seu confronto no round atual
  if(S.roundIdx===0){ return S.bracket.slots[1].f; }               // você(0) vs slot1
  const w=S.bracket.results[S.roundIdx-1];
  // você é sempre o índice 0 dos vencedores do seu lado
  return w[1];
}
function renderBracket(){
  const br=$('#bracket'); br.innerHTML='';
  const stages=['Quartas','Semi','Final'];
  for(let r=0;r<3;r++){
    const col=document.createElement('div'); col.className='bcol';
    col.innerHTML=`<div class="bhd">${stages[r]}</div>`;
    const pairs=bracketPairs(r); const src=winnersOf(r);
    pairs.forEach((pr,mi)=>{
      const m=document.createElement('div'); m.className='bmatch';
      pr.forEach(idx=>{
        const fr=src[idx]; if(!fr){ m.innerHTML+=`<div class="bslot out">—</div>`; return; }
        const you=fr.id===S.fighter.id;
        const decided=S.bracket.results[r] && S.bracket.results[r].length>0;
        let cls='bslot'+(you?' you':'');
        if(decided){ const won=S.bracket.results[r].includes(fr); cls+=won?' win':' out'; }
        m.innerHTML+=`<div class="${cls}">${fr.name.split(' ').slice(-1)[0]} <small>${fr.d.geral}</small></div>`;
      });
      col.appendChild(m);
    });
    br.appendChild(col);
  }
}

/* ---------- LUTA ---------- */
let playTO=null, playSpeed=1;
function startFight(opp){
  S._opp=opp;
  const A=S.fighter, B=opp;
  const rounds = S.tierIdx>=3?4:3;
  const res=SIM.fight(A,B,{rounds});
  S._res=res;
  show('fight');
  $('#fnA').firstChild.textContent=A.name; $('#fsA').textContent=A.styleName+' · '+A.d.geral;
  $('#fnB').firstChild.textContent=B.name; $('#fsB').textContent=B.styleName+' · '+B.d.geral;
  ART.fighter($('#fight .fCorner.left canvas'),A.spec);
  ART.fighter($('#fight .fCorner.right canvas'),B.spec);
  $('#hpA').style.width='100%'; $('#hpB').style.width='100%'; $('#stA').style.width='100%'; $('#stB').style.width='100%';
  $('#feed').innerHTML=''; $('#fCards').innerHTML=''; $('#fRound').textContent='ROUND 1';
  playSpeed=1; $('#btnSpd').textContent='VELOCIDADE 1×'; $('#btnSpd').classList.remove('on');
  $('#btnSpd').onclick=()=>{ playSpeed=playSpeed===1?2:playSpeed===2?4:1; $('#btnSpd').textContent='VELOCIDADE '+playSpeed+'×'; $('#btnSpd').classList.toggle('on',playSpeed>1); };
  $('#btnSkip').onclick=()=>{ clearTimeout(playTO); res.feed.forEach(applyLine); finishFight(); };
  let i=0; let cardI=0;
  function step(){
    if(i>=res.feed.length){ finishFight(); return; }
    const ln=res.feed[i++]; applyLine(ln);
    // placar acumulado
    if(ln.kind==='roundend'){ /* placar já no texto */ }
    const base = ln.kind==='round'?700 : ln.kind==='finish'?1400 : ln.kind==='big'||ln.kind==='kd'?900 : ln.kind==='roundend'?1000 : 520;
    playTO=setTimeout(step, base/playSpeed);
  }
  step();
}
function applyLine(ln){
  const feed=$('#feed'); const d=document.createElement('div'); d.className='fl '+(ln.kind||''); d.textContent=ln.text; feed.appendChild(d);
  feed.scrollTop=feed.scrollHeight;
  while(feed.children.length>60) feed.removeChild(feed.firstChild);
  if(ln.hpA!=null){ $('#hpA').style.width=ln.hpA+'%'; $('#hpB').style.width=ln.hpB+'%'; $('#stA').style.width=ln.stA+'%'; $('#stB').style.width=ln.stB+'%'; }
  if(ln.kind==='round'){ const m=ln.text.match(/ROUND (\d+)/); if(m) $('#fRound').textContent='ROUND '+m[1]; }
  // atualiza cartões
  const cards=S._res.cards; const done=cards.slice(0, currentRoundDone(ln));
  $('#fCards').innerHTML = done.length? done.map((c,i)=>`R${i+1}: ${c[0]}-${c[1]}`).join('<br>') : '';
}
function currentRoundDone(ln){ // quantos rounds já fecharam
  return S._res.feed.filter((f,idx)=> f.kind==='roundend' && S._res.feed.indexOf(ln)>=idx).length;
}
function finishFight(){
  clearTimeout(playTO);
  const res=S._res, opp=S._opp;
  // resolve o resto do bracket (outros confrontos do round)
  resolveBracketRound(res.playerWon, opp);
  showResult(res);
}
function resolveBracketRound(playerWon, opp){
  const br=S.bracket, r=S.roundIdx;
  const src=winnersOf(r); const pairs=bracketPairs(r);
  const winners=[];
  pairs.forEach((pr,mi)=>{
    const a=src[pr[0]], b=src[pr[1]];
    if(!a||!b){ winners.push(a||b); return; }
    if(a.id===S.fighter.id||b.id===S.fighter.id){
      // seu confronto: usa o resultado real
      winners.push(playerWon? S.fighter : opp);
    } else {
      // auto-simula
      const rr=SIM.fight(a,b,{rounds:3}); winners.push(rr.winner.id===a.id?a:b);
    }
  });
  br.results[r]=winners;
}

/* ---------- RESULTADO ---------- */
function showResult(res){
  show('result'); const win=res.playerWon, tier=TIERS[S.tierIdx];
  const A=S.fighter, opp=S._opp;
  $('#rBanner').textContent = win?'VITÓRIA':'DERROTA'; $('#rBanner').className='rBanner '+(win?'win':'lose');
  $('#rMethod').textContent = win? `${A.name} vence por ${res.method}!` : `${opp.name} vence por ${res.method}.`;
  const st=win?res.statsA:res.statsA;
  $('#rDetail').textContent = `${res.method} no round ${res.endRound}. Golpes limpos: ${A.name.split(' ')[0]} ${res.statsA.sig} × ${res.statsB.sig} ${opp.name.split(' ')[0]}.`;
  const isFinal=S.roundIdx===2;
  let ptsGain=0, scoreGain=0, pointsGain=0;
  if(win){
    scoreGain=tier.win + (res.method.includes('Nocaute')||res.method.includes('Finaliza')?15:0);
    pointsGain= isFinal? 8 : 4;
    S.score+=scoreGain; S.wins++; S.points+=pointsGain;
  } else { S.losses++; }
  $('#rReward').innerHTML = win?
    `<div><b>+${scoreGain}</b><span>Pontos</span></div><div><b>+${pointsGain}</b><span>Atributos</span></div>`
    : `<div><b>${S.score}</b><span>Pontuação Final</span></div>`;
  const btns=$('#resBtns'); btns.innerHTML='';
  if(!win){
    // fim da run
    const best=Math.max(+(localStorage.getItem('pl_best')||0), S.score); localStorage.setItem('pl_best',best);
    localStorage.removeItem('pl_save');
    $('#rDetail').textContent += ` Sua carreira termina aqui — mas o nome fica na história.`;
    const b=document.createElement('button'); b.className='btn prime'; b.textContent='NOVA CARREIRA';
    b.onclick=()=>{ show('styleSel'); buildStyles(); }; btns.appendChild(b);
    const b2=document.createElement('button'); b2.className='btn'; b2.textContent='MENU'; b2.onclick=()=>{ show('menu'); initMenu(); }; btns.appendChild(b2);
    return;
  }
  // venceu
  if(isFinal){
    S.belts.push(tier.belt); S.score+=tier.pts;
    if(S.tierIdx>=TIERS.length-1){
      // CAMPEÃO MUNDIAL
      const best=Math.max(+(localStorage.getItem('pl_best')||0), S.score); localStorage.setItem('pl_best',best); localStorage.removeItem('pl_save');
      $('#rBanner').textContent='CAMPEÃO MUNDIAL'; $('#rMethod').textContent=`${A.name} é a nova LENDA do mundo das lutas!`;
      $('#rDetail').innerHTML=`Você conquistou todos os cinturões. ${S.belts.map(b=>`<span class="belt">🏆 ${b}</span>`).join('')}`;
      $('#rReward').innerHTML=`<div><b>${S.score}</b><span>Pontuação Lendária</span></div>`;
      const b=document.createElement('button'); b.className='btn gold'; b.textContent='NOVA CARREIRA';
      b.onclick=()=>{ show('styleSel'); buildStyles(); }; btns.appendChild(b); return;
    }
    // avança de nível
    S.tierIdx++; newBracket();
    $('#rMethod').textContent=`🏆 ${A.name} conquista o ${tier.belt}!`;
    $('#rDetail').textContent=`Você sobe para o próximo nível: ${TIERS[S.tierIdx].name}. Adversários mais fortes esperam.`;
    const b=document.createElement('button'); b.className='btn prime'; b.textContent=S.points>0?`DISTRIBUIR PONTOS ›`:'PRÓXIMO NÍVEL ›';
    b.onclick=()=>{ if(S.points>0) buildPoints(false); else openHub(); }; btns.appendChild(b);
    save(); return;
  }
  // avança no bracket (semi/final)
  S.roundIdx++;
  const b=document.createElement('button'); b.className='btn prime'; b.textContent= S.points>0?'DISTRIBUIR PONTOS ›':'PRÓXIMA LUTA ›';
  b.onclick=()=>{ if(S.points>0) buildPoints(false); else openHub(); }; btns.appendChild(b);
  save();
}

/* ---------- SAVE ---------- */
function save(){ if(S) try{ localStorage.setItem('pl_save', JSON.stringify(S)); }catch(e){} }
function load(){ try{ return JSON.parse(localStorage.getItem('pl_save')); }catch(e){ return null; } }

/* ---------- BOOT + hook ---------- */
window.addEventListener('load', ()=>{ initMenu(); });
window.PL={ get S(){return S;}, start(styleId){ buildStyles(); buildDraft(styleId||'boxe'); },
  pick(i){ const b=$$('#draftWrap .pickBtn')[i||0]; b&&b.click(); },
  addPts(k,n){ for(let x=0;x<(n||1);x++){ if(S.points>0){S.fighter.a[k]++;S.points--;} } recalc(); },
  goHub(){ S.tierIdx=S.tierIdx||0; if(!S.bracket)newBracket(); openHub(); },
  fightNext(){ startFight(nextOpponent()); }, skip(){ $('#btnSkip').click(); },
  res(){ return S._res; } };
})();
