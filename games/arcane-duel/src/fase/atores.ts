import type { Classe, SilhuetaDoInimigo } from '../dados/tipos.js';

import type { Pincel, Tela } from './pixel.js';
import { ajustar, contornar, criarTela, granular, misturar, sombrear } from './pixel.js';

/*
 * Os corpos.
 *
 * Cada inimigo é desenhado a partir da forma declarada nos dados — humanoide,
 * besta, espectro, construto, aberração — com as cores dele. Não há sprite
 * salvo em lugar nenhum: a silhueta nasce da descrição, e por isso um inimigo
 * novo é três linhas de dado, não um arquivo de arte.
 *
 * As poses existem porque parado é morto. Cada ator sai em três quadros —
 * repouso, respiração e golpe — e o golpe tem **antecipação**: o corpo recua
 * antes de avançar. É o recuo que faz o impacto ter peso; sem ele o golpe
 * parece um recorte deslizando.
 */

export type Pose = 'repouso' | 'respiro' | 'golpe';

const POSES: readonly Pose[] = ['repouso', 'respiro', 'golpe'];

interface Corpo {
  readonly corpo: string;
  readonly detalhe: string;
  readonly brilho: string;
  readonly largura: number;
  readonly altura: number;
}

/** O deslocamento de cada pose: quanto o corpo sobe e quanto ele se inclina. */
const deslocamentoDaPose = (pose: Pose): { sobe: number; avanca: number } => {
  switch (pose) {
    case 'repouso':
      return { sobe: 0, avanca: 0 };
    case 'respiro':
      return { sobe: -1, avanca: 0 };
    case 'golpe':
      /* Recua **e** sobe: a antecipação do golpe, não o golpe em si. */
      return { sobe: -2, avanca: -2 };
  }
};

/*
 * O humanoide.
 *
 * A primeira versão era um boneco de blocos — tronco, cabeça redonda, dois
 * postes — e lia como placeholder de debug com cor bonita. O que faz uma
 * silhueta de pixel art parecer **personagem** é sempre a mesma lista curta,
 * e ela está toda aqui: ombreira que alarga a parte de cima, cintura estreita,
 * arma que quebra o contorno, elmo com crista e olhos acesos. Nenhuma delas
 * custa mais que meia dúzia de pixels; juntas, mudam a leitura.
 */
