'use strict';
/* ===================================================================
   MASMORRA ETERNA — dungeon crawler de 1ª pessoa + combate por turnos
   Renderizador raycaster (passos de grade) · geração procedural com
   segredos · combate estratégico: Quebra, Resolve, elementos, status.
=================================================================== */

/* ---------- util ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const rnd=(a,b)=>a+Math.random()*(b-a);
const rint=(a,b)=>Math.floor(rnd(a,b+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const chance=p=>Math.random()<p;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ================= ÁUDIO (sintetizado) ================= */
const AU={ctx:null,master:null,music:null,muted:false,timer:null};
function auInit(){ if(AU.ctx)return; try{
  AU.ctx=new (window.AudioContext||window.webkitAudioContext)();
  AU.master=AU.ctx.createGain(); AU.master.gain.value=0.6; AU.master.connect(AU.ctx.destination);
  AU.music=AU.ctx.createGain(); AU.music.gain.value=0.32; AU.music.connect(AU.master);
}catch(e){} }
function beep(freq,dur,type='square',vol=0.2,slide=0,dest){ if(!AU.ctx||AU.muted)return;
  const t=AU.ctx.currentTime,o=AU.ctx.createOscillator(),g=AU.ctx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t); if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,freq+slide),t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(dest||AU.master); o.start(t); o.stop(t+dur+0.02);
}
function noise(dur,vol=0.25,filt=1200){ if(!AU.ctx||AU.muted)return;
  const t=AU.ctx.currentTime,n=Math.floor(AU.ctx.sampleRate*dur),buf=AU.ctx.createBuffer(1,n,AU.ctx.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
  const s=AU.ctx.createBufferSource();s.buffer=buf;const f=AU.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=filt;
  const g=AU.ctx.createGain();g.gain.value=vol; s.connect(f);f.connect(g);g.connect(AU.master);s.start();
}
const SFX={
  step(){beep(120,0.06,'square',0.08,-30);},
  bump(){beep(70,0.12,'sawtooth',0.12,-20);noise(0.08,0.08,600);},
  door(){beep(180,0.18,'square',0.1,-60);noise(0.15,0.1,900);},
  chest(){beep(500,0.09,'square',0.18);setTimeout(()=>beep(760,0.14,'square',0.18),90);setTimeout(()=>beep(1020,0.18,'triangle',0.16),200);},
  secret(){beep(300,0.1,'triangle',0.16,200);setTimeout(()=>beep(600,0.16,'triangle',0.16,300),110);},
  heal(){beep(520,0.1,'sine',0.16,180);setTimeout(()=>beep(780,0.16,'sine',0.14,120),90);},
  hit(){noise(0.12,0.22,1600);beep(160,0.09,'square',0.14,-60);},
  crit(){noise(0.16,0.3,2600);beep(220,0.12,'sawtooth',0.18,-120);},
  weak(){noise(0.14,0.26,3200);beep(340,0.12,'square',0.18,-80);},
  brk(){beep(200,0.05,'square',0.2);setTimeout(()=>beep(90,0.3,'sawtooth',0.24,-40),40);noise(0.3,0.24,2000);},
  cast(){beep(300,0.14,'triangle',0.12,260);},
  fire(){noise(0.3,0.24,2400);beep(120,0.24,'sawtooth',0.16,80);},
  ice(){beep(900,0.12,'triangle',0.14,-200);beep(1300,0.1,'sine',0.1);},
  bolt(){noise(0.09,0.3,5000);beep(1600,0.06,'square',0.14,-1200);},
  holy(){beep(660,0.14,'sine',0.14,220);setTimeout(()=>beep(990,0.2,'sine',0.12),80);},
  dark(){beep(150,0.3,'sawtooth',0.18,-40);},
  miss(){beep(300,0.08,'square',0.08,-120);},
  down(){beep(200,0.4,'sawtooth',0.2,-140);},
  win(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,0.2,'triangle',0.2),i*130));},
  lvup(){[523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>beep(f,0.16,'square',0.16),i*80));},
  ui(){beep(440,0.05,'square',0.1);},
  back(){beep(300,0.05,'square',0.08,-40);},
};
/* música ambiente simples por contexto */
function musicStart(mode){ if(!AU.ctx)return; musicStop();
  const scaleExp=[0,3,5,7,10,12], scaleBat=[0,2,3,5,7,8,10];
  const root=mode==='battle'?110:82, sc=mode==='battle'?scaleBat:scaleExp, step=mode==='battle'?0.42:0.9;
  let i=0;
  AU.timer=setInterval(()=>{ if(AU.muted)return;
    const n=sc[Math.floor(Math.random()*sc.length)]+ (chance(.3)?12:0);
    const f=root*Math.pow(2,n/12);
    beep(f,step*0.9,mode==='battle'?'sawtooth':'triangle',0.05,0,AU.music);
    if(i%4===0)beep(root/2*Math.pow(2,(sc[0])/12),step*3,'sine',0.06,0,AU.music);
    if(mode==='battle'&&i%2===0)beep(root*2,step*0.4,'square',0.03,0,AU.music);
    i++;
  }, step*1000);
}
function musicStop(){ if(AU.timer){clearInterval(AU.timer);AU.timer=null;} }

/* ================= PIXEL ART HELPERS ================= */
function px(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
// desenha sprite a partir de mapa de strings + paleta
function drawMap(ctx,ox,oy,s,map,pal){
  for(let y=0;y<map.length;y++){const row=map[y];for(let x=0;x<row.length;x++){const ch=row[x];if(ch===' '||ch==='.')continue;const c=pal[ch];if(!c)continue;ctx.fillStyle=c;ctx.fillRect(ox+x*s,oy+y*s,s,s);}}
}

/* ================= TEXTURAS DO RAYCASTER ================= */
const TW=64;
function abgr(r,g,b){return (255<<24)|((b&255)<<16)|((g&255)<<8)|(r&255);}
function hash2(a,b){ let h=(a*374761393+b*668265263)|0; h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967295; }
function shade(c,f){ const r=(c&255),g=(c>>8)&255,b=(c>>16)&255; return abgr(clamp(r*f|0,0,255),clamp(g*f|0,0,255),clamp(b*f|0,0,255)); }
function mkTex(fn){ const a=new Uint32Array(TW*TW); fn((x,y,c)=>{a[y*TW+x]=c;}); return a; }
let TEX={};
function buildTextures(){
  // pedra / tijolo cinza — tijolos GRANDES e limpos, rejunte escuro, relevo
  TEX.wall=mkTex(set=>{
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const bH=16, row=Math.floor(y/bH), off=(row%2)?16:0, bx=x+off, col=Math.floor(bx/32);
      const inX=bx%32, inY=y%bH, mortar=inX<2||inY<2;
      let r,g,b;
      if(mortar){ const m=30+hash2(x,y)*6; r=m*0.95;g=m*0.92;b=m*0.86; }
      else{
        let base=100+hash2(row*13+7,col*17+3)*40;         // variação por TIJOLO (não por pixel)
        if(inY<3)base+=18; else if(inY>=bH-3)base-=16;      // relevo topo/baixo
        if(inX<4)base+=10; else if(inX>=28)base-=10;
        base+=hash2(x*2,y*2)*8-4;                           // grão bem sutil
        if(hash2(row*7+2,col*11+5)<0.10)base-=30;           // tijolo mais escuro ocasional
        r=base*1.0;g=base*0.95;b=base*0.83;
        if(hash2(row*31,col*29)<0.07 && inY>bH*0.5){r=base*0.5;g=base*0.72;b=base*0.42;} // musgo raro na base
      }
      set(x,y,abgr(clamp(r|0,0,255),clamp(g|0,0,255),clamp(b|0,0,255)));
    }
  });
  // porta de madeira — tábuas limpas, moldura de pedra, ferro
  TEX.door=mkTex(set=>{
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      let r,g,b;
      const frame=x<7||x>=57||y<4||y>=60;
      if(frame){ const m=44+hash2(Math.floor(x/8),Math.floor(y/8))*20; r=m;g=m*0.95;b=m*0.85; }
      else{
        const px2=x-7,pw=50, plank=Math.floor(px2/12.5), edge=(px2%12.5)<1.4;
        let base=78+plank*4+Math.sin(y*0.5+plank*2)*5+hash2(plank*3,Math.floor(y/6))*10;
        if(edge)base*=0.55;
        r=base*1.0;g=base*0.6;b=base*0.3;
        // ferragens horizontais
        if(y>14&&y<19||y>44&&y<49){ r=70;g=72;b=80; if((x%10<2)){r=150;g=150;b=160;} }
      }
      set(x,y,abgr(clamp(r|0,0,255),clamp(g|0,0,255),clamp(b|0,0,255)));
    }
  });
  // arco/segredo revelado (parede escura com abertura)
  TEX.arch=mkTex(set=>{ for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){ set(x,y,abgr(18,16,22)); } });
  // chão — lajotas de pedra limpas (2 por célula) com rejunte
  TEX.floor=mkTex(set=>{
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const t=32,gx=Math.floor(x/t),gy=Math.floor(y/t),chk=(gx+gy)&1,inX=x%t,inY=y%t;
      const grout=inX<2||inY<2;
      let base;
      if(grout)base=20; else{ base=48+(chk?10:0)+hash2(gx*5+1,gy*7+2)*14; base+=(inY<4?6:inY>t-4?-6:0); }
      set(x,y,abgr(clamp(base*0.9|0,0,255),clamp(base*0.9|0,0,255),clamp(base*0.8|0,0,255)));
    }
  });
  // teto — pedra bem escura
  TEX.ceil=mkTex(set=>{
    for(let y=0;y<TW;y++)for(let x=0;x<TW;x++){
      const bH=16, row=Math.floor(y/bH), off=(row%2)?16:0, bx=x+off, inX=bx%32, inY=y%bH, mortar=inX<2||inY<2;
      let base=mortar?12:(30+hash2(row*3,Math.floor(bx/32)*5)*10);
      set(x,y,abgr(clamp(base*0.82|0,0,255),clamp(base*0.86|0,0,255),clamp(base|0,0,255)));
    }
  });
  // baú (marcador na parede não usado; chests via evento)
}

/* ================= RAYCASTER ================= */
const RC={cv:null,ctx:null,RW:360,RH:230,img:null,buf:null,zbuf:null};
function rcInit(){
  RC.cv=$('#view'); RC.ctx=RC.cv.getContext('2d');
  RC.cv.width=RC.RW; RC.cv.height=RC.RH;
  RC.img=RC.ctx.createImageData(RC.RW,RC.RH); RC.buf=new Uint32Array(RC.img.data.buffer);
}
function rcRender(px,py,ang){
  const {RW,RH,buf}=RC;
  const dirX=Math.cos(ang),dirY=Math.sin(ang), plane=0.66, planeX=-dirY*plane,planeY=dirX*plane;
  const posX=px,posY=py, horizon=RH/2, posZ=0.5*RH;
  const flick=0.98+Math.sin(performance.now()/160)*0.02+Math.random()*0.012;
  // teto + chão (floorcasting Lodev)
  const rdx0=dirX-planeX, rdy0=dirY-planeY, rdx1=dirX+planeX, rdy1=dirY+planeY;
  for(let y=Math.floor(horizon)+1;y<RH;y++){
    const p=y-horizon, rowDist=posZ/p;
    const stepX=rowDist*(rdx1-rdx0)/RW, stepY=rowDist*(rdy1-rdy0)/RW;
    let fx=posX+rowDist*rdx0, fy=posY+rowDist*rdy0;
    const fog=clamp((1.12-rowDist*0.13)*flick,0.1,0.98);
    const yc=Math.floor(horizon-(y-horizon)); // teto espelhado
    for(let x=0;x<RW;x++){
      const tx=((fx-Math.floor(fx))*TW)&63, ty=((fy-Math.floor(fy))*TW)&63;
      buf[y*RW+x]=shade(TEX.floor[ty*TW+tx],fog);
      if(yc>=0)buf[yc*RW+x]=shade(TEX.ceil[ty*TW+tx],fog);
      fx+=stepX; fy+=stepY;
    }
  }
  // paredes (DDA)
  for(let x=0;x<RW;x++){
    const camX=2*x/RW-1, rdx=dirX+planeX*camX, rdy=dirY+planeY*camX;
    let mapX=Math.floor(posX),mapY=Math.floor(posY);
    const ddx=Math.abs(1/rdx),ddy=Math.abs(1/rdy);
    let stepX,stepY,sdx,sdy;
    if(rdx<0){stepX=-1;sdx=(posX-mapX)*ddx;}else{stepX=1;sdx=(mapX+1-posX)*ddx;}
    if(rdy<0){stepY=-1;sdy=(posY-mapY)*ddy;}else{stepY=1;sdy=(mapY+1-posY)*ddy;}
    let side=0,hit=0,tile='#',guard=0;
    while(hit===0 && guard++<40){
      if(sdx<sdy){sdx+=ddx;mapX+=stepX;side=0;}else{sdy+=ddy;mapY+=stepY;side=1;}
      tile=tileVisual(mapX,mapY);
      if(tile!=='.'&&tile!=='X') hit=1; // X = passagem revelada (não bloqueia visão? tratamos como abertura escura)
    }
    let perp=side===0?(sdx-ddx):(sdy-ddy); if(perp<0.01)perp=0.01;
    RC.zbuf&&(RC.zbuf[x]=perp);
    const lh=Math.floor(RH/perp);
    let dS=-lh/2+RH/2|0, dE=lh/2+RH/2|0; const drawS=Math.max(0,dS),drawE=Math.min(RH-1,dE);
    let wallX=side===0?posY+perp*rdy:posX+perp*rdx; wallX-=Math.floor(wallX);
    let texX=(wallX*TW)|0; if((side===0&&rdx>0)||(side===1&&rdy<0))texX=TW-texX-1; texX&=63;
    let tex=TEX.wall; if(tile==='+')tex=TEX.door; else if(tile==='A')tex=TEX.arch;
    const fog=clamp(1.42-perp*0.13,0.16,1.24)*(side===1?0.6:1)*flick;
    const stepTex=TW/lh; let texPos=(drawS-RH/2+lh/2)*stepTex;
    for(let y=drawS;y<=drawE;y++){ const ty=((texPos)|0)&63; texPos+=stepTex; buf[y*RW+x]=shade(tex[ty*TW+texX],fog); }
  }
  RC.ctx.putImageData(RC.img,0,0);
}

