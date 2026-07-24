// Skill Tree do Técnico — progressão persistente por conta do usuário.
// XP é DERIVADO das temporadas e títulos que existem em todos os saves do
// usuário (a fonte da verdade é o próprio game_state). Nós desbloqueados
// e XP gasto ficam em localStorage por usuário.
//
// Todos os efeitos são sutis. A árvore inteira leva ~100 temporadas
// de conta ativa pra ser 100% completada.

export type CoachTree =
  | "raiz"
  | "tatico"
  | "mental"
  | "medico"
  | "olheiro"
  | "legado";

export interface CoachNode {
  id: string;
  tree: CoachTree;
  order: number; // ordem dentro do tronco (0 = raiz do tronco)
  icon: string;
  name: string;
  cost: number; // XP
  short: string; // efeito curto
  desc: string; // descrição completa
  requires?: string[]; // ids obrigatórios
  tier?: 1 | 2; // 1 = árvore original (default), 2 = Mestre Estrategista
}

export const COACH_TREES: { id: CoachTree; label: string; color: string; icon: string; blurb: string }[] = [
  { id: "raiz",    label: "Raiz",       color: "#e5c15b", icon: "🌱", blurb: "Fundação. Bônus constantes de vestiário." },
  { id: "tatico",  label: "Tático",     color: "#5aa9ff", icon: "⚔️", blurb: "Melhora o rendimento dentro da tática que já rolou." },
  { id: "mental",  label: "Mental",     color: "#c084fc", icon: "🧠", blurb: "Sangue frio, decisão e resposta à pressão." },
  { id: "medico",  label: "Físico",     color: "#6ee7a1", icon: "🏥", blurb: "Frescor e longevidade dos jogadores." },
  { id: "olheiro", label: "Olheiro",    color: "#ffb266", icon: "🔍", blurb: "Draft e pool de jogadores." },
  { id: "legado",  label: "Legado",     color: "#f0d78c", icon: "🏆", blurb: "Meta-progressão: XP, títulos e ranking." },
];


