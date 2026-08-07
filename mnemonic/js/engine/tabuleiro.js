/* ========================================================================
   O TABULEIRO E A SALA — o motor da partida, sem uma linha de DOM.

   Está separado da tela de propósito: é aqui que mora a regra, e regra sem
   teste é regra que ninguém sabe se funciona. A tela lê este estado e
   desenha; ela nunca decide nada.

   COMO SE VENCE UMA SALA: atingindo a META de pontos antes de acabarem as
   VIRADAS. Não é limpar o tabuleiro — limpar é apenas o jeito mais comum de
   chegar lá, e nas salas grandes costuma nem ser possível.

   DUAS PALAVRAS QUE O JOGO INTEIRO USA, e que valem a leitura:

     VISTA      — a carta está aparecendo AGORA. Dura uma tentativa e some.
     CONHECIDA  — VOCÊ já viu essa carta alguma vez. Isso nunca se apaga.

   A diferença decide o custo do erro: errar duas cartas que você nunca
   tinha visto é EXPLORAR, e explorar é de graça (custa só a virada). Errar
   duas cartas que você já conhecia é ESQUECER, e é só isso que consome
   FOCO. Sem essa separação o jogo puniria o jogador pelas primeiras
   viradas, que são obrigatoriamente às cegas.

   É também o que dá dente ao Fantasma e ao Hipnotizador: eles tiram a
   VISTA e deixam a CONHECIDA — apagam a cola, não a responsabilidade.
   ===================================================================== */
import { TIPOS, sortearTipos } from '../data/cartas.js';
import { sortearFamilias } from '../data/familias.js';

/* a escada de combo: nome e multiplicador. É a espinha do placar — dois
   pares seguidos já valem mais que dois pares separados, e é isso que faz o
   jogador arriscar em vez de virar carta por carta com segurança. */
export const COMBOS = [
  { n:0,  nome:'—',                mult:1.0 },
  { n:1,  nome:'Perfect',          mult:1.2 },
  { n:2,  nome:'Double Recall',    mult:1.5 },
  { n:3,  nome:'Triple Recall',    mult:2.0 },
  { n:5,  nome:'Memory Chain',     mult:2.6 },
  { n:7,  nome:'Brainstorm',       mult:3.3 },
  { n:10, nome:'Mind Break',       mult:4.2 },
  { n:14, nome:'Legendary Recall', mult:5.5 },
  { n:20, nome:'God Memory',       mult:8.0 },
];
export const degrauCombo = n => {
  let d = COMBOS[0];
  for(const c of COMBOS) if(n >= c.n) d = c;
  return d;
};

/* o teto teórico de uma sala com N pares: acerto atrás de acerto, sem um
   erro sequer, carta média. É a régua com que a META é calculada — meta
   solta no ar é meta que fica impossível lá pela sala 40. */
export const BASE_MEDIA = 11;
export function pontosPerfeitos(pares){
  let s = 0;
  for(let n=1; n<=pares; n++) s += degrauCombo(n).mult;
  return Math.round(s * BASE_MEDIA);
}

/* ...e o teto REAL, que é bem mais baixo. Num jogo da memória as primeiras
   viradas são obrigatoriamente às cegas: ninguém encadeia combo enquanto
   está descobrindo o tabuleiro. Um jogador que não esquece nada acha uns
   45% dos pares durante a exploração, com o combo quebrando o tempo todo, e
   só depois emenda o resto numa corrente limpa.

   A META sai daqui, e não do perfeito. Fazer a meta subir junto com o teto
   TEÓRICO é o erro clássico: o tabuleiro dobra de tamanho, o teto teórico
   dobra junto, e a sala 40 pede uma sequência de 30 acertos sem erro que só
   existe na planilha. */
export function pontosEsperados(pares){
  const explorando = Math.round(pares*0.45);
  let s = explorando * degrauCombo(1).mult;
  for(let n=1; n<=pares-explorando; n++) s += degrauCombo(n).mult;
  return Math.round(s * BASE_MEDIA);
}

