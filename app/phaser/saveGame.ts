import type Main from "./LevelOne/Main";

export async function saveGame() {
  const game = window.phaserGame;
  if (!game) return;

  const main = game.scene.getScene("SceneOne") as Main;
  if (!main?.getSaveState) return;

  console.log("[SAVE] saveGame() CALLED");

  const save = main.getSaveState();

  console.log("[SAVE] payload:", JSON.stringify(save, null, 2));

  await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(save),
  });
}
