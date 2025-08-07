"use client"

import dynamic from "next/dynamic";

const CanvasOne = dynamic(() => import("../components/CanvasOne"), {
  ssr: false,
});

export default function GamePage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <CanvasOne />
    </main>
  );
}
