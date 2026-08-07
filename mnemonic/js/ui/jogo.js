/* ========================================================================
   A TELA — lê o motor e desenha. Ela não decide nada.

   A regra que separa este arquivo de `engine/`: aqui não se calcula ponto,
   não se sorteia carta e não se resolve par. Tudo o que aparece vem de um
   RELATÓRIO que o motor devolveu. Se a tela recalculasse qualquer coisa, o
   número que pisca e o número que contou sairiam diferentes um dia — e é
   sempre o jogador que percebe primeiro.

   A única coisa que a tela decide sozinha é TEMPO: o motor resolve a
   tentativa no mesmo instante, mas quem joga precisa ver as duas cartas
   abertas antes de elas virarem. Por isso existe `mostrando`, um conjunto de
   cartas que a tela segura abertas por meio segundo depois de o motor já ter
   virado a página.
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
const espera = ms => new Promise(r=>setTimeout(r, ms));

/* ---------- estado da TELA (o do jogo mora na Run) ---------- */
let run = null;
let mostrando = new Set();      // cartas que a tela segura abertas
let travado = false;            // durante a animação de uma tentativa
let telaAtual = 'titulo';
let abaRank = 'mundial';

/* ═══════════════════════════════════════════ navegação */
function ir(nome){
  telaAtual = nome;
  $$('.tela').forEach(t=>t.classList.toggle('on', t.id === 't-'+nome));
  if(nome==='classe')  telaClasse();
  if(nome==='mapa')    telaMapa();
  if(nome==='sala')    pintarSala();
  if(nome==='premio')  telaPremio();
  if(nome==='loja')    telaLoja();
  if(nome==='evento')  telaEvento();
  if(nome==='fim')     telaFim();
  if(nome==='livro')   telaLivro();
  if(nome==='rank')    telaRank();
}

/* leva a run para onde ela estiver: é o único lugar que decide isso, para
   não haver dois caminhos discordando sobre em que sala o jogador está */
function seguir(){
  if(!run) return (function botaoSom(){
  const b = document.createElement('button');
  b.className = 'bt g'; b.id = 'bsom';
  const pinta = ()=>{ b.textContent = estaMudo() ? 'SOM: DESLIGADO' : 'SOM: LIGADO'; };
  b.onclick = ()=>{ mudo(!estaMudo());
    localStorage.setItem('mnemonic.mudo', estaMudo()?'1':'0');
    if(!estaMudo()){ acordar(); SFX.clique(); } pinta(); };
  if(localStorage.getItem('mnemonic.mudo')==='1') mudo(true);
  pinta();
  $('#t-titulo .menu').appendChild(b);
})();

ir('titulo');
  if(run.acabou())            return ir('fim');
  if(run.sala)                return ir('sala');
  if(run.aguardandoPremio)    return ir('premio');
  const t = run.tipoSala();
  if(t==='loja')                       return ir('loja');
  if(t==='evento' || t==='descanso')   return ir('evento');
  if(t==='tesouro')                    return ir('premio');
  return ir('mapa');
}