// Convenção de IDs: `${tree}.${slug}`.
export const COACH_NODES: CoachNode[] = [
  // ─── RAIZ
  { id: "raiz.confianca",  tree: "raiz", order: 0, icon: "🤝", name: "Confiança do vestiário",
    cost: 3, short: "+0,04 OVR médio no time (sempre)",
    desc: "Bônus permanente pequeno em todos os jogadores do seu XI, o tempo todo. É a 1ª de 3 parcelas do tronco Raiz — completando as 3, o time todo fica +0,12 OVR mais forte em qualquer partida." },
  { id: "raiz.treino",     tree: "raiz", order: 1, icon: "🏋️", name: "Rotina de treino",
    cost: 3, short: "+0,04 OVR sempre · +0,20 OVR no jogo após vitória",
    desc: "Mais +0,04 OVR permanente (soma com o nó anterior) E, sempre que você ganha uma partida, o próximo jogo começa com +0,20 OVR extra em cima disso — o time entra embalado depois de vencer.", requires: ["raiz.confianca"] },
  { id: "raiz.analise",    tree: "raiz", order: 2, icon: "📋", name: "Análise pós-jogo",
    cost: 4, short: "+0,04 OVR sempre · +0,30 OVR no jogo após derrota",
    desc: "Fecha o bônus permanente do tronco Raiz em +0,12 OVR. Bônus extra: perdeu uma partida? A próxima começa com +0,30 OVR — sua equipe reage aos tropeços em vez de afundar.", requires: ["raiz.treino"] },

  // ─── TÁTICO — cada nó soma uma parcela do multiplicador de formação (máx +10%)
  // Nomes propositalmente NÃO usam termos de estilo tático (Bola parada, Contra-ataque, Posse)
  // para não confundir com os estilos escolhidos pelo jogador.
  { id: "tatico.leitura",   tree: "tatico", order: 0, icon: "👁️", name: "Análise de vídeo",
    cost: 4, short: "+2% no bônus da sua formação",
    desc: "Toda formação (4-3-3, 3-5-2, etc.) já dá um bônus tático nas partidas. Esse nó aumenta esse bônus em +2%. Vale pra QUALQUER formação que você usar. É a 1ª parcela — completando o tronco Tático, o bônus da formação vira +10% total." },
  { id: "tatico.intervalo", tree: "tatico", order: 1, icon: "⏱️", name: "Ajustes no vestiário",
    cost: 5, short: "+2% no bônus da sua formação",
    desc: "Mais +2% no bônus da formação (independente de qual você escolheu). Somando com o nó anterior já são +4%.", requires: ["tatico.leitura"] },
  { id: "tatico.superior",  tree: "tatico", order: 2, icon: "📈", name: "Pressão nos fracos",
    cost: 6, short: "+1% formação · +0,15 no ataque contra times piores",
    desc: "Some +1% no bônus da formação E dá +0,15 no seu ataque quando o adversário tem OVR menor que o seu. Faz seu time massacrar os times mais fracos com mais gols.", requires: ["tatico.intervalo"] },
  { id: "tatico.contragolpe", tree: "tatico", order: 3, icon: "🎯", name: "Instinto matador",
    cost: 6, short: "+1% formação · fecha +0,30 no ataque vs times piores",
    desc: "Some +1% no bônus da formação e completa o bônus ofensivo contra times mais fracos em +0,30 no ataque total (junto com o nó anterior). Vale sempre.", requires: ["tatico.superior"] },
  { id: "tatico.paradas",   tree: "tatico", order: 4, icon: "⛳", name: "Finalização treinada",
    cost: 7, short: "+1% formação · ~2 gols a mais por temporada",
    desc: "Some +1% no bônus da formação e aumenta o ritmo de gols do seu time em ~0,05 por partida — dá ~2 gols a mais numa temporada de 38 rodadas. Vale sempre.", requires: ["tatico.contragolpe"] },
  { id: "tatico.posse",     tree: "tatico", order: 5, icon: "🫁", name: "Preparo físico",
    cost: 8, short: "+1% formação · adv sofre ~2 gols a menos no 2º tempo",
    desc: "Seu time cansa menos que o adversário no fim do jogo. O rival cria ~0,05 gols a menos por partida no 2º tempo — ~2 gols a menos sofridos por temporada. Some também +1% na formação.", requires: ["tatico.paradas"] },
  { id: "tatico.master",    tree: "tatico", order: 6, icon: "🎓", name: "Mestre da tática",
    cost: 12, short: "+2% formação (fecha +10%) · +2 gols/temporada",
    desc: "Nó final do tronco Tático. Fecha o bônus da formação em +10% total e some mais ~2 gols na temporada no ritmo de ataque. Vale pra qualquer formação, em qualquer competição.", requires: ["tatico.posse"] },

  // ─── MENTAL — anti-zebra distribuído (5% por nó, máx -30%)
  { id: "mental.foco",      tree: "mental", order: 0, icon: "🎯", name: "Jogadores focados",
    cost: 4, short: "-5% chance de sofrer zebra",
    desc: "'Zebra' é quando um time bem mais fraco te vence de surpresa. Esse nó reduz em 5% a chance de você sofrer uma zebra assim. É a 1ª de 6 parcelas — completando o tronco Mental inteiro, chega em -30% de chance de tomar zebra." },
  { id: "mental.sangue",    tree: "mental", order: 1, icon: "🥶", name: "Sangue frio",
    cost: 5, short: "-5% zebra · +2% de acerto em pênaltis",
    desc: "Mais -5% na chance de sofrer zebra E +2% a mais de chance de converter cada pênalti que você bater (nas disputas por pênaltis do mata-mata).", requires: ["mental.foco"] },
  { id: "mental.cabeca",    tree: "mental", order: 2, icon: "🧊", name: "Cabeça no lugar",
    cost: 6, short: "-5% zebra · +ritmo de ataque nos 15 min finais",
    desc: "Mais -5% na chance de zebra E seu time cria mais chances nos últimos 15 minutos de cada partida — bom pra buscar um gol no fim.", requires: ["mental.sangue"] },
  { id: "mental.aprender",  tree: "mental", order: 3, icon: "📚", name: "Aprender com derrotas",
    cost: 7, short: "-5% zebra · +0,20 OVR após levar goleada",
    desc: "Mais -5% na chance de zebra. Bônus extra: se você levar uma goleada (3+ gols de diferença), o próximo jogo começa com +0,20 OVR em todo o time — reação ao tombo.", requires: ["mental.cabeca"] },
  { id: "mental.decisao",   tree: "mental", order: 4, icon: "🔥", name: "Espírito de decisão",
    cost: 8, short: "-5% zebra · +0,50 OVR na FINAL da Liberta/Sula/Mundial",
    desc: "Mais -5% na chance de zebra. Só no JOGO DA FINAL da Libertadores, Sul-Americana ou Mundial (não vale em semifinal, oitavas, nem no Brasileirão), seu time entra com +0,50 OVR em todos os jogadores. Sozinho ele dá +0,50; se você também desbloquear o próximo nó (Grande jogador aparece), os dois SOMAM e o bônus total na final vira +1,00 OVR.", requires: ["mental.aprender"] },
  { id: "mental.craque",    tree: "mental", order: 5, icon: "⭐", name: "Grande jogador aparece",
    cost: 10, short: "-5% zebra · +0,50 OVR na final (soma com o anterior = +1,00) · +2 OVR craque no mata-mata",
    desc: "Nó final do tronco Mental. Fecha o anti-zebra em -30% total. Adiciona OUTROS +0,50 OVR na FINAL da Liberta/Sula/Mundial — como o nó anterior (Espírito de decisão) já dá +0,50, os dois juntos totalizam +1,00 OVR em cada jogador na final. Além disso, seu melhor jogador (maior OVR do time) recebe +2 OVR em TODOS os jogos de mata-mata das copas continentais (oitavas até a final).", requires: ["mental.decisao"] },


  // ─── MÉDICO / FÍSICO
  { id: "medico.preparo",   tree: "medico", order: 0, icon: "💪", name: "Preparação física",
    cost: 5, short: "+0,02 OVR sempre · +0,10 OVR depois da rodada 20",
    desc: "Bônus passivo pequeno o tempo todo. A partir da rodada 20 do Brasileirão (segundo turno), o cansaço bate nos rivais — seu time ganha mais +0,10 OVR extra até o fim da temporada." },
  { id: "medico.recovery",  tree: "medico", order: 1, icon: "❄️", name: "Recuperação acelerada",
    cost: 6, short: "+0,02 OVR sempre · +0,20 OVR em jogos equilibrados",
    desc: "Mais bônus passivo. Se, ANTES do apito inicial, a diferença de OVR entre o seu time e o adversário for de até 2 pontos (para cima OU para baixo — ex.: você 85 vs adversário 83, 84, 85, 86 ou 87), seu time entra AQUELA partida com +0,20 OVR. O bônus vale só naquele jogo; se a diferença passar de 2, não ativa.", requires: ["medico.preparo"] },
  { id: "medico.nutricao",  tree: "medico", order: 2, icon: "🥗", name: "Nutrição de alto nível",
    cost: 6, short: "+0,02 OVR médio no time (sempre)",
    desc: "Mais uma parcela do bônus passivo do tronco Físico. Vale pra qualquer jogo, o tempo todo.", requires: ["medico.recovery"] },
  { id: "medico.corpo",     tree: "medico", order: 3, icon: "🧬", name: "Corpo & mente",
    cost: 7, short: "+0,02 OVR sempre · sinergia Preparo+Recovery vira +0,30",
    desc: "Fecha o bônus passivo do tronco Físico em +0,08 OVR. Se você já tem os nós 'Preparação física' e 'Recuperação acelerada', a sinergia entre eles é potencializada e o bônus combinado vira +0,30 OVR nas situações que ativam.", requires: ["medico.nutricao"] },

  // ─── OLHEIRO
  { id: "olheiro.regional", tree: "olheiro", order: 0, icon: "🗺️", name: "Vestiário unido",
    cost: 5, short: "+0,05 OVR passivo permanente no elenco",
    desc: "Um vestiário afinado rende dentro de campo. Todos os jogadores do seu elenco ganham +0,05 OVR permanente em todas as partidas (Brasileirão, copas e Mundial). Com a versão II dobra pra +0,10 OVR." },
  { id: "olheiro.rede",     tree: "olheiro", order: 1, icon: "🌐", name: "Rede internacional",
    cost: 7, short: "+1 troca de pool por competição",
    desc: "Durante o draft você pode 'trocar' o pool inteiro pra ver 3 jogadores diferentes (skip). Esse nó te dá +1 skip por campanha, ou seja, mais uma chance de descartar um pool ruim e ver outros nomes.", requires: ["olheiro.regional"] },
  { id: "olheiro.radar",    tree: "olheiro", order: 2, icon: "🛰️", name: "Radar de posição",
    cost: 8, short: "Draft de LENDA: garante 1 candidato de posição que ainda falta",
    desc: "Age no draft de LENDA (rodada especial 👑). Se ainda falta preencher alguma posição no seu time, o pool de lendas garante 1 candidato daquela posição. Com a versão II (tier-2) garante 2 posições diferentes.", requires: ["olheiro.rede"] },
  { id: "olheiro.numeros",  tree: "olheiro", order: 3, icon: "🔢", name: "Bom com números",
    cost: 8, short: "Draft: mostra o OVR com casa decimal (ex: 82,7 em vez de 83)",
    desc: "Normalmente o jogo arredonda o OVR pra número inteiro. Com esse nó, aparece a casa decimal (ex: 82,7 · 82,4 · 81,9), então dá pra escolher entre dois jogadores de 'OVR 82' sabendo qual é o mais forte de verdade. Só serve pra ver a informação melhor no draft — não muda atributos nem bônus.", requires: ["olheiro.radar"] },
  { id: "olheiro.contato",  tree: "olheiro", order: 4, icon: "📞", name: "Contato direto",
    cost: 10, short: "1x por campanha: espia os jogadores da PRÓXIMA rodada do draft",
    desc: "No draft você escolhe jogadores em várias rodadas seguidas. Esse nó libera um botão que, 1 vez por campanha, revela antes da hora quais 3 jogadores vão aparecer na PRÓXIMA rodada. Serve pra decidir melhor a rodada atual — ex: se eu sei que vem um zagueirão forte na próxima, posso pegar um atacante agora sem medo.", requires: ["olheiro.numeros"] },
  { id: "olheiro.cartola",  tree: "olheiro", order: 5, icon: "🎩", name: "Cartola dedicado",
    cost: 12, short: "Draft: a 5ª e a 10ª escolha ganham +1 OVR permanente (+2 com o II)",
    desc: "Contratos bem feitos rendem OVR de graça. Toda vez que você faz a 5ª pick (e depois a 10ª) do draft, o jogador escolhido entra no elenco com +1 OVR permanente durante toda aquela campanha. Ao desbloquear a versão II (árvore tier-2), o bônus dobra pra +2 OVR nessas mesmas duas picks. Dica: guarde essas duas escolhas pra alvos que você realmente vai usar como titular.", requires: ["olheiro.contato"] },

  // ─── LEGADO
  { id: "legado.estudante", tree: "legado", order: 0, icon: "📖", name: "Estudante do jogo",
    cost: 6, short: "+20% XP em toda temporada",
    desc: "Todo XP que você ganhar (por concluir temporadas, ganhar títulos, bicampeonatos) é aumentado em +20%. Acelera pra caramba o desbloqueio dos outros nós da árvore." },
  { id: "legado.mentor",    tree: "legado", order: 1, icon: "🧙", name: "Mentor de craques",
    cost: 7, short: "3 títulos na temporada: +1 lenda no 1º draft da próxima",
    desc: "Se você conquistar 3+ títulos numa mesma temporada (Brasileirão/Liberta/Sula/Mundial contam), na TEMPORADA SEGUINTE o primeiro draft bônus (após o fim do Brasileirão) vem com +1 lenda extra. O bônus é consumido uma única vez: se na temporada seguinte você não conquistar 3+ títulos de novo, os drafts voltam ao normal.", requires: ["legado.estudante"] },
  { id: "legado.dinastia",  tree: "legado", order: 2, icon: "👑", name: "Dinastia",
    cost: 8, short: "Bicampeonato consecutivo: +2 XP extra",
    desc: "Ganhou o mesmo torneio 2 temporadas seguidas (bi do Brasileirão, da Liberta ou do Mundial)? Você ganha +2 XP EXTRA na segunda conquista. Dá pra empilhar: tri = +2 XP a cada temporada mantida.", requires: ["legado.mentor"] },
  { id: "legado.idolo",     tree: "legado", order: 3, icon: "🗿", name: "Ídolo eterno",
    cost: 9, short: "A cada 10 títulos totais: +0,10 OVR permanente (máx +1,00)",
    desc: "Some TODOS os títulos que você já ganhou em TODAS as suas carreiras (soma vitalícia). A cada 10 títulos, seu time em jogo ganha +0,10 OVR permanente. Máximo: +1,00 OVR (quando chegar em 100 títulos históricos). É uma recompensa de longuíssimo prazo pra quem joga muito.", requires: ["legado.dinastia"] },
  { id: "legado.aposentar", tree: "legado", order: 4, icon: "🏆", name: "Sala de troféus",
    cost: 10, short: "+0,20 OVR permanente em todo o elenco",
    desc: "Ver os troféus na sala inspira o vestiário. Todos os jogadores do seu elenco ganham +0,20 OVR permanente em toda partida (Brasileirão, copas e Mundial). Com a versão II (tier-2) o bônus dobra pra +0,40 OVR permanente.", requires: ["legado.idolo"] },
];

