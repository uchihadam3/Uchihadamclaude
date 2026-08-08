/* ========================================================================
   A RUN — mapa, progressão e, principalmente, o REGISTRO.

   ANTI-CHEAT SEM SERVIDOR. O ranking do Tampinha Rally roda em relays
   públicos: qualquer um assina e publica o que quiser, então "assinado" não
   quer dizer "verdadeiro". A resposta aqui não é confiar no placar — é
   tornar o placar RECALCULÁVEL.

   Toda a run é função de duas coisas: a SEMENTE e a LISTA DE JOGADAS. O
   motor é determinístico de ponta a ponta (nenhum Math.random, nenhum
   Date.now dentro da regra), então qualquer aparelho que receba
   { semente, classe, jogadas } roda a run de novo e chega no MESMO placar.
   Se não chegar, o placar é falso e o cliente que leu simplesmente descarta.

   Para isso funcionar, uma disciplina vale para o arquivo inteiro: TODO
   sorteio nasce de uma semente derivada do LUGAR onde ele acontece
   (`semente|para-que|mundo|indice`), nunca de um contador que anda junto
   com a partida. Assim, se o jogador entra na loja antes ou depois de pegar
   a relíquia, o tabuleiro da próxima sala continua o mesmo — e o replay não
   desanda por causa da ordem em que ele clicou nas coisas.

   E as jogadas entram no registro por um lugar só: `_reg()`. Quem está
   REFAZENDO a run (o verificador) liga `replay` e nada é registrado de
   novo, então a mesma classe serve para jogar e para conferir, sem duas
   implementações da regra podendo discordar uma da outra.
   ===================================================================== */
import { makeRNG } from '../rng.js';
import { Sala, pontosPerfeitos, pontosEsperados } from './tabuleiro.js';
import { CLASSES } from '../data/classes.js';
import { BOSS_DO_MUNDO, BOSSES } from '../data/bosses.js';
import { POR_ID, RELIQUIAS, sortearReliquias } from '../data/reliquias.js';
import { EVENTOS, EVENTO_POR_ID } from '../data/eventos.js';

/* O MUNDO tem 8 salas e a run tem 6 mundos: 48 salas, 30 delas de combate.

   O primeiro desenho tinha 12 salas por mundo, 72 no total. Errado por dois
   motivos que só apareceram medindo: uma run assim passa de uma hora, e —
   pior — quando cada sala pode encerrar a run, 72 chances de morrer fazem
   qualquer taxa de acerto realista virar zero. 97% de sobrevivência por sala
   em 30 combates dá 40% de runs completas; em 72, dá 11%. O tamanho da run é
   parte do balanceamento, não uma decisão de conteúdo. */
/* O TESOURO existia inteiro no código — premiação, oferta, replay — e nunca
   aparecia, porque não estava nesta lista. Entrou depois da Elite: é ali que
   a run acabou de cobrar caro e é ali que compensa devolver. */
export const SALAS = ['combate','evento','combate','elite','tesouro','loja',
                      'combate','descanso','boss'];
export const MUNDOS = 6;
export const COMBATE = new Set(['combate','elite','boss']);

