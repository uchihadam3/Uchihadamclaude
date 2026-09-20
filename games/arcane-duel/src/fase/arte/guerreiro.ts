import { TelaDeArte } from './tela.js';

/*
 * O Guerreiro.
 *
 * Ele não é um sprite desenhado quadro a quadro: é um **boneco montado por
 * partes**, e cada quadro é uma pose. É assim que se consegue capa com
 * balanço, arma que acompanha o braço e caminhada com peso sem escrever
 * oitenta quadros à mão — e é como a maioria dos jogos de pixel art moderna
 * faz, por baixo.
 *
 * A leitura é a prioridade absoluta. Antes de qualquer detalhe, a silhueta
 * precisa dizer "cavaleiro pesado": ombreiras largas, cintura estreita, capa
 * comprida, elmo com crista. Um jogador que vê o sprite a 30 % de zoom
 * precisa reconhecer a classe pelo contorno, sem uma única cor.
 *
 * Paleta: aço claro azulado, vermelho profundo, ouro velho, couro, sombras
 * frias. Ele **não** é um boneco laranja.
 */

export const LARGURA = 96;
export const ALTURA = 96;
/** A linha em que os pés encostam. Deixa margem para a arma passar por baixo. */
const CHAO = 90;
/** O eixo do corpo. Sobra à direita para o braço e a lâmina. */
const EIXO = 40;

export interface Pose {
  /** Sobe e desce o corpo inteiro. Respiração e passo. */
  readonly sobe: number;
  /** Inclinação para a frente, em pixels no topo. */
  readonly inclina: number;
  /** O ângulo da arma, em graus. 0 aponta para baixo; negativo ergue. */
  readonly arma: number;
  /** O quanto o braço da frente avança. */
  readonly bracoFrente: number;
  /** Deslocamento da perna da frente e da de trás. */
  readonly pernaFrente: number;
  readonly pernaTras: number;
  /** O balanço da capa, em pixels na ponta. */
  readonly capa: number;
  /** Compressão vertical: o agachamento da antecipação. */
  readonly agacha: number;
  /** Giro do corpo inteiro, em graus. Só a queda usa. */
  readonly tomba: number;
  /** A cabeça baixa quando ele apanha ou morre. */
  readonly cabeca: number;
}

export const POSE_BASE: Pose = {
  sobe: 0,
  inclina: 0,
  arma: 8,
  bracoFrente: 0,
  pernaFrente: 0,
  pernaTras: 0,
  capa: 0,
  agacha: 0,
  tomba: 0,
  cabeca: 0,
};

const misturar = (a: Pose, b: Pose, t: number): Pose => ({
  sobe: a.sobe + (b.sobe - a.sobe) * t,
  inclina: a.inclina + (b.inclina - a.inclina) * t,
  arma: a.arma + (b.arma - a.arma) * t,
  bracoFrente: a.bracoFrente + (b.bracoFrente - a.bracoFrente) * t,
  pernaFrente: a.pernaFrente + (b.pernaFrente - a.pernaFrente) * t,
  pernaTras: a.pernaTras + (b.pernaTras - a.pernaTras) * t,
  capa: a.capa + (b.capa - a.capa) * t,
  agacha: a.agacha + (b.agacha - a.agacha) * t,
  tomba: a.tomba + (b.tomba - a.tomba) * t,
  cabeca: a.cabeca + (b.cabeca - a.cabeca) * t,
});

/* ---------------------------------------------------------------------------
 * As partes.
 * ------------------------------------------------------------------------- */

/**
 * A capa.
 *
 * Desenhada **antes** de tudo, porque fica atrás do corpo, e com dobras: três
 * colunas mais escuras em posições irregulares. Pano sem dobra lê como
 * cartolina, e a capa é metade da silhueta deste personagem.
 */
