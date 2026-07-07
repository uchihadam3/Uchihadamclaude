import type { DungeonDef } from '../types';

// ============ AS 10 DUNGEONS ============
// multiplier escala vida/dano dos inimigos; rooms = encontros comuns
// (os subchefes entram a ~33% e ~66% do caminho, o chefe no final).

export const DUNGEONS: DungeonDef[] = [
  {
    id: 1, nome: 'Catacumbas Verdes',
    tema: 'Criptas úmidas tomadas pelo musgo, onde os mortos recentes ainda não aprenderam a descansar.',
    descricao: 'A porta de entrada de todo herói. Corredores baixos, tochas verdes e um cheiro de terra molhada que nunca vai embora.',
    mecanica: 'Dungeon de aprendizado: inimigos lentos e previsíveis, mas as gosmas se dividem e o Abade cura os aliados.',
    multiplier: 1.0, rooms: 9,
    enemies: ['rato-tumular', 'gosma-de-mofo', 'esqueleto-musgoso', 'morcego-cripta', 'coveiro-podre'],
    elites: ['esqueleto-musgoso', 'coveiro-podre'],
    subboss1: 'guardiao-do-mofo', subboss2: 'abade-sem-rosto', boss: 'ossario-ambulante',
    ambient: {
      skyTop: '#0e1410', skyBottom: '#1a2a1e', far: '#16241a', mid: '#1e3224', near: '#28422e',
      floor: '#232e24', floorDark: '#161e18', glow: '#68c878', particles: 'spores', fog: 'rgba(90,140,100,0.10)',
    },
  },
  {
    id: 2, nome: 'Mina dos Ecos',
    tema: 'Galerias fundas onde cada som volta multiplicado e a pedra às vezes anda.',
    descricao: 'Os kobolds cavaram fundo demais e acordaram o que dormia na rocha. Agora defendem a mina como se ainda fosse deles.',
    mecanica: 'Golens resistem a dano físico e o Coração de Pedra blinda os aliados: dano mágico e paciência abrem caminho.',
    multiplier: 1.35, rooms: 9,
    enemies: ['kobold-picareta', 'kobold-fundeiro', 'aranha-cristal', 'golem-cascalho', 'verme-eco'],
    elites: ['golem-cascalho', 'kobold-fundeiro'],
    subboss1: 'capataz-brekk', subboss2: 'coracao-de-pedra', boss: 'wyrm-do-abismo-raso',
    ambient: {
      skyTop: '#0c0e14', skyBottom: '#1a1c26', far: '#181a26', mid: '#242634', near: '#323446',
      floor: '#2a2832', floorDark: '#1a1820', glow: '#88b8e8', particles: 'dust', fog: 'rgba(100,110,140,0.08)',
    },
  },
  {
    id: 3, nome: 'Bosque Envenenado',
    tema: 'Uma floresta que decidiu revidar: seiva negra, esporos no ar e flores que olham de volta.',
    descricao: 'Antes era o jardim de um druida. O que restou dele ainda rega as plantas — com o que sobra dos visitantes.',
    mecanica: 'Névoa venenosa corrói vida lentamente durante toda a dungeon; curas e antídotos valem ouro aqui.',
    multiplier: 1.75, rooms: 10,
    enemies: ['vespa-agulha', 'trepadeira-faminta', 'aranha-esporo', 'sapo-bilioso', 'druida-corrompido'],
    elites: ['trepadeira-faminta', 'druida-corrompido'],
    subboss1: 'mae-das-vespas', subboss2: 'carvalho-gangrenado', boss: 'rainha-clorofila',
    ambient: {
      skyTop: '#101608', skyBottom: '#222e10', far: '#1c2a12', mid: '#2a3c1a', near: '#3a5024',
      floor: '#2e3a1c', floorDark: '#1c2410', glow: '#b8e858', particles: 'leaves', fog: 'rgba(150,190,80,0.12)',
    },
    hazard: { kind: 'poison-mist', power: 1, desc: 'Névoa venenosa: o herói perde vida lentamente enquanto luta.' },
  },
  {
    id: 4, nome: 'Fortaleza Queimada',
    tema: 'Muralhas negras de fuligem onde o incêndio nunca terminou de acontecer.',
    descricao: 'A fortaleza caiu em uma noite. Os demônios que a tomaram gostaram tanto do fogo que decidiram morar nele.',
    mecanica: 'Chuva de brasas castiga quem demora; quase tudo aqui resiste a fogo e queima ao tocar.',
    multiplier: 2.25, rooms: 10,
    enemies: ['diabrete-brasa', 'lanceiro-cinzas', 'piromante-renegado', 'cao-do-forno', 'armadura-vulcanica'],
    elites: ['armadura-vulcanica', 'piromante-renegado'],
    subboss1: 'general-fornalha', subboss2: 'arauto-de-fuligem', boss: 'senhor-da-pira',
    ambient: {
      skyTop: '#160a08', skyBottom: '#301410', far: '#28120e', mid: '#3a1c14', near: '#50281a',
      floor: '#32201a', floorDark: '#1e120e', glow: '#ff9838', particles: 'embers', fog: 'rgba(200,100,40,0.10)',
    },
    hazard: { kind: 'ember-rain', power: 1, desc: 'Chuva de brasas: rajadas periódicas de dano de fogo em área.' },
  },
  {
    id: 5, nome: 'Cripta dos Gêmeos',
    tema: 'Um mausoléu espelhado construído para dois irmãos que se recusaram a ser enterrados separados.',
    descricao: 'Tudo aqui vem em pares: as velas, os guardas, as portas. E no fundo da cripta, os dois que ainda esperam visitas.',
    mecanica: 'Espectros resistem a dano físico e os Gêmeos alternam formas: builds de um truque só sofrem aqui.',
    multiplier: 2.9, rooms: 10,
    enemies: ['vela-viva', 'carpideira-espectral', 'guarda-espelhado', 'gemea-de-cera', 'lamento-acorrentado'],
    elites: ['guarda-espelhado', 'lamento-acorrentado'],
    subboss1: 'irmao-solene', subboss2: 'irma-sussurrante', boss: 'gemeos-do-ocaso',
    ambient: {
      skyTop: '#0e0c18', skyBottom: '#1e1a30', far: '#1a1628', mid: '#262038', near: '#342c4c',
      floor: '#2a2438', floorDark: '#181422', glow: '#b8a8e8', particles: 'ghosts', fog: 'rgba(140,130,190,0.10)',
    },
  },
  {
    id: 6, nome: 'Pântano do Rei Morto',
    tema: 'Um reino inteiro afundado na lama, governado por uma coroa que ninguém teve coragem de tirar.',
    descricao: 'O rei afogou o próprio reino para não entregá-lo. A corte concordou — ou pelo menos ninguém reclamou até hoje.',
    mecanica: 'A água do pântano regenera os mortos: inimigos curam-se fora de combate e o Porteiro nunca para de regenerar.',
    multiplier: 3.7, rooms: 11,
    enemies: ['afogado-inquieto', 'sanguessuga-real', 'bruxa-do-lodo', 'jacare-ossudo', 'mosquito-febre'],
    elites: ['jacare-ossudo', 'bruxa-do-lodo'],
    subboss1: 'porteiro-afundado', subboss2: 'corte-apodrecida', boss: 'rei-morto',
    ambient: {
      skyTop: '#0c1210', skyBottom: '#1c2a22', far: '#16241e', mid: '#20342a', near: '#2c4638',
      floor: '#26332a', floorDark: '#141e18', glow: '#88c8a8', particles: 'bubbles', fog: 'rgba(90,150,120,0.14)',
    },
    hazard: { kind: 'swamp-regen', power: 1, desc: 'Águas do pântano: inimigos regeneram vida durante o combate.' },
  },
  {
    id: 7, nome: 'Torre de Vidro',
    tema: 'Uma torre arcana transparente onde a luz é arma, parede e carcereira.',
    descricao: 'O Arquiteto construiu a torre para guardar um segredo. Depois esqueceu o segredo e continuou construindo.',
    mecanica: 'Constructos refletem feitiços e resistem a magia: dano físico brilha aqui, magos precisam de criatividade.',
    multiplier: 4.7, rooms: 11,
    enemies: ['sentinela-lente', 'caco-animado', 'golem-prisma', 'arquivista-de-eter', 'elemental-raio'],
    elites: ['golem-prisma', 'elemental-raio'],
    subboss1: 'custodio-fractal', subboss2: 'oraculo-cego', boss: 'arquiteto-do-vidro',
    ambient: {
      skyTop: '#0c1018', skyBottom: '#1c2432', far: '#1a2230', mid: '#283446', near: '#38485e',
      floor: '#2e3846', floorDark: '#1c2230', glow: '#b8e8ff', particles: 'shards', fog: 'rgba(150,190,230,0.08)',
    },
  },
  {
    id: 8, nome: 'Arena dos Ossos',
    tema: 'Um coliseu de mármore amarelado onde a plateia morreu aplaudindo e nunca parou.',
    descricao: 'Aqui ninguém luta por ouro: luta porque a plateia exige. E a plateia tem opiniões muito fortes sobre covardia.',
    mecanica: 'Tempestade de ossos periódica e ondas de gladiadores: dungeon de resistência pura, sem lugar para se esconder.',
    multiplier: 6.0, rooms: 11,
    enemies: ['gladiador-quebrado', 'lanceiro-da-plateia', 'campeao-decapitado', 'cao-de-arena', 'arauto-dos-ossos'],
    elites: ['campeao-decapitado', 'arauto-dos-ossos'],
    subboss1: 'besta-do-portao', subboss2: 'mestre-de-cerimonias', boss: 'campeao-eterno',
    ambient: {
      skyTop: '#14100a', skyBottom: '#2a2214', far: '#241e12', mid: '#342c1c', near: '#484028',
      floor: '#3a3222', floorDark: '#221e14', glow: '#e8d088', particles: 'bones', fog: 'rgba(190,170,110,0.08)',
    },
    hazard: { kind: 'bone-storm', power: 1, desc: 'Tempestade de ossos: estilhaços periódicos vindos da plateia.' },
  },
  {
    id: 9, nome: 'Abismo Astral',
    tema: 'O lado de fora do mundo: estrelas mortas, gravidade opcional e coisas que olham de volta.',
    descricao: 'Não é uma dungeon, é um buraco na realidade que aprendeu a se defender. Os mapas terminam duas salas antes daqui.',
    mecanica: 'Pulsos do vazio drenam vida e os horrores resistem a sombra e magia: o teste final antes do Coração.',
    multiplier: 7.6, rooms: 12,
    enemies: ['larva-estelar', 'olho-errante', 'devorador-de-luz', 'cantor-do-vazio', 'fragmento-de-cometa'],
    elites: ['devorador-de-luz', 'cantor-do-vazio'],
    subboss1: 'ancora-do-nada', subboss2: 'profeta-estilhacado', boss: 'boca-do-abismo',
    ambient: {
      skyTop: '#080614', skyBottom: '#161230', far: '#120e26', mid: '#1e1838', near: '#2c224e',
      floor: '#221c38', floorDark: '#120e20', glow: '#a878ff', particles: 'stars', fog: 'rgba(120,90,200,0.10)',
    },
    hazard: { kind: 'void-pulse', power: 1, desc: 'Pulso do vazio: ondas periódicas que drenam a vida do herói.' },
  },
  {
    id: 10, nome: 'Coração da Dungeon',
    tema: 'O núcleo vivo que sonhou todas as outras dungeons — e agora sonha com você.',
    descricao: 'Cada corredor é uma memória das dungeons anteriores, costurada errada de propósito. No centro, algo bate. Sempre bateu.',
    mecanica: 'O exame final: ecos de tudo que veio antes, as duas Mãos guardando o núcleo e um chefe que muda as regras três vezes.',
    multiplier: 9.5, rooms: 12,
    enemies: ['eco-de-heroi', 'massa-instavel', 'colecionador', 'quimera-nucleo', 'aparador-de-fios'],
    elites: ['quimera-nucleo', 'aparador-de-fios'],
    subboss1: 'mao-esquerda', subboss2: 'mao-direita', boss: 'coracao-da-dungeon',
    ambient: {
      skyTop: '#10081a', skyBottom: '#241234', far: '#1e0e2c', mid: '#2e1640', near: '#402058',
      floor: '#301a42', floorDark: '#1c0e28', glow: '#f8c838', particles: 'pulse', fog: 'rgba(180,110,220,0.10)',
    },
  },
];

export const DUNGEON_BY_ID: Record<number, DungeonDef> = {};
for (const d of DUNGEONS) DUNGEON_BY_ID[d.id] = d;

// custo em essência para desbloquear cada dungeon (por herói); D1 é grátis
export const DUNGEON_UNLOCK_COSTS: Record<number, number> = {
  1: 0, 2: 250, 3: 600, 4: 1100, 5: 1800, 6: 2700, 7: 3900, 8: 5400, 9: 7200, 10: 9500,
};

// recompensa de essência: fator multiplicado sobre o bounty base dos inimigos
export const DUNGEON_REWARD_FACTOR: Record<number, number> = {
  1: 1.0, 2: 1.3, 3: 1.65, 4: 2.05, 5: 2.5, 6: 3.0, 7: 3.6, 8: 4.3, 9: 5.1, 10: 6.0,
};

// bônus de primeira vitória (por herói, por dungeon)
export const FIRST_CLEAR_BONUS: Record<number, number> = {
  1: 120, 2: 200, 3: 320, 4: 480, 5: 680, 6: 920, 7: 1200, 8: 1550, 9: 1950, 10: 2500,
};
