-- Create audit_logs table
CREATE TABLE audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL,
    actor_id uuid NOT NULL,
    action text NOT NULL,
    resource_type text NOT NULL,
    resource_id uuid,
    metadata jsonb DEFAULT '{}',
    ip_address text,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS policy: authenticated users can view audit logs for projects they belong to
CREATE POLICY "Enable read access for authenticated users on their projects" ON audit_logs
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM project_members WHERE project_members.project_id = audit_logs.project_id AND project_members.user_id = auth.uid()));

-- RLS policy: authenticated users can insert audit logs with their own actor_id
CREATE POLICY "Enable insert for authenticated users" ON audit_logs
FOR INSERT TO authenticated
WITH CHECK (actor_id = auth.uid());

-- Indexes
CREATE INDEX idx_audit_logs_project_id ON audit_logs (project_id);
CREATE INDEX idx_audit_logs_actor_id ON audit_logs (actor_id);
CREATE INDEX idx_audit_logs_action ON audit_logs (action);
CREATE INDEX idx_audit_logs_created_at_desc ON audit_logs (created_at DESC);
CREATE INDEX idx_audit_logs_project_created_at_desc ON audit_logs (project_id, created_at DESC);
