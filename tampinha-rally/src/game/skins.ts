// TAMPINHAS jogáveis — 60+ desenhadas "à mão" (motor em render/capart), fiéis a
// tampinhas antigas de refrigerante/cerveja. Cada uma tem RARIDADE (comum→lendária),
// desbloqueio por vitórias e ATRIBUTOS levemente diferentes (personalidade de jogo).
// A raridade dá só um empurrãozinho — nada quebra-equilíbrio.
import { CapStats } from '../engine/core';
import { CapArt, Rarity } from '../render/capart';

export interface Skin {
  id: string; name: string; top: string; side: string; ring: string;
  rarity: Rarity; art: CapArt; stats: CapStats; unlock: number; desc: string;
}

// arquétipos de jogo (personalidade); a raridade aplica um lift leve por cima
const ARCH: Record<string, CapStats> = {
  bal: { weight: 1.00, slide: 1.00, stability: 1.00, bounce: 1.00, control: 1.00 },
  glide: { weight: 0.93, slide: 1.12, stability: 0.96, bounce: 1.03, control: 0.98 },
  heavy: { weight: 1.13, slide: 0.90, stability: 1.09, bounce: 0.90, control: 1.01 },
  precise: { weight: 0.98, slide: 1.00, stability: 1.08, bounce: 0.97, control: 1.12 },
  bouncy: { weight: 0.95, slide: 1.05, stability: 0.95, bounce: 1.15, control: 0.98 },
  nimble: { weight: 0.90, slide: 1.08, stability: 1.02, bounce: 1.02, control: 1.05 },
  tank: { weight: 1.17, slide: 0.87, stability: 1.13, bounce: 0.85, control: 1.00 },
  allround: { weight: 1.05, slide: 1.06, stability: 1.06, bounce: 1.05, control: 1.06 },
};
const RBONUS: Record<Rarity, number> = { comum: 0, rara: 0.012, epica: 0.028, lendaria: 0.05 };
function mkStats(arch: string, rar: Rarity): CapStats {
  const b = ARCH[arch] || ARCH.bal; const f = 1 + RBONUS[rar], g = 1 + RBONUS[rar] * 0.4;
  const lift = (v: number) => +(v * (v >= 1 ? f : g)).toFixed(3);
  return { weight: lift(b.weight), slide: lift(b.slide), stability: lift(b.stability), bounce: lift(b.bounce), control: lift(b.control) };
}
function darken(hex: string, amt = 38): string {
  const n = parseInt(hex.replace('#', ''), 16); const r = Math.max(0, (n >> 16) - amt), g = Math.max(0, ((n >> 8) & 255) - amt), b = Math.max(0, (n & 255) - amt);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
const METALCOL: Record<string, string> = { steel: '#c8ccd2', silver: '#d2d6db', gold: '#e8be55', copper: '#c67e46', dark: '#3a3e44' };
function cap(id: string, name: string, rarity: Rarity, unlock: number, arch: string, col: string, art: CapArt, desc: string): Skin {
  return { id, name, rarity, unlock, stats: mkStats(arch, rarity), top: col, side: darken(col), ring: METALCOL[art.metal || 'steel'], art, desc };
}

export const SKINS: Skin[] = [
  // ---------------------------- COMUNS (começam liberadas / baixas) ----------------------------
  cap('coca', 'Cola Vermelha', 'comum', 0, 'bal', '#d81f26', { bg: ['#e5343a', '#c0121a'], metal: 'steel', arcTop: ['DRINK', '#fff'], center: 'Cola', centerColor: '#fff', centerFont: 'script', centerSize: 0.5, sub: ['DELICIOSA & GELADA', '#ffd7a0'], vintage: 0.4 }, 'A clássica. Equilibrada em tudo.'),
  cap('grape', 'Uva Roxa', 'comum', 0, 'bal', '#6a3d9a', { bg: ['#7a4bb0', '#54307c'], metal: 'steel', arcTop: ['GRAPE', '#fff'], arcBot: ['SODA', '#fff'], emblem: 'grape', emblemColor: '#dcc6f2', vintage: 0.35 }, 'Refri de uva de sempre.'),
  cap('orangecrush', 'Laranja Crush', 'comum', 0, 'bouncy', '#e5761a', { bg: ['#f79a2e', '#dd6412'], metal: 'steel', arcTop: ['ORANGE', '#7a2f10'], center: 'Crush', centerColor: '#fff', centerFont: 'script', centerSize: 0.5, sub: ['SODA', '#7a2f10'], vintage: 0.4 }, 'Quica com gosto de laranja.'),
  cap('sprite', 'Limão Verde', 'comum', 0, 'nimble', '#2f8a52', { bg: ['#f2f6ee', '#d6e6cf'], metal: 'steel', center: 'Sprite', centerColor: '#1f7a3a', centerFont: 'script', centerSize: 0.5, emblem: 'star', emblemColor: '#3fae6a', emblemY: -0.02, emblemScale: 0.5, sub: ['LIMÃO', '#1f7a3a'], vintage: 0.3 }, 'Leve e ágil.'),
  cap('rootbeer', "Root Beer do Pop", 'comum', 0, 'heavy', '#5a3418', { bg: ['#6b4020', '#3f2410'], metal: 'copper', arcTop: ['ROOT', '#ffd7a0'], arcBot: ['BEER', '#ffd7a0'], emblem: 'bottle', emblemColor: '#caa16b', vintage: 0.45 }, 'Pesada, empurra geral.'),
  cap('pinklem', 'Limonada Rosa', 'comum', 0, 'bouncy', '#e86a9a', { bg: ['#f7a8c6', '#e06a95'], metal: 'steel', arcTop: ['PINK', '#7a1f45'], arcBot: ['LEMONADE', '#7a1f45'], emblem: 'clown', emblemColor: '#e86a9a', emblemColor2: '#c0392b', emblemScale: 0.9, vintage: 0.4 }, 'Doce e saltitante.'),
  cap('bubbleup', 'Bubble Up', 'comum', 0, 'nimble', '#2fae4e', { bg: ['#39c257', '#1f8a3a'], metal: 'steel', center: 'Bubble up', centerColor: '#fff', centerFont: 'script', centerSize: 0.36, sub: ['LIMÃO·LIMA', '#fff'], vintage: 0.35 }, 'Borbulha e desliza.'),
  cap('sevenup', 'Sete Acima', 'comum', 0, 'precise', '#c0392b', { bg: ['#eef0ea', '#cfd2c8'], metal: 'silver', center: '7up', centerColor: '#c0392b', centerFont: 'slab', centerSize: 0.5, sub: ['LEMON SODA', '#2f8a52'], vintage: 0.4 }, 'Limpa e precisa.'),
  cap('cherrycoke', 'Cereja', 'comum', 1, 'bal', '#e0489a', { bg: ['#ec5aa6', '#c02d78'], metal: 'steel', center: 'Cherry', centerColor: '#fff', centerFont: 'script', centerSize: 0.42, emblem: 'cherry', emblemColor: '#c0122a', emblemY: 0.42, emblemScale: 0.7, arcTop: ['CHERRY COLA', '#fff'], vintage: 0.35 }, 'Cola com cereja.'),
  cap('lemon', 'Bubble Lima', 'comum', 1, 'glide', '#3fae6a', { bg: ['#e9e2cf', '#cfc7ac'], metal: 'steel', arcTop: ['LEMON', '#3f7a2a'], center: 'bubble up', centerColor: '#c0392b', centerFont: 'script', centerSize: 0.34, sub: ['LIME SODA', '#3f7a2a'], vintage: 0.5 }, 'Escorrega bastante.'),
  cap('whistle', 'Whistle', 'comum', 1, 'bal', '#e5761a', { bg: ['#f79a2e', '#e5761a'], metal: 'steel', arcTop: ['THIRSTY?', '#0a3d91'], center: 'WHISTLE', centerColor: '#0a3d91', centerFont: 'block', centerSize: 0.34, sub: ['JUST', '#0a3d91'], vintage: 0.4 }, 'Assobia de sede.'),
  cap('moxie', 'Moxie', 'comum', 2, 'heavy', '#d4341f', { bg: ['#e5453a', '#b8261a'], metal: 'steel', arcTop: ['TRADE MARK', '#ffe9c0'], center: 'Moxie', centerColor: '#fff', centerFont: 'serif', centerSize: 0.5, sub: ['SODA', '#ffe9c0'], vintage: 0.5 }, 'Amarga e teimosa.'),
  cap('cheerwine', 'Cheerwine', 'comum', 2, 'bal', '#cf1f2d', { bg: ['#f4cf3a', '#e0b21f'], metal: 'steel', arcTop: ['CHEERWINE', '#c0122a'], center: 'Since 1917', centerColor: '#c0122a', centerFont: 'serif', centerSize: 0.22, emblem: 'cherry', emblemColor: '#c0122a', emblemY: 0.4, emblemScale: 0.55, sub: ['GOOD CHEER', '#c0122a'], vintage: 0.4 }, 'Cheia de bom humor.'),
  cap('howdy', 'Howdy', 'comum', 2, 'bouncy', '#e5761a', { bg: ['#1c1c1c', '#000'], metal: 'steel', arcTop: ['ORANGE', '#f79420'], center: 'Howdy', centerColor: '#f79420', centerFont: 'script', centerSize: 0.46, sub: ['SODA', '#f79420'], vintage: 0.45 }, 'Alegre e pula-pula.'),
  cap('ski', 'Ski', 'comum', 3, 'nimble', '#2f8a52', { bg: ['#f2c200', '#d9a800'], metal: 'steel', band: ['#1f7a3a', 'Ski', '#f2c200'], sub: ['CITRUS', '#1f7a3a'], vintage: 0.35 }, 'Cítrica e esperta.'),
  cap('lucky', 'Lucky Club', 'comum', 3, 'bal', '#c0392b', { bg: ['#e9e6dc', '#cfccc0'], metal: 'silver', band: ['#c0392b', 'Lucky Club', '#fff'], emblem: 'leaf', emblemColor: '#2f8a52', emblemY: -0.42, emblemScale: 0.45, sub: ['COLA', '#0a3d91'], vintage: 0.4 }, 'Um trevo de sorte.'),
  cap('bonedry', 'Bone Dry', 'comum', 3, 'precise', '#0a3d91', { bg: ['#f2f2f0', '#dcdcd8'], metal: 'silver', arcTop: ['GINGER ALE', '#0a3d91'], center: 'Bone Dry', centerColor: '#0a3d91', centerFont: 'serif', centerSize: 0.36, vintage: 0.35 }, 'Sequinha, boa de mira.'),
  cap('sunnykid', 'Sunny Kid', 'comum', 4, 'glide', '#1f7a3a', { bg: ['#2f8a52', '#186633'], metal: 'steel', center: 'Sunny Kid', centerColor: '#f4d76a', centerFont: 'serif', centerSize: 0.34, emblem: 'sunburst', emblemColor: '#f4d76a', emblemColor2: '#f4d76a', emblemY: 0, emblemScale: 0.5, vintage: 0.45 }, 'Desliza no sol.'),
  cap('uptown', 'Up-Town', 'comum', 4, 'nimble', '#1f7a3a', { bg: ['#2f8a52', '#155a2c'], metal: 'steel', center: 'up-town', centerColor: '#fff', centerFont: 'script', centerSize: 0.4, emblem: 'heart', emblemColor: '#e5484d', emblemY: 0.44, emblemScale: 0.4, vintage: 0.4 }, 'Chique da cidade.'),
  cap('dads', "Dad's", 'comum', 4, 'heavy', '#0a3d91', { bg: ['#f2c200', '#d9a800'], metal: 'steel', arcTop: ['SINCE 1937', '#0a3d91'], center: "DAD'S", centerColor: '#c0392b', centerFont: 'slab', centerSize: 0.42, sub: ['OLD FASHIONED', '#0a3d91'], vintage: 0.45 }, 'Root beer do pai.'),
  cap('mas', "Ma's", 'comum', 5, 'bal', '#6b7078', { bg: ['#8a9098', '#5a6068'], metal: 'silver', arcTop: ['NO DEPOSIT', '#fff'], center: "Ma's", centerColor: '#e5484d', centerFont: 'script', centerSize: 0.46, sub: ['NO RETURN', '#fff'], vintage: 0.45 }, 'Caseira, sem devolução.'),
  cap('wakeup', 'Wake Up', 'comum', 5, 'precise', '#0a3d91', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'silver', center: 'WAKE UP', centerColor: '#0a3d91', centerFont: 'block', centerSize: 0.32, emblem: 'star', emblemColor: '#0a3d91', emblemY: -0.42, emblemScale: 0.4, vintage: 0.4 }, 'Desperta e acerta.'),
  cap('pickupper', 'Pick-Upper', 'comum', 5, 'nimble', '#c0392b', { bg: ['#eef0ea', '#d0d2cc'], metal: 'silver', center: 'Pick-UPPER', centerColor: '#c0392b', centerFont: 'block', centerSize: 0.3, sub: ['CITRATE SODA', '#8a8a80'], vintage: 0.4 }, 'Levanta o astral.'),
  cap('upanup', 'Up and Up', 'comum', 6, 'bal', '#c0392b', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'silver', center: 'UP and UP', centerColor: '#c0392b', centerFont: 'block', centerSize: 0.3, vintage: 0.4 }, 'Sempre pra cima.'),
  cap('yup', 'Yup!', 'comum', 6, 'bouncy', '#f2a400', { bg: ['#f7c948', '#e59a12'], metal: 'steel', center: 'Yup!', centerColor: '#1f7a3a', centerFont: 'script', centerSize: 0.5, sub: ['IS UP', '#1f7a3a'], vintage: 0.4 }, 'Positiva e saltitante.'),
  cap('goody', 'Goody Uva', 'comum', 7, 'glide', '#8e5bd0', { bg: ['#f2d6f0', '#dcb0e0'], metal: 'steel', arcTop: ['GOODY', '#7c3aed'], center: 'Goody', centerColor: '#7c3aed', centerFont: 'script', centerSize: 0.46, sub: ['GRAPE SODA', '#7c3aed'], vintage: 0.4 }, 'Boazinha e lisa.'),
  cap('smile', 'Smile', 'comum', 8, 'nimble', '#e5761a', { bg: ['#f79420', '#dd6412'], metal: 'steel', center: 'Smile', centerColor: '#fff', centerFont: 'script', centerSize: 0.42, emblem: 'orange', emblemColor: '#f4c04a', emblemY: 0.42, emblemScale: 0.45, vintage: 0.4 }, 'Sempre sorrindo.'),

  // ---------------------------- RARAS ----------------------------
  cap('pepsi', 'Pepsi-Cola', 'rara', 5, 'glide', '#0a3d91', { bg: ['#e5343a', '#0a3d91'], metal: 'steel', band: ['#f2f2f2', 'Pepsi·Cola', '#0a3d91'], vintage: 0.4 }, 'Desliza suave e longe.'),
  cap('drpepper', 'Dr Pepper', 'rara', 6, 'bal', '#6e1f2b', { bg: ['#7a1f2b', '#4f141c'], metal: 'steel', arcTop: ['SINCE 1891', '#f2c6c0'], center: 'Dr Pepper', centerColor: '#fff', centerFont: 'slab', centerSize: 0.3, sub: ['DUBLIN · TEXAS', '#f2c6c0'], vintage: 0.4 }, 'Vinte e três sabores.'),
  cap('felix', 'Felix Orange Dry', 'rara', 7, 'bal', '#e5761a', { bg: ['#f79420', '#c85f12'], metal: 'gold', arcTop: ['FELIX', '#3a1c08'], emblem: 'bear', emblemColor: '#3a1c08', emblemY: -0.34, emblemScale: 0.42, center: 'ORANGE', centerColor: '#3a1c08', centerFont: 'slab', centerSize: 0.28, sub: ['DRY', '#3a1c08'], vintage: 0.5 }, 'O gato da laranja.'),
  cap('eskimo', 'Eskimo Cream', 'rara', 7, 'precise', '#0a3d91', { bg: ['#1a4fa0', '#0a2f70'], metal: 'silver', emblem: 'bear', emblemColor: '#eef3ff', emblemY: -0.36, emblemScale: 0.42, center: 'Eskimo', centerColor: '#fff', centerFont: 'script', centerSize: 0.42, sub: ['CREAM SODA', '#cfe0ff'], vintage: 0.4 }, 'Cremosa e certeira.'),
  cap('lemmy', 'Lemmy Lemonade', 'rara', 8, 'nimble', '#8a6b1f', { bg: ['#3a2c10', '#1c1508'], metal: 'gold', arcTop: ['LEMMY', '#f4d76a'], center: 'LEMONADE', centerColor: '#f4d76a', centerFont: 'slab', centerSize: 0.24, emblem: 'lemon', emblemColor: '#f4d76a', emblemY: 0.42, emblemScale: 0.5, vintage: 0.55 }, 'Azedinha e ligeira.'),
  cap('bluebird', 'Blue Bird', 'rara', 8, 'glide', '#6a1f45', { bg: ['#7a2b52', '#521636'], metal: 'gold', arcTop: ['ARTIFICIAL COLOR', '#f2c6d8'], center: 'Blue Bird', centerColor: '#f4d76a', centerFont: 'serif', centerSize: 0.3, sub: ['GRAPE SODA', '#f2c6d8'], vintage: 0.5 }, 'Voa raspando o chão.'),
  cap('bigtop', 'Big Top', 'rara', 9, 'bouncy', '#e5761a', { bg: ['#f79420', '#dd6412'], metal: 'steel', arcTop: ['ORANGE', '#fff'], band: ['#c0392b', 'BIG TOP', '#fff'], sub: ['SODA', '#fff'], vintage: 0.45 }, 'Circo laranja saltitante.'),
  cap('applejack', 'Apple Jack', 'rara', 9, 'nimble', '#3fae6a', { bg: ['#f2d64a', '#d9b21f'], metal: 'steel', center: 'Apple Jack', centerColor: '#1f7a3a', centerFont: 'serif', centerSize: 0.3, emblem: 'apple', emblemColor: '#3fae6a', emblemY: 0.42, emblemScale: 0.5, vintage: 0.4 }, 'Maçã ligeira.'),
  cap('jacksup', "Jack's-Up", 'rara', 10, 'bal', '#c0392b', { bg: ['#f2f2f0', '#dcdcd8'], metal: 'silver', center: "Jack's-Up", centerColor: '#c0392b', centerFont: 'script', centerSize: 0.4, emblem: 'cards', emblemY: -0.42, emblemScale: 0.55, vintage: 0.4 }, 'Aposta certeira.'),
  cap('blimey', 'Blimey', 'rara', 10, 'glide', '#1f7a3a', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'steel', arcTop: ['LEMON LIME', '#1f7a3a'], center: 'blimey', centerColor: '#1f7a3a', centerFont: 'script', centerSize: 0.44, sub: ['SODA', '#1f7a3a'], vintage: 0.45 }, 'Desliza que é uma beleza.'),
  cap('lincoln', 'Lincoln Grape', 'rara', 11, 'heavy', '#7c3aed', { bg: ['#8a5bc0', '#5a2f8a'], metal: 'steel', arcTop: ['LINCOLN', '#fff'], center: 'GRAPE', centerColor: '#fff', centerFont: 'slab', centerSize: 0.32, sub: ['SODA', '#fff'], vintage: 0.5 }, 'Presidencial e firme.'),
  cap('royalpalm', 'Royal Palm', 'rara', 12, 'bal', '#8a1220', { bg: ['#a01a2a', '#6a0c18'], metal: 'gold', arcTop: ['ROYAL PALM', '#f4d76a'], center: 'STRAWBERRY', centerColor: '#f4d76a', centerFont: 'slab', centerSize: 0.2, emblem: 'leaf', emblemColor: '#f4d76a', emblemY: 0.44, emblemScale: 0.4, sub: ['SODA', '#f4d76a'], vintage: 0.5 }, 'Morango real.'),
  cap('dilly', 'Dilly', 'rara', 12, 'nimble', '#c0392b', { bg: ['#f2ead0', '#dcd2b0'], metal: 'steel', center: 'Dilly', centerColor: '#c0392b', centerFont: 'script', centerSize: 0.5, sub: ['FOR THIRST', '#8a6b2a'], vintage: 0.5 }, 'Uma gracinha ágil.'),
  cap('chaser', 'Chaser', 'rara', 13, 'nimble', '#1f7a3a', { bg: ['#2f8a52', '#155a2c'], metal: 'steel', center: 'Chaser', centerColor: '#f4d76a', centerFont: 'script', centerSize: 0.5, vintage: 0.35 }, 'Persegue e alcança.'),
  cap('sport', 'Sport', 'rara', 14, 'bal', '#c0392b', { bg: ['#f2f2f0', '#d8d8d4'], metal: 'silver', arcTop: ['SPORT', '#c0392b'], center: 'WINNER', centerColor: '#c0392b', centerFont: 'slab', centerSize: 0.26, emblem: 'star', emblemColor: '#c0392b', emblemY: 0.42, emblemScale: 0.4, sub: ['EVERY TIME', '#c0392b'], vintage: 0.4 }, 'Espírito esportivo.'),
  cap('jolt', 'Jolt', 'rara', 15, 'bouncy', '#e5484d', { bg: ['#e5343a', '#b8241a'], metal: 'steel', center: 'JOLT', centerColor: '#fff', centerFont: 'slab', centerSize: 0.4, emblem: 'bolt', emblemColor: '#f4d76a', emblemY: -0.4, emblemScale: 0.5, vintage: 0.35 }, 'Um choque de energia.'),
  cap('charge', 'Charge Up', 'rara', 16, 'nimble', '#1f7a3a', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'silver', arcTop: ['MISSION', '#1f7a3a'], center: 'CHARGE UP', centerColor: '#1f7a3a', centerFont: 'block', centerSize: 0.24, emblem: 'bolt', emblemColor: '#1f7a3a', emblemY: 0.42, emblemScale: 0.4, vintage: 0.4 }, 'Carrega e dispara.'),
  cap('stepn', "Step 'N High", 'rara', 16, 'precise', '#c0392b', { bg: ['#eef0ea', '#d0d2cc'], metal: 'silver', arcTop: ["STEP 'N", '#c0392b'], center: 'HIGH', centerColor: '#c0392b', centerFont: 'slab', centerSize: 0.3, sub: ['TO REFRESH', '#c0392b'], vintage: 0.4 }, 'Sobe degraus com jeito.'),

  // ---------------------------- ÉPICAS ----------------------------
  cap('dragon', 'Dragon Cream', 'epica', 16, 'heavy', '#0a3d91', { bg: ['#123a80', '#08245a'], metal: 'gold', arcTop: ['DRAGON', '#f4d76a'], emblem: 'dragon', emblemColor: '#f4d76a', emblemY: -0.06, emblemScale: 0.7, sub: ['CREAM SODA', '#f4d76a'], vintage: 0.5 }, 'O dragão que empurra tudo.'),
  cap('donaldsoda', 'Pato Laranja', 'epica', 18, 'bouncy', '#e5761a', { bg: ['#f2ead0', '#dccea0'], metal: 'steel', arcTop: ['DONALD DUCK', '#0a3d91'], emblem: 'duck', emblemColor: '#fff', emblemColor2: '#f2a400', emblemY: -0.32, emblemScale: 0.5, center: 'ORANGE', centerColor: '#e5761a', centerFont: 'slab', centerSize: 0.24, sub: ['SODA', '#0a3d91'], vintage: 0.45 }, 'O pato mais saltitante.'),
  cap('donaldcola', 'Pato Cola', 'epica', 20, 'nimble', '#1f6ea0', { bg: ['#2f8ac0', '#155a80'], metal: 'steel', arcTop: ['DONALD DUCK', '#f4d76a'], center: 'Cola', centerColor: '#f4d76a', centerFont: 'script', centerSize: 0.4, emblem: 'duck', emblemColor: '#fff', emblemColor2: '#f2a400', emblemY: -0.36, emblemScale: 0.6, vintage: 0.4 }, 'Ágil como um pato.'),
  cap('vegasvic', 'Vegas Vic', 'epica', 22, 'bal', '#6e2a12', { bg: ['#7a3418', '#4f200c'], metal: 'gold', arcTop: ['VEGAS VIC', '#f4d76a'], center: 'ROOT BEER', centerColor: '#f4d76a', centerFont: 'slab', centerSize: 0.26, emblem: 'star', emblemColor: '#f4d76a', emblemY: 0.42, emblemScale: 0.45, vintage: 0.5 }, 'O caubói da estrada.'),
  cap('royalflush', 'Royal Flush', 'epica', 24, 'bal', '#c0122a', { bg: ['#d4142e', '#8a0c1e'], metal: 'gold', arcTop: ['LOGANBERRY', '#f4d76a'], center: 'PORT', centerColor: '#f4d76a', centerFont: 'slab', centerSize: 0.26, emblem: 'cards', emblemY: -0.4, emblemScale: 0.5, sub: ['ROYAL FLUSH', '#f4d76a'], vintage: 0.5 }, 'A mão vencedora.'),
  cap('strawmilk', 'Leite Morango', 'epica', 26, 'heavy', '#c0392b', { bg: ['#e07a5a', '#c05a3a'], metal: 'steel', arcTop: ['STRAWBERRY', '#fff'], center: 'MILK', centerColor: '#fff', centerFont: 'slab', centerSize: 0.34, emblem: 'cherry', emblemColor: '#c0122a', emblemY: 0.44, emblemScale: 0.45, vintage: 0.45 }, 'Cremosa e encorpada.'),
  cap('brownie', 'Brownie', 'epica', 28, 'heavy', '#4a2c12', { bg: ['#5a3418', '#33200c'], metal: 'copper', arcTop: ['BROWNIE', '#e9c9a0'], arcBot: ['ROOT BEER', '#e9c9a0'], emblem: 'bear', emblemColor: '#e9c9a0', emblemScale: 0.85, vintage: 0.55 }, 'O duende do root beer.'),
  cap('jurk', 'Jurk', 'epica', 30, 'nimble', '#1f7a3a', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'steel', center: 'Jurk', centerColor: '#1f7a3a', centerFont: 'script', centerSize: 0.5, emblem: 'lemon', emblemColor: '#f4d76a', emblemY: -0.4, emblemScale: 0.45, vintage: 0.45 }, 'Cítrica misteriosa.'),
  cap('rcorange', 'Royal Crown', 'epica', 32, 'glide', '#e5761a', { bg: ['#f79420', '#c85f12'], metal: 'gold', arcTop: ['ROYAL', '#3a1c08'], center: 'ORANGE', centerColor: '#3a1c08', centerFont: 'slab', centerSize: 0.28, emblem: 'crown', emblemColor: '#f4d76a', emblemY: -0.42, emblemScale: 0.45, vintage: 0.45 }, 'Corôa que desliza.'),
  cap('slender', 'Slender', 'epica', 34, 'glide', '#c0392b', { bg: ['#c9b89a', '#a89670'], metal: 'copper', center: 'Slender', centerColor: '#c0392b', centerFont: 'script', centerSize: 0.46, vintage: 0.6 }, 'Fininha e escorregadia.'),
  cap('kona', 'Kona', 'epica', 36, 'bal', '#e5a400', { bg: ['#f2b400', '#c98a00'], metal: 'gold', arcTop: ['KONA', '#3a2c08'], center: 'BREWING', centerColor: '#3a2c08', centerFont: 'slab', centerSize: 0.24, emblem: 'wave', emblemColor: '#0a6ea0', emblemColor2: '#0a6ea0', emblemY: 0.36, emblemScale: 0.5, vintage: 0.35 }, 'Onda do Havaí.'),
  cap('newcastle', 'Newcastle', 'epica', 38, 'heavy', '#6a1f2b', { bg: ['#7a1f2b', '#4f141c'], metal: 'silver', center: 'BROWN ALE', centerColor: '#fff', centerFont: 'slab', centerSize: 0.24, emblem: 'star6', emblemColor: '#3fae6a', emblemColor2: '#f2c200', emblemY: -0.02, emblemScale: 0.8, vintage: 0.4 }, 'A estrela azul da cerveja.'),

  // ---------------------------- LENDÁRIAS ----------------------------
  cap('cocagold', 'Cola Ouro Atlanta', 'lendaria', 30, 'allround', '#f2c200', { bg: ['#f7d84a', '#e0a800'], metal: 'gold', arcTop: ['DELICIOUS · REFRESHING', '#7a1f10'], center: 'Cola', centerColor: '#c0122a', centerFont: 'script', centerSize: 0.44, sub: ['ATLANTA', '#7a1f10'], vintage: 0.35 }, 'A joia dourada. Leve vantagem em tudo.'),
  cap('duvel', 'Duvel', 'lendaria', 36, 'allround', '#c0392b', { bg: ['#f2ead0', '#dcceA0'], metal: 'silver', center: 'Duvel', centerColor: '#c0122a', centerFont: 'script', centerSize: 0.5, emblem: 'star', emblemColor: '#c0122a', emblemY: -0.42, emblemScale: 0.35, vintage: 0.3 }, 'Diabólica e perfeita.'),
  cap('sierra', 'Sierra Nevada', 'lendaria', 42, 'allround', '#0f7a3a', { bg: ['#e9e6dc', '#cfc7ac'], metal: 'gold', arcTop: ['SIERRA NEVADA', '#0f7a3a'], center: 'PALE ALE', centerColor: '#0f7a3a', centerFont: 'slab', centerSize: 0.22, emblem: 'leaf', emblemColor: '#0f7a3a', emblemY: 0.36, emblemScale: 0.5, vintage: 0.35 }, 'Montanha de qualidade.'),
  cap('newbelgium', 'New Belgium', 'lendaria', 48, 'allround', '#e5761a', { bg: ['#f2c200', '#d99000'], metal: 'gold', arcTop: ['NEW BELGIUM', '#7a2f08'], center: 'BREWING', centerColor: '#7a2f08', centerFont: 'slab', centerSize: 0.22, emblem: 'ring', emblemColor: '#c0392b', emblemY: 0.02, emblemScale: 0.9, vintage: 0.35 }, 'A bicicleta que voa.'),
  cap('spaten', 'Spaten', 'lendaria', 55, 'allround', '#c0122a', { bg: ['#f2f2f0', '#dcdcd8'], metal: 'silver', arcTop: ['SPATEN', '#c0122a'], center: 'München', centerColor: '#c0122a', centerFont: 'serif', centerSize: 0.3, emblem: 'shield', emblemColor: '#c0122a', emblemY: -0.4, emblemScale: 0.4, vintage: 0.3 }, 'Realeza de Munique.'),
  cap('newbelgium2', 'Great Lakes 30', 'lendaria', 62, 'allround', '#5a7ab0', { bg: ['#7a9ad0', '#4f6ea0'], metal: 'silver', arcTop: ['GREAT LAKES', '#fff'], center: '30', centerColor: '#fff', centerFont: 'slab', centerSize: 0.5, sub: ['EST. 1988', '#dceaff'], vintage: 0.3 }, 'Três décadas de lenda.'),
  cap('goldenleaf', 'Golden Leaf', 'lendaria', 70, 'allround', '#f2c200', { bg: ['#1c1c1c', '#000'], metal: 'gold', arcTop: ['GOLDEN LEAF', '#f4d76a'], emblem: 'glass', emblemColor: '#f4d76a', emblemY: -0.34, emblemScale: 0.42, center: 'WHEAT', centerColor: '#f4d76a', centerFont: 'slab', centerSize: 0.26, vintage: 0.3 }, 'A folha de ouro.'),
  cap('felixgold', 'Felix Dourado', 'lendaria', 78, 'allround', '#f2a400', { bg: ['#f7c948', '#e59a12'], metal: 'gold', arcTop: ['FELIX', '#3a1c08'], emblem: 'bear', emblemColor: '#3a1c08', emblemY: 0.02, emblemScale: 0.72, sub: ['ORANGE DRY', '#3a1c08'], vintage: 0.4 }, 'O gato lendário do ouro.'),
];

export const CAP_COLORS = ['#e5484d', '#3b82f6', '#3fae6a', '#f7d046', '#f59e0b', '#7c3aed'];
export const skinById = (id: string): Skin => SKINS.find(s => s.id === id) || SKINS[0];
export const unlockedSkins = (wins: number): Skin[] => SKINS.filter(s => wins >= s.unlock);
