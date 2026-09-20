/* Diagnóstico: quanto a build de referência bate e quanto ela aguenta. */
import { BALANCEAMENTO } from '../src/dados/balanceamento.js';
import { EQUIPAMENTOS } from '../src/dados/equipamentos.js';
import { GUERREIRO_ATIVAS } from '../src/dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../src/dados/guerreiro-passivas.js';
import type { BuildParcial } from '../src/nucleo/build.js';
import { atributosDaBuild } from '../src/nucleo/build.js';
import { abrirCombate, passo } from '../src/nucleo/combate.js';
import { criarAleatorio } from '../src/nucleo/rng.js';
import { inimigoDaSala } from '../src/nucleo/run.js';

const rng = criarAleatorio('ref');
const referencia: BuildParcial = {
  classe: 'guerreiro',
  dourada: false,
  ativas: rng.amostrar(GUERREIRO_ATIVAS, 4),
  passivas: rng.amostrar(GUERREIRO_PASSIVAS, 3),
  equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) =>
    rng.escolher(EQUIPAMENTOS.filter((e) => e.slot === slot)),
  ),
};
console.log('referência:', referencia.ativas.map((a) => a.nome).join(' · '));

/** Bate num saco de pancada com vida infinita por N segundos. */
const dpsNoNivel = (nivel: number): number => {
  const { especial: _ignorado, ...base } = inimigoDaSala('X', 1);
  const saco = { ...base, vida: 1e9, armadura: 0, dano: 0 };
  let estado = abrirCombate(referencia, saco, { vida: 1e9, pocoes: 0, nivel, exp: 0 }, 10);
  const contexto = { build: referencia, atributos: atributosDaBuild(referencia, nivel), rng };
  const dt = BALANCEAMENTO.passoDaSimulacaoS;
  const segundos = 30;
  for (let i = 0; i < segundos / dt; i += 1) estado = passo(estado, contexto, dt).estado;
  return (1e9 - estado.inimigo.vida) / segundos;
};

console.log('\nnível   DPS   VidaMax  ArmMax  VidaEfetiva');
for (const nivel of [1, 5, 10, 15, 20, 25]) {
  const a = atributosDaBuild(referencia, nivel);
  const efetiva = (a.vidaMaxima + a.armaduraMaxima) / (1 - a.reducaoDeDano);
  console.log(
    `${String(nivel).padStart(5)} ${dpsNoNivel(nivel).toFixed(1).padStart(6)} ` +
      `${String(a.vidaMaxima).padStart(8)} ${String(a.armaduraMaxima).padStart(7)} ` +
      `${efetiva.toFixed(0).padStart(11)}`,
  );
}

console.log('\nsala  inimigo                vida   arm   dano/s  nível esperado');
for (const sala of [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]) {
  const i = inimigoDaSala('X', sala);
  const dps = i.dano / i.intervaloS + (i.especial ? i.especial.dano / i.especial.aCadaS : 0);
  console.log(
    `${String(sala).padStart(4)}  ${i.nome.padEnd(22)} ${String(i.vida).padStart(5)} ` +
      `${String(i.armadura).padStart(5)} ${dps.toFixed(1).padStart(7)}`,
  );
}

/* Quanta EXP a run inteira oferece, para conferir a curva de nível. */
let exp = 0;
for (let sala = 1; sala <= 50; sala += 1) exp += inimigoDaSala('X', sala).exp;
let nivel = 1;
let acumulada = exp;
while (acumulada >= BALANCEAMENTO.experiencia.base + BALANCEAMENTO.experiencia.porNivel * nivel) {
  acumulada -= BALANCEAMENTO.experiencia.base + BALANCEAMENTO.experiencia.porNivel * nivel;
  nivel += 1;
}
console.log(`\nEXP total da dungeon: ${exp}  →  nível final ${nivel}`);
