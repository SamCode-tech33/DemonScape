"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";

const mostean = localFont({
  src: "../public/assets/fonts/mostean.otf",
  weight: "700",
  display: "swap",
});

export default function HomePage() {
  const [isAudio, setIsAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/music/deus-ex-machina.mp3");
    audioRef.current.volume = 0.8;
  }, []);

  const handlePlayAudio = () => {
    audioRef.current?.play().catch((err) => {
      console.warn("Playback failed:", err);
    });
    setIsAudio(true);
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudio(false);
    }
  };

  return (
    <div className="demon-background flex flex-col items-center justify-between">
      <div className="flex justify-between w-screen h-32">
        <button
          className="silver mt-2 ml-4 h-16 w-36 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer flex justify-around items-center opacity-60 hover:opacity-90"
          onClick={!isAudio ? handlePlayAudio : handleStopAudio}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="size-10"
          >
            <path d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />{" "}
          </svg>
          {!isAudio ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="size-10"
            >
              <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="size-10"
            >
              <path d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          )}
        </button>
        <div className="mt-2 mr-4 flex gap-8">
          <button
            className={`${mostean.className} silver text-3xl h-16 w-48 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer flex justify-center items-center opacity-60 hover:opacity-90`}
          >
            Leader Boards
          </button>
          <button
            className={`${mostean.className} silver text-3xl h-16 w-48 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer flex justify-center items-center opacity-60 hover:opacity-90`}
          >
            Login / Sign-up
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-32">
        <div className="flex flex-col items-center">
          <div className={`hero mt-0 p-0 mb-32 ${mostean.className}`}>
            Demon Scape
          </div>
          <div className="flex flex-col gap-8">
            <Link href="/game">
              <button
                className={`${mostean.className} silver text-[48px] h-20 w-56 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer opacity-50 hover:opacity-90`}
                onClick={handleStopAudio}
              >
                Continue
              </button>
            </Link>
            <Link href="/game">
              <button
                className={`${mostean.className} silver text-[48px] h-20 w-56 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer opacity-50 hover:opacity-90`}
                onClick={handleStopAudio}
              >
                New Game
              </button>
            </Link>
            <Link href="/game">
              <button
                className={`${mostean.className} silver text-[48px] h-20 w-56 bg-red-950 border-2 border-amber-500 rounded-lg hover:bg-red-800 cursor-pointer opacity-50 hover:opacity-90`}
                onClick={handleStopAudio}
              >
                Options
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flame-background"></div>
    </div>
  );
}
