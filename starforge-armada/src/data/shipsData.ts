// Banco das 30 naves de Starforge Armada. Cada nave tem design visual único
// (casco, asas, motores, cockpit, paleta), stats, habilidade ativa, ultimate,
// passiva e condição de desbloqueio.
import type { ShipDesign, Palette } from '../render/shipGen';

export const PALETTES: Record<string, Palette> = {
  steel: { base: '#5b6b92', light: '#aebbe0', dark: '#2b3350', accent: '#7ff0ff', accent2: '#2a6cff' },
  violet: { base: '#6a4a8a', light: '#c9a8f0', dark: '#33224a', accent: '#c07aff', accent2: '#7a30d8' },
  iron: { base: '#6a6f78', light: '#c2cad6', dark: '#33383f', accent: '#9fd6ff', accent2: '#3a6a9a' },
  jade: { base: '#3f7a63', light: '#9fe6c0', dark: '#1e3a30', accent: '#5affc0', accent2: '#1e9a70' },
  ember: { base: '#a85a34', light: '#ffc890', dark: '#5a2c18', accent: '#ffb454', accent2: '#ff6a20' },
  crimson: { base: '#8a3a4a', light: '#ff9fb0', dark: '#451820', accent: '#ff5a7a', accent2: '#c02040' },
  gold: { base: '#9a7a30', light: '#ffe6a0', dark: '#4a3a14', accent: '#ffd24a', accent2: '#ff9a20' },
  toxic: { base: '#6a8a30', light: '#d0ff8a', dark: '#33441a', accent: '#aaff40', accent2: '#6ac020' },
  azure: { base: '#3a6a9a', light: '#a0d8ff', dark: '#1a3350', accent: '#5ad0ff', accent2: '#2a90ff' },
  rose: { base: '#8a4a7a', light: '#ffb0e6', dark: '#451840', accent: '#ff7ad8', accent2: '#c040a0' },
  ice: { base: '#5a7a9a', light: '#d0f0ff', dark: '#2a3a4a', accent: '#aef0ff', accent2: '#6ab8e8' },
  shadow: { base: '#3a3a4a', light: '#8a8aa8', dark: '#18181f', accent: '#a060ff', accent2: '#5020a0' },
  solar: { base: '#b88030', light: '#ffe0a0', dark: '#5a3a10', accent: '#ffd050', accent2: '#ff8020' },
  void: { base: '#40308a', light: '#b0a0ff', dark: '#1a1040', accent: '#c090ff', accent2: '#6030d8' },
};

export interface ShipStats { hp: number; shield: number; speed: number; power: number; handling: number; }
export interface Skill { name: string; desc: string; }
export interface ShipDef {
  id: string; name: string; klass: string; design: ShipDesign; stats: ShipStats;
  primary: string; ability: Skill; ultimate: Skill; passive: Skill;
  unlock: string; starter: boolean; mastery: number; // dificuldade de uso 1-5
  bio: string;
}

const D = (hull: any, wings: any, engines: 1 | 2 | 3, cockpit: any, pal: string, detail = 1): ShipDesign =>
  ({ hull, wings, engines, cockpit, palette: PALETTES[pal], detail });

