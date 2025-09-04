"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import Main from "../phaser/LevelOne/Main";
import SceneHud from "../phaser/UtilityScenes/SceneHud";
import CultHead from "../phaser/LevelOne/Conversations/CultHead";
import AlchTwins from "../phaser/LevelOne/Conversations/AlchTwins";
import BoxGuy from "../phaser/LevelOne/Conversations/BoxGuy";
import SaraOne from "../phaser/LevelOne/Conversations/SaraOne";
import Ghost from "../phaser/LevelOne/Conversations/Ghost";
import SkelMan from "../phaser/LevelOne/Conversations/SkelMan";

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
      scene: [
        Main,
        SceneHud,
        CultHead,
        AlchTwins,
        BoxGuy,
        SaraOne,
        Ghost,
        SkelMan,
      ],
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
