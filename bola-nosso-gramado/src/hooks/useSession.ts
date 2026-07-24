import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { recomputeMyScores } from "@/lib/saves";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const recomputedFor = useRef<string | null>(null);

  useEffect(() => {
    const maybeRecompute = (s: Session | null) => {
      const uid = s?.user.id ?? null;
      if (uid && recomputedFor.current !== uid) {
        recomputedFor.current = uid;
        void recomputeMyScores(uid).catch(() => {});
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      maybeRecompute(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      maybeRecompute(data.session);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading, userId: session?.user.id ?? null };
}
