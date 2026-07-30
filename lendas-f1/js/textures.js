/* ========================================================================
   LENDAS DA F1 — carregador do atlas de texturas recortado.
   Cada tex_NN.png é uma célula do atlas (asfalto, brita, areia, grama,
   zebra, pneus, concreto, carbono, pintura, borracha, torcida, etc.).
   ===================================================================== */
import * as THREE from '../vendor/three.module.js';

const loader = new THREE.TextureLoader();
const cache = {};

/* n = número da célula (1..16); repeat = [x,y] repetições; srgb p/ cor (albedo). */
export function tex(n, {repeat=[1,1], srgb=true, aniso=8}={}){
  const key = `${n}|${repeat[0]}|${repeat[1]}|${srgb}`;
  if(cache[key]) return cache[key];
  const url = `textures/tex_${String(n).padStart(2,'0')}.png`;
  const t = loader.load(url);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  if(srgb) t.colorSpace = THREE.SRGBColorSpace;
  cache[key] = t;
  return t;
}

export const TEX = {
  asphalt:1, gravel:2, sand:3, grass:4, kerb:5, tyreWall:6, concrete:7,
  carbon:8, paint:9, tread:10, rubberLine:11, slab:12, banner:13,
  crowd:14, trees:15, guardrail:16,
};
