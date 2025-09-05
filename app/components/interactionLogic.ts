const interactionLogic = (scene: any, npcs: any) => {
  let npcInRange: {
    name: string;
    x: number;
    y: number;
    floatRect: number;
    floatText: number;
    scene: string;
  } | null = null;

  const clearInteraction = () => {
    scene.interactionBox?.destroy();
    scene.interactionKey?.destroy();
    scene.interactionBox = undefined;
    scene.interactionKey = undefined;
    scene.activeNpc = null;
  };

  // Find the first NPC the player is close enough to
  for (const npc of npcs) {
    if (
      Math.abs(scene.player.x - npc.x) < npc.range &&
      Math.abs(scene.player.y - npc.y) < npc.range
    ) {
      npcInRange = npc;
      break; // stop after first match
    }
  }

  if (npcInRange) {
    if (!scene.interactionBox && !scene.interactionKey && !scene.activeNpc) {
      scene.interactionBox = scene.add
        .rectangle(
          npcInRange.x,
          npcInRange.y - npcInRange.floatRect,
          22,
          22,
          0x000000,
          0.6
        )
        .setDepth(50);

      scene.interactionKey = scene.add
        .text(npcInRange.x - 6, npcInRange.y - npcInRange.floatText, "E", {
          fontSize: "20px",
          color: "#ffffff",
        })
        .setDepth(50);

      scene.activeNpc = { name: npcInRange.name, scene: npcInRange.scene };

      scene.input.keyboard!.on("keydown-E", () => {
        if (scene.activeNpc) {
          scene.backgroundMusic.pause();
          scene.scene.pause("SceneOne");
          scene.scene.launch(scene.activeNpc.scene);
          clearInteraction();
        }
      });
    }
  } else if (scene.activeNpc) {
    clearInteraction();
  }
};

export default interactionLogic;
