/* ========================================================================
   A TELA — lê o motor e desenha. Ela não decide nada.

   A regra que separa este arquivo de `engine/`: aqui não se calcula ponto,
   não se sorteia carta e não se resolve par. Tudo o que aparece vem de um
   RELATÓRIO que o motor devolveu. Se a tela recalculasse qualquer coisa, o
   número que pisca e o número que contou sairiam diferentes um dia — e é
   sempre o jogador que percebe primeiro.

   A única coisa que a tela decide sozinha é TEMPO.

   E era exatamente aí que estava o pior defeito da primeira versão: o motor
   resolve o par no mesmo instante em que a segunda carta é tocada, e a tela
   redesenhava logo em seguida filtrando as cartas resolvidas. Resultado: a
   segunda carta nem terminava de virar e as duas já tinham evaporado. O
   jogador nunca via o par que acabou de formar.

   O conserto tem duas partes:

   1. A tela desenha TODAS as cartas, resolvidas inclusive. Quem some é
      apenas o que de fato deixa o tabuleiro (bomba, chefe), e mesmo esse
      deixa a casa vazia no lugar.
   2. Um par fechado passa por uma coreografia com tempo próprio —
      reconhecer, comemorar, selar — e só então vira carta gasta.

   Par fechado fica no tabuleiro, apagado e carimbado. Além de deixar ver o
   par, isso impede a grade de se remexer no meio da partida, que num jogo
   da memória arruinaria o que o jogador tinha decorado das OUTRAS cartas.
   ===================================================================== */
import { Run, verificar, SALAS, MUNDOS, COMBATE, planoDaSala } from '../engine/run.js';
import { degrauCombo, COMBOS } from '../engine/tabuleiro.js';
import { TIPOS, LISTA_TIPOS } from '../data/cartas.js';
import { FAMILIAS, LISTA_FAMILIAS } from '../data/familias.js';
import { CLASSES, LISTA_CLASSES } from '../data/classes.js';
import { RELIQUIAS, POR_ID, RARIDADE } from '../data/reliquias.js';
import { LISTA_BOSSES } from '../data/bosses.js';
import { svgGlifo } from '../arte/glifos.js';
import { SFX, acordar, mudo, estaMudo } from './sfx.js';
import { ICO, ICO_CLASSE, ICO_CHEFE } from './icones.js';
import * as RANK from '../net/ranking.js';

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nf  = n => Number(n||0).toLocaleString('pt-BR');
const vg  = n => String(n).replace('.', ',');
const espera = ms => new Promise(r=>setTimeout(r, ms));

/* ---------- estado da TELA (o do jogo mora na Run) ---------- */
let run = null;
let mostrando = new Set();      // cartas que a tela segura abertas
let travado = false;            // durante a coreografia de uma tentativa
let telaAtual = 'titulo';
/* A sala que a TELA ainda está mostrando. Quando a tentativa encerra a sala,
   o motor zera `run.sala` na hora — mas a coreografia ainda tem meio segundo
   de comemoração para tocar, e ela precisa de um tabuleiro para desenhar. */
let salaViva = null;
let abaRank = 'mundial';
let alvoPendente = null;

/* a escada de combo também é uma escada de COR: o jogador vê o degrau
   subir antes de ler o nome dele */
const COR_COMBO = ['#8d99b1','#7fd4ff','#66e6a6','#efb54b','#ffa24d','#ff6a5a','#e05a8a','#a98bff','#ffffff'];
const corDoCombo = n => COR_COMBO[Math.max(0, COMBOS.findIndex(c=>c===degrauCombo(n)))] || COR_COMBO[0];

/* ═══════════════════════════════════════════ navegação */
function ir(nome){
  telaAtual = nome;
  $$('.tela').forEach(t=>t.classList.toggle('on', t.id === 't-'+nome));
  ({ classe:telaClasse, mapa:telaMapa, sala:pintarSala, premio:telaPremio,
     loja:telaLoja, evento:telaEvento, fim:telaFim, livro:telaLivro,
     rank:telaRank }[nome] || (()=>{}))();
}

/* leva a run para onde ela estiver: é o único lugar que decide isso, para
   não haver dois caminhos discordando sobre em que sala o jogador está */
function seguir(){
  if(!run) return ir('titulo');
  if(run.acabou())         return ir('fim');
  if(run.sala)             return ir('sala');
  if(run.aguardandoPremio) return ir('premio');
  const t = run.tipoSala();
  if(t==='loja')                     return ir('loja');
  if(t==='evento' || t==='descanso') return ir('evento');
  if(t==='tesouro')                  return ir('premio');
  return ir('mapa');
}

function aviso(txt, sub='', cor=null){
  const a = $('#aviso');
  a.querySelector('.a1').textContent = txt;
  a.querySelector('.a2').textContent = sub;
  a.style.setProperty('--ac',  cor ? cor : 'var(--ouro2)');
  a.style.setProperty('--ac2', cor ? cor : 'var(--ouro)');
  a.style.setProperty('--ag',  cor ? cor+'88' : 'rgba(239,181,75,.5)');
  a.classList.remove('on'); void a.offsetWidth; a.classList.add('on');
  clearTimeout(aviso._t);
  aviso._t = setTimeout(()=>a.classList.remove('on'), 1600);
}
function clarao(cor='rgba(239,181,75,.42)'){
  const c = $('#clarao');
  c.style.setProperty('--cor', cor);
  c.classList.remove('on'); void c.offsetWidth; c.classList.add('on');
}
function ficha(html){
  $('#folhac').innerHTML = html + '<div class="hr"></div>'
    + '<button class="bt g" data-fechar>FECHAR</button>';
  $('#folha').classList.add('on');
}
$('#folha').addEventListener('click', e=>{
  if(e.target.id==='folha' || e.target.closest('[data-fechar]'))
    $('#folha').classList.remove('on');
});

/* ═══════════════════════════════════════════ peças de texto reutilizáveis */
const verbete = (icone, titulo, texto, extra='') =>
  `<div class="verb"><div class="em">${icone}</div><div>
     <h4>${titulo}${extra}</h4><p>${texto}</p></div></div>`;

const fichaFamilia = f => verbete(svgGlifo(f.id, 0, 'gl'), esc(f.nome), esc(f.regra),
  `<span class="tag" style="color:${f.cor}">${esc(f.traco)}</span>`);
const fichaTipo = t => verbete(ICO[t.id] || ICO.normal, esc(t.nome), esc(t.d),
  `<span class="tag" style="color:${t.cor}">${t.base||10} base${
    t.mult&&t.mult!==1 ? ' · ×'+t.mult : ''}</span>`);
function fichaReliquia(id){
  const r = POR_ID[id]; if(!r) return '';
  return verbete(ICO.reliquia, esc(r.nome), esc(r.d),
    `<span class="tag" style="color:${RARIDADE[r.r]}">${r.r}</span>`);
}

/* ═══════════════════════════════════════════ TÍTULO */
(function fundoAnimado(){
  const f = $('#fundo');
  for(let i=0;i<16;i++){
    const e = document.createElement('i');
    const s = 0.65 + Math.random()*0.8;
    e.style.left = (Math.random()*100).toFixed(1)+'%';
    e.style.setProperty('--a', (Math.random()*44-22).toFixed(0)+'deg');
    e.style.animationDuration = (14 + Math.random()*14).toFixed(1)+'s';
    e.style.animationDelay = (-Math.random()*26).toFixed(1)+'s';
    e.style.opacity = (0.18 + Math.random()*0.42).toFixed(2);
    e.style.width = (48*s).toFixed(0)+'px'; e.style.height = (64*s).toFixed(0)+'px';
    f.appendChild(e);
  }
})();

