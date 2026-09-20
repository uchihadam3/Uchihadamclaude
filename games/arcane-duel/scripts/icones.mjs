/*
 * Os ícones do app.
 *
 * Eles são gerados, e não desenhados à mão num editor, pelo mesmo motivo que
 * o resto da arte deste jogo: o ícone precisa usar a **mesma** rampa de ouro,
 * o mesmo aço e o mesmo vermelho das telas. Um ícone importado de fora sempre
 * destoa um tom, e o lugar onde isso mais aparece é a gaveta de aplicativos,
 * ao lado de ícones profissionais.
 *
 * Não há canvas no Node, então o desenho é feito num buffer RGBA cru e o PNG
 * é codificado à mão (assinatura, IHDR, IDAT com deflate do zlib, IEND). É
 * pouco código e evita uma dependência nativa só para isto.
 */

import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DESTINO = resolve(AQUI, '../public/icones');

/* A mesma rampa de ouro das telas. */
const OURO = ['#4a3410', '#7a5a1c', '#b8933f', '#e8c76a', '#fff0c0'];
const ACO = ['#2a2e3e', '#454c63', '#6b748f', '#98a2bd', '#c6cee3'];
const FUNDO = ['#070509', '#0d0a12', '#14101d', '#1d1830'];
const RUBI = '#c0392b';

const cor = (hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
  255,
];

/** Uma grade de pixels de arte, resolvida depois para o tamanho final. */
class Grade {
  constructor(lado) {
    this.lado = lado;
    this.dados = new Uint8Array(lado * lado * 4);
  }
  por(x, y, hex, alfa = 255) {
    const px = Math.round(x);
    const py = Math.round(y);
    if (px < 0 || py < 0 || px >= this.lado || py >= this.lado) return;
    const [r, g, b] = cor(hex);
    const i = (py * this.lado + px) * 4;
    const a = alfa / 255;
    const fundo = this.dados[i + 3] / 255;
    this.dados[i] = Math.round(this.dados[i] * fundo * (1 - a) + r * a);
    this.dados[i + 1] = Math.round(this.dados[i + 1] * fundo * (1 - a) + g * a);
    this.dados[i + 2] = Math.round(this.dados[i + 2] * fundo * (1 - a) + b * a);
    this.dados[i + 3] = Math.round(255 * (a + fundo * (1 - a)));
  }
  retangulo(x, y, l, a, hex) {
    for (let dy = 0; dy < a; dy += 1) for (let dx = 0; dx < l; dx += 1) this.por(x + dx, y + dy, hex);
  }
  /** Uma linha grossa, usada para as lâminas. */
  linha(x0, y0, x1, y1, grossura, hex) {
    const passos = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2;
    for (let i = 0; i <= passos; i += 1) {
      const f = i / passos;
      const x = x0 + (x1 - x0) * f;
      const y = y0 + (y1 - y0) * f;
      const meio = grossura / 2;
      for (let dy = -meio; dy <= meio; dy += 0.5) {
        for (let dx = -meio; dx <= meio; dx += 0.5) this.por(x + dx, y + dy, hex);
      }
    }
  }
  losango(cx, cy, raio, hex) {
    for (let dy = -raio; dy <= raio; dy += 1) {
      const largura = raio - Math.abs(dy);
      for (let dx = -largura; dx <= largura; dx += 1) this.por(cx + dx, cy + dy, hex);
    }
  }
}

/**
 * O desenho.
 *
 * Duas lâminas cruzadas atrás, um losango arcano na frente, um rubi no
 * centro. É a mesma marca do logo da tela inicial, reduzida ao que ainda se
 * lê a 48 pixels na gaveta do telefone: sem serrilha fina, sem texto.
 */
