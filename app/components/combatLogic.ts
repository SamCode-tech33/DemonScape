import type { CombatSceneState, TweenableGameObject } from "./combatSceneTypes";

export const enemyAttack = (scene: Phaser.Scene & CombatSceneState) => {
  scene.playerTurn = false;
  hideTimerUI(scene);
  if (scene.playerAttack) {
    scene.tweens.killTweensOf(scene.player);
    scene.tweens.killTweensOf(scene.enemy);
    scene.playerAttack = false;
    scene.tweens.add({
      targets: scene.enemy,
      x: scene.player.x + 150,
      y: scene.player.y,
      ease: "Linear",
      duration: 300,
      onStart: () => {
        scene.enemy.anims.play("z-jump-left");
      },
      onComplete: () => {
        scene.enemy.anims.play("z-parry-left");
        scene.enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          playerParried(scene);
          scene.tweens.add({
            targets: scene.enemy,
            x: 1150,
            y: 600,
            ease: "Linear",
            duration: 300,
            onStart: () => {
              scene.enemy.anims.stop();
              scene.enemy.anims.play("z-walk-right", true);
            },
            onComplete: () => {
              scene.enemy.anims.play("zombie-combat-idle-left");
              scene.time.delayedCall(
                1200,
                () => enemyAttackBasic(scene)
                //playerUI(scene)
              );
            },
          });
        });
      },
    });
  } else {
    playerUI(scene);
    hideTimerUI(scene);
    enemyAttackBasic(scene);
  }
};

export const playerBaseAttack = (scene: Phaser.Scene & CombatSceneState) => {
  scene.playerAttack = true;
  playerUI(scene);
  qteUI(scene);
  scene.player.scene.tweens.add({
    targets: scene.player,
    x: scene.enemy.x - 150,
    ease: "Linear",
    duration: 400,
    onStart: () => {
      scene.player.anims.stop();
      scene.player.anims.play("run-right", true);
    },
    onComplete: () => {
      scene.player.anims.stop();
      scene.player.anims.play("halfslash-right");

      // === QTE SETUP ===
      let qteSuccess = false;

      // Open QTE window shortly before animation ends
      scene.time.delayedCall(220, () => {
        const spaceKey = scene.input.keyboard?.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        const onSpace = () => {
          qteSuccess = true;
          scene.enemyStats.health -= 1; // damage logic
          scene.game.events.emit("updateHUD", {
            player: scene.playerStats,
            enemy: scene.enemyStats,
          });

          // remove listener after success
          spaceKey?.off("down", onSpace);
        };

        spaceKey?.on("down", onSpace);

        // Close QTE window after a short time
        scene.time.delayedCall(300, () => {
          if (!qteSuccess) {
            console.log("QTE failed, no damage.");
          }
          spaceKey?.off("down", onSpace);
        });
      });
      scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        scene.tweens.add({
          targets: scene.player,
          x: 600,
          duration: 400,
          onStart: () => {
            scene.player.anims.play("run-left", true);
          },
          onComplete: () => {
            scene.player.anims.stop();
            scene.player.anims.play("player-combat-idle-right");
            scene.playerAttack = false;
            qteUI(scene);
            playerUI(scene);
          },
        });
      });
    },
  });
};

export const playerJumpAttack = (scene: Phaser.Scene & CombatSceneState) => {
  scene.playerAttack = true;
  playerUI(scene);
  qteUI(scene);
  scene.player.scene.tweens.add({
    targets: scene.player,
    x: scene.enemy.x - 300,
    y: scene.enemy.y - 300,
    ease: "Linear",
    duration: 400,
    onStart: () => {
      scene.player.anims.stop();
      scene.player.anims.play("jump-right-attack", true);
    },
    onComplete: () => {
      scene.tweens.add({
        targets: scene.player,
        x: scene.enemy.x,
        y: scene.enemy.y - 255,
        duration: 400,
        onComplete: () => {
          scene.player.anims.stop();
          scene.player.anims.play("jump-attack");

          // === QTE SETUP ===
          let qteSuccess = false;

          // Open QTE window shortly before animation ends
          scene.time.delayedCall(0, () => {
            const spaceKey = scene.input.keyboard?.addKey(
              Phaser.Input.Keyboard.KeyCodes.SPACE
            );

            const onSpace = () => {
              qteSuccess = true;
              scene.enemyStats.health -= 2; // damage logic
              scene.game.events.emit("updateHUD", {
                player: scene.playerStats,
                enemy: scene.enemyStats,
              });

              // remove listener after success
              spaceKey?.off("down", onSpace);
            };

            spaceKey?.on("down", onSpace);

            // Close QTE window after a short time
            scene.time.delayedCall(50, () => {
              if (!qteSuccess) {
                console.log("QTE failed, no damage.");
              }
              spaceKey?.off("down", onSpace);
            });
          });
          scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            scene.tweens.add({
              targets: scene.player,
              y: 550,
              x: scene.enemy.x + 160,
              duration: 400,
              onStart: () => {
                scene.player.setFrame(19);
              },
              onComplete: () => {
                scene.player.anims.play("jump-off");
                scene.player.once(
                  Phaser.Animations.Events.ANIMATION_COMPLETE,
                  () => {
                    scene.tweens.add({
                      targets: scene.player,
                      x: 600,
                      y: 600,
                      duration: 800,
                      onStart: () => {
                        scene.player.anims.play("run-left", true);
                      },
                      onComplete: () => {
                        scene.player.anims.stop();
                        scene.player.anims.play("player-combat-idle-right");
                        scene.playerAttack = false;
                        qteUI(scene);
                        playerUI(scene);
                      },
                    });
                  }
                );
              },
            });
          });
        },
      });
    },
  });
};

