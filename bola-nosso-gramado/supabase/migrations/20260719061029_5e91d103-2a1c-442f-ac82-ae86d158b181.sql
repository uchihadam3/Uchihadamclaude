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
          'crest_config', s.game_state->'crestConfig'
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