/* ================= ESTADO / MASMORRA ================= */
const G={
  gp:0, floor:1, maxFloor:1, party:[], inv:{}, flags:{},
  dun:null, // floor atual
  px:1.5,py:1.5,dir:0, // pos jogador (centro célula)
  ang:0, tang:0, tx:1.5,ty:1.5, moving:false,
  explored:null, seen:null,
  state:'title', // title/explore/battle/dead/win
  stepsSince:0, encRate:0.11,
  kills:0, steps:0, depth:1,
  battle:null, resolver:null,
  scenes:{}, // floors cache p/ subir escada
};
const DIRV=[[0,-1],[1,0],[0,1],[-1,0]]; // N E S O (dx,dy) na grade
// visual tile p/ raycaster
function tileVisual(x,y){
  const d=G.dun; if(!d||x<0||y<0||x>=d.w||y>=d.h)return '#';
  const t=d.grid[y][x];
  if(t==='#')return '#';
  if(t==='S'){ return d.secretsRevealed.has(x+','+y)?'A':'#'; }
  if(t==='+'){ return d.doorsOpen.has(x+','+y)?'.':'+'; }
  // demais (. > < C F E B) são chão
  return '.';
}
function isSolid(x,y){ const v=tileVisual(x,y); return v==='#'||v==='+'; }

/* -------- geração procedural -------- */
function genFloor(depth){
  const W=15,H=13; // ímpares
  const grid=[]; for(let y=0;y<H;y++){grid.push(new Array(W).fill('#'));}
  function carve(cx,cy){ grid[cy][cx]='.';
    for(const[dx,dy] of shuffle([[0,-2],[0,2],[-2,0],[2,0]])){
      const nx=cx+dx,ny=cy+dy;
      if(nx>0&&ny>0&&nx<W-1&&ny<H-1&&grid[ny][nx]==='#'){ grid[cy+dy/2][cx+dx/2]='.'; carve(nx,ny); }
    }
  }
  carve(1,1);
  // braid leve: liga alguns becos a corredores vizinhos (mantém largura 1 = visual de corredor)
  for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){
    if(grid[y][x]!=='.')continue;
    let n=0; for(const[dx,dy] of DIRV) if(grid[y+dy][x+dx]==='.')n++;
    if(n===1 && chance(0.32)){ // beco sem saída → abre 1 ligação
      const opts=[]; for(const[dx,dy] of DIRV){ const wx=x+dx,wy=y+dy,ox=x+dx*2,oy=y+dy*2;
        if(grid[wy]&&grid[wy][wx]==='#'&&grid[oy]&&grid[oy][ox]==='.'&&ox>0&&oy>0&&ox<W-1&&oy<H-1)opts.push([wx,wy]); }
      if(opts.length){ const[wx,wy]=pick(opts); grid[wy][wx]='.'; }
    }
  }
  // lista de células abertas
  const cells=[]; for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(grid[y][x]==='.')cells.push([x,y]);
  // spawn = canto sup esq, virado para o corredor aberto
  const spawn=cells.reduce((a,b)=>(a[0]+a[1]<=b[0]+b[1]?a:b));
  let spawnDir=1; for(let d=0;d<4;d++){ const nx=spawn[0]+DIRV[d][0],ny=spawn[1]+DIRV[d][1]; if(grid[ny]&&grid[ny][nx]!=='#'){spawnDir=d;break;} }
  // BFS distâncias p/ achar ponto mais longe = escada/boss
  const dist={}; const q=[spawn]; dist[spawn]=0;
  while(q.length){const[cx,cy]=q.shift();for(const[dx,dy] of DIRV){const nx=cx+dx,ny=cy+dy;if(grid[ny]&&grid[ny][nx]==='.'&&dist[[nx,ny]]===undefined){dist[[nx,ny]]=dist[[cx,cy]]+1;q.push([nx,ny]);}}}
  let far=spawn,fd=-1; for(const c of cells){const dd=dist[c]??0;if(dd>fd){fd=dd;far=c;}}
  const isBoss=(depth%5===0); // chefe a cada 5 andares
  // portas: em corredores estreitos aleatórios
  for(const[x,y] of cells){ if(chance(0.09)){ const horiz=grid[y][x-1]!=='#'&&grid[y][x+1]!=='#'&&grid[y-1][x]==='#'&&grid[y+1][x]==='#';
    const vert=grid[y-1][x]!=='#'&&grid[y+1][x]!=='#'&&grid[y][x-1]==='#'&&grid[y][x+1]==='#';
    if((horiz||vert)&&!(x===spawn[0]&&y===spawn[1])) grid[y][x]='+'; } }
  // segredos: becos sem saída → parede secreta p/ bolso com baú
  const deadends=cells.filter(([x,y])=>{let n=0;for(const[dx,dy] of DIRV)if(grid[y+dy][x+dx]!=='#')n++;return n===1;});
  let secretPlaced=0;
  for(const[x,y] of shuffle(deadends)){ if(secretPlaced>=2)break;
    for(const[dx,dy] of shuffle(DIRV.slice())){ const wx=x+dx,wy=y+dy, bx=x+dx*2,by=y+dy*2;
      if(grid[wy]&&grid[wy][wx]==='#'&&grid[by]&&grid[by][bx]==='#'&&bx>0&&by>0&&bx<W-1&&by<H-1){
        grid[wy][wx]='S'; grid[by][bx]='C'; secretPlaced++; break;
      }
    }
  }
  // baús normais em becos
  let chests=0; for(const[x,y] of shuffle(deadends)){ if(chests>=2)break; if(grid[y][x]==='.'&&!(x===spawn[0]&&y===spawn[1])){grid[y][x]='C';chests++;} }
  // fonte (descanso) numa célula média
  const midCells=cells.filter(c=>{const d=dist[c]??0;return d>fd*0.3&&d<fd*0.7&&grid[c[1]][c[0]]==='.';});
  if(midCells.length)  { const f=pick(midCells); grid[f[1]][f[0]]='F'; }
  // encontros fixos: 2 nós
  let enc=0; for(const c of shuffle(cells)){ if(enc>=2)break; if(grid[c[1]][c[0]]==='.'&&(dist[c]??0)>3&&!(c[0]===spawn[0]&&c[1]===spawn[1])){grid[c[1]][c[0]]='E';enc++;} }
  // saída
  grid[far[1]][far[0]]=isBoss?'B':'>';
  // escada de subida no spawn-ish (se não andar 1)
  if(depth>1){ const up=cells.find(c=>grid[c[1]][c[0]]==='.'&&c[0]!==spawn[0]); }
  return {
    w:W,h:H,grid, name: isBoss?('SANTUÁRIO — Andar '+depth):('Cripta — Andar '+depth),
    spawn:{x:spawn[0]+0.5,y:spawn[1]+0.5,dir:spawnDir},
    doorsOpen:new Set(), secretsRevealed:new Set(), looted:new Set(), triggered:new Set(), rested:new Set(),
    isBoss, depth,
    explored:Array.from({length:H},()=>new Array(W).fill(false)),
  };
}

/* ================= CLASSES / SKILLS ================= */
// tipos de dano: slash pierce blunt (físicos) · fire ice bolt holy dark (elementais)
const ELEM={fire:'🔥',ice:'❄',bolt:'⚡',holy:'✨',dark:'🌑',slash:'⚔',pierce:'🗡',blunt:'🔨'};
const ELCOL={fire:'#ff6a3a',ice:'#66c8ff',bolt:'#ffe14a',holy:'#fff0b0',dark:'#b070e0',slash:'#e0e0e0',pierce:'#d0d0d0',blunt:'#d0c0a0',phys:'#e0e0e0'};

const SKILLS={
  // Leona — Cavaleira
  golpe_escudo:{name:'Golpe de Escudo',kind:'atk',type:'blunt',target:'one',power:110,mp:4,desc:'Dano contundente; 40% de atordoar.',status:{name:'stun',turns:1,chance:0.4}},
  brado:{name:'Brado de Guerra',kind:'debuff',target:'allEnemy',mp:8,desc:'Reduz o ataque de todos os inimigos.',status:{name:'atkDown',turns:3,pot:0.7}},
  guarda_leal:{name:'Guarda Leal',kind:'buff',target:'self',mp:5,desc:'Provoca inimigos e sobe muito sua defesa.',status:{name:'defUp',turns:3,pot:1.6},extra:'taunt'},
  luz_egide:{name:'Égide de Luz',kind:'buff',target:'allAlly',mp:14,desc:'Sobe a defesa de todo o grupo.',status:{name:'defUp',turns:3,pot:1.35},learn:6},
  // Sakura — Samurai
  corte_triplo:{name:'Corte Triplo',kind:'atk',type:'slash',target:'one',power:52,mp:6,hits:3,desc:'Três cortes rápidos no mesmo alvo.'},
  estocada:{name:'Estocada Perfurante',kind:'atk',type:'pierce',target:'one',power:150,mp:6,crit:0.35,desc:'Perfuração de crítico alto.'},
  postura_lamina:{name:'Postura da Lâmina',kind:'buff',target:'self',mp:5,desc:'Sobe seu ataque e chance de crítico.',status:{name:'atkUp',turns:3,pot:1.5},extra:'critUp'},
  furacao_aco:{name:'Furacão de Aço',kind:'atk',type:'slash',target:'allEnemy',power:85,mp:14,desc:'Corta todos os inimigos.',learn:7},
  // Celes — Maga
  fagulha:{name:'Fagulha',kind:'atk',type:'fire',target:'one',power:130,mp:4,magic:true,desc:'Chama que fere um inimigo.'},
  lasca_gelo:{name:'Lasca de Gelo',kind:'atk',type:'ice',target:'one',power:130,mp:4,magic:true,desc:'Estilhaço gélido; pode retardar.',status:{name:'slow',turns:2,chance:0.3}},
  faisca:{name:'Faísca',kind:'atk',type:'bolt',target:'one',power:130,mp:4,magic:true,desc:'Relâmpago súbito.'},
  analisar:{name:'Analisar',kind:'util',target:'one',mp:2,desc:'Revela as fraquezas do inimigo.'},
  labareda:{name:'Labareda',kind:'atk',type:'fire',target:'allEnemy',power:95,mp:14,magic:true,desc:'Explosão de fogo em todos.',learn:5},
  nevasca:{name:'Nevasca',kind:'atk',type:'ice',target:'allEnemy',power:95,mp:14,magic:true,desc:'Tempestade gélida em todos.',learn:8},
  // Darius — Sábio
  cura:{name:'Cura',kind:'heal',target:'ally',power:80,mp:5,magic:true,desc:'Restaura HP de um aliado.'},
  luz_sagrada:{name:'Luz Sagrada',kind:'atk',type:'holy',target:'one',power:120,mp:6,magic:true,desc:'Dano sagrado; forte contra mortos-vivos.'},
  antidoto:{name:'Purificar',kind:'cure',target:'ally',mp:4,desc:'Remove status negativos de um aliado.'},
  cura_maior:{name:'Cura Maior',kind:'heal',target:'ally',power:170,mp:12,magic:true,desc:'Cura poderosa em um aliado.',learn:6},
  bencao:{name:'Bênção',kind:'heal',target:'allAlly',power:75,mp:16,magic:true,desc:'Cura todo o grupo.',learn:8},
  reviver:{name:'Reviver',kind:'revive',target:'ally',power:0.5,mp:18,magic:true,desc:'Traz um aliado de volta com metade do HP.',learn:5},
  trevas:{name:'Lâmina Umbral',kind:'atk',type:'dark',target:'one',power:135,mp:8,magic:true,desc:'Golpe das sombras.',learn:7},
};

function mkChar(cls){
  const base={
    leona:{name:'Leona',cls:'Cavaleira',wtype:'slash',row:0,
      hp:180,mp:20,str:26,mag:8,def:22,res:14,agi:12,luck:10,
      skills:['golpe_escudo','guarda_leal','brado','luz_egide'], res_aff:{dark:1.0,holy:0.5}, pal:'knight'},
    sakura:{name:'Sakura',cls:'Samurai',wtype:'slash',row:0,
      hp:150,mp:24,str:30,mag:10,def:14,res:12,agi:20,luck:16,
      skills:['corte_triplo','estocada','postura_lamina','furacao_aco'], res_aff:{}, pal:'samurai'},
    celes:{name:'Celes',cls:'Maga',wtype:'blunt',row:1,
      hp:110,mp:120,str:9,mag:32,def:9,res:22,agi:15,luck:12,
      skills:['fagulha','lasca_gelo','faisca','analisar','labareda','nevasca'], res_aff:{fire:0.5}, pal:'mage'},
    darius:{name:'Darius',cls:'Sábio',wtype:'blunt',row:1,
      hp:120,mp:110,str:10,mag:28,def:11,res:24,agi:11,luck:12,
      skills:['cura','luz_sagrada','antidoto','cura_maior','bencao','reviver','trevas'], res_aff:{holy:0.4,dark:0.7}, pal:'sage'},
  }[cls];
  return {
    id:cls, side:'party', ...base,
    lv:1, xp:0, xpNext:24,
    mhp:base.hp, hp:base.hp, mmp:base.mp, mp:base.mp,
    status:{}, resolve:2, alive:true, guardF:false,
  };
}
function knownSkills(c){ return c.skills.filter(id=>{ const s=SKILLS[id]; return !s.learn||c.lv>=s.learn; }); }

