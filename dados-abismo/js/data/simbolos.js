/* ========================================================================
   O DICIONÁRIO DO JOGO — cada coisa tem UM ícone desenhado e UMA palavra.

   Existe porque as cartas estavam ilegíveis, e a causa não era falta de
   informação: era informação escondida em três lugares.

     1. A descrição inteira da habilidade morava no atributo `title`. No
        celular não existe passar o mouse — quem joga no telefone nunca leu
        aquela frase uma vez sequer.
     2. O rodapé da carta escolhia UM verbo da lista de efeitos e descartava
        o resto. Decapitar arromba, fere e EXECUTA: a carta dizia "ARROMBA".
     3. A fechadura mostrava o NOME da regra ("Couraça"), não a regra. Para
        saber que Couraça pede um dado 4+ era preciso tocar no "?" de cada
        inimigo, todo turno.

   E os ícones eram de duas famílias: habilidades em SVG, mas fechaduras,
   estados e intenções em emoji — que em Georgia no Android desenham como um
   risquinho cinza. Aqui é tudo SVG, no mesmo traço.

   A REGRA, sem exceção: ícone + PALAVRA + (quando houver) número. Quem
   aprende o chip uma vez lê os dois lados da mesa, porque a carta do inimigo
   e a carta da habilidade usam o mesmo vocabulário.
   ===================================================================== */

