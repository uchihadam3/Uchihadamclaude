/* ========================================================================
   OBRA-PRIMA — motor do jogo (Three.js + Rapier)
   Posicionamento 100% 3D: mova a peça na mesa (X/Z + profundidade), suba/
   desça (Y), gire, e COLOQUE de leve em qualquer lugar. Câmera orbita.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import RAPIER from '../vendor/rapier.es.js';
import { MATERIALS, SHAPES, SHAPE_IDS, buildMesh } from './pieces.js';

let renderer, scene, camera, world, platform, ground;
const bodies=[];
let queue=[];
const clock=new THREE.Clock();
const raycaster=new THREE.Raycaster();

/* peça-fantasma (controlável em 3D) */
let ghost=null;
const gPos=new THREE.Vector3(0,3,0);
let gYaw=0, gPitch=0, gRoll=0;
const gQuat=new THREE.Quaternion();
let footprint=null, guideLine=null;

const G = {
  state:'menu', target:6, pieces:0, maxTop:0, anyTop:0, holdT:0, won:false,
  halfX:3.2, halfZ:2.6, spawnY:0, contactY:0, touching:false,
};

/* câmera orbital */
const cam={ az:0.62, el:0.62, distMul:1, tY:2 };

/* ---------------- BOOT ---------------- */
async function boot(){
  await RAPIER.init();
  initRenderer(); initScene(); initPhysics();
  addEventListener('resize', onResize);
  bindInput();
  animate();
  startLevel({ target:6, queue:autoQueue(40) });
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
  scene.fog=new THREE.Fog(0x8fc7e8, 34, 80);
  camera=new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 300);

  const hemi=new THREE.HemisphereLight(0xffffff, 0x9a7b52, 0.85); scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff2d8, 1.35);
  sun.position.set(9,18,11); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
  const d=18; Object.assign(sun.shadow.camera,{left:-d,right:d,top:d*1.7,bottom:-d}); sun.shadow.camera.near=1; sun.shadow.camera.far=70;
  sun.shadow.bias=-0.0004; scene.add(sun); scene.add(sun.target);

  // chão
  ground=new THREE.Mesh(new THREE.CircleGeometry(60,52), new THREE.MeshStandardMaterial({color:0xb99a6a, roughness:1}));
  ground.rotation.x=-Math.PI/2; ground.position.y=-0.001; ground.receiveShadow=true; scene.add(ground);
  const grid=new THREE.GridHelper(60,60,0x8a6f45,0x9a825a); grid.position.y=0.002; grid.material.opacity=0.22; grid.material.transparent=true; scene.add(grid);

  // MESA (plataforma larga)
  const hx=G.halfX, hz=G.halfZ;
  platform=new THREE.Mesh(new THREE.BoxGeometry(hx*2,0.6,hz*2),
    new THREE.MeshStandardMaterial({color:0xabb0b6, roughness:0.95}));
  platform.position.y=-0.3; platform.receiveShadow=true; platform.castShadow=true; platform.name='table'; scene.add(platform);
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(hx*2+0.05,0.14,hz*2+0.05),
    new THREE.MeshStandardMaterial({color:0xe8b930, roughness:0.8}));
  stripe.position.y=-0.02; scene.add(stripe);
  // grade da mesa (ajuda a ler profundidade)
  const tg=new THREE.GridHelper(Math.max(hx,hz)*2, Math.round(Math.max(hx,hz)*2), 0x6f7783, 0x8a929e);
  tg.position.y=0.005; tg.material.opacity=0.35; tg.material.transparent=true; scene.add(tg);

  // cones decorativos
  for(const [sx,sz] of [[-1,-1],[1,-1],[-1,1],[1,1]]){ const c=new THREE.Mesh(new THREE.ConeGeometry(0.32,0.75,18),new THREE.MeshStandardMaterial({color:0xe8642a,roughness:0.7}));
    c.position.set(sx*(hx+1.1),0.38,sz*(hz+1.1)); c.castShadow=true; scene.add(c); }

  // linha-alvo
  G.targetGroup=new THREE.Group(); scene.add(G.targetGroup); buildTargetLine();

  // fantasma: sombra-guia + linha vertical
  footprint=new THREE.Mesh(new THREE.RingGeometry(0.02,0.02,4), new THREE.MeshBasicMaterial({color:0x35d07a,transparent:true,opacity:0.9,side:THREE.DoubleSide}));
  footprint.rotation.x=-Math.PI/2; scene.add(footprint);
  guideLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),
    new THREE.LineDashedMaterial({color:0x35d07a,dashSize:0.14,gapSize:0.1,transparent:true,opacity:0.8}));
  scene.add(guideLine);
}
function buildTargetLine(){
  G.targetGroup.clear();
  const w=G.halfX*2+2.2, dz=G.halfZ;
  for(const z of [-dz,dz]){ const bar=new THREE.Mesh(new THREE.BoxGeometry(w,0.05,0.05),
    new THREE.MeshStandardMaterial({color:0x35d07a, emissive:0x0a5a30, emissiveIntensity:0.7}));
    bar.position.z=z; G.targetGroup.add(bar); }
  for(const x of [-w/2,w/2]){ const bar=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,dz*2),
    new THREE.MeshStandardMaterial({color:0x35d07a, emissive:0x0a5a30, emissiveIntensity:0.7}));
    bar.position.x=x; G.targetGroup.add(bar); }
  G.targetGroup.position.y=G.target;
}