function aviso(txt, sub=''){
  const a = $('#aviso');
  a.querySelector('.a1').textContent = txt;
  a.querySelector('.a2').textContent = sub;
  a.classList.remove('on'); void a.offsetWidth; a.classList.add('on');
  setTimeout(()=>a.classList.remove('on'), 1500);
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

function fichaFamilia(f){
  return verbete(svgGlifo(f.id, 0, 'gl'), esc(f.nome), esc(f.regra),
    `<span class="tag" style="color:${f.cor}">${esc(f.traco)}</span>`);
}
function fichaTipo(t){
  return verbete(ICO[t.id] || ICO.normal, esc(t.nome), esc(t.d),
    `<span class="tag" style="color:${t.cor}">${t.base||10} de base${
      t.mult&&t.mult!==1 ? ' · ×'+t.mult : ''}</span>`);
}
function fichaReliquia(id){
  const r = POR_ID[id]; if(!r) return '';
  return verbete(ICO.reliquia, esc(r.nome), esc(r.d),
    `<span class="tag" style="color:${RARIDADE[r.r]}">${r.r}</span>`);
}

/* ═══════════════════════════════════════════ TÍTULO */
(function fundoAnimado(){
  const f = $('#fundo');
  const n = 14;
  for(let i=0;i<n;i++){
    const e = document.createElement('i');
    e.style.left = (Math.random()*100).toFixed(1)+'%';
    e.style.setProperty('--a', (Math.random()*40-20).toFixed(0)+'deg');
    e.style.animationDuration = (13 + Math.random()*13).toFixed(1)+'s';
    e.style.animationDelay = (-Math.random()*22).toFixed(1)+'s';
    e.style.opacity = (0.25 + Math.random()*0.5).toFixed(2);
    const s = 0.7 + Math.random()*0.7;
    e.style.transformOrigin = '50% 50%';
    e.style.width = (46*s).toFixed(0)+'px'; e.style.height = (61*s).toFixed(0)+'px';
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
function sementeNova(){
  return Math.random().toString(36).slice(2,8) + Date.now().toString(36).slice(-4);
}

function novaRun(classe, diario=false){
  diarioPedido = diario;
  if(!classe) return ir('classe');
  const semente = diario ? semeanteDoDia() : sementeNova();
  run = new Run({ semente, classe, diario });
  mostrando = new Set();
  seguir();
}

function telaClasse(){
  const t = $('#t-classe');
  t.innerHTML = `
    <div class="topo-linha">
      <button class="bt pq" data-ir="titulo">VOLTAR</button>
      <div class="cabeca">
        <div class="rot">${diarioPedido ? 'run diária · mesma semente para todo mundo' : 'nova run'}</div>
        <h2 class="tit">Quem vai lembrar por você?</h2>
      </div>
    </div>
    <div class="rol"><div class="grade">
    ${LISTA_CLASSES.map(c=>`
      <button class="op" data-classe="${c.id}" style="--fc:${c.cor}">
        <span class="gf" style="color:${c.cor}">${ICO_CLASSE[c.id]||''}</span>
        <h3 style="color:${c.cor}">${esc(c.nome)}</h3>
        <div class="lm">“${esc(c.lema)}”</div>
        <p>${esc(c.d)}</p>
        <div class="stats">
          <span>foco ${c.foco}</span>
          <span>${c.viradasBonus>=0?'+':''}${c.viradasBonus} viradas</span>
          <span>${c.moedas} moedas</span>
        </div>
        <div class="pr">${esc(c.ferramenta.nome)} — ${esc(c.ferramenta.d)}</div>
      </button>`).join('')}
    </div></div>`;
  t.querySelectorAll('[data-classe]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); novaRun(b.dataset.classe, diarioPedido);
  });
}

/* ═══════════════════════════════════════════ MAPA */
const NOME_SALA = { combate:'Combate', elite:'Elite', boss:'Chefe', loja:'Loja',
                    evento:'Evento', descanso:'Fogueira', tesouro:'Tesouro' };
const ICO_SALA = { combate:'combate', elite:'elite', boss:'chefe', loja:'loja',
                   evento:'evento', descanso:'fogueira', tesouro:'tesouro' };

function telaMapa(){
  const t = $('#t-mapa');
  const b = run.bossDoMundo();
  const plano = run.plano();
  const tipo = run.tipoSala();
  const ehComb = COMBATE.has(tipo);
  t.innerHTML = `
    <div class="topo-linha">
      <div class="cabeca">
        <div class="rot">mundo ${run.mundo+1} de ${MUNDOS} · sala ${run.indice+1} de ${SALAS.length}</div>
        <h2 class="tit">${esc(NOME_SALA[tipo])}</h2>
      </div>
      <button class="bt pq" data-ir="livro">REGRAS</button>
    </div>
    <div class="trilha">${run.mapa().map(s=>`
      <div class="sala ${s.feito?'feito':''} ${s.atual?'atual':''}">
        <div class="bl" style="color:${s.tipo==='boss'?'#ff6a5a':s.tipo==='elite'?'#e8b44a':'#8b96ac'}">
          ${ICO[ICO_SALA[s.tipo]]||ICO.combate}</div>
        <div class="nm">${esc(NOME_SALA[s.tipo])}</div>
      </div>`).join('')}</div>
    <div class="hr"></div>
    <div class="rol">
      ${ehComb ? `
        <div class="op" style="cursor:default">
          <h3>${plano.pares} pares · ${plano.pares*2} cartas</h3>
          <p>Meta de <b style="color:var(--ouro)">${nf(plano.meta)}</b> pontos
             em <b>${plano.viradas + run.bonusViradas}</b> viradas.</p>
          <p class="mini">Vencer é bater a meta, não limpar o tabuleiro.</p>
        </div>
        ${tipo==='boss' ? `<div class="op" style="border-color:rgba(255,106,90,.45);cursor:default">
          <span class="gf" style="color:var(--perigo)">${ICO_CHEFE[b.id]||''}</span>
          <h3 style="color:var(--perigo)">${esc(b.nome)}</h3>
          <p>${esc(b.regra)}</p><p class="mini">${esc(b.dica)}</p></div>` : ''}
      ` : ''}
      <div class="hr"></div>
      <div class="tabnum">
        <dt>Pontos da run</dt><dd>${nf(run.pontos)}</dd>
        <dt>Moedas</dt><dd>${nf(run.moedas)}</dd>
        <dt>Foco</dt><dd>${run.foco}</dd>
        <dt>Relíquias</dt><dd>${run.reliquias.length}</dd>
      </div>
      ${run.reliquias.length ? `<div class="hr"></div>
        <div class="rot" style="margin-bottom:6px">suas relíquias</div>
        ${run.reliquias.map(fichaReliquia).join('')}` : ''}
    </div>
    <div style="flex:0 0 auto;padding-top:9px">
      <button class="bt p g" id="entrar">${ehComb?'ENTRAR NA SALA':'SEGUIR'}</button>
    </div>`;
  $('#entrar').onclick = ()=>{
    acordar(); SFX.clique();
    if(ehComb){ run.entrar(); mostrando = new Set(); ir('sala'); }
    else seguir();
  };
}

/* ═══════════════════════════════════════════ COMBATE */
function faceAberta(c){
  return c.virada || c.vista || c.marcada || mostrando.has(c.id);
}

let iconesHUD = false;
function pintarSala(){
  const s = run.sala; if(!s) return seguir();
  if(!iconesHUD){
    $('#mvir .i').innerHTML = ICO.virada;
    $('#mfoc .i').innerHTML = ICO.foco;
    $('#mmoe .i').innerHTML = ICO.ouro;
    $('#bregras').innerHTML = ICO.evento;
    iconesHUD = true;
  }
  const b = s.boss;
  $('#chefe').hidden = !b;
  if(b) $('#chefe').innerHTML = `<span class="pico" style="color:${b.cor}">${ICO_CHEFE[b.id]||''}</span>
    <b>${esc(b.nome)}</b><span style="color:var(--txt2)">${esc(b.regra)}</span>`;
  $('#onde').textContent = `M${run.mundo+1} · sala ${run.indice+1}`
    + (run.tipoSala()==='elite' ? ' · elite' : '');
  mesa(true);
  medidores();
}

function medidores(){
  const s = run.sala; if(!s) return;
  $('#pts').textContent = nf(s.pontos);
  $('#meta').textContent = '/ ' + nf(s.meta);
  const pc = Math.min(100, s.pontos/s.meta*100);
  $('#barra').querySelector('i').style.width = pc.toFixed(1)+'%';
  $('#barra').classList.toggle('cheia', pc>=100);

  const v = $('#mvir'); v.querySelector('.v').textContent = s.viradas;
  v.classList.toggle('al', s.viradas<=3);
  $('#mmoe').querySelector('.v').textContent = s.moedas;

  const f = $('#mfoc'); f.classList.toggle('al', s.foco<=1);
  f.querySelector('.focos').innerHTML =
    [...Array(Math.max(s.focoMax, s.foco))].map((_,i)=>
      `<b class="${i < s.foco ? '' : 'off'}"></b>`).join('');

  const d = degrauCombo(s.combo), c = $('#combo');
  c.classList.toggle('zero', s.combo===0);
  c.querySelector('.n').textContent = s.combo ? d.nome : '—';
  c.querySelector('.m').textContent = '×' + s.multCombo().toFixed(1).replace('.',',');

  const fer = run.C.ferramenta, bf = $('#bfer');
  const pode = fer.custoEssencia ? s.essencia >= fer.custoEssencia : s.usosFer > 0;
  bf.disabled = !pode || travado;
  bf.querySelector('.nm').textContent = fer.nome;
  bf.querySelector('.u').textContent = fer.custoEssencia
    ? `${s.essencia}/${fer.custoEssencia} essência` : `${s.usosFer}×`;

  $('#relq').innerHTML = run.reliquias.map(id=>{
    const r = POR_ID[id];
    return `<b data-rel="${id}" style="color:${RARIDADE[r.r]}" title="${esc(r.nome)}">
      ${ICO.reliquia}</b>`;
  }).join('');
  $('#relq').querySelectorAll('[data-rel]').forEach(e=>e.onclick = ()=>{
    SFX.clique();
    ficha(`<div class="rot">relíquia</div>` + fichaReliquia(e.dataset.rel));
  });
}

/* --- a grade: o tamanho da carta sai da caixa que sobrou, nunca do palpite --- */
function ajustar(){
  const s = run?.sala; if(!s || telaAtual!=='sala') return;
  const area = $('#area'), mesaEl = $('#mesa');
  const cols = s.colunas, linhas = Math.ceil(s.cartas.length/cols);
  const g = 6;
  const w = area.clientWidth  - 4;
  const h = area.clientHeight - 4;
  const porL = (w - (cols-1)*g) / cols;
  const porA = (h - (linhas-1)*g) / linhas / 1.34;
  const cel = Math.max(24, Math.min(132, Math.floor(Math.min(porL, porA))));
  mesaEl.style.setProperty('--cel', cel+'px');
  mesaEl.style.gridTemplateColumns = `repeat(${cols}, ${cel}px)`;
  mesaEl.style.setProperty('--r', Math.max(5, Math.round(cel*0.16))+'px');
  mesaEl.dataset.pequena = cel < 44 ? '1' : '';
}
addEventListener('resize', ajustar);

function cartaHTML(c, pequena){
  const f = FAMILIAS[c.fam];
  const t = TIPOS[c.tipo];
  const cor = f ? f.cor : '#cfd6e4';
  const aberta = faceAberta(c);
  const selos = [];
  /* o que o jogo JÁ te contou fica escrito na carta — nada de adivinhar */
  if(c.orfa) selos.push(`<span class="selo of">SEM PAR</span>`);
  if(c.revelado) selos.push(`<span class="selo mi">FALSA</span>`);
  if(c.marcada) selos.push(`<span class="selo eg">FIXA</span>`);
  if(c.pavio>0 && c.conhecida) selos.push(`<span class="selo pv">${c.pavio}</span>`);
  const selosFrente = (!pequena && t.id!=='normal')
    ? `<span class="selo tp" style="color:${t.cor}">${esc(t.nome)}</span>` : '';
  const cls = ['ct', aberta?'ab':'', c.marcada?'marc':'', c.resolvida?'ido':''].join(' ');
  return `<button class="${cls}" data-c="${c.id}" style="--fc:${cor}"
      aria-label="carta ${c.pos+1}">
    <span class="fx">
      <span class="fr">${selos.join('')}</span>
      <span class="ff">${svgGlifo(c.fam, c.simbolo)}${selosFrente}${
        c.camadas>1?'<span class="selo pv" style="color:#9fd8ff">GELO</span>':''}</span>
    </span></button>`;
}

function mesa(completo){
  const s = run.sala; if(!s) return;
  const el = $('#mesa');
  ajustar();
  const peq = el.dataset.pequena === '1';
  const vivas = s.porPos().filter(c=>!c.resolvida);
  if(completo || el.children.length !== vivas.length){
    el.innerHTML = vivas.map(c=>cartaHTML(c, peq)).join('');
  } else {
    /* atualiza no lugar: recriar o HTML no meio da partida mataria a
       animação de virada bem quando ela mais importa */
    for(const c of vivas){
      const e = el.querySelector(`[data-c="${c.id}"]`);
      if(!e) { el.innerHTML = vivas.map(x=>cartaHTML(x, peq)).join(''); break; }
      e.classList.toggle('ab', faceAberta(c));
      e.classList.toggle('marc', !!c.marcada);
    }
  }
  ajustar();
  ordenar();
}
/* o embaralho do chefe mexe em `pos`; a grade tem que seguir */
function ordenar(){
  const s = run.sala, el = $('#mesa');
  const vivas = s.porPos().filter(c=>!c.resolvida);
  vivas.forEach((c,i)=>{
    const e = el.querySelector(`[data-c="${c.id}"]`);
    if(e) e.style.order = i;
  });
}

function voa(id, txt, cls=''){
  const e = $('#mesa').querySelector(`[data-c="${id}"]`);
  const area = $('#area');
  if(!e || !area) return;
  const r = e.getBoundingClientRect(), a = area.getBoundingClientRect();
  const p = document.createElement('div');
  p.className = 'voa '+cls; p.textContent = txt;
  p.style.left = (r.left - a.left + r.width/2)+'px';
  p.style.top  = (r.top  - a.top  + r.height/2)+'px';
  area.appendChild(p);
  setTimeout(()=>p.remove(), 1050);
}

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
    }
    return;
  }
  const s = run.sala;
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

  /* fechou a tentativa: o motor já resolveu, a tela ainda vai contar */
  travado = true;
  $('#bfer').disabled = true;
  await animar(rel);
  travado = false;
  medidores();
  if(!run.sala) { await espera(320); seguir(); }
}

