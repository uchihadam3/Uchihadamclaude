// =============================================================================
// story.js — ROTEIRO e FASES do Modo História. Edite à vontade!
//   Falas: { who, text }.  who = chave em SPEAKERS.
//   Fases: type 'meta' (bata a pontuação) ou 'boss' (com falas no meio).
// =============================================================================

// hasArt:false → usa só o emoji (sem 404). Ao gerar a arte, ponha o PNG em
// assets/ e troque p/ hasArt:true.
export const SPEAKERS = {
  crupie:    { name:'O Crupiê',    emoji:'🎭', color:'#a071d6', img:'assets/crupie.png',    hasArt:false },
  apostador: { name:'O Apostador', emoji:'🃏', color:'#e0662a', img:'assets/apostador.png', hasArt:false },
  voce:      { name:'Você',        emoji:'🫥', color:'#5cc6ff', img:'assets/voce.png',      hasArt:false },
};

// Abertura (antes da 1ª fase)
export const INTRO = [
  { who:'crupie', text:'Ah… mais um que acorda à minha mesa. Bem-vindo à Casa.' },
  { who:'crupie', text:'A saída fica lá em cima. Mas só sobe quem prova que a sorte lhe obedece.' },
  { who:'crupie', text:'As regras são simples: role os dados, some pontos, alcance a meta.' },
  { who:'voce',   text:'…e se eu não alcançar?' },
  { who:'crupie', text:'Então a Casa fica com você. Como ficou com todos os outros. Role.' },
];

// Falas ao vencer TODAS as fases (fim do trecho jogável por enquanto)
export const OUTRO = [
  { who:'apostador', text:'Impossível… ninguém passa do primeiro andar.' },
  { who:'crupie',    text:'Curioso. A Casa não gostou disso. Nem um pouco.' },
  { who:'crupie',    text:'Suba, então. Mas saiba: cada andar tem um dono pior que o anterior…' },
  { who:'crupie',    text:'(continua…)' },
];

export const STAGES = [
  {
    type:'meta', name:'A Taverna — Mesa I', meta:150, hands:4, rerolls:2,
    win:[{ who:'crupie', text:'Sorte de principiante. A próxima mesa não perdoa.' }],
  },
  {
    type:'meta', name:'A Taverna — Mesa II', meta:240, hands:4, rerolls:2,
    intro:[{ who:'crupie', text:'A aposta subiu. Os dados sentem o cheiro do medo, sabia?' }],
    win:[{ who:'crupie', text:'Hah! Talvez você não seja só mais um nome na parede.' }],
  },
  {
    type:'boss', who:'apostador', name:'O Apostador', meta:420, hands:5, rerolls:2,
    intro:[
      { who:'apostador', text:'Então é você que anda incomodando o velho Crupiê. Senta.' },
      { who:'apostador', text:'Eu SOU a sorte desta casa. Bata minha marca… se conseguir.' },
    ],
    mid:[{ who:'apostador', text:'Não… você está chegando perto. Isso não acontece.' }],
    win:[
      { who:'apostador', text:'Não pode ser! Os dados… os dados me traíram!' },
      { who:'apostador', text:'Fui preso aqui por ganância. Talvez… você seja diferente.' },
    ],
    lose:[{ who:'apostador', text:'Hah! A Casa agradece a visita. Sempre agradece.' }],
  },
];
