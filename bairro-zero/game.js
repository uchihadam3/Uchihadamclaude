/* ========================================================================
   BAIRRO ZERO v2 — sistemas completos estilo Project Zomboid:
   ferimentos/infecção Knox (7%/25%/100%) · empurrão/pisão/derrubada ·
   durabilidade · resistência/exaustão · peso/mochilas · comida perecível ·
   água/luz cortadas · sono · leitura · XP/habilidades · profissões ·
   zumbis com memória que quebram portas/janelas · barricadas · save
   ===================================================================== */
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const W=WORLD.W, ITEMS=WORLD.ITEMS;
const MIN_PER_SEC=1/0.35;                 // 1 min de jogo a cada 0.35s real (~8.4min/dia)
const WATER_OFF=3*1440+8*60;              // dia 3, 08:00
const POWER_OFF=5*1440+12*60;             // dia 5, 12:00
let renderer, scene, camera, sun, hemi, playerLight;
let player=null, zombies=[], bloodPool=[], corpseLoots=[];
let running=false, dead=false, sleeping=false, frame=0;
let gameMin=7*60+30;
const CAMDIR=new THREE.Vector3(1,1.46,1).normalize();   // câmera mais alta, ângulo PZ
const ZOOM=9;
const clock=new THREE.Clock();
const camPos=new THREE.Vector3();

/* ================= ÁUDIO ================= */
const AU=(()=>{ let ctx=null,master=null;
  function ens(){ if(ctx)return; try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
    master=ctx.createGain(); master.gain.value=0.8; master.connect(ctx.destination); }
  function t(f,dur,{type='sine',g=0.15,atk=0.01,slide=0}={}){ if(!ctx)return; const o=ctx.createOscillator(),gn=ctx.createGain();
    o.type=type; o.frequency.value=f; if(slide)o.frequency.linearRampToValueAtTime(Math.max(20,f+slide),ctx.currentTime+dur);
    gn.gain.value=0; o.connect(gn); gn.connect(master);
    gn.gain.setValueAtTime(0,ctx.currentTime); gn.gain.linearRampToValueAtTime(g,ctx.currentTime+atk);
    gn.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur); o.start(); o.stop(ctx.currentTime+dur+0.1); }
  function n(dur,{g=0.15,f=800,q=1}={}){ if(!ctx)return; const len=ctx.sampleRate*dur,b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
    const s=ctx.createBufferSource(); s.buffer=b; const fl=ctx.createBiquadFilter(); fl.type='bandpass'; fl.frequency.value=f; fl.Q.value=q;
    const gn=ctx.createGain(); gn.gain.value=0; s.connect(fl); fl.connect(gn); gn.connect(master);
    gn.gain.setValueAtTime(0,ctx.currentTime); gn.gain.linearRampToValueAtTime(g,ctx.currentTime+0.005);
    gn.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur); s.start(); }
  return { ens,
    swing(){ ens(); n(0.12,{g:0.06,f:1200}); },
    hit(){ ens(); n(0.09,{g:0.18,f:300,q:2}); t(90,0.12,{type:'sine',g:0.16}); },
    crit(){ ens(); n(0.12,{g:0.22,f:250,q:2}); t(70,0.18,{g:0.2}); },
    shove(){ ens(); n(0.1,{g:0.12,f:500}); },
    stomp(){ ens(); t(60,0.16,{g:0.26}); n(0.1,{g:0.16,f:220,q:2}); },
    bite(){ ens(); n(0.2,{g:0.18,f:500}); t(140,0.25,{type:'sawtooth',g:0.07,slide:-60}); },
    door(){ ens(); t(180,0.28,{type:'sawtooth',g:0.035,slide:40}); n(0.06,{g:0.05,f:900}); },
    doorBreak(){ ens(); n(0.3,{g:0.25,f:400,q:0.8}); t(90,0.3,{g:0.2,slide:-30}); },
    glass(){ ens(); n(0.25,{g:0.22,f:3200,q:0.5}); n(0.18,{g:0.12,f:5000,q:0.5}); },
    thump(){ ens(); t(75,0.14,{g:0.18}); n(0.07,{g:0.09,f:200,q:2}); },
    eat(){ ens(); n(0.1,{g:0.09,f:700}); setTimeout(()=>n(0.1,{g:0.07,f:600}),140); },
    drink(){ ens(); t(400,0.12,{g:0.05,slide:120}); setTimeout(()=>t(500,0.1,{g:0.04,slide:100}),140); },
    groan(vol){ ens(); t(85+Math.random()*55,0.9,{type:'sawtooth',g:0.05*vol,slide:-25}); n(0.7,{g:0.03*vol,f:350,q:0.6}); },
    growl(vol){ ens(); t(110+Math.random()*40,0.5,{type:'sawtooth',g:0.07*vol,slide:30}); },
    heart(){ ens(); t(55,0.1,{g:0.2}); setTimeout(()=>t(50,0.09,{g:0.15}),180); },
    loot(){ ens(); n(0.07,{g:0.05,f:1500}); },
    hammer(){ ens(); n(0.08,{g:0.14,f:900,q:2}); t(220,0.06,{g:0.08}); },
    lvl(){ ens(); [440,554,659].forEach((f,i)=>setTimeout(()=>t(f,0.25,{type:'triangle',g:0.08}),i*90)); },
    page(){ ens(); n(0.12,{g:0.05,f:2000,q:0.6}); },
    bird(){ ens(); const f=2200+Math.random()*1200; t(f,0.08,{g:0.02,slide:300}); setTimeout(()=>t(f*1.1,0.06,{g:0.015,slide:-200}),110); },
    cricket(){ ens(); for(let i=0;i<3;i++) setTimeout(()=>t(4200,0.03,{g:0.012}),i*70); },
  };
})();

/* ================= HELPERS DE ITEM ================= */
function mk(id){ return {id, born:gameMin, cond:ITEMS[id].cond||0}; }
function freshOf(it){ const def=ITEMS[it.id]; if(!def.perish) return 'ok';
  const age=(gameMin-(it.born||0))/60;
  if(age<def.perish) return 'fresco'; if(age<def.perish*1.8) return 'velho'; return 'podre'; }
function itemLabel(it){ const def=ITEMS[it.id]; let s=def.n;
  const f=freshOf(it); if(f==='velho')s+=' (velho)'; if(f==='podre')s+=' (PODRE)';
  if(def.cond){ const pc=Math.round(100*it.cond/def.cond); s+=` [${pc}%]`; }
  return s; }
function invWeight(){ let w=0; player.inv.forEach(it=>w+=ITEMS[it.id].kg||0);
  if(player.weapon)w+=ITEMS[player.weapon.id].kg; return w; }
function capacity(){ return 8+(player.bag?ITEMS[player.bag.id].cap:0); }
function hasOpener(){ return player.inv.some(it=>ITEMS[it.id].opener)||(player.weapon&&ITEMS[player.weapon.id].opener); }

/* ================= JOGADOR ================= */
const PROFS={
  bombeiro:{n:'Bombeiro',i:'🚒',d:'Forte e resistente. Aguenta mais golpes e corre mais tempo.',sk:{forca:2,aptidao:1},start:[]},
  enfermeira:{n:'Enfermeira',i:'💉',d:'Trata ferimentos muito melhor. Começa com kit médico.',sk:{},start:['band','band','analg'],heal:true},
  ladrao:{n:'Ladrão',i:'🥷',d:'Silencioso. Zumbis demoram a notar você. Começa com pé de cabra.',sk:{furtiv:3},start:['peca']},
};
function newPlayer(prof){
  const p={ x:16.5, z:27.5, facing:Math.PI, hp:100, hunger:12, thirst:20, fatigue:10, endurance:100,
    boredom:0, pain:0, panic:0, sick:0, knox:null, injuries:[], sneak:false, run:false,
    weapon:null, bag:null, inv:[], kills:0, prof, actT:0, act:null, speed:0,
    skills:{ forca:{lv:0,xp:0}, aptidao:{lv:0,xp:0}, corpo:{lv:0,xp:0}, furtiv:{lv:0,xp:0} } };
  const P=PROFS[prof];
  Object.entries(P.sk||{}).forEach(([k,v])=>p.skills[k].lv=v);
  (P.start||[]).forEach(id=>{ const it=mk(id); if(ITEMS[id].t==='weapon'&&!p.weapon)p.weapon=it; else p.inv.push(it); });
  return p;
}
function skill(k){ return player.skills[k].lv; }
function gainXP(k,amt){ const s=player.skills[k]; s.xp+=amt; const need=60+s.lv*50;
  if(s.xp>=need){ s.xp-=need; s.lv=Math.min(10,s.lv+1); AU.lvl();
    toast(`⬆ ${({forca:'Força',aptidao:'Aptidão',corpo:'Corpo a Corpo',furtiv:'Furtividade'})[k]} nível ${s.lv}!`); } }

/* ================= FERIMENTOS / INFECÇÃO KNOX ================= */
const PARTS=['mão','braço','antebraço','ombro','torso','pescoço','coxa','perna','pé'];
function addInjury(type){ // 'arranhao' | 'laceracao' | 'mordida'
  const part=PARTS[(Math.random()*PARTS.length)|0];
  const inj={part,type,bleeding:true,bandaged:false,t:gameMin};
  player.injuries.push(inj);
  const chance= type==='mordida'?1.0 : type==='laceracao'?0.25 : 0.07;
  if(!player.knox && Math.random()<chance){ player.knox={start:gameMin}; }
  player.pain=Math.min(100,player.pain+(type==='mordida'?38:type==='laceracao'?26:14));
  const nm={arranhao:'Arranhão',laceracao:'Laceração',mordida:'MORDIDA'}[type];
  toast(`🩸 ${nm} — ${part}!`);
  return inj;
}
function knoxStage(){ if(!player.knox) return 0; const h=(gameMin-player.knox.start)/60;
  if(h<9) return 0; if(h<26) return 1; if(h<50) return 2; return 3; }