/* ================= INIMIGOS ================= */
// weak: tipos que causam +dano e tiram guarda · resist: metade · imm: zero
const BEST={
  lodo:{name:'Lodo Ácido',spr:'slime',hp:70,atk:14,mag:6,def:8,res:6,agi:8,guard:2,
    weak:['fire','bolt'],resist:['blunt','ice'],xp:14,gold:8,ai:'basic',front:1,
    skills:[{name:'Cuspe Ácido',type:'nature',target:'one',power:120,status:{name:'defDown',turns:2,pot:0.75,chance:0.5}}]},
  goblin:{name:'Goblin Batedor',spr:'goblin',hp:85,atk:20,mag:4,def:10,res:6,agi:18,guard:3,
    weak:['fire','holy'],resist:[],xp:20,gold:14,ai:'aggro',front:1,
    skills:[{name:'Facada Suja',type:'pierce',target:'one',power:130,crit:0.25}]},
  morcego:{name:'Morcego Sombrio',spr:'bat',hp:55,atk:16,mag:8,def:6,res:10,agi:26,guard:2,
    weak:['bolt','holy'],resist:['dark'],xp:16,gold:6,ai:'aggro',front:1,
    skills:[{name:'Guincho',type:'bolt',target:'allEnemy',power:70,status:{name:'blind',turns:2,chance:0.3}}]},
  esqueleto:{name:'Esqueleto',spr:'skeleton',hp:100,atk:24,mag:6,def:14,res:8,agi:12,guard:3,
    weak:['blunt','holy'],resist:['pierce','dark'],imm:['poison'],xp:26,gold:16,ai:'basic',front:1,undead:1,
    skills:[{name:'Espadada',type:'slash',target:'one',power:130}]},
  cultista:{name:'Cultista',spr:'cultist',hp:90,atk:12,mag:24,def:9,res:18,agi:14,guard:3,
    weak:['holy','pierce'],resist:['dark'],xp:30,gold:22,ai:'caster',front:0,
    skills:[{name:'Chama Negra',type:'dark',target:'one',power:150,magic:true},
            {name:'Maldição',type:'dark',target:'one',power:0,status:{name:'atkDown',turns:3,pot:0.7,chance:0.8}}]},
  espectro:{name:'Espectro',spr:'wraith',hp:120,atk:22,mag:20,def:10,res:24,agi:20,guard:4,
    weak:['holy','fire'],resist:['slash','pierce','blunt'],imm:['poison','stun'],xp:40,gold:26,ai:'caster',front:0,undead:1,
    skills:[{name:'Toque Gélido',type:'ice',target:'one',power:140,magic:true,status:{name:'slow',turns:2,chance:0.4}},
            {name:'Lamento',type:'dark',target:'allEnemy',power:90,magic:true}]},
  aranha:{name:'Aranha Cripta',spr:'spider',hp:95,atk:20,mag:6,def:12,res:10,agi:22,guard:3,
    weak:['fire','blunt'],resist:['poison'],xp:28,gold:18,ai:'aggro',front:1,
    skills:[{name:'Mordida Peçonhenta',type:'pierce',target:'one',power:110,status:{name:'poison',turns:3,pot:14,chance:0.7}}]},
  // CHEFES
  golem:{name:'GOLEM DE OSSFELD',spr:'golem',hp:900,atk:34,mag:10,def:26,res:16,agi:8,guard:6,boss:1,
    weak:['bolt','pierce'],resist:['blunt','fire','ice'],imm:['poison','stun','sleep'],xp:400,gold:300,ai:'boss1',front:1,
    skills:[{name:'Punho Esmagador',type:'blunt',target:'one',power:170},
            {name:'Terremoto',type:'blunt',target:'allEnemy',power:110,status:{name:'defDown',turns:2,pot:0.8,chance:0.5}},
            {name:'Fúria de Pedra',type:'blunt',target:'one',power:220,tell:'O golem ergue os dois punhos...'}]},
  cavaleiro:{name:'CAVALEIRO DA CINZA',spr:'dknight',hp:1200,atk:40,mag:24,def:24,res:22,agi:22,guard:7,boss:1,
    weak:['holy','fire'],resist:['dark','slash','pierce'],imm:['poison','sleep'],xp:800,gold:600,ai:'boss2',front:1,undead:1,
    skills:[{name:'Lâmina Cinza',type:'slash',target:'one',power:180,crit:0.3},
            {name:'Onda Umbral',type:'dark',target:'allEnemy',power:130,magic:true},
            {name:'Voto de Cinzas',type:'buff',target:'self',status:{name:'atkUp',turns:3,pot:1.5},tell:'O cavaleiro reúne as cinzas...'},
            {name:'Julgamento',type:'dark',target:'one',power:260,magic:true,tell:'Uma luz negra se concentra...'}]},
};
function mkEnemy(key,lvBoost){
  const b=BEST[key], lv=(G.depth||1)+(lvBoost||0), sc=1+(G.depth-1)*0.12;
  return { key, side:'enemy', name:b.name, spr:b.spr, boss:!!b.boss, undead:!!b.undead,
    mhp:Math.round(b.hp*sc), hp:Math.round(b.hp*sc),
    atk:Math.round(b.atk*sc), mag:Math.round(b.mag*sc), def:Math.round(b.def*sc), res:Math.round(b.res*sc),
    agi:b.agi, guardMax:b.guard, guard:b.guard, broken:false, brokenT:0,
    weak:new Set(b.weak||[]), resist:new Set(b.resist||[]), imm:new Set(b.imm||[]),
    xp:Math.round(b.xp*sc), gold:Math.round(b.gold*sc), skills:b.skills||[], ai:b.ai, front:b.front,
    status:{}, alive:true, scanned:false, discovered:new Set(),
    sx:0,sy:0,scale:1, hitFlash:0, bob:Math.random()*6 };
}
// tabelas de encontro por profundidade
function rollFormation(boss){
  if(boss){ return G.depth>=10 ? [mkEnemy('cavaleiro')] : [mkEnemy('golem')]; }
  const d=G.depth, tables=[];
  if(d<=2) tables.push(['lodo','lodo'],['goblin','lodo'],['morcego','morcego','lodo'],['goblin']);
  if(d>=2&&d<=4) tables.push(['goblin','goblin'],['esqueleto','morcego'],['aranha','lodo'],['esqueleto','esqueleto']);
  if(d>=3) tables.push(['cultista','esqueleto'],['aranha','aranha','morcego'],['espectro','cultista'],['esqueleto','esqueleto','goblin']);
  if(d>=4) tables.push(['espectro','esqueleto','esqueleto'],['cultista','cultista','aranha'],['espectro','espectro']);
  const f=pick(tables); return f.map(k=>mkEnemy(k));
}

/* ================= COMBATE ================= */
function startBattle(formation,opts){
  opts=opts||{};
  G.battle={enemies:formation, round:1, boss:!!opts.boss, log:[], over:false};
  G.party.forEach(c=>{ c.resolve=Math.max(c.resolve,2); c.guardF=false; });
  G.state='battle';
  $('#battle').classList.add('on');
  musicStart('battle');
  layoutEnemies();
  renderBparty(); renderTurnQ();
  blog(opts.boss?('⚠ '+formation[0].name+' bloqueia o caminho!'):'Inimigos emboscam o grupo!');
  bfxLoop();
  setTimeout(()=>battleLoop(),700);
}
function layoutEnemies(){
  const es=G.battle.enemies, cv=$('#benemies'); const W=cv.clientWidth||cv.width, H=cv.clientHeight||cv.height;
  const n=es.length;
  es.forEach((e,i)=>{
    if(e.boss){ e.sx=0.5; e.sy=0.52; e.scale=2.3; }
    else{ const cols=Math.min(n,3), rowI=Math.floor(i/3), inRow=Math.min(cols,n-rowI*3), col=i%3;
      e.sx=(col+0.5)/inRow*0.86+0.07; e.sy=0.42+rowI*0.22; e.scale=1.1-rowI*0.12; }
  });
}
function alliesAlive(){return G.party.filter(c=>c.alive);}
function enemiesAlive(){return G.battle.enemies.filter(e=>e.alive);}

async function battleLoop(){
  const b=G.battle;
  while(!b.over){
    // ordem por agilidade efetiva
    const combatants=[...G.party.filter(c=>c.alive),...b.enemies.filter(e=>e.alive)];
    b.order=combatants.map(c=>({c,ini:effAgi(c)+rnd(0,4)})).sort((a,z)=>z.ini-a.ini).map(o=>o.c);
    renderTurnQ();
    for(const c of b.order){
      if(b.over)break; if(!c.alive)continue;
      // atordoado / dormindo / quebrado
      if(c.side==='enemy'&&c.broken){ blog(c.name+' está QUEBRADO e não age!'); c.broken=false; c.guard=c.guardMax; c.brokenT=0; markDirty(); await wait(500); continue; }
      if(c.status.stun){ blog(name(c)+' está atordoado!'); tickOne(c,'stun'); await wait(450); continue; }
      if(c.status.sleep){ blog(name(c)+' dorme...'); await wait(450); continue; }
      if(c.side==='party'){ c.resolve=Math.min(5,c.resolve+1); await playerTurn(c); }
      else { await enemyTurn(c); }
      if(checkEnd())break;
    }
    if(b.over)break;
    await endOfRound();
    if(checkEnd())break;
    b.round++;
  }
}
function effAgi(c){ let a=c.agi; if(c.status.slow)a*=0.5; if(c.status.haste)a*=1.5; return a; }
function name(c){return c.name;}

function checkEnd(){
  const b=G.battle; if(b.over)return true;
  if(enemiesAlive().length===0){ b.over=true; setTimeout(()=>winBattle(),400); return true; }
  if(alliesAlive().length===0){ b.over=true; setTimeout(()=>loseBattle(),400); return true; }
  return false;
}

/* -------- turno do jogador -------- */
let UI={boost:0};
function playerTurn(c){ return new Promise(res=>{
  G.resolver=res; G.curActor=c; UI.boost=0;
  renderBparty(); showActionMenu(c);
});}
function finishTurn(){ const r=G.resolver; G.resolver=null; hideMenus(); if(r)r(); }

function showActionMenu(c){
  const m=$('#bmenu'); m.classList.add('on'); $('#bsub').classList.remove('on');
  const canMag=!c.status.silence;
  m.innerHTML=`<div class="actrow">
    <div class="act hot" data-a="attack">⚔ ATACAR<small>${ELEM[c.wtype]} ${c.wtype}</small></div>
    <div class="act ${knownSkills(c).filter(id=>SKILLS[id].kind!=='heal'&&!SKILLS[id].magic).length? '':'dis'}" data-a="skill">✦ TÉCNICA<small>habilidades</small></div>
    <div class="act ${canMag&&knownSkills(c).some(id=>SKILLS[id].magic)?'':'dis'}" data-a="magic">✧ MAGIA<small>${c.mp}/${c.mmp} MP</small></div>
    <div class="act" data-a="item">🜂 ITEM<small>usar</small></div>
    <div class="act" data-a="guard">🛡 DEFENDER<small>+Resolve</small></div>
  </div>`;
  m.querySelectorAll('.act').forEach(el=>el.onclick=()=>{ if(el.classList.contains('dis'))return; SFX.ui(); onAction(c,el.dataset.a); });
}
function hideMenus(){ $('#bmenu').classList.remove('on'); $('#bsub').classList.remove('on'); clearTargets(); }

function onAction(c,a){
  if(a==='guard'){ c.guardF=true; c.resolve=Math.min(5,c.resolve+1); blog(c.name+' assume a guarda.'); SFX.ui(); finishTurn(); return; }
  if(a==='attack'){ chooseTarget(c,{kind:'attack'}); return; }
  if(a==='skill'){ openSub(c,knownSkills(c).filter(id=>!SKILLS[id].magic&&SKILLS[id].kind!=='heal'&&SKILLS[id].kind!=='revive'&&SKILLS[id].kind!=='cure'),'TÉCNICAS'); return; }
  if(a==='magic'){ openSub(c,knownSkills(c).filter(id=>SKILLS[id].magic||['heal','cure','revive','util'].includes(SKILLS[id].kind)),'MAGIAS'); return; }
  if(a==='item'){ openItems(c); return; }
}
function openSub(c,ids,label){
  const s=$('#bsub'); s.classList.add('on');
  let html=`<div class="subhead"><span>${label}</span><span class="back" data-back>‹ voltar</span></div>`;
  if(!ids.length)html+=`<div style="color:#888;padding:12px">Nada disponível.</div>`;
  for(const id of ids){ const sk=SKILLS[id]; const afford=c.mp>=(sk.mp||0);
    const cost=sk.mp?`<span class="si-cost">${sk.mp} MP</span>`:`<span class="si-cost res">—</span>`;
    html+=`<div class="subitem ${afford?'':'dis'}" data-sk="${id}">
      <div><div class="si-name">${sk.type?ELEM[sk.type]+' ':''}${sk.name}</div><div class="si-desc">${sk.desc}</div></div>${cost}</div>`;
  }
  s.innerHTML=html;
  s.querySelector('[data-back]').onclick=()=>{SFX.back();showActionMenu(c);};
  s.querySelectorAll('.subitem').forEach(el=>{ if(el.classList.contains('dis'))return;
    el.onclick=()=>{ SFX.ui(); onSkill(c,el.dataset.sk); }; });
}
function onSkill(c,id){ const sk=SKILLS[id];
  if(['heal','cure','revive'].includes(sk.kind)){ chooseTarget(c,{kind:'skill',id}); return; }
  if(sk.target==='self'){ execSkill(c,id,[c]); return; }
  if(sk.target==='allAlly'){ execSkill(c,id,alliesAlive()); return; }
  if(sk.target==='allEnemy'){ execSkill(c,id,enemiesAlive()); return; }
  chooseTarget(c,{kind:'skill',id});
}

/* seleção de alvo com controle de Impulso (Resolve) */
function chooseTarget(c,act){
  const sk=act.id?SKILLS[act.id]:null;
  const allyTarget=sk&&['heal','cure','revive'].includes(sk.kind);
  clearTargets();
  const bar=document.createElement('div'); bar.id='tgtBar';
  bar.style.cssText='position:absolute;left:0;right:0;bottom:0;z-index:9;display:flex;align-items:center;gap:8px;justify-content:center;padding:9px;background:rgba(6,5,4,.94);border-top:1px solid #3a3320;font-size:12px;color:#cfc8b4;flex-wrap:wrap;';
  const canBoost=c.resolve>0 && (act.kind==='attack'|| (sk&&(sk.kind==='atk'||sk.kind==='heal')));
  bar.innerHTML=`<span>${allyTarget?'Escolha o aliado':'Escolha o alvo'}</span>
    ${canBoost?`<span style="display:flex;align-items:center;gap:6px;background:#1a160c;border:1px solid #4a3f1e;border-radius:14px;padding:2px 4px 2px 10px">
      ⚡Impulso <b id="bpN" style="color:#e8c15a">0</b>
      <span id="bpM" style="padding:2px 9px;border:1px solid #4a3f1e;border-radius:8px;cursor:pointer">−</span>
      <span id="bpP" style="padding:2px 9px;border:1px solid #4a3f1e;border-radius:8px;cursor:pointer">+</span>
      <small style="color:#8a7a4a">(${c.resolve} disp.)</small></span>`:''}
    <span id="tgtCancel" style="color:#c86;cursor:pointer;border:1px solid #533;border-radius:8px;padding:3px 10px">✕ voltar</span>`;
  $('#bfield').appendChild(bar);
  UI.boost=0;
  if(canBoost){ const upd=()=>$('#bpN').textContent=UI.boost;
    $('#bpP').onclick=()=>{ if(UI.boost<c.resolve&&UI.boost<3){UI.boost++;upd();SFX.ui();} };
    $('#bpM').onclick=()=>{ if(UI.boost>0){UI.boost--;upd();SFX.ui();} };
  }
  $('#tgtCancel').onclick=()=>{ SFX.back(); clearTargets(); if(act.kind==='attack')showActionMenu(c); else if(sk){ openSub(c, sk.magic?knownSkills(c).filter(id=>SKILLS[id].magic||['heal','cure','revive','util'].includes(SKILLS[id].kind)):knownSkills(c).filter(id=>!SKILLS[id].magic&&SKILLS[id].kind!=='heal'), sk.magic?'MAGIAS':'TÉCNICAS'); } };
  const targets= allyTarget ? (sk.kind==='revive'?G.party.filter(c=>!c.alive):alliesAlive()) : enemiesAlive();
  if(allyTarget){ // alvo em cards da party
    targets.forEach(t=>{ const idx=G.party.indexOf(t); const card=$('#bparty').children[idx];
      if(!card)return; const dot=document.createElement('div'); dot.className='tgtDot'; dot.textContent='▾';
      dot.style.cssText+='position:absolute;left:50%;top:-6px;'; card.style.position='relative'; card.appendChild(dot);
      card.onclick=()=>{ SFX.ui(); clearTargets(); act.kind==='attack'?doAttack(c,t):execSkill(c,act.id,[t]); };
    });
  } else {
    const cv=$('#benemies'); const rect=cv.getBoundingClientRect(), frect=$('#bfield').getBoundingClientRect();
    targets.forEach(t=>{ const dot=document.createElement('div'); dot.className='tgtDot'; dot.textContent='▾';
      dot.style.left=(rect.left-frect.left+t.sx*rect.width)+'px'; dot.style.top=(rect.top-frect.top+t.sy*rect.height-t.scale*44)+'px';
      $('#bfield').appendChild(dot);
      dot.onclick=()=>{ SFX.ui(); clearTargets(); act.kind==='attack'?doAttack(c,t):execSkill(c,act.id,[t]); };
    });
  }
}
function clearTargets(){ $$('#bfield .tgtDot').forEach(d=>d.remove()); const b=$('#tgtBar'); if(b)b.remove(); G.party.forEach((c,i)=>{const el=$('#bparty').children[i]; if(el)el.onclick=null;}); }

