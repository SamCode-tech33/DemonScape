import { playerCombatAnimation } from "@/app/components/TB-combat/combatAnimationSettings";
import {
  enemyTurn,
  playerBaseAttack,
  playerJumpAttack,
} from "@/app/components/TB-combat/combatLogic";
import type PlayerStatsManager from "@/app/state/PlayerStats";
import type { CombatSceneState } from "@/app/components/TB-combat/combatSceneTypes";
import { playerUI } from "@/app/components/TB-combat/combatUI";
import type { EnemyType } from "@/app/components/enemies/enemyObjectType";

interface InitType {
  enemy: EnemyType;
}
export default class CombatTB extends Phaser.Scene implements CombatSceneState {
  music!: Phaser.Sound.BaseSound;
  player!: Phaser.Physics.Arcade.Sprite;
  enemy!: EnemyType;
  enemySprite!: Phaser.Physics.Arcade.Sprite;
  boss: boolean = false;
  playerTurn: boolean = false;
  playerAttack: boolean = false;
  attackVectorBase: Phaser.GameObjects.Graphics | undefined;
  attackVectorSpecial: Phaser.GameObjects.Graphics | undefined;
  attackVectorBaseText: Phaser.GameObjects.Text | undefined;
  attackVectorSpecialText: Phaser.GameObjects.Text | undefined;
  qte: Phaser.GameObjects.Graphics | undefined;
  qteText: Phaser.GameObjects.Text | undefined;
  playerStats!: PlayerStatsManager;
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
    super({ key: "CombatTB" });
  }

  init(data: InitType) {
    this.enemy = data?.enemy;
  }

  preload() {
    this.load.image(this.enemy.bg, this.enemy.bgPath);
    this.load.audio(this.enemy.audio, this.enemy.audioPath);
    this.load.spritesheet(
      "player-combat-idle",
      "/assets/player/combat_idle.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      },
    );
    this.load.spritesheet(this.enemy.sprite, this.enemy.spritePath, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.playerStats = this.registry.get("playerStats") as PlayerStatsManager;

    this.scene.launch("HudScene");
    this.scene.launch("EnemyHudScene", { enemyStats: this.enemy.enemyStats });

    if (!this.textures.exists("spark")) {
      const g = this.add.graphics();
      g.fillStyle(0xffd700, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture("spark", 8, 8);
      g.destroy();
    }

    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, this.enemy.bg)
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    this.music = this.sound.add(this.enemy.audio, { loop: true, volume: 1 });
    this.music.play();

    this.enemy.animationLoadOut(this);
    playerCombatAnimation(this);

    this.player = this.physics.add
      .sprite(500, 600, "player-combat-idle", 6)
      .setDepth(8)
      .setScale(5.5);

    this.enemySprite = this.enemy.idle(this);

    this.enemySprite.anims.play(this.enemy.idleAnims);

    this.player.anims.play("player-combat-idle-right");

    playerUI(this);

    this.time.delayedCall(1000, () => enemyTurn(this));

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
  }

  update() {
    if (this.player.y < this.enemySprite.y) {
      this.enemySprite.setDepth(12);
    } else {
      this.enemySprite.setDepth(7);
    }

    if (this.playerStats.health < 1) {
      this.time.delayedCall(700, () => {
        this.registry.set("playerStats", this.playerStats);
        this.scene.stop("CombatTB");
        this.scene.stop("EnemyHudScene");
        this.music.stop();
        this.playerAttack = false;
        this.playerTurn = false;
        this.scene.resume("SceneOne", {
          from: "PlayerDeath",
        });
      });
    }

    if (this.enemy.enemyStats.health < 1) {
      this.time.delayedCall(300, () => {
        this.playerStats.experience += this.enemy.enemyStats.experience;
        this.registry.set("playerStats", this.playerStats);
        this.scene.stop("CombatTB");
        this.scene.stop("EnemyHudScene");
        this.music.stop();
        this.playerAttack = false;
        this.playerTurn = false;
        this.scene.resume("SceneOne", {
          from: this.enemy.from,
          experience: this.enemy.enemyStats.experience,
        });
      });
    }
    this.enemy.enemyStats.health = this.enemy.enemyStats.health;
    this.enemy.enemyStats.maxHealth = this.enemy.enemyStats.maxHealth;
    this.enemy.enemyStats.magic = this.enemy.enemyStats.magic;
    this.enemy.enemyStats.maxMagic = this.enemy.enemyStats.maxMagic;
  }
}
