import type { PlayerStats } from "../../components/demonScapeTypes";

export default class GamePause extends Phaser.Scene {
  public music!: Phaser.Sound.BaseSound;
  public playerStats!: PlayerStats;

  constructor() {
    super({ key: "GamePause" });
  }

  init(data: { playerStats: PlayerStats }) {
    this.playerStats = data.playerStats;
  }

  preload() {
    this.load.image("pause-background", "/assets/pause-menu/pause-menu-background.png");
  }

  create() {
    // Background image
    const background = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "pause-background")
      .setOrigin(0.5);

    background.displayWidth = this.scale.width;
    background.displayHeight = this.scale.height;

    const menuWidth = 900;
    const menuHeight = 550;

    const menu = this.add.container(
      this.scale.width / 2,
      this.scale.height / 2
    );

    // Main menu background
    const bg = this.add.graphics();

    bg.fillStyle(0x444444, 0.65);
    bg.lineStyle(1, 0xcccccc, 0.3);

    bg.fillRoundedRect(
      -menuWidth / 2,
      -menuHeight / 2,
      menuWidth,
      menuHeight,
      18
    );

    bg.strokeRoundedRect(
      -menuWidth / 2,
      -menuHeight / 2,
      menuWidth,
      menuHeight,
      18
    );

    menu.add(bg);

    // Tabs
    const tabs = [
      "Inventory",
      "Character",
      "Suspicion",
      "World Corruption",
      "Rebel Forces",
    ];

    const tabButtons: Phaser.GameObjects.Text[] = [];
    const pages: Record<string, Phaser.GameObjects.Container> = {};

    tabs.forEach((name, index) => {
      const tab = this.add
        .text(
          -menuWidth / 2 + 20 + index * 170,
          -menuHeight / 2 - 42,
          name,
          {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#ffffff",
            backgroundColor: "#444444",
            padding: {
              left: 12,
              right: 12,
              top: 8,
              bottom: 8,
            },
          }
        )
        .setInteractive({ useHandCursor: true });

      tabButtons.push(tab);
      menu.add(tab);

      const page = this.add.container(0, 0);
      page.visible = false;

      page.add(
        this.add.text(-380, -180, `${name} Page`, {
          fontSize: "28px",
          color: "#ffffff",
        })
      );

      pages[name] = page;
      menu.add(page);

      tab.on("pointerdown", () => switchMenu(name));
    });

    const switchMenu = (tabName: string) => {
      Object.values(pages).forEach((page) => {
        page.visible = false;
      });

      pages[tabName].visible = true;

      tabButtons.forEach((button) => {
        button.setBackgroundColor("#444444");
      });

      const active = tabButtons.find((b) => b.text === tabName);
      active?.setBackgroundColor("#777777");
    };

    switchMenu("Inventory");
  }
}