/* A CURVA.

   O tabuleiro cresce de 6 para 30 pares, mas quem manda na dificuldade é a
   META — e ela sai de `pontosEsperados`, o que um jogador que não esquece
   nada consegue tirar daquele tabuleiro, e NÃO de `pontosPerfeitos`, que é
   uma sequência sem um erro sequer e não existe fora da planilha.

   A diferença entre os dois é o motivo de a primeira versão desta fórmula
   ter travado toda run na sala 15: as duas curvas crescem juntas, mas a
   distância entre elas cresce também, porque quanto maior o tabuleiro maior
   a fatia dele que você gasta só descobrindo o que tem.

   `fator` é o único número que aperta o jogo: 0,97 do esperado na primeira
   sala e 1,18 na última — passa de 1 porque lá no fim a build já multiplica.
   Elite e chefe cobram um pouco mais, e é por isso que pagam melhor.

   Este valor foi MEDIDO, não escolhido: `test/curva.mjs` solta o bot com
   memórias cada vez piores e imprime quanto o jogo cobra de quem esquece.
   Ele subiu de 0,88 para 1,00 quando o conteúdo cresceu: com 75 relíquias,
   28 eventos e as cartas Tempo e Prisma na mesa, o jogador ganhou ferramentas
   demais para a régua antiga — a taxa de vitória de quem esquece 6% tinha ido
   de 44% para 66%, e um jogo que se ganha sozinho para de ter decisão.

   Depois desceu para 0,97 pelo motivo contrário, e isto foi surpresa: as
   cinco famílias novas APERTARAM o jogo sem que uma linha da fórmula mudasse.
   Não porque sejam duras — Piratas, Samurai e Robôs ajudam — mas porque
   entrar de oito para treze DILUI as antigas, e as antigas eram generosas
   (Alquimia devolve virada, Xadrez dobra, Runas somam multiplicador). O
   sorteio pega duas famílias: quanto mais famílias existem, menor a chance de
   cair uma que carrega a sala. Conteúdo novo mexe no balanço mesmo quando
   cada peça nova é neutra, e é por isso que a régua se remede a cada lote.

   Com 0,97 a curva fica assim: memória perfeita vence 67% das runs, quem
   esquece 6% das cartas vence 47%, quem esquece 15% vence 15%, e quem
   esquece um terço vence 3%. O meio ficou mais íngreme que na medição
   anterior — com treze famílias, esquecer custa mais caro, porque a sala nem
   sempre traz a família que perdoa. É a forma que se quer: castiga esquecer,
   e não castiga ser novato. */
export function planoDaSala(mundo, indice, tipo){
  const total = MUNDOS*SALAS.length;
  const passo = mundo*SALAS.length + indice;
  const dif   = total>1 ? Math.min(1, passo/(total-1)) : 0;
  const pares = Math.min(30, 6 + Math.round(dif*24));
  const peso  = tipo==='elite' ? 1.06 : tipo==='boss' ? 1.12 : 1;
  const fator = (0.97 + dif*0.21) * peso;
  return {
    pares,
    dificuldade: dif * (tipo==='boss' ? 1 : 0.9),
    meta: Math.round(pontosEsperados(pares) * fator),
    viradas: Math.round(pares*1.5 + 8) + (tipo==='boss' ? 3 : 0),
  };
}

export class Run {
  constructor({ semente, classe, diario=false, replay=false }){
    this.semente = String(semente);
    this.diario = diario;
    this.replay = replay;
    this.classeId = classe;
    this.C = CLASSES[classe];
    if(!this.C) throw new Error('classe desconhecida: '+classe);
    this.rng = makeRNG(this.semente+'|'+classe);
    this.mundo = 0; this.indice = 0; this.tentativa = 0;
    this.foco = this.C.foco;
    this.bonusViradas = this.C.viradasBonus || 0;
    this.moedas = this.C.moedas;
    this.reliquias = [];
    this.pontos = 0;
    this.registro = [];
    this.morto = false;
    this.venceu = false;
    this.sala = null;
    this.chances = {};                 // segunda chance já usada, por mundo
    /* o dado dos eventos nasce aqui e é TROCADO a cada escolha por um
       derivado do lugar. Nascer aqui é o que garante que nenhum evento
       explode se alguém chamar o efeito por fora de `escolher` — foi assim
       que "O Jogo do Guarda" pareceu quebrado num teste. */
    this.sorte = makeRNG(this.semente+'|sorte');
    /* O QUE A RUN CONTA DE SI MESMA. Os quatro últimos campos existem para as
       conquistas, e nascem aqui e não na tela por um motivo de princípio: uma
       conquista medida pela tela seria uma conquista que o replay não confere.
       Contadas no motor, elas valem tanto na partida quanto na verificação. */
    this.estatisticas = { acertos:0, erros:0, maiorCombo:0, salas:0,
                          viradasSobrando:0, moedasGanhas:0,
                          melhorSala:0,      // a sala mais valiosa da run
                          limpas:0,          // tabuleiros terminados até a última carta
                          semErro:0,         // salas vencidas sem um erro sequer
                          chefes:[] };       // quem caiu, pelo id
    if(this.C.reliquiaExtra) this._darReliquia();
    /* relíquia que cobra na entrada (a Bolsa Furada dá moeda por par de Ouro
       e tira da bolsa inicial) — só vale para as que a run já começa tendo */
    for(const id of this.reliquias){
      const m = POR_ID[id]?.moedasIniciais;
      if(m) this.moedas = Math.max(0, this.moedas + m);
    }
  }
  _reg(j){ if(!this.replay) this.registro.push(j); }

