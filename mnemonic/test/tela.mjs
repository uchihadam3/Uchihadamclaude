/* ========================================================================
   TESTE DE TELA DO MNEMONIC        node mnemonic/test/tela.mjs

   O teste de regras prova o MOTOR, e prova bem: 2588 verificações. Ele não
   pegou o pior defeito que este jogo já teve, porque o defeito não estava no
   motor — estava numa colisão de nome de classe.

   O que aconteceu: `chefe` já era o nome da pílula vermelha que mostra o nome
   do chefe no topo da sala. Ao marcar a mesa da sala de chefe com essa mesma
   classe, o tabuleiro inteiro herdou `display:flex`, fundo vermelho e raio de
   99px. A grade caiu, as cartas se amontoaram, e o toque passou a cair numa
   carta diferente da que o dedo apontava — de fora, "o chefe não funciona, as
   cartas não viram".

   Nada disso dá erro. O navegador desenha a mesa errada e segue. Então este
   arquivo abre o jogo de verdade e confere as coisas que só existem depois de
   o CSS ser aplicado:

     · a mesa continua sendo uma GRADE, em toda sala
     · ninguém pinta um retângulo por cima do tabuleiro
     · tocar numa carta fechada realmente a vira
     · o console fica limpo e nenhum arquivo dá 404

   Precisa de um servidor na raiz do repositório:
       python3 -m http.server 8123
   ===================================================================== */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const BASE = process.env.MNEMONIC_URL || 'http://localhost:8123/mnemonic/jogo.html';
let passou = 0, falhou = 0; const erros = [];
const ok = (c, m) => c ? passou++ : (falhou++, erros.push(m));
const secao = n => console.log('\n\x1b[36m── '+n+'\x1b[0m');

/* abre o jogo e entra numa sala de combate do mundo pedido */
async function entrarNaSala(navegador, mundo, indice){
  const pg = await navegador.newPage({ viewport:{width:412,height:900} });
  const ruim = [];
  pg.on('console', m=>{ if(m.type()==='error') ruim.push('console: '+m.text()); });
  pg.on('pageerror', e=>ruim.push('pageerror: '+e.message));
  pg.on('response', r=>{ if(r.status()>=400) ruim.push(r.status()+' '+r.url()); });
  await pg.goto(BASE, { waitUntil:'networkidle' });
  /* o guia aponta para as cartas e recorta a tela; ele tem teste próprio */
  await pg.evaluate(()=>localStorage.setItem('mnemonic.guia','1'));
  await pg.reload({ waitUntil:'networkidle' });
  const clicar = async t => { const e = pg.locator(`text=${t}`).first();
    if(await e.count()){ await e.click({timeout:1500}).catch(()=>{}); await pg.waitForTimeout(300); } };
  await clicar('JOGAR'); await pg.waitForTimeout(260);
  await pg.locator('.op').first().click().catch(()=>{}); await pg.waitForTimeout(240);
  await clicar('COMEÇAR'); await clicar('CONFIRMAR'); await clicar('SEGUIR');
  await pg.waitForTimeout(280);
  await pg.evaluate(([m,i])=>{ window.MN.run.mundo = m; window.MN.run.indice = i; }, [mundo, indice]);
  await pg.evaluate(()=>{ const b=[...document.querySelectorAll('[data-sala]')]; if(b.length) b[0].click(); });
  await pg.waitForTimeout(420);
  await clicar('ENTRAR NA SALA'); await pg.waitForTimeout(650);
  return { pg, ruim };
}

const navegador = await chromium.launch();

/* ════════════════════════════════════════════════════════ 1 */
secao('1. A mesa é uma grade — em toda sala, inclusive a do chefe');
for(const [nome, mundo, indice] of [['combate',0,0], ['chefe',3,7], ['chefe',0,7]]){
  const { pg, ruim } = await entrarNaSala(navegador, mundo, indice);
  const m = await pg.evaluate(()=>{
    const e = document.getElementById('mesa'); const cs = getComputedStyle(e);
    return { display:cs.display, fundo:cs.backgroundColor, raio:cs.borderRadius,
             overflow:cs.overflow,
             cartas: e.querySelectorAll('.ct').length,
             chefe: !!window.MN.run.sala?.boss };
  });
  ok(m.display === 'grid', `${nome}: a mesa continua display:grid (veio ${m.display})`);
  ok(/rgba\(0, 0, 0, 0\)|transparent/.test(m.fundo),
     `${nome}: a mesa não ganhou fundo próprio (veio ${m.fundo})`);
  /* raio grande com overflow recorta as quatro pontas do tabuleiro, e carta
     cortada pela metade não recebe toque */
  ok(parseFloat(m.raio) < 40, `${nome}: a mesa não virou pílula (raio ${m.raio})`);
  ok(m.overflow === 'visible' || parseFloat(m.raio) < 40,
     `${nome}: a mesa não recorta as próprias cartas`);
  ok(m.cartas > 0, `${nome}: a mesa tem cartas (${m.cartas})`);
  if(indice === 7) ok(m.chefe, `${nome}: a sala é mesmo de chefe`);
  ok(ruim.length === 0, `${nome}: sem erro de console nem 404 — ${ruim.slice(0,2).join(' | ')}`);
  await pg.close();
}

