/*
 * A bancada de balanceamento.
 *
 * Ela monta builds automaticamente — fraca, média, boa e focada — e roda runs
 * inteiras sem tela, imprimindo o que a direção do jogo cobrou: quanto dura
 * uma luta, até onde cada build chega, e em que nível a run termina. É o
 * instrumento, não o jogo: nada aqui entra no bundle.
 */
import { EQUIPAMENTOS } from '../src/dados/equipamentos.js';
import { GUERREIRO_ATIVAS } from '../src/dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../src/dados/guerreiro-passivas.js';
import type { Tag } from '../src/dados/tipos.js';
import type { BuildParcial } from '../src/nucleo/build.js';
import { avaliarBuild } from '../src/nucleo/poder.js';
import { criarAleatorio } from '../src/nucleo/rng.js';
import { simularRun } from '../src/nucleo/simular.js';

const porTag = (tag: Tag): BuildParcial => ({
  classe: 'guerreiro',
  dourada: false,
  ativas: [...GUERREIRO_ATIVAS]
    .sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag)))
    .slice(0, 4),
  passivas: [...GUERREIRO_PASSIVAS]
    .sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag)))
    .slice(0, 3),
  equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) => {
    const doSlot = EQUIPAMENTOS.filter((e) => e.slot === slot);
    const comTag = doSlot.find((e) => e.tags.includes(tag));
    return comTag ?? doSlot[0]!;
  }),
});

const aleatoria = (semente: string): BuildParcial => {
  const rng = criarAleatorio(semente);
  return {
    classe: 'guerreiro',
    dourada: false,
    ativas: rng.amostrar(GUERREIRO_ATIVAS, 4),
    passivas: rng.amostrar(GUERREIRO_PASSIVAS, 3),
    equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) =>
      rng.escolher(EQUIPAMENTOS.filter((e) => e.slot === slot)),
    ),
  };
};

const media = (lista: readonly number[]): number =>
  lista.length === 0 ? 0 : lista.reduce((a, b) => a + b, 0) / lista.length;

const f = (n: number, casas = 1): string => n.toFixed(casas).padStart(6);

const builds: readonly (readonly [string, BuildParcial])[] = [
  ['Ruptura   ', porTag('ruptura')],
  ['Momentum  ', porTag('momentum')],
  ['Defesa    ', porTag('defesa')],
  ['Combo     ', porTag('combo')],
  ['Aleatória1', aleatoria('a1')],
  ['Aleatória2', aleatoria('a2')],
  ['Aleatória3', aleatoria('a3')],
  ['Aleatória4', aleatoria('a4')],
];

console.log('build        poder sin |  sala  nível |  normal  elite   boss | tempo');
console.log('-'.repeat(78));

let vitorias = 0;
for (const [nome, build] of builds) {
  const avaliacao = avaliarBuild(build);
  const corridas = [1, 2, 3].map((n) => simularRun(build, `SEED${n}`));
  const salaMedia = media(corridas.map((r) => r.salaAlcancada));
  const nivelMedio = media(corridas.map((r) => r.nivelFinal));
  const venceuAlguma = corridas.filter((r) => r.venceu).length;
  vitorias += venceuAlguma;
  const normal = media(corridas.flatMap((r) => r.duracoes.normal));
  const elite = media(corridas.flatMap((r) => r.duracoes.elite));
  const boss = media(corridas.flatMap((r) => r.duracoes.boss));
  const tempo = media(corridas.map((r) => r.tempoTotalS));
  console.log(
    `${nome} ${String(avaliacao.poder).padStart(5)} ${avaliacao.sinergia}   |` +
      `${f(salaMedia, 0)} ${f(nivelMedio)} |` +
      `${f(normal)}s ${f(elite)}s ${f(boss)}s |${f(tempo / 60)}min  ${'★'.repeat(venceuAlguma)}`,
  );
}
console.log('-'.repeat(78));
console.log(`vitórias: ${vitorias} de ${builds.length * 3} runs`);
