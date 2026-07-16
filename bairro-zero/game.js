/* ========================================================================
   BAIRRO ZERO — motor: câmera isométrica, rigs, IA zumbi, sobrevivência
   ===================================================================== */
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const W=WORLD.W, ITEMS=WORLD.ITEMS;
let renderer, scene, camera, sun, hemi, playerLight;
let player, zombies=[], bloodPool=[], corpses=[];
let running=false, dead=false;
const CAMDIR=new THREE.Vector3(1,1.15,1).normalize();
let ZOOM=8.5;                                     // meia-altura do frustum
const clock=new THREE.Clock();

/* ================= ÁUDIO ================= */
const AU=(()=>{ let ctx=null,master=null;
  function ens(){ if(ctx)return; try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
    master=ctx.createGain(); master.gain.value=0.8; master.connect(ctx.destination); }
  function t(f,dur,{type='sine',g=0.15,atk=0.01,slide=0}={}){ if(!ctx)return; const o=ctx.createOscillator(),gn=ctx.createGain();
    o.type=type; o.frequency.value=f; if(slide)o.frequency.linearRampToValueAtTime(f+slide,ctx.currentTime+dur);
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
    swing(){ ens(); n(0.12,{g:0.07,f:1200}); },
    hit(){ ens(); n(0.09,{g:0.2,f:300,q:2}); t(90,0.12,{type:'sine',g:0.18}); },
    bite(){ ens(); n(0.2,{g:0.18,f:500}); t(140,0.25,{type:'sawtooth',g:0.08,slide:-60}); },
    door(){ ens(); t(180,0.28,{type:'sawtooth',g:0.04,slide:40}); n(0.06,{g:0.06,f:900}); },
    eat(){ ens(); n(0.1,{g:0.1,f:700}); setTimeout(()=>n(0.1,{g:0.08,f:600}),140); },
    drink(){ ens(); t(400,0.12,{g:0.06,slide:120}); setTimeout(()=>t(500,0.1,{g:0.05,slide:100}),140); },
    groan(vol){ ens(); t(90+Math.random()*50,0.9,{type:'sawtooth',g:0.05*vol,slide:-25}); n(0.7,{g:0.03*vol,f:350,q:0.6}); },
    heart(){ ens(); t(55,0.1,{g:0.22}); setTimeout(()=>t(50,0.09,{g:0.16}),180); },
    loot(){ ens(); n(0.07,{g:0.06,f:1500}); },
    thump(){ ens(); t(70,0.15,{g:0.2}); n(0.08,{g:0.1,f:200,q:2}); },
  };
})();

/* ================= RIG HUMANO ================= */
function mkBox(w,h,d,c){ return new THREE.Mesh(new THREE.BoxGeometry(w,h,d), new THREE.MeshLambertMaterial({color:c})); }
const shadowTex=(()=>{ const c=document.createElement('canvas'); c.width=c.height=64; const g=c.getContext('2d');
  const r=g.createRadialGradient(32,32,4,32,32,30); r.addColorStop(0,'rgba(0,0,0,.4)'); r.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=r; g.fillRect(0,0,64,64); return new THREE.CanvasTexture(c); })();
