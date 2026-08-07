/* ========================================================================
   O GRIMÓRIO — a tela que explica o jogo inteiro, em abas.

   Regra da casa (§12/§15): nada de informação escondida. Se o inimigo diz
   "só sofre dano com dado 4+", tem que existir um lugar que mostre, com
   exemplo numérico, o que passa e o que não passa.

   Ele era uma página só, com seis blocos empilhados e botões que apenas
   rolavam a tela: para achar uma coisa você tinha que passar por todas as
   outras. Agora é UMA ABA POR ASSUNTO — abre onde você quer e mostra só
   aquilo.

   E o que dá para GERAR, é gerado: as habilidades saem de data/classes.js,
   os inimigos e os fardos de data/dungeons.js, as passivas de
   data/passivas.js. Grimório escrito à mão envelhece na primeira mudança de
   número; este acompanha o jogo porque lê o mesmo dado que o jogo lê.
   ===================================================================== */
import * as SIM from './data/simbolos.js';
import { CLASSES, RESPIRAR } from './data/classes.js';
import { MASMORRAS, ESCALADA } from './data/dungeons.js';
import { ARVORES, ANEIS } from './data/passivas.js';
import { TIPOS, MATERIAIS } from './data/dice.js';
import { reqLabel } from './engine/requirements.js';

const ex = (bom, ruim) => ({ bom, ruim });
const esc = t => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ---- o multiplicador escrito na habilidade, lido da própria fórmula ---- */
function formulaTxt(sk){
  for(const e of (sk.eff||[])){
    if(e.op!=='dmg' && e.op!=='hits') continue;
    const amt = String(e.amt||'');
    const m = /(?:^|\+)\s*(sum|val|count)\s*\*\s*(\d+)/.exec(amt);
    if(!m) continue;
    const base = m[1]==='sum' ? 'a soma dos dados' : m[1]==='val' ? 'o valor do dado' : 'o nº de dados';
    const fx = /(\d+)\s*\+\s*(?:sum|val|count)/.exec(amt);
    return `${base} × ${m[2]}${fx?` + ${fx[1]}`:''}${e.tgt==='all'?' — em TODOS':''}`;
  }
  return null;
}

/* ========================================================================
   VERBETE AVULSO — o cartãozinho que abre ao tocar num efeito do inimigo.
   O Grimório inteiro é pra quem quer estudar; no meio da luta você quer
   saber UMA coisa só, sem sair do combate.
   ===================================================================== */
