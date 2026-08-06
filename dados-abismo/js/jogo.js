/* ========================================================================
   DADOS DO ABISMO — o jogo (§16 passo 3): combate real usando o motor de
   regras puro + a mesa de dados 3D. Uma classe -> Masmorra 1 -> recompensas.
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';
import { makeRNG } from './rng.js';
import { CLASSES, RESPIRAR } from './data/classes.js';
import { FACE_KINDS } from './data/faces.js';
import { Combat } from './engine/combat.js';
import { buildWave, burdensFor, criarInimigo } from './engine/encounter.js';
import { satisfies, reqLabel, findSubset, resolvedValues } from './engine/requirements.js';
import { gerarOpcoes, aplicar, recalcRelics, simularGravacao } from './engine/rewards.js';
import { MATERIAIS, TIPOS as TIPOS_N } from './data/dice.js';
import { RELIQUIAS } from './data/relics.js';
const RELIQ_COMUNS=RELIQUIAS.filter(r=>r.r==='comum');
import { criarMalhaDado, criarMesa, luzes, destacarResultado } from './dice3d/render.js';
import { rolarPara } from './dice3d/roll.js';
import { raioDe, pontoDeCima } from './dice3d/geometry.js';
import { ESCALADA, MASMORRAS } from './data/dungeons.js';
import * as PASS from './data/passivas.js';
import { travaTxt } from './data/travas.js';
import * as GRIM from './grimorio.js';
import * as META from './meta.js';
import { spriteDe, spriteCanvas } from './sprites.js';
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
let faixa={top:0,h:0};                 // banda livre onde a mesa 3D cabe
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
    const cw=renderer.domElement.clientWidth, ch=renderer.domElement.clientHeight;
    const x=(v.x*0.5+0.5)*cw, y=faixa.top+(-v.y*0.5+0.5)*ch;
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
  SFX.trilha('menu');
  cofre=META.carregar(); BON=META.bonus(cofre);
  const m=$('msg'); m.classList.remove('off'); m.className='';
  const rec=cofre.recordes||{andar:0,masmorra:1};
  const fundo = Math.min(100, (rec.masmorra-1)*10 + rec.andar);   // 100 andares no total
  /* Números caindo no fundo. DÍGITOS, não glifos de dado: ◈/⚄ viram
     quadradinho em Georgia no Android — o mesmo tropeço dos ícones da
     barra de habilidades. Dígito é temático e sempre existe. */
  const chuva = [[7,38,19,0,'6'],[22,26,23,3,'1'],[38,52,15,7,'4'],[54,30,21,1.5,'3'],
                 [69,44,18,5,'2'],[81,24,25,9,'5'],[92,34,16,2.5,'6'],[15,20,27,12,'1']]
    .map(([x,s,t,d,n])=>`<i style="--x:${x}%;--s:${s}px;--t:${t}s;--dl:${d}s">${n}</i>`).join('');
  // emblema: os 4 glifos das classes orbitando o dado. Diz o que é o jogo
  // (4 almas, 1 dado) antes de qualquer texto.
  const orbita = Object.values(CLASSES).map((c,i)=>
    `<i style="--a:${i*90}deg;--gc:${c.cor}" title="${c.nome}">${c.glifo}</i>`).join('');
  m.innerHTML=`<div class="titdados">${chuva}</div>
    <div class="titwrap">
    <div class="titemb">
      <div class="titorb">${orbita}</div>
      <div class="titnucleo"><b>6</b></div>
    </div>
    <div class="tit">
      <div class="tit1">DADOS</div><div class="tit2">DO ABISMO</div>
      <div class="titsub">a sorte é matéria-prima</div>
    </div>
    <div class="ecos"><span class="eic">◈</span><b>${cofre.ecos}</b><i>ecos</i></div>
    <div class="titprog">
      <u><span>FUNDO ALCANÇADO</span><b>${fundo}/100 ANDARES</b></u>
      <div class="titbar"><span style="--p:${fundo}%"></span></div>
    </div>
    <div class="mbtns">
      ${META.carregarRun()?`<button class="mb cont" data-a="continuar">↺ CONTINUAR
        <em>${(()=>{const r=META.carregarRun();
          return `${CLASSES[r.classe]?.nome||''} · Masmorra ${r.masmorra}, andar ${r.andar}`;})()}</em></button>`:''}
      <button class="mb pri" data-a="jogar">▶ ${META.carregarRun()?'NOVA DESCIDA':'DESCER'}</button>
      <button class="mb" data-a="grim">📖 GRIMÓRIO <em>como se joga</em></button>
      <button class="mb cof" data-a="cofre">🌳 PASSIVAS <em>${
        Object.keys(PASS.ARVORES).reduce((a,c)=>a+PASS.progresso(cofre,c).meu,0)} níveis</em></button>
    </div>
    <div class="recs">
      <span><u>DESCIDAS</u><b>${cofre.runs||0}</b></span>
      <span><u>RECORDE</u><b>M${rec.masmorra}·A${rec.andar}</b></span>
      <span><u>VITÓRIAS</u><b>${cofre.vitorias||0}</b></span>
    </div></div>`;
  bindA(m,{ jogar:telaPortais, cofre:telaCofre, grim:()=>telaGrimorio(null, telaTitulo),
            continuar:()=>{ if(!retomarRun()) telaPortais(); } });
}
function bindA(root,map){ root.querySelectorAll('[data-a]').forEach(b=>{
  b.onclick=()=>{ SFX.pegar(); map[b.dataset.a](); }; }); }

/* ===================================================================
   A TRILHA DAS ALMAS — o painel das Passivas que mostra as habilidades que
   NÃO se compram com Ecos: elas abrem fechando masmorra.

   Elas já viviam aqui (saem de META.masmorrasAbertas, que é gravado no
   Cofre e sobrevive à morte), mas não apareciam em lugar nenhum a não ser
   como um cadeado na tela de escolher classe — depois de escolher já era
   tarde para planejar. O Cofre é onde se olha o que é permanente, então é
   aqui que a trilha inteira das quatro almas fica à vista: o que já abriu,
   o que falta, e exatamente o que abre cada degrau.
   =================================================================== */
function painelTrilha(){
  const fechadas = META.masmorrasAbertas(cofre) - 1;
  const coroaDe = c => !!PASS.bonusDaClasse(cofre, c).campos.quarta;
  const abertoP = (s,c) => /^m\d+$/.test(s.unlock) ? fechadas >= +s.unlock.slice(1) : coroaDe(c);
  /* na ordem em que se PERCORRE: M2, M5, M8 e a coroa por último — na ficha
     da classe a de coroa vem antes, e listada assim a trilha parecia fora de
     ordem */
  const grau = s => { const m=/^m(\d+)$/.exec(s.unlock); return m ? +m[1] : 99; };
  const daTrilha = c => c.skills.filter(s=>s.unlock).sort((a,b)=>grau(a)-grau(b));
  let temTot=0, temMeu=0;
  for(const c of Object.values(CLASSES))
    for(const s of daTrilha(c)){ temTot++; if(abertoP(s,c.id)) temMeu++; }

  const blocos = Object.values(CLASSES).map(c=>{
    const lista = daTrilha(c);
    const meus = lista.filter(abertoP).length;
    const degraus = lista.map(s=>{
      const on = abertoP(s, c.id);
      const mN = /^m(\d+)$/.exec(s.unlock);
      const selo = mN ? 'M'+mN[1] : '👑';
      const como = on ? 'ABERTA'
        : mN ? `feche a Masmorra ${mN[1]}`
             : 'compre a Coroa na árvore dela';
      return `<div class="tdeg ${on?'on':''}">
        <span class="tselo">${on?'✓':selo}</span>
        <div class="tinfo"><b>${s.nome}</b><u>${reqLabel(s.req)}</u>
          <span>${s.desc}</span></div>
        <i class="tst">${on?'✔ ABERTA':'🔒 '+como}</i></div>`;}).join('');
    return `<div class="tcls" style="--cc:${c.cor}">
      <div class="tclsh"><span class="tglifo">${c.glifo}</span><b>${c.nome}</b>
        <em>${meus}/${lista.length}</em></div>
      <div class="tdegs">${degraus}</div></div>`;}).join('');

  const pct = temTot ? Math.round(100*temMeu/temTot) : 0;
  const prox = fechadas + 1;
  return `<div class="trilhawrap">
    <div class="th"><span class="thi">🗝</span>
      <div><b>A TRILHA DAS ALMAS</b>
        <i>Estas não se compram com Ecos. Abrem fechando masmorras — e são
           elas que deixam você descer mais fundo.</i></div></div>
    <div class="cofprog">
      <u><span>ABERTAS</span><b>${temMeu}/${temTot} HABILIDADES</b></u>
      <div class="cofbar"><span style="width:${pct}%"></span></div>
      <em class="${fechadas>0?'tem':''}">${fechadas>0
        ? `${fechadas} masmorra${fechadas>1?'s':''} fechada${fechadas>1?'s':''}`
        : 'nenhuma masmorra fechada ainda'}${prox<=META.MASMORRAS_TOTAL
        ? ` — a próxima é a Masmorra ${prox}` : ' — o Abismo inteiro é seu'}</em>
    </div>
    <div class="tclss">${blocos}</div></div>`;
}
/* ===================================================================
   AS QUATRO ÁRVORES. O tronco comum (Osso/Véu/Coroa) servia a
   todo mundo; aqui cada alma tem a SUA, com 20 passivas que puxam a corda
   da mecânica dela. Uma aba por classe, quatro anéis por árvore, e o preço
   subindo do anel 1 ao 4 — largura e profundidade disputam os mesmos Ecos.
   =================================================================== */