function buildHuman({skin,shirt,pants,hair,zombie}){
  const g=new THREE.Group();
  const torso=mkBox(0.5,0.6,0.28,shirt); torso.position.y=1.12; g.add(torso);
  const head=mkBox(0.3,0.3,0.3,skin); head.position.y=1.6; g.add(head);
  const hairM=mkBox(0.32,0.12,0.32,hair); hairM.position.y=1.78; g.add(hairM);
  const mk=(px)=>{ const p=new THREE.Group(); p.position.set(px,1.4,0);
    const a=mkBox(0.15,0.58,0.15,zombie?skin:shirt); a.position.y=-0.28; p.add(a); g.add(p); return p; };
  const armL=mk(-0.34), armR=mk(0.34);
  const lk=(px)=>{ const p=new THREE.Group(); p.position.set(px,0.85,0);
    const l=mkBox(0.17,0.82,0.17,pants); l.position.y=-0.42; p.add(l); g.add(p); return p; };
  const legL=lk(-0.13), legR=lk(0.13);
  // braço de zumbi levantado
  if(zombie){ armL.rotation.x=-1.25+Math.random()*0.2; armR.rotation.x=-1.15-Math.random()*0.25; head.rotation.z=(Math.random()-0.5)*0.3; }
  // arma (invisível até equipar)
  const bat=mkBox(0.09,0.8,0.09,'#a08050'); bat.position.set(0.34,1.05,0.22); bat.rotation.x=0.6; bat.visible=false; g.add(bat);
  // sombra blob
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1), new THREE.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}));
  sh.rotation.x=-Math.PI/2; sh.position.y=0.03; g.add(sh);
  return {group:g, torso, head, armL, armR, legL, legR, bat, animT:Math.random()*10};
}
function animWalk(rig,dt,speed,zombie){
  rig.animT+=dt*speed*(zombie?4:6);
  const s=Math.sin(rig.animT)* (zombie?0.4:0.55);
  rig.legL.rotation.x=s; rig.legR.rotation.x=-s;
  if(!zombie){ rig.armL.rotation.x=-s*0.7; if(!rig.attacking) rig.armR.rotation.x=s*0.7; }
  else { rig.armL.rotation.x=-1.2+Math.sin(rig.animT*0.5)*0.1; rig.armR.rotation.x=-1.2-Math.sin(rig.animT*0.6)*0.1; }
}

/* ================= ESTADO DO JOGADOR ================= */
function newPlayer(){
  return { x:13.5, z:34.5, facing:0, hp:100, hunger:12, thirst:18, pain:0, panic:0,
    bleeding:false, stamina:100, run:false, weapon:null, inv:[{id:'chips'},{id:'agua'}],
    attackCd:0, kills:0, rig:null, speed:0 };
}

