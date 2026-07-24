
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS username_charset;
ALTER TABLE public.profiles ADD CONSTRAINT username_charset CHECK (username ~ '^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _-]{3,20}$');
ALTER TABLE public.save_slots DROP CONSTRAINT IF EXISTS save_slots_display_name_check;
ALTER TABLE public.save_slots ADD CONSTRAINT save_slots_display_name_check CHECK (length(display_name) >= 3 AND length(display_name) <= 20 AND display_name ~ '^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _-]+$');
