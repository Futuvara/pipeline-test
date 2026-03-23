CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id), -- Assuming a 'projects' table exists for foreign key
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority integer DEFAULT 0,
  assigned_to uuid REFERENCES auth.users(id), -- Assuming user authentication
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON tasks
  FOR SELECT USING (TRUE);

CREATE POLICY "Enable insert for authenticated users" ON tasks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for users on their own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = assigned_to) WITH CHECK (auth.uid() = assigned_to);

CREATE POLICY "Enable delete for users on their own tasks" ON tasks
  FOR DELETE USING (auth.uid() = assigned_to);

CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON tasks (project_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks (status);
