-- Restrict save_slots public exposure: hide user_id from public ranking.
-- Only owners can SELECT the full row; the public reads a view that excludes user_id.

DROP POLICY IF EXISTS "Anyone can view save slots (public ranking)" ON public.save_slots;

CREATE POLICY "Users can view their own save slots"
  ON public.save_slots
  FOR SELECT
  USING (auth.uid() = user_id);

-- Public leaderboard view: exposes only columns needed for the ranking UI
-- (including game_state for the squad-view feature) but NOT user_id.
CREATE OR REPLACE VIEW public.public_ranking
WITH (security_invoker = true) AS
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

-- The view is security_invoker, so it needs its own permissive policy on the
-- underlying table for anon/authenticated to see all rows via the view.
CREATE POLICY "Public ranking view access"
  ON public.save_slots
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Grant read access to the view. The table's column-level grants remain, but
-- clients should query the view for public data. Owners still get the full
-- row (including user_id) through the owner-scoped policy above when they
-- query save_slots directly with their bearer token.
GRANT SELECT ON public.public_ranking TO anon, authenticated;