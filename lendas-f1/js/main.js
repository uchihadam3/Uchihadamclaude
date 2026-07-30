/* ========================================================================
   LENDAS DA F1 — demo: 1 carro correndo numa pista em escala real.
   Câmera de perseguição, velocidade em função da curvatura (freia nas
   curvas, acelera nas retas), rolagem de carroceria, rodas girando/esterçando.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { buildF1Car } from './car.js';
import { buildTrack } from './track.js';

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
let u=0;                 // parâmetro [0,1) na volta
let speed=40;            // m/s atual
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
  if(vCorner>speed) speed+=Math.min((vCorner-speed), 14*dt);   // ~1.4g aceleração
  else              speed-=Math.min((speed-vCorner), 42*dt);   // ~4.2g frenagem

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

  // ---- câmera de perseguição ----
  const back=tan.clone().multiplyScalar(-9.5);
  const desired=car.position.clone().add(back).add(new THREE.Vector3(0,3.4,0));
  camPos.lerp(desired, 1-Math.pow(0.0016,dt));
  camera.position.copy(camPos);
  lookTmp.copy(car.position).addScaledVector(tan, 8).setY(1.1);
  camera.lookAt(lookTmp);

  // sol acompanha a região do carro (sombra sempre próxima)
  sun.position.set(car.position.x+120, 300, car.position.z+90);
  sun.target.position.copy(car.position); sun.target.updateMatrixWorld();

  // HUD
  hudSpeed.textContent=Math.round(speed*3.6);
  hudG.textContent=latG.toFixed(1);

  renderer.render(scene,camera);
  requestAnimationFrame(frame);
}

/* ---------- HUD ---------- */
const hudSpeed=document.getElementById('spd');
const hudG=document.getElementById('gforce');

function resize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); }
addEventListener('resize',resize); resize();
frame();
