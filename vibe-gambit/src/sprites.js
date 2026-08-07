// =============================================================================
// sprites.js — Arte dos personagens em SVG (sem imagens externas, sem IA).
// Estilo chibi-fantasia coeso. viewBox 0 0 48 56, chão ~y=53, olhando p/ direita.
// A View espelha inimigos (scaleX(-1)). Exporta spriteFor(id) -> string SVG.
// =============================================================================

const W = '🛡'; // (não usado; marcador)

const warrior = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <rect x="18" y="40" width="5" height="12" rx="2" fill="#5a5560"/>
  <rect x="25" y="40" width="5" height="12" rx="2" fill="#484450"/>
  <rect x="16" y="49" width="9" height="4.5" rx="1.6" fill="#2b2833"/>
  <rect x="24" y="49" width="9" height="4.5" rx="1.6" fill="#2b2833"/>
  <!-- escudo -->
  <ellipse cx="12" cy="33" rx="6.2" ry="8.4" fill="#caa24b"/>
  <ellipse cx="12" cy="33" rx="6.2" ry="8.4" fill="none" stroke="#7d5f27" stroke-width="1.6"/>
  <path d="M12 26 v14 M6 33 h12" stroke="#7d5f27" stroke-width="1.2"/>
  <!-- torso -->
  <rect x="15" y="23" width="18" height="20" rx="5" fill="#bcc5d4"/>
  <rect x="15" y="34" width="18" height="9" rx="4" fill="#8f99ab"/>
  <rect x="22" y="23" width="4" height="20" fill="#a4aec0"/>
  <circle cx="16" cy="25" r="4.2" fill="#d3dbe8"/>
  <circle cx="32" cy="25" r="4.2" fill="#d3dbe8"/>
  <!-- cabeça -->
  <circle cx="24" cy="15" r="8" fill="#e8b58c"/>
  <path d="M16 16 a8 8 0 0 1 16 0 v-2 h-16 z" fill="#b6bfce"/>
  <rect x="16" y="8.5" width="16" height="4.5" rx="2" fill="#b6bfce"/>
  <rect x="21.5" y="13" width="5" height="6" rx="1" fill="#6d7686"/>
  <path d="M24 5 q7 -3 5.5 5 q-3 -1.5 -5.5 1 z" fill="#d7433a"/>
  <rect x="19.5" y="15" width="2" height="3" rx="1" fill="#241d2a"/>
  <rect x="26" y="15" width="2" height="3" rx="1" fill="#241d2a"/>
  <!-- espada -->
  <rect x="36" y="9" width="3.2" height="27" rx="1.6" fill="#e6edf7"/>
  <rect x="36" y="9" width="1.4" height="27" fill="#ffffff" opacity=".6"/>
  <rect x="33" y="34" width="9" height="3" rx="1.5" fill="#7d5f27"/>
  <rect x="37" y="36" width="1.6" height="6" rx=".8" fill="#7d5f27"/>
</svg>`;

const cleric = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <!-- robe -->
  <path d="M15 52 L18 26 q6 -5 12 0 L33 52 Z" fill="#efe8d6"/>
  <path d="M24 26 v26" stroke="#d9cfae" stroke-width="1.4"/>
  <path d="M15 52 L18 26 q6 -5 12 0 L33 52 Z" fill="none" stroke="#cbbf9a" stroke-width="1"/>
  <rect x="19" y="40" width="10" height="3.4" fill="#caa24b"/>
  <!-- mangas -->
  <path d="M17 28 q-4 6 -3 12 l4 -1 q-1 -6 2 -10 z" fill="#e7dfc9"/>
  <!-- cabeça + capuz -->
  <circle cx="24" cy="15" r="8" fill="#f0c197"/>
  <path d="M15 16 q0 -12 9 -12 q9 0 9 12 q-4 -6 -9 -6 q-5 0 -9 6z" fill="#f6f1e4"/>
  <path d="M16 16 h16" stroke="#e6dcc2" stroke-width="1"/>
  <rect x="20" y="15" width="2" height="3" rx="1" fill="#3a2f28"/>
  <rect x="26" y="15" width="2" height="3" rx="1" fill="#3a2f28"/>
  <!-- cajado com orbe -->
  <rect x="35" y="16" width="2.6" height="30" rx="1.3" fill="#9c7b46"/>
  <circle cx="36.3" cy="13" r="4.6" fill="#ffe58a"/>
  <circle cx="36.3" cy="13" r="4.6" fill="none" stroke="#e0b64e" stroke-width="1.2"/>
  <circle cx="34.7" cy="11.4" r="1.4" fill="#fff" opacity=".8"/>
</svg>`;