const desenharHumanoide = (p: Pincel, c: Corpo, pose: Pose): void => {
  const { sobe, avanca } = deslocamentoDaPose(pose);
  const cx = Math.floor(c.largura / 2) + avanca;
  const base = c.altura - 1 + sobe;
  const golpeando = pose === 'golpe';

  const alturaDaPerna = Math.round(c.altura * 0.3);
  const alturaDoTronco = Math.round(c.altura * 0.38);
  const topoDoTronco = base - alturaDaPerna - alturaDoTronco;
  const escuro = ajustar(c.corpo, -0.3);

  /* Pernas, uma à frente da outra: parado de perfil, nunca em posição de sentido. */
  const larguraDaPerna = Math.max(2, Math.round(c.largura * 0.17));
  p.retangulo(cx - larguraDaPerna - 1, base - alturaDaPerna, larguraDaPerna, alturaDaPerna, escuro);
  p.retangulo(
    cx + 1 + (golpeando ? 1 : 0),
    base - alturaDaPerna,
    larguraDaPerna,
    alturaDaPerna,
    c.corpo,
  );
  /* Os pés, que impedem a perna de terminar no ar. */
  p.retangulo(cx - larguraDaPerna - 2, base - 1, larguraDaPerna + 2, 1, escuro);
  p.retangulo(cx + 1 + (golpeando ? 1 : 0), base - 1, larguraDaPerna + 2, 1, escuro);

  /* Tronco com cintura: estreita no meio, larga no peito. */
  for (let y = 0; y < alturaDoTronco; y += 1) {
    const t = y / alturaDoTronco;
    const cintura = 1 - Math.sin(t * Math.PI) * 0.22;
    const meio = Math.max(2, Math.round((c.largura * 0.44 * cintura) / 2));
    p.retangulo(cx - meio, topoDoTronco + y, meio * 2, 1, c.detalhe);
  }

  /* O cinto: uma linha escura que separa tronco de pernas. */
  p.retangulo(cx - Math.round(c.largura * 0.2), topoDoTronco + alturaDoTronco - 1, Math.round(c.largura * 0.4), 1, escuro);

  /* A ombreira, na frente. É ela que dá porte ao boneco. */
  const ombroY = topoDoTronco + 1;
  p.retangulo(cx + Math.round(c.largura * 0.1), ombroY - 1, Math.round(c.largura * 0.26), 3, c.corpo);
  p.retangulo(cx + Math.round(c.largura * 0.1), ombroY - 1, Math.round(c.largura * 0.26), 1, ajustar(c.corpo, 0.25));

  /*
   * A arma, que é o que mais muda entre repouso e golpe.
   *
   * Em repouso ela desce ao lado do corpo; no golpe sobe atrás da cabeça, e
   * o braço acompanha. É esse contraste que faz o quadro de ataque ser lido
   * como ataque mesmo num sprite de trinta pixels.
   */
  const bracoX = cx + Math.round(c.largura * 0.24);
  if (golpeando) {
    p.retangulo(bracoX, topoDoTronco - 2, 2, Math.round(alturaDoTronco * 0.6), c.corpo);
    /* Lâmina erguida, inclinada para trás. */
    for (let i = 0; i < Math.round(c.altura * 0.42); i += 1) {
      p.retangulo(bracoX - Math.round(i * 0.45), topoDoTronco - 3 - i, 2, 1, c.brilho);
    }
    p.retangulo(bracoX - 1, topoDoTronco - 3, 4, 1, escuro);
  } else {
    p.retangulo(bracoX, topoDoTronco + 2, 2, Math.round(alturaDoTronco * 0.7), c.corpo);
    for (let i = 0; i < Math.round(c.altura * 0.34); i += 1) {
      p.retangulo(bracoX + 1, topoDoTronco + Math.round(alturaDoTronco * 0.7) + i, 2, 1, misturar(c.brilho, c.corpo, 0.35));
    }
  }

  /* Cabeça: quadrada com queixo, e não uma bola. */
  const larguraDaCabeca = Math.max(4, Math.round(c.largura * 0.42));
  const alturaDaCabeca = Math.max(4, Math.round(c.altura * 0.2));
  const cabecaX = cx - Math.round(larguraDaCabeca / 2) + 1;
  const cabecaY = topoDoTronco - alturaDaCabeca;
  p.retangulo(cabecaX, cabecaY, larguraDaCabeca, alturaDaCabeca, c.detalhe);
  p.retangulo(cabecaX + 1, cabecaY + alturaDaCabeca - 1, larguraDaCabeca - 2, 1, ajustar(c.detalhe, -0.25));

  /* Elmo com crista: a aba na testa e o penacho no alto. */
  p.retangulo(cabecaX - 1, cabecaY + 1, larguraDaCabeca + 2, 2, c.corpo);
  p.retangulo(cabecaX + Math.round(larguraDaCabeca / 2) - 1, cabecaY - 2, 2, 3, c.brilho);

  /* Os olhos, acesos. Dois pixels, e o boneco passa a olhar para algum lugar. */
  const olhoY = cabecaY + Math.round(alturaDaCabeca * 0.55);
  p.pixel(cabecaX + 1, olhoY, c.brilho);
  p.pixel(cabecaX + larguraDaCabeca - 2, olhoY, c.brilho);
};

