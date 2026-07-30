/* ========================================================================
   LENDAS DA F1 — demo: 1 carro correndo numa pista em escala real.
   Câmera de perseguição, velocidade em função da curvatura (freia nas
   curvas, acelera nas retas), rolagem de carroceria, rodas girando/esterçando.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car, TEAMS } from './car.js';
import { buildTrack } from './track.js';
import { F1Audio } from './audio.js';

const cvs = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas:cvs, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.05;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x8fb8e6);
scene.fog=new THREE.Fog(0x8fb8e6, 400, 1400);

const camera=new THREE.PerspectiveCamera(52, innerWidth/innerHeight, 0.5, 4000);

/* ---------- LUZ ---------- */
const sun=new THREE.DirectionalLight(0xfff4e6, 2.6);
sun.position.set(180,300,120); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);
const sc=sun.shadow.camera; sc.near=50; sc.far=900; sc.left=-140; sc.right=140; sc.top=140; sc.bottom=-140;
sun.shadow.bias=-0.0004;
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xbcd8ff, 0x3a5a30, 0.9));

/* ---------- ENVIRONMENT (para brilho da lataria) ---------- */
(function(){
  const c=document.createElement('canvas'); c.width=c.height=256; const g=c.getContext('2d');
  const grd=g.createLinearGradient(0,0,0,256);
  grd.addColorStop(0,'#dff0ff'); grd.addColorStop(0.5,'#a9cdf2'); grd.addColorStop(0.5,'#6f8f6a'); grd.addColorStop(1,'#2f4a2c');
  g.fillStyle=grd; g.fillRect(0,0,256,256);
  const tex=new THREE.CanvasTexture(c); tex.mapping=THREE.EquirectangularReflectionMapping;
  const pmrem=new THREE.PMREMGenerator(renderer);
  scene.environment=pmrem.fromEquirectangular(tex).texture;
})();

/* ---------- PISTA + CARRO ---------- */
const track=buildTrack(); scene.add(track.group);
const curve=track.curve;

let currentTeam='ferrari';
let car=buildF1Car({team:currentTeam}); scene.add(car);
let wheels=car.userData.wheels, rad=car.userData.radius;
function setTeam(t){
  currentTeam=t;
  scene.remove(car); car.traverse(o=>{ if(o.geometry)o.geometry.dispose(); });
  car=buildF1Car({team:t}); scene.add(car);
  wheels=car.userData.wheels; rad=car.userData.radius;
}

/* ---------- ESTADO DA CORRIDA ---------- */
let u=0;                 // parâmetro [0,1) na volta — começa na largada
let speed=12;            // m/s atual (largada)
const total=track.length;
const tmp=new THREE.Vector3(), tan=new THREE.Vector3(), lookTmp=new THREE.Vector3();
const up=new THREE.Vector3(0,1,0);

// curvatura aproximada num ponto (quanto maior, mais fechada a curva)
function curvatureAt(uu){
  const d=0.0016;
  const a=curve.getTangentAt((uu-d+1)%1).normalize();
  const b=curve.getTangentAt((uu+d)%1).normalize();
  return a.angleTo(b)/(2*d*total); // rad por metro aprox
}

let camPos=new THREE.Vector3(0,8,-20);
let prevSteer=0;
const clock=new THREE.Clock();

// ---- marchas / RPM (pra som e sensação) ----
const FOV_BASE=54, FOV_MAX=82;
let STEER_SIGN=1;      // sinal pra roda apontar pra dentro da curva
const STEER_GAIN=2.0;  // ganho visual (mantém proporção Ackermann, deixa visível)
const gearsKmh=[0,95,145,190,235,280,325,385];   // limites das 7 marchas
function rpmFor(kmh){
  let g=0; for(let i=0;i<gearsKmh.length-1;i++){ if(kmh>=gearsKmh[i]) g=i; }
  g=Math.min(g,gearsKmh.length-2);
  const a=gearsKmh[g], b=gearsKmh[g+1];
  const frac=THREE.MathUtils.clamp((kmh-a)/(b-a),0,1);
  // 1a: marcha lenta ao corte; demais marchas: fica na faixa alta e cai pouco na troca (F1 real)
  const rpm = g===0 ? (3500 + frac*11500) : (10800 + frac*4200);
  return { rpm, gear: g+1 };
}
const audio=new F1Audio();
let audioOn=false, shakeX=0, shakeY=0;
const halfW=track.half;

