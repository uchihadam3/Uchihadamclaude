/* ========================================================================
   O QUE VOCÊ JÁ VIU.

   A coleção mostrava as 21 relíquias, os 14 tipos de carta e os 6 chefes
   desde a primeira vez que alguém abria o jogo. Isso tem dois problemas, e o
   segundo é o pior:

     · ESTRAGA A SURPRESA. Metade da graça de um roguelike é abrir a sala do
       Mimic sem saber o que é um Mimic.
     · E TIRA O SENTIDO DE COLEÇÃO. Uma vitrine em que tudo já está lá não é
       coleção, é manual. Não há nada para completar.

   Aqui fica o registro do que o jogador já encontrou de fato. É só uma lista
   de identificadores por capítulo, no armazenamento do aparelho — não entra
   no placar, não entra no replay e não muda regra nenhuma. Perder este
   arquivo não quebra partida: perde-se progresso de vitrine, e nada mais.

   O que conta como VER cada coisa está em `descobrir`, no jogo, e a regra é
   sempre a mesma: viu na tela, virou seu.
   ===================================================================== */
const CHAVE = 'mnemonic.vistos';

function ler(){
  try { const v = JSON.parse(localStorage.getItem(CHAVE) || '{}');
        return v && typeof v === 'object' ? v : {}; } catch(e){ return {}; }
}
let cache = ler();

/* marca um ou vários de uma vez. Devolve os que são NOVIDADE, para a tela
   poder comemorar sem ter de comparar listas por fora. */
export function descobrir(capitulo, ids){
  const lista = Array.isArray(ids) ? ids : [ids];
  const antes = new Set(cache[capitulo] || []);
  const novos = lista.filter(id => id != null && !antes.has(id));
  if(!novos.length) return [];
  cache[capitulo] = [...antes, ...novos];
  try { localStorage.setItem(CHAVE, JSON.stringify(cache)); } catch(e){}
  return novos;
}

export const viu = (capitulo, id) => (cache[capitulo] || []).includes(id);
export const vistos = capitulo => new Set(cache[capitulo] || []);
export const quantosViu = capitulo => (cache[capitulo] || []).length;

/* O VOCABULÁRIO NÃO SE ESCONDE. Meta, virada, foco e combo são as regras do
   jogo, não conteúdo a descobrir: esconder isso seria esconder como se joga.
   Mesma coisa para a escada de combo e para as classes, que estão todas na
   tela de escolha antes da primeira partida.

   MEDALHA também não se esconde, por outro motivo: ela é uma META. Uma meta
   secreta não puxa ninguém para a próxima run — o jogador precisa ver o que
   falta para querer ir buscar. */
export const SEMPRE_ABERTO = new Set(['palavra', 'combo', 'classe', 'conquista']);
export const escondeCapitulo = cap => !SEMPRE_ABERTO.has(cap);

/* para o botão de "esquecer tudo" das opções, e para os testes */
export function apagarDescobertas(){
  cache = {};
  try { localStorage.removeItem(CHAVE); } catch(e){}
}
