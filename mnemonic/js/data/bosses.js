/* ========================================================================
   OS CHEFES — cada um reescreve uma regra do tabuleiro.

   O que separa chefe de "sala com números maiores": a resposta que servia
   antes tem que parar de servir. Contra o Ilusionista decorar posição não
   adianta — decorar VIZINHANÇA adianta. Contra o Tempo guardar carta para
   depois é suicídio. É essa troca de estratégia que faz parecer luta.
   ===================================================================== */
export const BOSSES = {
  ilusionista: {
    id:'ilusionista', nome:'O Ilusionista', glifo:'✧', cor:'#b06bff',
    regra:'A cada 3 viradas, embaralha duas cartas fechadas.',
    dica:'Posição não se guarda. Guarde o par que ainda falta.',
    turno(s, rel){ if(s.turno % 3 === 0) s._embaralhar(1, rel); },
  },
  hipnotizador: {
    id:'hipnotizador', nome:'O Hipnotizador', glifo:'◉', cor:'#e05a8a',
    regra:'A cada 4 viradas, apaga da tela uma carta que você já tinha visto.',
    dica:'Ele come a memória mais antiga. Feche os pares na ordem em que achou.',
    turno(s, rel){
      if(s.turno % 4) return;
      const vistas = s.fechadas().filter(c=>c.vista);
      const alvo = s.rng.pick(vistas);
      if(alvo){ alvo.vista=false; rel.eventos.push({ e:'esqueceu', carta:alvo.id }); }
    },
  },
  tempo: {
    id:'tempo', nome:'O Tempo', glifo:'⧗', cor:'#7fd4ff',
    regra:'A cada 5 viradas, uma carta fechada some do tabuleiro levando o par junto.',
    dica:'Não guarde par para depois. Depois pode não existir.',
    turno(s, rel){
      if(s.turno % 5) return;
      const alvo = s.rng.pick(s.fechadas());
      if(alvo) s._removerPar(alvo, rel);
    },
  },
  caos: {
    id:'caos', nome:'O Caos', glifo:'⁂', cor:'#ff6a5a',
    regra:'Todo erro embaralha metade do tabuleiro.',
    dica:'Aqui o erro custa duas vezes: o Foco e tudo que você tinha decorado.',
    turno(s, rel){
      const ultimo = rel.eventos.find(e=>e.e==='erro');
      if(ultimo) s._embaralhar(Math.ceil(s.fechadas().length/4), rel);
    },
  },
  espelho: {
    id:'espelho', nome:'O Espelho', glifo:'⧉', cor:'#d8d8e8',
    regra:'O tabuleiro inteiro é espelhado na horizontal a cada 6 viradas.',
    dica:'O que estava à esquerda passa para a direita. A ordem sobrevive, o lado não.',
    /* Espelha DENTRO de cada fila, trocando entre si as posições que
       realmente existem. A conta ingênua (`lin*cols + cols-1-col`) inventa
       posições fora do tabuleiro na última fila, que quase nunca está
       completa — e duas cartas acabam na mesma casa. */
    turno(s, rel){
      if(s.turno % 6) return;
      const cols = s.colunas || Math.ceil(Math.sqrt(s.cartas.length));
      const filas = new Map();
      for(const c of s.cartas){
        const l = Math.floor(c.pos/cols);
        if(!filas.has(l)) filas.set(l, []);
        filas.get(l).push(c);
      }
      for(const fila of filas.values()){
        const pos = fila.map(c=>c.pos).sort((a,b)=>a-b);
        fila.sort((a,b)=>a.pos-b.pos);
        fila.forEach((c,i)=> c.pos = pos[pos.length-1-i]);
      }
      rel.eventos.push({ e:'espelhou' });
    },
  },
  rei: {
    id:'rei', nome:'O Rei da Memória', glifo:'♚', cor:'#f0c14b',
    regra:'Faz um pouco de tudo: embaralha, esquece e apaga o tabuleiro.',
    dica:'O último. Traga combo alto e não conte com nada.',
    turno(s, rel){
      if(s.turno % 3 === 0) s._embaralhar(1, rel);
      if(s.turno % 4 === 0){
        const alvo = s.rng.pick(s.fechadas().filter(c=>c.vista));
        if(alvo){ alvo.vista=false; rel.eventos.push({ e:'esqueceu', carta:alvo.id }); }
      }
      if(s.turno % 7 === 0){
        const alvo = s.rng.pick(s.fechadas());
        if(alvo) s._removerPar(alvo, rel);
      }
    },
  },
};
export const LISTA_BOSSES = Object.values(BOSSES);
export const BOSS_DO_MUNDO = ['ilusionista','hipnotizador','tempo','caos','espelho','rei'];
