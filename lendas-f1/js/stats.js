/* ========================================================================
   LENDAS DA F1 — desempenho dos carros (gamificado, fiel ao real 2025).
   Cada equipe usa um dos 4 fornecedores de motor (como na vida real:
   cars compartilham a mesma unidade de potência) e tem seus próprios
   valores de aerodinâmica, chassi e pneus. Nomes fictícios.
   ===================================================================== */

// 4 fornecedores de motor (fictícios) — potência, eficiência, confiabilidade
export const ENGINES = {
  prataPU: {name:'Prata PU', pot:90, efi:92, conf:90},   // estilo Mercedes (eficiente)
  rossaPU: {name:'Rossa PU', pot:92, efi:85, conf:84},   // estilo Ferrari (forte, gasta mais)
  aladoPU: {name:'Alado PU', pot:89, efi:88, conf:89},   // estilo Honda/RBPT (equilibrado)
  alpesPU: {name:'Alpes PU', pot:80, efi:82, conf:80},   // estilo Renault (mais fraco)
};

// Cada carro: motor + aero/chassi/pneus (baseado na forma de 2025)
export const CARS = {
  mclaren:  {engine:'prataPU', aero:95, chassi:94, pneus:93},   // melhor carro de 2025
  redbull:  {engine:'aladoPU', aero:90, chassi:89, pneus:86},
  ferrari:  {engine:'rossaPU', aero:88, chassi:88, pneus:85},
  mercedes: {engine:'prataPU', aero:87, chassi:87, pneus:86},
  williams: {engine:'prataPU', aero:82, chassi:83, pneus:80},   // salto em 2025
  jrtouro:  {engine:'aladoPU', aero:81, chassi:82, pneus:81},   // líder do meio de grid
  aston:    {engine:'prataPU', aero:78, chassi:79, pneus:78},
  haas:     {engine:'rossaPU', aero:77, chassi:76, pneus:75},
  sauber:   {engine:'rossaPU', aero:73, chassi:74, pneus:73},
  alpine:   {engine:'alpesPU', aero:72, chassi:73, pneus:74},   // lanterna (focou em 2026)
  brasil:   {engine:'aladoPU', aero:85, chassi:85, pneus:85},   // bônus fictício
};

// stats completos de um carro (0-100) + nota geral
export function carStats(key){
  const c = CARS[key] || CARS.ferrari;
  const e = ENGINES[c.engine];
  const s = {
    potencia:e.pot, eficiencia:e.efi, aero:c.aero,
    chassi:c.chassi, pneus:c.pneus, confiabilidade:e.conf, engine:e.name,
  };
  // aero manda mais na F1; motor e chassi na sequência
  s.geral = Math.round(s.aero*0.26 + s.chassi*0.20 + s.potencia*0.18 +
                       s.pneus*0.15 + s.eficiencia*0.11 + s.confiabilidade*0.10);
  return s;
}

// classe do carro pela nota geral
export function tier(geral){
  if(geral>=90) return {txt:'PONTA', col:'#22c55e'};
  if(geral>=85) return {txt:'BRIGA PELA PONTA', col:'#84cc16'};
  if(geral>=80) return {txt:'MEIO DE GRID', col:'#eab308'};
  if(geral>=76) return {txt:'MEIO/FUNDO', col:'#f97316'};
  return {txt:'FUNDO DE GRID', col:'#ef4444'};
}

// ranking das 10 equipes reais (sem o bônus Brasil) por nota geral
export function ranking(){
  return Object.keys(CARS).filter(k=>k!=='brasil')
    .map(k=>({key:k, geral:carStats(k).geral}))
    .sort((a,b)=>b.geral-a.geral);
}
