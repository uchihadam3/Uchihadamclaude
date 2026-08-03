-- =============================================================================
-- IDLE WARS — Schema + lógica autoritativa (Supabase / Postgres)
-- -----------------------------------------------------------------------------
-- Rode este arquivo INTEIRO no SQL Editor do seu projeto Supabase.
-- Tudo que muda o estado do jogo (recursos, upgrades, tropas, batalhas) roda
-- aqui no servidor via funções SECURITY DEFINER. O navegador NUNCA escreve
-- direto nas tabelas — isso é o que impede trapaça.
-- =============================================================================

-- Limpa versões antigas (seguro re-rodar este script)
drop function if exists public.join_game(text) cascade;
drop function if exists public.get_state() cascade;
drop function if exists public.list_targets() cascade;
drop function if exists public.upgrade_building(text) cascade;
drop function if exists public.train_troops(text, int) cascade;
drop function if exists public.attack(uuid, int, int, int) cascade;
drop function if exists public.get_battles() cascade;
drop function if exists public._sync(uuid) cascade;
drop function if exists public._power(public.players) cascade;

-- -----------------------------------------------------------------------------
-- TABELAS
-- -----------------------------------------------------------------------------
create table if not exists public.players (
  id            uuid primary key references auth.users(id) on delete cascade,
  nickname      text unique not null,
  gold          numeric not null default 50,
  wood          numeric not null default 50,
  -- níveis dos edifícios
  mine_lvl      int not null default 1,   -- ouro/seg
  sawmill_lvl   int not null default 1,   -- madeira/seg
  farm_lvl      int not null default 1,   -- teto de população
  barracks_lvl  int not null default 1,   -- +ataque das tropas (veterania)
  warehouse_lvl int not null default 1,   -- capacidade + cofre protegido
  wall_lvl      int not null default 1,   -- +defesa
  -- tropas
  inf           int not null default 0,   -- infantaria
  arc           int not null default 0,   -- arqueiros
  cav           int not null default 0,   -- cavalaria
  -- tempos
  last_tick             timestamptz not null default now(),
  shield_until          timestamptz not null default (now() + interval '30 minutes'),
  attack_cooldown_until timestamptz not null default now(),
  created_at            timestamptz not null default now()
);

create table if not exists public.battles (
  id            uuid primary key default gen_random_uuid(),
  attacker_id   uuid not null,
  defender_id   uuid not null,
  attacker_name text not null,
  defender_name text not null,
  winner        text not null,          -- 'attacker' | 'defender'
  loot_gold     int not null default 0,
  loot_wood     int not null default 0,
  att_losses    jsonb not null,         -- {inf,arc,cav}
  def_losses    jsonb not null,
  detail        jsonb not null,         -- power/rounds pro relatório
  created_at    timestamptz not null default now()
);

create index if not exists battles_attacker_idx on public.battles(attacker_id, created_at desc);
create index if not exists battles_defender_idx on public.battles(defender_id, created_at desc);

-- -----------------------------------------------------------------------------
-- RLS: leitura da própria linha e das próprias batalhas. Escrita = só funções.
-- -----------------------------------------------------------------------------
alter table public.players enable row level security;
alter table public.battles enable row level security;

drop policy if exists players_select_own on public.players;
create policy players_select_own on public.players
  for select using (auth.uid() = id);

drop policy if exists battles_select_mine on public.battles;
create policy battles_select_mine on public.battles
  for select using (auth.uid() = attacker_id or auth.uid() = defender_id);

-- =============================================================================
-- HELPERS INTERNOS
-- =============================================================================

-- Poder do jogador (tropas + edifícios). Usado no matchmaking e no display.
create or replace function public._power(p public.players)
returns int language sql immutable as $$
  select (p.inf*10 + p.arc*14 + p.cav*24
          + (p.mine_lvl+p.sawmill_lvl+p.farm_lvl+p.barracks_lvl+p.warehouse_lvl+p.wall_lvl)*15)::int;
$$;

