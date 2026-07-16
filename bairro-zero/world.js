/* ========================================================================
   BAIRRO ZERO — mundo v2: level design, janelas/barricadas, água, camas,
   itens com peso e perecibilidade, spawns zonais (estilo Project Zomboid)
   ===================================================================== */
const WORLD = (() => {
  const W = 128, TPX = 16;                  // cidade expandida (3x) — tudo desenhado à mão
  const T = { GRASS:0, ROAD:1, SIDE:3, DRIVE:4, DIRT:5, WOOD:10, TILEF:11, CARPET:12, CARPET2:13, STORE:14, STOCK:15, CHAR:16,
    ASPH:17, PLAZA:18, SCHOOL:19, CLINIC:20, BARF:21 };
  const ground = new Uint8Array(W*W); ground.fill(T.GRASS);
  // arestas: 0 livre · 1 parede · 2 janela · 3 porta fechada · 4 porta aberta · 5 cerca
  const EV = new Uint8Array((W+1)*(W+1)), EH = new Uint8Array((W+1)*(W+1));
  const eIdx = (x,z)=> x*(W+1)+z;
  const solid = new Uint8Array(W*W);
  const rng = (()=>{ let s=987654; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)%10000)/10000; }; })();

  /* ================= TEXTURAS ================= */
  function cv(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }
  function tex(canvas){ const t=new THREE.CanvasTexture(canvas);
    t.magFilter=THREE.NearestFilter; t.minFilter=THREE.NearestFilter; t.wrapS=t.wrapT=THREE.RepeatWrapping; return t; }
  function jitter(c,x,y,w,h,base,amt,n){ const g=c.getContext('2d');
    for(let i=0;i<n;i++){ g.fillStyle=shade(base,(rng()-0.5)*amt); g.fillRect(x+rng()*w, y+rng()*h, 1+rng()*2, 1+rng()*2); } }
  function shade(hex,amt){ const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    r=Math.max(0,Math.min(255,r+amt*255)); g=Math.max(0,Math.min(255,g+amt*255)); b=Math.max(0,Math.min(255,b+amt*255));
    return `rgb(${r|0},${g|0},${b|0})`; }
  function paintTile(g,x,z,t){
    const px=x*TPX, py=z*TPX;
    const R=(c)=>{ g.fillStyle=c; g.fillRect(px,py,TPX,TPX); };
    if(t===T.GRASS){ R('#556238'); for(let i=0;i<14;i++){ g.fillStyle=shade('#556238',(rng()-0.45)*0.16); g.fillRect(px+rng()*TPX,py+rng()*TPX,1,2); }
      if(rng()<0.14){ g.fillStyle='#8a7a4a'; g.fillRect(px+rng()*10,py+rng()*10,4+rng()*4,3+rng()*3);} // grama morta
      if(rng()<0.06){ g.fillStyle='#6d8446'; g.fillRect(px+rng()*12,py+rng()*12,3,2);} }
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
    else if(t===T.CHAR){ R('#1a1614'); for(let i=0;i<10;i++){ g.fillStyle=['#0e0c0a','#2a221a','#3a2e20'][i%3]; g.fillRect(px+rng()*TPX,py+rng()*TPX,2+rng()*3,1+rng()*3); } }
    else if(t===T.ASPH){ R('#46464c'); for(let i=0;i<8;i++){ g.fillStyle=shade('#46464c',(rng()-0.5)*0.08); g.fillRect(px+rng()*TPX,py+rng()*TPX,2,2);} }
    else if(t===T.PLAZA){ R('#a89684'); g.strokeStyle='#907e6c'; g.strokeRect(px+0.5,py+0.5,8,8); g.strokeRect(px+8.5,py+8.5,8,8); jitter(g.canvas,px,py,TPX,TPX,'#a89684',0.06,5); }
    else if(t===T.SCHOOL){ R('#b0a890'); g.strokeStyle='#988e76'; g.strokeRect(px+0.5,py+0.5,TPX-1,TPX-1); if((x+z)%2){ g.fillStyle='#b8b098'; g.fillRect(px+1,py+1,TPX-2,TPX-2);} }
    else if(t===T.CLINIC){ R('#c8d0cc'); g.strokeStyle='#aab4ae'; g.strokeRect(px+0.5,py+0.5,8,8); g.strokeRect(px+8.5,py+8.5,8,8); }
    else if(t===T.BARF){ R('#6a5238'); for(let i=0;i<4;i++){ g.fillStyle=shade('#6a5238',(i%2?-0.06:0.04)); g.fillRect(px,py+i*4,TPX,4);} g.fillStyle='#54402c'; g.fillRect(px,py,TPX,1); }
  }
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
  function texRoof(base){ const c=cv(64,64), g=c.getContext('2d');
    g.fillStyle=base; g.fillRect(0,0,64,64);
    for(let y=0;y<64;y+=8){ g.fillStyle=shade(base,-0.12); g.fillRect(0,y+6,64,2);
      for(let x=((y/8)%2)*8; x<64; x+=16){ g.fillStyle=shade(base,-0.06); g.fillRect(x,y,1,6); } }
    jitter(c,0,0,64,64,base,0.05,30); return c; }
  function texStoreSign(){ const c=cv(128,32), g=c.getContext('2d');
    g.fillStyle='#7a2a22'; g.fillRect(0,0,128,32); g.fillStyle='#c8b060'; g.fillRect(0,0,128,3); g.fillRect(0,29,128,3);
    g.fillStyle='#f0e4c0'; g.font='bold 17px sans-serif'; g.textAlign='center'; g.fillText('MERCADO ESTRELA',64,22); return c; }

  /* ================= FUSÃO DE CAIXAS ================= */
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
  const buildings=[], doors=[], windows=[], containers=[], waterSources=[], beds=[], trees=[], lamps=[], zSpawns=[];
  let scene=null;

  /* ================= ITENS (peso kg, perecível h, categorias) ================= */
  const ITEMS = {
    // comida enlatada (precisa de abridor ou faca)
    feijao:{n:'Feijão em Lata',i:'🥫',t:'eat',v:38,kg:0.8,canned:true}, sopa:{n:'Sopa Enlatada',i:'🥫',t:'eat',v:30,kg:0.8,canned:true},
    atum:{n:'Atum em Lata',i:'🥫',t:'eat',v:26,kg:0.5,canned:true},
    // comida seca
    chips:{n:'Batata Chips',i:'🍟',t:'eat',v:16,kg:0.3}, choc:{n:'Chocolate',i:'🍫',t:'eat',v:14,kg:0.2},
    cereal:{n:'Cereal',i:'🥣',t:'eat',v:26,kg:0.5}, arroz:{n:'Arroz Cru',i:'🍚',t:'eat',v:20,kg:1.0},
    // perecíveis (estragam; geladeira conserva enquanto houver luz)
    banana:{n:'Banana',i:'🍌',t:'eat',v:16,kg:0.2,perish:30}, maca:{n:'Maçã',i:'🍎',t:'eat',v:18,kg:0.25,perish:48},
    pao:{n:'Pão',i:'🍞',t:'eat',v:28,kg:0.4,perish:56}, sobras:{n:'Sobras de Comida',i:'🍛',t:'eat',v:34,kg:0.5,perish:20},
    // bebidas
    agua:{n:'Garrafa de Água',i:'💧',t:'drink',v:42,kg:0.6,refill:true}, refri:{n:'Refrigerante',i:'🥤',t:'drink',v:26,kg:0.5},
    suco:{n:'Suco de Caixinha',i:'🧃',t:'drink',v:30,kg:0.4}, garrafa:{n:'Garrafa Vazia',i:'🍼',t:'misc',kg:0.2,fillable:true},
    // remédios
    band:{n:'Bandagem',i:'🩹',t:'heal',kg:0.1}, analg:{n:'Analgésico',i:'💊',t:'pain',kg:0.1},
    // armas (condição = usos antes de quebrar)
    taco:{n:'Taco de Beisebol',i:'🏏',t:'weapon',dmg:[30,44],spd:0.95,kg:1.5,cond:24,knock:0.35},
    frig:{n:'Frigideira',i:'🍳',t:'weapon',dmg:[22,32],spd:0.8,kg:1.2,cond:18,knock:0.2},
    peca:{n:'Pé de Cabra',i:'🪛',t:'weapon',dmg:[28,40],spd:1.05,kg:2.0,cond:40,knock:0.25},
    faca:{n:'Faca de Cozinha',i:'🔪',t:'weapon',dmg:[17,26],spd:0.45,kg:0.4,cond:15,knock:0.02,opener:true,stab:true},
    martelo:{n:'Martelo',i:'🔨',t:'weapon',dmg:[20,30],spd:0.85,kg:1.0,cond:30,knock:0.15,tool:true},
    // ferramentas / construção
    pregos:{n:'Pregos',i:'📎',t:'misc',kg:0.1}, tabua:{n:'Tábua',i:'🪵',t:'misc',kg:2.0},
    abridor:{n:'Abridor de Latas',i:'🥄',t:'misc',kg:0.2,opener:true},
    // mochilas
    mochila:{n:'Mochila Escolar',i:'🎒',t:'bag',cap:6,tier:1,kg:0.5}, mochilao:{n:'Mochilão de Trilha',i:'🎒',t:'bag',cap:10,tier:2,kg:1.0},
    // leitura / misc
    rev:{n:'Revista Velha',i:'📖',t:'read',fun:22,kg:0.2}, livro:{n:'Livro de Romance',i:'📕',t:'read',fun:45,kg:0.5},
    vela:{n:'Vela',i:'🕯️',t:'misc',kg:0.2},
    // arma de fogo (delegacia/viaturas — MUITO barulhenta)
    pistola:{n:'Pistola 9mm',i:'🔫',t:'weapon',gun:true,dmg:[48,72],spd:0.7,kg:1.1,cond:999,knock:0.3},
    municao:{n:'Munição 9mm (x6)',i:'📦',t:'ammo',balas:6,kg:0.3},
    desinf:{n:'Desinfetante',i:'🧴',t:'disinfect',kg:0.4},
  };
  function roll(tbl){ const out=[]; tbl.forEach(([id,ch])=>{ if(rng()<ch) out.push({id}); }); return out; }
  /* ---- LOOT ESCASSO E CONTEXTUAL (estilo PZ: cada coisa no seu lugar) ---- */
  const LOOT = {
    // casas — pouca coisa, às vezes nada
    'Geladeira': ()=>roll([['agua',.35],['refri',.25],['sobras',.3],['banana',.2],['maca',.2],['pao',.18]]),
    'Armário de Cozinha': ()=>roll([['feijao',.25],['sopa',.25],['atum',.15],['arroz',.2],['cereal',.18],['abridor',.2],['frig',.1],['faca',.18]]),
    'Guarda-roupa': ()=>roll([['band',.15],['mochila',.15],['rev',.15],['mochilao',.04]]),
    'Estante': ()=>roll([['livro',.4],['rev',.45],['vela',.15]]),
    'Cômoda': ()=>roll([['band',.2],['analg',.2],['rev',.15]]),
    'Balcão': ()=>roll([['faca',.15],['abridor',.15],['vela',.15],['pregos',.15]]),
    'Lixeira': ()=>roll([['garrafa',.25],['rev',.1]]),
    // mercado — já foi saqueado; sobras
    'Prateleira': ()=>roll([['feijao',.2],['sopa',.18],['atum',.12],['chips',.22],['choc',.18],['agua',.2],['refri',.18],['cereal',.14]]),
    'Freezer': ()=>roll([['sobras',.3],['choc',.2]]),
    'Caixa Registradora': ()=>roll([['chips',.2],['choc',.15]]),
    'Estoque': ()=>roll([['tabua',.4],['pregos',.35],['martelo',.2],['feijao',.25],['agua',.25],['arroz',.2]]),
    'Corpo': ()=>roll([['band',.12],['choc',.08],['faca',.08],['analg',.08],['garrafa',.1]]),
    // DELEGACIA — armas só aqui e nas viaturas
    'Armário de Armas': ()=>roll([['pistola',.55],['municao',.8],['municao',.5],['band',.3]]),
    'Arquivo': ()=>roll([['rev',.25],['analg',.12],['vela',.1]]),
    'Armário Policial': ()=>roll([['band',.3],['municao',.25],['choc',.2],['lanterna',0]]).concat(roll([['mochila',.2]])),
    'Porta-malas': ()=>roll([['municao',.35],['band',.25],['tabua',.25],['pistola',.12],['peca',.15]]),
    // ESCOLA
    'Armário Escolar': ()=>roll([['mochila',.35],['chips',.2],['choc',.2],['rev',.2],['suco',.25]]),
    'Cozinha Industrial': ()=>roll([['arroz',.45],['feijao',.4],['sopa',.3],['cereal',.3],['frig',.25],['faca',.2]]),
    'Estante Escolar': ()=>roll([['livro',.5],['rev',.4]]),
    // CLÍNICA — remédio é aqui
    'Prateleira de Remédios': ()=>roll([['band',.55],['analg',.5],['desinf',.4],['band',.3]]),
    'Maca': ()=>roll([['band',.2],['desinf',.15]]),
    // BAR
    'Balcão de Bar': ()=>roll([['garrafa',.5],['refri',.35],['chips',.3],['faca',.12]]),
    // OFICINA — ferramentas é aqui
    'Bancada': ()=>roll([['martelo',.45],['pregos',.6],['peca',.35],['tabua',.4],['abridor',.2]]),
    // POSTO
    'Prateleira do Posto': ()=>roll([['chips',.35],['choc',.3],['refri',.35],['agua',.3],['rev',.2],['municao',.06]]),
  };

  /* ================= CHÃO / PAREDES ================= */
  function fillGround(x0,z0,x1,z1,t){ for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++) if(x>=0&&z>=0&&x<W&&z<W) ground[x*W+z]=t; }
  function wallRun(list, axis, at, from, to, spec){
    spec=spec||{};
    for(let i=from;i<to;i++){
      const isDoor=(spec.doors||[]).includes(i), isWin=(spec.wins||[]).includes(i);
      const e = axis==='V'? EV:EH;
      const ex = axis==='V'?at:i, ez = axis==='V'?i:at;
      if(isDoor){ e[eIdx(ex,ez)]=3;
        doors.push({edge:axis, x:ex, z:ez, open:false, exterior:!!spec.ext, hp:140, barr:0, broken:false});
        if(axis==='V') list.push({w:0.14,h:0.5,d:1.04,x:at,y:2.25,z:i+0.5,mi:spec.mi||0});
        else list.push({w:1.04,h:0.5,d:0.14,x:i+0.5,y:2.25,z:at,mi:spec.mi||0});
        continue;
      }
      if(isWin){ e[eIdx(ex,ez)]=2;
        windows.push({edge:axis, x:ex, z:ez, state:'closed', hp:24, barr:0, planks:[], glass:null, ext:!!spec.ext});
        const mi=spec.mi||0;
        if(axis==='V'){ list.push({w:0.14,h:0.9,d:1.04,x:at,y:0.45,z:i+0.5,mi});
          list.push({w:0.14,h:0.4,d:1.04,x:at,y:2.3,z:i+0.5,mi}); }
        else { list.push({w:1.04,h:0.9,d:0.14,x:i+0.5,y:0.45,z:at,mi});
          list.push({w:1.04,h:0.4,d:0.14,x:i+0.5,y:2.3,z:at,mi}); }
        continue;
      }
      e[eIdx(ex,ez)]=1;
      const mi=spec.mi||0;
      if(axis==='V') list.push({w:0.14,h:2.5,d:1.04,x:at,y:1.25,z:i+0.5,mi});
      else list.push({w:1.04,h:2.5,d:0.14,x:i+0.5,y:1.25,z:at,mi});
    }
  }

  /* ================= MÓVEIS ================= */
  function S(x,z){ if(x>=0&&z>=0&&x<W&&z<W) solid[x*W+z]=1; }
  function addContainer(x,z,name){ containers.push({x,z,name,loot:LOOT[name]?LOOT[name]():[],opened:false}); }
  const FURN = {
    sofa(f,x,z,ry){ const c='#7a4a3a',d='#8f5a48';
      f.push({w:1.9,h:0.45,d:0.85,x:x+1,y:0.23,z:z+0.5,ry,col:d});
      f.push({w:1.9,h:0.55,d:0.25,x:x+1,y:0.75,z:z+0.5-0.32,ry,col:c});
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
      if(kind==='sink'){ f.push({w:0.5,h:0.06,d:0.4,x:x+0.5,y:0.95,z:z+0.5,col:'#9aa4a8'}); f.push({w:0.08,h:0.3,d:0.08,x:x+0.5,y:1.1,z:z+0.28,col:'#b8c0c4'});
        waterSources.push({x,z,name:'Pia da Cozinha'}); }
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
      f.push({w:0.15,h:0.8,d:1.0,x:x+0.08,y:0.4,z:z+0.5,ry,col:'#5f4a30'}); S(x,z); S(x+1,z);
      beds.push({x:x+1,z:z+0.5}); },
    wardrobe(f,x,z){ f.push({w:0.94,h:1.9,d:0.6,x:x+0.5,y:0.95,z:z+0.35,col:'#6d5236'});
      f.push({w:0.04,h:1.5,d:0.04,x:x+0.5,y:1.0,z:z+0.66,col:'#4a3626'}); S(x,z); addContainer(x,z,'Guarda-roupa'); },
    dresser(f,x,z){ f.push({w:0.9,h:0.8,d:0.5,x:x+0.5,y:0.4,z:z+0.3,col:'#7a5a3a'});
      f.push({w:0.7,h:0.06,d:0.04,x:x+0.5,y:0.5,z:z+0.56,col:'#4a3626'}); S(x,z); addContainer(x,z,'Cômoda'); },
    night(f,x,z){ f.push({w:0.5,h:0.5,d:0.5,x:x+0.5,y:0.25,z:z+0.5,col:'#7a5a3a'});
      f.push({w:0.18,h:0.3,d:0.18,x:x+0.5,y:0.65,z:z+0.5,col:'#c8b060'}); },
    toilet(f,x,z){ f.push({w:0.45,h:0.4,d:0.55,x:x+0.5,y:0.2,z:z+0.5,col:'#e8e8e0'});
      f.push({w:0.5,h:0.55,d:0.18,x:x+0.5,y:0.55,z:z+0.24,col:'#e0e0d8'}); S(x,z); },
    bsink(f,x,z){ f.push({w:0.2,h:0.6,d:0.2,x:x+0.5,y:0.3,z:z+0.5,col:'#d8d8d0'});
      f.push({w:0.55,h:0.14,d:0.45,x:x+0.5,y:0.68,z:z+0.5,col:'#e8e8e0'}); S(x,z);
      waterSources.push({x,z,name:'Pia do Banheiro'}); },
    tub(f,x,z){ f.push({w:1.9,h:0.55,d:0.85,x:x+1,y:0.28,z:z+0.5,col:'#e0e0d8'});
      f.push({w:1.6,h:0.1,d:0.55,x:x+1,y:0.5,z:z+0.5,col:'#b8c4c8'}); S(x,z); S(x+1,z);
      waterSources.push({x,z,name:'Banheira'}); },
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
    /* ---- mobília dos novos prédios públicos (feita à mão) ---- */
    carteira(f,x,z){ f.push({w:0.6,h:0.08,d:0.45,x:x+0.5,y:0.62,z:z+0.4,col:'#b09a72'});
      f.push({w:0.06,h:0.6,d:0.06,x:x+0.3,y:0.31,z:z+0.4,col:'#5a5a62'}); f.push({w:0.06,h:0.6,d:0.06,x:x+0.7,y:0.31,z:z+0.4,col:'#5a5a62'});
      f.push({w:0.42,h:0.4,d:0.08,x:x+0.5,y:0.55,z:z+0.78,col:'#8a6844'}); f.push({w:0.42,h:0.08,d:0.36,x:x+0.5,y:0.36,z:z+0.72,col:'#8a6844'}); },
    lousa(f,x,z,ry){ f.push({w:2.6,h:1.1,d:0.08,x:x+1.5,y:1.5,z:z+0.1,ry,col:'#274e3a'});
      f.push({w:2.8,h:0.06,d:0.12,x:x+1.5,y:0.92,z:z+0.12,ry,col:'#8a6844'});
      f.push({w:0.5,h:0.06,d:0.03,x:x+0.8,y:1.3,z:z+0.06,ry,col:'#e8e4d8'}); },
    mesaLonga(f,x,z){ f.push({w:2.9,h:0.09,d:0.9,x:x+1.5,y:0.68,z:z+0.5,col:'#c8b088'});
      [[x+0.3,z+0.5],[x+2.7,z+0.5]].forEach(([px2,pz])=>f.push({w:0.1,h:0.66,d:0.7,x:px2,y:0.33,z:pz,col:'#8a8a92'}));
      f.push({w:2.9,h:0.3,d:0.25,x:x+1.5,y:0.42,z:z-0.15,col:'#a89060'});
      f.push({w:2.9,h:0.3,d:0.25,x:x+1.5,y:0.42,z:z+1.15,col:'#a89060'});
      S(x,z); S(x+1,z); S(x+2,z); },
    armarioEsc(f,x,z){ for(let k=0;k<3;k++) f.push({w:0.3,h:1.7,d:0.4,x:x+0.17+k*0.33,y:0.85,z:z+0.3,col:k%2?'#7a3a2a':'#8a4232'});
      S(x,z); addContainer(x,z,'Armário Escolar'); },
    armarioArmas(f,x,z){ f.push({w:0.9,h:1.85,d:0.5,x:x+0.5,y:0.93,z:z+0.3,col:'#3a4048'});
      f.push({w:0.7,h:1.5,d:0.06,x:x+0.5,y:0.95,z:z+0.57,col:'#2a3038'});
      f.push({w:0.1,h:0.3,d:0.04,x:x+0.78,y:0.95,z:z+0.58,col:'#c8b060'}); S(x,z); addContainer(x,z,'Armário de Armas'); },
    arquivo(f,x,z){ f.push({w:0.55,h:1.3,d:0.6,x:x+0.5,y:0.65,z:z+0.35,col:'#6a7076'});
      for(let k=0;k<4;k++) f.push({w:0.45,h:0.05,d:0.04,x:x+0.5,y:0.25+k*0.3,z:z+0.66,col:'#4a5056'});
      S(x,z); addContainer(x,z,'Arquivo'); },
    mesaEscr(f,x,z){ f.push({w:1.4,h:0.09,d:0.7,x:x+0.75,y:0.7,z:z+0.4,col:'#6a5236'});
      f.push({w:0.5,h:0.35,d:0.35,x:x+0.5,y:1.0,z:z+0.35,col:'#2a2e36'});
      f.push({w:0.5,h:0.5,d:0.5,x:x+0.75,y:0.25,z:z+1.1,col:'#3a3e46'}); S(x,z); },
    maca(f,x,z,ry){ f.push({w:1.9,h:0.12,d:0.8,x:x+1,y:0.6,z:z+0.5,ry,col:'#d8dcd8'});
      f.push({w:1.7,h:0.1,d:0.7,x:x+1,y:0.7,z:z+0.5,ry,col:'#e8ecE8'.toLowerCase()});
      f.push({w:0.45,h:0.1,d:0.6,x:x+0.4,y:0.78,z:z+0.5,ry,col:'#f0f0ec'});
      [[x+0.2,z+0.2],[x+1.8,z+0.2],[x+0.2,z+0.8],[x+1.8,z+0.8]].forEach(([px2,pz])=>f.push({w:0.07,h:0.58,d:0.07,x:px2,y:0.29,z:pz,ry,col:'#8a9096'}));
      S(x,z); S(x+1,z); addContainer(x,z,'Maca'); },
    pratMed(f,x,z){ f.push({w:0.94,h:1.6,d:0.4,x:x+0.5,y:0.8,z:z+0.28,col:'#e0e4e0'});
      for(let k=0;k<3;k++){ f.push({w:0.8,h:0.04,d:0.34,x:x+0.5,y:0.45+k*0.45,z:z+0.28,col:'#c0c8c4'});
        for(let j=0;j<3;j++) if(rng()<0.7) f.push({w:0.12,h:0.18,d:0.12,x:x+0.22+j*0.28,y:0.58+k*0.45,z:z+0.28,col:['#c05a4a','#4a8ac0','#e8e4d8'][j%3]}); }
      S(x,z); addContainer(x,z,'Prateleira de Remédios'); },
    balcaoBar(f,x,z,len){ for(let k=0;k<len;k++){ f.push({w:0.94,h:1.0,d:0.7,x:x+0.5+k,y:0.5,z:z+0.35,col:'#4a3626'});
      f.push({w:1.0,h:0.07,d:0.8,x:x+0.5+k,y:1.05,z:z+0.35,col:'#6a5236'}); S(x+k,z); }
      addContainer(x,z,'Balcão de Bar');
      for(let k=0;k<4;k++) if(rng()<0.8) f.push({w:0.12,h:0.3,d:0.12,x:x+0.3+rng()*len*0.8,y:1.25,z:z+0.3,col:['#3a6a3a','#6a3a2a','#c8b060'][k%3]}); },
    banqueta(f,x,z){ f.push({w:0.35,h:0.08,d:0.35,x:x+0.5,y:0.62,z:z+0.5,col:'#8a2a22'});
      f.push({w:0.08,h:0.6,d:0.08,x:x+0.5,y:0.3,z:z+0.5,col:'#3a3e44'}); },
    bancada(f,x,z,len){ for(let k=0;k<len;k++){ f.push({w:0.94,h:0.9,d:0.8,x:x+0.5+k,y:0.45,z:z+0.4,col:'#5a5248'});
      f.push({w:1.0,h:0.06,d:0.9,x:x+0.5+k,y:0.93,z:z+0.4,col:'#7a7268'}); S(x+k,z); }
      addContainer(x,z,'Bancada');
      f.push({w:0.3,h:0.12,d:0.1,x:x+0.4,y:1.02,z:z+0.3,col:'#c05a2a'}); f.push({w:0.12,h:0.25,d:0.1,x:x+1.2,y:1.08,z:z+0.4,col:'#4a5058'}); },
    bomba(f,x,z){ f.push({w:0.5,h:1.4,d:0.35,x:x+0.5,y:0.7,z:z+0.5,col:'#c03a2a'});
      f.push({w:0.4,h:0.35,d:0.3,x:x+0.5,y:1.05,z:z+0.5,col:'#e8e4d8'});
      f.push({w:0.08,h:0.5,d:0.08,x:x+0.75,y:0.85,z:z+0.5,col:'#1a1a1c'}); S(x,z); },
    banco(f,x,z,ry){ f.push({w:1.7,h:0.07,d:0.45,x:x+1,y:0.48,z:z+0.5,ry,col:'#7a6142'});
      f.push({w:1.7,h:0.4,d:0.07,x:x+1,y:0.75,z:z+0.5+(ry?0:-0.2),ry,col:'#7a6142'});
      [[x+0.3],[x+1.7]].forEach(([px2])=>f.push({w:0.09,h:0.46,d:0.4,x:px2,y:0.23,z:z+0.5,ry,col:'#3a3e44'})); },
    balanco(f,x,z){ f.push({w:0.1,h:2.0,d:0.1,x:x,y:1.0,z:z+0.5,col:'#c8683a'});
      f.push({w:0.1,h:2.0,d:0.1,x:x+2.4,y:1.0,z:z+0.5,col:'#c8683a'});
      f.push({w:2.6,h:0.1,d:0.1,x:x+1.2,y:2.0,z:z+0.5,col:'#c8683a'});
      for(const sx of [0.7,1.7]){ f.push({w:0.04,h:1.2,d:0.04,x:x+sx-0.18,y:1.35,z:z+0.5,col:'#4a4a52'});
        f.push({w:0.04,h:1.2,d:0.04,x:x+sx+0.18,y:1.35,z:z+0.5,col:'#4a4a52'});
        f.push({w:0.45,h:0.06,d:0.25,x:x+sx,y:0.72,z:z+0.5,col:'#5a4a30'}); }
      S(x,z); S(x+1,z); S(x+2,z); },
    escorrega(f,x,z){ f.push({w:0.5,h:1.5,d:0.5,x:x+0.4,y:0.75,z:z+0.5,col:'#3a7ac0'});
      f.push({w:1.6,h:0.08,d:0.55,x:x+1.3,y:0.78,z:z+0.5,ry:0,col:'#e8c840'});
      f.push({w:0.06,h:0.75,d:0.5,x:x+2.05,y:0.37,z:z+0.5,col:'#e8c840'});
      S(x,z); S(x+1,z); S(x+2,z);
      f.length&&(f[f.length-2].ry=0); },
    chafariz(f,x,z){ f.push({w:2.6,h:0.5,d:2.6,x:x+1.5,y:0.25,z:z+1.5,col:'#8a8a82'});
      f.push({w:2.2,h:0.15,d:2.2,x:x+1.5,y:0.5,z:z+1.5,col:'#5a6a72'});
      f.push({w:0.4,h:1.1,d:0.4,x:x+1.5,y:0.8,z:z+1.5,col:'#8a8a82'});
      f.push({w:0.7,h:0.12,d:0.7,x:x+1.5,y:1.35,z:z+1.5,col:'#9a9a92'});
      for(let dx=0;dx<3;dx++)for(let dz=0;dz<3;dz++) S(x+dx,z+dz); },
    mesaRed(f,x,z){ f.push({w:0.85,h:0.08,d:0.85,x:x+0.5,y:0.7,z:z+0.5,col:'#5a4632'});
      f.push({w:0.1,h:0.68,d:0.1,x:x+0.5,y:0.34,z:z+0.5,col:'#3a3026'}); S(x,z); },
  };

  /* ================= CASAS ================= */
  function casaFamilia(fL,wL,ox,oz,doorN,wallMi){
    const x0=ox,z0=oz,x1=ox+11,z1=oz+8;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0+6,z0,x1-1,z0+3,T.TILEF);
    fillGround(x0+7,z0+4,x1-1,z1-1,T.CARPET);
    fillGround(x0+4,z0,x0+5,z0+2,T.TILEF);
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:doorN?[]:[ox+2,ox+8],doors:doorN?[ox+2]:[]});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,wins:doorN?[ox+3,ox+8]:[],doors:doorN?[]:[ox+2]});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+4]});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+2,oz+6]});
    wallRun(wL,'V',x0+6,z0,z0+4,{mi:1,doors:[z0+2]});
    wallRun(wL,'H',z0+4,x0+6,x1,{mi:1,doors:[x0+8]});
    wallRun(wL,'V',x0+7,z0+4,z1,{mi:1});
    wallRun(wL,'V',x0+4,z0,z0+3,{mi:1});
    wallRun(wL,'H',z0+3,x0+4,x0+6,{mi:1,doors:[x0+4]});
    FURN.sofa(fL,x0+1,doorN?z1-2:z0+1,0);
    FURN.tv(fL,x0+1,doorN?z0+1:z1-2);
    FURN.coffee(fL,x0+2,oz+4);
    FURN.book(fL,x0+5,doorN?z1-1:z0+3);
    FURN.fridge(fL,x1-1,z0);
    FURN.counter(fL,x1-2,z0,'sink'); FURN.counter(fL,x1-3,z0,'stove'); FURN.cab(fL,x1-4,z0);
    FURN.dining(fL,x0+7,z0+2);
    FURN.bed(fL,x0+8,z0+5,0);
    FURN.wardrobe(fL,x1-1,z1-1); FURN.night(fL,x0+7,z0+5); FURN.dresser(fL,x0+8,z1-1);
    FURN.toilet(fL,x0+4,z0); FURN.bsink(fL,x0+5,z0);
    return {x0,z0,x1,z1,name:'Casa da Família'};
  }
  function bangalo(fL,wL,ox,oz,doorN,wallMi){
    const x0=ox,z0=oz,x1=ox+8,z1=oz+7;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0,doorN?z1-3:z0,x0+2,doorN?z1-1:z0+2,T.TILEF);
    fillGround(x0+5,z0,x1-1,z0+3,T.CARPET2);
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:doorN?[]:[ox+6],doors:doorN?[ox+4]:[]});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,wins:doorN?[ox+1,ox+6]:[ox+1],doors:doorN?[]:[ox+4]});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+3]});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+5]});
    wallRun(wL,'V',x0+5,z0,z0+4,{mi:1,doors:[z0+2]});
    wallRun(wL,'H',z0+4,x0+5,x1,{mi:1});
    const bz = doorN? z0 : z1-2;
    wallRun(wL,'H',doorN?z0+2:z1-2,x0,x0+2,{mi:1});
    wallRun(wL,'V',x0+2,doorN?z0:bz,doorN?z0+2:z1,{mi:1,doors:[doorN?z0+1:z1-1]});
    FURN.toilet(fL,x0,bz); FURN.bsink(fL,x0+1,bz);
    const kz = doorN? z1-1 : z0;
    FURN.fridge(fL,x0,kz); FURN.counter(fL,x0+1,kz,'sink'); FURN.cab(fL,x0+2,kz);
    FURN.sofa(fL,x0+2,oz+3,0); FURN.tv(fL,x0+2,doorN?z0+3:z1-4);
    FURN.bed(fL,x0+5,z0+1,0); FURN.dresser(fL,x1-1,z0+3);
    return {x0,z0,x1,z1,name:'Bangalô'};
  }
  function casaGrande(fL,wL,ox,oz,doorN,wallMi){
    const x0=ox,z0=oz,x1=ox+12,z1=oz+9;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0,z0,x0+4,z0+3,T.TILEF);
    fillGround(x0+8,z0,x1-1,z0+3,T.CARPET);
    fillGround(x0+8,z0+5,x1-1,z1-1,T.CARPET2);
    fillGround(x0+5,z0,x0+7,z0+2,T.TILEF);
    wallRun(wL,'H',z0,x0,x1,{mi:wallMi,ext:1,wins:[ox+2,ox+9],doors:doorN?[ox+5]:[]});
    wallRun(wL,'H',z1,x0,x1,{mi:wallMi,ext:1,doors:doorN?[]:[ox+5],wins:doorN?[ox+2,ox+9]:[ox+2]});
    wallRun(wL,'V',x0,z0,z1,{mi:wallMi,ext:1,wins:[oz+5]});
    wallRun(wL,'V',x1,z0,z1,{mi:wallMi,ext:1,wins:[oz+2,oz+7]});
    wallRun(wL,'V',x0+5,z0,z0+3,{mi:1});
    wallRun(wL,'H',z0+3,x0,x0+5,{mi:1,doors:[x0+2]});
    wallRun(wL,'V',x0+8,z0,z0+4,{mi:1,doors:[z0+3]});
    wallRun(wL,'H',z0+2,x0+5,x0+8,{mi:1,doors:[x0+6]});
    wallRun(wL,'H',z0+5,x0+8,x1,{mi:1,doors:[x0+9]});
    wallRun(wL,'V',x0+8,z0+5,z1,{mi:1});
    FURN.fridge(fL,x0,z0); FURN.counter(fL,x0+1,z0,'sink'); FURN.counter(fL,x0+2,z0,'stove');
    FURN.cab(fL,x0+3,z0); FURN.dining(fL,x0+1,z0+2);
    FURN.toilet(fL,x0+5,z0); FURN.bsink(fL,x0+6,z0); FURN.tub(fL,x0+5,z0+1);
    FURN.sofa(fL,x0+2,z0+5,0); FURN.tv(fL,x0+2,doorN?z0+7:z0+4); FURN.coffee(fL,x0+3,z0+6);
    FURN.book(fL,x0+7,doorN?z1-1:z0+4); FURN.book(fL,x0,doorN?z1-1:z0+4);
    FURN.bed(fL,x0+9,z0+1,0); FURN.wardrobe(fL,x1-1,z0); FURN.night(fL,x0+8,z0+1);
    FURN.bed(fL,x0+9,z0+6,0); FURN.dresser(fL,x0+8,z1-1); FURN.night(fL,x0+8,z0+6);
    return {x0,z0,x1,z1,name:'Casa Grande'};
  }
  function mercado(fL,wL,ox,oz){
    const x0=ox,z0=oz,x1=ox+13,z1=oz+10;
    fillGround(x0,z0,x1-1,z1-1,T.STORE);
    fillGround(x0,z1-3,x0+4,z1-1,T.STOCK);
    wallRun(wL,'H',z0,x0,x1,{mi:3,ext:1,doors:[ox+6,ox+7],wins:[ox+2,ox+3,ox+9,ox+10]});
    wallRun(wL,'H',z1,x0,x1,{mi:3,ext:1,doors:[ox+2]});
    wallRun(wL,'V',x0,z0,z1,{mi:3,ext:1});
    wallRun(wL,'V',x1,z0,z1,{mi:3,ext:1,wins:[oz+4]});
    wallRun(wL,'H',z1-3,x0,x0+5,{mi:1,doors:[x0+4]});
    wallRun(wL,'V',x0+5,z1-3,z1,{mi:1});
    for(const cx of [x0+2,x0+5,x0+8]) for(let k=0;k<4;k++){ FURN.shelf(fL,cx,z0+2+k); FURN.shelf(fL,cx+1,z0+2+k); }
    for(let k=0;k<4;k++) FURN.freezer(fL,x1-1,z0+2+k);
    FURN.cash(fL,x0+9,z0+7);
    FURN.shelf(fL,x0,z1-2); FURN.shelf(fL,x0+1,z1-2); FURN.shelf(fL,x0+3,z1-2);
    containers.forEach(c=>{ if(c.x>=x0&&c.x<x0+5&&c.z>=z1-3&&c.name==='Prateleira'){ c.name='Estoque'; c.loot=LOOT['Estoque'](); } });
    return {x0,z0,x1,z1,name:'Mercado Estrela',store:true};
  }

  /* ============================================================
     DISTRITOS NOVOS — cada prédio desenhado à mão, único
     ============================================================ */
  function delegacia(fL,wL,ox,oz){ // 16×13, entrada ao sul — recepção, escritório, 2 celas, arsenal
    const x0=ox,z0=oz,x1=ox+16,z1=oz+13;
    fillGround(x0,z0,x1-1,z1-1,T.TILEF);
    fillGround(x0,z0,x0+6,z0+5,T.STOCK);                    // celas: piso cru
    // perímetro (tijolo)
    wallRun(wL,'H',z0,x0,x1,{mi:3,ext:1,wins:[ox+9,ox+13]});
    wallRun(wL,'H',z1,x0,x1,{mi:3,ext:1,doors:[ox+8],wins:[ox+3,ox+12]});
    wallRun(wL,'V',x0,z0,z1,{mi:3,ext:1,wins:[oz+8]});
    wallRun(wL,'V',x1,z0,z1,{mi:3,ext:1,wins:[oz+3,oz+9]});
    // celas (noroeste): corredor + 2 celas com GRADES
    wallRun(wL,'H',z0+6,x0,x0+7,{mi:1,doors:[x0+6]});
    wallRun(wL,'V',x0+7,z0,z0+6,{mi:1,doors:[z0+4]});
    wallRun(wL,'V',x0+3,z0,z0+3,{mi:1});                     // parede entre as 2 celas
    barsRun(fL,'H',z0+3,x0,x0+3,{door:x0+1});                // grade cela 1
    barsRun(fL,'H',z0+3,x0+4,x0+7,{door:x0+5});              // grade cela 2
    // arsenal (nordeste, porta única)
    wallRun(wL,'H',z0+5,x1-5,x1,{mi:1});
    wallRun(wL,'V',x1-5,z0,z0+5,{mi:1,doors:[z0+3]});
    // escritório (centro-oeste)
    wallRun(wL,'V',x0+8,z0+6,z1-4,{mi:1,doors:[z0+8]});
    wallRun(wL,'H',z1-4,x0,x0+8,{mi:1,doors:[x0+4]});
    // mobília — celas: catres
    fL.push({w:1.6,h:0.3,d:0.7,x:x0+1.5,y:0.2,z:z0+1,col:'#4a4e56'}); S(x0+1,z0+1);
    fL.push({w:1.6,h:0.3,d:0.7,x:x0+5.5,y:0.2,z:z0+1,col:'#4a4e56'}); S(x0+5,z0+1);
    FURN.toilet(fL,x0,z0+2); FURN.toilet(fL,x0+4,z0+2);
    // arsenal — o primeiro armário SEMPRE tem a pistola da cidade
    FURN.armarioArmas(fL,x1-2,z0);
    if(!containers[containers.length-1].loot.some(l=>l.id==='pistola')) containers[containers.length-1].loot.push({id:'pistola'});
    FURN.armarioArmas(fL,x1-3,z0);
    FURN.arquivo(fL,x1-1,z0+3); FURN.armarioEsc(fL,x1-4,z0); containers[containers.length-1].name='Armário Policial'; containers[containers.length-1].loot=LOOT['Armário Policial']();
    // escritório: mesas + arquivos
    FURN.mesaEscr(fL,x0+2,z0+7); FURN.mesaEscr(fL,x0+5,z0+9); FURN.mesaEscr(fL,x0+2,z1-6);
    FURN.arquivo(fL,x0,z0+6); FURN.arquivo(fL,x0+1,z0+6); FURN.arquivo(fL,x0,z1-5);
    // recepção (sul): balcão + bancos
    FURN.balcaoBar(fL,x0+10,z1-3,3); containers[containers.length-1].name='Arquivo'; containers[containers.length-1].loot=LOOT['Arquivo']();
    FURN.banco(fL,x0+12,z1-1,0); FURN.banco(fL,x0+9,z1-1,0);
    FURN.mesaEscr(fL,x0+10,z0+7); FURN.arquivo(fL,x1-1,z0+6);
    return {x0,z0,x1,z1,name:'Delegacia'};
  }
  function barsRun(fL,axis,at,from,to,opts){ // grades de cela (bloqueiam passo, deixam ver)
    opts=opts||{};
    for(let i=from;i<to;i++){
      if(opts.door===i){ (axis==='V'?EV:EH)[eIdx(axis==='V'?at:i, axis==='V'?i:at)]=3;
        doors.push({edge:axis, x:axis==='V'?at:i, z:axis==='V'?i:at, open:false, exterior:false, jail:true});
        continue; }
      (axis==='V'?EV:EH)[eIdx(axis==='V'?at:i, axis==='V'?i:at)]=5;
      for(let b=0;b<5;b++){
        if(axis==='V') fL.push({w:0.05,h:2.4,d:0.05,x:at,y:1.2,z:i+0.12+b*0.2,col:'#3a3e46'});
        else fL.push({w:0.05,h:2.4,d:0.05,x:i+0.12+b*0.2,y:1.2,z:at,col:'#3a3e46'});
      }
      if(axis==='V') fL.push({w:0.07,h:0.08,d:1.0,x:at,y:2.4,z:i+0.5,col:'#3a3e46'});
      else fL.push({w:1.0,h:0.08,d:0.07,x:i+0.5,y:2.4,z:at,col:'#3a3e46'});
    }
  }
  function escola(fL,wL,ox,oz){ // 22×16, entrada ao norte — 2 salas, refeitório+cozinha, biblioteca
    const x0=ox,z0=oz,x1=ox+22,z1=oz+16;
    fillGround(x0,z0,x1-1,z1-1,T.SCHOOL);
    // perímetro
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1,doors:[ox+10,ox+11],wins:[ox+3,ox+6,ox+15,ox+18]});
    wallRun(wL,'H',z1,x0,x1,{mi:0,ext:1,doors:[ox+4],wins:[ox+8,ox+14,ox+18]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1,wins:[oz+4,oz+11]});
    wallRun(wL,'V',x1,z0,z1,{mi:0,ext:1,wins:[oz+4,oz+11]});
    // corredor central z0+5..z0+8: salas ao norte, refeitório/biblioteca ao sul
    wallRun(wL,'H',z0+5,x0,x1,{mi:1,doors:[x0+3,x0+13,x0+19]});
    wallRun(wL,'H',z0+9,x0,x1,{mi:1,doors:[x0+5,x0+16]});
    wallRun(wL,'V',x0+8,z0,z0+5,{mi:1});                     // divide salas 1|2
    wallRun(wL,'V',x0+16,z0,z0+5,{mi:1});                    // sala 2 | armários
    wallRun(wL,'V',x0+11,z0+9,z1,{mi:1});                    // refeitório | biblioteca
    // SALA 1: lousa + 9 carteiras em fileiras
    FURN.lousa(fL,x0+2,z0,0);
    for(let r=0;r<3;r++)for(let c=0;c<3;c++) FURN.carteira(fL,x0+1+c*2,z0+1.6+r*1.2);
    // SALA 2: idem
    FURN.lousa(fL,x0+10,z0,0);
    for(let r=0;r<3;r++)for(let c=0;c<3;c++) FURN.carteira(fL,x0+9+c*2,z0+1.6+r*1.2);
    // armários no corredor leste
    FURN.armarioEsc(fL,x1-2,z0); FURN.armarioEsc(fL,x1-3,z0); FURN.armarioEsc(fL,x1-2,z0+2);
    FURN.armarioEsc(fL,x0,z0+6); FURN.armarioEsc(fL,x1-1,z0+6);
    // REFEITÓRIO (sudoeste): 2 mesas longas + cozinha industrial
    FURN.mesaLonga(fL,x0+1,z0+10.4); FURN.mesaLonga(fL,x0+1,z0+13);
    FURN.counter(fL,x0+7,z1-1,'sink'); FURN.counter(fL,x0+8,z1-1,'stove');
    FURN.cab(fL,x0+9,z1-1); containers[containers.length-1].name='Cozinha Industrial'; containers[containers.length-1].loot=LOOT['Cozinha Industrial']();
    FURN.cab(fL,x0+10,z1-1); containers[containers.length-1].name='Cozinha Industrial'; containers[containers.length-1].loot=LOOT['Cozinha Industrial']();
    // BIBLIOTECA (sudeste): estantes + mesas
    for(const bx of [x0+12,x0+14,x0+16,x0+18]){ FURN.book(fL,bx,z0+10); containers[containers.length-1].name='Estante Escolar'; containers[containers.length-1].loot=LOOT['Estante Escolar'](); }
    for(const bx of [x0+13,x0+17]){ FURN.book(fL,bx,z1-1); containers[containers.length-1].name='Estante Escolar'; containers[containers.length-1].loot=LOOT['Estante Escolar'](); }
    FURN.mesaRed(fL,x0+14,z0+12); FURN.mesaRed(fL,x0+18,z0+13);
    return {x0,z0,x1,z1,name:'Escola Municipal'};
  }
  function clinica(fL,wL,ox,oz){ // 13×10, entrada ao norte — recepção, 2 consultórios, farmácia
    const x0=ox,z0=oz,x1=ox+13,z1=oz+10;
    fillGround(x0,z0,x1-1,z1-1,T.CLINIC);
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1,doors:[ox+6],wins:[ox+2,ox+10]});
    wallRun(wL,'H',z1,x0,x1,{mi:0,ext:1,wins:[ox+3,ox+9]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1,wins:[oz+5]});
    wallRun(wL,'V',x1,z0,z1,{mi:0,ext:1});
    // consultórios ao sul + farmácia a leste
    wallRun(wL,'H',z0+5,x0,x0+9,{mi:1,doors:[x0+2,x0+7]});
    wallRun(wL,'V',x0+4,z0+5,z1,{mi:1});
    wallRun(wL,'V',x0+9,z0,z1,{mi:1,doors:[z0+2]});
    // recepção
    FURN.balcaoBar(fL,x0+2,z0+2,2); containers[containers.length-1].name='Arquivo'; containers[containers.length-1].loot=LOOT['Arquivo']();
    FURN.banco(fL,x0+5,z0+0.4,0); FURN.banco(fL,x0+5,z0+3.6,0);
    // consultórios: maca + mesa
    FURN.maca(fL,x0+1,z0+7,0); FURN.mesaEscr(fL,x0,z1-1);
    FURN.maca(fL,x0+5,z0+7,0); FURN.mesaEscr(fL,x0+7,z1-1);
    // farmácia: prateleiras de remédio
    FURN.pratMed(fL,x0+10,z0); FURN.pratMed(fL,x0+11,z0); FURN.pratMed(fL,x0+12,z0);
    FURN.pratMed(fL,x0+10,z1-1); FURN.pratMed(fL,x0+12,z1-1);
    return {x0,z0,x1,z1,name:'Posto de Saúde'};
  }
  function barZe(fL,wL,ox,oz){ // 10×8, entrada ao norte — balcão, banquetas, mesas
    const x0=ox,z0=oz,x1=ox+10,z1=oz+8;
    fillGround(x0,z0,x1-1,z1-1,T.BARF);
    wallRun(wL,'H',z0,x0,x1,{mi:3,ext:1,doors:[ox+4],wins:[ox+1,ox+7]});
    wallRun(wL,'H',z1,x0,x1,{mi:3,ext:1,doors:[ox+8]});
    wallRun(wL,'V',x0,z0,z1,{mi:3,ext:1,wins:[oz+4]});
    wallRun(wL,'V',x1,z0,z1,{mi:3,ext:1});
    FURN.balcaoBar(fL,x0+2,z1-3,5);
    for(const bx of [2.5,4,5.5]) FURN.banqueta(fL,x0+bx,z1-4);
    FURN.mesaRed(fL,x0+1,z0+2); FURN.mesaRed(fL,x0+4,z0+1.6); FURN.mesaRed(fL,x0+7,z0+2.4);
    FURN.banqueta(fL,x0+1,z0+1); FURN.banqueta(fL,x0+2,z0+2.4); FURN.banqueta(fL,x0+4.8,z0+2.6);
    FURN.banqueta(fL,x0+7.8,z0+1.5); FURN.banqueta(fL,x0+6.4,z0+2.2);
    // fundos: estoque de garrafas
    FURN.shelf(fL,x0+8,z1-1); containers[containers.length-1].name='Balcão de Bar'; containers[containers.length-1].loot=LOOT['Balcão de Bar']();
    return {x0,z0,x1,z1,name:'Bar do Zé'};
  }
  function oficina(fL,wL,ox,oz){ // 12×9, portão largo ao norte — bancadas, carro no macaco
    const x0=ox,z0=oz,x1=ox+12,z1=oz+9;
    fillGround(x0,z0,x1-1,z1-1,T.ASPH);
    wallRun(wL,'H',z0,x0,x1,{mi:3,ext:1,doors:[ox+3,ox+4,ox+5]});    // portão de 3 vãos
    wallRun(wL,'H',z1,x0,x1,{mi:3,ext:1,doors:[ox+10]});
    wallRun(wL,'V',x0,z0,z1,{mi:3,ext:1});
    wallRun(wL,'V',x1,z0,z1,{mi:3,ext:1,wins:[oz+4]});
    wallRun(wL,'H',z1-3,x0+8,x1,{mi:1,doors:[x0+9]});                 // escritório dos fundos
    FURN.bancada(fL,x0,z1-1,3); FURN.bancada(fL,x0,z0+1,2);
    FURN.bancada(fL,x0+6,z1-1,2);
    // carro suspenso no macaco
    fL.push({w:0.5,h:0.6,d:0.5,x:x0+3.5,y:0.3,z:z0+4.5,col:'#8a2a22'});
    fL.push({w:0.5,h:0.6,d:0.5,x:x0+5.5,y:0.3,z:z0+4.5,col:'#8a2a22'});
    S(x0+3,z0+4); S(x0+5,z0+4);
    // pilha de pneus + tambor
    FURN.mesaEscr(fL,x0+9,z1-2);
    fL.push({w:0.6,h:0.9,d:0.6,x:x1-1.5,y:0.45,z:z0+1.5,col:'#3a5a8a'}); S(x1-2,z0+1);
    return {x0,z0,x1,z1,name:'Oficina do Tonho',liftCar:{x:x0+4.5,z:z0+4.5}};
  }
  function postoGas(fL,wL,ox,oz){ // lojinha 8×6 + pátio de bombas (cobertura à parte)
    const x0=ox,z0=oz,x1=ox+8,z1=oz+6;
    fillGround(x0,z0,x1-1,z1-1,T.STORE);
    fillGround(x0-1,z1,x1+5,z1+7,T.ASPH);                    // pátio
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1});
    wallRun(wL,'H',z1,x0,x1,{mi:0,ext:1,doors:[ox+3],wins:[ox+1,ox+5]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1});
    wallRun(wL,'V',x1,z0,z1,{mi:0,ext:1,wins:[oz+2]});
    for(const sx of [x0,x0+1,x0+2]){ FURN.shelf(fL,sx,z0); containers[containers.length-1].name='Prateleira do Posto'; containers[containers.length-1].loot=LOOT['Prateleira do Posto'](); }
    FURN.freezer(fL,x0+6,z0); containers[containers.length-1].name='Prateleira do Posto'; containers[containers.length-1].loot=LOOT['Prateleira do Posto']();
    FURN.cash(fL,x0+4,z0+3);
    // bombas no pátio
    FURN.bomba(fL,x0+1,z1+3); FURN.bomba(fL,x0+4,z1+3);
    return {x0,z0,x1,z1,name:'Posto Estrela',pumps:true};
  }
  /* ---- casas novas, cada uma única ---- */
  function casaVaranda(fL,wL,ox,oz,doorN){ // 9×8 com varanda de frente
    const x0=ox,z0=oz,x1=ox+9,z1=oz+8;
    const vz = doorN? z0 : z1-2;                             // faixa da varanda
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0,vz,x1-1,vz+1,T.BARF);                      // deck da varanda
    // varanda: pilares + telhadinho é o próprio roof (estendido)
    for(const px of [x0+0.5,x0+4.5,x1-0.5]) fL.push({w:0.16,h:2.4,d:0.16,x:px,y:1.2,z:doorN?z0+0.3:z1-0.3,col:'#5a4630'});
    // corpo da casa (recuado da varanda)
    const hz0=doorN? z0+2:z0, hz1=doorN? z1:z1-2;
    wallRun(wL,'H',hz0,x0,x1,{mi:0,ext:1,doors:doorN?[ox+4]:[],wins:doorN?[ox+1,ox+7]:[ox+2,ox+6]});
    wallRun(wL,'H',hz1,x0,x1,{mi:0,ext:1,doors:doorN?[]:[ox+4],wins:doorN?[ox+2,ox+6]:[ox+1,ox+7]});
    wallRun(wL,'V',x0,hz0,hz1,{mi:0,ext:1,wins:[oz+4]});
    wallRun(wL,'V',x1,hz0,hz1,{mi:0,ext:1,wins:[oz+4]});
    const iz = doorN? hz0+3 : hz1-3;
    wallRun(wL,'V',x0+5,doorN?iz:hz0,doorN?hz1:iz,{mi:1,doors:[doorN?iz+1:hz0+1]});
    wallRun(wL,'H',iz,x0,x0+5,{mi:1,doors:[x0+2]});
    // sala + cozinha compacta + quarto
    FURN.sofa(fL,x0+1,doorN?hz0+1:hz1-2,0); FURN.tv(fL,x0+1,doorN?hz0+0.2:hz1-1);
    FURN.fridge(fL,x1-1,doorN?hz0:hz1-1); FURN.counter(fL,x1-2,doorN?hz0:hz1-1,'sink');
    FURN.bed(fL,x0+1,doorN?iz+1:hz0+1,0); FURN.wardrobe(fL,x0+4,doorN?hz1-1:hz0);
    FURN.mesaRed(fL,x0+7,doorN?hz0+2:hz1-3);
    return {x0,z0:hz0,x1,z1:hz1,name:'Casa com Varanda'};
  }
  function casaL(fL,wL,ox,oz){ // formato L com garagem (portão aberto), porta ao norte
    const x0=ox,z0=oz,x1=ox+12,z1=oz+9;
    // ala principal 12×6 + garagem 5×3 no sudoeste
    fillGround(x0,z0,x1-1,z0+5,T.WOOD);
    fillGround(x0,z0+6,x0+4,z1-1,T.ASPH);                    // garagem
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1,doors:[ox+6],wins:[ox+2,ox+9]});
    wallRun(wL,'H',z0+6,x0+5,x1,{mi:0,ext:1,wins:[ox+7,ox+10]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1,wins:[oz+2]});
    wallRun(wL,'V',x1,z0,z0+6,{mi:0,ext:1,wins:[oz+3]});
    wallRun(wL,'H',z1,x0,x0+5,{mi:0,ext:1,doors:[ox+1,ox+2,ox+3]});  // portão da garagem
    wallRun(wL,'V',x0+5,z0+6,z1,{mi:0,ext:1});
    wallRun(wL,'H',z0+6,x0,x0+5,{mi:1,doors:[x0+4]});
    wallRun(wL,'V',x0+7,z0,z0+3,{mi:1});                     // cozinha | sala
    wallRun(wL,'H',z0+3,x0+7,x1,{mi:1,doors:[x0+9]});
    FURN.fridge(fL,x1-1,z0); FURN.counter(fL,x1-2,z0,'stove'); FURN.counter(fL,x1-3,z0,'sink'); FURN.cab(fL,x1-4,z0);
    FURN.sofa(fL,x0+1,z0+3.4,0); FURN.tv(fL,x0+1,z0+1); FURN.coffee(fL,x0+2,z0+2.4);
    FURN.bed(fL,x0+8,z0+4,0); FURN.dresser(fL,x1-1,z0+5);
    // garagem: bancada + carro velho
    FURN.bancada(fL,x0,z0+7,2);
    return {x0,z0,x1,z1,name:'Casa em L'};
  }
  function kitnet(fL,wL,ox,oz,doorN){ // 6×5, tudo num cômodo
    const x0=ox,z0=oz,x1=ox+6,z1=oz+5;
    fillGround(x0,z0,x1-1,z1-1,T.CARPET2);
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1,doors:doorN?[ox+2]:[],wins:doorN?[]:[ox+2]});
    wallRun(wL,'H',z1,x0,x1,{mi:0,ext:1,doors:doorN?[]:[ox+2],wins:doorN?[ox+2]:[]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1,wins:[oz+2]});
    wallRun(wL,'V',x1,z0,z1,{mi:0,ext:1});
    FURN.bed(fL,x0+3,doorN?z1-1:z0,0); FURN.fridge(fL,x0,doorN?z1-1:z0);
    FURN.counter(fL,x0+1,doorN?z1-1:z0,'sink'); FURN.mesaRed(fL,x0+1,z0+2);
    FURN.dresser(fL,x1-1,z0+2);
    return {x0,z0,x1,z1,name:'Kitnet'};
  }
  function casaJardim(fL,wL,ox,oz){ // 10×7 com jardim murado nos fundos, porta ao norte
    const x0=ox,z0=oz,x1=ox+10,z1=oz+7;
    fillGround(x0,z0,x1-1,z1-1,T.WOOD);
    fillGround(x0+6,z0,x1-1,z0+3,T.TILEF);
    wallRun(wL,'H',z0,x0,x1,{mi:0,ext:1,doors:[ox+3],wins:[ox+1,ox+7]});
    wallRun(wL,'H',z1,x0,x1,{mi:0,ext:1,doors:[ox+8],wins:[ox+2]});
    wallRun(wL,'V',x0,z0,z1,{mi:0,ext:1,wins:[oz+3]});
    wallRun(wL,'V',x1,z0,z1,{mi:0,ext:1,wins:[oz+2,oz+5]});
    wallRun(wL,'V',x0+6,z0,z0+3,{mi:1,doors:[z0+1]});
    wallRun(wL,'H',z0+3,x0+6,x1,{mi:1});
    wallRun(wL,'V',x0+4,z0+3,z1,{mi:1,doors:[z0+5]});
    FURN.sofa(fL,x0+1,z0+4,0); FURN.tv(fL,x0+1,z0+5.6); FURN.book(fL,x0,z0+3);
    FURN.fridge(fL,x0+7,z0); FURN.counter(fL,x0+8,z0,'sink'); FURN.cab(fL,x0+9,z0);
    FURN.bed(fL,x0+5,z0+4,0); FURN.wardrobe(fL,x0+9,z0+4); FURN.night(fL,x0+4.2,z0+4);
    // jardim murado nos fundos (cerca)
    fenceRun(fL,'H',z1+3,x0,x1); fenceRun(fL,'V',x0,z1,z1+3); fenceRun(fL,'V',x1,z1,z1+3);
    return {x0,z0,x1,z1,name:'Casa do Jardim'};
  }

  /* ================= EXTERIOR ================= */
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
  function addCar(scene3,x,z,col,opts){
    opts=opts||{};
    const burnt=opts.burnt;
    const body= burnt? '#26221e' : col;
    const g=new THREE.Group(); const M=(w,h,d,px,py,pz,c)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), new THREE.MeshLambertMaterial({color:c})); m.position.set(px,py,pz); g.add(m); return m; };
    M(3.6,0.55,1.7,0,0.55,0,body); M(2.0,0.55,1.5,-0.2,1.05,0,body);
    M(1.8,0.45,1.4,-0.2,1.08,0,burnt?'#141210':'#20242c');
    [[-1.25,0.75],[1.25,0.75],[-1.25,-0.75],[1.25,-0.75]].forEach(([a,b])=>M(0.55,0.55,0.25,a,0.3,b,burnt?'#100e0c':'#181818'));
    if(!burnt) M(0.15,0.15,1.5,1.8,0.6,0,'#e8e4c8');
    if(opts.police){ M(1.2,0.16,0.5,-0.2,1.36,0,'#20242c');
      M(0.4,0.14,0.4,-0.42,1.42,0,'#c03028'); M(0.4,0.14,0.4,0.02,1.42,0,'#2858c0');
      M(3.58,0.2,1.72,0,0.72,0,'#e8e4dc'); }
    if(opts.doorOpen){ const d=M(0.08,0.5,0.8,1.0,0.72,1.15,body); d.rotation.y=0.9; }
    if(opts.hood){ const h=M(1.2,0.08,1.5,1.35,1.0,0,body); h.rotation.z=0.5; }
    g.position.set(x,0,z); g.rotation.y=opts.ry||0;
    if(opts.tilt) g.rotation.z=opts.tilt;
    if(opts.trunk) containers.push({x:Math.floor(x),z:Math.floor(z),name:'Porta-malas',loot:LOOT['Porta-malas'](),opened:false});
    scene3.add(g);
    // sólidos aproximados considerando rotação
    const c2=Math.abs(Math.cos(opts.ry||0)), s2=Math.abs(Math.sin(opts.ry||0));
    const hx=2*c2+1*s2, hz=2*s2+1*c2;
    for(let dx=-Math.ceil(hx);dx<=Math.ceil(hx);dx++)for(let dz=-Math.ceil(hz);dz<=Math.ceil(hz);dz++)
      if(Math.abs(dx)<=hx&&Math.abs(dz)<=hz) S(Math.floor(x)+dx, Math.floor(z)+dz);
    return g;
  }
  function addBarrier(fL,x,z,ry){ // cavalete policial
    fL.push({w:1.6,h:0.16,d:0.1,x,y:0.82,z,ry,col:'#d8d4c8'});
    fL.push({w:1.6,h:0.14,d:0.08,x,y:0.5,z,ry,col:'#c05028'});
    fL.push({w:0.08,h:0.9,d:0.4,x:x-0.7*Math.cos(ry||0),y:0.45,z:z+0.7*Math.sin(ry||0),ry,col:'#8a8a82'});
    fL.push({w:0.08,h:0.9,d:0.4,x:x+0.7*Math.cos(ry||0),y:0.45,z:z-0.7*Math.sin(ry||0),ry,col:'#8a8a82'});
  }
  function addCorpse(fL,x,z,ry,cloth){ // corpo caído (saqueável)
    const skin='#b8a088';
    fL.push({w:0.5,h:0.14,d:0.3,x,y:0.09,z,ry,col:cloth});
    fL.push({w:0.24,h:0.13,d:0.24,x:x+0.42*Math.sin((ry||0)+1.57),y:0.08,z:z+0.42*Math.cos((ry||0)+1.57),ry,col:skin});
    fL.push({w:0.13,h:0.1,d:0.5,x:x+0.3*Math.cos(ry||0),y:0.06,z:z-0.28*Math.sin(ry||0),ry:(ry||0)+0.5,col:cloth});
    fL.push({w:0.13,h:0.1,d:0.5,x:x-0.3*Math.cos(ry||0),y:0.06,z:z+0.2*Math.sin(ry||0),ry:(ry||0)-0.4,col:skin});
    fL.push({w:0.15,h:0.1,d:0.6,x:x-0.35*Math.sin((ry||0)+1.57),y:0.06,z:z-0.35*Math.cos((ry||0)+1.57),ry:(ry||0)+0.2,col:'#3a3a44'});
    fL.push({w:0.15,h:0.1,d:0.55,x:x-0.5*Math.sin((ry||0)+1.57),y:0.06,z:z-0.5*Math.cos((ry||0)+1.57),ry:(ry||0)-0.3,col:'#3a3a44'});
    containers.push({x:Math.floor(x),z:Math.floor(z),name:'Corpo',loot:LOOT['Corpo'](),opened:false});
    bloodSpots.push({x,z,s:1.2});
  }
  function addTrashBag(fL,x,z){ fL.push({w:0.5,h:0.4,d:0.5,x,y:0.2,z,ry:rng()*3,col:'#22262a'});
    fL.push({w:0.3,h:0.25,d:0.3,x:x+0.3,y:0.12,z:z+0.2,ry:rng()*3,col:'#2a2e32'}); }
  function addTuft(fL,x,z){ const h=0.18+rng()*0.25;
    fL.push({w:0.1,h,d:0.1,x,y:h/2,z,col:'#5a7a38'});
    fL.push({w:0.1,h:h*0.8,d:0.1,x:x+0.12,y:h*0.4,z:z+0.08,col:'#4d6b32'});
    fL.push({w:0.1,h:h*0.7,d:0.1,x:x-0.1,y:h*0.35,z:z+0.12,col:'#6a8a42'}); }
  function addTires(fL,x,z){ for(let i=0;i<2;i++) fL.push({w:0.65,h:0.22,d:0.65,x,y:0.12+i*0.23,z,ry:rng(),col:'#1a1a1c'}); }
  function addSuitcase(fL,x,z){ fL.push({w:0.7,h:0.16,d:0.5,x,y:0.08,z,ry:0.4,col:'#6a4a3a'});
    fL.push({w:0.7,h:0.14,d:0.5,x:x+0.25,y:0.06,z:z+0.5,ry:2.2,col:'#6a4a3a'});
    for(let i=0;i<4;i++) fL.push({w:0.2,h:0.05,d:0.15,x:x+(rng()-0.5)*1.4,y:0.03,z:z+(rng()-0.5)*1.4,ry:rng()*3,col:['#c8c0b0','#8a9aa8','#b0a890'][i%3]}); }
  const bloodSpots=[]; // manchas pintadas no chão depois
  function addWires(scene3){ // fiação caída entre postes
    const pairs=[[lamps[4],lamps[0]],[lamps[0],lamps[3]],[lamps[1],lamps[5]]];
    const mat3=new THREE.LineBasicMaterial({color:0x14161a});
    pairs.forEach(([a,b])=>{ if(!a||!b) return;
      const pts=[]; for(let i=0;i<=12;i++){ const t=i/12;
        const x=a.x+(b.x-a.x)*t, z=a.z+(b.z-a.z)*t;
        const y=3.35-Math.sin(t*Math.PI)*0.55;
        pts.push(new THREE.Vector3(x,y,z)); }
      const geo=new THREE.BufferGeometry().setFromPoints(pts);
      scene3.add(new THREE.Line(geo,mat3)); });
  }

  /* ================= CONSTRUÇÃO ================= */
  function build(scene3){
    scene=scene3;
    const sidings=['#b8b09a','#9ab0b8','#c0b088','#a8b898'].map(c=>tex(texSiding(c)));
    const paint=tex(texPaint('#c8c0b0'));
    const brick=tex(texBrick());
    const roofT=[tex(texRoof('#6e4a3a')),tex(texRoof('#4a4a52')),tex(texRoof('#5a4a62')),tex(texRoof('#3a4a44'))];

    /* ---- MALHA VIÁRIA (2 avenidas × 2 ruas) ---- */
    fillGround(0,33,W-1,36,T.ROAD); fillGround(33,0,36,W-1,T.ROAD);       // Rua Velha (E-O) + Rua da Igreja (N-S)
    fillGround(0,32,W-1,32,T.SIDE); fillGround(0,37,W-1,37,T.SIDE);
    fillGround(32,0,32,W-1,T.SIDE); fillGround(37,0,37,W-1,T.SIDE);
    fillGround(0,88,W-1,91,T.ROAD); fillGround(88,0,91,W-1,T.ROAD);       // Avenida Sul (E-O) + Rua do Centro (N-S)
    fillGround(0,87,W-1,87,T.SIDE); fillGround(0,92,W-1,92,T.SIDE);
    fillGround(87,0,87,W-1,T.SIDE); fillGround(92,0,92,W-1,T.SIDE);
    fillGround(33,33,36,36,T.ROAD); fillGround(88,88,91,91,T.ROAD);
    fillGround(33,88,36,91,T.ROAD); fillGround(88,33,91,36,T.ROAD);

    const defs=[];
    function houseAt(fn,ox,oz,doorN,mi,opts){ const fL=[], wL=[]; const b=fn(fL,wL,ox,oz,doorN,mi); defs.push({b,fL,wL,mi,...(opts||{})}); return b; }
    /* ---- VILA ANTIGA (bairro original) ---- */
    houseAt(casaFamilia,  8,22,false,0);
    houseAt(bangalo,     22,24,false,1);
    houseAt(casaGrande,  41,22,false,2);
    houseAt(casaFamilia, 56,23,false,3);
    houseAt(bangalo,     24,41,true, 2, {burnt:true});   // a casa que pegou fogo
    houseAt(bangalo,     41,41,true, 3);
    houseAt(casaGrande,  52,41,true, 0);
    { const fL=[], wL=[]; const b=mercado(fL,wL,8,40); defs.push({b,fL,wL,mi:'store'}); }
    /* ---- CENTRO (nordeste): posto, delegacia, praça ---- */
    { const fL=[], wL=[]; const b=postoGas(fL,wL,68,19); defs.push({b,fL,wL,mi:1}); }
    { const fL=[], wL=[]; const b=delegacia(fL,wL,96,18); defs.push({b,fL,wL,mi:'store'}); }
    fillGround(113,20,121,28,T.ASPH);                     // estacionamento da delegacia
    /* ---- LESTE: clínica + casa em L ---- */
    { const fL=[], wL=[]; const b=clinica(fL,wL,96,42); defs.push({b,fL,wL,mi:0}); }
    houseAt(casaL, 106,58,false,2);
    /* ---- SUL: escola (quadra ao norte) ---- */
    { const fL=[], wL=[]; const b=escola(fL,wL,8,70); defs.push({b,fL,wL,mi:2}); }
    fillGround(10,58,26,68,T.ASPH);                       // quadra esportiva
    /* ---- AVENIDA SUL (lado sul): bar, oficina, casas novas ---- */
    { const fL=[], wL=[]; const b=barZe(fL,wL,42,93); defs.push({b,fL,wL,mi:3}); }
    { const fL=[], wL=[]; const b=oficina(fL,wL,58,93); defs.push({b,fL,wL,mi:'store'}); }
    houseAt(casaVaranda, 74,93,true,1);
    houseAt(kitnet,      96,93,true,3);
    houseAt(casaJardim, 106,93,false,0);

    const paths=[[10,30,10,31],[26,31,26,31],[46,31,46,31],[58,31,58,31],[28,38,28,40],[45,38,45,40],[57,38,57,40],[14,38,14,39],
      // distritos novos: portas → calçadas
      [104,32,104,41],[110,53,110,57],[12,86,12,87],[46,92,46,92],[68,92,68,92],[78,92,78,92],[98,92,98,92],[109,92,109,92]];
    paths.forEach(([x,za,_,zb])=>{ for(let z=za;z<=zb;z++) ground[x*W+z]=T.DIRT; });
    // trilha da praça à delegacia
    for(let x=87;x<=95;x++) ground[x*W+14]=T.DIRT;

    // textura carbonizada (casa incendiada)
    const charTx=(()=>{ const c=cv(64,128), g=c.getContext('2d');
      g.fillStyle='#1e1a16'; g.fillRect(0,0,64,128);
      for(let y=0;y<128;y+=13){ g.fillStyle='#14100c'; g.fillRect(0,y+11,64,2); }
      for(let i=0;i<40;i++){ g.fillStyle=['#2a221c','#0e0c0a','#3a2e22'][i%3]; g.fillRect(rng()*64,rng()*128,3+rng()*6,2+rng()*10); }
      g.fillStyle='#4a3a28'; g.fillRect(0,120,64,8); return tex(c); })();
    defs.forEach((def)=>{
      const {b,fL,wL,mi,burnt}=def;
      const extMat = mi==='store'? new THREE.MeshLambertMaterial({map:brick}) : new THREE.MeshLambertMaterial({map:sidings[mi]});
      const charMat = new THREE.MeshLambertMaterial({map:charTx});
      const mats=[extMat, new THREE.MeshLambertMaterial({map:paint}), extMat, new THREE.MeshLambertMaterial({map:brick}), charMat];
      if(burnt){ wL.forEach(it=>it.mi=4);
        fL.forEach(it=>{ const c=new THREE.Color(it.col||'#888'); c.multiplyScalar(0.28); it.col='#'+c.getHexString(); }); }
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
      const rT = mi==='store'? roofT[1] : roofT[(typeof mi==='number'?mi:0)];
      const roofMat= burnt? new THREE.MeshLambertMaterial({color:'#181410'}) : new THREE.MeshLambertMaterial({map:rT});
      const roof=new THREE.Mesh(new THREE.BoxGeometry(b.x1-b.x0+0.7,0.28,b.z1-b.z0+0.7), roofMat);
      roof.position.set((b.x0+b.x1)/2,2.65,(b.z0+b.z1)/2); roof.castShadow=true; scene.add(roof);
      if(burnt){ roof.rotation.z=0.045; roof.position.y=2.5; } // telhado cedendo
      if(fL.length){ const fm=mergeBoxes(fL,[new THREE.MeshLambertMaterial({vertexColors:true})]); fm.castShadow=true; scene.add(fm); }
      buildings.push({...b, burnt, keepMesh, fadeMesh, fadeMats, roof, winGlass:[]});
    });
    // placa do mercado
    { const sign=new THREE.Mesh(new THREE.BoxGeometry(8,1.1,0.2), new THREE.MeshLambertMaterial({map:tex(texStoreSign())}));
      sign.position.set(14.5,2.9,40-0.2); scene.add(sign); }

    // portas
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
    // vidros das janelas
    const glassMatBase=new THREE.MeshLambertMaterial({color:'#9db8c8',transparent:true,opacity:0.45});
    windows.forEach(w=>{
      const gm=glassMatBase.clone();
      const glass=new THREE.Mesh(new THREE.BoxGeometry(w.edge==='V'?0.06:0.94, 1.2, w.edge==='V'?0.94:0.06), gm);
      glass.position.set(w.edge==='V'? w.x : w.x+0.5, 1.5, w.edge==='V'? w.z+0.5 : w.z);
      scene.add(glass); w.glass=glass;
      const bld=buildings.find(b=> (w.edge==='V'? (w.x>=b.x0&&w.x<=b.x1&&w.z>=b.z0&&w.z<b.z1) : (w.x>=b.x0&&w.x<b.x1&&w.z>=b.z0&&w.z<=b.z1)) );
      if(bld) bld.winGlass.push(gm);
    });

    /* ---- PÓS-APOCALIPSE: a casa queimada ---- */
    const burntB=buildings.find(b=>b.burnt);
    if(burntB){
      fillGround(burntB.x0,burntB.z0,burntB.x1-1,burntB.z1-1,T.CHAR);
      windows.forEach(w=>{ const inB= w.x>=burntB.x0&&w.x<=burntB.x1&&w.z>=burntB.z0&&w.z<=burntB.z1;
        if(inB) smashWindow(w); });
      doors.forEach(d=>{ const inB= d.x>=burntB.x0&&d.x<=burntB.x1&&d.z>=burntB.z0&&d.z<=burntB.z1;
        if(inB&&d.exterior) breakDoor(d); });
      containers.forEach(c=>{ if(c.x>=burntB.x0&&c.x<burntB.x1&&c.z>=burntB.z0&&c.z<burntB.z1) c.loot=[]; });
    }
    /* ---- janelas pré-barricadas (algum sobrevivente passou aqui) ---- */
    windows.forEach(w=>{ if(w.z===41&&w.x>=52&&w.x<=64){ barricade(w); barricade(w); } });
    /* ---- portas abertas (casas já saqueadas) ---- */
    doors.forEach(d=>{ if(d.exterior&&((d.x===26&&d.z===31)||(d.x===45&&d.z===41))) toggleDoor(d); });

    // exterior
    const dL=[];
    for(let i=0;i<46;i++){ const side=i%4; let x,z;
      if(side===0){x=2+rng()*3;z=3+rng()*(W-6);} else if(side===1){x=W-5+rng()*3;z=3+rng()*(W-6);}
      else if(side===2){x=3+rng()*(W-6);z=1.5+rng()*3;} else {x=3+rng()*(W-6);z=W-5+rng()*3;}
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS) addTree(dL,x,z,rng()<0.5);
    }
    [[5,14],[19,12],[30,8],[44,10],[52,15],[64,12],[6,52],[20,55],[38,54],[48,58],[62,52],[30,62],[13,18],[60,18]].forEach(([x,z])=>{
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS) addTree(dL,x+rng(),z+rng(),rng()<0.6); });
    [[12,31],[24,31],[43,31],[59,31],[27,38],[44,38],[55,38]].forEach(([x,z])=>addBush(dL,x+0.5,z+0.5));
    fenceRun(dL,'H',14,8,19); fenceRun(dL,'V',20,14,22); fenceRun(dL,'H',16,41,53);
    fenceRun(dL,'H',58,24,32); fenceRun(dL,'V',50,41,50);
    [[31,31],[38,38],[31,45],[38,24],[14,31],[52,38]].forEach(([x,z])=>addLamp(dL,x+0.2,z+0.2));
    FURN.bin(dL,7,30); FURN.bin(dL,21,30); FURN.bin(dL,40,30); FURN.bin(dL,23,40); FURN.mail(dL,11,31); FURN.mail(dL,27,31); FURN.mail(dL,47,31); FURN.mail(dL,59,31);
    /* ---- PÓS-APOCALIPSE: destroços, bloqueio, corpos, lixo, mato ---- */
    // bloqueio policial abandonado no cruzamento leste
    addBarrier(dL,39.4,33.9,0.15); addBarrier(dL,39.7,35.9,-0.1); addBarrier(dL,40.1,34.9,0.05);
    // cones caídos
    [[39.0,34.4],[40.5,36.2],[38.6,35.3]].forEach(([x,z])=>{ dL.push({w:0.3,h:0.5,d:0.3,x,y:0.12,z,ry:rng()*3,col:'#c05028'}); });
    // corpos nas ruas (dias de pânico)
    addCorpse(dL,40.2,35.1,0.4,'#2a3a5a'); addCorpse(dL,41.6,33.9,2.2,'#5a5a52');
    addCorpse(dL,28.4,31.6,1.1,'#6a4a42'); addCorpse(dL,57.8,33.4,5.2,'#4a5a4a');
    addCorpse(dL,14.2,45.5,0.8,'#7a6a5a'); addCorpse(dL,35.4,42.5,3.6,'#5a4a5a');
    // sacos de lixo e entulho
    [[7.8,29.2],[21.5,29.3],[23.5,39.5],[15,50.8],[16.2,50.3],[40.5,29.5],[58.5,30.6],[33.2,38.6],[36.8,30.8]].forEach(([x,z])=>addTrashBag(dL,x,z));
    addTires(dL,9.5,50.6); addTires(dL,10.3,50.4); addSuitcase(dL,13.2,35.6);
    // mato crescendo (gramados abandonados + rachaduras da rua)
    for(let i=0;i<85;i++){ const x=2+rng()*(W-4), z=2+rng()*(W-4);
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS && !solid[Math.floor(x)*W+Math.floor(z)]) addTuft(dL,x,z); }
    [[18.4,33.2],[29.6,36.7],[43.3,33.4],[55.7,36.3],[34.3,12.5],[36.6,48.4],[33.4,58.6],[24.2,32.4],[50.5,37.6]].forEach(([x,z])=>addTuft(dL,x,z));
    /* ================= NOVOS DISTRITOS: decoração à mão ================= */
    // PRAÇA CENTRAL (entre a Rua da Igreja e a delegacia)
    fillGround(70,8,86,20,T.GRASS);
    fillGround(77,8,79,20,T.PLAZA); fillGround(70,13,86,15,T.PLAZA);      // caminhos em cruz
    FURN.chafariz(dL,76.5,12.5);
    FURN.banco(dL,72,12.2,0); FURN.banco(dL,81,12.2,0); FURN.banco(dL,72,15.6,0); FURN.banco(dL,81,15.6,0);
    FURN.balanco(dL,71,17.5); FURN.escorrega(dL,81,17.5);
    FURN.bin(dL,75,13); FURN.bin(dL,80,15);
    addTree(dL,71.5,9.5,true); addTree(dL,84.5,9.5,true); addTree(dL,71.5,19,false); addTree(dL,84.8,19.5,true);
    // quadra da escola: traves
    dL.push({w:0.1,h:1.2,d:2.2,x:11,y:0.6,z:63,col:'#d8d4c8'}); dL.push({w:0.1,h:1.2,d:2.2,x:25,y:0.6,z:63,col:'#d8d4c8'});
    dL.push({w:0.1,h:0.1,d:2.2,x:11,y:1.25,z:63,col:'#d8d4c8'}); dL.push({w:0.1,h:0.1,d:2.2,x:25,y:1.25,z:63,col:'#d8d4c8'});
    // posto: cobertura sobre as bombas
    dL.push({w:8,h:0.3,d:5,x:72,y:3.2,z:28.5,col:'#c8443a'});
    dL.push({w:0.25,h:3.1,d:0.25,x:68.6,y:1.55,z:26.6,col:'#8a8a92'}); dL.push({w:0.25,h:3.1,d:0.25,x:75.4,y:1.55,z:26.6,col:'#8a8a92'});
    dL.push({w:0.25,h:3.1,d:0.25,x:68.6,y:1.55,z:30.4,col:'#8a8a92'}); dL.push({w:0.25,h:3.1,d:0.25,x:75.4,y:1.55,z:30.4,col:'#8a8a92'});
    // árvores das avenidas novas + quintais do sul
    [[46,86],[54,86],[70,86],[100,86],[118,86],[46,94.5],[88,20],[94,12],[118,14],[120,40],[102,64],[112,72],[16,92],[30,92],[36,64],[6,64],[62,60],[122,96],[94,110],[70,108]].forEach(([x,z])=>{
      if(ground[Math.floor(x)*W+Math.floor(z)]===T.GRASS) addTree(dL,x+rng(),z+rng(),rng()<0.5); });
    [[60,87],[78,92.3],[98,87],[110,92.3],[87,50],[92.3,70],[87,14],[113,31]].forEach(([x,z])=>addLamp(dL,x+0.2,z+0.2));
    // lixo/entulho dos distritos
    [[44,92.4],[59,92.3],[76,92.5],[97,92.4],[108,92.6],[95,31.5],[113,29],[70,31.5],[13,86.5],[27,86.4]].forEach(([x,z])=>addTrashBag(dL,x,z));
    FURN.bin(dL,66,31); FURN.bin(dL,94,31); FURN.bin(dL,112,31); FURN.bin(dL,45,92); FURN.bin(dL,98,42);
    FURN.mail(dL,76,92); FURN.mail(dL,98,92); FURN.mail(dL,108,92); FURN.mail(dL,108,57);
    addTires(dL,60.5,94.5); addTires(dL,69,101);
    // corpos das zonas novas
    addCorpse(dL,89.5,34.8,1.2,'#2a3a5a');                     // policial na esquina
    addCorpse(dL,104,30.5,0.6,'#5a4a42'); addCorpse(dL,18,63,2.8,'#6a5a6a');
    addCorpse(dL,90.2,89.6,4.1,'#4a4a52'); addCorpse(dL,79,14.2,0.3,'#7a5a4a');
    addCorpse(dL,100.5,45.5,2.0,'#e0e0e8');                    // enfermeira na clínica
    // barricada militar na Avenida Sul (leste)
    addBarrier(dL,120.5,88.8,0.1); addBarrier(dL,120.8,90.6,-0.12);
    [[119.8,89.5],[121.6,90.2]].forEach(([x,z])=>{ dL.push({w:0.3,h:0.5,d:0.3,x,y:0.12,z,ry:rng()*3,col:'#c05028'}); });
    const deco=mergeBoxes(dL,[new THREE.MeshLambertMaterial({vertexColors:true})]); deco.castShadow=true; scene.add(deco);
    // carros: estacionados, batidos, queimados, viaturas
    addCar(scene,26,34.6,'#7a3a32',{doorOpen:true});
    addCar(scene,48,35.4,'#3a5a7a');
    addCar(scene,40.9,34.6,'#e8e4dc',{police:true,ry:0.35,doorOpen:true});
    addCar(scene,20.6,36.2,'#5a6a4a',{ry:0.5,hood:true});           // bateu no poste
    addCar(scene,35.3,17.8,'#000000',{burnt:true,ry:1.62});          // carcaça queimada
    addCar(scene,54.6,39.6,'#8a7a5a',{ry:-0.55,doorOpen:true});      // subiu no gramado
    // distritos novos
    addCar(scene,115.5,22.5,'#e8e4dc',{police:true,ry:1.57,trunk:true});   // viatura no pátio (porta-malas!)
    addCar(scene,118.5,26,'#e8e4dc',{police:true,ry:1.35,doorOpen:true});
    addCar(scene,71.8,32.4,'#8a6a3a',{ry:0.08});                     // posto
    addCar(scene,90.5,86.2,'#3a4a6a',{ry:0.9,hood:true});            // batido na esquina da avenida
    addCar(scene,62,89.8,'#7a4a5a',{burnt:true,ry:-0.2});            // queimado na avenida
    addCar(scene,101,90.2,'#4a6a5a',{ry:0.02,trunk:true});           // abandonado c/ porta-malas
    addCar(scene,110.8,60.5,'#6a5a8a',{ry:1.5});                     // casa em L
    addWires(scene);
    lamps.forEach(l=>{
      const head=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.14,0.24), new THREE.MeshLambertMaterial({color:'#c8b060',emissive:'#000000'}));
      head.position.set(l.x,3.35,l.z); scene.add(head); l.head=head;
      const pt=new THREE.PointLight(0xffc060, 0, 10); pt.position.set(l.x,3.1,l.z); scene.add(pt); l.light=pt;
    });

    // chão
    const gc=cv(W*TPX,W*TPX), g2=gc.getContext('2d');
    for(let x=0;x<W;x++)for(let z=0;z<W;z++) paintTile(g2,x,z,ground[x*W+z]);
    g2.fillStyle='#b8b8a8';
    const noDash=(v)=>(v>30&&v<39)||(v>85&&v<94);
    for(const rc of [35,90]){ // faixas centrais das 2 vias E-O e 2 vias N-S
      for(let x=0;x<W;x+=2){ if(noDash(x)) continue; if(rng()<0.2) continue; g2.fillRect(x*TPX+3,rc*TPX-1,TPX-6,2); }
      for(let z=0;z<W;z+=2){ if(noDash(z)) continue; if(rng()<0.2) continue; g2.fillRect(rc*TPX-1,z*TPX+3,2,TPX-6); } }
    for(let k=0;k<4;k++){ g2.fillRect((33.4+k*0.85)*TPX,32.2*TPX,8,12); g2.fillRect((33.4+k*0.85)*TPX,37.1*TPX,8,12);
      g2.fillRect((88.4+k*0.85)*TPX,32.2*TPX,8,12); g2.fillRect((33.4+k*0.85)*TPX,92.1*TPX,8,12);
      g2.fillRect((88.4+k*0.85)*TPX,92.1*TPX,8,12); }
    /* linhas da quadra esportiva da escola */
    g2.strokeStyle='#e8e4d8'; g2.lineWidth=2;
    g2.strokeRect(10.6*TPX,58.6*TPX,15.6*TPX,9*TPX);
    g2.beginPath(); g2.moveTo(18.4*TPX,58.6*TPX); g2.lineTo(18.4*TPX,67.6*TPX); g2.stroke();
    g2.beginPath(); g2.arc(18.4*TPX,63.1*TPX,1.7*TPX,0,6.29); g2.stroke();
    /* vagas do estacionamento da delegacia */
    g2.strokeStyle='#c8c4b0';
    for(let k=0;k<3;k++) g2.strokeRect((113.5+k*2.6)*TPX,21*TPX,2.2*TPX,5.5*TPX);
    /* ---- decalques pós-apocalípticos ---- */
    const px2=(x)=>x*TPX;
    // rachaduras no asfalto
    g2.strokeStyle='#26262a'; g2.lineWidth=1.5;
    for(let i=0;i<26;i++){ const onV=rng()<0.4; const band=rng()<0.5?33:88;
      let x=onV? (band+rng()*3):(rng()*W), z=onV? (rng()*W):(band+rng()*3);
      g2.beginPath(); g2.moveTo(px2(x),px2(z));
      for(let s=0;s<5;s++){ x+=(rng()-0.5)*1.6; z+=(rng()-0.5)*1.6; g2.lineTo(px2(x),px2(z)); }
      g2.stroke(); }
    // manchas de óleo
    [[27,35.2],[49.2,35.8],[34.8,50],[40.9,34.9],[20.4,36.1]].forEach(([x,z])=>{
      g2.fillStyle='rgba(14,14,18,.55)'; g2.beginPath(); g2.ellipse(px2(x),px2(z),13+rng()*8,8+rng()*5,rng(),0,6.29); g2.fill(); });
    // marcas de frenagem
    g2.strokeStyle='rgba(16,16,18,.6)'; g2.lineWidth=3;
    [[46,34.3,41.5,34.7],[25,35.9,21.2,36.2],[36.2,26,35.4,19.5]].forEach(([xa,za,xb,zb])=>{
      for(const off of [-0.28,0.28]){ g2.beginPath(); g2.moveTo(px2(xa),px2(za+off));
        g2.quadraticCurveTo(px2((xa+xb)/2),px2(za+off+(rng()-0.5)*0.4),px2(xb),px2(zb+off)); g2.stroke(); } });
    // folhas secas sob as árvores
    trees.forEach(t=>{ for(let i=0;i<22;i++){ const a=rng()*6.29, r=rng()*1.6*TPX;
      g2.fillStyle=['#8a6a3a','#a07a42','#6d5a30','#5a4a28'][i%4];
      g2.fillRect(px2(t.x)+Math.cos(a)*r, px2(t.z)+Math.sin(a)*r, 2, 2); } });
    // papéis e entulho nas ruas e calçadas
    for(let i=0;i<90;i++){ const x=rng()*W, z=rng()*W; const t=ground[Math.floor(x)*W+Math.floor(z)];
      if(t!==T.ROAD&&t!==T.SIDE) continue;
      g2.fillStyle=rng()<0.6?'#c8c4b4':'#9a968a'; g2.fillRect(px2(x),px2(z),2+rng()*3,2+rng()*2); }
    // fuligem ao redor da casa queimada
    if(burntB){ const cx=(burntB.x0+burntB.x1)/2, cz=(burntB.z0+burntB.z1)/2;
      const rg=g2.createRadialGradient(px2(cx),px2(cz),TPX*2,px2(cx),px2(cz),TPX*7.5);
      rg.addColorStop(0,'rgba(10,8,6,.5)'); rg.addColorStop(1,'rgba(10,8,6,0)');
      g2.fillStyle=rg; g2.fillRect(px2(burntB.x0-3),px2(burntB.z0-3),px2(burntB.x1-burntB.x0+6),px2(burntB.z1-burntB.z0+6));
      for(let i=0;i<30;i++){ g2.fillStyle='rgba(20,16,12,.6)'; g2.fillRect(px2(burntB.x0-1+rng()*(burntB.x1-burntB.x0+2)),px2(burntB.z0-1+rng()*(burntB.z1-burntB.z0+2)),3+rng()*5,2+rng()*4); } }
    // carcaça queimada: chamuscado
    { const rg=g2.createRadialGradient(px2(35.3),px2(17.8),4,px2(35.3),px2(17.8),TPX*2.6);
      rg.addColorStop(0,'rgba(12,10,8,.7)'); rg.addColorStop(1,'rgba(12,10,8,0)');
      g2.fillStyle=rg; g2.beginPath(); g2.arc(px2(35.3),px2(17.8),TPX*2.6,0,6.29); g2.fill(); }
    // sangue: poças sob corpos + arrastões antigos
    bloodSpots.forEach(bs=>{ g2.fillStyle='rgba(96,16,10,.6)';
      g2.beginPath(); g2.ellipse(px2(bs.x),px2(bs.z),TPX*0.55*bs.s,TPX*0.4*bs.s,rng(),0,6.29); g2.fill();
      for(let i=0;i<5;i++){ g2.fillStyle='rgba(96,16,10,.4)';
        g2.fillRect(px2(bs.x)+(rng()-0.5)*TPX*1.6, px2(bs.z)+(rng()-0.5)*TPX*1.4, 2+rng()*4, 2+rng()*3); } });
    [[30,32.4,33,32.4],[12,38.2,10.5,40.2],[44.5,38,45,41]].forEach(([xa,za,xb,zb])=>{
      g2.strokeStyle='rgba(90,14,8,.35)'; g2.lineWidth=5;
      g2.beginPath(); g2.moveTo(px2(xa),px2(za)); g2.lineTo(px2(xb),px2(zb)); g2.stroke(); });
    const gtex=new THREE.CanvasTexture(gc); gtex.magFilter=THREE.NearestFilter; gtex.minFilter=THREE.LinearMipMapLinearFilter; gtex.anisotropy=4;
    const gp=new THREE.Mesh(new THREE.PlaneGeometry(W,W), new THREE.MeshLambertMaterial({map:gtex}));
    gp.rotation.x=-Math.PI/2; gp.position.set(W/2,0,W/2); gp.receiveShadow=true; scene.add(gp);
    state.groundCanvas=gc; state.groundTex=gtex;

    const aoC=cv(64,64); { const g3=aoC.getContext('2d'); const rg=g3.createRadialGradient(32,32,16,32,32,32);
      rg.addColorStop(0,'rgba(0,0,0,.32)'); rg.addColorStop(1,'rgba(0,0,0,0)'); g3.fillStyle=rg; g3.fillRect(0,0,64,64); }
    const aoT=new THREE.CanvasTexture(aoC);
    buildings.forEach(b=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(b.x1-b.x0+2.4,b.z1-b.z0+2.4), new THREE.MeshBasicMaterial({map:aoT,transparent:true,depthWrite:false}));
      m.rotation.x=-Math.PI/2; m.position.set((b.x0+b.x1)/2,0.02,(b.z0+b.z1)/2); scene.add(m); });

    /* ---- SPAWNS ZONAIS (longe do início; grupos naturais; alguns rastejantes) ----
       Início do jogador: quarto da Casa da Família (8,22)-(19,30). Raio limpo ~14. */
    const SP=(x,z,o)=>zSpawns.push({x,z,...(o||{})});
    // cruzamento e rua leste (grupinho de 3 + espalhados)
    SP(45,34.5); SP(46.5,35.5); SP(47.5,34.2); SP(54,36); SP(62,34.5); SP(40,36.5);
    // rua sul (vertical)
    SP(34.5,46); SP(35.5,52); SP(34.5,60,{crawler:true}); SP(36,64);
    // arredores do mercado + dentro
    SP(9,53); SP(16,55); SP(20,49,{crawler:true}); SP(5,45); SP(12,44,{inside:true}); SP(17,46,{inside:true});
    // casas leste (2 dentro)
    SP(44,26,{inside:true}); SP(60,26,{inside:true}); SP(46,18); SP(56,14); SP(63,20); SP(50,30.5,{crawler:true});
    // casas sul
    SP(44,44,{inside:true}); SP(56,44); SP(61,55); SP(48,60); SP(28,58);
    // campos norte / oeste distante
    SP(28,8); SP(44,6); SP(6,8); SP(64,8);
    /* ---- DISTRITOS NOVOS (zonas com densidades próprias) ---- */
    // ESCOLA: a horda do pátio (o lugar mais perigoso da cidade)
    SP(14,62); SP(16,63.5); SP(18.5,61.5); SP(20,64); SP(22,62.5); SP(17,66); SP(24,65,{crawler:true});
    SP(14,74,{inside:true}); SP(24,78,{inside:true}); SP(11,80,{inside:true});
    // DELEGACIA: policiais mortos em serviço (2 presos nas celas!)
    SP(97.5,19.5,{inside:true}); SP(101.5,19.5,{inside:true}); SP(104,28,{inside:true}); SP(116,24); SP(113,30);
    // PRAÇA
    SP(75,13.5); SP(80,16); SP(73,18,{crawler:true});
    // POSTO
    SP(71,30); SP(74.5,33.5);
    // CLÍNICA (enfermaria caída)
    SP(99,45,{inside:true}); SP(105,49,{inside:true}); SP(101,39); SP(108,54);
    // AVENIDA SUL (espalhados + grupinho na barricada militar)
    SP(50,89.5); SP(58,90.5); SP(66,89); SP(80,90.2); SP(95,89.6); SP(104,90.5);
    SP(118,89); SP(119.5,90.4); SP(121,89.8); SP(117,91.2,{crawler:true});
    // BAR + OFICINA
    SP(46,96,{inside:true}); SP(63,97,{inside:true}); SP(61,95);
    // casas novas do sul
    SP(78,97,{inside:true}); SP(98,95.5); SP(110,97,{inside:true}); SP(90,100);
    // RUA DO CENTRO (vertical leste)
    SP(89.5,50); SP(90.5,62); SP(89,74,{crawler:true}); SP(90,14); SP(89.5,104); SP(90.5,116);
    // campos do sudeste
    SP(116,108); SP(76,116); SP(24,116); SP(120,66);
  }

  /* ================= COLISÃO / VISÃO ================= */
  function edgeBlocked(v, x,z){ const e=(v?EV:EH)[eIdx(x,z)]; return e===1||e===2||e===3||e===5; }
  function edgeBlocksSight(v,x,z){ const e=(v?EV:EH)[eIdx(x,z)]; return e===1||e===3; }
  function moveCircle(px,pz,nx,nz,r){
    let tx=nx;
    if(nx!==px){ const dir=nx>px?1:-1; const edge=dir>0? Math.floor(px+r)+1 : Math.floor(px-r);
      const target= dir>0? nx+r : nx-r;
      if((dir>0&&target>=edge)||(dir<0&&target<edge)){
        const zi=Math.floor(pz);
        let hit=edgeBlocked(true,edge<0?0:edge, zi);
        const cellX= dir>0? edge : edge-1;
        if(!hit && cellX>=0&&cellX<W && solid[cellX*W+zi]) hit=true;
        if(hit) tx= dir>0? edge-r-0.001 : edge+r+0.001;
      } }
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
  function lineOfSight(x0,z0,x1,z1){
    const dx=x1-x0, dz=z1-z0, dist=Math.hypot(dx,dz); if(dist<0.001) return true;
    const steps=Math.ceil(dist*3); let px=x0,pz=z0;
    for(let i=1;i<=steps;i++){
      const nx=x0+dx*i/steps, nz=z0+dz*i/steps;
      if(Math.floor(nx)!==Math.floor(px)){ const ex=Math.max(Math.floor(nx),Math.floor(px));
        if(edgeBlocksSight(true,ex,Math.floor(pz))) return false; }
      if(Math.floor(nz)!==Math.floor(pz)){ const ez=Math.max(Math.floor(nz),Math.floor(pz));
        if(edgeBlocksSight(false,Math.floor(nx),ez)) return false; }
      px=nx; pz=nz;
    }
    return true;
  }
  function toggleDoor(d){
    if(d.broken) return;
    d.open=!d.open;
    (d.edge==='V'?EV:EH)[eIdx(d.x,d.z)] = d.open?4:3;
    d.group.rotation.y = d.open? (d.edge==='V'? -1.45 : 1.45) : 0;
  }
  function breakDoor(d){
    d.broken=true; d.open=true;
    (d.edge==='V'?EV:EH)[eIdx(d.x,d.z)] = 4;
    d.group.rotation.y = d.edge==='V'? -1.7:1.7;
    d.group.rotation.x = 0.25; d.group.position.y=-0.12;
  }
  function smashWindow(w){
    w.state='smashed'; if(w.glass) w.glass.visible=false;
  }
  function barricade(w){ // w: janela OU porta — adiciona tábua visual
    const n=w.barr||0; if(n>=3) return false;
    w.barr=n+1; w.hp=(w.hp||24)+60;
    const isV = w.edge==='V';
    const plank=new THREE.Mesh(new THREE.BoxGeometry(isV?0.1:1.15, 0.2, isV?1.15:0.1), new THREE.MeshLambertMaterial({color:'#8a6a44'}));
    plank.position.set(isV? w.x-0.12 : w.x+0.5, 0.9+n*0.5, isV? w.z+0.5 : w.z-0.12);
    plank.rotation[isV?'x':'z']=(rng()-0.5)*0.16;
    scene.add(plank); (w.planks=w.planks||[]).push(plank);
    return true;
  }
  function unbarricadeVisual(w){ (w.planks||[]).forEach(p=>scene.remove(p)); w.planks=[]; }
  function doorAtEdge(v,x,z){ return doors.find(d=> (d.edge==='V')===v && d.x===x && d.z===z ); }
  function windowAtEdge(v,x,z){ return windows.find(w=> (w.edge==='V')===v && w.x===x && w.z===z ); }
  function buildingAt(x,z){ return buildings.find(b=>x>=b.x0&&x<b.x1&&z>=b.z0&&z<b.z1); }
  const state={};

  return { W, T, EV, EH, eIdx, build, moveCircle, lineOfSight, toggleDoor, breakDoor, smashWindow,
    barricade, unbarricadeVisual, doorAtEdge, windowAtEdge, buildingAt, mergeBoxes, state,
    doors, windows, containers, waterSources, beds, buildings, trees, lamps, zSpawns, ITEMS, LOOT, ground, solid, rng };
})();
