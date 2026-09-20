import { TelaDeArte } from './tela.js';

/*
 * O Saqueador.
 *
 * Ele existe para ser o **oposto** do Guerreiro na silhueta, e essa é a razão
 * de ser dele antes de qualquer detalhe. O Guerreiro é alto, largo em cima,
 * vertical, de metal. O Saqueador é baixo, curvado para a frente, estreito no
 * ombro e largo no capuz, de pano. A dois metros da tela, sem cor nenhuma, um
 * jogador tem de saber qual é qual.
 *
 * Repintar o mesmo humanoide com outra paleta é o erro que esta separação
 * existe para impedir: cor distingue times, **forma** distingue criaturas.
 */

export const LARGURA = 80;
export const ALTURA = 80;
export const CHAO = 74;
const EIXO = 36;

export interface Pose {
  readonly sobe: number;
  readonly curva: number;
  readonly braco: number;
  readonly pernaFrente: number;
  readonly pernaTras: number;
  readonly capuz: number;
  readonly tomba: number;
}

export const POSE_BASE: Pose = {
  sobe: 0,
  curva: 0,
  braco: 0,
  pernaFrente: 0,
  pernaTras: 0,
  capuz: 0,
  tomba: 0,
};

const misturar = (a: Pose, b: Pose, t: number): Pose => ({
  sobe: a.sobe + (b.sobe - a.sobe) * t,
  curva: a.curva + (b.curva - a.curva) * t,
  braco: a.braco + (b.braco - a.braco) * t,
  pernaFrente: a.pernaFrente + (b.pernaFrente - a.pernaFrente) * t,
  pernaTras: a.pernaTras + (b.pernaTras - a.pernaTras) * t,
  capuz: a.capuz + (b.capuz - a.capuz) * t,
  tomba: a.tomba + (b.tomba - a.tomba) * t,
});

/** Perna magra, em pano enrolado e bota surrada. */
const perna = (t: TelaDeArte, x: number, baseY: number, avanco: number, atras: boolean): void => {
  const pano = atras ? 1 : 2;
  const cima = baseY - 24;
  t.poligono(
    [
      [x - 2, cima],
      [x + 3, cima],
      [x + 2 + avanco * 0.4, cima + 13],
      [x - 2 + avanco * 0.4, cima + 13],
    ],
    'panoSujo',
    pano,
  );
  /* As faixas de pano enroladas na canela: três riscos, nunca simétricos. */
  for (const y of [cima + 15, cima + 18, cima + 21]) {
    t.linha(x - 2 + avanco * 0.7, y, x + 3 + avanco * 0.7, y - 1, 'couro', atras ? 1 : 2);
  }
  t.poligono(
    [
      [x - 2 + avanco * 0.6, cima + 13],
      [x + 3 + avanco * 0.6, cima + 13],
      [x + 2 + avanco, cima + 22],
      [x - 1 + avanco, cima + 22],
    ],
    'panoSujo',
    pano,
  );
  t.poligono(
    [
      [x - 2 + avanco, cima + 21],
      [x + 3 + avanco, cima + 21],
      [x + 6 + avanco, cima + 24],
      [x - 2 + avanco, cima + 24],
    ],
    'couro',
    atras ? 1 : 2,
  );
};