-- Credita recursos idle desde o último tick, respeitando a capacidade do armazém.
create or replace function public._sync(p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  p        public.players;
  elapsed  double precision;
  cap      double precision;
  gps      double precision;
  wps      double precision;
begin
  select * into p from public.players where id = p_id for update;
  if not found then return; end if;

  elapsed := extract(epoch from (now() - p.last_tick));
  if elapsed < 0 then elapsed := 0; end if;

  -- produção/seg = base * 1.15^(nível-1)
  gps := 1.0 * power(1.15, p.mine_lvl    - 1);
  wps := 0.8 * power(1.15, p.sawmill_lvl - 1);
  -- capacidade do armazém = 500 * 1.4^(nível-1)
  cap := 500 * power(1.4, p.warehouse_lvl - 1);

  -- produção enche até o teto; mas se já está acima do teto (saque), preserva o excedente
  update public.players set
    gold      = case when gold >= cap then gold else least(cap, gold + gps * elapsed) end,
    wood      = case when wood >= cap then wood else least(cap, wood + wps * elapsed) end,
    last_tick = now()
  where id = p_id;
end;
$$;

-- =============================================================================
-- API DO JOGO (chamada pelo cliente via supabase.rpc)
-- =============================================================================

-- Entra no jogo (cria a base). Idempotente: se já existe, só devolve o estado.
create or replace function public.join_game(p_nick text)
returns public.players language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  p   public.players;
  n   text := trim(p_nick);
begin
  if uid is null then raise exception 'É preciso estar autenticado'; end if;
  if n is null or length(n) < 2 or length(n) > 16 then
    raise exception 'Nickname deve ter entre 2 e 16 caracteres';
  end if;

  select * into p from public.players where id = uid;
  if found then return p; end if;

  insert into public.players(id, nickname) values (uid, n)
  returning * into p;
  return p;
exception when unique_violation then
  raise exception 'Esse nickname já está em uso';
end;
$$;

-- Estado atual da própria base (após sincronizar recursos).
create or replace function public.get_state()
returns public.players language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); p public.players;
begin
  if uid is null then raise exception 'Não autenticado'; end if;
  perform public._sync(uid);
  select * into p from public.players where id = uid;
  return p;
end;
$$;

-- Lista de alvos (todos menos você). Só expõe campos seguros — nada de ouro exato.
create or replace function public.list_targets()
returns table(id uuid, nickname text, power int, shielded boolean, army int)
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'Não autenticado'; end if;
  return query
    select p.id, p.nickname, public._power(p),
           (p.shield_until > now()) as shielded,
           (p.inf + p.arc + p.cav) as army
    from public.players p
    where p.id <> uid
    order by public._power(p) desc;
end;
$$;

-- Sobe o nível de um edifício, se houver recursos.
create or replace function public.upgrade_building(p_key text)
returns public.players language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  p   public.players;
  lvl int;
  base_g numeric; base_w numeric;
  cost_g numeric; cost_w numeric;
begin
  if uid is null then raise exception 'Não autenticado'; end if;
  perform public._sync(uid);
  select * into p from public.players where id = uid for update;

  -- custo base por edifício + nível atual
  case p_key
    when 'mine'      then lvl := p.mine_lvl;      base_g := 30; base_w := 50;
    when 'sawmill'   then lvl := p.sawmill_lvl;   base_g := 50; base_w := 30;
    when 'farm'      then lvl := p.farm_lvl;      base_g := 40; base_w := 40;
    when 'barracks'  then lvl := p.barracks_lvl;  base_g := 80; base_w := 60;
    when 'warehouse' then lvl := p.warehouse_lvl; base_g := 60; base_w := 80;
    when 'wall'      then lvl := p.wall_lvl;      base_g := 70; base_w := 70;
    else raise exception 'Edifício inválido';
  end case;

  -- custo = base * 1.6^(nível-1)
  cost_g := ceil(base_g * power(1.6, lvl - 1));
  cost_w := ceil(base_w * power(1.6, lvl - 1));

  if p.gold < cost_g or p.wood < cost_w then
    raise exception 'Recursos insuficientes (precisa % ouro, % madeira)', cost_g, cost_w;
  end if;

  update public.players set
    gold = gold - cost_g,
    wood = wood - cost_w,
    mine_lvl      = mine_lvl      + (case when p_key='mine'      then 1 else 0 end),
    sawmill_lvl   = sawmill_lvl   + (case when p_key='sawmill'   then 1 else 0 end),
    farm_lvl      = farm_lvl      + (case when p_key='farm'      then 1 else 0 end),
    barracks_lvl  = barracks_lvl  + (case when p_key='barracks'  then 1 else 0 end),
    warehouse_lvl = warehouse_lvl + (case when p_key='warehouse' then 1 else 0 end),
    wall_lvl      = wall_lvl      + (case when p_key='wall'      then 1 else 0 end)
  where id = uid
  returning * into p;
  return p;
end;
$$;

-- Treina tropas (custa ouro + população). type: 'inf' | 'arc' | 'cav'
create or replace function public.train_troops(p_type text, p_qty int)
returns public.players language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  p   public.players;
  unit_gold numeric; unit_pop int;
  pop_cap int; pop_used int;
