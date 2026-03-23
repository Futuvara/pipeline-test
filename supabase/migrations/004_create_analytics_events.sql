create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  event_name text not null,
  payload jsonb default '{}',
  user_agent text,
  ip_address text,
  created_at timestamptz default now()
);

alter table analytics_events enable row level security;

create index idx_analytics_events_project_id on analytics_events (project_id);
create index idx_analytics_events_event_name on analytics_events (event_name);
