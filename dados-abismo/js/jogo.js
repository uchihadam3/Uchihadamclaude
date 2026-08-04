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
import { gerarOpcoes, aplicar, recalcRelics, simularGravacao } from './engine/rewards.js';
import { MATERIAIS, TIPOS as TIPOS_N } from './data/dice.js';
import { RELIQUIAS } from './data/relics.js';
const RELIQ_COMUNS=RELIQUIAS.filter(r=>r.r==='comum');
import { criarMalhaDado, criarMesa, luzes, destacarResultado } from './dice3d/render.js';
import { rolarPara } from './dice3d/roll.js';
import { raioDe, pontoDeCima } from './dice3d/geometry.js';
import { ESCALADA, MASMORRAS } from './data/dungeons.js';
import { travaTxt } from './data/travas.js';
import * as GRIM from './grimorio.js';
import * as META from './meta.js';
import { spriteDe } from './sprites.js';
import * as SFX from './sfx.js';
import { tocarEfeito, tocarEfeitoInimigo } from './efeitos.js';
import { iconeDe, reqChips } from './icones.js';

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
const LBL=document.createElement('div'); LBL.id='lbls'; document.body.appendChild(LBL);
const badges=new Map();
function badgeDe(id){ let b=badges.get(id);
  if(!b){ b=document.createElement('div'); b.className='lbl'; LBL.appendChild(b); badges.set(id,b); } return b; }
