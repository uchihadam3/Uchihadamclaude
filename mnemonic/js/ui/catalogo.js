/* ========================================================================
   O CATÁLOGO — toda coisa que o jogo nomeia, no mesmo formato.

   Por que este arquivo existe: antes, cada tela montava o seu próprio
   pedacinho de texto sobre carta, família, classe, chefe e relíquia — e o
   resultado era sempre a mesma coisa empilhada, uma LISTA. Lista é o
   formato de quem tem informação e não sabe o que fazer com ela: o jogador
   varre com o olho e não guarda nada.

   Aqui cada coisa vira uma PEÇA, com os mesmos cinco campos:

     cor · ícone · nome · etiqueta · texto (+ notas e números)

   Com todas no mesmo formato, a tela pode montar VITRINE (grade de peças
   que se tocam) em vez de lista, e o texto vai para trás do toque. É a
   diferença entre um manual e uma coleção.
   ===================================================================== */
import { TIPOS, LISTA_TIPOS } from '../data/cartas.js';
import { FAMILIAS, LISTA_FAMILIAS } from '../data/familias.js';
import { CLASSES, LISTA_CLASSES } from '../data/classes.js';
import { RELIQUIAS, POR_ID, RARIDADE } from '../data/reliquias.js';
import { BOSSES, LISTA_BOSSES } from '../data/bosses.js';
import { COMBOS, degrauCombo } from '../engine/tabuleiro.js';
import { CONQUISTAS, POR_ID_CONQ, DEGRAUS } from '../data/conquistas.js';
import { svgGlifo } from '../arte/glifos.js';
import { ICO, ICO_TRACO, ICO_CLASSE, ICO_CHEFE, ICO_FAM, ICO_MEDALHA, icoReliquia }
  from './icones.js';

const vg = n => String(n).replace('.', ',');

/* a capa do capítulo das relíquias é a mais reconhecível delas */
const ICO_RELIQUIA_CAPA = icoReliquia('coroa');

/* a escada de combo também é uma escada de COR: o degrau se reconhece pela
   cor antes de o nome ser lido */
export const COR_COMBO = ['#63789e','#4fb8ff','#4fe08a','#ffc23c','#ffa24d',
                          '#ff4f52','#ff6fae','#b478ff','#ffffff'];
export const corDoCombo = n =>
  COR_COMBO[Math.max(0, COMBOS.findIndex(c => c === degrauCombo(n)))] || COR_COMBO[0];

/* ---------- as PALAVRAS do jogo ----------
   O vocabulário é conteúdo como qualquer outro: se FOCO e VIRADA não são
   peças da coleção, elas viram um parágrafo que ninguém lê — e são
   justamente as duas coisas que decidem toda partida. */
