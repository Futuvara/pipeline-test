import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "invalid JSON body" },
      { status: 400 }
    );
  }

  const requiredFields = ["project_id", "actor_id", "action", "resource_type"] as const;
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (typeof body.project_id !== "string" || !UUID_REGEX.test(body.project_id)) {
    return NextResponse.json(
      { error: "missing required field: project_id" },
      { status: 400 }
    );
  }

  if (typeof body.actor_id !== "string" || !UUID_REGEX.test(body.actor_id)) {
    return NextResponse.json(
      { error: "missing required field: actor_id" },
      { status: 400 }
    );
  }

  if (typeof body.action !== "string" || body.action.trim() === "") {
    return NextResponse.json(
      { error: "missing required field: action" },
      { status: 400 }
    );
  }

  if (typeof body.resource_type !== "string" || body.resource_type.trim() === "") {
    return NextResponse.json(
      { error: "missing required field: resource_type" },
      { status: 400 }
    );
  }

  const ip_address =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    ((req as unknown as { socket?: { remoteAddress?: string } }).socket
      ?.remoteAddress ?? null);

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      project_id: body.project_id,
      actor_id: body.actor_id,
      action: body.action,
      resource_type: body.resource_type,
      resource_id: body.resource_id ?? null,
      metadata: body.metadata ?? {},
      ip_address,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { logged: true, id: data.id },
    { status: 201 }
  );
}
