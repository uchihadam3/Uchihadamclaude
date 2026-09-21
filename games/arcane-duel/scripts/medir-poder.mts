import { buildVazia } from '../src/nucleo/build.js';
import { iniciarDraft, ofertaAtual, escolher, type EstadoDoDraft } from '../src/nucleo/draft.js';
import { avaliarBuild } from '../src/nucleo/poder.js';
import { sortearEm } from '../src/nucleo/rng.js';

const completar = (seed: string, escolhedor: (opcoes: readonly any[], i: number) => any) => {
  let d: EstadoDoDraft = iniciarDraft(buildVazia('guerreiro', false), seed);
  const curva: number[] = [avaliarBuild(d.build).poder];
  let i = 0;
  while (!d.concluido) {
    const o = ofertaAtual(d);
    d = escolher(d, escolhedor(o.opcoes, i));
    curva.push(avaliarBuild(d.build).poder);
    i += 1;
  }
  return { build: d.build, curva };
};

const poderes: number[] = [];
for (let s = 0; s < 400; s += 1) {
  const seed = `medir-${s}`;
  const rng = sortearEm(seed, 'escolha');
  const { build, curva } = completar(seed, (ops) => rng.escolher(ops as any[]));
  const a = avaliarBuild(build);
  poderes.push(a.poder);
  if (s < 3) console.log(`curva ${seed}: ${curva.join(' ')} | sinergia ${a.sinergia} | faixa ${a.faixa}`);
}
poderes.sort((a, b) => a - b);
const q = (p: number) => poderes[Math.floor((poderes.length - 1) * p)];
console.log(`vazia=${avaliarBuild(buildVazia('guerreiro', false)).poder} min=${q(0)} p10=${q(0.1)} mediana=${q(0.5)} p90=${q(0.9)} max=${q(1)}`);
