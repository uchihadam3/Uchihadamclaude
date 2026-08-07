/* ========================================================================
   TESTE DO RANKING            node mnemonic/test/ranking.mjs

   Três coisas precisam ser verdade, e nenhuma delas dá para conferir contra
   um relay público — depender de servidor de terceiro não é teste, é aposta.
   Então este arquivo sobe o relay dublê (test/relay.mjs) e joga contra ele:

     1. O QUADRO APARECE RÁPIDO. Antes a tela ficava em branco por até dez
        segundos: esperava os cinco relays, e um relay morto segurava tudo.
        Aqui a lista tem UM relay bom e um MORTO de propósito.
     2. A ABA DIÁRIO MOSTRA O DIA. Ela vinha vazia porque o filtro pedia a
        etiqueta geral e o relay devolvia os placares mais recentes de todo
        mundo — os de hoje não cabiam no lote.
     3. TRAPAÇA NÃO ENTRA. Um placar inflado é assinado igual aos outros; o
        que o derruba é o recálculo da run no aparelho de quem lê.

   Precisa de um servidor na raiz do repositório:
       python3 -m http.server 8123
   ===================================================================== */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';

const BASE = process.env.MNEMONIC_URL || 'http://localhost:8123/mnemonic/jogo.html';
const PORTA = 8131;
let passou = 0, falhou = 0; const erros = [];
const ok = (c, m) => c ? passou++ : (falhou++, erros.push(m));
const secao = n => console.log('\n\x1b[36m── '+n+'\x1b[0m');

const relay = spawn(process.execPath, [new URL('relay.mjs', import.meta.url).pathname,
                                       String(PORTA)], { stdio:'ignore' });
await new Promise(r=>setTimeout(r, 700));

const navegador = await chromium.launch();
const pg = await navegador.newPage({ viewport:{width:412,height:900} });
const ruim = [];
pg.on('pageerror', e=>ruim.push(e.message));
/* o relay morto grita no console de propósito: é o defeito que estamos
   provando que não atrapalha mais */
pg.on('console', m=>{ if(m.type()==='error' && !/9999/.test(m.text())) ruim.push(m.text()); });

await pg.goto(BASE, { waitUntil:'networkidle' });
await pg.evaluate(p=>localStorage.setItem('mnemonic.relays',
  JSON.stringify(['ws://localhost:'+p, 'ws://localhost:9999'])), PORTA);
await pg.reload({ waitUntil:'networkidle' });
await pg.waitForTimeout(400);

/* ---------- publica placares honestos, jogados pelo motor ---------- */
const publicados = await pg.evaluate(async ()=>{
  const { RANK, Run } = window.MN;
  const d = new Date();
  const semente = 'diario-' + d.getUTCFullYear() + '-'
    + String(d.getUTCMonth()+1).padStart(2,'0') + '-'
    + String(d.getUTCDate()).padStart(2,'0');
  let n = 0;
  for(let k=0;k<4;k++){
    localStorage.setItem('mnemonic.sk','');       /* aparelho novo a cada vez */
    const r = new Run({ semente, classe:'detetive', diario:true });
    r.entrar();
    const m = {};
    for(const c of r.sala.cartas) (m[c.par] ||= []).push(c.id);
    for(const g of Object.values(m)){ if(r.sala?.fim) break; r.virar(g[0]); r.virar(g[1]); }
    if((await RANK.publicar(r.pacote(), 'jogador'+k)).ok) n++;
  }
  return n;
});

/* ---------- e um trapaceiro: mesmo registro, placar inflado ---------- */
await pg.evaluate(async ()=>{
  const { RANK, Run } = window.MN;
  const d = new Date();
  const semente = 'diario-' + d.getUTCFullYear() + '-'
    + String(d.getUTCMonth()+1).padStart(2,'0') + '-'
    + String(d.getUTCDate()).padStart(2,'0');
  localStorage.setItem('mnemonic.sk','');
  const r = new Run({ semente, classe:'detetive', diario:true });
  r.entrar(); r.virar(r.sala.cartas[0].id);
  const pacote = r.pacote();
  pacote.placar.pontos = 999999;                  /* o número que não bate */
  await RANK.publicar(pacote, 'trapaceiro');
});

/* ---------- 1. velocidade ---------- */
secao('1. O quadro aparece antes de os relays terminarem');
{
  await pg.evaluate(()=>{ window.__t0 = performance.now(); window.__ms = null;
    new MutationObserver(()=>{ if(window.__ms == null && document.querySelector('.pod .qm'))
      window.__ms = Math.round(performance.now() - window.__t0);
    }).observe(document.body, { subtree:true, childList:true }); });
  await pg.evaluate(()=>{ const b = document.createElement('button');
    b.dataset.ir = 'rank'; b.style.display='none'; document.body.append(b); b.click(); });
  let ms = null;
  for(let i=0;i<40 && ms==null;i++){ await pg.waitForTimeout(100);
    ms = await pg.evaluate(()=>window.__ms); }
  ok(publicados === 4, `os 4 placares honestos subiram (subiram ${publicados})`);
  ok(ms != null, 'o pódio apareceu');
  ok(ms != null && ms < 1500, `o primeiro nome apareceu em ${ms}ms — bem antes do prazo dos relays`);
}

/* ---------- 2. a aba diário ---------- */
secao('2. A aba Diário mostra quem jogou a run de hoje');
{
  await pg.waitForTimeout(1200);
  await pg.evaluate(()=>[...document.querySelectorAll('[data-aba]')]
    .find(b=>b.dataset.aba==='diario')?.click());
  await pg.waitForTimeout(2000);
  const d = await pg.evaluate(()=>({
    aba: document.querySelector('.abas .on')?.dataset.aba,
    nomes: [...document.querySelectorAll('.pod .qm, .rk .qm')].map(e=>e.textContent),
  }));
  ok(d.aba === 'diario', 'a aba Diário está aberta');
  ok(d.nomes.length >= 3, `a aba Diário lista os jogadores do dia (listou ${d.nomes.length})`);
}

/* ---------- 3. a trapaça ---------- */
secao('3. Placar que não bate com as próprias jogadas não entra');
{
  const nomes = await pg.evaluate(()=>
    [...document.querySelectorAll('.pod .qm, .rk .qm')].map(e=>e.textContent));
  ok(!nomes.includes('trapaceiro'),
     'o trapaceiro foi descartado no recálculo — ' + nomes.join(', '));
  ok(nomes.some(n=>/^jogador/.test(n)), 'e os honestos continuam no quadro');
}

ok(ruim.length === 0, 'sem erro de página — ' + ruim.slice(0,2).join(' | '));

await navegador.close();
relay.kill();
console.log('\n' + '─'.repeat(56));
if(falhou){ console.log('\x1b[31m✗ '+falhou+' de '+(passou+falhou)+' verificações falharam\x1b[0m');
            for(const e of erros) console.log('  · '+e); process.exit(1); }
console.log('\x1b[32m✓ '+passou+' verificações de ranking passaram\x1b[0m');