const archer = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <rect x="18" y="40" width="5" height="12" rx="2" fill="#5c4a33"/>
  <rect x="25" y="40" width="5" height="12" rx="2" fill="#4a3b28"/>
  <rect x="16" y="49" width="9" height="4.5" rx="1.6" fill="#33281a"/>
  <rect x="24" y="49" width="9" height="4.5" rx="1.6" fill="#33281a"/>
  <!-- túnica -->
  <path d="M15 43 L17 25 q7 -5 14 0 L33 43 Z" fill="#4f8a4a"/>
  <path d="M15 43 L17 33 h14 l2 10 z" fill="#3c6d39"/>
  <rect x="20" y="30" width="8" height="3" fill="#8a6a2a"/>
  <!-- cabeça + capuz -->
  <circle cx="24" cy="15" r="8" fill="#e8b58c"/>
  <path d="M15 16 q-1 -13 9 -13 q10 0 9 13 q-3 -7 -9 -7 q-6 0 -9 7z" fill="#3c6d39"/>
  <path d="M33 15 l4 -3 -2 6 z" fill="#3c6d39"/>
  <rect x="20" y="15" width="2" height="3" rx="1" fill="#241d2a"/>
  <rect x="26" y="15" width="2" height="3" rx="1" fill="#241d2a"/>
  <!-- arco -->
  <path d="M37 6 q7 16 0 32" fill="none" stroke="#8a6a2a" stroke-width="2.4"/>
  <path d="M37 7 L37 37" stroke="#d8d2c2" stroke-width="1" opacity=".8"/>
  <!-- flecha na mão -->
  <path d="M30 21 L40 21" stroke="#c9b98f" stroke-width="1.4"/>
  <path d="M40 21 l-2.6 -1.6 v3.2 z" fill="#d7433a"/>
</svg>`;

const mage = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <!-- robe -->
  <path d="M14 52 L18 25 q6 -5 12 0 L34 52 Z" fill="#4a6bd6"/>
  <path d="M14 52 L17 34 h14 l3 18 z" fill="#3a55b3"/>
  <path d="M24 25 v27" stroke="#3a55b3" stroke-width="1.2"/>
  <circle cx="24" cy="33" r="2" fill="#ffd34d"/>
  <!-- cabeça -->
  <circle cx="24" cy="16" r="7.5" fill="#f0c197"/>
  <rect x="19" y="17" width="2" height="3" rx="1" fill="#3a2f28"/>
  <rect x="25.5" y="17" width="2" height="3" rx="1" fill="#3a2f28"/>
  <!-- chapéu de mago -->
  <path d="M13 12 q11 -5 22 0 q-4 3 -11 3 q-7 0 -11 -3z" fill="#38509e"/>
  <path d="M24 -3 q-2 8 -9 15 q9 3 18 0 q-7 -7 -9 -15z" fill="#4a6bd6"/>
  <circle cx="20" cy="8" r="1.4" fill="#ffd34d"/>
  <circle cx="27" cy="10" r="1" fill="#fff" opacity=".7"/>
  <!-- cajado com cristal -->
  <rect x="35" y="15" width="2.6" height="31" rx="1.3" fill="#7a5b34"/>
  <path d="M36.3 6 l4 6 -4 5 -4 -5 z" fill="#8fe3ff"/>
  <path d="M36.3 6 l4 6 -4 5 z" fill="#5cc0e8"/>
</svg>`;

