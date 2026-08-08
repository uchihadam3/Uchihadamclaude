/* ========================================================================
   EMBLEMAS DE RELÍQUIA — uma marca própria para cada, sem esperar arte.

   Vinte e uma relíquias chegaram pintadas, e o jogo passou de "vinte e um
   amuletos idênticos" para "vinte e uma coisas". Aí o catálogo cresceu para
   setenta e cinco, e as cinquenta e quatro novas voltariam a dividir o mesmo
   amuleto genérico — que é exatamente o problema que a arte tinha resolvido:
   escolher entre três coisas iguais não é escolher, é ler três parágrafos e
   chutar.

   Esperar arte para todas travaria o conteúdo. Então cada relíquia sem arte
   pintada ganha um emblema DESENHADO, montado de duas peças:

     MOLDURA (6)  a silhueta — escudo, disco, losango, hexágono, tábua, gota
     MARCA (12)   o vazado de dentro — olho, chama, lua, chave, estrela…

   São 72 combinações para 54 relíquias, distribuídas por uma conta fixa a
   partir da posição na lista: a mesma relíquia devolve sempre o mesmo
   emblema, em qualquer aparelho, sem sorteio.

   ═══ A SEGUNDA VERSÃO, E POR QUE ═══════════════════════════════════════
   A primeira desenhava a moldura de contorno fino e a marca cheia por dentro,
   pequena. Setenta e duas combinações existiam na conta e não existiam na
   tela: a vinte e seis pixels, o contorno fino quase não aparecia e o que
   restava era a marquinha do meio. Como duas das doze marcas eram gotas — a
   "chama" e a "gota" — a parede de relíquias mostrava Rede de Pesca, Cristal
   Bruto e Ferradura com o mesmo desenho, que é o defeito que este arquivo
   nasceu para não ter.

   Medido em `test/glifos.mjs`, que rasteriza e compara a mancha: o pior par
   marcava 7,2 numa régua onde 26 já é perto demais.

   Agora a moldura é CHEIA e a marca é um VAZADO nela. A silhueta passa a ser
   a moldura, que é a peça grande e a que muda de forma inteira; o vazado é
   grande o bastante para ser lido de relance. É o mesmo truque das cartas do
   Xadrez, que sempre foram as mais fáceis de ler de longe: massa, e não
   traço.
   ===================================================================== */

/* as seis silhuetas, desenhadas grandes: elas são o que se enxerga primeiro */
const MOLDURAS = [
  /* escudo */
  'M12 1.8 L21 5.6 V13 c0 4.6-3.9 7.4-9 9.2 C6.9 20.4 3 17.6 3 13 V5.6 Z',
  /* disco */
  'M12 2.2 A9.8 9.8 0 1 0 12.01 2.2 Z',
  /* losango */
  'M12 1.6 L22 12 L12 22.4 L2 12 Z',
  /* tábua */
  'M4 3 h16 a1.8 1.8 0 0 1 1.8 1.8 v14.4 a1.8 1.8 0 0 1-1.8 1.8 H4 '
  + 'a1.8 1.8 0 0 1-1.8-1.8 V4.8 A1.8 1.8 0 0 1 4 3 Z',
  /* gota */
  'M12 1.6 C17 7.6 20.4 11.6 20.4 15.2 A8.4 8.4 0 0 1 3.6 15.2 '
  + 'C3.6 11.6 7 7.6 12 1.6 Z',
  /* arco de lápide */
  'M12 1.7 c4.8 0 8.4 3.4 8.4 8.1 V21 H3.6 V9.8 C3.6 5.1 7.2 1.7 12 1.7 Z',
];

/* AS DOZE MARCAS SÃO VAZADOS, e é isso que decide como desenhá-las: grandes,
   de contorno simples e sem detalhe fino — um furo de dois pixels não é uma
   forma, é sujeira. Nenhuma parecida com outra: foi por ter duas gotas na
   lista que a versão anterior repetiu desenho na parede inteira. */
