'use strict';
/* ===========================================================================
   TORRE DE OSSOS — A Ascensão
   RPG idle/auto-battler em ASCII animado (estilo Stone Story), original.
   Renderiza um buffer de caracteres para <canvas> com bloom verde/CRT.
   =========================================================================== */

const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const flash = document.getElementById('flash');

/* ---------- grade lógica de caracteres ---------- */
const COLS = 104, ROWS = 34;
let buf = new Array(COLS * ROWS);
function clearBuf(){ for (let i=0;i<buf.length;i++) buf[i] = 0; }        // 0 = vazio
function put(x,y,ch,b,c){ if(ch===' '||ch==null) return; x|=0; y|=0; if(x<0||y<0||x>=COLS||y>=ROWS) return; buf[y*COLS+x] = {ch,b:b==null?1:b,c:c||0}; }
function text(x,y,s,b,c){ for(let i=0;i<s.length;i++) put(x+i,y,s[i],b,c); }
function sprite(x,y,lines,b,c,flip){
  for(let r=0;r<lines.length;r++){ const ln=lines[r];
    for(let col=0;col<ln.length;col++){ const ch=ln[col]; if(ch===' ')continue;
      put(x+(flip?ln.length-1-col:col), y+r, flip?flipChar(ch):ch, b, c); } }
}
function flipChar(ch){ return ({'(':')',')':'(','/':'\\','\\':'/','<':'>','>':'<','[':']',']':'[','{':'}','}':'{','d':'b','b':'d'})[ch]||ch; }

/* ---------- cores (índice) ---------- */
const COL = ['#e8f2e8','#4fd06a','#d06a6a','#d9c56a','#7d987d','#a9c8ff']; // 0 branco 1 verde 2 vermelho 3 ouro 4 cinza 5 azul

/* ---------- render p/ canvas ---------- */
let cellW, cellH, offX, offY, fpx, dpr;
const CHAR_AR = 1.85;                            // altura/largura do caractere
function resize(){
  dpr = Math.min(2, window.devicePixelRatio||1);
  const W = cv.clientWidth, H = cv.clientHeight;
  cv.width = W*dpr; cv.height = H*dpr;
  const padBottom = 96*dpr;                      // espaço pros botões embaixo
  const availH = (H*dpr) - padBottom;
  cellW = Math.min((W*dpr)/COLS, availH/ROWS/CHAR_AR);
  cellH = cellW*CHAR_AR;
  const gw = cellW*COLS, gh = cellH*ROWS;
  offX = (W*dpr-gw)/2;
  offY = Math.max(0,(availH-gh)/2);             // topo da área útil, acima dos botões
  fpx = Math.floor(cellH*0.98);
}
window.addEventListener('resize', resize);

function render(){
  const W=cv.width, H=cv.height;
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  ctx.textBaseline='top'; ctx.font = fpx+"px 'Courier New',monospace";
  for(let i=0;i<buf.length;i++){ const cell=buf[i]; if(!cell) continue;
    const x=i%COLS, y=(i/COLS)|0;
    ctx.globalAlpha = cell.b;
    ctx.fillStyle = COL[cell.c]||COL[0];
    ctx.fillText(cell.ch, offX + x*cellW, offY + y*cellH);
  }
  ctx.globalAlpha=1;
  // bloom
  ctx.save(); ctx.globalAlpha=0.45; ctx.globalCompositeOperation='lighter'; ctx.filter='blur(2px)';
  ctx.drawImage(cv,0,0); ctx.restore(); ctx.filter='none'; ctx.globalCompositeOperation='source-over';
  // scanlines + vinheta
  ctx.globalAlpha=0.06; ctx.fillStyle='#000';
  for(let y=0;y<H;y+=Math.max(2,cellH*0.5)) ctx.fillRect(0,y,W,1);
  ctx.globalAlpha=1;
  const g=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H*0.5,H*0.85);
  g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,0.65)');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
}

/* =========================================================================
   ARTE ASCII (original)
   ========================================================================= */
