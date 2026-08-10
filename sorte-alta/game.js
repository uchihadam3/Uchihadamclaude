// =============================================================================
// game.js — Controlador do Modo História: pontuação + fases + chefe + diálogo.
// =============================================================================
import { createDiceTable } from './engine3d.js';
import { SPEAKERS, INTRO, OUTRO, STAGES } from './story.js';

const $ = id => document.getElementById(id);

// ---- PONTUAÇÃO: combos (fichas base + mult). score = (fichas + soma) × mult ----
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
  const cnt = {}; values.forEach(v => cnt[v] = (cnt[v]||0)+1);
  const counts = Object.values(cnt).sort((a,b)=>b-a);
  const uniq = Object.keys(cnt).map(Number).sort((a,b)=>a-b);
  const straight = uniq.length===5 && (uniq[4]-uniq[0]===4);
  let key='high';
  if(counts[0]===5) key='quint';
  else if(counts[0]===4) key='quad';
  else if(counts[0]===3 && counts[1]===2) key='full';
  else if(straight) key='straight';
  else if(counts[0]===3) key='trips';
  else if(counts[0]===2 && counts[1]===2) key='twopair';
  else if(counts[0]===2) key='pair';
  const cat = CATS[key];
  const sum = values.reduce((a,b)=>a+b,0);
  const chips = cat.chips + sum, mult = cat.mult;
  return { key, name:cat.name, chips, mult, total:chips*mult, values };
}

// ---- estado ----
const G = { stageIdx:0, score:0, rollsLeft:0, meta:0, phase:'boot', bossMidShown:false };
let table;

// ---- DIÁLOGO ----
let dlgQueue=[], dlgIdx=0, dlgDone=null;
function runDialogue(lines, done){
  if(!lines || !lines.length){ done && done(); return; }
  dlgQueue = lines; dlgIdx = 0; dlgDone = done;
  setRollEnabled(false); $('btn').style.visibility='hidden';
  $('dlg').hidden = false;
  showLine();
}
function showLine(){
  const ln = dlgQueue[dlgIdx]; const sp = SPEAKERS[ln.who] || SPEAKERS.crupie;
  const port = $('dlgPortrait');
  port.style.setProperty('--c', sp.color);
  port.innerHTML = `<span class="pl">${sp.emoji}</span>` +
    (sp.hasArt ? `<img src="${sp.img}" alt="" onerror="this.style.display='none'">` : '');
  $('dlgName').textContent = sp.name; $('dlgName').style.color = sp.color;
  $('dlgText').textContent = ln.text;
}
function advanceDialogue(){
  if($('dlg').hidden) return;
  dlgIdx++;
  if(dlgIdx >= dlgQueue.length){
    $('dlg').hidden = true; $('btn').style.visibility='visible';
    const cb = dlgDone; dlgDone=null; cb && cb();
  } else showLine();
}

// ---- FASES ----
function beginStage(i){
  const st = STAGES[i];
  if(!st){ return runDialogue(OUTRO, gameComplete); }
  Object.assign(G, { stageIdx:i, score:0, rollsLeft:st.rolls, meta:st.meta, bossMidShown:false, phase:'intro' });
  $('table').classList.toggle('boss', st.type==='boss');
  updateHUD(); showCombo(null);
  runDialogue(st.intro, ()=>{ G.phase='play'; setRollEnabled(true); updateHUD(); });
}
function onRollClick(){
  if(G.phase!=='play' || G.rollsLeft<=0 || table.isRolling()) return;
  G.phase='rolling'; setRollEnabled(false); showCombo(null);
  table.roll();
}
function onResult(vals){
  if(G.phase!=='rolling') return;              // ignora a rolagem inicial de posicionamento
  const s = scoreOf(vals);
  G.score += s.total; G.rollsLeft--;
  showCombo(s); floatPoints(s.total); updateHUD();
  const st = STAGES[G.stageIdx];
  // gatilho do chefe ao cruzar 50% da meta
  if(st.type==='boss' && !G.bossMidShown && G.score >= G.meta*0.5 && G.score < G.meta){
    G.bossMidShown = true; G.phase='dialogue';
    return runDialogue(st.mid, resolveRoll);
  }
  resolveRoll();
}
function resolveRoll(){
  const st = STAGES[G.stageIdx];
  if(G.score >= G.meta){
    G.phase='dialogue'; banner('FASE VENCIDA', st.type==='boss'?'boss':'ok');
    runDialogue(st.win, ()=> beginStage(G.stageIdx+1));
  } else if(G.rollsLeft<=0){
    G.phase='dialogue'; banner('SEM ROLAGENS', 'bad');
    runDialogue(st.lose || [{who:'crupie',text:'A Casa fica com você… por ora.'}], gameOver);
  } else {
    G.phase='play'; setRollEnabled(true);
  }
}
function gameOver(){ showEnd('Fim de Jogo', 'A Casa venceu. Mas ela sempre dá outra rodada…', 'Tentar de novo'); }
function gameComplete(){ showEnd('Andar Vencido', 'Você subiu o primeiro andar. O próximo é pior.', 'Jogar de novo'); }
function showEnd(title, sub, btnTxt){
  $('end').hidden=false;
  $('endTitle').textContent=title; $('endSub').textContent=sub; $('endBtn').textContent=btnTxt;
}

// ---- HUD / feedback ----
function setRollEnabled(on){ const b=$('btn'); b.disabled=!on; }
function updateHUD(){
  const st = STAGES[G.stageIdx] || {};
  $('stageName').textContent = st.name || '';
  $('scoreLbl').textContent = G.score;
  $('metaLbl').textContent = G.meta;
  const pct = G.meta ? Math.min(100, 100*G.score/G.meta) : 0;
  $('metaFill').style.width = pct+'%';
  $('metaBar').classList.toggle('done', G.score>=G.meta);
  $('rollsLbl').textContent = '🎲'.repeat(Math.max(0,G.rollsLeft)) || '—';
  const b=$('btn'); b.innerHTML = `🎲 ROLAR<span class="sub">${G.rollsLeft} rolagens</span>`;
}
function showCombo(s){
  const el=$('combo');
  if(!s){ el.classList.remove('show'); return; }
  el.innerHTML = `<b>${s.name}</b> <span class="calc">(${s.chips}) × ${s.mult} = <em>${s.total}</em></span>`;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
}
function floatPoints(n){
  const f=$('float'); f.textContent='+'+n;
  f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
}
function banner(txt, kind){
  const b=$('banner'); b.textContent=txt; b.className='banner '+kind;
  b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}

// ---- boot ----
table = createDiceTable($('c'), onResult);
$('btn').addEventListener('click', onRollClick);
$('dlg').addEventListener('click', advanceDialogue);
$('endBtn').addEventListener('click', ()=>{ $('end').hidden=true; beginStage(0); });
runDialogue(INTRO, ()=> beginStage(0));
