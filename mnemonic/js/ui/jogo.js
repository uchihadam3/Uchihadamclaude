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
import { Run, verificar, refazer, SALAS, MUNDOS, COMBATE, planoDaSala }
  from '../engine/run.js';
import { degrauCombo, COMBOS } from '../engine/tabuleiro.js';
import { TIPOS, LISTA_TIPOS } from '../data/cartas.js';
import { FAMILIAS, LISTA_FAMILIAS } from '../data/familias.js';
import { CLASSES, LISTA_CLASSES } from '../data/classes.js';
import { RELIQUIAS, POR_ID, RARIDADE } from '../data/reliquias.js';
import { LISTA_BOSSES } from '../data/bosses.js';
import { svgGlifo } from '../arte/glifos.js';
import { SFX, acordar, mudo, estaMudo } from './sfx.js';
import { trilha, abaixar, querMusica, temMusica, reavaliar } from './musica.js';
import * as MUSICA from './musica.js';
import { ICO, ICO_CLASSE, ICO_CHEFE, icoReliquia, MOLDURA_DO_TIPO } from './icones.js';
import { CAPITULOS, FAMILIA_DE_PECA, peca, PALAVRAS, COR_COMBO, corDoCombo }
  from './catalogo.js';
import * as RANK from '../net/ranking.js';
import { descobrir, viu, quantosViu, escondeCapitulo, apagarDescobertas }
  from './descobertas.js';
import { perfil, anotarRun, anotarPublicacao, taxaVitoria, apagarPerfil }
  from './perfil.js';
import { conferirConquistas, medalhasGanhas, temMedalha, apagarMedalhas }
  from './medalhas.js';

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

/* ═══════════════════════════════════════════ navegação */
function ir(nome){
  telaAtual = nome;
  $$('.tela').forEach(t=>t.classList.toggle('on', t.id === 't-'+nome));
  ({ classe:telaClasse, mapa:telaMapa, sala:pintarSala, premio:telaPremio,
     loja:telaLoja, evento:telaEvento, fim:telaFim, livro:telaLivro,
     rank:telaRank }[nome] || (()=>{}))();
  trilhaDaTela(nome);
}
/* QUAL MÚSICA CADA TELA PEDE.
   Fica aqui, num lugar só, pelo mesmo motivo que `seguir` decide sozinho para
   onde a run vai: duas telas discordando sobre qual música toca produz corte
   no meio do compasso, e corte de música é a coisa mais barata que um jogo
   pode fazer. Fora da partida é sempre o tema do menu — inclusive na tela do
   fim, que é onde ele finalmente faz sentido. */
function trilhaDaTela(nome){
  if(nome === 'sala' && run?.sala){
    /* a música do chefe segue o CHEFE, não o mundo. Hoje os dois andam
       juntos, mas a ordem dos chefes é uma lista à parte: se ela mudar, quem
       vier tocaria o tema errado — e tema de chefe trocado é a coisa que o
       jogador percebe antes de qualquer bug. */
    const b = run.sala.boss;
    if(!b) return trilha('mundo' + run.mundo);
    const i = Math.max(0, LISTA_BOSSES.findIndex(x => x.id === b.id));
    return trilha('chefe' + i);
  }
  if(run && !run.acabou() && (nome === 'mapa' || nome === 'premio'
     || nome === 'loja' || nome === 'evento'))
    return trilha('mundo' + run.mundo);
  trilha('menu');
}

/* leva a run para onde ela estiver: é o único lugar que decide isso, para
   não haver dois caminhos discordando sobre em que sala o jogador está */
/* O QUE A RUN ENCONTROU ATÉ AGORA.
   Podia estar espalhado em cinco lugares — prêmio, loja, evento, tesouro,
   relíquia inicial da classe — e cinco lugares é onde se esquece um. Aqui a
   coleção é sincronizada com o que a run REALMENTE tem, não importa por qual
   porta aquilo entrou. Chefe conta ao entrar na sala dele: encarar já é ter
   visto, e perder para ele não pode apagar isso. */
function colher(){
  if(!run) return;
  descobrir('reliquia', run.reliquias);
  descobrir('classe', run.classeId);
  if(run.sala?.boss) descobrir('chefe', run.sala.boss.id);
}

