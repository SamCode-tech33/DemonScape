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
  zomPatrol1!: 0;
  zomPatrol2!: 0;
  zomPatrol3!: 0;
  ghostBob!: 0;

  constructor() {
    super({ key: "SceneOne" });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/level1-master-map.json");
    this.load.image(
      "level1-master-tileset",
      "/assets/level1-master-tileset.png"
    );
    this.load.audio("bgm-1", "assets/music/deskMys.mp3");

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

    // GHOST
    this.load.spritesheet(
      "sgr",
      "assets/npc/strangeGhost/strangeGhostRed.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    // DEMONS
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

    this.load.spritesheet("w-dcult-walk", "assets/npc/femDemon/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("w-dcult-sit", "assets/npc/femDemon/sit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet(
      "w-dcult-spell",
      "assets/npc/femDemon/spellcast.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet("w-dcult-emote", "assets/npc/femDemon/emote.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // SARA
    this.load.spritesheet("sara-walk", "assets/npc/sara/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("sara-sit", "assets/npc/sara/sit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // INFOGUY
    this.load.spritesheet("infoGuy-sit", "assets/npc/infoGuy/sit.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // ZOMBIES
    this.load.spritesheet("zHit", "assets/enemies/zombie/slash.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zWalk", "assets/enemies/zombie/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // SKELETON
    this.load.spritesheet("skel-walk", "assets/npc/skelMan/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // ALCHEMISTS
    this.load.spritesheet("alch-walk", "assets/npc/alchemists/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    // MAP
    const map = this.make.tilemap({ key: "map" });
    const tiledMap = map.addTilesetImage(
      "level1-master-tileset",
      "level1-master-tileset"
    )!;

    const collisionLayer = map.getObjectLayer("collision");
    if (!collisionLayer) {
      console.warn("No collision object layer found in map!");
      return;
    }

    const collisionGroup = this.physics.add.staticGroup();
    collisionLayer.objects.forEach((obj) => {
      if (obj.rectangle) {
        const collisionRect = this.add.rectangle(
          obj.x! + obj.width! / 2,
          obj.y! + obj.height! / 2,
          obj.width!,
          obj.height!
        );
        this.physics.add.existing(collisionRect, true);
        collisionRect.setVisible(false);
        collisionGroup.add(collisionRect);
      }
    });

    const floorLayer = map.createLayer("floor", tiledMap, 0, 0);
    const rugLayer = map.createLayer("rug", tiledMap, 0, 0);
    const wallsLayer = map.createLayer("walls", tiledMap, 0, 0);
    const wallThingsLayer = map.createLayer("wall-objects", tiledMap, 0, 0);
    const hiddenFloorLayer = map.createLayer(
      "hidden-floor-objects",
      tiledMap,
      0,
      0
    );
    const floorObjectsLayer = map.createLayer("floor-objects", tiledMap, 0, 0);
    const largeFloorObjects = map.createLayer("floor-objects2", tiledMap, 0, 0);
    const surfaceItemsLayer = map.createLayer("surface-items", tiledMap, 0, 0);
    const fireLayer = map.createLayer("fire", tiledMap, 0, 0);

    floorLayer && floorLayer.setDepth(1);
    rugLayer && rugLayer.setDepth(2);
    wallsLayer && wallsLayer.setDepth(3);
    wallThingsLayer && wallThingsLayer.setDepth(4);
    hiddenFloorLayer && hiddenFloorLayer.setDepth(5);
    floorObjectsLayer && floorObjectsLayer.setDepth(6);
    largeFloorObjects && largeFloorObjects.setDepth(8);
    surfaceItemsLayer && surfaceItemsLayer.setDepth(9);
    fireLayer && fireLayer.setDepth(10);

    // PLAYER
    this.player = this.physics.add
      .sprite(416, 475, "idle", 4)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.physics.add.collider(this.player, collisionGroup);
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.3);
    this.player.body.setOffset(
      this.player.width * 0.3,
      this.player.height * 0.7
    );

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
      .sprite(128, 336, "w-dcult-sit", 0)
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
      .sprite(512, 336, "w-dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(128, 400, "dcult-sit", 0)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(224, 400, "w-dcult-sit", 0)
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
      .sprite(512, 464, "w-dcult-sit", 0)
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

    // SARA
    this.npc = this.physics.add
      .sprite(208, 824, "sara-sit", 6)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // INFOGUY
    this.npc = this.physics.add
      .sprite(1364, 532, "infoGuy-sit", 11)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // ALCHEMISTS
    this.npc = this.physics.add
      .sprite(1684, 532, "alch-walk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.npc = this.physics.add
      .sprite(1580, 622, "alch-walk", 18)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    // SKELMAN
    this.npc = this.physics.add
      .sprite(1088, 432, "skel-walk", 18)
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
      .sprite(128, 862, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.zom2 = this.physics.add
      .sprite(128, 988, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.zom3 = this.physics.add
      .sprite(150, 1040, "zWalk", 27)
      .setDepth(7)
      .setCollideWorldBounds(true)
      .setBounce(1);

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
      frames: [{ key: "walk", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-left",
      frames: [{ key: "walk", frame: 9 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-right",
      frames: [{ key: "walk", frame: 27 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-down",
      frames: [{ key: "walk", frame: 18 }],
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
  update(time: number, delta: number) {
    const walkSpeed = 150;
    const jumpSpeed = 200;
    const runSpeed = 250;
    const floatSpeed = 5;

    const isRunning = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    ).isDown;

    const spaceKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

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
      if (
        (this.keys.right?.isDown && this.keys.up?.isDown) ||
        (this.keys.d?.isDown && this.keys.w?.isDown)
      ) {
        jumpAnim = "jump-right";
        jumpDirection = () =>
          this.player.setVelocity(jumpSpeed / 1.5, -jumpSpeed / 1.5);
        this.lastDirection = "right";
      } else if (
        (this.keys.left?.isDown && this.keys.up?.isDown) ||
        (this.keys.a?.isDown && this.keys.w?.isDown)
      ) {
        jumpAnim = "jump-left";
        jumpDirection = () =>
          this.player.setVelocity(-jumpSpeed / 1.5, -jumpSpeed / 1.5);
        this.lastDirection = "right";
      } else if (
        (this.keys.right?.isDown && this.keys.down?.isDown) ||
        (this.keys.d?.isDown && this.keys.s?.isDown)
      ) {
        jumpAnim = "jump-right";
        jumpDirection = () =>
          this.player.setVelocity(jumpSpeed / 1.5, jumpSpeed / 1.5);
        this.lastDirection = "right";
      } else if (
        (this.keys.left?.isDown && this.keys.down?.isDown) ||
        (this.keys.a?.isDown && this.keys.s?.isDown)
      ) {
        jumpAnim = "jump-left";
        jumpDirection = () =>
          this.player.setVelocity(-jumpSpeed / 1.5, jumpSpeed / 1.5);
        this.lastDirection = "right";
      } else if (this.keys.up?.isDown || this.keys.w?.isDown) {
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
        if (
          (this.keys.right?.isDown && this.keys.up?.isDown) ||
          (this.keys.d?.isDown && this.keys.w?.isDown)
        ) {
          this.player.setVelocity(runSpeed / 1.5, -runSpeed / 1.5);
          this.player.anims.play("run-right", true);
          this.lastDirection = "right";
        } else if (
          (this.keys.left?.isDown && this.keys.up?.isDown) ||
          (this.keys.a?.isDown && this.keys.w?.isDown)
        ) {
          this.player.setVelocity(-runSpeed / 1.5, -runSpeed / 1.5);
          this.player.anims.play("run-left", true);
          this.lastDirection = "left";
        } else if (
          (this.keys.right?.isDown && this.keys.down?.isDown) ||
          (this.keys.d?.isDown && this.keys.s?.isDown)
        ) {
          this.player.setVelocity(runSpeed / 1.5, runSpeed / 1.5);
          this.player.anims.play("run-right", true);
          this.lastDirection = "down";
        } else if (
          (this.keys.left?.isDown && this.keys.down?.isDown) ||
          (this.keys.a?.isDown && this.keys.s?.isDown)
        ) {
          this.player.setVelocity(-runSpeed / 1.5, runSpeed / 1.5);
          this.player.anims.play("run-left", true);
          this.lastDirection = "right";
        } else if (this.keys.up?.isDown || this.keys.w?.isDown) {
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
        if (
          (this.keys.right?.isDown && this.keys.up?.isDown) ||
          (this.keys.d?.isDown && this.keys.w?.isDown)
        ) {
          this.player.setVelocity(walkSpeed / 1.5, -walkSpeed / 1.5);
          this.player.anims.play("walk-right", true);
          this.lastDirection = "right";
        } else if (
          (this.keys.left?.isDown && this.keys.up?.isDown) ||
          (this.keys.a?.isDown && this.keys.w?.isDown)
        ) {
          this.player.setVelocity(-walkSpeed / 1.5, -walkSpeed / 1.5);
          this.player.anims.play("walk-left", true);
          this.lastDirection = "left";
        } else if (
          (this.keys.right?.isDown && this.keys.down?.isDown) ||
          (this.keys.d?.isDown && this.keys.s?.isDown)
        ) {
          this.player.setVelocity(walkSpeed / 1.5, walkSpeed / 1.5);
          this.player.anims.play("walk-right", true);
          this.lastDirection = "down";
        } else if (
          (this.keys.left?.isDown && this.keys.down?.isDown) ||
          (this.keys.a?.isDown && this.keys.s?.isDown)
        ) {
          this.player.setVelocity(-walkSpeed / 1.5, walkSpeed / 1.5);
          this.player.anims.play("walk-left", true);
          this.lastDirection = "right";
        } else if (this.keys.up?.isDown || this.keys.w?.isDown) {
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
    const zombieSpeed = 28;
    this.zomPatrol1 += delta / 1000;
    this.zomPatrol2 += delta / 1000;
    this.zomPatrol3 += delta / 1000;

    // ZOMBIE 1
    if (this.zomPatrol1 <= 14.4) {
      // 14.4 seconds
      this.zom1.setVelocity(zombieSpeed, 0);
      this.zom1.anims.play("z-walk-right", true);
    } else if (this.zomPatrol1 <= 16.4) {
      // 2 seconds
      this.zom1.setVelocity(0, zombieSpeed);
      this.zom1.anims.play("z-walk-down", true);
    } else if (this.zomPatrol1 <= 30.8) {
      // 14.4 seconds
      this.zom1.setVelocity(-zombieSpeed, 0);
      this.zom1.anims.play("z-walk-left", true);
    } else if (this.zomPatrol1 <= 32.8) {
      // 2 seconds
      this.zom1.setVelocity(0, -zombieSpeed);
      this.zom1.anims.play("z-walk-up", true);
    } else {
      this.zomPatrol1 = 0;
    }

    // ZOMBIE 2
    if (this.zomPatrol2 <= 8.8) {
      this.zom2.setVelocity(zombieSpeed, 0);
      this.zom2.anims.play("z-walk-right", true);
    } else if (this.zomPatrol2 <= 11.2) {
      this.zom2.setVelocity(0, -zombieSpeed);
      this.zom2.anims.play("z-walk-up", true);
    } else if (this.zomPatrol2 <= 20) {
      this.zom2.setVelocity(-zombieSpeed, 0);
      this.zom2.anims.play("z-walk-left", true);
    } else if (this.zomPatrol2 <= 22.4) {
      this.zom2.setVelocity(0, zombieSpeed);
      this.zom2.anims.play("z-walk-down", true);
    } else {
      this.zomPatrol2 = 0;
    }

    // ZOMBIE 3
    if (this.zomPatrol3 <= 10) {
      this.zom3.setVelocity(zombieSpeed, 0);
      this.zom3.anims.play("z-walk-right", true);
    } else if (this.zomPatrol3 <= 11.6) {
      this.zom3.setVelocity(0, zombieSpeed);
      this.zom3.anims.play("z-walk-down", true);
    } else if (this.zomPatrol3 <= 21.6) {
      this.zom3.setVelocity(-zombieSpeed, 0);
      this.zom3.anims.play("z-walk-left", true);
    } else if (this.zomPatrol3 <= 23.2) {
      this.zom3.setVelocity(0, -zombieSpeed);
      this.zom3.anims.play("z-walk-up", true);
    } else {
      this.zomPatrol3 = 0;
    }

    // GHOST BOBBING
    if (this.ghostBob <= 100) {
      this.ghost.setVelocityY(-floatSpeed);
      this.ghostBob++;
    } else if (this.ghostBob <= 200) {
      this.ghost.setVelocityY(floatSpeed);
      this.ghostBob++;
    } else {
      this.ghostBob = 0;
    }
  }
}
