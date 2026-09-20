/*
 * O áudio, sintetizado na hora.
 *
 * Nenhum arquivo, nenhuma música protegida, nenhum sample de terceiro: tudo o
 * que soa aqui nasce de osciladores e ruído. É placeholder honesto — dá
 * feedback de verdade e pode ser trocado por trilha composta sem que nada
 * fora deste arquivo mude.
 *
 * A música de boss é a parte que mais importa para o futuro: ela já nasce em
 * **três camadas** que entram por faixa de vida, e a arquitetura de stems é
 * essa. Quando houver música de verdade, cada camada vira um stem sincronizado
 * e o resto do código continua igual.
 */

export type Familia =
  | 'espada-leve'
  | 'espada-pesada'
  | 'martelo'
  | 'acerto-armadura'
  | 'bloqueio'
  | 'armadura-quebrada'
  | 'magia'
  | 'cura'
  | 'pocao'
  | 'momentum'
  | 'nivel'
  | 'carta-passa'
  | 'carta-escolhe'
  | 'nova-oferta'
  | 'boss-entra'
  | 'vitoria'
  | 'derrota'
  | 'segredo';

interface Receita {
  readonly onda: OscillatorType;
  readonly de: number;
  readonly para: number;
  readonly duracaoS: number;
  readonly ganho: number;
  /** Quanto ruído entra junto, de 0 a 1. Metal é ruído; magia é tom. */
  readonly ruido: number;
  readonly corte: number;
}

const RECEITAS: Readonly<Record<Familia, Receita>> = {
  'espada-leve': { onda: 'triangle', de: 900, para: 380, duracaoS: 0.12, ganho: 0.3, ruido: 0.55, corte: 5200 },
  'espada-pesada': { onda: 'sawtooth', de: 420, para: 120, duracaoS: 0.26, ganho: 0.42, ruido: 0.5, corte: 3000 },
  martelo: { onda: 'square', de: 190, para: 60, duracaoS: 0.34, ganho: 0.5, ruido: 0.62, corte: 1500 },
  'acerto-armadura': { onda: 'square', de: 620, para: 260, duracaoS: 0.14, ganho: 0.3, ruido: 0.7, corte: 4200 },
  bloqueio: { onda: 'triangle', de: 300, para: 220, duracaoS: 0.18, ganho: 0.26, ruido: 0.4, corte: 2600 },
  'armadura-quebrada': { onda: 'sawtooth', de: 1400, para: 220, duracaoS: 0.4, ganho: 0.4, ruido: 0.8, corte: 6800 },
  magia: { onda: 'sine', de: 340, para: 1200, duracaoS: 0.3, ganho: 0.3, ruido: 0.1, corte: 7000 },
  cura: { onda: 'sine', de: 520, para: 880, duracaoS: 0.36, ganho: 0.24, ruido: 0.05, corte: 6000 },
  pocao: { onda: 'sine', de: 300, para: 760, duracaoS: 0.42, ganho: 0.3, ruido: 0.12, corte: 5200 },
  momentum: { onda: 'triangle', de: 600, para: 980, duracaoS: 0.16, ganho: 0.2, ruido: 0.06, corte: 6400 },
  nivel: { onda: 'triangle', de: 520, para: 1320, duracaoS: 0.6, ganho: 0.34, ruido: 0.04, corte: 7200 },
  'carta-passa': { onda: 'sine', de: 780, para: 900, duracaoS: 0.07, ganho: 0.12, ruido: 0.08, corte: 8000 },
  'carta-escolhe': { onda: 'triangle', de: 420, para: 820, duracaoS: 0.2, ganho: 0.26, ruido: 0.12, corte: 6600 },
  'nova-oferta': { onda: 'sawtooth', de: 900, para: 420, duracaoS: 0.22, ganho: 0.22, ruido: 0.35, corte: 5000 },
  'boss-entra': { onda: 'sawtooth', de: 90, para: 46, duracaoS: 1.5, ganho: 0.5, ruido: 0.3, corte: 900 },
  vitoria: { onda: 'triangle', de: 440, para: 1100, duracaoS: 0.9, ganho: 0.34, ruido: 0.03, corte: 7000 },
  derrota: { onda: 'sine', de: 420, para: 96, duracaoS: 1.3, ganho: 0.32, ruido: 0.05, corte: 2200 },
  segredo: { onda: 'sine', de: 140, para: 70, duracaoS: 2.4, ganho: 0.42, ruido: 0.22, corte: 1200 },
};

