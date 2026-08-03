/* ========================================================================
   RELÍQUIAS (§9) — passivas permanentes da run.
   raridade: comum | rara | amaldicoada (poder enorme + custo estrutural)
   hooks: mods (números), start (início de combate), onRoll, onKill, onTurn
   ===================================================================== */
export const RELIQUIAS = [
 /* ---------- COMUNS ---------- */
 {id:'dedal_osso',   nome:'Dedal de Osso',      r:'comum', txt:'+1 re-rolagem por combate.',            mods:{rerollBonus:1}},
 {id:'placa_giz',    nome:'Placa de Giz',       r:'comum', txt:'Começa cada combate com 6 de bloqueio.', start:{block:6}},
 {id:'vela_curta',   nome:'Vela Curta',         r:'comum', txt:'+8 de HP máximo.',                      mods:{hpBonus:8}},
 {id:'anel_ferro',   nome:'Anel de Ferro',      r:'comum', txt:'+2 de dano em todo golpe.',             mods:{dmgFlat:2}},
 {id:'la_grossa',    nome:'Lã Grossa',          r:'comum', txt:'+3 de bloqueio em toda defesa.',        mods:{blockBonus:3}},
 {id:'moeda_torta',  nome:'Moeda Torta',        r:'comum', txt:'Dados que rolarem 1 valem 2.',          onRoll:'um_vira_dois'},
 {id:'sino_rachado', nome:'Sino Rachado',       r:'comum', txt:'Ao matar, ganhe 3 de bloqueio.',        onKill:{block:3}},
 {id:'pena_corvo',   nome:'Pena de Corvo',      r:'comum', txt:'Começa com 1 ✦ Essência.',              start:{essence:1}},
 {id:'linha_prata',  nome:'Linha de Prata',     r:'comum', txt:'A cada turno, +1 de bloqueio por dado não usado.', onTurn:'sobra_bloqueio'},
 {id:'dente_leite',  nome:'Dente de Leite',     r:'comum', txt:'+1 de dano por ⚔ Lâmina rolada.',       onRoll:'lamina_bonus'},
 /* ---------- RARAS ---------- */
 {id:'mao_esquerda', nome:'A Mão Esquerda',     r:'rara',  txt:'+2 re-rolagens por combate.',           mods:{rerollBonus:2}},
 {id:'coracao_pedra',nome:'Coração de Pedra',   r:'rara',  txt:'+25 de HP máximo.',                     mods:{hpBonus:25}},
 {id:'lente_trinca', nome:'Lente Trincada',     r:'rara',  txt:'Todo golpe causa +50% de dano.',        mods:{dmgMult:1.5}},
 {id:'ampulheta',    nome:'Ampulheta Rachada',  r:'rara',  txt:'No 1º turno de cada combate, aja duas vezes.', flag:'turno_duplo'},
 {id:'espelho_negro',nome:'Espelho Negro',      r:'rara',  txt:'Começa cada combate com 12 de bloqueio.',start:{block:12}},
 {id:'cadeia_ouro',  nome:'Cadeia de Ouro',     r:'rara',  txt:'Ao matar, cure 5.',                     onKill:{heal:5}},
 {id:'olho_vidro',   nome:'Olho de Vidro',      r:'rara',  txt:'Veja e escolha 1 dado antes de rolar.', flag:'prever'},
 {id:'martelo_frio', nome:'Martelo Frio',       r:'rara',  txt:'Ignora 3 de armadura inimiga.',         mods:{pierce:3}},
 {id:'raiz_amarga',  nome:'Raiz Amarga',        r:'rara',  txt:'Veneno que você aplica não decai.',     flag:'veneno_eterno'},
 {id:'coroa_ossos',  nome:'Coroa de Ossos',     r:'rara',  txt:'+1 dado inicial (d6 de osso).',         extraDie:{tipo:'d6',mat:'osso'}},
 /* ---------- AMALDIÇOADAS (§9) ---------- */
 {id:'coroa_tolo',   nome:'Coroa do Tolo',      r:'amaldicoada', txt:'+100% de dano — mas você NÃO pode re-rolar.', mods:{dmgMult:2.0, rerollBonus:-99}},
 {id:'pacto_sangue', nome:'Pacto de Sangue',    r:'amaldicoada', txt:'+40 de HP máximo — cura reduzida a zero.',    mods:{hpBonus:40}, flag:'sem_cura'},
 {id:'mao_avarenta', nome:'Mão Avarenta',       r:'amaldicoada', txt:'+3 dados — todos com uma face ☠ Vazio.',      extraDie:{tipo:'d6',mat:'osso',n:3,cursed:true}},
 {id:'relogio_parado',nome:'Relógio Parado',    r:'amaldicoada', txt:'Dano ×2,5 — você sofre 4 no fim de cada turno.', mods:{dmgMult:2.5}, flag:'sangra_turno'},
 {id:'vidro_perfeito',nome:'Vidro Perfeito',    r:'amaldicoada', txt:'Dano ×3 — seu HP máximo vira 1/3.',           mods:{dmgMult:3.0, hpMult:0.34}},
 {id:'lingua_prata', nome:'Língua de Prata',    r:'amaldicoada', txt:'Recompensas em dobro — inimigos com +35% HP.', flag:'dobro_recompensa'},
];
export const porRaridade = r => RELIQUIAS.filter(x=>x.r===r);
