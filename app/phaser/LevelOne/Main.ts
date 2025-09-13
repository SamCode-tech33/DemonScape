import Phaser from "phaser";
import playerMovement from "@/app/components/playerMovement";
import {
  depthSetting,
  pathingZombie1,
  pathingZombie2,
  pathingZombie3,
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
  maleCultistAnimation,
  femaleCultistAnimation,
} from "@/app/components/animationSettings";
import {
  cultHeadEvent,
  demonGhost,
  walkBackCultHead,
  fillerNpcs,
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
import {
  Alch2Dialogue,
  girlsLeftWallDialogue,
  guysAlterDialogue,
  hallwayGirlsDialogue,
  singleTriggerDialogue,
  threeMenGroup,
} from "@/app/components/levelOne/floatingDialogue";

interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}
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
  enemyStats = {
    enemyPresence: false,
    health: 20,
    maxHealth: 20,
    magic: 2,
    maxMagic: 2,
  };
  redScreen!: Phaser.GameObjects.Rectangle;
  movementDisabled: boolean = false;
  alchSceneNum: number = 1;
  cultHeadSceneNum: number = 1;
  ghostFollow: boolean = false;
  ghostCompanion!: Phaser.Physics.Arcade.Sprite;
  saraOneSceneNum: number = 1;
  chatBubbleAlch2!: Phaser.GameObjects.Rectangle | undefined;
  chatTextAlch2!: Phaser.GameObjects.Text | undefined;
  approachBox!: Phaser.GameObjects.Rectangle | undefined;
  approachText!: Phaser.GameObjects.Text | undefined;
  zomNum: number = 0;
  zomDeathCount: number = 0;

  constructor() {
    super({ key: "SceneOne" });
  }

  preload() {
    preLoadedAssets(this);
  }
  create() {
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.movementDisabled = true;
        this.player.setVelocity(0, 0);
        this.player.anims.stop();
        if (this.lastDirection === "up") {
          this.player.anims.play("halfslash-up", true);
        } else if (this.lastDirection === "left") {
          this.player.anims.play("halfslash-left", true);
        } else if (this.lastDirection === "down") {
          this.player.anims.play("halfslash-down", true);
        } else if (this.lastDirection === "right") {
          this.player.anims.play("halfslash-right", true);
        }
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.movementDisabled = false;
        });
      }
    });

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
    demonCultMembers(this);

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
    maleCultistAnimation(this);
    femaleCultistAnimation(this);
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
    Alch2Dialogue(this);

    this.events.on("resume", (sys: Phaser.Scenes.Systems, data: any) => {
      if (data?.from === "AlchTwins") {
        if (this.alchSceneNum === 1) {
          this.alchSceneNum++;
          this.movementDisabled = true;
          ghostNpc(this, this.player.x, this.player.y);
          demonGhost(this);

          this.playerStats.health = Math.max(0, this.playerStats.health - 15);
          this.alchEvent = true;
          this.player.anims.stop();
          this.player.anims.play("pass-out", true);

          this.scene.launch("HudScene", {
            player: this.playerStats,
            enemy: this.enemyStats,
          });

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
          fillerNpcs(this);
          hallwayGirlsDialogue(this);
          guysAlterDialogue(this);
          girlsLeftWallDialogue(this);
          threeMenGroup(this);
        }
      } else if (data?.from === "CultHead" && this.cultHeadSceneNum === 1) {
        walkBackCultHead(this);
        this.cultHeadSceneNum++;
        this.movementDisabled = true;
        this.playerStats.health = Math.max(0, this.playerStats.health - 15);

        this.player.anims.play("pass-out", true);

        this.scene.launch("HudScene", {
          player: this.playerStats,
          enemy: this.enemyStats,
        });

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
      } else if (data?.from === "Ghost") {
        this.tweens.killTweensOf(this.ghost);
        this.ghost.destroy();
        ghostNpc(this, 5000, 5000);
        this.ghostCompanion = this.physics.add
          .sprite(this.player.x, this.player.y, "sgr", 0)
          .setCollideWorldBounds(true);
        this.ghostFollow = true;
      } else if (data?.from === "ZombieCombat") {
        this.enemyStats.enemyPresence = false;
        this.playerStats.health = data.playerStats.health ?? 50;
        this.playerStats.maxHealth = data.playerStats.maxHealth ?? 50;
        this.playerStats.magic = data.playerStats.magic ?? 20;
        this.playerStats.maxMagic = data.playerStats.maxMagic ?? 20;
        if (this.zomNum === 1) {
          this.tweens.killTweensOf(this.zom1);
          this.zomDeathCount += 1;
          this.zom1.anims.play("z-pass-out");
          this.zom1.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.zom1.destroy();
            if (this.zomDeathCount === 3) {
              this.saraOneSceneNum += 1;
              this.backgroundMusic.pause();
              this.scene.pause("SceneOne");
              this.scene.launch("SaraOne", {
                saraOneSceneNum: this.saraOneSceneNum,
                playerStats: this.playerStats,
              });
            }
          });
        } else if (this.zomNum === 2) {
          this.tweens.killTweensOf(this.zom2);
          this.zomDeathCount += 1;
          this.zom2.anims.play("z-pass-out");
          this.zom2.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.zom2.destroy();
            if (this.zomDeathCount === 3) {
              this.saraOneSceneNum += 1;
              this.backgroundMusic.pause();
              this.scene.pause("SceneOne");
              this.scene.launch("SaraOne", {
                saraOneSceneNum: this.saraOneSceneNum,
                playerStats: this.playerStats,
              });
            }
          });
        } else if (this.zomNum === 3) {
          this.tweens.killTweensOf(this.zom3);
          this.zomDeathCount += 1;
          this.zom3.anims.play("z-pass-out");
          this.zom3.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.zom3.destroy();
            if (this.zomDeathCount === 3) {
              this.saraOneSceneNum += 1;
              this.backgroundMusic.pause();
              this.scene.pause("SceneOne");
              this.scene.launch("SaraOne", {
                saraOneSceneNum: this.saraOneSceneNum,
                playerStats: this.playerStats,
              });
            }
          });
        }
      } else if (data?.from === "ZombieCombat-loss") {
        this.player.anims.stop();
        this.player.anims.play("pass-out");
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.time.delayedCall(100, () => {
            this.backgroundMusic.stop();
            this.scene.launch("HudScene", {
              player: this.playerStats,
              enemy: {
                enemyPresence: false,
                health: 0,
                maxHealth: 0,
                magic: 0,
                maxMagic: 0,
              },
            });
            this.scene.restart();
          });
        });
      } else if (data?.from === "ZombieCombat-boss") {
        this.saraOneSceneNum += 1;
      }
      if (this.backgroundMusic.isPaused) {
        this.backgroundMusic.resume();
      } else if (!this.backgroundMusic.isPlaying) {
        this.backgroundMusic.play();
      }
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown() && this.saraOneSceneNum === 2) {
        const dist = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.zom1.x,
          this.zom1.y
        );

        if (dist < 32) {
          this.enemyStats.enemyPresence = true;
          // adjust threshold for "near"
          this.time.delayedCall(600, () => {
            this.zomNum = 1;
            this.scene.pause("SceneOne");
            this.backgroundMusic.stop();
            this.scene.launch("ZombieCombat", {
              playerStats: this.playerStats,
              enemy: this.enemyStats,
            });
          });
        }
      }
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown() && this.saraOneSceneNum === 2) {
        const dist = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.zom2.x,
          this.zom2.y
        );

        if (dist < 32) {
          this.enemyStats.enemyPresence = true;
          // adjust threshold for "near"
          this.time.delayedCall(600, () => {
            this.zomNum = 2;
            this.scene.pause("SceneOne");
            this.backgroundMusic.stop();
            this.scene.launch("ZombieCombat", {
              playerStats: this.playerStats,
              enemy: this.enemyStats,
            });
          });
        }
      }
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown() && this.saraOneSceneNum === 2) {
        const dist = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.zom3.x,
          this.zom3.y
        );

        if (dist < 32) {
          this.enemyStats.enemyPresence = true;
          // adjust threshold for "near"
          this.time.delayedCall(300, () => {
            this.zomNum = 3;
            this.scene.pause("SceneOne");
            this.backgroundMusic.stop();
            this.scene.launch("ZombieCombat", {
              playerStats: this.playerStats,
              enemy: this.enemyStats,
            });
          });
        }
      }
    });

    // HUD UPDATES
    this.scene.launch("HudScene", {
      player: this.playerStats,
      enemy: {
        enemyPresence: false,
        health: 0,
        maxHealth: 0,
        magic: 0,
        maxMagic: 0,
      },
    });

    // CAMERA
    this.physics.world.setBounds(0, 0, 2555, 1280);
    this.cameras.main.setZoom(2.5);
    this.cameras.main.startFollow(this.player);
    // PATROLS
    pathingAlch1(this);
    pathingSkel(this);
    pathingZombie1(this);
    pathingZombie2(this);
    pathingZombie3(this);
  }

  update(time: number, delta: number) {
    // INTERACTION LOGIC
    interactionLogic(this);
    if (this.alchEvent) {
      singleTriggerDialogue(this);
    }

    // MOVEMENT AND NPC LOGIC
    playerMovement(this);
    depthSetting(this);
    pathingAlch2(this);

    if (this.ghostFollow && this.ghost) {
      // pick an offset based on the player's lastDirection
      let offsetX = 0;
      let offsetY = 0;

      switch (this.lastDirection) {
        case "up":
          offsetY = 56;
          break;
        case "down":
          offsetY = -56;
          break;
        case "left":
          offsetX = 56;
          break;
        case "right":
          offsetX = -56;
          break;
      }

      const targetX = this.player.x + offsetX;
      const targetY = this.player.y + offsetY;

      // smooth follow with delta scaling
      const speed = 0.05 * (delta / 16.67); // ~5% per frame at 60fps
      this.ghostCompanion.x = Phaser.Math.Linear(
        this.ghostCompanion.x,
        targetX,
        speed
      );
      this.ghostCompanion.y = Phaser.Math.Linear(
        this.ghostCompanion.y,
        targetY,
        speed
      );
    }
  }
}