document.addEventListener('click', e=>{
  const b = e.target.closest('[data-ir]');
  if(!b) return;
  acordar(); SFX.clique();
  const d = b.dataset.ir;
  if(d==='diario'){ novaRun(null, true); return; }
  if(d==='titulo'){ run = null; }
  ir(d);
});

/* ═══════════════════════════════════════════ ESCOLHA DE CLASSE */
let diarioPedido = false;

function semeanteDoDia(){
  const d = new Date();
  return 'diario-' + d.getUTCFullYear() + '-'
    + String(d.getUTCMonth()+1).padStart(2,'0') + '-'
    + String(d.getUTCDate()).padStart(2,'0');
}
const sementeNova = () =>
  Math.random().toString(36).slice(2,8) + Date.now().toString(36).slice(-4);

function novaRun(classe, diario=false){
  diarioPedido = diario;
  if(!classe) return ir('classe');
  run = new Run({ semente: diario ? semeanteDoDia() : sementeNova(), classe, diario });
  mostrando = new Set();
  seguir();
}

function telaClasse(){
  $('#t-classe').innerHTML = `
    <div class="topo-linha">
      <button class="bt pq" data-ir="titulo">VOLTAR</button>
      <div class="cabeca">
        <div class="rot">${diarioPedido ? 'run diária · mesma semente para todos' : 'nova run'}</div>
        <h2 class="tit">Quem vai lembrar por você?</h2>
      </div>
    </div>
    <div class="rol"><div class="grade">
    ${LISTA_CLASSES.map(c=>`
      <button class="op esc" data-classe="${c.id}" style="--fc:${c.cor}">
        <span class="agua">${ICO_CLASSE[c.id]||''}</span>
        <span class="gf" style="color:${c.cor}">${ICO_CLASSE[c.id]||''}</span>
        <h3 style="color:${c.cor}">${esc(c.nome)}</h3>
        <div class="lm">“${esc(c.lema)}”</div>
        <p>${esc(c.d)}</p>
        <div class="stats">
          <span>foco <b>${c.foco}</b></span>
          <span>viradas <b>${c.viradasBonus>=0?'+':''}${c.viradasBonus}</b></span>
          <span>moedas <b>${c.moedas}</b></span>
        </div>
        <div class="pr" style="color:${c.cor}">${ICO.reliquia}${esc(c.ferramenta.nome)}</div>
        <p style="font-size:11.5px">${esc(c.ferramenta.d)}</p>
      </button>`).join('')}
    </div></div>`;
  $$('#t-classe [data-classe]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); novaRun(b.dataset.classe, diarioPedido);
  });
}

/* ═══════════════════════════════════════════ MAPA */
const NOME_SALA = { combate:'Combate', elite:'Elite', boss:'Chefe', loja:'Loja',
                    evento:'Evento', descanso:'Fogueira', tesouro:'Tesouro' };
const ICO_SALA = { combate:'combate', elite:'elite', boss:'chefe', loja:'loja',
                   evento:'evento', descanso:'fogueira', tesouro:'tesouro' };
const COR_SALA = { boss:'#ff6a5a', elite:'#ffa24d', loja:'#66e6a6',
                   tesouro:'#a98bff', descanso:'#ff8a4d', evento:'#7fd4ff',
                   combate:'#efb54b' };

function telaMapa(){
  const b = run.bossDoMundo();
  const plano = run.plano();
  const tipo = run.tipoSala();
  const ehComb = COMBATE.has(tipo);
  const cor = COR_SALA[tipo];
  $('#t-mapa').innerHTML = `
    <div class="topo-linha">
      <div class="cabeca">
        <div class="rot">mundo ${run.mundo+1}/${MUNDOS} · sala ${run.indice+1}/${SALAS.length}</div>
        <h2 class="tit" style="color:${cor}">${esc(NOME_SALA[tipo])}</h2>
      </div>
      <button class="bt pq" data-ir="livro">REGRAS</button>
    </div>
    <div class="trilha">${run.mapa().map(s=>`
      <div class="sala ${s.feito?'feito':''} ${s.atual?'atual':''}"
           style="color:${COR_SALA[s.tipo]}">
        <div class="bl">${ICO[ICO_SALA[s.tipo]]||ICO.combate}</div>
        <div class="nm">${esc(NOME_SALA[s.tipo])}</div>
      </div>`).join('')}</div>
    <div class="hr"></div>
    <div class="rol">
      ${ehComb ? `
        <div class="op esc" style="--fc:${cor};cursor:default">
          <span class="agua">${ICO.meta}</span>
          <div class="rot">o que te espera</div>
          <h3>${plano.pares} pares · ${plano.pares*2} cartas</h3>
          <div class="stats">
            <span>meta <b style="color:var(--ouro)">${nf(plano.meta)}</b></span>
            <span>viradas <b>${plano.viradas + run.bonusViradas}</b></span>
            <span>foco <b>${run.foco}</b></span>
          </div>
          <p class="mini">Vencer é bater a meta, não limpar o tabuleiro.</p>
        </div>
        ${tipo==='boss' ? `
        <div class="op esc" style="--fc:var(--perigo);cursor:default;margin-top:9px">
          <span class="agua">${ICO_CHEFE[b.id]||''}</span>
          <span class="gf" style="color:var(--perigo)">${ICO_CHEFE[b.id]||''}</span>
          <div class="rot" style="color:var(--perigo)">chefe do mundo</div>
          <h3 style="color:var(--perigo)">${esc(b.nome)}</h3>
          <p>${esc(b.regra)}</p>
          <p class="mini" style="font-style:italic">${esc(b.dica)}</p></div>` : ''}
      ` : ''}
      <div class="hr"></div>
      <dl class="tabnum">
        <dt>Pontos da run</dt><dd>${nf(run.pontos)}</dd>
        <dt>Moedas</dt><dd>${nf(run.moedas)}</dd>
        <dt>Foco</dt><dd>${run.foco}</dd>
        <dt>Salas vencidas</dt><dd>${run.estatisticas.salas}</dd>
      </dl>
      ${run.reliquias.length ? `<div class="hr"></div>
        <div class="rot" style="margin-bottom:5px">suas relíquias</div>
        ${run.reliquias.map(fichaReliquia).join('')}` : ''}
    </div>
    <div class="pe"><button class="bt p g" id="entrar">
      ${ehComb ? (tipo==='boss'?'ENFRENTAR O CHEFE':'ENTRAR NA SALA') : 'SEGUIR'}</button></div>`;
  $('#entrar').onclick = ()=>{
    acordar(); SFX.clique();
    if(ehComb){ run.entrar(); mostrando = new Set(); ir('sala'); }
    else seguir();
  };
}

/* ═══════════════════════════════════════════ COMBATE */
const faceAberta = c => c.virada || c.vista || c.marcada || c.resolvida || mostrando.has(c.id);

let iconesHUD = false;
function pintarSala(){
  const s = run.sala; if(!s) return seguir();
  salaViva = s;
  if(!iconesHUD){
    $('#mvir .i').innerHTML = ICO.virada;
    $('#mfoc .i').innerHTML = ICO.foco;
    $('#mmoe .i').innerHTML = ICO.moeda;
    $('#bregras').innerHTML = ICO.evento;
    $('#bfer .fi').innerHTML = ICO.reliquia;
    iconesHUD = true;
  }
  const b = s.boss;
  $('#chefe').hidden = !b;
  if(b) $('#chefe').innerHTML = `<span class="pico" style="color:${b.cor}">${ICO_CHEFE[b.id]||''}</span>`
    + `<b>${esc(b.nome)}</b><span>${esc(b.regra)}</span>`;
  $('#onde').textContent = `M${run.mundo+1} · sala ${run.indice+1}`
    + (run.tipoSala()==='elite' ? ' · elite' : '');
  mesa(true, true);
  medidores();
}

