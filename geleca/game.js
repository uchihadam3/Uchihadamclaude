/* =========================================================================
   GELECA — puzzle-platformer. Você é um blob grudento. Pular custa MASSA:
   cada pulo solta um pedaço seu, que fica grudado no lugar e vira um bloco
   sólido. Empilhe pedaços pra construir torres; reabsorva-os (E) pra
   recuperar massa; colete gosmas. Escale paredes. Chegue à saída.

   Tudo roda no navegador (Canvas 2D), sem backend.
   ========================================================================= */
"use strict";

// --------------------------------------------------------------------------
// CONSTANTES DE FÍSICA (px, segundos)
// --------------------------------------------------------------------------
const TILE = 32;
const GRAVITY = 1700;
const MOVE = 200;          // velocidade horizontal
const AIR = 0.75;          // controle no ar (fração)
const JUMP_V = 600;        // impulso do pulo
const CLIMB = 150;         // velocidade escalando parede
const GLOB = 26;           // lado do pedaço deixado
const REABSORB_R = 10;     // alcance pra reabsorver
const MAX_FALL = 900;

// --------------------------------------------------------------------------
// FASES  (#=sólido  @=início  E=saída  ^=espinho  o=gosma  P=placa  D=porta)
// cada fase: { name, mass, max, rows[] }  — linhas do mesmo tamanho.
// --------------------------------------------------------------------------
const LEVELS = [
  { name:"Fase 1 — O Custo", mass:4, max:4, rows:[
    "####################",
    "#                  #",
    "#                  #",
    "#         o        #",
    "#                  #",
    "# @           E    #",
    "######   ###########",
    "######   ###########",
    "######^^^###########",
    "######^^^###########",
    "####################",
  ]},
  { name:"Fase 2 — A Torre", mass:5, max:5, rows:[
    "####################",
    "#                  #",
    "#                  #",
    "#             E    #",
    "#          ######  #",
    "#                  #",
    "#                  #",
    "# @                #",
    "####################",
  ]},
  { name:"Fase 3 — O Poço", mass:6, max:6, rows:[
    "###########",
    "#      E  #",
    "#      #  #",
    "#         #",
    "#         #",
    "#         #",
    "#   o     #",
    "#         #",
    "#         #",
    "# @       #",
    "###########",
  ]},
  { name:"Fase 4 — Escalada", mass:5, max:5, rows:[
    "####################",
    "#                 E#",
    "#               ####",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "# @      ^^^       #",
    "####################",
  ]},
];

// --------------------------------------------------------------------------
// ESTADO
// --------------------------------------------------------------------------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let COLS, ROWS;
let level, solidTiles, spikes, pickups, plates, doors, exitRect, startPos;
let blob, globs, levelIndex = 0, state = "play"; // play | done | win
let last = 0;

// entrada
const keys = {};                 // segurados
let jumpEdge = false, grabEdge = false;

// --------------------------------------------------------------------------
// VALIDAÇÃO (avisa no console se uma fase não for retangular)
// --------------------------------------------------------------------------
(function validate(){
  LEVELS.forEach((L,i)=>{
    const w = L.rows[0].length;
    L.rows.forEach((r,y)=>{ if(r.length!==w) console.error(`LEVEL SHAPE: fase ${i+1} linha ${y} tem ${r.length}, esperado ${w}`); });
    if(!L.rows.join("").includes("@")) console.error(`LEVEL SHAPE: fase ${i+1} sem início @`);
    if(!L.rows.join("").includes("E")) console.error(`LEVEL SHAPE: fase ${i+1} sem saída E`);
  });
})();

