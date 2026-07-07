import { useSyncExternalStore, useCallback, useState } from 'react';
import { subscribe, getVersion, notify } from '../game/gameState';

/** re-renderiza quando o estado do jogo muda */
export function useGame(): number {
  return useSyncExternalStore(subscribe, getVersion);
}

/** força atualização após ação */
export function useAction(): (fn: () => unknown) => void {
  return useCallback((fn: () => unknown) => { fn(); notify(); }, []);
}

/** mensagem flutuante local */
export function useFlash(): [string | null, (m: string | null) => void] {
  const [msg, setMsg] = useState<string | null>(null);
  const set = useCallback((m: string | null) => {
    setMsg(m);
    if (m) window.setTimeout(() => setMsg(null), 2600);
  }, []);
  return [msg, set];
}