const capa = (t: TelaDeArte, pose: Pose, baseY: number): void => {
  /*
   * A capa nasce **atrás dos ombros** e desce até acima do joelho.
   *
   * Curta demais vira bandeirinha; longa demais engole a passada. Esta é a
   * medida em que ela ainda é metade da silhueta e as pernas continuam
   * visíveis.
   */
  const topo = baseY - 60;
  const comprimento = 40;
  for (let i = 0; i < comprimento; i += 1) {
    const f = i / comprimento;
    /* Abre para baixo e balança conforme a pose: a ponta anda mais. */
    const meio = 5 + f * 11;
    const arrasto = pose.capa * f * f;
    const cx = EIXO - 5 - f * 4 + arrasto;
    const y = topo + i;
    for (let x = Math.round(cx - meio); x <= Math.round(cx + meio); x += 1) {
      /* A borda esquerda pega luz; o miolo é sombra; a direita some no corpo. */
      const lateral = (x - (cx - meio)) / Math.max(1, meio * 2);
      const tom = lateral < 0.18 ? 3 : lateral < 0.52 ? 2 : 1;
      t.pixel(x, y, 'pano', tom);
    }
    /* As dobras: riscos escuros que descem tortos. */
    for (const dobra of [0.3, 0.58, 0.8]) {
      const x = cx - meio + meio * 2 * dobra + Math.sin(f * 5 + dobra * 9) * 1.6;
      t.pixel(x, y, 'pano', 1);
      t.pixel(x + 1, y, 'pano', 0);
    }
  }
  /* A barra rasgada: a capa não termina numa linha reta. */
  for (let x = -14; x <= 14; x += 1) {
    const recorte = Math.round(Math.abs(Math.sin(x * 1.7)) * 3);
    for (let d = 0; d < recorte; d += 1) {
      t.pixel(EIXO - 4 - 3 + pose.capa + x, topo + comprimento - 1 - d, 'pano', 0);
    }
  }
};

/** Uma perna: coxa, joelho, greva e bota. */
const perna = (t: TelaDeArte, x: number, baseY: number, avanco: number, atras: boolean): void => {
  const aco = atras ? 'acoEscuro' : 'aco';
  const cima = baseY - 30;
  /* Coxa em placa, mais larga em cima. */
  t.poligono(
    [
      [x - 3, cima],
      [x + 4, cima],
      [x + 3 + avanco * 0.3, cima + 11],
      [x - 2 + avanco * 0.3, cima + 11],
    ],
    aco,
    atras ? 2 : 3,
  );
  /* Joelho: uma placa redonda, mais clara. É ela que dá articulação. */
  t.elipse(x + 0.5 + avanco * 0.4, cima + 13, 4, 3.4, aco, atras ? 2 : 3);
  t.elipse(x + 0.5 + avanco * 0.4, cima + 12, 3, 2, aco, atras ? 3 : 4);
  /* Greva. */
  t.poligono(
    [
      [x - 3 + avanco * 0.5, cima + 15],
      [x + 4 + avanco * 0.5, cima + 15],
      [x + 3 + avanco, cima + 27],
      [x - 2 + avanco, cima + 27],
    ],
    aco,
    atras ? 1 : 2,
  );
  /* Bota de couro, com o bico para a direita: para onde ele olha. */
  t.poligono(
    [
      [x - 3 + avanco, cima + 26],
      [x + 4 + avanco, cima + 26],
      [x + 8 + avanco, cima + 30],
      [x - 3 + avanco, cima + 30],
    ],
    'couro',
    atras ? 1 : 2,
  );
};

