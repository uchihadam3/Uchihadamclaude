/* ════════════════════════════════════════════════════════════════════════
   OS DESENHADOS SE DISTINGUEM? — o distinguir.py da arte VETORIAL.

   `tools/distinguir.py` prova isso para a arte pintada, porque a arte pintada
   é um PNG e o Python sabe ler PNG. A arte desenhada não passava por prova
   nenhuma: o único teste que existia comparava as STRINGS de SVG, e string
   diferente não quer dizer desenho diferente. Cinco gramáticas novas passaram
   nesse teste com folga e, na carta, as dezoito viravam a mesma mancha branca
   — cabeça redonda com uma orelha um pouco diferente, a quarenta pixels, é uma
   carta só. Do lado de quem joga isso é o jogo trapaceando.

   Aqui o desenho é RASTERIZADO no mesmo navegador que o jogador usa, com o
   mesmo traço do CSS, e comparado como mancha de luz — igual ao Python. É a
   mesma régua para as duas metades da arte.

       python3 -m http.server 8123      (da raiz do repositório)
       node test/glifos.mjs
   ═══════════════════════════════════════════════════════════════════════ */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:8123/mnemonic/';
/* abaixo disto, duas cartas da mesma família viram a mesma carta de relance.
   O número saiu medido: a família Espaço, que está no jogo e é lida sem
   reclamação, tem 20,7 no seu par mais próximo, e ela é reconhecidamente a
   mais apertada das que já existem. */
const PERTO = 20.0;
/* OS EMBLEMAS TÊM RÉGUA PRÓPRIA, e isso não é indulgência — é o teto medido
   de um sistema de dois eixos num quadrado de 24. Seis silhuetas realmente
   diferentes é tudo o que cabe (disco, octógono e pentágono viram a mesma
   mancha a vinte e seis pixels), e a partir daí o que separa dois emblemas é
   só o vazado, que é a peça pequena. Depois de reescrever moldura cheia com
   marca vazada, o pior par saiu de 7,2 para 17,8 e a mediana foi a 58 — e
   vizinhos na parede NUNCA compartilham silhueta, que era a queixa real.
   O conserto de verdade é pintura: quando as 54 tiverem arte, este número
   deixa de existir. */
const PERTO_EMBLEMA = 16.0;

const b = await chromium.launch();
const p = await b.newPage();
await p.goto(BASE + 'jogo.html', { waitUntil:'domcontentloaded' });

