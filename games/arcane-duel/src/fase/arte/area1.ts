import { TelaDeArte } from './tela.js';

/*
 * A Área 1 — Ruínas do Pátio.
 *
 * Quatro planos, e cada um tem um trabalho diferente:
 *
 *   céu       — a cor e a fonte de luz. Não tem forma.
 *   longe     — a colunata, quase dissolvida na névoa. Dá escala.
 *   perto     — arcos e pedra, com contorno. Dá o lugar.
 *   frente    — vegetação e pedra bem escuras, passando na frente dos atores.
 *
 * O plano da frente é o que a primeira versão não tinha, e é ele que mais
 * rende: um personagem com mato escuro passando à frente dos pés deixa de
 * parecer colado sobre um papel de parede e passa a estar **dentro** do
 * cenário.
 *
 * As tochas, a poeira e as folhas não estão desenhadas aqui: são objetos da
 * cena, porque precisam se mover. Aqui ficam só os encaixes — os suportes de
 * tocha na pedra, que dão a elas um lugar de onde nascer.
 */

export const LARGURA = 320;
export const ALTURA = 180;
/** A linha em que os atores pisam. */
export const HORIZONTE = 132;

const semente = (n: number): (() => number) => {
  let estado = n >>> 0;
  return () => {
    estado = (Math.imul(estado ^ (estado >>> 15), 0x2545f491) + 0x9e3779b9) >>> 0;
    return estado / 4294967296;
  };
};

/** O céu: faixas horizontais e um facho que desce da abertura do teto. */
export const ceu = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  /*
   * O céu, com pontilhado entre os degraus.
   *
   * Uma rampa tem cinco tons e o céu tem cento e oitenta linhas: passar de um
   * tom para o outro de uma vez produz faixas horizontais que atravessam a
   * tela inteira — o defeito mais visível da primeira versão. A solução é a
   * mesma de sempre em pixel art: **dithering**. Na zona de transição os dois
   * tons se alternam em xadrez, e a proporção muda conforme desce. De longe
   * o olho mistura; de perto, é textura.
   */
  /* Matriz de Bayer 4×4: o padrão ordenado clássico, fino e sem moiré. */
  const BAYER = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  for (let y = 0; y < ALTURA; y += 1) {
    const f = y / ALTURA;
    const escala = Math.max(0, Math.min(3.999, (1 - f) * 4.2));
    const baixo = Math.floor(escala);
    const mistura = escala - baixo;
    /*
     * O pontilhado só existe **na transição**.
     *
     * Ditherizar o céu inteiro trocou faixas horizontais por um chuvisco que
     * cobria tudo — o defeito mudou de nome, não de tamanho. Aqui a mistura
     * só acontece na faixa estreita entre dois degraus; o resto do céu é tom
     * chapado, como tem de ser.
     */
    const naTransicao = mistura > 0.84 || mistura < 0.16;
    for (let x = 0; x < LARGURA; x += 1) {
      if (!naTransicao) {
        t.pixel(x, y, 'aco', baixo);
        continue;
      }
      const limiar = ((BAYER[y & 3]?.[x & 3] ?? 0) + 0.5) / 16;
      t.pixel(x, y, 'aco', baixo + (limiar < mistura ? 1 : 0));
    }
  }
  /* O facho: largo embaixo, estreito em cima, e só clareia o que já existe. */
  const fonteX = Math.round(LARGURA * 0.66);
  for (let y = 0; y < HORIZONTE; y += 1) {
    const queda = 1 - y / HORIZONTE;
    const meio = Math.round(4 + y * 0.34);
    for (let x = fonteX - meio; x <= fonteX + meio; x += 1) {
      const lateral = 1 - Math.abs(x - fonteX) / Math.max(1, meio);
      if (queda * lateral * lateral < 0.28) continue;
      const tom = t.tomEm(x, y);
      if (tom !== null) t.pixel(x, y, 'aco', Math.min(4, tom + 1));
    }
  }
  return t.resolver();
};

/** A colunata distante: alta, sem contorno, quase névoa. */
export const longe = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(4177);
  const base = Math.round(HORIZONTE * 0.86);
  for (let x = 4; x < LARGURA; x += 17 + Math.round(rnd() * 9)) {
    const largura = 3 + Math.round(rnd() * 2);
    const altura = Math.round(base * (0.5 + rnd() * 0.42));
    for (let y = base - altura; y < base; y += 1) {
      for (let dx = 0; dx < largura; dx += 1) {
        t.pixel(x + dx, y, 'aco', dx === 0 ? 2 : dx === largura - 1 ? 0 : 1);
      }
    }
    /* Capitel: um bloco mais largo, que impede a coluna de virar poste. */
    t.retangulo(x - 1, base - altura, largura + 2, 2, 'aco', 2);
  }
  return t.resolver();
};

