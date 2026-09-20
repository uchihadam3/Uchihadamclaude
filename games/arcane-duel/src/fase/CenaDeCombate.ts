import Phaser from 'phaser';

import { areaDaSala } from '../dados/areas.js';
import { BALANCEAMENTO } from '../dados/balanceamento.js';
import type { Classe, Inimigo, PaletaDeArea } from '../dados/tipos.js';
import type { EventoDeCombate, Porte } from '../nucleo/combate.js';

import type { Lado as LadoDaArena } from './arte/orientacao.js';
import { orientar } from './arte/orientacao.js';
import type { Elenco, NomeDeAnimacao } from './animacoes.js';
import { animacaoDe, elencoDoHeroi, elencoDoInimigo } from './animacoes.js';
import * as area1 from './arte/area1.js';
import { gerarCenario } from './cenario.js';
import { ajustar } from './pixel.js';
import { anelDeRuptura, arcoDeGolpe, clarao, estilhacos, numeroFlutuante, pausaDeImpacto } from './vfx.js';

/*
 * A cena.
 *
 * Ela **não simula nada**. O combate já aconteceu no núcleo, em passo fixo, e
 * o que chega aqui é uma lista de eventos do que acabou de ocorrer. A cena
 * traduz isso em movimento: quem bateu recua e avança, quem apanhou pisca,
 * números sobem, lascas voam.
 *
 * A separação é o que permite a velocidade 1x/2x/4x ser honesta. Não existe
 * relógio acelerado aqui: o React roda mais passos de simulação por quadro, e
 * a cena continua desenhando no tempo dela. Acelerar o relógio do render
 * faria a animação saltar; assim ela só fica mais frequente.
 */

/*
 * O espaço da cena.
 *
 * Ele é o mesmo da cena-padrão: 320x180, com o chão em 146. Não é um número
 * escolhido por caber — é o tamanho em que o Guerreiro tem 70 pixels de
 * altura e ainda se lê a armadura, o elmo e a capa. Mudar este espaço é
 * mudar a arte inteira junto, e é por isso que ele está declarado uma vez só.
 */
/*
 * A largura da cena é calculada, não constante.
 *
 * O jogo é jogado em pé e deitado, e a faixa de combate muda de proporção
 * entre os dois. Antes a cena tinha 320 de largura fixa e o Phaser cobria a
 * tela com ela; num telefone em pé isso dava uma escala de 4,7 e **o herói
 * ficava fora da tela** — a tela inteira mostrava metade do inimigo.
 *
 * Agora a altura é que é fixa (é ela que define a escala do mundo) e a
 * largura vem da proporção da caixa. O cenário é desenhado nessa largura, e
 * os atores são posicionados em fração dela.
 */
const LARGURA_MINIMA = 208;
const LARGURA_MAXIMA = 900;
const ALTURA_MINIMA = 180;
const ALTURA_MAXIMA = 340;

export interface TamanhoLogico {
  readonly largura: number;
  readonly altura: number;
}

/**
 * O tamanho lógico da cena para uma caixa de tantos por tantos pixels.
 *
 * A regra é: **a proporção do mundo acompanha a proporção da caixa**, dentro
 * de limites. Numa caixa larga, o mundo fica largo e mostra mais colunata;
 * numa caixa alta, ele fica alto e mostra mais céu e mais chão. Nos dois
 * casos o FIT não corta nada e não deixa tarja, porque as proporções batem.
 *
 * Os limites existem para o desenho continuar legível: abaixo de 208 de
 * largura os dois atores não cabem lado a lado, e acima de 340 de altura o
 * Guerreiro vira uma formiga no meio de um céu enorme.
 */
