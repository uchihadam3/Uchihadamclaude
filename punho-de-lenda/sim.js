/* ========================================================================
   PUNHO DE LENDA — motor de simulação de luta (realista, round a round)
   Usa atributos + confronto de estilos + fôlego + momentum + habilidades.
   Retorna todo o "feed" da luta para o game.js reproduzir com narração.
   ===================================================================== */
const SIM = (() => {
  const rndf=(a,b)=>a+Math.random()*(b-a);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const has=(f,k)=>f.ab&&f.ab.includes(k);

  /* golpes por estilo (para a narração) */
  const STRIKES={
    boxe:['jab','direto','cruzado','gancho','uppercut'],
    muaythai:['chute baixo','joelhada','cotovelada','teep','chute no corpo'],
    kickboxing:['low kick','high kick','cruzado','chute no corpo','joelhada'],
    karate:['gyaku-tsuki','mae-geri','mawashi-geri','soco reto','chute frontal'],
    taekwondo:['chute rodado','chute gancho','chute lateral','ushiro','chute na cabeça'],
    kungfu:['palma','chute giratório','cotovelo','chute baixo','rasteira'],
    jiujitsu:['queda','raspagem','montada','pressão de guarda','estrangulamento'],
    mma:['cruzado','chute baixo','joelhada','queda','ground and pound'],
  };
  const S=(f)=>STRIKES[f.style]||STRIKES.mma;
  const pick=(a)=>a[(Math.random()*a.length)|0];

  /* fase da luta: standup | clinch | chao — decidida por estilos/habilidades */
  function decidePhase(A,B){
    // "vontade" de ir ao chão
    const grap=(f)=> (has(f,'rasteira')?1:0)+(has(f,'guarda_ferro')?1:0)+(f.style==='jiujitsu'?1.4:f.style==='mma'?0.6:0);
    const gA=grap(A), gB=grap(B);
    const takedownA=(A.a.tecnica+A.a.forca+A.a.qi)/3 + (has(A,'rasteira')?12:0);
    const tddefB=(B.a.esquiva+B.a.forca+B.a.qi)/3 + (B.style==='mma'?10:0) + (B.style==='jiujitsu'?8:0);
    const takedownB=(B.a.tecnica+B.a.forca+B.a.qi)/3 + (has(B,'rasteira')?12:0);
    const tddefA=(A.a.esquiva+A.a.forca+A.a.qi)/3 + (A.style==='mma'?10:0) + (A.style==='jiujitsu'?8:0);
    let pGround=0;
    if(gA>0.5) pGround+=clamp((takedownA-tddefB)/120+0.12,0,0.6)*(gA);
    if(gB>0.5) pGround+=clamp((takedownB-tddefA)/120+0.12,0,0.6)*(gB);
    pGround=clamp(pGround,0,0.72);
    // clinch (muay thai / rei_clinch)
    let pClinch=0;
    if(A.style==='muaythai'||B.style==='muaythai'||has(A,'rei_clinch')||has(B,'rei_clinch')) pClinch=0.2;
    const r=Math.random();
    if(r<pGround) return 'chao';
    if(r<pGround+pClinch) return 'clinch';
    return 'standup';
  }

  /* eficácia ofensiva efetiva de X contra Y numa fase */
  function offense(X,Y,phase,stam,mom){
    let o=X.d.ataque;
    // fase
    if(phase==='chao'){ o = (X.style==='jiujitsu'||has(X,'guarda_ferro'))? o+22 : o-26; if(has(X,'guarda_ferro'))o+=8; }
    if(phase==='clinch'){ o = (X.style==='muaythai'||has(X,'rei_clinch'))? o+16 : o-8; }
    // confronto de estilos
    o += DATA.matchup(X.style,Y.style)*100;
    // fôlego (cai a eficácia com cansaço)
    o *= 0.62 + 0.45*(stam/100);
    // momentum
    o += mom*10;
    // habilidades ofensivas
    if(has(X,'pressao')) o+=4;
    if(has(X,'faro_final') && Y._hp<45) o+=14;
    if(has(X,'espirito') && X._hp<45) o+=10;
    return o;
  }
  function defenseVal(Y,phase,stam){
    let d=Y.d.defesa;
    if(phase==='chao'){ d = (Y.style==='jiujitsu'||has(Y,'guarda_ferro'))? d+14 : d-18; }
    if(phase==='clinch'){ d = (Y.style==='muaythai'||has(Y,'rei_clinch'))? d+10 : d-6; }
    if(has(Y,'danca')) d+=6;
    d *= 0.7 + 0.35*(stam/100);
    return d;
  }

  function fight(A0,B0,opts){
    opts=opts||{};
    const rounds=opts.rounds||3;
    // cópia com estado
    const mk=(f,side)=>({ ...f, _hp:100, _stam:100, _mom:0, _cuts:0, _kd:0, _side:side,
      _landed:0, _sig:0 });
    const A=mk(A0,'a'), B=mk(B0,'b');
    const feed=[]; const cards=[]; // scorecards por round
    let done=false, winner=null, method='', endRound=0;
    const log=(text,kind)=>feed.push({round:curRound,text,kind:kind||'',hpA:Math.round(A._hp),hpB:Math.round(B._hp),stA:Math.round(A._stam),stB:Math.round(B._stam)});
    let curRound=0;

    log(`${A.name} (${A.styleName}) encara ${B.name} (${B.styleName}). ${rounds} rounds. Vale um lugar na história.`,'intro');

    for(let r=1;r<=rounds && !done;r++){
      curRound=r;
      let rA=0,rB=0, kdA=0,kdB=0;
      log(`— ROUND ${r} —`,'round');
      const ticks=6+((Math.random()*3)|0);
      for(let t=0;t<ticks && !done;t++){
        const phase=decidePhase(A,B);
        // quem inicia a troca
        const initScore=(x)=> x.d.ataque*0.4 + x.a.agilidade*0.3 + x._mom*8 + (has(x,'pressao')?10:0) + rndf(0,40);
        let X = initScore(A)>=initScore(B)? A:B; let Y = X===A?B:A;
        const oX=offense(X,Y,phase,X._stam,X._mom), dY=defenseVal(Y,phase,Y._stam);
        // chance de acertar
        let land=clamp(0.42 + (oX-dY)/140, 0.12, 0.9);
        if(has(Y,'danca')) land-=0.06;
        const strike=phase==='chao'? pick(S(X.style==='jiujitsu'||has(X,'guarda_ferro')?X:{style:'mma'}))
                    : phase==='clinch'? pick(['joelhada','cotovelada','desequilíbrio','pressão no clinch'])
                    : pick(S(X));
        // desgaste sempre
        X._stam-=rndf(1.4,2.6)*(has(X,'gas_infinito')?0.6:1);
        Y._stam-=rndf(0.8,1.6)*(has(Y,'gas_infinito')?0.6:1);
        if(Math.random()<land){
          // acertou
          const margin=clamp((oX-dY)/60,0.2,2.2);
          let dmg=rndf(4,9)*margin*(0.7+X.d.ataque/140);
          // golpe limpo / crítico
          let clean=Math.random()< (0.12+(X.a.precisao-Y.a.reflexo)/300 + (has(X,'nocauteador')?0.06:0));
          if(phase==='chao'&&(X.style==='jiujitsu'||has(X,'guarda_ferro'))) clean=Math.random()<0.14;
          if(has(X,'chute_giratorio')&&Math.random()<0.22){ clean=true; dmg*=1.35; }
          if(clean) dmg*=1.7;
          X._mom=clamp(X._mom+0.5,-2,3); Y._mom=clamp(Y._mom-0.4,-2,3);
          Y._hp-=dmg; X._landed++; if(clean)X._sig++;
          if(X._side==='a')rA+=dmg; else rB+=dmg;
          // narração
          if(phase==='chao'){
            if(strike.match(/estrangulamento|guilhotina/)) log(`${X.name} ameaça o ${strike}! ${Y.name} escapa por pouco.`,clean?'big':'hit');
            else log(`${X.name} controla no chão e conecta ${strike}.`,clean?'big':'hit');
          } else if(clean) log(`💥 ${X.name} acerta um ${strike} PERFEITO! ${Y.name} sente!`,'big');
          else log(`${X.name} encaixa ${strike}.`,'hit');
          // knockdown?
          const kdChance=clamp((clean?0.16:0.03)+(X.d.ataque-Y.a.queixo)/400 + (has(X,'nocauteador')?0.05:0) - (has(Y,'queixo_ferro')?0.08:0),0,0.4);
          if(phase!=='chao' && Y._hp>0 && Math.random()<kdChance){
            Y._kd++; Y._hp-=rndf(4,10); Y._mom=-1.5; X._mom=clamp(X._mom+1,0,3);
            if(X._side==='a')kdA++; else kdB++;
            log(`⬇️ QUEDA! ${X.name} derruba ${Y.name}! O ${Y.name.split(' ')[0]} se levanta cambaleando...`,'kd');
          }
          // finalização?
          if(Y._hp<=0){
            const groundFin=phase==='chao'&&(X.style==='jiujitsu'||has(X,'guarda_ferro'));
            method= groundFin? 'Finalização' : (Y._kd>0||clean)? 'Nocaute' : 'Nocaute Técnico';
            winner=X; endRound=r; done=true;
            const line= groundFin? `🏆 FINALIZAÇÃO! ${X.name} aperta o ${strike} e ${Y.name} bate! Acabou!`
              : method==='Nocaute'? `🏆 NOCAUTE FULMINANTE! ${X.name} apaga ${Y.name} no ${strike}! A torcida vai à loucura!`
              : `🏆 O árbitro interrompe! ${X.name} vence por nocaute técnico — ${Y.name} não tinha mais como continuar.`;
            log(line,'finish'); break;
          }
        } else {
          // errou → contragolpe?
          if(has(Y,'contragolpe') && Math.random()<0.45){
            const cdmg=rndf(4,8)*(0.7+Y.d.ataque/140);
            X._hp-=cdmg; Y._landed++; if(Y._side==='a')rA+=cdmg;else rB+=cdmg;
            Y._mom=clamp(Y._mom+0.6,-2,3);
            log(`↩️ ${Y.name} lê o ataque e responde com um contragolpe seco em ${X.name}!`,'hit');
            if(X._hp<=0){ winner=Y; method='Nocaute'; endRound=r; done=true; log(`🏆 NOCAUTE! O contragolpe de ${Y.name} apaga ${X.name}!`,'finish'); break; }
          } else {
            log(`${X.name} tenta o ${strike}, mas ${Y.name} ${has(Y,'danca')?'sai dançando':'bloqueia'}.`,'miss');
            X._mom=clamp(X._mom-0.3,-2,3);
          }
        }
        A._hp=clamp(A._hp,0,100); B._hp=clamp(B._hp,0,100);
        A._stam=clamp(A._stam,5,100); B._stam=clamp(B._stam,5,100);
      }
      if(done) break;
      // pontuação do round (10-9 / 10-8)
      let sa=10, sb=10;
      if(rA>rB){ sb=9-(kdA>0?1:0); if(kdA>1)sb=7; } else if(rB>rA){ sa=9-(kdB>0?1:0); if(kdB>1)sa=7; }
      else { if(kdA>kdB)sb=9; else if(kdB>kdA)sa=9; else sb=9; } // empate técnico dá pro mais ativo (levíssimo)
      cards.push([sa,sb]);
      log(`Fim do round ${r}. Placar do round: ${A.name.split(' ')[0]} ${sa}–${sb} ${B.name.split(' ')[0]}.`,'roundend');
      // recuperação de fôlego no intervalo
      A._stam=clamp(A._stam+ (has(A,'gas_infinito')?26:16),0,100);
      B._stam=clamp(B._stam+ (has(B,'gas_infinito')?26:16),0,100);
      A._mom*=0.4; B._mom*=0.4;
    }

    // decisão se não terminou
    let scoreA=0,scoreB=0, judges=[];
    if(!winner){
      cards.forEach(([a,b])=>{ scoreA+=a; scoreB+=b; });
      // 3 juízes com leve variação
      for(let j=0;j<3;j++){ let ja=0,jb=0; cards.forEach(([a,b])=>{ const sw=Math.random()<0.15;
        ja+=sw?b:a; jb+=sw?a:b; }); judges.push([ja,jb]); }
      const winsA=judges.filter(([a,b])=>a>b).length;
      winner = winsA>=2? A:B;
      method = winsA===3||winsA===0? 'Decisão Unânime' : 'Decisão Dividida';
      endRound=rounds;
      log(`Vai para os cartões dos juízes... ${judges.map(([a,b])=>`${a}-${b}`).join(', ')}.`,'decision');
      log(`🏆 ${winner.name} vence por ${method}!`,'finish');
    }
    const loser = winner===A? B:A;
    return { winner:{id:winner.id,name:winner.name}, loser:{id:loser.id,name:loser.name},
      playerWon: winner._side==='a', method, endRound, feed, cards, judges,
      statsA:{landed:A._landed,sig:A._sig,hp:Math.round(A._hp),kd:A._kd},
      statsB:{landed:B._landed,sig:B._sig,hp:Math.round(B._hp),kd:B._kd} };
  }

  return { fight };
})();
