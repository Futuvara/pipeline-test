import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "invalid JSON body" },
      { status: 400 }
    );
  }

  const requiredFields = [
    "project_id",
    "actor_id",
    "action",
    "resource_type",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  return NextResponse.json(
    {
      logged: true,
      id: "placeholder-uuid",
    },
    { status: 201 }
  );
}
