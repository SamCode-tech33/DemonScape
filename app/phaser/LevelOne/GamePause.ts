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
    // Background image (fills the whole screen, sits behind everything)
    const background = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "pause-background")
      .setOrigin(0.5);

    background.displayWidth = this.scale.width;
    background.displayHeight = this.scale.height;

    // Menu now covers the entire screen
    const menuWidth = this.scale.width;
    const menuHeight = this.scale.height;

    const menu = this.add.container(
      this.scale.width / 2,
      this.scale.height / 2,
    );

    // Main menu background (see-through panel covering the full screen)
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

    // Tabs — each has a display name, a keyboard shortcut letter, and a page id
    const tabs = [
      { name: "Inventory", key: "I" },
      { name: "Character", key: "C" },
      { name: "Suspicion", key: "S" },
      { name: "World Corruption", key: "W" },
      { name: "Rebel Forces", key: "R" },
    ];

    const tabHeight = 50;
    const tabWidth = menuWidth / tabs.length;
    const tabTop = -menuHeight / 2;

    const tabButtons: Phaser.GameObjects.Text[] = [];
    const pages: Record<string, Phaser.GameObjects.Container> = {};

    // Character image lives inside the menu container so it can be shown/hidden
    // per-tab. It's positioned in the right half of the box.
    const characterImage = this.add
      .image(menuWidth / 4, tabHeight, "character")
      .setOrigin(0.5, 0.5)
      .setScale(0.75);
    characterImage.visible = false;
    menu.add(characterImage);

    // Tabs that should show the character on the right half of the box
    const tabsWithCharacter = new Set(["Inventory", "Character"]);

    const contentTop = tabTop + tabHeight;

    tabs.forEach((tabInfo, index) => {
      const { name, key } = tabInfo;

      const tabX = -menuWidth / 2 + index * tabWidth;

      const tab = this.add
        .text(tabX, tabTop, `(${key}) ${name}`, {
          fontFamily: "Arial",
          fontSize: "18px",
          color: "#ffffff",
          backgroundColor: "#444444",
          align: "center",
          fixedWidth: tabWidth,
          fixedHeight: tabHeight,
          padding: {
            left: 8,
            right: 8,
            top: 14,
            bottom: 14,
          },
        })
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true });

      tabButtons.push(tab);
      menu.add(tab);

      const page = this.add.container(0, 0);
      page.visible = false;

      switch (name) {
        case "Inventory":
          page.add(
            this.add.text(-menuWidth / 2 + 20, contentTop + 20, "Nothing", {
              fontSize: "28px",
              color: "#ffffff",
            }),
          );
          break;
        case "Character":
          page.add(
            this.add.text(-menuWidth / 2 + 20, contentTop + 20, `Equipment`, {
              fontSize: "28px",
              color: "#ffffff",
            }),
          );
          break;
        case "Suspicion":
          page.add(
            this.add.text(
              -menuWidth / 2 + 20,
              contentTop + 20,
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
              -menuWidth / 2 + 20,
              contentTop + 20,
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
            this.add.text(-menuWidth / 2 + 20, contentTop + 20, `Scattered`, {
              fontSize: "28px",
              color: "#ffffff",
            }),
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

      const active = tabButtons.find((b) => b.text.endsWith(tabName));
      active?.setBackgroundColor("#777777");

      // Character only shows in the right half of the box on these tabs
      characterImage.visible = tabsWithCharacter.has(tabName);
    };

    switchMenu("Inventory");

    // Keyboard shortcuts: I / C / S / W / R switch tabs directly
    tabs.forEach(({ name, key }) => {
      const keyCode = (
        Phaser.Input.Keyboard.KeyCodes as Record<string, number>
      )[key];
      const keyObj = this.input.keyboard?.addKey(keyCode);
      keyObj?.on("down", () => switchMenu(name));
    });

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
