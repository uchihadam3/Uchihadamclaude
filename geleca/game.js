/* =========================================================================
   GELECA — puzzle-platformer de gosma. Pular custa MASSA: cada pulo solta um
   pedaço que vira bloco sólido. Empilhe torres, reabsorva (E), colete gosmas,
   escale paredes, pegue plataformas móveis. Menu com fases, estrelas e
   progresso salvo. Canvas 2D puro, sem backend.
   ========================================================================= */
"use strict";

// -------------------------------------------------------------------------- FÍSICA
const TILE=32, GRAVITY=1700, MOVE=200, AIR=0.78, JUMP_V=600, CLIMB=150,
      GLOB=26, REABSORB_R=10, MAX_FALL=900, MELT_TIME=0.9, BOUNCE=1000;

// câmera responsiva com ZOOM: o canvas preenche a tela e mostra ~N tiles (zoom in).
const cam={ x:0, y:0 };
let zoom=2, camViewW=640, camViewH=384;   // camViewW/H = px do MUNDO visíveis

// temas de cor por "mundo": fundo (parallax) + tiles
const THEMES={
  cave:  { sky0:"#123033", sky1:"#0c2024", mote:"126,224,107", tile:"#274036", tilehi:"#365a48",
           top:"#4a9a5a", top2:"#63c878", far:"#183a34", mid:"#20503f", cloud:"170,220,180" },
  deep:  { sky0:"#101a34", sky1:"#0a1020", mote:"120,170,255", tile:"#20304f", tilehi:"#2e4470",
           top:"#3a6aa0", top2:"#4f8fd0", far:"#161f3e", mid:"#1e2f5a", cloud:"140,170,230" },
  forge: { sky0:"#3a1c10", sky1:"#1e0f08", mote:"255,160,80",  tile:"#3a271b", tilehi:"#5a3d28",
           top:"#a05a3a", top2:"#d07a4a", far:"#2a160c", mid:"#41210f", cloud:"230,150,110" },
  ice:   { sky0:"#173846", sky1:"#0e222e", mote:"170,230,255", tile:"#254048", tilehi:"#356470",
           top:"#3f8fa8", top2:"#5fc0d8", far:"#12303c", mid:"#1c4653", cloud:"200,235,255" },
};

