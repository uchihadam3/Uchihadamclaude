import Phaser from 'phaser';

import { ajustar } from './pixel.js';

/*
 * Os efeitos.
 *
 * A hierarquia é a regra que manda aqui, e ela foi pedida explicitamente:
 * ataque básico dá feedback pequeno, skill dá médio, ultimate dá grande, boss
 * dá especial. Sacudir a tela a cada golpe básico não é polimento — é ruído,
 * e depois de dez segundos o jogador para de sentir qualquer coisa. O tremor
 * só existe quando há o que comemorar.
 */

/** Um número que sobe e some. É o feedback mais barato e o mais importante. */
export const numeroFlutuante = (
  cena: Phaser.Scene,
  x: number,
  y: number,
  texto: string,
  cor: string,
  tamanho: number,
): void => {
  const rotulo = cena.add
    .text(x, y, texto, {
      fontFamily: 'monospace',
      fontSize: `${tamanho}px`,
      color: cor,
      stroke: '#0b0810',
      strokeThickness: Math.max(3, Math.round(tamanho / 4)),
    })
    .setOrigin(0.5, 1)
    .setDepth(900);

  /* Sai para um lado ao acaso: dois números no mesmo lugar viram um borrão. */
  const desvio = (Math.random() - 0.5) * 22;
  cena.tweens.add({
    targets: rotulo,
    y: y - 28,
    x: x + desvio,
    alpha: { from: 1, to: 0 },
    scale: { from: 1.25, to: 0.9 },
    ease: 'Cubic.easeOut',
    duration: 760,
    onComplete: () => {
      rotulo.destroy();
    },
  });
};

/** Um clarão curto no ponto de impacto. */
export const clarao = (cena: Phaser.Scene, x: number, y: number, cor: number, raio: number): void => {
  const circulo = cena.add.circle(x, y, raio, cor, 0.85).setDepth(880).setBlendMode(Phaser.BlendModes.ADD);
  cena.tweens.add({
    targets: circulo,
    scale: { from: 0.4, to: 1.8 },
    alpha: { from: 0.9, to: 0 },
    duration: 220,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      circulo.destroy();
    },
  });
};

/** Lascas que voam do ponto de impacto. */
export const estilhacos = (
  cena: Phaser.Scene,
  x: number,
  y: number,
  cor: number,
  quantidade: number,
): void => {
  for (let i = 0; i < quantidade; i += 1) {
    const angulo = Math.PI * (0.9 + Math.random() * 1.2);
    const forca = 22 + Math.random() * 52;
    const lasca = cena.add.rectangle(x, y, 2, 2, cor).setDepth(870);
    cena.tweens.add({
      targets: lasca,
      x: x + Math.cos(angulo) * forca,
      y: y + Math.sin(angulo) * forca * 0.7,
      alpha: { from: 1, to: 0 },
      angle: Math.random() * 360,
      duration: 380 + Math.random() * 260,
      ease: 'Quad.easeOut',
      onComplete: () => {
        lasca.destroy();
      },
    });
  }
};

/**
 * A quebra de Armadura.
 *
 * Ela merece vocabulário próprio: um anel que estoura para fora, em ciano, e
 * nunca a mesma cor do dano. Ruptura é o momento em que a build do jogador
 * está funcionando, e ele precisa reconhecer isso sem ler número nenhum.
 */
export const anelDeRuptura = (cena: Phaser.Scene, x: number, y: number): void => {
  const anel = cena.add.circle(x, y, 7).setDepth(885).setStrokeStyle(2, 0x8ad6ff, 1).setFillStyle();
  cena.tweens.add({
    targets: anel,
    scale: { from: 0.5, to: 2.6 },
    alpha: { from: 1, to: 0 },
    duration: 420,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      anel.destroy();
    },
  });
  estilhacos(cena, x, y, 0x8ad6ff, 10);
};

/** O rastro de um golpe atravessando: um arco curto, não uma linha reta. */
export const arcoDeGolpe = (
  cena: Phaser.Scene,
  x: number,
  y: number,
  paraDireita: boolean,
  cor: string,
): void => {
  /*
   * O arco é desenhado na origem e **posicionado** depois.
   *
   * Desenhá-lo nas coordenadas do mundo e então aplicar `scaleX` escalava em
   * torno do canto do mundo, não do arco: o rastro saía voando para o meio da
   * tela em vez de abrir no lugar do golpe.
   */
  const grafico = cena.add.graphics().setDepth(875).setPosition(x, y);
  const sentido = paraDireita ? 1 : -1;
  grafico.lineStyle(2, Number.parseInt(ajustar(cor, 0.4).slice(1), 16), 0.95);
  grafico.beginPath();
  grafico.arc(0, 0, 22, -Math.PI * 0.42 * sentido, Math.PI * 0.42 * sentido, !paraDireita);
  grafico.strokePath();
  cena.tweens.add({
    targets: grafico,
    alpha: { from: 1, to: 0 },
    scaleX: { from: 0.7, to: 1.25 },
    duration: 200,
    onComplete: () => {
      grafico.destroy();
    },
  });
};

/**
 * A pausa de impacto.
 *
 * Alguns quadros congelados no instante do golpe. É o truque mais barato de
 * todos e o que mais muda a sensação de peso — sem ele, um golpe forte e um
 * fraco têm exatamente a mesma textura no tempo.
 */
export const pausaDeImpacto = (cena: Phaser.Scene, ms: number): void => {
  const relogio = cena.time;
  const antes = relogio.timeScale;
  relogio.timeScale = 0.06;
  globalThis.setTimeout(() => {
    relogio.timeScale = antes;
  }, ms);
};
