/* ========================================================================
   OBRA-PRIMA — motor do jogo (Three.js + Rapier)
   Posicionamento 3D livre, 20 fases, pontuação por tempo/peças, estrelas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import RAPIER from '../vendor/rapier.es.js';
import { MATERIALS, SHAPES, buildMesh } from './pieces.js';
import { LEVELS, buildQueue } from './levels.js';

let renderer, scene, camera, world, platform, ground, tableGroup, platBody;
const bodies=[];
let queue=[];
const clock=new THREE.Clock();
const raycaster=new THREE.Raycaster();

let ghost=null;
const gPos=new THREE.Vector3(0,3,0);
let gYaw=0, gPitch=0, gRoll=0;
const gQuat=new THREE.Quaternion();
let footprint=null, guideLine=null;

const G = {
  state:'menu', level:null, target:6, halfX:3.2, halfZ:2.6,
  pieces:0, budget:0, maxTop:0, anyTop:0, holdT:0, won:false,
  spawnY:0, contactY:0, touching:false, timeSec:0, outOfPieces:false, endGrace:0,
};
const cam={ az:0.62, el:0.58, distMul:1, tY:2 };
let SAVE={ unlocked:1, stars:{}, best:{} };

/* ---------------- BOOT ---------------- */
async function boot(){
  await RAPIER.init();
  loadSave(); initRenderer(); initScene(); initPhysics(); buildTable(3.2,2.6);
  addEventListener('resize', onResize);
  bindInput(); bindUI();
  animate();
  showScreen('menu');
  window.OP = api;
}

/* ---------------- RENDER ---------------- */
function initRenderer(){
  renderer=new THREE.WebGLRenderer({canvas:document.getElementById('c'), antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
}
function initScene(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x8fc7e8);
  scene.fog=new THREE.Fog(0x8fc7e8, 34, 82);
  camera=new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 300);

  const hemi=new THREE.HemisphereLight(0xffffff, 0x9a7b52, 0.85); scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff2d8, 1.35);
  sun.position.set(9,18,11); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
  const d=18; Object.assign(sun.shadow.camera,{left:-d,right:d,top:d*1.7,bottom:-d}); sun.shadow.camera.near=1; sun.shadow.camera.far=70;
  sun.shadow.bias=-0.0004; scene.add(sun); scene.add(sun.target);

  ground=new THREE.Mesh(new THREE.CircleGeometry(60,52), new THREE.MeshStandardMaterial({color:0xb99a6a, roughness:1}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-0.001; ground.receiveShadow=true; scene.add(ground);
  const grid=new THREE.GridHelper(60,60,0x8a6f45,0x9a825a); grid.position.y=0.002; grid.material.opacity=0.2; grid.material.transparent=true; scene.add(grid);

  G.targetGroup=new THREE.Group(); scene.add(G.targetGroup);

  footprint=new THREE.Mesh(new THREE.RingGeometry(0.02,0.02,4), new THREE.MeshBasicMaterial({color:0x35d07a,transparent:true,opacity:0.9,side:THREE.DoubleSide}));
  footprint.rotation.x=-Math.PI/2; footprint.visible=false; scene.add(footprint);
  guideLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),
    new THREE.LineDashedMaterial({color:0x35d07a,dashSize:0.14,gapSize:0.1,transparent:true,opacity:0.8}));
  guideLine.visible=false; scene.add(guideLine);
}
function buildTable(hx,hz){
  G.halfX=hx; G.halfZ=hz;
  if(tableGroup){ scene.remove(tableGroup); }
  tableGroup=new THREE.Group(); scene.add(tableGroup);
  platform=new THREE.Mesh(new THREE.BoxGeometry(hx*2,0.6,hz*2), new THREE.MeshStandardMaterial({color:0xabb0b6, roughness:0.95}));
  platform.position.y=-0.3; platform.receiveShadow=true; platform.castShadow=true; platform.name='table'; tableGroup.add(platform);
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(hx*2+0.05,0.14,hz*2+0.05), new THREE.MeshStandardMaterial({color:0xe8b930, roughness:0.8}));
  stripe.position.y=-0.02; tableGroup.add(stripe);
  const tg=new THREE.GridHelper(Math.max(hx,hz)*2, Math.round(Math.max(hx,hz)*2), 0x6f7783, 0x8a929e);
  tg.position.y=0.006; tg.scale.set(hx/Math.max(hx,hz),1,hz/Math.max(hx,hz)); tg.material.opacity=0.32; tg.material.transparent=true; tableGroup.add(tg);
  for(const [sx,sz] of [[-1,-1],[1,-1],[-1,1],[1,1]]){ const c=new THREE.Mesh(new THREE.ConeGeometry(0.3,0.7,16),new THREE.MeshStandardMaterial({color:0xe8642a,roughness:0.7}));
    c.position.set(sx*(hx+0.9),0.35,sz*(hz+0.9)); c.castShadow=true; tableGroup.add(c); }
  // física da mesa
  if(platBody) world.removeRigidBody(platBody);
  platBody=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(hx,0.3,hz).setTranslation(0,-0.3,0).setFriction(0.92), platBody);
}
function buildTargetLine(){
  G.targetGroup.clear();
  const w=G.halfX*2+2.0, dz=G.halfZ+0.4;
  for(const z of [-dz,dz]){ const bar=new THREE.Mesh(new THREE.BoxGeometry(w,0.05,0.05), new THREE.MeshStandardMaterial({color:0x35d07a, emissive:0x0a5a30, emissiveIntensity:0.7})); bar.position.z=z; G.targetGroup.add(bar); }
  for(const x of [-w/2,w/2]){ const bar=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,dz*2), new THREE.MeshStandardMaterial({color:0x35d07a, emissive:0x0a5a30, emissiveIntensity:0.7})); bar.position.x=x; G.targetGroup.add(bar); }
  G.targetGroup.position.y=G.target;
}

