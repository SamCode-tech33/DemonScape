import type { CombatSceneState } from "./combatSceneTypes";

export const playerCombatAnimation = (
  scene: Phaser.Scene & CombatSceneState
) => {
  scene.anims.create({
    key: "player-combat-idle-right",
    frames: scene.anims.generateFrameNumbers("player-combat-idle", {
      start: 6,
      end: 7,
    }),
    frameRate: 3,
    repeat: -1,
  });
  scene.anims.create({
    key: "halfslash-left",
    frames: scene.anims.generateFrameNumbers("halfslash", {
      start: 7,
      end: 16,
    }),
    frameRate: 12,
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

  // PARRY
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

export const zombieCombatAnimation = (
  scene: Phaser.Scene & CombatSceneState
) => {
  scene.anims.create({
    key: "zombie-combat-idle-left",
    frames: scene.anims.generateFrameNumbers("zombie-combat-idle", {
      start: 2,
      end: 3,
    }),
    frameRate: 1.5,
    repeat: -1,
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