/* -------- execução de ações -------- */
function spend(c,sk){ if(sk&&sk.mp){c.mp=Math.max(0,c.mp-sk.mp);} if(UI.boost){c.resolve=Math.max(0,c.resolve-UI.boost);} }

async function doAttack(c,t){
  const boost=UI.boost; spend(c,null);
  const hits=1+boost; // cada impulso = +1 golpe
  await animAttack(c);
  for(let i=0;i<hits;i++){ if(!t.alive)break;
    applyHit(c,t,{type:c.wtype,power:100,magic:false});
    await wait(180);
  }
  markDirty(); await wait(200); finishTurn();
}
async function execSkill(c,id,targets){
  const sk=SKILLS[id]; const boost=UI.boost; spend(c,sk);
  await animCast(c,sk);
  if(sk.kind==='util'){ // analisar
    targets.forEach(t=>{ t.scanned=true; blog('Fraquezas de '+t.name+' reveladas!'); });
    markDirty(); await wait(300); finishTurn(); return;
  }
  if(sk.kind==='buff'||sk.kind==='debuff'){
    targets.forEach(t=>{ applyStatus(t,sk.status); });
    if(sk.extra==='taunt'){ c._taunt=2; blog(c.name+' provoca os inimigos!'); }
    if(sk.extra==='critUp'){ applyStatus(c,{name:'critUp',turns:3}); }
    blog(c.name+' usa '+sk.name+'.');
    markDirty(); await wait(400); finishTurn(); return;
  }
  if(sk.kind==='heal'){ const pw=sk.power*(1+boost*0.5);
    targets.forEach(t=>{ const amt=Math.round((pw+c.mag*1.2)); heal(t,amt); });
    SFX.heal(); blog(c.name+' conjura '+sk.name+'.'); markDirty(); await wait(400); finishTurn(); return;
  }
  if(sk.kind==='cure'){ targets.forEach(t=>{ t.status={}; }); SFX.heal(); blog(c.name+' purifica '+targets[0].name+'.'); markDirty(); await wait(350); finishTurn(); return; }
  if(sk.kind==='revive'){ targets.forEach(t=>{ t.alive=true; t.hp=Math.round(t.mhp*0.5); t.status={}; }); SFX.holy(); blog(c.name+' revive '+targets[0].name+'!'); markDirty(); await wait(500); finishTurn(); return; }
  if(sk.kind==='atk'){ const hits=sk.hits||1;
    for(const t of targets){ if(!t.alive)continue;
      for(let h=0;h<hits;h++){ if(!t.alive)break; applyHit(c,t,{type:sk.type,power:sk.power*(1+boost*0.5)/ (targets.length>1?1:1),magic:sk.magic,crit:sk.crit,status:sk.status}); await wait(140); }
    }
    blog(c.name+' usa '+sk.name+'.'); markDirty(); await wait(250); finishTurn(); return;
  }
  finishTurn();
}

/* núcleo de dano */
function applyHit(src,tgt,o){
  if(!tgt.alive)return;
  const isMag=o.magic; let atk=isMag?(src.mag||0):(src.str!=null?src.str:(src.atk||0));
  // buffs
  if(src.status.atkUp)atk*=src.status.atkUp.pot||1.4; if(src.status.atkDown)atk*=src.status.atkDown.pot||0.7;
  let base=atk*(o.power/100);
  // defesa
  let dfn=isMag?tgt.res:tgt.def;
  if(tgt.status&&tgt.status.defUp)dfn*=tgt.status.defUp.pot||1.4; if(tgt.status&&tgt.status.defDown)dfn*=tgt.status.defDown.pot||0.75;
  if(tgt.guardF)dfn*=1.8;
  let dmg=base*(base/(base+dfn*1.2));
  // linha de trás (físico corpo a corpo enfraquece)
  if(!isMag && src.side==='party' && src.row===1 && ['slash','pierce','blunt'].includes(o.type)) dmg*=0.6;
  // elemento / fraqueza / resist
  let mult=1, weak=false;
  const w= tgt.side==='enemy'?tgt.weak:null, r=tgt.side==='enemy'?tgt.resist:null, im=tgt.side==='enemy'?tgt.imm:null;
  if(tgt.side==='enemy'){
    if(im&&im.has(o.type))mult=0;
    else if(w&&w.has(o.type)){mult=1.6;weak=true;}
    else if(r&&r.has(o.type))mult=0.5;
    if(tgt.undead&&o.type==='holy'){mult=Math.max(mult,1.8);weak=true;}
  } else { // dano em aliado (raro, magias inimigas)
    const aff=tgt.res_aff&&tgt.res_aff[o.type]; if(aff!=null)mult*=aff;
  }
  if(tgt.broken)mult*=1.5;
  dmg*=mult;
  // crítico
  let crit=false; const critC=(o.crit||0.06)+(src.status.critUp?0.25:0)+ (src.luck||0)/300;
  if(mult>0&&chance(critC)){crit=true;dmg*=1.8;}
  // acerto/erro (cego)
  if(src.status.blind&&chance(0.4)){ popup(tgt,'ERROU','miss'); SFX.miss(); return; }
  dmg=Math.max(mult>0?1:0,Math.round(dmg*rnd(0.9,1.1)));
  tgt.hp=clamp(tgt.hp-dmg,0,tgt.mhp); tgt.hitFlash=1;
  // quebra de guarda
  if(tgt.side==='enemy'&&weak&&!tgt.broken){ tgt.guard=Math.max(0,tgt.guard-1); tgt.discovered.add(o.type);
    if(tgt.guard<=0){ breakEnemy(tgt); } }
  else if(tgt.side==='enemy'&&mult>0){ tgt.discovered.add(o.type); }
  // popups + som
  if(mult===0){ popup(tgt,'IMUNE','miss'); SFX.miss(); }
  else{ popup(tgt, dmg, crit?'crit':weak?'weak':''); shakeField(crit?10:weak?7:4);
    crit?SFX.crit():weak?SFX.weak():(o.type&&ELEM[o.type]&&!['slash','pierce','blunt'].includes(o.type)? (SFX[o.type]?SFX[o.type]():SFX.hit()) : SFX.hit()); }
  if(weak&&!crit)popup(tgt,'FRACO!','break');
  // status colateral
  if(o.status && (o.status.chance==null||chance(o.status.chance)) && tgt.hp>0){ applyStatus(tgt,o.status); }
  if(tgt.hp<=0){ tgt.hp=0; killTarget(tgt); }
}
function breakEnemy(e){ e.broken=true; e.brokenT=1; popup(e,'QUEBRADO!','break'); SFX.brk(); shakeField(14); blog('⚡ '+e.name+' teve a guarda QUEBRADA!'); }
function heal(t,amt){ if(!t.alive)return; amt=Math.round(amt*rnd(0.95,1.08)); t.hp=clamp(t.hp+amt,0,t.mhp); popup(t,'+'+amt,'heal'); }
function applyStatus(t,st){ if(!st||!st.name)return;
  if(t.imm&&t.imm.has(st.name))return;
  t.status[st.name]={turns:st.turns||2, pot:st.pot, dmg:st.dmg||st.pot};
  const lbl={poison:'envenenado',burn:'em chamas',stun:'atordoado',sleep:'adormecido',blind:'cego',silence:'silenciado',slow:'lento',atkUp:'ATK↑',atkDown:'ATK↓',defUp:'DEF↑',defDown:'DEF↓',critUp:'CRIT↑',haste:'rápido',regen:'regen'}[st.name]||st.name;
  if(['poison','burn','stun','sleep','blind','silence','slow','atkDown','defDown'].includes(st.name)) blog(name(t)+' agora está '+lbl+'.');
}
function killTarget(t){
  if(t.side==='enemy'){ t.alive=false; t.dieT=1; blog(t.name+' foi derrotado!'); }
  else { t.alive=false; t.hp=0; blog(t.name+' caiu!'); SFX.down(); }
  markDirty();
}
function tickOne(c,key){ const s=c.status[key]; if(!s)return; s.turns--; if(s.turns<=0)delete c.status[key]; }

async function endOfRound(){
  const all=[...G.party,...G.battle.enemies];
  for(const c of all){ if(!c.alive)continue;
    // dano/regen por status
    if(c.status.poison){ const d=Math.round(c.status.poison.dmg||10); c.hp=clamp(c.hp-d,0,c.mhp); popup(c,d,'weak'); if(c.hp<=0)killTarget(c); }
    if(c.status.burn){ const d=Math.round(c.status.burn.dmg||12); c.hp=clamp(c.hp-d,0,c.mhp); popup(c,d,'weak'); if(c.hp<=0)killTarget(c); }
    if(c.status.regen){ heal(c,Math.round(c.status.regen.dmg||20)); }
    // decrementa durações
    for(const k in c.status){ c.status[k].turns--; if(c.status[k].turns<=0)delete c.status[k]; }
    if(c.side==='party')c.guardF=false;
    if(c._taunt)c._taunt--;
  }
  markDirty(); renderBparty(); await wait(200);
}

/* -------- IA inimiga -------- */
async function enemyTurn(e){
  if(!e.alive)return;
  await wait(360);
  const foes=alliesAlive(); if(!foes.length)return;
  // provocação
  const taunter=G.party.find(c=>c.alive&&c._taunt>0);
  let target = taunter || null;
  let skill=null;
  if(e.skills&&e.skills.length){
    if(e.ai==='caster'||e.ai==='boss1'||e.ai==='boss2'){ skill=pick(e.skills); }
    else if(chance(0.5)) skill=pick(e.skills);
  }
  // escolha de alvo: mais fraco (menor HP%) com viés, respeitando taunt
  if(!target){ const sorted=[...foes].sort((a,b)=>(a.hp/a.mhp)-(b.hp/b.mhp)); target= chance(0.6)?sorted[0]:pick(foes); }
  await animEnemyAttack(e);
  if(skill){
    if(skill.tell){ blog('⚠ '+(skill.tell)); }
    if(skill.kind==='buff'){ applyStatus(e,skill.status); blog(e.name+' usa '+skill.name+'.'); markDirty(); await wait(500); return; }
    if(skill.target==='allEnemy'){ for(const f of foes){ applyHit(e,f,{type:skill.type,power:skill.power,magic:skill.magic,status:skill.status}); await wait(120);} blog(e.name+' usa '+skill.name+'!'); }
    else { applyHit(e,target,{type:skill.type,power:skill.power,magic:skill.magic,crit:skill.crit,status:skill.status}); blog(e.name+' usa '+skill.name+'!'); }
  } else {
    applyHit(e,target,{type:'blunt',power:100,magic:false});
    blog(e.name+' ataca '+target.name+'.');
  }
  markDirty(); renderBparty(); await wait(320);
}

/* -------- fim de batalha -------- */
async function winBattle(){
  const b=G.battle; musicStop(); SFX.win();
  let xp=0,gold=0; const drops=[];
  b.enemies.forEach(e=>{ xp+=e.xp; gold+=e.gold; if(chance(e.boss?1:0.25))drops.push(rollDrop(e)); });
  G.gp+=gold; addLoot(drops);
  blog(`Vitória! +${xp} XP · +${gold} GP`);
  await wait(600);
  const lvs=[]; G.party.forEach(c=>{ if(c.alive){ if(gainXP(c,xp))lvs.push(c.name); } });
  renderBparty();
  await wait(400);
  $('#battle').classList.remove('on');
  G.state='explore'; musicStart('explore');
  let m=`⚔ Vitória!  +${xp} XP · +${gold} GP`; if(drops.length)m+=`  ·  ${drops.map(d=>d.name).join(', ')}`;
  if(lvs.length)m+=`\n★ Subiu de nível: ${lvs.join(', ')}!`, SFX.lvup();
  toast(m,2600);
  if(b.wasBoss){ onBossDefeated(); }
  renderHUD(); saveGame();
}
function loseBattle(){ musicStop(); G.state='dead'; $('#battle').classList.remove('on'); showDead(); }

function gainXP(c,xp){ c.xp+=xp; let up=false;
  while(c.xp>=c.xpNext){ c.xp-=c.xpNext; c.lv++; up=true;
    c.mhp+=Math.round(rnd(10,16)+ (c.cls==='Cavaleira'?6:0)); c.mmp+=Math.round(rnd(3,8)+ (c.mag>20?4:0));
    c.str+=rnd(0.6,2.2); c.mag+=rnd(0.6,2.4); c.def+=rnd(0.5,1.6); c.res+=rnd(0.5,1.6); c.agi+=rnd(0.3,1.2); c.luck+=rnd(0.2,1);
    ['str','mag','def','res','agi','luck'].forEach(k=>c[k]=Math.round(c[k]));
    c.hp=c.mhp; c.mp=c.mmp; c.xpNext=Math.round(c.xpNext*1.35+10);
  }
  return up;
}

