/* ========================================================================
   RELÍQUIAS — as peças que montam a build.

   Regra que vale para todas: relíquia que só dá "+N de alguma coisa" é
   preenchimento. Toda uma aqui ou muda uma REGRA, ou muda a CONTA de um
   jeito que faz o jogador procurar uma coisa diferente no tabuleiro.

   `mods` entra na conta do motor. `ao` são gatilhos que a sala chama.
   ===================================================================== */
const R = (id, nome, r, d, corpo) => ({ id, nome, r, d, ...corpo });

export const RELIQUIAS = [
  /* ═══ A ORDEM DESTE ARQUIVO NÃO É MAIS A DA RARIDADE ═══════════════
     Ele era dividido em "comuns / raras / lendárias", e as divisões viraram
     mentira: a raridade de cada peça passou a sair da FORÇA MEDIDA, não da
     gaveta em que ela foi escrita. Luva de Feltro estava entre as comuns e
     é a terceira peça mais forte do jogo; Núcleo Instável estava entre as
     lendárias e deixava o jogador PIOR do que sem relíquia nenhuma.

     Os blocos abaixo continuam existindo porque agrupam por ASSUNTO, que é
     útil para escrever; a raridade de cada uma está no terceiro campo, e
     quem manda nela é `tools/medir-reliquias.mjs`. */
  /* ---------- as primeiras: mexem na régua ---------- */
  R('olho_coruja','Olho da Coruja','rara',
    'Começa cada sala espiando 1 carta.', { aoIniciar:s=>s.espiar(1) }),
  R('caderno','Caderno de Campo','epica',
    'Toda carta revelada continua aparecendo por mais 1 tentativa.',
    { mods:{ memoria:1 } }),
  R('ima','Ímã','comum',
    '+2 de moeda em todo par de Ouro.', { mods:{ moedaBonus:2 } }),
  R('luva','Luva de Feltro','lendaria',
    'Cada erro custa 1 de Foco a menos (mínimo zero).', { mods:{ blindagem:1 } }),
  R('ampulheta','Ampulheta','comum',
    '+3 viradas em toda sala.', { mods:{ viradas:3 } }),
  R('lampada','Lâmpada','comum',
    'A cada 7 acertos, revela uma carta fechada.',
    { ao:{ acerto:(s,n,c,rel)=>{ if(n%7===0) s._revelarUma(rel); } } }),
  R('moeda_torta','Moeda Torta','comum',
    'Toda virada que sobrar no fim da sala vale 2 moedas em vez de 1.',
    { mods:{ moedaSobra:1 } }),
  R('dado_viciado','Dado Viciado','epica',
    '+2 de pontos na base de toda carta.', { mods:{ pontoBase:2 } }),

  /* ---------- mexem na regra ---------- */
  R('memoria_fotografica','Memória Fotográfica','comum',
    'As 3 primeiras viradas de cada sala não gastam virada.',
    { mods:{ graça:3 } }),
  R('espelho_antigo','Espelho Antigo','rara',
    'A primeira carta Espelho de cada sala vira duas.',
    { aoIniciar:s=>{ const c=s.rng.pick(s.fechadas()); if(c) c.tipo='espelho'; } }),
  R('coroa','Coroa','rara',
    'Multiplicador de combo já começa acima de zero.',
    { mods:{ multCombo:0.12 } }),
  R('biblioteca','Biblioteca Viva','epica',
    'Cada família diferente no tabuleiro dá +0,12 de multiplicador.',
    { aoIniciar:s=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.12*s.familias.length; } }),
  R('pena','Pena do Escriba','rara',
    'Errar não zera o combo: corta pela metade.', { mods:{ meioCombo:true } }),
  R('bussola','Bússola Quebrada','comum',
    'Toda carta Bomba vira Cristal.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='bomba') c.tipo='cristal'; } }),
  R('sino','Sino de Bronze','epica',
    'Todo erro revela uma carta fechada. Você erra, mas nunca sai de mãos vazias.',
    { mods:{ consolo:true } }),
  R('cofre','Cofre','epica',
    'Moeda vira ponto: cada 3 moedas somam 1 de multiplicador no fim da sala.',
    { mods:{ moedaVale:true } }),

  /* ---------- mudam a run inteira ---------- */
  R('mente_palacio','Palácio da Memória','rara',
    'Toda carta fica visível nos 2 primeiros segundos de cada sala.',
    { mods:{ preview:2 } }),
  R('relogio_parado','Relógio Parado','lendaria',
    'A primeira derrota de cada mundo não conta: a sala reinicia.',
    { mods:{ segundaChance:1 } }),
  R('olho_abismo','Olho do Abismo','lendaria',
    'Você vê o TIPO de toda carta antes de virar. Em troca, -1 de Foco.',
    { mods:{ veTipos:true, foco:-1 } }),
  R('mao_do_tempo','Mão do Tempo','comum',
    'Acertos consecutivos devolvem viradas: a cada 3 do combo, +1 virada.',
    { ao:{ acerto:(s,n,c,rel)=>{ if(c>0 && c%3===0){ s.devolverVirada(1);
      rel.eventos.push({ e:'virada_extra' }); } } } }),
  R('nucleo','Núcleo Instável','comum',
    'Multiplica seus pontos por 1,6 e dobra o custo dos erros.',
    { mods:{ dobra:1.6, erroDobra:true } }),

  /* ═══════════════ AS QUE MEXEM NA RÉGUA ═══════════════
     Efeito previsível, do tipo que você pega sem pensar muito e que decide
     se a build vai ser de ponto, de moeda ou de fôlego. */
  R('luneta','Luneta','rara',
    'Começa cada sala espiando 2 cartas — uma a mais que a coruja.',
    { aoIniciar:s=>s.espiar(2) }),
  R('marcador','Marcador de Página','rara',
    'A primeira carta que você vira em cada sala fica marcada e não some mais.',
    { aoIniciar:s=>{ s.mods.marcaPrimeira = true; } }),
  R('lupa_rachada','Lupa Rachada','comum',
    'A cada 6 erros, revela uma carta fechada. Errar deixa de ser só prejuízo.',
    { ao:{ erro:(s,n,rel)=>{ if(n%6===0) s._revelarUma(rel); } } }),
  R('cofrinho','Cofrinho','comum',
    '+1 moeda a cada erro. O tropeço vira troco.', { mods:{ moedaPorErro:1 } }),
  R('relogio_areia','Relógio de Areia','comum',
    '+1 virada a cada erro. Você erra mais devagar do que fica sem tempo.',
    { mods:{ viradaPorErro:1 } }),
  R('pedra_afiada','Pedra de Amolar','epica',
    '+3 de pontos na base de toda carta.', { mods:{ pontoBase:3 } }),
  R('corda','Corda de Alpinista','comum',
    '+5 viradas em toda sala.', { mods:{ viradas:5 } }),
  R('escudo_couro','Escudo de Couro','rara',
    '+1 de Foco. Aguentar mais um esquecimento é mais do que parece.',
    { mods:{ foco:1 } }),
  R('trevo','Trevo Seco','rara',
    'A loja sempre oferece uma coisa a mais.', { mods:{ lojaExtra:1 } }),
  R('bolsa_furada','Bolsa Furada','rara',
    'Cada par de Ouro rende +4 moedas, mas você começa a run com 10 a menos.',
    { mods:{ moedaBonus:4 }, moedasIniciais:-10 }),
  R('lente_azul','Lente Azul','comum',
    'Cartas de Cristal valem bem mais que o dobro da base.',
    { mods:{ multTipo:{ cristal:1.6 } } }),
  R('luva_ouro','Luva Dourada','comum',
    'Cartas de Ouro valem 30% mais pontos, além das moedas.',
    { mods:{ multTipo:{ ouro:1.3 } } }),
  R('vela','Vela Curta','comum',
    'Toda Bomba nasce com o dobro de pavio.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.pavio) c.pavio *= 2; } }),
  R('linha','Linha de Costura','comum',
    'Cartas de Corrente puxam duas cartas em vez de uma.',
    { mods:{ correnteDupla:true } }),
  R('pente','Pente de Osso','comum',
    'Cada 10 acertos devolvem 1 de Foco.',
    { ao:{ acerto:(s,n)=>{ if(n%10===0) s.foco = Math.min(s.focoMax, s.foco+1); } } }),
  R('mapa_velho','Mapa Velho','rara',
    'Ao vencer uma sala, +8 moedas.',
    { ao:{ salaVencida:(s,tipo,run)=>{ run.moedas += 8; run.estatisticas.moedasGanhas += 8; } } }),
  R('anel_ferro','Anel de Ferro','comum',
    'O primeiro erro de cada sala não custa Foco.',
    { aoIniciar:s=>{ s.mods.perdao = 1; } }),
  R('caneca','Caneca Lascada','rara',
    'Descansar entre mundos devolve 1 de Foco a mais.',
    { ao:{ mundoNovo:(run)=>{ run.foco++; } } }),

  /* ═══════════════ AS QUE MUDAM O QUE VOCÊ PROCURA ═══════════════
     Depois de pegar uma destas, a mesma sala se joga diferente. */
  R('oculos_leitura','Óculos de Leitura','epica',
    'Toda carta revelada continua aparecendo por mais 2 tentativas.',
    { mods:{ memoria:2 } }),
  R('fio_prata','Fio de Prata','rara',
    'O combo não zera nunca: cada erro tira só um degrau.',
    { mods:{ comboDegrau:true } }),
  R('tambor','Tambor de Guerra','rara',
    'Cada acerto seguido soma +0,05 de multiplicador que dura a sala inteira.',
    { ao:{ acerto:(s,n,c)=>{ if(c>1) s.mods.multCombo=(s.mods.multCombo||0)+0.05; } } }),
  R('balanca','Balança Torta','lendaria',
    'Enquanto o Foco estiver cheio, todo ponto vale o dobro.',
    { mods:{ dobraComFoco:true } }),
  R('faca_dupla','Faca de Dois Gumes','comum',
    'Pontos ×1,3. Cada erro custa 1 de Foco a mais.',
    { mods:{ multCombo:0.3, erroExtra:1 } }),
  R('chave_mestra','Chave Mestra','rara',
    'A loja custa metade do preço.', { mods:{ desconto:0.5 } }),
  R('espelho_agua','Espelho d\'Água','epica',
    'Duas cartas viram Espelho no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 2)) c.tipo='espelho'; } }),
  R('cinzeiro','Cinzeiro','comum',
    'Toda Bomba do tabuleiro é desarmada na entrada.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='bomba'){ c.tipo='normal'; c.pavio=0; } } }),
  R('agulha','Agulha de Bússola','lendaria',
    'Você vê o TIPO de toda carta antes de virar.', { mods:{ veTipos:true } }),
  R('livro_cinzas','Livro de Cinzas','epica',
    'Cada erro dá +0,12 de multiplicador permanente na sala.',
    { ao:{ erro:(s)=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.12; } } }),
  R('coroa_espinhos','Coroa de Espinhos','epica',
    'Começa cada sala com -1 de Foco e +0,6 de multiplicador.',
    { mods:{ foco:-1, multCombo:0.6 } }),
  R('sacola','Sacola de Feira','comum',
    'A recompensa de sala vencida oferece uma relíquia a mais para escolher.',
    { mods:{ premioExtra:1 } }),
  R('vidro_fume','Vidro Fumê','comum',
    'Cartas Fantasma param de esconder: elas passam a valer o dobro.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='fantasma') c.tipo='cristal'; } }),
  R('runa_gasta','Runa Gasta','comum',
    'A família Runas rende +50% de pontos para você.',
    { mods:{ multFam:{ runas:1.5 } } }),
  R('placa_circuito','Placa de Circuito','rara',
    'A família Tecnologia rende +50% de pontos para você.',
    { mods:{ multFam:{ tecnologia:1.5 } } }),
  R('escaravelho','Escaravelho','rara',
    'A família Egito rende +50% de pontos para você.',
    { mods:{ multFam:{ egito:1.5 } } }),
  R('meteorito','Lasca de Meteorito','rara',
    'A família Espaço rende +50% de pontos para você.',
    { mods:{ multFam:{ espaco:1.5 } } }),
  R('alambique','Alambique','comum',
    'A família Alquimia rende +50% de pontos para você.',
    { mods:{ multFam:{ alquimia:1.5 } } }),
  R('peao','Peão de Marfim','rara',
    'A família Xadrez rende +50% de pontos para você.',
    { mods:{ multFam:{ xadrez:1.5 } } }),
  R('escama','Escama de Dragão','rara',
    'A família Dragões rende +50% de pontos para você.',
    { mods:{ multFam:{ dragoes:1.5 } } }),
  R('lira','Lira Quebrada','rara',
    'A família Mitologia rende +50% de pontos para você.',
    { mods:{ multFam:{ mitologia:1.5 } } }),
  R('rede','Rede de Pesca','comum',
    'Ao vencer a sala, cada virada que sobrar vale 3 moedas.',
    { mods:{ moedaSobra:2 } }),
  R('cristal_bruto','Cristal Bruto','rara',
    'Duas cartas viram Cristal no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 2)) c.tipo='cristal'; } }),
  R('ferradura','Ferradura','epica',
    'Uma carta vira Lendária no começo de cada sala.',
    { aoIniciar:s=>{ const c=s.rng.pick(s.fechadas()); if(c) c.tipo='lendaria'; } }),
  R('bolso_secreto','Bolso Secreto','rara',
    'Ao entrar num mundo novo, ganha uma relíquia comum de graça.',
    { ao:{ mundoNovo:(run)=>run._darReliquia('comum') } }),
  R('venda','Venda de Seda','comum',
    'Errar duas cartas que você NUNCA viu devolve a virada gasta.',
    { mods:{ descobertaGratis:true } }),

  /* ═══════════════ AS QUE MUDAM O PLANO NO MEIO DA RUN ═══════════════ */
  R('cronometro','Cronômetro Parado','comum',
    'As 6 primeiras viradas de cada sala não gastam virada.',
    { mods:{ graça:6 } }),
  R('biblioteca_perdida','Biblioteca Perdida','lendaria',
    'Cada família diferente no tabuleiro dá +0,3 de multiplicador.',
    { aoIniciar:s=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.3*s.familias.length; } }),
  R('coracao','Coração de Pedra','epica',
    '+3 de Foco, e o combo passa a zerar de vez em todo erro.',
    { mods:{ foco:3, comboSeco:true } }),
  R('caleidoscopio','Caleidoscópio','lendaria',
    'Quatro cartas viram Espelho no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 4)) c.tipo='espelho'; } }),
  R('lente_do_mundo','Lente do Mundo','epica',
    'Toda carta fica visível nos 3 primeiros segundos de cada sala.',
    { mods:{ preview:3 } }),
  R('moeda_de_ouro','Moeda de Duas Caras','comum',
    'Todo par de Ouro rende o triplo de moedas e vale 60% mais pontos.',
    { mods:{ moedaBonus:6, multTipo:{ ouro:1.6 } } }),
  R('sino_mudo','Sino Mudo','epica',
    'Todo erro revela DUAS cartas fechadas e devolve a virada.',
    { mods:{ consolo:true, viradaPorErro:1 },
      ao:{ erro:(s,n,rel)=>s._revelarUma(rel) } }),
  R('ampulheta_negra','Ampulheta Negra','comum',
    '+10 viradas em toda sala, e cada erro custa 2 de Foco.',
    { mods:{ viradas:10, erroExtra:1 } }),
  R('grimorio','Grimório','rara',
    'Começa cada sala espiando 3 cartas.', { aoIniciar:s=>s.espiar(3) }),
  R('pedra_filosofal','Pedra Filosofal','comum',
    'Moeda vira ponto na saída: cada 2 moedas somam 1 de multiplicador.',
    { mods:{ moedaVale:true, moedaValePasso:2 } }),
];

export const POR_ID = Object.fromEntries(RELIQUIAS.map(r=>[r.id,r]));

/* ════════════════════ AS QUATRO RARIDADES ════════════════════
   Num lugar só, e com as três coisas juntas de propósito: a COR, o quanto
   ela é rara e o quanto ela custa. Elas estavam espalhadas — a cor aqui, o
   peso do sorteio ali, o preço da loja dentro da Run — e três listas que
   precisam concordar sempre acabam discordando.

   RARIDADE É UMA PROMESSA DE DUAS PONTAS, e o jogo só tinha uma. Ela diz
   "isto aparece pouco" E diz "isto é forte". Sem a segunda, o jogador abre
   uma lendária dourada, com fita e brilho, e recebe menos do que a comum
   cinza que ele achou na primeira sala — o que não é uma surpresa, é uma
   mentira da interface.

   Medido antes do conserto, com `tools/medir-reliquias.mjs`: Luva de Feltro
   (comum) era a terceira peça mais forte do jogo, e Núcleo Instável
   (lendária) era a mais FRACA — ela deixava o jogador pior do que sem
   relíquia nenhuma. Sete das quinze lendárias rendiam menos que a comum
   mediana.

   `forca` é a faixa medida em que cada raridade tem de cair, e é o que
   `test/quebrar.mjs` cobra. Não é decoração: é o contrato. */
export const RARIDADES = {
  comum:    { nome:'comum',    cor:'#9aa3ad', peso:100, preco:30,  forca:[0.05, 1.1] },
  rara:     { nome:'rara',     cor:'#7fd4ff', peso: 58, preco:55,  forca:[1.1,  2.2] },
  epica:    { nome:'épica',    cor:'#c07bff', peso: 30, preco:90,  forca:[2.2,  3.6] },
  lendaria: { nome:'lendária', cor:'#f0c14b', peso: 13, preco:150, forca:[3.6, 99] },
};
export const ORDEM_RARIDADE = ['comum','rara','epica','lendaria'];
export const RARIDADE = Object.fromEntries(
  Object.entries(RARIDADES).map(([id, r]) => [id, r.cor]));

/* SORTEIO PONDERADO, sem repetição. O peso é POR PEÇA: uma lendária é vinte
   vezes menos provável que uma comum na mesma oferta. Antes era um saco com
   cópias repetidas, o que obrigava os pesos a serem inteiros pequenos e
   fazia a lista inteira ser percorrida a cada pescada. */
export function sortearReliquias(rng, n, jaTem=[]){
  const tem = new Set(jaTem);
  const restam = RELIQUIAS.filter(r => !tem.has(r.id));
  const fora = [];
  while(fora.length < n && restam.length){
    let total = 0;
    for(const r of restam) total += RARIDADES[r.r]?.peso || 1;
    let alvo = rng() * total, i = 0;
    for(; i < restam.length - 1; i++){
      alvo -= RARIDADES[restam[i].r]?.peso || 1;
      if(alvo <= 0) break;
    }
    fora.push(restam.splice(i, 1)[0]);
  }
  return fora;
}
