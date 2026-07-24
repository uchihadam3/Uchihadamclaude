
-- 1) Restrict profiles SELECT to authenticated
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);
REVOKE SELECT ON public.profiles FROM anon;

-- 2) Restrict user_badges SELECT to authenticated
DROP POLICY IF EXISTS "Badges são públicos" ON public.user_badges;
CREATE POLICY "Badges viewable by authenticated users"
  ON public.user_badges FOR SELECT
  TO authenticated
  USING (true);
REVOKE SELECT ON public.user_badges FROM anon;

-- 3) Lock SECURITY DEFINER helper functions to authenticated only
REVOKE EXECUTE ON FUNCTION public.get_account_ranking(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_badge_ranking(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_ranking(integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_public_ranking(text, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_badges_by_username(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_username_taken(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_display_name_taken(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.sync_title_events(jsonb) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.get_account_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_badge_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_ranking(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_badges_by_username(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_username_taken(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_display_name_taken(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.sync_title_events(jsonb) TO authenticated;