/* ---------------- FÍSICA ---------------- */
function initPhysics(){
  world=new RAPIER.World({x:0,y:-19,z:0}); world.timestep=1/60;
  const gb=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(60,0.5,60).setTranslation(0,-0.5,0).setFriction(0.9), gb);
}
function addColliders(body, shapeId, matId){
  const S=SHAPES[shapeId], M=MATERIALS[matId];
  for(const cd of S.col){ let desc;
    if(cd.t==='box') desc=RAPIER.ColliderDesc.cuboid(cd.h[0],cd.h[1],cd.h[2]);
    else if(cd.t==='ball') desc=RAPIER.ColliderDesc.ball(cd.r);
    else if(cd.t==='cyl') desc=RAPIER.ColliderDesc.cylinder(cd.hh,cd.r);
    else if(cd.t==='cone') desc=RAPIER.ColliderDesc.cone(cd.hh,cd.r);
    else if(cd.t==='convex') desc=RAPIER.ColliderDesc.convexHull(cd.pts)||RAPIER.ColliderDesc.cuboid(...S.half);
    if(cd.p) desc.setTranslation(cd.p[0],cd.p[1],cd.p[2]);
    desc.setFriction(M.friction).setRestitution(M.restitution).setDensity(M.density);
    world.createCollider(desc, body);
  }
}

