"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import SceneOne from "../phaser/SceneOne";
import SceneHud from "../phaser/SceneHud";

export default function CanvasOne() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 2555,
      height: 1280,
      parent: "gameCanvas",
      transparent: true,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0, x: 0 }, debug: true },
      },
      scene: [SceneOne, SceneHud],
    };

    gameRef.current = new Phaser.Game(config);

    const handleResize = () => {
      gameRef.current?.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div id="game-container"></div>;
}