/* ================= ZUMBIS ================= */
const ZSKINS=[['#7a8a62','#4a5240','#3a3e34'],['#8a9a72','#5a4a42','#42423a'],['#6d7d58','#3f4a52','#33383f'],['#82927a','#5c5248','#3c3830']];
function spawnZombies(){
  zombies=[];
  WORLD.zSpawns.forEach((s,i)=>{
    const sk=ZSKINS[i%ZSKINS.length];
    const rig=buildHuman({skin:sk[0],shirt:sk[1],pants:sk[2],hair:'#2a2a24',zombie:true});
    rig.group.position.set(s.x,0,s.z); scene.add(rig.group);
    zombies.push({ x:s.x,z:s.z, hp:60+WORLD.rng()*50, state:'wander', tgt:null, dir:Math.random()*6.28,
      speed:0.5+WORLD.rng()*0.35, chaseSpeed:1.7+WORLD.rng()*1.1, rig, attackCd:0, stagger:0,
      wanderT:2+WORLD.rng()*5, seen:0, groanT:WORLD.rng()*8 });
  });
}
function emitNoise(x,z,r){
  zombies.forEach(zb=>{ if(zb.hp<=0) return;
    const d=Math.hypot(zb.x-x,zb.z-z);
    if(d<r && zb.state!=='chase'){ zb.state='investigate'; zb.tgt={x:x+(Math.random()-0.5)*2,z:z+(Math.random()-0.5)*2}; } });
}
function updateZombie(zb,dt,idx){
  if(zb.hp<=0) return;
  const p=player;
  zb.attackCd=Math.max(0,zb.attackCd-dt); zb.stagger=Math.max(0,zb.stagger-dt);
  zb.groanT-=dt; if(zb.groanT<0){ zb.groanT=6+Math.random()*10; const d=Math.hypot(p.x-zb.x,p.z-zb.z); if(d<14) AU.groan(Math.max(0.1,1-d/14)); }
  // percepção (escalonada por frame p/ performance)
  if(((frame+idx)%12)===0 && !dead){
    const d=Math.hypot(p.x-zb.x,p.z-zb.z);
    const ang=Math.atan2(p.x-zb.x,p.z-zb.z);
    let dAng=Math.abs(ang-zb.dir); if(dAng>Math.PI)dAng=6.283-dAng;
    const nightPen = isNight()? 0.55:1;
    const seeDist=(p.run?11:8.5)*nightPen;
    if(d<seeDist && (dAng<1.25||d<2.2) && WORLD.lineOfSight(zb.x,zb.z,p.x,p.z)){ zb.state='chase'; zb.seen=4; }
    else if(zb.state==='chase'){ zb.seen-=12*dt*4; if(zb.seen<=0){ zb.state='investigate'; zb.tgt={x:p.x,z:p.z}; } }
  }
  if(zb.stagger>0) return;
  let vx=0,vz=0, sp=0;
  if(zb.state==='chase' && !dead){
    const d=Math.hypot(p.x-zb.x,p.z-zb.z);
    if(d<1.05){ // morde
      if(zb.attackCd<=0){ zb.attackCd=1.4; playerHit(8+Math.random()*7, zb); }
    } else { sp=zb.chaseSpeed; const a=Math.atan2(p.x-zb.x,p.z-zb.z); zb.dir=a; vx=Math.sin(a)*sp; vz=Math.cos(a)*sp; }
  } else if(zb.state==='investigate' && zb.tgt){
    const d=Math.hypot(zb.tgt.x-zb.x,zb.tgt.z-zb.z);
    if(d<0.8){ zb.state='wander'; zb.tgt=null; }
    else { sp=zb.speed*1.4; const a=Math.atan2(zb.tgt.x-zb.x,zb.tgt.z-zb.z); zb.dir=a; vx=Math.sin(a)*sp; vz=Math.cos(a)*sp; }
  } else { // wander
    zb.wanderT-=dt;
    if(zb.wanderT<0){ zb.wanderT=3+Math.random()*6; zb.dir=Math.random()*6.283; zb.pause=Math.random()<0.4; }
    if(!zb.pause){ sp=zb.speed; vx=Math.sin(zb.dir)*sp; vz=Math.cos(zb.dir)*sp; }
  }
  if(sp>0){
    // separação entre zumbis
    zombies.forEach(o=>{ if(o===zb||o.hp<=0)return; const dx=zb.x-o.x,dz=zb.z-o.z,d2=dx*dx+dz*dz;
      if(d2<0.36&&d2>0.0001){ const d=Math.sqrt(d2); vx+=dx/d*1.2; vz+=dz/d*1.2; } });
    const [nx,nz]=WORLD.moveCircle(zb.x,zb.z,zb.x+vx*dt,zb.z+vz*dt,0.3);
    if(Math.abs(nx-zb.x)<0.001&&Math.abs(nz-zb.z)<0.001&&zb.state==='chase'){ // batendo na parede
      if(Math.random()<0.02) AU.thump();
    }
    zb.x=nx; zb.z=nz;
    animWalk(zb.rig,dt,sp,true);
  }
  zb.rig.group.position.set(zb.x,0,zb.z);
  zb.rig.group.rotation.y=zb.dir;
}
function damageZombie(zb,dmg,fromX,fromZ){
  zb.hp-=dmg; zb.stagger=0.45; AU.hit();
  const kb=0.55, dx=zb.x-fromX, dz=zb.z-fromZ, d=Math.hypot(dx,dz)||1;
  const [nx,nz]=WORLD.moveCircle(zb.x,zb.z,zb.x+dx/d*kb,zb.z+dz/d*kb,0.3); zb.x=nx; zb.z=nz;
  blood(zb.x,1.2,zb.z);
  if(zb.hp<=0){
    player.kills++; $('#kills').textContent=player.kills;
    zb.rig.group.rotation.x=-Math.PI/2; zb.rig.group.position.y=0.25;
    corpses.push(zb.rig.group);
    zb.state='dead';
  } else if(zb.state!=='chase'){ zb.state='chase'; }
}

/* ================= SANGUE (partículas) ================= */
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