// Marca tier=1 explicitamente em todos os nós originais.
for (const n of COACH_NODES) n.tier = 1;

// ══════════════════════════════════════════════════════════════════════
// SEGUNDA ÁRVORE — "Mestre Estrategista"
// Desbloqueia apenas quando a árvore tier-1 estiver 100% completa.
// Mirror dos nós tier-1 com efeitos e custos 1.2x, + 5 nós exclusivos.
// ══════════════════════════════════════════════════════════════════════

// Descrições precisas de cada espelho tier-2: reflete SÓ o que de fato
// é aplicado em getCoachEffects (evita prometer efeitos que o mirror
// não consegue dobrar — casos de UI/booleans/nós substituídos por
// exclusivos ficam explicados abaixo).
const TIER2_META: Record<string, { short: string; desc: string }> = {
  "raiz.confianca": {
    short: "+0,04 OVR passivo adicional (nesse nó)",
    desc: "Dobra a parcela passiva de 'Confiança do vestiário': o +0,04 OVR do nó vira +0,08 OVR permanente. Vale em toda partida.",
  },
  "raiz.treino": {
    short: "+0,04 OVR passivo adicional (nesse nó)",
    desc: "Dobra a parcela passiva da 'Rotina de treino' (+0,04 → +0,08 OVR permanente). Obs.: o bônus circunstancial de +0,20 OVR após vitória já é aplicado pelo nó tier-1 e não é duplicado aqui.",
  },
  "raiz.analise": {
    short: "+0,04 OVR passivo adicional (fecha o tronco Raiz em +0,24)",
    desc: "Dobra a parcela passiva da 'Análise pós-jogo' (+0,04 → +0,08 OVR). Com os três espelhos do tronco Raiz ativos, o passivo do tronco chega a +0,24 OVR permanente. O bônus de +0,30 OVR após derrota continua vindo apenas do nó tier-1.",
  },

  "tatico.leitura": {
    short: "+2% adicional no bônus da sua formação",
    desc: "Dobra a parcela de +2% da 'Análise de vídeo' no bônus da formação (soma +2% adicionais em cima do que o nó tier-1 já dá).",
  },
  "tatico.intervalo": {
    short: "+2% adicional no bônus da sua formação",
    desc: "Dobra a parcela de +2% dos 'Ajustes no vestiário' (soma +2% adicionais no bônus da formação).",
  },
  "tatico.superior": {
    short: "+1% formação · +0,15 ataque vs times piores (adicionais)",
    desc: "Dobra 'Pressão nos fracos': soma +1% extra no bônus da formação e mais +0,15 no ataque quando o adversário tem OVR menor que o seu.",
  },
  "tatico.contragolpe": {
    short: "+1% formação · +0,15 ataque vs times piores (adicionais)",
    desc: "Dobra 'Instinto matador': +1% adicional na formação e mais +0,15 no ataque contra times mais fracos. Com este e o espelho de 'Pressão nos fracos', o bônus ofensivo contra fracos pode fechar em +0,60.",
  },
  "tatico.paradas": {
    short: "+1% formação · +0,05 no ritmo de gols (adicionais)",
    desc: "Dobra 'Finalização treinada': +1% adicional no bônus da formação e mais +0,05 no ritmo de ataque do time em toda partida.",
  },
  "tatico.posse": {
    short: "+1% adicional no bônus da sua formação",
    desc: "Dobra a parcela de +1% do 'Preparo físico' no bônus da formação. Obs.: a queda de gols sofridos no 2º tempo é aplicada pelo nó tier-1 e não recebe dobradinha aqui.",
  },
  "tatico.master": {
    short: "+2% formação · +0,05 no ritmo de gols (adicionais)",
    desc: "Dobra 'Mestre da tática': +2% adicional no bônus da formação e mais +0,05 no ritmo de ataque. Com todo o tronco Tático espelhado, o bônus da formação pode dobrar (chega a até +20%).",
  },

  "mental.foco": {
    short: "-5% adicional na chance de sofrer zebra",
    desc: "Dobra a parcela anti-zebra dos 'Jogadores focados' (mais -5%). O teto global do anti-zebra é -60% com o tronco Mental inteiro espelhado.",
  },
  "mental.sangue": {
    short: "-5% zebra · +2% em pênaltis (adicionais)",
    desc: "Dobra 'Sangue frio': mais -5% na chance de sofrer zebra e mais +2% de conversão em cada cobrança de pênalti nas disputas do mata-mata.",
  },
  "mental.cabeca": {
    short: "-5% zebra · +ritmo de ataque nos 15 min finais (adicionais)",
    desc: "Dobra 'Cabeça no lugar': mais -5% na chance de zebra e mais volume ofensivo nos últimos 15 minutos.",
  },
  "mental.aprender": {
    short: "-5% zebra · +0,20 OVR extra após levar goleada",
    desc: "Dobra 'Aprender com derrotas': mais -5% na chance de zebra e o bônus pós-goleada (3+ gols) no jogo seguinte vira +0,40 OVR em todo o elenco.",
  },
  "mental.decisao": {
    short: "-5% zebra · +0,50 OVR extra nas finais",
    desc: "Dobra 'Espírito de decisão': mais -5% na chance de zebra e mais +0,50 OVR nos jogos de FINAL da Libertadores, Sul-Americana ou Mundial.",
  },
  "mental.craque": {
    short: "-5% zebra · +0,50 OVR final · +2 OVR craque (adicionais)",
    desc: "Dobra 'Grande jogador aparece': mais -5% na chance de zebra, mais +0,50 OVR na FINAL e mais +2 OVR no seu craque (maior OVR do time) durante todo o mata-mata continental. Com os dois espelhos (decisão + craque) as finais podem receber +2,00 OVR e o craque +4 OVR no mata-mata.",
  },

  "medico.preparo": {
    short: "+0,02 OVR passivo adicional (nesse nó)",
    desc: "Dobra a parcela passiva da 'Preparação física' (+0,02 → +0,04 OVR permanente). Obs.: o +0,10 OVR extra a partir da rodada 20 já é aplicado pelo tier-1.",
  },
  "medico.recovery": {
    short: "+0,02 OVR passivo · +0,20 OVR em jogos equilibrados (adicionais)",
    desc: "Dobra 'Recuperação acelerada': +0,02 OVR passivo a mais e o bônus em partidas com gap de OVR ≤ 2 vira +0,40 OVR naquele jogo.",
  },
  "medico.nutricao": {
    short: "+0,02 OVR passivo adicional (nesse nó)",
    desc: "Dobra a parcela passiva da 'Nutrição de alto nível' (+0,02 → +0,04 OVR permanente).",
  },
  "medico.corpo": {
    short: "+0,02 OVR passivo adicional (fecha tronco Físico em +0,16)",
    desc: "Dobra a parcela passiva de 'Corpo & mente'. Com o tronco Físico inteiro espelhado, o passivo do tronco chega a +0,16 OVR permanente. A sinergia Preparo+Recovery continua vindo do tier-1.",
  },

  "olheiro.regional": {
    short: "Pré-requisito do tronco Olheiro II (efeito extra vem de 'Vestiário blindado')",
    desc: "O passivo de 'Vestiário unido' NÃO é dobrado por este espelho — o +0,05 OVR permanente adicional vem do nó exclusivo do tier-2 ('Vestiário blindado'). Desbloqueie este espelho apenas para acessar os próximos nós do tronco Olheiro no tier-2.",
  },
  "olheiro.rede": {
    short: "+1 troca de pool adicional por campanha",
    desc: "Dobra a 'Rede internacional': mais +1 skip de pool por campanha (total de 2 skips extras com tier-1 + espelho).",
  },
  "olheiro.radar": {
    short: "Draft de LENDA: garante 2 posições em vez de 1",
    desc: "Dobra o 'Radar de posição': no draft de LENDA o pool passa a garantir 2 candidatos de posições diferentes que ainda faltem no seu time.",
  },
  "olheiro.numeros": {
    short: "Pré-requisito do tronco Olheiro II (efeito de UI já é 100%)",
    desc: "'Bom com números' é um efeito de exibição (mostra o OVR com casa decimal no draft) e não tem valor numérico a dobrar. Este espelho serve apenas como pré-requisito para os próximos nós do tronco Olheiro no tier-2.",
  },
  "olheiro.contato": {
    short: "Pré-requisito do tronco Olheiro II (efeito único já é 100%)",
    desc: "'Contato direto' já entrega o efeito completo no tier-1 (1 espiada da próxima rodada por campanha) e não é dobrado. Este espelho serve apenas como pré-requisito para os próximos nós do tronco Olheiro no tier-2.",
  },
  "olheiro.cartola": {
    short: "5ª e 10ª pick do draft: +1 OVR adicional (total +2)",
    desc: "Dobra o 'Cartola dedicado': a 5ª e a 10ª escolha do draft entram no elenco com +2 OVR permanente durante toda a campanha.",
  },

  "legado.estudante": {
    short: "+20% XP adicional (multiplicativo → total 1,44×)",
    desc: "Dobra o 'Estudante do jogo': o multiplicador de XP vira 1,20 × 1,20 = 1,44, ou seja, +44% de XP em cada temporada.",
  },
  "legado.mentor": {
    short: "Pré-requisito do tronco Legado II (gatilho já é 100%)",
    desc: "'Mentor de craques' já garante 1 lenda extra no primeiro draft bônus da temporada seguinte quando você fecha 3+ títulos, sem valor numérico a dobrar. Este espelho serve apenas como pré-requisito para os próximos nós do tronco Legado no tier-2.",
  },
  "legado.dinastia": {
    short: "+2 XP adicional em bicampeonato consecutivo",
    desc: "Dobra a 'Dinastia': o bônus por manter o mesmo torneio 2 temporadas seguidas vira +4 XP na conquista repetida (empilha em tri, tetra, etc.).",
  },
  "legado.idolo": {
    short: "Pré-requisito do 'DNA do clube' (teto só dobra com o nó exclusivo)",
    desc: "O teto do 'Ídolo eterno' NÃO é dobrado por este espelho — quem dobra o cap (de +1,00 para +2,00 OVR) é o nó exclusivo do tier-2 ('DNA do clube'). Este espelho serve apenas como pré-requisito para o DNA do clube.",
  },
  "legado.aposentar": {
    short: "+0,20 OVR passivo adicional no elenco (total +0,40)",
    desc: "Dobra a 'Sala de troféus': cada jogador do seu elenco ganha +0,40 OVR permanente em todas as partidas.",
  },
};