/* ================= ZUMBIS ================= */
function spawnZombies(fromSave){
  zombies=[];
  const src=fromSave||WORLD.zSpawns.map(s=>({x:s.x,z:s.z,crawler:!!s.crawler,hp:60+WORLD.rng()*50}));
  src.forEach((s,i)=>{
    const pal=CHARS.randomPal(WORLD.rng,true);
    const rig=CHARS.build(pal);
    rig.group.position.set(s.x,0,s.z); scene.add(rig.group);
    const sprinter=WORLD.rng()<0.06;                       // raros "recém-virados" mais rápidos
    zombies.push({ x:s.x,z:s.z, hp:s.hp!=null?s.hp:60+WORLD.rng()*50, dead:s.hp<=0,
      crawler:!!s.crawler, downed:0, state:s.state||'wander', mem:null, dir:Math.random()*6.28,
      speed:(0.4+WORLD.rng()*0.28)*(s.crawler?0.55:1),
      chaseSpeed:(sprinter?2.2:1.05+WORLD.rng()*0.75)*(s.crawler?0.45:1),
      rig, attackCd:0, stagger:0, lunge:0, wanderT:2+WORLD.rng()*6, pause:WORLD.rng()<0.5,
      groanT:WORLD.rng()*10, thumpT:0, climb:0, climbTo:null,
      gait:WORLD.rng()*6.28, swaySeed:WORLD.rng()*6.28 });
    if(s.hp<=0){ zombies[zombies.length-1].dead=true; }
  });
}
function emitNoise(x,z,r){
  const rr=r*(1-skill('furtiv')*0.06);
  zombies.forEach(zb=>{ if(zb.dead) return;
    const d=Math.hypot(zb.x-x,zb.z-z);
    if(d<rr && zb.state!=='chase'){ zb.state='investigate'; zb.mem={x:x+(Math.random()-0.5)*2,z:z+(Math.random()-0.5)*2}; } });
}
function edgeAhead(zb,vx,vz){ // que aresta está bloqueando o caminho?
  const nx=zb.x+Math.sign(vx)*0.42, nz=zb.z+Math.sign(vz)*0.42;
  if(Math.floor(nx)!==Math.floor(zb.x)){ const ex=Math.max(Math.floor(nx),Math.floor(zb.x));
    const v=WORLD.EV[WORLD.eIdx(ex,Math.floor(zb.z))]; if(v===1||v===2||v===3) return {v:true,x:ex,z:Math.floor(zb.z),kind:v}; }
  if(Math.floor(nz)!==Math.floor(zb.z)){ const ez=Math.max(Math.floor(nz),Math.floor(zb.z));
    const h=WORLD.EH[WORLD.eIdx(Math.floor(zb.x),ez)]; if(h===1||h===2||h===3) return {v:false,x:Math.floor(zb.x),z:ez,kind:h}; }
  return null;
}
function updateZombie(zb,dt,idx){
  if(zb.dead) return;
  const p=player;
  zb.attackCd=Math.max(0,zb.attackCd-dt); zb.stagger=Math.max(0,zb.stagger-dt);
  if(zb.downed>0){ zb.downed-=dt; CHARS.pose(zb.rig,dt,{fallen:1,zombie:true,speed:0}); zb.rig.group.position.set(zb.x,0,zb.z); return; }
  zb.groanT-=dt; if(zb.groanT<0){ zb.groanT=6+Math.random()*10; const d=Math.hypot(p.x-zb.x,p.z-zb.z);
    if(d<14) (zb.state==='chase'?AU.growl:AU.groan)(Math.max(0.1,1-d/14)); }
  // escalada de janela
  if(zb.climb>0){ zb.climb-=dt; CHARS.pose(zb.rig,dt,{act:'climb',actP:1-zb.climb/1.3,zombie:true,speed:0});
    if(zb.climb<=0&&zb.climbTo){ zb.x=zb.climbTo.x; zb.z=zb.climbTo.z; zb.climbTo=null; }
    zb.rig.group.position.set(zb.x,0,zb.z); return; }
  // percepção
  if(((frame+idx)%10)===0 && !dead && !sleeping){
    const d=Math.hypot(p.x-zb.x,p.z-zb.z);
    const ang=Math.atan2(p.x-zb.x,p.z-zb.z);
    let dAng=Math.abs(ang-zb.dir); if(dAng>Math.PI)dAng=6.283-dAng;
    const nightPen=isNight()?0.5:1;
    const sneakPen=p.sneak?0.55:1;
    const seeDist=(p.run?11:8.5)*nightPen*sneakPen*(1-skill('furtiv')*0.04);
    if(d<seeDist && (dAng<1.2||d<2.0) && WORLD.lineOfSight(zb.x,zb.z,p.x,p.z)){
      zb.state='chase'; zb.mem={x:p.x,z:p.z}; zb.memT=8;
    } else if(zb.state==='chase'){
      zb.memT=(zb.memT||0)-dt*10;
      if(zb.memT<=0){ zb.state='investigate'; }
    }
  }
  if(zb.stagger>0){ zb.lunge=0; zb.rig.group.position.set(zb.x,0,zb.z); return; }
  // AGARRÃO (aviso): o zumbi arma o bote — dá tempo de reagir (empurrar/recuar)
  if(zb.lunge>0&&!dead){
    zb.lunge-=dt;
    turnToward(zb,Math.atan2(p.x-zb.x,p.z-zb.z),6.5,dt);
    const drift=zb.crawler?0.9:0.55;                     // avança devagar durante o bote
    const [lx,lz]=WORLD.moveCircle(zb.x,zb.z,zb.x+Math.sin(zb.dir)*drift*dt,zb.z+Math.cos(zb.dir)*drift*dt,0.3);
    zb.x=lx; zb.z=lz;
    CHARS.pose(zb.rig,dt,{act:'lunge',actP:1-zb.lunge/zb.lungeDur,zombie:true,speed:0,crawler:zb.crawler});
    zb.rig.group.position.set(zb.x,0,zb.z); zb.rig.group.rotation.y=zb.dir;
    if(zb.lunge<=0){
      zb.attackCd=1.7+Math.random()*0.7;
      const d2=Math.hypot(p.x-zb.x,p.z-zb.z);
      if(d2<1.25) zombieAttack(zb);                      // só acerta se você ficou perto
    }
    return;
  }
  let vx=0,vz=0,sp=0;
  const chasing=zb.state==='chase';
  if(chasing&&!dead){
    const d=Math.hypot(p.x-zb.x,p.z-zb.z);
    zb.mem={x:p.x,z:p.z};
    if(d<(zb.crawler?1.5:1.1)){
      if(zb.attackCd<=0){ zb.lungeDur=zb.crawler?0.55:0.75; zb.lunge=zb.lungeDur; AU.growl(0.8); }
    }
    else { sp=zb.chaseSpeed;
      // rumo com limite de giro + balanço lateral (cambaleio de perseguição)
      const want=Math.atan2(p.x-zb.x,p.z-zb.z)+Math.sin(zb.gait*0.6+zb.swaySeed)*0.16;
      turnToward(zb,want,3.6,dt);
      vx=Math.sin(zb.dir)*sp; vz=Math.cos(zb.dir)*sp; }
  } else if(zb.state==='breach'){
    const tgt=zb.breach;
    const done=!tgt || tgt.broken || tgt.open || (tgt.state==='smashed'&&tgt.barr<=0);
    if(done){
      if(tgt&&tgt.state==='smashed'){ // janela aberta → escala
        const isV=tgt.edge==='V';
        zb.climb=1.3; zb.climbTo={x:isV?(zb.x<tgt.x?tgt.x+0.45:tgt.x-0.45):zb.x, z:isV?zb.z:(zb.z<tgt.z?tgt.z+0.45:tgt.z-0.45)};
      }
      zb.state='chase'; zb.memT=7; zb.breach=null;
    } else if(Math.hypot(player.x-zb.x,player.z-zb.z)>16){ zb.state='wander'; zb.breach=null; }
    else {
      const cx=tgt.edge==='V'?tgt.x:tgt.x+0.5, cz=tgt.edge==='V'?tgt.z+0.5:tgt.z;
      zb.dir=Math.atan2(cx-zb.x,cz-zb.z);
      zb.thumpT-=dt;
      if(zb.thumpT<=0){ zb.thumpT=1.05+Math.random()*0.4;
        AU.thump(); emitNoiseSilent(zb.x,zb.z,7);
        CHARS.pose(zb.rig,0.2,{act:'shove',actP:0.3,zombie:true,speed:0});
        tgt.hp-=6+Math.random()*6;
        if(tgt.hp<=0){
          if(tgt.edge&&tgt.planks!==undefined){ // janela
            if(tgt.barr>0){ WORLD.unbarricadeVisual(tgt); tgt.barr=0; tgt.hp=10; toast('🔨 As tábuas da barricada cederam!'); }
            else { WORLD.smashWindow(tgt); AU.glass(); toast('🪟 Uma janela foi quebrada!'); }
          } else { WORLD.breakDoor(tgt); AU.doorBreak(); toast('💥 Uma porta foi arrombada!'); }
        }
      }
    }
  } else if(zb.state==='investigate'&&zb.mem){
    const d=Math.hypot(zb.mem.x-zb.x,zb.mem.z-zb.z);
    if(d<0.8){ if(zb.mem.ref){ zb.state='breach'; zb.breach=zb.mem.ref; }
      else { zb.state='mill'; zb.millT=3+Math.random()*4; }   // chegou: fica rondando o barulho
      zb.mem=null; }
    else { sp=zb.speed*1.5; turnToward(zb,Math.atan2(zb.mem.x-zb.x,zb.mem.z-zb.z),2.6,dt);
      vx=Math.sin(zb.dir)*sp; vz=Math.cos(zb.dir)*sp; }
  } else if(zb.state==='mill'){                                // ronda o local, farejando
    zb.millT-=dt;
    if(zb.millT<=0){ zb.state='wander'; zb.wanderT=1; }
    else { zb.millSpin=zb.millSpin||(Math.random()<0.5?-1:1);
      zb.dir+=zb.millSpin*0.55*dt;
      if(Math.sin(zb.millT*2.1)>0.2){ sp=zb.speed*0.5; vx=Math.sin(zb.dir)*sp; vz=Math.cos(zb.dir)*sp; } }
  } else {
    zb.wanderT-=dt;
    if(zb.wanderT<0){ zb.wanderT=3.5+Math.random()*7; zb.wantDir=Math.random()*6.283; zb.pause=Math.random()<0.6; zb.idleSpin=Math.random()<0.3; }
    if(zb.pause){ if(zb.idleSpin) zb.dir+=0.22*dt*(zb.swaySeed>3?-1:1); }  // parado, girando devagar
    else { turnToward(zb,zb.wantDir||zb.dir,1.3,dt); sp=zb.speed; vx=Math.sin(zb.dir)*sp; vz=Math.cos(zb.dir)*sp; }
  }
  if(sp>0){
    // CAMBALEIO: o zumbi avança em arrancos (lurch), não em velocidade constante
    zb.gait+=dt*sp*2.4;
    const lurch=zb.crawler? (0.35+0.65*Math.max(0,Math.sin(zb.gait))) : (0.58+0.42*Math.abs(Math.sin(zb.gait)));
    vx*=lurch; vz*=lurch;
    zombies.forEach(o=>{ if(o===zb||o.dead)return; const dx=zb.x-o.x,dz=zb.z-o.z,d2=dx*dx+dz*dz;
      if(d2<0.36&&d2>0.0001){ const d=Math.sqrt(d2); vx+=dx/d*1.2; vz+=dz/d*1.2; } });
    const ox=zb.x, oz=zb.z;
    const [nx,nz]=WORLD.moveCircle(zb.x,zb.z,zb.x+vx*dt,zb.z+vz*dt,0.3);
    zb.x=nx; zb.z=nz;
    // perseguindo e batendo em obstáculo → decide: arrombar, escalar ou contornar
    if(chasing && Math.abs(nx-ox)<0.05*dt*60 && Math.abs(nz-oz)<0.05*dt*60 && zb.climb<=0){
      zb.blockT=(zb.blockT||0)+dt;
      if(zb.blockT>0.5){
        zb.blockT=0;
        const e=edgeAhead(zb,Math.sin(zb.dir),Math.cos(zb.dir));
        if(e){
          const door=WORLD.doorAtEdge(e.v,e.x,e.z), win=WORLD.windowAtEdge(e.v,e.x,e.z);
          const tgt=door||win;
          if(tgt&&!tgt.broken){
            if(win&&win.state==='smashed'&&win.barr<=0){ // janela já quebrada → escala
              zb.climb=1.3; zb.climbTo={x:e.v?(zb.x<e.x?e.x+0.45:e.x-0.45):zb.x, z:e.v?zb.z:(zb.z<e.z?e.z+0.45:e.z-0.45)};
            } else { zb.state='breach'; zb.breach=tgt; }
          } else { // parede cega: procura a abertura mais próxima
            const op=findOpening(zb.x,zb.z,7);
            if(op){ zb.state='investigate'; zb.mem=op; }
            else { zb.dir+=2+Math.random()*2; }
          }
        }
      }
    } else zb.blockT=0;
  }
  CHARS.pose(zb.rig,dt,{speed:sp>0?(chasing?1.2:0.5):0, zombie:true, chasing, crawler:zb.crawler});
  zb.rig.group.position.set(zb.x,0,zb.z);
  zb.rig.group.rotation.y=zb.dir;
}
function turnToward(zb,want,rate,dt){ // gira o rumo com limite de velocidade angular
  let d=want-zb.dir;
  while(d>Math.PI)d-=6.28318; while(d<-Math.PI)d+=6.28318;
  const m=rate*dt; zb.dir+= Math.abs(d)<m? d : Math.sign(d)*m;
}
function emitNoiseSilent(x,z,r){ // barulho que não vem do jogador (sem furtividade)
  zombies.forEach(zb=>{ if(zb.dead)return; const d=Math.hypot(zb.x-x,zb.z-z);
    if(d<r&&zb.state==='wander'){ zb.state='investigate'; zb.mem={x,z}; } });
}
function findOpening(x,z,maxD){ // porta/janela mais próxima → ponto do lado de fora + referência
  let best=null,bd=maxD;
  const cand=(ex,ez,isV,ref)=>{ const cx=isV?ex:ex+0.5, cz=isV?ez+0.5:ez;
    const d=Math.hypot(cx-x,cz-z); if(d<bd){ bd=d;
      const ox2=isV? (x<ex? ex-0.6:ex+0.6) : cx, oz2=isV? cz : (z<ez? ez-0.6:ez+0.6);
      best={x:ox2,z:oz2,ref}; } };
  WORLD.doors.forEach(d=>{ if(!d.broken) cand(d.x,d.z,d.edge==='V',d); });
  WORLD.windows.forEach(w=>{ if(!(w.state==='smashed'&&w.barr>0)) cand(w.x,w.z,w.edge==='V',w); });
  return best;
}
function zombieAttack(zb){
  if(dead) return;
  AU.bite();
  const r=Math.random();
  const dmg=7+Math.random()*7;
  player.hp=Math.max(0,player.hp-dmg);
  if(r<0.62) addInjury('arranhao'); else if(r<0.9) addInjury('laceracao'); else addInjury('mordida');
  redFlashT=0.5; blood(player.x,1.1,player.z); splat(player.x,player.z,0.5);
  if(player.hp<=0) die('Devorado pelos mortos.');
}
function damageZombie(zb,dmg,fromX,fromZ,knockCh,critB){
  const crit=Math.random()<0.08+skill('corpo')*0.03+(critB||0);
  if(crit){ dmg*=1.8; AU.crit(); } else AU.hit();
  camShake=Math.min(0.22,camShake+(crit?0.12:0.07));
  zb.hp-=dmg; zb.stagger=0.4;
  const kb=0.5, dx=zb.x-fromX, dz=zb.z-fromZ, d=Math.hypot(dx,dz)||1;
  const [nx,nz]=WORLD.moveCircle(zb.x,zb.z,zb.x+dx/d*kb,zb.z+dz/d*kb,0.3); zb.x=nx; zb.z=nz;
  if(!zb.crawler && Math.random()<(knockCh||0)+skill('forca')*0.04){ zb.downed=2.2+Math.random()*1.6; }
  blood(zb.x,1.1,zb.z); splat(zb.x,zb.z,0.45);
  gainXP('forca',3); gainXP('corpo',5);
  if(zb.hp<=0) killZombie(zb);
  else if(zb.state!=='chase'){ zb.state='chase'; zb.mem={x:player.x,z:player.z}; }
}
function killZombie(zb){
  zb.dead=true; player.kills++; $('#kills').textContent=player.kills;
  splat(zb.x,zb.z,1.0);
  CHARS.pose(zb.rig,1,{dead:true,zombie:true,speed:0});
  zb.rig.group.rotation.x=0;
  corpseLoots.push({x:zb.x,z:zb.z,name:'Corpo',loot:WORLD.LOOT['Corpo'](),opened:false});
}