/* ---------------- FÍSICA ---------------- */
function initPhysics(){
  world=new RAPIER.World({x:0,y:-19,z:0}); world.timestep=1/60;
  const gb=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(60,0.5,60).setTranslation(0,-0.5,0).setFriction(0.9), gb);
  const pb=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(G.halfX,0.3,G.halfZ).setTranslation(0,-0.3,0).setFriction(0.92), pb);
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

/* ---------------- PEÇAS / FANTASMA ---------------- */
function autoQueue(n){ const q=[];
  const shapes=['cubo','caixa','tabua','viga','cubo','caixa','tabua','cilindro'];
  const mats=['madeira','caixote','pedra','concreto'];
  for(let i=0;i<n;i++) q.push({shape:shapes[(Math.random()*shapes.length)|0], mat:mats[(Math.random()*mats.length)|0]});
  return q; }

function spawnGhost(){
  if(!queue.length) return;
  const p=queue[0];
  ghost=buildMesh(p.shape,p.mat);
  ghost.traverse(o=>{ if(o.material){ o.material.transparent=true; o.material.opacity=(o.material.opacity??1)*0.5; }});
  ghost.userData.baseOpacity=true;
  gPos.set(0, Math.max(G.maxTop,0.4)+1.3, 0); gYaw=0; gPitch=0; gRoll=0;
  scene.add(ghost); updateGhost(); updateHUD();
}
function updateGhost(){
  if(!ghost){ if(footprint)footprint.visible=false; if(guideLine)guideLine.visible=false; return; }
  gQuat.setFromEuler(new THREE.Euler(gPitch,gYaw,gRoll,'YXZ'));
  ghost.position.copy(gPos); ghost.quaternion.copy(gQuat);
  // superfície abaixo (raycast pra baixo)
  raycaster.set(new THREE.Vector3(gPos.x, gPos.y+40, gPos.z), new THREE.Vector3(0,-1,0));
  const targets=[platform, ...bodies.map(b=>b.mesh)];
  const hits=raycaster.intersectObjects(targets, true).filter(h=>h.point.y<=gPos.y+0.01);
  const surfY = hits.length? hits[0].point.y : 0;
  G.contactY=surfY;
  // base da peça
  _box.setFromObject(ghost); const bottom=_box.min.y;
  G.touching = (bottom-surfY) < 0.12;
  // cor do fantasma conforme contato
  const col=G.touching? 0x35d07a : 0xffd24a;
  ghost.traverse(o=>{ if(o.isMesh && o.material && o.material.emissive!==undefined){ o.material.emissive.setHex(G.touching?0x0a3a20:0x000000); }});
  // sombra-guia + linha vertical
  if(footprint){ footprint.visible=true; footprint.position.set(gPos.x, surfY+0.02, gPos.z);
    const r=Math.max(0.35, (_box.max.x-_box.min.x)*0.5);
    footprint.geometry.dispose(); footprint.geometry=new THREE.RingGeometry(r*0.86,r,28);
    footprint.material.color.setHex(col); }
  if(guideLine){ guideLine.visible=true;
    guideLine.geometry.setFromPoints([new THREE.Vector3(gPos.x,surfY+0.02,gPos.z), new THREE.Vector3(gPos.x,bottom,gPos.z)]);
    guideLine.computeLineDistances(); guideLine.material.color.setHex(col); }
}
function settleGhostDown(){ // "ENCOSTAR": desce até tocar
  if(!ghost) return;
  _box.setFromObject(ghost); const bottom=_box.min.y;
  const drop=bottom-G.contactY-0.005;
  if(drop>0) gPos.y-=drop;
  updateGhost();
}
function placePiece(){
  if(!ghost || G.state!=='play') return;
  const p=queue.shift();
  const body=world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(gPos.x,gPos.y,gPos.z)
    .setRotation({x:gQuat.x,y:gQuat.y,z:gQuat.z,w:gQuat.w})
    .setLinvel(0,0,0).setLinearDamping(0.05).setAngularDamping(0.14));
  addColliders(body,p.shape,p.mat);
  const mesh=buildMesh(p.shape,p.mat); scene.add(mesh);
  const rec={mesh,body,shape:p.shape,tDrop:performance.now(),speed:9}; bodies.push(rec);
  scene.remove(ghost); ghost=null;
  G.pieces++; playThunk();
  G.awaitSettle=rec; updateGhost(); updateHUD();
}