async function animar(rel){
  const s = run.sala;
  const ev = e => rel.eventos.find(x=>x.e===e);
  const acerto = ev('acerto'), erro = ev('erro'), trinca = ev('trincou');

  await espera(520);                       // o tempo de ver as duas cartas

  if(trinca){
    SFX.trinca();
    for(const id of trinca.cartas) voa(id, 'TRINCOU');
    mostrando.clear(); mesa(false);
  }
  if(acerto){
    SFX.acerto(acerto.combo);
    const [a] = acerto.cartas;
    voa(a, '+'+nf(acerto.pontos));
    for(const id of acerto.cartas){
      const e = $('#mesa').querySelector(`[data-c="${id}"]`);
      if(e) e.classList.add('sai');
    }
    $('#combo').classList.remove('sobe'); void $('#combo').offsetWidth;
    $('#combo').classList.add('sobe');
    const d = degrauCombo(acerto.combo);
    if(acerto.combo>=2 && d.n===acerto.combo) aviso(d.nome, 'combo ×'+d.mult.toFixed(1).replace('.',','));
    await espera(300);
    mostrando.clear();
  }
  if(erro){
    SFX.erro();
    for(const id of erro.cartas){
      const e = $('#mesa').querySelector(`[data-c="${id}"]`);
      if(e){ e.classList.add('nao'); setTimeout(()=>e.classList.remove('nao'), 460); }
    }
    if(erro.custo>0) voa(erro.cartas[0], '−'+erro.custo+' foco', 'ruim');
    else voa(erro.cartas[0], 'descoberta', '');
    await espera(430);
    mostrando.clear();
  }
  /* o resto dos eventos, na ordem em que o motor os produziu */
  for(const e of rel.eventos){
    if(e.e==='moedas'){ SFX.moeda(); voa(rel.par?.[0] ?? e.carta ?? 0, '+'+e.n+' moeda', 'moeda'); }
    if(e.e==='virada_extra') aviso('+1 VIRADA', 'alquimia');
    if(e.e==='xadrez') aviso('DOBRADO', 'xadrez');
    if(e.e==='revelou'){ SFX.revelar(); for(const id of (e.cartas||[])) piscar(id); }
    if(e.e==='marcou'){ SFX.revelar(); aviso('CARTA FIXA', 'egito'); }
    if(e.e==='explodiu'){ SFX.chefe(); aviso('EXPLODIU', 'a bomba levou o par'); }
    if(e.e==='camaleao') aviso('TROCOU', 'camaleão');
    if(e.e==='embaralhou' || e.e==='espaco'){ SFX.chefe(); aviso('EMBARALHOU', ''); }
    if(e.e==='espelhou'){ SFX.chefe(); aviso('ESPELHOU', 'o lado trocou'); }
    if(e.e==='esqueceu'){ SFX.chefe(); aviso('ESQUECEU', 'o chefe apagou uma carta'); }
    if(e.e==='sumiu'){ SFX.chefe(); aviso('SUMIU', 'um par saiu do tabuleiro'); }
    if(e.e==='orfa') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='mimic') aviso('MIMIC', 'era cópia');
  }
  mostrando.clear();
  mesa(true);
  if(rel.eventos.some(e=>e.e==='vitoria')){ SFX.vitoria(); aviso('SALA VENCIDA', 'meta batida'); await espera(700); }
  if(rel.eventos.some(e=>e.e==='derrota')){
    const m = rel.eventos.find(e=>e.e==='derrota').motivo;
    SFX.derrota();
    aviso('SALA PERDIDA', m==='foco' ? 'acabou o foco'
        : m==='viradas' ? 'acabaram as viradas' : 'acabaram as cartas');
    await espera(900);
  }
}
function piscar(id){
  const e = $('#mesa')?.querySelector(`[data-c="${id}"]`);
  if(!e) return;
  e.classList.add('pisca');
  setTimeout(()=>e.classList.remove('pisca'), 2400);
}

