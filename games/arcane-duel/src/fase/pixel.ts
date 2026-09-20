/*
 * A oficina de pixel art.
 *
 * Nada neste jogo carrega imagem de terceiro. Tudo o que aparece na tela é
 * desenhado aqui, pixel a pixel, num canvas pequeno que depois é ampliado com
 * vizinho-mais-próximo. É isso que faz o placeholder ter personalidade em vez
 * de ser um quadrado de debug — e é o que permite trocar por arte final
 * depois sem mexer em nada além deste arquivo e dos que o chamam.
 *
 * Duas regras valem para todo desenho daqui:
 *
 *   1. **Luz vem de cima e da esquerda.** Toda forma ganha uma aresta clara
 *      nessa direção e uma sombra na oposta. Sem isso, pixel art lê como
 *      recorte de papel colorido.
 *   2. **Contorno escuro, nunca preto puro.** Preto puro serrilha e achata;
 *      um tom escuro da própria cor mantém o volume.
 */

export type Tela = HTMLCanvasElement;

export interface Pincel {
  readonly largura: number;
  readonly altura: number;
  readonly pixel: (x: number, y: number, cor: string) => void;
  readonly retangulo: (x: number, y: number, l: number, a: number, cor: string) => void;
  readonly elipse: (cx: number, cy: number, rx: number, ry: number, cor: string) => void;
  readonly ler: (x: number, y: number) => string | null;
}

/** Cria um canvas de arte e devolve um pincel que trabalha em pixels inteiros. */
export const criarTela = (largura: number, altura: number): { tela: Tela; pincel: Pincel } => {
  const tela = document.createElement('canvas');
  tela.width = largura;
  tela.height = altura;
  const ctx = tela.getContext('2d');
  if (ctx === null) throw new Error('sem contexto 2d');
  ctx.imageSmoothingEnabled = false;

  const ocupado = new Map<string, string>();

  const pixel = (x: number, y: number, cor: string): void => {
    const px = Math.round(x);
    const py = Math.round(y);
    if (px < 0 || py < 0 || px >= largura || py >= altura) return;
    ctx.fillStyle = cor;
    ctx.fillRect(px, py, 1, 1);
    ocupado.set(`${px},${py}`, cor);
  };

  const retangulo = (x: number, y: number, l: number, a: number, cor: string): void => {
    for (let dy = 0; dy < a; dy += 1) {
      for (let dx = 0; dx < l; dx += 1) pixel(x + dx, y + dy, cor);
    }
  };

  const elipse = (cx: number, cy: number, rx: number, ry: number, cor: string): void => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
        const nx = (x + 0.5 - cx) / Math.max(0.5, rx);
        const ny = (y + 0.5 - cy) / Math.max(0.5, ry);
        if (nx * nx + ny * ny <= 1) pixel(x, y, cor);
      }
    }
  };

  const ler = (x: number, y: number): string | null =>
    ocupado.get(`${Math.round(x)},${Math.round(y)}`) ?? null;

  return { tela, pincel: { largura, altura, pixel, retangulo, elipse, ler } };
};

/* ---------------------------------------------------------------------------
 * Cor.
 * ------------------------------------------------------------------------- */

const paraRgb = (hex: string): [number, number, number] => {
  const limpo = hex.replace('#', '');
  const cheio =
    limpo.length === 3
      ? limpo
          .split('')
          .map((c) => c + c)
          .join('')
      : limpo;
  const n = Number.parseInt(cheio.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const paraHex = (r: number, g: number, b: number): string =>
  `#${[r, g, b]
    .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0'))
    .join('')}`;

/** Clareia (`quanto` > 0) ou escurece (`quanto` < 0) uma cor. */
export const ajustar = (hex: string, quanto: number): string => {
  const [r, g, b] = paraRgb(hex);
  const alvo = quanto > 0 ? 255 : 0;
  const t = Math.abs(quanto);
  return paraHex(r + (alvo - r) * t, g + (alvo - g) * t, b + (alvo - b) * t);
};

/** Mistura duas cores. `t` de 0 a 1. */
export const misturar = (a: string, b: string, t: number): string => {
  const [r1, g1, b1] = paraRgb(a);
  const [r2, g2, b2] = paraRgb(b);
  return paraHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
};

/* ---------------------------------------------------------------------------
 * Acabamento.
 * ------------------------------------------------------------------------- */

/**
 * Contorna o que já foi desenhado.
 *
 * O contorno nasce da **própria cor** do pixel vizinho, escurecida — e não de
 * um preto único. É a diferença entre uma peça com volume e um adesivo: um
 * contorno preto uniforme achata tudo o que ele cerca.
 */
export const contornar = (pincel: Pincel, forca = 0.55): void => {
  const marcas: { x: number; y: number; cor: string }[] = [];
  for (let y = 0; y < pincel.altura; y += 1) {
    for (let x = 0; x < pincel.largura; x += 1) {
      if (pincel.ler(x, y) !== null) continue;
      const vizinhos = [
        pincel.ler(x - 1, y),
        pincel.ler(x + 1, y),
        pincel.ler(x, y - 1),
        pincel.ler(x, y + 1),
      ].filter((c): c is string => c !== null);
      const primeiro = vizinhos[0];
      if (primeiro !== undefined) marcas.push({ x, y, cor: ajustar(primeiro, -forca) });
    }
  }
  for (const marca of marcas) pincel.pixel(marca.x, marca.y, marca.cor);
};

/**
 * Sombreia o que já existe, com a luz vindo de cima e da esquerda.
 *
 * A conta é simples de propósito: quanto mais baixo e mais à direita o pixel
 * está dentro da silhueta, mais escuro ele fica. Isso basta para o olho ler
 * volume, e não exige normal map nem nada que uma peça de 24 pixels não
 * comporte.
 */
export const sombrear = (pincel: Pincel, intensidade = 0.3): void => {
  const marcas: { x: number; y: number; cor: string }[] = [];
  for (let y = 0; y < pincel.altura; y += 1) {
    for (let x = 0; x < pincel.largura; x += 1) {
      const cor = pincel.ler(x, y);
      if (cor === null) continue;
      const nx = x / pincel.largura;
      const ny = y / pincel.altura;
      const luz = (1 - nx) * 0.35 + (1 - ny) * 0.65;
      marcas.push({ x, y, cor: ajustar(cor, (luz - 0.5) * intensidade * 2) });
    }
  }
  for (const marca of marcas) pincel.pixel(marca.x, marca.y, marca.cor);
};

/** Granulação: quebra chapados sem virar ruído. Determinística pela semente. */
export const granular = (pincel: Pincel, semente: number, forca = 0.1): void => {
  let estado = semente >>> 0;
  const proximo = (): number => {
    estado = (Math.imul(estado ^ (estado >>> 15), 0x2545f491) + 0x9e3779b9) >>> 0;
    return estado / 4294967296;
  };
  for (let y = 0; y < pincel.altura; y += 1) {
    for (let x = 0; x < pincel.largura; x += 1) {
      const cor = pincel.ler(x, y);
      if (cor === null) continue;
      if (proximo() < 0.28) pincel.pixel(x, y, ajustar(cor, (proximo() - 0.5) * forca * 2));
    }
  }
};

/** Amplia um canvas por um fator inteiro, sem suavizar. */
export const ampliar = (tela: Tela, fator: number): Tela => {
  const destino = document.createElement('canvas');
  destino.width = tela.width * fator;
  destino.height = tela.height * fator;
  const ctx = destino.getContext('2d');
  if (ctx === null) return tela;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tela, 0, 0, destino.width, destino.height);
  return destino;
};
