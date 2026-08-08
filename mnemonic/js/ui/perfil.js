/* ========================================================================
   O PERFIL — o que sobra depois que a run acaba.

   Até aqui o jogo esquecia tudo. Você vencia seis mundos, a tela dizia
   parabéns, e no menu seguinte não havia sinal de que aquilo tinha
   acontecido. Um roguelike sem memória entre runs é um jogo que não sabe
   quem está jogando: não dá para desbloquear nada, não dá para comparar
   nada, e a segunda run começa tão vazia quanto a primeira.

   Aqui ficam os números da VIDA INTEIRA: quantas runs, quantas vitórias, o
   melhor placar, o maior combo, quantos pares fechados. É só um objeto no
   armazenamento do aparelho — não entra no replay e não muda regra nenhuma.
   Perder este arquivo não quebra partida: perde-se o histórico, e nada mais.

   O que ele NÃO é: um segundo placar. O ranking continua sendo o mundial, e
   continua sendo refeito a partir das jogadas. Aqui é o seu caderno.
   ===================================================================== */
const CHAVE = 'mnemonic.perfil';

const VAZIO = {
  runs:0, vitorias:0, salas:0, pares:0, erros:0, moedas:0,
  melhorRun:0, melhorSala:0, maiorCombo:0, limpas:0, semErro:0,
  mundoMaximo:0, diarias:0, publicados:0, tempo:0,
  classes:{},        // id da classe → runs vencidas com ela
  chefes:{},         // id do chefe   → quantas vezes caiu
  primeira:null, ultima:null,
};

function ler(){
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    return v && typeof v === 'object' ? { ...VAZIO, ...v } : { ...VAZIO };
  } catch(e){ return { ...VAZIO }; }
}
let cache = ler();

export const perfil = () => cache;
function gravar(){
  try { localStorage.setItem(CHAVE, JSON.stringify(cache)); } catch(e){}
}

/* ANOTAR UMA RUN QUE ACABOU.
   Chamado uma vez, no fim — e uma vez SÓ. A tela do fim é remontada toda vez
   que se volta para ela (o botão de ranking, o de menu), e sem esta trava a
   mesma run entraria três vezes no caderno. A chave é a semente mais o número
   de jogadas: duas runs diferentes não coincidem nas duas coisas. */
let ultimaAnotada = null;
export function anotarRun(run){
  const p = run.placar();
  const chave = p.semente + '#' + p.jogadas + '#' + p.pontos;
  if(chave === ultimaAnotada) return null;
  ultimaAnotada = chave;

  const e = p.est;
  const antes = { ...cache };
  cache.runs++;
  if(run.venceu) cache.vitorias++;
  cache.salas   += e.salas;
  cache.pares   += e.acertos;
  cache.erros   += e.erros;
  cache.moedas  += e.moedasGanhas;
  cache.limpas  += e.limpas || 0;
  cache.semErro += e.semErro || 0;
  cache.melhorRun  = Math.max(cache.melhorRun, p.pontos);
  cache.melhorSala = Math.max(cache.melhorSala, e.melhorSala || 0);
  cache.maiorCombo = Math.max(cache.maiorCombo, e.maiorCombo);
  cache.mundoMaximo = Math.max(cache.mundoMaximo, run.mundo + 1);
  if(run.diario) cache.diarias++;
  if(run.venceu)
    cache.classes[run.classeId] = (cache.classes[run.classeId] || 0) + 1;
  for(const id of (e.chefes || []))
    cache.chefes[id] = (cache.chefes[id] || 0) + 1;
  cache.primeira ??= Date.now();
  cache.ultima = Date.now();
  gravar();
  return { antes, depois: cache };
}

/* publicar no ranking não é uma run — é um ato, e vale uma conquista */
export function anotarPublicacao(){
  cache.publicados++; gravar();
}

export function apagarPerfil(){
  cache = { ...VAZIO }; ultimaAnotada = null;
  try { localStorage.removeItem(CHAVE); } catch(e){}
}

/* a taxa que o jogador quer ver: quantas das suas runs terminaram em pé */
export const taxaVitoria = () =>
  cache.runs ? Math.round(cache.vitorias * 100 / cache.runs) : 0;