/* ================= JOGADOR: dano / morte ================= */
let redFlashT=0;
function playerHit(dmg,zb){
  if(dead) return;
  AU.bite(); player.hp=Math.max(0,player.hp-dmg); player.pain=Math.min(100,player.pain+18);
  if(Math.random()<0.3) player.bleeding=true;
  redFlashT=0.5; blood(player.x,1.2,player.z);
  if(player.hp<=0) die();
}
function die(){
  dead=true; player.rig.group.rotation.x=-Math.PI/2; player.rig.group.position.y=0.25;
  setTimeout(()=>{
    $('#deathDays').textContent=Math.floor(gameMin/1440)+1;
    $('#deathKills').textContent=player.kills;
    $('#death').classList.add('on');
  },1100);
}

/* ================= TEMPO / DIA-NOITE ================= */
let gameMin=9*60; // dia 1, 09:00
const MIN_PER_SEC=1/0.35;
function isNight(){ const h=(gameMin/60)%24; return h<6||h>=19.5; }
function updateDayNight(dt){
  gameMin+=dt*MIN_PER_SEC;
  const h=(gameMin/60)%24;
  const dayT=Math.max(0,Math.min(1,(h-6)/12));            // 0..1 durante o dia
  const sunUp=h>=6&&h<18;
  const elev=Math.sin(dayT*Math.PI);
  sun.intensity=sunUp? 0.35+elev*0.75 : 0;
  const warm=Math.min(1,Math.abs(dayT-0.5)*2.6);
  sun.color.setRGB(1, 0.95-warm*0.25, 0.85-warm*0.35);
  const sa=(dayT-0.5)*2.2;
  sun.position.set(player.x+Math.sin(sa)*20, 14+elev*16, player.z+8+Math.cos(sa)*6);
  sun.target.position.set(player.x,0,player.z); sun.target.updateMatrixWorld();
  let amb, bg;
  if(sunUp){ amb=0.55+elev*0.25; hemi.color.setHex(0xbfd4e8); hemi.groundColor.setHex(0x6a6a58); bg=new THREE.Color().setHSL(0.58,0.3,0.12+elev*0.05); }
  else { amb=0.16; hemi.color.setHex(0x24304a); hemi.groundColor.setHex(0x141820); bg=new THREE.Color('#05070d'); }
  const dusk=(h>=18&&h<19.5)||(h>=5&&h<6);
  if(dusk){ amb=0.3; hemi.color.setHex(0x6a5a68); bg=new THREE.Color('#1a1220'); }
  hemi.intensity=amb;
  renderer.setClearColor(bg);
  const night=isNight();
  WORLD.lamps.forEach(l=>{ l.light.intensity=night?1.1:0; l.head.material.emissive.setHex(night?0xffc060:0x000000); });
  playerLight.intensity=night?0.85:0;
  playerLight.position.set(player.x,2.2,player.z);
  const hh=String(Math.floor(h)).padStart(2,'0'), mm=String(Math.floor(gameMin%60)).padStart(2,'0');
  $('#clock').textContent=`Dia ${Math.floor(gameMin/1440)+1} · ${hh}:${mm}`;
}