/* ================= ITENS ================= */
const ITEMS={
  erva:{name:'Erva Curativa',use:'heal',pow:70,cat:'food',icon:'herb',desc:'Cura 70 HP.'},
  maca:{name:'Maçã',use:'heal',pow:40,cat:'food',icon:'apple',desc:'Cura 40 HP.'},
  pao:{name:'Pão Rústico',use:'heal',pow:55,cat:'food',icon:'bread',desc:'Cura 55 HP.'},
  pocao:{name:'Poção Maior',use:'heal',pow:170,cat:'other',icon:'potion',desc:'Cura 170 HP.'},
  eter:{name:'Éter',use:'mp',pow:50,cat:'other',icon:'eter',desc:'Restaura 50 MP.'},
  fenix:{name:'Pena de Fênix',use:'revive',pow:0.6,cat:'other',icon:'fenix',desc:'Revive com 60% do HP.'},
  antidoto:{name:'Antídoto',use:'cure',cat:'other',icon:'antidoto',desc:'Remove status ruins.'},
  bomba:{name:'Bomba de Fogo',use:'atk',type:'fire',pow:160,target:'allEnemy',cat:'other',icon:'bomba',desc:'Dano de fogo em todos (combate).'},
  raiz:{name:'Raiz do Trovão',use:'atk',type:'bolt',pow:150,target:'one',cat:'other',icon:'raiz',desc:'Relâmpago em um inimigo (combate).'},
  chave:{name:'Chave Enferrujada',use:'none',cat:'other',icon:'chave',desc:'Abre alguma fechadura.'},
};
function addItem(id,n){ G.inv[id]=(G.inv[id]||0)+(n||1); }
function openItems(c){
  const s=$('#bsub'); s.classList.add('on');
  let html=`<div class="subhead"><span>ITENS</span><span class="back" data-back>‹ voltar</span></div>`;
  const ids=Object.keys(G.inv).filter(id=>G.inv[id]>0 && ITEMS[id] && ['heal','mp','revive','cure','atk'].includes(ITEMS[id].use));
  if(!ids.length)html+=`<div style="color:#888;padding:12px">Sem itens usáveis.</div>`;
  for(const id of ids){ const it=ITEMS[id];
    html+=`<div class="subitem" data-it="${id}"><div><div class="si-name">${it.name} ×${G.inv[id]}</div><div class="si-desc">${it.desc}</div></div></div>`;
  }
  s.innerHTML=html;
  s.querySelector('[data-back]').onclick=()=>{SFX.back();showActionMenu(c);};
  s.querySelectorAll('.subitem').forEach(el=>el.onclick=()=>{ SFX.ui(); useItemCombat(c,el.dataset.it); });
}
function useItemCombat(c,id){ const it=ITEMS[id];
  if(it.target==='allEnemy'){ G.inv[id]--; (async()=>{ for(const e of enemiesAlive()){applyHit(c,e,{type:it.type,power:it.pow,magic:true});await wait(120);} blog(c.name+' usa '+it.name+'!'); markDirty(); await wait(300); finishTurn(); })(); return; }
  if(it.target==='one'){ chooseTargetItem(c,id); return; }
  // ally
  chooseTargetItemAlly(c,id);
}
function chooseTargetItem(c,id){ const it=ITEMS[id]; clearTargets();
  const cv=$('#benemies'), rect=cv.getBoundingClientRect(), frect=$('#bfield').getBoundingClientRect();
  enemiesAlive().forEach(t=>{ const dot=document.createElement('div');dot.className='tgtDot';dot.textContent='▾';
    dot.style.left=(rect.left-frect.left+t.sx*rect.width)+'px'; dot.style.top=(rect.top-frect.top+t.sy*rect.height-40)+'px';
    $('#bfield').appendChild(dot); dot.onclick=()=>{ G.inv[id]--; clearTargets(); applyHit(c,t,{type:it.type,power:it.pow,magic:true}); blog(c.name+' usa '+it.name+'!'); markDirty(); setTimeout(finishTurn,400); };
  });
}
function chooseTargetItemAlly(c,id){ const it=ITEMS[id]; clearTargets();
  const targets= it.use==='revive'?G.party.filter(x=>!x.alive):alliesAlive();
  targets.forEach(t=>{ const idx=G.party.indexOf(t); const card=$('#bparty').children[idx]; if(!card)return;
    const dot=document.createElement('div');dot.className='tgtDot';dot.textContent='▾';dot.style.cssText+='position:absolute;left:50%;top:-6px;';
    card.style.position='relative';card.appendChild(dot);
    card.onclick=()=>{ G.inv[id]--; clearTargets();
      if(it.use==='heal')heal(t,it.pow); else if(it.use==='mp'){t.mp=clamp(t.mp+it.pow,0,t.mmp);popup(t,'+'+it.pow+'MP','heal');}
      else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);t.status={};} else if(it.use==='cure')t.status={};
      SFX.heal(); blog(c.name+' usa '+it.name+'.'); markDirty(); setTimeout(finishTurn,400);
    };
  });
}

/* baús / loot */
function rollDrop(e){ const pool=e.boss?['pocao','fenix','eter']:['erva','erva','pocao','eter','antidoto','raiz']; const id=pick(pool); return {id,name:ITEMS[id].name}; }
function addLoot(drops){ drops.forEach(d=>addItem(d.id)); }

/* ================= EXPLORAÇÃO ================= */
function enterFloor(depth,fromUp){
  G.depth=depth; G.floor=depth; if(depth>G.maxFloor)G.maxFloor=depth;
  G.dun = G.scenes[depth] || (G.scenes[depth]=genFloor(depth));
  const sp=G.dun.spawn; G.px=sp.x; G.py=sp.y; G.tx=sp.x; G.ty=sp.y; G.dir=sp.dir; G.ang=G.dir*Math.PI/2; G.tang=G.ang;
  markExplored();
  renderHUD();
}
function markExplored(){ const cx=Math.floor(G.px),cy=Math.floor(G.py);
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const x=cx+dx,y=cy+dy;if(G.dun.grid[y]&&G.dun.grid[y][x]!==undefined)G.dun.explored[y][x]=true;}
}
function tryMove(dx,dy){ if(G.moving||G.state!=='explore')return;
  const nx=Math.floor(G.px)+dx, ny=Math.floor(G.py)+dy;
  const v=G.dun.grid[ny]&&G.dun.grid[ny][nx];
  if(v==='+'&&!G.dun.doorsOpen.has(nx+','+ny)){ G.dun.doorsOpen.add(nx+','+ny); SFX.door(); toast('A porta range e se abre.',1100); moveTo(nx,ny); return; }
  if(v==='S'&&!G.dun.secretsRevealed.has(nx+','+ny)){ SFX.bump(); toast('Parece uma parede sólida... (tente Interagir aqui perto)',1400); return; }
  if(isSolid(nx,ny)){ SFX.bump(); return; }
  moveTo(nx,ny);
}
function moveTo(nx,ny){ G.moving=true; G.tx=nx+0.5; G.ty=ny+0.5; SFX.step();
  const sx=G.px,sy=G.py,t0=performance.now(),dur=150;
  (function anim(){ const k=clamp((performance.now()-t0)/dur,0,1);
    G.px=sx+(G.tx-sx)*k; G.py=sy+(G.ty-sy)*k;
    if(k<1)requestAnimationFrame(anim); else{ G.px=G.tx;G.py=G.ty;G.moving=false; onEnterTile(nx,ny); }
  })();
}
function turn(dir){ if(G.moving||G.state!=='explore')return; G.moving=true; G.dir=(G.dir+dir+4)%4;
  const from=G.ang, to=G.dir*Math.PI/2; let d=to-from; while(d>Math.PI)d-=2*Math.PI; while(d<-Math.PI)d+=2*Math.PI;
  const t0=performance.now(),dur=130; SFX.step();
  (function anim(){ const k=clamp((performance.now()-t0)/dur,0,1); G.ang=from+d*k;
    if(k<1)requestAnimationFrame(anim); else{G.ang=to;G.moving=false;} })();
}
function onEnterTile(x,y){ markExplored(); renderHUD();
  const d=G.dun,t=d.grid[y][x],key=x+','+y;
  if(t==='C'&&!d.looted.has(key)){ d.looted.add(key); openChest(x,y); return; }
  if(t==='F'&&!d.rested.has(key)){ d.rested.has(key); fountain(x,y); return; }
  if(t==='E'&&!d.triggered.has(key)){ d.triggered.add(key); G.dun.grid[y][x]='.'; SFX.bump(); setTimeout(()=>startBattle(rollFormation(false)),260); return; }
  if(t==='B'&&!d.triggered.has(key)){ d.triggered.add(key); startBoss(); return; }
  if(t==='>'){ toast('Escada para baixo. (Interagir = descer)',1400); }
  // encontro aleatório
  G.stepsSince++; G.steps++;
  if(G.stepsSince>3 && chance(G.encRate + G.stepsSince*0.02)){ G.stepsSince=0; setTimeout(()=>startBattle(rollFormation(false)),200); }
  saveGame();
}
function interact(){ if(G.state!=='explore'||G.moving)return;
  const fx=Math.floor(G.px)+DIRV[G.dir][0], fy=Math.floor(G.py)+DIRV[G.dir][1];
  const here=G.dun.grid[Math.floor(G.py)][Math.floor(G.px)];
  const v=G.dun.grid[fy]&&G.dun.grid[fy][fx];
  // revelar segredo à frente
  if(v==='S'&&!G.dun.secretsRevealed.has(fx+','+fy)){ G.dun.secretsRevealed.add(fx+','+fy); SFX.secret(); toast('✦ Você encontra uma passagem secreta!',1800); return; }
  if(here==='>'){ descend(); return; }
  if(here==='F'&&!G.dun.rested.has(Math.floor(G.px)+','+Math.floor(G.py))){ fountain(Math.floor(G.px),Math.floor(G.py)); return; }
  // baú à frente
  if(v==='C'&&!G.dun.looted.has(fx+','+fy)){ G.dun.looted.add(fx+','+fy); openChest(fx,fy); return; }
  toast('Nada para interagir aqui.',900);
}
function descend(){ SFX.door(); G.stepsSince=0; enterFloor(G.depth+1); toast('Você desce ao Andar '+G.depth+'.',1600); musicStart('explore'); saveGame(); }
function openChest(x,y){ G.dun.grid[y][x]='.'; SFX.chest();
  const roll=Math.random(); let msg;
  if(roll<0.5){ const g=rint(30,90)+G.depth*15; G.gp+=g; msg='◉ '+g+' GP'; }
  else if(roll<0.85){ const id=pick(['erva','erva','pocao','eter','antidoto','fenix','raiz','bomba']); addItem(id); msg='🜂 '+ITEMS[id].name; }
  else { const g=rint(80,160)+G.depth*20; G.gp+=g; const id=pick(['pocao','fenix']); addItem(id); msg='◉ '+g+' GP + '+ITEMS[id].name; }
  toast('Baú aberto!  '+msg,1900); renderHUD(); saveGame();
}
function fountain(x,y){ G.dun.rested.add(x+','+y); SFX.heal();
  G.party.forEach(c=>{ c.hp=c.mhp; c.mp=c.mmp; if(!c.alive){c.alive=true;c.hp=c.mhp;} c.status={}; });
  toast('✦ Fonte Sagrada — grupo totalmente restaurado!',2000); renderHUD();
}
function startBoss(){ const f=rollFormation(true); f.wasBoss=true; startBattle(f,{boss:true}); G.battle.wasBoss=true; }
function onBossDefeated(){ // abre saída / vitória de andar
  toast('★ CHEFE DERROTADO! A passagem se abre.',2600);
  // transforma tile boss em escada
  const d=G.dun; for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++)if(d.grid[y][x]==='B')d.grid[y][x]='>';
  if(G.depth>=10){ setTimeout(()=>showWin(),1500); }
}

/* ================= RENDER LOOP ================= */
function loop(){ requestAnimationFrame(loop);
  if((G.state==='explore') && RC.ctx){ rcRender(G.px,G.py,G.ang); }
}

/* ================= HUD / PAINEL ================= */
function renderHUD(){
  const g=G.gp.toLocaleString('pt-BR');
  $('#gpN').textContent=g; const g2=$('#gpN2'); if(g2)g2.textContent=g;
  $('#flName').textContent=G.dun?G.dun.name:'—';
  $('#flPos').textContent='◈ '+['Norte','Leste','Sul','Oeste'][G.dir];
  const kn=$('#keyN'); if(kn)kn.textContent=(G.inv.chave||0);
  const it=$('#itemN'); if(it){ const n=Object.values(G.inv).reduce((a,b)=>a+b,0); it.textContent='· '+n+' itens'; }
  const mn=$('#mmName'); if(mn&&G.dun)mn.textContent='ANDAR '+G.depth;
  renderParty(); renderInventory(); drawMini();
}
function condChips(c){ const s=[]; for(const k in c.status){ const m={poison:'☠',burn:'🔥',stun:'✷',sleep:'z',blind:'◐',silence:'✕',slow:'▽',atkUp:'▲',atkDown:'▼',defUp:'◆',defDown:'◇',critUp:'✦',regen:'✚'}[k]; if(m)s.push(`<span>${m}</span>`); } return s.join(''); }
function skGlyph(id){ const s=SKILLS[id]; if(!s)return '✦';
  if(s.type&&ELEM[s.type])return ELEM[s.type];
  if(s.kind==='heal')return '✚'; if(s.kind==='revive')return '✚'; if(s.kind==='cure')return '✦';
  if(s.kind==='buff')return '▲'; if(s.kind==='debuff')return '▼'; if(s.kind==='util')return '🔍'; return '✦'; }
function renderParty(){
  const el=$('#party'); if(!el)return; el.innerHTML='';
  G.party.forEach(c=>{
    const d=document.createElement('div'); d.className='pcard'+(c.alive?'':' dead');
    const sks=knownSkills(c).slice(0,3);
    d.innerHTML=`<div class="pTop">
        <canvas class="pport" width="64" height="64"></canvas>
        <div class="pMeta">
          <div class="pname">${c.name.toUpperCase()}</div>
          <div class="plv">${c.cls} · Nv <b>${c.lv}</b></div>
        </div></div>
      <div class="pbars">
        <div class="bar hp"><i style="width:${c.hp/c.mhp*100}%"></i><span class="bnum">${c.hp}/${c.mhp}</span></div>
        <div class="bar mp"><i style="width:${c.mmp?c.mp/c.mmp*100:0}%"></i><span class="bnum">${c.mp}/${c.mmp}</span></div>
      </div>
      <div class="pslots">${sks.map(id=>`<div class="sk" title="${SKILLS[id].name}">${skGlyph(id)}</div>`).join('')}</div>
      <div class="pcond">${condChips(c)}</div>`;
    el.appendChild(d);
    drawPortrait(d.querySelector('.pport'),c.pal);
  });
}

