import { describe, expect, it } from 'vitest';

import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { BOSSES } from '../dados/bosses.js';

import { atributosDaBuild } from './build.js';
import { aplicarRecompensa } from './checkpoint.js';
import { abrirCombate, passo } from './combate.js';
import { DT } from './relogio.js';
import {
  desfechoAoCair,
  desfechoAoVencer,
  ehElite,
  expParaSubir,
  iniciarRun,
  inimigoDaSala,
  vencerSala,
} from './run.js';
import { build, inimigo, passiva, semCritico } from './apoio-de-teste.js';

describe('progressão da run', () => {
  it('começa na sala 1, com Vida cheia e as poções da área', () => {
    const corpo = build();
    const run = iniciarRun(corpo, 'SEED', 'manual');
    expect(run.sala).toBe(1);
    expect(run.vida).toBe(atributosDaBuild(corpo, 1).vidaMaxima);
    expect(run.pocoes).toBe(BALANCEAMENTO.pocoes.porArea);
    expect(run.venceu).toBe(false);
  });

  it('CASO D · a Vida que sobrou de uma sala é a Vida em que a próxima começa', () => {
    const corpo = build();
    const run = iniciarRun(corpo, 'SEED', 'manual');
    /* Sem EXP não há nível novo, então a Vida atravessa sem curar nada. */
    const depois = vencerSala(run, 42, 2, 0, 12);

    expect(depois.niveisGanhos).toBe(0);
    expect(depois.run.vida).toBe(42);
    expect(depois.run.sala).toBe(2);

    const proxima = abrirCombate(
      corpo,
      inimigo({ id: 'i' }),
      { vida: depois.run.vida, pocoes: depois.run.pocoes, nivel: depois.run.nivel, exp: depois.run.exp },
      10,
    );
    expect(proxima.jogador.vida).toBe(42);
  });

  it('CASO E · subir de nível aumenta a Vida máxima e cura uma vez só', () => {
    const corpo = build();
    const run = iniciarRun(corpo, 'SEED', 'manual');
    const maximoAntes = atributosDaBuild(corpo, run.nivel).vidaMaxima;

    const depois = vencerSala(run, 50, 3, expParaSubir(run.nivel), 10);
    expect(depois.niveisGanhos).toBe(1);

    const maximoDepois = atributosDaBuild(corpo, depois.run.nivel).vidaMaxima;
    expect(maximoDepois).toBe(maximoAntes + BALANCEAMENTO.jogador.vidaPorNivel);
    /* A cura é exatamente a Vida que o nível deu — nem mais, nem duas vezes. */
    expect(depois.run.vida).toBe(50 + BALANCEAMENTO.jogador.vidaPorNivel);
  });

  it('a cura do nível nunca passa da Vida máxima nova', () => {
    const corpo = build();
    const run = iniciarRun(corpo, 'SEED', 'manual');
    const maximo = atributosDaBuild(corpo, 2).vidaMaxima;
    const depois = vencerSala(run, maximo, 3, expParaSubir(1), 10);
    expect(depois.run.vida).toBe(maximo);
  });

  it('as poções enchem ao fechar uma área, e não no meio dela', () => {
    const corpo = build();
    const run = iniciarRun(corpo, 'SEED', 'manual');

    const meio = vencerSala({ ...run, sala: 5 }, 100, 0, 0, 10);
    expect(meio.refilDePocoes).toBe(false);
    expect(meio.run.pocoes).toBe(0);

    for (const sala of [10, 20, 30, 40]) {
      const fim = vencerSala({ ...run, sala }, 100, 0, 0, 10);
      expect(fim.refilDePocoes, `sala ${String(sala)}`).toBe(true);
      expect(fim.run.pocoes).toBe(BALANCEAMENTO.pocoes.porArea);
      expect(fim.checkpoint, `checkpoint da sala ${String(sala)}`).toBe(true);
      expect(fim.run.bossesDerrotados).toBe(1);
    }
  });

  it('a sala 50 enche as poções mas não abre checkpoint: ela fecha a dungeon', () => {
    const run = iniciarRun(build(), 'SEED', 'manual');
    const fim = vencerSala({ ...run, sala: 50 }, 100, 0, 0, 30);
    expect(fim.refilDePocoes).toBe(true);
    expect(fim.checkpoint).toBe(false);
    expect(fim.run.venceu).toBe(true);
    expect(fim.run.tempoDoBossFinalS).toBe(30);
  });

  it('as salas de boss são 10, 20, 30, 40 e 50, e nenhuma delas é elite', () => {
    const salasDeBoss = [10, 20, 30, 40, 50];
    for (let sala = 1; sala <= 50; sala += 1) {
      const alvo = inimigoDaSala('SEED', sala);
      const ehBoss = alvo.porte === 'boss';
      expect(ehBoss, `sala ${String(sala)}`).toBe(salasDeBoss.includes(sala));
      if (ehBoss) expect(ehElite(sala)).toBe(false);
    }
    expect(BOSSES).toHaveLength(5);
  });

  it('o inimigo fica mais duro conforme a dungeon avança', () => {
    const cedo = inimigoDaSala('SEED', 2);
    const tarde = inimigoDaSala('SEED', 45);
    expect(tarde.vida).toBeGreaterThan(cedo.vida);
    expect(tarde.dano).toBeGreaterThan(cedo.dano);
  });

  it('a mesma seed produz a mesma sequência de inimigos', () => {
    const uma = Array.from({ length: 50 }, (_, i) => inimigoDaSala('ABC12345', i + 1).id);
    const outra = Array.from({ length: 50 }, (_, i) => inimigoDaSala('ABC12345', i + 1).id);
    const diferente = Array.from({ length: 50 }, (_, i) => inimigoDaSala('ZZZ99999', i + 1).id);
    expect(uma).toEqual(outra);
    expect(uma).not.toEqual(diferente);
  });
});