/** A escala de cada área, para a música mudar de cor junto com o cenário. */
const ESCALAS: readonly (readonly number[])[] = [
  [196.0, 220.0, 261.63, 293.66, 329.63], // área 1, maior e aberta
  [174.61, 196.0, 233.08, 261.63, 311.13], // área 2, menor
  [164.81, 185.0, 220.0, 246.94, 277.18], // área 3, mais grave
  [146.83, 174.61, 196.0, 233.08, 261.63], // área 4, marcial
  [138.59, 155.56, 185.0, 207.65, 246.94], // área 5, tensa
];

export class AudioManager {
  private contexto: AudioContext | null = null;
  private barramentoDeMusica: GainNode | null = null;
  private barramentoDeEfeito: GainNode | null = null;
  private ruidoBuffer: AudioBuffer | null = null;
  private volumeDaMusica = 0.55;
  private volumeDosEfeitos = 0.7;

  private musica: { parar: () => void } | null = null;
  private camadasDeBoss: GainNode[] = [];
  private camadasDeMenu: GainNode[] = [];
  private menuEmCamada = 0;

  /** O navegador só libera áudio depois de um gesto. Antes disso, silêncio. */
  public destravar(): void {
    if (this.contexto !== null) {
      if (this.contexto.state === 'suspended') void this.contexto.resume();
      return;
    }
    try {
      /*
       * Navegadores antigos só expõem o construtor com prefixo. O elenco é
       * feito de propósito por `unknown`: `globalThis.AudioContext` é tipado
       * como sempre presente, mas em Safari antigo ele não está lá.
       */
      const janela = globalThis as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Construtor = janela.AudioContext ?? janela.webkitAudioContext;
      if (Construtor === undefined) return;
      const contexto = new Construtor();
      /*
       * Um compressor no fim da cadeia.
       *
       * Uma ultimate somando explosão, grave longo e música satura o
       * alto-falante do telefone e vira chiado justamente no momento que
       * deveria impressionar. Os dois barramentos entram direto nele — não há
       * volume mestre, porque música e efeitos já têm o seu.
       */
      const mestre = contexto.createDynamicsCompressor();
      mestre.threshold.value = -12;
      mestre.ratio.value = 4;
      mestre.connect(contexto.destination);

      const musica = contexto.createGain();
      musica.gain.value = this.volumeDaMusica * 0.5;
      musica.connect(mestre);
      const efeito = contexto.createGain();
      efeito.gain.value = this.volumeDosEfeitos;
      efeito.connect(mestre);

      this.contexto = contexto;
      this.barramentoDeMusica = musica;
      this.barramentoDeEfeito = efeito;
      this.ruidoBuffer = this.criarRuido(contexto);
    } catch {
      /* Política de autoplay, aba sem permissão: som é acessório. */
    }
  }

  private criarRuido(contexto: AudioContext): AudioBuffer {
    const tamanho = contexto.sampleRate * 0.5;
    const buffer = contexto.createBuffer(1, tamanho, contexto.sampleRate);
    const dados = buffer.getChannelData(0);
    for (let i = 0; i < tamanho; i += 1) dados[i] = Math.random() * 2 - 1;
    return buffer;
  }