const TIER2_MIRROR: CoachNode[] = COACH_NODES.map((n) => {
  const meta = TIER2_META[n.id];
  return {
    id: `t2.${n.id}`,
    tree: n.tree,
    order: 100 + n.order, // vem depois dos tier-1
    icon: n.icon,
    name: `${n.name} II`,
    cost: n.cost * 3,
    short: meta?.short ?? `Dobra o efeito de "${n.name}"`,
    desc: meta?.desc ?? `Aplica pela segunda vez o efeito do nó "${n.name}". Requer o nó tier-1 correspondente já desbloqueado.`,
    requires: [n.id, ...(n.requires ?? []).map((r) => `t2.${r}`)],
    tier: 2,
  };
});

const TIER2_EXCLUSIVE: CoachNode[] = [
  { id: "t2.raiz.video", tree: "raiz", order: 200, tier: 2, icon: "🎥",
    name: "Análise de vídeo estendida",
    cost: 24, short: "Bônus 'após derrota' passa a durar 2 jogos",
    desc: "Normalmente o bônus de +0,30 OVR pós-derrota (do nó 'Análise pós-jogo') vale só no jogo seguinte. Com esse nó, ele passa a valer nos DOIS jogos seguintes — mais tempo pra reagir depois de tropeçar.",
    requires: ["t2.raiz.analise"] },
  { id: "t2.tatico.quimica", tree: "tatico", order: 201, tier: 2, icon: "🔥",
    name: "Embalo vencedor",
    cost: 30, short: "3+ vitórias seguidas: +ritmo de gols enquanto durar a sequência",
    desc: "Emplacou 3 vitórias em seguida? A confiança do time vira gol: +0,10 no ritmo de ataque a partir do 3º jogo da sequência e enquanto ela continuar viva. Empate ou derrota zera o contador — precisa engatar 3 vitórias de novo pra reativar.",
    requires: ["t2.tatico.master"] },
  { id: "t2.mental.psicologo", tree: "mental", order: 202, tier: 2, icon: "🛋️",
    name: "Preparador mental",
    cost: 27, short: "Perdendo por 2+ gols: +ataque no resto do jogo",
    desc: "Se o placar estiver 2 gols ou mais contra você durante uma partida, seus jogadores sobem a intensidade: +0,15 no ritmo de ataque até o final do jogo. Ajuda a buscar viradas.",
    requires: ["t2.mental.craque"] },
  { id: "t2.olheiro.global", tree: "olheiro", order: 203, tier: 2, icon: "🌍",
    name: "Vestiário blindado",
    cost: 33, short: "+0,05 OVR passivo permanente adicional (soma com Vestiário unido)",
    desc: "Fortalece o efeito de 'Vestiário unido' da árvore I. Soma mais +0,05 OVR permanente no elenco em todas as partidas — total de +0,10 OVR quando os dois nós estão ativos.",
    requires: ["t2.olheiro.cartola"] },
  { id: "t2.legado.dna", tree: "legado", order: 204, tier: 2, icon: "🧬",
    name: "DNA do clube",
    cost: 36, short: "Cap do 'Ídolo eterno' dobra: vira +2,00 OVR",
    desc: "O nó 'Ídolo eterno' dá +0,10 OVR a cada 10 títulos históricos, com teto de +1,00 OVR (100 títulos). Esse nó dobra o teto pra +2,00 OVR (200 títulos). Recompensa de MUITO longo prazo pra jogadores veteranos.",
    requires: ["t2.legado.aposentar"] },
];

export const COACH_NODES_TIER2: CoachNode[] = [...TIER2_MIRROR, ...TIER2_EXCLUSIVE];

// Lista combinada usada em cálculos globais.
export const ALL_COACH_NODES: CoachNode[] = [...COACH_NODES, ...COACH_NODES_TIER2];

export const TOTAL_XP_TIER1 = COACH_NODES.reduce((s, n) => s + n.cost, 0);
export const TOTAL_XP_TIER2 = COACH_NODES_TIER2.reduce((s, n) => s + n.cost, 0);
export const TOTAL_XP_TO_COMPLETE = TOTAL_XP_TIER1 + TOTAL_XP_TIER2;

export function isTier1Complete(unlocked: Set<string>): boolean {
  return COACH_NODES.every((n) => unlocked.has(n.id));
}


// ─── XP derivado do histórico do usuário ──────────────────────────────

// Compat: shape mínimo do game_state que precisamos ler.
interface SnapForXP {
  season: number;
  brasileiraoPos: number | null;
  trophies?: { brasileirao?: boolean; libertadores?: boolean; sulamericana?: boolean; mundial?: boolean };
  koExits?: unknown;
  unbeaten?: boolean; // opcional; se não existir, contamos como falso
}
interface StateForXP {
  season?: number;
  phase?: string;
  teamName?: string;
  xpCampaignId?: string;
  trophies?: SnapForXP["trophies"];
  seasonHistory?: SnapForXP[];
  brasileiraoUnbeaten?: boolean;
  continentalUnbeaten?: boolean;
}

