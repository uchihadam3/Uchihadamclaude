import { TelaDeArte } from './tela.js';

/*
 * A cena da tela inicial.
 *
 * Ela não é o campo de batalha: é a **fortaleza vista de fora**, à noite,
 * antes de entrar. Uma torre enorme ao fundo, muralhas em socalcos, ruínas na
 * frente, e um portão aceso lá no alto — o lugar para onde a run vai.
 *
 * A regra que governa tudo aqui é que a cena precisa estar **viva mesmo
 * parada**. Um fundo estático com um botão por cima é a definição de tela de
 * menu de protótipo. Então: tochas que pulsam, bandeiras que ondulam, névoa
 * que atravessa, brasas que sobem, quatro planos em parallax. Nada disso pede
 * atenção; tudo isso impede o olho de concluir que a imagem é um cartaz.
 */

export const LARGURA = 448;
export const ALTURA = 180;
/** A linha em que as ruínas da frente se apoiam. */
export const BASE = 168;

const semente = (n: number): (() => number) => {
  let estado = n >>> 0;
  return () => {
    estado = (Math.imul(estado ^ (estado >>> 15), 0x2545f491) + 0x9e3779b9) >>> 0;
    return estado / 4294967296;
  };
};

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/** Céu noturno, do roxo profundo ao azul frio, com estrelas e uma lua baixa. */
export const ceu = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(2213);

  for (let y = 0; y < ALTURA; y += 1) {
    const f = y / ALTURA;
    /* Escuro em cima, clareando na direção do horizonte. */
    const escala = Math.max(0, Math.min(3.999, 0.2 + f * 2.6));
    const baixo = Math.floor(escala);
    const mistura = escala - baixo;
    const naTransicao = mistura > 0.84 || mistura < 0.16;
    for (let x = 0; x < LARGURA; x += 1) {
      if (!naTransicao) {
        t.pixel(x, y, 'acoEscuro', baixo);
        continue;
      }
      const limiar = ((BAYER[y & 3]?.[x & 3] ?? 0) + 0.5) / 16;
      t.pixel(x, y, 'acoEscuro', baixo + (limiar < mistura ? 1 : 0));
    }
  }

  /* Estrelas, só na metade de cima, e poucas. */
  for (let i = 0; i < 70; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const y = Math.round(rnd() * ALTURA * 0.5);
    t.pixel(x, y, 'aco', rnd() < 0.25 ? 4 : 3);
  }

  /*
   * A lua, baixa e grande.
   *
   * Ela fica atrás da torre de propósito: a silhueta da fortaleza recortada
   * contra o disco é o que dá a escala monumental que a arquitetura sozinha
   * não conseguiria sugerir.
   */
  const luaX = Math.round(LARGURA * 0.8);
  const luaY = Math.round(ALTURA * 0.24);
  t.elipse(luaX, luaY, 26, 26, 'ouro', 2);
  t.elipse(luaX, luaY, 24, 24, 'ouro', 3);
  t.elipse(luaX - 3, luaY - 3, 19, 19, 'ouro', 4);
  /* Crateras, em tom mais baixo. */
  for (const [dx, dy, r] of [
    [-6, 2, 4],
    [7, -5, 3],
    [3, 9, 2.4],
    [-11, -8, 2],
  ] as const) {
    t.elipse(luaX + dx, luaY + dy, r, r, 'ouro', 3);
  }
  /* O halo. */
  for (let raio = 27; raio < 38; raio += 1) {
    const forca = 1 - (raio - 27) / 11;
    for (let a = 0; a < 360; a += 3) {
      const rad = (a * Math.PI) / 180;
      const x = luaX + Math.cos(rad) * raio;
      const y = luaY + Math.sin(rad) * raio;
      const tom = t.tomEm(x, y);
      if (tom === null || tom > 2 || forca < 0.45) continue;
      t.pixel(x, y, 'acoEscuro', Math.min(4, tom + 1));
    }
  }

  return t.resolver();
};

/** As montanhas distantes: silhueta chapada, sem detalhe nenhum. */
export const montanhas = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(771);
  const base = Math.round(ALTURA * 0.62);
  let x = -10;
  while (x < LARGURA + 20) {
    const largura = 40 + Math.round(rnd() * 50);
    const altura = 24 + Math.round(rnd() * 36);
    for (let i = 0; i <= largura; i += 1) {
      const f = i / largura;
      const h = Math.round(Math.sin(f * Math.PI) * altura);
      for (let y = base - h; y < base + 30; y += 1) t.pixel(x + i, y, 'acoEscuro', 1);
    }
    x += Math.round(largura * 0.66);
  }
  return t.resolver();
};

export interface Fortaleza {
  readonly tela: HTMLCanvasElement;
  /** Onde nascem as tochas da muralha. */
  readonly tochas: readonly (readonly [number, number])[];
  /** Onde ficam os mastros das bandeiras. */
  readonly bandeiras: readonly (readonly [number, number])[];
}

/**
 * A fortaleza.
 *
 * Em socalcos: muralha baixa na frente, corpo no meio, torre enorme atrás. É
 * a disposição que produz monumentalidade sem precisar de detalhe — o olho lê
 * três degraus de altura e conclui "isto é grande".
 */
