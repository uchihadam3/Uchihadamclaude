/* ============================================================
   KOTOBA — arte procedural das cartas (SVG → data-uri).
   Ilustração atmosférica por elemento/categoria, estilo tinta +
   luz espiritual. Sem assets externos: tudo desenhado por código.
   ============================================================ */
import type { CardCategory, Element } from '../combat/types';

const enc = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}")`;

function wrap(defs: string, body: string, sky: [string, string]): string {
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 130' preserveAspectRatio='xMidYMid slice'>
  <defs>${defs}
    <radialGradient id='sky' cx='50%' cy='30%' r='90%'>
      <stop offset='0%' stop-color='${sky[0]}'/><stop offset='100%' stop-color='${sky[1]}'/>
    </radialGradient>
    <filter id='soft'><feGaussianBlur stdDeviation='1.4'/></filter>
  </defs>
  <rect width='200' height='130' fill='url(#sky)'/>${body}</svg>`;
}

const ART: Record<Element | CardCategory, string> = {
  // ---- elementos ----
  fire: wrap(
    `<radialGradient id='fl' cx='50%' cy='80%' r='70%'><stop offset='0%' stop-color='#ffe9a8'/><stop offset='45%' stop-color='#f08a2c'/><stop offset='100%' stop-color='#a5240a'/></radialGradient>`,
    `<path d='M100 122 C60 108 62 74 84 56 C82 72 92 78 96 70 C96 50 78 44 92 20 C96 40 118 44 112 70 C124 60 122 44 120 38 C140 58 140 96 100 122 Z' fill='url(#fl)' filter='url(#soft)'/>
     <path d='M100 118 C78 106 80 82 94 66 C94 82 104 84 104 74 C118 84 116 104 100 118 Z' fill='#ffd873' opacity='.9'/>
     <circle cx='60' cy='60' r='2.4' fill='#ffcf7a'/><circle cx='140' cy='72' r='2' fill='#ffb454'/><circle cx='120' cy='34' r='1.6' fill='#ffe0a0'/><circle cx='78' cy='40' r='1.6' fill='#ffd070'/><circle cx='150' cy='48' r='1.4' fill='#ff9a3c'/>`,
    ['#4a1608', '#160604'],
  ),
  water: wrap(
    `<linearGradient id='wv' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#8fd0ff'/><stop offset='100%' stop-color='#1c4f8e'/></linearGradient>`,
    `<path d='M0 78 C30 66 46 90 78 80 C104 72 120 92 150 82 C176 74 190 88 200 82 L200 130 L0 130 Z' fill='url(#wv)'/>
     <path d='M0 92 C34 82 52 104 86 94 C114 86 132 106 164 96 C182 90 194 100 200 96 L200 130 L0 130 Z' fill='#2a63a8' opacity='.85'/>
     <path d='M0 78 C30 66 46 90 78 80 C104 72 120 92 150 82 C176 74 190 88 200 82' fill='none' stroke='#d7f0ff' stroke-width='1.6' opacity='.8'/>
     <circle cx='70' cy='78' r='1.8' fill='#eaf7ff'/><circle cx='128' cy='86' r='1.6' fill='#eaf7ff'/><circle cx='168' cy='84' r='1.4' fill='#cfeaff'/>`,
    ['#0f2f57', '#08182e'],
  ),
  wind: wrap(
    `<linearGradient id='wd' x1='0' y1='0' x2='1' y2='0'><stop offset='0%' stop-color='#e6f2ea'/><stop offset='100%' stop-color='#6f9d8a'/></linearGradient>`,
    `<g fill='none' stroke='url(#wd)' stroke-width='3' stroke-linecap='round' opacity='.92'>
       <path d='M20 44 C70 30 120 40 150 44 C176 48 168 70 150 66 C138 63 142 52 152 54'/>
       <path d='M14 74 C64 60 116 70 156 74 C186 77 178 100 156 96 C146 94 150 84 158 86'/>
       <path d='M40 100 C80 92 116 98 140 100'/></g>
     <path d='M150 30 l6 4 -6 4 z' fill='#bfe0cf'/><path d='M60 110 l5 3 -5 3 z' fill='#a9cbb9'/>
     <ellipse cx='90' cy='58' rx='3' ry='1.4' fill='#d7eadf' transform='rotate(-18 90 58)'/>`,
    ['#22423a', '#0e2019'],
  ),
  wood: wrap(
    `<linearGradient id='wo' x1='0' y1='1' x2='0' y2='0'><stop offset='0%' stop-color='#3d2a17'/><stop offset='100%' stop-color='#7a5a30'/></linearGradient>`,
    `<path d='M96 128 C96 96 92 84 80 74 C70 66 58 66 52 56 C68 54 82 60 92 70 C92 54 96 44 104 34 C108 46 106 58 100 70 C110 60 124 58 136 62 C124 70 110 68 100 80 C100 96 104 108 104 128 Z' fill='url(#wo)'/>
     <circle cx='62' cy='52' r='7' fill='#6f9a45'/><circle cx='104' cy='30' r='8' fill='#7fae52'/><circle cx='136' cy='58' r='6' fill='#5f8a3c'/><circle cx='80' cy='40' r='5' fill='#8fbf62'/>
     <circle cx='104' cy='30' r='2.2' fill='#d6f0b0'/><circle cx='62' cy='52' r='1.8' fill='#d6f0b0'/>`,
    ['#20301a', '#0d160b'],
  ),
  light: wrap(
    `<radialGradient id='lt' cx='50%' cy='45%' r='55%'><stop offset='0%' stop-color='#fff7d6'/><stop offset='60%' stop-color='#f0cf6e'/><stop offset='100%' stop-color='#8a6a1e' stop-opacity='0'/></radialGradient>`,
    `<g stroke='#ffe9a0' stroke-width='2' opacity='.55'><line x1='100' y1='0' x2='100' y2='130'/><line x1='0' y1='60' x2='200' y2='60'/><line x1='30' y1='0' x2='170' y2='130'/><line x1='170' y1='0' x2='30' y2='130'/></g>
     <circle cx='100' cy='58' r='42' fill='url(#lt)'/>
     <path d='M100 30 l8 22 22 6 -22 6 -8 22 -8 -22 -22 -6 22 -6 z' fill='#fff4c8' opacity='.95' filter='url(#soft)'/>`,
    ['#6a5418', '#211a08'],
  ),
  dark: wrap(
    `<radialGradient id='dk' cx='50%' cy='40%' r='60%'><stop offset='0%' stop-color='#b79ce0'/><stop offset='100%' stop-color='#2a1a4a'/></radialGradient>`,
    `<circle cx='100' cy='54' r='34' fill='url(#dk)'/><circle cx='116' cy='46' r='30' fill='#160a2c'/>
     <g fill='#6b4fa0' opacity='.5'><ellipse cx='60' cy='96' rx='40' ry='10'/><ellipse cx='150' cy='104' rx='44' ry='11'/></g>
     <circle cx='54' cy='40' r='1.4' fill='#d9c8ff'/><circle cx='150' cy='30' r='1.2' fill='#d9c8ff'/><circle cx='176' cy='64' r='1' fill='#c0a8f0'/>`,
    ['#1a1030', '#0a0518'],
  ),
  // ---- fallback por categoria (cartas sem elemento) ----
  attack: wrap(`<linearGradient id='ak' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#e08a5a'/><stop offset='100%' stop-color='#8a2a12'/></linearGradient>`,
    `<path d='M20 110 L150 20 L162 34 L34 122 Z' fill='url(#ak)'/><path d='M150 20 L166 18 L162 34 Z' fill='#ffd7a0'/><path d='M40 116 L70 104 L58 128 Z' fill='#b5341f'/>`,
    ['#3a1810', '#160806']),
  defense: wrap(`<linearGradient id='df' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#7db2e6'/><stop offset='100%' stop-color='#234f7f'/></linearGradient>`,
    `<path d='M100 18 L152 36 C152 84 128 108 100 118 C72 108 48 84 48 36 Z' fill='url(#df)'/><path d='M100 30 L140 44 C140 82 120 100 100 108 Z' fill='#a9d0f2' opacity='.5'/>`,
    ['#12324f', '#08182a']),
  tech: wrap(`<linearGradient id='tc' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#b7a8e0'/><stop offset='100%' stop-color='#453270'/></linearGradient>`,
    `<circle cx='100' cy='64' r='40' fill='none' stroke='url(#tc)' stroke-width='3'/><circle cx='100' cy='64' r='24' fill='none' stroke='#d8c8ff' stroke-width='1.6' opacity='.7'/><path d='M100 24 L100 104 M60 64 L140 64 M72 36 L128 92 M128 36 L72 92' stroke='#8a7cc0' stroke-width='1.2' opacity='.6'/>`,
    ['#241a3a', '#0e0820']),
  power: wrap(`<radialGradient id='pw' cx='50%' cy='50%' r='60%'><stop offset='0%' stop-color='#ffe9a8'/><stop offset='100%' stop-color='#8a6d29'/></radialGradient>`,
    `<circle cx='100' cy='62' r='36' fill='url(#pw)' filter='url(#soft)'/><path d='M100 32 l7 20 20 4 -20 6 -7 20 -7 -20 -20 -6 20 -4 z' fill='#fff4c8'/>`,
    ['#3a2e10', '#160f04']),
  spirit: wrap(`<radialGradient id='sp' cx='50%' cy='50%' r='60%'><stop offset='0%' stop-color='#b6f0e6'/><stop offset='100%' stop-color='#256b60'/></radialGradient>`,
    `<circle cx='100' cy='62' r='30' fill='url(#sp)' opacity='.9' filter='url(#soft)'/><circle cx='100' cy='62' r='30' fill='none' stroke='#d6fff5' stroke-width='1.4' opacity='.6'/><circle cx='66' cy='44' r='2' fill='#d6fff5'/><circle cx='140' cy='80' r='1.6' fill='#a8e8dc'/>`,
    ['#123430', '#071815']),
};

const CACHE: Record<string, string> = {};
export function cardArt(cat: CardCategory, element?: Element): string {
  const key = element ?? cat;
  if (!CACHE[key]) CACHE[key] = enc(ART[key] ?? ART[cat]);
  return CACHE[key];
}

/** cor de brilho por elemento — usado por FX/partículas */
export const ELEMENT_GLOW: Record<Element, string> = {
  fire: 'rgba(230,110,60,.7)', water: 'rgba(90,160,240,.7)', wind: 'rgba(180,220,200,.6)',
  wood: 'rgba(130,190,90,.7)', light: 'rgba(255,220,120,.75)', dark: 'rgba(150,110,210,.7)',
};
