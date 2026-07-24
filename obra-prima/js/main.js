/* ========================================================================
   OBRA-PRIMA — motor do jogo (Three.js + Rapier)
   Empilhe peças com física real até a linha-alvo. Tema: canteiro de obras.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import RAPIER from '../vendor/rapier.es.js';
import { MATERIALS, SHAPES, SHAPE_IDS, buildMesh } from './pieces.js';

let renderer, scene, camera, world;
let ground, platform;
const bodies=[];          // {mesh, body, sleepT}
let ghost=null, ghostRot=new THREE.Quaternion(), ghostX=0, ghostSpin=0;
let queue=[];             // próximas peças [{shape,mat}]
const clock=new THREE.Clock();

const G = {
  state:'menu', target:6, pieces:0, maxTop:0, holdT:0, won:false,
  platformHalf:2.2, spawnY:0,
};

/* ---------------- BOOT ---------------- */
async function boot(){
  await RAPIER.init();
  initRenderer(); initScene(); initPhysics();
  window.addEventListener('resize', onResize);
  bindInput();
  animate();
  // começa direto num nível de teste (o menu/telas vêm depois)
  startLevel({ target:6, queue:autoQueue(30) });
  window.OP = api;
}

/* ---------------- RENDER ---------------- */
function initRenderer(){
  const cv=document.getElementById('c');
  renderer=new THREE.WebGLRenderer({canvas:cv, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
}
function initScene(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x8fc7e8);
  scene.fog=new THREE.Fog(0x8fc7e8, 26, 60);
  camera=new THREE.PerspectiveCamera(52, innerWidth/innerHeight, 0.1, 200);
  camera.position.set(3.2, 4.5, 11);

  // luzes
  const hemi=new THREE.HemisphereLight(0xffffff, 0x9a7b52, 0.85); scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff2d8, 1.35);
  sun.position.set(8,16,9); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  const d=16; Object.assign(sun.shadow.camera,{left:-d,right:d,top:d*1.6,bottom:-d}); sun.shadow.camera.near=1; sun.shadow.camera.far=60;
  sun.shadow.bias=-0.0004; scene.add(sun); scene.add(sun.target);
  G.sun=sun;

  // chão do canteiro
  const gmat=new THREE.MeshStandardMaterial({color:0xb99a6a, roughness:1});
  ground=new THREE.Mesh(new THREE.CircleGeometry(40,48), gmat);
  ground.rotation.x=-Math.PI/2; ground.position.y=-0.001; ground.receiveShadow=true; scene.add(ground);
  // grid sutil de canteiro
  const grid=new THREE.GridHelper(40,40,0x8a6f45,0x9a825a); grid.position.y=0.002; grid.material.opacity=0.25; grid.material.transparent=true; scene.add(grid);

  // plataforma-base (pedestal de concreto)
  const ph=G.platformHalf;
  platform=new THREE.Mesh(new THREE.BoxGeometry(ph*2,0.6,ph*1.4),
    new THREE.MeshStandardMaterial({color:0xa8adb4, roughness:0.95}));
  platform.position.y=-0.3; platform.receiveShadow=true; platform.castShadow=true; scene.add(platform);
  // faixas de perigo na borda
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(ph*2+0.04,0.12,ph*1.4+0.04),
    new THREE.MeshStandardMaterial({color:0xe8b930, roughness:0.8}));
  stripe.position.y=-0.02; scene.add(stripe);

  // cones decorativos
  for(const s of [-1,1]){ const cone=new THREE.Mesh(new THREE.ConeGeometry(0.35,0.8,20),
    new THREE.MeshStandardMaterial({color:0xe8642a,roughness:0.7}));
    cone.position.set(s*(ph+1.4),0.4,ph*0.4); cone.castShadow=true; scene.add(cone);
    const ring=new THREE.Mesh(new THREE.CylinderGeometry(0.36,0.36,0.14,20),new THREE.MeshStandardMaterial({color:0xf2f2f2}));
    ring.position.set(s*(ph+1.4),0.42,ph*0.4); scene.add(ring); }

  // linha-alvo (marcador 3D)
  G.targetGroup=new THREE.Group(); scene.add(G.targetGroup);
  buildTargetLine();
}
function buildTargetLine(){
  G.targetGroup.clear();
  const w=G.platformHalf*2+2.2;
  const bar=new THREE.Mesh(new THREE.BoxGeometry(w,0.06,0.06),
    new THREE.MeshStandardMaterial({color:0x35d07a, emissive:0x0a5a30, emissiveIntensity:0.6}));
  G.targetGroup.add(bar);
  // postes tracejados
  for(let x=-w/2;x<=w/2;x+=0.6){ const d=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.02,0.02),
    new THREE.MeshBasicMaterial({color:0x35d07a,transparent:true,opacity:0.5})); d.position.set(x,0.001,0); G.targetGroup.add(d); }
  G.targetGroup.position.y=G.target;
}