/* ---------------- FANTASMA ---------------- */
function spawnGhost(){
  if(!queue.length){ G.outOfPieces=true; return; }
  const p=queue[0];
  ghost=buildMesh(p.shape,p.mat);
  ghost.traverse(o=>{ if(o.material){ o.material.transparent=true; o.material.opacity=(o.material.opacity??1)*0.5; }});
  gPos.set(0, Math.max(G.maxTop,0.4)+1.3, 0); gYaw=0; gPitch=0; gRoll=0;
  scene.add(ghost); updateGhost(); updateHUD();
}
const _box=new THREE.Box3();
function updateGhost(){
  if(!ghost){ if(footprint)footprint.visible=false; if(guideLine)guideLine.visible=false; return; }
  gQuat.setFromEuler(new THREE.Euler(gPitch,gYaw,gRoll,'YXZ'));
  ghost.position.copy(gPos); ghost.quaternion.copy(gQuat);
  raycaster.set(new THREE.Vector3(gPos.x, gPos.y+40, gPos.z), new THREE.Vector3(0,-1,0));
  const hits=raycaster.intersectObjects([platform, ...bodies.map(b=>b.mesh)], true).filter(h=>h.point.y<=gPos.y+0.01);
  const surfY = hits.length? hits[0].point.y : 0; G.contactY=surfY;
  _box.setFromObject(ghost); const bottom=_box.min.y;
  G.touching = (bottom-surfY) < 0.12;
  const col=G.touching? 0x35d07a : 0xffd24a;
  if(footprint){ footprint.visible=true; footprint.position.set(gPos.x, surfY+0.02, gPos.z);
    const r=Math.max(0.35,(_box.max.x-_box.min.x)*0.5); footprint.geometry.dispose(); footprint.geometry=new THREE.RingGeometry(r*0.85,r,28); footprint.material.color.setHex(col); }
  if(guideLine){ guideLine.visible=true; guideLine.geometry.setFromPoints([new THREE.Vector3(gPos.x,surfY+0.02,gPos.z), new THREE.Vector3(gPos.x,bottom,gPos.z)]); guideLine.computeLineDistances(); guideLine.material.color.setHex(col); }
}
function settleGhostDown(){ if(!ghost) return; _box.setFromObject(ghost); const drop=_box.min.y-G.contactY-0.005; if(drop>0) gPos.y-=drop; updateGhost(); syncHeightSlider(); }
function placePiece(){
  if(!ghost || G.state!=='play') return;
  const p=queue.shift();
  const body=world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(gPos.x,gPos.y,gPos.z)
    .setRotation({x:gQuat.x,y:gQuat.y,z:gQuat.z,w:gQuat.w}).setLinvel(0,0,0).setLinearDamping(0.05).setAngularDamping(0.14));
  addColliders(body,p.shape,p.mat);
  const mesh=buildMesh(p.shape,p.mat); scene.add(mesh);
  const rec={mesh,body,tDrop:performance.now(),speed:9}; bodies.push(rec);
  scene.remove(ghost); ghost=null; G.pieces++; playThunk();
  G.awaitSettle=rec; updateGhost(); updateHUD();
}