/* A GRADE é em pé, não deitada.

   A conta óbvia — colunas ≈ √n — deixa a grade quadrada, e a razão pela qual
   ela foi trocada por √(n×0,74) continua valendo: a tela do celular é alta e
   estreita, e a grade em pé dá carta maior. Só que o 0,74 sozinho produzia
   grades feias e, pior, TORTAS: 16 cartas viravam 3 colunas por 6 filas, com
   a última fila carregando UMA carta sozinha. Ninguém enxerga um tabuleiro
   assim como um tabuleiro.

   Agora a escolha é uma pontuação, e o que ela cobra, em ordem:

     1. FILA TORTA é o pior defeito. Grade que não fecha exata paga por cada
        casa vazia, e paga em dobro quando a última fila fica com menos da
        metade das colunas — que é o caso da carta órfã no canto.
     2. GRADE COMPRIDA vem em seguida. Mais de uma fila de diferença entre
        colunas e filas já parece uma coluna de cartas, não uma mesa.
     3. Entre duas grades igualmente honestas, ganha a EM PÉ, pela mesma razão
        de sempre: numa tela alta, mais filas que colunas dá carta maior.

   Com isso 16 cartas viram 4×4, 25 viram 5×5, e o pior caso do jogo inteiro
   fica com uma fila de diferença. */
export function colunasPara(n){
  if(n <= 4) return 2;
  let melhor = null, melhorNota = Infinity;
  for(let c = 2; c <= Math.min(8, n); c++){
    const f = Math.ceil(n / c);
    const dif = Math.abs(f - c);
    if(dif > 1) continue;                        /* mais que isso não é mesa */
    const vazias = c * f - n;
    const ultima = n - (f - 1) * c;               /* quantas na fila de baixo */
    const nota = vazias * 4                       /* casa vazia incomoda */
               + (ultima * 2 < c ? 6 : 0)         /* fila de baixo pela metade */
               + dif * 2                          /* comprida incomoda menos */
               + (c > f ? 3 : 0);                 /* deitada, só em empate */
    if(nota < melhorNota){ melhorNota = nota; melhor = c; }
  }
  /* nenhuma grade quase quadrada serve (tabuleiro enorme): volta à razão da
     tela, que ao menos aproveita a altura */
  return melhor ?? Math.max(3, Math.min(10, Math.round(Math.sqrt(n * 0.74))));
}

export class Sala {
  /* opts: { rng, pares, meta, viradas, foco, dificuldade, mods, boss, ferramenta } */
  constructor(o){
    this.rng = o.rng;
    this.dificuldade = o.dificuldade ?? 0;
    this.mods = o.mods || {};          // o que as relíquias e a classe mexeram
    this.boss = o.boss || null;
    this.familias = sortearFamilias(this.rng, this.dificuldade);
    this.pares = o.pares;
    this.meta = o.meta;
    this.viradasMax = o.viradas;
    this.viradas = o.viradas;
    this.foco = o.foco;
    this.focoMax = o.foco;
    this.pontos = 0;
    this.moedas = 0;
    this.combo = 0;
    this.maiorCombo = 0;
    this.acertos = 0;
    this.erros = 0;
    this.essencia = 0;
    this.turno = 0;                    // viradas gastas, para pavios e ciclos
    this.abertas = [];                 // ids virados agora (0, 1 ou 2)
    this.fim = null;                   // 'vitoria' | 'derrota'
    this.passou = false;               // a meta já foi batida? (piso, não fim)
    this.fer = o.ferramenta || null;   // ferramenta da classe
    this.usosFer = o.ferramenta?.usos ?? 0;
    this._novas = [];                  // por virada: a carta era inédita?
    this.cartas = this._montar();
    this.colunas = colunasPara(this.cartas.length);
    if(this.boss?.inicio) this.boss.inicio(this);
  }

