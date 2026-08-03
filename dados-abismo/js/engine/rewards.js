/* RECOMPENSAS (§9): 1 de 3 — Dado Novo | Gravação | Relíquia | Cura */
import { RELIQUIAS } from '../data/relics.js';
import { makeDie, cloneDie, upgradeTipo, MATERIAIS } from '../data/dice.js';
import { face } from '../data/faces.js';

const GRAVACOES = [
  { id:'g_blade',  nome:'Gravar ⚔ Lâmina',  ap:(d,i)=>{ d.faces[i]=face('blade', d.faces[i].v||Math.ceil(d.n/2)); } },
  { id:'g_shield', nome:'Gravar 🛡 Escudo',  ap:(d,i)=>{ d.faces[i]=face('shield',d.faces[i].v||Math.ceil(d.n/2)); } },
  { id:'g_wild',   nome:'Gravar ◈ Curinga', ap:(d,i)=>{ d.faces[i]=face('wild',0); } },
  { id:'g_ess',    nome:'Gravar ✦ Essência',ap:(d,i)=>{ d.faces[i]=face('essence',0); } },
  { id:'g_echo',   nome:'Gravar ⟳ Eco',     ap:(d,i)=>{ d.faces[i]=face('echo', d.faces[i].v||1); } },
  { id:'g_up',     nome:'Subir o dado (d+)',up:true },
];
/* ESCOLHE JÁ o dado/face que a gravação vai mexer — assim a tela consegue
   mostrar "como era → como ficou" antes de você aceitar. */
const numericas = d => d.faces.filter(f=>f.k==='num'||f.k==='blade'||f.k==='shield').length;
export function alvoDaGravacao(g, estado, rng){
  const cands = estado.bag.filter(d=> g.up ? true : numericas(d) > Math.ceil(d.faces.length/2));
  const lista = cands.length? cands : estado.bag;
  const d = lista[rng.int(lista.length)];
  if(!d) return null;
  if(g.up) return { id:d.id, i:-1 };
  const idxs = d.faces.map((f,i)=>({f,i})).filter(x=>x.f.k==='num').sort((a,b)=>a.f.v-b.f.v);
  return { id:d.id, i: idxs.length? idxs[0].i : rng.int(d.faces.length) };
}
/* como o dado FICA depois da gravação (sem tocar no dado de verdade) */
export function simularGravacao(opt, estado){
  const g = GRAVACOES.find(x=>x.id===opt.g); if(!g || !opt.alvo) return null;
  const d = estado.bag.find(x=>x.id===opt.alvo.id); if(!d) return null;
  if(g.up){ const up=upgradeTipo(cloneDie(d)); return { antes:d, depois:up, i:-1, subiu:true }; }
  const c = cloneDie(d); g.ap(c, opt.alvo.i);
  return { antes:d, depois:c, i:opt.alvo.i, subiu:false };
}
export function gerarOpcoes(rng, estado, n=3){
  const pool=[];
  pool.push({ t:'dado', nome:'Dado Novo', desc:'Entra na Bolsa (mais opções, mais diluição).',
              tipo: rng.pick(['d4','d6','d6','d8','d8','d10']), mat: rng.pick(Object.keys(MATERIAIS)) });
  const g = rng.pick(GRAVACOES);
  pool.push({ t:'grav', nome:g.nome, desc:'Altera uma face de um dado seu (forja, §5.3).', g:g.id,
              alvo: alvoDaGravacao(g, estado, rng) });
  const tidas = new Set(estado.relics.map(r=>r.id));
  const disp = RELIQUIAS.filter(r=>!tidas.has(r.id));
  if(disp.length){
    const rel = rng.pickWeighted(disp, r=> r.r==='comum'?6 : r.r==='rara'?3 : 1.2);
    pool.push({ t:'reliquia', nome:rel.nome, desc:rel.txt, r:rel.r, rel });
  }
  pool.push({ t:'cura', nome:'Cura', desc:'Recupera 25% do HP máximo.' });
  return rng.shuffle(pool).slice(0, n);
}
export function aplicar(opt, estado, rng){
  if(opt.t==='dado'){ estado.bag.push(makeDie(opt.tipo, opt.mat)); }
  else if(opt.t==='grav'){
    const g = GRAVACOES.find(x=>x.id===opt.g);
    // o alvo já foi escolhido na geração (é o que a tela mostrou); só reconfirma
    const alvo = opt.alvo || alvoDaGravacao(g, estado, rng);
    const d = alvo && estado.bag.find(x=>x.id===alvo.id);
    if(!d) return estado;
    if(g.up){ const up=upgradeTipo(d); estado.bag[estado.bag.indexOf(d)]=up; }
    else { const c=cloneDie(d); g.ap(c, alvo.i); estado.bag[estado.bag.indexOf(d)]=c; }
  }
  else if(opt.t==='reliquia'){ estado.relics.push(opt.rel); recalcRelics(estado); }
  else if(opt.t==='cura'){ estado.hp = Math.min(estado.maxHp, estado.hp + Math.round(estado.maxHp*0.25)); }
  return estado;
}
/* consolida os modificadores numéricos das relíquias */
export function recalcRelics(estado){
  const m = { rerollBonus:0, blockBonus:0, dmgFlat:0, dmgMult:1, pierce:0, hpBonus:0, hpMult:1 };
  const flags = new Set(); const starts=[]; const kills=[];
  for(const r of estado.relics){
    for(const k in (r.mods||{})){ if(k==='dmgMult'||k==='hpMult') m[k]*=r.mods[k]; else m[k]+=r.mods[k]; }
    if(r.flag) flags.add(r.flag);
    if(r.start) starts.push(r.start);
    if(r.onKill) kills.push(r.onKill);
    if(r.extraDie && !r._aplicado){ r._aplicado=true;
      for(let i=0;i<(r.extraDie.n||1);i++){ const d=makeDie(r.extraDie.tipo, r.extraDie.mat);
        if(r.extraDie.cursed) d.faces[0]=face('void',0); estado.bag.push(d); } }
  }
  const baseMax = estado.baseMaxHp || estado.maxHp;
  estado.baseMaxHp = baseMax;
  estado.maxHp = Math.max(1, Math.round((baseMax + m.hpBonus) * m.hpMult));
  estado.hp = Math.min(estado.hp, estado.maxHp);
  estado.relicMods = m; estado.relicFlags = flags; estado.relicStarts = starts; estado.relicKills = kills;
  return estado;
}
