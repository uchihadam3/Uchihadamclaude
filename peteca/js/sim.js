/* =========================================================================
   PETECA LEGENDS — sim.js
   Motor de simulação de partidas automáticas.

   Regras implementadas (peteca em duplas):
   - 1 toque por lado antes de devolver por cima da rede.
   - Pontuação direta (todo rali vale ponto).
   - Melhor de 3 sets: sets 1-2 até 21 (cap 25), set 3 até 15 (cap 18),
     sempre com 2 pontos de diferença antes do cap.
   - Saque de quem venceu o último ponto, alternando o sacador na dupla.

   O simulador é independente de DOM: gera cada rali como uma lista de
   "hits" que o animador (match.js) reproduz visualmente.

   Coordenadas da quadra:
   - x: 0..10 (esquerda→direita, visão da transmissão)
   - y: -7..7 (negativo = lado 0/inferior; positivo = lado 1/superior; rede em 0)
   ========================================================================= */
(function (root) {
  'use strict';

  const { U, D } = root;
  const Sim = {};

  const COURT_W = 10, COURT_D = 7;

  /* =====================================================================
     PREPARAÇÃO DA PARTIDA
     ===================================================================== */

  /**
   * Cria o estado de uma partida.
   * teams: [teamA, teamB] no formato de G.playerTeam()/G.makeOpponentTeam().
   * opts: { seed, bestOf }
   */
  Sim.newMatch = function (teams, opts) {
    opts = opts || {};
    const rng = U.makeRng(opts.seed || ((Date.now() & 0xffff) * 31 + 7));
    const m = {
      rng,
      teams,
      // pontuação
      score: [0, 0],
      sets: [0, 0],
      setScores: [],         // [[21,15], ...]
      setIndex: 0,
      servingSide: U.chance(rng, 0.5) ? 0 : 1,
      servingAth: [0, 0],    // índice do sacador atual em cada dupla
      finished: false,
      winnerSide: -1,
      // condição em tempo real
      stamina: [[100, 100], [100, 100]],
      // posições atuais (para o animador e para decisões de cobertura)
      pos: null,
      rallyCount: 0,
      // estatísticas
      stats: makeStats(),
      // estratégia corrente por lado (pode mudar entre sets)
      strategy: [teams[0].strategy || 'equilibrio', teams[1].strategy || 'equilibrio'],
    };
    // condição física da dupla do jogador limita a energia inicial
    for (let s = 0; s < 2; s++) {
      const cond = teams[s].isPlayer ? (teams[s].condition ?? 100) : 100;
      const start = 70 + cond * 0.3; // 100 cond → 100; 0 cond → 70
      m.stamina[s] = [start, start];
    }
    m.pos = defaultPositions();
    return m;
  };

  function makeStats() {
    const side = () => ({
      points: 0, errors: 0, serveGood: 0, serveFault: 0, aces: 0,
      winners: 0, drops: 0, saves: 0, tiredLost: 0, pressureErr: 0,
      longRallies: 0,
    });
    const ath = () => ({ won: 0, errors: 0, winners: 0, saves: 0, aces: 0 });
    return { side: [side(), side()], ath: [[ath(), ath()], [ath(), ath()]], longestRally: 0 };
  }

  function defaultPositions() {
    // cada dupla: atleta 0 à esquerda, atleta 1 à direita, meio de quadra
    return [
      [{ x: 3, y: -3.6 }, { x: 7, y: -3.6 }],
      [{ x: 3, y: 3.6 }, { x: 7, y: 3.6 }],
    ];
  }

  /* =====================================================================
     ATRIBUTOS EFETIVOS DENTRO DA PARTIDA
     ===================================================================== */

  function eff(m, side, ai, key) {
    const team = m.teams[side];
    const ath = team.athletes[ai];
    let v = ath.attrs[key];
    // equipamentos do atleta
    for (const eqId of (ath.equip || [])) {
      const eq = D.EQUIP_BY_ID[eqId];
      if (eq && eq.bonus[key]) v += eq.bonus[key];
    }
    // bônus geral da dupla
    if (team.teamEquip) {
      for (const eqId of team.teamEquip) {
        const eq = D.EQUIP_BY_ID[eqId];
        if (eq && eq.bonus.all) v += eq.bonus.all;
      }
    }
    // moral (evento) para a dupla do jogador
    if (team.isPlayer && team.moralBoost) v += team.moralBoost;
    // fadiga: velocidade, precisão, defesa, reflexo e controle sofrem
    const fatKeys = { vel: 1, pre: 0.9, def: 0.9, ref: 0.8, ctl: 0.7, atk: 0.5, sak: 0.5 };
    if (fatKeys[key]) {
      const st = m.stamina[side][ai];
      let fatFactor = (100 - st) / 100 * fatKeys[key];
      // joelheira reduz impacto do cansaço
      for (const eqId of (ath.equip || [])) {
        const eq = D.EQUIP_BY_ID[eqId];
        if (eq && eq.bonus.fatMult) fatFactor *= (1 + eq.bonus.fatMult);
      }
      v *= (1 - 0.45 * fatFactor);
    }
    return U.clamp(v, 1, 115);
  }

  function hasSkill(m, side, ai, skillId) {
    return (m.teams[side].athletes[ai].skills || []).includes(skillId);
  }

  /** Penalidade/bonus de pressão. Devolve multiplicador de erro (>1 = mais erro). */
  function pressureFactor(m, side, ai) {
    const info = Sim.pointSituation(m);
    if (!info.setPoint && !info.matchPoint) return 1;
    let fri = eff(m, side, ai, 'fri');
    if (hasSkill(m, side, ai, 'pontoDecisivo')) fri += 10;
    // frieza 50 = neutro; 90 joga melhor; 20 sofre muito
    let f = 1 + (50 - fri) / 100; // 0.35 .. 1.3
    if (hasSkill(m, side, ai, 'cabecaFria') && f > 1) f = 1 + (f - 1) * 0.5;
    return U.clamp(f, 0.6, 1.45);
  }

  /* =====================================================================
     SITUAÇÃO DO PLACAR (set point / match point / alvos de set)
     ===================================================================== */

  Sim.setTarget = function (m) {
    return m.setIndex < 2 ? { to: 21, cap: 25 } : { to: 15, cap: 18 };
  };

  Sim.pointSituation = function (m) {
    const { to, cap } = Sim.setTarget(m);
    const [a, b] = m.score;
    const check = (x, y) => (x >= to - 1 && x - y >= 1) || (x === cap - 1);
    const setPtFor = check(a, b) ? 0 : check(b, a) ? 1 : -1;
    let matchPt = false;
    if (setPtFor >= 0 && m.sets[setPtFor] === 1) matchPt = true;
    return { setPoint: setPtFor >= 0, setPointFor: setPtFor, matchPoint: matchPt };
  };

  function setWon(m) {
    const { to, cap } = Sim.setTarget(m);
    const [a, b] = m.score;
    if ((a >= to && a - b >= 2) || a >= cap) return 0;
    if ((b >= to && b - a >= 2) || b >= cap) return 1;
    return -1;
  }

  /* =====================================================================
     ESTRATÉGIA / MODIFICADORES
     ===================================================================== */

  function mods(m, side) {
    const st = D.STRAT_BY_ID[m.strategy[side]] || D.STRAT_BY_ID.equilibrio;
    return st.mods;
  }

  /** Adversário de IA pode ajustar a estratégia entre sets. */
  Sim.aiAdjustStrategy = function (m, side) {
    const stats = m.stats.side[side];
    const other = m.stats.side[1 - side];
    if (m.sets[1 - side] > m.sets[side]) {
      // perdendo: se errou demais, joga seguro; senão, aumenta risco
      if (stats.errors > other.points * 0.45) m.strategy[side] = 'seguro';
      else m.strategy[side] = 'ataque';
    }
  };

  /* =====================================================================
     GERAÇÃO DE UM RALI
     ===================================================================== */

  const SHOT_DEFS = {
    serve_safe:   { risk: 0.05, power: 0.35, name: 'saque seguro' },
    serve_strong: { risk: 0.16, power: 0.85, name: 'saque forte' },
    serve_placed: { risk: 0.10, power: 0.5,  name: 'saque colocado' },
    return_safe:  { risk: 0.04, power: 0.35, name: 'devolução segura' },
    smash:        { risk: 0.15, power: 0.95, name: 'ataque forte' },
    drop:         { risk: 0.11, power: 0.25, name: 'bola curta' },
    deep:         { risk: 0.08, power: 0.6,  name: 'bola funda' },
    cross:        { risk: 0.09, power: 0.55, name: 'cruzada' },
    line:         { risk: 0.09, power: 0.6,  name: 'paralela' },
  };
  Sim.SHOT_DEFS = SHOT_DEFS;

  /**
   * Simula um ponto completo. Retorna o objeto rally e atualiza o estado.
   */
  Sim.playPoint = function (m) {
    if (m.finished) return null;
    const rng = m.rng;
    const rally = { hits: [], winnerSide: -1, reason: '', commentKey: null, notes: [] };
    const situation = Sim.pointSituation(m);
    m.rallyCount++;

    let side = m.servingSide;
    const serverIdx = m.servingAth[side];

    // reposiciona todo mundo no início do ponto
    m.pos = defaultPositions();
    // sacador vai para o fundo
    const sx = serverIdx === 0 ? 3 : 7;
    m.pos[side][serverIdx] = { x: sx, y: side === 0 ? -6.2 : 6.2 };

    /* ---------- SAQUE ---------- */
    const serve = decideServe(m, side, serverIdx, situation);
    rally.hits.push(serve.hit);
    drainStamina(m, side, serverIdx, 1.2 + serve.hit.power * 1.5);

    if (serve.hit.result === 'error_net' || serve.hit.result === 'error_out') {
      endPoint(m, rally, 1 - side, 'serve_fault', serve.commentKey || 'serveFault');
      m.stats.side[side].serveFault++;
      m.stats.side[side].errors++;
      m.stats.ath[side][serverIdx].errors++;
      if (serve.pressure) m.stats.side[side].pressureErr++;
      return rally;
    }
    m.stats.side[side].serveGood++;

    let incoming = serve.hit; // último golpe que cruzou a rede
    side = 1 - side;          // lado que recebe

    /* ---------- TROCA DE BOLAS ---------- */
    let touches = 1;
    const MAX_TOUCHES = 26;
    while (touches < MAX_TOUCHES) {
      // quem tenta receber?
      const rec = chooseReceiver(m, side, incoming);
      const reach = tryReach(m, side, rec, incoming, rally);

      if (!reach.ok) {
        // ponto para quem bateu
        const hitterSide = 1 - side;
        const lastHit = incoming;
        lastHit.land = lastHit.to;
        lastHit.inCourt = true;
        classifyWinner(m, rally, hitterSide, lastHit, reach, touches, situation);
        return rally;
      }

      // recebeu: atleta corre até o ponto de interceptação
      m.pos[side][rec] = { x: incoming.to.x, y: incoming.to.y };
      drainStamina(m, side, rec, reach.runCost);
      if (reach.great) {
        m.stats.side[side].saves++;
        m.stats.ath[side][rec].saves++;
        rally.notes.push({ key: reach.chem ? 'chemSave' : 'greatDefense', side, ath: rec, touch: touches });
      }

      // escolhe e executa a devolução
      const shot = decideShot(m, side, rec, incoming, touches, situation);
      rally.hits.push(shot.hit);
      drainStamina(m, side, rec, 0.8 + shot.hit.power * 1.8);

      if (shot.hit.result === 'error_net' || shot.hit.result === 'error_out') {
        m.stats.side[side].errors++;
        m.stats.ath[side][rec].errors++;
        if (shot.pressure) { m.stats.side[side].pressureErr++; }
        const ck = shot.hit.result === 'error_net' ? 'netFault'
          : shot.pressure ? 'pressureError'
          : shot.hit.type === 'smash' ? 'smashOut' : 'serveFault';
        endPoint(m, rally, 1 - side, 'error', shot.pressure ? 'pressureError' : ck);
        return rally;
      }

      incoming = shot.hit;
      side = 1 - side;
      touches++;
    }

    // rali gigantesco: decide por fôlego
    const tiredSide = m.stamina[0][0] + m.stamina[0][1] < m.stamina[1][0] + m.stamina[1][1] ? 0 : 1;
    endPoint(m, rally, 1 - tiredSide, 'exhaustion', 'tiredPoint');
    m.stats.side[tiredSide].tiredLost++;
    return rally;
  };

  /* ---------- decisões de saque ---------- */

  function decideServe(m, side, ai, situation) {
    const rng = m.rng;
    const md = mods(m, side);
    const sak = eff(m, side, ai, 'sak');
    const pre = eff(m, side, ai, 'pre');

    // pesos por estratégia
    const wStrong = 1 + (md.serveRisk || 0) * 2 + (sak - 50) / 60;
    const wPlaced = 1 + (md.ctlBias || 0) + (eff(m, side, ai, 'lei') - 50) / 80;
    const wSafe = 1.3 - (md.serveRisk || 0);
    const choice = U.weightedPick(rng, [
      { w: Math.max(0.1, wSafe), t: 'serve_safe' },
      { w: Math.max(0.1, wStrong), t: 'serve_strong' },
      { w: Math.max(0.1, wPlaced), t: 'serve_placed' },
    ]).t;

    const def = SHOT_DEFS[choice];
    const pf = pressureFactor(m, side, ai);
    let errChance = def.risk * (1 + (md.risk || 0) * 0.5) * pf;
    errChance *= U.clamp(1.5 - sak / 90, 0.35, 1.6);
    if (hasSkill(m, side, ai, 'saqueSeguro')) errChance *= 0.7;
    errChance = U.clamp(errChance, 0.01, 0.5);

    const target = serveTarget(m, side, ai, choice);
    const from = { ...m.pos[side][ai] };
    const isErr = U.chance(rng, errChance);
    let result = 'in_play';
    if (isErr) result = U.chance(rng, 0.45) ? 'error_net' : 'error_out';

    const hit = makeHit(side, ai, choice, from, target, def.power, result);
    if (result === 'error_net') { hit.land = { x: target.x, y: side === 0 ? -0.3 : 0.3 }; hit.inCourt = false; }
    if (result === 'error_out') { hit.land = pushOut(target, side); hit.inCourt = false; }
    return { hit, commentKey: isErr ? 'serveFault' : null, pressure: isErr && pf > 1.12 };
  }

  function serveTarget(m, side, ai, type) {
    const rng = m.rng;
    const md = mods(m, side);
    const oppSide = 1 - side;
    let tx, ty;
    if (type === 'serve_placed' || md.weakTarget || md.tireTarget) {
      const t = pickTargetAthlete(m, side, oppSide);
      const p = m.pos[oppSide][t];
      // mira longe do alvo mas na zona dele (forçando corrida) ou em cima do fraco
      tx = U.clamp(p.x + U.rand(rng, -2.5, 2.5), 1, 9);
      ty = U.rand(rng, 2.5, 6.2);
    } else if (type === 'serve_strong') {
      tx = U.rand(rng, 1.2, 8.8);
      ty = U.rand(rng, 3.5, 6.4);
    } else {
      tx = U.rand(rng, 2.5, 7.5);
      ty = U.rand(rng, 3, 5.5);
    }
    return { x: tx, y: side === 0 ? ty : -ty };
  }

  /* ---------- escolha de quem recebe ---------- */

  function chooseReceiver(m, side, incoming) {
    const team = m.teams[side];
    const t = incoming.to;
    const d0 = U.dist(m.pos[side][0].x, m.pos[side][0].y, t.x, t.y);
    const d1 = U.dist(m.pos[side][1].x, m.pos[side][1].y, t.x, t.y);
    // leitura de jogo ajuda a "escolher certo" quando a bola cai no meio
    const gap = Math.abs(d0 - d1);
    if (gap > 1.6) return d0 < d1 ? 0 : 1;
    // bola no meio: entrosamento decide organização
    const chem = team.chem || 40;
    const lei0 = eff(m, side, 0, 'lei'), lei1 = eff(m, side, 1, 'lei');
    if (U.chance(m.rng, chem / 130)) {
      // dupla organizada: vai o de melhor leitura/condição
      const s0 = lei0 + m.stamina[side][0] * 0.3;
      const s1 = lei1 + m.stamina[side][1] * 0.3;
      return s0 >= s1 ? 0 : 1;
    }
    return d0 <= d1 ? 0 : 1;
  }

  /* ---------- tentativa de alcançar a peteca ---------- */

  function tryReach(m, side, ai, incoming, rally) {
    const rng = m.rng;
    const md = mods(m, side);
    const p = m.pos[side][ai];
    const t = incoming.to;
    const dist = U.dist(p.x, p.y, t.x, t.y);
    const power = incoming.power;

    const vel = eff(m, side, ai, 'vel');
    const ref = eff(m, side, ai, 'ref');
    const def = eff(m, side, ai, 'def');
    let lei = eff(m, side, ai, 'lei');
    if (hasSkill(m, side, ai, 'olhoQueda')) lei += 6;

    // tempo disponível ~ inverso da potência; distância exige velocidade
    const speedNeed = dist * (0.55 + power * 0.75);        // 0..~10
    const capability = vel / 12 + lei / 25;                 // ~3..9
    let margin = capability - speedNeed;                    // >0 = chega fácil

    // ataques rápidos testam reflexo/defesa
    if (power > 0.75) margin += (ref - 55) / 30 + (def - 55) / 35 - 0.35;
    if (md.defBoost) margin += md.defBoost * 3;

    // entrosamento cobre buracos (bola entre os dois)
    const chem = m.teams[side].chem || 40;
    const midX = Math.abs(t.x - 5) < 2.2;
    let chemHelp = false;
    if (midX && dist > 2) {
      let cover = chem / 100 * 0.9;
      if (hasSkill(m, side, 0, 'duplaAfinada') || hasSkill(m, side, 1, 'duplaAfinada')) {
        if (chem >= 60) cover += 0.3;
      }
      if (U.chance(rng, cover * 0.5)) { margin += 1.1; chemHelp = true; }
    }

    // bônus de rali longo
    const touches = rally.hits.length;
    if (touches >= 6 && (hasSkill(m, side, ai, 'ritmoJogo'))) margin += 0.5;

    // dificuldade extra imposta pelo golpe (drop bem colocado etc.)
    margin -= (incoming.difficulty || 0);

    const reachProb = U.clamp(0.5 + margin * 0.22, 0.03, 0.97);
    let ok = U.chance(rng, reachProb);
    let great = false;

    if (!ok && hasSkill(m, side, ai, 'defMilagrosa') && U.chance(rng, 0.08)) {
      ok = true; great = true;
    }
    if (ok && reachProb < 0.42) great = true;

    return { ok, great, chem: chemHelp, runCost: dist * 0.9 + power * 1.2, margin };
  }

  /* ---------- escolha do golpe de devolução ---------- */

  function decideShot(m, side, ai, incoming, touches, situation) {
    const rng = m.rng;
    const md = mods(m, side);
    const atk = eff(m, side, ai, 'atk');
    const ctl = eff(m, side, ai, 'ctl');
    const pre = eff(m, side, ai, 'pre');
    const lei = eff(m, side, ai, 'lei');
    const defensivePos = (incoming.power > 0.75); // acabou de defender pancada

    // pesos das opções
    let wSmash = 0.6 + (md.atkBias || 0) * 1.6 + (atk - 50) / 45;
    let wDrop = 0.5 + (md.ctlBias || 0) * 1.4 + (ctl - 50) / 50;
    let wDeep = 0.7 + (md.rally || 0) * 0.8 + (lei - 50) / 70;
    let wCross = 0.55 + (ctl - 50) / 70;
    let wLine = 0.5 + (pre - 50) / 70;
    let wSafe = 0.8 + (md.rally || 0) * 1.4 - (md.risk || 0);
    if (defensivePos) { wSmash *= 0.3; wDrop *= 0.6; wSafe *= 1.8; wDeep *= 1.3; }
    if (touches <= 2) wSmash *= 0.75; // não esmaga logo a recepção do saque

    const choice = U.weightedPick(rng, [
      { w: Math.max(0.05, wSmash), t: 'smash' },
      { w: Math.max(0.05, wDrop), t: 'drop' },
      { w: Math.max(0.05, wDeep), t: 'deep' },
      { w: Math.max(0.05, wCross), t: 'cross' },
      { w: Math.max(0.05, wLine), t: 'line' },
      { w: Math.max(0.05, wSafe), t: 'return_safe' },
    ]).t;

    const def = SHOT_DEFS[choice];
    const pf = pressureFactor(m, side, ai);

    // erro do golpe
    const skillAttr = (choice === 'smash') ? (atk * 0.4 + pre * 0.6)
      : (choice === 'drop' || choice === 'cross') ? (ctl * 0.6 + pre * 0.4)
      : (choice === 'return_safe') ? (pre * 0.5 + ctl * 0.5)
      : (pre * 0.55 + ctl * 0.45);
    let errChance = def.risk * (1 + (md.risk || 0) * 0.6) * pf;
    errChance *= U.clamp(1.55 - skillAttr / 85, 0.3, 1.7);
    if (defensivePos) errChance *= 1.35;
    if (touches >= 6 && hasSkill(m, side, ai, 'ritmoJogo')) errChance *= 0.92;
    errChance = U.clamp(errChance, 0.01, 0.55);

    // alvo
    const target = shotTarget(m, side, ai, choice);
    const from = { ...m.pos[side][ai] };

    const isErr = U.chance(rng, errChance);
    let result = 'in_play';
    if (isErr) result = (choice === 'drop' || U.chance(rng, 0.4)) ? 'error_net' : 'error_out';

    let power = def.power;
    if (choice === 'smash') {
      power = U.clamp(0.7 + atk / 250, 0.7, 1.0);
      if (hasSkill(m, side, ai, 'bracoPesado')) power = U.clamp(power + 0.06, 0, 1.05);
    }

    const hit = makeHit(side, ai, choice, from, target, power, result);

    // dificuldade imposta ao adversário
    let difficulty = 0;
    if (choice === 'smash') difficulty = 0.5 + (atk - 50) / 80;
    if (choice === 'drop') {
      difficulty = 0.4 + (ctl - 50) / 90;
      if (hasSkill(m, side, ai, 'curtaMortal')) difficulty += 0.25;
    }
    if (choice === 'deep') {
      difficulty = 0.25 + (lei - 50) / 120;
      if (hasSkill(m, side, ai, 'fundoQuadra')) difficulty += 0.2;
    }
    if (choice === 'cross' || choice === 'line') difficulty = 0.3 + (pre - 50) / 100;
    hit.difficulty = Math.max(0, difficulty);

    if (result === 'error_net') { hit.land = { x: target.x, y: side === 0 ? -0.3 : 0.3 }; hit.inCourt = false; }
    if (result === 'error_out') { hit.land = pushOut(target, side); hit.inCourt = false; }

    return { hit, pressure: isErr && pf > 1.12 };
  }

  function shotTarget(m, side, ai, choice) {
    const rng = m.rng;
    const md = mods(m, side);
    const oppSide = 1 - side;
    let tx, ty;

    // alvo básico por tipo de golpe
    switch (choice) {
      case 'drop': ty = U.rand(rng, 0.7, 1.8); tx = U.rand(rng, 2, 8); break;
      case 'deep': ty = U.rand(rng, 5.4, 6.6); tx = U.rand(rng, 1.5, 8.5); break;
      case 'smash': ty = U.rand(rng, 2.5, 5.5); tx = U.rand(rng, 1.2, 8.8); break;
      case 'cross': {
        const fromLeft = m.pos[side][ai].x < 5;
        tx = fromLeft ? U.rand(rng, 6.8, 9.2) : U.rand(rng, 0.8, 3.2);
        ty = U.rand(rng, 2.5, 6);
        break;
      }
      case 'line': {
        tx = m.pos[side][ai].x < 5 ? U.rand(rng, 0.8, 2.5) : U.rand(rng, 7.5, 9.2);
        ty = U.rand(rng, 3, 6.2);
        break;
      }
      default: ty = U.rand(rng, 2.8, 5); tx = U.rand(rng, 3, 7);
    }

    // mirar espaço vazio / jogador alvo
    const lei = eff(m, side, ai, 'lei');
    if (U.chance(rng, U.clamp(lei / 140, 0.15, 0.7))) {
      if (md.weakTarget || md.tireTarget) {
        const t = pickTargetAthlete(m, side, oppSide);
        const p = m.pos[oppSide][t];
        tx = U.clamp(p.x + U.rand(rng, -3.2, 3.2), 0.8, 9.2);
      } else {
        // longe do adversário mais próximo do alvo atual
        const p0 = m.pos[oppSide][0], p1 = m.pos[oppSide][1];
        const mid = (p0.x + p1.x) / 2;
        tx = mid < 5 ? U.rand(rng, 6.5, 9.2) : U.rand(rng, 0.8, 3.5);
        if (Math.abs(p0.x - p1.x) > 5) tx = U.clamp(mid + U.rand(rng, -1, 1), 0.8, 9.2);
      }
    }
    return { x: tx, y: side === 0 ? ty : -ty };
  }

  /** Escolhe o adversário alvo (cansado ou fraco). */
  function pickTargetAthlete(m, side, oppSide) {
    const md = mods(m, side);
    if (md.tireTarget) {
      return m.stamina[oppSide][0] <= m.stamina[oppSide][1] ? 0 : 1;
    }
    // mais fraco em defesa+reflexo+velocidade
    const s0 = eff(m, oppSide, 0, 'def') + eff(m, oppSide, 0, 'ref') + eff(m, oppSide, 0, 'vel');
    const s1 = eff(m, oppSide, 1, 'def') + eff(m, oppSide, 1, 'ref') + eff(m, oppSide, 1, 'vel');
    return s0 <= s1 ? 0 : 1;
  }

  /* ---------- utilidades do rali ---------- */

  function makeHit(side, ai, type, from, to, power, result) {
    // tempo de voo p/ animação: distância / velocidade do golpe
    const dist = U.dist(from.x, from.y, to.x, to.y);
    const speed = 6 + power * 16; // unidades/s
    const t = U.clamp(dist / speed + (power < 0.4 ? 0.25 : 0.05), 0.32, 1.5);
    return {
      side, ath: ai, type,
      from: { x: from.x, y: from.y },
      to: { x: to.x, y: to.y },
      power, result, t,
      land: null, inCourt: null, difficulty: 0,
    };
  }

  function pushOut(target, side) {
    // empurra o alvo para fora da quadra (erro "out")
    const dirY = side === 0 ? 1 : -1;
    let x = target.x, y = target.y;
    if (Math.abs(y) > 5.4) y = dirY * U.clamp(Math.abs(y) + 1.6, 7.4, 8.6);
    else if (x < 2) x = -0.9; else if (x > 8) x = 10.9;
    else y = dirY * 7.8;
    return { x, y };
  }

  function drainStamina(m, side, ai, amount) {
    const fol = eff(m, side, ai, 'fol');
    let drain = amount * (1.45 - fol / 100);
    // Energia Final: menos queda no 3º set
    if (m.setIndex === 2 && hasSkill(m, side, ai, 'energiaFinal')) drain *= 0.6;
    m.stamina[side][ai] = U.clamp(m.stamina[side][ai] - drain * 0.55, 5, 100);
  }

  function classifyWinner(m, rally, hitterSide, lastHit, reach, touches, situation) {
    const hi = lastHit.ath;
    let reason = 'winner', ck = 'smashWin';
    if (lastHit.type.startsWith('serve')) {
      reason = 'ace'; ck = 'servePerfect';
      m.stats.side[hitterSide].aces++;
      m.stats.ath[hitterSide][hi].aces++;
    } else if (lastHit.type === 'smash') {
      reason = 'winner'; ck = 'smashWin';
      m.stats.side[hitterSide].winners++;
      m.stats.ath[hitterSide][hi].winners++;
    } else if (lastHit.type === 'drop') {
      reason = 'winner'; ck = 'dropWin';
      m.stats.side[hitterSide].drops++;
      m.stats.ath[hitterSide][hi].winners++;
    } else {
      reason = 'winner';
      ck = (reach && reach.margin < -1.2) ? 'readPlay' : 'dropWin';
      m.stats.side[hitterSide].winners++;
      m.stats.ath[hitterSide][hi].winners++;
    }
    // cansaço decidiu?
    const loserSide = 1 - hitterSide;
    const avgSt = (m.stamina[loserSide][0] + m.stamina[loserSide][1]) / 2;
    if (avgSt < 35 && touches > 4) { ck = 'tiredPoint'; m.stats.side[loserSide].tiredLost++; }
    if (touches >= 8) { ck = 'longRally'; m.stats.side[hitterSide].longRallies++; }
    endPoint(m, rally, hitterSide, reason, ck);
  }

  function endPoint(m, rally, winnerSide, reason, commentKey) {
    rally.winnerSide = winnerSide;
    rally.reason = reason;
    rally.commentKey = commentKey;
    rally.touches = rally.hits.length;

    m.stats.side[winnerSide].points++;
    if (rally.touches > m.stats.longestRally) m.stats.longestRally = rally.touches;

    // crédito do ponto ao último atleta do lado vencedor que bateu
    for (let i = rally.hits.length - 1; i >= 0; i--) {
      if (rally.hits[i].side === winnerSide) { m.stats.ath[winnerSide][rally.hits[i].ath].won++; break; }
    }

    m.score[winnerSide]++;

    // saque: quem vence saca; alterna o sacador quando recupera o saque
    if (m.servingSide !== winnerSide) {
      m.servingAth[winnerSide] = 1 - m.servingAth[winnerSide];
      m.servingSide = winnerSide;
    }

    // recuperação leve entre pontos
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      m.stamina[s][a] = U.clamp(m.stamina[s][a] + 1.6, 0, 100);
    }

    // fim de set?
    const sw = setWon(m);
    rally.scoreAfter = [m.score[0], m.score[1]];
    rally.situationAfter = Sim.pointSituation(m);
    if (sw >= 0) {
      m.sets[sw]++;
      m.setScores.push([m.score[0], m.score[1]]);
      rally.setEnded = true;
      rally.setWinner = sw;
      m.score = [0, 0];
      m.setIndex++;
      // recuperação entre sets
      for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
        m.stamina[s][a] = U.clamp(m.stamina[s][a] + 18, 0, 100);
      }
      if (m.sets[sw] >= 2) {
        m.finished = true;
        m.winnerSide = sw;
        rally.matchEnded = true;
      } else {
        // IA ajusta estratégia
        for (let s = 0; s < 2; s++) if (!m.teams[s].isPlayer) Sim.aiAdjustStrategy(m, s);
      }
    }
    return rally;
  }

  /* =====================================================================
     PARTIDA INSTANTÂNEA (sem animação)
     ===================================================================== */

  Sim.simulateFullMatch = function (m) {
    let guard = 0;
    while (!m.finished && guard++ < 400) Sim.playPoint(m);
    return m;
  };

  /* =====================================================================
     ESTIMATIVA DE CHANCE DE VITÓRIA (pré-jogo)
     ===================================================================== */

  Sim.estimateWinChance = function (teamA, teamB, samples) {
    samples = samples || 24;
    let wins = 0;
    for (let i = 0; i < samples; i++) {
      const m = Sim.newMatch([teamA, teamB], { seed: 1000 + i * 37 });
      Sim.simulateFullMatch(m);
      if (m.winnerSide === 0) wins++;
    }
    return wins / samples;
  };

  /* =====================================================================
     NOTAS DOS ATLETAS (pós-partida)
     ===================================================================== */

  Sim.athleteRating = function (m, side, ai) {
    const st = m.stats.ath[side][ai];
    const raw = st.won * 1.2 + st.winners * 1.4 + st.aces * 1.6 + st.saves * 1.2 - st.errors * 1.3;
    const won = m.winnerSide === side ? 0.8 : 0;
    return U.clamp(5.6 + raw * 0.07 + won, 3, 10).toFixed(1);
  };

  Sim.bestAthlete = function (m) {
    let best = { side: 0, ai: 0, rating: -1 };
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      const r = parseFloat(Sim.athleteRating(m, s, a));
      if (r > best.rating) best = { side: s, ai: a, rating: r };
    }
    return best;
  };

  root.Sim = Sim;
})(typeof window !== 'undefined' ? window : globalThis);
