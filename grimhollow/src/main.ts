import { Game } from "./game/Game";
import { runIntro } from "./game/screens";

// build tag: efeito colateral real (não é removido pelo tree-shaking) p/ gerar
// um nome de bundle NOVO e furar o cache do CDN/navegador.
document.documentElement.dataset.ghBuild = "2026-07-20q";

const app = document.getElementById("app")!;

// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets p/ nenhum PNG entrar faltando) → então monta o jogo com o personagem.
runIntro(app).then((character) => {
  new Game(app, character);
});
