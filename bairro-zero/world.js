/* ========================================================================
   BAIRRO ZERO — mundo: texturas procedurais, level design, colisão
   Estilo Project Zomboid: subúrbio isométrico, casas mobiliadas, mercado.
   Grade 72×72 (1 unidade = 1 tile). Colisão por ARESTA (paredes/portas).
   ===================================================================== */
const WORLD = (() => {
  const W = 72, TPX = 16;                    // tiles e pixels por tile no mega-canvas
  const T = { GRASS:0, ROAD:1, SIDE:3, DRIVE:4, DIRT:5, WOOD:10, TILEF:11, CARPET:12, CARPET2:13, STORE:14, STOCK:15 };
  const ground = new Uint8Array(W*W); ground.fill(T.GRASS);
  // arestas: V(x,z)=parede na linha x entre (x-1,z) e (x,z) | H(x,z)=linha z
  // 0 livre · 1 parede · 2 janela (bloqueia passo, deixa VER) · 3 porta fechada · 4 porta aberta · 5 cerca baixa
  const EV = new Uint8Array((W+1)*(W+1)), EH = new Uint8Array((W+1)*(W+1));
  const eIdx = (x,z)=> x*(W+1)+z;
  const solid = new Uint8Array(W*W);         // móveis / obstáculos por tile
  const rng = (()=>{ let s=1234567; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)%10000)/10000; }; })();

  /* ================= TEXTURAS PROCEDURAIS ================= */
  function cv(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }
  function tex(canvas, repX=1, repY=1){ const t=new THREE.CanvasTexture(canvas);
    t.magFilter=THREE.NearestFilter; t.minFilter=THREE.NearestFilter;
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(repX,repY); return t; }
  function jitter(c,x,y,w,h,base,amt,n){ const g=c.getContext('2d');
    for(let i=0;i<n;i++){ const v=(rng()-0.5)*amt; g.fillStyle=shade(base,v);
      g.fillRect(x+rng()*w, y+rng()*h, 1+rng()*2, 1+rng()*2); } }
  function shade(hex,amt){ const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    r=Math.max(0,Math.min(255,r+amt*255)); g=Math.max(0,Math.min(255,g+amt*255)); b=Math.max(0,Math.min(255,b+amt*255));
    return `rgb(${r|0},${g|0},${b|0})`; }

  // pinta um tile no mega-canvas do chão
  function paintTile(g,x,z,t){
    const px=x*TPX, py=z*TPX;
    const R=(c)=>{ g.fillStyle=c; g.fillRect(px,py,TPX,TPX); };
    if(t===T.GRASS){ R('#4d6b32'); for(let i=0;i<14;i++){ g.fillStyle=shade('#4d6b32',(rng()-0.45)*0.16); g.fillRect(px+rng()*TPX,py+rng()*TPX,1,2); } if(rng()<0.06){ g.fillStyle='#6d8446'; g.fillRect(px+rng()*12,py+rng()*12,3,2);} }
    else if(t===T.ROAD){ R('#3b3b40'); for(let i=0;i<10;i++){ g.fillStyle=shade('#3b3b40',(rng()-0.5)*0.10); g.fillRect(px+rng()*TPX,py+rng()*TPX,2,2);} if(rng()<0.08){ g.fillStyle='#2e2e33'; g.fillRect(px+2,py+rng()*14,10,1);} }
    else if(t===T.SIDE){ R('#8d8d88'); g.strokeStyle='#75756f'; g.lineWidth=1; g.strokeRect(px+0.5,py+0.5,TPX-1,TPX-1); jitter(g.canvas,px,py,TPX,TPX,'#8d8d88',0.08,6); }
    else if(t===T.DRIVE){ R('#9a978f'); g.strokeStyle='#82807a'; g.strokeRect(px+0.5,py+0.5,TPX-1,TPX-1); }
    else if(t===T.DIRT){ R('#7a6742'); jitter(g.canvas,px,py,TPX,TPX,'#7a6742',0.14,10); }
    else if(t===T.WOOD){ R('#8a6844'); for(let i=0;i<4;i++){ g.fillStyle=shade('#8a6844',(i%2?-0.05:0.04)+(rng()-0.5)*0.05); g.fillRect(px,py+i*4,TPX,4);} g.fillStyle='#6d5236'; g.fillRect(px,py,TPX,1); }
    else if(t===T.TILEF){ R('#b8bdb2'); g.strokeStyle='#9aa094'; g.strokeRect(px+0.5,py+0.5,8,8); g.strokeRect(px+8.5,py+8.5,8,8); g.strokeRect(px+8.5,py+0.5,8,8); g.strokeRect(px+0.5,py+8.5,8,8); }
    else if(t===T.CARPET){ R('#7d6a8a'); jitter(g.canvas,px,py,TPX,TPX,'#7d6a8a',0.07,8); }
    else if(t===T.CARPET2){ R('#6a7d6e'); jitter(g.canvas,px,py,TPX,TPX,'#6a7d6e',0.07,8); }
    else if(t===T.STORE){ R('#a8a8a0'); g.strokeStyle='#8f8f88'; g.strokeRect(px+0.5,py+0.5,TPX-1,TPX-1); if((x+z)%2){ g.fillStyle='#b2b2aa'; g.fillRect(px+1,py+1,TPX-2,TPX-2);} }
    else if(t===T.STOCK){ R('#7c7468'); jitter(g.canvas,px,py,TPX,TPX,'#7c7468',0.08,6); }
  }

  // texturas de parede
  function texSiding(base){ const c=cv(64,128), g=c.getContext('2d');
    g.fillStyle=base; g.fillRect(0,0,64,128);
    for(let y=0;y<128;y+=13){ g.fillStyle=shade(base,-0.10); g.fillRect(0,y+11,64,2); g.fillStyle=shade(base,0.06); g.fillRect(0,y,64,1); }
    jitter(c,0,0,64,128,base,0.05,30); return c; }
  function texBrick(){ const c=cv(64,128), g=c.getContext('2d'); const base='#8a5a48';
    g.fillStyle=base; g.fillRect(0,0,64,128);
    for(let y=0;y<128;y+=10){ g.fillStyle='#6e463a'; g.fillRect(0,y+8,64,2);
      for(let x=((y/10)%2)*10; x<64; x+=20){ g.fillRect(x,y,2,8); } }
    jitter(c,0,0,64,128,base,0.06,40); return c; }
  function texPaint(base){ const c=cv(32,64), g=c.getContext('2d'); g.fillStyle=base; g.fillRect(0,0,32,64);
    jitter(c,0,0,32,64,base,0.03,14); g.fillStyle=shade(base,-0.12); g.fillRect(0,58,32,6); return c; }
  function texWindow(base){ const c=cv(64,128), g=c.getContext('2d');
    g.fillStyle=base; g.fillRect(0,0,64,128);
    for(let y=0;y<128;y+=13){ g.fillStyle=shade(base,-0.10); g.fillRect(0,y+11,64,2); }
    // janela
    g.fillStyle='#e8e4d8'; g.fillRect(10,28,44,56);
    const sky=g.createLinearGradient(0,30,0,80); sky.addColorStop(0,'#9db8c8'); sky.addColorStop(1,'#5a7484');
    g.fillStyle=sky; g.fillRect(13,31,38,50);
    g.fillStyle='rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(13,31); g.lineTo(30,31); g.lineTo(13,60); g.fill();
    g.fillStyle='#e8e4d8'; g.fillRect(30,31,4,50); g.fillRect(13,54,38,4);
    return c; }
  function texStoreFront(){ const c=cv(64,128), g=c.getContext('2d');
    g.fillStyle='#5a6a72'; g.fillRect(0,0,64,128);
    g.fillStyle='#e8e4d8'; g.fillRect(4,20,56,74);
    const sky=g.createLinearGradient(0,22,0,92); sky.addColorStop(0,'#8fb0c0'); sky.addColorStop(1,'#4a6474');
    g.fillStyle=sky; g.fillRect(7,23,50,68);
    g.fillStyle='rgba(255,255,255,.2)'; g.beginPath(); g.moveTo(7,23); g.lineTo(28,23); g.lineTo(7,64); g.fill();
    g.fillStyle='#c8b060'; g.fillRect(0,0,64,14); g.fillStyle='#7a2a22'; g.fillRect(0,2,64,10);
    return c; }
  function texRoof(base){ const c=cv(64,64), g=c.getContext('2d');
    g.fillStyle=base; g.fillRect(0,0,64,64);
    for(let y=0;y<64;y+=8){ g.fillStyle=shade(base,-0.12); g.fillRect(0,y+6,64,2);
      for(let x=((y/8)%2)*8; x<64; x+=16){ g.fillStyle=shade(base,-0.06); g.fillRect(x,y,1,6); } }
    jitter(c,0,0,64,64,base,0.05,30); return c; }
  function texFence(){ const c=cv(64,32), g=c.getContext('2d'); g.fillStyle='#7a6142'; g.fillRect(0,0,64,32);
    for(let x=0;x<64;x+=8){ g.fillStyle=shade('#7a6142',(x%16?-0.06:0.05)); g.fillRect(x,0,7,32); }
    g.fillStyle='#5f4a30'; g.fillRect(0,8,64,3); g.fillRect(0,22,64,3); return c; }

  /* ================= GEOMETRIA: fusão de caixas ================= */
  // itens: {w,h,d,x,y,z,ry?,mi?(material index),col?} → 1 mesh com grupos
  function mergeBoxes(items, mats){
    const pos=[],nor=[],uv=[],col=[],groups=[]; let vc=0; const useCol = items.some(i=>i.col);
    const sorted = items.slice().sort((a,b)=>(a.mi||0)-(b.mi||0));
    let curMi=-1, gStart=0;
    for(const it of sorted){
      const mi=it.mi||0;
      if(mi!==curMi){ if(curMi>=0) groups.push([gStart, vc-gStart, curMi]); curMi=mi; gStart=vc; }
      let g=new THREE.BoxGeometry(it.w,it.h,it.d);
      if(it.ry) g.rotateY(it.ry);
      g.translate(it.x,it.y,it.z);
      g=g.toNonIndexed();
      const p=g.attributes.position.array, n=g.attributes.normal.array, u=g.attributes.uv.array;
      for(let i=0;i<p.length;i++){ pos.push(p[i]); nor.push(n[i]); }
      for(let i=0;i<u.length;i++) uv.push(u[i]);
      if(useCol){ const c=new THREE.Color(it.col||'#ffffff'); const nv=p.length/3; for(let i=0;i<nv;i++) col.push(c.r,c.g,c.b); }
      vc += p.length/3;
    }
    if(curMi>=0) groups.push([gStart, vc-gStart, curMi]);
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor,3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv,2));
    if(useCol) geo.setAttribute('color', new THREE.Float32BufferAttribute(col,3));
    groups.forEach(([s,c,m])=>geo.addGroup(s,c,m));
    return new THREE.Mesh(geo, mats);
  }

  /* ================= REGISTROS ================= */
  const buildings=[];   // {x0,z0,x1,z1, keepMesh, fadeMesh, fadeMats, roof, name}
  const doors=[];       // {edge:'V'|'H', x,z, open, group, exterior}
  const containers=[];  // {x,z,name,icon,loot,opened,marker}
  const trees=[];       // {x,z,r} p/ fade
  const lamps=[];       // {x,z,light,head}
  const zSpawns=[];     // pontos de spawn de zumbi
  let mats=null, scene=null;

  /* ================= LOOT ================= */
  const ITEMS = {
    feijao:{n:'Feijão em Lata',i:'🥫',t:'eat',v:34}, sopa:{n:'Sopa Enlatada',i:'🥫',t:'eat',v:28},
    chips:{n:'Batata Chips',i:'🍟',t:'eat',v:18}, choc:{n:'Chocolate',i:'🍫',t:'eat',v:14},
    cereal:{n:'Cereal',i:'🥣',t:'eat',v:26}, arroz:{n:'Arroz Cru',i:'🍚',t:'eat',v:22},
    agua:{n:'Água Engarrafada',i:'💧',t:'drink',v:40}, refri:{n:'Refrigerante',i:'🥤',t:'drink',v:26},
    suco:{n:'Suco de Caixinha',i:'🧃',t:'drink',v:30},
    band:{n:'Bandagem',i:'🩹',t:'heal',v:0}, analg:{n:'Analgésico',i:'💊',t:'pain',v:0},
    taco:{n:'Taco de Beisebol',i:'🏏',t:'weapon',dmg:[34,50],spd:0.9}, frig:{n:'Frigideira',i:'🍳',t:'weapon',dmg:[24,36],spd:0.75},
    peca:{n:'Pé de Cabra',i:'🪛',t:'weapon',dmg:[30,44],spd:1.0}, faca:{n:'Faca de Cozinha',i:'🔪',t:'weapon',dmg:[20,30],spd:0.5},
    rev:{n:'Revista Velha',i:'📖',t:'misc'}, vela:{n:'Vela',i:'🕯️',t:'misc'},
  };
  function roll(tbl){ const out=[]; tbl.forEach(([id,ch])=>{ if(rng()<ch) out.push(id); }); return out; }
  const LOOT = {
    'Geladeira': ()=>roll([['agua',.8],['refri',.6],['suco',.5],['feijao',.4],['choc',.3],['sopa',.3]]),
    'Armário de Cozinha': ()=>roll([['feijao',.5],['sopa',.5],['arroz',.4],['cereal',.4],['frig',.25],['faca',.3]]),
    'Guarda-roupa': ()=>roll([['band',.4],['analg',.3],['taco',.18],['rev',.3]]),
    'Estante': ()=>roll([['rev',.8],['vela',.3],['analg',.2]]),
    'Cômoda': ()=>roll([['band',.35],['analg',.35],['rev',.25]]),
    'Prateleira': ()=>roll([['feijao',.5],['sopa',.45],['chips',.55],['choc',.4],['agua',.5],['refri',.45],['cereal',.35],['arroz',.3]]),
    'Freezer': ()=>roll([['feijao',.4],['sopa',.5],['choc',.5]]),
    'Caixa Registradora': ()=>roll([['chips',.5],['choc',.4],['analg',.3]]),
    'Balcão': ()=>roll([['faca',.35],['frig',.3],['sopa',.3],['vela',.25]]),
    'Lixeira': ()=>roll([['chips',.2],['rev',.2]]),
    'Estoque': ()=>roll([['feijao',.6],['agua',.6],['arroz',.5],['peca',.3],['sopa',.4],['cereal',.4]]),
  };

  /* ================= CHÃO ================= */
  function fillGround(x0,z0,x1,z1,t){ for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++) if(x>=0&&z>=0&&x<W&&z<W) ground[x*W+z]=t; }

  /* ================= PAREDES ================= */
  // run de parede: axis 'V' (fixa x, varre z) ou 'H' (fixa z, varre x)
  // spec: {doors:[i...], wins:[i...], mi} — i = célula absoluta ao longo do run
  function wallRun(list, axis, at, from, to, spec){
    spec=spec||{};
    for(let i=from;i<to;i++){
      const isDoor=(spec.doors||[]).includes(i), isWin=(spec.wins||[]).includes(i);
      const e = axis==='V'? EV:EH;
      if(isDoor){ e[eIdx(axis==='V'?at:i, axis==='V'?i:at)]=3;
        doors.push({edge:axis, x:axis==='V'?at:i, z:axis==='V'?i:at, open:false, exterior:!!spec.ext});
        // verga da porta
        if(axis==='V') list.push({w:0.14,h:0.5,d:1.04,x:at,y:2.25,z:i+0.5,mi:spec.mi||0});
        else list.push({w:1.04,h:0.5,d:0.14,x:i+0.5,y:2.25,z:at,mi:spec.mi||0});
        continue;
      }
      e[eIdx(axis==='V'?at:i, axis==='V'?i:at)] = isWin?2:1;
      const mi = isWin? (spec.winMi!=null?spec.winMi:2) : (spec.mi||0);
      if(axis==='V') list.push({w:0.14,h:2.5,d:1.04,x:at,y:1.25,z:i+0.5,mi});
      else list.push({w:1.04,h:2.5,d:0.14,x:i+0.5,y:1.25,z:at,mi});
    }
  }

  /* ================= MÓVEIS ================= */
  // helpers de móveis → empurram caixas coloridas em fList e marcam sólidos
  function S(x,z){ if(x>=0&&z>=0&&x<W&&z<W) solid[x*W+z]=1; }
  function addContainer(x,z,name){ containers.push({x,z,name,loot:LOOT[name]?LOOT[name]():[],opened:false}); }
  const FURN = {
    sofa(f,x,z,ry){ const c='#7a4a3a',d='#8f5a48'; // 2 tiles na direção ry (0=leste→x+, PI/2=sul não usado; uso dx/dz)
      f.push({w:1.9,h:0.45,d:0.85,x:x+1,y:0.23,z:z+0.5,ry,col:d});
      f.push({w:1.9,h:0.55,d:0.25,x:x+1,y:0.75,z:z+0.5+(ry?0:-0.32),ry,col:c});
      f.push({w:0.25,h:0.35,d:0.85,x:x+0.15,y:0.62,z:z+0.5,ry,col:c});
      f.push({w:0.25,h:0.35,d:0.85,x:x+1.85,y:0.62,z:z+0.5,ry,col:c}); S(x,z); S(x+1,z); },
    tv(f,x,z){ f.push({w:1.8,h:0.5,d:0.5,x:x+1,y:0.25,z:z+0.35,col:'#4a3626'});
      f.push({w:1.3,h:0.8,d:0.1,x:x+1,y:1.0,z:z+0.3,col:'#181820'});
      f.push({w:1.1,h:0.62,d:0.02,x:x+1,y:1.0,z:z+0.24,col:'#2a3a4a'}); S(x,z); S(x+1,z); },
    coffee(f,x,z){ f.push({w:0.9,h:0.35,d:0.6,x:x+0.5,y:0.3,z:z+0.5,col:'#6d5236'}); S(x,z); },
    dining(f,x,z){ f.push({w:1.7,h:0.12,d:1.1,x:x+1,y:0.72,z:z+0.5,col:'#8a6844'});
      [[x+0.3,z+0.3],[x+1.7,z+0.3],[x+0.3,z+0.7],[x+1.7,z+0.7]].forEach(([px,pz])=>f.push({w:0.12,h:0.7,d:0.12,x:px,y:0.35,z:pz,col:'#6d5236'}));
      [[x-0.3,z+0.5],[x+2.3,z+0.5]].forEach(([px,pz])=>{ f.push({w:0.5,h:0.5,d:0.5,x:px,y:0.25,z:pz,col:'#7a5a3a'}); f.push({w:0.5,h:0.6,d:0.1,x:px,y:0.8,z:pz+0.2,col:'#7a5a3a'}); });
      S(x,z); S(x+1,z); },
    counter(f,x,z,kind){ f.push({w:0.94,h:0.85,d:0.94,x:x+0.5,y:0.43,z:z+0.5,col:'#8f7a5a'});
      f.push({w:1.0,h:0.08,d:1.0,x:x+0.5,y:0.9,z:z+0.5,col:kind==='stove'?'#3a3a40':'#cfc8b8'});
      if(kind==='sink'){ f.push({w:0.5,h:0.06,d:0.4,x:x+0.5,y:0.95,z:z+0.5,col:'#9aa4a8'}); f.push({w:0.08,h:0.3,d:0.08,x:x+0.5,y:1.1,z:z+0.28,col:'#b8c0c4'}); }
      if(kind==='stove'){ [[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]].forEach(([a,b])=>f.push({w:0.22,h:0.03,d:0.22,x:x+0.5+a,y:0.96,z:z+0.5+b,col:'#181818'})); }
      S(x,z); if(kind==='counterC') addContainer(x,z,'Balcão'); },
    fridge(f,x,z){ f.push({w:0.9,h:1.9,d:0.9,x:x+0.5,y:0.95,z:z+0.5,col:'#d8d8d0'});
      f.push({w:0.9,h:0.04,d:0.9,x:x+0.5,y:1.2,z:z+0.5,col:'#b0b0a8'});
      f.push({w:0.08,h:0.5,d:0.06,x:x+0.14,y:1.45,z:z+0.06,col:'#a8a8a0'}); S(x,z); addContainer(x,z,'Geladeira'); },
    cab(f,x,z){ f.push({w:0.94,h:0.9,d:0.94,x:x+0.5,y:0.45,z:z+0.5,col:'#7a5a3a'});
      f.push({w:1.0,h:0.06,d:1.0,x:x+0.5,y:0.93,z:z+0.5,col:'#cfc8b8'}); S(x,z); addContainer(x,z,'Armário de Cozinha'); },
    bed(f,x,z,ry){ f.push({w:1.9,h:0.35,d:1.0,x:x+1,y:0.18,z:z+0.5,ry,col:'#6d5236'});
      f.push({w:1.8,h:0.2,d:0.9,x:x+1,y:0.45,z:z+0.5,ry,col:'#c8c4b8'});
      f.push({w:0.5,h:0.15,d:0.7,x:x+0.45,y:0.58,z:z+0.5,ry,col:'#e8e4dc'});
      f.push({w:1.2,h:0.12,d:0.9,x:x+1.3,y:0.56,z:z+0.5,ry,col:'#7a4a5a'});
      f.push({w:0.15,h:0.8,d:1.0,x:x+0.08,y:0.4,z:z+0.5,ry,col:'#5f4a30'}); S(x,z); S(x+1,z); },
    wardrobe(f,x,z){ f.push({w:0.94,h:1.9,d:0.6,x:x+0.5,y:0.95,z:z+0.35,col:'#6d5236'});
      f.push({w:0.04,h:1.5,d:0.04,x:x+0.5,y:1.0,z:z+0.66,col:'#4a3626'}); S(x,z); addContainer(x,z,'Guarda-roupa'); },
    dresser(f,x,z){ f.push({w:0.9,h:0.8,d:0.5,x:x+0.5,y:0.4,z:z+0.3,col:'#7a5a3a'});
      f.push({w:0.7,h:0.06,d:0.04,x:x+0.5,y:0.5,z:z+0.56,col:'#4a3626'}); S(x,z); addContainer(x,z,'Cômoda'); },
    night(f,x,z){ f.push({w:0.5,h:0.5,d:0.5,x:x+0.5,y:0.25,z:z+0.5,col:'#7a5a3a'});
      f.push({w:0.18,h:0.3,d:0.18,x:x+0.5,y:0.65,z:z+0.5,col:'#c8b060'}); },
    toilet(f,x,z){ f.push({w:0.45,h:0.4,d:0.55,x:x+0.5,y:0.2,z:z+0.5,col:'#e8e8e0'});
      f.push({w:0.5,h:0.55,d:0.18,x:x+0.5,y:0.55,z:z+0.24,col:'#e0e0d8'}); S(x,z); },
    bsink(f,x,z){ f.push({w:0.2,h:0.6,d:0.2,x:x+0.5,y:0.3,z:z+0.5,col:'#d8d8d0'});
      f.push({w:0.55,h:0.14,d:0.45,x:x+0.5,y:0.68,z:z+0.5,col:'#e8e8e0'}); S(x,z); },
    tub(f,x,z){ f.push({w:1.9,h:0.55,d:0.85,x:x+1,y:0.28,z:z+0.5,col:'#e0e0d8'});
      f.push({w:1.6,h:0.1,d:0.55,x:x+1,y:0.5,z:z+0.5,col:'#b8c4c8'}); S(x,z); S(x+1,z); },
    book(f,x,z){ f.push({w:0.94,h:1.8,d:0.4,x:x+0.5,y:0.9,z:z+0.25,col:'#6d5236'});
      for(let i=0;i<4;i++) f.push({w:0.8,h:0.22,d:0.3,x:x+0.5,y:0.35+i*0.4,z:z+0.26,col:['#7a3a3a','#3a5a7a','#5a7a3a','#7a6a3a'][i]});
      S(x,z); addContainer(x,z,'Estante'); },
    shelf(f,x,z){ f.push({w:0.94,h:1.7,d:0.5,x:x+0.5,y:0.85,z:z+0.5,col:'#8a8a92'});
      for(let i=0;i<3;i++){ f.push({w:0.86,h:0.05,d:0.44,x:x+0.5,y:0.5+i*0.5,z:z+0.5,col:'#b0b0b8'});
        for(let k=0;k<3;k++) if(rng()<0.75) f.push({w:0.16,h:0.24,d:0.16,x:x+0.2+k*0.3,y:0.65+i*0.5,z:z+0.5,col:['#c05a3a','#3a7a5a','#c8b060','#5a6ac0'][(k+i)%4]}); }
      S(x,z); addContainer(x,z,'Prateleira'); },
    freezer(f,x,z){ f.push({w:0.94,h:0.95,d:0.94,x:x+0.5,y:0.48,z:z+0.5,col:'#d8e0e4'});
      f.push({w:0.98,h:0.05,d:0.98,x:x+0.5,y:0.98,z:z+0.5,col:'#b8c4c8'}); S(x,z); addContainer(x,z,'Freezer'); },
    cash(f,x,z){ f.push({w:1.9,h:0.95,d:0.9,x:x+1,y:0.48,z:z+0.5,col:'#7a6a52'});
      f.push({w:0.5,h:0.4,d:0.4,x:x+1.5,y:1.15,z:z+0.5,col:'#3a3a40'}); S(x,z); S(x+1,z); addContainer(x,z,'Caixa Registradora'); },
    bin(f,x,z){ f.push({w:0.55,h:0.8,d:0.55,x:x+0.5,y:0.4,z:z+0.5,col:'#3a4a3a'});
      f.push({w:0.62,h:0.08,d:0.62,x:x+0.5,y:0.84,z:z+0.5,col:'#2e3a2e'}); S(x,z); addContainer(x,z,'Lixeira'); },
    mail(f,x,z){ f.push({w:0.08,h:0.9,d:0.08,x:x+0.5,y:0.45,z:z+0.5,col:'#5a4a3a'});
      f.push({w:0.4,h:0.25,d:0.25,x:x+0.5,y:0.98,z:z+0.5,col:'#8a2a22'}); },
  };

  /* ================= CASAS (level design) ================= */
  // Cada casa: retângulo x0..x1,z0..z1 (exclusivo), doorN = porta na face norte
  function casaFamilia(fL,wL,ox,oz,doorN,winMi,wallMi){
    const x0=ox,z0=oz,x1=ox+11,z1=oz+8;
    // pisos: sala (oeste) madeira, cozinha NE tile, quarto SE carpete, banheiro meio-N tile
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0+6,z0,x1-1,z0+3,T.TILEF);       // cozinha
    fillGround(x0+7,z0+4,x1-1,z1-1,T.CARPET);     // quarto
    fillGround(x0+4,z0,x0+5,z0+2,T.TILEF);        // banheiro
    // perímetro
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:doorN?[]:[ox+2,ox+8],doors:doorN?[ox+2]:[],winMi});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,wins:doorN?[ox+3,ox+8]:[],doors:doorN?[]:[ox+2],winMi});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+4],winMi});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+2,oz+6],winMi});
    // internas: cozinha (parede V em x0+6 até z0+4, porta), banheiro, quarto
    wallRun(wL,'V',x0+6,z0,z0+4,{mi:1,doors:[z0+2]});
    wallRun(wL,'H',z0+4,x0+6,x1,{mi:1,doors:[x0+8]});
    wallRun(wL,'V',x0+7,z0+4,z1,{mi:1});
    wallRun(wL,'V',x0+4,z0,z0+3,{mi:1});
    wallRun(wL,'H',z0+3,x0+4,x0+6,{mi:1,doors:[x0+4]});
    // móveis — sala
    FURN.sofa(fL,x0+1,doorN?z1-2:z0+1,0);
    FURN.tv(fL,x0+1,doorN?z0+1:z1-2);
    FURN.coffee(fL,x0+2,oz+4);
    FURN.book(fL,x0+5,doorN?z1-1:z0+3);
    // cozinha
    FURN.fridge(fL,x1-1,z0);
    FURN.counter(fL,x1-2,z0,'sink'); FURN.counter(fL,x1-3,z0,'stove'); FURN.cab(fL,x1-4,z0);
    FURN.dining(fL,x0+7,z0+2);
    // quarto
    FURN.bed(fL,x0+8,z0+5,0);
    FURN.wardrobe(fL,x1-1,z1-1); FURN.night(fL,x0+7,z0+5); FURN.dresser(fL,x0+8,z1-1);
    // banheiro
    FURN.toilet(fL,x0+4,z0); FURN.bsink(fL,x0+5,z0);
    return {x0,z0,x1,z1,name:'Casa da Família'};
  }
  function bangalo(fL,wL,ox,oz,doorN,winMi,wallMi){
    const x0=ox,z0=oz,x1=ox+8,z1=oz+7;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0,doorN?z1-3:z0,x0+2,doorN?z1-1:z0+2,T.TILEF);   // cozinha canto
    fillGround(x0+5,z0,x1-1,z0+3,T.CARPET2);                      // quarto
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:doorN?[]:[ox+6],doors:doorN?[ox+4]:[],winMi});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,wins:doorN?[ox+1,ox+6]:[ox+1],doors:doorN?[]:[ox+4],winMi});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+3],winMi});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+5],winMi});
    wallRun(wL,'V',x0+5,z0,z0+4,{mi:1,doors:[z0+2]});
    wallRun(wL,'H',z0+4,x0+5,x1,{mi:1});
    // banheiro pequeno NW ou SW oposto à porta
    const bz = doorN? z0 : z1-2;
    wallRun(wL,'H',doorN?z0+2:z1-2,x0,x0+2,{mi:1});
    wallRun(wL,'V',x0+2,doorN?z0:bz,doorN?z0+2:z1,{mi:1,doors:[doorN?z0+1:z1-1]});
    FURN.toilet(fL,x0,bz); FURN.bsink(fL,x0+1,bz);
    // cozinha compacta no lado da porta
    const kz = doorN? z1-1 : z0;
    FURN.fridge(fL,x0,kz); FURN.counter(fL,x0+1,kz,'sink'); FURN.cab(fL,x0+2,kz);
    // sala
    FURN.sofa(fL,x0+2,oz+3,0); FURN.tv(fL,x0+2,doorN?z0+3:z1-4);
    // quarto
    FURN.bed(fL,x0+5,z0+1,0); FURN.dresser(fL,x1-1,z0+3);
    return {x0,z0,x1,z1,name:'Bangalô'};
  }
  function casaGrande(fL,wL,ox,oz,doorN,winMi,wallMi){
    const x0=ox,z0=oz,x1=ox+12,z1=oz+9;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0,z0,x0+4,z0+3,T.TILEF);          // cozinha NW
    fillGround(x0+8,z0,x1-1,z0+3,T.CARPET);       // quarto 1 NE
    fillGround(x0+8,z0+5,x1-1,z1-1,T.CARPET2);    // quarto 2 SE
    fillGround(x0+5,z0,x0+7,z0+2,T.TILEF);        // banheiro N
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:[ox+2,ox+9],winMi});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,doors:doorN?[]:[ox+5],wins:doorN?[ox+2,ox+9]:[ox+2],winMi});
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+5],winMi});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+2,oz+7],winMi});
    if(doorN){ EV[eIdx(ox+5,z0)]=0; wallRun(wL,'H',z0,ox+5,ox+6,{mi:wallMi,ext:1,doors:[ox+5]}); }
    // internas
    wallRun(wL,'V',x0+5,z0,z0+3,{mi:1});
    wallRun(wL,'H',z0+3,x0,x0+5,{mi:1,doors:[x0+2]});
    wallRun(wL,'V',x0+8,z0,z0+4,{mi:1,doors:[z0+3]});
    wallRun(wL,'H',z0+2,x0+5,x0+8,{mi:1,doors:[x0+6]});
    wallRun(wL,'H',z0+5,x0+8,x1,{mi:1,doors:[x0+9]});
    wallRun(wL,'V',x0+8,z0+5,z1,{mi:1});
    // cozinha
    FURN.fridge(fL,x0,z0); FURN.counter(fL,x0+1,z0,'sink'); FURN.counter(fL,x0+2,z0,'stove');
    FURN.cab(fL,x0+3,z0); FURN.dining(fL,x0+1,z0+2);
    // banheiro
    FURN.toilet(fL,x0+5,z0); FURN.bsink(fL,x0+6,z0); FURN.tub(fL,x0+5,z0+1);
    // sala grande
    FURN.sofa(fL,x0+2,z0+5,0); FURN.tv(fL,x0+2,doorN?z0+7:z0+4); FURN.coffee(fL,x0+3,z0+6);
    FURN.book(fL,x0+7,doorN?z1-1:z0+4); FURN.book(fL,x0,doorN?z1-1:z0+4);
    // quartos
    FURN.bed(fL,x0+9,z0+1,0); FURN.wardrobe(fL,x1-1,z0); FURN.night(fL,x0+8,z0+1);
    FURN.bed(fL,x0+9,z0+6,0); FURN.dresser(fL,x0+8,z1-1); FURN.night(fL,x0+8,z0+6);
    return {x0,z0,x1,z1,name:'Casa Grande'};
  }
  function mercado(fL,wL,ox,oz){
    const x0=ox,z0=oz,x1=ox+13,z1=oz+10;
    fillGround(x0,z0,x1-1,z1-1,T.STORE);
    fillGround(x0,z1-3,x0+4,z1-1,T.STOCK);        // estoque SW
    wallRun(wL,'H',z0,x0,x1,{mi:3,ext:1,doors:[ox+6,ox+7],wins:[ox+2,ox+3,ox+9,ox+10],winMi:4});
    wallRun(wL,'H',z1,x0,x1,{mi:3,ext:1,doors:[ox+2]});
    wallRun(wL,'V',x0,z0,z1,{mi:3,ext:1});
    wallRun(wL,'V',x1,z0,z1,{mi:3,ext:1,wins:[oz+4],winMi:4});
    wallRun(wL,'H',z1-3,x0,x0+5,{mi:1,doors:[x0+4]});
    wallRun(wL,'V',x0+5,z1-3,z1,{mi:1});
    // corredores de prateleiras (3 filas duplas)
    for(const cx of [x0+2,x0+5,x0+8]) for(let k=0;k<4;k++){ FURN.shelf(fL,cx,z0+2+k); FURN.shelf(fL,cx+1,z0+2+k); }
    // freezers na parede leste
    for(let k=0;k<4;k++) FURN.freezer(fL,x1-1,z0+2+k);
    // caixa perto da porta
    FURN.cash(fL,x0+9,z0+7);
    // estoque
    FURN.shelf(fL,x0,z1-2); FURN.shelf(fL,x0+1,z1-2); FURN.shelf(fL,x0+3,z1-2);
    containers.forEach(c=>{ if(c.x>=x0&&c.x<x0+5&&c.z>=z1-3&&c.name==='Prateleira'){ c.name='Estoque'; c.loot=LOOT['Estoque'](); } });
    return {x0,z0,x1,z1,name:'Mercado Estrela'};
  }

  /* ================= ÁRVORES / CERCAS / POSTES / CARRO ================= */
  function addTree(fL,x,z,big){ const h=big?2.2:1.6, r=big?1.5:1.0;
    fL.push({w:0.35,h:h,d:0.35,x:x,y:h/2,z:z,col:'#5a4630'});
    fL.push({w:r*1.7,h:r*1.3,d:r*1.7,x:x,y:h+r*0.4,z:z,col:'#3d5a2a'});
    fL.push({w:r*1.2,h:r*1.0,d:r*1.2,x:x+r*0.4,y:h+r*0.9,z:z-r*0.3,col:'#4a6b33'});
    fL.push({w:r*1.0,h:r*0.8,d:r*1.0,x:x-r*0.45,y:h+r*0.8,z:z+r*0.3,col:'#456329'});
    S(Math.floor(x),Math.floor(z)); trees.push({x,z,r:r+0.5});
  }
  function addBush(fL,x,z){ fL.push({w:0.9,h:0.7,d:0.9,x,y:0.35,z,col:'#48632e'}); }
  function fenceRun(fL,axis,at,from,to){
    for(let i=from;i<to;i++){
      (axis==='V'?EV:EH)[eIdx(axis==='V'?at:i, axis==='V'?i:at)]=5;
      if(axis==='V') fL.push({w:0.1,h:1.0,d:1.0,x:at,y:0.5,z:i+0.5,col:'#7a6142'});
      else fL.push({w:1.0,h:1.0,d:0.1,x:i+0.5,y:0.5,z:at,col:'#7a6142'});
    }
  }
  function addLamp(fL,x,z){ fL.push({w:0.12,h:3.4,d:0.12,x,y:1.7,z,col:'#3a3a40'});
    fL.push({w:0.7,h:0.1,d:0.12,x:x+0.3,y:3.4,z,col:'#3a3a40'});
    lamps.push({x:x+0.6,z}); }
  function addCar(scene3,x,z,col){
    const g=new THREE.Group(); const M=(w,h,d,px,py,pz,c)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), new THREE.MeshLambertMaterial({color:c})); m.position.set(px,py,pz); g.add(m); return m; };
    M(3.6,0.55,1.7,0,0.55,0,col); M(2.0,0.55,1.5,-0.2,1.05,0,col);
    M(1.8,0.45,1.4,-0.2,1.08,0,'#20242c');
    [[-1.25,0.75],[1.25,0.75],[-1.25,-0.75],[1.25,-0.75]].forEach(([a,b])=>M(0.55,0.55,0.25,a,0.3,b,'#181818'));
    M(0.15,0.15,1.5,1.8,0.6,0,'#e8e4c8');
    g.position.set(x,0,z); scene3.add(g);
    for(let dx=-2;dx<=2;dx++) S(Math.floor(x)+dx, Math.floor(z));
  }

  /* ================= CONSTRUÇÃO DO MUNDO ================= */
  function build(scene3){
    scene=scene3;
    // ---- materiais de parede ----
    const sidings=['#b8b09a','#9ab0b8','#c0b088','#a8b898'].map(c=>tex(texSiding(c)));
    const paint=tex(texPaint('#c8c0b0'));
    const brick=tex(texBrick());
    const winT=sidings.map((s,i)=>tex(texWindow(['#b8b09a','#9ab0b8','#c0b088','#a8b898'][i])));
    const storeFront=tex(texStoreFront());
    const roofT=[tex(texRoof('#6e4a3a')),tex(texRoof('#4a4a52')),tex(texRoof('#5a4a62')),tex(texRoof('#3a4a44'))];

    // ---- chão (mega-canvas) ----
    // ruas
    fillGround(0,33,W-1,36,T.ROAD); fillGround(33,0,36,W-1,T.ROAD);
    fillGround(0,32,W-1,32,T.SIDE); fillGround(0,37,W-1,37,T.SIDE);
    fillGround(32,0,32,W-1,T.SIDE); fillGround(37,0,37,W-1,T.SIDE);
    fillGround(33,33,36,36,T.ROAD);

    // ---- casas ----
    const defs=[];
    function houseAt(fn,ox,oz,doorN,mi){
      const fL=[], wL=[];
      const b=fn(fL,wL,ox,oz,doorN,4+mi,mi);
      defs.push({b,fL,wL,mi});
      return b;
    }
    houseAt(casaFamilia,  8,22,false,0);
    houseAt(bangalo,     22,24,false,1);
    houseAt(casaGrande,  41,22,false,2);
    houseAt(casaFamilia, 56,23,false,3);
    houseAt(bangalo,     24,41,true, 2);
    houseAt(bangalo,     41,41,true, 3);
    houseAt(casaGrande,  52,41,true, 0);
    // mercado (materiais próprios)
    { const fL=[], wL=[]; const b=mercado(fL,wL,8,40); defs.push({b,fL,wL,mi:'store'}); }

    // caminhos porta→calçada + lixeiras/caixas de correio
    const paths=[[10,30,10,31],[26,31,26,31],[46,31,46,31],[58,31,58,31],[28,38,28,40],[45,38,45,40],[57,38,57,40],[14,38,14,39]];
    paths.forEach(([x,za,_,zb])=>{ for(let z=za;z<=zb;z++) ground[x*W+z]=T.DIRT; });

    // ---- geometria por prédio ----
    const wallMatsBase=[ null, new THREE.MeshLambertMaterial({map:paint}), null, new THREE.MeshLambertMaterial({map:brick}) ];
    defs.forEach(({b,fL,wL,mi})=>{
      const extMat = mi==='store'? new THREE.MeshLambertMaterial({map:brick}) : new THREE.MeshLambertMaterial({map:sidings[mi]});
      const winMat = mi==='store'? new THREE.MeshLambertMaterial({map:storeFront}) : new THREE.MeshLambertMaterial({map:winT[mi]});
      const mats=[extMat, new THREE.MeshLambertMaterial({map:paint}), winMat, new THREE.MeshLambertMaterial({map:brick}),
        winMat, winMat, winMat, winMat];
      // separa paredes: 'keep' = perímetro norte(z0) e oeste(x0) — ficam; resto some quando dentro
      const keep=[], fade=[];
      wL.forEach(it=>{
        const isV = it.w<0.2;
        const atW = isV? Math.round(it.x) : Math.round(it.z);
        if((isV && atW===b.x0) || (!isV && atW===b.z0)) keep.push(it); else fade.push(it);
      });
      const keepMesh=mergeBoxes(keep,mats), fadeMats=mats.map(m=>{ const c=m.clone(); c.transparent=true; return c; });
      const fadeMesh=mergeBoxes(fade,fadeMats);
      keepMesh.castShadow=true; fadeMesh.castShadow=true;
      scene.add(keepMesh); scene.add(fadeMesh);
      // telhado
      const rT = mi==='store'? roofT[1] : roofT[(typeof mi==='number'?mi:0)];
      const roof=new THREE.Mesh(new THREE.BoxGeometry(b.x1-b.x0+0.7,0.28,b.z1-b.z0+0.7), new THREE.MeshLambertMaterial({map:rT}));
      roof.position.set((b.x0+b.x1)/2,2.65,(b.z0+b.z1)/2); roof.castShadow=true; scene.add(roof);
      // móveis fundidos (cores por vértice)
      if(fL.length){ const fm=mergeBoxes(fL,[new THREE.MeshLambertMaterial({vertexColors:true})]); fm.castShadow=true; scene.add(fm); }
      buildings.push({...b, keepMesh, fadeMesh, fadeMats, roof});
    });

    // ---- portas (meshes que giram) ----
    const doorMat=new THREE.MeshLambertMaterial({color:'#6d4a2e'});
    const knob=new THREE.MeshLambertMaterial({color:'#c8b060'});
    doors.forEach(d=>{
      const grp=new THREE.Group();
      const panel=new THREE.Mesh(new THREE.BoxGeometry(d.edge==='V'?0.1:0.92, 2.1, d.edge==='V'?0.92:0.1), doorMat);
      panel.position.set(d.edge==='V'?0:0.46, 1.05, d.edge==='V'?0.46:0);
      const kn=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.07,0.07),knob);
      kn.position.set(d.edge==='V'?0.07:0.8,1.0,d.edge==='V'?0.8:0.07); grp.add(panel); grp.add(kn);
      grp.position.set(d.x, 0, d.z);
      scene.add(grp); d.group=grp;
    });

    // ---- exteriores: árvores, cercas, postes, carros, deco ----
    const dL=[];
    // bordas de floresta
    for(let i=0;i<46;i++){ const side=i%4; let x,z;
      if(side===0){x=2+rng()*3;z=3+rng()*(W-6);} else if(side===1){x=W-5+rng()*3;z=3+rng()*(W-6);}
      else if(side===2){x=3+rng()*(W-6);z=1.5+rng()*3;} else {x=3+rng()*(W-6);z=W-5+rng()*3;}
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS) addTree(dL,x,z,rng()<0.5);
    }
    // árvores de quintal
    [[5,14],[19,12],[30,8],[44,10],[52,15],[64,12],[6,52],[20,55],[38,54],[48,58],[62,52],[30,62],[13,18],[60,18]].forEach(([x,z])=>{
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS) addTree(dL,x+rng(),z+rng(),rng()<0.6); });
    [[12,31],[24,31],[43,31],[59,31],[27,38],[44,38],[55,38]].forEach(([x,z])=>addBush(dL,x+0.5,z+0.5));
    // cercas de quintal
    fenceRun(dL,'H',14,8,19); fenceRun(dL,'V',20,14,22); fenceRun(dL,'H',16,41,53);
    fenceRun(dL,'H',58,24,32); fenceRun(dL,'V',50,41,50);
    // postes
    [[31,31],[38,38],[31,45],[38,24],[14,31],[52,38]].forEach(([x,z])=>addLamp(dL,x+0.2,z+0.2));
    // lixeiras e correio
    FURN.bin(dL,7,30); FURN.bin(dL,21,30); FURN.bin(dL,40,30); FURN.bin(dL,23,40); FURN.mail(dL,11,31); FURN.mail(dL,27,31); FURN.mail(dL,47,31); FURN.mail(dL,59,31);
    const deco=mergeBoxes(dL,[new THREE.MeshLambertMaterial({vertexColors:true})]); deco.castShadow=true; scene.add(deco);
    addCar(scene,26,34.6,'#7a3a32'); addCar(scene,48,35.4,'#3a5a7a');

    // postes: luminárias (emissivas) + luzes
    lamps.forEach(l=>{
      const head=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.14,0.24), new THREE.MeshLambertMaterial({color:'#c8b060',emissive:'#000000'}));
      head.position.set(l.x,3.35,l.z); scene.add(head); l.head=head;
      const pt=new THREE.PointLight(0xffc060, 0, 10); pt.position.set(l.x,3.1,l.z); scene.add(pt); l.light=pt;
    });

    // ---- chão: pinta o mega-canvas e cria o plano ----
    const gc=cv(W*TPX,W*TPX), g2=gc.getContext('2d');
    for(let x=0;x<W;x++)for(let z=0;z<W;z++) paintTile(g2,x,z,ground[x*W+z]);
    // faixas da rua
    g2.fillStyle='#c8c8b8';
    for(let x=0;x<W;x+=2){ if(x>30&&x<39) continue; g2.fillRect(x*TPX+3,35*TPX-1,TPX-6,2); }
    for(let z=0;z<W;z+=2){ if(z>30&&z<39) continue; g2.fillRect(35*TPX-1,z*TPX+3,2,TPX-6); }
    // faixa de pedestre
    for(let k=0;k<4;k++){ g2.fillRect((33.4+k*0.85)*TPX,32.2*TPX,8,12); g2.fillRect((33.4+k*0.85)*TPX,37.1*TPX,8,12); }
    const gtex=new THREE.CanvasTexture(gc); gtex.magFilter=THREE.NearestFilter; gtex.minFilter=THREE.LinearMipMapLinearFilter; gtex.anisotropy=4;
    const gp=new THREE.Mesh(new THREE.PlaneGeometry(W,W), new THREE.MeshLambertMaterial({map:gtex}));
    gp.rotation.x=-Math.PI/2; gp.position.set(W/2,0,W/2); gp.receiveShadow=true; scene.add(gp);

    // ---- sombra AO sob prédios ----
    const aoC=cv(64,64); { const g3=aoC.getContext('2d'); const rg=g3.createRadialGradient(32,32,16,32,32,32);
      rg.addColorStop(0,'rgba(0,0,0,.32)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g3.fillStyle=rg; g3.fillRect(0,0,64,64); }
    const aoT=new THREE.CanvasTexture(aoC);
    buildings.forEach(b=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(b.x1-b.x0+2.4,b.z1-b.z0+2.4), new THREE.MeshBasicMaterial({map:aoT,transparent:true,depthWrite:false}));
      m.rotation.x=-Math.PI/2; m.position.set((b.x0+b.x1)/2,0.02,(b.z0+b.z1)/2); scene.add(m); });

    // ---- spawns de zumbis ----
    [[20,34.5],[29,35.5],[40,34],[47,36],[58,35],[10,35],[34.5,15],[35.5,25],[34.5,45],[35.5,55],
     [16,38.5],[44,38.5],[60,38.5],[25,31],[50,31],[12,44],[30,50],[46,50],[60,46],[18,18],
     [50,18],[64,30],[6,34],[34,64],[28,12],[52,12]].forEach(([x,z])=>zSpawns.push({x,z}));
    // alguns DENTRO de casas (surpresa)
    zSpawns.push({x:44,z:26},{x:60,z:26},{x:12,z:44});
  }

  /* ================= COLISÃO ================= */
  function edgeBlocked(v, x,z){ const e=(v?EV:EH)[eIdx(x,z)]; return e===1||e===2||e===3||e===5; }
  function edgeBlocksSight(v,x,z){ const e=(v?EV:EH)[eIdx(x,z)]; return e===1||e===3; }
  // movimento com colisão por aresta + sólidos (raio r)
  function moveCircle(px,pz,nx,nz,r){
    // eixo X
    let tx=nx;
    if(nx!==px){ const dir=nx>px?1:-1; const edge=dir>0? Math.floor(px+r)+1 : Math.floor(px-r);
      const target= dir>0? nx+r : nx-r;
      if((dir>0&&target>=edge)||(dir<0&&target<edge)){
        const zi=Math.floor(pz);
        let hit=edgeBlocked(true,edge<0?0:edge, zi);
        if(!hit && pz-Math.floor(pz)<r) hit=edgeBlocked(true,edge,zi-1)&&false;
        const cellX= dir>0? edge : edge-1;
        if(!hit && cellX>=0&&cellX<W && solid[cellX*W+zi]) hit=true;
        if(hit) tx= dir>0? edge-r-0.001 : edge+r+0.001;
      } }
    // eixo Z
    let tz=nz;
    if(nz!==pz){ const dir=nz>pz?1:-1; const edge=dir>0? Math.floor(pz+r)+1 : Math.floor(pz-r);
      const target= dir>0? nz+r : nz-r;
      if((dir>0&&target>=edge)||(dir<0&&target<edge)){
        const xi=Math.floor(tx);
        let hit=edgeBlocked(false,xi,edge<0?0:edge);
        const cellZ= dir>0? edge : edge-1;
        if(!hit && cellZ>=0&&cellZ<W && solid[xi*W+cellZ]) hit=true;
        if(hit) tz= dir>0? edge-r-0.001 : edge+r+0.001;
      } }
    tx=Math.max(0.4,Math.min(W-0.4,tx)); tz=Math.max(0.4,Math.min(W-0.4,tz));
    return [tx,tz];
  }
  // linha de visão em grade (DDA por arestas)
  function lineOfSight(x0,z0,x1,z1){
    const dx=x1-x0, dz=z1-z0, dist=Math.hypot(dx,dz); if(dist<0.001) return true;
    const steps=Math.ceil(dist*3); let px=x0,pz=z0;
    for(let i=1;i<=steps;i++){
      const nx=x0+dx*i/steps, nz=z0+dz*i/steps;
      // cruzou aresta vertical?
      if(Math.floor(nx)!==Math.floor(px)){ const ex=Math.max(Math.floor(nx),Math.floor(px));
        if(edgeBlocksSight(true,ex,Math.floor(pz))) return false; }
      if(Math.floor(nz)!==Math.floor(pz)){ const ez=Math.max(Math.floor(nz),Math.floor(pz));
        if(edgeBlocksSight(false,Math.floor(nx),ez)) return false; }
      px=nx; pz=nz;
    }
    return true;
  }
  function toggleDoor(d){
    d.open=!d.open;
    (d.edge==='V'?EV:EH)[eIdx(d.x,d.z)] = d.open?4:3;
    d.group.rotation.y = d.open? (d.edge==='V'? -1.45 : 1.45) : 0;
  }
  function buildingAt(x,z){ return buildings.find(b=>x>=b.x0&&x<b.x1&&z>=b.z0&&z<b.z1); }

  return { W, T, build, moveCircle, lineOfSight, toggleDoor, buildingAt,
    doors, containers, buildings, trees, lamps, zSpawns, ITEMS, ground, solid, rng };
})();