  /** Os dois controles são independentes, e valem na hora. */
  public definirVolumes(musica: number, efeitos: number): void {
    this.volumeDaMusica = musica;
    this.volumeDosEfeitos = efeitos;
    if (this.barramentoDeMusica !== null) this.barramentoDeMusica.gain.value = musica * 0.5;
    if (this.barramentoDeEfeito !== null) this.barramentoDeEfeito.gain.value = efeitos;
  }

  /** Toca uma família de som. */
  public tocar(familia: Familia): void {
    const contexto = this.contexto;
    const destino = this.barramentoDeEfeito;
    if (contexto === null || destino === null || this.volumeDosEfeitos <= 0) return;
    const receita = RECEITAS[familia];
    const agora = contexto.currentTime;

    const filtro = contexto.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = receita.corte;
    filtro.connect(destino);

    const envelope = contexto.createGain();
    envelope.gain.setValueAtTime(0.0001, agora);
    envelope.gain.exponentialRampToValueAtTime(receita.ganho, agora + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001, agora + receita.duracaoS);
    envelope.connect(filtro);

    const oscilador = contexto.createOscillator();
    oscilador.type = receita.onda;
    oscilador.frequency.setValueAtTime(receita.de, agora);
    oscilador.frequency.exponentialRampToValueAtTime(
      Math.max(20, receita.para),
      agora + receita.duracaoS,
    );
    oscilador.connect(envelope);
    oscilador.start(agora);
    oscilador.stop(agora + receita.duracaoS + 0.02);

    if (receita.ruido > 0 && this.ruidoBuffer !== null) {
      const fonte = contexto.createBufferSource();
      fonte.buffer = this.ruidoBuffer;
      const ganhoDoRuido = contexto.createGain();
      ganhoDoRuido.gain.setValueAtTime(receita.ganho * receita.ruido, agora);
      ganhoDoRuido.gain.exponentialRampToValueAtTime(0.0001, agora + receita.duracaoS * 0.7);
      fonte.connect(ganhoDoRuido);
      ganhoDoRuido.connect(filtro);
      fonte.start(agora);
      fonte.stop(agora + receita.duracaoS);
    }
  }

  /* -----------------------------------------------------------------------
   * Música.
   * -------------------------------------------------------------------- */

  /**
   * A música de uma área, ou do menu.
   *
   * Um arpejo lento sobre a escala da área, com um baixo por baixo. É simples
   * de propósito: placeholder que não cansa vale mais que placeholder que
   * tenta impressionar e irrita no terceiro minuto.
   */
  public tocarMusica(area: number): void {
    this.pararMusica();
    const contexto = this.contexto;
    const destino = this.barramentoDeMusica;
    if (contexto === null || destino === null) return;

    const escala = ESCALAS[Math.max(0, Math.min(ESCALAS.length - 1, area - 1))] ?? ESCALAS[0] ?? [];
    let passo = 0;
    const intervalo = globalThis.setInterval(() => {
      if (this.volumeDaMusica <= 0) return;
      const nota = escala[passo % escala.length] ?? 220;
      const agora = contexto.currentTime;
      const ganho = contexto.createGain();
      ganho.gain.setValueAtTime(0.0001, agora);
      ganho.gain.exponentialRampToValueAtTime(0.16, agora + 0.06);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 1.1);
      ganho.connect(destino);
      const osc = contexto.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = nota * (passo % 8 === 0 ? 2 : 1);
      osc.connect(ganho);
      osc.start(agora);
      osc.stop(agora + 1.2);
      /* O baixo marca o compasso, uma vez a cada quatro notas. */
      if (passo % 4 === 0) {
        const baixo = contexto.createGain();
        baixo.gain.setValueAtTime(0.0001, agora);
        baixo.gain.exponentialRampToValueAtTime(0.2, agora + 0.04);
        baixo.gain.exponentialRampToValueAtTime(0.0001, agora + 0.9);
        baixo.connect(destino);
        const oscB = contexto.createOscillator();
        oscB.type = 'sine';
        oscB.frequency.value = nota / 2;
        oscB.connect(baixo);
        oscB.start(agora);
        oscB.stop(agora + 1);
      }
      passo += 1;
    }, 640);