// --------------------------------------------------------------------------
// CARREGAR FASE
// --------------------------------------------------------------------------
function loadLevel(idx){
  level = LEVELS[idx];
  ROWS = level.rows.length; COLS = level.rows[0].length;
  canvas.width = COLS*TILE; canvas.height = ROWS*TILE;
  solidTiles = []; spikes = []; pickups = []; plates = []; doors = [];
  for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++){
    const ch = level.rows[y][x];
    const r = { x:x*TILE, y:y*TILE, w:TILE, h:TILE };
    if(ch==="#") solidTiles.push(r);
    else if(ch==="^") spikes.push(r);
    else if(ch==="o") pickups.push({ x:x*TILE+TILE/2, y:y*TILE+TILE/2, r:9 });
    else if(ch==="P") plates.push(r);
    else if(ch==="D") doors.push(r);
    else if(ch==="E") exitRect = { x:x*TILE+4, y:y*TILE+2, w:TILE-8, h:TILE-4 };
    else if(ch==="@") startPos = { x:x*TILE, y:y*TILE };
  }
  resetLevel();
}

function resetLevel(){
  globs = [];
  blob = { x:startPos.x, y:startPos.y, w:0, h:0, vx:0, vy:0,
           onGround:false, wall:0, cling:false, mass:level.mass, flash:0, clingLock:0 };
  sizeBlob();
  // alinha a base no chão
  blob.y = startPos.y + TILE - blob.h;
  state = "play";
  hideOverlay();
  renderHud();
}

// tamanho do blob a partir da massa (mantém base e centro ao redimensionar)
function sizeBlob(){
  const s = 16 + blob.mass*4;
  const cx = blob.x + blob.w/2, bottom = blob.y + blob.h;
  blob.w = s; blob.h = s;
  blob.x = cx - s/2; blob.y = bottom - s;
}

// --------------------------------------------------------------------------
// COLISÃO
// --------------------------------------------------------------------------
function overlaps(a,b){ return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y; }

function solidsList(){
  const list = solidTiles.slice();
  for(const g of globs) if(g.solid) list.push(g);
  // portas fechadas (placa não pressionada) contam como sólidas
  if(doors.length){
    const pressed = plateIsPressed();
    if(!pressed) for(const d of doors) list.push(d);
  }
  return list;
}

function plateIsPressed(){
  if(!plates.length) return false;
  for(const p of plates){
    if(overlaps(blob, {x:p.x,y:p.y-4,w:p.w,h:p.h})) return true;
    for(const g of globs) if(g.solid && overlaps(g,{x:p.x,y:p.y-4,w:p.w,h:p.h})) return true;
  }
  return false;
}

function moveAxis(dx, dy){
  const list = solidsList();
  blob.x += dx;
  for(const s of list){
    if(overlaps(blob, s)){
      if(dx>0){ blob.x = s.x - blob.w; blob.wall = 1; }
      else if(dx<0){ blob.x = s.x + s.w; blob.wall = -1; }
      blob.vx = 0;
    }
  }
  blob.y += dy;
  for(const s of list){
    if(overlaps(blob, s)){
      if(dy>0){ blob.y = s.y - blob.h; blob.onGround = true; blob.vy = 0; }
      else if(dy<0){ blob.y = s.y + s.h; blob.vy = 0; }
    }
  }
}