const goblin = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <rect x="18" y="40" width="5" height="11" rx="2" fill="#3f6a2f"/>
  <rect x="25" y="40" width="5" height="11" rx="2" fill="#345a27"/>
  <rect x="16" y="48" width="9" height="4.5" rx="1.6" fill="#2a2018"/>
  <rect x="24" y="48" width="9" height="4.5" rx="1.6" fill="#2a2018"/>
  <!-- corpo -->
  <rect x="15" y="25" width="18" height="18" rx="6" fill="#5c9a41"/>
  <rect x="15" y="35" width="18" height="8" rx="5" fill="#4a7f34"/>
  <rect x="17" y="36" width="14" height="4" fill="#7a5a33"/>
  <!-- cabeça -->
  <circle cx="24" cy="16" r="9" fill="#66a84a"/>
  <path d="M15 15 l-6 -4 5 8 z" fill="#5c9a41"/>
  <path d="M33 15 l6 -4 -5 8 z" fill="#5c9a41"/>
  <path d="M18 20 q6 4 12 0" fill="none" stroke="#2c4a1f" stroke-width="1.4"/>
  <rect x="19" y="14" width="3" height="3" rx="1" fill="#ffd34d"/>
  <rect x="26" y="14" width="3" height="3" rx="1" fill="#ffd34d"/>
  <rect x="19.6" y="14.8" width="1.4" height="1.6" fill="#241d2a"/>
  <rect x="26.6" y="14.8" width="1.4" height="1.6" fill="#241d2a"/>
  <!-- adaga -->
  <rect x="36" y="20" width="2.2" height="12" rx="1" fill="#cfd6e0"/>
  <rect x="34.5" y="31" width="5.4" height="2.2" rx="1" fill="#7d5f27"/>
</svg>`;

const goblin_brute = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <rect x="16" y="41" width="6" height="11" rx="2.5" fill="#2f5222"/>
  <rect x="26" y="41" width="6" height="11" rx="2.5" fill="#274419"/>
  <rect x="14" y="49" width="11" height="5" rx="1.8" fill="#241a12"/>
  <rect x="24" y="49" width="11" height="5" rx="1.8" fill="#241a12"/>
  <!-- corpo grande -->
  <rect x="11" y="23" width="26" height="21" rx="7" fill="#4c7d38"/>
  <rect x="11" y="35" width="26" height="9" rx="6" fill="#3c6530"/>
  <rect x="14" y="35" width="20" height="5" fill="#6b4f2c"/>
  <circle cx="12" cy="26" r="5" fill="#5c9a41"/>
  <circle cx="36" cy="26" r="5" fill="#5c9a41"/>
  <!-- cabeça -->
  <circle cx="24" cy="15" r="9" fill="#548a3c"/>
  <path d="M15 14 l-6 -4 5 8 z" fill="#4c7d38"/>
  <path d="M33 14 l6 -4 -5 8 z" fill="#4c7d38"/>
  <path d="M18 12 l4 3 M30 12 l-4 3" stroke="#eae0c0" stroke-width="2"/>
  <path d="M20 15 h3 M25 15 h3" stroke="#c22" stroke-width="0"/>
  <rect x="19" y="13" width="3" height="3" rx="1" fill="#ff5a3a"/>
  <rect x="26" y="13" width="3" height="3" rx="1" fill="#ff5a3a"/>
  <path d="M20 20 q4 3 8 0" fill="none" stroke="#22380f" stroke-width="1.6"/>
  <path d="M21 22 l1 2 M26 22 l1 2" stroke="#fff" stroke-width="1.4"/>
  <!-- clava -->
  <rect x="37" y="14" width="4" height="26" rx="2" fill="#6b4f2c"/>
  <circle cx="39" cy="12" r="5.5" fill="#5a4225"/>
  <circle cx="37" cy="10" r="1.3" fill="#3d2c17"/>
  <circle cx="41" cy="13" r="1.3" fill="#3d2c17"/>
</svg>`;