$('#mesa').addEventListener('click', e=>{
  const b = e.target.closest('[data-c]');
  if(b) tocarCarta(Number(b.dataset.c));
});

$('#bfer').onclick = async ()=>{
  if(travado || !run?.sala) return;
  const f = run.C.ferramenta;
  acordar();
  /* as ferramentas que pedem alvo perguntam antes; as outras vão direto */
  if(f.id==='trocar' || f.id==='curinga') return escolherAlvo(f);
  if(f.id==='varrer')   return escolherDeLista(f, 'tipo');
  if(f.id==='analisar') return escolherDeLista(f, 'fam');
  aplicarFerramenta(undefined);
};

async function aplicarFerramenta(arg){
  const rel = run.usarFerramenta(arg);
  if(rel.erro){ aviso('NÃO DÁ', rel.erro); return; }
  SFX.revelar();
  for(const e of rel.eventos){
    if(e.e==='revelou') for(const id of (e.cartas||[])) piscar(id);
    if(e.e==='voltou') aviso('DESFEITO', 'o último erro voltou');
    if(e.e==='transmutou'){ aviso('TRANSMUTADO', 'virou espelho'); piscar(e.carta); }
    if(e.e==='concentrou') aviso('CONCENTRAÇÃO', 'multiplicador dobrado');
    if(e.e==='trocou') aviso('TROCADO', 'as duas mudaram de lugar');
    if(e.e==='acerto'){ SFX.acerto(e.combo); voa(e.cartas[0], '+'+nf(e.pontos)); }
  }
  mesa(true); medidores();
  if(!run.sala){ await espera(400); seguir(); }
}