  /* ---------- mapa ---------- */
  tipoSala(){ return SALAS[this.indice] || 'combate'; }
  ehCombate(){ return COMBATE.has(this.tipoSala()); }
  bossDoMundo(){ return BOSSES[BOSS_DO_MUNDO[this.mundo % BOSS_DO_MUNDO.length]]; }
  mapa(){
    return SALAS.map((t,i)=>({ tipo:t, i, feito:i<this.indice, atual:i===this.indice,
      boss: t==='boss' ? this.bossDoMundo() : null }));
  }
  plano(){ return planoDaSala(this.mundo, this.indice, this.tipoSala()); }
  acabou(){ return this.morto || this.venceu; }
  /* semente de propósito: o mesmo lugar sempre sorteia a mesma coisa */
  _sem(para){ return makeRNG(this.semente+'|'+para+'|'+this.mundo+'|'+this.indice); }

  /* ---------- abrir a sala ---------- */
  entrar(){
    if(this.acabou() || this.sala || !this.ehCombate()) return null;
    const tipo = this.tipoSala();
    const p = planoDaSala(this.mundo, this.indice, tipo);
    const mods = this._mods();
    this.sala = new Sala({
      rng: makeRNG(this.semente+'|s|'+this.mundo+'|'+this.indice+'|'+this.tentativa),
      pares:p.pares, meta:p.meta, dificuldade:p.dificuldade,
      viradas: p.viradas + (mods.viradas||0) + this.bonusViradas,
      foco: Math.max(1, this.foco + (mods.foco||0)),
      mods, boss: tipo==='boss' ? this.bossDoMundo() : null,
      ferramenta: this.C.ferramenta,
    });
    for(const r of this.reliquias) if(POR_ID[r]?.aoIniciar) POR_ID[r].aoIniciar(this.sala);
    if(this.C.inicioSala) this.C.inicioSala(this.sala);
    this._reg({ s:'sala', m:this.mundo, i:this.indice, t:this.tentativa });
    return this.sala;
  }
  _mods(){
    const m = { ...(this.C.mods||{}) };
    if(this.C.veTipos) m.veTipos = true;
    /* O QUE OS EVENTOS DEIXARAM. Um evento que promete "+4 de pontos na base
       de toda carta" e não passa por aqui é texto bonito: o jogador escolhe,
       paga o preço e não recebe nada. Cada campo destes é uma promessa feita
       numa sala de evento, cobrada em todas as salas seguintes. */
    if(this.baseExtra)    m.pontoBase = (m.pontoBase||0) + this.baseExtra;
    if(this.multExtra)    m.multCombo = (m.multCombo||0) + this.multExtra;
    if(this.memoriaExtra) m.memoria   = (m.memoria||0)   + this.memoriaExtra;
    if(this.espiaExtra)   m.espiar    = (m.espiar||0)    + this.espiaExtra;
    if(this.semeaOuro)    m.semeaOuro = (m.semeaOuro||0) + this.semeaOuro;
    if(this.pavioDobro)   m.pavioDobro = true;
    if(this.parGratis)    m.parGratis = (m.parGratis||0) + this.parGratis;
    for(const id of this.reliquias){
      const r = POR_ID[id]; if(!r?.mods) continue;
      for(const [k,v] of Object.entries(r.mods)){
        /* número soma, mapa FUNDE, o resto substitui. Sem a fusão, duas
           relíquias que mexem no mesmo mapa (multTipo, multFam) se apagariam
           uma à outra e a segunda pareceria não fazer nada. */
        if(typeof v === 'number') m[k] = (m[k]||0) + v;
        else if(v && typeof v === 'object' && !Array.isArray(v)){
          m[k] = { ...(m[k]||{}) };
          for(const [kk,vv] of Object.entries(v)) m[k][kk] = (m[k][kk] ?? 1) * vv;
        }
        else m[k] = v;
      }
    }
    return m;
  }