/* ---------------- FASE / LOOP ---------------- */
function startLevel(levelObj){
  for(const b of bodies){ scene.remove(b.mesh); world.removeRigidBody(b.body); } bodies.length=0;
  if(ghost){scene.remove(ghost);ghost=null;}
  G.level=levelObj; G.target=levelObj.target; G.budget=levelObj.budget; G.par=levelObj.par;
  G.pieces=0; G.maxTop=0; G.anyTop=0; G.holdT=0; G.won=false; G.timeSec=0; G.outOfPieces=false; G.endGrace=0; G.state='play';
  buildTable(levelObj.halfX, levelObj.halfZ); buildTargetLine();
  queue=buildQueue(levelObj); cam.distMul=1;
  document.getElementById('lvlTag').textContent='FASE '+levelObj.n+' · '+levelObj.name;
  spawnGhost(); updateHUD(); showScreen('play');
}
function animate(){ requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.033);
  if(world && G.level){ world.step(); syncBodies(dt); if(G.state==='play'){ G.timeSec+=dt; updateTimerHUD(); } }
  updateCamera(dt); renderer.render(scene,camera);
}
function syncBodies(dt){
  let settledTop=0, anyTop=0, allSlow=true;
  for(const b of bodies){
    const t=b.body.translation(), r=b.body.rotation();
    b.mesh.position.set(t.x,t.y,t.z); b.mesh.quaternion.set(r.x,r.y,r.z,r.w);
    const v=b.body.linvel(), av=b.body.angvel(); b.speed=Math.hypot(v.x,v.y,v.z)+Math.hypot(av.x,av.y,av.z)*0.25;
    if(t.y<-2){ b.fallen=true; continue; }
    _box.setFromObject(b.mesh); const topY=_box.max.y; anyTop=Math.max(anyTop,topY);
    if(b.speed<0.55) settledTop=Math.max(settledTop,topY); else allSlow=false;
  }
  G.maxTop=settledTop; G.anyTop=anyTop; G.settled=allSlow;
  if(G.awaitSettle){ const b=G.awaitSettle;
    if(b.fallen || b.speed<0.55 || performance.now()-b.tDrop>2600){ G.awaitSettle=null; if(G.state==='play'){ if(queue.length) spawnGhost(); else G.outOfPieces=true; } } }
  if(G.state==='play') checkEnd(dt);
  updateHUD();
}
function checkEnd(dt){
  if(G.maxTop>=G.target && G.settled){ G.holdT+=dt; } else { G.holdT=Math.max(0,G.holdT-dt*0.6); }
  const need=2.0;
  document.getElementById('holdWrap').style.opacity = (G.holdT>0.05 && G.maxTop>=G.target)?'1':'0';
  document.getElementById('holdFill').style.width=Math.min(100,(G.holdT/need)*100)+'%';
  if(G.holdT>=need){ endLevel(true); return; }
  if(G.outOfPieces && !ghost && !G.awaitSettle && G.settled && G.maxTop<G.target){ G.endGrace+=dt; if(G.endGrace>1.6) endLevel(false); }
}
function endLevel(won){
  if(G.state!=='play') return;
  G.state = won?'won':'lost'; G.won=won; if(ghost){scene.remove(ghost);ghost=null;}
  if(won) playFanfare(); else playFail();
  showResult(won);
}

/* ---------------- PONTUAÇÃO ---------------- */
function computeResult(){
  const lv=G.level, t=G.timeSec;
  const pieceBonus=Math.max(0, G.budget-G.pieces)*120;
  const heightBonus=Math.round(Math.max(0,G.maxTop-G.target)*80);
  const timeBonus=Math.max(0, Math.round(lv.par*10 - t)*12);
  const base=1000, score=base+pieceBonus+heightBonus+timeBonus;
  let stars=1; if(G.pieces<=lv.par+2) stars=2; if(G.pieces<=lv.par && t<=lv.par*9) stars=3;
  return {score,stars,pieceBonus,heightBonus,timeBonus,base,t,pieces:G.pieces};
}

/* ---------------- CÂMERA ---------------- */
function updateCamera(dt){
  const base=Math.max(G.target||6, G.anyTop||0, gPos.y+0.6)+1.4;
  const viewTop = G.level? base : 6;
  const center=viewTop*0.5;
  const vFov=camera.fov*Math.PI/180;
  let dist=((viewTop*0.55+1.2)/Math.tan(vFov/2))*cam.distMul;
  dist=THREE.MathUtils.clamp(dist,7,95);
  cam.tY += (center-cam.tY)*Math.min(1,dt*2.4);
  const ce=Math.cos(cam.el), se=Math.sin(cam.el);
  const desired=new THREE.Vector3(Math.sin(cam.az)*ce*dist, cam.tY+se*dist, Math.cos(cam.az)*ce*dist);
  camera.position.lerp(desired, Math.min(1,dt*3));
  camera.lookAt(0,cam.tY,0);
  if(G.targetGroup) G.targetGroup.position.y=G.target;
}

