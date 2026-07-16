-- MANUAL ACTION REQUIRED: run this in the Supabase SQL editor after reviewing the preflight queries below.
-- This script is rerunnable where PostgreSQL permits. It intentionally fails on duplicate IDs, invalid statuses,
-- or legacy shipped rows without tracking details; clean/backfill those rows, then rerun. Take a backup first.

-- Preflight (run separately if desired):
-- select payment_id, count(*) from public.orders where payment_id is not null group by payment_id having count(*) > 1;
-- select order_id, count(*) from public.orders where order_id is not null group by order_id having count(*) > 1;
-- select id, status from public.orders where status not in ('placed','confirmed','printing','shipped','delivered','cancelled');
-- select id from public.orders where status = 'shipped' and (courier_partner is null or tracking_number is null);

-- Pending checkout snapshots are server-only and let the webhook recover paid orders when the browser closes.
create table if not exists public.pending_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  razorpay_order_id text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  items jsonb not null,
  subtotal integer not null check (subtotal >= 0),
  total integer not null check (total >= 0),
  shipping integer not null check (shipping >= 0),
  promo_code text,
  promo_discount integer not null default 0 check (promo_discount >= 0),
  shipping_name text not null,
  shipping_email text not null,
  shipping_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_pincode text not null,
  processed_at timestamptz,
  order_record_id uuid
);
alter table public.pending_orders enable row level security;
create index if not exists pending_orders_user_id_idx on public.pending_orders(user_id);
create index if not exists pending_orders_created_at_idx on public.pending_orders(created_at);

alter table public.orders add column if not exists courier_partner text;
alter table public.orders add column if not exists tracking_number text;
alter table public.orders add column if not exists tracking_url text;
alter table public.orders add column if not exists shipped_at timestamptz;
alter table public.orders add column if not exists shipment_email_sent_at timestamptz;

do $$ begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.user_addresses'::regclass and conname = 'user_addresses_user_id_key') then alter table public.user_addresses add constraint user_addresses_user_id_key unique (user_id); end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_payment_id_key') then alter table public.orders add constraint orders_payment_id_key unique (payment_id); end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_order_id_key') then alter table public.orders add constraint orders_order_id_key unique (order_id); end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_status_check') then alter table public.orders add constraint orders_status_check check (status in ('placed','confirmed','printing','shipped','delivered','cancelled')) not valid; end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_shipment_details_check') then alter table public.orders add constraint orders_shipment_details_check check (status <> 'shipped' or (nullif(btrim(courier_partner), '') is not null and nullif(btrim(tracking_number), '') is not null and shipped_at is not null)) not valid; end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_tracking_url_check') then alter table public.orders add constraint orders_tracking_url_check check (tracking_url is null or tracking_url ~* '^https?://') not valid; end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.orders'::regclass and conname = 'orders_tracking_length_check') then alter table public.orders add constraint orders_tracking_length_check check ((courier_partner is null or char_length(courier_partner) <= 100) and (tracking_number is null or char_length(tracking_number) <= 200) and (tracking_url is null or char_length(tracking_url) <= 2048)) not valid; end if;
end $$;
alter table public.orders validate constraint orders_status_check;
alter table public.orders validate constraint orders_shipment_details_check;
alter table public.orders validate constraint orders_tracking_url_check;
alter table public.orders validate constraint orders_tracking_length_check;

alter table public.orders enable row level security;
alter table public.user_addresses enable row level security;

drop policy if exists "orders_owner_select" on public.orders;
create policy "orders_owner_select" on public.orders for select to authenticated using (auth.uid() = user_id);
drop policy if exists "orders_admin_select" on public.orders;
create policy "orders_admin_select" on public.orders for select to authenticated using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));
drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders for update to authenticated using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com')) with check (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));

drop policy if exists "addresses_owner_select" on public.user_addresses;
create policy "addresses_owner_select" on public.user_addresses for select to authenticated using (auth.uid() = user_id);
drop policy if exists "addresses_owner_insert" on public.user_addresses;
create policy "addresses_owner_insert" on public.user_addresses for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "addresses_owner_update" on public.user_addresses;
create policy "addresses_owner_update" on public.user_addresses for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "addresses_owner_delete" on public.user_addresses;
create policy "addresses_owner_delete" on public.user_addresses for delete to authenticated using (auth.uid() = user_id);
drop policy if exists "addresses_admin_select" on public.user_addresses;
create policy "addresses_admin_select" on public.user_addresses for select to authenticated using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));
drop policy if exists "addresses_admin_update" on public.user_addresses;
create policy "addresses_admin_update" on public.user_addresses for update to authenticated using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com')) with check (lower(coalesce(auth.jwt() ->> 'email', '')) in ('da.2793@yahoo.com','geetikatyagi75@gmail.com'));
