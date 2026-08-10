// =============================================================================
// game.js — Modo História: pontuação + segurar/rerrolar + fases + chefe + diálogo.
// =============================================================================
import { createDiceTable } from './engine3d.js';
import { SPEAKERS, INTRO, OUTRO, STAGES, CANDLES, RELICS } from './story.js';

const $ = id => document.getElementById(id);

// ---- PONTUAÇÃO: combos. score = (fichas base + soma dos dados) × mult ----
const CATS = {
  high:    { name:'Nada',        chips:5,   mult:1, rank:0 },
  pair:    { name:'Par',         chips:10,  mult:2, rank:1 },
  twopair: { name:'Dois Pares',  chips:20,  mult:2, rank:2 },
  trips:   { name:'Trinca',      chips:30,  mult:3, rank:3 },
  straight:{ name:'Sequência',   chips:40,  mult:4, rank:4 },
  full:    { name:'Full House',  chips:45,  mult:4, rank:5 },
  quad:    { name:'Quadra',      chips:65,  mult:5, rank:6 },
  quint:   { name:'Quina!',      chips:100, mult:8, rank:7 },
};
function scoreOf(values, relics=[]){
  const cnt={}; values.forEach(v=>cnt[v]=(cnt[v]||0)+1);
  const counts=Object.values(cnt).sort((a,b)=>b-a);
  const uniq=Object.keys(cnt).map(Number).sort((a,b)=>a-b);
  const straight = uniq.length===5 && (uniq[4]-uniq[0]===4);
  let key='high';
  if(counts[0]===5) key='quint';
  else if(counts[0]===4) key='quad';
  else if(counts[0]===3 && counts[1]===2) key='full';
  else if(straight) key='straight';
  else if(counts[0]===3) key='trips';
  else if(counts[0]===2 && counts[1]===2) key='twopair';
  else if(counts[0]===2) key='pair';
  const cat=CATS[key], sum=values.reduce((a,b)=>a+b,0);
  let chips=cat.chips+sum, mult=cat.mult;
  // ---- efeitos das RELÍQUIAS ----
  const has = id => relics.includes(id);
  if(has('ganancia'))  chips += 12;
  if(has('brasa'))     chips += 4 * values.filter(v=>v%2===0).length;
  if(has('osso'))      chips += 3 * values.filter(v=>v>=5).length;
  if(has('pressagio')  && cat.rank>=CATS.trips.rank) mult += 3;
  if(has('parsombrio') && (key==='pair'||key==='twopair')) mult += 2;
  if(has('serpente')   && key==='straight') chips += 45;
  if(has('olho'))      mult += 1;
  if(has('chamadupla') && cat.rank>=CATS.full.rank) mult *= 2;
  return { key, name:cat.name, chips, mult, total:chips*mult };
}

const G = { stageIdx:0, score:0, handsLeft:0, rerollsLeft:0, meta:0, candles:CANDLES, relics:[], phase:'boot', bossMidShown:false, vals:null };
let table;
const stage = () => STAGES[G.stageIdx] || {};

// ---- DIÁLOGO ----
let dlgQueue=[], dlgIdx=0, dlgDone=null;
function runDialogue(lines, done){
  if(!lines || !lines.length){ done && done(); return; }
  dlgQueue=lines; dlgIdx=0; dlgDone=done;
  $('bar').hidden=true; $('holdHint').hidden=true;
  $('dlg').hidden=false; showLine();
}
function showLine(){
  const ln=dlgQueue[dlgIdx], sp=SPEAKERS[ln.who]||SPEAKERS.crupie;
  const port=$('dlgPortrait'); port.style.setProperty('--c', sp.color);
  port.innerHTML=`<span class="pl">${sp.emoji}</span>`+(sp.hasArt?`<img src="${sp.img}" alt="" onerror="this.style.display='none'">`:'');
  $('dlgName').textContent=sp.name; $('dlgName').style.color=sp.color;
  $('dlgText').textContent=ln.text;
}
function advanceDialogue(){
  if($('dlg').hidden) return;
  dlgIdx++;
  if(dlgIdx>=dlgQueue.length){ $('dlg').hidden=true; const cb=dlgDone; dlgDone=null; cb&&cb(); }
  else showLine();
}

