/* ========================================================================
   QUEM JÁ GANHOU O QUÊ.

   `data/conquistas.js` é a tabela; aqui é o carimbo. A diferença importa:
   a tabela diz o que É preciso fazer, e este arquivo guarda o que JÁ foi
   feito, para o jogo poder comemorar no instante em que acontece em vez de
   descobrir depois, num menu.

   O carimbo é definitivo. Uma conquista provada uma vez fica ganha para
   sempre, mesmo que o número que a provou volte a cair — apagar o histórico
   do aparelho pode zerar o perfil, e uma medalha que desaparece sozinha é
   pior do que medalha nenhuma.
   ===================================================================== */
import { CONQUISTAS, POR_ID_CONQ } from '../data/conquistas.js';
import { perfil } from './perfil.js';
import { quantosViu } from './descobertas.js';
import { LISTA_TIPOS } from '../data/cartas.js';
import { LISTA_FAMILIAS } from '../data/familias.js';
import { LISTA_CLASSES } from '../data/classes.js';
import { LISTA_BOSSES } from '../data/bosses.js';
import { RELIQUIAS } from '../data/reliquias.js';

const CHAVE = 'mnemonic.medalhas';

function ler(){
  try { const v = JSON.parse(localStorage.getItem(CHAVE) || '[]');
        return Array.isArray(v) ? new Set(v) : new Set(); } catch(e){ return new Set(); }
}
let ganhas = ler();

const TOTAL = {
  carta: () => LISTA_TIPOS.length,
  familia: () => LISTA_FAMILIAS.length,
  classe: () => LISTA_CLASSES.length,
  chefe: () => LISTA_BOSSES.length,
  reliquia: () => RELIQUIAS.length,
};

/* a situação que as provas leem: perfil de um lado, coleção do outro */
export const situacao = () => ({
  p: perfil(),
  quantos: cap => quantosViu(cap),
  total: cap => (TOTAL[cap] ? TOTAL[cap]() : 0),
});

/* Confere a tabela inteira e devolve o que ACABOU de ser ganho, para a tela
   comemorar. Chamar isto de novo não devolve nada: já está carimbado. */
export function conferirConquistas(){
  const s = situacao();
  const novas = [];
  for(const c of CONQUISTAS){
    if(ganhas.has(c.id)) continue;
    let ok = false;
    try { ok = !!c.prova(s); } catch(e){ ok = false; }
    if(ok){ ganhas.add(c.id); novas.push(c); }
  }
  if(novas.length)
    try { localStorage.setItem(CHAVE, JSON.stringify([...ganhas])); } catch(e){}
  return novas;
}

export const temMedalha = id => ganhas.has(id);
export const medalhasGanhas = () => new Set(ganhas);
export const quantasMedalhas = () => ganhas.size;
export const conquista = id => POR_ID_CONQ[id];

export function apagarMedalhas(){
  ganhas = new Set();
  try { localStorage.removeItem(CHAVE); } catch(e){}
}
