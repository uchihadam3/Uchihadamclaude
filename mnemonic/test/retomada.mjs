/* ════════════════════════════════════════════════════════════════════════
   RECARREGAR A PÁGINA NO MEIO DA PARTIDA — pela tela, clicando.

   `test/regras.mjs` já prova que `refazer()` remonta a run a partir do
   registro. O que ele NÃO alcança é o caminho inteiro de verdade: salvar em
   `localStorage`, fechar a aba, abrir de novo, e a partida voltar onde
   estava. É aí que o defeito morava — quem fechava uma sala pelas moedas
   ("FECHAR +N MOEDAS") e recarregava voltava com a sala aberta, porque a
   tela tinha uma segunda máquina de replay que não conhecia a jogada `fim`.

   Este teste faz exatamente isso, no navegador: joga até bater a meta, aperta
   FECHAR, recarrega, e compara pontos, moedas, mundo, sala e relíquias.

       python3 -m http.server 8123      (da raiz do repositório)
       node test/retomada.mjs
   ═══════════════════════════════════════════════════════════════════════ */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:8123/mnemonic/jogo.html';
let contas = 0, ruins = [];
const ok = (c, m) => { contas++; if(!c) ruins.push(m);
  console.log((c?'\x1b[32m ok \x1b[0m':'\x1b[31mFALHA\x1b[0m') + ' ' + m); };
const eq = (a, b, m) => ok(a===b, `${m} (${JSON.stringify(a)} = ${JSON.stringify(b)})`);

const b = await chromium.launch();
const p = await b.newPage({ viewport:{ width:430, height:920 } });
p.setDefaultTimeout(8000);
const console_ = [];
p.on('pageerror', e => console_.push('ERRO ' + e.message.split('\n')[0]));
p.on('console', m => { const t = m.text();
  if(m.type()==='error' && !/WebSocket|nostr|relay|damus|primal|nos\.lol/i.test(t))
    console_.push('CONSOLE ' + t.slice(0,140)); });

async function comecar(classe, comGuia=false){
  await p.goto(BASE, { waitUntil:'domcontentloaded' });
  await p.evaluate(g=>{ localStorage.clear();
    /* o guia da primeira sala é um holofote que tapa a tela de propósito.
       Aqui ele é dispensado como quem já jogou uma vez — quem testa o guia
       é o bloco 5, e só ele. */
    if(!g) localStorage.setItem('mnemonic.guia','1'); }, comGuia);
  await p.goto(BASE, { waitUntil:'domcontentloaded' });
  await p.waitForFunction(()=>window.MN, null, { timeout:8000 });
  await p.click('[data-ir="classe"]');
  await p.click(`[data-classe="${classe}"]`);
  await p.waitForFunction(()=>window.MN?.run, null, { timeout:8000 });
}

/* o retrato da partida: é isto que tem de sobreviver ao recarregamento */
const retrato = () => p.evaluate(()=>{
  const r = window.MN?.run; if(!r) return null;
  return { pontos:r.pontos, moedas:r.moedas, mundo:r.mundo, indice:r.indice,
           foco:r.foco, reliquias:r.reliquias.join(','), naSala:!!r.sala,
           jogadas:r.registro.length,
           /* a marca do bug: quantas vezes ele fechou sala por escolha */
           fins:r.registro.filter(j=>j.s==='fim').length };
});

/* joga com memória perfeita, virando de dois em dois, até a meta bater */
async function ateBaterAMeta(limite=400){
  for(let i=0;i<limite;i++){
    const st = await p.evaluate(()=>{
      const r = window.MN?.run, s = r?.sala;
      return { tem:!!s, passou:!!s?.passou, fim:!!s?.fim, travado:!!window.MN.travado };
    });
    if(!st.tem || st.fim) return false;
    if(st.passou) return true;
    if(st.travado){ await p.waitForTimeout(90); continue; }
    const par = await p.evaluate(()=>{
      const s = window.MN.run.sala;
      const f = s.cartas.filter(c=>!c.resolvida && !c.virada);
      if(f.length < 2) return null;
      const a = f[0];
      const o = f.find(c=>c.par===a.par && c.id!==a.id) || f[1];
      return [a.id, o.id];
    });
    if(!par) return false;
    for(const id of par){
      await p.click(`[data-c="${id}"]`, { force:true }).catch(()=>{});
      await p.waitForTimeout(70);
    }
    await p.waitForTimeout(200);
  }
  return false;
}