// ---- BOTÕES / fase da mão ----
function setButtons(mode){
  const roll=$('btnRoll'), rr=$('btnReroll'), sc=$('btnScore'), hint=$('holdHint');
  $('bar').hidden=false;
  const show=(el,on)=>{ el.hidden=!on; };
  if(mode==='idle'){ show(roll,true); show(rr,false); show(sc,false); hint.hidden=true; roll.disabled=false; }
  else if(mode==='rolling'){ show(roll,false); show(rr,true); show(sc,true); rr.disabled=true; sc.disabled=true; hint.hidden=true; }
  else if(mode==='choose'){
    show(roll,false); show(rr,true); show(sc,true);
    rr.disabled = G.rerollsLeft<=0; rr.innerHTML=`🔁 Rerrolar tudo<span class="sub">${G.rerollsLeft} restantes</span>`;
    sc.disabled=false; hint.hidden=true;
  }
}

// ---- FASES ----
function beginStage(i){
  const st=STAGES[i];
  if(!st){ return runDialogue(OUTRO, gameComplete); }
  Object.assign(G, { stageIdx:i, score:0, handsLeft:st.hands, rerollsLeft:st.rerolls||0, meta:st.meta, bossMidShown:false, phase:'intro' });
  $('table').classList.toggle('boss', st.type==='boss');
  updateHUD(); showCombo(null);
  runDialogue(st.intro, ()=>{ G.phase='idle'; setButtons('idle'); updateHUD(); });
}
function startHand(){
  if(G.phase!=='idle' || G.handsLeft<=0 || table.isRolling()) return;
  table.clearHeld(); G.phase='rolling'; G.vals=null;   // rerolls é orçamento da FASE (não reseta por mão)
  showCombo(null); setButtons('rolling'); table.roll(false);
}
function doReroll(){
  if(G.phase!=='choose' || G.rerollsLeft<=0 || table.isRolling()) return;
  G.rerollsLeft--; G.phase='rolling'; setButtons('rolling'); table.roll(false);   // rerrola TODOS
}
function onResult(vals){
  if(G.phase!=='rolling') return;         // ignora a rolagem inicial de posicionamento
  G.vals=vals; G.phase='choose';
  showCombo(scoreOf(vals, G.relics), true);   // prévia (ainda não pontuou)
  setButtons('choose');
}
function doScore(){
  if(G.phase!=='choose' || !G.vals) return;
  const s=scoreOf(G.vals, G.relics);
  G.score+=s.total; G.handsLeft--;
  showCombo(s); floatPoints(s.total); table.clearHeld(); updateHUD();
  const st=stage();
  if(st.type==='boss' && !G.bossMidShown && G.score>=G.meta*0.5 && G.score<G.meta){
    G.bossMidShown=true; G.phase='dialogue'; return runDialogue(st.mid, resolveHand);
  }
  resolveHand();
}
function resolveHand(){
  const st=stage();
  if(G.score>=G.meta){
    G.phase='dialogue'; banner('FASE VENCIDA', st.type==='boss'?'boss':'ok');
    const last = G.stageIdx >= STAGES.length-1;
    runDialogue(st.win, ()=> last ? beginStage(G.stageIdx+1)         // → OUTRO/complete
                                  : showReward(()=> beginStage(G.stageIdx+1)));
  } else if(G.handsLeft<=0){
    G.candles--; updateHUD();
    G.phase='dialogue';
    if(G.candles>0){
      banner('VELA APAGADA', 'bad');
      runDialogue([{who:'crupie',text:'Uma vela se apaga… mas você ainda respira. Encare esta mesa de novo.'}], retryStage);
    } else {
      banner('SEM VELAS', 'bad');
      runDialogue(st.lose||[{who:'crupie',text:'A última chama morre. A Casa fica com você.'}], gameOver);
    }
  } else { G.phase='idle'; setButtons('idle'); }
}
function retryStage(){                          // repete a MESMA fase (sem repetir a intro)
  const st=stage();
  Object.assign(G, { score:0, handsLeft:st.hands, rerollsLeft:st.rerolls||0, bossMidShown:false, phase:'idle' });
  table.clearHeld(); showCombo(null); updateHUD(); setButtons('idle');
}
// ---- RECOMPENSA: escolher 1 relíquia após vencer a mesa ----
function showReward(done){
  const avail = RELICS.filter(r=>!G.relics.includes(r.id));
  if(!avail.length){ done(); return; }
  const pool = avail.slice(), offer = [];
  while(offer.length<3 && pool.length) offer.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
  $('bar').hidden=true; $('reward').hidden=false;
  $('rewardCards').innerHTML = offer.map(r=>
    `<button class="rw" data-id="${r.id}"><span class="rw-ic">${r.emoji}</span><span class="rw-t"><b>${r.name}</b><small>${r.desc}</small></span></button>`).join('');
  $('rewardCards').querySelectorAll('.rw').forEach(btn=>btn.onclick=()=>{
    G.relics.push(btn.dataset.id); $('reward').hidden=true; updateHUD(); done();
  });
}
function gameOver(){ showEnd('Fim de Jogo','A Casa venceu. Mas ela sempre dá outra rodada…','Tentar de novo'); }
function gameComplete(){ showEnd('Andar Vencido','Você subiu o primeiro andar. O próximo é pior.','Jogar de novo'); }
function showEnd(t,s,b){ $('bar').hidden=true; $('holdHint').hidden=true; $('end').hidden=false; $('endTitle').textContent=t; $('endSub').textContent=s; $('endBtn').textContent=b; }

