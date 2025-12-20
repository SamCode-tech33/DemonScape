import { PlayerStats, DialogueNode } from "@/app/components/demonScapeTypes";
export default class SaraOne extends Phaser.Scene {
  public dialogue1Nodes: DialogueNode[] = [
    {
      text: "ughh what? I'm busy.",
      emote: "",
      dialogueLine: "sara-line-0",
      choices: [
        {
          text: "1) I just drank this strange potion and I don't really know what is going on but I... passed. My um 'husk's' brain was the issue. Those um 'twins' said I should talk to you about taking the soul fragments from these zombies to heal?",
          next: 1,
        },
        {
          text: "2) Your busy and I'm in a damn existential crisis. Pretty sure it's a dream though. I was told to kill your pet zombies for soul fragments or something. The hell is this world?",
          next: 2,
        },
      ],
    },
    {
      text: "That bitch whore... She's jealous of my skill. Damnit. acting like that... look, your husk is probably short-circuiting your conciousness...",
      emote: "",
      dialogueLine: "sara-line-1",
      choices: [
        {
          text: "1) Excuse me, my conciousness? Oh... yeah that alchemist mentioned there was a bad integration or husk damage.",
          next: 3,
        },
        {
          text: "2) My conciousness is fine. It's you lot that are screwed in the head.",
          next: 4,
        },
      ],
    },
    {
      text: "Yeah I don't care about any of that. Damnit your husk is probably short-circuiting your conciousness...",
      emote: "",
      dialogueLine: "sara-line-2",
      choices: [
        {
          text: "1) Excuse me, my conciousness? Oh... yeah that alchemist mentioned there was a bad integration or husk damage.",
          next: 3,
        },
        {
          text: "2) My conciousness is fine. It's you lot that are screwed in the head.",
          next: 4,
        },
      ],
    },
    {
      text: "Oh so she probably gave you temporary control back... pathetic that you messed up something so basic.",
      emote: "*She smirks*",
      dialogueLine: "sara-line-3",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "It clearly isn't and neither is your logic. Tell me, is it more likely that every being in this room is crazy and just YOU are sane or is it more likely your the crazy one? Take all the time you need.",
      emote: "",
      dialogueLine: "sara-line-4",
      choices: [
        {
          text: "1) And if you gaze long enough into the abyss of collective folly, you may find that you alone still see clearly.",
          next: 6,
        },
      ],
    },
    {
      text: "Damnit, do you know how long it took me to program these soul fragments to fight... ughh fine, Maelvoth would have just killed you instead of making you drink that potion, but you have quite a lot of demonic energy, which makes it even stranger that you didn't integrate the possession correctly...",
      emote: "",
      dialogueLine: "sara-line-5",
      choices: [{ text: "1) Continue...", next: 7 }],
    },
    {
      text: "Ok Mr. Nietzsche... Look, your spirit is filtered through the mind's circuits. Either you didn't properly rewrite the brain on possesion... or damnit who prepared this body for you? Right you wouldn't know...",
      emote: "",
      dialogueLine: "sara-line-6",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "Maelvoth probably assumes he'll be killed by his superiors if he killed you before the final cleansing. Damn politics... I'll let you kill them, but I'm activating them. I'm sure if mere zombies are able to kill you, no one will complain... good luck.",
      emote: "",
      dialogueLine: "sara-line-7",
    },
  ];
  public dialogue2Nodes: DialogueNode[] = [
    {
      text: "Go on now. Defeat my pets if you can. Be warned, they'll attack you upon your first hit.",
      emote: "",
      dialogueLine: "sara-line-8",
    },
  ];
  public dialogue3Nodes: DialogueNode[] = [
    {
      text: "Ohhhh, did I forget to mention, there is... one more. Careful though, he's an angry boy.",
      emote: "*Sara Winks at you*",
      dialogueLine: "sara-line-9",
    },
  ];
  public dialogue4Nodes: DialogueNode[] = [
    {
      text: "Wow, you beat them. Ok you've only proven your stronger than a human... and you had to waste my pets for it... anyways, you probably felt demonic energy enter your body as you fought. Go report to Maelvoth that you've gained full control again. And leave me be.",
      emote: "*She sighs*",
      dialogueLine: "sara-line-10",
      choices: [
        {
          text: "1) Yes... I am um in control fully once again.",
          next: 1,
        },
        {
          text: "2) What the hell was that last one. Were you trying to kill me?!",
          next: 2,
        },
      ],
    },
    {
      text: "...I hope you remember how to fight. Heheheh you actually jumped on his head, moron. unbelievable we are saving you. At least learn some magic, find a scroll or something.",
      emote: "",
      dialogueLine: "sara-line-11",
    },
    {
      text: "Yes, and if you had died to a mere Zombie, no one would have cared.",
      emote: "",
      dialogueLine: "sara-line-12",
      choices: [
        {
          text: "1) Continue...",
          next: 1,
        },
      ],
    },
  ];

