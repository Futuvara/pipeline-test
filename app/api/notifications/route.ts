import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      table: "notifications",
      columns: ["id", "user_id", "title", "read"],
      status: "ready",
    },
    { status: 200 }
  );
}