// ---- HUD / feedback ----
function updateHUD(){
  const st=stage();
  $('stageName').textContent=st.name||'';
  $('candles').innerHTML = Array.from({length:CANDLES},(_,k)=>`<span class="cd ${k<G.candles?'lit':'out'}">🕯️</span>`).join('');
  $('relics').innerHTML = G.relics.map(id=>{ const r=RELICS.find(x=>x.id===id); return r?`<span class="rl" title="${r.name}: ${r.desc}">${r.emoji}</span>`:''; }).join('');
  $('scoreLbl').textContent=G.score; $('metaLbl').textContent=G.meta;
  const pct=G.meta?Math.min(100,100*G.score/G.meta):0;
  $('metaFill').style.width=pct+'%'; $('metaBar').classList.toggle('done',G.score>=G.meta);
  $('rollsLbl').textContent = ('🎲'.repeat(Math.max(0,G.handsLeft))||'—');
}
function showCombo(s, preview){
  const el=$('combo');
  if(!s){ el.classList.remove('show'); return; }
  el.innerHTML=`<b>${s.name}</b> <span class="calc">(${s.chips}) × ${s.mult} = <em>${s.total}</em></span>`+(preview?' <span class="pv">prévia</span>':'');
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
}
function floatPoints(n){ const f=$('float'); f.textContent='+'+n; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
function banner(txt,kind){ const b=$('banner'); b.textContent=txt; b.className='banner '+kind; b.classList.remove('go'); void b.offsetWidth; b.classList.add('go'); }

function beginRun(){ G.candles=CANDLES; G.relics=[]; beginStage(0); }

// ---- boot ----
table = createDiceTable($('c'), onResult);
$('btnRoll').addEventListener('click', startHand);
$('btnReroll').addEventListener('click', doReroll);
$('btnScore').addEventListener('click', doScore);
$('dlg').addEventListener('click', advanceDialogue);
$('endBtn').addEventListener('click', ()=>{ $('end').hidden=true; beginRun(); });
runDialogue(INTRO, beginRun);