/** A adaga curva, que é a assinatura dele. */
const adaga = (t: TelaDeArte, maoX: number, maoY: number, anguloEmGraus: number): void => {
  const a = ((anguloEmGraus + 90) * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const px = -dy;
  const py = dx;

  for (let i = -5; i < 0; i += 1) t.pixel(maoX + dx * i, maoY + dy * i, 'couro', 2);
  for (let i = -2; i <= 2; i += 1) t.pixel(maoX + px * i, maoY + py * i, 'bronze', 2);

  /*
   * A lâmina **curva**.
   *
   * A curvatura é o que separa esta arma da espada reta do Guerreiro na
   * silhueta. Ela sai da mão e vai abrindo para um lado, com o fio no lado de
   * fora e o dorso escuro no de dentro.
   */
  const comprimento = 17;
  for (let i = 1; i < comprimento; i += 1) {
    const f = i / comprimento;
    const desvio = f * f * 5;
    const meio = 2.2 * (1 - f * 0.6);
    for (let d = -meio; d <= meio; d += 1) {
      const lateral = d / Math.max(0.5, meio);
      t.pixel(
        maoX + dx * i + px * (d + desvio),
        maoY + dy * i + py * (d + desvio),
        'ferro',
        lateral < -0.3 ? 4 : lateral < 0.4 ? 2 : 1,
      );
    }
  }
};

const desenharPose = (pose: Pose): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const baseY = CHAO - pose.sobe;
  const curva = pose.curva;

  perna(t, EIXO - 5, baseY, pose.pernaTras, true);
  perna(t, EIXO + 3, baseY, pose.pernaFrente, false);

  /*
   * O tronco curvado.
   *
   * Ele não sobe reto: cada linha se desloca para a frente conforme sobe, e é
   * essa inclinação acumulada que produz a corcunda. Um tronco vertical com
   * capuz por cima vira monge; curvado, vira ladrão de estrada.
   */
  const ombro = baseY - 44;
  const cintura = baseY - 26;
  for (let y = ombro; y < cintura; y += 1) {
    const f = (y - ombro) / (cintura - ombro);
    const empurra = curva * (1 - f) * 1.4;
    const meio = 6 + f * 2;
    for (let x = Math.round(EIXO - meio + empurra); x <= Math.round(EIXO + meio + empurra); x += 1) {
      const lateral = (x - (EIXO - meio + empurra)) / Math.max(1, meio * 2);
      t.pixel(x, y, 'panoSujo', lateral < 0.16 ? 3 : lateral < 0.6 ? 2 : 1);
    }
  }

  /* A correia cruzada no peito, com uma bolsa. */
  t.linha(EIXO - 5 + curva, cintura - 2, EIXO + 6 + curva * 1.3, ombro + 3, 'couro', 3);
  t.retangulo(EIXO - 7 + curva * 0.4, cintura - 5, 4, 5, 'couro', 2);

  /* O braço da frente, que segura a adaga. */
  const bracoY = ombro + 6;
  const bracoX = EIXO + 6 + curva * 1.2;
  const maoX = bracoX + 5 + pose.braco * 0.8;
  const maoY = bracoY + 9 - pose.braco * 0.5;
  const passos = Math.max(1, Math.round(Math.hypot(maoX - bracoX, maoY - bracoY)));
  for (let i = 0; i <= passos; i += 1) {
    const f = i / passos;
    t.elipse(bracoX + (maoX - bracoX) * f, bracoY + (maoY - bracoY) * f, 2.2, 2.2, 'panoSujo', 2);
  }
  t.elipse(maoX, maoY, 2.4, 2.4, 'pele', 2);
  adaga(t, maoX, maoY, 40 - pose.braco * 3);

  /*
   * O capuz.
   *
   * Largo, pontudo para trás, e com **buraco escuro** na frente em vez de
   * rosto. Dois pontos de luz dentro do buraco fazem o resto: o olho procura
   * olhos, e encontrá-los no escuro é o que torna a criatura desconfortável.
   */
  const cabecaX = EIXO + 4 + curva * 2.2;
  const cabecaY = ombro - 4 + pose.capuz;
  t.elipse(cabecaX, cabecaY, 8, 7, 'panoSujo', 2);
  /* A ponta do capuz, caída para trás. */
  for (let i = 0; i < 10; i += 1) {
    const f = i / 10;
    t.elipse(cabecaX - 6 - i * 0.9, cabecaY - 3 + f * f * 7, 2.6 - f * 1.6, 2.2 - f * 1.2, 'panoSujo', 1);
  }
  /* A boca do capuz, e o vazio dentro. */
  t.elipse(cabecaX + 3, cabecaY + 1, 4.6, 4.2, 'panoSujo', 3);
  t.elipse(cabecaX + 4, cabecaY + 1, 3.4, 3.2, 'panoSujo', 0);
  t.pixel(cabecaX + 4, cabecaY, 'ouro', 4);
  t.pixel(cabecaX + 6, cabecaY + 1, 'ouro', 3);

  t.sombraDeContato(3, 1);
  t.luzDeBorda(-1, -1, 1);
  t.contornar();
  return t.resolver();
};

export type NomeDaAnimacao = 'repouso' | 'ataque' | 'apanhar' | 'morrer';

const p = (parcial: Partial<Pose>): Pose => ({ ...POSE_BASE, ...parcial });

const CHAVES: Readonly<Record<NomeDaAnimacao, readonly Pose[]>> = {
  /* Respiro curto e nervoso: ele não é calmo como o cavaleiro. */
  repouso: [
    p({ sobe: 0, curva: 2, braco: 0, capuz: 0 }),
    p({ sobe: 1, curva: 2.6, braco: 1, capuz: -1 }),
    p({ sobe: 0.4, curva: 2.2, braco: 0.4, capuz: 0 }),
    p({ sobe: -0.6, curva: 1.6, braco: -1, capuz: 1 }),
  ],
  /* Estocada: recolhe e crava para a frente. Nada de arco largo. */
  ataque: [
    p({ curva: 0, braco: -5, sobe: 1, capuz: -1, pernaTras: -3 }),
    p({ curva: -1, braco: -7, sobe: 2, capuz: -2, pernaTras: -5 }),
    p({ curva: 5, braco: 8, sobe: -1, capuz: 1, pernaFrente: 6 }),
    p({ curva: 6, braco: 10, sobe: -2, capuz: 2, pernaFrente: 8 }),
    p({ curva: 3, braco: 4, sobe: -1, capuz: 1, pernaFrente: 4 }),
  ],
  apanhar: [p({ curva: -4, sobe: 1, capuz: 2, braco: -3 }), p({ curva: -2, sobe: 0, capuz: 1, braco: -1 })],
  morrer: [
    p({ curva: -3, sobe: -2, capuz: 3, tomba: -10 }),
    p({ curva: -6, sobe: -7, capuz: 5, tomba: -26 }),
    p({ curva: -8, sobe: -13, capuz: 6, tomba: -44 }),
  ],
};

export const QUADROS: Readonly<Record<NomeDaAnimacao, number>> = {
  repouso: 4,
  ataque: 7,
  apanhar: 2,
  morrer: 3,
};

export const RITMO: Readonly<Record<NomeDaAnimacao, number>> = {
  repouso: 6,
  ataque: 19,
  apanhar: 12,
  morrer: 7,
};

/* A mesma curva de tempo do Guerreiro: estocada lenta para sair, rápida para chegar. */
const CURVA: Readonly<Record<NomeDaAnimacao, number>> = {
  repouso: 1,
  ataque: 1.8,
  apanhar: 0.6,
  morrer: 1.3,
};

export const gerarAnimacao = (nome: NomeDaAnimacao): readonly HTMLCanvasElement[] => {
  const chaves = CHAVES[nome];
  const total = QUADROS[nome];
  const quadros: HTMLCanvasElement[] = [];
  for (let i = 0; i < total; i += 1) {
    const posicao = Math.pow(i / total, CURVA[nome]) * chaves.length;
    const a = chaves[Math.floor(posicao) % chaves.length] ?? POSE_BASE;
    const b = chaves[Math.ceil(posicao) % chaves.length] ?? a;
    quadros.push(desenharPose(misturar(a, b, posicao % 1)));
  }
  return quadros;
};