begin
  if uid is null then raise exception 'Não autenticado'; end if;
  if p_qty is null or p_qty < 1 or p_qty > 1000 then raise exception 'Quantidade inválida'; end if;
  perform public._sync(uid);
  select * into p from public.players where id = uid for update;

  case p_type
    when 'inf' then unit_gold := 10; unit_pop := 1;
    when 'arc' then unit_gold := 18; unit_pop := 1;
    when 'cav' then unit_gold := 30; unit_pop := 2;
    else raise exception 'Tropa inválida';
  end case;

  pop_cap  := 20 * p.farm_lvl;
  pop_used := p.inf + p.arc + p.cav*2;

  if pop_used + unit_pop * p_qty > pop_cap then
    raise exception 'População insuficiente (usa %/%). Melhore a Fazenda.', pop_used, pop_cap;
  end if;
  if p.gold < unit_gold * p_qty then
    raise exception 'Ouro insuficiente (precisa %)', unit_gold * p_qty;
  end if;

  update public.players set
    gold = gold - unit_gold * p_qty,
    inf  = inf + (case when p_type='inf' then p_qty else 0 end),
    arc  = arc + (case when p_type='arc' then p_qty else 0 end),
    cav  = cav + (case when p_type='cav' then p_qty else 0 end)
  where id = uid
  returning * into p;
  return p;
end;
$$;

-- =============================================================================
-- ATAQUE (o coração do PvP). Simula a batalha e aplica perdas + saque.
-- =============================================================================
create or replace function public.attack(p_target uuid, p_inf int, p_arc int, p_cav int)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  a public.players;  -- atacante
  d public.players;  -- defensor
  att_p double precision; def_p double precision;
  att_dom text; def_dom text; comp double precision := 1.0;
  total double precision; winner text;
  a_frac double precision; d_frac double precision;
  a_li int; a_la int; a_lc int;   -- perdas atacante
  d_li int; d_la int; d_lc int;   -- perdas defensor
  vault double precision; fair double precision; ratio double precision;
  loot_g int := 0; loot_w int := 0;
  bid uuid;
