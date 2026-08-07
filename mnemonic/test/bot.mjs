/* ========================================================================
   O BOT — um jogador de mentira, para medir o jogo de verdade.

   Ele existe por dois motivos, e os dois importam:

   1. BALANCEAMENTO. "A sala 40 está difícil?" não se responde no olho. O bot
      joga com MEMÓRIA PERFEITA — ele é o teto humano, o jogador que nunca
      esquece nada que já viu. Se nem ele passa da sala 20, a curva está
      errada, não o jogador.

   2. PROVA DO ANTI-CHEAT. Para testar `verificar()` é preciso uma run
      honesta, longa e cheia de coisa acontecendo. Escrever isso à mão dá uma
      run curta e mansa; o bot dá centenas.

   O que ele NÃO faz: ler `par`. Ele enxerga o que a tela mostra — símbolo,
   família e tipo de carta virada ou revelada. É por isso que ele cai no
   Mimic de vez em quando, igualzinho a gente.
   ===================================================================== */
import { COMBATE } from '../js/engine/run.js';
import { makeRNG } from '../js/rng.js';

/* o que a TELA mostra da carta. O Mimic desmascarado entra com chave
   diferente porque o jogo passa a marcá-lo — depois de cair uma vez, ver que
   aquela ali é falsa é informação, não memória. */
const chaveVisivel = c => c.simbolo + '|' + c.fam + (c.revelado ? '|M' : '');
const parDe = (a,b) => Math.min(a,b) + ':' + Math.max(a,b);

function usarFerramenta(run, sala, mem, fase){
  const f = run.C.ferramenta; if(!f) return;
  const arg = (() => {
    switch(f.id){
      case 'espiar': case 'escavar': case 'voltar': case 'foco': return undefined;
      case 'varrer': {
        const c = sala.fechadas().find(x=>x.tipo!=='normal') || sala.fechadas()[0];
        return c?.tipo;
      }
      case 'analisar': return sala.fechadas()[0]?.fam;
      case 'trocar': { const [a,b] = sala.fechadas(); return a&&b ? [a.id,b.id] : null; }
      case 'curinga': {
        const c = sala.fechadas().find(x=>!mem.has(x.id)) || sala.fechadas()[0];
        return c?.id;
      }
      default: return undefined;
    }
  })();
  const quando =
    f.id==='voltar' ? sala.erros>0 :
    f.id==='foco'   ? sala.combo>=3 :
    f.id==='curinga'? sala.essencia>=(f.custoEssencia||3) :
    f.id==='trocar' ? false :          // trocar de lugar só atrapalha o bot
    fase==='inicio';
  if(!quando || arg===null) return;
  run.usarFerramenta(arg);
}