function seguir(){
  colher();
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
/* O GOLPE DO CHEFE — a marca dele por cima do tabuleiro, a onda, o tremor e
   o som dele. Fica numa camada só, fora do #mesa, e se apaga sozinha: overlay
   que esquece de sair come o toque das cartas, e essa já foi a pior meia hora
   deste projeto. */
function golpe(boss){
  if(!boss) return;
  const g = $('#golpe');
  g.style.setProperty('--gc', boss.cor || '#fff');
  g.querySelector('.marca').innerHTML = ICO_CHEFE[boss.id] || ICO.chefe;
  /* o ataque não repete o nome do chefe: ele já está na pílula do topo desde
     a entrada, e ler não é o que se faz durante um golpe */
  g.querySelector('.titulo b').textContent = '';
  g.querySelector('.titulo i').textContent = '';
  g.classList.remove('on'); void g.offsetWidth; g.classList.add('on');
  const a = $('#area');
  if(a){ a.classList.remove('tremendo'); void a.offsetWidth; a.classList.add('tremendo'); }
  SFX.golpe(boss.id);
  clearTimeout(golpe._t);
  golpe._t = setTimeout(()=>{ g.classList.remove('on'); a?.classList.remove('tremendo'); }, 820);
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

/* CONFIRMAR ALGO QUE NÃO SE DESFAZ.
   `confirm()` do sistema tem os mesmos defeitos do `prompt()` explicado
   abaixo, e um a mais: é a caixa que o dedo aperta sem ler. Aqui o botão
   perigoso vem pintado de perigo e escrito por extenso o que vai sumir. */
function confirmar({ titulo, texto, ok='APAGAR', dica='' }){
  return new Promise(resolve=>{
    const f = $('#folha');
    $('#folhac').innerHTML = `
      <div class="cabeca" style="margin-bottom:13px">
        <div class="rot">${esc(dica)}</div>
        <h2 class="tit">${esc(titulo)}</h2>
      </div>
      <p class="mini" style="margin-bottom:13px">${esc(texto)}</p>
      <div class="folhab">
        <button class="bt" data-nao>DEIXA PRA LÁ</button>
        <button class="bt perigo" data-sim>${esc(ok)}</button>
      </div>`;
    f.classList.add('on');
    let respondido = false;
    const fechar = v => { if(respondido) return; respondido = true;
      f.classList.remove('on'); f.removeEventListener('click', clique); resolve(v); };
    const clique = e => {
      if(e.target.closest('[data-sim]')){ SFX.clique(); fechar(true); }
      else if(e.target.closest('[data-nao]') || e.target.id === 'folha') fechar(false);
    };
    f.addEventListener('click', clique);
  });
}

/* PERGUNTAR UM TEXTO SEM SAIR DO JOGO.
   O nome do ranking era pedido pela caixa de texto do sistema operacional:
   fonte do sistema, botões do sistema, no meio de um jogo pintado à mão. Além
   do estrago visual, ela é a única parte da tela que não obedece ao jogo — em
   celular abre por cima de tudo, e alguns navegadores a bloqueiam sem avisar,
   o que deixava o botão de publicar sem efeito nenhum e sem explicação.

   Devolve o texto, ou `null` se a pessoa desistir. */
function perguntar({ titulo, texto, valor='', dica='', ok='CONFIRMAR', max=22 }){
  return new Promise(resolve=>{
    const f = $('#folha');
    $('#folhac').innerHTML = `
      <div class="cabeca" style="margin-bottom:13px">
        <div class="rot">${esc(dica)}</div>
        <h2 class="tit">${esc(titulo)}</h2>
      </div>
      ${texto ? `<p class="mini" style="margin-bottom:13px">${esc(texto)}</p>` : ''}
      <input class="campo" id="pcampo" maxlength="${max}" value="${esc(valor)}"
             placeholder="seu nome" autocomplete="off" spellcheck="false">
      <div class="folhab">
        <button class="bt" data-nao>DEIXA PRA LÁ</button>
        <button class="bt p" data-sim>${esc(ok)}</button>
      </div>`;
    f.classList.add('on');
    const campo = $('#pcampo');
    campo.focus(); campo.select();
    let respondido = false;
    const fechar = v => {
      if(respondido) return; respondido = true;
      f.classList.remove('on'); f.removeEventListener('click', clique);
      resolve(v);
    };
    const confirmar = () => {
      const v = campo.value.trim();
      /* campo vazio não fecha a folha calada: sumir sem dizer por quê seria
         pior que a caixa do sistema que estamos substituindo */
      if(!v){ campo.classList.add('ruim'); campo.focus();
              setTimeout(()=>campo.classList.remove('ruim'), 700); return; }
      SFX.clique(); fechar(v);
    };
    const clique = e => {
      if(e.target.closest('[data-sim]')) confirmar();
      else if(e.target.closest('[data-nao]') || e.target.id === 'folha') fechar(null);
    };
    f.addEventListener('click', clique);
    campo.onkeydown = e => {
      if(e.key === 'Enter') confirmar();
      if(e.key === 'Escape') fechar(null);
    };
  });
}

/* a folha de placas veio nas seis cores do jogo. `classePlaca` diz qual
   arquivo usar a partir da cor pedida, e cai na placa azul quando a cor não
   é uma das seis — assim nenhuma tela fica sem moldura. */
const PLACA_POR_COR = {
  '#ffc23c':'c-ouro', '#ffe6a3':'c-ouro', '#ffa24d':'c-ouro', '#f0c14b':'c-ouro',
  '#c9a227':'c-ouro', '#ffc93f':'c-ouro',
  '#ff4f52':'c-vermelho', '#ff6fae':'c-vermelho', '#ff6a5a':'c-vermelho',
  '#4fb8ff':'c-azul', '#a8e2ff':'c-azul', '#7fd4ff':'c-azul', '#6ba8ff':'c-azul',
  '#4fe08a':'c-verde', '#8ad46a':'c-verde', '#7ee3a8':'c-verde',
  '#b478ff':'c-roxo', '#b06bff':'c-roxo', '#a98bff':'c-roxo',
};
/* QUAIS PLACAS PEDEM TEXTO ESCURO — medido, não achado.
   Cinco das seis placas pintadas são claras o bastante para engolir texto
   branco. Isso não dá para decidir olhando: a placa ouro tem 186 de
   luminância e a roxa tem 141, e as duas parecem só "coloridas". A medida
   está em arte/ui/placas.json (tools/luz.py), e o teste confere que esta
   lista continua batendo com ela — a lista é uma afirmação, não uma lembrança.
   A única escura é a azul, que é o fundo padrão de toda placa sem cor. */
const PLACA_CLARA = new Set(['c-ouro','c-verde','c-azul','c-vermelho','c-roxo']);
const classePlaca = cor => {
  const c = PLACA_POR_COR[String(cor).toLowerCase().trim()] || '';
  return c ? (PLACA_CLARA.has(c) ? c+' claro' : c) : '';
};

/* PLACA TINGIDA — para quando SEIS placas não bastam.
   As oito classes precisam ser oito coisas diferentes de relance, e o mapa de
   cores só tem seis placas pintadas: duas classes caíam na mesma verde e
   quatro na azul padrão. Repintar a folha em oito cores seria arte a mais
   para manter em sincronia com o código.

   Então a placa é UMA — a dourada, que é clara e neutra — e gira de matiz até
   a cor da classe. O giro sai da própria cor, então placa e emblema nunca
   discordam: mudar a cor de uma classe repinta a placa dela sozinha.

   O filtro vai num pseudo-elemento atrás do conteúdo. No elemento inteiro ele
   giraria o texto e os ícones junto. */
function matizDe(hex){
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if(!m) return 42;
  const n = parseInt(m[1], 16);
  const r = (n>>16 & 255)/255, g = (n>>8 & 255)/255, b = (n & 255)/255;
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx - mn;
  if(!d) return 42;
  const h = mx===r ? ((g-b)/d + (g<b ? 6 : 0)) : mx===g ? ((b-r)/d + 2) : ((r-g)/d + 4);
  return h * 60;
}
const OURO = 42;                      /* o matiz da placa-ouro, que é a base */
const placaTingida = cor =>
  `tinge claro" style="--giro:${(matizDe(cor) - OURO).toFixed(0)}deg;--fc:${cor}`;

/* ═══════════════════════════════════════════ VITRINE
   O jogo não tem uma lista em lugar nenhum. Toda coisa que ele nomeia é um
   LADRILHO que se toca, e o texto abre por cima. Uma lista o jogador varre
   com o olho e esquece; uma vitrine ele percorre com o dedo, e o que abriu
   é o que ele quis saber. */
function ladrilho(tipo, id, extra=''){
  const p = peca(tipo, id); if(!p) return '';
  /* MEDALHA é objetivo, e objetivo não se esconde: ela aparece com nome e
     exigência desde o começo, apagada até ser ganha. Carta, família, chefe e
     relíquia são SURPRESA, e essas ficam fechadas até aparecerem na partida —
     metade da graça de um roguelike é abrir a sala do Mimic sem saber o que é
     um Mimic. As duas coisas usam o mesmo ladrilho e leituras diferentes. */
  if(tipo === 'conquista'){
    const feita = temMedalha(id);
    return `<button class="lad ${feita?'':'apagado'}" data-peca="${tipo}:${esc(id)}"
                    style="--fc:${feita ? p.cor : '#5b6683'}">
      <span class="agu">${p.ico}</span>
      ${medalhao(p)}
      <span class="nm">${esc(p.nome)}</span>
      <span class="tg">${feita ? esc(p.tag) : 'ainda não'}</span>
      ${extra}</button>`;
  }
  if(escondeCapitulo(tipo) && !viu(tipo, id))
    return `<button class="lad fechado" data-fechado="${tipo}">
      <span class="agu">${p.ico}</span>
      <span class="ic">${p.ico}</span>
      <span class="nm">? ? ?</span>
      <span class="tg">ainda não encontrada</span></button>`;
  return `<button class="lad" data-peca="${tipo}:${esc(id)}" style="--fc:${p.cor}">
    <span class="agu">${p.ico}</span>
    <span class="ic">${p.ico}</span>
    <span class="nm">${esc(p.nome)}</span>
    ${p.tag ? `<span class="tg">${esc(p.tag)}</span>` : ''}
    ${extra}</button>`;
}
/* A MEDALHA MONTADA: o aro do degrau por fora, o ícone da conquista dentro.
   Os dois vêm separados da arte de propósito — o desenho conta O QUE foi
   feito, o aro conta o QUANTO custou, e são perguntas diferentes. */
const medalhao = (p, grande=false) => p.moldura
  ? `<span class="med-aro ${grande?'g':''}">${p.moldura}<span class="miolo">${p.ico}</span></span>`
  : `<span class="ic">${p.ico}</span>`;

/* o que se descobre e onde se descobre — a resposta para o toque no fechado */
const ONDE_ACHA = {
  carta:'Virando uma na mesa. Elas aparecem conforme a run avança.',
  familia:'Entrando numa sala que sorteie essa família.',
  chefe:'Chegando na sala de chefe do mundo dele.',
  reliquia:'Ganhando ou comprando essa relíquia numa run.',
};
const vitrine = (tipo, ids, extra) =>
  `<div class="vit">${ids.map(id=>ladrilho(tipo, id, extra?extra(id):'')).join('')}</div>`;

/* a peça aberta: a mesma coisa, em tamanho grande */
function abrirPeca(tipo, id){
  const p = peca(tipo, id); if(!p) return;
  SFX.clique();
  ficha(`<div class="pecao" style="--fc:${p.cor}">
      ${p.moldura ? medalhao(p, true) : `<div class="ic">${p.ico}</div>`}
      <h3>${esc(p.nome)}</h3>
      ${p.tag ? `<div class="rot" style="color:${p.cor}">${esc(p.tag)}</div>` : ''}
      ${p.texto ? `<p class="tx">${esc(p.texto)}</p>` : ''}
      ${p.nota ? `<p class="nt">${esc(p.nota)}</p>` : ''}
    </div>
    ${p.dados?.length ? `<div class="meds" style="margin-top:13px">${p.dados.map(
      ([r,v])=>medalha(ICO.combo, v, r, p.cor)).join('')}</div>` : ''}
    ${p.amostra?.length ? `<div class="rot" style="margin:13px 0 6px">o desenho da família</div>
      <div class="chips">${p.amostra.map(g=>
        `<span class="chip" style="--fc:${p.cor}"><span class="ic">${g}</span></span>`).join('')}</div>` : ''}`);
}
/* um toque em qualquer ladrilho da tela abre a peça — não importa a tela */
document.addEventListener('click', e=>{
  const f = e.target.closest('[data-fechado]');
  if(f){
    SFX.clique();
    const cap = FAMILIA_DE_PECA[f.dataset.fechado];
    ficha(`<div class="pecao" style="--fc:#5b6683">
        <div class="ic">${ICO.recusa}</div>
        <h3 style="color:var(--osso2)">Ainda não encontrada</h3>
        <div class="rot">${esc(cap?.nome || '')}</div>
        <p class="tx">${esc(ONDE_ACHA[f.dataset.fechado] || 'Jogando.')}</p>
        <p class="nt">A coleção só mostra o que você já viu de verdade — é o
          que faz o jogo ainda ter surpresa na décima run.</p>
      </div>`);
    return;
  }
  const b = e.target.closest('[data-peca]');
  if(!b) return;
  const [tipo, ...resto] = b.dataset.peca.split(':');
  abrirPeca(tipo, resto.join(':'));
});

/* MEDALHA: número com cara de troféu. Nenhum número do jogo aparece como
   linha de tabela. */
const medalha = (ico, valor, rotulo, cor='var(--ouro)', forte=false) => {
  const n = String(valor).length;
  return `<div class="mede ${forte?'forte':''}" style="--c:${cor}">
     <span class="ic">${ico}</span>
     <span class="cx"><span class="vl ${n>9?'enorme':n>6?'longo':''}">${esc(valor)}</span>
       <span class="rt">${esc(rotulo)}</span></span></div>`;
};

/* CHIP: relíquia (ou coisa curta) que se toca */
const chipReliquia = id => {
  const r = POR_ID[id]; if(!r) return '';
  return `<button class="chip" data-peca="reliquia:${id}" style="--fc:${RARIDADE[r.r]}">
    <span class="ic">${icoReliquia(id)}</span><span>${esc(r.nome)}</span></button>`;
};
const chipsReliquias = ids => ids.length
  ? `<div class="chips">${ids.map(chipReliquia).join('')}</div>`
  : `<div class="chips"><span class="chip vazio"><span class="ic">${ICO.reliquia}</span>
       <span>nenhuma relíquia ainda</span></span></div>`;

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
    <div class="rol"><div class="grade fila1">
    ${LISTA_CLASSES.map(c=>`
      <button class="op ${placaTingida(c.cor)}" data-classe="${c.id}">
        <span class="agua">${ICO_CLASSE[c.id]||''}</span>
        <span class="cab">
          <span class="gf">${ICO_CLASSE[c.id]||''}</span>
          <h3>${esc(c.nome)}</h3>
        </span>
        <div class="lm">“${esc(c.lema)}”</div>
        <p>${esc(c.d)}</p>
        <div class="stats">
          <span>foco <b>${c.foco}</b></span>
          <span>viradas <b>${c.viradasBonus>=0?'+':''}${c.viradasBonus}</b></span>
          <span>moedas <b>${c.moedas}</b></span>
        </div>
        <div class="ferc"><span class="ic">${ICO.reliquia}</span>
          <span class="tx"><b>${esc(c.ferramenta.nome)}</b>${esc(c.ferramenta.d)}</span></div>
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
/* uma cor por tipo de sala, e sempre a mesma — no mapa, no título e na
   moldura do que te espera */
const COR_SALA = { boss:'#ff4f52', elite:'#ffa24d', loja:'#4fe08a',
                   tesouro:'#b478ff', descanso:'#ff8a4d', evento:'#4fb8ff',
                   combate:'#ffc23c' };

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
        <div class="op ${classePlaca(cor)}" style="--fc:${cor};cursor:default;align-items:center;text-align:center">
          <span class="agua">${ICO.meta}</span>
          <div class="rot">para vencer esta sala, faça</div>
          <div class="num metanum" style="font-size:clamp(46px,15vw,68px);font-weight:900;
               line-height:.95;color:var(--ouro2);
               text-shadow:0 4px 0 var(--ouroE),0 7px 0 rgba(0,0,0,.7),
               0 0 30px rgba(255,194,60,.5)">${nf(plano.meta)}</div>
          <div class="rot">pontos</div>
          <div class="stats" style="justify-content:center">
            <span>${plano.pares*2} cartas</span>
            <span>${plano.viradas + run.bonusViradas} viradas</span>
            <span>foco ${run.foco}</span>
          </div>
          <p class="mini" style="text-align:center">Não precisa limpar o tabuleiro.</p>
        </div>
        ${tipo==='boss' ? `
        <div class="op c-vermelho" style="--fc:#ff4f52;cursor:default;margin-top:9px">
          <span class="agua">${ICO_CHEFE[b.id]||''}</span>
          <div class="rot">chefe do mundo</div>
          <span class="cab"><span class="gf">${ICO_CHEFE[b.id]||''}</span>
            <h3>${esc(b.nome)}</h3></span>
          <p>${esc(b.regra)}</p>
          <p class="mini" style="font-style:italic">${esc(b.dica)}</p></div>` : ''}
      ` : ''}
      <div class="hr"></div>
      <div class="rot" style="margin-bottom:6px">a sua run até aqui</div>
      <div class="meds">
        ${medalha(ICO.meta, nf(run.pontos), 'pontos', 'var(--ouro)', true)}
        ${medalha(ICO.moeda, nf(run.moedas), 'moedas', '#ffc23c')}
        ${medalha(ICO.foco, run.foco, 'foco', 'var(--vermelho)')}
        ${medalha(ICO.combate, run.estatisticas.salas, 'salas', '#4fe08a')}
      </div>
      <div class="rot" style="margin:13px 0 6px">suas relíquias</div>
      ${chipsReliquias(run.reliquias)}
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
  if(b) entradaDoChefe(b);
  talvezGuia();
}

/* A ENTRADA DO CHEFE. A sala do chefe abria igual a qualquer outra: a mesma
   grade, e uma pílula no topo com o nome dele. O jogador chegava na luta mais
   dura do mundo sem que nada avisasse. Agora ele ENTRA — a marca cresce no
   meio da tela com a regra dele por baixo, a tela treme, e o acorde sobe.
   Uma vez por sala: `run.tentativa` reabre a sala e a entrada volta com ela,
   que é justo, porque é uma luta nova. */
let chefeAnunciado = null;
function entradaDoChefe(b){
  const chave = b.id + '|' + run.mundo + '|' + run.tentativa;
  if(chefeAnunciado === chave) return;
  chefeAnunciado = chave;
  const g = $('#golpe');
  g.style.setProperty('--gc', b.cor || '#fff');
  g.querySelector('.marca').innerHTML = ICO_CHEFE[b.id] || ICO.chefe;
  g.classList.remove('on'); void g.offsetWidth; g.classList.add('on');
  const a = $('#area');
  if(a){ a.classList.remove('tremendo'); void a.offsetWidth; a.classList.add('tremendo'); }
  g.querySelector('.titulo b').textContent = b.nome;
  g.querySelector('.titulo i').textContent = b.regra;
  SFX.entradaChefe();
  clarao((b.cor || '#fff') + '55');
  clearTimeout(golpe._t);
  golpe._t = setTimeout(()=>{ g.classList.remove('on'); a?.classList.remove('tremendo'); }, 1560);
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
  $('#meta').textContent = nf(s.meta);
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
    ? `<span class="v num" style="color:${s.foco<=1?'var(--vermelho)':'inherit'}">${s.foco}<span
        style="color:var(--osso3);font-size:11px">/${teto}</span></span>`
    : [...Array(teto)].map((_,i)=>
        `<b class="${i < s.foco ? '' : 'off'}${perdeu && i===s.foco ? ' perdeu':''}"></b>`).join('');
  focoAnterior = s.foco;

  const d = degrauCombo(s.combo), c = $('#combo');
  c.style.setProperty('--c', corDoCombo(s.combo));
  c.classList.toggle('viva', s.combo>0);
  c.querySelector('.cn').textContent = s.combo
    ? `${d.nome} · ${s.combo} seguido${s.combo>1?'s':''}` : 'sem combo — emende os acertos';
  c.querySelector('.cm').textContent = '×' + vg(s.multCombo().toFixed(1));

  const fer = run.C.ferramenta, bf = $('#bfer');
  const pode = fer.custoEssencia ? s.essencia >= fer.custoEssencia : s.usosFer > 0;
  bf.disabled = !pode || travado;
  bf.classList.toggle('pronta', pode && !travado);
  bf.classList.toggle('armada', !!alvoPendente);
  bf.querySelector('.nm').textContent = alvoPendente ? 'toque o alvo…' : fer.nome;
  bf.querySelector('.u').textContent = fer.custoEssencia
    ? `${s.essencia}/${fer.custoEssencia} essência` : `${s.usosFer}×`;

  /* com a meta feita, aparece a escolha: continuar somando pontos ou fechar
     agora e levar as viradas em moeda */
  $('#baixo').classList.toggle('passou', !!s.passou && !s.fim);
  const bfim = $('#bfim');
  bfim.disabled = travado;
  bfim.innerHTML = 'FECHAR<br><b>+' + nf(Math.max(0, s.viradas)) + ' MOEDAS</b>';

  const rq = $('#relq');
  if(rq.children.length !== run.reliquias.length){
    rq.innerHTML = run.reliquias.map((id,i)=>{
      const r = POR_ID[id];
      return `<b data-peca="reliquia:${id}" class="${i===run.reliquias.length-1?'nova':''}"
        style="color:${RARIDADE[r.r]}" title="${esc(r.nome)}">${icoReliquia(id)}</b>`;
    }).join('');
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

/* tudo o que a face da carta mostra, num texto só. É com isto que a tela
   descobre que precisa redesenhar aquela carta — antes, a atualização no
   lugar só mexia em classes, e uma carta que MUDAVA no meio da sala (o
   Camaleão trocando de símbolo, o Mago transmutando em curinga) continuava
   exibindo o desenho antigo. A tela mentia, e o par "errado" fechava. */
const assinatura = c => [c.fam, c.simbolo, c.tipo, c.camadas, c.pavio,
  c.orfa?1:0, c.revelado?1:0, c.marcada?1:0, c.sumiu?1:0].join('|');

function cartaHTML(c, pequena){
  if(c.sumiu) return `<div class="vazio" data-v="${c.id}"></div>`;
  const f = FAMILIAS[c.fam], t = TIPOS[c.tipo];
  const cor = f ? f.cor : '#cfd6e4';
  const curinga = !!t.curinga;
  /* VER O TIPO ANTES DE VIRAR. A Hacker promete isso na descrição da classe e
     a Agulha de Bússola promete de novo, e nenhuma das duas cumpria: o motor
     gravava `mods.veTipos` e ninguém lia. Aqui a carta FECHADA mostra a marca
     do tipo dela — só quando o tipo diz alguma coisa, porque um verso cheio de
     selos de "Normal" seria ruído em vez de informação. */
  const s0 = run?.sala || salaViva;
  const espia = !!s0?.mods?.veTipos && !c.resolvida && !faceAberta(c) && c.tipo !== 'normal';
  const selos = [];
  if(espia) selos.push(`<span class="selo tipo" style="color:${TIPOS[c.tipo].cor}">`
    + `${ICO[c.tipo] || ''}</span>`);
  /* o que o jogo JÁ te contou fica escrito na carta — nada de adivinhar */
  if(c.orfa)     selos.push('<span class="selo of">SEM PAR</span>');
  if(c.revelado) selos.push('<span class="selo mi">FALSA</span>');
  if(c.marcada)  selos.push('<span class="selo eg">FIXA</span>');
  if(c.pavio>0 && c.conhecida) selos.push(`<span class="selo pv">${c.pavio}</span>`);
  /* CURINGA e SEM PAR aparecem SEMPRE, mesmo em carta pequena: são as duas
     únicas coisas que fazem um par fechar com desenhos DIFERENTES, e escondê-las
     por falta de espaço era o que fazia o jogo parecer quebrado. */
  const frente = curinga
    ? '<span class="selo tp">CURINGA</span>'
    : c.orfa ? '<span class="selo tp" style="color:#4fb8ff">SEM PAR</span>'
    : (!pequena && t.id!=='normal')
      ? `<span class="selo tp" style="color:${t.cor}">${esc(t.nome)}</span>` : '';
  const gelo = c.camadas>1 ? '<span class="selo pv" style="color:#a8e2ff">GELO</span>' : '';
  const selada = c.resolvida && !mostrando.has(c.id);
  /* a moldura pintada da frente. O curinga fica de fora: a face dele é o
     arco-íris inteiro e uma moldura por cima esconderia justamente o que o
     identifica. */
  const mold = curinga ? '' : MOLDURA_DO_TIPO[c.tipo] || '';
  const cls = ['ct', faceAberta(c)?'ab':'', c.marcada?'marc':'', selada?'feito':'',
               curinga?'curinga':'', c.orfa?'orfa':'',
               mold ? 'temold '+mold : ''];
  /* o curinga não usa desenho de família: ele tem cara própria, e é por isso
     que dá para reconhecê-lo assim que vira */
  const desenho = curinga ? ICO.espelho : svgGlifo(c.fam, c.simbolo);
  /* a face escurece quando a marca é pintada — ver .ct.pint no CSS */
  if(!curinga && desenho.startsWith('<img')) cls.push('pint');
  return `<button class="${cls.join(' ')}" data-c="${c.id}" data-sig="${assinatura(c)}"
      style="--fc:${cor}" aria-label="carta ${c.pos+1}${curinga?' (curinga)':''}">
    <span class="fx">
      <span class="fr">${selos.join('')}</span>
      <span class="ff">${desenho}${frente}${gelo}</span>
    </span>${selada ? '<span class="ok"></span>' : ''}</button>`;
}

/* `remontar` reconstrói o HTML; `chegada` faz as cartas caírem uma a uma, e
   só vale ao abrir a sala. No meio da partida, remontar sem necessidade
   mataria a animação de virada bem quando ela mais importa.

   O nome era `refazer` — e passou a colidir com o `refazer` do motor, que
   este arquivo importa para retomar a partida salva. Dentro desta função o
   parâmetro apagava o import; ninguém chamava o motor daqui, então não havia
   defeito, mas era uma armadilha carregada esperando a próxima linha. */
function mesa(remontar, chegada){
  const s = run.sala || salaViva; if(!s) return;
  const el = $('#mesa');
  ajustar();
  /* na sala do chefe o baralho inteiro é outro — o verso troca antes da
     primeira virada, para o encontro pesar sem precisar de um aviso.

     ATRIBUTO e não classe. `chefe` já era o nome da pílula vermelha que mostra
     o nome do chefe no topo da sala, e dar essa classe ao #mesa fez o
     tabuleiro herdar ela inteira: fundo vermelho chapado, `border-radius:99px`
     e `overflow:hidden`. A grade sobreviveu — `#mesa` é seletor de id e ganha
     de classe — mas o raio de 99px com overflow RECORTA as quatro pontas do
     tabuleiro, e as cartas dos cantos ficavam cortadas pela metade. Metade de
     carta não recebe toque: de fora, "o chefe não funciona, as cartas não
     viram". Um atributo não colide com nome de classe nenhum. */
  el.toggleAttribute('data-chefe', !!s.boss);
  const peq = el.dataset.pequena === '1';
  const todas = s.porPos();
  /* O SÍMBOLO DO MEIO.
     Grade de lado ímpar quase nunca fecha: 24 cartas numa 5×5 deixam uma casa
     sobrando, e as cartas vêm sempre em número par, então a sobra é certa. Se
     essa casa fica na ponta da última fila, o tabuleiro parece incompleto.
     Posta no CENTRO, com uma marca gravada na mesa, ela vira o contrário: um
     ponto de simetria, e as vinte e quatro cartas passam a girar em volta dele.

     A marca não é carta e não pode parecer uma: nada de verso, nada de
     moldura, nada que se possa tocar. É um ornamento do feltro. */
  const centro = casaDoMeio(s);
  const monta = ()=>{
    el.innerHTML = todas.map(c=>cartaHTML(c, peq)).join('')
      + (centro >= 0 ? '<span class="ornato" aria-hidden="true"></span>' : '');
  };
  if(remontar || el.children.length !== todas.length + (centro>=0 ? 1 : 0)){
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
      /* a carta mudou de cara: redesenha só ela, sem mexer no resto da mesa */
      if(e.dataset.sig !== assinatura(c)){
        const ordem = e.style.order;
        e.outerHTML = cartaHTML(c, peq);
        const novo = el.querySelector(`[data-c="${c.id}"]`);
        if(novo) novo.style.order = ordem;
        continue;
      }
      e.classList.toggle('ab', faceAberta(c));
      e.classList.toggle('marc', !!c.marcada);
      const selada = c.resolvida && !mostrando.has(c.id);
      if(selada && !e.classList.contains('feito')){
        e.classList.add('feito');
        /* o carimbo é IRMÃO da face, nunca filho: a face apaga (é o que diz
           "esta dupla saiu do jogo") e o filtro que a apaga levaria o carimbo
           junto — sobrava um selo cinza que ninguém via. */
        if(!e.querySelector('.ok'))
          e.insertAdjacentHTML('beforeend', '<span class="ok"></span>');
      }
    }
  }
  ajustar();
  ordenar();
}
/* o embaralho do chefe mexe em `pos`; a grade tem que seguir */
/* A ÚLTIMA FILA FICA NO MEIO.
   A grade escolhe o formato mais quadrado que existe, mas nem todo número de
   cartas fecha exato: 26 cartas em 5 colunas deixam uma sozinha na fila de
   baixo. Encostada à esquerda, essa carta lê como erro de montagem — o
   tabuleiro parece ter escorregado. Centralizada, lê como o que é: a última
   peça. Quem faz isso é um deslocamento na PRIMEIRA carta da fila incompleta,
   com `grid-column-start`, e não espaçadores — espaçador seria um elemento a
   mais que o resto do código teria de aprender a ignorar. */
/* qual casa da grade fica reservada para o ornamento, ou −1 se nenhuma.
   Só vale quando os dois lados são ímpares E a sobra é ímpar: aí existe um
   centro de verdade, e tirar uma casa dele deixa o resto par dos dois lados. */
function casaDoMeio(s){
  const cols = s.colunas;
  const n = s.cartas.length;
  const filas = Math.ceil(n / cols);
  const sobra = cols * filas - n;
  if(cols % 2 === 0 || filas % 2 === 0 || sobra % 2 === 0 || sobra < 1) return -1;
  return Math.floor(cols * filas / 2);
}

function ordenar(){
  const el = $('#mesa');
  const s = run.sala || salaViva;
  const cartas = s.porPos();
  const cols = s.colunas;
  const centro = casaDoMeio(s);
  /* com o centro reservado, as cartas depois dele andam uma casa para a
     frente — daí `slot` não ser mais o mesmo que o índice da carta */
  const slot = i => (centro >= 0 && i >= centro) ? i + 1 : i;
  const casas = slot(cartas.length - 1) + 1;
  const sobra = casas % cols;                      /* quantas na fila de baixo */
  const recuo = sobra ? Math.floor((cols - sobra) / 2) : 0;
  const primeiroDaUltima = casas - (sobra || cols);
  cartas.forEach((c,i)=>{
    const e = el.querySelector(`[data-c="${c.id}"], [data-v="${c.id}"]`);
    if(!e) return;
    const k = slot(i);
    e.style.order = k;
    e.style.gridColumnStart = (recuo && k === primeiroDaUltima) ? (recuo + 1) : '';
  });
  const orn = el.querySelector('.ornato');
  if(orn) orn.style.order = centro;
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
/* Todo efeito da mesa nasce aqui, com a mesma receita: um retângulo posto no
   centro de uma carta, recortado pela arte pintada e tingido com a cor de quem
   causou o efeito. Ter UM lugar só evita o que quase aconteceu — cada efeito
   inventando o seu jeito de se posicionar e saindo um pixel fora do outro. */
function efeito(id, cls, cor, ms, extra=''){
  const p = centro(id); if(!p) return null;
  const e = document.createElement('div');
  e.className = 'efx ' + cls;
  e.style.cssText = `left:${p.x}px;top:${p.y}px;--fc:${cor};${extra}`;
  porElemento(e, ms);
  return e;
}
/* choque em dois tempos: o halo macio abre largo e devagar, o anel duro sai
   na frente e some antes. Um só dos dois lê como fumaça ou como risco. */
function onda(id, cor){
  efeito(id, 'onda', cor, 720);
  efeito(id, 'anel', cor, 540);
}
/* o feixe que liga as duas cartas do par: é ele que DIZ "estas duas" */
function raio(a, b, cor){
  const p = centro(a), q = centro(b);
  if(!p || !q) return;
  const dx = q.x-p.x, dy = q.y-p.y;
  const e = document.createElement('div');
  e.className = 'efx raio';
  e.style.cssText = `left:${p.x}px;top:${p.y}px;width:${Math.hypot(dx,dy)}px;`
    + `margin-top:-13px;--rot:${Math.atan2(dy,dx)}rad;--fc:${cor}`;
  porElemento(e, 620);
}
function faiscas(id, cor, n=10){
  if(!centro(id)) return;
  for(let i=0;i<n;i++){
    const a = (i/n)*Math.PI*2 + Math.random()*0.6;
    const d = 34 + Math.random()*46;
    efeito(id, 'faisca', cor, 850,
      `--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;`
      + `animation-delay:${(Math.random()*90).toFixed(0)}ms`);
  }
  efeito(id, 'poeira', cor, 950);
}
/* a estrela grande, guardada para o degrau novo de combo */
const estouro = (id, cor) => efeito(id, 'estouro', cor, 860);
/* o X do erro: cai em cima da carta e não pede leitura */
const xis = id => efeito(id, 'xis', '#fff', 700);
/* a casca de gelo rachando */
const gelo = id => efeito(id, 'gelo', '#a8e2ff', 640);
/* o facho de cima, quando uma ferramenta acende uma carta */
const facho = (id, cor='#4fb8ff') => efeito(id, 'facho', cor, 900);
/* faíscas de seis pontas: só para o que vira dinheiro */
function brilhos(id, cor='#ffc23c', n=6){
  for(let i=0;i<n;i++){
    const a = (i/n)*Math.PI*2 + Math.random()*0.7;
    const d = 22 + Math.random()*30;
    efeito(id, 'brilho', cor, 950,
      `--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;`
      + `animation-delay:${(Math.random()*140).toFixed(0)}ms`);
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
/* Registro de todo toque que chega na mesa, com o motivo de ter sido aceito ou
   recusado. Custa um objeto por toque e é a diferença entre investigar um
   "não vira" e adivinhar: sem ele, um toque engolido pela animação e um toque
   que nunca chegou ao handler são indistinguíveis de fora. */
const MN_TOQUES = [];
async function tocarCarta(id){
  const _reg = { id, t:Math.round(performance.now()), travado,
                 alvo:!!alvoPendente, sala:!!run?.sala, saiu:null };
  MN_TOQUES.push(_reg);
  if(travado || !run?.sala){ _reg.saiu = travado ? 'travado' : 'sem sala'; return; }
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
  if(!c || c.resolvida || c.virada){
    _reg.saiu = !c ? 'carta não existe' : c.resolvida ? 'já resolvida' : 'já virada';
    return;
  }

  acordar();
  const primeira = s.abertas.length === 0;
  const rel = run.virar(id);
  if(rel.erro){ _reg.saiu = 'motor recusou: '+rel.erro; return; }
  _reg.saiu = 'virou';
  /* VIU NA TELA, VIROU SEU. A coleção se enche aqui, na carta virada, e não
     na entrada da sala: quem entrou numa sala de Dragões e perdeu sem virar
     uma carta de Dragão não viu Dragão nenhum. */
  descobrir('carta', c.tipo); descobrir('familia', c.fam);
  SFX.virar();
  mostrando.add(id);
  mesa(false);
  if(primeira){ medidores(); return; }

  travado = true;
  $('#bfer').disabled = true;
  abaixar(true);                 // o som que importa agora é o do par
  await animar(rel);
  abaixar(false);
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
      gelo(id);
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
    const legenda = acerto.por==='curinga' ? 'curinga fecha com qualquer uma'
                  : acerto.por==='orfas'   ? 'duas sem par fecham entre si'
                  : acerto.combo>1 ? `${d.nome} ×${vg((rel.mult ?? d.mult).toFixed(1))}` : '';
    voa(a, '+'+nf(acerto.pontos), legenda);
    /* par de desenhos diferentes precisa de explicação na hora, senão parece
       defeito — e é 8,8% dos pares do jogo */
    if(acerto.por==='curinga')
      aviso('CURINGA', 'o Espelho fecha com qualquer carta', '#ffffff');
    else if(acerto.por==='orfas')
      aviso('DUAS SEM PAR', 'cartas que perderam a dupla fecham entre si', '#4fb8ff');
    $('#combo').classList.remove('sobe'); void $('#combo').offsetWidth;
    $('#combo').classList.add('sobe');
    medidores();
    /* degrau novo é acontecimento: clarão na tela inteira, e a estrela grande
       em cima das duas cartas que causaram o degrau */
    if(acerto.combo>=2 && d.n===acerto.combo && acerto.por==='par'){
      const cc = corDoCombo(acerto.combo);
      clarao(cc+'55');
      for(const id of acerto.cartas) estouro(id, cc);
      aviso(d.nome, 'combo ×'+vg(d.mult.toFixed(1)), cc);
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
      /* o X só aparece quando o erro CUSTOU. Descobrir carta nova também é
         "não fecharam", mas marcar aquilo com um X ensinaria a coisa errada:
         que explorar é falha. */
      for(const id of erro.cartas) xis(id);
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
    if(e.e==='moedas'){ SFX.moeda();
      const onde = acerto?.cartas?.[0] ?? 0;
      brilhos(onde); voa(onde, '+'+e.n, 'moedas', 'moeda'); }
    if(e.e==='virada_extra') aviso('+'+(e.n||1)+' VIRADA', 'devolveram tempo', '#4fe08a');
    if(e.e==='virada_a_menos') aviso('−1 VIRADA', 'o dinossauro é pesado', '#35a86a');
    if(e.e==='foco'){ SFX.revelar(); aviso('+1 FOCO', 'disciplina do samurai', '#ff8fb3'); }
    if(e.e==='xadrez') aviso('DOBRADO', 'peça de xadrez', '#dbe4f5');
    if(e.e==='runa'){ const onde = acerto?.cartas?.[1] ?? 0;
      brilhos(onde, '#b478ff', 4); voa(onde, '+0,1', 'runa', 'moeda'); }
    if(e.e==='revelou'){ SFX.revelar(); for(const id of (e.cartas||[])) piscar(id); }
    if(e.e==='marcou'){ SFX.revelar(); aviso('CARTA FIXA', 'o Egito marcou uma', '#ffc23c'); }
    if(e.e==='explodiu'){ SFX.chefe(); clarao('rgba(255,106,90,.5)');
      aviso('EXPLODIU', 'a bomba levou o par', '#ff4f52');
      for(const id of (e.cartas||[])){ faiscas(id, '#ff4f52', 14); saindo.push(id); } }
    if(e.e==='camaleao'){ aviso('TROCOU', 'o camaleão mudou de símbolo', '#4fe08a');
      for(const id of (e.cartas||[])) onda(id, '#4fe08a'); }
    /* OS TRÊS ATAQUES DO CHEFE. Cada um leva o golpe dele — marca, onda,
       tremor e som — e mais o gesto que mostra O QUE mudou: a carta apagada
       é varrida, o tabuleiro do Espelho gira, o par que sai implode. Sem o
       gesto, o jogador vê o tabuleiro diferente e conclui que o jogo se
       bagunçou sozinho. */
    if(e.e==='embaralhou' || e.e==='espaco'){
      const b = s?.boss;
      if(b) golpe(b); else SFX.chefe();
      for(const id of (e.cartas||[])) onda(id, b?.cor || '#b478ff');
      aviso('EMBARALHOU', b ? esc(b.nome) : 'trocaram de lugar', b?.cor || '#b478ff');
    }
    if(e.e==='espelhou'){
      golpe(s?.boss); clarao('rgba(216,216,232,.34)');
      const m = $('#mesa');
      if(m){ m.classList.remove('virando'); void m.offsetWidth; m.classList.add('virando');
             setTimeout(()=>m.classList.remove('virando'), 700); }
      aviso('ESPELHOU', 'o lado trocou', '#dbe4f5');
    }
    if(e.e==='esqueceu'){
      golpe(s?.boss);
      const alvo = el(e.carta);
      if(alvo){ alvo.classList.remove('apagada'); void alvo.offsetWidth;
                alvo.classList.add('apagada');
                setTimeout(()=>alvo.classList.remove('apagada'), 760); }
      aviso('ESQUECEU', 'ele comeu uma carta da sua memória', '#ff6fae');
    }
    if(e.e==='sumiu'){
      golpe(s?.boss); clarao('rgba(127,212,255,.34)');
      aviso('SUMIU', 'um par deixou o tabuleiro', '#4fb8ff');
      for(const id of (e.cartas||[])){ faiscas(id, s?.boss?.cor || '#4fb8ff', 12);
                                       saindo.push(id); } }
    if(e.e==='orfa') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='mimic'){ aviso('MIMIC', 'era cópia', '#ff6fae');
      for(const id of (e.cartas ? e.cartas : [e.carta])) if(id!=null) onda(id, '#ff6fae'); }
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

  /* A META BATIDA É NOTÍCIA, NÃO FIM. Ela precisa ser comemorada com a mesma
     força de antes — era ali que a sala acabava — e precisa deixar claro, na
     mesma respiração, que dá para continuar. */
  if(rel.eventos.some(e=>e.e==='meta')){
    SFX.vitoria(); clarao('rgba(102,230,166,.42)');
    aviso('META BATIDA', 'a sala está ganha — continue somando', '#4fe08a');
    medidores();
    await espera(950);
  }
  if(rel.eventos.some(e=>e.e==='vitoria')){
    const m = rel.eventos.find(e=>e.e==='vitoria').motivo;
    SFX.vitoria(); clarao('rgba(102,230,166,.5)');
    aviso('SALA VENCIDA', m==='tabuleiro' ? 'tabuleiro limpo'
        : m==='foco' ? 'acabou o foco, mas a meta estava feita'
        : m==='escolha' ? 'você fechou com as viradas na mão'
        : 'acabaram as viradas', '#4fe08a');
    await espera(900);
  }
  if(rel.eventos.some(e=>e.e==='derrota')){
    const m = rel.eventos.find(e=>e.e==='derrota').motivo;
    SFX.derrota(); clarao('rgba(255,106,90,.55)');
    aviso('SALA PERDIDA', m==='foco' ? 'acabou o foco'
        : m==='viradas' ? 'acabaram as viradas' : 'acabaram as cartas', '#ff4f52');
    await espera(1000);
  }
}
/* APONTAR uma carta. A borda piscando avisa, mas não puxa o olho de quem
   está varrendo a grade: o orbe atrás e o facho de cima é que fazem a carta
   virar o único lugar da tela onde tem luz. */
function piscar(id){
  const e = $('#mesa')?.querySelector(`[data-c="${id}"]`);
  if(!e) return;
  e.classList.add('pisca');
  facho(id);
  const o = efeito(id, 'orbe', '#4fb8ff', 2500);
  if(o) o.style.zIndex = 2;
  setTimeout(()=>e.classList.remove('pisca'), 2500);
}

$('#mesa').addEventListener('click', e=>{
  const b = e.target.closest('[data-c]');
  if(b) tocarCarta(Number(b.dataset.c));
});

/* ═══════════════════ ferramenta ═══════════════════ */
$('#bfim').onclick = async ()=>{
  if(travado || !run?.sala?.passou) return;
  SFX.clique();
  travado = true;
  const rel = run.encerrarSala();
  travado = false;
  if(rel.erro) return;
  SFX.vitoria(); clarao('rgba(102,230,166,.5)');
  aviso('SALA FECHADA', `+${nf(rel.eventos[0]?.sobra ?? 0)} moedas pelas viradas`, '#4fe08a');
  medidores();
  await espera(950);
  seguir();
};

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
  if(rel.erro){ aviso('NÃO DÁ', rel.por || rel.erro, '#ff4f52'); medidores(); return; }
  SFX.revelar();
  for(const e of rel.eventos){
    if(e.e==='revelou') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='voltou') aviso('DESFEITO', 'o último erro voltou', '#b478ff');
    if(e.e==='transmutou'){ aviso('TRANSMUTADO', 'virou espelho', '#dbe4f5'); onda(e.carta,'#dbe4f5'); }
    if(e.e==='concentrou') aviso('CONCENTRAÇÃO', 'multiplicador dobrado', '#ffc23c');
    if(e.e==='emparelhou'){
      aviso('MÃO LEVE', 'estas duas agora são par', '#4fe08a');
      raio(e.cartas[0], e.cartas[1], '#4fe08a');
      for(const id of e.cartas){ onda(id, '#4fe08a'); piscar(id); }
      /* as que perderam a dupla precisam ser APONTADAS. Sem isso o jogador só
         descobre que uma carta virou órfã quando erra com ela — e aí a
         ferramenta que veio ajudar parece ter sabotado o tabuleiro. */
      for(const id of (e.orfas||[])) piscar(id); }
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
  ficha(`<div class="pecao" style="--fc:var(--ouro)">
      <div class="ic">${ICO.vista}</div>
      <h3>${esc(f.nome)}</h3>
      <p class="tx">Escolha o que revelar no tabuleiro.</p>
    </div>
    <div class="vit" style="margin-top:13px">${chaves.map(k=>{
      const o = campo==='tipo' ? TIPOS[k] : FAMILIAS[k];
      const ic = campo==='tipo' ? (ICO[k]||ICO.normal) : svgGlifo(k, 0, 'gl');
      const n = run.sala.fechadas().filter(c=>(campo==='tipo'?c.tipo:c.fam)===k).length;
      return `<button class="lad" data-esc="${k}" style="--fc:${o.cor}">
        <span class="agu">${ic}</span><span class="qt">${n}</span>
        <span class="ic">${ic}</span>
        <span class="nm">${esc(o.nome)}</span>
        <span class="tg">${n} fechada${n>1?'s':''}</span></button>`;
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
    <div class="pecao" style="--fc:${s.boss ? s.boss.cor : 'var(--ouro)'}">
      <div class="ic">${s.boss ? (ICO_CHEFE[s.boss.id]||'') : ICO.meta}</div>
      <h3>${s.boss ? esc(s.boss.nome) : 'Sala comum'}</h3>
      ${s.boss ? `<p class="tx">${esc(s.boss.regra)}</p>
                  <p class="nt">${esc(s.boss.dica)}</p>` : ''}
    </div>
    <div class="meds" style="margin-top:13px">
      ${medalha(ICO.meta, nf(s.meta), 'meta', 'var(--ouro)', true)}
      ${medalha(ICO.normal, s.pares, 'pares', '#4fb8ff')}
      ${medalha(ICO.virada, s.viradasMax, 'viradas', '#4fe08a')}
      ${medalha(ICO.foco, s.focoMax, 'foco', 'var(--vermelho)')}
    </div>
    <div class="rot" style="margin:15px 0 6px">famílias no tabuleiro</div>
    ${vitrine('familia', s.familias.map(f=>f.id))}
    <div class="rot" style="margin:15px 0 6px">cartas que já apareceram</div>
    ${vitrine('carta', tipos.map(t=>t.id))}
    <div class="rot" style="margin:15px 0 6px">a escada do combo</div>
    ${vitrine('combo', COMBOS.slice(1).map(c=>String(c.n)))}`);
};

/* ═══════════════════════════════════════════ O GUIA
   O jogador disse que não entendia o que fazer, e estava certo: o jogo
   explicava tudo num menu que ninguém abre ANTES de jogar. Explicação que
   mora em outra tela é explicação que não existe. Então a primeira sala
   ensina apontando — recorta a coisa na tela, fala dela em duas frases, e
   sai da frente. */
const PASSOS_GUIA = [
  { alvo:'#mesa', t:'Vire duas cartas',
    p:'Toque uma, depois outra. Se tiverem o mesmo desenho, o par fecha, vale '
     +'pontos e fica no tabuleiro carimbado.' },
  { alvo:'#quadro', t:'Chegue nos pontos da meta',
    p:'Você vence a sala batendo este número. Não precisa limpar o tabuleiro — '
     +'nas salas grandes nem dá tempo.' },
  { alvo:'#combo', t:'Emende os acertos',
    p:'Cada par fechado sem errar no meio multiplica tudo. É aqui que o placar '
     +'cresce de verdade — dois pares emendados valem muito mais que dois separados.' },
  { alvo:'#mvir', t:'As viradas são o relógio',
    p:'Cada tentativa de duas cartas gasta uma virada. Se acabarem antes da meta, '
     +'a run acaba.' },
  { alvo:'#mfoc', t:'O foco é o quanto você pode esquecer',
    p:'Errar duas cartas que você NUNCA viu é de graça — explorar faz parte. '
     +'Errar duas que você JÁ viu custa um foco. Zerou, perdeu a sala.' },
  { alvo:'#bfer', t:'A ferramenta da sua classe',
    p:'Cada classe tem uma, com usos contados. Guarde para a hora em que ela '
     +'salva a sala.' },
];
function guia(i=0){
  const g = $('#guia');
  const fim = ()=>{ g.classList.remove('on'); localStorage.setItem('mnemonic.guia','1'); };
  if(i >= PASSOS_GUIA.length) return fim();
  const passo = PASSOS_GUIA[i];
  const el = $(passo.alvo);
  if(!el) return guia(i+1);
  const r = el.getBoundingClientRect(), pad = 9;
  const f = g.querySelector('.furo');
  f.style.left = (r.left-pad)+'px'; f.style.top = (r.top-pad)+'px';
  f.style.width = (r.width+pad*2)+'px'; f.style.height = (r.height+pad*2)+'px';
  const fala = g.querySelector('.fala');
  /* a fala vai para o lado OPOSTO do recorte, senão tapa o que está mostrando */
  const cabeEmbaixo = r.bottom < innerHeight*0.52;
  fala.style.top    = cabeEmbaixo ? (r.bottom+pad+16)+'px' : 'auto';
  fala.style.bottom = cabeEmbaixo ? 'auto' : (innerHeight - r.top + pad + 16)+'px';
  g.querySelector('.passo').textContent = `passo ${i+1} de ${PASSOS_GUIA.length}`;
  g.querySelector('h4').textContent = passo.t;
  g.querySelector('p').textContent = passo.p;
  g.classList.add('on');
  $('#guiaOk').onclick = ()=>{ SFX.clique(); guia(i+1); };
  $('#guiaPular').onclick = ()=>{ SFX.clique(); fim(); };
}
function talvezGuia(){
  if(localStorage.getItem('mnemonic.guia')==='1') return;
  if(run.mundo!==0 || run.indice!==0) return;
  setTimeout(()=>{ if(telaAtual==='sala') guia(0); }, 800);
}

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
    ${u && !tesouro ? `<div class="op c-ouro" style="--fc:#ffc23c;cursor:default;margin-bottom:10px">
      <div class="stats">
        <span>pontos <b style="color:var(--ouro)">${nf(u.pontos)}</b></span>
        ${u.sobra>0 ? `<span>viradas de sobra <b>${u.sobra}</b></span>` : ''}
        ${u.extra ? `<span>bônus <b>+${u.extra} moedas</b></span>` : ''}
      </div></div>` : ''}
    <div class="rol"><div class="grade">
      ${ofertas.length ? ofertas.map((r,i)=>`
        <button class="op ${classePlaca(RARIDADE[r.r])} ${r.r!=='comum'?'brilha':''}"
                data-pega="${r.id}" style="--fc:${RARIDADE[r.r]};animation-delay:${i*70}ms">
          ${r.r==='lendaria' ? '<span class="fita">lendária</span>' : ''}
          <span class="agua">${icoReliquia(r.id)}</span>
          <span class="cab"><span class="gf">${icoReliquia(r.id)}</span>
            <h3>${esc(r.nome)}</h3></span>
          <p>${esc(r.d)}</p>
          <div class="pr" style="color:${RARIDADE[r.r]}">${r.r}</div>
        </button>`).join('')
        : '<p class="mini">Não sobrou relíquia nenhuma para oferecer.</p>'}
    </div></div>
    <div class="pe"><button class="bt g" id="pular">SEGUIR SEM PEGAR</button></div>`;
  $$('#t-premio [data-pega]').forEach(b=>b.onclick = ()=>{
    SFX.premio(); clarao('rgba(239,181,75,.4)');
    if(run.ganharReliquia(b.dataset.pega)){ run.passar(); seguir(); }
    else aviso('NÃO DEU', 'essa não está na oferta', '#ff4f52');
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
          <button class="op ${classePlaca(cor)} ${i.r==='lendaria'?'brilha':''}"
            data-compra="${i.id}" style="--fc:${cor}" ${i.vendido || caro ? 'disabled' : ''}>
            ${i.vendido ? '<span class="vendido">vendido</span>' : ''}
            <span class="agua">${i.id.startsWith('__') ? ICO.tesouro : icoReliquia(i.id)}</span>
            <span class="cab"><span class="gf">${i.id.startsWith('__') ? ICO.tesouro : icoReliquia(i.id)}</span>
              <h3>${esc(i.nome)}</h3></span>
            <p>${esc(i.d)}</p>
            <div class="pr" style="color:${caro ? 'var(--osso3)' : 'var(--ouro)'}">
              ${ICO.moeda}${nf(i.preco)}</div>
          </button>`;
        }).join('')}
      </div></div>
      <div class="pe"><button class="bt p g" id="sair">SAIR DA LOJA</button></div>`;
    t.querySelectorAll('[data-compra]').forEach(b=>b.onclick = ()=>{
      const r = run.comprar(b.dataset.compra);
      if(r.ok){ SFX.moeda(); aviso('COMPRADO', esc(r.item.nome)); desenhar(); }
      else aviso('NÃO DÁ', r.por, '#ff4f52');
    });
    $('#sair').onclick = ()=>{ SFX.clique(); run.passar(); seguir(); };
  };
  desenhar();
}

/* ═══════════════════════════════════════════ EVENTO / FOGUEIRA */
/* ═══════════ A TROCA, MOSTRADA ═══════════
   "-1 relíquia, +60 moedas" é a descrição de um contrato, não de uma jogada.
   O jogador não sabe QUAL relíquia sai — e é exatamente essa a decisão: dar a
   Coroa por sessenta moedas é péssimo, dar a Bolsa Furada é ótimo, e as duas
   linhas de texto são idênticas.

   Aqui a opção vira uma BALANÇA: o que sai à esquerda, com a cara da peça, o
   que entra à direita. O motor responde o que vai sair (`previaEvento`), e é
   a mesma resposta que ele vai usar quando a escolha acontecer — vem do lugar
   e não do relógio, senão a tela mentiria de boa-fé. */
const fichaSai = (id, vazio) => {
  if(vazio) return `<span class="tf oculta"><span class="ic">${ICO.recusa}</span>
    <b>você não tem nenhuma</b></span>`;
  const r = POR_ID[id];
  if(!r) return `<span class="tf"><span class="ic">${ICO.reliquia}</span>
    <b>uma relíquia</b></span>`;
  return `<span class="tf" style="--fc:${RARIDADE[r.r]}">
    <span class="ic">${icoReliquia(id)}</span>
    <b>${esc(r.nome)}</b><i>${esc(r.r)}</i></span>`;
};
const fichaVem = q => {
  if(q === '?') return `<span class="tf oculta"><span class="ic">${ICO.reliquia}</span>
    <b>? ? ?</b><i>ao acaso</i></span>`;
  const cor = RARIDADE[q] || 'var(--ouro)';
  return `<span class="tf" style="--fc:${cor}"><span class="ic">${ICO.reliquia}</span>
    <b>relíquia</b><i>${esc(q)}</i></span>`;
};
const fichaNum = (ico, txt, cor) =>
  `<span class="tf" style="--fc:${cor}"><span class="ic">${ico}</span>
     <b>${esc(txt)}</b></span>`;

function troca(p, o){
  const sai = [], vem = [];
  if(p.leva) sai.push(fichaSai(p.leva));
  else if(o.leva) sai.push(fichaSai(null, p.vazio));
  /* moeda também é coisa que se perde, e o pedido era esse: mostrar o preço
     do lado de quem paga, e não escondido numa vírgula do meio da frase */
  if(p.custa) sai.push(fichaNum(ICO.moeda, '−'+p.custa, '#ffc23c'));
  for(const q of (p.ganha || [])) vem.push(fichaVem(q));
  if(p.moedas) vem.push(fichaNum(ICO.moeda, '+'+p.moedas, '#ffc23c'));
  if(p.foco)   vem.push(fichaNum(ICO.foco, '+'+p.foco+' foco', '#ff4f52'));
  if(p.viradas) vem.push(fichaNum(ICO.virada, '+'+p.viradas+' viradas', '#4fb8ff'));
  if(p.extra)  vem.push(fichaNum(ICO.combo, p.extra, '#ffa24d'));
  /* opção que não mexe em relíquia continua dizendo o que faz, como sempre —
     não vale transformar "+2 viradas" numa balança de uma perna só */
  if(!sai.length && !vem.length) return `<p>${esc(o.d)}</p>`;
  return `<span class="balanca">
      <span class="lado sai">${sai.join('') || '<i class="nada">nada</i>'}</span>
      <span class="seta">${ICO.seta}</span>
      <span class="lado vem">${vem.join('') || '<i class="nada">nada</i>'}</span>
    </span>`;
}

function telaEvento(){
  const t = $('#t-evento');
  const ev = run.evento();
  if(!ev){ run.passar(); return seguir(); }
  const fogo = run.tipoSala()==='descanso';
  const cor = fogo ? '#ffa24d' : '#4fb8ff';
  const previa = run.previaEvento() || ev.ops.map(()=>({}));
  t.innerHTML = `
    <div class="topo-linha"><div class="cabeca">
      <div class="rot" style="color:${cor}">${fogo ? 'fogueira' : 'evento'}</div>
      <h2 class="tit">${esc(ev.nome)}</h2>
    </div></div>
    <div class="rol">
      <div class="op ${classePlaca(cor)}" style="--fc:${cor};cursor:default">
        <span class="agua">${fogo ? ICO.fogueira : ICO.evento}</span>
        <p style="font-size:14.5px;line-height:1.6;color:var(--osso)">${esc(ev.txt)}</p>
      </div>
      <div class="hr"></div>
      <div class="grade um">${ev.ops.map((o,i)=>`
        <button class="op ${classePlaca(cor)} ${previa[i].vazio?'inutil':''}"
                data-op="${i}" style="--fc:${cor}">
          <h3>${esc(o.txt)}</h3>
          ${troca(previa[i], o)}
        </button>`).join('')}</div>
    </div>`;
  t.querySelectorAll('[data-op]').forEach(b=>b.onclick = ()=>{
    const r = run.escolher(Number(b.dataset.op));
    SFX.premio();
    if(r.ok){
      t.querySelector('.rol').innerHTML =
        `<div class="op ${classePlaca(cor)}" style="--fc:${cor};cursor:default">
           <p style="font-size:15px;line-height:1.6;color:var(--osso)">${esc(r.txt)}</p></div>`;
      setTimeout(()=>seguir(), 1500);
    }
  });
}

/* ═══════════════════════════════════════════ FIM */
/* ═══════════════════════════════════════════ FIM
   A ÚLTIMA TELA É A QUE MAIS SE OLHA. Ela chega no momento em que a pessoa
   parou de jogar e está decidindo se joga de novo, e era a mais fraca do
   jogo: um selo cortado no topo, um número solto encostado na margem
   esquerda, seis fichas com uma barrinha de cor e as relíquias reduzidas a
   comprimidos que não deixavam ver a arte que elas ganharam.

   Agora ela é montada com as mesmas peças do resto: a marca do desfecho
   dentro de uma CARTA de verdade (moldura pintada e tudo), o placar numa
   placa 9-slice, as estatísticas em placas e a coleção na mesma VITRINE que
   o catálogo usa — tocar numa relíquia abre a ficha dela, igualzinho. */
function telaFim(){
  const p = run.placar();
  const venceu = run.venceu;
  const u = run.ultimaSala;
  /* A RUN ENTRA NO CADERNO AQUI, e só aqui. Anotar em `_fecharSala` seria
     anotar salas, não runs; anotar no botão de publicar deixaria de fora quem
     não publica. `anotarRun` recusa a mesma run duas vezes, o que importa
     porque esta tela é remontada toda vez que se volta para ela. */
  colher();
  anotarRun(run);
  const novasMedalhas = conferirConquistas();
  (venceu ? SFX.vitoria : SFX.derrota)();
  clarao(venceu ? 'rgba(102,230,166,.4)' : 'rgba(255,106,90,.4)');
  const cor  = venceu ? '#4fe08a' : '#ff4f52';
  /* a carta do desfecho usa a moldura que já existe: ouro para quem chegou,
     coral para quem caiu */
  const mold = venceu ? 'm-ouro' : 'm-coral';
  const porque = venceu ? `Seis mundos, ${p.est.salas} salas vencidas.`
    : `Caiu no mundo ${run.mundo+1}, sala ${run.indice+1}`
      + (u?.motivo==='foco'      ? ' — o foco acabou.'
       : u?.motivo==='viradas'   ? ' — as viradas acabaram.'
       : u?.motivo==='tabuleiro' ? ' — o tabuleiro acabou antes da meta.' : '.');

  $('#t-fim').innerHTML = `
    <div class="rol">
      <div class="fimtopo">
        <div class="ct temold ${mold} fimsel" style="--fc:${cor}">
          <span class="fx"><span class="ff">${venceu ? ICO.meta : ICO.recusa}</span></span>
        </div>
        <h2 class="grandao" style="color:${cor};--brilho:${cor}">
          ${venceu ? 'VOCÊ LEMBROU' : 'VOCÊ ESQUECEU'}</h2>
        <p class="sub">${esc(porque)}</p>
      </div>

      <div class="op ${classePlaca(venceu ? '#4fe08a' : '#ff4f52')} fimplacar"
           style="--fc:${cor};cursor:default">
        <span class="agua">${venceu ? ICO.meta : ICO.recusa}</span>
        <div class="rot">pontos da run</div>
        <div class="placarfim">${nf(p.pontos)}</div>
        <div class="fimlinha">
          <span>${ICO.semente}${esc(p.semente)}</span>
          <span>${ICO.prova}${p.jogadas} jogadas</span>
        </div>
      </div>

      <div class="rot fimrot">o que ficou da run</div>
      <div class="meds">
        ${medalha(ICO.combate, p.est.salas, 'salas', '#4fe08a')}
        ${medalha(ICO.feito, p.est.acertos, 'pares', '#ffc23c')}
        ${medalha(ICO.recusa, p.est.erros, 'erros', '#ff4f52')}
        ${medalha(ICO.combo, p.est.maiorCombo, esc(degrauCombo(p.est.maiorCombo).nome),
                  corDoCombo(p.est.maiorCombo), true)}
        ${medalha(ICO.moeda, nf(p.est.moedasGanhas), 'moedas', '#ffc23c')}
        ${medalha(ICO.virada, p.est.viradasSobrando, 'viradas de sobra', '#4fb8ff')}
      </div>

      <div class="rot fimrot">quem jogou</div>
      <div class="op ${classePlaca(run.C.cor)} fimclasse" style="--fc:${run.C.cor};cursor:default">
        <span class="cab"><span class="gf">${ICO_CLASSE[run.classeId]||''}</span>
          <h3>${esc(run.C.nome)}</h3></span>
        <p class="lm">${esc(run.C.lema)}</p>
      </div>

      ${novasMedalhas.length ? `
        <div class="rot fimrot">${novasMedalhas.length === 1
          ? 'medalha nova' : novasMedalhas.length+' medalhas novas'}</div>
        ${vitrine('conquista', novasMedalhas.map(c=>c.id))}` : ''}

      ${p.reliquias.length ? `
        <div class="rot fimrot">a coleção desta run</div>
        ${vitrine('reliquia', p.reliquias)}` : ''}
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
  let nome = (localStorage.getItem('mnemonic.nome') || '').trim();
  if(!nome){
    nome = (await perguntar({
      dica: 'ranking mundial',
      titulo: 'Como você quer aparecer?',
      texto: 'Este nome sobe junto com o seu placar e com a lista das suas '
           + 'jogadas. Fica guardado neste aparelho — na próxima run o jogo '
           + 'não pergunta de novo.',
      ok: 'PUBLICAR',
    }) || '').trim();
  }
  if(!nome) return;
  localStorage.setItem('mnemonic.nome', nome.slice(0,22));
  bt.disabled = true; bt.textContent = 'MANDANDO…';
  try {
    const r = await RANK.publicar(run.pacote(), nome.slice(0,22));
    if(r.ok){
      anotarPublicacao(); conferirConquistas();
      bt.textContent = `PUBLICADO EM ${r.relays} RELAYS`;
      setTimeout(()=>{ abaRank = run.diario ? 'diario' : 'mundial'; ir('rank'); }, 900);
    } else if(r.por === 'menor'){
      /* O QUADRO GUARDA O MAIOR, e isso precisa ser DITO. O placar sobe num
         evento substituível: publicar esta run apagaria a melhor. Um botão que
         some sem explicar pareceria defeito — e a notícia aqui é boa. */
      bt.textContent = `SEU RECORDE DE ${nf(r.melhor)} CONTINUA NO QUADRO`;
      bt.classList.add('bom');
      setTimeout(()=>{ abaRank = run.diario ? 'diario' : 'mundial'; ir('rank'); }, 1600);
    } else {
      bt.textContent = 'NÃO DEU — TENTE DE NOVO';
      bt.disabled = false;
    }
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
    <div class="rodape-rank">
      <p class="mini">Cada placar vem com a lista de jogadas. Seu aparelho REFAZ a
        run a partir da semente e só mostra a linha se o número bater.</p>
      <button class="bt pq" id="bdiag">TESTAR CONEXÃO</button>
    </div>`;
  t.querySelectorAll('[data-aba]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); abaRank = b.dataset.aba; telaRank();
  });
  $('#bdiag').onclick = ()=>{ SFX.clique(); mostrarDiagnostico(); };
  carregarRank();
}

/* ═══════ O QUADRO APARECE ANTES DE ESTAR PRONTO ═══════
   A tela ficava em branco por até dez segundos: primeiro esperava os cinco
   relays (ou sete segundos de prazo), e só então recalculava a run de CADA
   linha, uma atrás da outra, na mesma thread que desenha. Do lado de quem
   olha isso é indistinguível de travado.

   Agora são três coisas ao mesmo tempo:

     · o quadro da última visita aparece INSTANTANEAMENTE, do cache, com um
       aviso de que está atualizando;
     · cada lote que chega dos relays já é desenhado, sem esperar o resto;
     · a conferência anti-cheat roda em fatias, cedendo a vez para o navegador
       entre elas, e guarda o que já conferiu — a mesma linha não é recalculada
       duas vezes.

   O que NÃO mudou: nenhuma linha entra no quadro sem ser recalculada. A
   pressa é só na ordem das coisas. */
const RANK_CACHE = 'mnemonic.rank.';
const jaConferido = new Map();          // id do evento → passou ou não

/* recalcula em fatias: a cada 6 linhas devolve a vez para a tela respirar */
async function conferirLinhas(linhas){
  const bons = [];
  for(let i = 0; i < linhas.length; i++){
    const l = linhas[i];
    const id = l.ev?.id;
    let passa = id != null ? jaConferido.get(id) : undefined;
    if(passa === undefined){
      passa = verificar(l.placar, l.registro).ok;
      if(id != null) jaConferido.set(id, passa);
    }
    if(passa) bons.push(l);
    if(i % 6 === 5) await new Promise(r=>setTimeout(r, 0));
  }
  bons.sort((x,y)=>y.placar.pontos - x.placar.pontos);
  return bons;
}

function pintarRank(bons, atualizando){
  const alvo = $('#rlista'); if(!alvo) return;
  if(!bons.length){
    alvo.innerHTML = semRanking(
      atualizando ? 'Procurando nos relays…' : 'Ninguém conferido ainda nesta aba.',
      atualizando ? 'O quadro aparece assim que o primeiro placar chegar.'
                  : 'Jogue uma run e seja o primeiro do quadro.');
    return;
  }
  const eu = localStorage.getItem('mnemonic.nome');
  const CORP = ['#ffc23c','#cfd6e4','#c08a4a'];
  const topo = bons.slice(0,3);
  const resto = bons.slice(3,60);
  const ordem = [1,0,2].filter(i=>topo[i]);
  alvo.innerHTML = `
    ${atualizando ? '<div class="atz">atualizando…</div>' : ''}
    <div class="podio">${ordem.map(i=>{
      const l = topo[i];
      return `<div class="pod p${i+1}" style="--fc:${CORP[i]}">
        <div class="cor">${i+1}</div>
        <div class="qm">${esc(l.nome)}</div>
        <div class="pt num">${nf(l.placar.pontos)}</div>
        <div class="cl">${esc(CLASSES[l.placar.classe]?.nome||l.placar.classe)}</div>
      </div>`;
    }).join('')}</div>
    ${resto.length ? `<div class="fila">${resto.map((l,i)=>`
      <div class="rk ${l.nome===eu?'eu':''}">
        <div class="n num">${i+4}</div>
        <div class="cx">
          <div class="qm">${esc(l.nome)}</div>
          <div class="sb">${esc(CLASSES[l.placar.classe]?.nome||l.placar.classe)}
            · mundo ${l.placar.mundo+1} · ${l.placar.est?.salas??0} salas
            ${l.placar.venceu?' · completou':''}</div>
        </div>
        <div class="pt num">${nf(l.placar.pontos)}</div>
      </div>`).join('')}</div>` : ''}`;
}

/* o quadro da última visita, para a tela nunca abrir vazia. Guarda só o que
   se desenha — nunca o registro de jogadas, que é grande e já foi conferido */
function lerCache(aba){
  try { const c = JSON.parse(localStorage.getItem(RANK_CACHE+aba) || 'null');
        return Array.isArray(c?.linhas) ? c.linhas : []; } catch(e){ return []; }
}
function gravarCache(aba, bons){
  try { localStorage.setItem(RANK_CACHE+aba, JSON.stringify({ quando:Date.now(),
    linhas: bons.slice(0,60).map(l=>({ nome:l.nome, placar:l.placar })) })); }
  catch(e){}
}

let rankRodada = 0;
/* O QUADRO É GLOBAL — E DÁ PARA CONFERIR.
   "Se meu amigo jogar da casa dele, aparece para mim?" A resposta é sim por
   construção: os relays são públicos e todo aparelho lê o mesmo lugar. Mas
   isso é uma promessa, e promessa não serve para quem está olhando uma tela
   vazia. Este painel testa cada relay na frente do jogador e separa as três
   coisas que de fora parecem a mesma: "ninguém publicou ainda", "esta rede
   bloqueia" e "aquele relay caiu". */
async function mostrarDiagnostico(){
  const meu = (()=>{ try { return RANK.pubDe(RANK.chave()).slice(0,16); }
                     catch(e){ return '—'; } })();
  $('#folhac').innerHTML = `
    <div class="cabeca" style="margin-bottom:11px">
      <div class="rot">ranking mundial</div>
      <h2 class="tit">Testando a conexão</h2>
    </div>
    <p class="mini" style="margin-bottom:11px">O quadro não tem servidor: cada
      placar fica em relays públicos, e qualquer aparelho no mundo lê os
      mesmos. Basta UM relay responder para o ranking funcionar.</p>
    <div id="diaglista"><p class="mini">Falando com os relays…</p></div>
    <div class="hr"></div>
    <p class="mini">seu identificador neste aparelho: <b>${esc(meu)}</b></p>
    <button class="bt g" data-fechar style="margin-top:11px">FECHAR</button>`;
  $('#folha').classList.add('on');
  const rs = await RANK.diagnostico();
  const alvo = $('#diaglista'); if(!alvo) return;
  const vivos = rs.filter(r=>r.respondeu).length;
  const lidos = Math.max(0, ...rs.map(r=>r.eventos));
  alvo.innerHTML = `
    <div class="op ${classePlaca(vivos ? '#4fe08a' : '#ff4f52')}"
         style="--fc:${vivos ? '#4fe08a' : '#ff4f52'};cursor:default;margin-bottom:10px">
      <h3>${vivos ? `${vivos} de ${rs.length} relays responderam`
                  : 'nenhum relay respondeu'}</h3>
      <p>${vivos
        ? (lidos ? `Há ${lidos >= 20 ? '20 ou mais' : lidos} placar${lidos>1?'es':''} publicado${lidos>1?'s':''} para ler. O ranking está no ar.`
                 : 'A conexão funciona, mas ainda não há placar publicado. Seja o primeiro.')
        : 'Pode ser a rede deste aparelho — algumas redes de empresa e escola bloqueiam WebSocket.'}</p>
    </div>
    <div class="fila">${rs.map(r=>`
      <div class="rk">
        <div class="n" style="color:${r.respondeu?'#4fe08a':'#ff4f52'};font-size:15px">
          ${r.respondeu?'✓':'✗'}</div>
        <div class="cx">
          <div class="qm">${esc(r.url.replace('wss://',''))}</div>
          <div class="sb">${r.respondeu
            ? `${r.eventos} placar${r.eventos===1?'':'es'} · ${r.ms}ms`
            : esc(r.erro || 'não respondeu')}</div>
        </div>
      </div>`).join('')}</div>`;
}

async function carregarRank(){
  const alvo = $('#rlista'); if(!alvo) return;
  const aba = abaRank;
  const rodada = ++rankRodada;
  const viva = ()=> rodada === rankRodada && abaRank === aba
                 && $('#t-rank').classList.contains('on');

  pintarRank(lerCache(aba), true);

  let ultimo = 0;
  const aoChegar = linhas => {
    if(!viva()) return;
    const agora = Date.now();
    if(agora - ultimo < 250) return;      /* um redesenho a cada quarto de segundo */
    ultimo = agora;
    conferirLinhas(linhas).then(bons=>{ if(viva()) pintarRank(bons, true); });
  };

  let linhas = [];
  try { linhas = await RANK.buscar({ aba, semente:semeanteDoDia(), aoChegar }); }
  catch(e){
    if(viva() && !lerCache(aba).length)
      alvo.innerHTML = semRanking('Não deu para falar com os relays.',
        'Verifique a conexão e tente de novo.');
    return;
  }
  if(!viva()) return;
  const bons = await conferirLinhas(linhas);
  if(!viva()) return;
  /* achou a própria linha no quadro com mais pontos do que este aparelho
     lembra? Então o recorde é aquele — é assim que trocar de navegador ou
     limpar o armazenamento deixa de derrubar o que já está publicado. */
  try {
    const meu = RANK.pubDe(RANK.chave());
    for(const l of bons){
      if(l.ev?.pubkey !== meu) continue;
      RANK.anotarMelhor(RANK.chaveDoPlacar(l.placar), l.placar.pontos);
    }
  } catch(e){}
  gravarCache(aba, bons);
  if(!bons.length && linhas.length){
    alvo.innerHTML = semRanking('Ninguém conferido ainda nesta aba.',
      `${linhas.length} placares chegaram, e nenhum bateu com as próprias jogadas.`);
    return;
  }
  pintarRank(bons, false);
}
const semRanking = (titulo, sub) => `
  <div class="pecao" style="--fc:#5b6683;padding-top:30px">
    <div class="ic">${ICO.recusa}</div>
    <h3 style="color:var(--osso2)">${esc(titulo)}</h3>
    <p class="nt">${esc(sub)}</p></div>`;

/* ═══════════════════════════════════════════ COMO SE JOGA
   Era o pior lugar do jogo: nove capítulos de texto empilhado, que é
   exatamente o formato que ninguém lê. Agora é uma COLEÇÃO — o menu mostra
   os oito conjuntos como peças, cada conjunto abre a sua vitrine, e o texto
   só aparece quando o jogador toca a peça que quis saber. */
/* quantas peças daquele capítulo já são suas. Capítulo aberto conta inteiro:
   não faz sentido dizer "0/11 palavras" para quem já jogou uma sala. */
function achadosDo(cap, total){
  if(cap === 'conquista') return [...medalhasGanhas()].length;
  return escondeCapitulo(cap) ? Math.min(total, quantosViu(cap)) : total;
}

/* A PLACA DO CADERNO — os números da vida inteira, no topo da coleção.
   Fica aqui e não numa tela própria de propósito: estatística separada do
   que ela mede vira tabela, e tabela ninguém abre. Do lado da vitrine, ela é
   a resposta para "o que eu já fiz com este jogo". */
function placaPerfil(){
  const p = perfil();
  if(!p.runs) return `<p class="mini" style="margin:0 0 12px">
    Jogue uma run e este caderno começa a se encher.</p>`;
  return `
    <div class="rot" style="margin-bottom:6px">o seu caderno</div>
    <div class="meds" style="margin-bottom:13px">
      ${medalha(ICO.semente, nf(p.runs), 'runs', '#63789e')}
      ${medalha(ICO.meta, nf(p.vitorias), `vitórias · ${taxaVitoria()}%`, '#4fe08a')}
      ${medalha(ICO.combate, nf(p.salas), 'salas vencidas', '#ffa24d')}
      ${medalha(ICO.feito, nf(p.pares), 'pares fechados', '#ffc23c')}
      ${medalha(ICO.combo, p.maiorCombo, esc(degrauCombo(p.maiorCombo).nome),
                corDoCombo(p.maiorCombo), true)}
      ${medalha(ICO.prova, nf(p.melhorRun), 'melhor run', '#b478ff')}
      ${medalha(ICO.vista, nf(p.melhorSala), 'melhor sala', '#4fb8ff')}
      ${medalha(ICO.recusa, nf(p.semErro), 'salas sem errar', '#ff6fae')}
    </div>`;
}

let capAtual = null;
function telaLivro(){
  const t = $('#t-livro');
  if(!capAtual){
    t.innerHTML = `
      <div class="topo-linha">
        <button class="bt pq" id="voltarLivro">VOLTAR</button>
        <div class="cabeca"><div class="rot">como se joga</div>
          <h2 class="tit">A coleção</h2></div>
      </div>
      <div class="rol">
        ${placaPerfil()}
        <div class="vit">${CAPITULOS.map(c=>{
          const total = c.lista().length;
          const tem = achadosDo(c.id, total);
          return `
          <button class="lad" data-cap="${c.id}" style="--fc:${c.cor}">
            <span class="agu">${c.ico}</span>
            <span class="qt">${tem < total ? tem+'/'+total : total}</span>
            <span class="ic">${c.ico}</span>
            <span class="nm">${esc(c.nome)}</span>
            <span class="barra"><i style="width:${Math.round(tem*100/total)}%"></i></span>
          </button>`; }).join('')}</div>
        <div style="margin:13px 0"><button class="bt g" id="verGuia">Ver o guia de novo</button></div>
        ${perfil().runs ? `<div style="margin:0 0 13px">
          <button class="bt g" id="esquecerTudo">Esquecer o caderno</button></div>` : ''}
        <div class="rot" style="margin-bottom:6px">em uma frase</div>
        <div class="vit">
          ${['meta','virada','foco','combo'].map(id=>ladrilho('palavra', id)).join('')}
        </div>
      </div>`;
  } else {
    const c = CAPITULOS.find(x=>x.id===capAtual);
    t.innerHTML = `
      <div class="topo-linha">
        <button class="bt pq" id="voltarCap">VOLTAR</button>
        <div class="cabeca"><div class="rot" style="color:${c.cor}">${
          (()=>{ const t=c.lista().length, n=achadosDo(c.id,t);
                 return n<t ? `${n} de ${t}` : `${t} peças`; })()}</div>
          <h2 class="tit">${esc(c.nome)}</h2></div>
      </div>
      <p class="mini" style="flex:0 0 auto;margin:0 0 10px">${esc(c.resumo)}
        <b style="color:var(--osso2)">Toque para abrir.</b></p>
      <div class="rol">${vitrine(c.id, c.lista())}</div>`;
    $('#voltarCap').onclick = ()=>{ SFX.clique(); capAtual = null; telaLivro(); };
  }
  $$('#t-livro [data-cap]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); capAtual = b.dataset.cap; telaLivro();
  });
  const et = $('#esquecerTudo');
  if(et) et.onclick = async ()=>{
    SFX.clique();
    const sim = await confirmar({
      dica:'isto não se desfaz',
      titulo:'Esquecer tudo o que você já viu?',
      texto:'Apaga o caderno inteiro: runs, vitórias, recordes, medalhas e a '
          + 'coleção do que você já encontrou. A run em andamento e o que já '
          + 'está publicado no ranking mundial não são tocados — o quadro é de '
          + 'lá, não daqui.',
      ok:'ESQUECER TUDO',
    });
    if(!sim) return;
    apagarPerfil(); apagarMedalhas(); apagarDescobertas();
    aviso('CADERNO EM BRANCO', 'a coleção começa de novo');
    telaLivro();
  };
  const vg2 = $('#verGuia');
  if(vg2) vg2.onclick = ()=>{ SFX.clique(); localStorage.removeItem('mnemonic.guia');
    if(run?.sala){ ir('sala'); setTimeout(()=>guia(0), 350); }
    else aviso('PRONTO', 'o guia volta na próxima sala'); };
  const v = $('#voltarLivro');
  if(v) v.onclick = ()=>{ SFX.clique(); run ? seguir() : ir('titulo'); };
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
/* RETOMAR CHAMA A MESMA MÁQUINA DO VERIFICADOR, e agora de verdade.
   O comentário aqui já dizia isso, e era mentira: existia uma segunda lista
   de `else if` logo abaixo, e ela não conhecia a jogada `fim` — o
   encerramento de sala por vontade própria, que é a decisão central do jogo.
   Quem fechasse a sala pelas moedas e recarregasse a página voltava com a
   sala aberta de novo, e daí em diante o registro deixava de bater com o
   replay: o ranking recusaria o placar dele, honesto, sem nada explicando.

   Agora é `refazer` do motor, a mesma função que o verificador usa. Não há
   mais duas listas para discordarem. E `replay:false` porque esta run vai
   CONTINUAR sendo jogada: ela precisa registrar as jogadas novas. */
function retomar(){
  let d; try { d = JSON.parse(localStorage.getItem(CHAVE)||'null'); } catch(e){}
  if(!d?.registro?.length) return false;
  const feito = refazer({ semente:d.semente, classe:d.classe, diario:d.diario,
                          registro:d.registro, replay:false });
  if(!feito.ok || feito.run.acabou()) return false;
  run = feito.run; mostrando = new Set();
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
    if(!estaMudo()){ acordar(); SFX.clique(); }
    reavaliar(); pinta(); };
  if(localStorage.getItem('mnemonic.mudo')==='1') mudo(true);
  pinta();
  $('#t-titulo .menu').appendChild(b);
})();
/* MÚSICA TEM BOTÃO PRÓPRIO. Não é preciosismo: num jogo de memória há quem
   queira o estalo do acerto — que é informação — e nada tocando por cima
   enquanto tenta decorar dezoito cartas. Desligar tudo custaria as duas. */
(function botaoMusica(){
  const b = document.createElement('button');
  b.className = 'bt g';
  const pinta = ()=>{ b.textContent = temMusica() ? 'MÚSICA: LIGADA' : 'MÚSICA: DESLIGADA'; };
  b.onclick = ()=>{ acordar(); querMusica(!temMusica());
    if(temMusica()) SFX.clique(); pinta(); };
  pinta();
  $('#t-titulo .menu').appendChild(b);
})();
/* AUTOPLAY. O navegador só deixa tocar depois de um toque, e o primeiro toque
   do jogador costuma ser em "Jogar" — quando a trilha já tinha sido pedida e
   recusada calada. Um toque em qualquer lugar reacorda e repõe o volume. */
document.addEventListener('pointerdown', ()=>{ acordar(); reavaliar(); },
  { passive:true });
/* QUE VERSÃO É ESTA.
   O link do jogo é fixo e serve sempre a última versão, o que é bom até o
   momento em que alguém precisa saber se o que está na tela já é a correção
   de ontem. `document.lastModified` responde isso sem nenhuma manutenção: é a
   data do arquivo que o navegador realmente baixou. Se ela não avançou depois
   de uma atualização, o que está na tela veio do cache. */
(function versao(){
  const el = $('#creditos'); if(!el) return;
  const d = new Date(document.lastModified);
  const q = n => String(n).padStart(2,'0');
  const quando = Number.isNaN(d.getTime()) ? ''
    : ` · versão de ${q(d.getDate())}/${q(d.getMonth()+1)} ${q(d.getHours())}:${q(d.getMinutes())}`;
  el.textContent = `${SALAS.length*MUNDOS} salas · ${LISTA_BOSSES.length} chefes · `
    + `${RELIQUIAS.length} relíquias${quando}`;
})();

ir('titulo');

/* deixa o motor à mão no console — é assim que se investiga um bug de regra */
window.MN = { get run(){ return run; }, Run, verificar, refazer, planoDaSala, RANK,
  CHAVE,
  /* o estado que decide se um toque na carta é aceito. Sem isto à mão, um
     travamento vira adivinhação: não dá para separar "a regra recusou" de "a
     tela ainda estava animando" olhando de fora. */
  get travado(){ return travado; }, get mostrando(){ return [...mostrando]; },
  get alvoPendente(){ return alvoPendente; }, toques: MN_TOQUES, perguntar,
  /* remonta a mesa a partir do estado atual — é por aqui que o teste de tela
     consegue conferir a grade de vários tamanhos sem jogar quarenta salas */
  redesenhar(){ salaViva = run.sala; mesa(true); },
  /* montar uma situação à mão e ver a tela dela. Sem isto, conferir a tela do
     evento do Colecionador exigia jogar até cair naquele evento com relíquias
     na mão — que é o tipo de espera que faz a conferência não acontecer. */
  ir, montar(opts){ run = new Run(opts); mostrando = new Set(); return run; },
  /* a trilha: "não sai som" precisa poder ser diferenciado de "o navegador
     bloqueou o áudio" sem adivinhação */
  musica: MUSICA };
