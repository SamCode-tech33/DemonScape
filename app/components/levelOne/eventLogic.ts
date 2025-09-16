import { SceneOneState } from "./SceneOneTypes";

export const cultHeadEvent = (scene: Phaser.Scene & SceneOneState) => {
  scene.tweens.add({
    targets: scene.cultHead,
    y: scene.player.y + 40,
    duration: 1100,
    onStart: () => {
      scene.cultHead.anims.play("cult-head-walk-down", true);
    },
    onComplete: () => {
      scene.tweens.add({
        targets: scene.cultHead,
        x: scene.player.x,
        duration: 500,
        onStart: () => {
          scene.cultHead.anims.play("cult-head-walk-right", true);
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
    scene.scene.launch("CultHead", {
      cultHeadSceneNum: scene.cultHeadSceneNum,
    });
  };
};

export const walkBackCultHead = (scene: Phaser.Scene & SceneOneState) => {
  scene.tweens.add({
    targets: scene.cultHead,
    x: 320,
    duration: 1100,
    onStart: () => {
      scene.cultHead.anims.play("cult-head-walk-left", true);
    },
    onComplete: () => {
      scene.tweens.add({
        targets: scene.cultHead,
        y: 222,
        duration: 2200,
        onStart: () => {
          scene.cultHead.anims.play("cult-head-walk-up", true);
        },
        onComplete: () => {
          scene.cultHead.anims.stop();
          scene.cultHead.setFrame(18);
        },
      });
    },
  });
};

export const demonGhost = (scene: Phaser.Scene & SceneOneState) => {
  scene.tweens.add({
    targets: scene.ghost,
    x: 128,
    y: 715,
    duration: 4000,
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

export const fillerNpcs = (scene: Phaser.Scene & SceneOneState) => {
  const pathing = [
    { x: 48, y: 260, key: "cultist-female-walk-left", frame: 18, male: false },
    { x: 48, y: 290, key: "cultist-female-walk-left", frame: 0, male: false },
    { x: 500, y: 275, key: "cultist-male-walk-up", frame: 27, male: true },
    { x: 540, y: 275, key: "cultist-male-walk-up", frame: 9, male: true },
    {
      x: 900,
      y: 660,
      key: "cultist-female-walk-right",
      frame: 9,
      male: false,
    },
    { x: 320, y: 75, key: "cultist-male-walk-up", frame: 9, male: true },
    {
      x: 850,
      y: 660,
      key: "cultist-female-walk-right",
      frame: 27,
      male: false,
    },
    { x: 590, y: 400, key: "cultist-male-walk-right", frame: 9, male: true },
    { x: 280, y: 75, key: "cultist-male-walk-up", frame: 27, male: true },
    { x: 300, y: 120, key: "cultist-male-walk-up", frame: 0, male: true },
    { x: 412, y: 250, key: "cultist-female-walk-up", frame: 9, male: false },
    { x: 230, y: 540, key: "cultist-male-walk-down", frame: 27, male: true },
    { x: 688, y: 75, key: "cultist-male-walk-right", frame: 18, male: true },
  ];
  (scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(
    (npc, i) => {
      if (pathing[i].male) {
        scene.tweens.add({
          targets: npc,
          x: pathing[i].x,
          y: pathing[i].y,
          duration: 2200,
          onStart: () => {
            npc.anims.play(pathing[i].key, true);
          },
          onComplete: () => {
            npc.anims.stop();
            npc.setFrame(pathing[i].frame);
          },
        });
      } else {
        scene.tweens.add({
          targets: npc,
          x: pathing[i].x,
          y: pathing[i].y,
          duration: 2200,
          onStart: () => {
            npc.anims.play(pathing[i].key, true);
          },
          onComplete: () => {
            npc.anims.stop();
            npc.setFrame(pathing[i].frame);
          },
        });
      }
    }
  );
};
