import Phaser from "phaser";

interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

export default class HudScene extends Phaser.Scene {
  health!: number;
  maxHealth!: number;
  magic!: number;
  maxMagic!: number;
  healthBarBg!: Phaser.GameObjects.Graphics;
  magicBarBg!: Phaser.GameObjects.Graphics;
  healthBar!: Phaser.GameObjects.Graphics;
  magicBar!: Phaser.GameObjects.Graphics;
  healthText!: Phaser.GameObjects.Text;
  magicText!: Phaser.GameObjects.Text;
  hKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "HudScene", active: true }); // active:true to start immediately
  }

  init(data: PlayerStats) {
    // Receive initial player stats or other info here if needed
    this.health = data.health ?? 50;
    this.maxHealth = data.maxHealth ?? 50;
    this.magic = data.magic ?? 20;
    this.maxMagic = data.maxMagic ?? 20;
  }

  create() {
    /////////////////////////HEALTHBAR/MAGICBAR//////////////////////////////////////////////////////////////////////HEALTHBAR/MAGICBAR//////

    const radius = 8;

    this.healthBarBg = this.add.graphics().setScrollFactor(0);
    this.magicBarBg = this.add.graphics().setScrollFactor(0);

    this.healthBar = this.add.graphics().setScrollFactor(0);
    this.magicBar = this.add.graphics().setScrollFactor(0);

    // health background
    this.healthBarBg.clear();
    this.healthBarBg.fillStyle(0x555555, 1);
    this.healthBarBg.fillRoundedRect(32, 24, 272, 30, radius);
    this.healthBarBg.lineStyle(2, 0xffd700, 1);
    this.healthBarBg.strokeRoundedRect(32, 24, 272, 30, radius);

    // magic background
    this.magicBarBg.clear();
    this.magicBarBg.fillStyle(0x555555, 1);
    this.magicBarBg.fillRoundedRect(340, 24, 272, 30, radius);
    this.magicBarBg.lineStyle(2, 0xc0c0c0, 1);
    this.magicBarBg.strokeRoundedRect(340, 24, 272, 30, radius);

    // dynamic health bar
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(
      34,
      25,
      268 * (this.health / this.maxHealth),
      28,
      radius
    );

    // dynamic magic bar
    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRoundedRect(
      342,
      25,
      268 * (this.magic / this.maxMagic),
      28,
      radius
    );

    this.healthText = this.add
      .text(56, 28, `HP: ${this.health}/${this.maxHealth}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.magicText = this.add
      .text(370, 28, `MP: ${this.magic}/${this.maxMagic}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.game.events.on("updateHUD", this.updateBars, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off("updateHUD", this.updateBars, this);
    });
  }

  updateBars({ health, maxHealth, magic, maxMagic }: PlayerStats) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.magic = magic;
    this.maxMagic = maxMagic;

    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(
      34,
      25,
      268 * (this.health / this.maxHealth),
      28,
      8
    );

    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRoundedRect(
      342,
      25,
      268 * (this.magic / this.maxMagic),
      28,
      8
    );

    this.healthText.setText(`HP: ${this.health}/${this.maxHealth}`);
    this.magicText.setText(`MP: ${this.magic}/${this.maxMagic}`);
  }
}