// --------------------------------------------------------------------------
// UPDATE
// --------------------------------------------------------------------------
function update(dt){
  if(state !== "play"){ jumpEdge=grabEdge=false; return; }
  if(blob.flash>0) blob.flash -= dt;
  if(blob.clingLock>0) blob.clingLock -= dt;

  const left = keys["left"], right = keys["right"], down = keys["down"];
  const onGround = blob.onGroundPrev;         // contato do frame anterior
  const wall = blob.wallPrev || 0;

  // --- grudar na parede: airborne + segurando a direção CONTRA a parede ---
  let clinging = false;
  if(!onGround && wall!==0 && blob.clingLock<=0){
    const into = (wall>0 && right) || (wall<0 && left);
    if(into) clinging = true;
  }
  blob.cling = clinging;

  // horizontal
  const control = onGround ? 1 : AIR;
  if(clinging) blob.vx = 0;
  else if(left && !right) blob.vx = -MOVE*control;
  else if(right && !left) blob.vx = MOVE*control;
  else blob.vx *= onGround ? 0.6 : 0.92;

  // vertical
  if(clinging){
    blob.vy = down ? CLIMB : -CLIMB;          // segurando contra a parede = sobe; ↓ = desce
  } else {
    blob.vy += GRAVITY*dt;
    if(blob.vy > MAX_FALL) blob.vy = MAX_FALL;
  }

  // --- pulo (custa massa, solta pedaço) ---
  if(jumpEdge){
    if((onGround || clinging) && blob.mass > 1){
      dropGlob(clinging ? wall : 0);
      blob.mass -= 1; sizeBlob();
      blob.vy = -JUMP_V;
      if(clinging){ blob.vx = -wall * MOVE*0.9; blob.clingLock = 0.18; }
      renderHud();
    } else if(blob.mass <= 1){
      blob.flash = 0.2;                        // massa insuficiente — pisca
    }
  }
  jumpEdge = false;

  // --- reabsorver pedaço (E) ---
  if(grabEdge){ reabsorb(); grabEdge = false; }

  // integra movimento com colisão (zera contatos, moveAxis os redetecta)
  blob.onGround = false; blob.wall = 0;
  moveAxis(blob.vx*dt, blob.vy*dt);
  blob.onGroundPrev = blob.onGround;
  blob.wallPrev = blob.wall;

  // ativa novos globs após a graça de spawn
  const now = performance.now();
  for(const g of globs) if(!g.solid && now >= g.solidAt) g.solid = true;

  // gosmas
  for(let i=pickups.length-1;i>=0;i--){
    const p = pickups[i];
    if(overlaps(blob, {x:p.x-p.r,y:p.y-p.r,w:p.r*2,h:p.r*2})){
      if(blob.mass < level.max){ blob.mass++; sizeBlob(); }
      pickups.splice(i,1); renderHud();
    }
  }

  // espinhos → reinicia a fase
  for(const s of spikes) if(overlaps(blob, {x:s.x+4,y:s.y+6,w:s.w-8,h:s.h-6})){ die(); return; }

  // caiu do mapa
  if(blob.y > ROWS*TILE + 80){ die(); return; }

  // chegou na saída
  if(overlaps(blob, exitRect)) winLevel();
}

function dropGlob(wallSide){
  // pedaço fica grudado onde o blob estava (base do blob), sólido após breve graça
  const g = { x: blob.x + blob.w/2 - GLOB/2, y: blob.y + blob.h - GLOB,
              w: GLOB, h: GLOB, solid:false, solidAt: performance.now()+120, wall: wallSide };
  if(wallSide>0) g.x = blob.x + blob.w - GLOB;      // gruda no lado direito
  else if(wallSide<0) g.x = blob.x;                 // gruda no lado esquerdo
  globs.push(g);
}

function reabsorb(){
  if(blob.mass >= level.max) return;
  // acha o pedaço mais próximo (sobreposto ou logo abaixo dos pés)
  let best=-1, bestd=1e9;
  const foot = { x:blob.x-REABSORB_R, y:blob.y-REABSORB_R, w:blob.w+REABSORB_R*2, h:blob.h+REABSORB_R*2 };
  for(let i=0;i<globs.length;i++){
    const g = globs[i]; if(!g.solid) continue;
    if(overlaps(foot, g)){
      const dx = (g.x+g.w/2)-(blob.x+blob.w/2), dy=(g.y)-(blob.y+blob.h);
      const d = dx*dx+dy*dy; if(d<bestd){ bestd=d; best=i; }
    }
  }
  if(best>=0){
    globs.splice(best,1);
    blob.mass++; sizeBlob();
    blob.flash = 0.12;
    renderHud();
  }
}

