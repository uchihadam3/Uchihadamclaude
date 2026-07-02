/* =========================================================================
   PETECA LEGENDS — data.js
   Todo o conteúdo do jogo: atletas, adversários, campeonatos, estratégias,
   treinos, habilidades, equipamentos, cosméticos, eventos e comentários.
   ========================================================================= */
(function (root) {
  'use strict';

  const D = {};

  /* =====================================================================
     ATRIBUTOS
     ===================================================================== */
  D.ATTRS = [
    { key: 'vel', name: 'Velocidade',     desc: 'Rapidez para chegar na peteca.' },
    { key: 'ref', name: 'Reflexo',        desc: 'Reação contra ataques rápidos.' },
    { key: 'atk', name: 'Força de Ataque',desc: 'Potência das batidas ofensivas.' },
    { key: 'pre', name: 'Precisão',       desc: 'Chance de mandar a peteca no lugar certo.' },
    { key: 'def', name: 'Defesa',         desc: 'Capacidade de devolver petecas difíceis.' },
    { key: 'sak', name: 'Saque',          desc: 'Qualidade, potência e precisão dos saques.' },
    { key: 'ctl', name: 'Controle',       desc: 'Bolas curtas, cruzadas e colocadas.' },
    { key: 'fol', name: 'Fôlego',         desc: 'Resistência em sets longos.' },
    { key: 'lei', name: 'Leitura de Jogo',desc: 'Posicionamento e antecipação.' },
    { key: 'fri', name: 'Frieza',         desc: 'Desempenho em pontos decisivos.' },
  ];
  D.ATTR_NAME = {}; D.ATTRS.forEach(a => { D.ATTR_NAME[a.key] = a.name; });

  /* =====================================================================
     ATLETAS SELECIONÁVEIS (8)
     look: { skin, hair, hairStyle, uniforme depois }  gender: m/f
     ===================================================================== */
  D.ATHLETES = [
    {
      id: 'rafa', name: 'Rafa "Mão Leve"', shortName: 'Rafa', gender: 'm',
      style: 'Técnico', pot: 78,
      desc: 'Cresceu jogando peteca na praça. Não tem braço forte, mas coloca a peteca onde quiser.',
      person: 'Calmo, observador e perfeccionista. Odeia errar bola fácil.',
      attrs: { vel: 34, ref: 36, atk: 22, pre: 48, def: 34, sak: 38, ctl: 50, fol: 34, lei: 42, fri: 36 },
      look: { skin: '#c68642', hair: '#2b1b10', hairStyle: 'curto', body: 'magro' },
    },
    {
      id: 'bianca', name: 'Bianca "Raio"', shortName: 'Bianca', gender: 'f',
      style: 'Veloz', pot: 80,
      desc: 'Ex-velocista que trocou a pista pela quadra. Chega em qualquer peteca... enquanto aguenta.',
      person: 'Elétrica e competitiva. Fica impaciente em pontos longos.',
      attrs: { vel: 52, ref: 48, atk: 32, pre: 32, def: 36, sak: 30, ctl: 30, fol: 24, lei: 32, fri: 34 },
      look: { skin: '#8d5524', hair: '#120b08', hairStyle: 'coque', body: 'atletica' },
    },
    {
      id: 'davi', name: 'Davi "Martelo"', shortName: 'Davi', gender: 'm',
      style: 'Atacante', pot: 74,
      desc: 'Braço mais pesado do bairro. Quando acerta, ninguém devolve. Quando erra, a peteca some.',
      person: 'Explosivo e confiante demais. Vive pedindo bola para atacar.',
      attrs: { vel: 34, ref: 32, atk: 52, pre: 26, def: 28, sak: 46, ctl: 22, fol: 38, lei: 30, fri: 36 },
      look: { skin: '#e0ac69', hair: '#3d2314', hairStyle: 'moicano', body: 'forte' },
    },
    {
      id: 'luna', name: 'Luna "Parede"', shortName: 'Luna', gender: 'f',
      style: 'Defensiva', pot: 76,
      desc: 'Dizem que é mais fácil furar um muro do que passar uma peteca por ela.',
      person: 'Paciente e teimosa. Nunca dá um ponto de graça.',
      attrs: { vel: 36, ref: 48, atk: 20, pre: 34, def: 52, sak: 30, ctl: 34, fol: 40, lei: 38, fri: 38 },
      look: { skin: '#f1c27d', hair: '#5a3825', hairStyle: 'rabo', body: 'media' },
    },
    {
      id: 'andre', name: 'André "Cabeça Fria"', shortName: 'André', gender: 'm',
      style: 'Equilibrado', pot: 75,
      desc: 'Nunca teve o melhor físico, mas sempre está no lugar certo na hora certa.',
      person: 'Sereno. Quanto maior a pressão, mais devagar ele respira.',
      attrs: { vel: 36, ref: 36, atk: 34, pre: 36, def: 36, sak: 34, ctl: 36, fol: 36, lei: 46, fri: 50 },
      look: { skin: '#8d5524', hair: '#111111', hairStyle: 'raspado', body: 'media' },
    },
    {
      id: 'maya', name: 'Maya "Curva Certa"', shortName: 'Maya', gender: 'f',
      style: 'Estratégica', pot: 79,
      desc: 'Enxerga a quadra como um tabuleiro. Cada saque dela já começa o ponto ganho.',
      person: 'Analítica e provocadora. Adora vencer sem forçar o braço.',
      attrs: { vel: 26, ref: 34, atk: 28, pre: 44, def: 32, sak: 48, ctl: 46, fol: 34, lei: 48, fri: 38 },
      look: { skin: '#ffdbac', hair: '#7b3f00', hairStyle: 'franja', body: 'media' },
    },
    {
      id: 'theo', name: 'Theo "Pulso Firme"', shortName: 'Theo', gender: 'm',
      style: 'Saque forte', pot: 73,
      desc: 'O saque dele faz barulho de trovão. O resto do jogo ainda está em construção.',
      person: 'Direto e trabalhador. Treina saque até o sol se pôr.',
      attrs: { vel: 32, ref: 30, atk: 46, pre: 34, def: 24, sak: 54, ctl: 28, fol: 36, lei: 30, fri: 36 },
      look: { skin: '#c68642', hair: '#1c1c1c', hairStyle: 'cacheado', body: 'forte' },
    },
    {
      id: 'nina', name: 'Nina "Fundo de Quadra"', shortName: 'Nina', gender: 'f',
      style: 'Resistente', pot: 77,
      desc: 'Corre a partida inteira no mesmo ritmo. Adversário cansa só de olhar.',
      person: 'Disciplinada e silenciosa. Deixa o fôlego falar por ela.',
      attrs: { vel: 38, ref: 34, atk: 24, pre: 32, def: 44, sak: 30, ctl: 32, fol: 54, lei: 36, fri: 40 },
      look: { skin: '#f1c27d', hair: '#c94f2e', hairStyle: 'trancas', body: 'atletica' },
    },
  ];

  /* =====================================================================
     ESTRATÉGIAS (8) — modificadores usados pela IA da simulação
     Cada campo é um multiplicador/ajuste aplicado nas decisões.
     ===================================================================== */
  D.STRATEGIES = [
    { id: 'seguro',    name: 'Jogo Seguro',        icon: '🛡️',
      desc: 'Arrisca menos, comete menos erros e mantém a peteca em jogo.',
      mods: { risk: -0.35, atkBias: -0.3, ctlBias: 0.1, serveRisk: -0.3, rally: 0.2 } },
    { id: 'ataque',    name: 'Ataque Total',        icon: '⚡',
      desc: 'Batidas fortes para finalizar rápido. Mais pontos rápidos, mais erros.',
      mods: { risk: 0.4, atkBias: 0.55, ctlBias: -0.2, serveRisk: 0.15, rally: -0.3 } },
    { id: 'colocada',  name: 'Bola Colocada',       icon: '🎯',
      desc: 'Precisão, bolas curtas e variação para explorar espaços vazios.',
      mods: { risk: 0.05, atkBias: -0.15, ctlBias: 0.5, serveRisk: 0, rally: 0 } },
    { id: 'saque',     name: 'Pressão no Saque',    icon: '🚀',
      desc: 'Força mais no saque para começar os pontos em vantagem.',
      mods: { risk: 0.1, atkBias: 0.1, ctlBias: 0, serveRisk: 0.5, rally: -0.1 } },
    { id: 'cansar',    name: 'Cansar o Adversário', icon: '⏳',
      desc: 'Prolonga os pontos e explora adversários com pouco fôlego.',
      mods: { risk: -0.2, atkBias: -0.25, ctlBias: 0.2, serveRisk: -0.15, rally: 0.5, tireTarget: true } },
    { id: 'fraco',     name: 'Explorar Jogador Fraco', icon: '🔍',
      desc: 'Mira no atleta adversário com pior defesa, reflexo ou condição.',
      mods: { risk: 0.05, atkBias: 0.1, ctlBias: 0.15, serveRisk: 0.1, rally: 0, weakTarget: true } },
    { id: 'defesa',    name: 'Defesa Primeiro',     icon: '🧱',
      desc: 'Prioriza devolver ataques e esperar o erro adversário.',
      mods: { risk: -0.3, atkBias: -0.4, ctlBias: 0, serveRisk: -0.25, rally: 0.35, defBoost: 0.1 } },
    { id: 'equilibrio',name: 'Equilíbrio',          icon: '⚖️',
      desc: 'Mistura ataque, defesa e controle sem riscos extremos.',
      mods: { risk: 0, atkBias: 0, ctlBias: 0, serveRisk: 0, rally: 0 } },
  ];
  D.STRAT_BY_ID = {}; D.STRATEGIES.forEach(s => { D.STRAT_BY_ID[s.id] = s; });

  /* =====================================================================
     ARQUÉTIPOS DE DUPLAS ADVERSÁRIAS
     mult: multiplicadores de atributos sobre a base do tier.
     ===================================================================== */
  D.ARCHETYPES = {
    agressiva:  { name: 'Agressiva',  strat: 'ataque',
      mult: { atk: 1.3, sak: 1.15, vel: 1.05, pre: 0.85, def: 0.8, ctl: 0.85, fri: 1.0, fol: 1.0, ref: 1.0, lei: 0.95 } },
    defensiva:  { name: 'Defensiva',  strat: 'defesa',
      mult: { def: 1.3, ref: 1.2, fol: 1.1, atk: 0.75, sak: 0.85, vel: 1.0, pre: 1.0, ctl: 0.95, fri: 1.0, lei: 1.05 } },
    tecnica:    { name: 'Técnica',    strat: 'colocada',
      mult: { ctl: 1.3, pre: 1.25, lei: 1.1, atk: 0.8, vel: 0.9, def: 0.95, sak: 1.05, fol: 0.95, ref: 1.0, fri: 1.0 } },
    veloz:      { name: 'Veloz',      strat: 'equilibrio',
      mult: { vel: 1.3, ref: 1.2, fol: 1.05, atk: 0.9, pre: 0.9, ctl: 0.9, sak: 0.9, def: 1.05, lei: 0.95, fri: 0.95 } },
    saqueforte: { name: 'Saque Forte',strat: 'saque',
      mult: { sak: 1.35, atk: 1.15, pre: 0.95, def: 0.85, ctl: 0.9, vel: 0.95, fol: 1.0, ref: 0.95, lei: 0.95, fri: 1.0 } },
    resistente: { name: 'Resistente', strat: 'cansar',
      mult: { fol: 1.35, def: 1.15, vel: 1.0, atk: 0.85, pre: 0.95, sak: 0.9, ctl: 0.95, ref: 1.0, lei: 1.0, fri: 1.05 } },
    fria:       { name: 'Fria',       strat: 'equilibrio',
      mult: { fri: 1.35, lei: 1.15, pre: 1.05, atk: 0.95, vel: 0.95, def: 1.0, sak: 1.0, ctl: 1.0, fol: 0.95, ref: 0.95 } },
    equilibrada:{ name: 'Equilibrada',strat: 'equilibrio',
      mult: { vel: 1.05, ref: 1.05, atk: 1.05, pre: 1.05, def: 1.05, sak: 1.05, ctl: 1.05, fol: 1.05, lei: 1.05, fri: 1.05 } },
    jovem:      { name: 'Jovem',      strat: 'ataque',
      mult: { vel: 1.3, atk: 1.15, ref: 1.1, pre: 0.75, fri: 0.75, ctl: 0.85, def: 0.95, sak: 0.95, fol: 1.1, lei: 0.85 } },
    veterana:   { name: 'Veterana',   strat: 'fraco',
      mult: { lei: 1.35, fri: 1.2, pre: 1.1, ctl: 1.1, vel: 0.75, fol: 0.85, atk: 0.95, def: 1.0, sak: 1.0, ref: 0.9 } },
  };

  /* 24 duplas adversárias. tier 1..11 casa com os campeonatos. */
  D.OPPONENTS = [
    { id: 'pipoca',    tier: 1, arch: 'jovem',       name: 'Meninos da Pipoca',    p: [{ n: 'Kiko', g: 'm', skin: '#e0ac69', hair: '#2b1b10', hs: 'curto' }, { n: 'Juninho', g: 'm', skin: '#8d5524', hair: '#111111', hs: 'cacheado' }], color: '#d9534f' },
    { id: 'quintal',   tier: 1, arch: 'defensiva',   name: 'Dupla do Quintal',     p: [{ n: 'Dona Zefa', g: 'f', skin: '#c68642', hair: '#cccccc', hs: 'coque' }, { n: 'Seu Tião', g: 'm', skin: '#8d5524', hair: '#bbbbbb', hs: 'raspado' }], color: '#7a9e5f' },
    { id: 'lanchonete',tier: 1, arch: 'agressiva',   name: 'Turma da Lanchonete',  p: [{ n: 'Beto', g: 'm', skin: '#f1c27d', hair: '#3d2314', hs: 'moicano' }, { n: 'Gugu', g: 'm', skin: '#e0ac69', hair: '#1c1c1c', hs: 'curto' }], color: '#e8a33d' },
    { id: 'escola',    tier: 2, arch: 'veloz',       name: 'Atletas da Escola',    p: [{ n: 'Lia', g: 'f', skin: '#ffdbac', hair: '#7b3f00', hs: 'rabo' }, { n: 'Pri', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'trancas' }], color: '#5bc0de' },
    { id: 'feirantes', tier: 2, arch: 'resistente',  name: 'Feirantes Unidos',     p: [{ n: 'Bira', g: 'm', skin: '#c68642', hair: '#111111', hs: 'raspado' }, { n: 'Rose', g: 'f', skin: '#f1c27d', hair: '#5a3825', hs: 'coque' }], color: '#8f6ac4' },
    { id: 'garagem',   tier: 2, arch: 'tecnica',     name: 'Peteca de Garagem',    p: [{ n: 'Fê', g: 'f', skin: '#e0ac69', hair: '#c94f2e', hs: 'franja' }, { n: 'Caco', g: 'm', skin: '#ffdbac', hair: '#2b1b10', hs: 'cacheado' }], color: '#4aa3a3' },
    { id: 'clube',     tier: 3, arch: 'equilibrada', name: 'Clube do Centro',      p: [{ n: 'Marcão', g: 'm', skin: '#8d5524', hair: '#1c1c1c', hs: 'curto' }, { n: 'Duda', g: 'f', skin: '#c68642', hair: '#120b08', hs: 'rabo' }], color: '#3d7dd8' },
    { id: 'sombra',    tier: 3, arch: 'fria',        name: 'Irmãos Sombra',        p: [{ n: 'Ícaro', g: 'm', skin: '#f1c27d', hair: '#111111', hs: 'franja' }, { n: 'Íris', g: 'f', skin: '#f1c27d', hair: '#111111', hs: 'franja' }], color: '#444a66' },
    { id: 'martelada', tier: 3, arch: 'saqueforte',  name: 'Dupla Martelada',      p: [{ n: 'Brutus', g: 'm', skin: '#e0ac69', hair: '#3d2314', hs: 'moicano' }, { n: 'Tanque', g: 'm', skin: '#8d5524', hair: '#111111', hs: 'raspado' }], color: '#b8503d' },
    { id: 'vendaval',  tier: 4, arch: 'veloz',       name: 'Vendaval FC',          p: [{ n: 'Sissi', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'coque' }, { n: 'Nando', g: 'm', skin: '#c68642', hair: '#2b1b10', hs: 'curto' }], color: '#39b7cd' },
    { id: 'muralha',   tier: 4, arch: 'defensiva',   name: 'Muralha Mineira',      p: [{ n: 'Geralda', g: 'f', skin: '#c68642', hair: '#5a3825', hs: 'trancas' }, { n: 'Chico', g: 'm', skin: '#e0ac69', hair: '#1c1c1c', hs: 'cacheado' }], color: '#6b7f45' },
    { id: 'giz',       tier: 5, arch: 'tecnica',     name: 'Mestres do Giz',       p: [{ n: 'Prof. Hélio', g: 'm', skin: '#ffdbac', hair: '#999999', hs: 'raspado' }, { n: 'Alice', g: 'f', skin: '#ffdbac', hair: '#7b3f00', hs: 'franja' }], color: '#c9a227' },
    { id: 'maratona',  tier: 5, arch: 'resistente',  name: 'Dupla Maratona',       p: [{ n: 'Kenya', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'trancas' }, { n: 'Élton', g: 'm', skin: '#8d5524', hair: '#111111', hs: 'raspado' }], color: '#4f8a5b' },
    { id: 'trovao',    tier: 6, arch: 'saqueforte',  name: 'Trovão do Cerrado',    p: [{ n: 'Raul', g: 'm', skin: '#c68642', hair: '#1c1c1c', hs: 'moicano' }, { n: 'Vandi', g: 'm', skin: '#e0ac69', hair: '#3d2314', hs: 'curto' }], color: '#d08a2e' },
    { id: 'xadrez',    tier: 6, arch: 'veterana',    name: 'Reis do Xadrez',       p: [{ n: 'Sr. Otto', g: 'm', skin: '#ffdbac', hair: '#dddddd', hs: 'raspado' }, { n: 'Dona Cléo', g: 'f', skin: '#c68642', hair: '#cccccc', hs: 'coque' }], color: '#7d5ba6' },
    { id: 'furacao',   tier: 7, arch: 'agressiva',   name: 'Furacão Paulista',     p: [{ n: 'Max', g: 'm', skin: '#e0ac69', hair: '#111111', hs: 'moicano' }, { n: 'Táta', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'rabo' }], color: '#cf4436' },
    { id: 'gaviao',    tier: 7, arch: 'fria',        name: 'Gaviões da Serra',     p: [{ n: 'Aldo', g: 'm', skin: '#c68642', hair: '#2b1b10', hs: 'curto' }, { n: 'Bruna', g: 'f', skin: '#f1c27d', hair: '#5a3825', hs: 'coque' }], color: '#3f5e78' },
    { id: 'quebrada',  tier: 8, arch: 'jovem',       name: 'Promessas da Quebrada',p: [{ n: 'PV', g: 'm', skin: '#8d5524', hair: '#111111', hs: 'cacheado' }, { n: 'Ray', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'trancas' }], color: '#2ea86c' },
    { id: 'imperial',  tier: 8, arch: 'equilibrada', name: 'Dupla Imperial',       p: [{ n: 'Augusto', g: 'm', skin: '#ffdbac', hair: '#3d2314', hs: 'franja' }, { n: 'Helena', g: 'f', skin: '#ffdbac', hair: '#7b3f00', hs: 'rabo' }], color: '#b09030' },
    { id: 'pantera',   tier: 9, arch: 'veloz',       name: 'Panteras do Litoral',  p: [{ n: 'Naia', g: 'f', skin: '#8d5524', hair: '#120b08', hs: 'coque' }, { n: 'Cauã', g: 'm', skin: '#c68642', hair: '#1c1c1c', hs: 'raspado' }], color: '#1f8f8f' },
    { id: 'titanio',   tier: 9, arch: 'defensiva',   name: 'Titânio Duplas',       p: [{ n: 'Vera', g: 'f', skin: '#f1c27d', hair: '#c94f2e', hs: 'rabo' }, { n: 'Igor', g: 'm', skin: '#e0ac69', hair: '#111111', hs: 'curto' }], color: '#5c6b7a' },
    { id: 'andes',     tier: 10, arch: 'tecnica',    name: 'Cóndores dos Andes',   p: [{ n: 'Mateo', g: 'm', skin: '#c68642', hair: '#111111', hs: 'curto' }, { n: 'Paloma', g: 'f', skin: '#c68642', hair: '#120b08', hs: 'trancas' }], color: '#a03a3a' },
    { id: 'sol',       tier: 10, arch: 'agressiva',  name: 'Filhos do Sol',        p: [{ n: 'Diego', g: 'm', skin: '#e0ac69', hair: '#2b1b10', hs: 'moicano' }, { n: 'Lupe', g: 'f', skin: '#e0ac69', hair: '#120b08', hs: 'coque' }], color: '#e0b52e' },
    { id: 'dragao',    tier: 11, arch: 'fria',       name: 'Dragões do Oriente',   p: [{ n: 'Kenji', g: 'm', skin: '#ffdbac', hair: '#111111', hs: 'raspado' }, { n: 'Sakura', g: 'f', skin: '#ffdbac', hair: '#111111', hs: 'franja' }], color: '#8c2332' },
    { id: 'lenda',     tier: 11, arch: 'equilibrada',name: 'Lendas Vivas',         p: [{ n: 'Campeão Ivo', g: 'm', skin: '#8d5524', hair: '#1c1c1c', hs: 'curto' }, { n: 'Rainha Marta', g: 'f', skin: '#c68642', hair: '#120b08', hs: 'rabo' }], color: '#c9b037' },
  ];

  /** Base de atributo por tier (1..11). */
  D.tierBase = (tier) => 24 + tier * 6; // t1=30 ... t11=90

  /* =====================================================================
     CAMPEONATOS (11)
     rounds: nº de partidas. theme: visual da quadra. reqRep: reputação.
     ===================================================================== */
  D.TOURNAMENTS = [
    { id: 'praca',      tier: 1,  name: 'Torneio da Praça',       local: 'Praça do Coreto',        theme: 'praca',    rounds: 2, prize: 220,   fee: 0,    reqRep: 0,    repWin: 12,  desc: 'Competição amadora local. Todo mundo começa aqui.' },
    { id: 'bairro',     tier: 2,  name: 'Copa do Bairro',         local: 'Quadra da Rua 7',        theme: 'bairro',   rounds: 2, prize: 380,   fee: 30,   reqRep: 10,   repWin: 18,  desc: 'Primeiro torneio com premiação de verdade.' },
    { id: 'cidade',     tier: 3,  name: 'Campeonato da Cidade',   local: 'Ginásio Municipal Velho',theme: 'gymSmall', rounds: 3, prize: 700,   fee: 60,   reqRep: 30,   repWin: 26,  desc: 'O primeiro grande objetivo de toda dupla amadora.' },
    { id: 'municipal',  tier: 4,  name: 'Liga Municipal',         local: 'Clube dos Trabalhadores',theme: 'gymSmall', rounds: 3, prize: 1100,  fee: 100,  reqRep: 60,   repWin: 34,  desc: 'Adversários mais consistentes e menos erros de graça.' },
    { id: 'regional',   tier: 5,  name: 'Desafio Regional',       local: 'Ginásio da Serra',       theme: 'gymBig',   rounds: 3, prize: 1700,  fee: 150,  reqRep: 100,  repWin: 42,  desc: 'Duplas com estilos bem definidos. Estude o adversário.' },
    { id: 'estadual',   tier: 6,  name: 'Campeonato Estadual',    local: 'Arena Estadual',         theme: 'gymBig',   rounds: 3, prize: 2600,  fee: 220,  reqRep: 150,  repWin: 52,  desc: 'Aumento real de dificuldade. Sem espaço para bobeira.' },
    { id: 'inter',      tier: 7,  name: 'Copa Interestadual',     local: 'Centro Esportivo União', theme: 'arena',    rounds: 3, prize: 3800,  fee: 320,  reqRep: 210,  repWin: 62,  desc: 'Os melhores de cada região no mesmo ginásio.' },
    { id: 'nacional',   tier: 8,  name: 'Campeonato Nacional',    local: 'Arena Brasil',           theme: 'arena',    rounds: 4, prize: 5600,  fee: 450,  reqRep: 280,  repWin: 74,  desc: 'A elite profissional da peteca brasileira.' },
    { id: 'liga',       tier: 9,  name: 'Liga Profissional',      local: 'Circuito Pro (4 etapas)',theme: 'arena',    rounds: 4, prize: 8200,  fee: 600,  reqRep: 370,  repWin: 88,  desc: 'Calendário pesado. Fôlego e elenco fazem diferença.' },
    { id: 'continental',tier: 10, name: 'Copa Continental',       local: 'Estádio Pan-Americano',  theme: 'world',    rounds: 4, prize: 12500, fee: 800,  reqRep: 480,  repWin: 105, desc: 'Duplas de elite de todo o continente.' },
    { id: 'mundial',    tier: 11, name: 'Campeonato Mundial',     local: 'Arena Mundial de Peteca',theme: 'world',    rounds: 4, prize: 20000, fee: 1000, reqRep: 620,  repWin: 130, desc: 'O topo do mundo da peteca. Só os melhores chegam aqui.' },
  ];
  D.TOUR_BY_ID = {}; D.TOURNAMENTS.forEach(t => { D.TOUR_BY_ID[t.id] = t; });

  /* =====================================================================
     TREINOS (11)
     ===================================================================== */
  D.TRAININGS = [
    { id: 'vel', attr: 'vel', name: 'Treino de Velocidade', icon: '🏃', desc: 'Tiros curtos e agilidade. Melhora o deslocamento.' },
    { id: 'ref', attr: 'ref', name: 'Treino de Reflexo',    icon: '👁️', desc: 'Reação contra ataques rápidos.' },
    { id: 'atk', attr: 'atk', name: 'Treino de Ataque',     icon: '💥', desc: 'Potência nas batidas ofensivas.' },
    { id: 'pre', attr: 'pre', name: 'Treino de Precisão',   icon: '🎯', desc: 'Reduz erros e melhora a mira.' },
    { id: 'def', attr: 'def', name: 'Treino de Defesa',     icon: '🧤', desc: 'Devoluções de petecas difíceis.' },
    { id: 'sak', attr: 'sak', name: 'Treino de Saque',      icon: '🚀', desc: 'Saques seguros, fortes e colocados.' },
    { id: 'ctl', attr: 'ctl', name: 'Treino de Controle',   icon: '🪶', desc: 'Bolas curtas, cruzadas e colocadas.' },
    { id: 'fol', attr: 'fol', name: 'Treino de Fôlego',     icon: '🫁', desc: 'Resistência em partidas longas.' },
    { id: 'lei', attr: 'lei', name: 'Leitura de Jogo',      icon: '🧠', desc: 'Posicionamento e antecipação.' },
    { id: 'fri', attr: 'fri', name: 'Treino Mental',        icon: '🧊', desc: 'Frieza em pontos decisivos.' },
  ];

  /* =====================================================================
     HABILIDADES PASSIVAS (11)
     ===================================================================== */
  D.SKILLS = [
    { id: 'saqueSeguro',  name: 'Saque Seguro',      icon: '✅', desc: 'Reduz erros no saque em 30%.', },
    { id: 'bracoPesado',  name: 'Braço Pesado',      icon: '💪', desc: 'Ataques fortes ganham +8 de potência.' },
    { id: 'olhoQueda',    name: 'Olho na Queda',     icon: '👀', desc: 'Melhora o posicionamento na recepção (+6 leitura efetiva).' },
    { id: 'defMilagrosa', name: 'Defesa Milagrosa',  icon: '✨', desc: '8% de chance de salvar uma peteca impossível.' },
    { id: 'duplaAfinada', name: 'Dupla Afinada',     icon: '🤝', desc: 'Com entrosamento 60+, cobertura de quadra melhora muito.' },
    { id: 'pontoDecisivo',name: 'Ponto Decisivo',    icon: '🏆', desc: 'Joga melhor em set point e match point (+10 frieza efetiva).' },
    { id: 'curtaMortal',  name: 'Bola Curta Mortal', icon: '🪶', desc: 'Bolas curtas ficam 25% mais difíceis de devolver.' },
    { id: 'fundoQuadra',  name: 'Fundo de Quadra',   icon: '📏', desc: 'Bolas fundas ganham precisão e profundidade.' },
    { id: 'cabecaFria',   name: 'Cabeça Fria',       icon: '🧊', desc: 'Reduz pela metade a penalidade por pressão.' },
    { id: 'ritmoJogo',    name: 'Ritmo de Jogo',     icon: '🎵', desc: 'Em ralis longos (6+ toques), joga +8% melhor.' },
    { id: 'energiaFinal', name: 'Energia Final',     icon: '🔋', desc: 'Reduz em 40% a queda de fôlego no terceiro set.' },
  ];
  D.SKILL_BY_ID = {}; D.SKILLS.forEach(s => { D.SKILL_BY_ID[s.id] = s; });

  /* =====================================================================
     EQUIPAMENTOS (8)
     slot: 'a' = por atleta, 't' = da dupla
     ===================================================================== */
  D.EQUIPMENT = [
    { id: 'tenis',      name: 'Tênis Leve',           icon: '👟', price: 350,  slot: 'a', bonus: { vel: 4 },  desc: '+4 Velocidade.' },
    { id: 'munhequeira',name: 'Munhequeira Firme',    icon: '🧵', price: 300,  slot: 'a', bonus: { ctl: 4 },  desc: '+4 Controle.' },
    { id: 'uniformePro',name: 'Uniforme Profissional',icon: '👕', price: 500,  slot: 't', bonus: { repMult: 0.15 }, desc: '+15% de reputação ganha.' },
    { id: 'kitTreino',  name: 'Kit de Treino',        icon: '🎒', price: 600,  slot: 't', bonus: { tpMult: 0.2 }, desc: '+20% de pontos de treino ganhos.' },
    { id: 'petecaTreino',name: 'Peteca de Treino',    icon: '🏸', price: 280,  slot: 'a', bonus: { pre: 4 },  desc: '+4 Precisão.' },
    { id: 'faixaFoco',  name: 'Faixa de Foco',        icon: '🎽', price: 320,  slot: 'a', bonus: { fri: 4 },  desc: '+4 Frieza.' },
    { id: 'joelheira',  name: 'Joelheira Esportiva',  icon: '🦵', price: 380,  slot: 'a', bonus: { fatMult: -0.15 }, desc: '-15% de impacto do cansaço.' },
    { id: 'bolsa',      name: 'Bolsa de Atleta',      icon: '💼', price: 900,  slot: 't', bonus: { all: 2 },  desc: '+2 em todos os atributos em campeonatos.' },
  ];
  D.EQUIP_BY_ID = {}; D.EQUIPMENT.forEach(e => { D.EQUIP_BY_ID[e.id] = e; });

  /* =====================================================================
     COSMÉTICOS
     ===================================================================== */
  D.UNIFORM_COLORS = [
    { id: 'verde',   name: 'Verde Canário', c1: '#1faa4b', c2: '#ffdd33', price: 0 },
    { id: 'azul',    name: 'Azul Litoral',  c1: '#2b6fd8', c2: '#ffffff', price: 200 },
    { id: 'vermelho',name: 'Vermelho Fogo', c1: '#d03a2b', c2: '#222222', price: 200 },
    { id: 'roxo',    name: 'Roxo Real',     c1: '#7d3fc9', c2: '#e8c832', price: 350 },
    { id: 'preto',   name: 'Preto Ouro',    c1: '#20242c', c2: '#e0b52e', price: 500 },
    { id: 'rosa',    name: 'Rosa Choque',   c1: '#e84a8a', c2: '#ffffff', price: 350 },
  ];
  D.CELEBRATIONS = [
    { id: 'pulo',    name: 'Pulo Clássico',   price: 0,   desc: 'Pulo com o braço para cima.' },
    { id: 'toca',    name: 'Toca Aqui',       price: 250, desc: 'A dupla comemora junta.' },
    { id: 'giro',    name: 'Giro de Campeão', price: 400, desc: 'Giro completo com pose final.' },
  ];
  D.TRAIL_FX = [
    { id: 'nenhum',  name: 'Sem Efeito',      price: 0,   desc: 'Batida limpa, sem rastro.' },
    { id: 'fogo',    name: 'Rastro de Fogo',  price: 450, desc: 'Ataques fortes deixam rastro quente.' },
    { id: 'neon',    name: 'Rastro Neon',     price: 450, desc: 'Rastro azul elétrico nos ataques.' },
  ];

  /* =====================================================================
     EVENTOS ESPECIAIS (entre campeonatos)
     ===================================================================== */
  D.EVENTS = [
    { id: 'exCampeao', name: 'Treino com Ex-Campeão', icon: '🏅',
      text: 'Um ex-campeão estadual ofereceu um treino especial para a dupla.',
      opts: [
        { label: 'Aceitar (grátis)', fx: { tp: 6, cond: -10 }, msg: 'Treino puxado! +6 pontos de treino, mas a dupla ficou cansada.' },
        { label: 'Agradecer e descansar', fx: { cond: 10 }, msg: 'A dupla descansou e recuperou a condição física.' },
      ] },
    { id: 'patrocinio', name: 'Patrocinador Interessado', icon: '💼',
      text: 'Uma loja de esportes local quer patrocinar a dupla em troca de divulgação.',
      opts: [
        { label: 'Aceitar patrocínio', fx: { money: 300, rep: -5 }, msg: '+R$ 300! Alguns fãs acharam a propaganda exagerada (-5 reputação).' },
        { label: 'Recusar', fx: { rep: 10 }, msg: 'A torcida respeitou a decisão. +10 reputação.' },
      ] },
    { id: 'lesao', name: 'Dores no Ombro', icon: '🤕',
      text: 'Um dos atletas sentiu dores leves no ombro após os treinos.',
      opts: [
        { label: 'Descansar uma semana', fx: { cond: 15, tp: -2 }, msg: 'Recuperação completa, mas perdeu um pouco de ritmo de treino.' },
        { label: 'Seguir treinando', fx: { cond: -15, tp: 3 }, msg: 'Ganhou treino extra, mas a condição física piorou.' },
      ] },
    { id: 'rival', name: 'Provocação de Rivais', icon: '😤',
      text: 'Uma dupla rival provocou vocês numa entrevista: "Eles não passam de amadores".',
      opts: [
        { label: 'Responder na quadra', fx: { moral: 8 }, msg: 'A dupla canalizou a raiva. Moral em alta na próxima partida!' },
        { label: 'Ignorar', fx: { rep: 6 }, msg: 'A elegância rendeu simpatia do público. +6 reputação.' },
      ] },
    { id: 'reportagem', name: 'Reportagem Local', icon: '📰',
      text: 'O jornal da cidade quer fazer uma matéria sobre a dupla.',
      opts: [
        { label: 'Dar entrevista', fx: { rep: 12 }, msg: 'A matéria ficou ótima! +12 reputação.' },
        { label: 'Focar no treino', fx: { tp: 3 }, msg: 'Sem distrações: +3 pontos de treino.' },
      ] },
    { id: 'beneficente', name: 'Torneio Beneficente', icon: '❤️',
      text: 'Convidaram a dupla para um torneio beneficente sem premiação.',
      opts: [
        { label: 'Participar', fx: { rep: 15, cond: -8 }, msg: 'Um dia lindo de peteca! +15 reputação, mas gastou energia.' },
        { label: 'Não participar', fx: {}, msg: 'A dupla preferiu manter o foco na temporada.' },
      ] },
    { id: 'desafioSaque', name: 'Desafio de Saque na TV', icon: '📺',
      text: 'Um programa local desafiou a dupla: acertar 10 saques no alvo.',
      opts: [
        { label: 'Topar o desafio', fx: { special: 'saqueTV' }, msg: '' },
        { label: 'Recusar', fx: {}, msg: 'A dupla preferiu não se expor.' },
      ] },
    { id: 'chuva', name: 'Semana de Chuva', icon: '🌧️',
      text: 'Choveu a semana inteira e o treino ao ar livre ficou impossível.',
      opts: [
        { label: 'Treinar teoria em casa', fx: { special: 'teoria' }, msg: '' },
        { label: 'Descansar', fx: { cond: 12 }, msg: 'Semana de sofá e recuperação. Condição física em dia.' },
      ] },
  ];

  /* =====================================================================
     COMENTÁRIOS DA TRANSMISSÃO
     ===================================================================== */
  D.COMMENTS = {
    servePerfect:  ['Saque perfeito!', 'Que saque! Ponto direto!', 'O saque veio pesado demais!'],
    serveFault:    ['Errou o saque!', 'O saque foi longo demais.', 'Saque na rede! Que desperdício.'],
    smashWin:      ['Ataque forte no fundo da quadra!', 'Martelada sem resposta!', 'Que pancada! Impossível defender.'],
    smashOut:      ['Forçou demais e mandou para fora!', 'A peteca saiu por pouco!', 'Errou o ataque na hora H.'],
    dropWin:       ['Bola curta bem colocada!', 'Que carinho na peteca! Ninguém chegou.', 'Ponto decidido pela precisão.'],
    netFault:      ['A peteca morreu na rede.', 'Bateu na fita e não passou!', 'A rede segurou essa.'],
    greatDefense:  ['Defesa espetacular!', 'Que defesa! A torcida foi ao delírio.', 'Salvou uma peteca impossível!'],
    pressureError: ['Erro por pressão!', 'A mão pesou na hora decisiva.', 'O nervosismo cobrou seu preço.'],
    tiredPoint:    ['O cansaço decidiu o ponto.', 'As pernas já não respondem.', 'A dupla adversária está cansando.'],
    longRally:     ['Rali longo! Que ponto!', 'Troca de bolas incrível!', 'Ninguém quer entregar esse ponto!'],
    readPlay:      ['A leitura de jogo fez diferença.', 'Já estava esperando a peteca ali!', 'Antecipação perfeita.'],
    chemSave:      ['Entrosamento salvou o ponto!', 'Cobertura perfeita da dupla!', 'Um fecha, o outro cobre. Lindo!'],
    setPoint:      ['SET POINT!'],
    matchPoint:    ['MATCH POINT!'],
    weakTarget:    ['Estão martelando no mesmo alvo.', 'Encontraram o ponto fraco do adversário.'],
  };

  /* Nomes de duplas geradas para partida rápida/preencher chaves */
  D.FILLER_TEAMS = [
    'Duplas do Vale', 'Pena Dourada', 'Ases do Vento', 'Companhia da Peteca',
    'Estrelas do Sul', 'Falcões da Areia', 'Gigantes da Rede', 'Meninas da Vila',
  ];

  root.D = D;
})(typeof window !== 'undefined' ? window : globalThis);
