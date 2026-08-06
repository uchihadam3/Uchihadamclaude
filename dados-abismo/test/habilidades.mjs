/* ========================================================================
   AUDITORIA DE HABILIDADES — cada habilidade do jogador e cada intenção do
   inimigo é usada de verdade no motor e o EFEITO é conferido.

   Existe porque "roubar 1 dado" estava marcando o dado como usado logo antes
   de startTurn() limpar tudo e re-rolar: a habilidade rodava, escrevia no log
   e não fazia absolutamente nada. Teste que só olha o log não pega isso.

     node test/habilidades.mjs
   ===================================================================== */
import { makeRNG } from '../js/rng.js';
import { CLASSES, RESPIRAR } from '../js/data/classes.js';
import { Combat } from '../js/engine/combat.js';
import { makeDie, resetDieIds } from '../js/data/dice.js';
import { face } from '../js/data/faces.js';
import { recalcRelics, gerarOpcoes, aplicar } from '../js/engine/rewards.js';
import { satisfies, ajustarRegras } from '../js/engine/requirements.js';
import { travaAberta, travaTxt, ALTERNATIVAS, mesmaTrava, seAnulam } from '../js/data/travas.js';
import { buildWave } from '../js/engine/encounter.js';
import { MASMORRAS, ESCALADA } from '../js/data/dungeons.js';
import * as PASS from '../js/data/passivas.js';

let ok = 0, falhas = [];
const check = (cond, quem, oque, detalhe='') => {
  if (cond) { ok++; }
  else falhas.push(`${quem} · ${oque}${detalhe ? ' — ' + detalhe : ''}`);
};

/* ---------- montagem controlada ---------- */
function cenario({ classe='carrasco', bag=null, inimigos=null, faces=null }={}) {
  resetDieIds();
  const C = CLASSES[classe];
  const p = { classe, hp:100, maxHp:100, baseMaxHp:100, block:0,
              bag: bag || Array.from({length:6}, ()=>makeDie('d6','osso')),
              statuses:{}, essence:3, rerollsBase:2, relics:[], unlocked:['coroa_'+classe],
              polegar:2, gazua:1 };
  recalcRelics(p);
  const ini = inimigos || [inimigo({ hp:200 }), inimigo({ hp:200 }), inimigo({ hp:200 })];
  const cb = new Combat({ rng:makeRNG('aud'), player:p, enemies:ini, log:false });
  cb.startTurn();
  if (faces) forcarRolagem(cb, faces);
  return { cb, p, C };
}
function inimigo(o={}) {
  const hp = o.hp ?? 100;
  return { id:o.id||'alvo', uid:o.uid||('alvo#'+Math.random().toString(36).slice(2)),
           nome:o.nome||'Alvo', hp, maxHp:hp, block:o.block||0, statuses:{}, mult:1,
           trava:o.trava||null, travaCiclo:o.travaCiclo||null, aura:o.aura||null,
           explode:o.explode||0, invoca:o.invoca||null, reergue:!!o.reergue,
           padrao:o.padrao||[{t:'atk',v:5}], _ip:-1, intent:o.intent||{t:'atk',v:5} };
}
/* substitui a rolagem por valores escolhidos a dedo */
function forcarRolagem(cb, faces) {
  cb.roll = faces.map((f,i)=>{
    const d = cb.p.bag[i] || makeDie('d6','osso');
    const fc = typeof f === 'number' ? face('num', f) : f;
    return { dieId:d.id, tipo:d.tipo, n:d.n, material:d.material, face:{...fc}, faceIdx:0, die:d };
  });
  cb.used.clear();
  return cb.roll;
}
const ids = cb => cb.roll.map(e=>e.dieId);
const somaHP = cb => cb.enemies.reduce((a,e)=>a+e.hp,0);

/* =====================================================================
   1. HABILIDADES DO JOGADOR — cada uma com um encaixe que a satisfaz
   ===================================================================== */
console.log('\n=== HABILIDADES DO JOGADOR ===');

const ENCAIXES = {
  /* CARRASCO */
  decapitar : [6, 1, 1, 1],
  furia     : [6, 5, 4, 1],
  muralha   : [4, 5, 1, 1],
  carniceiro: [4, 4, 1, 1],
  /* LÂMINA */
  milcortes : [3, 3, 1, 2],
  veneno    : [4, 4, 4, 1],
  sumir     : [2, 1, 1, 1],
  enxame    : [3, 3, 3, 3],
  /* ARCANISTA */
  raio      : [3, 4, 1, 6],
  nova      : [2, 3, 4, 6],
  colapso   : [2, 3, 4, 5],
  prisma    : [1, 2, 3, 4, 5],
  /* ORÁCULA */
  tecer     : [2, 5, 1, 1],
  julgamento: [3, 4, 1, 1],
  fio       : [face('essence',0), 2, 3, 4],
  tapecaria : [1, 3, 5, 2],
  /* ===== A TRILHA (liberadas fechando masmorras) ===== */
  quebra_ossos : [4, 1, 1, 1],
  guilhotina   : [6, 5, 4, 1],
  cadafalso    : [4, 5, 6, 1],
  garganta     : [3, 3, 1, 2],
  nevoa        : [2, 3, 4, 1],
  ceifa        : [4, 4, 4, 1],
  fenda        : [3, 4, 1, 6],
  entropia     : [2, 3, 4, 6],
  singularidade: [2, 3, 4, 5],
  urdidura     : [2, 5, 1, 1],
  sentenca     : [6, 5, 1, 1],
  novelo       : [2, 4, 6, 1],
  /* universal */
  respirar  : [2, 1, 1, 1],
};

for (const [cid, C] of Object.entries(CLASSES)) {
  for (const sk of [...C.skills, RESPIRAR]) {
    const faces = ENCAIXES[sk.id];
    if (!faces) { falhas.push(`${C.nome} · ${sk.nome} — sem encaixe no teste`); continue; }
    const bag = faces.map(()=>makeDie('d6','osso'));
    const { cb, p } = cenario({ classe:cid, bag, faces });

    /* o encaixe escolhido realmente satisfaz o requisito? */
    const escolhidos = cb.roll.slice(0, faces.length);
    const alvoIdx = 0;
    let usados = null;
    for (let k = escolhidos.length; k >= 1 && !usados; k--) {
      for (const comb of combinacoes(escolhidos, k)) {
        if (satisfies(sk.req, comb)) { usados = comb; break; }
      }
    }
    check(!!usados, C.nome, sk.nome + ': encaixe válido', 'nenhum subconjunto satisfaz ' + JSON.stringify(sk.req));
    if (!usados) continue;

    const antesHP = somaHP(cb), antesBloq = p.block, antesMeuHP = p.hp;
    const antesEst = cb.enemies.map(e=>({...e.statuses}));
    const antesCirc = cb.circle.length, antesEss = p.essence;
    const antesTrava = cb.enemies.map(e=>({ arr:!!e._arrombada, off:e.travaOff||0 }));
    const antesPool = cb.pool().map(e=>e.face.v);

    const r = cb.use(sk, usados.map(e=>e.dieId), alvoIdx);
    check(r.ok, C.nome, sk.nome + ': use() aceito', r.err||'');
    if (!r.ok) continue;

    /* consumiu exatamente os dados alocados? */
    check(usados.every(e=>cb.used.has(e.dieId)), C.nome, sk.nome + ': gastou os dados');

    /* o efeito declarado aconteceu de fato? */
    const ops = new Set((sk.eff||[]).map(e=>e.op));
    const depoisEst = cb.enemies.map(e=>({...e.statuses}));
    if (ops.has('dmg') || ops.has('hits'))
      check(somaHP(cb) < antesHP, C.nome, sk.nome + ': causou dano',
            `HP total ${antesHP} → ${somaHP(cb)}`);
    if (ops.has('block'))
      check(p.block > antesBloq, C.nome, sk.nome + ': deu bloqueio', `${antesBloq} → ${p.block}`);
    if (ops.has('status'))
      check(depoisEst.some((e,i)=>Object.keys(e).some(k=>(e[k]||0) > (antesEst[i][k]||0))),
            C.nome, sk.nome + ': aplicou estado');
    if (ops.has('selfStatus'))
      check(Object.values(p.statuses).some(v=>v>0), C.nome, sk.nome + ': aplicou estado em você');
    if (ops.has('selfdmg'))
      check(p.hp < antesMeuHP, C.nome, sk.nome + ': cobrou HP', `${antesMeuHP} → ${p.hp}`);
    if (ops.has('essence'))
      check(p.essence > antesEss, C.nome, sk.nome + ': deu essência');
    if (ops.has('bank'))
      check(cb.circle.length > antesCirc, C.nome, sk.nome + ': mandou dado ao Círculo');
    if (ops.has('arrombar'))
      check(cb.enemies.some((e,i)=>e._arrombada && !antesTrava[i].arr),
            C.nome, sk.nome + ': arrombou a fechadura');
    if (ops.has('dissolver'))
      check(cb.enemies.some((e,i)=>(e.travaOff||0) > antesTrava[i].off),
            C.nome, sk.nome + ': dissolveu a fechadura');
    if (ops.has('marcar'))
      check(cb.enemies.some(e=>e.statuses.marca), C.nome, sk.nome + ': marcou o alvo');
    if (ops.has('wildify'))
      check(cb.pool().some(e=>e.face.k==='wild'), C.nome, sk.nome + ': criou um ◈ Curinga');
    if (ops.has('ajustar') || ops.has('definir')) {
      const agora = cb.pool().map(e=>e.face.v);
      check(JSON.stringify(agora) !== JSON.stringify(antesPool.slice(0, agora.length)),
            C.nome, sk.nome + ': mexeu num dado da mão', `${antesPool} → ${agora}`);
    }
  }
}
function* combinacoes(arr, k, ini=0, cur=[]) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = ini; i < arr.length; i++) { cur.push(arr[i]); yield* combinacoes(arr, k, i+1, cur); cur.pop(); }
}

/* =====================================================================
   2. PASSIVAS DE CLASSE E FERRAMENTAS DO COFRE
   ===================================================================== */
