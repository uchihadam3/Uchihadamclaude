import { BALANCEAMENTO } from '../dados/balanceamento.js';
import { classePorId } from '../dados/classes.js';
import { avaliarBuild } from '../nucleo/poder.js';
import { ajustar } from '../fase/pixel.js';

import type { DadosDoResultado } from './telas/Fluxo.js';

/*
 * O card de resultado.
 *
 * Ele é desenhado num canvas, no formato quadrado que as redes aceitam em
 * todo lugar, e sai pela Web Share API quando ela existe — ou como download
 * quando não existe. Não há integração com rede nenhuma: postar é do jogador,
 * e um jogo pequeno não precisa pedir permissão de conta a ninguém.
 *
 * O formato vertical está previsto no mesmo desenho, mudando só a altura.
 */

const LARGURA = 1080;
const ALTURA = 1080;

const desenharCard = (dados: DadosDoResultado): HTMLCanvasElement => {
  const tela = document.createElement('canvas');
  tela.width = LARGURA;
  tela.height = ALTURA;
  const ctx = tela.getContext('2d');
  if (ctx === null) return tela;

  const classe = classePorId(dados.build.classe);
  const avaliacao = avaliarBuild(dados.build);
  const dourado = dados.derrotouSoberano;
  const destaque = dourado ? '#e8b44a' : classe.corPrimaria;

  /* O fundo: o mesmo escuro do jogo, com uma queda de luz do alto. */
  const fundo = ctx.createLinearGradient(0, 0, 0, ALTURA);
  fundo.addColorStop(0, '#1b1626');
  fundo.addColorStop(1, '#0d0a12');
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  const halo = ctx.createRadialGradient(LARGURA / 2, 180, 40, LARGURA / 2, 180, 620);
  halo.addColorStop(0, `${destaque}33`);
  halo.addColorStop(1, '#00000000');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  /* A moldura, em degraus — a mesma gramática da interface. */
  ctx.lineWidth = 8;
  ctx.strokeStyle = ajustar(destaque, -0.35);
  ctx.strokeRect(36, 36, LARGURA - 72, ALTURA - 72);
  ctx.strokeStyle = destaque;
  ctx.strokeRect(52, 52, LARGURA - 104, ALTURA - 104);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#efe6d2';
  ctx.font = '600 44px ui-monospace, monospace';
  ctx.fillText('ARCANE DUEL', LARGURA / 2, 168);

  ctx.fillStyle = destaque;
  ctx.font = '700 72px ui-monospace, monospace';
  ctx.fillText(
    dados.venceu ? 'DUNGEON CONCLUÍDA' : `SALA ${dados.salaAlcancada} / ${BALANCEAMENTO.dungeon.totalDeSalas}`,
    LARGURA / 2,
    290,
  );

  if (dourado) {
    ctx.fillStyle = '#ffe9a8';
    ctx.font = '600 38px ui-monospace, monospace';
    ctx.fillText('MAESTRIA DOURADA', LARGURA / 2, 350);
  }

  ctx.fillStyle = '#efe6d2';
  ctx.font = '600 46px ui-monospace, monospace';
  ctx.fillText(classe.nome.toUpperCase(), LARGURA / 2, dourado ? 430 : 400);

  ctx.font = '400 34px ui-monospace, monospace';
  ctx.fillStyle = '#9a8f7e';
  ctx.fillText(
    `PODER ${avaliacao.poder} · ${avaliacao.faixa.toUpperCase()}   SINERGIA ${'◆'.repeat(avaliacao.sinergia)}`,
    LARGURA / 2,
    dourado ? 490 : 460,
  );

  /* As dez escolhas, em três colunas. É o que faz o card valer a pena olhar. */
  const escolhas = [
    ...dados.build.ativas.map((a) => a.nome),
    ...dados.build.passivas.map((p) => p.nome),
    ...dados.build.equipamentos.map((e) => e.nome),
  ];
  ctx.font = '400 28px ui-monospace, monospace';
  ctx.textAlign = 'left';
  escolhas.forEach((nome, i) => {
    const coluna = i % 2;
    const linha = Math.floor(i / 2);
    ctx.fillStyle = i < 4 ? destaque : i < 7 ? '#c9bda8' : '#9a8f7e';
    ctx.fillText(nome, 140 + coluna * 420, 580 + linha * 56);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#6d6455';
  ctx.font = '400 30px ui-monospace, monospace';
  ctx.fillText(`SEED ${dados.seed}`, LARGURA / 2, ALTURA - 110);

  return tela;
};

const paraBlob = async (tela: HTMLCanvasElement): Promise<Blob | null> =>
  new Promise((resolver) => {
    tela.toBlob((blob) => {
      resolver(blob);
    }, 'image/png');
  });

/** Compartilha, ou baixa quando o aparelho não souber compartilhar arquivo. */
export const compartilharResultado = async (dados: DadosDoResultado): Promise<void> => {
  const tela = desenharCard(dados);
  const blob = await paraBlob(tela);
  if (blob === null) return;

  const arquivo = new File([blob], 'arcane-duel.png', { type: 'image/png' });
  const navegador = globalThis.navigator;

  if (
    typeof navegador.canShare === 'function' &&
    navegador.canShare({ files: [arquivo] }) &&
    typeof navegador.share === 'function'
  ) {
    try {
      await navegador.share({ files: [arquivo], title: 'Arcane Duel' });
      return;
    } catch {
      /* O jogador cancelou. Cai para o download, que nunca falha calado. */
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `arcane-duel-${dados.seed}.png`;
  link.click();
  globalThis.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};