const HERO = {
  idle: [
    "  __",
    " /..\\",
    " \\--/|",
    "/|##|+---",
    " |##| ",
    " |  | ",
    "_/  \\_" ],
  walk: [
    "  __",
    " /..\\",
    " \\--/|",
    "/|##|+---",
    " |##| ",
    " /  \\ ",
    "_|  |_" ],
  atk: [
    "  __      *",
    " /..\\    /",
    " \\--/|  /",
    "/|##|+-*",
    " |##| ",
    " |  | ",
    "_/  \\_" ],
  hurt: [
    "  __",
    " /xx\\",
    " \\--/|",
    "/|##|+---",
    " |##| ",
    " |  | ",
    "_/  \\_" ],
};
const ENEMIES = {
  lodo:   { name:'Lodo Pálido', hp:14, atk:4, xp:6,  gold:4,  art:["      ","  .-~-.","( o  o )"," `~-~-' "] },
  morcego:{ name:'Morcego Cavo', hp:12, atk:5, xp:7, gold:5, art:[" /\\_/\\ ","( o o )"," >   < "," ^   ^ "] },
  caveira:{ name:'Caveira Errante', hp:20, atk:6, xp:10, gold:8, art:["  ,--.","  (oo)","  /||\\"," / || \\","  /  \\ "] },
  aranha: { name:'Aranha de Cinza', hp:18, atk:7, xp:11, gold:9, art:[" , , , ","\\.\\|/./"," >(oo)< ","/'/|\\'\\"," ' ' ' "] },
  espectro:{name:'Espectro Frio', hp:26, atk:8, xp:14, gold:12, art:["  ___ "," /o o\\"," | ~ | "," \\   / ","  ~V~  "] },
  golem:  { name:'GOLEM DE PEDRA', hp:70, atk:12, xp:60, gold:60, boss:true, art:[
    " [======] "," [|O  O|] "," [| -- |] ","[||    ||]"," [|_||_|] "," /_|  |_\\ "] },
  liche:  { name:'LICHE DE OSSO', hp:95, atk:15, xp:90, gold:90, boss:true, art:[
    "   /\\   ","  (##)  "," /(oo)\\ ","  |==|  "," _|::|_ ","/ |::| \\"," /|  |\\ "] },
};
const ZONES = [
  { name:'Campo dos Caídos', deco:'tomb',  enemies:['lodo','morcego','caveira'] },
  { name:'Cripta Baixa',     deco:'bones', enemies:['caveira','aranha','morcego'] },
  { name:'Cavernas Ocas',    deco:'stal',  enemies:['aranha','espectro','lodo'] },
  { name:'Escada de Pedra',  deco:'tower', enemies:['espectro','caveira','aranha'] },
  { name:'Alto da Torre',    deco:'tower', enemies:['espectro','aranha','caveira'] },
];

/* ---------- cenário procedural ---------- */
const GROUND_Y = ROWS-6;
let stars=[]; for(let i=0;i<48;i++) stars.push({x:Math.random()*COLS,y:Math.random()*(GROUND_Y-8),t:Math.random()*6});
let clouds=[]; for(let i=0;i<4;i++) clouds.push({x:Math.random()*COLS,y:2+Math.random()*6,s:0.2+Math.random()*0.3});

