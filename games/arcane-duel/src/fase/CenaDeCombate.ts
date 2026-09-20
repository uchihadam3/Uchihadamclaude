import Phaser from 'phaser';

import { areaDaSala } from '../dados/areas.js';
import { BALANCEAMENTO } from '../dados/balanceamento.js';
import type { Classe, Inimigo, PaletaDeArea } from '../dados/tipos.js';
import type { EventoDeCombate, Porte } from '../nucleo/combate.js';

import type { Lado as LadoDaArena } from './arte/orientacao.js';
import { orientar } from './arte/orientacao.js';
import { gerarHeroi, gerarInimigo } from './atores.js';
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

const LARGURA = 480;
const ALTURA = 270;
const CHAO_Y = 214;
const X_HEROI = 132;
const X_INIMIGO = 348;

export interface DadosDaCena {
  readonly classe: Classe;
  readonly dourado: boolean;
  readonly sala: number;
  readonly inimigo: Inimigo;
}

interface Lado {
  readonly sprite: Phaser.GameObjects.Image;
  readonly sombra: Phaser.GameObjects.Ellipse;
  readonly chaves: readonly string[];
  readonly base: number;
  /** Quem é este lado. É daqui que sai a orientação, e de nenhum outro lugar. */
  readonly quem: LadoDaArena;
}

export class CenaDeCombate extends Phaser.Scene {
  private heroi!: Lado;
  private alvo!: Lado;
  private paleta!: PaletaDeArea;
  private camadas: Phaser.GameObjects.TileSprite[] = [];
  private particulas: Phaser.GameObjects.Rectangle[] = [];
  private dados!: DadosDaCena;
  private tempoDeRespiro = 0;

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

    const cenario = gerarCenario(area.paleta, area.numero);
    this.registrarTela(`ceu:${area.numero}`, cenario.distante);
    this.registrarTela(`medio:${area.numero}`, cenario.medio);
    this.registrarTela(`proximo:${area.numero}`, cenario.proximo);
    this.registrarTela(`chao:${area.numero}`, cenario.chao);

    const heroi = gerarHeroi(classe, dourado);
    heroi.quadros.forEach((quadro, i) => {
      this.registrarTela(`heroi:${String(dourado)}:${i}`, quadro);
    });

