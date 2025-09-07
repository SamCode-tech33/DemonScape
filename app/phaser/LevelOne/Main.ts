import Phaser from "phaser";
import playerMovement from "@/app/components/playerMovement";
import {
  depthSetting,
  pathingZombies,
  pathingAlch2,
  pathingAlch1,
  pathingSkel,
} from "@/app/components/npcLogic";
import interactionLogic from "@/app/components/interactionLogic";
import {
  playerAnimation,
  zombieAnimation,
  torchAnimation,
  cultHeadAnimation,
  alch2Animation,
  alchTorchAnimation,
  skelManAnimation,
} from "@/app/components/animationSettings";
import {
  cultHeadEvent,
  demonGhost,
  walkBackCultHead,
} from "@/app/components/levelOne/eventLogic";
import {
  cultHeadNpc,
  saraNpc,
  boxNpc,
  alchTwinsNpc,
  skelNpc,
  ghostNpc,
} from "@/app/components/importantNpcs";
import { demonCultMembers } from "@/app/components/fillerNpcs";
import playerSprite from "@/app/components/player";
import {
  mapLayering,
  collisions,
} from "@/app/components/levelOne/mapLayeringAndCollision";
import preLoadedAssets from "@/app/components/levelOne/preLoadedAssets";
import type { WASDAndArrowKeys } from "@/app/components/demonScapeTypes";
import keySettings from "@/app/components/keySettings";
import { zombies } from "@/app/components/enemyNpcs";