/** O peitoral, com quilha central e barra de ouro. */
const torso = (t: TelaDeArte, pose: Pose, baseY: number): void => {
  const ombro = baseY - 58;
  const cintura = baseY - 36;
  const inclina = pose.inclina;

  /*
   * O peitoral, desenhado linha a linha.
   *
   * Um polígono só daria uma laje. O que faz uma couraça parecer couraça é a
   * **cintura**: largo no peito, estreito na altura do diafragma, e um bisel
   * escuro onde a placa se dobra para dentro. Cada linha calcula a sua
   * própria largura e o seu próprio tom, e é isso que produz o volume.
   */
  for (let y = ombro; y < cintura; y += 1) {
    const f = (y - ombro) / (cintura - ombro);
    const peito = 1 - Math.sin(f * Math.PI) * 0.16;
    const esquerda = EIXO - 9 * peito + inclina * (1 - f);
    const direita = EIXO + 10 * peito + inclina * (1 - f);
    for (let x = Math.round(esquerda); x <= Math.round(direita); x += 1) {
      const lateral = (x - esquerda) / Math.max(1, direita - esquerda);
      /* Luz na aresta esquerda, base no meio, sombra na dobra da direita. */
      const tom = lateral < 0.1 ? 4 : lateral < 0.3 ? 3 : lateral < 0.72 ? 2 : 1;
      t.pixel(x, y, 'aco', tom);
    }
    /* A quilha central, que desce do peito ao cinto. */
    if (f > 0.12) {
      const x = EIXO + 1 + inclina * (1 - f);
      t.pixel(x, y, 'aco', 4);
      t.pixel(x + 1, y, 'aco', 1);
    }
  }

  /* A barra de ouro na gola. */
  for (let x = EIXO - 10 + inclina; x <= EIXO + 11 + inclina; x += 1) {
    t.pixel(x, ombro, 'ouro', 3);
    t.pixel(x, ombro + 1, 'ouro', 2);
  }

  /* O cinto, com fivela. */
  t.retangulo(EIXO - 10, cintura - 1, 20, 4, 'couro', 2);
  t.retangulo(EIXO - 10, cintura - 1, 20, 1, 'couro', 3);
  t.retangulo(EIXO - 1, cintura, 5, 3, 'ouro', 3);
  t.retangulo(EIXO, cintura + 1, 3, 1, 'ouro', 1);

  /*
   * As lâminas da saia, curtas.
   *
   * Na primeira versão elas desciam até o joelho e, somadas à capa,
   * transformavam a metade de baixo do personagem numa coluna. Perna que não
   * aparece não caminha: a passada some, e a animação de andar fica igual à
   * de parado.
   */
  for (let i = 0; i < 2; i += 1) {
    const y = cintura + 3 + i * 3;
    const meio = 10 - i * 2;
    t.poligono(
      [
        [EIXO - meio, y],
        [EIXO + meio, y],
        [EIXO + meio - 1, y + 4],
        [EIXO - meio + 1, y + 4],
      ],
      'aco',
      2,
    );
    for (let x = EIXO - meio; x <= EIXO + meio; x += 1) t.pixel(x, y, 'aco', 3);
  }
};

/** A ombreira: três lames sobrepostas, e é ela que dá porte ao personagem. */
const ombreira = (t: TelaDeArte, pose: Pose, baseY: number, frente: boolean): void => {
  const ombro = baseY - 58 + (frente ? 1 : 0);
  const cx = EIXO + (frente ? 9 : -10) + pose.inclina;
  const aco = frente ? 'aco' : 'acoEscuro';
  for (let i = 0; i < 3; i += 1) {
    const rx = 8 - i * 1.4;
    const ry = 4 - i * 0.5;
    const y = ombro + 1 + i * 3.2;
    t.elipse(cx, y, rx, ry, aco, frente ? 2 : 2);
    /* A aresta de luz no alto de cada lame. */
    for (let x = Math.round(cx - rx); x <= Math.round(cx + rx); x += 1) {
      const f = Math.abs(x - cx) / Math.max(1, rx);
      if (f > 0.9) continue;
      t.pixel(x, Math.round(y - ry + 0.5), aco, frente ? 4 : 2);
    }
  }
  /* Um rebite de ouro no topo da ombreira da frente. */
  if (frente) {
    t.pixel(cx, ombro - 1, 'ouro', 4);
    t.pixel(cx - 1, ombro, 'ouro', 3);
    t.pixel(cx + 1, ombro, 'ouro', 3);
  }
};