/* ================= MOODLES ================= */
const MOODLE_DEFS=[
  {id:'fome', icon:'🍗', name:'Fome', get:()=>player.hunger},
  {id:'sede', icon:'💧', name:'Sede', get:()=>player.thirst},
  {id:'dor', icon:'💢', name:'Dor', get:()=>player.pain},
  {id:'panico', icon:'😱', name:'Pânico', get:()=>player.panic},
  {id:'sangue', icon:'🩸', name:'Sangrando', get:()=>player.bleeding?80:0},
];
let moodleCache='';
function updateMoodles(){
  let html='';
  MOODLE_DEFS.forEach(m=>{ const v=m.get(); if(v<25) return;
    const lv=v<50?1:v<75?2:v<90?3:4;
    html+=`<div class="moodle l${lv}" title="${m.name}"><span>${m.icon}</span></div>`;
  });
  if(html!==moodleCache){ moodleCache=html; $('#moodles').innerHTML=html; }
}
function updateSurvival(dt){
  player.hunger=Math.min(100,player.hunger+dt*0.16);
  player.thirst=Math.min(100,player.thirst+dt*0.22);
  player.pain=Math.max(0,player.pain-dt*0.5);
  if(player.bleeding){ player.hp=Math.max(0,player.hp-dt*0.7); if(player.hp<=0&&!dead) die(); }
  if(player.hunger>=90||player.thirst>=90){ player.hp=Math.max(0,player.hp-dt*0.5); if(player.hp<=0&&!dead) die(); }
  // pânico: zumbis visíveis por perto
  let near=0; zombies.forEach(z=>{ if(z.hp>0&&Math.hypot(z.x-player.x,z.z-player.z)<7) near++; });
  const tgt=Math.min(100,near*26);
  player.panic+=(tgt-player.panic)*Math.min(1,dt*1.5);
  if(player.panic>=75){ heartT-=dt; if(heartT<0){ heartT=0.9; AU.heart(); } }
  $('#hpFill').style.width=player.hp+'%';
  $('#hpFill').style.background=player.hp>50?'#5a9a4a':player.hp>25?'#c8a24a':'#c04a3a';
}
let heartT=0;

/* ================= INPUT ================= */
const keys={};
let joy={on:false,dx:0,dz:0};
function setupInput(){
  addEventListener('keydown',e=>{ keys[e.key.toLowerCase()]=true;
    if(e.key.toLowerCase()==='e') doInteract();
    if(e.key.toLowerCase()==='i') toggleInv();
    if(e.key===' '||e.key.toLowerCase()==='j'){ doAttack(); e.preventDefault(); } });
  addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
  // joystick
  const zone=$('#joyZone'), stick=$('#joyStick'), base=$('#joyBase');
  let pid=null, cx=0, cy=0;
  zone.addEventListener('pointerdown',e=>{ pid=e.pointerId; cx=e.clientX; cy=e.clientY;
    base.style.left=cx+'px'; base.style.top=cy+'px'; base.classList.add('on'); zone.setPointerCapture(pid); });
  zone.addEventListener('pointermove',e=>{ if(e.pointerId!==pid)return;
    let dx=e.clientX-cx, dy=e.clientY-cy; const d=Math.hypot(dx,dy), max=46;
    if(d>max){ dx*=max/d; dy*=max/d; }
    stick.style.transform=`translate(${dx}px,${dy}px)`;
    joy.on=d>8; joy.dx=dx/max; joy.dz=dy/max; });
  const end=e=>{ if(e.pointerId!==pid)return; pid=null; joy.on=false; base.classList.remove('on'); stick.style.transform=''; };
  zone.addEventListener('pointerup',end); zone.addEventListener('pointercancel',end);
  $('#btnAtk').addEventListener('pointerdown',e=>{ e.preventDefault(); doAttack(); });
  $('#btnRun').addEventListener('pointerdown',e=>{ e.preventDefault(); player.run=!player.run; $('#btnRun').classList.toggle('on',player.run); });
  $('#btnUse').addEventListener('pointerdown',e=>{ e.preventDefault(); doInteract(); });
  $('#btnInv').addEventListener('pointerdown',e=>{ e.preventDefault(); toggleInv(); });
}
function movePlayer(dt){
  if(dead) return;
  let dx=0,dz=0;
  if(keys['w']||keys['arrowup'])dz-=1; if(keys['s']||keys['arrowdown'])dz+=1;
  if(keys['a']||keys['arrowleft'])dx-=1; if(keys['d']||keys['arrowright'])dx+=1;
  if(joy.on){ dx=joy.dx; dz=joy.dz; }
  const run=(keys['shift']||player.run)&&player.stamina>2;
  const mag=Math.hypot(dx,dz);
  if(mag>0.1){
    // converte input de tela → mundo (câmera isométrica olha do +x+z)
    const ang=Math.atan2(dx,dz)-Math.PI/4;
    const sp=(run?5.0:2.9)*(player.pain>75?0.7:1);
    const vx=Math.sin(ang)*sp*Math.min(1,mag), vz=Math.cos(ang)*sp*Math.min(1,mag);
    const [nx,nz]=WORLD.moveCircle(player.x,player.z,player.x+vx*dt,player.z+vz*dt,0.32);
    player.x=nx; player.z=nz;
    player.facing=Math.atan2(vx,vz);
    player.speed=sp;
    animWalk(player.rig,dt,run?1.6:1,false);
    if(run){ player.stamina=Math.max(0,player.stamina-dt*10);
      noiseT-=dt; if(noiseT<0){ noiseT=0.5; emitNoise(player.x,player.z,9); } }
    else { noiseT-=dt; if(noiseT<0){ noiseT=0.7; emitNoise(player.x,player.z,3.5); } }
  } else { player.speed=0; player.stamina=Math.min(100,player.stamina+dt*7);
    player.rig.legL.rotation.x*=0.8; player.rig.legR.rotation.x*=0.8; }
  player.rig.group.position.set(player.x,0,player.z);
  player.rig.group.rotation.y=player.facing;
}
let noiseT=0;

