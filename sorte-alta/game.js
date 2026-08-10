// =============================================================================
// game.js — Roguelike de dados: MAPA com rotas → encontros (mesa/elite/evento/
// loja) → chefe. Pontuação por combos + relíquias. Velas = vida. Ouro = loja.
// =============================================================================
import { createDiceTable } from './engine3d.js';
import { SPEAKERS, INTRO, OUTRO, BOSS, CANDLES, RELICS } from './story.js';

const $ = id => document.getElementById(id);
const rnd = n => Math.floor(Math.random()*n);
const pick = a => a[rnd(a.length)];
const RELIC = Object.fromEntries(RELICS.map(r=>[r.id,r]));

// ---- PONTUAÇÃO ----
const CATS = {
  high:{name:'Nada',chips:5,mult:1,rank:0}, pair:{name:'Par',chips:10,mult:2,rank:1},
  twopair:{name:'Dois Pares',chips:20,mult:2,rank:2}, trips:{name:'Trinca',chips:30,mult:3,rank:3},
  straight:{name:'Sequência',chips:40,mult:4,rank:4}, full:{name:'Full House',chips:45,mult:4,rank:5},
  quad:{name:'Quadra',chips:65,mult:5,rank:6}, quint:{name:'Quina!',chips:100,mult:8,rank:7},
};
function scoreOf(values, relics=[]){
  const cnt={}; values.forEach(v=>cnt[v]=(cnt[v]||0)+1);
  const counts=Object.values(cnt).sort((a,b)=>b-a);
  const uniq=Object.keys(cnt).map(Number).sort((a,b)=>a-b);
  const straight = uniq.length===5 && (uniq[4]-uniq[0]===4);
  let key='high';
  if(counts[0]===5) key='quint'; else if(counts[0]===4) key='quad';
  else if(counts[0]===3&&counts[1]===2) key='full'; else if(straight) key='straight';
  else if(counts[0]===3) key='trips'; else if(counts[0]===2&&counts[1]===2) key='twopair';
  else if(counts[0]===2) key='pair';
  const cat=CATS[key], sum=values.reduce((a,b)=>a+b,0);
  let chips=cat.chips+sum, mult=cat.mult; const has=id=>relics.includes(id);
  if(has('ganancia'))  chips+=12;
  if(has('espinhos'))  chips+=8;
  if(has('brasa'))     chips+=4*values.filter(v=>v%2===0).length;
  if(has('fome'))      chips+=5*values.filter(v=>v%2===1).length;
  if(has('osso'))      chips+=3*values.filter(v=>v>=5).length;
  if(has('serpente')&&key==='straight') chips+=45;
  if(has('usura')&&sum>=22) chips+=35;
  if(has('olho'))      mult+=1;
  if(has('pressagio') &&cat.rank>=CATS.trips.rank) mult+=3;
  if(has('parsombrio')&&(key==='pair'||key==='twopair')) mult+=2;
  if(has('cranio'))    mult+=2*values.filter(v=>v===6).length;
  if(has('chamadupla')&&cat.rank>=CATS.full.rank) mult*=2;
  return { key, name:cat.name, chips, mult, total:chips*mult };
}

// ---- estado ----
const G = { candles:CANDLES, relics:[], gold:0, map:null, node:null,
  score:0, handsLeft:0, rerollsLeft:0, meta:0, phase:'boot', bossMidShown:false, vals:null };
let table;

