-- Remove the permissive policy that still let anon read user_id from the base table.
DROP POLICY IF EXISTS "Public ranking view access" ON public.save_slots;

-- Recreate the public ranking view WITHOUT security_invoker so it runs with the
-- view owner's privileges (bypasses caller's RLS on the base table). The base
-- table SELECT stays restricted to owners only.
DROP VIEW IF EXISTS public.public_ranking;

CREATE VIEW public.public_ranking AS
SELECT
  id,
  display_name,
  team_name,
  season,
  score,
  mode,
  stats,
  game_state,
  updated_at
FROM public.save_slots;

GRANT SELECT ON public.public_ranking TO anon, authenticated;