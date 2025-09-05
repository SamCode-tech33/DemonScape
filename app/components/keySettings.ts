import type { WASDAndArrowKeys } from "@/app/components/demonScapeTypes";

const keySettings = (scene: any) => {
  scene.keys = scene.input.keyboard!.addKeys({
    w: Phaser.Input.Keyboard.KeyCodes.W,
    up: Phaser.Input.Keyboard.KeyCodes.UP,
    s: Phaser.Input.Keyboard.KeyCodes.S,
    down: Phaser.Input.Keyboard.KeyCodes.DOWN,
    a: Phaser.Input.Keyboard.KeyCodes.A,
    left: Phaser.Input.Keyboard.KeyCodes.LEFT,
    d: Phaser.Input.Keyboard.KeyCodes.D,
    right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    space: Phaser.Input.Keyboard.KeyCodes.SPACE,
  }) as WASDAndArrowKeys;
};

export default keySettings;