/* ---------------- NÍVEL / LOOP ---------------- */
function startLevel(cfg){
  for(const b of bodies){ scene.remove(b.mesh); world.removeRigidBody(b.body); }
  bodies.length=0; if(ghost){scene.remove(ghost);ghost=null;}
  G.target=cfg.target; G.pieces=0; G.maxTop=0; G.anyTop=0; G.holdT=0; G.won=false; G.state='play';
  queue=cfg.queue.slice(); buildTargetLine(); spawnGhost(); updateHUD();
}
function animate(){ requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.033);
  if(world && G.state!=='menu'){ world.step(); syncBodies(dt); }
  updateCamera(dt); renderer.render(scene,camera);
}
const _box=new THREE.Box3();
function syncBodies(dt){
  let settledTop=0, anyTop=0, allSlow=true;
  for(const b of bodies){
    const t=b.body.translation(), r=b.body.rotation();
    b.mesh.position.set(t.x,t.y,t.z); b.mesh.quaternion.set(r.x,r.y,r.z,r.w);
    const v=b.body.linvel(), av=b.body.angvel();
    b.speed=Math.hypot(v.x,v.y,v.z)+Math.hypot(av.x,av.y,av.z)*0.25;
    if(t.y<-2){ b.fallen=true; continue; }
    _box.setFromObject(b.mesh); const topY=_box.max.y;
    anyTop=Math.max(anyTop,topY);
    if(b.speed<0.55) settledTop=Math.max(settledTop,topY); else allSlow=false;
  }
  G.maxTop=settledTop; G.anyTop=anyTop; G.settled=allSlow;
  if(G.awaitSettle){ const b=G.awaitSettle;
    if(b.fallen || b.speed<0.55 || performance.now()-b.tDrop>2600){ G.awaitSettle=null; if(G.state==='play') spawnGhost(); } }
  checkWin(dt); updateHUD();
}
function checkWin(dt){
  if(G.won||G.state!=='play') return;
  if(G.maxTop>=G.target && G.settled){ G.holdT+=dt; } else { G.holdT=Math.max(0,G.holdT-dt*0.6); }
  if(G.holdT>=2.2) win();
}
function win(){ G.won=true; G.state='won'; if(ghost){scene.remove(ghost);ghost=null;} playFanfare();
  const el=document.getElementById('banner'); el.textContent='✅ ALTURA ATINGIDA!'; el.className='banner win show';
  setTimeout(()=>el.classList.remove('show'),2800);
}