let abaArvore = 'carrasco';
function painelArvore(){
  const cid = abaArvore, AR = PASS.ARVORES[cid];
  const pg = PASS.progresso(cofre, cid);
  const abas = Object.entries(PASS.ARVORES).map(([k,a])=>{
    const p = PASS.progresso(cofre,k);
    return `<button class="aba ${k===cid?'on':''}" data-aba="${k}" style="--cc:${a.cor}">
      <span class="abag">${a.glifo}</span><b>${a.nome}</b><i>${p.meu}/${p.tot}</i></button>`;}).join('');

  const aneis = PASS.ANEIS.map(an=>{
    const nos = AR.nos.filter(n=>n.anel===an.n).map(no=>{
      const nv = PASS.nivelPassiva(cofre,cid,no.id);
      const max = nv >= no.max;
      const disp = PASS.disponivelPassiva(cofre,cid,no);
      const c = PASS.custoDoNo(no, Math.min(nv, no.custo.length-1));
      const pode = disp && cofre.ecos >= c;
      const trav = (no.req||[]).some(q=>PASS.nivelPassiva(cofre,cid,q) < 1);
      const nomeReq = (no.req||[]).map(q=>PASS.noPorId(cid,q)?.nome).filter(Boolean).join(' + ');
      return `<button class="pno ${max?'max':''} ${pode?'pode':''} ${trav?'trav':''}"
          data-pno="${no.id}" style="--cc:${AR.cor}">
        <div class="pnoh"><b>${no.nome}</b><span class="pips">${
          Array.from({length:no.max},(_,i)=>`<i class="${i<nv?'on':''}"></i>`).join('')}</span></div>
        <div class="pnotxt">${no.txt(Math.max(1, nv + (max?0:1)))}</div>
        <div class="pnofoot">${
          trav ? `🔒 exige ${nomeReq}`
          : max ? '★ MÁXIMO'
          : `<span class="cst ${pode?'ok':''}">◈ ${c}</span>`}</div></button>`;}).join('');
    return `<div class="anel">
      <div class="anelh"><span class="aneln">${an.n}</span><b>${an.nome}</b><i>${an.sub}</i></div>
      <div class="pnos">${nos}</div></div>`;}).join('');

  return `<div class="arvwrap" style="--cc:${AR.cor}">
    <div class="th"><span class="thi">${AR.glifo}</span>
      <div><b>A ÁRVORE DA SUA ALMA</b>
        <i>Cada classe tem a sua, com 20 passivas. Elas ficam entre as runs e
           são o que faz um Carrasco jogar diferente de uma OráculA.</i></div></div>
    <div class="abas">${abas}</div>
    <div class="arvhd"><b style="color:${AR.cor}">${AR.nome}</b><em>${AR.lema}</em></div>
    <div class="cofprog">
      <u><span>CONSTRUÍDO</span><b>${pg.meu}/${pg.tot} NÍVEIS</b></u>
      <div class="cofbar"><span style="width:${pg.pct}%;background:${AR.cor}"></span></div>
    </div>
    ${aneis}</div>`;
}
function telaCofre(){
  SFX.trilha('menu');
  const m=$('msg'); m.className='';
  /* A tela é a ÁRVORE DA CLASSE, e só. O tronco comum (Osso/Véu/Coroa) foi
     desmontado: ele vendia o mesmo "+HP" e "+dano" que as árvores já vendem,
     e comprar duas vezes a mesma coisa em dois lugares não é escolha, é
     imposto. O que só existia lá — a 4ª habilidade, as opções de recompensa,
     o bônus de Ecos, a forja, as faces ⚔ e as relíquias de partida — mudou
     de casa e hoje tem nome e preço de cada alma. */
  const totalMeu = Object.keys(PASS.ARVORES).reduce((a,c)=>a+PASS.progresso(cofre,c).meu, 0);
  const compraveis = PASS.nosDaClasse(abaArvore).filter(n=>{
    const nv = PASS.nivelPassiva(cofre, abaArvore, n.id);
    return nv < n.max && PASS.disponivelPassiva(cofre, abaArvore, n)
           && cofre.ecos >= PASS.custoDoNo(n, nv); }).length;
  m.innerHTML=`<div class="cofwrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button>
      <h2>PASSIVAS</h2><div class="ecos sm"><span class="eic">◈</span><b>${cofre.ecos}</b></div></div>
    <p class="cofp">Melhorias <b>permanentes</b>: ficam entre as descidas e não se perdem na morte.
      Cada alma tem a sua árvore — o que você constrói aqui é o que te deixa descer mais fundo.</p>
    <div class="cofprog">
      <em class="${compraveis?'tem':''}">${compraveis
        ? `${compraveis} passiva${compraveis>1?'s':''} ao seu alcance nesta árvore`
        : 'Ecos insuficientes — desça e volte com mais'}
        <span style="opacity:.6"> · ${totalMeu} níveis construídos ao todo</span></em>
    </div>
    ${painelArvore()}
    ${painelTrilha()}
    <button class="mb pri" data-a="voltar2">▶ DESCER AGORA</button></div>`;
  bindA(m,{ voltar:telaTitulo, voltar2:telaClasses });
  m.querySelectorAll('.aba').forEach(b=>b.onclick=()=>{
    abaArvore=b.dataset.aba; SFX.pegar(); telaCofre();
    // volta o olhar para a árvore, senão a troca de aba parece não ter feito nada
    document.querySelector('.arvwrap')?.scrollIntoView({block:'start'}); });
  m.querySelectorAll('.pno').forEach(b=>b.onclick=()=>{
    const no=PASS.noPorId(abaArvore, b.dataset.pno);
    if(no && PASS.comprarPassiva(cofre, abaArvore, no)){
      META.salvar(cofre); SFX.buy?SFX.buy():SFX.vitoria(); telaCofre();
      document.querySelector('.arvwrap')?.scrollIntoView({block:'start'});
    } else SFX.soltar(); });
}
/* AS CHAVES DA TRILHA: fechar a Masmorra N libera a habilidade marcada
   'mN'. É por isso que dá para descer mais fundo — não por ficar melhor
   de mira, mas por ter ferramenta nova na mão. */
/* o bônus de Ecos vem da árvore da alma que fez a descida */
function multEcos(){ return 1 + ((P&&P.arvore?.ecoMult)||0)/100; }
function chavesAbertas(cid){
  const fechadas = META.masmorrasAbertas(cofre) - 1;   // abriu a N+1 => fechou a N
  const ks = [];
  for(let i=1;i<=fechadas;i++) ks.push('m'+i);
  // a 4ª habilidade agora é um nó da ÁRVORE da própria classe, não do tronco
  if(PASS.bonusDaClasse(cofre, cid).campos.quarta) ks.push('coroa_'+cid);
  return ks;
}
/* ===================================================================
   OS PORTAIS — de onde você começa a descida.
   Fechar a Masmorra N abre a N+1 como ponto de partida. Quem começa mais
   fundo recebe o ENXOVAL do caminho pulado (uma recompensa por andar), e
   é isso que mantém a luta justa: sem ele, entrar na Masmorra 5 com a
   bolsa de estreia seria só morrer no primeiro andar.
   =================================================================== */
let masmorraEscolhida = 1;
function telaPortais(){
  SFX.trilha('menu');
  cofre = META.carregar(); BON = META.bonus(cofre);
  const abertas = META.masmorrasAbertas(cofre);
  if(abertas <= 1){ masmorraEscolhida = 1; return telaClasses(); }   // nada a escolher ainda
  const m=$('msg'); m.classList.remove('off'); m.className='';
  m.innerHTML=`<div class="clswrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button><h2>ONDE COMEÇAR</h2></div>
    <p class="cofp">Você abriu <b>${abertas}</b> ${abertas>1?'portais':'portal'}. Descer mais fundo
      te dá o <b>enxoval</b> do caminho pulado — mas lá embaixo eles não perdoam.</p>
    <div class="portais">${Array.from({length:META.MASMORRAS_TOTAL},(_,i)=>{
      const n=i+1, esc=ESCALADA[i], livre = n<=abertas;
      return `<button class="portal ${livre?'':'preso'}" ${livre?`data-p="${n}"`:''}>
        <div class="pnum">${n}</div>
        <div class="pinfo"><b>${esc.nome}</b>
          <span>${livre? (n===1?'o começo de tudo':`enxoval de ${(n-1)*10} andares`) : '🔒 feche a masmorra anterior'}</span>
          <i>inimigos ❤ ×${esc.hp.toFixed(1)} · ⚔ ×${esc.dano.toFixed(1)}</i>
          ${esc.fardoTxt&&esc.fardoTxt!=='—'?`<u>⚠ ${esc.fardoTxt}</u>`:''}</div></button>`;
    }).join('')}</div></div>`;
  bindA(m,{ voltar:telaTitulo });
  m.querySelectorAll('.portal[data-p]').forEach(b=>b.onclick=()=>{
    masmorraEscolhida = +b.dataset.p; SFX.pegar(); telaClasses(); });
}
function telaClasses(){
  SFX.trilha('menu');
  const m=$('msg'); m.classList.remove('off'); m.className='';
  m.innerHTML=`<div class="clswrap">
    <div class="cofhd"><button class="volta" data-a="voltar">‹</button><h2>ESCOLHA SUA ALMA</h2></div>
    <div class="cls">${Object.values(CLASSES).map(c=>{
      const b=c.bag();
      const hp=c.hp+BON.hpBonus, nd=b.length+BON.dadosExtra, rr=c.rerolls+BON.rerolls;
      // a bolsa inicial é a decisão mais concreta da classe e não aparecia:
      // 5 dados de 4 faces joga muito diferente de 4 dados até d10
      const bolsa = b.map(d=>`<span class="cdado d${d.n}">${d.tipo}</span>`).join('');
      // barras comparativas: dá pra sentir o perfil sem ler os números
      const barra=(rot,v,max,cor)=>`<div class="cbar"><u>${rot}</u>
        <div><span style="width:${Math.round(100*v/max)}%;background:${cor}"></span></div><b>${v}</b></div>`;
      /* as HABILIDADES são o motivo real de escolher uma classe e não estavam
         na tela: o jogador escolhia por HP e vibe. As de coroa ficam com
         cadeado — mostram o que a árvore da alma ainda tem pra dar. */
      const chaves = chavesAbertas(c.id);
      const habs = c.skills.map(s=>{
        const preso = s.unlock && !chaves.includes(s.unlock);
        // o cadeado diz COMO abrir: fechar a masmorra N, ou a Coroa da árvore
        const como = !preso ? '' : /^m\d+$/.test(s.unlock)
          ? ` — feche a Masmorra ${s.unlock.slice(1)}` : ' — Coroa, nas Passivas';
        return `<span class="chab${preso?' preso':''}" title="${s.desc.replace(/"/g,'&quot;')}">${preso?'🔒 ':''}${s.nome}
          <u>${reqLabel(s.req)}</u>${preso?`<i class="ccomo">${como}</i>`:''}</span>`;}).join('');
      return `<button class="cbtn" data-c="${c.id}" style="--cc:${c.cor}">
        <div class="cmarca">${c.glifo}</div>
        <div class="cretrato">
          ${HEROIS_COM_ARTE.has(c.id)?`<img src="arte/herois/${c.id}.png" alt="">`:''}
          <span class="cglifo">${c.glifo}</span>
        </div>
        <div class="cinfo"><b>${c.nome}</b>
          <span class="cmat">${c.mat}</span>
          <div class="cchave">🗝 ${c.chave}</div>
          <div class="cbolsa"><u>COMEÇA COM</u>${bolsa}</div>
          <div class="cbars">
            ${barra('VIDA',hp,80,'#e05a5a')}
            ${barra('DADOS',nd,6,'#e8d9a8')}
            ${barra('RE-ROLAGENS',rr,4,'#6fa8dc')}
          </div>
          <div class="chabs"><u>HABILIDADES</u>${habs}</div>
          <span class="cfan">${c.fantasia}</span>
          <span class="cpeg">ESCOLHER ESTA ALMA</span></div></button>`;}).join('')}</div></div>`;
  bindA(m,{ voltar:()=> META.masmorrasAbertas(cofre)>1 ? telaPortais() : telaTitulo() });
  m.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>{ SFX.vitoria(); iniciar(b.dataset.c, masmorraEscolhida); });
}
/* ===================================================================
   SAVE DA DESCIDA — grava no MAPA, entre um andar e outro.
   Gravar no meio do combate exigiria congelar a rolagem, os dados na mesa
   e o estado do RNG; um save meio-turno que volta errado é pior que save
   nenhum. Entre andares o estado é pequeno e exato.
   =================================================================== */
