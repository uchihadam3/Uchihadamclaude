/* ========================================================================
   PUNHO DE LENDA — motor de retrato cartunesco (canvas, 100% procedural)
   Cada lutador tem PROPORÇÕES próprias (crânio, mandíbula, maçãs, olhos,
   nariz, boca) + traços de assinatura (tatuagem, sardas, cicatriz, dente
   separado), então nenhum fica igual ao outro. Cel-shading em 3 tons +
   luz de contorno. Estilo esportivo caricato (linha limpa).
   ===================================================================== */
const ART = (() => {
  const TAU = Math.PI * 2;
  function shade(hex, a){ hex=hex||'#c88a5a'; const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    if(a>0){ r+=(255-r)*a; g+=(255-g)*a; b+=(255-b)*a; } else { r*=(1+a); g*=(1+a); b*=(1+a); }
    return `rgb(${r|0},${g|0},${b|0})`; }
  const lerp=(a,b,t)=>a+(b-a)*t;

  function fighter(cv, S){
    S=S||{};
    const c=cv.getContext('2d'), W=cv.width, H=cv.height; c.clearRect(0,0,W,H);
    const u=W/300, cx=W/2, cy=H*0.5;
    // rng estável por lutador → proporções únicas
    let _s=(S.seed>>>0)||0x9e37; const rr=()=>{ _s^=_s<<13;_s^=_s>>>17;_s^=_s<<5; return ((_s>>>0)%100000)/100000; };
    const vr=(a,b)=>a+rr()*(b-a), pk=arr=>arr[(rr()*arr.length)|0];

    const skin=S.skin||'#c88a5a';
    const sh1=S.skin2||shade(skin,-0.20), sh2=shade(skin,-0.40), sh3=shade(skin,-0.58), hi=shade(skin,0.22), hi2=shade(skin,0.40);
    const hairC=S.hair||'#160f0a', rim=S.rim||'#8fd0ff';
    const age=S.age||0, expr=S.expr||'calm', intense=expr==='intense', smirk=expr==='smirk';

    /* ---------------- proporções únicas ---------------- */
    const P={
      headW: S.headW || vr(50,57),                                   // meia-largura nas maçãs
      faceLen: S.faceLen || (S.face==='long'?vr(74,82):S.face==='round'?vr(60,66):vr(66,73)),
      jaw:  S.jaw!=null?S.jaw : (S.face==='square'?vr(0.90,1.0):S.face==='long'?vr(0.60,0.70):vr(0.72,0.86)),
      chinW:S.chinW!=null?S.chinW: (S.face==='square'?vr(0.5,0.62):vr(0.32,0.46)),
      chinT:S.chinType|| pk(['round','round','square','pointed','cleft']),
      brow: S.browY||vr(-2,3),
      eyeSz:S.eyeSize||vr(0.92,1.14),
      eyeSp:S.eyeSpace||vr(0.94,1.12),
      eyeSh:S.eyeShape|| pk(['almond','almond','narrow','round','hooded']),
      browTh:S.browThick||vr(0.85,1.35),
      noseW:S.noseW|| (S.nose==='flat'?vr(1.25,1.5):S.nose==='big'?vr(1.15,1.35):vr(0.82,1.08)),
      noseL:S.noseL|| (S.face==='long'?vr(1.05,1.2):vr(0.9,1.05)),
      lip:  S.lipT||vr(0.85,1.35),
      cheek:S.cheek!=null?S.cheek:vr(0.55,1.05),
      fore: S.foreheadH||vr(0.92,1.12),
    };
    const fw=P.headW*u, fh=P.faceLen*u, fy=cy-2*u;          // centro da face
    // landmarks verticais
    const crownY=fy-fh*0.62*P.fore, templeY=fy-fh*0.34, cheekY=fy+fh*0.06,
          jawY=fy+fh*0.40, chinY=fy+fh*0.60;
    const eyeY=fy-2*u+P.brow*u, browYy=eyeY-13*u;
    const noseTip=eyeY+ (24*P.noseL)*u, mouthY=lerp(noseTip,chinY,0.5)+2*u;

    /* fundo suave */
    let bg=c.createRadialGradient(cx,cy*0.8,10,cx,cy,W*0.9);
    bg.addColorStop(0,'rgba(255,255,255,.14)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    c.fillStyle=bg; c.fillRect(0,0,W,H);

    /* ---------------- físico: pescoço, traps, ombros ---------------- */
    const ph=S.phys!=null?S.phys:0.6;
    const neckW=(20+ph*10)*u, shoY=cy+fh*0.55;
    // ombros / camisa
    c.fillStyle=S.shirt||'#20222c';
    c.beginPath(); c.moveTo(cx-(132+ph*42)*u,H);
    c.quadraticCurveTo(cx-118*u,shoY+16*u, cx-(54+ph*12)*u,shoY);
    c.quadraticCurveTo(cx,shoY-10*u,cx+(54+ph*12)*u,shoY);
    c.quadraticCurveTo(cx+118*u,shoY+16*u,cx+(132+ph*42)*u,H); c.closePath(); c.fill();
    c.fillStyle=shade(S.shirt||'#20222c',-0.28);                 // sombra peito
    c.beginPath(); c.moveTo(cx-(132+ph*42)*u,H); c.quadraticCurveTo(cx-104*u,shoY+30*u,cx-64*u,H); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(cx+(132+ph*42)*u,H); c.quadraticCurveTo(cx+104*u,shoY+30*u,cx+64*u,H); c.closePath(); c.fill();
    // traps
    c.fillStyle=sh1; c.beginPath();
    c.moveTo(cx-(28+ph*8)*u,chinY+2*u); c.quadraticCurveTo(cx-60*u,shoY-16*u,cx-(54+ph*12)*u,shoY);
    c.lineTo(cx+(54+ph*12)*u,shoY); c.quadraticCurveTo(cx+60*u,shoY-16*u,cx+(28+ph*8)*u,chinY+2*u); c.closePath(); c.fill();
    // pescoço
    c.fillStyle=sh1; c.beginPath();
    c.moveTo(cx-neckW,chinY-8*u); c.quadraticCurveTo(cx-neckW-2*u,shoY-8*u,cx-neckW+2*u,shoY);
    c.lineTo(cx+neckW-2*u,shoY); c.quadraticCurveTo(cx+neckW+2*u,shoY-8*u,cx+neckW,chinY-8*u); c.closePath(); c.fill();
    c.fillStyle=skin; c.beginPath(); c.moveTo(cx-neckW+2*u,chinY-6*u); c.lineTo(cx-neckW+2*u,shoY-6*u);
    c.lineTo(cx+neckW-2*u,shoY-6*u); c.lineTo(cx+neckW-2*u,chinY-6*u); c.closePath(); c.fill();
    c.fillStyle=sh2; c.globalAlpha=.5; c.beginPath(); c.ellipse(cx,chinY+6*u,neckW*0.9,7*u,0,0,Math.PI); c.fill(); c.globalAlpha=1; // sombra do queixo no pescoço

    /* ---------------- cabelo de trás ---------------- */
    if(hairC && !['bald','receding'].includes(S.hairStyle)){
      c.fillStyle=shade(hairC,-0.14);
      if(S.hairStyle==='afro'){ c.beginPath(); c.ellipse(cx,crownY+fh*0.18,fw*1.28,fh*0.7,0,0,TAU); c.fill(); }
      else if(['long','mullet','braids'].includes(S.hairStyle)){ c.beginPath();
        c.moveTo(cx-fw*1.02,templeY); c.quadraticCurveTo(cx-fw*1.15,jawY+10*u,cx-fw*0.7,shoY-6*u);
        c.lineTo(cx+fw*0.7,shoY-6*u); c.quadraticCurveTo(cx+fw*1.15,jawY+10*u,cx+fw*1.02,templeY); c.closePath(); c.fill(); }
      else { c.beginPath(); c.ellipse(cx,crownY+fh*0.14,fw*1.06,fh*0.62,0,0,TAU); c.fill(); }
    }

    /* ---------------- SILHUETA DA CABEÇA (proporções únicas) ---------------- */
    function headPath(){
      const cheekW=fw, jawX=fw*P.jaw, chinX=fw*P.chinW, templeX=fw*0.92, skullX=fw*0.8;
      c.beginPath();
      c.moveTo(cx, chinY+ (P.chinT==='pointed'?4*u:0));
      // chin → right jaw
      if(P.chinT==='square'){ c.lineTo(cx+chinX,chinY); c.quadraticCurveTo(cx+jawX*1.02,jawY+6*u,cx+jawX,jawY); }
      else if(P.chinT==='cleft'){ c.quadraticCurveTo(cx+chinX*0.6,chinY-2*u,cx+chinX,chinY-1*u); c.quadraticCurveTo(cx+jawX,jawY+8*u,cx+jawX,jawY); }
      else { c.quadraticCurveTo(cx+chinX*1.1,chinY, cx+jawX,jawY); }
      // jaw → cheekbone
      c.quadraticCurveTo(cx+cheekW*1.0,jawY-(jawY-cheekY)*0.35, cx+cheekW,cheekY);
      // cheek → temple
      c.quadraticCurveTo(cx+templeX*1.05,lerp(cheekY,templeY,0.5), cx+templeX,templeY);
      // temple → crown
      c.quadraticCurveTo(cx+skullX*1.06,crownY+fh*0.16, cx+skullX*0.6,crownY);
      c.quadraticCurveTo(cx,crownY-6*u, cx-skullX*0.6,crownY);
      // left mirror
      c.quadraticCurveTo(cx-skullX*1.06,crownY+fh*0.16, cx-templeX,templeY);
      c.quadraticCurveTo(cx-templeX*1.05,lerp(cheekY,templeY,0.5), cx-cheekW,cheekY);
      c.quadraticCurveTo(cx-cheekW*1.0,jawY-(jawY-cheekY)*0.35, cx-jawX,jawY);
      if(P.chinT==='square'){ c.quadraticCurveTo(cx-jawX*1.02,jawY+6*u,cx-chinX,chinY); c.lineTo(cx,chinY); }
      else if(P.chinT==='cleft'){ c.quadraticCurveTo(cx-jawX,jawY+8*u,cx-chinX,chinY-1*u); c.quadraticCurveTo(cx-chinX*0.6,chinY-2*u,cx,chinY); }
      else { c.quadraticCurveTo(cx-jawX*1.1,jawY,cx-chinX*1.1,chinY); c.quadraticCurveTo(cx-chinX*0.5,chinY,cx,chinY); }
      c.closePath();
    }
    headPath(); c.fillStyle=skin; c.fill();

    // orelhas (atrás da linha do rosto)
    c.fillStyle=skin; [-1,1].forEach(s=>{ c.beginPath(); c.ellipse(cx+s*fw*0.99,cheekY+4*u,8*u,14*u,s*0.12,0,TAU); c.fill();
      c.fillStyle=sh2; c.globalAlpha=.6; c.beginPath(); c.ellipse(cx+s*fw*0.99,cheekY+4*u,3.5*u,7*u,0,0,TAU); c.fill(); c.globalAlpha=1; c.fillStyle=skin; });

    /* ---------------- cel shading (luz de cima-direita) ---------------- */
    c.save(); headPath(); c.clip();
    // sombra do lado esquerdo
    c.fillStyle=sh1; c.globalAlpha=.9;
    c.beginPath(); c.moveTo(cx-fw*0.2,crownY); c.quadraticCurveTo(cx-fw*1.1,templeY,cx-fw,cheekY);
    c.quadraticCurveTo(cx-fw*0.9,jawY,cx-fw*P.jaw*0.7,chinY); c.lineTo(cx-fw*0.05,chinY);
    c.quadraticCurveTo(cx-fw*0.16,jawY,cx-fw*0.12,cheekY); c.quadraticCurveTo(cx-fw*0.1,templeY,cx-fw*0.2,crownY); c.fill();
    // sombra sob o queixo/mandíbula
    c.fillStyle=sh2; c.globalAlpha=.55;
    c.beginPath(); c.moveTo(cx-fw*P.jaw,jawY); c.quadraticCurveTo(cx,chinY+9*u,cx+fw*P.jaw,jawY);
    c.quadraticCurveTo(cx,chinY-2*u,cx-fw*P.jaw,jawY); c.fill();
    // maçãs do rosto (highlight)
    c.globalAlpha=.5*P.cheek; c.fillStyle=hi;
    [-1,1].forEach(s=>{ c.beginPath(); c.ellipse(cx+s*fw*0.5,cheekY+8*u,fw*0.28,fh*0.13,s*-0.3,0,TAU); c.fill(); });
    // testa highlight
    c.globalAlpha=.4; c.beginPath(); c.ellipse(cx+fw*0.12,templeY+4*u,fw*0.42,fh*0.16,0,0,TAU); c.fill();
    // nariz bridge highlight
    c.globalAlpha=.5; c.fillStyle=hi2; c.beginPath(); c.ellipse(cx+2*u,lerp(eyeY,noseTip,0.4),4*u,(noseTip-eyeY)*0.5,0,0,TAU); c.fill();
    c.globalAlpha=1; c.restore();

    // rim light direita
    c.strokeStyle=rim; c.lineWidth=3.5*u; c.globalAlpha=.55; c.lineCap='round';
    c.beginPath(); c.moveTo(cx+fw*0.92,templeY+6*u); c.quadraticCurveTo(cx+fw*1.06,cheekY+4*u,cx+fw*0.9,jawY-4*u); c.stroke(); c.globalAlpha=1;

    /* ---------------- maçãs/mandíbula: linha de contorno sutil ---------------- */
    c.strokeStyle=sh2; c.lineWidth=1.6*u; c.globalAlpha=.35;
    [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*fw*0.62,cheekY+4*u); c.quadraticCurveTo(cx+s*fw*0.5,cheekY+fh*0.2,cx+s*fw*0.26,noseTip+2*u); c.stroke(); });
    c.globalAlpha=1;

    /* ---------------- sobrancelhas ---------------- */
    const eyeDx=22*u*P.eyeSp;
    c.strokeStyle=shade(hairC,age>0.55?0.35:-0.05); c.lineWidth=7*u*P.browTh; c.lineCap='round';
    [-1,1].forEach(s=>{ c.beginPath();
      const inY=browYy+(intense?4*u:0), outY=browYy-(intense?1*u:smirk&&s>0?-3*u:3*u);
      c.moveTo(cx+s*(eyeDx-15*u),inY);
      c.quadraticCurveTo(cx+s*eyeDx,browYy-5*u,cx+s*(eyeDx+16*u),outY); c.stroke(); });

    /* ---------------- olhos ---------------- */
    const ew=11*u*P.eyeSz, eh=(P.eyeSh==='narrow'?5.5:P.eyeSh==='round'?8.5:P.eyeSh==='hooded'?6:7.2)*u*P.eyeSz*(intense?0.85:1);
    [-1,1].forEach(s=>{ const ex=cx+s*eyeDx;
      // órbita sombra
      c.fillStyle=sh1; c.globalAlpha=.5; c.beginPath(); c.ellipse(ex,eyeY-1*u,ew+3*u,eh+3*u,0,0,TAU); c.fill(); c.globalAlpha=1;
      // branco
      c.fillStyle='#f4f1ea'; c.beginPath(); c.ellipse(ex,eyeY,ew,eh,0,0,TAU); c.fill();
      // sombra pálpebra
      c.fillStyle=sh2; c.globalAlpha=.3; c.beginPath(); c.ellipse(ex,eyeY-eh*0.5,ew,eh*0.5,0,0,TAU); c.fill(); c.globalAlpha=1;
      // íris + pupila
      const ir=eh*0.92; c.fillStyle=S.eyes||'#3a2416'; c.beginPath(); c.arc(ex+s*1*u,eyeY+1*u,ir,0,TAU); c.fill();
      c.fillStyle=shade(S.eyes||'#3a2416',-0.4); c.beginPath(); c.arc(ex+s*1*u,eyeY+1*u,ir*0.55,0,TAU); c.fill();
      c.fillStyle='#080604'; c.beginPath(); c.arc(ex+s*1*u,eyeY+1*u,ir*0.42,0,TAU); c.fill();
      c.fillStyle='#fff'; c.beginPath(); c.arc(ex+s*1*u-ir*0.4,eyeY-ir*0.4,ir*0.28,0,TAU); c.fill();
      // pálpebra superior (linha grossa)
      c.strokeStyle=sh3; c.lineWidth=2.6*u; c.lineCap='round'; c.beginPath();
      c.moveTo(ex-ew,eyeY-eh*0.5); c.quadraticCurveTo(ex,eyeY-eh-1*u,ex+ew,eyeY-eh*0.4); c.stroke();
      if(P.eyeSh==='hooded'){ c.globalAlpha=.4; c.fillStyle=sh1; c.beginPath(); c.moveTo(ex-ew,eyeY-eh*0.7); c.quadraticCurveTo(ex,eyeY-eh*1.5,ex+ew,eyeY-eh*0.6); c.quadraticCurveTo(ex,eyeY-eh*0.9,ex-ew,eyeY-eh*0.7); c.fill(); c.globalAlpha=1; }
      // linha inferior leve
      c.strokeStyle=sh1; c.lineWidth=1.4*u; c.globalAlpha=.5; c.beginPath(); c.moveTo(ex-ew*0.8,eyeY+eh*0.7); c.quadraticCurveTo(ex,eyeY+eh,ex+ew*0.8,eyeY+eh*0.65); c.stroke(); c.globalAlpha=1;
    });
    // rugas (idade / entre sobrancelhas se bravo)
    if(intense){ c.strokeStyle=sh2; c.lineWidth=1.8*u; c.globalAlpha=.4;
      [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*4*u,browYy+2*u); c.lineTo(cx+s*6*u,browYy+12*u); c.stroke(); }); c.globalAlpha=1; }
    if(age>0.55){ c.strokeStyle=sh2; c.lineWidth=1.4*u; c.globalAlpha=.4;
      [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*(eyeDx+18*u),eyeY-2*u); c.quadraticCurveTo(cx+s*(eyeDx+26*u),eyeY+2*u,cx+s*(eyeDx+22*u),eyeY+8*u); c.stroke(); });
      c.beginPath(); c.moveTo(cx-fw*0.3,templeY+10*u); c.lineTo(cx+fw*0.3,templeY+10*u); c.stroke(); c.globalAlpha=1; }

    /* ---------------- nariz ---------------- */
    const nw=8*u*P.noseW;
    c.strokeStyle=sh2; c.lineWidth=2.6*u; c.lineCap='round';
    c.beginPath();
    if(S.nose==='hook'){ c.moveTo(cx-1*u,eyeY+4*u); c.quadraticCurveTo(cx-6*u,noseTip-6*u,cx-1*u,noseTip); c.quadraticCurveTo(cx+3*u,noseTip+4*u,cx+nw*0.7,noseTip-3*u); }
    else { c.moveTo(cx-2*u,eyeY+5*u); c.quadraticCurveTo(cx-4*u,noseTip-4*u,cx-nw*0.55,noseTip); c.quadraticCurveTo(cx,noseTip+5*u,cx+nw*0.55,noseTip); }
    c.stroke();
    // base/narinas sombra
    c.fillStyle=sh2; c.globalAlpha=.4; c.beginPath(); c.ellipse(cx,noseTip+1*u,nw*0.9,4*u,0,0,TAU); c.fill();
    c.globalAlpha=.6; [-1,1].forEach(s=>{ c.beginPath(); c.ellipse(cx+s*nw*0.55,noseTip+1*u,1.8*u,2.4*u,0,0,TAU); c.fill(); }); c.globalAlpha=1;
    // ponta highlight
    c.fillStyle=hi; c.globalAlpha=.5; c.beginPath(); c.ellipse(cx+1*u,noseTip-3*u,3*u,4*u,0,0,TAU); c.fill(); c.globalAlpha=1;

    /* ---------------- boca ---------------- */
    const mw=15*u, lipH=3.2*u*P.lip;
    if(S.mouthguard){ c.fillStyle='#eeeee6'; c.beginPath(); c.moveTo(cx-mw,mouthY); c.quadraticCurveTo(cx,mouthY+9*u,cx+mw,mouthY); c.quadraticCurveTo(cx,mouthY+3*u,cx-mw,mouthY); c.fill(); }
    else {
      // sombra sob o lábio inferior
      c.fillStyle=sh2; c.globalAlpha=.35; c.beginPath(); c.ellipse(cx,mouthY+lipH+3*u,mw*0.8,4*u,0,0,TAU); c.fill(); c.globalAlpha=1;
      c.lineCap='round';
      if(smirk){ c.strokeStyle=sh3; c.lineWidth=3.4*u; c.beginPath(); c.moveTo(cx-mw,mouthY+2*u); c.quadraticCurveTo(cx+4*u,mouthY+7*u,cx+mw,mouthY-4*u); c.stroke();
        // lábio inferior
        c.strokeStyle=shade(skin,-0.12); c.lineWidth=lipH; c.beginPath(); c.moveTo(cx-mw*0.7,mouthY+4*u); c.quadraticCurveTo(cx,mouthY+7*u,cx+mw*0.8,mouthY+1*u); c.stroke(); }
      else if(intense){ // boca firme/aberta
        c.fillStyle=sh3; c.beginPath(); c.moveTo(cx-mw,mouthY); c.quadraticCurveTo(cx,mouthY+9*u,cx+mw,mouthY); c.quadraticCurveTo(cx,mouthY+13*u,cx-mw,mouthY); c.fill();
        if(S.gap){ c.fillStyle='#efeee8'; c.fillRect(cx-mw*0.5,mouthY+2*u,mw,3.5*u); c.fillStyle=sh3; c.fillRect(cx-1.6*u,mouthY+2*u,3.2*u,3.5*u); } // dente separado
        c.strokeStyle=shade(skin,-0.12); c.lineWidth=lipH; c.beginPath(); c.moveTo(cx-mw*0.85,mouthY+7*u); c.quadraticCurveTo(cx,mouthY+11*u,cx+mw*0.85,mouthY+7*u); c.stroke(); }
      else { c.strokeStyle=sh3; c.lineWidth=3.2*u; c.beginPath(); c.moveTo(cx-mw,mouthY); c.quadraticCurveTo(cx,mouthY+4*u,cx+mw,mouthY); c.stroke();
        c.strokeStyle=shade(skin,-0.1); c.lineWidth=lipH; c.beginPath(); c.moveTo(cx-mw*0.7,mouthY+3.5*u); c.quadraticCurveTo(cx,mouthY+6*u,cx+mw*0.7,mouthY+3.5*u); c.stroke(); }
      // lábio superior highlight
      c.strokeStyle=hi; c.globalAlpha=.35; c.lineWidth=1.4*u; c.beginPath(); c.moveTo(cx-mw*0.6,mouthY-2*u); c.quadraticCurveTo(cx,mouthY,cx+mw*0.6,mouthY-2*u); c.stroke(); c.globalAlpha=1;
    }

    /* ---------------- sardas / marcas ---------------- */
    if(S.freckles){ c.fillStyle=shade(skin,-0.22); c.globalAlpha=.5;
      for(let i=0;i<14;i++){ const s=i<7?-1:1; c.beginPath(); c.arc(cx+s*(14+rr()*22)*u,cheekY+(rr()*16-2)*u,1.1*u,0,TAU); c.fill(); } c.globalAlpha=1; }

    /* ---------------- barba / bigode ---------------- */
    drawBeard(c,cx,fy,fw,fh,u,S,hairC,age,{cheekY,jawY,chinY,mouthY,noseTip,mw});

    /* ---------------- cicatriz assinatura ---------------- */
    if(S.scar){ c.strokeStyle=shade(skin,-0.22); c.lineWidth=2*u; c.globalAlpha=.8; c.beginPath();
      c.moveTo(cx-eyeDx-2*u,browYy-8*u); c.lineTo(cx-eyeDx+3*u,browYy+8*u); c.stroke(); c.globalAlpha=1; }
    /* ---------------- tatuagem facial (ex.: Tyson) ---------------- */
    if(S.faceTattoo){ c.strokeStyle='rgba(20,20,30,.82)'; c.lineWidth=3*u; c.lineCap='round';
      const ox=cx-eyeDx-6*u, oy=browYy-4*u;
      c.beginPath(); c.moveTo(ox,oy); c.quadraticCurveTo(ox-10*u,oy+6*u,ox-6*u,oy+20*u);
      c.moveTo(ox+4*u,oy-2*u); c.quadraticCurveTo(ox-6*u,oy+2*u,ox-2*u,oy+14*u);
      c.moveTo(ox-3*u,oy+2*u); c.quadraticCurveTo(ox-14*u,oy+10*u,ox-9*u,oy+24*u); c.stroke(); }

    /* ---------------- cabelo frente ---------------- */
    drawHair(c,cx,fy,fw,fh,u,S,hairC,{crownY,templeY,cheekY,eyeY});
    /* ---------------- equipamento por estilo ---------------- */
    drawGear(c,cx,fy,fw,fh,cy,H,u,S,skin,sh1,{crownY,templeY,cheekY,jawY,chinY,shoY});

    /* suor + vinheta */
    c.fillStyle='rgba(255,255,255,.45)';
    [[cx-fw*0.4,templeY+4*u],[cx+fw*0.5,cheekY-6*u],[cx+fw*0.2,cheekY+14*u]].forEach(([x,y])=>{ c.beginPath(); c.ellipse(x,y,1.8*u,3*u,0,0,TAU); c.fill(); });
    let vg=c.createLinearGradient(0,H*0.62,0,H); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.42)');
    c.fillStyle=vg; c.fillRect(0,H*0.62,W,H*0.38);
  }

  /* ================= BARBA ================= */
  function drawBeard(c,cx,fy,fw,fh,u,S,hairC,age,L){
    if(!S.beard||S.beard==='none') return;
    const bc=shade(hairC,age>0.55?0.30:-0.04); c.fillStyle=bc;
    const {jawY,chinY,cheekY,mouthY,mw}=L;
    const full=S.beard==='full', stub=S.beard==='stubble';
    c.globalAlpha=stub?.42:.94;
    if(full){ c.beginPath();
      c.moveTo(cx-fw*0.86,cheekY+6*u); c.quadraticCurveTo(cx-fw*0.8,chinY+2*u,cx,chinY+9*u);
      c.quadraticCurveTo(cx+fw*0.8,chinY+2*u,cx+fw*0.86,cheekY+6*u);
      c.quadraticCurveTo(cx+fw*0.5,cheekY+fh*0.16,cx+mw*0.9,mouthY+5*u);
      c.quadraticCurveTo(cx,mouthY+8*u,cx-mw*0.9,mouthY+5*u);
      c.quadraticCurveTo(cx-fw*0.5,cheekY+fh*0.16,cx-fw*0.86,cheekY+6*u); c.fill();
      // textura
      c.strokeStyle=shade(bc,-0.2); c.lineWidth=1*u; c.globalAlpha=.4;
      for(let i=-5;i<=5;i++){ c.beginPath(); c.moveTo(cx+i*7*u,jawY-6*u); c.lineTo(cx+i*6*u,chinY+4*u); c.stroke(); } c.globalAlpha=1;
    } else if(S.beard==='goatee'||S.beard==='chin'){ c.beginPath();
      c.moveTo(cx-16*u,mouthY+4*u); c.quadraticCurveTo(cx-18*u,chinY+4*u,cx,chinY+8*u);
      c.quadraticCurveTo(cx+18*u,chinY+4*u,cx+16*u,mouthY+4*u); c.quadraticCurveTo(cx,mouthY+12*u,cx-16*u,mouthY+4*u); c.fill();
    } else if(stub){ c.beginPath();
      c.moveTo(cx-fw*0.78,cheekY+10*u); c.quadraticCurveTo(cx-fw*0.7,chinY+2*u,cx,chinY+7*u);
      c.quadraticCurveTo(cx+fw*0.7,chinY+2*u,cx+fw*0.78,cheekY+10*u);
      c.quadraticCurveTo(cx,cheekY+fh*0.24,cx-fw*0.78,cheekY+10*u); c.fill(); }
    // bigode
    if(['full','mustache','goatee'].includes(S.beard)){ c.globalAlpha=.94; c.fillStyle=bc;
      c.beginPath(); c.moveTo(cx-mw*1.05,mouthY-5*u); c.quadraticCurveTo(cx,mouthY+2*u,cx+mw*1.05,mouthY-5*u);
      c.quadraticCurveTo(cx,mouthY-9*u,cx-mw*1.05,mouthY-5*u); c.fill(); }
    c.globalAlpha=1;
  }

  /* ================= CABELO (frente) ================= */
  function drawHair(c,cx,fy,fw,fh,u,S,hairC,L){
    const st=S.hairStyle; if(!hairC||st==='bald') return;
    const {crownY,templeY,cheekY}=L; const topY=crownY;
    c.fillStyle=hairC; c.lineJoin='round';
    const bang=(hlY)=>{ c.beginPath(); c.moveTo(cx-fw*1.02,cheekY-fh*0.12);
      c.quadraticCurveTo(cx-fw*1.08,topY,cx,topY-4*u); c.quadraticCurveTo(cx+fw*1.08,topY,cx+fw*1.02,cheekY-fh*0.12);
      c.quadraticCurveTo(cx+fw*0.5,hlY,cx+fw*0.16,hlY-2*u);
      c.quadraticCurveTo(cx,hlY+4*u,cx-fw*0.2,hlY-2*u);
      c.quadraticCurveTo(cx-fw*0.5,hlY,cx-fw*1.02,cheekY-fh*0.12); c.closePath(); c.fill(); };
    if(st==='buzz'){ c.globalAlpha=.92; c.beginPath(); c.moveTo(cx-fw*0.98,cheekY-fh*0.14);
      c.quadraticCurveTo(cx-fw*1.02,topY,cx,topY-2*u); c.quadraticCurveTo(cx+fw*1.02,topY,cx+fw*0.98,cheekY-fh*0.14);
      c.quadraticCurveTo(cx+fw*0.62,templeY-fh*0.06,cx,templeY-fh*0.02);
      c.quadraticCurveTo(cx-fw*0.62,templeY-fh*0.06,cx-fw*0.98,cheekY-fh*0.14); c.fill(); c.globalAlpha=1;
      c.fillStyle=shade(hairC,0.25); c.globalAlpha=.3; c.beginPath(); c.ellipse(cx+fw*0.2,topY+fh*0.1,fw*0.4,fh*0.16,0,0,Math.PI*2); c.fill(); c.globalAlpha=1; }
    else if(st==='receding'){ c.globalAlpha=.9; [-1,1].forEach(s=>{ c.beginPath();
      c.moveTo(cx+s*fw*0.98,cheekY-fh*0.12); c.quadraticCurveTo(cx+s*fw*1.02,topY,cx+s*fw*0.4,topY-2*u);
      c.quadraticCurveTo(cx+s*fw*0.55,templeY,cx+s*fw*0.98,cheekY-fh*0.02); c.fill(); }); c.globalAlpha=1; }
    else if(st==='afro'){ c.beginPath(); c.arc(cx,topY+fh*0.06,fw*1.22,Math.PI*0.98,Math.PI*2.02); c.fill();
      c.beginPath(); c.ellipse(cx,topY+fh*0.02,fw*1.18,fh*0.5,0,0,Math.PI*2); c.fill();
      c.fillStyle=shade(hairC,0.25); c.globalAlpha=.3; for(let i=0;i<18;i++){ c.beginPath(); c.arc(cx+(Math.random()-0.5)*fw*1.8,topY+(Math.random()-0.3)*fh*0.6,fw*0.12,0,Math.PI*2); c.fill(); } c.globalAlpha=1; }
    else if(st==='corn'||st==='braids'){ bang(templeY+fh*0.1);
      c.strokeStyle=shade(hairC,-0.34); c.lineWidth=2.6*u;
      for(let i=-4;i<=4;i++){ c.beginPath(); c.moveTo(cx+i*8*u,topY+2*u); c.quadraticCurveTo(cx+i*10*u,templeY,cx+i*11*u,cheekY-fh*0.1); c.stroke(); }
      if(st==='braids'){ c.fillStyle=hairC; for(let i=-3;i<=3;i++){ c.beginPath(); c.ellipse(cx+i*12*u,cheekY+fh*0.02,3*u,fh*0.22,0,0,Math.PI*2); c.fill(); } } }
    else if(st==='top'){ c.beginPath(); c.moveTo(cx-fw*0.7,templeY+fh*0.04);
      c.quadraticCurveTo(cx-fw*0.85,topY-fh*0.1,cx,topY-fh*0.14); c.quadraticCurveTo(cx+fw*0.85,topY-fh*0.1,cx+fw*0.7,templeY+fh*0.04);
      c.quadraticCurveTo(cx,templeY-fh*0.04,cx-fw*0.7,templeY+fh*0.04); c.fill();
      c.save(); c.fillStyle=hairC; c.beginPath(); c.ellipse(cx,topY-fh*0.16,fw*0.28,fh*0.16,0,0,Math.PI*2); c.fill(); c.restore(); }
    else if(st==='mohawk'){ c.beginPath(); c.moveTo(cx-9*u,templeY); c.lineTo(cx-11*u,topY-fh*0.24);
      c.quadraticCurveTo(cx,topY-fh*0.36,cx+11*u,topY-fh*0.24); c.lineTo(cx+9*u,templeY); c.fill();
      c.globalAlpha=.35; c.fillStyle=shade(hairC,-0.2); [-1,1].forEach(s=>{ c.beginPath(); c.ellipse(cx+s*fw*0.7,cheekY-fh*0.1,fw*0.28,fh*0.1,0,0,Math.PI*2); c.fill(); }); c.globalAlpha=1; }
    else if(st==='slick'){ c.beginPath(); c.moveTo(cx-fw*1.0,cheekY-fh*0.14);
      c.quadraticCurveTo(cx-fw*1.04,topY,cx,topY-3*u); c.quadraticCurveTo(cx+fw*1.04,topY,cx+fw*1.0,cheekY-fh*0.14);
      c.quadraticCurveTo(cx+fw*0.4,templeY-fh*0.02,cx,templeY-fh*0.06); c.quadraticCurveTo(cx-fw*0.5,templeY,cx-fw*1.0,cheekY-fh*0.14); c.fill();
      c.strokeStyle=shade(hairC,0.28); c.lineWidth=1.4*u; c.globalAlpha=.5;
      for(let i=-4;i<=4;i++){ c.beginPath(); c.moveTo(cx+i*9*u,topY+2*u); c.quadraticCurveTo(cx+i*13*u,templeY,cx+i*7*u,cheekY-fh*0.12); c.stroke(); } c.globalAlpha=1; }
    else if(st==='mullet'){ bang(templeY+fh*0.06);
      c.fillStyle=hairC; [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*fw*0.98,cheekY);
        c.quadraticCurveTo(cx+s*fw*1.06,L.cheekY+fh*0.4,cx+s*fw*0.7,L.cheekY+fh*0.55); c.lineTo(cx+s*fw*0.6,L.cheekY+fh*0.3); c.quadraticCurveTo(cx+s*fw*0.8,cheekY+fh*0.1,cx+s*fw*0.9,cheekY); c.fill(); }); }
    else { // short (padrão) — franja com volume
      bang(templeY+fh*0.12);
      // mecha lateral highlight
      c.fillStyle=shade(hairC,0.24); c.globalAlpha=.45; c.beginPath();
      c.moveTo(cx-fw*0.2,topY+4*u); c.quadraticCurveTo(cx-fw*0.7,templeY,cx-fw*0.6,cheekY-fh*0.08);
      c.lineTo(cx-fw*0.38,cheekY-fh*0.12); c.quadraticCurveTo(cx-fw*0.36,templeY,cx-fw*0.06,topY+8*u); c.fill(); c.globalAlpha=1;
    }
  }

  /* ================= EQUIPAMENTO ================= */
  function drawGear(c,cx,fy,fw,fh,cy,H,u,S,skin,sh,L){
    const {crownY,templeY,cheekY,jawY,chinY,shoY}=L;
    if(S.gear==='mongkol'){ c.fillStyle=S.gearCol||'#c0392b';
      c.beginPath(); c.moveTo(cx-fw*0.98,templeY+fh*0.02); c.quadraticCurveTo(cx,templeY-fh*0.16,cx+fw*0.98,templeY+fh*0.02);
      c.lineTo(cx+fw*0.98,templeY+fh*0.16); c.quadraticCurveTo(cx,templeY-fh*0.02,cx-fw*0.98,templeY+fh*0.16); c.closePath(); c.fill();
      c.fillStyle=shade(S.gearCol||'#c0392b',-0.28); for(let i=-3;i<=3;i++) c.fillRect(cx+i*15*u-2*u,templeY-fh*0.06-Math.abs(i)*2*u,4*u,12*u);
      c.strokeStyle='#d4a017'; c.lineWidth=5*u; c.beginPath(); c.arc(cx,templeY,fw*0.5,3.7,5.72); c.stroke(); }
    else if(S.gear==='headgear'){ c.fillStyle=S.gearCol||'#b03030';
      c.beginPath(); c.arc(cx,cheekY-fh*0.1,fw*1.14,3.35,6.07,false); c.fill();
      [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(cx+s*fw*1.06,cheekY-fh*0.08); c.quadraticCurveTo(cx+s*fw*1.24,cheekY+fh*0.4,cx+s*fw*0.82,cheekY+fh*0.55);
        c.lineTo(cx+s*fw*0.62,cheekY+fh*0.4); c.quadraticCurveTo(cx+s*fw*0.92,cheekY+fh*0.1,cx+s*fw*0.8,cheekY-fh*0.1); c.fill(); });
      c.fillStyle=shade(S.gearCol||'#b03030',0.16); c.fillRect(cx-fw*1.06,templeY-fh*0.04,fw*2.12,9*u); }
    else if(S.gear==='hachimaki'){ c.fillStyle=S.gearCol||'#e6e6e0'; c.fillRect(cx-fw*0.98,templeY+fh*0.02,fw*1.96,11*u);
      c.fillStyle='#c0392b'; c.beginPath(); c.arc(cx,templeY+fh*0.06,6.5*u,0,Math.PI*2); c.fill();
      c.fillStyle=S.gearCol||'#e6e6e0'; c.save(); c.translate(cx-fw*1.02,templeY+fh*0.04); c.rotate(0.34);
      c.fillRect(-4*u,0,8*u,44*u); c.fillRect(-15*u,3*u,8*u,38*u); c.restore(); }
    else if(S.gear==='papakha'){ c.fillStyle=S.gearCol||'#2a2a2a';
      c.beginPath(); c.moveTo(cx-fw*0.98,templeY+fh*0.04); c.quadraticCurveTo(cx-fw*1.02,crownY-fh*0.34,cx,crownY-fh*0.36);
      c.quadraticCurveTo(cx+fw*1.02,crownY-fh*0.34,cx+fw*0.98,templeY+fh*0.04); c.quadraticCurveTo(cx,templeY-fh*0.14,cx-fw*0.98,templeY+fh*0.04); c.fill();
      c.fillStyle=shade(S.gearCol||'#2a2a2a',0.14); for(let i=0;i<50;i++){ const a=Math.random()*Math.PI*2,r=Math.random()*fw*0.95;
        c.fillRect(cx+Math.cos(a)*r, crownY+fh*0.02+Math.sin(a)*fh*0.24, 2*u,4*u); } }
    // gola do gi
    if(S.collar==='gi'){ c.fillStyle='#f0f0ec';
      c.beginPath(); c.moveTo(cx-54*u,shoY+2*u); c.lineTo(cx-16*u,chinY+2*u); c.lineTo(cx-4*u,chinY+12*u); c.lineTo(cx-42*u,H); c.lineTo(cx-76*u,H); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(cx+54*u,shoY+2*u); c.lineTo(cx+16*u,chinY+2*u); c.lineTo(cx+4*u,chinY+12*u); c.lineTo(cx+42*u,H); c.lineTo(cx+76*u,H); c.closePath(); c.fill();
      c.strokeStyle='#c8c8c0'; c.lineWidth=2*u; c.beginPath(); c.moveTo(cx-16*u,chinY+6*u); c.lineTo(cx-48*u,H); c.moveTo(cx+16*u,chinY+6*u); c.lineTo(cx+48*u,H); c.stroke();
      c.fillStyle=S.beltCol||'#111'; c.fillRect(cx-16*u,chinY+8*u,32*u,9*u); }
    // luvas
    if(S.gloves){ [-1,1].forEach(s=>{ c.fillStyle=S.gloveCol||'#c0392b';
      c.beginPath(); c.ellipse(cx+s*74*u,H-26*u,32*u,40*u,0,0,Math.PI*2); c.fill();
      c.fillStyle=shade(S.gloveCol||'#c0392b',-0.2); c.beginPath(); c.ellipse(cx+s*74*u,H-8*u,30*u,16*u,0,0,Math.PI*2); c.fill();
      c.fillStyle=shade(S.gloveCol||'#c0392b',0.18); c.beginPath(); c.ellipse(cx+s*68*u,H-42*u,13*u,11*u,0,0,Math.PI*2); c.fill(); }); }
  }

  return { fighter, shade };
})();
