export const depthSetting = (scene: any) => {
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
  if (scene.player.y < scene.ghost.y) {
    scene.ghost.setDepth(12);
  } else {
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

export const pathingZombies = (scene: any, delta: number) => {
  const zombieSpeed = 28;
  scene.zomPatrol1 += delta / 1000;
  scene.zomPatrol2 += delta / 1000;
  scene.zomPatrol3 += delta / 1000;

  // ZOMBIE 1
  if (scene.zomPatrol1 <= 14.4) {
    // 14.4 seconds
    scene.zom1.setVelocity(zombieSpeed, 0);
    scene.zom1.anims.play("z-walk-right", true);
  } else if (scene.zomPatrol1 <= 16.4) {
    // 2 seconds
    scene.zom1.setVelocity(0, zombieSpeed);
    scene.zom1.anims.play("z-walk-down", true);
  } else if (scene.zomPatrol1 <= 30.8) {
    // 14.4 seconds
    scene.zom1.setVelocity(-zombieSpeed, 0);
    scene.zom1.anims.play("z-walk-left", true);
  } else if (scene.zomPatrol1 <= 32.8) {
    // 2 seconds
    scene.zom1.setVelocity(0, -zombieSpeed);
    scene.zom1.anims.play("z-walk-up", true);
  } else {
    scene.zomPatrol1 = 0;
  }

  // ZOMBIE 2
  if (scene.zomPatrol2 <= 8.8) {
    scene.zom2.setVelocity(zombieSpeed, 0);
    scene.zom2.anims.play("z-walk-right", true);
  } else if (scene.zomPatrol2 <= 11.2) {
    scene.zom2.setVelocity(0, -zombieSpeed);
    scene.zom2.anims.play("z-walk-up", true);
  } else if (scene.zomPatrol2 <= 20) {
    scene.zom2.setVelocity(-zombieSpeed, 0);
    scene.zom2.anims.play("z-walk-left", true);
  } else if (scene.zomPatrol2 <= 22.4) {
    scene.zom2.setVelocity(0, zombieSpeed);
    scene.zom2.anims.play("z-walk-down", true);
  } else {
    scene.zomPatrol2 = 0;
  }

  // ZOMBIE 3
  if (scene.zomPatrol3 <= 10) {
    scene.zom3.setVelocity(zombieSpeed, 0);
    scene.zom3.anims.play("z-walk-right", true);
  } else if (scene.zomPatrol3 <= 11.6) {
    scene.zom3.setVelocity(0, zombieSpeed);
    scene.zom3.anims.play("z-walk-down", true);
  } else if (scene.zomPatrol3 <= 21.6) {
    scene.zom3.setVelocity(-zombieSpeed, 0);
    scene.zom3.anims.play("z-walk-left", true);
  } else if (scene.zomPatrol3 <= 23.2) {
    scene.zom3.setVelocity(0, -zombieSpeed);
    scene.zom3.anims.play("z-walk-up", true);
  } else {
    scene.zomPatrol3 = 0;
  }
};

export const pathingSkel = (scene: any) => {
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

export const pathingAlch2 = (scene: any) => {
  scene.alchTwin2.anims.play("alch-turn", true);
};

export const pathingAlch1 = (scene: any) => {
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
        scene.time.delayedCall(16000, () => {
          index = (index + 1) % pathPoints.length;
          moveToNextPoint();
        });
      },
    });
  };

  moveToNextPoint(); // start the loop
};
