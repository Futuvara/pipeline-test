import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      table: "user_profiles",
      columns: ["id", "email", "display_name", "avatar_url", "bio"],
      status: "ready",
    },
    { status: 200 }
  );
}