function die(){
  blob.flash = 1;
  state = "done";
  showOverlay("💥 Ai!", "Você tocou num espinho ou caiu.", "Tentar de novo", resetLevel);
}

function winLevel(){
  state = "done";
  if(levelIndex >= LEVELS.length-1){
    showOverlay("🏆 Você venceu!", "Zerou todas as fases da GELECA. Quer tentar de novo?", "Jogar de novo", ()=>{ levelIndex=0; loadLevel(0); });
  } else {
    showOverlay("✅ Fase completa!", "Bom sacrifício. Bora pra próxima?", "Próxima fase", ()=>{ levelIndex++; loadLevel(levelIndex); });
  }
}

// --------------------------------------------------------------------------
// RENDER
// --------------------------------------------------------------------------
function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // fundo sutil
  ctx.fillStyle = "#0a1216"; ctx.fillRect(0,0,canvas.width,canvas.height);

  // tiles sólidos
  for(const s of solidTiles){
    ctx.fillStyle = "#20343b"; ctx.fillRect(s.x,s.y,s.w,s.h);
    ctx.fillStyle = "#2c454d"; ctx.fillRect(s.x,s.y,s.w,4);
  }
  // portas
  if(doors.length){
    const open = plateIsPressed();
    for(const d of doors){ ctx.fillStyle = open ? "rgba(126,224,107,.15)" : "#3a2b3a"; ctx.fillRect(d.x,d.y,d.w,d.h); }
  }
  // placas
  for(const p of plates){ ctx.fillStyle = "#caa64a"; ctx.fillRect(p.x+4,p.y+TILE-8,p.w-8,6); }

  // espinhos
  ctx.fillStyle = "#c85a5a";
  for(const s of spikes){
    for(let i=0;i<4;i++){
      const bx = s.x + i*(TILE/4);
      ctx.beginPath(); ctx.moveTo(bx, s.y+TILE); ctx.lineTo(bx+TILE/8, s.y+8); ctx.lineTo(bx+TILE/4, s.y+TILE); ctx.fill();
    }
  }
  // gosmas
  for(const p of pickups){
    ctx.fillStyle = "#a6f08a"; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.beginPath(); ctx.arc(p.x-3,p.y-3,2.5,0,7); ctx.fill();
  }
  // saída
  const ex = exitRect;
  ctx.save();
  ctx.shadowColor = "#7ee06b"; ctx.shadowBlur = 16;
  ctx.fillStyle = "#7ee06b"; roundRect(ex.x,ex.y,ex.w,ex.h,6); ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#0a1a12"; ctx.font = "bold 18px Fredoka, sans-serif";
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText("★", ex.x+ex.w/2, ex.y+ex.h/2+1);

  // pedaços deixados
  for(const g of globs){
    ctx.fillStyle = g.solid ? "rgba(120,210,105,.92)" : "rgba(120,210,105,.4)";
    roundRect(g.x,g.y,g.w,g.h,7); ctx.fill();
    ctx.strokeStyle = "rgba(60,140,60,.7)"; ctx.lineWidth=2; roundRect(g.x,g.y,g.w,g.h,7); ctx.stroke();
  }

  drawBlob();
}