// -------------------------------------------------------------------------- FASES
// #=sólido @=início E=saída ^=espinho o=gosma P=placa D=porta H=calor
// *=estrela VISÍVEL (coletável)  G=gema = SEGREDO oculto (nunca anunciado)
// S=parede falsa  C=desmorona  T=mola
// movers: plataformas móveis [{x,y,w,axis,dist,speed,phase}] (tiles)
// enemies: [{x,y,type:'patrol'|'chaser',dist,speed,axis,range}] — chaser te caça se chegar perto
const LEVELS = [
  { name:"1 · Vale", mass:9, max:9, theme:"cave",
    hint:"Vá pra direita ➜ e pule. Cada pulo solta um pedaço de você que vira bloco sólido.", rows:[
    "############################################################",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                                          #",
    "#                                  *                       #",
    "#       ####                     #####                     #",
    "#       #G #        o                                      #",
    "#       #  S       ####                                    #",
    "#       ####                                               #",
    "#     ###                     o              o             #",
    "# @                                                     E  #",
    "#############   ########   ###########   #########  ########",
    "#############   ########   ###########   #########  ########",
    "#############^^^########^^^###########^^^#########^^########",
    "#############   ########   ###########   #########  ########"]},

  { name:"2 · Colinas", mass:9, max:9, theme:"cave",
    hint:"Pontes rachadas DESMORONAM quando você pisa — atravesse correndo!", rows:[
    "################################################################",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                 *                            #",
    "#           ###     #####CCCCCCC#####                          #",
    "#                                                     ####     #",
    "#        ###                                          #G #     #",
    "#                                                     S  #     #",
    "#     ###                                             ####     #",
    "#                         o                 o                  #",
    "# @                                                         E  #",
    "##################   #############    ############   ###########",
    "##################   #############    ############   ###########",
    "##################^^^#############^^^^############^^^###########",
    "##################   #############    ############   ###########"],
    enemies:[{"x":40,"y":17,"dist":7,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"3 · Cavernas", mass:10, max:10, theme:"deep",
    hint:"Empilhar gasta massa. Encoste num pedaço e aperte PEGAR pra reabsorver e reabastecer.", rows:[
    "##############################################################",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                     *                      #",
    "#                                   #####                    #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                                                            #",
    "#                      o                                     #",
    "#         ####        ####                                   #",
    "#         #G #                                               #",
    "#         #  S                                               #",
    "#         ####                                    o          #",
    "# @                                                       E  #",
    "################   ###########    ############   #############",
    "################   ###########    ############   #############",
    "################^^^###########^^^^############^^^#############",
    "################   ###########    ############   #############"],
    enemies:[{"x":44,"y":17,"dist":6,"speed":1,"axis":"x","type":"patrol"}]},

  { name:"4 · Paredão", mass:7, max:7, theme:"deep",
    hint:"Pule perto da parede e SEGURE a direção contra ela pra grudar e escalar.", rows:[
    "##############################",
    "#                            #",
    "#                            #",
    "#                            #",
    "#                            #",
    "#                #           #",
    "#                #  #####    #",
    "#               E#  #   #    #",
    "#                #  S G #    #",
    "#                #  #   #    #",
    "#                #  #####    #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#               *#           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#                #           #",
    "#         o      #           #",
    "# @              #           #",
    "##############################",
    "##############################"],
    enemies:[{"x":6,"y":25,"dist":6,"speed":0.85,"axis":"x","type":"patrol"}]},

  { name:"5 · A Ponte", mass:5, max:5, theme:"ice",
    hint:"Molas (⇑) te lançam alto e plataformas móveis cruzam os abismos.", rows:[
    "########################################################################",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#                                                                      #",
    "#             *                                                        #",
    "#         CCCCCCCCC                           ####                     #",
    "#                                             #G #                     #",
    "#                                             #  S                     #",
    "#                                             ####                     #",
    "#                                                                      #",
    "# @                                                                 E  #",
    "########             ####T##                 ####T##             #######",
    "########             #######                 #######             #######",
    "########^^^^^^^^^^^^^#######^^^^^^^^^^^^^^^^^#######^^^^^^^^^^^^^#######",
    "########             #######                 #######             #######"],
    movers:[{"x":9,"y":16,"w":3,"axis":"x","dist":9,"speed":0.7,"phase":0},{"x":30,"y":16,"w":3,"axis":"x","dist":12,"speed":0.55,"phase":1},{"x":53,"y":16,"w":3,"axis":"x","dist":9,"speed":0.75,"phase":0.4}],
    enemies:[{"x":36,"y":15,"speed":1,"type":"chaser","range":8}]},

  { name:"6 · Forja", mass:8, max:8, theme:"forge",
    hint:"Deixe um pedaço na placa pra abrir a porta. O 🔥 calor derrete sua massa — passe rápido.", rows:[
    "################################################################",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                                                              #",
    "#                  *                                           #",
    "#                 ####                              ####       #",
    "#                                                   #G #       #",
    "#                         o               o         S  #       #",
    "#           D                           CCCCC       ####       #",
    "#           D                                                  #",
    "# @         D         HHHHHHHHHH             T              E  #",
    "#######P############################   #########################",
    "####################################   #########################",
    "####################################^^^#########################",
    "####################################   #########################"],
    enemies:[{"x":34,"y":15,"speed":1.05,"type":"chaser","range":7},{"x":50,"y":15,"dist":6,"speed":0.9,"axis":"x","type":"patrol"}]},

  { name:"7 · Guarida", mass:7, max:7, theme:"forge",
    hint:"Guardiões patrulham — e alguns ACORDAM e te CAÇAM se você chegar perto. Fuja pra longe pra despistá-los.", rows:[
    "##################################################################",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                                #",
    "#                                                 ####           #",
    "#                              *                  #G #           #",
    "#                           CCCCCCC               #  S           #",
    "#                                                 ####           #",
    "#                                                                #",
    "# @                                                           E  #",
    "############T###########   #############T#########################",
    "########################   #######################################",
    "########################^^^#######################################",
    "########################   #######################################"],
    enemies:[{"x":18,"y":16,"dist":9,"speed":0.9,"axis":"x","type":"patrol"},{"x":44,"y":16,"dist":8,"speed":1.1,"axis":"x","type":"patrol"},{"x":33,"y":16,"speed":1.15,"type":"chaser","range":9}]},

  { name:"8 · O Ápice", mass:9, max:9, theme:"ice",
    hint:"O grande final. Tudo que você aprendeu, junto. Boa gosma!", rows:[
    "######################################################################################",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                               *                                                    #",
    "#                             #####                                                  #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#                                                                                    #",
    "#         ####                                          *                            #",
    "#         #G #                                        CCCCC                          #",
    "#         #  S                                                                       #",
    "#         ####                               o                                       #",
    "#                                                                     o              #",
    "# @                                         HHHHHH                                E  #",
    "##############   #######T#               #########   #########T#             #########",
    "##############   #########               #########   ###########             #########",
    "##############^^^#########^^^^^^^^^^^^^^^#########^^^###########^^^^^^^^^^^^^#########",
    "##############   #########               #########   ###########             #########"],
    movers:[{"x":27,"y":20,"w":4,"axis":"x","dist":11,"speed":0.6,"phase":0},{"x":65,"y":20,"w":4,"axis":"x","dist":9,"speed":0.7,"phase":1}],
    enemies:[{"x":45,"y":19,"dist":4,"speed":1,"axis":"x","type":"patrol"},{"x":70,"y":19,"dist":5,"speed":1,"axis":"x","type":"patrol"},{"x":20,"y":19,"speed":1.1,"type":"chaser","range":8},{"x":60,"y":19,"speed":1.2,"type":"chaser","range":9}]},

];

// -------------------------------------------------------------------------- PROGRESSO
const SAVE_KEY="geleca_save_v2";
function loadSave(){ try{ const s=JSON.parse(localStorage.getItem(SAVE_KEY))||{}; return {unlocked:s.unlocked||0, stars:s.stars||{}, coins:s.coins||{}, gems:s.gems||{}}; }catch(e){ return {unlocked:0,stars:{},coins:{},gems:{}}; } }
function persist(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }catch(e){} }
let save = loadSave();
function starsFor(idx, massLeft){
  const L=LEVELS[idx];
  if(massLeft >= Math.ceil(L.mass*0.6)) return 3;
  if(massLeft >= 2) return 2;
  return 1;
}

// -------------------------------------------------------------------------- ESTADO
const canvas=document.getElementById("game"), ctx=canvas.getContext("2d");
const el=id=>document.getElementById(id);
let COLS,ROWS, level, solidTiles,spikes,pickups,plates,doors,heatZones,movers,springs,enemies,gems,stars,fakes,crumbles,exitRect,startPos,theme;
let blob, globs, particles=[], motes=[], levelIndex=0, state="menu"; // menu|play|complete|dead
let levelTime=0, T=0, shake=0, last=0, deaths=0, transition=0;

// entrada
const IN={ kb:{left:false,right:false,down:false}, joyX:0, joyY:0 };
let jumpEdge=false, grabEdge=false;

// -------------------------------------------------------------------------- VALIDAÇÃO
(function(){ LEVELS.forEach((L,i)=>{ const w=L.rows[0].length;
  L.rows.forEach((r,y)=>{ if(r.length!==w) console.error(`LEVEL ${i+1} linha ${y}: ${r.length}≠${w}`); });
  const j=L.rows.join(""); if(!j.includes("@"))console.error(`LEVEL ${i+1} sem @`); if(!j.includes("E"))console.error(`LEVEL ${i+1} sem E`);
}); })();

// -------------------------------------------------------------------------- TOAST
let toastT; function toast(m,k){ /* reservado */ }

// ==========================================================================
// MENU / SELEÇÃO DE FASES
// ==========================================================================
function showMenu(){
  state="menu";
  el("screen-game").classList.remove("active");
  el("screen-menu").classList.add("active");
  buildLevelGrid();
}
function buildLevelGrid(){
  const grid=el("level-grid"); grid.innerHTML="";
  // ⭐ estrelas VISÍVEIS (coletável, contagem aberta com total)
  const coinsIn=i=>(LEVELS[i].rows.join("").match(/\*/g)||[]).length;
  const coinGot=i=>Math.min(coinsIn(i), save.coins[i]||0);
  // 💎 SEGREDOS: só o que você já achou — o jogo nunca revela quantos há
  const secretGot=i=>save.gems[i]||0;
  let totalCoins=0, gotCoins=0, foundSecrets=0;
  LEVELS.forEach((_,i)=>{ totalCoins+=coinsIn(i); gotCoins+=coinGot(i); foundSecrets+=secretGot(i); });
  const stats=el("menu-stats");
  if(stats) stats.innerHTML=`⭐ ${gotCoins}/${totalCoins}`
    + (foundSecrets>0 ? ` &nbsp;·&nbsp; <span style="color:#c9a6ff">💎 ${foundSecrets}</span>` : "");
  LEVELS.forEach((L,i)=>{
    const locked=i>save.unlocked, st=save.stars[i]||0;
    const cTot=coinsIn(i), cGot=coinGot(i), sGot=secretGot(i);
    const c=document.createElement("div");
    c.className="lv-card "+(locked?"locked":"unlocked");
    c.innerHTML = locked
      ? `<div class="lv-lock">🔒</div><div class="lv-name">${(L.name.split("·")[1]||"").trim()}</div>`
      : `<div class="lv-num">${i+1}</div><div class="lv-name">${L.name.split("·")[1].trim()}</div>
         <div class="lv-stars">${st?"★".repeat(st)+"☆".repeat(3-st):"···"}`
         + (cTot?` <span style="color:${cGot===cTot?'#ffd24a':'#8a7a4a'}">⭐${cGot}/${cTot}</span>`:"")
         + (sGot>0?` <span style="color:#c9a6ff">💎${sGot}</span>`:"")
         + `</div>`;
    if(!locked) c.addEventListener("click", ()=>{ audio(); startGame(i); });
    grid.appendChild(c);
  });
}
function startGame(i){
  levelIndex=i;
  el("screen-menu").classList.remove("active");
  el("screen-game").classList.add("active");
  loadLevel(i);
}

// ==========================================================================
// CARREGAR / RESETAR
// ==========================================================================
function loadLevel(idx){
  level=LEVELS[idx]; ROWS=level.rows.length; COLS=level.rows[0].length;
  fitCanvas();                            // dimensiona o canvas à tela e calcula o zoom
  solidTiles=[];spikes=[];pickups=[];plates=[];doors=[];heatZones=[];movers=[];springs=[];enemies=[];gems=[];stars=[];fakes=[];crumbles=[];
  theme=THEMES[level.theme] || [THEMES.cave,THEMES.cave,THEMES.cave,THEMES.deep,THEMES.deep,THEMES.deep,THEMES.forge,THEMES.forge,THEMES.forge][idx] || THEMES.cave;
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
    const ch=level.rows[y][x], r={x:x*TILE,y:y*TILE,w:TILE,h:TILE};
    if(ch==="#")solidTiles.push(r);
    else if(ch==="^")spikes.push(r);
    else if(ch==="o")pickups.push({x:x*TILE+16,y:y*TILE+16,r:9});
    else if(ch==="P"){solidTiles.push(r);plates.push(r);}
    else if(ch==="D")doors.push(r);
    else if(ch==="H")heatZones.push(r);
    else if(ch==="T"){solidTiles.push(r);springs.push({x:r.x,y:r.y,w:TILE,h:TILE,sq:0});}  // mola
    else if(ch==="G")gems.push({x:x*TILE+16,y:y*TILE+16,r:8,got:false});                   // gema = SEGREDO oculto (nunca anunciado)
    else if(ch==="*")stars.push({x:x*TILE+16,y:y*TILE+16,r:9,got:false});                   // estrela = coletável VISÍVEL
    else if(ch==="S")fakes.push(r);                                                        // parede FALSA (passa através)
    else if(ch==="C")crumbles.push({x:r.x,y:r.y,w:TILE,h:TILE,solid:true,t:0,resp:0});     // plataforma que desmorona
    else if(ch==="E")exitRect={x:x*TILE+4,y:y*TILE+2,w:TILE-8,h:TILE-4};
    else if(ch==="@")startPos={x:x*TILE,y:y*TILE};
  }
  (level.movers||[]).forEach(m=>movers.push({
    x0:m.x*TILE, y0:m.y*TILE, w:m.w*TILE, h:GLOB, axis:m.axis,
    dist:m.dist*TILE, speed:m.speed, phase:m.phase||0,
    x:m.x*TILE, y:m.y*TILE, dx:0, dy:0 }));
  (level.enemies||[]).forEach(e=>enemies.push({
    x0:e.x*TILE, y0:e.y*TILE, dist:(e.dist||0)*TILE, speed:e.speed, axis:e.axis||"x",
    type:e.type||"patrol", range:(e.range||7)*TILE, mad:0, alert:0,
    x:e.x*TILE, y:e.y*TILE, w:TILE-6, h:TILE-6 }));
  // motes de fundo
  motes=[]; for(let i=0;i<26;i++) motes.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    r:1+Math.random()*2.5, s:6+Math.random()*14, ph:Math.random()*6.28 });
  showHint(level.hint);
  levelTime=0; transition=1; resetLevel();
}
function resetLevel(){
  globs=[]; particles=[];
  blob={ x:startPos.x, y:startPos.y, w:0,h:0, vx:0,vy:0, onGround:false,wall:0,cling:false,
         mass:level.mass, flash:0, clingLock:0, meltAcc:0, melting:false, blink:0, rideMover:null };
  sizeBlob(); blob.y=startPos.y+TILE-blob.h;
  camFollow(true);
  state="play"; hideOverlay(); renderHud();
}
function sizeBlob(){ const s=16+blob.mass*4, cx=blob.x+blob.w/2, bt=blob.y+blob.h;
  blob.w=s;blob.h=s; blob.x=cx-s/2; blob.y=bt-s; }