/* ---------- MINIMAPA ---------- */
const miniCvs=document.getElementById('mini');
const mctx=miniCvs&&miniCvs.getContext('2d');
let mapPts=[], mapFn=null;
if(mctx){
  const W=miniCvs.width, H=miniCvs.height, pad=12;
  const sample=curve.getSpacedPoints(240).map(p=>[p.x,p.z]);
  let minX=1e9,maxX=-1e9,minZ=1e9,maxZ=-1e9;
  for(const [x,z] of sample){ minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z); }
  const sx=(W-2*pad)/(maxX-minX), sz=(H-2*pad)/(maxZ-minZ), s=Math.min(sx,sz);
  const ox=(W-(maxX-minX)*s)/2, oz=(H-(maxZ-minZ)*s)/2;
  // eixo X invertido pra bater com a vista de cima do mundo 3D (não espelhado)
  mapFn=(x,z)=>[ox+(maxX-x)*s, H-(oz+(z-minZ)*s)];
  mapPts=sample.map(([x,z])=>mapFn(x,z));
}
function drawMini(){
  if(!mctx) return;
  const W=miniCvs.width,H=miniCvs.height;
  mctx.clearRect(0,0,W,H);
  // traçado
  mctx.lineJoin='round'; mctx.lineCap='round';
  mctx.strokeStyle='rgba(255,255,255,0.85)'; mctx.lineWidth=4;
  mctx.beginPath(); mapPts.forEach((p,i)=> i?mctx.lineTo(p[0],p[1]):mctx.moveTo(p[0],p[1])); mctx.closePath(); mctx.stroke();
  mctx.strokeStyle='rgba(60,64,72,0.9)'; mctx.lineWidth=1.6; mctx.stroke();
  // largada/chegada
  if(track.sf){ const [gx,gy]=mapFn(track.sf.x,track.sf.z);
    mctx.fillStyle='#ffffff'; mctx.fillRect(gx-3,gy-3,6,6); }
  // pontinho do carro
  const [cx,cy]=mapFn(car.position.x,car.position.z);
  mctx.beginPath(); mctx.arc(cx,cy,5,0,7); mctx.fillStyle='#f2c400'; mctx.fill();
  mctx.lineWidth=2; mctx.strokeStyle='#1b1b1b'; mctx.stroke();
}

/* ---------- SISTEMA DE CÂMERAS (vários ângulos, tipo transmissão) ---------- */
let camMode=0;
const CAM_MODES=[
  {key:'perseguicao', name:'Perseguição'},
  {key:'cockpit',     name:'Cockpit'},
  {key:'aerea',       name:'Aérea'},
  {key:'tv',          name:'TV (beira de pista)'},
];
// câmeras fixas de beira de pista (handoff conforme o carro passa)
const camCentroid=new THREE.Vector3();
{ const sp=curve.getSpacedPoints(240); sp.forEach(p=>camCentroid.add(p)); camCentroid.multiplyScalar(1/sp.length); }
const NTV=12, tvCams=[];
for(let i=0;i<NTV;i++){ const uc=(i+0.5)/NTV; const p=curve.getPointAt(uc);
  const out=p.clone().sub(camCentroid).setY(0).normalize();
  tvCams.push(p.clone().addScaledVector(out, 30).setY(8+(i%3)*6)); }
