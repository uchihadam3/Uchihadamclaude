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
  // McLaren (Papaia) — a dupla título de 2025
  A('Lando Norris',       'mclaren', 4,  94,92,89,88,90,88,87),
  A('Oscar Piastri',      'mclaren', 81, 92,91,89,89,87,91,83),
  // Ferrari (Rossa) — Leclerc rei da classificação; Hamilton forte em corrida/chuva
  A('Charles Leclerc',    'ferrari', 16, 95,90,88,87,88,86,89),
  A('Lewis Hamilton',     'ferrari', 44, 88,91,92,91,96,88,99),
  // Red Bull (Touro) — Verstappen o mais completo; Tsunoda sofrendo no 2º carro
  A('Max Verstappen',     'redbull', 1,  97,96,95,95,97,93,94),
  A('Yuki Tsunoda',       'redbull', 22, 84,80,82,82,82,77,83),
  // Mercedes (Prata) — Russell consistente; Antonelli rookie talentoso
  A('George Russell',     'mercedes',63, 92,90,87,88,88,89,87),
  A('Kimi Antonelli',     'mercedes',12, 86,83,82,80,83,75,67),
  // Aston Martin (Albion) — Alonso mestre em corrida/defesa
  A('Fernando Alonso',    'aston',   14, 87,92,93,96,93,89,99),
  A('Lance Stroll',       'aston',   18, 79,79,77,81,83,79,89),
  // Williams (Grove) — dupla forte do meio de grid
  A('Alex Albon',         'williams',23, 86,85,83,88,84,86,86),
  A('Carlos Sainz',       'williams',55, 88,88,86,87,85,87,91),
  // Alpine (Alpes)
  A('Pierre Gasly',       'alpine',  10, 86,84,84,84,86,84,88),
  A('Franco Colapinto',   'alpine',  43, 80,78,79,78,78,74,67),
  // Racing Bulls (Touro Jr.) — Hadjar rookie destaque de 2025
  A('Isack Hadjar',       'jrtouro', 6,  85,82,81,80,81,80,71),
  A('Liam Lawson',        'jrtouro', 30, 81,79,79,80,79,77,73),
  // Haas (Falcão)
  A('Esteban Ocon',       'haas',    31, 84,83,82,85,83,83,87),
  A('Oliver Bearman',     'haas',    87, 83,81,81,79,80,77,71),
  // Sauber (Neon) — Hülkenberg com pódio em 2025; Bortoleto rookie brasileiro em ascensão
  A('Nico Hülkenberg',    'sauber',  27, 85,86,83,85,88,85,93),
  A('Gabriel Bortoleto',  'sauber',  5,  83,81,80,78,80,77,69),
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
// seasonForm (opcional): {nome: bônus} — "fase" do carro/piloto na temporada (evolução, embalo).
export function simulateRace(carStatsFn, luck=6.0, seasonForm=null){
  const res = DRIVERS.map(d=>{
    const cs = carStatsFn(d.team);
    const raw = cs.geral*0.60 + overall(d)*0.40;
    const base = 85 + (raw-85)*0.62;                     // comprime a vantagem: todos mais perto
    const pDNF = 0.03 + (100-cs.confiabilidade)/100*0.06;
    const dnf = Math.random() < pDNF;
    const sf = seasonForm ? (seasonForm[d.nome]||0) : 0;
    const perf = dnf ? -999 : base + sf + gauss(luck) + (d.consistencia-80)*0.03;
    return {nome:d.nome, team:d.team, num:d.num, ovr:overall(d), perf, dnf};
  });
  res.sort((a,b)=>b.perf-a.perf);
  res.forEach((r,i)=> r.pos = r.dnf ? 'AB' : (i+1));
  return res;
}
// "fase" aleatória de cada piloto/carro para uma temporada (sd = amplitude do swing)
export function seasonForm(sd=4.5){
  const f={}; for(const d of DRIVERS) f[d.nome]=gauss(sd); return f;
}