export const tamanhoLogico = (larguraDaCaixa: number, alturaDaCaixa: number): TamanhoLogico => {
  const proporcao = Math.max(0.2, larguraDaCaixa / Math.max(1, alturaDaCaixa));
  const parOuImpar = (n: number): number => Math.round(n / 2) * 2;

  /* Caixa larga: a altura fica no mínimo e a largura acompanha. */
  if (proporcao >= LARGURA_MINIMA / ALTURA_MINIMA) {
    return {
      largura: Math.min(LARGURA_MAXIMA, parOuImpar(ALTURA_MINIMA * proporcao)),
      altura: ALTURA_MINIMA,
    };
  }
  /* Caixa alta: a largura fica no mínimo e a altura acompanha. */
  return {
    largura: LARGURA_MINIMA,
    altura: Math.min(ALTURA_MAXIMA, parOuImpar(LARGURA_MINIMA / proporcao)),
  };
};
const ALTURA = area1.ALTURA;
/** A distância do pé dos atores até a borda de baixo. Fixa, em qualquer altura. */
const DO_CHAO = 34;
/*
 * Onde os dois ficam.
 *
 * Em fração da largura, e não em pixel: o herói a 26% e o inimigo a 74%
 * mantêm a mesma leitura numa faixa estreita e numa larga. Em pixels fixos,
 * uma faixa larga os colava no meio com dois vazios nas pontas.
 */
const FRACAO_HEROI = 0.26;
const FRACAO_INIMIGO = 0.74;

export interface DadosDaCena {
  readonly classe: Classe;
  readonly dourado: boolean;
  readonly sala: number;
  readonly inimigo: Inimigo;
}

interface Lado {
  readonly sprite: Phaser.GameObjects.Image;
  readonly sombra: Phaser.GameObjects.Ellipse;
  readonly elenco: Elenco;
  readonly prefixo: string;
  readonly base: number;
  /** Quem é este lado. É daqui que sai a orientação, e de nenhum outro lugar. */
  readonly quem: LadoDaArena;
  /* O estado da animação em curso. */
  nome: NomeDeAnimacao;
  tempo: number;
  quadro: number;
}

export class CenaDeCombate extends Phaser.Scene {
  private heroi!: Lado;
  private alvo!: Lado;
  private paleta!: PaletaDeArea;
  private camadas: Phaser.GameObjects.TileSprite[] = [];
  private particulas: Phaser.GameObjects.Rectangle[] = [];
  private dados!: DadosDaCena;
  private elencoDoHeroi!: Elenco;
  private elencoDoAlvo!: Elenco;
  private tochasDaArea: readonly (readonly [number, number])[] = [];
  /* A largura lógica desta cena, e os postos dos dois atores dentro dela. */
  private largura = area1.LARGURA;
  private altura = ALTURA;
  private chaoY = ALTURA - DO_CHAO;
  private xHeroi = Math.round(area1.LARGURA * FRACAO_HEROI);
  private xInimigo = Math.round(area1.LARGURA * FRACAO_INIMIGO);
  private chamas: { x: number; y: number; nucleo: Phaser.GameObjects.Ellipse; halo: Phaser.GameObjects.Ellipse; fase: number }[] = [];
  private corposDeChama: Phaser.GameObjects.Ellipse[] = [];
  private tempoDaCena = 0;

  public constructor() {
    super({ key: 'combate' });
  }

  public init(dados: DadosDaCena): void {
    this.dados = dados;
  }

  /*
   * Toda a arte é gerada no `preload`, em canvas, e registrada como textura.
   *
   * Não há requisição de rede nenhuma: o jogo inteiro cabe no bundle porque
   * os sprites não existem como arquivo — eles nascem aqui. Trocar por arte
   * final depois é trocar estas chamadas por `this.load.image`, e nada mais.
   */
  public preload(): void {
    const { classe, dourado, sala, inimigo } = this.dados;
    const area = areaDaSala(sala);
    this.paleta = area.paleta;

    /* O tamanho vem do jogo, que a tela já ajustou à caixa. */
    this.largura = Math.round(this.scale.width);
    this.altura = Math.round(this.scale.height);
    this.chaoY = this.altura - DO_CHAO;
    this.xHeroi = Math.round(this.largura * FRACAO_HEROI);
    this.xInimigo = Math.round(this.largura * FRACAO_INIMIGO);

    if (area.numero === 1) {
      /* A Área 1 é a cena-padrão: quatro planos desenhados à mão pelo código. */
      const l = this.largura;
      const a = this.altura;
      const sufixo = `${String(l)}x${String(a)}`;
      this.registrarTela(`a1:ceu:${sufixo}`, area1.ceu(l, a));
      this.registrarTela(`a1:longe:${sufixo}`, area1.longe(l, a));
      const perto = area1.perto(l, a);
      this.registrarTela(`a1:perto:${sufixo}`, perto.tela);
      this.tochasDaArea = perto.tochas;
      this.registrarTela(`a1:frente:${sufixo}`, area1.frente(l, a));
    } else {
      /*
       * As outras quatro áreas ainda usam o gerador antigo.
       *
       * Está declarado assim de propósito: a direção de arte nova foi
       * aprovada numa cena só, e propagar antes disso seria produzir quatro
       * cenários no estilo errado.
       */
      const cenario = gerarCenario(area.paleta, area.numero);
      this.registrarTela(`ceu:${area.numero}`, cenario.distante);
      this.registrarTela(`medio:${area.numero}`, cenario.medio);
      this.registrarTela(`proximo:${area.numero}`, cenario.proximo);
      this.registrarTela(`chao:${area.numero}`, cenario.chao);
      this.tochasDaArea = [];
    }

    this.elencoDoHeroi = elencoDoHeroi(classe, dourado);
    this.registrarElenco(`heroi:${classe.id}:${String(dourado)}`, this.elencoDoHeroi);

    this.elencoDoAlvo = elencoDoInimigo(inimigo.silhueta, inimigo.id);
    this.registrarElenco(`inimigo:${inimigo.id}`, this.elencoDoAlvo);
  }

