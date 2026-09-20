import type { NomeDeMaterial } from './rampas.js';
import { RAMPAS } from './rampas.js';

/*
 * A tela de índices.
 *
 * Desenhar direto em cores torna impossível sombrear depois: quando o pixel
 * já é `#7a1d26`, não dá para saber se ele é pano na sombra ou pano na luz.
 * Então aqui se desenha em **dois índices** — que material, e que degrau da
 * rampa — e a cor só é resolvida no fim.
 *
 * É o que permite as três coisas que dão acabamento: escurecer uma parte
 * inteira sem recalcular cor, acender uma borda de luz sobre qualquer
 * material, e trocar a paleta do Guerreiro para a Forma Dourada sem
 * redesenhar um pixel.
 */

const VAZIO = 255;

export class TelaDeArte {
  public readonly largura: number;
  public readonly altura: number;
  private readonly material: Uint8Array;
  private readonly tom: Uint8Array;
  private readonly nomes: NomeDeMaterial[] = [];
  private readonly indicePorNome = new Map<NomeDeMaterial, number>();

  public constructor(largura: number, altura: number) {
    this.largura = largura;
    this.altura = altura;
    this.material = new Uint8Array(largura * altura).fill(VAZIO);
    this.tom = new Uint8Array(largura * altura);
  }

  private idDoMaterial(nome: NomeDeMaterial): number {
    const existente = this.indicePorNome.get(nome);
    if (existente !== undefined) return existente;
    const id = this.nomes.length;
    this.nomes.push(nome);
    this.indicePorNome.set(nome, id);
    return id;
  }

  public dentro(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.largura && y < this.altura;
  }

  public pixel(x: number, y: number, nome: NomeDeMaterial, tom: number): void {
    const px = Math.round(x);
    const py = Math.round(y);
    if (!this.dentro(px, py)) return;
    const i = py * this.largura + px;
    this.material[i] = this.idDoMaterial(nome);
    this.tom[i] = Math.max(0, Math.min(4, Math.round(tom)));
  }

  public temPixel(x: number, y: number): boolean {
    const px = Math.round(x);
    const py = Math.round(y);
    if (!this.dentro(px, py)) return false;
    return this.material[py * this.largura + px] !== VAZIO;
  }

  public tomEm(x: number, y: number): number | null {
    const px = Math.round(x);
    const py = Math.round(y);
    if (!this.dentro(px, py)) return null;
    const i = py * this.largura + px;
    return this.material[i] === VAZIO ? null : (this.tom[i] ?? 0);
  }

  public materialEm(x: number, y: number): NomeDeMaterial | null {
    const px = Math.round(x);
    const py = Math.round(y);
    if (!this.dentro(px, py)) return null;
    const i = py * this.largura + px;
    const id = this.material[i];
    if (id === undefined || id === VAZIO) return null;
    return this.nomes[id] ?? null;
  }

  /* -----------------------------------------------------------------------
   * Formas.
   * -------------------------------------------------------------------- */

  public retangulo(
    x: number,
    y: number,
    l: number,
    a: number,
    nome: NomeDeMaterial,
    tom: number,
  ): void {
    for (let dy = 0; dy < a; dy += 1) {
      for (let dx = 0; dx < l; dx += 1) this.pixel(x + dx, y + dy, nome, tom);
    }
  }