  /* ---------- a jogada, sempre registrada ---------- */
  virar(id){
    if(!this.sala || this.sala.fim) return { erro:'sem sala' };
    const rel = this.sala.virar(id);
    if(rel.erro) return rel;
    this._reg({ s:'v', c:id });
    this._gatilhos(rel);
    if(this.sala.fim) this._fecharSala();
    return rel;
  }
  /* encerrar a sala com a meta já batida. Vai para o registro como qualquer
     jogada: sem isso o replay do ranking terminaria a sala noutro ponto e o
     placar não bateria. */
  encerrarSala(){
    if(!this.sala || this.sala.fim) return { erro:'sem sala' };
    const rel = this.sala.encerrar();
    if(rel.erro) return rel;
    /* `fim` e não `e`: `e` já era a escolha de opção num evento. Dois códigos
       iguais no registro fazem o replay andar por um caminho e a partida por
       outro — e o placar deixa de bater no ranking sem ninguém entender. */
    this._reg({ s:'fim' });
    this._gatilhos(rel);
    this._fecharSala();
    return rel;
  }
  usarFerramenta(arg){
    if(!this.sala || this.sala.fim) return { erro:'sem sala' };
    const rel = this.sala.usarFerramenta(arg);
    if(rel.erro) return rel;
    this._reg({ s:'f', a: arg===undefined ? null : arg });
    this._gatilhos(rel);
    if(this.sala.fim) this._fecharSala();
    return rel;
  }
  /* OS GANCHOS DAS RELÍQUIAS.
     Uma relíquia que só sabe reagir a ACERTO acaba sempre virando "+N por
     acerto", e vinte delas assim são a mesma relíquia vinte vezes. O que abre
     espaço para efeito de verdade é ter onde pendurar: errar, virar, fechar a
     sala, entrar num mundo novo. Cada gancho aqui vale por uma dúzia de
     relíquias que não precisam de código próprio no motor. */
  _chamar(qual, ...args){
    for(const id of this.reliquias){
      const f = POR_ID[id]?.ao?.[qual];
      if(f) try { f(this.sala, ...args, this); } catch(e){}
    }
  }
  _gatilhos(rel){
    if(rel.eventos?.some(e=>e.e==='acerto')){
      this.estatisticas.acertos++;
      for(const id of this.reliquias){
        const r=POR_ID[id];
        if(r?.ao?.acerto) r.ao.acerto(this.sala, this.estatisticas.acertos, this.sala.combo, rel);
      }
    }
    if(rel.eventos?.some(e=>e.e==='erro')){
      this.estatisticas.erros++;
      if(this.C.erroRende) this.sala.mods.multCombo=(this.sala.mods.multCombo||0)+this.C.erroRende;
      this._chamar('erro', this.estatisticas.erros, rel);
    }
    /* uma tentativa inteira, tenha dado no que tiver dado */
    if(rel.eventos?.some(e=>e.e==='acerto'||e.e==='erro'))
      this._chamar('tentativa', rel);
    if(rel.eventos?.some(e=>e.e==='meta')) this._chamar('meta', rel);
  }

