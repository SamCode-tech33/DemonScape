"use client";

import dynamic from "next/dynamic";

const CanvasOne = dynamic(() => import("../canvases/CanvasOne"), {
  ssr: false,
});

export default function GamePage() {
  return (
    <main className="flex items-center justify-center h-screen pointer-events-none">
      <CanvasOne />
    </main>
  );
}
