import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      app_name: "Pipeline Test",
      version: "2.0.0",
      features: ["analytics", "notifications", "profiles"],
    },
    { status: 200 }
  );
}