/** O elmo: crista, visor e protetor de face. */
const cabeca = (t: TelaDeArte, pose: Pose, baseY: number): void => {
  const topo = baseY - 76 + pose.cabeca;
  const cx = EIXO + 1 + pose.inclina * 1.4;

  /* Gorjal: a placa do pescoço, que impede a cabeça de flutuar. */
  t.retangulo(cx - 6, topo + 14, 13, 4, 'acoEscuro', 2);

  /* Calota. */
  t.elipse(cx, topo + 7, 8, 8, 'aco', 2);
  t.poligono(
    [
      [cx - 8, topo + 7],
      [cx + 8, topo + 7],
      [cx + 7, topo + 15],
      [cx - 7, topo + 15],
    ],
    'aco',
    2,
  );
  /* A luz do alto-esquerda, que arredonda o elmo. */
  for (let i = 0; i < 9; i += 1) {
    const a = Math.PI * (0.62 + i * 0.035);
    t.pixel(cx + Math.cos(a) * 7.2, topo + 7 + Math.sin(a) * 7.2, 'aco', 4);
  }

  /* O visor: uma faixa escura com duas frestas. É o ponto focal do sprite. */
  t.retangulo(cx - 6, topo + 7, 14, 5, 'acoEscuro', 0);
  t.retangulo(cx - 1, topo + 8, 8, 2, 'acoEscuro', 1);
  t.pixel(cx + 5, topo + 8, 'ouro', 4);
  t.pixel(cx + 6, topo + 9, 'ouro', 3);

  /* Protetor de face, descendo até o queixo, do lado para onde ele olha. */
  t.poligono(
    [
      [cx + 3, topo + 12],
      [cx + 8, topo + 11],
      [cx + 7, topo + 16],
      [cx + 3, topo + 16],
    ],
    'aco',
    3,
  );

  /* A crista: pano vermelho, que cai para trás e reforça a direção do olhar. */
  for (let i = 0; i < 16; i += 1) {
    const f = i / 16;
    const x = cx - 3 - i * 0.85 + pose.capa * 0.25;
    const y = topo - 3 + f * f * 9;
    const meio = 2.4 - f * 1.4;
    for (let d = -meio; d <= meio; d += 1) t.pixel(x, y + d, 'pano', d < 0 ? 3 : 2);
  }
  /* A base da crista, em ouro. */
  t.retangulo(cx - 3, topo - 2, 6, 2, 'ouro', 3);
};

/** O braço de trás: só o suficiente para a silhueta não ficar chapada. */
const bracoTras = (t: TelaDeArte, pose: Pose, baseY: number): void => {
  const ombro = baseY - 54;
  const x = EIXO - 9 + pose.inclina;
  t.poligono(
    [
      [x - 3, ombro],
      [x + 3, ombro],
      [x + 2, ombro + 14],
      [x - 3, ombro + 14],
    ],
    'acoEscuro',
    2,
  );
  t.elipse(x, ombro + 15, 3, 3, 'couro', 2);
};

/**
 * A arma.
 *
 * Uma espada longa com quilha, guarda-mão e pomo. Ela nasce na mão e gira em
 * torno dela — é o que faz o mesmo desenho servir para repouso, corte e pose
 * de vitória sem redesenhar nada.
 */
