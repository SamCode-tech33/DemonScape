import {
  tweenTo,
  playAnim,
  startAnim,
  openQteWindow,
  applyHit,
} from "./combatHelpers";
import { qteUI, playerUI, hideTimerUI } from "./combatUI";
import type { CombatSceneState } from "./combatSceneTypes";
// Create an array of objects for all possible player attacks, most set to hasAbility: false
// if hasAbility: true, then the UI will show that attack
// there will also be a slot: [0-8] for moves equipped, -1 if not equipped (later add to menu a move equip system)
// build UI such that it can hold up to 9 moves

// player speed to effect animation speed
// player goes first if hits before enemy hits

// check for isSpell? int modifier used instead of str

// ringed UI for QTE

// sound effects

// floating damage text

// infra for multi QTE attacks and defense
// misses will show enemy dodge or parry and delete player attackTime

// create an enemy object, 3 to start (bossZom, zom, and cultHead)
// array of objects for all of that enemy's attacks which will be used at random or with different chance weights
// some attacks will need to pass a hasMana? check

// array of takeDamage animations for each enemy, likely just two items

// enemy object will also contain enemyStats which will include level and attributes

// TWEEN AND ANIMATION HELPERS

// PLAYER ATTACKS SECTION
export const playerJumpAttack = async (
  scene: Phaser.Scene & CombatSceneState,
) => {
  const { player, enemySprite } = scene;
  scene.playerAttack = true;
  playerUI(scene);
  qteUI(scene);

  try {
    // 1. Jump to the enemy
    await tweenTo(scene, {
      targets: player,
      x: enemySprite.x - 300,
      y: enemySprite.y - 300,
      ease: "Linear",
      duration: 400,
      onStart: () => startAnim(player, "jump-right-attack"),
    });

    // 2. Jump on the enemy's head
    await tweenTo(scene, {
      targets: player,
      x: enemySprite.x,
      y: enemySprite.y - 255,
      duration: 400,
    });

    // 3. Attack animation with QTE running alongside it (not awaited)
    const qteResult = openQteWindow(scene, 0, 100).then(async (hit) => {
      if (hit) {
        applyHit(scene);
      } else {
        await playAnim(enemySprite, "z-dodge");
        if (!enemySprite.active) return; // enemy destroyed or scene shut down
        startAnim(enemySprite, "zombie-combat-idle-left");
      }
    });
    await playAnim(player, "jump-attack");

    // 4. Drop back down
    await tweenTo(scene, {
      targets: player,
      x: enemySprite.x + 160,
      y: 550,
      duration: 400,
      onStart: () => player.setFrame(19),
    });

    // 5. Jump-off, then run back
    await playAnim(player, "jump-off");
    await tweenTo(scene, {
      targets: player,
      x: 500,
      y: 600,
      duration: 800,
      onStart: () => startAnim(player, "run-left"),
    });
    await qteResult;
  } finally {
    player.anims.stop();
    player.anims.play("player-combat-idle-right");
    scene.playerAttack = false;
    qteUI(scene);
    playerUI(scene);
  }
};

export const playerBaseAttack = async (
  scene: Phaser.Scene & CombatSceneState,
) => {
  const { player, enemySprite } = scene;
  scene.playerAttack = true;
  playerUI(scene);
  qteUI(scene);
  try {
    // 1. Run to the enemy
    await tweenTo(scene, {
      targets: player,
      x: enemySprite.x - 150,
      ease: "Linear",
      duration: 400,
      onStart: () => startAnim(player, "run-right"),
    });

    // 2. Attack animation with QTE running alongside it (not awaited)
    const qteResult = openQteWindow(scene, 220, 320).then(async (hit) => {
      if (hit) {
        applyHit(scene);
      } else {
        await playAnim(enemySprite, "z-dodge");
        if (!enemySprite.active) return; // enemy destroyed or scene shut down
        startAnim(enemySprite, "zombie-combat-idle-left");
      }
    });
    await playAnim(player, "halfslash-right");

    // 3. Run back
    await playAnim(player, "jump-off");
    await tweenTo(scene, {
      targets: player,
      x: 500,
      y: 600,
      duration: 800,
      onStart: () => startAnim(player, "run-left"),
    });
    await qteResult;
  } finally {
    player.anims.stop();
    player.anims.play("player-combat-idle-right");
    scene.playerAttack = false;
    qteUI(scene);
    playerUI(scene);
  }
};

export const enemyTurn = (scene: Phaser.Scene & CombatSceneState) => {
  scene.playerTurn = false;
  hideTimerUI(scene);
  if (scene.playerAttack) {
    scene.enemy.counter(scene);
  } else {
    playerUI(scene);
    hideTimerUI(scene);
    scene.enemy.baseAttack(scene);
    scene.time.addEvent({
      delay: 12000,
      callback: () => {
        enemyTurn(scene);
      },
    });
  }
};
