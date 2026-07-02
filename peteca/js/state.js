/* =========================================================================
   PETECA LEGENDS — state.js
   Estado do jogo, criação de atletas/duplas, progressão e salvamento local.
   ========================================================================= */
(function (root) {
  'use strict';

  const { U, D } = root;
  const SAVE_KEY = 'petecaLegendsSave_v1';

  const G = {
    save: null,          // estado persistente
    screen: 'boot',      // tela atual
    // objetos transitórios (partida em andamento etc.)
    match: null,
    pendingTournament: null,
  };

  /* =====================================================================
     CRIAÇÃO DE ATLETAS
     ===================================================================== */

  /** Cria a instância jogável de um atleta base (dados do jogador). */
  G.makePlayerAthlete = function (base) {
    return {
      baseId: base.id,
      name: base.shortName,
      fullName: base.name,
      gender: base.gender,
      style: base.style,
      pot: base.pot,
      attrs: U.deepClone(base.attrs),
      look: U.deepClone(base.look),
      skills: [],            // ids de passivas desbloqueadas
      skillPts: 1,           // começa com 1 ponto para escolher
      xp: 0, level: 1,
      equip: [],             // ids de equipamentos (slot 'a')
      stats: { wins: 0, losses: 0, points: 0, aces: 0, smashes: 0, titles: 0 },
    };
  };

  /** Gera os atletas de uma dupla adversária a partir do tier + arquétipo. */
  G.makeOpponentTeam = function (opp, rng) {
    rng = rng || U.makeRng((opp.id.length * 7919) ^ 0x5eed);
    const base = D.tierBase(opp.tier);
    const arch = D.ARCHETYPES[opp.arch];
    const athletes = opp.p.map((p, i) => {
      const attrs = {};
      for (const a of D.ATTRS) {
        const mult = arch.mult[a.key] || 1;
        const jitter = U.rand(rng, -4, 4) + (i === 0 ? 1 : -1); // leve variação entre parceiros
        attrs[a.key] = Math.round(U.clamp(base * mult + jitter, 8, 99));
      }
      return {
        baseId: opp.id + '_' + i,
        name: p.n, fullName: p.n, gender: p.g,
        style: arch.name, pot: 50,
        attrs,
        look: { skin: p.skin, hair: p.hair, hairStyle: p.hs, body: p.g === 'm' ? 'media' : 'atletica' },
        skills: [], equip: [],
        stats: {},
      };
    });
    return {
      id: opp.id, name: opp.name, arch: opp.arch, tier: opp.tier,
      color: opp.color, colorAlt: '#ffffff',
      athletes,
      chem: U.clamp(30 + opp.tier * 5 + U.randInt(rng, -5, 8), 20, 95),
      strategy: arch.strat,
      isPlayer: false,
    };
  };

  /** Dupla do jogador no formato usado pela simulação. */
  G.playerTeam = function () {
    const s = G.save;
    const uni = D.UNIFORM_COLORS.find(u => u.id === s.uniform) || D.UNIFORM_COLORS[0];
    return {
      id: 'player', name: s.teamName, arch: 'player', tier: 0,
      color: uni.c1, colorAlt: uni.c2,
      athletes: s.athletes,
      chem: s.chem,
      strategy: s.strategy,
      isPlayer: true,
      condition: s.condition,
      teamEquip: s.teamEquip,
      celebration: s.celebration,
      trailFx: s.trailFx,
    };
  };

  /* =====================================================================
     NOVO JOGO / SALVAMENTO
     ===================================================================== */

  G.newSave = function (athleteA, athleteB, teamName) {
    G.save = {
      version: 1,
      created: Date.now(),
      teamName: teamName || 'Dupla Sem Nome',
      athletes: [G.makePlayerAthlete(athleteA), G.makePlayerAthlete(athleteB)],
      money: 150,
      rep: 0,
      tp: 4,                    // pontos de treino
      chem: 25,                 // entrosamento da dupla (0-100)
      condition: 100,           // condição física (0-100)
      moral: 0,                 // bônus temporário de eventos
      strategy: 'equilibrio',
      uniform: 'verde',
      celebration: 'pulo',
      trailFx: 'nenhum',
      ownedEquip: [],           // ids comprados
      teamEquip: [],            // equipamentos slot 't' equipados
      ownedCosmetics: ['verde', 'pulo', 'nenhum'],
      titles: [],               // ids de campeonatos vencidos
      champProgress: {},        // id -> { round, alive, opponents: [oppIds] }
      history: [],              // últimas partidas
      eventsSeen: 0,
      matchesPlayed: 0,
      pendingEvent: null,
      options: { volume: 0.7, music: true, sfx: true, speed: 1, lang: 'pt' },
    };
    G.saveGame();
  };

  G.saveGame = function () {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(G.save));
    } catch (e) { /* armazenamento indisponível */ }
  };

  G.loadGame = function () {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || data.version !== 1) return false;
      G.save = data;
      return true;
    } catch (e) { return false; }
  };

  G.hasSave = function () {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
  };

  G.deleteSave = function () {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    G.save = null;
  };

  /* =====================================================================
     ATRIBUTOS EFETIVOS (base + equipamentos)
     ===================================================================== */

  G.effAttr = function (athlete, key, team) {
    let v = athlete.attrs[key];
    for (const eqId of (athlete.equip || [])) {
      const eq = D.EQUIP_BY_ID[eqId];
      if (eq && eq.bonus[key]) v += eq.bonus[key];
    }
    if (team && team.teamEquip) {
      for (const eqId of team.teamEquip) {
        const eq = D.EQUIP_BY_ID[eqId];
        if (eq && eq.bonus.all) v += eq.bonus.all;
      }
    }
    return U.clamp(v, 1, 110);
  };

  /** Média geral de um atleta (para exibição/força). */
  G.overall = function (athlete, team) {
    let sum = 0;
    for (const a of D.ATTRS) sum += G.effAttr(athlete, a.key, team);
    return Math.round(sum / D.ATTRS.length);
  };

  G.teamPower = function (team) {
    const o = (G.overall(team.athletes[0], team) + G.overall(team.athletes[1], team)) / 2;
    return Math.round(o + team.chem * 0.15);
  };

  /* =====================================================================
     TREINO
     ===================================================================== */

  /** Custo em pontos de treino para subir 1 nível de atributo. */
  G.trainCost = function (value) {
    if (value < 40) return 1;
    if (value < 55) return 2;
    if (value < 70) return 3;
    if (value < 82) return 4;
    if (value < 92) return 5;
    return 7;
  };

  /** Ganho de atributo por sessão, escalado pelo potencial. */
  G.trainGain = function (athlete) {
    return Math.max(1, Math.round(1 + (athlete.pot - 50) / 30));
  };

  G.applyTraining = function (athlete, attrKey, heavy) {
    const s = G.save;
    const cost = G.trainCost(athlete.attrs[attrKey]);
    if (s.tp < cost) return { ok: false, msg: 'Pontos de treino insuficientes.' };
    if (athlete.attrs[attrKey] >= 99) return { ok: false, msg: 'Atributo no máximo.' };
    if (heavy && s.condition < 15) return { ok: false, msg: 'A dupla está cansada demais para treino pesado.' };
    s.tp -= cost;
    let gain = G.trainGain(athlete);
    if (heavy) { gain += 1; s.condition = U.clamp(s.condition - 8, 0, 100); }
    else { s.condition = U.clamp(s.condition - 3, 0, 100); }
    athlete.attrs[attrKey] = U.clamp(athlete.attrs[attrKey] + gain, 1, 99);
    G.grantAthleteXp(athlete, 4);
    G.saveGame();
    return { ok: true, gain, cost };
  };

  G.trainChem = function (heavy) {
    const s = G.save;
    const cost = 2;
    if (s.tp < cost) return { ok: false, msg: 'Pontos de treino insuficientes.' };
    if (s.chem >= 100) return { ok: false, msg: 'Entrosamento no máximo.' };
    s.tp -= cost;
    let gain = 3;
    if (heavy) { gain = 5; s.condition = U.clamp(s.condition - 8, 0, 100); }
    else { s.condition = U.clamp(s.condition - 3, 0, 100); }
    s.chem = U.clamp(s.chem + gain, 0, 100);
    G.saveGame();
    return { ok: true, gain, cost };
  };

  G.rest = function () {
    const s = G.save;
    s.condition = U.clamp(s.condition + 25, 0, 100);
    G.saveGame();
  };

  /* =====================================================================
     XP / NÍVEL / PONTOS DE HABILIDADE
     ===================================================================== */

  G.xpForLevel = (lv) => 40 + lv * 30;

  G.grantAthleteXp = function (athlete, amount) {
    athlete.xp += amount;
    let leveled = false;
    while (athlete.xp >= G.xpForLevel(athlete.level)) {
      athlete.xp -= G.xpForLevel(athlete.level);
      athlete.level += 1;
      athlete.skillPts += 1;
      leveled = true;
    }
    return leveled;
  };

  G.unlockSkill = function (athlete, skillId) {
    if (athlete.skills.includes(skillId)) return { ok: false, msg: 'Habilidade já desbloqueada.' };
    if (athlete.skillPts < 1) return { ok: false, msg: 'Sem pontos de habilidade.' };
    athlete.skillPts -= 1;
    athlete.skills.push(skillId);
    G.saveGame();
    return { ok: true };
  };

  /* =====================================================================
     CAMPEONATOS — desbloqueio e chaveamento
     ===================================================================== */

  G.tournamentUnlocked = function (t) {
    return G.save.rep >= t.reqRep;
  };

  /** Sorteia a sequência de adversários de um campeonato. */
  G.buildBracket = function (t) {
    const rng = U.makeRng(Date.now() % 100000);
    // adversários do tier atual e vizinhos
    const pool = D.OPPONENTS.filter(o => Math.abs(o.tier - t.tier) <= 1)
      .sort((a, b) => Math.abs(a.tier - t.tier) - Math.abs(b.tier - t.tier));
    const chosen = [];
    const used = new Set();
    // rounds-1 adversários fáceis primeiro, final contra o mais forte
    while (chosen.length < t.rounds && pool.length) {
      let candidates = pool.filter(o => !used.has(o.id));
      if (!candidates.length) { used.clear(); candidates = pool.slice(); }
      // primeiras rodadas: tier <= t.tier; final: o de maior tier disponível
      const isFinal = chosen.length === t.rounds - 1;
      candidates.sort((a, b) => isFinal ? (b.tier - a.tier) : (a.tier - b.tier));
      const idx = isFinal ? 0 : U.randInt(rng, 0, Math.min(2, candidates.length - 1));
      const opp = candidates[idx];
      used.add(opp.id);
      chosen.push(opp.id);
    }
    return { round: 0, alive: true, done: false, opponents: chosen };
  };

  G.startTournament = function (t) {
    const s = G.save;
    if (s.money < t.fee) return { ok: false, msg: 'Dinheiro insuficiente para a inscrição.' };
    s.money -= t.fee;
    s.champProgress[t.id] = G.buildBracket(t);
    G.saveGame();
    return { ok: true };
  };

  /* =====================================================================
     RECOMPENSAS PÓS-PARTIDA
     ===================================================================== */

  G.matchRewards = function (won, tourn, matchStats) {
    const s = G.save;
    const tier = tourn ? tourn.tier : 3;
    let money = won ? 40 + tier * 30 : 10 + tier * 8;
    let rep = won ? Math.round((tourn ? tourn.repWin : 20) / (tourn ? tourn.rounds : 2)) : 2;
    let tp = won ? 2 + Math.floor(tier / 3) : 1;
    let chemXp = 2 + (matchStats && matchStats.sets >= 3 ? 2 : 1);

    // bônus de equipamentos de equipe
    let repMult = 1, tpMult = 1;
    for (const eqId of s.teamEquip) {
      const eq = D.EQUIP_BY_ID[eqId];
      if (eq && eq.bonus.repMult) repMult += eq.bonus.repMult;
      if (eq && eq.bonus.tpMult) tpMult += eq.bonus.tpMult;
    }
    rep = Math.round(rep * repMult);
    tp = Math.round(tp * tpMult);

    s.money += money;
    s.rep += rep;
    s.tp += tp;
    s.chem = U.clamp(s.chem + chemXp, 0, 100);
    s.condition = U.clamp(s.condition - (6 + (matchStats && matchStats.sets >= 3 ? 5 : 0)), 0, 100);
    s.moral = 0; // bônus de moral é consumido na partida
    s.matchesPlayed += 1;

    for (const a of s.athletes) {
      G.grantAthleteXp(a, won ? 14 : 7);
      if (won) a.stats.wins += 1; else a.stats.losses += 1;
    }
    G.saveGame();
    return { money, rep, tp, chemXp };
  };

  G.winTournament = function (tourn) {
    const s = G.save;
    s.money += tourn.prize;
    s.rep += Math.round(tourn.repWin * 0.5); // bônus além do acumulado por partida
    if (!s.titles.includes(tourn.id)) s.titles.push(tourn.id);
    for (const a of s.athletes) { a.stats.titles += 1; G.grantAthleteXp(a, 30); }
    // evento especial pode aparecer após título
    G.saveGame();
  };

  /* =====================================================================
     EVENTOS ESPECIAIS
     ===================================================================== */

  G.maybeTriggerEvent = function () {
    const s = G.save;
    if (s.pendingEvent) return s.pendingEvent;
    if (s.matchesPlayed < 2) return null;
    const rng = U.makeRng(Date.now() % 999983);
    if (!U.chance(rng, 0.4)) return null;
    const ev = U.pick(rng, D.EVENTS);
    s.pendingEvent = ev.id;
    G.saveGame();
    return ev.id;
  };

  G.resolveEvent = function (evId, optIdx) {
    const s = G.save;
    const ev = D.EVENTS.find(e => e.id === evId);
    if (!ev) { s.pendingEvent = null; G.saveGame(); return { msg: '' }; }
    const opt = ev.opts[optIdx];
    const fx = opt.fx || {};
    let msg = opt.msg || '';
    const rng = U.makeRng(Date.now() % 77777);

    if (fx.money) s.money = Math.max(0, s.money + fx.money);
    if (fx.rep) s.rep = Math.max(0, s.rep + fx.rep);
    if (fx.tp) s.tp = Math.max(0, s.tp + fx.tp);
    if (fx.cond) s.condition = U.clamp(s.condition + fx.cond, 0, 100);
    if (fx.moral) s.moral = fx.moral;

    if (fx.special === 'saqueTV') {
      const best = Math.max(G.effAttr(s.athletes[0], 'sak'), G.effAttr(s.athletes[1], 'sak'));
      const hits = Math.round(U.clamp(best / 10 + U.rand(rng, -1.5, 1.5), 2, 10));
      if (hits >= 7) { s.money += 250; s.rep += 10; msg = `Acertaram ${hits}/10 saques! Prêmio de R$ 250 e +10 reputação!`; }
      else { s.rep += 3; msg = `Acertaram só ${hits}/10, mas o público se divertiu. +3 reputação.`; }
    }
    if (fx.special === 'teoria') {
      const bestLei = Math.max(s.athletes[0].attrs.lei, s.athletes[1].attrs.lei);
      if (bestLei < 95 && U.chance(rng, 0.7)) {
        const a = s.athletes[0].attrs.lei <= s.athletes[1].attrs.lei ? s.athletes[0] : s.athletes[1];
        a.attrs.lei = U.clamp(a.attrs.lei + 2, 1, 99);
        msg = `Semana de vídeos e pranchetas: ${a.name} ganhou +2 de Leitura de Jogo.`;
      } else msg = 'A semana de estudo passou rápido, sem grandes ganhos.';
    }

    s.eventsSeen += 1;
    s.pendingEvent = null;
    G.saveGame();
    return { msg };
  };

  root.G = G;
})(typeof window !== 'undefined' ? window : globalThis);