const arma = (t: TelaDeArte, maoX: number, maoY: number, anguloEmGraus: number): void => {
  /*
   * A convenção: **0 aponta para baixo**, negativo ergue a lâmina para trás.
   *
   * A primeira versão somava o quarto de volta no sentido errado e a espada
   * subia na frente do rosto em repouso — o personagem ficava com a lâmina
   * atravessada no peito o tempo todo, escondendo justamente a armadura que
   * ele existe para mostrar.
   */
  const a = ((anguloEmGraus + 90) * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const px = -dy;
  const py = dx;

  /* Cabo. */
  for (let i = -7; i < 0; i += 1) {
    t.pixel(maoX + dx * i, maoY + dy * i, 'couro', 2);
    t.pixel(maoX + dx * i + px, maoY + dy * i + py, 'couro', 1);
  }
  /* Pomo. */
  t.elipse(maoX - dx * 8, maoY - dy * 8, 2.4, 2.4, 'ouro', 3);

  /* Guarda-mão, atravessado. */
  for (let i = -7; i <= 7; i += 1) {
    t.pixel(maoX + px * i, maoY + py * i, 'ouro', i < 0 ? 3 : 2);
    t.pixel(maoX + px * i + dx, maoY + py * i + dy, 'ouro', 1);
  }

  /* Lâmina: larga na base, afinando, com a quilha clara no meio. */
  const comprimento = 34;
  for (let i = 2; i < comprimento; i += 1) {
    const f = i / comprimento;
    const meio = 3.4 * (1 - f * f * 0.75);
    for (let d = -meio; d <= meio; d += 1) {
      const lateral = d / Math.max(0.5, meio);
      const tom = lateral < -0.45 ? 4 : lateral < 0.35 ? 3 : 1;
      t.pixel(maoX + dx * i + px * d, maoY + dy * i + py * d, 'aco', tom);
    }
    /* A quilha: um risco escuro exatamente no centro da lâmina. */
    if (i < comprimento - 6) {
      t.pixel(maoX + dx * i, maoY + dy * i, 'aco', 2);
    }
  }
};

/** O braço da frente, que segura a arma, e a mão. */
const bracoFrente = (t: TelaDeArte, pose: Pose, baseY: number): { x: number; y: number } => {
  const ombro = baseY - 54;
  /*
   * O braço da arma fica **afastado** do tronco.
   *
   * Colado, a lâmina descia por cima da perna e as duas viravam uma mancha
   * só. Uma espada precisa de ar em volta para ser reconhecida como espada —
   * é a silhueta que identifica a arma, não o desenho interno dela.
   */
  const x = EIXO + 13 + pose.inclina;
  /*
   * O braço aponta para a mão, e a mão sai do ângulo da arma. Assim o braço
   * nunca fica desconectado do gesto — que é o erro mais visível quando se
   * anima arma e braço separados.
   */
  const alcance = 15 + pose.bracoFrente;
  const anguloDoBraco = (pose.arma * 0.55 - 4) * (Math.PI / 180);
  const maoX = x + Math.sin(anguloDoBraco) * alcance * 0.55 + pose.bracoFrente * 0.6 + 2;
  const maoY = ombro + Math.cos(anguloDoBraco) * alcance;

  const passos = Math.max(1, Math.round(Math.hypot(maoX - x, maoY - ombro)));
  for (let i = 0; i <= passos; i += 1) {
    const f = i / passos;
    const cx = x + (maoX - x) * f;
    const cy = ombro + (maoY - ombro) * f;
    const raio = 3.2 - f * 0.9;
    t.elipse(cx, cy, raio, raio, 'aco', 2);
    t.pixel(cx - raio + 0.5, cy - raio * 0.4, 'aco', 4);
  }
  /* Manopla. */
  t.elipse(maoX, maoY, 3, 3, 'couro', 3);
  t.pixel(maoX - 1, maoY - 1, 'couro', 4);
  return { x: maoX, y: maoY };
};

/* ---------------------------------------------------------------------------
 * O quadro inteiro.
 * ------------------------------------------------------------------------- */

export interface OpcoesDoQuadro {
  /** A Forma Dourada troca o aço por ouro. Nenhum pixel é redesenhado. */
  readonly dourado?: boolean;
}

export const desenharQuadro = (pose: Pose, opcoes: OpcoesDoQuadro = {}): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const baseY = CHAO - pose.sobe + pose.agacha;

  capa(t, pose, baseY);
  perna(t, EIXO - 7, baseY, pose.pernaTras, true);
  bracoTras(t, pose, baseY);
  ombreira(t, pose, baseY, false);
  perna(t, EIXO + 5, baseY, pose.pernaFrente, false);
  torso(t, pose, baseY);
  cabeca(t, pose, baseY);
  ombreira(t, pose, baseY, true);
  const mao = bracoFrente(t, pose, baseY);
  arma(t, mao.x, mao.y, pose.arma);

  /* Acabamento, na ordem que importa. */
  t.sombraDeContato(3, 1);
  t.luzDeBorda(-1, -1, 1);
  t.contornar();

  return t.resolver(
    opcoes.dourado === true ? { aco: 'ouro', acoEscuro: 'bronze', couro: 'bronze' } : undefined,
  );
};