export const INTENCOES = {
  atk:        { ico:'⚔', nome:'Ataque',        d:'Ele bate em você no fim do turno. O número é o dano bruto — o que passar do seu bloqueio vira HP perdido.' },
  atk_multi:  { ico:'⚔', nome:'Ataque múltiplo',d:'Vários golpes menores. Cada um é abatido pelo seu bloqueio separadamente, então bloqueio pequeno rende menos aqui.' },
  block:      { ico:'🛡', nome:'Defesa',        d:'Ele levanta uma barreira que absorve dano antes do HP. Ela DURA o seu turno inteiro e só expira quando ele volta a agir — quebre a barreira antes de tentar matar.' },
  heal:       { ico:'✚', nome:'Cura',          d:'Cura o aliado mais ferido. Matar o curandeiro primeiro costuma ser a jogada.' },
  buff:       { ico:'▲', nome:'Fúria',         d:'Enfurece o grupo: todos passam a causar +50% de dano.' },
  curse:      { ico:'☠', nome:'Maldição',      d:'Transforma uma face de um dado seu em ☠ Vazio — PARA SEMPRE nesta run. Aquela face deixa de valer.' },
  debuff:     { ico:'▼', nome:'Praga',         d:'Aplica um estado ruim em você. Toque no estado no seu rodapé pra ver o que ele faz.' },
  congelar:   { ico:'❄', nome:'Congelar dado', d:'Trava um dado seu na face em que ele caiu: no próximo turno ele NÃO rola, vem com o mesmo número.' },
  roubar:     { ico:'✋', nome:'Roubar dado',   d:'Tira o seu MAIOR dado deste turno. Ele some da mesa e você joga com um a menos.' },
  fraturar:   { ico:'✖', nome:'Fraturar dado', d:'O valor máximo de um dado seu cai 1 — PARA SEMPRE nesta run. Um d6 vira um dado que nunca mais tira 6.' },
  inverter:   { ico:'⇅', nome:'Inverter dado', d:'Vira o seu melhor dado pra face oposta (num d6, 6 vira 1). Costuma quebrar a fechadura que você ia abrir.' },
  contar:     { ico:'🕳', nome:'A Conta',       d:'Ele conta os turnos. Quando a conta fecha, desce um golpe enorme. Mate antes, ou tenha bloqueio pronto.' },
  summon:     { ico:'✦', nome:'Invocar',       d:'Chama reforço pro campo.' },
  /* ===== FUNDO DO ABISMO — só da Masmorra 5 em diante =====
     As de cima tiram o seu HP; estas tiram as suas OPÇÕES, que é o que
     realmente dói num jogo de montar jogada. */
  selar:      { ico:'🔒', nome:'Selar habilidade',
                d:'Tranca UMA das suas habilidades pelo próximo turno. A carta continua na tela, mas não pode ser jogada — e costuma ser justamente a que abriria a fechadura.' },
  taxa:       { ico:'💰', nome:'Pedágio',
                d:'No próximo turno, CADA dado que você gastar custa HP. Jogadas de muitos dados ficam caras: às vezes vale gastar um só, mesmo rendendo menos.' },
  drenar:     { ico:'🩸', nome:'Drenar bloqueio',
                d:'Toma o bloqueio que você acumulou e veste como escudo dele. Guardar defesa contra quem drena é entregar armadura ao inimigo.' },
  enterrar:   { ico:'⛏', nome:'Enterrar dado',
                d:'Um dado seu some da Bolsa por DOIS turnos — não é uma face travada, é o dado inteiro fora da mesa. Você joga com menos peças.' },
  exigir:     { ico:'❗', nome:'Exigência',
                d:'Um ultimato: se você NÃO o ferir neste turno, o campo inteiro entra em fúria (+50% de dano em todos). Ele obriga você a gastar dados nele, e não em quem você queria matar.' },
  crescer:    { ico:'🌱', nome:'Crescer',
                d:'Sobe o próprio HP MÁXIMO e se cura junto. Deixar vivo custa caro: cada turno que passa ele fica mais difícil de derrubar do que era.' },
};
export const ESTADOS = {
  veneno:     { ico:'☠', nome:'Veneno',      d:'Dano no fim do turno, IGNORANDO fechadura e bloqueio. Empilha e cai 1 por turno.' },
  sangramento:{ ico:'🩸',nome:'Sangramento', d:'Igual ao veneno, mas some mais rápido.' },
  queimadura: { ico:'🔥',nome:'Queimadura',  d:'Dano na hora de rolar os dados.' },
  congelado:  { ico:'❄', nome:'Congelado',   d:'O dado fica preso na face em que caiu e não rola no próximo turno.' },
  fratura:    { ico:'✖', nome:'Fratura',     d:'O dado perdeu 1 do valor máximo, para o resto da run.' },
  marca:      { ico:'🎯',nome:'Marca',       d:'O próximo golpe neste alvo causa +50%.' },
  maldicao:   { ico:'☠', nome:'Maldição',    d:'Uma face virou ☠ Vazio: não vale número nem símbolo.' },
  frenesi:    { ico:'▲', nome:'Frenesi',     d:'+50% de dano causado.' },
  espinhos:   { ico:'✦', nome:'Espinhos',    d:'Devolve dano a quem te acertar.' },
  invisivel:  { ico:'🌫',nome:'Invisível',   d:'Você sofre 65% menos dano de ataques neste turno.' },
  armadura:   { ico:'⛊', nome:'Armadura',    d:'REDUZ cada golpe recebido em X. Diferente de fechadura: aqui o dano diminui, não zera.' },
  bloqueio:   { ico:'🛡', nome:'Bloqueio',    d:'Absorve dano antes de tocar no HP. O bloqueio que ele ganhou dura o SEU turno inteiro e só expira quando ele volta a agir — então quebre a barreira antes de tentar matar.' },
};
export const SECOES = [
  /* ================= 1 · COMECE AQUI ================= */
  {
    id:'comece', ico:'▶', nome:'COMECE AQUI', sub:'o jogo em cinco frases',
    itens:[
      { t:'O jogo é um quebra-cabeça, não um jogo de sorte',
        d:'Os dados caem e você monta jogadas com o que veio. Perder não é "rolei mal": é ter gasto o dado certo no alvo errado.' },
      { t:'Cada inimigo tem uma FECHADURA',
        d:'Uma regra escrita na carta dele: "só sofre dano com soma PAR", "só com dado 4+". Se o seu golpe não obedece à regra, o dano é ZERO — não é reduzido, é zero. Essa é a coisa mais importante do jogo, e tem uma aba só para ela.' },
      { t:'A sua classe é o seu jeito de abrir a fechadura',
        d:'O Carrasco arromba na força. A Lâmina contorna com veneno. O Arcanista dissolve a regra. A OráculA reescreve o dado. Quatro respostas para o mesmo problema.' },
      { t:'O que você perde ao morrer, e o que fica',
        d:'A descida some. Ficam os Ecos ◈, as passivas que você comprou com eles e as masmorras que você já fechou — na próxima você começa mais forte e mais fundo.' },
      { t:'Se um golpe deu zero e você não entendeu por quê',
        d:'Toque na fechadura do inimigo, na carta dele, durante o combate. Abre a explicação daquela regra sem sair da luta.' },
    ],
  },
  /* ================= 2 · O TURNO ================= */
  {
    id:'turno', ico:'⏱', nome:'O TURNO', sub:'a ordem das coisas',
    itens:[
      { t:'1 · Os dados caem', d:'Toda a sua Bolsa é rolada. O número que ficou para cima é o que você tem para gastar neste turno — nada mais.' },
      { t:'2 · Você distribui', d:'Cada habilidade pede um encaixe (um ≥5, um par, uma sequência…). Toque na habilidade e ela pega os dados sozinha, ou escolha os dados na mesa antes.' },
      { t:'3 · Dado gasto some', d:'O que você usou vai para a bandeja e não volta neste turno. O que sobrar vira alguma coisa, e cada classe converte de um jeito.' },
      { t:'4 · Re-rolar', d:'Você tem algumas re-rolagens por combate. Ela leva a mão inteira — a não ser que você tenha a passiva Mão Escolhida, e aí rolam só os dados que você marcar. Dado já gasto nunca volta.' },
      { t:'5 · Eles agem', d:'A intenção de cada inimigo está escrita na carta ANTES de você jogar. O ☠ vermelho no rodapé é quanto vai passar do seu bloqueio se você terminar o turno assim.' },
      { t:'6 · Fim do turno', d:'Veneno e sangramento cobram agora. Seu bloqueio zera e tudo recomeça: a Bolsa inteira rola de novo.' },
    ],
  },
  /* ================= 3 · A CONTA DO DANO ================= */
  {
    id:'conta', ico:'✖', nome:'A CONTA DO DANO', sub:'de onde sai o número',
    intro:'Habilidade nenhuma bate "o valor do dado". Todas multiplicam, e é por isso que a mesma mão rende 9 numa carta e 55 na outra. Quando você usa a habilidade, a conta aparece na tela: os dados somando um a um, o multiplicador caindo em cima e o total.',
    itens:[
      { t:'Passo 1 · A soma', d:'Os dados que você gastou são somados. É o Σ que aparece na carta e na banca. Um ◈ Curinga entra valendo o número que a fechadura precisar.' },
      { t:'Passo 2 · O multiplicador', d:'Cada habilidade tem o seu ×N, escrito na carta ao lado do nome. Colapso é ×5: com Σ11 na mão, são 55. Singularidade é ×7. Guilhotina é ×5. Esse número é a razão de existir de gastar o dado grande aqui e não ali.' },
      { t:'Passo 3 · O fixo', d:'Algumas somam um valor cru por cima. Julgamento é 28 + Σ×4: mesmo com dados ruins ele bate forte, e por isso pede soma EXATA de 7.' },
      { t:'Passo 4 · A defesa do alvo', d:'Do total sai a ARMADURA (reduz cada golpe) e o BLOQUEIO (estoque que se gasta). A carta mostra a conta fechada: 15 −11🛡 = 4. Perfurar (pierce) pula essa etapa.' },
      { t:'Passo 5 · A fechadura', d:'Isto vem por último e não é redução: se o golpe não abre a fechadura, o resultado é ZERO, por maior que fosse a conta. Um ×7 travado vale menos que um ×2 que passa.' },
      { t:'Multiplicadores que se somam à conta', d:'Marca deixa o alvo tomando +50% do próximo golpe. Frenesi dá +50% no que você causa. As passivas somam dano fixo por golpe e multiplicam o total. Tudo isso entra antes da defesa.' },
    ],
  },
  /* ================= 4 · FECHADURAS ================= */
  {
    id:'travas', ico:'🗝', nome:'FECHADURAS', sub:'por que meu golpe deu zero',
    intro:'A fechadura NÃO é armadura. Se o golpe não a abre, o dano é ZERO — não é reduzido, é zero. Ela olha os dados que você gastou naquele golpe: a soma, o maior deles, quantos foram e quais símbolos tinham. O NOME NA CARTA JÁ DIZ A REGRA, com o número junto: COURAÇA 4 pede um dado 4 ou mais e COURAÇA 5 pede 5 ou mais — são fechaduras diferentes e por isso têm nomes diferentes. Quando o inimigo aceita dois caminhos, a carta traz os dois selos e o nome das duas partes: ÍMPAR ou ENXUTO 2.',
    itens:[
      { id:'forte', t:'▲ Couraça — "só sofre dano com dado 4+"',
        d:'Olha o MAIOR dado do golpe. Se o maior for menor que 4, o dano é zero.',
        ex: ex('5 sozinho passa · 5+1 passa (o maior é 5)', '2+3 dá zero (o maior é 3) · 1+1+1 dá zero') },
      { id:'fraco', t:'▼ Casca Fina — "só sofre dano com dado até 3"',
        d:'O contrário: golpe grande estilhaça sem ferir. O maior dado precisa ser pequeno.',
        ex: ex('2+3 passa · 1 sozinho passa', '6 dá zero · 2+5 dá zero (o 5 estraga)') },
      { id:'impar', t:'◑ Ímpar — "só sofre dano com soma ÍMPAR"',
        d:'Some os dados que você gastou nesse golpe. O total precisa ser ímpar.',
        ex: ex('3+4 = 7 passa · 5 sozinho passa', '3+3 = 6 dá zero · 2+4 = 6 dá zero') },
      { id:'par', t:'◐ Par — "só sofre dano com soma PAR"',
        d:'Mesma coisa, ao contrário.',
        ex: ex('2+4 = 6 passa · 4 sozinho passa', '3+4 = 7 dá zero') },
      { id:'chave', t:'🗝 Chave — "só sofre dano com soma exata 7"',
        d:'Não é mínimo nem máximo: é EXATO. Aqui o Polegar Torto (±1) e a Sobrecarga do Carrasco valem ouro.',
        ex: ex('3+4 = 7 passa · 5+2 = 7 passa', '6+2 = 8 dá zero · 3+3 = 6 dá zero') },
      { id:'multiplo', t:'✳ Múltiplo — "só sofre dano com soma múltipla de 3"',
        d:'A soma tem que ser 3, 6, 9, 12…',
        ex: ex('4+5 = 9 passa · 6 sozinho passa', '4+6 = 10 dá zero') },
      { id:'enxuto', t:'① Enxuto — "só sofre dano gastando 1 dado"',
        d:'Conta QUANTOS dados o golpe usou, não o valor. Habilidade que come 3 dados nunca fere este aqui.',
        ex: ex('Decapitar com um 6 só passa', 'Fúria Cega (3 dados) dá zero') },
      { id:'farto', t:'⁙ Farto — "só sofre dano gastando 3+ dados"',
        d:'O oposto: golpe pequeno não arranha. Precisa de um golpe largo.',
        ex: ex('Fúria Cega com 4+4+3 passa', 'um 6 sozinho dá zero') },
      { id:'simbolo', t:'✦ Selo — "só sofre dano com ⚔ Lâmina no golpe"',
        d:'Um dos dados gastos precisa ter aquela FACE. Grave faces novas nas recompensas, ou pegue Lapidar no Cofre.',
        ex: ex('4 + face ⚔ passa', 'quatro números comuns dão zero') },
      { id:'distintos', t:'⁘ Avesso — "só sofre dano com dados todos DIFERENTES"',
        d:'Olha os VALORES do golpe: nenhum pode repetir. Habilidade de par ou trinca nunca fere este aqui.',
        ex: ex('2+3+5 passa · 6 sozinho passa', '3+3 dá zero · 4+4+2 dá zero') },
      { id:'iguais', t:'⁚ Uníssono — "só sofre dano com 2+ dados IGUAIS"',
        d:'O oposto do Avesso: todos os dados do golpe precisam ter o MESMO valor, e no mínimo a quantidade pedida.',
        ex: ex('4+4 passa · 5+5+5 passa (se pedir 3)', '4+5 dá zero · um 6 sozinho dá zero') },
      { id:'faixa', t:'◇ Janela — "só sofre dano com soma 8–12"',
        d:'Nem pouco, nem muito: a soma tem que cair DENTRO da janela. É a fechadura do Polegar Torto.',
        ex: ex('4+6 = 10 passa · 3+6 = 9 passa', '2+3 = 5 dá zero (pouco) · 6+6+4 = 16 dá zero (muito)') },
      { id:'primo', t:'✧ Indivisível — "só sofre dano com soma PRIMA"',
        d:'A soma tem que ser 2, 3, 5, 7, 11, 13, 17, 19, 23… Número que se divide não o toca.',
        ex: ex('3+4 = 7 passa · 5+6 = 11 passa', '4+4 = 8 dá zero · 3+6 = 9 dá zero') },
      { id:'casal', t:'∞ Gêmeo — "imune enquanto o gêmeo viver"',
        d:'Invulnerável enquanto o par dele estiver vivo. Escolha a ordem.', ex:null },
      { id:'espelho', t:'⇄ Espelho — "devolve 45% do 1º golpe do turno"',
        d:'Fere normalmente, mas o PRIMEIRO golpe que ele sofrer a cada turno volta em você — só o primeiro. A ORDEM é a jogada: abra com o golpe pequeno para pagar barato, e todo o resto do turno sai de graça. Veneno e sangramento não acordam o espelho.',
        ex: ex('abrir com um golpe de 4 devolve 2 — e o golpão de 30 que vem depois sai limpo',
               'abrir com o golpão de 30 devolve 13, e os golpes seguintes seriam de graça de qualquer jeito') },
    ],
  },
  /* ================= 5 · OS DADOS ================= */
  {
    id:'dados', ico:'🎲', nome:'OS DADOS', sub:'faces, tipos e materiais',
    intro:'A sua Bolsa é o seu personagem. Ela cresce e muda a cada andar: dado novo, face gravada, dado melhorado.',
    grupos:[
      { titulo:'AS FACES', itens:[
        { t:'número', d:'Matéria-prima. Vale o número que está escrito.' },
        { t:'⚔ Lâmina', d:'Vale o número E soma +1 de dano bruto. Abre fechadura de Selo ⚔.' },
        { t:'🛡 Escudo', d:'Vale o número, mas o valor vira bloqueio.' },
        { t:'✦ Essência', d:'Recurso mágico, sem valor numérico. Alimenta habilidades que pedem símbolo.' },
        { t:'◈ Curinga', d:'Assume QUALQUER valor de que você precise — o jogo escolhe sozinho o valor que ABRE a fechadura do alvo. É a carta-coringa das fechaduras de soma.' },
        { t:'⟳ Eco', d:'Ao ser gasto, duplica o efeito da habilidade.' },
        { t:'☠ Vazio', d:'Amaldiçoada. Não vale nada — e alguns inimigos criam essas faces na sua Bolsa.' },
      ]},
      { titulo:'OS TIPOS', itens: Object.keys(TIPOS).map(t=>({
          t, d:`Faces de 1 a ${TIPOS[t]}. Dado grande alcança soma alta e Couraça; dado pequeno é o que abre Casca Fina, que exige valor BAIXO. Ter os dois é o que dá resposta para as duas.` })) },
      { titulo:'OS MATERIAIS', itens: Object.entries(MATERIAIS).map(([k,m])=>({
          t:m.nome||k, d:m.desc||'' })) },
    ],
  },
  /* ================= 6 · AS CLASSES ================= */
  {
    id:'classes', ico:'⚒', nome:'AS QUATRO ALMAS', sub:'e todas as habilidades',
    intro:'Cada classe resolve o mesmo problema — a fechadura — de um jeito. Abaixo, todas as habilidades de cada uma, com o encaixe que elas pedem e a conta que elas fazem.',
    grupos: Object.values(CLASSES).map(c=>({
      titulo:`${c.glifo} ${c.nome.toUpperCase()}`,
      cor:c.cor,
      nota:`🗝 ${c.chave}  ·  ${c.mat}  ·  ${c.hp} de vida, ${c.bag().length} dados, ${c.rerolls} re-rolagem${c.rerolls>1?'ns':''}`,
      itens:[
        { t:`PASSIVA — ${c.passiva.nome}`, d:c.passiva.desc },
        { t:'SOBRA — o que acontece com os dados que você não gastou', d:c.sobra.desc },
        ...c.skills.map(s=>({
          t:`${s.nome}  ⟨${reqLabel(s.req)}⟩${s.unlock?'  🔒':''}`,
          d:`${s.desc}${formulaTxt(s)?`  ▸ dano = ${formulaTxt(s)}.`:''}${
             s.unlock ? `  ▸ liberada ${/^m\d+$/.test(s.unlock)?`ao fechar a Masmorra ${s.unlock.slice(1)}`:'pela Coroa, na árvore desta classe'}.` : ''}`,
        })),
        { t:`${RESPIRAR.nome}  ⟨${reqLabel(RESPIRAR.req)}⟩`, d:RESPIRAR.desc+' Toda classe tem.' },
      ],
    })),
  },
  /* ================= 7 · OS INIMIGOS ================= */
  {
    id:'inimigos', ico:'☠', nome:'OS INIMIGOS', sub:'intenções, elites e chefes',
    intro:'A carta do inimigo diz TUDO antes de você jogar: quanta vida tem, qual a fechadura e o que ele vai fazer no fim do turno. Não existe surpresa — existe conta que você não fez.',
    grupos:[
      { titulo:'COMO LER A CARTA', itens:[
        { t:'A barra de vida', d:'Vida atual e máxima. O número em 🛡 ao lado é o BLOQUEIO dele: some antes de tocar na vida e dura o seu turno inteiro.' },
        { t:'A caixa amarela', d:'A FECHADURA. Toque nela para abrir a explicação daquela regra. Se disser "A OU B", qualquer uma das duas abre. Se tiver ⟳, ela MUDA a cada turno.' },
        { t:'A linha de baixo', d:'A INTENÇÃO: o que ele faz quando o seu turno acabar. O número é o dano bruto; ao lado, quanto vai sobrar depois do seu bloqueio.' },
        { t:'ARROMBADA / DISSOLVIDA', d:'A fechadura foi quebrada e qualquer dado fere. Arrombada dura este turno; dissolvida dura os turnos que a habilidade disse.' },
      ]},
      { titulo:'O QUE ELES FAZEM (as intenções)',
        itens: Object.entries(INTENCOES).map(([k,v])=>({ t:`${v.ico} ${v.nome}`, d:v.d })) },
      { titulo:'COMUM, ELITE, SUBCHEFE, CHEFE', itens:[
        { t:'Comum', d:'Uma fechadura simples e um padrão curto de intenções. Nos andares 1 e 2 vêm sozinhos.' },
        { t:'Elite', d:'Mais vida, e a fechadura dele GIRA: o que abriu neste turno fecha no próximo. Muitos carregam uma AURA que afeta o campo inteiro — armadura em todos, maldição ao rolar 1, dano se você não deixar sobra.' },
        { t:'Subchefe (andar 5) e Chefe (andar 10)', d:'Fechadura em ciclo de duas a quatro regras, invocam reforço e alguns reerguem os mortos. Depois deles vem santuário: você recupera 30% da vida.' },
      ]},
      { titulo:'AS AURAS DE ELITE', itens:[
        { t:'Armadura de campo', d:'+2 de armadura em TODOS os inimigos. Golpe picadinho perde muito aqui; prefira um golpe grande.' },
        { t:'Um amaldiçoa', d:'Todo dado que rolar 1 vira ☠ Vazio, para sempre nesta run. Mate rápido.' },
        { t:'Sem sobra', d:'Se você não deixar nenhum dado sobrando, sofre 4. Guarde um dado sempre.' },
        { t:'Cura salgada', d:'Toda cura sua vale metade.' },
      ]},
    ],
  },
  /* ================= 8 · ESTADOS ================= */
  {
    id:'estados', ico:'🩸', nome:'ESTADOS', sub:'venenos, marcas e travas',
    intro:'Estado é tudo que fica grudado depois do golpe. Toque em qualquer um deles, no seu rodapé ou na carta do inimigo, para ver o que faz.',
    itens: Object.entries(ESTADOS).map(([k,v])=>({ t:`${v.ico} ${v.nome}`, d:v.d })),
  },
  /* ================= 9 · AS DEZ MASMORRAS ================= */
  {
    id:'masmorras', ico:'🕳', nome:'AS DEZ MASMORRAS', sub:'e os fardos de cada uma',
    intro:'Dez masmorras, dez andares cada. Fechar uma libera começar direto na seguinte — e os FARDOS se acumulam: quem desce na Masmorra 6 carrega também os fardos da 2, 3, 4 e 5.',
    itens: ESCALADA.map(e=>({
      t:`${e.n} · ${e.nome}`,
      d:`${e.fardoTxt==='—' ? 'Sem fardo: é onde se aprende.' : 'FARDO: '+e.fardoTxt}  ▸ inimigos com ❤ ×${e.hp.toFixed(2)} e ⚔ ×${e.dano.toFixed(2)}.  ▸ ${MASMORRAS[e.n]?.chefe?.nome ? 'chefe: '+MASMORRAS[e.n].chefe.nome : ''}`,
    })),
  },
  /* ================= 10 · RECOMPENSAS ================= */
  {
    id:'recompensas', ico:'🎁', nome:'RECOMPENSAS', sub:'o que aparece entre os andares',
    intro:'Depois de cada andar você escolhe UMA de três. A escolha é o jogo: mais poder agora ou mais vida para chegar lá.',
    itens:[
      { t:'🎲 Dado Novo', d:'Entra na Bolsa. Mais opções por turno — mas também mais diluição: com muitos dados, fica mais difícil montar sequência ou trinca.' },
      { t:'⚒ Gravação', d:'Muda uma face de um dado seu: vira ⚔, 🛡, ◈, ✦ ou ⟳; ou sobe o dado inteiro (d6 → d8). A tela mostra como era e como fica antes de você aceitar.' },
      { t:'🕯️ Relíquia', d:'Passiva permanente da descida. Comuns são boas; raras são fortes; AMALDIÇOADAS dão muito e cobram caro (dano ×3 com a vida em 1/3, por exemplo).' },
      { t:'❤️ Vigor', d:'+7 de vida máxima, e recupera o mesmo tanto. É a única fonte de vida que não acaba — sem ela, quem desce fundo trava num teto e morre de um golpe só.' },
      { t:'✚ Cura', d:'Recupera 18% da vida máxima. Se você já estiver cheio, a carta avisa que não faz nada.' },
    ],
  },
  /* ================= 11 · PASSIVAS ================= */
  {
    id:'passivas', ico:'🌳', nome:'PASSIVAS', sub:'as árvores que ficam entre as descidas',
    intro:'Você morre, leva os Ecos ◈ e compra passivas PERMANENTES. Cada alma tem a sua árvore, com quatro anéis: o primeiro é barato e melhora o básico, o quarto é caro e muda como a classe joga.',
    grupos:[
      { titulo:'COMO FUNCIONA', itens:[
        ...ANEIS.map(a=>({ t:`Anel ${a.n} · ${a.nome}`, d:a.sub })),
        { t:'Ecos ◈', d:'Ganhos em toda descida, mesmo perdendo: por andar limpo, por elite, por chefe e pela profundidade. Vencer dá um bônus grande.' },
        { t:'A Coroa', d:'No anel 4 de cada árvore está a Coroa, que libera a 4ª habilidade daquela classe.' },
      ]},
      ...Object.values(ARVORES).map(a=>({
        titulo:`${a.glifo} ${a.nome}`, cor:a.cor, nota:a.lema,
        itens:a.nos.map(n=>({ t:`${n.nome}  ⟨anel ${n.anel} · ◈ ${n.custo[0]}${n.max>1?` a ◈ ${n.custo[n.custo.length-1]}`:''}⟩`,
                              d:n.txt(1)+(n.max>1?`  ▸ até ${n.max} níveis.`:'') })),
      })),
    ],
  },
  /* ================= 12 · ENTRE AS DESCIDAS ================= */
  {
    id:'meta', ico:'🗝', nome:'ENTRE AS DESCIDAS', sub:'save, portais e trilha',
    itens:[
      { t:'O jogo salva sozinho', d:'Entre um andar e outro, no mapa. Feche o jogo no meio da masmorra e volte no mesmo lugar, com a mesma Bolsa e a mesma vida. Só se perde o progresso morrendo.' },
      { t:'Portais', d:'Fechar a Masmorra N libera começar direto na N+1. Quem começa mais fundo recebe o ENXOVAL do caminho pulado — uma recompensa por andar que você não jogou —, senão seria entrar na Masmorra 5 com a bolsa de estreia e morrer no primeiro andar.' },
      { t:'A Trilha das Almas', d:'Fechar masmorra também libera HABILIDADE nova, marcada 🔒 na tela de classes. Elas abrem nas masmorras 2, 5 e 8, e são o motivo de dar para descer mais fundo: não é mira melhor, é ferramenta nova na mão.' },
      { t:'A dificuldade sobe sempre', d:'Cada masmorra é medida para ser mais dura que a anterior e ainda fechável. Dá para fechar UMA por descida — não as dez de uma vez.' },
    ],
  },
];

