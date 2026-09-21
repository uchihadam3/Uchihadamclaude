import { describe, expect, it } from 'vitest';

import { BENCAOS, EQUIPAMENTOS_DE_CHECKPOINT } from '../dados/recompensas.js';
import type { Recompensa } from '../dados/recompensas.js';
import { GUERREIRO_ATIVAS } from '../dados/guerreiro-ativas.js';
import { GUERREIRO_PASSIVAS } from '../dados/guerreiro-passivas.js';

import { build as montar } from './apoio-de-teste.js';
import { atributosDaBuild } from './build.js';
import { aplicarRecompensa, escolhaAutomatica, ofertaDeCheckpoint } from './checkpoint.js';

/*
 * Os checkpoints das salas 10, 20, 30 e 40.
 *
 * Dois contratos moram aqui. O primeiro é a oferta: três opções, sempre, sem
 * repetição, iguais para a mesma seed. O segundo é o que a direção cobrou em
 * cima de um defeito real — a recompensa **não** pode virar uma passiva do
 * draft, porque a tela de resultado passava a mostrar sete passivas num jogo
 * que promete três.
 */

const buildDeTeste = () =>
  montar({
    ativas: GUERREIRO_ATIVAS.slice(0, 4),
    passivas: GUERREIRO_PASSIVAS.slice(0, 3),
  });

describe('a oferta do checkpoint', () => {
  it('traz sempre três opções distintas, nos quatro checkpoints', () => {
    for (let s = 0; s < 40; s += 1) {
      for (const numero of [1, 2, 3, 4]) {
        const oferta = ofertaDeCheckpoint(buildDeTeste(), `cp-${s}`, numero);
        expect(oferta.opcoes).toHaveLength(3);
        const ids = new Set(oferta.opcoes.map((o) => o.id));
        expect(ids.size).toBe(3);
      }
    }
  });

  it('a mesma seed e a mesma build dão a mesma oferta', () => {
    const a = ofertaDeCheckpoint(buildDeTeste(), 'IGUAL01', 2);
    const b = ofertaDeCheckpoint(buildDeTeste(), 'IGUAL01', 2);
    expect(a.opcoes.map((o) => o.id)).toEqual(b.opcoes.map((o) => o.id));
  });

  it('checkpoints diferentes da mesma run não repetem a mesma oferta inteira', () => {
    const build = buildDeTeste();
    const vistas = [1, 2, 3, 4].map((n) =>
      ofertaDeCheckpoint(build, 'VARIA01', n)
        .opcoes.map((o) => o.id)
        .join('|'),
    );
    expect(new Set(vistas).size).toBeGreaterThan(1);
  });

  it('cada opção é de um tipo que o jogo sabe aplicar', () => {
    const conhecidos = new Set(['evolucao', 'bencao', 'equipamento']);
    for (let s = 0; s < 20; s += 1) {
      for (const opcao of ofertaDeCheckpoint(buildDeTeste(), `tipo-${s}`, 1).opcoes) {
        expect(conhecidos.has(opcao.tipo)).toBe(true);
      }
    }
  });
});

