// 4 dificuldades base + Maldição 1-10 (empilháveis com Veterano).
// Campos interpretados por Run/Combat: enemyHpMul, enemyAggro, safeEvents,
// earlyElites, startCracked, bossExtraActEvery, shopMul, eliteRerollMinus,
// fateEnemyChance, dangerEvents, downTurns, enemyStartShield, bossExtraPhase, trueMode.
(function () {
  RA.data.Difficulties = [
    {
      id: 'aprendiz', tier: 0,
      name: { pt: 'Aprendiz', en: 'Apprentice' },
      desc: { pt: 'Inimigos com menos HP e eventos mais seguros. Bom para aprender.', en: 'Enemies have less HP, events are safer. Good for learning.' },
      fx: { enemyHpMul: 0.85, safeEvents: true }
    },
    {
      id: 'normal', tier: 1,
      name: { pt: 'Normal', en: 'Normal' },
      desc: { pt: 'A experiência padrão, como o destino pretendia.', en: 'The standard experience, as fate intended.' },
      fx: {}
    },
    {
      id: 'dificil', tier: 2,
      name: { pt: 'Difícil', en: 'Hard' },
      desc: { pt: 'Inimigos com +15% de HP e intenções mais agressivas.', en: 'Enemies have +15% HP and more aggressive intents.' },
      fx: { enemyHpMul: 1.15, enemyAggro: true },
      unlock: function (p) { return p.stats.wins > 0; },
      unlockTxt: { pt: 'Vença no Normal.', en: 'Win on Normal.' }
    },
    {
      id: 'veterano', tier: 3,
      name: { pt: 'Veterano', en: 'Veteran' },
      desc: { pt: 'Inimigos com +25% de HP e elites aparecem mais cedo.', en: 'Enemies have +25% HP, elites appear earlier.' },
      fx: { enemyHpMul: 1.25, enemyAggro: true, earlyElites: true },
      unlock: function (p) { return (p.stats.bestDifficulty | 0) >= 2; },
      unlockTxt: { pt: 'Vença no Difícil.', en: 'Win on Hard.' }
    }
  ];

  // Maldições: exigem Veterano vencido; cada nível soma os efeitos dos anteriores.
  RA.data.Curses = [
    { lvl: 1, pt: 'Começa com uma face trincada.', en: 'Start with one cracked face.', fx: { startCracked: 1 } },
    { lvl: 2, pt: 'Chefes têm ação extra a cada 3 turnos.', en: 'Bosses act again every 3 turns.', fx: { bossExtraActEvery: 3 } },
    { lvl: 3, pt: 'Lojas custam mais (+30%).', en: 'Shops cost more (+30%).', fx: { shopMul: 1.3 } },
    { lvl: 4, pt: 'Uma rerrolagem a menos em batalhas elite.', en: 'One fewer reroll in elite battles.', fx: { eliteRerollMinus: 1 } },
    { lvl: 5, pt: 'O Dado do Destino pode favorecer inimigos.', en: 'The Fate Die may favor enemies.', fx: { fateEnemyChance: 0.35 } },
    { lvl: 6, pt: 'Eventos perigosos aparecem mais.', en: 'Dangerous events appear more often.', fx: { dangerEvents: true } },
    { lvl: 7, pt: 'Heróis caídos têm só 1 turno para reviver.', en: 'Downed heroes have only 1 turn to be revived.', fx: { downTurns: 1 } },
    { lvl: 8, pt: 'Inimigos começam com escudo.', en: 'Enemies start with shield.', fx: { enemyStartShield: 2 } },
    { lvl: 9, pt: 'Chefes têm fase extra.', en: 'Bosses have an extra phase.', fx: { bossExtraPhase: true } },
    { lvl: 10, pt: 'Modo verdadeiro: vencer desbloqueia o final secreto.', en: 'True mode: winning unlocks the secret ending.', fx: { trueMode: true } }
  ];

  // Combina dificuldade + nível de maldição num único objeto de efeitos.
  RA.data.difficultyFx = function (diffId, curseLvl) {
    var d = null;
    for (var i = 0; i < RA.data.Difficulties.length; i++) if (RA.data.Difficulties[i].id === diffId) d = RA.data.Difficulties[i];
    var out = {};
    if (d) for (var k in d.fx) out[k] = d.fx[k];
    if (curseLvl > 0) {
      for (var c = 0; c < RA.data.Curses.length; c++) {
        if (RA.data.Curses[c].lvl <= curseLvl) {
          var f = RA.data.Curses[c].fx;
          for (var k2 in f) out[k2] = f[k2];
        }
      }
      out.curseLvl = curseLvl;
    }
    return out;
  };
})();