  /** Cada quadro de cada animação vira uma textura, uma vez só. */
  private registrarElenco(prefixo: string, elenco: Elenco): void {
    for (const [nome, animacao] of Object.entries(elenco.animacoes)) {
      animacao.quadros.forEach((quadro, i) => {
        this.registrarTela(`${prefixo}:${nome}:${String(i)}`, quadro);
      });
    }
  }

  private registrarTela(chave: string, tela: HTMLCanvasElement): void {
    if (this.textures.exists(chave)) this.textures.remove(chave);
    this.textures.addCanvas(chave, tela);
  }

  public create(): void {
    const { classe, dourado, sala, inimigo } = this.dados;
    const area = areaDaSala(sala);
    this.camadas = [];
    this.particulas = [];
    this.chamas = [];
    this.corposDeChama = [];
    this.tempoDaCena = 0;

    if (area.numero === 1) {
      /*
       * A Área 1 não rola.
       *
       * O combate é parado: os dois ficam onde estão e trocam golpes. Um
       * cenário deslizando por trás de dois atores parados não lê como
       * profundidade, lê como esteira. O que dá vida aqui é o que se mexe
       * sozinho — a chama das tochas, as brasas que sobem, a poeira que
       * atravessa, a névoa junto ao chão.
       */
      for (const nome of ['ceu', 'longe', 'perto', 'frente'] as const) {
        this.add
          .image(0, 0, `a1:${nome}:${String(this.largura)}x${String(this.altura)}`)
          .setOrigin(0, 0)
          .setDepth(nome === 'frente' ? 60 : 0);
      }
      this.montarTochas();

      /*
       * A névoa junto ao horizonte.
       *
       * Ela separa o plano do meio dos atores. Sem essa separação os dois
       * ficam no mesmo plano de leitura e o cenário vira adesivo atrás do
       * personagem.
       */
      const nevoa = this.add.graphics().setDepth(15);
      for (let i = 0; i < 40; i += 1) {
        const y = area1.horizonteDe(this.altura) - 34 + i;
        nevoa.fillStyle(0x78a0b9, 0.16 * (1 - i / 40));
        nevoa.fillRect(0, y, this.largura, 1);
      }
    } else {
      const ceu = this.add.tileSprite(0, 0, this.largura, this.altura, `ceu:${area.numero}`).setOrigin(0, 0);
      ceu.setTileScale(2, 2);
      const medio = this.add
        .tileSprite(0, 0, this.largura, this.altura, `medio:${area.numero}`)
        .setOrigin(0, 0);
      medio.setTileScale(2, 2);
      const proximo = this.add
        .tileSprite(0, 0, this.largura, this.altura, `proximo:${area.numero}`)
        .setOrigin(0, 0);
      proximo.setTileScale(2, 2);
      const chao = this.add
        .tileSprite(0, this.chaoY - 6, this.largura, this.altura - this.chaoY + 6, `chao:${area.numero}`)
        .setOrigin(0, 0);
      chao.setTileScale(2, 2);
      this.camadas = [ceu, medio, proximo, chao];

      /* A neblina do fundo, que empurra o parallax para longe. */
      this.add
        .rectangle(0, 0, this.largura, this.chaoY, Number.parseInt(area.paleta.neblina.slice(1), 16), 0.13)
        .setOrigin(0, 0);
    }

    this.heroi = this.montarLado(
      this.xHeroi,
      this.elencoDoHeroi,
      `heroi:${classe.id}:${String(dourado)}`,
      'heroi',
    );
    this.alvo = this.montarLado(
      this.xInimigo,
      this.elencoDoAlvo,
      `inimigo:${inimigo.id}`,
      'inimigo',
    );

    this.criarParticulasDeAmbiente(area.paleta);
    this.entradaDosAtores(inimigo.porte === 'boss');
  }

