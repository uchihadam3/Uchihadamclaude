/* ========================================================================
   PUNHO DE LENDA — motor de retrato cartunesco (canvas, 100% procedural)
   Cada lutador é parametrizado para lembrar o real (pele, cabelo, barba,
   feições, físico, equipamento por estilo). Cel-shading + luz de contorno.
   ===================================================================== */
const ART = (() => {
  const TAU = Math.PI * 2;
  function shade(hex, a){ const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    if(a>0){ r+=(255-r)*a; g+=(255-g)*a; b+=(255-b)*a; } else { r*=(1+a); g*=(1+a); b*=(1+a); }
    return `rgb(${r|0},${g|0},${b|0})`; }

  /* spec:
     skin, skin2(sombra opc), hair, hairStyle: bald|buzz|short|afro|corn|braids|long|top|mohawk|slick|receding|mullet|gray
     beard: none|stubble|goatee|full|mustache|chin, brow, eyes, face: oval|long|square|round
     nose: normal|flat|big|hook, age(0..1), scar, gap(boolean),
     gear: none|mongkol|headgear|hachimaki|papakha, gearCol, collar: gi|none, gloves, gloveCol, beltCol,
     phys: 0..1 (pescoço/traps), rim, shirt, expr: calm|intense|smirk */
  function fighter(cv, S){
    const c=cv.getContext('2d'), W=cv.width, H=cv.height; c.clearRect(0,0,W,H);
    const cx=W/2, u=W/300, cy=H*0.47;
    const skin=S.skin||'#c88a5a', sh=S.skin2||shade(skin,-0.30), sh2=shade(skin,-0.5), hi=shade(skin,0.20);
    const rim=S.rim||'#8fd0ff', hairC=S.hair||'#1a120a';
    const age=S.age||0, intense=S.expr!=='calm';
    // fundo spot
    let bg=c.createRadialGradient(cx,cy*0.85,10,cx,cy,W*0.85);
    bg.addColorStop(0,'rgba(255,255,255,.13)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    c.fillStyle=bg; c.fillRect(0,0,W,H);

    // ---- ombros / físico ----
    const ph=S.phys!=null?S.phys:0.6;
    c.fillStyle=S.shirt||'#20222c';
    c.beginPath(); c.moveTo(cx-(130+ph*40)*u,H);
    c.quadraticCurveTo(cx-120*u,cy+(66-ph*8)*u, cx-(52+ph*10)*u,cy+56*u);
    c.quadraticCurveTo(cx,cy+48*u,cx+(52+ph*10)*u,cy+56*u);
    c.quadraticCurveTo(cx+120*u,cy+(66-ph*8)*u,cx+(130+ph*40)*u,H); c.closePath(); c.fill();
    // peitoral sombra
    c.fillStyle=shade(S.shirt||'#20222c',-0.25);
    c.beginPath(); c.moveTo(cx-(130+ph*40)*u,H); c.quadraticCurveTo(cx-110*u,cy+78*u,cx-70*u,H); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(cx+(130+ph*40)*u,H); c.quadraticCurveTo(cx+110*u,cy+78*u,cx+70*u,H); c.closePath(); c.fill();
    // traps musculosos
    c.fillStyle=sh; c.beginPath();
    c.moveTo(cx-(30+ph*8)*u,cy+18*u); c.quadraticCurveTo(cx-58*u,cy+40*u,cx-(52+ph*10)*u,cy+56*u);
    c.lineTo(cx+(52+ph*10)*u,cy+56*u); c.quadraticCurveTo(cx+58*u,cy+40*u,cx+(30+ph*8)*u,cy+18*u); c.closePath(); c.fill();
    // pescoço
    c.fillStyle=sh; c.beginPath(); c.moveTo(cx-(24+ph*6)*u,cy+14*u); c.lineTo(cx-(28+ph*6)*u,cy+56*u);
    c.lineTo(cx+(28+ph*6)*u,cy+56*u); c.lineTo(cx+(24+ph*6)*u,cy+14*u); c.closePath(); c.fill();
    c.fillStyle=skin; c.fillRect(cx-(22+ph*5)*u,cy+14*u,(44+ph*10)*u,26*u);

    // ---- cabelo de trás ----
    if(hairC && !['bald','receding'].includes(S.hairStyle)){
      c.fillStyle=shade(hairC,-0.12);
      let bw=60*u, bh=64*u;
      if(S.hairStyle==='afro'){ bw=76*u; bh=76*u; }
      if(S.hairStyle==='long'||S.hairStyle==='mullet'){ c.beginPath(); c.moveTo(cx-58*u,cy-40*u);
        c.quadraticCurveTo(cx-74*u,cy+30*u,cx-52*u,cy+56*u); c.lineTo(cx+52*u,cy+56*u);
        c.quadraticCurveTo(cx+74*u,cy+30*u,cx+58*u,cy-40*u); c.closePath(); c.fill(); }
      else { c.beginPath(); c.ellipse(cx,cy-30*u,bw,bh,0,0,TAU); c.fill(); }
    }

    // ---- CABEÇA ----
    const faceW = S.face==='long'?50:S.face==='square'?58:S.face==='round'?58:54;
    const faceH = S.face==='long'?70:S.face==='round'?60:64;
    const fw=faceW*u, fh=faceH*u, fy=cy-8*u;
    c.fillStyle=skin;
    c.beginPath();
    c.moveTo(cx-fw,fy-14*u);
    c.quadraticCurveTo(cx-fw-3*u,fy-fh*0.9,cx-fw*0.5,fy-fh*0.95);
    c.quadraticCurveTo(cx,fy-fh*1.05,cx+fw*0.5,fy-fh*0.95);
    c.quadraticCurveTo(cx+fw+3*u,fy-fh*0.9,cx+fw,fy-14*u);
    c.lineTo(cx+fw*(S.face==='square'?0.96:0.9),fy+18*u);
    c.quadraticCurveTo(cx+fw*(S.face==='square'?0.85:0.7),fy+fh*0.78,cx+(S.face==='square'?26:22)*u,fy+fh*0.92);
    c.quadraticCurveTo(cx,fy+fh*1.02,cx-(S.face==='square'?26:22)*u,fy+fh*0.92);
    c.quadraticCurveTo(cx-fw*(S.face==='square'?0.85:0.7),fy+fh*0.78,cx-fw*(S.face==='square'?0.96:0.9),fy+18*u);
    c.closePath(); c.fill();
    // sombra do lado esquerdo (cel)
    c.fillStyle=sh;
    c.beginPath(); c.moveTo(cx-fw,fy-14*u); c.quadraticCurveTo(cx-fw*0.7,fy+fh*0.78,cx-22*u,fy+fh*0.92);
    c.quadraticCurveTo(cx-fw*0.4,fy+fh*0.5,cx-fw*0.5,fy-20*u); c.quadraticCurveTo(cx-fw*0.6,fy-fh*0.6,cx-fw*0.5,fy-fh*0.9);
    c.quadraticCurveTo(cx-fw,fy-fh*0.5,cx-fw,fy-14*u); c.closePath(); c.fill();
    // rim light direita
    c.strokeStyle=rim; c.lineWidth=4*u; c.globalAlpha=.5;
    c.beginPath(); c.moveTo(cx+fw*0.9,fy-34*u); c.quadraticCurveTo(cx+fw*1.03,fy+8*u,cx+fw*0.88,fy+24*u); c.stroke(); c.globalAlpha=1;
    // maçãs (highlight)
    c.fillStyle=hi; c.globalAlpha=.45; c.beginPath(); c.ellipse(cx+18*u,fy+6*u,15*u,11*u,0,0,TAU); c.fill();
    c.beginPath(); c.ellipse(cx,fy-32*u,26*u,13*u,0,0,TAU); c.fill(); c.globalAlpha=1;
    // orelhas
    c.fillStyle=skin; [-1,1].forEach(s=>{ c.beginPath(); c.ellipse(cx+s*fw*0.94,fy+4*u,9*u,15*u,0,0,TAU); c.fill();
      c.fillStyle=sh; c.beginPath(); c.ellipse(cx+s*fw*0.94,fy+4*u,4*u,8*u,0,0,TAU); c.fill(); c.fillStyle=skin; });

    // ---- sobrancelhas ----
    const eyY=fy+2*u, eyDx=24*u;
    c.strokeStyle=shade(hairC,age>0.5?0.3:0); c.lineWidth=8*u; c.lineCap='round';
    [-1,1].forEach(s=>{ c.beginPath();
      c.moveTo(cx+s*(eyDx-16*u),eyY-15*u+(intense?-2*u:0));
      c.quadraticCurveTo(cx+s*eyDx,eyY-19*u+(intense?5*u:0),cx+s*(eyDx+15*u),eyY-12*u); c.stroke(); });
    // ---- olhos ----
    [-1,1].forEach(s=>{ const ex=cx+s*eyDx;
      c.fillStyle='#fff'; c.beginPath(); c.ellipse(ex,eyY,12*u,intense?6.5*u:7.5*u,0,0,TAU); c.fill();
      c.fillStyle=sh; c.globalAlpha=.28; c.beginPath(); c.ellipse(ex,eyY-3*u,12*u,4*u,0,0,TAU); c.fill(); c.globalAlpha=1;
      c.fillStyle=S.eyes||'#3a2416'; c.beginPath(); c.arc(ex+s*1.5*u,eyY+1*u,5.6*u,0,TAU); c.fill();
      c.fillStyle='#100a06'; c.beginPath(); c.arc(ex+s*1.5*u,eyY+1*u,2.8*u,0,TAU); c.fill();
      c.fillStyle='#fff'; c.beginPath(); c.arc(ex+s*1.5*u-2*u,eyY-1*u,1.6*u,0,TAU); c.fill();
      c.strokeStyle=sh2; c.lineWidth=3*u; c.beginPath(); c.moveTo(ex-12*u,eyY-4*u); c.quadraticCurveTo(ex,eyY-9*u,ex+12*u,eyY-3*u); c.stroke(); });
    // rugas de idade
    if(age>0.55){ c.strokeStyle=sh; c.lineWidth=1.6*u; c.globalAlpha=.5;
      [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*40*u,eyY-2*u); c.lineTo(cx+s*46*u,eyY+4*u); c.stroke(); });
      c.beginPath(); c.moveTo(cx-18*u,fy-fh*0.7); c.lineTo(cx+18*u,fy-fh*0.7); c.stroke(); c.globalAlpha=1; }
    // ---- nariz ----
    c.strokeStyle=sh; c.lineWidth=3.4*u; c.beginPath();
    if(S.nose==='hook'){ c.moveTo(cx-1*u,eyY+3*u); c.quadraticCurveTo(cx-7*u,fy+22*u,cx-2*u,fy+30*u); c.quadraticCurveTo(cx+2*u,fy+34*u,cx+7*u,fy+29*u); }
    else { c.moveTo(cx-2*u,eyY+4*u); c.lineTo(cx-4*u,fy+30*u); c.quadraticCurveTo(cx,fy+36*u,cx+(S.nose==='flat'?7:S.nose==='big'?6:5)*u,fy+30*u); }
    c.stroke();
    if(S.nose==='flat'||S.nose==='big'){ c.fillStyle=sh; c.globalAlpha=.38;
      c.beginPath(); c.ellipse(cx,fy+26*u,(S.nose==='big'?12:10)*u,6*u,0,0,TAU); c.fill(); c.globalAlpha=1; }
    // ---- boca ----
    const my=fy+46*u;
    if(S.mouthguard){ c.fillStyle='#e8e8e0'; c.beginPath(); c.moveTo(cx-16*u,my); c.quadraticCurveTo(cx,my+8*u,cx+16*u,my); c.quadraticCurveTo(cx,my+3*u,cx-16*u,my); c.fill(); }
    else { c.strokeStyle=sh2; c.lineWidth=4*u; c.beginPath();
      if(S.expr==='smirk'){ c.moveTo(cx-15*u,my+2*u); c.quadraticCurveTo(cx+4*u,my+7*u,cx+15*u,my-3*u); }
      else { c.moveTo(cx-15*u,my); c.quadraticCurveTo(cx,my+(intense?6*u:3*u),cx+15*u,my); }
      c.stroke();
      c.fillStyle=sh; c.globalAlpha=.38; c.beginPath(); c.ellipse(cx,my+9*u,12*u,5*u,0,0,TAU); c.fill(); c.globalAlpha=1; }

    // ---- barba / bigode ----
    if(S.beard && S.beard!=='none'){ const bc=shade(hairC,age>0.5?0.28:-0.05); c.fillStyle=bc;
      c.globalAlpha=S.beard==='stubble'?.4:.9;
      if(S.beard==='full'){ c.beginPath(); c.moveTo(cx-fw*0.82,fy+8*u);
        c.quadraticCurveTo(cx-fw*0.7,fy+fh*0.95,cx,fy+fh*1.12); c.quadraticCurveTo(cx+fw*0.7,fy+fh*0.95,cx+fw*0.82,fy+8*u);
        c.quadraticCurveTo(cx+fw*0.5,fy+fh*0.55,cx,fy+fh*0.5); c.quadraticCurveTo(cx-fw*0.5,fy+fh*0.55,cx-fw*0.82,fy+8*u); c.fill(); }
      else if(S.beard==='goatee'||S.beard==='chin'){ c.beginPath(); c.moveTo(cx-20*u,my+6*u);
        c.quadraticCurveTo(cx,fy+fh*1.08,cx+20*u,my+6*u); c.quadraticCurveTo(cx,my+14*u,cx-20*u,my+6*u); c.fill(); }
      else if(S.beard==='stubble'){ c.beginPath(); c.moveTo(cx-fw*0.75,fy+16*u);
        c.quadraticCurveTo(cx,fy+fh*1.05,cx+fw*0.75,fy+16*u); c.quadraticCurveTo(cx,fy+fh*0.55,cx-fw*0.75,fy+16*u); c.fill(); }
      // bigode
      if(['full','mustache','goatee'].includes(S.beard)){ c.globalAlpha=.9;
        c.beginPath(); c.moveTo(cx-16*u,my-5*u); c.quadraticCurveTo(cx,my+1*u,cx+16*u,my-5*u);
        c.quadraticCurveTo(cx,my-9*u,cx-16*u,my-5*u); c.fill(); }
      c.globalAlpha=1;
    }
    // cicatriz
    if(S.scar){ c.strokeStyle=shade(skin,-0.15); c.lineWidth=2*u; c.beginPath();
      c.moveTo(cx-eyDx-4*u,eyY-22*u); c.lineTo(cx-eyDx+2*u,eyY-8*u); c.stroke(); }

    // ---- cabelo frente ----
    drawHair(c,cx,fy,fw,fh,u,S,hairC);
    // ---- equipamento por estilo ----
    drawGear(c,cx,fy,fw,fh,cy,H,u,S,skin,sh);

    // suor
    c.fillStyle='rgba(255,255,255,.5)';
    [[cx-22*u,fy-38*u],[cx+30*u,fy-18*u],[cx+16*u,fy+18*u]].forEach(([x,y])=>{ c.beginPath(); c.ellipse(x,y,2*u,3*u,0,0,TAU); c.fill(); });
    // vinheta inferior
    let vg=c.createLinearGradient(0,H*0.6,0,H); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.4)');
    c.fillStyle=vg; c.fillRect(0,H*0.6,W,H*0.4);
  }

  function drawHair(c,cx,fy,fw,fh,u,S,hairC){
    const st=S.hairStyle; if(!hairC||st==='bald') return;
    c.fillStyle=hairC;
    if(st==='buzz'){ c.globalAlpha=.92; c.beginPath(); c.moveTo(cx-fw,fy-14*u);
      c.quadraticCurveTo(cx-fw,fy-fh,cx,fy-fh*1.02); c.quadraticCurveTo(cx+fw,fy-fh,cx+fw,fy-14*u);
      c.quadraticCurveTo(cx+fw*0.6,fy-fh*0.72,cx,fy-fh*0.74); c.quadraticCurveTo(cx-fw*0.6,fy-fh*0.72,cx-fw,fy-14*u); c.fill(); c.globalAlpha=1; }
    else if(st==='receding'){ c.globalAlpha=.9; [-1,1].forEach(s=>{ c.beginPath();
      c.moveTo(cx+s*fw,fy-14*u); c.quadraticCurveTo(cx+s*fw,fy-fh*0.95,cx+s*fw*0.45,fy-fh*0.92);
      c.quadraticCurveTo(cx+s*fw*0.55,fy-fh*0.6,cx+s*fw,fy-20*u); c.fill(); }); c.globalAlpha=1; }
    else if(st==='afro'){ c.beginPath(); c.arc(cx,fy-fh*0.65,fw*1.15,Math.PI,TAU); c.fill();
      c.beginPath(); c.ellipse(cx,fy-fh*0.5,fw*1.1,fh*0.55,0,0,TAU); c.fill(); }
    else if(st==='corn'||st==='braids'){ c.beginPath(); c.moveTo(cx-fw,fy-8*u);
      c.quadraticCurveTo(cx,fy-fh*1.08,cx+fw,fy-8*u); c.quadraticCurveTo(cx,fy-fh*0.78,cx-fw,fy-8*u); c.fill();
      c.strokeStyle=shade(hairC,-0.3); c.lineWidth=3*u;
      for(let i=-3;i<=3;i++){ c.beginPath(); c.moveTo(cx+i*10*u,fy-fh*0.95); c.lineTo(cx+i*13*u,fy-8*u); c.stroke(); }
      if(st==='braids'){ c.fillStyle=hairC; for(let i=-2;i<=2;i++) c.fillRect(cx+i*13*u-2*u,fy-8*u,4*u,fh*0.5); } }
    else if(st==='top'){ c.beginPath(); c.moveTo(cx-fw*0.8,fy-fh*0.55);
      c.quadraticCurveTo(cx-fw*0.9,fy-fh,cx,fy-fh*1.05); c.quadraticCurveTo(cx+fw*0.9,fy-fh,cx+fw*0.8,fy-fh*0.55);
      c.quadraticCurveTo(cx,fy-fh*0.78,cx-fw*0.8,fy-fh*0.55); c.fill();
      c.fillRect(cx-7*u,fy-fh*1.3,14*u,fh*0.34); }
    else if(st==='mohawk'){ c.beginPath(); c.moveTo(cx-8*u,fy-fh*0.6); c.lineTo(cx-10*u,fy-fh*1.32);
      c.lineTo(cx+10*u,fy-fh*1.32); c.lineTo(cx+8*u,fy-fh*0.6); c.fill();
      c.globalAlpha=.5; c.fillRect(cx-fw,fy-fh*0.7,fw*2,fh*0.12); c.globalAlpha=1; }
    else if(st==='slick'){ c.beginPath(); c.moveTo(cx-fw-2*u,fy-6*u); c.quadraticCurveTo(cx-fw-4*u,fy-fh*1.02,cx,fy-fh*1.05);
      c.quadraticCurveTo(cx+fw+4*u,fy-fh*1.02,cx+fw+2*u,fy-6*u); c.quadraticCurveTo(cx+fw*0.4,fy-fh*0.7,cx,fy-fh*0.68);
      c.quadraticCurveTo(cx-fw*0.55,fy-fh*0.7,cx-fw-2*u,fy-6*u); c.fill();
      c.strokeStyle=shade(hairC,0.2); c.lineWidth=1.6*u; c.globalAlpha=.5;
      for(let i=-3;i<=3;i++){ c.beginPath(); c.moveTo(cx+i*11*u,fy-fh*0.98); c.quadraticCurveTo(cx+i*14*u,fy-fh*0.6,cx+i*8*u,fy-fh*0.5); c.stroke(); } c.globalAlpha=1; }
    else { // short / mullet / gray / long-front
      c.beginPath(); c.moveTo(cx-fw-2*u,fy-4*u); c.quadraticCurveTo(cx-fw-6*u,fy-fh*1.05,cx,fy-fh*1.08);
      c.quadraticCurveTo(cx+fw+6*u,fy-fh*1.05,cx+fw+2*u,fy-4*u);
      c.quadraticCurveTo(cx+fw*0.5,fy-fh*0.62,cx+10*u,fy-fh*0.7);
      c.quadraticCurveTo(cx-fw*0.55,fy-fh*0.66,cx-fw-2*u,fy-4*u); c.fill();
      c.fillStyle=shade(hairC,0.22); c.globalAlpha=.45; c.beginPath(); c.moveTo(cx-28*u,fy-fh*0.95);
      c.quadraticCurveTo(cx-fw*0.7,fy-fh*0.4,cx-fw*0.6,fy-fh*0.1); c.lineTo(cx-fw*0.4,fy-fh*0.2);
      c.quadraticCurveTo(cx-fw*0.3,fy-fh*0.6,cx-14*u,fy-fh*0.9); c.fill(); c.globalAlpha=1; }
  }

  function drawGear(c,cx,fy,fw,fh,cy,H,u,S,skin,sh){
    if(S.gear==='mongkol'){ c.fillStyle=S.gearCol||'#c0392b';
      c.beginPath(); c.moveTo(cx-fw*0.95,fy-fh*0.5); c.quadraticCurveTo(cx,fy-fh*0.78,cx+fw*0.95,fy-fh*0.5);
      c.lineTo(cx+fw*0.95,fy-fh*0.32); c.quadraticCurveTo(cx,fy-fh*0.6,cx-fw*0.95,fy-fh*0.32); c.closePath(); c.fill();
      c.fillStyle=shade(S.gearCol||'#c0392b',-0.25); for(let i=-3;i<=3;i++) c.fillRect(cx+i*15*u-2*u,fy-fh*0.62-Math.abs(i)*2*u,4*u,14*u);
      c.strokeStyle='#d4a017'; c.lineWidth=6*u; c.beginPath(); c.arc(cx,fy-fh*0.55,fw*0.5,3.6,5.8); c.stroke(); }
    else if(S.gear==='headgear'){ c.fillStyle=S.gearCol||'#b03030';
      c.beginPath(); c.arc(cx,fy-6*u,fw*1.12,3.4,6.02,false); c.fill();
      [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*fw*1.05,fy-6*u); c.quadraticCurveTo(cx+s*fw*1.2,fy+30*u,cx+s*fw*0.8,fy+40*u);
        c.lineTo(cx+s*fw*0.6,fy+30*u); c.quadraticCurveTo(cx+s*fw*0.9,fy+10*u,cx+s*fw*0.78,fy-10*u); c.fill(); });
      c.fillStyle=shade(S.gearCol||'#b03030',0.15); c.fillRect(cx-fw*1.05,fy-30*u,fw*2.1,10*u); }
    else if(S.gear==='hachimaki'){ c.fillStyle=S.gearCol||'#e0e0e0'; c.fillRect(cx-fw*0.95,fy-fh*0.55,fw*1.9,12*u);
      c.fillStyle='#c0392b'; c.beginPath(); c.arc(cx,fy-fh*0.5,7*u,0,TAU); c.fill();
      c.fillStyle=S.gearCol||'#e0e0e0'; c.save(); c.translate(cx+fw*0.9,fy-fh*0.5); c.rotate(0.4);
      c.fillRect(0,0,10*u,50*u); c.fillRect(-14*u,0,10*u,44*u); c.restore(); }
    else if(S.gear==='papakha'){ c.fillStyle=S.gearCol||'#2a2a2a'; // gorro de pele daguestani
      c.beginPath(); c.moveTo(cx-fw*0.95,fy-fh*0.55); c.quadraticCurveTo(cx-fw,fy-fh*1.3,cx,fy-fh*1.3);
      c.quadraticCurveTo(cx+fw,fy-fh*1.3,cx+fw*0.95,fy-fh*0.55); c.quadraticCurveTo(cx,fy-fh*0.75,cx-fw*0.95,fy-fh*0.55); c.fill();
      c.fillStyle=shade(S.gearCol||'#2a2a2a',0.12); for(let i=0;i<40;i++){ const a=Math.random()*TAU,r=Math.random()*fw;
        c.fillRect(cx+Math.cos(a)*r, fy-fh*0.9+Math.sin(a)*fh*0.35, 2*u,4*u); } }
    // gola do gi
    if(S.collar==='gi'){ c.fillStyle='#f0f0ec';
      c.beginPath(); c.moveTo(cx-52*u,cy+56*u); c.lineTo(cx-14*u,cy+28*u); c.lineTo(cx-4*u,cy+38*u); c.lineTo(cx-40*u,H); c.lineTo(cx-72*u,H); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(cx+52*u,cy+56*u); c.lineTo(cx+14*u,cy+28*u); c.lineTo(cx+4*u,cy+38*u); c.lineTo(cx+40*u,H); c.lineTo(cx+72*u,H); c.closePath(); c.fill();
      c.strokeStyle='#c8c8c0'; c.lineWidth=2*u; c.beginPath(); c.moveTo(cx-14*u,cy+30*u); c.lineTo(cx-46*u,H); c.moveTo(cx+14*u,cy+30*u); c.lineTo(cx+46*u,H); c.stroke();
      c.fillStyle=S.beltCol||'#111'; c.fillRect(cx-15*u,cy+33*u,30*u,9*u); }
    // luvas
    if(S.gloves){ [-1,1].forEach(s=>{ c.fillStyle=S.gloveCol||'#c0392b';
      c.beginPath(); c.ellipse(cx+s*72*u,H-28*u,32*u,40*u,0,0,TAU); c.fill();
      c.fillStyle=shade(S.gloveCol||'#c0392b',0.15); c.beginPath(); c.ellipse(cx+s*66*u,H-44*u,14*u,12*u,0,0,TAU); c.fill(); }); }
  }

  return { fighter, shade };
})();
