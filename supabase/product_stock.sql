-- MANUAL ACTION REQUIRED: run this in the Supabase SQL editor.
-- Adds per-design stock tracking for "The Numbered" tier products.
-- Stock is tracked per product_id (not per color/size) — a single unit cap shared
-- across every variant of a design, matching how DENIED. numbers a drop.
-- Take a backup first. This script is rerunnable.

create table if not exists public.product_stock (
  product_id integer primary key,
  unit_cap integer not null check (unit_cap > 0),
  units_sold integer not null default 0 check (units_sold >= 0),
  updated_at timestamptz not null default now(),
  constraint product_stock_not_oversold check (units_sold <= unit_cap)
);

alter table public.product_stock enable row level security;

drop policy if exists "product_stock_public_select" on public.product_stock;
create policy "product_stock_public_select" on public.product_stock
  for select to anon, authenticated using (true);

drop policy if exists "product_stock_admin_update" on public.product_stock;
create policy "product_stock_admin_update" on public.product_stock
  for update to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'))
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));

-- Atomically reserve `qty` units for a product. Returns true if the reservation
-- succeeded (enough stock remained), false if it would oversell. Safe under
-- concurrent checkouts because the increment and the cap check happen in one
-- UPDATE statement — no separate read-then-write race window.
create or replace function public.reserve_product_stock(p_product_id integer, p_qty integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated integer;
begin
  update public.product_stock
    set units_sold = units_sold + p_qty,
        updated_at = now()
    where product_id = p_product_id
      and units_sold + p_qty <= unit_cap;
  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

-- Releases previously reserved units (e.g. on a failed/abandoned payment cleanup).
create or replace function public.release_product_stock(p_product_id integer, p_qty integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.product_stock
    set units_sold = greatest(0, units_sold - p_qty),
        updated_at = now()
    where product_id = p_product_id;
end;
$$;

-- Seed rows for current Numbered-tier products (unit_cap = 100 each).
-- Safe to rerun: does nothing for product_ids that already have a row.
insert into public.product_stock (product_id, unit_cap, units_sold)
values
  (2, 100, 0),  -- Few Survive Acid Washed Tee
  (3, 100, 0),  -- Drive or Ride Supima Tee
  (7, 100, 0),  -- Unique Oversized Tee
  (8, 100, 0),  -- SHE IS Classic Tee
  (9, 100, 0),  -- I'm This Old Oversized Tee
  (10, 100, 0), -- The Game Begins Oversized Tee
  (11, 100, 0), -- 3 Monkeys Oversized Tee
  (13, 100, 0), -- To Do List Oversized Tee
  (14, 100, 0)  -- Infinite Classic Tee
on conflict (product_id) do nothing;
