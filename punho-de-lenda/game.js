/* ========================================================================
   PUNHO DE LENDA — fluxo MANAGER/IDLE
   Você é o TÉCNICO. Só escolhe os treinos; o resto (tempo passando,
   ganhos/perdas, lesões, descanso, as lutas) roda automático.
   ===================================================================== */
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const {STYLES,STYLE_LIST,FIGHTERS,byId,byStyle,genOpponent,TIERS,OFF,DEF,PHY,ALL,ATTR_NAME,
  derived,ABIL,SKILL_META,NIV_NAME,TRAIN,TRAIN_BY,INTENS,CAMP}=DATA;
let S=null;
const RARCLS={fraco:'rBronze',medio:'rMedio',forte:'rForte',muitoforte:'rMuitoforte',lenda:'rLenda'};

/* ---------- util ---------- */
function show(id){ $$('.screen').forEach(s=>s.classList.remove('on')); $('#'+id).classList.add('on'); }
function vcls(v){ return 'v'+(v>=90?90:v>=80?80:v>=70?70:v>=60?60:50); }
function clone(f){ return JSON.parse(JSON.stringify(f)); }
let toastT; function toast(m,d){ const t=$('#toast'); t.innerHTML=m; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),d||2400); }
function pips(lv){ let s=''; for(let i=1;i<=3;i++) s+=`<i class="${i<=lv?'on':''}"></i>`; return `<span class="pips">${s}</span>`; }

