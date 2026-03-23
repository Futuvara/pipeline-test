import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const REQUIRED_FIELDS = ['project_id', 'actor_id', 'action', 'resource_type'] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      return NextResponse.json({ error: `missing required field: ${field}` }, { status: 400 });
    }
  }

  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      project_id: body.project_id,
      actor_id: body.actor_id,
      action: body.action,
      resource_type: body.resource_type,
      resource_id: body.resource_id ?? null,
      metadata: body.metadata ?? {},
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ logged: true, id: data.id }, { status: 201 });
}
