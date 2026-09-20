/*
 * A instalação.
 *
 * O navegador decide quando um site pode virar aplicativo, e avisa por um
 * evento que só dispara uma vez. Guardá-lo é o que permite ter um botão
 * "Instalar" que funciona de verdade em vez de um botão que abre um texto
 * pedindo desculpas.
 *
 * Quando o navegador **não** oferece o fluxo — é o caso do Safari no iPhone,
 * que nunca disparou esse evento — a saída não é esconder o botão: é dizer,
 * naquele aparelho, exatamente quais dois toques resolvem. Um botão que não
 * faz nada é pior que instrução.
 */

interface EventoDeInstalacao extends Event {
  readonly platforms: readonly string[];
  prompt: () => Promise<void>;
  readonly userChoice: Promise<{ readonly outcome: 'accepted' | 'dismissed' }>;
}

export type EstadoDaInstalacao = 'indisponivel' | 'pronta' | 'instalada';

let guardado: EventoDeInstalacao | null = null;
const ouvintes = new Set<(estado: EstadoDaInstalacao) => void>();

/** Já está rodando como aplicativo? */
export const ehStandalone = (): boolean => {
  if (typeof globalThis.matchMedia === 'function') {
    if (globalThis.matchMedia('(display-mode: standalone)').matches) return true;
    if (globalThis.matchMedia('(display-mode: fullscreen)').matches) return true;
  }
  /* iOS antigo expõe isto e não suporta `display-mode`. */
  return (globalThis.navigator as unknown as { standalone?: boolean }).standalone === true;
};

const avisar = (): void => {
  const estado: EstadoDaInstalacao = ehStandalone()
    ? 'instalada'
    : guardado !== null
      ? 'pronta'
      : 'indisponivel';
  for (const ouvinte of ouvintes) ouvinte(estado);
};

export const estadoDaInstalacao = (): EstadoDaInstalacao =>
  ehStandalone() ? 'instalada' : guardado !== null ? 'pronta' : 'indisponivel';

export const ouvirInstalacao = (ouvinte: (estado: EstadoDaInstalacao) => void): (() => void) => {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
};

export const prepararInstalacao = (): void => {
  globalThis.addEventListener('beforeinstallprompt', (evento) => {
    /* Segurar o evento é o que permite abrir o convite no momento certo. */
    evento.preventDefault();
    guardado = evento as EventoDeInstalacao;
    avisar();
  });
  globalThis.addEventListener('appinstalled', () => {
    guardado = null;
    avisar();
  });
};

/** Abre o convite do navegador. Devolve se o jogador aceitou. */
export const instalar = async (): Promise<boolean> => {
  const evento = guardado;
  if (evento === null) return false;
  await evento.prompt();
  const escolha = await evento.userChoice;
  if (escolha.outcome === 'accepted') {
    guardado = null;
    avisar();
    return true;
  }
  return false;
};

export type Plataforma = 'android' | 'ios' | 'desktop';

export const plataforma = (): Plataforma => {
  const agente = globalThis.navigator.userAgent;
  if (/android/i.test(agente)) return 'android';
  if (/iphone|ipad|ipod/i.test(agente)) return 'ios';
  /* iPad recente se anuncia como Mac; o toque é o que o entrega. */
  if (/macintosh/i.test(agente) && globalThis.navigator.maxTouchPoints > 1) return 'ios';
  return 'desktop';
};

export const INSTRUCOES: Readonly<Record<Plataforma, string>> = {
  android: 'Abra o menu do navegador e toque em Instalar aplicativo.',
  ios: 'Toque em Compartilhar e depois em Adicionar à Tela de Início.',
  desktop: 'Clique no ícone de instalar na barra de endereço do navegador.',
};