/* ---------- carta de lutador ---------- */
function cardHTML(f,opts){ opts=opts||{};
  const attrs=ALL.map(k=>`<div class="fcAttr"><span>${ATTR_NAME[k].slice(0,9)}</span><b class="${vcls(f.a[k])}">${f.a[k]}</b></div>`).join('');
  const abis=f.ab.map(id=>{ const lv=f.abLv?f.abLv[id]||1:1; return `<div class="abi">✦ ${ABIL[id].n}${f.abLv?` <b>${NIV_NAME[lv]}</b>`:''}</div>`;}).join('');
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
function paintCards(root){ root.querySelectorAll('.fcard').forEach(card=>{ const cv=card.querySelector('canvas'); if(cv&&cv._f) ART.fighter(cv,cv._f.spec); }); }

/* ---------- MENU ---------- */
function initMenu(){
  const best=+(localStorage.getItem('pl_best')||0);
  $('#rec').innerHTML = best? `Melhor carreira: <b>${best} pts</b>` : 'Nenhuma lenda escrita ainda...';
  $('#btnCont').disabled=!localStorage.getItem('pl_save');
  $('#btnNew').onclick=()=>{ show('styleSel'); buildStyles(); };
  $('#btnCont').onclick=()=>{ const sv=load(); if(sv){ S=sv; if(S.pendingSkill) openSkillPick(); else openAcademia(); } };
  $('#btnHow').onclick=showHow;
  $$('[data-goto]').forEach(b=>b.onclick=()=>show(b.dataset.goto));
}
function showHow(){ toast('Você é o <b>técnico</b>. Escolha os treinos da semana, veja seu lutador evoluir (ou se lesionar), e leve-o do torneio Regional até o Mundial. Só o treino é com você — o resto é automático.',6000); }

/* ---------- ESCOLHA DE ESTILO ---------- */
function buildStyles(){
  const g=$('#styleGrid'); g.innerHTML='';
  STYLE_LIST.forEach(id=>{ const st=STYLES[id];
    const d=document.createElement('div'); d.className='styleCard';
    d.innerHTML=`<div class="em">${st.em}</div><div class="nm">${st.name}</div><div class="rg">alcance: ${st.range}</div>`;
    d.onclick=()=>buildDraft(id); g.appendChild(d); });
}

/* ---------- DRAFT ---------- */
function buildDraft(styleId){
  show('draft'); $('#draftSt').textContent=STYLES[styleId].name;
  const pool=[...byStyle[styleId]]; for(let i=pool.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [pool[i],pool[j]]=[pool[j],pool[i]]; }
  const three=pool.slice(0,3);
  const w=$('#draftWrap'); w.innerHTML='<div class="draftHint">Escolha um lutador para treinar. Você começa com a <b>versão iniciante</b> dele (~60) e o desenvolve nos treinos rumo ao auge lendário. A carta mostra o <b>potencial</b> — raridades melhores têm mais habilidades.</div>';
  three.forEach(f=>{
    const wrap=document.createElement('div');
    wrap.innerHTML=cardHTML(f)+`<button class="btn prime pickBtn">ESCOLHER ${f.name.split(' ')[0].toUpperCase()}</button>`;
    wrap.querySelector('canvas')._f=f;
    wrap.querySelector('.pickBtn').onclick=()=>startCareer(f);
    w.appendChild(wrap);
  });
  paintCards(w);
}

/* ---------- CARREIRA: começar (rookie scaling) ---------- */
const ROOKIE_TARGET={fraco:60,medio:62,forte:64,muitoforte:66,lenda:68};
function startCareer(f){
  const fighter=clone(f);
  fighter.potential=clone(f.a);
  const target=ROOKIE_TARGET[f.rar]||62;
  const factor=target/f.d.geral;
  const a={}; ALL.forEach(k=>{ a[k]=Math.max(40,Math.min(99, Math.round(f.a[k]*factor))); });
  fighter.a=a;
  fighter.abLv={}; fighter.ab.forEach(id=>fighter.abLv[id]=1);
  S={ style:f.style, fighter, tierIdx:0, score:0, wins:0, losses:0, belts:[],
     cond:100, fat:0, age:21+((Math.random()*4)|0), skillXp:0, abXp:{}, injury:null,
     campWeeksLeft:CAMP.weeksFirst, week:0, camps:0,
     selFocus:['pads','especifico'], selIntens:'moderado', skillFocus:fighter.ab[0]||null,
     bracket:null, roundIdx:0, pendingSkill:null };
  recalc();
  openAcademia();
}
function recalc(){ S.fighter.d=derived(S.fighter.a);
  const g=S.fighter.d.geral; S.fighter.rar= g>=88?'lenda':g>=80?'muitoforte':g>=72?'forte':g>=65?'medio':'fraco';
  S.fighter.rarName=DATA.RAR_NAME[S.fighter.rar];
}

/* ==================== ACADEMIA (hub do técnico) ==================== */
function openAcademia(){
  if(S.pendingSkill){ openSkillPick(); return; }
  show('academia'); recalc();
  const f=S.fighter, tier=TIERS[S.tierIdx];
  // topo
  const top=$('#acTop'); top.innerHTML=`<div class="miniPort"><canvas width="130" height="130"></canvas></div>
    <div class="who"><div class="nm">${f.pais} ${f.name}</div>
      <div class="st">${f.styleEm} ${f.styleName} · ${f.rarName} · ${S.age|0} anos</div></div>
    <div class="ovrBadge">${f.d.geral}<span>GERAL</span></div>`;
  ART.fighter(top.querySelector('canvas'),f.spec);
  // vitais
  const inj=S.injury? `<div class="vitInj">🩹 ${S.injury.name} (${S.injury.sev}) — ${S.injury.weeksLeft} sem.</div>`:'';
  $('#acVitals').innerHTML=`
    <div class="vit"><span>Condição</span><div class="vbar"><i class="${condCls(S.cond)}" style="width:${S.cond}%"></i></div><b>${S.cond|0}</b></div>
    <div class="vit"><span>Fadiga</span><div class="vbar"><i class="${fatCls(S.fat)}" style="width:${S.fat}%"></i></div><b>${S.fat|0}</b></div>
    ${inj}`;
  // evento / camp
  const wl=S.campWeeksLeft;
  $('#acEvent').innerHTML=`<div class="evTitle">Próximo desafio: <b>${tier.name}</b></div>
    <div class="evSub">${wl>0? `Camp de preparação — <b>${wl}</b> ${wl===1?'semana restante':'semanas restantes'}`: 'Camp encerrado — pronto pro torneio!'}</div>`;
  // médias + habilidades
  $('#acDeriv').innerHTML=`<div><b>${f.d.ataque}</b><span>Ataque</span></div><div><b>${f.d.defesa}</b><span>Defesa</span></div><div><b>${f.d.fisico}</b><span>Físico</span></div><div><b>${f.d.geral}</b><span>Geral</span></div>`;
  $('#acAbis').innerHTML=f.ab.map(id=>`<div class="abi">✦ ${ABIL[id].n} ${pips(f.abLv[id]||1)}</div>`).join('') || '<span class="dim">Sem habilidades ainda</span>';
  // planner
  buildFocusPlanner();
  // botões
  const btns=$('#acBtns'); btns.innerHTML='';
  if(wl>0){ const b=document.createElement('button'); b.className='btn prime'; b.innerHTML=`TREINAR SEMANA <span class="wk">${S.week+1}</span> ›`;
    b.onclick=trainWeek; btns.appendChild(b); }
  const bt=document.createElement('button'); bt.className=wl>0?'btn':'btn prime'; bt.textContent= wl>0?'PULAR PRO TORNEIO':'ENTRAR NO TORNEIO ›';
  bt.onclick=()=>{ if(wl>0){ toast('Você pode entrar antes da hora — mas menos preparado.',2600); }
    goTournament(); }; btns.appendChild(bt);
  const bs=document.createElement('button'); bs.className='btn sm'; bs.textContent='SALVAR E SAIR';
  bs.onclick=()=>{ save(); show('menu'); initMenu(); }; btns.appendChild(bs);
  save();
}
function condCls(v){ return v>=70?'good':v>=40?'mid':'bad'; }
function fatCls(v){ return v>=80?'bad':v>=55?'mid':'good'; }

function buildFocusPlanner(){
  const f=S.fighter;
  // focos agrupados
  const grp={}; TRAIN.forEach(t=>{ (grp[t.grp]=grp[t.grp]||[]).push(t); });
  const wrap=$('#acFocus'); wrap.innerHTML='';
  Object.keys(grp).forEach(gn=>{
    const gEl=document.createElement('div'); gEl.className='focGrp';
    gEl.innerHTML=`<div class="focGrpT">${gn}</div>`;
    grp[gn].forEach(t=>{
      const on=S.selFocus.includes(t.id);
      const c=document.createElement('button'); c.className='focChip'+(on?' on':''); c.dataset.id=t.id;
      c.innerHTML=`<span class="fe">${t.em}</span><span class="fn">${t.name}</span>
        <span class="fmeta">${riskDots(t)}</span>`;
      c.onclick=()=>toggleFocus(t.id); gEl.appendChild(c);
    });
    wrap.appendChild(gEl);
  });
  // intensidade
  const iw=$('#acIntens'); iw.innerHTML='';
  Object.keys(INTENS).forEach(k=>{ const it=INTENS[k];
    const b=document.createElement('button'); b.className='intBtn'+(S.selIntens===k?' on':''); b.dataset.k=k;
    b.innerHTML=`${it.em} ${it.name}`; b.onclick=()=>{ S.selIntens=k; buildFocusPlanner(); save(); }; iw.appendChild(b); });
  // foco de habilidade
  const sw=$('#acSkillFocus');
  if(f.ab.length){
    sw.innerHTML=`<div class="sfLbl">🔧 Aprimorar habilidade <span class="dim">(desenvolve o nível de UMA)</span></div>`;
    const row=document.createElement('div'); row.className='sfRow';
    f.ab.forEach(id=>{ const lv=f.abLv[id]||1; const on=S.skillFocus===id; const max=lv>=3;
      const b=document.createElement('button'); b.className='sfChip'+(on?' on':'')+(max?' max':''); b.dataset.id=id;
      b.innerHTML=`${ABIL[id].n} ${pips(lv)}`;
      b.onclick=()=>{ S.skillFocus= on?null:id; buildFocusPlanner(); save(); }; row.appendChild(b); });
    sw.appendChild(row);
    const xp=S.skillFocus?(S.abXp[S.skillFocus]||0):0;
    sw.innerHTML+= S.skillFocus&&(f.abLv[S.skillFocus]||1)<3? `<div class="sfXp">Progresso da evolução: ${Math.round(xp/CAMP.levelXpPer*100)}%</div>`:'';
  } else sw.innerHTML='';
  // xp habilidade nova
  $('#acSxp').innerHTML=`<div class="sxLbl">⭐ Evolução técnica p/ nova habilidade</div>
    <div class="vbar sm"><i class="good" style="width:${Math.min(100,(S.skillXp/CAMP.breakthroughXp)*100)}%"></i></div>`;
}
function riskDots(t){
  if(t.rest) return '<span class="dot rest">recupera</span>';
  const lvl = t.inj>=0.1?'alto':t.inj>=0.04?'médio':'baixo';
  return `<span class="dot ${lvl}">risco ${lvl}</span>`;
}
function toggleFocus(id){
  const i=S.selFocus.indexOf(id);
  if(i>=0){ S.selFocus.splice(i,1); }
  else { if(id==='descanso'){ S.selFocus=['descanso']; }
    else { S.selFocus=S.selFocus.filter(x=>x!=='descanso'); if(S.selFocus.length>=CAMP.slotsPerWeek){ toast(`Máximo de ${CAMP.slotsPerWeek} focos por semana.`,1800); return; } S.selFocus.push(id); } }
  buildFocusPlanner(); save();
}

/* ---------- TREINAR UMA SEMANA ---------- */
function trainWeek(){
  if(!S.selFocus.length){ toast('Escolha ao menos 1 foco de treino.',1800); return; }
  const rep=GYM.week(S, S.selFocus, S.selIntens);
  recalc();
  playReport(rep);
  save();
}
function playReport(rep){
  show('trainReport');
  $('#trWeek').textContent=`SEMANA ${S.week} — ${rep.focusNames.join(' + ')} (${INTENS[rep.intens].name})`;
  const mon=$('#trMontage'); mon.innerHTML='';
  const bottom=$('#trBottom'); bottom.classList.remove('show');
  // montagem dia-a-dia animada
  let i=0; const lines=rep.days;
  (function play(){
    if(i<lines.length){ const d=document.createElement('div'); d.className='monLine'; d.textContent=lines[i++]; mon.appendChild(d); mon.scrollTop=mon.scrollHeight; setTimeout(play,430); }
    else showReportBody(rep);
  })();
  $('#trSkip').onclick=()=>{ mon.innerHTML=lines.map(l=>`<div class="monLine">${l}</div>`).join(''); showReportBody(rep); };
}
function showReportBody(rep){
  const bottom=$('#trBottom'); bottom.classList.add('show');
  // deltas
  const dk=Object.keys(rep.deltas);
  $('#trDeltas').innerHTML = dk.length? dk.map(k=>{ const v=rep.deltas[k]; const up=v>0;
    return `<div class="dRow ${up?'up':'down'}"><span>${ATTR_NAME[k]}</span><b>${up?'▲ +'+v:'▼ '+v}</b></div>`;}).join('')
    : '<div class="dRow flat">Sem mudança de atributos nesta semana.</div>';
  // vitais
  const cD=rep.condAfter-rep.condBefore, fD=rep.fatAfter-rep.fatBefore;
  $('#trVitals').innerHTML=`<div class="tvi"><span>Condição</span> ${rep.condBefore} → <b class="${cD>=0?'up':'down'}">${rep.condAfter}</b></div>
    <div class="tvi"><span>Fadiga</span> ${rep.fatBefore} → <b class="${fD<=0?'up':'down'}">${rep.fatAfter}</b></div>`;
  // eventos
  const ev=$('#trEvents'); ev.innerHTML='';
  if(rep.injury) ev.innerHTML+=`<div class="evBanner inj">🩹 LESÃO: ${rep.injury.name} (${rep.injury.sev}). Vai atrapalhar até curar.</div>`;
  if(rep.regressed) ev.innerHTML+=`<div class="evBanner warn">⚠️ Excesso de treino: o corpo regrediu um pouco. Descanse!</div>`;
  if(rep.leveled) ev.innerHTML+=`<div class="evBanner up">⬆️ HABILIDADE EVOLUIU: ${ABIL[rep.leveled].n} subiu de nível!</div>`;
  if(rep.breakthrough) ev.innerHTML+=`<div class="evBanner new">⭐ AVANÇO TÉCNICO! Seu lutador está pronto pra aprender uma nova habilidade.</div>`;
  // botão
  const btn=$('#trBtn');
  const done=S.campWeeksLeft<=0;
  btn.textContent = rep.breakthrough? 'ESCOLHER HABILIDADE ›' : done? 'FIM DO CAMP ›' : 'CONTINUAR ›';
  btn.onclick=()=>{ if(rep.breakthrough){ S.pendingSkill=GYM.candidates(S); openSkillPick(); } else openAcademia(); };
}

/* ---------- ESCOLHER NOVA HABILIDADE (3 opções) ---------- */
function openSkillPick(){
  show('skillPick');
  const cand = S.pendingSkill && S.pendingSkill.length? S.pendingSkill : (S.pendingSkill=GYM.candidates(S));
  const w=$('#skWrap'); w.innerHTML='';
  cand.forEach(id=>{ const m=SKILL_META[id]||{core:[]};
    const c=document.createElement('button'); c.className='skCard cat-'+(m.cat||'x');
    c.innerHTML=`<div class="skIcon">✦</div><div class="skName">${ABIL[id].n}</div>
      <div class="skDesc">${ABIL[id].d}</div>
      <div class="skCore">Turbina: ${m.core.map(k=>ATTR_NAME[k]).join(' · ')}</div>
      <div class="skPick">APRENDER</div>`;
    c.onclick=()=>{ GYM.learn(S,id); S.pendingSkill=null; recalc(); toast(`✦ Nova habilidade: <b>${ABIL[id].n}</b>!`,2600); save(); openAcademia(); };
    w.appendChild(c);
  });
}

/* ==================== TORNEIO ==================== */
function goTournament(){
  if(!S.bracket || S.bracket.tier!==S.tierIdx){ newBracket(); }
  openHub();
}
function newBracket(){
  const tier=TIERS[S.tierIdx]; const [lo,hi]=tier.ovr;
  const reals=FIGHTERS.filter(f=>f.id!==S.fighter.id && f.d.geral>=lo-2 && f.d.geral<=hi+2);
  for(let i=reals.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [reals[i],reals[j]]=[reals[j],reals[i]]; }
  const opps=[]; const usedLast=new Set([S.fighter.name.split(' ').slice(-1)[0]]);
  const lastOf=f=>f.name.split(' ').slice(-1)[0];
  for(let i=0;i<7;i++){
    if(reals[i]){ const c=clone(reals[i]); usedLast.add(lastOf(c)); opps.push(c); }
    else { const t=lo+Math.round((hi-lo)*(i/6));
      let o,tries=0; do{ o=genOpponent(Date.now()+i*97+tries*1337,t); tries++; }while(usedLast.has(lastOf(o))&&tries<20);
      usedLast.add(lastOf(o)); opps.push(o); } }
  opps.sort((a,b)=>a.d.geral-b.d.geral);
  const slots=[{f:S.fighter,you:true},...opps.map(f=>({f,you:false}))];
  S.bracket={ tier:S.tierIdx, slots, results:[[],[],[]], round:0 };
  S.roundIdx=0;
}
function bracketPairs(round){ if(round===0) return [[0,1],[2,3],[4,5],[6,7]]; if(round===1) return [[0,1],[2,3]]; return [[0,1]]; }
function winnersOf(round){ if(round===0) return S.bracket.slots.map(s=>s.f); return S.bracket.results[round-1]; }
function nextOpponent(){ if(S.roundIdx===0) return S.bracket.slots[1].f; return S.bracket.results[S.roundIdx-1][1]; }

function openHub(){
  show('hub'); const f=S.fighter, tier=TIERS[S.tierIdx];
  const top=$('#hubTop'); top.innerHTML=`<div class="miniPort"><canvas width="120" height="120"></canvas></div>
    <div class="who"><div class="nm">${f.pais} ${f.name}</div><div class="st">${f.styleEm} ${f.styleName} · ${f.rarName}</div></div>
    <div class="ovrBadge">${f.d.geral}<span>GERAL</span></div>`;
  ART.fighter(top.querySelector('canvas'),f.spec);
  const injTxt=S.injury?` · 🩹 ${S.injury.sev}`:'';
  $('#hubStats').innerHTML=`<div class="st">🏆 Vitórias <b>${S.wins}</b></div><div class="st">⭐ Pontos <b>${S.score}</b></div>
    <div class="st">🎖️ Títulos <b>${S.belts.length}</b></div>
    <div class="st ${condCls(S.cond)==='bad'?'warn':''}">❤️ Condição <b>${S.cond|0}${injTxt}</b></div>`;
  $('#tierTitle').textContent=tier.name;
  const stageName=['Quartas de Final','Semifinal','FINAL'][S.roundIdx];
  $('#tierSub').textContent=`Nível ${S.tierIdx+1}/5 · ${stageName} · adversários ~${tier.ovr[0]}-${tier.ovr[1]} de geral`;
  renderBracket();
  const btns=$('#hubBtns'); btns.innerHTML='';
  const opp=nextOpponent();
  const b1=document.createElement('button'); b1.className='btn prime';
  b1.innerHTML=`LUTAR — ${stageName} <span style="font-family:var(--cond);font-weight:400;font-size:14px">vs ${opp.name} (${opp.d.geral})</span>`;
  b1.onclick=()=>startFight(opp); btns.appendChild(b1);
  const b3=document.createElement('button'); b3.className='btn sm'; b3.textContent='SALVAR E SAIR';
  b3.onclick=()=>{ save(); show('menu'); initMenu(); }; btns.appendChild(b3);
  save();
}
function renderBracket(){
  const br=$('#bracket'); br.innerHTML=''; const stages=['Quartas','Semi','Final'];
  for(let r=0;r<3;r++){ const col=document.createElement('div'); col.className='bcol'; col.innerHTML=`<div class="bhd">${stages[r]}</div>`;
    const pairs=bracketPairs(r); const src=winnersOf(r);
    pairs.forEach(pr=>{ const m=document.createElement('div'); m.className='bmatch';
      pr.forEach(idx=>{ const fr=src[idx]; if(!fr){ m.innerHTML+=`<div class="bslot out">—</div>`; return; }
        const you=fr.id===S.fighter.id; const decided=S.bracket.results[r]&&S.bracket.results[r].length>0;
        let cls='bslot'+(you?' you':''); if(decided){ const won=S.bracket.results[r].includes(fr); cls+=won?' win':' out'; }
        m.innerHTML+=`<div class="${cls}">${fr.name.split(' ').slice(-1)[0]} <small>${fr.d.geral}</small></div>`;
      }); col.appendChild(m); });
    br.appendChild(col);
  }
}

/* ---------- LUTA (usa lutador EFETIVO: condição/lesão/nível) ---------- */
let playTO=null, playSpeed=1;
function startFight(opp){
  S._opp=opp;
  const A=GYM.effective(S); A.name=S.fighter.name; A.pais=S.fighter.pais;   // efetivo mas mantém identidade
  const B=opp;
  const rounds=S.tierIdx>=3?4:3;
  const res=SIM.fight(A,B,{rounds}); S._res=res; S._effA=A;
  show('fight');
  $('#fnA').firstChild.textContent=A.name; $('#fsA').textContent=A.styleName+' · '+A.d.geral+(S.cond<70?' (cond '+(S.cond|0)+')':'');
  $('#fnB').firstChild.textContent=B.name; $('#fsB').textContent=B.styleName+' · '+B.d.geral;
  ART.fighter($('#fight .fCorner.left canvas'),A.spec);
  ART.fighter($('#fight .fCorner.right canvas'),B.spec);
  $('#hpA').style.width='100%'; $('#hpB').style.width='100%'; $('#stA').style.width='100%'; $('#stB').style.width='100%';
  $('#feed').innerHTML=''; $('#fCards').innerHTML=''; $('#fRound').textContent='ROUND 1';
  playSpeed=1; $('#btnSpd').textContent='VELOCIDADE 1×'; $('#btnSpd').classList.remove('on');
  $('#btnSpd').onclick=()=>{ playSpeed=playSpeed===1?2:playSpeed===2?4:1; $('#btnSpd').textContent='VELOCIDADE '+playSpeed+'×'; $('#btnSpd').classList.toggle('on',playSpeed>1); };
  $('#btnSkip').onclick=()=>{ clearTimeout(playTO); res.feed.forEach(applyLine); finishFight(); };
  let i=0;
  function step(){ if(i>=res.feed.length){ finishFight(); return; }
    const ln=res.feed[i++]; applyLine(ln);
    const base=ln.kind==='round'?700:ln.kind==='finish'?1400:ln.kind==='big'||ln.kind==='kd'?900:ln.kind==='roundend'?1000:520;
    playTO=setTimeout(step, base/playSpeed);
  }
  step();
}
function applyLine(ln){
  const feed=$('#feed'); const d=document.createElement('div'); d.className='fl '+(ln.kind||''); d.textContent=ln.text; feed.appendChild(d);
  feed.scrollTop=feed.scrollHeight; while(feed.children.length>60) feed.removeChild(feed.firstChild);
  if(ln.hpA!=null){ $('#hpA').style.width=ln.hpA+'%'; $('#hpB').style.width=ln.hpB+'%'; $('#stA').style.width=ln.stA+'%'; $('#stB').style.width=ln.stB+'%'; }
  if(ln.kind==='round'){ const m=ln.text.match(/ROUND (\d+)/); if(m) $('#fRound').textContent='ROUND '+m[1]; }
  const done=S._res.cards.slice(0, currentRoundDone(ln));
  $('#fCards').innerHTML = done.length? done.map((c,i)=>`R${i+1}: ${c[0]}-${c[1]}`).join('<br>') : '';
}
function currentRoundDone(ln){ return S._res.feed.filter((fl,idx)=> fl.kind==='roundend' && S._res.feed.indexOf(ln)>=idx).length; }
function finishFight(){ clearTimeout(playTO); const res=S._res, opp=S._opp;
  resolveBracketRound(res.playerWon, opp); showResult(res); }
function resolveBracketRound(playerWon, opp){
  const br=S.bracket, r=S.roundIdx; const src=winnersOf(r); const pairs=bracketPairs(r); const winners=[];
  pairs.forEach(pr=>{ const a=src[pr[0]], b=src[pr[1]];
    if(!a||!b){ winners.push(a||b); return; }
    if(a.id===S.fighter.id||b.id===S.fighter.id){ winners.push(playerWon? S.fighter:opp); }
    else { const rr=SIM.fight(a,b,{rounds:3}); winners.push(rr.winner.id===a.id?a:b); }
  });
  br.results[r]=winners;
}

/* ---------- RESULTADO ---------- */
function showResult(res){
  show('result'); const win=res.playerWon, tier=TIERS[S.tierIdx];
  const A=S.fighter, opp=S._opp;
  $('#rBanner').textContent = win?'VITÓRIA':'DERROTA'; $('#rBanner').className='rBanner '+(win?'win':'lose');
  $('#rMethod').textContent = win? `${A.name} vence por ${res.method}!` : `${opp.name} vence por ${res.method}.`;
  $('#rDetail').textContent = `${res.method} no round ${res.endRound}. Golpes limpos: ${A.name.split(' ')[0]} ${res.statsA.sig} × ${res.statsB.sig} ${opp.name.split(' ')[0]}.`;
  const isFinal=S.roundIdx===2;
  let scoreGain=0;
  const btns=$('#resBtns'); btns.innerHTML='';
  if(win){ scoreGain=tier.win+(res.method.includes('Nocaute')||res.method.includes('Finaliza')?15:0); S.score+=scoreGain; S.wins++; }
  else S.losses++;
  // dano/fadiga da luta (automático)
  if(win){ S.fat=Math.min(100,S.fat+10); S.cond=Math.max(0,S.cond-12); }
  $('#rReward').innerHTML = win? `<div><b>+${scoreGain}</b><span>Pontos</span></div><div><b>${S.cond|0}</b><span>Condição</span></div>`
    : `<div><b>${S.score}</b><span>Pontuação Final</span></div>`;

  if(!win){
    const best=Math.max(+(localStorage.getItem('pl_best')||0),S.score); localStorage.setItem('pl_best',best); localStorage.removeItem('pl_save');
    $('#rDetail').textContent+=' Sua carreira termina aqui — mas o nome fica na história.';
    const b=document.createElement('button'); b.className='btn prime'; b.textContent='NOVA CARREIRA'; b.onclick=()=>{ show('styleSel'); buildStyles(); }; btns.appendChild(b);
    const b2=document.createElement('button'); b2.className='btn'; b2.textContent='MENU'; b2.onclick=()=>{ show('menu'); initMenu(); }; btns.appendChild(b2);
    return;
  }
  if(isFinal){
    S.belts.push(tier.belt); S.score+=tier.pts;
    if(S.tierIdx>=TIERS.length-1){
      const best=Math.max(+(localStorage.getItem('pl_best')||0),S.score); localStorage.setItem('pl_best',best); localStorage.removeItem('pl_save');
      $('#rBanner').textContent='CAMPEÃO MUNDIAL'; $('#rMethod').textContent=`${A.name} é a nova LENDA do mundo das lutas!`;
      $('#rDetail').innerHTML=`Você conquistou todos os cinturões. ${S.belts.map(b=>`<span class="belt">🏆 ${b}</span>`).join('')}`;
      $('#rReward').innerHTML=`<div><b>${S.score}</b><span>Pontuação Lendária</span></div>`;
      const b=document.createElement('button'); b.className='btn gold'; b.textContent='NOVA CARREIRA'; b.onclick=()=>{ show('styleSel'); buildStyles(); }; btns.appendChild(b); return;
    }
    // sobe de nível → novo camp
    S.tierIdx++; S.age+=1; S.camps++; S.bracket=null; S.roundIdx=0;
    S.campWeeksLeft=CAMP.weeksTier; S.cond=Math.min(100,S.cond+30); S.fat=Math.max(0,S.fat-30);
    $('#rMethod').textContent=`🏆 ${A.name} conquista o ${tier.belt}!`;
    $('#rDetail').textContent=`Rumo ao ${TIERS[S.tierIdx].name}. Hora de um novo camp de preparação — adversários bem mais fortes esperam.`;
    const b=document.createElement('button'); b.className='btn prime'; b.textContent='NOVO CAMP DE TREINO ›'; b.onclick=openAcademia; btns.appendChild(b);
    save(); return;
  }
  // avança no bracket → recuperação automática entre lutas
  S.roundIdx++;
  const rec=autoRecover();
  $('#rDetail').textContent+= `  Recuperação entre lutas: condição ${rec.before}→${rec.after}.`;
  const b=document.createElement('button'); b.className='btn prime'; b.textContent='PRÓXIMA LUTA ›'; b.onclick=openHub; btns.appendChild(b);
  save();
}
function autoRecover(){ const before=S.cond|0; // descanso curto automático entre lutas do torneio
  S.cond=Math.min(100,S.cond+16); S.fat=Math.max(0,S.fat-14);
  if(S.injury){ S.injury.weeksLeft--; if(S.injury.weeksLeft<=0) S.injury=null; }
  return {before, after:S.cond|0};
}

/* ---------- SAVE ---------- */
function save(){ if(S) try{ localStorage.setItem('pl_save', JSON.stringify(S)); }catch(e){} }
function load(){ try{ return JSON.parse(localStorage.getItem('pl_save')); }catch(e){ return null; } }

/* ---------- BOOT + hook de teste ---------- */
window.addEventListener('load', initMenu);
window.PL={ get S(){return S;},
  start(styleId){ buildStyles(); buildDraft(styleId||'boxe'); },
  pick(i){ const b=$$('#draftWrap .pickBtn')[i||0]; b&&b.click(); },
  setFocus(arr){ S.selFocus=arr; buildFocusPlanner(); }, setIntens(k){ S.selIntens=k; },
  train(){ $('#academia .btn.prime').click(); }, contTrain(){ $('#trBtn').click(); }, skipTrain(){ $('#trSkip')&&$('#trSkip').click(); },
  pickSkill(i){ const c=$$('#skWrap .skCard')[i||0]; c&&c.click(); },
  toTourney(){ goTournament(); }, fightNext(){ startFight(nextOpponent()); }, skip(){ $('#btnSkip').click(); },
  res(){ return S._res; }, eff(){ return GYM.effective(S); } };
})();
