import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      table: "analytics_events",
      columns: ["id", "project_id", "event_name", "payload"],
      status: "ready",
    },
    { status: 200 }
  );
}
