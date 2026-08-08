/* ════════════════════════════════════════════════════════════════════════
   A COLEÇÃO E AS MEDALHAS — o que o jogador leva de uma run para a outra.

   Estas três coisas — o que já foi descoberto, o caderno da vida inteira e as
   medalhas — moram no armazenamento do aparelho e não entram no replay. Isso
   as torna INVISÍVEIS para o teste de regras, que só conhece o motor, e é
   exatamente por isso que elas precisam de um teste próprio: uma medalha que
   nunca é dada e uma coleção que nunca se enche não quebram partida nenhuma,
   e o jogador só descobre depois de dez runs que nada nunca acontece.

   `localStorage` é dublado aqui em cima. Não é para fingir navegador — é para
   poder ZERAR entre um caso e outro, que é a única forma de testar "a segunda
   vez não conta de novo".

       node test/colecao.mjs
   ═══════════════════════════════════════════════════════════════════════ */
const guardado = new Map();
globalThis.localStorage = {
  getItem: k => (guardado.has(k) ? guardado.get(k) : null),
  setItem: (k, v) => guardado.set(k, String(v)),
  removeItem: k => guardado.delete(k),
  clear: () => guardado.clear(),
};

const { Run } = await import('../js/engine/run.js');
const { descobrir, viu, quantosViu, escondeCapitulo, apagarDescobertas }
  = await import('../js/ui/descobertas.js');
const { perfil, anotarRun, anotarPublicacao, taxaVitoria, apagarPerfil }
  = await import('../js/ui/perfil.js');
const { conferirConquistas, temMedalha, quantasMedalhas, situacao, apagarMedalhas }
  = await import('../js/ui/medalhas.js');
const { CONQUISTAS, DEGRAUS } = await import('../js/data/conquistas.js');
const { LISTA_TIPOS } = await import('../js/data/cartas.js');
const { LISTA_FAMILIAS } = await import('../js/data/familias.js');
const { LISTA_BOSSES } = await import('../js/data/bosses.js');
const { RELIQUIAS } = await import('../js/data/reliquias.js');

let falhas = [];
let n = 0;
const ok = (c, m) => { n++; if(!c) falhas.push(m); };
const eq = (a, b, m) => { n++; if(a !== b) falhas.push(`${m} — esperava ${b}, veio ${a}`); };
const secao = t => console.log(`\n\x1b[36m── ${t}\x1b[0m`);
const zerar = () => { apagarDescobertas(); apagarPerfil(); apagarMedalhas(); };

/* ════════════════════════════════════════════════════════ 1 */
secao('1. O que se viu fica visto, e não vira o dobro');
{
  zerar();
  eq(quantosViu('carta'), 0, 'a coleção começa vazia');
  eq(descobrir('carta', 'ouro').length, 1, 'a primeira vez é novidade');
  eq(descobrir('carta', 'ouro').length, 0, 'a segunda vez não é novidade');
  eq(quantosViu('carta'), 1, 'e não contou duas vezes');
  ok(viu('carta', 'ouro'), 'a carta vista fica vista');
  ok(!viu('carta', 'bomba'), 'a que não se viu continua escondida');
  eq(descobrir('carta', ['bomba','gelo','ouro']).length, 2,
     'descobrir uma lista devolve só as que são novidade');
  /* o vocabulário e as classes estão na tela antes da primeira partida:
     escondê-los seria esconder como se joga */
  for(const c of ['palavra','combo','classe','conquista'])
    ok(!escondeCapitulo(c), `o capítulo ${c} nunca fica escondido`);
  for(const c of ['carta','familia','chefe','reliquia'])
    ok(escondeCapitulo(c), `o capítulo ${c} se descobre jogando`);
}