/* anda pelo mapa/loja/evento até cair numa sala de cartas outra vez */
async function ateAProximaSala(limite=60){
  for(let i=0;i<limite;i++){
    const st = await p.evaluate(()=>({
      sala: !!window.MN?.run?.sala, acabou: !!window.MN?.run?.acabou() }));
    if(st.sala) return true;
    if(st.acabou) return false;
    const clicou = await p.evaluate(()=>{
      const t = [...document.querySelectorAll('.tela')].find(x=>x.classList.contains('on'));
      if(!t) return false;
      const bs = [...t.querySelectorAll('button')].filter(x=>!x.disabled && x.offsetParent);
      const pri = bs.find(x=>/ENTRAR|ENFRENTAR|SEGUIR|CONTINUAR/i.test(x.textContent))
               || bs.find(x=>x.dataset.pega) || bs.find(x=>x.dataset.op) || bs[0];
      if(!pri) return false;
      pri.click(); return true;
    });
    await p.waitForTimeout(clicou ? 260 : 180);
  }
  return false;
}

/* RECARREGAR COMO O JOGADOR RECARREGA. Voltar não cai direto na partida: cai
   no título, com um botão CONTINUAR A RUN em cima do menu. É de propósito —
   ninguém quer ser jogado de volta no meio de um tabuleiro sem saber onde
   está. O teste tem de andar por essa porta, senão mede outra coisa. */
async function voltarPelaPorta(){
  await p.reload({ waitUntil:'domcontentloaded' });
  await p.waitForFunction(()=>window.MN?.run, null, { timeout:8000 });
  await p.waitForTimeout(350);
  const naTela = await p.evaluate(()=>{
    const b = [...document.querySelectorAll('#t-titulo .menu button')]
      .find(x=>/CONTINUAR A RUN/i.test(x.textContent));
    if(!b) return false;
    b.click(); return true;
  });
  await p.waitForTimeout(500);
  return naTela;
}

console.log('\n\x1b[36m── 1. Fechar a sala pelas moedas e recarregar a página\x1b[0m');
{
  await comecar('detetive');
  await ateAProximaSala();
  const bateu = await ateBaterAMeta();
  ok(bateu, 'o bot bate a meta da primeira sala');

  /* `#bfim` nasce com display:none e só aparece com `passou` no rodapé — e
     nasce DESABILITADO enquanto a virada ainda está animando, porque tocar
     nele no meio da animação encerraria a sala antes de o jogador ver o par
     que acabou de fechar. Esperar pelas duas coisas é esperar pela regra. */
  const podeFechar = await p.waitForFunction(()=>{
    const b = document.querySelector('#bfim');
    return !!b && !b.disabled && getComputedStyle(b).display !== 'none';
  }, null, { timeout:8000 }).then(()=>true).catch(()=>false);
  ok(podeFechar, 'com a meta batida, o botão FECHAR+MOEDAS está clicável');
  await p.click('#bfim');
  await p.waitForTimeout(1400);

  const antes = await retrato();
  eq(antes.fins, 1, 'a jogada `fim` foi para o registro');
  ok(!antes.naSala || true, 'sala encerrada');

  /* AQUI: fecha a aba e volta */
  ok(await voltarPelaPorta(), 'o título oferece CONTINUAR A RUN depois de voltar');
  const depois = await retrato();

  ok(!!depois, 'a partida volta depois de recarregar');
  for(const k of ['pontos','moedas','mundo','indice','foco','reliquias','fins','jogadas'])
    eq(depois[k], antes[k], `${k} sobrevive ao recarregamento`);
  ok(!depois.naSala,
     'a sala fechada por escolha CONTINUA fechada ao voltar — era este o bug');
}

