// Pós-processamento de bloom: pega o quadro já desenhado, cria uma cópia
// borrada e mais brilhante/saturada e a soma de volta (blending aditivo).
// A base nítida continua embaixo, então ganha-se brilho e vibração SEM perder
// definição. É o que dá o "pop" premium ao visual.
export class Bloom {
  private buf = document.createElement('canvas');
  private buf2 = document.createElement('canvas');
  private bctx = this.buf.getContext('2d');
  private bctx2 = this.buf2.getContext('2d');

  // src = canvas visível (dimensões em pixels de dispositivo em src.width/height)
  apply(ctx: CanvasRenderingContext2D, src: HTMLCanvasElement, strength = 0.6, blur = 6): void {
    if (!this.bctx || !this.bctx2) return;
    const dw = src.width, dh = src.height;
    const sc = 0.5;
    const bw = Math.max(1, Math.round(dw * sc));
    const bh = Math.max(1, Math.round(dh * sc));
    if (this.buf.width !== bw || this.buf.height !== bh) {
      this.buf.width = bw; this.buf.height = bh;
      this.buf2.width = bw; this.buf2.height = bh;
    }
    // passe 1: reduz + realça brilho/saturação (bright pass)
    this.bctx.setTransform(1, 0, 0, 1, 0, 0);
    this.bctx.globalCompositeOperation = 'source-over';
    this.bctx.filter = 'brightness(1.32) saturate(1.45) contrast(1.12)';
    this.bctx.clearRect(0, 0, bw, bh);
    this.bctx.drawImage(src, 0, 0, dw, dh, 0, 0, bw, bh);
    this.bctx.filter = 'none';
    // passe 2: borra
    this.bctx2.setTransform(1, 0, 0, 1, 0, 0);
    this.bctx2.clearRect(0, 0, bw, bh);
    this.bctx2.filter = `blur(${blur}px)`;
    this.bctx2.drawImage(this.buf, 0, 0);
    this.bctx2.filter = 'none';
    // soma de volta na tela (aditivo)
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = strength;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(this.buf2, 0, 0, bw, bh, 0, 0, dw, dh);
    // segundo passe mais largo e sutil para halo suave
    ctx.globalAlpha = strength * 0.34;
    this.bctx2.filter = `blur(${blur * 2.4}px)`;
    this.bctx2.clearRect(0, 0, bw, bh);
    this.bctx2.drawImage(this.buf, 0, 0);
    this.bctx2.filter = 'none';
    ctx.drawImage(this.buf2, 0, 0, bw, bh, 0, 0, dw, dh);
    ctx.restore();
  }
}