const rnd=a=>(Math.random()*2-1)*a;
function updateCamera(dt, spd01, onKerb){
  const mode=CAM_MODES[camMode].key;
  let fov=FOV_BASE + spd01*(FOV_MAX-FOV_BASE);
  if(mode==='perseguicao'){
    const dist=8.5-spd01*1.2;
    const desired=car.position.clone().addScaledVector(tan,-dist).add(new THREE.Vector3(0,2.5,0));
    camPos.lerp(desired, 1-Math.pow(0.0016,dt));
    const sh=spd01*0.05+(onKerb?0.09:0);
    camera.up.set(0,1,0); camera.position.set(camPos.x+rnd(sh),camPos.y+rnd(sh),camPos.z);
    lookTmp.copy(car.position).addScaledVector(tan,8).setY(1.1); camera.lookAt(lookTmp);
  } else if(mode==='cockpit'){
    fov=78+spd01*6;
    const eye=car.position.clone().add(new THREE.Vector3(0,1.12,0)).addScaledVector(tan,-0.1);
    camPos.copy(eye);
    const sh=spd01*0.035+(onKerb?0.06:0);
    camera.up.set(0,1,0); camera.position.set(eye.x+rnd(sh),eye.y+rnd(sh*0.6),eye.z+rnd(sh));
    lookTmp.copy(car.position).addScaledVector(tan,14).setY(0.85); camera.lookAt(lookTmp);
  } else if(mode==='aerea'){
    fov=56;                                             // bem aberta, mostra a pista em volta
    const desired=car.position.clone().addScaledVector(tan,-40).add(new THREE.Vector3(0,80,0));
    camPos.lerp(desired, 1-Math.pow(0.02,dt));          // segue suave (drone/helicóptero)
    camera.up.set(0,1,0); camera.position.copy(camPos);
    lookTmp.copy(car.position).addScaledVector(tan,12).setY(0); camera.lookAt(lookTmp);
  } else { // TV — câmera fixa mais próxima, com "zoom" (teleobjetiva)
    const cam=tvCams[Math.floor(u*NTV)%NTV];
    camera.up.set(0,1,0); camera.position.copy(cam);
    const dist=cam.distanceTo(car.position);
    fov=THREE.MathUtils.clamp(1000/dist, 14, 38);   // longe = mais zoom
    lookTmp.copy(car.position).setY(0.6); camera.lookAt(lookTmp);
  }
  if(Math.abs(camera.fov-fov)>0.1){ camera.fov=fov; camera.updateProjectionMatrix(); }
  return mode;
}
function cycleCam(){ camMode=(camMode+1)%CAM_MODES.length; if(camBtn) camBtn.textContent='📹 '+CAM_MODES[camMode].name; }

