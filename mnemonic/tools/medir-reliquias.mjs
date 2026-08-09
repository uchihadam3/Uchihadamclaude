/* ════════════════════════════════════════════════════════════════════════
   A FORÇA DE CADA RELÍQUIA — a tabela que decide a raridade.

   A régua mora em `test/forca.mjs` e é a MESMA que `test/quebrar.mjs` usa
   para cobrar que raridade maior seja de fato mais forte. Duas réguas para
   a mesma pergunta acabariam discordando, e a discordância apareceria como
   "o teste passa mas o jogo está errado".

       node tools/medir-reliquias.mjs [sementes] [--json]
   ═══════════════════════════════════════════════════════════════════════ */
import { RELIQUIAS, RARIDADES, ORDEM_RARIDADE } from '../js/data/reliquias.js';
import { forca } from '../test/forca.mjs';

const SEMENTES = Number(process.argv[2]) || 26;
const JSON_SO = process.argv.includes('--json');

const saida = [];
for(const r of RELIQUIAS){
  const f = forca(r.id, { sementes: SEMENTES });
  saida.push({ ...f, nome:r.nome, r:r.r });
  if(!JSON_SO) console.error(`  ${r.nome.padEnd(24)} `
    + `${f.forca >= 0 ? '+' : ''}${f.forca.toFixed(2)}${f.fora ? '  (fora da sala)' : ''}`);
}
saida.sort((a, b) => b.forca - a.forca);

if(JSON_SO){ console.log(JSON.stringify(saida, null, 1)); }
else {
  console.log(`\n${'relíquia'.padEnd(24)}${'raridade'.padEnd(10)}${'força'.padStart(7)}`);
  for(const x of saida)
    console.log(`${x.nome.padEnd(24)}${RARIDADES[x.r].nome.padEnd(10)}`
      + `${x.forca >= 0 ? '+' : ''}${x.forca.toFixed(2).padStart(6)}`
      + (x.fora ? '  (fora da sala)' : ''));
  console.log('\nmediana por degrau:');
  for(const g of ORDEM_RARIDADE){
    const v = saida.filter(x => x.r === g).map(x => x.forca).sort((a,b)=>a-b);
    const m = v.length % 2 ? v[(v.length-1)/2] : (v[v.length/2-1]+v[v.length/2])/2;
    console.log(`  ${RARIDADES[g].nome.padEnd(10)} ${String(v.length).padStart(2)} peças`
      + `   mediana ${m >= 0 ? '+' : ''}${m.toFixed(2)}`);
  }
}
