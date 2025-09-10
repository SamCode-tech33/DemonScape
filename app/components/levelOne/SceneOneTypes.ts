import Phaser from "phaser";
import { WASDAndArrowKeys } from "../demonScapeTypes";

export interface SceneOneState {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  keys: WASDAndArrowKeys;
  spaceKey: Phaser.Input.Keyboard.Key;
  sword: Phaser.Physics.Arcade.Group;
  magic: Phaser.Physics.Arcade.Group;
  cultHead: Phaser.Physics.Arcade.Sprite;
  alchTwin: Phaser.Physics.Arcade.Sprite;
  alchTwin2: Phaser.Physics.Arcade.Sprite;
  npcs: Phaser.Physics.Arcade.Group;
  boxNpc: Phaser.Physics.Arcade.Sprite;
  sara: Phaser.Physics.Arcade.Sprite;
  ghost: Phaser.GameObjects.Sprite;
  skel: Phaser.Physics.Arcade.Sprite;
  zom1: Phaser.Physics.Arcade.Sprite;
  zom2: Phaser.Physics.Arcade.Sprite;
  zom3: Phaser.Physics.Arcade.Sprite;
  controls: Phaser.GameObjects.Text;
  backgroundMusic: Phaser.Sound.BaseSound;
  void: number;
  isJumping: boolean;
  lastDirection: string;
  zomPatrol1: number;
  zomPatrol2: number;
  zomPatrol3: number;
  ghostBob: number;
  animatedTorches: Phaser.GameObjects.Sprite[];
  animatedAlchemy: Phaser.GameObjects.Sprite[];
  interactionBox?: Phaser.GameObjects.Rectangle;
  interactionKey?: Phaser.GameObjects.Text;
  activeNpc: { name: string; scene: string } | null;
  movementDisabled: boolean;
  ghostFollow: boolean;
  cultHeadSceneNum: number;
  alchSceneNum: number;
}
