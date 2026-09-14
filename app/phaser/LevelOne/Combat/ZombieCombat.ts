import {
  zombieCombatAnimation,
  playerCombatAnimation,
} from "@/app/components/combatAnimationSettings";
import {
  enemyAttack,
  playerBaseAttack,
  playerJumpAttack,
  playerUI,
} from "@/app/components/combatLogic";
import type PlayerStatsManager from "@/app/state/PlayerStats";
import type { CombatSceneState } from "@/app/components/combatSceneTypes";
import type { enemyStats } from "@/app/components/demonScapeTypes";
export default class ZombieCombat
  extends Phaser.Scene
  implements CombatSceneState
{
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
  playerStats!: PlayerStatsManager;
  enemyStats!: enemyStats;
  timerValue!: number;
  timerText: Phaser.GameObjects.Text | undefined;
  timerEvent: Phaser.Time.TimerEvent | undefined;
  dodge: Phaser.GameObjects.Graphics | undefined;
  dodgeText: Phaser.GameObjects.Text | undefined;
  parry: Phaser.GameObjects.Graphics | undefined;
  parryText: Phaser.GameObjects.Text | undefined;
  sparkles?: Phaser.GameObjects.Particles.ParticleEmitter[];
  enemyHealthBarBg!: Phaser.GameObjects.Graphics;
  enemyMagicBarBg!: Phaser.GameObjects.Graphics;
  enemyHealthBar!: Phaser.GameObjects.Graphics;
  enemyMagicBar!: Phaser.GameObjects.Graphics;
  enemyHealthText!: Phaser.GameObjects.Text;
  enemyMagicText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "ZombieCombat" });
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
      },
    );
    this.load.spritesheet(
      "zombie-combat-idle",
      "/assets/enemies/zombie/idle.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      },
    );
  }

  create() {
    this.playerStats = this.registry.get("playerStats") as PlayerStatsManager;

    this.enemyStats = {
      health: 1,
      maxHealth: 20,
      magic: 5,
      maxMagic: 5,
      experience: 10,
    };

    this.scene.launch("HudScene");
    this.scene.bringToTop("HudScene");

    this.scene.launch("EnemyHudScene", { enemyStats: this.enemyStats });
    this.scene.bringToTop("EnemyHudScene");

    if (!this.textures.exists("spark")) {
      const g = this.add.graphics();
      g.fillStyle(0xffd700, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture("spark", 8, 8);
      g.destroy();
    }

    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "ZombieCombatBG")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    this.music = this.sound.add("dungeon-combat", { loop: true, volume: 1 });
    this.music.play();

    zombieCombatAnimation(this);
    playerCombatAnimation(this);

    this.player = this.physics.add
      .sprite(600, 600, "player-combat-idle", 6)
      .setDepth(8)
      .setScale(5.5);

    this.enemy = this.physics.add
      .sprite(1150, 600, "zombie-combat-idle", 2)
      .setDepth(8)
      .setScale(5.5);

    this.player.anims.play("player-combat-idle-right");
    this.enemy.anims.play("zombie-combat-idle-left");

    this.time.delayedCall(1000, () => enemyAttack(this));
    playerUI(this);

    this.input.keyboard?.on("keydown-E", () => {
      if (this.playerTurn && !this.playerAttack) {
        playerBaseAttack(this);
      }
    });
    this.input.keyboard?.on("keydown-Q", () => {
      if (this.playerTurn && !this.playerAttack) {
        playerJumpAttack(this);
      }
    });
    if (this.enemyStats.maxHealth === 40) {
      this.enemy.clearTint();
      this.enemy.setTint(0xff0000);
      this.enemy.setScale(7);
      this.enemyStats.experience = 20;
    }
  }

  update() {
    if (this.player.y < this.enemy.y) {
      this.enemy.setDepth(12);
    } else {
      this.enemy.setDepth(7);
    }

    if (this.playerStats.health < 1) {
      this.registry.set("playerStats", this.playerStats);
      this.scene.stop("ZombieCombat");
      this.scene.stop("EnemyHudScene");
      this.music.stop();
      this.playerAttack = false;
      this.playerTurn = false;
      this.scene.resume("SceneOne", {
        from: "PlayerDeath",
      });
    }

    if (this.enemyStats.health < 1 && this.enemyStats.maxHealth === 40) {
      this.playerStats.experience += 20;
      this.registry.set("playerStats", this.playerStats);
      this.scene.stop("ZombieCombat");
      this.scene.stop("EnemyHudScene");
      this.music.stop();
      this.playerAttack = false;
      this.playerTurn = false;
      this.scene.resume("SceneOne", {
        from: "ZombieCombat-boss",
      });
    } else if (this.enemyStats.health < 1) {
      this.playerStats.experience += this.enemyStats.experience;
      this.registry.set("playerStats", this.playerStats);
      this.scene.stop("ZombieCombat");
      this.scene.stop("EnemyHudScene");
      this.music.stop();
      this.playerAttack = false;
      this.playerTurn = false;
      this.scene.resume("SceneOne", {
        from: "ZombieCombat",
      });
    }
    this.enemyStats.health = this.enemyStats.health;
    this.enemyStats.maxHealth = this.enemyStats.maxHealth;
    this.enemyStats.magic = this.enemyStats.magic;
    this.enemyStats.maxMagic = this.enemyStats.maxMagic;
  }
}