// Une o histórico com a temporada atual. Antes só contávamos XP da temporada
// atual quando ela estava totalmente encerrada (eliminado/campeão/etc.), o que
// escondia o XP durante toda a fase de copas — o jogador ganhava o Brasileirão
// mas não via nada aparecer na árvore. Agora incluímos a temporada corrente
// sempre que ela existe (não duplicada no histórico); os troféus já conquistados
// entram no XP em tempo real, e novos troféus somam à medida que caem.
function collectSeasons(gs: StateForXP): SnapForXP[] {
  const history = gs.seasonHistory ?? [];
  const currentSeason = gs.season ?? (history.length + 1);
  const alreadyIn = history.some((h) => h.season === currentSeason);
  if (alreadyIn) return history;
  const trophies = gs.trophies ?? {};
  const hasCurrentMilestone =
    !!trophies.brasileirao ||
    !!trophies.libertadores ||
    !!trophies.sulamericana ||
    !!trophies.mundial ||
    gs.phase === "seasonEnd" ||
    gs.phase === "bonusDraft" ||
    gs.phase === "compIntro" ||
    gs.phase === "compGroupMatch" ||
    gs.phase === "compGroupResult" ||
    gs.phase === "compGroupsEnd" ||
    gs.phase === "compKOIntro" ||
    gs.phase === "compKOMatch" ||
    gs.phase === "compKOResult" ||
    gs.phase === "compEnd" ||
    gs.phase === "champion" ||
    gs.phase === "eliminated" ||
    gs.phase === "gameOver";
  if (!hasCurrentMilestone) return history;
  return [
    ...history,
    { season: currentSeason, brasileiraoPos: null, trophies },
  ];
}


interface SaveForXP {
  id: string;
  game_state: unknown;
  display_name?: string;
  team_name?: string;
}

// XP por temporada individual.
function xpForSeason(snap: { trophies?: SnapForXP["trophies"]; brasileiraoPos: number | null; unbeaten?: boolean }): { xp: number; reasons: string[] } {
  let xp = 1; // por terminar temporada
  const reasons: string[] = ["+1 · temporada concluída"];
  const t = snap.trophies ?? {};
  if (t.brasileirao) { xp += 2; reasons.push("+2 · Brasileirão"); }
  if (t.libertadores) { xp += 3; reasons.push("+3 · Libertadores"); }
  if (t.sulamericana) { xp += 2; reasons.push("+2 · Sula"); }
  if (t.mundial) { xp += 5; reasons.push("+5 · Mundial"); }
  return { xp, reasons };
}

export interface XPBreakdown {
  total: number;
  bySave: { saveId: string; xp: number }[];
}

export function computeCoachXP(saves: SaveForXP[], multiplier = 1): XPBreakdown {
  let total = 0;
  const bySave: { saveId: string; xp: number }[] = [];
  for (const s of saves) {
    const gs = (s.game_state ?? {}) as StateForXP;
    const seasons = collectSeasons(gs);
    let saveXp = 0;
    for (const snap of seasons) {
      saveXp += xpForSeason({ trophies: snap.trophies, brasileiraoPos: snap.brasileiraoPos ?? null }).xp;
    }
    // Bicampeonato consecutivo — leitura leve
    for (let i = 1; i < seasons.length; i++) {
      const prev = seasons[i - 1].trophies ?? {};
      const cur = seasons[i].trophies ?? {};
      if (prev.brasileirao && cur.brasileirao) saveXp += 2;
      if (prev.libertadores && cur.libertadores) saveXp += 2;
      if (prev.mundial && cur.mundial) saveXp += 2;
    }
    bySave.push({ saveId: s.id, xp: Math.round(saveXp * multiplier) });
    total += saveXp;
  }
  return { total: Math.round(total * multiplier), bySave };
}

// Detalhamento de XP de UM save só — usado na tela de fim de campanha.
export interface SaveXPLine { label: string; xp: number; reasons: string[] }
export interface SaveXPBreakdown { lines: SaveXPLine[]; total: number }

export function computeSaveXPBreakdown(gameState: unknown, multiplier = 1): SaveXPBreakdown {
  const gs = (gameState ?? {}) as StateForXP;
  const lines: SaveXPLine[] = [];
  const history = collectSeasons(gs);
  let sum = 0;
  for (const snap of history) {
    const { xp, reasons } = xpForSeason({ trophies: snap.trophies, brasileiraoPos: snap.brasileiraoPos ?? null });
    lines.push({ label: `Temporada ${snap.season}`, xp, reasons });
    sum += xp;
  }
  // Bicampeonatos consecutivos.
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].trophies ?? {};
    const cur = history[i].trophies ?? {};
    const bonuses: string[] = [];
    let extra = 0;
    if (prev.brasileirao && cur.brasileirao) { extra += 2; bonuses.push("+2 · Bi Brasileirão"); }
    if (prev.libertadores && cur.libertadores) { extra += 2; bonuses.push("+2 · Bi Libertadores"); }
    if (prev.mundial && cur.mundial) { extra += 2; bonuses.push("+2 · Bi Mundial"); }
    if (extra > 0) {
      lines.push({ label: `Sequência T${history[i - 1].season}→T${history[i].season}`, xp: extra, reasons: bonuses });
      sum += extra;
    }
  }
  const total = Math.round(sum * multiplier);
  return { lines, total };
}

export interface CoachXPHistoryRow {
  key: string;
  saveId: string;
  saveName: string;
  teamName: string;
  season: number;
  xp: number;
  reasons: string[];
  trophies: SnapForXP["trophies"];
  createdAt: string;
}

function isCoachXPHistoryRow(v: unknown): v is CoachXPHistoryRow {
  const row = v as Partial<CoachXPHistoryRow> | null;
  return !!row && typeof row.key === "string" && typeof row.xp === "number" && typeof row.season === "number";
}

function normalizeHistory(rows: unknown): CoachXPHistoryRow[] {
  if (!Array.isArray(rows)) return [];
  return rows.filter(isCoachXPHistoryRow).map((row) => ({
    key: row.key,
    saveId: row.saveId || "legacy",
    saveName: row.saveName || row.teamName || "Save",
    teamName: row.teamName || row.saveName || "Time",
    season: row.season,
    xp: Math.max(0, Math.round(row.xp)),
    reasons: Array.isArray(row.reasons) ? row.reasons.filter((r): r is string => typeof r === "string") : [],
    trophies: row.trophies ?? {},
    createdAt: row.createdAt || new Date(0).toISOString(),
  }));
}

function mergeXPHistory(a: CoachXPHistoryRow[], b: CoachXPHistoryRow[]): CoachXPHistoryRow[] {
  const EPOCH = new Date(0).toISOString();
  const map = new Map<string, CoachXPHistoryRow>();
  for (const row of [...a, ...b]) {
    const prev = map.get(row.key);
    if (!prev) { map.set(row.key, row); continue; }
    // Mantém o maior XP e preserva a data de conclusão mais antiga (a real).
    const validPrev = prev.createdAt && prev.createdAt !== EPOCH ? prev.createdAt : null;
    const validCur = row.createdAt && row.createdAt !== EPOCH ? row.createdAt : null;
    const createdAt =
      validPrev && validCur
        ? (validPrev < validCur ? validPrev : validCur)
        : (validPrev ?? validCur ?? row.createdAt);
    const winner = row.xp >= prev.xp ? row : prev;
    map.set(row.key, { ...winner, createdAt });
  }
  return [...map.values()].sort((x, y) => y.createdAt.localeCompare(x.createdAt));
}

function sumXPHistory(rows: CoachXPHistoryRow[]): number {
  return rows.reduce((sum, row) => sum + Math.max(0, Math.round(row.xp)), 0);
}

export function computeXPHistoryRows(saves: SaveForXP[], multiplier = 1): CoachXPHistoryRow[] {
  const rows: CoachXPHistoryRow[] = [];
  for (const s of saves) {
    const gs = (s.game_state ?? {}) as StateForXP;
    const history = collectSeasons(gs);
    if (history.length === 0) continue;
    const xpBySeason = new Map<number, { xp: number; reasons: string[]; trophies: SnapForXP["trophies"] }>();
    for (const snap of history) {
      const { xp, reasons } = xpForSeason({ trophies: snap.trophies, brasileiraoPos: snap.brasileiraoPos ?? null });
      xpBySeason.set(snap.season, { xp, reasons: [...reasons], trophies: snap.trophies ?? {} });
    }
    for (let i = 1; i < history.length; i++) {
      const prev = history[i - 1].trophies ?? {};
      const cur = history[i].trophies ?? {};
      const current = xpBySeason.get(history[i].season);
      if (!current) continue;
      if (prev.brasileirao && cur.brasileirao) { current.xp += 2; current.reasons.push("+2 · Bi Brasileirão"); }
      if (prev.libertadores && cur.libertadores) { current.xp += 2; current.reasons.push("+2 · Bi Libertadores"); }
      if (prev.mundial && cur.mundial) { current.xp += 2; current.reasons.push("+2 · Bi Mundial"); }
    }
    const teamName = gs.teamName || s.team_name || s.display_name || "Time";
    const saveName = s.display_name || teamName;
    for (const snap of history) {
      const line = xpBySeason.get(snap.season);
      if (!line) continue;
      const xp = Math.round(line.xp * multiplier);
      const reasons = multiplier === 1
        ? line.reasons
        : [...line.reasons, `multiplicador XP ×${multiplier.toFixed(2)}`];
      const campaignId = gs.xpCampaignId || "legacy";
      rows.push({
        key: `${s.id}:campaign:${campaignId}:season:${snap.season}`,
        saveId: s.id,
        saveName,
        teamName,
        season: snap.season,
        xp,
        reasons,
        trophies: line.trophies,
        createdAt: new Date().toISOString(),
      });
    }
  }
  return rows;
}

