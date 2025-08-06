import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-around h-screen">
      <h1 className="text-4xl font-bold text-red-950 underline">Demon Scape</h1>
      <Link href="/game">
        <button className="text-3xl h-24 w-48 bg-red-950 text-black rounded-lg hover:text-white hover:bg-red-800 cursor-pointer">
          Play Game
        </button>
      </Link>
    </main>
  );
}