// ================= MAPA =================
const LAYERS = 4;                                   // andares antes do chefe
function makeNode(layer, idx, count, type){
  const depth = layer;                              // 0..LAYERS-1
  const elite = type==='elite';
  const base = 130 + depth*70;                      // metas sobem com a profundidade (mais difícil)
  return { id:`n${layer}_${idx}`, layer, idx, type, xr:(idx+1)/(count+1),
    meta: Math.round(base*(elite?1.5:1)), hands: elite?3:3, rerolls:1, conns:[], done:false };
}
function generateMap(){
  const layers=[];
  for(let l=0;l<LAYERS;l++){
    const count = l===0 ? 2 : (2 + (Math.random()<0.5?1:0));
    const nodes=[];
    for(let i=0;i<count;i++){
      let type='meta';
      if(l>0){
        const r=Math.random();
        type = r<0.42?'meta' : r<0.60?'elite' : r<0.82?'evento' : 'loja';
      }
      nodes.push(makeNode(l,i,count,type));
    }
    layers.push(nodes);
  }
  // garante ao menos 1 loja no mapa
  if(!layers.flat().some(n=>n.type==='loja')){ const mid=layers[LAYERS-1]; pick(mid).type='loja'; }
  // conexões: cada nó liga a 1-2 nós próximos da próxima camada
  for(let l=0;l<LAYERS-1;l++){
    const cur=layers[l], nxt=layers[l+1];
    cur.forEach((n,i)=>{
      const near = nxt.map((m,j)=>({m,j})).sort((a,b)=>Math.abs(a.j/nxt.length-i/cur.length)-Math.abs(b.j/nxt.length-i/cur.length));
      const k = 1 + (Math.random()<0.5?1:0);
      n.conns = [...new Set(near.slice(0,k).map(x=>x.m.id))];
    });
    // garante que todo nó da próxima camada tenha ao menos 1 entrada
    nxt.forEach((m,j)=>{ if(!cur.some(n=>n.conns.includes(m.id))){ cur[Math.min(j,cur.length-1)].conns.push(m.id); } });
  }
  const boss = { id:'boss', layer:LAYERS, type:'chefe', xr:0.5, ...BOSS, done:false, conns:[] };
  layers[LAYERS-1].forEach(n=> n.conns=['boss']);
  return { layers, boss, available:new Set(layers[0].map(n=>n.id)) };
}
function nodeById(id){ if(id==='boss') return G.map.boss; for(const l of G.map.layers) for(const n of l) if(n.id===id) return n; return null; }
const NODE_ICON = { meta:'🎲', elite:'☠️', evento:'❓', loja:'🛒', chefe:'👹' };
const NODE_NAME = { meta:'Mesa', elite:'Mesa Maldita', evento:'Evento', loja:'Loja', chefe:'O Apostador' };

function showMap(){
  G.phase='map'; $('bar').hidden=true; $('holdHint').hidden=true; showCombo(null);
  $('stageName').textContent='O caminho para cima'; $('scoreLbl').textContent='—'; $('metaLbl').textContent='—';
  $('metaFill').style.width='0%'; $('rollsLbl').textContent=''; updateHUD();
  const rows = [[G.map.boss], ...[...G.map.layers].reverse()];  // topo = chefe, base = início
  const H = rows.length;
  const pos = {};
  rows.forEach((row,ri)=>{ const y = 8 + (H-1-ri)*(84/(H-1)); row.forEach(n=>{ pos[n.id]={x:n.xr*100,y}; }); });
  let lines='';
  for(const l of G.map.layers) for(const n of l) for(const c of n.conns){
    const a=pos[n.id], b=pos[c]; if(a&&b) lines+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#ffffff26" stroke-width="0.6"/>`;
  }
  let nodes='';
  for(const n of [...G.map.layers.flat(), G.map.boss]){
    const p=pos[n.id]; if(!p) continue;
    const avail=G.map.available.has(n.id);
    const cls = n.done?'done':(avail?'avail':'lock');
    nodes+=`<button class="mnode ${cls} t-${n.type}" style="left:${p.x}%;top:${p.y}%" data-id="${n.id}" ${avail?'':'disabled'}>
      <span class="mn-ic">${NODE_ICON[n.type]}</span><span class="mn-nm">${NODE_NAME[n.type]}</span></button>`;
  }
  $('mapLines').innerHTML = lines;
  $('mapNodes').innerHTML = nodes;
  $('map').hidden=false;
  $('mapNodes').querySelectorAll('.mnode.avail').forEach(b=> b.onclick=()=>enterNode(nodeById(b.dataset.id)));
}
function enterNode(node){
  if(!node || !G.map.available.has(node.id)) return;
  $('map').hidden=true; G.node=node;
  if(node.type==='loja') return openShop(node);
  if(node.type==='evento') return openEvent(node);
  startEncounter(node);   // meta / elite / chefe
}
function completeNode(node){
  node.done=true;
  if(node.type==='chefe'){ return runDialogue(OUTRO, gameComplete); }
  G.map.available = new Set(node.conns);
  showMap();
}

