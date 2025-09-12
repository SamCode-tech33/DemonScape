export const enemyAttack = (scene: any) => {
  scene.playerTurn = false;
  playerUI(scene);
  hideTimerUI(scene);
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

      const fKey = scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.F
      );
      const rKey = scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      );

      // Dodge: longer timing window
      scene.time.delayedCall(200, () => {
        const onDodge = () => {
          dodgeSuccess = true;
          scene.player.anims.play("dodge");
          scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            scene.player.anims.play("player-combat-idle-right", true);
          });
          fKey.off("down", onDodge);
        };
        fKey.on("down", onDodge);

        scene.time.delayedCall(300, () => {
          if (!dodgeSuccess && !parrySuccess) scene.playerStats.health -= 8;
          scene.game.events.emit("updateHUD", {
            player: scene.playerStats,
            enemy: scene.enemyStats,
          });
          fKey.off("down", onDodge);
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
          rKey.off("down", onParry);
        };
        rKey.on("down", onParry);

        scene.time.delayedCall(150, () => {
          if (!parrySuccess && !dodgeSuccess) scene.playerStats.health -= 8;
          scene.game.events.emit("updateHUD", {
            player: scene.playerStats,
            enemy: scene.enemyStats,
          });

          rKey.off("down", onParry);
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

export const playerBaseAttack = (scene: any) => {
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
      // Create a flag to track if damage was triggered
      let qteSuccess = false;

      // Open QTE window shortly before animation ends
      const qteWindow = scene.time.delayedCall(220, () => {
        const spaceKey = scene.input.keyboard.addKey(
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
          spaceKey.off("down", onSpace);
        };

        spaceKey.on("down", onSpace);

        // Close QTE window after a short time
        scene.time.delayedCall(300, () => {
          if (!qteSuccess) {
            console.log("QTE failed, no damage.");
          }
          spaceKey.off("down", onSpace);
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

export const playerJumpAttack = (scene: any) => {
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
      scene.player.anims.play("jump-right", true);
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
          // Create a flag to track if damage was triggered
          let qteSuccess = false;

          // Open QTE window shortly before animation ends
          const qteWindow = scene.time.delayedCall(0, () => {
            const spaceKey = scene.input.keyboard.addKey(
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
              spaceKey.off("down", onSpace);
            };

            spaceKey.on("down", onSpace);

            // Close QTE window after a short time
            scene.time.delayedCall(50, () => {
              if (!qteSuccess) {
                console.log("QTE failed, no damage.");
              }
              spaceKey.off("down", onSpace);
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

const showPlayerUI = (scene: any) => {
  if (!scene.attackVectorBase) {
    scene.attackVectorBase = scene.add
      .graphics()
      .fillStyle(0x000000, 0.6)
      .lineStyle(3, 0xff0000, 1)
      .fillRoundedRect(scene.player.x - 300, scene.player.y - 300, 128, 64, 24)
      .strokeRoundedRect(
        scene.player.x - 300,
        scene.player.y - 300,
        128,
        64,
        24
      )
      .setDepth(50);

    scene.attackVectorBaseText = scene.add
      .text(scene.player.x - 300 + 64, scene.player.y - 300 + 32, "Q-Jump", {
        fontSize: "24px",
        color: "#FF0000",
      })
      .setOrigin(0.5)
      .setDepth(51);

    scene.attackVectorSpecial = scene.add
      .graphics()
      .fillStyle(0x000000, 0.6)
      .lineStyle(3, 0xff0000, 1)
      .fillRoundedRect(scene.player.x + 200, scene.player.y - 300, 128, 64, 24)
      .strokeRoundedRect(
        scene.player.x + 200,
        scene.player.y - 300,
        128,
        64,
        24
      )
      .setDepth(50);

    scene.attackVectorSpecialText = scene.add
      .text(scene.player.x + 200 + 64, scene.player.y - 300 + 32, "E-Punch", {
        fontSize: "24px",
        color: "#FF0000",
      })
      .setOrigin(0.5)
      .setDepth(51);
  }
};

export const timerUI = (scene: any) => {
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
      if (scene.timerValue > 0) {
        scene.timerValue -= 0.05; // decrease 50ms per tick
        scene.timerText.setText(
          `Time to Strike: ${Math.max(scene.timerValue, 0).toFixed(2)}`
        );
      } else {
        scene.timerEvent.remove();
      }
    },
  });
};

const hidePlayerUI = (scene: any) => {
  scene.attackVectorBase?.destroy();
  scene.attackVectorSpecial?.destroy();
  scene.attackVectorBaseText?.destroy();
  scene.attackVectorSpecialText?.destroy();
  scene.attackVectorBase = undefined;
  scene.attackVectorSpecial = undefined;
  scene.attackVectorBaseText = undefined;
  scene.attackVectorSpecialText = undefined;
};

const hideTimerUI = (scene: any) => {
  scene.timerEvent?.destroy();
  scene.timerText?.destroy();
  scene.timerEvent = undefined;
  scene.timerText = undefined;
};

export const playerUI = (scene: any) => {
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

export const qteUI = (scene: any) => {
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

const showDefenseUI = (scene: any) => {
  if (!scene.dodge) {
    scene.dodge = scene.add
      .graphics()
      .fillStyle(0x000000, 0.6)
      .lineStyle(3, 0xff0000, 1)
      .fillRoundedRect(scene.player.x - 200, scene.player.y - 300, 128, 64, 24)
      .strokeRoundedRect(
        scene.player.x - 200,
        scene.player.y - 300,
        128,
        64,
        24
      )
      .setDepth(50);

    scene.dodgeText = scene.add
      .text(scene.player.x - 200 + 64, scene.player.y - 300 + 32, "R-Parry", {
        fontSize: "24px",
        color: "#FF0000",
      })
      .setOrigin(0.5)
      .setDepth(51);

    scene.parry = scene.add
      .graphics()
      .fillStyle(0x000000, 0.6)
      .lineStyle(3, 0xff0000, 1)
      .fillRoundedRect(scene.player.x + 100, scene.player.y - 300, 128, 64, 24)
      .strokeRoundedRect(
        scene.player.x + 100,
        scene.player.y - 300,
        128,
        64,
        24
      )
      .setDepth(50);

    scene.parryText = scene.add
      .text(scene.player.x + 100 + 64, scene.player.y - 300 + 32, "F-Dodge", {
        fontSize: "24px",
        color: "#FF0000",
      })
      .setOrigin(0.5)
      .setDepth(51);
  }
};

const hideDefenseUI = (scene: any) => {
  scene.dodge?.destroy();
  scene.parry?.destroy();
  scene.dodgeText?.destroy();
  scene.parryText?.destroy();
  scene.dodge = undefined;
  scene.dodgeText = undefined;
  scene.parry = undefined;
  scene.parry = undefined;
};