function gravarRun(){
  if(!P || !C) return;
  META.salvarRun({
    v: 1, classe: P.classe, masmorra, andar, stats: {...stats},
    hp: P.hp, maxHp: P.maxHp, baseMaxHp: P.baseMaxHp,
    essence: P.essence||0, rerollsBase: P.rerollsBase,
    unlocked: [...(P.unlocked||[])],
    // os dados vão inteiros: material e faces gravadas fazem parte da run
    bag: P.bag.map(d=>({ id:d.id, tipo:d.tipo, n:d.n, material:d.material,
                         faces: d.faces.map(f=>({...f})) })),
    // relíquia é sempre a mesma do catálogo: guardo o id e remonto na volta
    relics: P.relics.map(r=>r.id),
    // o que o Cofre concedeu no começo desta descida
    cofre: { polegar:P.polegar, gazua:P.gazua, revive:P.revive, pity:P.pity,
             ultimoLance:P.ultimoLance, gravExtra:P.gravExtra, presagio:P.presagio,
             dmgFlat: BON.dmgFlat, blockStart: BON.blockStart },
  });
}
export function temRunSalva(){ return !!META.carregarRun(); }
function retomarRun(){
  const s = META.carregarRun(); if(!s) return false;
  const cl = CLASSES[s.classe]; if(!cl) { META.limparRun(); return false; }
  C = cl;
  P = { classe:s.classe, hp:s.hp, maxHp:s.maxHp, baseMaxHp:s.baseMaxHp, block:0,
        bag:s.bag.map(d=>({ ...d, faces:d.faces.map(f=>({...f})) })),
        statuses:{}, essence:s.essence, rerollsBase:s.rerollsBase,
        relics:[], unlocked:[...(s.unlocked||[])],
        polegar:s.cofre?.polegar, gazua:s.cofre?.gazua, revive:s.cofre?.revive,
        pity:s.cofre?.pity, ultimoLance:s.cofre?.ultimoLance,
        gravExtra:s.cofre?.gravExtra, presagio:s.cofre?.presagio };
  for(const id of (s.relics||[])){
    if(id==='_cofre'){ P.relics.push({ id:'_cofre', nome:'Cofre', r:'comum', txt:'',
      mods:{dmgFlat:s.cofre?.dmgFlat||0}, start:{block:s.cofre?.blockStart||0} }); continue; }
    const r = RELIQUIAS.find(x=>x.id===id);
    // já aplicada quando foi pega: não pode conceder o dado extra de novo
    if(r) P.relics.push(r.extraDie ? { ...r, _aplicado:true } : r);
  }
  recalcRelics(P);
  P.hp = Math.min(P.hp, P.maxHp);
  masmorra = s.masmorra; andar = s.andar; stats = { ...s.stats };
  telaMapa(false);
  return true;
}
function iniciar(cid, deMasmorra=1){
  C=CLASSES[cid];
  /* A ÁRVORE DA CLASSE entra aqui. Ela sai
     no mesmo formato das relíquias, então o motor executa sem saber que veio
     de outro lugar — e os `campos` são os ajustes que moram no jogador. */
  const AR = PASS.bonusDaClasse(cofre, cid), cp = AR.campos;
  const somaBon = (k,extra)=> (BON[k]||0) + (extra||0);
  const bag=C.bag();
  const dadosExtra = somaBon('dadosExtra', cp.dadosExtra);
  for(let i=0;i<dadosExtra;i++) bag.push(bag[i%bag.length] ? {...bag[0], id:'X'+i, faces:bag[0].faces.map(f=>({...f}))} : null);
  const hp0 = C.hp + BON.hpBonus;
  P={ classe:cid, hp:hp0, maxHp:hp0, baseMaxHp:hp0, block:0,
      bag:bag.filter(Boolean), statuses:{}, essence:0,
      rerollsBase:C.rerolls+BON.rerolls, relics:[], unlocked:chavesAbertas(cid),
      polegar:somaBon('polegar',cp.polegar), gazua:somaBon('gazua',cp.gazua),
      revive:Math.max(BON.revive, cp.revive||0), pity:somaBon('pity',cp.pity),
      ultimoLance:BON.ultimoLance||!!cp.ultimoLance, gravExtra:somaBon('gravExtra',cp.gravExtra),
      presagio:somaBon('presagio',cp.presagio),
      travaDados:cp.travaDados||0, arvore:cp };
  // gravações iniciais da árvore (Lâmina / Curinga / Eco)
  const grav=(k,q)=>{ for(let i=0;i<q;i++){ const d=P.bag[i%P.bag.length];
    const j=d.faces.findIndex(f=>f.k==='num'); if(j>=0) d.faces[j]={k, v:d.faces[j].v}; } };
  grav('blade',somaBon('lamina',cp.lamina)); grav('wild',somaBon('curinga',cp.curinga));
  grav('echo',somaBon('eco',cp.eco));
  if(BON.dmgFlat||BON.blockStart){ P.relics.push({id:'_cofre',nome:'Cofre',r:'comum',txt:'',
    mods:{dmgFlat:BON.dmgFlat}, start:{block:BON.blockStart}}); }
  /* a árvore vira UMA passiva sintética; o resto do jogo já sabe lidar */
  P.relics.push({ id:'_arvore_'+cid, nome:PASS.ARVORES[cid].nome, r:'comum', txt:'',
    mods:AR.mods, start:AR.start, onKill:AR.onKill,
    _rolls:AR.onRoll, _flags:[...AR.flags] });
  for(let i=0;i<somaBon('reliquias',cp.reliquias);i++){ const pool=RELIQ_COMUNS.filter(r=>!P.relics.some(x=>x.id===r.id));
    if(pool.length) P.relics.push(pool[rng.int(pool.length)]); }
  recalcRelics(P);
  andar=1;
  masmorra = deMasmorra;      // o ponto de partida vem dos Portais (masmorra fechada)
  /* ENXOVAL: começar na Masmorra N com a bolsa de estreia seria suicídio —
     os inimigos de lá esperam quem limpou (N-1)x10 andares e escolheu uma
     recompensa em cada um. Então é exatamente isso que entra: uma
     recompensa por andar pulado. */
  P._enxoval = [];
  const pular = (masmorra-1)*10;
  for(let i=0;i<pular;i++){
    const opts = gerarOpcoes(rng, P, 3);
    // mesma régua da IA do simulador: prefere poder, cura só se estiver ferido
    const val = o => o.t==='reliquia' ? (o.r==='amaldicoada'?2 : o.r==='rara'?9 : 6)
              : o.t==='dado' ? 5 : o.t==='grav' ? 5.5 : o.t==='vigor' ? 6
              : (P.hp < P.maxHp*0.55 ? 8 : 1);
    const esc = opts.reduce((a,b)=> val(b)>val(a)?b:a);
    aplicar(esc, P, rng);
    P._enxoval.push(esc.nome);
  }
  P.hp = P.maxHp;
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
  // o Grimório abre no meio do combate também: aí a batalha continua tocando
  if(!cb || cb.over) SFX.trilha('menu');
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
/* heróis que já têm arte em arte/herois/. Tentar carregar e cair no onerror
   custava um 404 por classe no console — melhor declarar o que existe.
   Ao adicionar a arte, acrescente o id aqui. */
const HEROIS_COM_ARTE = new Set(['carrasco','lamina','arcanista','oracula']);
const TIPO_ANDAR = a => a===10?'chefe' : a===5?'subchefe' : (a===3||a===4||a>=6)?'elite':'comum';
const ICO_ANDAR = { comum:'⚔', elite:'☠', subchefe:'👹', chefe:'💀' };
function previaOnda(m,a){
  const M = (a===10) ? [MASM(m).chefe] : (a===5) ? [MASM(m).subchefe] : null;
  if(M) return M.map(x=>x.nome);
  return null;
}
const MASM = m => (MASMORRAS[m]||MASMORRAS[1]);
function telaMapa(entrando){
  gravarRun();               // ponto de gravação: entre um andar e outro
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
  /* Antes de entrar, o jogador decide com o que tem. Isso não estava na tela:
     ele via a masmorra e não a própria situação. */
  const relq = (P.relics||[]).filter(r=>r.id!=='_cofre').length;
  const pct = Math.round(100*P.hp/P.maxHp);
  msg.innerHTML=`<div class="mapwrap">
    <div class="maphd"><div class="mapm">MASMORRA ${masmorra} <i>de 10</i></div>
      <h2>${esc.nome}</h2>
      <div class="mesc">inimigos deste andar: <b>❤ ×${(esc.hp*(1+(andar-1)*0.070)).toFixed(1)}</b>
        <b>⚔ ×${(esc.dano*(1+(andar-1)*0.055)).toFixed(1)}</b></div>
      ${esc.fardoTxt&&esc.fardoTxt!=='—'?`<div class="mfardo">⚠ ${esc.fardoTxt}</div>`:''}</div>
    <div class="mapvoce">
      <div class="mvhp"><u>VIDA</u>
        <div class="mvbar"><span style="width:${pct}%" class="${pct<35?'baixo':''}"></span></div>
        <b>${P.hp}<i>/${P.maxHp}</i></b></div>
      <div class="mvpast">
        <span><b>${P.bag.length}</b>dados</span>
        <span><b>${(P.rerollsBase||0)+(P.relicMods?.rerollBonus||0)}</b>re-rolagens</span>
        ${relq?`<span><b>${relq}</b>relíquia${relq>1?'s':''}</span>`:''}
      </div>
    </div>
    <!-- o marcador vive DENTRO da trilha: estava num .mpe abaixo dela e o JS
         posicionava com coordenadas da trilha, então ele parava no canto -->
    <div class="mtrilha">${nos}<span class="mmarc" id="marc">◈</span></div>
    <button class="mb pri" data-a="entrar">▶ ENTRAR NO ANDAR ${andar}
      <em>${andar===10?'CHEFE':andar===5?'SUBCHEFE':TIPO_ANDAR(andar)==='elite'?'com elite':'inimigos comuns'}</em></button>
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
  const inim=buildWave(masmorra,andar,rng,P.relicFlags);
  cb=new Combat({rng,player:P,enemies:inim,burdens:burdensFor(masmorra),log:true});
  cb.skillsDoJogador = habilidadesAtuais();   // 'selar' precisa saber o que trancar
  cb.onInvocar = id => criarInimigo(masmorra, andar, id, rng);   // subchefe chama reforço
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
/* `soIds` = re-rolagem: só estes dados voam de novo. Sem ele é rolagem de
   turno novo e a mesa inteira é refeita.
   Antes rolarVisual() sempre limpava a bandeja e animava TODA a bolsa: os
   dados já gastos voltavam da bandeja e rolavam junto, como se pudessem ser
   usados outra vez. */
function rolarVisual(soIds){
  const todos=cb.roll;
  const ents = soIds ? todos.filter(e=>soIds.includes(e.dieId)) : todos;
  if(!ents.length){ pintar(); return; }
  const z=zonas(ents.length); const obst=[]; trilhas=[];
  // numa re-rolagem, os dados que ficaram na mesa são obstáculo, não projétil
  if(soIds) for(const e of todos){
    if(soIds.includes(e.dieId)) continue;
    const m=malhas.find(x=>x.userData.die.id===e.dieId);
    if(m && !m.userData.naBandeja) obst.push({ p:[m.position.x,m.position.y,m.position.z], r:raioDe(e.tipo) });
  }
  for(let i=0;i<ents.length;i++){
    const e=ents[i];
    /* NEM TODO DADO QUE ROLA SAIU DA BOLSA. O Enferrujado do Fardo da
       Masmorra 3 nasce dentro do combate e nunca teve malha 3D: a lista de
       entradas ficava maior que a de malhas, o índice de reserva caía fora do
       array e a mesa inteira quebrava com "undefined.userData" — o combate
       abria vazio, sem dados e sem inimigos, de qualquer classe. Agora quem
       aparecer no meio da luta ganha a sua malha na hora. */
    let mesh = malhas.find(m=>m.userData.die.id===e.dieId);
    if(!mesh && e.die){
      mesh = criarMalhaDado(e.die, raioDe(e.tipo));
      mesh.visible=false; scene.add(mesh); malhas.push(mesh);
    }
    if(!mesh) continue;                       // sem dado por trás, não há o que rolar
    const raio=raioDe(e.tipo);
    const r=rolarPara(e.tipo, e.faceIdx||0, rng.int(1e9), MESA, 160, z[i], obst.slice(), raio);
    trilhas.push({ tr:r?r.trilha:[{p:[z[i][0],raio,z[i][1]],q:[0,0,0,1]}], mesh, atraso:i*0.08, ent:e });
    if(r&&r.fim) obst.push({p:r.fim,r:raio});
  }
  if(!soIds) limparBandeja();      // turno novo: todo mundo sai da bandeja
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
      // marca o RESULTADO no próprio dado (d4: número do vértice de cima em ouro).
      // usa a entrada guardada na trilha: numa re-rolagem parcial o índice de
      // `trilhas` não bate mais com o de cb.roll
      for(const x of trilhas){ if(x.ent && x.mesh) destacarResultado(x.mesh, x.ent.faceIdx); }
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
  /* A FILEIRA NÃO É UM CEMITÉRIO. Os mortos continuam no array de propósito
     — o chefe precisa deles para REERGUER —, mas a tela desenhava todos.
     Numa luta longa contra o Coveiro, que invoca reforço, a fileira chegava
     a 20 cartas de cadáver e comia a mesa inteira (medido: máximo de 6 vivos
     ao mesmo tempo, contra 20 cards). O corpo fica à vista o tempo da
     animação de morte e depois sai. */
  const AGORA = performance.now();
  for(const e of es) if(e.hp<=0 && !e._morteEm) e._morteEm = AGORA;
  const naFila = es.map((e,i)=>({e,i}))
    .filter(({e}) => e.hp>0 || (AGORA - (e._morteEm||0)) < 1400);
  // enquanto houver corpo esfriando, repinta pra ele sair sozinho
  if(naFila.some(({e})=>e.hp<=0)) setTimeout(()=>{ if(!anima) pintar(); }, 500);
  $('ini').innerHTML=naFila.map(({e,i})=>{
    const it=e.intent; const txt = !it?'—' : it.t==='atk'?`⚔ ${it.v}` : it.t==='atk_multi'?`⚔ ${it.v}×${it.n}`
      : it.t==='block'?`🛡 ${it.v}` : it.t==='heal'?`✚ ${it.v}` : it.t==='buff'?'▲ fúria'
      : it.t==='curse'?'☠ maldição' : it.t==='debuff'?`▼ ${it.st}`
      : it.t==='congelar'?'❄ congela 1 dado' : it.t==='roubar'?'✋ rouba 1 dado'
      : it.t==='fraturar'?'✖ fratura 1 dado' : it.t==='inverter'?'⇅ inverte 1 dado'
      : it.t==='contar'?`🕳 conta ${(e._conta||0)+1}/${it.ate}${(e._conta||0)+1>=it.ate?` — A CONTA ⚔ ${Math.round(it.v*(e.mult||1))}`:''}`
      /* FUNDO DO ABISMO (M5+): mexem no puzzle, então a carta precisa dizer
         exatamente o que vai ser tirado de você */
      : it.t==='selar'?'🔒 tranca 1 habilidade'
      : it.t==='taxa'?`💰 ${it.v} de HP por dado gasto`
      : it.t==='drenar'?'🩸 rouba o seu bloqueio'
      : it.t==='enterrar'?'⛏ enterra 1 dado (2 turnos)'
      : it.t==='exigir'?'❗ fira-o ou TODOS enfurecem'
      : it.t==='crescer'?`🌱 +${Math.round((it.v||6)*(e.mult||1))} de HP máximo`
      :'—';
    /* nó Presságio: você vê a intenção dos próximos turnos, não só a deste */
    const adiante = [];
    if(BON.presagio>0 && e.padrao && e.hp>0){
      for(let k=1;k<=BON.presagio;k++){
        const nx = e.padrao[(((e._ip|0)+k) % e.padrao.length)];
        if(nx) adiante.push(rotuloIntent(nx, e));
      }
    }
    /* ===== FECHADURA (§6): a regra do inimigo, e se a sua mão a abre AGORA ===== */
    const tr=cb.travaDe(e), td=travaTxt(tr);
    const aberta = !tr || e._arrombada || e.travaOff>0 || (alocSel && cb.abre(e, alocSel));
    /* a regra deste inimigo GIRA: sem avisar, o jogador acha que a carta
       mentiu quando a fechadura muda sozinha no turno seguinte */
    const gira = !!(e.travaCiclo && e.travaCiclo.length>1);
    const proxT = gira ? travaTxt(e.travaCiclo[(cb.turn + (e._giro||0)) % e.travaCiclo.length]) : null;
    // sem o prefixo: "muda para: só sofre dano com dado 4+" fica redundante
    const prox = proxT ? { curto: proxT.curto.replace(/^só sofre dano\s*/i,'') } : null;
    const travaHTML = td ? `<div class="trava ${e._arrombada||e.travaOff>0?'off':(alocSel? (aberta?'abre':'fecha') : '')}"
        data-tr="${tr?tr.t:''}" title="${td.txt}${prox?` — no próximo turno vira: ${prox.curto}`:''} — toque para entender"><span class="tico">${td.ico}</span><span class="ttx">${
        e._arrombada?'ARROMBADA' : e.travaOff>0?`DISSOLVIDA (${e.travaOff})` : td.curto}${
        gira&&!e._arrombada&&!(e.travaOff>0) ? `<i class="tgira">⟳ muda no próximo turno${prox?': '+prox.curto:''}</i>` : ''}</span>${
        alocSel&&tr&&!e._arrombada&&!(e.travaOff>0) ? `<span class="tst">${aberta?'✓ ABRE':'✕ TRAVA'}</span>`
          : '<span class="tq">?</span>'}</div>` : '';
    const st=Object.entries(e.statuses||{}).filter(([,v])=>v>0)
      .map(([k,v])=>`<b class="stc" data-est="${k}" data-estn="${v}">${ICO[k]||''}${v}</b>`).join(' ');
    const li=pi.linhas.find(l=>l.uid===e.uid);
    const pr=mapaPrev[e.uid];
    // sobre o inimigo, a mesma conta: golpe cheio − defesa dele = o que entra
    const prevHTML = pr ? `<div class="prev ${pr.morre?'mata':''}">
        ${pr.defesa>0
          ? `<span class="pd pconta"><i class="pbr">${pr.bruto}</i><i class="pdf">−${pr.defesa}🛡</i>${pr.dano}</span>`
          : (pr.dano?`<span class="pd">-${pr.dano}</span>`:'')}
        ${pr.estados.map(x=>`<span class="pe">${ICO[x.st]||'•'}${x.n}</span>`).join('')}
        ${pr.morre?'<span class="pk">☠</span>':''}</div>` : '';
    const barraPrev = pr&&pr.dano ? `<i class="perda" style="width:${Math.min(100,100*pr.dano/e.maxHp)}%;
        right:${Math.max(0,100-100*e.hp/e.maxHp)}%"></i>` : '';
    return `<div class="en ${e.hp<=0?'morto':''} ${i===alvo?'alvo':''} ${pr?'napre':''}" data-i="${i}" data-uid="${e.uid}">
      ${prevHTML}
      <div class="spr"><img src="${spriteDe(e.id)}" alt=""
           onerror="__semArte(this,'${e.id}')"></div>
      <div class="nm">${e.nome}</div>${e.elite?'<div class="el">ELITE</div>':''}
      <div class="hpb"><i style="width:${Math.max(0,100*e.hp/e.maxHp)}%"></i>${barraPrev}</div>
      <div class="hp">${e.hp}/${e.maxHp}
        ${e.block?`<b class="bloq" data-est="bloqueio" data-estn="${e.block}">🛡 ${e.block}</b>`:''}
        ${e.armadura?`<b class="armad" data-est="armadura" data-estn="${e.armadura}">⛊ ${e.armadura}</b>`:''}</div>
      ${travaHTML}
      ${adiante.length?`<div class="pres">↷ depois: ${adiante.join(' · ')}</div>`:''}
      <div class="it clic ${li&&li.passa>0?'doi':''}" ${it?`data-int="${it.t}"`:''}>${e.hp>0?txt:'—'}${li&&li.bruto>0?`<span class="passa">→ ${li.passa} no HP</span>`:''}</div>
      ${st?`<div class="st">${st}</div>`:''}</div>`;}).join('');
  $('ini').querySelectorAll('.en').forEach(d=>d.onclick=()=>{ alvo=+d.dataset.i;
    if(previa) previa=calcPrevia(previa.skill); SFX.pegar(); pintar(); });
  // onda cheia aperta as cartas para sobrar mesa (ver #ini.cheia no CSS)
  $('ini').classList.toggle('cheia', naFila.length >= 4);   // conta o que está À VISTA
  const stp=Object.entries(P.statuses||{}).filter(([,v])=>v>0)
    .map(([k,v])=>`<b class="stc" data-est="${k}" data-estn="${v}">${ICO[k]||''} ${k} ${v}</b>`).join(' ');
  $('voce').innerHTML=`<span class="pill perigo ${pi.letal?'letal':''}">☠ ${pi.total}</span>
    <span class="pill">❤ <b>${P.hp}</b>/${P.maxHp}</span>
    <span class="pill">🛡 ${P.block}</span><span class="pill">⟳ ${cb.rerolls}</span>
    ${P.essence?`<span class="pill">✦ ${P.essence}</span>`:''}${stp?`<span class="pill">${stp}</span>`:''}`;
  const pool=cb.pool(), selEnts=cb.roll.filter(e=>sel.has(e.dieId));
  const skills=habilidadesAtuais();
  /* MÃO CHEIA: com a trilha aberta são 8 cartas, e em duas colunas isso dava
     quatro filas — metade delas caía fora da tela no celular. A partir de 6
     as cartas apertam para caber três por fila. Habilidade que você não vê é
     habilidade que não existe. */
  $('hab').classList.toggle('densa', skills.length >= 6);
  $('hab').innerHTML=skills.map((s,i)=>{
    const ok=selEnts.length&&satisfies(s.req,selEnts);
    const poss=findSubset(s.req,pool);
    // prévia SEMPRE que houver encaixe: a da seleção, ou a do melhor possível.
    // Sem isso você tinha que adivinhar quais dados a habilidade quer (§12).
    const idsPre = ok ? [...sel] : (poss ? poss.map(k=>pool[k].dieId) : null);
    const p2 = previa && previa.skill.id===s.id ? previa.pv
             : (idsPre ? cb.prever(s, idsPre, alvo) : null);
    const entsPre = idsPre ? cb.roll.filter(e=>idsPre.includes(e.dieId)) : null;
    const cPre = conta(entsPre, s.req);
    const mortes = p2 ? p2.alvos.filter(a=>a.morre).length : 0;
    const dano = p2 ? p2.alvos.reduce((a,x)=>a+x.dano,0) : 0;
    /* A CONTA DO GOLPE: mostrar só o que sobra no HP era enganoso — 11 de
       dano contra 11 de defesa aparecia como nada, e 15 contra 11 aparecia
       como um "4" solto que não explicava de onde veio. Agora: 15 −11🛡 = 4 */
    const feridos = p2 ? p2.alvos.filter(a=>(a.bruto||0)>0) : [];
    const bruto  = feridos.reduce((a,x)=>a+(x.bruto||0),0);
    const defesa = feridos.reduce((a,x)=>a+(x.defesa||0),0);
    const travados = feridos.filter(a=>a.travado).length;
    /* Com UM alvo a conta fecha e é honesta. Com vários, somar tudo mentiria:
       um alvo pode ter sido barrado pela FECHADURA e não pela defesa, e o
       "24 −11🛡 = 1" faria parecer que o escudo comeu 23. */
    const contaDano = !p2 ? '' : (feridos.length===1 && defesa>0)
      ? `<b class="hd conta2"><i class="hbr">${bruto}</i><i class="hdf">−${defesa}🛡</i><i class="hig">=</i>${dano}</b>`
      : `${dano?`<b class="hd">-${dano}</b>`:''}${
          defesa>0?`<b class="hb">🛡${defesa}</b>`:''}${
          travados?`<b class="ht">✖${travados>1?travados:''}</b>`:''}`;
    const selo = p2 ? `<div class="hsel">
        ${contaDano}
        ${p2.bloqueio?`<b class="hb">🛡${p2.bloqueio}</b>`:''}
        ${p2.curaHP?`<b class="hc">✚${p2.curaHP}</b>`:''}
        ${p2.custoHP?`<b class="hx">❤-${p2.custoHP}</b>`:''}
        ${mortes?`<b class="hk">☠${mortes>1?mortes:''}</b>`:''}</div>` : '';
    const estado = ok ? 'PRONTA' : poss ? '' : 'sem encaixe';
    const ativa = previa && previa.skill.id===s.id;
    return `<button class="h ${ok?'ok':(poss?'pode':'off')} ${ativa?'pre':''}" data-i="${i}"
        style="--hc:${C.cor}" title="${s.desc.replace(/"/g,'&quot;')}">
      <span class="hbrilho"></span>
      <span class="htopo">${iconeDe(s.id)}<span class="hn">${s.nome}</span>${
        (()=>{ const f=formulaDano(s); return f && f.mult>1
          ? `<span class="hmult${f.todos?' todos':''}" title="dano = ${SIMB_BASE[f.base]} × ${f.mult}${f.fixo?' + '+f.fixo:''}${f.todos?' em TODOS':''}">×${f.mult}</span>` : ''; })()}</span>
      <span class="hreq">${reqChips(s.req)}</span>
      ${selo}
      ${cPre ? contaHTML(cPre) : ''}
      ${estado?`<span class="hest">${estado}</span>`:''}
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
  const cSel = conta(selEnts, null);
  $('sel').innerHTML = (cSel ? contaHTML(cSel,'grande')
      : `<span class="selt">toque nos dados para escolher</span>`)
    + (podePol?`<button class="fer" id="pmenos">−1</button><button class="fer" id="pmais">+1</button>
        <span class="fern">polegar ${cb._polegar}</span>`:'')
    + (podeGaz?`<button class="fer gaz" id="bgaz">🗝 GAZUA ${cb._gazua}</button>`:'')
    + (passivaBtn(selEnts)||'')
    + ((cb.p.ultimoLance && !cb._ultimoUsado)
        ? `<button class="fer ult" id="bult">🎲 ÚLTIMO LANCE</button>` : '');
  if(podePol){ const id=selEnts[0].dieId;
    $('pmenos').onclick=e=>{ e.stopPropagation(); if(cb.polegar(id,-1)){ SFX.pegar(); pintar(); } };
    $('pmais').onclick =e=>{ e.stopPropagation(); if(cb.polegar(id, 1)){ SFX.pegar(); pintar(); } }; }
  if(podeGaz) $('bgaz').onclick=e=>{ e.stopPropagation();
    if(cb.gazua(alvo)){ SFX.vitoria(); pintar(); } };
  const bu=$('bult');
  if(bu) bu.onclick=e=>{ e.stopPropagation(); if(cb.ultimoLance()){ SFX.vitoria(); rolarVisual(); pintar(); } };
  const bp=$('bpass');
  if(bp) bp.onclick=e=>{ e.stopPropagation(); const id=selEnts[0].dieId;
    const f={carrasco:()=>cb.sobrecarga(id), lamina:()=>cb.trapaca(id),
             arcanista:()=>cb.guardar(id),  oracula:()=>cb.travar(id)}[C.id];
    if(f&&f()){ SFX.pegar(); if(C.id==='arcanista') sel.delete(id); pintar(); } else SFX.soltar(); };
  const vivos=cb.aliveEnemies().length;
  $('topo').innerHTML=`Masmorra ${masmorra} · Andar ${andar}/10 <span style="opacity:.6">— ${ESCALADA[masmorra-1].nome}</span>`
    // a dica "arraste" existia porque a fileira rolava de lado e escondia os
    // inimigos a partir do 4º; agora todos cabem, então só conto quantos são
    + (vivos>3?` <span class="tinim">${vivos} inimigos</span>`:'');
  $('log').innerHTML=cb.logLines.slice(-3).join('<br>');
  $('brer').disabled = cb.rerolls<=0 || anima;
  /* o botão DIZ o que vai rolar. Antes ele só dizia "Re-rolar" e o jogador
     não tinha como saber se ia perder a mão inteira ou só o que marcou. */
  { const livres = cb.pool().length;
    const escolhe = BON.rerollEscolhido || P.arvore?.rerollEscolhido;
    const escolhidos = escolhe ? [...sel].filter(id=>cb.pool().some(e=>e.dieId===id)).length : 0;
    $('brer').innerHTML = escolhidos
      ? `⟳ Re-rolar <b>${escolhidos}</b>`
      : `⟳ Re-rolar${livres?` <i class="rtd">${livres}</i>`:''}`; }
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
/* rótulo curto de uma intenção (usado pelo Presságio) */
function rotuloIntent(it, e){
  return !it?'—' : it.t==='atk'?`⚔${it.v}` : it.t==='atk_multi'?`⚔${it.v}×${it.n}`
    : it.t==='block'?`🛡${it.v}` : it.t==='heal'?`✚${it.v}` : it.t==='buff'?'▲'
    : it.t==='curse'?'☠' : it.t==='debuff'?`▼${it.st||''}` : it.t==='congelar'?'❄'
    : it.t==='roubar'?'✋' : it.t==='fraturar'?'✖' : it.t==='inverter'?'⇅'
    : it.t==='contar'?'🕳' : '—';
}
/* a PASSIVA da classe é o verbo de fechadura grátis de cada uma (§7) */
function passivaBtn(selEnts){
  if(selEnts.length!==1 || !cb) return '';
  const e=selEnts[0], num = e.face.k!=='wild' && e.face.v!=null;
  /* quantos usos ainda sobram nesta ferramenta neste turno */
  const sobras = qual => { const r = cb.restam(qual); return r>1 ? ` <i class="fq">×${r}</i>` : ''; };
  const custoSob = cb.flags?.has('sobrecarga_barata') ? 1 : 2;
  const P_={ carrasco:{t:`⚒ +1 (−${custoSob} ❤)`, ok:num && P.hp>custoSob},
             /* a árvore pode dar mais de um uso por turno; o botão mostra
                quantos ainda sobram em vez de sumir depois do primeiro */
             lamina:  {t:`🗡 virar (${e.n+1-(e.face.v||0)})`+sobras('trapaca'),
                       ok:num && !cb.trapacaUsada},
             arcanista:{t:`✦ guardar no Círculo`+sobras('guardar'), ok:cb.podeGuardar()},
             oracula: {t:`◈ travar p/ o próximo`+sobras('travar'), ok:cb.podeTravar()} }[C.id];
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
const RGT={ atk:'⚔', atk_multi:'⚔', curse:'☠', debuff:'▼', heal:'✚', block:'🛡', buff:'▲', summon:'✦',
  selar:'🔒', taxa:'💰', drenar:'🩸', enterrar:'⛏', exigir:'❗', crescer:'🌱' };
function centro(el){ const r=el.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2]; }
function projetil(de, para, cor, glifo, giro=1){
  const p=document.createElement('div'); p.className='pj'+(cor?' '+cor:''); p.textContent=glifo||'';
  p.style.transform=`translate(${de[0]}px,${de[1]}px) scale(.5) rotate(0deg)`;
  PROJ.appendChild(p);
  requestAnimationFrame(()=>{
    p.style.transform=`translate(${para[0]}px,${para[1]}px) scale(1.35) rotate(${giro*300}deg)`; });
  setTimeout(()=>{ p.style.opacity=0; }, 330);
  setTimeout(()=>p.remove(), 520);
}
/* O turno do inimigo tem TEMPO DE LEITURA. Cada ação é uma frase de quatro
   tempos: ele arma → golpeia → o golpe viaja → o golpe chega. Antes tudo
   acontecia em 420ms e você não via nada acontecer. */
function projetilRastro(de, para, cor, glifo, giro){
  for(let k=0;k<3;k++)
    setTimeout(()=>projetil(de, para, cor+(k?' fant':''), k?'':glifo, giro), k*55);
}
function impacto(x, y, cor='#ff6a55'){
  const anel=document.createElement('div'); anel.className='impacto';
  anel.style.cssText=`left:${x}px;top:${y}px;border-color:${cor}`;
  PROJ.appendChild(anel); setTimeout(()=>anel.remove(),420);
  for(let k=0;k<9;k++){
    const a=(k/9)*Math.PI*2 + Math.random(), d=26+Math.random()*34;
    const e=document.createElement('i'); e.className='estilhaco';
    e.style.cssText=`left:${x}px;top:${y}px;background:${cor};`+
      `--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;`+
      `animation-delay:${(Math.random()*60)|0}ms`;
    PROJ.appendChild(e); setTimeout(()=>e.remove(),560);
  }
}
const COR_ACAO = { heal:'#7ef2a8', curse:'#c07cff', debuff:'#c07cff',
                   congelar:'#8fd8ff', roubar:'#ffd24a', fraturar:'#ff8a7a',
                   inverter:'#8fd8ff', contar:'#ff5a4a',
                   selar:'#c9a6ff', taxa:'#ffd24a', drenar:'#ff6a8a',
                   enterrar:'#a98a5e', exigir:'#ff9d2b', crescer:'#7ef2a8' };
function animarInimigos(acoes){
  if(!acoes || !acoes.length) return 0;
  /* MAIS DEVAGAR. O turno inimigo passava rápido demais para acompanhar: com
     três ou quatro atacantes os golpes se atropelavam e não dava para ver
     qual card disparou nem quanto entrou. Cada golpe agora tem os seus quatro
     tempos separados — arma, bate, viaja, chega — com folga entre eles.
     Com a mesa cheia o passo encurta um pouco, mas nunca volta ao atropelo. */
  const PASSO = acoes.length>4 ? 900 : acoes.length>2 ? 1080 : 1240;
  const ARMA=0, BATE=420, VIAJA=540, CHEGA=1060;   // os quatro tempos
  acoes.forEach((a,i)=>{
    const t0=i*PASSO;
    const achaEl=()=>document.querySelector(`.en[data-uid="${a.uid}"]`);
    const cor = COR_ACAO[a.t] || '#ff6a55';
    /* 1 · ARMA — o card recua e acende: dá pra ver de quem vem o golpe */
    setTimeout(()=>{ const el=achaEl(); if(!el) return;
      el.style.setProperty('--pc', cor);
      el.classList.remove('preparando'); void el.offsetWidth; el.classList.add('preparando');
      SFX.soltar();
    }, t0+ARMA);
    /* 2 · BATE — investida + o efeito próprio da intenção */
    setTimeout(()=>{ const el=achaEl(); if(!el) return;
      el.classList.remove('preparando');
      el.classList.remove('atacando'); void el.offsetWidth; el.classList.add('atacando');
      tocarEfeitoInimigo(a.t, el, a.n);
      if(a.t==='atk'||a.t==='atk_multi') SFX.golpe(a.v||6);
      else if(a.t==='heal') SFX.pegar();
      else if(a.t==='curse'||a.t==='debuff'||a.t==='fraturar') SFX.morte();
      else SFX.bloqueio();
    }, t0+BATE);
    /* 3 · VIAJA — o golpe atravessa a tela com rastro */
    setTimeout(()=>{ const el=achaEl(); if(!el) return;
      const alvoEl = a.t==='heal' ? document.querySelector(`.en[data-uid="${a.curado}"]`) : $('voce');
      if(!alvoEl) return;
      const classe = a.t==='heal'?'verde' : (a.t==='curse'||a.t==='debuff'||a.t==='congelar'||a.t==='inverter')?'roxo':'';
      const tiros = a.t==='atk_multi' ? Math.min(4, a.n||2) : (a.t==='block'||a.t==='buff') ? 0 : 1;
      const de=centro(el), para=centro(alvoEl);
      for(let k=0;k<tiros;k++) setTimeout(()=>{
        projetilRastro(de, para, classe, RGT[a.t]||'⚔', k%2?-1:1);
        setTimeout(()=>impacto(para[0], para[1], cor), 300);
      }, k*160);
    }, t0+VIAJA);
    /* 4 · CHEGA — o estrago aparece em você */
    setTimeout(()=>{
      // aparado tinha só uma etiqueta silenciosa: não dava pra saber, no meio
      // da animação, se o golpe entrou ou morreu no seu bloqueio
      if(a.dano>0){ SFX.dano(); tremor(Math.min(16,5+a.dano*0.6)); flashJog(a.dano);
        if(a.aparado>0) etiquetaEu('🛡 '+a.aparado+' aparado'); }
      else if(a.aparado>0) flashJogEscudo(a.aparado);
      else if(a.t==='curse') etiquetaEu('☠ dado amaldiçoado');
      else if(a.t==='congelar') etiquetaEu('❄ dado congelado');
      else if(a.t==='roubar') etiquetaEu('✋ dado roubado');
      else if(a.t==='fraturar') etiquetaEu('✖ dado fraturado');
      else if(a.t==='inverter') etiquetaEu('⇅ dado invertido');
      else if(a.t==='debuff') etiquetaEu('▼ '+(a.st||'')+' +'+(a.v||1));
      else if(a.t==='contar') etiquetaEu('🕳 conta '+(a.conta||1));
    }, t0+CHEGA);
  });
  return (acoes.length-1)*PASSO + CHEGA + 420;
}
function etiquetaEu(txt){
  const n=document.createElement('div'); n.className='dmgme av'; n.textContent=txt;
  $('voce').appendChild(n); setTimeout(()=>n.remove(),1500);
}
/* O escudo era INVISÍVEL: a tela media só o HP, então um golpe inteiramente
   aparado não fazia som nem número — dava para bater três turnos no bloqueio
   sem perceber. Agora o instantâneo guarda o bloqueio junto. */
function snapHP(){ return cb.enemies.map(e=>({ hp:e.hp, bl:e.block||0 })); }
function juice(antes, hpAntes, acoes){
  cb.enemies.forEach((e,i)=>{
    const a = antes[i]; if(!a) return;
    const d = a.hp - e.hp;                       // o que entrou no couro
    const ap = Math.max(0, a.bl - (e.block||0)); // o que o escudo comeu
    if(d>0)      flash(e.uid, d, e.hp<=0, ap);   // passou (com ou sem raspão no escudo)
    else if(ap>0) flashEscudo(e.uid, ap);        // morreu todo no escudo
  });
  // o que os inimigos tiraram já aparece na animação deles — aqui só o resto (veneno etc.)
  const daInvestida = acoes ? acoes.reduce((a,x)=>a+(x.dano||0),0) : 0;
  const dp = (hpAntes-P.hp) - daInvestida;
  if(dp>0){ SFX.dano(); tremor(Math.min(14,4+dp*0.5)); flashJog(dp); }
}
function flash(uid,d,morreu,aparado=0){
  const el=document.querySelector(`.en[data-uid="${uid}"]`); if(!el) return;
  el.classList.remove('bat'); void el.offsetWidth; el.classList.add('bat');
  // parte no escudo, parte na carne: os dois números, cada um na sua cor
  if(aparado>0){
    const s=document.createElement('div'); s.className='dmg esc raspao';
    s.textContent='🛡'+aparado; el.appendChild(s); setTimeout(()=>s.remove(),900);
    SFX.aparado(aparado);
  }
  const n=document.createElement('div'); n.className='dmg'+(d>=18?' big':'');
  n.textContent='-'+d; n.style.setProperty('--dx', proxDesvio()); el.appendChild(n);
  setTimeout(()=>n.remove(),1450);
  SFX.golpe(d); tremor(Math.min(11,3+d*0.35));
  if(morreu){ SFX.morte(); el.classList.add('morrendo'); }
}
/* golpe que morreu inteiro no escudo: som metálico, faísca azul, zero tremor.
   O número usa 🛡, o mesmo ícone que o BLOQUEIO tem no card e na sua barra.
   ⛊ não serve aqui: no card ele já quer dizer ARMADURA, que é outra coisa —
   a armadura corta um tanto de CADA golpe e nunca acaba, o bloqueio é um
   estoque que se gasta. */
function flashEscudo(uid, v){
  const el=document.querySelector(`.en[data-uid="${uid}"]`); if(!el) return;
  el.classList.remove('apara'); void el.offsetWidth; el.classList.add('apara');
  const n=document.createElement('div'); n.className='dmg esc';
  n.textContent='🛡'+v; el.appendChild(n);
  const c=document.createElement('div'); c.className='clang'; el.appendChild(c);
  setTimeout(()=>{ n.remove(); c.remove(); },1450);
  SFX.aparado(v);
}
function flashJog(d){
  const f=document.createElement('div'); f.id='ferida'; document.body.appendChild(f);
  setTimeout(()=>f.remove(),420);
  const n=document.createElement('div'); n.className='dmgme'; n.textContent='-'+d;
  n.style.setProperty('--dx', proxDesvio());
  document.getElementById('voce').appendChild(n); setTimeout(()=>n.remove(),1450);
}
/* o MESMO retorno quando é você que apara: sem ferida vermelha na tela */
function flashJogEscudo(v){
  const f=document.createElement('div'); f.id='ferida'; f.className='azul';
  document.body.appendChild(f); setTimeout(()=>f.remove(),380);
  const alvo=document.getElementById('voce');
  const n=document.createElement('div'); n.className='dmgme esc'; n.textContent='🛡'+v;
  // o mesmo anel de faísca que o inimigo ganha: o escudo tem que ser visível
  const c=document.createElement('div'); c.className='clang eu';
  alvo.appendChild(n); alvo.appendChild(c);
  setTimeout(()=>{ n.remove(); c.remove(); },1450);
  SFX.aparado(v);
}
/* ===================================================================
   A FÓRMULA DO GOLPE — de onde sai o número.

   As habilidades sempre multiplicaram (Colapso é sum*5, Julgamento é
   28+sum*4), mas isso só aparecia na descrição em prosa: na carta e no
   combate o jogador via um total pronto e não tinha como saber que uma
   dava três vezes a soma e a outra cinco. Sem enxergar o multiplicador não
   dá para escolher entre gastar os dados grandes aqui ou ali.
   =================================================================== */
function formulaDano(sk){
  let melhor = null;
  for(const e of (sk.eff||[])){
    if(e.op!=='dmg' && e.op!=='hits') continue;
    const amt = String(e.amt||'');
    const m = /(?:^|\+)\s*(sum|val|count)\s*\*\s*(\d+)/.exec(amt);
    const mult = m ? +m[2] : (/(?:^|\+)\s*(sum|val|count)\s*(?:$|\+)/.test(amt) ? 1 : 0);
    if(!mult) continue;
    const base = m ? m[1] : (/sum/.test(amt)?'sum':/val/.test(amt)?'val':'count');
    const fx = /(\d+)\s*\+\s*(?:sum|val|count)/.exec(amt);
    const fixo = fx ? +fx[1] : (/\*\s*\d+\s*\+\s*(\d+)/.exec(amt)?.[1] | 0);
    const cand = { mult, base, fixo:+fixo||0, todos:e.tgt==='all', vezes:e.op==='hits' };
    if(!melhor || cand.mult>melhor.mult) melhor = cand;
  }
  return melhor;
}
const SIMB_BASE = { sum:'Σ', val:'valor', count:'n' };
/* A BANCA DA CONTA: a multiplicação acontece na tela, em três tempos —
   a base sai dos dados, o multiplicador cai em cima, o total explode. É o
   meio segundo entre apertar a carta e o inimigo levar, e é onde o jogador
   entende POR QUE aquele golpe deu 55 e não 11. */
function bancaDaConta(sk, ents){
  const f = formulaDano(sk); if(!f || f.mult<2) return 0;
  /* usa a mesma conta() da carta: ela resolve o ◈ Curinga pelo valor que a
     fechadura pediu, então a banca mostra o número que o motor vai usar de
     verdade — e não um Σ diferente do que o golpe cobrou. */
  const c = conta(ents, sk.req); if(!c) return 0;
  const base = f.base==='sum' ? c.soma : f.base==='count' ? c.n : c.maior;
  if(!base) return 0;
  const total = base*f.mult + f.fixo;
  /* A CONTA ACONTECE, ela não aparece pronta. Antes os três números entravam
     juntos e sumiam em 1,1s: dava para ver que havia uma conta, não para LER
     a conta. Agora cada dado cai na banca somando ao anterior, o total
     parcial acompanha, e só então o multiplicador desce em cima. */
  const dados = f.base==='sum' ? c.vals.map(v=>v==null?'◈':v) : null;
  const b=document.createElement('div'); b.className='bancaconta';
  b.innerHTML=`<span class="bcdd">${dados
      ? dados.map((v,i)=>`<i class="bcd" data-i="${i}">${v}</i>`).join('<u class="bcmais">+</u>')
      : `<i class="bcd on">${base}</i>`}</span>
    <span class="bcsoma"><b class="bcsn">0</b></span>
    <span class="bcx">×${f.mult}</span>
    ${f.fixo?`<span class="bcp">+${f.fixo}</span>`:''}
    <span class="bce">=</span><span class="bct">?</span>
    ${f.todos?'<span class="bca">EM TODOS</span>':''}`;
  document.body.appendChild(b);
  const chips=[...b.querySelectorAll('.bcd')], mais=[...b.querySelectorAll('.bcmais')];
  const alvoS=b.querySelector('.bcsn'), alvoT=b.querySelector('.bct');
  const vals = dados ? c.vals.map(v=> v==null ? 0 : v) : [base];
  const PASSO = 230;                       // um dado por vez, no ritmo de ler
  let acc=0, t=120;
  chips.forEach((ch,i)=>{
    setTimeout(()=>{ ch.classList.add('on'); if(mais[i-1]) mais[i-1].classList.add('on');
      acc += vals[i]||0; alvoS.textContent = acc;
      alvoS.parentElement.classList.remove('pulsa'); void alvoS.offsetWidth;
      alvoS.parentElement.classList.add('pulsa');
      SFX.pegar && SFX.pegar(); }, t);
    t += PASSO;
  });
  // a soma fecha, o multiplicador desce, o total explode
  setTimeout(()=>{ b.querySelector('.bcx')?.classList.add('on'); SFX.golpe && SFX.golpe(4); }, t+90);
  setTimeout(()=>{ b.querySelector('.bcp')?.classList.add('on'); }, t+300);
  setTimeout(()=>{ alvoT.textContent = total; b.classList.add('estoura'); }, t+430);
  const fim = t + 430 + 620;
  setTimeout(()=>{ b.classList.add('saindo'); }, fim-260);
  setTimeout(()=>b.remove(), fim);
  return t + 430;                          // quanto o resto da animação deve esperar
}
/* espalha os números quando vários caem no mesmo alvo, pra não empilharem */
let desvio=0;
function proxDesvio(){ desvio=(desvio+1)%5; return (desvio-2)*15 + 'px'; }
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
  /* A CONTA VEM ANTES DO SANGUE. bancaDaConta devolve quanto tempo ela leva
     somando dado a dado; o golpe espera esse tempo para cair. Sem a espera,
     o número do dano subia no inimigo enquanto a soma ainda estava no
     terceiro dado, e as duas coisas disputavam o olho ao mesmo tempo. */
  const espera = bancaDaConta(s, ents) || 0;
  cb.use(s, ids, alvo); sel.clear(); previa=null;
  for(const id of ids) praBandeja(id);            // os dados gastos vão pro canto
  pintar();                                       // repinta ANTES (senão apaga os efeitos)
  if(espera) anima = true;                        // trava a mesa enquanto a conta corre
  setTimeout(()=>{
    anima = false;
    efeitoHabilidade(s, alvosPrev);               // efeito próprio da habilidade
    juice(antes,hpA);                             // pinta primeiro, depois os efeitos
    if(cb.over) setTimeout(fim,900);
  }, espera);
}
$('brer').onclick=()=>{ if(anima||cb.rerolls<=0) return;
  // só os dados AINDA NA MÃO: pool() já exclui os gastos
  const livres = cb.pool().map(e=>e.dieId);
  /* MÃO ESCOLHIDA (Passivas): sem ela a re-rolagem é cega e leva a mão inteira —
     você tem um 5 e um 6 bons ao lado de dois 1, e perde os quatro. Com ela,
     a seleção manda: rolam só os dados que você marcou. */
  const podeEscolher = BON.rerollEscolhido || P.arvore?.rerollEscolhido;
  const ids = (podeEscolher && sel.size)
    ? [...sel].filter(id=>livres.includes(id)) : livres;
  const rolados = cb.reroll(ids);
  if(!rolados){ SFX.soltar(); return; }      // nada rolou: não gasta nem anima
  sel.clear(); rolarVisual(rolados); pintar(); };
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
/* A CONTA DO GOLPE — quantos dados, quanto soma e se é par ou ímpar.
   Sem isso você tinha que somar de cabeça pra saber se abria a fechadura. */
function conta(ents, req){
  if(!ents || !ents.length) return null;
  const curingas = ents.filter(e=>e.face.k==='wild').length;
  const vals = req ? resolvedValues(req, ents)
                   : ents.map(e=> e.face.k==='wild' ? null : (e.face.v ?? 0));
  const nums = vals.filter(v=>v!==null && v!==undefined);
  const soma = nums.reduce((a,b)=>a+b,0);
  return { n:ents.length, vals, soma, curingas,
           par: soma%2===0, maior: nums.length?Math.max(...nums):0 };
}
function contaHTML(c, cls=''){
  if(!c) return '';
  const pIco = c.par?'◐':'◑', pTxt = c.par?'PAR':'ÍMPAR';
  return `<span class="conta ${cls}">
    <span class="cdd">${c.vals.map(v=>`<i class="dv">${v??'◈'}</i>`).join('<b class="mais">+</b>')}</span>
    <span class="cqt">${c.n} dado${c.n>1?'s':''}</span>
    <span class="csoma">Σ ${c.soma}${c.curingas?'+◈':''}</span>
    <span class="cpar ${c.par?'p':'i'}">${pIco} ${c.curingas?'depende do ◈':pTxt}</span>
  </span>`;
}
/* habilidades que você REALMENTE tem agora (a 4ª só com a Coroa da árvore) */
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
/* as relíquias guardam a regra numa FLAG (nome de variável). A carta tem que
   dizer o que a regra faz, não como ela se chama no código. */
const FLAG_TXT = {
  prever:          'vê 1 dado antes de rolar',
  turno_duplo:     'joga 2× no 1º turno',
  veneno_eterno:   'veneno não decai',
  dobro_recompensa:'recompensa dobrada · inimigos +35% HP',
  sangra_turno:    'você perde 4 de HP por turno',
  sem_cura:        'você NÃO se cura mais',
};
const FLAG_RUIM = new Set(['sangra_turno','sem_cura']);
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
    // o nome da flag é variável de código: o jogador precisa da REGRA
    if(o.rel.flag) L.push(`<i class="${FLAG_RUIM.has(o.rel.flag)?'dn':'up'}">${FLAG_TXT[o.rel.flag]||o.rel.flag}</i>`);
    if(o.rel.onKill) L.push(`<i class="up">ao matar: dispara</i>`);
    if(o.rel.start) L.push(`<i class="up">começa o combate com efeito</i>`);
    if(!L.length) L.push(`<i>passiva permanente da run</i>`);
    return `<div class="difl">${L.join('')}</div>`;   // a raridade já está na fita
  }
  if(o.t==='vigor'){
    // o Vigor sobe a BASE; as relíquias de multiplicador continuam por cima,
    // então a carta mostra o máximo que vai REALMENTE ficar, não base+7
    const mult = (P.relicMods?.hpMult)||1;
    const fica = Math.max(1, Math.round(((P.baseMaxHp||P.maxHp)+7 + (P.relicMods?.hpBonus||0)) * mult));
    return `<div class="difl">${linhaDif('HP máx', P.maxHp, fica)}
      <i class="up">+${fica-P.maxHp} de vida permanente</i>
      <i>e recupera o mesmo tanto agora</i></div>`;
  }
  const cura = Math.round(P.maxHp*0.18);
  // carta que não avisa que não faz nada é carta que mente
  if(P.hp >= P.maxHp)
    return `<div class="difl"><i class="dn">HP já está cheio — esta não cura nada</i></div>`;
  const fica = Math.min(P.maxHp, P.hp+cura);
  return `<div class="difl">${linhaDif('HP', P.hp, fica)}<i class="up">+${fica-P.hp}</i><i>de ${P.maxHp} máx</i></div>`;
}
function painelHabilidades(){
  const hab=habilidadesAtuais();
  return `<details class="recskills"><summary>▾ VER MINHAS ${hab.length} HABILIDADES</summary>
    ${hab.map(s=>`<div class="rsk"><b>${s.nome}</b><u>${reqLabel(s.req)}</u>
      <span>${s.desc}</span></div>`).join('')}</details>`;
}
/* ===== O PÓDIO DO ANDAR =====
   O selo muda com o que você acabou de fazer: andar comum, subchefe (5) e
   chefe (10) não podem ser o mesmo momento. */
function seloDoAndar(){
  if(andar===10) return { cor:'#ffd24a', n:'★',  l:'CHEFE CAÍDO',   sub:'A MASMORRA '+masmorra+' É SUA' };
  if(andar===5)  return { cor:'#c07cff', n:'✦',  l:'SUBCHEFE CAÍDO',sub:'SANTUÁRIO — VOCÊ SE CURA' };
  return           { cor:'#8fd8a0', n:String(andar), l:'ANDAR LIMPO', sub:'MASMORRA '+masmorra+' · FALTAM '+(10-andar) };
}
/* raridade visível: é o que dá peso à escolha sem precisar ler nada */
function rotuloRaridade(o){
  if(o.t==='reliquia') return { cls:'r-'+o.r, txt:o.r==='amaldicoada'?'AMALDIÇOADA':o.r.toUpperCase() };
  if(o.t==='dado')  return { cls:'', txt:o.tipo.toUpperCase() };
  if(o.t==='grav')  return { cls:'', txt:'FORJA' };
  if(o.t==='vigor') return { cls:'r-rara', txt:'VIGOR' };
  return              { cls:'', txt:'DESCANSO' };
}
/* ===== VITÓRIA: passar da última masmorra =====
   Não existia. Quem limpasse a Masmorra 10 caía num mapa da masmorra 11, que
   não existe, e a tela estourava — e `vitorias` nunca saía de zero. */
function telaVitoria(){
  // a vitória é epílogo, não combate: a de chefe soaria como ameaça
  META.limparRun();            // a descida terminou
  SFX.vitoria(); SFX.trilha('menu');
  const m=$('msg'); m.classList.remove('off'); m.className='';
  const ganho=META.ecosDaRun({andares:stats.andares, elites:stats.elites, chefes:stats.chefes,
    masmorra:META.MASMORRAS_TOTAL, venceu:true}, multEcos());
  cofre.ecos+=ganho; cofre.runs=(cofre.runs||0)+1; cofre.vitorias=(cofre.vitorias||0)+1;
  cofre.recordes={ andar:10, masmorra:META.MASMORRAS_TOTAL };
  META.salvar(cofre);
  const C=CLASSES[P.classe];
  m.innerHTML=`<div class="fimwrap venceu">
    ${HEROIS_COM_ARTE.has(P.classe)
      ? `<div class="fimheroi" style="--cc:${C.cor}"><img src="arte/herois/${P.classe}.png" alt=""></div>`
      : `<div class="fimselo ganhou"><div class="fimanel"></div><span>★</span></div>`}
    <div class="fimt vit">VOCÊ CHEGOU AO FUNDO</div>
    <div class="fimprof">100 ANDARES</div>
    <div class="fimvitsub">${C.glifo} ${C.nome} atravessou as ${META.MASMORRAS_TOTAL} masmorras
      e o Abismo não ficou com nada.</div>
    <div class="fimgrid">
      <div class="fimcard"><b>${stats.andares}</b><u>ANDARES</u></div>
      <div class="fimcard"><b>${stats.elites}</b><u>ELITES</u></div>
      <div class="fimcard"><b>${stats.chefes}</b><u>CHEFES</u></div>
      <div class="fimcard"><b>${P.hp}</b><u>HP RESTANTE</u></div>
    </div>
    <div class="fimeco"><span class="eic">◈</span> +${ganho} <i>ecos</i></div>
    <div class="mbtns">
      <button class="mb pri" data-a="denovo">▶ DESCER DE NOVO</button>
      <button class="mb cof" data-a="cofre">🌳 PASSIVAS <em>${cofre.ecos} Ecos guardados</em></button>
      <button class="mb" data-a="titulo">◂ TELA INICIAL</button>
    </div></div>`;
  bindA(m,{ denovo:telaClasses, cofre:telaCofre, titulo:telaTitulo });
}
/* ---------- fim de combate ---------- */
function fim(){
  const m=$('msg'); m.classList.remove('off'); m.className='';
  if(cb.over==='lose'){ SFX.derrota(); SFX.trilha('menu');
    META.limparRun();          // morreu: só se recomeça do zero
    const ganho=META.ecosDaRun({andares:stats.andares, elites:stats.elites, chefes:stats.chefes,
      masmorra, venceu:false}, multEcos());
    cofre.ecos+=ganho; cofre.runs=(cofre.runs||0)+1;
    const prof=(masmorra-1)*10+andar;
    const rp=(cofre.recordes.masmorra-1)*10+cofre.recordes.andar;
    const novoRec = prof>rp;
    if(novoRec) cofre.recordes={andar, masmorra};
    META.salvar(cofre);
    // a profundidade contra o recorde: é o placar que o jogador persegue
    const pctP = Math.round(100*prof/100), pctR = Math.round(100*Math.max(rp,prof)/100);
    m.innerHTML=`<div class="fimwrap">
      <div class="fimselo perdeu"><div class="fimanel"></div><span>${prof}</span></div>
      <div class="fimt">O ABISMO FICOU COM VOCÊ</div>
      <div class="fimprof">M${masmorra} · ANDAR ${andar}</div>
      ${novoRec?'<div class="fimrec">✦ NOVO RECORDE ✦</div>':''}
      <div class="fimprog">
        <u><span>PROFUNDIDADE</span><b>${prof}/100</b></u>
        <div class="fimbar"><i style="width:${pctR}%"></i><span style="width:${pctP}%"></span></div>
        <em>${novoRec?'seu ponto mais fundo até hoje':'recorde: '+Math.max(rp,prof)+' andares'}</em>
      </div>
      <div class="fimgrid">
        <div class="fimcard"><b>${stats.andares}</b><u>ANDARES</u></div>
        <div class="fimcard"><b>${stats.elites}</b><u>ELITES</u></div>
        <div class="fimcard"><b>${stats.chefes}</b><u>CHEFES</u></div>
      </div>
      <div class="fimeco"><span class="eic">◈</span> +${ganho} <i>ecos</i></div>
      <div class="mbtns">
        <button class="mb cof" data-a="cofre">🌳 GASTAR EM PASSIVAS <em>${cofre.ecos} Ecos guardados</em></button>
        <button class="mb pri" data-a="denovo">▶ DESCER DE NOVO</button>
      </div></div>`;
    bindA(m,{ cofre:telaCofre, denovo:telaClasses });
    return;
  }
  SFX.vitoria();
  stats.andares++;
  stats.elites += cb.enemies.filter(e=>e.elite).length;
  if(andar===10) stats.chefes++;
  const opts=gerarOpcoes(rng,P,3+(P.arvore?.opcoes||0));
  const S = seloDoAndar();
  const mortos = cb.enemies.length, elites = cb.enemies.filter(e=>e.elite).length;
  m.innerHTML=`<div class="recwrap">
    <div class="vitsel" style="--sc:${S.cor}">
      <div class="vitanel"></div><div class="vitanel b"></div>
      <div class="vitn">${S.n}</div>
    </div>
    <div class="vitl" style="--sc:${S.cor}">${S.l}</div>
    <div class="vitsub">${S.sub}</div>
    <div class="vittrilha">${Array.from({length:10},(_,i)=>{
      const n=i+1, cls = n<=andar?'on':'' , marco = n===5||n===10?' m':'';
      return `<span class="${cls}${marco}"${n<=andar?` style="--sc:${S.cor}"`:''}></span>`;
    }).join('')}</div>
    <div class="vitstats">
      <i><b>${mortos}</b>derrubados</i>
      ${elites?`<i><b>${elites}</b>elite${elites>1?'s':''}</i>`:''}
      <i><b>${cb.turn}</b>turno${cb.turn>1?'s':''}</i>
      <i><b>${P.hp}</b>/${P.maxHp} HP</i>
    </div>
    <div class="recp">ESCOLHA O QUE LEVAR</div>
    <div class="recs2">${opts.map((o,i)=>{
      const R = rotuloRaridade(o);
      return `<button class="rec ${o.t} ${R.cls}" data-i="${i}" style="--d:${i}">
      <div class="rrar">${R.txt}</div>
      <div class="rectopo">
        <div class="ric">${o.t==='dado'?'🎲':o.t==='grav'?'⚒':o.t==='reliquia'?'🕯️':o.t==='vigor'?'❤️':'✚'}</div>
        <div><b>${o.nome}</b><span>${o.desc}</span></div>
      </div>
      <div class="recdif">${antesDepois(o)}</div>
      <div class="recpeg">LEVAR ESTA</div></button>`;}).join('')}</div>
    ${painelHabilidades()}</div>`;
  const grade = m.querySelector('.recs2');
  m.querySelectorAll('.rec').forEach(b=>b.onclick=()=>{
    if(grade.classList.contains('escolhido')) return;   // uma escolha só
    SFX.pegar();
    grade.classList.add('escolhido'); b.classList.add('levada');
    aplicar(opts[+b.dataset.i],P,rng);
    // Língua de Prata: leva uma segunda recompensa junto
    if(P.relicFlags?.has('dobro_recompensa')){
      const outra = opts.filter((_,i)=>i!==+b.dataset.i)[0];
      if(outra){ aplicar(outra,P,rng);
        const eb = m.querySelector(`.rec[data-i="${opts.indexOf(outra)}"]`);
        if(eb) eb.classList.add('levada'); }
    }
    /* RESPIRO ENTRE ANDARES. Medido: com cura só nos santuários (15% nos
       andares 5 e 10), a descida inteira devolvia ~30% de vida contra lutas
       que cobram 25% a 50% cada uma. As lutas da Masmorra 9 se ganham 5 vezes
       em 6 com o HP cheio — e mesmo assim a masmorra fechava 4%, porque o
       jogador chegava no andar seguinte sem vida, não sem habilidade.
       O fardo da Masmorra 8 corta esta cura pela metade, como corta as outras. */
    { const pct = (andar===5||andar===10) ? 0.30 : 0.06;
      const meio = burdensFor(masmorra).includes('cura_reduzida') ? 0.5 : 1;
      P.hp = Math.min(P.maxHp, P.hp + Math.round(P.maxHp*pct*meio)); }
    // fechou a masmorra: a próxima passa a ser um começo possível
    if(andar===10){ cofre=META.carregar();
      if(META.abrirMasmorra(cofre, masmorra+1)) BON=META.bonus(cofre); }
    andar++; if(andar>10){ andar=1; masmorra++; }
    // FIM DO JOGO: passar da Masmorra 10 caía em ESCALADA[10] === undefined e
    // a tela do mapa estourava. Não existia vitória — o contador de vitórias
    // aparecia no título e nunca podia sair de zero.
    if(masmorra > META.MASMORRAS_TOTAL){ setTimeout(telaVitoria, 560); return; }
    // deixa a carta acender antes de trocar de tela — a escolha precisa
    // ter um instante de confirmação, senão não parece que aconteceu nada
    setTimeout(()=>telaMapa(true), 560);
  });
}
/* ---------- loop ---------- */
/* A MESA CABE NA FAIXA LIVRE. Antes o canvas ocupava a tela inteira por baixo
   de tudo, então a fileira de inimigos e as habilidades ficavam por cima do
   feltro. Agora ele começa embaixo da fileira e termina em cima do rodapé. */
/* O canvas é a faixa do meio do grid: em vez de CALCULAR a altura dele
   subtraindo as outras duas — conta que ficava velha assim que o rodapé
   crescia, e aí a HUD tapava os dados —, ele apenas OBEDECE ao tamanho que o
   navegador já lhe deu. */
function resize(){
  const el = renderer.domElement;
  const r  = el.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  faixa = { top:r.top, h };
  renderer.setSize(w, h, false);
  camera.aspect = w/h; camera.updateProjectionMatrix();
  const need=Math.max(MESA.x/Math.max(camera.aspect,0.4), MESA.z*1.15)*1.12;
  const d=need/Math.tan((camera.fov*Math.PI/180)/2);
  camera.position.set(0,d*0.92,d*0.44); camera.lookAt(0,0.1,0); }
addEventListener('resize',resize); resize();
/* o próprio canvas avisa quando o grid o redimensiona */
if(window.ResizeObserver) new ResizeObserver(()=>resize()).observe(renderer.domElement);
(function loop(){
  if(shakeT>0.2){ shakeT*=0.86;
    const a=shakeT*0.006;
    camera.position.x=(Math.random()*2-1)*a*9; camera.position.z+= (Math.random()*2-1)*a*3;
    document.body.style.setProperty('--sk', ((Math.random()*2-1)*shakeT*0.5).toFixed(2)+'px');
  } else if(shakeT){ shakeT=0; camera.position.x=0; resize(); document.body.style.setProperty('--sk','0px'); }
  atualizarBadges();
  renderer.render(scene,camera); requestAnimationFrame(loop); })();
telaTitulo();
window.__semArte=(img,id)=>{ img.onerror=null; img.src=spriteCanvas(id); };
window.__jogo={ get cb(){return cb;}, get P(){return P;}, usar, iniciar,
  get sel(){return sel;}, get malhas(){return malhas;},
  get anima(){return anima;}, get previa(){return previa;}, calcPrevia, pintar, SFX, fim, telaVitoria };