/* ---------- inventário (categorias com ícones) ---------- */
function weaponIcon(c){ return {Cavaleira:'sword',Samurai:'katana',Maga:'staff',['Sábio']:'staff2'}[c.cls]||'sword'; }
function armorIcon(c){ return {Cavaleira:'plate',Samurai:'leather',Maga:'robe',['Sábio']:'robe'}[c.cls]||'leather'; }
function renderInventory(){
  const W=$('#invWeapons'),A=$('#invArmors'),F=$('#invFood'),O=$('#invOther'); if(!W)return;
  // ARMAS / ARMADURAS = equipamento da party (visual)
  W.innerHTML=''; A.innerHTML='';
  G.party.forEach(c=>{ W.appendChild(mkSlot(weaponIcon(c),0,c.name+' — arma')); A.appendChild(mkSlot(armorIcon(c),0,c.name+' — armadura')); });
  padSlots(W,5); padSlots(A,5);
  // COMIDA / OUTROS = itens
  F.innerHTML=''; O.innerHTML='';
  for(const id in G.inv){ if(G.inv[id]<=0)continue; const it=ITEMS[id]; if(!it)continue;
    const slot=mkSlot(it.icon||id, G.inv[id], it.name+' — '+it.desc);
    slot.classList.add('has'); slot.onclick=()=>useFromInv(id);
    (it.cat==='food'?F:O).appendChild(slot);
  }
  padSlots(F,5); padSlots(O,5);
}
function mkSlot(icon,count,title){ const s=document.createElement('div'); s.className='slot'+(icon?' filled':''); if(title)s.title=title;
  if(icon){ const cv=document.createElement('canvas'); cv.width=32;cv.height=32; drawItemIcon(cv.getContext('2d'),icon); s.appendChild(cv);
    if(count>1){ const c=document.createElement('div'); c.className='cnt'; c.textContent=count; s.appendChild(c);} }
  return s;
}
function padSlots(el,min){ while(el.children.length<min){ el.appendChild(mkSlot(null,0,'')); } }
function useFromInv(id){ const it=ITEMS[id]; if(!it)return;
  if(it.use==='atk'){ toast('Esse item é só para combate.',1200); return; }
  const t=it.use==='revive'?G.party.find(p=>!p.alive):G.party.filter(p=>p.alive).sort((a,b)=>a.hp/a.mhp-b.hp/b.mhp)[0];
  if(!t){ toast('Ninguém precisa disso agora.',1200); return; }
  G.inv[id]--; SFX.heal();
  if(it.use==='heal')t.hp=clamp(t.hp+it.pow,0,t.mhp);
  else if(it.use==='mp')t.mp=clamp(t.mp+it.pow,0,t.mmp);
  else if(it.use==='cure')t.status={};
  else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);t.status={};}
  toast(it.name+' usado em '+t.name+'.',1300); renderHUD(); saveGame();
}

/* ---------- ícones pixel dos itens ---------- */
function drawItemIcon(ctx,type){ ctx.clearRect(0,0,32,32); const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x*2,y*2,w*2,h*2);};
  switch(type){
    case 'sword': R(7,1,2,10,'#d8dce2');R(7,1,1,10,'#f2f4f8');R(5,10,6,2,'#c8a44a');R(7,12,2,3,'#7a4a20');R(6,14,4,1,'#c8a44a');break;
    case 'katana': for(let i=0;i<9;i++)R(5+i,10-i,2,2,'#e2e6ec'); R(4,11,2,2,'#8f2620');R(3,12,2,3,'#5a1a1a');break;
    case 'staff': R(7,2,2,13,'#6a4a28');R(7,2,2,4,'#8a6636'); R(5,1,6,4,'#3a78c8');R(6,1,3,2,'#8ac0ff');break;
    case 'staff2': R(7,2,2,13,'#6a4a28'); R(6,1,4,4,'#e8c15a');R(7,1,2,2,'#fff0b0');break;
    case 'mace': R(7,6,2,9,'#6a4a28'); R(5,1,6,6,'#9aa0a8'); R(4,3,2,2,'#c0c6cc');R(11,3,2,2,'#c0c6cc');R(7,0,2,2,'#c0c6cc');break;
    case 'dagger': R(7,4,2,6,'#d8dce2');R(6,9,4,1,'#c8a44a');R(7,10,2,3,'#7a4a20');break;
    case 'plate': R(4,3,8,9,'#8a9098');R(4,3,8,2,'#aab0b8');R(7,3,2,9,'#6a7078');R(3,4,2,4,'#7a8088');R(11,4,2,4,'#7a8088');break;
    case 'leather': R(4,3,8,9,'#7a4a26');R(4,3,8,2,'#9a6636');R(7,4,2,7,'#5a3418');R(4,10,8,2,'#5a3418');break;
    case 'robe': R(5,2,6,3,'#2a5aa8');R(3,4,10,8,'#22467e');R(3,4,2,8,'#2a5aa8');R(7,5,2,7,'#18345e');break;
    case 'shield': R(4,2,8,7,'#9aa0a8');R(4,2,8,2,'#c0c6cc');R(5,9,6,2,'#8a9098');R(6,11,4,1,'#7a8088');R(7,4,2,4,'#c8a44a');break;
    case 'herb': case 'erva': R(6,8,4,5,'#3a6a2a');R(3,4,5,4,'#5aa84a');R(8,3,5,4,'#5aa84a');R(5,6,3,2,'#7ac86a');break;
    case 'potion': case 'pocao': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#c0392b');R(5,4,6,2,'#e05a4a');R(6,8,2,3,'#ff8a7a');break;
    case 'eter': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#22467e');R(5,4,6,2,'#4a86d8');R(6,8,2,3,'#8ac0ff');break;
    case 'antidoto': R(6,2,4,2,'#7a4a20');R(5,4,6,9,'#3a7a2a');R(5,4,6,2,'#5aa84a');break;
    case 'fenix': for(let i=0;i<8;i++)R(7-(i>4?1:0),2+i,2,1,'#e8934a'); R(5,4,2,1,'#f0c060');R(9,6,2,1,'#f0c060');R(4,8,2,1,'#ff7a3a');break;
    case 'bomba': case 'bomb': R(5,5,7,7,'#20232a');R(6,6,3,3,'#3a3f48');R(9,3,2,2,'#7a4a20');R(11,2,2,2,'#e8c15a');break;
    case 'raiz': R(6,1,2,6,'#ffe14a');R(4,6,6,2,'#ffe14a');R(6,7,3,7,'#e8c020');R(4,12,4,2,'#ffe14a');break;
    case 'apple': R(6,2,2,2,'#5a3418');R(4,4,8,8,'#c0392b');R(4,4,8,2,'#e05a4a');R(5,6,2,2,'#ff8a7a');break;
    case 'pao': case 'bread': R(3,5,10,6,'#c99a5a');R(3,5,10,2,'#e0b878');R(5,7,1,2,'#8a6636');R(8,7,1,2,'#8a6636');break;
    case 'chave': case 'key': R(4,4,4,4,'#e8c15a');R(5,5,2,2,'#0c0a06');R(8,5,6,2,'#e8c15a');R(12,7,2,2,'#e8c15a');R(10,7,1,2,'#e8c15a');break;
    case 'picareta': R(2,2,12,2,'#9aa0a8');R(2,2,3,3,'#7a8088');R(11,2,3,3,'#7a8088');R(7,3,2,10,'#6a4a28');break;
    case 'pena': for(let i=0;i<10;i++)R(6+Math.floor(i/3),2+i,2,1,'#e8ecf2'); R(5,5,2,1,'#c0c6cc');R(9,8,1,1,'#c0c6cc');break;
    default: R(5,5,6,6,'#4a4438');R(6,6,4,4,'#6a6250');
  }
}

/* ---------- minimapa sempre visível ---------- */
function drawMini(){ const cv=$('#miniMap'),d=G.dun; if(!cv||!d)return;
  const W=cv.clientWidth||160,H=cv.clientHeight||120; if(W<4)return; cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d'); ctx.clearRect(0,0,W,H);
  const cell=Math.min((W-6)/d.w,(H-6)/d.h), ox=(W-cell*d.w)/2, oy=(H-cell*d.h)/2;
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){ if(!d.explored[y][x])continue;
    let t=d.grid[y][x]; if(t==='#'||(t==='S'&&!d.secretsRevealed.has(x+','+y)))continue;
    let col='rgba(70,48,24,.45)';
    if(t==='C'&&!d.looted.has(x+','+y))col='#b8892a'; else if(t==='>')col='#3a7a2a';
    else if(t==='F')col='#2a6ab0'; else if(t==='B')col='#a83030'; else if(t==='+')col='#8a5a2a';
    ctx.fillStyle=col; ctx.fillRect(ox+x*cell,oy+y*cell,Math.ceil(cell),Math.ceil(cell));
  }
  // seta do jogador
  const cxp=ox+(Math.floor(G.px)+0.5)*cell, cyp=oy+(Math.floor(G.py)+0.5)*cell, r=cell*0.7, a=G.dir*Math.PI/2;
  ctx.fillStyle='#c0201a'; ctx.beginPath();
  ctx.moveTo(cxp+Math.cos(a)*r,cyp+Math.sin(a)*r);
  ctx.lineTo(cxp+Math.cos(a+2.4)*r,cyp+Math.sin(a+2.4)*r);
  ctx.lineTo(cxp+Math.cos(a-2.4)*r,cyp+Math.sin(a-2.4)*r); ctx.fill();
}

/* ================= SPRITES PIXEL — retratos ================= */
function drawPortrait(cv,pal){ drawFace(cv.getContext('2d'),pal); }

/* rostos grandes e detalhados (64x64), 1px de granularidade */
const FACEP={
  knight:{skin:'#ecc49b',sh:'#c68f66',hi:'#f8dcb8',eye:'#3f7fd0',brow:'#916a2c',hair:'#f0d074',hairD:'#b58e38',cloth:'#3d5e2c',clothD:'#26401a',lip:'#c56b58'},
  samurai:{skin:'#e9bd94',sh:'#c48a60',hi:'#f6d4b0',eye:'#7a2f2f',brow:'#4a201c',hair:'#cc382d',hairD:'#8f2620',cloth:'#7a1a1a',clothD:'#4a0f0f',lip:'#b85448'},
  mage:{skin:'#e6c6b0',sh:'#bd977e',hi:'#f4dccb',eye:'#38b8cf',brow:'#8a7a96',hair:'#e6ecf3',hairD:'#a9b3c0',cloth:'#22467e',clothD:'#152c52',lip:'#c07868'},
  sage:{skin:'#dcc0a6',sh:'#b3937a',hi:'#eed6c0',eye:'#5a86c0',brow:'#cfcfcf',hair:'#ededed',hairD:'#b0b0b0',cloth:'#365f9a',clothD:'#22406a',lip:'#b07a6a'},
};
function drawFace(ctx,key){
  ctx.clearRect(0,0,64,64);
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w,h);};
  const bg=ctx.createRadialGradient(32,24,3,32,34,44); bg.addColorStop(0,'#242430');bg.addColorStop(1,'#070709');
  ctx.fillStyle=bg; ctx.fillRect(0,0,64,64);
  const P=FACEP[key]||FACEP.knight;
  // ombros / gola
  R(11,56,42,8,P.cloth); R(11,55,42,3,P.clothD);
  // pescoço
  R(27,47,10,9,P.sh); R(28,45,8,5,P.skin);
  // cabeça (elipse)
  for(let y=11;y<52;y++)for(let x=15;x<49;x++){
    const dx=(x-32)/15.5, dy=(y-31)/18.8;
    if(dx*dx+dy*dy<=1){ let c=P.skin; if(x>37)c=P.sh; else if(x<26&&y<36)c=P.hi;
      ctx.fillStyle=c; ctx.fillRect(x,y,1,1); }
  }
  // orelhas
  R(15,31,3,7,P.sh); R(46,31,3,7,P.sh); R(16,32,2,4,P.skin); R(47,32,1,4,P.skin);
  // maçãs do rosto (blush leve)
  ctx.globalAlpha=0.25; R(23,38,5,3,P.lip); R(37,38,5,3,P.lip); ctx.globalAlpha=1;
  // olhos (branco, íris, pupila, brilho)
  const eye=(cx,fl)=>{ R(cx-3,29,7,5,'#f6f4ed'); R(cx-3,29,7,1,'#d5cfc0');
    R(cx-3,33,7,1,'#cbb79c'); // pálpebra inferior sombra
    R(cx+(fl?-2:0),29,4,5,P.eye); R(cx+(fl?-1:1),30,2,3,'#0d0d15'); R(cx+(fl?0:2),30,1,1,'#ffffff'); };
  eye(23,false); eye(40,true);
  // sobrancelhas
  R(20,26,8,2,P.brow); R(36,26,8,2,P.brow);
  // nariz
  R(31,33,2,6,P.sh); R(30,38,4,1,P.sh); R(33,38,1,1,P.hi);
  // boca
  R(27,42,10,1,'#8a4a40'); R(28,43,8,1,P.lip); R(29,44,6,1,'#7a3e36');
  // ---- cabelo + acessório por classe (desenhado por cima) ----
  if(key==='knight'){
    // cabelo loiro aparecendo sob o elmo (laterais e nuca)
    R(18,22,5,14,P.hair); R(41,22,5,14,P.hair); R(18,30,4,8,P.hairD); R(42,30,4,8,P.hairD);
    // ELMO dourado — domo sobre a cabeça
    for(let y=3;y<20;y++)for(let x=15;x<49;x++){ const dx=(x-32)/16.5,dy=(y-19)/16; if(dx*dx+dy*dy<=1){ let c='#d9b24a'; if(y<7)c='#f4dd88'; else if(x>37)c='#a6801f'; else if(x<26)c='#e8c76a'; R(x,y,1,1,c);} }
    R(22,6,3,10,'#fdf0b4'); R(23,7,1,7,'#ffffff');   // brilho especular do metal
    R(16,4,32,1,'#8f6f24'); R(24,16,16,1,'#8f6f24');  // contornos metálicos
    R(16,17,32,2,'#8f6f24');                       // aba/rebordo do elmo
    R(15,17,5,15,'#c8a13f'); R(44,17,5,15,'#c8a13f'); // placas de bochecha
    R(15,17,2,15,'#8f6f24'); R(47,17,2,15,'#8f6f24');
    R(31,17,2,10,'#b8912f'); R(30,17,1,9,'#8f6f24'); // protetor nasal
    // asas de metal (angulares) nas laterais
    R(11,10,6,2,'#e4eaf1');R(9,12,5,2,'#c3ccd6');R(7,14,4,2,'#9aa6b2'); R(13,8,4,2,'#f4f8fc');
    R(47,10,6,2,'#e4eaf1');R(50,12,5,2,'#c3ccd6');R(53,14,4,2,'#9aa6b2'); R(47,8,4,2,'#f4f8fc');
  } else if(key==='samurai'){
    R(16,12,32,9,P.hair); R(15,19,6,18,P.hair); R(43,19,6,18,P.hair);
    R(16,12,32,2,P.hairD); R(15,30,5,8,P.hairD); R(44,30,5,8,P.hairD);
    R(27,18,10,7,P.hair); R(29,18,6,7,P.hairD); // mecha central
    // bandana branca com nó
    R(15,21,34,4,'#ece6d8'); R(15,24,34,1,'#c3bba8'); R(29,20,6,5,P.hair==='x'?'#000':'#cc382d');
    R(44,22,3,3,'#ece6d8'); R(47,24,4,6,'#dcd4c2'); // nó lateral
    // cicatriz sob o olho
    R(41,34,1,5,'#b5695a');
  } else if(key==='mage'){
    R(19,14,26,8,P.hair); R(16,20,5,20,P.hair); R(43,20,5,20,P.hair);
    R(19,14,26,2,'#ffffff'); R(16,28,4,12,P.hairD); R(44,28,4,12,P.hairD);
    // capuz azul
    R(11,6,42,10,P.cloth); R(11,6,42,3,'#3f66b4'); R(13,13,38,2,P.clothD);
    R(10,14,8,34,P.cloth); R(46,14,8,34,P.cloth); R(11,15,4,32,P.clothD); R(49,15,4,32,P.clothD);
    R(18,14,3,26,'#2a4f8a'); R(43,14,3,26,'#2a4f8a'); // sombra interna do capuz
  } else if(key==='sage'){
    // capuz
    R(11,5,42,11,P.cloth); R(11,5,42,3,'#4d78bc'); R(13,13,38,2,P.clothD);
    R(9,13,9,36,P.cloth); R(46,13,9,36,P.cloth); R(10,14,4,34,P.clothD); R(50,14,4,34,P.clothD);
    R(17,13,3,30,'#2c4c82'); R(44,13,3,30,'#2c4c82');
    // cabelo/testa
    R(20,15,24,5,P.hair); R(20,15,24,2,'#ffffff');
    // sobrancelhas grossas brancas (por cima)
    R(20,25,8,3,P.brow); R(36,25,8,3,P.brow);
    // barba branca cheia (cobre boca/queixo)
    R(21,43,22,11,P.hair); R(19,40,7,10,P.hair); R(38,40,7,10,P.hair); R(24,53,16,5,P.hairD);
    R(27,40,10,3,'#c8c8c8'); R(26,46,12,1,P.hairD);
    R(30,47,4,3,P.sh); // pequena sombra da boca no bigode
  }
  // vinheta suave nas bordas
  ctx.globalAlpha=0.35; const vg=ctx.createRadialGradient(32,32,18,32,32,40); vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'#000'); ctx.fillStyle=vg; ctx.fillRect(0,0,64,64); ctx.globalAlpha=1;
}
// desenha herói 14x15 escalado
function drawHeroSprite(ctx,ox,oy,s,pal){
  const P={
    knight:{ // Leona — armadura dourada, elmo alado, capa verde
      map:["...ww...","..wYYw..","..wYYw..","..dSSd..","..SFFS..","..SFFS..","..gGGg..","..gGGg..","..gGGg..","..bMMb..","..MggM..","...MM...","..d..d..","..s..s.."],
      pal:{w:'#e8c15a',Y:'#fff0b0',d:'#3a3320',S:'#f0d8b0',F:'#c99a6a',g:'#c8a44a',G:'#7a5a1a',b:'#4a7a3a',M:'#3a5a2a',s:'#7a6a3e'} },
    samurai:{ // Sakura — cabelo vermelho, faixa branca, katana
      map:["..rrrr..","..rRRr..","..rRRr..","...FF...","..sFFs..","..bBBb..","..bBBb..","..wWWw..","..wWWw..","..bBBb..","..b..b..","..d..d..","..s..s..","........"],
      pal:{r:'#c0392b',R:'#e05a4a',F:'#f0c8a0',s:'#d0d0d0',b:'#8a1a1a',B:'#b03030',w:'#e8e0d0',W:'#c0b8a8',d:'#5a3a2a'} },
    mage:{ // Celes — manto azul, capuz, cajado
      map:["..bbbb..","..bBBb..","..bFFb..","..bffb..","..bBBb..","..BBBB..","..BBBB.k","..BBBBkk","..BBBBk.","..BBBB..","..BBBB..","..B..B..","..d..d..","........"],
      pal:{b:'#1f3f78',B:'#2a5aa8',F:'#f0d0b0',f:'#c9a06a',k:'#c8a44a',d:'#28407a'} },
    sage:{ // Darius — manto azul claro, barba branca, cajado dourado
      map:["..cccc..","..cWWc..","..WWWW.k","..WFFW kk","..WffW k.","..cBBc..","..cBBc..","..BBBB..","..BBBB..","..BBBB..","..BBBB..","..B..B..","..d..d..","........"],
      pal:{c:'#3a6ab0',W:'#e8e8e8',F:'#e8d0b0',f:'#c9a06a',B:'#3a5a9a',k:'#e8c15a',d:'#2a406a'} },
  }[pal];
  if(!P)return; drawMap(ctx,ox,oy,s,P.map,P.pal);
}

