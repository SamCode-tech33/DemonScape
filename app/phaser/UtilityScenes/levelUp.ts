import Phaser from "phaser";
import type PlayerStatsManager from "@/app/state/PlayerStats";

type AttrKey = "str" | "int" | "wis" | "sta" | "agi" | "hit";

const ATTRS: { key: AttrKey; label: string }[] = [
  { key: "str", label: "STR" },
  { key: "int", label: "INT" },
  { key: "wis", label: "WIS" },
  { key: "sta", label: "STA" },
  { key: "agi", label: "AGI" },
  { key: "hit", label: "HIT" },
];

const POINTS_PER_LEVEL = 3;
const AURA_MS = 3000;
const CHARACTER_SCALE = 0.43; // tweak to fit your sprite
const FONT = "mostean, 'Times New Roman', serif";
const GOLD = "#ffd54a";
const WHITE = "#f4f1e6";

interface PlusButton {
  box: Phaser.GameObjects.Container;
  hit: Phaser.GameObjects.Rectangle;
}

export default class LevelUpScene extends Phaser.Scene {
  private playerStats!: PlayerStatsManager;

  private closing = false;

  // snapshots so Reset can undo everything
  private initial = {} as Record<AttrKey, number>;
  private spent = {} as Record<AttrKey, number>;
  private baseAtrPoints = 0;

  private pointsText!: Phaser.GameObjects.Text;
  private rows = {} as Record<
    AttrKey,
    { value: Phaser.GameObjects.Text; plus: PlusButton }
  >;
  private music!: Phaser.Sound.BaseSound;
  private backgroundMusic!: Phaser.Sound.BaseSound;

  constructor() {
    super("LevelUpScene");
  }

  // Phaser reuses the same scene instance on every launch, so reset state here
  init() {
    this.closing = false;
    this.initial = {} as Record<AttrKey, number>;
    this.spent = {} as Record<AttrKey, number>;
    this.rows = {} as typeof this.rows;
  }

  preload() {
    this.load.audio("level-up", "/assets/sfx/level-up.mp3");
    this.load.audio("dark-logic", "/assets/music/dark-logic.mp3");
    this.load.image("character", "/assets/main-character1.png");
  }

