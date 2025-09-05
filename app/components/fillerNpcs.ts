export const demonCultMembers = (scene: any, cultMemberPositions: any) => {
  scene.npcs = scene.physics.add.group();
  cultMemberPositions.forEach((pos: any, index: number) => {
    if (
      index === 0 ||
      index === 1 ||
      index === 4 ||
      index === 6 ||
      index === 10
    ) {
      scene.npcs.add(
        scene.physics.add
          .sprite(pos.x, pos.y, "w-dcult-sit", 0)
          .setCollideWorldBounds(true)
      );
    } else if (index === 11 || index === 12) {
      scene.npcs.add(
        scene.physics.add
          .sprite(pos.x, pos.y, "dcult-sit", 8)
          .setCollideWorldBounds(true)
      );
    } else {
      scene.npcs.add(
        scene.physics.add
          .sprite(pos.x, pos.y, "dcult-sit", 0)
          .setCollideWorldBounds(true)
      );
    }
  });
  (scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(
    (npc) => {
      npc.body!.setSize(npc.width * 0.33, npc.height * 0.3);
      npc.body!.setOffset(npc.width * 0.33, npc.height * 0.7);
      npc.setImmovable(true);
    }
  );
  scene.physics.add.collider(scene.player, scene.npcs);
};