// ==========================================================================
// COLISÃO / FÍSICA
// ==========================================================================
function overlaps(a,b){ return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y; }
function plateOn(){ if(!plates.length)return false;
  for(const p of plates){ const z={x:p.x,y:p.y-6,w:p.w,h:p.h};
    if(overlaps(blob,z))return true; for(const g of globs)if(g.solid&&overlaps(g,z))return true; }
  return false; }
function solidsList(){ const l=solidTiles.slice();
  for(const g of globs)if(g.solid)l.push(g);
  for(const m of movers)l.push({x:m.x,y:m.y,w:m.w,h:m.h});
  for(const c of crumbles)if(c.solid)l.push(c);
  if(doors.length&&!plateOn())for(const d of doors)l.push(d);
  return l; }
function moveAxis(dx,dy){ const list=solidsList();
  blob.x+=dx; for(const s of list)if(overlaps(blob,s)){ if(dx>0){blob.x=s.x-blob.w;blob.wall=1;} else if(dx<0){blob.x=s.x+s.w;blob.wall=-1;} blob.vx=0; }
  blob.y+=dy; for(const s of list)if(overlaps(blob,s)){ if(dy>0){blob.y=s.y-blob.h;blob.onGround=true;blob.vy=0;} else if(dy<0){blob.y=s.y+s.h;blob.vy=0;} } }

function inputState(){
  let mx=0;
  if(IN.kb.left&&!IN.kb.right)mx=-1; else if(IN.kb.right&&!IN.kb.left)mx=1;
  else if(Math.abs(IN.joyX)>0.25)mx=IN.joyX;
  const down=IN.kb.down||IN.joyY>0.5;
  return { mx, left:mx<-0.25, right:mx>0.25, down };
}

function updateMovers(dt){
  for(const m of movers){
    const off=Math.sin(levelTime*m.speed*Math.PI*2 + m.phase)*(m.dist*0.5) + m.dist*0.5;
    const nx=m.axis==="x"? m.x0+off : m.x0;
    const ny=m.axis==="y"? m.y0+off : m.y0;
    m.dx=nx-m.x; m.dy=ny-m.y; m.x=nx; m.y=ny;
  }
}
function updateEnemies(dt){
  const bx=blob?blob.x+blob.w/2:0, by=blob?blob.y+blob.h/2:0;
  for(const e of enemies){
    e.px=e.x;
    if(e.type==="chaser"){
      // PERSEGUIDOR: dorme parado; quando você chega perto, acorda e te CAÇA.
      const dx=bx-(e.x+e.w/2), d=Math.hypot(dx, by-(e.y+e.h/2));
      if(d<e.range){
        e.x += Math.sign(dx)*e.speed*135*dt;       // avança na sua direção
        e.mad=Math.min(1,e.mad+dt*3); e.alert=1;
      } else {
        const hx=e.x0-e.x;                           // volta pro ninho quando escapa
        if(Math.abs(hx)>1) e.x += Math.sign(hx)*Math.min(Math.abs(hx), e.speed*70*dt);
        e.mad=Math.max(0,e.mad-dt*1.6); e.alert=Math.max(0,e.alert-dt);
      }
      e.y = e.y0 + Math.sin(levelTime*(4+e.mad*4))*(2+e.mad*2);
    } else {
      const off=Math.sin(levelTime*e.speed*Math.PI*2)*(e.dist*0.5) + e.dist*0.5;
      e.x = e.axis==="x"? e.x0+off+3 : e.x0+3;
      e.y = e.axis==="y"? e.y0+off+3 : e.y0+3;
    }
    e.dir = e.x>=e.px?1:(e.x<e.px?-1:(e.dir||1));
  }
}
function fitCanvas(){
  const stage=el("stage"); if(!stage) return;
  const cw=stage.clientWidth||640, ch=stage.clientHeight||384;
  const dpr=Math.min(2, window.devicePixelRatio||1);
  canvas.width=Math.max(1,Math.round(cw*dpr));
  canvas.height=Math.max(1,Math.round(ch*dpr));
  const targetTiles = cw<560 ? 12 : 17;          // celular: ~12 tiles (zoom in, personagem grande)
  zoom = canvas.width/(targetTiles*TILE);
  camViewW = canvas.width/zoom; camViewH = canvas.height/zoom;
}
function camFollow(snap){
  const worldW=COLS*TILE, worldH=ROWS*TILE;
  let tx = worldW<=camViewW ? (worldW-camViewW)/2 : Math.max(0,Math.min(blob.x+blob.w/2 - camViewW/2, worldW-camViewW));
  let ty = worldH<=camViewH ? (worldH-camViewH)/2 : Math.max(0,Math.min(blob.y+blob.h/2 - camViewH*0.58, worldH-camViewH));
  if(snap){ cam.x=tx; cam.y=ty; } else { cam.x+=(tx-cam.x)*0.12; cam.y+=(ty-cam.y)*0.12; }
}