  /* ---------- montagem ---------- */
  _montar(){
    const rng = this.rng;
    const tipos = sortearTipos(rng, this.pares, this.dificuldade);
    /* símbolos distintos: dois pares com o mesmo desenho seriam um bug de
       regra, não uma dificuldade — o jogador acertaria "errado" e teria
       razão de reclamar. A única exceção é o Mimic, e ela é a graça dele. */
    const disp = [];
    for(const f of this.familias) for(const s of f.s) disp.push({ fam:f.id, s });
    rng.shuffle(disp);
    const cartas = [];
    for(let p=0; p<this.pares; p++){
      const t = TIPOS[tipos[p]];
      const d = disp[p % disp.length];
      for(let k=0;k<2;k++) cartas.push({
        id: cartas.length, par:p, tipo:t.id, fam:d.fam, simbolo:d.s,
        virada:false, resolvida:false,
        vista:false,                   // está aparecendo agora
        vistaAte:-1,                   // até que tentativa continua aparecendo
        conhecida:false,               // você já viu — isso não se apaga
        camadas: t.camadas || 1,
        pavio: t.pavio || 0,
        marcada:false,                 // Egito: nunca esquece
        orfa:false,                    // perdeu o par para um curinga
        revelado:false,                // Mimic desmascarado
      });
    }
    /* O MIMIC copia um PAR inteiro, não uma carta solta. O tabuleiro passa a
       mostrar quatro cartas com o mesmo desenho: duas verdadeiras que fecham
       entre si, e duas falsas que fecham entre si. Verdadeira com falsa não
       fecha nunca — e é isso que faz o jogador ter que lembrar de POSIÇÃO, e
       não só de desenho. Se cada Mimic copiasse um alvo diferente, ele viraria
       carta impossível de achar, que é castigo e não armadilha. */
    const pares = [...new Set(cartas.map(c=>c.par))];
    for(const p of pares){
      const m = cartas.filter(c=>c.par===p);
      if(m[0].tipo!=='mimic') continue;
      const alvo = rng.pick(cartas.filter(x=>x.par!==p && x.tipo!=='mimic'));
      if(alvo) for(const c of m){ c.simbolo=alvo.simbolo; c.fam=alvo.fam; }
    }
    rng.shuffle(cartas);
    cartas.forEach((c,i)=> c.pos = i);
    return cartas;
  }

  /* ---------- consultas ---------- */
  emJogo(){ return this.cartas.filter(c=>!c.resolvida); }
  fechadas(){ return this.cartas.filter(c=>!c.resolvida && !c.virada); }
  porPos(){ return [...this.cartas].sort((a,b)=>a.pos-b.pos); }
  temFamilia(id){ return this.familias.some(f=>f.id===id); }
  degrau(){ return degrauCombo(this.combo); }
  multCombo(){
    const d = degrauCombo(this.combo);
    const dobra = this._concentrado ? 2 : 1;
    return (d.mult + (this.mods.multCombo||0) + (this._bonusRunas||0)) * dobra;
  }
  /* o que a tela precisa saber para pintar a prévia sem recalcular regra */
  valorDe(c){
    const t = TIPOS[c.tipo];
    let base = (t.base||10) + (this.mods.pontoBase||0);
    let mult = (t.mult||1);
    if(c.fam==='dragoes') mult *= 1.5;
    return Math.round(base * mult * this.multCombo());
  }

  /* ---------- memória ----------
     A carta aparece e some. Se `vista` durasse para sempre, a tela guardaria
     o tabuleiro inteiro por você e o jogo da memória não teria memória
     nenhuma — seria só clicar no que está marcado. Por padrão a marca vale
     a tentativa em que apareceu e acabou ali; relíquia de memória estica
     esse prazo, e é isso que uma relíquia de memória deve fazer. */
  _mostrar(c){
    c.conhecida = true; c.vista = true;
    c.vistaAte = this.turno + 1 + (this.mods.memoria||0);
  }
  /* some da tela AGORA, e marca nenhuma segura (é o que o Fantasma faz) */
  _apagarTela(c){ if(c.marcada) return; c.vista = false; c.vistaAte = -1; }
  /* a carta mudou de verdade (símbolo novo, lugar novo): esquecer é justo */
  _esquecer(c){ if(!c.marcada){ c.vista=false; c.vistaAte=-1; } c.conhecida = false; }
  _expirarVista(){
    for(const c of this.cartas)
      if(!c.marcada && !c.virada) c.vista = c.vistaAte > this.turno;
  }

