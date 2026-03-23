create table feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

alter table feedback enable row level security;