    this.musica = {
      parar: () => {
        globalThis.clearInterval(intervalo);
      },
    };
  }

  /**
   * O tema do menu, em camadas.
   *
   * A arquitetura é a mesma da música de boss e pelo mesmo motivo: as três
   * camadas tocam desde o primeiro compasso e o que muda é o **ganho**. Na
   * tela inicial toca só o colchão — grave, lento, quase ambiente. Na escolha
   * de classe entra a harmonia. No draft entra o arpejo, que dá a sensação de
   * que algo já começou. Como nada é cortado, a passagem entre telas não
   * quebra o compasso; a música apenas ganha corpo.
   */
  public tocarMusicaDeMenu(camada = 0): void {
    if (this.camadasDeMenu.length > 0) {
      this.camadaDoMenu(camada);
      return;
    }
    this.pararMusica();
    const contexto = this.contexto;
    const destino = this.barramentoDeMusica;
    if (contexto === null || destino === null) return;

    const raiz = 98;

    /* Camada 1: o colchão. Duas ondas quase em uníssono, batendo devagar. */
    const colchao = contexto.createGain();
    colchao.gain.value = 0;
    colchao.connect(destino);
    const filtroDoColchao = contexto.createBiquadFilter();
    filtroDoColchao.type = 'lowpass';
    filtroDoColchao.frequency.value = 620;
    filtroDoColchao.connect(colchao);
    for (const desafinacao of [-4, 4]) {
      const osc = contexto.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = raiz;
      osc.detune.value = desafinacao;
      osc.connect(filtroDoColchao);
      osc.start();
    }

    /* Camada 2: a harmonia, uma quinta acima, com filtro mais aberto. */
    const harmonia = contexto.createGain();
    harmonia.gain.value = 0;
    harmonia.connect(destino);
    const filtroDaHarmonia = contexto.createBiquadFilter();
    filtroDaHarmonia.type = 'lowpass';
    filtroDaHarmonia.frequency.value = 1400;
    filtroDaHarmonia.connect(harmonia);
    for (const razao of [1.5, 2]) {
      const osc = contexto.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = raiz * razao;
      osc.detune.value = 6;
      osc.connect(filtroDaHarmonia);
      osc.start();
    }

    /* Camada 3: o arpejo, disparado nota a nota. */
    const arpejo = contexto.createGain();
    arpejo.gain.value = 0;
    arpejo.connect(destino);

    this.camadasDeMenu = [colchao, harmonia, arpejo];

    const notas = [raiz * 2, raiz * 2.4, raiz * 3, raiz * 4, raiz * 3, raiz * 2.4];
    let passo = 0;
    const intervalo = globalThis.setInterval(() => {
      if (this.volumeDaMusica <= 0) return;
      const agora = contexto.currentTime;
      const ganho = contexto.createGain();
      ganho.gain.setValueAtTime(0.0001, agora);
      ganho.gain.exponentialRampToValueAtTime(0.5, agora + 0.03);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.9);
      ganho.connect(arpejo);
      const osc = contexto.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = notas[passo % notas.length] ?? raiz * 2;
      osc.connect(ganho);
      osc.start(agora);
      osc.stop(agora + 1);
      passo += 1;
    }, 520);

    const camadas = this.camadasDeMenu;
    this.musica = {
      parar: () => {
        globalThis.clearInterval(intervalo);
        for (const c of camadas) c.gain.value = 0;
      },
    };
    this.camadaDoMenu(camada);
  }

  /** 0 = tela inicial, 1 = escolha de classe, 2 = draft. */
  public camadaDoMenu(camada: number): void {
    const contexto = this.contexto;
    this.menuEmCamada = camada;
    if (contexto === null || this.camadasDeMenu.length === 0) return;
    const alvos = camada <= 0 ? [0.16, 0, 0] : camada === 1 ? [0.14, 0.07, 0] : [0.12, 0.07, 0.09];
    this.camadasDeMenu.forEach((c, i) => {
      c.gain.setTargetAtTime(alvos[i] ?? 0, contexto.currentTime, 0.9);
    });
  }

  /** Quanto o tema do menu está tocando agora — para reaplicar após o unlock. */
  public get camadaAtualDoMenu(): number {
    return this.menuEmCamada;
  }

  /**
   * A música de boss, em três camadas.
   *
   * Esta é a arquitetura que a direção pediu para o futuro, já funcionando:
   * as três camadas tocam desde o início, e o que muda com a vida do boss é o
   * **ganho** de cada uma. Assim não há corte nem re-sincronização — quando
   * houver stems de verdade, é só trocar os osciladores por eles.
   */
  public tocarMusicaDeBoss(area: number): void {
    this.pararMusica();
    const contexto = this.contexto;
    const destino = this.barramentoDeMusica;
    if (contexto === null || destino === null) return;

    const escala = ESCALAS[Math.max(0, Math.min(ESCALAS.length - 1, area - 1))] ?? ESCALAS[0] ?? [];
    const raiz = escala[0] ?? 160;

    this.camadasDeBoss = [1, 2, 3].map((n) => {
      const ganho = contexto.createGain();
      ganho.gain.value = n === 1 ? 0.22 : 0;
      ganho.connect(destino);
      const osc = contexto.createOscillator();
      osc.type = n === 1 ? 'sine' : n === 2 ? 'sawtooth' : 'square';
      osc.frequency.value = raiz * (n === 1 ? 0.5 : n === 2 ? 1 : 1.5);
      const filtro = contexto.createBiquadFilter();
      filtro.type = 'lowpass';
      filtro.frequency.value = n === 3 ? 1800 : 900;
      osc.connect(filtro);
      filtro.connect(ganho);
      osc.start();
      return ganho;
    });

    /* A pulsação por cima: é ela que dá urgência sem precisar de melodia. */
    let passo = 0;
    const intervalo = globalThis.setInterval(() => {
      if (this.volumeDaMusica <= 0) return;
      const agora = contexto.currentTime;
      const ganho = contexto.createGain();
      ganho.gain.setValueAtTime(0.0001, agora);
      ganho.gain.exponentialRampToValueAtTime(0.14, agora + 0.02);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.3);
      ganho.connect(destino);
      const osc = contexto.createOscillator();
      osc.type = 'square';
      osc.frequency.value = raiz * (passo % 4 === 0 ? 2 : 1.5);
      osc.connect(ganho);
      osc.start(agora);
      osc.stop(agora + 0.32);
      passo += 1;
    }, 420);

    const osciladores = this.camadasDeBoss;
    this.musica = {
      parar: () => {
        globalThis.clearInterval(intervalo);
        for (const camada of osciladores) camada.gain.value = 0;
      },
    };
  }

  /** A vida do boss manda nas camadas. 100–51 %, 50–26 %, 25–0 %. */
  public intensidadeDoBoss(fracaoDeVida: number): void {
    const contexto = this.contexto;
    if (contexto === null || this.camadasDeBoss.length === 0) return;
    const alvos = fracaoDeVida > 0.5 ? [0.22, 0, 0] : fracaoDeVida > 0.25 ? [0.2, 0.16, 0] : [0.18, 0.18, 0.14];
    this.camadasDeBoss.forEach((camada, i) => {
      camada.gain.setTargetAtTime(alvos[i] ?? 0, contexto.currentTime, 0.6);
    });
  }

  public pararMusica(): void {
    this.musica?.parar();
    this.musica = null;
    this.camadasDeBoss = [];
    this.camadasDeMenu = [];
  }

  public descartar(): void {
    this.pararMusica();
    const contexto = this.contexto;
    this.contexto = null;
    if (contexto !== null) globalThis.setTimeout(() => void contexto.close(), 600);
  }
}

export const audio = new AudioManager();