// ================= ENCONTRO (pontuação) =================
function startEncounter(node){
  const boss = node.type==='chefe';
  let rr = node.rerolls + (G.relics.includes('sorte')?1:0);
  Object.assign(G, { score:0, handsLeft:node.hands, rerollsLeft:rr, meta:node.meta, bossMidShown:false, phase:'intro' });
  $('table').classList.toggle('boss', boss);
  updateHUD(); showCombo(null);
  const intro = boss ? BOSS.intro : (node.type==='elite'?[{who:'crupie',text:'Esta mesa está amaldiçoada. A meta é cruel — mas paga bem.'}]:null);
  runDialogue(intro, ()=>{ G.phase='idle'; setButtons('idle'); updateHUD(); });
}
function startHand(){
  if(G.phase!=='idle'||G.handsLeft<=0||table.isRolling()) return;
  table.clearHeld(); G.phase='rolling'; G.vals=null; showCombo(null); setButtons('rolling'); table.roll(false);
}
function doReroll(){
  if(G.phase!=='choose'||G.rerollsLeft<=0||table.isRolling()) return;
  G.rerollsLeft--; G.phase='rolling'; setButtons('rolling'); table.roll(false);
}
function onResult(vals){
  if(G.phase!=='rolling') return;
  G.vals=vals; G.phase='choose'; setButtons('choose');   // SEM prévia: o jogador lê os dados
}
// ---- decomposição da pontuação p/ animar em "beats" (estilo Balatro) ----
function scoreBreakdown(values, relics){
  const cnt={}; values.forEach(v=>cnt[v]=(cnt[v]||0)+1);
  const counts=Object.values(cnt).sort((a,b)=>b-a);
  const uniq=Object.keys(cnt).map(Number).sort((a,b)=>a-b);
  const straight=uniq.length===5&&(uniq[4]-uniq[0]===4);
  let key='high';
  if(counts[0]===5)key='quint'; else if(counts[0]===4)key='quad';
  else if(counts[0]===3&&counts[1]===2)key='full'; else if(straight)key='straight';
  else if(counts[0]===3)key='trips'; else if(counts[0]===2&&counts[1]===2)key='twopair';
  else if(counts[0]===2)key='pair';
  const cat=CATS[key], sum=values.reduce((a,b)=>a+b,0), has=id=>relics.includes(id);
  const chipBeats=[], multBeats=[];
  if(has('espinhos')) chipBeats.push({label:'Espinhos',amount:8});
  if(has('ganancia')) chipBeats.push({label:'Ganância',amount:12});
  const ev=values.filter(v=>v%2===0).length; if(has('brasa')&&ev) chipBeats.push({label:'Brasa',amount:4*ev});
  const od=values.filter(v=>v%2===1).length; if(has('fome')&&od) chipBeats.push({label:'Fome',amount:5*od});
  const hi=values.filter(v=>v>=5).length; if(has('osso')&&hi) chipBeats.push({label:'Osso',amount:3*hi});
  if(has('serpente')&&key==='straight') chipBeats.push({label:'Serpente',amount:45});
  if(has('usura')&&sum>=22) chipBeats.push({label:'Usura',amount:35});
  if(has('olho')) multBeats.push({label:'Olho',op:'+',amount:1});
  if(has('pressagio')&&cat.rank>=CATS.trips.rank) multBeats.push({label:'Presságio',op:'+',amount:3});
  if(has('parsombrio')&&(key==='pair'||key==='twopair')) multBeats.push({label:'Par Sombrio',op:'+',amount:2});
  const sx=values.filter(v=>v===6).length; if(has('cranio')&&sx) multBeats.push({label:'Crânio',op:'+',amount:2*sx});
  if(has('chamadupla')&&cat.rank>=CATS.full.rank) multBeats.push({label:'Chama Dupla',op:'×',amount:2});
  return { name:cat.name, baseChips:cat.chips, baseMult:cat.mult, dicePips:values.slice(), chipBeats, multBeats };
}
const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function doScore(){
  if(G.phase!=='choose'||!G.vals) return;
  G.phase='scoring'; $('bar').hidden=true; $('holdHint').hidden=true;
  const total = await animateScore(scoreBreakdown(G.vals,G.relics));
  G.score+=total; G.handsLeft--; table.clearHeld(); updateHUD();
  $('scoreShow').hidden=true;
  const boss=G.node.type==='chefe';
  if(boss && !G.bossMidShown && G.score>=G.meta*0.5 && G.score<G.meta){ G.bossMidShown=true; G.phase='dialogue'; return runDialogue(BOSS.mid,resolveHand); }
  resolveHand();
}
async function animateScore(bd){
  let chips=bd.baseChips, mult=bd.baseMult;
  $('ssName').textContent=bd.name; setSS(chips,mult); $('ssTotal').textContent=''; $('scoreShow').hidden=false;
  let iv=520;                                   // acelera: 1ª lenta → vai ficando rápido
  const beat = fn => { fn(); };
  await sleep(340);
  for(let i=0;i<bd.dicePips.length;i++){ table.flashDie(i); chips+=bd.dicePips[i]; setSS(chips,mult,'c'); await sleep(iv); iv=Math.max(95,iv*0.74); }
  for(const cb of bd.chipBeats){ chips+=cb.amount; setSS(chips,mult,'c'); ssLabel('+'+cb.amount+' '+cb.label); await sleep(Math.max(150,iv)); iv=Math.max(95,iv*0.8); }
  for(const mb of bd.multBeats){ mult = mb.op==='×'?mult*mb.amount:mult+mb.amount; setSS(chips,mult,'m'); ssLabel((mb.op==='×'?'×':'+')+mb.amount+' '+mb.label); await sleep(Math.max(170,iv)); iv=Math.max(95,iv*0.8); }
  await sleep(240);
  const total=chips*mult; $('ssTotal').textContent='= '+total; $('ssTotal').classList.remove('go'); void $('ssTotal').offsetWidth; $('ssTotal').classList.add('go');
  floatPoints(total); await sleep(760);
  return total;
}
function setSS(chips,mult,pop){
  const c=$('ssChips'), m=$('ssMult');
  c.textContent=chips; m.textContent=mult;
  if(pop==='c'){ c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  if(pop==='m'){ m.classList.remove('pop'); void m.offsetWidth; m.classList.add('pop'); }
}
function ssLabel(txt){ const l=$('ssLabel'); l.textContent=txt; l.classList.remove('go'); void l.offsetWidth; l.classList.add('go'); }
function resolveHand(){
  if(G.score>=G.meta) return winEncounter();
  if(G.handsLeft<=0){
    G.candles--; updateHUD(); G.phase='dialogue';
    if(G.candles>0){ banner('VELA APAGADA','bad'); runDialogue([{who:'crupie',text:'Uma vela se apaga… encare esta mesa de novo.'}], ()=>retryEncounter()); }
    else { banner('SEM VELAS','bad'); runDialogue(G.node.type==='chefe'?BOSS.lose:[{who:'crupie',text:'A última chama morre. A Casa fica com você.'}], gameOver); }
  } else { G.phase='idle'; setButtons('idle'); }
}
function retryEncounter(){
  const n=G.node; let rr=n.rerolls+(G.relics.includes('sorte')?1:0);
  Object.assign(G,{score:0,handsLeft:n.hands,rerollsLeft:rr,bossMidShown:false,phase:'idle'});
  table.clearHeld(); showCombo(null); updateHUD(); setButtons('idle');
}
function winEncounter(){
  const n=G.node, boss=n.type==='chefe';
  const reward = (n.type==='elite'?9:5) + n.layer*2 + (G.relics.includes('avareza')?3:0);
  G.gold += reward; updateHUD();
  G.phase='dialogue'; banner('MESA VENCIDA', boss?'boss':'ok');
  const after = ()=>{
    if(boss) return completeNode(n);
    if(n.type==='elite') return showReward(1, ()=>completeNode(n));  // elite dá relíquia grátis
    completeNode(n);
  };
  runDialogue(boss?BOSS.win:[{who:'crupie',text:`+${reward} ouro. Escolha seu próximo passo.`}], after);
}

// ================= RECOMPENSA / LOJA / EVENTO =================
function relicCard(r, extra=''){ return `<button class="rw r-${r.rarity}" data-id="${r.id}">
  <span class="rw-ic">${r.emoji}</span><span class="rw-t"><b>${r.name} <em>${r.rarity}</em></b><small>${r.desc}</small></span>${extra}</button>`; }
function offerRelics(n){ const av=RELICS.filter(r=>!G.relics.includes(r.id)); const pool=av.slice(),out=[]; while(out.length<n&&pool.length) out.push(pool.splice(rnd(pool.length),1)[0]); return out; }
function showReward(count, done){
  const offer=offerRelics(3); if(!offer.length){ done(); return; }
  $('reward').hidden=false; $('rewardTitle').textContent='Escolha uma Relíquia';
  $('rewardCards').innerHTML=offer.map(r=>relicCard(r)).join('');
  $('rewardCards').querySelectorAll('.rw').forEach(btn=>btn.onclick=()=>{ G.relics.push(btn.dataset.id); $('reward').hidden=true; updateHUD(); done(); });
}
const RARITY_COST={comum:4,raro:7,lendario:11};
function openShop(node){
  const draw=()=>{
    const offer=offerRelics(3);
    $('reward').hidden=false; $('rewardTitle').textContent=`🛒 Loja — ${G.gold} ouro`;
    $('rewardCards').innerHTML = offer.map(r=>relicCard(r,`<span class="rw-cost">🪙${RARITY_COST[r.rarity]}</span>`)).join('')
      + `<button class="rw leave" id="shopLeave"><span class="rw-ic">➡️</span><span class="rw-t"><b>Sair da Loja</b><small>Seguir no mapa.</small></span></button>`;
    $('rewardCards').querySelectorAll('.rw[data-id]').forEach(btn=>btn.onclick=()=>{
      const r=RELIC[btn.dataset.id], cost=RARITY_COST[r.rarity];
      if(G.gold<cost){ btn.classList.add('nope'); setTimeout(()=>btn.classList.remove('nope'),300); return; }
      G.gold-=cost; G.relics.push(r.id); updateHUD(); draw();   // redesenha com novas ofertas
    });
    $('shopLeave').onclick=()=>{ $('reward').hidden=true; completeNode(node); };
  };
  draw();
}
const EVENTS = [
  { text:'Um altar de ossos pulsa no escuro. Ele pede sangue por poder.', opts:[
    { label:'🩸 Sacrificar 1 vela → relíquia', run:(done)=>{ if(G.candles>1){ G.candles--; updateHUD(); showReward(1,done); } else done(); } },
    { label:'🚪 Ignorar', run:(done)=>done() } ] },
  { text:'Uma bolsa esquecida jaz na mesa. Pesada de moedas.', opts:[
    { label:'🪙 Pegar +12 ouro', run:(done)=>{ G.gold+=12; updateHUD(); done(); } },
    { label:'🎲 Apostar (50%: +30 / nada)', run:(done)=>{ if(Math.random()<0.5) G.gold+=30; updateHUD(); done(); } } ] },
  { text:'O Crupiê sorri e oferece um trato silencioso.', opts:[
    { label:'💰 Pagar 8 ouro → relíquia', run:(done)=>{ if(G.gold>=8){ G.gold-=8; updateHUD(); showReward(1,done); } else done(); } },
    { label:'🕯️ Pagar 10 ouro → +1 vela', run:(done)=>{ if(G.gold>=10&&G.candles<CANDLES){ G.gold-=10; G.candles++; updateHUD(); } done(); } },
    { label:'🚪 Recusar', run:(done)=>done() } ] },
];
function openEvent(node){
  const ev=pick(EVENTS);
  $('reward').hidden=false; $('rewardTitle').textContent='❓ Evento';
  $('rewardCards').innerHTML = `<p class="ev-text">${ev.text}</p>` + ev.opts.map((o,i)=>
    `<button class="rw ev" data-i="${i}"><span class="rw-t"><b>${o.label}</b></span></button>`).join('');
  const finish=()=>{ $('reward').hidden=true; completeNode(node); };
  $('rewardCards').querySelectorAll('.rw.ev').forEach(btn=>btn.onclick=()=>{ ev.opts[+btn.dataset.i].run(finish); });
}

// ================= DIÁLOGO =================
let dlgQueue=[], dlgIdx=0, dlgDone=null;
function runDialogue(lines, done){
  if(!lines||!lines.length){ done&&done(); return; }
  dlgQueue=lines; dlgIdx=0; dlgDone=done; $('bar').hidden=true; $('holdHint').hidden=true; $('dlg').hidden=false; showLine();
}
function showLine(){ const ln=dlgQueue[dlgIdx], sp=SPEAKERS[ln.who]||SPEAKERS.crupie; const port=$('dlgPortrait');
  port.style.setProperty('--c',sp.color); port.innerHTML=`<span class="pl">${sp.emoji}</span>`+(sp.hasArt?`<img src="${sp.img}" onerror="this.style.display='none'">`:'');
  $('dlgName').textContent=sp.name; $('dlgName').style.color=sp.color; $('dlgText').textContent=ln.text; }
function advanceDialogue(){ if($('dlg').hidden) return; dlgIdx++;
  if(dlgIdx>=dlgQueue.length){ $('dlg').hidden=true; const cb=dlgDone; dlgDone=null; cb&&cb(); } else showLine(); }

// ================= BOTÕES / HUD =================
function setButtons(mode){
  const roll=$('btnRoll'),rr=$('btnReroll'),sc=$('btnScore'),hint=$('holdHint');
  $('bar').hidden=false; const show=(el,on)=>{el.hidden=!on;};
  if(mode==='idle'){ show(roll,true);show(rr,false);show(sc,false);hint.hidden=true;roll.disabled=false; }
  else if(mode==='rolling'){ show(roll,false);show(rr,true);show(sc,true);rr.disabled=true;sc.disabled=true;hint.hidden=true; }
  else if(mode==='choose'){ show(roll,false);show(rr,true);show(sc,true);
    rr.disabled=G.rerollsLeft<=0; rr.innerHTML=`🔁 Rerrolar tudo<span class="sub">${G.rerollsLeft} restantes</span>`; sc.disabled=false; hint.hidden=true; }
}
function updateHUD(){
  $('candles').innerHTML=Array.from({length:CANDLES},(_,k)=>`<span class="cd ${k<G.candles?'lit':'out'}">🕯️</span>`).join('')+`<span class="gold">🪙${G.gold}</span>`;
  $('relics').innerHTML=G.relics.map(id=>{const r=RELIC[id];return r?`<span class="rl r-${r.rarity}" title="${r.name}: ${r.desc}">${r.emoji}</span>`:'';}).join('');
  if(G.phase!=='map'){
    $('stageName').textContent = G.node ? (NODE_NAME[G.node.type]||'') : '';
    $('scoreLbl').textContent=G.score; $('metaLbl').textContent=G.meta;
    const pct=G.meta?Math.min(100,100*G.score/G.meta):0; $('metaFill').style.width=pct+'%';
    $('metaBar').classList.toggle('done',G.score>=G.meta);
    $('rollsLbl').textContent=('🎲'.repeat(Math.max(0,G.handsLeft))||'—');
  }
}
function showCombo(s,preview){ const el=$('combo'); if(!s){el.classList.remove('show');return;}
  el.innerHTML=`<b>${s.name}</b> <span class="calc">(${s.chips}) × ${s.mult} = <em>${s.total}</em></span>`+(preview?' <span class="pv">prévia</span>':'');
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); }
function floatPoints(n){ const f=$('float'); f.textContent='+'+n; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
function banner(txt,kind){ const b=$('banner'); b.textContent=txt; b.className='banner '+kind; b.classList.remove('go'); void b.offsetWidth; b.classList.add('go'); }

// ================= FIM =================
function gameOver(){ showEnd('Fim de Jogo','A Casa venceu. Mas ela sempre dá outra rodada…','Tentar de novo'); }
function gameComplete(){ showEnd('Andar Vencido','Você subiu o primeiro andar. O próximo é pior.','Jogar de novo'); }
function showEnd(t,s,btn){ $('bar').hidden=true;$('holdHint').hidden=true;$('map').hidden=true;$('reward').hidden=true;
  $('end').hidden=false;$('endTitle').textContent=t;$('endSub').textContent=s;$('endBtn').textContent=btn; }

// ================= BOOT =================
function beginRun(){ G.candles=CANDLES; G.relics=[]; G.gold=0; G.map=generateMap(); runDialogue(INTRO, showMap); }
table=createDiceTable($('c'), onResult);
$('btnRoll').addEventListener('click', startHand);
$('btnReroll').addEventListener('click', doReroll);
$('btnScore').addEventListener('click', doScore);
$('dlg').addEventListener('click', advanceDialogue);
$('endBtn').addEventListener('click', ()=>{ $('end').hidden=true; beginRun(); });
beginRun();