/* ---------------- INPUT ---------------- */
const pointers=new Map(); let orbitLock=false, orbitPrev=null, pinchPrev=0, armAt=0;
function orbitMid(){ const p=[...pointers.values()]; if(!p.length)return null; return {x:p.reduce((s,q)=>s+q.x,0)/p.length, y:p.reduce((s,q)=>s+q.y,0)/p.length}; }
function pinchDist(){ const p=[...pointers.values()]; return p.length>=2?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0; }
function setOrbitRef(){ orbitPrev=orbitMid(); pinchPrev=pinchDist(); }
function bindInput(){
  const cv=renderer.domElement;
  cv.addEventListener('pointerdown',e=>{ if(G.state!=='play')return; try{cv.setPointerCapture(e.pointerId);}catch(_){} pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size>=2 || e.button===2 || e.button===1){ orbitLock=true; setOrbitRef(); }
    // 1 dedo: NÃO move ao tocar. Arma o movimento e espera 90ms pra ver se vem um 2º dedo.
    else { armAt=performance.now()+90; }
  });
  cv.addEventListener('pointermove',e=>{ if(!pointers.has(e.pointerId))return; pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(orbitLock || pointers.size>=2){ const m=orbitMid();
      if(orbitPrev&&m){ cam.az-=(m.x-orbitPrev.x)*0.006; cam.el=THREE.MathUtils.clamp(cam.el+(m.y-orbitPrev.y)*0.005,0.12,1.45); } orbitPrev=m;
      if(pointers.size>=2){ const d=pinchDist(); if(pinchPrev&&d) cam.distMul=THREE.MathUtils.clamp(cam.distMul*(pinchPrev/d),0.45,2.4); pinchPrev=d; }
    } else if(pointers.size===1 && !orbitLock && performance.now()>=armAt){ movePieceTo(e.clientX,e.clientY); } });
  const up=e=>{ pointers.delete(e.pointerId); if(pointers.size===0){ orbitLock=false; orbitPrev=null; pinchPrev=0; armAt=0; } else setOrbitRef(); };
  cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',up);
  cv.addEventListener('contextmenu',e=>e.preventDefault());
  cv.addEventListener('wheel',e=>{ cam.distMul=THREE.MathUtils.clamp(cam.distMul*(1+Math.sign(e.deltaY)*0.08),0.45,2.4); },{passive:true});

  document.getElementById('hslider').addEventListener('input',e=>{ const t=+e.target.value/100; gPos.y=THREE.MathUtils.lerp(0.3, Math.max(G.target,G.maxTop)+3.2, t); updateGhost(); });
  document.getElementById('btnRot').onclick=()=>{ gYaw+=Math.PI/4; updateGhost(); };
  document.getElementById('btnFlip').onclick=()=>{ gPitch+=Math.PI/2; updateGhost(); };
  document.getElementById('btnRest').onclick=()=>settleGhostDown();
  document.getElementById('btnDrop').onclick=()=>placePiece();
  addEventListener('keydown',e=>{ if(G.state!=='play')return; const s=0.18;
    if(e.key==='ArrowLeft')gPos.x-=s; else if(e.key==='ArrowRight')gPos.x+=s; else if(e.key==='ArrowUp')gPos.z-=s; else if(e.key==='ArrowDown')gPos.z+=s;
    else if(e.key==='w')gPos.y+=s; else if(e.key==='s')gPos.y-=s; else if(e.key==='q')cam.az-=0.15; else if(e.key==='e')cam.az+=0.15;
    else if(e.key==='r')gYaw+=Math.PI/4; else if(e.key==='f')gPitch+=Math.PI/2; else if(e.key==='g')settleGhostDown();
    else if(e.code==='Space'){e.preventDefault();placePiece();} else return; clampGhost(); updateGhost(); syncHeightSlider(); });
}
function movePieceTo(cx,cy){ if(!ghost)return;
  const ndc=new THREE.Vector2((cx/innerWidth)*2-1, -(cy/innerHeight)*2+1); raycaster.setFromCamera(ndc,camera);
  const plane=new THREE.Plane(new THREE.Vector3(0,1,0), -gPos.y), hit=new THREE.Vector3();
  if(raycaster.ray.intersectPlane(plane,hit)){ gPos.x=hit.x; gPos.z=hit.z; clampGhost(); updateGhost(); } }
