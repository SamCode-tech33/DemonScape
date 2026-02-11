import type { ItemInRange, ItemsInteraction } from "./demonScapeTypes";
import type { SceneOneState } from "./levelOne/SceneOneTypes";

const itemInteractionLogic = (scene: Phaser.Scene & SceneOneState) => {
  const items: ItemsInteraction = [
    {
      name: "door",
      sprite: scene.door,
      float: 48,
      range: 28,
    },
    {
      name: "chest",
      sprite: scene.chest,
      float: 16,
      range: 28,
    },
    {
      name: "puzzleBook1",
      sprite: scene.puzzleBook1,
      float: 16,
      range: 28,
    },
    {
      name: "puzzleBook2",
      sprite: scene.puzzleBook2,
      float: 16,
      range: 28,
    },
  ];

  let itemInRange: ItemInRange = null;

  const clearInteraction = () => {
    scene.itemInteractionBox?.destroy();
    scene.itemInteractionKey?.destroy();
    scene.itemInteractionBox = undefined;
    scene.itemInteractionKey = undefined;
    scene.input.keyboard?.off("keydown-F");
    itemInRange = null;
  };

  // Find the first NPC the player is close enough to
  for (const item of items) {
    if (
      item.sprite &&
      Math.abs(scene.player.x - item.sprite.x) < item.range &&
      Math.abs(scene.player.y - item.sprite.y) < item.range
    ) {
      itemInRange = item;
      break; // stop after first match
    } else {
      itemInRange = null;
    }
  }
  if (itemInRange?.sprite) {
    if (!scene.itemInteractionBox && !scene.itemInteractionKey) {
      if (
        (scene.skelTalk && itemInRange.name === "puzzleBook1") ||
        (scene.skelTalk && itemInRange.name === "puzzleBook2")
      ) {
        scene.itemInteractionBox = scene.add
          .graphics()
          .fillStyle(0x000000, 0.6)
          .fillRoundedRect(-5, -5, 10, 10, 4)
          .setDepth(50);

        scene.itemInteractionBox.setPosition(
          itemInRange.sprite.x - 15,
          itemInRange.sprite.y - itemInRange.float,
        );
        scene.itemInteractionKey = scene.add
          .text(
            itemInRange.sprite.x - 15 + 0.5,
            itemInRange.sprite.y - itemInRange.float,
            "F",
            {
              fontSize: "10px",
              color: "#ffffff",
            },
          )
          .setDepth(50)
          .setOrigin(0.5, 0.5);
      } else if (scene.level1Complete && itemInRange.name === "door") {
        scene.itemInteractionBox = scene.add
          .graphics()
          .fillStyle(0x000000, 0.6)
          .fillRoundedRect(-5, -5, 10, 10, 4)
          .setDepth(50);

        scene.itemInteractionBox.setPosition(
          itemInRange.sprite.x,
          itemInRange.sprite.y - itemInRange.float,
        );
        scene.itemInteractionKey = scene.add
          .text(
            itemInRange.sprite.x + 0.5,
            itemInRange.sprite.y - itemInRange.float,
            "F",
            {
              fontSize: "10px",
              color: "#ffffff",
            },
          )
          .setDepth(50)
          .setOrigin(0.5, 0.5);
      } else if (itemInRange.name === "chest") {
        scene.itemInteractionBox = scene.add
          .graphics()
          .fillStyle(0x000000, 0.6)
          .fillRoundedRect(-5, -5, 10, 10, 4)
          .setDepth(50);

        scene.itemInteractionBox.setPosition(
          itemInRange.sprite.x,
          itemInRange.sprite.y - itemInRange.float,
        );
        scene.itemInteractionKey = scene.add
          .text(
            itemInRange.sprite.x + 0.5,
            itemInRange.sprite.y - itemInRange.float,
            "F",
            {
              fontSize: "10px",
              color: "#ffffff",
            },
          )
          .setDepth(50)
          .setOrigin(0.5, 0.5);
      }

      scene.input.keyboard?.once("keydown-F", () => {
        if (itemInRange) {
          if (scene.skelTalk && itemInRange.name === "puzzleBook1") {
            const currentFrameNum = parseInt(scene.puzzleBook1.frame.name, 10);
            const nextFrame = (currentFrameNum + 1) % 4;
            scene.puzzleBook1.setFrame(nextFrame);
          } else if (scene.skelTalk && itemInRange.name === "puzzleBook2") {
            const currentFrameNum = parseInt(scene.puzzleBook2.frame.name, 10);
            const nextFrame = (currentFrameNum + 1) % 4;
            scene.puzzleBook2.setFrame(nextFrame);
          } else if (scene.level1Complete && itemInRange.name === "door") {
            scene.door.setFrame(0);
          } else {
            scene.chest.setFrame(1);
          }
        }
        clearInteraction();
      });
    }
  } else {
    clearInteraction();
  }
};

export default itemInteractionLogic;
