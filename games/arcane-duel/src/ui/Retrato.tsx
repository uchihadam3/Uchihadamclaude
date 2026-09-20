import { useEffect, useRef } from 'react';

/*
 * Um retrato animado.
 *
 * Ele desenha os quadros já prontos de uma animação num canvas, em loop. É o
 * que permite mostrar o **personagem de verdade** na seleção de classe e nas
 * telas de resultado, em vez de um ícone — e é a mesma arte que vai lutar,
 * então não há risco de o retrato prometer algo que o jogo não entrega.
 */

export const Retrato = ({
  quadros,
  fps,
  escala,
}: {
  readonly quadros: readonly HTMLCanvasElement[];
  readonly fps: number;
  readonly escala: number;
}): React.JSX.Element => {
  const alvo = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const tela = alvo.current;
    const primeiro = quadros[0];
    if (tela === null || primeiro === undefined) return;
    const ctx = tela.getContext('2d');
    if (ctx === null) return;
    tela.width = primeiro.width * escala;
    tela.height = primeiro.height * escala;
    ctx.imageSmoothingEnabled = false;

    let vivo = true;
    let pedido = 0;
    const comeco = performance.now();
    const passo = (agora: number): void => {
      if (!vivo) return;
      const i = Math.floor(((agora - comeco) / 1000) * fps) % quadros.length;
      const quadro = quadros[i] ?? primeiro;
      ctx.clearRect(0, 0, tela.width, tela.height);
      ctx.drawImage(quadro, 0, 0, tela.width, tela.height);
      pedido = requestAnimationFrame(passo);
    };
    pedido = requestAnimationFrame(passo);
    return () => {
      vivo = false;
      cancelAnimationFrame(pedido);
    };
  }, [quadros, fps, escala]);

  return <canvas className="retrato" ref={alvo} aria-hidden="true" />;
};
