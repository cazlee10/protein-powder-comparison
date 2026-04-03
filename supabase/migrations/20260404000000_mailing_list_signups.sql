-- Run this in the Supabase SQL Editor if you do not use the CLI to apply migrations.
create table if not exists public.mailing_list_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  source text not null default 'products_page',
  constraint mailing_list_signups_email_unique unique (email)
);

create index if not exists mailing_list_signups_created_at_idx
  on public.mailing_list_signups (created_at desc);

alter table public.mailing_list_signups enable row level security;

comment on table public.mailing_list_signups is 'Email signups from the products page mailing list popup';