let alvoPendente = null;
function escolherAlvo(f){
  alvoPendente = { f, ids:[] };
  aviso(f.id==='trocar' ? 'TOQUE 2 CARTAS' : 'TOQUE 1 CARTA', f.nome);
}
function escolherDeLista(f, campo){
  const s = run.sala;
  const chaves = [...new Set(s.fechadas().map(c=>campo==='tipo'?c.tipo:c.fam))];
  ficha(`<div class="rot">${esc(f.nome)}</div>
    <h3 class="tit" style="margin:2px 0 10px">Revelar o quê?</h3>
    <div class="grade">${chaves.map(k=>{
      const o = campo==='tipo' ? TIPOS[k] : FAMILIAS[k];
      return `<button class="op" data-esc="${k}" style="--fc:${o.cor}">
        <h3 style="color:${o.cor}">${esc(o.nome)}</h3>
        <p>${esc(campo==='tipo' ? o.d : o.regra)}</p></button>`;
    }).join('')}</div>`);
  $('#folhac').querySelectorAll('[data-esc]').forEach(b=>b.onclick = ()=>{
    $('#folha').classList.remove('on');
    aplicarFerramenta(b.dataset.esc);
  });
}
$('#bregras').onclick = ()=>{
  const s = run.sala; if(!s) return;
  SFX.clique();
  const tipos = [...new Set(s.emJogo().map(c=>c.tipo))].map(t=>TIPOS[t]);
  ficha(`
    <div class="rot">o que vale nesta sala</div>
    <h3 class="tit" style="margin:2px 0 10px">${s.pares} pares · meta ${nf(s.meta)}</h3>
    ${s.boss ? `<div class="verb"><div class="em" style="color:${s.boss.cor}">${ICO_CHEFE[s.boss.id]||''}</div>
      <div><h4 style="color:${s.boss.cor}">${esc(s.boss.nome)}</h4>
      <p>${esc(s.boss.regra)}</p><p style="color:var(--txt3);margin-top:3px">${esc(s.boss.dica)}</p></div></div>` : ''}
    <div class="rot" style="margin:12px 0 4px">famílias no tabuleiro</div>
    ${s.familias.map(fichaFamilia).join('')}
    <div class="rot" style="margin:12px 0 4px">cartas que apareceram</div>
    ${tipos.map(fichaTipo).join('')}
    <div class="rot" style="margin:12px 0 4px">o combo</div>
    <p class="mini">${COMBOS.slice(1).map(c=>
      `<b>${c.n}</b> acertos seguidos = <b style="color:var(--ouro)">${esc(c.nome)}</b>, ×${c.mult.toFixed(1).replace('.',',')}`
    ).join('<br>')}</p>`);
};

