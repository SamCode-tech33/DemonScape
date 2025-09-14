interface EnemyStats {
  enemyPresence: boolean;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
}

export default class HudScene extends Phaser.Scene {
  // Player
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

  // Enemy
  enemyPresence: boolean = false;
  enemyHealth!: number;
  enemyMaxHealth!: number;
  enemyMagic!: number;
  enemyMaxMagic!: number;
  enemyHealthBarBg!: Phaser.GameObjects.Graphics;
  enemyMagicBarBg!: Phaser.GameObjects.Graphics;
  enemyHealthBar!: Phaser.GameObjects.Graphics;
  enemyMagicBar!: Phaser.GameObjects.Graphics;
  enemyHealthText!: Phaser.GameObjects.Text;
  enemyMagicText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "HudScene" });
  }

  init(data: { player: PlayerStats; enemy: EnemyStats }) {
    // Player stats
    this.health = data.player.health;
    this.maxHealth = data.player.maxHealth;
    this.magic = data.player.magic;
    this.maxMagic = data.player.maxMagic;

    // Enemy stats
    this.enemyPresence = data.enemy.enemyPresence;
    this.enemyHealth = data.enemy.health;
    this.enemyMaxHealth = data.enemy.maxHealth;
    this.enemyMagic = data.enemy.magic;
    this.enemyMaxMagic = data.enemy.maxMagic;
  }

  create() {
    const radius = 8;
    const screenWidth = this.scale.width;

    // --- Player HUD ---
    this.createPlayerHUD(radius);

    // --- Enemy HUD ---
    if (this.enemyPresence) {
      this.createEnemyHUD(radius, screenWidth);
    }

    // Listen for updates
    this.game.events.on("updateHUD", this.updateBars, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off("updateHUD", this.updateBars, this);
    });
  }

  createPlayerHUD(radius: number) {
    this.healthBarBg = this.add.graphics().setScrollFactor(0);
    this.magicBarBg = this.add.graphics().setScrollFactor(0);
    this.healthBar = this.add.graphics().setScrollFactor(0);
    this.magicBar = this.add.graphics().setScrollFactor(0);

    // health background
    this.healthBarBg.fillStyle(0x555555, 1);
    this.healthBarBg.fillRoundedRect(32, 24, 272, 30, radius);
    this.healthBarBg.lineStyle(2, 0xffd700, 1);
    this.healthBarBg.strokeRoundedRect(32, 24, 272, 30, radius);

    // magic background
    this.magicBarBg.fillStyle(0x555555, 1);
    this.magicBarBg.fillRoundedRect(340, 24, 272, 30, radius);
    this.magicBarBg.lineStyle(2, 0xc0c0c0, 1);
    this.magicBarBg.strokeRoundedRect(340, 24, 272, 30, radius);

    // Text
    this.healthText = this.add
      .text(56, 28, `HP: ${this.health}/${this.maxHealth}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);

    this.magicText = this.add
      .text(370, 28, `MP: ${this.magic}/${this.maxMagic}`, {
        fontSize: "20px",
        color: "#fff",
      })
      .setScrollFactor(0);

    // dynamic bars
    this.updatePlayerBars();
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
      24,
      272,
      30,
      radius
    );
    this.enemyHealthBarBg.strokeRoundedRect(
      screenWidth - 32 - 272,
      24,
      272,
      30,
      radius
    );

    this.enemyMagicBarBg.lineStyle(2, 0xc0c0c0, 1);
    this.enemyMagicBarBg.fillStyle(0x555555, 1);
    this.enemyMagicBarBg.fillRoundedRect(
      screenWidth - 340 - 272,
      24,
      272,
      30,
      radius
    );
    this.enemyMagicBarBg.strokeRoundedRect(
      screenWidth - 340 - 272,
      24,
      272,
      30,
      radius
    );

    this.enemyHealthText = this.add
      .text(
        screenWidth - 32 - 242,
        28,
        `HP: ${this.enemyHealth}/${this.enemyMaxHealth}`,
        { fontSize: "20px", color: "#fff" }
      )
      .setScrollFactor(0);

    this.enemyMagicText = this.add
      .text(
        screenWidth - 340 - 242,
        28,
        `MP: ${this.enemyMagic}/${this.enemyMaxMagic}`,
        { fontSize: "20px", color: "#fff" }
      )
      .setScrollFactor(0);

    this.updateEnemyBars();
  }

  updatePlayerBars() {
    const radius = 8;
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(
      34,
      25,
      268 * (this.health / this.maxHealth),
      28,
      radius
    );

    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRoundedRect(
      342,
      25,
      268 * (this.magic / this.maxMagic),
      28,
      radius
    );
  }

  updateEnemyBars() {
    if (this.enemyPresence) {
      const radius = 8;
      const screenWidth = this.scale.width;

      this.enemyHealthBar.clear();
      this.enemyHealthBar.fillStyle(0xff0000, 1);
      this.enemyHealthBar.fillRoundedRect(
        screenWidth - 32 - 266 * (this.enemyHealth / this.enemyMaxHealth) - 4,
        25,
        268 * (this.enemyHealth / this.enemyMaxHealth),
        28,
        radius
      );

      this.enemyMagicBar.clear();
      this.enemyMagicBar.fillStyle(0x0000ff, 1);
      this.enemyMagicBar.fillRoundedRect(
        screenWidth - 340 - 266 * (this.enemyMagic / this.enemyMaxMagic) - 4,
        25,
        268 * (this.enemyMagic / this.enemyMaxMagic),
        28,
        radius
      );
    } else {
      this.enemyHealthBarBg?.clear();
      this.enemyMagicBarBg?.clear();
      this.enemyHealthBar?.clear();
      this.enemyMagicBar?.clear();
    }
  }

  updateBars({ player, enemy }: { player: PlayerStats; enemy: EnemyStats }) {
    const radius = 8;
    const screenWidth = this.scale.width;

    // Update player stats
    this.health = player.health;
    this.maxHealth = player.maxHealth;
    this.magic = player.magic;
    this.maxMagic = player.maxMagic;
    this.updatePlayerBars();
    this.healthText.setText(`HP: ${this.health}/${this.maxHealth}`);
    this.magicText.setText(`MP: ${this.magic}/${this.maxMagic}`);

    // Update enemy stats
    this.enemyHealth = enemy.health;
    this.enemyMaxHealth = enemy.maxHealth;
    this.enemyMagic = enemy.magic;
    this.enemyMaxMagic = enemy.maxMagic;
    this.updateEnemyBars();
    this.enemyHealthText.setText(
      `HP: ${this.enemyHealth}/${this.enemyMaxHealth}`
    );
    this.enemyMagicText.setText(`MP: ${this.enemyMagic}/${this.enemyMaxMagic}`);
  }
}
