import Phaser from "phaser";

type WASDAndArrowKeys = {
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
export default class SceneOne extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  keys!: WASDAndArrowKeys;
  spaceKey!: Phaser.Input.Keyboard.Key;
  sword!: Phaser.Physics.Arcade.Group;
  magic!: Phaser.Physics.Arcade.Group;
  npc!: Phaser.Physics.Arcade.Sprite;
  ghost!: Phaser.Physics.Arcade.Sprite;
  zom1!: Phaser.Physics.Arcade.Sprite;
  zom2!: Phaser.Physics.Arcade.Sprite;
  zom3!: Phaser.Physics.Arcade.Sprite;
  controls!: Phaser.GameObjects.Text;
  backgroundMusic!: Phaser.Sound.BaseSound;
  void!: number;
  isJumping = false;
  lastDirection: string = "down";
  step!: 0;
  ghostBob!: 0;

  constructor() {
    super({ key: "SceneOne" });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/level-1-dungeon.json");
    this.load.audio("bgm-1", "assets/music/deskMys.mp3");

    this.load.image(
      "wall-8 - 2 tiles tall-transparency",
      "/assets/wall-transparency.png"
    );
    this.load.image("Dungeon A2_32x32", "/assets/A2_32x32.png");
    this.load.image("Dungeon_A4_32x32", "/assets/B32x32.png");
    this.load.image("A4_32x32_CUSTOM", "/assets/A4_32x32_CUSTOM.png");
    this.load.image("Dungeon_B32x32", "/assets/B32x32.png");
    this.load.image("props", "/assets/TX_Props.png");
    this.load.image("more props", "/assets/Platformer_Asset_All_G.png");
    this.load.image("moreprops2", "/assets/sRandomWorldItems.png");
    this.load.image("alchemy", "/assets/SpriteSheet.png");
    this.load.image("Tileset-Terrain2", "/assets/Tileset-Terrain2.png");

    // PLAYER
    this.load.spritesheet("idle", "assets/player/idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("walk", "/assets/player/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("run", "/assets/player/run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("jump", "/assets/player/jump.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("combat_idle", "assets/player/combat_idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("emote", "assets/player/emote.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("hurt", "assets/player/hurt.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("shoot", "assets/player/shoot.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("sit", "assets/player/sit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("halfslash", "assets/player/halfslash.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("spellcast", "assets/player/spellcast.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // NPCS
    this.load.spritesheet("sgr", "assets/npc/strangeGhostRed.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("dcult-walk", "assets/npc/demon-cultists/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("dcult-sit", "assets/npc/demon-cultists/sit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet(
      "dcult-spell",
      "assets/npc/demon-cultists/spellcast.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet(
      "dcult-emote",
      "assets/npc/demon-cultists/emote.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    // ZOMBIES
    this.load.spritesheet("zHit", "assets/enemies/zombie/slash.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zWalk", "assets/enemies/zombie/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    // MAP

    const map = this.make.tilemap({ key: "map" });

    const tilesets = [
      map.addTilesetImage(
        "wall-8 - 2 tiles tall-transparency",
        "wall-8 - 2 tiles tall-transparency"
      ),
      map.addTilesetImage("Dungeon A2_32x32", "Dungeon A2_32x32"),
      map.addTilesetImage("Dungeon_A4_32x32", "Dungeon_A4_32x32"),
      map.addTilesetImage("A4_32x32_CUSTOM", "A4_32x32_CUSTOM"),
      map.addTilesetImage("Dungeon_B32x32", "Dungeon_B32x32"),
      map.addTilesetImage("props", "props"),
      map.addTilesetImage("more props", "more props"),
      map.addTilesetImage("moreprops2", "moreprops2"),
      map.addTilesetImage("alchemy", "alchemy"),
      map.addTilesetImage("Tileset-Terrain2", "Tileset-Terrain2"),
    ] as Phaser.Tilemaps.Tileset[];

    const floorLayer = map.createLayer("floor", tilesets, 0, 0);
    const rugLayer = map.createLayer("rug", tilesets, 0, 0);
    const wallsLayer = map.createLayer("walls", tilesets, 0, 0);
    const wallThingsLayer = map.createLayer("wall-objects", tilesets, 0, 0);
    const hiddenFloorLayer = map.createLayer(
      "hidden-floor-objects",
      tilesets,
      0,
      0
    );
    const floorObjectsLayer = map.createLayer("floor-objects", tilesets, 0, 0);
    const surfaceItemsLayer = map.createLayer("surface-items", tilesets, 0, 0);
    const fireLayer = map.createLayer("fire", tilesets, 0, 0);

    const collisionLayer = map.getObjectLayer("Collision");
    const colliders = this.physics.add.staticGroup();

    collisionLayer &&
      collisionLayer.objects.forEach((obj) => {
        if (
          obj.width !== undefined &&
          obj.height !== undefined &&
          obj.x !== undefined &&
          obj.y !== undefined
        ) {
          const collider = colliders
            .create(obj.x + obj.width / 2, obj.y - obj.height / 2, "box")
            .setSize(obj.width, obj.height)
            .setVisible(false)
            .refreshBody();
        }
      });

    floorLayer && floorLayer.setDepth(1);
    rugLayer && rugLayer.setDepth(2);
    wallsLayer && wallsLayer.setDepth(3);
    wallThingsLayer && wallThingsLayer.setDepth(4);
    hiddenFloorLayer && hiddenFloorLayer.setDepth(5);
    floorObjectsLayer && floorObjectsLayer.setDepth(6);
    surfaceItemsLayer && surfaceItemsLayer.setDepth(9);
    fireLayer && fireLayer.setDepth(10);

    // PLAYER
    this.player = this.physics.add
      .sprite(416, 475, "idle", 4)
      .setDepth(8)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // MUSIC

    this.backgroundMusic = this.sound.add("bgm-1", {
      loop: true,
      volume: 0.7,
    });
    this.backgroundMusic.play();

    // NPCS //

    // GHOST
    this.ghost = this.physics.add
      .sprite(128, 720, "sgr", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // DEMONS
    this.npc = this.physics.add
      .sprite(128, 336, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(224, 336, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(416, 336, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(512, 336, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(128, 400, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(224, 400, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(416, 400, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(512, 400, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(128, 464, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(224, 464, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(512, 464, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(208, 192, "dcult-sit", 8)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(432, 192, "dcult-sit", 8)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(320, 222, "dcult-walk", 18)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // KEY SETTINGS
    this.keys = this.input.keyboard!.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as WASDAndArrowKeys;

    // ZOMBIES
    this.zom1 = this.physics.add
      .sprite(128, 956, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.zom2 = this.physics.add
      .sprite(128, 1040, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.zom3 = this.physics.add
      .sprite(128, 876, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    //CONTROLS HELP BOX
    this.controls = this.add
      .text(
        this.scale.width - 100,
        20,
        "Movement: WASD / Jump: Space / Run: Hold Shift",
        {
          fontSize: "24px",
          color: "white",
        }
      )
      .setOrigin(0, 0);

    //VOID CLEANSE POINTS
    this.void = 0;

    //COLLISION HANDLING

    // --- ANIMATIONS ---

    // PLAYER
    //WALKING ANIMATION
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 9,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 18,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 27,
        end: 35,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //RUNNING ANIMATION
    this.anims.create({
      key: "run-up",
      frames: this.anims.generateFrameNumbers("run", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run-left",
      frames: this.anims.generateFrameNumbers("run", {
        start: 8,
        end: 15,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "run-down",
      frames: this.anims.generateFrameNumbers("run", {
        start: 16,
        end: 23,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run-right",
      frames: this.anims.generateFrameNumbers("run", {
        start: 24,
        end: 31,
      }),
      frameRate: 12,
      repeat: -1,
    });

    //JUMPING ANIMATION
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 0,
        end: 4,
      }),
      frameRate: 8,
      repeat: 0,
      yoyo: true,
    });
    this.anims.create({
      key: "jump-up",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 0,
        end: 4,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "jump-left",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 5,
        end: 9,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "jump-down",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 10,
        end: 14,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "jump-right",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 15,
        end: 19,
      }),
      frameRate: 8,
      repeat: 0,
    });

    //ATTACK ANIMATION
    this.anims.create({
      key: "halfslash-forward",
      frames: this.anims.generateFrameNumbers("halfslash", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: 0,
      yoyo: true,
    });
    this.anims.create({
      key: "halfslash-left",
      frames: this.anims.generateFrameNumbers("halfslash", {
        start: 7,
        end: 12,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "halfslash-down",
      frames: this.anims.generateFrameNumbers("halfslash", {
        start: 14,
        end: 19,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "halfslash-right",
      frames: this.anims.generateFrameNumbers("halfslash", {
        start: 21,
        end: 26,
      }),
      frameRate: 8,
      repeat: 0,
    });

    // BACK TO IDLE ANIMATION
    this.anims.create({
      key: "idle-up",
      frames: [{ key: "idle", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-left",
      frames: [{ key: "idle", frame: 2 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-right",
      frames: [{ key: "idle", frame: 6 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-down",
      frames: [{ key: "idle", frame: 4 }],
      frameRate: 1,
      repeat: -1,
    });

    // ZOMBIE
    this.anims.create({
      key: "z-walk-up",
      frames: this.anims.generateFrameNumbers("zWalk", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "z-walk-left",
      frames: this.anims.generateFrameNumbers("zWalk", {
        start: 9,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "z-walk-down",
      frames: this.anims.generateFrameNumbers("zWalk", {
        start: 18,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "z-walk-right",
      frames: this.anims.generateFrameNumbers("zWalk", {
        start: 27,
        end: 35,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Camera follows player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(3.3);
  }
  update() {
    const walkSpeed = 150;
    const jumpSpeed = 200;
    const runSpeed = 250;
    const zombieSpeed = 50;
    const floatSpeed = 5;

    const isRunning = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    ).isDown;

    const spaceKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //CONTROLS HELP BOX
    this.controls
      .setText("Movement: WASD / Jump: Space / Run: Hold Shift")
      .setOrigin(0, 0);

    const moving =
      this.keys.left.isDown ||
      this.keys.right.isDown ||
      this.keys.up.isDown ||
      this.keys.down.isDown ||
      this.keys.w.isDown ||
      this.keys.a.isDown ||
      this.keys.s.isDown ||
      this.keys.d.isDown;

    if (Phaser.Input.Keyboard.JustDown(spaceKey) && !this.isJumping) {
      this.isJumping = true;
      let jumpAnim = "jump";
      let jumpDirection = () => this.player.setVelocity(0);
      if (this.keys.up?.isDown || this.keys.w?.isDown) {
        jumpAnim = "jump-up";
        jumpDirection = () => this.player.setVelocityY(-jumpSpeed);
        this.lastDirection = "up";
      } else if (this.keys.left?.isDown || this.keys.a?.isDown) {
        jumpAnim = "jump-left";
        jumpDirection = () => this.player.setVelocityX(-jumpSpeed);
        this.lastDirection = "left";
      } else if (this.keys.right?.isDown || this.keys.d?.isDown) {
        jumpAnim = "jump-right";
        jumpDirection = () => this.player.setVelocityX(jumpSpeed);
        this.lastDirection = "right";
      } else if (this.keys.down?.isDown || this.keys.s?.isDown) {
        jumpAnim = "jump-down";
        jumpDirection = () => this.player.setVelocityY(jumpSpeed);
        this.lastDirection = "down";
      }
      this.player.anims.play(jumpAnim, true);
      jumpDirection();

      this.time.delayedCall(700, () => {
        this.isJumping = false;
        this.player.setVelocity(0);
      });
      return;
    }

    if (moving && !this.isJumping) {
      this.player.setVelocity(0);
      if (isRunning) {
        if (this.keys.up?.isDown || this.keys.w?.isDown) {
          this.player.setVelocityY(-runSpeed);
          this.player.anims.play("run-up", true);
          this.lastDirection = "up";
        } else if (this.keys.left?.isDown || this.keys.a?.isDown) {
          this.player.setVelocityX(-runSpeed);
          this.player.anims.play("run-left", true);
          this.lastDirection = "left";
        } else if (this.keys.down?.isDown || this.keys.s?.isDown) {
          this.player.setVelocityY(runSpeed);
          this.player.anims.play("run-down", true);
          this.lastDirection = "down";
        } else if (this.keys.right?.isDown || this.keys.d?.isDown) {
          this.player.setVelocityX(runSpeed);
          this.player.anims.play("run-right", true);
          this.lastDirection = "right";
        } else {
          this.player.anims.stop();
        }
      } else {
        if (this.keys.up?.isDown || this.keys.w?.isDown) {
          this.player.setVelocityY(-walkSpeed);
          this.player.anims.play("walk-up", true);
          this.lastDirection = "up";
        } else if (this.keys.left?.isDown || this.keys.a?.isDown) {
          this.player.setVelocityX(-walkSpeed);
          this.player.anims.play("walk-left", true);
          this.lastDirection = "left";
        } else if (this.keys.down?.isDown || this.keys.s?.isDown) {
          this.player.setVelocityY(walkSpeed);
          this.player.anims.play("walk-down", true);
          this.lastDirection = "down";
        } else if (this.keys.right?.isDown || this.keys.d?.isDown) {
          this.player.setVelocityX(walkSpeed);
          this.player.anims.play("walk-right", true);
          this.lastDirection = "right";
        } else {
          this.player.anims.stop();
        }
      }
    } else if (!this.isJumping) {
      this.player.setVelocity(0);
      if (this.lastDirection === "up") {
        this.player.anims.play("idle-up", true);
      } else if (this.lastDirection === "left") {
        this.player.anims.play("idle-left", true);
      } else if (this.lastDirection === "right") {
        this.player.anims.play("idle-right", true);
      } else {
        this.player.anims.play("idle-down", true);
      }
    }

    // ZOMBIE ANIMATION AND PATROLLING

    if (this.step <= 150) {
      this.zom1.setVelocity(zombieSpeed, 0);
      this.zom1.anims.play("z-walk-right", true);
      this.step++;
    } else if (this.step <= 220) {
      this.zom1.setVelocity(0, zombieSpeed);
      this.zom1.anims.play("z-walk-down", true);
      this.step++;
    } else if (this.step <= 370) {
      this.zom1.setVelocity(-zombieSpeed, 0);
      this.zom1.anims.play("z-walk-left", true);
      this.step++;
    } else if (this.step <= 440) {
      this.zom1.setVelocity(0, -zombieSpeed);
      this.zom1.anims.play("z-walk-up", true);
      this.step++;
    } else {
      this.step = 0;
    }
    if (this.step <= 150) {
      this.zom2.setVelocity(zombieSpeed, 0);
      this.zom2.anims.play("z-walk-right", true);
    } else if (this.step <= 220) {
      this.zom2.setVelocity(0, -zombieSpeed);
      this.zom2.anims.play("z-walk-up", true);
    } else if (this.step <= 370) {
      this.zom2.setVelocity(-zombieSpeed, 0);
      this.zom2.anims.play("z-walk-left", true);
    } else if (this.step <= 440) {
      this.zom2.setVelocity(0, zombieSpeed);
      this.zom2.anims.play("z-walk-down", true);
    } else {
      this.step = 0;
    }
    if (this.step <= 100) {
      this.zom3.setVelocity(zombieSpeed, 0);
      this.zom3.anims.play("z-walk-right", true);
    } else if (this.step <= 220) {
      this.zom3.setVelocity(0, zombieSpeed);
      this.zom3.anims.play("z-walk-down", true);
    } else if (this.step <= 320) {
      this.zom3.setVelocity(-zombieSpeed, 0);
      this.zom3.anims.play("z-walk-left", true);
    } else if (this.step <= 440) {
      this.zom3.setVelocity(0, -zombieSpeed);
      this.zom3.anims.play("z-walk-up", true);
    }

    // GHOST BOBBING

    if (this.ghostBob <= 75) {
      this.ghost.setVelocityY(-floatSpeed);
      this.ghostBob++;
    } else if (this.ghostBob <= 150) {
      this.ghost.setVelocityY(floatSpeed);
      this.ghostBob++;
    } else {
      this.ghostBob = 0;
    }
  }
}
