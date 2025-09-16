import localFont from "next/font/local";
const mostean = localFont({
  src: "../../../public/assets/fonts/mostean.otf",
  weight: "700",
  display: "swap",
});

export default class GameOver extends Phaser.Scene {
  music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "GameOver" });
  }

  preload() {
    this.load.image("game-over-screen", "/assets/demon-scape-cover.jpg");
    this.load.video("flames", "/assets/flames.mp4");
    this.load.audio("game-over-music", "/assets/music/deus-ex-machina.mp3");
  }

  create() {
    this.music = this.sound.add("game-over-music", { loop: true, volume: 1 });
    this.music.play();

    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "game-over-screen")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    const flames = this.add.video(
      this.scale.width / 2,
      this.scale.height / 2,
      "flames"
    );
    flames.play(true);
    flames.setAlpha(0.25);

    flames.displayWidth = this.scale.width;
    flames.displayHeight = this.scale.height;

    const gameOverText = this.add
      .text(this.scale.width / 2, this.scale.height * 0.25, "GAME OVER", {
        fontSize: "156px",
        color: "ff0000",
        fontFamily: "Mostean",
        stroke: "#B8860B",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(3);

    const goAgain = this.add
      .text(
        this.scale.width / 2,
        this.scale.height * 0.75,
        "Space to Continue",
        {
          fontSize: "132px",
          color: "ff0000",
          fontFamily: "Mostean",
          stroke: "#B8860B", // border color
          strokeThickness: 6, // thickness of border
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(3);

    this.tweens.add({
      targets: goAgain,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.input.keyboard!.once("keydown-SPACE", () => {
      this.music.stop();
      this.scene.stop("GameOver");
      this.scene.start("SceneOne");
    });
  }
}
