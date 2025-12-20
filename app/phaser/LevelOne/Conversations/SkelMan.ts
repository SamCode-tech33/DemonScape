import { DialogueNode } from "@/app/components/demonScapeTypes";
export default class SkelMan extends Phaser.Scene {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "WAAAAAAZZZZZZZUUUUUPPPPPPPP?",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) And now there is a talking skeleton... I'm insane. I hope there is a lot of padding in my crazy room.",
          next: 1,
        },
        {
          text: "2) A-a talking skeleton? *you back up slowly* uh hi...",
          next: 1,
        },
      ],
    },
    {
      text: "WHHHAATTT?! you can see me?",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) Yes and you are very ugly.",
          next: 2,
        },
        {
          text: "2) Should I not be able to?",
          next: 3,
        },
      ],
    },
    {
      text: "GEHEHEHEH I'm prettier than what's inside you. I'm winking GEHEHEH",
      emote: "*He points at his eye socket*",
      dialogueLine: "",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "GEH! Yeah it's wierd that you can see me. I'm Light-Bleached after all.",
      emote: "",
      dialogueLine: "",
      choices: [
        { text: "1) What is Light-Bleached?", next: 4 },
        {
          text: "2) Can I get some of that bleach for my eyes?",
          next: 4,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) How about you tell me what Light-Bleached means instead?",
          next: 5,
        },
        {
          text: "2) I didn't ask for a puzzle...",
          next: 6,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE - ;aslkdfja;sldkfj;aslkdfj;aslkdjflsadkjfljakfdhgqadjf;aslkdjf;lkdjafs;ldkfjas;ldkfj;asldkfj;aslkdjf;alskdjf;alskdjf;aslkdfj;aslkdfj;aslkdjfieut;lknasdlkguatia;sldkcna;sjdfgtyhpasiert5u;laskdcnm;aljshdgkuatplaisjd;flkasndfuituheoiaj;sdlkfjna;lskdjuytreiqp;osdkfjnalsdkfjhadiapueirer Oh yeah...",
      emote: "*He winks at you, somehow without eyelids*",
      dialogueLine: "",
    },
  ];

  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public skelVoice!: Phaser.Sound.BaseSound;
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerName!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: "SkelMan" });
  }

  preload() {
    this.load.image("SkelManConvo", "/assets/conversations/laugh-skel.png");
    this.load.audio("SkelManMusic", "/assets/music/dimension-2.mp3");
    this.load.audio("SkelVoice", "/assets/sfx/skelVoice.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "SkelManConvo")
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

    this.speakerName = this.add.text(
      60,
      this.scale.height - 278,
      "Fedora Skeleton:",
      {
        fontFamily: "Mostean",
        fontSize: "52px",
        color: "#378444",
        stroke: "black",
        strokeThickness: 1,
        wordWrap: { width: 200 },
      }
    );

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
      color: "#378444",
      stroke: "black",
      strokeThickness: 1,
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

    this.music = this.sound.add("SkelManMusic", { loop: true, volume: 1 });
    this.music.play();

    this.skelVoice = this.sound.add("SkelVoice", { volume: 2 });

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
    const typeSpeed = 11;
    let currentCharIndex = 0;
    const fadeDuration = 400;

    this.skelVoice.play({
      loop: true,
      rate: 1.1,
    });

    this.input.keyboard!.once("keydown-SPACE", () => {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      this.dialogueText.setText(fullText);
      this.skelVoice.stop();
      this.displayChoices(node);
    });

    this.speechInterval = setInterval(() => {
      if (currentCharIndex >= chars.length) {
        if (this.speechInterval) {
          clearInterval(this.speechInterval);
          this.speechInterval = null;
        }
        this.skelVoice.stop();
        this.displayChoices(node);
        return;
      }
      const char = chars[currentCharIndex];
      currentCharIndex++;
      this.dialogueText.setText(this.dialogueText.text + char);
    }, typeSpeed);
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
        this.music.stop();
        this.scene.stop();
        this.scene.resume("SceneOne");
      });
      return;
    }

    // Show new choices
    node.choices.forEach((choice, i) => {
      const choiceText = this.add.text(
        248,
        this.scale.height - 110 + i * 40,
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