const slime = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <ellipse cx="24" cy="47" rx="15" ry="4" fill="#000" opacity=".18"/>
  <path d="M9 46 q-1 -22 15 -22 q16 0 15 22 q-15 4 -30 0z" fill="#6fd36a"/>
  <path d="M9 46 q-1 -22 15 -22 q16 0 15 22 q-15 4 -30 0z" fill="none" stroke="#4fae4a" stroke-width="1.4"/>
  <ellipse cx="18" cy="32" rx="4" ry="5" fill="#bff5b0" opacity=".7"/>
  <circle cx="19" cy="38" r="2.4" fill="#1f3a17"/>
  <circle cx="30" cy="38" r="2.4" fill="#1f3a17"/>
  <circle cx="19.8" cy="37.2" r=".9" fill="#fff"/>
  <circle cx="30.8" cy="37.2" r=".9" fill="#fff"/>
  <path d="M20 43 q4 3 8 0" fill="none" stroke="#1f3a17" stroke-width="1.4"/>
</svg>`;

const bat = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <path d="M24 28 C14 18 8 20 4 24 C9 24 8 29 5 32 C11 32 11 35 10 38 C18 32 22 32 24 32 Z" fill="#5b4a6b"/>
  <path d="M24 28 C34 18 40 20 44 24 C39 24 40 29 43 32 C37 32 37 35 38 38 C30 32 26 32 24 32 Z" fill="#4a3b58"/>
  <ellipse cx="24" cy="31" rx="6" ry="7.5" fill="#3b2f47"/>
  <path d="M20 25 l-2 -5 4 3 z" fill="#3b2f47"/>
  <path d="M28 25 l2 -5 -4 3 z" fill="#3b2f47"/>
  <circle cx="21.5" cy="30" r="1.7" fill="#ffd34d"/>
  <circle cx="26.5" cy="30" r="1.7" fill="#ffd34d"/>
  <path d="M22 36 l1 2 1 -2 z" fill="#fff"/>
  <path d="M25 36 l1 2 1 -2 z" fill="#fff"/>
</svg>`;

const skeleton = `
<svg viewBox="0 0 48 56" class="spr" aria-hidden="true">
  <rect x="20" y="42" width="3" height="11" rx="1.5" fill="#e8e6da"/>
  <rect x="25" y="42" width="3" height="11" rx="1.5" fill="#d8d6c8"/>
  <rect x="16" y="49" width="8" height="4" rx="1.4" fill="#cfccbe"/>
  <rect x="24" y="49" width="8" height="4" rx="1.4" fill="#cfccbe"/>
  <rect x="18" y="26" width="12" height="16" rx="4" fill="#e8e6da"/>
  <path d="M20 30 h8 M20 33 h8 M20 36 h8" stroke="#b9b7a8" stroke-width="1.4"/>
  <rect x="23" y="26" width="2" height="16" fill="#cfccbe"/>
  <rect x="13.5" y="27" width="3" height="13" rx="1.5" fill="#d8d6c8"/>
  <rect x="31.5" y="27" width="3" height="13" rx="1.5" fill="#d8d6c8"/>
  <circle cx="24" cy="17" r="8" fill="#f2f0e6"/>
  <ellipse cx="21" cy="17" rx="2.2" ry="2.8" fill="#241d2a"/>
  <ellipse cx="27" cy="17" rx="2.2" ry="2.8" fill="#241d2a"/>
  <path d="M22.2 22 l1.8 2 1.8 -2 z" fill="#241d2a"/>
  <path d="M20 24 h8" stroke="#b9b7a8" stroke-width="1.2"/>
  <rect x="36" y="12" width="2.6" height="24" rx="1.3" fill="#b9b0a0"/>
  <rect x="33" y="34" width="8" height="2.6" rx="1.3" fill="#7d5f27"/>
</svg>`;

export const SPRITES = { warrior, cleric, archer, mage, goblin, goblin_brute, slime, bat, skeleton };

// Artes 2D (PNG) já entregues. Quando existe imagem, usa ela; senão cai no SVG.
export const ART = {
  warrior: 'assets/warrior.png',
  cleric:  'assets/cleric.png',
  archer:  'assets/archer.png',
  mage:    'assets/mage.png',
};

export function spriteFor(id){
  if(ART[id]) return `<img class="sart" src="${ART[id]}" alt="" draggable="false">`;
  return SPRITES[id] || slime;
}
