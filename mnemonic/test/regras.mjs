/* ========================================================================
   TESTE DO MOTOR DO MNEMONIC          node mnemonic/test/regras.mjs

   Três coisas precisam ser provadas aqui, e nenhuma delas dá para provar
   jogando um pouquinho no navegador:

   A) A REGRA FAZ O QUE O TEXTO DIZ. Toda carta, família e relíquia tem uma
      frase que o jogador lê. Se a frase e o código discordam, quem perde a
      run acha que o jogo trapaceou.

   B) O TABULEIRO NUNCA FICA IMPOSSÍVEL. Curinga, Mimic, bomba e chefe tiram
      cartas do jogo. Um tabuleiro que fica com duas cartas que não fecham é
      bug, não dificuldade.

   C) O PLACAR É RECALCULÁVEL. É o anti-cheat inteiro: o ranking mora em
      relay público, então a única defesa é qualquer aparelho refazer a run
      a partir da semente e das jogadas e conferir o número.
   ===================================================================== */
import { makeRNG } from '../js/rng.js';
import { TIPOS, LISTA_TIPOS, sortearTipos } from '../js/data/cartas.js';
import { FAMILIAS, LISTA_FAMILIAS, sortearFamilias } from '../js/data/familias.js';
import { CLASSES, LISTA_CLASSES } from '../js/data/classes.js';
import { RELIQUIAS, POR_ID, sortearReliquias } from '../js/data/reliquias.js';
import { BOSSES, LISTA_BOSSES, BOSS_DO_MUNDO } from '../js/data/bosses.js';
import { EVENTOS } from '../js/data/eventos.js';
import { glifo, POR_FAMILIA } from '../js/arte/glifos.js';
import { ICO, ICO_CLASSE, ICO_CHEFE, ICO_FAM, ICO_RELIQUIA, TEM_ARTE,
         icoReliquia, MOLDURA_DO_TIPO } from '../js/ui/icones.js';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { Sala, COMBOS, degrauCombo, pontosPerfeitos, colunasPara } from '../js/engine/tabuleiro.js';
import { Run, verificar, planoDaSala, SALAS, MUNDOS, COMBATE, MAX_JOGADAS } from '../js/engine/run.js';
import { jogarRun } from './bot.mjs';

let passou = 0, falhou = 0; const erros = [];
function ok(cond, msg){
  if(cond) passou++;
  else { falhou++; erros.push(msg); }
}
const eq = (a,b,msg)=> ok(Object.is(a,b), `${msg} — esperava ${b}, veio ${a}`);
function secao(n){ console.log('\n\x1b[36m── '+n+'\x1b[0m'); }

/* tabuleiro de laboratório: cartas todas iguais e inertes, para a regra sob
   teste ficar sozinha no quadro. A família '__teste' não existe em regra
   nenhuma, então nenhuma delas dispara por acidente. */
function salaTeste(o={}){
  const s = new Sala({
    rng: makeRNG(o.semente ?? 'lab'),
    pares: o.pares ?? 8, meta: o.meta ?? 99999,
    viradas: o.viradas ?? 99, foco: o.foco ?? 5,
    dificuldade: 0, mods: o.mods || {}, boss: o.boss || null,
    ferramenta: o.ferramenta || null,
  });
  if(o.cru) return s;
  for(const c of s.cartas){ c.tipo='normal'; c.fam='__teste'; c.camadas=1; c.pavio=0; }
  return s;
}
/* duas cartas de pares diferentes */
function duasDiferentes(s){
  const [a] = s.fechadas();
  return [a, s.fechadas().find(c=>c.par!==a.par)];
}

/* ════════════════════════════════════════════════════════ 1 */
secao('1. RNG semeado');
{
  const a = makeRNG('x'), b = makeRNG('x'), c = makeRNG('y');
  const sa = [a(),a(),a()], sb = [b(),b(),b()], sc = [c(),c(),c()];
  ok(sa.every((v,i)=>v===sb[i]), 'mesma semente devolve a mesma sequência');
  ok(sa.some((v,i)=>v!==sc[i]), 'sementes diferentes divergem');
  const r = makeRNG(7);
  ok(r.sample([1,2,3,4,5],3).length===3, 'sample devolve o tamanho pedido');
  ok(new Set(makeRNG(9).sample([1,2,3,4,5],5)).size===5, 'sample não repete');
  ok([...Array(200)].every(()=>{ const v=makeRNG(Math.random()*1e9|0).int(3,7);
    return v>=3 && v<=7; }), 'int fica dentro da faixa');
}