  /**
   * As tochas.
   *
   * Cada uma é um núcleo brilhante e um halo, ambos pulsando fora de fase com
   * as outras. Fora de fase importa: quatro tochas piscando juntas leem como
   * um efeito ligando e desligando; fora de fase leem como fogo.
   */
  private montarTochas(): void {
    for (const [i, [x, y]] of this.tochasDaArea.entries()) {
      const halo = this.add
        .ellipse(x, y - 2, 30, 30, 0xff9d3c, 0.14)
        .setDepth(30)
        .setBlendMode(Phaser.BlendModes.ADD);
      /*
       * A chama é laranja, não branca.
       *
       * Uma elipse branca em blend aditivo estoura para branco puro e lê como
       * bug de render, não como fogo. O que dá fogo é a rampa: corpo laranja,
       * e só o miolo muito pequeno chegando ao creme.
       */
      const corpo = this.add
        .ellipse(x, y - 2, 4, 7, 0xe8873a, 0.85)
        .setDepth(31)
        .setBlendMode(Phaser.BlendModes.ADD);
      const nucleo = this.add
        .ellipse(x, y - 3, 2, 4, 0xfff3c4, 0.9)
        .setDepth(32)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.corposDeChama.push(corpo);
      this.chamas.push({ x, y, nucleo, halo, fase: i * 2.1 });
    }
  }

  private montarLado(
    x: number,
    elenco: Elenco,
    prefixo: string,
    quem: LadoDaArena,
  ): Lado {
    /*
     * A sombra de contato.
     *
     * Sem ela o sprite flutua: o olho não tem como saber onde o corpo encosta
     * no chão. Uma elipse escura e achatada resolve, e ela encolhe quando o
     * ator sobe — o que também comunica o salto do golpe.
     */
    const largura = Math.round(elenco.largura * elenco.escala * 0.42);
    const sombra = this.add.ellipse(x, this.chaoY + 2, largura, 7, 0x000000, 0.38).setDepth(10);
    /*
     * A âncora do pé.
     *
     * O quadro tem margem embaixo do calcanhar, e ignorar isso é o erro que
     * faz o personagem flutuar um pixel acima do chão em toda a cena. A
     * origem vertical é a **linha do pé** dentro do quadro, não a base dele.
     */
    const sprite = this.add
      .image(x, this.chaoY, `${prefixo}:repouso:0`)
      .setOrigin(0.5, elenco.chao / elenco.altura)
      .setScale(elenco.escala)
      .setDepth(20);
    orientar(sprite, quem);
    const lado: Lado = {
      sprite,
      sombra,
      elenco,
      prefixo,
      base: this.chaoY,
      quem,
      nome: 'repouso',
      tempo: 0,
      quadro: -1,
    };
    this.aplicarQuadro(lado);
    return lado;
  }

  /**
   * Troca a animação em curso.
   *
   * Uma animação que não repete não é interrompida por outra do mesmo peso —
   * caso contrário um ator que apanha três vezes em meio segundo nunca chega
   * a terminar o gesto e fica tremendo no primeiro quadro.
   */
  private tocar(lado: Lado, nome: NomeDeAnimacao, forcar = false): void {
    if (!forcar && lado.nome === nome) return;
    lado.nome = nome;
    lado.tempo = 0;
    lado.quadro = -1;
    this.aplicarQuadro(lado);
  }

