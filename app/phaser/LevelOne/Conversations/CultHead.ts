import Phaser from "phaser";

interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}

export default class CultHead extends Phaser.Scene {
  private dialogue1Nodes: DialogueNode[] = [
    {
      text: "Cult Head: You whine like fettered swine. Why?",
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
      text: "Cult Head: *He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But what pathetic words for a demon of your stature... Hell burns at the same rate as your evaporating masculinity.",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Cult Head: *He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But for a demon of your stature to so brazenly speak to a Lord two-hundred years your superior... You must be having trouble grasping reality.",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Cult Head: *His fist lights aflame and he punches you swiftly in the gut* Heal your mind or we will tear your soul for energy. Have the twins check you out. They're in the room to the right of here. We will finish without you...",
      // no choices = end
    },
  ];

  private dialogue2Nodes: DialogueNode[] = [
    {
      text: "Cult Head: The potion proves the bind upon this mind is in motion. However, your negligence leaves you on the fence.",
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
      text: "Cult Head: I lament your useless comment",
      choices: [
        {
          text: "1) They said you would have killed me if I had less demonic energy...",
          next: 2,
        },
      ],
    },
    {
      text: "Cult Head: Yes, and after you restore you connection to this brain. From thence, you best have good sense.",
      choices: [
        { text: "1) Continue...", next: 3 },
        {
          text: "2) Ooh I thought you were about to miss a rhyme that time.",
          next: 3,
        },
      ],
    },
    {
      text: "Cult Head: I will enjoy the melting of your brain if you fail.",
      // no choices = end
    },
  ];

  private dialogue3Nodes: DialogueNode[] = [
    {
      text: "Cult Head: I will enjoy the melting of your brain if you fail.",
    },
  ];

  private dialogue4Nodes: DialogueNode[] = [
    {
      text: "Cult Head: Ah, the zombie groans have fell to silence after your swift violence. *He peers deeply into your eyes* So have you regained your wits?",
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
      text: "Cult Head: A pity...",
    },
    {
      text: "Cult Head: Then leave. We have much to prepare for this eve.",
    },
  ];

  private dialogueNodes: DialogueNode[] = [];
  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;

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
        break;
      case 3:
        this.dialogueNodes = this.dialogue3Nodes;
        break;
      case 4:
        this.dialogueNodes = this.dialogue4Nodes;
        break;
    }
  }

  preload() {
    this.load.image("cultHeadConvo", "/assets/conversations/cultHead.png");
    this.load.audio("cultHeadMusic", "/assets/music/morbid.mp3");
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

    this.dialogueText = this.add.text(150, this.scale.height - 270, "", {
      fontSize: "26px",
      color: "#ffffff",
      wordWrap: { width: this.scale.width - 300 },
    });

    this.music = this.sound.add("cultHeadMusic", { loop: true, volume: 1 });
    this.music.play();

    // Show first node
    this.showNode(0);

    // Input: pick choices with number keys
    this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
      const key = parseInt(event.key);
      if (!isNaN(key)) {
        const choice =
          this.dialogueNodes[this.currentNodeIndex].choices?.[key - 1];
        if (choice) {
          this.showNode(choice.next);
        }
      }
    });
  }

  private showNode(index: number) {
    this.currentNodeIndex = index;
    const node = this.dialogueNodes[index];

    this.dialogueText.setText(node.text);

    // Remove old choices
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // If no choices, check if end
    if (!node.choices || node.choices.length === 0) {
      this.add.text(
        180,
        this.scale.height - 110,
        "Press space to exit conversation",
        {
          fontSize: "24px",
          color: "#ffcc00",
          wordWrap: { width: this.scale.width - 300 },
        }
      );

      this.input.keyboard!.once("keydown-SPACE", () => {
        this.music.stop();

        // Determine how to resume SceneOne based on current node
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
        180,
        this.scale.height - 110 + i * 40,
        choice.text,
        {
          fontSize: "24px",
          color: "#ffcc00",
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.choiceTexts.push(choiceText);
    });
  }
}