export const PALAVRAS = [
  { id:'meta', nome:'Meta', cor:'#ffc23c', ico:ICO.meta, tag:'como se vence',
    texto:'A sala é vencida ao chegar na meta de pontos — não limpando o '
        + 'tabuleiro. Limpar tudo é só o jeito mais comum de chegar lá, e nas '
        + 'salas grandes nem sempre dá tempo.',
    nota:'É o que faz cada par valer um TANTO, em vez de valer só "menos uma carta".' },
  { id:'virada', nome:'Virada', cor:'#4fb8ff', ico:ICO.virada, tag:'o relógio',
    texto:'Cada tentativa — duas cartas — gasta uma virada. Quando as viradas '
        + 'acabam e a meta não foi batida, a run acaba ali.',
    nota:'Virada que sobra no fim da sala vira moeda.' },
  { id:'foco', nome:'Foco', cor:'#ff4f52', ico:ICO.foco, tag:'o limite de falhas',
    texto:'Errar duas cartas que você NUNCA tinha visto não custa nada: é '
        + 'exploração, e exploração é obrigatória. Errar duas cartas que você '
        + 'já conhecia custa 1 de Foco. Zerou o Foco, perdeu a sala.',
    nota:'Sem essa separação o jogo puniria as primeiras viradas, que são às cegas.' },
  { id:'combo', nome:'Combo', cor:'#ffa24d', ico:ICO.combo, tag:'onde mora o placar',
    texto:'Acertos seguidos multiplicam tudo. Dois pares separados valem muito '
        + 'menos que dois pares emendados.',
    nota:'É por isso que vale arriscar em vez de virar carta por carta com segurança.' },
  { id:'vista', nome:'Vista', cor:'#4fe08a', ico:ICO.vista, tag:'aparecendo agora',
    texto:'A carta está na tela NESTE instante. Ela some no fim da tentativa. '
        + 'Algumas relíquias esticam esse prazo.',
    nota:'Se durasse para sempre, a tela guardaria o tabuleiro por você — e o jogo da memória não teria memória.' },
  { id:'conhecida', nome:'Conhecida', cor:'#b478ff', ico:ICO.conhecida, tag:'você já viu',
    texto:'Você viu essa carta alguma vez. Isso não se apaga nunca, e é o que '
        + 'decide se o erro custa Foco.',
    nota:'É por isso que o Fantasma dói: ele apaga a VISTA e deixa a CONHECIDA.' },
  { id:'feito', nome:'Par feito', cor:'#ffc23c', ico:ICO.feito, tag:'fica no tabuleiro',
    texto:'O par fechado apaga e ganha um carimbo, mas não sai do lugar.',
    nota:'Assim a grade nunca se remexe e você não perde de vista o que já decorou das outras cartas.' },
  { id:'curinga', nome:'Curinga', cor:'#ffffff', ico:ICO.espelho, tag:'fecha com qualquer uma',
    texto:'A carta Espelho é curinga: ela fecha par com QUALQUER outra carta, '
        + 'mesmo com desenho diferente. Por isso ela não usa desenho de família '
        + '— a face dela é o arco-íris, e uma vez virada você a reconhece na hora.',
    nota:'Quando o par fecha por curinga, o jogo avisa na tela. Sem esse aviso o par de desenhos diferentes parecia defeito.' },
  { id:'orfa', nome:'Sem par', cor:'#4fb8ff', ico:ICO.orfa, tag:'perdeu a dupla',
    texto:'Quando um Espelho fecha com uma carta comum, a dupla dela fica sem '
        + 'par — e passa a fechar com qualquer outra carta sem par.',
    nota:'Cartas saem sempre de duas em duas, então nunca sobra uma sozinha.' },
  { id:'semente', nome:'Semente', cor:'#63789e', ico:ICO.semente, tag:'de onde nasce a run',
    texto:'O tabuleiro, o mapa, as relíquias oferecidas e o chefe são todos '
        + 'sorteados a partir de um número. A mesma semente monta a mesma run '
        + 'em qualquer aparelho.',
    nota:'É isso que faz a run diária ser exatamente a mesma para todo mundo.' },
  { id:'prova', nome:'Prova', cor:'#4fe08a', ico:ICO.prova, tag:'o placar não se inventa',
    texto:'Ao publicar, sobe junto a lista inteira das suas jogadas. Quem abre '
        + 'o ranking REFAZ a sua run a partir da semente e confere se chega no '
        + 'mesmo número.',
    nota:'Inflar pontos, dizer que venceu ou pegar relíquia não oferecida: nada sobrevive ao recálculo.' },
];
const PALAVRA_POR_ID = Object.fromEntries(PALAVRAS.map(p => [p.id, p]));

/* ---------- as peças, todas com os mesmos campos ----------
   `peca(tipo, id)` devolve sempre o mesmo formato, venha de onde vier. */
