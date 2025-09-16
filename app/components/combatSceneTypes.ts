import Phaser from "phaser";
import { PlayerStats, EnemyStats } from "./demonScapeTypes";

export interface CombatSceneState {
  music: Phaser.Sound.BaseSound;
  player: Phaser.Physics.Arcade.Sprite;
  enemy: Phaser.Physics.Arcade.Sprite;
  playerTurn: boolean;
  playerAttack: boolean;
  attackVectorBase: Phaser.GameObjects.Graphics | undefined;
  attackVectorSpecial: Phaser.GameObjects.Graphics | undefined;
  attackVectorBaseText: Phaser.GameObjects.Text | undefined;
  attackVectorSpecialText: Phaser.GameObjects.Text | undefined;
  qte: Phaser.GameObjects.Graphics | undefined;
  qteText: Phaser.GameObjects.Text | undefined;
  playerStats: PlayerStats;
  enemyStats: EnemyStats;
  timerValue: number;
  timerText: Phaser.GameObjects.Text | undefined;
  timerEvent: Phaser.Time.TimerEvent | undefined;
  dodge: Phaser.GameObjects.Graphics | undefined;
  dodgeText: Phaser.GameObjects.Text | undefined;
  parry: Phaser.GameObjects.Graphics | undefined;
  parryText: Phaser.GameObjects.Text | undefined;
}
