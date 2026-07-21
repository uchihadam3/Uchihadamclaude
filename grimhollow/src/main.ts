import { Game } from "./game/Game";
import { runIntro } from "./game/screens";

// build tag: efeito colateral real (não é removido pelo tree-shaking) p/ gerar
// um nome de bundle NOVO e furar o cache do CDN/navegador.
document.documentElement.dataset.ghBuild = "2026-07-21z";

const app = document.getElementById("app")!;

// Fluxo de abertura: Título → Criação de personagem → Loading (pré-carrega TODOS
// os assets p/ nenhum PNG entrar faltando) → então monta o jogo com o personagem.
if (new URLSearchParams(location.search).has("test")) {
  // BYPASS de teste: entra direto como Mago, sem a intro
  new Game(app, { name: "Test", classId: "mago" });
} else {
  runIntro(app).then((character) => {
    new Game(app, character);
  });
}