function drawSky(t){
  // estrelas
  for(const s of stars){ const tw=0.3+0.5*(0.5+0.5*Math.sin(t*1.5+s.t)); put(s.x, s.y, '·', tw*0.6, 4); }
  // lua crescente
  const mx=COLS-20, my=4;
  const moon=[" .-. "," /  \\","(   |"," \\  /","  '-'"];
  sprite(mx,my,moon,0.5,0);
  put(mx+3,my+1,')',0.05,0); put(mx+3,my+2,')',0.05,0); // recorte do crescente
  // nuvens
  for(const c of clouds){ c.x += c.s*0.06; if(c.x>COLS+8) c.x=-10;
    text(Math.round(c.x), Math.round(c.y), ".-~~-.", 0.28, 4);
    text(Math.round(c.x)+2, Math.round(c.y)+1, "(____)", 0.22, 4); }
}
function drawTowerBg(scroll){
  // cidade de torres ao fundo (parallax lento) — preenche o céu
  const span=30, base = Math.round(-(scroll*0.14)%span);
  for(let k=-1;k<Math.ceil(COLS/span)+2;k++){
    const bx = base + k*span; if(bx<-12||bx>COLS+2) continue;
    const seed=((k%7)+7)%7;
    const th = 14 + seed*3;                       // torres altas
    const w = 7;
    for(let r=0;r<th;r++){ const y=GROUND_Y-1-r; if(y<1)break;
      const patt = (r%3===0)?"|#| |#|":(r%3===1?"|#####|":"|# # #|");
      text(bx, y, patt, 0.10+ (r<2?0.03:0), 4); }
    text(bx-1, GROUND_Y-th, "/#####\\", 0.13, 4);
    text(bx, GROUND_Y-th-1, "^ ^ ^", 0.13, 4);
    // janelinha acesa ocasional
    if(seed%3===0) put(bx+3, GROUND_Y-4-(seed%5), '¤', 0.5, 3);
    void w;
  }
}
function drawGround(scroll,zone){
  const off = Math.round(scroll)%2;
  for(let x=0;x<COLS;x++){
    const gx = x+Math.round(scroll);
    put(x, GROUND_Y, ((gx)%6===0)?',':((gx)%3===0?'.':'_'), 0.35, 4);
    for(let r=1;r<5;r++) put(x, GROUND_Y+r, (((gx*7+r*13)%9===0)?'.':' '), 0.12, 4);
  }
  // decoração da zona (parallax médio)
  const dscroll = scroll*0.6;
  for(let i=0;i<8;i++){
    let dx = Math.round(i*17 - dscroll%(17*8)); dx=((dx%(COLS+20))+(COLS+20))%(COLS+20)-10;
    const dy = GROUND_Y-2;
    if(zone.deco==='tomb'){ sprite(dx,dy-1,[" _ ","|R|","|_|"],0.3,4); }
    else if(zone.deco==='bones'){ sprite(dx,dy,["\\o/"," | "],0.25,4); }
    else if(zone.deco==='stal'){ sprite(dx,1,["\\/","|" ],0.2,4); sprite(dx+4,dy,["/\\"],0.25,4); }
    else { text(dx,dy-1,"[]",0.22,4); text(dx,dy,"||",0.22,4); }
  }
}

/* =========================================================================
   ESTADO DO JOGO
   ========================================================================= */
let G;
function newGame(){
  G = {
    state:'title', t:0, scroll:0,
    hero:{ hp:60,max:60,atk:9,lvl:1,xp:0,xpNext:16, gold:0, x:14, anim:'idle', animT:0, hurtT:0, lungeT:0 },
    pot:3, potMax:5,
    zoneI:0, floor:1, kills:0, encounters:0,
    phase:'walk', walkGoal:15, walkDone:0,
    enemy:null, enemyX:0, spawnT:0,
    heroAtkT:0.9, enemyAtkT:1.4,
    strikeCd:0, floats:[], msg:null, msgT:0,
    dead:false, deathStats:null,
  };
}
newGame();

const ATK_INT=0.95, ENEMY_BASE_INT=1.4;

function currentZone(){ return ZONES[G.zoneI % ZONES.length]; }
function scaleMul(){ return 1 + (G.floor-1)*0.28; }   // dificuldade sobe por andar

function spawnEnemy(){
  const z=currentZone();
  G.encounters++;
  const boss = (G.encounters % 6 === 0);
  let key;
  if(boss){ key = (G.floor%2===0)?'liche':'golem'; }
  else key = z.enemies[Math.floor(Math.random()*z.enemies.length)];
  const base=ENEMIES[key]; const m=scaleMul();
  G.enemy = {
    key, name:base.name, art:base.art, boss:!!base.boss,
    hp:Math.round(base.hp*m), max:Math.round(base.hp*m),
    atk:Math.round(base.atk*m), xp:Math.round(base.xp*m), gold:Math.round(base.gold*(1+ (G.floor-1)*0.2)),
    hurtT:0, dieT:0,
  };
  G.enemyX = COLS-24;
  G.enemyAtkT = base.boss? 2.2 : ENEMY_BASE_INT;
  G.heroAtkT = 0.6;
  G.phase='fight';
  say((boss?'⚔ CHEFE — ':'')+base.name);
}
function say(s,dur){ G.msg=s; G.msgT=dur||2.2; }

function floatText(x,y,s,c){ G.floats.push({x,y,s,c,life:1.1}); }