/* ---- os desenhos, em coordenadas 0..24 ---- */
const D = {
  dano:    `<path d="M4 20L17 7"/><path d="M14 4h6v6"/><path d="M20 4l-6.5 6.5"/><path d="M3 21l3-3"/>`,
  golpes:  `<path d="M4 20L14 6M8 20L18 6M12 20L21 8"/>`,
  bloqueio:`<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>`,
  armadura:`<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>`,
  cura:    `<path d="M12 20s-7-4.5-7-9.5A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7 2.5c0 5-7 9.5-7 9.5z"/>`,
  espinhos:`<path d="M4 20h16"/><path d="M6 20l2-7 2 7"/><path d="M11 20l2.5-10 2.5 10"/>`,
  veneno:  `<path d="M8 4h8l-1 5a4 4 0 0 1-6 0z"/><path d="M9 13h6l1 7H8z"/><path d="M11 16h2"/>`,
  sangramento:`<path d="M12 3s5 6 5 9.5A5 5 0 0 1 7 12.5C7 9 12 3 12 3z"/>`,
  queimadura:`<path d="M13 2c1 4.5-3 6.5-3 11 0 1-.4 2-1.4 1.2C7.8 13.5 7.4 12.5 7.4 11.5 5.8 13.5 5 15.5 5 17.5 5 20 7.7 22 12 22s7-2.3 7-5.5C19 11 15 8 13 2z"/>`,
  frenesi: `<path d="M5.5 12.5L12 6l6.5 6.5"/><path d="M5.5 19L12 12.5l6.5 6.5"/>`,
  marca:   `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>`,
  maldicao:`<path d="M9 10h.01M15 10h.01"/><path d="M5 10a7 7 0 0 1 14 0c0 2.5-1.5 3.5-1.5 5.5V18H6.5v-2.5C6.5 13.5 5 12.5 5 10z"/><path d="M9 18v3M12 18v3M15 18v3"/>`,
  congelado:`<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10"/><path d="M12 6l-2 2M12 6l2 2M12 18l-2-2M12 18l2-2"/>`,
  fratura: `<path d="M4 4h16v16H4z"/><path d="M9 4l3 6-4 3 4 7"/>`,
  invisivel:`<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><path d="M4 4l16 16"/>`,
  rouba:   `<path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 10.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 3 0"/>`,
  inverte: `<path d="M7 4v14M7 18l-3-3M7 18l3-3"/><path d="M17 20V6M17 6l-3 3M17 6l3 3"/>`,
  enterra: `<path d="M3 20h18"/><path d="M8 20V9l4-5 4 5v11"/><path d="M12 12v8"/>`,
  sela:    `<path d="M6 11h12v9H6z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/><path d="M12 15v2"/>`,
  taxa:    `<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M14.5 9.5c0-1.2-1.1-2-2.5-2s-2.5.8-2.5 2 1 1.7 2.5 2 2.5.9 2.5 2.1-1.1 2-2.5 2-2.5-.8-2.5-2"/>`,
  contagem:`<path d="M12 21c4.4 0 8-2.2 8-5s-3.6-5-8-5-8 2.2-8 5 3.6 5 8 5z"/><path d="M12 11V3"/><path d="M9 6l3-3 3 3"/>`,
  drena:   `<path d="M12 3l6 6a6 6 0 1 1-12 0z"/><path d="M9 14h6"/>`,
  cresce:  `<path d="M12 21V9"/><path d="M12 12C9 12 6 10 6 6c4 0 6 2 6 6z"/><path d="M12 14c3 0 6-2 6-6-4 0-6 2-6 6z"/><path d="M8 21h8"/>`,
  exige:   `<path d="M12 2.5L21.5 12 12 21.5 2.5 12z"/><path d="M12 7.5v5.5M12 16.2v.01"/>`,
  explode: `<path d="M12 2l2 5 4-2-1 5 5 2-5 2 1 5-4-2-2 5-2-5-4 2 1-5-5-2 5-2-1-5 4 2z"/>`,
  invoca:  `<path d="M12 3v6M9 6h6"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>`,
  reergue: `<path d="M12 21V7"/><path d="M8 11l4-4 4 4"/><path d="M5 21h14"/>`,
  aura:    `<circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 0 18M12 21a9 9 0 0 1 0-18"/><path d="M5 12H2M22 12h-3"/>`,
  /* os verbos que só as suas habilidades têm */
  arromba: `<path d="M6 11h12v9H6z"/><path d="M9 11V7a3 3 0 0 1 5.2-2"/><path d="M14 14l-3 5 4-1-1 4"/>`,
  dissolve:`<path d="M9 10V6.5a3 3 0 0 1 6 0V10"/><rect x="6" y="10" width="12" height="4.5" rx="1"/><path d="M7.5 17h9M9.5 20h5"/>`,
  perfura: `<path d="M3 12h13"/><path d="M12 8l4 4-4 4"/><path d="M19 4v16"/><path d="M21.5 6.5L19 4l-2.5 2.5"/>`,
  executa: `<path d="M9 10h.01M15 10h.01"/><path d="M5 10a7 7 0 0 1 14 0c0 2.5-1.5 3.5-1.5 5.5V18H6.5v-2.5C6.5 13.5 5 12.5 5 10z"/><path d="M9 18v3M12 18v3M15 18v3"/>`,
  reescreve:`<path d="M18 4l-9 9-3 5 5-3 9-9z"/><path d="M15.5 6.5l2 2"/><path d="M4 20h7"/>`,
  essencia:`<path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6z"/>`,
  guarda:  `<path d="M4 7h16v12H4z"/><path d="M4 11h16"/><path d="M9 7V4h6v3"/>`,
  ceifa:   `<path d="M20 5c-8 0-13 4-14 11"/><path d="M6 16l-2 4"/><path d="M4 20l6-2"/>`,
  /* a fechadura em si, e cada uma das regras */
  fechadura:`<path d="M6 11h12v9H6z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/>`,
  aberta:  `<path d="M6 11h12v9H6z"/><path d="M9 11V7a3 3 0 0 1 5.6-1.5"/>`,
  par:     `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>`,
  impar:   `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" stroke="none"/>`,
  forte:   `<path d="M4 19l8-14 8 14z"/><path d="M8.5 14h7"/>`,
  fraco:   `<path d="M20 5L12 19 4 5z"/><path d="M8.5 10h7"/>`,
  chave:   `<circle cx="8" cy="8" r="4"/><path d="M11 11l8 8"/><path d="M16 16l-2 2M19 19l-2 2"/>`,
  multiplo:`<circle cx="12" cy="12" r="8.5"/><path d="M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4"/>`,
  enxuto:  `<rect x="7" y="7" width="10" height="10" rx="2"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,
  farto:   `<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>`,
  simbolo: `<path d="M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z"/>`,
  distintos:`<rect x="3" y="4" width="7" height="7" rx="1.6"/><rect x="14" y="4" width="7" height="7" rx="1.6"/><rect x="8.5" y="14" width="7" height="7" rx="1.6"/><path d="M6.5 7.5v.01M17.5 6v.01M17.5 9v.01M12 16.5v.01M12 18.5v.01"/>`,
  iguais:  `<rect x="3" y="7" width="8" height="10" rx="2"/><rect x="13" y="7" width="8" height="10" rx="2"/><circle cx="7" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,
  faixa:   `<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M4 15h16"/>`,
  primo:   `<path d="M12 3v18"/><path d="M4.5 7.5l15 9M19.5 7.5l-15 9"/><circle cx="12" cy="12" r="2.6"/>`,
  casal:   `<circle cx="7.5" cy="12" r="4.5"/><circle cx="16.5" cy="12" r="4.5"/>`,
  espelho: `<path d="M12 3v18"/><path d="M8 8L4 12l4 4"/><path d="M16 8l4 4-4 4"/>`,
  ou:      `<path d="M4 8h6l4 8h6"/><path d="M4 16h6"/><path d="M17 5l3 3-3 3"/><path d="M17 13l3 3-3 3"/>`,
  /* o MAPA DA MASMORRA fala a mesma língua: ícone + palavra, como as cartas */
  comum:   `<path d="M4 20L17 7"/><path d="M14 4h6v6"/><path d="M20 4l-6.5 6.5"/><path d="M3 21l3-3"/>`,
  elite:   `<path d="M4 18h16"/><path d="M4 18L3 7l5 4 4-6 4 6 5-4-1 11z"/><path d="M12 13v.01"/>`,
  chefe:   `<path d="M5 6C3.5 4 4 2.5 4 2.5S7 3 8 5"/><path d="M19 6c1.5-2 1-3.5 1-3.5S17 3 16 5"/><path d="M4.5 11a7.5 7.5 0 0 1 15 0c0 2.6-1.6 3.7-1.6 5.8V19H6.1v-2.2C6.1 14.7 4.5 13.6 4.5 11z"/><path d="M9 11h.01M15 11h.01"/><path d="M9 19v3M12 19v3M15 19v3"/>`,
  santuario:`<path d="M7 4h10l-1 5a4 4 0 0 1-8 0z"/><path d="M12 13v5"/><path d="M8 21h8"/>`,
  rerrolagem:`<path d="M20 11a8 8 0 1 0-1.5 5.5"/><path d="M20 5v6h-6"/>`,
  reliquia:`<path d="M12 2l2.2 5.4L20 9l-4.4 3.2L17 18l-5-3-5 3 1.4-5.8L4 9l5.8-1.6z"/><path d="M12 18v4"/>`,
  fardo:   `<path d="M12 2.5L21.5 12 12 21.5 2.5 12z"/><path d="M12 7.5v5.5M12 16.2v.01"/>`,
  /* utilidade */
  dado:    `<rect x="3" y="3" width="18" height="18" rx="3.5"/><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,
  soma:    `<path d="M5 5h14l-7 7 7 7H5"/>`,
  sim:     `<path d="M5 13l4 4L19 7"/>`,
  nao:     `<path d="M6 6l12 12M18 6L6 18"/>`,
};

/* ===================================================================
   A ARTE RECORTADA DA FOLHA. Doze conceitos têm o desenho pintado, com placa
   e bisel; o resto continua no traço vetorial. Onde existe a arte, ela entra
   — e onde não existe, o traço mantém o desenho legível. As duas famílias
   convivem porque o CHIP é o mesmo: mesma caixa, mesma cor, mesma palavra ao
   lado. O que muda é só o miolo do quadradinho.
   =================================================================== */
const ARTE = {
  dano:'ataque', bloqueio:'defesa', cura:'cura', fratura:'fratura',
  executa:'execucao', frenesi:'furia', armadura:'muralha', espinhos:'armadilha',
  arromba:'arromba', dado:'dados', respirar:'respirar', fechadura:'arromba',
};
export const temArte = id => !!ARTE[id];
export function ico(id, cls='sic'){
  /* a arte pintada tem prioridade; o traço é o que sustenta os outros 33 */
  if(ARTE[id]) return `<img class="${cls} art" src="arte/icones/${ARTE[id]}.png" alt="" aria-hidden="true">`;
  return icoTraco(id, cls);
}
export function icoTraco(id, cls='sic'){
  const d = D[id]; if(!d) return '';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}
export const temIcone = id => !!D[id];

/* ---- as PALAVRAS. `f` é a família de cor: dano / def / bem / ruim / regra ---- */
export const CONCEITO = {
  fechadura:  { p:'Fechadura',   d:'a regra de como aquele inimigo pode ser ferido', f:'regra' },
  dano:       { p:'Dano',        d:'tira vida',                               f:'dano' },
  golpes:     { p:'Golpes',      d:'vários cortes pequenos no mesmo alvo',    f:'dano' },
  area:       { p:'Área',        d:'atinge TODOS os inimigos de uma vez',     f:'dano' },
  bloqueio:   { p:'Bloqueio',    d:'para o golpe; some no fim do turno',      f:'def'  },
  armadura:   { p:'Armadura',    d:'corta um tanto de CADA golpe, não acaba', f:'def'  },
  cura:       { p:'Cura',        d:'devolve vida',                            f:'bem'  },
  espinhos:   { p:'Espinhos',    d:'quem bate em você se fere',               f:'bem'  },
  invisivel:  { p:'Invisível',   d:'os golpes passam por você',               f:'bem'  },
  essencia:   { p:'Essência',    d:'moeda para as ferramentas da classe',     f:'bem'  },
  guarda:     { p:'Guarda',      d:'guarda dados para o próximo turno',       f:'bem'  },
  veneno:     { p:'Veneno',      d:'dano todo turno, e bloqueio não segura',  f:'ruim' },
  sangramento:{ p:'Sangramento', d:'dano toda vez que agir',                  f:'ruim' },
  queimadura: { p:'Queimadura',  d:'dano por turno, e vai baixando sozinho',  f:'ruim' },
  frenesi:    { p:'Fúria',       d:'bate mais forte',                         f:'ruim' },
  marca:      { p:'Marca',       d:'o próximo golpe nele vale mais',          f:'dano' },
  maldicao:   { p:'Maldição',    d:'suja um dado seu com a face Vazio',       f:'ruim' },
  congelado:  { p:'Congela',     d:'1 dado seu não rola no próximo turno',    f:'ruim' },
  fratura:    { p:'Fratura',     d:'o máximo do dado cai 1 — para sempre',    f:'ruim' },
  rouba:      { p:'Rouba',       d:'leva o seu maior dado do turno',          f:'ruim' },
  inverte:    { p:'Inverte',     d:'o seu melhor dado vira o pior',           f:'ruim' },
  enterra:    { p:'Enterra',     d:'some com 1 dado seu por 2 turnos',        f:'ruim' },
  sela:       { p:'Sela',        d:'tranca 1 habilidade sua por 1 turno',     f:'ruim' },
  taxa:       { p:'Taxa',        d:'cada dado que você gastar custa vida',    f:'ruim' },
  drena:      { p:'Drena',       d:'rouba o seu bloqueio e o veste',          f:'ruim' },
  contagem:   { p:'Contagem',    d:'golpe enorme quando a conta fechar',      f:'ruim' },
  exige:      { p:'Exige',       d:'não o feriu neste turno? todos enfurecem',f:'ruim' },
  cresce:     { p:'Cresce',      d:'ganha vida máxima e se cura',             f:'ruim' },
  explode:    { p:'Explode',     d:'ao morrer estoura em você e nos vizinhos',f:'ruim' },
  invoca:     { p:'Invoca',      d:'chama reforço para a fileira',            f:'ruim' },
  reergue:    { p:'Reergue',     d:'levanta os aliados caídos',               f:'ruim' },
  aura:       { p:'Aura',        d:'regra passiva que vale para o campo todo',f:'ruim' },
  /* os quatro verbos que só as suas habilidades têm */
  arromba:    { p:'Arromba',     d:'quebra a fechadura do alvo por este turno',f:'regra' },
  dissolve:   { p:'Dissolve',    d:'apaga a fechadura do alvo por N turnos',  f:'regra' },
  perfura:    { p:'Perfura',     d:'ignora armadura e bloqueio',              f:'regra' },
  executa:    { p:'Executa',     d:'mata na hora abaixo de X% de vida',       f:'regra' },
  reescreve:  { p:'Reescreve',   d:'muda o valor de dados na sua mão',        f:'regra' },
  ceifa:      { p:'Ceifa',       d:'converte o veneno acumulado em dano agora',f:'dano' },
  cego:       { p:'Cego',        d:'não abre fechadura nenhuma',              f:'regra' },
  custa:      { p:'Custa',       d:'você paga esta vida para usar',           f:'ruim' },
  /* o DADO tinha desenho mas não tinha verbete, e chip() só emite o que está
     no dicionário: o "6 DADOS" do mapa saía como string vazia. */
  dado:       { p:'Dados',       d:'quantos dados a sua bolsa tem',           f:'regra' },
  /* o mapa da masmorra */
  comum:      { p:'Comum',       d:'onda de inimigos comuns',                 f:'dano' },
  elite:      { p:'Elite',       d:'um inimigo mais forte lidera a onda',     f:'regra' },
  chefe:      { p:'Chefe',       d:'o dono da masmorra',                      f:'dano' },
  santuario:  { p:'Santuário',   d:'descanso e escolha antes de seguir',      f:'bem' },
  rerrolagem: { p:'Re-rolagens', d:'quantas vezes pode rolar de novo por turno', f:'def' },
  reliquia:   { p:'Relíquias',   d:'os objetos que você carrega',             f:'regra' },
  fardo:      { p:'Fardo',       d:'a regra extra que esta masmorra impõe',   f:'ruim' },
};

/* ---- as FECHADURAS: ícone, palavra e a REGRA EM FRASE ----
   `curto` das travas escreve "só sofre dano com dado 4+", que é uma frase
   sobre o inimigo. Na carta o que serve é a instrução para VOCÊ: o que a sua
   mão precisa ter. É outra frase, e por isso mora aqui. */
export const TRAVA_ICO = {
  impar:'impar', par:'par', forte:'forte', fraco:'fraco', chave:'chave',
  multiplo:'multiplo', enxuto:'enxuto', farto:'farto', simbolo:'simbolo',
  distintos:'distintos', iguais:'iguais', faixa:'faixa', primo:'primo',
  casal:'casal', espelho:'espelho', ou:'ou',
};
const FACE_NOME = { blade:'Lâmina', shield:'Escudo', essence:'Essência',
                    wild:'Curinga', echo:'Eco' };
const FRASE = {
  impar:   ()=> 'soma dos dados ÍMPAR',
  par:     ()=> 'soma dos dados PAR',
  forte:   v => `1 dado de ${v} ou mais`,
  fraco:   v => `nenhum dado acima de ${v}`,
  chave:   v => `soma exata de ${v}`,
  multiplo:v => `soma múltipla de ${v}`,
  enxuto:  v => `gastar exatamente ${v} dado${v>1?'s':''}`,
  farto:   v => `gastar ${v} dados ou mais`,
  simbolo: v => `a face ${FACE_NOME[v]||v} no golpe`,
  distintos:()=> 'dados todos diferentes',
  iguais:  v => `${v||2} dados, todos iguais`,
  faixa:   v => `soma entre ${v?.[0]} e ${v?.[1]}`,
  primo:   ()=> 'soma tem que ser primo',
  casal:   ()=> 'matar o gêmeo primeiro',
  espelho: v => `devolve ${v||30}% do 1º golpe`,
};
/* ===================================================================
   O NOME DA FECHADURA CARREGA A CONDIÇÃO.

   Antes o nome era só a FAMÍLIA da regra, e famílias se repetem: dois
   inimigos lado a lado diziam "DUAS CHAVES" com condições completamente
   diferentes, e "Couraça" servia tanto para dado 4+ quanto para dado 5+. Ler
   o nome não ensinava nada — era preciso reler a frase toda vez.

   Agora o nome é único por condição: COURAÇA 4 e COURAÇA 5 são nomes
   diferentes, e a composta se chama pelas duas partes que a formam
   (ÍMPAR ou ENXUTO 2). Isso é aprendível porque as partes já são conhecidas:
   quem viu ÍMPAR sozinho reconhece ÍMPAR dentro da composta.
   =================================================================== */
const NOME = {
  impar:   ()=> 'Ímpar',
  par:     ()=> 'Par',
  forte:   v => 'Couraça '+v,
  fraco:   v => 'Casca '+v,
  chave:   v => 'Chave '+v,
  multiplo:v => 'Múltiplo '+v,
  enxuto:  v => 'Enxuto '+v,
  farto:   v => 'Farto '+v,
  simbolo: v => 'Selo '+(FACE_NOME[v]||v),
  distintos:()=> 'Avesso',
  iguais:  v => 'Uníssono '+(v||2),
  faixa:   v => 'Janela '+v?.[0]+'–'+v?.[1],
  primo:   ()=> 'Indivisível',
  casal:   ()=> 'Gêmeo',
  espelho: v => 'Espelho '+(v||30)+'%',
};
/* {ico, nome, frase} da fechadura — inclusive a composta */
export function selo(t){
  if(!t) return null;
  if(t.t==='ou'){
    const p=(t.alts||[]).map(selo).filter(Boolean);
    if(!p.length) return null;
    if(p.length===1) return p[0];
    /* o ícone também vira os DOIS: ver ◐ ao lado de ① já diz qual composta é */
    return { ico:p.map(x=>x.ico), nome:p.map(x=>x.nome).join(' ou '),
             frase: p.map(x=>x.frase).join('  ou  '), alts:p };
  }
  const f=FRASE[t.t], n=NOME[t.t]; if(!f) return null;
  return { ico:TRAVA_ICO[t.t]||'fechadura',
           nome:(n?n(t.v):t.t.toUpperCase()), frase:f(t.v) };
}
/* o selo pode ter um ícone ou dois (composta) — quem desenha usa isto */
export function icoSelo(sl, cls='sic'){
  if(!sl) return '';
  return Array.isArray(sl.ico) ? sl.ico.map(i=>ico(i,cls)).join('') : ico(sl.ico,cls);
}

/* ---- O REQUISITO DA HABILIDADE, em frase ----
   Os dadinhos "≥ 5" são ótimos para quem já sabe e opacos para quem não
   sabe — e o jogo inteiro depende de o jogador entender o que a carta pede.
   A frase vai na carta; os dadinhos continuam existindo, na ficha. */
export function fraseRequisito(req){
  if(!req) return { titulo:'SEM CUSTO', frase:'não precisa de dado nenhum' };
  const n = v => v>1 ? v+' dados' : '1 dado';
  switch(req.t){
    case 'min':     return { titulo:'1 DADO',  frase:`de ${req.v} ou mais` };
    case 'exact':   return { titulo:'1 DADO',  frase:`exatamente ${req.v}` };
    case 'set':     return { titulo:n(req.size), frase:'todos com o mesmo valor' };
    case 'seq':     return { titulo:n(req.size), frase:'em sequência (3-4-5…)' };
    case 'sum':     return { titulo:`SOMA ${req.min}+`, frase:'quantos dados quiser' };
    case 'sumExact':return { titulo:`SOMA ${req.v}`,    frase:'exata, quantos quiser' };
    case 'parity':  return { titulo:'1 DADO',  frase: req.p==='odd'?'ímpar':'par' };
    case 'symbol':  return { titulo:'1 FACE',  frase:`da face ${FACE_NOME[req.s]||req.s}` };
    case 'any':     return { titulo:n(req.count||1), frase:'qualquer valor serve' };
    case 'each':    return { titulo:n(req.size),
                             frase:'cada um '+(fraseRequisito(req.of).frase||'') };
  }
  return { titulo:'—', frase:'' };
}

/* ---- o chip: ícone + PALAVRA + número. Um por efeito, nunca dois juntos. ---- */
export function chip(id, valor, opt={}){
  const c = CONCEITO[id]; if(!c) return '';
  const v = valor===undefined || valor===null || valor==='' ? '' :
    `<span class="cval">${valor}</span>`;
  return `<span class="chip c-${c.f}${opt.fraco?' fraco':''}${opt.classe?' '+opt.classe:''}" data-conc="${id}"
    ><i class="cico">${ico(id,'sic')}</i><span class="cpal">${opt.palavra||c.p}</span>${v}</span>`;
}

/* ---- a fórmula de dano de uma habilidade: "×3", "Σ", "valor ×5" ---- */
export function formulaDano(sk){
  let melhor=null;
  for(const e of (sk.eff||[])){
    if(e.op!=='dmg' && e.op!=='hits') continue;
    const amt=String(e.amt||'');
    const m=/(?:^|\+)\s*(sum|val|count)\s*\*\s*(\d+)/.exec(amt);
    const mult=m?+m[2]:(/(?:^|\+)\s*(sum|val|count)\s*(?:$|\+)/.test(amt)?1:0);
    if(!mult) continue;
    const base=m?m[1]:(/sum/.test(amt)?'sum':/val/.test(amt)?'val':'count');
    const fx=/(\d+)\s*\+\s*(?:sum|val|count)/.exec(amt);
    const fixo=fx?+fx[1]:(/\*\s*\d+\s*\+\s*(\d+)/.exec(amt)?.[1]|0);
    const cand={mult, base, fixo:+fixo||0, todos:e.tgt==='all', vezes:e.op==='hits'};
    if(!melhor||cand.mult>melhor.mult) melhor=cand;
  }
  return melhor;
}

/* ===================================================================
   OS CHIPS DE UMA HABILIDADE — derivados dos efeitos, não escritos à mão.

   Vem em ORDEM DE IMPORTÂNCIA, porque a carta compacta só mostra os três
   primeiros e a ficha mostra todos: o que ficar de fora tem que ser sempre o
   detalhe, nunca o golpe.
   =================================================================== */
export function chipsHabilidade(sk){
  const eff = sk.eff||[], out = [];
  const f = formulaDano(sk);
  const temDano = eff.some(e=>e.op==='dmg'||e.op==='hits');
  const areaDano = eff.some(e=>(e.op==='dmg'||e.op==='hits') && e.tgt==='all');
  const escala = f => f.mult>1 ? '×'+f.mult : BASE[f.base]||'';
  /* 1 · O GOLPE. É o que o jogador procura primeiro. */
  if(temDano){
    const hits = eff.find(e=>e.op==='hits');
    if(hits) out.push({id:'golpes', v:'×'+valorTxt(hits.times)});
    if(areaDano) out.push({id:'area', v: f?escala(f):''});
    else if(f)   out.push({id:'dano', v:escala(f)});
    else if(!hits) out.push({id:'dano', v:''});
  }
  if(eff.some(e=>e.op==='ceifar')) out.push({id:'ceifa', v:''});
  /* 2 · OS VERBOS DE FECHADURA — é neles que mora a jogada do puzzle. */
  if(eff.some(e=>e.op==='arrombar')) out.push({id:'arromba', v:''});
  const dis = eff.find(e=>e.op==='dissolver');
  if(dis) out.push({id:'dissolve', v:String(dis.n||'')});
  if(eff.some(e=>e.pierce)) out.push({id:'perfura', v:''});
  const ex = eff.find(e=>e.op==='exec');
  if(ex) out.push({id:'executa', v:Math.round((ex.pct||0)*100)+'%'});
  /* 3 · O QUE SOBRA NO ALVO E EM VOCÊ */
  for(const e of eff){
    if(e.op==='status' && CONCEITO[e.st]) out.push({id:e.st, v:valorTxt(e.n)});
    if(e.op==='freeze') out.push({id:'congelado', v:valorTxt(e.n)});
    if(e.op==='marcar') out.push({id:'marca', v:''});
  }
  const bl = eff.find(e=>e.op==='block');
  if(bl) out.push({id:'bloqueio', v: valorTxt(bl.amt)});
  const he = eff.find(e=>e.op==='heal');
  if(he) out.push({id:'cura', v: valorTxt(he.amt)});
  for(const e of eff) if(e.op==='selfStatus' && CONCEITO[e.st])
    out.push({id:e.st, v:valorTxt(e.n)});
  const es = eff.find(e=>e.op==='essence');
  if(es) out.push({id:'essencia', v:valorTxt(es.n)});
  const bk = eff.find(e=>e.op==='bank');
  if(bk) out.push({id:'guarda', v:valorTxt(bk.n)});
  if(eff.some(e=>e.op==='ajustar'||e.op==='definir'||e.op==='wildify'))
    out.push({id:'reescreve', v:''});
  /* 4 · O PREÇO. Último de propósito: é o que se lê por último e o que a
     carta antiga escondia por completo (a Guilhotina custa 6 e não dizia). */
  const sd = eff.find(e=>e.op==='selfdmg');
  if(sd) out.push({id:'custa', v:valorTxt(sd.amt)});
  /* 5 · CEGO: dizer o que ela NÃO faz só vale quando fere sem abrir nada. */
  const abre = eff.some(e=>e.op==='arrombar'||e.op==='dissolver'||e.pierce);
  if(temDano && !abre) out.push({id:'cego', v:'', fraco:true});
  /* O MESMO CONCEITO NÃO APARECE DUAS VEZES. Veneno Sutil envenena o alvo e
     mais 2 em todos: são dois efeitos, mas "Veneno · Veneno" na carta não
     ensina nada. Fica o primeiro, que é sempre o maior. */
  const visto = new Set();
  return out.filter(c => !visto.has(c.id) && visto.add(c.id));
}
/* Expressão do motor virando coisa legível: `val*3` é "×3", `sum` é "Σ".
   Sem isto a carta escrevia "Veneno val*3", que é código vazando na cara
   do jogador. */
const BASE = { sum:'Σ', val:'valor', count:'nº' };
export function valorTxt(x){
  const s = String(x ?? '').replace(/\s/g,'');
  if(!s) return '';
  if(/^\d+$/.test(s)) return s;
  const m = /^(sum|val|count)\*(\d+)(?:\+(\d+))?$/.exec(s);
  if(m) return '×'+m[2]+(m[3]?'+'+m[3]:'');
  const b = /^(sum|val|count)(?:\+(\d+))?$/.exec(s);
  if(b) return (BASE[b[1]]||'')+(b[2]?'+'+b[2]:'');
  return s.replace(/sum/g,'Σ').replace(/val/g,'valor').replace(/count/g,'nº');
}

/* ---- OS CHIPS DE UM INIMIGO: o que ele faz NESTE turno, e o que ele é ---- */
export function chipsIntencao(it, en){
  if(!it) return [];
  const m = en?.mult||1, n = v => Math.round((v||0)*m);
  switch(it.t){
    case 'atk':       return [{id:'dano', v:n(it.v)}];
    case 'atk_multi': return [{id:'dano', v:n(it.v)+'×'+it.n}];
    case 'block':     return [{id:'bloqueio', v:n(it.v)}];
    case 'heal':      return [{id:'cura', v:n(it.v)}];
    case 'buff':      return [{id:'frenesi', v:''}];
    case 'curse':     return [{id:'maldicao', v:''}];
    case 'debuff':    return CONCEITO[it.st] ? [{id:it.st, v:it.v||1}] : [];
    case 'congelar':  return [{id:'congelado', v:''}];
    case 'roubar':    return [{id:'rouba', v:''}];
    case 'fraturar':  return [{id:'fratura', v:''}];
    case 'inverter':  return [{id:'inverte', v:''}];
    case 'selar':     return [{id:'sela', v:''}];
    case 'taxa':      return [{id:'taxa', v:it.v}];
    case 'drenar':    return [{id:'drena', v:''}];
    case 'enterrar':  return [{id:'enterra', v:''}];
    case 'exigir':    return [{id:'exige', v:''}];
    case 'crescer':   return [{id:'cresce', v:'+'+n(it.v||6)}];
    case 'contar':    return [{id:'contagem',
                        v:((en?._conta||0)+1)+'/'+it.ate, alerta:(en?._conta||0)+1>=it.ate}];
    case 'summon':    return [{id:'invoca', v:''}];
  }
  return [];
}
/* o que este inimigo É — vale todo turno, não só neste */
export function chipsTraco(en){
  const out=[];
  if(en.explode) out.push({id:'explode', v:Math.round(en.explode*(en.mult||1)*0.55)});
  if(en.invoca)  out.push({id:'invoca',  v:''});
  if(en.reergue) out.push({id:'reergue', v:''});
  if(en.aura)    out.push({id:'aura',    v:'', txt:en.aura.txt});
  return out;
}