function update(dt){
  T+=dt;
  if(state!=="play"){ jumpEdge=grabEdge=false; return; }
  levelTime+=dt;
  if(blob.flash>0)blob.flash-=dt; if(blob.clingLock>0)blob.clingLock-=dt;
  blob.blink-=dt; if(blob.blink<-0.15)blob.blink=1.6+Math.random()*2.5;

  if(transition>0) transition=Math.max(0,transition-dt*2.6);
  updateMovers(dt); updateEnemies(dt);
  // carona: se estava sobre um mover, acompanha o deslocamento dele
  if(blob.onGroundPrev && blob.rideMover){ blob.x+=blob.rideMover.dx; blob.y+=blob.rideMover.dy; }

  const {mx,left,right,down}=inputState();
  const onG=blob.onGroundPrev, wall=blob.wallPrev||0;

  let cling=false;
  if(!onG && wall!==0 && blob.clingLock<=0){ if((wall>0&&right)||(wall<0&&left)) cling=true; }
  blob.cling=cling;

  const ctrl=onG?1:AIR;
  if(cling) blob.vx=0;
  else if(Math.abs(mx)>0.25) blob.vx=mx*MOVE*ctrl;
  else blob.vx*= onG?0.6:0.92;

  if(cling) blob.vy = down?CLIMB:-CLIMB;
  else { blob.vy+=GRAVITY*dt; if(blob.vy>MAX_FALL)blob.vy=MAX_FALL; }

  if(jumpEdge){ hideHint();
    if((onG||cling)&&blob.mass>1){ dropGlob(cling?wall:0); blob.mass-=1; sizeBlob();
      blob.vy=-JUMP_V; if(cling){blob.vx=-wall*MOVE*0.9;blob.clingLock=0.18;}
      burst(blob.x+blob.w/2,blob.y+blob.h,7,"#7ee06b",130); sfx("jump"); renderHud(); }
    else if(blob.mass<=1){ blob.flash=0.2; sfx("nope"); } }
  jumpEdge=false;
  if(grabEdge){ reabsorb(); grabEdge=false; }
  if(Math.abs(mx)>0.3) hideHint();

  const preVy=blob.vy, preG=blob.onGroundPrev;
  blob.onGround=false; blob.wall=0;
  moveAxis(blob.vx*dt, blob.vy*dt);
  if(blob.onGround&&!preG&&preVy>260){ burst(blob.x+blob.w/2,blob.y+blob.h,5,"#5fbf6a",95); shake=Math.min(6,preVy/120); }
  blob.onGroundPrev=blob.onGround; blob.wallPrev=blob.wall;

  // qual mover está pisando (pra carona no próximo frame)
  blob.rideMover=null;
  if(blob.onGround) for(const m of movers){
    if(blob.x+blob.w>m.x+2 && blob.x<m.x+m.w-2 && Math.abs((blob.y+blob.h)-m.y)<3){ blob.rideMover=m; break; }
  }
  // mola: impulso pra cima sem gastar massa
  if(blob.onGround && blob.vy>=0) for(const sp of springs){
    if(blob.x+blob.w>sp.x+3 && blob.x<sp.x+sp.w-3 && Math.abs((blob.y+blob.h)-sp.y)<5){
      blob.vy=-BOUNCE; blob.onGround=false; blob.onGroundPrev=false; sp.sq=1;
      burst(sp.x+sp.w/2,sp.y,8,"#9fe8ff",160); sfx("spring"); break;
    }
  }
  for(const sp of springs) if(sp.sq>0) sp.sq=Math.max(0,sp.sq-dt*4);

  // plataformas que DESMORONAM: pisou → treme e cai; depois respawna
  for(const c of crumbles){
    if(c.solid){
      const on = blob.onGround && blob.x+blob.w>c.x+2 && blob.x<c.x+c.w-2 && Math.abs((blob.y+blob.h)-c.y)<3;
      if(on){ c.t+=dt; if(c.t>=0.55){ c.solid=false; c.resp=2.6; burst(c.x+c.w/2,c.y+c.h/2,8,"#b98a5a",80); sfx("nope"); } }
      else if(c.t>0) c.t=Math.max(0,c.t-dt*2);
    } else { c.resp-=dt; if(c.resp<=0){ c.solid=true; c.t=0; } }
  }

  camFollow(false);   // câmera segue o blob

  // inimigos: contato = morte
  for(const e of enemies) if(overlaps(blob,{x:e.x+2,y:e.y+2,w:e.w-4,h:e.h-4})){ die(); return; }
  // estrelas VISÍVEIS (coletável comum)
  for(const st of stars) if(!st.got && overlaps(blob,{x:st.x-st.r,y:st.y-st.r,w:st.r*2,h:st.r*2})){
    st.got=true; burst(st.x,st.y,14,"#ffd24a",150); sfx("star"); shake=Math.max(shake,2);
  }
  // gemas = SEGREDOS ocultos (nunca anunciados; o jogo NÃO avisa que existem)
  for(const gm of gems) if(!gm.got && overlaps(blob,{x:gm.x-gm.r,y:gm.y-gm.r,w:gm.r*2,h:gm.r*2})){
    gm.got=true; burst(gm.x,gm.y,20,"#c9a6ff",180); sfx("secret"); shake=Math.max(shake,4);
    showHint("✨ segredo…");
  }

  // calor
  let inHeat=false; for(const h of heatZones)if(overlaps(blob,h)){inHeat=true;break;}
  blob.melting=inHeat;
  if(inHeat){ blob.meltAcc+=dt; if(blob.meltAcc>=MELT_TIME){ blob.meltAcc-=MELT_TIME;
      burst(blob.x+blob.w/2,blob.y,4,"#ff9a4a",60);
      if(blob.mass>1){ blob.mass--; sizeBlob(); renderHud(); sfx("melt"); } else { die(); return; } } }
  else if(blob.meltAcc>0) blob.meltAcc=Math.max(0,blob.meltAcc-dt*0.5);

  updateParticles(dt);
  if(shake>0) shake=Math.max(0,shake-dt*24);
  const now=performance.now(); for(const g of globs)if(!g.solid&&now>=g.solidAt)g.solid=true;

  for(let i=pickups.length-1;i>=0;i--){ const p=pickups[i];
    if(overlaps(blob,{x:p.x-p.r,y:p.y-p.r,w:p.r*2,h:p.r*2})){
      if(blob.mass<level.max){blob.mass++;sizeBlob();}
      burst(p.x,p.y,9,"#a6f08a",110); sfx("pickup"); pickups.splice(i,1); renderHud(); } }

  for(const s of spikes)if(overlaps(blob,{x:s.x+4,y:s.y+7,w:s.w-8,h:s.h-7})){ die(); return; }
  if(blob.y>ROWS*TILE+80){ die(); return; }
  if(overlaps(blob,exitRect)) win();
}

function dropGlob(wallSide){
  const g={x:blob.x+blob.w/2-GLOB/2,y:blob.y+blob.h-GLOB,w:GLOB,h:GLOB,solid:false,solidAt:performance.now()+120,wall:wallSide};
  if(wallSide>0)g.x=blob.x+blob.w-GLOB; else if(wallSide<0)g.x=blob.x;
  globs.push(g);
}
function reabsorb(){ if(blob.mass>=level.max)return;
  let best=-1,bd=1e9; const foot={x:blob.x-REABSORB_R,y:blob.y-REABSORB_R,w:blob.w+REABSORB_R*2,h:blob.h+REABSORB_R*2};
  for(let i=0;i<globs.length;i++){ const g=globs[i]; if(!g.solid)continue;
    if(overlaps(foot,g)){ const dx=(g.x+g.w/2)-(blob.x+blob.w/2),dy=g.y-(blob.y+blob.h),d=dx*dx+dy*dy; if(d<bd){bd=d;best=i;} } }
  if(best>=0){ const g=globs[best]; burst(g.x+g.w/2,g.y+g.h/2,9,"#a6f08a",120); sfx("absorb");
    globs.splice(best,1); blob.mass++; sizeBlob(); blob.flash=0.12; renderHud(); } }

function die(){ deaths++; burst(blob.x+blob.w/2,blob.y+blob.h/2,18,"#ff7a6a",210); sfx("die"); shake=8;
  state="dead";
  overlay("💥 Ai!","Espinho, queda ou derreteu.",[
    {t:"Tentar de novo",cb:resetLevel},
    {t:"Menu",ghost:true,cb:showMenu}]); }