export const timerUI = (scene: Phaser.Scene & CombatSceneState) => {
  scene.timerValue = 12.0; // seconds with milliseconds
  scene.timerText = scene.add
    .text(
      scene.player.x,
      scene.player.y - 420,
      `Time to Strike: ${scene.timerValue.toFixed(2)}`,
      {
        fontSize: "24px",
        color: "#FFFF00",
      }
    )
    .setOrigin(0.5)
    .setDepth(52);

  // Timer update event
  scene.timerEvent = scene.time.addEvent({
    delay: 50, // update every 50ms
    loop: true,
    callback: () => {
      if (scene.timerValue > 0 && scene.timerText) {
        scene.timerValue -= 0.05; // decrease 50ms per tick
        scene.timerText.setText(
          `Time to Strike: ${Math.max(scene.timerValue, 0).toFixed(2)}`
        );
      } else if (scene.timerEvent) {
        scene.timerEvent.remove();
      }
    },
  });
};

export const playerUI = (scene: Phaser.Scene & CombatSceneState) => {
  if (scene.playerTurn && !scene.playerAttack) {
    showPlayerUI(scene);
    hideDefenseUI(scene);
  } else if (!scene.playerTurn) {
    showDefenseUI(scene);
    hidePlayerUI(scene);
  } else {
    hidePlayerUI(scene);
  }
};

export const qteUI = (scene: Phaser.Scene & CombatSceneState) => {
  if (scene.playerAttack) {
    scene.qte = scene.add
      .graphics()
      .fillStyle(0x000000, 0.6)
      .lineStyle(3, 0xff0000, 1)
      .fillRoundedRect(scene.enemy.x + 150, scene.enemy.y - 300, 64, 64, 24)
      .strokeRoundedRect(scene.enemy.x + 150, scene.enemy.y - 300, 64, 64, 24)
      .setDepth(50);

    scene.qteText = scene.add
      .text(scene.enemy.x + 150 + 32, scene.enemy.y - 300 + 32, "␣", {
        fontSize: "32px",
        color: "#FF0000",
      })
      .setOrigin(0.5)
      .setDepth(51);
  } else {
    scene.qte?.destroy();
    scene.qteText?.destroy();
    scene.qte = undefined;
    scene.qte = undefined;
  }
};

const popOut = (
  scene: Phaser.Scene,
  targets: TweenableGameObject[],
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  delay = 0,
  onComplete?: () => void
) => {
  targets.forEach((t) => {
    t.setPosition(fromX, fromY);
    t.setScale(0.2);
    t.setAlpha(0);
  });

  scene.tweens.add({
    targets,
    x: toX,
    y: toY,
    scale: 1,
    alpha: 0.5,
    duration: 500,
    delay,
    ease: "Back.Out",
    onComplete,
  });
};

const floaty = (scene: Phaser.Scene, targets: TweenableGameObject[]) => {
  scene.tweens.add({
    targets,
    y: "+=11",
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });
};

const createSparkles = (
  scene: Phaser.Scene & CombatSceneState,
  x: number,
  y: number
) => {
  const particles = scene.add.particles(x, y, "spark", {
    emitting: true,
    speed: { min: 20, max: 80 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.8, end: 0 },
    alpha: { start: 0.9, end: 0 },
    lifespan: { min: 800, max: 1400 },
    quantity: 2,
    frequency: 250,
    gravityY: -20,
    blendMode: "ADD",
  });
  particles.setDepth(52);
  return particles;
};