console.log('=== PASSIVAS E FERRAMENTAS ===');
{
  const { cb, p } = cenario({ classe:'carrasco', faces:[3,3,3,3,3,3] });
  const v0 = cb.roll[0].face.v, hp0 = p.hp;
  check(cb.sobrecarga(cb.roll[0].dieId) && cb.roll[0].face.v === v0+1 && p.hp < hp0,
        'Carrasco', 'Sobrecarga: +1 no dado cobrando HP');
}
{
  const { cb } = cenario({ classe:'lamina', faces:[2,2,2,2,2,2] });
  const e = cb.roll[0];
  check(cb.trapaca(e.dieId) && e.face.v === 5, 'Lâmina', 'Trapaça: 2 → 5 (face oposta)');
  check(cb.trapaca(cb.roll[1].dieId) === false, 'Lâmina', 'Trapaça: 1×/turno');
}
{
  const { cb } = cenario({ classe:'arcanista', faces:[4,4,4,4,4,4] });
  const id = cb.roll[0].dieId;
  check(cb.guardar(id) && cb.circle.length === 1 && cb.used.has(id),
        'Arcanista', 'Canalização: guarda no Círculo');
  const guardados = cb.circle.length + cb.pool().length;   // guardado + o que vai sobrar
  cb.endTurn();
  check(cb.roll.some(e=>e.banked), 'Arcanista', 'Canalização: o dado VOLTA no turno seguinte');
  // o Círculo fechado PROTEGE enquanto acumula — era a única sobra sem retorno
  check(cb.p.block >= guardados, 'Arcanista',
        'Canalização: o Círculo dá bloqueio no turno seguinte',
        `bloqueio ${cb.p.block} para ${guardados} dados guardados`);
}
{
  const { cb } = cenario({ classe:'oracula', faces:[6,1,1,1,1,1] });
  const e = cb.roll[0];
  check(cb.travar(e.dieId), 'OráculA', 'Prever: trava o dado');
  cb.endTurn();
  const dep = cb.roll.find(x=>x.dieId === e.dieId);
  check(dep && dep.face.v === 6, 'OráculA', 'Prever: o dado VOLTA no 6', dep ? 'veio '+dep.face.v : 'sumiu');
}
{
  const { cb } = cenario({ faces:[3,3,3,3,3,3] });
  const id = cb.roll[0].dieId;
  check(cb.polegar(id, +1) && cb.roll[0].face.v === 4, 'Cofre', 'Polegar Torto: empurra +1');
  check(cb.polegar(id, -1) && cb.roll[0].face.v === 3, 'Cofre', 'Polegar Torto: empurra −1');
  check(cb.polegar(id, +1) === false, 'Cofre', 'Polegar Torto: acaba os usos do turno');
}
{
  const { cb } = cenario({ inimigos:[inimigo({ trava:{t:'chave',v:99}, hp:200 })], faces:[6,6,6,6] });
  check(cb.gazua(0) && cb.enemies[0]._arrombada, 'Cofre', 'Gazua: arromba a fechadura');
  check(cb.gazua(0) === false, 'Cofre', 'Gazua: acaba os usos do combate');
}

/* =====================================================================
   3. FECHADURAS — a errada zera o dano, a certa passa
   ===================================================================== */
console.log('=== FECHADURAS ===');
const CASOS = [
  { t:{t:'impar'},           abre:[5],       fecha:[6]      },
  { t:{t:'par'},             abre:[6],       fecha:[5]      },
  { t:{t:'forte',v:4},       abre:[5],       fecha:[3]      },
  { t:{t:'fraco',v:3},       abre:[2],       fecha:[6]      },
  { t:{t:'chave',v:7},       abre:[3,4],     fecha:[3,5]    },
  { t:{t:'multiplo',v:3},    abre:[6],       fecha:[5]      },
  { t:{t:'enxuto',v:1},      abre:[5],       fecha:[3,4]    },
  { t:{t:'farto',v:2},       abre:[3,4],     fecha:[5]      },
  { t:{t:'simbolo',v:'blade'},abre:[face('blade',5)], fecha:[5] },
  { t:{t:'distintos'},       abre:[2,3,5],   fecha:[3,3]    },
  { t:{t:'iguais',v:2},      abre:[4,4],     fecha:[4,5]    },
  { t:{t:'faixa',v:[8,12]},  abre:[4,6],     fecha:[2,3]    },
  { t:{t:'primo'},           abre:[3,4],     fecha:[3,5]    },
];
const REQ_N = n => ({ t:'any', count:n });
for (const c of CASOS) {
  for (const [rot, faces, deviaDoer] of [['abre', c.abre, true], ['fecha', c.fecha, false]]) {
    const bag = faces.map(()=>makeDie('d6','osso'));
    const { cb } = cenario({ bag, faces, inimigos:[inimigo({ hp:300, trava:c.t })] });
    const hp0 = cb.enemies[0].hp;
    const golpe = { id:'t', nome:'teste', req:REQ_N(faces.length),
                    eff:[{op:'dmg',tgt:'chosen',amt:'sum+5'}] };
    cb.use(golpe, cb.roll.slice(0,faces.length).map(e=>e.dieId), 0);
    const doeu = cb.enemies[0].hp < hp0;
    check(doeu === deviaDoer, 'Fechadura ' + c.t.t + (c.t.v!==undefined?' '+c.t.v:''),
          rot === 'abre' ? 'o golpe certo FERE' : 'o golpe errado dá ZERO',
          `HP ${hp0} → ${cb.enemies[0].hp}`);
  }
}
{ /* veneno atravessa fechadura */
  const { cb } = cenario({ classe:'lamina', faces:[4,4,4,1],
                           inimigos:[inimigo({ hp:300, trava:{t:'chave',v:99} })] });
  cb.enemies[0].statuses.veneno = 5;
  const hp0 = cb.enemies[0].hp;
  cb.tickStatuses();
  check(cb.enemies[0].hp < hp0, 'Fechadura', 'veneno IGNORA a fechadura', `HP ${hp0} → ${cb.enemies[0].hp}`);
}

/* =====================================================================
   4. INTENÇÕES DOS INIMIGOS — cada uma tem que MUDAR alguma coisa
   ===================================================================== */
console.log('=== INTENÇÕES DOS INIMIGOS ===');
function turnoInimigo(intent, prep) {
  const bag = [makeDie('d6','osso'), makeDie('d6','osso'), makeDie('d6','osso')];
  const { cb, p } = cenario({ bag, faces:[6,4,2],
    inimigos:[inimigo({ hp:120, intent, padrao:[intent] }),
              inimigo({ hp:40, nome:'Ferido', intent:{t:'block',v:1}, padrao:[{t:'block',v:1}] })] });
  cb.enemies[1].maxHp = 100;                 // ferido de verdade, senão curar é no-op
  if (prep) prep(cb, p);
  const antes = {
    hp:p.hp, bloco:cb.enemies[0].block, hpFerido:cb.enemies[1].hp,
    faces:p.bag.map(d=>d.faces.map(f=>f.k+f.v).join(',')),
    estados:{...p.statuses}, frenesi:cb.enemies.some(e=>e.statuses.frenesi),
    nBag:p.bag.length,
  };
  cb.endTurn();                      // enemyTurn roda aqui dentro
  return { cb, p, antes, roll:cb.roll };
}
{
  const { p, antes } = turnoInimigo({ t:'atk', v:9 });
  check(p.hp < antes.hp, 'atk', 'tira HP', `${antes.hp} → ${p.hp}`);
}
{
  const { p, antes } = turnoInimigo({ t:'atk_multi', v:4, n:3 });
  check(p.hp <= antes.hp - 10, 'atk_multi', 'tira HP dos 3 golpes', `${antes.hp} → ${p.hp}`);
}
{
  /* O bloqueio DELE tem que sobreviver ao seu turno inteiro — senão não serve
     pra nada. Aqui: ele bloqueia, você bate, e o bloqueio apara o golpe. */
  const { cb, p } = turnoInimigo({ t:'block', v:20 });
  check(cb.enemies[0].block === 20, 'block', 'o bloqueio SOBREVIVE ao fim do turno dele',
        'ficou ' + cb.enemies[0].block);
  const hp0 = cb.enemies[0].hp;
  forcarRolagem(cb, [5, 5, 5]);
  const golpe = { id:'t', nome:'t', req:{t:'any',count:1}, eff:[{op:'dmg',tgt:'chosen',amt:'8'}] };
  cb.use(golpe, [cb.roll[0].dieId], 0);
  check(cb.enemies[0].hp === hp0 && cb.enemies[0].block === 12,
        'block', 'ele APARA o seu golpe (8 de 20)',
        `HP ${hp0}→${cb.enemies[0].hp}, bloqueio 20→${cb.enemies[0].block}`);
  /* ele bloqueia todo turno: o de ontem tem que EXPIRAR, não empilhar */
  cb.enemies[0].block = 20;                 // desfaz o que o golpe aparou
  cb.endTurn();
  check(cb.enemies[0].block === 20, 'block', 'expira quando ele volta a agir (não empilha)',
        'ficou ' + cb.enemies[0].block + ', empilhado daria 40');
}
{
  const { cb, antes } = turnoInimigo({ t:'heal', v:15 });
  check(cb.enemies[1].hp > antes.hpFerido, 'heal', 'cura o aliado mais ferido',
        `${antes.hpFerido} → ${cb.enemies[1].hp}`);
}
{
  const { cb } = turnoInimigo({ t:'buff' });
  check(cb.enemies.some(e=>e.statuses.frenesi), 'buff', 'aplica frenesi no grupo');
}
{
  const { p, antes } = turnoInimigo({ t:'curse' });
  const agora = p.bag.map(d=>d.faces.map(f=>f.k+f.v).join(','));
  check(JSON.stringify(agora) !== JSON.stringify(antes.faces), 'curse', 'estraga uma face da Bolsa');
  check(p.bag.some(d=>d.faces.some(f=>f.k==='void')), 'curse', 'a face vira ☠ Vazio');
}
{
  const { p } = turnoInimigo({ t:'debuff', st:'queimadura', v:3 });
  check((p.statuses.queimadura|0) > 0, 'debuff', 'aplica o estado em você');
}
{
  const { p, roll } = turnoInimigo({ t:'congelar' });
  const congelado = p.bag.filter(d=>d._congelado);
  check(congelado.length === 1, 'congelar', 'o dado fica congelado pro próximo turno',
        `${congelado.length} congelado(s)`);
  const e = roll.find(x=>x.die && x.die._congelado);
  check(!!e && e.face.v === e.die._congeladoFace.v,
        'congelar', 'e ele ROLA na face travada');
}
{
  const { p, roll, antes } = turnoInimigo({ t:'roubar' });
  check(roll.length === antes.nBag - 1, 'roubar', 'a próxima rolagem tem 1 dado A MENOS',
        `${antes.nBag} → ${roll.length}`);
  check(p.bag.length === antes.nBag, 'roubar', 'o dado volta pra Bolsa (só perde o turno)');
}
{
  const { p, antes } = turnoInimigo({ t:'fraturar' });
  const maxAntes = antes.faces.map(f=>f);
  const mudou = p.bag.map(d=>d.faces.map(f=>f.k+f.v).join(',')).some((f,i)=>f !== maxAntes[i]);
  check(mudou, 'fraturar', 'o máximo de um dado cai de vez');
}
{
  const { roll } = turnoInimigo({ t:'inverter' });
  const inv = roll.find(x=>x.die && x.die._congelado);
  check(!!inv && inv.face.v === 1, 'inverter', 'o melhor dado (6) volta travado no 1',
        inv ? 'veio ' + inv.face.v : 'nenhum dado travado');
}
{
  const bag = [makeDie('d6','osso')];
  const { cb, p } = cenario({ bag, faces:[3],
    inimigos:[inimigo({ hp:200, intent:{t:'contar', v:30, ate:2}, padrao:[{t:'contar',v:30,ate:2}] })] });
  const hp0 = p.hp;
  cb.endTurn();
  check(p.hp === hp0, 'contar', 'na 1ª contagem não bate');
  cb.endTurn();
  check(p.hp < hp0, 'contar', 'quando a conta fecha, a pá desce', `${hp0} → ${p.hp}`);
}

