/* ========================================================================
   RAINHA DAS ESTRELAS — motor de arte procedural (canvas)
   Retratos, cenas, coroa, relíquias, ícones. Nada de imagens externas.
   ===================================================================== */
const ART = (() => {
  const TAU = Math.PI * 2;
  function ctxOf(cv){ const c = cv.getContext('2d'); return c; }
  function fit(cv){ // hidpi
    const r = cv.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio||1, 2.5);
    const w = Math.max(2, Math.round((r.width||cv.width)*dpr)), h = Math.max(2, Math.round((r.height||cv.height)*dpr));
    if(cv.width!==w||cv.height!==h){ cv.width=w; cv.height=h; }
    const c = cv.getContext('2d'); c.setTransform(dpr* (w/(r.width*dpr||w)),0,0,dpr*(h/(r.height*dpr||h)),0,0);
    return {c, w:(r.width||cv.width), h:(r.height||cv.height)};
  }
  // simple seeded rng
  function rng(seed){ let s = seed>>>0 || 1; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)%100000)/100000; }; }
  function lerp(a,b,t){ return a+(b-a)*t; }
  function shade(hex,amt){ // amt -1..1
    const n=parseInt(hex.slice(1),16); let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    if(amt>0){ r=lerp(r,255,amt); g=lerp(g,255,amt); b=lerp(b,255,amt); }
    else { r=lerp(r,0,-amt); g=lerp(g,0,-amt); b=lerp(b,0,-amt); }
    return `rgb(${r|0},${g|0},${b|0})`;
  }

  /* ---------------- STARFIELD (animated bg) ---------------- */
  let starState=null;
  function stars(cv){
    const c = cv.getContext('2d');
    function resize(){ cv.width = cv.clientWidth*1; cv.height = cv.clientHeight*1; }
    resize();
    const N = 120;
    const st = [];
    const rn = rng(42);
    for(let i=0;i<N;i++) st.push({x:rn(), y:rn(), z:rn()*.8+.2, tw:rn()*TAU, sp:rn()*.4+.1});
    // a dying sun in the upper area
    starState = {c, cv, st, t:0, resize};
    let raf;
    function frame(){
      const W=cv.width=cv.clientWidth, H=cv.height=cv.clientHeight;
      st.forEach(s=>{}); // noop keep
      c.clearRect(0,0,W,H);
      // nebula wash
      let g = c.createRadialGradient(W*0.7,H*0.16,10, W*0.7,H*0.16, W*0.9);
      g.addColorStop(0,'rgba(80,30,20,.35)'); g.addColorStop(.4,'rgba(50,20,40,.18)'); g.addColorStop(1,'rgba(10,6,20,0)');
      c.fillStyle=g; c.fillRect(0,0,W,H);
      starState.t += 0.008;
      const t = starState.t;
      // dying sun
      const sx=W*0.72, sy=H*0.15, sr=Math.min(W,H)*0.09*(0.96+Math.sin(t*1.3)*0.04);
      let sg=c.createRadialGradient(sx,sy,2,sx,sy,sr*3.4);
      sg.addColorStop(0,'rgba(255,220,170,.9)'); sg.addColorStop(.18,'rgba(255,140,70,.75)');
      sg.addColorStop(.5,'rgba(200,60,40,.28)'); sg.addColorStop(1,'rgba(120,20,20,0)');
      c.fillStyle=sg; c.beginPath(); c.arc(sx,sy,sr*3.4,0,TAU); c.fill();
      c.fillStyle='rgba(60,20,16,.55)'; c.beginPath(); c.arc(sx,sy,sr*0.62,0,TAU); c.fill(); // sunspot
      // stars
      for(const s of st){
        const x=s.x*W, y=s.y*H; const tw=0.5+0.5*Math.sin(t*s.sp*6 + s.tw);
        c.globalAlpha = (0.25+0.75*tw)*s.z;
        c.fillStyle = s.z>.7?'#dbe8ff':'#fff';
        const r=s.z*1.6+0.3; c.beginPath(); c.arc(x,y,r,0,TAU); c.fill();
      }
      c.globalAlpha=1;
      raf=requestAnimationFrame(frame);
    }
    frame();
    window.addEventListener('resize', ()=>{});
    return ()=>cancelAnimationFrame(raf);
  }

  /* ---------------- CROWN (title + ui) ---------------- */
  function crown(cv, opts={}){
    const {c,w,h}=fit(cv); c.clearRect(0,0,w,h);
    const cx=w/2, cy=h*0.56, s=Math.min(w,h);
    const glow = opts.glow!==false;
    if(glow){ let g=c.createRadialGradient(cx,cy,4,cx,cy,s*0.55); g.addColorStop(0,'rgba(244,198,106,.35)'); g.addColorStop(1,'rgba(244,198,106,0)'); c.fillStyle=g; c.fillRect(0,0,w,h); }
    // band
    const bw=s*0.5, bh=s*0.12, by=cy+s*0.08;
    c.save();
    let bg=c.createLinearGradient(0,by-bh,0,by+bh); bg.addColorStop(0,'#ffe9b0'); bg.addColorStop(.5,'#e0a63e'); bg.addColorStop(1,'#8a5a1e');
    c.fillStyle=bg; roundRect(c,cx-bw/2,by-bh/2,bw,bh,bh*0.3); c.fill();
    // spikes
    const spikes=5;
    c.fillStyle=bg;
    for(let i=0;i<spikes;i++){
      const t=i/(spikes-1); const x=cx-bw/2 + t*bw; const peak = (i%2===0)? s*0.24 : s*0.15;
      c.beginPath(); c.moveTo(x-bw*0.07, by-bh*0.3); c.lineTo(x, by-peak); c.lineTo(x+bw*0.07, by-bh*0.3); c.closePath(); c.fill();
      // star gem at tip
      const gy=by-peak; const gcol = i%2===0? '#fff2c8':'#bfe3ff';
      c.fillStyle=gcol; star(c,x,gy,4,s*0.028,s*0.012); c.fillStyle=bg;
    }
    // central star (the Heart)
    c.fillStyle='#fff'; star(c,cx,by-s*0.29,6, s*0.05, s*0.021);
    let hg=c.createRadialGradient(cx,by-s*0.29,1,cx,by-s*0.29,s*0.06); hg.addColorStop(0,'#fff'); hg.addColorStop(.5,'#ff9a4d'); hg.addColorStop(1,'rgba(255,90,40,0)');
    c.fillStyle=hg; c.beginPath(); c.arc(cx,by-s*0.29,s*0.06,0,TAU); c.fill();
    // band gems
    for(let i=-2;i<=2;i++){ c.fillStyle= i===0?'#ff6a3d': (i%2? '#c98bff':'#7aa8ff'); c.beginPath(); c.arc(cx+i*bw*0.16, by, bh*0.22,0,TAU); c.fill(); }
    c.restore();
  }
  function star(c,x,y,pts,ro,ri){ c.beginPath(); for(let i=0;i<pts*2;i++){ const r=i%2?ri:ro; const a=(i/(pts*2))*TAU - Math.PI/2; c[i?'lineTo':'moveTo'](x+Math.cos(a)*r, y+Math.sin(a)*r);} c.closePath(); c.fill(); }
  function roundRect(c,x,y,w,h,r){ r=Math.min(r,w/2,h/2); c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }

  /* ---------------- PORTRAITS ---------------- */
  // spec: {skin,hair,hair2,eyes,garb,garb2,accent,style,head, brow, seed, aug}
  function portrait(cv, spec){
    const {c,w,h}=fit(cv); c.clearRect(0,0,w,h);
    const s=Math.min(w,h); const cx=w/2, cy=h*0.52;
    const rn = rng((spec.seed||1)*2654435761 >>> 0);
    // bg vignette per garb
    let bg=c.createRadialGradient(cx,cy*0.7,4,cx,cy,s*0.9);
    bg.addColorStop(0, shade(spec.garb2||spec.garb||'#2a2148',.05)); bg.addColorStop(1, shade(spec.garb||'#160f2c',-.55));
    c.fillStyle=bg; c.fillRect(0,0,w,h);
    // faint halo
    let hl=c.createRadialGradient(cx,cy*0.78,2,cx,cy*0.78,s*0.42); hl.addColorStop(0,'rgba(255,255,255,.10)'); hl.addColorStop(1,'rgba(255,255,255,0)');
    c.fillStyle=hl; c.fillRect(0,0,w,h);

    const skin=spec.skin||'#e8c6a8', skinSh=shade(skin,-.28), skinHi=shade(skin,.18);
    // ---- shoulders / garment ----
    const shY=cy+s*0.30;
    c.fillStyle=spec.garb||'#2a2148';
    c.beginPath(); c.moveTo(cx-s*0.42, h); c.quadraticCurveTo(cx-s*0.30, shY, cx, shY-s*0.02);
    c.quadraticCurveTo(cx+s*0.30, shY, cx+s*0.42, h); c.closePath(); c.fill();
    // collar accent
    c.strokeStyle=spec.accent||'#f4c66a'; c.lineWidth=s*0.02; c.lineCap='round';
    c.beginPath(); c.moveTo(cx-s*0.16, shY+s*0.02); c.lineTo(cx, cy+s*0.20); c.lineTo(cx+s*0.16, shY+s*0.02); c.stroke();
    if(spec.garb2){ c.fillStyle=spec.garb2; c.beginPath(); c.moveTo(cx-s*0.12,h); c.quadraticCurveTo(cx, cy+s*0.22, cx+s*0.12,h); c.closePath(); c.fill(); }

    // ---- neck ----
    c.fillStyle=skinSh; roundRect(c,cx-s*0.075,cy+s*0.05,s*0.15,s*0.18,s*0.05); c.fill();
    // ---- hair back ----
    const long = spec.style!=='short';
    if(spec.hair && long){ c.fillStyle=spec.hair2||shade(spec.hair,-.2);
      c.beginPath(); c.moveTo(cx-s*0.24,cy-s*0.08); c.quadraticCurveTo(cx-s*0.34,cy+s*0.22, cx-s*0.20,cy+s*0.42);
      c.lineTo(cx+s*0.20,cy+s*0.42); c.quadraticCurveTo(cx+s*0.34,cy+s*0.22, cx+s*0.24,cy-s*0.08); c.closePath(); c.fill(); }

    // ---- face ----
    const fw=s*0.20, fh=s*0.25, fy=cy-s*0.06;
    c.fillStyle=skin;
    c.beginPath(); c.ellipse(cx,fy,fw,fh,0,0,TAU); c.fill();
    // jaw
    c.beginPath(); c.moveTo(cx-fw*0.9, fy+fh*0.2); c.quadraticCurveTo(cx, fy+fh*1.15, cx+fw*0.9, fy+fh*0.2); c.closePath(); c.fill();
    // shading
    c.save(); c.globalAlpha=.5; c.fillStyle=skinSh;
    c.beginPath(); c.ellipse(cx-fw*0.55,fy,fw*0.4,fh*0.85,0,0,TAU); c.fill(); c.restore();
    c.save(); c.globalAlpha=.4; c.fillStyle=skinHi;
    c.beginPath(); c.ellipse(cx+fw*0.2,fy-fh*0.1,fw*0.35,fh*0.55,0,0,TAU); c.fill(); c.restore();

    // ---- eyes ----
    const eyY=fy+fh*0.02, eyDx=fw*0.42, eyR=s*0.028;
    const glow = spec.aug; // augmented / glowing eyes
    for(const sgn of [-1,1]){
      const ex=cx+sgn*eyDx;
      c.fillStyle='#fff'; c.beginPath(); c.ellipse(ex,eyY,eyR*1.1,eyR*0.7,0,0,TAU); c.fill();
      c.fillStyle=spec.eyes||'#5a3b2a'; c.beginPath(); c.arc(ex,eyY,eyR*0.62,0,TAU); c.fill();
      c.fillStyle='#100a08'; c.beginPath(); c.arc(ex,eyY,eyR*0.28,0,TAU); c.fill();
      c.fillStyle='rgba(255,255,255,.9)'; c.beginPath(); c.arc(ex-eyR*0.18,eyY-eyR*0.18,eyR*0.14,0,TAU); c.fill();
      if(glow){ let eg=c.createRadialGradient(ex,eyY,1,ex,eyY,eyR*2); eg.addColorStop(0,spec.eyes||'#7aa8ff'); eg.addColorStop(1,'rgba(0,0,0,0)'); c.save(); c.globalCompositeOperation='screen'; c.fillStyle=eg; c.beginPath(); c.arc(ex,eyY,eyR*2,0,TAU); c.fill(); c.restore(); }
      // upper lid / lashes
      c.strokeStyle=shade(spec.hair||'#3a2a1a',-.3); c.lineWidth=s*0.008; c.beginPath(); c.moveTo(ex-eyR*1.2,eyY-eyR*0.5); c.quadraticCurveTo(ex,eyY-eyR*1.1, ex+eyR*1.2,eyY-eyR*0.4); c.stroke();
      // brow
      c.strokeStyle=spec.hair||'#3a2a1a'; c.lineWidth=s*0.012; c.beginPath();
      const bl=spec.brow||0; c.moveTo(ex-eyR*1.3,eyY-eyR*1.5+ (sgn*bl*eyR)); c.quadraticCurveTo(ex,eyY-eyR*2.1, ex+eyR*1.3,eyY-eyR*1.5); c.stroke();
    }
    // nose
    c.strokeStyle=skinSh; c.lineWidth=s*0.01; c.beginPath(); c.moveTo(cx, eyY+eyR*0.6); c.lineTo(cx-s*0.012, eyY+fh*0.42); c.quadraticCurveTo(cx,eyY+fh*0.5, cx+s*0.016,eyY+fh*0.42); c.stroke();
    // lips
    const ly=fy+fh*0.62; c.fillStyle=spec.lips||shade(skin,-.32);
    c.beginPath(); c.moveTo(cx-s*0.045,ly); c.quadraticCurveTo(cx,ly-s*0.012,cx+s*0.045,ly);
    c.quadraticCurveTo(cx,ly+s*0.03,cx-s*0.045,ly); c.fill();
    c.strokeStyle=shade(skin,-.4); c.lineWidth=s*0.006; c.beginPath(); c.moveTo(cx-s*0.045,ly); c.quadraticCurveTo(cx,ly+s*0.006,cx+s*0.045,ly); c.stroke();

    // ---- hair front ----
    if(spec.hair && spec.style!=='bald'){
      c.fillStyle=spec.hair;
      c.beginPath();
      if(spec.style==='short'){ c.moveTo(cx-fw*1.05,fy-fh*0.2); c.quadraticCurveTo(cx,fy-fh*1.25,cx+fw*1.05,fy-fh*0.2);
        c.quadraticCurveTo(cx+fw*0.7,fy-fh*0.75,cx,fy-fh*0.6); c.quadraticCurveTo(cx-fw*0.7,fy-fh*0.75,cx-fw*1.05,fy-fh*0.2);
      } else { c.moveTo(cx-fw*1.15,fy+fh*0.1); c.quadraticCurveTo(cx-fw*1.2,fy-fh*1.15,cx,fy-fh*1.2);
        c.quadraticCurveTo(cx+fw*1.2,fy-fh*1.15,cx+fw*1.15,fy+fh*0.1);
        c.quadraticCurveTo(cx+fw*0.6,fy-fh*0.55, cx+fw*0.15,fy-fh*0.62);
        c.quadraticCurveTo(cx-fw*0.5,fy-fh*0.7, cx-fw*1.15,fy+fh*0.1); }
      c.closePath(); c.fill();
      // hair sheen
      c.strokeStyle=shade(spec.hair,.28); c.lineWidth=s*0.01; c.globalAlpha=.6;
      c.beginPath(); c.moveTo(cx-fw*0.5,fy-fh*0.9); c.quadraticCurveTo(cx-fw*0.9,fy-fh*0.2,cx-fw*0.7,fy+fh*0.3); c.stroke(); c.globalAlpha=1;
    }
    // ---- headpiece / crown ----
    drawHead(c,cx,fy,fw,fh,s,spec,rn);
    // subtle frame vignette
    let vg=c.createRadialGradient(cx,cy,s*0.3,cx,cy,s*0.72); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.5)');
    c.fillStyle=vg; c.fillRect(0,0,w,h);
  }
  function drawHead(c,cx,fy,fw,fh,s,spec,rn){
    const hy=fy-fh*0.92;
    if(spec.head==='crown'){ // the imperial diadem
      c.fillStyle='#f4c66a'; roundRect(c,cx-fw*0.9,hy,fw*1.8,s*0.03,s*0.01); c.fill();
      for(let i=-2;i<=2;i++){ const x=cx+i*fw*0.4; const pk = i===0? s*0.10 : s*0.06;
        c.beginPath(); c.moveTo(x-fw*0.13,hy); c.lineTo(x,hy-pk); c.lineTo(x+fw*0.13,hy); c.fill();
        c.fillStyle= i===0?'#fff':'#bfe3ff'; c.beginPath(); c.arc(x,hy-pk,s*0.012,0,TAU); c.fill(); c.fillStyle='#f4c66a'; }
      c.fillStyle='#ff6a3d'; c.beginPath(); c.arc(cx,hy+s*0.012,s*0.016,0,TAU); c.fill();
    } else if(spec.head==='veil'){ c.fillStyle=spec.accent||'#bfe3ff'; c.globalAlpha=.55;
      c.beginPath(); c.moveTo(cx-fw*1.1,hy+fh*0.2); c.quadraticCurveTo(cx,hy-s*0.05,cx+fw*1.1,hy+fh*0.2); c.lineTo(cx+fw*1.2,fy+fh); c.lineTo(cx-fw*1.2,fy+fh); c.closePath(); c.fill(); c.globalAlpha=1;
    } else if(spec.head==='mitre'){ // oracle high hat
      c.fillStyle=spec.garb2||'#5a3b8a'; c.beginPath(); c.moveTo(cx-fw*0.8,hy+s*0.01); c.lineTo(cx,hy-s*0.16); c.lineTo(cx+fw*0.8,hy+s*0.01); c.closePath(); c.fill();
      c.fillStyle=spec.accent||'#f4c66a'; star(c,cx,hy-s*0.06,8,s*0.03,s*0.013);
    } else if(spec.head==='helm'){ // admiral cap
      c.fillStyle=spec.garb||'#1a2440'; roundRect(c,cx-fw*0.95,hy+s*0.005,fw*1.9,s*0.055,s*0.02); c.fill();
      c.fillStyle=spec.accent||'#f4c66a'; c.fillRect(cx-fw*0.95,hy+s*0.045,fw*1.9,s*0.012);
      c.beginPath(); c.arc(cx,hy+s*0.028,s*0.02,0,TAU); c.fill();
    } else if(spec.head==='circlet'){ c.strokeStyle=spec.accent||'#c98bff'; c.lineWidth=s*0.014;
      c.beginPath(); c.moveTo(cx-fw*0.95,hy+fh*0.05); c.quadraticCurveTo(cx,hy-s*0.02,cx+fw*0.95,fy-fh*0.85); c.stroke();
      c.fillStyle=spec.accent||'#c98bff'; c.beginPath(); c.arc(cx,hy-s*0.005,s*0.016,0,TAU); c.fill();
    } else if(spec.head==='hood'){ c.fillStyle=spec.garb||'#231a10';
      c.beginPath(); c.moveTo(cx-fw*1.25,fy+fh); c.quadraticCurveTo(cx-fw*1.3,hy-s*0.03,cx,hy-s*0.05); c.quadraticCurveTo(cx+fw*1.3,hy-s*0.03,cx+fw*1.25,fy+fh);
      c.quadraticCurveTo(cx,fy+fh*0.4,cx-fw*1.25,fy+fh); c.fill();
    }
  }

  /* ---------------- SCENES (card backgrounds) ---------------- */
  function scene(cv, tag, seed){
    const {c,w,h}=fit(cv); const rn=rng((seed||7)*40503>>>0);
    c.clearRect(0,0,w,h);
    const P = SCENES[tag]||SCENES.throne;
    // sky/base gradient
    let g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,P.top); g.addColorStop(1,P.bot); c.fillStyle=g; c.fillRect(0,0,w,h);
    P.draw(c,w,h,rn);
    // atmospheric particles
    c.globalAlpha=.5; c.fillStyle='#fff';
    for(let i=0;i<26;i++){ c.globalAlpha=rn()*.4; c.beginPath(); c.arc(rn()*w, rn()*h*0.8, rn()*1.4+.3,0,TAU); c.fill(); }
    c.globalAlpha=1;
  }
  const SCENES = {
    throne:{ top:'#2a1a3a', bot:'#0e0820', draw(c,w,h,rn){
      // pillars
      c.fillStyle='rgba(80,60,120,.35)'; for(let i=0;i<4;i++){ const x=w*(0.12+i*0.26); c.fillRect(x-w*0.03,0,w*0.06,h); }
      // throne glow
      let g=c.createRadialGradient(w/2,h*0.35,4,w/2,h*0.35,w*0.5); g.addColorStop(0,'rgba(244,198,106,.3)'); g.addColorStop(1,'rgba(244,198,106,0)'); c.fillStyle=g; c.fillRect(0,0,w,h);
      // floor
      c.fillStyle='rgba(20,14,40,.6)'; c.fillRect(0,h*0.78,w,h*0.22);
    }},
    cathedral:{ top:'#3a2a1a', bot:'#100a08', draw(c,w,h,rn){
      // stained sun window
      let g=c.createRadialGradient(w/2,h*0.34,4,w/2,h*0.34,w*0.42); g.addColorStop(0,'rgba(255,180,90,.85)'); g.addColorStop(.5,'rgba(255,120,60,.4)'); g.addColorStop(1,'rgba(60,20,10,0)');
      c.fillStyle=g; c.beginPath(); c.arc(w/2,h*0.34,w*0.2,0,TAU); c.fill();
      c.strokeStyle='rgba(255,220,160,.4)'; c.lineWidth=2; for(let i=0;i<8;i++){ const a=i/8*TAU; c.beginPath(); c.moveTo(w/2,h*0.34); c.lineTo(w/2+Math.cos(a)*w*0.2, h*0.34+Math.sin(a)*w*0.2); c.stroke(); }
    }},
    fleet:{ top:'#0a1430', bot:'#05060f', draw(c,w,h,rn){
      // ships as triangles
      c.fillStyle='rgba(120,168,255,.5)';
      for(let i=0;i<5;i++){ const x=rn()*w, y=h*(0.25+rn()*0.4), sz=w*(0.05+rn()*0.06);
        c.beginPath(); c.moveTo(x,y); c.lineTo(x+sz*2,y+sz*0.4); c.lineTo(x,y+sz*0.8); c.closePath(); c.fill();
        c.fillStyle='rgba(255,180,90,.8)'; c.beginPath(); c.arc(x, y+sz*0.4, 1.5,0,TAU); c.fill(); c.fillStyle='rgba(120,168,255,.5)'; }
    }},
    void:{ top:'#100820', bot:'#02010a', draw(c,w,h,rn){
      for(let i=0;i<70;i++){ c.globalAlpha=rn(); c.fillStyle=rn()>.5?'#bfe3ff':'#fff'; c.beginPath(); c.arc(rn()*w,rn()*h,rn()*1.6+.2,0,TAU); c.fill(); }
      c.globalAlpha=1;
    }},
    crypt:{ top:'#1a1030', bot:'#060310', draw(c,w,h,rn){
      let g=c.createRadialGradient(w/2,h*0.4,2,w/2,h*0.4,w*0.5); g.addColorStop(0,'rgba(201,139,255,.4)'); g.addColorStop(1,'rgba(201,139,255,0)'); c.fillStyle=g; c.fillRect(0,0,w,h);
      // mirror/crown silhouette
      c.strokeStyle='rgba(201,139,255,.5)'; c.lineWidth=3; c.beginPath(); c.ellipse(w/2,h*0.42,w*0.14,h*0.22,0,0,TAU); c.stroke();
    }},
    sun:{ top:'#40160a', bot:'#0a0402', draw(c,w,h,rn){
      let g=c.createRadialGradient(w/2,h*0.42,4,w/2,h*0.42,w*0.55); g.addColorStop(0,'rgba(255,230,180,.95)'); g.addColorStop(.3,'rgba(255,120,50,.7)'); g.addColorStop(.7,'rgba(180,40,20,.3)'); g.addColorStop(1,'rgba(40,10,6,0)');
      c.fillStyle=g; c.beginPath(); c.arc(w/2,h*0.42,w*0.32,0,TAU); c.fill();
      c.fillStyle='rgba(80,20,10,.5)'; for(let i=0;i<5;i++){ c.beginPath(); c.arc(w/2+ (rn()-.5)*w*0.3, h*0.42+(rn()-.5)*h*0.3, rn()*w*0.05+4,0,TAU); c.fill(); }
    }},
    people:{ top:'#241830', bot:'#0c0818', draw(c,w,h,rn){
      // crowd silhouettes
      c.fillStyle='rgba(60,44,90,.6)';
      for(let i=0;i<14;i++){ const x=rn()*w, sz=h*(0.06+rn()*0.05); c.beginPath(); c.arc(x,h*0.85,sz,0,TAU); c.fill(); c.fillRect(x-sz*0.6,h*0.85,sz*1.2,h*0.2); }
    }},
    court:{ top:'#2a2044', bot:'#0e0a1e', draw(c,w,h,rn){
      c.strokeStyle='rgba(201,139,255,.25)'; c.lineWidth=1;
      for(let i=0;i<6;i++){ c.beginPath(); c.arc(w/2,h*0.4, w*(0.1+i*0.08),0,TAU); c.stroke(); }
    }},
    frontier:{ top:'#301810', bot:'#0a0604', draw(c,w,h,rn){
      c.fillStyle='rgba(120,60,30,.5)'; c.beginPath(); c.moveTo(0,h); for(let x=0;x<=w;x+=w/8){ c.lineTo(x, h*0.6+ Math.sin(x*0.05)*h*0.1); } c.lineTo(w,h); c.fill();
    }},
  };

  /* ---------------- RELICS ---------------- */
  function relic(cv, kind){
    const {c,w,h}=fit(cv); c.clearRect(0,0,w,h); const cx=w/2, cy=h/2, s=Math.min(w,h);
    let g=c.createRadialGradient(cx,cy,2,cx,cy,s*0.6); g.addColorStop(0,'rgba(244,198,106,.2)'); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=g; c.fillRect(0,0,w,h);
    c.lineWidth=s*0.03; c.lineJoin='round';
    const K = {
      shard:()=>{ c.fillStyle='#c98bff'; c.strokeStyle='#efd6ff'; c.beginPath(); c.moveTo(cx,cy-s*0.3); c.lineTo(cx+s*0.16,cy); c.lineTo(cx,cy+s*0.32); c.lineTo(cx-s*0.16,cy); c.closePath(); c.fill(); c.stroke(); },
      ring:()=>{ c.strokeStyle='#f4c66a'; c.lineWidth=s*0.06; c.beginPath(); c.arc(cx,cy,s*0.24,0,TAU); c.stroke(); c.fillStyle='#ff6a3d'; c.beginPath(); c.arc(cx,cy-s*0.24,s*0.05,0,TAU); c.fill(); },
      letter:()=>{ c.fillStyle='#efe6d0'; roundRect(c,cx-s*0.24,cy-s*0.18,s*0.48,s*0.36,s*0.03); c.fill(); c.strokeStyle='#c8912f'; c.lineWidth=s*0.015; c.stroke(); c.fillStyle='#ff5470'; c.beginPath(); c.arc(cx,cy+s*0.02,s*0.06,0,TAU); c.fill(); },
      blade:()=>{ c.save(); c.translate(cx,cy); c.rotate(-0.5); c.fillStyle='#bfe3ff'; c.beginPath(); c.moveTo(0,-s*0.34); c.lineTo(s*0.05,s*0.1); c.lineTo(-s*0.05,s*0.1); c.closePath(); c.fill(); c.fillStyle='#f4c66a'; c.fillRect(-s*0.1,s*0.1,s*0.2,s*0.05); c.restore(); },
      compass:()=>{ c.strokeStyle='#68e0c8'; c.lineWidth=s*0.03; c.beginPath(); c.arc(cx,cy,s*0.26,0,TAU); c.stroke(); c.fillStyle='#68e0c8'; star(c,cx,cy,4,s*0.2,s*0.05); },
      chalice:()=>{ c.fillStyle='#f4c66a'; c.beginPath(); c.moveTo(cx-s*0.16,cy-s*0.2); c.quadraticCurveTo(cx,cy+s*0.12,cx+s*0.16,cy-s*0.2); c.closePath(); c.fill(); c.fillRect(cx-s*0.03,cy-s*0.02,s*0.06,s*0.22); c.fillRect(cx-s*0.12,cy+s*0.2,s*0.24,s*0.04); c.fillStyle='#ff6a3d'; c.beginPath(); c.arc(cx,cy-s*0.14,s*0.05,0,TAU); c.fill(); },
      mask:()=>{ c.fillStyle='#d8d2f0'; c.beginPath(); c.ellipse(cx,cy,s*0.22,s*0.28,0,0,TAU); c.fill(); c.fillStyle='#0a0818'; c.beginPath(); c.ellipse(cx-s*0.08,cy-s*0.04,s*0.05,s*0.03,0,0,TAU); c.ellipse(cx+s*0.08,cy-s*0.04,s*0.05,s*0.03,0,0,TAU); c.fill(); },
      key:()=>{ c.strokeStyle='#f4c66a'; c.lineWidth=s*0.05; c.beginPath(); c.arc(cx,cy-s*0.12,s*0.1,0,TAU); c.stroke(); c.beginPath(); c.moveTo(cx,cy-s*0.02); c.lineTo(cx,cy+s*0.26); c.moveTo(cx,cy+s*0.16); c.lineTo(cx+s*0.1,cy+s*0.16); c.stroke(); },
      seed:()=>{ c.fillStyle='#68e0c8'; c.beginPath(); c.ellipse(cx,cy,s*0.12,s*0.2,0,0,TAU); c.fill(); c.strokeStyle='#b6ffe8'; c.lineWidth=s*0.02; c.beginPath(); c.moveTo(cx,cy+s*0.2); c.lineTo(cx,cy-s*0.24); c.stroke(); },
      eye:()=>{ c.fillStyle='#ffcf6b'; c.beginPath(); c.ellipse(cx,cy,s*0.26,s*0.15,0,0,TAU); c.fill(); c.fillStyle='#301004'; c.beginPath(); c.arc(cx,cy,s*0.08,0,TAU); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.arc(cx-s*0.02,cy-s*0.02,s*0.02,0,TAU); c.fill(); },
    };
    (K[kind]||K.shard)();
    // sparkle
    c.fillStyle='rgba(255,255,255,.8)'; star(c,cx+s*0.2,cy-s*0.24,4,s*0.03,s*0.008);
  }

  /* ---------------- ENDING ART ---------------- */
  function endArt(cv, type){
    const {c,w,h}=fit(cv); c.clearRect(0,0,w,h); const cx=w/2,cy=h/2,s=Math.min(w,h);
    if(type==='sacrifice'){ let g=c.createRadialGradient(cx,cy,2,cx,cy,s*0.5); g.addColorStop(0,'#fff'); g.addColorStop(.4,'#ff9a4d'); g.addColorStop(1,'rgba(255,90,40,0)'); c.fillStyle=g; c.beginPath(); c.arc(cx,cy,s*0.5,0,TAU); c.fill(); star(c,cx,cy,8,s*0.28,s*0.11); }
    else if(type==='exodus'){ c.fillStyle='#7aa8ff'; for(let i=0;i<7;i++){ const x=cx+(i-3)*s*0.1, y=cy+Math.sin(i)*s*0.06; c.beginPath(); c.moveTo(x,y-s*0.08); c.lineTo(x+s*0.1,y); c.lineTo(x,y+s*0.05); c.closePath(); c.fill(); } }
    else if(type==='reignite'){ c.strokeStyle='#68e0c8'; c.lineWidth=s*0.03; c.beginPath(); c.arc(cx,cy,s*0.28,0,TAU); c.stroke(); let g=c.createRadialGradient(cx,cy,2,cx,cy,s*0.3); g.addColorStop(0,'#eaffd0'); g.addColorStop(1,'rgba(104,224,200,0)'); c.fillStyle=g; c.beginPath(); c.arc(cx,cy,s*0.3,0,TAU); c.fill(); }
    else if(type==='break'){ c.strokeStyle='#c98bff'; c.lineWidth=s*0.04; for(let i=0;i<5;i++){ const a=i/5*TAU; c.beginPath(); c.moveTo(cx,cy); c.lineTo(cx+Math.cos(a)*s*0.34, cy+Math.sin(a)*s*0.34); c.stroke(); } }
    else if(type==='dark'){ c.fillStyle='#0a0410'; c.beginPath(); c.arc(cx,cy,s*0.3,0,TAU); c.fill(); c.strokeStyle='#3a1a2a'; c.lineWidth=s*0.02; c.beginPath(); c.arc(cx,cy,s*0.32,0,TAU); c.stroke(); }
    else { crown(cv,{glow:true}); return; }
    // death crown fragment
  }

  /* ---------------- SVG ICONS (sigils + tabs) ---------------- */
  const ICON = {
    temple:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#ffcf6b"/><g stroke="#ffcf6b" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></g></svg>',
    povo:'<svg viewBox="0 0 24 24" fill="#68e0c8"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 2.2-5 5-5s5 2 5 5M11 20c0-3 2.2-5 5-5s5 2 5 5" stroke="#68e0c8" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
    frota:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 13l9-3 9 3-9 8z" fill="#7aa8ff"/><path d="M12 3v7" stroke="#bfe3ff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="10" r="1.6" fill="#bfe3ff"/></svg>',
    eter:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l5 6-5 14-5-14z" fill="#c98bff"/><path d="M7 8h10" stroke="#efd6ff" stroke-width="1.4"/></svg>',
    court:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" fill="#f4c66a"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6" fill="#c8912f"/></svg>',
    relics:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l3 5-3 13-3-13z" fill="#c98bff"/><path d="M9 8h6" stroke="#fff" stroke-width="1.3"/></svg>',
    chron:'<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#efe6d0"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#c8912f" stroke-width="1.5" stroke-linecap="round"/></svg>',
    realm:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#1a2440" stroke="#7aa8ff" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="11" ry="4" stroke="#c98bff" stroke-width="1.3" fill="none"/><circle cx="12" cy="12" r="3" fill="#68e0c8"/></svg>',
  };
  function svgTo(cv, name){ // render an svg icon string onto a canvas
    const el = cv; const s = ICON[name]; if(!s) return;
    const img = new Image(); const blob = new Blob([s.replace('viewBox','width="76" height="76" viewBox')], {type:'image/svg+xml'});
    const url = URL.createObjectURL(blob); img.onload=()=>{ const c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); c.drawImage(img,0,0,cv.width,cv.height); URL.revokeObjectURL(url); }; img.src=url;
  }

  return { stars, crown, portrait, scene, relic, endArt, ICON, svgTo, rng };
})();