/* devolve a seção + item de uma fechadura, pra abrir o Grimório já no lugar */
export function acharTrava(tipo){
  const sec = SECOES.find(s=>s.id==='travas');
  return { secao:'travas', item: sec.itens.find(i=>i.id===tipo) || null };
}

/* ---- um item ---- */
const itemHTML = (i, foco) => `
  <div class="gitem ${foco && i.id===foco ? 'foco':''}" ${i.id?`data-i="${i.id}"`:''}>
    <b>${i.t}</b><span>${i.d}</span>
    ${i.ex?`<div class="gex">
       <div class="gok">✓ passa: ${i.ex.bom}</div>
       <div class="gno">✕ zero: ${i.ex.ruim}</div></div>`:''}
  </div>`;

/* ---- UMA aba por vez ---- */
export function html(aba, foco){
  const s = SECOES.find(x=>x.id===aba) || SECOES[0];
  const corpo = s.grupos
    ? s.grupos.map(g=>`
        <div class="ggrupo" ${g.cor?`style="--gc:${g.cor}"`:''}>
          <h4>${g.titulo}</h4>
          ${g.nota?`<p class="gnota">${g.nota}</p>`:''}
          ${g.itens.map(i=>itemHTML(i,foco)).join('')}
        </div>`).join('')
    : s.itens.map(i=>itemHTML(i,foco)).join('');
  return `<section class="gsec" data-s="${s.id}">
      <h3><span class="gico">${s.ico}</span>${s.nome}${s.sub?`<em>${s.sub}</em>`:''}</h3>
      ${s.intro?`<p class="gintro">${s.intro}</p>`:''}
      ${corpo}
    </section>`;
}
/* em qual aba mora um verbete — para abrir o Grimório já nela */
export function abaDe(itemId){
  for(const s of SECOES){
    if((s.itens||[]).some(i=>i.id===itemId)) return s.id;
    for(const g of (s.grupos||[])) if(g.itens.some(i=>i.id===itemId)) return s.id;
  }
  return SECOES[0].id;
}

/* devolve {ico, nome, d, ex} pra qualquer coisa clicável da carta do inimigo */
export function verbete(tipo, chave, v){
  if(tipo==='trava'){
    const sec = SECOES.find(s=>s.id==='travas');
    const it  = sec.itens.find(i=>i.id===chave);
    if(!it) return null;
    const [cab, ...resto] = it.t.split('—');
    return { ico:cab.trim().split(' ')[0], nome:cab.trim().split(' ').slice(1).join(' '),
             sub:resto.join('—').trim().replace(/"/g,''), d:it.d, ex:it.ex,
             rodape:'Fechadura não é armadura: o golpe errado causa ZERO, não "menos".' };
  }
  if(tipo==='intencao'){ const x=INTENCOES[chave]; return x?{...x}:null; }
  if(tipo==='estado'){   const x=ESTADOS[chave];   return x?{...x, nome:x.nome+(v?' '+v:'')}:null; }
  return null;
}