/* ═══════════════════════════════════════════ RECOMPENSA / TESOURO */
function telaPremio(){
  const t = $('#t-premio');
  const tesouro = run.tipoSala()==='tesouro' && !run.aguardandoPremio;
  const ofertas = run.premios();
  const u = run.ultimaSala;
  SFX.premio();
  t.innerHTML = `
    <div class="topo-linha"><div class="cabeca">
      <div class="rot">${tesouro ? 'tesouro' : 'sala vencida'}</div>
      <h2 class="tit">${tesouro ? 'Alguém deixou isto aqui.' : 'Pegue uma para levar.'}</h2>
      ${u && !tesouro ? `<p class="sub">${nf(u.pontos)} pontos nesta sala`
        + (u.sobra>0 ? ` · ${u.sobra} viradas sobraram e viraram moeda` : '')
        + (u.extra ? ` · +${u.extra} moedas` : '') + `</p>` : ''}
    </div></div>
    <div class="rol"><div class="grade">
      ${ofertas.length ? ofertas.map(r=>`
        <button class="op raro" data-pega="${r.id}" style="--fc:${RARIDADE[r.r]}">
          <span class="gf" style="color:${RARIDADE[r.r]}">${ICO.reliquia}</span>
          <h3 style="color:${RARIDADE[r.r]}">${esc(r.nome)}</h3>
          <p>${esc(r.d)}</p>
          <div class="pr" style="color:${RARIDADE[r.r]}">${r.r}</div>
        </button>`).join('')
        : '<p class="mini">Não sobrou relíquia nenhuma para oferecer.</p>'}
    </div></div>
    <div style="flex:0 0 auto;padding-top:9px">
      <button class="bt g" id="pular">SEGUIR SEM PEGAR</button>
    </div>`;
  t.querySelectorAll('[data-pega]').forEach(b=>b.onclick = ()=>{
    SFX.premio();
    if(run.ganharReliquia(b.dataset.pega)) { run.passar(); seguir(); }
    else aviso('NÃO DEU', 'essa não está na oferta');
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
        <h2 class="tit">Você tem ${nf(run.moedas)} moedas.</h2>
      </div></div>
      <div class="rol"><div class="grade">
        ${run.loja().map(i=>`
          <button class="op raro" data-compra="${i.id}" style="--fc:${RARIDADE[i.r]||'#e8b44a'}"
            ${i.vendido || run.moedas<i.preco ? 'disabled' : ''}>
            <span class="gf" style="color:${RARIDADE[i.r]||'var(--ouro)'}">${
              i.id.startsWith('__') ? ICO.tesouro : ICO.reliquia}</span>
            <h3 style="color:${RARIDADE[i.r]||'var(--ouro)'}">${esc(i.nome)}</h3>
            <p>${esc(i.d)}</p>
            <div class="pr">${i.vendido ? 'VENDIDO' : nf(i.preco)+' moedas'}</div>
          </button>`).join('')}
      </div></div>
      <div style="flex:0 0 auto;padding-top:9px">
        <button class="bt p g" id="sair">SAIR DA LOJA</button>
      </div>`;
    t.querySelectorAll('[data-compra]').forEach(b=>b.onclick = ()=>{
      const r = run.comprar(b.dataset.compra);
      if(r.ok){ SFX.moeda(); aviso('COMPRADO', esc(r.item.nome)); desenhar(); }
      else aviso('NÃO DÁ', r.por);
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
  t.innerHTML = `
    <div class="topo-linha"><div class="cabeca">
      <div class="rot">${run.tipoSala()==='descanso' ? 'fogueira' : 'evento'}</div>
      <h2 class="tit">${esc(ev.nome)}</h2>
    </div></div>
    <div class="rol">
      <p class="sub" style="font-size:15px;line-height:1.6">${esc(ev.txt)}</p>
      <div class="hr"></div>
      <div class="grade">${ev.ops.map((o,i)=>`
        <button class="op" data-op="${i}">
          <h3>${esc(o.txt)}</h3><p>${esc(o.d)}</p></button>`).join('')}</div>
    </div>`;
  t.querySelectorAll('[data-op]').forEach(b=>b.onclick = ()=>{
    const r = run.escolher(Number(b.dataset.op));
    SFX.premio();
    if(r.ok){
      t.querySelector('.rol').innerHTML =
        `<p class="sub" style="font-size:15px;line-height:1.6">${esc(r.txt)}</p>`;
      setTimeout(()=>seguir(), 1300);
    }
  });
}

/* ═══════════════════════════════════════════ FIM */
function telaFim(){
  const t = $('#t-fim');
  const p = run.placar();
  const venceu = run.venceu;
  (venceu ? SFX.vitoria : SFX.derrota)();
  const u = run.ultimaSala;
  t.innerHTML = `
    <div class="rol" style="display:flex;flex-direction:column;justify-content:center">
      <div class="rot">${venceu ? 'run completa' : 'a run acabou'}</div>
      <h2 class="grandao" style="color:${venceu?'var(--bom)':'var(--perigo)'}">
        ${venceu ? 'VOCÊ LEMBROU' : 'VOCÊ ESQUECEU'}</h2>
      <p class="sub">${venceu
        ? `Seis mundos, ${p.est.salas} salas vencidas.`
        : `Caiu no mundo ${run.mundo+1}, sala ${run.indice+1}`
          + (u?.motivo==='foco' ? ' — o foco acabou.'
           : u?.motivo==='viradas' ? ' — as viradas acabaram.'
           : u?.motivo==='tabuleiro' ? ' — o tabuleiro acabou antes da meta.' : '.')}</p>
      <div class="hr"></div>
      <div class="pts" style="font-size:44px">${nf(p.pontos)}</div>
      <div class="rot">pontos</div>
      <div class="hr"></div>
      <dl class="tabnum">
        <dt>Classe</dt><dd>${esc(run.C.nome)}</dd>
        <dt>Salas vencidas</dt><dd>${p.est.salas}</dd>
        <dt>Pares fechados</dt><dd>${p.est.acertos}</dd>
        <dt>Erros</dt><dd>${p.est.erros}</dd>
        <dt>Maior combo</dt><dd>${p.est.maiorCombo} · ${esc(degrauCombo(p.est.maiorCombo).nome)}</dd>
        <dt>Moedas ganhas</dt><dd>${nf(p.est.moedasGanhas)}</dd>
        <dt>Relíquias</dt><dd>${p.reliquias.length}</dd>
        <dt>Semente</dt><dd style="font-size:11px;font-weight:600">${esc(p.semente)}</dd>
      </dl>
      ${p.reliquias.length ? `<div class="hr"></div>
        ${p.reliquias.map(fichaReliquia).join('')}` : ''}
    </div>
    <div style="flex:0 0 auto;display:flex;flex-direction:column;gap:8px;padding-top:9px">
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
  } catch(e){
    bt.textContent = 'SEM CONEXÃO'; bt.disabled = false;
  }
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
    <p class="mini" style="flex:0 0 auto;padding-top:8px;border-top:1px solid var(--linha)">
      Cada placar vem com a lista de jogadas. Seu aparelho REFAZ a run a
      partir da semente e só mostra a linha se o número bater — por isso não
      adianta inventar pontuação.</p>`;
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
  if($('#t-rank').classList.contains('on') === false) return;

  /* AQUI mora o anti-cheat: nada entra na lista sem ser recalculado */
  const bons = [];
  for(const l of linhas){
    const v = verificar(l.placar, l.registro);
    if(v.ok) bons.push({ ...l, conferido:true });
  }
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
       ${linhas.length ? `(${linhas.length} chegaram, mas nenhum bateu com as próprias jogadas.)` : ''}</p>`;
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
      +'menos que dois pares emendados — é por isso que vale arriscar.')}`},
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
      `<div class="rot" style="margin:12px 0 4px;color:${RARIDADE[r]}">${r}</div>`
      + RELIQUIAS.filter(x=>x.r===r).map(x=>fichaReliquia(x.id)).join('')).join('') },
  { id:'combo', n:'A escada do combo', html:()=>
    `<p class="sub">Quantos pares seguidos, e por quanto multiplica.</p>`
    + COMBOS.slice(1).map(c=>verbete(ICO.combo, esc(c.nome),
        `${c.n} acerto${c.n>1?'s':''} seguido${c.n>1?'s':''} sem errar.`,
        `<span class="tag" style="color:var(--ouro)">×${c.mult.toFixed(1).replace('.',',')}</span>`)).join('') },
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
  const t = $('#t-livro');
  const c = CAPITULOS.find(x=>x.id===capAtual) || CAPITULOS[0];
  t.innerHTML = `
    <div class="topo-linha">
      <button class="bt pq" id="voltarLivro">VOLTAR</button>
      <div class="cabeca"><div class="rot">como se joga</div>
        <h2 class="tit">${esc(c.n)}</h2></div>
    </div>
    <div class="abas">${CAPITULOS.map(x=>
      `<button data-cap="${x.id}" class="${x.id===capAtual?'on':''}">${esc(x.n)}</button>`).join('')}</div>
    <div class="rol">${c.html()}</div>`;
  t.querySelectorAll('[data-cap]').forEach(b=>b.onclick = ()=>{
    SFX.clique(); capAtual = b.dataset.cap; telaLivro();
  });
  $('#voltarLivro').onclick = ()=>{ SFX.clique(); run ? seguir() : (function botaoSom(){
  const b = document.createElement('button');
  b.className = 'bt g'; b.id = 'bsom';
  const pinta = ()=>{ b.textContent = estaMudo() ? 'SOM: DESLIGADO' : 'SOM: LIGADO'; };
  b.onclick = ()=>{ mudo(!estaMudo());
    localStorage.setItem('mnemonic.mudo', estaMudo()?'1':'0');
    if(!estaMudo()){ acordar(); SFX.clique(); } pinta(); };
  if(localStorage.getItem('mnemonic.mudo')==='1') mudo(true);
  pinta();
  $('#t-titulo .menu').appendChild(b);
})();

ir('titulo'); };
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
/* retomar é o MESMO caminho do verificador: refazer a run a partir das
   jogadas. Um save que guardasse o estado direto seria um segundo jeito de
   descrever a partida, e dois jeitos acabam discordando. */
function retomar(){
  let d; try { d = JSON.parse(localStorage.getItem(CHAVE)||'null'); } catch(e){}
  if(!d?.registro?.length) return false;
  const r = new Run({ semente:d.semente, classe:d.classe, diario:d.diario });
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
}
(function botaoSom(){
  const b = document.createElement('button');
  b.className = 'bt g'; b.id = 'bsom';
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
