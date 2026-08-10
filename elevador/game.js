// =============================================================================
// O Elevador — terror/puzzle em 1ª pessoa. Arraste p/ olhar, toque p/ interagir.
// =============================================================================
import * as THREE from './vendor/three.module.js';

const $ = id => document.getElementById(id);
const W=2.6, H=2.7, D=2.2;                       // dimensões internas do elevador

// ---- render ----
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene(); scene.background=new THREE.Color('#05060a');
scene.fog=new THREE.FogExp2('#05060a', 0.08);
const camera=new THREE.PerspectiveCamera(74, 1, 0.03, 60);
camera.position.set(0, 1.55, 0);

// ---- texturas simples (metal com juntas + sujeira) ----
function metalTex(base='#26221d', seams=6){
  const s=256, cv=document.createElement('canvas'); cv.width=cv.height=s; const g=cv.getContext('2d');
  g.fillStyle=base; g.fillRect(0,0,s,s);
  for(let i=0;i<2500;i++){ const a=Math.random()*0.06; g.fillStyle=`rgba(0,0,0,${a})`; g.fillRect(Math.random()*s,Math.random()*s,2,2); }
  g.strokeStyle='#0007'; g.lineWidth=3;
  for(let i=1;i<seams;i++){ const x=i*s/seams; g.beginPath(); g.moveTo(x,0); g.lineTo(x,s); g.stroke(); g.strokeStyle='#ffffff08'; g.beginPath(); g.moveTo(x+2,0); g.lineTo(x+2,s); g.stroke(); g.strokeStyle='#0007'; }
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; return t;
}
const wallMat=new THREE.MeshStandardMaterial({ map:metalTex('#241f1a'), roughness:0.9, metalness:0.25 });
const floorMat=new THREE.MeshStandardMaterial({ map:metalTex('#15120e',10), roughness:0.7, metalness:0.35 });
const ceilMat =new THREE.MeshStandardMaterial({ color:'#1a1712', roughness:0.95 });

function plane(w,h,mat,pos,rot){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat); m.position.set(...pos); if(rot)m.rotation.set(...rot); m.receiveShadow=true; scene.add(m); return m; }
plane(W,D,floorMat,[0,0,0],[-Math.PI/2,0,0]);
plane(W,D,ceilMat,[0,H,0],[Math.PI/2,0,0]);
plane(W,H,wallMat,[0,H/2,-D/2],[0,0,0]);            // frente (portas)
plane(W,H,wallMat,[0,H/2, D/2],[0,Math.PI,0]);      // fundo
plane(D,H,wallMat,[-W/2,H/2,0],[0,Math.PI/2,0]);    // esquerda
plane(D,H,wallMat,[ W/2,H/2,0],[0,-Math.PI/2,0]);   // direita

// ---- portas ----
const doorMat=new THREE.MeshStandardMaterial({ map:metalTex('#3a342b',2), roughness:0.55, metalness:0.6 });
const doorL=new THREE.Mesh(new THREE.BoxGeometry(W*0.42,H*0.82,0.09),doorMat);
const doorR=doorL.clone();
doorL.position.set(-W*0.215,H*0.44,-D/2+0.06); doorR.position.set(W*0.215,H*0.44,-D/2+0.06);
[doorL,doorR].forEach(d=>{d.castShadow=d.receiveShadow=true; scene.add(d);});
const doorSeam=new THREE.Mesh(new THREE.BoxGeometry(0.02,H*0.82,0.11),new THREE.MeshStandardMaterial({color:'#000'})); doorSeam.position.set(0,H*0.44,-D/2+0.06); scene.add(doorSeam);

// ---- painel de botões (parede direita, perto da frente) ----
const panelMat=new THREE.MeshStandardMaterial({color:'#100d09',roughness:0.6,metalness:0.5});
const panel=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.9,0.06),panelMat);
panel.position.set(W/2-0.04,1.35,-D/2+0.55); panel.rotation.y=-Math.PI/2; panel.castShadow=true; scene.add(panel);
panel.userData={act:'panel'};
const btns=[];
const btnOffMat=()=>new THREE.MeshStandardMaterial({color:'#2b2b30',roughness:0.5,emissive:'#000000'});
for(let i=0;i<8;i++){
  const b=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.02,16),btnOffMat());
  const col=i%2, row=(i/2)|0;
  b.rotation.z=Math.PI/2; b.position.set(W/2-0.075, 1.62-row*0.14, -D/2+0.47+col*0.14);
  b.userData={act:'btn',i}; b.castShadow=false; scene.add(b); btns.push(b);
}