  public elipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    nome: NomeDeMaterial,
    tom: number,
  ): void {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
        const nx = (x + 0.5 - cx) / Math.max(0.5, rx);
        const ny = (y + 0.5 - cy) / Math.max(0.5, ry);
        if (nx * nx + ny * ny <= 1) this.pixel(x, y, nome, tom);
      }
    }
  }

  /**
   * Um polígono cheio, por varredura de linha.
   *
   * É com ele que as placas de armadura são desenhadas: uma placa é um
   * quadrilátero levemente irregular, e desenhá-la como retângulo é o que faz
   * armadura virar caixa.
   */
  public poligono(
    pontos: readonly (readonly [number, number])[],
    nome: NomeDeMaterial,
    tom: number,
  ): void {
    if (pontos.length < 3) return;
    let yMin = Infinity;
    let yMax = -Infinity;
    for (const [, y] of pontos) {
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
    for (let y = Math.floor(yMin); y <= Math.ceil(yMax); y += 1) {
      const cortes: number[] = [];
      for (let i = 0; i < pontos.length; i += 1) {
        const a = pontos[i];
        const b = pontos[(i + 1) % pontos.length];
        if (a === undefined || b === undefined) continue;
        const [ax, ay] = a;
        const [bx, by] = b;
        if (ay === by) continue;
        const centro = y + 0.5;
        if (centro < Math.min(ay, by) || centro >= Math.max(ay, by)) continue;
        cortes.push(ax + ((centro - ay) / (by - ay)) * (bx - ax));
      }
      cortes.sort((p, q) => p - q);
      for (let i = 0; i + 1 < cortes.length; i += 2) {
        const de = cortes[i];
        const ate = cortes[i + 1];
        if (de === undefined || ate === undefined) continue;
        for (let x = Math.ceil(de - 0.5); x <= Math.floor(ate - 0.5); x += 1) {
          this.pixel(x, y, nome, tom);
        }
      }
    }
  }

  /** Uma linha de 1 px. Serve para juntas, correias e o fio da lâmina. */
  public linha(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    nome: NomeDeMaterial,
    tom: number,
  ): void {
    const passos = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let i = 0; i <= passos; i += 1) {
      const t = i / passos;
      this.pixel(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, nome, tom);
    }
  }

  /* -----------------------------------------------------------------------
   * Acabamento.
   * -------------------------------------------------------------------- */

  /**
   * A luz de borda.
   *
   * Um pixel mais claro na aresta voltada para a fonte de luz. É o acabamento
   * que mais rende: sem ele, a silhueta some contra um fundo escuro; com ele,
   * o personagem se descola do cenário em qualquer área.
   */
  public luzDeBorda(direcaoX: number, direcaoY: number, degraus = 2): void {
    const marcas: [number, number, NomeDeMaterial, number][] = [];
    for (let y = 0; y < this.altura; y += 1) {
      for (let x = 0; x < this.largura; x += 1) {
        const material = this.materialEm(x, y);
        if (material === null) continue;
        const vizinho = this.temPixel(x + Math.sign(direcaoX), y + Math.sign(direcaoY));
        if (vizinho) continue;
        const tom = this.tomEm(x, y) ?? 2;
        marcas.push([x, y, material, Math.min(4, tom + degraus)]);
      }
    }
    for (const [x, y, material, tom] of marcas) this.pixel(x, y, material, tom);
  }

  /** A oclusão de contato: a sombra que uma parte projeta na de baixo. */
  public sombraDeContato(altura = 3, forca = 1): void {
    const marcas: [number, number, NomeDeMaterial, number][] = [];
    for (let y = 0; y < this.altura; y += 1) {
      for (let x = 0; x < this.largura; x += 1) {
        const material = this.materialEm(x, y);
        if (material === null) continue;
        let coberto = 0;
        for (let d = 1; d <= altura; d += 1) {
          if (this.temPixel(x, y - d)) coberto += 1;
        }
        if (coberto < altura) continue;
        const tom = this.tomEm(x, y) ?? 2;
        marcas.push([x, y, material, Math.max(0, tom - forca)]);
      }
    }
    for (const [x, y, material, tom] of marcas) this.pixel(x, y, material, tom);
  }

  /**
   * O contorno.
   *
   * Escuro, **fora** da silhueta, e feito do material vizinho no degrau mais
   * baixo. Contorno preto uniforme achata; contorno do próprio material
   * mantém o volume e ainda separa a peça do fundo.
   */
  public contornar(): void {
    const marcas: [number, number, NomeDeMaterial][] = [];
    for (let y = 0; y < this.altura; y += 1) {
      for (let x = 0; x < this.largura; x += 1) {
        if (this.temPixel(x, y)) continue;
        const vizinhos: NomeDeMaterial[] = [];
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ] as const) {
          const material = this.materialEm(x + dx, y + dy);
          if (material !== null) vizinhos.push(material);
        }
        const primeiro = vizinhos[0];
        if (primeiro !== undefined) marcas.push([x, y, primeiro]);
      }
    }
    for (const [x, y, material] of marcas) this.pixel(x, y, material, 0);
  }

  /** Escurece uma faixa horizontal. Usado para o corpo sob a sombra da capa. */
  public escurecer(x: number, y: number, l: number, a: number, quanto: number): void {
    for (let dy = 0; dy < a; dy += 1) {
      for (let dx = 0; dx < l; dx += 1) {
        const material = this.materialEm(x + dx, y + dy);
        if (material === null) continue;
        const tom = this.tomEm(x + dx, y + dy) ?? 2;
        this.pixel(x + dx, y + dy, material, Math.max(0, tom - quanto));
      }
    }
  }

  /* -----------------------------------------------------------------------
   * Saída.
   * -------------------------------------------------------------------- */

  /** Resolve índices em cores e devolve um canvas pronto para virar textura. */
  public resolver(substituir?: Partial<Record<NomeDeMaterial, NomeDeMaterial>>): HTMLCanvasElement {
    const tela = document.createElement('canvas');
    tela.width = this.largura;
    tela.height = this.altura;
    const ctx = tela.getContext('2d');
    if (ctx === null) return tela;
    const imagem = ctx.createImageData(this.largura, this.altura);

    for (let i = 0; i < this.largura * this.altura; i += 1) {
      const id = this.material[i];
      if (id === undefined || id === VAZIO) continue;
      const bruto = this.nomes[id];
      if (bruto === undefined) continue;
      const nome = substituir?.[bruto] ?? bruto;
      const rampa = RAMPAS[nome];
      const cor = rampa[Math.max(0, Math.min(4, this.tom[i] ?? 0))] ?? rampa[2];
      const n = Number.parseInt(cor.slice(1), 16);
      imagem.data[i * 4] = (n >> 16) & 255;
      imagem.data[i * 4 + 1] = (n >> 8) & 255;
      imagem.data[i * 4 + 2] = n & 255;
      imagem.data[i * 4 + 3] = 255;
    }

    ctx.putImageData(imagem, 0, 0);
    return tela;
  }
}