const desenharBesta = (p: Pincel, c: Corpo, pose: Pose): void => {
  const { sobe, avanca } = deslocamentoDaPose(pose);
  const base = c.altura - 1 + sobe;
  const corpoAltura = Math.round(c.altura * 0.5);
  const topo = base - Math.round(c.altura * 0.28) - corpoAltura;

  /* Quatro patas. */
  for (const dx of [0.14, 0.32, 0.62, 0.8]) {
    p.retangulo(
      Math.round(c.largura * dx) + avanca,
      base - Math.round(c.altura * 0.28),
      2,
      Math.round(c.altura * 0.28),
      c.corpo,
    );
  }
  /* Lombo, mais alto na frente. */
  for (let x = 0; x < Math.round(c.largura * 0.78); x += 1) {
    const t = x / (c.largura * 0.78);
    const alturaAqui = Math.round(corpoAltura * (0.78 + 0.22 * (1 - t)));
    p.retangulo(x + Math.round(c.largura * 0.1) + avanca, topo + (corpoAltura - alturaAqui), 1, alturaAqui, c.detalhe);
  }
  /* Cabeça baixa à frente, e a luz dos olhos. */
  const cabecaX = Math.round(c.largura * 0.8) + avanca;
  p.elipse(cabecaX, topo + Math.round(corpoAltura * 0.4), 3, 2.4, c.corpo);
  p.pixel(cabecaX + 1, topo + Math.round(corpoAltura * 0.35), c.brilho);
  /* Cauda. */
  p.retangulo(avanca, topo + 1, Math.round(c.largura * 0.12), 1, c.corpo);
};

const desenharEspectro = (p: Pincel, c: Corpo, pose: Pose): void => {
  const { sobe, avanca } = deslocamentoDaPose(pose);
  const cx = Math.floor(c.largura / 2) + avanca;
  const base = c.altura - 1 + sobe;
  const raio = Math.max(2, Math.round(c.largura * 0.24));

  /*
   * Um espectro não tem pernas: ele **afina** até sumir. Desenhar a base
   * esgarçada, com falhas, é o que separa fantasma de lençol.
   */
  for (let y = 0; y < c.altura * 0.62; y += 1) {
    const t = y / (c.altura * 0.62);
    const meio = Math.round(c.largura * 0.3 * (0.35 + 0.65 * (1 - t)));
    const yy = base - y;
    for (let x = -meio; x <= meio; x += 1) {
      /* Falhas crescem perto da base: a franja do espectro. */
      if (t > 0.55 && (x + y) % 3 === 0) continue;
      p.pixel(cx + x, yy, misturar(c.corpo, c.detalhe, 1 - t));
    }
  }
  const topo = base - Math.round(c.altura * 0.62);
  p.elipse(cx, topo - raio + 1, raio, raio * 1.1, c.detalhe);
  p.pixel(cx - 1, topo - raio, c.brilho);
  p.pixel(cx + 1, topo - raio, c.brilho);
};

const desenharConstruto = (p: Pincel, c: Corpo, pose: Pose): void => {
  const { sobe, avanca } = deslocamentoDaPose(pose);
  const cx = Math.floor(c.largura / 2) + avanca;
  const base = c.altura - 1 + sobe;

  /* Blocos: um construto é feito de peças, e as juntas precisam aparecer. */
  const pernaA = Math.round(c.altura * 0.24);
  p.retangulo(cx - Math.round(c.largura * 0.3), base - pernaA, Math.round(c.largura * 0.22), pernaA, c.corpo);
  p.retangulo(cx + Math.round(c.largura * 0.08), base - pernaA, Math.round(c.largura * 0.22), pernaA, c.corpo);

  const troncoA = Math.round(c.altura * 0.42);
  const troncoY = base - pernaA - troncoA;
  p.retangulo(cx - Math.round(c.largura * 0.34), troncoY, Math.round(c.largura * 0.68), troncoA, c.detalhe);
  /* A junta: uma linha escura que prova que são duas peças. */
  p.retangulo(cx - Math.round(c.largura * 0.34), troncoY + Math.round(troncoA * 0.55), Math.round(c.largura * 0.68), 1, ajustar(c.detalhe, -0.4));

  const cabecaA = Math.round(c.altura * 0.2);
  p.retangulo(cx - Math.round(c.largura * 0.2), troncoY - cabecaA, Math.round(c.largura * 0.4), cabecaA, c.corpo);
  /* O núcleo aceso. */
  p.retangulo(cx - 1, troncoY + Math.round(troncoA * 0.25), 3, 2, c.brilho);
  p.retangulo(cx - Math.round(c.largura * 0.12), troncoY - Math.round(cabecaA * 0.6), Math.round(c.largura * 0.24), 1, c.brilho);
};

