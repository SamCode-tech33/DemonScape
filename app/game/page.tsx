"use client"

import GameCanvas from "../components/GameCanvas";
import dynamic from "next/dynamic";

const gameCanvas = dynamic(() => import("../components/GameCanvas"), {
  ssr: false,
});

export default function GamePage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <GameCanvas />
    </main>
  );
}
