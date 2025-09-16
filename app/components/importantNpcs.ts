import { SceneOneState } from "./levelOne/SceneOneTypes";

export const cultHeadNpc = (scene: Phaser.Scene & SceneOneState) => {
  scene.cultHead = scene.physics.add
    .sprite(320, 222, "cult-head-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.cultHead
    .setSize(scene.cultHead.width * 0.33, scene.cultHead.height * 0.3)
    .setOffset(scene.cultHead.width * 0.33, scene.cultHead.height * 0.7);
  scene.physics.add.collider(scene.player, scene.cultHead);
};

export const saraNpc = (scene: Phaser.Scene & SceneOneState) => {
  scene.sara = scene.physics.add
    .sprite(208, 824, "sara-sit", 6)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.sara
    .setSize(scene.sara.width * 0.33, scene.sara.height * 0.3)
    .setOffset(scene.sara.width * 0.33, scene.sara.height * 0.7);
  scene.physics.add.collider(scene.player, scene.sara);
};

export const boxNpc = (scene: Phaser.Scene & SceneOneState) => {
  scene.boxNpc = scene.physics.add
    .sprite(1364, 532, "infoGuy-sit", 11)
    .setDepth(33)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.boxNpc
    .setSize(scene.boxNpc.width * 0.4, scene.boxNpc.height * 0.4)
    .setOffset(scene.boxNpc.width * 0.37, scene.boxNpc.height * 0.55);
  scene.physics.add.collider(scene.player, scene.boxNpc);
};

export const alchTwinsNpc = (scene: Phaser.Scene & SceneOneState) => {
  scene.alchTwin = scene.physics.add
    .sprite(1614, 610, "alch-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.alchTwin
    .setSize(scene.alchTwin.width * 0.33, scene.alchTwin.height * 0.3)
    .setOffset(scene.alchTwin.width * 0.33, scene.alchTwin.height * 0.7);
  scene.physics.add.collider(scene.player, scene.alchTwin);

  scene.alchTwin2 = scene.physics.add
    .sprite(1633, 528, "alch-walk", 35)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.alchTwin2
    .setSize(scene.alchTwin2.width * 0.33, scene.alchTwin2.height * 0.3)
    .setOffset(scene.alchTwin2.width * 0.33, scene.alchTwin2.height * 0.7);
  scene.physics.add.collider(scene.player, scene.alchTwin2);
};

export const skelNpc = (scene: Phaser.Scene & SceneOneState) => {
  scene.skel = scene.physics.add
    .sprite(1010, 448, "skel-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.skel
    .setSize(scene.skel.width * 0.4, scene.skel.height * 0.4)
    .setOffset(scene.skel.width * 0.37, scene.skel.height * 0.55);
  scene.physics.add.collider(scene.player, scene.skel);
};

export const ghostNpc = (
  scene: Phaser.Scene & SceneOneState,
  x: number,
  y: number
) => {
  scene.ghost = scene.physics.add
    .sprite(x, y, "sgr", 0)
    .setCollideWorldBounds(true)
    .setImmovable(true);
};

export const destroyGhost = (scene: Phaser.Scene & SceneOneState) => {
  if (scene.ghost) {
    scene.ghost.destroy();
    scene.ghost = undefined;
  }
};
