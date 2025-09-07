const interactionLogic = (scene: any) => {
  const npcs = [
    {
      name: "AlchTwins",
      sprite: scene.alchTwin,
      floatRect: 33,
      floatText: 44.5,
      scene: "AlchTwins",
      range: 28,
    },
    {
      name: "BoxGuy",
      sprite: scene.boxNpc,
      floatRect: 33,
      floatText: 44.5,
      scene: "BoxGuy",
      range: 56,
    },
    {
      name: "SaraOne",
      sprite: scene.sara,
      floatRect: 33,
      floatText: 44.5,
      scene: "SaraOne",
      range: 56,
    },
    {
      name: "Ghost",
      sprite: scene.ghost,
      floatRect: 52,
      floatText: 63.5,
      scene: "Ghost",
      range: 56,
    },
    {
      name: "SkelMan",
      sprite: scene.skel,
      floatRect: 40,
      floatText: 51.5,
      scene: "SkelMan",
      range: 64,
    },
  ];
  let npcInRange: {
    name: string;
    sprite: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
    floatRect: number;
    floatText: number;
    scene: string;
  } | null = null;

  const clearInteraction = () => {
    scene.interactionBox?.destroy();
    scene.interactionKey?.destroy();
    scene.noInteraction?.destroy();
    scene.interactionBox = undefined;
    scene.interactionKey = undefined;
    scene.noInteraction = undefined;
    scene.activeNpc = null;
    npcInRange = null;
  };

  // Find the first NPC the player is close enough to
  for (const npc of npcs) {
    if (
      Math.abs(scene.player.x - npc.sprite.x) < npc.range &&
      Math.abs(scene.player.y - npc.sprite.y) < npc.range
    ) {
      npcInRange = npc;
      break; // stop after first match
    }
  }
  if (npcInRange) {
    if (!scene.interactionBox && !scene.interactionKey && !scene.activeNpc) {
      scene.interactionBox = scene.add
        .rectangle(
          npcInRange.sprite.x,
          npcInRange.sprite.y - npcInRange.floatRect,
          22,
          22,
          0x000000,
          0.6
        )
        .setDepth(50);

      if (scene.alchEvent || npcInRange.name === "AlchTwins") {
        scene.interactionKey = scene.add
          .text(
            npcInRange.sprite.x - 6,
            npcInRange.sprite.y - npcInRange.floatText,
            "E",
            {
              fontSize: "20px",
              color: "#ffffff",
            }
          )
          .setDepth(50);
      } else {
        scene.interactionKey = scene.add
          .text(
            npcInRange.sprite.x - 6,
            npcInRange.sprite.y - npcInRange.floatText,
            "E",
            {
              fontSize: "20px",
              color: "#ffffff",
            }
          )
          .setDepth(50);
        scene.noInteraction = scene.add
          .text(
            npcInRange.sprite.x - 6,
            npcInRange.sprite.y - npcInRange.floatText,
            "/",
            {
              fontSize: "20px",
              color: "#ff0000",
            }
          )
          .setDepth(50);
      }

      scene.activeNpc = { name: npcInRange.name, scene: npcInRange.scene };

      scene.input.keyboard!.on("keydown-E", () => {
        if (
          (scene.activeNpc && scene.alchEvent) ||
          (scene.activeNpc && scene.activeNpc.name === "AlchTwins")
        ) {
          scene.backgroundMusic.pause();
          scene.scene.pause("SceneOne");
          scene.scene.launch(scene.activeNpc.scene, {
            alchSceneNum: scene.alchSceneNum,
          });
          clearInteraction();
        }
      });
    }
    if (scene.interactionBox) {
      scene.interactionBox.setPosition(
        npcInRange.sprite.x,
        npcInRange.sprite.y - npcInRange.floatRect
      );
    }
    if (scene.interactionKey) {
      scene.interactionKey.setPosition(
        npcInRange.sprite.x - 6,
        npcInRange.sprite.y - npcInRange.floatText
      );
    }
    if (scene.noInteraction) {
      scene.noInteraction.setPosition(
        npcInRange.sprite.x - 6,
        npcInRange.sprite.y - npcInRange.floatText
      );
    }
  } else if (scene.activeNpc) {
    clearInteraction();
  }
};

export default interactionLogic;
