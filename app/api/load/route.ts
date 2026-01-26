import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const slot = searchParams.get("slot");

  if (!userId || !slot) {
    return NextResponse.json(
      { error: "Missing userId or slot" },
      { status: 400 },
    );
  }

  const client = await clientPromise;
  const db = client.db("demon-scape");

  const save = await db.collection("saves").findOne({
    userId,
    slot: Number(slot),
  });

  console.log("[API LOAD] found save:", save);

  return NextResponse.json(save ?? null);
}
