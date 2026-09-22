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
  infoText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "HudScene" });
  }

  create() {
    const radius = 8;
    const screenWidth = this.scale.width;

    this.playerStats = this.registry.get("playerStats") as PlayerStatsManager;

    this.registry.events.on(
      "changedata-playerStats",
      (_parent: unknown, value: PlayerStatsManager) => {
        this.playerStats = value;
        this.updateBars();
      },
    );

    // --- Bronze backing panel (drawn first so bars render on top) ---
    this.createTopPanel(screenWidth);

    // --- Player HUD ---
    this.createPlayerHUD(radius);

    // --- Experience HUD (mirrors the health bar's x position) ---
    this.createExpHUD(radius, screenWidth);

    this.createInfoText(screenWidth);

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

  updateBars() {
    this.updatePlayerBars();
    this.healthText.setText(
      `HP: ${this.playerStats.health}/${this.playerStats.maxHealth}`,
    );
    this.magicText.setText(
      `MP: ${this.playerStats.magic}/${this.playerStats.maxMagic}`,
    );

    // Experience
    this.updateExpBar();
    this.expText.setText(
      `XP: ${this.playerStats.experience}/${this.playerStats.experienceGoal}`,
    );

    this.infoText.setText(this.getInfoString());
  }

  createInfoText(screenWidth: number) {
    this.infoText = this.add
      .text(screenWidth / 2, 25, this.getInfoString(), {
        fontSize: "40px",
        color: "#6E260E",
        fontFamily: "mostean",
      })
      .setOrigin(0.5) // centers on the x/y point instead of anchoring top-left
      .setScrollFactor(0);
  }

  getInfoString() {
    const { level, money, suspicion } = this.playerStats;
    return `Level ${level} | ${money} Soul Shards | Suspicion: ${suspicion}%`;
  }
}
