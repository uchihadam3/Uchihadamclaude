// Visual das tampinhas: corpo cilíndrico crimpado + topo desenhado por skin +
// aro. Giram enquanto deslizam, balançam de leve, piscam ao bater. A ativa
// ganha um anel destacado.
import * as THREE from 'three';
import { Cap } from '../engine/core';
import { skinById } from '../game/skins';
import { makeCapTex } from './capart';

const H = 0.5;

class CapView {
  group = new THREE.Group();
  private top: THREE.Mesh;
  private ringHi: THREE.Mesh;
  constructor(cap: Cap) {
    const sk = skinById(cap.skin);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(cap.radius, cap.radius * 0.96, H, 40),
      new THREE.MeshStandardMaterial({ color: sk.side, roughness: 0.45, metalness: 0.25 }));
    body.position.y = H / 2; body.castShadow = true; this.group.add(body);
    const crimp = new THREE.Mesh(new THREE.TorusGeometry(cap.radius, 0.07, 8, 40),
      new THREE.MeshStandardMaterial({ color: sk.ring, roughness: 0.5, metalness: 0.3 }));
    crimp.rotation.x = Math.PI / 2; crimp.position.y = H - 0.03; this.group.add(crimp);
    this.top = new THREE.Mesh(new THREE.CircleGeometry(cap.radius * 0.99, 44),
      new THREE.MeshStandardMaterial({ map: makeCapTex(sk.id, sk.art), roughness: 0.42, metalness: 0.25, transparent: true }));
    this.top.rotation.x = -Math.PI / 2; this.top.position.y = H + 0.005; this.group.add(this.top);
    // anel de destaque (ativo)
    this.ringHi = new THREE.Mesh(new THREE.TorusGeometry(cap.radius + 0.35, 0.09, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.ringHi.rotation.x = -Math.PI / 2; this.ringHi.position.y = 0.05; this.ringHi.visible = false; this.group.add(this.ringHi);
  }
  update(cap: Cap, t: number, active: boolean, dt = 0): void {
    this.group.visible = true;
    const bobY = cap.moving ? Math.abs(Math.sin(t * 20)) * 0.03 : Math.sin(t * 2 + cap.bob) * 0.015;
    // teleporte ANIMADO (Caos): a tampinha VOA da posição antiga até a nova,
    // capotando — só o desenho; a física já está na posição final
    let px = cap.pos.x, py = cap.pos.y, lift = 0, tumble = 0;
    if (cap.vfx) {
      const v = cap.vfx; v.t += dt;
      const k = Math.min(1, v.t / v.dur);
      const e = 1 - Math.pow(1 - k, 3);                       // arranca e freia
      px = v.fx + (cap.pos.x - v.fx) * e; py = v.fy + (cap.pos.y - v.fy) * e;
      lift = (v.arc || 0) * Math.sin(Math.PI * Math.min(1, k));
      tumble = (v.spin || 0) * e;
      if (k >= 1) delete cap.vfx;
    }
    this.group.position.set(px, bobY + (cap.z || 0) + lift, py);
    this.group.rotation.y = cap.angle + tumble;
    if (tumble) this.group.rotation.x = Math.sin(tumble * 0.7) * 0.55;       // capotando no voo
    else if (cap.airborne) this.group.rotation.x = Math.sin(t * 10) * 0.25;  // inclina no ar
    else this.group.rotation.x = 0;
    const pop = (1 + cap.hitFlash * 0.12) * (1 + (cap.z || 0) * 0.05);   // cresce um tico no alto
    this.group.scale.set(pop, 1 - cap.hitFlash * 0.1, pop);
    this.ringHi.visible = active && !cap.finished;
    if (active) { const s = 1 + Math.sin(t * 6) * 0.06; this.ringHi.scale.set(s, s, s); (this.ringHi.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 6) * 0.25; }
  }
}

export class CapsRenderer {
  group = new THREE.Group();
  views: CapView[] = [];
  build(caps: Cap[]): void {
    this.group.clear(); this.views = [];
    for (const c of caps) { const v = new CapView(c); this.views.push(v); this.group.add(v.group); }
  }
  update(caps: Cap[], t: number, activeId: number, dt = 0): void {
    for (let i = 0; i < caps.length; i++) this.views[i]?.update(caps[i], t, caps[i].id === activeId, dt);
  }
}
