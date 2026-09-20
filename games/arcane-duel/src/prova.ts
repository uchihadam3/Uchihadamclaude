/*
 * A cena-padrão.
 *
 * Guerreiro contra Saqueador, na Área 1. É a barra de qualidade: tudo o que
 * vier depois copia daqui o tamanho, o estilo, a luz e o ritmo.
 */
import * as area1 from './fase/arte/area1.js';
import * as guerreiro from './fase/arte/guerreiro.js';
import * as saqueador from './fase/arte/saqueador.js';

const saida = document.querySelector<HTMLElement>('#saida');
if (saida === null) throw new Error('sem saída');

const ESCALA = 4;
const LARGURA = area1.LARGURA * ESCALA;
const ALTURA = area1.ALTURA * ESCALA;

const palco = document.createElement('canvas');
palco.width = LARGURA;
palco.height = ALTURA;
palco.style.imageRendering = 'pixelated';
palco.style.display = 'block';
saida.append(palco);
const ctx = palco.getContext('2d');
if (ctx === null) throw new Error('sem contexto');
ctx.imageSmoothingEnabled = false;

const camadaCeu = area1.ceu();
const camadaLonge = area1.longe();
const { tela: camadaPerto, tochas } = area1.perto();
const camadaFrente = area1.frente();

const repousoHeroi = guerreiro.gerarAnimacao('repouso');
const ataqueHeroi = guerreiro.gerarAnimacao('ataque');
const repousoAlvo = saqueador.gerarAnimacao('repouso');
const ataqueAlvo = saqueador.gerarAnimacao('ataque');

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  cor: string;
  tamanho: number;
}

const poeira: Particula[] = [];
const brasas: Particula[] = [];

for (let i = 0; i < 40; i += 1) {
  poeira.push({
    x: Math.random() * area1.LARGURA,
    y: Math.random() * area1.ALTURA,
    vx: -2 - Math.random() * 5,
    vy: 1 + Math.random() * 3,
    vida: 1,
    cor: 'rgba(210,225,240,0.5)',
    tamanho: Math.random() < 0.3 ? 2 : 1,
  });
}

let tempo = 0;
let ultimo = performance.now();