/* =====================================================================
   5. CICLO DE FECHADURA DO CHEFE
   ===================================================================== */
console.log('=== CICLO DO CHEFE ===');
{
  const ciclo = [{t:'forte',v:5},{t:'impar'},{t:'chave',v:9}];
  const { cb } = cenario({ faces:[1,1,1,1],
    inimigos:[inimigo({ hp:400, travaCiclo:ciclo, intent:{t:'block',v:1}, padrao:[{t:'block',v:1}] })] });
  const vistas = [];
  for (let i = 0; i < 4; i++) { vistas.push(cb.travaDe(cb.enemies[0]).t); cb.endTurn(); }
  check(vistas.join(',') === 'forte,impar,chave,forte', 'OSSÁRIO',
        'a fechadura gira a cada turno', vistas.join(' → '));
}

/* =====================================================================
   6. AS 10 MASMORRAS — toda onda tem que ser montável e vencível
   ===================================================================== */
console.log('=== AS 10 MASMORRAS ===');
{
  const { MASMORRAS } = await import('../js/data/dungeons.js');
  const { buildWave, burdensFor } = await import('../js/engine/encounter.js');
  const { travaTxt } = await import('../js/data/travas.js');
  check(Object.keys(MASMORRAS).length === 10, 'Conteúdo', 'as 10 masmorras existem',
        Object.keys(MASMORRAS).length + ' definidas');
  const vistos = new Set();
  for (const k of Object.keys(MASMORRAS)) {
    const M = MASMORRAS[k];
    const todos = [...M.comuns, ...M.elites, M.subchefe, M.chefe];
    check(M.comuns.length === 8 && M.elites.length === 3, 'M'+k, '8 comuns + 3 elites',
          `${M.comuns.length}+${M.elites.length}`);
    let idsOk = true, travaOk = true, padraoOk = true;
    for (const e of todos) {
      if (!e.id || !e.nome || !e.hp || vistos.has(e.id)) idsOk = false;
      vistos.add(e.id);
      if (e.trava && !travaTxt(e.trava)) travaOk = false;
      for (const t of (e.travaCiclo||[])) if (!travaTxt(t)) travaOk = false;
      if (!e.padrao || !e.padrao.length) padraoOk = false;
    }
    check(idsOk,    'M'+k, 'ids únicos, com nome e HP');
    check(travaOk,  'M'+k, 'toda fechadura é de um tipo que existe');
    check(padraoOk, 'M'+k, 'todo inimigo tem padrão de intenção');
    /* a onda monta em todos os 10 andares? */
    let ondaOk = true;
    for (let a = 1; a <= 10; a++) {
      const w = buildWave(+k, a, makeRNG('w'+k+'-'+a));
      if (!w.length || w.some(e=>!e.hp || !e.nome)) ondaOk = false;
    }
    check(ondaOk, 'M'+k, 'as ondas dos 10 andares montam');
    /* existe algum golpe capaz de ferir CADA inimigo? (nada invencível) */
    let feriveis = true, culpado = '';
    for (const e of todos) {
      const t = e.trava || (e.travaCiclo && e.travaCiclo[0]);
      if (!t) continue;
      const alvo = { ...e, uid:'x', maxHp:e.hp, block:0, statuses:{}, mult:1 };
      const bag = [makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso'),
                   makeDie('d6','osso'),makeDie('d6','osso')];
      let achou = false;
      /* varre mãos de até 4 dados. Inclui faces de SÍMBOLO porque o jogador
         grava ⚔/🛡/✦ nas recompensas — sem isso nenhum Selo abriria. */
      const VAL = [1,2,3,4,5,6, face('blade',4), face('shield',4), face('essence',0)];
      for (let a1=0;a1<VAL.length && !achou;a1++) for (let b1=-1;b1<VAL.length && !achou;b1++)
      for (let c1=-1;c1<VAL.length && !achou;c1++) for (let d1=-1;d1<VAL.length && !achou;d1++) {
        const mao=[a1,b1,c1,d1].filter(x=>x>=0).map(i=>VAL[i]);
        const { cb } = cenario({ bag, faces:mao.concat([1]), inimigos:[{...alvo, hp:999, maxHp:999}] });
        const golpe = { id:'t', nome:'t', req:{t:'any',count:mao.length},
                        eff:[{op:'dmg',tgt:'chosen',amt:'sum+5'}] };
        cb.use(golpe, cb.roll.slice(0,mao.length).map(x=>x.dieId), 0);
        if (cb.enemies[0].hp < 999) achou = true;
      }
      if (!achou && t.t !== 'casal') { feriveis = false; culpado = e.nome + ' (' + t.t + ')'; }
    }
    check(feriveis, 'M'+k, 'nenhum inimigo é invencível com 5 d6', culpado);
  }
  check(vistos.size === 130, 'Conteúdo', '130 inimigos com id único', vistos.size + ' encontrados');
}

/* =====================================================================
   7. PROMESSAS DA CARTA — o que está escrito TEM que acontecer
   Nasceu de uma auditoria que achou 15 mecânicas declaradas nos dados e
   nunca lidas pelo motor: explode, invoca, reergue, 5 auras, 4 nós do
   Cofre e 2 fardos. Carta que mente é pior que carta fraca.
   ===================================================================== */
console.log('=== PROMESSAS DA CARTA ===');
{
  const { criarInimigo } = await import('../js/engine/encounter.js');
  /* EXPLODE */
  {
    const { cb, p } = cenario({ faces:[6,1,1,1],
      inimigos:[inimigo({ hp:5, nome:'Bomba' })] });
    cb.enemies[0].explode = 20;
    const hp0 = p.hp;
    cb.use({ id:'t',nome:'t',req:{t:'any',count:1},eff:[{op:'dmg',tgt:'chosen',amt:'99'}] },
           [cb.roll[0].dieId], 0);
    check(p.hp < hp0, 'explode', 'inimigo explode ao morrer', `${hp0} → ${p.hp}`);
  }
  /* INVOCA */
  {
    const { cb } = cenario({ faces:[1,1,1],
      inimigos:[inimigo({ hp:200, nome:'Chefe', intent:{t:'atk',v:1}, padrao:[{t:'atk',v:1}] })] });
    cb.enemies[0].invoca = ['osso_solto'];
    cb.onInvocar = id => criarInimigo(1, 1, id, makeRNG('inv'));
    const n0 = cb.enemies.length;
    cb.endTurn();
    check(cb.enemies.length > n0, 'invoca', 'o subchefe chama reforço',
          `${n0} → ${cb.enemies.length}`);
  }
  /* REERGUE */
  {
    const { cb } = cenario({ faces:[1,1,1],
      inimigos:[inimigo({ hp:200, nome:'Chefe', intent:{t:'atk',v:1}, padrao:[{t:'atk',v:1}] }),
                inimigo({ hp:0, nome:'Lacaio' })] });
    cb.enemies[0].reergue = true;
    cb.enemies[1].maxHp = 40;
    cb.endTurn();
    check(cb.enemies[1].hp > 0, 'reergue', 'o chefe levanta o lacaio caído',
          'HP do lacaio: ' + cb.enemies[1].hp);
  }
  /* AURAS */
  {
    const { cb, p } = cenario({ faces:[1,1,1],
      inimigos:[inimigo({ hp:200, aura:{id:'cura_colmeia'}, intent:{t:'block',v:1}, padrao:[{t:'block',v:1}] })] });
    cb.enemies[0].hp = 100;
    cb.endTurn();
    check(cb.enemies[0].hp > 100, 'aura cura_colmeia', 'inimigos se curam por turno',
          '100 → ' + cb.enemies[0].hp);
  }
  {
    const { cb, p } = cenario({ faces:[1,1,1],
      inimigos:[inimigo({ hp:200, aura:{id:'cura_salgada'} })] });
    p.hp = 50;
    const c = cb.curarJogador(20);
    check(c === 10, 'aura cura_salgada', 'cura recebida cai pela metade', 'curou ' + c);
  }
  {
    const { cb, p } = cenario({ faces:[3,3,3],
      inimigos:[inimigo({ hp:200, aura:{id:'preco_alto'} })] });
    const hp0 = p.hp;
    cb.use({ id:'t',nome:'t',req:{t:'any',count:1},eff:[{op:'block',amt:'1'}] }, [cb.roll[0].dieId], 0);
    check(p.hp === hp0-1, 'aura preco_alto', 'toda habilidade custa 1 HP a mais', `${hp0} → ${p.hp}`);
  }
  {
    const { cb, p } = cenario({ faces:[3],
      bag:[makeDie('d6','osso')],
      inimigos:[inimigo({ hp:200, aura:{id:'sem_sobra'}, intent:{t:'block',v:1}, padrao:[{t:'block',v:1}] })] });
    cb.use({ id:'t',nome:'t',req:{t:'any',count:1},eff:[{op:'block',amt:'1'}] }, [cb.roll[0].dieId], 0);
    const hp0 = p.hp;
    cb.endTurn();
    check(p.hp < hp0, 'aura sem_sobra', 'terminar sem sobra dói', `${hp0} → ${p.hp}`);
  }
  {
    const d = makeDie('d6','osso');
    d.faces = d.faces.map(()=>face('num',1));            // rola 1 na certa
    const { cb, p } = cenario({ bag:[d],
      inimigos:[inimigo({ hp:200, aura:{id:'um_amaldicoa'} })] });
    cb.startTurn();
    check(p.bag[0].faces.some(f=>f.k==='void'), 'aura um_amaldicoa',
          'rolar 1 amaldiçoa a face');
  }
  /* NÓS DO COFRE */
  {
    const { cb, p } = cenario({ faces:[1,1,1] });
    p.revive = 0.5;
    p.hp = 3;
    cb.dmgPlayer(50, 'teste'); cb.checkEnd();
    check(cb.over !== 'lose' && p.hp > 0, 'Cofre · Segundo Fôlego',
          'revive uma vez em vez de morrer', 'HP ' + p.hp);
    p.hp = 1; cb.dmgPlayer(50, 'teste'); cb.checkEnd();
    check(cb.over === 'lose', 'Cofre · Segundo Fôlego', 'e só funciona UMA vez');
  }
  {
    const { cb, p } = cenario({ faces:[1,1,1] });
    p.ultimoLance = true;
    check(cb.ultimoLance() === true, 'Cofre · Último Lance', 'rola a mesa inteira de graça');
    check(cb.ultimoLance() === false, 'Cofre · Último Lance', 'e só 1× por combate');
    check(cb.rerolls === Math.max(0, p.rerollsBase), 'Cofre · Último Lance',
          'sem gastar re-rolagem');
  }
  {
    const estado = { bag:[makeDie('d6','osso')], relics:[], hp:50, maxHp:50, gravExtra:2 };
    recalcRelics(estado);
    const { gerarOpcoes, aplicar } = await import('../js/engine/rewards.js');
    const antes = estado.bag[0].faces.filter(f=>f.k==='num').length;
    aplicar({ t:'grav', g:'g_blade', alvo:{ id:estado.bag[0].id, i:0 } }, estado, makeRNG('g'));
    const dep = estado.bag[0].faces.filter(f=>f.k==='blade').length;
    check(dep >= 2, 'Cofre · Forja Antiga', 'a gravação pega faces extras',
          dep + ' faces ⚔ gravadas');
  }
  /* FARDOS */
  {
    const { cb } = cenario({ faces:[1,1,1] });
    const cb2 = new Combat({ rng:makeRNG('f'), player:cb.p, enemies:[inimigo({})],
                             burdens:['dado_enferrujado'], log:false });
    cb2.startTurn();
    check(cb2.roll.some(e=>e.ferrugem), 'Fardo M3', 'um dado Enferrujado entra na rolagem');
  }
  {
    const bag = [makeDie('d6','osso'), makeDie('d6','osso'), makeDie('d6','osso')];
    const p2 = { classe:'carrasco', hp:100, maxHp:100, baseMaxHp:100, block:0, bag,
                 statuses:{}, essence:0, rerollsBase:1, relics:[], unlocked:[] };
    recalcRelics(p2);
    const cb3 = new Combat({ rng:makeRNG('r'), player:p2, enemies:[inimigo({})],
                             burdens:['rouba_dado'], log:false });
    cb3.startTurn();
    check(cb3.roll.length === bag.length-1, 'Fardo M7', 'eles tomam um dado seu no combate',
          `${bag.length} → ${cb3.roll.length}`);
  }
}

