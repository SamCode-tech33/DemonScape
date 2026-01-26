import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { SaveState } from "@/app/components/demonScapeTypes";

export async function POST(request: Request) {
  const saveState: SaveState = await request.json();

  if (!saveState.userId || !saveState.slot) {
    return NextResponse.json(
      { error: "Missing userId or slot" },
      { status: 400 },
    );
  }

  console.log("[API SAVE] incoming:", saveState);

  const client = await clientPromise;
  const db = client.db("demon-scape");

  await db.collection("saves").updateOne(
    {
      userId: saveState.userId,
      slot: saveState.slot,
    },
    {
      $set: {
        ...saveState,
        meta: {
          ...saveState.meta,
          updatedAt: new Date(),
        },
      },
    },
    { upsert: true },
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
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

  await db.collection("saves").deleteOne({
    userId,
    slot: Number(slot),
  });

  return NextResponse.json({ ok: true });
}