export const FAMILIA_DE_PECA = {
  palavra: {
    nome:'As palavras', ico:ICO.conhecida, cor:'#b478ff',
    resumo:'O vocabulário que decide toda partida.',
    lista: () => PALAVRAS.map(p => p.id),
    peca: id => { const p = PALAVRA_POR_ID[id];
      return { cor:p.cor, ico:p.ico, nome:p.nome, tag:p.tag, texto:p.texto, nota:p.nota }; },
  },
  carta: {
    nome:'As cartas', ico:ICO.normal, cor:'#4fb8ff',
    resumo:`${LISTA_TIPOS.length} tipos. Cada um ataca a memória, a conta ou o tabuleiro.`,
    lista: () => LISTA_TIPOS.map(t => t.id),
    peca: id => { const t = TIPOS[id];
      return { cor:t.cor, ico:ICO[t.id] || ICO.normal, nome:t.nome,
               tag: t.mult && t.mult !== 1 ? '×'+t.mult+' pontos' : t.base+' de base',
               texto:t.d,
               dados:[ ['base', t.base||10],
                       ...(t.mult&&t.mult!==1 ? [['multiplicador','×'+t.mult]] : []),
                       ...(t.moedas ? [['moedas','+'+t.moedas]] : []),
                       ...(t.camadas>1 ? [['camadas', t.camadas]] : []),
                       ...(t.pavio ? [['pavio', t.pavio+' viradas']] : []) ] }; },
  },
  familia: {
    nome:'As famílias', ico:ICO_FAM.runas, cor:'#ffc23c',
    resumo:'Cada sala sorteia duas ou três. A família manda no tabuleiro inteiro.',
    lista: () => LISTA_FAMILIAS.map(f => f.id),
    peca: id => { const f = FAMILIAS[id];
      return { cor:f.cor, ico:ICO_FAM[f.id] || svgGlifo(f.id, 0, 'gl'), nome:f.nome, tag:f.traco,
               texto:f.regra,
               amostra: f.s.slice(0,6).map(i => svgGlifo(f.id, i, 'gl')) }; },
  },
  classe: {
    nome:'As classes', ico:ICO_CLASSE.detetive, cor:'#4fe08a',
    resumo:'Oito jeitos diferentes de jogar — não oito níveis de força.',
    lista: () => LISTA_CLASSES.map(c => c.id),
    peca: id => { const c = CLASSES[id];
      return { cor:c.cor, ico:ICO_CLASSE[c.id], nome:c.nome, tag:c.lema, texto:c.d,
               nota: c.ferramenta.nome + ' — ' + c.ferramenta.d,
               dados:[ ['foco', c.foco], ['viradas', (c.viradasBonus>=0?'+':'')+c.viradasBonus],
                       ['moedas', c.moedas] ] }; },
  },
  chefe: {
    nome:'Os chefes', ico:ICO.chefe, cor:'#ff4f52',
    resumo:'Um por mundo. Cada um apaga a resposta que servia até ali.',
    lista: () => LISTA_BOSSES.map(b => b.id),
    peca: id => { const b = BOSSES[id];
      return { cor:b.cor, ico:ICO_CHEFE[b.id], nome:b.nome, tag:'chefe de mundo',
               texto:b.regra, nota:b.dica }; },
  },
  reliquia: {
    nome:'As relíquias', ico:ICO_RELIQUIA_CAPA, cor:'#b478ff',
    resumo:'Nenhuma dá só "+N". Cada uma muda uma regra ou muda a conta.',
    lista: () => RELIQUIAS.map(r => r.id),
    peca: id => { const r = POR_ID[id];
      return { cor:RARIDADE[r.r], ico:icoReliquia(r.id), nome:r.nome, tag:r.r, texto:r.d }; },
  },
  conquista: {
    nome:'As medalhas', ico:ICO_MEDALHA.ouro, cor:'#ffc23c',
    resumo:'Nenhuma delas ajuda dentro da partida — de propósito. '
         + 'Elas são a meta que sobra quando a run acaba.',
    lista: () => CONQUISTAS.map(c => c.id),
    /* `moldura` é o aro do degrau, e ele vem SEPARADO do ícone de propósito:
       vinte e sete medalhas pintadas seriam vinte e sete folhas de arte, e o
       que o jogador precisa distinguir são duas coisas independentes — o QUE
       foi feito (o ícone, no miolo) e o QUANTO custou (o aro, em volta). */
    peca: id => { const c = POR_ID_CONQ[id]; const g = DEGRAUS[c.g] || DEGRAUS.bronze;
      return { cor:g.cor, ico:ICO_TRACO[c.ico] || ICO_TRACO.meta, nome:c.nome,
               tag:g.nome, texto:c.d,
               moldura:ICO_MEDALHA[c.g] || ICO_MEDALHA.bronze }; },
  },
  combo: {
    nome:'A escada do combo', ico:ICO.combo, cor:'#ffa24d',
    resumo:'Quantos pares seguidos, e por quanto multiplica.',
    lista: () => COMBOS.slice(1).map(c => String(c.n)),
    peca: id => { const i = COMBOS.findIndex(c => String(c.n) === String(id));
      const c = COMBOS[i];
      return { cor:COR_COMBO[i], ico:ICO.combo, nome:c.nome, tag:'×'+vg(c.mult.toFixed(1)),
               texto:`${c.n} acerto${c.n>1?'s':''} seguido${c.n>1?'s':''} sem errar.`,
               dados:[ ['acertos', c.n], ['multiplica', '×'+vg(c.mult.toFixed(1))] ] }; },
  },
};

export const peca = (tipo, id) => FAMILIA_DE_PECA[tipo]?.peca(id) || null;
export const CAPITULOS = Object.entries(FAMILIA_DE_PECA)
  .map(([id, f]) => ({ id, ...f }));