function atualizarBadges(){
  if(!cb || anima){ for(const b of badges.values()) b.style.opacity=0; return; }
  const v=new THREE.Vector3();
  for(const m of malhas){
    const id=m.userData.die.id, b=badgeDe(id);
    const e=cb.roll.find(x=>x.dieId===id);
    if(!e || m.userData.naBandeja || !m.visible){ b.style.opacity=0; continue; }
    // âncora EXATA: ponta de cima do d4 / centro da face de cima nos outros
    const tp=m.userData.die.tipo;
    const q=[m.quaternion.x,m.quaternion.y,m.quaternion.z,m.quaternion.w];
    const o=pontoDeCima(tp, q, raioDe(tp));
    v.set(m.position.x+o[0], m.position.y+o[1]+0.15, m.position.z+o[2]); v.project(camera);
    const x=(v.x*0.5+0.5)*innerWidth, y=(-v.y*0.5+0.5)*innerHeight;
    const f=e.face, txt = f.k==='num'? f.v : (FACE_KINDS[f.k]?.glifo||'?');
    b.textContent=txt;
    b.className='lbl'+(cb.used.has(id)?' usado':'')+(sel.has(id)?' sel':'')
      +(previa&&previa.ids.includes(id)?' pre':'')+(f.k!=='num'?' simb':'');
    b.style.transform=`translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    b.style.opacity = cb.used.has(id)?0.35:1;
  }
}
const BANDEJA=[];                      // dados gastos, encostados no canto da mesa
function praBandeja(dieId){
  const m=malhas.find(x=>x.userData.die.id===dieId); if(!m || m.userData.naBandeja) return;
  m.userData.naBandeja=true;
  const k=BANDEJA.length; BANDEJA.push(m);
  // fileira na BORDA DA FRENTE da mesa (dentro do enquadramento), como um monte de gastos
  const porFila=6, col=k%porFila, fila=Math.floor(k/porFila);
  const destino=new THREE.Vector3(-MESA.x*0.80 + col*(MESA.x*1.6/(porFila-1)),
                                  0.14, MESA.z*0.84 - fila*0.46);
  const q0=m.quaternion.clone(), p0=m.position.clone();
  const q1=new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2,0,(k%2?0.2:-0.2)));
  const t0=performance.now(), dur=380;
  const voar=()=>{ const t=Math.min(1,(performance.now()-t0)/dur);
    const e=1-Math.pow(1-t,3);
    m.position.lerpVectors(p0,destino,e); m.position.y = p0.y+(0.16-p0.y)*e + Math.sin(e*Math.PI)*0.75;
    m.quaternion.slerpQuaternions(q0,q1,e);
    m.scale.setScalar(1-0.28*e);
    if(t<1) requestAnimationFrame(voar); };
  voar(); SFX.soltar();
}
function limparBandeja(){ BANDEJA.length=0; for(const m of malhas){ m.userData.naBandeja=false; m.scale.setScalar(1);} }
let cofre=META.carregar(), BON=META.bonus(cofre);
let stats={andares:0, elites:0, chefes:0};
let previa=null;                 // {skill, ids, pv} — telegrafia (§12)
const ICO={veneno:'☠',sangramento:'🩸',queimadura:'🔥',congelado:'❄',fratura:'✖',marca:'🎯',
           maldicao:'☠',frenesi:'▲',espinhos:'✦',armadura:'⛊'};
function calcPrevia(s){
  const ents=cb.roll.filter(e=>sel.has(e.dieId));
  let ids = (ents.length && satisfies(s.req,ents)) ? [...sel] : null;
  if(!ids){ const idx=findSubset(s.req, cb.pool()); if(!idx) return null;
    ids = idx.map(i=>cb.pool()[i].dieId); }
  const pv=cb.prever(s, ids, alvo); if(!pv) return null;
  return { skill:s, ids, pv };
}

/* ================= TELAS ================= */
function telaTitulo(){
  cofre=META.carregar(); BON=META.bonus(cofre);
  const m=$('msg'); m.classList.remove('off'); m.className='';
  const rec=cofre.recordes||{andar:0,masmorra:1};
  m.innerHTML=`<div class="titwrap">
    <div class="tit">
      <div class="tit1">DADOS</div><div class="tit2">DO ABISMO</div>
      <div class="titsub">a sorte é matéria-prima</div>
    </div>
    <div class="ecos"><span class="eic">◈</span><b>${cofre.ecos}</b><i>ecos</i></div>
    <div class="mbtns">
      <button class="mb pri" data-a="jogar">▶ DESCER</button>
      <button class="mb" data-a="grim">📖 GRIMÓRIO <em>como se joga</em></button>
      <button class="mb cof" data-a="cofre">🗝 O COFRE <em>${Object.keys(cofre.comprados||{}).length}/${META.NOS.length}</em></button>
    </div>
    <div class="recs">
      <span>runs <b>${cofre.runs||0}</b></span>
      <span>recorde <b>M${rec.masmorra}·A${rec.andar}</b></span>
      <span>vitórias <b>${cofre.vitorias||0}</b></span>
    </div></div>`;
  bindA(m,{ jogar:telaClasses, cofre:telaCofre, grim:()=>telaGrimorio(null, telaTitulo) });
}
function bindA(root,map){ root.querySelectorAll('[data-a]').forEach(b=>{
  b.onclick=()=>{ SFX.pegar(); map[b.dataset.a](); }; }); }

function telaCofre(){
  const m=$('msg'); m.className='';
  const ramos=Object.entries(META.RAMOS).map(([k,r])=>{
    const nos=META.NOS.filter(n=>n.ramo===k).map(no=>{
      const nv=META.nivelDe(cofre,no.id), max=nv>=no.max;
      const disp=META.disponivel(cofre,no), c=META.custoDe(no,nv);
      const pode=disp && cofre.ecos>=c;
      const trav=(no.req||[]).some(q=>META.nivelDe(cofre,q)<1);
      return `<button class="no ${max?'max':''} ${pode?'pode':''} ${trav?'trav':''}" data-no="${no.id}">
        <div class="noh"><b>${no.nome}</b><span class="pips">${
          Array.from({length:no.max},(_,i)=>`<i class="${i<nv?'on':''}"></i>`).join('')}</span></div>
        <div class="notxt">${no.txt(Math.max(1,nv+(max?0:1)))}</div>
        <div class="nofoot">${trav?`🔒 requer ${(no.req||[]).map(q=>META.NOS.find(x=>x.id===q).nome).join(', ')}`
          : max?'MÁXIMO':`<span class="cst ${pode?'ok':''}">◈ ${c}</span>`}</div></button>`;}).join('');
    return `<div class="ramo" style="--rc:${r.cor}">
      <div class="rh"><span class="ri">${r.icone}</span><b>${r.nome}</b><i>${r.sub}</i></div>
      <div class="nos">${nos}</div></div>`;}).join('');
  m.innerHTML=`<div class="cofwrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button>
      <h2>O COFRE</h2><div class="ecos sm"><span class="eic">◈</span><b>${cofre.ecos}</b></div></div>
    <p class="cofp">Melhorias <b>permanentes</b>. Elas ficam entre as runs — cada descida te deixa mais forte.</p>
    <div class="ramos">${ramos}</div>
    <button class="mb pri" data-a="voltar2">▶ DESCER AGORA</button></div>`;
  bindA(m,{ voltar:telaTitulo, voltar2:telaClasses });
  m.querySelectorAll('.no').forEach(b=>b.onclick=()=>{
    const no=META.NOS.find(x=>x.id===b.dataset.no);
    if(META.comprar(cofre,no)){ SFX.buy?SFX.buy():SFX.vitoria(); BON=META.bonus(cofre); telaCofre(); }
    else SFX.soltar();
  });
}
function telaClasses(){
  const m=$('msg'); m.classList.remove('off'); m.className='';
  m.innerHTML=`<div class="clswrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button><h2>ESCOLHA SUA ALMA</h2></div>
    <div class="cls">${Object.values(CLASSES).map(c=>{
      const b=c.bag();
      return `<button class="cbtn" data-c="${c.id}" style="--cc:${c.cor}">
        <div class="cglifo">${c.glifo}</div>
        <div class="cinfo"><b>${c.nome}</b>
          <span class="cmat">${c.mat}</span>
          <div class="cchave">🗝 ${c.chave}</div>
          <div class="cstats"><i>❤ ${c.hp+BON.hpBonus}</i><i>🎲 ${b.length+BON.dadosExtra}</i><i>⟳ ${c.rerolls+BON.rerolls}</i></div>
          <span class="cfan">${c.fantasia}</span></div></button>`;}).join('')}</div></div>`;
  bindA(m,{ voltar:telaTitulo });
  m.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>{ SFX.vitoria(); iniciar(b.dataset.c); });
}
function iniciar(cid){
  C=CLASSES[cid];
  const bag=C.bag();
  for(let i=0;i<BON.dadosExtra;i++) bag.push(bag[i%bag.length] ? {...bag[0], id:'X'+i, faces:bag[0].faces.map(f=>({...f}))} : null);
  P={ classe:cid, hp:C.hp+BON.hpBonus, maxHp:C.hp+BON.hpBonus, baseMaxHp:C.hp+BON.hpBonus, block:0,
      bag:bag.filter(Boolean), statuses:{}, essence:0,
      rerollsBase:C.rerolls+BON.rerolls, relics:[], unlocked:BON.quarta?['coroa_'+cid]:[],
      polegar:BON.polegar, gazua:BON.gazua };
  // gravações iniciais do Cofre (Lâmina / Curinga / Eco)
  const grav=(k,q)=>{ for(let i=0;i<q;i++){ const d=P.bag[i%P.bag.length];
    const j=d.faces.findIndex(f=>f.k==='num'); if(j>=0) d.faces[j]={k, v:d.faces[j].v}; } };
  grav('blade',BON.lamina); grav('wild',BON.curinga); grav('echo',BON.eco);
  if(BON.dmgFlat||BON.blockStart){ P.relics.push({id:'_cofre',nome:'Cofre',r:'comum',txt:'',
    mods:{dmgFlat:BON.dmgFlat}, start:{block:BON.blockStart}}); }
  for(let i=0;i<BON.reliquias;i++){ const pool=RELIQ_COMUNS.filter(r=>!P.relics.some(x=>x.id===r.id));
    if(pool.length) P.relics.push(pool[rng.int(pool.length)]); }
  recalcRelics(P);
  andar=1; masmorra=BON.portal>1?BON.portal:1;
  stats={andares:0, elites:0, chefes:0};
  telaMapa(false);
}
/* ---------- CARTÃO DE EXPLICAÇÃO: um efeito de cada vez ----------
   No meio da luta você quer saber UMA coisa, não ler o manual. Toque no
   efeito (fechadura, intenção, estado) e ele se explica ali mesmo. */
const POP=document.createElement('div'); POP.id='pop'; POP.className='off';
document.body.appendChild(POP);
POP.onclick=e=>{ if(e.target===POP||e.target.dataset.fecha!==undefined) fecharPop(); };
function fecharPop(){ POP.className='off'; POP.innerHTML=''; }
function explicar(tipo, chave, v){
  const x = GRIM.verbete(tipo, chave, v); if(!x) return;
  SFX.pegar();
  POP.innerHTML=`<div class="popcard">
    <div class="pophd"><span class="popico">${x.ico}</span>
      <div><b>${x.nome}</b>${x.sub?`<i>${x.sub}</i>`:''}</div></div>
    <p class="popd">${x.d}</p>
    ${x.ex?`<div class="gex">
       <div class="gok">✓ causa dano: ${x.ex.bom}</div>
       <div class="gno">✕ causa ZERO: ${x.ex.ruim}</div></div>`:''}
    ${x.rodape?`<p class="poprod">${x.rodape}</p>`:''}
    <div class="popbts">
      <button class="popb" data-fecha>ENTENDI</button>
      <button class="popb ver" data-mais>ver tudo no Grimório</button>
    </div></div>`;
  POP.className='';
  POP.querySelector('[data-mais]').onclick=ev=>{ ev.stopPropagation(); fecharPop();
    telaGrimorio(tipo==='trava'?chave:null, 'combate'); };
}
/* ---------- O GRIMÓRIO: o que cada coisa faz (§12) ---------- */
let voltarDoGrim=null;
function telaGrimorio(foco, voltar){
  voltarDoGrim = voltar || voltarDoGrim;
  const m=$('msg'); m.classList.remove('off'); m.className='';
  m.innerHTML=`<div class="grimwrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button><h2>GRIMÓRIO</h2></div>
    <p class="cofp">Nada aqui é segredo. Se você não entendeu por que um golpe deu
      <b>zero</b>, a resposta está em <b>Fechaduras</b>.</p>
    <div class="gnav">${GRIM.SECOES.map(x=>`<button class="gtab" data-g="${x.id}">${x.ico} ${x.nome.split('—')[0].trim()}</button>`).join('')}</div>
    ${GRIM.html(foco)}
    <button class="mb pri" data-a="voltar">◀ VOLTAR</button>
  </div>`;
  bindA(m,{ voltar:()=>{ const v=voltarDoGrim; voltarDoGrim=null;
    if(v==='combate'){ m.classList.add('off'); pintar(); } else if(typeof v==='function'){ v(); } else telaTitulo(); } });
  m.querySelectorAll('.gtab').forEach(b=>b.onclick=()=>{ SFX.pegar();
    m.querySelector(`.gsec[data-s="${b.dataset.g}"]`)?.scrollIntoView({behavior:'smooth',block:'start'}); });
  if(foco) requestAnimationFrame(()=>
    m.querySelector('.gitem.foco')?.scrollIntoView({behavior:'smooth',block:'center'}));
}
/* ---------- MAPA DA MASMORRA (§3.1) ---------- */
const TIPO_ANDAR = a => a===10?'chefe' : a===5?'subchefe' : (a===3||a===4||a>=6)?'elite':'comum';
const ICO_ANDAR = { comum:'⚔', elite:'☠', subchefe:'👹', chefe:'💀' };
function previaOnda(m,a){
  const M = (a===10) ? [MASM(m).chefe] : (a===5) ? [MASM(m).subchefe] : null;
  if(M) return M.map(x=>x.nome);
  return null;
}
const MASM = m => (MASMORRAS[m]||MASMORRAS[1]);
function telaMapa(entrando){
  SFX.trilha('batalha');
  const msg=$('msg'); msg.classList.remove('off'); msg.className='';
  const esc=ESCALADA[masmorra-1];
  const nos=Array.from({length:10},(_,i)=>{
    const a=i+1, t=TIPO_ANDAR(a), feito=a<andar, atual=a===andar;
    const nome=previaOnda(masmorra,a);
    return `<div class="mno ${t} ${feito?'feito':''} ${atual?'atual':''}" data-a="${a}">
      <div class="mic">${feito?'✓':ICO_ANDAR[t]}</div>
      <div class="mnum">${a}</div>
      ${nome?`<div class="mnome">${nome[0]}</div>`:''}
      ${(a===5||a===10)?'<div class="msant">santuário</div>':''}
    </div>`;}).join('<div class="mlig"></div>');
  msg.innerHTML=`<div class="mapwrap">
    <div class="maphd"><div class="mapm">MASMORRA ${masmorra}</div>
      <h2>${esc.nome}</h2>
      <div class="mesc">inimigos deste andar: <b>❤ ×${(esc.hp*(1+(andar-1)*0.070)).toFixed(1)}</b>
        <b>⚔ ×${(esc.dano*(1+(andar-1)*0.055)).toFixed(1)}</b></div>
      ${esc.fardoTxt&&esc.fardoTxt!=='—'?`<div class="mfardo">⚠ ${esc.fardoTxt}</div>`:''}</div>
    <div class="mtrilha">${nos}</div>
    <div class="mpe"><span class="mmarc" id="marc">◈</span></div>
    <button class="mb pri" data-a="entrar">▶ ENTRAR NO ANDAR ${andar}</button>
  </div>`;
  bindA(msg,{ entrar:()=>{ msg.classList.add('off'); novoCombate(); } });
  // marcador anda até o andar atual
  requestAnimationFrame(()=>{
    const alvoEl=msg.querySelector('.mno.atual'), trilha=msg.querySelector('.mtrilha');
    const marc=$('marc'); if(!alvoEl||!marc) return;
    const r=alvoEl.getBoundingClientRect(), rt=trilha.getBoundingClientRect();
    const de=entrando? (msg.querySelector(`.mno[data-a="${Math.max(1,andar-1)}"]`)?.getBoundingClientRect()||r) : r;
    marc.style.transition='none';
    marc.style.left=(de.left-rt.left+de.width/2)+'px';
    marc.style.top=(de.top-rt.top+de.height/2)+'px';
    requestAnimationFrame(()=>{ marc.style.transition='left .55s cubic-bezier(.3,.9,.3,1),top .55s';
      marc.style.left=(r.left-rt.left+r.width/2)+'px';
      marc.style.top=(r.top-rt.top+r.height/2)+'px';
      if(entrando) SFX.pegar(); });
  });
}
function novoCombate(){
  SFX.trilha(andar===5||andar===10 ? 'chefe' : 'batalha');
  const inim=buildWave(masmorra,andar,rng);
  cb=new Combat({rng,player:P,enemies:inim,burdens:burdensFor(masmorra),log:true});
  montarDados(); limparBandeja(); cb.startTurn(); alvo=0; sel.clear();
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
  limparBandeja();
  anima=true; const DT=1/120, VEL=1.5; let t=0, last=performance.now();
  const passo=()=>{ const now=performance.now(); t+=Math.min(0.05,(now-last)/1000)*VEL; last=now;
    let vivo=false;
    for(const x of trilhas){ if(x.mesh.userData.naBandeja) continue;
      const q=Math.floor((t-x.atraso)/DT);
      if(q<0){ x.mesh.visible=false; vivo=true; continue; }
      x.mesh.visible=true;
      const f=Math.min(q,x.tr.length-1); if(q<x.tr.length) vivo=true;
      const s=x.tr[f]; x.mesh.position.set(s.p[0],s.p[1],s.p[2]);
      x.mesh.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]);
      if(s.imp) for(const im of s.imp) SFX.dado(im.vel); }
    if(vivo) requestAnimationFrame(passo); else { anima=false;
      // marca o RESULTADO no próprio dado (d4: número do vértice de cima em ouro)
      for(let i=0;i<trilhas.length;i++){ const e=cb.roll[i];
        if(e && trilhas[i].mesh) destacarResultado(trilhas[i].mesh, e.faceIdx); }
      pintar(); } };
  passo();
}
/* ---------- HUD ---------- */
const nomeFace=f=> f.k==='num'? f.v : (FACE_KINDS[f.k].glifo);
function pintar(){
  const es=cb.enemies;
  const pi=cb.previsaoInimigo();
  const mapaPrev={}; if(previa) for(const a of previa.pv.alvos) mapaPrev[a.uid]=a;
  // o que a sua seleção atual vale para as fechaduras
  const selAgora=cb.roll.filter(x=>sel.has(x.dieId));
  const alocSel = selAgora.length ? (()=>{ const v=selAgora.map(x=>{
      const q=x.face.k==='wild'?null:(x.face.v??null); return q; }).filter(q=>q!==null);
    return { sum:v.reduce((a,b)=>a+b,0), max:v.length?Math.max(...v):0, min:v.length?Math.min(...v):0,
             count:selAgora.length, vals:v, simbolos:selAgora.map(x=>x.face.k).filter(k=>k!=='num') }; })() : null;
  $('ini').innerHTML=es.map((e,i)=>{
    const it=e.intent; const txt = !it?'—' : it.t==='atk'?`⚔ ${it.v}` : it.t==='atk_multi'?`⚔ ${it.v}×${it.n}`
      : it.t==='block'?`🛡 ${it.v}` : it.t==='heal'?`✚ ${it.v}` : it.t==='buff'?'▲ fúria'
      : it.t==='curse'?'☠ maldição' : it.t==='debuff'?`▼ ${it.st}`
      : it.t==='congelar'?'❄ congela 1 dado' : it.t==='roubar'?'✋ rouba 1 dado'
      : it.t==='fraturar'?'✖ fratura 1 dado' : it.t==='inverter'?'⇅ inverte 1 dado'
      : it.t==='contar'?`🕳 conta ${(e._conta||0)+1}/${it.ate}${(e._conta||0)+1>=it.ate?` — A CONTA ⚔ ${Math.round(it.v*(e.mult||1))}`:''}`
      :'—';
    /* ===== FECHADURA (§6): a regra do inimigo, e se a sua mão a abre AGORA ===== */
    const tr=cb.travaDe(e), td=travaTxt(tr);
    const aberta = !tr || e._arrombada || e.travaOff>0 || (alocSel && cb.abre(e, alocSel));
    const travaHTML = td ? `<div class="trava ${e._arrombada||e.travaOff>0?'off':(alocSel? (aberta?'abre':'fecha') : '')}"
        data-tr="${tr?tr.t:''}" title="${td.txt} — toque para entender"><span class="tico">${td.ico}</span><span class="ttx">${
        e._arrombada?'ARROMBADA' : e.travaOff>0?`DISSOLVIDA (${e.travaOff})` : td.curto}</span>${
        alocSel&&tr&&!e._arrombada&&!(e.travaOff>0) ? `<span class="tst">${aberta?'✓ ABRE':'✕ TRAVA'}</span>`
          : '<span class="tq">?</span>'}</div>` : '';
    const st=Object.entries(e.statuses||{}).filter(([,v])=>v>0)
      .map(([k,v])=>`<b class="stc" data-est="${k}" data-estn="${v}">${ICO[k]||''}${v}</b>`).join(' ');
    const li=pi.linhas.find(l=>l.uid===e.uid);
    const pr=mapaPrev[e.uid];
    const prevHTML = pr ? `<div class="prev ${pr.morre?'mata':''}">
        ${pr.dano?`<span class="pd">-${pr.dano}</span>`:''}
        ${pr.estados.map(x=>`<span class="pe">${ICO[x.st]||'•'}${x.n}</span>`).join('')}
        ${pr.morre?'<span class="pk">☠</span>':''}</div>` : '';
    const barraPrev = pr&&pr.dano ? `<i class="perda" style="width:${Math.min(100,100*pr.dano/e.maxHp)}%;
        right:${Math.max(0,100-100*e.hp/e.maxHp)}%"></i>` : '';
    return `<div class="en ${e.hp<=0?'morto':''} ${i===alvo?'alvo':''} ${pr?'napre':''}" data-i="${i}" data-uid="${e.uid}">
      ${prevHTML}
      <div class="spr"><img src="${spriteDe(e.id)}" alt=""></div>
      <div class="nm">${e.nome}</div>${e.elite?'<div class="el">ELITE</div>':''}
      <div class="hpb"><i style="width:${Math.max(0,100*e.hp/e.maxHp)}%"></i>${barraPrev}</div>
      <div class="hp">${e.hp}/${e.maxHp}${e.block?' 🛡'+e.block:''}${e.armadura?' ⛊'+e.armadura:''}</div>
      ${travaHTML}
      <div class="it clic ${li&&li.passa>0?'doi':''}" ${it?`data-int="${it.t}"`:''}>${e.hp>0?txt:'—'}${li&&li.bruto>0?`<span class="passa">→ ${li.passa} no HP</span>`:''}</div>
      ${st?`<div class="st">${st}</div>`:''}</div>`;}).join('');
  $('ini').querySelectorAll('.en').forEach(d=>d.onclick=()=>{ alvo=+d.dataset.i;
    if(previa) previa=calcPrevia(previa.skill); SFX.pegar(); pintar(); });
  const stp=Object.entries(P.statuses||{}).filter(([,v])=>v>0)
    .map(([k,v])=>`<b class="stc" data-est="${k}" data-estn="${v}">${ICO[k]||''} ${k} ${v}</b>`).join(' ');
  $('voce').innerHTML=`<span class="pill perigo ${pi.letal?'letal':''}">☠ ${pi.total}</span>
    <span class="pill">❤ <b>${P.hp}</b>/${P.maxHp}</span>
    <span class="pill">🛡 ${P.block}</span><span class="pill">⟳ ${cb.rerolls}</span>
    ${P.essence?`<span class="pill">✦ ${P.essence}</span>`:''}${stp?`<span class="pill">${stp}</span>`:''}`;
  const pool=cb.pool(), selEnts=cb.roll.filter(e=>sel.has(e.dieId));
  const skills=habilidadesAtuais();
  $('hab').innerHTML=skills.map((s,i)=>{
    const ok=selEnts.length&&satisfies(s.req,selEnts);
    const poss=findSubset(s.req,pool);
    // prévia SEMPRE que houver encaixe: a da seleção, ou a do melhor possível.
    // Sem isso você tinha que adivinhar quais dados a habilidade quer (§12).
    const idsPre = ok ? [...sel] : (poss ? poss.map(k=>pool[k].dieId) : null);
    const p2 = previa && previa.skill.id===s.id ? previa.pv
             : (idsPre ? cb.prever(s, idsPre, alvo) : null);
    const usaria = (!ok && poss) ? poss.map(k=>nomeFace(pool[k].face)).join('+') : '';
    const mortes = p2 ? p2.alvos.filter(a=>a.morre).length : 0;
    const dano = p2 ? p2.alvos.reduce((a,x)=>a+x.dano,0) : 0;
    const selo = p2 ? `<div class="hsel">
        ${dano?`<b class="hd">-${dano}</b>`:''}
        ${p2.bloqueio?`<b class="hb">🛡${p2.bloqueio}</b>`:''}
        ${p2.curaHP?`<b class="hc">✚${p2.curaHP}</b>`:''}
        ${p2.custoHP?`<b class="hx">❤-${p2.custoHP}</b>`:''}
        ${mortes?`<b class="hk">☠${mortes>1?mortes:''}</b>`:''}</div>` : '';
    const estado = ok ? 'PRONTA' : poss ? 'usa '+usaria : 'sem encaixe';
    const ativa = previa && previa.skill.id===s.id;
    return `<button class="h ${ok?'ok':(poss?'pode':'off')} ${ativa?'pre':''}" data-i="${i}"
        style="--hc:${C.cor}" title="${s.desc.replace(/"/g,'&quot;')}">
      <span class="hbrilho"></span>
      <span class="htopo">${iconeDe(s.id)}<span class="hn">${s.nome}</span></span>
      <span class="hreq">${reqChips(s.req)}</span>
      ${selo}
      <span class="hest">${estado}</span>
    </button>`;}).join('');
  $('hab').querySelectorAll('.h').forEach(d=>{
    const sk=skills[+d.dataset.i];
    d.onclick=()=>usar(sk);
    d.onpointerenter=()=>{ if(anima) return; const pv=calcPrevia(sk);
      if(pv){ previa=pv; pintar(); } };
    d.onpointerleave=()=>{ if(previa && previa.skill.id===sk.id){ previa=null; pintar(); } };
  });
  const podePol = cb._polegar>0 && selEnts.length===1 && selEnts[0].face.k!=='wild' && selEnts[0].face.v!=null;
  const alvoEn = cb.aliveEnemies()[Math.min(alvo,Math.max(0,cb.aliveEnemies().length-1))];
  const podeGaz = cb._gazua>0 && alvoEn && cb.travaDe(alvoEn) && !alvoEn._arrombada;
  $('sel').innerHTML = `<span class="selt">${selEnts.length
      ? 'selecionado: '+selEnts.map(e=>nomeFace(e.face)).join(' , ')
      : 'toque nos dados para escolher'}</span>`
    + (podePol?`<button class="fer" id="pmenos">−1</button><button class="fer" id="pmais">+1</button>
        <span class="fern">polegar ${cb._polegar}</span>`:'')
    + (podeGaz?`<button class="fer gaz" id="bgaz">🗝 GAZUA ${cb._gazua}</button>`:'')
    + (passivaBtn(selEnts)||'');
  if(podePol){ const id=selEnts[0].dieId;
    $('pmenos').onclick=e=>{ e.stopPropagation(); if(cb.polegar(id,-1)){ SFX.pegar(); pintar(); } };
    $('pmais').onclick =e=>{ e.stopPropagation(); if(cb.polegar(id, 1)){ SFX.pegar(); pintar(); } }; }
  if(podeGaz) $('bgaz').onclick=e=>{ e.stopPropagation();
    if(cb.gazua(alvo)){ SFX.vitoria(); pintar(); } };
  const bp=$('bpass');
  if(bp) bp.onclick=e=>{ e.stopPropagation(); const id=selEnts[0].dieId;
    const f={carrasco:()=>cb.sobrecarga(id), lamina:()=>cb.trapaca(id),
             arcanista:()=>cb.guardar(id),  oracula:()=>cb.travar(id)}[C.id];
    if(f&&f()){ SFX.pegar(); if(C.id==='arcanista') sel.delete(id); pintar(); } else SFX.soltar(); };
  const vivos=cb.aliveEnemies().length;
  $('topo').innerHTML=`Masmorra ${masmorra} · Andar ${andar}/10 <span style="opacity:.6">— ${ESCALADA[masmorra-1].nome}</span>`
    + (vivos>3?` <span class="tinim">${vivos} inimigos · arraste ↔</span>`:'');
  $('log').innerHTML=cb.logLines.slice(-3).join('<br>');
  $('brer').disabled = cb.rerolls<=0 || anima;
  // tocar num efeito do inimigo explica AQUELE efeito, sem sair do combate
  $('ini').querySelectorAll('.trava').forEach(el=>el.onclick=ev=>{ ev.stopPropagation();
    explicar('trava', el.dataset.tr); });
  $('ini').querySelectorAll('.it[data-int]').forEach(el=>el.onclick=ev=>{ ev.stopPropagation();
    explicar('intencao', el.dataset.int); });
  document.querySelectorAll('[data-est]').forEach(el=>el.onclick=ev=>{ ev.stopPropagation();
    explicar('estado', el.dataset.est, el.dataset.estn); });
  SFX.tensao(P.hp < P.maxHp*0.35);
  // dados usados ficam apagados
  for(const m of malhas){ const id=m.userData.die.id;
    if(m.userData.naBandeja){ m.material.opacity=0.55; m.material.transparent=true;
      m.material.emissiveIntensity=0; continue; }
    const usado=cb.used.has(id), selec=sel.has(id);
    const napre = previa && previa.ids.includes(id);
    m.material.emissive?.setHex(napre?0x8a6a00 : selec?0x554400 : 0x000000);
    m.material.emissiveIntensity = napre?1.5 : selec?0.8 : 0;
    m.scale.setScalar(napre?1.16:1);
    m.material.opacity = usado?0.22:1; m.material.transparent = usado; }
}
/* a PASSIVA da classe é o verbo de fechadura grátis de cada uma (§7) */
function passivaBtn(selEnts){
  if(selEnts.length!==1 || !cb) return '';
  const e=selEnts[0], num = e.face.k!=='wild' && e.face.v!=null;
  const P_={ carrasco:{t:`⚒ +1 (−2 ❤)`, ok:num && P.hp>2},
             lamina:  {t:`🗡 virar (${e.n+1-(e.face.v||0)})`, ok:num && !cb.trapacaUsada},
             arcanista:{t:`✦ guardar no Círculo`, ok:!cb._guardou},
             oracula: {t:`◈ travar p/ o próximo`, ok:!cb._travou} }[C.id];
  if(!P_ || !P_.ok) return '';
  return `<button class="fer pas" id="bpass">${P_.t}</button>`;
}
/* ---------- ações ---------- */
/* som próprio por habilidade */
const SOM={ decapitar:()=>SFX.golpe(30), carniceiro:()=>SFX.golpe(34),
  muralha:()=>SFX.bloqueio(), respirar:()=>SFX.bloqueio(),
  furia:()=>{SFX.golpe(24);setTimeout(()=>SFX.golpe(18),90);},
  milcortes:()=>{for(let i=0;i<5;i++) setTimeout(()=>SFX.golpe(8),i*70);},
  enxame:()=>{for(let i=0;i<8;i++) setTimeout(()=>SFX.golpe(7),i*55);},
  veneno:()=>SFX.morte(), sumir:()=>SFX.pegar(),
  raio:()=>{SFX.golpe(20);SFX.pegar();}, nova:()=>{SFX.bloqueio();setTimeout(()=>SFX.golpe(16),80);},
  colapso:()=>{SFX.vitoria();SFX.golpe(40);}, prisma:()=>SFX.vitoria(),
  tecer:()=>SFX.pegar(), julgamento:()=>{SFX.golpe(38);setTimeout(()=>SFX.vitoria(),120);},
  fio:()=>SFX.bloqueio(), tapecaria:()=>SFX.vitoria() };