/* ---------------- FÍSICA ---------------- */
function initPhysics(){
  world=new RAPIER.World({x:0,y:-19,z:0});
  world.timestep=1/60;
  // chão infinito
  const gb=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(40,0.5,40).setTranslation(0,-0.5,0).setFriction(0.9), gb);
  // plataforma
  const pb=world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(G.platformHalf,0.3,G.platformHalf*0.7).setTranslation(0,-0.3,0).setFriction(0.9), pb);
}
function addColliders(body, shapeId, matId){
  const S=SHAPES[shapeId], M=MATERIALS[matId];
  for(const cd of S.col){
    let desc;
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

/* ---------------- PEÇAS ---------------- */
function autoQueue(n){ const q=[];
  const easyShapes=['cubo','caixa','tabua','viga','cubo','caixa','tabua','cilindro']; // base estável
  const easyMats=['madeira','caixote','pedra','concreto'];
  for(let i=0;i<n;i++){ q.push({ shape: easyShapes[(Math.random()*easyShapes.length)|0],
    mat: easyMats[(Math.random()*easyMats.length)|0] }); }
  return q; }

function spawnGhost(){
  if(!queue.length){ return; }
  const p=queue[0];
  ghost=buildMesh(p.shape,p.mat);
  ghost.traverse(o=>{ if(o.material){ o.material.transparent=true; o.material.opacity=(o.material.opacity??1)*0.5; }});
  ghostX=0; ghostSpin=0; ghostRot.identity();
  // hover num vão curto e controlado ACIMA do topo assentado (não chove do céu)
  G.spawnY=Math.max(G.maxTop, 0.4)+1.7;
  ghost.position.set(0,G.spawnY,0);
  scene.add(ghost);
  updateGhost();
  updateHUD();
}
function updateGhost(){
  if(!ghost) return;
  ghost.position.x=ghostX; ghost.position.y=G.spawnY; ghost.position.z=0;
  ghostRot.setFromEuler(new THREE.Euler(0,0,ghostSpin));
  ghost.quaternion.copy(ghostRot);
}
function dropPiece(){
  if(!ghost || G.state!=='play') return;
  const p=queue.shift();
  const body=world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(ghostX,G.spawnY,0)
    .setRotation({x:ghostRot.x,y:ghostRot.y,z:ghostRot.z,w:ghostRot.w})
    .setLinvel(0,-3,0)
    .setLinearDamping(0.04).setAngularDamping(0.1));
  addColliders(body,p.shape,p.mat);
  const mesh=buildMesh(p.shape,p.mat);
  scene.add(mesh);
  const rec={mesh,body,shape:p.shape,tDrop:performance.now(),speed:9};
  bodies.push(rec);
  scene.remove(ghost); ghost=null;
  G.pieces++;
  playThunk();
  // só chama a próxima quando ESTA assentar (evita chuva de peças)
  G.awaitSettle=rec;
  updateHUD();
}

/* ---------------- NÍVEL ---------------- */
function startLevel(cfg){
  // limpa
  for(const b of bodies){ scene.remove(b.mesh); world.removeRigidBody(b.body); }
  bodies.length=0;
  if(ghost){ scene.remove(ghost); ghost=null; }
  G.target=cfg.target; G.pieces=0; G.maxTop=0; G.holdT=0; G.won=false; G.state='play';
  queue=cfg.queue.slice();
  buildTargetLine();
  spawnGhost();
  updateHUD();
}

/* ---------------- LOOP ---------------- */
function animate(){ requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.033);
  if(world && G.state!=='menu'){ world.step(); syncBodies(dt); }
  updateCamera(dt);
  renderer.render(scene,camera);
}
const _box=new THREE.Box3();
function syncBodies(dt){
  let settledTop=0, anyTop=0, allSlow=true;
  for(const b of bodies){
    const t=b.body.translation(), r=b.body.rotation();
    b.mesh.position.set(t.x,t.y,t.z); b.mesh.quaternion.set(r.x,r.y,r.z,r.w);
    const v=b.body.linvel(), av=b.body.angvel();
    b.speed=Math.hypot(v.x,v.y,v.z)+Math.hypot(av.x,av.y,av.z)*0.25;
    if(t.y<-2){ b.fallen=true; continue; }        // caiu da plataforma
    _box.setFromObject(b.mesh); const topY=_box.max.y;
    anyTop=Math.max(anyTop,topY);
    if(b.speed<0.55) settledTop=Math.max(settledTop,topY); else allSlow=false;
  }
  G.maxTop=settledTop; G.anyTop=anyTop; G.settled=allSlow;
  // libera a próxima peça quando a atual assentar (ou timeout de segurança)
  if(G.awaitSettle){ const b=G.awaitSettle;
    if(b.fallen || b.speed<0.55 || performance.now()-b.tDrop>2600){ G.awaitSettle=null; if(G.state==='play') spawnGhost(); } }
  checkWin(dt);
  updateHUD();
}
function checkWin(dt){
  if(G.won||G.state!=='play') return;
  if(G.maxTop>=G.target && G.settled && ghost==null){
    // dá um respiro entre dropar e contar
  }
  if(G.maxTop>=G.target && G.settled){ G.holdT+=dt; } else { G.holdT=Math.max(0,G.holdT-dt*0.6); }
  if(G.holdT>=2.2){ win(); }
}
function win(){ G.won=true; G.state='won'; if(ghost){scene.remove(ghost);ghost=null;} playFanfare();
  const el=document.getElementById('banner'); el.textContent='✅ ALTURA ATINGIDA!'; el.className='banner win show';
  setTimeout(()=>el.classList.remove('show'),2600);
}

