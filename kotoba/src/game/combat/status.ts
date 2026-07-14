import type { StatusDef, StatusId } from './types';

/* estados como conceitos do universo — cada um carrega um símbolo japonês */
export const STATUS: Record<StatusId, StatusDef> = {
  burn:       { id: 'burn',       jp: '火', reading: 'ka',    name: 'Queimadura',  kind: 'debuff', desc: 'Sofre dano no fim do turno; diminui 1 por turno.' },
  poison:     { id: 'poison',     jp: '毒', reading: 'doku',  name: 'Veneno',      kind: 'debuff', desc: 'Sofre dano igual às pilhas; diminui 1 por turno.' },
  strength:   { id: 'strength',   jp: '力', reading: 'chikara', name: 'Força',     kind: 'buff',   desc: 'Cada ataque causa +1 de dano por pilha.' },
  weak:       { id: 'weak',       jp: '弱', reading: 'jaku',  name: 'Fraqueza',    kind: 'debuff', desc: 'Ataques causam 25% menos dano.' },
  vulnerable: { id: 'vulnerable', jp: '破', reading: 'ha',    name: 'Vulnerável',  kind: 'debuff', desc: 'Recebe 50% mais dano de ataques.' },
  regen:      { id: 'regen',      jp: '癒', reading: 'yu',    name: 'Regeneração', kind: 'buff',   desc: 'Cura no fim do turno; diminui 1 por turno.' },
  focus:      { id: 'focus',      jp: '心', reading: 'kokoro', name: 'Foco',       kind: 'buff',   desc: 'Cartas de defesa concedem +1 de bloqueio por pilha.' },
  thorns:     { id: 'thorns',     jp: '棘', reading: 'toge',  name: 'Espinhos',    kind: 'buff',   desc: 'Reflete dano a quem te ataca.' },
};

export const STATUS_LIST = Object.values(STATUS);
