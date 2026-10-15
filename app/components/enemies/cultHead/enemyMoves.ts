import type { CombatSceneState } from "../../TB-combat/combatSceneTypes";
import { timerUI, playerUI } from "../../TB-combat/combatUI";
import { playerParried } from "../../TB-combat/combatHelpers";

export const baseAttack = (scene: Phaser.Scene & CombatSceneState) => {
  scene.enemySprite.scene.tweens.add({
    targets: scene.enemySprite,
    x: scene.player.x - 100,
    ease: "Linear",
    duration: 100,
    onStart: () => {
      scene.enemySprite.anims.stop();
      scene.enemySprite.anims.play("cult_head_thrust_left");
    },
    onComplete: () => {
      scene.enemySprite.anims.stop();
      scene.enemySprite.anims.play("cult_head_thrust_left");

      // === DEFENSE QTE SETUP ===
      let dodgeSuccess = false;
      let parrySuccess = false;

      const eKey = scene.input.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.E,
      );
      const qKey = scene.input.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.Q,
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
          if (!dodgeSuccess && !parrySuccess) {
            scene.playerStats.health -= 1000;
            for (let i = 0; i < 2; i++) {
              scene.time.delayedCall(100 * i * 2, () => {
                scene.player.setTint(0xff0000);
                scene.time.delayedCall(100, () => {
                  scene.player.clearTint();
                });
              });
            }
          }
          scene.game.events.emit("updateHUD", {
            player: scene.playerStats,
            enemy: scene.enemy.enemyStats,
          });
          eKey?.off("down", onDodge);
        });
      });

      // Parry: shorter, stricter timing window
      scene.time.delayedCall(200, () => {
        const onParry = () => {
          parrySuccess = true;
          scene.player.anims.play("parry");
          scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            scene.player.anims.play("player-combat-idle-right", true);
          });
          qKey?.off("down", onParry);
        };
        qKey?.on("down", onParry);

        scene.time.delayedCall(200, () => {
          if (!parrySuccess && !dodgeSuccess)
            scene.game.events.emit("updateHUD", {
              player: scene.playerStats,
              enemy: scene.enemy.enemyStats,
            });

          qKey?.off("down", onParry);
        });
      });

      // === After enemy attack animation ===
      scene.enemySprite.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          scene.tweens.add({
            targets: scene.enemySprite,
            x: 1250,
            duration: 200,
            onStart: () => {
              scene.enemySprite.anims.play("cult_head_backstep");
            },
            onComplete: () => {
              scene.enemySprite.anims.stop();
              scene.enemySprite.anims.play("cult_head_combat_idle", true);
              scene.playerTurn = true;
              playerUI(scene);
              timerUI(scene);
            },
          });
        },
      );
    },
  });
};

export const counter = (scene: Phaser.Scene & CombatSceneState) => {
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
      scene.enemySprite.anims.play("cult_head_jump_left");
    },
    onComplete: () => {
      scene.enemySprite.anims.play("cult_head_parry");
      scene.enemySprite.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          playerParried(scene);
          scene.tweens.add({
            targets: scene.enemy,
            x: 1250,
            y: 600,
            ease: "Linear",
            duration: 300,
            onStart: () => {
              scene.enemySprite.anims.stop();
              scene.enemySprite.anims.play("cult_head_backstep", true);
            },
            onComplete: () => {
              scene.enemySprite.anims.play("cult_head_combat_idle");
              scene.time.delayedCall(1200, () => baseAttack(scene));
            },
          });
        },
      );
    },
  });
};

export const idle = (
  scene: Phaser.Scene & CombatSceneState,
): Phaser.Physics.Arcade.Sprite => {
  return scene.physics.add
    .sprite(1250, 620, "zombie-combat-idle", 2)
    .setDepth(8)
    .setScale(6.0);
};
