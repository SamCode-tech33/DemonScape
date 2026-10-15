import type { CombatSceneState } from "../../TB-combat/combatSceneTypes";
import { counter, baseAttack, idle } from "./enemyMoves";
import { cultHeadCombatAnimation } from "../../TB-combat/combatAnimationSettings";

export const cultHead = () => ({
  enemyStats: {
    health: 666,
    maxHealth: 666,
    magic: 333,
    maxMagic: 333,
    experience: 10000,
  },
  from: "cultHead",
  bg: "ZombieCombatBG",
  bgPath: "/assets/combat/combat-dung-cath-bg.png",
  audio: "dungeon-combat",
  audioPath: "/assets/music/first-fights.mp3",
  sprite: "zombie-combat-idle",
  spritePath: "/assets/enemies/zombie/idle.png",
  idleAnims: "cult_head_combat_idle",
  animationLoadOut: (scene: Phaser.Scene & CombatSceneState) =>
    cultHeadCombatAnimation(scene),
  baseAttack: (scene: Phaser.Scene & CombatSceneState) => baseAttack(scene),
  counter: (scene: Phaser.Scene & CombatSceneState) => counter(scene),
  idle: (scene: Phaser.Scene & CombatSceneState) => idle(scene),
});
