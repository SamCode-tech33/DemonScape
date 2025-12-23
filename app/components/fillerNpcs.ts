import type { SceneOneState } from "./levelOne/SceneOneTypes";

export const demonCultMembers = (scene: Phaser.Scene & SceneOneState) => {
  const cultMemberPositions = [
    { x: 128, y: 336, key: "cultist-female-sit", frame: 0 },
    { x: 224, y: 336, key: "cultist-female-sit", frame: 0 },
    { x: 416, y: 336, key: "cultist-male-sit", frame: 0 },
    { x: 512, y: 336, key: "cultist-male-sit", frame: 0 },
    { x: 128, y: 400, key: "cultist-female-sit", frame: 0 },
    { x: 224, y: 400, key: "cultist-male-sit", frame: 0 },
    { x: 416, y: 400, key: "cultist-female-sit", frame: 0 },
    { x: 512, y: 400, key: "cultist-male-sit", frame: 0 },
    { x: 128, y: 464, key: "cultist-male-sit", frame: 0 },
    { x: 224, y: 464, key: "cultist-male-sit", frame: 0 },
    { x: 512, y: 464, key: "cultist-female-sit", frame: 0 },
    { x: 208, y: 192, key: "cultist-male-sit", frame: 8 },
    { x: 432, y: 192, key: "cultist-male-sit", frame: 8 },
  ];

  scene.npcs = scene.physics.add.group();

  cultMemberPositions.forEach(({ x, y, key, frame }) => {
    const npc = scene.physics.add
      .sprite(x, y, key, frame)
      .setCollideWorldBounds(true);

    scene.npcs.add(npc);
  });

  (scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(
    (npc) => {
      npc.body?.setSize(npc.width * 0.33, npc.height * 0.3);
      npc.body?.setOffset(npc.width * 0.33, npc.height * 0.7);
      npc.setImmovable(true);
    }
  );

  scene.physics.add.collider(scene.player, scene.npcs);
};
