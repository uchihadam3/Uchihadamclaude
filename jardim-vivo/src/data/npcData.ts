import type { NpcData } from '../types';

// ============ NPCS (18) ============
export const NPCS: NpcData[] = [
  {
    id: 'rosa', namePT: 'Dona Rosa', nameEN: 'Mrs. Rosa', rolePT: 'Dona da floricultura', roleEN: 'Flower shop owner',
    personality: { pt: 'Acolhedora e tagarela; conhece cada flor pelo nome desde 1974.', en: 'Warm and chatty; on first-name terms with every flower since 1974.' },
    portrait: { skin: '#e8b890', hair: '#d8d0c8', hairStyle: 'bun', shirt: '#c86878', accent: '#e8a0b0', age: 'elder' },
    favoriteCategories: ['annual', 'perennial', 'rose-shrub'], favoritePlants: ['rosa-hibrida', 'girassol', 'zinia'],
    greetings: [
      { pt: 'Bem-vindo, meu bem! As sementes chegaram fresquinhas hoje.', en: 'Welcome, dear! The seeds came in fresh today.' },
      { pt: 'Uma flor por dia espanta qualquer tristeza, eu garanto.', en: 'A flower a day keeps the blues away, I promise.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Desconto de 10% na floricultura', rewardEN: '10% off at the flower shop' },
      { level: 4, rewardPT: 'Sementes raras aparecem na loja', rewardEN: 'Rare seeds appear in the shop', unlock: 'shop-rare-seeds' },
    ],
    shopId: 'floricultura',
    requestPool: [
      { id: 'rosa-flores-amarelas', kind: 'flowers-color', textPT: 'Preciso de 5 flores amarelas para uma coroa de aniversário!', textEN: 'I need 5 yellow flowers for a birthday wreath!', target: { color: 'amarelo', count: 5 }, rewardMoney: 45, rewardRep: 3, rewardFriendship: 8 },
      { id: 'rosa-girassol', kind: 'plant', textPT: 'Um cliente encomendou um girassol adulto e saudável.', textEN: 'A customer ordered a healthy adult sunflower.', target: { plantId: 'girassol', count: 1, minQuality: 60 }, rewardMoney: 60, rewardRep: 4, rewardFriendship: 10 },
      { id: 'rosa-buque', kind: 'arrangement', textPT: 'Me faz um buquê romântico? É pedido de casamento!', textEN: 'Make me a romantic bouquet? It\'s for a proposal!', target: { arrangementStyle: 'romantico', count: 1 }, rewardMoney: 90, rewardRep: 6, rewardFriendship: 12, minFriendship: 20 },
    ],
  },
  {
    id: 'alvaro', namePT: 'Seu Álvaro', nameEN: 'Mr. Álvaro', rolePT: 'Botânico aposentado', roleEN: 'Retired botanist',
    personality: { pt: 'Fala em latim com as plantas e jura que elas respondem.', en: 'Speaks Latin to plants and swears they answer back.' },
    portrait: { skin: '#c89870', hair: '#e8e8e0', hairStyle: 'bald', shirt: '#5a7a58', accent: '#8aa888', age: 'elder' },
    favoriteCategories: ['perennial', 'bonsai-tree', 'wildflower'], favoritePlants: ['equinacea', 'heleboro', 'bordo-japones'],
    greetings: [
      { pt: 'Ah! Sabia que a Echinacea purpurea alimenta 40 espécies de abelhas?', en: 'Ah! Did you know Echinacea purpurea feeds 40 bee species?' },
      { pt: 'Nome científico não é frescura: é o endereço da planta na história.', en: 'Scientific names aren\'t fancy talk: they\'re a plant\'s address in history.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Ensina propagação por divisão', rewardEN: 'Teaches division propagation', unlock: 'prop-division' },
      { level: 3, rewardPT: 'Vende bokashi e torta de mamona', rewardEN: 'Sells bokashi and castor cake', unlock: 'adv-fertilizers' },
      { level: 5, rewardPT: 'Revela plantas raras na feira', rewardEN: 'Reveals rare plants at the fair', unlock: 'fair-hints' },
    ],
    requestPool: [
      { id: 'alvaro-perene', kind: 'plant', textPT: 'Cultive uma equinácea até florescer. As abelhas do bairro agradecem.', textEN: 'Grow a coneflower to bloom. The neighborhood bees thank you.', target: { plantId: 'equinacea', count: 1 }, rewardMoney: 50, rewardRep: 5, rewardFriendship: 10 },
      { id: 'alvaro-colecao', kind: 'plant', textPT: 'Traga-me qualquer planta perfeita (qualidade 90+). Quero estudá-la.', textEN: 'Bring me any perfect plant (quality 90+). I wish to study it.', target: { count: 1, minQuality: 90 }, rewardMoney: 120, rewardRep: 8, rewardFriendship: 14, minFriendship: 30 },
    ],
  },
  {
    id: 'mina', namePT: 'Mina', nameEN: 'Mina', rolePT: 'Vizinha urban jungle', roleEN: 'Urban jungle neighbor',
    personality: { pt: 'O apartamento dela tem mais plantas que móveis, e ela quer mais.', en: 'Her flat has more plants than furniture, and she wants more.' },
    portrait: { skin: '#a87858', hair: '#2a1a12', hairStyle: 'curly', shirt: '#d8a848', accent: '#f0c878', age: 'young' },
    favoriteCategories: ['tropical'], favoritePlants: ['monstera', 'pothos', 'zamioculca', 'calathea-orbifolia'],
    greetings: [
      { pt: 'Olha essa folha nova da minha monstera! Chorei um pouquinho.', en: 'Look at my monstera\'s new leaf! I cried a little.' },
      { pt: 'Diz que tem calathea… por favor diz que tem calathea.', en: 'Tell me you have calatheas… please say you do.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Troca mudas tropicais com você', rewardEN: 'Trades tropical cuttings with you', unlock: 'mina-trade' },
      { level: 4, rewardPT: 'Ajuda a desbloquear a Sala de Plantas', rewardEN: 'Helps unlock the Plant Room', unlock: 'area-sala-plantas' },
    ],
    requestPool: [
      { id: 'mina-pothos', kind: 'plant', textPT: 'Me arruma uma jiboia bem cheia? Minha estante tá pelada.', textEN: 'Get me a full pothos? My shelf looks naked.', target: { plantId: 'pothos', count: 1, minQuality: 50 }, rewardMoney: 35, rewardRep: 2, rewardFriendship: 10 },
      { id: 'mina-zamioculca', kind: 'plant', textPT: 'Uma zamioculca pro escritório — o único lugar sem sol do mundo.', textEN: 'A ZZ plant for the office — the world\'s only sunless place.', target: { plantId: 'zamioculca', count: 1 }, rewardMoney: 45, rewardRep: 3, rewardFriendship: 10 },
      { id: 'mina-calathea', kind: 'plant', textPT: 'CALATHEA ORBIFOLIA. Saudável. Eu imploro.', textEN: 'CALATHEA ORBIFOLIA. Healthy. I\'m begging.', target: { plantId: 'calathea-orbifolia', count: 1, minQuality: 70 }, rewardMoney: 110, rewardRep: 6, rewardFriendship: 15, minFriendship: 25 },
    ],
  },
  {
    id: 'otto', namePT: 'Otto', nameEN: 'Otto', rolePT: 'Colecionador de cactos', roleEN: 'Cactus collector',
    personality: { pt: 'Já foi espetado 340 vezes e considera cada uma um troféu.', en: 'Pricked 340 times and counts each one a trophy.' },
    portrait: { skin: '#e8c8a0', hair: '#b86838', hairStyle: 'short', shirt: '#788858', accent: '#a8b878', age: 'adult' },
    favoriteCategories: ['succulent'], favoritePlants: ['cacto-ourico', 'lithops', 'astrophytum'],
    greetings: [
      { pt: 'Regou demais, matou. Regra número um, dois e três.', en: 'Overwater and it dies. Rules one, two and three.' },
      { pt: 'Lithops são pedras que sonham. Eu coleciono sonhos.', en: 'Lithops are stones that dream. I collect dreams.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Desbloqueia o Jardim de Suculentas', rewardEN: 'Unlocks the Succulent Garden', unlock: 'area-jardim-suculentas' },
      { level: 3, rewardPT: 'Vende vasos rasos especiais', rewardEN: 'Sells special shallow pots', unlock: 'otto-pots' },
    ],
    requestPool: [
      { id: 'otto-echeveria', kind: 'plant', textPT: 'Uma echevéria simétrica perfeita. Sem marcas de dedo!', textEN: 'A perfectly symmetric echeveria. No fingerprints!', target: { plantId: 'echeveria', count: 1, minQuality: 60 }, rewardMoney: 40, rewardRep: 3, rewardFriendship: 10 },
      { id: 'otto-lithops', kind: 'plant', textPT: 'Consegue cultivar uma pedra-viva sem afogá-la? Duvido.', textEN: 'Can you grow a living stone without drowning it? Doubt it.', target: { plantId: 'lithops', count: 1 }, rewardMoney: 90, rewardRep: 6, rewardFriendship: 14, minFriendship: 20 },
    ],
  },
  {
    id: 'helena', namePT: 'Helena', nameEN: 'Helena', rolePT: 'Especialista em orquídeas', roleEN: 'Orchid specialist',
    personality: { pt: 'Elegante e precisa; fala de orquídeas como quem fala de joias.', en: 'Elegant and precise; speaks of orchids as one speaks of jewels.' },
    portrait: { skin: '#d8a888', hair: '#4a3020', hairStyle: 'long', shirt: '#9a68b8', accent: '#c8a0d8', age: 'adult' },
    favoriteCategories: ['orchid'], favoritePlants: ['phalaenopsis', 'cattleya', 'vanda'],
    greetings: [
      { pt: 'Orquídea não morre de sede, morre de afogamento. Anote.', en: 'Orchids don\'t die of thirst, they die of drowning. Write it down.' },
      { pt: 'Raiz prateada pede água. Raiz verde pede paciência.', en: 'Silver roots ask for water. Green roots ask for patience.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende substrato e vasos de orquídea', rewardEN: 'Sells orchid bark and pots', unlock: 'helena-supplies' },
      { level: 2, rewardPT: 'Desbloqueia o Orquidário', rewardEN: 'Unlocks the Orchid House', unlock: 'area-orquidario' },
      { level: 4, rewardPT: 'Ensina propagação por keiki', rewardEN: 'Teaches keiki propagation', unlock: 'prop-keiki' },
    ],
    requestPool: [
      { id: 'helena-phal', kind: 'plant', textPT: 'Faça uma Phalaenopsis florescer e trarei você para o clube.', textEN: 'Bring a Phalaenopsis to bloom and I\'ll bring you into the club.', target: { plantId: 'phalaenopsis', count: 1 }, rewardMoney: 100, rewardRep: 8, rewardFriendship: 12 },
      { id: 'helena-cattleya', kind: 'plant', textPT: 'Uma Cattleya labiata em flor. A rainha exige respeito.', textEN: 'A Cattleya labiata in bloom. The queen demands respect.', target: { plantId: 'cattleya', count: 1, minQuality: 70 }, rewardMoney: 180, rewardRep: 12, rewardFriendship: 16, minFriendship: 35 },
    ],
  },
  {
    id: 'sora', namePT: 'Sora', nameEN: 'Sora', rolePT: 'Paisagista minimalista', roleEN: 'Minimalist landscaper',
    personality: { pt: 'Fala pouco; cada pedra que posiciona vale um discurso.', en: 'Speaks little; every stone she places is worth a speech.' },
    portrait: { skin: '#e8c0a0', hair: '#181818', hairStyle: 'ponytail', shirt: '#485868', accent: '#8898a8', age: 'adult' },
    favoriteCategories: ['bonsai-tree'], favoritePlants: ['bordo-japones', 'junipero', 'azaleia-satsuki'],
    greetings: [
      { pt: 'O vazio entre as plantas também é jardim.', en: 'The emptiness between plants is also garden.' },
      { pt: 'Menos. Depois, menos ainda.', en: 'Less. Then, even less.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende lajes, areia e lanternas', rewardEN: 'Sells slabs, sand and lanterns', unlock: 'sora-decor' },
      { level: 2, rewardPT: 'Desbloqueia o Jardim Japonês e kokedama', rewardEN: 'Unlocks the Japanese Garden and kokedama', unlock: 'area-jardim-japones' },
    ],
    requestPool: [
      { id: 'sora-musgo', kind: 'plant', textPT: 'Um junípero podado com intenção. Sem cortes por tédio.', textEN: 'A juniper pruned with intention. No cuts out of boredom.', target: { plantId: 'junipero', count: 1, minQuality: 60 }, rewardMoney: 110, rewardRep: 7, rewardFriendship: 12 },
    ],
  },
  {
    id: 'lia', namePT: 'Lia', nameEN: 'Lia', rolePT: 'Criança das borboletas', roleEN: 'Butterfly kid',
    personality: { pt: 'Corre atrás de borboletas com um caderno de desenhos amassado.', en: 'Chases butterflies with a crumpled sketchbook.' },
    portrait: { skin: '#d8a078', hair: '#3a2818', hairStyle: 'braid', shirt: '#e8b838', accent: '#f8d868', age: 'child' },
    favoriteCategories: ['wildflower', 'annual'], favoritePlants: ['girassol', 'asclepia', 'zinia'],
    greetings: [
      { pt: 'Hoje eu vi uma borboleta AZUL! Azul de verdade!', en: 'Today I saw a BLUE butterfly! Really blue!' },
      { pt: 'Girassóis são o sol que dá pra abraçar.', en: 'Sunflowers are the sun you can hug.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Desbloqueia o Jardim de Borboletas', rewardEN: 'Unlocks the Butterfly Garden', unlock: 'area-jardim-borboletas' },
      { level: 3, rewardPT: 'Desenha as borboletas do seu jardim (conquistas)', rewardEN: 'Draws your garden\'s butterflies (achievements)', unlock: 'lia-drawings' },
    ],
    requestPool: [
      { id: 'lia-girassol', kind: 'plant', textPT: 'Planta um girassol GIGANTE pra mim? Maior que eu!', textEN: 'Grow a GIANT sunflower for me? Taller than me!', target: { plantId: 'girassol', count: 1 }, rewardMoney: 25, rewardRep: 2, rewardFriendship: 12 },
      { id: 'lia-asclepia', kind: 'plant', textPT: 'A professora falou que as monarcas precisam de asclépia. Planta uma?', textEN: 'Teacher says monarchs need butterfly weed. Plant one?', target: { plantId: 'asclepia', count: 1 }, rewardMoney: 30, rewardRep: 3, rewardFriendship: 12 },
    ],
  },
  {
    id: 'marcos', namePT: 'Marcos', nameEN: 'Marcos', rolePT: 'Chef de cozinha', roleEN: 'Chef',
    personality: { pt: 'Prova folhas direto do pé e dá nota em voz alta.', en: 'Tastes leaves straight off the plant and grades them aloud.' },
    portrait: { skin: '#b88a60', hair: '#1a1a18', hairStyle: 'short', shirt: '#e8e8e0', accent: '#c83838', age: 'adult' },
    favoriteCategories: ['herb'], favoritePlants: ['manjericao', 'alecrim', 'tomilho'],
    greetings: [
      { pt: 'Manjericão de mercado é papelão. O seu é poesia.', en: 'Store basil is cardboard. Yours is poetry.' },
      { pt: 'Hoje o menu pede alecrim. Muito alecrim.', en: 'Tonight\'s menu calls for rosemary. Lots of it.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Desbloqueia o Jardim de Ervas', rewardEN: 'Unlocks the Herb Garden', unlock: 'area-jardim-ervas' },
      { level: 3, rewardPT: 'Paga 30% a mais por ervas', rewardEN: 'Pays 30% more for herbs', unlock: 'marcos-premium' },
    ],
    requestPool: [
      { id: 'marcos-manjericao', kind: 'herb-bundle', textPT: 'Três maços de manjericão fresco pro jantar de sábado!', textEN: 'Three bunches of fresh basil for Saturday dinner!', target: { plantId: 'manjericao', count: 3 }, rewardMoney: 40, rewardRep: 3, rewardFriendship: 10 },
      { id: 'marcos-mix', kind: 'herb-bundle', textPT: 'Tomilho, sálvia e alecrim: o trio do assado perfeito.', textEN: 'Thyme, sage and rosemary: the perfect roast trio.', target: { category: 'herb', count: 3 }, rewardMoney: 55, rewardRep: 4, rewardFriendship: 10 },
    ],
  },
  {
    id: 'beatriz', namePT: 'Beatriz', nameEN: 'Beatriz', rolePT: 'Artista', roleEN: 'Artist',
    personality: { pt: 'Enxerga o jardim em pinceladas; pede flores por cor, nunca por nome.', en: 'Sees the garden in brushstrokes; asks for flowers by color, never by name.' },
    portrait: { skin: '#e8b8a0', hair: '#883828', hairStyle: 'long', shirt: '#6858a8', accent: '#a898d8', age: 'young' },
    favoriteCategories: ['annual', 'bulb'], favoritePlants: ['tulipa', 'papoula-silvestre', 'delphinium'],
    greetings: [
      { pt: 'Preciso do azul exato do fim de tarde. Você cultiva isso?', en: 'I need the exact blue of dusk. Do you grow that?' },
      { pt: 'Seu jardim tem luz de Monet hoje.', en: 'Your garden has Monet light today.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Vende o Mosaico artesanal', rewardEN: 'Sells the Handmade Mosaic', unlock: 'beatriz-mosaic' },
      { level: 4, rewardPT: 'Pinta um retrato do seu jardim (troféu)', rewardEN: 'Paints your garden\'s portrait (trophy)', unlock: 'beatriz-painting' },
    ],
    requestPool: [
      { id: 'beatriz-azul', kind: 'flowers-color', textPT: 'Quatro flores azuis. AZUIS, não roxas! É para um céu.', textEN: 'Four blue flowers. BLUE, not purple! It\'s for a sky.', target: { color: 'azul', count: 4 }, rewardMoney: 50, rewardRep: 4, rewardFriendship: 10 },
      { id: 'beatriz-vermelho', kind: 'flowers-color', textPT: 'Um vermelho que grite. Três flores, por favor.', textEN: 'A red that screams. Three blooms, please.', target: { color: 'vermelho', count: 3 }, rewardMoney: 40, rewardRep: 3, rewardFriendship: 8 },
    ],
  },
  {
    id: 'nadia', namePT: 'Nadia', nameEN: 'Nadia', rolePT: 'Pesquisadora ambiental', roleEN: 'Environmental researcher',
    personality: { pt: 'Conta polinizadores com um clicker e sorri a cada clique.', en: 'Counts pollinators with a clicker, smiling at every click.' },
    portrait: { skin: '#986848', hair: '#181410', hairStyle: 'short', shirt: '#487858', accent: '#78a888', age: 'adult' },
    favoriteCategories: ['wildflower'], favoritePlants: ['monarda', 'solidago', 'borago'],
    greetings: [
      { pt: 'Doze abelhas nativas em dez minutos. Seu jardim é um censo vivo!', en: 'Twelve native bees in ten minutes. Your garden is a living census!' },
      { pt: 'Biodiversidade começa num vaso de flor.', en: 'Biodiversity starts in a flowerpot.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende composteira e coletor de chuva', rewardEN: 'Sells compost bin and rain barrel', unlock: 'nadia-eco' },
      { level: 3, rewardPT: 'Relatório de polinizadores no diário', rewardEN: 'Pollinator report in your journal', unlock: 'nadia-report' },
    ],
    requestPool: [
      { id: 'nadia-nativas', kind: 'plant', textPT: 'Cultive 3 flores silvestres nativas para meu estudo de campo.', textEN: 'Grow 3 native wildflowers for my field study.', target: { category: 'wildflower', count: 3 }, rewardMoney: 60, rewardRep: 6, rewardFriendship: 12 },
    ],
  },
  {
    id: 'tomas', namePT: 'Tomás', nameEN: 'Tomás', rolePT: 'Carpinteiro', roleEN: 'Carpenter',
    personality: { pt: 'Mede duas vezes, corta uma, e sempre cheira a serragem de cedro.', en: 'Measures twice, cuts once, always smells of cedar sawdust.' },
    portrait: { skin: '#c89068', hair: '#5a3a20', hairStyle: 'short', shirt: '#a86838', accent: '#d8a868', age: 'adult' },
    favoriteCategories: ['climber'], favoritePlants: ['glicinia', 'jasmim', 'rosa-trepadeira'],
    greetings: [
      { pt: 'Pergolado bom é o que range baixinho no vento.', en: 'A good pergola creaks softly in the wind.' },
      { pt: 'Madeira e madressilva: casamento perfeito.', en: 'Wood and honeysuckle: a perfect marriage.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende bancos, cercas e canteiros elevados', rewardEN: 'Sells benches, fences and raised beds', unlock: 'tomas-wood' },
      { level: 2, rewardPT: 'Constrói a Pérgola de Trepadeiras', rewardEN: 'Builds the Climber Pergola', unlock: 'area-pergola' },
    ],
    requestPool: [
      { id: 'tomas-trepadeira', kind: 'plant', textPT: 'Fiz um arco novo. Me dá um jasmim para vesti-lo?', textEN: 'Built a new arch. Got a jasmine to dress it?', target: { plantId: 'jasmim', count: 1 }, rewardMoney: 55, rewardRep: 4, rewardFriendship: 10 },
    ],
  },
  {
    id: 'irene', namePT: 'Irene', nameEN: 'Irene', rolePT: 'Dona do antiquário', roleEN: 'Antique shop owner',
    personality: { pt: 'Cada vaso rachado dela tem uma história com pelo menos um fantasma.', en: 'Every cracked pot of hers has a story with at least one ghost.' },
    portrait: { skin: '#e0b090', hair: '#786858', hairStyle: 'bun', shirt: '#8a5868', accent: '#c898a8', age: 'elder' },
    favoriteCategories: ['bulb', 'rose-shrub'], favoritePlants: ['peonia', 'lilas', 'lirio-do-vale'],
    greetings: [
      { pt: 'Este vaso? Veio de um jardim que não existe mais. Cuide bem.', en: 'This pot? From a garden that no longer exists. Care for it well.' },
      { pt: 'Coisas velhas gostam de flores novas.', en: 'Old things like new flowers.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Peças raras aparecem no antiquário', rewardEN: 'Rare pieces appear at the antique shop', unlock: 'irene-rare' },
    ],
    shopId: 'antiquario',
    requestPool: [
      { id: 'irene-perfumadas', kind: 'flowers-color', textPT: 'Flores brancas e perfumadas para a memória de alguém querido.', textEN: 'White fragrant flowers, in memory of someone dear.', target: { color: 'branco', count: 4 }, rewardMoney: 55, rewardRep: 4, rewardFriendship: 10 },
    ],
  },
  {
    id: 'kenji', namePT: 'Kenji', nameEN: 'Kenji', rolePT: 'Mestre de bonsai', roleEN: 'Bonsai master',
    personality: { pt: 'Diz que seus bonsais têm 60 anos e sua paciência, 600.', en: 'Says his bonsai are 60 years old and his patience, 600.' },
    portrait: { skin: '#d8b088', hair: '#c8c8c0', hairStyle: 'bald', shirt: '#383838', accent: '#787878', age: 'elder' },
    favoriteCategories: ['bonsai-tree'], favoritePlants: ['pinheiro-negro', 'olmo-chines', 'ficus-bonsai'],
    greetings: [
      { pt: 'Você não poda a árvore. Você conversa com o tempo.', en: 'You don\'t prune the tree. You converse with time.' },
      { pt: 'Um galho errado hoje é uma década perdida amanhã.', en: 'A wrong branch today is a lost decade tomorrow.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende bonsais, vasos rasos e tesoura de bonsai', rewardEN: 'Sells bonsai, trays and bonsai scissors', unlock: 'kenji-bonsai' },
      { level: 3, rewardPT: 'Ensina poda de raiz (bonsais vivem mais)', rewardEN: 'Teaches root pruning (bonsai live longer)', unlock: 'kenji-rootprune' },
    ],
    requestPool: [
      { id: 'kenji-ficus', kind: 'plant', textPT: 'Mantenha um ficus-bonsai vivo e belo por uma estação. Então conversamos.', textEN: 'Keep a ginseng ficus alive and beautiful for a season. Then we talk.', target: { plantId: 'ficus-bonsai', count: 1, minQuality: 60 }, rewardMoney: 120, rewardRep: 8, rewardFriendship: 14 },
    ],
  },
  {
    id: 'clara', namePT: 'Clara', nameEN: 'Clara', rolePT: 'Organizadora de competições', roleEN: 'Competition organizer',
    personality: { pt: 'Prancheta na mão, apito no pescoço e um carinho secreto por azaleias.', en: 'Clipboard in hand, whistle on neck, secret soft spot for azaleas.' },
    portrait: { skin: '#e8c0a8', hair: '#a85828', hairStyle: 'ponytail', shirt: '#c84858', accent: '#e88898', age: 'adult' },
    favoriteCategories: ['rose-shrub', 'perennial'], favoritePlants: ['azaleia', 'rosa-hibrida'],
    greetings: [
      { pt: 'Inscrições abertas! Seu canteiro está à altura?', en: 'Entries open! Is your flower bed up to it?' },
      { pt: 'O júri repara em TUDO. Eu treinei o júri.', en: 'The judges notice EVERYTHING. I trained the judges.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Dicas do júri antes de cada competição', rewardEN: 'Judge hints before each competition', unlock: 'clara-hints' },
    ],
    requestPool: [
      { id: 'clara-competir', kind: 'plant', textPT: 'Participe da competição deste mês. Preciso de inscritos à altura!', textEN: 'Enter this month\'s competition. I need worthy contestants!', target: { count: 1 }, rewardMoney: 30, rewardRep: 5, rewardFriendship: 8 },
    ],
  },
  {
    id: 'vicente', namePT: 'Vicente', nameEN: 'Vicente', rolePT: 'Visitante exigente', roleEN: 'Demanding visitor',
    personality: { pt: 'Crítico de jardins com monóculo e caderneta; elogio dele vale ouro.', en: 'A garden critic with monocle and notebook; his praise is worth gold.' },
    portrait: { skin: '#d8b898', hair: '#484038', hairStyle: 'hat', shirt: '#383848', accent: '#8888a8', age: 'elder' },
    favoriteCategories: ['orchid', 'bonsai-tree'], favoritePlants: ['vanda', 'cerejeira-ornamental'],
    greetings: [
      { pt: 'Hmm. Vejo potencial. Enterrado, mas vejo.', en: 'Hmm. I see potential. Buried, but I see it.' },
      { pt: 'Harmonia não se compra. Cultiva-se.', en: 'Harmony can\'t be bought. It is grown.' },
    ],
    friendshipRewards: [
      { level: 3, rewardPT: 'Avaliação detalhada de Harmonia no diário', rewardEN: 'Detailed Harmony review in your journal', unlock: 'vicente-review' },
      { level: 5, rewardPT: 'Recomenda seu jardim (+visitantes VIP)', rewardEN: 'Recommends your garden (+VIP visitors)', unlock: 'vicente-vip' },
    ],
    requestPool: [
      { id: 'vicente-harmonia', kind: 'plant', textPT: 'Alcance 300 de Harmonia e talvez eu tire o chapéu.', textEN: 'Reach 300 Harmony and perhaps I\'ll tip my hat.', target: { count: 300 }, rewardMoney: 150, rewardRep: 15, rewardFriendship: 10, minFriendship: 10 },
    ],
  },
  {
    id: 'amelia', namePT: 'Amélia', nameEN: 'Amélia', rolePT: 'Senhora do jardim antigo', roleEN: 'Lady of the old garden',
    personality: { pt: 'Guarda fotos amareladas do jardim que já foi o mais bonito da rua.', en: 'Keeps yellowed photos of a garden once the street\'s finest.' },
    portrait: { skin: '#e8c8b0', hair: '#e8e0d8', hairStyle: 'bun', shirt: '#7888a8', accent: '#a8b8d8', age: 'elder' },
    favoriteCategories: ['rose-shrub', 'bulb'], favoritePlants: ['rosa-hibrida', 'lirio-do-vale', 'hortensia'],
    greetings: [
      { pt: 'Meu Augusto plantou aquela roseira em 1969…', en: 'My Augusto planted that rosebush in 1969…' },
      { pt: 'Jardins não morrem. Só esperam alguém voltar.', en: 'Gardens don\'t die. They just wait for someone to return.' },
    ],
    friendshipRewards: [
      { level: 2, rewardPT: 'Missões de restauração de jardins', rewardEN: 'Garden restoration missions', unlock: 'amelia-restore' },
      { level: 4, rewardPT: 'Herda sementes antigas raras', rewardEN: 'You inherit rare heirloom seeds', unlock: 'amelia-heirloom' },
    ],
    requestPool: [
      { id: 'amelia-rosas', kind: 'plant', textPT: 'Uma rosa como as de antigamente. Pode ser?', textEN: 'A rose like they used to be. Could you?', target: { plantId: 'rosa-hibrida', count: 1, minQuality: 60 }, rewardMoney: 70, rewardRep: 5, rewardFriendship: 14 },
    ],
  },
  {
    id: 'noah', namePT: 'Noah', nameEN: 'Noah', rolePT: 'Criador de terrários', roleEN: 'Terrarium maker',
    personality: { pt: 'Constrói florestas dentro de potes de vidro e dá nome a cada musgo.', en: 'Builds forests inside glass jars and names every moss.' },
    portrait: { skin: '#c8a078', hair: '#2a3a28', hairStyle: 'curly', shirt: '#58a878', accent: '#88d8a8', age: 'young' },
    favoriteCategories: ['tropical', 'carnivorous'], favoritePlants: ['fitonia', 'drosera', 'pilea'],
    greetings: [
      { pt: 'Um terrário é um planeta com tampa. Sou meio deus, meio zelador.', en: 'A terrarium is a planet with a lid. I\'m half god, half janitor.' },
      { pt: 'Musgo é a carpete do paraíso.', en: 'Moss is heaven\'s carpet.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Vende terrários e ensina a montá-los', rewardEN: 'Sells terrariums and teaches assembly', unlock: 'noah-terrarium' },
    ],
    requestPool: [
      { id: 'noah-fitonia', kind: 'plant', textPT: 'Duas fitônias para um mundo novo que estou criando.', textEN: 'Two nerve plants for a new world I\'m building.', target: { plantId: 'fitonia', count: 2 }, rewardMoney: 35, rewardRep: 3, rewardFriendship: 10 },
    ],
  },
  {
    id: 'eva', namePT: 'Eva', nameEN: 'Eva', rolePT: 'Especialista em aquáticas', roleEN: 'Aquatic plant specialist',
    personality: { pt: 'Anda de galochas o ano todo e conhece cada libélula pelo voo.', en: 'Wears wellies year-round and knows each dragonfly by its flight.' },
    portrait: { skin: '#b89068', hair: '#684828', hairStyle: 'braid', shirt: '#4878a8', accent: '#88b8d8', age: 'adult' },
    favoriteCategories: ['aquatic'], favoritePlants: ['ninfeia', 'lotus', 'papiro'],
    greetings: [
      { pt: 'Água parada, jardim vivo. Confia.', en: 'Still water, living garden. Trust me.' },
      { pt: 'O lótus dorme dois mil anos e ainda germina. Nós, nem oito horas.', en: 'A lotus seed sleeps two thousand years and still sprouts. We can\'t manage eight hours.' },
    ],
    friendshipRewards: [
      { level: 1, rewardPT: 'Desbloqueia o Jardim Aquático e vasos aquáticos', rewardEN: 'Unlocks the Water Garden and aquatic tubs', unlock: 'area-jardim-aquatico' },
      { level: 3, rewardPT: 'Libélulas visitam seus lagos', rewardEN: 'Dragonflies visit your ponds', unlock: 'eva-dragonflies' },
    ],
    requestPool: [
      { id: 'eva-ninfeia', kind: 'plant', textPT: 'Floresça uma ninféia e o lago te pagará em libélulas.', textEN: 'Bloom a water lily and the pond will pay you in dragonflies.', target: { plantId: 'ninfeia', count: 1 }, rewardMoney: 90, rewardRep: 7, rewardFriendship: 14 },
    ],
  },
];

export const NPC_BY_ID: Record<string, NpcData> = {};
for (const n of NPCS) NPC_BY_ID[n.id] = n;