begin
  if uid is null then raise exception 'Não autenticado'; end if;
  if p_target = uid then raise exception 'Você não pode atacar a si mesmo'; end if;
  if coalesce(p_inf,0)+coalesce(p_arc,0)+coalesce(p_cav,0) <= 0 then
    raise exception 'Envie ao menos 1 tropa';
  end if;

  -- sincroniza recursos travando as linhas SEMPRE na mesma ordem global (evita deadlock
  -- quando dois jogadores se atacam ao mesmo tempo)
  if uid < p_target then
    perform public._sync(uid);
    perform public._sync(p_target);
  else
    perform public._sync(p_target);
    perform public._sync(uid);
  end if;
  -- relê as duas linhas travadas, na mesma ordem estável
  if uid < p_target then
    select * into a from public.players where id = uid for update;
    select * into d from public.players where id = p_target for update;
  else
    select * into d from public.players where id = p_target for update;
    select * into a from public.players where id = uid for update;
  end if;
  if a.id is null then raise exception 'Atacante inexistente'; end if;
  if d.id is null then raise exception 'Alvo inexistente'; end if;

  if a.attack_cooldown_until > now() then
    raise exception 'Ataque em recarga. Aguarde antes de atacar de novo.';
  end if;
  if d.shield_until > now() then
    raise exception 'O alvo está protegido por um escudo.';
  end if;
  if p_inf > a.inf or p_arc > a.arc or p_cav > a.cav then
    raise exception 'Você não tem tropas suficientes para esse ataque.';
  end if;

  -- ---- Poder de combate ----------------------------------------------------
  -- ataque = (inf*5 + arc*7 + cav*10) * veterania do quartel * bônus composição
  att_p := (p_inf*5 + p_arc*7 + p_cav*10) * (1 + 0.10*(a.barracks_lvl-1));
  -- defesa = (inf*5 + arc*4 + cav*6 + guarnição) * bônus da muralha
  def_p := (d.inf*5 + d.arc*4 + d.cav*6 + 10) * (1 + 0.05*(d.wall_lvl-1));

  -- tipo dominante de cada lado (pedra-papel-tesoura)
  att_dom := case greatest(p_inf, p_arc, p_cav)
               when p_cav then 'cav' when p_arc then 'arc' else 'inf' end;
  def_dom := case greatest(d.inf, d.arc, d.cav)
               when d.cav then 'cav' when d.arc then 'arc' else 'inf' end;
  -- inf > arc > cav > inf  (forte contra => +25%; fraco contra => -20%)
  if    (att_dom='inf' and def_dom='arc') or (att_dom='arc' and def_dom='cav') or (att_dom='cav' and def_dom='inf')
    then comp := 1.25;
  elsif (att_dom='arc' and def_dom='inf') or (att_dom='cav' and def_dom='arc') or (att_dom='inf' and def_dom='cav')
    then comp := 0.80;
  end if;
  att_p := att_p * comp;

  total := att_p + def_p;
  if att_p > def_p then
    winner := 'attacker';
    a_frac := least(0.90, def_p/att_p * 0.5);
    d_frac := least(0.95, greatest(0.5, 0.5 + 0.4*(att_p/total)));
  else
    winner := 'defender';
    a_frac := least(0.98, greatest(0.6, 0.6 + 0.4*(def_p/total)));
    d_frac := least(0.85, att_p/def_p * 0.4);
  end if;

  -- ---- Perdas ---------------------------------------------------------------
  a_li := floor(p_inf * a_frac); a_la := floor(p_arc * a_frac); a_lc := floor(p_cav * a_frac);
  d_li := floor(d.inf * d_frac); d_la := floor(d.arc * d_frac); d_lc := floor(d.cav * d_frac);

  -- ---- Saque (só se atacante vence) ----------------------------------------
  if winner = 'attacker' then
    -- cofre protegido = 100 * 1.3^(warehouse-1): recurso abaixo disso é intocável
    vault := 100 * power(1.3, d.warehouse_lvl - 1);
    -- fator de justiça: bater em alvo muito mais fraco rende quase nada
    ratio := public._power(d)::double precision / greatest(1, public._power(a));
    fair := case when ratio < 0.5 then 0.10
                 when ratio < 0.75 then 0.50
                 else 1.0 end;
    loot_g := floor(greatest(0, d.gold - vault) * 0.20 * fair);
    loot_w := floor(greatest(0, d.wood - vault) * 0.20 * fair);
  end if;

  -- ---- Aplica no defensor ---------------------------------------------------
  update public.players set
    inf = inf - d_li, arc = arc - d_la, cav = cav - d_lc,
    gold = gold - loot_g, wood = wood - loot_w,
    shield_until = now() + interval '8 hours'   -- escudo pós-ataque
  where id = d.id;

  -- ---- Aplica no atacante ---------------------------------------------------
  update public.players set
    inf = inf - a_li, arc = arc - a_la, cav = cav - a_lc,
    gold = gold + loot_g, wood = wood + loot_w,
    attack_cooldown_until = now() + interval '10 minutes'
  where id = a.id;

  -- ---- Registra a batalha ---------------------------------------------------
  bid := gen_random_uuid();
  insert into public.battles(id, attacker_id, defender_id, attacker_name, defender_name,
                             winner, loot_gold, loot_wood, att_losses, def_losses, detail)
  values (bid, a.id, d.id, a.nickname, d.nickname, winner, loot_g, loot_w,
          jsonb_build_object('inf',a_li,'arc',a_la,'cav',a_lc),
          jsonb_build_object('inf',d_li,'arc',d_la,'cav',d_lc),
          jsonb_build_object('att_power', round(att_p), 'def_power', round(def_p),
                             'att_dom', att_dom, 'def_dom', def_dom, 'comp', comp,
                             'sent', jsonb_build_object('inf',p_inf,'arc',p_arc,'cav',p_cav)));

  return jsonb_build_object(
    'battle_id', bid, 'winner', winner,
    'loot_gold', loot_g, 'loot_wood', loot_w,
    'att_power', round(att_p), 'def_power', round(def_p),
    'att_dom', att_dom, 'def_dom', def_dom,
    'att_losses', jsonb_build_object('inf',a_li,'arc',a_la,'cav',a_lc),
    'def_losses', jsonb_build_object('inf',d_li,'arc',d_la,'cav',d_lc)
  );
end;
$$;

-- Histórico de batalhas (as suas, como atacante ou defensor).
create or replace function public.get_battles()
returns setof public.battles language sql security definer set search_path = public as $$
  select * from public.battles
  where attacker_id = auth.uid() or defender_id = auth.uid()
  order by created_at desc
  limit 30;
$$;

-- Permissões: authenticated (inclui usuários anônimos) pode ler (RLS filtra as linhas)
-- e chamar a API. Toda ESCRITA acontece só dentro das funções SECURITY DEFINER.
grant select on public.players to authenticated;
grant select on public.battles to authenticated;

grant execute on function public.join_game(text)            to authenticated;
grant execute on function public.get_state()                to authenticated;
grant execute on function public.list_targets()             to authenticated;
grant execute on function public.upgrade_building(text)     to authenticated;
grant execute on function public.train_troops(text, int)    to authenticated;
grant execute on function public.attack(uuid, int, int, int) to authenticated;
grant execute on function public.get_battles()              to authenticated;
