import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("demon-scape");

  const save = await db.collection("saves").findOne({ userId });
  console.log("[API LOAD] found save:", save);

  return NextResponse.json(save ?? null);
}
