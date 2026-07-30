/* ========================================================================
   LENDAS DA F1 — demo: 1 carro correndo numa pista em escala real.
   Câmera de perseguição, velocidade em função da curvatura (freia nas
   curvas, acelera nas retas), rolagem de carroceria, rodas girando/esterçando.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car } from './car.js';
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

const car=buildF1Car({}); scene.add(car);
const wheels=car.userData.wheels, rad=car.userData.radius;

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
const gearsKmh=[0,90,140,185,230,275,320,380];   // limites das 7 marchas
function rpmFor(kmh){
  let g=0; for(let i=0;i<gearsKmh.length-1;i++){ if(kmh>=gearsKmh[i]) g=i; }
  g=Math.min(g,gearsKmh.length-2);
  const a=gearsKmh[g], b=gearsKmh[g+1];
  const frac=THREE.MathUtils.clamp((kmh-a)/(b-a),0,1);
  return { rpm: 4000 + frac*11000, gear: g+1 };
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
  mapFn=(x,z)=>[ox+(x-minX)*s, H-(oz+(z-minZ)*s)];   // z pra cima = norte
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

  // ---- rolagem/steer em função da curvatura assinada ----
  const dAng=Math.atan2(
    tan.clone().cross(curve.getTangentAt((u+0.002)%1).normalize()).y, 1);
  const signedK=curvatureAt(u)*Math.sign(-tan.clone().cross(curve.getTangentAt((u+0.003)%1).normalize()).y || 1);
  const latG=(speed*speed*curvatureAt(u))/9.8;
  const roll=THREE.MathUtils.clamp(-signedK*speed*speed*0.02, -0.09, 0.09);
  const steer=THREE.MathUtils.clamp(signedK*260, -0.5, 0.5);

  // ---- posiciona o carro ----
  car.position.set(tmp.x, 0, tmp.z);
  car.rotation.set(0, heading, 0);
  // pequena rolagem: aplicamos num pivô visual inclinando no eixo de avanço
  car.rotation.z=THREE.MathUtils.lerp(car.rotation.z, roll, 0.15);
  // squat na aceleração / mergulho na freada
  const pitch=THREE.MathUtils.clamp((vCorner-speed)*0.004,-0.03,0.03);
  car.rotation.x=THREE.MathUtils.lerp(car.rotation.x, pitch, 0.1);

  // ---- rodas: giro + esterço ----
  const spinInc=(speed*dt)/rad.front;
  for(const key in wheels){
    const w=wheels[key];
    w.spin.rotation.x += (key[0]==='f'? (speed*dt)/rad.front : (speed*dt)/rad.rear);
    if(w.steer) w.steerPivot.rotation.y = THREE.MathUtils.lerp(w.steerPivot.rotation.y, -steer, 0.2);
  }
  prevSteer=steer;

  // ---- câmera de perseguição (mais baixa/perto = mais velocidade) ----
  const spd01=THREE.MathUtils.clamp(speed/95,0,1);
  const dist=8.5 - spd01*1.2;                 // aproxima um pouco a fundo
  const back=tan.clone().multiplyScalar(-dist);
  const desired=car.position.clone().add(back).add(new THREE.Vector3(0,2.5,0));
  camPos.lerp(desired, 1-Math.pow(0.0016,dt));
  // tremor da câmera: cresce com a velocidade, ainda mais na zebra
  const kmh=speed*3.6;
  const onKerb = latG>2.6;                     // pisando na zebra em curva forte
  const shakeAmp=spd01*0.05 + (onKerb?0.09:0);
  shakeX=(Math.random()*2-1)*shakeAmp; shakeY=(Math.random()*2-1)*shakeAmp;
  camera.position.set(camPos.x+shakeX, camPos.y+shakeY, camPos.z);
  lookTmp.copy(car.position).addScaledVector(tan, 8).setY(1.1);
  camera.lookAt(lookTmp);
  // FOV dinâmico: abre com a velocidade (túnel de velocidade)
  const fov=FOV_BASE + spd01*(FOV_MAX-FOV_BASE);
  if(Math.abs(camera.fov-fov)>0.1){ camera.fov=fov; camera.updateProjectionMatrix(); }

  // ---- SOM do motor ----
  const {rpm,gear}=rpmFor(kmh);
  if(audioOn) audio.update(rpm, throttle, kmh, onKerb, dt);

  // sol acompanha a região do carro (sombra sempre próxima)
  sun.position.set(car.position.x+120, 300, car.position.z+90);
  sun.target.position.copy(car.position); sun.target.updateMatrixWorld();

  // HUD
  hudSpeed.textContent=Math.round(kmh);
  hudG.textContent=latG.toFixed(1);
  if(hudGear) hudGear.textContent=gear;
  // linhas de velocidade (overlay)
  if(speedFX) speedFX.style.opacity = (spd01>0.45? (spd01-0.45)/0.55*0.9 : 0).toFixed(2);
  drawMini();

  renderer.render(scene,camera);
  requestAnimationFrame(frame);
}

/* ---------- HUD ---------- */
const hudSpeed=document.getElementById('spd');
const hudG=document.getElementById('gforce');
const hudGear=document.getElementById('gear');
const speedFX=document.getElementById('speedfx');

/* ---------- botão de som (autoplay exige gesto) ---------- */
const startBtn=document.getElementById('sound');
function enableAudio(){ try{ audio.start(); audioOn=true; }catch(e){}
  if(startBtn) startBtn.classList.add('hide'); }
if(startBtn) startBtn.addEventListener('click', enableAudio);
addEventListener('pointerdown', enableAudio, {once:true});

window.__f1={scene,camera,car,track,renderer}; window.__audio=audio;   // debug/verificação
function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); }
addEventListener('resize',resize); resize();
frame();
