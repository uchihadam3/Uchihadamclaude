/* ========================================================================
   AS FAMÍLIAS — o desenho que vai na face da carta.

   Elas não são só tema. Cada família tem uma REGRA DE CONJUNTO que vale
   enquanto ela está no tabuleiro, e o sorteio da sala escolhe duas ou três.
   É o que faz duas salas do mesmo tamanho jogarem diferente.

   OS SÍMBOLOS SÃO DESENHADOS, NÃO DIGITADOS. Runa, hieróglifo e símbolo
   alquímico existem em Unicode e quase nenhum existe na fonte de um celular
   comum — no Android metade vira retângulo vazio. Num jogo da memória isso
   não é feiúra, é quebra de regra: duas cartas diferentes viram a mesma
   carta na tela. Então `s` guarda ÍNDICES e `js/arte/glifos.js` desenha cada
   um em SVG, a partir da gramática da família.

   A identidade de uma carta é o par (família, índice). O índice sozinho se
   repete de família para família de propósito: o desenho é outro.

   `traco` é a silhueta da família em três palavras — é como o jogador lê o
   tabuleiro de longe, antes de reconhecer o desenho exato.
   ===================================================================== */
import { POR_FAMILIA } from '../arte/glifos.js';
const IDX = [...Array(POR_FAMILIA).keys()];

export const FAMILIAS = {
  runas:      { id:'runas', nome:'Runas', cor:'#c9a227', s:IDX,
                traco:'retas e ângulos',
                regra:'Cada par de Runa dá +0,1 de multiplicador permanente na sala.' },
  espaco:     { id:'espaco', nome:'Espaço', cor:'#6ba8ff', s:IDX,
                traco:'círculos e órbitas',
                regra:'Cartas de Espaço trocam de lugar entre si a cada 6 tentativas.' },
  alquimia:   { id:'alquimia', nome:'Alquimia', cor:'#8ad46a', s:IDX,
                traco:'triângulos com barras',
                regra:'Todo par de Alquimia devolve 1 tentativa.' },
  xadrez:     { id:'xadrez', nome:'Xadrez', cor:'#d8d8e8', s:IDX,
                traco:'polígonos cheios',
                regra:'Os dois primeiros pares de Xadrez da sala valem dobrado.' },
  mitologia:  { id:'mitologia', nome:'Mitologia', cor:'#b06bff', s:IDX,
                traco:'arcos concêntricos',
                regra:'Errar contra Mitologia não zera o combo — só o corta pela metade.' },
  tecnologia: { id:'tecnologia', nome:'Tecnologia', cor:'#7fd4ff', s:IDX,
                traco:'caixas com marca',
                regra:'A cada 3 pares de Tecnologia, revela uma carta fechada ao acaso.' },
  dragoes:    { id:'dragoes', nome:'Dragões', cor:'#ff6a5a', s:IDX,
                traco:'garras curvas',
                regra:'Cartas de Dragão valem +50% de pontos, mas cada erro custa 1 moeda.' },
  egito:      { id:'egito', nome:'Egito', cor:'#f0c14b', s:IDX,
                traco:'hastes e travessas',
                regra:'A cada par de Egito, uma carta fechada fica MARCADA — e carta marcada nunca é esquecida pela tela.' },
  /* As cinco últimas. Cada uma puxa uma alavanca DIFERENTE do motor, senão
     família nova é só pintura: Animais mexem no prazo da memória, Piratas na
     moeda, Samurai no Foco, Dinossauros no ponto base (e cobram tentativa),
     Robôs na revelação. Nenhuma repete o que as oito de cima já faziam. */
  animais:    { id:'animais', nome:'Animais', cor:'#e2843c', s:IDX,
                traco:'cabeças e orelhas',
                regra:'Carta de Animal que você vê fica na tela uma tentativa a mais.' },
  piratas:    { id:'piratas', nome:'Piratas', cor:'#2ec4c4', s:IDX,
                traco:'âncoras e velas',
                regra:'Todo par de Pirata rende 2 moedas.' },
  samurai:    { id:'samurai', nome:'Samurai', cor:'#ff8fb3', s:IDX,
                traco:'lâminas e brasões',
                regra:'A cada 2 pares de Samurai, você recupera 1 de Foco.' },
  dinossauros:{ id:'dinossauros', nome:'Dinossauros', cor:'#35a86a', s:IDX,
                traco:'mandíbulas e dorsos',
                regra:'Cartas de Dinossauro valem +6 de pontos base, mas cada par de Dinossauro custa 1 tentativa.' },
  robos:      { id:'robos', nome:'Robôs', cor:'#b8d43a', s:IDX,
                traco:'caixas e engrenagens',
                regra:'A cada 2 pares de Robô, um par fechado INTEIRO aparece por um instante.' },
};
export const LISTA_FAMILIAS = Object.values(FAMILIAS);

/* quantas famílias a sala usa: mais famílias = mais fácil de distinguir os
   desenhos, então o número CAI conforme a run avança */
export function sortearFamilias(rng, dificuldade=0){
  const n = dificuldade < 0.35 ? 3 : 2;
  return rng.sample(LISTA_FAMILIAS, n);
}
