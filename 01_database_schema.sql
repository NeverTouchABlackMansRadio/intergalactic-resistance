-- INTERGALACTIC RESISTANCE - DATABASE SCHEMA
-- Run these migrations in Supabase SQL editor

-- Create profiles table (for future multiplayer)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create games table
create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  current_turn integer default 1,
  foe_hp integer default 5000,
  foe_discovered boolean default false,
  game_status text default 'active', -- active, won, lost
  unique(user_id, created_at)
);

-- Create planets table
create table if not exists public.planets (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  name text not null,
  planet_type text not null, -- barren, temperate, crystalline, etc
  x integer default 0,
  y integer default 0,
  is_home boolean default false,
  population integer default 1000,
  morale integer default 50,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create facilities table
create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  planet_id uuid references public.planets(id) on delete cascade not null,
  facility_type text not null, -- mining, crystals, quantum, research, trade_hub
  level integer default 1,
  ore_per_turn integer default 0,
  crystals_per_turn integer default 0,
  quantum_per_turn integer default 0,
  essence_per_turn integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create inventory table
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null unique,
  ore integer default 0,
  crystals integer default 0,
  quantum_materials integer default 0,
  credits integer default 0,
  alien_essence integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create locations table
create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  name text not null,
  location_type text not null, -- mining_site, crystal_cave, anomaly, empty
  x integer default 0,
  y integer default 0,
  discovered boolean default false,
  visited boolean default false,
  resource_type text, -- ore, crystals, quantum, essence, credits
  resource_amount integer default 0,
  visited_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create player_crew table
create table if not exists public.player_crew (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  name text not null,
  role text not null, -- pilot, engineer, medic, soldier, scientist
  level integer default 1,
  health integer default 100,
  max_health integer default 100,
  morale integer default 50,
  experience integer default 0,
  hired_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ships table
create table if not exists public.ships (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  name text not null,
  hull_type text default 'fighter', -- fighter, explorer, carrier
  hull_level integer default 1,
  engine_level integer default 1,
  weapon_level integer default 1,
  shield_level integer default 1,
  status text default 'building', -- building, ready, exploring, in_combat
  health integer default 500,
  max_health integer default 500,
  cargo_capacity integer default 1000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create combat_log table
create table if not exists public.combat_log (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  turn_number integer not null,
  enemy_type text not null,
  player_hp integer not null,
  enemy_hp integer not null,
  damage_dealt integer not null,
  damage_taken integer not null,
  outcome text not null, -- win, loss
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create game_log table (for event tracking)
create table if not exists public.game_log (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  turn_number integer not null,
  event_type text not null, -- explore, combat, build, upgrade, craft, etc
  event_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.games enable row level security;
alter table public.planets enable row level security;
alter table public.facilities enable row level security;
alter table public.inventory enable row level security;
alter table public.locations enable row level security;
alter table public.player_crew enable row level security;
alter table public.ships enable row level security;
alter table public.combat_log enable row level security;
alter table public.game_log enable row level security;

-- Create RLS policies (allow all for now, restrict later)
create policy "Users can read own games" on public.games
  for select using (user_id = auth.uid());

create policy "Users can create games" on public.games
  for insert with check (user_id = auth.uid());

create policy "Users can update own games" on public.games
  for update using (user_id = auth.uid());

-- Similar policies for other tables (simplified for MVP)
create policy "Anyone can read planets" on public.planets for select using (true);
create policy "Anyone can read facilities" on public.facilities for select using (true);
create policy "Anyone can read inventory" on public.inventory for select using (true);
create policy "Anyone can read locations" on public.locations for select using (true);
create policy "Anyone can read crew" on public.player_crew for select using (true);
create policy "Anyone can read ships" on public.ships for select using (true);

-- Create indexes for performance
create index idx_games_user_id on public.games(user_id);
create index idx_planets_game_id on public.planets(game_id);
create index idx_facilities_planet_id on public.facilities(planet_id);
create index idx_locations_game_id on public.locations(game_id);
create index idx_crew_game_id on public.player_crew(game_id);
create index idx_ships_game_id on public.ships(game_id);