/* =====================================================================
   8. RELÍQUIAS — os 26 efeitos precisam existir de verdade
   ===================================================================== */
console.log('=== RELÍQUIAS ===');
{
  const { RELIQUIAS } = await import('../js/data/relics.js');
  check(RELIQUIAS.length === 26, 'Relíquias', '26 no catálogo', RELIQUIAS.length + '');
  const comRel = (rel, extra={}) => {
    const bag = extra.bag || [makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso')];
    const p = { classe:'carrasco', hp:100, maxHp:100, baseMaxHp:100, block:0, bag,
                statuses:{}, essence:0, rerollsBase:1, relics:[rel], unlocked:[] };
    recalcRelics(p);
    const cb = new Combat({ rng:makeRNG('rel'), player:p,
      enemies:[inimigo({ hp:400, intent:{t:'atk',v:1}, padrao:[{t:'atk',v:1}] })], log:false });
    cb.startTurn();
    return { cb, p };
  };
  const acha = id => RELIQUIAS.find(r=>r.id===id);
  /* onRoll · Moeda Torta */
  {
    const d = makeDie('d6','osso'); d.faces = d.faces.map(()=>face('num',1));
    const { cb } = comRel(acha('moeda_torta'), { bag:[d] });
    check(cb.roll[0].face.v === 2, 'Moeda Torta', 'dado que rola 1 vale 2', 'veio ' + cb.roll[0].face.v);
  }
  /* onRoll · Dente de Leite */
  {
    const d = makeDie('d6','osso'); d.faces = d.faces.map(()=>face('blade',3));
    const { cb } = comRel(acha('dente_leite'), { bag:[d,makeDie('d6','osso')] });
    check(cb._laminasRoladas > 0, 'Dente de Leite', 'conta as ⚔ roladas',
          cb._laminasRoladas + ' lâminas');
  }
  /* onTurn · Linha de Prata — o bloqueio protege DURANTE o turno inimigo,
     então o que se mede é o dano que deixou de passar. */
  {
    const golpe = { t:'atk', v:10 };
    const medir = (rel)=>{
      const bag=[makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso')];
      const p={ classe:'carrasco', hp:100, maxHp:100, baseMaxHp:100, block:0, bag,
                statuses:{}, essence:0, rerollsBase:1, relics:rel?[rel]:[], unlocked:[] };
      recalcRelics(p);
      const cb=new Combat({ rng:makeRNG('lp'), player:p,
        enemies:[inimigo({ hp:400, intent:golpe, padrao:[golpe] })], log:false });
      cb.startTurn(); cb.endTurn();
      return 100 - p.hp;
    };
    const com = medir(acha('linha_prata')), sem = medir(null);
    check(com < sem, 'Linha de Prata', 'dado não usado vira bloqueio e apara o golpe',
          `sofreu ${sem} sem a relíquia, ${com} com ela`);
  }
  /* flag · Olho de Vidro */
  {
    const { cb } = comRel(acha('olho_vidro'));
    check(cb.roll.some(e=>e.face.v === 6), 'Olho de Vidro', 'um dado vem no melhor valor',
          cb.roll.map(e=>e.face.v).join(','));
  }
  /* flag · Raiz Amarga */
  {
    const { cb } = comRel(acha('raiz_amarga'));
    cb.enemies[0].statuses.veneno = 5;
    cb.tickStatuses();
    check(cb.enemies[0].statuses.veneno === 5, 'Raiz Amarga', 'o veneno NÃO decai',
          'ficou ' + cb.enemies[0].statuses.veneno);
  }
  /* flag · Ampulheta Rachada */
  {
    const { cb, p } = comRel(acha('ampulheta'));
    const hp0 = p.hp;
    cb.endTurn();
    check(p.hp === hp0, 'Ampulheta Rachada', 'no 1º turno eles NÃO agem (você joga de novo)',
          `${hp0} → ${p.hp}`);
    cb.endTurn();
    check(p.hp < hp0, 'Ampulheta Rachada', 'e no turno seguinte eles agem normalmente');
  }
  /* flag · Língua de Prata */
  {
    const { buildWave } = await import('../js/engine/encounter.js');
    const semFlag = buildWave(1, 1, makeRNG('lp'), null);
    const comFlag = buildWave(1, 1, makeRNG('lp'), new Set(['dobro_recompensa']));
    const a = semFlag.reduce((x,e)=>x+e.hp,0), b = comFlag.reduce((x,e)=>x+e.hp,0);
    check(b > a, 'Língua de Prata', 'inimigos ficam +35% mais gordos', `${a} → ${b}`);
  }
  /* mods numéricos: todos chegam no motor */
  for(const [mod, teste] of [
    ['hpBonus',    r=>r.p.maxHp > 100],
    ['rerollBonus',r=>r.cb.rerolls > 1],
    ['blockBonus', r=>{ r.cb.use({id:'t',nome:'t',req:{t:'any',count:1},eff:[{op:'block',amt:'1'}]},
                        [r.cb.roll[0].dieId],0); return r.p.block > 1; }],
    ['dmgFlat',    r=>{ const h=r.cb.enemies[0].hp;
                        r.cb.use({id:'t',nome:'t',req:{t:'any',count:1},eff:[{op:'dmg',tgt:'chosen',amt:'1'}]},
                        [r.cb.roll[0].dieId],0); return h - r.cb.enemies[0].hp > 1; }],
  ]){
    const rel = RELIQUIAS.find(r=>r.mods && r.mods[mod]);
    if(!rel){ check(false,'Relíquia','existe uma com '+mod); continue; }
    check(teste(comRel(rel)), 'Relíquia · '+rel.nome, `o mod ${mod} chega no motor`);
  }
}

/* =====================================================================
   9. PRÉVIA E PEDÁGIOS — os três buracos que a medição de balanço achou
   ===================================================================== */
console.log('=== PRÉVIA E PEDÁGIOS ===');
{
  /* (a) prever() é SANDBOX: não pode encerrar o combate de verdade.
     A tela chama prever() só pra desenhar a prévia dourada da carta — se a
     jogada simulada matasse o jogador (reflexo de espelho) ou limpasse o
     campo, checkEnd() marcava this.over e a luta acabava sem ninguém jogar. */
  {
    const { cb } = cenario({ classe:'carrasco',
      inimigos:[ inimigo({ hp:1 }) ], faces:[6,6,5,5] });
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='decapitar');
    const ids = cb.roll.slice(0,1).map(e=>e.dieId);
    cb.prever(sk, ids, 0);
    check(!cb.over, 'prever()', 'prévia que MATA o inimigo não encerra o combate', 'over='+cb.over);
    check(cb.enemies[0].hp === 1, 'prever()', 'prévia não fere o inimigo de verdade');
  }
  {
    const { cb, p } = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    p.hp = 3;                       // qualquer reflexo mataria
    cb.enemies = [ inimigo({ hp:200, trava:{t:'espelho', v:90} }) ];
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='decapitar');
    cb.prever(sk, cb.roll.slice(0,1).map(e=>e.dieId), 0);
    check(!cb.over, 'prever()', 'prévia que MATARIA você não encerra o combate', 'over='+cb.over);
    check(p.hp === 3, 'prever()', 'prévia não tira o seu HP de verdade', 'hp='+p.hp);
  }

  /* (b) ESPELHO: uma vez por turno e sobre o dano que ENTROU.
     Antes refletia CADA golpe — Mil Cortes (N golpinhos) pagava N vezes. */
  {
    const { cb, p } = cenario({ classe:'lamina',
      bag: Array.from({length:5},()=>makeDie('d4','osso')),
      faces:[3,3,2,2,4] });
    cb.enemies = [ inimigo({ hp:400, trava:{t:'espelho', v:50} }) ];
    cb.startTurn = cb.startTurn;    // (mantém o turno corrente)
    const hp0 = p.hp;
    const sk = CLASSES.lamina.skills.find(s=>s.id==='milcortes');
    const ids = cb.roll.filter(e=>e.face.v===3).slice(0,2).map(e=>e.dieId);
    cb.use(sk, ids, 0);
    const perdido = hp0 - p.hp;
    const golpes  = 400 - cb.enemies[0].hp;
    check(perdido > 0, 'Espelho', 'o primeiro golpe do turno reflete', 'perdeu '+perdido);
    check(perdido <= Math.ceil(golpes*0.5), 'Espelho',
      'multi-golpe NÃO paga o reflexo N vezes',
      `sofreu ${perdido} contra ${golpes} causados (teto ${Math.ceil(golpes*0.5)})`);
  }
  {
    // armadura do inimigo não pode ser cobrada duas vezes: reflete o efetivo
    const { cb, p } = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    cb.enemies = [ inimigo({ hp:400, trava:{t:'espelho', v:100} }) ];
    cb.enemies[0].armadura = 5;
    const hp0 = p.hp, ehp0 = cb.enemies[0].hp;
    cb.use(CLASSES.carrasco.skills.find(s=>s.id==='decapitar'),
            [cb.roll[0].dieId], 0);
    const entrou = ehp0 - cb.enemies[0].hp, voltou = hp0 - p.hp;
    check(voltou === entrou, 'Espelho', 'devolve o dano que ENTROU, não o bruto',
          `entrou ${entrou}, voltou ${voltou}`);
  }

  /* (c) A CONTA: a pá não desce se o inimigo levou pancada.
     Sem isso é ampulheta inescapável — e pune quem mata devagar. */
  {
    const conta = { padrao:[{t:'contar', ate:2, v:30}], intent:{t:'contar',ate:2,v:30} };
    // 1) sem pancada: a pá anda e no 2º turno bate
    const a = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    a.cb.enemies = [ inimigo({ hp:300, ...conta }) ];
    a.cb.enemies[0]._danoTurno = 0;
    a.cb.enemyTurn(); a.cb.enemyTurn();
    check(a.p.hp < 100, 'A CONTA', 'sem reação, a pá desce e machuca', 'hp='+a.p.hp);
    // 2) com pancada acima do limiar, a pá NÃO anda
    const b = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    b.cb.enemies = [ inimigo({ hp:300, ...conta }) ];
    const lim = Math.round(300*0.15);
    for(let i=0;i<3;i++){ b.cb.enemies[0]._danoTurno = lim + 1; b.cb.enemyTurn(); }
    check(b.p.hp === 100, 'A CONTA', 'bater forte segura a pá', 'hp='+b.p.hp);
    check((b.cb.enemies[0]._conta||0) === 0, 'A CONTA', 'a contagem não avança sob pancada',
          'conta='+(b.cb.enemies[0]._conta||0));
  }
}