  create() {
    this.playerStats = this.registry.get("playerStats") as PlayerStatsManager;
    this.music = this.sound.add("level-up", {
      loop: false,
      volume: 3,
    });
    this.backgroundMusic = this.sound.add("dark-logic", {
      loop: true,
      volume: 1,
    });
    this.music.play();
    this.time.delayedCall(200, () => {
      this.backgroundMusic.play();
    });
    const s = this.playerStats;

    const W = this.scale.width;
    const H = this.scale.height;
    const u = H / 720; // simple responsive scale factor

    // ---- grant points + snapshot for Reset ----
    for (const { key } of ATTRS) {
      this.initial[key] = s[key];
      this.spent[key] = 0;
    }
    s.atrPoints += POINTS_PER_LEVEL;
    this.baseAtrPoints = s.atrPoints; // 3 if the player had none banked

    // ---- backdrop (dims the paused MainScene underneath) ----
    this.add.rectangle(0, 0, W, H, 0x05050c, 0.48).setOrigin(0).setDepth(0);

    // ---- character (center-left) ----
    const charX = W * 0.25;
    const charY = H * 0.5;
    const character = this.add
      .sprite(charX, charY, "character")
      .setScale(CHARACTER_SCALE)
      .setDepth(2);

    // ---- UI ----
    const ui = this.add.container(0, 0).setDepth(5).setAlpha(0);

    // Heading: centered, larger than the quote
    const heading = this.add
      .text(W / 4, H * 0.1, `Level up!`, {
        fontFamily: FONT,
        fontSize: `${Math.round(56 * u)}px`,
        color: GOLD,
        stroke: "#5a3b00",
        strokeThickness: Math.round(6 * u),
      })
      .setOrigin(0.5);

    // Quote on the right
    const panelX = W * 0.52;
    const panelW = W * 0.42;
    const further = this.playerStats.level > 2 ? "further " : "";
    const quote = this.add
      .text(
        panelX,
        H * 0.1,
        `A Silent power ${further}intertwines its' essence in and around your husk's vital tissue. How shall its' light be received?`,
        {
          fontFamily: FONT,
          fontSize: `${Math.round(32 * u)}px`,
          fontStyle: "bold",
          color: GOLD,
          wordWrap: { width: panelW },
          lineSpacing: 6 * u,
        },
      )
      .setOrigin(0, 0);

    // Remaining points
    this.pointsText = this.add
      .text(panelX, H * 0.28, "", {
        fontFamily: FONT,
        fontSize: `${Math.round(26 * u)}px`,
        color: GOLD,
      })
      .setOrigin(0, 0.5);

    ui.add([heading, quote, this.pointsText]);

    // Attribute rows
    const rowsTop = H * 0.38;
    const rowGap = H * 0.065;
    ATTRS.forEach(({ key, label }, i) => {
      const y = rowsTop + i * rowGap;

      const name = this.add
        .text(panelX, y, label, {
          fontFamily: FONT,
          fontSize: `${Math.round(26 * u)}px`,
          color: WHITE,
        })
        .setOrigin(0, 0.5);

      const value = this.add
        .text(panelX + 210 * u, y, "", {
          fontFamily: FONT,
          fontSize: `${Math.round(26 * u)}px`,
          color: WHITE,
        })
        .setOrigin(1, 0.5);

      const minus = this.makeButton(
        panelX + 270 * u,
        y,
        40 * u,
        40 * u,
        "-",
        () => this.minusPoints(key),
      );

      const plus = this.makeButton(
        panelX + 320 * u,
        y,
        40 * u,
        40 * u,
        "+",
        () => this.spend(key),
      );

      this.rows[key] = { value, plus };

      ui.add([name, value, minus.box]);
      ui.add([name, value, plus.box]);
    });

    // Bottom buttons
    const reset = this.makeButton(
      W * 0.55,
      H * 0.91,
      200 * u,
      52 * u,
      "Reset",
      () => this.reset(),
    );
    const finish = this.makeButton(
      W * 0.72,
      H * 0.91,
      200 * u,
      52 * u,
      "Finish",
      () => this.finish(),
    );
    ui.add([reset.box, finish.box]);

    this.tweens.add({ targets: ui, alpha: 1, duration: 700, delay: 200 });

    this.refresh();
    this.playAura(charX, charY, character);
  }

  // ------------------------------------------------------------------
  // Attribute logic
  // ------------------------------------------------------------------

  private spend(key: AttrKey) {
    const s = this.playerStats;
    if (this.closing || s.atrPoints <= 0) return;

    s.atrPoints -= 1;
    s[key] += 1;
    this.spent[key] += 1;
    this.refresh();
  }

  private minusPoints(key: AttrKey) {
    const s = this.playerStats;
    if (this.closing || s.atrPoints >= 3) return;

    s.atrPoints += 1;
    s[key] -= 1;
    this.spent[key] -= 1;
    this.refresh();
  }

  private reset() {
    const s = this.playerStats;
    for (const { key } of ATTRS) {
      s[key] = this.initial[key];
      this.spent[key] = 0;
    }
    s.atrPoints = this.baseAtrPoints;
    this.refresh();
  }

  private finish() {
    if (this.closing) return;
    this.closing = true;

    const s = this.playerStats;
    s.experience -= s.experienceGoal;
    s.level++;

    // notify registry listeners (MainScene re-checks in case of multiple level-ups)
    this.registry.set("playerStats", s);
    this.backgroundMusic.stop();
    this.scene.stop();
    this.scene.resume("SceneOne", {
      from: "LevelUpScene",
    });
  }

  private refresh() {
    const s = this.playerStats;
    const canSpend = s.atrPoints > 0;

    this.pointsText.setText(`Attribute points: ${s.atrPoints}`);

    for (const { key } of ATTRS) {
      const row = this.rows[key];
      row.value
        .setText(String(s[key]))
        .setColor(this.spent[key] > 0 ? GOLD : WHITE);

      // plus buttons vanish once every point is spent
      row.plus.box.setVisible(canSpend);
      if (row.plus.hit.input) row.plus.hit.input.enabled = canSpend;
    }
  }

