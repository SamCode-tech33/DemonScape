import PlayerStatsManager from "../state/PlayerStats";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    const slot = Number(params.get("slot") ?? 1);
    this.registry.set("slot", slot);
    this.registry.set("userId", "demo-user");

    await this.loadSave();
  }

  async loadSave() {
    const userId = this.registry.get("userId");
    const slot = this.registry.get("slot");

    const res = await fetch(`/api/load?userId=${userId}&slot=${slot}`);
    const save = await res.json();

    if (save) {
      this.registry.set("saveData", save);
      this.registry.set("isNewGame", false);
      // rehydrate playerStats from saved values
      this.registry.set(
        "playerStats",
        PlayerStatsManager.fromSave(save.playerStats),
      );
    } else {
      this.registry.set("isNewGame", true);
      // fresh default stats for a new game
      this.registry.set("playerStats", new PlayerStatsManager());
    }
  }

  create() {
    document.fonts.load("32px mostean").then(() => {
      this.scene.start("SceneOne");
    });
  }
}
