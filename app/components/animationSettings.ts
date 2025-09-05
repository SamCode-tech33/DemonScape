export const playerAnimation = (scene: any) => {
  //WALKING ANIMATION
  scene.anims.create({
    key: "walk-up",
    frames: scene.anims.generateFrameNumbers("walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "walk-left",
    frames: scene.anims.generateFrameNumbers("walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "walk-down",
    frames: scene.anims.generateFrameNumbers("walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "walk-right",
    frames: scene.anims.generateFrameNumbers("walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //RUNNING ANIMATION
  scene.anims.create({
    key: "run-up",
    frames: scene.anims.generateFrameNumbers("run", {
      start: 0,
      end: 7,
    }),
    frameRate: 12,
    repeat: -1,
  });
  scene.anims.create({
    key: "run-left",
    frames: scene.anims.generateFrameNumbers("run", {
      start: 8,
      end: 15,
    }),
    frameRate: 12,
    repeat: -1,
  });

  scene.anims.create({
    key: "run-down",
    frames: scene.anims.generateFrameNumbers("run", {
      start: 16,
      end: 23,
    }),
    frameRate: 12,
    repeat: -1,
  });
  scene.anims.create({
    key: "run-right",
    frames: scene.anims.generateFrameNumbers("run", {
      start: 24,
      end: 31,
    }),
    frameRate: 12,
    repeat: -1,
  });

  //JUMPING ANIMATION
  scene.anims.create({
    key: "jump",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 0,
      end: 4,
    }),
    frameRate: 8,
    repeat: 0,
    yoyo: true,
  });
  scene.anims.create({
    key: "jump-up",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 0,
      end: 4,
    }),
    frameRate: 8,
    repeat: 0,
  });
  scene.anims.create({
    key: "jump-left",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 5,
      end: 9,
    }),
    frameRate: 8,
    repeat: 0,
  });
  scene.anims.create({
    key: "jump-down",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 10,
      end: 14,
    }),
    frameRate: 8,
    repeat: 0,
  });
  scene.anims.create({
    key: "jump-right",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 15,
      end: 19,
    }),
    frameRate: 8,
    repeat: 0,
  });

  //ATTACK ANIMATION
  scene.anims.create({
    key: "halfslash-forward",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: 0,
    yoyo: true,
  });
  scene.anims.create({
    key: "halfslash-left",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 7,
      end: 12,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: "halfslash-down",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 14,
      end: 19,
    }),
    frameRate: 8,
    repeat: 0,
  });
  scene.anims.create({
    key: "halfslash-right",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 21,
      end: 26,
    }),
    frameRate: 8,
    repeat: 0,
  });

  // BACK TO IDLE ANIMATION
  scene.anims.create({
    key: "idle-up",
    frames: [{ key: "walk", frame: 0 }],
    frameRate: 1,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-left",
    frames: [{ key: "walk", frame: 9 }],
    frameRate: 1,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-right",
    frames: [{ key: "walk", frame: 27 }],
    frameRate: 1,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-down",
    frames: [{ key: "walk", frame: 18 }],
    frameRate: 1,
    repeat: -1,
  });
};

export const cultHeadAnimation = (scene: any) => {
  scene.anims.create({
    key: "dcult-walk-up",
    frames: scene.anims.generateFrameNumbers("dcult-walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "dcult-walk-left",
    frames: scene.anims.generateFrameNumbers("dcult-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "dcult-walk-down",
    frames: scene.anims.generateFrameNumbers("dcult-walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "dcult-walk-right",
    frames: scene.anims.generateFrameNumbers("dcult-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export const zombieAnimation = (scene: any) => {
  scene.anims.create({
    key: "z-walk-up",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-left",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-down",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-right",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export const torchAnimation = (scene: any, torchPositions: any) => {
  scene.anims.create({
    key: "torch",
    frames: scene.anims.generateFrameNumbers("torch", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  scene.animatedTorches = torchPositions.map((pos: any, index: number) => {
    const torch = scene.add.sprite(pos.x, pos.y, "torch");
    torch.play("torch");
    if (index < 6) {
      torch.setDepth(24);
    } else {
      torch.setDepth(7);
    }
    return torch;
  });
};

export const alchAnimation = (scene: any, alchemyPositions: any) => {
  scene.anims.create({
    key: "alch",
    frames: scene.anims.generateFrameNumbers("alchemy", {
      start: 0,
      end: 2,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.animatedTorches = alchemyPositions.map((pos: any) => {
    const torch = scene.add.sprite(pos.x, pos.y, "alch");
    torch.play("alch");
    torch.setDepth(6);
    return torch;
  });
};
