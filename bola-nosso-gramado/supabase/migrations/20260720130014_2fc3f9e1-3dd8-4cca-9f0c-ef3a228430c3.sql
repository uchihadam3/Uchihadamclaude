DROP FUNCTION IF EXISTS public.get_public_ranking(text, integer);
CREATE OR REPLACE FUNCTION public.get_public_ranking(p_mode text DEFAULT NULL::text, p_limit integer DEFAULT 500)
 RETURNS TABLE(id uuid, display_name text, username text, team_name text, season integer, score integer, mode text, stats jsonb, game_state jsonb, updated_at timestamp with time zone, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT s.id, s.display_name, p.username, s.team_name, s.season, s.score, s.mode,
         s.stats, s.game_state, s.updated_at, s.created_at
  FROM public.save_slots s
  LEFT JOIN public.profiles p ON p.id = s.user_id
  WHERE p_mode IS NULL OR s.mode = p_mode
  ORDER BY s.score DESC, s.updated_at ASC
  LIMIT GREATEST(COALESCE(p_limit, 500), 1);
$function$;

CREATE OR REPLACE FUNCTION public.get_user_ranking(p_limit integer DEFAULT 200)
 RETURNS TABLE(user_id uuid, username text, total_score bigint, slot_count integer, best_score integer, slots jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    p.id AS user_id,
    p.username,
    COALESCE(SUM(s.score), 0)::BIGINT AS total_score,
    COUNT(s.id)::INTEGER AS slot_count,
    COALESCE(MAX(s.score), 0)::INTEGER AS best_score,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'display_name', s.display_name,
          'team_name', s.team_name,
          'score', s.score,
          'mode', s.mode,
          'season', s.season,
          'stats', s.stats,
          'crest_config', s.game_state->'crestConfig',
          'created_at', s.created_at,
          'updated_at', s.updated_at
        ) ORDER BY s.score DESC
      ) FILTER (WHERE s.id IS NOT NULL),
      '[]'::jsonb
    ) AS slots
  FROM public.profiles p
  LEFT JOIN public.save_slots s ON s.user_id = p.id
  GROUP BY p.id, p.username
  HAVING COUNT(s.id) > 0
  ORDER BY total_score DESC, p.username ASC
  LIMIT GREATEST(COALESCE(p_limit, 200), 1);
$function$;