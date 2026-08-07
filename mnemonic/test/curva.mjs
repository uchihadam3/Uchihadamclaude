/* A CURVA DO ESQUECIMENTO — node mnemonic/test/curva.mjs
   O bot joga a mesma run com memórias cada vez piores. É a régua de
   dificuldade que interessa: quanto o jogo cobra de quem esquece. */
import { Run } from '../js/engine/run.js';
import { CLASSES } from '../js/data/classes.js';
import { jogarRun } from './bot.mjs';
const N = Number(process.argv[2] || 12);
console.log('esquece  vitórias   salas(méd)  pontos(méd)');
for(const p of [0, 0.03, 0.06, 0.10, 0.15, 0.22, 0.32]){
  let v=0, n=0, salas=0, pts=0;
  for(const cl of Object.keys(CLASSES)) for(let i=0;i<N;i++){
    const r = jogarRun(new Run({ semente:'c'+i, classe:cl }), { esquece:p });
    n++; salas += r.estatisticas.salas; pts += r.pontos; if(r.venceu) v++;
  }
  console.log(String(p.toFixed(2)).padStart(7) + (v+'/'+n).padStart(11)
    + (salas/n).toFixed(1).padStart(12) + String(Math.round(pts/n)).padStart(13));
}
