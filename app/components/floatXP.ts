interface FadingTextOptions {
  fontSize?: string;
  color?: string;
  riseDistance?: number;
  fadeInDuration?: number;
  holdDuration?: number;
  fadeOutDuration?: number;
  destroyOnComplete?: boolean;
}

export default function floatXP(
  scene: Phaser.Scene,
  x: number,
  y: number,
  message: string,
  options: FadingTextOptions = {},
): Phaser.GameObjects.Text {
  const {
    fontSize = "16px",
    color = "#8A2BE2",
    riseDistance = 50,
    fadeInDuration = 600,
    holdDuration = 400,
    fadeOutDuration = 600,
    destroyOnComplete = true,
  } = options;

  const text = scene.add
    .text(x, y, message, {
      fontSize,
      color,
    })
    .setOrigin(0.5)
    .setAlpha(0)
    .setDepth(99);

  scene.tweens.chain({
    targets: text,
    tweens: [
      {
        alpha: 1,
        y: y - riseDistance * 0.5,
        duration: fadeInDuration,
        ease: "Sine.easeOut",
      },
      {
        alpha: 1,
        duration: holdDuration,
      },
      {
        alpha: 0,
        y: y - riseDistance,
        duration: fadeOutDuration,
        ease: "Sine.easeIn",
      },
    ],
    onComplete: () => {
      if (destroyOnComplete) text.destroy();
    },
  });

  return text;
}
