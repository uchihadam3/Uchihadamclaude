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
