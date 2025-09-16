export type WASDAndArrowKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  w: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  s: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
  shift: Phaser.Input.Keyboard.Key;
};

export interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

export interface EnemyStats {
  enemyPresence: boolean;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

export type NpcsInteraction = {
  name: string;
  sprite?: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
  floatRect: number;
  floatText: number;
  scene: string;
  range: number;
}[];

export type NpcInRange = {
  name: string;
  sprite?: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
  floatRect: number;
  floatText: number;
  scene: string;
} | null;

export interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

export interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}