/* ================= COMBATE ================= */
function doAttack(){
  if(dead||player.attackCd>0) return;
  AU.ens(); AU.swing();
  const wep=player.weapon? ITEMS[player.weapon]:null;
  player.attackCd=wep? wep.spd:0.55;
  player.rig.attacking=true; player.rig.armR.rotation.x=-2.2;
  setTimeout(()=>{ if(player.rig){ player.rig.armR.rotation.x=0; player.rig.attacking=false; } },240);
  emitNoise(player.x,player.z,wep?11:6);
  let hitAny=false;
  zombies.forEach(zb=>{ if(zb.hp<=0)return;
    const d=Math.hypot(zb.x-player.x,zb.z-player.z); if(d>1.8) return;
    const a=Math.atan2(zb.x-player.x,zb.z-player.z);
    let dA=Math.abs(a-player.facing); if(dA>Math.PI)dA=6.283-dA;
    if(dA<1.15){ const dmg=wep? wep.dmg[0]+Math.random()*(wep.dmg[1]-wep.dmg[0]) : 9+Math.random()*7;
      damageZombie(zb,dmg,player.x,player.z); hitAny=true; } });
  if(!hitAny) setTimeout(()=>{},0);
}

/* ================= INTERAÇÃO / LOOT ================= */
let nearDoor=null, nearCont=null;
function scanInteract(){
  nearDoor=null; nearCont=null;
  let bd=1.5;
  WORLD.doors.forEach(d=>{ const dx=d.edge==='V'? d.x-player.x : d.x+0.5-player.x;
    const dz=d.edge==='V'? d.z+0.5-player.z : d.z-player.z;
    const dist=Math.hypot(dx,dz); if(dist<bd){ bd=dist; nearDoor=d; } });
  let bc=1.5;
  WORLD.containers.forEach(c=>{ const dist=Math.hypot(c.x+0.5-player.x,c.z+0.5-player.z);
    if(dist<bc){ bc=dist; nearCont=c; } });
  if(nearCont&&bc<=bd){ nearDoor=null; }
  else if(nearDoor){ nearCont=null; }
  const btn=$('#btnUse');
  if(nearDoor){ btn.classList.add('on'); $('#useLbl').textContent=nearDoor.open?'Fechar Porta':'Abrir Porta'; }
  else if(nearCont){ btn.classList.add('on'); $('#useLbl').textContent='Saquear: '+nearCont.name; }
  else btn.classList.remove('on');
}
function doInteract(){
  AU.ens();
  if(nearDoor){ WORLD.toggleDoor(nearDoor); AU.door(); emitNoise(player.x,player.z,5); return; }
  if(nearCont){ openLoot(nearCont); return; }
}
function openLoot(c){
  const sheet=$('#sheet'); sheet.classList.add('on');
  $('#sheetTitle').textContent='🎒 '+c.name;
  const list=$('#sheetList'); list.innerHTML='';
  if(!c.loot.length){ list.innerHTML='<div class="empty">Vazio... alguém passou aqui antes.</div>'; }
  c.loot.forEach((id,i)=>{
    const it=ITEMS[id];
    const d=document.createElement('div'); d.className='itemCard';
    d.innerHTML=`<span class="ic">${it.i}</span><span class="nm">${it.n}</span><button class="take">PEGAR</button>`;
    d.querySelector('.take').onclick=()=>{ if(player.inv.length>=8){ toast('Inventário cheio!'); return; }
      player.inv.push({id}); c.loot.splice(c.loot.indexOf(id),1); AU.loot(); openLoot(c); };
    list.appendChild(d);
  });
  if(c.loot.length){ const all=document.createElement('button'); all.className='takeAll'; all.textContent='PEGAR TUDO';
    all.onclick=()=>{ while(c.loot.length&&player.inv.length<8){ player.inv.push({id:c.loot.shift()}); }
      AU.loot(); if(c.loot.length) toast('Inventário cheio!'); openLoot(c); };
    list.appendChild(all); }
  $('#sheetClose').onclick=()=>sheet.classList.remove('on');
}
function toggleInv(){
  const sheet=$('#sheet');
  if(sheet.classList.contains('on')){ sheet.classList.remove('on'); return; }
  sheet.classList.add('on');
  $('#sheetTitle').textContent=`🎒 Inventário (${player.inv.length}/8)`;
  const list=$('#sheetList'); list.innerHTML='';
  if(!player.inv.length) list.innerHTML='<div class="empty">Nada nos bolsos.</div>';
  player.inv.forEach((slot,i)=>{
    const it=ITEMS[slot.id];
    const d=document.createElement('div'); d.className='itemCard';
    let act='';
    if(it.t==='eat')act='COMER'; else if(it.t==='drink')act='BEBER';
    else if(it.t==='heal')act='USAR'; else if(it.t==='pain')act='TOMAR';
    else if(it.t==='weapon')act=player.weapon===slot.id?'EQUIPADA':'EQUIPAR';
    d.innerHTML=`<span class="ic">${it.i}</span><span class="nm">${it.n}${player.weapon===slot.id?' ✔':''}</span>
      ${act?`<button class="take">${act}</button>`:''}<button class="drop">✕</button>`;
    const btn=d.querySelector('.take');
    if(btn) btn.onclick=()=>{ useItem(i); };
    d.querySelector('.drop').onclick=()=>{ if(player.weapon===slot.id)player.weapon=null; player.inv.splice(i,1); updateWeapon(); toggleInv(); toggleInv(); };
    list.appendChild(d);
  });
}
function useItem(i){
  const slot=player.inv[i], it=ITEMS[slot.id];
  if(it.t==='eat'){ player.hunger=Math.max(0,player.hunger-it.v); player.inv.splice(i,1); AU.eat(); toast('Você comeu: '+it.n); }
  else if(it.t==='drink'){ player.thirst=Math.max(0,player.thirst-it.v); player.inv.splice(i,1); AU.drink(); toast('Você bebeu: '+it.n); }
  else if(it.t==='heal'){ player.bleeding=false; player.hp=Math.min(100,player.hp+12); player.inv.splice(i,1); toast('Ferimento enfaixado.'); }
  else if(it.t==='pain'){ player.pain=Math.max(0,player.pain-60); player.inv.splice(i,1); toast('A dor passa aos poucos...'); }
  else if(it.t==='weapon'){ player.weapon=slot.id; updateWeapon(); toast(it.n+' equipada!'); }
  toggleInv(); toggleInv(); // refresh
}
function updateWeapon(){ player.rig.bat.visible=!!player.weapon; }
let toastT=null;
function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),1800); }