function frame(){
  const dt=Math.min(clock.getDelta(),0.05);

  // ---- velocidade alvo em função da curvatura à frente ----
  const lookAhead=(u + (speed*0.9)/total)%1;     // olha adiante proporcional à velocidade
  const kNow=curvatureAt(u), kAhead=curvatureAt(lookAhead);
  const k=Math.max(kNow,kAhead*1.1);
  // v = sqrt(a_lat / k) — modelo físico de aderência
  const aLat=26;                                  // ~2.6g de aderência lateral
  let vCorner = k>1e-4 ? Math.sqrt(aLat/k) : 95;
  vCorner=Math.min(vCorner,95);                   // teto ~342 km/h
  vCorner=Math.max(vCorner,16);                   // piso nas curvas lentas
  // acelera/freia rumo ao alvo
  let throttle;
  if(vCorner>speed){ speed+=Math.min((vCorner-speed), 14*dt); throttle=1.0; }   // a fundo
  else             { speed-=Math.min((speed-vCorner), 42*dt); throttle=0.0; }   // freando/coasting

  // ---- avança na pista ----
  u=(u + (speed*dt)/total)%1;
  curve.getPointAt(u,tmp);
  curve.getTangentAt(u,tan).normalize();
  const heading=Math.atan2(tan.x,tan.z);

  // ---- curvatura ASSINADA (direção da curva) pela variação de rumo ----
  const du=0.0018;
  const hA=Math.atan2(tan.x,tan.z);
  const tB=curve.getTangentAt((u+du)%1);
  let dH=Math.atan2(tB.x,tB.z)-hA; while(dH>Math.PI)dH-=2*Math.PI; while(dH<-Math.PI)dH+=2*Math.PI;
  const kSigned = dH/(du*total);                       // rad por metro, com sinal
  const latG=(speed*speed*Math.abs(kSigned))/9.8;
  const roll=THREE.MathUtils.clamp(kSigned*speed*speed*0.010, -0.05, 0.05);   // leve, pra fora
  const Rturn = Math.abs(kSigned)>1e-5 ? 1/kSigned : 1e9;                     // raio (com sinal)

  // ---- posiciona o carro ----
  car.position.set(tmp.x, 0, tmp.z);
  car.rotation.set(0, heading, 0);
  // pequena rolagem: aplicamos num pivô visual inclinando no eixo de avanço
  car.rotation.z=THREE.MathUtils.lerp(car.rotation.z, roll, 0.15);
  // squat na aceleração / mergulho na freada
  const pitch=THREE.MathUtils.clamp((vCorner-speed)*0.004,-0.03,0.03);
  car.rotation.x=THREE.MathUtils.lerp(car.rotation.x, pitch, 0.1);

  // ---- rodas: giro real + deformação sob carga + esterço Ackermann ----
  const WB=3.6, R0=rad.front;
  const braking=(vCorner<speed);
  for(const key in wheels){
    const w=wheels[key];
    w.spin.rotation.x += (speed*dt)/R0;                        // giro real do pneu
    // deformação: achata na vertical sob carga (freada / curva / aceleração)
    const isFront=key[0]==='f';
    const brakeLoad = braking ? (isFront?0.030:0.012) : 0;
    const accelLoad = (!braking && throttle>0.8) ? (isFront?0.006:0.022) : 0;
    const sq = THREE.MathUtils.clamp(1 - 0.028 - Math.min(latG,3)*0.012 - brakeLoad - accelLoad, 0.9, 0.99);
    w.steerPivot.scale.y = THREE.MathUtils.lerp(w.steerPivot.scale.y, sq, 0.25);
    w.steerPivot.position.y = R0*w.steerPivot.scale.y;         // mantém o pneu plantado no chão
    if(w.steer){
      const xw=w.steerPivot.position.x;                        // posição lateral da roda
      const delta=THREE.MathUtils.clamp(Math.atan(WB/(Rturn - xw))*STEER_SIGN*STEER_GAIN, -0.55, 0.55);
      w.steerPivot.rotation.y=THREE.MathUtils.lerp(w.steerPivot.rotation.y, delta, 0.25);
    }
  }

  // ---- métricas de velocidade ----
  const spd01=THREE.MathUtils.clamp(speed/95,0,1);
  const kmh=speed*3.6;
  const onKerb = latG>2.6;                     // pisando na zebra em curva forte
  // ---- câmera (vários ângulos: perseguição / cockpit / aérea / TV) ----
  const curMode=updateCamera(dt, spd01, onKerb);

  // ---- SOM do motor ----
  const {rpm,gear}=rpmFor(kmh);
  if(audioOn) audio.update(rpm, throttle, kmh, onKerb, dt, gear);

  // sol acompanha a região do carro (sombra sempre próxima)
  sun.position.set(car.position.x+120, 300, car.position.z+90);
  sun.target.position.copy(car.position); sun.target.updateMatrixWorld();

  // HUD
  hudSpeed.textContent=Math.round(kmh);
  hudG.textContent=latG.toFixed(1);
  if(hudGear) hudGear.textContent=gear;
  // linhas de velocidade (só nas câmeras de dentro do carro)
  const showFX=(curMode==='perseguicao'||curMode==='cockpit');
  if(speedFX) speedFX.style.opacity = (showFX && spd01>0.45? (spd01-0.45)/0.55*0.9 : 0).toFixed(2);
  drawMini();

  renderer.render(scene,camera);
  requestAnimationFrame(frame);
}

/* ---------- HUD ---------- */
const hudSpeed=document.getElementById('spd');
const hudG=document.getElementById('gforce');
const hudGear=document.getElementById('gear');
const speedFX=document.getElementById('speedfx');
const camBtn=document.getElementById('cam');
if(camBtn){ camBtn.textContent='📹 '+CAM_MODES[camMode].name; camBtn.addEventListener('click', cycleCam); }
addEventListener('keydown', e=>{ if(e.key==='c'||e.key==='C') cycleCam(); });

/* ---------- botão de som (autoplay exige gesto) ---------- */
const startBtn=document.getElementById('sound');
function enableAudio(){ try{ audio.start(); audioOn=true; }catch(e){}
  if(startBtn) startBtn.classList.add('hide'); }
if(startBtn) startBtn.addEventListener('click', enableAudio);
addEventListener('pointerdown', enableAudio, {once:true});

/* ---------- seletor de equipe (cores reais) ---------- */
const teamSel=document.getElementById('team');
if(teamSel){
  for(const key in TEAMS){ const o=document.createElement('option'); o.value=key; o.textContent=TEAMS[key].name; teamSel.appendChild(o); }
  teamSel.value=currentTeam;
  teamSel.addEventListener('change', ()=> setTeam(teamSel.value));
}

window.__f1={scene,camera,get car(){return car;},track,renderer}; window.__audio=audio; window.__setTeam=setTeam;
function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); }
addEventListener('resize',resize); resize();
frame();
