// Visual das tampinhas: corpo cilíndrico crimpado + topo desenhado por skin +
// aro. Giram enquanto deslizam, balançam de leve, piscam ao bater. A ativa
// ganha um anel destacado.
import * as THREE from 'three';
import { Cap } from '../engine/core';
import { skinById } from '../game/skins';
import { makeCapTop } from './textures';

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
    this.top = new THREE.Mesh(new THREE.CircleGeometry(cap.radius * 0.94, 40),
      new THREE.MeshStandardMaterial({ map: makeCapTop(sk), roughness: 0.4, metalness: 0.2 }));
    this.top.rotation.x = -Math.PI / 2; this.top.position.y = H + 0.005; this.group.add(this.top);
    // anel de destaque (ativo)
    this.ringHi = new THREE.Mesh(new THREE.TorusGeometry(cap.radius + 0.35, 0.09, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.ringHi.rotation.x = -Math.PI / 2; this.ringHi.position.y = 0.05; this.ringHi.visible = false; this.group.add(this.ringHi);
  }
  update(cap: Cap, t: number, active: boolean): void {
    this.group.visible = true;
    const bobY = cap.moving ? Math.abs(Math.sin(t * 20)) * 0.03 : Math.sin(t * 2 + cap.bob) * 0.015;
    this.group.position.set(cap.pos.x, bobY, cap.pos.y);
    this.group.rotation.y = cap.angle;
    const pop = 1 + cap.hitFlash * 0.12;
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
  update(caps: Cap[], t: number, activeId: number): void {
    for (let i = 0; i < caps.length; i++) this.views[i]?.update(caps[i], t, caps[i].id === activeId);
  }
}