/* ════════════════════════════════════════════════════════ 2 */
secao('2. Ninguém pinta por cima do tabuleiro');
{
  const { pg } = await entrarNaSala(navegador, 3, 7);
  /* erra de propósito: é no erro que o Caos mexe no tabuleiro */
  const [a,b] = await pg.evaluate(()=>{
    const s = window.MN.run.sala;
    const x = s.cartas.find(k=>!k.resolvida && !k.virada);
    const y = s.cartas.find(k=>!k.resolvida && !k.virada && k.par!==x.par);
    return [x.id, y.id];
  });
  await pg.locator(`[data-c="${a}"]`).click({force:true}); await pg.waitForTimeout(280);
  await pg.locator(`[data-c="${b}"]`).click({force:true}); await pg.waitForTimeout(2600);
  const gordos = await pg.evaluate(()=>{
    const mesa = document.getElementById('mesa').getBoundingClientRect();
    const fora = [];
    for(const e of document.querySelectorAll('#area *')){
      if(e.id === 'mesa' || e.id === 'feltro') continue;      /* são o tabuleiro */
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      const opaco = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.opacity > 0.5;
      if(opaco && r.width * r.height > mesa.width * mesa.height * 0.5)
        fora.push(e.tagName + '.' + String(e.className) + ' ' + cs.backgroundColor);
    }
    return fora;
  });
  ok(gordos.length === 0, 'nada opaco cobre metade do tabuleiro — '+gordos.slice(0,2).join(' | '));
  await pg.close();
}

/* ════════════════════════════════════════════════════════ 3 */
secao('3. Todo toque numa carta fechada é aceito e vira aquela carta');
for(const [nome, mundo, indice] of [['combate',0,0], ['chefe',3,7], ['chefe',2,7], ['chefe',4,7]]){
  const { pg } = await entrarNaSala(navegador, mundo, indice);
  let tentados = 0;
  for(let k=0;k<8;k++){
    const alvo = await pg.evaluate(()=>{
      const s = window.MN.run.sala; if(!s || s.fim) return null;
      const c = s.cartas.find(x=>!x.resolvida && !x.virada && !x.sumiu);
      return c ? c.id : null;
    });
    if(alvo == null) break;
    tentados++;
    await pg.locator(`[data-c="${alvo}"]`).click({force:true}).catch(()=>{});
    await pg.waitForTimeout(2100);   /* mais que a coreografia inteira */
  }
  /* O QUE SE MEDE. Olhar o estado da carta depois do clique não serve: o
     motor resolve a tentativa dentro do próprio `virar`, e o Caos ainda
     APAGA o que você conhecia ao embaralhar — a carta volta para "fechada e
     desconhecida" antes de qualquer observação de fora. Quem sabe a verdade é
     o próprio jogo, que registra cada toque e por que ele foi aceito ou
     recusado. Um toque em carta fechada só pode terminar em "virou". */
  const toques = await pg.evaluate(()=>window.MN.toques);
  const recusados = toques.filter(t=>t.saiu !== 'virou');
  ok(tentados > 0, `${nome}: deu para tocar em alguma carta`);
  ok(toques.length === tentados,
     `${nome}: os ${tentados} toques chegaram ao jogo (chegaram ${toques.length})`);
  ok(recusados.length === 0,
     `${nome}: nenhum toque foi recusado — `
     + recusados.slice(0,3).map(t=>`carta ${t.id}: ${t.saiu}`).join(', '));
  await pg.close();
}

await navegador.close();
console.log('\n' + '─'.repeat(56));
if(falhou){ console.log('\x1b[31m✗ '+falhou+' de '+(passou+falhou)+' verificações falharam\x1b[0m');
            for(const e of erros) console.log('  · '+e); process.exit(1); }
console.log('\x1b[32m✓ '+passou+' verificações de tela passaram\x1b[0m');
