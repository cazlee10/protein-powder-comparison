-- Run this in the Supabase SQL Editor if you do not use the CLI to apply migrations.
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text not null,
  stripe_payment_intent_id text,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null,
  donor_email text,
  status text not null default 'completed',
  created_at timestamptz not null default now(),
  constraint donations_stripe_session_unique unique (stripe_checkout_session_id)
);

create index if not exists donations_created_at_idx
  on public.donations (created_at desc);

alter table public.donations enable row level security;

comment on table public.donations is 'Completed Stripe donation checkout sessions';