function win(){ state="complete"; sfx("win"); burst(exitRect.x+exitRect.w/2,exitRect.y+exitRect.h/2,22,"#7ee06b",190);
  const st=starsFor(levelIndex,blob.mass);
  save.stars[levelIndex]=Math.max(save.stars[levelIndex]||0, st);
  // ⭐ estrelas VISÍVEIS: contadas abertamente
  const coinGot=stars.filter(s=>s.got).length, coinTot=stars.length;
  if(coinTot) save.coins[levelIndex]=Math.max(save.coins[levelIndex]||0, coinGot);
  // 💎 SEGREDOS ocultos: guardamos, mas NUNCA revelamos quantos existem
  const secretGot=gems.filter(g=>g.got).length;
  if(secretGot) save.gems[levelIndex]=Math.max(save.gems[levelIndex]||0, secretGot);
  if(levelIndex+1<LEVELS.length && save.unlocked<levelIndex+1) save.unlocked=levelIndex+1;
  persist();
  const isLast=levelIndex>=LEVELS.length-1;
  let sub="★".repeat(st)+"☆".repeat(3-st);
  if(coinTot){ sub += `<div style="font-size:.8rem;color:#ffd24a;margin-top:6px">⭐ ${coinGot}/${coinTot}</div>`; }
  // segredo: só reconhece SE você achou algum — e jamais diz o total nem que faltam
  if(secretGot){ sub += `<div style="font-size:.8rem;color:#c9a6ff;margin-top:4px">✨ Você encontrou um segredo…</div>`; }
  overlay(isLast?"🏆 Você zerou!":"✅ Fase completa!", sub,
    isLast? [{t:"Menu",cb:showMenu}] :
          [{t:"Próxima ▶",cb:()=>startGame(levelIndex+1)},{t:"Menu",ghost:true,cb:showMenu}], true); }

