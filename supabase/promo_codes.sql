-- MANUAL ACTION REQUIRED: run this in the Supabase SQL editor.
-- Adds a database-backed promo code system, replacing the hardcoded
-- PROMO_CODES map in src/lib/checkout.ts. Lets admins add/pause/modify codes
-- without a code deploy. Take a backup first. This script is rerunnable.

create table if not exists public.promo_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  type text not null default 'percentage' check (type in ('percentage', 'flat')),
  value numeric not null check (value > 0),
  min_order numeric default 0 check (min_order >= 0),
  max_discount numeric check (max_discount is null or max_discount > 0),
  first_time_only boolean default false,
  max_uses integer check (max_uses is null or max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0),
  expires_at timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.promo_codes enable row level security;

drop policy if exists "promo_codes_public_select" on public.promo_codes;
create policy "promo_codes_public_select" on public.promo_codes
  for select to anon, authenticated
  using (active = true);

drop policy if exists "promo_codes_admin_all" on public.promo_codes;
create policy "promo_codes_admin_all" on public.promo_codes
  for all to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'))
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));

-- Atomically increments used_count. Called only after a paid order is
-- durably saved, so double-counting requires the same race conditions
-- already guarded against elsewhere in the order pipeline.
create or replace function public.increment_promo_usage(p_code text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.promo_codes
    set used_count = used_count + 1
    where code = p_code;
end;
$$;

-- Note: public.orders already has promo_code and promo_discount columns
-- (used throughout finalize.ts and admin-notification) — no schema change
-- needed there.

-- Seed the existing promo codes so checkout keeps working identically once
-- the hardcoded map is removed. Adjust/pause any of these from the Table
-- Editor going forward — no deploy needed.
insert into public.promo_codes (code, type, value, first_time_only, active)
values
  ('FIRST10', 'percentage', 10, true, true),
  ('DENIED20', 'percentage', 20, false, true),
  ('FLAT100', 'flat', 100, false, true)
on conflict (code) do nothing;