const desenharTocha = (x: number, y: number, t: number, indice: number): void => {
  /* A chama: três elipses que pulsam fora de fase, e nunca em fase. */
  const pulso = Math.sin(t * 7 + indice * 2.1) * 0.5 + 0.5;
  const alturas = [7 + pulso * 3, 4.5 + pulso * 2, 2.4 + pulso];
  const cores = ['#f2d58a', '#e8873a', '#fff3c4'];
  alturas.forEach((altura, i) => {
    ctx.fillStyle = cores[i] ?? '#fff';
    ctx.globalAlpha = i === 0 ? 0.5 : 0.95;
    const largura = (3 - i * 0.7) * ESCALA;
    ctx.beginPath();
    ctx.ellipse(
      x * ESCALA + Math.sin(t * 9 + indice) * 1.5,
      (y - altura * 0.4) * ESCALA,
      largura,
      altura * ESCALA * 0.5,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  /* O halo que a tocha derrama na pedra. */
  const halo = ctx.createRadialGradient(
    x * ESCALA,
    y * ESCALA,
    2,
    x * ESCALA,
    y * ESCALA,
    (26 + pulso * 6) * ESCALA * 0.5,
  );
  halo.addColorStop(0, 'rgba(255,170,80,0.22)');
  halo.addColorStop(1, 'rgba(255,170,80,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(x * ESCALA - 80, y * ESCALA - 80, 160, 160);

  if (Math.random() < 0.28) {
    brasas.push({
      x,
      y: y - 3,
      vx: (Math.random() - 0.5) * 6,
      vy: -8 - Math.random() * 10,
      vida: 1,
      cor: '#ffb15e',
      tamanho: 1,
    });
  }
};

const quadroDe = (quadros: readonly HTMLCanvasElement[], fps: number): HTMLCanvasElement => {
  const i = Math.floor(tempo * fps) % quadros.length;
  const quadro = quadros[i] ?? quadros[0];
  if (quadro === undefined) throw new Error('animação sem quadros');
  return quadro;
};

/* O ciclo de combate da demonstração: repouso, golpe, repouso. */
const CICLO = 3.4;

const laco = (agora: number): void => {
  const dt = Math.min(0.05, (agora - ultimo) / 1000);
  ultimo = agora;
  tempo += dt;
  const faseDoCiclo = tempo % CICLO;
  const heroiAtacando = faseDoCiclo > 1.2 && faseDoCiclo < 1.6;
  const alvoAtacando = faseDoCiclo > 2.5 && faseDoCiclo < 2.9;

  ctx.clearRect(0, 0, LARGURA, ALTURA);
  ctx.drawImage(camadaCeu, 0, 0, LARGURA, ALTURA);

  /* Parallax: cada plano anda numa velocidade. */
  const deslocar = (tela: HTMLCanvasElement, velocidade: number): void => {
    const off = (-tempo * velocidade * ESCALA) % LARGURA;
    ctx.drawImage(tela, off, 0, LARGURA, ALTURA);
    ctx.drawImage(tela, off + LARGURA, 0, LARGURA, ALTURA);
  };
  deslocar(camadaLonge, 1.4);
  deslocar(camadaPerto, 3.2);

  /* A névoa entre o fundo e os atores. */
  const nevoa = ctx.createLinearGradient(0, area1.HORIZONTE * ESCALA - 120, 0, ALTURA);
  nevoa.addColorStop(0, 'rgba(120,160,185,0.16)');
  nevoa.addColorStop(1, 'rgba(120,160,185,0)');
  ctx.fillStyle = nevoa;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  tochas.forEach(([x, y], i) => {
    desenharTocha(x - ((tempo * 3.2) % area1.LARGURA), y, tempo, i);
    desenharTocha(x - ((tempo * 3.2) % area1.LARGURA) + area1.LARGURA, y, tempo, i);
  });

  /* Os atores. O herói olha para a direita; o inimigo é espelhado. */
  const pisoY = area1.HORIZONTE + 14;

  const sombra = (cx: number, largura: number): void => {
    ctx.fillStyle = 'rgba(0,0,0,0.42)';
    ctx.beginPath();
    ctx.ellipse(cx * ESCALA, pisoY * ESCALA, largura * ESCALA, 3 * ESCALA, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const heroiX = 86;
  const alvoX = 226;
  sombra(heroiX, 11);
  sombra(alvoX, 9);

  const quadroHeroi = heroiAtacando
    ? quadroDe(ataqueHeroi, guerreiro.RITMO.ataque)
    : quadroDe(repousoHeroi, guerreiro.RITMO.repouso);
  ctx.drawImage(
    quadroHeroi,
    (heroiX - guerreiro.LARGURA / 2) * ESCALA,
    (pisoY - 90) * ESCALA,
    guerreiro.LARGURA * ESCALA,
    guerreiro.ALTURA * ESCALA,
  );

  const quadroAlvo = alvoAtacando
    ? quadroDe(ataqueAlvo, saqueador.RITMO.ataque)
    : quadroDe(repousoAlvo, saqueador.RITMO.repouso);
  ctx.save();
  ctx.translate((alvoX + saqueador.LARGURA / 2) * ESCALA, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(
    quadroAlvo,
    0,
    (pisoY - 74) * ESCALA,
    saqueador.LARGURA * ESCALA,
    saqueador.ALTURA * ESCALA,
  );
  ctx.restore();

  /* Partículas. */
  const mover = (lista: Particula[], gravidade: number): void => {
    for (let i = lista.length - 1; i >= 0; i -= 1) {
      const p = lista[i];
      if (p === undefined) continue;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += gravidade * dt;
      p.vida -= dt * 0.6;
      if (p.vida <= 0 || p.y > area1.ALTURA + 4) {
        if (lista === poeira) {
          p.x = area1.LARGURA + 2;
          p.y = Math.random() * area1.ALTURA;
          p.vida = 1;
        } else {
          lista.splice(i, 1);
        }
        continue;
      }
      if (p.x < -4) p.x = area1.LARGURA + 4;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.vida));
      ctx.fillStyle = p.cor;
      ctx.fillRect(p.x * ESCALA, p.y * ESCALA, p.tamanho * ESCALA, p.tamanho * ESCALA);
    }
    ctx.globalAlpha = 1;
  };
  mover(poeira, 0);
  mover(brasas, -2);

  ctx.drawImage(camadaFrente, 0, 0, LARGURA, ALTURA);

  /* A vinheta, que fecha os cantos e empurra o olho para o centro. */
  const vinheta = ctx.createRadialGradient(
    LARGURA / 2,
    ALTURA * 0.5,
    ALTURA * 0.3,
    LARGURA / 2,
    ALTURA * 0.5,
    ALTURA * 0.95,
  );
  vinheta.addColorStop(0, 'rgba(0,0,0,0)');
  vinheta.addColorStop(1, 'rgba(6,5,10,0.6)');
  ctx.fillStyle = vinheta;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  requestAnimationFrame(laco);
};

requestAnimationFrame(laco);