const showPlayerUI = (scene: Phaser.Scene & CombatSceneState) => {
  if (scene.attackVectorBase) return;

  const cx = scene.player.x;
  const cy = scene.player.y;

  // === BASE (Q) ===
  scene.attackVectorBase = scene.add
    .graphics()
    .fillStyle(0x000000, 0.5)
    .lineStyle(3, 0xff0000, 1)
    .fillRoundedRect(-64, -32, 128, 64, 32)
    .strokeRoundedRect(-64, -32, 128, 64, 32)
    .setDepth(50)
    .setAlpha(0.3);

  scene.attackVectorBaseText = scene.add
    .text(0, 0, "Q-Jump", {
      fontSize: "24px",
      color: "#FF0000",
    })
    .setOrigin(0.5)
    .setDepth(51);

  // === SPECIAL (E) ===
  scene.attackVectorSpecial = scene.add
    .graphics()
    .fillStyle(0x000000, 0.5)
    .lineStyle(3, 0xff0000, 1)
    .fillRoundedRect(-64, -32, 128, 64, 32)
    .strokeRoundedRect(-64, -32, 128, 64, 32)
    .setDepth(50)
    .setAlpha(0.3);

  scene.attackVectorSpecialText = scene.add
    .text(0, 0, "E-Punch", {
      fontSize: "24px",
      color: "#FF0000",
    })
    .setOrigin(0.5)
    .setDepth(51);

  // === FINAL POSITIONS ===
  const baseX = cx - 200;
  const baseY = cy - 200;

  const specialX = cx + 200;
  const specialY = cy - 200;

  // === POP OUT ===
  popOut(
    scene,
    [scene.attackVectorBase, scene.attackVectorBaseText],
    cx,
    cy,
    baseX,
    baseY,
    100,
    () => {
      if (scene.attackVectorBase && scene.attackVectorBaseText) {
        floaty(scene, [scene.attackVectorBase, scene.attackVectorBaseText]);
      }
    }
  );

  popOut(
    scene,
    [scene.attackVectorSpecial, scene.attackVectorSpecialText],
    cx,
    cy,
    specialX,
    specialY,
    100,
    () => {
      if (scene.attackVectorSpecial && scene.attackVectorSpecialText) {
        floaty(scene, [
          scene.attackVectorSpecial,
          scene.attackVectorSpecialText,
        ]);
      }
    }
  );

  // === SPARKLES ===
  scene.sparklesPlayer = [
    createSparkles(scene, baseX, baseY),
    createSparkles(scene, specialX, specialY),
  ];
};

const hidePlayerUI = (scene: Phaser.Scene & CombatSceneState) => {
  scene.attackVectorBase?.destroy();
  scene.attackVectorSpecial?.destroy();
  scene.attackVectorBaseText?.destroy();
  scene.attackVectorSpecialText?.destroy();
  scene.sparklesPlayer?.forEach((s) => {
    s.destroy();
  });
  scene.attackVectorBase = undefined;
  scene.attackVectorSpecial = undefined;
  scene.attackVectorBaseText = undefined;
  scene.attackVectorSpecialText = undefined;
};

const hideTimerUI = (scene: Phaser.Scene & CombatSceneState) => {
  scene.timerEvent?.destroy();
  scene.timerText?.destroy();
  scene.timerEvent = undefined;
  scene.timerText = undefined;
};

const showDefenseUI = (scene: Phaser.Scene & CombatSceneState) => {
  if (scene.dodge) return;

  const cx = scene.player.x;
  const cy = scene.player.y;

  // === DODGE / PARRY (R) ===
  scene.dodge = scene.add
    .graphics()
    .fillStyle(0x000000, 0.5)
    .lineStyle(3, 0xff0000, 1)
    .fillRoundedRect(-64, -32, 128, 64, 32)
    .strokeRoundedRect(-64, -32, 128, 64, 32)
    .setDepth(50)
    .setAlpha(0.3);

  scene.dodgeText = scene.add
    .text(0, 0, "E-Dodge", {
      fontSize: "24px",
      color: "#FF0000",
    })
    .setOrigin(0.5)
    .setDepth(51);

  // === DODGE (F) ===
  scene.parry = scene.add
    .graphics()
    .fillStyle(0x000000, 0.5)
    .lineStyle(3, 0xff0000, 1)
    .fillRoundedRect(-64, -32, 128, 64, 32)
    .strokeRoundedRect(-64, -32, 128, 64, 32)
    .setDepth(50)
    .setAlpha(0.3);

  scene.parryText = scene.add
    .text(0, 0, "Q-Parry", {
      fontSize: "24px",
      color: "#FF0000",
    })
    .setOrigin(0.5)
    .setDepth(51);

  // === FINAL POSITIONS ===
  const dodgeX = cx + 200;
  const dodgeY = cy - 200;

  const parryX = cx - 200;
  const parryY = cy - 200;

  // === POP OUT + FLOATY ===
  popOut(
    scene,
    [scene.dodge, scene.dodgeText],
    cx,
    cy,
    dodgeX,
    dodgeY,
    120,
    () => {
      if (scene.dodge && scene.dodgeText) {
        floaty(scene, [scene.dodge, scene.dodgeText]);
      }
    }
  );

  popOut(
    scene,
    [scene.parry, scene.parryText],
    cx,
    cy,
    parryX,
    parryY,
    160,
    () => {
      if (scene.parry && scene.parryText) {
        floaty(scene, [scene.parry, scene.parryText]);
      }
    }
  );

  // === SPARKLES ===
  scene.sparklesDefense = [
    createSparkles(scene, dodgeX, dodgeY),
    createSparkles(scene, parryX, parryY),
  ];
};