let ptsAnterior = 0, focoAnterior = null;
function medidores(){
  const s = run.sala || salaViva; if(!s) return;
  if(s.pontos !== ptsAnterior){
    $('#pts').classList.remove('up'); void $('#pts').offsetWidth;
    $('#pts').classList.add('up');
    ptsAnterior = s.pontos;
  }
  $('#pts').textContent = nf(s.pontos);
  $('#meta').textContent = '/ ' + nf(s.meta);
  const pc = Math.min(100, s.pontos/s.meta*100);
  $('#barra').querySelector('i').style.width = pc.toFixed(1)+'%';
  $('#barra').classList.toggle('cheia', pc>=100);

  const v = $('#mvir'); v.querySelector('.v').textContent = s.viradas;
  v.classList.toggle('al', s.viradas<=3);
  $('#mmoe').querySelector('.v').textContent = s.moedas;

  const f = $('#mfoc'); f.classList.toggle('al', s.foco<=1);
  const perdeu = focoAnterior !== null && s.foco < focoAnterior;
  const teto = Math.max(s.focoMax, s.foco);
  /* acima de sete, bolinha vira número: onze bolinhas empurravam o resto da
     fila de medidores para uma segunda linha e comiam a mesa */
  f.querySelector('.focos').innerHTML = teto > 7
    ? `<span class="v num" style="color:${s.foco<=1?'var(--perigo)':'inherit'}">${s.foco}<span
        style="color:var(--txt3);font-size:11px">/${teto}</span></span>`
    : [...Array(teto)].map((_,i)=>
        `<b class="${i < s.foco ? '' : 'off'}${perdeu && i===s.foco ? ' perdeu':''}"></b>`).join('');
  focoAnterior = s.foco;

  const d = degrauCombo(s.combo), c = $('#combo');
  c.style.setProperty('--cc', corDoCombo(s.combo));
  c.classList.toggle('viva', s.combo>0);
  c.querySelector('.n').textContent = s.combo ? d.nome : 'sem combo';
  c.querySelector('.m').textContent = '×' + vg(s.multCombo().toFixed(1));

  const fer = run.C.ferramenta, bf = $('#bfer');
  const pode = fer.custoEssencia ? s.essencia >= fer.custoEssencia : s.usosFer > 0;
  bf.disabled = !pode || travado;
  bf.classList.toggle('pronta', pode && !travado);
  bf.classList.toggle('armada', !!alvoPendente);
  bf.querySelector('.nm').textContent = alvoPendente ? 'toque o alvo…' : fer.nome;
  bf.querySelector('.u').textContent = fer.custoEssencia
    ? `${s.essencia}/${fer.custoEssencia} essência` : `${s.usosFer}×`;

  const rq = $('#relq');
  if(rq.children.length !== run.reliquias.length){
    rq.innerHTML = run.reliquias.map((id,i)=>{
      const r = POR_ID[id];
      return `<b data-rel="${id}" class="${i===run.reliquias.length-1?'nova':''}"
        style="color:${RARIDADE[r.r]}" title="${esc(r.nome)}">${ICO.reliquia}</b>`;
    }).join('');
    rq.querySelectorAll('[data-rel]').forEach(e=>e.onclick = ()=>{
      SFX.clique();
      ficha(`<div class="rot">relíquia</div>` + fichaReliquia(e.dataset.rel));
    });
  }
}

/* --- a grade: o tamanho da carta sai da caixa que sobrou, nunca do palpite.
   E as COLUNAS saem do total de cartas, não das que restam — a grade é
   montada uma vez e não se mexe mais. --- */
function ajustar(){
  const s = run?.sala || salaViva; if(!s || telaAtual!=='sala') return;
  const area = $('#area'), mesaEl = $('#mesa');
  const cols = s.colunas, linhas = Math.ceil(s.cartas.length/cols);
  const g = cols>=8 ? 5 : 7;
  /* a folga é para a moldura da mesa: sem ela a carta do canto encosta na
     cantoneira e parece que o tabuleiro transbordou */
  const w = area.clientWidth  - 28;
  const h = area.clientHeight - 28;
  const cel = Math.max(22, Math.min(126, Math.floor(Math.min(
    (w - (cols-1)*g) / cols,
    (h - (linhas-1)*g) / linhas / 1.34))));
  mesaEl.style.setProperty('--cel', cel+'px');
  mesaEl.style.setProperty('--gap', g+'px');
  mesaEl.style.gridTemplateColumns = `repeat(${cols}, ${cel}px)`;
  mesaEl.style.setProperty('--r', Math.max(5, Math.round(cel*0.15))+'px');
  mesaEl.dataset.pequena = cel < 60 ? '1' : '';
}
addEventListener('resize', ajustar);

function cartaHTML(c, pequena){
  if(c.sumiu) return `<div class="vazio" data-v="${c.id}"></div>`;
  const f = FAMILIAS[c.fam], t = TIPOS[c.tipo];
  const cor = f ? f.cor : '#cfd6e4';
  const selos = [];
  /* o que o jogo JÁ te contou fica escrito na carta — nada de adivinhar */
  if(c.orfa)     selos.push('<span class="selo of">SEM PAR</span>');
  if(c.revelado) selos.push('<span class="selo mi">FALSA</span>');
  if(c.marcada)  selos.push('<span class="selo eg">FIXA</span>');
  if(c.pavio>0 && c.conhecida) selos.push(`<span class="selo pv">${c.pavio}</span>`);
  const frente = (!pequena && t.id!=='normal')
    ? `<span class="selo tp" style="color:${t.cor}">${esc(t.nome)}</span>` : '';
  const gelo = c.camadas>1 ? '<span class="selo pv" style="color:#9fd8ff">GELO</span>' : '';
  const selada = c.resolvida && !mostrando.has(c.id);
  const cls = ['ct', faceAberta(c)?'ab':'', c.marcada?'marc':'', selada?'feito':''];
  return `<button class="${cls.join(' ')}" data-c="${c.id}" style="--fc:${cor}"
      aria-label="carta ${c.pos+1}">
    <span class="fx">
      <span class="fr">${selos.join('')}</span>
      <span class="ff">${svgGlifo(c.fam, c.simbolo)}${frente}${gelo}
        ${selada ? `<span class="ok">${ICO.feito}</span>` : ''}</span>
    </span></button>`;
}

/* `refazer` reconstrói o HTML; `chegada` faz as cartas caírem uma a uma, e
   só vale ao abrir a sala. No meio da partida, refazer sem necessidade
   mataria a animação de virada bem quando ela mais importa. */
function mesa(refazer, chegada){
  const s = run.sala || salaViva; if(!s) return;
  const el = $('#mesa');
  ajustar();
  const peq = el.dataset.pequena === '1';
  const todas = s.porPos();
  const monta = ()=>{ el.innerHTML = todas.map(c=>cartaHTML(c, peq)).join(''); };
  if(refazer || el.children.length !== todas.length){
    monta();
    if(chegada) el.querySelectorAll('.ct').forEach((e,i)=>{
      e.classList.add('chega'); e.style.setProperty('--d', Math.min(650, i*16)+'ms');
      setTimeout(()=>e.classList.remove('chega'), 760 + i*16);
    });
  } else {
    for(const c of todas){
      const e = el.querySelector(`[data-c="${c.id}"], [data-v="${c.id}"]`);
      /* carta que deixou o tabuleiro vira casa vazia — aí precisa remontar */
      if(!e || (c.sumiu && e.classList.contains('ct'))){ monta(); break; }
      if(!e.classList.contains('ct')) continue;
      e.classList.toggle('ab', faceAberta(c));
      e.classList.toggle('marc', !!c.marcada);
      const selada = c.resolvida && !mostrando.has(c.id);
      if(selada && !e.classList.contains('feito')){
        e.classList.add('feito');
        const ff = e.querySelector('.ff');
        if(ff && !ff.querySelector('.ok'))
          ff.insertAdjacentHTML('beforeend', `<span class="ok">${ICO.feito}</span>`);
      }
    }
  }
  ajustar();
  ordenar();
}
/* o embaralho do chefe mexe em `pos`; a grade tem que seguir */
function ordenar(){
  const el = $('#mesa');
  (run.sala || salaViva).porPos().forEach((c,i)=>{
    const e = el.querySelector(`[data-c="${c.id}"], [data-v="${c.id}"]`);
    if(e) e.style.order = i;
  });
}

