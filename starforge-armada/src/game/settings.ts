// Configurações globais persistidas (áudio e efeitos). Mantidas em cache em
// memória para que o motor possa lê-las a cada quadro sem tocar o localStorage.
export interface Settings {
  muted: boolean;   // silenciar tudo
  volume: number;   // 0..1 volume mestre
  music: boolean;   // trilha sonora ligada
  musicVol: number; // 0..1 volume da trilha
  shake: boolean;   // tremor de tela
  bloom: boolean;   // brilho/bloom (desligar ajuda em aparelhos fracos)
  fps: boolean;     // mostrar FPS no HUD
  hitbox: boolean;  // realçar o núcleo de colisão da nave
}

const DEFAULTS: Settings = { muted: false, volume: 0.5, music: true, musicVol: 0.45, shake: true, bloom: true, fps: false, hitbox: false };
const KEY = 'sfa_settings_v1';

let cache: Settings = load();

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch { /* ignore */ }
  return { ...DEFAULTS };
}

export function getSettings(): Settings { return cache; }

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]): Settings {
  cache = { ...cache, [key]: value };
  try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* ignore */ }
  return cache;
}
