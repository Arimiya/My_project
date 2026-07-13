create extension if not exists "pgcrypto";

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  location text,
  phone text,
  email text unique,
  logo_url text,
  currency text not null default 'GHS',
  tax_rate numeric not null default 0,
  status text not null default 'trial' check (status in ('trial', 'active', 'expired', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists branches (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  location text,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  full_name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  role text not null default 'owner' check (role in ('super_admin', 'owner', 'manager', 'cashier', 'inventory_officer', 'accountant')),
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists subscription_plans (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  price numeric not null,
  duration_days integer not null default 30,
  features jsonb not null default '[]'::jsonb,
  limits jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  plan_key text not null,
  status text not null default 'trial' check (status in ('trial', 'active', 'expired', 'cancelled')),
  start_date timestamptz,
  expiry_date timestamptz,
  auto_renew boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete set null,
  provider text default 'paystack',
  reference text,
  amount numeric not null default 0,
  currency text not null default 'GHS',
  status text not null default 'pending',
  metadata jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  image_url text,
  sku text,
  barcode text,
  buying_price numeric not null default 0,
  selling_price numeric not null default 0,
  stock_quantity numeric not null default 0,
  reorder_level numeric not null default 5,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  name text not null,
  phone text,
  email text,
  address text,
  loyalty_points numeric not null default 0,
  balance numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  name text not null,
  phone text,
  email text,
  address text,
  products_supplied jsonb not null default '[]'::jsonb,
  amount_owed numeric not null default 0,
  payment_status text default 'unpaid',
  created_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  category text not null,
  amount numeric not null default 0,
  note text,
  expense_date timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  type text not null,
  quantity numeric not null default 0,
  note text,
  performed_by uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  cashier_id uuid references app_users(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  invoice_number text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  discount numeric not null default 0,
  tax numeric not null default 0,
  total numeric not null default 0,
  payment_method text,
  payment_reference text,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  user_id uuid references app_users(id) on delete set null,
  action text not null,
  entity text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  title text not null,
  message text not null,
  type text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table businesses enable row level security;
alter table branches enable row level security;
alter table app_users enable row level security;
alter table subscription_plans enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table customers enable row level security;
alter table suppliers enable row level security;
alter table expenses enable row level security;
alter table inventory_transactions enable row level security;
alter table sales enable row level security;
alter table audit_logs enable row level security;
alter table notifications enable row level security;
