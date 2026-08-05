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
import { recalcRelics } from '../js/engine/rewards.js';
import { satisfies } from '../js/engine/requirements.js';

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
           trava:o.trava||null, travaCiclo:o.travaCiclo||null,
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
  cb.endTurn();
  check(cb.roll.some(e=>e.banked), 'Arcanista', 'Canalização: o dado VOLTA no turno seguinte');
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
  const { cb, antes } = turnoInimigo({ t:'block', v:8 });
  check(cb.enemies[0].block > antes.bloco || cb.enemies[0].block === 0,
        'block', 'ganha bloqueio no turno (zera no fim)');
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

/* ---------------------------------------------------------------- */
console.log('\n' + '─'.repeat(60));
if (falhas.length) {
  console.log(`✕ ${falhas.length} FALHA(S)  ·  ${ok} verificações passaram\n`);
  for (const f of falhas) console.log('   ✕ ' + f);
  process.exit(1);
} else {
  console.log(`✓ TUDO CERTO — ${ok} verificações passaram`);
}