/* ═══════════════════ efeitos sobre a mesa ═══════════════════ */
function centro(id){
  const e = $('#mesa')?.querySelector(`[data-c="${id}"]`);
  const area = $('#area');
  if(!e || !area) return null;
  const r = e.getBoundingClientRect(), a = area.getBoundingClientRect();
  return { x: r.left - a.left + r.width/2, y: r.top - a.top + r.height/2,
           w: r.width, h: r.height };
}
function porElemento(el, ms){
  $('#area').appendChild(el);
  setTimeout(()=>el.remove(), ms);
}
/* anel de choque saindo da carta */
function onda(id, cor){
  const p = centro(id); if(!p) return;
  const e = document.createElement('div');
  e.className = 'onda';
  e.style.cssText = `left:${p.x}px;top:${p.y}px;--fc:${cor}`;
  porElemento(e, 720);
}
/* o feixe que liga as duas cartas do par: é ele que DIZ "estas duas" */
function raio(a, b, cor){
  const p = centro(a), q = centro(b);
  if(!p || !q) return;
  const dx = q.x-p.x, dy = q.y-p.y;
  const e = document.createElement('div');
  e.className = 'raio';
  e.style.cssText = `left:${p.x}px;top:${p.y}px;width:${Math.hypot(dx,dy)}px;`
    + `transform:rotate(${Math.atan2(dy,dx)}rad);--fc:${cor}`;
  porElemento(e, 620);
}
function faiscas(id, cor, n=10){
  const p = centro(id); if(!p) return;
  for(let i=0;i<n;i++){
    const a = (i/n)*Math.PI*2 + Math.random()*0.6;
    const d = 34 + Math.random()*46;
    const e = document.createElement('div');
    e.className = 'faisca';
    e.style.cssText = `left:${p.x}px;top:${p.y}px;--fc:${cor};`
      + `--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;`
      + `animation-delay:${(Math.random()*90).toFixed(0)}ms`;
    porElemento(e, 850);
  }
}
function voa(id, grande, pequeno='', cls=''){
  const p = centro(id); if(!p) return;
  const e = document.createElement('div');
  e.className = 'voa '+cls;
  e.style.cssText = `left:${p.x}px;top:${p.y}px`;
  e.innerHTML = `<span class="g">${esc(grande)}</span>`
    + (pequeno ? `<span class="x">${esc(pequeno)}</span>` : '');
  porElemento(e, 1100);
}

/* ═══════════════════ a jogada ═══════════════════ */
async function tocarCarta(id){
  if(travado || !run?.sala) return;
  /* com ferramenta armada, o toque é MIRA e não virada. Sem esse desvio o
     jogador armaria a Mão Leve e viraria a carta sem querer. */
  if(alvoPendente){
    const p = alvoPendente;
    if(!p.ids.includes(id)) p.ids.push(id);
    piscar(id);
    if(p.ids.length >= (p.f.id==='trocar' ? 2 : 1)){
      alvoPendente = null;
      await aplicarFerramenta(p.f.id==='trocar' ? p.ids : p.ids[0]);
    } else medidores();
    return;
  }
  const s = run.sala;
  salaViva = s;
  const c = s.cartas.find(x=>x.id===id);
  if(!c || c.resolvida || c.virada) return;

  acordar();
  const primeira = s.abertas.length === 0;
  const rel = run.virar(id);
  if(rel.erro) return;
  SFX.virar();
  mostrando.add(id);
  mesa(false);
  if(primeira){ medidores(); return; }

  travado = true;
  $('#bfer').disabled = true;
  await animar(rel);
  travado = false;
  medidores();
  if(!run.sala){ await espera(360); seguir(); }
}

/* ───────── a coreografia da tentativa ─────────
   três tempos, e nenhum deles pode ser cortado:
     VER      — as duas cartas ficam abertas, paradas, tempo de ler
     RECONHECER — elas se acendem, se ligam por um feixe, o ponto sobe
     SELAR / DEVOLVER — o par vira carta gasta, ou as duas voltam    */
