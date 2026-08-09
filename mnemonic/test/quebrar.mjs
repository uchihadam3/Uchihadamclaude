/* ════════════════════════════════════════════════════════════════════════
   TENTAR QUEBRAR O JOGO — de propósito, com as piores intenções.

   Uma build boa TEM de deixar você mais forte: é o motivo de existir uma
   build. O que não pode é existir uma combinação que apague o jogo — que
   faça a memória parar de importar, que dê viradas infinitas, ou que
   empilhe multiplicador sem teto até o placar virar piada.

   `test/curva.mjs` mede o jogo NORMAL, com as relíquias que caem. Isto aqui
   faz o contrário: escolhe as relíquias a dedo, procurando o pior caso.

   COMO SE MEDE SE ESTÁ QUEBRADO
   ─────────────────────────────
   Pelo ESQUECIMENTO, que é do que este jogo é feito. O bot de memória
   perfeita ganha quase sempre e não diz nada; o interessante é o bot que
   esquece 32% do que viu — sem relíquia nenhuma ele passa de 2 ou 3 salas e
   nunca vence. Uma build está quebrada quando faz ESSE bot ganhar a run
   inteira: quer dizer que a build substituiu a memória, que é o jogo.

   E também pelo TETO DE PONTOS. Multiplicador que se acumula sem limite não
   aparece na taxa de vitória — aparece no placar, em ordens de grandeza. Um
   ranking em que o primeiro lugar tem mil vezes o segundo não é um ranking.

       node test/quebrar.mjs            (as verificações)
       node test/quebrar.mjs --busca    (a caçada completa, demorada)
   ═══════════════════════════════════════════════════════════════════════ */
import { Run } from '../js/engine/run.js';
import { CLASSES } from '../js/data/classes.js';
import { RELIQUIAS, POR_ID, RARIDADES,
         ORDEM_RARIDADE } from '../js/data/reliquias.js';
import { jogarRun } from './bot.mjs';
import { forca } from './forca.mjs';

const BUSCA = process.argv.includes('--busca');
let n = 0; const falhas = [];
const ok = (c, m) => { n++; if(!c) falhas.push(m);
  console.log((c ? '\x1b[32m ok \x1b[0m' : '\x1b[31mFALHA\x1b[0m') + ' ' + m); };
const secao = t => console.log(`\n\x1b[36m── ${t}\x1b[0m`);

/* ---------- rodar uma build ----------
   As relíquias entram direto em `run.reliquias`, sem passar pela loja nem
   pelo prêmio. Não é trapaça: é justamente o ponto. A pergunta não é "dá
   para juntar isto numa run de verdade?" — é "SE der, o jogo acaba?". Uma
   combinação impossível hoje vira possível na próxima relíquia nova. */
function rodar({ reliquias = [], esquece = 0.32, sementes = 6,
                 classes = null, cap = null } = {}){
  const cls = classes || Object.keys(CLASSES);
  let venceu = 0, total = 0, salas = 0, pontos = 0, maiorPontos = 0;
  for(const cl of cls) for(let i = 0; i < sementes; i++){
    const r = new Run({ semente: 'q' + i, classe: cl });
    r.reliquias.push(...reliquias);
    if(cap) cap(r);
    jogarRun(r, { esquece });
    total++; salas += r.estatisticas.salas; pontos += r.pontos;
    if(r.pontos > maiorPontos) maiorPontos = r.pontos;
    if(r.venceu) venceu++;
  }
  return { venceu, total, taxa: venceu / total, salas: salas / total,
           pontos: pontos / total, maiorPontos };
}

const pct = x => (x * 100).toFixed(0) + '%';
const linha = (rot, r) =>
  console.log(`   ${rot.padEnd(34)} vence ${pct(r.taxa).padStart(4)}   `
    + `salas ${r.salas.toFixed(1).padStart(5)}   pontos ${
      Math.round(r.pontos).toLocaleString('pt-BR').padStart(14)}`);

/* ════════════════════════════════════════════════════════ 1 */
secao('1. A régua: sem relíquia nenhuma, quem esquece não vence');
const NU = rodar({ reliquias: [] });
linha('sem relíquia', NU);
ok(NU.taxa <= 0.15,
   `sem build, esquecendo 32%, o bot quase não vence (${pct(NU.taxa)})`);
ok(NU.salas < 8, `e não passa de poucas salas (${NU.salas.toFixed(1)})`);

