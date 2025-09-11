import Phaser from "phaser";
import { zombieAnimation } from "@/app/components/animationSettings";

export default class ZombieCombat extends Phaser.Scene {
  music!: Phaser.Sound.BaseSound;
  player!: Phaser.Physics.Arcade.Sprite;
  enemy!: Phaser.Physics.Arcade.Sprite;
  playerTurn: boolean = false;

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
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "ZombieCombatBG")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    this.music = this.sound.add("dungeon-combat", { loop: true, volume: 1 });
    this.music.play();

    zombieAnimation(this);

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

    this.enemy.scene.tweens.add({
      targets: this.enemy,
      x: this.player.x + 140,
      ease: "Linear",
      duration: 2000,
      onStart: () => {
        this.enemy.anims.stop();
        this.enemy.anims.play("z-walk-left", true);
        console.log("Tween started: Enemy moving to player");
      },
      onComplete: () => {
        this.enemy.anims.stop();
        this.enemy.anims.play("z-halfslash-left");
        this.enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.tweens.add({
            targets: this.enemy,
            x: 1150,
            duration: 2000,
            onStart: () => {
              this.enemy.anims.play("z-walk-right", true);
            },
            onComplete: () => {
              this.enemy.anims.stop();
              this.enemy.anims.play("zombie-combat-idle-left");
            },
          });
        });
      },
    });
  }

  update() {}
}