function heroAttack(power){
  if(!G.enemy||G.enemy.dieT>0) return;
  G.hero.anim='atk'; G.hero.animT=0.28; G.hero.lungeT=0.2;
  const dmg = Math.max(1, Math.round(G.hero.atk*(power||1) * (0.85+Math.random()*0.4)));
  G.enemy.hp -= dmg; G.enemy.hurtT=0.18;
  floatText(G.enemyX+3, 9, '-'+dmg, power>1?3:0);
  sfx(power>1?200:340, 0.09, 'square', power>1?70:180);
  if(power>1){ doFlash(0.5); shake(6); }
  if(G.enemy.hp<=0){ killEnemy(); }
}
function killEnemy(){
  const e=G.enemy; e.dieT=0.55; e.hp=0;
  G.hero.gold += e.gold; G.hero.xp += e.xp; G.kills++;
  floatText(G.enemyX+2, 12, '+'+e.gold+'g', 3);
  sfx(120,0.25,'sawtooth',40);
  // level up
  while(G.hero.xp>=G.hero.xpNext){ levelUp(); }
  if(e.boss){ G.floor++; G.zoneI++; say('▲ ANDAR '+G.floor+' — '+currentZone().name, 3); doFlash(0.3);
    if(Math.random()<0.8 && G.pot<G.potMax){ G.pot++; } }
}
function levelUp(){
  const h=G.hero; h.xp-=h.xpNext; h.lvl++; h.xpNext=Math.round(h.xpNext*1.35+6);
  h.max+=10; h.hp=h.max; h.atk+=3;
  say('✦ NÍVEL '+h.lvl+' ✦',2.4); doFlash(0.4); floatText(G.hero.x+3,9,'LVL UP',1);
  sfx(523,0.2,'triangle'); setTimeout(()=>sfx(784,0.22,'triangle'),110);
}
function heroTakeHit(dmg){
  G.hero.hp -= dmg; G.hero.hurtT=0.25; G.hero.anim='hurt'; G.hero.animT=0.25;
  floatText(G.hero.x+2, 9, '-'+dmg, 2); sfx(140,0.12,'square',60); shake(5);
  if(G.hero.hp<=0){ die(); }
}
function die(){
  G.hero.hp=0; G.state='dead';
  G.deathStats = 'Andar '+G.floor+' · Nível '+G.hero.lvl+' · '+G.kills+' abatidos · '+G.hero.gold+' ouro';
  document.getElementById('goStats').textContent = G.deathStats;
  document.getElementById('over').classList.remove('hidden');
  sfx(200,0.5,'sine',60);
}
function reviveRun(){
  document.getElementById('over').classList.add('hidden');
  G.hero.hp=G.hero.max; G.enemy=null; G.phase='walk'; G.walkDone=0; G.walkGoal=30;
  G.pot=Math.min(G.potMax,G.pot+1); G.state='play'; say('Ergueste-te das cinzas…',2.5);
}

/* ---------- ações do jogador ---------- */
function doStrike(){
  if(G.state!=='play') return;
  if(G.strikeCd>0){ sfx(120,0.05,'sine'); return; }
  G.strikeCd=3.6;
  if(G.phase==='fight' && G.enemy && G.enemy.dieT<=0) heroAttack(2.6);
  else { G.walkDone += 6; sfx(300,0.06,'square',180); }   // sem inimigo: apressa o passo
}
function doHeal(){
  if(G.state!=='play'||G.pot<=0) return;
  if(G.hero.hp>=G.hero.max){ say('Vida já cheia',1.2); return; }
  G.pot--; const h=Math.round(G.hero.max*0.45); G.hero.hp=Math.min(G.hero.max,G.hero.hp+h);
  floatText(G.hero.x+2,9,'+'+h,1); doFlash(0.25); sfx(660,0.2,'sine',990);
  document.getElementById('potN').textContent='×'+G.pot;
}

/* =========================================================================
   LOOP
   ========================================================================= */
let shakeAmt=0;
function shake(a){ shakeAmt=Math.min(12,shakeAmt+a); }
function doFlash(a){ flash.style.transition='none'; flash.style.opacity=a; requestAnimationFrame(()=>{ flash.style.transition='opacity .3s'; flash.style.opacity=0; }); }