// ==========================================================================
// RENDER
// ==========================================================================
function render(){
  const W=canvas.width,H=canvas.height, th=theme||THEMES.cave;
  ctx.setTransform(1,0,0,1,0,0);
  drawParallax(th);
  // motes ambiente (espaço de tela)
  ctx.fillStyle=`rgba(${th.mote},.10)`;
  for(const m of motes){ const y=(m.y - T*m.s)%H, yy=y<0?y+H:y;
    ctx.beginPath(); ctx.arc(m.x+Math.sin(T+m.ph)*6, yy, m.r,0,7); ctx.fill(); }

  // ---- MUNDO: câmera + ZOOM ----
  const sx=shake>0?(Math.random()*2-1)*shake:0, sy=shake>0?(Math.random()*2-1)*shake:0;
  ctx.setTransform(zoom,0,0,zoom, -cam.x*zoom+sx, -cam.y*zoom+sy);
  const minX=cam.x-TILE, maxX=cam.x+camViewW, minY=cam.y-TILE, maxY=cam.y+camViewH;
  const vis = r => r.x<=maxX && r.x+r.w>=minX && r.y<=maxY && r.y+r.h>=minY;

  // calor (atrás)
  for(const h of heatZones){ if(!vis(h))continue;
    const g=ctx.createLinearGradient(0,h.y,0,h.y+h.h);
    g.addColorStop(0,"rgba(255,120,40,.08)"); g.addColorStop(1,"rgba(255,70,25,.36)");
    ctx.fillStyle=g; ctx.fillRect(h.x,h.y,h.w,h.h);
    ctx.fillStyle="#ff7a2a"; ctx.fillRect(h.x,h.y+h.h-3,h.w,3);
    ctx.fillStyle="rgba(255,170,70,.7)";
    for(let i=0;i<3;i++){ const fx=h.x+7+i*10, fl=5+Math.sin(T*9+i+h.x)*3;
      ctx.beginPath(); ctx.moveTo(fx,h.y+h.h-3); ctx.quadraticCurveTo(fx+3,h.y+h.h-8-fl,fx+5,h.y+h.h-3); ctx.fill(); } }

  // tiles com relevo + topo de grama-gosma (tema)
  function drawTile(s){
    ctx.fillStyle=th.tile; ctx.fillRect(s.x,s.y,s.w,s.h);
    ctx.fillStyle=th.tilehi; ctx.fillRect(s.x,s.y,s.w,3);
    ctx.fillStyle="rgba(0,0,0,.22)"; ctx.fillRect(s.x,s.y+s.h-4,s.w,4);
    const above=isSolidAt(s.x+16,s.y-16) || s.y<TILE;   // sem grama no teto/borda-topo
    if(!above){ ctx.fillStyle=th.top; ctx.fillRect(s.x,s.y,s.w,6);
      ctx.fillStyle=th.top2; for(let i=0;i<2;i++){ const dx=s.x+8+i*14; ctx.beginPath();
        ctx.arc(dx,s.y+6,3+(i?1:0),0,Math.PI); ctx.fill(); } }
    ctx.fillStyle="rgba(255,255,255,.03)"; ctx.fillRect(s.x+3,s.y+8,2,2); ctx.fillRect(s.x+s.w-8,s.y+13,2,2);
  }
  for(const s of solidTiles) if(vis(s)) drawTile(s);
  for(const s of fakes) if(vis(s)) drawTile(s);          // paredes FALSAS: idênticas (segredo!)
  // plataformas que DESMORONAM (rachadas; tremem antes de cair)
  for(const c of crumbles){ if(!vis(c))continue;
    if(c.solid){ const jit=c.t>0?(Math.random()*2-1)*c.t*3:0;
      ctx.save(); ctx.translate(jit,0);
      ctx.fillStyle="#6a5238"; ctx.fillRect(c.x,c.y,c.w,c.h);
      ctx.fillStyle="#8a6a48"; ctx.fillRect(c.x,c.y,c.w,3);
      ctx.strokeStyle="rgba(0,0,0,.4)"; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(c.x+10,c.y); ctx.lineTo(c.x+14,c.y+13); ctx.lineTo(c.x+9,c.y+c.h);
      ctx.moveTo(c.x+22,c.y+4); ctx.lineTo(c.x+18,c.y+18); ctx.stroke(); ctx.restore();
    } else { ctx.globalAlpha=0.16; ctx.fillStyle="#6a5238"; ctx.fillRect(c.x,c.y,c.w,c.h); ctx.globalAlpha=1; }
  }
  // molas (trampolim)
  for(const sp of springs){ const c=sp.sq*6;
    ctx.fillStyle="#2a5a6a"; roundRect(sp.x+3,sp.y+8+c,sp.w-6,sp.h-10-c,5); ctx.fill();
    ctx.fillStyle="#9fe8ff"; roundRect(sp.x+2,sp.y+4+c,sp.w-4,7,4); ctx.fill();
    ctx.strokeStyle="rgba(159,232,255,.5)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(sp.x+7,sp.y+22); ctx.lineTo(sp.x+16,sp.y+13+c); ctx.lineTo(sp.x+25,sp.y+22); ctx.stroke(); }
  // portas / placas
  if(doors.length){ const open=plateOn();
    for(const d of doors){ ctx.fillStyle=open?"rgba(126,224,107,.12)":"#3a2b3a"; ctx.fillRect(d.x,d.y,d.w,d.h);
      if(!open){ctx.strokeStyle="#5a4560";ctx.lineWidth=2;ctx.strokeRect(d.x+2,d.y+2,d.w-4,d.h-4);} } }
  for(const p of plates){ const on=plateOn(); ctx.fillStyle=on?"#7ee06b":"#caa64a";
    ctx.fillRect(p.x+4,p.y+(on?TILE-6:TILE-8),p.w-8,on?4:6);
    ctx.fillStyle="rgba(0,0,0,.25)"; ctx.fillRect(p.x+4,p.y+TILE-2,p.w-8,2); }

  // plataformas móveis (jangada de gosma)
  for(const m of movers){
    const g=ctx.createLinearGradient(0,m.y,0,m.y+m.h);
    g.addColorStop(0,"#7fe0d0"); g.addColorStop(1,"#2f8f86");
    ctx.fillStyle=g; roundRect(m.x,m.y,m.w,m.h,8); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.25)"; roundRect(m.x+4,m.y+3,m.w*0.4,4,3); ctx.fill();
    ctx.fillStyle="#2f8f86"; for(let i=0;i<3;i++){ const dx=m.x+8+i*(m.w-16)/2;
      ctx.beginPath(); ctx.arc(dx,m.y+m.h,3+Math.sin(T*4+i)*1.2,0,Math.PI); ctx.fill(); } }

  // espinhos
  for(const s of spikes){ for(let i=0;i<4;i++){ const bx=s.x+i*8;
    const g=ctx.createLinearGradient(bx,s.y+8,bx,s.y+TILE); g.addColorStop(0,"#ff8f8f"); g.addColorStop(1,"#a03030");
    ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(bx,s.y+TILE); ctx.lineTo(bx+4,s.y+8); ctx.lineTo(bx+8,s.y+TILE); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.6)"; ctx.beginPath(); ctx.arc(bx+4,s.y+11,1,0,7); ctx.fill(); } }

  // gosmas (bobbing)
  for(const p of pickups){ const by=p.y+Math.sin(T*3+p.x)*3;
    ctx.save(); ctx.shadowColor="#a6f08a"; ctx.shadowBlur=12;
    ctx.fillStyle="#a6f08a"; ctx.beginPath(); ctx.arc(p.x,by,p.r,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle="rgba(255,255,255,.6)"; ctx.beginPath(); ctx.arc(p.x-3,by-3,2.4,0,7); ctx.fill(); }

  // estrelas VISÍVEIS (coletável dourado — o jogador SABE que estão lá)
  for(const st of stars){ if(st.got||!vis({x:st.x-16,y:st.y-16,w:32,h:32}))continue;
    const sy=st.y+Math.sin(T*2.5+st.x)*3;
    ctx.save(); ctx.translate(st.x,sy); ctx.rotate(Math.sin(T*1.2+st.x)*0.18);
    ctx.shadowColor="#ffd24a"; ctx.shadowBlur=16;
    const sg=ctx.createLinearGradient(0,-st.r,0,st.r); sg.addColorStop(0,"#fff0a8"); sg.addColorStop(1,"#f0a83a");
    ctx.fillStyle=sg; ctx.beginPath();
    for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?st.r*0.44:st.r*1.08;
      const x=Math.cos(a)*rr, y=Math.sin(a)*rr; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(-st.r*0.22,-st.r*0.22,st.r*0.24,0,7); ctx.fill();
    ctx.restore(); }

  // gemas = SEGREDOS ocultos (diamante roxo; só quem os acha por conta própria vê isto)
  for(const gm of gems){ if(gm.got||!vis({x:gm.x-16,y:gm.y-16,w:32,h:32}))continue;
    const gy=gm.y+Math.sin(T*2.5+gm.x)*3, r=gm.r;
    ctx.save(); ctx.translate(gm.x,gy); ctx.rotate(Math.sin(T*1.5+gm.x)*0.25);
    ctx.shadowColor="#c9a6ff"; ctx.shadowBlur=16;
    const gg=ctx.createLinearGradient(0,-r,0,r); gg.addColorStop(0,"#efe0ff"); gg.addColorStop(1,"#8a5fd0");
    ctx.fillStyle=gg; ctx.beginPath(); ctx.moveTo(0,-r); ctx.lineTo(r*0.8,0); ctx.lineTo(0,r); ctx.lineTo(-r*0.8,0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.7)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(-r*0.8,0); ctx.lineTo(r*0.8,0); ctx.stroke();
    ctx.restore(); }

  // inimigos: guardião (patrulha) e PERSEGUIDOR (fica vermelho e vibra quando te caça)
  for(const e of enemies){ const cx=e.x+e.w/2, cy=e.y+e.h/2, r=e.w/2;
    const mad=e.mad||0, spd=8+mad*10;
    ctx.save(); ctx.shadowColor=mad>0.1?`rgba(255,60,40,${0.5+mad*0.4})`:"rgba(255,90,60,.5)"; ctx.shadowBlur=10+mad*10;
    ctx.fillStyle = e.type==="chaser" ? (mad>0.1?"#ff3b2e":"#b0463c") : "#e0574b";
    ctx.beginPath(); for(let i=0;i<10;i++){ const rr=r*(i%2?0.72-mad*0.06:1.05+Math.sin(T*spd+i)*(0.06+mad*0.1));
      const a=i/10*6.283, x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.fillStyle="#fff"; const ed=(e.dir||1);
    ctx.beginPath(); ctx.arc(cx-4+ed*2,cy-2,2.6,0,7); ctx.arc(cx+5+ed*2,cy-2,2.6,0,7); ctx.fill();
    ctx.fillStyle=mad>0.4?"#5a0000":"#3a0a0a"; const pp=1.3+mad*0.5;
    ctx.beginPath(); ctx.arc(cx-4+ed*3,cy-2,pp,0,7); ctx.arc(cx+5+ed*3,cy-2,pp,0,7); ctx.fill();
    if(e.type==="chaser"&&mad>0.15){ ctx.strokeStyle=`rgba(255,80,60,${mad})`; ctx.lineWidth=1.4;   // sobrancelhas de bravo
      ctx.beginPath(); ctx.moveTo(cx-7,cy-6); ctx.lineTo(cx-1,cy-4); ctx.moveTo(cx+7,cy-6); ctx.lineTo(cx+1,cy-4); ctx.stroke(); }
    if(e.type==="chaser"&&(e.alert||0)>0.05&&mad<0.3){ ctx.fillStyle=`rgba(255,220,120,${e.alert})`;  // "!" ao acordar
      ctx.font="bold 12px sans-serif"; ctx.textAlign="center"; ctx.fillText("!",cx,cy-r-6); } }

  // portal de saída (anéis pulsantes + estrela)
  drawPortal(exitRect.x+exitRect.w/2, exitRect.y+exitRect.h/2);

  // pedaços
  for(const g of globs){ const a=g.solid?0.94:0.42;
    ctx.fillStyle=`rgba(120,210,105,${a})`; slime(g.x+g.w/2,g.y+g.h/2,g.w/2,g.h/2,0.05,g.x); ctx.fill();
    ctx.strokeStyle="rgba(60,140,60,.7)"; ctx.lineWidth=2; ctx.stroke(); }

  // halo de luz do blob (atmosfera)
  if(blob){ const cx=blob.x+blob.w/2, cy=blob.y+blob.h/2;
    ctx.save(); ctx.globalCompositeOperation="lighter";
    const lg=ctx.createRadialGradient(cx,cy,0,cx,cy,95);
    lg.addColorStop(0,"rgba(126,224,107,.15)"); lg.addColorStop(1,"rgba(126,224,107,0)");
    ctx.fillStyle=lg; ctx.fillRect(cx-95,cy-95,190,190); ctx.restore(); }

  drawBlob();

  for(const p of particles){ ctx.globalAlpha=Math.max(0,p.life/p.max); ctx.fillStyle=p.color;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill(); }
  ctx.globalAlpha=1;

  // vinheta
  ctx.setTransform(1,0,0,1,0,0);
  const vg=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.75);
  vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,.42)");
  ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
  // transição de entrada da fase (fade)
  if(transition>0){ ctx.fillStyle=`rgba(0,0,0,${transition})`; ctx.fillRect(0,0,W,H); }
}
function isSolidAt(px,py){ for(const s of solidTiles) if(px>=s.x&&px<s.x+s.w&&py>=s.y&&py<s.y+s.h) return true; return false; }

// ---- fundo em parallax (estilo plataforma) ----
function hillLayer(color, factor, baseY, spacing, height){
  const W=canvas.width, H=canvas.height;
  ctx.fillStyle=color;
  const off=-((cam.x*zoom*factor)%spacing), by=baseY - cam.y*zoom*0.06;
  ctx.beginPath(); ctx.moveTo(-spacing, H+2);
  for(let x=off-spacing; x<W+spacing; x+=spacing)
    ctx.quadraticCurveTo(x+spacing*0.5, by-height, x+spacing, by);
  ctx.lineTo(W+spacing, H+2); ctx.closePath(); ctx.fill();
}
function cloudShape(x,y,r){ ctx.beginPath();
  ctx.arc(x,y,r,0,7); ctx.arc(x+r*0.9,y+4,r*0.7,0,7); ctx.arc(x-r*0.9,y+5,r*0.66,0,7); ctx.arc(x+r*0.25,y-r*0.5,r*0.58,0,7); ctx.fill(); }
function peakLayer(color, factor, baseY, spacing, height){   // montanhas pontudas (silhueta)
  const W=canvas.width, H=canvas.height;
  ctx.fillStyle=color; const off=-((cam.x*zoom*factor)%spacing), by=baseY - cam.y*zoom*0.05;
  ctx.beginPath(); ctx.moveTo(-spacing, H+2);
  for(let x=off-spacing; x<W+spacing; x+=spacing){ ctx.lineTo(x+spacing*0.5, by-height); ctx.lineTo(x+spacing, by); }
  ctx.lineTo(W+spacing, H+2); ctx.closePath(); ctx.fill();
}
function drawParallax(th){
  const W=canvas.width, H=canvas.height, sc=W/640;
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,th.sky0); sky.addColorStop(1,th.sky1);
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  // estrelas / brilhos no céu (twinkle)
  for(let i=0;i<46;i++){ let sx=((i*137*sc - cam.x*zoom*0.06)%(W+30)); if(sx<-15)sx+=W+30;
    const y=((i*71)%Math.floor(H*0.66)), tw=0.3+0.7*Math.abs(Math.sin(T*1.6+i*1.3));
    ctx.globalAlpha=tw*0.5; ctx.fillStyle=`rgb(${th.cloud})`; const s=(i%7===0?2:1.2)*sc; ctx.fillRect(sx,y,s,s); }
  ctx.globalAlpha=1;
  // montanhas pontudas bem ao fundo
  peakLayer(th.far, 0.10, H*0.66, 240*sc, 220*sc);
  // morros arredondados distantes
  hillLayer(th.far, 0.18, H*0.70, 300*sc, 150*sc);
  // nuvens
  ctx.fillStyle=`rgba(${th.cloud},.15)`;
  for(let i=0;i<7;i++){ let x=((i*250*sc - (cam.x*zoom*0.26 + T*9*sc))%(W+340)); if(x<-170)x+=W+340;
    cloudShape(x, (30+(i*53)%130)*sc - cam.y*zoom*0.03, (22+(i%3)*12)*sc); }
  // morros médios
  hillLayer(th.mid, 0.38, H*0.84, 230*sc, 130*sc);
  // morros da frente (mais escuros e rápidos — profundidade)
  hillLayer(th.sky1, 0.62, H*0.98, 180*sc, 90*sc);
}
function drawPortal(cx,cy){
  ctx.save();
  for(let i=0;i<3;i++){ const r=10+i*5+Math.sin(T*2+i)*2, a=0.5-i*0.14;
    ctx.strokeStyle=`rgba(126,224,107,${a})`; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(cx,cy,r,0,7); ctx.stroke(); }
  ctx.shadowColor="#7ee06b"; ctx.shadowBlur=18; ctx.fillStyle="#7ee06b";
  ctx.beginPath(); ctx.arc(cx,cy,7,0,7); ctx.fill(); ctx.restore();
  // sparkles girando
  for(let i=0;i<4;i++){ const a=T*2+i*1.57, r=14; ctx.fillStyle="rgba(182,246,164,.9)";
    ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.6,0,7); ctx.fill(); }
  ctx.fillStyle="#07160e"; ctx.font="bold 13px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText("★",cx,cy+1);
}