async function animar(rel){
  const s = salaViva;
  const ev = e => rel.eventos.find(x=>x.e===e);
  const acerto = ev('acerto'), erro = ev('erro'), trinca = ev('trincou');
  const el = id => $('#mesa')?.querySelector(`[data-c="${id}"]`);
  const corDe = id => FAMILIAS[s.cartas.find(c=>c.id===id)?.fam]?.cor || '#fff';

  /* ① VER — o par fica aberto e quieto. Este meio segundo é o jogo inteiro:
     sem ele, o motor resolve e a tela apaga antes de alguém enxergar. */
  await espera(560);

  if(trinca){
    SFX.trinca();
    for(const id of trinca.cartas){
      el(id)?.classList.add('trinca');
      onda(id, '#9fd8ff');
      setTimeout(()=>el(id)?.classList.remove('trinca'), 560);
    }
    voa(trinca.cartas[0], 'TRINCOU', 'falta mais uma', 'frio');
    await espera(520);
    mostrando.clear(); mesa(false);
  }

  if(acerto){
    const [a,b] = acerto.cartas;
    const cor = corDe(a);
    SFX.acerto(acerto.combo);

    /* ② RECONHECER */
    for(const id of acerto.cartas) el(id)?.classList.add('par');
    raio(a, b, cor);
    for(const id of acerto.cartas){ onda(id, cor); faiscas(id, cor, 9); }
    const d = degrauCombo(acerto.combo);
    voa(a, '+'+nf(acerto.pontos),
        acerto.combo>1 ? `${d.nome} ×${vg((rel.mult ?? d.mult).toFixed(1))}` : '');
    $('#combo').classList.remove('sobe'); void $('#combo').offsetWidth;
    $('#combo').classList.add('sobe');
    medidores();
    /* degrau novo é acontecimento: clarão na tela inteira */
    if(acerto.combo>=2 && d.n===acerto.combo){
      clarao(corDoCombo(acerto.combo)+'55');
      aviso(d.nome, 'combo ×'+vg(d.mult.toFixed(1)), corDoCombo(acerto.combo));
    }
    await espera(560);

    /* ③ SELAR — o par não some, fica carimbado no lugar */
    for(const id of acerto.cartas){
      const e = el(id);
      if(e){ e.classList.remove('par'); e.classList.add('selando'); }
    }
    await espera(420);
    mostrando.clear();
    mesa(false);
    for(const id of acerto.cartas) el(id)?.classList.remove('selando');
  }

  if(erro){
    SFX.erro();
    for(const id of erro.cartas){
      const e = el(id);
      if(e){ e.classList.add('nao'); setTimeout(()=>e.classList.remove('nao'), 560); }
    }
    if(erro.custo>0){
      voa(erro.cartas[0], '−'+erro.custo, 'de foco', 'ruim');
      clarao('rgba(255,106,90,.34)');
    } else {
      voa(erro.cartas[0], 'DESCOBERTA', 'não custa foco', 'frio');
    }
    medidores();
    await espera(620);
    mostrando.clear();
    mesa(false);
  }

  /* o resto dos eventos, na ordem em que o motor os produziu */
  const saindo = [];
  for(const e of rel.eventos){
    if(e.e==='moedas'){ SFX.moeda(); voa(acerto?.cartas?.[0] ?? 0, '+'+e.n, 'moedas', 'moeda'); }
    if(e.e==='virada_extra') aviso('+1 VIRADA', 'alquimia devolveu', '#8ad46a');
    if(e.e==='xadrez') aviso('DOBRADO', 'peça de xadrez', '#d8d8e8');
    if(e.e==='runa') voa(acerto?.cartas?.[1] ?? 0, '+0,1', 'runa', 'moeda');
    if(e.e==='revelou'){ SFX.revelar(); for(const id of (e.cartas||[])) piscar(id); }
    if(e.e==='marcou'){ SFX.revelar(); aviso('CARTA FIXA', 'o Egito marcou uma', '#f0c14b'); }
    if(e.e==='explodiu'){ SFX.chefe(); clarao('rgba(255,106,90,.5)');
      aviso('EXPLODIU', 'a bomba levou o par', '#ff6a5a');
      for(const id of (e.cartas||[])){ faiscas(id, '#ff6a5a', 14); saindo.push(id); } }
    if(e.e==='camaleao'){ aviso('TROCOU', 'o camaleão mudou de símbolo', '#7ee3a8');
      for(const id of (e.cartas||[])) onda(id, '#7ee3a8'); }
    if(e.e==='embaralhou' || e.e==='espaco'){ SFX.chefe(); aviso('EMBARALHOU', 'trocaram de lugar', '#b06bff'); }
    if(e.e==='espelhou'){ SFX.chefe(); clarao('rgba(216,216,232,.34)'); aviso('ESPELHOU', 'o lado trocou', '#d8d8e8'); }
    if(e.e==='esqueceu'){ SFX.chefe(); aviso('ESQUECEU', 'o chefe apagou uma carta', '#e05a8a'); }
    if(e.e==='sumiu'){ SFX.chefe(); clarao('rgba(127,212,255,.34)');
      aviso('SUMIU', 'um par deixou o tabuleiro', '#7fd4ff');
      for(const id of (e.cartas||[])) saindo.push(id); }
    if(e.e==='orfa') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='mimic'){ aviso('MIMIC', 'era cópia', '#e05a8a');
      for(const id of (e.cartas ? e.cartas : [e.carta])) if(id!=null) onda(id, '#e05a8a'); }
  }
  /* o que realmente deixa o tabuleiro sai com estrondo, e deixa a casa vazia */
  if(saindo.length){
    for(const id of saindo) el(id)?.classList.add('sai');
    await espera(560);
    mostrando.clear();
    mesa(true);
  }

  mostrando.clear();
  mesa(false);

  if(rel.eventos.some(e=>e.e==='vitoria')){
    SFX.vitoria(); clarao('rgba(102,230,166,.5)');
    aviso('SALA VENCIDA', 'meta batida', '#66e6a6');
    await espera(900);
  }
  if(rel.eventos.some(e=>e.e==='derrota')){
    const m = rel.eventos.find(e=>e.e==='derrota').motivo;
    SFX.derrota(); clarao('rgba(255,106,90,.55)');
    aviso('SALA PERDIDA', m==='foco' ? 'acabou o foco'
        : m==='viradas' ? 'acabaram as viradas' : 'acabaram as cartas', '#ff6a5a');
    await espera(1000);
  }
}
function piscar(id){
  const e = $('#mesa')?.querySelector(`[data-c="${id}"]`);
  if(!e) return;
  e.classList.add('pisca');
  setTimeout(()=>e.classList.remove('pisca'), 2500);
}

$('#mesa').addEventListener('click', e=>{
  const b = e.target.closest('[data-c]');
  if(b) tocarCarta(Number(b.dataset.c));
});

/* ═══════════════════ ferramenta ═══════════════════ */
$('#bfer').onclick = async ()=>{
  if(travado || !run?.sala) return;
  salaViva = run.sala;
  const f = run.C.ferramenta;
  acordar(); SFX.clique();
  if(f.id==='trocar' || f.id==='curinga') return armar(f);
  if(f.id==='varrer')   return escolherDeLista(f, 'tipo');
  if(f.id==='analisar') return escolherDeLista(f, 'fam');
  aplicarFerramenta(undefined);
};
function armar(f){
  alvoPendente = { f, ids:[] };
  medidores();
  aviso(f.id==='trocar' ? 'TOQUE 2 CARTAS' : 'TOQUE 1 CARTA', esc(f.nome));
}
async function aplicarFerramenta(arg){
  const rel = run.usarFerramenta(arg);
  if(rel.erro){ aviso('NÃO DÁ', rel.por || rel.erro, '#ff6a5a'); medidores(); return; }
  SFX.revelar();
  for(const e of rel.eventos){
    if(e.e==='revelou') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='voltou') aviso('DESFEITO', 'o último erro voltou', '#b06bff');
    if(e.e==='transmutou'){ aviso('TRANSMUTADO', 'virou espelho', '#d8d8e8'); onda(e.carta,'#d8d8e8'); }
    if(e.e==='concentrou') aviso('CONCENTRAÇÃO', 'multiplicador dobrado', '#efb54b');
    if(e.e==='trocou'){ aviso('TROCADO', 'mudaram de lugar', '#7ee3a8');
      for(const id of (e.cartas||[])) onda(id, '#7ee3a8'); }
    if(e.e==='acerto'){ SFX.acerto(e.combo);
      const cor = FAMILIAS[salaViva?.cartas.find(c=>c.id===e.cartas[0])?.fam]?.cor || '#fff';
      for(const id of e.cartas){ onda(id, cor); faiscas(id, cor, 8); }
      voa(e.cartas[0], '+'+nf(e.pontos), 'escavado'); }
  }
  mesa(false); medidores();
  if(!run.sala){ await espera(420); seguir(); }
}
function escolherDeLista(f, campo){
  const s = run.sala; if(!s) return;
  const chaves = [...new Set(s.fechadas().map(c=>campo==='tipo'?c.tipo:c.fam))];
  ficha(`<div class="rot">${esc(f.nome)}</div>
    <h3 class="tit" style="margin:3px 0 11px">Revelar o quê?</h3>
    <div class="grade">${chaves.map(k=>{
      const o = campo==='tipo' ? TIPOS[k] : FAMILIAS[k];
      const ic = campo==='tipo' ? (ICO[k]||ICO.normal) : svgGlifo(k, 0, 'gl');
      return `<button class="op esc" data-esc="${k}" style="--fc:${o.cor}">
        <span class="gf" style="color:${o.cor}">${ic}</span>
        <h3 style="color:${o.cor}">${esc(o.nome)}</h3>
        <p>${esc(campo==='tipo' ? o.d : o.regra)}</p></button>`;
    }).join('')}</div>`);
  $('#folhac').querySelectorAll('[data-esc]').forEach(b=>b.onclick = ()=>{
    $('#folha').classList.remove('on');
    aplicarFerramenta(b.dataset.esc);
  });
}

$('#bregras').onclick = ()=>{
  const s = run?.sala; if(!s) return;
  SFX.clique();
  const tipos = [...new Set(s.emJogo().map(c=>c.tipo))].map(t=>TIPOS[t]);
  ficha(`
    <div class="rot">o que vale nesta sala</div>
    <h3 class="tit" style="margin:3px 0 11px">${s.pares} pares · meta ${nf(s.meta)}</h3>
    ${s.boss ? `<div class="verb"><div class="em" style="color:${s.boss.cor}">${ICO_CHEFE[s.boss.id]||''}</div>
      <div><h4 style="color:${s.boss.cor}">${esc(s.boss.nome)}</h4>
      <p>${esc(s.boss.regra)}</p>
      <p style="color:var(--txt3);margin-top:4px;font-style:italic">${esc(s.boss.dica)}</p></div></div>` : ''}
    <div class="rot" style="margin:13px 0 4px">famílias no tabuleiro</div>
    ${s.familias.map(fichaFamilia).join('')}
    <div class="rot" style="margin:13px 0 4px">cartas que apareceram</div>
    ${tipos.map(fichaTipo).join('')}
    <div class="rot" style="margin:13px 0 4px">a escada do combo</div>
    ${COMBOS.slice(1).map((c,i)=>verbete(ICO.combo, esc(c.nome),
      `${c.n} acerto${c.n>1?'s':''} seguido${c.n>1?'s':''} sem errar.`,
      `<span class="tag" style="color:${COR_COMBO[i+1]}">×${vg(c.mult.toFixed(1))}</span>`)).join('')}`);
};