  /* ---------- a jogada ---------- */
  /* devolve um RELATÓRIO do que aconteceu; a tela anima a partir dele em vez
     de recalcular, senão o número que aparece e o número que contou saem
     diferentes — e é sempre o jogador que percebe primeiro. */
  virar(id){
    if(this.fim) return { erro:'sala acabou' };
    const c = this.cartas.find(x=>x.id===id);
    if(!c || c.resolvida || c.virada) return { erro:'carta indisponível' };
    if(this.abertas.length >= 2) return { erro:'resolva o par aberto' };

    const inedita = !c.conhecida;
    c.virada = true; this._mostrar(c);
    this.abertas.push(c.id);
    this._novas.push(inedita);
    const rel = { tipo:'virou', carta:c.id, inedita, eventos:[] };
    if(this.abertas.length < 2) return rel;

    /* fechou uma tentativa: gasta virada e resolve */
    const graca = this.mods.graça||0;
    const viradasAntes = this.viradas;
    if(this.turno >= graca) this.viradas--;
    else rel.eventos.push({ e:'graca' });
    this.turno++;
    const [a,b] = this.abertas.map(i=>this.cartas.find(x=>x.id===i));
    const eramNovas = this._novas.some(Boolean);
    const casou = this._casa(a,b);
    if(casou) this._acertou(a,b,rel); else this._errou(a,b,rel,eramNovas,viradasAntes);
    this.abertas = []; this._novas = [];
    this._marcarOrfas(rel);
    this._passarTempo(rel);
    /* por último: as duas cartas da tentativa foram mostradas com prazo
       `turno anterior + 1`, que agora já venceu, e some cada uma. O que foi
       revelado DURANTE a resolução ganhou prazo `turno + 1` e continua na
       tela para a próxima tentativa — é o "por um instante" das descrições. */
    this._expirarVista();
    this._checarFim(rel);
    return rel;
  }

  _casa(a,b){
    /* o Mimic só fecha com o próprio Mimic. Ele imita um par verdadeiro, e
       tentar casar imitação com original é exatamente o erro que ele existe
       para provocar. */
    if(a.tipo==='mimic' || b.tipo==='mimic') return a.par===b.par;
    if(TIPOS[a.tipo].curinga || TIPOS[b.tipo].curinga) return true;
    if(a.orfa && b.orfa) return true;   // dois restos fecham entre si
    return a.par === b.par;
  }

  _acertou(a,b,rel){
    /* GELO trinca antes de quebrar: consome uma camada e volta a fechar */
    if(a.camadas>1 || b.camadas>1){
      a.camadas=Math.max(1,a.camadas-1); b.camadas=Math.max(1,b.camadas-1);
      a.virada=false; b.virada=false;
      rel.eventos.push({ e:'trincou', cartas:[a.id,b.id] });
      return;                                            // não zera, não sobe
    }
    a.resolvida=true; b.resolvida=true;
    a.virada=false; b.virada=false;
    this.acertos++; this.combo++;
    this.maiorCombo = Math.max(this.maiorCombo, this.combo);
    if(this.mods.ganhaEssencia) this.essencia++;

    const t = TIPOS[a.tipo].curinga ? TIPOS[b.tipo] : TIPOS[a.tipo];
    let base = (t.base||10) + (this.mods.pontoBase||0);
    let mult = (t.mult||1);
    /* DRAGÕES pagam mais e cobram nos erros (o custo está em _errou) */
    if(a.fam==='dragoes'||b.fam==='dragoes') mult *= 1.5;
    /* XADREZ: os dois primeiros pares da família valem dobrado */
    if((a.fam==='xadrez'||b.fam==='xadrez') && (this._xadrez||0) < 2){
      this._xadrez=(this._xadrez||0)+1; mult*=2;
      rel.eventos.push({ e:'xadrez' });
    }
    const ganho = Math.round(base * mult * this.multCombo());
    this.pontos += ganho;
    /* POR QUE este par fechou. Oito e meio por cento dos pares do jogo fecham
       com cartas de desenhos DIFERENTES — pelo curinga ou por duas órfãs — e
       sem dizer o motivo isso parece defeito para quem está jogando. O motor
       sabe; quem tem de contar é ele, porque a tela não pode refazer a conta. */
    const por = a.par===b.par ? 'par'
              : (TIPOS[a.tipo].curinga || TIPOS[b.tipo].curinga) ? 'curinga' : 'orfas';
    rel.ganho = ganho; rel.mult = this.multCombo(); rel.par = [a.id,b.id]; rel.por = por;
    rel.eventos.push({ e:'acerto', cartas:[a.id,b.id], pontos:ganho, combo:this.combo, por });

    /* o que o TIPO faz ao ser resolvido */
    if(t.moedas){ const m=t.moedas+(this.mods.moedaBonus||0); this.moedas+=m;
      rel.eventos.push({ e:'moedas', n:m }); }
    if(t.embaralha) this._embaralhar(t.embaralha, rel);
    if(t.acorrenta) this._revelarUma(rel);
    if(t.revelaFamilia) this._revelarFamilia(a.fam, rel);
    /* o que a FAMÍLIA faz */
    if(a.fam==='alquimia'||b.fam==='alquimia'){ this.viradas++;
      rel.eventos.push({ e:'virada_extra' }); }
    if(a.fam==='runas'||b.fam==='runas'){ this._bonusRunas=(this._bonusRunas||0)+0.1;
      rel.eventos.push({ e:'runa' }); }
    if(a.fam==='tecnologia'||b.fam==='tecnologia'){
      this._tec=(this._tec||0)+1;
      if(this._tec%3===0) this._revelarUma(rel);
    }
    if(a.fam==='egito'||b.fam==='egito') this._marcarProxima=true;
  }

