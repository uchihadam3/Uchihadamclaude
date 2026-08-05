/* ========================================================================
   VOCABULÁRIO DAS ONDAS — atalhos usados pelos arquivos de masmorra.
   Mora sozinho porque dungeons.js e dungeons2.js precisam dos dois lados:
   deixar isso em dungeons.js criava import circular e os atalhos chegavam
   em dungeons2.js antes de existirem.
   ===================================================================== */
export const A  = v      => ({t:'atk', v});
export const B  = v      => ({t:'block', v});
export const M  = (v,n)  => ({t:'atk_multi', v, n});
export const D  = (st,v) => ({t:'debuff', st, v});
export const H  = v      => ({t:'heal', v});
export const BF = ()     => ({t:'buff'});
export const C  = ()     => ({t:'curse'});
/* intenções que mexem nos SEUS dados — a parte de quebra-cabeça */
export const CONG = ()   => ({t:'congelar'});
export const ROUB = ()   => ({t:'roubar'});
export const FRAT = ()   => ({t:'fraturar'});
export const INV  = ()   => ({t:'inverter'});
export const CONT = (v,ate) => ({t:'contar', v, ate});
/* ===================================================================
   FUNDO DO ABISMO — intenções que SÓ existem da Masmorra 5 em diante.
   Uma auditoria mostrou que o jogo inteiro tinha 12 tipos de intenção e
   que quase todos apareciam nas 10 masmorras: a Masmorra 9 usava as
   mesmas ferramentas da Masmorra 1, só com números maiores. Estas mexem
   no PUZZLE — no que você pode montar — em vez de mexer no seu HP.
   =================================================================== */
export const SELAR = ()   => ({t:'selar'});          // tranca uma habilidade sua por 1 turno
export const TAXA  = v    => ({t:'taxa', v});        // cada dado gasto custa HP neste turno
export const DREN  = ()   => ({t:'drenar'});         // rouba seu bloqueio e veste como escudo
export const ENTER = ()   => ({t:'enterrar'});       // some com um dado por 2 turnos
export const EXIG  = v    => ({t:'exigir', v});      // não me feriu? todos batem mais forte
export const CRESC = v    => ({t:'crescer', v});     // engorda: +HP máximo e cura
/* fechaduras */
export const T = (t,v) => ({t, v});
