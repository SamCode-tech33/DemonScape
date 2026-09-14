import type { enemyStats } from "@/app/components/demonScapeTypes";

export default class EnemyHudScene extends Phaser.Scene {
  enemyStats!: enemyStats;
  enemyHealthBarBg!: Phaser.GameObjects.Graphics;
  enemyMagicBarBg!: Phaser.GameObjects.Graphics;
  enemyHealthBar!: Phaser.GameObjects.Graphics;
  enemyMagicBar!: Phaser.GameObjects.Graphics;
  enemyHealthText!: Phaser.GameObjects.Text;
  enemyMagicText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "EnemyHudScene" });
  }

  create(data: { enemyStats: enemyStats }) {
    this.enemyStats = data.enemyStats;
    this.createEnemyHUD(8, this.scale.width);
  }

  update() {
    if (!this.enemyStats) return;
    this.updateEnemyBars();
    this.enemyHealthText.setText(
      `HP: ${this.enemyStats.health}/${this.enemyStats.maxHealth}`,
    );
    this.enemyMagicText.setText(
      `MP: ${this.enemyStats.magic}/${this.enemyStats.maxMagic}`,
    );
  }

  createEnemyHUD(radius: number, screenWidth: number) {
    this.enemyHealthBarBg = this.add.graphics().setScrollFactor(0);
    this.enemyMagicBarBg = this.add.graphics().setScrollFactor(0);
    this.enemyHealthBar = this.add.graphics().setScrollFactor(0);
    this.enemyMagicBar = this.add.graphics().setScrollFactor(0);

    this.enemyHealthBarBg.fillStyle(0x555555, 1);
    this.enemyHealthBarBg.lineStyle(2, 0xffd700, 1);
    this.enemyHealthBarBg.fillRoundedRect(
      screenWidth - 32 - 272,
      10,
      272,
      30,
      radius,
    );
    this.enemyHealthBarBg.strokeRoundedRect(
      screenWidth - 32 - 272,
      10,
      272,
      30,
      radius,
    );

    this.enemyMagicBarBg.lineStyle(2, 0xc0c0c0, 1);
    this.enemyMagicBarBg.fillStyle(0x555555, 1);
    this.enemyMagicBarBg.fillRoundedRect(
      screenWidth - 340 - 272,
      10,
      272,
      30,
      radius,
    );
    this.enemyMagicBarBg.strokeRoundedRect(
      screenWidth - 340 - 272,
      10,
      272,
      30,
      radius,
    );

    this.enemyHealthText = this.add
      .text(
        screenWidth - 32 - 242,
        14,
        `HP: ${this.enemyStats.health}/${this.enemyStats.maxHealth}`,
        { fontSize: "20px", color: "#fff" },
      )
      .setScrollFactor(0);

    this.enemyMagicText = this.add
      .text(
        screenWidth - 340 - 242,
        14,
        `MP: ${this.enemyStats.magic}/${this.enemyStats.maxMagic}`,
        { fontSize: "20px", color: "#fff" },
      )
      .setScrollFactor(0);

    this.updateEnemyBars();
  }

  updateEnemyBars() {
    const radius = 8;
    const screenWidth = this.scale.width;

    this.enemyHealthBar.clear();
    this.enemyHealthBar.fillStyle(0xff0000, 1);
    this.enemyHealthBar.fillRoundedRect(
      screenWidth -
        32 -
        266 * (this.enemyStats.health / this.enemyStats.maxHealth) -
        4,
      12,
      268 * (this.enemyStats.health / this.enemyStats.maxHealth),
      26,
      radius,
    );

    this.enemyMagicBar.clear();
    this.enemyMagicBar.fillStyle(0x0000ff, 1);
    this.enemyMagicBar.fillRoundedRect(
      screenWidth -
        340 -
        266 * (this.enemyStats.magic / this.enemyStats.maxMagic) -
        4,
      12,
      268 * (this.enemyStats.magic / this.enemyStats.maxMagic),
      26,
      radius,
    );
  }
}