const hideDefenseUI = (scene: Phaser.Scene & CombatSceneState) => {
  scene.dodge?.destroy();
  scene.parry?.destroy();
  scene.dodgeText?.destroy();
  scene.parryText?.destroy();
  scene.sparklesDefense?.forEach((s) => {
    s.destroy();
  });
  scene.dodge = undefined;
  scene.dodgeText = undefined;
  scene.parry = undefined;
  scene.parry = undefined;
};

const enemyAttackBasic = (scene: Phaser.Scene & CombatSceneState) => {
  scene.enemy.scene.tweens.add({
    targets: scene.enemy,
    x: scene.player.x + 150,
    ease: "Linear",
    duration: 2000,
    onStart: () => {
      scene.enemy.anims.stop();
      scene.enemy.anims.play("z-walk-left", true);
    },
    onComplete: () => {
      scene.enemy.anims.stop();
      scene.enemy.anims.play("z-halfslash-left");

      // === DEFENSE QTE SETUP ===
      let dodgeSuccess = false;
      let parrySuccess = false;

      const eKey = scene.input.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.E
      );
      const qKey = scene.input.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.Q
      );

      // Dodge: longer timing window
      scene.time.delayedCall(200, () => {
        const onDodge = () => {
          dodgeSuccess = true;
          scene.player.anims.play("dodge");
          scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            scene.player.anims.play("player-combat-idle-right", true);
          });
          eKey?.off("down", onDodge);
        };
        eKey?.on("down", onDodge);

        scene.time.delayedCall(300, () => {
          if (!dodgeSuccess && !parrySuccess) scene.playerStats.health -= 10;
          scene.game.events.emit("updateHUD", {
            player: scene.playerStats,
            enemy: scene.enemyStats,
          });
          eKey?.off("down", onDodge);
        });
      });

      // Parry: shorter, stricter timing window
      scene.time.delayedCall(300, () => {
        const onParry = () => {
          parrySuccess = true;
          scene.player.anims.play("parry");
          scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            scene.player.anims.play("player-combat-idle-right", true);
          });
          qKey?.off("down", onParry);
        };
        qKey?.on("down", onParry);

        scene.time.delayedCall(150, () => {
          if (!parrySuccess && !dodgeSuccess)
            scene.game.events.emit("updateHUD", {
              player: scene.playerStats,
              enemy: scene.enemyStats,
            });

          qKey?.off("down", onParry);
        });
      });

      // === After enemy attack animation ===
      scene.enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        scene.tweens.add({
          targets: scene.enemy,
          x: 1150,
          duration: 2000,
          onStart: () => {
            scene.enemy.anims.play("z-walk-right", true);
          },
          onComplete: () => {
            scene.enemy.anims.stop();
            scene.enemy.anims.play("zombie-combat-idle-left");
            scene.playerTurn = true;
            playerUI(scene);
            timerUI(scene);
            scene.time.addEvent({
              delay: 12000,
              callback: () => {
                enemyAttack(scene);
              },
            });
          },
        });
      });
    },
  });
};

const playerParried = (scene: Phaser.Scene & CombatSceneState) => {
  scene.tweens.add({
    targets: scene.player,
    y: 600,
    duration: 400,
    onStart: () => {
      scene.player.anims.play("pass-out");
    },
    onComplete: () => {
      scene.playerStats.health -= 5;
      scene.game.events.emit("updateHUD", {
        player: scene.playerStats,
        enemy: scene.enemyStats,
      });
      scene.player.anims.play("get-up");
      scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        scene.tweens.add({
          targets: scene.player,
          y: 600,
          x: 600,
          duration: 400,
          onStart: () => {
            scene.player.anims.play("run-left");
          },
          onComplete: () => {
            scene.player.anims.stop();
            scene.player.anims.play("player-combat-idle-right", true);
            qteUI(scene);
            playerUI(scene);
          },
        });
      });
    },
  });
};
