/* criaturas procedurais (SVG → data-uri) — originais, estilo tinta/espírito */
const enc = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}")`;

const BODIES: Record<string, string> = {
  // espírito faminto — máscara flutuante com véu de tinta
  faminto: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 130'>
    <defs><radialGradient id='g' cx='50%' cy='40%' r='60%'><stop offset='0%' stop-color='#3a2c4e'/><stop offset='100%' stop-color='#160e26'/></radialGradient></defs>
    <path d='M60 20 C86 20 96 44 92 76 C90 100 74 118 60 118 C46 118 30 100 28 76 C24 44 34 20 60 20 Z' fill='url(#g)'/>
    <path d='M40 48 q10 -10 20 0' fill='none' stroke='#d94f6a' stroke-width='3'/>
    <path d='M62 48 q10 -10 20 0' fill='none' stroke='#d94f6a' stroke-width='3'/>
    <circle cx='50' cy='54' r='5' fill='#ffd24a'/><circle cx='72' cy='54' r='5' fill='#ffd24a'/>
    <circle cx='50' cy='54' r='2' fill='#160e26'/><circle cx='72' cy='54' r='2' fill='#160e26'/>
    <path d='M48 80 q13 16 26 0 q-6 -6 -13 -6 q-7 0 -13 6 Z' fill='#0b0616'/>
    <path d='M50 82 l3 6 M58 84 l0 7 M66 84 l0 7 M70 82 l-2 6' stroke='#d94f6a' stroke-width='1.6'/>
    <path d='M30 100 q-12 18 -6 26 M90 100 q12 18 6 26' stroke='#2a1c3e' stroke-width='4' fill='none' opacity='.7'/></svg>`,
  // boneca de palha — pequeno guardião de fibras
  palha: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 130'>
    <defs><linearGradient id='p' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#d8b16a'/><stop offset='100%' stop-color='#8a6428'/></linearGradient></defs>
    <ellipse cx='60' cy='118' rx='30' ry='8' fill='#00000055'/>
    <path d='M60 30 C74 30 80 44 78 58 C76 70 68 76 60 76 C52 76 44 70 42 58 C40 44 46 30 60 30 Z' fill='url(#p)'/>
    <rect x='50' y='74' width='20' height='34' rx='7' fill='url(#p)'/>
    <path d='M38 82 l-14 10 M82 82 l14 10' stroke='#8a6428' stroke-width='6' stroke-linecap='round'/>
    <path d='M52 104 l-6 16 M68 104 l6 16' stroke='#8a6428' stroke-width='6' stroke-linecap='round'/>
    <circle cx='53' cy='50' r='3' fill='#2a1a08'/><circle cx='67' cy='50' r='3' fill='#2a1a08'/>
    <path d='M52 60 q8 6 16 0' fill='none' stroke='#2a1a08' stroke-width='2'/>
    <path d='M44 30 l16 -14 16 14' fill='none' stroke='#b5341f' stroke-width='3'/>
    <rect x='54' y='40' width='12' height='10' fill='#efe6d0' opacity='.85'/><path d='M56 42 l8 6 M64 42 l-8 6' stroke='#b5341f' stroke-width='1.4'/></svg>`,
  // guardião de musgo (elite) — golem de pedra e folhas
  musgo: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 130'>
    <defs><linearGradient id='m' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='#7d7568'/><stop offset='100%' stop-color='#3a3630'/></linearGradient></defs>
    <ellipse cx='70' cy='122' rx='40' ry='9' fill='#00000055'/>
    <path d='M40 60 C40 40 56 28 70 28 C84 28 100 40 100 60 L104 108 C104 116 96 118 88 116 L52 116 C44 118 36 116 36 108 Z' fill='url(#m)'/>
    <circle cx='58' cy='58' r='6' fill='#6f9a45'/><circle cx='84' cy='58' r='6' fill='#6f9a45'/>
    <circle cx='58' cy='58' r='2.5' fill='#d6f0b0'/><circle cx='84' cy='58' r='2.5' fill='#d6f0b0'/>
    <path d='M50 78 h40' stroke='#211a12' stroke-width='4'/>
    <path d='M40 60 q-16 6 -18 26 M100 60 q16 6 18 26' stroke='#4f6a30' stroke-width='8' fill='none' stroke-linecap='round'/>
    <circle cx='70' cy='34' r='5' fill='#8fbf62'/><circle cx='48' cy='44' r='4' fill='#6f9a45'/><circle cx='94' cy='46' r='4' fill='#6f9a45'/>
    <path d='M56 96 l6 8 6 -8 6 8 6 -8' fill='none' stroke='#211a12' stroke-width='2'/></svg>`,
};

const CACHE: Record<string, string> = {};
export function enemyArt(key: string): string {
  if (!CACHE[key]) CACHE[key] = enc(BODIES[key] ?? BODIES.faminto);
  return CACHE[key];
}
