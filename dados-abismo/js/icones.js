/* ========================================================================
   ÍCONES DAS HABILIDADES — SVG inline, desenhado à mão.
   Emoji não serve: em Georgia/Android metade vira um risquinho monocromático
   (foi o que aconteceu com o ⚔ da fechadura). SVG sempre desenha igual.
   ===================================================================== */
const S = (d, c='currentColor') =>
  `<svg class="hico" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.7"
     stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export const ICONES = {
  /* ⚒ CARRASCO */
  decapitar: S(`<path d="M7 20 L17 6"/><path d="M14 3c3 0 6 2 6 5 0 2-2 3-4 3-1 0-2-1-2-2z"/>
                <path d="M5 21l3-3"/>`),
  furia:     S(`<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>
                <path d="M12 8a4 4 0 1 0 4 4"/><path d="M6 6l2.5 2.5M18 18l-2.5-2.5"/>`),
  muralha:   S(`<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M12 8v8"/>`),
  carniceiro:S(`<path d="M4 19L18 5"/><path d="M6 21l2-2"/><path d="M15 3h5v5"/>
                <path d="M9 14c-1 2-1 4 1 5 2-1 2-3 1-5z"/>`),
  /* 🗡 LÂMINA-SOMBRA */
  milcortes: S(`<path d="M4 20L14 6M8 20L18 6M12 20L21 8"/><path d="M13 5l2-2 1 3z"/>`),
  veneno:    S(`<circle cx="12" cy="10" r="5"/><path d="M10 9h.01M14 9h.01"/>
                <path d="M9 20h6M10 17l-1 3M14 17l1 3"/><path d="M9 14h6"/>`),
  sumir:     S(`<path d="M4 9c3-2 6 2 9 0s5-3 7-1"/><path d="M4 14c3-2 6 2 9 0s5-3 7-1"/>
                <path d="M6 19c2-1 4 1 6 0"/>`),
  enxame:    S(`<path d="M3 18L11 8M7 19L14 7M11 19L18 8M15 18L21 9"/>`),
  /* ✦ ARCANISTA */
  raio:      S(`<path d="M13 2L5 13h5l-1 9 8-11h-5z"/>`),
  nova:      S(`<path d="M12 2v20M4 6l16 12M20 6L4 18"/><path d="M12 6l-2 2M12 6l2 2
                M12 18l-2-2M12 18l2-2"/>`),
  colapso:   S(`<circle cx="12" cy="12" r="3.5"/><path d="M12 3a9 9 0 0 1 0 18"/>
                <path d="M12 21a9 9 0 0 1 0-18"/><path d="M3.5 9.5L8 11M20.5 14.5L16 13"/>`),
  prisma:    S(`<path d="M12 3L3 19h18z"/><path d="M12 3v16"/><path d="M7.5 19L12 11l4.5 8"/>`),
  /* ◈ ORÁCULA */
  tecer:     S(`<path d="M12 2v20M2 12h20"/><path d="M5 5l14 14M19 5L5 19"/>
                <circle cx="12" cy="12" r="3"/>`),
  julgamento:S(`<path d="M12 3v18M7 21h10"/><path d="M4 8h16"/>
                <path d="M4 8l-2 5a3 3 0 0 0 6 0z"/><path d="M20 8l2 5a3 3 0 0 1-6 0z"/>`),
  fio:       S(`<path d="M18 4l-9 9"/><circle cx="19.5" cy="2.5" r="1.6"/>
                <path d="M9 13c-4 2-5 6-2 8s7-1 6-5"/>`),
  tapecaria: S(`<path d="M4 4h16v16H4z"/><path d="M4 9h16M4 14h16M9 4v16M14 4v16"/>`),
  /* universal */
  respirar:  S(`<path d="M12 21c-4 0-7-3-7-7 0-2 1-3 2-3s2 1 2 3"/>
                <path d="M12 21c4 0 7-3 7-7 0-2-1-3-2-3s-2 1-2 3"/><path d="M12 21V9"/>
                <path d="M12 9c0-3 2-5 4-6"/>`),
};
export const iconeDe = id => ICONES[id] || ICONES.decapitar;

/* ---- o REQUISITO desenhado como dados, não como "[≥5]" ---- */
const dado = (txt, cls='') => `<i class="dchip ${cls}">${txt}</i>`;
const GLIF = { essence:'✦', blade:'⚔', shield:'🛡', wild:'◈', echo:'⟳' };

export function reqChips(req){
  if(!req) return '';
  switch(req.t){
    case 'min':    return `<span class="op">≥</span>${dado(req.v)}`;
    case 'exact':  return `<span class="op">=</span>${dado(req.v)}`;
    case 'set':    return Array.from({length:req.size},()=>dado('=','ig')).join('');
    case 'seq':    return Array.from({length:req.size},(_,i)=>dado(i?'+1':'n','sq')).join('');
    case 'sum':    return `<span class="op">Σ≥</span>${dado(req.min,'so')}`;
    case 'sumExact':return `<span class="op">Σ=</span>${dado(req.v,'so')}`;
    case 'parity': return dado(req.p==='odd'?'ímpar':'par','pr');
    case 'symbol': return dado(GLIF[req.s]||'?','sb');
    case 'any':    return Array.from({length:req.count||1},()=>dado('•','qq')).join('');
    case 'each':   return Array.from({length:req.size},()=>
                     `<span class="grp">${reqChips(req.of)}</span>`).join('');
  }
  return '';
}