function efeitoHabilidade(skill, pv){
  (SOM[skill.id]||(()=>SFX.golpe(14)))();
  const cards=[...document.querySelectorAll('.en')];
  const alvos = pv && pv.alvos.length ? pv.alvos.map(a=>a.uid) : null;
  if(alvos){ for(const uid of alvos){ const el=cards.find(c=>c.dataset.uid===uid);
      if(el) tocarEfeito(skill.id, el, pv.alvos.find(a=>a.uid===uid)?.dano||5); } }
  else { const el=document.getElementById('voce'); if(el) tocarEfeito(skill.id, el); }
}
/* ===== O TURNO DO INIMIGO ACONTECE NA TELA, um de cada vez ===== */
const PROJ=document.createElement('div'); PROJ.id='proj'; document.body.appendChild(PROJ);
const RGT={ atk:'⚔', atk_multi:'⚔', curse:'☠', debuff:'▼', heal:'✚', block:'🛡', buff:'▲', summon:'✦' };
function centro(el){ const r=el.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2]; }
function projetil(de, para, cor, glifo){
  const p=document.createElement('div'); p.className='pj'+(cor?' '+cor:''); p.textContent=glifo||'';
  p.style.transform=`translate(${de[0]}px,${de[1]}px) scale(.6)`; PROJ.appendChild(p);
  requestAnimationFrame(()=>{ p.style.transform=`translate(${para[0]}px,${para[1]}px) scale(1.5)`; });
  setTimeout(()=>{ p.style.opacity=0; }, 300);
  setTimeout(()=>p.remove(), 460);
}
function animarInimigos(acoes){
  if(!acoes || !acoes.length) return 0;
  acoes.forEach((a,i)=> setTimeout(()=>{
    const el=document.querySelector(`.en[data-uid="${a.uid}"]`);
    if(el){ el.classList.remove('atacando'); void el.offsetWidth; el.classList.add('atacando');
            tocarEfeitoInimigo(a.t, el, a.n); }
    const alvoEl = a.t==='heal' ? document.querySelector(`.en[data-uid="${a.curado}"]`) : $('voce');
    if(el && alvoEl){
      const cor = a.t==='heal'?'verde' : (a.t==='curse'||a.t==='debuff')?'roxo':'';
      const tiros = a.t==='atk_multi' ? Math.min(4, a.n||2) : (a.t==='block'||a.t==='buff') ? 0 : 1;
      for(let k=0;k<tiros;k++) setTimeout(()=>projetil(centro(el), centro(alvoEl), cor, RGT[a.t]||'⚔'), k*90);
    }
    // som + reação de quem levou
    if(a.t==='atk'||a.t==='atk_multi'){ SFX.golpe(a.v||6); }
    else if(a.t==='heal') SFX.pegar(); else if(a.t==='curse'||a.t==='debuff') SFX.morte();
    else SFX.soltar();
    setTimeout(()=>{
      if(a.dano>0){ SFX.dano(); tremor(Math.min(14,4+a.dano*0.5)); flashJog(a.dano); }
      else if(a.aparado>0) etiquetaEu('🛡 '+a.aparado+' aparado');
      else if(a.t==='curse') etiquetaEu('☠ dado amaldiçoado');
      else if(a.t==='debuff') etiquetaEu('▼ '+(a.st||'')+' +'+(a.v||1));
    }, 300);
  }, i*420));
  return acoes.length*420 + 380;
}
function etiquetaEu(txt){
  const n=document.createElement('div'); n.className='dmgme av'; n.textContent=txt;
  $('voce').appendChild(n); setTimeout(()=>n.remove(),1000);
}
function snapHP(){ return cb.enemies.map(e=>e.hp); }
function juice(antes, hpAntes, acoes){
  cb.enemies.forEach((e,i)=>{
    const d=antes[i]-e.hp;
    if(d>0){ flash(e.uid, d, e.hp<=0); }
  });
  // o que os inimigos tiraram já aparece na animação deles — aqui só o resto (veneno etc.)
  const daInvestida = acoes ? acoes.reduce((a,x)=>a+(x.dano||0),0) : 0;
  const dp = (hpAntes-P.hp) - daInvestida;
  if(dp>0){ SFX.dano(); tremor(Math.min(14,4+dp*0.5)); flashJog(dp); }
}
function flash(uid,d,morreu){
  const el=document.querySelector(`.en[data-uid="${uid}"]`); if(!el) return;
  el.classList.remove('bat'); void el.offsetWidth; el.classList.add('bat');
  const n=document.createElement('div'); n.className='dmg'+(d>=18?' big':'');
  n.textContent='-'+d; el.appendChild(n);
  setTimeout(()=>n.remove(),900);
  SFX.golpe(d); tremor(Math.min(11,3+d*0.35));
  if(morreu){ SFX.morte(); el.classList.add('morrendo'); }
}
function flashJog(d){
  const f=document.createElement('div'); f.id='ferida'; document.body.appendChild(f);
  setTimeout(()=>f.remove(),420);
  const n=document.createElement('div'); n.className='dmgme'; n.textContent='-'+d;
  document.getElementById('voce').appendChild(n); setTimeout(()=>n.remove(),900);
}
let shakeT=0;
function tremor(v){ shakeT=Math.max(shakeT,v); }
function usar(s){
  if(anima) return;
  const ids=[...sel];
  const ents=cb.roll.filter(e=>sel.has(e.dieId));
  if(!ents.length || !satisfies(s.req,ents)){
    const pv=calcPrevia(s);                       // 1º toque: SELECIONA e mostra a prévia
    if(pv){ sel=new Set(pv.ids); previa=pv; SFX.pegar(); pintar(); }
    return;
  }
  const antes=snapHP(), hpA=P.hp;
  const alvosPrev = cb.prever(s, ids, alvo);
  const cardEl=[...document.querySelectorAll('#hab .h')]
    .find(x=>habilidadesAtuais()[+x.dataset.i]?.id===s.id);
  if(cardEl){ cardEl.classList.remove('usou'); void cardEl.offsetWidth; cardEl.classList.add('usou'); }
  cb.use(s, ids, alvo); sel.clear(); previa=null;
  for(const id of ids) praBandeja(id);            // os dados gastos vão pro canto
  pintar();                                       // repinta ANTES (senão apaga os efeitos)
  efeitoHabilidade(s, alvosPrev);                 // efeito próprio da habilidade
  juice(antes,hpA);                 // pinta primeiro, depois os efeitos
  if(cb.over){ setTimeout(fim,760); return; }
}
$('brer').onclick=()=>{ if(anima||cb.rerolls<=0) return;
  const ids = sel.size? [...sel] : cb.pool().map(e=>e.dieId);
  cb.reroll(ids); sel.clear(); rolarVisual(); pintar(); };
