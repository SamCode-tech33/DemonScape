import type Phaser from "phaser";
import type {
  EnemyStats,
  PlayerStats,
  WASDAndArrowKeys,
} from "../demonScapeTypes";

export interface SceneOneState {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  keys: WASDAndArrowKeys;
  spaceKey: Phaser.Input.Keyboard.Key;
  cultHead: Phaser.Physics.Arcade.Sprite;
  alchTwin: Phaser.Physics.Arcade.Sprite;
  alchTwin2: Phaser.Physics.Arcade.Sprite;
  npcs: Phaser.Physics.Arcade.Group;
  boxNpc: Phaser.Physics.Arcade.Sprite;
  sara: Phaser.Physics.Arcade.Sprite;
  ghost: Phaser.GameObjects.Sprite | undefined;
  skel: Phaser.Physics.Arcade.Sprite;
  zom1: Phaser.Physics.Arcade.Sprite;
  zom2: Phaser.Physics.Arcade.Sprite;
  zom3: Phaser.Physics.Arcade.Sprite;
  controls: Phaser.GameObjects.Text;
  backgroundMusic: Phaser.Sound.BaseSound;
  void: number;
  isJumping: boolean;
  animatedTorches: Phaser.GameObjects.Sprite[];
  animatedAlchemy: Phaser.GameObjects.Sprite[];
  interactionBox: Phaser.GameObjects.Graphics | undefined;
  interactionKey: Phaser.GameObjects.Text | undefined;
  noInteraction: Phaser.GameObjects.Text | undefined;
  activeNpc: { name: string; scene: string } | null;
  redScreen: Phaser.GameObjects.Rectangle;
  ghostCompanion: Phaser.Physics.Arcade.Sprite;
  saraOneSceneNum: number;
  chatBubbleAlch2: Phaser.GameObjects.Graphics | undefined;
  chatTextAlch2: Phaser.GameObjects.Text | undefined;
  approachBox: Phaser.GameObjects.Graphics | undefined;
  approachText: Phaser.GameObjects.Text | undefined;
  alchEvent: boolean;
  playerStats: PlayerStats;
  enemyStats: EnemyStats;
  zomNum: number;
  zomDeathCount: number;
  alchSceneNum: number;
  cultHeadSceneNum: number;
  ghostFollow: boolean;
  lastDirection: string;
  movementDisabled: boolean;
  portal: Phaser.GameObjects.Sprite;
  door: Phaser.GameObjects.Sprite;
  chest: Phaser.GameObjects.Sprite;
  puzzleBook1: Phaser.GameObjects.Sprite;
  puzzleBook2: Phaser.GameObjects.Sprite;
}
