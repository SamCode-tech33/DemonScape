import { SceneOneState } from "./levelOne/SceneOneTypes";

export const depthSetting = (scene: Phaser.Scene & SceneOneState) => {
  (scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[]).forEach(
    (npc) => {
      if (scene.player.y < npc.y) {
        npc.setDepth(12);
      } else {
        npc.setDepth(7);
      }
    }
  );

  if (scene.player.y < scene.boxNpc.y) {
    scene.boxNpc.setDepth(33);
  } else {
    scene.boxNpc.setDepth(7);
  }
  if (scene.player.y < scene.cultHead.y) {
    scene.cultHead.setDepth(12);
  } else {
    scene.cultHead.setDepth(7);
  }
  if (scene.ghost && scene.player.y < scene.ghost.y) {
    scene.ghost.setDepth(12);
  } else if (scene.ghost) {
    scene.ghost.setDepth(7);
  }
  if (scene.player.y < scene.alchTwin.y) {
    scene.alchTwin.setDepth(12);
  } else {
    scene.alchTwin.setDepth(7);
  }

  if (scene.player.y < scene.alchTwin2.y) {
    scene.alchTwin2.setDepth(12);
  } else {
    scene.alchTwin2.setDepth(7);
  }

  if (scene.player.y < scene.sara.y) {
    scene.sara.setDepth(12);
  } else {
    scene.sara.setDepth(7);
  }

  if (scene.player.y < scene.skel.y) {
    scene.skel.setDepth(12);
  } else {
    scene.skel.setDepth(7);
  }

  if (scene.player.y < scene.zom1.y) {
    scene.zom1.setDepth(12);
  } else {
    scene.zom1.setDepth(7);
  }

  if (scene.player.y < scene.zom2.y) {
    scene.zom2.setDepth(12);
  } else {
    scene.zom2.setDepth(7);
  }

  if (scene.player.y < scene.zom3.y) {
    scene.zom3.setDepth(12);
  } else {
    scene.zom3.setDepth(7);
  }

  if (scene.ghostCompanion) {
    if (scene.player.y < scene.ghostCompanion.y) {
      scene.ghostCompanion.setDepth(12);
    } else {
      scene.ghostCompanion.setDepth(7);
    }
  }
};

export const pathingZombie1 = (scene: Phaser.Scene & SceneOneState) => {
  const patrolRight = () => {
    scene.tweens.add({
      targets: scene.zom1,
      x: 550,
      duration: 18000,
      ease: "Linear",
      onStart: () => scene.zom1.anims.play("z-walk-right", true),
      onComplete: patrolDown,
    });
  };

  const patrolDown = () => {
    scene.tweens.add({
      targets: scene.zom1,
      y: 922,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom1.anims.play("z-walk-down", true),
      onComplete: patrolLeft,
    });
  };

  const patrolLeft = () => {
    scene.tweens.add({
      targets: scene.zom1,
      x: 128,
      duration: 18000,
      ease: "Linear",
      onStart: () => scene.zom1.anims.play("z-walk-left", true),
      onComplete: patrolUp,
    });
  };

  const patrolUp = () => {
    scene.tweens.add({
      targets: scene.zom1,
      y: 862,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom1.anims.play("z-walk-up", true),
      onComplete: patrolRight,
    });
  };

  // start the patrol
  patrolRight();
};

export const pathingZombie2 = (scene: Phaser.Scene & SceneOneState) => {
  const patrolRight = () => {
    scene.tweens.add({
      targets: scene.zom2,
      x: 400,
      duration: 20000,
      ease: "Linear",
      onStart: () => scene.zom2.anims.play("z-walk-right", true),
      onComplete: patrolDown,
    });
  };

  const patrolDown = () => {
    scene.tweens.add({
      targets: scene.zom2,
      y: 928,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom2.anims.play("z-walk-up", true),
      onComplete: patrolLeft,
    });
  };

  const patrolLeft = () => {
    scene.tweens.add({
      targets: scene.zom2,
      x: 128,
      duration: 20000,
      ease: "Linear",
      onStart: () => scene.zom2.anims.play("z-walk-left", true),
      onComplete: patrolUp,
    });
  };

  const patrolUp = () => {
    scene.tweens.add({
      targets: scene.zom2,
      y: 988,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom2.anims.play("z-walk-down", true),
      onComplete: patrolRight,
    });
  };

  // start the patrol
  patrolRight();
};

export const pathingZombie3 = (scene: Phaser.Scene & SceneOneState) => {
  const patrolRight = () => {
    scene.tweens.add({
      targets: scene.zom3,
      x: 450,
      duration: 22000,
      ease: "Linear",
      onStart: () => scene.zom3.anims.play("z-walk-right", true),
      onComplete: patrolDown,
    });
  };

  const patrolDown = () => {
    scene.tweens.add({
      targets: scene.zom3,
      y: 1085,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom3.anims.play("z-walk-down", true),
      onComplete: patrolLeft,
    });
  };

  const patrolLeft = () => {
    scene.tweens.add({
      targets: scene.zom3,
      x: 150,
      duration: 22000,
      ease: "Linear",
      onStart: () => scene.zom3.anims.play("z-walk-left", true),
      onComplete: patrolUp,
    });
  };

  const patrolUp = () => {
    scene.tweens.add({
      targets: scene.zom3,
      y: 1040,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.zom3.anims.play("z-walk-up", true),
      onComplete: patrolRight,
    });
  };

  // start the patrol
  patrolRight();
};

export const pathingSkel = (scene: Phaser.Scene & SceneOneState) => {
  const moveToNextPoint = () => {
    scene.tweens.add({
      targets: scene.skel,
      x: 1228,
      duration: 6000,
      ease: "Linear",
      onStart: () => scene.skel.anims.play("skel-walk-right", true),
      onComplete: () => {
        scene.skel.anims.stop();
        scene.tweens.add({
          targets: scene.skel,
          x: 1010,
          duration: 6000,
          ease: "Linear",
          onStart: () => scene.skel.anims.play("skel-walk-left", true),
          onComplete: () => {
            scene.skel.anims.stop();
            moveToNextPoint();
          },
        });
      },
    });
  };
  moveToNextPoint();
};

export const pathingAlch2 = (
  scene: Phaser.Scene & SceneOneState,
  index: number
) => {
  scene.alchTwin2.anims.play("alch-idle-right", true);
};

export const pathingAlch1 = (scene: Phaser.Scene & SceneOneState) => {
  const pathPoints = [
    { x: 1488, y: 440, anim: "alch-walk-up", duration: 4000, stop: 0 },
    { x: 1550, y: 610, anim: "alch-walk-down", duration: 4000, stop: 18 },
    { x: 1614, y: 610, anim: "alch-walk-right", duration: 2000, stop: 18 },
    { x: 1676, y: 575, anim: "alch-walk-right", duration: 2000, stop: 27 },
    { x: 1614, y: 610, anim: "alch-walk-left", duration: 3000, stop: 18 },
  ];

  const npc = scene.alchTwin;
  let index = 0;

  const moveToNextPoint = () => {
    const point = pathPoints[index];

    scene.tweens.add({
      targets: npc,
      x: point.x,
      y: point.y,
      duration: point.duration,
      ease: "Linear",
      onStart: () => npc.anims.play(point.anim, true),
      onComplete: () => {
        // Stop animation and show frame 0
        npc.anims.stop();
        npc.setFrame(point.stop);

        // Wait 5 seconds before moving to next point
        scene.time.delayedCall(11000, () => {
          index = (index + 1) % pathPoints.length;
          moveToNextPoint();
        });
      },
    });
  };

  moveToNextPoint(); // start the loop
};
