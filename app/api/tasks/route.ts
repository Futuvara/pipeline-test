import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json(
    {
      table: "tasks",
      columns: ["id", "project_id", "title", "status", "priority"],
      status: "ready"
    },
    { status: 200 }
  );
}
