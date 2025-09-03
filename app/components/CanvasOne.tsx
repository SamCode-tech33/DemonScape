"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import SceneOne from "../phaser/SceneOne";
import SceneHud from "../phaser/SceneHud";
import CultHead from "../phaser/CultHead";
import AlchemistTwins from "../phaser/AlchemistTwins";

export default function CanvasOne() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "gameCanvas",
      transparent: true,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0, x: 0 }, debug: false },
      },
      scene: [SceneOne, SceneHud, CultHead, AlchemistTwins],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    window.addEventListener("resize", () => {
      gameRef.current?.scale.resize(window.innerWidth, window.innerHeight);
    });

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
