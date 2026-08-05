/* DIAGNÓSTICO DE BALANÇO: onde a run morre e QUEM tirou a vida.
   node test/diag.mjs <runs> <masmorras> <cofre> */
import { makeRNG } from '../js/rng.js';
import { CLASSES } from '../js/data/classes.js';
import { Combat } from '../js/engine/combat.js';
import { buildWave, burdensFor, criarInimigo } from '../js/engine/encounter.js';
import { autoCombat } from '../js/engine/ai.js';
import { resetDieIds } from '../js/data/dice.js';
import { gerarOpcoes, aplicar, recalcRelics } from '../js/engine/rewards.js';
import * as META from '../js/meta.js';

const FONTE = {};            // motivo -> dano total
const EVENTOS = {};          // motivo -> nº de disparos
const TURNOS = [];           // turnos por combate
const MORTE  = {};           // "m-a" -> mortes
const DANO_ANDAR = {};       // "m-a" -> dano sofrido
let combates = 0;

const origDmg = Combat.prototype.dmgPlayer;
Combat.prototype.dmgPlayer = function(amt, motivo){
  if(this._sandbox) return origDmg.call(this, amt, motivo);   // jogada imaginada não conta
  const hpAntes = this.p.hp;
  origDmg.call(this, amt, motivo);
  if(amt>0) EVENTOS[motivo]=(EVENTOS[motivo]||0)+1;
  const real = (hpAntes - this.p.hp);
  if(real>0){ FONTE[motivo]=(FONTE[motivo]||0)+real;
              const k=this._tagAndar||'?'; DANO_ANDAR[k]=(DANO_ANDAR[k]||0)+real; }
};

function bonusDoCofre(f){
  const m = { n:1, ecos:0, comprados:{}, recordes:{andar:0,masmorra:1} };
  if(f>0) for(const no of META.NOS) m.comprados[no.id] = Math.max(1, Math.round(no.max*f));
  const b = META.bonus(m); b.portal = 1; return b;
}

function run(classeId, seed, maxM, BON){
  const rng = makeRNG(seed); resetDieIds();
  const C = CLASSES[classeId]; const bag = C.bag();
  for(let i=0;i<BON.dadosExtra;i++) bag.push({ ...bag[0], id:'X'+i, faces:bag[0].faces.map(f=>({...f})) });
  const p = { classe:classeId, hp:C.hp+BON.hpBonus, maxHp:C.hp+BON.hpBonus, baseMaxHp:C.hp+BON.hpBonus,
              block:0, bag, statuses:{}, essence:0, rerollsBase:C.rerolls+BON.rerolls,
              relics:[], unlocked:BON.quarta?['coroa_'+classeId]:[],
              polegar:BON.polegar, gazua:BON.gazua, revive:BON.revive, pity:BON.pity,
              ultimoLance:BON.ultimoLance, gravExtra:BON.gravExtra };
  recalcRelics(p);
  const escolher = (opts,m)=>{ const val=o=> o.t==='reliquia'?(o.r==='amaldicoada'?(m>=5?7:2):o.r==='rara'?9:6)
      : o.t==='dado'?5 : o.t==='grav'?5.5 : (p.hp<p.maxHp*0.55?8:1);
    return opts.reduce((a,b)=>val(b)>val(a)?b:a); };
  let limpos=0;
  for(let m=1;m<=maxM;m++){
    const burdens = burdensFor(m);
    for(let a=1;a<=10;a++){
      const tag = m+'-'+a;
      const inimigos = buildWave(m,a,rng,p.relicFlags);
      const cb = new Combat({ rng, player:p, enemies:inimigos, burdens, log:false });
      cb._tagAndar = tag;
      cb.onInvocar = id => criarInimigo(m,a,id,rng);
      const t0 = cb.turn||0;
      const r = autoCombat(cb, C.skills);
      combates++; TURNOS.push({ tag, t: (cb.turn||0)-t0 });
      if(r!=='win'){ MORTE[tag]=(MORTE[tag]||0)+1; return { ok:false, limpos, tag }; }
      limpos++;
      aplicar(escolher(gerarOpcoes(rng,p,3),m), p, rng);
      p.hp = Math.min(p.maxHp, p.hp + ((a===5||a===10)? Math.round(p.maxHp*0.15) : 2));
    }
  }
  return { ok:true, limpos };
}

const N=+(process.argv[2]||30), MAXM=+(process.argv[3]||1), COF=+(process.argv[4]||0);
const SO = process.argv[5]||null;              // só esta classe
const BON = bonusDoCofre(COF);
console.log(`DIAG ${N} runs/classe, M1..M${MAXM}, Cofre ${COF*100}%${SO?' ['+SO+']':''}\n`);
for(const id of Object.keys(CLASSES)){
  if(SO && id!==SO) continue;
  let vit=0, soma=0;
  for(let i=0;i<N;i++){ const r=run(id,'d-'+id+'-'+i,MAXM,BON); if(r.ok) vit++; soma+=r.limpos; }
  console.log(`${CLASSES[id].glifo} ${CLASSES[id].nome.padEnd(22)} vit ${(100*vit/N).toFixed(0).padStart(3)}%  andares ${(soma/N).toFixed(1)}`);
}
console.log('\n— DANO SOFRIDO POR FONTE —');
const tot = Object.values(FONTE).reduce((a,b)=>a+b,0);
Object.entries(FONTE).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>
  console.log(`  ${k.padEnd(22)} ${String(v).padStart(7)}  ${(100*v/tot).toFixed(1)}%`
    + `   ${String(EVENTOS[k]||0).padStart(6)} disparos, ${(v/(EVENTOS[k]||1)).toFixed(1)} por disparo`));
console.log('\n— MORTES POR ANDAR (top 12) —');
Object.entries(MORTE).sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([k,v])=>console.log(`  andar ${k.padEnd(6)} ${v}`));
console.log('\n— TURNOS MÉDIOS POR ANDAR (M1) —');
const porTag={}; for(const t of TURNOS){ (porTag[t.tag]=porTag[t.tag]||[]).push(t.t); }
Object.keys(porTag).filter(k=>k.startsWith('1-')).sort((a,b)=>+a.split('-')[1]-+b.split('-')[1])
  .forEach(k=>{ const l=porTag[k]; console.log(`  ${k}: ${(l.reduce((a,b)=>a+b,0)/l.length).toFixed(1)} turnos  (${l.length} lutas)`); });