/* ================= SANGUE ================= */
function initBlood(){ const m=new THREE.MeshBasicMaterial({color:'#8a1a12'});
  for(let i=0;i<24;i++){ const p=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.09,0.09),m);
    p.visible=false; scene.add(p); bloodPool.push({m:p,vx:0,vy:0,vz:0,life:0}); } }
let bloodIdx=0;
function blood(x,y,z){ for(let k=0;k<5;k++){ const b=bloodPool[bloodIdx++%bloodPool.length];
  b.m.visible=true; b.m.position.set(x,y,z);
  b.vx=(Math.random()-0.5)*3; b.vy=1+Math.random()*2.5; b.vz=(Math.random()-0.5)*3; b.life=0.9; } }
function updateBlood(dt){ bloodPool.forEach(b=>{ if(b.life<=0)return; b.life-=dt;
  b.vy-=9*dt; b.m.position.x+=b.vx*dt; b.m.position.y=Math.max(0.04,b.m.position.y+b.vy*dt); b.m.position.z+=b.vz*dt;
  if(b.life<=0) b.m.visible=false; }); }
function splat(x,z,s){ // mancha permanente no chão
  const gc=WORLD.state.groundCanvas; if(!gc) return; const g=gc.getContext('2d');
  const px=x*16, py=z*16;
  g.fillStyle=`rgba(${100+Math.random()*30|0},${14},${10},0.55)`;
  for(let i=0;i<6;i++){ const a=Math.random()*6.28, r=Math.random()*8*s;
    g.beginPath(); g.arc(px+Math.cos(a)*r, py+Math.sin(a)*r, 1.4+Math.random()*2.6*s, 0, 6.29); g.fill(); }
  WORLD.state.groundTex.needsUpdate=true;
}