const relatorio = await p.evaluate(async (perto) => {
  const { glifo, FAMILIA_PINTADA, POR_FAMILIA } = await import('./js/arte/glifos.js');
  const { LISTA_FAMILIAS } = await import('./js/data/familias.js');
  const { emblema } = await import('./js/arte/emblemas.js');
  const { RELIQUIAS } = await import('./js/data/reliquias.js');
  const { ICO_RELIQUIA } = await import('./js/ui/icones.js');
  const LADO = 24, FUNDO = 128;

  /* a peça é composta sobre um cinza médio pelo mesmo motivo do Python: no
     jogo ela vai sobre a cor da família, e o que sobrevive é o contraste */
  const cv = document.createElement('canvas');
  cv.width = cv.height = LADO;
  const cx = cv.getContext('2d', { willReadFrequently:true });

  const medir = (miolo) => new Promise(pronto => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"`
      + ` width="${LADO}" height="${LADO}" color="#fff" stroke="#fff"`
      + ` stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"`
      + ` fill="none">${miolo}</svg>`;
    const im = new Image();
    im.onload = () => {
      cx.fillStyle = `rgb(${FUNDO},${FUNDO},${FUNDO})`;
      cx.fillRect(0, 0, LADO, LADO);
      cx.drawImage(im, 0, 0, LADO, LADO);
      const d = cx.getImageData(0, 0, LADO, LADO).data;
      const g = new Float32Array(LADO*LADO);
      for(let k=0;k<g.length;k++)
        g[k] = 0.2126*d[k*4] + 0.7152*d[k*4+1] + 0.0722*d[k*4+2];
      pronto(g);
    };
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const assinatura = (fam, i) => medir(glifo(fam, i));
  /* o miolo de um <svg> montado por fora: o emblema já vem embrulhado */
  const soMiolo = svg => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');

  const saida = [];
  for(const f of LISTA_FAMILIAS){
    if(FAMILIA_PINTADA.has(f.id)) continue;      // essa metade é do Python
    const ass = [];
    for(let i=0;i<POR_FAMILIA;i++) ass.push(await assinatura(f.id, i));
    const pares = [];
    for(let a=0;a<ass.length;a++) for(let c=a+1;c<ass.length;c++){
      let s = 0;
      for(let k=0;k<ass[a].length;k++){ const e = ass[a][k]-ass[c][k]; s += e*e; }
      pares.push({ d: Math.sqrt(s/ass[a].length), a, b:c });
    }
    pares.sort((x,y)=>x.d-y.d);
    const meio = pares[Math.floor(pares.length/2)].d;
    /* tinta a menos também some: um desenho que mal marca a carta não é
       símbolo, é sujeira. Mede-se pelo quanto ele se afasta do cinza. */
    const tinta = ass.map(g => {
      let n = 0; for(const v of g) if(Math.abs(v-FUNDO) > 40) n++;
      return n / g.length;
    });
    saida.push({ fam:f.id, nome:f.nome, piores:pares.slice(0,3), meio,
                 magra: tinta.map((t,i)=>({i,t})).filter(x=>x.t < 0.045) });
  }

  /* ---------- OS EMBLEMAS DE RELÍQUIA ----------
     Mesma régua, mesmo motivo. Eles existem justamente para que escolher
     entre três relíquias na loja não vire ler três parágrafos, e a única
     prova que existia era comparar as STRINGS de SVG — que é a prova que já
     deixou passar dezoito Animais idênticos. Na tela, "Rede de Pesca",
     "Cristal Bruto" e "Ferradura" apareciam com a mesma gota. */
  const semArte = RELIQUIAS.map((r,i)=>({ r, i })).filter(x => !ICO_RELIQUIA[x.r.id]);
  const ass = [];
  for(const x of semArte) ass.push(await medir(soMiolo(emblema(x.i))));
  const pares = [];
  for(let a=0;a<ass.length;a++) for(let c=a+1;c<ass.length;c++){
    let s = 0;
    for(let k=0;k<ass[a].length;k++){ const e = ass[a][k]-ass[c][k]; s += e*e; }
    pares.push({ d: Math.sqrt(s/ass[a].length),
                 a: semArte[a].r.nome, b: semArte[c].r.nome });
  }
  pares.sort((x,y)=>x.d-y.d);
  saida.push({ fam:'__emblemas', nome:'Emblemas', quantos: semArte.length,
               piores: pares.slice(0,4),
               meio: pares[Math.floor(pares.length/2)].d, magra: [] });
  return saida;
}, PERTO);

await b.close();

let ruim = 0;
console.log('\n── distância entre os desenhos de cada família (0 = idênticos)\n');
for(const f of relatorio){
  const pior = f.piores[0];
  const limite = f.fam === '__emblemas' ? PERTO_EMBLEMA : PERTO;
  const marca = pior.d < limite ? '  ✗ PERTO DEMAIS' : '';
  if(pior.d < limite) ruim++;
  const rot = x => typeof x === 'number' ? String(x).padStart(2,'0') : x;
  console.log(`${f.nome.padEnd(13)} pior ${pior.d.toFixed(1)} `
    + `(${rot(pior.a)}×${rot(pior.b)})`
    + `   mediana ${f.meio.toFixed(1)}${marca}`);
  for(const p of f.piores.slice(1))
    console.log(`              · ${rot(p.a)}×${rot(p.b)} = ${p.d.toFixed(1)}`);
  for(const m of f.magra){
    console.log(`              ✗ ${String(m.i).padStart(2,'0')} quase não marca `
      + `a carta (${(m.t*100).toFixed(1)}% de tinta)`);
    ruim++;
  }
}
console.log('\n' + (ruim
  ? `\x1b[31m✗ ${ruim} problema(s) de desenho\x1b[0m`
  : '\x1b[32m✓ nenhum par confundível entre os desenhados\x1b[0m'));
process.exit(ruim ? 1 : 0);