/* =====================================================================
   10. ESCUDO PARCIAL — 8 de escudo contra 10 de ataque apara 8 e passa 2,
   e depois de zerado o golpe seguinte entra inteiro. Vale nos dois lados.
   ===================================================================== */
console.log('=== ESCUDO PARCIAL ===');
{
  // --- do SEU lado ---
  {
    const { cb, p } = cenario({ classe:'carrasco' });
    p.hp = 100; p.block = 8;
    cb.dmgPlayer(10, 'ataque');
    check(p.hp === 98 && p.block === 0, 'Escudo',
      'você: 8 de escudo contra 10 apara 8 e passa 2', `HP ${p.hp}, escudo ${p.block}`);
    cb.dmgPlayer(10, 'ataque');
    check(p.hp === 88, 'Escudo',
      'você: com o escudo zerado, o golpe seguinte entra inteiro', `HP ${p.hp}`);
  }
  {
    const { cb, p } = cenario({ classe:'carrasco' });
    p.hp = 100; p.block = 30;
    cb.dmgPlayer(10, 'ataque');
    check(p.hp === 100 && p.block === 20, 'Escudo',
      'você: escudo de sobra segura o golpe todo e guarda o resto', `HP ${p.hp}, escudo ${p.block}`);
  }
  {
    // dois inimigos no mesmo turno: o primeiro gasta o escudo, o segundo passa
    const { cb, p } = cenario({ classe:'carrasco' });
    p.hp = 100; p.block = 8;
    cb.dmgPlayer(10, 'ataque');
    cb.dmgPlayer(6,  'ataque');
    check(p.hp === 92 && p.block === 0, 'Escudo',
      'você: o 1º ataque gasta o escudo e o 2º entra inteiro', `HP ${p.hp}`);
  }
  // --- do lado do INIMIGO ---
  {
    const { cb } = cenario({ classe:'carrasco',
      inimigos:[ inimigo({ hp:200, block:8 }) ] });
    const en = cb.enemies[0];
    cb.dealDamage('chosen', 10, 0, false);
    check(en.hp === 198 && en.block === 0, 'Escudo',
      'inimigo: 8 de escudo contra 10 apara 8 e passa 2', `HP ${en.hp}, escudo ${en.block}`);
    cb.dealDamage('chosen', 10, 0, false);
    check(en.hp === 188, 'Escudo',
      'inimigo: com o escudo zerado, o golpe seguinte entra inteiro', `HP ${en.hp}`);
  }
  {
    const { cb } = cenario({ classe:'carrasco',
      inimigos:[ inimigo({ hp:200, block:30 }) ] });
    const en = cb.enemies[0];
    cb.dealDamage('chosen', 10, 0, false);
    check(en.hp === 200 && en.block === 20, 'Escudo',
      'inimigo: escudo de sobra segura o golpe todo e guarda o resto',
      `HP ${en.hp}, escudo ${en.block}`);
  }
}

/* =====================================================================
   11. FECHADURA DINÂMICA — o mesmo inimigo não pode ter sempre a mesma
   resposta certa. Duas chaves no comum, regra que gira no elite, e a
   escolha muda de combate para combate.
   ===================================================================== */
console.log('=== FECHADURA DINÂMICA ===');
{
  const aloc = vals => ({ sum:vals.reduce((a,b)=>a+b,0), max:Math.max(...vals),
    min:Math.min(...vals), count:vals.length, vals, simbolos:[] });

  // (a) 'ou' abre por qualquer um dos lados, e fecha quando nenhum serve
  {
    const t = { t:'ou', alts:[{t:'par'}, {t:'enxuto',v:1}] };
    check(travaAberta(t, aloc([2,4])), 'Duas Chaves', 'abre pelo lado PAR');
    check(travaAberta(t, aloc([3])),   'Duas Chaves', 'abre pelo lado ENXUTO 1');
    check(!travaAberta(t, aloc([3,4])),'Duas Chaves', 'fecha quando nenhum dos dois serve',
      'soma 7 ímpar com 2 dados deveria dar zero');
  }
  // (b) o rótulo mostra as DUAS regras: carta que esconde meia regra mente
  {
    const d = travaTxt({ t:'ou', alts:[{t:'par'}, {t:'forte',v:4}] });
    check(!!d && /OU/.test(d.curto), 'Duas Chaves', 'o rótulo curto mostra as duas saídas', d?.curto);
    check(!!d && d.alts?.length===2, 'Duas Chaves', 'o rótulo expõe as alternativas separadas');
  }
  // (c) a alternativa sorteada nunca repete nem anula a regra do bicho
  {
    let repetida=0, anulada=0, impossivel=0;
    for(const a of ALTERNATIVAS){
      for(const base of [{t:'par'},{t:'impar'},{t:'forte',v:5},{t:'fraco',v:3}]){
        if(mesmaTrava(a,base)) repetida++;
        if(seAnulam(a,base))   anulada++;
      }
      // toda alternativa do pool precisa ser abrível com dados pequenos
      const maos = [[1],[2],[3],[4],[1,2],[2,2],[1,3],[2,3],[3,4],[1,2,3],[2,2,2],[1,1,2]];
      if(!maos.some(m=>travaAberta(a, aloc(m)))) impossivel++;
    }
    check(impossivel===0, 'Duas Chaves',
      'toda alternativa do pool é abrível com dados pequenos',
      impossivel+' impossíveis');
    check(repetida>0 || anulada>0, 'Duas Chaves',
      'o filtro de repetida/anulada tem o que filtrar');
  }
  // (d) o sorteio de fato varia entre combates
  {
    const vistas = new Set();
    for(let i=0;i<40;i++){
      const onda = buildWave(1, 3, makeRNG('din-'+i));
      for(const e of onda){
        const t = e.travaCiclo ? {t:'ciclo',alts:e.travaCiclo} : e.trava;
        if(t) vistas.add(JSON.stringify(t));
      }
    }
    check(vistas.size >= 8, 'Fechadura dinâmica',
      'a mesma masmorra produz fechaduras diferentes entre combates',
      vistas.size+' combinações distintas em 40 ondas');
  }
  // (e) o chefe conserva o ciclo próprio da ficha
  {
    const onda = buildWave(1, 10, makeRNG('chefe-din'));
    const chefe = onda[0];
    check(Array.isArray(chefe.travaCiclo) && chefe.travaCiclo.length>=2,
      'Fechadura dinâmica', 'o chefe mantém o ciclo escrito na ficha',
      JSON.stringify(chefe.travaCiclo));
  }
  // (f) elite que gira: a regra do turno 1 não é a mesma do turno 2
  {
    const en = inimigo({ hp:100, travaCiclo:[{t:'par'},{t:'impar'}] });
    const { cb } = cenario({ classe:'carrasco', inimigos:[en] });
    const t1 = cb.travaDe(en); cb.turn++;
    const t2 = cb.travaDe(en);
    check(t1.t !== t2.t, 'Fechadura dinâmica',
      'no elite que gira, a regra muda de um turno para o outro', `${t1.t} → ${t2.t}`);
  }
}

/* =====================================================================
   12. ◈ CURINGA — vira sozinho o número que serve MELHOR, não o primeiro
   que passa. A busca varria de 1 até N e parava no primeiro válido (o
   MENOR): com Fúria Cega (soma ≥ 11) e 5+5+◈, o curinga virava 1 e o
   jogador perdia dano sem entender por quê.
   ===================================================================== */
