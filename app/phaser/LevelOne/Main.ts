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
  alchTwinsAnimation,
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
import type {
  WASDAndArrowKeys,
  PlayerStats,
  EnemyStats,
  SaveState,
} from "@/app/components/demonScapeTypes";
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
import type { SceneOneState } from "@/app/components/levelOne/SceneOneTypes";
import { saveGame } from "@/app/phaser/saveGame";
export default class Main extends Phaser.Scene implements SceneOneState {
  public player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public keys!: WASDAndArrowKeys;
  public spaceKey!: Phaser.Input.Keyboard.Key;
  public cultHead!: Phaser.Physics.Arcade.Sprite;
  public alchTwin!: Phaser.Physics.Arcade.Sprite;
  public alchTwin2!: Phaser.Physics.Arcade.Sprite;
  public npcs!: Phaser.Physics.Arcade.Group;
  public boxNpc!: Phaser.Physics.Arcade.Sprite;
  public sara!: Phaser.Physics.Arcade.Sprite;
  public ghost!: Phaser.GameObjects.Sprite;
  public skel!: Phaser.Physics.Arcade.Sprite;
  public zom1!: Phaser.Physics.Arcade.Sprite;
  public zom2!: Phaser.Physics.Arcade.Sprite;
  public zom3!: Phaser.Physics.Arcade.Sprite;
  public controls!: Phaser.GameObjects.Text;
  public backgroundMusic!: Phaser.Sound.BaseSound;
  public void!: number;
  public isJumping = false;
  public animatedTorches: Phaser.GameObjects.Sprite[] = [];
  public animatedAlchemy: Phaser.GameObjects.Sprite[] = [];
  public interactionBox!: Phaser.GameObjects.Graphics | undefined;
  public interactionKey!: Phaser.GameObjects.Text | undefined;
  public noInteraction!: Phaser.GameObjects.Text | undefined;
  public activeNpc: { name: string; scene: string } | null = null;
  public redScreen!: Phaser.GameObjects.Rectangle;
  public ghostCompanion!: Phaser.Physics.Arcade.Sprite;
  public chatBubbleAlch2!: Phaser.GameObjects.Graphics | undefined;
  public chatTextAlch2!: Phaser.GameObjects.Text | undefined;
  public approachBox!: Phaser.GameObjects.Graphics | undefined;
  public approachText!: Phaser.GameObjects.Text | undefined;
  public alchEvent: boolean = false;
  public playerStats!: PlayerStats;
  public enemyStats!: EnemyStats;
  public zomNum: number = 0;
  public zomDeathCount: number = 0;
  public alchSceneNum: number = 1;
  public saraOneSceneNum: number = 1;
  public cultHeadSceneNum: number = 1;
  public ghostFollow: boolean = false;
  public lastDirection: string = "down";
  public movementDisabled: boolean = false;
  private pendingSave?: SaveState;
  private isLoadingSave?: boolean = true;

  constructor() {
    super({ key: "SceneOne" });
  }

  getSaveState(): SaveState {
    return {
      userId: this.registry.get("userId"),

      scene: {
        alchSceneNum: this.alchSceneNum,
        saraOneSceneNum: this.saraOneSceneNum,
        cultHeadSceneNum: this.cultHeadSceneNum,
      },

      player: {
        x: this.player.x,
        y: this.player.y,
        lastDirection: this.lastDirection,
        stats: this.playerStats,
        ghostFollow: this.ghostFollow,
      },

      combat: {
        zomDeathCount: this.zomDeathCount,
        zomNum: this.zomNum,
      },

      flags: {
        alchEvent: this.alchEvent,
        movementDisabled: this.movementDisabled,
      },

      meta: {
        updatedAt: new Date(),
      },
    };
  }

  applySaveState(save: SaveState) {
    this.alchSceneNum = save.scene.alchSceneNum;
    this.saraOneSceneNum = save.scene.saraOneSceneNum;
    this.cultHeadSceneNum = save.scene.cultHeadSceneNum;

    this.player.setPosition(save.player.x, save.player.y);
    this.lastDirection = save.player.lastDirection;
    this.playerStats = save.player.stats;
    this.ghostFollow = save.player.ghostFollow;

    this.zomDeathCount = save.combat.zomDeathCount;
    this.zomNum = save.combat.zomNum;

    this.alchEvent = save.flags.alchEvent;
    this.movementDisabled = false;
  }

  init(data: { save?: SaveState }) {
    this.pendingSave = data.save;
    this.isLoadingSave = !!data.save;
    console.log("[INIT] incoming save:", data.save);

    //defaults on newgame
    this.alchEvent = false;
    this.playerStats = {
      health: 50,
      maxHealth: 50,
      magic: 20,
      maxMagic: 20,
    };
    this.enemyStats = {
      enemyPresence: false,
      health: 20,
      maxHealth: 20,
      magic: 2,
      maxMagic: 2,
    };
    this.zomNum = 0;
    this.zomDeathCount = 0;
    this.alchSceneNum = 1;
    this.saraOneSceneNum = 1;
    this.cultHeadSceneNum = 1;
    this.ghostFollow = false;
    this.lastDirection = "down";
    this.movementDisabled = false;

    console.log("[INIT] AFTER defaults:", {
      cultHeadSceneNum: this.cultHeadSceneNum,
    });
  }