// Total de títulos históricos somando todos os saves (usado pelo "Ídolo eterno":
// +0.05 OVR passivo a cada 10 títulos, respeitando o cap `idoloCap`).
export function computeTotalTitles(saves: SaveForXP[]): number {
  let total = 0;
  for (const s of saves) {
    const gs = (s.game_state ?? {}) as StateForXP;
    for (const snap of collectSeasons(gs)) {
      const t = snap.trophies ?? {};
      if (t.brasileirao) total++;
      if (t.libertadores) total++;
      if (t.sulamericana) total++;
      if (t.mundial) total++;
    }
  }
  return total;
}

// Bônus ativo do Ídolo (respeita o cap do nó desbloqueado).
export function computeIdoloOvrBump(saves: SaveForXP[], idoloCap: number): number {
  if (idoloCap <= 0) return 0;
  const titles = computeTotalTitles(saves);
  const raw = Math.floor(titles / 10) * 0.10;
  return Math.min(idoloCap, raw);
}

// ─── Persistência local por usuário ────────────────────────────────────

interface CoachProgress {
  unlocked: string[];
  version: number;
  xpMultiplier: number; // legado: bônus herdado de contas antigas (o nó de reset não existe mais)
  xpHistory: CoachXPHistoryRow[];
  // Marca d'água (highwater) de XP total já ganho pelo usuário na conta.
  // Sobe quando novo XP é derivado dos saves; NUNCA desce. Isso garante que
  // reiniciar/deletar um save não faz o XP disponível encolher (XP gasto
  // continua contando, então o "available" ficaria zerado sem esse banco).
  earnedXP: number;
}

const STORAGE_KEY = (userId: string) => `coach:v1:${userId}`;

function emptyCoachProgress(): CoachProgress {
  return { unlocked: [], version: 1, xpMultiplier: 1, earnedXP: 0, xpHistory: [] };
}

export function loadCoachProgress(userId: string): CoachProgress {
  if (typeof window === "undefined") return emptyCoachProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY(userId));
    if (!raw) return emptyCoachProgress();
    const parsed = JSON.parse(raw) as Partial<CoachProgress>;
    return {
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      version: parsed.version ?? 1,
      xpMultiplier: typeof parsed.xpMultiplier === "number" ? parsed.xpMultiplier : 1,
      earnedXP: typeof parsed.earnedXP === "number" ? parsed.earnedXP : 0,
      xpHistory: normalizeHistory(parsed.xpHistory),
    };
  } catch {
    return emptyCoachProgress();
  }
}

export function saveCoachProgress(userId: string, p: CoachProgress): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY(userId), JSON.stringify(p));
}

export interface CoachState {
  xp: number;               // XP total ganho (highwater)
  spent: number;            // XP gasto em nós desbloqueados
  available: number;        // xp - spent
  unlocked: Set<string>;
  level: number;            // nível derivado (cada 10 XP = 1 nível)
  levelTitle: string;
  totalCost: number;        // custo pra fechar a árvore
  xpMultiplier: number;
  xpHistory: CoachXPHistoryRow[];
}

const LEVEL_TITLES = [
  "Iniciante", "Aprendiz", "Assistente", "Auxiliar", "Técnico Sub-20",
  "Técnico Promissor", "Comandante", "Mestre de Divisão", "Ídolo em Formação",
  "Lenda em Ascensão", "Rei do Vestiário",
];

export function levelFor(xp: number): { level: number; title: string; progress: number; nextAt: number } {
  const level = Math.floor(xp / 12);
  const nextAt = (level + 1) * 12;
  const progress = (xp - level * 12) / 12;
  const title = LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length - 1)] ?? "Lenda";
  return { level, title, progress, nextAt };
}

export function computeCoachState(userId: string, saves: SaveForXP[]): CoachState {
  const prog = loadCoachProgress(userId);
  // Multiplicador efetivo inclui o "+20% XP" de legado.estudante (e o tier-2),
  // que antes não eram aplicados ao XP derivado — o resultado era o jogador
  // desbloquear "Estudante do jogo" e não ver ganho nenhum de XP total.
  const unlockedForMult = new Set(prog.unlocked);
  const effectiveMultiplier =
    (unlockedForMult.has("legado.estudante") ? 1.2 : 1) *
    (unlockedForMult.has("t2.legado.estudante") ? 1.2 : 1) *
    prog.xpMultiplier;
  const derivedXP = computeCoachXP(saves, effectiveMultiplier).total;
  const derivedHistory = computeXPHistoryRows(saves, effectiveMultiplier);
  const xpHistory = mergeXPHistory(prog.xpHistory, derivedHistory);
  const historyXP = sumXPHistory(xpHistory);
  const unlocked = new Set(prog.unlocked);
  let spent = 0;
  for (const id of unlocked) {
    const n = ALL_COACH_NODES.find((x) => x.id === id);
    if (n) spent += n.cost;
  }
  // Marca d'água: XP nunca desce. Piso = spent (grandfathering: nunca deixamos
  // o "disponível" ficar negativo por causa de saves que foram reiniciados/
  // deletados depois de nós já terem sido desbloqueados).
  const totalXP = Math.max(derivedXP, prog.earnedXP, historyXP, spent);
  if (totalXP > prog.earnedXP || xpHistory.length !== prog.xpHistory.length) {
    const next: CoachProgress = { ...prog, earnedXP: totalXP, xpHistory };
    saveCoachProgress(userId, next);
    void syncCoachProgressToCloud(userId, next);
  }
  const lv = levelFor(totalXP);
  return {
    xp: totalXP,
    spent,
    available: Math.max(0, totalXP - spent),
    unlocked,
    level: lv.level,
    levelTitle: lv.title,
    totalCost: TOTAL_XP_TO_COMPLETE,
    xpMultiplier: prog.xpMultiplier,
    xpHistory,
  };
}


// Retorna motivo se não puder desbloquear.
export function canUnlock(state: CoachState, node: CoachNode): string | null {
  if (state.unlocked.has(node.id)) return "Já desbloqueado.";
  if (node.tier === 2 && !isTier1Complete(state.unlocked)) {
    return "Complete a árvore Técnico primeiro.";
  }
  if (state.available < node.cost) return `Faltam ${node.cost - state.available} XP.`;
  for (const req of node.requires ?? []) {
    if (!state.unlocked.has(req)) {
      const parent = ALL_COACH_NODES.find((n) => n.id === req);
      return `Requer: ${parent?.name ?? req}.`;
    }
  }
  return null;
}


export function unlockNode(userId: string, nodeId: string): void {
  const prog = loadCoachProgress(userId);
  if (!prog.unlocked.includes(nodeId)) prog.unlocked.push(nodeId);
  saveCoachProgress(userId, prog);
  void syncCoachProgressToCloud(userId, prog);
}

export function resetCoachProgress(userId: string, applyBonus: boolean): void {
  const prog = loadCoachProgress(userId);
  const next: CoachProgress = {
    unlocked: [],
    version: 1,
    xpMultiplier: applyBonus ? Math.min(2, prog.xpMultiplier + 0.25) : prog.xpMultiplier,
    // O XP e o histórico são permanentes: resetar árvore/carreira não apaga o que já foi ganho.
    earnedXP: prog.earnedXP,
    xpHistory: prog.xpHistory,
  };
  saveCoachProgress(userId, next);
  void syncCoachProgressToCloud(userId, next);
}

/** Marca o XP derivado dos game_states passados no "banco" (highwater) do
 * usuário. Serve para garantir que reiniciar ou apagar um save NUNCA reduza
 * o XP disponível: o XP já ganho fica permanentemente creditado antes de
 * qualquer operação destrutiva. Seguro chamar múltiplas vezes — só sobe. */
