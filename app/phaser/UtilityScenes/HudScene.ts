import type { PlayerStats } from "@/app/components/demonScapeTypes";
import type { Zombie } from "@/app/components/enemyTypes";
import type PlayerStatsManager from "@/app/state/PlayerStats";

export default class HudScene extends Phaser.Scene {
  // Player
  playerStats!: PlayerStatsManager;
  healthBarBg!: Phaser.GameObjects.Graphics;
  magicBarBg!: Phaser.GameObjects.Graphics;
  healthBar!: Phaser.GameObjects.Graphics;
  magicBar!: Phaser.GameObjects.Graphics;
  healthText!: Phaser.GameObjects.Text;
  magicText!: Phaser.GameObjects.Text;

  // Experience
  expBarBg!: Phaser.GameObjects.Graphics;
  expBar!: Phaser.GameObjects.Graphics;
  expText!: Phaser.GameObjects.Text;

  // Top panel (bronze backing behind health/magic/exp bars)
  topPanelBg!: Phaser.GameObjects.Graphics;

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

  init(data: { enemyStats: Zombie }) {
    // Enemy stats
    this.enemyPresence = data.enemyStats.enemyPresence;
    this.enemyHealth = data.enemyStats.health;
    this.enemyMaxHealth = data.enemyStats.maxHealth;
    this.enemyMagic = data.enemyStats.magic;
    this.enemyMaxMagic = data.enemyStats.maxMagic;
  }