  _errou(a,b,rel,eramNovas,viradasAntes){
    this.erros++;
    /* DESCOBERTA não custa Foco. ESQUECIMENTO custa. */
    let custo = eramNovas ? 0 : 1;
    if(custo && this.emJogo().some(c=>c.tipo==='veneno')) custo++;
    for(const c of [a,b]) if(c.tipo==='mimic'){
      custo++; c.revelado = true;
      rel.eventos.push({ e:'mimic', carta:c.id });
    }
    if(this.mods.erroDobra) custo *= 2;
    custo = Math.max(0, custo - (this.mods.blindagem||0));
    /* fotografia do que dá para desfazer, antes de estragar (Cronomante).
       A virada guardada é a de ANTES da tentativa: desfazer o erro tem que
       devolver a virada que ele custou, senão a Ampulheta não desfaz nada. */
    this._ultimoErro = { combo:this.combo, foco:this.foco,
                         viradas: viradasAntes ?? this.viradas };
    this.foco -= custo;
    /* MITOLOGIA (e a Pena do Escriba) não zeram o combo: cortam pela metade */
    const meio = a.fam==='mitologia' || b.fam==='mitologia' || this.mods.meioCombo;
    this.combo = meio ? Math.floor(this.combo/2) : 0;
    this._concentrado = false;
    if(a.fam==='dragoes'||b.fam==='dragoes') this.moedas = Math.max(0,this.moedas-1);
    a.virada=false; b.virada=false;
    /* FANTASMA apaga o que você acabou de ver — mas não o fato de ter visto */
    for(const c of [a,b]) if(TIPOS[c.tipo].esconde) this._apagarTela(c);
    if(this.mods.consolo) this._revelarUma(rel);
    rel.eventos.push({ e:'erro', cartas:[a.id,b.id], custo, combo:this.combo,
                       descoberta:!!eramNovas });
  }

  /* invariante do tabuleiro: carta cuja dupla foi embora vira ÓRFÃ, e duas
     órfãs fecham par entre si. Sem isto, um curinga que casa com uma carta
     comum deixa a dupla dela impossível — tabuleiro insolúvel é bug, não
     dificuldade. Como só saem cartas de dois em dois, o número de órfãs é
     sempre par, e portanto elas sempre têm com quem fechar. */
  /* TIRAR CARTAS DO JOGO — bomba que estoura, chefe que apaga um par.
     Sai sempre de dois em dois, e é obrigatório: com um número ímpar de
     cartas em jogo sobra uma que nunca fecha com ninguém. Se a carta já era
     órfã, ela sai acompanhada de outra órfã; se não houver, não sai. */
  _removerPar(c, rel, evento='sumiu'){
    /* carta que já saiu não sai de novo. Sem esta linha, as DUAS cartas de um
       par de Bombas estouravam na mesma virada: a primeira levava as duas, e a
       segunda — já resolvida — caía no ramo da órfã e arrastava uma carta
       solta e inocente junto, deixando um número ímpar em jogo. */
    if(c.resolvida) return false;
    let dupla = this.emJogo().filter(x=>x.par===c.par);
    if(dupla.length < 2){
      const outra = this.emJogo().find(x=>x.orfa && x.id!==c.id);
      if(!outra) return false;
      dupla = [c, outra];
    }
    for(const x of dupla){ x.resolvida = true; x.sumiu = true; x.virada = false; }
    this.abertas = this.abertas.filter(id=>!dupla.some(x=>x.id===id));
    rel.eventos.push({ e:evento, cartas:dupla.map(x=>x.id) });
    return true;
  }

  _marcarOrfas(rel){
    const conta = {};
    for(const c of this.emJogo()) conta[c.par] = (conta[c.par]||0)+1;
    const novas = [];
    for(const c of this.emJogo()) if(conta[c.par]===1 && !c.orfa){
      c.orfa = true; novas.push(c.id);
    }
    if(novas.length) rel.eventos.push({ e:'orfa', cartas:novas });
  }

