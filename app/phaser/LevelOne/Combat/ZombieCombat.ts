import Phaser from "phaser";
import {
  zombieAnimation,
  playerAnimation,
} from "@/app/components/animationSettings";
import {
  enemyAttack,
  playerBaseAttack,
  playerJumpAttack,
  playerUI,
} from "@/app/components/combatLogic";

interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

export default class ZombieCombat extends Phaser.Scene {
  music!: Phaser.Sound.BaseSound;
  player!: Phaser.Physics.Arcade.Sprite;
  enemy!: Phaser.Physics.Arcade.Sprite;
  playerTurn: boolean = false;
  playerAttack: boolean = false;
  attackVectorBase: Phaser.GameObjects.Graphics | undefined;
  attackVectorSpecial: Phaser.GameObjects.Graphics | undefined;
  attackVectorBaseText: Phaser.GameObjects.Text | undefined;
  attackVectorSpecialText: Phaser.GameObjects.Text | undefined;
  qte: Phaser.GameObjects.Graphics | undefined;
  qteText: Phaser.GameObjects.Text | undefined;
  playerStats = {
    health: 50,
    maxHealth: 50,
    magic: 20,
    maxMagic: 20,
  };
  enemyStats = {
    enemyPresence: true,
    health: 20,
    maxHealth: 20,
    magic: 1,
    maxMagic: 1,
  };

  constructor() {
    super({ key: "ZombieCombat" });
  }

  init(data: PlayerStats) {
    this.playerStats.health = data.health ?? 50;
    this.playerStats.maxHealth = data.maxHealth ?? 50;
    this.playerStats.magic = data.magic ?? 20;
    this.playerStats.maxMagic = data.maxMagic ?? 20;
  }

  preload() {
    this.load.image("ZombieCombatBG", "/assets/combat/combat-dung-cath-bg.png");
    this.load.audio("dungeon-combat", "/assets/music/first-fights.mp3");
    this.load.spritesheet(
      "player-combat-idle",
      "/assets/player/combat_idle.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet(
      "zombie-combat-idle",
      "/assets/enemies/zombie/idle.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }

  create() {
    this.scene.bringToTop("HudScene");
    this.scene.launch("HudScene", {
      player: this.playerStats,
      enemy: this.enemyStats,
    });

    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "ZombieCombatBG")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    this.music = this.sound.add("dungeon-combat", { loop: true, volume: 1 });
    this.music.play();

    zombieAnimation(this);
    playerAnimation(this);

    this.player = this.physics.add
      .sprite(600, 600, "player-combat-idle", 6)
      .setDepth(8)
      .setScale(5.5);

    this.anims.create({
      key: "player-combat-idle-right",
      frames: this.anims.generateFrameNumbers("player-combat-idle", {
        start: 6,
        end: 7,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.enemy = this.physics.add
      .sprite(1150, 600, "zombie-combat-idle", 2)
      .setDepth(8)
      .setScale(5.5);

    this.anims.create({
      key: "zombie-combat-idle-left",
      frames: this.anims.generateFrameNumbers("zombie-combat-idle", {
        start: 2,
        end: 3,
      }),
      frameRate: 1.5,
      repeat: -1,
    });

    this.player.anims.play("player-combat-idle-right");
    this.enemy.anims.play("zombie-combat-idle-left");

    this.time.delayedCall(1000, () => enemyAttack(this));
    playerUI(this);

    this.input.keyboard!.on("keydown-E", () => {
      if (this.playerTurn && !this.playerAttack) {
        playerBaseAttack(this);
      }
    });
    this.input.keyboard!.on("keydown-Q", () => {
      if (this.playerTurn && !this.playerAttack) {
        playerJumpAttack(this);
      }
    });
  }

  update() {
    if (this.player.y < this.enemy.y) {
      this.enemy.setDepth(12);
    } else {
      this.enemy.setDepth(7);
    }

    if (this.playerStats.health < 1) {
      this.scene.stop("ZombieCombat");
      this.music.stop();
      this.enemyStats.enemyPresence = false;
      this.scene.launch("HudScene", {
        player: this.playerStats,
        enemy: this.enemyStats,
      });
      this.scene.resume("SceneOne");
    }

    if (this.enemyStats.health < 1) {
      this.scene.stop("ZombieCombat");
      this.music.stop();
      this.enemyStats.enemyPresence = false;
      this.scene.launch("HudScene", {
        player: this.playerStats,
        enemy: this.enemyStats,
      });
      this.scene.resume("SceneOne");
    }
  }
}
