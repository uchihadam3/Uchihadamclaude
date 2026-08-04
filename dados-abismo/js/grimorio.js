/* ========================================================================
   O GRIMÓRIO — a tela que explica o jogo.

   Regra da casa (§12/§15): nada de informação escondida. Se o inimigo diz
   "só sofre dano com dado 4+", tem que existir um lugar que mostre, com
   exemplo numérico, o que passa e o que não passa. É aqui.
   ===================================================================== */

const ex = (bom, ruim) => ({ bom, ruim });

export const SECOES = [
  {
    id:'turno', ico:'⏱', nome:'COMO FUNCIONA UM TURNO',
    itens:[
      { t:'1 · Os dados caem', d:'Toda a sua Bolsa é rolada. O número que ficou pra cima é o que você tem pra gastar neste turno — nada mais.' },
      { t:'2 · Você distribui', d:'Cada habilidade pede um encaixe (um ≥5, um par, uma sequência…). Toque na habilidade e ela pega os dados sozinha, ou escolha os dados na mesa antes.' },
      { t:'3 · Dado gasto some', d:'O que você usou vai pra bandeja e não volta neste turno. O que sobrar vira alguma coisa, e cada classe converte de um jeito.' },
      { t:'4 · Eles agem', d:'A intenção de cada inimigo está escrita na carta ANTES de você jogar. O ☠ vermelho no rodapé é quanto vai passar do seu bloqueio se você terminar o turno assim.' },
    ],
  },
  {
    id:'travas', ico:'🗝', nome:'FECHADURAS — POR QUE MEU GOLPE DEU ZERO',
    intro:'A fechadura NÃO é armadura. Se o golpe não a abre, o dano é ZERO — não é reduzido, é zero. Ela olha os dados que você gastou naquele golpe: a soma, o maior deles, quantos foram e quais símbolos tinham.',
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
      { id:'casal', t:'∞ Gêmeo — "imune enquanto o gêmeo viver"',
        d:'Invulnerável enquanto o par dele estiver vivo. Escolha a ordem.', ex:null },
      { id:'espelho', t:'⇄ Espelho — "devolve 45%"',
        d:'Este fere normalmente, mas devolve parte do dano em você. Golpe pequeno e veneno saem mais barato.', ex:null },
    ],
  },
  {
    id:'chaves', ico:'⚒', nome:'COMO CADA CLASSE ABRE A FECHADURA',
    intro:'É por isto que a classe importa. Cada uma resolve o mesmo problema de um jeito.',
    itens:[
      { t:'⚒ Carrasco — ARROMBA', d:'Decapitar quebra a fechadura do alvo pelo RESTO DO TURNO: depois dela, qualquer dado fere aquele inimigo. A passiva Sobrecarga (+1 no dado por 2 de HP) é o que acerta soma exata e paridade.' },
      { t:'🗡 Lâmina-Sombra — CONTORNA', d:'Veneno e sangramento NÃO passam pela fechadura: corroem o inimigo travado no fim do turno. Contra fechadura difícil, envenene e espere. A passiva Trapaça vira o dado pra face oposta (num d4: 1↔4).' },
      { t:'✦ Arcanista — DISSOLVE', d:'Raio apaga a regra do alvo por 1 turno; Nova Gélida apaga a de TODOS por 2; Colapso perfura tudo. A passiva Canalização guarda um dado no Círculo pro próximo turno — é assim que se monta sequência.' },
      { t:'◈ OráculA — REESCREVE O DADO', d:'Tecer empurra um dado ±2 na direção que abre a fechadura do alvo; Tapeçaria crava dois dados no valor exato. Julgamento perfura. A passiva Prever trava um dado nesta face pro próximo turno.' },
    ],
  },
  {
    id:'faces', ico:'🎲', nome:'AS FACES DO DADO',
    itens:[
      { t:'número', d:'Matéria-prima. Vale o número que está escrito.' },
      { t:'⚔ Lâmina', d:'Vale o número E soma +1 de dano bruto. Abre fechadura de Selo ⚔.' },
      { t:'🛡 Escudo', d:'Vale o número, mas o valor vira bloqueio.' },
      { t:'✦ Essência', d:'Recurso mágico, sem valor numérico. Alimenta habilidades que pedem símbolo.' },
      { t:'◈ Curinga', d:'Assume QUALQUER valor que você precisar. A carta-coringa das fechaduras de soma.' },
      { t:'⟳ Eco', d:'Ao ser gasto, duplica o efeito da habilidade.' },
      { t:'☠ Vazio', d:'Amaldiçoada. Não vale nada — e alguns inimigos criam essas faces na sua Bolsa.' },
    ],
  },
  {
    id:'estados', ico:'☠', nome:'ESTADOS',
    itens:[
      { t:'☠ Veneno', d:'Dano no fim do turno, ignorando fechadura e bloqueio. Empilha e decai 1 por turno.' },
      { t:'🩸 Sangramento', d:'Igual ao veneno, mas some mais rápido.' },
      { t:'❄ Congelado', d:'O dado fica travado na face em que caiu. Inimigos fazem isso com você.' },
      { t:'✖ Fratura', d:'O dado perde 1 do valor máximo — PARA SEMPRE, pelo resto da run.' },
      { t:'🎯 Marca', d:'O alvo recebe +50% do próximo golpe.' },
      { t:'▲ Frenesi', d:'+50% de dano causado.' },
      { t:'✦ Espinhos', d:'Devolve dano a quem te acerta.' },
      { t:'⛊ Armadura', d:'Reduz cada golpe recebido. Isto SIM é redução, não fechadura.' },
    ],
  },
  {
    id:'ferramentas', ico:'🔧', nome:'FERRAMENTAS DO COFRE',
    intro:'Compradas com Ecos entre as runs. Não são "+dano": mudam o quebra-cabeça.',
    itens:[
      { t:'Polegar Torto', d:'Algumas vezes por turno, empurra um dado em ±1. É o que resolve soma exata e paridade.' },
      { t:'Gazua 🗝', d:'Algumas vezes por combate, ARROMBA a fechadura de um inimigo — vale guardar pro elite.' },
      { t:'Lapidar ⚔ / Fio Solto ◈', d:'Começa a run com faces ⚔ (abre Selo) e ◈ Curinga (assume o valor que a fechadura pedir).' },
      { t:'Talento', d:'Libera a 4ª habilidade de cada classe.' },
    ],
  },
];

