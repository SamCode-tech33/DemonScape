"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/music/deus-ex-machina.mp3");
    audioRef.current.volume = 0.8;
  }, []);

  const handlePlayAudio = () => {
    handleStopAudio();
    audioRef.current?.play().catch((err) => {
      console.warn("Playback failed:", err);
    });
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <main className="demon-background flex flex-col items-center justify-around h-screen">
      <div className="hero font-bold text-red-950 underline opacity-85">
        Demon Scape
      </div>
      <Link href="/game">
        <button
          className="text-4xl h-32 w-56 bg-red-950 border-2 border-amber-500 text-black rounded-lg hover:text-amber-400 hover:bg-red-800 cursor-pointer opacity-60"
          onClick={handleStopAudio}
        >
          Play Game
        </button>
      </Link>
      <button
        className="h-24 w-28 bg-red-950 border-2 border-amber-500 text-black rounded-lg hover:text-amber-400 hover:bg-red-800 cursor-pointer flex justify-center items-center opacity-60"
        onClick={handlePlayAudio}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
          />
        </svg>
      </button>
      <div className="flame-background"></div>
    </main>
  );
}
