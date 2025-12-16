-- Piping Elements: Supabase schema + RLS policies

create extension if not exists pgcrypto;

-- 1) CONTACT INQUIRIES
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  service text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2) BLOGS
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text,
  excerpt text,
  content text,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) EXPERTS
create table if not exists public.experts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  discipline text,
  bio text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4) SOFTWARE ITEMS
create table if not exists public.software_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_desc text,
  description text,
  logo_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5) CHAT MESSAGES
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 6) ADMIN USERS
create table if not exists public.admin_users (
  id uuid primary key
);

-- RLS
alter table public.contact_inquiries enable row level security;
alter table public.blogs enable row level security;
alter table public.experts enable row level security;
alter table public.software_items enable row level security;
alter table public.chat_messages enable row level security;
alter table public.admin_users enable row level security;

-- Helper: allow inserts from public (contact + chat)
create policy "public_insert_contact" on public.contact_inquiries
for insert to public
with check (true);

create policy "public_insert_chat" on public.chat_messages
for insert to public
with check (true);

-- Public read only published content
create policy "public_read_published_blogs" on public.blogs
for select to public
using (published = true);

create policy "public_read_published_experts" on public.experts
for select to public
using (published = true);

create policy "public_read_published_software" on public.software_items
for select to public
using (published = true);

-- Admin-only policies (uses admin_users table)
create policy "admin_read_contact" on public.contact_inquiries
for select to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_write_contact" on public.contact_inquiries
for update to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_delete_contact" on public.contact_inquiries
for delete to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_manage_blogs" on public.blogs
for all to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_manage_experts" on public.experts
for all to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_manage_software" on public.software_items
for all to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_manage_chat" on public.chat_messages
for select to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_update_chat" on public.chat_messages
for update to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_delete_chat" on public.chat_messages
for delete to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy "admin_read_admin_users" on public.admin_users
for select to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));