describe('desfecho da run', () => {
  const comBoss50 = () => {
    const run = iniciarRun(build(), 'SEED', 'manual');
    return vencerSala({ ...run, sala: 50 }, 80, 3, 0, 40).run;
  };

  it('vencer o Boss 50 sem despertar o Soberano conclui a classe', () => {
    const desfecho = desfechoAoVencer(comBoss50(), false);
    expect(desfecho.venceu).toBe(true);
    expect(desfecho.derrotouSoberano).toBe(false);
    expect(desfecho.salaAlcancada).toBe(50);
  });

  it('REGRESSÃO · perder para o Soberano NÃO apaga a vitória do Boss 50', () => {
    /*
     * O fluxo antigo chamava o fechamento com `venceu: false` fixo sempre que
     * o jogador caía, sem olhar para a run. Quem despertava o Soberano e
     * perdia recebia tela de derrota e perdia a classe concluída — a run mais
     * bem jogada do jogo era a única punida por ter ido além.
     */
    const noSoberano = { ...comBoss50(), despertou: true };
    expect(noSoberano.sala).toBe(51);

    const desfecho = desfechoAoCair(noSoberano);
    expect(desfecho.venceu).toBe(true);
    expect(desfecho.derrotouSoberano).toBe(false);
    /* E a tela mostra 50, não 51: a sala escondida não é a quinquagésima primeira. */
    expect(desfecho.salaAlcancada).toBe(50);
  });

  it('derrotar o Soberano marca a maestria', () => {
    const desfecho = desfechoAoVencer({ ...comBoss50(), despertou: true }, true);
    expect(desfecho.venceu).toBe(true);
    expect(desfecho.derrotouSoberano).toBe(true);
    expect(desfecho.salaAlcancada).toBe(50);
  });

  it('cair antes do Boss 50 é derrota comum', () => {
    const run = iniciarRun(build(), 'SEED', 'manual');
    const desfecho = desfechoAoCair({ ...run, sala: 23 });
    expect(desfecho.venceu).toBe(false);
    expect(desfecho.salaAlcancada).toBe(23);
  });
});

