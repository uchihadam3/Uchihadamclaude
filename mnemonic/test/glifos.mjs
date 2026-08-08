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

const b = await chromium.launch();
const p = await b.newPage();
await p.goto(BASE + 'jogo.html', { waitUntil:'domcontentloaded' });

const relatorio = await p.evaluate(async (perto) => {
  const { glifo, FAMILIA_PINTADA, POR_FAMILIA } = await import('./js/arte/glifos.js');
  const { LISTA_FAMILIAS } = await import('./js/data/familias.js');
  const LADO = 24, FUNDO = 128;

  /* a peça é composta sobre um cinza médio pelo mesmo motivo do Python: no
     jogo ela vai sobre a cor da família, e o que sobrevive é o contraste */
  const cv = document.createElement('canvas');
  cv.width = cv.height = LADO;
  const cx = cv.getContext('2d', { willReadFrequently:true });

  const assinatura = (fam, i) => new Promise(pronto => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"`
      + ` width="${LADO}" height="${LADO}" color="#fff" stroke="#fff"`
      + ` stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"`
      + ` fill="none">${glifo(fam, i)}</svg>`;
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
  return saida;
}, PERTO);

await b.close();

let ruim = 0;
console.log('\n── distância entre os desenhos de cada família (0 = idênticos)\n');
for(const f of relatorio){
  const pior = f.piores[0];
  const marca = pior.d < PERTO ? '  ✗ PERTO DEMAIS' : '';
  if(pior.d < PERTO) ruim++;
  console.log(`${f.nome.padEnd(13)} pior ${pior.d.toFixed(1)} `
    + `(${String(pior.a).padStart(2,'0')}×${String(pior.b).padStart(2,'0')})`
    + `   mediana ${f.meio.toFixed(1)}${marca}`);
  for(const p of f.piores.slice(1))
    console.log(`              · ${String(p.a).padStart(2,'0')}×`
      + `${String(p.b).padStart(2,'0')} = ${p.d.toFixed(1)}`);
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
