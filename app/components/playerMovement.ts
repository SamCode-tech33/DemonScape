const playerMovement = (scene: any) => {
  if (scene.movementDisabled) return;
  const walkSpeed = 150;
  const jumpSpeed = 200;
  const runSpeed = 300;

  const isRunning = scene.input.keyboard!.addKey(
    Phaser.Input.Keyboard.KeyCodes.SHIFT
  ).isDown;

  const spaceKey = scene.input.keyboard!.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  const moving =
    scene.keys.left.isDown ||
    scene.keys.right.isDown ||
    scene.keys.up.isDown ||
    scene.keys.down.isDown ||
    scene.keys.w.isDown ||
    scene.keys.a.isDown ||
    scene.keys.s.isDown ||
    scene.keys.d.isDown;

  if (Phaser.Input.Keyboard.JustDown(spaceKey) && !scene.isJumping) {
    scene.isJumping = true;
    let jumpAnim = "";
    let jumpDirection = () => scene.player.setVelocity(0);
    if (
      (scene.keys.right?.isDown && scene.keys.up?.isDown) ||
      (scene.keys.d?.isDown && scene.keys.w?.isDown)
    ) {
      jumpAnim = "jump-right";
      jumpDirection = () =>
        scene.player.setVelocity(jumpSpeed / 1.5, -jumpSpeed / 1.5);
      scene.lastDirection = "right";
    } else if (
      (scene.keys.left?.isDown && scene.keys.up?.isDown) ||
      (scene.keys.a?.isDown && scene.keys.w?.isDown)
    ) {
      jumpAnim = "jump-left";
      jumpDirection = () =>
        scene.player.setVelocity(-jumpSpeed / 1.5, -jumpSpeed / 1.5);
      scene.lastDirection = "right";
    } else if (
      (scene.keys.right?.isDown && scene.keys.down?.isDown) ||
      (scene.keys.d?.isDown && scene.keys.s?.isDown)
    ) {
      jumpAnim = "jump-right";
      jumpDirection = () =>
        scene.player.setVelocity(jumpSpeed / 1.5, jumpSpeed / 1.5);
      scene.lastDirection = "right";
    } else if (
      (scene.keys.left?.isDown && scene.keys.down?.isDown) ||
      (scene.keys.a?.isDown && scene.keys.s?.isDown)
    ) {
      jumpAnim = "jump-left";
      jumpDirection = () =>
        scene.player.setVelocity(-jumpSpeed / 1.5, jumpSpeed / 1.5);
      scene.lastDirection = "right";
    } else if (scene.keys.up?.isDown || scene.keys.w?.isDown) {
      jumpAnim = "jump-up";
      jumpDirection = () => scene.player.setVelocityY(-jumpSpeed);
      scene.lastDirection = "up";
    } else if (scene.keys.left?.isDown || scene.keys.a?.isDown) {
      jumpAnim = "jump-left";
      jumpDirection = () => scene.player.setVelocityX(-jumpSpeed);
      scene.lastDirection = "left";
    } else if (scene.keys.right?.isDown || scene.keys.d?.isDown) {
      jumpAnim = "jump-right";
      jumpDirection = () => scene.player.setVelocityX(jumpSpeed);
      scene.lastDirection = "right";
    } else if (scene.keys.down?.isDown || scene.keys.s?.isDown) {
      jumpAnim = "jump-down";
      jumpDirection = () => scene.player.setVelocityY(jumpSpeed);
      scene.lastDirection = "down";
    } else if (scene.lastDirection === "up") {
      jumpAnim = "static-jump-up";
    } else if (scene.lastDirection === "left") {
      jumpAnim = "static-jump-left";
    } else if (scene.lastDirection === "down") {
      jumpAnim = "static-jump-down";
    } else if (scene.lastDirection === "right") {
      jumpAnim = "static-jump-right";
    }
    scene.player.anims.play(jumpAnim, true);
    jumpDirection();

    scene.time.delayedCall(700, () => {
      scene.isJumping = false;
      scene.player.setVelocity(0);
    });
    return;
  }

  if (moving && !scene.isJumping) {
    scene.player.setVelocity(0);
    if (isRunning) {
      if (
        (scene.keys.right?.isDown && scene.keys.up?.isDown) ||
        (scene.keys.d?.isDown && scene.keys.w?.isDown)
      ) {
        scene.player.setVelocity(runSpeed / 1.5, -runSpeed / 1.5);
        scene.player.anims.play("run-right", true);
        scene.lastDirection = "right";
      } else if (
        (scene.keys.left?.isDown && scene.keys.up?.isDown) ||
        (scene.keys.a?.isDown && scene.keys.w?.isDown)
      ) {
        scene.player.setVelocity(-runSpeed / 1.5, -runSpeed / 1.5);
        scene.player.anims.play("run-left", true);
        scene.lastDirection = "left";
      } else if (
        (scene.keys.right?.isDown && scene.keys.down?.isDown) ||
        (scene.keys.d?.isDown && scene.keys.s?.isDown)
      ) {
        scene.player.setVelocity(runSpeed / 1.5, runSpeed / 1.5);
        scene.player.anims.play("run-right", true);
        scene.lastDirection = "down";
      } else if (
        (scene.keys.left?.isDown && scene.keys.down?.isDown) ||
        (scene.keys.a?.isDown && scene.keys.s?.isDown)
      ) {
        scene.player.setVelocity(-runSpeed / 1.5, runSpeed / 1.5);
        scene.player.anims.play("run-left", true);
        scene.lastDirection = "right";
      } else if (scene.keys.up?.isDown || scene.keys.w?.isDown) {
        scene.player.setVelocityY(-runSpeed);
        scene.player.anims.play("run-up", true);
        scene.lastDirection = "up";
      } else if (scene.keys.left?.isDown || scene.keys.a?.isDown) {
        scene.player.setVelocityX(-runSpeed);
        scene.player.anims.play("run-left", true);
        scene.lastDirection = "left";
      } else if (scene.keys.down?.isDown || scene.keys.s?.isDown) {
        scene.player.setVelocityY(runSpeed);
        scene.player.anims.play("run-down", true);
        scene.lastDirection = "down";
      } else if (scene.keys.right?.isDown || scene.keys.d?.isDown) {
        scene.player.setVelocityX(runSpeed);
        scene.player.anims.play("run-right", true);
        scene.lastDirection = "right";
      } else {
        scene.player.anims.stop();
      }
    } else {
      if (
        (scene.keys.right?.isDown && scene.keys.up?.isDown) ||
        (scene.keys.d?.isDown && scene.keys.w?.isDown)
      ) {
        scene.player.setVelocity(walkSpeed / 1.5, -walkSpeed / 1.5);
        scene.player.anims.play("walk-right", true);
        scene.lastDirection = "right";
      } else if (
        (scene.keys.left?.isDown && scene.keys.up?.isDown) ||
        (scene.keys.a?.isDown && scene.keys.w?.isDown)
      ) {
        scene.player.setVelocity(-walkSpeed / 1.5, -walkSpeed / 1.5);
        scene.player.anims.play("walk-left", true);
        scene.lastDirection = "left";
      } else if (
        (scene.keys.right?.isDown && scene.keys.down?.isDown) ||
        (scene.keys.d?.isDown && scene.keys.s?.isDown)
      ) {
        scene.player.setVelocity(walkSpeed / 1.5, walkSpeed / 1.5);
        scene.player.anims.play("walk-right", true);
        scene.lastDirection = "down";
      } else if (
        (scene.keys.left?.isDown && scene.keys.down?.isDown) ||
        (scene.keys.a?.isDown && scene.keys.s?.isDown)
      ) {
        scene.player.setVelocity(-walkSpeed / 1.5, walkSpeed / 1.5);
        scene.player.anims.play("walk-left", true);
        scene.lastDirection = "right";
      } else if (scene.keys.up?.isDown || scene.keys.w?.isDown) {
        scene.player.setVelocityY(-walkSpeed);
        scene.player.anims.play("walk-up", true);
        scene.lastDirection = "up";
      } else if (scene.keys.left?.isDown || scene.keys.a?.isDown) {
        scene.player.setVelocityX(-walkSpeed);
        scene.player.anims.play("walk-left", true);
        scene.lastDirection = "left";
      } else if (scene.keys.down?.isDown || scene.keys.s?.isDown) {
        scene.player.setVelocityY(walkSpeed);
        scene.player.anims.play("walk-down", true);
        scene.lastDirection = "down";
      } else if (scene.keys.right?.isDown || scene.keys.d?.isDown) {
        scene.player.setVelocityX(walkSpeed);
        scene.player.anims.play("walk-right", true);
        scene.lastDirection = "right";
      } else {
        scene.player.anims.stop();
      }
    }
  } else if (!scene.isJumping) {
    scene.player.setVelocity(0);
    if (scene.lastDirection === "up") {
      scene.player.anims.play("idle-up", true);
    } else if (scene.lastDirection === "left") {
      scene.player.anims.play("idle-left", true);
    } else if (scene.lastDirection === "right") {
      scene.player.anims.play("idle-right", true);
    } else {
      scene.player.anims.play("idle-down", true);
    }
  }
  scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
    if (pointer.leftButtonDown()) {
      scene.movementDisabled = true;
      scene.player.setVelocity(0, 0);
      scene.player.anims.stop();
      if (scene.lastDirection === "up") {
        scene.player.anims.play("halfslash-up", true);
      } else if (scene.lastDirection === "left") {
        scene.player.anims.play("halfslash-left", true);
      } else if (scene.lastDirection === "down") {
        scene.player.anims.play("halfslash-down", true);
      } else if (scene.lastDirection === "right") {
        scene.player.anims.play("halfslash-right", true);
      }
      scene.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        scene.movementDisabled = false;
      });
    }
  });
};

export default playerMovement;