/* ---------------------------------------------------------------------------
 * As animações.
 * ------------------------------------------------------------------------- */

export type NomeDaAnimacao =
  | 'repouso'
  | 'andar'
  | 'ataque'
  | 'habilidade'
  | 'apanhar'
  | 'pocao'
  | 'subir-de-nivel'
  | 'morrer'
  | 'vitoria';

const p = (parcial: Partial<Pose>): Pose => ({ ...POSE_BASE, ...parcial });

/**
 * As poses-chave de cada animação.
 *
 * Os quadros intermediários saem por interpolação, então uma animação de seis
 * quadros pode ser escrita com três poses. O ataque é o único que precisa de
 * cada quadro declarado: antecipação, corte e recuperação têm ritmos
 * diferentes, e interpolar entre eles tiraria justamente o peso do golpe.
 */
const CHAVES: Readonly<Record<NomeDaAnimacao, readonly Pose[]>> = {
  /* Respiração: o peito sobe, a capa acompanha com atraso, a arma balança. */
  repouso: [
    p({ sobe: 0, capa: 0, arma: 8 }),
    p({ sobe: 1, capa: -1, arma: 9 }),
    p({ sobe: 1.6, capa: -2, arma: 10 }),
    p({ sobe: 1, capa: -1.4, arma: 9 }),
    p({ sobe: 0, capa: 0, arma: 8 }),
    p({ sobe: -0.4, capa: 1, arma: 7 }),
  ],

  /* Caminhada com peso: o corpo cai no apoio e sobe na passada. */
  andar: [
    p({ pernaFrente: 8, pernaTras: -7, sobe: 1, inclina: 1, capa: -4, arma: 14 }),
    p({ pernaFrente: 4, pernaTras: -2, sobe: -1, inclina: 1.6, capa: -2, arma: 11 }),
    p({ pernaFrente: -3, pernaTras: 5, sobe: -2, inclina: 1.2, capa: 2, arma: 8 }),
    p({ pernaFrente: -7, pernaTras: 8, sobe: 1, inclina: 0.6, capa: 5, arma: 6 }),
    p({ pernaFrente: -3, pernaTras: 5, sobe: -1, inclina: 1.2, capa: 3, arma: 8 }),
    p({ pernaFrente: 4, pernaTras: -3, sobe: -2, inclina: 1.6, capa: -1, arma: 11 }),
  ],

  /* Ataque: recua, ergue, desce com tudo, e se recompõe. */
  ataque: [
    p({ arma: -30, inclina: -2, sobe: 1, capa: 3, bracoFrente: -2 }),
    p({ arma: -62, inclina: -4, sobe: 2, capa: 5, bracoFrente: -3 }),
    p({ arma: 14, inclina: 3, sobe: -1, capa: -4, bracoFrente: 4, agacha: 1 }),
    p({ arma: 46, inclina: 5, sobe: -2, capa: -6, bracoFrente: 6, agacha: 2 }),
    p({ arma: 34, inclina: 3, sobe: -1, capa: -3, bracoFrente: 3, agacha: 1 }),
    p({ arma: 16, inclina: 1, sobe: 0, capa: -1, bracoFrente: 1 }),
  ],

  /* Habilidade: mais longa, mais alta, e com pausa no alto. */
  habilidade: [
    p({ arma: -40, inclina: -3, sobe: 2, capa: 4, agacha: 1 }),
    p({ arma: -86, inclina: -5, sobe: 4, capa: 7, bracoFrente: -4 }),
    p({ arma: -92, inclina: -5, sobe: 5, capa: 8, bracoFrente: -4 }),
    p({ arma: 10, inclina: 4, sobe: -2, capa: -6, bracoFrente: 6, agacha: 2 }),
    p({ arma: 58, inclina: 6, sobe: -3, capa: -9, bracoFrente: 8, agacha: 3 }),
    p({ arma: 30, inclina: 2, sobe: -1, capa: -3, bracoFrente: 2 }),
  ],

  /* Levar um golpe: curto, para trás, cabeça baixa. */
  apanhar: [
    p({ inclina: -4, sobe: 1, capa: 5, cabeca: 1, arma: 2 }),
    p({ inclina: -2, sobe: 0, capa: 3, cabeca: 1, arma: 5 }),
  ],

  /* Poção: ergue o braço de trás, o corpo relaxa um instante. */
  pocao: [
    p({ cabeca: -1, sobe: 1, arma: 20, inclina: -1 }),
    p({ cabeca: -2, sobe: 2, arma: 24, inclina: -2 }),
    p({ cabeca: -1, sobe: 1, arma: 20, inclina: -1 }),
  ],

  /* Subir de nível: postura aberta, arma para cima, capa estufada. */
  'subir-de-nivel': [
    p({ sobe: 2, arma: -24, capa: -4, inclina: -2 }),
    p({ sobe: 5, arma: -70, capa: -8, inclina: -3 }),
    p({ sobe: 3, arma: -52, capa: -5, inclina: -2 }),
  ],

  /* Queda: joelho dobra, corpo tomba para trás, arma escapa. */
  morrer: [
    p({ agacha: 3, inclina: -3, cabeca: 2, arma: 30, capa: 4 }),
    p({ agacha: 9, inclina: -6, cabeca: 4, arma: 62, capa: 8, tomba: -14 }),
    p({ agacha: 16, inclina: -9, cabeca: 6, arma: 86, capa: 10, tomba: -30 }),
    p({ agacha: 22, inclina: -11, cabeca: 7, arma: 96, capa: 11, tomba: -46 }),
  ],

  /* Vitória: arma erguida, peito aberto. Uma pose, com respiração. */
  vitoria: [
    p({ sobe: 1, arma: -58, capa: -3, inclina: -2 }),
    p({ sobe: 2.4, arma: -64, capa: -5, inclina: -2.6 }),
    p({ sobe: 1, arma: -58, capa: -3, inclina: -2 }),
  ],
};