  /* ---------- o que passa a cada virada ---------- */
  _passarTempo(rel){
    for(const c of this.emJogo()){
      if(c.resolvida) continue;      // saiu no meio deste mesmo laço
      if(c.pavio>0){
        c.pavio--;
        if(c.pavio===0){
          this.foco--;
          this._removerPar(c, rel, 'explodiu');
        }
      }
      const t=TIPOS[c.tipo];
      if(t.trocaSimbolo && this.turno % t.trocaSimbolo === 0) this._trocarSimbolo(c, rel);
    }
    if(this.temFamilia('espaco') && this.turno % 6 === 0) this._girarEspaco(rel);
    if(this._marcarProxima){ this._marcarProxima=false;
      const alvo=this.rng.pick(this.fechadas());
      if(alvo){ alvo.marcada=true; this._mostrar(alvo);
        rel.eventos.push({ e:'marcou', carta:alvo.id }); } }
    if(this.boss?.turno) this.boss.turno(this, rel);
    this._marcarOrfas(rel);
  }

  /* CAMALEÃO troca com o PARCEIRO junto: se só um trocasse, o par deixaria
     de existir e a carta viraria impossível — dificuldade que não tem
     resposta é bug, não desafio. */
  _trocarSimbolo(c, rel){
    const irmao = this.cartas.find(x=>x.par===c.par && x.id!==c.id && !x.resolvida);
    /* O DESENHO NOVO NÃO PODE COLIDIR com o de outro par em jogo.
       `_montar` garante desenhos distintos, mas o Camaleão sorteava um
       símbolo qualquer da família e podia cair no desenho de outro par — o
       tabuleiro então mostrava dois pares iguais, o jogador tentava fechar
       os dois "iguais" e errava com toda a razão. A garantia de desenhos
       distintos tem de valer a partida INTEIRA, não só na montagem. */
    const usados = new Set(this.emJogo()
      .filter(x => x.par!==c.par && x.tipo!=='mimic')
      .map(x => x.fam+'|'+x.simbolo));
    const livres = [];
    for(const f of this.familias) for(const sim of f.s)
      if(!usados.has(f.id+'|'+sim)) livres.push({ fam:f.id, sim });
    if(!livres.length) return;      // sem desenho livre, melhor não trocar
    const d = this.rng.pick(livres);
    for(const x of [c, irmao]) if(x){ x.fam=d.fam; x.simbolo=d.sim; this._esquecer(x); }
    rel.eventos.push({ e:'camaleao', cartas:[c.id, irmao?.id].filter(x=>x!=null) });
  }
  _embaralhar(n, rel){
    const alvos = this.rng.sample(this.fechadas(), n*2);
    for(let i=0;i+1<alvos.length;i+=2){
      const p=alvos[i].pos; alvos[i].pos=alvos[i+1].pos; alvos[i+1].pos=p;
      this._esquecer(alvos[i]); this._esquecer(alvos[i+1]);
    }
    if(alvos.length>1) rel.eventos.push({ e:'embaralhou', cartas:alvos.map(c=>c.id) });
  }
  _girarEspaco(rel){
    const alvos = this.fechadas().filter(c=>c.fam==='espaco');
    if(alvos.length<2) return;
    const pos = alvos.map(c=>c.pos);
    this.rng.shuffle(pos);
    alvos.forEach((c,i)=>{ c.pos=pos[i]; this._esquecer(c); });
    rel.eventos.push({ e:'espaco', cartas:alvos.map(c=>c.id) });
  }
  _revelarFamilia(fam, rel){
    const alvos = this.fechadas().filter(c=>c.fam===fam);
    for(const c of alvos) this._mostrar(c);
    if(alvos.length) rel.eventos.push({ e:'revelou', cartas:alvos.map(c=>c.id) });
  }
  _revelarUma(rel){
    const alvo = this.rng.pick(this.fechadas().filter(c=>!c.vista))
              || this.rng.pick(this.fechadas());
    if(alvo){ this._mostrar(alvo); rel.eventos.push({ e:'revelou', cartas:[alvo.id] }); }
  }