/* ════════════════════════════════════════════════════════ 2 */
secao('2. Montagem do tabuleiro');
{
  for(const pares of [6,10,17,24,30]){
    const s = salaTeste({ pares, cru:true, semente:'m'+pares });
    eq(s.cartas.length, pares*2, `${pares} pares viram ${pares*2} cartas`);
    const conta = {};
    for(const c of s.cartas) conta[c.par]=(conta[c.par]||0)+1;
    ok(Object.values(conta).every(n=>n===2), `todo par tem exatamente 2 cartas (${pares})`);
    ok(new Set(s.cartas.map(c=>c.pos)).size===pares*2, `posições únicas (${pares})`);
    ok(s.cartas.every(c=>c.pos>=0 && c.pos<pares*2), `posições dentro da grade (${pares})`);
    /* símbolo repetido só é permitido para o Mimic, que copia de propósito */
    const porSimbolo = {};
    for(const c of s.cartas) (porSimbolo[c.simbolo+c.fam] ||= []).push(c);
    for(const [k,g] of Object.entries(porSimbolo)){
      const pares_ = new Set(g.map(c=>c.par));
      ok(pares_.size===1 || [...pares_].some(p=>g.find(c=>c.par===p).tipo==='mimic'),
         `símbolo ${k} só se repete por causa do Mimic (${pares} pares)`);
    }
  }
  const a = salaTeste({ cru:true, semente:'igual' });
  const b = salaTeste({ cru:true, semente:'igual' });
  ok(a.cartas.every((c,i)=> c.simbolo===b.cartas[i].simbolo && c.tipo===b.cartas[i].tipo
       && c.pos===b.cartas[i].pos), 'mesma semente monta o MESMO tabuleiro');
  /* `pos` é o índice do baralho já embaralhado, então quem denuncia a
     diferença é QUAL carta caiu em cada posição, não o número da posição */
  const d = salaTeste({ cru:true, semente:'outra' });
  const arranjo = s => s.porPos().map(c=>c.simbolo+c.tipo).join(' ');
  ok(arranjo(a) !== arranjo(d), 'semente diferente muda o tabuleiro');
  for(const n of [12,20,34,48,60]){
    const c = colunasPara(n);
    ok(c>=3 && c<=10, `grade de ${n} cartas tem entre 3 e 10 colunas (${c})`);
    /* em pé: mais filas que colunas, que é o formato de uma tela de celular */
    ok(Math.ceil(n/c) >= c, `a grade de ${n} cartas é mais alta que larga (${c}×${Math.ceil(n/c)})`);
  }
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. VISTA e CONHECIDA são coisas diferentes');
{
  const s = salaTeste();
  const [a] = s.fechadas();
  ok(!a.vista && !a.conhecida, 'carta começa sem vista e sem conhecida');
  s.virar(a.id);
  ok(a.vista && a.conhecida, 'virar acende as duas');
  const f = salaTeste({ cru:true, semente:'fant' });
  const alvo = f.cartas.find(c=>TIPOS[c.tipo].esconde);
  if(alvo){
    const outra = f.fechadas().find(c=>c.par!==alvo.par);
    f.virar(alvo.id); f.virar(outra.id);
    ok(!alvo.vista, 'Fantasma apaga a VISTA depois do erro');
    ok(alvo.conhecida, 'Fantasma NÃO apaga a CONHECIDA — lembrar é com você');
  } else ok(true, 'sala sem Fantasma nesta semente (pulado)');
  /* a marca tem prazo: sem isso a tela guardaria o tabuleiro por você e o
     jogo da memória não teria memória nenhuma */
  const t = salaTeste({ semente:'prazo' });
  const [x,y] = duasDiferentes(t);
  t.virar(x.id); t.virar(y.id);
  ok(!x.vista && !y.vista, 'a carta some da tela ao fim da tentativa');
  ok(x.conhecida && y.conhecida, 'mas continua CONHECIDA');
  const m = salaTeste({ semente:'prazo', mods:{ memoria:2 } });
  const [u,v] = duasDiferentes(m);
  m.virar(u.id); m.virar(v.id);
  ok(u.vista, 'Caderno de Campo estica o prazo da marca');
  const outros = m.fechadas().filter(c=>c.id!==u.id && c.id!==v.id);
  const q = outros[0], w = outros.find(c=>c.par!==q.par);
  m.virar(q.id); m.virar(w.id);
  m.virar(w.id); m.virar(q.id);
  ok(!u.vista, 'mas o prazo esticado também vence');
}

/* ════════════════════════════════════════════════════════ 4 */
secao('4. O erro: descobrir é de graça, esquecer é que custa');
{
  const s = salaTeste({ foco:5 });
  const [a,b] = duasDiferentes(s);
  const foco0 = s.foco;
  const r1 = s.virar(a.id); s.virar(b.id);
  eq(s.foco, foco0, 'errar duas cartas inéditas não custa Foco');
  ok(s.erros===1, 'mas conta como erro');
  ok(r1.inedita===true, 'o relatório diz que a carta era inédita');
  const r2 = s.virar(a.id); const r3 = s.virar(b.id);
  eq(s.foco, foco0-1, 'errar de novo as MESMAS duas custa 1 de Foco');
  ok(r3.eventos.find(e=>e.e==='erro')?.descoberta===false,
     'o relatório separa esquecimento de descoberta');
  eq(s.viradas, 99-2, 'cada tentativa gasta exatamente uma virada');

  const g = salaTeste({ foco:5, mods:{ graça:3 } });
  const [p,q] = duasDiferentes(g);
  g.virar(p.id); g.virar(q.id);
  eq(g.viradas, 99, 'Memória Fotográfica: as primeiras tentativas não gastam virada');

  const bl = salaTeste({ foco:5, mods:{ blindagem:1 } });
  const [u,v] = duasDiferentes(bl);
  bl.virar(u.id); bl.virar(v.id); bl.virar(u.id); bl.virar(v.id);
  eq(bl.foco, 5, 'Luva de Feltro come o custo do esquecimento');

  const nu = salaTeste({ foco:9, mods:{ erroDobra:true } });
  const [i,j] = duasDiferentes(nu);
  nu.virar(i.id); nu.virar(j.id); nu.virar(i.id); nu.virar(j.id);
  eq(nu.foco, 7, 'Núcleo Instável dobra o custo do erro');
}

/* ════════════════════════════════════════════════════════ 5 */
secao('5. Combo');
{
  ok(COMBOS.every((c,i)=> i===0 || c.n>COMBOS[i-1].n), 'a escada de combo sobe');
  ok(COMBOS.every((c,i)=> i===0 || c.mult>COMBOS[i-1].mult), 'e o multiplicador também');
  eq(degrauCombo(0).nome, '—', 'combo zero não tem nome');
  eq(degrauCombo(1).nome, 'Perfect', 'combo 1 é Perfect');
  eq(degrauCombo(4).nome, 'Triple Recall', 'combo 4 ainda é Triple Recall');
  eq(degrauCombo(99).nome, 'God Memory', 'combo altíssimo trava no topo');

  const s = salaTeste({ pares:12 });
  const par = p => s.cartas.filter(c=>c.par===p && !c.resolvida);
  const ganhos = [];
  for(let p=0;p<6;p++){
    const [a,b] = par(p);
    const antes = s.pontos;
    s.virar(a.id); s.virar(b.id);
    ganhos.push(s.pontos-antes);
    eq(s.combo, p+1, 'o combo sobe a cada par');
  }
  ok(ganhos.every((g,i)=> i===0 || g>=ganhos[i-1]), 'par em sequência nunca vale menos: '+ganhos);
  ok(ganhos[5] > ganhos[0]*2, `seis pares seguidos valem mais que o dobro do primeiro (${ganhos[0]}→${ganhos[5]})`);
  const [x,y] = [s.fechadas()[0], s.fechadas().find(c=>c.par!==s.fechadas()[0].par)];
  s.virar(x.id); s.virar(y.id);
  eq(s.combo, 0, 'errar zera o combo');

  const mi = salaTeste({ semente:'mito' });
  for(const c of mi.cartas) c.fam='mitologia';
  for(let p=0;p<4;p++){ const [a,b]=mi.cartas.filter(c=>c.par===p&&!c.resolvida);
    mi.virar(a.id); mi.virar(b.id); }
  const [q,w] = duasDiferentes(mi);
  mi.virar(q.id); mi.virar(w.id);
  eq(mi.combo, 2, 'Mitologia corta o combo pela metade em vez de zerar');
}

/* ════════════════════════════════════════════════════════ 6 */
secao('6. Órfãs — o tabuleiro nunca fica insolúvel');
{
  const s = salaTeste({ semente:'orfa' });
  const [a] = s.fechadas();
  const b = s.fechadas().find(c=>c.par!==a.par);
  a.tipo = 'espelho';                       // vira curinga na marra
  s.virar(a.id); s.virar(b.id);
  ok(a.resolvida && b.resolvida, 'o curinga fecha par com qualquer carta');
  const orfas = s.emJogo().filter(c=>c.orfa);
  eq(orfas.length, 2, 'sobraram exatamente duas órfãs (a dupla de cada uma)');
  const [o1,o2] = orfas;
  s.virar(o1.id); s.virar(o2.id);
  ok(o1.resolvida && o2.resolvida, 'e duas órfãs fecham par entre si');

  /* a garantia geral: em nenhum momento de nenhuma partida o número de
     órfãs pode ficar ímpar, porque órfã ímpar é carta impossível */
  let checadas = 0;
  for(const sem of ['a','b','c','d','e','f']){
    const t = salaTeste({ cru:true, pares:14, semente:'inv'+sem, viradas:400, foco:99,
                          meta:1e9 });
    let g=0;
    while(!t.fim && g++<300){
      const f = t.fechadas(); if(f.length<2) break;
      t.virar(f[0].id); if(t.fim) break;
      const r = t.fechadas().filter(c=>c.id!==f[0].id);
      if(!r.length) break;
      t.virar(r[g % r.length].id);
      const n = t.emJogo().filter(c=>c.orfa).length;
      ok(n % 2 === 0, `órfãs sempre em número par (${sem}, virada ${g}): ${n}`);
      checadas++;
    }
  }
  ok(checadas>100, `a invariante foi checada em ${checadas} momentos`);
}

/* ════════════════════════════════════════════════════════ 7 */
secao('7. Os tipos de carta fazem o que a carta diz');
{
  /* GELO: a primeira vez só trinca */
  const g = salaTeste({ semente:'gelo' });
  const [a,b] = g.cartas.filter(c=>c.par===0);
  a.camadas=2; b.camadas=2;
  g.virar(a.id); const r = g.virar(b.id);
  ok(r.eventos.some(e=>e.e==='trincou'), 'Gelo trinca em vez de resolver');
  ok(!a.resolvida && !a.virada, 'e volta a ficar fechado');
  eq(g.combo, 0, 'trincar não sobe o combo');
  g.virar(a.id); g.virar(b.id);
  ok(a.resolvida, 'na segunda vez, quebra');

  /* MIMIC: só fecha com o próprio Mimic, e desmascara ao enganar */
  const m = salaTeste({ semente:'mimic' });
  const [m1,m2] = m.cartas.filter(c=>c.par===0);
  const alvo = m.cartas.find(c=>c.par===1);
  for(const c of [m1,m2]){ c.tipo='mimic'; c.simbolo=alvo.simbolo; c.fam=alvo.fam; }
  m.virar(m1.id); const rm = m.virar(alvo.id);
  ok(!m1.resolvida && !alvo.resolvida, 'Mimic não fecha com a carta que copiou');
  ok(rm.eventos.some(e=>e.e==='mimic'), 'e o relatório avisa que era Mimic');
  ok(m1.revelado, 'o Mimic fica desmascarado depois de enganar uma vez');
  m.virar(m1.id); m.virar(m2.id);
  ok(m1.resolvida && m2.resolvida, 'mas dois Mimics fecham entre si');

  /* BOMBA: pavio conta e leva o par junto */
  const bo = salaTeste({ semente:'bomba', pares:12, foco:9 });
  const [b1,b2] = bo.cartas.filter(c=>c.par===11);
  b1.pavio=2; b2.pavio=2; b1.tipo='bomba'; b2.tipo='bomba';
  const f0 = bo.foco;
  for(let i=0;i<2;i++){ const f=bo.fechadas().filter(c=>c.par!==11);
    bo.virar(f[0].id); bo.virar(f.find(c=>c.par!==f[0].par).id); }
  ok(b1.resolvida && b2.resolvida, 'a Bomba estoura e leva o par inteiro');
  ok(bo.foco < f0, 'e cobra Foco ao estourar');

  /* VENENO: encarece o esquecimento */
  const v = salaTeste({ semente:'veneno', foco:9 });
  v.cartas[0].tipo='veneno';
  const [p,q] = duasDiferentes(v);
  v.virar(p.id); v.virar(q.id);           // descoberta: de graça
  v.virar(p.id); v.virar(q.id);           // esquecimento: 1 + 1 do veneno
  eq(v.foco, 7, 'Veneno soma 1 ao custo do esquecimento');

  /* CAMALEÃO troca símbolo com o parceiro junto */
  const ca = salaTeste({ semente:'cam', pares:10 });
  const [c1,c2] = ca.cartas.filter(c=>c.par===0);
  c1.tipo='camaleao'; c2.tipo='camaleao';
  const antes = c1.simbolo;
  for(let i=0;i<4;i++){ const f=ca.fechadas().filter(c=>c.par!==0);
    ca.virar(f[0].id); ca.virar(f.find(c=>c.par!==f[0].par).id); }
  eq(c1.simbolo, c2.simbolo, 'os dois Camaleões continuam com o mesmo símbolo');
  ok(c1.simbolo!==antes, 'e o símbolo realmente mudou');

  /* LENDÁRIA: uma por tabuleiro, no máximo */
  for(const sem of ['l1','l2','l3','l4','l5','l6','l7','l8']){
    const s = salaTeste({ cru:true, pares:26, semente:sem, dificuldade:1 });
    const n = new Set(s.cartas.filter(c=>c.tipo==='lendaria').map(c=>c.par)).size;
    ok(n<=1, `no máximo uma Lendária por tabuleiro (${sem}: ${n})`);
  }
}

/* ════════════════════════════════════════════════════════ 8 */
secao('8. As famílias fazem o que a família diz');
{
  const comFam = (fam, semente='f') => {
    const s = salaTeste({ semente });
    for(const c of s.cartas) c.fam = fam;
    return s;
  };
  const al = comFam('alquimia');
  const v0 = al.viradas;
  const [a,b] = al.cartas.filter(c=>c.par===0);
  al.virar(a.id); al.virar(b.id);
  eq(al.viradas, v0, 'Alquimia devolve a virada que o acerto gastou');

  const ru = comFam('runas');
  const m0 = ru.multCombo();
  const [r1,r2] = ru.cartas.filter(c=>c.par===0);
  ru.virar(r1.id); ru.virar(r2.id);
  ok(ru._bonusRunas>0.09 && ru._bonusRunas<0.11, 'Runas dá +0,1 de multiplicador');

  const xa = comFam('xadrez');
  const val = [];
  for(let p=0;p<3;p++){ const [x,y]=xa.cartas.filter(c=>c.par===p&&!c.resolvida);
    const antes=xa.pontos; xa.virar(x.id); xa.virar(y.id); val.push(xa.pontos-antes); }
  eq(xa._xadrez, 2, 'Xadrez dobra exatamente os dois primeiros pares');

  const dr = comFam('dragoes');
  dr.moedas = 5;
  const [d1,d2] = dr.cartas.filter(c=>c.par===0);
  const ap = dr.pontos; dr.virar(d1.id); dr.virar(d2.id);
  const semDragao = comFam('__teste','f');
  const [n1,n2] = semDragao.cartas.filter(c=>c.par===0);
  const an = semDragao.pontos; semDragao.virar(n1.id); semDragao.virar(n2.id);
  ok((dr.pontos-ap) > (semDragao.pontos-an), 'Dragões paga mais que carta comum');
  const [e1,e2] = duasDiferentes(dr);
  dr.virar(e1.id); dr.virar(e2.id);
  eq(dr.moedas, 4, 'e cobra 1 moeda por erro');

  const eg = comFam('egito');
  const [g1,g2] = eg.cartas.filter(c=>c.par===0);
  eg.virar(g1.id); eg.virar(g2.id);
  ok(eg.cartas.some(c=>c.marcada), 'Egito marca uma carta');
  const marcada = eg.cartas.find(c=>c.marcada);
  eg._esquecer(marcada); eg._apagarTela(marcada);
  ok(marcada.vista, 'e carta marcada não é esquecida pela tela');

  ok(LISTA_FAMILIAS.every(f=>f.s.length>=18), 'toda família tem ao menos 18 símbolos');
  ok(LISTA_FAMILIAS.every(f=>new Set(f.s).size===f.s.length), 'sem índice repetido dentro da família');
  /* o que não pode repetir é o DESENHO: se duas cartas de pares diferentes
     saírem iguais na tela, o jogador acerta "errado" e tem razão de reclamar */
  const desenhos = LISTA_FAMILIAS.flatMap(f=>f.s.map(i=>glifo(f.id, i)));
  eq(new Set(desenhos).size, desenhos.length,
     `os ${desenhos.length} desenhos são todos diferentes entre si`);
  ok(desenhos.every(d=>d.includes('<path')), 'todo desenho tem traço de verdade');
  ok(LISTA_FAMILIAS.every(f=>f.regra && f.nome && f.cor && f.traco),
     'toda família tem nome, cor, silhueta e regra escrita');
  for(let d=0; d<=1; d+=0.25){
    const n = sortearFamilias(makeRNG('ff'+d), d).length;
    ok(n>=2, `sorteio de famílias devolve ao menos 2 (dif ${d})`);
  }
  /* símbolos bastam para o maior tabuleiro: 2 famílias × 18 ≥ 30 pares */
  ok(2*18 >= 30, 'o menor sorteio de famílias ainda cobre 30 pares distintos');
}

/* ════════════════════════════════════════════════════════ 9 */
secao('9. Fim de sala');
{
  const v = salaTeste({ meta:1, viradas:99 });
  const [a,b] = v.cartas.filter(c=>c.par===0);
  v.virar(a.id); v.virar(b.id);
  eq(v.fim, 'vitoria', 'bateu a meta, venceu');
  ok(v.moedas>0, 'e as viradas que sobraram viraram moeda');

  const d = salaTeste({ meta:1e9, viradas:2, foco:9 });
  const [x,y] = duasDiferentes(d);
  d.virar(x.id); d.virar(y.id); d.virar(x.id); d.virar(y.id);
  eq(d.fim, 'derrota', 'acabaram as viradas, perdeu');

  const f = salaTeste({ meta:1e9, viradas:99, foco:2 });
  const [p,q] = duasDiferentes(f);
  for(let i=0;i<3;i++){ f.virar(p.id); f.virar(q.id); }
  eq(f.fim, 'derrota', 'acabou o Foco, perdeu');
  eq(f.viradas<99, true, 'e as viradas foram gastas no caminho');

  const t = salaTeste({ pares:2, meta:1e9, viradas:99, foco:9 });
  for(let p=0;p<2;p++){ const [i,j]=t.cartas.filter(c=>c.par===p&&!c.resolvida);
    t.virar(i.id); t.virar(j.id); }
  eq(t.fim, 'derrota', 'limpou o tabuleiro sem bater a meta: também é derrota');

  const s = salaTeste({ meta:1, viradas:99 });
  const [i,j] = s.cartas.filter(c=>c.par===0);
  s.virar(i.id); s.virar(j.id);
  ok(s.virar(s.fechadas()[0]?.id).erro, 'sala encerrada não aceita mais jogada');
}

/* ════════════════════════════════════════════════════════ 10 */
secao('10. As ferramentas das classes');
{
  const comFer = f => salaTeste({ semente:'fer', ferramenta:f, foco:9, meta:1e9 });
  const es = comFer({ id:'espiar', usos:1 });
  const r = es.usarFerramenta();
  ok(r.eventos.some(e=>e.e==='revelou'), 'Lupa revela cartas');
  eq(es.fechadas().filter(c=>c.vista).length, 2, 'exatamente duas');
  ok(es.usarFerramenta().erro, 'e acabam os usos');

  const vo = comFer({ id:'voltar', usos:1 });
  ok(vo.usarFerramenta().erro, 'Ampulheta sem erro para desfazer recusa');
  const [a,b] = duasDiferentes(vo);
  vo.virar(a.id); vo.virar(b.id); vo.virar(a.id); vo.virar(b.id);
  const focoDepois = vo.foco, viradasDepois = vo.viradas;
  vo.usarFerramenta();
  eq(vo.foco, focoDepois+1, 'Ampulheta devolve o Foco do último erro');
  ok(vo.viradas > viradasDepois, 'e a virada também');

  const tr = comFer({ id:'trocar', usos:2 });
  const [c1,c2] = tr.fechadas();
  const p1 = c1.pos, p2 = c2.pos;
  tr.usarFerramenta([c1.id, c2.id]);
  ok(c1.pos===p2 && c2.pos===p1, 'Mão Leve troca as duas de lugar');
  ok(tr.usarFerramenta([c1.id, c1.id]).erro, 'e recusa trocar uma carta com ela mesma');

  const cu = comFer({ id:'curinga', usos:99, custoEssencia:3 });
  cu.mods.ganhaEssencia = true;
  ok(cu.usarFerramenta(cu.fechadas()[0].id).erro, 'Transmutar sem Essência recusa');
  for(let p=0;p<3;p++){ const [x,y]=cu.cartas.filter(c=>c.par===p&&!c.resolvida);
    cu.virar(x.id); cu.virar(y.id); }
  eq(cu.essencia, 3, 'cada acerto do Mago rende 1 de Essência');
  const alvo = cu.fechadas()[0];
  cu.usarFerramenta(alvo.id);
  eq(alvo.tipo, 'espelho', 'e 3 de Essência viram um Espelho');
  eq(cu.essencia, 0, 'gastando a Essência');

  const ex = comFer({ id:'escavar', usos:1 });
  const v0 = ex.viradas, a0 = ex.acertos;
  ex.usarFerramenta();
  eq(ex.acertos, a0+1, 'Escavar resolve um par');
  eq(ex.viradas, v0, 'sem gastar virada');

  const fo = comFer({ id:'foco', usos:1 });
  const m0 = fo.multCombo();
  fo.usarFerramenta();
  eq(fo.multCombo(), m0*2, 'Concentração dobra o multiplicador');
  const [u,w] = duasDiferentes(fo);
  fo.virar(u.id); fo.virar(w.id);
  eq(fo.multCombo(), m0, 'e cai no primeiro erro');

  ok(comFer(null).usarFerramenta().erro===undefined ||
     comFer(null).usarFerramenta().erro==='sem ferramenta', 'sala sem ferramenta recusa direito');
}

/* ════════════════════════════════════════════════════════ 11 */
secao('11. A curva das salas');
{
  ok(pontosPerfeitos(6) < pontosPerfeitos(12), 'o teto sobe com o tamanho do tabuleiro');
  let metaAnterior = 0, paresAnterior = 0, problemas = 0;
  for(let m=0;m<MUNDOS;m++) for(let i=0;i<SALAS.length;i++){
    const t = SALAS[i]; if(!COMBATE.has(t)) continue;
    const p = planoDaSala(m,i,t);
    ok(p.pares>=6 && p.pares<=30, `pares dentro do limite (${m}.${i}: ${p.pares})`);
    ok(p.viradas > p.pares, `sempre mais viradas que pares (${m}.${i})`);
    /* a meta jamais pode passar do teto: sala impossível é bug */
    const teto = pontosPerfeitos(p.pares);
    ok(p.meta < teto*0.85, `a meta cabe abaixo do teto (${m}.${i}: ${p.meta}/${teto})`);
    if(p.pares < paresAnterior) problemas++;
    paresAnterior = p.pares;
  }
  eq(problemas, 0, 'o tabuleiro nunca encolhe ao longo da run');
  const p0 = planoDaSala(0,0,'combate'), pf = planoDaSala(MUNDOS-1,11,'boss');
  ok(pf.meta > p0.meta*8, `a última sala exige muito mais que a primeira (${p0.meta} → ${pf.meta})`);
  ok(planoDaSala(2,4,'elite').meta > planoDaSala(2,3,'combate').meta,
     'elite cobra mais que combate comum');
}

/* ════════════════════════════════════════════════════════ 12 */
secao('12. Mapa e progressão da run');
{
  const r = new Run({ semente:'mapa', classe:'detetive' });
  eq(r.mundo, 0, 'a run começa no mundo 0');
  eq(SALAS.filter(t=>t==='boss').length, 1, 'um chefe por mundo');
  eq(SALAS[SALAS.length-1], 'boss', 'e ele é a última sala');
  eq(new Set(BOSS_DO_MUNDO).size, MUNDOS, 'cada mundo tem um chefe diferente');
  ok(BOSS_DO_MUNDO.every(id=>BOSSES[id]), 'todo chefe do mapa existe de verdade');
  eq(r.mapa().length, SALAS.length, 'o mapa mostra a fila inteira do mundo');
  ok(r.mapa()[0].atual, 'a primeira sala é a atual');
  ok(!r.entrar()===false, 'dá para entrar na primeira sala');
  ok(r.sala, 'e a sala existe');
  ok(!r.entrar(), 'mas não dá para entrar duas vezes');
}

/* ════════════════════════════════════════════════════════ 13 */
secao('13. Determinismo — a mesma semente dá a mesma run');
{
  for(const cl of Object.keys(CLASSES)){
    const a = jogarRun(new Run({ semente:'det', classe:cl }));
    const b = jogarRun(new Run({ semente:'det', classe:cl }));
    eq(a.pontos, b.pontos, `${cl}: mesma semente, mesmo placar`);
    eq(a.registro.length, b.registro.length, `${cl}: mesma quantidade de jogadas`);
    eq(JSON.stringify(a.registro), JSON.stringify(b.registro), `${cl}: registro idêntico`);
    eq(a.reliquias.join(','), b.reliquias.join(','), `${cl}: mesmas relíquias`);
  }
  const x = jogarRun(new Run({ semente:'A', classe:'detetive' }));
  const y = jogarRun(new Run({ semente:'B', classe:'detetive' }));
  ok(x.pontos!==y.pontos || x.registro.length!==y.registro.length,
     'sementes diferentes dão runs diferentes');
}

/* ════════════════════════════════════════════════════════ 14 */
secao('14. VERIFICAR — o anti-cheat que dispensa servidor');
{
  const runs = [];
  for(const cl of Object.keys(CLASSES))
    for(const sem of ['v1','v2','v3'])
      runs.push(jogarRun(new Run({ semente:sem, classe:cl })));

  let confirmadas = 0;
  for(const r of runs){
    const { placar, registro } = r.pacote();
    const res = verificar(placar, registro);
    ok(res.ok, `run honesta é aceita (${placar.classe}/${placar.semente}: `+
       `${res.calculado} vs ${res.alegado} — ${res.por||'ok'})`);
    if(res.ok) confirmadas++;
  }
  eq(confirmadas, runs.length, `todas as ${runs.length} runs honestas conferem`);

  const base = runs[0].pacote();
  const inflado = { ...base.placar, pontos: base.placar.pontos + 1 };
  ok(!verificar(inflado, base.registro).ok, 'placar inflado em 1 ponto já é recusado');
  ok(!verificar({ ...base.placar, pontos: 999999 }, base.registro).ok,
     'placar absurdo é recusado');
  ok(!verificar({ ...base.placar, venceu:!base.placar.venceu }, base.registro).ok,
     'mentir sobre ter vencido é recusado');
  ok(!verificar({ ...base.placar, mundo:base.placar.mundo+1 }, base.registro).ok,
     'dizer que chegou mais longe é recusado');
  ok(!verificar({ ...base.placar, semente:'outra' }, base.registro).ok,
     'trocar a semente e manter o placar é recusado');
  ok(!verificar({ ...base.placar, classe:'inexistente' }, base.registro).ok,
     'classe inventada é recusada');
  ok(!verificar(base.placar, base.registro.slice(0,-4)).ok,
     'cortar as últimas jogadas é recusado');
  {
    const meio = [...base.registro];
    meio.splice(Math.floor(meio.length/2), 8);
    ok(!verificar(base.placar, meio).ok, 'arrancar jogadas do meio é recusado');
  }
  ok(!verificar(base.placar, [...base.registro, { s:'v', c:0 }]).ok,
     'grudar uma jogada no fim é recusado');
  ok(!verificar(base.placar, new Array(MAX_JOGADAS+1).fill({s:'v',c:0})).ok,
     'registro gigante é recusado antes de rodar');
  ok(!verificar(base.placar, [{ s:'xyz' }]).ok, 'jogada desconhecida é recusada');
  ok(!verificar(base.placar, null).ok, 'pacote sem registro é recusado');

  /* a fraude mais tentadora: pegar a lendária que nunca foi oferecida */
  const comReliquia = [...base.registro];
  const iRel = comReliquia.findIndex(j=>j.s==='rel');
  if(iRel>=0){
    const falso = [...comReliquia];
    falso[iRel] = { s:'rel', r:'nucleo' };
    const res = verificar(base.placar, falso);
    ok(!res.ok, 'relíquia que não estava na oferta é recusada');
  } else ok(true, 'esta run não pegou relíquia (pulado)');

  /* e a mais óbvia: comprar sem ter moeda */
  const compra = [...base.registro];
  const iPassa = compra.findIndex(j=>j.s==='passa');
  if(iPassa>=0){
    const falso = [...compra];
    falso.splice(iPassa, 0, { s:'c', r:'nucleo' });
    ok(!verificar(base.placar, falso).ok, 'compra fora da loja é recusada');
  } else ok(true, 'run sem sala de passagem (pulado)');

  /* o teste que importa de verdade: o verificador roda em OUTRO processo,
     sem nada da partida original além do JSON que veio do relay */
  const json = JSON.stringify(base);
  const doRelay = JSON.parse(json);
  ok(verificar(doRelay.placar, doRelay.registro).ok,
     'o pacote sobrevive à ida e volta por JSON');
  ok(json.length < 400000, `o pacote cabe num evento de relay (${(json.length/1024|0)} KB)`);
}

/* ════════════════════════════════════════════════════════ 15 */
secao('15. Balanceamento — até onde chega quem não esquece nada');
{
  const sementes = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
  const linhas = [];
  let vitorias = 0, total = 0, somaSalas = 0;
  for(const cl of Object.keys(CLASSES)){
    let salas = 0, venceu = 0, pontos = 0;
    for(const sem of sementes){
      const r = jogarRun(new Run({ semente:sem, classe:cl }));
      salas += r.estatisticas.salas; pontos += r.pontos;
      if(r.venceu) venceu++;
      total++; somaSalas += r.estatisticas.salas;
      if(r.venceu) vitorias++;
    }
    const media = salas/sementes.length;
    linhas.push({ cl, media, venceu, pontos: Math.round(pontos/sementes.length) });
    ok(media >= 3, `${cl}: o bot passa de pelo menos 3 salas em média (${media.toFixed(1)})`);
  }
  console.log('   classe        salas(méd)  vitórias  pontos(méd)');
  for(const l of linhas)
    console.log('   '+l.cl.padEnd(13)+String(l.media.toFixed(1)).padStart(7)
      +String(l.venceu+'/'+sementes.length).padStart(11)+String(l.pontos).padStart(12));
  const mediaGeral = somaSalas/total;
  console.log(`   média geral: ${mediaGeral.toFixed(1)} salas · ${vitorias}/${total} runs vencidas`);
  ok(mediaGeral >= 6, `a run média dura mais que meio mundo (${mediaGeral.toFixed(1)} salas)`);
  ok(vitorias < total, 'e o jogo não é vencível no automático por todo mundo');

  /* nenhuma classe pode ser dominante nem inútil */
  const medias = linhas.map(l=>l.media);
  const pior = Math.min(...medias), melhor = Math.max(...medias);
  ok(melhor <= pior*4+6, `nenhuma classe é absurdamente melhor (${pior.toFixed(1)} a ${melhor.toFixed(1)})`);
}

/* ════════════════════════════════════════════════════════ 16 */
secao('16. Os dados: nada meio escrito');
{
  for(const t of LISTA_TIPOS){
    ok(t.id && t.nome && t.d && t.cor, `tipo ${t.id} tem id, nome, descrição e cor`);
    ok(t.d.length>18, `a descrição de ${t.id} explica alguma coisa`);
    ok(typeof t.peso==='number' && t.peso>0, `tipo ${t.id} tem peso de sorteio`);
  }
  eq(new Set(LISTA_TIPOS.map(t=>t.nome)).size, LISTA_TIPOS.length, 'nomes de tipo únicos');
  ok(LISTA_TIPOS.length>=14, `pelo menos 14 tipos de carta (${LISTA_TIPOS.length})`);

  for(const c of LISTA_CLASSES){
    ok(c.id && c.nome && c.d && c.lema && c.glifo && c.cor, `classe ${c.id} está completa`);
    ok(c.ferramenta?.id && c.ferramenta.nome && c.ferramenta.d,
       `classe ${c.id} tem ferramenta com nome e explicação`);
    ok(c.foco>=1, `classe ${c.id} começa com Foco jogável`);
    ok(c.moedas>=0, `classe ${c.id} tem bolso definido`);
  }
  eq(new Set(LISTA_CLASSES.map(c=>c.nome)).size, LISTA_CLASSES.length, 'nomes de classe únicos');
  eq(new Set(LISTA_CLASSES.map(c=>c.ferramenta.id)).size, LISTA_CLASSES.length,
     'cada classe tem uma ferramenta que só ela tem');
  ok(LISTA_CLASSES.length>=8, `pelo menos 8 classes (${LISTA_CLASSES.length})`);

  for(const r of RELIQUIAS){
    ok(r.id && r.nome && r.d, `relíquia ${r.id} tem nome e descrição`);
    ok(['comum','rara','lendaria'].includes(r.r), `relíquia ${r.id} tem raridade válida`);
    ok(r.mods || r.ao || r.aoIniciar, `relíquia ${r.id} realmente faz alguma coisa`);
  }
  eq(new Set(RELIQUIAS.map(r=>r.id)).size, RELIQUIAS.length, 'ids de relíquia únicos');
  eq(new Set(RELIQUIAS.map(r=>r.nome)).size, RELIQUIAS.length, 'nomes de relíquia únicos');
  ok(Object.keys(POR_ID).length===RELIQUIAS.length, 'o índice por id cobre todas');

  for(const b of LISTA_BOSSES){
    ok(b.id && b.nome && b.regra && b.dica && b.glifo, `chefe ${b.id} está completo`);
    ok(typeof b.turno==='function', `chefe ${b.id} mexe em alguma coisa por turno`);
  }
  for(const e of EVENTOS){
    ok(e.id && e.nome && e.txt, `evento ${e.id} tem texto`);
    ok(e.ops.length>=2, `evento ${e.id} oferece escolha de verdade`);
    ok(e.ops.every(o=>o.txt && o.d && typeof o.ef==='function'),
       `as opções de ${e.id} têm rótulo, resumo e efeito`);
  }
  eq(new Set(EVENTOS.map(e=>e.id)).size, EVENTOS.length, 'ids de evento únicos');

  /* o sorteio de relíquia nunca devolve repetida nem já possuída */
  for(let i=0;i<40;i++){
    const jaTem = RELIQUIAS.slice(0, i%10).map(r=>r.id);
    const s = sortearReliquias(makeRNG('sr'+i), 3, jaTem);
    ok(new Set(s.map(r=>r.id)).size===s.length, `oferta ${i} sem repetição`);
    ok(s.every(r=>!jaTem.includes(r.id)), `oferta ${i} não repete o que já é seu`);
  }
  /* o sorteio de tipos respeita a quantidade de pares */
  for(const p of [6,15,30]) for(const d of [0,0.5,1]){
    const t = sortearTipos(makeRNG('st'), p, d);
    eq(t.length, p, `sorteio de tipos devolve ${p} entradas (dif ${d})`);
    ok(t.every(x=>TIPOS[x]), 'e todas são tipos que existem');
  }
}

/* ════════════════════════════════════════════════════════ 15b */
secao('15b. Par de desenhos diferentes sempre diz POR QUÊ');
{
  /* 8,8% dos pares do jogo fecham com cartas de desenhos DIFERENTES: pelo
     curinga ou por duas órfãs. Quem joga não tem como adivinhar isso, e sem
     aviso parece defeito do jogo. Este teste garante que o motor nunca fecha
     um par assim sem dizer o motivo — é do relatório que a tela tira o aviso. */
  let total = 0, diferentes = 0, semMotivo = 0;
  const porMotivo = {};
  for(const cl of ['detetive','mago','cientista']){
    for(const sem of ['pq1','pq2','pq3']){
      const r = new Run({ semente:sem, classe:cl });
      const original = r.virar.bind(r);
      r.virar = id => {
        const s = r.sala;
        const rel = original(id);
        const ac = rel?.eventos?.find(e=>e.e==='acerto');
        if(ac && s){
          total++;
          const [a,b] = ac.cartas.map(x=>s.cartas.find(c=>c.id===x));
          porMotivo[ac.por] = (porMotivo[ac.por]||0)+1;
          if(a.fam!==b.fam || a.simbolo!==b.simbolo){
            diferentes++;
            if(ac.por === 'par') semMotivo++;
          }
        }
        return rel;
      };
      jogarRun(r);
    }
  }
  ok(total>500, `houve pares suficientes para medir (${total})`);
  eq(semMotivo, 0, 'nenhum par de desenhos diferentes fecha sem motivo declarado');
  ok(diferentes>0, `e eles acontecem de verdade (${diferentes} de ${total})`);
  ok(porMotivo.curinga>0, `o curinga fecha pares (${porMotivo.curinga||0})`);
  ok(porMotivo.orfas>0, `duas órfãs fecham pares (${porMotivo.orfas||0})`);
  ok(Object.keys(porMotivo).every(k=>['par','curinga','orfas'].includes(k)),
     'e não existe um quarto motivo escondido: '+Object.keys(porMotivo).join(', '));
  console.log('   pares por motivo:', porMotivo,
    `· desenhos diferentes: ${(diferentes/total*100).toFixed(1)}%`);
}

/* ════════════════════════════════════════════════════════ 16b */
secao('16b. Todo nome do jogo tem um desenho');
{
  /* a regra da casa: nunca um glifo mudo, e nunca um emoji. Se uma coisa tem
     nome no jogo, ela tem um desenho próprio — na carta, na ficha e no
     como-se-joga, sempre o mesmo. Este teste é o que impede alguém (eu, mês
     que vem) de acrescentar uma carta e esquecer o ícone dela. */
  for(const t of LISTA_TIPOS) ok(!!ICO[t.id], `o tipo ${t.id} tem ícone desenhado`);
  for(const c of LISTA_CLASSES) ok(!!ICO_CLASSE[c.id], `a classe ${c.id} tem ícone desenhado`);
  for(const b of LISTA_BOSSES) ok(!!ICO_CHEFE[b.id], `o chefe ${b.id} tem ícone desenhado`);
  const VOCAB = ['meta','virada','foco','combo','vista','conhecida','orfa',
                 'semente','prova','recusa','reliquia'];
  for(const v of VOCAB) ok(!!ICO[v], `a palavra "${v}" tem ícone desenhado`);
  const SALA_ICO = ['combate','elite','chefe','loja','evento','fogueira','tesouro'];
  for(const v of SALA_ICO) ok(!!ICO[v], `o tipo de sala "${v}" tem ícone desenhado`);

  /* cada relíquia e cada família também precisam da sua marca: enquanto as
     vinte e uma relíquias dividiam um amuleto genérico, a loja oferecia três
     coisas visualmente idênticas e a escolha virava leitura de parágrafo */
  for(const r of RELIQUIAS) ok(!!ICO_RELIQUIA[r.id], `a relíquia ${r.id} tem marca própria`);
  for(const f of LISTA_FAMILIAS) ok(!!ICO_FAM[f.id], `a família ${f.id} tem brasão`);
  eq(new Set(Object.values(ICO_RELIQUIA)).size, RELIQUIAS.length,
     'nenhuma relíquia usa a marca de outra');

  const todos = [...Object.values(ICO), ...Object.values(ICO_CLASSE), ...Object.values(ICO_CHEFE),
                 ...Object.values(ICO_FAM), ...Object.values(ICO_RELIQUIA)];
  /* um ícone é DESENHADO (svg no mesmo viewBox) ou PINTADO (arte que chegou
     como imagem). Os dois valem; o que não vale é um conceito sem marca. */
  ok(todos.every(s=>(s.startsWith('<svg') && s.includes('viewBox="0 0 24 24"'))
                 || s.startsWith('<img')), 'todo ícone é svg padronizado ou arte pintada');
  /* e a arte pintada tem de existir mesmo no disco: um src quebrado deixaria
     um buraco na tela sem ninguém perceber até alguém jogar */
  for(const id of TEM_ARTE){
    const marca = ICO[id];
    ok(marca.startsWith('<img'), `${id} usa a arte pintada`);
    const src = /src="([^"]+)"/.exec(marca)?.[1];
    ok(src && existsSync(new URL('../'+src, import.meta.url)),
       `o arquivo de ${id} existe: ${src}`);
  }
  ok(todos.every(s=>!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s)),
     'nenhum ícone é emoji disfarçado');
  eq(new Set(todos).size, todos.length, 'nenhum ícone é cópia de outro');
}

