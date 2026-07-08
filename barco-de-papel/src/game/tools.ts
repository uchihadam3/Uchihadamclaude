// Ferramentas do jogador (fase de Planejamento). A Casca de Coco é ilimitada
// (esculpir é o núcleo). Bambu, Pedras e Folhas têm orçamento por fase.
import { Grid } from '../sim/grid';
import { brush, paintBamboo, paintStone, paintShade } from './terrainOps';

export type ToolId = 'coco' | 'bambu' | 'pedras' | 'folha';

export class ToolSystem {
  active: ToolId = 'coco';
  cocoMode: 'lower' | 'raise' = 'lower';
  budget = { bambu: 0, pedras: 0, folha: 0 };

  cocoRadius = 1.7; cocoStrength = 0.085;

  setBudget(b: { bambu: number; pedras: number; folha: number }): void { this.budget = { ...b }; }

  available(tool: ToolId): number {
    if (tool === 'coco') return Infinity;
    return this.budget[tool];
  }

  // aplica a ferramenta ativa num ponto do mundo; retorna se algo mudou
  apply(g: Grid, x: number, z: number): boolean {
    switch (this.active) {
      case 'coco':
        brush(g, x, z, this.cocoRadius, this.cocoStrength, this.cocoMode === 'lower' ? -1 : 1);
        return true;
      case 'bambu':
        if (this.budget.bambu <= 0) return false;
        if (paintBamboo(g, x, z)) { this.budget.bambu--; return true; }
        return false;
      case 'pedras':
        if (this.budget.pedras <= 0) return false;
        if (paintStone(g, x, z)) { this.budget.pedras--; return true; }
        return false;
      case 'folha':
        if (this.budget.folha <= 0) return false;
        if (paintShade(g, x, z, 1.7) > 0) { this.budget.folha--; return true; }
        return false;
    }
  }
}