function drawBlob(){
  const b = blob;
  // squash & stretch pela velocidade vertical
  const sq = Math.max(-0.18, Math.min(0.18, b.vy/4000));
  const w = b.w*(1-sq), h = b.h*(1+sq);
  const x = b.x + (b.w-w)/2, y = b.y + (b.h-h);
  const flashing = b.flash>0 && Math.floor(b.flash*20)%2===0;
  ctx.save();
  ctx.shadowColor = "rgba(126,224,107,.6)"; ctx.shadowBlur = 10;
  ctx.fillStyle = flashing ? "#ff8a8a" : (b.cling ? "#6fd6c0" : "#7ee06b");
  roundRect(x,y,w,h,Math.min(w,h)*0.32); ctx.fill();
  ctx.restore();
  // brilho
  ctx.fillStyle = "rgba(255,255,255,.35)"; roundRect(x+4,y+4,w*0.35,h*0.28,4); ctx.fill();
  // olhos
  const eye = Math.max(2.5, w*0.09), dir = b.vx>10?1:(b.vx<-10?-1:0);
  ctx.fillStyle="#0a1a12";
  ctx.beginPath(); ctx.arc(x+w*0.36+dir*2, y+h*0.42, eye,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(x+w*0.64+dir*2, y+h*0.42, eye,0,7); ctx.fill();
}

function roundRect(x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}

// --------------------------------------------------------------------------
// HUD / OVERLAY
// --------------------------------------------------------------------------
function renderHud(){
  document.getElementById("level-name").textContent = level.name;
  const pips = document.getElementById("mass-pips"); pips.innerHTML = "";
  for(let i=0;i<level.max;i++){
    const d = document.createElement("span");
    d.className = "pip" + (i < blob.mass ? "" : " empty");
    pips.appendChild(d);
  }
}
function showOverlay(title, msg, btn, cb){
  const o = document.getElementById("overlay");
  o.innerHTML = `<h2>${title}</h2><p>${msg}</p><button>${btn}</button>`;
  o.classList.remove("hidden");
  o.querySelector("button").addEventListener("click", cb);
}
function hideOverlay(){ document.getElementById("overlay").classList.add("hidden"); }

// --------------------------------------------------------------------------
// LOOP
// --------------------------------------------------------------------------
function loop(ts){
  const dt = Math.min(0.033, (ts-last)/1000 || 0); last = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

// --------------------------------------------------------------------------
// ENTRADA
// --------------------------------------------------------------------------
const KEYMAP = {                                   // teclas SEGURADAS (movimento)
  ArrowLeft:"left", KeyA:"left", ArrowRight:"right", KeyD:"right",
  ArrowDown:"down", KeyS:"down",
};
const JUMP_CODES = { Space:1, ArrowUp:1, KeyW:1 };  // ↑/W/Espaço = pular
function press(k){
  if(k==="jump"){ jumpEdge = true; return; }
  if(k==="grab"){ grabEdge = true; return; }
  if(k==="reset"){ resetLevel(); return; }
  keys[k] = true;
}
function release(k){ keys[k] = false; }

window.addEventListener("keydown", e=>{
  if(e.repeat) return;
  if(JUMP_CODES[e.code]){ e.preventDefault(); press("jump"); return; }
  if(e.code==="KeyE"){ press("grab"); return; }
  if(e.code==="KeyR"){ press("reset"); return; }
  const k = KEYMAP[e.code];
  if(k){ e.preventDefault(); press(k); }
});
window.addEventListener("keyup", e=>{
  const k = KEYMAP[e.code]; if(k) release(k);
});

// touch (▲ = pular)
document.querySelectorAll("#touch button").forEach(btn=>{
  const k = btn.dataset.k;
  const down = e=>{ e.preventDefault(); if(k==="up"||k==="jump")press("jump"); else if(k==="grab")press("grab"); else press(k); };
  const up = e=>{ e.preventDefault(); if(k==="down"||k==="left"||k==="right") release(k); };
  btn.addEventListener("touchstart", down, {passive:false});
  btn.addEventListener("touchend", up, {passive:false});
  btn.addEventListener("mousedown", down);
  btn.addEventListener("mouseup", up);
});

document.getElementById("btn-reset").addEventListener("click", resetLevel);

// --------------------------------------------------------------------------
// BOOT
// --------------------------------------------------------------------------
loadLevel(0);
requestAnimationFrame(loop);

// exposto p/ testes automatizados
window.G = {
  get state(){ return state; },
  get mass(){ return blob.mass; },
  get globs(){ return globs.length; },
  get level(){ return levelIndex; },
  get blob(){ return blob; },
  nextReady(){ return state==="done"; },
};
