const interactionLogic = (scene: any) => {
  const npcs = [
    {
      name: "AlchTwins",
      sprite: scene.alchTwin,
      floatRect: 33,
      floatText: 42,
      scene: "AlchTwins",
      range: 28,
    },
    {
      name: "CultHead",
      sprite: scene.cultHead,
      floatRect: 33,
      floatText: 42,
      scene: "CultHead",
      range: 28,
    },
    {
      name: "BoxGuy",
      sprite: scene.boxNpc,
      floatRect: 33,
      floatText: 42,
      scene: "BoxGuy",
      range: 56,
    },
    {
      name: "SaraOne",
      sprite: scene.sara,
      floatRect: 33,
      floatText: 42,
      scene: "SaraOne",
      range: 56,
    },
    {
      name: "Ghost",
      sprite: scene.ghost,
      floatRect: 52,
      floatText: 61,
      scene: "Ghost",
      range: 56,
    },
    {
      name: "SkelMan",
      sprite: scene.skel,
      floatRect: 40,
      floatText: 49,
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
        .graphics()
        .fillStyle(0x000000, 0.6)
        .fillRoundedRect(-10, -10, 20, 20, 4)
        .setDepth(50);

      scene.interactionBox.setPosition(
        npcInRange.sprite.x,
        npcInRange.sprite.y - npcInRange.floatRect
      );

      if (scene.alchEvent || npcInRange.name === "AlchTwins") {
        scene.interactionKey = scene.add
          .text(
            npcInRange.sprite.x,
            npcInRange.sprite.y - npcInRange.floatText,
            "E",
            {
              fontSize: "18px",
              color: "#ffffff",
            }
          )
          .setDepth(50);
      } else {
        scene.interactionKey = scene.add
          .text(
            npcInRange.sprite.x,
            npcInRange.sprite.y - npcInRange.floatText,
            "E",
            {
              fontSize: "18px",
              color: "#ffffff",
            }
          )
          .setDepth(50);
        scene.noInteraction = scene.add
          .text(
            npcInRange.sprite.x,
            npcInRange.sprite.y - npcInRange.floatText,
            "/",
            {
              fontSize: "18px",
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
          if (scene.activeNpc.name === "AlchTwins") {
            scene.scene.launch(scene.activeNpc.scene, {
              alchSceneNum: scene.alchSceneNum,
            });
          } else if (scene.activeNpc.name === "CultHead") {
            scene.scene.launch(scene.activeNpc.scene, {
              cultHeadSceneNum: scene.cultHeadSceneNum,
            });
            if (scene.cultHeadSceneNum < 3) {
              scene.cultHeadSceneNum++;
            }
          } else if (scene.activeNpc.name === "SaraOne") {
            scene.scene.launch(scene.activeNpc.scene, {
              saraOneSceneNum: scene.saraOneSceneNum,
            });
            if (scene.saraOneSceneNum < 2) {
              scene.saraOneSceneNum++;
            }
          } else {
            scene.scene.launch(scene.activeNpc.scene);
          }
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
        npcInRange.sprite.x - 5.5,
        npcInRange.sprite.y - npcInRange.floatText
      );
    }
    if (scene.noInteraction) {
      scene.noInteraction.setPosition(
        npcInRange.sprite.x - 5.5,
        npcInRange.sprite.y - npcInRange.floatText
      );
    }
  } else if (scene.activeNpc) {
    clearInteraction();
  }
};

export default interactionLogic;