/* ================= MORTE ================= */
let redFlashT=0;
function die(reason){
  dead=true;
  CHARS.pose(player.rig,1,{dead:true,speed:0});
  setTimeout(()=>{
    $('#deathDays').textContent=Math.floor(gameMin/1440)+1;
    $('#deathKills').textContent=player.kills;
    $('#deathCause').textContent=reason||'';
    $('#death').classList.add('on');
    localStorage.removeItem('bz_save');
  },1300);
}

/* ================= DIA / NOITE / UTILIDADES ================= */
function isNight(){ const h=(gameMin/60)%24; return h<6||h>=19.5; }
function waterOn(){ return gameMin<WATER_OFF; }
function powerOn(){ return gameMin<POWER_OFF; }
let announced={w:false,p:false};
function updateDayNight(dt){
  gameMin+=dt*MIN_PER_SEC;
  const h=(gameMin/60)%24;
  if(!announced.w&&!waterOn()){ announced.w=true; toast('🚱 A ÁGUA FOI CORTADA. Torneiras não funcionam mais.',4000); }
  if(!announced.p&&!powerOn()){ announced.p=true; toast('🔌 A ENERGIA ACABOU. Geladeiras e postes morreram.',4000); }
  const dayT=Math.max(0,Math.min(1,(h-6)/12));
  const sunUp=h>=6&&h<18;
  const elev=Math.sin(dayT*Math.PI);
  sun.intensity=sunUp? 0.35+elev*0.75 : 0;
  const warm=Math.min(1,Math.abs(dayT-0.5)*2.6);
  sun.color.setRGB(1, 0.95-warm*0.25, 0.85-warm*0.35);
  const sa=(dayT-0.5)*2.2;
  sun.position.set(player.x+Math.sin(sa)*20, 14+elev*16, player.z+8+Math.cos(sa)*6);
  sun.target.position.set(player.x,0,player.z); sun.target.updateMatrixWorld();
  let amb, bg;
  if(sunUp){ amb=0.5+elev*0.22; hemi.color.setHex(0xb4c8d8); hemi.groundColor.setHex(0x5e5e50); bg=new THREE.Color().setHSL(0.56,0.22,0.11+elev*0.045); }
  else { amb=0.15; hemi.color.setHex(0x24304a); hemi.groundColor.setHex(0x141820); bg=new THREE.Color('#05070d'); }
  const dusk=(h>=18&&h<19.5)||(h>=5&&h<6);
  if(dusk){ amb=0.3; hemi.color.setHex(0x6a5a68); bg=new THREE.Color('#1a1220'); }
  hemi.intensity=amb;
  renderer.setClearColor(bg);
  const night=isNight(), pw=powerOn();
  WORLD.lamps.forEach(l=>{ l.light.intensity=(night&&pw)?1.1:0; l.head.material.emissive.setHex((night&&pw)?0xffc060:0x000000); });
  playerLight.intensity=night?0.9:0;
  playerLight.position.set(player.x,2.2,player.z);
  const hh=String(Math.floor(h)).padStart(2,'0'), mm=String(Math.floor(gameMin%60)).padStart(2,'0');
  $('#clock').textContent=`Dia ${Math.floor(gameMin/1440)+1} · ${hh}:${mm}`;
  // ambiente
  ambT-=dt; if(ambT<0){ ambT=3+Math.random()*5; if(night)AU.cricket(); else if(Math.random()<0.6)AU.bird(); }
  // geladeiras conservam (empurra o born dos itens)
  fridgeT-=dt; if(fridgeT<0){ fridgeT=3;
    if(pw) WORLD.containers.forEach(c=>{ if(c.name==='Geladeira'||c.name==='Freezer')
      c.loot.forEach(it=>{ if(ITEMS[it.id].perish) it.born+=3*MIN_PER_SEC*0.8; }); }); }
}
let ambT=2, fridgeT=3;

/* ================= MOODLES ================= */
const MOODLE_DEFS=[
  {icon:'🍗', name:'Fome', get:()=>player.hunger},
  {icon:'💧', name:'Sede', get:()=>player.thirst},
  {icon:'😪', name:'Sono', get:()=>player.fatigue},
  {icon:'🫁', name:'Exausto', get:()=>100-player.endurance},
  {icon:'💢', name:'Dor', get:()=>player.pain},
  {icon:'😱', name:'Pânico', get:()=>player.panic},
  {icon:'🩸', name:'Sangrando', get:()=>player.injuries.some(i=>i.bleeding&&!i.bandaged)?80:0},
  {icon:'🎒', name:'Sobrecarga', get:()=>{ const r=invWeight()/capacity(); return r>1.4?95:r>1.15?80:r>1?55:0; }},
  {icon:'🤢', name:'Enjoado', get:()=>Math.max(player.sick, knoxStage()>=1?60:0)},
  {icon:'🤒', name:'Febril', get:()=>knoxStage()>=2?(knoxStage()>=3?95:70):0},
  {icon:'🥱', name:'Tédio', get:()=>player.boredom},
];
let moodleCache='';
function updateMoodles(){
  let html='';
  MOODLE_DEFS.forEach(m=>{ const v=m.get(); if(v<25) return;
    const lv=v<50?1:v<75?2:v<90?3:4;
    html+=`<div class="moodle l${lv}"><span>${m.icon}</span><i>${m.name}</i></div>`;
  });
  if(html!==moodleCache){ moodleCache=html; $('#moodles').innerHTML=html; }
}

/* ================= SOBREVIVÊNCIA ================= */
let heartT=0;
function updateSurvival(dt){
  const p=player;
  p.hunger=Math.min(100,p.hunger+dt*0.10);
  p.thirst=Math.min(100,p.thirst+dt*0.14);
  p.fatigue=Math.min(100,p.fatigue+dt*0.055);
  p.pain=Math.max(0,p.pain-dt*0.4);
  p.sick=Math.max(0,p.sick-dt*0.25);
  const inside=!!WORLD.buildingAt(p.x,p.z);
  p.boredom=Math.max(0,Math.min(100,p.boredom+dt*(inside?0.5:-1.2)));
  // resistência regenera parado
  const still=p.speed<0.1;
  p.endurance=Math.min(100,p.endurance+dt*(still?9:4)*(1+skill('aptidao')*0.08));
  // sangramento
  const bleedN=p.injuries.filter(i=>i.bleeding&&!i.bandaged).length;
  if(bleedN){ p.hp=Math.max(0,p.hp-dt*0.5*bleedN); if(p.hp<=0&&!dead){ die('Sangrou até a morte.'); return; } }
  // fome/sede críticas
  if(p.hunger>=92||p.thirst>=92){ p.hp=Math.max(0,p.hp-dt*0.5); if(p.hp<=0&&!dead){ die(p.thirst>=92?'Morreu de sede.':'Morreu de fome.'); return; } }
  // infecção Knox: 7%/25%/100% — febre e morte em ~2-3 dias
  const ks=knoxStage();
  if(ks>=2){ p.hp=Math.max(0,p.hp-dt*(ks>=3?1.1:0.28));
    if(p.hp<=0&&!dead){ die('Sucumbiu à infecção Knox. Em breve, você caminhará também.'); return; } }
  // enjoo por comida podre
  if(p.sick>=75){ p.hp=Math.max(0,p.hp-dt*0.2); if(p.hp<=0&&!dead){ die('Intoxicação alimentar.'); return; } }
  // recuperação lenta se bem alimentado e são
  if(p.hp<100&&p.hunger<50&&p.thirst<50&&!bleedN&&ks===0) p.hp=Math.min(100,p.hp+dt*0.35);
  // pânico
  let near=0; zombies.forEach(z=>{ if(!z.dead&&Math.hypot(z.x-p.x,z.z-p.z)<7) near++; });
  const tgt=Math.min(100,near*24);
  p.panic+=(tgt-p.panic)*Math.min(1,dt*1.4);
  if(p.panic>=75){ heartT-=dt; if(heartT<0){ heartT=0.9; AU.heart(); } }
  $('#hpFill').style.width=p.hp+'%';
  $('#hpFill').style.background=p.hp>50?'#5a9a4a':p.hp>25?'#c8a24a':'#c04a3a';
  $('#endFill').style.width=p.endurance+'%';
  const wr=invWeight()/capacity();
  const wEl=$('#weight'); wEl.textContent=invWeight().toFixed(1)+'/'+capacity()+'kg';
  wEl.style.color=wr>1?'#ff6a5a':wr>0.8?'#c8a24a':'#9a968a';
}

