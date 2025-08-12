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
  controlsPanel!: Phaser.GameObjects.Container;
  hKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "HudScene", active: true }); // active:true to start immediately
  }

  init(data: PlayerStats) {
    // Receive initial player stats or other info here if needed
    this.health = data.health ?? 50;
    this.maxHealth = data.maxHealth ?? 50;
    this.magic = data.magic ?? 50;
    this.maxMagic = data.maxMagic ?? 50;
  }

  create() {
    this.controlsPanel = this.add.container(224, 8).setVisible(true);
    const panelBg = this.add
      .rectangle(window.innerWidth, 0, 500, 256, 0xffd700, 0.8)
      .setOrigin(this.controlsPanel.length, this.controlsPanel.height);
    this.controlsPanel.add(panelBg);

    const instructions = [
      "Controls:",
      "W/A/S/D - Move",
      "Space - Jump",
      "Shift - Run",
      "E - Interact",
      "H - Show / Hide Controls",
    ];

    instructions.forEach((line, i) => {
      const text = this.add.text(window.innerWidth + 24, 24 + i * 28, line, {
        fontSize: "24px",
        color: "black",
      });
      this.controlsPanel.add(text);
    });
    this.hKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.input.keyboard!.on("keydown-H", () => {
      this.controlsPanel.setVisible(!this.controlsPanel.visible);
    });

    /////////////////////////HEALTHBAR/MAGICBAR//////////////////////////////////////////////////////////////////////HEALTHBAR/MAGICBAR//////

    const radius = 8;

    this.healthBarBg = this.add.graphics().setScrollFactor(0);
    this.magicBarBg = this.add.graphics().setScrollFactor(0);

    this.healthBar = this.add.graphics().setScrollFactor(0);
    this.magicBar = this.add.graphics().setScrollFactor(0);

    // health background
    this.healthBarBg.clear();
    this.healthBarBg.fillStyle(0x555555, 1);
    this.healthBarBg.fillRoundedRect(32, 24, 272, 40, radius);
    this.healthBarBg.lineStyle(3, 0xffd700, 1);
    this.healthBarBg.strokeRoundedRect(32, 24, 272, 40, radius);

    // magic background
    this.magicBarBg.clear();
    this.magicBarBg.fillStyle(0x555555, 1);
    this.magicBarBg.fillRoundedRect(340, 24, 272, 40, radius);
    this.magicBarBg.lineStyle(3, 0xc0c0c0, 1);
    this.magicBarBg.strokeRoundedRect(340, 24, 272, 40, radius);

    // dynamic health bar
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(
      34,
      25,
      268 * (this.health / this.maxHealth),
      38,
      radius
    );

    // dynamic magic bar
    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRoundedRect(
      342,
      25,
      268 * (this.health / this.maxHealth),
      38,
      radius
    );

    this.healthText = this.add
      .text(48, 32, `HP: ${this.health}/${this.maxHealth}`, {
        fontSize: "24px",
        color: "#fff",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.magicText = this.add
      .text(360, 32, `MP: ${this.magic}/${this.maxMagic}`, {
        fontSize: "24px",
        color: "#fff",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.scene.get("MainScene")?.events.on("updateHUD", this.updateBars, this);
  }

  updateBars({ health, maxHealth, magic, maxMagic }: PlayerStats) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.magic = magic;
    this.maxMagic = maxMagic;

    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(32, 24, 200 * (this.health / this.maxHealth), 32);

    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRect(32, 72, 200 * (this.magic / this.maxMagic), 32);

    this.healthText.setText(`HP: ${this.health}/${this.maxHealth}`);
    this.magicText.setText(`MP: ${this.magic}/${this.maxMagic}`);
  }
}