/** O plano do meio: arcos, pedra rachada e os suportes de tocha. */
export const perto = (): { readonly tela: HTMLCanvasElement; readonly tochas: readonly [number, number][] } => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(90211);
  const base = HORIZONTE;
  const tochas: [number, number][] = [];

  const colunas: { x: number; largura: number; altura: number }[] = [];
  let colunaId = 0;
  for (let x = -6; x < LARGURA + 10; x += 42 + Math.round(rnd() * 14)) {
    colunaId += 1;
    const largura = 12 + Math.round(rnd() * 4);
    const altura = Math.round(base * (0.55 + rnd() * 0.4));
    colunas.push({ x, largura, altura });

    for (let y = base - altura; y < base; y += 1) {
      const f = (y - (base - altura)) / altura;
      for (let dx = 0; dx < largura; dx += 1) {
        const lateral = dx / largura;
        const tom = lateral < 0.14 ? 3 : lateral < 0.52 ? 2 : lateral < 0.84 ? 1 : 0;
        t.pixel(x + dx, y, 'aco', tom);
      }
      /*
       * As fiadas de bloco.
       *
       * Uma linha escura contínua a cada seis pixels virou escada de mão na
       * primeira versão — o olho lê degraus regulares como degraus. Aqui elas
       * são mais raras, começam em altura diferente em cada coluna, e não
       * atravessam a largura inteira: a junta some perto da aresta iluminada,
       * como some numa parede de verdade.
       */
      /*
       * A junta entre fiadas: rara, curta e de baixo contraste.
       *
       * A cada nove pixels e em preto, ela virava degrau de escada. Pedra
       * velha tem junta, mas ela é um sussurro — o que o olho deve ler numa
       * coluna é o cilindro, não a alvenaria.
       */
      if ((y - (base - altura) + colunaId * 5) % 15 === 0) {
        for (let dx = Math.round(largura * 0.52); dx < largura - 2; dx += 1) {
          t.pixel(x + dx, y, 'aco', 1);
        }
      }
      /* Musgo acumulado na base, do lado da sombra. */
      if (f > 0.78 && rnd() < 0.5) {
        t.pixel(x + Math.round(rnd() * largura), y, 'carne', 1);
      }
    }
    /* Base alargada e topo partido. */
    t.retangulo(x - 2, base - 4, largura + 4, 4, 'aco', 1);
    for (let d = 0; d < 3 + Math.round(rnd() * 3); d += 1) {
      t.retangulo(x + Math.round(rnd() * (largura - 2)), base - altura - d, 2, 1, 'aco', 0);
    }
    /* Um suporte de tocha em metade das colunas, na altura do olhar. */
    if (rnd() < 0.55) {
      const alturaDaTocha = base - Math.round(altura * 0.62);
      t.retangulo(x + largura, alturaDaTocha, 2, 3, 'bronze', 2);
      t.pixel(x + largura + 2, alturaDaTocha - 1, 'bronze', 3);
      tochas.push([x + largura + 3, alturaDaTocha - 2]);
    }
  }

  /* Um arco sobrevivente ligando duas colunas: a prova de que houve um prédio. */
  for (let i = 0; i + 1 < colunas.length; i += 1) {
    const a = colunas[i];
    const b = colunas[i + 1];
    if (a === undefined || b === undefined || rnd() > 0.5) continue;
    const alturaDoArco = Math.min(a.altura, b.altura);
    const de = a.x + a.largura - 2;
    const ate = b.x + 2;
    const vao = ate - de;
    if (vao < 10 || vao > 44) continue;
    for (let x = de; x <= ate; x += 1) {
      const f = (x - de) / vao;
      const curva = Math.sin(f * Math.PI) * vao * 0.3;
      const y = base - alturaDoArco - Math.round(curva);
      for (let d = 0; d < 6; d += 1) t.pixel(x, y + d, 'aco', d === 0 ? 3 : d < 4 ? 2 : 1);
    }
  }

  /* O chão: pedra gasta, com a aresta de luz que separa piso de fundo. */
  for (let y = base; y < ALTURA; y += 1) {
    const f = (y - base) / (ALTURA - base);
    for (let x = 0; x < LARGURA; x += 1) {
      t.pixel(x, y, 'aco', f < 0.06 ? 3 : f < 0.3 ? 2 : 1);
    }
  }
  for (let i = 0; i < 260; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const y = base + 2 + Math.round(rnd() * (ALTURA - base - 2));
    t.retangulo(x, y, 1 + Math.round(rnd() * 3), 1, 'aco', rnd() < 0.5 ? 0 : 2);
  }
  /* Tufos de mato entre as lajes. */
  for (let i = 0; i < 34; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const y = base + 3 + Math.round(rnd() * 16);
    for (let h = 0; h < 2 + Math.round(rnd() * 3); h += 1) {
      t.pixel(x + Math.round(rnd() * 2) - 1, y - h, 'carne', 1 + Math.round(rnd()));
    }
  }

  return { tela: t.resolver(), tochas };
};

/**
 * O plano da frente.
 *
 * Silhuetas quase pretas, na borda de baixo da tela, que passam **na frente**
 * dos atores. É o truque mais barato de profundidade que existe e o que a
 * primeira versão não tinha: sem ele o personagem fica colado sobre o fundo;
 * com ele, ele está dentro da cena.
 */
export const frente = (): HTMLCanvasElement => {
  const t = new TelaDeArte(LARGURA, ALTURA);
  const rnd = semente(5501);
  /* Pedras caídas nos cantos. */
  for (const [cx, escala] of [
    [18, 1.4],
    [LARGURA - 26, 1.1],
    [LARGURA * 0.52, 0.8],
  ] as const) {
    const raio = 12 * escala;
    t.elipse(cx, ALTURA + 4, raio, raio * 0.6, 'aco', 0);
    t.elipse(cx - raio * 0.3, ALTURA - raio * 0.5, raio * 0.5, raio * 0.3, 'aco', 0);
  }
  /* Mato alto na borda inferior, irregular. */
  for (let x = 0; x < LARGURA; x += 1) {
    const altura = 4 + Math.round(Math.abs(Math.sin(x * 0.21) + Math.sin(x * 0.07)) * 7 + rnd() * 3);
    for (let h = 0; h < altura; h += 1) t.pixel(x, ALTURA - 1 - h, 'carne', 0);
  }
  for (let i = 0; i < 90; i += 1) {
    const x = Math.round(rnd() * LARGURA);
    const h = 8 + Math.round(rnd() * 14);
    for (let d = 0; d < h; d += 1) {
      t.pixel(x + Math.round(Math.sin(d * 0.4) * 2), ALTURA - 1 - d, 'carne', 0);
    }
  }
  return t.resolver();
};