/* devolve a seção + item de uma fechadura, pra abrir o Grimório já no lugar */
export function acharTrava(tipo){
  const sec = SECOES.find(s=>s.id==='travas');
  return { secao:'travas', item: sec.itens.find(i=>i.id===tipo) || null };
}

export function html(foco){
  return SECOES.map(s=>`
    <section class="gsec" data-s="${s.id}">
      <h3><span class="gico">${s.ico}</span>${s.nome}</h3>
      ${s.intro?`<p class="gintro">${s.intro}</p>`:''}
      ${s.itens.map(i=>`
        <div class="gitem ${foco && i.id===foco ? 'foco':''}" ${i.id?`data-i="${i.id}"`:''}>
          <b>${i.t}</b><span>${i.d}</span>
          ${i.ex?`<div class="gex">
             <div class="gok">✓ passa: ${i.ex.bom}</div>
             <div class="gno">✕ zero: ${i.ex.ruim}</div></div>`:''}
        </div>`).join('')}
    </section>`).join('');
}

/* ========================================================================
   VERBETE AVULSO — o cartãozinho que abre ao tocar num efeito do inimigo.
   O Grimório inteiro é pra quem quer estudar; no meio da luta você quer
   saber UMA coisa só, sem sair do combate.
   ===================================================================== */
export const INTENCOES = {
  atk:        { ico:'⚔', nome:'Ataque',        d:'Ele bate em você no fim do turno. O número é o dano bruto — o que passar do seu bloqueio vira HP perdido.' },
  atk_multi:  { ico:'⚔', nome:'Ataque múltiplo',d:'Vários golpes menores. Cada um é abatido pelo seu bloqueio separadamente, então bloqueio pequeno rende menos aqui.' },
  block:      { ico:'🛡', nome:'Defesa',        d:'Ele ganha bloqueio: o seu próximo dano é absorvido antes de tocar no HP dele. Some no fim do turno.' },
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
};
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