  /** Põe na tela o quadro que o relógio da animação manda. */
  private aplicarQuadro(lado: Lado): void {
    const animacao = animacaoDe(lado.elenco, lado.nome);
    const total = animacao.quadros.length;
    const bruto = Math.floor(lado.tempo * animacao.fps);
    const i = animacao.repete ? bruto % total : Math.min(total - 1, bruto);
    if (i === lado.quadro) return;
    lado.quadro = i;
    lado.sprite.setTexture(`${lado.prefixo}:${lado.nome}:${String(i)}`);
    /* Trocar a textura pode zerar o espelhamento. Reafirmar é barato. */
    orientar(lado.sprite, lado.quem);
  }

  /** A animação acabou e não repete? Então é hora de voltar ao repouso. */
  private terminou(lado: Lado): boolean {
    const animacao = animacaoDe(lado.elenco, lado.nome);
    if (animacao.repete) return false;
    return lado.tempo * animacao.fps >= animacao.quadros.length;
  }

  /** As partículas do clima da área: folha, poeira, brasa, faísca, cinza. */
  private criarParticulasDeAmbiente(paleta: PaletaDeArea): void {
    const cor = Number.parseInt(paleta.particula.slice(1), 16);
    const quantidade = paleta.clima === 'poeira' ? 26 : 18;
    for (let i = 0; i < quantidade; i += 1) {
      const tamanho = paleta.clima === 'brasas' || paleta.clima === 'faiscas' ? 1 : 2;
      const particula = this.add
        .rectangle(Math.random() * this.largura, Math.random() * this.altura, tamanho, tamanho, cor, 0.55)
        .setDepth(5);
      this.particulas.push(particula);
    }
  }

  /** A entrada. O boss tem a dele: mais lenta, com escurecimento. */
  private entradaDosAtores(ehBoss: boolean): void {
    for (const lado of [this.heroi, this.alvo]) {
      lado.sprite.setAlpha(0);
      lado.sombra.setAlpha(0);
    }
    this.tweens.add({
      targets: [this.heroi.sprite, this.heroi.sombra],
      alpha: 1,
      x: { from: this.xHeroi - 28, to: this.xHeroi },
      duration: 420,
      ease: 'Cubic.easeOut',
    });
    this.tweens.add({
      targets: [this.alvo.sprite, this.alvo.sombra],
      alpha: 1,
      x: { from: this.xInimigo + (ehBoss ? 48 : 28), to: this.xInimigo },
      duration: ehBoss ? 900 : 420,
      delay: ehBoss ? 260 : 120,
      ease: ehBoss ? 'Cubic.easeInOut' : 'Cubic.easeOut',
    });
    if (ehBoss) {
      const veu = this.add
        .rectangle(0, 0, this.largura, this.altura, 0x000000, 0.75)
        .setOrigin(0, 0)
        .setDepth(800);
      this.tweens.add({
        targets: veu,
        alpha: 0,
        duration: 900,
        delay: 400,
        onComplete: () => {
          veu.destroy();
        },
      });
      this.cameras.main.shake(700, 0.006);
    }
  }

  public override update(_tempo: number, delta: number): void {
    const s = delta / 1000;
    /* O parallax anda devagar: a arena respira, mas não viaja. */
    const velocidades = [1.5, 5, 12, 26];
    this.camadas.forEach((camada, i) => {
      camada.tilePositionX += (velocidades[i] ?? 0) * s;
    });

    this.tempoDaCena += s;

    /*
     * O relógio das animações.
     *
     * Cada lado tem o seu, e ele **não** é o relógio da simulação: em 4x a
     * partida corre mais rápido, mas o gesto de atacar continua levando o
     * mesmo tempo. Acelerar a animação junto transformaria o combate num
     * borrão.
     */
    for (const lado of [this.heroi, this.alvo]) {
      if (lado.nome === 'morrer' && lado.quadro === animacaoDe(lado.elenco, 'morrer').quadros.length - 1) {
        continue;
      }
      lado.tempo += s;
      if (this.terminou(lado)) {
        this.tocar(lado, 'repouso', true);
        continue;
      }
      this.aplicarQuadro(lado);
    }

    /* As chamas das tochas, cada uma na sua fase. */
    this.chamas.forEach((chama, i) => {
      const pulso = Math.sin(this.tempoDaCena * 7 + chama.fase) * 0.5 + 0.5;
      const tremor = Math.sin(this.tempoDaCena * 9 + chama.fase) * 0.6;
      chama.nucleo.setScale(1, 0.7 + pulso * 0.6);
      chama.nucleo.x = chama.x + tremor;
      const corpo = this.corposDeChama[i];
      if (corpo !== undefined) {
        corpo.setScale(0.9 + pulso * 0.25, 0.8 + pulso * 0.5);
        corpo.x = chama.x + tremor * 0.7;
      }
      chama.halo.setScale(0.85 + pulso * 0.3);
      chama.halo.setAlpha(0.1 + pulso * 0.08);
    });

    this.moverParticulas(s);
  }