const desenharAberracao = (p: Pincel, c: Corpo, pose: Pose): void => {
  const { sobe, avanca } = deslocamentoDaPose(pose);
  const cx = Math.floor(c.largura / 2) + avanca;
  const base = c.altura - 1 + sobe;
  const massaR = Math.round(c.largura * 0.3);
  const cy = base - Math.round(c.altura * 0.45);

  /* Uma massa central, e tentáculos que a desequilibram de propósito. */
  p.elipse(cx, cy, massaR, Math.round(c.altura * 0.3), c.corpo);
  for (const angulo of [-2.5, -1.9, -0.8, 0.4, 1.4, 2.3]) {
    for (let r = massaR - 1; r < massaR + Math.round(c.largura * 0.3); r += 1) {
      const x = cx + Math.cos(angulo) * r;
      const y = cy + Math.sin(angulo) * r * 0.8;
      if (y > base) continue;
      p.pixel(x, y, c.detalhe);
    }
  }
  /* Olhos em número errado: é o que torna a coisa desconfortável. */
  p.pixel(cx - 2, cy - 2, c.brilho);
  p.pixel(cx + 1, cy - 3, c.brilho);
  p.pixel(cx + 3, cy, c.brilho);
};

const DESENHOS: Record<
  SilhuetaDoInimigo['forma'],
  (p: Pincel, c: Corpo, pose: Pose) => void
> = {
  humanoide: desenharHumanoide,
  besta: desenharBesta,
  espectro: desenharEspectro,
  construto: desenharConstruto,
  aberracao: desenharAberracao,
};

/** Uma semente estável a partir de um texto: dois inimigos iguais saem iguais. */
const semear = (texto: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

export interface Ator {
  /** Um canvas por pose, na ordem de `POSES`. */
  readonly quadros: readonly Tela[];
  readonly largura: number;
  readonly altura: number;
}

/** Desenha um inimigo em três poses. */
export const gerarInimigo = (silhueta: SilhuetaDoInimigo, id: string): Ator => {
  /* Margem para o contorno e para o avanço do golpe não serem cortados. */
  const largura = silhueta.largura + 6;
  const altura = silhueta.altura + 4;
  const quadros = POSES.map((pose) => {
    const { tela, pincel } = criarTela(largura, altura);
    const corpo: Corpo = {
      corpo: silhueta.corpo,
      detalhe: silhueta.detalhe,
      brilho: silhueta.brilho,
      largura: silhueta.largura,
      altura: silhueta.altura,
    };
    DESENHOS[silhueta.forma](pincel, corpo, pose);
    sombrear(pincel, 0.32);
    granular(pincel, semear(id + pose), 0.12);
    contornar(pincel, 0.55);
    return tela;
  });
  return { quadros, largura, altura };
};

/**
 * O herói.
 *
 * Ele usa o mesmo desenhador humanoide, com as cores da classe — e a forma
 * dourada é uma **variação de paleta**, não um segundo sprite. É assim que as
 * outras onze classes entram depois sem trabalho de arte novo.
 */
export const gerarHeroi = (classe: Classe, dourado: boolean): Ator => {
  const silhueta: SilhuetaDoInimigo = {
    forma: 'humanoide',
    corpo: dourado ? '#8a6b22' : classe.corSecundaria,
    detalhe: dourado ? '#d9ad48' : classe.corPrimaria,
    brilho: dourado ? '#ffe9a8' : ajustar(classe.corPrimaria, 0.45),
    largura: 20,
    altura: 30,
  };
  return gerarInimigo(silhueta, `heroi:${classe.id}:${String(dourado)}`);
};

export { POSES };