  _fecharSala(){
    const s = this.sala;
    this.estatisticas.maiorCombo = Math.max(this.estatisticas.maiorCombo, s.maiorCombo);
    if(s.fim==='vitoria'){
      this.estatisticas.viradasSobrando += Math.max(0, s.viradas);
      let p = s.pontos;
      if(this.C.dobraTudo) p*=2;
      if(s.mods.dobra) p*=2;
      /* moeda vira ponto. O passo é de 3 moedas por padrão e de 2 com a Pedra
         Filosofal, que é o que faz uma build de moeda deixar de ser só compra */
      if(s.mods.moedaVale)
        p = Math.round(p * (1 + Math.floor(s.moedas/(s.mods.moedaValePasso||3))*0.1));
      this.pontos += Math.round(p);
      this.moedas += s.moedas;
      this.estatisticas.moedasGanhas += s.moedas;
      this.estatisticas.salas++;
      const E = this.estatisticas;
      E.melhorSala = Math.max(E.melhorSala, s.pontos);
      if(s.emJogo().length < 2) E.limpas++;      // acabou o tabuleiro, não o relógio
      if(s.erros === 0) E.semErro++;
      if(this.tipoSala()==='boss') E.chefes.push(this.bossDoMundo().id);
      /* elite e chefe pagam a mais: é o que faz valer a pena entrar neles */
      const extra = this.tipoSala()==='boss' ? 60 : this.tipoSala()==='elite' ? 25 : 0;
      this.moedas += extra;
      this.estatisticas.moedasGanhas += extra;
      this.ultimaSala = { fim:'vitoria', pontos:s.pontos, sobra:s.viradas, extra };
      this._chamar('salaVencida', this.tipoSala());
      this.sala = null;
      this.tentativa = 0;
      /* NÃO avança sozinho: a sala vencida ainda deve uma recompensa, e é o
         jogador que escolhe (ou dispensa) — `passar()` é que fecha a porta. */
      this.aguardandoPremio = true;
      return;
    }
    /* RELÓGIO PARADO: a primeira derrota de cada mundo devolve a sala em vez
       de encerrar a run — com tabuleiro NOVO (a tentativa entra na semente),
       senão seria só decorar o mesmo baralho e voltar. */
    const mods = this._mods();
    if(mods.segundaChance && !this.chances[this.mundo]){
      this.chances[this.mundo] = true;
      this.tentativa++;
      this.ultimaSala = { fim:'retry', pontos:s.pontos };
      this.sala = null;
      return;
    }
    this.morto = true;
    this.ultimaSala = { fim:'derrota', pontos:s.pontos, motivo:
      s.foco<=0?'foco' : s.viradas<=0?'viradas' : 'tabuleiro' };
    this.sala = null;
  }
  _avancar(){
    this._prem = null; this._premChave = null;
    this._loja = null; this._lojaChave = null;
    this.aguardandoPremio = false;
    this.indice++;
    if(this.indice >= SALAS.length){
      this.indice = 0; this.mundo++;
      if(this.mundo >= MUNDOS) this.venceu = true;
      else for(const id of this.reliquias){
        const f = POR_ID[id]?.ao?.mundoNovo;
        if(f) try { f(this, this.mundo); } catch(e){}
      }
    }
  }

  /* ---------- recompensas ----------
     as ofertas nascem do LUGAR, não da ordem dos cliques. E `ganharReliquia`
     só aceita o que foi realmente oferecido: é mais uma porta que o replay
     confere sem precisar de servidor. */
  premios(n=3){
    const chave = this.mundo+':'+this.indice;
    if(this._premChave !== chave){
      this._premChave = chave;
      /* a Sacola de Feira alarga a oferta. Escolher entre quatro não é o mesmo
         que escolher entre três: a chance de a build achar a peça que falta
         sobe, e é isso que ela vende. */
      const mods = this._mods();
      const extra = Number(mods.premioExtra || 0);
      this._prem = sortearReliquias(this._sem('p'), n + extra, this.reliquias);
      this._premGasto = false;
    }
    return this._prem;
  }
  /* uma relíquia de graça. Com `raridade`, só daquele degrau — é o que a Bolso
     Secreto promete, e prometer "uma relíquia" e entregar lendária seria outra
     relíquia completamente diferente. */
  _darReliquia(raridade=null){
    const pool = raridade
      ? RELIQUIAS.filter(r=>r.r===raridade && !this.reliquias.includes(r.id))
      : null;
    const r = pool
      ? (pool.length ? this.rng.pick(pool) : null)
      : sortearReliquias(this.rng, 1, this.reliquias)[0];
    if(r) this.reliquias.push(r.id);
    return r || null;
  }
  /* só há relíquia para pegar em dois lugares: depois de uma sala vencida e
     na sala do tesouro. Fora daí a jogada é recusada — inclusive no replay,
     que é onde isso importa. */
  temPremio(){ return !this.sala && !this.acabou() &&
    (this.aguardandoPremio || this.tipoSala()==='tesouro'); }
  ganharReliquia(id){
    if(!this.temPremio()) return false;
    const oferta = this.premios();
    if(this._premGasto) return false;
    if(!POR_ID[id] || this.reliquias.includes(id)) return false;
    if(!oferta.some(r=>r.id===id)) return false;
    this.reliquias.push(id);
    this._premGasto = true;
    this._reg({ s:'rel', r:id });
    return true;
  }