console.log('=== ◈ CURINGA ===');
{
  const curinga = () => face('wild', 0);
  // (a) sem fechadura: escolhe o valor que dá a MAIOR soma
  {
    const bag = [makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso')];
    const { cb, p } = cenario({ classe:'carrasco', bag, faces:[5,5,curinga(),1] });
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='furia');   // soma >= 11
    const ids = cb.roll.slice(0,3).map(e=>e.dieId);
    const pv = cb.prever(sk, ids, 0);
    // 5+5+6 = 16 é a melhor soma possível; 5+5+1 = 11 apenas passa raspando
    check(!!pv, 'Curinga', 'a jogada com curinga é aceita');
    const dano = pv ? pv.alvos.reduce((a,x)=>Math.max(a,x.dano),0) : 0;
    const { cb:cb2 } = cenario({ classe:'carrasco',
      bag:[makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso'),makeDie('d6','osso')],
      faces:[5,5,6,1] });
    const pv2 = cb2.prever(sk, cb2.roll.slice(0,3).map(e=>e.dieId), 0);
    const danoFixo = pv2 ? pv2.alvos.reduce((a,x)=>Math.max(a,x.dano),0) : 0;
    check(dano === danoFixo, 'Curinga',
      'o curinga rende o mesmo que o melhor dado real no lugar dele',
      `com ◈ deu ${dano}, com 6 de verdade deu ${danoFixo}`);
  }
  // (b) com fechadura: prefere o valor que ABRE, mesmo somando menos
  {
    const bag = Array.from({length:4},()=>makeDie('d6','osso'));
    const { cb } = cenario({ classe:'carrasco', bag, faces:[5,5,curinga(),1],
      inimigos:[ inimigo({ hp:400, trava:{t:'par'} }) ] });   // soma PAR
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='furia');
    const ids = cb.roll.slice(0,3).map(e=>e.dieId);
    const pv = cb.prever(sk, ids, 0);
    const dano = pv ? (pv.alvos[0]?.dano||0) : 0;
    // 5+5+6=16 é par e abre; 5+5+1=11 é ímpar e daria ZERO
    check(dano > 0, 'Curinga',
      'contra fechadura PAR, o curinga assume o valor que ABRE', `dano ${dano}`);
  }
  {
    const bag = Array.from({length:4},()=>makeDie('d6','osso'));
    const { cb } = cenario({ classe:'carrasco', bag, faces:[5,5,curinga(),1],
      inimigos:[ inimigo({ hp:400, trava:{t:'impar'} }) ] });  // soma ÍMPAR
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='furia');
    const pv = cb.prever(sk, cb.roll.slice(0,3).map(e=>e.dieId), 0);
    const dano = pv ? (pv.alvos[0]?.dano||0) : 0;
    // aqui o que abre é a soma ímpar: 5+5+1=11 ou 5+5+3=13 — nunca 16
    check(dano > 0, 'Curinga',
      'contra fechadura ÍMPAR, o curinga troca de valor e abre do mesmo jeito',
      `dano ${dano}`);
  }
}

/* =====================================================================
   13. RE-ROLAGEM — dado já gasto não rola de novo, e clique que não rola
   nada não cobra a re-rolagem.
   ===================================================================== */
console.log('=== RE-ROLAGEM ===');
{
  {
    const { cb } = cenario({ classe:'carrasco', faces:[6,6,5,5,4,4] });
    const gasto = cb.roll[0].dieId;
    cb.used.add(gasto);
    const faceGasta = cb.roll[0].face.v;
    const rolados = cb.reroll(cb.roll.map(e=>e.dieId));
    check(Array.isArray(rolados) && !rolados.includes(gasto), 'Re-rolagem',
      'o dado já gasto não entra na re-rolagem', JSON.stringify(rolados));
    check(cb.roll[0].face.v === faceGasta, 'Re-rolagem',
      'a face do dado gasto continua a mesma', `${faceGasta} → ${cb.roll[0].face.v}`);
  }
  {
    // tudo gasto: o clique não pode cobrar a re-rolagem
    const { cb } = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    for(const e of cb.roll) cb.used.add(e.dieId);
    const antes = cb.rerolls;
    const r = cb.reroll(cb.roll.map(e=>e.dieId));
    check(r === false, 'Re-rolagem', 'com tudo gasto, a re-rolagem não acontece');
    check(cb.rerolls === antes, 'Re-rolagem',
      'e a re-rolagem não é cobrada', `${antes} → ${cb.rerolls}`);
  }
  {
    // dado congelado também fica de fora
    const { cb } = cenario({ classe:'carrasco', faces:[6,6,5,5] });
    cb.roll[1].die._congelado = true;
    const congelada = cb.roll[1].face.v;
    const rolados = cb.reroll(cb.roll.map(e=>e.dieId));
    check(Array.isArray(rolados) && !rolados.includes(cb.roll[1].dieId), 'Re-rolagem',
      'o dado congelado não entra na re-rolagem');
    check(cb.roll[1].face.v === congelada, 'Re-rolagem',
      'a face do dado congelado continua a mesma');
  }
}

/* =====================================================================
   14. CONTA DO GOLPE — a prévia mostra o golpe cheio, o que a defesa come
   e o que entra. Mostrar só o resto fazia 11 de dano contra 11 de defesa
   parecer que a habilidade não fazia nada.
   ===================================================================== */
console.log('=== CONTA DO GOLPE ===');
{
  const golpear = (block, armadura=0) => {
    const bag = Array.from({length:4},()=>makeDie('d6','osso'));
    const { cb } = cenario({ classe:'carrasco', bag, faces:[6,1,1,1],
      inimigos:[ inimigo({ hp:500, block }) ] });
    cb.enemies[0].armadura = armadura;
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='decapitar');
    return cb.prever(sk, [cb.roll[0].dieId], 0)?.alvos[0];
  };
  {
    const a = golpear(11);
    check(a && a.bruto > 0, 'Conta do golpe', 'a prévia informa o golpe CHEIO', 'bruto '+a?.bruto);
    check(a && a.defesa === 11, 'Conta do golpe', 'informa o quanto a defesa comeu', 'defesa '+a?.defesa);
    check(a && a.dano === a.bruto - a.defesa, 'Conta do golpe',
      'cheio − defesa = o que entra', `${a?.bruto} − ${a?.defesa} = ${a?.dano}`);
  }
  {
    // o caso que enganava: defesa maior que o golpe
    const a = golpear(999);
    check(a && a.bruto > 0 && a.dano === 0, 'Conta do golpe',
      'com a defesa segurando tudo, o golpe cheio continua visível',
      `bruto ${a?.bruto}, entra ${a?.dano}`);
  }
  {
    // armadura e bloqueio entram os dois na conta da defesa
    const a = golpear(5, 3);
    check(a && a.armadura === 3 && a.bloqueio === 5 && a.defesa === 8, 'Conta do golpe',
      'armadura e bloqueio somam na defesa',
      `arm ${a?.armadura} + bloq ${a?.bloqueio} = ${a?.defesa}`);
  }
  {
    // alvo travado pela fechadura: não é a defesa que barrou
    const bag = Array.from({length:4},()=>makeDie('d6','osso'));
    const { cb } = cenario({ classe:'carrasco', bag, faces:[6,6,1,1],
      inimigos:[ inimigo({ hp:500, trava:{t:'fraco',v:2} }) ] });
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='furia');   // AoE, não arromba
    const pv = cb.prever(sk, cb.roll.slice(0,2).map(e=>e.dieId), 0);
    const a = pv?.alvos[0];
    check(a && a.travado === true, 'Conta do golpe',
      'o alvo barrado pela FECHADURA é marcado como travado, não como defendido',
      JSON.stringify(a && {dano:a.dano, defesa:a.defesa, travado:a.travado}));
  }
}

/* =====================================================================
   15. FUNDO DO ABISMO — as intenções que só existem da Masmorra 5 em
   diante. Uma auditoria mostrou que o jogo tinha 12 tipos de intenção e
   que quase todos apareciam nas 10 masmorras: a M9 usava as ferramentas
   da M1 com números maiores. Estas atacam o PUZZLE, não o HP.
   ===================================================================== */
console.log('=== FUNDO DO ABISMO (M5+) ===');
{
  const comIntencao = (intent, extra={}) => {
    const { cb, p } = cenario({ classe:'carrasco', faces:[6,6,5,5],
      inimigos:[ inimigo({ hp:300, intent, padrao:[intent] }) ] });
    cb.skillsDoJogador = CLASSES.carrasco.skills;
    Object.assign(cb.enemies[0], extra);
    return { cb, p, en:cb.enemies[0] };
  };
  // SELAR: a carta existe mas não pode ser jogada
  {
    const { cb } = comIntencao({t:'selar'});
    cb.enemyTurn();
    check(!!cb.selada, 'Selar', 'tranca uma habilidade sua', 'selada: '+cb.selada);
    const sk = CLASSES.carrasco.skills.find(s=>s.id===cb.selada);
    if(sk){
      const r = cb.use(sk, [cb.roll[0].dieId], 0);
      check(r.ok===false, 'Selar', 'a habilidade selada é recusada', r.err);
    }
    cb.startTurn();
    check(!cb.selada, 'Selar', 'o selo cai no turno seguinte');
  }
  // TAXA: cada dado gasto custa HP
  {
    const { cb, p } = comIntencao({t:'taxa', v:2});
    cb.enemyTurn();
    check(cb.taxaDado === 2, 'Pedágio', 'passa a cobrar por dado gasto');
    const hp0 = p.hp;
    const sk = CLASSES.carrasco.skills.find(s=>s.id==='muralha');   // usa 2 dados
    const ids = cb.roll.slice(0,2).map(e=>e.dieId);
    cb.use(sk, ids, 0);
    check(p.hp === hp0 - 4, 'Pedágio', '2 de pedágio × 2 dados = 4 de HP',
      `${hp0} → ${p.hp}`);
  }
  // DRENAR: rouba o seu bloqueio e veste como escudo
  {
    const { cb, p, en } = comIntencao({t:'drenar'});
    p.block = 9; en.block = 0;
    cb.enemyTurn();
    check(p.block === 0 && en.block >= 9, 'Drenar',
      'tira o seu bloqueio e o veste', `você ${p.block}, ele ${en.block}`);
  }
  // ENTERRAR: um dado seu some por 2 turnos
  {
    const { cb, p } = comIntencao({t:'enterrar'});
    const n0 = p.bag.length;
    cb.enemyTurn();
    check(p.bag.some(d=>d._roubado===2), 'Enterrar', 'marca um dado por 2 turnos');
    cb.startTurn();
    check(cb.roll.length === n0-1, 'Enterrar', 'o dado enterrado não rola',
      `${n0} dados, rolaram ${cb.roll.length}`);
  }
  // EXIGIR: não o feriu? todos enfurecem
  {
    const { cb, en } = comIntencao({t:'exigir', v:1});
    en._danoTurno = 0;
    cb.enemyTurn();
    check(cb.enemies.every(o=>o.statuses.frenesi), 'Exigir',
      'sem ser ferido, ele enfurece o campo');
  }
  {
    const { cb, en } = comIntencao({t:'exigir', v:1});
    en._danoTurno = 50;                       // você o feriu neste turno
    cb.enemyTurn();
    check(!cb.enemies.some(o=>o.statuses.frenesi), 'Exigir',
      'ferido a tempo, a exigência é paga e ninguém enfurece');
  }
  // CRESCER: sobe o teto de HP de verdade
  {
    const { cb, en } = comIntencao({t:'crescer', v:10});
    en.hp = 100; en.maxHp = 300;
    const max0 = en.maxHp, hp0 = en.hp;
    cb.enemyTurn();
    check(en.maxHp > max0 && en.hp > hp0, 'Crescer',
      'sobe o HP máximo e cura junto', `${hp0}/${max0} → ${en.hp}/${en.maxHp}`);
  }
  // e o vocabulário novo só aparece da M5 em diante
  {
    const NOVAS = new Set(['selar','taxa','drenar','enterrar','exigir','crescer']);
    let cedo = 0, tarde = 0;
    for(let m=1;m<=10;m++){
      const M = MASMORRAS[m];
      for(const e of [...M.comuns,...M.elites,M.subchefe,M.chefe].filter(Boolean))
        for(const p of (e.padrao||[])) if(NOVAS.has(p.t)){ (m<=4?cedo:tarde); if(m<=4) cedo++; else tarde++; }
    }
    check(cedo === 0, 'Fundo do Abismo',
      'nenhuma intenção nova vaza para as masmorras 1-4', cedo+' encontradas');
    check(tarde >= 10, 'Fundo do Abismo',
      'e elas povoam as masmorras da frente', tarde+' usos de M5 em diante');
  }
}