/* ---------------- CÂMERA ORBITAL ---------------- */
function updateCamera(dt){
  const viewTop=Math.max(G.target, G.anyTop||0, gPos.y+0.6)+1.4;
  const center=viewTop*0.5;
  const vFov=camera.fov*Math.PI/180;
  let dist=((viewTop*0.55+1.2)/Math.tan(vFov/2))*cam.distMul;
  dist=THREE.MathUtils.clamp(dist,7,90);
  cam.tY += (center-cam.tY)*Math.min(1,dt*2.4);
  const ce=Math.cos(cam.el), se=Math.sin(cam.el);
  const desired=new THREE.Vector3(Math.sin(cam.az)*ce*dist, cam.tY+se*dist, Math.cos(cam.az)*ce*dist);
  camera.position.lerp(desired, Math.min(1,dt*3));
  camera.lookAt(0,cam.tY,0);
  if(G.targetGroup) G.targetGroup.position.y=G.target;
}

/* ---------------- INPUT (3D livre + órbita) ---------------- */
const pointers=new Map(); let mode=null, orbitPrev=null, pinchPrev=0;
function bindInput(){
  const cv=renderer.domElement;
  cv.addEventListener('pointerdown',e=>{ cv.setPointerCapture(e.pointerId); pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1){ mode = (e.button===2||e.button===1)?'orbit':'move'; if(mode==='move') movePieceTo(e.clientX,e.clientY); orbitPrev={x:e.clientX,y:e.clientY}; }
    else if(pointers.size===2){ mode='orbit'; const p=[...pointers.values()]; orbitPrev={x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2}; pinchPrev=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y); }
  });
  cv.addEventListener('pointermove',e=>{ if(!pointers.has(e.pointerId))return; pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(mode==='move' && pointers.size===1){ movePieceTo(e.clientX,e.clientY); }
    else if(mode==='orbit'){ const p=[...pointers.values()];
      const mx=p.length===2?(p[0].x+p[1].x)/2:e.clientX, my=p.length===2?(p[0].y+p[1].y)/2:e.clientY;
      if(orbitPrev){ cam.az-=(mx-orbitPrev.x)*0.006; cam.el=THREE.MathUtils.clamp(cam.el+(my-orbitPrev.y)*0.005,0.12,1.4); }
      orbitPrev={x:mx,y:my};
      if(p.length===2){ const d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y); if(pinchPrev) cam.distMul=THREE.MathUtils.clamp(cam.distMul*(pinchPrev/d),0.5,2.2); pinchPrev=d; }
    }
  });
  const up=e=>{ pointers.delete(e.pointerId); if(pointers.size===0){mode=null;orbitPrev=null;} else if(pointers.size===1){ mode='move'; const p=[...pointers.values()][0]; orbitPrev=p; } };
  cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',up);
  cv.addEventListener('contextmenu',e=>e.preventDefault());
  cv.addEventListener('wheel',e=>{ cam.distMul=THREE.MathUtils.clamp(cam.distMul*(1+Math.sign(e.deltaY)*0.08),0.5,2.2); },{passive:true});

  // barra de altura
  const hs=document.getElementById('hslider');
  hs.addEventListener('input',()=>{ const t=+hs.value/100; gPos.y=THREE.MathUtils.lerp(0.3, Math.max(G.target,G.maxTop)+3.2, t); updateGhost(); });

  document.getElementById('btnRot').onclick=()=>{ gYaw+=Math.PI/4; updateGhost(); };
  document.getElementById('btnFlip').onclick=()=>{ gPitch+=Math.PI/2; updateGhost(); };
  document.getElementById('btnRest').onclick=()=>{ settleGhostDown(); syncHeightSlider(); };
  document.getElementById('btnDrop').onclick=()=>placePiece();

  addEventListener('keydown',e=>{ const step=0.18;
    if(e.key==='ArrowLeft')gPos.x-=step; else if(e.key==='ArrowRight')gPos.x+=step;
    else if(e.key==='ArrowUp')gPos.z-=step; else if(e.key==='ArrowDown')gPos.z+=step;
    else if(e.key==='w')gPos.y+=step; else if(e.key==='s')gPos.y-=step;
    else if(e.key==='q'){cam.az-=0.15;} else if(e.key==='e'){cam.az+=0.15;}
    else if(e.key==='r')gYaw+=Math.PI/4; else if(e.key==='f')gPitch+=Math.PI/2;
    else if(e.key==='g')settleGhostDown();
    else if(e.code==='Space'){e.preventDefault();placePiece();} else return;
    clampGhost(); updateGhost(); syncHeightSlider();
  });
}
function movePieceTo(clientX,clientY){
  if(!ghost) return;
  const ndc=new THREE.Vector2((clientX/innerWidth)*2-1, -(clientY/innerHeight)*2+1);
  raycaster.setFromCamera(ndc, camera);
  const plane=new THREE.Plane(new THREE.Vector3(0,1,0), -gPos.y); // plano horizontal na altura atual
  const hit=new THREE.Vector3();
  if(raycaster.ray.intersectPlane(plane,hit)){ gPos.x=hit.x; gPos.z=hit.z; clampGhost(); updateGhost(); }
}
function clampGhost(){ const m=1.4; gPos.x=THREE.MathUtils.clamp(gPos.x,-(G.halfX+m),G.halfX+m);
  gPos.z=THREE.MathUtils.clamp(gPos.z,-(G.halfZ+m),G.halfZ+m); gPos.y=THREE.MathUtils.clamp(gPos.y,0.3,Math.max(G.target,G.maxTop)+4.5); }