/* ================= INPUT ================= */
const keys={};
let joy={on:false,dx:0,dz:0};
function setupInput(){
  addEventListener('keydown',e=>{ keys[e.key.toLowerCase()]=true;
    const k=e.key.toLowerCase();
    if(k==='e') doInteract();
    if(k==='i') toggleInv();
    if(k==='c'){ player.sneak=!player.sneak; $('#btnSneak').classList.toggle('on',player.sneak); }
    if(k==='q') doShove();
    if(k===' '||k==='j'){ doAttack(); e.preventDefault(); } });
  addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
  const zone=$('#joyZone'), stick=$('#joyStick'), base=$('#joyBase');
  let pid=null, cx=0, cy=0;
  zone.addEventListener('pointerdown',e=>{ pid=e.pointerId; cx=e.clientX; cy=e.clientY;
    base.style.left=cx+'px'; base.style.top=cy+'px'; base.classList.add('on'); zone.setPointerCapture(pid); });
  zone.addEventListener('pointermove',e=>{ if(e.pointerId!==pid)return;
    let dx=e.clientX-cx, dy=e.clientY-cy; const d=Math.hypot(dx,dy), max=48;
    if(d>max){ // o joystick "segue" o dedo se arrastar longe (re-ancora) — controle contínuo
      const ex=dx-dx*max/d, ey=dy-dy*max/d; cx+=ex; cy+=ey;
      base.style.left=cx+'px'; base.style.top=cy+'px';
      dx*=max/d; dy*=max/d; }
    stick.style.transform=`translate(${dx}px,${dy}px)`;
    joy.on=d>5; joy.dx=dx/max; joy.dz=dy/max; });
  const end=e=>{ if(e.pointerId!==pid)return; pid=null; joy.on=false; base.classList.remove('on'); stick.style.transform=''; };
  zone.addEventListener('pointerup',end); zone.addEventListener('pointercancel',end);
  $('#btnAtk').addEventListener('pointerdown',e=>{ e.preventDefault(); doAttack(); });
  $('#btnShove').addEventListener('pointerdown',e=>{ e.preventDefault(); doShove(); });
  $('#btnRun').addEventListener('pointerdown',e=>{ e.preventDefault(); player.run=!player.run; player.sneak=false;
    $('#btnRun').classList.toggle('on',player.run); $('#btnSneak').classList.remove('on'); });
  $('#btnSneak').addEventListener('pointerdown',e=>{ e.preventDefault(); player.sneak=!player.sneak; player.run=false;
    $('#btnSneak').classList.toggle('on',player.sneak); $('#btnRun').classList.remove('on'); });
  $('#btnUse').addEventListener('pointerdown',e=>{ e.preventDefault(); doInteract(); });
  $('#btnInv').addEventListener('pointerdown',e=>{ e.preventDefault(); toggleInv(); });
  $('#btnHealth').addEventListener('pointerdown',e=>{ e.preventDefault(); openHealth(); });
  $('#btnSkills').addEventListener('pointerdown',e=>{ e.preventDefault(); openSkills(); });
}
let noiseT=0;
function movePlayer(dt){
  if(dead||sleeping) return;
  const p=player;
  p.actT=Math.max(0,p.actT-dt);
  if(p.actT>0&&(p.act==='climb'||p.act==='eat')){ // ação travando movimento
    CHARS.pose(p.rig,dt,{act:p.act,actP:1-p.actT/p.actDur,speed:0});
    if(p.act==='climb'&&p.actT<=0&&p.climbTo){ p.x=p.climbTo.x; p.z=p.climbTo.z; p.climbTo=null; }
    p.rig.group.position.set(p.x,0,p.z); p.rig.group.rotation.y=p.facing; return;
  }
  let dx=0,dz=0;
  if(keys['w']||keys['arrowup'])dz-=1; if(keys['s']||keys['arrowdown'])dz+=1;
  if(keys['a']||keys['arrowleft'])dx-=1; if(keys['d']||keys['arrowright'])dx+=1;
  if(joy.on){ dx=joy.dx; dz=joy.dz; }
  const wr=invWeight()/capacity();
  const exhausted=p.endurance<18;
  const run=(keys['shift']||p.run)&&!exhausted&&!p.sneak;
  const mag=Math.hypot(dx,dz);
  if(mag>0.06){
    // TELA → MUNDO ISO (câmera em +x,+z): direita da tela = (+x,-z) · cima = (-x,-z)
    const s=Math.min(1,mag)/(mag||1); dx*=s; dz*=s;
    const IS=0.70710678;
    let sp=(run?4.9:p.sneak?1.7:2.9);
    if(p.pain>70)sp*=0.75; if(wr>1)sp*=Math.max(0.5,1-(wr-1)*0.8); if(exhausted)sp*=0.8;
    if(p.fatigue>85)sp*=0.85;
    const vx=(dx+dz)*IS*sp, vz=(dz-dx)*IS*sp;
    const [nx,nz]=WORLD.moveCircle(p.x,p.z,p.x+vx*dt,p.z+vz*dt,0.32);
    p.x=nx; p.z=nz;
    p.facing=Math.atan2(vx,vz);
    p.speed=sp*Math.hypot(dx,dz);
    if(run){ p.endurance=Math.max(0,p.endurance-dt*7*(1-skill('aptidao')*0.06)); gainXP('aptidao',dt*2);
      noiseT-=dt; if(noiseT<0){ noiseT=0.5; emitNoise(p.x,p.z,9); } }
    else if(p.sneak){ gainXP('furtiv',dt*1.5); noiseT-=dt; if(noiseT<0){ noiseT=1.0; emitNoise(p.x,p.z,1.2); } }
    else { noiseT-=dt; if(noiseT<0){ noiseT=0.7; emitNoise(p.x,p.z,3.2); } }
  } else p.speed=0;
  CHARS.pose(p.rig,dt,{speed:p.speed>0?(run?1.5:p.sneak?0.5:1):0, sneak:p.sneak,
    act:p.actT>0?p.act:null, actP:p.actT>0?1-p.actT/p.actDur:0});
  p.rig.group.position.set(p.x,0,p.z);
  // giro suave e rápido (arco mais curto) — preciso sem "pipocar"
  { let d=p.facing-p.rig.group.rotation.y;
    while(d>Math.PI)d-=6.28318; while(d<-Math.PI)d+=6.28318;
    const m=16*dt; p.rig.group.rotation.y+= Math.abs(d)<m? d : Math.sign(d)*m; }
}
function playerAct(act,dur){ player.act=act; player.actT=dur; player.actDur=dur; }

/* ================= COMBATE ================= */
function nearestDowned(){ let best=null,bd=1.3;
  zombies.forEach(zb=>{ if(zb.dead||zb.downed<=0)return; const d=Math.hypot(zb.x-player.x,zb.z-player.z);
    if(d<bd){ bd=d; best=zb; } }); return best; }
function doAttack(){
  if(dead||sleeping||player.attackCd>0) return;
  const p=player;
  const downed=nearestDowned();
  if(downed){ // PISÃO
    p.attackCd=0.7; AU.stomp(); playerAct('stomp',0.4);
    p.endurance=Math.max(0,p.endurance-5);
    emitNoise(p.x,p.z,5);
    damageZombie(downed, 30+skill('forca')*4+Math.random()*14, p.x, p.z, 0);
    return;
  }
  const wep=p.weapon? ITEMS[p.weapon.id]:null;
  const stab=wep&&wep.stab;
  p.attackCd=(wep? wep.spd:0.5)*(p.endurance<18?1.4:1);
  AU.swing(); playerAct(stab?'stab':'swing',stab?0.26:0.34);
  // MIRA ASSISTIDA: encara automaticamente o zumbi mais próximo à sua frente
  { let aimA=null,aimD=2.3;
    zombies.forEach(zb=>{ if(zb.dead)return; const d=Math.hypot(zb.x-p.x,zb.z-p.z);
      if(d>aimD)return; const a=Math.atan2(zb.x-p.x,zb.z-p.z);
      let dA=Math.abs(a-p.facing); if(dA>Math.PI)dA=6.28318-dA;
      if(dA<1.7){ aimD=d; aimA=a; } });
    if(aimA!=null){ p.facing=aimA; p.rig.group.rotation.y=aimA; } }
  // passo curto pra frente — peso do golpe
  { const [sx,sz]=WORLD.moveCircle(p.x,p.z,p.x+Math.sin(p.facing)*0.13,p.z+Math.cos(p.facing)*0.13,0.32);
    p.x=sx; p.z=sz; }
  p.endurance=Math.max(0,p.endurance-(wep? (stab?2.5:4+wep.kg*2) : 3)*(1-skill('aptidao')*0.05));
  emitNoise(p.x,p.z,wep?(stab?4:10):6);
  const exhausted=p.endurance<18;
  let hit=false;
  if(stab){ // FACA: estocada rápida num único alvo à frente (alta chance de crítico)
    let best=null,bd=1.45;
    zombies.forEach(zb=>{ if(zb.dead)return;
      const d=Math.hypot(zb.x-p.x,zb.z-p.z); if(d>bd)return;
      const a=Math.atan2(zb.x-p.x,zb.z-p.z);
      let dA=Math.abs(a-p.facing); if(dA>Math.PI)dA=6.283-dA;
      if(dA<0.8){ bd=d; best=zb; } });
    if(best){ let dmg=wep.dmg[0]+Math.random()*(wep.dmg[1]-wep.dmg[0]);
      dmg*=(1+skill('forca')*0.06); if(exhausted)dmg*=0.55;
      damageZombie(best,dmg,p.x,p.z,0.02,0.22); hit=true; }
  } else zombies.forEach(zb=>{ if(zb.dead)return;
    const d=Math.hypot(zb.x-p.x,zb.z-p.z); if(d>1.8) return;
    const a=Math.atan2(zb.x-p.x,zb.z-p.z);
    let dA=Math.abs(a-p.facing); if(dA>Math.PI)dA=6.283-dA;
    if(dA<1.15){
      let dmg=wep? wep.dmg[0]+Math.random()*(wep.dmg[1]-wep.dmg[0]) : 8+Math.random()*6;
      dmg*=(1+skill('forca')*0.06); if(exhausted)dmg*=0.55;
      damageZombie(zb,dmg,p.x,p.z, wep?wep.knock:0.12);
      hit=true;
    } });
  if(hit&&p.weapon){ p.weapon.cond--; if(p.weapon.cond<=0){
      toast('💔 Sua '+ITEMS[p.weapon.id].n+' QUEBROU!'); p.weapon=null; CHARS.showWeapon(p.rig,null); } }
}
function doShove(){
  if(dead||sleeping||player.shoveCd>0) return;
  const p=player;
  p.shoveCd=0.9; AU.shove(); playerAct('shove',0.35);
  p.endurance=Math.max(0,p.endurance-7*(1-skill('aptidao')*0.05));
  emitNoise(p.x,p.z,4);
  zombies.forEach(zb=>{ if(zb.dead)return;
    const d=Math.hypot(zb.x-p.x,zb.z-p.z); if(d>1.5) return;
    const a=Math.atan2(zb.x-p.x,zb.z-p.z);
    let dA=Math.abs(a-p.facing); if(dA>Math.PI)dA=6.283-dA;
    if(dA<1.3){
      const kb=1.1, dx=zb.x-p.x, dz=zb.z-p.z, dd=Math.hypot(dx,dz)||1;
      const [nx,nz]=WORLD.moveCircle(zb.x,zb.z,zb.x+dx/dd*kb,zb.z+dz/dd*kb,0.3);
      zb.x=nx; zb.z=nz; zb.stagger=0.6;
      if(!zb.crawler&&Math.random()<0.28+skill('forca')*0.06) zb.downed=2.4+Math.random()*1.6;
      gainXP('forca',2);
    } });
}

