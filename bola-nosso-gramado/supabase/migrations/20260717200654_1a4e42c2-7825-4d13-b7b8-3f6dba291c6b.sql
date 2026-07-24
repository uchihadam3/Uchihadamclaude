UPDATE public.save_slots
SET score = score + 25
WHERE (stats->>'brasileiraoPos')::int = 1
   OR (stats->'trophies'->>'brasileirao')::boolean = true;