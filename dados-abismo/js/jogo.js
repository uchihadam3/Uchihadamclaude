/* ========================================================================
   DADOS DO ABISMO — o jogo (§16 passo 3): combate real usando o motor de
   regras puro + a mesa de dados 3D. Uma classe -> Masmorra 1 -> recompensas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { makeRNG } from './rng.js';
import { CLASSES, RESPIRAR } from './data/classes.js';
import { FACE_KINDS } from './data/faces.js';
import { Combat } from './engine/combat.js';
import { buildWave, burdensFor } from './engine/encounter.js';
import { satisfies, reqLabel, findSubset } from './engine/requirements.js';
import { gerarOpcoes, aplicar, recalcRelics } from './engine/rewards.js';
import { criarMalhaDado, criarMesa, luzes } from './dice3d/render.js';
import { rolarPara } from './dice3d/roll.js';
import { raioDe } from './dice3d/geometry.js';
import { ESCALADA } from './data/dungeons.js';

const MESA={x:3.4,z:2.0};
const $=id=>document.getElementById(id);
const rng=makeRNG('abismo-'+Date.now());

/* ---------- cena 3D ---------- */
const renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.4;
const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x07090b,17,36);
const camera=new THREE.PerspectiveCamera(42,1,0.1,60);
criarMesa(scene,MESA); luzes(scene);
(function(){const cv=document.createElement('canvas');cv.width=cv.height=128;const g=cv.getContext('2d');
 const gr=g.createLinearGradient(0,0,0,128);gr.addColorStop(0,'#cfe0f0');gr.addColorStop(.5,'#5a6a78');
 gr.addColorStop(.5,'#14201a');gr.addColorStop(1,'#070a08');g.fillStyle=gr;g.fillRect(0,0,128,128);
 const t=new THREE.CanvasTexture(cv);t.mapping=THREE.EquirectangularReflectionMapping;
 scene.environment=new THREE.PMREMGenerator(renderer).fromEquirectangular(t).texture;})();
const raycaster=new THREE.Raycaster(), mouse=new THREE.Vector2();

/* ---------- estado ---------- */
let C=null, P=null, cb=null, malhas=[], trilhas=[], anima=false;
let sel=new Set(), alvo=0, andar=1, masmorra=1;

/* ================= TELAS ================= */
function telaClasses(){
  const m=$('msg'); m.classList.remove('off');
  m.innerHTML=`<h1>DADOS DO ABISMO</h1>
    <p>Sua alma virou um punhado de dados. Desça o Abismo. A sorte é matéria-prima — o que você faz com ela é que decide.</p>
    <div class="cls">${Object.values(CLASSES).map(c=>`
      <button class="cbtn" data-c="${c.id}"><b>${c.glifo} ${c.nome}</b>
        <span>${c.mat} · ${c.bag().length} dados · ${c.hp} HP</span>
        <span style="opacity:.55;font-style:italic">${c.fantasia}</span></button>`).join('')}</div>`;
  m.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>iniciar(b.dataset.c));
}
function iniciar(cid){
  C=CLASSES[cid];
  P={ classe:cid, hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0, bag:C.bag(),
      statuses:{}, essence:0, rerollsBase:C.rerolls, relics:[], unlocked:[] };
  recalcRelics(P); andar=1; masmorra=1;
  $('msg').classList.add('off');
  novoCombate();
}
function novoCombate(){
  const inim=buildWave(masmorra,andar,rng);
  cb=new Combat({rng,player:P,enemies:inim,burdens:burdensFor(masmorra),log:true});
  montarDados(); cb.startTurn(); alvo=0; sel.clear();
  rolarVisual(); pintar();
}
/* ---------- dados 3D ---------- */
function montarDados(){
  for(const m of malhas){ scene.remove(m); m.geometry.dispose(); m.material.map?.dispose(); m.material.dispose(); }
  malhas=[];
  for(const d of P.bag){ const m=criarMalhaDado(d, raioDe(d.tipo)); m.visible=false; scene.add(m); malhas.push(m); }
}
function zonas(n){ const cols=Math.min(n,4), rows=Math.ceil(n/cols), o=[];
  for(let i=0;i<n;i++){ const c=i%cols, r=Math.floor(i/cols);
    o.push([ (cols===1?0:(-1+2*c/(cols-1))*MESA.x*0.60)+(rng()*2-1)*0.15,
             (rows===1?0:(-1+2*r/(rows-1))*MESA.z*0.45)+(rng()*2-1)*0.15 ]); } return o; }