  /* ---------- loja ---------- */
  PRECO = { comum:35, rara:60, lendaria:110 };
  loja(){
    const chave = this.mundo+':'+this.indice;
    if(this._lojaChave !== chave){
      this._lojaChave = chave;
      const rng = this._sem('l');
      const mods = this._mods();
      const desconto = Number(mods.desconto || 1);
      const quantos = 3 + Number(mods.lojaExtra || 0);
      const itens = sortearReliquias(rng, quantos, this.reliquias).map(r=>({
        id:r.id, nome:r.nome, r:r.r, d:r.d,
        preco: Math.max(5, Math.round(this.PRECO[r.r] * desconto)) }));
      itens.push({ id:'__foco', nome:'Hora de Silêncio', r:'servico',
        d:'+1 de Foco máximo pelo resto da run.', preco:55 });
      itens.push({ id:'__viradas', nome:'Mapa da Sala', r:'servico',
        d:'+2 viradas em toda sala pelo resto da run.', preco:70 });
      this._loja = itens;
    }
    return this._loja;
  }
  comprar(id){
    if(this.acabou()) return { ok:false, por:'a run acabou' };
    if(this.tipoSala()!=='loja') return { ok:false, por:'não tem loja aqui' };
    const item = this.loja().find(i=>i.id===id);
    if(!item) return { ok:false, por:'item indisponível' };
    if(item.vendido) return { ok:false, por:'item já vendido' };
    if(this.moedas < item.preco) return { ok:false, por:'moedas insuficientes' };
    this.moedas -= item.preco;
    item.vendido = true;
    if(id==='__foco') this.foco++;
    else if(id==='__viradas') this.bonusViradas += 2;
    else this.reliquias.push(id);
    this._reg({ s:'c', r:id });
    return { ok:true, item };
  }

  /* ---------- evento e fogueira ---------- */
  evento(){
    const t = this.tipoSala();
    if(t==='descanso') return {
      id:'descanso', nome:'A Fogueira', txt:'Nada acontece aqui. É esse o ponto.',
      ops:[ { txt:'Dormir', d:'+2 de Foco máximo' },
            { txt:'Estudar o mapa', d:'+3 viradas em toda sala' },
            { txt:'Revirar a mochila', d:'+25 moedas' } ] };
    if(t!=='evento') return null;
    return this._sem('ev').pick(EVENTOS);
  }
  escolher(i){
    if(this.acabou()) return { ok:false, por:'a run acabou' };
    const ev = this.evento();
    if(!ev || !ev.ops[i]) return { ok:false, por:'opção inválida' };
    this.sorte = this._sem('sorte');
    let txt;
    if(ev.id==='descanso'){
      if(i===0){ this.foco += 2; txt='Você acorda inteiro. Foco máximo: '+this.foco+'.'; }
      else if(i===1){ this.bonusViradas += 3; txt='+3 viradas em toda sala.'; }
      else { this.moedas += 25; txt='Achou 25 moedas no forro do casaco.'; }
    } else {
      txt = EVENTO_POR_ID[ev.id].ops[i].ef(this);
    }
    this._reg({ s:'e', o:i });
    this._avancar();
    return { ok:true, txt };
  }

  /* salas sem escolha (tesouro sem pegar, loja sem comprar) avançam assim */
  passar(){
    if(this.acabou() || this.sala) return false;
    this._reg({ s:'passa', m:this.mundo, i:this.indice });
    this._avancar();
    return true;
  }

