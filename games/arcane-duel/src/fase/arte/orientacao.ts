/*
 * A orientação, declarada uma vez e obedecida em todo lugar.
 *
 * A regra canônica do combate é:
 *
 *   HERÓI   — lado esquerdo da arena, olhando para a DIREITA.
 *   INIMIGO — lado direito da arena, olhando para a ESQUERDA.
 *
 * E a convenção que a sustenta é igualmente simples: **todo sprite-base é
 * desenhado olhando para a direita**. Quem olha para a esquerda é espelhado
 * no `GameObject`, e só lá.
 *
 * Isso é estrutural, e não cosmético. O erro que este arquivo existe para
 * impedir foi exatamente o que apareceu na primeira versão jogável: a
 * orientação morava espalhada — um `setFlipX` na criação, outro implícito no
 * desenho — e bastava uma troca de textura para o herói passar a olhar para
 * trás. Aqui há uma função só, e ela é aplicada **depois** de toda troca de
 * quadro, de área e de respawn.
 */

export type Lado = 'heroi' | 'inimigo';

/** O sprite-base olha para a direita. Só o inimigo é espelhado. */
export const ESPELHADO: Readonly<Record<Lado, boolean>> = {
  heroi: false,
  inimigo: true,
};

/** Para onde este lado olha, em `+1` (direita) ou `-1` (esquerda). */
export const SENTIDO: Readonly<Record<Lado, 1 | -1>> = {
  heroi: 1,
  inimigo: -1,
};

interface Espelhavel {
  setFlipX: (valor: boolean) => unknown;
  flipX: boolean;
}

/**
 * Fixa a orientação de um sprite.
 *
 * Chamada em todo ponto que pode mexer no quadro: criação, troca de textura,
 * fim de animação, reinício de cena. É barata de propósito — reafirmar o
 * valor correto custa menos que caçar quem o sobrescreveu.
 */
export const orientar = (sprite: Espelhavel, lado: Lado): void => {
  const desejado = ESPELHADO[lado];
  if (sprite.flipX !== desejado) sprite.setFlipX(desejado);
};
