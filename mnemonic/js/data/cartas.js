/* ========================================================================
   OS TIPOS DE CARTA — o que faz de Mnemonic um roguelike e não um jogo da
   memória.

   A DECISÃO CENTRAL DE DESIGN, e vale explicar porque tudo depende dela:
   a sala NÃO é vencida limpando o tabuleiro. Ela é vencida ATINGINDO UMA
   META DE PONTOS com um número limitado de viradas.

   Isso muda o jogo inteiro. Se bastasse limpar, a única habilidade seria
   lembrar, o tabuleiro grande seria sempre mais difícil que o pequeno, e
   relíquia nenhuma teria o que multiplicar. Com meta e viradas contadas,
   cada par vale um tanto, o COMBO multiplica esse tanto, e as relíquias
   mexem na conta — que é exatamente o eixo do Balatro. Memória vira o
   recurso que você gasta bem ou mal, não o único desafio.

   Cada tipo abaixo existe para atacar UMA das três coisas que o jogador
   controla: a memória (Fantasma, Camaleão), a conta (Cristal, Lendária,
   Ouro) ou o próprio tabuleiro (Portal, Corrente, Bomba).
   ===================================================================== */

export const TIPOS = {
  normal: {
    id:'normal', nome:'Normal', cor:'#cfd6e4', peso:100,
    d:'Sem truque. Vale o valor de base.',
    base:10,
  },
  ouro: {
    id:'ouro', nome:'Ouro', cor:'#f0c14b', peso:22,
    d:'Ao formar o par, rende moedas além dos pontos.',
    base:10, moedas:4,
  },
  cristal: {
    id:'cristal', nome:'Cristal', cor:'#7fd4ff', peso:18,
    d:'Vale o dobro de pontos.',
    base:10, mult:2,
  },
  lendaria: {
    id:'lendaria', nome:'Lendária', cor:'#ff9d4d', peso:4, unica:true,
    d:'Vale cinco vezes. Só existe uma por tabuleiro.',
    base:10, mult:5,
  },
  fantasma: {
    id:'fantasma', nome:'Fantasma', cor:'#a99cff', peso:16,
    d:'Some da sua vista assim que você desvira. Lembrar dela é com você.',
    base:14, esconde:true,
  },
  camaleao: {
    id:'camaleao', nome:'Camaleão', cor:'#7ee3a8', peso:12,
    d:'Troca de símbolo a cada 4 viradas. O par muda de lugar sem sair do lugar.',
    base:16, trocaSimbolo:4,
  },
  espelho: {
    id:'espelho', nome:'Espelho', cor:'#d8d8e8', peso:8,
    d:'Curinga: fecha par com qualquer carta.',
    base:8, curinga:true,
  },
  bomba: {
    id:'bomba', nome:'Bomba', cor:'#ff6a5a', peso:10,
    d:'Tem pavio de 8 viradas. Se estourar, leva o par embora e custa 1 de Foco.',
    base:18, pavio:8,
  },
  gelo: {
    id:'gelo', nome:'Gelo', cor:'#9fd8ff', peso:10,
    d:'A primeira vez só trinca. Precisa ser acertada duas vezes.',
    base:12, camadas:2,
  },
  corrente: {
    id:'corrente', nome:'Corrente', cor:'#c0a080', peso:9,
    d:'Ao ser resolvida, puxa uma carta fechada junto e revela ela.',
    base:12, acorrenta:true,
  },
  portal: {
    id:'portal', nome:'Portal', cor:'#b06bff', peso:9,
    d:'Ao ser resolvida, embaralha duas cartas ainda fechadas.',
    base:14, embaralha:2,
  },
  mimic: {
    id:'mimic', nome:'Mimic', cor:'#e05a8a', peso:7,
    d:'Copia o desenho de um par inteiro. Só fecha com o outro Mimic — casar com a cópia custa 1 de Foco a mais e desmascara ele.',
    base:20, mente:true,
  },
  /* ═══════ as quatro que faltavam do desenho original ═══════ */
  prisma: {
    id:'prisma', nome:'Prisma', cor:'#7ee3a8', peso:6,
    d:'Ao ser resolvida, o próximo par vale o dobro. A luz que ela quebra cai '
     +'na carta seguinte.',
    base:12, prisma:true,
  },
  amuleto: {
    id:'amuleto', nome:'Relíquia', cor:'#b478ff', peso:5,
    d:'Ao ser resolvida, rende essência — a moeda das ferramentas caras. Vale '
     +'pouco em ponto e muito em poder.',
    base:8, essencia:2,
  },
  tempo: {
    id:'tempo', nome:'Tempo', cor:'#4fb8ff', peso:5,
    d:'Ao ser resolvida, devolve 2 viradas. É a única carta que compra tempo '
     +'em vez de gastar.',
    base:10, devolve:2,
  },
  maldicao: {
    id:'maldicao', nome:'Maldição', cor:'#ff4f52', peso:15,
    d:'Enquanto estiver no tabuleiro, todo par vale 20% menos. Tirá-la da mesa '
     +'é mais urgente do que parece.',
    base:16, maldicao:true,
  },

  veneno: {
    id:'veneno', nome:'Veneno', cor:'#8ad46a', peso:8,
    d:'Enquanto estiver no tabuleiro, todo esquecimento custa 1 de Foco a mais.',
    base:12, agrava:true,
  },
  raio: {
    id:'raio', nome:'Raio', cor:'#ffe066', peso:7,
    d:'Ao ser resolvida, revela por um instante todas as cartas da mesma família.',
    base:12, revelaFamilia:true,
  },
};
export const LISTA_TIPOS = Object.values(TIPOS);

/* ---- sorteio do baralho de uma sala ----
   `dificuldade` empurra o sorteio para os tipos que atrapalham. Sem isso a
   sala 12 seria a sala 1 com mais cartas, que é o defeito clássico do
   gênero: tabuleiro maior não é tabuleiro mais difícil, é tabuleiro mais
   demorado. */
export function sortearTipos(rng, quantosPares, dificuldade=0){
  const atrapalha = t => t.esconde||t.trocaSimbolo||t.mente||t.pavio||t.camadas
                     ||t.agrava||t.maldicao;
  const pool = [];
  for(const t of LISTA_TIPOS){
    if(t.id==='normal') continue;
    const p = Math.round(t.peso * (atrapalha(t) ? (1 + dificuldade*0.55) : 1));
    for(let i=0;i<p;i++) pool.push(t.id);
  }
  const especiais = Math.min(quantosPares-1,
    Math.round(quantosPares * (0.22 + dificuldade*0.16)));
  const tipos = new Array(quantosPares).fill('normal');
  const alvos = rng.sample([...tipos.keys()], especiais);
  const usados = new Set();
  for(const i of alvos){
    let t = rng.pick(pool), guarda=0;
    while(TIPOS[t].unica && usados.has(t) && guarda++<20) t = rng.pick(pool);
    if(TIPOS[t].unica && usados.has(t)) continue;
    usados.add(t); tipos[i]=t;
  }
  return tipos;
}
