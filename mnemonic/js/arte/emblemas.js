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

     MOLDURA (6)  o contorno — escudo, disco, losango, hexágono, tábua, gota
     MARCA (12)   o que está dentro — olho, chama, gota, chave, engrenagem…

   São 72 combinações para 54 relíquias, distribuídas por uma conta fixa a
   partir da posição na lista: a mesma relíquia devolve sempre o mesmo
   emblema, em qualquer aparelho, sem sorteio. E quando chegar arte pintada
   para uma delas, a arte entra por cima e este arquivo para de valer para
   aquela — sem que nada mais precise mudar.
   ===================================================================== */

const MOLDURAS = [
  'M12 2.4 L20.4 6.2 V13 c0 4.2-3.6 6.6-8.4 8.4 C6.8 19.6 3.6 17.2 3.6 13 V6.2 Z',
  'M12 2.6 A9.4 9.4 0 1 0 12.01 2.6',
  'M12 2 L21 12 L12 22 L3 12 Z',
  'M12 2.2 L20.2 7 V17 L12 21.8 L3.8 17 V7 Z',
  'M4.4 3.4 h15.2 a1.6 1.6 0 0 1 1.6 1.6 v14 a1.6 1.6 0 0 1-1.6 1.6 H4.4 '
  + 'a1.6 1.6 0 0 1-1.6-1.6 V5 a1.6 1.6 0 0 1 1.6-1.6 Z',
  'M12 2.2 C16.4 7.6 19.4 11.2 19.4 14.6 A7.4 7.4 0 0 1 4.6 14.6 '
  + 'C4.6 11.2 7.6 7.6 12 2.2 Z',
];

/* cada marca é uma silhueta cheia: dentro de uma moldura pequena, traço fino
   some, e o que se lê de relance é a mancha */
const MARCAS = [
  'M12 8.4 c3.2 0 5.4 2.2 6.2 3.6 -.8 1.4 -3 3.6 -6.2 3.6 -3.2 0 -5.4-2.2-6.2-3.6 '
  + '.8-1.4 3-3.6 6.2-3.6 Z M12 10.2 a1.8 1.8 0 1 0 .01 0 Z',      /* olho */
  'M12 6.6 c2.6 3 3.8 4.8 3.8 6.6 a3.8 3.8 0 0 1-7.6 0 c0-1.8 1.2-3.6 3.8-6.6 Z', /* chama */
  'M12 6.8 c2.4 3.2 3.6 4.8 3.6 6.4 a3.6 3.6 0 0 1-7.2 0 c0-1.6 1.2-3.2 3.6-6.4 Z', /* gota */
  'M10.6 7.4 a2.6 2.6 0 1 1 2.6 2.6 h-.4 v1.4 h1.6 v1.4 h-1.6 v1.4 h1.6 v1.4 h-3.2 Z', /* chave */
  'M12 7.6 l1.5 3 3.3.4 -2.4 2.3 .6 3.3 -3-1.6 -3 1.6 .6-3.3 -2.4-2.3 3.3-.4 Z',  /* estrela */
  'M8 8 h8 v2.2 h-2.9 v6.2 h-2.2 v-6.2 H8 Z',                        /* âncora/T */
  'M12 7 l4.6 2.6 v5.2 L12 17.4 L7.4 14.8 V9.6 Z M12 10.4 a1.9 1.9 0 1 0 .01 0 Z', /* engrenagem */
  'M7.6 15.4 L12 7.2 L16.4 15.4 Z',                                  /* montanha */
  'M8.2 8.2 h7.6 v2 H8.2 Z M8.2 11.4 h7.6 v2 H8.2 Z M8.2 14.6 h7.6 v2 H8.2 Z', /* livro */
  'M12 6.8 a5.2 5.2 0 1 1-.01 0 Z M12 9.4 a2.6 2.6 0 1 0 .01 0 Z',   /* anel */
  'M13.6 6.6 L9 13.2 h3.2 L10.8 17.6 L15.4 11 h-3.2 Z',              /* raio */
  'M8.4 16.6 L12 6.8 L15.6 16.6 L12 14.2 Z',                         /* pena */
];

/* A MARCA ANDA DE UM EM UM E A MOLDURA SÓ TROCA QUANDO ELA DÁ A VOLTA.
   A primeira tentativa foi girar as duas ao mesmo tempo (×5 e ×7): parecia
   espalhar, e dava DOZE emblemas para setenta e cinco relíquias, porque os
   dois ciclos andavam juntos. Contando como um número de dois dígitos — a
   marca nas unidades, a moldura nas dezenas — as 72 combinações saem todas
   antes de qualquer uma se repetir. */
export function emblema(i, cls='gl'){
  const n = Math.abs(i|0);
  const k = MARCAS[n % MARCAS.length];
  const m = MOLDURAS[Math.floor(n / MARCAS.length) % MOLDURAS.length];
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">`
       + `<path d="${m}" fill="none"/>`
       + `<path d="${k}" fill="currentColor" stroke="none"/></svg>`;
}

/* quantos emblemas distintos existem antes de o desenho se repetir */
export const DISTINTOS = MOLDURAS.length * MARCAS.length;
