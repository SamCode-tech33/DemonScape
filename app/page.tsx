import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Dungeon Game</h1>
      <Link href="/game">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
          Play Game
        </button>
      </Link>
    </main>
  );
}