export function bankXPFromStates(userId: string, gameStates: unknown[]): void {
  bankXPFromSaves(userId, gameStates.map((gs, i) => ({ id: `manual:${i}:${((gs as StateForXP | null)?.teamName ?? "time")}`, game_state: gs })));
}

export function bankXPFromSaves(userId: string, saves: SaveForXP[]): void {
  if (!userId) return;
  const prog = loadCoachProgress(userId);
  const unlockedSet = new Set(prog.unlocked);
  const effectiveMultiplier =
    (unlockedSet.has("legado.estudante") ? 1.2 : 1) *
    (unlockedSet.has("t2.legado.estudante") ? 1.2 : 1) *
    prog.xpMultiplier;
  const derived = computeCoachXP(saves, effectiveMultiplier).total;
  const xpHistory = mergeXPHistory(prog.xpHistory, computeXPHistoryRows(saves, effectiveMultiplier));
  const total = Math.max(prog.earnedXP, derived, sumXPHistory(xpHistory));
  if (total > prog.earnedXP || xpHistory.length !== prog.xpHistory.length) {
    const next: CoachProgress = { ...prog, earnedXP: total, xpHistory };
    saveCoachProgress(userId, next);
    void syncCoachProgressToCloud(userId, next);
  }
}


// ─── Sincronização com Lovable Cloud ──────────────────────────────────
// O progresso da árvore é permanente: guardamos em localStorage para leitura
// síncrona rápida e espelhamos no backend para o usuário nunca perder
// (limpou cache, trocou de dispositivo/navegador, etc.).

async function syncCoachProgressToCloud(userId: string, prog: CoachProgress): Promise<void> {
  if (typeof window === "undefined" || !userId) return;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("coach_progress").upsert({
      user_id: userId,
      unlocked: prog.unlocked,
      xp_multiplier: prog.xpMultiplier,
      earned_xp: prog.earnedXP,
      xp_history: JSON.parse(JSON.stringify(prog.xpHistory)),
    });
  } catch { /* silencioso: mantém localStorage como fallback */ }
}

export async function hydrateCoachProgressFromCloud(userId: string): Promise<CoachProgress> {
  const local = loadCoachProgress(userId);
  if (typeof window === "undefined" || !userId) return local;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("coach_progress")
      .select("unlocked, xp_multiplier, earned_xp, xp_history")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) {
      if (local.unlocked.length > 0 || local.xpMultiplier !== 1 || local.earnedXP > 0) {
        void syncCoachProgressToCloud(userId, local);
      }
      return local;
    }
    const remoteUnlocked = Array.isArray(data.unlocked) ? (data.unlocked as string[]) : [];
    const remoteMult = typeof data.xp_multiplier === "number"
      ? data.xp_multiplier
      : Number(data.xp_multiplier) || 1;
    const remoteEarned = typeof (data as { earned_xp?: unknown }).earned_xp === "number"
      ? (data as { earned_xp: number }).earned_xp
      : Number((data as { earned_xp?: unknown }).earned_xp) || 0;
    const remoteHistory = normalizeHistory((data as { xp_history?: unknown }).xp_history);
    const xpHistory = mergeXPHistory(local.xpHistory, remoteHistory);
    const merged: CoachProgress = {
      unlocked: Array.from(new Set([...local.unlocked, ...remoteUnlocked])),
      version: 1,
      xpMultiplier: Math.max(local.xpMultiplier, remoteMult),
      earnedXP: Math.max(local.earnedXP, remoteEarned, sumXPHistory(xpHistory)),
      xpHistory,
    };
    saveCoachProgress(userId, merged);
    if (
      merged.unlocked.length !== remoteUnlocked.length ||
      merged.xpMultiplier !== remoteMult ||
      merged.earnedXP !== remoteEarned ||
      merged.xpHistory.length !== remoteHistory.length
    ) {
      void syncCoachProgressToCloud(userId, merged);
    }
    return merged;
  } catch {
    return local;
  }
}


// ─── Efeitos consultáveis pelo resto do jogo ──────────────────────────
// Estes getters são puros e podem ser chamados de qualquer lugar. A engine
// aplica os que fizerem sentido no contexto.

export interface CoachEffects {
  // OVR médio do XI (aditivo, sempre)
  passiveOvrBump: number;
  // Multiplicador aplicado aos bônus da FORMAÇÃO
  formationBonusMult: number;
  // ATA extra quando OVR do time > adversário em 5+
  atkVsWeaker: number;
  // λ ATA extra em bolas paradas
  spLambdaAtk: number;
  // % redução de gols de zebra sofridos (0..1)
  antiUpsetReduction: number;
  // Pênaltis: bônus de conversão por batedor (0..1)
  penaltyBoost: number;
  // OVR extra em finais de torneio
  finalOvrBoost: number;
  // OVR extra do maior jogador em mata-mata continental/Mundial
  cupStarBoost: number;
  // Draft
  draftPoolExtra: number; // slots a mais no pool
  extraSkips: number;
  guaranteePositionCount: number; // 0..2
  showDecimalOVR: boolean;
  peekNextPool: boolean;
  buffEvery5thPick: number; // OVR extra na 5ª e 10ª picks (0 = sem efeito)
  // Legado
  xpMultiplier: number;
  bonusLegendOn3Titles: boolean;
  // Tier-2 exclusivos
  chemistryLambdaAtk: number;      // +λ ATA quando emenda 3+ vitórias seguidas (Embalo vencedor)
  losingComebackLambda: number;    // +λ ATA quando perdendo por 2+
  idoloCap: number;                // teto do bônus histórico (0.5 tier-1, 1.10 tier-2)
  idoloOvrBump: number;            // bônus ativo do Ídolo (calculado a partir dos títulos totais, cap pelo idoloCap)
  videoAnalysisMatches: number;    // duração (jogos) do bônus pós-derrota
  postThrashingBump: number;       // +OVR no próximo jogo após levar goleada (3+ gols)
  closeMatchBump: number;          // +OVR quando |teamOvr - oppOvr| <= 2 (Recuperação acelerada)
  cabecaLambdaAtk: number;         // parcela do +λ ATA de "Cabeça no lugar" prorrateada ao jogo
}