// ---- display de andar (acima das portas) ----
function makeDisplay(){
  const cv=document.createElement('canvas'); cv.width=256; cv.height=128; const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.MeshStandardMaterial({map:t,emissive:'#ff2a1a',emissiveMap:t,emissiveIntensity:0.0,roughness:0.4});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.25),mat); m.position.set(0,H*0.86,-D/2+0.02); scene.add(m);
  m.userData={act:'display'};
  return { cv, t, mat, m };
}
const disp=makeDisplay();
function setFloor(txt, on=true){
  const g=disp.cv.getContext('2d'); g.fillStyle='#0a0402'; g.fillRect(0,0,256,128);
  g.fillStyle= on?'#ff3a24':'#3a1410'; g.font='900 84px "Courier New",monospace'; g.textAlign='center'; g.textBaseline='middle';
  g.shadowColor='#ff3a24'; g.shadowBlur=on?18:0; g.fillText(txt,128,68);
  disp.t.needsUpdate=true; disp.mat.emissiveIntensity=on?1.0:0.15;
}
setFloor('', false);

// ---- luz do teto (pisca) + hatch ----
const lamp=new THREE.Mesh(new THREE.PlaneGeometry(0.7,0.7),new THREE.MeshStandardMaterial({color:'#000',emissive:'#ffdca8',emissiveIntensity:0.0}));
lamp.position.set(0,H-0.02,0); lamp.rotation.x=Math.PI/2; scene.add(lamp);
const hatch=new THREE.Mesh(new THREE.PlaneGeometry(0.66,0.66),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:0.001}));
hatch.position.set(0,H-0.03,0.02); hatch.rotation.x=Math.PI/2; hatch.userData={act:'hatch'}; scene.add(hatch);
const hatchFrame=new THREE.Mesh(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.66,0.66)),new THREE.LineBasicMaterial({color:'#000'})); hatchFrame.position.copy(hatch.position); hatchFrame.rotation.x=Math.PI/2; scene.add(hatchFrame);

const amb=new THREE.AmbientLight(0xffffff,0.22); scene.add(amb);
const light=new THREE.PointLight('#ffe0b0',0.0,14,1.5); light.position.set(0,H-0.15,0); light.castShadow=true;
light.shadow.mapSize.set(1024,1024); light.shadow.bias=-0.002; scene.add(light);
// luz de emergência fraca (standby, antes de ligar o painel) — dá pra ver as formas
light.intensity=1.1; lamp.material.emissiveIntensity=0.35; amb.intensity=0.26;

// ---- espelho no fundo (fake) + vulto ----
const mirror=new THREE.Mesh(new THREE.PlaneGeometry(0.7,1.4),new THREE.MeshStandardMaterial({color:'#0a0d12',roughness:0.15,metalness:0.9}));
mirror.position.set(0,1.5,D/2-0.02); mirror.rotation.y=Math.PI; mirror.userData={act:'mirror'}; scene.add(mirror);
const figure=new THREE.Mesh(new THREE.PlaneGeometry(0.55,1.5),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:0})); figure.position.set(0,1.4,D/2-0.06); figure.rotation.y=Math.PI; scene.add(figure);

// corrimão (sombra bonita)
const rail=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,W*0.8,10),new THREE.MeshStandardMaterial({color:'#3a3a40',metalness:0.8,roughness:0.4}));
rail.rotation.z=Math.PI/2; rail.position.set(0,0.95,D/2-0.08); rail.castShadow=true; scene.add(rail);

const HOT=[panel,...btns,disp.m,hatch,mirror,doorL,doorR];