/* ================= SPRITES INIMIGOS (combate) ================= */
function drawEnemySprite(ctx,cx,cy,scale,spr,flash,dieFade){
  ctx.save(); ctx.translate(cx,cy); ctx.scale(scale,scale);
  const s=1;
  const draw=(map,pal)=>{ const w=map[0].length,h=map.length; drawMap(ctx,-w*s/2,-h*s,s,map,pal); };
  const P={
    slime:{map:["..gggg..",".gGGGGg.","gGwGGwGg","gGGGGGGg","gGGGGGGg",".gGGGGg.","..gggg.."],
      pal:{g:'#3a8a4a',G:'#5ac86a',w:'#fff'}},
    goblin:{map:["..ee....",".eEEe.d.","eEwEEwEe","eEEEEEEe",".eEEEEe.","..ll.ll.",".dl..ld.","..r..r.."],
      pal:{e:'#4a7a3a',E:'#6aa84a',w:'#fff',l:'#7a5a2a',d:'#c0c0c0',r:'#3a2a1a'}},
    bat:{map:["k......k","kk.dd.kk","kKKddKKk",".kwddwk.","..dddd..","...dd...","..k..k.."],
      pal:{k:'#3a2a4a',K:'#5a3a6a',d:'#6a4a7a',w:'#e05a5a'}},
    skeleton:{map:["..wwww..",".wWWWWw.","wWkWWkWw","wWWWWWWw",".wwwwww.","w.wwww.w","w.wWWw.w","..w..w.."],
      pal:{w:'#d8d8c8',W:'#f0f0e0',k:'#101010'}},
    cultist:{map:["..rrrr..",".rRRRRr.","rRkkkkRr","rRkKKkRr","rRRRRRRr",".rRRRRr.","..rRRr..","..r..r.."],
      pal:{r:'#6a1a2a',R:'#8a2a3a',k:'#100810',K:'#c0392b'}},
    wraith:{map:["..pp....",".pPPp.p.","pPwwPPpp","pPPPPPp.",".pPPPp..","..pPp...","...p....","..p.p..."],
      pal:{p:'#4a2a6a',P:'#7a4aa0',w:'#c8a0ff'}},
    spider:{map:["k......k",".k.dd.k.","kkdDDdkk",".kDwwDk.","k.DDDD.k","kk.dd.kk","k.k..k.k"],
      pal:{k:'#2a1a2a',d:'#5a3a4a',D:'#7a4a5a',w:'#e05a5a'}},
    golem:{map:["..GGGG..",".GgggggG","GggXXggG","GgXwwXgG","GggXXggG","GgggggG.","Gg.GG.gG","GG.GG.GG","gg....gg","GG....GG"],
      pal:{G:'#6a5a4a',g:'#8a7a5a',X:'#3a2a1a',w:'#e8c15a'}},
    dknight:{map:["..kkkk..",".kKKKKk.","kKrrrrKk","kKrwwrKk","kKrrrrKk","KKKddKKK","kKKddKKk","kK.dd.Kk","kk.dd.kk","KK.KK.KK"],
      pal:{k:'#1a1a22',K:'#3a3a4a',r:'#5a1a2a',w:'#e05050',d:'#7a2a3a'}},
  }[spr]||{map:["..xx..","..xx.."],pal:{x:'#888'}};
  draw(P.map,P.pal);
  ctx.restore();
  if(flash>0){ ctx.save(); ctx.globalAlpha=flash*0.6; ctx.globalCompositeOperation='lighter'; ctx.translate(cx,cy);ctx.scale(scale,scale);
    const w=P.map[0].length,h=P.map.length; ctx.fillStyle='#fff';
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(P.map[y][x]!==' '&&P.map[y][x]!=='.')ctx.fillRect(-w/2+x,-h+y,1,1);} ctx.restore(); }
}

/* ================= RENDER COMBATE ================= */
let bfxRunning=false, shakeAmt=0, dirtyBP=false;
function markDirty(){ dirtyBP=true; }
function bfxLoop(){ if(bfxRunning)return; bfxRunning=true;
  const cv=$('#benemies'); function frame(){
    if(G.state!=='battle'){ bfxRunning=false; return; }
    requestAnimationFrame(frame);
    const W=cv.clientWidth,H=cv.clientHeight; if(cv.width!==W){cv.width=W;cv.height=H;layoutEnemies();}
    const ctx=cv.getContext('2d'); ctx.clearRect(0,0,W,H);
    // fundo masmorra sutil
    const gr=ctx.createRadialGradient(W/2,H*0.35,40,W/2,H*0.4,H); gr.addColorStop(0,'#1a1420');gr.addColorStop(1,'#050406'); ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    // chão
    ctx.fillStyle='rgba(20,16,22,.6)'; ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W*0.2,H*0.62);ctx.lineTo(W*0.8,H*0.62);ctx.lineTo(W,H);ctx.fill();
    const sx=(Math.random()-0.5)*shakeAmt, sy=(Math.random()-0.5)*shakeAmt; if(shakeAmt>0)shakeAmt*=0.85;
    const t=performance.now()/500;
    for(const e of G.battle.enemies){
      const bob=Math.sin(t+e.bob)*4*e.scale;
      const cx=e.sx*W+sx, cy=e.sy*H+sy+bob;
      if(!e.alive){ if(e.dieT>0){ ctx.save();ctx.globalAlpha=e.dieT; drawEnemySprite(ctx,cx,cy,e.scale*5.2,e.spr,0,e.dieT); ctx.restore(); e.dieT-=0.03; } continue; }
      if(e.hitFlash>0)e.hitFlash-=0.08;
      drawEnemySprite(ctx,cx,cy,e.scale*5.2,e.spr,e.hitFlash,1);
      // nome + guarda + hp (chefe)
      ctx.textAlign='center'; ctx.font='bold 11px "Courier New"'; ctx.fillStyle=e.broken?'#ffd94a':'#d9d2be';
      ctx.fillText(e.name+(e.broken?' ⚡QUEBRADO':''), cx, cy- e.scale*46 -14);
      // barra de guarda (escudos)
      const shields=e.guardMax; const gy=cy-e.scale*46-6; ctx.font='10px "Courier New"';
      let gtxt=''; for(let i=0;i<shields;i++)gtxt+= i<e.guard?'◆':'◇';
      ctx.fillStyle=e.broken?'#ff5a4a':'#8ac8ff'; ctx.fillText(gtxt,cx,gy);
      // hp bar
      const bw=e.boss?120:46, bx=cx-bw/2, by=cy-e.scale*46;
      ctx.fillStyle='#000';ctx.fillRect(bx-1,by-1,bw+2,6); ctx.fillStyle='#3a1010';ctx.fillRect(bx,by,bw,4);
      ctx.fillStyle=e.broken?'#ffb04a':'#d24a3e'; ctx.fillRect(bx,by,bw*(e.hp/e.mhp),4);
      // fraquezas descobertas
      const shown=[...(e.scanned?[...e.weak]:[...e.discovered].filter(x=>e.weak.has(x)))];
      if(shown.length){ ctx.font='11px sans-serif'; ctx.fillStyle='#ffcf6a'; ctx.fillText('Fraco: '+shown.map(w=>ELEM[w]).join(' '), cx, cy+8); }
    }
    if(dirtyBP){ dirtyBP=false; renderBparty(); }
  }
  frame();
}
function shakeField(a){ shakeAmt=Math.max(shakeAmt,a); }
async function animAttack(c){ blog(c.name+' ataca!'); await wait(120); }
async function animCast(c,sk){ SFX.cast(); blog(c.name+' concentra energia...'); await wait(220); }
async function animEnemyAttack(e){ e.bob+=0.3; await wait(120); }

function renderBparty(){
  const el=$('#bparty'); el.innerHTML='';
  G.party.forEach((c,i)=>{
    const turn=(G.curActor===c && G.state==='battle');
    const d=document.createElement('div'); d.className='bpc'+(c.alive?'':' dead')+(turn?' turn':'');
    let rz=''; for(let k=0;k<5;k++)rz+=`<i class="${k<c.resolve?'on':''}"></i>`;
    d.innerHTML=`<div class="bn">${c.name}</div><div class="row">${c.row===0?'⚔':'✧'} ${c.row===0?'Frente':'Trás'}</div>
      <div class="bpbar hp"><i style="width:${c.hp/c.mhp*100}%"></i><span class="t">${c.hp}/${c.mhp}</span></div>
      <div class="bpbar mp"><i style="width:${c.mmp?c.mp/c.mmp*100:0}%"></i><span class="t">${c.mp}/${c.mmp} MP</span></div>
      <div class="rz">${rz}</div><div class="cnd">${condChips(c)}</div>`;
    el.appendChild(d);
  });
}
function renderTurnQ(){
  const q=$('#turnQ'); if(!G.battle.order){q.innerHTML='';return;}
  q.innerHTML=''; const idx=G.battle.order.indexOf(G.curActor);
  G.battle.order.forEach((c,i)=>{ if(!c.alive)return;
    const col=c.side==='party'?'#4a86d8':(c.boss?'#c83a3a':'#8a6a3a');
    const now=c===G.curActor;
    const el=document.createElement('div'); el.className='tq'+(now?' now':'');
    el.innerHTML=`<span class="dot" style="background:${col}"></span>${c.name.split(' ')[0]}`;
    q.appendChild(el);
  });
}
function blog(s){ const l=$('#blog'); const div=document.createElement('div'); div.className='ln'; div.textContent=s;
  l.appendChild(div); while(l.children.length>3)l.removeChild(l.firstChild); G.battle&&G.battle.log.push(s); }
function popup(t,val,cls){ const cv=$('#benemies'),f=$('#bfield'); let x,y;
  if(t.side==='enemy'){ const r=cv.getBoundingClientRect(),fr=f.getBoundingClientRect(); x=r.left-fr.left+t.sx*r.width; y=r.top-fr.top+t.sy*r.height-t.scale*40; }
  else { const idx=G.party.indexOf(t),card=$('#bparty').children[idx]; if(!card)return; const cr=card.getBoundingClientRect(),fr=$('#battle').getBoundingClientRect(); x=cr.left-fr.left+cr.width/2; y=cr.top-fr.top; }
  const p=document.createElement('div'); p.className='pop '+(cls||''); p.textContent=val; p.style.left=x+'px';p.style.top=y+'px';
  ($('#battle')).appendChild(p); setTimeout(()=>p.remove(),1000);
}

/* ================= TOAST / MENSAGENS ================= */
let toastT;
function toast(s,ms){ const m=$('#msg'); if(m){m.textContent=s;m.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>m.classList.remove('on'),ms||1500);} logMsg(s); }
function logMsg(s){ const l=$('#logText'); if(!l)return; const div=document.createElement('div');div.className='ln';div.textContent=(''+s).replace(/\n/g,'  ·  ');
  l.appendChild(div); while(l.children.length>3)l.removeChild(l.firstChild); }