  /* A META É PISO, NÃO LINHA DE CHEGADA.
     Antes a sala fechava no instante em que os pontos batiam a meta, e isso
     tirava do jogo justamente a parte que ele tem de melhor: a decisão de
     CONTINUAR. Com a sala fechando sozinha, tanto fazia limpar o tabuleiro ou
     bater a meta na raspa — o resultado era o mesmo, e o combo alto virava
     enfeite, porque a sala acabava antes de valer.

     Agora a meta só acende o `passou`. A sala termina quando o tabuleiro
     acaba, quando as viradas acabam ou quando o Foco zera — e o desfecho é
     vitória se a meta já foi batida, derrota se não. Quem quiser arriscar
     mais dez pares depois de garantir a passagem, arrisca; quem errar demais
     tentando, perde uma sala que já estava ganha. Essa escolha é o jogo. */
  _checarFim(rel){
    if(this.pontos >= this.meta && !this.passou){
      this.passou = true;
      rel.eventos.push({ e:'meta' });          /* a tela comemora aqui */
    }
    const semCarta = this.emJogo().length < 2;
    if(!(this.foco <= 0 || this.viradas <= 0 || semCarta)) return;

    if(this.passou){
      this.fim = 'vitoria';
      /* virada que sobra vira moeda: recompensa quem lembra, não quem chuta */
      const sobra = Math.max(0, this.viradas);
      this.moedas += sobra * (1 + (this.mods.moedaSobra||0));
      rel.eventos.push({ e:'vitoria', sobra,
        motivo: semCarta ? 'tabuleiro' : this.foco<=0 ? 'foco' : 'viradas' });
      return;
    }
    this.fim = 'derrota';
    rel.eventos.push({ e:'derrota',
      motivo: this.foco<=0?'foco' : this.viradas<=0?'viradas':'tabuleiro' });
  }

  /* ENCERRAR POR VONTADE PRÓPRIA.
     Com a meta virando piso, quem bateu passou a ser obrigado a jogar até
     acabar alguma coisa — e virada que sobra vira MOEDA, então jogar até o
     fim custa relíquia lá na frente. Isso não é escolha, é imposto.

     Aqui está a decisão de verdade da sala: com a meta garantida, ou você
     continua e soma pontos, ou fecha agora e leva as viradas em moeda. Pontos
     ganham o ranking; moeda ganha a run. Só funciona depois de `passou` —
     desistir de uma sala não ganha continua não existindo. */
  encerrar(){
    if(this.fim) return { erro:'sala encerrada' };
    if(!this.passou) return { erro:'a meta ainda não foi batida' };
    const rel = { tipo:'encerrou', eventos:[] };
    this.fim = 'vitoria';
    const sobra = Math.max(0, this.viradas);
    this.moedas += sobra * (1 + (this.mods.moedaSobra||0));
    rel.eventos.push({ e:'vitoria', sobra, motivo:'escolha' });
    return rel;
  }

  /* ---------- preview do Palácio da Memória ----------
     mostra tudo e depois some. Não mexe em `conhecida`: foi o item que
     mostrou, não o jogador que viu e esqueceu. E não sorteia nada, então
     não desencaixa o replay. */
  abrirPreview(){ if(!this.mods.preview) return false;
    for(const c of this.cartas) c.vista = true; return true; }
  fecharPreview(){ for(const c of this.cartas) if(!c.marcada){ c.vista=false; c.vistaAte=-1; } }

