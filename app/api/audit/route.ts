import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      table: "audit_logs",
      columns: [
        "id",
        "project_id",
        "actor_id",
        "action",
        "resource_type",
        "resource_id",
        "metadata",
      ],
      indexes: [
        "project_id",
        "actor_id",
        "action",
        "created_at",
        "project_id_created_at",
      ],
      status: "ready",
    },
    { status: 200 }
  );
}
