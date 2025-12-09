import { DialogueNode } from "@/app/components/demonScapeTypes";

export default class CultHead extends Phaser.Scene {
  public dialogue1Nodes: DialogueNode[] = [
    {
      text: "You whine like fettered swine. Why?",
      choices: [
        {
          text: "1) Th-this heart in my hand. . . wh-where am I? I-I was just in my room...",
          next: 1,
        },
        {
          text: "2) Who the hell are you?! I'll scream if I want to scream.",
          next: 2,
        },
      ],
    },
    {
      text: "*He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But what pathetic words for a demon of your stature... Hell burns at the same rate as your evaporating masculinity.",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "*He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But for a demon of your stature to so brazenly speak to a Lord two-hundred years your superior... You must be having trouble grasping reality.",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "*His fist lights aflame and he punches you swiftly in the gut* Heal your mind or we will tear your soul for energy. Have the twins check you out. They're in the room to the right of here. We will finish without you...",
      // no choices = end
    },
  ];
  public dialogue2Nodes: DialogueNode[] = [
    {
      text: "The potion proves the bind upon this mind is in motion. However, your negligence leaves you on the fence.",
      choices: [
        {
          text: "1) You're rhyming more consistently this time.",
          next: 1,
        },
        {
          text: "2) They said you would have killed me if I had less demonic energy.",
          next: 2,
        },
      ],
    },
    {
      text: "I lament your useless comment",
      choices: [
        {
          text: "1) They said you would have killed me if I had less demonic energy...",
          next: 2,
        },
      ],
    },
    {
      text: "Yes, and after you restore your connection to this brain. From thence, you best have good sense.",
      choices: [
        { text: "1) Continue...", next: 3 },
        {
          text: "2) Ooh I thought you were about to miss a rhyme that time.",
          next: 3,
        },
      ],
    },
    {
      text: "I will enjoy the melting of your brain if you fail.",
      // no choices = end
    },
  ];
  public dialogue3Nodes: DialogueNode[] = [
    {
      text: "I will enjoy the melting of your brain if you fail.",
    },
  ];
  public dialogue4Nodes: DialogueNode[] = [
    {
      text: "Ah, the zombie groans have fell to silence after your swift violence. *He peers deeply into your eyes* So have you regained your wits?",
      choices: [
        {
          text: "1) No! I am telling you I am a Human!",
          next: 1,
        },
        {
          text: "2) (Lie) Yes, of course. I am in complete control now.",
          next: 2,
        },
      ],
    },
    {
      text: "A pity...",
    },
    {
      text: "Then leave. We have much to prepare for this eve.",
    },
  ];

  public dialogueNodes: DialogueNode[] = [];
  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public cultHeadDialogue: Phaser.Sound.BaseSound | null = null;
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerName!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public dialogueScene: number = 1;

  constructor() {
    super({ key: "CultHead" });
  }

  init(data: { cultHeadSceneNum: number }) {
    console.log(data.cultHeadSceneNum);
    switch (data.cultHeadSceneNum) {
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
        break;
      case 4:
        this.dialogueNodes = this.dialogue4Nodes;
        this.dialogueScene = 4;
        break;
    }
  }

  preload() {
    this.load.image("cultHeadConvo", "/assets/conversations/cultHead.png");
    this.load.audio("cultHeadMusic", "/assets/music/morbid.mp3");
    this.load.audio(
      "cultHead1-dialogue0",
      "/assets/dialogue/cultHead/cultHead-dialogue0.wav"
    );
    this.load.audio(
      "cultHead1-dialogue1",
      "/assets/dialogue/cultHead/cultHead-dialogue1.wav"
    );
    this.load.audio(
      "cultHead1-dialogue2",
      "/assets/dialogue/cultHead/cultHead-dialogue2.wav"
    );
    this.load.audio(
      "cultHead1-dialogue3",
      "/assets/dialogue/cultHead/cultHead-dialogue3.wav"
    );
    this.load.audio(
      "cultHead2-dialogue0",
      "/assets/dialogue/cultHead/cultHead-dialogue4.wav"
    );
    this.load.audio(
      "cultHead2-dialogue1",
      "/assets/dialogue/cultHead/cultHead-dialogue5.wav"
    );
    this.load.audio(
      "cultHead2-dialogue2",
      "/assets/dialogue/cultHead/cultHead-dialogue6.wav"
    );
    this.load.audio(
      "cultHead2-dialogue3",
      "/assets/dialogue/cultHead/cultHead-dialogue7.wav"
    );
    this.load.audio(
      "cultHead3-dialogue0",
      "/assets/dialogue/cultHead/cultHead-dialogue7.wav"
    );
    this.load.audio(
      "cultHead4-dialogue0",
      "/assets/dialogue/cultHead/cultHead-dialogue8.wav"
    );
    this.load.audio(
      "cultHead4-dialogue1",
      "/assets/dialogue/cultHead/cultHead-dialogue9.wav"
    );
    this.load.audio(
      "cultHead4-dialogue2",
      "/assets/dialogue/cultHead/cultHead-dialogue10.wav"
    );
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "cultHeadConvo")
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
      "Cult Head:",
      {
        fontFamily: "Mostean",
        fontSize: "52px",
        color: "red",
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
      color: "red",
      stroke: "black",
      strokeThickness: 1,
      wordWrap: { width: this.scale.width - 300 },
    });

    this.music = this.sound.add("cultHeadMusic", { loop: true, volume: 1 });
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
    this.currentNodeIndex = index;
    const node = this.dialogueNodes[index];

    this.input.keyboard!.removeListener("keydown-SPACE");

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

    this.cultHeadDialogue = this.sound.add(
      `cultHead${this.dialogueScene}-dialogue${index}`
    );

    this.input.keyboard!.once("keydown-SPACE", () => {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      if (this.cultHeadDialogue) {
        this.cultHeadDialogue.stop();
        this.sound.remove(this.cultHeadDialogue);
        this.cultHeadDialogue.destroy();
        this.cultHeadDialogue = null;
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
    this.cultHeadDialogue.play({
      volume: 1.5,
    });
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

        // Determine how to resume based on current node
        const resumeData =
          this.currentNodeIndex === 1
            ? { from: "PlayerDeath" } // node 1 → loss
            : { from: "CultHead" }; // other nodes → normal

        this.scene.stop();
        this.scene.resume("SceneOne", resumeData);
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
