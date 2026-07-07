// Statuses: definição de todos os status (nome, ícone, cor, tipo, descrição).
// A lógica de cada um vive no Combat; aqui é o catálogo.
(function () {
  var S = {
    // positivos
    shield: { pt: 'Escudo', en: 'Shield', icon: 'shield', color: '#8a94a8', good: true, desc: { pt: 'Absorve dano neste turno.', en: 'Absorbs damage this turn.' } },
    barrier: { pt: 'Barreira', en: 'Barrier', icon: 'barrier', color: '#5a8ab8', good: true, desc: { pt: 'Escudo que persiste entre turnos.', en: 'Shield that persists between turns.' } },
    regen: { pt: 'Regeneração', en: 'Regen', icon: 'regen', color: '#4ac86a', good: true, desc: { pt: 'Cura no início do turno.', en: 'Heals at turn start.' } },
    inspire: { pt: 'Inspiração', en: 'Inspire', icon: 'inspire', color: '#ffe9a0', good: true, desc: { pt: 'Próximo dado ganha +1.', en: 'Next die gets +1.' } },
    focus: { pt: 'Foco', en: 'Focus', icon: 'focus', color: '#e8e8f0', good: true, desc: { pt: 'Próximo ataque ignora 1 escudo.', en: 'Next attack ignores 1 shield.' } },
    protect: { pt: 'Protegido', en: 'Protected', icon: 'protect', color: '#c9d4e8', good: true, desc: { pt: 'Ataques são redirecionados ao protetor.', en: 'Attacks redirect to protector.' } },
    counter: { pt: 'Contra-ataque', en: 'Counter', icon: 'counter', color: '#e8b84a', good: true, desc: { pt: 'Devolve dano a quem atacar.', en: 'Returns damage to attackers.' } },
    camo: { pt: 'Camuflagem', en: 'Camo', icon: 'camo', color: '#8ca0b4', good: true, desc: { pt: 'Menor chance de ser alvo.', en: 'Less likely to be targeted.' } },
    charge: { pt: 'Carga', en: 'Charge', icon: 'charge', color: '#e8d84a', good: true, desc: { pt: 'Poder acumulado para efeitos futuros.', en: 'Stored power for future effects.' } },
    stored: { pt: 'Guardado', en: 'Stored', icon: 'stored', color: '#c9a94a', good: true, desc: { pt: 'Dado salvo para o próximo turno.', en: 'Die saved for next turn.' } },
    dodge: { pt: 'Esquiva', en: 'Dodge', icon: 'dodge', color: '#c8dcf0', good: true, desc: { pt: 'Evita o próximo ataque.', en: 'Avoids the next attack.' } },
    // negativos
    poison: { pt: 'Veneno', en: 'Poison', icon: 'poison', color: '#6ec83c', good: false, desc: { pt: 'Dano no fim do turno; diminui 1.', en: 'Damage at turn end; decays by 1.' } },
    bleed: { pt: 'Sangramento', en: 'Bleed', icon: 'bleed', color: '#e84a5a', good: false, desc: { pt: 'Dano quando o alvo age.', en: 'Damage when target acts.' } },
    burn: { pt: 'Queimadura', en: 'Burn', icon: 'burn', color: '#ff8a3c', good: false, desc: { pt: 'Dano no fim do turno; some depois.', en: 'Damage at turn end; then fades.' } },
    freeze: { pt: 'Congelado', en: 'Frozen', icon: 'freeze', color: '#a8d4f0', good: false, desc: { pt: 'Próximo dado vale -1 por acúmulo.', en: 'Next die is reduced.' } },
    stun: { pt: 'Atordoado', en: 'Stunned', icon: 'stun', color: '#ffe9a0', good: false, desc: { pt: 'Perde a próxima ação.', en: 'Loses next action.' } },
    mark: { pt: 'Marcado', en: 'Marked', icon: 'mark', color: '#e84a5a', good: false, desc: { pt: 'Recebe +1 de dano.', en: 'Takes +1 damage.' } },
    doom: { pt: 'Juízo', en: 'Doom', icon: 'doom', color: '#8a4ae8', good: false, desc: { pt: 'Sofre o valor acumulado como dano no FIM da rodada.', en: 'Takes the stored value as damage at the END of the round.' } },
    vulnerable: { pt: 'Vulnerável', en: 'Vulnerable', icon: 'vulnerable', color: '#e8a04a', good: false, desc: { pt: 'Recebe +1 de dano por acúmulo.', en: 'Takes +1 damage per stack.' } },
    weak: { pt: 'Fraco', en: 'Weak', icon: 'weak', color: '#8a8a94', good: false, desc: { pt: 'Causa -1 de dano por acúmulo.', en: 'Deals -1 damage per stack.' } },
    curse: { pt: 'Maldição', en: 'Curse', icon: 'curse', color: '#8a4ae8', good: false, desc: { pt: 'Dano sombrio no fim do turno; não decai sozinho.', en: 'Dark damage at turn end; does not decay.' } },
    silence: { pt: 'Silêncio', en: 'Silence', icon: 'silence', color: '#c8b8e8', good: false, desc: { pt: 'Impede dados de magia.', en: 'Blocks magic dice.' } },
    blind: { pt: 'Cegueira', en: 'Blind', icon: 'blind', color: '#5a5a6e', good: false, desc: { pt: 'Ataques podem errar (50%).', en: 'Attacks may miss (50%).' } },
    chained: { pt: 'Corrente', en: 'Chained', icon: 'chained', color: '#a8a8b8', good: false, desc: { pt: 'Não pode trocar de linha.', en: 'Cannot swap rows.' } },
    fear: { pt: 'Medo', en: 'Fear', icon: 'fear', color: '#c8b8e8', good: false, desc: { pt: 'Pode forçar rerrolagem ruim.', en: 'May force a bad reroll.' } },
    slow: { pt: 'Lento', en: 'Slow', icon: 'slow', color: '#8a94a8', good: false, desc: { pt: 'Age por último.', en: 'Acts last.' } }
  };

  RA.data.Statuses = S;
})();