/* ════════════════════════════════════════════════════════ 2 */
secao('2. Relíquia sozinha: nenhuma resolve o jogo por conta própria');
{
  /* uma relíquia que, SOZINHA, faz o bot cego ganhar a run é uma relíquia
     que não é uma peça de build — é um botão de desligar o jogo */
  const solo = [];
  for(const r of RELIQUIAS){
    const x = rodar({ reliquias: [r.id], sementes: 3 });
    solo.push({ id: r.id, nome: r.nome, r: r.r, ...x });
  }
  solo.sort((a, b) => b.taxa - a.taxa || b.salas - a.salas);
  console.log('\n   as 8 mais fortes sozinhas:');
  for(const s of solo.slice(0, 8))
    console.log(`   ${(s.nome + ' (' + s.r + ')').padEnd(34)} `
      + `vence ${pct(s.taxa).padStart(4)}   salas ${s.salas.toFixed(1)}`);
  const sozinhaGanha = solo.filter(s => s.taxa >= 0.5);
  ok(!sozinhaGanha.length,
     'nenhuma relíquia sozinha vence metade das runs de um bot que esquece 32%'
     + (sozinhaGanha.length ? ': ' + sozinhaGanha.map(s => s.nome).join(', ') : ''));

  /* e o contrário: relíquia que não muda NADA é preenchimento */
  const inuteis = solo.filter(s => Math.abs(s.salas - NU.salas) < 0.08
                                && Math.abs(s.pontos - NU.pontos) / (NU.pontos || 1) < 0.02);
  ok(inuteis.length <= 6,
     `poucas relíquias são invisíveis na prática (${inuteis.length}: `
     + inuteis.slice(0, 6).map(s => s.nome).join(', ') + ')');
}