export default class Main extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  keys!: WASDAndArrowKeys;
  spaceKey!: Phaser.Input.Keyboard.Key;
  sword!: Phaser.Physics.Arcade.Group;
  magic!: Phaser.Physics.Arcade.Group;
  cultHead!: Phaser.Physics.Arcade.Sprite;
  alchTwin!: Phaser.Physics.Arcade.Sprite;
  alchTwin2!: Phaser.Physics.Arcade.Sprite;
  npcs!: Phaser.Physics.Arcade.Group;
  boxNpc!: Phaser.Physics.Arcade.Sprite;
  sara!: Phaser.Physics.Arcade.Sprite;
  ghost!: Phaser.GameObjects.Sprite;
  skel!: Phaser.Physics.Arcade.Sprite;
  zom1!: Phaser.Physics.Arcade.Sprite;
  zom2!: Phaser.Physics.Arcade.Sprite;
  zom3!: Phaser.Physics.Arcade.Sprite;
  controls!: Phaser.GameObjects.Text;
  backgroundMusic!: Phaser.Sound.BaseSound;
  void!: number;
  isJumping = false;
  lastDirection: string = "down";
  zomPatrol1!: 0;
  zomPatrol2!: 0;
  zomPatrol3!: 0;
  ghostBob!: 0;
  animatedTorches: Phaser.GameObjects.Sprite[] = [];
  animatedAlchemy: Phaser.GameObjects.Sprite[] = [];
  interactionBox!: Phaser.GameObjects.Rectangle | undefined;
  interactionKey!: Phaser.GameObjects.Text | undefined;
  noInteraction!: Phaser.GameObjects.Text | undefined;
  activeNpc: { name: string; scene: string } | null = null;
  alchEvent: boolean = false;
  playerStats = {
    health: 50,
    maxHealth: 50,
    magic: 20,
    maxMagic: 20,
  };
  redScreen!: Phaser.GameObjects.Rectangle;
  movementDisabled: boolean = false;
  alchSceneNum: number = 1;

  constructor() {
    super({ key: "SceneOne" });
  }

  preload() {
    preLoadedAssets(this);
  }
  create() {
    // MAP
    mapLayering(this);

    // MUSIC
    this.backgroundMusic = this.sound.add("bgm-1", {
      loop: true,
      volume: 1,
    });

    // KEY SETTINGS
    keySettings(this);

    // PLAYER
    playerSprite(this, collisions(this));

    // IMPORTANT NPCS
    cultHeadNpc(this);
    saraNpc(this);
    boxNpc(this);
    alchTwinsNpc(this);
    skelNpc(this);
    ghostNpc(this, 5000, 5000);

    // FILLER NPCS
    const cultMemberPositions = [
      { x: 128, y: 336 },
      { x: 224, y: 336 },
      { x: 416, y: 336 },
      { x: 512, y: 336 },
      { x: 128, y: 400 },
      { x: 224, y: 400 },
      { x: 416, y: 400 },
      { x: 512, y: 400 },
      { x: 128, y: 464 },
      { x: 224, y: 464 },
      { x: 512, y: 464 },
      { x: 208, y: 192 },
      { x: 432, y: 192 },
    ];
    demonCultMembers(this, cultMemberPositions);

    // ENEMIES
    zombies(this);

    //ANIMATIONS
    const torchPositions = [
      { x: 369, y: 462.5 },
      { x: 369, y: 366 },
      { x: 369, y: 270 },
      { x: 272.5, y: 462.5 },
      { x: 272.5, y: 366 },
      { x: 272.5, y: 270 },
      { x: 465, y: 624 },
      { x: 561, y: 624 },
      { x: 817, y: 624 },
      { x: 1009, y: 624 },
      { x: 1105, y: 624 },
      { x: 1265, y: 624 },
      { x: 1521, y: 402 },
      { x: 1137, y: 402 },
      { x: 497, y: 1010 },
      { x: 337, y: 784 },
      { x: 113, y: 624 },
      { x: 240, y: 48 },
      { x: 400, y: 48 },
    ];
    const alchemyPositions = [
      { x: 1552, y: 656 },
      { x: 1616, y: 656 },
    ];
    playerAnimation(this);
    zombieAnimation(this);
    cultHeadAnimation(this);
    torchAnimation(this, torchPositions);
    alchTorchAnimation(this, alchemyPositions);
    alch2Animation(this);
    skelManAnimation(this);

    //EVENTS

    const flashRedScreen = () =>
      this.add
        .rectangle(
          window.innerWidth,
          window.innerHeight,
          window.innerWidth,
          window.innerHeight,
          0xff0000,
          0.4
        )
        .setDepth(50)
        .setOrigin(1);

    this.movementDisabled = true;
    this.time.delayedCall(700, () => {
      cultHeadEvent(this);
    });

    this.events.on("resume", (sys: Phaser.Scenes.Systems, data: any) => {
      if (data?.from === "AlchTwins") {
        if (this.alchSceneNum === 1) {
          this.alchSceneNum++;
          this.movementDisabled = true;
          ghostNpc(this, this.player.x, this.player.y);
          demonGhost(this);

          this.playerStats.health = Math.max(0, this.playerStats.health - 15);
          this.alchEvent = true; // UPDATE DATABASE

          this.player.anims.stop();
          this.player.anims.play("pass-out", true);

          this.game.events.emit("updateHUD", this.playerStats);

          for (let i = 0; i < 5; i++) {
            this.time.delayedCall(50 * i * 2, () => {
              this.redScreen = flashRedScreen();
              this.time.delayedCall(50, () => {
                this.redScreen.destroy();
              });
            });
          }

          const passOutDuration = 2000;
          this.time.delayedCall(passOutDuration, () => {
            this.player.anims.play("get-up", true);
            this.player.once(
              Phaser.Animations.Events.ANIMATION_COMPLETE,
              () => {
                this.movementDisabled = false;
                this.backgroundMusic.stop();
                this.scene.pause("SceneOne");
                this.scene.launch("AlchTwins", {
                  alchSceneNum: this.alchSceneNum,
                });
              }
            );
          });
        } else if (this.alchSceneNum === 2) {
          this.alchSceneNum++;
        }
      } else if (data?.from === "CultHead") {
        walkBackCultHead(this);
        this.movementDisabled = true;
        this.playerStats.health = Math.max(0, this.playerStats.health - 15);

        this.player.anims.play("pass-out", true);

        this.game.events.emit("updateHUD", this.playerStats);

        for (let i = 0; i < 5; i++) {
          this.time.delayedCall(50 * i * 2, () => {
            this.redScreen = flashRedScreen();
            this.time.delayedCall(50, () => {
              this.redScreen.destroy();
            });
          });
        }
        const passOutDuration = 2000;
        this.time.delayedCall(passOutDuration, () => {
          this.player.anims.play("get-up", true);
          this.player.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => (this.movementDisabled = false)
          );
        });
      }
      if (this.backgroundMusic.isPaused) {
        this.backgroundMusic.resume();
      } else if (!this.backgroundMusic.isPlaying) {
        this.backgroundMusic.play();
      }
    });

    this.game.events.emit("updateHUD", this.playerStats);
    this.physics.world.setBounds(0, 0, 2555, 1280);
    this.cameras.main.setZoom(2.5);
    this.cameras.main.startFollow(this.player);
    // PATROLS
    pathingAlch1(this);
    pathingSkel(this);
  }

  update(time: number, delta: number) {
    // INTERACTION LOGIC
    interactionLogic(this);

    // MOVEMENT AND NPC LOGIC
    playerMovement(this);
    depthSetting(this);
    pathingZombies(this, delta);
    pathingAlch2(this);
  }
}