function update(dt){
  G.t+=dt;
  if(G.state!=='play') return;
  const h=G.hero;
  if(h.hurtT>0)h.hurtT-=dt; if(h.animT>0){h.animT-=dt; if(h.animT<=0)h.anim='idle';}
  if(h.lungeT>0)h.lungeT-=dt;
  if(G.strikeCd>0)G.strikeCd-=dt;
  if(G.msgT>0){G.msgT-=dt; if(G.msgT<=0)G.msg=null;}
  for(const f of G.floats){ f.y-=dt*4; f.life-=dt; } G.floats=G.floats.filter(f=>f.life>0);

  if(G.phase==='walk'){
    const sp = 8*dt; G.scroll += sp; G.walkDone += sp;
    h.anim = (Math.floor(G.t*6)%2)?'walk':'idle';
    if(G.walkDone>=G.walkGoal){ G.walkDone=0; G.walkGoal=18+Math.random()*14; spawnEnemy(); }
  }
  else if(G.phase==='fight'){
    const e=G.enemy;
    if(e.hurtT>0)e.hurtT-=dt;
    if(e.dieT>0){ e.dieT-=dt; if(e.dieT<=0){ G.enemy=null; G.phase='walk'; } return; }
    // inimigo entra
    if(G.enemyX>COLS-30){ G.enemyX-=24*dt; if(G.enemyX<COLS-30)G.enemyX=COLS-30; return; }
    // trocas
    G.heroAtkT-=dt; G.enemyAtkT-=dt;
    if(G.heroAtkT<=0){ G.heroAtkT=ATK_INT; heroAttack(1); }
    if(e && e.dieT<=0 && G.enemyAtkT<=0){ G.enemyAtkT = e.boss?2.0:ENEMY_BASE_INT;
      e.lungeT=0.18; const dmg=Math.max(1,Math.round(e.atk*(0.8+Math.random()*0.45))); heroTakeHit(dmg); }
    if(e){ if(e.lungeT>0)e.lungeT-=dt; }
  }
  if(shakeAmt>0) shakeAmt=Math.max(0,shakeAmt-dt*30);
}

/* ---------- barras ASCII ---------- */
function bar(x,y,w,frac,c){
  frac=Math.max(0,Math.min(1,frac)); const n=Math.round(w*frac);
  put(x,y,'[',0.6,4);
  for(let i=0;i<w;i++) put(x+1+i, y, i<n?'=':'-', i<n?0.95:0.25, i<n?c:4);
  put(x+1+w,y,']',0.6,4);
}

function draw(){
  clearBuf();
  const z=currentZone();
  drawSky(G.t);
  drawTowerBg(G.scroll);
  drawGround(G.scroll, z);

  if(G.state==='play'||G.state==='dead'){
    const h=G.hero;
    const hy=GROUND_Y-7;
    const lunge = h.lungeT>0?2:0;
    let art = HERO[h.anim]||HERO.idle;
    if(h.hurtT>0 && Math.floor(G.t*20)%2) art=HERO.hurt;
    sprite(h.x+lunge, hy, art, h.hurtT>0?0.7:0.95, h.hurtT>0?2:0);
    // arma-luz do golpe carregado
    if(h.anim==='atk' && h.animT>0.1) text(h.x+10, hy+1, '/*', 0.9, 1);

    if(G.enemy){ const e=G.enemy; const ex=Math.round(G.enemyX);
      const el = e.lungeT>0?-2:0;
      const dieFade = e.dieT>0? Math.max(0.1,e.dieT/0.55):1;
      const ey = GROUND_Y-1-e.art.length;
      sprite(ex+el, ey, e.art, (e.hurtT>0?0.55:0.9)*dieFade, e.hurtT>0?2:0, true);
      if(e.dieT>0){ text(ex, ey-1, '. * .', dieFade, 4); }
      else {
        // barra de vida do inimigo
        bar(ex-1, ey-2, e.boss?18:10, e.hp/e.max, e.boss?2:0);
        text(ex-1, ey-3, e.name, e.boss?0.95:0.7, e.boss?2:0);
      }
    }
    // floats
    for(const f of G.floats) text(Math.round(f.x), Math.round(f.y), f.s, Math.min(1,f.life), f.c);

    // ---- HUD ----
    text(2,1, '\\o/  '+shortName(), 0.95, 0);
    text(2,2, 'Nv '+h.lvl, 0.8, 1);
    bar(9,2, 22, h.hp/h.max, 1); text(33,2, h.hp+'/'+h.max, 0.7, 4);
    bar(9,3, 22, h.xp/h.xpNext, 5); text(2,3,'XP',0.7,5);
    text(2,4, '⌂ '+h.gold+'  ◈ poção '+G.pot, 0.75, 3);
    // direita: zona/andar
    const zt = 'Andar '+G.floor+'  ·  '+z.name;
    text(COLS-2-zt.length, ROWS-2, zt, 0.85, 1);
    text(COLS-2-(''+G.kills+' abatidos').length, ROWS-1, G.kills+' abatidos', 0.6, 4);
    // cooldown do golpe (canto)
    if(G.strikeCd>0){ const f=1-G.strikeCd/3.6; bar(2,ROWS-2, 12, f, 4); text(2,ROWS-3,'GOLPE',0.5,4); }
    else { text(2,ROWS-2,'GOLPE PRONTO',0.85,1); }

    if(G.msg){ const m=G.msg; text(Math.round((COLS-m.length)/2), 6, m, Math.min(1,G.msgT), 1); }
  }
}

