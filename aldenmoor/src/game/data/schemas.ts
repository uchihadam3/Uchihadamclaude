// Validação de conteúdo com Zod. Todo dado (mundo, e futuramente eventos/itens/
// inimigos/quests em JSON) passa por aqui no carregamento, para que conteúdo
// quebrado falhe cedo e visível — nunca corrompa o jogo silenciosamente.
import { z } from "zod";

export const RegionSchema = z.object({
  id: z.string(),
  name: z.string(),
  biome: z.string(),
  climate: z.string(),
  difficulty: z.number().int().min(1).max(5),
  color: z.number().int(),
});

export const LocationTypeSchema = z.enum([
  "city",
  "village",
  "castle",
  "ruin",
  "dungeon",
  "tower",
  "port",
  "camp",
  "shrine",
  "mine",
]);

export const WorldLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: LocationTypeSchema,
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  region: z.string(),
  level: z.number().int().min(1),
  desc: z.string(),
  content: z.array(z.string()),
});

export const RoadSchema = z.object({
  a: z.string(),
  b: z.string(),
  terrain: z.enum(["road", "trail", "wild"]),
});

export const WorldDataSchema = z.object({
  name: z.string(),
  subtitle: z.string(),
  regions: z.array(RegionSchema).min(1),
  locations: z.array(WorldLocationSchema).min(1),
  roads: z.array(RoadSchema),
});

/**
 * Valida os dados do mundo e checa a integridade referencial
 * (regiões e estradas apontando para ids existentes).
 */
export function validateWorld(raw: unknown) {
  const world = WorldDataSchema.parse(raw);

  const regionIds = new Set(world.regions.map((r) => r.id));
  const locationIds = new Set(world.locations.map((l) => l.id));

  for (const loc of world.locations) {
    if (!regionIds.has(loc.region)) {
      throw new Error(
        `Local "${loc.id}" referencia região inexistente "${loc.region}".`,
      );
    }
  }
  for (const road of world.roads) {
    if (!locationIds.has(road.a) || !locationIds.has(road.b)) {
      throw new Error(
        `Estrada referencia local inexistente: ${road.a} <-> ${road.b}.`,
      );
    }
  }
  return world;
}