  private moverParticulas(s: number): void {
    const clima = this.paleta.clima;
    for (const particula of this.particulas) {
      const sobe = clima === 'brasas' || clima === 'faiscas';
      particula.y += (sobe ? -18 : 14) * s;
      particula.x += (clima === 'folhas' ? -24 : -8) * s;
      if (particula.y < -4) particula.y = this.altura + 4;
      if (particula.y > this.altura + 4) particula.y = -4;
      if (particula.x < -4) particula.x = this.largura + 4;
    }
  }

  /* -------------------------------------------------------------------------
   * A tradução dos eventos.
   * ---------------------------------------------------------------------- */

  /** A força do tremor por porte. Nunca a mesma para tudo. */
  private tremorDe(porte: Porte, ehBoss: boolean): number {
    const t = BALANCEAMENTO.tremor;
    if (ehBoss) return t.boss;
    return porte === 'ultimate' ? t.ultimate : porte === 'skill' ? t.skill : t.basico;
  }

  private atacar(lado: Lado, paraDireita: boolean, porte: Porte): void {
    this.tocar(lado, porte === 'basico' ? 'ataque' : 'habilidade', true);

    const alcance = porte === 'basico' ? 11 : porte === 'skill' ? 18 : 25;
    const destino = lado.sprite.x + (paraDireita ? alcance : -alcance);
    const origem = paraDireita ? this.xHeroi : this.xInimigo;

    this.tweens.chain({
      targets: lado.sprite,
      tweens: [
        /* A antecipação: recua antes de avançar. É ela que dá o peso. */
        { x: origem + (paraDireita ? -6 : 6), duration: 110, ease: 'Quad.easeOut' },
        { x: destino, duration: 90, ease: 'Quad.easeIn' },
        { x: origem, duration: 220, ease: 'Cubic.easeOut' },
      ],
    });
  }

  private apanhar(lado: Lado, critico: boolean): void {
    /* Quem está no meio de um golpe não perde o gesto por levar um arranhão. */
    if (lado.nome !== 'ataque' && lado.nome !== 'habilidade' && lado.nome !== 'morrer') {
      this.tocar(lado, 'apanhar', true);
    }
    lado.sprite.setTintFill(critico ? 0xffe9a8 : 0xffffff);
    /*
     * O clarão apaga em tempo **real**, não no relógio da cena.
     *
     * A pausa de impacto põe o relógio da cena a 6% da velocidade. Um
     * `delayedCall(70)` nesse relógio levava mais de um segundo para
     * disparar, e o personagem ficava mais de um segundo branco — que foi
     * exatamente o borrão branco que apareceu nas capturas.
     */
    globalThis.setTimeout(() => {
      if (lado.sprite.active) lado.sprite.clearTint();
    }, 70);
    this.tweens.add({
      targets: lado.sprite,
      x: lado.sprite.x + (lado === this.heroi ? -4 : 4),
      duration: 70,
      yoyo: true,
      ease: 'Quad.easeOut',
    });
  }

