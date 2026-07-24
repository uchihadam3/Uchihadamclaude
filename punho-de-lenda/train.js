/* ========================================================================
   PUNHO DE LENDA — motor de TREINO (o coração do manager/idle)
   O técnico escolhe os focos; aqui roda a semana de forma realista:
   ganhos rumo ao POTENCIAL, fadiga/condição, lesões, overtraining,
   XP técnico (nova habilidade) e evolução de habilidade escolhida.
   ===================================================================== */
const GYM = (() => {
  const D=DATA, ALL=D.ALL;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const pick=a=>a[(Math.random()*a.length)|0];

  // idade: mais novo evolui mais rápido; mais velho, mais lesão e recupera pior
  function youth(age){ return age<=22?1.22: age<=26?1.06: age<=30?0.92: age<=33?0.78: 0.62; }

  // atributos do foco "específico do estilo" = pontos naturais do estilo
  function styleAttrs(f){
    const bias=D.STYLES[f.style].bias;
    const keys=Object.keys(bias).sort((a,b)=>bias[b]-bias[a]).slice(0,4);
    const o={}; keys.forEach((k,i)=>o[k]=0.9-i*0.13); return o;
  }

  /* ---- SIMULA UMA SEMANA DE CAMP ---- */
  function week(S, focusIds, intensId){
    const f=S.fighter, pot=f.potential||f.a;
    const In=D.INTENS[intensId]||D.INTENS.moderado;
    const yf=youth(S.age);
    const focuses=focusIds.map(id=>D.TRAIN_BY[id]).filter(Boolean);
    const before={}; ALL.forEach(k=>before[k]=f.a[k]);
    const condBefore=Math.round(S.cond), fatBefore=Math.round(S.fat);

    // penalidade por fadiga acumulada (overtraining reduz ganhos)
    const fatPen = fatBefore>85?0.45 : fatBefore>68?0.72 : fatBefore>50?0.9 : 1;

    const gain={}; ALL.forEach(k=>gain[k]=0);
    let fatAdd=0, condAdd=0, injRisk=0, sx=0, restWk=false;
    const focusNames=[];
    focuses.forEach(t=>{
      focusNames.push(t.name);
      const attrs = t.styleFocus? styleAttrs(f) : t.attrs;
      for(const k in attrs){
        const room=clamp((pot[k]-f.a[k])/22, 0, 1);       // encolhe perto do teto
        gain[k]+= 1.85*attrs[k]*In.mult*yf*(0.14+room*0.86)*fatPen*rnd(0.82,1.16);
      }
      fatAdd += t.rest? t.fat : t.fat*In.fat;
      condAdd+= t.cond;
      injRisk+= t.inj*In.inj;
      sx += (t.sx||0)*In.mult;
      if(t.rest) restWk=true;
    });

    // aplica fadiga/condição + recuperação natural do corpo na semana
    S.fat = clamp(S.fat + fatAdd - D.CAMP.natFat, 0, 100);
    S.cond= clamp(S.cond+ condAdd + D.CAMP.natCond, 0, 100);

    // overtraining severo: regressão de atributo
    let regressed=null;
    if(fatBefore>88 && !restWk && Math.random()<0.6){
      const k=pick(ALL); gain[k]-= rnd(1,3); regressed=k;
    }

    // aplica ganhos (teto = potencial real)
    const deltas={};
    ALL.forEach(k=>{ const cap=Math.min(99,pot[k]);
      const nv=clamp(Math.round(f.a[k]+gain[k]), 38, cap);
      if(nv!==before[k]) deltas[k]=nv-before[k];
      f.a[k]=nv;
    });
    f.d=D.derived(f.a);

    // lesão
    let injury=null;
    if(!restWk){
      const durab=(f.a.queixo+f.a.coracao+f.a.folego)/3;
      let p=injRisk*(1+S.fat/110)*(1+Math.max(0,S.age-30)*0.05)*(1-(durab-60)/320);
      p=clamp(p,0,0.6);
      if(Math.random()<p){
        const r=Math.random();
        const sev= r<0.62?{n:'leve',w:1,c:-12,a:[3,6]} : r<0.9?{n:'moderada',w:2,c:-20,a:[6,10]} : {n:'grave',w:3,c:-26,a:[10,15]};
        const parts={}; const k=pick(ALL); parts[k]=Math.round(rnd(sev.a[0],sev.a[1]));
        if(sev.n==='grave'){ const k2=pick(ALL); parts[k2]=Math.round(rnd(4,7)); }
        const TYPES=['torção no tornozelo','costela trincada','corte na sobrancelha','mão inchada','lesão no joelho','estiramento','concussão leve'];
        injury={ name:pick(TYPES), sev:sev.n, parts, weeksLeft:sev.w };
        S.cond=clamp(S.cond+sev.c,0,100);
        S.injury = S.injury? mergeInjury(S.injury,injury) : injury;
      }
    }
    // cura de lesão existente (descanso cura mais rápido)
    if(S.injury && !injury){
      S.injury.weeksLeft -= restWk?2:1;
      if(S.injury.weeksLeft<=0) S.injury=null;
    } else if(S.injury && injury && restWk){ /* não cura na semana que se machucou */ }

    // XP técnico → possível nova habilidade
    S.skillXp=(S.skillXp||0)+sx;
    let breakthrough=false;
    const maxAb=6;
    if(S.skillXp>=D.CAMP.breakthroughXp && (f.ab.length<maxAb)){ breakthrough=true; }

    // evolução da habilidade em foco
    let leveled=null;
    if(S.skillFocus && f.ab.includes(S.skillFocus)){
      S.abXp=S.abXp||{};
      S.abXp[S.skillFocus]=(S.abXp[S.skillFocus]||0)+ 1.35*In.mult*(restWk?0.3:1);
      const lv=(f.abLv&&f.abLv[S.skillFocus])||1;
      if(lv<3 && S.abXp[S.skillFocus]>=D.CAMP.levelXpPer){
        f.abLv=f.abLv||{}; f.abLv[S.skillFocus]=lv+1; S.abXp[S.skillFocus]=0; leveled=S.skillFocus;
      }
    }

    S.age += 1/34;                 // ~ envelhece devagar ao longo da carreira
    S.week=(S.week||0)+1;
    if(S.campWeeksLeft>0) S.campWeeksLeft--;

    return { days:montage(f,focuses,intensId,{injury,regressed,restWk}),
      focusNames, intens:intensId, deltas, regressed,
      condBefore, condAfter:Math.round(S.cond), fatBefore, fatAfter:Math.round(S.fat),
      injury, breakthrough, leveled, campWeeksLeft:S.campWeeksLeft };
  }
  function mergeInjury(a,b){ const parts=Object.assign({},a.parts);
    for(const k in b.parts) parts[k]=(parts[k]||0)+b.parts[k];
    return { name:b.name, sev:b.sev, parts, weeksLeft:Math.max(a.weeksLeft,b.weeksLeft) }; }

  /* ---- narração do treino (montagem) ---- */
  const FLAV = {
    musculacao:['puxou ferro pesado, agachamento e levantamento','trabalho de potência explosiva na academia'],
    cardio:['rodou quilômetros na estrada de manhã','tiros de sprint e corda até o fôlego gritar'],
    velocidade:['drills de reação e mão rápida no manequim','pliometria e explosão de saída'],
    sparring:['rounds duros de sparring com os parceiros','trocou pesado — luta simulada de verdade'],
    pads:['manoplas afiadas com o treinador','saco pesado e precisão milimétrica'],
    defesa:['esquiva na corda, cabeça fora de linha','drills de guarda e leitura de golpe'],
    especifico:['aperfeiçoou o arsenal do estilo dele','treino técnico específico da modalidade'],
    mental:['estudou vídeos do adversário e estratégia','trabalho mental e visualização de luta'],
    descanso:['recuperação ativa, gelo e fisioterapia','dia de descanso pra soldar os ganhos'],
  };
  function montage(f,focuses,intens,ev){
    const days=[]; const dn=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    const list=focuses.length?focuses:[{id:'descanso'}];
    for(let i=0;i<Math.min(5,Math.max(3,list.length+2));i++){
      const t=list[i%list.length]; const fl=FLAV[t.id]||['treinou firme'];
      days.push(`${dn[i]}: ${pick(fl)}.`);
    }
    if(intens==='pesado') days.push('O ritmo foi brutal essa semana. 🔴');
    if(ev.restWk) days.push('Semana leve pra recuperar o corpo. 🛌');
    if(ev.injury) days.push(`⚠️ Contratempo: ${ev.injury.name} (${ev.injury.sev}) no treino.`);
    if(ev.regressed) days.push('Sinais de excesso de treino — o corpo cobrou a conta.');
    return days;
  }

  /* ---- candidatos a NOVA habilidade (3 opções coerentes) ---- */
  function candidates(S){
    const f=S.fighter; const owned=new Set(f.ab);
    const aff=D.STYLE_SKILL_AFF[f.style]||[];
    const pool=Object.keys(D.ABIL).filter(id=>!owned.has(id));
    const scored=pool.map(id=>{ const m=D.SKILL_META[id]; let s=Math.random()*1.2;
      if(m){ if(aff.includes(m.cat)) s+=2; // combina com estilo
        s+= (m.core.reduce((x,k)=>x+f.a[k],0)/m.core.length)/60; } // combina com pontos fortes
      return {id,s}; });
    scored.sort((a,b)=>b.s-a.s);
    return scored.slice(0,3).map(x=>x.id);
  }
  function learn(S,id){ S.fighter.ab.push(id); S.fighter.abLv=S.fighter.abLv||{}; S.fighter.abLv[id]=1;
    S.skillXp=Math.max(0,(S.skillXp||0)-D.CAMP.breakthroughXp); }

  /* ---- lutador EFETIVO pra luta (condição, lesão, nível de habilidade) ---- */
  function effective(S){
    const f=S.fighter; const eff=JSON.parse(JSON.stringify(f));
    const condF=0.80+0.20*(S.cond/100);
    ALL.forEach(k=>{ eff.a[k]=clamp(Math.round(f.a[k]*condF),30,99); });
    (f.ab||[]).forEach(id=>{ const lv=(f.abLv&&f.abLv[id])||1; const m=D.SKILL_META[id];
      if(m&&lv>1) m.core.forEach(k=> eff.a[k]=clamp(eff.a[k]+(lv-1)*2,30,99)); });
    if(S.injury){ for(const k in S.injury.parts) eff.a[k]=clamp(eff.a[k]-S.injury.parts[k],25,99); }
    eff.d=D.derived(eff.a);
    return eff;
  }

  /* ---- recuperação rápida entre lutas do torneio ---- */
  function recover(S, mode){
    const r={cond:0,fat:0,heal:0,note:''};
    if(mode==='descanso'){ S.cond=clamp(S.cond+22,0,100); S.fat=clamp(S.fat-24,0,100); r.note='Descanso total: recuperou bem.'; if(S.injury){S.injury.weeksLeft--; if(S.injury.weeksLeft<=0)S.injury=null;} }
    else if(mode==='afiar'){ S.cond=clamp(S.cond+8,0,100); S.fat=clamp(S.fat-8,0,100);
      S.fighter.a.tecnica=Math.min(99,S.fighter.a.tecnica+1); S.fighter.a.reflexo=Math.min(99,S.fighter.a.reflexo+1); S.fighter.d=D.derived(S.fighter.a); r.note='Ficou afiado, mas descansou menos.'; }
    else if(mode==='tratar'){ S.cond=clamp(S.cond+12,0,100); if(S.injury){S.injury.weeksLeft-=2; if(S.injury.weeksLeft<=0)S.injury=null; r.note='Tratou a lesão intensivamente.'; } else r.note='Fisioterapia preventiva.'; }
    return r;
  }

  return { week, candidates, learn, effective, recover, youth };
})();
