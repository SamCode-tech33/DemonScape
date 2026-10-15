import type { CombatSceneState } from "./combatSceneTypes";
import { qteUI, playerUI } from "./combatUI";

type Tween = Phaser.Types.Tweens.TweenBuilderConfig;

export const tweenTo = (scene: Phaser.Scene, config: Tween) =>
  new Promise<void>((resolve) => {
    scene.tweens.add({ ...config, onComplete: () => resolve() });
  });

export const playAnim = (
  sprite: Phaser.GameObjects.Sprite,
  key: string,
  ignoreIfPlaying = false,
) =>
  new Promise<void>((resolve) => {
    const done = () => {
      sprite.off(Phaser.Animations.Events.ANIMATION_COMPLETE, done);
      sprite.off(Phaser.Animations.Events.ANIMATION_STOP, done);
      resolve();
    };
    sprite.anims.stop();
    // Attach after stop(), so the stop we trigger ourselves doesn't resolve it
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, done);
    sprite.once(Phaser.Animations.Events.ANIMATION_STOP, done);
    sprite.anims.play(key, ignoreIfPlaying);
  });

export const startAnim = (sprite: Phaser.GameObjects.Sprite, key: string) => {
  sprite.anims.stop();
  sprite.anims.play(key, true);
};

// PLAYER QTE
export const openQteWindow = (
  scene: Phaser.Scene & CombatSceneState,
  msStart: number,
  msFinish: number,
) =>
  new Promise<boolean>((resolve) => {
    const key = scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    const finish = (success: boolean) => {
      key?.off("down", onDown);
      timer.remove(false);
      resolve(success);
    };
    scene.time.delayedCall(msStart, () => key?.on("down", onDown));
    const onDown = () => finish(true);
    const timer = scene.time.delayedCall(msFinish, () => finish(false));
  });

export const applyHit = (scene: Phaser.Scene & CombatSceneState) => {
  scene.enemy.enemyStats.health -= scene.playerStats.meleeDamage;

  for (let i = 0; i < 2; i++) {
    scene.time.delayedCall(200 * i, () => {
      scene.enemySprite.setTint(0xff0000);
      scene.time.delayedCall(100, () => scene.enemySprite.clearTint());
    });
  }
  if (scene.boss) scene.enemySprite.setTint(0x660000);

  scene.game.events.emit("updateHUD", {
    player: scene.playerStats,
    enemy: scene.enemy.enemyStats,
  });
};

export const playerParried = (scene: Phaser.Scene & CombatSceneState) => {
  scene.tweens.add({
    targets: scene.player,
    y: 400,
    duration: 400,
    onStart: () => {
      scene.player.anims.play("pass-out");
      for (let i = 0; i < 2; i++) {
        scene.time.delayedCall(100 * i * 2, () => {
          scene.player.setTint(0xff0000);
          scene.time.delayedCall(100, () => {
            scene.player.clearTint();
          });
        });
      }
    },
    onComplete: () => {
      scene.playerStats.health -= 5;
      scene.game.events.emit("updateHUD", {
        player: scene.playerStats,
        enemy: scene.enemy.enemyStats,
      });
      scene.player.anims.play("get-up");
      scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        scene.tweens.add({
          targets: scene.player,
          x: 400,
          y: 600,
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