describe('aplicar a recompensa', () => {
  it('um equipamento de checkpoint entra em upgrades, não em passivas', () => {
    /*
     * Regressão do defeito que a direção apontou. O draft entrega exatamente
     * três passivas; se o checkpoint empurrar as dele para a mesma lista, o
     * jogo passa a contradizer a própria regra na tela final.
     */
    const antes = buildDeTeste();
    const equipamento = EQUIPAMENTOS_DE_CHECKPOINT[0];
    expect(equipamento).toBeDefined();
    const depois = aplicarRecompensa(antes, equipamento as Recompensa);

    expect(depois.passivas).toHaveLength(antes.passivas.length);
    expect(depois.passivas.map((p) => p.id)).toEqual(antes.passivas.map((p) => p.id));
    expect(depois.upgrades).toHaveLength(antes.upgrades.length + 1);
    expect(depois.upgrades.at(-1)?.id).toBe(equipamento?.id);
  });

  it('uma bênção também entra em upgrades', () => {
    const bencao = BENCAOS[0];
    expect(bencao).toBeDefined();
    const depois = aplicarRecompensa(buildDeTeste(), bencao as Recompensa);
    expect(depois.upgrades.map((u) => u.id)).toContain(bencao?.id);
    expect(depois.passivas).toHaveLength(3);
  });

  it('quatro checkpoints somam quatro upgrades e nunca mexem nas três passivas', () => {
    let build = buildDeTeste();
    for (let n = 1; n <= 4; n += 1) {
      const oferta = ofertaDeCheckpoint(build, 'QUATRO01', n);
      const escolhida = escolhaAutomatica(build, oferta, 0.8);
      build = aplicarRecompensa(build, escolhida);
    }
    expect(build.passivas).toHaveLength(3);
    expect(build.ativas).toHaveLength(4);
    expect(build.upgrades.length + build.ativas.filter((a) => a.nome.endsWith('+')).length).toBe(4);
  });

  it('os modificadores do upgrade chegam nos atributos', () => {
    const vitalidade = BENCAOS.find(
      (b) => b.tipo !== 'evolucao' && (b.modificadores.vidaMaxima ?? 0) > 0,
    );
    expect(vitalidade).toBeDefined();
    const antes = buildDeTeste();
    const depois = aplicarRecompensa(antes, vitalidade as Recompensa);
    expect(atributosDaBuild(depois, 12).vidaMaxima).toBeGreaterThan(
      atributosDaBuild(antes, 12).vidaMaxima,
    );
  });

  it('uma evolução mexe só na habilidade escolhida', () => {
    const build = buildDeTeste();
    const alvo = build.ativas[0];
    expect(alvo).toBeDefined();
    const evolucao: Recompensa = {
      tipo: 'evolucao',
      id: `r-ev-${alvo?.id ?? ''}`,
      nome: `${alvo?.nome ?? ''} +`,
      descricao: '',
      danoExtra: 8,
      cortaCooldown: 0.15,
      tags: alvo?.tags ?? [],
    };
    const depois = aplicarRecompensa(build, evolucao);

    expect(depois.ativas).toHaveLength(build.ativas.length);
    expect(depois.upgrades).toHaveLength(0);
    expect(depois.ativas[0]?.nome).toBe(`${alvo?.nome ?? ''} +`);
    expect(depois.ativas[0]?.cooldownS).toBeLessThan(alvo?.cooldownS ?? 0);
    /* As outras três ficam intactas. */
    for (let i = 1; i < depois.ativas.length; i += 1) {
      expect(depois.ativas[i]).toEqual(build.ativas[i]);
    }
  });

  it('a evolução soma dano só nos efeitos de dano', () => {
    const comDano = GUERREIRO_ATIVAS.find((a) =>
      a.efeitos.some((e) => e.tipo === 'dano' || e.tipo === 'dano-perfurante'),
    );
    expect(comDano).toBeDefined();
    const build = montar({ ativas: comDano === undefined ? [] : [comDano] });
    const depois = aplicarRecompensa(build, {
      tipo: 'evolucao',
      id: `r-ev-${comDano?.id ?? ''}`,
      nome: '',
      descricao: '',
      danoExtra: 8,
      cortaCooldown: 0.15,
      tags: [],
    });
    const antesDoDano = comDano?.efeitos.find((e) => e.tipo === 'dano' || e.tipo === 'dano-perfurante');
    const depoisDoDano = depois.ativas[0]?.efeitos.find(
      (e) => e.tipo === 'dano' || e.tipo === 'dano-perfurante',
    );
    expect(depoisDoDano?.valor).toBe((antesDoDano?.valor ?? 0) + 8);
  });
});

describe('a escolha automática', () => {
  it('escolhe uma das três opções ofertadas', () => {
    for (let s = 0; s < 30; s += 1) {
      const build = buildDeTeste();
      const oferta = ofertaDeCheckpoint(build, `auto-${s}`, 1);
      const escolhida = escolhaAutomatica(build, oferta, 0.9);
      expect(oferta.opcoes.map((o) => o.id)).toContain(escolhida.id);
    }
  });

  it('machucada, prefere defesa ou cura quando a oferta tem uma', () => {
    /*
     * Com Vida baixa o desempate muda de lado. O teste só cobra quando a
     * oferta de fato contém uma opção defensiva — senão estaria cobrando uma
     * escolha que não existe.
     */
    let cobrados = 0;
    for (let s = 0; s < 60; s += 1) {
      const build = buildDeTeste();
      const oferta = ofertaDeCheckpoint(build, `ferida-${s}`, 3);
      const temDefensiva = oferta.opcoes.some(
        (o) => o.tags.includes('defesa') || o.tags.includes('cura'),
      );
      if (!temDefensiva) continue;
      const comVida = escolhaAutomatica(build, oferta, 0.95);
      const semVida = escolhaAutomatica(build, oferta, 0.2);
      if (comVida.id !== semVida.id) {
        expect(semVida.tags.includes('defesa') || semVida.tags.includes('cura')).toBe(true);
        cobrados += 1;
      }
    }
    expect(cobrados).toBeGreaterThan(0);
  });

  it('é determinística: a mesma situação dá a mesma escolha', () => {
    const build = buildDeTeste();
    const oferta = ofertaDeCheckpoint(build, 'DETERM01', 2);
    expect(escolhaAutomatica(build, oferta, 0.7).id).toBe(escolhaAutomatica(build, oferta, 0.7).id);
  });
});