export function getCoachEffects(state: CoachState): CoachEffects {
  const has = (id: string) => state.unlocked.has(id);

  // Contribuição espelhada tier-2: adiciona 100% do valor base quando o mirror
  // correspondente estiver desbloqueado (dobra exatamente o efeito do tier-1).
  const mirror = (id: string, base: number) => (has(`t2.${id}`) ? base : 0);

  // ─── OVR passivo distribuído (soma até 0.40 no tier-1; ~0.80 com tier-2)
  const passiveOvrBump =
    (has("raiz.confianca") ? 0.04 : 0) + mirror("raiz.confianca", 0.04) +
    (has("raiz.treino")    ? 0.04 : 0) + mirror("raiz.treino",    0.04) +
    (has("raiz.analise")   ? 0.04 : 0) + mirror("raiz.analise",   0.04) +
    (has("medico.preparo") ? 0.02 : 0) + mirror("medico.preparo", 0.02) +
    (has("medico.recovery")? 0.02 : 0) + mirror("medico.recovery",0.02) +
    (has("medico.nutricao")? 0.02 : 0) + mirror("medico.nutricao",0.02) +
    (has("medico.corpo")   ? 0.02 : 0) + mirror("medico.corpo",   0.02) +
    (has("legado.aposentar") ? 0.20 : 0) + mirror("legado.aposentar", 0.20) +
    // Vestiário unido (olheiro.regional) e Vestiário blindado (t2.olheiro.global)
    (has("olheiro.regional") ? 0.05 : 0) +
    (has("t2.olheiro.global") ? 0.05 : 0);

  // ─── Multiplicador tático distribuído (fecha em +10% com o tronco todo)
  const tacticalContribs =
    (has("tatico.leitura")    ? 0.02 : 0) + mirror("tatico.leitura",    0.02) +
    (has("tatico.intervalo")  ? 0.02 : 0) + mirror("tatico.intervalo",  0.02) +
    (has("tatico.superior")   ? 0.01 : 0) + mirror("tatico.superior",   0.01) +
    (has("tatico.contragolpe")? 0.01 : 0) + mirror("tatico.contragolpe",0.01) +
    (has("tatico.paradas")    ? 0.01 : 0) + mirror("tatico.paradas",    0.01) +
    (has("tatico.posse")      ? 0.01 : 0) + mirror("tatico.posse",      0.01) +
    (has("tatico.master")     ? 0.02 : 0) + mirror("tatico.master",     0.02);

  // ─── Bola parada distribuído (fecha em +0.10 λ ATA)
  const spLambdaAtk =
    (has("tatico.paradas") ? 0.05 : 0) + mirror("tatico.paradas", 0.05) +
    (has("tatico.master")  ? 0.05 : 0) + mirror("tatico.master",  0.05);

  // ─── Bônus em finais distribuído (fecha em +1.00 OVR tier-1; ~+2.20 com tier-2)
  const finalOvrBoost =
    (has("mental.decisao") ? 0.50 : 0) + mirror("mental.decisao", 0.50) +
    (has("mental.craque")  ? 0.50 : 0) + mirror("mental.craque",  0.50);

  const cupStarBoost =
    (has("mental.craque") ? 2 : 0) + mirror("mental.craque", 2);

  // ─── Anti-zebra distribuído entre os 6 nós mentais (5% cada = 30% máx tier-1;
  //     mirror tier-2 adiciona +5% por nó = +30% adicional → 60% no total)
  const antiUpsetReduction =
    (has("mental.foco")     ? 0.05 : 0) + (has("t2.mental.foco")     ? 0.05 : 0) +
    (has("mental.sangue")   ? 0.05 : 0) + (has("t2.mental.sangue")   ? 0.05 : 0) +
    (has("mental.cabeca")   ? 0.05 : 0) + (has("t2.mental.cabeca")   ? 0.05 : 0) +
    (has("mental.aprender") ? 0.05 : 0) + (has("t2.mental.aprender") ? 0.05 : 0) +
    (has("mental.decisao")  ? 0.05 : 0) + (has("t2.mental.decisao")  ? 0.05 : 0) +
    (has("mental.craque")   ? 0.05 : 0) + (has("t2.mental.craque")   ? 0.05 : 0);

  const penaltyBoost =
    (has("mental.sangue") ? 0.02 : 0) + mirror("mental.sangue", 0.02);

  // ─── ATA vs fracos distribuído (fecha em +0.30)
  const atkVsWeaker =
    (has("tatico.superior")   ? 0.15 : 0) + mirror("tatico.superior",   0.15) +
    (has("tatico.contragolpe")? 0.15 : 0) + mirror("tatico.contragolpe",0.15);

  return {
    passiveOvrBump,
    formationBonusMult: 1 + tacticalContribs,
    atkVsWeaker,
    spLambdaAtk,
    antiUpsetReduction: Math.min(0.60, antiUpsetReduction),
    penaltyBoost,
    finalOvrBoost,
    cupStarBoost,
    // Recurso removido: reservas extras no draft causavam problemas visuais.
    // Os nós 'olheiro.regional' e 't2.olheiro.global' agora dão OVR passivo.
    draftPoolExtra: 0,
    extraSkips: (has("olheiro.rede") ? 1 : 0) + (has("t2.olheiro.rede") ? 1 : 0),
    guaranteePositionCount:
      (has("olheiro.radar") ? 1 : 0) + (has("t2.olheiro.radar") ? 1 : 0),
    showDecimalOVR: has("olheiro.numeros"),
    peekNextPool: has("olheiro.contato"),
    buffEvery5thPick: (has("olheiro.cartola") ? 1 : 0) + mirror("olheiro.cartola", 1),
    xpMultiplier:
      (has("legado.estudante") ? 1.2 : 1) *
      (has("t2.legado.estudante") ? 1.2 : 1) *
      state.xpMultiplier,
    bonusLegendOn3Titles: has("legado.mentor"),
    chemistryLambdaAtk: has("t2.tatico.quimica") ? 0.10 : 0,
    losingComebackLambda: has("t2.mental.psicologo") ? 0.15 : 0,
    idoloCap: has("t2.legado.dna") ? 2.00 : (has("legado.idolo") ? 1.0 : 0),
    idoloOvrBump: 0, // preenchido depois via setActiveCoachEffects a partir dos títulos totais do usuário
    videoAnalysisMatches: has("t2.raiz.video") ? 2 : 1,
    postThrashingBump: (has("mental.aprender") ? 0.20 : 0) + mirror("mental.aprender", 0.20),
    closeMatchBump: (has("medico.recovery") ? 0.20 : 0) + mirror("medico.recovery", 0.20),
    // "Cabeça no lugar": +0.05 λ ATA nos últimos 15' → prorrateado ao jogo inteiro (15/90)
    cabecaLambdaAtk: (has("mental.cabeca") ? 0.05 * (15 / 90) : 0) + mirror("mental.cabeca", 0.05 * (15 / 90)),
  };
}


// ─── Efeitos ativos (singleton lido pela engine) ──────────────────────
// A tela de saves calcula os efeitos do usuário logado e "planta" aqui.
// gameLogic.ts / rotas leem via getActiveCoachEffects() sem precisar de
// props em cada chamada.

const EMPTY_EFFECTS: CoachEffects = {
  passiveOvrBump: 0,
  formationBonusMult: 1,
  atkVsWeaker: 0,
  spLambdaAtk: 0,
  antiUpsetReduction: 0,
  penaltyBoost: 0,
  finalOvrBoost: 0,
  cupStarBoost: 0,
  draftPoolExtra: 0,
  extraSkips: 0,
  guaranteePositionCount: 0,
  showDecimalOVR: false,
  peekNextPool: false,
  buffEvery5thPick: 0,
  xpMultiplier: 1,
  bonusLegendOn3Titles: false,
  chemistryLambdaAtk: 0,
  losingComebackLambda: 0,
  idoloCap: 0,
  idoloOvrBump: 0,
  videoAnalysisMatches: 1,
  postThrashingBump: 0,
  closeMatchBump: 0,
  cabecaLambdaAtk: 0,
};


let ACTIVE: CoachEffects = EMPTY_EFFECTS;

export function setActiveCoachEffects(effects: CoachEffects | null): void {
  ACTIVE = effects ?? EMPTY_EFFECTS;
}

export function getActiveCoachEffects(): CoachEffects {
  return ACTIVE;
}

// ─── Simulação do impacto máximo (árvore 100%) ────────────────────────
// Útil pra explicar ao usuário quanto de vantagem a árvore inteira dá.
export interface CoachImpactSummary {
  ovrBump: number;
  lambdaBonus: number;
  vsWeakerAtk: number;
  antiUpsetPct: number;
  finalOvrBump: number;
  cupStarBump: number;
  penaltyPct: number;
  draftPoolExtra: number;
  extraSkips: number;
  guaranteePosition: number;
  goalsPerMatchEstimate: number;
  chemistryLambda: number;
  losingComebackLambda: number;
  idoloCap: number;
  videoAnalysisMatches: number;
}

export function computeMaxImpact(tier: 1 | 2 | "all" = "all"): CoachImpactSummary {
  const pool =
    tier === 1 ? COACH_NODES :
    tier === 2 ? ALL_COACH_NODES :
    ALL_COACH_NODES;
  const fake: CoachState = {
    xp: TOTAL_XP_TO_COMPLETE,
    spent: TOTAL_XP_TO_COMPLETE,
    available: 0,
    unlocked: new Set(pool.map((n) => n.id)),
    level: Math.floor(TOTAL_XP_TO_COMPLETE / 12),
    levelTitle: "Lenda",
    totalCost: TOTAL_XP_TO_COMPLETE,
    xpMultiplier: 1,
    xpHistory: [],
  };
  const eff = getCoachEffects(fake);
  const ovrBump = eff.passiveOvrBump + eff.idoloCap;
  const lambdaBonus = eff.spLambdaAtk;
  const ovrToLambda = ovrBump * 0.065;
  const goalsPerMatchEstimate = lambdaBonus + ovrToLambda;
  return {
    ovrBump,
    lambdaBonus,
    vsWeakerAtk: eff.atkVsWeaker,
    antiUpsetPct: eff.antiUpsetReduction * 100,
    finalOvrBump: eff.finalOvrBoost,
    cupStarBump: eff.cupStarBoost,
    penaltyPct: eff.penaltyBoost * 100,
    draftPoolExtra: eff.draftPoolExtra,
    extraSkips: eff.extraSkips,
    guaranteePosition: eff.guaranteePositionCount,
    goalsPerMatchEstimate,
    chemistryLambda: eff.chemistryLambdaAtk,
    losingComebackLambda: eff.losingComebackLambda,
    idoloCap: eff.idoloCap,
    videoAnalysisMatches: eff.videoAnalysisMatches,
  };
}