  /* o que vai para o ranking — e o que basta para reconstruir tudo */
  placar(){
    return { v:1, semente:this.semente, classe:this.classeId, diario:!!this.diario,
             pontos:this.pontos, mundo:this.mundo, indice:this.indice,
             venceu:this.venceu, morto:this.morto, jogadas:this.registro.length,
             est:{...this.estatisticas}, reliquias:[...this.reliquias] };
  }
  /* o pacote inteiro: placar + prova. É isto que sobe para o relay. */
  pacote(){ return { placar:this.placar(), registro:this.registro }; }
}

/* ===================================================================
   VERIFICAR — refaz a run a partir da semente e das jogadas.

   É isto que substitui o servidor: o cliente que LÊ o ranking roda esta
   função e só aceita a linha se o placar bater. Assinar não prova nada em
   relay público; recalcular prova.

   Um teto de jogadas fecha a última porta: uma lista de um milhão de
   viradas travaria quem está só tentando ver o ranking, então lista grande
   demais é recusada antes de rodar.
   =================================================================== */
export const MAX_JOGADAS = 20000;

export function verificar(placar, registro){
  if(!placar || !Array.isArray(registro)) return { ok:false, por:'pacote incompleto' };
  if(registro.length > MAX_JOGADAS) return { ok:false, por:'registro grande demais' };
  if(!CLASSES[placar.classe]) return { ok:false, por:'classe inexistente' };
  let r;
  try {
    r = new Run({ semente:placar.semente, classe:placar.classe,
                  diario:placar.diario, replay:true });
  } catch(e){ return { ok:false, por:'não deu para montar a run' }; }

  for(const j of registro){
    if(r.morto) return { ok:false, por:'jogada depois da derrota' };
    switch(j?.s){
      case 'sala':
        if(r.mundo!==j.m || r.indice!==j.i || r.tentativa!==(j.t||0))
          return { ok:false, por:'entrou numa sala fora de ordem' };
        if(!r.entrar()) return { ok:false, por:'essa sala não abre' };
        break;
      case 'v': {
        const res = r.virar(j.c);
        if(res.erro) return { ok:false, por:'virada inválida: '+res.erro };
        break;
      }
      case 'fim': {
        const res = r.encerrarSala();
        if(res.erro) return { ok:false, por:'encerramento inválido: '+res.erro };
        break;
      }
      case 'f': {
        const res = r.usarFerramenta(j.a===null?undefined:j.a);
        if(res.erro) return { ok:false, por:'ferramenta inválida: '+res.erro };
        break;
      }
      case 'rel':
        if(!r.ganharReliquia(j.r)) return { ok:false, por:'relíquia que não foi oferecida' };
        break;
      case 'c': {
        const res = r.comprar(j.r);
        if(!res.ok) return { ok:false, por:'compra inválida: '+res.por };
        break;
      }
      case 'e': {
        const res = r.escolher(j.o);
        if(!res.ok) return { ok:false, por:'escolha inválida' };
        break;
      }
      case 'passa':
        if(r.mundo!==j.m || r.indice!==j.i) return { ok:false, por:'pulou a sala errada' };
        if(!r.passar()) return { ok:false, por:'não dava para pular aqui' };
        break;
      default: return { ok:false, por:'jogada desconhecida' };
    }
  }
  /* não basta o número final bater: onde a run PAROU também faz parte da
     prova. Sem isso, cortar as últimas jogadas passaria despercebido sempre
     que elas não tivessem rendido ponto. */
  const iguais = [
    [r.pontos, placar.pontos, 'pontos'],
    [r.venceu, !!placar.venceu, 'vitória'],
    [r.morto,  !!placar.morto,  'derrota'],
    [r.mundo,  placar.mundo,    'mundo'],
    [r.indice, placar.indice,   'sala'],
  ];
  const erro = iguais.find(([a,b])=> a!==b);
  return { ok: !erro, calculado:r.pontos, alegado:placar.pontos, run:r,
           por: erro ? `o placar não bate com as jogadas (${erro[2]})` : null };
}

export const TOTAL_RELIQUIAS = RELIQUIAS.length;
