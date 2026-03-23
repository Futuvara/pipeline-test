create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  title text not null,
  description text,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  priority integer default 0,
  assigned_to uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table tasks enable row level security;

create index idx_tasks_project_id on tasks (project_id);
create index idx_tasks_status on tasks (status);