  /**
   * O ponto alto: os eventos do passo viram cena.
   *
   * Chamado pelo React a cada quadro, com o que a simulação produziu desde o
   * quadro anterior. Em 4x chegam quatro vezes mais eventos, e a cena os
   * desenha todos — o que acelera é a partida, não a animação.
   */
  public aplicar(eventos: readonly EventoDeCombate[], ehBoss: boolean): void {
    for (const evento of eventos) {
      switch (evento.tipo) {
        case 'habilidade':
          this.atacar(this.heroi, true, evento.porte);
          /*
           * O rastro nasce na **arma**, não no meio do caminho.
           *
           * Longe do corpo ele vira um risco solto no ar, que não se liga a
           * ninguém. Colado no braço, ele lê como o arco que a lâmina fez.
           */
          arcoDeGolpe(this, this.xHeroi + 18, this.chaoY - 36, true, this.dados.classe.corPrimaria);
          if (evento.porte !== 'basico') {
            this.cameras.main.shake(
              BALANCEAMENTO.tremor.duracaoMs,
              this.tremorDe(evento.porte, false),
            );
          }
          break;

        case 'golpe': {
          const doJogador = evento.origem === 'jogador';
          const alvo = doJogador ? this.alvo : this.heroi;
          const x = doJogador ? this.xInimigo : this.xHeroi;
          if (!doJogador) this.atacar(this.alvo, false, evento.porte);
          this.apanhar(alvo, evento.critico);
          clarao(
            this,
            x,
            this.chaoY - 34,
            doJogador ? 0xffd08a : 0xff6b5a,
            evento.critico ? 19 : 12,
          );
          estilhacos(this, x, this.chaoY - 34, doJogador ? 0xffd08a : 0xff6b5a, evento.critico ? 9 : 5);
          numeroFlutuante(
            this,
            x,
            this.chaoY - 46,
            String(Math.max(1, Math.round(evento.valor))),
            doJogador ? (evento.critico ? '#ffe9a8' : '#ffffff') : '#ff8a7a',
            evento.critico ? 16 : 11,
          );
          if (evento.critico || evento.porte === 'ultimate') {
            pausaDeImpacto(this, evento.porte === 'ultimate' ? 90 : 55);
            this.cameras.main.shake(
              BALANCEAMENTO.tremor.duracaoMs,
              this.tremorDe(evento.porte, ehBoss && !doJogador),
            );
          }
          break;
        }

        case 'armadura-quebrada':
          anelDeRuptura(
            this,
            evento.alvo === 'inimigo' ? this.xInimigo : this.xHeroi,
            this.chaoY - 34,
          );
          this.cameras.main.shake(140, BALANCEAMENTO.tremor.skill);
          break;

        case 'cura':
          if (evento.valor < 1) break;
          numeroFlutuante(this, this.xHeroi, this.chaoY - 56, `+${String(Math.round(evento.valor))}`, '#7fe4d2', 11);
          break;

        case 'pocao':
          this.tocar(this.heroi, 'pocao', true);
          clarao(this, this.xHeroi, this.chaoY - 34, 0x7fe4d2, 22);
          numeroFlutuante(this, this.xHeroi, this.chaoY - 56, `+${String(Math.round(evento.valor))}`, '#7fe4d2', 14);
          break;

        case 'momentum':
          numeroFlutuante(this, this.xHeroi - 18, this.chaoY - 62, `+${String(evento.valor)}`, '#e8873a', 10);
          break;

        case 'especial': {
          const aviso = this.add
            .text(Math.min(this.xInimigo, this.largura - 70), this.chaoY - 86, evento.nome.toUpperCase(), {
              fontFamily: 'monospace',
              fontSize: '8px',
              color: '#ff8a7a',
              stroke: '#0b0810',
              strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setDepth(900);
          this.tweens.add({
            targets: aviso,
            alpha: { from: 1, to: 0 },
            y: aviso.y - 16,
            duration: 900,
            onComplete: () => {
              aviso.destroy();
            },
          });
          break;
        }

        case 'morte': {
          const caido = evento.quem === 'inimigo' ? this.alvo : this.heroi;
          this.tocar(caido, 'morrer', true);
          this.tweens.add({
            targets: [caido.sprite, caido.sombra],
            alpha: 0,
            duration: 900,
            delay: 380,
            ease: 'Quad.easeIn',
          });
          estilhacos(
            this,
            evento.quem === 'inimigo' ? this.xInimigo : this.xHeroi,
            this.chaoY - 32,
            0xffffff,
            16,
          );
          this.cameras.main.shake(260, BALANCEAMENTO.tremor.ultimate);
          break;
        }

        case 'sangramento':
          break;
      }
    }
  }

  /** Troca o inimigo sem recriar a cena inteira: a sala muda, a arena fica. */
  public trocarInimigo(inimigo: Inimigo, sala: number): void {
    this.scene.restart({ ...this.dados, inimigo, sala });
  }
}

export const CONFIG_DA_FASE = { ALTURA, DO_CHAO, FRACAO_HEROI, FRACAO_INIMIGO } as const;

/** A cor de um ator, para quem precisa combinar HUD com cena. */
export const corDoAtor = (cor: string): string => ajustar(cor, 0.1);
