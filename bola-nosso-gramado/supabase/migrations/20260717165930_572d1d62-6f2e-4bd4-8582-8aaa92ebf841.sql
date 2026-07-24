UPDATE public.save_slots SET score = GREATEST(0, ROUND(
  (CASE
    WHEN (stats->>'brasileiraoPos')::int = 1 THEN 100
    WHEN (stats->>'brasileiraoPos')::int BETWEEN 2 AND 6 THEN 75
    WHEN (stats->>'brasileiraoPos')::int BETWEEN 7 AND 12 THEN 50
    WHEN (stats->'trophies'->>'brasileirao')::boolean THEN 100
    ELSE 0
  END)
  + CASE WHEN (stats->'trophies'->>'sulamericana')::boolean THEN 110 ELSE 0 END
  + CASE WHEN (stats->'trophies'->>'libertadores')::boolean THEN 120 ELSE 0 END
  + CASE WHEN (stats->'trophies'->>'mundial')::boolean THEN 150 ELSE 0 END
  + COALESCE((stats->>'totalWins')::int,0) * 5
  + COALESCE((stats->>'totalDraws')::int,0) * 2
  + COALESCE((stats->>'totalGf')::int,0) * 3
  - COALESCE((stats->>'totalGa')::int,0) * 2
  + (COALESCE((stats->>'season')::int,1) - 1) * 50
))
WHERE stats IS NOT NULL;