// caminho de gosma (blob ondulado)
function slime(cx,cy,rx,ry,amp,seed){
  const N=18; ctx.beginPath();
  for(let i=0;i<=N;i++){ const a=(i/N)*Math.PI*2, w=1+amp*Math.sin(a*3+T*3+seed);
    const x=cx+Math.cos(a)*rx*w, y=cy+Math.sin(a)*ry*w; i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
  ctx.closePath();
}
// personagem: CUBO GELATINOSO estilo RPG (translúcido, face-topo 3D, bolhas, olhos)
function drawBlob(){
  const b=blob;
  const sq=Math.max(-0.18,Math.min(0.18,b.vy/4000)), jig=Math.sin(T*6)*0.02;
  const w=b.w*(1-sq*0.5+jig), h=b.h*(1+sq-jig);
  const x=b.x+(b.w-w)/2, y=b.y+(b.h-h), cx=x+w/2, r=Math.min(w,h)*0.22;
  const flashing=b.flash>0&&Math.floor(b.flash*20)%2===0;
  let a,bl;
  if(flashing){a="#ffc7c7";bl="#ff6a6a";}
  else if(b.melting){a="#ffd99a";bl="#d97a2a";}
  else if(b.cling){a="#bdf6ea";bl="#33b0a0";}
  else {a="#d6ffb4";bl="#59c948";}

  // sombra de contato
  ctx.fillStyle="rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(cx,b.y+b.h+2,w*0.42,5,0,0,7); ctx.fill();
  // corpo translúcido
  ctx.save(); ctx.shadowColor=b.melting?"rgba(255,150,70,.55)":"rgba(126,224,107,.5)"; ctx.shadowBlur=12;
  const gr=ctx.createLinearGradient(0,y,0,y+h); gr.addColorStop(0,a); gr.addColorStop(1,bl);
  ctx.globalAlpha=0.92; ctx.fillStyle=gr; roundRect(x,y,w,h,r); ctx.fill(); ctx.globalAlpha=1; ctx.restore();
  ctx.strokeStyle="rgba(255,255,255,.28)"; ctx.lineWidth=2; roundRect(x+1,y+1,w-2,h-2,r-1); ctx.stroke();
  // face-topo (dá o 3D de cubo)
  ctx.fillStyle="rgba(255,255,255,.20)"; roundRect(x+w*0.12,y+h*0.06,w*0.76,h*0.22,r*0.6); ctx.fill();
  // núcleo interno (volume de geleia)
  ctx.fillStyle="rgba(0,40,10,.10)"; roundRect(x+w*0.24,y+h*0.42,w*0.52,h*0.42,r*0.5); ctx.fill();
  // bolhas internas
  ctx.fillStyle="rgba(255,255,255,.32)";
  for(let i=0;i<3;i++){ const bx=x+w*(0.32+0.18*i)+Math.sin(T*1.5+i*2)*2, by=y+h*(0.5+0.13*i)+Math.cos(T*1.3+i)*2;
    ctx.beginPath(); ctx.arc(bx,by,1.5+i*0.6,0,7); ctx.fill(); }
  // specular
  ctx.fillStyle="rgba(255,255,255,.6)"; ctx.beginPath(); ctx.ellipse(x+w*0.3,y+h*0.24,w*0.15,h*0.09,-0.5,0,7); ctx.fill();
  // olhos
  const dir=b.vx>12?1:(b.vx<-12?-1:0), ex=w*0.2, ey=y+h*0.48, er=Math.max(2.6,w*0.1);
  const blink=b.blink<0.12;
  if(!blink){ ctx.fillStyle="#fff"; eye(cx-ex,ey,er); eye(cx+ex,ey,er);
    ctx.fillStyle="#0a2012"; pupil(cx-ex+dir*2,ey,er); pupil(cx+ex+dir*2,ey,er);
    ctx.fillStyle="rgba(255,255,255,.9)"; ctx.beginPath(); ctx.arc(cx-ex+dir*2-1,ey-1,er*0.22,0,7); ctx.arc(cx+ex+dir*2-1,ey-1,er*0.22,0,7); ctx.fill(); }
  else { ctx.strokeStyle="#0a2012"; ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cx-ex-er,ey);ctx.lineTo(cx-ex+er,ey);ctx.moveTo(cx+ex-er,ey);ctx.lineTo(cx+ex+er,ey);ctx.stroke(); }
  function eye(px,py,rr){ ctx.beginPath(); ctx.arc(px,py,rr,0,7); ctx.fill(); }
  function pupil(px,py,rr){ ctx.beginPath(); ctx.arc(px,py,rr*0.52,0,7); ctx.fill(); }
}
function roundRect(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

// ==========================================================================
// PARTÍCULAS / SOM / HUD / OVERLAY / DICA
// ==========================================================================
function burst(x,y,n,color,speed){ for(let i=0;i<n;i++){ const a=Math.random()*6.28,s=speed*(0.4+Math.random()*0.7);
  particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-speed*0.4,life:0.5+Math.random()*0.35,max:0.85,r:2+Math.random()*2.4,color}); }
  if(particles.length>260)particles.splice(0,particles.length-260); }