/* ═══════════════════════════════════════════ RECOMPENSA / TESOURO */
function telaPremio(){
  const tesouro = run.tipoSala()==='tesouro' && !run.aguardandoPremio;
  const ofertas = run.premios();
  const u = run.ultimaSala;
  SFX.premio();
  $('#t-premio').innerHTML = `
    <div class="topo-linha"><div class="cabeca">
      <div class="rot">${tesouro ? 'tesouro' : 'sala vencida'}</div>
      <h2 class="tit">${tesouro ? 'Alguém deixou isto aqui.' : 'Pegue uma para levar.'}</h2>
    </div></div>
    ${u && !tesouro ? `<div class="op esc" style="--fc:var(--ouro);cursor:default;margin-bottom:10px">
      <div class="stats">
        <span>pontos <b style="color:var(--ouro)">${nf(u.pontos)}</b></span>
        ${u.sobra>0 ? `<span>viradas de sobra <b>${u.sobra}</b></span>` : ''}
        ${u.extra ? `<span>bônus <b>+${u.extra} moedas</b></span>` : ''}
      </div></div>` : ''}
    <div class="rol"><div class="grade">
      ${ofertas.length ? ofertas.map((r,i)=>`
        <button class="op esc ${r.r!=='comum'?'brilha':''}" data-pega="${r.id}"
                style="--fc:${RARIDADE[r.r]};animation-delay:${i*70}ms">
          ${r.r==='lendaria' ? '<span class="fita">lendária</span>' : ''}
          <span class="agua">${ICO.reliquia}</span>
          <span class="gf" style="color:${RARIDADE[r.r]}">${ICO.reliquia}</span>
          <h3 style="color:${RARIDADE[r.r]}">${esc(r.nome)}</h3>
          <p>${esc(r.d)}</p>
          <div class="pr" style="color:${RARIDADE[r.r]}">${r.r}</div>
        </button>`).join('')
        : '<p class="mini">Não sobrou relíquia nenhuma para oferecer.</p>'}
    </div></div>
    <div class="pe"><button class="bt g" id="pular">SEGUIR SEM PEGAR</button></div>`;
  $$('#t-premio [data-pega]').forEach(b=>b.onclick = ()=>{
    SFX.premio(); clarao('rgba(239,181,75,.4)');
    if(run.ganharReliquia(b.dataset.pega)){ run.passar(); seguir(); }
    else aviso('NÃO DEU', 'essa não está na oferta', '#ff6a5a');
  });
  $('#pular').onclick = ()=>{ SFX.clique(); run.passar(); seguir(); };
}

/* ═══════════════════════════════════════════ LOJA */
function telaLoja(){
  const t = $('#t-loja');
  const desenhar = ()=>{
    t.innerHTML = `
      <div class="topo-linha"><div class="cabeca">
        <div class="rot">loja · mundo ${run.mundo+1}</div>
        <h2 class="tit">Você tem <span style="color:var(--ouro)">${nf(run.moedas)}</span> moedas.</h2>
      </div></div>
      <div class="rol"><div class="grade">
        ${run.loja().map(i=>{
          const cor = RARIDADE[i.r] || 'var(--ouro)';
          const caro = !i.vendido && run.moedas < i.preco;
          return `
          <button class="op esc ${i.r==='lendaria'?'brilha':''}" data-compra="${i.id}"
            style="--fc:${cor}" ${i.vendido || caro ? 'disabled' : ''}>
            ${i.vendido ? '<span class="vendido">vendido</span>' : ''}
            <span class="agua">${i.id.startsWith('__') ? ICO.tesouro : ICO.reliquia}</span>
            <span class="gf" style="color:${cor}">${i.id.startsWith('__') ? ICO.tesouro : ICO.reliquia}</span>
            <h3 style="color:${cor}">${esc(i.nome)}</h3>
            <p>${esc(i.d)}</p>
            <div class="pr" style="color:${caro ? 'var(--txt3)' : 'var(--ouro)'}">
              ${ICO.moeda}${nf(i.preco)}</div>
          </button>`;
        }).join('')}
      </div></div>
      <div class="pe"><button class="bt p g" id="sair">SAIR DA LOJA</button></div>`;
    t.querySelectorAll('[data-compra]').forEach(b=>b.onclick = ()=>{
      const r = run.comprar(b.dataset.compra);
      if(r.ok){ SFX.moeda(); aviso('COMPRADO', esc(r.item.nome)); desenhar(); }
      else aviso('NÃO DÁ', r.por, '#ff6a5a');
    });
    $('#sair').onclick = ()=>{ SFX.clique(); run.passar(); seguir(); };
  };
  desenhar();
}

/* ═══════════════════════════════════════════ EVENTO / FOGUEIRA */
function telaEvento(){
  const t = $('#t-evento');
  const ev = run.evento();
  if(!ev){ run.passar(); return seguir(); }
  const fogo = run.tipoSala()==='descanso';
  const cor = fogo ? '#ffa24d' : '#7fd4ff';
  t.innerHTML = `
    <div class="topo-linha"><div class="cabeca">
      <div class="rot" style="color:${cor}">${fogo ? 'fogueira' : 'evento'}</div>
      <h2 class="tit">${esc(ev.nome)}</h2>
    </div></div>
    <div class="rol">
      <div class="op esc" style="--fc:${cor};cursor:default">
        <span class="agua">${fogo ? ICO.fogueira : ICO.evento}</span>
        <p style="font-size:14.5px;line-height:1.6;color:var(--txt)">${esc(ev.txt)}</p>
      </div>
      <div class="hr"></div>
      <div class="grade um">${ev.ops.map((o,i)=>`
        <button class="op esc" data-op="${i}" style="--fc:${cor}">
          <h3>${esc(o.txt)}</h3><p>${esc(o.d)}</p></button>`).join('')}</div>
    </div>`;
  t.querySelectorAll('[data-op]').forEach(b=>b.onclick = ()=>{
    const r = run.escolher(Number(b.dataset.op));
    SFX.premio();
    if(r.ok){
      t.querySelector('.rol').innerHTML =
        `<div class="op esc" style="--fc:${cor};cursor:default">
           <p style="font-size:15px;line-height:1.6;color:var(--txt)">${esc(r.txt)}</p></div>`;
      setTimeout(()=>seguir(), 1500);
    }
  });
}

