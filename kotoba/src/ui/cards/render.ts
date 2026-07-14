import type { CardDef, CardInstance } from '../../game/combat/types';
import { cardArt } from '../../game/cards/art';

const CAT_LABEL: Record<CardDef['cat'], string> = {
  attack: 'Ataque', defense: 'Defesa', tech: 'Técnica', power: 'Poder', spirit: 'Espírito',
};

/** cria o elemento DOM de uma carta (bela, colecionável, info progressiva) */
export function renderCard(inst: CardInstance, def: CardDef): HTMLElement {
  const el = document.createElement('div');
  el.className = 'card' + (inst.upgraded ? ' upgraded' : '');
  el.dataset.cat = def.cat;
  el.dataset.uid = inst.uid;
  const cost = inst.upgraded && def.upgrade?.cost != null ? def.upgrade.cost : def.cost;
  const name = inst.upgraded && def.upgrade?.name ? def.upgrade.name : def.name;
  const desc = inst.upgraded && def.upgrade?.desc ? def.upgrade.desc : def.desc;
  const bonusDesc = inst.upgraded && def.upgrade?.bonusDesc ? def.upgrade.bonusDesc : def.bonusDesc;

  el.innerHTML = `
    <div class="frame"><div class="paper"></div></div>
    <div class="art"></div>
    <div class="cost">${cost}</div>
    <span class="rarity ${def.rarity}"></span>
    <div class="kanji jp">${def.jp}</div>
    <div class="reading jp">${def.reading}</div>
    <div class="cname">${name}</div>
    <div class="type-band">${CAT_LABEL[def.cat]}</div>
    <div class="effect"><div>${desc}${bonusDesc ? `<span class="bonus">${bonusDesc}</span>` : ''}</div></div>`;
  (el.querySelector('.art') as HTMLElement).style.backgroundImage = cardArt(def.cat, def.element);
  return el;
}

/** versão mini (recompensa/coleção) */
export function renderMiniCard(def: CardDef, upgraded = false): HTMLElement {
  const el = renderCard({ uid: 'm' + def.id, defId: def.id, upgraded }, def);
  el.classList.add('mini');
  return el;
}
