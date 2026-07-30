/* ========================================================================
   LENDAS DA F1 — pilotos reais (grade 2025) com habilidades estilo FIFA.
   Atributos 0-99: ritmo (classificação), corrida (ritmo de corrida),
   ultrapassagem, defesa, chuva, consistência, experiência. overall = média
   ponderada. Cada piloto na equipe correta (2 por equipe).
   Notas = avaliação com base no desempenho/reputação real (não é dado oficial).
   ===================================================================== */

// [ritmo, corrida, ultrapassagem, defesa, chuva, consistencia, experiencia]
const A = (nome, team, num, r,co,u,d,ch,cs,e) => ({nome, team, num,
  ritmo:r, corrida:co, ultrapassagem:u, defesa:d, chuva:ch, consistencia:cs, experiencia:e});

export const DRIVERS = [
  // McLaren (Papaia)
  A('Lando Norris',       'mclaren', 4,  93,91,89,88,90,87,86),
  A('Oscar Piastri',      'mclaren', 81, 91,91,89,89,87,90,82),
  // Ferrari (Rossa)
  A('Charles Leclerc',    'ferrari', 16, 95,89,88,87,88,85,88),
  A('Lewis Hamilton',     'ferrari', 44, 90,93,93,92,96,90,99),
  // Red Bull (Touro)
  A('Max Verstappen',     'redbull', 1,  97,96,95,95,97,93,93),
  A('Yuki Tsunoda',       'redbull', 22, 85,82,83,82,82,78,82),
  // Mercedes (Prata)
  A('George Russell',     'mercedes',63, 92,89,87,87,88,88,86),
  A('Kimi Antonelli',     'mercedes',12, 86,82,82,80,82,76,66),
  // Aston Martin (Albion)
  A('Fernando Alonso',    'aston',   14, 88,93,94,96,93,89,99),
  A('Lance Stroll',       'aston',   18, 80,80,78,82,83,80,88),
  // Williams (Grove)
  A('Alex Albon',         'williams',23, 86,85,82,89,84,85,85),
  A('Carlos Sainz',       'williams',55, 89,88,86,87,85,87,90),
  // Alpine (Alpes)
  A('Pierre Gasly',       'alpine',  10, 86,85,84,84,86,83,87),
  A('Franco Colapinto',   'alpine',  43, 81,79,80,78,78,74,66),
  // Racing Bulls (Touro Jr.)
  A('Isack Hadjar',       'jrtouro', 6,  83,81,80,79,80,78,70),
  A('Liam Lawson',        'jrtouro', 30, 81,79,79,79,79,76,72),
  // Haas (Falcão)
  A('Esteban Ocon',       'haas',    31, 84,83,82,84,83,82,86),
  A('Oliver Bearman',     'haas',    87, 82,80,80,79,80,76,70),
  // Sauber (Neon)
  A('Nico Hülkenberg',    'sauber',  27, 85,85,83,85,88,84,92),
  A('Gabriel Bortoleto',  'sauber',  5,  82,80,80,78,80,76,68),
];

const W = {ritmo:0.24, corrida:0.24, ultrapassagem:0.14, defesa:0.12, chuva:0.10, consistencia:0.10, experiencia:0.06};
export function overall(d){
  let s=0; for(const k in W) s+=d[k]*W[k];
  return Math.round(s);
}
export const ATTRS = [
  ['ritmo','Ritmo (classif.)'], ['corrida','Ritmo de corrida'], ['ultrapassagem','Ultrapassagem'],
  ['defesa','Defesa'], ['chuva','Pilotagem na chuva'], ['consistencia','Consistência'], ['experiencia','Experiência'],
];
export function driversOf(teamKey){ return DRIVERS.filter(d=>d.team===teamKey); }

// ruído gaussiano (Box-Muller) — o "fator sorte" de cada corrida
function gauss(sd){ let u=0,v=0; while(!u)u=Math.random(); while(!v)v=Math.random();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)*sd; }

/* Simulação de corrida REALISTA:
   desempenho = 62% carro + 38% piloto + sorte (gaussiana pequena).
   Assim o melhor pacote costuma vencer, mas raramente rola zebra.
   Pequena chance de abandono (DNF), maior com carro menos confiável.
   carStatsFn(teamKey) -> {geral, confiabilidade}. Retorna grid ordenado. */
export function simulateRace(carStatsFn, luck=3.0){
  const res = DRIVERS.map(d=>{
    const cs = carStatsFn(d.team);
    const base = cs.geral*0.62 + overall(d)*0.38;
    const pDNF = 0.02 + (100-cs.confiabilidade)/100*0.05;
    const dnf = Math.random() < pDNF;
    const perf = dnf ? -999 : base + gauss(luck) + (d.consistencia-80)*0.04;
    return {nome:d.nome, team:d.team, num:d.num, ovr:overall(d), perf, dnf};
  });
  res.sort((a,b)=>b.perf-a.perf);
  res.forEach((r,i)=> r.pos = r.dnf ? 'AB' : (i+1));
  return res;
}