export function jogarSala(run, opt={}){
  const s = run.sala; if(!s) return;
  /* ESQUECIMENTO. O bot de memória perfeita serve para provar que o jogo é
     terminável; ele não serve para medir dificuldade, porque a dificuldade
     DESTE jogo é justamente esquecer. `esquece` é a chance de uma carta
     memorizada escapar a cada tentativa — é o botão que transforma o bot em
     gente. Sorteado com semente própria: o bot continua determinístico, que
     é o que o teste de replay exige. */
  const p = opt.esquece || 0;
  const dado = makeRNG(run.semente+'|bot|'+run.mundo+'|'+run.indice+'|'+run.tentativa);
  const mem = new Map();                       // id -> o que ele lembra
  /* o caderninho de "essas duas eu JÁ tentei e não fecham". Sem ele o bot
     insiste no mesmo Mimic até acabar o Foco, o que nenhum jogador faz — e
     mediria uma dificuldade que não existe. */
  const naoCasa = new Set();
  /* a carta aparece por um instante e some: quem guarda é ele, não a tela */
  const anotar = () => {
    for(const c of s.cartas){
      if(c.resolvida){ mem.delete(c.id); continue; }
      if(c.vista || c.virada){ mem.set(c.id, chaveVisivel(c)); continue; }
      if(p && mem.has(c.id) && dado() < p) mem.delete(c.id);
    }
  };
  const abrir = c => { run.virar(c.id); if(!c.resolvida) mem.set(c.id, chaveVisivel(c)); };
  const tentar = (a,b) => {
    naoCasa.add(parDe(a.id,b.id));
    abrir(a);
    if(!s.fim) abrir(b);
    if(a.resolvida) naoCasa.delete(parDe(a.id,b.id));
  };
  usarFerramenta(run, s, mem, 'inicio');
  anotar();

  let guarda = 0;
  while(!s.fim && guarda++ < 4000){
    anotar();
    usarFerramenta(run, s, mem, 'meio');
    if(s.fim) break;
    const fechadas = s.fechadas();
    if(fechadas.length < 2) break;

    /* 1. um par que a memória garante e que ainda não deu errado */
    let a=null, b=null;
    const porChave = new Map();
    busca:
    for(const c of fechadas){
      const k = mem.get(c.id); if(!k) continue;
      for(const outra of (porChave.get(k)||[])){
        if(naoCasa.has(parDe(outra.id,c.id))) continue;
        a = outra; b = c; break busca;
      }
      if(!porChave.has(k)) porChave.set(k, []);
      porChave.get(k).push(c);
    }
    /* 2. duas órfãs fecham entre si — é regra, não sorte */
    if(!a){
      const orf = fechadas.filter(c=>c.orfa);
      for(let i=0;i<orf.length && !a;i++) for(let j=i+1;j<orf.length;j++)
        if(!naoCasa.has(parDe(orf[i].id,orf[j].id))){ a=orf[i]; b=orf[j]; break; }
    }
    if(a && b){ tentar(a,b); continue; }

    /* 3. explorar: abre uma inédita e procura par para ela */
    const inedita = fechadas.find(c=>!mem.has(c.id));
    const x = inedita || fechadas[0];
    abrir(x);
    if(s.fim) break;
    const k = chaveVisivel(x);
    const livre = c => !naoCasa.has(parDe(x.id, c.id));
    const restantes = s.fechadas().filter(c=>c.id!==x.id);
    const alvo = restantes.find(c=>mem.get(c.id)===k && livre(c))
              || restantes.find(c=>!mem.has(c.id))
              || restantes.find(livre)
              || restantes[0];
    if(!alvo) break;
    naoCasa.add(parDe(x.id, alvo.id));
    abrir(alvo);
    if(x.resolvida) naoCasa.delete(parDe(x.id, alvo.id));
  }
}

function pegarPremio(run){
  const p = run.premios();
  /* lendária primeiro; entre iguais, a primeira oferecida */
  const ordem = { lendaria:0, rara:1, comum:2 };
  const alvo = [...p].sort((x,y)=>ordem[x.r]-ordem[y.r])[0];
  if(alvo) run.ganharReliquia(alvo.id);
}
function comprar(run){
  for(let i=0;i<5;i++){
    const itens = run.loja().filter(x=>!x.vendido && x.preco<=run.moedas);
    if(!itens.length) break;
    itens.sort((x,y)=>y.preco-x.preco);
    if(!run.comprar(itens[0].id).ok) break;
  }
}

export function jogarRun(run, opt={}){
  let guarda = 0;
  while(!run.acabou() && guarda++ < 900){
    if(run.sala){ jogarSala(run, opt); continue; }
    if(run.aguardandoPremio){ pegarPremio(run); run.passar(); continue; }
    const t = run.tipoSala();
    if(COMBATE.has(t)){
      if(!run.entrar()) break;
      jogarSala(run, opt);
      continue;
    }
    if(t==='evento' || t==='descanso'){ if(!run.escolher(0).ok) run.passar(); continue; }
    if(t==='loja'){ comprar(run); run.passar(); continue; }
    if(t==='tesouro'){ pegarPremio(run); run.passar(); continue; }
    run.passar();
  }
  return run;
}