/* ═══════════════════════════════════════════ FIM */
function telaFim(){
  const p = run.placar();
  const venceu = run.venceu;
  const u = run.ultimaSala;
  (venceu ? SFX.vitoria : SFX.derrota)();
  clarao(venceu ? 'rgba(102,230,166,.4)' : 'rgba(255,106,90,.4)');
  const cor = venceu ? 'var(--bom)' : 'var(--perigo)';
  $('#t-fim').innerHTML = `
    <div class="rol" style="display:flex;flex-direction:column;justify-content:center">
      <div class="selao" style="color:${cor};align-self:flex-start">
        ${venceu ? ICO.meta : ICO.recusa}${venceu ? 'run completa' : 'a run acabou'}</div>
      <h2 class="grandao" style="color:${cor};margin-top:11px">
        ${venceu ? 'VOCÊ LEMBROU' : 'VOCÊ ESQUECEU'}</h2>
      <p class="sub">${venceu
        ? `Seis mundos, ${p.est.salas} salas vencidas.`
        : `Caiu no mundo ${run.mundo+1}, sala ${run.indice+1}`
          + (u?.motivo==='foco' ? ' — o foco acabou.'
           : u?.motivo==='viradas' ? ' — as viradas acabaram.'
           : u?.motivo==='tabuleiro' ? ' — o tabuleiro acabou antes da meta.' : '.')}</p>
      <div class="hr"></div>
      <div class="pts num" style="font-size:clamp(38px,13vw,60px)">${nf(p.pontos)}</div>
      <div class="rot">pontos da run</div>
      <div class="hr"></div>
      <dl class="tabnum">
        <dt>Classe</dt><dd>${esc(run.C.nome)}</dd>
        <dt>Salas vencidas</dt><dd>${p.est.salas}</dd>
        <dt>Pares fechados</dt><dd>${p.est.acertos}</dd>
        <dt>Erros</dt><dd>${p.est.erros}</dd>
        <dt>Maior combo</dt><dd>${p.est.maiorCombo} · ${esc(degrauCombo(p.est.maiorCombo).nome)}</dd>
        <dt>Moedas ganhas</dt><dd>${nf(p.est.moedasGanhas)}</dd>
        <dt>Semente</dt><dd style="font-size:11px;font-weight:700">${esc(p.semente)}</dd>
      </dl>
      ${p.reliquias.length ? `<div class="hr"></div>
        <div class="rot" style="margin-bottom:5px">o que você juntou</div>
        ${p.reliquias.map(fichaReliquia).join('')}` : ''}
    </div>
    <div class="pe">
      <button class="bt p g" id="enviar">MANDAR PARA O RANKING</button>
      <div style="display:flex;gap:8px">
        <button class="bt g" data-ir="classe">OUTRA RUN</button>
        <button class="bt g" data-ir="titulo">MENU</button>
      </div>
    </div>`;
  $('#enviar').onclick = ()=>enviarPlacar($('#enviar'));
}

async function enviarPlacar(bt){
  const nome = (localStorage.getItem('mnemonic.nome') || '').trim()
    || (prompt('Como você quer aparecer no ranking?', '') || '').trim();
  if(!nome) return;
  localStorage.setItem('mnemonic.nome', nome.slice(0,22));
  bt.disabled = true; bt.textContent = 'MANDANDO…';
  try {
    const r = await RANK.publicar(run.pacote(), nome.slice(0,22));
    bt.textContent = r.ok ? `PUBLICADO EM ${r.relays} RELAYS` : 'NÃO DEU — TENTE DE NOVO';
    if(r.ok) setTimeout(()=>{ abaRank = run.diario ? 'diario' : 'mundial'; ir('rank'); }, 900);
    else bt.disabled = false;
  } catch(e){ bt.textContent = 'SEM CONEXÃO'; bt.disabled = false; }
}

/* ═══════════════════════════════════════════ RANKING */
const ABAS = [
  { id:'mundial', n:'Mundial' }, { id:'diario', n:'Diário' },
  { id:'semana', n:'Semana' },   { id:'mes', n:'Mês' },
  { id:'classe', n:'Por classe' },
];
function telaRank(){
  const t = $('#t-rank');
  t.innerHTML = `
    <div class="topo-linha">
      <button class="bt pq" data-ir="titulo">VOLTAR</button>
      <div class="cabeca"><div class="rot">ranking</div>
        <h2 class="tit">Quem lembrou mais</h2></div>
    </div>
    <div class="abas">${ABAS.map(a=>
      `<button data-aba="${a.id}" class="${a.id===abaRank?'on':''}">${a.n}</button>`).join('')}</div>
    <div class="rol" id="rlista"><p class="mini">Procurando nos relays…</p></div>
    <p class="mini" style="flex:0 0 auto;padding-top:9px;border-top:1px solid var(--borda)">
      Cada placar vem com a lista de jogadas. Seu aparelho REFAZ a run a
      partir da semente e só mostra a linha se o número bater.</p>`;
  t.querySelectorAll('[data-aba]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); abaRank = b.dataset.aba; telaRank();
  });
  carregarRank();
}

async function carregarRank(){
  const alvo = $('#rlista'); if(!alvo) return;
  let linhas = [];
  try { linhas = await RANK.buscar({ aba:abaRank, semente:semeanteDoDia() }); }
  catch(e){ alvo.innerHTML = `<p class="mini">Não deu para falar com os relays.
    Verifique a conexão e tente de novo.</p>`; return; }
  if(!$('#t-rank').classList.contains('on')) return;

  /* AQUI mora o anti-cheat: nada entra na lista sem ser recalculado */
  const bons = [];
  for(const l of linhas) if(verificar(l.placar, l.registro).ok) bons.push(l);
  bons.sort((a,b)=>b.placar.pontos - a.placar.pontos);
  const eu = localStorage.getItem('mnemonic.nome');
  alvo.innerHTML = bons.length ? bons.slice(0,60).map((l,i)=>`
    <div class="lin ${l.nome===eu?'eu':''}">
      <div class="pos num">${i+1}</div>
      <div class="qm">${esc(l.nome)}
        ${l.placar.venceu?'<span class="sel" style="color:var(--bom)">completou</span>':''}
        <small>${esc(CLASSES[l.placar.classe]?.nome||l.placar.classe)}
          · mundo ${l.placar.mundo+1} · ${l.placar.est?.salas??0} salas</small></div>
      <div class="pt num">${nf(l.placar.pontos)}</div>
    </div>`).join('')
    : `<p class="mini">Nenhum placar conferido ainda nesta aba.
       ${linhas.length ? `(${linhas.length} chegaram, e nenhum bateu com as próprias jogadas.)` : ''}</p>`;
}