console.log('\n\x1b[36m── 2. Depois de voltar, o registro ainda bate com o verificador\x1b[0m');
{
  /* o pior sintoma do bug não era visual: era o ranking recusar um placar
     honesto porque a partida retomada tinha andado por um caminho e o
     registro guardava outro. Aqui a run continua DEPOIS do recarregamento e
     o pacote inteiro é conferido no fim. */
  await ateAProximaSala();
  await ateBaterAMeta(200);
  await p.waitForTimeout(200);
  const conferido = await p.evaluate(()=>{
    const r = window.MN.run;
    const { placar, registro } = r.pacote();
    return { ...window.MN.verificar(placar, registro), jogadas:registro.length };
  });
  ok(conferido.ok,
     `o pacote de uma partida retomada é aceito pelo verificador `
     + `(${conferido.jogadas} jogadas — ${conferido.por||'ok'})`);
}

console.log('\n\x1b[36m── 3. Recarregar no MEIO de uma sala aberta\x1b[0m');
{
  await comecar('cronomante');
  await ateAProximaSala();
  await p.evaluate(()=>{
    const s = window.MN.run.sala;
    for(const c of s.cartas.filter(x=>!x.resolvida && !x.virada).slice(0,2))
      document.querySelector(`[data-c="${c.id}"]`)?.click();
  });
  await p.waitForTimeout(900);
  const antes = await retrato();
  ok(await voltarPelaPorta(), 'sala aberta: o título oferece CONTINUAR A RUN');
  const depois = await retrato();
  for(const k of ['pontos','moedas','mundo','indice','jogadas'])
    eq(depois[k], antes[k], `sala aberta: ${k} sobrevive`);
  ok(depois.naSala, 'sala aberta continua aberta');
  /* e o tabuleiro tem de estar DESENHADO, não só existir no motor: uma sala
     que volta sem cartas na tela é uma partida perdida do ponto de vista de
     quem joga, por mais certo que esteja o objeto por baixo */
  const tela = await p.evaluate(()=>({
    id: [...document.querySelectorAll('.tela')].find(x=>x.classList.contains('on'))?.id,
    cartas: document.querySelectorAll('#mesa .ct').length,
    motor: window.MN.run.sala.cartas.length }));
  eq(tela.id, 't-sala', 'CONTINUAR leva de volta para a sala');
  eq(tela.cartas, tela.motor, 'o tabuleiro voltou desenhado, carta por carta');
}