  create() {
    const radius = 8;
    const screenWidth = this.scale.width;

    this.playerStats = this.registry.get("playerStats") as PlayerStatsManager;

    // --- Bronze backing panel (drawn first so bars render on top) ---
    this.createTopPanel(screenWidth);

    // --- Player HUD ---
    this.createPlayerHUD(radius);

    // --- Experience HUD (mirrors the health bar's x position) ---
    this.createExpHUD(radius, screenWidth);

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

  createTopPanel(screenWidth: number) {
    const margin = 16;
    const bottomY = 48; // same bottom edge as before (panelY 12 + panelHeight 50)
    const bottomLeftX = margin;
    const bottomRightX = screenWidth - margin;
    const topY = 0; // touches the top of the screen
    const topLeftX = 0;
    const topRightX = screenWidth; // max width

    this.topPanelBg = this.add.graphics().setScrollFactor(0);

    // Metallic bronze gradient fill
    this.topPanelBg.fillGradientStyle(
      0xdca35e, // top-left highlight
      0xb87333, // top-right bronze
      0x8a5a2b, // bottom-left shadow
      0x6e4423, // bottom-right deep shadow
      1,
    );
    this.topPanelBg.fillPoints(
      [
        { x: topLeftX, y: topY },
        { x: topRightX, y: topY },
        { x: bottomRightX, y: bottomY },
        { x: bottomLeftX, y: bottomY },
      ],
      true, // close the path for filling
    );

    // Bronze rim highlight — sides + bottom only, no top edge
    this.topPanelBg.lineStyle(3, 0xe8b978, 1);
    this.topPanelBg.beginPath();
    this.topPanelBg.moveTo(topLeftX, topY);
    this.topPanelBg.lineTo(bottomLeftX, bottomY);
    this.topPanelBg.lineTo(bottomRightX, bottomY);
    this.topPanelBg.lineTo(topRightX, topY);
    this.topPanelBg.strokePath();

    // Inner shadow line, inset slightly, also skipping the top edge
    const inset = 3;
    this.topPanelBg.lineStyle(1, 0x4a2f14, 0.8);
    this.topPanelBg.beginPath();
    this.topPanelBg.moveTo(topLeftX + inset, topY);
    this.topPanelBg.lineTo(bottomLeftX + inset, bottomY - inset);
    this.topPanelBg.lineTo(bottomRightX - inset, bottomY - inset);
    this.topPanelBg.lineTo(topRightX - inset, topY);
    this.topPanelBg.strokePath();
  }

  createPlayerHUD(radius: number) {
    this.healthBarBg = this.add.graphics().setScrollFactor(0);
    this.magicBarBg = this.add.graphics().setScrollFactor(0);
    this.healthBar = this.add.graphics().setScrollFactor(0);
    this.magicBar = this.add.graphics().setScrollFactor(0);

    // health background
    this.healthBarBg.fillStyle(0x555555, 1);
    this.healthBarBg.fillRoundedRect(32, 10, 272, 30, radius);
    this.healthBarBg.lineStyle(2, 0xffd700, 1);
    this.healthBarBg.strokeRoundedRect(32, 10, 272, 30, radius);

    // magic background
    this.magicBarBg.fillStyle(0x555555, 1);
    this.magicBarBg.fillRoundedRect(340, 10, 272, 30, radius);
    this.magicBarBg.lineStyle(2, 0xc0c0c0, 1);
    this.magicBarBg.strokeRoundedRect(340, 10, 272, 30, radius);

    // Text
    this.healthText = this.add
      .text(
        56,
        14,
        `HP: ${this.playerStats.health}/${this.playerStats.maxHealth}`,
        {
          fontSize: "20px",
          color: "#fff",
        },
      )
      .setScrollFactor(0);

    this.magicText = this.add
      .text(
        370,
        14,
        `MP: ${this.playerStats.magic}/${this.playerStats.maxMagic}`,
        {
          fontSize: "20px",
          color: "#fff",
        },
      )
      .setScrollFactor(0);

    // dynamic bars
    this.updatePlayerBars();
  }

  createExpHUD(radius: number, screenWidth: number) {
    // Mirrors the health bar's x offset (32px) but from the right edge
    const expX = screenWidth - 32 - 272;

    this.expBarBg = this.add.graphics().setScrollFactor(0);
    this.expBar = this.add.graphics().setScrollFactor(0);

    this.expBarBg.fillStyle(0x555555, 1);
    this.expBarBg.fillRoundedRect(expX, 10, 272, 30, radius);
    this.expBarBg.lineStyle(2, 0xdaa520, 1);
    this.expBarBg.strokeRoundedRect(expX, 10, 272, 30, radius);

    this.expText = this.add
      .text(
        expX + 24,
        14,
        `XP: ${this.playerStats.experience}/${this.playerStats.experienceGoal}`,
        {
          fontSize: "20px",
          color: "#fff",
        },
      )
      .setScrollFactor(0);

    this.updateExpBar();
  }

  updatePlayerBars() {
    const radius = 8;
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(
      34,
      12,
      268 * (this.playerStats.health / this.playerStats.maxHealth),
      26,
      radius,
    );

    this.magicBar.clear();
    this.magicBar.fillStyle(0x0000ff, 1);
    this.magicBar.fillRoundedRect(
      342,
      12,
      268 * (this.playerStats.magic / this.playerStats.maxMagic),
      26,
      radius,
    );
  }

  updateExpBar() {
    const radius = 8;
    const screenWidth = this.scale.width;
    const expX = screenWidth - 32 - 272;

    this.expBar.clear();
    this.expBar.fillStyle(0x8a2be2, 1);
    this.expBar.fillRoundedRect(
      expX + 2,
      12,
      268 * (this.playerStats.experience / this.playerStats.experienceGoal),
      26,
      radius,
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
        `HP: ${this.enemyHealth}/${this.enemyMaxHealth}`,
        { fontSize: "20px", color: "#fff" },
      )
      .setScrollFactor(0);

    this.enemyMagicText = this.add
      .text(
        screenWidth - 340 - 242,
        14,
        `MP: ${this.enemyMagic}/${this.enemyMaxMagic}`,
        { fontSize: "20px", color: "#fff" },
      )
      .setScrollFactor(0);

    this.updateEnemyBars();
  }

  updateEnemyBars() {
    if (this.enemyPresence) {
      const radius = 8;
      const screenWidth = this.scale.width;

      this.enemyHealthBar.clear();
      this.enemyHealthBar.fillStyle(0xff0000, 1);
      this.enemyHealthBar.fillRoundedRect(
        screenWidth - 32 - 266 * (this.enemyHealth / this.enemyMaxHealth) - 4,
        12,
        268 * (this.enemyHealth / this.enemyMaxHealth),
        26,
        radius,
      );

      this.enemyMagicBar.clear();
      this.enemyMagicBar.fillStyle(0x0000ff, 1);
      this.enemyMagicBar.fillRoundedRect(
        screenWidth - 340 - 266 * (this.enemyMagic / this.enemyMaxMagic) - 4,
        12,
        268 * (this.enemyMagic / this.enemyMaxMagic),
        26,
        radius,
      );
    } else {
      this.enemyHealthBarBg?.clear();
      this.enemyMagicBarBg?.clear();
      this.enemyHealthBar?.clear();
      this.enemyMagicBar?.clear();
    }
  }

  updateBars({ player, enemy }: { player: PlayerStats; enemy: Zombie }) {
    // Update player stats
    this.playerStats.health = player.health;
    this.playerStats.maxHealth = player.maxHealth;
    this.playerStats.magic = player.magic;
    this.playerStats.maxMagic = player.maxMagic;
    this.updatePlayerBars();
    this.healthText.setText(
      `HP: ${this.playerStats.health}/${this.playerStats.maxHealth}`,
    );
    this.magicText.setText(
      `MP: ${this.playerStats.magic}/${this.playerStats.maxMagic}`,
    );

    // Update experience
    this.playerStats.experience = player.experience;
    this.playerStats.experienceGoal = player.experienceGoal;
    this.updateExpBar();
    this.expText.setText(
      `XP: ${this.playerStats.experience}/${this.playerStats.experienceGoal}`,
    );

    // Update enemy stats
    this.enemyHealth = enemy.health;
    this.enemyMaxHealth = enemy.maxHealth;
    this.enemyMagic = enemy.magic;
    this.enemyMaxMagic = enemy.maxMagic;
    this.updateEnemyBars();
    this.enemyHealthText.setText(
      `HP: ${this.enemyHealth}/${this.enemyMaxHealth}`,
    );
    this.enemyMagicText.setText(`MP: ${this.enemyMagic}/${this.enemyMaxMagic}`);
  }
}