    const ator = gerarInimigo(inimigo.silhueta, inimigo.id);
    ator.quadros.forEach((quadro, i) => {
      this.registrarTela(`inimigo:${inimigo.id}:${i}`, quadro);
    });
  }

  private registrarTela(chave: string, tela: HTMLCanvasElement): void {
    if (this.textures.exists(chave)) this.textures.remove(chave);
    this.textures.addCanvas(chave, tela);
  }

  public create(): void {
    const { classe, dourado, sala, inimigo } = this.dados;
    const area = areaDaSala(sala);

    /*
     * O parallax.
     *
     * `TileSprite` repete o azulejo sem costura, e cada camada anda numa
     * velocidade. O céu quase não anda; o chão anda bastante. É a diferença
     * de velocidade que produz profundidade — mais do que a diferença de cor.
     */
    const ceu = this.add.tileSprite(0, 0, LARGURA, ALTURA, `ceu:${area.numero}`).setOrigin(0, 0);
    ceu.setTileScale(3, 3);
    const medio = this.add.tileSprite(0, 0, LARGURA, ALTURA, `medio:${area.numero}`).setOrigin(0, 0);
    medio.setTileScale(3, 3);
    const proximo = this.add
      .tileSprite(0, 0, LARGURA, ALTURA, `proximo:${area.numero}`)
      .setOrigin(0, 0);
    proximo.setTileScale(3, 3);
    const chao = this.add
      .tileSprite(0, CHAO_Y - 8, LARGURA, ALTURA - CHAO_Y + 8, `chao:${area.numero}`)
      .setOrigin(0, 0);
    chao.setTileScale(3, 3);
    this.camadas = [ceu, medio, proximo, chao];

    /* A neblina do fundo, que empurra o parallax para longe. */
    this.add
      .rectangle(0, 0, LARGURA, CHAO_Y, Number.parseInt(area.paleta.neblina.slice(1), 16), 0.13)
      .setOrigin(0, 0);

    this.heroi = this.montarLado(
      X_HEROI,
      [0, 1, 2].map((i) => `heroi:${String(dourado)}:${i}`),
      classe.corPrimaria,
      'heroi',
    );
    this.alvo = this.montarLado(
      X_INIMIGO,
      [0, 1, 2].map((i) => `inimigo:${inimigo.id}:${i}`),
      inimigo.silhueta.brilho,
      'inimigo',
    );

    this.criarParticulasDeAmbiente(area.paleta);
    this.entradaDosAtores(inimigo.porte === 'boss');
  }

  private montarLado(
    x: number,
    chaves: readonly string[],
    _cor: string,
    quem: LadoDaArena,
  ): Lado {
    /*
     * A sombra de contato.
     *
     * Sem ela o sprite flutua: o olho não tem como saber onde o corpo encosta
     * no chão. Uma elipse escura e achatada resolve, e ela encolhe quando o
     * ator sobe — o que também comunica o salto do golpe.
     */
    const sombra = this.add.ellipse(x, CHAO_Y + 3, 40, 10, 0x000000, 0.4).setDepth(10);
    const sprite = this.add
      .image(x, CHAO_Y, chaves[0] ?? '')
      .setOrigin(0.5, 1)
      .setScale(3)
      .setDepth(20);
    orientar(sprite, quem);
    return { sprite, sombra, chaves, base: CHAO_Y, quem };
  }

  /** As partículas do clima da área: folha, poeira, brasa, faísca, cinza. */
  private criarParticulasDeAmbiente(paleta: PaletaDeArea): void {
    const cor = Number.parseInt(paleta.particula.slice(1), 16);
    const quantidade = paleta.clima === 'poeira' ? 26 : 18;
    for (let i = 0; i < quantidade; i += 1) {
      const tamanho = paleta.clima === 'brasas' || paleta.clima === 'faiscas' ? 2 : 3;
      const particula = this.add
        .rectangle(Math.random() * LARGURA, Math.random() * ALTURA, tamanho, tamanho, cor, 0.55)
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
      x: { from: X_HEROI - 40, to: X_HEROI },
      duration: 420,
      ease: 'Cubic.easeOut',
    });
    this.tweens.add({
      targets: [this.alvo.sprite, this.alvo.sombra],
      alpha: 1,
      x: { from: X_INIMIGO + (ehBoss ? 70 : 40), to: X_INIMIGO },
      duration: ehBoss ? 900 : 420,
      delay: ehBoss ? 260 : 120,
      ease: ehBoss ? 'Cubic.easeInOut' : 'Cubic.easeOut',
    });
    if (ehBoss) {
      const veu = this.add
        .rectangle(0, 0, LARGURA, ALTURA, 0x000000, 0.75)
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

    /* A respiração dos atores, entre os quadros de repouso. */
    this.tempoDeRespiro += s;
    const respirando = Math.sin(this.tempoDeRespiro * 2.4) > 0 ? 1 : 0;
    for (const lado of [this.heroi, this.alvo]) {
      if (lado.sprite.getData('ocupado') === true) continue;
      const chave = lado.chaves[respirando];
      if (chave !== undefined && lado.sprite.texture.key !== chave) {
        lado.sprite.setTexture(chave);
        /* Trocar a textura pode zerar o espelhamento. Reafirmar é barato. */
        orientar(lado.sprite, lado.quem);
      }
    }

    this.moverParticulas(s);
  }

  private moverParticulas(s: number): void {
    const clima = this.paleta.clima;
    for (const particula of this.particulas) {
      const sobe = clima === 'brasas' || clima === 'faiscas';
      particula.y += (sobe ? -18 : 14) * s;
      particula.x += (clima === 'folhas' ? -24 : -8) * s;
      if (particula.y < -4) particula.y = ALTURA + 4;
      if (particula.y > ALTURA + 4) particula.y = -4;
      if (particula.x < -4) particula.x = LARGURA + 4;
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
    const quadroDeGolpe = lado.chaves[2];
    if (quadroDeGolpe !== undefined) {
      lado.sprite.setTexture(quadroDeGolpe);
      orientar(lado.sprite, lado.quem);
    }
    lado.sprite.setData('ocupado', true);

    const alcance = porte === 'basico' ? 16 : porte === 'skill' ? 26 : 36;
    const destino = lado.sprite.x + (paraDireita ? alcance : -alcance);
    const origem = paraDireita ? X_HEROI : X_INIMIGO;

    this.tweens.chain({
      targets: lado.sprite,
      tweens: [
        /* A antecipação: recua antes de avançar. É ela que dá o peso. */
        { x: origem + (paraDireita ? -8 : 8), duration: 110, ease: 'Quad.easeOut' },
        { x: destino, duration: 90, ease: 'Quad.easeIn' },
        { x: origem, duration: 220, ease: 'Cubic.easeOut' },
      ],
      onComplete: () => {
        lado.sprite.setData('ocupado', false);
      },
    });
  }

  private apanhar(lado: Lado, critico: boolean): void {
    lado.sprite.setTintFill(critico ? 0xffe9a8 : 0xffffff);
    this.time.delayedCall(70, () => {
      lado.sprite.clearTint();
    });
    this.tweens.add({
      targets: lado.sprite,
      x: lado.sprite.x + (lado === this.heroi ? -6 : 6),
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
          arcoDeGolpe(this, X_HEROI + 40, CHAO_Y - 40, true, this.dados.classe.corPrimaria);
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
          const x = doJogador ? X_INIMIGO : X_HEROI;
          if (!doJogador) this.atacar(this.alvo, false, evento.porte);
          this.apanhar(alvo, evento.critico);
          clarao(
            this,
            x,
            CHAO_Y - 44,
            doJogador ? 0xffd08a : 0xff6b5a,
            evento.critico ? 26 : 16,
          );
          estilhacos(this, x, CHAO_Y - 44, doJogador ? 0xffd08a : 0xff6b5a, evento.critico ? 9 : 5);
          numeroFlutuante(
            this,
            x,
            CHAO_Y - 56,
            String(Math.max(1, Math.round(evento.valor))),
            doJogador ? (evento.critico ? '#ffe9a8' : '#ffffff') : '#ff8a7a',
            evento.critico ? 22 : 15,
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
            evento.alvo === 'inimigo' ? X_INIMIGO : X_HEROI,
            CHAO_Y - 44,
          );
          this.cameras.main.shake(140, BALANCEAMENTO.tremor.skill);
          break;

        case 'cura':
          if (evento.valor < 1) break;
          numeroFlutuante(this, X_HEROI, CHAO_Y - 70, `+${String(Math.round(evento.valor))}`, '#7fe4d2', 15);
          break;

        case 'pocao':
          clarao(this, X_HEROI, CHAO_Y - 44, 0x7fe4d2, 30);
          numeroFlutuante(this, X_HEROI, CHAO_Y - 70, `+${String(Math.round(evento.valor))}`, '#7fe4d2', 19);
          break;

        case 'momentum':
          numeroFlutuante(this, X_HEROI - 24, CHAO_Y - 78, `+${String(evento.valor)}`, '#e8873a', 13);
          break;

        case 'especial': {
          const aviso = this.add
            .text(X_INIMIGO, CHAO_Y - 108, evento.nome.toUpperCase(), {
              fontFamily: 'monospace',
              fontSize: '13px',
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
          caido.sprite.setData('ocupado', true);
          this.tweens.add({
            targets: [caido.sprite, caido.sombra],
            alpha: 0,
            angle: evento.quem === 'inimigo' ? 70 : -70,
            y: '+=14',
            duration: 520,
            ease: 'Quad.easeIn',
          });
          estilhacos(
            this,
            evento.quem === 'inimigo' ? X_INIMIGO : X_HEROI,
            CHAO_Y - 40,
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

export const CONFIG_DA_FASE = { LARGURA, ALTURA, CHAO_Y, X_HEROI, X_INIMIGO } as const;

/** A cor de um ator, para quem precisa combinar HUD com cena. */
export const corDoAtor = (cor: string): string => ajustar(cor, 0.1);
