// ============ CONQUISTAS (30) ============
export interface AchievementData {
  id: string; namePT: string; nameEN: string; descPT: string; descEN: string;
  icon: string;
  check: 'planted' | 'bloomed' | 'perfect' | 'species' | 'category-master' | 'pollinators'
  | 'pots' | 'competition-win' | 'no-dead-days' | 'propagated' | 'rare' | 'bonsai-year'
  | 'greenhouse-full' | 'harmony' | 'final' | 'sold' | 'arrangements' | 'visitors'
  | 'restorations' | 'earned';
  target: number;
  extra?: string; // categoria/estação etc.
}

export const ACHIEVEMENTS: AchievementData[] = [
  { id: 'primeira-semente', namePT: 'Primeira Semente', nameEN: 'First Seed', descPT: 'Plante sua primeira semente.', descEN: 'Plant your first seed.', icon: 'seed', check: 'planted', target: 1 },
  { id: 'primeira-flor', namePT: 'Primeira Flor', nameEN: 'First Bloom', descPT: 'Veja sua primeira planta florescer.', descEN: 'See your first plant bloom.', icon: 'flower', check: 'bloomed', target: 1 },
  { id: 'primeira-perfeita', namePT: 'Primeira Planta Perfeita', nameEN: 'First Perfect Plant', descPT: 'Leve uma planta à qualidade 90+.', descEN: 'Raise a plant to 90+ quality.', icon: 'star', check: 'perfect', target: 1 },
  { id: 'jardim-25', namePT: 'Jardim com 25 Espécies', nameEN: '25-Species Garden', descPT: 'Descubra 25 espécies diferentes.', descEN: 'Discover 25 different species.', icon: 'book', check: 'species', target: 25 },
  { id: 'jardim-100', namePT: 'Jardim com 100 Espécies', nameEN: '100-Species Garden', descPT: 'Descubra 100 espécies diferentes.', descEN: 'Discover 100 different species.', icon: 'book', check: 'species', target: 100 },
  { id: 'jardim-200', namePT: 'Biblioteca Botânica', nameEN: 'Botanical Library', descPT: 'Descubra 200 espécies diferentes.', descEN: 'Discover 200 different species.', icon: 'book', check: 'species', target: 200 },
  { id: 'mestre-suculentas', namePT: 'Mestre das Suculentas', nameEN: 'Succulent Master', descPT: 'Cultive 15 suculentas até a fase adulta.', descEN: 'Grow 15 succulents to maturity.', icon: 'cactus', check: 'category-master', target: 15, extra: 'succulent' },
  { id: 'guardiao-orquideas', namePT: 'Guardião das Orquídeas', nameEN: 'Orchid Guardian', descPT: 'Floresça 5 orquídeas.', descEN: 'Bloom 5 orchids.', icon: 'orchid', check: 'category-master', target: 5, extra: 'orchid' },
  { id: 'amigo-borboletas', namePT: 'Amigo das Borboletas', nameEN: 'Butterfly Friend', descPT: 'Atraia 50 visitas de polinizadores.', descEN: 'Attract 50 pollinator visits.', icon: 'butterfly', check: 'pollinators', target: 50 },
  { id: 'colecionador-vasos', namePT: 'Colecionador de Vasos', nameEN: 'Pot Collector', descPT: 'Possua 15 tipos de vaso diferentes.', descEN: 'Own 15 different pot types.', icon: 'pot', check: 'pots', target: 15 },
  { id: 'vencedor-primavera', namePT: 'Vencedor da Primavera', nameEN: 'Spring Champion', descPT: 'Vença o Festival das Flores.', descEN: 'Win the Flower Festival.', icon: 'trophy', check: 'competition-win', target: 1, extra: 'festival-flores' },
  { id: 'trinta-dias-vivos', namePT: '30 Dias Sem Perdas', nameEN: '30 Days No Losses', descPT: 'Passe 30 dias sem nenhuma planta morta no jardim.', descEN: 'Go 30 days with no dead plants in the garden.', icon: 'heart', check: 'no-dead-days', target: 30 },
  { id: 'mestre-propagacao', namePT: 'Mestre da Propagação', nameEN: 'Propagation Master', descPT: 'Propague 25 plantas.', descEN: 'Propagate 25 plants.', icon: 'cutting', check: 'propagated', target: 25 },
  { id: 'primeira-rara', namePT: 'Primeira Planta Rara', nameEN: 'First Rare Plant', descPT: 'Cultive uma planta rara até a fase adulta.', descEN: 'Grow a rare plant to maturity.', icon: 'gem', check: 'rare', target: 1 },
  { id: 'bonsai-um-ano', namePT: 'Bonsai Vivo por 1 Ano', nameEN: 'Bonsai Alive for 1 Year', descPT: 'Mantenha um bonsai vivo por um ano inteiro de jogo.', descEN: 'Keep a bonsai alive a full game year.', icon: 'bonsai', check: 'bonsai-year', target: 1 },
  { id: 'estufa-completa', namePT: 'Estufa Tropical Completa', nameEN: 'Full Tropical Greenhouse', descPT: 'Encha a estufa com 12 plantas tropicais saudáveis.', descEN: 'Fill the greenhouse with 12 healthy tropicals.', icon: 'greenhouse', check: 'greenhouse-full', target: 12 },
  { id: 'harmonia-500', namePT: 'Harmonia 500', nameEN: 'Harmony 500', descPT: 'Alcance 500 de Harmonia do Jardim.', descEN: 'Reach 500 Garden Harmony.', icon: 'yin', check: 'harmony', target: 500 },
  { id: 'harmonia-1000', namePT: 'Harmonia 1000', nameEN: 'Harmony 1000', descPT: 'Alcance 1000 de Harmonia do Jardim.', descEN: 'Reach 1000 Garden Harmony.', icon: 'yin', check: 'harmony', target: 1000 },
  { id: 'jardim-vivo-conq', namePT: 'Jardim Vivo', nameEN: 'Living Garden', descPT: 'Complete a missão final: o Jardim Vivo.', descEN: 'Complete the final quest: the Living Garden.', icon: 'crown', check: 'final', target: 1 },
  { id: 'vendedor-100', namePT: 'Cem Vendas', nameEN: 'A Hundred Sales', descPT: 'Venda 100 itens.', descEN: 'Sell 100 items.', icon: 'coin', check: 'sold', target: 100 },
  { id: 'florista', namePT: 'Florista de Mão Cheia', nameEN: 'Masterful Florist', descPT: 'Monte 20 arranjos florais.', descEN: 'Craft 20 floral arrangements.', icon: 'bouquet', check: 'arrangements', target: 20 },
  { id: 'anfitriao', namePT: 'Anfitrião', nameEN: 'Host', descPT: 'Receba 50 visitantes.', descEN: 'Receive 50 visitors.', icon: 'visitor', check: 'visitors', target: 50 },
  { id: 'restaurador', namePT: 'Restaurador de Jardins', nameEN: 'Garden Restorer', descPT: 'Complete 4 restaurações de jardins.', descEN: 'Complete 4 garden restorations.', icon: 'hammer', check: 'restorations', target: 4 },
  { id: 'primeiro-milhar', namePT: 'Primeiro Milhar', nameEN: 'First Thousand', descPT: 'Acumule 1000 moedas ganhas no total.', descEN: 'Earn 1000 coins in total.', icon: 'coin', check: 'earned', target: 1000 },
  { id: 'magnata-verde', namePT: 'Magnata Verde', nameEN: 'Green Tycoon', descPT: 'Acumule 10000 moedas ganhas no total.', descEN: 'Earn 10000 coins in total.', icon: 'coin', check: 'earned', target: 10000 },
  { id: 'dez-competicoes', namePT: 'Rosto Conhecido do Júri', nameEN: 'Known to the Judges', descPT: 'Vença 10 competições.', descEN: 'Win 10 competitions.', icon: 'trophy', check: 'competition-win', target: 10 },
  { id: 'plantador-50', namePT: 'Cinquenta Raízes', nameEN: 'Fifty Roots', descPT: 'Plante 50 plantas.', descEN: 'Plant 50 plants.', icon: 'seed', check: 'planted', target: 50 },
  { id: 'plantador-200', namePT: 'Duzentas Raízes', nameEN: 'Two Hundred Roots', descPT: 'Plante 200 plantas.', descEN: 'Plant 200 plants.', icon: 'seed', check: 'planted', target: 200 },
  { id: 'mestre-ervas', namePT: 'Mestre das Ervas', nameEN: 'Herb Master', descPT: 'Cultive 10 ervas até a fase adulta.', descEN: 'Grow 10 herbs to maturity.', icon: 'herb', check: 'category-master', target: 10, extra: 'herb' },
  { id: 'cem-flores', namePT: 'Cem Florações', nameEN: 'A Hundred Blooms', descPT: 'Veja 100 florações no seu jardim.', descEN: 'Witness 100 blooms in your garden.', icon: 'flower', check: 'bloomed', target: 100 },
];

export const ACHIEVEMENT_BY_ID: Record<string, AchievementData> = {};
for (const a of ACHIEVEMENTS) ACHIEVEMENT_BY_ID[a.id] = a;
