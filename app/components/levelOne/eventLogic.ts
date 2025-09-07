import { SceneOneState } from "./SceneOneTypes";

export const cultHeadEvent = (scene: Phaser.Scene & SceneOneState) => {
  scene.tweens.add({
    targets: scene.cultHead,
    y: scene.player.y + 40,
    duration: 1100,
    onStart: () => {
      scene.cultHead.anims.play("dcult-walk-down", true);
    },
    onComplete: () => {
      scene.tweens.add({
        targets: scene.cultHead,
        x: scene.player.x,
        duration: 500,
        onStart: () => {
          scene.cultHead.anims.play("dcult-walk-right", true);
        },
        onComplete: () => {
          scene.cultHead.anims.stop();
          scene.cultHead.setFrame(0);
          startConversation();
        },
      });
    },
  });

  const startConversation = () => {
    scene.backgroundMusic.stop();
    scene.scene.pause("SceneOne");
    scene.scene.launch("CultHead");
  };
};

export const demonGhost = (scene: Phaser.Scene & SceneOneState) => {
  scene.tweens.add({
    targets: scene.ghost,
    x: 128,
    y: 715,
    duration: 3300,
    onComplete: () => {
      scene.tweens.add({
        targets: scene.ghost,
        y: 725,
        yoyo: true,
        duration: 1000,
        repeat: -1,
      });
    },
  });
};

export const walkBackCultHead = (scene: any) => {
  scene.tweens.add({
    targets: scene.cultHead,
    x: 320,
    duration: 1100,
    onStart: () => {
      scene.cultHead.anims.play("dcult-walk-left", true);
    },
    onComplete: () => {
      scene.tweens.add({
        targets: scene.cultHead,
        y: 222,
        duration: 2200,
        onStart: () => {
          scene.cultHead.anims.play("dcult-walk-up", true);
        },
        onComplete: () => {
          scene.cultHead.anims.stop();
          scene.cultHead.setFrame(18);
        },
      });
    },
  });
};
