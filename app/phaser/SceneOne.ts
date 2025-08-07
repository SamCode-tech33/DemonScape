import Phaser from "phaser";
export default class SceneOne extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  spaceKey!: Phaser.Input.Keyboard.Key;
  sword!: Phaser.Physics.Arcade.Group;
  magic!: Phaser.Physics.Arcade.Group;
  npc!: Phaser.Physics.Arcade.Sprite;
  enemy!: Phaser.Physics.Arcade.Sprite;
  controls!: Phaser.GameObjects.Text;
  backgroundMusic!: Phaser.Sound.BaseSound;
  void!: number;
  isJumping = false;

  constructor() {
    super({ key: "SceneOne" });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/level-1-dungeon.json");
    this.load.audio("bgm-1", "assets/music/in-the-end.mp3");

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
    this.load.spritesheet("slash", "assets/player/slash.png", {
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

    // ZOMBIES
    this.load.spritesheet("zHalfSlash", "assets/zombie/halfslash.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zIdle", "assets/zombie/idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zWalk", "assets/zombie/walk.png", {
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
    surfaceItemsLayer && surfaceItemsLayer.setDepth(8);
    fireLayer && fireLayer.setDepth(9);

    // PLAYER
    this.player = this.physics.add
      .sprite(320, 575, "idle", 4)
      .setDepth(7)
      .setCollideWorldBounds(true);

    // MUSIC

    this.backgroundMusic = this.sound.add("bgm-1", {
      loop: true,
      volume: 0.7,
    });
    this.backgroundMusic.play();

    // NPCS
    this.npc = this.physics.add
      .sprite(128, 720, "sgr", 0)
      .setDepth(7)
      .setCollideWorldBounds(true);

    // KEY SETTINGS
    this.cursors = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    }) as Phaser.Types.Input.Keyboard.CursorKeys;

    // ZOMBIES
    this.enemy = this.physics.add
      .sprite(128, 956, "zIdle", 7)
      .setDepth(7)
      .setCollideWorldBounds(true);

    this.enemy = this.physics.add
      .sprite(128, 1040, "zIdle", 7)
      .setDepth(7)
      .setCollideWorldBounds(true);

    this.enemy = this.physics.add
      .sprite(128, 876, "zIdle", 7)
      .setDepth(7)
      .setCollideWorldBounds(true);

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

    // Camera follows player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(3.3);
  }
  update() {
    const walkSpeed = 150;
    const jumpSpeed = 200;
    const runSpeed = 250;

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

    if (Phaser.Input.Keyboard.JustDown(spaceKey) && !this.isJumping) {
      this.isJumping = true;
      let jumpAnim = "jump";
      let jumpDirection = () => this.player.setVelocity(0);
      if (this.cursors.up?.isDown) {
        jumpAnim = "jump-up";
        jumpDirection = () => this.player.setVelocityY(-jumpSpeed);
      } else if (this.cursors.left?.isDown) {
        jumpAnim = "jump-left";
        jumpDirection = () => this.player.setVelocityX(-jumpSpeed);
      } else if (this.cursors.right?.isDown) {
        jumpAnim = "jump-right";
        jumpDirection = () => this.player.setVelocityX(jumpSpeed);
      } else if (this.cursors.down?.isDown) {
        jumpAnim = "jump-down";
        jumpDirection = () => this.player.setVelocityY(jumpSpeed);
      }
      this.player.anims.play(jumpAnim, true);
      jumpDirection();
      this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isJumping = false;
        this.player.setVelocity(0);
      });
      return;
    }

    if (!this.isJumping) {
      this.player.setVelocity(0);
      if (isRunning) {
        if (this.cursors.up?.isDown) {
          this.player.setVelocityY(-runSpeed);
          this.player.anims.play("run-up", true);
        } else if (this.cursors.left?.isDown) {
          this.player.setVelocityX(-runSpeed);
          this.player.anims.play("run-left", true);
        } else if (this.cursors.down?.isDown) {
          this.player.setVelocityY(runSpeed);
          this.player.anims.play("run-down", true);
        } else if (this.cursors.right?.isDown) {
          this.player.setVelocityX(runSpeed);
          this.player.anims.play("run-right", true);
        } else {
          this.player.anims.stop();
        }
      } else {
        if (this.cursors.up?.isDown) {
          this.player.setVelocityY(-walkSpeed);
          this.player.anims.play("walk-up", true);
        } else if (this.cursors.left?.isDown) {
          this.player.setVelocityX(-walkSpeed);
          this.player.anims.play("walk-left", true);
        } else if (this.cursors.down?.isDown) {
          this.player.setVelocityY(walkSpeed);
          this.player.anims.play("walk-down", true);
        } else if (this.cursors.right?.isDown) {
          this.player.setVelocityX(walkSpeed);
          this.player.anims.play("walk-right", true);
        } else {
          this.player.anims.stop();
        }
      }
    }
  }
}
