// Tampinhas jogáveis. Diferenças de atributo são LEVES (não quebram equilíbrio):
// slide (desliza), weight (peso p/ empurrar), stability (giro/controle), bounce.
import { CapStats } from '../engine/core';

export interface Skin {
  id: string; name: string; top: string; side: string; ring: string;
  logo: string;                    // 'ridges' | 'star' | 'num' | 'rust' | 'sticker' | 'hand' | 'plain'
  stats: CapStats;
  unlock: number;                  // vitórias necessárias p/ desbloquear
  desc: string;
}

export const SKINS: Skin[] = [
  { id: 'refri', name: 'Refri Vermelha', top: '#e5484d', side: '#b83232', ring: '#f7c948', logo: 'ridges',
    stats: { weight: 1.0, slide: 1.0, stability: 1.0, bounce: 1.0, control: 1.0 }, unlock: 0, desc: 'Equilibrada. A clássica.' },
  { id: 'azul', name: 'Azul Metálica', top: '#3b82f6', side: '#2563c9', ring: '#cfe4ff', logo: 'star',
    stats: { weight: 1.05, slide: 1.06, stability: 0.98, bounce: 1.05, control: 1.0 }, unlock: 0, desc: 'Desliza um tico mais.' },
  { id: 'verde', name: 'Verde Velha', top: '#3fae6a', side: '#2f8a52', ring: '#dfeccb', logo: 'plain',
    stats: { weight: 1.1, slide: 0.94, stability: 1.08, bounce: 0.9, control: 1.05 }, unlock: 1, desc: 'Pesada e estável.' },
  { id: 'numero', name: 'Número 7', top: '#f4f1e6', side: '#cfc7ac', ring: '#333', logo: 'num',
    stats: { weight: 0.95, slide: 1.03, stability: 1.05, bounce: 1.0, control: 1.06 }, unlock: 2, desc: 'Precisa, boa de mira.' },
  { id: 'ferrugem', name: 'Enferrujada', top: '#9c6b3f', side: '#6f4a2a', ring: '#c99a63', logo: 'rust',
    stats: { weight: 1.15, slide: 0.9, stability: 1.1, bounce: 0.85, control: 1.0 }, unlock: 3, desc: 'Tanque. Empurra geral.' },
  { id: 'adesivo', name: 'Do Adesivo', top: '#7c3aed', side: '#5b21b6', ring: '#f5d0fe', logo: 'sticker',
    stats: { weight: 0.98, slide: 1.05, stability: 1.02, bounce: 1.1, control: 1.0 }, unlock: 4, desc: 'Quica com estilo.' },
  { id: 'mao', name: 'Feita à Mão', top: '#f59e0b', side: '#c47908', ring: '#fff3d6', logo: 'hand',
    stats: { weight: 1.0, slide: 1.0, stability: 1.06, bounce: 1.0, control: 1.08 }, unlock: 6, desc: 'Carinho no controle.' },
  { id: 'dourada', name: 'Dourada Rara', top: '#f7d046', side: '#caa11e', ring: '#fff6c8', logo: 'star',
    stats: { weight: 1.02, slide: 1.08, stability: 1.08, bounce: 1.05, control: 1.08 }, unlock: 9, desc: 'A joia. Levemente melhor em tudo.' },
];

export const CAP_COLORS = ['#e5484d', '#3b82f6', '#3fae6a', '#f7d046', '#f59e0b', '#7c3aed'];
export const skinById = (id: string): Skin => SKINS.find(s => s.id === id) || SKINS[0];
