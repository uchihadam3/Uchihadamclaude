/* DADOS — tipo + material (passiva) + faces customizáveis (§5.1) */
import { numFaces, face } from './faces.js';

export const MATERIAIS = {
  osso:     { id:'osso',     nome:'Osso',        cor:0xe8e0cc, rough:0.72, metal:0.0, desc:'Sem passiva. Confiável.' },
  obsidiana:{ id:'obsidiana',nome:'Obsidiana',   cor:0x14121a, rough:0.12, metal:0.25,desc:'Faces ⚔ Lâmina dão +1 dano extra.' },
  ambar:    { id:'ambar',    nome:'Âmbar',       cor:0xd98c1f, rough:0.28, metal:0.0, desc:'Ao rolar ✦ Essência, ganha +1 Essência.', sss:true },
  metal:    { id:'metal',    nome:'Metal',       cor:0x9aa3ad, rough:0.34, metal:0.9, desc:'Faces 🛡 Escudo dão +2 de bloqueio.' },
  amaldicoado:{id:'amaldicoado',nome:'Cristal Amaldiçoado',cor:0x7a3fb5,rough:0.18,metal:0.1,desc:'+1 em todas as faces, mas 1 face vira ☠ Vazio.',emissive:0x4a1d7a},
};

export const TIPOS = { d4:4, d6:6, d8:8, d10:10, d12:12 };

let _uid = 0;
export function makeDie(tipo='d6', material='osso', faces=null){
  const n = TIPOS[tipo];
  return { id:'D'+(++_uid), tipo, n, material, faces: faces || numFaces(n) };
}
export function resetDieIds(){ _uid = 0; }
/* grava (forja) uma face — espinha dorsal da build (§5.3) */
export function gravar(die, idx, novaFace){ const d = cloneDie(die); d.faces[idx] = novaFace; return d; }
export function cloneDie(d){ return { ...d, faces: d.faces.map(f=>({...f})) }; }
/* sobe o dado de tipo (mais alcance, mais variância) */
export function upgradeTipo(die){
  const ordem = ['d4','d6','d8','d10','d12'];
  const i = ordem.indexOf(die.tipo);
  if(i<0 || i===ordem.length-1) return cloneDie(die);
  const novo = ordem[i+1], n = TIPOS[novo];
  const d = cloneDie(die); d.tipo=novo; d.n=n;
  while(d.faces.length<n) d.faces.push(face('num', d.faces.length+1));
  return d;
}