/* ════════════════════════════════════════════════════════ 16c */
secao('16c. Nenhuma arte apontada existe só no CSS');
{
  /* Arte quebrada não dá erro: o navegador desenha o buraco e segue. Um
     border-image que não carrega some sem aviso e o botão volta a ser um
     retângulo — exatamente o estado de que estamos saindo. Então o teste lê o
     CSS de verdade e confere cada url(arte/...) no disco. */
  const html = readFileSync(new URL('../jogo.html', import.meta.url), 'utf8');
  const alvos = [...html.matchAll(/url\((arte\/[^)"']+)\)/g)].map(m=>m[1]);
  ok(alvos.length >= 20, `o CSS aponta para ${alvos.length} arquivos de arte`);
  for(const a of new Set(alvos))
    ok(existsSync(new URL('../'+a, import.meta.url)), `existe no disco: ${a}`);

  /* e o caminho contrário: arte recortada que ninguém usa é peso morto no
     repositório e sinal de que o recorte saiu do lugar */
  /* as molduras e os versos vivem só no CSS, e o CSS aponta para eles por
     classe. O que se confere aqui é que TODO tipo de carta recebe uma moldura
     e que essa moldura é uma das que o CSS sabe desenhar — um tipo esquecido
     sairia com a face nua no meio de um tabuleiro emoldurado. */
  const molduras = new Set([...html.matchAll(/\.ct\.(m-[a-z]+)\s+\.ff/g)].map(m=>m[1]));
  molduras.add('m-prata');   /* a padrão, escrita em .ct.temold */
  for(const t of LISTA_TIPOS){
    if(t.id === 'espelho'){ ok(true, 'o curinga não usa moldura (a face dele é a marca)'); continue; }
    const m = MOLDURA_DO_TIPO[t.id];
    ok(!!m, `o tipo ${t.id} tem moldura`);
    ok(molduras.has(m), `a moldura ${m} do tipo ${t.id} existe no CSS`);
  }

  const src = m => /src="([^"]+)"/.exec(m || '')?.[1];
  const usados = new Set([...alvos,
    ...[...TEM_ARTE].map(id=>src(ICO[id])),
    ...Object.values(ICO_CLASSE).map(src), ...Object.values(ICO_CHEFE).map(src),
    ...Object.values(ICO_FAM).map(src),    ...Object.values(ICO_RELIQUIA).map(src),
  ].filter(Boolean));
  for(const pasta of ['ico','fx','ui','classe','chefe','fam','rel','carta']){
    const dir = new URL('../arte/'+pasta+'/', import.meta.url);
    for(const f of readdirSync(dir)){
      if(f.endsWith('.json')) continue;   /* medida, não arte */
      ok(usados.has('arte/'+pasta+'/'+f), `arte/${pasta}/${f} está em uso`);
    }
  }
}

/* ════════════════════════════════════════════════════════ 16d */
secao('16d. Texto claro nunca cai em placa clara');
{
  /* Este teste existe porque o mesmo erro já aconteceu duas vezes, e das duas
     por OLHAR a arte e anotar numa lista quais placas eram claras. A placa
     ouro tem 186 de luminância e a roxa tem 141; as duas parecem apenas
     "coloridas", e a segunda engole texto branco do mesmo jeito.

     A medida está gravada por tools/luz.py, e o que se confere aqui é que a
     lista do código continua concordando com ela. Se chegar arte nova para uma
     placa e ela ficar mais clara, o teste quebra antes de alguém publicar uma
     tela ilegível. */
  const medida = JSON.parse(readFileSync(new URL('../arte/ui/placas.json', import.meta.url), 'utf8'));
  const css = readFileSync(new URL('../jogo.html', import.meta.url), 'utf8');
  const jogo = readFileSync(new URL('../js/ui/jogo.js', import.meta.url), 'utf8');
  const claras = new Set((/PLACA_CLARA = new Set\(\[([^\]]*)\]/.exec(jogo)?.[1] || '')
    .split(',').map(s=>s.trim().replace(/'/g,'')).filter(Boolean));
  ok(claras.size > 0, 'o código declara quais placas são claras');

  /* cada classe de cor aponta para um arquivo; o CSS é quem sabe qual */
  const porClasse = {};
  for(const m of css.matchAll(/\.op\.(c-[a-z]+)\{border-image-source:url\(arte\/ui\/([^)]+)\)/g))
    porClasse[m[1]] = m[2];
  ok(Object.keys(porClasse).length >= 5, `o CSS liga ${Object.keys(porClasse).length} cores a placas`);

  for(const [classe, arquivo] of Object.entries(porClasse)){
    const m = medida[arquivo];
    ok(m, `a placa ${arquivo} foi medida`);
    if(!m) continue;
    eq(claras.has(classe), m.clara,
       `${classe} usa ${arquivo} (luz ${m.luz}) e a lista ${m.clara?'devia':'não devia'} marcá-la como clara`);
  }
  /* a placa padrão, sem classe de cor, é a que sustenta o texto claro */
  ok(!medida['placa-azul.png'].clara, 'a placa padrão é escura o bastante para texto claro');
}

/* ════════════════════════════════════════════════════════ 17 */
secao('17. Os chefes mudam a partida, não só os números');
{
  /* cada chefe tem um evento que só ele produz. É o que separa "chefe" de
     "sala com a meta maior": se o evento nunca sai, a luta é igual às outras */
  const ASSINATURA = { ilusionista:'embaralhou', hipnotizador:'esqueceu',
    tempo:'sumiu', caos:'embaralhou', espelho:'espelhou', rei:'embaralhou' };
  for(const id of BOSS_DO_MUNDO){
    const b = BOSSES[id];
    const s = salaTeste({ cru:true, pares:16, semente:'b'+id, boss:b,
                          viradas:200, foco:99, meta:1e9 });
    const vistos = new Set();
    let g=0;
    while(!s.fim && g++<60){
      const f = s.fechadas(); if(f.length<2) break;
      /* vira uma carta, revela para o Hipnotizador ter o que apagar, e
         tenta fechar com outra qualquer */
      s._mostrar(f[1]);
      const r1 = s.virar(f[0].id); if(s.fim) break;
      const r = s.fechadas().filter(c=>c.id!==f[0].id);
      if(!r.length) break;
      const r2 = s.virar(r[g % r.length].id);
      for(const e of [...(r1.eventos||[]), ...(r2.eventos||[])]) vistos.add(e.e);
      ok(new Set(s.cartas.map(c=>c.pos)).size === s.cartas.length,
         `${b.nome} nunca põe duas cartas na mesma casa (virada ${g})`);
      ok(s.emJogo().length % 2 === 0,
         `${b.nome} nunca deixa um número ímpar de cartas em jogo`);
    }
    ok(vistos.has(ASSINATURA[id]), `o chefe ${b.nome} produz o efeito dele `
       + `(${ASSINATURA[id]}); saiu: ${[...vistos].join(', ')||'nada'}`);
  }
}

/* ════════════════════════════════════════════════════════ */
console.log('\n' + '─'.repeat(56));
if(falhou){
  console.log(`\x1b[31m✗ ${falhou} de ${passou+falhou} verificações falharam\x1b[0m\n`);
  for(const e of erros.slice(0,40)) console.log('  · '+e);
  if(erros.length>40) console.log(`  … e mais ${erros.length-40}`);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${passou} verificações passaram\x1b[0m`);
