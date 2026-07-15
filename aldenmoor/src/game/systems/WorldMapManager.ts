// WorldMapManager — grafo de estradas + pathfinding A* entre locais.
// Converte os dados do mundo (locais % + estradas) em um grafo navegável.

import type { WorldData, WorldLocation } from "../types";
import { pctToWorld, TERRAIN_COST } from "../config";

interface Edge {
  to: string;
  cost: number; // distância no mundo * multiplicador do terreno
}

export interface WorldPoint {
  x: number;
  y: number;
}

export class WorldMapManager {
  readonly world: WorldData;
  private locById = new Map<string, WorldLocation>();
  private posById = new Map<string, WorldPoint>();
  private adj = new Map<string, Edge[]>();

  constructor(world: WorldData) {
    this.world = world;
    for (const loc of world.locations) {
      this.locById.set(loc.id, loc);
      this.posById.set(loc.id, pctToWorld(loc.x, loc.y));
      this.adj.set(loc.id, []);
    }
    for (const road of world.roads) {
      const pa = this.posById.get(road.a)!;
      const pb = this.posById.get(road.b)!;
      const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y);
      const cost = dist * (TERRAIN_COST[road.terrain] ?? 1);
      this.adj.get(road.a)!.push({ to: road.b, cost });
      this.adj.get(road.b)!.push({ to: road.a, cost });
    }
  }

  location(id: string): WorldLocation {
    const l = this.locById.get(id);
    if (!l) throw new Error(`Local desconhecido: ${id}`);
    return l;
  }
  pos(id: string): WorldPoint {
    return this.posById.get(id)!;
  }
  neighbors(id: string): string[] {
    return (this.adj.get(id) ?? []).map((e) => e.to);
  }

  /** A* sobre o grafo de estradas. Devolve a sequência de ids de locais. */
  findPath(fromId: string, toId: string): string[] | null {
    if (fromId === toId) return [fromId];
    const open = new Set<string>([fromId]);
    const cameFrom = new Map<string, string>();
    const g = new Map<string, number>([[fromId, 0]]);
    const goal = this.posById.get(toId)!;
    const h = (id: string) => {
      const p = this.posById.get(id)!;
      return Math.hypot(p.x - goal.x, p.y - goal.y);
    };
    const f = new Map<string, number>([[fromId, h(fromId)]]);

    while (open.size) {
      // nó de menor f
      let current = "";
      let best = Infinity;
      for (const id of open) {
        const fi = f.get(id) ?? Infinity;
        if (fi < best) {
          best = fi;
          current = id;
        }
      }
      if (current === toId) {
        const path = [current];
        while (cameFrom.has(current)) {
          current = cameFrom.get(current)!;
          path.unshift(current);
        }
        return path;
      }
      open.delete(current);
      for (const edge of this.adj.get(current) ?? []) {
        const tentative = (g.get(current) ?? Infinity) + edge.cost;
        if (tentative < (g.get(edge.to) ?? Infinity)) {
          cameFrom.set(edge.to, current);
          g.set(edge.to, tentative);
          f.set(edge.to, tentative + h(edge.to));
          open.add(edge.to);
        }
      }
    }
    return null; // sem caminho
  }

  /** Caminho como pontos do mundo (para animar o marcador). */
  pathPoints(ids: string[]): WorldPoint[] {
    return ids.map((id) => this.posById.get(id)!);
  }
}