const desenhar = (lado, { moldura, margem }) => {
  const g = new Grade(lado);
  const c = lado / 2;

  /* A chapa de fundo, com um clarão no alto. */
  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const d = Math.hypot(x - c, y - c * 0.82) / lado;
      const tom = d < 0.2 ? 3 : d < 0.34 ? 2 : d < 0.46 ? 1 : 0;
      g.por(x, y, FUNDO[tom]);
    }
  }

  if (moldura) {
    /* Uma moldura de ouro, com a aresta de luz em cima. */
    const m = Math.round(lado * 0.045);
    for (let i = 0; i < m; i += 1) {
      const hex = i < m / 2 ? OURO[1] : OURO[2];
      g.retangulo(i, i, lado - i * 2, 1, i === 0 ? OURO[3] : hex);
      g.retangulo(i, lado - 1 - i, lado - i * 2, 1, OURO[0]);
      g.retangulo(i, i, 1, lado - i * 2, hex);
      g.retangulo(lado - 1 - i, i, 1, lado - i * 2, OURO[0]);
    }
  }

  /* As duas lâminas cruzadas. */
  const r = lado * (0.5 - margem);
  const grossura = Math.max(2, Math.round(lado * 0.055));
  for (const [dx, dy] of [
    [1, 1],
    [1, -1],
  ]) {
    g.linha(c - r * dx, c - r * dy, c + r * dx, c + r * dy, grossura, ACO[1]);
    g.linha(c - r * dx, c - r * dy, c + r * dx * 0.92, c + r * dy * 0.92, grossura * 0.5, ACO[3]);
    /* A guarda, em bronze, perto da ponta de baixo. */
    g.linha(
      c + r * dx * 0.52 - dy * grossura,
      c + r * dy * 0.52 + dx * grossura,
      c + r * dx * 0.52 + dy * grossura,
      c + r * dy * 0.52 - dx * grossura,
      grossura * 0.6,
      OURO[1],
    );
  }

  /* O losango arcano, na frente. */
  const raio = Math.round(lado * (0.30 - margem * 0.5));
  g.losango(c, c, raio, OURO[1]);
  g.losango(c, c, Math.round(raio * 0.82), OURO[2]);
  g.losango(c, c, Math.round(raio * 0.6), OURO[3]);
  g.losango(c - raio * 0.1, c - raio * 0.14, Math.round(raio * 0.32), OURO[4]);
  /* O vazado e o rubi. */
  g.losango(c, c, Math.round(raio * 0.26), FUNDO[0]);
  g.losango(c, c, Math.round(raio * 0.17), RUBI);
  g.losango(c - raio * 0.04, c - raio * 0.05, Math.round(raio * 0.08), '#ff8a75');

  return g;
};

/** Amplia por repetição de pixel — nada de interpolação em arte de pixel. */
const ampliar = (g, fator) => {
  const lado = g.lado * fator;
  const saida = new Uint8Array(lado * lado * 4);
  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const o = (Math.floor(y / fator) * g.lado + Math.floor(x / fator)) * 4;
      const i = (y * lado + x) * 4;
      saida[i] = g.dados[o];
      saida[i + 1] = g.dados[o + 1];
      saida[i + 2] = g.dados[o + 2];
      saida[i + 3] = g.dados[o + 3];
    }
  }
  return { lado, dados: saida };
};

/* ------------------------------------------------------------------------
 * O codificador de PNG.
 * --------------------------------------------------------------------- */

const crcTabela = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

const crc = (buf) => {
  let c = -1;
  for (const b of buf) c = crcTabela[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

const pedaco = (tipo, dados) => {
  const corpo = Buffer.concat([Buffer.from(tipo, 'latin1'), dados]);
  const tamanho = Buffer.alloc(4);
  tamanho.writeUInt32BE(dados.length);
  const soma = Buffer.alloc(4);
  soma.writeUInt32BE(crc(corpo));
  return Buffer.concat([tamanho, corpo, soma]);
};

const png = ({ lado, dados }) => {
  const linhas = Buffer.alloc(lado * (lado * 4 + 1));
  for (let y = 0; y < lado; y += 1) {
    linhas[y * (lado * 4 + 1)] = 0;
    Buffer.from(dados.buffer, y * lado * 4, lado * 4).copy(linhas, y * (lado * 4 + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(lado, 0);
  ihdr.writeUInt32BE(lado, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pedaco('IHDR', ihdr),
    pedaco('IDAT', deflateSync(linhas, { level: 9 })),
    pedaco('IEND', Buffer.alloc(0)),
  ]);
};

/* ------------------------------------------------------------------------ */

mkdirSync(DESTINO, { recursive: true });

const saidas = [
  /* Os ícones normais: moldura encostando na borda, como um brasão. */
  ['icone-192.png', desenhar(48, { moldura: true, margem: 0.16 }), 4],
  ['icone-512.png', desenhar(64, { moldura: true, margem: 0.16 }), 8],
  /*
   * O maskable é diferente de propósito.
   *
   * O Android recorta o ícone num círculo ou num squircle, e o que estiver
   * perto da borda some. Então aqui não há moldura, o fundo é cheio, e o
   * desenho vive na zona segura central.
   */
  ['icone-maskable-512.png', desenhar(64, { moldura: false, margem: 0.28 }), 8],
];

for (const [nome, grade, fator] of saidas) {
  writeFileSync(resolve(DESTINO, nome), png(ampliar(grade, fator)));
  console.log('gerado', nome, `${grade.lado * fator}x${grade.lado * fator}`);
}