function rolarVisual(){
  const ents=cb.roll; const z=zonas(ents.length); const obst=[]; trilhas=[];
  for(let i=0;i<ents.length;i++){
    const e=ents[i]; const mesh=malhas.find(m=>m.userData.die.id===e.dieId) || malhas[i];
    const raio=raioDe(e.tipo);
    const r=rolarPara(e.tipo, e.faceIdx||0, rng.int(1e9), MESA, 160, z[i], obst.slice(), raio);
    trilhas.push({ tr:r?r.trilha:[{p:[z[i][0],raio,z[i][1]],q:[0,0,0,1]}], mesh, atraso:i*0.08 });
    if(r&&r.fim) obst.push({p:r.fim,r:raio});
  }
  anima=true; const DT=1/120, VEL=1.5; let t=0, last=performance.now();
  const passo=()=>{ const now=performance.now(); t+=Math.min(0.05,(now-last)/1000)*VEL; last=now;
    let vivo=false;
    for(const x of trilhas){ const q=Math.floor((t-x.atraso)/DT);
      if(q<0){ x.mesh.visible=false; vivo=true; continue; }
      x.mesh.visible=true;
      const f=Math.min(q,x.tr.length-1); if(q<x.tr.length) vivo=true;
      const s=x.tr[f]; x.mesh.position.set(s.p[0],s.p[1],s.p[2]);
      x.mesh.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]); }
    if(vivo) requestAnimationFrame(passo); else { anima=false; pintar(); } };
  passo();
}
/* ---------- HUD ---------- */
const nomeFace=f=> f.k==='num'? f.v : (FACE_KINDS[f.k].glifo);
function pintar(){
  const es=cb.enemies;
  $('ini').innerHTML=es.map((e,i)=>{
    const it=e.intent; const txt = !it?'—' : it.t==='atk'?`⚔ ${it.v}` : it.t==='atk_multi'?`⚔ ${it.v}×${it.n}`
      : it.t==='block'?`🛡 ${it.v}` : it.t==='heal'?`✚ ${it.v}` : it.t==='buff'?'▲ fúria'
      : it.t==='curse'?'☠ maldição' : it.t==='debuff'?`▼ ${it.st}`:'—';
    const st=Object.entries(e.statuses||{}).filter(([,v])=>v>0).map(([k,v])=>`${k} ${v}`).join(' ');
    return `<div class="en ${e.hp<=0?'morto':''} ${i===alvo?'alvo':''}" data-i="${i}">
      <div class="nm">${e.nome}</div>${e.elite?'<div class="el">ELITE</div>':''}
      <div class="hpb"><i style="width:${Math.max(0,100*e.hp/e.maxHp)}%"></i></div>
      <div class="hp">${e.hp}/${e.maxHp}${e.block?' 🛡'+e.block:''}${e.armadura?' ⛊'+e.armadura:''}</div>
      <div class="it">${e.hp>0?txt:'—'}</div>${st?`<div class="st">${st}</div>`:''}</div>`;}).join('');
  $('ini').querySelectorAll('.en').forEach(d=>d.onclick=()=>{ alvo=+d.dataset.i; pintar(); });
  const stp=Object.entries(P.statuses||{}).filter(([,v])=>v>0).map(([k,v])=>`${k} ${v}`).join(' · ');
  $('voce').innerHTML=`<span class="pill">❤ <b>${P.hp}</b>/${P.maxHp}</span>
    <span class="pill">🛡 ${P.block}</span><span class="pill">⟳ ${cb.rerolls}</span>
    ${P.essence?`<span class="pill">✦ ${P.essence}</span>`:''}${stp?`<span class="pill">${stp}</span>`:''}`;
  const pool=cb.pool(), selEnts=cb.roll.filter(e=>sel.has(e.dieId));
  const skills=[...C.skills.filter(s=>!s.unlock), RESPIRAR];
  $('hab').innerHTML=skills.map((s,i)=>{
    const ok=selEnts.length&&satisfies(s.req,selEnts);
    const poss=findSubset(s.req,pool);
    return `<div class="h ${ok?'ok':(poss?'':'off')}" data-i="${i}">
      <div class="hn">${s.nome}</div><div class="hr">${reqLabel(s.req)}</div></div>`;}).join('');
  $('hab').querySelectorAll('.h').forEach(d=>d.onclick=()=>usar(skills[+d.dataset.i]));
  $('sel').textContent = selEnts.length? 'selecionado: '+selEnts.map(e=>nomeFace(e.face)).join(' , ') : 'toque nos dados para escolher';
  $('topo').innerHTML=`Masmorra ${masmorra} · Andar ${andar}/10<br><span style="opacity:.7">${ESCALADA[masmorra-1].nome}</span>`;
  $('log').innerHTML=cb.logLines.slice(-4).join('<br>');
  $('brer').disabled = cb.rerolls<=0 || anima;
  // dados usados ficam apagados
  for(const m of malhas){ const id=m.userData.die.id;
    const usado=cb.used.has(id); const selec=sel.has(id);
    m.material.emissive?.setHex(selec?0x554400:0x000000);
    m.material.emissiveIntensity = selec?0.8:0;
    m.material.opacity = usado?0.25:1; m.material.transparent = usado; }
}
/* ---------- ações ---------- */
function usar(s){
  if(anima) return;
  const ids=[...sel];
  const ents=cb.roll.filter(e=>sel.has(e.dieId));
  if(!ents.length || !satisfies(s.req,ents)){
    const poss=findSubset(s.req,cb.pool());
    if(poss){ sel=new Set(poss.map(i=>cb.pool()[i].dieId)); pintar(); }   // sugere o encaixe
    return;
  }
  cb.use(s, ids, alvo); sel.clear();
  if(cb.over) return fim();
  pintar();
}
$('brer').onclick=()=>{ if(anima||cb.rerolls<=0) return;
  const ids = sel.size? [...sel] : cb.pool().map(e=>e.dieId);
  cb.reroll(ids); sel.clear(); rolarVisual(); pintar(); };
