// =============================================================================
// engine3d.js — Mesa de dados 3D com física (Three.js + cannon-es).
//   createDiceTable(canvas, onResult) → { roll() }
//   onResult(valores[]) é chamado quando os dados assentam.
// =============================================================================
import * as THREE from './vendor/three.module.js';
import * as CANNON from './vendor/cannon-es.js';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';

export function createDiceTable(canvas, onResult){
  const TX = 4.5, TZ = 6.2, WT = 1.0, N = 5, S = 0.5;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c2f26');

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 29, 0); camera.up.set(0,0,-1); camera.lookAt(0,0,0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.62));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(-6, 18, 8); key.castShadow = true;
  key.shadow.mapSize.set(1024,1024); key.shadow.camera.near=1; key.shadow.camera.far=60;
  key.shadow.camera.left=-16; key.shadow.camera.right=16; key.shadow.camera.top=16; key.shadow.camera.bottom=-16;
  key.shadow.bias=-0.0004; scene.add(key);
  scene.add(new THREE.DirectionalLight(0x88ccbb, 0.25).translateX(8));

  const floor = new THREE.Mesh(new THREE.PlaneGeometry((TX+WT+1)*2,(TZ+WT+1)*2),
    new THREE.MeshStandardMaterial({ color:'#14614e', roughness:0.95 }));
  floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; scene.add(floor);
  const railMat = new THREE.MeshStandardMaterial({ color:'#3a2a17', roughness:0.8 });
  const rail=(w,d,x,z)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,1.1,d),railMat); m.position.set(x,0.55,z); m.castShadow=m.receiveShadow=true; scene.add(m); };
  rail((TX+WT)*2,WT,0,-(TZ+WT/2)); rail((TX+WT)*2,WT,0,(TZ+WT/2));
  rail(WT,(TZ+WT)*2,-(TX+WT/2),0); rail(WT,(TZ+WT)*2,(TX+WT/2),0);

  // dado profissional (corpo arredondado + pontos 3D)
  const FACES = [
    { dir:[1,0,0], val:1, u:[0,0,1], v:[0,1,0] }, { dir:[-1,0,0], val:6, u:[0,0,-1], v:[0,1,0] },
    { dir:[0,1,0], val:2, u:[1,0,0], v:[0,0,1] }, { dir:[0,-1,0], val:5, u:[1,0,0], v:[0,0,-1] },
    { dir:[0,0,1], val:3, u:[1,0,0], v:[0,1,0] }, { dir:[0,0,-1], val:4, u:[-1,0,0], v:[0,1,0] },
  ];
  const PIP_OFF = { 1:[[0,0]], 2:[[-1,1],[1,-1]], 3:[[-1,1],[0,0],[1,-1]],
    4:[[-1,1],[1,1],[-1,-1],[1,-1]], 5:[[-1,1],[1,1],[0,0],[-1,-1],[1,-1]],
    6:[[-1,1],[1,1],[-1,0],[1,0],[-1,-1],[1,-1]] };
  const bodyMat = new THREE.MeshStandardMaterial({ color:'#f6efdd', roughness:0.28, metalness:0.04 });
  const pipMat  = new THREE.MeshStandardMaterial({ color:'#241b16', roughness:0.35, metalness:0.15 });
  const bodyGeo = new RoundedBoxGeometry(S*2,S*2,S*2,5,S*0.34);
  const pipGeo  = new THREE.SphereGeometry(S*0.20,18,14);
  const SPREAD = S*0.52;
  function makeDie(mat){
    const g = new THREE.Group();
    const body = new THREE.Mesh(bodyGeo, mat); body.castShadow=body.receiveShadow=true; g.add(body);
    for(const f of FACES) for(const [ou,ov] of PIP_OFF[f.val]){
      const p = new THREE.Mesh(pipGeo, pipMat);
      for(let k=0;k<3;k++) p.position.setComponent(k, f.dir[k]*(S*0.95)+f.u[k]*ou*SPREAD+f.v[k]*ov*SPREAD);
      p.lookAt(p.position.clone().add(new THREE.Vector3(f.dir[0],f.dir[1],f.dir[2])));
      p.scale.z=0.45; p.castShadow=false; g.add(p);
    }
    return g;
  }

  const world = new CANNON.World({ gravity:new CANNON.Vec3(0,-62,0) });
  world.broadphase = new CANNON.SAPBroadphase(world); world.allowSleep=true;
  world.solver.iterations=20;
  world.defaultContactMaterial.contactEquationStiffness=1e8;
  world.defaultContactMaterial.contactEquationRelaxation=3;
  const mFloor=new CANNON.Material('floor'), mDie=new CANNON.Material('die'), mWall=new CANNON.Material('wall');
  world.addContactMaterial(new CANNON.ContactMaterial(mDie,mFloor,{friction:0.4,restitution:0.07}));
  world.addContactMaterial(new CANNON.ContactMaterial(mDie,mDie,{friction:0.1,restitution:0.1}));
  world.addContactMaterial(new CANNON.ContactMaterial(mDie,mWall,{friction:0.2,restitution:0.15}));
  const floorBody=new CANNON.Body({mass:0,material:mFloor,shape:new CANNON.Box(new CANNON.Vec3(TX+WT+1,0.5,TZ+WT+1))});
  floorBody.position.set(0,-0.5,0); world.addBody(floorBody);
  const WH=5;
  const wall=(hx,hy,hz,x,z)=>{ const b=new CANNON.Body({mass:0,material:mWall,shape:new CANNON.Box(new CANNON.Vec3(hx,hy,hz))}); b.position.set(x,hy,z); world.addBody(b); };
  wall(TX+WT,WH,WT/2,0,-(TZ+WT/2)); wall(TX+WT,WH,WT/2,0,(TZ+WT/2));
  wall(WT/2,WH,TZ+WT,-(TX+WT/2),0); wall(WT/2,WH,TZ+WT,(TX+WT/2),0);

  // anel dourado que marca dado "seguro" (segurado p/ não rerrolar)
  const ringGeo = new THREE.RingGeometry(S*1.15, S*1.55, 28);
  const ringMat = new THREE.MeshBasicMaterial({ color:'#f2c14e', transparent:true, opacity:0.92, side:THREE.DoubleSide });

  const dice=[];
  const held = new Array(N).fill(false);
  for(let i=0;i<N;i++){
    const body=new CANNON.Body({mass:1,material:mDie,shape:new CANNON.Box(new CANNON.Vec3(S,S,S))});
    body.allowSleep=true; body.sleepSpeedLimit=0.22; body.sleepTimeLimit=0.14; body.linearDamping=0.05; body.angularDamping=0.07;
    world.addBody(body);
    const mat = bodyMat.clone();
    const mesh=makeDie(mat); mesh.userData.dieIndex=i; scene.add(mesh);
    const ring=new THREE.Mesh(ringGeo, ringMat); ring.rotation.x=-Math.PI/2; ring.position.y=0.04; ring.visible=false; scene.add(ring);
    dice.push({body,mesh,mat,ring});
  }
  function updateHeldVisual(i){
    const d=dice[i];
    d.mat.emissive.set(held[i]?0x6a4a08:0x000000); d.mat.emissiveIntensity = held[i]?0.55:0;
    d.ring.visible = held[i];
    if(held[i]) d.ring.position.set(d.body.position.x, 0.04, d.body.position.z);
  }
  function clearHeld(){ for(let i=0;i<N;i++){ held[i]=false; updateHeldVisual(i); } }
  function toggleHeld(i){ if(i<0||i>=N) return; held[i]=!held[i]; updateHeldVisual(i); }
  // raycast: pega o índice do dado sob o ponto (clique/toque), ou -1
  const raycaster=new THREE.Raycaster(), ndc=new THREE.Vector2();
  function pick(clientX, clientY){
    const r=canvas.getBoundingClientRect();
    ndc.x=((clientX-r.left)/r.width)*2-1; ndc.y=-((clientY-r.top)/r.height)*2+1;
    raycaster.setFromCamera(ndc, camera);
    const hits=raycaster.intersectObjects(dice.map(d=>d.mesh), true);
    if(!hits.length) return -1;
    let o=hits[0].object; while(o && o.userData.dieIndex===undefined) o=o.parent;
    return o ? o.userData.dieIndex : -1;
  }

  let rolling=false, settleFrames=0, rollTimer=0;
  function roll(onlyUnheld=false){
    rolling=true; settleFrames=0;
    clearTimeout(rollTimer);
    rollTimer=setTimeout(()=>{ if(rolling){ rolling=false; dice.forEach((d,i)=>{ if(!(onlyUnheld&&held[i])) d.body.sleep(); }); report(); } }, 5000);
    dice.forEach((d,i)=>{
      if(onlyUnheld && held[i]) return;    // mantém os dados segurados no lugar
      const b=d.body; b.wakeUp();
      const a=(i/N)*Math.PI*2+0.4;
      b.position.set(Math.cos(a)*1.7+(Math.random()-0.5)*0.15, 2.3+i*0.28, Math.sin(a)*1.7+(Math.random()-0.5)*0.15);
      b.quaternion.setFromEuler(Math.random()*6,Math.random()*6,Math.random()*6);
      b.velocity.set((Math.random()-0.5)*0.7, -0.4+Math.random()*0.3, (Math.random()-0.5)*0.7);
      b.angularVelocity.set((Math.random()-0.5)*26,(Math.random()-0.5)*26,(Math.random()-0.5)*26);
      b.updateMassProperties();
    });
  }
  const LOCAL_N=[[new CANNON.Vec3(1,0,0),1],[new CANNON.Vec3(-1,0,0),6],[new CANNON.Vec3(0,1,0),2],
                 [new CANNON.Vec3(0,-1,0),5],[new CANNON.Vec3(0,0,1),3],[new CANNON.Vec3(0,0,-1),4]];
  const topValue=body=>{ let best=-2,val=1; for(const [n,v] of LOCAL_N){ const w=body.quaternion.vmult(n); if(w.y>best){best=w.y;val=v;} } return val; };
  function report(){ if(onResult) onResult(dice.map(d=>topValue(d.body))); }

  const clock=new THREE.Clock();
  function tick(){
    requestAnimationFrame(tick);
    const dt=Math.min(clock.getDelta(),1/30);
    world.step(1/120,dt,8);
    const mx=TX-S-0.05, mz=TZ-S-0.05;
    for(const d of dice){
      const p=d.body.position, v=d.body.velocity, av=d.body.angularVelocity;
      if(p.y<-1.5 || Math.abs(p.x)>TX+WT || Math.abs(p.z)>TZ+WT){
        d.body.position.set((Math.random()-0.5)*(TX-1),1.2,(Math.random()-0.5)*(TZ-1));
        v.setZero(); av.setZero(); d.body.wakeUp();
      } else if(v.length()+av.length()<1.4){
        if(p.x>mx){p.x=mx;v.x=Math.min(0,v.x);} if(p.x<-mx){p.x=-mx;v.x=Math.max(0,v.x);}
        if(p.z>mz){p.z=mz;v.z=Math.min(0,v.z);} if(p.z<-mz){p.z=-mz;v.z=Math.max(0,v.z);}
      }
      d.mesh.position.copy(d.body.position); d.mesh.quaternion.copy(d.body.quaternion);
      if(held[dice.indexOf(d)]) d.ring.position.set(p.x, 0.04, p.z);
    }
    if(rolling){
      const asleep=dice.every(d=>d.body.sleepState===CANNON.Body.SLEEPING || d.body.velocity.length()<0.12 && d.body.angularVelocity.length()<0.12);
      settleFrames=asleep?settleFrames+1:0;
      if(settleFrames>16){ rolling=false; clearTimeout(rollTimer); report(); }
    }
    renderer.render(scene,camera);
  }
  function resize(){
    const w=innerWidth,h=innerHeight; renderer.setSize(w,h,false); camera.aspect=w/h;
    const t=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    camera.position.y=(TX+WT)/(t*camera.aspect*0.86); camera.lookAt(0,0,0); camera.updateProjectionMatrix();
  }
  addEventListener('resize',resize); resize(); tick();
  roll();   // posiciona os dados na mesa ao abrir (resultado ignorado pelo jogo)
  return {
    roll, isRolling:()=>rolling, pick, toggleHeld, clearHeld,
    heldCount:()=>held.filter(Boolean).length,
    values:()=>dice.map(d=>topValue(d.body)),
  };
}
