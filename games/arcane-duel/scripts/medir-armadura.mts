/*
 * A pergunta da direção: a regeneração de Armadura faz o inimigo comum
 * nunca alcançar a Vida? Mede, não opina.
 */
import { BALANCEAMENTO } from '../src/dados/balanceamento.js';
import { bossDaSala } from '../src/dados/bosses.js';
import { classePorId } from '../src/dados/classes.js';
import { EQUIPAMENTOS } from '../src/dados/equipamentos.js';
import { GUERREIRO_ATIVAS } from '../src/dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../src/dados/guerreiro-passivas.js';
import type { Tag } from '../src/dados/tipos.js';
import type { BuildParcial } from '../src/nucleo/build.js';
import { atributosDaBuild } from '../src/nucleo/build.js';
import { abrirCombate, passo } from '../src/nucleo/combate.js';
import { sortearEm } from '../src/nucleo/rng.js';
import { ehElite, inimigoDaSala } from '../src/nucleo/run.js';

const porTag = (tag: Tag): BuildParcial => ({
  classe: 'guerreiro', dourada: false, upgrades: [],
  ativas: [...GUERREIRO_ATIVAS].sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag))).slice(0, 4),
  passivas: [...GUERREIRO_PASSIVAS].sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag))).slice(0, 3),
  equipamentos: (['arma', 'armadura', 'reliquia'] as const).map((slot) => {
    const doSlot = EQUIPAMENTOS.filter((e) => e.slot === slot);
    return doSlot.find((e) => e.tags.includes(tag)) ?? doSlot[0]!;
  }),
});

const dt = BALANCEAMENTO.passoDaSimulacaoS;

interface Linha { porte: string; absorvido: number; naVida: number; duracao: number; quebrou: boolean }

const medir = (build: BuildParcial, seed: string, nivel: number): Linha[] => {
  const linhas: Linha[] = [];
  for (let sala = 1; sala <= 50; sala += 1) {
    const inimigo = inimigoDaSala(seed, sala);
    const atributos = atributosDaBuild(build, nivel);
    let estado = abrirCombate(build, inimigo, { vida: atributos.vidaMaxima, pocoes: 3, nivel, exp: 0 }, classePorId('guerreiro').recurso.maximo);
    const contexto = { build, atributos, rng: sortearEm(seed, `luta:${sala}`) };
    let absorvido = 0;
    let naVida = 0;
    let quebrou = false;
    for (let i = 0; i < 30 * 600 && !estado.terminou; i += 1) {
      const r = passo(estado, contexto, dt);
      estado = r.estado;
      for (const e of r.eventos) {
        if (e.tipo === 'golpe' && e.origem === 'inimigo') { absorvido += e.absorvido; naVida += e.naVida; }
        if (e.tipo === 'armadura-quebrada' && e.alvo === 'jogador') quebrou = true;
      }
    }
    const porte = bossDaSala(sala) !== null ? 'boss' : ehElite(sala) ? 'elite' : 'normal';
    linhas.push({ porte, absorvido, naVida, duracao: estado.tempoS, quebrou });
  }
  return linhas;
};

for (const [nome, build] of [['Combo', porTag('combo')], ['Defesa', porTag('defesa')], ['Ruptura', porTag('ruptura')]] as const) {
  for (const nivel of [1, 12, 22]) {
    const linhas = medir(build, 'MEDE0001', nivel);
    const atributos = atributosDaBuild(build, nivel);
    for (const porte of ['normal', 'elite', 'boss'] as const) {
      const d = linhas.filter((l) => l.porte === porte);
      const total = d.reduce((a, l) => a + l.absorvido + l.naVida, 0);
      const vida = d.reduce((a, l) => a + l.naVida, 0);
      const chegaram = d.filter((l) => l.naVida > 0.5).length;
      const quebraram = d.filter((l) => l.quebrou).length;
      const dur = d.reduce((a, l) => a + l.duracao, 0) / Math.max(1, d.length);
      console.log(
        `${nome.padEnd(8)} nv${String(nivel).padStart(2)} ${porte.padEnd(6)} | dano na Vida ${(total === 0 ? 0 : (vida / total) * 100).toFixed(0).padStart(3)}% | salas que chegam à Vida ${String(chegaram).padStart(2)}/${String(d.length).padStart(2)} | armadura quebrada ${String(quebraram).padStart(2)}/${String(d.length).padStart(2)} | regen ${atributos.regeneracaoDeArmadura.toFixed(1)}/s | duração média ${dur.toFixed(1)}s`,
      );
    }
  }
}
