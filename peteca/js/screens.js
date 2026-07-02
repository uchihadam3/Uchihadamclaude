/* =========================================================================
   PETECA LEGENDS — screens.js
   Todas as telas de interface: menu, seleção de dupla, renomear, campanha,
   campeonato, pré-jogo, partida, estatísticas, treino, habilidades,
   loja/equipamentos, perfil, opções, partida rápida e desafios.
   ========================================================================= */
(function (root) {
  'use strict';

  const { U, D, G, Sim, Sprites, MatchView } = root;
  const SC = {};
  let app = null;
  let previews = [];   // canvases animados [{cv, look, uni, poses, frame, poseIdx}]
  let previewTimer = null;

  SC.init = function () {
    app = document.getElementById('app');
    previewTimer = setInterval(tickPreviews, 380);
  };

  function sfx(name) { if (root.Audio2) root.Audio2.sfx[name](); }

  /* =====================================================================
     NAVEGAÇÃO
     ===================================================================== */
  SC.show = function (name, params) {
    previews = [];
    if (name !== 'match') MatchView.stop();
    G.screen = name;
    const fn = SCREENS[name];
    app.className = 'screen-' + name;
    if (fn) fn(params || {});
    window.scrollTo(0, 0);
  };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* =====================================================================
     COMPONENTES
     ===================================================================== */

  function resourceBar() {
    const s = G.save;
    if (!s) return '';
    return `<div class="resbar">
      <span title="Dinheiro">💰 ${U.money(s.money)}</span>
      <span title="Reputação">⭐ ${s.rep}</span>
      <span title="Pontos de treino">🏋️ ${s.tp}</span>
      <span title="Condição física">❤️ ${Math.round(s.condition)}%</span>
      <span title="Entrosamento">🤝 ${Math.round(s.chem)}</span>
    </div>`;
  }

  function header(title, back) {
    return `<header class="top">
      ${back ? `<button class="btn back" data-nav="${back}">←</button>` : '<span></span>'}
      <h2>${esc(title)}</h2>
      ${resourceBar()}
    </header>`;
  }

  function bindNav() {
    app.querySelectorAll('[data-nav]').forEach(b => {
      b.addEventListener('click', () => { sfx('click'); SC.show(b.dataset.nav); });
    });
  }

  function portraitEl(ath, uni, size, mood) {
    const cv = document.createElement('canvas');
    const spr = Sprites.portrait(ath.look, uni, mood);
    cv.width = spr.width; cv.height = spr.height;
    cv.getContext('2d').drawImage(spr, 0, 0);
    cv.className = 'portrait';
    cv.style.width = (size || 64) + 'px';
    return cv;
  }

  function spritePreviewEl(ath, uni, poses, scale) {
    const cv = document.createElement('canvas');
    cv.width = 20 * (scale || 3); cv.height = 26 * (scale || 3);
    cv.className = 'sprite-preview';
    previews.push({ cv, look: { ...ath.look, gender: ath.gender }, uni, poses: poses || ['idle', 'run', 'serve', 'smash', 'defend', 'celebrate'], frame: 0, poseIdx: 0, tick: 0, scale: scale || 3 });
    return cv;
  }

  function tickPreviews() {
    for (const p of previews) {
      if (!p.cv.isConnected) continue;
      p.tick++;
      p.frame = 1 - p.frame;
      if (p.tick % 4 === 0) p.poseIdx = (p.poseIdx + 1) % p.poses.length;
      const g = p.cv.getContext('2d');
      g.clearRect(0, 0, p.cv.width, p.cv.height);
      const spr = Sprites.athlete(p.look, p.uni, p.poses[p.poseIdx], p.frame, 'down');
      g.imageSmoothingEnabled = false;
      g.drawImage(spr, 0, 0, p.cv.width, p.cv.height);
    }
    previews = previews.filter(p => p.cv.isConnected);
  }

  function attrBars(ath, team, compact) {
    return `<div class="attrs ${compact ? 'compact' : ''}">` + D.ATTRS.map(a => {
      const v = team ? G.effAttr(ath, a.key, team) : ath.attrs[a.key];
      const cls = v >= 70 ? 'hi' : v >= 45 ? 'mid' : 'lo';
      return `<div class="attr" title="${esc(a.desc)}">
        <span class="al">${compact ? a.name.slice(0, 3) : a.name}</span>
        <div class="ab"><div class="af ${cls}" style="width:${Math.min(100, v)}%"></div></div>
        <span class="av">${v}</span>
      </div>`;
    }).join('') + '</div>';
  }

  function playerUni() {
    const u = D.UNIFORM_COLORS.find(x => x.id === (G.save ? G.save.uniform : 'verde')) || D.UNIFORM_COLORS[0];
    return { c1: u.c1, c2: u.c2 };
  }

  function toast(text) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div'); t.id = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2400);
  }
  SC.toast = toast;

  /* =====================================================================
     TELAS
     ===================================================================== */
  const SCREENS = {};

  /* ---------- MENU ---------- */
  SCREENS.menu = function () {
    const has = G.hasSave();
    if (has && !G.save) G.loadGame();
    app.innerHTML = `
      <div class="menu-wrap">
        <div class="logo">
          <canvas id="logoPeteca" width="48" height="56"></canvas>
          <h1>PETECA<span>LEGENDS</span></h1>
          <p class="tagline">Da praça do bairro ao Campeonato Mundial</p>
        </div>
        <nav class="menu-btns">
          ${has ? `<button class="btn primary big" id="btContinue">▶ Continuar</button>` : ''}
          <button class="btn ${has ? '' : 'primary'} big" id="btCampaign">${has ? '🗺️ Campanha' : '🆕 Nova Campanha'}</button>
          <button class="btn big" id="btQuick">⚡ Partida Rápida</button>
          <button class="btn big" id="btTrain" ${has ? '' : 'disabled'}>🏋️ Treino</button>
          <button class="btn big" id="btChars" ${has ? '' : 'disabled'}>👥 Personagens</button>
          <button class="btn big" id="btOptions">⚙️ Opções</button>
        </nav>
        <p class="credit">pixel art · simulação automática · melhor de 3 sets</p>
      </div>`;
    // logo peteca grande
    const lg = document.getElementById('logoPeteca').getContext('2d');
    lg.imageSmoothingEnabled = false;
    lg.drawImage(Sprites.peteca(1), 0, 0, 48, 56);

    const q = id => document.getElementById(id);
    if (q('btContinue')) q('btContinue').onclick = () => { sfx('click'); G.loadGame(); SC.show('campaign'); };
    q('btCampaign').onclick = () => {
      sfx('click');
      if (has) { G.loadGame(); SC.show('campaign'); }
      else SC.show('teamSelect');
    };
    q('btQuick').onclick = () => { sfx('click'); SC.show('quickSetup'); };
    if (has) {
      q('btTrain').onclick = () => { sfx('click'); G.loadGame(); SC.show('training'); };
      q('btChars').onclick = () => { sfx('click'); G.loadGame(); SC.show('profile'); };
    }
    q('btOptions').onclick = () => { sfx('click'); SC.show('options'); };
    if (root.Audio2) root.Audio2.playMusic('menu');
  };

  /* ---------- SELEÇÃO DE DUPLA ---------- */
  SCREENS.teamSelect = function () {
    const picked = [];
    const uni = { c1: '#1faa4b', c2: '#ffdd33' };
    app.innerHTML = `
      ${header('Monte sua dupla', 'menu')}
      <p class="hint">Escolha <b>2 atletas</b>. Atributos baixos hoje, potencial para o mundo amanhã.</p>
      <div class="char-grid" id="charGrid"></div>
      <div class="pickbar">
        <div id="pickSlots"><span class="slot">?</span><span class="slot">?</span></div>
        <button class="btn primary" id="btConfirm" disabled>Confirmar dupla</button>
      </div>`;
    const grid = document.getElementById('charGrid');
    D.ATHLETES.forEach(a => {
      const card = document.createElement('div');
      card.className = 'char-card';
      card.innerHTML = `
        <div class="cc-head"></div>
        <h3>${esc(a.name)}</h3>
        <div class="cc-style">${esc(a.style)} · Potencial ${a.pot}</div>
        <p class="cc-desc">${esc(a.desc)}</p>
        <p class="cc-person">🗣️ ${esc(a.person)}</p>
        ${attrBars({ attrs: a.attrs }, null, true)}`;
      const head = card.querySelector('.cc-head');
      head.appendChild(portraitEl(a, uni, 56));
      head.appendChild(spritePreviewEl(a, uni, null, 2.4));
      card.onclick = () => {
        sfx('click');
        const i = picked.indexOf(a.id);
        if (i >= 0) picked.splice(i, 1);
        else { if (picked.length >= 2) picked.shift(); picked.push(a.id); }
        grid.querySelectorAll('.char-card').forEach((c, j) => {
          c.classList.toggle('sel', picked.includes(D.ATHLETES[j].id));
        });
        const slots = document.getElementById('pickSlots');
        slots.innerHTML = [0, 1].map(k => picked[k]
          ? `<span class="slot filled">${esc(D.ATHLETES.find(x => x.id === picked[k]).shortName)}</span>`
          : '<span class="slot">?</span>').join('');
        document.getElementById('btConfirm').disabled = picked.length !== 2;
      };
      grid.appendChild(card);
    });
    document.getElementById('btConfirm').onclick = () => {
      sfx('buy');
      const a = D.ATHLETES.find(x => x.id === picked[0]);
      const b = D.ATHLETES.find(x => x.id === picked[1]);
      G.newSave(a, b, null);
      SC.show('rename');
    };
    bindNav();
  };

  /* ---------- RENOMEAR ---------- */
  SCREENS.rename = function () {
    const s = G.save;
    const uni = playerUni();
    app.innerHTML = `
      ${header('Nomeie sua dupla', null)}
      <div class="rename-wrap">
        <div class="rename-card" id="rn0"></div>
        <div class="rename-card" id="rn1"></div>
        <div class="rename-team">
          <label>Nome da dupla</label>
          <input id="teamName" maxlength="22" value="${esc(s.teamName === 'Dupla Sem Nome' ? (s.athletes[0].name + ' & ' + s.athletes[1].name) : s.teamName)}"/>
        </div>
        <button class="btn primary big" id="btGo">Começar a campanha 🏆</button>
      </div>`;
    s.athletes.forEach((a, i) => {
      const box = document.getElementById('rn' + i);
      box.innerHTML = `<label>Atleta ${i + 1} — ${esc(a.fullName)}</label>
        <input id="name${i}" maxlength="14" value="${esc(a.name)}"/>`;
      box.prepend(portraitEl(a, uni, 56));
    });
    document.getElementById('btGo').onclick = () => {
      sfx('buy');
      s.athletes[0].name = (document.getElementById('name0').value.trim() || s.athletes[0].name).slice(0, 14);
      s.athletes[1].name = (document.getElementById('name1').value.trim() || s.athletes[1].name).slice(0, 14);
      s.teamName = (document.getElementById('teamName').value.trim() || s.teamName).slice(0, 22);
      G.saveGame();
      SC.show('campaign');
    };
  };

  /* ---------- MAPA DA CAMPANHA ---------- */
  SCREENS.campaign = function () {
    const s = G.save;
    if (!s) { SC.show('menu'); return; }
    // evento pendente?
    if (s.pendingEvent) { SC.show('event'); return; }

    app.innerHTML = `
      ${header('Campanha — ' + s.teamName, 'menu')}
      <div class="camp-actions">
        <button class="btn" data-nav="training">🏋️ Treino</button>
        <button class="btn" data-nav="skills">✨ Habilidades</button>
        <button class="btn" data-nav="shop">🛒 Loja</button>
        <button class="btn" data-nav="profile">👥 Perfil</button>
        <button class="btn" data-nav="challenges">🎯 Desafios</button>
      </div>
      <div class="camp-map" id="campMap"></div>`;
    const map = document.getElementById('campMap');
    D.TOURNAMENTS.forEach((t, idx) => {
      const unlocked = G.tournamentUnlocked(t);
      const won = s.titles.includes(t.id);
      const prog = s.champProgress[t.id];
      const inProgress = prog && prog.alive && !prog.done;
      const node = document.createElement('div');
      node.className = 'camp-node' + (unlocked ? '' : ' locked') + (won ? ' won' : '');
      node.innerHTML = `
        <div class="cn-tier">${idx + 1}</div>
        <div class="cn-body">
          <h3>${esc(t.name)} ${won ? '🏆' : ''}</h3>
          <div class="cn-sub">📍 ${esc(t.local)} · ${t.rounds} partidas · Prêmio ${U.money(t.prize)}</div>
          <div class="cn-desc">${esc(t.desc)}</div>
          ${unlocked
            ? (inProgress ? `<span class="cn-flag">Em andamento — fase ${prog.round + 1}/${t.rounds}</span>` : '')
            : `<span class="cn-flag lock">🔒 Requer ⭐ ${t.reqRep} de reputação (você tem ${s.rep})</span>`}
        </div>
        <div class="cn-go">${unlocked ? '▶' : '🔒'}</div>`;
      if (unlocked) {
        node.onclick = () => { sfx('click'); G.pendingTournament = t.id; SC.show('tournament'); };
      }
      map.appendChild(node);
    });
    bindNav();
    if (root.Audio2) root.Audio2.playMusic('menu');
  };

  /* ---------- TELA DO CAMPEONATO (chaveamento) ---------- */
  function roundNames(n) {
    if (n === 2) return ['Semifinal', 'Final'];
    if (n === 3) return ['Quartas de final', 'Semifinal', 'Final'];
    if (n === 4) return ['Oitavas', 'Quartas', 'Semifinal', 'Final'];
    return Array.from({ length: n }, (_, i) => i === n - 1 ? 'Final' : `Fase ${i + 1}`);
  }

  SCREENS.tournament = function () {
    const s = G.save;
    const t = D.TOUR_BY_ID[G.pendingTournament];
    if (!t) { SC.show('campaign'); return; }
    let prog = s.champProgress[t.id];
    const active = prog && prog.alive && !prog.done;
    const names = roundNames(t.rounds);

    let bracketHtml = '';
    if (active) {
      bracketHtml = prog.opponents.map((oid, i) => {
        const opp = D.OPPONENTS.find(o => o.id === oid);
        const arch = D.ARCHETYPES[opp.arch];
        const done = i < prog.round;
        const current = i === prog.round;
        return `<div class="brk-row ${done ? 'done' : ''} ${current ? 'current' : ''}">
          <span class="brk-round">${names[i]}</span>
          <span class="brk-opp">${esc(opp.name)}</span>
          <span class="brk-style">${arch.name}</span>
          <span class="brk-state">${done ? '✅ Vencido' : current ? '🎯 Próximo' : '—'}</span>
        </div>`;
      }).join('');
    }

    app.innerHTML = `
      ${header(t.name, 'campaign')}
      <div class="tour-card">
        <div class="tour-info">
          <div>📍 <b>${esc(t.local)}</b></div>
          <div>🏟️ Quadra: ${esc((MatchView.THEMES[t.theme] || {}).name || t.theme)}</div>
          <div>🎚️ Dificuldade: ${'★'.repeat(Math.ceil(t.tier / 2.2))}</div>
          <div>💰 Prêmio do título: <b>${U.money(t.prize)}</b></div>
          <div>🎫 Inscrição: ${t.fee ? U.money(t.fee) : 'grátis'}</div>
          <div>⭐ Reputação em jogo: ~${t.repWin}</div>
          <div>📜 Regras: melhor de 3 sets · sets a 21 (decisivo a 15) · 1 toque por lado</div>
        </div>
        ${active ? `
          <h3>Chaveamento</h3>
          <div class="bracket">${bracketHtml}</div>
          <button class="btn primary big" id="btPlay">▶ Jogar: ${esc(names[prog.round])}</button>
        ` : `
          <p class="tour-desc">${esc(t.desc)}</p>
          <button class="btn primary big" id="btEnter">🎫 Inscrever a dupla ${t.fee ? '(' + U.money(t.fee) + ')' : '(grátis)'}</button>
        `}
      </div>`;
    bindNav();
    if (active) {
      document.getElementById('btPlay').onclick = () => {
        sfx('click');
        const oppId = prog.opponents[prog.round];
        SC.show('prematch', { tournId: t.id, oppId, roundName: names[prog.round], isFinal: prog.round === t.rounds - 1 });
      };
    } else {
      document.getElementById('btEnter').onclick = () => {
        const r = G.startTournament(t);
        if (!r.ok) { sfx('error'); toast(r.msg); return; }
        sfx('buy');
        SC.show('tournament');
      };
    }
  };

  /* ---------- PRÉ-JOGO ---------- */
  SCREENS.prematch = function (p) {
    const s = G.save;
    const t = p.tournId ? D.TOUR_BY_ID[p.tournId] : null;
    const oppDef = D.OPPONENTS.find(o => o.id === p.oppId);
    const opp = G.makeOpponentTeam(oppDef);
    if (p.diffMult) scaleTeam(opp, p.diffMult);
    const player = G.playerTeam();
    const arch = D.ARCHETYPES[oppDef.arch];

    // pontos fortes/fracos do adversário
    const avg = {};
    D.ATTRS.forEach(a => { avg[a.key] = (opp.athletes[0].attrs[a.key] + opp.athletes[1].attrs[a.key]) / 2; });
    const sorted = Object.entries(avg).sort((a, b) => b[1] - a[1]);
    const strong = sorted.slice(0, 3).map(x => D.ATTR_NAME[x[0]]);
    const weak = sorted.slice(-3).map(x => D.ATTR_NAME[x[0]]).reverse();

    const chance = Sim.estimateWinChance(player, opp, 20);

    function teamCol(team, title, uni) {
      return `<div class="pm-team">
        <h3 style="color:${team.color}">${esc(title)}</h3>
        ${team.athletes.map(a => `
          <div class="pm-ath">
            <div class="pm-ath-head" data-p></div>
            <div class="pm-ath-info"><b>${esc(a.name)}</b><small>${esc(a.style)}</small></div>
            ${attrBars(a, team, true)}
          </div>`).join('')}
      </div>`;
    }

    app.innerHTML = `
      ${header(p.roundName ? `${t ? t.name : 'Partida'} — ${p.roundName}` : 'Pré-jogo', p.tournId ? 'tournament' : 'quickSetup')}
      <div class="pm-grid">
        ${teamCol(player, s ? s.teamName : 'Sua dupla')}
        <div class="pm-mid">
          <div class="pm-vs">VS</div>
          <div class="pm-chance">
            <label>Chance de vitória</label>
            <div class="chance-bar"><div style="width:${Math.round(chance * 100)}%"></div></div>
            <b>${U.pct(chance)}</b>
          </div>
          <div class="pm-scout">
            <div>🎭 Estilo provável: <b>${arch.name}</b></div>
            <div>💪 Fortes: ${strong.join(', ')}</div>
            <div>🎯 Fracos: ${weak.join(', ')}</div>
            ${s ? `<div>❤️ Condição da dupla: ${Math.round(s.condition)}%</div>
            <div>🤝 Entrosamento: ${Math.round(s.chem)}</div>` : ''}
            ${t ? `<div>💰 Premiação do título: ${U.money(t.prize)}</div><div>⭐ Reputação em jogo: ~${Math.round(t.repWin / t.rounds)}</div>` : ''}
          </div>
        </div>
        ${teamCol(opp, opp.name)}
      </div>
      <h3 class="strat-title">Estratégia da partida</h3>
      <div class="strat-grid" id="stratGrid">
        ${D.STRATEGIES.map(st => `
          <button class="strat-opt ${(s ? s.strategy : 'equilibrio') === st.id ? 'sel' : ''}" data-id="${st.id}">
            <span class="ic">${st.icon}</span><b>${st.name}</b><small>${st.desc}</small>
          </button>`).join('')}
      </div>
      <div class="pm-actions">
        <label class="chk"><input type="checkbox" id="chkInstant"/> Resultado instantâneo (sem animação)</label>
        <button class="btn primary big" id="btStart">🏸 Começar partida</button>
      </div>`;

    // retratos
    const heads = app.querySelectorAll('[data-p]');
    const uniP = playerUni();
    const uniO = { c1: opp.color, c2: '#ffffff' };
    player.athletes.forEach((a, i) => heads[i].appendChild(portraitEl(a, uniP, 44)));
    opp.athletes.forEach((a, i) => heads[i + 2].appendChild(portraitEl(a, uniO, 44)));

    let strategy = s ? s.strategy : 'equilibrio';
    app.querySelectorAll('.strat-opt').forEach(b => {
      b.onclick = () => {
        sfx('click');
        strategy = b.dataset.id;
        app.querySelectorAll('.strat-opt').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
      };
    });

    document.getElementById('btStart').onclick = () => {
      sfx('whistle');
      if (s) { s.strategy = strategy; G.saveGame(); }
      const playerT = G.playerTeam();
      playerT.strategy = strategy;
      const instant = document.getElementById('chkInstant').checked;
      const ctx = {
        tournId: p.tournId || null, roundName: p.roundName || null,
        isFinal: !!p.isFinal, quick: !!p.quick, theme: p.theme || (t ? t.theme : 'gymSmall'),
      };
      if (instant) {
        const m = Sim.newMatch([playerT, opp], {});
        if (G.save && G.save.moral) playerT.moralBoost = G.save.moral;
        Sim.simulateFullMatch(m);
        finishMatchFlow(m, ctx);
      } else {
        SC.show('match', { teams: [playerT, opp], ctx });
      }
    };
    bindNav();
  };

  function scaleTeam(team, mult) {
    for (const a of team.athletes) for (const k in a.attrs) {
      a.attrs[k] = Math.round(U.clamp(a.attrs[k] * mult, 5, 99));
    }
  }

  /* ---------- PARTIDA ---------- */
  SCREENS.match = function (p) {
    const t = p.ctx.tournId ? D.TOUR_BY_ID[p.ctx.tournId] : null;
    app.innerHTML = `
      <div class="match-screen">
        <div id="matchCanvasWrap"></div>
        <div id="matchHud"></div>
      </div>`;
    MatchView.start({
      teams: p.teams,
      theme: p.ctx.theme,
      title: t ? `${t.name} — ${p.ctx.roundName}` : 'Partida Rápida',
      speed: G.save ? (G.save.options.speed || 1) : 1,
      onFinish: (m) => finishMatchFlow(m, p.ctx),
    });
  };

  /* ---------- fluxo pós-partida ---------- */
  function finishMatchFlow(m, ctx) {
    const won = m.winnerSide === 0;
    let rewards = null, tourneyMsg = null, championOf = null;
    if (!ctx.quick && G.save) {
      const t = ctx.tournId ? D.TOUR_BY_ID[ctx.tournId] : null;
      rewards = G.matchRewards(won, t, { sets: m.setScores.length });
      if (t) {
        const prog = G.save.champProgress[t.id];
        if (prog && prog.alive && !prog.done) {
          if (won) {
            prog.round++;
            if (prog.round >= t.rounds) {
              prog.done = true;
              championOf = t;
              G.winTournament(t);
            } else {
              tourneyMsg = `Avançou para: ${roundNames(t.rounds)[prog.round]}!`;
            }
          } else {
            prog.alive = false;
            tourneyMsg = 'Eliminados do campeonato. Treine e tente de novo!';
          }
          G.saveGame();
        }
      }
      // histórico
      G.save.history.unshift({
        when: Date.now(), opp: m.teams[1].name, won,
        sets: m.setScores.map(s => s.join('-')).join(' · '),
        tourn: ctx.tournId,
      });
      G.save.history = G.save.history.slice(0, 20);
      G.saveGame();
    }
    SC.show('postmatch', { m, ctx, rewards, tourneyMsg, championOf });
  }

  /* ---------- ESTATÍSTICAS PÓS-PARTIDA ---------- */
  SCREENS.postmatch = function (p) {
    const { m, ctx, rewards, tourneyMsg, championOf } = p;
    const won = m.winnerSide === 0;
    const s0 = m.stats.side[0], s1 = m.stats.side[1];
    const best = Sim.bestAthlete(m);
    const bestAth = m.teams[best.side].athletes[best.ai];

    const row = (label, a, b) => `<tr><td class="${a >= b ? 'lead' : ''}">${a}</td><th>${label}</th><td class="${b >= a ? 'lead' : ''}">${b}</td></tr>`;

    // próximos desbloqueios
    let unlockHtml = '';
    if (G.save) {
      const next = D.TOURNAMENTS.filter(t => !G.tournamentUnlocked(t)).slice(0, 2);
      if (next.length) {
        unlockHtml = '<div class="pm-unlocks"><h4>Próximos desbloqueios</h4>' + next.map(t =>
          `<div>🔒 ${esc(t.name)} — faltam ⭐ ${t.reqRep - G.save.rep}</div>`).join('') + '</div>';
      }
    }

    app.innerHTML = `
      <div class="post-wrap ${won ? 'won' : 'lost'}">
        <h1 class="post-result">${championOf ? '🏆 CAMPEÕES!' : won ? '✅ VITÓRIA!' : '❌ DERROTA'}</h1>
        ${championOf ? `<div class="post-champ"><canvas id="trophyCv" width="72" height="80"></canvas><h2>${esc(championOf.name)}</h2><p>Prêmio: ${U.money(championOf.prize)}</p></div>` : ''}
        <div class="post-score">${esc(m.teams[0].name)} <b>${m.sets[0]} × ${m.sets[1]}</b> ${esc(m.teams[1].name)}
          <div class="post-sets">${m.setScores.map(s => s[0] + '-' + s[1]).join(' · ')}</div>
        </div>
        ${tourneyMsg ? `<div class="post-tmsg">${esc(tourneyMsg)}</div>` : ''}
        <table class="post-table">
          <tr><td><b>${esc(m.teams[0].name)}</b></td><th></th><td><b>${esc(m.teams[1].name)}</b></td></tr>
          ${row('Pontos vencidos', s0.points, s1.points)}
          ${row('Erros cometidos', s0.errors, s1.errors)}
          ${row('Saques bons', s0.serveGood, s1.serveGood)}
          ${row('Saques errados', s0.serveFault, s1.serveFault)}
          ${row('Aces (saque)', s0.aces, s1.aces)}
          ${row('Ataques vencedores', s0.winners, s1.winners)}
          ${row('Bolas colocadas', s0.drops, s1.drops)}
          ${row('Defesas difíceis', s0.saves, s1.saves)}
          ${row('Pontos perdidos por cansaço', s0.tiredLost, s1.tiredLost)}
          ${row('Erros por pressão', s0.pressureErr, s1.pressureErr)}
        </table>
        <div class="post-mvp">🌟 Melhor em quadra: <b>${esc(bestAth.name)}</b> (${esc(m.teams[best.side].name)}) — nota ${best.rating}</div>
        <div class="post-ratings">
          ${[0, 1].map(side => m.teams[side].athletes.map((a, i) =>
            `<span class="rating"><b>${esc(a.name)}</b> ${Sim.athleteRating(m, side, i)}</span>`).join('')).join('<span class="rating-sep">|</span>')}
        </div>
        <div class="post-info">Rali mais longo: ${m.stats.longestRally} toques</div>
        ${rewards ? `<div class="post-rewards">
          <h4>Recompensas</h4>
          <span>💰 +${U.money(rewards.money)}</span>
          <span>⭐ +${rewards.rep}</span>
          <span>🏋️ +${rewards.tp} treino</span>
          <span>🤝 +${rewards.chemXp} entrosamento</span>
        </div>` : ''}
        ${unlockHtml}
        <div class="post-actions">
          ${ctx.quick
            ? `<button class="btn primary big" data-nav="quickSetup">↩ Nova partida rápida</button><button class="btn big" data-nav="menu">🏠 Menu</button>`
            : `<button class="btn primary big" id="btBack">↩ Continuar</button>`}
        </div>
      </div>`;
    if (championOf) {
      const g = document.getElementById('trophyCv').getContext('2d');
      g.imageSmoothingEnabled = false;
      g.drawImage(Sprites.trophy(championOf.tier), 0, 0, 72, 80);
      sfx('trophy');
    } else if (won) sfx('cheer');

    const back = document.getElementById('btBack');
    if (back) back.onclick = () => {
      sfx('click');
      // evento aleatório entre partidas
      if (G.save && G.maybeTriggerEvent()) { SC.show('event'); return; }
      if (ctx.tournId) {
        const prog = G.save.champProgress[ctx.tournId];
        if (prog && prog.alive && !prog.done) { SC.show('tournament'); return; }
      }
      SC.show('campaign');
    };
    bindNav();
    if (root.Audio2) { root.Audio2.stopMusic(); root.Audio2.playMusic('menu'); }
  };

  /* ---------- EVENTO ESPECIAL ---------- */
  SCREENS.event = function () {
    const s = G.save;
    const ev = D.EVENTS.find(e => e.id === s.pendingEvent);
    if (!ev) { s.pendingEvent = null; G.saveGame(); SC.show('campaign'); return; }
    app.innerHTML = `
      ${header('Acontecimento', null)}
      <div class="event-card">
        <div class="ev-icon">${ev.icon}</div>
        <h3>${esc(ev.name)}</h3>
        <p>${esc(ev.text)}</p>
        <div class="ev-opts">
          ${ev.opts.map((o, i) => `<button class="btn big" data-i="${i}">${esc(o.label)}</button>`).join('')}
        </div>
      </div>`;
    app.querySelectorAll('[data-i]').forEach(b => {
      b.onclick = () => {
        sfx('click');
        const r = G.resolveEvent(ev.id, +b.dataset.i);
        if (r.msg) toast(r.msg);
        SC.show('campaign');
      };
    });
  };

  /* ---------- TREINO ---------- */
  SCREENS.training = function () {
    const s = G.save;
    const uni = playerUni();
    let sel = 0, heavy = false;

    function render() {
      const ath = s.athletes[sel];
      app.innerHTML = `
        ${header('Treinamento', 'campaign')}
        <div class="train-top">
          <div class="train-tabs">
            ${s.athletes.map((a, i) => `<button class="btn tab ${i === sel ? 'sel' : ''}" data-a="${i}">${esc(a.name)}</button>`).join('')}
          </div>
          <label class="chk heavy" title="Treino pesado: mais evolução, mais cansaço">
            <input type="checkbox" id="chkHeavy" ${heavy ? 'checked' : ''}/> 🔥 Treino pesado (+1 ganho, -8% condição)
          </label>
        </div>
        <div class="train-grid">
          ${D.TRAININGS.map(tr => {
            const v = ath.attrs[tr.attr];
            const cost = G.trainCost(v);
            const gain = G.trainGain(ath) + (heavy ? 1 : 0);
            return `<div class="train-card">
              <div class="tc-ic">${tr.icon}</div>
              <b>${tr.name}</b>
              <small>${esc(tr.desc)}</small>
              <div class="tc-val">${D.ATTR_NAME[tr.attr]}: <b>${v}</b> → ${Math.min(99, v + gain)}</div>
              <button class="btn small primary" data-tr="${tr.attr}" ${s.tp < cost || v >= 99 ? 'disabled' : ''}>Treinar (${cost} 🏋️)</button>
            </div>`;
          }).join('')}
          <div class="train-card chem">
            <div class="tc-ic">🤝</div>
            <b>Treino de Entrosamento</b>
            <small>Movimentação em dupla, cobertura e sincronia.</small>
            <div class="tc-val">Entrosamento: <b>${Math.round(s.chem)}</b> → ${Math.min(100, Math.round(s.chem) + (heavy ? 5 : 3))}</div>
            <button class="btn small primary" id="btChem" ${s.tp < 2 || s.chem >= 100 ? 'disabled' : ''}>Treinar (2 🏋️)</button>
          </div>
          <div class="train-card rest">
            <div class="tc-ic">😴</div>
            <b>Descansar</b>
            <small>Recupera 25% de condição física antes de partidas importantes.</small>
            <div class="tc-val">Condição: <b>${Math.round(s.condition)}%</b></div>
            <button class="btn small" id="btRest" ${s.condition >= 100 ? 'disabled' : ''}>Descansar</button>
          </div>
        </div>`;
      app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { sel = +b.dataset.a; sfx('click'); render(); });
      document.getElementById('chkHeavy').onchange = (e) => { heavy = e.target.checked; render(); };
      app.querySelectorAll('[data-tr]').forEach(b => {
        b.onclick = () => {
          const r = G.applyTraining(s.athletes[sel], b.dataset.tr, heavy);
          if (!r.ok) { sfx('error'); toast(r.msg); return; }
          sfx('train');
          toast(`+${r.gain} ${D.ATTR_NAME[b.dataset.tr]}!`);
          render();
        };
      });
      document.getElementById('btChem').onclick = () => {
        const r = G.trainChem(heavy);
        if (!r.ok) { sfx('error'); toast(r.msg); return; }
        sfx('train'); toast(`+${r.gain} entrosamento!`); render();
      };
      document.getElementById('btRest').onclick = () => { G.rest(); sfx('buy'); toast('A dupla descansou. +25% condição.'); render(); };
      bindNav();
    }
    render();
    if (root.Audio2) root.Audio2.playMusic('train');
  };

  /* ---------- HABILIDADES ---------- */
  SCREENS.skills = function () {
    const s = G.save;
    let sel = 0;
    function render() {
      const ath = s.athletes[sel];
      app.innerHTML = `
        ${header('Habilidades passivas', 'campaign')}
        <div class="train-tabs">
          ${s.athletes.map((a, i) => `<button class="btn tab ${i === sel ? 'sel' : ''}" data-a="${i}">${esc(a.name)} (${a.skillPts} ✨)</button>`).join('')}
        </div>
        <p class="hint">Ganhe pontos ✨ subindo de nível (XP de partidas e treinos). Nível atual: <b>${ath.level}</b> — XP ${ath.xp}/${G.xpForLevel(ath.level)}</p>
        <div class="skill-grid">
          ${D.SKILLS.map(sk => {
            const has = ath.skills.includes(sk.id);
            return `<div class="skill-card ${has ? 'owned' : ''}">
              <div class="sk-ic">${sk.icon}</div>
              <b>${sk.name}</b>
              <small>${esc(sk.desc)}</small>
              ${has ? '<span class="sk-owned">✅ Desbloqueada</span>'
                : `<button class="btn small primary" data-sk="${sk.id}" ${ath.skillPts < 1 ? 'disabled' : ''}>Desbloquear (1 ✨)</button>`}
            </div>`;
          }).join('')}
        </div>`;
      app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { sel = +b.dataset.a; sfx('click'); render(); });
      app.querySelectorAll('[data-sk]').forEach(b => {
        b.onclick = () => {
          const r = G.unlockSkill(s.athletes[sel], b.dataset.sk);
          if (!r.ok) { sfx('error'); toast(r.msg); return; }
          sfx('buy'); toast('Habilidade desbloqueada!'); render();
        };
      });
      bindNav();
    }
    render();
  };

  /* ---------- LOJA / EQUIPAMENTOS / COSMÉTICOS ---------- */
  SCREENS.shop = function () {
    const s = G.save;
    let tab = 'equip';
    function render() {
      let body = '';
      if (tab === 'equip') {
        body = `<div class="shop-grid">` + D.EQUIPMENT.map(eq => {
          const owned = s.ownedEquip.includes(eq.id);
          let equipUi = '';
          if (owned) {
            if (eq.slot === 't') {
              const on = s.teamEquip.includes(eq.id);
              equipUi = `<button class="btn small ${on ? '' : 'primary'}" data-teq="${eq.id}">${on ? 'Remover da dupla' : 'Equipar na dupla'}</button>`;
            } else {
              equipUi = s.athletes.map((a, i) => {
                const on = a.equip.includes(eq.id);
                return `<button class="btn small ${on ? '' : 'primary'}" data-aeq="${eq.id}" data-ai="${i}">${on ? 'Tirar de ' : 'Equipar em '}${esc(a.name)}</button>`;
              }).join('');
            }
          }
          return `<div class="shop-card ${owned ? 'owned' : ''}">
            <div class="sh-ic">${eq.icon}</div>
            <b>${eq.name}</b><small>${esc(eq.desc)}</small>
            ${owned ? `<span class="sk-owned">✅ Comprado</span>${equipUi}`
              : `<button class="btn small primary" data-buy="${eq.id}" ${s.money < eq.price ? 'disabled' : ''}>Comprar (${U.money(eq.price)})</button>`}
          </div>`;
        }).join('') + '</div>';
      } else {
        const cosmetic = (list, kind, currentId) => list.map(c => {
          const owned = s.ownedCosmetics.includes(c.id);
          const active = currentId === c.id;
          return `<div class="shop-card ${owned ? 'owned' : ''} ${active ? 'active' : ''}">
            ${kind === 'uniform' ? `<div class="uni-swatch"><span style="background:${c.c1}"></span><span style="background:${c.c2}"></span></div>` : `<div class="sh-ic">${kind === 'celeb' ? '🎉' : '💫'}</div>`}
            <b>${c.name}</b>${c.desc ? `<small>${esc(c.desc)}</small>` : ''}
            ${active ? '<span class="sk-owned">✅ Em uso</span>'
              : owned ? `<button class="btn small primary" data-use="${kind}:${c.id}">Usar</button>`
              : `<button class="btn small" data-cbuy="${kind}:${c.id}" ${s.money < c.price ? 'disabled' : ''}>Comprar (${U.money(c.price)})</button>`}
          </div>`;
        }).join('');
        body = `<h3>Uniformes</h3><div class="shop-grid">${cosmetic(D.UNIFORM_COLORS, 'uniform', s.uniform)}</div>
          <h3>Comemorações</h3><div class="shop-grid">${cosmetic(D.CELEBRATIONS, 'celeb', s.celebration)}</div>
          <h3>Efeitos de batida</h3><div class="shop-grid">${cosmetic(D.TRAIL_FX, 'trail', s.trailFx)}</div>`;
      }
      app.innerHTML = `
        ${header('Loja & Equipamentos', 'campaign')}
        <div class="train-tabs">
          <button class="btn tab ${tab === 'equip' ? 'sel' : ''}" data-t="equip">🎽 Equipamentos</button>
          <button class="btn tab ${tab === 'cos' ? 'sel' : ''}" data-t="cos">🎨 Cosméticos</button>
        </div>
        ${body}`;
      app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { tab = b.dataset.t; sfx('click'); render(); });
      app.querySelectorAll('[data-buy]').forEach(b => b.onclick = () => {
        const eq = D.EQUIP_BY_ID[b.dataset.buy];
        if (s.money < eq.price) { sfx('error'); return; }
        s.money -= eq.price; s.ownedEquip.push(eq.id); G.saveGame();
        sfx('buy'); toast(eq.name + ' comprado!'); render();
      });
      app.querySelectorAll('[data-teq]').forEach(b => b.onclick = () => {
        const id = b.dataset.teq;
        const i = s.teamEquip.indexOf(id);
        if (i >= 0) s.teamEquip.splice(i, 1); else s.teamEquip.push(id);
        G.saveGame(); sfx('click'); render();
      });
      app.querySelectorAll('[data-aeq]').forEach(b => b.onclick = () => {
        const id = b.dataset.aeq, ai = +b.dataset.ai;
        const a = s.athletes[ai];
        const i = a.equip.indexOf(id);
        if (i >= 0) a.equip.splice(i, 1);
        else {
          // um mesmo item só pode estar com um atleta
          s.athletes.forEach(x => { const j = x.equip.indexOf(id); if (j >= 0) x.equip.splice(j, 1); });
          a.equip.push(id);
        }
        G.saveGame(); sfx('click'); render();
      });
      app.querySelectorAll('[data-cbuy]').forEach(b => b.onclick = () => {
        const [kind, id] = b.dataset.cbuy.split(':');
        const list = kind === 'uniform' ? D.UNIFORM_COLORS : kind === 'celeb' ? D.CELEBRATIONS : D.TRAIL_FX;
        const c = list.find(x => x.id === id);
        if (s.money < c.price) { sfx('error'); return; }
        s.money -= c.price; s.ownedCosmetics.push(id); G.saveGame();
        sfx('buy'); toast(c.name + ' desbloqueado!'); render();
      });
      app.querySelectorAll('[data-use]').forEach(b => b.onclick = () => {
        const [kind, id] = b.dataset.use.split(':');
        if (kind === 'uniform') s.uniform = id;
        else if (kind === 'celeb') s.celebration = id;
        else s.trailFx = id;
        G.saveGame(); sfx('click'); render();
      });
      bindNav();
    }
    render();
  };

  /* ---------- PERFIL ---------- */
  SCREENS.profile = function () {
    const s = G.save;
    const uni = playerUni();
    const team = G.playerTeam();
    app.innerHTML = `
      ${header('Perfil — ' + s.teamName, 'campaign')}
      <div class="prof-team">
        <div class="prof-titles">
          <h3>🏆 Títulos (${s.titles.length})</h3>
          <div class="title-shelf" id="titleShelf">${s.titles.length ? '' : '<small>Nenhum título ainda. A praça espera!</small>'}</div>
        </div>
        <div class="prof-hist">
          <h3>📜 Últimas partidas</h3>
          ${s.history.length ? s.history.slice(0, 8).map(h =>
            `<div class="hist-row ${h.won ? 'w' : 'l'}"><b>${h.won ? 'V' : 'D'}</b> vs ${esc(h.opp)} <small>${esc(h.sets)}</small></div>`).join('')
            : '<small>Nenhuma partida jogada.</small>'}
        </div>
      </div>
      <div class="prof-grid">
        ${s.athletes.map((a, i) => `
          <div class="prof-card">
            <div class="prof-head" data-ph="${i}"></div>
            <h3>${esc(a.name)} <small>(${esc(a.fullName)})</small></h3>
            <div class="prof-meta">
              <span>Estilo: ${esc(a.style)}</span><span>Nível ${a.level}</span>
              <span>Potencial ${a.pot}</span><span>Geral ${G.overall(a, team)}</span>
            </div>
            <div class="prof-meta">
              <span>✅ ${a.stats.wins} vitórias</span><span>❌ ${a.stats.losses} derrotas</span><span>🏆 ${a.stats.titles} títulos</span>
            </div>
            ${attrBars(a, team)}
            <div class="prof-skills">${a.skills.length ? a.skills.map(id => `<span class="chip">${D.SKILL_BY_ID[id].icon} ${D.SKILL_BY_ID[id].name}</span>`).join('') : '<small>Sem habilidades desbloqueadas.</small>'}</div>
            <button class="btn small" data-rn="${i}">✏️ Renomear</button>
          </div>`).join('')}
      </div>`;
    s.athletes.forEach((a, i) => {
      const head = app.querySelector(`[data-ph="${i}"]`);
      head.appendChild(portraitEl(a, uni, 64));
      head.appendChild(spritePreviewEl(a, uni, null, 3));
    });
    const shelf = document.getElementById('titleShelf');
    s.titles.forEach(tid => {
      const t = D.TOUR_BY_ID[tid];
      const cv = document.createElement('canvas');
      cv.width = 36; cv.height = 40; cv.title = t.name;
      const g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
      g.drawImage(Sprites.trophy(t.tier), 0, 0, 36, 40);
      shelf.appendChild(cv);
    });
    app.querySelectorAll('[data-rn]').forEach(b => b.onclick = () => {
      const i = +b.dataset.rn;
      const nv = prompt('Novo nome para ' + s.athletes[i].name + ':', s.athletes[i].name);
      if (nv && nv.trim()) { s.athletes[i].name = nv.trim().slice(0, 14); G.saveGame(); SC.show('profile'); }
    });
    bindNav();
  };

  /* ---------- OPÇÕES ---------- */
  SCREENS.options = function () {
    const o = G.save ? G.save.options : { volume: 0.7, music: true, sfx: true, speed: 1 };
    app.innerHTML = `
      ${header('Opções', 'menu')}
      <div class="opt-card">
        <label>🔊 Volume geral <input type="range" id="optVol" min="0" max="100" value="${Math.round(o.volume * 100)}"/></label>
        <label class="chk"><input type="checkbox" id="optMusic" ${o.music ? 'checked' : ''}/> 🎵 Música</label>
        <label class="chk"><input type="checkbox" id="optSfx" ${o.sfx ? 'checked' : ''}/> 🔔 Efeitos sonoros</label>
        <label>⏩ Velocidade padrão da partida
          <select id="optSpeed">
            <option value="1" ${o.speed === 1 ? 'selected' : ''}>Normal (1x)</option>
            <option value="2" ${o.speed === 2 ? 'selected' : ''}>Rápida (2x)</option>
            <option value="4" ${o.speed === 4 ? 'selected' : ''}>Turbo (4x)</option>
          </select>
        </label>
        <label>🌐 Idioma <select disabled><option>Português (BR)</option></select></label>
        ${G.hasSave() ? '<button class="btn danger" id="btWipe">🗑️ Apagar salvamento</button>' : ''}
      </div>`;
    const apply = () => {
      o.volume = document.getElementById('optVol').value / 100;
      o.music = document.getElementById('optMusic').checked;
      o.sfx = document.getElementById('optSfx').checked;
      o.speed = +document.getElementById('optSpeed').value;
      if (G.save) { G.save.options = o; G.saveGame(); }
      if (root.Audio2) {
        root.Audio2.setOptions(o);
        if (o.music) root.Audio2.playMusic('menu');
      }
    };
    ['optVol', 'optMusic', 'optSfx', 'optSpeed'].forEach(id =>
      document.getElementById(id).addEventListener('change', apply));
    const wipe = document.getElementById('btWipe');
    if (wipe) wipe.onclick = () => {
      if (confirm('Apagar TODO o progresso? Essa ação não pode ser desfeita.')) {
        G.deleteSave(); sfx('error'); SC.show('menu');
      }
    };
    bindNav();
  };

  /* ---------- PARTIDA RÁPIDA ---------- */
  SCREENS.quickSetup = function () {
    const hasSave = G.hasSave();
    if (hasSave && !G.save) G.loadGame();
    const themes = Object.keys(MatchView.THEMES);
    app.innerHTML = `
      ${header('Partida Rápida', 'menu')}
      <div class="opt-card">
        <label>Sua dupla
          <select id="qMe">
            ${hasSave ? `<option value="player">${esc(G.save.teamName)} (sua dupla)</option>` : ''}
            ${D.OPPONENTS.map(o => `<option value="${o.id}">${esc(o.name)} (nível ${o.tier})</option>`).join('')}
          </select>
        </label>
        <label>Adversário
          <select id="qOpp">
            ${D.OPPONENTS.map((o, i) => `<option value="${o.id}" ${i === 0 ? 'selected' : ''}>${esc(o.name)} (nível ${o.tier})</option>`).join('')}
          </select>
        </label>
        <label>Quadra
          <select id="qTheme">${themes.map(t => `<option value="${t}">${MatchView.THEMES[t].name}</option>`).join('')}</select>
        </label>
        <label>Dificuldade
          <select id="qDiff">
            <option value="0.85">Fácil</option>
            <option value="1" selected>Normal</option>
            <option value="1.15">Difícil</option>
          </select>
        </label>
        <button class="btn primary big" id="btQGo">▶ Configurar partida</button>
      </div>`;
    document.getElementById('btQGo').onclick = () => {
      sfx('click');
      const meId = document.getElementById('qMe').value;
      const oppId = document.getElementById('qOpp').value;
      const theme = document.getElementById('qTheme').value;
      const diff = +document.getElementById('qDiff').value;
      if (meId === 'player') {
        SC.show('prematch', { oppId, quick: true, theme, diffMult: diff });
      } else {
        // dupla emprestada: partida direta sem tela de comparação do save
        const me = G.makeOpponentTeam(D.OPPONENTS.find(o => o.id === meId));
        me.isPlayer = false; me.strategy = 'equilibrio';
        const opp = G.makeOpponentTeam(D.OPPONENTS.find(o => o.id === oppId));
        if (diff !== 1) scaleTeam(opp, diff);
        SC.show('match', { teams: [me, opp], ctx: { quick: true, theme } });
      }
    };
    bindNav();
  };

  /* ---------- DESAFIOS DE TREINO ---------- */
  const CHALLENGES = [
    { id: 'saque', name: 'Desafio de Saque', icon: '🚀', attr: 'sak', desc: '10 saques no alvo. Testa o saque da dupla.' },
    { id: 'defesa', name: 'Desafio de Defesa', icon: '🧤', attr: 'def', desc: 'Defender uma sequência de ataques da máquina de petecas.' },
    { id: 'ataque', name: 'Desafio de Ataque', icon: '💥', attr: 'atk', desc: 'Derrubar alvos com batidas fortes.' },
    { id: 'precisao', name: 'Desafio de Precisão', icon: '🎯', attr: 'pre', desc: 'Acertar zonas marcadas na quadra.' },
    { id: 'folego', name: 'Desafio de Fôlego', icon: '🫁', attr: 'fol', desc: 'Rali contínuo de 3 minutos sem deixar cair.' },
    { id: 'entrosamento', name: 'Desafio de Entrosamento', icon: '🤝', attr: null, desc: 'Alternância obrigatória de toques entre a dupla.' },
  ];

  SCREENS.challenges = function () {
    const s = G.save;
    app.innerHTML = `
      ${header('Desafios de treino', 'campaign')}
      <p class="hint">Desafios automáticos: o resultado depende dos atributos da dupla. Cada tentativa gasta <b>8% de condição</b> e rende pontos de treino.</p>
      <div class="train-grid">
        ${CHALLENGES.map(c => `
          <div class="train-card">
            <div class="tc-ic">${c.icon}</div>
            <b>${c.name}</b>
            <small>${esc(c.desc)}</small>
            <button class="btn small primary" data-ch="${c.id}" ${s.condition < 10 ? 'disabled' : ''}>Tentar</button>
          </div>`).join('')}
      </div>
      <div class="chal-result hidden" id="chalResult"></div>`;
    app.querySelectorAll('[data-ch]').forEach(b => {
      b.onclick = () => {
        const c = CHALLENGES.find(x => x.id === b.dataset.ch);
        runChallenge(c);
      };
    });
    bindNav();

    function runChallenge(c) {
      const rng = U.makeRng(Date.now() % 999331);
      s.condition = U.clamp(s.condition - 8, 0, 100);
      let score;
      if (c.attr) {
        const v = Math.max(G.effAttr(s.athletes[0], c.attr), G.effAttr(s.athletes[1], c.attr));
        score = U.clamp(Math.round(v / 10 + U.rand(rng, -1.5, 2)), 1, 10);
      } else {
        score = U.clamp(Math.round(s.chem / 10 + U.rand(rng, -1.5, 2)), 1, 10);
      }
      const box = document.getElementById('chalResult');
      box.classList.remove('hidden');
      box.innerHTML = `<h3>${c.icon} ${c.name}</h3><div class="chal-bar"><div style="width:0%"></div></div><div class="chal-score"></div>`;
      const fill = box.querySelector('.chal-bar div');
      const scoreEl = box.querySelector('.chal-score');
      sfx('whistle');
      let p = 0;
      const iv = setInterval(() => {
        if (!box.isConnected) { clearInterval(iv); return; }
        p += 4;
        fill.style.width = Math.min(100, p) + '%';
        if (p % 12 === 0) sfx('hit');
        if (p >= 100) {
          clearInterval(iv);
          let tpGain = score >= 8 ? 3 : score >= 5 ? 2 : 1;
          let msg = `Resultado: <b>${score}/10</b> — +${tpGain} 🏋️ pontos de treino`;
          s.tp += tpGain;
          if (c.id === 'entrosamento' && score >= 6) { s.chem = U.clamp(s.chem + 2, 0, 100); msg += ' · +2 🤝'; }
          if (score >= 9 && c.attr) {
            const a = U.pick(rng, s.athletes);
            if (a.attrs[c.attr] < 99) { a.attrs[c.attr] += 1; msg += ` · +1 ${D.ATTR_NAME[c.attr]} (${esc(a.name)})`; }
          }
          for (const a of s.athletes) G.grantAthleteXp(a, 3);
          G.saveGame();
          scoreEl.innerHTML = msg;
          sfx(score >= 8 ? 'trophy' : score >= 5 ? 'point' : 'lose');
          setTimeout(() => { if (box.isConnected && G.screen === 'challenges') SC.show('challenges'); }, 2200);
        }
      }, 60);
    }
  };

  root.Screens = SC;
})(typeof window !== 'undefined' ? window : globalThis);
