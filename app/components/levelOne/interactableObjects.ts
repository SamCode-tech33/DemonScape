import type { SceneOneState } from "../levelOne/SceneOneTypes";

export const portal = (scene: Phaser.Scene & SceneOneState) => {
  scene.portal = scene.add.sprite(1235, 525, "portal", 0).setDepth(6);
};

export const door = (scene: Phaser.Scene & SceneOneState) => {
  scene.door = scene.add.sprite(676, 76, "door", 0).setDepth(4);
};

export const puzzleBooks = (scene: Phaser.Scene & SceneOneState) => {
  scene.puzzleBook1 = scene.add.sprite(1065, 415, "puzzleBook", 0).setDepth(4);
  scene.puzzleBook2 = scene.add.sprite(1248, 415, "puzzleBook", 0).setDepth(4);
};

export const chest = (scene: Phaser.Scene & SceneOneState) => {
  scene.chest = scene.add.sprite(945, 160, "chest", 0).setDepth(6);
};