  /* ---------- a ferramenta da classe ----------
     tudo que sorteia tem que passar por aqui e ser REGISTRADO pela Run,
     senão o replay do ranking anda por um caminho e a partida original por
     outro, e a verificação acusa trapaça de quem jogou limpo. */
  usarFerramenta(arg){
    if(this.fim) return { erro:'sala acabou' };
    const f = this.fer;
    if(!f) return { erro:'sem ferramenta' };
    const rel = { tipo:'ferramenta', f:f.id, eventos:[] };
    if(f.custoEssencia){
      if(this.essencia < f.custoEssencia) return { erro:'essência insuficiente' };
    } else if(this.usosFer <= 0) return { erro:'sem usos' };

    switch(f.id){
      case 'espiar': {
        const ids = this.espiar(2);
        if(!ids.length) return { erro:'nada para espiar' };
        rel.eventos.push({ e:'revelou', cartas:ids }); break;
      }
      case 'voltar': {
        const u = this._ultimoErro;
        if(!u) return { erro:'nenhum erro para desfazer' };
        this.combo = u.combo; this.foco = u.foco; this.viradas = u.viradas;
        this._ultimoErro = null;
        rel.eventos.push({ e:'voltou' }); break;
      }
      /* MÃO LEVE — força um par entre duas cartas fechadas.
         Antes ela trocava as duas de LUGAR, e num jogo da memória posição é
         exatamente o que o jogador decorou: a ferramenta embaralhava a
         própria cabeça de quem a usava, e não mexia em uma regra sequer. Era
         a única do jogo que atrapalhava mais do que ajudava.

         Agora ela faz o que o lema promete — se o tabuleiro não ajuda, muda o
         tabuleiro: as duas cartas escolhidas passam a ser par uma da outra. As
         duas antigas parceiras não somem, ficam ÓRFÃS, que é a mecânica que o
         jogo já tem para carta que perdeu a dupla — e órfãs fecham entre si.
         O tabuleiro continua fechando certinho. */
      case 'trocar': {
        const a2 = this.cartas.find(x=>x.id===arg?.[0]);
        const b2 = this.cartas.find(x=>x.id===arg?.[1]);
        if(!a2 || !b2 || a2===b2) return { erro:'cartas inválidas' };
        if(a2.resolvida || b2.resolvida) return { erro:'carta já resolvida' };
        if(a2.par === b2.par) return { erro:'essas duas já são par' };
        const sobraA = this.cartas.find(x=>x.par===a2.par && x!==a2 && !x.resolvida);
        const sobraB = this.cartas.find(x=>x.par===b2.par && x!==b2 && !x.resolvida);
        /* o par novo herda a cara de uma delas, para o desenho não mentir */
        b2.par = a2.par; b2.fam = a2.fam; b2.simbolo = a2.simbolo;
        b2.orfa = false; a2.orfa = false;
        for(const s2 of [sobraA, sobraB]) if(s2) s2.orfa = true;
        rel.eventos.push({ e:'emparelhou', cartas:[a2.id, b2.id],
                           orfas:[sobraA?.id, sobraB?.id].filter(x=>x!=null) });
        break;
      }
      case 'varrer': {
        const alvos = this.fechadas().filter(c=>c.tipo===arg);
        if(!alvos.length) return { erro:'nenhuma carta desse tipo' };
        for(const c of alvos) this._mostrar(c);
        rel.eventos.push({ e:'revelou', cartas:alvos.map(c=>c.id) }); break;
      }
      case 'curinga': {
        const c = this.cartas.find(x=>x.id===arg);
        if(!c || c.resolvida || c.virada) return { erro:'carta inválida' };
        c.tipo='espelho'; this.essencia -= f.custoEssencia;
        rel.eventos.push({ e:'transmutou', carta:c.id }); break;
      }
      case 'analisar': {
        const alvos = this.fechadas().filter(c=>c.fam===arg);
        if(!alvos.length) return { erro:'nenhuma carta dessa família' };
        for(const c of alvos) this._mostrar(c);
        rel.eventos.push({ e:'revelou', cartas:alvos.map(c=>c.id) }); break;
      }
      case 'escavar': {
        const c = this.rng.pick(this.fechadas().filter(x=>!x.orfa));
        if(!c) return { erro:'nada para escavar' };
        const par = this.cartas.filter(x=>x.par===c.par && !x.resolvida);
        if(par.length<2) return { erro:'nada para escavar' };
        this.abertas = []; this._novas = [];
        this._acertou(par[0], par[1], rel);
        this._marcarOrfas(rel); this._checarFim(rel); break;
      }
      case 'foco': {
        this._concentrado = true;
        rel.eventos.push({ e:'concentrou' }); break;
      }
      default: return { erro:'ferramenta desconhecida' };
    }
    if(!f.custoEssencia) this.usosFer--;
    return rel;
  }

  espiar(n=2){
    const alvos = this.rng.sample(this.fechadas().filter(c=>!c.vista), n);
    for(const c of alvos) this._mostrar(c);
    return alvos.map(c=>c.id);
  }
  trocarPosicao(idA, idB){
    const a=this.cartas.find(c=>c.id===idA), b=this.cartas.find(c=>c.id===idB);
    if(!a||!b||a===b||a.resolvida||b.resolvida) return false;
    const p=a.pos; a.pos=b.pos; b.pos=p; return true;
  }
  devolverVirada(n=1){ this.viradas+=n; }
}