/* ==================================================================
   16. VIGOR E A CURVA DAS DEZ — o HP máximo do jogador SATURAVA em 98
   a partir da Masmorra 6, porque vida só vinha de relíquia e relíquia é
   única. Contra uma pancada que chegava a 706 por turno, as masmorras 9
   e 10 mediam 0% de conclusão. Estas verificações prendem as duas pontas.
   ================================================================== */
console.log('=== VIGOR E A CURVA DAS DEZ ===');
{
  const rng = makeRNG('vigor');
  const C = CLASSES.carrasco;
  const p = { classe:'carrasco', hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0,
              bag:C.bag(), statuses:{}, essence:0, rerollsBase:C.rerolls,
              relics:[], unlocked:[] };
  recalcRelics(p);

  // o Vigor existe e é REPETÍVEL: sempre pode voltar a aparecer
  let vezes = 0;
  for(let i=0;i<40;i++) if(gerarOpcoes(rng,p,3).some(o=>o.t==='vigor')) vezes++;
  check(vezes >= 8, 'Vigor', 'aparece entre as recompensas de forma recorrente',
        vezes+' vezes em 40 sorteios');

  // e sobe o HP máximo de verdade, quantas vezes for pego
  const antes = p.maxHp;
  for(let i=0;i<5;i++) aplicar({t:'vigor'}, p, rng);
  check(p.maxHp === antes + 35, 'Vigor', 'soma +7 de HP máximo por vez',
        antes+' → '+p.maxHp);
  check(p.baseMaxHp === C.hp + 35, 'Vigor', 'sobe a BASE, para as relíquias multiplicarem por cima',
        'base '+p.baseMaxHp);

  // o HP máximo NÃO satura mais ao longo das dez masmorras
  const hpEm = m => {
    const r = makeRNG('sat'+m);
    const q = { classe:'carrasco', hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0,
                bag:C.bag(), statuses:{}, essence:0, rerollsBase:C.rerolls,
                relics:[], unlocked:[] };
    recalcRelics(q);
    const val = o => o.t==='reliquia' ? (o.r==='amaldicoada'?2 : o.r==='rara'?9 : 6)
              : o.t==='dado' ? 5 : o.t==='grav' ? 5.5 : o.t==='vigor' ? 6 : 1;
    for(let i=0;i<(m-1)*10;i++) aplicar(gerarOpcoes(r,q,3).reduce((a,b)=>val(b)>val(a)?b:a), q, r);
    return q.maxHp;
  };
  const hp6 = hpEm(6), hp10 = hpEm(10);
  check(hp10 > hp6 * 1.25, 'Vigor', 'o HP máximo continua crescendo depois da Masmorra 6',
        'M6 '+hp6+' → M10 '+hp10);

  /* O PRODUTO ficha × escalada é o que o jogador enfrenta, e ele precisa
     subir SEMPRE — a coluna da escalada sozinha não, e cai de propósito da
     M8 para a M10 porque as fichas de lá dão um salto. */
  const produto = m => {
    const M = MASMORRAS[m];
    return (M.comuns.reduce((a,e)=>a+e.hp,0)/M.comuns.length) * ESCALADA[m-1].hp;
  };
  let sobeSempre = true, pior = '';
  for(let m=2;m<=10;m++) if(produto(m) <= produto(m-1)){ sobeSempre=false; pior='M'+m; }
  check(sobeSempre, 'As dez masmorras', 'o HP real do inimigo sobe a cada masmorra',
        sobeSempre ? produto(1).toFixed(0)+' → '+produto(10).toFixed(0) : 'quebra em '+pior);

  // e sobe num ritmo que o jogador acompanha: 21x era o que travava a frente
  const cresc = produto(10)/produto(1);
  check(cresc > 6 && cresc < 13, 'As dez masmorras',
        'o inimigo cresce no ritmo do jogador (6x a 13x, medido)',
        cresc.toFixed(1)+'x da M1 para a M10');

  /* o fardo da Torre Invertida PROMOVE comuns a elite — não empilha corpos
     por cima de uma onda que já cresceu */
  let maiorOnda = 0, hpAndar1 = 0, hpAndar3 = 0;
  for(let i=0;i<40;i++){
    const r = makeRNG('t9-'+i);
    const w1 = buildWave(9,1,r,new Set()), w3 = buildWave(9,3,r,new Set());
    maiorOnda = Math.max(maiorOnda, w1.length, w3.length);
    hpAndar1 += w1.reduce((a,e)=>a+e.maxHp,0)/40;
    hpAndar3 += w3.reduce((a,e)=>a+e.maxHp,0)/40;
  }
  check(hpAndar1 < hpAndar3, 'Torre Invertida',
        'o andar 1 é mais leve que o andar 3',
        'andar 1 '+hpAndar1.toFixed(0)+' HP, andar 3 '+hpAndar3.toFixed(0));
  check(maiorOnda <= 8, 'Ondas', 'nunca passam de 8 inimigos', 'máximo visto: '+maiorOnda);

  /* AS HABILIDADES DA TRILHA PRECISAM GANHAR DAS BÁSICAS. Com os números
     antigos, liberar a trilha derrubava a taxa de vitória — a habilidade
     nova pedia o mesmo dado e batia menos. */
  const dano = sk => {
    const e = (sk.eff||[]).find(x=>x.op==='dmg');
    if(!e) return 0;
    const m = /sum\*(\d+)|val\*(\d+)/.exec(e.amt||'');
    return m ? +(m[1]||m[2]) : 0;
  };
  const par = [['carrasco','quebra_ossos','decapitar'],
               ['arcanista','fenda','raio'],
               ['arcanista','entropia','nova'],
               ['oracula','sentenca','julgamento']];
  for(const [cid,nova,base] of par){
    const N = CLASSES[cid].skills.find(s=>s.id===nova);
    const B = CLASSES[cid].skills.find(s=>s.id===base);
    check(dano(N) >= dano(B), 'Trilha de '+cid,
          nova+' não bate menos que '+base, dano(N)+' vs '+dano(B));
  }
}

/* ==================================================================
   17. AS QUATRO ÁRVORES — 20 passivas por classe. O risco de um sistema
   deste tamanho é a passiva decorativa: texto bonito que não muda nada
   no combate. Aqui a estrutura é conferida nó a nó, cada mecanismo é
   medido comprando a passiva e vendo o jogo mudar, e a última verificação
   varre TODAS as 80 atrás de alguma cujo efeito não seja lido em lugar
   nenhum do motor.
   ================================================================== */