// ============================ CONTROLES ============================
let yaw=0, pitch=0, dragging=false, lastX=0,lastY=0, moved=0, downT=0;
function applyCam(){ camera.rotation.set(pitch,yaw,0,'YXZ'); }
canvas.addEventListener('pointerdown',e=>{ dragging=true; lastX=e.clientX; lastY=e.clientY; moved=0; downT=performance.now(); });
canvas.addEventListener('pointermove',e=>{ if(!dragging) return; const dx=e.clientX-lastX, dy=e.clientY-lastY; lastX=e.clientX; lastY=e.clientY; moved+=Math.abs(dx)+Math.abs(dy);
  yaw-=dx*0.0042; pitch-=dy*0.0042; pitch=Math.max(-0.55,Math.min(0.55,pitch)); applyCam(); if($('look').style.opacity!=='0'){$('look').style.opacity='0';} });
addEventListener('pointerup',e=>{ if(!dragging) return; dragging=false; if(moved<9 && performance.now()-downT<450) tryInteract(e.clientX,e.clientY); });
const raycaster=new THREE.Raycaster(), ndc=new THREE.Vector2();
function tryInteract(x,y){
  const r=canvas.getBoundingClientRect(); ndc.x=((x-r.left)/r.width)*2-1; ndc.y=-((y-r.top)/r.height)*2+1;
  raycaster.setFromCamera(ndc,camera);
  const hit=raycaster.intersectObjects(HOT,false)[0];
  if(hit) interact(hit.object.userData, hit.object);
}

// ============================ ÁUDIO (síntese) ============================
let AC=null, humGain=null;
function noise(dur){ const n=(AC.sampleRate*dur)|0, b=AC.createBuffer(1,n,AC.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++)d[i]=Math.random()*2-1; return b; }
function startAudio(){ AC=new (window.AudioContext||window.webkitAudioContext)();
  const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(); o.type='sawtooth';o.frequency.value=51;o2.type='sine';o2.frequency.value=51.6;
  o.connect(g);o2.connect(g);g.connect(AC.destination); g.gain.value=0; o.start();o2.start(); g.gain.linearRampToValueAtTime(0.05,AC.currentTime+3); humGain=g; }
function ding(f=760){ if(!AC)return; const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(AC.destination);
  g.gain.setValueAtTime(0.0001,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.18,AC.currentTime+0.008);g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+0.5);o.start();o.stop(AC.currentTime+0.5); }
function thud(){ if(!AC)return; const s=AC.createBufferSource();s.buffer=noise(0.3);const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=180;const g=AC.createGain();s.connect(f);f.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(0.5,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+0.35);s.start(); }
function boom(){ if(!AC)return; const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(130,AC.currentTime);o.frequency.exponentialRampToValueAtTime(26,AC.currentTime+1.3);o.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(0.7,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+1.5);o.start();o.stop(AC.currentTime+1.5); }
function whisper(){ if(!AC)return; const s=AC.createBufferSource();s.buffer=noise(1.6);const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=1700;f.Q.value=7;const g=AC.createGain();
  const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=8;lg.gain.value=0.6;lfo.connect(lg);lg.connect(g.gain);
  s.connect(f);f.connect(g);g.connect(AC.destination);g.gain.value=0.09;s.start();lfo.start();s.stop(AC.currentTime+1.6);lfo.stop(AC.currentTime+1.6); }

// ============================ HELPERS de clima ============================
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let sayT=0;
function say(txt){ const s=$('sayT'); s.textContent=txt; s.classList.add('show'); clearTimeout(sayT); sayT=setTimeout(()=>s.classList.remove('show'),4200); }
let lightOn=false, baseLight=6.0;
function setLight(on){ lightOn=on; const v=on?baseLight:0; light.intensity=v; lamp.material.emissiveIntensity=on?1.6:0; amb.intensity=on?0.22:0.05; }
async function flicker(times=4){ for(let i=0;i<times;i++){ setLight(false); await sleep(40+Math.random()*60); setLight(true); light.intensity=baseLight*(0.5+Math.random()*0.5); await sleep(50+Math.random()*90); } setLight(true); }
async function blackout(ms){ setLight(false); await sleep(ms); }
function flash(){ const f=$('flash'); f.style.opacity='1'; setTimeout(()=>f.style.opacity='0',70); }
let shakeAmt=0; function shake(a){ shakeAmt=a; }