/* ================= CUTAWAY (paredes somem) ================= */
function updateCutaway(){
  const b=WORLD.buildingAt(player.x,player.z);
  WORLD.buildings.forEach(bd=>{
    const inside=bd===b;
    const tgt=inside?0.13:1;
    bd.fadeMats.forEach(m=>{ m.opacity+=(tgt-m.opacity)*0.25; m.transparent=true; });
    bd.roof.visible=!inside || bd.roofFade>0.02;
    if(inside){ bd.roof.visible=false; } else bd.roof.visible=true;
  });
}

/* ================= MARCADOR DE CONTAINER ================= */
let marker;
function initMarker(){ const c=document.createElement('canvas'); c.width=c.height=64; const g=c.getContext('2d');
  g.fillStyle='#ffd24a'; g.beginPath(); g.moveTo(32,58); g.lineTo(12,28); g.lineTo(52,28); g.fill();
  const t=new THREE.CanvasTexture(c);
  marker=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));
  marker.scale.set(0.6,0.6,1); marker.visible=false; scene.add(marker); }
function updateMarker(t){
  if(nearCont){ marker.visible=true; marker.position.set(nearCont.x+0.5, 2.2+Math.sin(t*4)*0.15, nearCont.z+0.5); }
  else if(nearDoor){ marker.visible=true;
    marker.position.set(nearDoor.edge==='V'?nearDoor.x:nearDoor.x+0.5, 2.6+Math.sin(t*4)*0.15, nearDoor.edge==='V'?nearDoor.z+0.5:nearDoor.z); }
  else marker.visible=false;
}