  // ------------------------------------------------------------------
  // Golden aura (tween-based, so it works on any Phaser 3 version)
  // ------------------------------------------------------------------

  private playAura(x: number, y: number, character: Phaser.GameObjects.Sprite) {
    const glowKey = this.ensureGlowTexture();
    const u = this.scale.height / 720;

    this.cameras.main.flash(350, 255, 225, 130);
    this.cameras.main.shake(400, 0.004);
    character.setTint(0xffe9a0);
    this.time.delayedCall(AURA_MS, () => character.clearTint());

    // Core glow: blasts out, pulses, fades at ~3s
    const glow = this.add
      .image(x, y, glowKey)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setAlpha(0)
      .setScale(0.3 * u)
      .setDepth(1);

    this.tweens.add({
      targets: glow,
      alpha: 1,
      scale: 2.4 * u,
      duration: 400,
      ease: "Cubic.easeOut",
    });
    this.tweens.add({
      targets: glow,
      scale: 2.0 * u,
      duration: 350,
      delay: 400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: glow,
      alpha: 0,
      delay: AURA_MS - 500,
      duration: 500,
      onComplete: () => {
        this.tweens.killTweensOf(glow);
        glow.destroy();
      },
    });

    // Shockwave rings
    this.time.addEvent({
      delay: 300,
      repeat: Math.floor(AURA_MS / 300) - 3, // last ring starts ~2.1s, ends ~3s
      callback: () => {
        const ring = this.add
          .circle(x, y, 60 * u)
          .setStrokeStyle(3, 0xffd54a, 1)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(1);
        this.tweens.add({
          targets: ring,
          scale: 5,
          alpha: 0,
          duration: 900,
          ease: "Cubic.easeOut",
          onComplete: () => ring.destroy(),
        });
      },
    });

    // Rising sparkles
    this.time.addEvent({
      delay: 55,
      repeat: Math.floor(AURA_MS / 55) - 1,
      callback: () => {
        const a = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const r = Phaser.Math.Between(20, 90) * u;
        const spark = this.add
          .image(
            x + Math.cos(a) * r,
            y + Math.sin(a) * r * 0.8 + 20 * u,
            glowKey,
          )
          .setBlendMode(Phaser.BlendModes.ADD)
          .setScale(Phaser.Math.FloatBetween(0.05, 0.14) * u)
          .setDepth(3);
        this.tweens.add({
          targets: spark,
          y: spark.y - Phaser.Math.Between(90, 180) * u,
          alpha: 0,
          duration: Phaser.Math.Between(600, 1000),
          ease: "Sine.easeOut",
          onComplete: () => spark.destroy(),
        });
      },
    });
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  private makeButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    onClick: () => void,
  ): PlusButton {
    const bg = this.add
      .rectangle(0, 0, w, h, 0x2a2140, 1)
      .setStrokeStyle(2, 0xffd54a, 1);
    const txt = this.add
      .text(0, 0, label, {
        fontFamily: FONT,
        fontSize: `${Math.round(h * 0.55)}px`,
        color: GOLD,
      })
      .setOrigin(0.5);
    const box = this.add.container(x, y, [bg, txt]);

    bg.setInteractive({ useHandCursor: true })
      .on("pointerover", () => bg.setFillStyle(0x4a3a78, 1))
      .on("pointerout", () => bg.setFillStyle(0x2a2140, 1))
      .on("pointerdown", onClick);

    return { box, hit: bg };
  }

  /** Radial gold gradient used for the glow + sparkles. */
  private ensureGlowTexture(): string {
    const key = "levelup-glow";
    if (this.textures.exists(key)) return key;

    const size = 256;
    const tex = this.textures.createCanvas(key, size, size)!;
    const ctx = tex.getContext();
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,225,120,1)");
    g.addColorStop(0.4, "rgba(255,200,60,0.55)");
    g.addColorStop(1, "rgba(255,180,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    tex.refresh();
    return key;
  }
}
