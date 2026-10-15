import type { CombatSceneState } from "../TB-combat/combatSceneTypes";

export interface EnemyType {
  enemyStats: {
    health: number;
    maxHealth: number;
    magic: number;
    maxMagic: number;
    experience: number;
  };
  from: string;
  bg: string;
  bgPath: string;
  audio: string;
  audioPath: string;
  sprite: string;
  spritePath: string;
  idleAnims: string;
  animationLoadOut: (scene: Phaser.Scene & CombatSceneState) => void;
  baseAttack: (scene: Phaser.Scene & CombatSceneState) => void;
  counter: (scene: Phaser.Scene & CombatSceneState) => void;
  idle: (
    scene: Phaser.Scene & CombatSceneState,
  ) => Phaser.Physics.Arcade.Sprite;
}
