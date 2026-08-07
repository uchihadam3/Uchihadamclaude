/* ========================================================================
   AS FAMÍLIAS — o desenho que vai na face da carta.

   Elas não são só tema. Cada família tem uma REGRA DE CONJUNTO que vale
   enquanto ela está no tabuleiro, e o sorteio da sala escolhe duas ou três.
   É o que faz duas salas do mesmo tamanho jogarem diferente.

   Os símbolos são caracteres desenháveis em qualquer fonte, não emoji: em
   Android, dentro de uma fonte serifada, metade dos emoji vira um risquinho
   cinza — já apanhamos disso em outro jogo desta mesma casa.
   ===================================================================== */
export const FAMILIAS = {
  runas:      { id:'runas', nome:'Runas', cor:'#c9a227',
                s:['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚻ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ'],
                regra:'Cada par de Runa dá +0,1 de multiplicador permanente na sala.' },
  espaco:     { id:'espaco', nome:'Espaço', cor:'#6ba8ff',
                s:['☉','☽','☿','♀','♁','♂','♃','♄','♅','♆','★','✦','✧','☄','◐','◑','◒','◓'],
                regra:'Cartas de Espaço trocam de lugar entre si a cada 6 viradas.' },
  alquimia:   { id:'alquimia', nome:'Alquimia', cor:'#8ad46a',
                s:['🜁','🜂','🜃','🜄','🜅','🜆','🜇','🜈','🜉','🜊','🜋','🜌','🜍','🜎','🜏','🜐','🜑','🜒'],
                regra:'Todo par de Alquimia devolve 1 virada.' },
  xadrez:     { id:'xadrez', nome:'Xadrez', cor:'#d8d8e8',
                s:['♔','♕','♖','♗','♘','♙','♚','♛','♜','♝','♞','♟','⯀','⯁','⯂','⯃','⯄','⯅'],
                regra:'Os dois primeiros pares de Xadrez da sala valem dobrado.' },
  mitologia:  { id:'mitologia', nome:'Mitologia', cor:'#b06bff',
                s:['⚱','⚲','⚳','⚴','⚵','⚶','⚷','⚸','⚹','⚺','⚻','⚼','⯰','⯱','⯲','⯳','⯴','⯵'],
                regra:'Errar contra Mitologia não zera o combo — só o corta pela metade.' },
  tecnologia: { id:'tecnologia', nome:'Tecnologia', cor:'#7fd4ff',
                s:['⌁','⌂','⌆','⌘','⌗','⌬','⍟','⎔','⎈','⏣','▤','▥','▦','▧','▨','▩','◧','◨'],
                regra:'A cada 3 pares de Tecnologia, revela uma carta fechada ao acaso.' },
  dragoes:    { id:'dragoes', nome:'Dragões', cor:'#ff6a5a',
                s:['🜲','🜳','🜴','🜵','🜶','🜷','🜸','🜹','🜺','🜻','🜼','🜽','🜾','🜿','⯑','⯒','⯓','⯔'],
                regra:'Cartas de Dragão valem +50% de pontos, mas cada erro custa 1 moeda.' },
  egito:      { id:'egito', nome:'Egito', cor:'#f0c14b',
                s:['𓂀','𓃭','𓆑','𓇋','𓈖','𓉐','𓊃','𓋴','𓌳','𓍿','𓎡','𓏏','𓐍','𓁿','𓂭','𓃀','𓄿','𓅓'],
                regra:'A cada par de Egito, uma carta fechada fica MARCADA — e carta marcada nunca é esquecida pela tela.' },
};
export const LISTA_FAMILIAS = Object.values(FAMILIAS);

/* quantas famílias a sala usa: mais famílias = mais fácil de distinguir os
   desenhos, então o número CAI conforme a run avança */
export function sortearFamilias(rng, dificuldade=0){
  const n = dificuldade < 0.3 ? 3 : dificuldade < 0.7 ? 2 : 2;
  return rng.sample(LISTA_FAMILIAS, n);
}
