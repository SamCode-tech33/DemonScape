import type { SceneOneState } from "../levelOne/SceneOneTypes";

export const portal = (scene: Phaser.Scene & SceneOneState) => {
  scene.portal = scene.add.sprite(1235, 525, "portal", 0).setDepth(6);
};

export const door = (scene: Phaser.Scene & SceneOneState) => {
  scene.door = scene.add.sprite(688, 82, "door", 1).setDepth(4);
  scene.door.setDepth(scene.door.y + 16);
};

export const puzzleBooks = (scene: Phaser.Scene & SceneOneState) => {
  scene.puzzleBook1 = scene.add.sprite(1065, 415, "puzzleBook", 0);
  scene.puzzleBook1.setDepth(scene.puzzleBook1.y + 40);
  scene.puzzleBook2 = scene.add.sprite(1248, 415, "puzzleBook", 0);
  scene.puzzleBook2.setDepth(scene.puzzleBook2.y + 40);
};
export const normalChest = (scene: Phaser.Scene & SceneOneState) => {
  scene.normalChest = scene.physics.add.sprite(1360, 436, "chest", 0);
  scene.normalChest
    .setDepth(scene.normalChest.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.normalChest.width * 1, scene.normalChest.height * 0.5)
    .setOffset(scene.normalChest.width * 0, scene.normalChest.height * 0.45);
  scene.physics.add.collider(scene.player, scene.normalChest);
};

export const puzzleChest = (scene: Phaser.Scene & SceneOneState) => {
  scene.puzzleChest = scene.physics.add.sprite(945, 148, "chest", 0);
  scene.puzzleChest
    .setDepth(scene.puzzleChest.y + 40)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.puzzleChest.width * 1, scene.puzzleChest.height * 0.5)
    .setOffset(scene.puzzleChest.width * 0, scene.puzzleChest.height * 0.45);
  scene.physics.add.collider(scene.player, scene.puzzleChest);
};

export const pottedPlant = (scene: Phaser.Scene & SceneOneState) => {
  scene.pottedPlant = scene.physics.add
    .sprite(940, 450, "potted-plant", 0)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.pottedPlant
    .setSize(scene.pottedPlant.width * 0.6, scene.pottedPlant.height * 0.4)
    .setOffset(scene.pottedPlant.width * 0.2, scene.pottedPlant.height * 0.7);
  scene.physics.add.collider(scene.player, scene.pottedPlant);
  scene.pottedPlant.setDepth(scene.pottedPlant.y + 32);
};

export const returnPortal = (scene: Phaser.Scene & SceneOneState) => {
  scene.returnPortal = scene.add
    .sprite(960, 324, "returnPortal", 0)
    .setDepth(6);
};

export const brazierFire = (scene: Phaser.Scene & SceneOneState) => {
  // Create the animation once (it's global, shared across all sprites)
  if (!scene.anims.exists("brazier-fire-burn")) {
    scene.anims.create({
      key: "brazier-fire-burn",
      frames: scene.anims.generateFrameNumbers("brazier-fire", {
        start: 0,
        end: 2,
      }),
      frameRate: 8,
      repeat: -1, // loop forever
    });
  }

  scene.brazierFire1 = scene.add
    .sprite(272, 271, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire1.setDepth(scene.brazierFire1.y + 56);

  scene.brazierFire2 = scene.add
    .sprite(368, 271, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire2.setDepth(scene.brazierFire2.y + 56);

  scene.brazierFire3 = scene.add
    .sprite(272, 367, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire3.setDepth(scene.brazierFire3.y + 56);

  scene.brazierFire4 = scene.add
    .sprite(368, 367, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire4.setDepth(scene.brazierFire4.y + 56);

  scene.brazierFire5 = scene.add
    .sprite(272, 463, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire5.setDepth(scene.brazierFire5.y + 56);

  scene.brazierFire6 = scene.add
    .sprite(368, 463, "brazier-fire", 0)
    .play({ key: "brazier-fire-burn", startFrame: Phaser.Math.Between(0, 2) });
  scene.brazierFire6.setDepth(scene.brazierFire6.y + 56);
};

export const brazier = (scene: Phaser.Scene & SceneOneState) => {
  scene.brazier1 = scene.physics.add.sprite(272, 289, "brazier", 0);
  scene.brazier1
    .setDepth(scene.brazier1.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier1.width * 0.6, scene.brazier1.height * 0.2)
    .setOffset(scene.brazier1.width * 0.25, scene.brazier1.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier1);

  scene.brazier2 = scene.physics.add.sprite(368, 289, "brazier", 0);
  scene.brazier2
    .setDepth(scene.brazier2.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier2.width * 0.6, scene.brazier2.height * 0.2)
    .setOffset(scene.brazier2.width * 0.25, scene.brazier2.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier2);

  scene.brazier3 = scene.physics.add.sprite(272, 385, "brazier", 0);
  scene.brazier3
    .setDepth(scene.brazier3.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier3.width * 0.6, scene.brazier3.height * 0.2)
    .setOffset(scene.brazier3.width * 0.25, scene.brazier3.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier3);

  scene.brazier4 = scene.physics.add.sprite(368, 385, "brazier", 0);
  scene.brazier4
    .setDepth(scene.brazier4.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier4.width * 0.6, scene.brazier4.height * 0.2)
    .setOffset(scene.brazier4.width * 0.25, scene.brazier4.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier4);

  scene.brazier5 = scene.physics.add.sprite(272, 481, "brazier", 0);
  scene.brazier5
    .setDepth(scene.brazier5.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier5.width * 0.6, scene.brazier5.height * 0.2)
    .setOffset(scene.brazier5.width * 0.25, scene.brazier5.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier5);

  scene.brazier6 = scene.physics.add.sprite(368, 481, "brazier", 0);
  scene.brazier6
    .setDepth(scene.brazier6.y + 32)
    .setCollideWorldBounds(true)
    .setImmovable(true)
    .setSize(scene.brazier6.width * 0.6, scene.brazier6.height * 0.2)
    .setOffset(scene.brazier6.width * 0.25, scene.brazier6.height * 0.7);
  scene.physics.add.collider(scene.player, scene.brazier6);
};
