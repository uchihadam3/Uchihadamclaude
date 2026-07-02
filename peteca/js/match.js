/* =========================================================================
   PETECA LEGENDS — match.js
   Renderização 2.5D da quadra + animação da partida automática.
   Consome os ralis gerados por Sim e os transforma em uma "transmissão":
   atletas correndo, peteca voando com sombra e rotação, rede balançando,
   torcida, placar, mensagens e efeitos.
   ========================================================================= */
(function (root) {
  'use strict';

  const { U, D, Sim, Sprites } = root;
  const MV = {};

  /* ---------- projeção 2.5D ---------- */
  const VIEW_W = 480, VIEW_H = 300;
  const CX = 240, NEAR_Y = 262, FAR_Y = 102, HALF_NEAR = 168, HALF_FAR = 100;

  function project(x, y, z) {
    const t = (y + 7) / 14;               // 0 = perto (baixo), 1 = longe (topo)
    const sy = U.lerp(NEAR_Y, FAR_Y, Math.pow(t, 0.94));
    const half = U.lerp(HALF_NEAR, HALF_FAR, t);
    const sx = CX + ((x - 5) / 5) * half * 0.5 * 2 * 0.5; // (x-5)/5 ∈ [-1,1]
    const zScale = U.lerp(15, 9.5, t);
    return { x: CX + ((x - 5) / 5) * half, y: sy - (z || 0) * zScale, gy: sy, t, zScale };
  }

  /* ---------- temas de quadra ---------- */
  const THEMES = {
    praca:    { sky: '#8ecae6', wall: '#74a892', floor: '#c98d5a', floorAlt: '#bd8151', court: '#d99e6a', line: '#f4e9d8', crowd: 0.15, banners: false, trees: true,  name: 'Praça' },
    bairro:   { sky: '#87b8d4', wall: '#9a8f84', floor: '#7f8c8d', floorAlt: '#758283', court: '#4a7a6a', line: '#e8e6df', crowd: 0.3,  banners: false, trees: false, name: 'Bairro' },
    gymSmall: { sky: '#3d4451', wall: '#5b6472', floor: '#b98a4f', floorAlt: '#b08349', court: '#c69a5c', line: '#f2ead9', crowd: 0.5,  banners: false, trees: false, name: 'Ginásio' },
    gymBig:   { sky: '#2b3140', wall: '#454f63', floor: '#a5793f', floorAlt: '#9c7139', court: '#3e6b8f', line: '#eef0f2', crowd: 0.7,  banners: true,  trees: false, name: 'Ginásio Grande' },
    arena:    { sky: '#1c2233', wall: '#333d55', floor: '#365a80', floorAlt: '#31547a', court: '#2e6da4', line: '#f5f7fa', crowd: 0.88, banners: true,  trees: false, name: 'Arena' },
    world:    { sky: '#161226', wall: '#2c2450', floor: '#4a2d66', floorAlt: '#432a5e', court: '#5c2f74', line: '#ffe9a8', crowd: 1,    banners: true,  trees: false, name: 'Arena Mundial' },
  };
  MV.THEMES = THEMES;

  /* ---------- estado da visualização ---------- */
  let V = null;

  /**
   * Inicia uma partida animada.
   * cfg: { teams:[a,b], theme, title, subtitle, onFinish(m),
   *        playerSide (default 0), instant, speed }
   */
  MV.start = function (cfg) {
    const container = document.getElementById('matchCanvasWrap');
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = VIEW_W; canvas.height = VIEW_H;
    canvas.id = 'matchCanvas';
    container.appendChild(canvas);

    const m = Sim.newMatch(cfg.teams, { seed: cfg.seed });
    // moral (evento) vira bônus temporário
    if (cfg.teams[0].isPlayer && root.G && root.G.save && root.G.save.moral) {
      cfg.teams[0].moralBoost = root.G.save.moral;
    }

    V = {
      cfg, m,
      canvas, ctx: canvas.getContext('2d'),
      theme: THEMES[cfg.theme] || THEMES.gymSmall,
      speed: cfg.speed || 1,
      paused: false,
      phase: 'intro', phaseT: 0,
      rally: null, hitIdx: 0, hitT: 0,
      shuttle: null,     // { x,y,z, visible, spin }
      netShake: 0,
      msg: '', msgT: 0, msgQueue: [],
      landLabel: null,   // { text, x, y, t }
      ath: initAthletes(m),
      crowdExcite: 0, crowdSeed: Math.random() * 1000 | 0,
      confetti: [],
      lastTime: 0, raf: 0,
      finished: false,
      skipRequested: false,
      statsOpen: false,
      pointFlash: 0,
    };

    buildHud();
    updateHud();
    showBanner(cfg.title || 'PARTIDA', (cfg.teams[0].name + '  vs  ' + cfg.teams[1].name), 2.2);

    if (root.Audio2) {
      root.Audio2.startCrowd(V.theme.crowd);
      root.Audio2.playMusic(V.theme.crowd >= 0.85 ? 'final' : 'match');
    }

    V.lastTime = performance.now();
    V.raf = requestAnimationFrame(loop);
  };

  MV.stop = function () {
    if (!V) return;
    cancelAnimationFrame(V.raf);
    if (root.Audio2) { root.Audio2.stopCrowd(); }
    V = null;
  };

  function initAthletes(m) {
    const out = [[], []];
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      const p = m.pos[s][a];
      out[s][a] = { x: p.x, y: p.y, tx: p.x, ty: p.y, pose: 'idle', poseT: 0, frame: 0, frameT: 0, moveSpd: 6 };
    }
    return out;
  }

  /* =====================================================================
     HUD (DOM sobre o canvas)
     ===================================================================== */
  function buildHud() {
    const hud = document.getElementById('matchHud');
    const t0 = V.m.teams[0], t1 = V.m.teams[1];
    hud.innerHTML = `
      <div class="mh-score">
        <div class="mh-team mh-t0">
          <span class="mh-dot" style="background:${t0.color}"></span>
          <span class="mh-name">${esc(t0.name)}</span>
          <span class="mh-sets" id="mhSets0">0</span>
        </div>
        <div class="mh-points"><span id="mhPts0">0</span><b>×</b><span id="mhPts1">0</span></div>
        <div class="mh-team mh-t1">
          <span class="mh-sets" id="mhSets1">0</span>
          <span class="mh-name">${esc(t1.name)}</span>
          <span class="mh-dot" style="background:${t1.color}"></span>
        </div>
      </div>
      <div class="mh-sub" id="mhSub">Set 1 · saque: —</div>
      <div class="mh-stamina">
        <div class="mh-stam-side" id="mhStam0"></div>
        <div class="mh-strategy" id="mhStrat"></div>
        <div class="mh-stam-side" id="mhStam1"></div>
      </div>
      <div class="mh-msg" id="mhMsg"></div>
      <div class="mh-controls">
        <button class="btn icon-btn" id="mhPause" title="Pausar">${Sprites.iconTag('pause', 20, 'silver')}<span>Pausar</span></button>
        <button class="btn icon-btn" id="mhSpeed" title="Velocidade">${Sprites.iconTag('play', 20, 'green')}<span>1x</span></button>
        <button class="btn icon-btn" id="mhSkip" title="Pular ponto">${Sprites.iconTag('skip', 20, 'silver')}<span>Pular</span></button>
        <button class="btn icon-btn" id="mhStats" title="Estatísticas">${Sprites.iconTag('chart', 20, 'blue')}<span>Estatísticas</span></button>
      </div>
      <div class="mh-statbox hidden" id="mhStatBox"></div>
      <div class="mh-overlay hidden" id="mhOverlay"></div>
      <div class="mh-banner hidden" id="mhBanner"></div>
    `;
    document.getElementById('mhPause').onclick = () => {
      if (!V) return;
      V.paused = !V.paused;
      const b = document.getElementById('mhPause');
      b.innerHTML = Sprites.iconTag(V.paused ? 'play' : 'pause', 20, V.paused ? 'green' : 'silver') + `<span>${V.paused ? 'Continuar' : 'Pausar'}</span>`;
      if (root.Audio2) root.Audio2.sfx.click();
    };
    document.getElementById('mhSpeed').onclick = () => {
      if (!V) return;
      V.speed = V.speed === 1 ? 2 : V.speed === 2 ? 4 : 1;
      const b = document.getElementById('mhSpeed');
      const ic = V.speed === 1 ? 'play' : 'ff';
      b.innerHTML = Sprites.iconTag(ic, 20, V.speed === 4 ? 'red' : V.speed === 2 ? 'gold' : 'green') + `<span>${V.speed}x</span>`;
      if (root.Audio2) root.Audio2.sfx.click();
    };
    document.getElementById('mhSkip').onclick = () => { if (!V) return; V.skipRequested = true; if (root.Audio2) root.Audio2.sfx.click(); };
    document.getElementById('mhStats').onclick = () => { if (!V) return; toggleStats(); if (root.Audio2) root.Audio2.sfx.click(); };
  }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function updateHud() {
    if (!V) return;
    const m = V.m;
    document.getElementById('mhPts0').textContent = m.score[0];
    document.getElementById('mhPts1').textContent = m.score[1];
    document.getElementById('mhSets0').textContent = m.sets[0];
    document.getElementById('mhSets1').textContent = m.sets[1];
    const serverTeam = m.teams[m.servingSide];
    const serverAth = serverTeam.athletes[m.servingAth[m.servingSide]];
    const sit = Sim.pointSituation(m);
    let extra = '';
    if (sit.matchPoint) extra = ' · MATCH POINT';
    else if (sit.setPoint) extra = ' · SET POINT';
    document.getElementById('mhSub').textContent =
      `Set ${Math.min(m.setIndex + 1, 3)} · saque: ${serverAth.name} (${serverTeam.name})${extra}`;
    // fôlego
    for (let s = 0; s < 2; s++) {
      const box = document.getElementById('mhStam' + s);
      box.innerHTML = m.teams[s].athletes.map((a, i) => {
        const st = Math.round(m.stamina[s][i]);
        const cls = st > 55 ? 'ok' : st > 30 ? 'mid' : 'low';
        return `<div class="mh-stam"><span>${esc(a.name)}</span><div class="bar"><div class="fill ${cls}" style="width:${st}%"></div></div></div>`;
      }).join('');
    }
    const st = D.STRAT_BY_ID[m.strategy[0]];
    document.getElementById('mhStrat').innerHTML = `<span title="Estratégia atual">${Sprites.iconTag(st.icon, 16, st.tone)} ${st.name}</span>`;
  }

  function pushMsg(text, important) {
    V.msgQueue.push({ text, important });
  }

  function commentFor(key) {
    const arr = D.COMMENTS[key];
    if (!arr) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function toggleStats() {
    const box = document.getElementById('mhStatBox');
    V.statsOpen = !V.statsOpen;
    box.classList.toggle('hidden', !V.statsOpen);
    if (V.statsOpen) renderLiveStats();
  }

  function renderLiveStats() {
    const m = V.m;
    const box = document.getElementById('mhStatBox');
    const row = (label, a, b) => `<tr><td>${a}</td><th>${label}</th><td>${b}</td></tr>`;
    const s0 = m.stats.side[0], s1 = m.stats.side[1];
    box.innerHTML = `
      <h4>Estatísticas ao vivo</h4>
      <table>
        ${row('Pontos', s0.points, s1.points)}
        ${row('Erros', s0.errors, s1.errors)}
        ${row('Aces', s0.aces, s1.aces)}
        ${row('Ataques vencedores', s0.winners, s1.winners)}
        ${row('Bolas colocadas', s0.drops, s1.drops)}
        ${row('Defesas difíceis', s0.saves, s1.saves)}
      </table>
      <div class="mh-setline">Sets: ${m.setScores.map(s => s[0] + '-' + s[1]).join(' · ') || '—'}</div>
    `;
  }

  function showBanner(big, small, dur) {
    const b = document.getElementById('mhBanner');
    b.innerHTML = `<div class="big">${esc(big)}</div><div class="small">${esc(small)}</div>`;
    b.classList.remove('hidden');
    b.style.opacity = 1;
    setTimeout(() => { b.style.opacity = 0; }, dur * 900);
    setTimeout(() => { b.classList.add('hidden'); }, dur * 1000 + 400);
  }

  /* =====================================================================
     LOOP PRINCIPAL
     ===================================================================== */
  function loop(now) {
    if (!V) return;
    let dt = Math.min(0.05, (now - V.lastTime) / 1000);
    V.lastTime = now;
    if (!V.paused) {
      update(dt * V.speed);
    }
    draw();
    if (V) V.raf = requestAnimationFrame(loop);
  }

  function update(dt) {
    V.phaseT += dt;
    V.netShake = Math.max(0, V.netShake - dt * 3);
    V.crowdExcite = Math.max(0, V.crowdExcite - dt * 0.7);
    V.pointFlash = Math.max(0, V.pointFlash - dt * 2);
    if (V.landLabel) { V.landLabel.t -= dt; if (V.landLabel.t <= 0) V.landLabel = null; }

    // mensagens
    if (V.msgT > 0) { V.msgT -= dt; if (V.msgT <= 0) setMsg(''); }
    if (V.msgT <= 0 && V.msgQueue.length) {
      const q = V.msgQueue.shift();
      setMsg(q.text, q.important);
      V.msgT = q.important ? 2.4 : 1.8;
    }

    // atletas: movimento + frames
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      const A = V.ath[s][a];
      const dx = A.tx - A.x, dy = A.ty - A.y;
      const d = Math.hypot(dx, dy);
      if (d > 0.08) {
        const step = Math.min(d, A.moveSpd * dt);
        A.x += dx / d * step; A.y += dy / d * step;
        if (A.pose === 'idle') A.pose = 'run';
      } else if (A.pose === 'run') {
        A.pose = 'idle';
      }
      A.frameT += dt;
      if (A.frameT > 0.16) { A.frameT = 0; A.frame = 1 - A.frame; }
      if (A.poseT > 0) {
        A.poseT -= dt;
        if (A.poseT <= 0) A.pose = 'idle';
      }
    }

    switch (V.phase) {
      case 'intro':
        if (V.phaseT > 2.2) startPoint();
        break;
      case 'serving':
        if (V.phaseT > 0.9) beginRallyPlayback();
        break;
      case 'rally':
        updateRally(dt);
        break;
      case 'pointEnd':
        if (V.phaseT > 1.5 || V.skipRequested) afterPoint();
        break;
      case 'setEnd':
        // aguarda diálogo de estratégia (overlay)
        break;
      case 'matchEnd':
        updateConfetti(dt);
        if (V.phaseT > 3.4) { finishMatch(); return; }
        break;
    }

    if (V.skipRequested && V.phase === 'rally') {
      // completa o rali instantaneamente
      V.skipRequested = false;
      jumpToPointEnd();
    }
  }

  function setMsg(text, important) {
    const el = document.getElementById('mhMsg');
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('important', !!important);
    el.classList.toggle('visible', !!text);
  }

  /* =====================================================================
     FLUXO DE PONTOS
     ===================================================================== */
  function startPoint() {
    const m = V.m;
    if (m.finished) { onMatchEnd(); return; }
    // gera o rali com a IA
    V.rally = Sim.playPoint(m);
    V.hitIdx = 0; V.hitT = 0;
    V.phase = 'serving'; V.phaseT = 0;
    V.skipRequested = false;

    // posiciona atletas: sacador no fundo, demais em formação
    const serve = V.rally.hits[0];
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      const A = V.ath[s][a];
      const base = { x: a === 0 ? 3 : 7, y: s === 0 ? -3.6 : 3.6 };
      A.tx = base.x; A.ty = base.y;
      A.pose = 'idle'; A.poseT = 0;
      // velocidade visual proporcional ao atributo
      A.moveSpd = 4.5 + m.teams[s].athletes[a].attrs.vel / 18;
    }
    const sAth = V.ath[serve.side][serve.ath];
    sAth.tx = serve.from.x; sAth.ty = serve.from.y;

    V.shuttle = null;
    updateHud();

    const sit = Sim.pointSituation(m);
    if (sit.matchPoint) pushMsg('MATCH POINT!', true);
    else if (sit.setPoint) pushMsg('SET POINT!', true);
  }

  function beginRallyPlayback() {
    V.phase = 'rally'; V.phaseT = 0;
    V.hitIdx = 0; V.hitT = 0;
    startHit(0);
  }

  function startHit(idx) {
    const hit = V.rally.hits[idx];
    const A = V.ath[hit.side][hit.ath];
    A.x = A.tx = hit.from.x; A.y = A.ty = hit.from.y;

    // pose do golpe
    let pose = 'defend';
    if (hit.type.startsWith('serve')) pose = 'serve';
    else if (hit.type === 'smash') pose = 'smash';
    else if (hit.type === 'drop') pose = 'drop';
    A.pose = pose; A.poseT = 0.45;

    // som
    if (root.Audio2) {
      if (hit.type === 'smash') root.Audio2.sfx.smash();
      else if (hit.type.startsWith('serve')) root.Audio2.sfx.serve();
      else root.Audio2.sfx.hit();
    }

    // peteca começa a voar
    const z0 = hit.type === 'smash' ? 2.6 : hit.type.startsWith('serve') ? 1.2 : 1.6;
    V.shuttle = {
      from: { x: hit.from.x, y: hit.from.y, z: z0 },
      to: { x: hit.to.x, y: hit.to.y, z: 0 },
      hit, progress: 0,
      arc: hit.type === 'drop' ? 2.2 : hit.type === 'smash' ? 0.4 : hit.power > 0.7 ? 1.1 : 1.8,
      spin: 0, trail: [],
    };
    // erro na rede: peteca morre na rede (altura da fita)
    if (hit.result === 'error_net') {
      V.shuttle.to = { x: hit.land.x, y: hit.land.y, z: 1.9 };
      V.shuttle.arc = 0.9;
    }
    if (hit.result === 'error_out') {
      V.shuttle.to = { x: hit.land.x, y: hit.land.y, z: 0 };
    }

    // receptor corre para interceptar (ou tentar)
    const next = V.rally.hits[idx + 1];
    if (next) {
      const R = V.ath[next.side][next.ath];
      R.tx = hit.to.x; R.ty = hit.to.y;
      R.pose = 'run';
    } else if (hit.result === 'in_play') {
      // ninguém alcança: o mais próximo corre e não chega
      const os = 1 - hit.side;
      const d0 = U.dist(V.ath[os][0].x, V.ath[os][0].y, hit.to.x, hit.to.y);
      const d1 = U.dist(V.ath[os][1].x, V.ath[os][1].y, hit.to.x, hit.to.y);
      const ri = d0 < d1 ? 0 : 1;
      const R = V.ath[os][ri];
      R.tx = U.lerp(R.x, hit.to.x, 0.7); R.ty = U.lerp(R.y, hit.to.y, 0.7);
      R.pose = 'run';
    }

    V.hitT = 0;
  }

  function updateRally(dt) {
    const rally = V.rally;
    const hit = rally.hits[V.hitIdx];
    if (!hit || !V.shuttle) { jumpToPointEnd(); return; }

    const dur = hit.t;
    V.hitT += dt;
    const p = Math.min(1, V.hitT / dur);
    const sh = V.shuttle;
    sh.progress = p;
    sh.spin += dt * (4 + hit.power * 14);

    // rastro (cosmético) em ataques fortes
    if (hit.power > 0.75) {
      const pos = shuttlePos();
      sh.trail.push({ x: pos.x, y: pos.y, z: pos.z, life: 0.25 });
    }
    sh.trail.forEach(t => t.life -= dt);
    sh.trail = sh.trail.filter(t => t.life > 0);

    if (p >= 1) {
      // chegada da peteca
      if (hit.result === 'in_play' && V.rally.hits[V.hitIdx + 1]) {
        V.hitIdx++;
        // notas de defesa/entrosamento neste toque
        for (const n of rally.notes) {
          if (n.touch === V.hitIdx) {
            const c = commentFor(n.key);
            if (c) pushMsg(c);
            V.crowdExcite = Math.min(1, V.crowdExcite + 0.5);
          }
        }
        startHit(V.hitIdx);
      } else {
        landShuttle(hit);
      }
    }
  }

  function landShuttle(hit) {
    const rally = V.rally;
    // efeitos de queda
    if (hit.result === 'error_net') {
      V.netShake = 1;
      if (root.Audio2) root.Audio2.sfx.net();
      V.landLabel = { text: 'NA REDE', x: hit.land.x, y: hit.land.y, t: 1.2, color: '#ff7043' };
    } else if (hit.result === 'error_out') {
      V.landLabel = { text: 'FORA!', x: hit.land.x, y: hit.land.y, t: 1.2, color: '#ff7043' };
      if (root.Audio2) root.Audio2.sfx.hit();
    } else {
      V.landLabel = { text: 'PONTO!', x: hit.to.x, y: hit.to.y, t: 1.2, color: '#ffd54f' };
      if (root.Audio2) root.Audio2.sfx.point();
    }
    pointEndReactions();
  }

  function jumpToPointEnd() {
    // pula direto para o resultado do rali
    const rally = V.rally;
    const last = rally.hits[rally.hits.length - 1];
    if (last && last.land) {
      V.shuttle = { from: last.from, to: { x: last.land.x, y: last.land.y, z: 0 }, hit: last, progress: 1, arc: 1, spin: 0, trail: [] };
    }
    pointEndReactions();
  }

  function pointEndReactions() {
    const rally = V.rally;
    const w = rally.winnerSide;
    const playerWon = w === 0;

    // comemoração / frustração (cosmético de comemoração da dupla)
    const celeb = V.m.teams[w].celebration || 'pulo';
    for (let a = 0; a < 2; a++) {
      const W = V.ath[w][a];
      W.pose = 'celebrate'; W.poseT = 1.3;
      W.spin = celeb === 'giro';
      if (celeb === 'toca') {
        // a dupla corre para comemorar junta no meio
        const mid = { x: (V.ath[w][0].x + V.ath[w][1].x) / 2, y: (V.ath[w][0].y + V.ath[w][1].y) / 2 };
        W.tx = mid.x + (a === 0 ? -0.6 : 0.6); W.ty = mid.y;
      }
      const L = V.ath[1 - w][a];
      L.spin = false;
      const st = V.m.stamina[1 - w][a];
      L.pose = st < 35 ? 'tired' : 'sad'; L.poseT = 1.3;
    }

    // sons e torcida
    if (root.Audio2) {
      if (playerWon) root.Audio2.sfx.cheer(); else root.Audio2.sfx.lose();
    }
    V.crowdExcite = Math.min(1, V.crowdExcite + (rally.touches >= 8 ? 1 : 0.6));
    V.pointFlash = 1;

    // comentário
    const c = commentFor(rally.commentKey);
    if (c) pushMsg(c, rally.commentKey === 'longRally');

    V.phase = 'pointEnd'; V.phaseT = 0;
    updateHud();
  }

  function afterPoint() {
    const rally = V.rally;
    V.skipRequested = false;
    if (rally.matchEnded) { onMatchEnd(); return; }
    if (rally.setEnded) { onSetEnd(rally); return; }
    startPoint();
  }

  /* ---------- fim de set: ajuste de estratégia ---------- */
  function onSetEnd(rally) {
    V.phase = 'setEnd'; V.phaseT = 0;
    if (root.Audio2) root.Audio2.sfx.whistle();
    const m = V.m;
    const lastSet = m.setScores[m.setScores.length - 1];
    const ov = document.getElementById('mhOverlay');
    const winName = m.teams[rally.setWinner].name;
    const stratBtns = D.STRATEGIES.map(s =>
      `<button class="strat-opt ${m.strategy[0] === s.id ? 'sel' : ''}" data-id="${s.id}">
        <span class="ic">${Sprites.iconTag(s.icon, 26, s.tone)}</span><b>${s.name}</b><small>${s.desc}</small>
      </button>`).join('');
    ov.innerHTML = `
      <div class="ov-card">
        <h3>Fim do ${m.setIndex}º set — ${esc(winName)} venceu ${lastSet[0]}×${lastSet[1]}</h3>
        <p class="ov-sub">Intervalo: ajuste a estratégia da sua dupla para o próximo set.</p>
        <div class="strat-grid">${stratBtns}</div>
        <button class="btn primary" id="ovGo">Começar o próximo set</button>
      </div>`;
    ov.classList.remove('hidden');
    ov.querySelectorAll('.strat-opt').forEach(b => {
      b.onclick = () => {
        m.strategy[0] = b.dataset.id;
        if (V.cfg.teams[0].isPlayer && root.G && root.G.save) { root.G.save.strategy = b.dataset.id; root.G.saveGame(); }
        ov.querySelectorAll('.strat-opt').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        if (root.Audio2) root.Audio2.sfx.click();
      };
    });
    document.getElementById('ovGo').onclick = () => {
      ov.classList.add('hidden');
      if (root.Audio2) root.Audio2.sfx.click();
      updateHud();
      startPoint();
      showBanner(`SET ${m.setIndex + 1}`, m.setIndex === 2 ? 'Set decisivo até 15!' : 'Até 21 pontos', 1.6);
    };
  }

  /* ---------- fim de partida ---------- */
  function onMatchEnd() {
    V.phase = 'matchEnd'; V.phaseT = 0;
    const m = V.m;
    const winTeam = m.teams[m.winnerSide];
    showBanner('VITÓRIA: ' + winTeam.name, 'Sets: ' + m.setScores.map(s => s[0] + '-' + s[1]).join(' · '), 3);
    if (root.Audio2) {
      if (m.winnerSide === 0) root.Audio2.sfx.bigCheer(); else root.Audio2.sfx.whistle();
    }
    // comemoração prolongada
    for (let a = 0; a < 2; a++) {
      V.ath[m.winnerSide][a].pose = 'celebrate'; V.ath[m.winnerSide][a].poseT = 4;
      V.ath[1 - m.winnerSide][a].pose = 'sad'; V.ath[1 - m.winnerSide][a].poseT = 4;
    }
    // confete se o jogador venceu
    if (m.winnerSide === 0) {
      for (let i = 0; i < 130; i++) {
        V.confetti.push({
          x: Math.random() * VIEW_W, y: -10 - Math.random() * 140,
          vy: 35 + Math.random() * 55, vx: (Math.random() - 0.5) * 30,
          c: ['#ffd54f', '#4fc3f7', '#81c784', '#e57373', '#ba68c8'][i % 5],
          w: 2 + Math.random() * 2, rot: Math.random() * 6,
        });
      }
    }
    V.crowdExcite = 1;
  }

  function updateConfetti(dt) {
    for (const c of V.confetti) {
      c.y += c.vy * dt; c.x += c.vx * dt + Math.sin(c.y / 12) * 0.4;
      c.rot += dt * 4;
    }
    V.confetti = V.confetti.filter(c => c.y < VIEW_H + 10);
  }

  function finishMatch() {
    if (V.finished) return;
    V.finished = true;
    const m = V.m;
    const cb = V.cfg.onFinish;
    MV.stop();
    if (cb) cb(m);
  }

  /* =====================================================================
     DESENHO
     ===================================================================== */
  function shuttlePos() {
    const sh = V.shuttle;
    const p = sh.progress;
    const x = U.lerp(sh.from.x, sh.to.x, p);
    const y = U.lerp(sh.from.y, sh.to.y, p);
    const z = U.lerp(sh.from.z, sh.to.z, p) + sh.arc * 4 * p * (1 - p);
    return { x, y, z };
  }

  function draw() {
    if (!V) return;
    const g = V.ctx;
    const th = V.theme;
    g.imageSmoothingEnabled = false;

    drawBackground(g, th);
    drawCourt(g, th);

    // lista de desenho ordenada por profundidade (y do chão)
    const items = [];
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) {
      items.push({ kind: 'ath', s, a, gy: V.ath[s][a].y });
    }
    let shp = null;
    if (V.shuttle) {
      shp = shuttlePos();
      items.push({ kind: 'shuttle', gy: shp.y });
    }
    items.push({ kind: 'net', gy: 0 });
    items.sort((i, j) => i.gy - j.gy);

    // sombras primeiro
    for (let s = 0; s < 2; s++) for (let a = 0; a < 2; a++) drawShadow(g, V.ath[s][a].x, V.ath[s][a].y, 7);
    if (shp) drawShadow(g, shp.x, shp.y, 3 + Math.max(0, 2 - shp.z));

    for (const it of items) {
      if (it.kind === 'ath') drawAthlete(g, it.s, it.a);
      else if (it.kind === 'net') drawNet(g, th);
      else if (it.kind === 'shuttle') drawShuttle(g, shp);
    }

    drawLandLabel(g);
    drawConfetti(g);

    // flash de ponto
    if (V.pointFlash > 0) {
      g.fillStyle = `rgba(255,255,255,${V.pointFlash * 0.08})`;
      g.fillRect(0, 0, VIEW_W, VIEW_H);
    }
  }

  function drawBackground(g, th) {
    // céu/parede
    g.fillStyle = th.sky; g.fillRect(0, 0, VIEW_W, 64);
    g.fillStyle = th.wall; g.fillRect(0, 64, VIEW_W, 40);

    // torcida
    drawCrowd(g, th);

    // árvores da praça
    if (th.trees) {
      for (let i = 0; i < 6; i++) {
        const x = 30 + i * 80;
        g.fillStyle = '#5d4037'; g.fillRect(x, 42, 5, 22);
        g.fillStyle = '#37703d'; g.fillRect(x - 10, 26, 25, 22);
        g.fillStyle = '#2e5d33'; g.fillRect(x - 6, 22, 17, 10);
      }
    }
    // bandeiras em arenas grandes
    if (th.banners) {
      const cols = ['#2e9e4f', '#e0b52e', '#3d7dd8', '#cf4436', '#7d5ba6', '#ffffff'];
      for (let i = 0; i < 8; i++) {
        const x = 14 + i * 60;
        g.fillStyle = '#20242c'; g.fillRect(x, 4, 2, 16);
        g.fillStyle = cols[i % cols.length]; g.fillRect(x + 2, 5, 14, 9);
      }
      // placar eletrônico profissional na parede
      const m = V.m;
      g.fillStyle = '#0a0d14'; g.fillRect(190, 22, 100, 32);
      g.fillStyle = '#1c2433'; g.fillRect(192, 24, 96, 28);
      g.font = 'bold 14px monospace'; g.textAlign = 'center';
      g.fillStyle = '#ffd54f';
      g.fillText(m.score[0] + ' - ' + m.score[1], 240, 40);
      g.font = '8px monospace';
      g.fillStyle = '#9fb0c8';
      g.fillText('SETS ' + m.sets[0] + '·' + m.sets[1], 240, 49);
    }
    // chão fora da quadra
    g.fillStyle = th.floor;
    g.fillRect(0, 104, VIEW_W, VIEW_H - 104);
    // textura sutil do piso
    g.fillStyle = th.floorAlt;
    for (let y = 108; y < VIEW_H; y += 10) {
      for (let x = (y % 20 === 8 ? 0 : 12); x < VIEW_W; x += 24) g.fillRect(x, y, 12, 2);
    }
  }

  function drawCrowd(g, th) {
    const rng = U.makeRng(V.crowdSeed);
    const rows = 3;
    const density = th.crowd;
    const excite = V.crowdExcite;
    for (let r = 0; r < rows; r++) {
      const y = 68 + r * 11;
      for (let x = 4; x < VIEW_W; x += 9) {
        if (rng() > density) continue;
        const skin = ['#e0ac69', '#c68642', '#8d5524', '#f1c27d'][(x + r) % 4];
        const shirt = ['#c94f2e', '#3d7dd8', '#e8c832', '#5a9e6f', '#8f6ac4', '#dddddd'][Math.floor(rng() * 6)];
        // pulo da torcida quando animada
        const jump = excite > 0.2 && ((x * 7 + r * 13) % 5 === Math.floor(V.phaseT * 10) % 5) ? -2 : 0;
        g.fillStyle = shirt; g.fillRect(x, y + 4 + jump, 6, 6);
        g.fillStyle = skin; g.fillRect(x + 1, y + jump, 4, 4);
      }
    }
  }

  function drawCourt(g, th) {
    // quadra (trapézio)
    const c00 = project(0, -7, 0), c10 = project(10, -7, 0);
    const c01 = project(0, 7, 0), c11 = project(10, 7, 0);
    g.fillStyle = th.court;
    g.beginPath();
    g.moveTo(c00.x, c00.y); g.lineTo(c10.x, c10.y);
    g.lineTo(c11.x, c11.y); g.lineTo(c01.x, c01.y);
    g.closePath(); g.fill();

    // faixa central (sombra da rede)
    const n0 = project(0, 0, 0), n1 = project(10, 0, 0);
    g.fillStyle = 'rgba(0,0,0,0.10)';
    g.fillRect(n0.x, n0.y - 1, n1.x - n0.x, 3);

    // linhas
    g.strokeStyle = th.line;
    g.lineWidth = 2;
    line(g, 0, -7, 10, -7); line(g, 0, 7, 10, 7);
    line(g, 0, -7, 0, 7); line(g, 10, -7, 10, 7);
    g.lineWidth = 1;
    line(g, 0, -5.5, 10, -5.5); line(g, 0, 5.5, 10, 5.5); // linhas de saque
    line(g, 5, -7, 5, -5.5); line(g, 5, 5.5, 5, 7);        // meio no fundo
  }

  function line(g, x1, y1, x2, y2) {
    const a = project(x1, y1, 0), b = project(x2, y2, 0);
    g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
  }

  function drawNet(g, th) {
    const shake = V.netShake > 0 ? Math.sin(V.phaseT * 40) * V.netShake * 2 : 0;
    const l = project(-0.4, 0, 0), r = project(10.4, 0, 0);
    const netH = 2.3;
    const lt = project(-0.4, 0, netH), rt = project(10.4, 0, netH);

    // postes
    g.fillStyle = '#37474f';
    g.fillRect(l.x - 2, lt.y - 2, 4, l.y - lt.y + 2);
    g.fillRect(r.x - 2, rt.y - 2, 4, r.y - rt.y + 2);
    g.fillStyle = '#546e7a';
    g.fillRect(l.x - 2, lt.y - 2, 2, l.y - lt.y + 2);
    g.fillRect(r.x - 2, rt.y - 2, 2, r.y - rt.y + 2);

    // malha
    const top = lt.y + shake;
    const bottom = l.y - 8;
    g.strokeStyle = 'rgba(240,244,248,0.55)';
    g.lineWidth = 1;
    for (let i = 0; i <= 12; i++) {
      const yy = U.lerp(top + 3, bottom, i / 12);
      g.beginPath(); g.moveTo(l.x, yy); g.lineTo(r.x, yy + shake * 0.4); g.stroke();
    }
    for (let i = 0; i <= 26; i++) {
      const xx = U.lerp(l.x, r.x, i / 26);
      g.beginPath(); g.moveTo(xx, top + 3); g.lineTo(xx, bottom); g.stroke();
    }
    // fita superior
    g.fillStyle = '#f5f7fa';
    g.fillRect(l.x, top, r.x - l.x, 3);
    g.fillStyle = 'rgba(0,0,0,0.15)';
    g.fillRect(l.x, top + 3, r.x - l.x, 1);
  }

  function drawShadow(g, wx, wy, size) {
    const p = project(wx, wy, 0);
    g.fillStyle = 'rgba(0,0,0,0.22)';
    g.beginPath();
    g.ellipse(p.x, p.gy + 1, size, size * 0.35, 0, 0, Math.PI * 2);
    g.fill();
  }

  function drawAthlete(g, s, a) {
    const A = V.ath[s][a];
    const m = V.m;
    const team = m.teams[s];
    const ath = team.athletes[a];
    const p = project(A.x, A.y, 0);
    const scale = U.lerp(2.1, 1.4, p.t);
    const uni = { c1: team.color, c2: team.colorAlt || '#ffffff' };
    const facing = s === 0 ? 'up' : 'down';
    let pose = A.pose;
    // cansaço visível quando parado
    if (pose === 'idle' && m.stamina[s][a] < 30) pose = 'tired';
    const spr = Sprites.athlete(
      { ...ath.look, gender: ath.gender }, uni, pose, A.frame, facing
    );
    const w = spr.width * scale, h = spr.height * scale;
    // comemoração "giro": alterna o espelhamento do sprite
    const flip = pose === 'celebrate' && A.spin && A.frame === 1;
    Sprites.blit(g, spr, p.x - w / 2, p.y - h + 4, scale, flip);
  }

  function drawShuttle(g, sp) {
    const sh = V.shuttle;
    // rastro cosmético
    const fx = V.cfg.teams[0].trailFx;
    for (const t of sh.trail) {
      const tp = project(t.x, t.y, t.z);
      const alpha = t.life / 0.25;
      if (fx === 'fogo') g.fillStyle = `rgba(255,${120 + Math.floor(alpha * 100)},40,${alpha * 0.6})`;
      else if (fx === 'neon') g.fillStyle = `rgba(60,200,255,${alpha * 0.6})`;
      else g.fillStyle = `rgba(255,255,255,${alpha * 0.25})`;
      g.fillRect(tp.x - 1, tp.y - 1, 3, 3);
    }
    const p = project(sp.x, sp.y, sp.z);
    const frame = Math.floor(sh.spin * 3) % 3;
    const spr = Sprites.peteca(frame);
    const scale = U.lerp(1.7, 1.15, p.t);
    Sprites.blit(g, spr, p.x - spr.width * scale / 2, p.y - spr.height * scale / 2, scale, false);
  }

  function drawLandLabel(g) {
    const L = V.landLabel;
    if (!L) return;
    const p = project(L.x, L.y, 0);
    const a = Math.min(1, L.t / 0.4);
    g.font = 'bold 11px monospace';
    g.textAlign = 'center';
    g.fillStyle = `rgba(0,0,0,${a * 0.5})`;
    g.fillText(L.text, p.x + 1, p.y - 9);
    g.fillStyle = L.color;
    g.globalAlpha = a;
    g.fillText(L.text, p.x, p.y - 10);
    g.globalAlpha = 1;
  }

  function drawConfetti(g) {
    for (const c of V.confetti) {
      g.save();
      g.translate(c.x, c.y);
      g.rotate(c.rot);
      g.fillStyle = c.c;
      g.fillRect(-c.w / 2, -c.w / 2, c.w, c.w * 1.6);
      g.restore();
    }
  }

  root.MatchView = MV;
})(typeof window !== 'undefined' ? window : globalThis);