export const SHIPS: ShipDef[] = [
  { id: 'falcon', name: 'Falcon-01', klass: 'Equilibrada', design: D('arrow', 'swept', 2, 'single', 'steel'),
    stats: { hp: 100, shield: 60, speed: 62, power: 55, handling: 60 }, primary: 'Disparo reto duplo',
    ability: { name: 'Míssil teleguiado', desc: 'Lança mísseis que perseguem o inimigo mais próximo.' },
    ultimate: { name: 'Barragem Falcon', desc: 'Leque frontal de mísseis e lasers.' },
    passive: { name: 'Precisão fria', desc: 'Ganha dano leve enquanto não toma dano.' },
    unlock: 'Disponível desde o início.', starter: true, mastery: 1, bio: 'A nave militar padrão da Starforge Armada — boa para aprender tudo.' },

  { id: 'vesper', name: 'Vesper', klass: 'Velocidade & Evasão', design: D('blade', 'long', 2, 'visor', 'violet'),
    stats: { hp: 70, shield: 40, speed: 92, power: 45, handling: 95 }, primary: 'Rajadas finas rápidas',
    ability: { name: 'Dash de lâmina', desc: 'Investida curta com invulnerabilidade.' },
    ultimate: { name: 'Lâminas orbitais', desc: 'Lâminas de energia giram ao redor da nave.' },
    passive: { name: 'Roçar a morte', desc: 'Desviar perto de projéteis carrega a ultimate mais rápido.' },
    unlock: 'Disponível desde o início.', starter: true, mastery: 3, bio: 'Frágil, veloz e cirúrgica. Recompensa quem arrisca.' },

  { id: 'bulwark', name: 'Bulwark', klass: 'Tanque', design: D('heavy', 'stub', 3, 'wide', 'iron'),
    stats: { hp: 160, shield: 100, speed: 40, power: 60, handling: 35 }, primary: 'Canhão lento e forte',
    ability: { name: 'Escudo frontal', desc: 'Barreira que bloqueia projéteis à frente.' },
    ultimate: { name: 'Onda de choque', desc: 'Limpa projéteis e empurra inimigos.' },
    passive: { name: 'Blindagem', desc: 'Reduz dano recebido, mas move mais devagar.' },
    unlock: 'Disponível desde o início.', starter: true, mastery: 2, bio: 'Segura, poderosa e lenta. Um bunker voador.' },

  { id: 'lotus', name: 'Lotus', klass: 'Drones & Controle', design: D('organic', 'split', 2, 'eye', 'jade'),
    stats: { hp: 90, shield: 55, speed: 58, power: 50, handling: 62 }, primary: 'Laser leve',
    ability: { name: 'Drone de ataque', desc: 'Invoca um drone que dispara sozinho.' },
    ultimate: { name: 'Enxame de drones', desc: 'Convoca um enxame que orbita e ataca.' },
    passive: { name: 'Autonomia', desc: 'Drones seguem atacando enquanto você desvia.' },
    unlock: 'Disponível desde o início.', starter: true, mastery: 3, bio: 'Elegante e estratégica: deixa os drones trabalharem por você.' },

  { id: 'comet', name: 'Comet', klass: 'Velocidade & Rastro', design: D('arrow', 'swept', 3, 'single', 'ember'),
    stats: { hp: 85, shield: 45, speed: 88, power: 58, handling: 80 }, primary: 'Projéteis curtos e rápidos',
    ability: { name: 'Avanço flamejante', desc: 'Avança deixando um rastro de fogo que causa dano.' },
    ultimate: { name: 'Tempestade de cometas', desc: 'Cometas cruzam a tela em chamas.' },
    passive: { name: 'Impulso', desc: 'Quanto mais se move, mais dano acumula.' },
    unlock: 'Disponível desde o início.', starter: true, mastery: 2, bio: 'Agressiva e chamativa, com um motor enorme e rastro de fogo.' },

  { id: 'raven', name: 'Raven', klass: 'Crítico & Perfuração', design: D('delta', 'x', 2, 'visor', 'crimson'),
    stats: { hp: 80, shield: 45, speed: 74, power: 72, handling: 66 }, primary: 'Tiros perfurantes',
    ability: { name: 'Marca de corvo', desc: 'Marca um alvo para receber dano crítico extra.' },
    ultimate: { name: 'Voo carmesim', desc: 'Rajada perfurante que atravessa tudo em linha.' },
    passive: { name: 'Instinto', desc: 'Chance de acerto crítico aumenta com o combo.' },
    unlock: 'Vença a Capitã Vexa ou colete fragmentos piratas.', starter: false, mastery: 3, bio: 'Nave corsária ágil, feita para caçar alvos valiosos.' },

  { id: 'orion', name: 'Orion', klass: 'Laser Contínuo', design: D('arrow', 'long', 1, 'single', 'gold'),
    stats: { hp: 95, shield: 55, speed: 56, power: 68, handling: 52 }, primary: 'Laser que aquece',
    ability: { name: 'Foco térmico', desc: 'Superaquece o laser: mais dano ao manter o fogo.' },
    ultimate: { name: 'Feixe solar', desc: 'Um feixe gigante varre a tela.' },
    passive: { name: 'Aquecimento', desc: 'O dano cresce enquanto o laser fica ligado.' },
    unlock: 'Vença o Setor 2 — Nebulosa Azul.', starter: false, mastery: 2, bio: 'Uma plataforma de feixe contínuo que derrete blindagem.' },

  { id: 'hydra', name: 'Hydra', klass: 'Tiro Multidirecional', design: D('organic', 'split', 3, 'wide', 'toxic'),
    stats: { hp: 105, shield: 50, speed: 54, power: 64, handling: 50 }, primary: 'Tiros em várias direções',
    ability: { name: 'Cabeças múltiplas', desc: 'Adiciona bocas de fogo temporárias.' },
    ultimate: { name: 'Dilúvio', desc: 'Dispara em todas as direções ao redor.' },
    passive: { name: 'Regeneração', desc: 'Recupera casco lentamente fora de perigo.' },
    unlock: 'Derrote 3.000 inimigos.', starter: false, mastery: 3, bio: 'Cobre a tela de tiros — controle de área puro.' },

  { id: 'mirage', name: 'Mirage', klass: 'Cópias Ilusórias', design: D('diamond', 'forward', 2, 'eye', 'rose'),
    stats: { hp: 78, shield: 50, speed: 82, power: 54, handling: 88 }, primary: 'Tiros gêmeos',
    ability: { name: 'Miragem', desc: 'Cria clones ilusórios que confundem e disparam.' },
    ultimate: { name: 'Legião', desc: 'Um exército de cópias ataca em uníssono.' },
    passive: { name: 'Reflexo', desc: 'Chance de o clone absorver um hit no seu lugar.' },
    unlock: 'Vença a Arena dos Rivais 5 vezes.', starter: false, mastery: 4, bio: 'Nunca se sabe qual é a real. Ilusão como arma.' },

  { id: 'basilisk', name: 'Basilisk', klass: 'Ácido & Dano Contínuo', design: D('organic', 'swept', 2, 'visor', 'toxic'),
    stats: { hp: 96, shield: 48, speed: 60, power: 62, handling: 58 }, primary: 'Cuspe ácido',
    ability: { name: 'Corrosão', desc: 'Cobre o alvo de ácido: dano ao longo do tempo.' },
    ultimate: { name: 'Maré tóxica', desc: 'Uma onda ácida corrói tudo à frente.' },
    passive: { name: 'Veneno persistente', desc: 'Inimigos atingidos continuam perdendo vida.' },
    unlock: 'Cause 50.000 de dano contínuo acumulado.', starter: false, mastery: 3, bio: 'Paciente e mortal: o dano se acumula até desfazer o alvo.' },

  { id: 'aegis', name: 'Aegis', klass: 'Escudos & Contra-ataque', design: D('heavy', 'ring', 2, 'wide', 'azure'),
    stats: { hp: 120, shield: 130, speed: 46, power: 52, handling: 44 }, primary: 'Pulso defensivo',
    ability: { name: 'Contra-barreira', desc: 'Bloqueia e devolve os projéteis como dano.' },
    ultimate: { name: 'Égide', desc: 'Escudo total que reflete tudo por um instante.' },
    passive: { name: 'Retaliação', desc: 'Bloquear projéteis carrega um contra-ataque.' },
    unlock: 'Bloqueie 1.000 projéteis.', starter: false, mastery: 3, bio: 'A melhor defesa é devolver o ataque.' },

  { id: 'tempest', name: 'Tempest', klass: 'Eletricidade em Corrente', design: D('delta', 'forward', 2, 'visor', 'azure'),
    stats: { hp: 88, shield: 55, speed: 70, power: 66, handling: 68 }, primary: 'Arco elétrico',
    ability: { name: 'Corrente', desc: 'O raio salta entre vários inimigos.' },
    ultimate: { name: 'Tempestade', desc: 'Relâmpagos varrem toda a tela.' },
    passive: { name: 'Condutância', desc: 'Inimigos próximos recebem respingo elétrico.' },
    unlock: 'Vença o Setor 7 — Campo de Distorção.', starter: false, mastery: 2, bio: 'Um só tiro acerta a horda inteira em cadeia.' },

  { id: 'warden', name: 'Warden', klass: 'Minas & Armadilhas', design: D('hauler', 'stub', 3, 'wide', 'iron'),
    stats: { hp: 130, shield: 70, speed: 48, power: 58, handling: 42 }, primary: 'Canhão de dispersão',
    ability: { name: 'Semear minas', desc: 'Espalha minas que explodem por proximidade.' },
    ultimate: { name: 'Campo minado', desc: 'Cobre a área com minas de alto dano.' },
    passive: { name: 'Sentinela', desc: 'Minas antigas continuam ativas por mais tempo.' },
    unlock: 'Vença o Campo de Asteroides com medalha Ouro.', starter: false, mastery: 3, bio: 'Controla o espaço: onde ela passa, vira zona de perigo.' },

  { id: 'phantom', name: 'Phantom', klass: 'Invisibilidade & Burst', design: D('blade', 'x', 2, 'visor', 'shadow'),
    stats: { hp: 74, shield: 42, speed: 90, power: 78, handling: 90 }, primary: 'Adaga de plasma',
    ability: { name: 'Manto', desc: 'Fica invisível e prepara um golpe pesado.' },
    ultimate: { name: 'Execução', desc: 'Surge do nada com uma rajada devastadora.' },
    passive: { name: 'Emboscada', desc: 'O primeiro tiro ao sair da invisibilidade é crítico.' },
    unlock: 'Derrote A Nave Sem Nome.', starter: false, mastery: 4, bio: 'Ataca das sombras e some antes da resposta.' },

  { id: 'nova', name: 'Nova', klass: 'Explosões Grandes', design: D('star', 'none', 3, 'eye', 'ember'),
    stats: { hp: 100, shield: 55, speed: 58, power: 76, handling: 50 }, primary: 'Granadas de plasma',
    ability: { name: 'Detonar', desc: 'Explosão em área que atinge vários inimigos.' },
    ultimate: { name: 'Supernova', desc: 'Uma explosão colossal limpa a tela.' },
    passive: { name: 'Cadeia', desc: 'Inimigos mortos por explosão explodem também.' },
    unlock: 'Mate 500 inimigos com explosões.', starter: false, mastery: 2, bio: 'Se gosta de fogos de artifício, é a sua nave.' },

  { id: 'needle', name: 'Needle', klass: 'Precisão de Alvo Único', design: D('blade', 'stub', 1, 'visor', 'steel'),
    stats: { hp: 82, shield: 45, speed: 72, power: 88, handling: 74 }, primary: 'Dardo perfurante',
    ability: { name: 'Mira travada', desc: 'Trava um alvo e concentra dano imenso.' },
    ultimate: { name: 'Estilhaço', desc: 'Um único tiro brutal que atravessa fileiras.' },
    passive: { name: 'Foco', desc: 'Mais dano contra um só alvo, menos contra grupos.' },
    unlock: 'Vença o Modo Precisão com medalha Ouro.', starter: false, mastery: 3, bio: 'Um bisturi: dano cirúrgico num alvo por vez.' },

  { id: 'mantis', name: 'Mantis', klass: 'Combate Próximo', design: D('delta', 'forward', 2, 'eye', 'jade'),
    stats: { hp: 92, shield: 48, speed: 84, power: 70, handling: 86 }, primary: 'Foices de energia',
    ability: { name: 'Corte lateral', desc: 'Golpes largos que dilaceram quem se aproxima.' },
    ultimate: { name: 'Frenesi', desc: 'Rodopio de lâminas em curto alcance.' },
    passive: { name: 'Predador', desc: 'Mais dano a inimigos colados na nave.' },
    unlock: 'Destrua 200 inimigos a curta distância.', starter: false, mastery: 4, bio: 'Perigosa de perto — abraça o risco do combate próximo.' },

  { id: 'solaris', name: 'Solaris', klass: 'Energia Solar', design: D('star', 'swept', 3, 'single', 'solar'),
    stats: { hp: 104, shield: 60, speed: 60, power: 74, handling: 54 }, primary: 'Raios solares',
    ability: { name: 'Carga solar', desc: 'Acumula luz para um disparo carregado.' },
    ultimate: { name: 'Aurora', desc: 'Uma coroa de raios dourados irradia da nave.' },
    passive: { name: 'Fotossíntese', desc: 'Recarrega energia mais rápido sob fogo intenso.' },
    unlock: 'Vença o Setor 8 — Sol Partido.', starter: false, mastery: 3, bio: 'Domina a luz de uma estrela partida.' },

  { id: 'umbra', name: 'Umbra', klass: 'Energia Sombria', design: D('diamond', 'x', 2, 'eye', 'shadow'),
    stats: { hp: 66, shield: 40, speed: 80, power: 84, handling: 82 }, primary: 'Fendas sombrias',
    ability: { name: 'Pacto', desc: 'Troca vida por um surto de dano imenso.' },
    ultimate: { name: 'Eclipse pessoal', desc: 'Consome a própria luz numa explosão sombria.' },
    passive: { name: 'Desespero', desc: 'Quanto menor a vida, maior o dano.' },
    unlock: 'Vença uma fase com menos de 10% de vida.', starter: false, mastery: 5, bio: 'Vive à beira do abismo — poder ao custo de tudo.' },

  { id: 'glacier', name: 'Glacier', klass: 'Congelamento', design: D('heavy', 'long', 2, 'wide', 'ice'),
    stats: { hp: 118, shield: 75, speed: 50, power: 56, handling: 46 }, primary: 'Estilhaços de gelo',
    ability: { name: 'Nevasca', desc: 'Congela projéteis e desacelera inimigos.' },
    ultimate: { name: 'Era glacial', desc: 'Congela a tela inteira por um instante.' },
    passive: { name: 'Frio penetrante', desc: 'Inimigos atingidos ficam mais lentos.' },
    unlock: 'Complete o desafio semanal de controle.', starter: false, mastery: 3, bio: 'Controla o ritmo do caos deixando tudo mais lento.' },

  { id: 'valkyrie', name: 'Valkyrie', klass: 'Mísseis & Suporte', design: D('arrow', 'split', 3, 'single', 'gold'),
    stats: { hp: 108, shield: 65, speed: 62, power: 66, handling: 58 }, primary: 'Salva de mísseis',
    ability: { name: 'Travamento múltiplo', desc: 'Trava vários alvos e dispara mísseis em todos.' },
    ultimate: { name: 'Chuva de aço', desc: 'Uma tempestade de mísseis teleguiados.' },
    passive: { name: 'Suporte', desc: 'Mísseis se recarregam mais rápido em combo alto.' },
    unlock: 'Vença 20 fases da campanha.', starter: false, mastery: 2, bio: 'A rainha dos mísseis: nada escapa da mira.' },

  { id: 'scarab', name: 'Scarab', klass: 'Armadura & Drones Defensivos', design: D('heavy', 'ring', 3, 'wide', 'jade'),
    stats: { hp: 140, shield: 90, speed: 44, power: 54, handling: 40 }, primary: 'Canhão pesado',
    ability: { name: 'Casulo', desc: 'Drones defensivos orbitam bloqueando tiros.' },
    ultimate: { name: 'Enxame-carapaça', desc: 'Uma muralha de drones cerca a nave.' },
    passive: { name: 'Carapaça', desc: 'Drones reduzem o dano recebido.' },
    unlock: 'Sobreviva 15 minutos no modo Sobrevivência.', starter: false, mastery: 3, bio: 'Uma fortaleza cercada de escaravelhos de metal.' },

  { id: 'pulse', name: 'Pulse', klass: 'Cadência Rítmica', design: D('delta', 'swept', 2, 'visor', 'azure'),
    stats: { hp: 90, shield: 52, speed: 72, power: 64, handling: 72 }, primary: 'Tiros rítmicos',
    ability: { name: 'Batida', desc: 'Sincroniza disparos num pulso de dano em área.' },
    ultimate: { name: 'Crescendo', desc: 'A cadência acelera até um estouro final.' },
    passive: { name: 'Ritmo', desc: 'Acertos no compasso aumentam a cadência.' },
    unlock: 'Mantenha combo 300 no modo Caça ao Combo.', starter: false, mastery: 3, bio: 'Dispara no ritmo — quanto melhor o tempo, maior o poder.' },

  { id: 'spectra', name: 'Spectra', klass: 'Elementos por Cor', design: D('diamond', 'x', 2, 'eye', 'rose'),
    stats: { hp: 88, shield: 55, speed: 74, power: 68, handling: 76 }, primary: 'Prisma variável',
    ability: { name: 'Trocar espectro', desc: 'Alterna entre fogo, gelo e raio.' },
    ultimate: { name: 'Arco-íris', desc: 'Dispara os três elementos de uma vez.' },
    passive: { name: 'Ressonância', desc: 'Trocar de elemento dá um bônus curto.' },
    unlock: 'Ganhe medalha em 5 modos diferentes.', starter: false, mastery: 4, bio: 'Um camaleão de combate: muda de elemento pela cor.' },

  { id: 'leviathan', name: 'Leviathan', klass: 'Canhões Laterais', design: D('hauler', 'long', 3, 'wide', 'iron'),
    stats: { hp: 170, shield: 95, speed: 38, power: 82, handling: 30 }, primary: 'Bateria dupla',
    ability: { name: 'Broadside', desc: 'Descarrega os canhões laterais em salva.' },
    ultimate: { name: 'Bombardeio total', desc: 'Todos os canhões disparam ao mesmo tempo.' },
    passive: { name: 'Colosso', desc: 'Enorme e resistente, mas difícil de manobrar.' },
    unlock: 'Vença o Setor 11 — Trono das Máquinas.', starter: false, mastery: 4, bio: 'Uma nave-navio: lenta, imensa e devastadora.' },

  { id: 'pixie', name: 'Pixie', klass: 'Hitbox Minúscula', design: D('blade', 'stub', 1, 'eye', 'rose'),
    stats: { hp: 60, shield: 35, speed: 96, power: 48, handling: 99 }, primary: 'Fagulhas rápidas',
    ability: { name: 'Piscar', desc: 'Teleporte curtíssimo para escapar de tudo.' },
    ultimate: { name: 'Poeira de fada', desc: 'Nuvem de fagulhas que desvia projéteis.' },
    passive: { name: 'Minúscula', desc: 'Hitbox pequena, mas dano modesto.' },
    unlock: 'Vença o Caos de Projéteis sem continuar.', starter: false, mastery: 5, bio: 'Escorrega por entre balas impossíveis. Pura evasão.' },

  { id: 'railgun', name: 'Railgun-X', klass: 'Tiro Carregado', design: D('twin', 'stub', 2, 'visor', 'steel'),
    stats: { hp: 90, shield: 50, speed: 54, power: 98, handling: 48 }, primary: 'Trilho carregável',
    ability: { name: 'Sobrecarga', desc: 'Carrega um tiro que atravessa tudo.' },
    ultimate: { name: 'Lança de íons', desc: 'Um raio contínuo que varre a tela por segundos.' },
    passive: { name: 'Acúmulo', desc: 'Dano absurdo, mas precisa carregar entre tiros.' },
    unlock: 'Derrote O Motor Antigo.', starter: false, mastery: 4, bio: 'Paciência e potência: um tiro atravessa uma frota.' },

  { id: 'swarm', name: 'Swarm', klass: 'Micro-naves', design: D('organic', 'ring', 3, 'eye', 'jade'),
    stats: { hp: 96, shield: 52, speed: 66, power: 60, handling: 64 }, primary: 'Nuvem de micro-tiros',
    ability: { name: 'Desmembrar', desc: 'Solta micro-naves que atacam em conjunto.' },
    ultimate: { name: 'Colmeia', desc: 'Toda a frota se separa em um enxame furioso.' },
    passive: { name: 'Coletivo', desc: 'Micro-naves reagrupam e reforçam o disparo.' },
    unlock: 'Complete 25 missões diárias.', starter: false, mastery: 4, bio: 'Não é uma nave — são muitas agindo como uma só.' },

  { id: 'eclipse', name: 'Eclipse', klass: 'Luz & Sombra', design: D('crescent', 'x', 2, 'eye', 'shadow'),
    stats: { hp: 100, shield: 60, speed: 74, power: 74, handling: 72 }, primary: 'Fluxo dual',
    ability: { name: 'Virada', desc: 'Alterna entre modo luz (área) e sombra (foco).' },
    ultimate: { name: 'Eclipse total', desc: 'Funde luz e sombra num pulso duplo.' },
    passive: { name: 'Dualidade', desc: 'Cada modo tem forças diferentes; troque na hora certa.' },
    unlock: 'Vença a campanha na dificuldade Difícil.', starter: false, mastery: 4, bio: 'Duas naves em uma — domine a troca entre luz e sombra.' },

  { id: 'singularity', name: 'Singularity', klass: 'Gravidade & Buracos Negros', design: D('star', 'ring', 3, 'eye', 'void'),
    stats: { hp: 110, shield: 70, speed: 68, power: 92, handling: 66 }, primary: 'Fenda gravitacional',
    ability: { name: 'Colapso', desc: 'Cria um mini buraco negro que suga inimigos e tiros.' },
    ultimate: { name: 'Horizonte de eventos', desc: 'Um colapso colossal engole toda a tela.' },
    passive: { name: 'Atração', desc: 'Projéteis do jogador curvam levemente em direção aos alvos.' },
    unlock: 'Derrote O Buraco Branco (chefe secreto final).', starter: false, mastery: 5, bio: 'A nave secreta final: poder de dobrar o espaço, difícil de domar.' },
];

export const SHIP_BY_ID: Record<string, ShipDef> = {};
for (const s of SHIPS) SHIP_BY_ID[s.id] = s;

export const STARTER_IDS = SHIPS.filter((s) => s.starter).map((s) => s.id);