/* ---------------- CÂMERA ---------------- */
let camLook=new THREE.Vector3(0,2,0), camDist=11;
function updateCamera(dt){
  // enquadra de y=0 até o topo da ação (alvo, pilha, peça no ar)
  const viewTop=Math.max(G.target, G.anyTop||0, G.spawnY||0)+1.6;
  const center=viewTop*0.5;
  const vFov=camera.fov*Math.PI/180;
  let dist=(viewTop*0.55+0.6)/Math.tan(vFov/2);
  dist=Math.max(9,dist);
  const ang=0.34;
  const desired=new THREE.Vector3(Math.sin(ang)*dist*0.42, center+0.6, Math.cos(ang)*dist);
  camera.position.lerp(desired, Math.min(1,dt*2.4));
  camLook.y += (center-camLook.y)*Math.min(1,dt*2.4);
  camera.lookAt(0,camLook.y,0);
  if(G.targetGroup) G.targetGroup.position.y=G.target;
}

/* ---------------- INPUT (2.5D) ---------------- */
function bindInput(){
  const cv=renderer.domElement; let dragging=false, lastX=0;
  const moveTo=(clientX)=>{ // mapeia X da tela → X do mundo no plano z=0
    const nx=(clientX/innerWidth)*2-1;
    ghostX=THREE.MathUtils.clamp(nx*(G.platformHalf+1.6), -(G.platformHalf+1.4), (G.platformHalf+1.4));
    updateGhost();
  };
  cv.addEventListener('pointerdown',e=>{ dragging=true; lastX=e.clientX; moveTo(e.clientX); });
  cv.addEventListener('pointermove',e=>{ if(dragging) moveTo(e.clientX); });
  addEventListener('pointerup',()=>dragging=false);
  document.getElementById('btnRot').onclick=()=>{ ghostSpin+=Math.PI/2; updateGhost(); };
  document.getElementById('btnDrop').onclick=()=>dropPiece();
  addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){ghostX=Math.max(-(G.platformHalf+1.4),ghostX-0.25);updateGhost();}
    else if(e.key==='ArrowRight'){ghostX=Math.min(G.platformHalf+1.4,ghostX+0.25);updateGhost();}
    else if(e.key==='ArrowUp'||e.key==='r'){ghostSpin+=Math.PI/2;updateGhost();}
    else if(e.code==='Space'){e.preventDefault();dropPiece();} });
}

/* ---------------- HUD ---------------- */
function updateHUD(){
  const set=(id,v)=>{ const e=document.getElementById(id); if(e)e.textContent=v; };
  set('hHeight', G.maxTop.toFixed(1)+'m');
  set('hTarget', G.target.toFixed(1)+'m');
  set('hPieces', G.pieces);
  const nx=queue[0]; set('hNext', nx? SHAPES[nx.shape].name+' · '+MATERIALS[nx.mat].name : '—');
  const prog=document.getElementById('progFill'); if(prog) prog.style.height=Math.min(100,(G.maxTop/G.target)*100)+'%';
  const hold=document.getElementById('holdRing'); if(hold) hold.style.opacity=G.holdT>0.05?'1':'0';
}

/* ---------------- ÁUDIO (placeholder p/ próxima etapa) ---------------- */
let AC; function ac(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); return AC; }
function blip(f,d,type,g){ try{ const c=ac(),o=c.createOscillator(),ga=c.createGain();
  o.type=type||'sine'; o.frequency.value=f; ga.gain.value=g||0.12; o.connect(ga).connect(c.destination);
  o.start(); ga.gain.exponentialRampToValueAtTime(0.001,c.currentTime+(d||0.12)); o.stop(c.currentTime+(d||0.12)); }catch(e){} }
function playThunk(){ blip(140,0.14,'square',0.14); }
function playFanfare(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>blip(f,0.18,'triangle',0.12),i*90)); }

function onResize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }

/* ---------------- API de teste ---------------- */
const api={ get G(){return G;}, drop:()=>dropPiece(), move:(x)=>{ghostX=x;updateGhost();}, rot:()=>{ghostSpin+=Math.PI/2;updateGhost();},
  restart:()=>startLevel({target:G.target,queue:autoQueue(30)}),
  bodies:()=>bodies.length };

boot();