function clampGhost(){ const m=1.3; gPos.x=THREE.MathUtils.clamp(gPos.x,-(G.halfX+m),G.halfX+m); gPos.z=THREE.MathUtils.clamp(gPos.z,-(G.halfZ+m),G.halfZ+m); gPos.y=THREE.MathUtils.clamp(gPos.y,0.3,Math.max(G.target,G.maxTop)+4.5); }
function syncHeightSlider(){ const hs=document.getElementById('hslider'); const top=Math.max(G.target,G.maxTop)+3.2; hs.value=Math.round(THREE.MathUtils.clamp((gPos.y-0.3)/(top-0.3),0,1)*100); }

/* ---------------- HUD ---------------- */
function updateHUD(){
  const set=(id,v)=>{ const e=document.getElementById(id); if(e)e.textContent=v; };
  set('hHeight', G.maxTop.toFixed(1)+'m'); set('hTarget', G.target.toFixed(1)+'m');
  set('hPieces', G.pieces+'/'+G.budget);
  const nx=queue[0]; set('hNext', nx? SHAPES[nx.shape].name+' · '+MATERIALS[nx.mat].name : '—');
}
function updateTimerHUD(){ const s=G.timeSec; document.getElementById('hTime').textContent=(s<60? s.toFixed(0)+'s' : (s/60|0)+':'+String((s%60|0)).padStart(2,'0')); }

/* ---------------- TELAS (UI) ---------------- */
function showScreen(name){
  document.getElementById('scr-menu').style.display = name==='menu'?'':'none';
  document.getElementById('scr-levelSelect').style.display = name==='levelSelect'?'':'none';
  document.getElementById('scr-result').style.display = name==='result'?'':'none';
  document.getElementById('play').style.display = name==='play'?'':'none';
}
function bindUI(){
  document.getElementById('btnPlay').onclick=()=>openLevelSelect();
  document.getElementById('btnBackMenu').onclick=()=>showScreen('menu');
  document.getElementById('btnPause').onclick=()=>{ openLevelSelect(); };
}
function openLevelSelect(){
  const grid=document.getElementById('lvlGrid'); grid.innerHTML='';
  LEVELS.forEach(lv=>{ const locked=lv.n>SAVE.unlocked; const st=SAVE.stars[lv.n]||0;
    const d=document.createElement('button'); d.className='lvlCard'+(locked?' locked':'');
    d.innerHTML=`<div class="ln">${lv.n}</div><div class="lname">${lv.name}</div><div class="lstars">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><div class="lt">${lv.target}m</div>`;
    if(!locked) d.onclick=()=>startLevel(lv); grid.appendChild(d); });
  showScreen('levelSelect');
}
function showResult(won){
  const r=computeResult();
  const el=document.getElementById('scr-result');
  const stars=won? r.stars : 0;
  if(won){ SAVE.stars[G.level.n]=Math.max(SAVE.stars[G.level.n]||0, stars); SAVE.best[G.level.n]=Math.max(SAVE.best[G.level.n]||0, r.score);
    SAVE.unlocked=Math.max(SAVE.unlocked, Math.min(LEVELS.length, G.level.n+1)); saveSave(); }
  document.getElementById('resTitle').textContent = won? 'FASE CONCLUÍDA!' : 'NÃO ATINGIU O ALVO';
  document.getElementById('resTitle').className = 'resTitle '+(won?'win':'lose');
  document.getElementById('resStars').innerHTML = won? [0,1,2].map(i=>`<span class="rstar ${i<stars?'on':''}">★</span>`).join('') : '';
  document.getElementById('resBody').innerHTML = won?
    `<div class="rrow"><span>Altura</span><b>${G.maxTop.toFixed(1)}m / ${G.target}m</b></div>
     <div class="rrow"><span>Peças usadas</span><b>${r.pieces}/${G.budget}</b></div>
     <div class="rrow"><span>Tempo</span><b>${r.t.toFixed(0)}s</b></div>
     <div class="rrow sub"><span>Base</span><b>+${r.base}</b></div>
     <div class="rrow sub"><span>Bônus peças</span><b>+${r.pieceBonus}</b></div>
     <div class="rrow sub"><span>Bônus tempo</span><b>+${r.timeBonus}</b></div>
     <div class="rrow sub"><span>Bônus altura</span><b>+${r.heightBonus}</b></div>
     <div class="rrow total"><span>PONTOS</span><b>${r.score}</b></div>`
    : `<div class="rrow"><span>Altura alcançada</span><b>${G.maxTop.toFixed(1)}m / ${G.target}m</b></div>
       <div class="rmsg">Acabaram as peças antes do alvo. Tente uma base mais firme e aproveite melhor cada peça!</div>`;
  const btns=document.getElementById('resBtns'); btns.innerHTML='';
  const mk=(txt,cls,fn)=>{ const b=document.createElement('button'); b.className='btn2 '+cls; b.textContent=txt; b.onclick=fn; btns.appendChild(b); };
  if(won && G.level.n<LEVELS.length) mk('PRÓXIMA FASE ›','prime',()=>startLevel(LEVELS[G.level.n]));
  mk('REFAZER','sec',()=>startLevel(G.level));
  mk('FASES','sec',()=>openLevelSelect());
  showScreen('result');
}

