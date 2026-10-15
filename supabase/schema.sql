-- DesintoxicAÇÃO: schema inicial para Supabase/PostgreSQL
-- Execute no SQL Editor do Supabase antes de conectar a aplicação.

create extension if not exists pgcrypto;

-- Perfil privado criado automaticamente quando um usuário é criado no Supabase Auth.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.daily_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  checks jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date),
  constraint daily_progress_checks_object check (jsonb_typeof(checks) = 'object')
);

create table if not exists public.daily_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  note text not null default '',
  gratitude text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date)
);

create index if not exists daily_progress_user_date_idx on public.daily_progress (user_id, entry_date);
create index if not exists daily_journal_user_date_idx on public.daily_journal (user_id, entry_date);

alter table public.profiles enable row level security;
alter table public.daily_progress enable row level security;
alter table public.daily_journal enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Users manage own daily progress" on public.daily_progress;
create policy "Users manage own daily progress" on public.daily_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users manage own daily journal" on public.daily_journal;
create policy "Users manage own daily journal" on public.daily_journal
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Não crie políticas para anon. Desative signups públicos em Authentication > Settings.
-- Crie as duas contas manualmente em Authentication > Users (Add user).