function syncHeightSlider(){ const hs=document.getElementById('hslider'); if(!hs)return;
  const top=Math.max(G.target,G.maxTop)+3.2; hs.value=Math.round(THREE.MathUtils.clamp((gPos.y-0.3)/(top-0.3),0,1)*100); }

/* ---------------- HUD ---------------- */
function updateHUD(){
  const set=(id,v)=>{ const e=document.getElementById(id); if(e)e.textContent=v; };
  set('hHeight', G.maxTop.toFixed(1)+'m'); set('hTarget', G.target.toFixed(1)+'m'); set('hPieces', G.pieces);
  const nx=queue[0]; set('hNext', nx? SHAPES[nx.shape].name+' · '+MATERIALS[nx.mat].name : '—');
}

/* ---------------- ÁUDIO ---------------- */
let AC; function ac(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); return AC; }
function blip(f,d,type,g){ try{ const c=ac(),o=c.createOscillator(),ga=c.createGain(); o.type=type||'sine'; o.frequency.value=f; ga.gain.value=g||0.12;
  o.connect(ga).connect(c.destination); o.start(); ga.gain.exponentialRampToValueAtTime(0.001,c.currentTime+(d||0.12)); o.stop(c.currentTime+(d||0.12)); }catch(e){} }
function playThunk(){ blip(150,0.13,'square',0.13); }
function playFanfare(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>blip(f,0.18,'triangle',0.12),i*90)); }

function onResize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }

/* ---------------- API de teste ---------------- */
const api={ get G(){return G;}, get gPos(){return gPos;},
  moveTo:(x,z)=>{gPos.x=x;gPos.z=z;clampGhost();updateGhost();}, height:(y)=>{gPos.y=y;clampGhost();updateGhost();syncHeightSlider();},
  rest:()=>settleGhostDown(), rot:()=>{gYaw+=Math.PI/4;updateGhost();}, flip:()=>{gPitch+=Math.PI/2;updateGhost();},
  place:()=>placePiece(), orbit:(a,e)=>{cam.az=a;cam.el=e;}, restart:()=>startLevel({target:G.target,queue:autoQueue(40)}),
  bodies:()=>bodies.length };

boot();
