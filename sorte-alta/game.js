// =============================================================================
// game.js — Modo História: pontuação + segurar/rerrolar + fases + chefe + diálogo.
// =============================================================================
import { createDiceTable } from './engine3d.js';
import { SPEAKERS, INTRO, OUTRO, STAGES } from './story.js';

const $ = id => document.getElementById(id);

// ---- PONTUAÇÃO: combos. score = (fichas base + soma dos dados) × mult ----
const CATS = {
  high:    { name:'Nada',        chips:5,   mult:1 },
  pair:    { name:'Par',         chips:10,  mult:2 },
  twopair: { name:'Dois Pares',  chips:20,  mult:2 },
  trips:   { name:'Trinca',      chips:30,  mult:3 },
  straight:{ name:'Sequência',   chips:40,  mult:4 },
  full:    { name:'Full House',  chips:45,  mult:4 },
  quad:    { name:'Quadra',      chips:65,  mult:5 },
  quint:   { name:'Quina!',      chips:100, mult:8 },
};
function scoreOf(values){
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
  const cat=CATS[key]; const sum=values.reduce((a,b)=>a+b,0);
  const chips=cat.chips+sum, mult=cat.mult;
  return { key, name:cat.name, chips, mult, total:chips*mult };
}

const G = { stageIdx:0, score:0, handsLeft:0, rerollsLeft:0, meta:0, phase:'boot', bossMidShown:false, vals:null };
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
    rr.disabled = G.rerollsLeft<=0; rr.innerHTML=`🔁 De novo<span class="sub">${G.rerollsLeft} restantes</span>`;
    sc.disabled=false; hint.hidden=false;
  }
}

// ---- FASES ----
function beginStage(i){
  const st=STAGES[i];
  if(!st){ return runDialogue(OUTRO, gameComplete); }
  Object.assign(G, { stageIdx:i, score:0, handsLeft:st.hands, meta:st.meta, bossMidShown:false, phase:'intro' });
  $('table').classList.toggle('boss', st.type==='boss');
  updateHUD(); showCombo(null);
  runDialogue(st.intro, ()=>{ G.phase='idle'; setButtons('idle'); updateHUD(); });
}
function startHand(){
  if(G.phase!=='idle' || G.handsLeft<=0 || table.isRolling()) return;
  table.clearHeld(); G.rerollsLeft=stage().rerolls||0; G.phase='rolling'; G.vals=null;
  showCombo(null); setButtons('rolling'); table.roll(false);
}
function doReroll(){
  if(G.phase!=='choose' || G.rerollsLeft<=0 || table.isRolling()) return;
  G.rerollsLeft--; G.phase='rolling'; setButtons('rolling'); table.roll(true);
}
function onResult(vals){
  if(G.phase!=='rolling') return;         // ignora a rolagem inicial de posicionamento
  G.vals=vals; G.phase='choose';
  showCombo(scoreOf(vals), true);         // prévia (ainda não pontuou)
  setButtons('choose');
}
function doScore(){
  if(G.phase!=='choose' || !G.vals) return;
  const s=scoreOf(G.vals);
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
    runDialogue(st.win, ()=>beginStage(G.stageIdx+1));
  } else if(G.handsLeft<=0){
    G.phase='dialogue'; banner('SEM MÃOS', 'bad');
    runDialogue(st.lose||[{who:'crupie',text:'A Casa fica com você… por ora.'}], gameOver);
  } else { G.phase='idle'; setButtons('idle'); }
}
function gameOver(){ showEnd('Fim de Jogo','A Casa venceu. Mas ela sempre dá outra rodada…','Tentar de novo'); }
function gameComplete(){ showEnd('Andar Vencido','Você subiu o primeiro andar. O próximo é pior.','Jogar de novo'); }
function showEnd(t,s,b){ $('bar').hidden=true; $('holdHint').hidden=true; $('end').hidden=false; $('endTitle').textContent=t; $('endSub').textContent=s; $('endBtn').textContent=b; }

// ---- HUD / feedback ----
function updateHUD(){
  const st=stage();
  $('stageName').textContent=st.name||'';
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

// ---- entrada: tocar num dado p/ segurar (só na fase de escolha) ----
function onPointerDown(e){
  if(G.phase!=='choose') return;
  const p = e.touches ? e.touches[0] : e;
  const i = table.pick(p.clientX, p.clientY);
  if(i>=0){ table.toggleHeld(i); showCombo(scoreOf(G.vals), true); }
}

// ---- boot ----
table = createDiceTable($('c'), onResult);
$('btnRoll').addEventListener('click', startHand);
$('btnReroll').addEventListener('click', doReroll);
$('btnScore').addEventListener('click', doScore);
$('c').addEventListener('pointerdown', onPointerDown);
$('dlg').addEventListener('click', advanceDialogue);
$('endBtn').addEventListener('click', ()=>{ $('end').hidden=true; beginStage(0); });
runDialogue(INTRO, ()=>beginStage(0));