/* ---------------- SAVE ---------------- */
function loadSave(){ try{ SAVE=Object.assign({unlocked:1,stars:{},best:{}}, JSON.parse(localStorage.getItem('op_save'))||{}); }catch(e){} }
function saveSave(){ try{ localStorage.setItem('op_save', JSON.stringify(SAVE)); }catch(e){} }

/* ---------------- ÁUDIO ---------------- */
let AC; function ac(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); return AC; }
function blip(f,d,type,g){ try{ const c=ac(),o=c.createOscillator(),ga=c.createGain(); o.type=type||'sine'; o.frequency.value=f; ga.gain.value=g||0.12;
  o.connect(ga).connect(c.destination); o.start(); ga.gain.exponentialRampToValueAtTime(0.001,c.currentTime+(d||0.12)); o.stop(c.currentTime+(d||0.12)); }catch(e){} }
function playThunk(){ blip(150,0.13,'square',0.13); }
function playFanfare(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>blip(f,0.18,'triangle',0.12),i*90)); }
function playFail(){ [330,247,196].forEach((f,i)=>setTimeout(()=>blip(f,0.22,'sawtooth',0.1),i*130)); }

function onResize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }

/* ---------------- API teste ---------------- */
const api={ get G(){return G;}, get SAVE(){return SAVE;}, get gPos(){return gPos;},
  start:(n)=>startLevel(LEVELS[(n||1)-1]), levels:()=>LEVELS.length,
  moveTo:(x,z)=>{gPos.x=x;gPos.z=z;clampGhost();updateGhost();}, height:(y)=>{gPos.y=y;clampGhost();updateGhost();syncHeightSlider();},
  rest:()=>settleGhostDown(), rot:()=>{gYaw+=Math.PI/4;updateGhost();}, flip:()=>{gPitch+=Math.PI/2;updateGhost();},
  place:()=>placePiece(), orbit:(a,e)=>{cam.az=a;cam.el=e;},
  screen:()=>{ if(document.getElementById('play').style.display!=='none')return 'play'; return ['menu','levelSelect','result'].find(s=>document.getElementById('scr-'+s).style.display!=='none'); },
  bodies:()=>bodies.length };

boot();
