// Campanha: 12 setores × 3 fases = 36 fases, cada setor terminando com seu
// chefe. Traz a história leve (falas antes do setor) e o plano de ondas.
import { SECTORS } from './enemiesData';

export interface CampaignPhase { name: string; waves: number; }
export interface CampaignSector {
  index: number; name: string; intro: string[]; bossId: string; phases: CampaignPhase[];
}

const P = (name: string, waves: number): CampaignPhase => ({ name, waves });

export const CAMPAIGN: CampaignSector[] = [
  { index: 0, name: SECTORS[0].name, bossId: 'ferro',
    intro: ['A anomalia fragmentou a galáxia. Você é da Starforge Armada.', 'Comece limpando o ferro-velho pirata do Cinturão de Sucata.'],
    phases: [P('Sucata à Deriva', 3), P('Ninho de Drones', 4), P('Torres Enferrujadas', 4)] },
  { index: 1, name: SECTORS[1].name, bossId: 'serpente',
    intro: ['A Nebulosa Azul crepita com plasma e visibilidade parcial.', 'Algo enorme desliza entre os relâmpagos.'],
    phases: [P('Névoa de Plasma', 4), P('Cardume Elétrico', 4), P('Correntes de Energia', 4)] },
  { index: 2, name: SECTORS[2].name, bossId: 'sentinel',
    intro: ['A Colônia Perdida foi tomada por uma IA corrompida.', 'Suas torres ainda defendem os corredores vazios.'],
    phases: [P('Corredores Silenciosos', 4), P('Protocolo Hostil', 4), P('Núcleo de Defesa', 5)] },
  { index: 3, name: SECTORS[3].name, bossId: 'broca',
    intro: ['O Mar de Asteroides esconde brocas industriais renegadas.', 'Cuidado: as rochas explodem.'],
    phases: [P('Campo de Rochas', 4), P('Frota Mineradora', 5), P('Canhões Orbitais', 5)] },
  { index: 4, name: SECTORS[4].name, bossId: 'coracao',
    intro: ['A Zona Carmesim pulsa como carne viva.', 'Os projéteis aqui têm vontade própria.'],
    phases: [P('Larvas Espaciais', 4), P('Enxame Orgânico', 5), P('Membrana Pulsante', 5)] },
  { index: 5, name: SECTORS[5].name, bossId: 'vexa',
    intro: ['Território pirata. Neon sujo e emboscadas.', 'A Capitã Vexa quer sua nave como troféu.'],
    phases: [P('Emboscada Neon', 5), P('Bombardeiros', 5), P('Duelo de Corsários', 5)] },
  { index: 6, name: SECTORS[6].name, bossId: 'cubo',
    intro: ['O Campo de Distorção quebra o espaço.', 'Gravidade instável, teleportes, e um cubo que muda de dimensão.'],
    phases: [P('Espaço Rasgado', 5), P('Caçadores de Fase', 5), P('Instabilidade', 6)] },
  { index: 7, name: SECTORS[7].name, bossId: 'helios',
    intro: ['O Sol Partido derrama fogo estelar.', 'Helios Rex reina sobre a tempestade dourada.'],
    phases: [P('Chamas Solares', 5), P('Asas de Fogo', 6), P('Coroa de Raios', 6)] },
  { index: 8, name: SECTORS[8].name, bossId: 'axiom',
    intro: ['A frota do Império Mecânico avança em formação.', 'O General Axiom comanda com escudos e mísseis.'],
    phases: [P('Formação Imperial', 5), P('Escudos e Curas', 6), P('Comando Tático', 6)] },
  { index: 9, name: SECTORS[9].name, bossId: 'devorador',
    intro: ['O Abismo Negro engole a luz.', 'Algo se move onde nada deveria existir.'],
    phases: [P('Sombras', 6), P('Espectros', 6), P('Gravidade Faminta', 6)] },
  { index: 10, name: SECTORS[10].name, bossId: 'nucleo',
    intro: ['A capital mecânica: o Trono das Máquinas.', 'O Núcleo Imperial é uma megaestrutura viva.'],
    phases: [P('Guarda de Elite', 6), P('Canhões de Trilho', 6), P('Muralha de Escudos', 7)] },
  { index: 11, name: SECTORS[11].name, bossId: 'singularidade',
    intro: ['Além da Última Estrela, a realidade se desfaz.', 'A Singularidade Viva espera no fim de tudo.'],
    phases: [P('Ecos', 6), P('Realidade Quebrada', 7), P('Beira do Nada', 7)] },
];

export const CAMPAIGN_OUTRO = [
  'A Singularidade Viva colapsa sobre si mesma.',
  'Por um instante, a galáxia respira — os fragmentos de energia estelar voltam a girar.',
  'A Starforge Armada sobrevive. E, em algum lugar, uma nova anomalia começa a sussurrar…',
];
