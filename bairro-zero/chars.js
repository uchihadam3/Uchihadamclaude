/* ========================================================================
   BAIRRO ZERO — personagens: modelos texturizados + animação procedural
   Rig articulado (braços/pernas em 2 segmentos), rosto, roupas, mochila.
   ===================================================================== */
const CHARS = (() => {
  const texCache = {};
  function cv(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }
  function ct(c){ const t=new THREE.CanvasTexture(c); t.magFilter=THREE.NearestFilter; t.minFilter=THREE.NearestFilter; return t; }
  function shade(hex,amt){ const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    r=Math.max(0,Math.min(255,r+amt*255)); g=Math.max(0,Math.min(255,g+amt*255)); b=Math.max(0,Math.min(255,b+amt*255));
    return `rgb(${r|0},${g|0},${b|0})`; }
  function mat(key,painter){ if(texCache[key]) return texCache[key];
    const m=new THREE.MeshLambertMaterial({map:ct(painter())}); texCache[key]=m; return m; }
  function plain(key,color){ if(texCache[key]) return texCache[key];
    const m=new THREE.MeshLambertMaterial({color}); texCache[key]=m; return m; }

  /* ---------- texturas de rosto ---------- */
  function faceTex(skin, o){ // o: {zombie, blood, eyes}
    return ()=>{ const c=cv(32,32), g=c.getContext('2d');
      g.fillStyle=skin; g.fillRect(0,0,32,32);
      // sombra dos olhos
      g.fillStyle=shade(skin, o.zombie?-0.22:-0.10); g.fillRect(5,10,9,4); g.fillRect(18,10,9,4);
      // olhos
      if(o.zombie){ g.fillStyle='#d8d8c8'; g.fillRect(7,11,5,3); g.fillRect(20,11,5,3);
        g.fillStyle='#8a9a70'; g.fillRect(9,11,2,3); g.fillRect(22,11,2,3); }
      else { g.fillStyle='#f0ece0'; g.fillRect(7,11,5,3); g.fillRect(20,11,5,3);
        g.fillStyle=o.eyes||'#3a2a1a'; g.fillRect(9,11,2,3); g.fillRect(22,11,2,3); }
      // sobrancelha
      g.fillStyle=o.zombie?shade(skin,-0.3):'#2a2018'; g.fillRect(6,8,8,2); g.fillRect(19,8,8,2);
      // nariz
      g.fillStyle=shade(skin,-0.14); g.fillRect(14,15,4,5);
      // boca
      if(o.zombie){ g.fillStyle='#4a1410'; g.fillRect(10,23,12,4);
        g.fillStyle='#d8d0c0'; for(let i=0;i<5;i++)g.fillRect(11+i*2.4,23,1,2);
        g.fillStyle='#6a1210'; g.fillRect(9,26,4,5); }
      else { g.fillStyle=shade(skin,-0.32); g.fillRect(12,23,9,2); }
      // machucados de zumbi
      if(o.zombie){ g.fillStyle='#5a2018'; g.fillRect(2,4,6,3); g.fillRect(24,17,6,2);
        g.fillStyle=shade(skin,-0.28); g.fillRect(3,18,4,6); }
      return c; };
  }
  function skinTex(skin,zombie){ return ()=>{ const c=cv(16,16), g=c.getContext('2d');
    g.fillStyle=skin; g.fillRect(0,0,16,16);
    if(zombie){ g.fillStyle=shade(skin,-0.2); g.fillRect(2,3,5,3); g.fillRect(9,10,5,4);
      g.fillStyle='#5a2018'; g.fillRect(11,2,4,2); }
    else { g.fillStyle=shade(skin,-0.06); g.fillRect(3,4,4,3); }
    return c; }; }
  /* ---------- texturas de roupa ---------- */
  function shirtTex(col, o){ // o:{zombie, tie, pocket}
    return ()=>{ const c=cv(32,48), g=c.getContext('2d');
      g.fillStyle=col; g.fillRect(0,0,32,48);
      g.fillStyle=shade(col,0.08); g.fillRect(0,0,32,4);                 // colarinho
      g.fillStyle=shade(col,-0.15); g.fillRect(15,4,2,26);               // botões/linha
      for(let y=8;y<28;y+=6){ g.fillStyle='#e8e4d8'; g.fillRect(15,y,2,2); }
      if(o.pocket){ g.fillStyle=shade(col,-0.1); g.fillRect(4,12,8,8); g.fillRect(20,12,8,8); }
      g.fillStyle=shade(col,-0.2); g.fillRect(0,44,32,4);                // barra
      // rugas
      g.strokeStyle=shade(col,-0.12); g.lineWidth=1;
      g.beginPath(); g.moveTo(4,30); g.lineTo(10,34); g.moveTo(26,26); g.lineTo(20,32); g.stroke();
      if(o.zombie){ // sangue e rasgos
        g.fillStyle='#4a1210'; g.fillRect(3,6,9,7); g.fillRect(18,26,11,9); g.fillRect(8,38,7,6);
        g.fillStyle='#661a12'; g.fillRect(5,8,5,3); g.fillRect(21,29,6,4);
        g.fillStyle='#2a2018'; g.fillRect(24,8,6,3); }
      return c; }; }
  function pantsTex(col,zombie){ return ()=>{ const c=cv(16,32), g=c.getContext('2d');
    g.fillStyle=col; g.fillRect(0,0,16,32);
    g.fillStyle=shade(col,-0.12); g.fillRect(0,0,16,3); g.fillRect(7,0,2,32);
    g.fillStyle=shade(col,0.06); g.fillRect(2,6,3,10);
    if(zombie){ g.fillStyle='#3a1210'; g.fillRect(2,18,7,6); g.fillStyle='#241a12'; g.fillRect(10,26,5,4); }
    // sapato
    g.fillStyle='#241c14'; g.fillRect(0,27,16,5);
    return c; }; }
  function hairTex(col){ return ()=>{ const c=cv(16,16), g=c.getContext('2d');
    g.fillStyle=col; g.fillRect(0,0,16,16);
    g.fillStyle=shade(col,0.1); for(let i=0;i<5;i++) g.fillRect(i*3+1,2,1,12);
    return c; }; }

  /* ---------- textura de torso nu (ferido) ---------- */
  function bareTex(skin){ return ()=>{ const c=cv(32,48), g=c.getContext('2d');
    g.fillStyle=skin; g.fillRect(0,0,32,48);
    g.fillStyle=shade(skin,-0.12); g.fillRect(8,10,4,3); g.fillRect(20,10,4,3);   // peito
    g.fillStyle=shade(skin,-0.08); g.fillRect(15,6,2,30);
    g.fillStyle='#4a1210'; g.fillRect(4,16,10,8); g.fillRect(19,30,9,7);          // feridas
    g.fillStyle='#661a12'; g.fillRect(6,18,6,4); g.fillRect(21,32,5,3);
    g.fillStyle=shade(skin,-0.25); g.fillRect(2,38,8,4);
    return c; }; }
  function dressTex(col){ return ()=>{ const c=cv(32,48), g=c.getContext('2d');
    g.fillStyle=col; g.fillRect(0,0,32,48);
    g.fillStyle=shade(col,0.1); for(let x=2;x<32;x+=6)g.fillRect(x,4,2,40);       // pregas
    g.fillStyle='#4a1210'; g.fillRect(5,12,9,8); g.fillRect(20,28,8,6);           // sangue
    g.fillStyle=shade(col,-0.2); g.fillRect(0,44,32,4);
    return c; }; }

  /* ---------- construção do rig ---------- */
  // pal: {skin, shirt, pants, hair, eyes, zombie, pocket, outfit:'shirt'|'bare'|'dress', bald}
  function build(pal){
    const g=new THREE.Group();
    const key=(s)=>s+'|'+JSON.stringify(pal);
    const skinM=mat(key('sk'),skinTex(pal.skin,pal.zombie));
    const faceM=mat(key('fc'),faceTex(pal.skin,{zombie:pal.zombie,eyes:pal.eyes}));
    const hairM=pal.bald? mat(key('hrb'),skinTex(pal.skin,pal.zombie)) : mat(key('hr'),hairTex(pal.hair));
    const shirtM= pal.outfit==='bare'? mat(key('br'),bareTex(pal.skin))
      : pal.outfit==='dress'? mat(key('dr'),dressTex(pal.shirt))
      : mat(key('sh'),shirtTex(pal.shirt,{zombie:pal.zombie,pocket:pal.pocket}));
    const pantsM= pal.outfit==='dress'? mat(key('drp'),dressTex(pal.shirt)) : mat(key('pt'),pantsTex(pal.pants,pal.zombie));
    const B=(w,h,d,m)=>new THREE.Mesh(new THREE.BoxGeometry(w,h,d), m);
    const root=new THREE.Group(); g.add(root);            // root = corpo (p/ cair/deitar)
    // pélvis + torso
    const pelvis=B(0.34,0.18,0.22,pantsM); pelvis.position.y=0.98; root.add(pelvis);
    const torso=B(0.42,0.55,0.26,shirtM); torso.position.y=1.34; root.add(torso);
    // cabeça: materiais por face [+x,-x,+y,-y,+z(face),-z]
    const head=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.28,0.26),[skinM,skinM,hairM,skinM,faceM,hairM]);
    const neck=new THREE.Group(); neck.position.y=1.62; root.add(neck);
    head.position.y=0.15; neck.add(head);
    const hairTop=B(0.28,0.08,0.28,hairM); hairTop.position.y=0.31; neck.add(hairTop);
    // braços (2 segmentos)
    function arm(side){
      const sh=new THREE.Group(); sh.position.set(side*0.27,1.56,0); root.add(sh);
      const up=B(0.12,0.3,0.12,(pal.outfit==='bare'||pal.outfit==='dress')?skinM:shirtM); up.position.y=-0.15; sh.add(up);
      const el=new THREE.Group(); el.position.y=-0.3; sh.add(el);
      const fo=B(0.11,0.3,0.11,skinM); fo.position.y=-0.15; el.add(fo);
      return {sh,el};
    }
    const armL=arm(-1), armR=arm(1);
    // pernas (2 segmentos)
    function leg(side){
      const hip=new THREE.Group(); hip.position.set(side*0.1,0.9,0); root.add(hip);
      const th=B(0.15,0.44,0.16,pantsM); th.position.y=-0.22; hip.add(th);
      const kn=new THREE.Group(); kn.position.y=-0.44; hip.add(kn);
      const sn=B(0.14,0.46,0.15,pantsM); sn.position.y=-0.23; kn.add(sn);
      return {hip,kn};
    }
    const legL=leg(-1), legR=leg(1);
    // arma na mão direita
    const weapon=new THREE.Group(); weapon.position.y=-0.32; armR.el.add(weapon);
    const batM=plain('bat','#a08050'), panM=plain('pan','#4a4a52'), crowM=plain('crow','#8a2a22'), knifeM=plain('knife','#b8c0c8');
    const wMeshes={
      taco:(()=>{ const m=B(0.07,0.72,0.07,batM); m.position.y=-0.25; return m; })(),
      frig:(()=>{ const grp=new THREE.Group(); const p=B(0.26,0.05,0.26,panM); p.position.y=-0.4; grp.add(p);
        const h=B(0.05,0.3,0.05,batM); h.position.y=-0.15; grp.add(h); return grp; })(),
      peca:(()=>{ const m=B(0.06,0.6,0.06,crowM); m.position.y=-0.2; return m; })(),
      faca:(()=>{ const m=B(0.04,0.3,0.02,knifeM); m.position.y=-0.12; return m; })(),
      martelo:(()=>{ const grp=new THREE.Group(); const h=B(0.05,0.4,0.05,batM); h.position.y=-0.12; grp.add(h);
        const hd=B(0.16,0.08,0.08,panM); hd.position.y=-0.3; grp.add(hd); return grp; })(),
    };
    Object.values(wMeshes).forEach(m=>{ m.visible=false; weapon.add(m); });
    // mochila
    const packS=B(0.3,0.36,0.14,plain('packS','#7a3a2a')); packS.position.set(0,1.36,-0.21); packS.visible=false; root.add(packS);
    const packB=B(0.34,0.46,0.18,plain('packB','#3a5a3a')); packB.position.set(0,1.34,-0.23); packB.visible=false; root.add(packB);
    // sombra
    const shTex=(()=>{ const c=cv(64,64); const gg=c.getContext('2d');
      const r=gg.createRadialGradient(32,32,4,32,32,30); r.addColorStop(0,'rgba(0,0,0,.38)'); r.addColorStop(1,'rgba(0,0,0,0)');
      gg.fillStyle=r; gg.fillRect(0,0,64,64); return ct(c); })();
    const blob=new THREE.Mesh(new THREE.PlaneGeometry(1.05,1.05), new THREE.MeshBasicMaterial({map:shTex,transparent:true,depthWrite:false}));
    blob.rotation.x=-Math.PI/2; blob.position.y=0.03; g.add(blob);
    return { group:g, root, neck, head, torso, pelvis, armL, armR, legL, legR, weapon, wMeshes, packS, packB,
      t:Math.random()*10, state:'idle', actT:0, act:null, lean:0, fallen:0 };
  }
  function showWeapon(rig,id){ Object.entries(rig.wMeshes).forEach(([k,m])=>m.visible=(k===id)); }
  function showPack(rig,tier){ rig.packS.visible=tier===1; rig.packB.visible=tier===2; }

  /* ---------- animação procedural ---------- */
  const L=(a,b,k)=>a+(b-a)*k;
  function pose(rig, dt, o){
    // o: {speed(0..1..2), zombie, chasing, sneak, crawler, fallen(0..1), dead}
    rig.t+=dt*(1+o.speed*2.2);
    const k=Math.min(1,dt*10), t=rig.t;
    let aLsh=0,aLel=0,aRsh=0,aRel=0, lLh=0,lLk=0,lRh=0,lRk=0, lean=0, bobY=0, neckX=0, rootRX=0, rootY=0;
    if(o.dead||o.fallen>=1){ rootRX=-Math.PI/2; rootY=-0.72;
      aLsh=0.4; aRsh=0.5; lLh=0.15; lRh=-0.1;
    } else if(o.crawler){
      rootRX=-Math.PI/2+0.18; rootY=-0.62;
      const s=Math.sin(t*3);
      aLsh=-2.6+s*0.5; aLel=-0.5; aRsh=-2.6-s*0.5; aRel=-0.5;
      lLh=0.3+s*0.15; lRh=0.3-s*0.15;
    } else if(o.act==='swing'){ const p=o.actP;      // 0..1 — arco com torção do tronco
      aRsh=p<0.4? L(-2.4,-2.4,p/0.4) : L(-2.4,0.7,(p-0.4)/0.6);
      aRel=p<0.4? -0.5 : L(-0.5,-0.1,(p-0.4)/0.6);
      aLsh=0.35; lean=0.28; neckX=0.1;
      rig.root.rotation.y=p<0.4? L(0,-0.5,p/0.4) : L(-0.5,0.55,(p-0.4)/0.6);
    } else if(o.act==='stab'){ const p=o.actP;       // estocada rápida de faca
      const e=p<0.3? p/0.3 : 1-(p-0.3)/0.7;
      aRsh=L(-0.6,-1.7,e); aRel=L(-0.4,-0.05,e); aLsh=0.25; lean=0.32*e;
    } else if(o.act==='lunge'){ const p=o.actP;      // AGARRÃO do zumbi (aviso antes da mordida)
      const e=p<0.55? p/0.55 : 1;
      aLsh=L(-1.2,-2.15,e); aRsh=L(-1.1,-2.05,e); aLel=-0.15; aRel=-0.2;
      lean=L(0.1,-0.22,Math.min(1,p/0.5));           // inclina pra trás armando...
      if(p>0.72){ lean=0.5; neckX=0.35; }            // ...e dá o bote
      rig.group.rotation.z=Math.sin(p*20)*0.03;
    } else if(o.act==='shove'){ const p=o.actP;
      const e=p<0.35? p/0.35 : 1-(p-0.35)/0.65;
      aLsh=L(0,-1.5,e); aRsh=L(0,-1.5,e); aLel=L(0,-0.2,e); aRel=L(0,-0.2,e); lean=0.3*e;
    } else if(o.act==='stomp'){ const p=o.actP;
      const e=p<0.4? p/0.4 : 1-(p-0.4)/0.6;
      lRh=L(0,-1.4,e); lRk=L(0,1.2,e); lean=0.2*e; aLsh=0.3*e; aRsh=0.3*e;
    } else if(o.act==='hit'){ const p=o.actP; lean=-0.3*(1-p); aLsh=0.5*(1-p); aRsh=0.5*(1-p);
    } else if(o.act==='climb'){ const p=o.actP;
      lean=0.5; lLh=-1.2*Math.sin(p*Math.PI); lLk=0.8*Math.sin(p*Math.PI);
      aLsh=-1.6; aRsh=-1.6; aLel=-0.4; aRel=-0.4; bobY=0.3*Math.sin(p*Math.PI);
    } else if(o.act==='eat'){ const p=o.actP; const e=Math.sin(p*Math.PI);
      aRsh=L(0,-2.2,e); aRel=L(0,-1.0,e); neckX=0.2*e;
    } else if(o.speed>0.05){
      const amp=o.zombie? 0.42 : (o.sneak?0.4:0.62)*Math.min(1,o.speed);
      const s=Math.sin(t*5.2), c=Math.cos(t*5.2);
      lLh=s*amp; lRh=-s*amp;
      lLk=Math.max(0, -c)*amp*1.1; lRk=Math.max(0, c)*amp*1.1;
      if(o.zombie){
        if(o.chasing){ aLsh=-1.9+s*0.12; aRsh=-1.85-s*0.12; aLel=-0.25; aRel=-0.3; }
        else { aLsh=-0.5+s*0.2; aRsh=-0.4-s*0.25; aLel=-0.5; aRel=-0.55; }
        lean=0.16+Math.sin(t*2.3)*0.05; neckX=0.14; rig.group.rotation.z=Math.sin(t*2.6)*0.05;
      } else {
        aLsh=-s*amp*0.8; aRsh=s*amp*0.8; aLel=-0.25; aRel=-0.25;
        lean=o.sneak?0.45:(o.speed>1.1?0.22:0.06);
        bobY=Math.abs(c)*0.05*o.speed;
      }
    } else { // idle
      const br=Math.sin(t*1.6)*0.02;
      bobY=br; aLsh=0.05+br; aRsh=-0.05-br; aLel=-0.15; aRel=-0.15;
      if(o.zombie){ aLsh=-0.4; aRsh=-0.35; aLel=-0.6; aRel=-0.65; lean=0.12; neckX=0.16;
        rig.group.rotation.z=Math.sin(t*0.8)*0.04; }
      if(o.sneak) lean=0.42;
    }
    // aplica com suavização
    rig.armL.sh.rotation.x=L(rig.armL.sh.rotation.x,aLsh,k); rig.armL.el.rotation.x=L(rig.armL.el.rotation.x,aLel,k);
    rig.armR.sh.rotation.x=L(rig.armR.sh.rotation.x,aRsh,k); rig.armR.el.rotation.x=L(rig.armR.el.rotation.x,aRel,k);
    rig.legL.hip.rotation.x=L(rig.legL.hip.rotation.x,lLh,k); rig.legL.kn.rotation.x=L(rig.legL.kn.rotation.x,lLk,k);
    rig.legR.hip.rotation.x=L(rig.legR.hip.rotation.x,lRh,k); rig.legR.kn.rotation.x=L(rig.legR.kn.rotation.x,lRk,k);
    rig.root.rotation.x=L(rig.root.rotation.x, rootRX+lean*(rootRX?0:1), k*(rootRX?1.5:1));
    if(!rootRX) rig.root.rotation.x=L(rig.root.rotation.x, lean, k);
    rig.root.position.y=L(rig.root.position.y, rootY+bobY, k);
    rig.neck.rotation.x=L(rig.neck.rotation.x,neckX,k);
    if(o.act!=='swing') rig.root.rotation.y=L(rig.root.rotation.y,0,k);
    if(!o.zombie) rig.group.rotation.z=L(rig.group.rotation.z,0,k);
  }

  /* ---------- paletas ---------- */
  const SKINS=['#d8a878','#c89468','#a87850','#8a5c3a','#e8b890'];
  const SHIRTS=['#5a7a9a','#7a5a4a','#4a6a4a','#8a8a6a','#9a4a4a','#5a5a72','#7a7a8a','#a8886a'];
  const PANTS=['#3a4252','#4a4238','#2e3a2e','#52422e','#3a3a44'];
  const HAIRS=['#2a1c10','#3a2a1a','#1a1512','#5a3a1a','#6a6258','#8a4a2a'];
  const ZSKINS=['#8a9a72','#7a8a62','#9aa682','#6d7d58','#a8a888'];
  const DRESSES=['#7a4a6a','#4a6a7a','#8a7a4a','#6a4a4a'];
  function randomPal(rnd, zombie){
    const R=a=>a[(rnd()*a.length)|0];
    if(zombie){ const r=rnd();
      const outfit=r<0.6?'shirt':r<0.82?'bare':'dress';
      return { skin:R(ZSKINS), shirt:outfit==='dress'?R(DRESSES):R(SHIRTS), pants:R(PANTS), hair:R(HAIRS),
        zombie:true, pocket:rnd()<0.4, outfit, bald:rnd()<0.22 }; }
    return { skin:R(SKINS), shirt:R(SHIRTS), pants:R(PANTS), hair:R(HAIRS), eyes:'#3a2a1a', pocket:rnd()<0.5, outfit:'shirt' };
  }
  return { build, pose, showWeapon, showPack, randomPal };
})();