/* ════════════════════════════════════════════════════════ 2 */
secao('2. O caderno soma runs, e a mesma run só entra uma vez');
{
  zerar();
  const r = new Run({ semente:'caderno', classe:'detetive' });
  r.entrar();
  /* joga a sala inteira sem errar: o bot mais burro que existe, e serve —
     o que se mede aqui é a contabilidade, não a habilidade */
  while(r.sala && !r.sala.fim){
    const s = r.sala;
    const abertas = s.emJogo();
    const a = abertas[0];
    const b = abertas.find(c => c.par === a.par && c.id !== a.id) || abertas[1];
    r.virar(a.id); if(b) r.virar(b.id);
  }
  const antes = perfil().runs;
  anotarRun(r);
  eq(perfil().runs, antes + 1, 'a run entrou no caderno');
  anotarRun(r);
  eq(perfil().runs, antes + 1, 'e a mesma run não entra de novo');
  ok(perfil().pares > 0, 'os pares fechados foram somados');
  ok(perfil().salas >= 1, 'a sala vencida foi somada');
  ok(perfil().melhorSala > 0, 'a melhor sala da run foi guardada');
  ok(perfil().limpas >= 1, 'o tabuleiro limpo até a última carta foi contado');
  ok(perfil().semErro >= 1, 'a sala vencida sem errar foi contada');
  eq(taxaVitoria(), 0, 'quem não venceu a run tem 0% de vitória');
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. A medalha é dada quando o número chega, e só uma vez');
{
  zerar();
  eq(quantasMedalhas(), 0, 'ninguém começa com medalha');
  eq(conferirConquistas().length, 0, 'e conferir do nada não dá nenhuma');

  const p = perfil();
  p.salas = 1;
  const novas = conferirConquistas();
  ok(novas.some(c => c.id === 'primeira_sala'),
     'vencer uma sala dá a medalha da primeira porta');
  ok(temMedalha('primeira_sala'), 'e ela fica carimbada');
  eq(conferirConquistas().length, 0, 'conferir de novo não dá a mesma medalha duas vezes');

  /* MEDALHA NÃO SE PERDE. O perfil pode cair — limpar o navegador, trocar de
     aparelho — e uma medalha que some sozinha é pior do que medalha nenhuma. */
  p.salas = 0;
  conferirConquistas();
  ok(temMedalha('primeira_sala'), 'e não se perde quando o número que a provou cai');
}

/* ════════════════════════════════════════════════════════ 4 */
secao('4. Cada conquista tem uma prova que realmente acontece');
{
  /* o teste que importa: montar a situação que a descrição promete e cobrar a
     medalha. Sem isto, uma conquista com a conta trocada fica no jogo para
     sempre — ela não quebra nada, só nunca é dada, e ninguém percebe. */
  const casos = {
    primeira_sala:   s => { s.p.salas = 1; },
    primeiro_mundo:  s => { s.p.mundoMaximo = 2; },
    dez_runs:        s => { s.p.runs = 10; },
    combo_oito:      s => { s.p.maiorCombo = 8; },
    combo_doze:      s => { s.p.maiorCombo = 12; },
    sala_limpa:      s => { s.p.limpas = 1; },
    vinte_limpas:    s => { s.p.limpas = 20; },
    sem_erro:        s => { s.p.semErro = 1; },
    dez_sem_erro:    s => { s.p.semErro = 10; },
    mil_pares:       s => { s.p.pares = 1000; },
    cem_mil:         s => { s.p.melhorRun = 100000; },
    meio_milhao:     s => { s.p.melhorRun = 500000; },
    milhao:          s => { s.p.melhorRun = 1000000; },
    sala_gorda:      s => { s.p.melhorSala = 50000; },
    cem_salas:       s => { s.p.salas = 100; },
    venceu:          s => { s.p.vitorias = 1; },
    venceu_cinco:    s => { s.p.vitorias = 5; },
    tres_classes:    s => { s.p.classes = { a:1, b:1, c:1 }; },
    todas_classes:   s => { s.p.classes = Object.fromEntries(
                              Array.from({length:s.total('classe')}, (_,i)=>['c'+i, 1])); },
    diaria:          s => { s.p.diarias = 1; },
    publicou:        s => { s.p.publicados = 1; },
    todas_cartas:    s => { s.quantos = c => c==='carta' ? LISTA_TIPOS.length : 0; },
    todas_familias:  s => { s.quantos = c => c==='familia' ? LISTA_FAMILIAS.length : 0; },
    vinte_reliquias: s => { s.quantos = c => c==='reliquia' ? 20 : 0; },
    metade_reliquias:s => { s.quantos = c => c==='reliquia'
                              ? Math.ceil(RELIQUIAS.length/2) : 0; },
    todas_reliquias: s => { s.quantos = c => c==='reliquia' ? RELIQUIAS.length : 0; },
    todos_chefes:    s => { s.p.chefes = Object.fromEntries(
                              LISTA_BOSSES.map(b => [b.id, 1])); },
  };
  const vazia = () => ({
    p: { runs:0, vitorias:0, salas:0, pares:0, erros:0, moedas:0, melhorRun:0,
         melhorSala:0, maiorCombo:0, limpas:0, semErro:0, mundoMaximo:0,
         diarias:0, publicados:0, classes:{}, chefes:{} },
    quantos: () => 0,
    total: cap => ({ carta:LISTA_TIPOS.length, familia:LISTA_FAMILIAS.length,
                     classe:8, chefe:LISTA_BOSSES.length,
                     reliquia:RELIQUIAS.length })[cap] || 0,
  });
  for(const c of CONQUISTAS){
    ok(!c.prova(vazia()), `${c.id} NÃO é dada de graça`);
    const monta = casos[c.id];
    if(!monta){ ok(false, `${c.id} não tem caso de teste — conquista nova sem prova`); continue; }
    const s = vazia(); monta(s);
    ok(c.prova(s), `${c.id} é dada quando ${c.d.toLowerCase().replace(/\.$/,'')}`);
    ok(!!DEGRAUS[c.g], `${c.id} tem um degrau conhecido`);
    ok(c.nome && c.d, `${c.id} tem nome e descrição`);
  }
  eq(new Set(CONQUISTAS.map(c=>c.id)).size, CONQUISTAS.length,
     'nenhuma conquista repete o id de outra');
  eq(new Set(CONQUISTAS.map(c=>c.nome)).size, CONQUISTAS.length,
     'nem o nome');
  /* nem a MARCA. Vinte e sete medalhas com seis desenhos repetidos é a mesma
     armadilha da loja de relíquias antes dos emblemas: uma parede de coisas
     iguais, e o jogador tem de ler parágrafo para saber qual é qual. */
  eq(new Set(CONQUISTAS.map(c=>c.ico)).size, CONQUISTAS.length,
     'nenhuma medalha usa a marca de outra');
}

/* ════════════════════════════════════════════════════════ 5 */
secao('5. Nenhuma medalha mexe na partida');
{
  /* A REGRA DE PROJETO, cobrada por teste: se uma conquista desse vantagem,
     quem joga há mais tempo jogaria um jogo mais fácil — e o ranking mundial,
     que é o mesmo para todos, deixaria de comparar a mesma coisa. */
  const fonte = await import('node:fs').then(fs =>
    fs.readFileSync(new URL('../js/data/conquistas.js', import.meta.url), 'utf8'));
  for(const proibido of ['mods', 'foco =', 'viradas', 'reliquias.push', 'pontos ='])
    ok(!fonte.includes(proibido),
       `a tabela de conquistas não toca em "${proibido}"`);
  ok(!/import .*(run|tabuleiro)\.js/.test(fonte),
     'e nem sequer conhece o motor');
}

/* ════════════════════════════════════════════════════════ 6 */
secao('6. Publicar conta, e conta uma vez por publicação');
{
  zerar();
  anotarPublicacao();
  eq(perfil().publicados, 1, 'a publicação entrou no caderno');
  ok(conferirConquistas().some(c => c.id === 'publicou'),
     'e vale a medalha do quadro');
}

console.log('\n' + '─'.repeat(56));
if(falhas.length){
  console.log(`\x1b[31m✗ ${falhas.length} de ${n} verificações falharam\x1b[0m\n`);
  for(const f of falhas) console.log('  · ' + f);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${n} verificações de coleção passaram\x1b[0m`);
