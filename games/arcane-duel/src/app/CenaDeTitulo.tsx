import { useEffect, useRef } from 'react';

import { gerarLogo } from '../fase/arte/logo.js';
import { jogoPronto } from './carregando.js';
import * as titulo from '../fase/arte/titulo.js';

/*
 * A tela inicial, desenhada num canvas.
 *
 * Fazer isto em DOM seria possível e seria errado: cada tocha viraria um
 * elemento com `@keyframes`, a névoa viraria um gradiente animado, e o
 * conjunto teria o cheiro de página web que esta tela existe para não ter.
 * Num canvas, ela é uma cena — com parallax, partículas e luz que pulsa — e a
 * interface por cima é só o menu.
 *
 * A cena continua rodando atrás do menu. É o que separa "tela de título de
 * jogo" de "cartaz com botões".
 */

export interface CenaDeTituloProps {
  /** 0 a 1: quanto da entrada cinemática já passou. */
  readonly entrada: number;
  /** Escurece a cena quando um painel abre por cima. */
  readonly escurecer?: number;
}

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  tamanho: number;
  quente: boolean;
}

export const CenaDeTitulo = ({ entrada, escurecer = 0 }: CenaDeTituloProps): React.JSX.Element => {
  const caixa = useRef<HTMLCanvasElement | null>(null);
  const progresso = useRef(entrada);
  const escuridao = useRef(escurecer);
  progresso.current = entrada;
  escuridao.current = escurecer;

  useEffect(() => {
    const tela = caixa.current;
    if (tela === null) return;
    const ctx = tela.getContext('2d');
    if (ctx === null) return;

    const camadaCeu = titulo.ceu();
    const camadaMontanhas = titulo.montanhas();
    const { tela: camadaFortaleza, tochas, bandeiras } = titulo.fortaleza();
    const camadaFrente = titulo.frente();
    const logo = gerarLogo();

    /*
     * As partículas vivem num pote fixo.
     *
     * Criar e descartar objeto a cada quadro é o caminho mais curto para o
     * coletor de lixo engasgar no meio da animação — num celular isso aparece
     * como travadinha periódica. O pote nasce cheio e as partículas são
     * **reaproveitadas**: nenhuma alocação depois do primeiro quadro.
     */
    const pote: Particula[] = [];
    for (let i = 0; i < 90; i += 1) {
      pote.push({ x: 0, y: 0, vx: 0, vy: 0, vida: 0, tamanho: 1, quente: false });
    }
    let proxima = 0;
    const emitir = (x: number, y: number, quente: boolean): void => {
      const p = pote[proxima % pote.length];
      proxima += 1;
      if (p === undefined) return;
      p.x = x;
      p.y = y;
      p.vx = quente ? (Math.random() - 0.5) * 7 : -3 - Math.random() * 7;
      p.vy = quente ? -9 - Math.random() * 12 : 2 + Math.random() * 4;
      p.vida = 1;
      p.tamanho = quente ? 1 : Math.random() < 0.25 ? 2 : 1;
      p.quente = quente;
    };

    let vivo = true;
    let pedido = 0;
    let anterior = performance.now();
    let tempo = 0;

    const quadro = (agora: number): void => {
      if (!vivo) return;
      const dt = Math.min(0.05, (agora - anterior) / 1000);
      anterior = agora;
      tempo += dt;

      /*
       * O enquadramento.
       *
       * O canvas tem o tamanho **da tela**, em pixels de dispositivo, e a arte
       * é desenhada dentro dele numa escala inteira que cobre. Deixar o canvas
       * com o tamanho da arte e esticar por CSS foi o erro da primeira versão:
       * o navegador interpolava, a escala virava fracionária e a composição
       * aparecia cortada e borrada.
       *
       * A escala é **inteira** porque meia unidade produz linhas de espessura
       * desigual — o defeito que mais rápido denuncia pixel art mal ampliada.
       * O limite de densidade em 2 existe porque um telefone de densidade 3
       * dobraria a área a preencher sem ganho visível num pixel já ampliado.
       */
      const densidade = Math.min(2, globalThis.devicePixelRatio || 1);
      const l = Math.max(1, Math.round(tela.clientWidth * densidade));
      const a = Math.max(1, Math.round(tela.clientHeight * densidade));
      if (tela.width !== l || tela.height !== a) {
        tela.width = l;
        tela.height = a;
      }
      const escala = Math.max(1, Math.ceil(Math.max(l / titulo.LARGURA, a / titulo.ALTURA)));
      const artL = titulo.LARGURA * escala;
      const artA = titulo.ALTURA * escala;
      /* Centrado na horizontal; ancorado embaixo, para o chão nunca sumir. */
      const ox = Math.round((l - artL) / 2);
      const oy = Math.round(a - artA);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, l, a);
      ctx.save();
      ctx.translate(ox, oy);

      const t = progresso.current;

      /* O céu entra primeiro, e quase parado. */
      ctx.globalAlpha = Math.min(1, t * 2.2);
      ctx.drawImage(camadaCeu, 0, 0, artL, artA);

      const deslocar = (imagem: HTMLCanvasElement, velocidade: number, alfa: number): void => {
        ctx.globalAlpha = alfa;
        const off = (-tempo * velocidade * escala) % artL;
        ctx.drawImage(imagem, off, 0, artL, artA);
        ctx.drawImage(imagem, off + artL, 0, artL, artA);
      };

      deslocar(camadaMontanhas, 0.5, Math.min(1, Math.max(0, (t - 0.12) * 2.6)));

      /* A fortaleza sobe um pouco ao entrar: peso. */
      const subida = (1 - Math.min(1, Math.max(0, (t - 0.22) * 2.2))) * 14 * escala;
      ctx.globalAlpha = Math.min(1, Math.max(0, (t - 0.22) * 2.4));
      ctx.drawImage(camadaFortaleza, 0, subida, artL, artA);

      ctx.globalAlpha = 1;

      /* As tochas da muralha. */
      if (t > 0.3) {
        tochas.forEach(([tx, ty], i) => {
          const pulso = Math.sin(tempo * 6.5 + i * 1.9) * 0.5 + 0.5;
          const x = tx * escala;
          const y = (ty + subida / escala) * escala;
          const halo = ctx.createRadialGradient(x, y, 1, x, y, (11 + pulso * 4) * escala);
          halo.addColorStop(0, 'rgba(255,176,90,0.34)');
          halo.addColorStop(1, 'rgba(255,176,90,0)');
          ctx.fillStyle = halo;
          ctx.fillRect(x - 60 * escala, y - 60 * escala, 120 * escala, 120 * escala);
          ctx.fillStyle = '#ffce7a';
          ctx.fillRect(x - escala, y - (3 + pulso * 2) * escala, 2 * escala, (4 + pulso * 2) * escala);
          ctx.fillStyle = '#fff3c4';
          ctx.fillRect(x - escala * 0.5, y - (2 + pulso) * escala, escala, 2 * escala);
          if (Math.random() < 0.16) emitir(tx, ty - 3, true);
        });

        /*
         * As bandeiras.
         *
         * Uma onda senoidal ao longo do pano, com fase correndo. É o mínimo
         * que faz tecido parecer tecido, e o suficiente para a fortaleza
         * deixar de ser uma maquete.
         */
        bandeiras.forEach(([bx, by], i) => {
          const x = bx * escala;
          const y = (by + subida / escala) * escala;
          ctx.fillStyle = '#6b1620';
          for (let passo = 0; passo < 13; passo += 1) {
            const f = passo / 13;
            const onda = Math.sin(tempo * 4 + i * 2 + f * 4) * f * 3.4;
            const altura = (9 - f * 2.2) * escala;
            ctx.fillStyle = f < 0.3 ? '#7a1d26' : f < 0.7 ? '#6b1620' : '#4d1119';
            ctx.fillRect(x + passo * escala, y + onda * escala + 6 * escala, escala, altura);
          }
          ctx.fillStyle = '#3a4860';
          ctx.fillRect(x - escala, y, escala, 20 * escala);
        });
      }

      /* A névoa, atravessando em duas velocidades. */
      if (t > 0.35) {
        for (const [velocidade, alfa, alturaDaFaixa] of [
          [6, 0.1, 0.32],
          [13, 0.07, 0.2],
        ] as const) {
          const off = (-tempo * velocidade * escala) % artL;
          const gradiente = ctx.createLinearGradient(0, artA * (1 - alturaDaFaixa), 0, artA);
          gradiente.addColorStop(0, `rgba(150,175,205,0)`);
          gradiente.addColorStop(1, `rgba(150,175,205,${alfa})`);
          ctx.fillStyle = gradiente;
          ctx.save();
          ctx.translate(off, 0);
          ctx.fillRect(0, artA * (1 - alturaDaFaixa), artL * 2, artA * alturaDaFaixa);
          ctx.restore();
        }
      }

      /* Poeira caindo, sempre. */
      if (Math.random() < 0.5) emitir(titulo.LARGURA + 2, Math.random() * titulo.ALTURA * 0.7, false);

      for (const p of pote) {
        if (p.vida <= 0) continue;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.quente) p.vy += 6 * dt;
        p.vida -= dt * (p.quente ? 0.9 : 0.24);
        if (p.x < -4 || p.y > titulo.ALTURA + 4) p.vida = 0;
        if (p.vida <= 0) continue;
        ctx.globalAlpha = Math.min(1, p.vida) * (p.quente ? 0.95 : 0.4);
        ctx.fillStyle = p.quente ? '#ffb15e' : '#c9d6e6';
        ctx.fillRect(p.x * escala, p.y * escala, p.tamanho * escala, p.tamanho * escala);
      }
      ctx.globalAlpha = 1;

      /* As ruínas da frente, que emolduram. */
      ctx.globalAlpha = Math.min(1, Math.max(0, (t - 0.3) * 2.6));
      ctx.drawImage(camadaFrente, 0, 0, artL, artA);
      ctx.globalAlpha = 1;

      ctx.restore();

      /* O primeiro quadro desenhado é o sinal de que o jogo pode aparecer. */
      jogoPronto();

      /* A vinheta, o logo e o véu são da **tela**, e não da arte. */
      const vinheta = ctx.createRadialGradient(l / 2, a * 0.46, a * 0.26, l / 2, a * 0.5, a);
      vinheta.addColorStop(0, 'rgba(0,0,0,0)');
      vinheta.addColorStop(1, 'rgba(5,4,9,0.74)');
      ctx.fillStyle = vinheta;
      ctx.fillRect(0, 0, l, a);

      /*
       * Uma sombra de topo.
       *
       * O logo precisa de um fundo que não compita com ele. Sem isto, as
       * ameias da torre passam por trás das letras e a leitura fica suja.
       */
      const topo = ctx.createLinearGradient(0, 0, 0, a * 0.46);
      topo.addColorStop(0, 'rgba(5,4,9,0.72)');
      topo.addColorStop(1, 'rgba(5,4,9,0)');
      ctx.fillStyle = topo;
      ctx.fillRect(0, 0, l, a * 0.46);

      /*
       * O logo.
       *
       * Entra depois de tudo, subindo e clareando, e tem um brilho que
       * atravessa as letras devagar. O brilho é discreto de propósito: um
       * reflexo que passa a cada quatro segundos lê como metal; um que passa
       * a cada meio segundo lê como banner de anúncio.
       */
      const tLogo = Math.min(1, Math.max(0, (t - 0.42) / 0.45));
      if (tLogo > 0) {
        const escalaDoLogo = Math.max(
          1,
          Math.round(Math.min((l * 0.46) / logo.largura, (a * 0.27) / logo.altura)),
        );
        const lw = logo.largura * escalaDoLogo;
        const lh = logo.altura * escalaDoLogo;
        const lx = Math.round((l - lw) / 2);
        const ly = Math.round(a * 0.05 + (1 - tLogo) * 12);
        ctx.globalAlpha = tLogo;
        ctx.drawImage(logo.tela, lx, ly, lw, lh);
        ctx.globalAlpha = 1;

        const faixa = ((tempo * 0.24) % 1.6) - 0.3;
        if (faixa > 0 && faixa < 1) {
          const bx = lx + faixa * lw;
          const brilho = ctx.createLinearGradient(bx - lw * 0.08, 0, bx + lw * 0.08, 0);
          brilho.addColorStop(0, 'rgba(255,240,190,0)');
          brilho.addColorStop(0.5, 'rgba(255,240,190,0.2)');
          brilho.addColorStop(1, 'rgba(255,240,190,0)');
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = brilho;
          ctx.fillRect(lx, ly, lw, lh);
          ctx.restore();
        }
      }

      if (escuridao.current > 0) {
        ctx.fillStyle = `rgba(6,5,10,${escuridao.current})`;
        ctx.fillRect(0, 0, l, a);
      }

      pedido = requestAnimationFrame(quadro);
    };

    pedido = requestAnimationFrame(quadro);
    return () => {
      vivo = false;
      cancelAnimationFrame(pedido);
    };
  }, []);

  return <canvas className="cena-de-titulo" ref={caixa} aria-hidden="true" />;
};