function updateParticles(dt){ for(let i=particles.length-1;i>=0;i--){ const p=particles[i];
  p.vy+=620*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt; if(p.life<=0)particles.splice(i,1); } }

let actx=null;
function audio(){ if(!actx){ try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } if(actx&&actx.state==="suspended")actx.resume(); return actx; }
function beep(a,f,t,d,ty,v){ const o=a.createOscillator(),g=a.createGain(); o.connect(g);g.connect(a.destination);
  o.type=ty||"triangle"; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(v||0.06,t); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.start(t);o.stop(t+d+0.02); }
function slideT(a,f0,f1,t,d,ty,v){ const o=a.createOscillator(),g=a.createGain(); o.connect(g);g.connect(a.destination);
  o.type=ty||"square"; o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+d);
  g.gain.setValueAtTime(v||0.06,t); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.start(t);o.stop(t+d+0.02); }
function sfx(type){ const a=actx; if(!a)return; const t=a.currentTime;
  switch(type){ case"jump":slideT(a,520,300,t,0.12,"square",0.05);break;
    case"absorb":slideT(a,300,640,t,0.14,"sine",0.06);break;
    case"pickup":slideT(a,680,940,t,0.12,"triangle",0.06);break;
    case"melt":slideT(a,220,150,t,0.10,"sawtooth",0.035);break;
    case"nope":slideT(a,170,120,t,0.10,"square",0.04);break;
    case"die":slideT(a,220,60,t,0.40,"sawtooth",0.06);break;
    case"spring":slideT(a,300,900,t,0.16,"sine",0.06);break;
    case"gem":[880,1180,1560].forEach((f,i)=>beep(a,f,t+i*0.06,0.09,"sine",0.05));break;
    case"star":[988,1319].forEach((f,i)=>beep(a,f,t+i*0.05,0.09,"triangle",0.055));break;
    case"secret":[523,659,880,1319].forEach((f,i)=>beep(a,f,t+i*0.10,0.16,"sine",0.055));break;   // acorde misterioso
    case"win":[523,659,784,1046].forEach((f,i)=>beep(a,f,t+i*0.09,0.10,"triangle",0.06));break; } }

function renderHud(){ el("level-name").textContent=level.name;
  const p=el("mass-pips"); p.innerHTML="";
  for(let i=0;i<level.max;i++){ const d=document.createElement("span"); d.className="pip"+(i<blob.mass?"":" empty"); p.appendChild(d); } }
function overlay(title,msg,btns,stars){ const o=el("overlay");
  o.innerHTML=`<h2>${title}</h2>${stars?`<div class="stars">${msg}</div>`:`<p>${msg}</p>`}<div class="row"></div>`;
  const row=o.querySelector(".row");
  btns.forEach(b=>{ const el2=document.createElement("button"); el2.textContent=b.t; if(b.ghost)el2.className="ghost";
    el2.addEventListener("click",()=>{audio();b.cb();}); row.appendChild(el2); });
  o.classList.remove("hidden"); }
function hideOverlay(){ el("overlay").classList.add("hidden"); }
let hintTimer; function showHint(t){ const e=el("hint"); if(!e)return; e.textContent=t||""; e.classList.add("show");
  clearTimeout(hintTimer); hintTimer=setTimeout(hideHint,6500); }
function hideHint(){ const e=el("hint"); if(e)e.classList.remove("show"); clearTimeout(hintTimer); }

// ==========================================================================
// LOOP
// ==========================================================================
function loop(ts){ const dt=Math.min(0.033,(ts-last)/1000||0); last=ts; update(dt);
  if(state!=="menu") render(); requestAnimationFrame(loop); }

// ==========================================================================
// ENTRADA (teclado + joystick + botões)
// ==========================================================================
const KEYMAP={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowDown:"down",KeyS:"down"};
const JUMPK={Space:1,ArrowUp:1,KeyW:1};
window.addEventListener("keydown",e=>{ if(e.repeat)return; audio();
  if(JUMPK[e.code]){e.preventDefault();jumpEdge=true;return;}
  if(e.code==="KeyE"){grabEdge=true;return;}
  if(e.code==="KeyR"){ if(state==="play"||state==="dead")resetLevel(); return; }
  if(e.code==="Escape"){ if(state!=="menu")showMenu(); return; }
  const k=KEYMAP[e.code]; if(k){e.preventDefault();IN.kb[k]=true;} });
window.addEventListener("keyup",e=>{ const k=KEYMAP[e.code]; if(k)IN.kb[k]=false; });
let rzT; window.addEventListener("resize",()=>{ clearTimeout(rzT); rzT=setTimeout(()=>{ if(state!=="menu"){ fitCanvas(); camFollow(true); } },120); });

// joystick
const stick=el("stick"), knob=el("knob"); let stickId=null,scx=0,scy=0; const SR=48;
function stickSet(cx,cy){ let dx=cx-scx,dy=cy-scy; const d=Math.hypot(dx,dy); if(d>SR){dx=dx/d*SR;dy=dy/d*SR;}
  knob.style.transform=`translate(${dx}px,${dy}px)`; IN.joyX=dx/SR; IN.joyY=dy/SR; }
function stickReset(){ stickId=null; IN.joyX=0;IN.joyY=0; knob.style.transform="translate(0,0)"; }
function centerFrom(){ const r=stick.getBoundingClientRect(); scx=r.left+r.width/2; scy=r.top+r.height/2; }
stick.addEventListener("touchstart",e=>{ e.preventDefault(); audio(); centerFrom();
  const t=e.changedTouches[0]; stickId=t.identifier; stickSet(t.clientX,t.clientY); },{passive:false});
stick.addEventListener("touchmove",e=>{ e.preventDefault(); for(const t of e.touches)if(t.identifier===stickId){stickSet(t.clientX,t.clientY);return;} },{passive:false});
stick.addEventListener("touchend",e=>{ e.preventDefault(); for(const t of e.changedTouches)if(t.identifier===stickId){stickReset();return;} },{passive:false});
stick.addEventListener("touchcancel",e=>{ stickReset(); },{passive:false});
stick.addEventListener("mousedown",e=>{ e.preventDefault(); audio(); centerFrom(); stickId="m"; stickSet(e.clientX,e.clientY);
  const mv=ev=>stickSet(ev.clientX,ev.clientY), up=()=>{stickReset();window.removeEventListener("mousemove",mv);window.removeEventListener("mouseup",up);};
  window.addEventListener("mousemove",mv); window.addEventListener("mouseup",up); });

// botões de ação
function bindAct(id,fn){ const b=el(id);
  const d=e=>{e.preventDefault();audio();fn();};
  b.addEventListener("touchstart",d,{passive:false}); b.addEventListener("mousedown",d); }
bindAct("btn-jump",()=>{ jumpEdge=true; });
bindAct("btn-grab",()=>{ grabEdge=true; });
el("btn-reset").addEventListener("click",()=>{ if(state==="play"||state==="dead")resetLevel(); });
el("btn-menu").addEventListener("click",showMenu);

// ==========================================================================
// BOOT
// ==========================================================================
showMenu();
requestAnimationFrame(loop);

// exposto p/ testes
window.G={ get state(){return state;}, get mass(){return blob?blob.mass:0;}, get globs(){return globs?globs.length:0;},
  get level(){return levelIndex;}, get blob(){return blob;}, get melting(){return !!(blob&&blob.melting);},
  get doorOpen(){return plateOn();}, start:startGame, menu:showMenu,
  get gems(){return gems?gems.length:0;}, get gemsGot(){return gems?gems.filter(g=>g.got).length:0;},
  get stars(){return stars?stars.length:0;}, get starsGot(){return stars?stars.filter(s=>s.got).length:0;},
  get enemies(){return enemies?enemies.length:0;}, get chasers(){return enemies?enemies.filter(e=>e.type==="chaser").length:0;},
  get fakes(){return fakes?fakes.length:0;}, get crumbles(){return crumbles?crumbles.length:0;},
  collectAt(gx,gy){ if(blob){ blob.x=gx-8; blob.y=gy-8; } } };
