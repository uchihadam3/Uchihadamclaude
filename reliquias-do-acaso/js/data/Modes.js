// 12 modos de jogo + regras do modo Caos.
// O Run manager interpreta os campos: regions (quantas), partySize, dicePerHero,
// draft, infinite, bossRush, dailySeed, chaosRule, startRelicLegendary, healNerf,
// soloBoost, corrupted.
(function () {
  RA.data.Modes = [
    {
      id: 'campanha', icon: 'sword',
      name: { pt: 'Campanha', en: 'Campaign' },
      desc: { pt: 'A run completa: 8 regiões até a Torre do Dado Negro. 50-90 minutos.', en: 'The full run: 8 regions up to the Tower of the Black Die. 50-90 min.' },
      rules: { regions: 8 }
    },
    {
      id: 'rapido', icon: 'bolt',
      name: { pt: 'Modo Rápido', en: 'Quick Mode' },
      desc: { pt: '3 regiões aleatórias + chefe final reduzido. 20-30 minutos.', en: '3 random regions + reduced final boss. 20-30 min.' },
      rules: { regions: 3, randomRegions: true, reducedFinal: true }
    },
    {
      id: 'draft', icon: 'star',
      name: { pt: 'Draft', en: 'Draft' },
      desc: { pt: 'Monte a equipe escolhendo 1 herói entre 3 opções, cinco vezes.', en: 'Build your team picking 1 of 3 heroes, five times.' },
      rules: { regions: 8, draft: true }
    },
    {
      id: 'torreInfinita', icon: 'chain',
      name: { pt: 'Torre Infinita', en: 'Endless Tower' },
      desc: { pt: 'Combates infinitos com dificuldade crescente. Até onde você chega?', en: 'Endless battles with rising difficulty. How far can you go?' },
      rules: { infinite: true },
      unlock: { pt: 'Vença a Campanha.', en: 'Beat the Campaign.', check: function (p) { return p.stats.wins > 0; } }
    },
    {
      id: 'diario', icon: 'hour',
      name: { pt: 'Desafio Diário', en: 'Daily Challenge' },
      desc: { pt: 'Seed fixa do dia: mesmo mapa e recompensas para todos. Ranking local.', en: 'Fixed daily seed: same map and rewards for everyone. Local ranking.' },
      rules: { regions: 3, randomRegions: true, reducedFinal: true, dailySeed: true },
      unlock: { pt: 'Vença a Campanha.', en: 'Beat the Campaign.', check: function (p) { return p.stats.wins > 0; } }
    },
    {
      id: 'caos', icon: 'flame',
      name: { pt: 'Caos', en: 'Chaos' },
      desc: { pt: 'Toda batalha tem uma regra aleatória. Nada é confiável.', en: 'Every battle has a random rule. Nothing is reliable.' },
      rules: { regions: 8, chaos: true },
      unlock: { pt: 'Vença 3 runs.', en: 'Win 3 runs.', check: function (p) { return p.stats.wins >= 3; } }
    },
    {
      id: 'reliquiaUnica', icon: 'coin',
      name: { pt: 'Relíquia Única', en: 'Single Relic' },
      desc: { pt: 'Comece com uma relíquia lendária à escolha, mas inimigos mais fortes.', en: 'Start with a legendary relic of your choice, but stronger enemies.' },
      rules: { regions: 8, startRelicLegendary: true, enemyHpMul: 1.2 },
      unlock: { pt: 'Colecione 30 relíquias.', en: 'Collect 30 relics.', check: function (p) { return Object.keys(p.seenRelics || {}).length >= 30; } }
    },
    {
      id: 'semCura', icon: 'skull',
      name: { pt: 'Sem Cura', en: 'No Healing' },
      desc: { pt: 'Curas são raras. Sobreviva com escudo, prevenção e controle.', en: 'Healing is rare. Survive on shields, prevention and control.' },
      rules: { regions: 8, healNerf: true },
      unlock: { pt: 'Vença sem nenhum herói cair.', en: 'Win with no hero downed.', check: function (p) { return !!p.achievements.semQuedas; } }
    },
    {
      id: 'bossRush', icon: 'flame',
      name: { pt: 'Boss Rush', en: 'Boss Rush' },
      desc: { pt: 'Sequência direta de elites e chefes, com recompensa entre eles.', en: 'A straight gauntlet of elites and bosses, with rewards between.' },
      rules: { bossRush: true },
      unlock: { pt: 'Derrote 4 chefes diferentes.', en: 'Defeat 4 different bosses.', check: function (p) { return Object.keys(p.beatenBosses || {}).length >= 4; } }
    },
    {
      id: 'abismo', icon: 'eye',
      name: { pt: 'Abismo Infinito', en: 'Endless Abyss' },
      desc: { pt: 'Inimigos, bosses e eventos corrompidos sob regras impossíveis. Sem fim.', en: 'Corrupted enemies, bosses and events under impossible rules. No end.' },
      rules: { infinite: true, chaos: true, corrupted: true },
      unlock: { pt: 'Segredo: derrote um chefe secreto.', en: 'Secret: defeat a secret boss.', check: function (p) { return !!(p.beatenBosses && (p.beatenBosses.ferreiroCego || p.beatenBosses.criancaSorte || p.beatenBosses.reiSemNumero || p.beatenBosses.maeDasFaces)); }, secret: true }
    },
    {
      id: 'solitario', icon: 'heart',
      name: { pt: 'Herói Solitário', en: 'Lone Hero' },
      desc: { pt: '1 herói com dado expandido (2 dados e +HP) contra lutas reduzidas.', en: '1 hero with an expanded die (2 dice, +HP) against reduced fights.' },
      rules: { regions: 8, partySize: 1, dicePerHero: 2, soloBoost: true, reducedFights: true },
      unlock: { pt: 'Vença a Campanha.', en: 'Beat the Campaign.', check: function (p) { return p.stats.wins > 0; } }
    },
    {
      id: 'dupla', icon: 'shield',
      name: { pt: 'Dupla', en: 'Duo' },
      desc: { pt: '2 heróis, cada um rola 2 dados. Sinergia é tudo.', en: '2 heroes, each rolling 2 dice. Synergy is everything.' },
      rules: { regions: 8, partySize: 2, dicePerHero: 2, reducedFights: true },
      unlock: { pt: 'Vença a Campanha.', en: 'Beat the Campaign.', check: function (p) { return p.stats.wins > 0; } }
    }
  ];

  // Regras do modo Caos (uma sorteada por batalha)
  RA.data.ChaosRules = [
    { id: 'so2Rerolls', pt: 'Só 2 rerrolagens nesta batalha.', en: 'Only 2 rerolls this battle.' },
    { id: 'todosEnvenenados', pt: 'Todos começam envenenados (1).', en: 'Everyone starts poisoned (1).' },
    { id: 'destinoDobrado', pt: 'O Dado do Destino tem efeito dobrado.', en: 'The Fate Die effect is doubled.' },
    { id: 'inimigosMaisAcao', pt: 'Inimigos têm +1 ação por turno.', en: 'Enemies get +1 action per turn.' },
    { id: 'trocaPosicao', pt: 'Heróis trocam de linha a cada turno.', en: 'Heroes swap rows every turn.' },
    { id: 'dadosSelvagens', pt: 'Um dado aleatório ganha +2 a cada turno.', en: 'A random die gets +2 each turn.' },
    { id: 'escudosFracos', pt: 'Escudos valem metade (arredondado para cima).', en: 'Shields are halved (rounded up).' },
    { id: 'curaInvertida', pt: 'A primeira cura do turno também dá 1 de dano no inimigo mais fraco.', en: 'First heal each turn also deals 1 to the weakest enemy.' },
    { id: 'nevoa', pt: 'Intenções dos inimigos ficam ocultas.', en: 'Enemy intents are hidden.' },
    { id: 'ouroOuSangue', pt: 'Vitória dá ouro dobrado, mas heróis começam com -2 HP.', en: 'Victory pays double gold, but heroes start at -2 HP.' }
  ];

  var byId = {};
  RA.data.Modes.forEach(function (m) { byId[m.id] = m; });
  RA.data.ModesById = byId;
})();
