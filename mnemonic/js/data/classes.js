/* ========================================================================
   AS CLASSES — cada uma joga um jogo diferente, não um jogo mais forte.

   O teste que cada classe tem que passar: se eu trocar a classe e a run
   ficar igual, ela não devia existir. Por isso nenhuma delas dá só "+X de
   alguma coisa" — cada uma acrescenta um VERBO que muda a decisão da tentativa.
   ===================================================================== */
export const CLASSES = {
  detetive: {
    id:'detetive', nome:'A Detetive', glifo:'◎', cor:'#5385ea',
    lema:'Olhar antes de tocar.',
    d:'Começa cada sala espiando duas cartas fechadas, e pode espiar mais uma vez no meio.',
    foco:4, viradasBonus:0, moedas:12,
    ferramenta:{ id:'espiar', nome:'Lupa', usos:1,
      d:'Revela 2 cartas fechadas por um instante.' },
    inicioSala: sala => sala.espiar(2),
  },
  cronomante: {
    id:'cronomante', nome:'O Cronomante', glifo:'⧗', cor:'#9253ea',
    lema:'O erro é uma coisa que se desfaz.',
    d:'Joga com mais tentativas e pode desfazer o último erro — inclusive o combo que ele quebrou.',
    foco:3, viradasBonus:4, moedas:10,
    ferramenta:{ id:'voltar', nome:'Ampulheta', usos:1,
      d:'Devolve a tentativa do último erro e o combo que você tinha.' },
  },
  trapaceiro: {
    id:'trapaceiro', nome:'O Trapaceiro', glifo:'⇄', cor:'#53ea78',
    lema:'Se o tabuleiro não ajuda, muda o tabuleiro.',
    d:'Escolhe duas cartas fechadas e obriga as duas a serem par. Ganha mais moedas e aguenta menos.',
    foco:3, viradasBonus:0, moedas:20, mods:{ moedaBonus:2 },
    ferramenta:{ id:'trocar', nome:'Mão Leve', usos:2,
      d:'Duas cartas fechadas viram par uma da outra. As antigas parceiras ficam sem par — e sem par fecha com sem par.' },
  },
  hacker: {
    id:'hacker', nome:'A Hacker', glifo:'⌘', cor:'#9eea53',
    lema:'Tudo é dado, e dado vaza.',
    d:'Começa a sala com um par inteiro já marcado, e enxerga o tipo das cartas antes de virar.',
    foco:3, viradasBonus:1, moedas:10, veTipos:true,
    ferramenta:{ id:'varrer', nome:'Varredura', usos:1,
      d:'Marca na tela todas as cartas de um mesmo tipo.' },
    inicioSala: sala => {
      const c = sala.rng.pick(sala.fechadas());
      if(!c) return [];
      const irmao = sala.cartas.find(x=>x.par===c.par && x.id!==c.id);
      for(const x of [c,irmao]) if(x) sala._mostrar(x);
      return [c.id, irmao?.id].filter(x=>x!=null);
    },
  },
  mago: {
    id:'mago', nome:'O Mago', glifo:'✶', cor:'#ea8553',
    lema:'A carta obedece ao nome que eu der.',
    d:'Cada acerto acumula Essência; com 3, transforma uma carta fechada em Curinga.',
    foco:3, viradasBonus:0, moedas:10, mods:{ ganhaEssencia:true },
    ferramenta:{ id:'curinga', nome:'Transmutar', usos:99, custoEssencia:3,
      d:'Vira uma carta fechada em Espelho (fecha par com qualquer uma).' },
  },
  cientista: {
    id:'cientista', nome:'A Cientista', glifo:'⚗', cor:'#53eaea',
    lema:'Errar também é medir.',
    d:'Cada erro dá +0,15 de multiplicador permanente na sala. Errar dói e ensina.',
    foco:5, viradasBonus:0, moedas:10, erroRende:0.15,
    ferramenta:{ id:'analisar', nome:'Análise', usos:1,
      d:'Revela todas as cartas de uma família por um instante.' },
  },
  arqueologo: {
    id:'arqueologo', nome:'O Arqueólogo', glifo:'⛏', cor:'#eadd53',
    lema:'O que está enterrado vale mais.',
    d:'Começa com uma relíquia a mais e acha relíquia onde os outros acham moeda.',
    foco:3, viradasBonus:0, moedas:8, reliquiaExtra:1,
    ferramenta:{ id:'escavar', nome:'Escavar', usos:1,
      d:'Resolve na hora um par ainda fechado, sem gastar tentativa.' },
  },
  genio: {
    id:'genio', nome:'A Gênia', glifo:'∞', cor:'#ea53c4',
    lema:'Menos tentativas, mais certeza.',
    d:'Tem menos tentativas que todo mundo, e todo par vale o dobro.',
    foco:3, viradasBonus:-4, moedas:10, mods:{ }, dobraTudo:true,
    ferramenta:{ id:'foco', nome:'Concentração', usos:1,
      d:'Dobra o multiplicador de combo até o próximo erro.' },
  },
};
export const LISTA_CLASSES = Object.values(CLASSES);