/* ================= SETUP ================= */
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
function updateCamera(){
  const px=player.x, pz=player.z;
  camera.position.set(px+CAMDIR.x*40, CAMDIR.y*40, pz+CAMDIR.z*40);
  camera.lookAt(px,0.8,pz);
}

/* ================= LOOP ================= */
let frame=0;
function loop(){
  requestAnimationFrame(loop);
  if(!running) return;
  const dt=Math.min(0.05,clock.getDelta());
  frame++;
  player.attackCd=Math.max(0,player.attackCd-dt);
  movePlayer(dt);
  zombies.forEach((z,i)=>updateZombie(z,dt,i));
  updateBlood(dt);
  updateSurvival(dt);
  updateDayNight(dt);
  updateMoodles();
  if(frame%5===0) scanInteract();
  updateCutaway();
  updateMarker(performance.now()/1000);
  updateCamera();
  if(redFlashT>0){ redFlashT-=dt; $('#redFlash').style.opacity=Math.max(0,redFlashT*1.4); }
  renderer.render(scene,camera);
}

/* ================= FLUXO ================= */
function startGame(){
  $('#menu').classList.remove('on'); $('#death').classList.remove('on'); $('#hud').classList.add('on');
  if(!scene){ initThree(); WORLD.build(scene); initBlood(); initMarker(); }
  // reset
  if(player&&player.rig) scene.remove(player.rig.group);
  zombies.forEach(z=>scene.remove(z.rig.group)); corpses.forEach(c=>scene.remove(c)); corpses=[];
  WORLD.containers.forEach(c=>{ c.opened=false; });
  player=newPlayer();
  player.rig=buildHuman({skin:'#d8a878',shirt:'#5a7a9a',pants:'#3a4252',hair:'#3a2a1a'});
  player.rig.group.position.set(player.x,0,player.z); scene.add(player.rig.group);
  updateWeapon();
  spawnZombies();
  gameMin=9*60; dead=false; running=true;
  $('#kills').textContent='0';
  clock.getDelta();
  toast('Encontre comida, água e uma arma. Sobreviva.');
}
window.addEventListener('load',()=>{
  setupInput();
  $('#btnStart').onclick=()=>{ AU.ens(); startGame(); };
  $('#btnHow').onclick=()=>$('#how').classList.toggle('on');
  $('#btnAgain').onclick=()=>startGame();
  loop();
});
/* hook de teste */
window.BZ={ get player(){return player;}, get zombies(){return zombies;}, get running(){return running;},
  tp(x,z){ player.x=x; player.z=z; }, setTime(h){ gameMin=Math.floor(gameMin/1440)*1440+h*60; },
  start:startGame, attack:doAttack, interact:doInteract, near:()=>({door:!!nearDoor,cont:nearCont?nearCont.name:null}) };
})();
