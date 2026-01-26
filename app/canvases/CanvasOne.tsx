"use client";

import { useRef, useEffect } from "react";
import Phaser from "phaser";
import BootScene from "../phaser/BootScene";
import Main from "../phaser/LevelOne/Main";
import SceneHud from "../phaser/UtilityScenes/HudScene";
import CultHead from "../phaser/LevelOne/Conversations/CultHead";
import AlchTwins from "../phaser/LevelOne/Conversations/AlchTwins";
import BoxGuy from "../phaser/LevelOne/Conversations/BoxGuy";
import SaraOne from "../phaser/LevelOne/Conversations/SaraOne";
import Ghost from "../phaser/LevelOne/Conversations/Ghost";
import SkelMan from "../phaser/LevelOne/Conversations/SkelMan";
import ZombieCombat from "../phaser/LevelOne/Combat/ZombieCombat";
import GameOver from "../phaser/LevelOne/GameOver";
declare global {
  interface Window {
    phaserGame?: Phaser.Game;
  }
}

export default function CanvasOne() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    let cancelled = false;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "game-container",
      transparent: true,
      input: {
        keyboard: true,
        mouse: true,
      },
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0, x: 0 }, debug: false },
      },
      scene: [],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;
    window.phaserGame = game;

    game.scene.add("BootScene", BootScene);
    game.scene.add("SceneOne", Main);
    game.scene.add("SceneHud", SceneHud);
    game.scene.add("CultHead", CultHead);
    game.scene.add("AlchTwins", AlchTwins);
    game.scene.add("BoxGuy", BoxGuy);
    game.scene.add("SaraOne", SaraOne);
    game.scene.add("Ghost", Ghost);
    game.scene.add("SkelMan", SkelMan);
    game.scene.add("ZombieCombat", ZombieCombat);
    game.scene.add("GameOver", GameOver);

    game.scene.start("BootScene");

    window.addEventListener("resize", () => {
      gameRef.current?.scale.resize(window.innerWidth, window.innerHeight);
    });

    const handleResize = () => {
      gameRef.current?.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  // biome-ignore lint/correctness/useUniqueElementIds: <explanation> this is fine for a game
  return <div id="game-container"></div>;
}