$('bfim').onclick=()=>{ if(anima) return;
  sel.clear(); const r=cb.endTurn();
  if(r) return fim();
  rolarVisual(); pintar(); };
addEventListener('pointerdown', ev=>{
  if(anima) return;
  const r=renderer.domElement.getBoundingClientRect();
  mouse.x=((ev.clientX-r.left)/r.width)*2-1; mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hit=raycaster.intersectObjects(malhas.filter(m=>m.visible))[0];
  if(!hit) return;
  const id=hit.object.userData.die.id;
  if(cb.used.has(id)) return;
  sel.has(id)? sel.delete(id) : sel.add(id);
  pintar();
});
/* ---------- fim de combate ---------- */
function fim(){
  const m=$('msg'); m.classList.remove('off');
  if(cb.over==='lose'){
    m.innerHTML=`<h1>O ABISMO FICOU COM VOCÊ</h1>
      <p>Masmorra ${masmorra}, andar ${andar}. Você limpou ${(masmorra-1)*10+andar-1} andares.</p>
      <div class="cls"><button class="cbtn" id="rec"><b>▶ Descer de novo</b></button></div>`;
    $('rec').onclick=telaClasses; return;
  }
  const opts=gerarOpcoes(rng,P,3);
  m.innerHTML=`<h1>ANDAR LIMPO</h1><p>Escolha sua recompensa.</p>
    <div class="cls">${opts.map((o,i)=>`<button class="cbtn" data-i="${i}"><b>${o.nome}</b><span>${o.desc}</span></button>`).join('')}</div>`;
  m.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>{
    aplicar(opts[+b.dataset.i],P,rng);
    if(andar===5||andar===10) P.hp=Math.min(P.maxHp,P.hp+Math.round(P.maxHp*0.30));
    andar++; if(andar>10){ andar=1; masmorra++; }
    $('msg').classList.add('off'); novoCombate();
  });
}
/* ---------- loop ---------- */
function resize(){ const w=innerWidth,h=innerHeight;
  renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();
  const need=Math.max(MESA.x/Math.max(camera.aspect,0.4), MESA.z*1.15)*1.12;
  const d=need/Math.tan((camera.fov*Math.PI/180)/2);
  camera.position.set(0,d*0.92,d*0.44); camera.lookAt(0,0.1,0); }
addEventListener('resize',resize); resize();
(function loop(){ renderer.render(scene,camera); requestAnimationFrame(loop); })();
telaClasses();
window.__jogo={ get cb(){return cb;}, get P(){return P;}, usar, iniciar,
  sel, get malhas(){return malhas;} };