$('bfim').onclick=()=>{ if(anima) return;
  sel.clear(); previa=null; const antes=snapHP(), hpA=P.hp;
  const r=cb.endTurn();
  const acoes=cb.acoesInimigo||[];
  pintar();                                   // pinta primeiro, depois os efeitos
  anima=true;                                 // trava enquanto o inimigo age
  const espera=animarInimigos(acoes);
  juice(antes,hpA,acoes);
  if(r){ setTimeout(fim, espera+520); return; }
  setTimeout(()=>{ anima=false; rolarVisual(); pintar(); }, Math.max(340, espera)); };
addEventListener('pointerdown', ev=>{
  if(anima) return;
  const r=renderer.domElement.getBoundingClientRect();
  mouse.x=((ev.clientX-r.left)/r.width)*2-1; mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hit=raycaster.intersectObjects(malhas.filter(m=>m.visible))[0];
  if(!hit) return;
  const id=hit.object.userData.die.id;
  if(cb.used.has(id)) return;
  if(sel.has(id)){ sel.delete(id); SFX.soltar(); } else { sel.add(id); SFX.pegar(); }
  pintar();
});
/* habilidades que você REALMENTE tem agora (a 4ª só com o nó do Cofre) */
function habilidadesAtuais(){
  const lib = new Set(P&&P.unlocked ? P.unlocked : []);
  return [...(C.skills||[]).filter(s=>!s.unlock || lib.has(s.unlock)), RESPIRAR];
}
/* ===== ANTES → DEPOIS: a recompensa mostra exatamente o que muda ===== */
function faceHTML(f, marca){
  const g = f.k==='num' ? f.v : (FACE_KINDS[f.k]?.glifo||'?');
  const t = f.k==='num' ? '' : (f.v? f.v : '');
  return `<i class="fc ${f.k}${marca?' '+marca:''}">${g}${t&&f.k!=='num'?`<sub>${t}</sub>`:''}</i>`;
}
function dadoHTML(d, marcaIdx, marca, rot){
  return `<span class="dd"><u>${rot||d.tipo}</u><span class="dfs">${
    d.faces.map((f,i)=>faceHTML(f, i===marcaIdx?marca:'')).join('')}</span></span>`;
}
const resumoDado = d => ({
  soma: d.faces.reduce((a,f)=>a+(faceValorNum(f)||0),0),
  num:  d.faces.filter(f=>f.k==='num').length,
  blade:d.faces.filter(f=>f.k==='blade').length,
  shield:d.faces.filter(f=>f.k==='shield').length,
  simb: d.faces.filter(f=>f.k!=='num').length,
});
const faceValorNum = f => (f.k==='num'||f.k==='blade'||f.k==='shield'||f.k==='echo') ? f.v : 0;
function linhaDif(rot, a, b, maiorMelhor=true){
  if(a===b) return `<i>${rot} ${a}</i>`;
  const sobe = b>a, bom = sobe===maiorMelhor;
  return `<i class="${bom?'up':'dn'}">${rot} ${a} → ${b}</i>`;
}
function antesDepois(o){
  if(o.t==='dado'){
    const d = { tipo:o.tipo, faces:Array.from({length:TIPOS_N[o.tipo]},(_,i)=>({k:'num',v:i+1})) };
    return `<div class="dparte">${dadoHTML(d,-1,'','ENTRA '+o.tipo)}</div>
      <div class="difl">${linhaDif('bolsa', P.bag.length, P.bag.length+1)}
      <i>${MATERIAIS[o.mat]?.nome||o.mat}: ${MATERIAIS[o.mat]?.desc||''}</i></div>`;
  }
  if(o.t==='grav'){
    const s = simularGravacao(o, P);
    if(!s) return '<div class="difl"><i>sem dado elegível</i></div>';
    const A=resumoDado(s.antes), B=resumoDado(s.depois);
    return `<div class="dparte">${dadoHTML(s.antes, s.i, 'velho', 'ERA '+s.antes.tipo)}
        <span class="dseta">↓ VIRA</span>
        ${dadoHTML(s.depois, s.subiu? s.depois.faces.length-1 : s.i, 'novo', 'FICA '+s.depois.tipo)}</div>
      <div class="difl">${linhaDif('soma', A.soma, B.soma)}
        ${A.num!==B.num?linhaDif('números', A.num, B.num):''}
        ${A.blade!==B.blade?linhaDif('⚔', A.blade, B.blade):''}
        ${A.shield!==B.shield?linhaDif('🛡', A.shield, B.shield):''}
        ${s.subiu?`<i class="up">${s.antes.tipo} → ${s.depois.tipo}</i>`:''}</div>`;
  }
  if(o.t==='reliquia'){
    const md=o.rel.mods||{}, L=[];
    if(md.hpBonus) L.push(linhaDif('HP máx', P.maxHp, P.maxHp+md.hpBonus));
    if(md.hpMult)  L.push(linhaDif('HP máx', P.maxHp, Math.round(P.maxHp*md.hpMult)));
    if(md.rerollBonus) L.push(linhaDif('re-rolagens', P.rerolls|0, (P.rerolls|0)+md.rerollBonus));
    if(md.dmgFlat) L.push(`<i class="up">dano +${md.dmgFlat} por golpe</i>`);
    if(md.dmgMult&&md.dmgMult!==1) L.push(`<i class="${md.dmgMult>1?'up':'dn'}">dano ×${md.dmgMult}</i>`);
    if(md.blockBonus) L.push(`<i class="up">bloqueio +${md.blockBonus}</i>`);
    if(md.pierce) L.push(`<i class="up">perfura ${md.pierce}</i>`);
    if(o.rel.extraDie) L.push(`<i class="up">+${o.rel.extraDie.n||1} dado ${o.rel.extraDie.tipo}</i>`);
    if(o.rel.flag) L.push(`<i>regra nova: ${o.rel.flag}</i>`);
    if(o.rel.onKill) L.push(`<i class="up">ao matar: dispara</i>`);
    if(o.rel.start) L.push(`<i class="up">começa o combate com efeito</i>`);
    if(!L.length) L.push(`<i>passiva permanente da run</i>`);
    return `<div class="difl">${L.join('')}<i>${o.rel.r}</i></div>`;
  }
  const cura = Math.round(P.maxHp*0.18);
  return `<div class="difl">${linhaDif('HP', P.hp, Math.min(P.maxHp, P.hp+cura))}<i>de ${P.maxHp} máx</i></div>`;
}
function painelHabilidades(){
  const hab=habilidadesAtuais();
  return `<div class="recskills"><h4>SUAS HABILIDADES — O QUE FAZEM</h4>
    ${hab.map(s=>`<div class="rsk"><b>${s.nome}</b><u>${reqLabel(s.req)}</u>
      <span>${s.desc}</span></div>`).join('')}</div>`;
}
/* ---------- fim de combate ---------- */
function fim(){
  const m=$('msg'); m.classList.remove('off'); m.className='';
  if(cb.over==='lose'){ SFX.derrota();
    const ganho=META.ecosDaRun({andares:stats.andares, elites:stats.elites, chefes:stats.chefes,
      masmorra, venceu:false}, BON.ecoMult);
    cofre.ecos+=ganho; cofre.runs=(cofre.runs||0)+1;
    const prof=(masmorra-1)*10+andar;
    const rp=(cofre.recordes.masmorra-1)*10+cofre.recordes.andar;
    const novoRec = prof>rp;
    if(novoRec) cofre.recordes={andar, masmorra};
    META.salvar(cofre);
    m.innerHTML=`<div class="fimwrap">
      <div class="fimt">O ABISMO FICOU COM VOCÊ</div>
      <div class="fimprof">M${masmorra} · ANDAR ${andar}</div>
      ${novoRec?'<div class="fimrec">✦ NOVO RECORDE ✦</div>':''}
      <div class="fimlin"><span>andares limpos</span><b>${stats.andares}</b></div>
      <div class="fimlin"><span>elites derrotados</span><b>${stats.elites}</b></div>
      ${stats.chefes?`<div class="fimlin"><span>chefes</span><b>${stats.chefes}</b></div>`:''}
      <div class="fimeco"><span class="eic">◈</span> +${ganho} <i>ecos</i></div>
      <div class="mbtns">
        <button class="mb cof" data-a="cofre">🗝 GASTAR NO COFRE</button>
        <button class="mb pri" data-a="denovo">▶ DESCER DE NOVO</button>
      </div></div>`;
    bindA(m,{ cofre:telaCofre, denovo:telaClasses });
    return;
  }
  SFX.vitoria();
  stats.andares++;
  stats.elites += cb.enemies.filter(e=>e.elite).length;
  if(andar===10) stats.chefes++;
  const opts=gerarOpcoes(rng,P,3+BON.opcoes);
  m.innerHTML=`<div class="recwrap"><div class="rect">ANDAR ${andar} LIMPO</div>
    <p class="recp">Escolha o que levar para o próximo. Veja o que muda.</p>
    <div class="recs2">${opts.map((o,i)=>`<button class="rec ${o.t}" data-i="${i}">
      <div class="rectopo">
        <div class="ric">${o.t==='dado'?'🎲':o.t==='grav'?'⚒':o.t==='reliquia'?'🕯️':'✚'}</div>
        <div><b>${o.nome}</b><span>${o.desc}</span></div>
      </div>
      <div class="recdif">${antesDepois(o)}</div></button>`).join('')}</div>
    ${painelHabilidades()}</div>`;
  m.querySelectorAll('.rec').forEach(b=>b.onclick=()=>{
    SFX.pegar(); aplicar(opts[+b.dataset.i],P,rng);
    if(andar===5||andar===10) P.hp=Math.min(P.maxHp,P.hp+Math.round(P.maxHp*0.15));
    andar++; if(andar>10){ andar=1; masmorra++; }
    telaMapa(true);
  });
}
/* ---------- loop ---------- */
function resize(){ const w=innerWidth,h=innerHeight;
  renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();
  const need=Math.max(MESA.x/Math.max(camera.aspect,0.4), MESA.z*1.15)*1.12;
  const d=need/Math.tan((camera.fov*Math.PI/180)/2);
  camera.position.set(0,d*0.92,d*0.44); camera.lookAt(0,0.1,0); }
addEventListener('resize',resize); resize();
(function loop(){
  if(shakeT>0.2){ shakeT*=0.86;
    const a=shakeT*0.006;
    camera.position.x=(Math.random()*2-1)*a*9; camera.position.z+= (Math.random()*2-1)*a*3;
    document.body.style.setProperty('--sk', ((Math.random()*2-1)*shakeT*0.5).toFixed(2)+'px');
  } else if(shakeT){ shakeT=0; camera.position.x=0; resize(); document.body.style.setProperty('--sk','0px'); }
  atualizarBadges();
  renderer.render(scene,camera); requestAnimationFrame(loop); })();
telaTitulo();
window.__jogo={ get cb(){return cb;}, get P(){return P;}, usar, iniciar,
  get sel(){return sel;}, get malhas(){return malhas;},
  get anima(){return anima;}, get previa(){return previa;}, calcPrevia, pintar, SFX };