/** Quantos quadros cada animação entrega, depois de interpolada. */
export const QUADROS: Readonly<Record<NomeDaAnimacao, number>> = {
  repouso: 6,
  andar: 6,
  ataque: 6,
  habilidade: 6,
  apanhar: 2,
  pocao: 3,
  'subir-de-nivel': 3,
  morrer: 4,
  vitoria: 3,
};

/** Quantos quadros por segundo cada animação roda. */
export const RITMO: Readonly<Record<NomeDaAnimacao, number>> = {
  repouso: 7,
  andar: 11,
  ataque: 16,
  habilidade: 14,
  apanhar: 12,
  pocao: 8,
  'subir-de-nivel': 7,
  morrer: 7,
  vitoria: 5,
};

export const gerarAnimacao = (
  nome: NomeDaAnimacao,
  opcoes: OpcoesDoQuadro = {},
): readonly HTMLCanvasElement[] => {
  const chaves = CHAVES[nome];
  const total = QUADROS[nome];
  const quadros: HTMLCanvasElement[] = [];
  for (let i = 0; i < total; i += 1) {
    const posicao = (i / total) * chaves.length;
    const a = chaves[Math.floor(posicao) % chaves.length] ?? POSE_BASE;
    const b = chaves[Math.ceil(posicao) % chaves.length] ?? a;
    quadros.push(desenharQuadro(misturar(a, b, posicao % 1), opcoes));
  }
  return quadros;
};