/* ================= INTERAÇÃO ================= */
let nearThing=null; // {kind:'door'|'cont'|'corpse'|'window'|'water'|'bed', ref, label}
function scanInteract(){
  const p=player; let best=null, bd=1.6;
  WORLD.doors.forEach(d=>{ if(d.broken)return;
    const dx=(d.edge==='V'? d.x : d.x+0.5)-p.x, dz=(d.edge==='V'? d.z+0.5 : d.z)-p.z;
    const dist=Math.hypot(dx,dz); if(dist<bd){ bd=dist; best={kind:'door',ref:d,label:d.open?'Fechar Porta':'Abrir Porta'}; } });
  WORLD.windows.forEach(w=>{ if(!w.ext) return;
    const dx=(w.edge==='V'? w.x : w.x+0.5)-p.x, dz=(w.edge==='V'? w.z+0.5 : w.z)-p.z;
    const dist=Math.hypot(dx,dz); if(dist<bd){ bd=dist;
      let lbl='Escalar Janela';
      if(w.state==='closed') lbl='Quebrar Janela';
      if(w.barr>0) lbl=null;
      const canBarr=hasBarricadeKit();
      best={kind:'window',ref:w,label:lbl,canBarr}; } });
  WORLD.containers.forEach(c=>{ const dist=Math.hypot(c.x+0.5-p.x,c.z+0.5-p.z);
    if(dist<bd){ bd=dist; best={kind:'cont',ref:c,label:'Vasculhar: '+c.name}; } });
  corpseLoots.forEach(c=>{ const dist=Math.hypot(c.x-p.x,c.z-p.z);
    if(dist<bd){ bd=dist; best={kind:'corpse',ref:c,label:'Revistar Corpo'}; } });
  WORLD.waterSources.forEach(ws=>{ const dist=Math.hypot(ws.x+0.5-p.x,ws.z+0.5-p.z);
    if(dist<bd){ bd=dist; best={kind:'water',ref:ws,label:waterOn()? 'Usar '+ws.name : ws.name+' (sem água)'}; } });
  WORLD.beds.forEach(b=>{ const dist=Math.hypot(b.x-p.x,b.z-p.z);
    if(dist<bd){ bd=dist; best={kind:'bed',ref:b,label: player.fatigue>32? 'Dormir':'Dormir (sem sono)'}; } });
  nearThing=best;
  const btn=$('#btnUse');
  if(best&&best.label){ btn.classList.add('on'); $('#useLbl').textContent=best.label; }
  else btn.classList.remove('on');
  const bb=$('#btnBarr');
  if(best&&best.kind==='window'&&best.canBarr&&best.ref.barr<3){ bb.classList.add('on'); }
  else bb.classList.remove('on');
}
function hasBarricadeKit(){
  const hasHammer=player.inv.some(i=>i.id==='martelo')||(player.weapon&&player.weapon.id==='martelo');
  return hasHammer && player.inv.some(i=>i.id==='tabua') && player.inv.some(i=>i.id==='pregos');
}
function doInteract(){
  AU.ens();
  if(!nearThing) return;
  const {kind,ref}=nearThing;
  if(kind==='door'){ WORLD.toggleDoor(ref); AU.door(); emitNoise(player.x,player.z,5); }
  else if(kind==='cont'||kind==='corpse'){ openLoot(ref); }
  else if(kind==='water'){ openWater(ref); }
  else if(kind==='bed'){ trySleep(); }
  else if(kind==='window'){
    const w=ref;
    if(w.barr>0) return;
    if(w.state==='closed'){ WORLD.smashWindow(w); AU.glass(); emitNoise(player.x,player.z,11);
      toast('Você quebrou a janela. Cuidado com os cacos...'); }
    else { // escalar
      const isV=w.edge==='V';
      const toX=isV? (player.x<w.x? w.x+0.45:w.x-0.45) : player.x;
      const toZ=isV? player.z : (player.z<w.z? w.z+0.45:w.z-0.45);
      player.climbTo={x:toX,z:toZ}; playerAct('climb',1.1);
      emitNoise(player.x,player.z,3);
      if(w.state==='smashed'&&Math.random()<0.22){ addInjury('laceracao'); toast('🩸 Você se cortou nos cacos de vidro!'); }
    }
  }
}
$('#btnBarr')?null:0;
function doBarricade(){
  if(!nearThing||nearThing.kind!=='window') return;
  const w=nearThing.ref;
  if(!hasBarricadeKit()||w.barr>=3) return;
  const ti=player.inv.findIndex(i=>i.id==='tabua'); player.inv.splice(ti,1);
  if(Math.random()<0.35){ const ni=player.inv.findIndex(i=>i.id==='pregos'); if(ni>=0)player.inv.splice(ni,1); }
  WORLD.barricade(w); AU.hammer(); setTimeout(()=>AU.hammer(),300); setTimeout(()=>AU.hammer(),600);
  emitNoise(player.x,player.z,10);
  toast(`🔨 Janela barricada (${w.barr}/3 tábuas)`);
  gainXP('forca',4);
}

/* ================= ÁGUA / SONO / LEITURA ================= */
function openWater(ws){
  if(!waterOn()){ toast('🚱 Não sai uma gota. A água foi cortada.'); return; }
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent='🚰 '+ws.name;
  const list=$('#sheetList'); list.innerHTML='';
  const b1=document.createElement('button'); b1.className='takeAll'; b1.textContent='BEBER DA TORNEIRA';
  b1.onclick=()=>{ player.thirst=Math.max(0,player.thirst-45); AU.drink(); toast('Você bebeu água da torneira.'); };
  list.appendChild(b1);
  const empties=player.inv.filter(i=>ITEMS[i.id].fillable);
  if(empties.length){ const b2=document.createElement('button'); b2.className='takeAll'; b2.textContent=`ENCHER GARRAFA (${empties.length})`;
    b2.onclick=()=>{ const i=player.inv.findIndex(x=>ITEMS[x.id].fillable); if(i>=0){ player.inv[i]=mk('agua'); AU.drink(); toast('Garrafa cheia de água.'); openWater(ws); } };
    list.appendChild(b2); }
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}
function trySleep(){
  if(player.fatigue<32){ toast('Você não está com sono.'); return; }
  const danger=zombies.some(z=>!z.dead&&Math.hypot(z.x-player.x,z.z-player.z)<10);
  if(danger){ toast('⚠ Perigoso demais para dormir — tem coisa por perto.'); return; }
  sleeping=true; $('#sleepFade').classList.add('on');
  const wakeAt=(Math.floor(gameMin/1440))*1440+ (gameMin%1440>7*60? 1440+7*60 : 7*60);
  const target=Math.max(wakeAt, gameMin+6.5*60);
  const iv=setInterval(()=>{
    gameMin+=38;
    player.fatigue=Math.max(0,player.fatigue-4.4);
    player.hunger=Math.min(100,player.hunger+0.7); player.thirst=Math.min(100,player.thirst+0.9);
    if(player.hp<100&&knoxStage()===0)player.hp=Math.min(100,player.hp+0.8);
    if(gameMin>=target||player.fatigue<=2){
      clearInterval(iv); sleeping=false; $('#sleepFade').classList.remove('on');
      toast('☀ Você acordou. '+(knoxStage()>=2?'E se sente PIOR...':'Um novo dia.'));
      saveGame();
    }
  },110);
}
function readItem(i){
  const it=player.inv[i], def=ITEMS[it.id];
  player.boredom=Math.max(0,player.boredom-def.fun);
  gameMin+=25; AU.page();
  player.inv.splice(i,1);
  toast('📖 Você leu por um tempo. A mente descansa um pouco.');
}

