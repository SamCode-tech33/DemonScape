import type { CombatSceneState } from "@/app/components/TB-combat/combatSceneTypes";
import { counter, baseAttack, idle } from "./enemyMoves";
import { zombieCombatAnimation } from "@/app/components/TB-combat/combatAnimationSettings";

export const bossZombie = () => ({
  enemyStats: {
    health: 1,
    maxHealth: 40,
    magic: 5,
    maxMagic: 5,
    experience: 20,
  },
  from: "bossZombie",
  bg: "ZombieCombatBG",
  bgPath: "/assets/combat/combat-dung-cath-bg.png",
  audio: "dungeon-combat",
  audioPath: "/assets/music/first-fights.mp3",
  sprite: "zombie-combat-idle",
  spritePath: "/assets/enemies/zombie/idle.png",
  idleAnims: "zombie-combat-idle-left",
  animationLoadOut: (scene: Phaser.Scene & CombatSceneState) =>
    zombieCombatAnimation(scene),
  baseAttack: (scene: Phaser.Scene & CombatSceneState) => baseAttack(scene),
  counter: (scene: Phaser.Scene & CombatSceneState) => counter(scene),
  idle: (scene: Phaser.Scene & CombatSceneState) => idle(scene),
});
