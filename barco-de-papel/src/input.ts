// Camada de INPUT: raycast no terreno para achar o ponto do mundo, aplica a
// ferramenta ativa (só no Planejamento) e controla a câmera (pan/zoom).
// 1 dedo = editar (ou pan quando não pode editar) · 2 dedos = pan + pinça.
// Desktop: botão direito arrasta = pan · roda = zoom.
import * as THREE from 'three';
import { CameraRig } from './render/scene';

interface Pt { x: number; z: number; }
interface Opts { canEdit: () => boolean; onEdit: (x: number, z: number) => void; onHover: (p: Pt | null) => void; }

export class InputController {
  private ray = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private target: THREE.Object3D | null = null;
  private pointers = new Map<number, { x: number; y: number }>();
  private editing = false; private panMode = false;
  private lastPan: { x: number; y: number } | null = null;
  private lastMid: { x: number; y: number } | null = null;
  private pinch = 0;

  constructor(private dom: HTMLCanvasElement, private cam: THREE.Camera, private rig: CameraRig, private opts: Opts) {
    dom.addEventListener('pointerdown', this.down);
    dom.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    dom.addEventListener('wheel', this.wheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  setTarget(m: THREE.Object3D): void { this.target = m; }

  private world(cx: number, cy: number): Pt | null {
    const r = this.dom.getBoundingClientRect();
    this.ndc.x = ((cx - r.left) / r.width) * 2 - 1;
    this.ndc.y = -((cy - r.top) / r.height) * 2 + 1;
    this.ray.setFromCamera(this.ndc, this.cam);
    if (!this.target) return null;
    const hit = this.ray.intersectObject(this.target, false);
    return hit.length ? { x: hit[0].point.x, z: hit[0].point.z } : null;
  }

  private down = (e: PointerEvent) => {
    (this.dom as any).setPointerCapture?.(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 1) {
      if (e.button === 2) { this.panMode = true; this.lastPan = { x: e.clientX, y: e.clientY }; return; }
      if (this.opts.canEdit()) { this.editing = true; const p = this.world(e.clientX, e.clientY); if (p) { this.opts.onEdit(p.x, p.z); this.opts.onHover(p); } }
      else { this.lastPan = { x: e.clientX, y: e.clientY }; }
    } else if (this.pointers.size === 2) {
      this.editing = false; this.lastPan = null;
      const a = [...this.pointers.values()]; this.pinch = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      this.lastMid = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 };
    }
  };

  private move = (e: PointerEvent) => {
    if (!this.pointers.has(e.pointerId)) { const p = this.world(e.clientX, e.clientY); this.opts.onHover(p); return; }
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 1) {
      if (this.editing) { const p = this.world(e.clientX, e.clientY); if (p) { this.opts.onEdit(p.x, p.z); this.opts.onHover(p); } }
      else if (this.lastPan) { this.rig.pan(e.clientX - this.lastPan.x, e.clientY - this.lastPan.y, this.dom.clientWidth); this.lastPan = { x: e.clientX, y: e.clientY }; }
    } else if (this.pointers.size === 2) {
      const a = [...this.pointers.values()];
      const cx = (a[0].x + a[1].x) / 2, cy = (a[0].y + a[1].y) / 2, d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      if (this.lastMid) this.rig.pan(cx - this.lastMid.x, cy - this.lastMid.y, this.dom.clientWidth);
      if (this.pinch) this.rig.zoomBy(this.pinch / d, this.dom.clientWidth, this.dom.clientHeight);
      this.lastMid = { x: cx, y: cy }; this.pinch = d;
    }
  };

  private up = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) { this.pinch = 0; this.lastMid = null; }
    if (this.pointers.size === 0) { this.editing = false; this.panMode = false; this.lastPan = null; this.opts.onHover(null); }
  };

  private wheel = (e: WheelEvent) => { e.preventDefault(); this.rig.zoomBy(e.deltaY > 0 ? 1.08 : 0.92, this.dom.clientWidth, this.dom.clientHeight); };
}
