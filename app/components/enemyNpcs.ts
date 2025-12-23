import type { SceneOneState } from "./levelOne/SceneOneTypes";

export const zombies = (scene: Phaser.Scene & SceneOneState) => {
  scene.zom1 = scene.physics.add
    .sprite(128, 862, "zWalk", 27)
    .setDepth(7)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.zom1
    .setSize(scene.zom1.width * 0.33, scene.zom1.height * 0.3)
    .setOffset(scene.zom1.width * 0.33, scene.zom1.height * 0.7);
  scene.physics.add.collider(scene.player, scene.zom1);

  scene.zom2 = scene.physics.add
    .sprite(128, 988, "zWalk", 27)
    .setDepth(7)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.zom2
    .setSize(scene.zom2.width * 0.33, scene.zom2.height * 0.3)
    .setOffset(scene.zom2.width * 0.33, scene.zom2.height * 0.7);
  scene.physics.add.collider(scene.player, scene.zom2);

  scene.zom3 = scene.physics.add
    .sprite(150, 1040, "zWalk", 27)
    .setDepth(7)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.zom3
    .setSize(scene.zom3.width * 0.33, scene.zom3.height * 0.3)
    .setOffset(scene.zom3.width * 0.33, scene.zom3.height * 0.7);
  scene.physics.add.collider(scene.player, scene.zom3);
};