/* ═══════════════════════════════════════════ COMO SE JOGA */
const CAPITULOS = [
  { id:'basico', n:'O básico', html:()=>`
    <p class="sub">Mnemonic é um jogo da memória em que o tabuleiro tem regras
    e a regra muda a cada sala.</p>
    ${verbete(ICO.meta, 'Você não limpa o tabuleiro — você bate a META',
      'A sala é vencida ao chegar na meta de pontos. Limpar tudo é só o jeito '
      +'mais comum de chegar lá, e nas salas grandes nem sempre dá tempo.')}
    ${verbete(ICO.virada, 'VIRADA é o relógio',
      'Cada tentativa (duas cartas) gasta uma virada. Quando acabam e a meta '
      +'não foi batida, a run acaba.')}
    ${verbete(ICO.foco, 'FOCO é quantas vezes você pode esquecer',
      'Errar duas cartas que você NUNCA tinha visto não custa nada: é '
      +'exploração, e exploração é obrigatória. Errar duas cartas que você já '
      +'conhecia custa 1 de Foco. Zerou o Foco, perdeu a sala.')}
    ${verbete(ICO.combo, 'COMBO é onde mora o placar',
      'Acertos seguidos multiplicam tudo. Dois pares separados valem muito '
      +'menos que dois pares emendados — é por isso que vale arriscar.')}
    ${verbete(ICO.feito, 'O par fechado FICA no tabuleiro',
      'Ele apaga e ganha um carimbo, mas não sai do lugar. Assim a grade '
      +'nunca se remexe e você não perde de vista o que já decorou.')}`},
  { id:'memoria', n:'Vista e conhecida', html:()=>`
    <p class="sub">Duas palavras que o jogo usa o tempo todo e que não querem
    dizer a mesma coisa.</p>
    ${verbete(ICO.vista, 'VISTA', 'A carta está aparecendo AGORA. Ela some no '
      +'fim da tentativa. Algumas relíquias esticam esse prazo.')}
    ${verbete(ICO.conhecida, 'CONHECIDA', 'Você já viu essa carta alguma vez. '
      +'Isso não se apaga nunca, e é o que decide se o erro custa Foco.')}
    <p class="mini">É por isso que o Fantasma dói: ele apaga a VISTA e deixa a
    CONHECIDA. Some da tela e continua sendo sua obrigação lembrar.</p>
    ${verbete(ICO.orfa, 'SEM PAR', 'Quando um Espelho fecha com uma carta '
      +'comum, a dupla dela fica sem par — e passa a fechar com qualquer outra '
      +'carta sem par. Cartas saem sempre de duas em duas, então nunca sobra '
      +'uma sozinha.')}`},
  { id:'cartas', n:'As cartas', html:()=>LISTA_TIPOS.map(fichaTipo).join('') },
  { id:'familias', n:'As famílias', html:()=>
    `<p class="sub">Cada sala sorteia duas ou três. A família manda em uma
     regra do tabuleiro inteiro.</p>` + LISTA_FAMILIAS.map(fichaFamilia).join('') },
  { id:'classes', n:'As classes', html:()=>LISTA_CLASSES.map(c=>
    verbete(`<span style="color:${c.cor}">${ICO_CLASSE[c.id]||''}</span>`,
      esc(c.nome), esc(c.d)+'<br><b style="color:'+c.cor+'">'+esc(c.ferramenta.nome)
      +'</b> — '+esc(c.ferramenta.d))).join('') },
  { id:'chefes', n:'Os chefes', html:()=>
    `<p class="sub">Um por mundo, sempre na última sala. Cada um apaga a
     resposta que servia até ali.</p>` + LISTA_BOSSES.map(b=>
    verbete(`<span style="color:${b.cor}">${ICO_CHEFE[b.id]||''}</span>`,
      esc(b.nome), esc(b.regra)+'<br><i style="color:var(--txt3)">'+esc(b.dica)+'</i>')).join('') },
  { id:'reliquias', n:'As relíquias', html:()=>
    ['lendaria','rara','comum'].map(r=>
      `<div class="rot" style="margin:13px 0 4px;color:${RARIDADE[r]}">${r}</div>`
      + RELIQUIAS.filter(x=>x.r===r).map(x=>fichaReliquia(x.id)).join('')).join('') },
  { id:'combo', n:'A escada do combo', html:()=>
    `<p class="sub">Quantos pares seguidos, e por quanto multiplica.</p>`
    + COMBOS.slice(1).map((c,i)=>verbete(ICO.combo, esc(c.nome),
        `${c.n} acerto${c.n>1?'s':''} seguido${c.n>1?'s':''} sem errar.`,
        `<span class="tag" style="color:${COR_COMBO[i+1]}">×${vg(c.mult.toFixed(1))}</span>`)).join('') },
  { id:'ranking', n:'O ranking', html:()=>`
    <p class="sub">Não existe servidor. E mesmo assim não adianta trapacear.</p>
    ${verbete(ICO.semente, 'Tudo nasce de uma SEMENTE',
      'O tabuleiro, o mapa, as relíquias oferecidas, o chefe: tudo é sorteado '
      +'a partir de um número. A mesma semente monta a mesma run em qualquer '
      +'aparelho. É isso que faz a run diária ser a mesma para todo mundo.')}
    ${verbete(ICO.prova, 'O placar vem com a prova',
      'Quando você publica, sobe junto a lista inteira das suas jogadas. '
      +'Quem abre o ranking REFAZ a sua run a partir da semente e confere se '
      +'chega no mesmo número.')}
    ${verbete(ICO.recusa, 'Placar que não bate não aparece',
      'Inflar a pontuação, dizer que venceu, apagar as últimas jogadas, pegar '
      +'uma relíquia que não foi oferecida, comprar sem moeda: nada disso '
      +'sobrevive ao recálculo. A linha simplesmente não é mostrada.')}` },
];
let capAtual = 'basico';
function telaLivro(){
  const c = CAPITULOS.find(x=>x.id===capAtual) || CAPITULOS[0];
  $('#t-livro').innerHTML = `
    <div class="topo-linha">
      <button class="bt pq" id="voltarLivro">VOLTAR</button>
      <div class="cabeca"><div class="rot">como se joga</div>
        <h2 class="tit">${esc(c.n)}</h2></div>
    </div>
    <div class="abas">${CAPITULOS.map(x=>
      `<button data-cap="${x.id}" class="${x.id===capAtual?'on':''}">${esc(x.n)}</button>`).join('')}</div>
    <div class="rol">${c.html()}</div>`;
  $$('#t-livro [data-cap]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); capAtual = b.dataset.cap; telaLivro();
  });
  $('#voltarLivro').onclick = ()=>{ SFX.clique(); run ? seguir() : ir('titulo'); };
}

/* ═══════════════════════════════════════════ salvar e retomar */
const CHAVE = 'mnemonic.run';
function salvar(){
  if(!run || run.acabou()) return localStorage.removeItem(CHAVE);
  try {
    localStorage.setItem(CHAVE, JSON.stringify({
      semente:run.semente, classe:run.classeId, diario:run.diario,
      registro:run.registro }));
  } catch(e){}
}
/* retomar usa o MESMO caminho do verificador do ranking: refazer a run a
   partir das jogadas. Um save que guardasse o estado direto seria um segundo
   jeito de descrever a partida, e dois jeitos acabam discordando. */
function retomar(){
  let d; try { d = JSON.parse(localStorage.getItem(CHAVE)||'null'); } catch(e){}
  if(!d?.registro?.length) return false;
  let r;
  try { r = new Run({ semente:d.semente, classe:d.classe, diario:d.diario }); }
  catch(e){ return false; }
  for(const j of d.registro){
    if(j.s==='sala') r.entrar();
    else if(j.s==='v') r.virar(j.c);
    else if(j.s==='f') r.usarFerramenta(j.a===null?undefined:j.a);
    else if(j.s==='rel') r.ganharReliquia(j.r);
    else if(j.s==='c') r.comprar(j.r);
    else if(j.s==='e') r.escolher(j.o);
    else if(j.s==='passa') r.passar();
  }
  if(r.acabou()) return false;
  run = r; mostrando = new Set();
  return true;
}
setInterval(salvar, 4000);
addEventListener('pagehide', salvar);
addEventListener('visibilitychange', ()=>{ if(document.hidden) salvar(); });

/* ═══════════════════════════════════════════ arranque */
if(retomar()){
  const b = document.createElement('button');
  b.className = 'bt p g'; b.textContent = 'CONTINUAR A RUN';
  b.onclick = ()=>{ acordar(); SFX.clique(); seguir(); };
  $('#t-titulo .menu').prepend(b);
  $('#t-titulo .menu .bt.p:not(:first-child)')?.classList.remove('p');
}
(function botaoSom(){
  const b = document.createElement('button');
  b.className = 'bt g';
  const pinta = ()=>{ b.textContent = estaMudo() ? 'SOM: DESLIGADO' : 'SOM: LIGADO'; };
  b.onclick = ()=>{ mudo(!estaMudo());
    localStorage.setItem('mnemonic.mudo', estaMudo()?'1':'0');
    if(!estaMudo()){ acordar(); SFX.clique(); } pinta(); };
  if(localStorage.getItem('mnemonic.mudo')==='1') mudo(true);
  pinta();
  $('#t-titulo .menu').appendChild(b);
})();
ir('titulo');

/* deixa o motor à mão no console — é assim que se investiga um bug de regra */
window.MN = { get run(){ return run; }, Run, verificar, planoDaSala, RANK };
