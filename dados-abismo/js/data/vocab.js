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
/* fechaduras */
export const T = (t,v) => ({t, v});