/* ================= LOOT / INVENTÁRIO / SHEET ================= */
function transferRow(it, from, cb){
  const def=ITEMS[it.id];
  const d=document.createElement('div'); d.className='itemCard';
  const f=freshOf(it);
  d.innerHTML=`<span class="ic">${def.i}</span>
    <span class="nm">${itemLabel(it)}<small>${def.kg}kg${f==='podre'?' · <b style="color:#ff6a5a">podre</b>':f==='velho'?' · velho':''}</small></span>`;
  const btn=document.createElement('button'); btn.className='take'; btn.textContent=from==='cont'?'PEGAR':'GUARDAR';
  btn.onclick=cb; d.appendChild(btn);
  return d;
}
function openLoot(c){
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent=(c.name==='Corpo'?'💀 ':'📦 ')+c.name;
  const list=$('#sheetList'); list.innerHTML='';
  const sec1=document.createElement('div'); sec1.className='secHead'; sec1.textContent='No recipiente'; list.appendChild(sec1);
  if(!c.loot.length){ const e=document.createElement('div'); e.className='empty'; e.textContent='Vazio... alguém passou antes.'; list.appendChild(e); }
  c.loot.forEach((it)=>{
    list.appendChild(transferRow(it,'cont',()=>{
      if(invWeight()+ITEMS[it.id].kg>capacity()*1.5){ toast('Peso demais!'); return; }
      player.inv.push(it); c.loot.splice(c.loot.indexOf(it),1); AU.loot(); openLoot(c); }));
  });
  if(c.loot.length){ const all=document.createElement('button'); all.className='takeAll'; all.textContent='PEGAR TUDO';
    all.onclick=()=>{ while(c.loot.length&&invWeight()+ITEMS[c.loot[0].id].kg<=capacity()*1.5) player.inv.push(c.loot.shift());
      AU.loot(); if(c.loot.length)toast('Peso demais!'); openLoot(c); };
    list.appendChild(all); }
  const sec2=document.createElement('div'); sec2.className='secHead'; sec2.textContent=`Você (${invWeight().toFixed(1)}/${capacity()}kg)`; list.appendChild(sec2);
  player.inv.forEach((it,i)=>{
    list.appendChild(transferRow(it,'inv',()=>{ c.loot.push(it); player.inv.splice(i,1); AU.loot(); openLoot(c); }));
  });
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}
function toggleInv(){
  const sheet=$('#sheet');
  if(sheet.classList.contains('on')){ sheet.classList.remove('on'); return; }
  renderInv();
}
function renderInv(){
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent=`🎒 Inventário — ${invWeight().toFixed(1)}/${capacity()}kg`;
  const list=$('#sheetList'); list.innerHTML='';
  if(player.weapon){ const def=ITEMS[player.weapon.id];
    const d=document.createElement('div'); d.className='itemCard equipped';
    d.innerHTML=`<span class="ic">${def.i}</span><span class="nm">${itemLabel(player.weapon)}<small>NA MÃO</small></span>`;
    const b=document.createElement('button'); b.className='take'; b.textContent='GUARDAR';
    b.onclick=()=>{ player.inv.push(player.weapon); player.weapon=null; CHARS.showWeapon(player.rig,null); renderInv(); };
    d.appendChild(b); list.appendChild(d); }
  if(player.bag){ const def=ITEMS[player.bag.id];
    const d=document.createElement('div'); d.className='itemCard equipped';
    d.innerHTML=`<span class="ic">🎒</span><span class="nm">${def.n}<small>NAS COSTAS · +${def.cap}kg</small></span>`;
    list.appendChild(d); }
  if(!player.inv.length){ const e=document.createElement('div'); e.className='empty'; e.textContent='Nada nos bolsos.'; list.appendChild(e); }
  player.inv.forEach((it,i)=>{
    const def=ITEMS[it.id];
    const d=document.createElement('div'); d.className='itemCard';
    const f=freshOf(it);
    d.innerHTML=`<span class="ic">${def.i}</span><span class="nm">${itemLabel(it)}<small>${def.kg}kg</small></span>`;
    const act=(txt,fn)=>{ const b=document.createElement('button'); b.className='take'; b.textContent=txt; b.onclick=fn; d.appendChild(b); };
    if(def.t==='eat'){
      if(def.canned&&!hasOpener()) act('SEM ABRIDOR',()=>toast('🥫 Precisa de um abridor de latas (ou faca).'));
      else act('COMER',()=>{ eatItem(i); }); }
    else if(def.t==='drink') act('BEBER',()=>{ player.thirst=Math.max(0,player.thirst-def.v); player.inv.splice(i,1);
      if(def.refill)player.inv.push(mk('garrafa')); AU.drink(); renderInv(); });
    else if(def.t==='heal') act('ENFAIXAR',()=>{ useBandage(i); });
    else if(def.t==='pain') act('TOMAR',()=>{ player.pain=Math.max(0,player.pain-60); player.inv.splice(i,1); renderInv(); });
    else if(def.t==='weapon') act('EQUIPAR',()=>{ if(player.weapon)player.inv.push(player.weapon);
      player.weapon=it; player.inv.splice(i,1); CHARS.showWeapon(player.rig,it.id); renderInv(); toast(def.n+' na mão.'); });
    else if(def.t==='bag') act('VESTIR',()=>{ if(player.bag)player.inv.push(player.bag);
      player.bag=it; player.inv.splice(i,1); CHARS.showPack(player.rig,def.tier); renderInv(); toast(def.n+' nas costas (+'+def.cap+'kg).'); });
    else if(def.t==='read') act('LER',()=>{ readItem(i); renderInv(); });
    const drop=document.createElement('button'); drop.className='drop'; drop.textContent='✕';
    drop.onclick=()=>{ player.inv.splice(i,1); renderInv(); };
    d.appendChild(drop); list.appendChild(d);
  });
  const sv=document.createElement('button'); sv.className='takeAll'; sv.textContent='💾 SALVAR JOGO';
  sv.onclick=()=>{ saveGame(); toast('Jogo salvo.'); };
  list.appendChild(sv);
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}
function eatItem(i){
  const it=player.inv[i], def=ITEMS[it.id], f=freshOf(it);
  let v=def.v; if(f==='velho')v*=0.6;
  if(f==='podre'){ player.sick=Math.min(100,player.sick+55); v*=0.3; toast('🤢 Isso estava PODRE...'); }
  player.hunger=Math.max(0,player.hunger-v);
  player.boredom=Math.max(0,player.boredom-4);
  player.inv.splice(i,1); AU.eat(); playerAct('eat',0.9); renderInv();
}
function useBandage(i){
  const open=player.injuries.filter(j=>j.bleeding&&!j.bandaged);
  if(!open.length){ toast('Nenhum ferimento sangrando.'); return; }
  const heal=PROFS[player.prof].heal;
  const inj=open[0]; inj.bandaged=true; inj.bleeding=false;
  player.inv.splice(i,1);
  player.hp=Math.min(100,player.hp+(heal?16:8));
  toast(`🩹 ${inj.type==='mordida'?'Mordida':'Ferimento'} no(a) ${inj.part} enfaixado${heal?' com perícia':''}.`);
  playerAct('eat',0.9); renderInv();
}

/* ================= PAINÉIS: SAÚDE / SKILLS ================= */
function openHealth(){
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent='❤ Saúde — '+Math.round(player.hp)+'%';
  const list=$('#sheetList'); list.innerHTML='';
  const ks=knoxStage();
  const stat=document.createElement('div'); stat.className='healthTop';
  stat.innerHTML=`<div class="hbar"><i style="width:${player.hp}%"></i></div>
    <div class="hnotes">${ks>=3?'☠ Você está MORRENDO. A febre queima.':ks>=2?'🤒 Febre alta. Algo está muito errado.':ks>=1?'🤢 Você se sente enjoado...':player.hp>80?'Você está bem.':'Você está machucado.'}</div>`;
  list.appendChild(stat);
  if(!player.injuries.length){ const e=document.createElement('div'); e.className='empty'; e.textContent='Nenhum ferimento. Continue assim.'; list.appendChild(e); }
  player.injuries.forEach((inj)=>{
    const d=document.createElement('div'); d.className='itemCard';
    const nm={arranhao:'Arranhão',laceracao:'Laceração',mordida:'🦷 Mordida'}[inj.type];
    d.innerHTML=`<span class="ic">${inj.bandaged?'🩹':'🩸'}</span>
      <span class="nm">${nm} — ${inj.part}<small>${inj.bandaged?'enfaixado':inj.bleeding?'SANGRANDO':'aberto'}</small></span>`;
    if(!inj.bandaged){ const bi=player.inv.findIndex(x=>x.id==='band');
      if(bi>=0){ const b=document.createElement('button'); b.className='take'; b.textContent='ENFAIXAR';
        b.onclick=()=>{ inj.bandaged=true; inj.bleeding=false; player.inv.splice(bi,1);
          player.hp=Math.min(100,player.hp+(PROFS[player.prof].heal?16:8)); openHealth(); }; d.appendChild(b); } }
    list.appendChild(d);
  });
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}
function openSkills(){
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent='📊 Habilidades — '+PROFS[player.prof].n;
  const list=$('#sheetList'); list.innerHTML='';
  const defs=[['forca','💪 Força','dano corpo a corpo, derrubadas'],['aptidao','🫁 Aptidão','resistência, corrida'],
    ['corpo','⚔ Corpo a Corpo','críticos, precisão'],['furtiv','🤫 Furtividade','menos barulho, menos visível']];
  defs.forEach(([k,nm,desc])=>{
    const s=player.skills[k], need=60+s.lv*50;
    const d=document.createElement('div'); d.className='skillCard';
    let pips=''; for(let i=0;i<10;i++)pips+=`<i class="${i<s.lv?'on':''}"></i>`;
    d.innerHTML=`<div class="skTop"><span>${nm}</span><span class="pips">${pips}</span></div>
      <div class="skDesc">${desc}</div>
      <div class="skXp"><i style="width:${Math.min(100,100*s.xp/need)}%"></i></div>`;
    list.appendChild(d);
  });
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}

