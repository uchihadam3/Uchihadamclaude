/* ========================================================================
   OS ÍCONES — um desenho para cada coisa que o jogo nomeia.

   A regra da casa, aprendida apanhando em outro jogo: NUNCA um glifo mudo.
   Toda coisa que o jogo cobra do jogador aparece sempre do mesmo jeito —
   DESENHO + PALAVRA — e o desenho é sempre o mesmo desenho, na ficha, na
   carta e no como-se-joga. Emoji não serve: em Android metade some.

   São SVG de traço em viewBox 0 0 24 24, para herdarem cor e espessura de
   quem os coloca.
   ===================================================================== */
const S = d => `<svg class="gl" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;

export const ICO = {
  /* --- tipos de carta --- */
  normal:   S('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/>'),
  ouro:     S('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/>'
             +'<circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>'),
  cristal:  S('<path d="M12 2.5 L20 9.5 L12 21.5 L4 9.5 Z"/><path d="M4 9.5 h16"/>'
             +'<path d="M12 2.5 L12 21.5"/>'),
  lendaria: S('<path d="M12 2.5 l2.7 6.2 6.8.6 -5.1 4.4 1.5 6.6 -5.9-3.5 -5.9 3.5 '
             +'1.5-6.6 -5.1-4.4 6.8-.6 Z"/>'),
  fantasma: S('<path d="M5 20.5 V10 a7 7 0 0 1 14 0 v10.5 l-2.3-2 -2.3 2 -2.4-2 '
             +'-2.3 2 -2.4-2 Z"/><circle cx="9.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>'
             +'<circle cx="14.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>'),
  camaleao: S('<path d="M4 12 h6"/><path d="M14 12 h6"/><path d="M8 8.5 L4 12 L8 15.5"/>'
             +'<path d="M16 8.5 L20 12 L16 15.5"/>'),
  espelho:  S('<path d="M12 2.5 V21.5"/><path d="M12 5 L4.5 12 L12 19"/>'
             +'<path d="M12 5 L19.5 12 L12 19" stroke-dasharray="2.4 2.4"/>'),
  bomba:    S('<circle cx="10.5" cy="15" r="6.8"/><path d="M15.4 10 L17.6 7.8"/>'
             +'<path d="M17.6 7.8 c1.6-1.6 3.4-1.2 3.4.6 0 1.4-1.4 1.8-2.2 1"/>'
             +'<path d="M7 12.4 a4.6 4.6 0 0 1 2.6-2.4"/>'),
  gelo:     S('<path d="M12 2.5 V21.5"/><path d="M4 7 L20 17"/><path d="M20 7 L4 17"/>'
             +'<path d="M12 6 l-2.4-2.4M12 6 l2.4-2.4"/>'),
  corrente: S('<rect x="2.5" y="8.5" width="9" height="7" rx="3.5"/>'
             +'<rect x="12.5" y="8.5" width="9" height="7" rx="3.5"/>'),
  portal:   S('<ellipse cx="12" cy="12" rx="5" ry="9"/><ellipse cx="12" cy="12" rx="9" ry="5"/>'),
  mimic:    S('<rect x="3.5" y="9" width="17" height="11" rx="2"/>'
             +'<path d="M3.5 12.5 h17"/><path d="M6 9 V6.5 a6 6 0 0 1 12 0 V9"/>'
             +'<circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none"/>'),
  veneno:   S('<path d="M8.5 3.5 h7 v3.5 l3 8.5 a6.5 6.5 0 0 1-13 0 l3-8.5 Z"/>'
             +'<path d="M6.6 15.5 h10.8"/>'),
  raio:     S('<path d="M13.5 2.5 L6 13.5 h5 L10.5 21.5 L18 10.5 h-5 Z"/>'),

  /* --- coisas da run --- */
  reliquia: S('<path d="M12 3 l7 4 v7 c0 4-3.4 6.2-7 7.5 -3.6-1.3-7-3.5-7-7.5 V7 Z"/>'
             +'<circle cx="12" cy="11.5" r="2.4"/>'),
  combate:  S('<path d="M4 20 L15 9"/><path d="M12.5 6.5 L17.5 3 L21 6.5 L17.5 11.5 Z"/>'
             +'<path d="M4 20 h4"/>'),
  elite:    S('<path d="M3.5 7.5 L7 14 L12 4.5 L17 14 L20.5 7.5 V19 H3.5 Z"/>'),
  chefe:    S('<path d="M12 2.5 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4-5.6 -5.6-2.4 '
             +'5.6-2.4 Z"/><path d="M12 19 v2.5"/>'),
  loja:     S('<path d="M3.5 9 h17 l-1.4 11 h-14.2 Z"/><path d="M8 9 V6.5 a4 4 0 0 1 8 0 V9"/>'),
  evento:   S('<circle cx="12" cy="12" r="9"/><path d="M9.2 9.4 a2.9 2.9 0 1 1 3.3 3.3 v1.6"/>'
             +'<circle cx="12.4" cy="17.6" r="1.1" fill="currentColor" stroke="none"/>'),
  fogueira: S('<path d="M12 21 c4 0 6.5-2.6 6.5-5.8 0-4.4-4.6-5.2-3.6-12.2 '
             +'-4.2 2.4-6 5.6-6 9.2 0 1.6.8 2.8 1.8 3.4 -.4-2.4 .8-4 2.2-5"/>'),
  tesouro:  S('<rect x="3" y="9" width="18" height="11" rx="2"/>'
             +'<path d="M3 13.5 h18"/><path d="M5.5 9 a6.5 6.5 0 0 1 13 0"/>'
             +'<path d="M12 12 v3.5"/>'),

  /* --- vocabulário --- */
  meta:     S('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/>'
             +'<circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>'),
  virada:   S('<path d="M20 12 a8 8 0 1 1-2.6-5.9"/><path d="M20.4 3 v4.4 h-4.4"/>'),
  foco:     S('<path d="M12 4.5 c4.6 3.6 6.5 6 6.5 9 A6.5 6.5 0 0 1 5.5 13.5 '
             +'c0-3 1.9-5.4 6.5-9 Z"/>'),
  combo:    S('<path d="M3 18 L8 12 L12 15 L21 5"/><path d="M21 10 V5 h-5"/>'),
  vista:    S('<path d="M2.5 12 s3.6-6.5 9.5-6.5S21.5 12 21.5 12 17.9 18.5 12 18.5 '
             +'2.5 12 2.5 12 Z"/><circle cx="12" cy="12" r="2.8"/>'),
  conhecida:S('<path d="M6.5 3.5 h11 a1.5 1.5 0 0 1 1.5 1.5 v15.5 l-7-3.6 -7 3.6 V5 '
             +'a1.5 1.5 0 0 1 1.5-1.5 Z"/><path d="M9 8.5 h6"/>'),
  orfa:     S('<rect x="2.5" y="8.5" width="8" height="7" rx="3.5"/>'
             +'<rect x="13.5" y="8.5" width="8" height="7" rx="3.5"/>'
             +'<path d="M11.6 6.6 L12.4 17.4"/>'),
  semente:  S('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5 v17"/>'
             +'<path d="M3.5 12 h17"/><path d="M6 6 L18 18"/><path d="M18 6 L6 18"/>'),
  prova:    S('<path d="M5 3.5 h9 l5 5 v12 h-14 Z"/><path d="M14 3.5 v5 h5"/>'
             +'<path d="M8 14.5 l2.4 2.4 L15.5 11.8"/>'),
  recusa:   S('<circle cx="12" cy="12" r="8.5"/><path d="M6.5 6.5 L17.5 17.5"/>'),
  /* o carimbo do par já fechado — a carta fica no tabuleiro com ele */
  feito:    S('<circle cx="12" cy="12" r="9"/><path d="M7.6 12.3 L10.6 15.3 L16.4 8.9"/>'),
  /* a MOEDA é diferente da carta de OURO: uma é dinheiro, a outra é um tipo
     de carta. Usar o mesmo desenho para as duas confundia o preço da loja
     com o valor da carta. */
  moeda:    S('<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/>'
             +'<path d="M12 3.4 v2.2M12 18.4 v2.2M3.4 12 h2.2M18.4 12 h2.2"/>'),
};

/* --- as oito classes ---
   Também desenhadas, e pelo mesmo motivo: ⚗ e ⛏ existem em Unicode e não
   existem na fonte de metade dos celulares. */
export const ICO_CLASSE = {
  detetive:   S('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.2 15.2 L21 21"/>'
               +'<circle cx="10.5" cy="10.5" r="2.4"/>'),
  cronomante: S('<path d="M6 3 h12"/><path d="M6 21 h12"/>'
               +'<path d="M7 3 c0 5 5 6.4 5 9 0-2.6 5-4 5-9"/>'
               +'<path d="M7 21 c0-5 5-6.4 5-9 0 2.6 5 4 5 9"/>'),
  trapaceiro: S('<path d="M3.5 9 h14"/><path d="M14.5 5.5 L18 9 L14.5 12.5"/>'
               +'<path d="M20.5 15 h-14"/><path d="M9.5 11.5 L6 15 L9.5 18.5"/>'),
  hacker:     S('<rect x="2.5" y="4.5" width="19" height="15" rx="2"/>'
               +'<path d="M6 9.5 L9 12 L6 14.5"/><path d="M11.5 15 h6"/>'),
  mago:       S('<path d="M12 2.5 L13.9 8.4 L20 8.4 L15 12 L16.9 18 L12 14.3 '
               +'L7.1 18 L9 12 L4 8.4 L10.1 8.4 Z"/>'),
  cientista:  S('<path d="M9.5 3 v6.2 L4.6 18 a2.6 2.6 0 0 0 2.3 3.8 h10.2 '
               +'a2.6 2.6 0 0 0 2.3-3.8 L14.5 9.2 V3"/><path d="M8 3 h8"/>'
               +'<path d="M6.6 14.5 h10.8"/>'),
  arqueologo: S('<path d="M3.5 20.5 L13 11"/><path d="M6.5 8 c5-4 10-4 14.5 0 '
               +'-4.5 1.2-8 3.2-11 6.4"/><path d="M10.5 6.6 L14 13"/>'),
  genio:      S('<path d="M8 12 a3.4 3.4 0 1 1 3.4 3.4 c-2.4 0-3.4-6.8-6.8-6.8 '
               +'a3.4 3.4 0 0 0 0 6.8 c3.4 0 4.4-6.8 6.8-6.8 a3.4 3.4 0 0 1 0 6.8"/>'),
};

/* --- os seis chefes --- */
export const ICO_CHEFE = {
  ilusionista:  S('<path d="M12 2.8 l1.9 5.4 5.4 1.9 -5.4 1.9 -1.9 5.4 -1.9-5.4 '
                 +'-5.4-1.9 5.4-1.9 Z"/><path d="M18.5 16.5 l.9 2.3 2.3.9 -2.3.9 '
                 +'-.9 2.3 -.9-2.3 -2.3-.9 2.3-.9 Z"/>'),
  hipnotizador: S('<path d="M12 12 a1.6 1.6 0 1 0 1.7 1.5 a3.4 3.4 0 1 1-3.6-3.3 '
                 +'a5.2 5.2 0 1 0 5.5 5 a7 7 0 1 1-7.4-6.8"/>'),
  tempo:        S('<circle cx="12" cy="12" r="8.7"/><path d="M12 6.6 V12 l3.6 2.2"/>'),
  caos:         S('<path d="M12 3.5 v6"/><path d="M6.9 6.5 L10.6 11"/>'
                 +'<path d="M17.1 6.5 L13.4 11"/><path d="M4 14.5 h6"/>'
                 +'<path d="M20 14.5 h-6"/><path d="M8 20.5 L11 15.5"/>'
                 +'<path d="M16 20.5 L13 15.5"/>'),
  espelho:      S('<path d="M12 2.5 V21.5"/><path d="M9.6 5.5 L3.2 12 L9.6 18.5 Z"/>'
                 +'<path d="M14.4 5.5 L20.8 12 L14.4 18.5 Z" stroke-dasharray="2.6 2.4"/>'),
  rei:          S('<path d="M3.5 18.5 L5.5 7 L9.5 11.5 L12 4.5 L14.5 11.5 L18.5 7 '
                 +'L20.5 18.5 Z"/><path d="M3.5 21.5 h17"/>'),
};
/* ─────────── A ARTE PINTADA ───────────
   Os desenhos em SVG acima continuam sendo a fonte da verdade: são eles que
   garantem que TODA coisa nomeada no jogo tem uma marca própria, e é sobre
   eles que o teste 16b passa. Quando chega arte pintada para um conceito, ela
   entra por cima — e o que não tiver arte continua desenhado, então o jogo
   nunca fica com um buraco no lugar de um ícone. */
const PINTADOS = ['combate','elite','chefe','loja','evento','fogueira','tesouro',
  'meta','virada','foco','combo','vista','conhecida','feito','orfa','curinga',
  'semente','prova',
  /* os catorze tipos de carta, e mais três marcas que aparecem em toda tela */
  'normal','ouro','cristal','lendaria','fantasma','camaleao','espelho','bomba',
  'gelo','corrente','portal','mimic','veneno','raio','reliquia','recusa','moeda'];
export const TEM_ARTE = new Set(PINTADOS);
/* `mold` marca a arte que JÁ VEM emoldurada — classe e chefe chegaram dentro
   de um quadro de madeira. Essa arte não pode ser exibida no tamanho de um
   ícone: a moldura come metade dos pixels e o que está dentro dela vira uma
   mancha. A tela lê essa marca e dá mais espaço. */
const pintura = (pasta, id, mold='') =>
  `<img class="gl art ${mold}" src="arte/${pasta}/${id}.png" alt="" aria-hidden="true">`;
for(const id of PINTADOS) ICO[id] = pintura('ico', id);
for(const id of Object.keys(ICO_CLASSE)) ICO_CLASSE[id] = pintura('classe', id, 'mold');
for(const id of Object.keys(ICO_CHEFE))  ICO_CHEFE[id]  = pintura('chefe', id, 'mold');

/* ─────────── DUAS COLEÇÕES NOVAS ───────────
   Até agora as vinte e uma relíquias dividiam UM ícone genérico, e a loja
   oferecia três amuletos iguais com nomes diferentes. Escolher entre coisas
   que se parecem não é escolher — é ler três parágrafos e chutar. Cada uma
   passa a ter a sua marca, e o brasão faz o mesmo pela família. */
export const ICO_RELIQUIA = {};
for(const id of ['olho_coruja','caderno','ima','luva','ampulheta','lampada',
  'moeda_torta','dado_viciado','memoria_fotografica','espelho_antigo','coroa',
  'biblioteca','pena','bussola','sino','cofre','mente_palacio','relogio_parado',
  'olho_abismo','mao_do_tempo','nucleo']) ICO_RELIQUIA[id] = pintura('rel', id);

export const ICO_FAM = {};
for(const id of ['runas','espaco','alquimia','xadrez','mitologia','tecnologia',
  'dragoes','egito']) ICO_FAM[id] = pintura('fam', id);

/* a marca de uma relíquia, com o amuleto genérico como rede de segurança:
   relíquia nova entra no jogo sem quebrar a tela enquanto a arte não chega */
export const icoReliquia = id => ICO_RELIQUIA[id] || ICO.reliquia;

export default ICO;
