
-- 1) profiles: owner-only direct SELECT
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 2) save_records_archive: owner-only direct SELECT (public leaderboard uses SECURITY DEFINER RPC)
DROP POLICY IF EXISTS "Records are publicly viewable" ON public.save_records_archive;
CREATE POLICY "Users can view own records"
  ON public.save_records_archive FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

REVOKE SELECT ON public.save_records_archive FROM anon;
REVOKE SELECT ON public.profiles FROM anon;

-- 3) SECURITY DEFINER functions: require an authenticated caller and revoke anon EXECUTE.
CREATE OR REPLACE FUNCTION public.get_public_ranking(p_mode text DEFAULT NULL::text, p_limit integer DEFAULT 500)
 RETURNS TABLE(id uuid, display_name text, username text, team_name text, season integer, score integer, mode text, stats jsonb, game_state jsonb, updated_at timestamp with time zone, created_at timestamp with time zone)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
    SELECT s.id, s.display_name, p.username, s.team_name, s.season, s.score, s.mode,
           s.stats, s.game_state, s.updated_at, s.created_at
    FROM public.save_slots s
    LEFT JOIN public.profiles p ON p.id = s.user_id
    WHERE p_mode IS NULL OR s.mode = p_mode
    ORDER BY s.score DESC, s.updated_at ASC
    LIMIT GREATEST(COALESCE(p_limit, 500), 1);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_records_ranking(p_limit integer DEFAULT 500)
 RETURNS TABLE(id uuid, display_name text, username text, team_name text, season integer, score integer, mode text, stats jsonb, game_state jsonb, updated_at timestamp with time zone, created_at timestamp with time zone)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
    SELECT a.id, a.display_name, p.username, a.team_name, a.season, a.score, a.mode,
           a.stats, a.game_state, a.updated_at, a.created_at
    FROM public.save_records_archive a
    LEFT JOIN public.profiles p ON p.id = a.user_id
    ORDER BY a.score DESC, a.updated_at ASC
    LIMIT GREATEST(COALESCE(p_limit, 500), 1);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_ranking(p_limit integer DEFAULT 200)
 RETURNS TABLE(user_id uuid, username text, total_score bigint, slot_count integer, best_score integer, slots jsonb)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
    SELECT p.id, p.username,
      COALESCE(SUM(s.score), 0)::BIGINT,
      COUNT(s.id)::INTEGER,
      COALESCE(MAX(s.score), 0)::INTEGER,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'display_name', s.display_name, 'team_name', s.team_name, 'score', s.score,
            'mode', s.mode, 'season', s.season, 'stats', s.stats,
            'crest_config', s.game_state->'crestConfig',
            'created_at', s.created_at, 'updated_at', s.updated_at
          ) ORDER BY s.score DESC
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'::jsonb
      )
    FROM public.profiles p
    LEFT JOIN public.save_slots s ON s.user_id = p.id
    GROUP BY p.id, p.username
    HAVING COUNT(s.id) > 0
    ORDER BY COALESCE(SUM(s.score), 0) DESC, p.username ASC
    LIMIT GREATEST(COALESCE(p_limit, 200), 1);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_account_ranking(p_limit integer DEFAULT 200)
 RETURNS TABLE(user_id uuid, username text, total_score bigint, mundial_1 integer, mundial_2 integer, mundial_3 integer, libertadores_1 integer, libertadores_2 integer, libertadores_3 integer, brasileirao_1 integer, brasileirao_2 integer, brasileirao_3 integer, sulamericana_1 integer, sulamericana_2 integer, sulamericana_3 integer)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
  WITH counts AS (
    SELECT e.user_id,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=1)::INTEGER AS m1,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=2)::INTEGER AS m2,
      COUNT(*) FILTER (WHERE competition='mundial'      AND place=3)::INTEGER AS m3,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=1)::INTEGER AS l1,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=2)::INTEGER AS l2,
      COUNT(*) FILTER (WHERE competition='libertadores' AND place=3)::INTEGER AS l3,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=1)::INTEGER AS b1,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=2)::INTEGER AS b2,
      COUNT(*) FILTER (WHERE competition='brasileirao'  AND place=3)::INTEGER AS b3,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=1)::INTEGER AS s1,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=2)::INTEGER AS s2,
      COUNT(*) FILTER (WHERE competition='sulamericana' AND place=3)::INTEGER AS s3
    FROM public.user_title_events e GROUP BY e.user_id
  )
  SELECT p.id, p.username,
    (COALESCE(c.m1,0)*40 + COALESCE(c.m2,0)*18 + COALESCE(c.m3,0)*7 +
     COALESCE(c.l1,0)*32 + COALESCE(c.l2,0)*14 + COALESCE(c.l3,0)*5 +
     COALESCE(c.b1,0)*26 + COALESCE(c.b2,0)*11 + COALESCE(c.b3,0)*4 +
     COALESCE(c.s1,0)*22 + COALESCE(c.s2,0)*9  + COALESCE(c.s3,0)*3)::BIGINT,
    COALESCE(c.m1,0), COALESCE(c.m2,0), COALESCE(c.m3,0),
    COALESCE(c.l1,0), COALESCE(c.l2,0), COALESCE(c.l3,0),
    COALESCE(c.b1,0), COALESCE(c.b2,0), COALESCE(c.b3,0),
    COALESCE(c.s1,0), COALESCE(c.s2,0), COALESCE(c.s3,0)
  FROM public.profiles p
  LEFT JOIN counts c ON c.user_id = p.id
  WHERE c.user_id IS NOT NULL
  ORDER BY 3 DESC, p.username ASC
  LIMIT GREATEST(COALESCE(p_limit, 200), 1);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_badge_ranking(p_limit integer DEFAULT 200)
 RETURNS TABLE(user_id uuid, username text, badge_count integer, badges jsonb)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
    SELECT p.id, p.username, COUNT(b.id)::INTEGER,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'badge_key', b.badge_key, 'style', b.style, 'formation', b.formation,
            'kind', b.kind, 'team_name', b.team_name, 'season', b.season,
            'unlocked_at', b.unlocked_at
          ) ORDER BY b.unlocked_at
        ) FILTER (WHERE b.id IS NOT NULL),
        '[]'::jsonb
      )
    FROM public.profiles p
    LEFT JOIN public.user_badges b ON b.user_id = p.id
    GROUP BY p.id, p.username
    HAVING COUNT(b.id) > 0
    ORDER BY COUNT(b.id) DESC, p.username ASC
    LIMIT GREATEST(COALESCE(p_limit, 200), 1);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_badges_by_username(p_username text)
 RETURNS TABLE(badge_key text, style text, formation text, kind text, team_name text, season integer, unlocked_at timestamp with time zone)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN QUERY
    SELECT b.badge_key, b.style, b.formation, b.kind, b.team_name, b.season, b.unlocked_at
    FROM public.user_badges b
    JOIN public.profiles p ON p.id = b.user_id
    WHERE lower(p.username) = lower(trim(p_username))
    ORDER BY b.unlocked_at;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_username_taken(p_name text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(trim(p_name)));
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_display_name_taken(p_name text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN EXISTS (SELECT 1 FROM public.save_slots WHERE lower(display_name) = lower(trim(p_name)));
END;
$function$;

-- Revoke EXECUTE from anon on all SECURITY DEFINER functions above (defense in depth)
REVOKE EXECUTE ON FUNCTION public.get_public_ranking(text, integer) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_records_ranking(integer) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_user_ranking(integer) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_account_ranking(integer) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_badge_ranking(integer) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_user_badges_by_username(text) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_username_taken(text) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_display_name_taken(text) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.sync_title_events(jsonb) FROM anon, PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_public_ranking(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_records_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_account_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_badge_ranking(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_badges_by_username(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_username_taken(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_display_name_taken(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.sync_title_events(jsonb) TO authenticated;