console.log('=== AS QUATRO ÁRVORES ===');
{
  /* tudo que o motor, o requisito e a tela realmente consomem */
  const LIDO_NO_MOTOR = [
    'area_forte','arromba_campo','ceifa_antecipada','circulo_dobro','circulo_essencia',
    'comeca_invisivel','curinga_livre','curinga_simbolo','epidemia','execucao_larga',
    'invisivel_forte','marca_sempre','martirio','polegar_forte','prever',
    'primeiro_perfura','reroll_turno_gratis','retaguarda_cheia','seq_frouxa',
    'sobrecarga_barata','some_ao_matar','trapaca_dupla','veneno_de_entrada','veneno_eterno',
    'circuloDano','circuloExtra','danoDissolvido','dissolveExtra','furiaArromba',
    'golpesExtra','marcaExtra','pragaAoMatar','sangueQuente','sobraVeneno',
    'venenoFlat','venenoPct','curinga','dadosExtra','eco','gazua','pity','polegar',
    'presagio','rerollEscolhido','revive','travaDados','ultimoLance',
    'quarta','opcoes','ecoMult','gravExtra','lamina','reliquias',
  ];

  /* ---- estrutura ---- */
  for(const [cid, arv] of Object.entries(PASS.ARVORES)){
    check(arv.nos.length === 24, 'Árvore '+cid, 'tem 24 passivas', arv.nos.length+' nós');
    const ids = new Set();
    let custoOk = true, textoOk = true, aneisOk = true, reqOk = true;
    for(const no of arv.nos){
      if(ids.has(no.id)) custoOk = false; ids.add(no.id);
      if(no.custo.length !== no.max) custoOk = false;          // um preço por nível
      for(let i=1;i<no.custo.length;i++) if(no.custo[i] <= no.custo[i-1]) custoOk = false;
      if(typeof no.txt(1) !== 'string' || !no.txt(1).length) textoOk = false;
      if(!(no.anel>=1 && no.anel<=4)) aneisOk = false;
      /* requisito nunca vem de um anel MAIS FUNDO (isso trancaria a árvore
         para sempre); os capstones podem exigir dois vizinhos do mesmo anel */
      for(const r of (no.req||[])){
        const alvo = PASS.noPorId(cid, r);
        if(!alvo || alvo.id === no.id || alvo.anel > no.anel) reqOk = false;
        if(alvo && alvo.anel === no.anel && (alvo.req||[]).includes(no.id)) reqOk = false;
      }
    }
    check(custoOk, 'Árvore '+cid, 'cada nível custa mais que o anterior');
    check(textoOk, 'Árvore '+cid, 'toda passiva se explica em texto');
    check(aneisOk, 'Árvore '+cid, 'todo nó pertence a um dos quatro anéis');
    check(reqOk,   'Árvore '+cid, 'requisitos apontam para anéis anteriores');
    const medio = a => { const ns = arv.nos.filter(n=>n.anel===a);
      return ns.reduce((x,n)=>x+n.custo[0],0)/Math.max(1,ns.length); };
    check([1,2,3,4].every(a=>arv.nos.some(n=>n.anel===a)), 'Árvore '+cid, 'tem os quatro anéis');
    check(medio(1) < medio(2) && medio(2) < medio(3) && medio(3) < medio(4),
      'Árvore '+cid, 'o anel mais fundo custa mais caro',
      [1,2,3,4].map(a=>medio(a).toFixed(0)).join(' → '));
  }

  /* ---- compra ---- */
  {
    const cofre = { ecos:50, passivas:{} };
    const no = PASS.noPorId('carrasco','c_medula');
    const trav = PASS.noPorId('carrasco','c_arromba');
    check(!PASS.disponivelPassiva(cofre,'carrasco',trav), 'Compra',
      'nó de anel fundo nasce trancado');
    check(PASS.comprarPassiva(cofre,'carrasco',no), 'Compra', 'compra o que está ao alcance');
    check(cofre.ecos === 50 - no.custo[0], 'Compra', 'cobra o preço certo', 'sobrou '+cofre.ecos);
    check(PASS.nivelPassiva(cofre,'carrasco','c_medula')===1, 'Compra', 'o nível sobe');
    const pobre = { ecos:0, passivas:{} };
    check(!PASS.comprarPassiva(pobre,'carrasco',no), 'Compra', 'sem Ecos não compra');
    check(PASS.nivelPassiva(cofre,'lamina','c_medula')===0, 'Compra',
      'o que você comprou no Carrasco não aparece na Lâmina');
  }

  /* ---- os efeitos CHEGAM ao combate ---- */
  const comArvore = (cid, compras) => {
    const cofre = { ecos:99999, passivas:{} };
    for(const [id,vezes] of Object.entries(compras)){
      const no = PASS.noPorId(cid,id);
      for(let i=0;i<vezes;i++){
        for(const r of (no.req||[])){       // libera os requisitos para medir o nó em si
          cofre.passivas[cid] = cofre.passivas[cid] || {};
          if(!cofre.passivas[cid][r]) cofre.passivas[cid][r] = 1; }
        PASS.comprarPassiva(cofre, cid, no);
      }
    }
    return PASS.bonusDaClasse(cofre, cid);
  };
  const jogador = (cid, AR) => {
    const C = CLASSES[cid];
    const p = { classe:cid, hp:C.hp, maxHp:C.hp, baseMaxHp:C.hp, block:0, bag:C.bag(),
                statuses:{}, essence:0, rerollsBase:C.rerolls, relics:[], unlocked:[],
                arvore:AR.campos, polegar:AR.campos.polegar||0, gazua:AR.campos.gazua||0,
                travaDados:AR.campos.travaDados||0 };
    p.relics.push({ id:'_arv', nome:'árvore', r:'comum', txt:'', mods:AR.mods,
                    start:AR.start, onKill:AR.onKill, _rolls:AR.onRoll, _flags:[...AR.flags] });
    recalcRelics(p);
    return p;
  };
  const bicho = (hp=400, extra={}) => ({ id:'x', nome:'Boneco', uid:'x#1', hp, maxHp:hp,
    block:0, statuses:{}, mult:1, padrao:[{t:'atk',v:10}], _ip:0, intent:{t:'atk',v:10}, ...extra });

  {   // numérico: HP e dano somam de verdade
    const AR = comArvore('carrasco', { c_medula:3, c_fio:3 });
    const p = jogador('carrasco', AR);
    check(p.maxHp === CLASSES.carrasco.hp + 36, 'Medula Densa',
      'três níveis somam +36 de HP máximo', p.maxHp+' de vida');
    check((p.relicMods.dmgFlat|0) === 6, 'Fio do Machado',
      'três níveis somam +6 de dano por golpe', '+'+p.relicMods.dmgFlat);
  }
  {   // bloqueio de início de combate
    const AR = comArvore('carrasco', { c_couro:2 });
    const p = jogador('carrasco', AR);
    new Combat({ rng:makeRNG('arv1'), player:p, enemies:[bicho()], log:false });
    check(p.block === 10, 'Couro Batido', 'o combate começa com 10 de bloqueio', p.block+'');
  }
  {   // sobrecarga barata: o preço em sangue cai pela metade
    for(const [compras, custo] of [[{}, 2], [{c_punho:1}, 1]]){
      const AR = comArvore('carrasco', compras);
      const p = jogador('carrasco', AR);
      const cb = new Combat({ rng:makeRNG('arv2'), player:p, enemies:[bicho()], log:false });
      cb.startTurn();
      const alvo = cb.pool().find(e=>e.face.k==='num' && e.face.v < e.n);
      if(alvo){ const hp0 = p.hp; cb.sobrecarga(alvo.dieId);
        check(hp0 - p.hp === custo, 'Punho Calejado',
          `sobrecarga custa ${custo} de HP ${compras.c_punho?'com':'sem'} o nó`, (hp0-p.hp)+' de HP'); }
    }
  }
  {   // trapaça dupla: dois usos por turno
    const AR = comArvore('lamina', { l_dupla:1 });
    const p = jogador('lamina', AR);
    const cb = new Combat({ rng:makeRNG('arv3'), player:p, enemies:[bicho()], log:false });
    cb.startTurn();
    check(cb.restam('trapaca') === 2, 'Trapaça Dupla', 'a Trapaça passa a valer 2×/turno',
      cb.restam('trapaca')+' usos');
  }
  {   // veneno: soma o fixo e DEPOIS multiplica
    const AR = comArvore('lamina', { l_frasco:2, l_corrosivo:2 });
    const p = jogador('lamina', AR);
    const cb = new Combat({ rng:makeRNG('arv4'), player:p, enemies:[bicho()], log:false });
    const en = cb.enemies[0];
    cb.envenenar(en, 10);
    check(en.statuses.veneno === 18, 'Frasco + Corrosivo',
      '(10 +2 do Frasco) ×1,5 do Corrosivo = 18', en.statuses.veneno+' de veneno');
  }
  {   // invisível mais fundo
    for(const [compras, esperado] of [[{}, 35], [{l_sombra:1}, 20]]){
      const AR = comArvore('lamina', compras);
      const p = jogador('lamina', AR);
      const cb = new Combat({ rng:makeRNG('arv5'), player:p, enemies:[bicho()], log:false });
      p.statuses.invisivel = 1; p.block = 0;
      const hp0 = p.hp; cb.dmgPlayer(100, 'ataque');
      check(hp0 - p.hp === esperado, 'Sombra Longa',
        `invisível deixa passar ${esperado} de 100 ${compras.l_sombra?'com':'sem'} o nó`,
        (hp0-p.hp)+' de dano');
    }
  }
  {   // sequência frouxa: 1-2-4 passa a contar
    const ents = [{face:{k:'num',v:1},n:6},{face:{k:'num',v:2},n:6},{face:{k:'num',v:4},n:6}];
    const req = { t:'seq', size:3 };
    ajustarRegras(new Set());
    check(!satisfies(req, ents), 'Degrau', 'sem o nó, 1-2-4 NÃO é sequência');
    ajustarRegras(new Set(['seq_frouxa']));
    check(satisfies(req, ents), 'Degrau', 'com o nó, 1-2-4 vira sequência de 3');
    ajustarRegras(new Set());
  }
  {   // curinga como selo
    const ents = [{face:{k:'wild'},n:6}];
    const req = { t:'symbol', s:'blade' };
    ajustarRegras(new Set());
    check(!satisfies(req, ents), 'Fio do Destino', 'sem o nó, ◈ não abre fechadura de selo');
    ajustarRegras(new Set(['curinga_simbolo']));
    check(satisfies(req, ents), 'Fio do Destino', 'com o nó, ◈ vale como ⚔');
    ajustarRegras(new Set());
  }
  {   // execução mais larga
    const AR = comArvore('carrasco', { c_carrasco:1 });
    const p = jogador('carrasco', AR);
    const cb = new Combat({ rng:makeRNG('arv6'), player:p, enemies:[bicho(100)], log:false });
    cb.enemies[0].hp = 24;          // 24% do máximo: escapa em 18%, morre em 25%
    cb.applyEffects([{op:'exec',tgt:'chosen',pct:0.18}],
                    { sum:0,val:0,count:0,max:0,min:0,blades:0 }, 0);
    check(cb.enemies[0].hp === 0, 'Mão do Carrasco',
      'a execução alcança 25% de vida em vez de 18%', 'HP final '+cb.enemies[0].hp);
  }
  {   // os campos do jogador chegam
    const AR = comArvore('oracula', { o_polegar:2, o_trava:2, o_curinga:2 });
    check(AR.campos.polegar === 2, 'Polegar Torto', 'dois níveis dão 2 usos por turno');
    check(AR.campos.travaDados === 2, 'Nó Cego', 'dois níveis travam 2 dados');
    check(AR.campos.curinga === 2, 'Fio Solto', 'dois níveis gravam 2 faces ◈');
  }
  {   // NENHUMA das 80 pode ser decorativa
    const usadas = new Set();
    for(const cid of Object.keys(PASS.ARVORES)){
      const todas = {};
      for(const no of PASS.ARVORES[cid].nos) todas[no.id] = no.max;
      const AR = comArvore(cid, todas);
      for(const f of AR.flags) usadas.add(f);
      for(const k of Object.keys(AR.campos)) usadas.add(k);
      // os mods numéricos passam pelo recalcRelics e sempre valem
    }
    const orfas = [...usadas].filter(f=>!LIDO_NO_MOTOR.includes(f));
    check(orfas.length === 0, 'As quatro árvores',
      'toda passiva tem efeito de verdade no jogo',
      orfas.length ? 'SEM EFEITO: '+orfas.join(', ') : usadas.size+' efeitos ligados ao motor');
  }
}

/* ---------------------------------------------------------------- */
console.log('\n' + '─'.repeat(60));
if (falhas.length) {
  console.log(`✕ ${falhas.length} FALHA(S)  ·  ${ok} verificações passaram\n`);
  for (const f of falhas) console.log('   ✕ ' + f);
  process.exit(1);
} else {
  console.log(`✓ TUDO CERTO — ${ok} verificações passaram`);
}