// ============================ ESTADO / INTERAÇÕES ============================
const G={ powered:false, floor:13, busy:false, phase:0 };
function interact(ud, obj){
  if(G.busy) return;
  switch(ud.act){
    case 'door': case undefined: break;
  }
  if(obj===doorL||obj===doorR){ thud(); shake(0.02); say('As portas não abrem. Alguma coisa as segura por fora.'); return; }
  if(ud.act==='panel'){ if(!G.powered) return powerOn(); say('O painel range. Os botões estão frios.'); return; }
  if(ud.act==='btn'){ if(!G.powered){ say('Morto. Nenhum botão responde.'); thud(); return; } pressFloor(ud.i, obj); return; }
  if(ud.act==='display'){ say(G.powered?`Andar ${G.floor}. Descendo.`:'O mostrador está apagado.'); return; }
  if(ud.act==='hatch'){ say('O alçapão do teto. Trancado — por cima.'); thud(); return; }
  if(ud.act==='mirror'){ say('Seu reflexo… demora um segundo a mais que você.'); return; }
}
async function powerOn(){
  G.busy=true; say('Você força o painel. Ele estala…'); thud(); await sleep(500);
  await flicker(5); setLight(true); if(humGain) humGain.gain.linearRampToValueAtTime(0.06,AC.currentTime+1);
  G.powered=true; setFloor(String(G.floor)); btns.forEach(b=>b.material.emissive.set('#25120e'));
  say('O elevador acende. Andar 13. Escolha um andar.'); G.busy=false;
}
async function pressFloor(i, obj){
  if(G.phase>0) { say('Não adianta. Ele só desce.'); return; }
  G.busy=true; G.phase=1; obj.material.emissive.set('#ff5a3a'); ding(680);
  say('O elevador começa a descer.');
  // descida com dings, contando os andares
  const seq=[12,11,10,9,8,7,6,5,4,3,2,1];
  for(const f of seq){ await sleep(620); G.floor=f; setFloor(String(f)); ding(700 - (13-f)*8); shake(0.006);
    if(Math.random()<0.25){ light.intensity=baseLight*0.4; await sleep(70); setLight(true); } }
  await sleep(500);
  // O SUSTO: passa do térreo
  setFloor('0'); ding(520); await sleep(700);
  say(''); shake(0.03); thud();
  await blackout(120); boom(); whisper(); flash();
  // no escuro, o vulto aparece atrás
  figure.material.opacity=0.9;
  await sleep(1500);
  await flicker(3); setLight(true);
  figure.material.opacity=0;                     // some quando a luz volta
  setFloor('-1'); disp.mat.emissive.set('#ff2a1a');
  say('Isto não é um andar.');
  G.busy=false; G.phase=2;
}

// ============================ LOOP ============================
let t=0;
function tick(){
  requestAnimationFrame(tick); t+=0.016;
  // respiração + tremor sutil
  const bx=Math.sin(t*0.9)*0.004, by=Math.sin(t*1.3+1)*0.004;
  camera.position.set(bx + (Math.random()-0.5)*shakeAmt, 1.55+by + (Math.random()-0.5)*shakeAmt, (Math.random()-0.5)*shakeAmt);
  shakeAmt*=0.9;
  // cintilar leve da luz quando ligada
  if(lightOn && !G.busy) light.intensity = baseLight*(0.94+Math.sin(t*13)*0.04+ (Math.random()<0.02?-0.35:0));
  renderer.render(scene,camera);
}
function resize(){ const w=innerWidth,h=innerHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }
addEventListener('resize',resize); resize(); applyCam(); tick();

// ============================ START ============================
$('startBtn').addEventListener('click', async ()=>{
  startAudio();
  $('start').style.transition='opacity 1.2s'; $('start').style.opacity='0';
  setTimeout(()=>$('start').remove(),1200);
  await sleep(400); thud(); say('As portas se fecham. O elevador se sacode e começa a descer.');
  await sleep(1600); say('Só a luz de emergência resiste. Ache o painel — olhe em volta.');
});
window.__ELEV={ G, powerOn, pressFloor:(i)=>pressFloor(i,btns[i]), setLight, faceYaw:(v)=>{ yaw=v; applyCam(); } };
