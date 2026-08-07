-- Nethergloam - tabelas do Supabase
-- Cole TUDO no SQL Editor do projeto e rode (Run).
-- Pode rodar de novo quantas vezes quiser: e' tudo if-not-exists.

create table if not exists public.guilds (
  id         uuid        primary key default gen_random_uuid(),
  nome       text        not null unique,
  tag        text        not null,
  lema       text        not null default '',
  dono_uid   text        not null,
  dono_conta uuid        not null references auth.users (id) on delete cascade,
  criada_em  timestamptz not null default now()
);

create table if not exists public.guild_members (
  guild_id  uuid        not null references public.guilds (id) on delete cascade,
  hero_uid  text        not null,
  user_id   uuid        not null references auth.users (id) on delete cascade,
  nome      text        not null,
  class_id  text        not null default '',
  nivel     integer     not null default 1,
  posto     text        not null default 'membro',
  entrou_em timestamptz not null default now(),
  constraint guild_members_pkey primary key (guild_id, hero_uid)
);

create index if not exists guild_members_conta
  on public.guild_members (user_id);

-- uma companhia por personagem (o jogo já recusa a segunda, mas isso é regra
-- de cliente: sem o índice, dois convites aceitos em abas diferentes deixariam
-- o herói em dois quadros)
create unique index if not exists guild_members_um_por_heroi
  on public.guild_members (hero_uid);

alter table public.guilds        enable row level security;
alter table public.guild_members enable row level security;

-- LER é público: p/ pedir entrada numa companhia é preciso poder vê-la
drop policy if exists "ler_guildas" on public.guilds;
create policy "ler_guildas" on public.guilds for select using (true);
drop policy if exists "ler_membros" on public.guild_members;
create policy "ler_membros" on public.guild_members for select using (true);

-- FUNDAR: só em nome próprio. ADMINISTRAR e DISSOLVER: só o dono
drop policy if exists "fundar" on public.guilds;
create policy "fundar" on public.guilds for insert to authenticated
  with check (auth.uid() = dono_conta);
drop policy if exists "administrar" on public.guilds;
create policy "administrar" on public.guilds for update to authenticated
  using (auth.uid() = dono_conta) with check (auth.uid() = dono_conta);
drop policy if exists "dissolver" on public.guilds;
create policy "dissolver" on public.guilds for delete to authenticated
  using (auth.uid() = dono_conta);

-- ENTRAR/SAIR: cada um por si (não dá p/ inscrever os outros).
-- O Mestre também pode remover, que é o expulsar.
drop policy if exists "entrar" on public.guild_members;
create policy "entrar" on public.guild_members for insert to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "sair" on public.guild_members;
create policy "sair" on public.guild_members for delete to authenticated
  using (auth.uid() = user_id
    or exists (select 1 from public.guilds g
               where g.id = guild_id and g.dono_conta = auth.uid()));

-- MUDAR DE POSTO: só o Mestre
drop policy if exists "promover" on public.guild_members;
create policy "promover" on public.guild_members for update to authenticated
  using (exists (select 1 from public.guilds g
                 where g.id = guild_id and g.dono_conta = auth.uid()));

create table if not exists public.characters (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  slot       smallint    not null,
  name       text        not null,
  class_id   text        not null,
  level      integer     not null default 1,
  data       jsonb       not null,
  updated_at timestamptz not null default now(),
  constraint characters_pkey primary key (user_id, slot),
  constraint characters_slot_range check (slot >= 0 and slot <= 2)
);

alter table public.characters enable row level security;

drop policy if exists "own_characters" on public.characters;
create policy "own_characters" on public.characters
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.friends (
  user_id     uuid        not null references auth.users (id) on delete cascade,
  friend_uid  text        not null,
  friend_name text        not null,
  class_id    text        not null default '',
  added_at    timestamptz not null default now(),
  constraint friends_pkey primary key (user_id, friend_uid)
);

alter table public.friends enable row level security;

drop policy if exists "own_friends" on public.friends;
create policy "own_friends" on public.friends
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
