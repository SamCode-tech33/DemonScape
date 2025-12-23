import type { SceneOneState } from "./levelOne/SceneOneTypes";

const playerSprite = (
  scene: Phaser.Scene & SceneOneState,
  collisionGroup: Phaser.Physics.Arcade.StaticGroup
) => {
  scene.player = scene.physics.add
    .sprite(414, 500, "idle", 4)
    .setDepth(8)
    .setCollideWorldBounds(true);

  scene.physics.add.collider(scene.player, collisionGroup);
  scene.player.body
    .setSize(scene.player.width * 0.25, scene.player.height * 0.3)
    .setOffset(scene.player.width * 0.37, scene.player.height * 0.7);
};

export default playerSprite;
