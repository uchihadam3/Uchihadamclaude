// Compat: a Falcon-01 agora é desenhada pelo gerador data-driven (shipGen),
// usando o design definido em shipsData. Mantém a assinatura antiga.
import { Ctx } from './prims';
import { drawShip, ShipDrawOpts } from './shipGen';
import { SHIP_BY_ID } from '../data/shipsData';

export type { ShipDrawOpts };

export function drawFalcon(ctx: Ctx, x: number, y: number, S: number, o: ShipDrawOpts): void {
  drawShip(ctx, x, y, S, SHIP_BY_ID['falcon'].design, o);
}