/* ════════════════════════════════════════════════════════ 2b */
secao('2b. A raridade não pode mentir: mais rara TEM de ser mais forte');
{
  /* A QUEIXA QUE ORIGINOU ISTO: "tem relíquia comum melhor que lendária, não
     faz sentido". Fazia sentido nenhum mesmo, e era verdade. Medido antes:
     Luva de Feltro (comum) era a terceira peça mais forte do jogo e Núcleo
     Instável (lendária) era a mais FRACA — deixava o jogador pior do que sem
     relíquia nenhuma. Sete das quinze lendárias rendiam menos que a comum
     mediana. Uma fita dourada em cima de um efeito pior que o cinza não é
     uma surpresa: é a interface mentindo para quem escolhe.

     A raridade promete DUAS coisas ao mesmo tempo — "aparece pouco" e "é
     forte" — e só a primeira estava no código. Aqui a segunda vira teste.

     Cobra-se a MEDIANA de cada degrau, e não a peça individual: dentro de um
     degrau é bom que haja variação (senão a escolha não é escolha), e uma
     comum situacional que brilha numa build específica é desenho, não
     defeito. O que não pode é o degrau INTEIRO valer menos que o de baixo. */
  /* a régua é a de `test/forca.mjs`, sala a sala — a mesma que a ferramenta
     usa para montar a tabela. A régua de RUN, que este arquivo usa no resto,
     tem desvio de ±1,3 sala e não serve para ordenar peças que valem menos
     de uma. */
  const porGrau = {};
  for(const g of ORDEM_RARIDADE) porGrau[g] = [];
  for(const r of RELIQUIAS) porGrau[r.r].push(forca(r.id, { sementes:8 }).forca);
  const mediana = v => { const o = [...v].sort((a,b)=>a-b);
    return o.length % 2 ? o[(o.length-1)/2] : (o[o.length/2-1]+o[o.length/2])/2; };
  console.log('');
  for(const g of ORDEM_RARIDADE)
    console.log(`   ${RARIDADES[g].nome.padEnd(10)} ${String(porGrau[g].length).padStart(2)} peças`
      + `   mediana ${mediana(porGrau[g]) >= 0 ? '+' : ''}${mediana(porGrau[g]).toFixed(2)}`
      + `   peso ${String(RARIDADES[g].peso).padStart(3)}   ${RARIDADES[g].preco} moedas`);

  for(let i = 1; i < ORDEM_RARIDADE.length; i++){
    const cima = ORDEM_RARIDADE[i], baixo = ORDEM_RARIDADE[i-1];
    ok(mediana(porGrau[cima]) > mediana(porGrau[baixo]),
       `${RARIDADES[cima].nome} rende mais que ${RARIDADES[baixo].nome} `
       + `(${mediana(porGrau[cima]).toFixed(2)} contra ${mediana(porGrau[baixo]).toFixed(2)})`);
  }
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. As combinações que a gente MESMO tentaria quebrar');
{
  /* A RÉGUA É O TETO, NÃO O CHÃO. Isto comparava o placar da combinação com
     o de quem não tem relíquia nenhuma, e esse número é quase zero e balança
     muito: a mesma build media 100×, 350× e 7.260× em dias diferentes sem
     nada ter mudado nela. Razão contra um chão que afunda mede o chão.

     As 75 relíquias juntas são uma referência estável e cheia de sentido:
     é a marca de referência, e vale imprimir. Mas NÃO é um teto: algumas
     peças se anulam entre si — Coração de Pedra faz o combo zerar de vez e
     apaga a Pena do Escriba e o Fio de Prata, que existem justamente para
     ele não zerar. Ter tudo pode render MENOS que ter as cinco certas, e
     medido é isso mesmo que acontece. Por isso o limite abaixo é absoluto:
     ele pega multiplicador disparando sozinho, que é o defeito real. */
  const TETO = rodar({ reliquias: RELIQUIAS.map(r => r.id), sementes:3 });
  console.log(`   (teto: as 75 juntas fazem `
    + `${Math.round(TETO.pontos).toLocaleString('pt-BR')} pontos)\n`);
  /* Cada uma destas é uma hipótese de quebra escrita à mão. Busca aleatória
     acha o que já existe; hipótese acha o que o jogador esperto vai tentar
     no primeiro dia. */
  const suspeitas = [
    ['erro de graça e infinito',
     ['relogio_areia','sino_mudo','luva','anel_ferro','cofrinho'],
     'errar devolve virada e não custa foco: dá para errar para sempre?'],
    ['erro que vira multiplicador',
     ['livro_cinzas','relogio_areia','sino_mudo','luva','pena'],
     'se errar é grátis e cada erro dá +0,25 de mult, o placar tem teto?'],
    ['multiplicador que se acumula',
     ['tambor','livro_cinzas','coroa_espinhos','faca_dupla','biblioteca_perdida'],
     'quatro fontes de multiplicador na mesma sala'],
    ['ver tudo o tempo todo',
     ['lente_do_mundo','mente_palacio','grimorio','oculos_leitura','caderno','agulha'],
     'preview + espiada + memória longa: a memória ainda importa?'],
    ['viradas infinitas',
     ['ampulheta_negra','corda','ampulheta','relogio_areia','sino_mudo','mao_do_tempo'],
     '+18 viradas de base e mais uma por erro e por combo'],
    ['imortal',
     ['coracao','escudo_couro','luva','anel_ferro','pente','relogio_parado','venda'],
     'foco alto, erro barato e segunda chance'],
    ['tudo vira ouro',
     ['moeda_de_ouro','ima','bolsa_furada','pedra_filosofal','cofre','mapa_velho','rede'],
     'moeda vira multiplicador: economia fechada em si mesma'],
    ['tabuleiro adulterado',
     ['caleidoscopio','espelho_agua','espelho_antigo','cristal_bruto','ferradura','cinzeiro','bussola'],
     'trocar o tipo de meia dúzia de cartas toda sala'],
  ];
  for(const [nome, rel, por] of suspeitas){
    const x = rodar({ reliquias: rel.filter(id => POR_ID[id]) });
    linha(nome, x);
    console.log(`      ${por}`);
    /* Os tetos saem do que foi MEDIDO, com folga — teto solto não guarda
       nada. Hoje a pior combinação escrita à mão chega a 38% de vitória e a
       100× o placar de quem não tem relíquia; 60% e 250× dão espaço para o
       conteúdo crescer e ainda pegam uma regressão de verdade. Para comparar:
       as 75 relíquias juntas, que é o teto teórico inalcançável, vencem 100%
       e fazem 540×. */
    ok(x.taxa <= 0.60,
       `"${nome}" não transforma o bot cego em campeão (${pct(x.taxa)})`);
    /* 50 milhões: a pior combinação escrita à mão faz 3,6 milhões hoje, e
       um multiplicador sem freio não para em quatorze vezes isso — ele vai
       para a casa dos bilhões numa run só. O limite é largo de propósito,
       para pegar o defeito e não a maré. */
    ok(x.pontos < 5e7,
       `"${nome}" não explode o placar `
       + `(${Math.round(x.pontos).toLocaleString('pt-BR')}, e o teto é 50 milhões)`);
  }
}

/* ════════════════════════════════════════════════════════ 4 */
secao('4. A build MÁXIMA: todas as 75 relíquias ao mesmo tempo');
{
  /* Isto não acontece numa run — e é justamente por isso que serve de teto.
     Se nem com TUDO o jogo vira passeio, nenhuma combinação alcançável vira.
     E se com tudo ele explode, o número de onde explodiu diz o que olhar. */
  const TUDO = RELIQUIAS.map(r => r.id);
  const x = rodar({ reliquias: TUDO, sementes: 4 });
  linha('as 75 juntas', x);
  console.log(`      maior placar de uma run: ${x.maiorPontos.toLocaleString('pt-BR')}`);
  ok(Number.isFinite(x.pontos) && x.pontos > 0,
     'a run não estoura em NaN nem Infinity com tudo ligado');
  ok(x.salas > NU.salas,
     `e a build máxima realmente ajuda (${NU.salas.toFixed(1)} → ${x.salas.toFixed(1)} salas)`);
  /* o teto duro: mesmo com as 75, o placar tem de caber num número que uma
     pessoa consegue ler, e a run tem de acabar */
  ok(x.maiorPontos < 1e12,
     `o placar máximo cabe num ranking (${x.maiorPontos.toExponential(1)})`);
  /* e o teto tem de ser um número que uma pessoa lê. Razão contra o chão
     não serve aqui pelo mesmo motivo de sempre: o chão é quase zero. */
  ok(x.pontos < 5e8,
     `o teto teórico cabe num placar legível (${Math.round(x.pontos).toLocaleString('pt-BR')})`);
}

/* ════════════════════════════════════════════════════════ 5 */
secao('5. Build boa TEM de ser melhor que build ruim');
{
  /* o outro lado da moeda: se juntar relíquias certas não muda nada, a
     escolha na loja é decoração e a run não tem progressão nenhuma */
  const boa = rodar({ reliquias:
    ['cronometro','coracao','oculos_leitura','grimorio','corda','venda','luva'] });
  linha('uma build pensada', boa);
  ok(boa.salas > NU.salas * 1.5,
     `uma build pensada leva bem mais longe (${NU.salas.toFixed(1)} → ${boa.salas.toFixed(1)})`);
  ok(boa.pontos > NU.pontos * 2,
     `e pontua bem mais (${Math.round(NU.pontos)} → ${Math.round(boa.pontos)})`);
}

/* ════════════════════════════════════════════════════════ 6 */
secao('6. A run sempre acaba');
{
  /* uma build que dá viradas de graça pode fazer a sala não terminar nunca.
     O bot tem trava interna, mas a trava do bot esconderia o defeito — aqui
     se cobra que a RUN chegue ao fim por regra, não por desistência. */
  const infinitas = ['ampulheta_negra','corda','ampulheta','relogio_areia',
                     'sino_mudo','mao_do_tempo','memoria_fotografica','cronometro'];
  let travadas = 0, maiorSala = 0;
  for(const cl of Object.keys(CLASSES)) for(let i = 0; i < 3; i++){
    const r = new Run({ semente: 'inf' + i, classe: cl });
    r.reliquias.push(...infinitas.filter(id => POR_ID[id]));
    jogarRun(r, { esquece: 0.32 });
    if(!r.acabou()) travadas++;
    maiorSala = Math.max(maiorSala, r.estatisticas.salas);
  }
  ok(travadas === 0,
     `nenhuma run fica presa com todas as fontes de virada juntas (${travadas} presas)`);
  console.log(`      sala mais distante alcançada: ${maiorSala}`);
}

/* ════════════════════════════════════════════════════════ 7 */
if(BUSCA){
  secao('7. Caçada: pares de relíquias que se multiplicam');
  /* O que interessa não é a soma — é quando duas juntas rendem MAIS do que a
     soma do que rendem sozinhas. Sinergia é o que faz build; sinergia sem
     teto é o que quebra jogo. */
  const solo = new Map();
  for(const r of RELIQUIAS)
    solo.set(r.id, rodar({ reliquias: [r.id], sementes: 2 }).pontos);
  const base = NU.pontos;
  const pares = [];
  const ids = RELIQUIAS.map(r => r.id);
  for(let a = 0; a < ids.length; a++) for(let b = a + 1; b < ids.length; b++){
    const j = rodar({ reliquias: [ids[a], ids[b]], sementes: 2 }).pontos;
    const esperado = base + (solo.get(ids[a]) - base) + (solo.get(ids[b]) - base);
    pares.push({ a: ids[a], b: ids[b], j, sinergia: j / Math.max(1, esperado) });
  }
  pares.sort((x, y) => y.sinergia - x.sinergia);
  console.log('\n   os 12 pares mais sinérgicos:');
  for(const p of pares.slice(0, 12))
    console.log(`   ${(POR_ID[p.a].nome + ' + ' + POR_ID[p.b].nome).padEnd(46)} `
      + `×${p.sinergia.toFixed(2)}`);
  ok(pares[0].sinergia < 25,
     `nenhum par rende vinte e cinco vezes o esperado (×${pares[0].sinergia.toFixed(1)}: `
     + `${POR_ID[pares[0].a].nome} + ${POR_ID[pares[0].b].nome})`);
}

console.log('\n' + '─'.repeat(58));
if(falhas.length){
  console.log(`\x1b[31m✗ ${falhas.length} de ${n} verificações de equilíbrio falharam\x1b[0m`);
  for(const f of falhas) console.log('  · ' + f);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${n} verificações de equilíbrio passaram\x1b[0m`);
