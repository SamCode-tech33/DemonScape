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
    this.load.image(
      "pause-background",
      "/assets/pause-menu/pause-menu-background.png",
    );
    this.load.image("character", "/assets/main-character1.png");
  }

  create() {
    // Background image
    const background = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "pause-background")
      .setOrigin(0.5);

    background.displayWidth = this.scale.width;
    background.displayHeight = this.scale.height;

    const menuWidth = this.scale.width * 0.75;
    const menuHeight = this.scale.height * 0.75;

    const menu = this.add.container(
      this.scale.width / 2,
      this.scale.height / 2,
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
      18,
    );

    bg.strokeRoundedRect(
      -menuWidth / 2,
      -menuHeight / 2,
      menuWidth,
      menuHeight,
      18,
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
        .text(-menuWidth / 2 + 20 + index * 170, -menuHeight / 2 - 42, name, {
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
        })
        .setInteractive({ useHandCursor: true });

      tabButtons.push(tab);
      menu.add(tab);

      const page = this.add.container(0, 0);
      page.visible = false;
      switch (name) {
        case "Inventory":
          page.add(
            this.add.text(
              -this.scale.width * 0.375,
              -this.scale.height * 0.375,
              "Nothing",
              {
                fontSize: "28px",
                color: "#ffffff",
              },
            ),
          );
          break;
        case "Character":
          page.add(
            this.add.text(
              -this.scale.width * 0.375,
              -this.scale.height * 0.375,
              `Equipment`,
              {
                fontSize: "28px",
                color: "#ffffff",
              },
            ),
          );
          this.add
            .image(this.scale.width / 2, this.scale.height / 2, "character")
            .setOrigin(0.5);
          break;
        case "Suspicion":
          page.add(
            this.add.text(
              -this.scale.width * 0.375,
              -this.scale.height * 0.375,
              `0% Suspicion`,
              {
                fontSize: "28px",
                color: "#ffffff",
              },
            ),
          );
          break;
        case "World Corruption":
          page.add(
            this.add.text(
              -this.scale.width * 0.375,
              -this.scale.height * 0.375,
              `93% World Corruption`,
              {
                fontSize: "28px",
                color: "#ffffff",
              },
            ),
          );
          break;
        case "Rebel Forces":
          page.add(
            this.add.text(
              -this.scale.width * 0.375,
              -this.scale.height * 0.375,
              `Scattered`,
              {
                fontSize: "28px",
                color: "#ffffff",
              },
            ),
          );
          break;
        default:
          console.log("error in menu tab selection");
      }

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

    const escKey = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    );
    escKey?.on("down", () => {
      this.scene.stop("GamePause");
      this.scene.resume("SceneOne", {
        playerStats: this.playerStats,
      });
    });
  }
}
