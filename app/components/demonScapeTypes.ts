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
  dialogueLine: string;
  emote: string;
  choices?: DialogueChoice[];
}
export interface ConvoSceneState {
  currentNodeIndex: number;
  dialogueText: Phaser.GameObjects.Text;
  choiceTexts: Phaser.GameObjects.Text[];
  music: Phaser.Sound.BaseSound;
  voiceDialogue: Phaser.Sound.BaseSound | null;
  dialogueNodes: DialogueNode[];
  speechInterval: NodeJS.Timeout | null;
  speakerText: Phaser.GameObjects.Text;
  playerSpeaker: Phaser.GameObjects.Text;
  emoteText: Phaser.GameObjects.Text;
  emoteBg: Phaser.GameObjects.Rectangle;
  dialogueScene: number;
  fromScene: string;
  speakerName: string;
  voiceLoop: boolean;
  manyOptionsNode: number;
}
export interface SaveState {
  userId: string;

  scene: {
    alchSceneNum: number;
    saraOneSceneNum: number;
    cultHeadSceneNum: number;
  };

  player: {
    x: number;
    y: number;
    lastDirection: string;
    stats: PlayerStats;
    ghostFollow: boolean;
  };

  combat: {
    zomDeathCount: number;
    zomNum: number;
  };

  flags: {
    alchEvent: boolean;
    movementDisabled: boolean;
  };

  meta: {
    updatedAt: Date;
  };
}