/* ================= MAPA ================= */
function openMap(){ const ov=$('#mapOv'); ov.classList.add('on'); $('#mapFl').textContent=G.dun.name; drawMapCv(); }
function drawMapCv(){ const cv=$('#mapCv'),d=G.dun; const cell=Math.floor(Math.min(520,window.innerWidth-40)/d.w); cv.width=d.w*cell;cv.height=d.h*cell;
  const ctx=cv.getContext('2d'); ctx.fillStyle='#050505';ctx.fillRect(0,0,cv.width,cv.height);
  for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){ const px=x*cell,py=y*cell; const ex=d.explored[y][x];
    if(!ex){ ctx.fillStyle='#0d0d0f'; ctx.fillRect(px,py,cell-1,cell-1); continue; }
    let t=d.grid[y][x]; let col='#2a2a30';
    if(t==='#')col='#181820'; else if(t==='+')col='#7a5a2a'; else if(t==='S'&&!d.secretsRevealed.has(x+','+y))col='#181820';
    else if(t==='C'&&!d.looted.has(x+','+y))col='#c8a44a'; else if(t==='>')col='#5aa85a'; else if(t==='<')col='#3a6ab0';
    else if(t==='F')col='#4a86d8'; else if(t==='B')col='#c83a3a'; else col='#3a3a44';
    ctx.fillStyle=col; ctx.fillRect(px,py,cell-1,cell-1);
  }
  // jogador
  const jx=Math.floor(G.px)*cell,jy=Math.floor(G.py)*cell; ctx.fillStyle='#e8c15a';
  ctx.beginPath(); const cxp=jx+cell/2,cyp=jy+cell/2,r=cell*0.35, a=G.dir*Math.PI/2;
  ctx.moveTo(cxp+Math.cos(a)*r,cyp+Math.sin(a)*r); ctx.lineTo(cxp+Math.cos(a+2.4)*r,cyp+Math.sin(a+2.4)*r); ctx.lineTo(cxp+Math.cos(a-2.4)*r,cyp+Math.sin(a-2.4)*r); ctx.fill();
}

/* ================= CAMP ================= */
function openCamp(){ if(G.state!=='explore')return; const ov=$('#campOv'); ov.classList.add('on'); renderCamp(); }
function renderCamp(){ const m=$('#campMenu');
  const invTxt=Object.keys(G.inv).filter(id=>G.inv[id]>0).map(id=>ITEMS[id].name+' ×'+G.inv[id]).join(', ')||'vazio';
  m.innerHTML=`
    <div class="mitem" data-c="rest"><span>🔥 Descansar</span><span class="sub">restaura 35% HP/MP · risco de emboscada</span></div>
    <div class="mitem" data-c="item"><span>🜂 Usar Item</span><span class="sub">${invTxt}</span></div>
    <div class="mitem" data-c="form"><span>↕ Formação</span><span class="sub">trocar frente/trás</span></div>
    <div class="mitem" data-c="status"><span>📖 Fichas</span><span class="sub">ver atributos e técnicas</span></div>
    <div class="mitem" data-c="mute"><span>🔊 Som: ${AU.muted?'OFF':'ON'}</span><span class="sub">liga/desliga áudio</span></div>
    <div class="mitem" data-c="save"><span>💾 Salvar</span><span class="sub">progresso é salvo automaticamente</span></div>`;
  m.querySelectorAll('.mitem').forEach(el=>el.onclick=()=>{ SFX.ui(); campAction(el.dataset.c); });
}
function campAction(c){
  if(c==='rest'){ G.party.forEach(p=>{ if(p.alive){p.hp=clamp(p.hp+Math.round(p.mhp*0.35),0,p.mhp);p.mp=clamp(p.mp+Math.round(p.mmp*0.35),0,p.mmp);} });
    $('#campOv').classList.remove('on'); renderHUD(); toast('Descanso. Grupo recupera as forças.',1500);
    if(chance(0.28)){ setTimeout(()=>{toast('⚠ Emboscados durante o descanso!',1500); setTimeout(()=>startBattle(rollFormation(false)),700);},700); } saveGame(); return; }
  if(c==='mute'){ AU.muted=!AU.muted; if(AU.muted)musicStop(); else if(G.state==='explore')musicStart('explore'); renderCamp(); return; }
  if(c==='save'){ saveGame(); toast('Progresso salvo.',1200); return; }
  if(c==='form'){ renderFormation(); return; }
  if(c==='status'){ renderStatus(); return; }
  if(c==='item'){ renderCampItems(); return; }
}
function renderFormation(){ const m=$('#campMenu');
  m.innerHTML=`<div style="color:#c8a44a;letter-spacing:2px;margin-bottom:10px">FORMAÇÃO — toque p/ alternar frente/trás</div>`+
    G.party.map((c,i)=>`<div class="mitem" data-f="${i}"><span>${c.name}</span><span class="sub">${c.row===0?'⚔ Linha da FRENTE':'✧ Linha de TRÁS'}</span></div>`).join('')+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelectorAll('[data-f]').forEach(el=>el.onclick=()=>{ const c=G.party[+el.dataset.f]; c.row=c.row?0:1; SFX.ui(); renderFormation(); });
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}
function renderStatus(){ const m=$('#campMenu');
  m.innerHTML=G.party.map(c=>`<div class="mitem" style="flex-direction:column;align-items:flex-start;gap:4px">
    <span>${c.name} — ${c.cls} · Nv ${c.lv}</span>
    <span class="sub">HP ${c.mhp} · MP ${c.mmp} · FOR ${c.str} · MAG ${c.mag} · DEF ${c.def} · RES ${c.res} · AGI ${c.agi}</span>
    <span class="sub" style="color:#8ac8ff">Técnicas: ${knownSkills(c).map(id=>SKILLS[id].name).join(', ')}</span></div>`).join('')+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}
function renderCampItems(){ const m=$('#campMenu'); const ids=Object.keys(G.inv).filter(id=>G.inv[id]>0);
  m.innerHTML=(ids.length?ids.map(id=>`<div class="mitem" data-u="${id}"><span>${ITEMS[id].name} ×${G.inv[id]}</span><span class="sub">${ITEMS[id].desc}</span></div>`).join(''):`<div class="mitem"><span>Sem itens.</span></div>`)+
    `<div class="mitem" data-back><span>‹ Voltar</span></div>`;
  m.querySelectorAll('[data-u]').forEach(el=>el.onclick=()=>{ const id=el.dataset.u,it=ITEMS[id];
    if(it.use==='heal'||it.use==='mp'||it.use==='cure'||it.use==='revive'){ // aplica ao grupo (mais ferido)
      const t=it.use==='revive'?G.party.find(p=>!p.alive):G.party.filter(p=>p.alive).sort((a,b)=>a.hp/a.mhp-b.hp/b.mhp)[0];
      if(!t){toast('Ninguém precisa disso agora.',1200);return;}
      G.inv[id]--; if(it.use==='heal')t.hp=clamp(t.hp+it.pow,0,t.mhp); else if(it.use==='mp')t.mp=clamp(t.mp+it.pow,0,t.mmp); else if(it.use==='cure')t.status={}; else if(it.use==='revive'){t.alive=true;t.hp=Math.round(t.mhp*it.pow);}
      SFX.heal(); renderHUD(); renderCampItems();
    } else { toast('Esse item é só para combate.',1300); }
  });
  m.querySelector('[data-back]').onclick=()=>{SFX.back();renderCamp();};
}

/* ================= TELAS FIM ================= */
function showDead(){ musicStop(); $('#deadStats').innerHTML=`Chegaram ao <b>Andar ${G.depth}</b> · ${G.kills} inimigos abatidos · ${G.gp} GP.<br>A masmorra reclama mais quatro almas...`;
  $('#dead').classList.remove('hidden'); clearSave(); }
function showWin(){ musicStop(); SFX.win(); $('#winStats').innerHTML=`Vocês venceram o Cavaleiro da Cinza e escaparam do abismo!<br>Andar ${G.depth} · ${G.gp} GP · Nível médio ${Math.round(G.party.reduce((a,c)=>a+c.lv,0)/4)}.`;
  $('#win').classList.remove('hidden'); }

/* ================= SAVE ================= */
const SAVEKEY='masmorra_save_v1';
function saveGame(){ try{ const s={gp:G.gp,depth:G.depth,maxFloor:G.maxFloor,inv:G.inv,steps:G.steps,kills:G.kills,
    party:G.party.map(c=>({id:c.id,lv:c.lv,xp:c.xp,xpNext:c.xpNext,mhp:c.mhp,hp:c.hp,mmp:c.mmp,mp:c.mp,str:c.str,mag:c.mag,def:c.def,res:c.res,agi:c.agi,luck:c.luck,row:c.row})),
    scene:G.dun?serialScene(G.dun):null, px:G.px,py:G.py,dir:G.dir };
  localStorage.setItem(SAVEKEY,JSON.stringify(s)); }catch(e){} }
function serialScene(d){ return {depth:d.depth,grid:d.grid.map(r=>r.join('')),name:d.name,
  doorsOpen:[...d.doorsOpen],secretsRevealed:[...d.secretsRevealed],looted:[...d.looted],triggered:[...d.triggered],rested:[...d.rested],
  explored:d.explored.map(r=>r.map(v=>v?1:0)),isBoss:d.isBoss}; }
function loadScene(s){ const d={depth:s.depth,w:s.grid[0].length,h:s.grid.length,grid:s.grid.map(r=>r.split('')),name:s.name,
  doorsOpen:new Set(s.doorsOpen),secretsRevealed:new Set(s.secretsRevealed),looted:new Set(s.looted),triggered:new Set(s.triggered),rested:new Set(s.rested),
  explored:s.explored.map(r=>r.map(v=>!!v)),isBoss:s.isBoss,spawn:{x:1.5,y:1.5,dir:1}}; return d; }
function hasSave(){ return !!localStorage.getItem(SAVEKEY); }
function clearSave(){ try{localStorage.removeItem(SAVEKEY);}catch(e){} }
function loadGame(){ try{ const s=JSON.parse(localStorage.getItem(SAVEKEY)); if(!s)return false;
  G.gp=s.gp;G.depth=s.depth;G.floor=s.depth;G.maxFloor=s.maxFloor||s.depth;G.inv=s.inv||{};G.steps=s.steps||0;G.kills=s.kills||0;
  G.party=s.party.map(p=>{ const c=mkChar(p.id); Object.assign(c,{lv:p.lv,xp:p.xp,xpNext:p.xpNext,mhp:p.mhp,hp:p.hp,mmp:p.mmp,mp:p.mp,str:p.str,mag:p.mag,def:p.def,res:p.res,agi:p.agi,luck:p.luck,row:p.row}); return c; });
  if(s.scene){ G.dun=loadScene(s.scene); G.scenes[s.depth]=G.dun; G.px=s.px;G.py=s.py;G.dir=s.dir;G.ang=G.dir*Math.PI/2;G.tang=G.ang; }
  else enterFloor(s.depth);
  return true;
}catch(e){ return false; } }

/* ================= NOVO JOGO ================= */
function newGame(){ G.gp=0;G.depth=1;G.floor=1;G.maxFloor=1;G.inv={erva:3,maca:2,pao:1,pocao:1,eter:1,antidoto:1,fenix:1};G.steps=0;G.kills=0;G.scenes={};
  G.party=[mkChar('leona'),mkChar('sakura'),mkChar('celes'),mkChar('darius')];
  enterFloor(1); }

/* ================= INPUT ================= */
function bindInput(){
  document.addEventListener('keydown',e=>{
    if(G.state==='explore'){
      if(e.key==='ArrowUp'||e.key==='w')tryMove(...DIRV[G.dir]);
      else if(e.key==='ArrowDown'||e.key==='s')tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);
      else if(e.key==='ArrowLeft')turn(-1);
      else if(e.key==='ArrowRight')turn(1);
      else if(e.key==='a')tryMove(...DIRV[(G.dir+3)%4]);
      else if(e.key==='d')tryMove(...DIRV[(G.dir+1)%4]);
      else if(e.key==='e'||e.key==='Enter'||e.key===' ')interact();
      else if(e.key==='m'||e.key==='M')openMap();
      else if(e.key==='x'||e.key==='X'||e.key==='Escape')openCamp();
    }
  });
  // dpad
  $$('#dpad .dbtn').forEach(b=>b.onclick=()=>{ const m=b.dataset.m;
    if(m==='fw')tryMove(...DIRV[G.dir]); else if(m==='bw')tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);
    else if(m==='tl')turn(-1); else if(m==='tr')turn(1);
    else if(m==='sl')tryMove(...DIRV[(G.dir+3)%4]); else if(m==='sr')tryMove(...DIRV[(G.dir+1)%4]);
  });
  // botões utilitários
  $$('#utilBar .ub').forEach(b=>b.onclick=()=>{ SFX.ui(); const u=b.dataset.u;
    if(u==='rest')openCamp(); else if(u==='map')openMap();
    else if(u==='save'){saveGame();toast('Progresso salvo.',1100);}
    else if(u==='wait'){ if(G.state==='explore'){toast('Você aguarda, atento às sombras...',900); G.stepsSince++; if(chance(0.2))setTimeout(()=>startBattle(rollFormation(false)),400);} }
  });
  // swipe no view p/ mover/virar — ignora toques que começam nos botões
  const vw=$('#viewWrap'); let sx,sy,sTarget=null;
  const onDpad=el=>el&&el.closest&&(el.closest('#dpad')||el.closest('#hints'));
  vw.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;sTarget=e.target;},{passive:true});
  vw.addEventListener('touchend',e=>{
    const tg=sTarget||e.target; sTarget=null;
    if(onDpad(tg)||onDpad(e.target))return;                 // toque no D-pad: os botões cuidam
    const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)<30&&Math.abs(dy)<30){interact();return;}
    if(Math.abs(dx)>Math.abs(dy)){dx>0?turn(1):turn(-1);}else{dy<0?tryMove(...DIRV[G.dir]):tryMove(-DIRV[G.dir][0],-DIRV[G.dir][1]);}
  },{passive:true});
  // fechar overlays
  $$('[data-close]').forEach(el=>el.onclick=()=>$('#'+el.dataset.close).classList.remove('on'));
  // botões de tela
  $('#btnPlay').onclick=()=>{ auInit(); if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume(); startNew(); };
  $('#btnCont').onclick=()=>{ auInit(); if(AU.ctx&&AU.ctx.state==='suspended')AU.ctx.resume(); startCont(); };
  $('#btnRevive').onclick=()=>{ $('#dead').classList.add('hidden'); startNew(); };
  $('#btnWinCont').onclick=()=>{ $('#win').classList.add('hidden'); G.state='explore'; musicStart('explore'); };
}
function startNew(){ newGame(); $('#title').classList.add('hidden'); G.state='explore'; renderHUD(); musicStart('explore'); saveGame(); }
function startCont(){ if(loadGame()){ $('#title').classList.add('hidden'); G.state='explore'; renderHUD(); musicStart('explore'); } else startNew(); }

/* ================= BOOT ================= */
function boot(){ buildTextures(); rcInit(); RC.zbuf=new Float32Array(RC.RW); bindInput();
  if(hasSave())$('#btnCont').style.display='inline-block';
  loop();
}
boot();
