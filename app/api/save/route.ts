import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { SaveState } from "@/app/components/demonScapeTypes";

export async function POST(request: Request) {
  const saveState: SaveState = await request.json();

  console.log("[API SAVE] incoming:", saveState);

  const client = await clientPromise;
  const db = client.db("demon-scape");

  await db.collection("saves").updateOne(
    { userId: saveState.userId },
    {
      $set: {
        ...saveState,
        meta: {
          ...saveState.meta,
          updatedAt: new Date(),
        },
      },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
