// INPUT: um dedo/clique = MIRAR (puxa pra trás a partir da tampinha ativa e
// solta — estilingue: força e direção). Dois dedos / botão direito / roda =
// câmera (girar, tombar, zoom). A força é limitada (jogadas sempre possíveis).
import * as THREE from 'three';
import { CameraRig } from './render/scene';

const MAX_DRAG = 13;   // unidades de mundo p/ força máxima

interface Opts {
  canAim: () => boolean;
  capPos: () => { x: number; y: number } | null;   // posição da tampinha ativa (mundo)
  onAim: (dx: number, dz: number, power: number) => void;
  onRelease: (dx: number, dz: number, power: number) => void;
  onCancel: () => void;
}

export class InputController {
  private ray = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private pointers = new Map<number, { x: number; y: number }>();
  private aiming = false; private camDrag: { x: number; y: number } | null = null;
  private pinch = 0; private lastMid: { x: number; y: number } | null = null;

  constructor(private dom: HTMLCanvasElement, private cam: THREE.Camera, private rig: CameraRig, private opts: Opts) {
    dom.addEventListener('pointerdown', this.down);
    dom.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    dom.addEventListener('wheel', this.wheel, { passive: false });
    dom.addEventListener('contextmenu', e => e.preventDefault());
  }

  setCamera(cam: THREE.Camera, rig: CameraRig): void { this.cam = cam; this.rig = rig; }

  private world(cx: number, cy: number): { x: number; z: number } | null {
    const r = this.dom.getBoundingClientRect();
    this.ndc.x = ((cx - r.left) / r.width) * 2 - 1;
    this.ndc.y = -((cy - r.top) / r.height) * 2 + 1;
    this.ray.setFromCamera(this.ndc, this.cam);
    const p = new THREE.Vector3();
    return this.ray.ray.intersectPlane(this.plane, p) ? { x: p.x, z: p.z } : null;
  }

  private down = (e: PointerEvent) => {
    (this.dom as any).setPointerCapture?.(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 1) {
      if (e.button === 2) { this.camDrag = { x: e.clientX, y: e.clientY }; return; }
      if (this.opts.canAim()) { this.aiming = true; this.updateAim(e.clientX, e.clientY); }
      else this.camDrag = { x: e.clientX, y: e.clientY };
    } else if (this.pointers.size === 2) {
      this.aiming = false; this.opts.onCancel(); this.camDrag = null;
      const a = [...this.pointers.values()]; this.pinch = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      this.lastMid = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 };
    }
  };

  private move = (e: PointerEvent) => {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 1) {
      if (this.aiming) this.updateAim(e.clientX, e.clientY);
      else if (this.camDrag) { this.rig.rotate(e.clientX - this.camDrag.x); this.rig.tilt(e.clientY - this.camDrag.y); this.camDrag = { x: e.clientX, y: e.clientY }; }
    } else if (this.pointers.size === 2) {
      const a = [...this.pointers.values()];
      const cx = (a[0].x + a[1].x) / 2, cy = (a[0].y + a[1].y) / 2, d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      if (this.lastMid) { this.rig.rotate((cx - this.lastMid.x) * 0.8); this.rig.tilt((cy - this.lastMid.y) * 0.8); }
      if (this.pinch) this.rig.zoomBy(this.pinch / d, this.dom.clientWidth, this.dom.clientHeight);
      this.lastMid = { x: cx, y: cy }; this.pinch = d;
    }
  };

  private up = (e: PointerEvent) => {
    const wasAiming = this.aiming && this.pointers.size === 1;
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) { this.pinch = 0; this.lastMid = null; }
    if (this.pointers.size === 0) {
      if (wasAiming) this.release(e.clientX, e.clientY);
      this.aiming = false; this.camDrag = null;
    }
  };

  private aimVec(cx: number, cy: number): { dx: number; dz: number; power: number } | null {
    const cap = this.opts.capPos(); const w = this.world(cx, cy);
    if (!cap || !w) return null;
    // puxa pra trás → atira pra frente (direção oposta ao arraste)
    const dragX = w.x - cap.x, dragZ = w.z - cap.y;
    const dist = Math.hypot(dragX, dragZ);
    const power = Math.min(1, dist / MAX_DRAG);
    if (dist < 0.4) return { dx: 1, dz: 0, power: 0 };
    return { dx: -dragX / dist, dz: -dragZ / dist, power };
  }
  private updateAim(cx: number, cy: number): void { const a = this.aimVec(cx, cy); if (a) this.opts.onAim(a.dx, a.dz, a.power); }
  private release(cx: number, cy: number): void { const a = this.aimVec(cx, cy); if (a && a.power > 0.06) this.opts.onRelease(a.dx, a.dz, a.power); else this.opts.onCancel(); }

  private wheel = (e: WheelEvent) => { e.preventDefault(); this.rig.zoomBy(e.deltaY > 0 ? 1.08 : 0.92, this.dom.clientWidth, this.dom.clientHeight); };
}
