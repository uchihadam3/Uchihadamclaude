/* MESA DE DADOS ISOLADA (§16 passo 2) — rolar dados até ficar perfeito. */
import * as THREE from '../../vendor/three.module.js';
import { criarMalhaDado, criarMesa, luzes } from './render.js';
import { rolarPara } from './roll.js';
import { poliedro, raioDe } from './geometry.js';
import { makeDie, MATERIAIS, resetDieIds } from '../data/dice.js';
import { FACE_KINDS } from '../data/faces.js';
import { makeRNG } from '../rng.js';

const MESA = { x:3.4, z:2.4 };
const cv = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas:cv, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.45;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x07090b, 16, 34);
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
criarMesa(scene, MESA); luzes(scene);
/* ambiente para reflexo (obsidiana/metal) */
(function(){ const c=document.createElement('canvas'); c.width=c.height=128; const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,0,128); gr.addColorStop(0,'#cfe0f0'); gr.addColorStop(.5,'#5a6a78');
  gr.addColorStop(.5,'#14201a'); gr.addColorStop(1,'#070a08');
  g.fillStyle=gr; g.fillRect(0,0,128,128);
  const t=new THREE.CanvasTexture(c); t.mapping=THREE.EquirectangularReflectionMapping;
  scene.environment=new THREE.PMREMGenerator(renderer).fromEquirectangular(t).texture; })();

let tipo='d6', material='osso', nDados=5;
let malhas=[], trilhas=[], quadro=0, tempo=0, rolando=false;
const rng = makeRNG('mesa'+Date.now());

function montar(){
  for(const m of malhas){ scene.remove(m); m.geometry.dispose(); m.material.map?.dispose(); m.material.dispose(); }
  malhas=[]; resetDieIds();
  for(let i=0;i<nDados;i++){
    const d = makeDie(tipo, material);
    const m = criarMalhaDado(d, raioDe(d.tipo));
    m.position.set((i-(nDados-1)/2)*1.25, 0.5, 0);
    scene.add(m); malhas.push(m);
  }
  mostrar('—');
}
/* distribui os pontos de queda pela mesa (grade com leve jitter) */
function zonasDeQueda(n){
  const cols = Math.min(n, 4), rows = Math.ceil(n/cols);
  const out=[];
  for(let i=0;i<n;i++){
    const c=i%cols, r=Math.floor(i/cols);
    const x = cols===1?0 : (-1 + 2*c/(cols-1)) * MESA.x*0.58;
    const z = rows===1?0 : (-1 + 2*r/(rows-1)) * MESA.z*0.45;
    out.push([ x + (rng()*2-1)*0.18, z + (rng()*2-1)*0.18 ]);
  }
  return out;
}
function mostrar(txt){ document.getElementById('res').innerHTML = txt; }

function rolar(){
  if(rolando) return; rolando=true;
  const t0=performance.now();
  trilhas=[];
  const zonas = zonasDeQueda(malhas.length);
  const obst=[];                                  // dados já assentados = obstáculos sólidos
  for(let i=0;i<malhas.length;i++){
    const die = malhas[i].userData.die;
    const nF = poliedro(die.tipo).faces.length;
    const alvo = rng.int(nF);                     // ← o "motor de regras" sorteia AQUI
    const raio = raioDe(die.tipo);
    const r = rolarPara(die.tipo, alvo, rng.int(1e9), MESA, 180, zonas[i], obst.slice(), raio);
    trilhas.push({ tr:r.trilha, alvo, exato:r.exato, tent:r.tentativas, atraso:i*0.085 });
    if(r.fim) obst.push({ p:r.fim, r:raio });     // entra como obstáculo do próximo
  }
  const busca=(performance.now()-t0).toFixed(0);
  document.getElementById('perf').textContent = `busca ${busca}ms · ${trilhas.reduce((a,b)=>a+b.tent,0)} tentativas`;
  quadro=0; tempo=0; mostrar('rolando…');
  // espalha os dados na mesa (cada um com seu ponto de queda)
  trilhas.forEach(t=>{ t.offX=0; t.offZ=0; });   // a física já espalha na mesa
  const DT=1/120, VEL=1.45; let ultimo=performance.now();   // reprodução um tico acelerada
  const anim=()=>{
    const agora=performance.now();
    tempo += Math.min(0.05,(agora-ultimo)/1000)*VEL; ultimo=agora;
    quadro = Math.floor(tempo/DT);
    let vivos=false;
    trilhas.forEach((t,i)=>{
      const q = quadro - Math.round(t.atraso/DT);      // atraso: os dados não caem todos juntos
      if(q < 0){ malhas[i].visible = false; vivos = true; return; }
      malhas[i].visible = true;
      const f = Math.min(q, t.tr.length-1);
      if(q < t.tr.length) vivos=true;
      const s = t.tr[f];
      malhas[i].position.set(s.p[0]+t.offX, s.p[1], s.p[2]+t.offZ);
      malhas[i].quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]);
    });
    if(vivos) requestAnimationFrame(anim);
    else {
      rolando=false;
      const txt = trilhas.map((t,i)=>{
        const die = malhas[i].userData.die;
        const face = die.faces[t.alvo % die.faces.length];
        const K = FACE_KINDS[face.k];
        return face.k==='num' ? `<b>${face.v}</b>` : `<b>${K.glifo}</b>`;
      }).join('  ');
      const soma = trilhas.reduce((a,t,i)=>{ const f=malhas[i].userData.die.faces[t.alvo%malhas[i].userData.die.faces.length];
        return a + (f.k==='num'?f.v:0); },0);
      const exatos = trilhas.filter(t=>t.exato).length;
      mostrar(`${txt} &nbsp;·&nbsp; soma ${soma} &nbsp;·&nbsp; ${exatos}/${trilhas.length} na face pedida`);
    }
  };
  anim();
}

/* ---- UI ---- */
const mkBtn=(txt,on,cb)=>{ const b=document.createElement('button'); b.textContent=txt;
  if(on) b.className='on'; b.onclick=cb; return b; };
function ui(){
  const T=document.getElementById('tipos'), M=document.getElementById('mats');
  T.innerHTML=''; M.innerHTML='';
  for(const t of ['d4','d6','d8','d10','d12']) T.appendChild(mkBtn(t, t===tipo, ()=>{ tipo=t; montar(); ui(); }));
  for(const k in MATERIAIS) M.appendChild(mkBtn(MATERIAIS[k].nome, k===material, ()=>{ material=k; montar(); ui(); }));
}
document.getElementById('rolar').onclick=rolar;
document.getElementById('mais').onclick=()=>{ nDados=Math.min(8,nDados+1); montar(); };
document.getElementById('menos').onclick=()=>{ nDados=Math.max(1,nDados-1); montar(); };
function resize(){ const w=innerWidth,h=innerHeight;
  renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();
  // enquadra a mesa inteira (com folga), tanto em retrato quanto paisagem
  const need = Math.max(MESA.x/Math.max(camera.aspect,0.4), MESA.z*1.15) * 1.06;
  const dist = need / Math.tan((camera.fov*Math.PI/180)/2);
  // ângulo alto o bastante pra LER a face de cima, baixo o bastante pra ter volume
  camera.position.set(0, dist*0.90, dist*0.46); camera.lookAt(0,0.15,0); }
addEventListener('resize',resize); resize(); ui(); montar();
(function loop(){ renderer.render(scene,camera); requestAnimationFrame(loop); })();
window.__mesa={ rolar, montar, get malhas(){return malhas;}, get trilhas(){return trilhas;} };
