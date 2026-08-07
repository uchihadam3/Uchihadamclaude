/* ========================================================================
   RELÍQUIAS — as peças que montam a build.

   Regra que vale para todas: relíquia que só dá "+N de alguma coisa" é
   preenchimento. Toda uma aqui ou muda uma REGRA, ou muda a CONTA de um
   jeito que faz o jogador procurar uma coisa diferente no tabuleiro.

   `mods` entra na conta do motor. `ao` são gatilhos que a sala chama.
   ===================================================================== */
const R = (id, nome, r, d, corpo) => ({ id, nome, r, d, ...corpo });

export const RELIQUIAS = [
  /* ---------- comuns: mexem na régua ---------- */
  R('olho_coruja','Olho da Coruja','comum',
    'Começa cada sala espiando 2 cartas.', { aoIniciar:s=>s.espiar(2) }),
  R('caderno','Caderno de Campo','comum',
    'Toda carta revelada continua aparecendo por mais 2 tentativas.',
    { mods:{ memoria:2 } }),
  R('ima','Ímã','comum',
    '+2 de moeda em todo par de Ouro.', { mods:{ moedaBonus:2 } }),
  R('luva','Luva de Feltro','comum',
    'Cada erro custa 1 de Foco a menos (mínimo zero).', { mods:{ blindagem:1 } }),
  R('ampulheta','Ampulheta','comum',
    '+3 viradas em toda sala.', { mods:{ viradas:3 } }),
  R('lampada','Lâmpada','comum',
    'A cada 5 acertos, revela uma carta fechada.',
    { ao:{ acerto:(s,n,c,rel)=>{ if(n%5===0) s._revelarUma(rel); } } }),
  R('moeda_torta','Moeda Torta','comum',
    'Toda virada que sobrar no fim da sala vale 2 moedas em vez de 1.',
    { mods:{ moedaSobra:1 } }),
  R('dado_viciado','Dado Viciado','comum',
    '+3 de pontos na base de toda carta.', { mods:{ pontoBase:3 } }),

  /* ---------- raras: mexem na regra ---------- */
  R('memoria_fotografica','Memória Fotográfica','rara',
    'As 3 primeiras viradas de cada sala não gastam virada.',
    { mods:{ graça:3 } }),
  R('espelho_antigo','Espelho Antigo','rara',
    'A primeira carta Espelho de cada sala vira duas.',
    { aoIniciar:s=>{ const c=s.rng.pick(s.fechadas()); if(c) c.tipo='espelho'; } }),
  R('coroa','Coroa','rara',
    'Multiplicador de combo começa em Perfect em vez de zero.',
    { mods:{ multCombo:0.2 } }),
  R('biblioteca','Biblioteca Viva','rara',
    'Cada família diferente no tabuleiro dá +0,2 de multiplicador.',
    { aoIniciar:s=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.2*s.familias.length; } }),
  R('pena','Pena do Escriba','rara',
    'Errar não zera o combo: corta pela metade.', { mods:{ meioCombo:true } }),
  R('bussola','Bússola Quebrada','rara',
    'Toda carta Bomba vira Cristal.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='bomba') c.tipo='cristal'; } }),
  R('sino','Sino de Bronze','rara',
    'Todo erro revela uma carta fechada. Você erra, mas nunca sai de mãos vazias.',
    { mods:{ consolo:true } }),
  R('cofre','Cofre','rara',
    'Moeda vira ponto: cada 3 moedas somam 1 de multiplicador no fim da sala.',
    { mods:{ moedaVale:true } }),

  /* ---------- lendárias: mudam a run ---------- */
  R('mente_palacio','Palácio da Memória','lendaria',
    'Toda carta fica visível nos 4 primeiros segundos de cada sala.',
    { mods:{ preview:4 } }),
  R('relogio_parado','Relógio Parado','lendaria',
    'A primeira derrota de cada mundo não conta: a sala reinicia.',
    { mods:{ segundaChance:1 } }),
  R('olho_abismo','Olho do Abismo','lendaria',
    'Você vê o TIPO de toda carta antes de virar. Em troca, -1 de Foco.',
    { mods:{ veTipos:true, foco:-1 } }),
  R('mao_do_tempo','Mão do Tempo','lendaria',
    'Acertos consecutivos devolvem viradas: a cada 3 do combo, +1 virada.',
    { ao:{ acerto:(s,n,c,rel)=>{ if(c>0 && c%3===0){ s.devolverVirada(1);
      rel.eventos.push({ e:'virada_extra' }); } } } }),
  R('nucleo','Núcleo Instável','lendaria',
    'Dobra os pontos e dobra o custo dos erros.',
    { mods:{ dobra:true, erroDobra:true } }),

  /* ═══════════════ COMUNS — mexem na régua ═══════════════
     Comum não quer dizer fraca: quer dizer PREVISÍVEL. São as que você pega
     sem pensar muito e que decidem se a build vai ser de ponto, de moeda ou
     de fôlego. */
  R('luneta','Luneta','comum',
    'Começa cada sala espiando 3 cartas — uma a mais que a coruja.',
    { aoIniciar:s=>s.espiar(3) }),
  R('marcador','Marcador de Página','comum',
    'A primeira carta que você vira em cada sala fica marcada e não some mais.',
    { aoIniciar:s=>{ s.mods.marcaPrimeira = true; } }),
  R('lupa_rachada','Lupa Rachada','comum',
    'A cada 4 erros, revela uma carta fechada. Errar deixa de ser só prejuízo.',
    { ao:{ erro:(s,n,rel)=>{ if(n%4===0) s._revelarUma(rel); } } }),
  R('cofrinho','Cofrinho','comum',
    '+1 moeda a cada erro. O tropeço vira troco.', { mods:{ moedaPorErro:1 } }),
  R('relogio_areia','Relógio de Areia','comum',
    '+1 virada a cada erro. Você erra mais devagar do que fica sem tempo.',
    { mods:{ viradaPorErro:1 } }),
  R('pedra_afiada','Pedra de Amolar','comum',
    '+5 de pontos na base de toda carta.', { mods:{ pontoBase:5 } }),
  R('corda','Corda de Alpinista','comum',
    '+5 viradas em toda sala.', { mods:{ viradas:5 } }),
  R('escudo_couro','Escudo de Couro','comum',
    '+1 de Foco. Aguentar mais um esquecimento é mais do que parece.',
    { mods:{ foco:1 } }),
  R('trevo','Trevo Seco','comum',
    'A loja sempre oferece uma coisa a mais.', { mods:{ lojaExtra:1 } }),
  R('bolsa_furada','Bolsa Furada','comum',
    'Cada par de Ouro rende +4 moedas, mas você começa a run com 10 a menos.',
    { mods:{ moedaBonus:4 }, moedasIniciais:-10 }),
  R('lente_azul','Lente Azul','comum',
    'Cartas de Cristal valem o dobro do dobro — quatro vezes a base.',
    { mods:{ multTipo:{ cristal:2 } } }),
  R('luva_ouro','Luva Dourada','comum',
    'Cartas de Ouro valem 50% mais pontos, além das moedas.',
    { mods:{ multTipo:{ ouro:1.5 } } }),
  R('vela','Vela Curta','comum',
    'Toda Bomba nasce com o dobro de pavio.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.pavio) c.pavio *= 2; } }),
  R('linha','Linha de Costura','comum',
    'Cartas de Corrente puxam duas cartas em vez de uma.',
    { mods:{ correnteDupla:true } }),
  R('pente','Pente de Osso','comum',
    'Cada 10 acertos devolvem 1 de Foco.',
    { ao:{ acerto:(s,n)=>{ if(n%10===0) s.foco = Math.min(s.focoMax, s.foco+1); } } }),
  R('mapa_velho','Mapa Velho','comum',
    'Ao vencer uma sala, +8 moedas.',
    { ao:{ salaVencida:(s,tipo,run)=>{ run.moedas += 8; run.estatisticas.moedasGanhas += 8; } } }),
  R('anel_ferro','Anel de Ferro','comum',
    'O primeiro erro de cada sala não custa Foco.',
    { aoIniciar:s=>{ s.mods.perdao = 1; } }),
  R('caneca','Caneca Lascada','comum',
    'Descansar entre mundos devolve 1 de Foco a mais.',
    { ao:{ mundoNovo:(run)=>{ run.foco++; } } }),

  /* ═══════════════ RARAS — mexem na regra ═══════════════
     Rara é a que muda o que você PROCURA no tabuleiro. Depois de pegar uma
     destas, a mesma sala se joga diferente. */
  R('oculos_leitura','Óculos de Leitura','rara',
    'Toda carta revelada continua aparecendo por mais 4 tentativas.',
    { mods:{ memoria:4 } }),
  R('fio_prata','Fio de Prata','rara',
    'O combo não zera nunca: cada erro tira só um degrau.',
    { mods:{ comboDegrau:true } }),
  R('tambor','Tambor de Guerra','rara',
    'Cada acerto seguido soma +0,1 de multiplicador que dura a sala inteira.',
    { ao:{ acerto:(s,n,c)=>{ if(c>1) s.mods.multCombo=(s.mods.multCombo||0)+0.1; } } }),
  R('balanca','Balança Torta','rara',
    'Enquanto o Foco estiver cheio, todo ponto vale o dobro.',
    { mods:{ dobraComFoco:true } }),
  R('faca_dupla','Faca de Dois Gumes','rara',
    'Pontos ×1,5. Cada erro custa 1 de Foco a mais.',
    { mods:{ multCombo:0.5, erroExtra:1 } }),
  R('chave_mestra','Chave Mestra','rara',
    'A loja custa metade do preço.', { mods:{ desconto:0.5 } }),
  R('espelho_agua','Espelho d\'Água','rara',
    'Duas cartas viram Espelho no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 2)) c.tipo='espelho'; } }),
  R('cinzeiro','Cinzeiro','rara',
    'Toda Bomba do tabuleiro é desarmada na entrada.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='bomba'){ c.tipo='normal'; c.pavio=0; } } }),
  R('agulha','Agulha de Bússola','rara',
    'Você vê o TIPO de toda carta antes de virar.', { mods:{ veTipos:true } }),
  R('livro_cinzas','Livro de Cinzas','rara',
    'Cada erro dá +0,25 de multiplicador permanente na sala.',
    { ao:{ erro:(s)=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.25; } } }),
  R('coroa_espinhos','Coroa de Espinhos','rara',
    'Começa cada sala com -1 de Foco e +1,0 de multiplicador.',
    { mods:{ foco:-1, multCombo:1.0 } }),
  R('sacola','Sacola de Feira','rara',
    'A recompensa de sala vencida oferece uma relíquia a mais para escolher.',
    { mods:{ premioExtra:1 } }),
  R('vidro_fume','Vidro Fumê','rara',
    'Cartas Fantasma param de esconder: elas passam a valer o dobro.',
    { aoIniciar:s=>{ for(const c of s.cartas) if(c.tipo==='fantasma') c.tipo='cristal'; } }),
  R('runa_gasta','Runa Gasta','rara',
    'A família Runas rende +80% de pontos para você.',
    { mods:{ multFam:{ runas:1.8 } } }),
  R('placa_circuito','Placa de Circuito','rara',
    'A família Tecnologia rende +80% de pontos para você.',
    { mods:{ multFam:{ tecnologia:1.8 } } }),
  R('escaravelho','Escaravelho','rara',
    'A família Egito rende +80% de pontos para você.',
    { mods:{ multFam:{ egito:1.8 } } }),
  R('meteorito','Lasca de Meteorito','rara',
    'A família Espaço rende +80% de pontos para você.',
    { mods:{ multFam:{ espaco:1.8 } } }),
  R('alambique','Alambique','rara',
    'A família Alquimia rende +80% de pontos para você.',
    { mods:{ multFam:{ alquimia:1.8 } } }),
  R('peao','Peão de Marfim','rara',
    'A família Xadrez rende +80% de pontos para você.',
    { mods:{ multFam:{ xadrez:1.8 } } }),
  R('escama','Escama de Dragão','rara',
    'A família Dragões rende +80% de pontos para você.',
    { mods:{ multFam:{ dragoes:1.8 } } }),
  R('lira','Lira Quebrada','rara',
    'A família Mitologia rende +80% de pontos para você.',
    { mods:{ multFam:{ mitologia:1.8 } } }),
  R('rede','Rede de Pesca','rara',
    'Ao vencer a sala, cada virada que sobrar vale 3 moedas.',
    { mods:{ moedaSobra:2 } }),
  R('cristal_bruto','Cristal Bruto','rara',
    'Duas cartas viram Cristal no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 2)) c.tipo='cristal'; } }),
  R('ferradura','Ferradura','rara',
    'Uma carta vira Lendária no começo de cada sala.',
    { aoIniciar:s=>{ const c=s.rng.pick(s.fechadas()); if(c) c.tipo='lendaria'; } }),
  R('bolso_secreto','Bolso Secreto','rara',
    'Ao entrar num mundo novo, ganha uma relíquia comum de graça.',
    { ao:{ mundoNovo:(run)=>run._darReliquia('comum') } }),
  R('venda','Venda de Seda','rara',
    'Errar duas cartas que você NUNCA viu devolve a virada gasta.',
    { mods:{ descobertaGratis:true } }),

  /* ═══════════════ LENDÁRIAS — mudam a run ═══════════════
     Lendária tem que fazer o jogador mudar de plano no meio da run. Se dá
     para pegar sem pensar, não é lendária — é uma rara cara. */
  R('cronometro','Cronômetro Parado','lendaria',
    'As 6 primeiras viradas de cada sala não gastam virada.',
    { mods:{ graça:6 } }),
  R('biblioteca_perdida','Biblioteca Perdida','lendaria',
    'Cada família diferente no tabuleiro dá +0,5 de multiplicador.',
    { aoIniciar:s=>{ s.mods.multCombo=(s.mods.multCombo||0)+0.5*s.familias.length; } }),
  R('coracao','Coração de Pedra','lendaria',
    '+3 de Foco, e o combo passa a zerar de vez em todo erro.',
    { mods:{ foco:3, comboSeco:true } }),
  R('caleidoscopio','Caleidoscópio','lendaria',
    'Quatro cartas viram Espelho no começo de cada sala.',
    { aoIniciar:s=>{ for(const c of s.rng.sample(s.fechadas(), 4)) c.tipo='espelho'; } }),
  R('lente_do_mundo','Lente do Mundo','lendaria',
    'Toda carta fica visível nos 6 primeiros segundos de cada sala.',
    { mods:{ preview:6 } }),
  R('moeda_de_ouro','Moeda de Duas Caras','lendaria',
    'Todo par de Ouro rende o triplo de moedas e vale o dobro de pontos.',
    { mods:{ moedaBonus:6, multTipo:{ ouro:2 } } }),
  R('sino_mudo','Sino Mudo','lendaria',
    'Todo erro revela DUAS cartas fechadas e devolve a virada.',
    { mods:{ consolo:true, viradaPorErro:1 },
      ao:{ erro:(s,n,rel)=>s._revelarUma(rel) } }),
  R('ampulheta_negra','Ampulheta Negra','lendaria',
    '+10 viradas em toda sala, e cada erro custa 2 de Foco.',
    { mods:{ viradas:10, erroExtra:1 } }),
  R('grimorio','Grimório','lendaria',
    'Começa cada sala espiando 6 cartas.', { aoIniciar:s=>s.espiar(6) }),
  R('pedra_filosofal','Pedra Filosofal','lendaria',
    'Moeda vira ponto na saída: cada 2 moedas somam 1 de multiplicador.',
    { mods:{ moedaVale:true, moedaValePasso:2 } }),
];

export const POR_ID = Object.fromEntries(RELIQUIAS.map(r=>[r.id,r]));
export const RARIDADE = { comum:'#9aa3ad', rara:'#7fd4ff', lendaria:'#f0c14b' };

/* sorteio ponderado: lendária tem que ser raro de ver, senão deixa de ser */
export function sortearReliquias(rng, n, jaTem=[]){
  const tem = new Set(jaTem);
  const pool = [];
  for(const r of RELIQUIAS){
    if(tem.has(r.id)) continue;
    const p = r.r==='comum' ? 10 : r.r==='rara' ? 4 : 1;
    for(let i=0;i<p;i++) pool.push(r);
  }
  const fora = [];
  while(fora.length<n && pool.length){
    const r = rng.pick(pool);
    if(fora.includes(r)) { if(pool.every(x=>fora.includes(x))) break; continue; }
    fora.push(r);
  }
  return fora;
}