describe('recompensas de checkpoint', () => {
  it('REGRESSÃO · um equipamento de checkpoint não vira uma passiva do draft', () => {
    /*
     * A versão anterior empurrava bênçãos e equipamentos para `passivas`. Uma
     * run que passasse pelos quatro checkpoints terminava exibindo sete
     * passivas, com o jogo inteiro dizendo que são três.
     */
    const corpo = build({ passivas: [passiva({ id: 'p-do-draft' })] });
    const depois = aplicarRecompensa(corpo, {
      tipo: 'equipamento',
      id: 'r-eq-teste',
      nome: 'Elmo de Teste',
      descricao: '',
      tags: ['defesa'],
      modificadores: { vidaMaxima: 30 },
    });

    expect(depois.passivas).toHaveLength(1);
    expect(depois.passivas[0]?.id).toBe('p-do-draft');
    expect(depois.upgrades).toHaveLength(1);
    expect(depois.upgrades[0]?.id).toBe('r-eq-teste');
  });

  it('os modificadores de uma recompensa somam nos atributos', () => {
    const corpo = build();
    const antes = atributosDaBuild(corpo, 1).vidaMaxima;
    const depois = aplicarRecompensa(corpo, {
      tipo: 'bencao',
      id: 'r-b-teste',
      nome: 'Bênção de Teste',
      descricao: '',
      tags: [],
      modificadores: { vidaMaxima: 40 },
    });
    expect(atributosDaBuild(depois, 1).vidaMaxima).toBe(antes + 40);
  });
});

describe('o especial que ignora Armadura', () => {
  it('REGRESSÃO · o Canto Dissonante atinge a Vida com a Armadura cheia', () => {
    /*
     * O boss 30 estava documentado como "ignora Armadura por completo" e não
     * havia campo nenhum dizendo isso — o motor mandava o golpe pelo caminho
     * normal e a placa absorvia tudo. O comentário mentia.
     */
    const coro = BOSSES.find((b) => b.nome === 'Coro das Profundezas');
    expect(coro?.especial?.ignoraArmadura).toBe(true);

    const corpo = build({
      passivas: [passiva({ id: 'p-placa', modificadores: { armaduraMaxima: 500 } })],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({
      id: 'i-coro',
      vida: 100_000,
      dano: 0,
      intervaloS: 999,
      especial: { nome: 'Canto Dissonante', aCadaS: 0.1, dano: 40, ignoraArmadura: true },
    });

    const estado = abrirCombate(corpo, alvo, { vida: 200, pocoes: 0, nivel: 1, exp: 0 }, 10);
    const vidaInicial = estado.jogador.vida;
    const armaduraInicial = estado.jogador.armadura;
    expect(armaduraInicial).toBeGreaterThan(100);

    let atual = estado;
    for (let t = 0; t < 0.2; t += DT) {
      atual = passo(atual, { build: corpo, atributos, rng: semCritico() }, DT).estado;
    }

    /* A Vida caiu, e a Armadura continua lá: o golpe passou ao lado dela. */
    expect(atual.jogador.vida).toBeLessThan(vidaInicial);
    expect(atual.jogador.armadura).toBeGreaterThanOrEqual(armaduraInicial);
  });

  it('um especial comum continua sendo absorvido pela Armadura', () => {
    const corpo = build({
      passivas: [passiva({ id: 'p-placa', modificadores: { armaduraMaxima: 500 } })],
    });
    const atributos = atributosDaBuild(corpo, 1);
    const alvo = inimigo({
      id: 'i-comum',
      vida: 100_000,
      dano: 0,
      intervaloS: 999,
      especial: { nome: 'Pancada', aCadaS: 0.1, dano: 40 },
    });

    const inicio = abrirCombate(corpo, alvo, { vida: 200, pocoes: 0, nivel: 1, exp: 0 }, 10);
    /* A Vida inicial é cortada no máximo da build, e é dela que partimos. */
    const vidaInicial = inicio.jogador.vida;
    let atual = inicio;
    for (let t = 0; t < 0.2; t += DT) {
      atual = passo(atual, { build: corpo, atributos, rng: semCritico() }, DT).estado;
    }
    expect(atual.jogador.vida).toBe(vidaInicial);
  });
});