/* ================= TOAST / CUTAWAY / MARCADOR ================= */
let toastT=null;
function toast(m,dur){ const t=$('#toast'); t.textContent=m; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),dur||2000); }
function updateCutaway(){
  const b=WORLD.buildingAt(player.x,player.z);
  WORLD.buildings.forEach(bd=>{
    const inside=bd===b;
    const tgt=inside?0.13:1;
    bd.fadeMats.forEach(m=>{ m.opacity+=(tgt-m.opacity)*0.25; });
    bd.winGlass.forEach(m=>{ const gt=inside?0.1:0.45; m.opacity+=(gt-m.opacity)*0.25; });
    bd.roof.visible=!inside;
  });
}
let marker;
function initMarker(){ const c=document.createElement('canvas'); c.width=c.height=64; const g=c.getContext('2d');
  g.fillStyle='#ffd24a'; g.beginPath(); g.moveTo(32,58); g.lineTo(12,28); g.lineTo(52,28); g.fill();
  const t=new THREE.CanvasTexture(c);
  marker=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));
  marker.scale.set(0.55,0.55,1); marker.visible=false; scene.add(marker); }
function updateMarker(t){
  if(nearThing&&nearThing.label){ const r=nearThing.ref;
    const mx=r.x!==undefined? (r.edge? (r.edge==='V'? r.x : r.x+0.5) : r.x+(r.name?0.5:0)) : player.x;
    const mz=r.z!==undefined? (r.edge? (r.edge==='V'? r.z+0.5 : r.z) : r.z+(r.name?0.5:0)) : player.z;
    marker.visible=true; marker.position.set(mx, 2.3+Math.sin(t*4)*0.14, mz);
  } else marker.visible=false;
}

/* ================= SAVE / LOAD ================= */
function saveGame(){
  try{
    const data={ v:2, gameMin, player:{...player, rig:undefined, act:null, actT:0, climbTo:null},
      zombies:zombies.map(z=>({x:z.x,z:z.z,hp:z.dead?0:z.hp,crawler:z.crawler,state:z.dead?'dead':'wander'})),
      containers:WORLD.containers.map(c=>c.loot),
      corpses:corpseLoots,
      doors:WORLD.doors.map(d=>({open:d.open,broken:d.broken,hp:d.hp})),
      windows:WORLD.windows.map(w=>({state:w.state,barr:w.barr,hp:w.hp})) };
    localStorage.setItem('bz_save',JSON.stringify(data));
  }catch(e){}
}
function loadGame(){
  try{ const raw=localStorage.getItem('bz_save'); if(!raw)return null; return JSON.parse(raw); }catch(e){ return null; }
}

/* ================= SETUP 3D ================= */
function initThree(){
  renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  $('#game3d').appendChild(renderer.domElement);
  scene=new THREE.Scene();
  const a=innerWidth/innerHeight;
  camera=new THREE.OrthographicCamera(-ZOOM*a,ZOOM*a,ZOOM,-ZOOM,1,200);
  sun=new THREE.DirectionalLight(0xfff2dd,1);
  sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
  const sc=sun.shadow.camera; sc.left=-26; sc.right=26; sc.top=26; sc.bottom=-26; sc.far=90;
  sun.shadow.bias=-0.0004;
  scene.add(sun); scene.add(sun.target);
  hemi=new THREE.HemisphereLight(0xbfd4e8,0x6a6a58,0.7); scene.add(hemi);
  playerLight=new THREE.PointLight(0xffe0b0,0,7); scene.add(playerLight);
  addEventListener('resize',()=>{ const a2=innerWidth/innerHeight;
    camera.left=-ZOOM*a2; camera.right=ZOOM*a2; camera.top=ZOOM; camera.bottom=-ZOOM;
    camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
}
let camShake=0;
function updateCamera(dt){
  const tx=player.x+CAMDIR.x*40, ty=CAMDIR.y*40, tz=player.z+CAMDIR.z*40;
  if(camPos.x===0&&camPos.y===0) camPos.set(tx,ty,tz);
  camPos.x+=(tx-camPos.x)*Math.min(1,dt*7); camPos.y=ty; camPos.z+=(tz-camPos.z)*Math.min(1,dt*7);
  camShake*=Math.exp(-9*dt);
  const shx=(Math.random()-0.5)*camShake, shz=(Math.random()-0.5)*camShake;
  camera.position.set(camPos.x+shx,camPos.y,camPos.z+shz);
  camera.lookAt(camPos.x-CAMDIR.x*40+shx, 0.8, camPos.z-CAMDIR.z*40+shz);
}

/* ================= LOOP ================= */
function loop(){
  requestAnimationFrame(loop);
  if(!running) return;
  const dt=Math.min(0.05,clock.getDelta());
  frame++;
  player.attackCd=Math.max(0,player.attackCd-dt);
  player.shoveCd=Math.max(0,(player.shoveCd||0)-dt);
  if(!sleeping){
    movePlayer(dt);
    zombies.forEach((z,i)=>updateZombie(z,dt,i));
    updateBlood(dt);
    updateSurvival(dt);
  }
  updateDayNight(dt);
  updateMoodles();
  if(frame%5===0&&!sleeping) scanInteract();
  updateCutaway();
  updateMarker(performance.now()/1000);
  updateCamera(dt);
  if(redFlashT>0){ redFlashT-=dt; $('#redFlash').style.opacity=Math.max(0,redFlashT*1.4); }
  renderer.render(scene,camera);
}

/* ================= FLUXO ================= */
function bootWorld(){
  if(!scene){ initThree(); WORLD.build(scene); initBlood(); initMarker(); }
}
function clearRun(){
  if(player&&player.rig) scene.remove(player.rig.group);
  zombies.forEach(z=>scene.remove(z.rig.group));
  corpseLoots=[];
}
function startGame(prof, save){
  $('#menu').classList.remove('on'); $('#death').classList.remove('on'); $('#profSel').classList.remove('on');
  $('#hud').classList.add('on');
  bootWorld(); clearRun();
  if(save){
    gameMin=save.gameMin;
    player=save.player; player.act=null; player.actT=0;
    corpseLoots=save.corpses||[];
    WORLD.containers.forEach((c,i)=>{ if(save.containers[i]) c.loot=save.containers[i]; });
    WORLD.doors.forEach((d,i)=>{ const s=save.doors[i]; if(!s)return; d.hp=s.hp;
      if(s.broken&&!d.broken)WORLD.breakDoor(d); else if(s.open&&!d.open)WORLD.toggleDoor(d); });
    WORLD.windows.forEach((w,i)=>{ const s=save.windows[i]; if(!s)return; w.hp=s.hp;
      if(s.state==='smashed'&&w.state!=='smashed')WORLD.smashWindow(w);
      for(let k=0;k<s.barr;k++)WORLD.barricade(w); });
    spawnZombies(save.zombies);
    zombies.forEach(z=>{ if(z.dead){ CHARS.pose(z.rig,1,{dead:true,zombie:true,speed:0}); } });
  } else {
    gameMin=7*60+30; announced={w:false,p:false};
    player=newPlayer(prof);
  }
  const pal=CHARS.randomPal(WORLD.rng,false);
  player.rig=CHARS.build(pal);
  player.rig.group.position.set(player.x,0,player.z); scene.add(player.rig.group);
  if(player.weapon)CHARS.showWeapon(player.rig,player.weapon.id);
  if(player.bag)CHARS.showPack(player.rig,ITEMS[player.bag.id].tier);
  if(!save) spawnZombies();
  dead=false; sleeping=false; running=true;
  $('#kills').textContent=player.kills;
  clock.getDelta(); camPos.set(0,0,0);
  if(!save){ toast('Dia 1. As sirenes pararam ontem. Você está sozinho.',3200);
    setTimeout(()=>toast('Procure comida, água e uma arma. E faça silêncio.',3000),3500); }
}
window.addEventListener('load',()=>{
  setupInput();
  $('#btnBarr').addEventListener('pointerdown',e=>{ e.preventDefault(); doBarricade(); });
  $('#btnStart').onclick=()=>{ AU.ens(); $('#menu').classList.remove('on'); $('#profSel').classList.add('on'); };
  $$('.profCard').forEach(c=>c.onclick=()=>{ AU.ens(); startGame(c.dataset.prof,null); });
  const sv=loadGame();
  if(sv){ const b=$('#btnCont'); b.disabled=false;
    b.querySelector('.sm').textContent=`Dia ${Math.floor(sv.gameMin/1440)+1} · ${sv.player.kills} zumbis mortos`;
    b.onclick=()=>{ AU.ens(); startGame(null,loadGame()); }; }
  $('#btnHow').onclick=()=>$('#how').classList.toggle('on');
  $('#btnAgain').onclick=()=>{ $('#death').classList.remove('on'); $('#profSel').classList.add('on'); };
  loop();
});
/* hook de teste */
window.BZ={ get player(){return player;}, get zombies(){return zombies;}, get running(){return running;},
  get gameMin(){return gameMin;}, set gameMin(v){gameMin=v;},
  tp(x,z){ player.x=x; player.z=z; }, setTime(h){ gameMin=Math.floor(gameMin/1440)*1440+h*60; },
  start:(p)=>startGame(p||'bombeiro',null), attack:doAttack, shove:doShove, interact:doInteract,
  near:()=>nearThing?{kind:nearThing.kind,label:nearThing.label}:null,
  give(id){ player.inv.push(mk(id)); }, injure:(t)=>addInjury(t), save:saveGame,
  world:WORLD };
})();