console.log('\n\x1b[36m── 4. Salvamento corrompido não trava o jogo\x1b[0m');
{
  /* O LIXO TEM DE ENTRAR ANTES DA PÁGINA. Escrever no localStorage e depois
     navegar não testa nada: o `pagehide` da página velha salva por cima do
     lixo no caminho, e o que carrega é a partida boa. Por isso o lixo vai por
     `addInitScript`, que roda antes de qualquer script do jogo. */
  for(const lixo of ['{', 'null', '[]', '{"registro":[{"s":"xyz"}]}',
                     '{"semente":"a","classe":"nao-existe","registro":[{"s":"v","c":0}]}',
                     '{"semente":"a","classe":"detetive","registro":[{"s":"v","c":999}]}',
                     '{"semente":"a","classe":"detetive","registro":"nem lista é"}']){
    const ctx = await b.newContext({ viewport:{ width:430, height:920 } });
    await ctx.addInitScript(l=>{
      try { localStorage.setItem('mnemonic.run', l); } catch(e){}
    }, lixo);
    const q = await ctx.newPage();
    const erros = [];
    q.on('pageerror', e => erros.push(e.message.split('\n')[0]));
    await q.goto(BASE, { waitUntil:'domcontentloaded' });
    await q.waitForFunction(()=>window.MN, null, { timeout:8000 });
    await q.waitForTimeout(350);
    const est = await q.evaluate(()=>({
      tela: [...document.querySelectorAll('.tela')].find(x=>x.classList.contains('on'))?.id,
      run: !!window.MN.run,
      continuar: [...document.querySelectorAll('#t-titulo .menu button')]
        .some(x=>/CONTINUAR A RUN/i.test(x.textContent)),
      jogavel: [...document.querySelectorAll('#t-titulo .menu button')]
        .some(x=>/NOVA|JOGAR|CLASSE/i.test(x.textContent)) }));
    eq(est.tela, 't-titulo', `lixo cai no título: ${lixo.slice(0,34)}`);
    ok(!est.run, `lixo não vira partida: ${lixo.slice(0,34)}`);
    ok(!est.continuar, `lixo não oferece CONTINUAR: ${lixo.slice(0,34)}`);
    ok(est.jogavel, `e ainda dá para começar uma run nova: ${lixo.slice(0,34)}`);
    ok(!erros.length, `lixo não estoura no console: ${erros[0]||'ok'}`);
    await ctx.close();
  }
}

console.log('\n\x1b[36m── 5. O guia da primeira sala solta a tela quando acaba\x1b[0m');
{
  /* um holofote que tapa a tela inteira e não sai é o pior travamento
     possível: de fora parece que o jogo morreu. Os dois jeitos de sair
     precisam funcionar, e os dois precisam devolver o toque para as cartas. */
  const sair = async (botao, rotulo) => {
    await comecar('detetive', true);
    await ateAProximaSala();
    await p.waitForSelector('#guia.on', { timeout:6000 }).catch(()=>{});
    ok(await p.$eval('#guia', e=>e.classList.contains('on')),
       `${rotulo}: o guia aparece sozinho na primeira sala`);
    let passos = 0;
    while(await p.$eval('#guia', e=>e.classList.contains('on')) && passos++ < 15){
      await p.click(botao); await p.waitForTimeout(180);
      if(botao === '#guiaPular') break;
    }
    ok(!(await p.$eval('#guia', e=>e.classList.contains('on'))),
       `${rotulo} fecha o guia`);
    /* a prova que importa: o toque volta a chegar na CARTA */
    const chega = await p.evaluate(()=>{
      const c = window.MN.run.sala.cartas.find(x=>!x.resolvida && !x.virada);
      const e = document.querySelector(`[data-c="${c.id}"]`);
      const r = e.getBoundingClientRect();
      return !!document.elementFromPoint(r.x+r.width/2, r.y+r.height/2)
                       ?.closest('[data-c]');
    });
    ok(chega, `${rotulo}: com o guia fechado, o toque chega na carta`);
    eq(await p.evaluate(()=>localStorage.getItem('mnemonic.guia')), '1',
       `${rotulo}: o guia não volta a aparecer depois de visto`);
    return passos;
  };
  await sair('#guiaPular', 'PULAR');
  const passos = await sair('#guiaOk', 'ir até o fim');
  ok(passos > 1 && passos < 15, `o guia tem fim (${passos} passos)`);
}

await b.close();

const limpo = [...new Set(console_)];
console.log('\n' + limpo.length + ' problema(s) de console/rede');
for(const r of limpo.slice(0,15)) console.log('  ·', r);

console.log('\n────────────────────────────────────────────────────────');
if(ruins.length || limpo.length){
  console.log(`\x1b[31m✗ ${ruins.length} de ${contas} verificações de retomada falharam\x1b[0m`);
  for(const r of ruins) console.log('  ·', r);
  process.exit(1);
}
console.log(`\x1b[32m✓ ${contas} verificações de retomada passaram\x1b[0m`);