export const fortaleza = (): Fortaleza => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(60613);
  const tochas: [number, number][] = [];
  const bandeiras: [number, number][] = [];
  const base = BASE - 6;

  /** Um corpo de pedra com fiadas, ameias e frestas acesas. */
  const bloco = (
    x0: number,
    largura: number,
    topo: number,
    ameias: boolean,
    frestas: boolean,
  ): void => {
    for (let y = topo; y < base; y += 1) {
      for (let dx = 0; dx < largura; dx += 1) {
        const lateral = dx / largura;
        const tom = lateral < 0.1 ? 2 : lateral < 0.46 ? 1 : lateral < 0.86 ? 1 : 0;
        t.pixel(x0 + dx, y, 'aco', tom);
      }
      if ((y - topo) % 13 === 0) {
        for (let dx = Math.round(largura * 0.5); dx < largura - 1; dx += 1) {
          t.pixel(x0 + dx, y, 'aco', 0);
        }
      }
    }
    if (ameias) {
      for (let dx = 0; dx < largura; dx += 9) {
        t.retangulo(x0 + dx, topo - 5, 5, 5, 'aco', 1);
        t.retangulo(x0 + dx, topo - 5, 5, 1, 'aco', 2);
      }
    }
    if (frestas) {
      for (let dx = 6; dx < largura - 4; dx += 17) {
        if (rnd() > 0.55) continue;
        const y = topo + 8 + Math.round(rnd() * (base - topo - 20));
        t.retangulo(x0 + dx, y, 3, 6, 'ouro', 1);
        t.retangulo(x0 + dx, y, 3, 2, 'ouro', 3);
      }
    }
  };

  /* A torre central, altíssima. */
  const torreX = Math.round(LARGURA * 0.52) - 22;
  bloco(torreX, 44, 40, true, true);
  /* O telhado cônico da torre. */
  for (let i = 0; i < 22; i += 1) {
    const meio = Math.round(22 - i);
    t.retangulo(torreX + 22 - meio, 35 - i + 1, meio * 2, 1, 'pano', i < 4 ? 3 : i < 12 ? 2 : 1);
  }
  bandeiras.push([torreX + 22, 12]);

  /* Duas torres menores, uma de cada lado. */
  bloco(torreX - 44, 30, 70, true, true);
  bloco(torreX + 46, 34, 64, true, true);
  bandeiras.push([torreX - 30, 42]);
  bandeiras.push([torreX + 62, 36]);

  /* A muralha da frente, que atravessa a tela inteira. */
  bloco(-6, LARGURA + 12, 104, true, false);

  /*
   * O portão.
   *
   * É o ponto mais aceso da imagem, e de propósito: é para onde a run vai. O
   * olho precisa encontrá-lo sem que nada o aponte.
   */
  const portaoX = torreX + 22;
  for (let i = 0; i < 26; i += 1) {
    const meio = Math.round(Math.sqrt(Math.max(0, 1 - (i / 26) ** 2)) * 13);
    for (let dx = -meio; dx <= meio; dx += 1) {
      t.pixel(portaoX + dx, base - i, 'ouro', i < 10 ? 2 : i < 18 ? 3 : 4);
    }
  }
  /* A arcada de pedra em volta do portão. */
  for (let i = 0; i < 30; i += 1) {
    const meio = Math.round(Math.sqrt(Math.max(0, 1 - (i / 30) ** 2)) * 17);
    t.pixel(portaoX - meio, base - i, 'aco', 2);
    t.pixel(portaoX - meio - 1, base - i, 'aco', 1);
    t.pixel(portaoX + meio, base - i, 'aco', 0);
    t.pixel(portaoX + meio + 1, base - i, 'aco', 0);
  }

  /* As tochas da muralha, em intervalos regulares. */
  for (let x = 16; x < LARGURA; x += 34) {
    if (Math.abs(x - portaoX) < 26) continue;
    tochas.push([x, 96]);
    t.retangulo(x - 1, 98, 2, 4, 'bronze', 2);
  }

  return { tela: t.resolver(), tochas, bandeiras };
};

/**
 * O primeiro plano: ruínas escuras que emolduram a composição.
 *
 * Quase silhueta. Elas existem para fechar as laterais e a base da tela e
 * empurrar o olho para o centro — e para que o logo, quando entrar, tenha uma
 * moldura escura para se apoiar em vez de flutuar no céu.
 */
export const frente = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(88117);

  /* Duas colunas partidas, uma de cada lado, bem escuras. */
  for (const [x, largura, altura] of [
    [Math.round(LARGURA * 0.07), 18, 74],
    [Math.round(LARGURA * 0.82), 22, 92],
  ] as const) {
    for (let y = ALTURA - altura; y < ALTURA; y += 1) {
      for (let dx = 0; dx < largura; dx += 1) {
        t.pixel(x + dx, y, 'aco', dx < 2 ? 1 : 0);
      }
      if ((y + x) % 12 === 0) t.retangulo(x + 2, y, largura - 3, 1, 'aco', 0);
    }
    for (let d = 0; d < 5; d += 1) {
      t.retangulo(x + Math.round(rnd() * (largura - 3)), ALTURA - altura - d, 3, 1, 'aco', 0);
    }
  }

  /* Pedras caídas e mato, na borda de baixo. */
  for (let i = 0; i < 9; i += 1) {
    const cx = Math.round(rnd() * LARGURA);
    const r = 5 + rnd() * 12;
    t.elipse(cx, ALTURA + r * 0.4, r, r * 0.55, 'aco', 0);
  }
  for (let x = 0; x < LARGURA; x += 1) {
    const altura = 3 + Math.round(Math.abs(Math.sin(x * 0.17) + Math.sin(x * 0.053)) * 6);
    for (let h = 0; h < altura; h += 1) t.pixel(x, ALTURA - 1 - h, 'carne', 0);
  }
  for (let i = 0; i < 70; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const h = 7 + Math.round(rnd() * 15);
    for (let d = 0; d < h; d += 1) {
      t.pixel(x + Math.round(Math.sin(d * 0.36) * 2), ALTURA - 1 - d, 'carne', 0);
    }
  }
  return t.resolver();
};
