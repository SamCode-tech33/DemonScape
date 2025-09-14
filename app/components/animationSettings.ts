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

  // PASSOUT ANIMATION

  scene.anims.create({
    key: "pass-out",
    frames: scene.anims.generateFrameNumbers("hurt", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: "get-up",
    frames: scene.anims.generateFrameNumbers("hurt", {
      start: 5,
      end: 0,
    }),
    frameRate: 10,
    repeat: 0,
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
    key: "static-jump-up",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 0,
      end: 4,
    }),
    frameRate: 8,
    repeat: 0,
    yoyo: true,
  });
  scene.anims.create({
    key: "static-jump-left",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 5,
      end: 9,
    }),
    frameRate: 8,
    repeat: 0,
    yoyo: true,
  });
  scene.anims.create({
    key: "static-jump-down",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 10,
      end: 14,
    }),
    frameRate: 8,
    repeat: 0,
    yoyo: true,
  });
  scene.anims.create({
    key: "static-jump-right",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 15,
      end: 19,
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
  scene.anims.create({
    key: "jump-right-attack",
    frames: scene.anims.generateFrameNumbers("jump", {
      start: 15,
      end: 19,
    }),
    frameRate: 16,
    repeat: 0,
  });
  scene.anims.create({
    key: "jump-attack",
    frames: scene.anims.generateFrameNumbers("jump", {
      frames: [16, 17, 18],
    }),
    frameRate: 8,
    repeat: 0,
  });
  scene.anims.create({
    key: "jump-off",
    frames: scene.anims.generateFrameNumbers("jump", {
      frames: [1],
    }),
    frameRate: 12,
    repeat: 0,
  });

  //ATTACK ANIMATION
  scene.anims.create({
    key: "halfslash-up",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: 0,
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
    frameRate: 16,
    repeat: 0,
  });

  // BACK TO IDLE ANIMATION
  scene.anims.create({
    key: "idle-up",
    frames: scene.anims.generateFrameNumbers("idle", {
      start: 0,
      end: 1,
    }),
    frameRate: 0.75,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-left",
    frames: scene.anims.generateFrameNumbers("idle", {
      start: 2,
      end: 3,
    }),
    frameRate: 0.75,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-down",
    frames: scene.anims.generateFrameNumbers("idle", {
      start: 4,
      end: 5,
    }),
    frameRate: 0.75,
    repeat: -1,
  });
  scene.anims.create({
    key: "idle-right",
    frames: scene.anims.generateFrameNumbers("idle", {
      start: 6,
      end: 7,
    }),
    frameRate: 0.75,
    repeat: -1,
  });

  // DODGE
  scene.anims.create({
    key: "dodge",
    frames: scene.anims.generateFrameNumbers("emote", {
      start: 9,
      end: 11,
    }),
    frameRate: 7,
    repeat: 0,
  });

  // DODGE
  scene.anims.create({
    key: "parry",
    frames: scene.anims.generateFrameNumbers("slash", {
      start: 18,
      end: 23,
    }),
    frameRate: 18,
    repeat: 0,
  });
};

// NPC ANIMATIONS

export const cultHeadAnimation = (scene: any) => {
  scene.anims.create({
    key: "cult-head-walk-up",
    frames: scene.anims.generateFrameNumbers("cult-head-walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cult-head-walk-left",
    frames: scene.anims.generateFrameNumbers("cult-head-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cult-head-walk-down",
    frames: scene.anims.generateFrameNumbers("cult-head-walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cult-head-walk-right",
    frames: scene.anims.generateFrameNumbers("cult-head-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export const maleCultistAnimation = (scene: any) => {
  scene.anims.create({
    key: "cultist-male-walk-up",
    frames: scene.anims.generateFrameNumbers("cultist-male-walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-male-walk-left",
    frames: scene.anims.generateFrameNumbers("cultist-male-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-male-walk-down",
    frames: scene.anims.generateFrameNumbers("cultist-male-walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-male-walk-right",
    frames: scene.anims.generateFrameNumbers("cultist-male-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export const femaleCultistAnimation = (scene: any) => {
  scene.anims.create({
    key: "cultist-female-walk-up",
    frames: scene.anims.generateFrameNumbers("cultist-female-walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-female-walk-left",
    frames: scene.anims.generateFrameNumbers("cultist-female-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-female-walk-down",
    frames: scene.anims.generateFrameNumbers("cultist-female-walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "cultist-female-walk-right",
    frames: scene.anims.generateFrameNumbers("cultist-female-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

// ZOMBIE WALK
export const zombieAnimation = (scene: any) => {
  scene.anims.create({
    key: "z-walk-up",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 0,
      end: 8,
    }),
    frameRate: 5,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-left",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 9,
      end: 17,
    }),
    frameRate: 5,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-down",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 18,
      end: 26,
    }),
    frameRate: 5,
    repeat: -1,
  });
  scene.anims.create({
    key: "z-walk-right",
    frames: scene.anims.generateFrameNumbers("zWalk", {
      start: 27,
      end: 35,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // HALFSLASH
  scene.anims.create({
    key: "z-halfslash-up",
    frames: scene.anims.generateFrameNumbers("zHalfslash", {
      start: 0,
      end: 5,
    }),
    frameRate: 6,
    repeat: 0,
  });
  scene.anims.create({
    key: "z-halfslash-left",
    frames: scene.anims.generateFrameNumbers("zHalfslash", {
      start: 7,
      end: 12,
    }),
    frameRate: 6,
    repeat: 0,
  });
  scene.anims.create({
    key: "z-halfslash-down",
    frames: scene.anims.generateFrameNumbers("zHalfslash", {
      start: 14,
      end: 19,
    }),
    frameRate: 6,
    repeat: 0,
  });
  scene.anims.create({
    key: "z-halfslash-right",
    frames: scene.anims.generateFrameNumbers("zHalfslash", {
      start: 21,
      end: 26,
    }),
    frameRate: 6,
    repeat: 0,
  });
  // PARRY
  scene.anims.create({
    key: "z-parry-left",
    frames: scene.anims.generateFrameNumbers("z-slash", {
      start: 6,
      end: 11,
    }),
    frameRate: 18,
    repeat: 0,
  });
  // JUMP
  scene.anims.create({
    key: "z-jump-left",
    frames: scene.anims.generateFrameNumbers("z-jump", {
      start: 6,
      end: 11,
    }),
    frameRate: 18,
    repeat: 0,
  });
  // PASSOUT
  scene.anims.create({
    key: "z-pass-out",
    frames: scene.anims.generateFrameNumbers("z-hurt", {
      start: 0,
      end: 5,
    }),
    frameRate: 4,
    repeat: 0,
  });
};

// ALCHEMIST ANIMATION
export const alchTwinsAnimation = (scene: any) => {
  scene.anims.create({
    key: "alch-idle-right",
    frames: scene.anims.generateFrameNumbers("alch-idle", {
      start: 6,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "alch-idle-down",
    frames: scene.anims.generateFrameNumbers("alch-idle", {
      start: 4,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "alch-walk-up",
    frames: scene.anims.generateFrameNumbers("alch-walk", {
      start: 0,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "alch-walk-left",
    frames: scene.anims.generateFrameNumbers("alch-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "alch-walk-down",
    frames: scene.anims.generateFrameNumbers("alch-walk", {
      start: 18,
      end: 26,
    }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: "alch-walk-right",
    frames: scene.anims.generateFrameNumbers("alch-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 8,
    repeat: -1,
  });
};

// FLAME ANIMATION
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

// TORCHES
export const alchTorchAnimation = (scene: any, alchemyPositions: any) => {
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

// SKEL MAN
export const skelManAnimation = (scene: any) => {
  scene.anims.create({
    key: "skel-walk-left",
    frames: scene.anims.generateFrameNumbers("skel-walk", {
      start: 27,
      end: 35,
    }),
    frameRate: 12,
    repeat: -1,
  });
  scene.anims.create({
    key: "skel-walk-right",
    frames: scene.anims.generateFrameNumbers("skel-walk", {
      start: 9,
      end: 17,
    }),
    frameRate: 12,
    repeat: -1,
  });
};
