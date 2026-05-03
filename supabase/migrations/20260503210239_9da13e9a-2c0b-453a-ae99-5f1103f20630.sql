
-- Roles enum and table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create policy "Admins can manage roles"
  on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Booking settings (single row)
create table public.booking_settings (
  id int primary key default 1,
  slot_minutes int not null default 120,
  buffer_minutes int not null default 30,
  min_lead_hours int not null default 4,
  max_advance_days int not null default 45,
  daily_max_jobs int not null default 4,
  constraint single_row check (id = 1)
);
alter table public.booking_settings enable row level security;
insert into public.booking_settings (id) values (1);

create policy "Anyone can read settings"
  on public.booking_settings for select to anon, authenticated using (true);
create policy "Admins manage settings"
  on public.booking_settings for all to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

-- Weekly availability (0=Sun..6=Sat)
create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  weekday smallint not null check (weekday between 0 and 6),
  start_minute int not null check (start_minute between 0 and 1440),
  end_minute int not null check (end_minute between 0 and 1440),
  check (end_minute > start_minute)
);
alter table public.availability_rules enable row level security;

create policy "Anyone reads availability"
  on public.availability_rules for select to anon, authenticated using (true);
create policy "Admins manage availability"
  on public.availability_rules for all to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

-- Default Mon-Sat 09:00-18:00
insert into public.availability_rules (weekday, start_minute, end_minute) values
  (1, 540, 1080),(2, 540, 1080),(3, 540, 1080),
  (4, 540, 1080),(5, 540, 1080),(6, 540, 1080);

-- Blocked specific periods
create table public.blocked_periods (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);
alter table public.blocked_periods enable row level security;

create policy "Anyone reads blocks"
  on public.blocked_periods for select to anon, authenticated using (true);
create policy "Admins manage blocks"
  on public.blocked_periods for all to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

-- Bookings
create type public.booking_status as enum ('requested','confirmed','declined','completed','cancelled');
create type public.service_type as enum ('turnover','deep_clean','urine_odor','emergency','upholstery','other');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  whatsapp text,
  email text,
  area text not null,
  property_type text,
  service service_type not null,
  details text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status booking_status not null default 'requested',
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);
alter table public.bookings enable row level security;

-- Public can insert booking requests
create policy "Public can request bookings"
  on public.bookings for insert to anon, authenticated with check (true);

-- Public can read only busy-slot info via a view (no PII)
create policy "Admins read bookings"
  on public.bookings for select to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "Admins update bookings"
  on public.bookings for update to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));
create policy "Admins delete bookings"
  on public.bookings for delete to authenticated
  using (public.has_role(auth.uid(),'admin'));

-- Public function returning busy time ranges (no PII) for upcoming window
create or replace function public.get_busy_slots(_from timestamptz, _to timestamptz)
returns table(starts_at timestamptz, ends_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select b.starts_at, b.ends_at
  from public.bookings b
  where b.status in ('requested','confirmed')
    and b.starts_at < _to
    and b.ends_at > _from
$$;

grant execute on function public.get_busy_slots(timestamptz, timestamptz) to anon, authenticated;