  preload() {
    preLoadedAssets(this);
  }
  private createWorld() {
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
    alchTwinsAnimation(this);
    skelManAnimation(this);

    //EVENTS

    const flashRedScreen = () =>
      this.add
        .rectangle(
          this.player.x,
          this.player.y,
          window.innerWidth,
          window.innerHeight,
          0xff0000,
          0.3
        )
        .setDepth(50)
        .setOrigin(0.5);
    if (!this.isLoadingSave && this.cultHeadSceneNum === 1) {
      this.movementDisabled = true;
      this.time.delayedCall(700, () => {
        cultHeadEvent(this);
      });
    }

    Alch2Dialogue(this);

    this.events.off("resume"); // listeners stack through reset so always turn off resume before setting it.
    // biome-ignore lint/suspicious/noExplicitAny: <explanation> to be properly typed on game completion. too many emerging factors
    this.events.on("resume", (_sys: Phaser.Scenes.Systems, data: any) => {
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
      } else if (data?.from === "CultHead") {
        if (this.cultHeadSceneNum === 1) {
          walkBackCultHead(this);
          this.cultHeadSceneNum++;
          this.movementDisabled = true;
          this.playerStats.health = Math.max(0, this.playerStats.health - 15);

          this.player.anims.play("pass-out", true);

          saveGame();

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
              }
            );
          });
        } else if (this.cultHeadSceneNum === 4) {
          (this.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(
            (npc, i) => {
              if (i === 12) {
                this.tweens.add({
                  targets: npc,
                  x: 722,
                  y: 115,
                  duration: 1000,
                  onStart: () => {
                    npc.anims.play("cultist-male-walk-right", true);
                  },
                  onComplete: () => {
                    npc.anims.stop();
                    npc.setFrame(9);
                  },
                });
              }
            }
          );
        }
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

        // Map zomNum to corresponding sprite
        const zomMap: Record<number, Phaser.Physics.Arcade.Sprite> = {
          1: this.zom1,
          2: this.zom2,
          3: this.zom3,
        };

        const zom = zomMap[this.zomNum];
        if (zom) {
          this.tweens.killTweensOf(zom);
          this.zomDeathCount += 1;
          zom.anims.play("z-pass-out");

          zom.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.time.delayedCall(500, () => zom.destroy());
            this.time.delayedCall(520, () => zom.setPosition(-9999, -9999));

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
      } else if (data?.from === "PlayerDeath") {
        this.player.anims.stop();
        this.movementDisabled = true;
        this.player.anims.play("pass-out");
        for (let i = 0; i < 5; i++) {
          this.time.delayedCall(50 * i * 2, () => {
            this.redScreen = flashRedScreen();
            this.time.delayedCall(50, () => {
              this.redScreen.destroy();
            });
          });
        }
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.time.delayedCall(500, () => {
            this.backgroundMusic.stop();
            this.scene.stop("SceneOne");
            this.scene.stop("HudScene");
            this.scene.launch("GameOver");
          });
        });
      } else if (data?.from === "ZombieCombat-boss") {
        const zomBoss = this.add
          .sprite(this.player.x, this.player.y - 50, "zWalk", 18)
          .setScale(2)
          .clearTint()
          .setTint(0xff0000);
        if (this.player.y < zomBoss.y) {
          zomBoss.setDepth(12);
        } else {
          zomBoss.setDepth(7);
        }
        this.saraOneSceneNum++;
        this.cultHeadSceneNum = 4;
        zomBoss.anims.play("z-pass-out");
        zomBoss.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.time.delayedCall(500, () => zomBoss.destroy());
        });
      }
      if (this.backgroundMusic.isPaused) {
        this.backgroundMusic.resume();
      } else if (!this.backgroundMusic.isPlaying) {
        this.backgroundMusic.play();
      }
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.leftButtonDown() || this.saraOneSceneNum !== 2) return;
      const zombies = [
        { sprite: this.zom1, num: 1 },
        { sprite: this.zom2, num: 2 },
        { sprite: this.zom3, num: 3 },
      ];

      for (const { sprite, num } of zombies) {
        const dist = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          sprite.x,
          sprite.y
        );

        if (dist < 32) {
          this.enemyStats.enemyPresence = true;
          this.time.delayedCall(500, () => {
            this.zomNum = num;
            this.scene.pause("SceneOne");
            this.backgroundMusic.stop();
            this.scene.launch("ZombieCombat", {
              playerStats: this.playerStats,
              enemy: this.enemyStats,
            });
          });
          break;
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
  create() {
    preLoadedAssets(this);

    console.log("[CREATE] pendingSave:", this.pendingSave);

    this.createWorld(); // <-- player is created here

    if (this.pendingSave) {
      this.applySaveState(this.pendingSave);
      this.pendingSave = undefined;
      this.isLoadingSave = false;
    }

    console.log("[CREATE] AFTER apply:", this.cultHeadSceneNum);
  }

  update(delta: number) {
    // INTERACTION LOGIC
    interactionLogic(this);
    if (this.alchEvent && this.cultHeadSceneNum === 4) {
      singleTriggerDialogue(this, true);
    } else {
      singleTriggerDialogue(this, false);
    }

    // MOVEMENT AND NPC LOGIC
    playerMovement(this);
    depthSetting(this);
    pathingAlch2(this); //index

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
