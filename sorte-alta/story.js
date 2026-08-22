// =============================================================================
// story.js — Conteúdo editável: roteiro, chefe, relíquias, constantes.
// =============================================================================

export const CANDLES = 3;   // velas = vidas por run

// RELÍQUIAS / RUNAS — modificadores passivos. rarity: comum | raro | lendario.
// Efeitos de PONTUAÇÃO são aplicados em game.js (scoreOf); 'sorte'/'avareza'
// mexem em recurso (rerroll/ouro) e são tratados no fluxo.
export const RELICS = [
  // comuns
  { id:'ganancia',   emoji:'💰', name:'Ganância',        rarity:'comum', desc:'+12 fichas em toda jogada.' },
  { id:'brasa',      emoji:'🔥', name:'Brasa',           rarity:'comum', desc:'+4 fichas por dado PAR.' },
  { id:'fome',       emoji:'🩸', name:'Fome',            rarity:'comum', desc:'+5 fichas por dado ÍMPAR.' },
  { id:'osso',       emoji:'🦴', name:'Peso do Osso',    rarity:'comum', desc:'+3 fichas por dado 5 ou 6.' },
  { id:'olho',       emoji:'👁️', name:'Olho do Crupiê',  rarity:'comum', desc:'+1 mult em toda jogada.' },
  { id:'espinhos',   emoji:'🌵', name:'Espinhos',        rarity:'comum', desc:'+8 fichas base.' },
  { id:'sorte',      emoji:'🎲', name:'Mão de Sorte',    rarity:'comum', desc:'+1 rerrolagem por fase.' },
  { id:'avareza',    emoji:'🪙', name:'Avareza',         rarity:'comum', desc:'+3 ouro ao vencer uma mesa.' },
  // raros
  { id:'pressagio',  emoji:'🍀', name:'Presságio',       rarity:'raro',  desc:'Trinca ou melhor: +3 mult.' },
  { id:'parsombrio', emoji:'🌑', name:'Par Sombrio',     rarity:'raro',  desc:'Par / Dois Pares: +2 mult.' },
  { id:'serpente',   emoji:'🐍', name:'Fio da Serpente', rarity:'raro',  desc:'Sequência: +45 fichas.' },
  { id:'usura',      emoji:'📜', name:'Usura',           rarity:'raro',  desc:'Soma dos dados ≥ 22: +35 fichas.' },
  // lendários
  { id:'chamadupla', emoji:'✨', name:'Chama Dupla',     rarity:'lendario', desc:'Full House ou melhor: DOBRA o mult.' },
  { id:'cranio',     emoji:'💀', name:'Crânio Rúnico',   rarity:'lendario', desc:'+2 mult por dado 6.' },
];

export const SPEAKERS = {
  crupie:    { name:'O Crupiê',    emoji:'🎭', color:'#a071d6', img:'assets/crupie.png',    hasArt:false },
  apostador: { name:'O Apostador', emoji:'🃏', color:'#e0662a', img:'assets/apostador.png', hasArt:false },
  voce:      { name:'Você',        emoji:'🫥', color:'#5cc6ff', img:'assets/voce.png',      hasArt:false },
};

export const INTRO = [
  { who:'crupie', text:'Ah… mais um que acorda à minha mesa. Bem-vindo à Casa.' },
  { who:'crupie', text:'A saída fica lá em cima. Escolha seu caminho — cada porta cobra um preço.' },
  { who:'crupie', text:'Role os dados, some pontos, alcance a meta. E reze pra sua sorte durar.' },
];

export const OUTRO = [
  { who:'apostador', text:'Impossível… ninguém sobe o primeiro andar.' },
  { who:'crupie',    text:'Curioso. A Casa não gostou disso. Nem um pouco.' },
  { who:'crupie',    text:'Suba, então. O próximo dono é bem pior que eu… (continua)' },
];

// O CHEFE do ato (nó final do mapa).
export const BOSS = {
  who:'apostador', name:'O Apostador', meta:560, hands:5, rerolls:1,
  intro:[
    { who:'apostador', text:'Então é você que anda subindo minha casa. Senta.' },
    { who:'apostador', text:'Eu SOU a sorte deste andar. Bata minha marca… se conseguir.' },
  ],
  mid:[{ who:'apostador', text:'Não… você está chegando perto. Isso NÃO acontece.' }],
  win:[
    { who:'apostador', text:'Não pode ser! Os dados… me traíram!' },
    { who:'apostador', text:'Fui preso aqui por ganância. Talvez você seja diferente…' },
  ],
  lose:[{ who:'apostador', text:'Hah! A Casa agradece a visita. Sempre agradece.' }],
};
