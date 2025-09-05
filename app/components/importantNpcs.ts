export const cultHeadNpc = (scene: any) => {
  scene.cultHead = scene.physics.add
    .sprite(320, 222, "dcult-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.cultHead
    .setSize(scene.cultHead.width * 0.33, scene.cultHead.height * 0.3)
    .setOffset(scene.cultHead.width * 0.33, scene.cultHead.height * 0.7);
  scene.physics.add.collider(scene.player, scene.cultHead);
};

export const saraNpc = (scene: any) => {
  scene.sara = scene.physics.add
    .sprite(208, 824, "sara-sit", 6)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.sara
    .setSize(scene.sara.width * 0.33, scene.sara.height * 0.3)
    .setOffset(scene.sara.width * 0.33, scene.sara.height * 0.7);
  scene.physics.add.collider(scene.player, scene.sara);
};

export const boxNpc = (scene: any) => {
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

export const alchTwinsNpc = (scene: any) => {
  scene.alchTwin = scene.physics.add
    .sprite(1580, 622, "alch-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.alchTwin
    .setSize(scene.alchTwin.width * 0.33, scene.alchTwin.height * 0.3)
    .setOffset(scene.alchTwin.width * 0.33, scene.alchTwin.height * 0.7);
  scene.physics.add.collider(scene.player, scene.alchTwin);

  scene.alchTwin2 = scene.physics.add
    .sprite(1633, 540, "alch-walk", 35)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.alchTwin2
    .setSize(scene.alchTwin2.width * 0.33, scene.alchTwin2.height * 0.3)
    .setOffset(scene.alchTwin2.width * 0.33, scene.alchTwin2.height * 0.7);
  scene.physics.add.collider(scene.player, scene.alchTwin2);
};

export const skelNpc = (scene: any) => {
  scene.skel = scene.physics.add
    .sprite(1088, 432, "skel-walk", 18)
    .setCollideWorldBounds(true)
    .setImmovable(true);
  scene.skel
    .setSize(scene.skel.width * 0.4, scene.skel.height * 0.4)
    .setOffset(scene.skel.width * 0.37, scene.skel.height * 0.55);
  scene.physics.add.collider(scene.player, scene.skel);
};

export const ghostNpc = (scene: any) => {
  scene.ghost = scene.physics.add
    .sprite(128, 720, "sgr", 0)
    .setCollideWorldBounds(true)
    .setImmovable(true);
};