const MARCAS = [
  /* olho — a pupila é um segundo furo dentro do furo, e volta a ser cheia */
  'M12 7.4 c3.9 0 6.6 2.7 7.4 4.6 -.8 1.9 -3.5 4.6 -7.4 4.6 -3.9 0-6.6-2.7-7.4-4.6 '
  + '.8-1.9 3.5-4.6 7.4-4.6 Z M12 9.7 a2.3 2.3 0 1 0 .01 0 Z',
  /* chama */
  'M12 5.4 c3.6 4.2 5.3 6.6 5.3 8.8 a5.3 5.3 0 0 1-10.6 0 c0-2.2 1.7-4.6 5.3-8.8 Z',
  /* lua */
  'M15.8 4.8 a7.4 7.4 0 1 0 0 14.4 a8.9 8.9 0 0 1 0-14.4 Z',
  /* chave */
  'M9 8.2 a3.8 3.8 0 1 1 3.8 3.8 h-.6 v2 h2.4 v2 h-2.4 v2 h2.4 v2 h-5 Z'
  + ' M12.8 6.2 a1.5 1.5 0 1 0 .01 0 Z',
  /* estrela */
  'M12 4.4 l2.5 5 5.5.8 -4 3.8 1 5.5 -5-2.6 -5 2.6 1-5.5 -4-3.8 5.5-.8 Z',
  /* cruz */
  'M9.9 4.6 h4.2 v5.3 h5.3 v4.2 h-5.3 v5.3 H9.9 v-5.3 H4.6 V9.9 h5.3 Z',
  /* hexágono pequeno */
  'M12 4.8 L18.6 8.4 V15.6 L12 19.2 L5.4 15.6 V8.4 Z',
  /* triângulo */
  'M12 4.6 L19.8 19.2 H4.2 Z',
  /* três barras */
  'M4.8 6 h14.4 v2.8 H4.8 Z M4.8 10.6 h14.4 v2.8 H4.8 Z M4.8 15.2 h14.4 v2.8 H4.8 Z',
  /* anel */
  'M12 4.2 a7.8 7.8 0 1 0 .01 0 Z M12 8.6 a3.4 3.4 0 1 0 .01 0 Z',
  /* raio */
  'M15.2 3.6 L6.4 13.6 h4.2 L8.6 20.4 L17.4 10.4 h-4.2 Z',
  /* ampulheta */
  'M5.6 4.6 h12.8 L12 12 l6.4 7.4 H5.6 L12 12 Z',
];

/* A MARCA ANDA DE UM EM UM E A MOLDURA SÓ TROCA QUANDO ELA DÁ A VOLTA.
   A primeira tentativa foi girar as duas ao mesmo tempo (×5 e ×7): parecia
   espalhar, e dava DOZE emblemas para setenta e cinco relíquias, porque os
   dois ciclos andavam juntos. Contando como um número de dois dígitos — a
   marca nas unidades, a moldura nas dezenas — as 72 combinações saem todas
   antes de qualquer uma se repetir. */
export function emblema(i, cls='gl'){
  const n = Math.abs(i|0);
  const m = MOLDURAS[n % MOLDURAS.length];
  const k = MARCAS[Math.floor(n / MOLDURAS.length) % MARCAS.length];
  /* uma peça só, com `evenodd`: a moldura é a massa e a marca é o furo. Dois
     caminhos separados não serviriam — o furo precisa ser furo NA moldura, e
     não uma marca desenhada por cima dela. */
  /* e a peça inteira GIRA um pouco conforme a marca. Sem isto, dois emblemas
     que compartilham a moldura só se diferenciavam pelo vazado, e o vazado é
     a peça pequena: eram os pares mais próximos da parede inteira. Girar o
     conjunto muda a silhueta, que é o que o olho pega de relance. */
  const giro = [0, 18, 36, 9][Math.floor(n / MOLDURAS.length) % 4];
  const t = giro ? ` transform="rotate(${giro} 12 12)"` : '';
  return `<svg class="${cls} emb" viewBox="0 0 24 24" aria-hidden="true">`
       + `<path d="${m} ${k}" fill="currentColor" fill-rule="evenodd"`
       + ` stroke="none"${t}/></svg>`;
}

/* quantos emblemas distintos existem antes de o desenho se repetir */
export const DISTINTOS = MOLDURAS.length * MARCAS.length;