function shortName(){ return 'Andarilho de Pedra'; }

/* ---------- botões DOM ---------- */
const cdStrike=document.getElementById('cdStrike'), bStrike=document.getElementById('bStrike');
function syncBtns(){
  document.getElementById('potN').textContent='×'+(G.pot||0);
  const rdy=G.strikeCd<=0; bStrike.classList.toggle('ready',rdy && G.state==='play');
  cdStrike.style.width = rdy?'100%':(100*(1-G.strikeCd/3.6))+'%';
  document.getElementById('bHeal').classList.toggle('ready', G.pot>0 && G.state==='play');
}

/* ---------- áudio ---------- */
let AC; function ac(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); return AC; }
function sfx(f,d,type,glide){ try{ const c=ac(),t=c.currentTime,o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine'; o.frequency.setValueAtTime(f,t); if(glide)o.frequency.exponentialRampToValueAtTime(glide,t+d);
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.16,t+.008); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+d+.02);}catch(e){} }

/* ---------- loop principal ---------- */
let last=0;
function frame(ts){
  const dt=Math.min(0.05,(ts-last)/1000||0); last=ts;
  update(dt);
  // shake aplicado via offset de render
  const sx = shakeAmt? (Math.random()-0.5)*shakeAmt*dpr : 0;
  const sy = shakeAmt? (Math.random()-0.5)*shakeAmt*dpr : 0;
  draw();
  const ox=offX, oy=offY; offX+=sx; offY+=sy; render(); offX=ox; offY=oy;
  syncBtns();
  requestAnimationFrame(frame);
}

/* ---------- entrada ---------- */
function startGame(){ document.getElementById('title').classList.add('hidden'); ac().resume&&ac().resume(); G.state='play'; say('A ascensão começa.',2.5); }
document.getElementById('btnStart').onclick=startGame;
document.getElementById('btnRetry').onclick=reviveRun;
bStrike.addEventListener('click',doStrike);
document.getElementById('bHeal').addEventListener('click',doHeal);
window.addEventListener('keydown',e=>{
  if(e.repeat) return;
  if(e.code==='Space'||e.code==='Enter'){ e.preventDefault(); if(G.state==='title')startGame(); else if(G.state==='dead')reviveRun(); else doStrike(); }
  else if(e.key==='p'||e.key==='P') doHeal();
});
// toque no canvas = golpe (mas não nos botões)
cv.addEventListener('pointerdown',()=>{ if(G.state==='play') doStrike(); ac().resume&&ac().resume(); });

/* ---------- logo do título ---------- */
document.getElementById('logoArt').textContent =
[" _____ ___  ____  ____  _____   ____  _____   ___  ____ ____  ___  ____",
 "|_   _/ _ \\|  _ \\|  _ \\| ____| |  _ \\| ____| / _ \\/ ___/ ___|/ _ \\/ ___|",
 "  | || | | | |_) | |_) |  _|   | | | |  _|  | | | \\___ \\___ \\ | | \\___ \\",
 "  | || |_| |  _ <|  _ <| |___  | |_| | |___ | |_| |___) |__) | |_| |___) |",
 "  |_| \\___/|_| \\_\\_| \\_\\_____| |____/|_____| \\___/|____/____/ \\___/|____/",
 "",
 "                          .-.                    ",
 "                         /   \\      |#|          ",
 "                        (  o  )    /###\\         ",
 "                         \\   /    |#| |#|        ",
 "                          '-'     |#####|        ",
 "                   _.-~-._       /#######\\       ",
 "               .-~'       '~-.  |#| . . |#|      "].join('\n');

resize(); requestAnimationFrame(frame);