  public dialogueNodes: DialogueNode[] = [];
  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public saraDialogue: Phaser.Sound.BaseSound | null = null;
  public speechInterval: NodeJS.Timeout | null = null;
  public bossFight: boolean = false;
  public speakerName!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;
  public dialogueScene: number = 1;
  playerStats!: PlayerStats;

  constructor() {
    super({ key: "SaraOne" });
  }

  init(data: { saraOneSceneNum: number; playerStats: PlayerStats }) {
    switch (data.saraOneSceneNum) {
      case 1:
        this.dialogueNodes = this.dialogue1Nodes;
        break;
      case 2:
        this.dialogueNodes = this.dialogue2Nodes;
        this.dialogueScene = 2;
        break;
      case 3:
        this.dialogueNodes = this.dialogue3Nodes;
        this.dialogueScene = 3;
        this.bossFight = true;

        this.playerStats = {
          health: data.playerStats.health ?? 50,
          maxHealth: data.playerStats.maxHealth ?? 50,
          magic: data.playerStats.magic ?? 20,
          maxMagic: data.playerStats.maxMagic ?? 20,
        };

        break;
      case 4:
        this.dialogueNodes = this.dialogue4Nodes;
        this.dialogueScene = 4;
        break;
    }
  }

  preload() {
    this.load.image("SaraOneConvo", "/assets/conversations/sara.png");
    this.load.audio("SaraOneMusic", "/assets/music/fogTrees.mp3");
    this.load.audio("sara-line-0", "/assets/dialogue/sara/sara-dialogue1.wav");
    this.load.audio("sara-line-1", "/assets/dialogue/sara/sara-dialogue2.wav");
    this.load.audio("sara-line-2", "/assets/dialogue/sara/sara-dialogue3.wav");
    this.load.audio("sara-line-3", "/assets/dialogue/sara/sara-dialogue4.wav");
    this.load.audio("sara-line-4", "/assets/dialogue/sara/sara-dialogue5.wav");
    this.load.audio("sara-line-5", "/assets/dialogue/sara/sara-dialogue6.wav");
    this.load.audio("sara-line-6", "/assets/dialogue/sara/sara-dialogue7.wav");
    this.load.audio("sara-line-7", "/assets/dialogue/sara/sara-dialogue8.wav");
    this.load.audio("sara-line-8", "/assets/dialogue/sara/sara-dialogue9.wav");
    this.load.audio("sara-line-9", "/assets/dialogue/sara/sara-dialogue10.wav");
    this.load.audio(
      "sara-line-10",
      "/assets/dialogue/sara/sara-dialogue11.wav"
    );
    this.load.audio(
      "sara-line-11",
      "/assets/dialogue/sara/sara-dialogue12.wav"
    );
    this.load.audio(
      "sara-line-12",
      "/assets/dialogue/sara/sara-dialogue13.wav"
    );
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "SaraOneConvo")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    // Dialogue box
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height - 150,
      this.scale.width,
      290,
      0x000000,
      0.4
    );

    this.speakerName = this.add.text(60, this.scale.height - 278, "Sara:", {
      fontFamily: "Mostean",
      fontSize: "52px",
      color: "pink",
      stroke: "black",
      strokeThickness: 0.5,
      wordWrap: { width: 200 },
    });

    this.playerSpeaker = this.add.text(60, this.scale.height - 110, "You:", {
      fontFamily: "Mostean",
      fontSize: "52px",
      color: "#ffcc00",
      stroke: "black",
      strokeThickness: 1,
    });

    this.dialogueText = this.add.text(240, this.scale.height - 270, "", {
      fontFamily: "Mostean",
      fontSize: "40px",
      color: "pink",
      stroke: "#CCC5C5",
      strokeThickness: 0.5,
      wordWrap: { width: this.scale.width - 300 },
    });

    this.emoteBg = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height - this.scale.height,
      this.scale.width,
      140,
      0x000000,
      0.4
    );

    this.emoteText = this.add.text(0, 15, "", {
      fontFamily: "Mostean",
      fontSize: "48px",
      color: "white",
      stroke: "yellow",
      strokeThickness: 1,
    });

    this.emoteText.setAlpha(0);

    this.tweens.add({
      targets: this.emoteText,
      alpha: 1,
      duration: 1500,
      ease: "Power2",
      onComplete: () => {
        this.tweens.add({
          targets: this.emoteText,
          alpha: 0.33,
          duration: 1500,
          yoyo: true,
          repeat: -1,
        });
      },
    });

    this.music = this.sound.add("SaraOneMusic", { loop: true, volume: 1 });
    this.music.play();

    // Show first node
    this.showNode(0);
  }

  // Input: pick choices with number keys
  private onChoiceKey(event: KeyboardEvent) {
    const key = parseInt(event.key);
    if (!isNaN(key) && key >= 1 && key <= 9) {
      const choice =
        this.dialogueNodes[this.currentNodeIndex].choices?.[key - 1];
      if (choice) {
        // Remove listener before recursing to next node
        this.input.keyboard!.off("keydown", this.onChoiceKey, this);
        this.showNode(choice.next);
      }
    }
  }

  private showNode(index: number) {
    if (this.speechInterval) {
      clearInterval(this.speechInterval);
    }

    this.input.keyboard!.removeListener("keydown-SPACE");

    this.currentNodeIndex = index;
    const node = this.dialogueNodes[index];

    // Clear previous text
    this.input.keyboard!.off("keydown", this.onChoiceKey, this);
    this.dialogueText.setText("");
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // === TYPEWRITER WITH FADE-IN EFFECT ===
    const fullText = node.text;
    const chars = fullText.split("");
    const typeSpeed = 80;
    let currentCharIndex = 0;
    const fadeDuration = 400;

    this.saraDialogue = this.sound.add(`sara-line-${index}`);

    this.input.keyboard!.once("keydown-SPACE", () => {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      if (this.saraDialogue) {
        this.saraDialogue.stop();
        this.sound.remove(this.saraDialogue);
        this.saraDialogue.destroy();
        this.saraDialogue = null;
      }
      this.dialogueText.setText(fullText);
      this.displayChoices(node);
    });

    this.speechInterval = setInterval(() => {
      if (currentCharIndex >= chars.length) {
        if (this.speechInterval) {
          clearInterval(this.speechInterval);
          this.speechInterval = null;
        }
        this.displayChoices(node);
        return;
      }
      const char = chars[currentCharIndex];
      currentCharIndex++;
      this.dialogueText.setText(this.dialogueText.text + char);
    }, typeSpeed);
    this.saraDialogue.play();
    if (this.dialogueNodes[index].emote) {
      this.emoteBg.setVisible(true);
      this.emoteText.setText(this.dialogueNodes[index].emote);
      this.emoteText.setX(this.scale.width / 2 - this.emoteText.width / 2);
    } else {
      this.emoteBg.setVisible(false);
      this.emoteText.setText("");
    }
  }

  private displayChoices(node: DialogueNode) {
    // Remove old choices
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // check for end of conversation
    if (!node.choices || node.choices.length === 0) {
      this.add.text(
        300,
        this.scale.height - 110,
        "Press space to exit conversation",
        {
          fontFamily: "Mostean",
          fontSize: "44px",
          color: "#ffcc00",
          stroke: "black",
          strokeThickness: 1,
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.input.keyboard!.once("keydown-SPACE", () => {
        if (this.bossFight === true) {
          this.music.stop();
          this.scene.launch("ZombieCombat", {
            playerStats: this.playerStats,
            enemy: {
              enemyPresence: true,
              health: 40,
              maxHealth: 40,
              magic: 10,
              maxMagic: 10,
            },
          });
          this.scene.stop("SaraOne");
          this.bossFight = false;
        } else {
          this.music.stop();
          this.scene.stop();
          this.scene.resume("SceneOne");
        }
      });
      return;
    }

    // Show new choices
    node.choices.forEach((choice, i) => {
      const choiceText = this.add.text(
        248,
        this.scale.height - 128 + i * 44,
        choice.text,
        {
          fontFamily: "Mostean",
          fontSize: "32px",
          color: "#ffcc00",
          stroke: "black",
          strokeThickness: 1,
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.choiceTexts.push(choiceText);
    });
    this.input.keyboard!.on("keydown", this.onChoiceKey, this);
  }
}
